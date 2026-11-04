// Classement public du mois, stocké dans Upstash Redis (offre gratuite).
//
// Variables d'environnement (sur Render) :
//   UPSTASH_REDIS_REST_URL    adresse REST de la base Upstash
//   UPSTASH_REDIS_REST_TOKEN  jeton REST (lecture + écriture) de la base Upstash
//   ADMIN_KEY                 mot de passe que le quiz doit fournir pour enregistrer des points
//
// Saison : un mois calendaire (heure de Paris). Les points repartent de zéro le 1er à 00 h 00.

const URL_ = (process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/+$/, "");
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || "";
const ADMIN = (process.env.ADMIN_KEY || "").trim();
export const enabled = !!(URL_ && TOKEN);
export function canWrite(key) { return enabled && !!ADMIN && String(key || "").trim() === ADMIN; }
export const hasKey = !!ADMIN;

const KEEP = 70 * 24 * 3600; // on garde ~2 mois d'historique

async function pipeline(cmds) {
  if (!enabled || !cmds.length) return [];
  const r = await fetch(URL_ + "/pipeline", { method: "POST", headers: { Authorization: "Bearer " + TOKEN, "content-type": "application/json" }, body: JSON.stringify(cmds) });
  if (!r.ok) throw new Error("Upstash HTTP " + r.status);
  const out = await r.json();
  return out.map((x) => (x && "result" in x ? x.result : null));
}

// --- dates (heure de Paris) ---
function parisParts(d = new Date()) {
  const p = new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(d);
  const g = (t) => p.find((x) => x.type === t).value;
  return { y: +g("year"), m: +g("month"), d: +g("day") };
}
function pad(n) { return String(n).padStart(2, "0"); }
export function seasonId(d = new Date()) { const p = parisParts(d); return p.y + "-" + pad(p.m); }
function dayId(d = new Date()) { const p = parisParts(d); return p.y + "-" + pad(p.m) + "-" + pad(p.d); }
function weekId(d = new Date()) { // semaine ISO, à partir de la date de Paris
  const p = parisParts(d), t = new Date(Date.UTC(p.y, p.m - 1, p.d)), day = t.getUTCDay() || 7;
  t.setUTCDate(t.getUTCDate() + 4 - day);
  const y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return t.getUTCFullYear() + "-W" + pad(Math.ceil(((t - y0) / 86400000 + 1) / 7));
}
function seasonEnd(d = new Date()) { // 1er du mois suivant, 00 h 00 à Paris (approximation UTC+1/+2)
  const p = parisParts(d), y = p.m === 12 ? p.y + 1 : p.y, m = p.m === 12 ? 1 : p.m + 1;
  const guess = Date.UTC(y, m - 1, 1, 0, 0, 0), off = new Date(guess).toLocaleString("en-US", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit" });
  return guess - (+off % 24) * 3600000;
}

const k = (ch, s) => "lb:" + ch + ":" + s;

// Enregistre des points / pièces pour un joueur (appelé par le quiz, via le relais).
export async function record(ch, e) {
  if (!enabled) return;
  const id = String(e.id || e.name || "").toLowerCase().slice(0, 80); if (!id) return;
  const s = seasonId(), w = weekId(), cmds = [];
  const name = String(e.name || id).slice(0, 40);
  cmds.push(["HSET", k(ch, "names"), id, name]);
  if (e.pic) cmds.push(["HSET", k(ch, "pics"), id, String(e.pic).slice(0, 600)]);
  if (e.pts) { cmds.push(["ZINCRBY", k(ch, s + ":p"), String(e.pts), id], ["EXPIRE", k(ch, s + ":p"), String(KEEP)]); cmds.push(["ZINCRBY", k(ch, w + ":p"), String(e.pts), id], ["EXPIRE", k(ch, w + ":p"), String(KEEP)]); }
  if (e.coins) { cmds.push(["ZINCRBY", k(ch, s + ":c"), String(e.coins), id], ["EXPIRE", k(ch, s + ":c"), String(KEEP)]); }
  if (e.streak) { cmds.push(["ZADD", k(ch, s + ":s"), "GT", String(e.streak), id], ["EXPIRE", k(ch, s + ":s"), String(KEEP)]); }
  await pipeline(cmds);
}

// Construit le classement public (avec un petit cache pour économiser les requêtes).
const cache = new Map();
export async function board(ch, live) {
  const c = cache.get(ch);
  if (c && Date.now() - c.t < 30000) return Object.assign({}, c.v, { live });
  const s = seasonId(), today = dayId(), yday = dayId(new Date(Date.now() - 86400000));
  const lastWeek = weekId(new Date(Date.now() - 7 * 86400000));
  const [top, ncount, donors, dcount, streaks, champ, snapToday, snapYday] = await pipeline([
    ["ZRANGE", k(ch, s + ":p"), "0", "499", "REV", "WITHSCORES"],
    ["ZCARD", k(ch, s + ":p")],
    ["ZRANGE", k(ch, s + ":c"), "0", "4", "REV", "WITHSCORES"],
    ["ZCARD", k(ch, s + ":c")],
    ["ZRANGE", k(ch, s + ":s"), "5", "+inf", "BYSCORE"],
    ["ZRANGE", k(ch, lastWeek + ":p"), "0", "0", "REV"],
    ["GET", k(ch, "snap:" + today)],
    ["GET", k(ch, "snap:" + yday)]
  ]);
  const ids = [], pts = [];
  for (let i = 0; i < (top || []).length; i += 2) { ids.push(top[i]); pts.push(Math.round(+top[i + 1])); }
  const dIds = [], dCoins = [];
  for (let i = 0; i < (donors || []).length; i += 2) { dIds.push(donors[i]); dCoins.push(Math.round(+donors[i + 1])); }
  const want = Array.from(new Set(ids.concat(dIds)));
  const [names, pics] = want.length ? await pipeline([["HMGET", k(ch, "names")].concat(want), ["HMGET", k(ch, "pics")].concat(want)]) : [[], []];
  const nameOf = {}, picOf = {}; want.forEach((id, i) => { nameOf[id] = (names || [])[i] || id; picOf[id] = (pics || [])[i] || ""; });
  // instantané des rangs, une fois par jour, pour les ▲▼ « depuis hier »
  const ranksNow = {}; ids.forEach((id, i) => { ranksNow[id] = i + 1; });
  if (!snapToday && ids.length) await pipeline([["SET", k(ch, "snap:" + today), JSON.stringify(ranksNow), "EX", "259200"]]);
  let ref = {}; try { ref = JSON.parse(snapYday || "{}") || {}; } catch (e) { ref = {}; }
  const streakSet = new Set(streaks || []), champion = (champ || [])[0] || null, topDonor = dIds[0] || null;
  const players = ids.map((id, i) => {
    const b = [];
    if (champion === id) b.push("👑"); if (topDonor === id) b.push("🎁"); if (streakSet.has(id)) b.push("🔥");
    const was = ref[id];
    return { rank: i + 1, id, name: nameOf[id], pic: picOf[id], p: pts[i], move: was ? was - (i + 1) : null, badges: b };
  });
  const v = {
    season: s, endsAt: seasonEnd(), updated: Date.now(), players, total: ncount || 0,
    donors: dIds.map((id, i) => ({ id, name: nameOf[id], pic: picOf[id], coins: dCoins[i] })), donorCount: dcount || 0,
    badges: { champion, topDonor, streak5: Array.from(streakSet) }
  };
  cache.set(ch, { t: Date.now(), v });
  return Object.assign({}, v, { live });
}
