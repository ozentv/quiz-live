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
import { TikTokLiveConnection, WebcastEvent, ControlEvent } from "tiktok-live-connector";

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

function explain(err) {
  const name = (err && (err.name || (err.constructor && err.constructor.name))) || "";
  const msg = String((err && err.message) || err || "");
  if (/offline/i.test(name) || /offline|online|not.*live|isn.t live/i.test(msg)) return "Le live n'est pas lancé sur ce compte. Lance ton live puis réessaie.";
  if (/rate|429|limit/i.test(msg)) return "Trop de connexions au service TikTok. Réessaie dans une minute, ou ajoute une clé EULER_API_KEY.";
  if (/not.*found|404|user/i.test(msg)) return "Compte TikTok introuvable. Vérifie le pseudo.";
  return "Connexion au live impossible : " + msg.slice(0, 160);
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
    demoT = setInterval(() => {
      const n = names[Math.floor(Math.random() * names.length)];
      const text = Math.random() < 0.8 ? "ABCD"[Math.floor(Math.random() * 4)] : extra[Math.floor(Math.random() * extra.length)];
      send({ type: "chat", id: n.toLowerCase().replace(/[^a-z0-9_]/g, ""), name: n, text, t: Date.now() });
    }, 700);
  }

  async function start() {
    if (closed) return;
    if (user === "demo") { startDemo(); return; }
    send({ type: "status", state: "waiting", message: "Connexion au live de @" + user + "…" });
    const conn = new TikTokLiveConnection(user, { signApiKey: API_KEY, processInitialData: false });
    tt = conn;
    conn.on(WebcastEvent.CHAT, (d) => {
      const u = (d && d.user) || {};
      const id = String(u.uniqueId || u.userId || "").trim();
      const name = String(u.nickname || u.uniqueId || "").trim();
      const text = String((d && d.comment) || "");
      if (!id && !name) return;
      send({ type: "chat", id: id || name, name: name || id, text, t: Date.now() });
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
      send({ type: "status", state: "error", message: explain(e) });
      retry(15000);
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
