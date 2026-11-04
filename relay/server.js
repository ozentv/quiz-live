// Relais Studio Quiz : lit le chat d'un live TikTok et l'envoie à la page du quiz par WebSocket.
//
// La page se connecte à  wss://<adresse-du-relais>/?user=<pseudo TikTok>
// et reçoit des messages JSON :
//   { type: "status", state: "waiting" | "connected" | "error" | "ended", message?: string }
//   { type: "chat", id: "<@pseudo>", name: "<nom affiché>", text: "<commentaire>", t: <horodatage ms> }
//
// Variables d'environnement facultatives :
//   PORT           port d'écoute (fourni automatiquement par l'hébergeur)
//   EULER_API_KEY  clé gratuite https://www.eulerstream.com, si les connexions sans clé sont limitées
//   ALLOWED_USERS  liste de pseudos autorisés, séparés par des virgules (ex. "monpseudo,autrepseudo")
//
// Pseudo spécial "demo" : simule des commentaires, pour tester sans être en live.

import http from "node:http";
import { WebSocketServer } from "ws";
import { TikTokLiveConnection, WebcastEvent, ControlEvent, SignatureRateLimitError } from "tiktok-live-connector";

const PORT = Number(process.env.PORT) || 10000;
const API_KEY = process.env.EULER_API_KEY || undefined;
const ALLOWED = (process.env.ALLOWED_USERS || "")
  .split(",")
  .map(cleanUser)
  .filter(Boolean);

