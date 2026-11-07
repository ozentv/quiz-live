// Voix off IA (Gemini) : le relais fabrique l'audio, la clé Gemini reste sur Render.
//
// Variables d'environnement (sur Render) :
//   GEMINI_API_KEY    clé gratuite créée sur https://aistudio.google.com/apikey
//   GEMINI_TTS_MODEL  (facultatif) modèle de voix, par défaut gemini-3.8-flash-tts
//   ADMIN_KEY         la même clé que pour le classement : la page doit la fournir,
//                     pour que personne d'autre n'utilise ton quota Gemini.
//
// GET /tts?text=...&voice=Puck&style=...&key=<ADMIN_KEY>  ->  audio/wav

const GEMINI_KEY = (process.env.GEMINI_API_KEY || "").trim();
const MODEL = (process.env.GEMINI_TTS_MODEL || "gemini-3.8-flash-tts").trim();
const OLD_MODEL = "gemini-2.5-flash-preview-tts";
const ADMIN = (process.env.ADMIN_KEY || "").trim();
const API = (process.env.GEMINI_API_BASE || "https://generativelanguage.googleapis.com/v1beta").replace(/\/+$/, "");
const cache = new Map(); // phrases déjà générées (les phrases qui reviennent ne coûtent rien)

function wav(pcm, rate = 24000) {
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + pcm.length, 4); h.write("WAVE", 8); h.write("fmt ", 12);
  h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(1, 22); h.writeUInt32LE(rate, 24);
  h.writeUInt32LE(rate * 2, 28); h.writeUInt16LE(2, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(pcm.length, 40);
  return Buffer.concat([h, pcm]);
}
// Cherche le premier bloc audio en base64 dans la réponse, quelle que soit sa forme.
function findAudio(o, depth = 0) {
  if (!o || typeof o !== "object" || depth > 8) return null;
  if (typeof o.data === "string" && o.data.length > 200) return { data: o.data, mime: String(o.mime_type || o.mimeType || "") };
  if (o.inlineData) { const r = findAudio(o.inlineData, depth + 1); if (r) return r; }
  for (const k of Object.keys(o)) { const r = findAudio(o[k], depth + 1); if (r) return r; }
  return null;
}
function toWav(a) {
  const buf = Buffer.from(a.data, "base64");
  if (buf.slice(0, 4).toString() === "RIFF") return buf;
  const m = /rate=(\d+)/.exec(a.mime);
  return wav(buf, m ? Number(m[1]) : 24000);
}
async function post(url, body) {
  const r = await fetch(url, { method: "POST", headers: { "content-type": "application/json", "x-goog-api-key": GEMINI_KEY }, body: JSON.stringify(body), signal: AbortSignal.timeout(25000) });
  const txt = await r.text(); let j = null; try { j = JSON.parse(txt); } catch (e) {}
  if (!r.ok) { const e = new Error((j && j.error && j.error.message) || txt.slice(0, 200) || "HTTP " + r.status); e.status = r.status; throw e; }
  const a = findAudio(j); if (!a) throw new Error("réponse sans audio");
  return toWav(a);
}
async function generate(text, voice, style) {
  try {
    const content = { type: "text", text };
    if (style) content.annotations = [{ type: "speech_metadata", style }];
    return await post(API + "/interactions", {
      model: MODEL, input: [{ type: "user_input", content: [content] }],
      response_format: { type: "audio" }, generation_config: { speech_config: [{ voice }] },
    });
  } catch (e) {
    if (e.status === 429 || e.status === 401 || e.status === 403) throw e;
    console.error("tts interactions", e.status, e.message);
    // Ancienne méthode, si le nouveau point d'accès n'est pas disponible sur ce compte.
    return await post(API + "/models/" + OLD_MODEL + ":generateContent", {
      contents: [{ parts: [{ text: (style ? "Lis ce texte en français, ton : " + style + ". Texte : " : "") + text }] }],
      generationConfig: { responseModalities: ["AUDIO"], speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: voice } } } },
    });
  }
}

export async function handle(u, res) {
  res.setHeader("access-control-allow-origin", "*");
  const fail = (code, error) => { res.writeHead(code, { "content-type": "application/json; charset=utf-8" }); res.end(JSON.stringify({ error })); };
  if (!GEMINI_KEY) return fail(503, "Voix Gemini : GEMINI_API_KEY n'est pas réglée sur Render (onglet Environment).");
  if (!ADMIN) return fail(503, "Voix Gemini : règle aussi ADMIN_KEY sur Render.");
  if (String(u.searchParams.get("key") || "").trim() !== ADMIN) return fail(403, "Voix Gemini : la clé (ADMIN_KEY) est absente ou incorrecte dans la page.");
  const text = String(u.searchParams.get("text") || "").replace(/\s+/g, " ").trim().slice(0, 600);
  if (!text) return fail(400, "Texte vide.");
  const v = String(u.searchParams.get("voice") || ""), voice = /^[A-Za-z]{3,20}$/.test(v) ? v : "Puck";
  const style = String(u.searchParams.get("style") || "").slice(0, 160);
  const ck = voice + "|" + style + "|" + text;
  try {
    let audio = cache.get(ck);
    if (!audio) {
      audio = await generate(text, voice, style);
      cache.set(ck, audio); if (cache.size > 400) cache.delete(cache.keys().next().value);
    }
    res.writeHead(200, { "content-type": "audio/wav", "cache-control": "public, max-age=86400" });
    res.end(audio);
  } catch (e) {
    console.error("tts", e.status, e.message);
    if (e.status === 429) return fail(429, "Voix Gemini : quota atteint pour le moment (limite gratuite de Google). La voix du téléphone prend le relais.");
    if (e.status === 400 || e.status === 401 || e.status === 403) return fail(502, "Voix Gemini refusée par Google : " + String(e.message).slice(0, 160));
    return fail(502, "Voix Gemini indisponible : " + String(e.message).slice(0, 160));
  }
}