function cleanUser(s) {
  return String(s || "")
    .trim()
    .replace(/^https?:\/\/(www\.)?tiktok\.com\//i, "")
    .replace(/^@+/, "")
    .replace(/\/.*$/, "")
    .toLowerCase();
}

function isRateLimit(err) {
  const msg = String((err && err.message) || "");
  return err instanceof SignatureRateLimitError || /rate limited|too many connections|\b429\b/i.test(msg);
}

// Renvoie { message, wait } : le texte à afficher et le délai avant la prochaine tentative (ms).
function explain(err) {
  const name = (err && (err.name || (err.constructor && err.constructor.name))) || "";
  const msg = String((err && err.message) || err || "");
  if (isRateLimit(err)) {
    const wait = Math.max(60000, Math.min(15 * 60000, (err && err.retryAfter) || 0));
    const mins = Math.ceil(wait / 60000);
    return {
      wait,
      message: API_KEY
        ? "Limite de connexions atteinte sur ta clé Euler Stream. Nouvelle tentative automatique dans " + mins + " min."
        : "Limite gratuite du service de connexion TikTok atteinte. Ajoute une clé gratuite EULER_API_KEY sur Render (voir le README). Nouvelle tentative dans " + mins + " min.",
    };
  }
  if (/offline/i.test(name) || /offline|isn.t online|not.*live|isn.t live/i.test(msg)) return { wait: 20000, message: "Le live n'est pas lancé sur ce compte. Lance ton live : la connexion se fera toute seule." };
  if (/not.*found|404|doesn.t exist|does not exist/i.test(msg)) return { wait: 60000, message: "Compte TikTok introuvable. Vérifie le pseudo." };
  return { wait: 30000, message: "Connexion au live impossible : " + msg.slice(0, 160) };
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain; charset=utf-8", "access-control-allow-origin": "*" });
  res.end("Relais Studio Quiz : OK\n");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws, req) => {
  const url = new URL(req.url || "/", "http://relais");
  const user = cleanUser(url.searchParams.get("user"));
  const send = (o) => { if (ws.readyState === 1) ws.send(JSON.stringify(o)); };

  if (!user) { send({ type: "status", state: "error", message: "Pseudo TikTok manquant." }); ws.close(); return; }
  if (ALLOWED.length && user !== "demo" && !ALLOWED.includes(user)) {
    send({ type: "status", state: "error", message: "Ce pseudo n'est pas autorisé sur ce relais." }); ws.close(); return;
  }

  let closed = false, tt = null, retryT = null, demoT = null;
  ws.isAlive = true;
  ws.on("pong", () => { ws.isAlive = true; });
  ws.on("message", () => {}); // la page n'envoie rien d'utile, on ignore

  function cleanup() {
    if (demoT) { clearInterval(demoT); demoT = null; }
    if (tt) {
      const old = tt; tt = null;
      try { old.removeAllListeners(); } catch (e) {}
      old.disconnect().catch(() => {});
    }
  }

  function retry(ms) {
    if (closed || retryT) return;
    cleanup();
    retryT = setTimeout(() => { retryT = null; start(); }, ms);
  }

  function startDemo() {
    send({ type: "status", state: "connected", message: "Mode démo : faux commentaires." });
    const names = ["Lina", "Yanis", "Chloé", "Max_93", "Inès", "Tom", "Sarah ✨", "Noah", "Jade", "Ethan", "Léa", "Adam"];
    const extra = ["trop dur", "salut !", "😂😂", "je sais pas", "go go go"];
    const gifts = [["Rose", 1], ["Finger Heart", 5], ["Rosa", 10], ["Perfume", 20], ["Doughnut", 30], ["Hand Hearts", 100], ["Money Gun", 500], ["Galaxy", 1000]];
    demoT = setInterval(() => {
      if (Math.random() < 0.06) {
        const g = gifts[Math.floor(Math.random() * (Math.random() < 0.9 ? 6 : gifts.length))], n0 = names[Math.floor(Math.random() * names.length)];
        send({ type: "gift", id: n0.toLowerCase().replace(/[^a-z0-9_]/g, ""), name: n0, gift: g[0], coins: g[1], count: g[1] === 1 ? 1 + Math.floor(Math.random() * 5) : 1, t: Date.now() });
      }
      const n = names[Math.floor(Math.random() * names.length)];
      const r = Math.random();
      const text = r < 0.7 ? "ABCD"[Math.floor(Math.random() * 4)] : r < 0.85 ? String(1 + Math.floor(Math.random() * 3)) : extra[Math.floor(Math.random() * extra.length)];
      send({ type: "chat", id: n.toLowerCase().replace(/[^a-z0-9_]/g, ""), name: n, text, t: Date.now() });
    }, 700);
  }

  async function start() {
    if (closed) return;
    if (user === "demo") { startDemo(); return; }
    send({ type: "status", state: "waiting", message: "Connexion au live de @" + user + "…" });
    const conn = new TikTokLiveConnection(user, { signApiKey: API_KEY, processInitialData: false, enableExtendedGiftInfo: true });
    tt = conn;
    conn.on(WebcastEvent.CHAT, (d) => {
      // Selon les versions de TikTok, le texte est dans « content » ou « comment »,
      // et le pseudo (@…) dans « uniqueId » ou « displayId ».
      const u = (d && d.user) || {};
      const handle = String(u.uniqueId || u.displayId || "").trim();
      const id = handle || String(u.userId || u.id || "").trim();
      const name = String(u.nickname || handle || "").trim();
      const text = String((d && (d.comment != null && d.comment !== "" ? d.comment : d.content)) || "");
      if (!text) return;
      if (!id && !name) return;
      send({ type: "chat", id: id || name, name: name || id, text, t: Date.now() });
    });
    // Cadeaux : on attend la fin d'un combo (giftType 1) pour envoyer le total.
    conn.on(WebcastEvent.GIFT, (d) => {
      const u = (d && d.user) || {};
      const det = (d && d.giftDetails) || {};
      const ext = (d && d.extendedGiftInfo) || {};
      const type = det.giftType != null ? det.giftType : d.giftType;
      if (type === 1 && !d.repeatEnd) return;
      const handle = String(u.uniqueId || u.displayId || "").trim();
      const id = handle || String(u.userId || u.id || "").trim();
      const name = String(u.nickname || handle || "").trim();
      const gift = String(det.giftName || ext.name || d.giftName || "Cadeau");
      const coins = Number(det.diamondCount || ext.diamond_count || d.diamondCount || 0);
      const count = Math.max(1, Number(d.repeatCount || 1));
      if (!id && !name) return;
      send({ type: "gift", id: id || name, name: name || id, gift, coins, count, t: Date.now() });
    });
    conn.on(WebcastEvent.STREAM_END, () => {
      send({ type: "status", state: "ended", message: "Le live est terminé." });
      retry(20000);
    });
    conn.on(ControlEvent.DISCONNECTED, () => {
      if (closed || tt !== conn) return;
      send({ type: "status", state: "waiting", message: "Connexion au live perdue, nouvelle tentative…" });
      retry(8000);
    });
    conn.on(ControlEvent.ERROR, (e) => { console.error("[" + user + "] erreur", e && e.message ? e.message : e); });
    try {
      await conn.connect();
      if (closed || tt !== conn) { conn.disconnect().catch(() => {}); return; }
      console.log("[" + user + "] connecté");
      send({ type: "status", state: "connected", message: "Connecté au live de @" + user + "." });
    } catch (e) {
      if (closed || tt !== conn) return;
      console.error("[" + user + "] échec", e && e.message ? e.message : e);
      const ex = explain(e);
      send({ type: "status", state: "error", message: ex.message });
      retry(ex.wait);
    }
  }

  ws.on("close", () => { closed = true; clearTimeout(retryT); cleanup(); });
  start();
});

// Garde les connexions ouvertes derrière les proxys de l'hébergeur, et nettoie celles qui sont mortes.
setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) { ws.terminate(); return; }
    ws.isAlive = false;
    try { ws.ping(); } catch (e) {}
  });
}, 25000);

server.listen(PORT, () => console.log("Relais Studio Quiz à l'écoute sur le port " + PORT));
