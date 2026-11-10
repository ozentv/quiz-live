/* Packs et album : ouverture de packs de cartes de Ligue 1, album à compléter, doublons revendus. */
(function () {
  "use strict";
  var W = 1080, H = 1920, FONT = "Figtree, system-ui, sans-serif";
  var $ = function (s) { return document.querySelector(s); };

  /* ---------- clubs, raretés, packs ---------- */
  var CLUBS = {
    "PSG": { c1: "#004170", c2: "#da291c", dark: "#001a33", ab: "PSG" }, "OM": { c1: "#2faee0", c2: "#ffffff", dark: "#0b3550", ab: "OM" },
    "Monaco": { c1: "#e2001a", c2: "#ffffff", dark: "#3d0007", ab: "ASM" }, "Lille": { c1: "#e01e13", c2: "#1a2b4c", dark: "#2a0604", ab: "LOSC" },
    "Lyon": { c1: "#1c3e8c", c2: "#e2001a", dark: "#0b1a3d", ab: "OL" }, "Lens": { c1: "#ffd100", c2: "#e30613", dark: "#3d1500", ab: "RCL" },
    "Nice": { c1: "#e2001a", c2: "#111111", dark: "#2a0005", ab: "OGCN" }, "Rennes": { c1: "#e2001a", c2: "#111111", dark: "#2a0005", ab: "SRFC" },
    "Strasbourg": { c1: "#009fe3", c2: "#ffffff", dark: "#00304a", ab: "RCSA" }, "Paris FC": { c1: "#0b1f4b", c2: "#8ec5ff", dark: "#050d22", ab: "PFC" },
    "Brest": { c1: "#e2001a", c2: "#ffffff", dark: "#3d0007", ab: "SB29" }, "Toulouse": { c1: "#5b2a86", c2: "#ffffff", dark: "#1f0b33", ab: "TFC" },
    "Lorient": { c1: "#f58220", c2: "#111111", dark: "#3a1a02", ab: "FCL" }, "Auxerre": { c1: "#0d4fa3", c2: "#ffffff", dark: "#04193a", ab: "AJA" },
    "Angers": { c1: "#111111", c2: "#ffffff", dark: "#0a0a0a", ab: "SCO" }, "Le Havre": { c1: "#7cc0eb", c2: "#0a2a4a", dark: "#0a2238", ab: "HAC" },
    "Le Mans": { c1: "#e2001a", c2: "#f2c200", dark: "#3d0007", ab: "LMFC" }, "Troyes": { c1: "#0055a4", c2: "#ffffff", dark: "#001a33", ab: "ESTAC" }
  };
  var L1 = { c1: "#0a60ff", c2: "#06246b", dark: "#03113a", ab: "L1" };
  var ISO = { "France": "FR", "Sénégal": "SN", "Algérie": "DZ", "Maroc": "MA", "Côte d'Ivoire": "CI", "Mali": "ML", "Danemark": "DK", "Portugal": "PT", "Belgique": "BE", "Brésil": "BR", "Cameroun": "CM", "Suisse": "CH", "Espagne": "ES", "Ghana": "GH", "Japon": "JP", "Pologne": "PL", "Italie": "IT", "Pays-Bas": "NL", "Argentine": "AR", "États-Unis": "US", "Allemagne": "DE", "Suède": "SE", "Canada": "CA", "RD Congo": "CD", "Norvège": "NO", "Équateur": "EC", "Guinée": "GN", "Burkina Faso": "BF", "Nigeria": "NG", "Mauritanie": "MR", "Centrafrique": "CF", "Gabon": "GA", "Autriche": "AT", "Turquie": "TR", "Tunisie": "TN", "Russie": "RU", "Comores": "KM", "Haïti": "HT", "Congo": "CG", "Chine": "CN", "Guinée-Bissau": "GW", "Tanzanie": "TZ", "Bosnie-Herzégovine": "BA", "Arabie saoudite": "SA", "Monténégro": "ME", "Croatie": "HR", "Paraguay": "PY", "Indonésie": "ID", "Islande": "IS", "Slovénie": "SI", "Grèce": "GR", "Bénin": "BJ", "Slovaquie": "SK", "Angola": "AO", "Tchéquie": "CZ", "Finlande": "FI", "Égypte": "EG", "Burundi": "BI", "Ukraine": "UA", "Géorgie": "GE", "Jordanie": "JO", "Costa Rica": "CR", "Venezuela": "VE", "Madagascar": "MG", "Australie": "AU", "Togo": "TG", "Uruguay": "UY", "Colombie": "CO", "Mexique": "MX", "Serbie": "RS", "Hongrie": "HU", "Roumanie": "RO", "Irlande": "IE", "Corée du Sud": "KR", "Cap-Vert": "CV", "Zambie": "ZM", "Gambie": "GM", "Kosovo": "XK", "Albanie": "AL", "Macédoine du Nord": "MK", "Israël": "IL", "Iran": "IR", "Chili": "CL", "Pérou": "PE", "Jamaïque": "JM", "Bulgarie": "BG", "Luxembourg": "LU", "Kenya": "KE", "Afrique du Sud": "ZA", "Libye": "LY", "Ouzbékistan": "UZ", "Lituanie": "LT", "Lettonie": "LV", "Estonie": "EE", "Chypre": "CY", "Malte": "MT", "Arménie": "AM", "Azerbaïdjan": "AZ", "Kazakhstan": "KZ", "Moldavie": "MD", "Biélorussie": "BY", "Nouvelle-Zélande": "NZ", "Qatar": "QA", "Émirats arabes unis": "AE", "Irak": "IQ", "Syrie": "SY", "Liban": "LB", "Ouganda": "UG", "Rwanda": "RW", "Zimbabwe": "ZW", "Soudan": "SD", "Niger": "NE", "Tchad": "TD", "Sierra Leone": "SL", "Liberia": "LR", "Guinée équatoriale": "GQ", "Mozambique": "MZ", "Namibie": "NA", "Panama": "PA", "Honduras": "HN", "Guatemala": "GT", "Salvador": "SV", "Bolivie": "BO", "Suriname": "SR", "Guyana": "GY", "Martinique": "MQ", "Guadeloupe": "GP", "Nouvelle-Calédonie": "NC" };
  var SUBD = { "Angleterre": "gbeng", "Écosse": "gbsct", "Pays de Galles": "gbwls" };
  function flag(nat) { if (SUBD[nat]) return "\uD83C\uDFF4" + SUBD[nat].split("").map(function (ch) { return String.fromCodePoint(0xE0000 + ch.charCodeAt(0)); }).join("") + String.fromCodePoint(0xE007F); var c = ISO[nat]; if (!c) return ""; return String.fromCodePoint(0x1F1E6 + c.charCodeAt(0) - 65, 0x1F1E6 + c.charCodeAt(1) - 65); }
  function info(c) { if (c.nat !== undefined) return c; var p = (BYCLUB[c.club] || []).concat(ICONS).filter(function (x) { return x.name === c.name; })[0]; return p ? { nat: p.nat, an: p.an, pos: p.pos } : {}; }
  function club(n) { return CLUBS[n] || { c1: "#475569", c2: "#cbd5e1", dark: "#111827", ab: String(n || "?").slice(0, 4).toUpperCase() }; }
  var RAR = {
    commune: { a: "#eef1f5", b: "#b9c2cc", c: "#7d8794", ink: "#1f2630", beam: "205,214,228", label: "COMMUNE", bonus: -7, rank: 0, sell: 50 },
    or: { a: "#fff3b0", b: "#e2b93b", c: "#8a6512", ink: "#2b1d03", beam: "255,210,80", label: "OR RARE", bonus: 0, rank: 1, sell: 200 },
    futur: { a: "#9ff7e0", b: "#10a37f", c: "#053b2e", ink: "#ffffff", beam: "60,230,170", label: "FUTUR TALENT", bonus: 6, rank: 2, sell: 800, edge: "#b8ffe9" },
    forme: { a: "#ff8a7a", b: "#8f1220", c: "#1a0204", ink: "#ffd27a", beam: "255,90,70", label: "EN FORME", bonus: 2, rank: 2, sell: 800, edge: "#ffd27a" },
    totw: { a: "#3b3b3b", b: "#141414", c: "#000000", ink: "#f5d77a", beam: "255,185,60", label: "ÉQUIPE DE LA SEMAINE", bonus: 3, rank: 2, sell: 1000, edge: "#f5d77a" },
    potm: { a: "#7fd4ff", b: "#1e4fd8", c: "#0a1f6b", ink: "#ffffff", beam: "90,170,255", label: "JOUEUR DU MOIS", bonus: 4, rank: 3, sell: 1500, edge: "#bfe8ff" },
    hero: { a: "#d5a6ff", b: "#6d28d9", c: "#22074f", ink: "#ffe9a8", beam: "190,120,255", label: "HÉROS", bonus: 5, rank: 4, sell: 2500, edge: "#ffe9a8" },
    fds: { a: "#8fc3ff", b: "#1b4fd1", c: "#06103d", ink: "#ffe58a", beam: "120,170,255", label: "FIN DE SAISON", bonus: 7, rank: 4, sell: 3000, edge: "#ffe58a" },
    icone: { a: "#ffffff", b: "#efe6c8", c: "#b89a52", ink: "#3a2f12", beam: "255,240,200", label: "ICÔNE", bonus: 0, rank: 5, sell: 5000, edge: "#d9b85c" }
  };
  // Icônes : anciennes légendes des clubs (joueurs à la retraite), notes inventées par la page
  var ICONS = ("Zlatan Ibrahimović|PSG|BU|94|Suède|1981;Ronaldinho|PSG|MOC|94|Brésil|1980;Raí|PSG|MOC|91|Brésil|1965;Safet Sušić|PSG|MOC|90|Bosnie-Herzégovine|1955;Pauleta|PSG|BU|89|Portugal|1973;" +
    "Jean-Pierre Papin|OM|BU|93|France|1963;Didier Drogba|OM|BU|93|Côte d'Ivoire|1978;Marcel Desailly|OM|DC|91|France|1968;Abedi Pelé|OM|MOC|90|Ghana|1964;Chris Waddle|OM|AD|89|Angleterre|1960;Basile Boli|OM|DC|88|France|1967;" +
    "Thierry Henry|Monaco|AG|94|France|1977;Ludovic Giuly|Monaco|AD|87|France|1976;Juninho|Lyon|MC|92|Brésil|1975;Sonny Anderson|Lyon|BU|90|Brésil|1970;Grégory Coupet|Lyon|G|88|France|1972;" +
    "Eden Hazard|Lille|AG|91|Belgique|1991;Yohan Cabaye|Lille|MC|86|France|1986;Raphaël Varane|Lens|DC|89|France|1993;Tony Vairelles|Lens|BU|85|France|1973;Éric Sikora|Lens|DD|85|France|1968;" +
    "Hatem Ben Arfa|Nice|AD|87|France|1987;Sylvain Wiltord|Rennes|BU|87|France|1974;Yoann Gourcuff|Rennes|MOC|87|France|1986;José Luis Chilavert|Strasbourg|G|88|Paraguay|1965;Frank Lebœuf|Strasbourg|DC|87|France|1968;" +
    "Franck Ribéry|Brest|AG|92|France|1983;Fabien Barthez|Toulouse|G|90|France|1971;Laurent Koscielny|Lorient|DC|87|France|1985;Éric Cantona|Auxerre|BU|92|France|1966;Djibril Cissé|Auxerre|BU|88|France|1981;Lassana Diarra|Le Havre|MDC|87|France|1985")
    .split(";").map(function (l) { var p = l.split("|"); return { name: p[0], club: p[1], pos: p[2], base: +p[3], nat: p[4], an: +p[5], icon: true }; });
  var PACKS = [
    { id: "base", label: "Pack de base", info: "5 cartes, surtout des communes", price: 500, slots: ["commune", "commune", "commune", "co"], best: [["or", .82], ["totw", .08], ["forme", .06], ["futur", .04]] },
    { id: "club", label: "Pack club", info: "5 cartes du club demandé", price: 1500, club: true, slots: ["commune", "commune", "or", "or"], best: [["or", .5], ["totw", .2], ["forme", .12], ["futur", .12], ["potm", .06]] },
    { id: "or", label: "Pack or", info: "6 cartes, au moins 3 en or", price: 2500, slots: ["commune", "commune", "or", "or", "or"], best: [["or", .6], ["totw", .22], ["forme", .1], ["futur", .08]] },
    { id: "futur", label: "Pack Futurs talents", info: "5 cartes, 1 futur talent garanti (moins de 21 ans)", price: 4000, slots: ["commune", "commune", "or", "or"], best: [["futur", 1]] },
    { id: "totw", label: "Pack Équipe de la semaine", info: "5 cartes, 1 équipe de la semaine garantie", price: 5000, slots: ["commune", "commune", "or", "or"], best: [["totw", 1]] },
    { id: "premium", label: "Pack premium", info: "7 cartes, 1 joueur du mois, héros, fin de saison ou icône garanti", price: 10000, slots: ["commune", "commune", "or", "or", "or", "totw"], best: [["potm", .4], ["hero", .33], ["fds", .2], ["icone", .07]] },
    { id: "icone", label: "Pack Icône", info: "6 cartes, 1 icône garantie (légende d'un club)", price: 25000, slots: ["commune", "or", "or", "totw", "forme"], best: [["icone", 1]] }
  ];
  // valeur sur le marché : selon la rareté et la note, et le marché bouge un peu à chaque épisode
  function value(c, epi) { var r = c.rating, base = { commune: 150 + Math.max(0, r - 55) * 12, or: 400 + Math.max(0, r - 65) * 90, futur: 1800 + Math.max(0, r - 70) * 260, forme: 1800 + Math.max(0, r - 70) * 260, totw: 2000 + Math.max(0, r - 70) * 280, potm: 3500 + Math.max(0, r - 75) * 420, hero: 5000 + Math.max(0, r - 75) * 550, fds: 7000 + Math.max(0, r - 75) * 700, icone: 18000 + Math.max(0, r - 84) * 2500 }[c.rk] || 300, h = 7, k = c.name + "#" + epi; for (var i = 0; i < k.length; i++) h = (h * 31 + k.charCodeAt(i)) % 100003; return Math.max(50, Math.round(base * (.85 + .3 * (h % 100) / 100) / 50) * 50); }
  var BONUS = 500; // pièces gagnées à chaque épisode, en plus des doublons
  function rescue(P) { return S.free <= 0 && P.id === "base" && S.coins < P.price; } // pack de secours : la série ne s'arrête jamais
  function packOf(id) { return PACKS.filter(function (p) { return p.id === id; })[0] || PACKS[0]; }

  /* ---------- joueurs ---------- */
  var PLAYERS = [], BYCLUB = {};
  function loadDb() {
    var txt = ""; try { txt = localStorage.getItem("packs-db") || ""; } catch (e) {}
    if (!txt) txt = $("#dbDefault").textContent;
    PLAYERS = []; BYCLUB = {};
    txt.split("\n").forEach(function (l) { var p = l.split("|").map(function (x) { return x.trim(); }); if (p.length < 4 || !p[0]) return; var o = { name: p[0], club: p[1], pos: (p[2] || "MC").toUpperCase(), base: Math.max(40, Math.min(99, +p[3] || 70)), nat: p[4] || "", an: +p[5] || 0 }; PLAYERS.push(o); (BYCLUB[o.club] = BYCLUB[o.club] || []).push(o); });
    $("#db").value = txt.trim();
  }
  function clubList() { var k = Object.keys(CLUBS).filter(function (c) { return BYCLUB[c]; }); Object.keys(BYCLUB).forEach(function (c) { if (k.indexOf(c) < 0) k.push(c); }); return k; }

  /* ---------- sauvegarde (une par compte) ---------- */
  var ACC = "om", S = null;
  try { ACC = localStorage.getItem("packs-acc") || "om"; } catch (e) {}
  function fresh() { return { v: 1, coins: 2000, free: 1, epi: 0, cards: {}, done: {}, last: null }; }
  function load() { try { S = JSON.parse(localStorage.getItem("packs-save-" + ACC) || "null"); } catch (e) { S = null; } if (!S || !S.cards) S = fresh(); }
  function save() { try { localStorage.setItem("packs-save-" + ACC, JSON.stringify(S)); localStorage.setItem("packs-acc", ACC); } catch (e) { msg("⚠️ Impossible d'enregistrer sur ce téléphone (mémoire pleine ?)."); } }
  function keyOf(c) { return c.name + "|" + c.club + "|" + c.rk; }
  function hasBase(p) { var k = p.name + "|" + p.club + "|"; return Object.keys(RAR).some(function (r) { return S.cards[k + r]; }); }
  function bestOwned(p) { var k = p.name + "|" + p.club + "|", b = null, n = 0; Object.keys(RAR).forEach(function (r) { if (S.cards[k + r]) { n += S.cards[k + r]; b = r; } }); return b ? { rk: b, n: n } : null; }
  function albumCount() { var n = 0; PLAYERS.forEach(function (p) { if (hasBase(p)) n++; }); return n; }
  function clubDone(c) { var l = BYCLUB[c] || []; return l.length > 0 && l.every(hasBase); }

  /* ---------- tirage d'un pack ---------- */
  function rng(s) { s = Math.abs(Math.floor(s)) % 2147483647 || 1; for (var w = 0; w < 12; w++) s = (s * 16807) % 2147483647; return function () { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
  function pickW(r, list) { var x = r(), acc = 0; for (var i = 0; i < list.length; i++) { acc += list[i][1]; if (x < acc) return list[i][0]; } return list[list.length - 1][0]; }
  function draw(packId, clubName, seed) {
    var P = packOf(packId), r = rng(seed), pool = P.club && BYCLUB[clubName] ? BYCLUB[clubName] : PLAYERS, used = {}, out = [];
    function pick(minRank) { // les meilleures cartes vont plutôt aux meilleurs joueurs
      var sorted = pool.slice().sort(function (a, b) { return b.base - a.base; }), top = minRank >= 2 ? sorted.slice(0, Math.max(3, Math.ceil(sorted.length * .2))) : minRank === 1 ? sorted.slice(0, Math.max(5, Math.ceil(sorted.length * .6))) : sorted;
      var c = top.filter(function (p) { return !used[p.name]; }); if (!c.length) c = pool.filter(function (p) { return !used[p.name]; }); if (!c.length) c = pool;
      var p = c[Math.floor(r() * c.length)]; used[p.name] = 1; return p; }
    function card(p, rk) { return { name: p.name, club: p.club, pos: p.pos, nat: p.nat, an: p.an, rk: rk, rating: Math.max(45, Math.min(99, p.base + RAR[rk].bonus)) }; }
    function pickFrom(list) { var c = list.filter(function (p) { return !used[p.name]; }); if (!c.length) return null; var p = c[Math.floor(r() * c.length)]; used[p.name] = 1; return p; }
    function special(rk) { // futur talent : jeunes de moins de 21 ans ; icône : légende du club
      if (rk === "icone") { var ic = pickFrom(P.club ? ICONS.filter(function (x) { return x.club === clubName; }) : ICONS) || pickFrom(ICONS); return ic ? card(ic, "icone") : null; }
      if (rk === "futur") { var yg = pool.filter(function (p) { return p.an >= 2005; }).sort(function (a, b) { return b.base - a.base; }); var y = pickFrom(yg.slice(0, Math.max(4, Math.ceil(yg.length * .5)))); return y ? card(y, "futur") : null; }
      return card(pick(RAR[rk].rank + 1), rk); }
    P.slots.forEach(function (s) { var rk = s === "co" ? (r() < .5 ? "or" : "commune") : s; out.push(rk === "forme" || rk === "futur" ? (special(rk) || card(pick(1), "or")) : card(pick(RAR[rk].rank), rk)); });
    out.sort(function (a, b) { return RAR[a.rk].rank - RAR[b.rk].rank || a.rating - b.rating; });
    var bk = pickW(r, P.best); out.push(special(bk) || card(pick(2), "totw"));
    return out;
  }

  /* ---------- ouverture : achat, nouvelles cartes, doublons ---------- */
  function openPack() {
    var P = packOf(selPack()), useFree = S.free > 0 || rescue(P);
    if (!useFree && S.coins < P.price) { msg("Pas assez de pièces : il te faut " + fmt(P.price) + " 🪙."); toast("🔒", "Pas assez de pièces", "Il te faut " + fmt(P.price) + " 🪙", "bad"); return; }
    if (!PLAYERS.length) { msg("La liste des joueurs est vide."); return; }
    var clubName = $("#club").value, seed = Date.now() % 2147483646, cards = draw(P.id, clubName, seed), coins0 = S.coins, before = albumCount(), seen = {}, earned = 0;
    if (S.free > 0) S.free--; else if (!useFree) S.coins -= P.price;
    var doneBefore = {}; clubList().forEach(function (c) { doneBefore[c] = clubDone(c); });
    cards.forEach(function (c) { c.value = value(c, S.epi + 1); var k = keyOf(c); if (S.cards[k] || seen[k]) { c.dup = true; c.sold = RAR[c.rk].sell; earned += c.sold; S.cards[k] = (S.cards[k] || 0) + 1; } else { c.isNew = true; S.cards[k] = 1; } seen[k] = 1; });
    S.coins += earned + BONUS;
    var completed = clubList().filter(function (c) { return !doneBefore[c] && clubDone(c); });
    completed.forEach(function (c) { S.done[c] = true; S.free++; });
    S.epi++;
    S.last = { epi: S.epi, pack: P.id, club: P.club ? clubName : "", free: useFree, price: useFree ? 0 : P.price, who: $("#who").value.trim(), com: $("#com").value.trim(), cards: cards, earned: earned, bonus: BONUS, sales: 0, coins: S.coins, coinsBefore: coins0, album: [albumCount(), PLAYERS.length], albumBefore: before, completed: completed };
    save(); refresh(); showResult(); makeCap();
    var Lp = S.last; if (vSet().on) { msg("🎙️ Préparation de la voix…"); var to = new Promise(function (r) { setTimeout(function () { r(false); }, 12000); }); Promise.race([prepVoice(Lp), to]).then(function () { if (S.last === Lp) { msg(""); playNow(); } }); } else playNow();
    toast("🃏", packOf(P.id).label + (P.club ? " " + clubName : ""), useFree ? "Pack offert 🎁" : "Pack acheté · -" + fmt(P.price) + " 🪙"); if (completed.length) setTimeout(function () { toast("🏆", "Page " + completed.join(", ") + " complétée !", "Pack offert débloqué", "good"); }, 900);
  }
  function selPack() { var r = document.querySelector("input[name=pk]:checked"); return r ? r.value : "base"; }
  function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " "); }
  function showResult() {
    var L = S.last; if (!L) { $("#res").innerHTML = ""; return; }
    $("#res").innerHTML = "<b>Épisode " + L.epi + " · " + packOf(L.pack).label + (L.club ? " " + L.club : "") + "</b>" + L.cards.map(function (c, i) {
      var last = i === L.cards.length - 1, line = "<span class=\"" + (c.dup ? "dup" : "new") + "\">" + (c.dup ? "♻️ Doublon" : c.sale ? "💸 Vendue" : "🆕 Nouvelle") + " · " + esc(c.name) + " (" + RAR[c.rk].label.toLowerCase() + ", " + c.rating + ")" + (c.dup ? " +" + fmt(c.sold) + " 🪙" : c.sale ? " +" + fmt(c.sale) + " 🪙" : "") + "</span>";
      if (c.dup || c.value == null) return line;
      return "<div class=\"deal\">" + line + "<span class=\"btns2\"><button type=\"button\" class=\"mini" + (c.sale ? " on" : "") + "\" data-sell=\"" + i + "\">💸 " + (c.sale ? "Vendue" : "Vendre") + " " + fmt(c.value) + " 🪙</button><button type=\"button\" class=\"mini" + (c.keep ? " on" : "") + "\" data-keep=\"" + i + "\">🔒 " + (c.keep ? "Gardée" : "Garder") + "</button></span>" + (last && !c.sale && !c.keep ? "<small>Sans choix, la vidéo demande aux abonnés : « Je la garde ou je la vends ? 👇 »</small>" : "") + "</div>"; }).join("") + (L.completed.length ? "<b>🏆 Page complétée : " + L.completed.map(esc).join(", ") + " → 1 pack offert !</b>" : "");
    document.querySelectorAll("[data-sell]").forEach(function (b) { b.onclick = function () { deal(+b.getAttribute("data-sell"), "sell"); }; });
    document.querySelectorAll("[data-keep]").forEach(function (b) { b.onclick = function () { deal(+b.getAttribute("data-keep"), "keep"); }; });
  }
  function deal(i, what) { // vendre ou garder une carte du dernier pack
    var L = S.last, c = L && L.cards[i]; if (!c || c.dup) return; var k = keyOf(c);
    if (what === "sell" && !c.sale) { c.sale = c.value; c.keep = false; S.coins += c.value; L.sales = (L.sales || 0) + c.value; S.cards[k] = (S.cards[k] || 1) - 1; if (S.cards[k] <= 0) delete S.cards[k]; }
    else if (what === "sell" && c.sale) { S.coins -= c.sale; L.sales -= c.sale; delete c.sale; S.cards[k] = (S.cards[k] || 0) + 1; }
    else if (what === "keep") { if (c.sale) { S.coins -= c.sale; L.sales -= c.sale; delete c.sale; S.cards[k] = (S.cards[k] || 0) + 1; } c.keep = !c.keep; }
    L.coins = S.coins; L.album = [albumCount(), PLAYERS.length]; save(); refresh(); if (what === "sell" && c.sale) toast("💸", "Carte vendue : " + c.name, "+" + fmt(c.sale) + " 🪙", "good"); else if (what === "keep" && c.keep) toast("🔒", "Carte gardée : " + c.name, "Ajoutée à l'album", "good"); showResult(); makeCap(); if (!fromVideo) { pressed = null; t0 = performance.now() - (TL(L).flip + .8) * 1000; }
  }
  var fromVideo = false;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }

  /* ---------- formulaire, album ---------- */
  var tab = null;
  function refresh() {
    $("#acc").value = ACC; $("#epi").value = String(S.epi + 1);
    roll($("#wCoins"), S.coins); roll($("#wFree"), S.free);
    var have = albumCount(); roll($("#wAlbum"), have, "/" + PLAYERS.length); $("#progI").style.width = (PLAYERS.length ? have / PLAYERS.length * 100 : 0) + "%";
    var specials = Object.keys(S.cards).filter(function (k) { return !/\|(commune|or|icone)$/.test(k); }).length, icons = ICONS.filter(function (x) { return S.cards[x.name + "|" + x.club + "|icone"]; }).length;
    $("#albumNote").textContent = have + " joueurs sur " + PLAYERS.length + " (" + (PLAYERS.length ? Math.floor(have / PLAYERS.length * 100) : 0) + " %) · " + specials + " cartes spéciales · " + icons + "/" + ICONS.length + " icônes · " + Object.keys(S.done).length + " clubs complétés";
    var cur = selPack(); $("#shop").innerHTML = PACKS.map(function (p) { var ok = S.free > 0 || S.coins >= p.price || rescue(p); return "<label class=\"pk\"><input type=\"radio\" name=\"pk\" value=\"" + p.id + "\"" + (p.id === cur ? " checked" : "") + "><span>" + p.label + "<small>" + p.info + "</small></span><span class=\"price\" style=\"color:" + (ok ? "var(--fg)" : "#e11d48") + "\">" + (S.free > 0 || rescue(p) ? "🎁 offert" : fmt(p.price) + " 🪙") + "</span></label>"; }).join("");
    $("#open").textContent = S.free > 0 ? "🎁 Ouvrir le pack offert" : "🃏 Ouvrir le pack";
    var cl = clubList(); if (!tab || (tab !== "spe" && tab !== "ico" && !BYCLUB[tab])) tab = ACC === "psg" ? "PSG" : "OM";
    $("#tabs").innerHTML = cl.map(function (c) { var l = BYCLUB[c] || [], n = l.filter(hasBase).length; return "<button type=\"button\" data-tab=\"" + esc(c) + "\" aria-pressed=\"" + (tab === c) + "\">" + (S.done[c] ? "🏆 " : "") + esc(c) + " " + n + "/" + l.length + "</button>"; }).join("") + "<button type=\"button\" data-tab=\"spe\" aria-pressed=\"" + (tab === "spe") + "\">⭐ Spéciales " + specials + "</button><button type=\"button\" data-tab=\"ico\" aria-pressed=\"" + (tab === "ico") + "\">👑 Icônes " + icons + "/" + ICONS.length + "</button>";
    document.querySelectorAll("[data-tab]").forEach(function (b) { b.onclick = function () { tab = b.getAttribute("data-tab"); refresh(); }; });
    var h = "";
    if (tab === "ico") h = ICONS.map(function (x) { var n = S.cards[x.name + "|" + x.club + "|icone"]; return n ? mini({ name: x.name, club: x.club, pos: x.pos, rk: "icone", rating: x.base }, n) : "<div class=\"mc miss\" role=\"button\" tabindex=\"0\" data-ph=\"" + esc(pkey(x)) + "\" title=\"" + esc(x.name) + " · touche pour la photo\"><span></span><span class=\"q\">👑</span><span class=\"n\">" + esc(x.name) + "</span></div>"; }).join("");
    else if (tab === "spe") { var ks = Object.keys(S.cards).filter(function (k) { return !/\|(commune|or|icone)$/.test(k); });
      h = ks.length ? ks.map(function (k) { var p = k.split("|"), pl = (BYCLUB[p[1]] || []).filter(function (x) { return x.name === p[0]; })[0] || { base: 70, pos: "" }; return mini({ name: p[0], club: p[1], pos: pl.pos, rk: p[2], rating: Math.max(45, Math.min(99, pl.base + RAR[p[2]].bonus)) }, S.cards[k]); }).join("") : "<p class=\"note\">Aucune carte spéciale pour l'instant.</p>"; }
    else (BYCLUB[tab] || []).slice().sort(function (a, b) { return b.base - a.base; }).forEach(function (p) {
      var bo = bestOwned(p);
      h += bo ? mini({ name: p.name, club: p.club, pos: p.pos, rk: bo.rk, rating: Math.max(45, Math.min(99, p.base + RAR[bo.rk].bonus)) }, bo.n) : "<div class=\"mc miss\" role=\"button\" tabindex=\"0\" data-ph=\"" + esc(pkey(p)) + "\" title=\"" + esc(p.name) + " · touche pour la photo\"><span></span><span class=\"q\">?</span><span class=\"n\">" + esc(p.name) + "</span></div>";
    });
    $("#album").innerHTML = h;
    document.querySelectorAll("[data-ph]").forEach(function (el) { el.onclick = function () { var k = el.getAttribute("data-ph"); if (photos[k] && !confirm("Changer la photo de " + k.split("|")[0] + " ?\n(Annuler = garder ou retirer)")) { if (confirm("Retirer la photo de " + k.split("|")[0] + " ?")) { idbPut(k, null).then(function () { delete photos[k]; refresh(); }); } return; } pickPhoto(k); }; el.onkeydown = function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.onclick(); } }; });
  }
  // compteur qui défile comme dans un jeu
  function roll(el, to, suf) { suf = suf || ""; var from = el.__v == null ? to : el.__v; el.__v = to; if (from === to) { el.textContent = fmt(to) + suf; return; } var st = performance.now(), d = Math.min(1200, 300 + Math.abs(to - from) / 4); el.classList.remove("bump"); void el.offsetWidth; el.classList.add("bump");
    (function f() { var k = Math.min(1, (performance.now() - st) / d), e = 1 - Math.pow(1 - k, 3); el.textContent = fmt(from + (to - from) * e) + suf; if (k < 1 && el.__v === to) requestAnimationFrame(f); })(); }
  function toast(ic, ti, sub, kind) { var box = $("#toasts"); if (!box) return; var d = document.createElement("div"); d.className = "toast" + (kind ? " " + kind : ""); d.innerHTML = "<i>" + ic + "</i><div><small>" + esc(sub || "") + "</small>" + esc(ti) + "</div>"; box.appendChild(d); while (box.children.length > 3) box.removeChild(box.firstChild);
    uiSound(kind === "bad" ? 0 : 1); setTimeout(function () { d.classList.add("out"); setTimeout(function () { d.remove(); }, 400); }, 2600); }
  function uiSound(k) { try { var a = audio(), t = a.currentTime; (k ? [880, 1320] : [300, 200]).forEach(function (f, i) { var o = a.createOscillator(), g2 = a.createGain(); o.type = k ? "triangle" : "square"; o.frequency.value = f; g2.gain.setValueAtTime(.0001, t + i * .07); g2.gain.exponentialRampToValueAtTime(k ? .07 : .03, t + i * .07 + .01); g2.gain.exponentialRampToValueAtTime(.0001, t + i * .07 + .16); o.connect(g2); g2.connect(a.destination); o.start(t + i * .07); o.stop(t + i * .07 + .2); }); } catch (e) {} }
  function mini(c, n) { var ph = photos[pkey(c)], fl = flag(info(c).nat); return "<div class=\"mc " + c.rk + "\" role=\"button\" tabindex=\"0\" data-ph=\"" + esc(pkey(c)) + "\" title=\"" + esc(c.name + " · " + RAR[c.rk].label + " · touche pour la photo") + "\">" + (ph ? "<img alt=\"\" src=\"" + ph.src + "\">" : "") + "<span><span class=\"r\">" + c.rating + "</span><span class=\"p\"> " + esc(c.pos) + " " + fl + "</span></span><span></span><span class=\"n\">" + esc(c.name) + "</span>" + (n > 1 ? "<span class=\"x\">×" + n + "</span>" : "") + "</div>"; }
  function fillClubs() { $("#club").innerHTML = clubList().map(function (c) { return "<option>" + esc(c) + "</option>"; }).join(""); $("#club").value = ACC === "psg" ? "PSG" : "OM"; }

  /* ---------- photos des joueurs (IndexedDB, sur l'appareil) ---------- */
  var photos = {}, idb = null;
  function pkey(c) { return c.name + "|" + c.club; }
  function idbOpen() { return new Promise(function (res) { try { var r = indexedDB.open("packs-photos", 1); r.onupgradeneeded = function () { r.result.createObjectStore("p"); }; r.onsuccess = function () { idb = r.result; res(idb); }; r.onerror = function () { res(null); }; } catch (e) { res(null); } }); }
  function idbAll() { return idbOpen().then(function (db) { if (!db) return; return new Promise(function (res) { var st = db.transaction("p").objectStore("p"), out = []; st.openCursor().onsuccess = function (e) { var c = e.target.result; if (c) { out.push([c.key, c.value]); c.continue(); } else res(out); }; }); }).then(function (list) { (list || []).forEach(function (kv) { var im = new Image(); im.onload = function () { photos[kv[0]] = im; if (tab) refresh(); }; im.src = kv[1]; }); }); }
  function idbPut(k, v) { return idbOpen().then(function (db) { if (!db) throw new Error("db"); return new Promise(function (res, rej) { var tx = db.transaction("p", "readwrite"); if (v == null) tx.objectStore("p").delete(k); else tx.objectStore("p").put(v, k); tx.oncomplete = res; tx.onerror = rej; }); }); }
  var photoFor = null;
  function pickPhoto(k) { photoFor = k; $("#ppFile").click(); }

  /* ---------- logos (facultatifs, sur l'appareil) ---------- */
  var logos = {};
  function lkey(c) { return c === "L1" ? "packs-logo-ligue1" : "packs-logo-" + c.toLowerCase().replace(/[^a-z]/g, ""); }
  function trim(im) { // enlève les bords blancs ou transparents autour du logo
    var c = document.createElement("canvas"), w = c.width = im.width, h = c.height = im.height, x = c.getContext("2d"); x.drawImage(im, 0, 0); var d = x.getImageData(0, 0, w, h).data, x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (var y = 0; y < h; y += 2) for (var i = 0; i < w; i += 2) { var k = (y * w + i) * 4; if (d[k + 3] > 20 && !(d[k] > 240 && d[k + 1] > 240 && d[k + 2] > 240)) { if (i < x0) x0 = i; if (i > x1) x1 = i; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
    if (x1 < 0) return c; var o = document.createElement("canvas"); o.width = x1 - x0 + 2; o.height = y1 - y0 + 2; o.getContext("2d").drawImage(c, x0, y0, o.width, o.height, 0, 0, o.width, o.height); return o; }
  function loadLogo(c) { var src = ""; try { src = localStorage.getItem(lkey(c)) || ""; } catch (e) {} if (!src) { logos[c] = null; return; } var im = new Image(); im.onload = function () { logos[c] = im; }; im.src = src; }
  function logosForm() {
    $("#logos").innerHTML = ["L1"].concat(clubList()).map(function (c) { var src = ""; try { src = localStorage.getItem(lkey(c)) || ""; } catch (e) {} return "<label><span class=\"pv\" style=\"" + (src ? "background-image:url(" + src + ")" : "") + "\">" + (src ? "" : esc(club(c).ab)) + "</span><span>" + esc(c === "L1" ? "Ligue 1 (packs)" : c) + "</span><input type=\"file\" accept=\"image/*\" hidden data-logo=\"" + esc(c) + "\"></label>"; }).join("");
    document.querySelectorAll("[data-logo]").forEach(function (inp) { inp.onchange = function () { var f = this.files && this.files[0], c = inp.getAttribute("data-logo"); if (!f) return; var im = new Image(); im.onload = function () { var cv2 = document.createElement("canvas"); if (c === "L1") { var tr = trim(im), r1 = Math.min(1, 400 / Math.max(tr.width, tr.height)); cv2.width = Math.round(tr.width * r1); cv2.height = Math.round(tr.height * r1); cv2.getContext("2d").drawImage(tr, 0, 0, cv2.width, cv2.height); } else { var r = Math.min(256 / im.width, 256 / im.height); cv2.width = cv2.height = 256; cv2.getContext("2d").drawImage(im, (256 - im.width * r) / 2, (256 - im.height * r) / 2, im.width * r, im.height * r); } try { localStorage.setItem(lkey(c), cv2.toDataURL("image/png")); } catch (e) { alert("Plus de place pour ce logo."); } URL.revokeObjectURL(im.src); loadLogo(c); logosForm(); }; im.src = URL.createObjectURL(f); }; });
  }

  /* ---------- dessin ---------- */
  function rr(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
  function clamp(x) { return Math.max(0, Math.min(1, x)); }
  function ease(x) { x = clamp(x); return 1 - Math.pow(1 - x, 3); }
  function back(x) { x = clamp(x); var c = 1.70158; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); }
  function wrap(g, text, max) { var words = String(text).split(" "), lines = [], cur = ""; words.forEach(function (w) { var t = cur ? cur + " " + w : w; if (g.measureText(t).width > max && cur) { lines.push(cur); cur = w; } else cur = t; }); if (cur) lines.push(cur); return lines; }
  function badge(g, x, y, r, name) {
    var c = name === "L1" ? L1 : club(name), lg = logos[name];
    if (lg && name === "L1") { var hh = r * 2, ww = hh * lg.width / lg.height; if (ww > r * 2) { ww = r * 2; hh = ww * lg.height / lg.width; } g.save(); g.shadowColor = "rgba(0,0,0,.45)"; g.shadowBlur = r * .25; g.drawImage(lg, x - ww / 2, y - hh / 2, ww, hh); g.shadowBlur = 0; g.lineWidth = Math.max(2, r * .05); g.strokeStyle = "rgba(255,255,255,.9)"; g.strokeRect(x - ww / 2, y - hh / 2, ww, hh); g.restore(); return; }
    if (lg) { g.save(); g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.fillStyle = "#fff"; g.fill(); g.clip(); var s = r * 1.6; g.drawImage(lg, x - s / 2, y - s / 2, s, s); g.restore(); return; }
    g.save(); g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r * .85, y - r * .6); g.lineTo(x + r * .8, y + r * .25); g.quadraticCurveTo(x + r * .6, y + r * .8, x, y + r); g.quadraticCurveTo(x - r * .6, y + r * .8, x - r * .8, y + r * .25); g.lineTo(x - r * .85, y - r * .6); g.closePath(); g.fillStyle = c.c1; g.fill(); g.clip(); g.fillStyle = c.c2; g.fillRect(x, y - r, r, r * 2); g.restore();
    g.lineWidth = r * .08; g.strokeStyle = "#fff"; g.stroke(); g.fillStyle = "#fff"; g.strokeStyle = "rgba(0,0,0,.5)"; g.lineWidth = r * .07; g.font = "900 " + Math.round(r * (c.ab.length > 4 ? .34 : c.ab.length > 3 ? .42 : c.ab.length > 2 ? .55 : .7)) + "px " + FONT; g.textAlign = "center"; g.textBaseline = "middle"; g.strokeText(c.ab, x, y + r * .05); g.fillText(c.ab, x, y + r * .05);
  }
  function shortName(n) { var w = n.split(" "); return (w.length > 1 && n.length > 13 ? w.slice(1).join(" ") : n).toUpperCase(); }
  function stats(p) { var r = p.rating, s = 0; for (var i = 0; i < p.name.length; i++) s = (s * 31 + p.name.charCodeAt(i)) % 997; function v(k, b) { return Math.max(25, Math.min(99, r + b + ((s >> k) % 9) - 4)); }
    var ps = p.pos, gk = ps === "G", def = /^(DEF|DC|DD|DG|DLD|DLG)$/.test(ps), att = /^(ATT|BU|AT|AG|AD|AIL)$/.test(ps), wing = /^(AG|AD|MG|MD)$/.test(ps); if (/^(MDC)$/.test(ps)) { def = false; att = false; }
    return gk ? [["PLO", v(1, 2)], ["MAI", v(2, 0)], ["DÉG", v(3, -8)], ["RÉF", v(4, 3)], ["VIT", v(5, -20)], ["PLA", v(6, 1)]] : [["VIT", v(1, wing ? 6 : att ? 3 : def ? -6 : -2)], ["TIR", v(2, att ? 2 : def ? -25 : -6)], ["PAS", v(3, att ? -5 : 0)], ["DRI", v(4, att ? 1 : -8)], ["DÉF", v(5, def ? 2 : att ? -45 : -15)], ["PHY", v(6, def ? 0 : -8)]]; }
  function cardPath(g, w, h) { var x = -w / 2, y = -h / 2, n = w * .09; g.beginPath(); g.moveTo(x + n, y); g.lineTo(-w * .12, y); g.quadraticCurveTo(0, y + n * .55, w * .12, y); g.lineTo(-x - n, y); g.lineTo(-x, y + n); g.lineTo(-x, -y - h * .1); g.quadraticCurveTo(-x, -y - h * .04, -x - w * .08, -y - h * .025); g.lineTo(0, -y); g.lineTo(x + w * .08, -y - h * .025); g.quadraticCurveTo(x, -y - h * .04, x, -y - h * .1); g.lineTo(x, y + n); g.closePath(); }
  function card(g, p, face, shine, sp, t, par) {
    var pxo = par || 0;
    var w = 640, h = 920, R = RAR[p.rk], c = club(p.club), inf = info(p), ph = photos[pkey(p)], tt = t || 0;
    g.save(); if (!TEXMODE) { g.shadowColor = "rgba(" + R.beam + ",.6)"; g.shadowBlur = 60; } cardPath(g, w, h);
    var gr = g.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2); gr.addColorStop(0, R.a); gr.addColorStop(.5, R.b); gr.addColorStop(1, R.c); g.fillStyle = gr; g.fill(); g.restore();
    g.save(); cardPath(g, w, h); g.clip();
    if (R.rank >= 2) { var cg = g.createRadialGradient(60, -180, 30, 60, -120, 560); cg.addColorStop(0, c.c1); cg.addColorStop(1, "rgba(0,0,0,0)"); g.globalAlpha = .5; g.fillStyle = cg; g.fillRect(-w / 2, -h / 2, w, h); g.globalAlpha = 1; }
    g.globalAlpha = R.rank ? .14 : .08; g.strokeStyle = "#fff"; g.lineWidth = 3; for (var k = -10; k < 12; k++) { g.beginPath(); g.moveTo(k * 70, -h / 2); g.lineTo(k * 70 - 400, h / 2); g.stroke(); } g.globalAlpha = 1;
    g.fillStyle = R.ink; g.textAlign = "center"; g.textBaseline = "middle";
    if (!face) { badge(g, 0, -40, 150, p.club); g.font = "900 44px " + FONT; g.fillText(R.label, 0, 230); }
    else {
      if (ph) { var phh = 450, phw = phh * ph.width / ph.height; if (phw > 470) { phw = 470; phh = phw * ph.height / ph.width; } g.drawImage(ph, 90 - phw / 2 + pxo, 25 - phh, phw, phh); var fd = g.createLinearGradient(0, -50, 0, 30); fd.addColorStop(0, "rgba(0,0,0,0)"); fd.addColorStop(1, R.b); g.fillStyle = fd; g.fillRect(-w / 2, -50, w, 80); }
      else { g.save(); g.translate(pxo, 0); g.fillStyle = R.rank >= 2 ? "rgba(255,255,255,.16)" : "rgba(0,0,0,.2)"; g.beginPath(); g.arc(80, -215, 100, 0, Math.PI * 2); g.fill(); g.beginPath(); g.moveTo(-100, 10); g.quadraticCurveTo(80, -150, 260, 10); g.closePath(); g.fill(); g.fillRect(-100, 0, 360, 12); g.restore(); }
      g.fillStyle = R.ink; g.font = "900 150px " + FONT; g.fillText(String(p.rating), -200, -300); g.font = "800 " + (p.pos.length > 2 ? 48 : 56) + "px " + FONT; g.fillText(p.pos, -200, -200);
      g.fillRect(-250, -160, 100, 4); var fl = flag(inf.nat); if (fl) { g.font = "62px " + FONT; g.fillText(fl, -200, -110); badge(g, -200, -25, 40, p.club); } else badge(g, -200, -95, 46, p.club);
      g.font = "800 26px " + FONT; g.fillText(R.label, 0, 40);
      var sn = shortName(p.name); g.font = "900 64px " + FONT; var fs = 64; while (g.measureText(sn).width > 560 && fs > 34) { fs -= 4; g.font = "900 " + fs + "px " + FONT; } g.fillText(sn, 0, 100);
      g.fillRect(-230, 145, 460, 3);
      stats(p).forEach(function (s, i) { var col = i < 3 ? -130 : 120, yy = 200 + (i % 3) * 70, v = Math.round(s[1] * ease(sp == null ? 1 : sp)); g.font = "900 54px " + FONT; g.textAlign = "right"; g.fillText(String(v), col, yy); g.font = "700 44px " + FONT; g.textAlign = "left"; g.fillText(s[0], col + 16, yy); });
      g.fillRect(-2, 175, 4, 190);
    }
    if (R.rank >= 2 && !TEXMODE) holo(g, w, h, tt + pxo / 120, R);
    if (shine != null && !TEXMODE) { var sx = -w + shine * w * 2.2, sg = g.createLinearGradient(sx - 120, 0, sx + 120, 0); sg.addColorStop(0, "rgba(255,255,255,0)"); sg.addColorStop(.5, "rgba(255,255,255,.5)"); sg.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = sg; g.save(); g.rotate(-.35); g.fillRect(-w, -h, w * 2, h * 2); g.restore(); }
    g.restore();
    g.save(); cardPath(g, w, h); g.lineWidth = 8; g.strokeStyle = R.edge || "rgba(255,255,255,.7)"; g.stroke();
    if (R.rank >= 2 && g.createConicGradient) { var cg2 = g.createConicGradient(tt * 1.6, 0, 0); ["#ff5f6d", "#ffc371", "#f5d77a", "#7cf7d4", "#5ec8ff", "#c48bff", "#ff5f6d"].forEach(function (col, i, a) { cg2.addColorStop(i / (a.length - 1), col); }); g.lineWidth = 10; g.globalAlpha = .85; g.strokeStyle = cg2; g.stroke(); }
    g.restore();
    if (R.rank >= 2 && !TEXMODE) sparkles(g, w, h, tt);
  }
  var TEXMODE = false;
  var TEAR = { on: true, done: false, hold: false, p: 0, drag: false, fx: null, fy: null, lx: 0, out: null, onDone: null };

  // carte en 3D : dessinée hors écran puis affichée en bandes verticales avec perspective
  var oc = null, ocg = null, OW = 760, OH = 1040;
  function card3d(g, p, ang, shine, sp, t) {
    if (G3) { var cs3 = Math.cos(ang), sh3 = Math.abs(cs3); g.save(); g.shadowColor = "rgba(0,0,0,.45)"; g.shadowBlur = 40; g.fillStyle = "rgba(0,0,0,.25)"; g.beginPath(); g.ellipse(0, OH * .52, 300 * Math.max(.25, sh3), 34, 0, 0, Math.PI * 2); g.fill(); g.restore();
      g.save(); g.shadowColor = "rgba(" + RAR[p.rk].beam + ",.55)"; g.shadowBlur = 70; g.drawImage(G3.card(p, ang, sp, t, Math.sin(t * .7) * .06), -G3.W / 2, -G3.H / 2); g.restore(); return; }
    if (!oc) { oc = document.createElement("canvas"); oc.width = OW; oc.height = OH; ocg = oc.getContext("2d"); }
    var a = ang % (Math.PI * 2), face = Math.cos(a) >= 0, ra = face ? a : a - Math.PI, cs = Math.cos(ra), sn = Math.sin(ra);
    ocg.setTransform(1, 0, 0, 1, 0, 0); ocg.clearRect(0, 0, OW, OH); ocg.translate(OW / 2, OH / 2); card(ocg, p, face, shine, sp, t, -sn * 46); ocg.setTransform(1, 0, 0, 1, 0, 0);
    if (Math.abs(cs) < .03) return;
    var N = 32, D = 1500;
    g.save(); g.shadowColor = "rgba(0,0,0,.45)"; g.shadowBlur = 40; g.fillStyle = "rgba(0,0,0,.25)"; g.beginPath(); g.ellipse(0, OH * .52, 300 * Math.abs(cs), 34, 0, 0, Math.PI * 2); g.fill(); g.restore();
    for (var i = 0; i < N; i++) { var u0 = i / N, u1 = (i + 1) / N, X0 = (u0 - .5) * OW, X1 = (u1 - .5) * OW, z0 = X0 * sn, z1 = X1 * sn, f0 = D / (D + z0), f1 = D / (D + z1), sx0 = X0 * cs * f0, sx1 = X1 * cs * f1, fm = (f0 + f1) / 2;
      if (cs < 0) { var tmp = sx0; sx0 = sx1; sx1 = tmp; }
      var dw = Math.abs(sx1 - sx0) + .8, dh = OH * fm; g.drawImage(oc, u0 * OW, 0, OW / N, OH, Math.min(sx0, sx1), -dh / 2, dw, dh); }
  }
  function celebrate(g, t, tm, last) { // fête selon la note : pluie d'or (85+), feux d'artifice et stade qui s'allume (90+)
    var r = last.rating, d = t - tm.flip - .35; if (r < 85 || d < 0 || t > tm.sum + .6) return; var fade = 1 - clamp((t - tm.sum) / .6), cc = club(last.club);
    g.save(); g.globalAlpha = fade;
    if (r >= 90) { // projecteurs du stade qui s'allument un par un
      for (var k = 0; k < 6; k++) { var on = clamp((d - k * .09) / .12); if (on <= 0) continue; var lx = 90 + k * 180, lg = g.createRadialGradient(lx, 175, 4, lx, 175, 150); lg.addColorStop(0, "rgba(255,255,255," + on + ")"); lg.addColorStop(.25, "rgba(255,250,220," + (.5 * on) + ")"); lg.addColorStop(1, "rgba(255,250,220,0)"); g.fillStyle = lg; g.fillRect(lx - 150, 25, 300, 300);
        g.save(); g.globalCompositeOperation = "lighter"; var cg = g.createLinearGradient(lx, 175, lx, 1700); cg.addColorStop(0, "rgba(255,250,220," + (.16 * on) + ")"); cg.addColorStop(1, "rgba(255,250,220,0)"); g.fillStyle = cg; g.beginPath(); g.moveTo(lx - 12, 175); g.lineTo(lx + 12, 175); g.lineTo(lx + 240 - k * 40, 1700); g.lineTo(lx - 60 - k * 40, 1700); g.closePath(); g.fill(); g.restore(); }
      var pal = [cc.c1, "#f5d77a", "#ffffff", cc.c2 === "#ffffff" ? "#ff5f6d" : cc.c2];
      for (var f = 0; f < 8; f++) { var lt = .15 + f * .32, fd = d - lt; if (fd < 0) continue; var hx = ((f * 389) % 860) + 110, hy = 330 + ((f * 211) % 520), sx = hx + (f % 2 ? -60 : 60), rise = .45;
        g.save(); g.globalCompositeOperation = "lighter";
        if (fd < rise) { var q = fd / rise, yy = 1900 - (1900 - hy) * (1 - Math.pow(1 - q, 2)), xx = sx + (hx - sx) * q; g.strokeStyle = "rgba(255,230,160,.9)"; g.lineWidth = 6; g.beginPath(); g.moveTo(xx, yy); g.lineTo(xx - (hx - sx) * .05, yy + 90); g.stroke(); }
        else { var e = fd - rise; if (e < 1.6) { var col = pal[f % pal.length], al = 1 - e / 1.6; if (e < .12) { var fl = g.createRadialGradient(hx, hy, 0, hx, hy, 380); fl.addColorStop(0, "rgba(255,255,255," + (.35 * (1 - e / .12)) + ")"); fl.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = fl; g.fillRect(hx - 380, hy - 380, 760, 760); }
          g.fillStyle = col; g.strokeStyle = col; g.lineCap = "round"; g.globalAlpha = fade * al; for (var sp2 = 0; sp2 < 44; sp2++) { var an = sp2 / 44 * Math.PI * 2 + f, v = 420 + (sp2 % 3) * 110, e0 = Math.max(0, e - .09), px = hx + Math.cos(an) * v * e, py = hy + Math.sin(an) * v * e + 260 * e * e, qx = hx + Math.cos(an) * v * e0, qy = hy + Math.sin(an) * v * e0 + 260 * e0 * e0; g.lineWidth = 9 * (1 - e / 1.8); g.beginPath(); g.moveTo(qx, qy); g.lineTo(px, py); g.stroke(); g.beginPath(); g.arc(px, py, 10 * (1 - e / 2), 0, Math.PI * 2); g.fill(); if (sp2 % 4 === 0 && e > .3) { g.globalAlpha = fade * al * (Math.sin(t * 40 + sp2) > 0 ? 1 : .2); g.fillRect(px - 2, py - 2, 4, 4); g.globalAlpha = fade * al; } } } }
        g.restore(); }
    }
    // pluie d'or
    g.globalCompositeOperation = "lighter"; for (var i = 0; i < (r >= 90 ? 110 : 70); i++) { var sp3 = 220 + (i * 37) % 260, x = ((i * 151) % W) + Math.sin(t * 2 + i) * 18, y = -40 + (d * sp3 + (i * 97) % 500) - 150; if (y < -40 || y > H) continue; var tw = .5 + .5 * Math.sin(t * 10 + i * 1.7), sz = 4 + (i % 4) * 2.5;
      g.fillStyle = "rgba(255," + (200 + (i % 5) * 10) + ",90," + (.85 * tw) + ")"; g.beginPath(); g.moveTo(x, y - sz * 2); g.quadraticCurveTo(x, y, x + sz * 2, y); g.quadraticCurveTo(x, y, x, y + sz * 2); g.quadraticCurveTo(x, y, x - sz * 2, y); g.quadraticCurveTo(x, y, x, y - sz * 2); g.fill(); }
    g.restore();
  }
  function holo(g, w, h, t, R) { // reflet holographique qui bouge (cartes spéciales)
    g.save(); g.globalCompositeOperation = "overlay"; var off = (t * 220) % (w * 2), hg = g.createLinearGradient(-w + off - w, -h / 2, off, h / 2);
    ["rgba(255,95,109,.0)", "rgba(255,95,109,.35)", "rgba(255,195,113,.35)", "rgba(124,247,212,.35)", "rgba(94,200,255,.35)", "rgba(196,139,255,.35)", "rgba(196,139,255,0)"].forEach(function (c, i, a) { hg.addColorStop(i / (a.length - 1), c); });
    g.fillStyle = hg; g.fillRect(-w / 2, -h / 2, w, h); g.restore();
  }
  function sparkles(g, w, h, t) { g.save(); g.globalCompositeOperation = "lighter"; for (var i = 0; i < 9; i++) { var ph2 = (t * .9 + i * .37) % 1, a = Math.sin(ph2 * Math.PI), x = ((i * 173) % w) - w / 2, y = ((i * 311) % h) - h / 2, r = 6 + 16 * a; g.fillStyle = "rgba(255,255,240," + (.9 * a) + ")"; g.beginPath(); g.moveTo(x, y - r * 2); g.quadraticCurveTo(x, y, x + r * 2, y); g.quadraticCurveTo(x, y, x, y + r * 2); g.quadraticCurveTo(x, y, x - r * 2, y); g.quadraticCurveTo(x, y, x, y - r * 2); g.fill(); } g.restore(); }
  function bigText(g, txt, y, size, a, sc, col) { if (a <= 0) return; g.save(); g.globalAlpha = Math.min(1, a); g.translate(W / 2, y); g.scale(sc, sc); g.textAlign = "center"; g.textBaseline = "middle"; g.font = "900 " + size + "px " + FONT; var s = size; while (g.measureText(txt).width > 1000 && s > 24) { s -= 4; g.font = "900 " + s + "px " + FONT; } g.lineWidth = s * .09; g.strokeStyle = "rgba(0,0,0,.65)"; g.strokeText(txt, 0, 0); g.fillStyle = col || "#fff"; g.fillText(txt, 0, 0); g.restore(); }
  function pill(g, txt, x, y, bg, fg, size) { g.font = "900 " + (size || 34) + "px " + FONT; var w = g.measureText(txt).width + 40, h = (size || 34) * 1.6; g.fillStyle = bg; rr(g, x - w / 2, y - h / 2, w, h, h / 2); g.fill(); g.fillStyle = fg; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(txt, x, y + 2); }
  function beamFx(g, t, col, k) { if (k <= 0) return; g.save(); g.globalCompositeOperation = "lighter"; var bw = 120 + k * 260, bgd = g.createLinearGradient(W / 2 - bw, 0, W / 2 + bw, 0); bgd.addColorStop(0, "rgba(" + col + ",0)"); bgd.addColorStop(.5, "rgba(" + col + "," + (.7 * k) + ")"); bgd.addColorStop(1, "rgba(" + col + ",0)"); g.fillStyle = bgd; g.fillRect(W / 2 - bw, 0, bw * 2, H);
    for (var r = 0; r < 14; r++) { var ang = r / 14 * Math.PI * 2 + t * .4; g.fillStyle = "rgba(" + col + "," + (.07 * k) + ")"; g.beginPath(); g.moveTo(W / 2, 960); g.arc(W / 2, 960, 1500, ang, ang + .09); g.closePath(); g.fill(); } g.restore(); }
  function particles(g, t, t0, col, n) { if (t < t0 || t > t0 + 2.4) return; var d = t - t0; g.save(); g.globalCompositeOperation = "lighter"; for (var i = 0; i < n; i++) { var a = i * 2.399, sp = 300 + (i * 53) % 700, x = W / 2 + Math.cos(a) * sp * d, y = 960 + Math.sin(a) * sp * d + 400 * d * d, al = Math.max(0, 1 - d / 2.2); g.fillStyle = "rgba(" + col + "," + al + ")"; g.beginPath(); g.arc(x, y, 6 + (i % 4) * 3, 0, Math.PI * 2); g.fill(); } g.restore(); }

  /* ---------- moteur 3D (WebGL) : vraie lumière, reliefs, métal, hologramme, aluminium froissé ---------- */
  var G3 = (function () {
    var CW = 1000, CH = 1400, D = 1500, c = document.createElement("canvas"); c.width = CW; c.height = CH;
    var gl = null; try { gl = c.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: true, preserveDrawingBuffer: true }); } catch (e) {}
    if (!gl || /[?&]no3d/.test(location.search)) return null;
    var VS = "attribute vec3 aP;attribute vec2 aU;attribute vec3 aN;uniform mat3 uR;uniform vec3 uT;uniform vec2 uHalf;uniform float uD;varying vec2 vU;varying vec3 vW;varying vec3 vN;" +
      "void main(){vec3 w=uR*aP+uT;vW=w;vU=aU;vN=uR*aN;float q=uD-w.z;gl_Position=vec4(w.x*uD/uHalf.x,-w.y*uD/uHalf.y,-w.z/3000.0*q,q);}";
    var FS = "precision highp float;uniform sampler2D uTex;uniform vec2 uTx;uniform float uMat;uniform float uMode;uniform float uTime;uniform vec3 uL;uniform float uD;uniform vec3 uEdge;uniform mat3 uR;uniform float uFlipU;uniform float uBump;uniform float uK;" +
      "varying vec2 vU;varying vec3 vW;varying vec3 vN;" +
      "float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}" +
      "float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hs(i),hs(i+vec2(1.,0.)),f.x),mix(hs(i+vec2(0.,1.)),hs(i+vec2(1.,1.)),f.x),f.y);}" +
      "float fb(vec2 p){return vn(p)*.5+vn(p*2.03+3.1)*.25+vn(p*4.1+7.7)*.125;}" +
      "float lm(vec2 u){vec4 c=texture2D(uTex,u);return dot(c.rgb,vec3(.299,.587,.114))*c.a;}" +
      "vec3 hue(float h){return clamp(abs(mod(h*6.+vec3(0.,4.,2.),6.)-3.)-1.,0.,1.);}" +
      "void main(){vec2 uv=vec2(uFlipU>.5?1.-vU.x:vU.x,vU.y);vec4 tc=texture2D(uTex,uv);if(tc.a<.03)discard;" +
      "vec3 V=normalize(vec3(0.,0.,uD)-vW);vec3 L=normalize(uL-vW);" +
      "if(uMode>.5){vec3 n0=normalize(vN);float k=.55+.45*abs(dot(n0,L));vec3 e=uEdge*(k*.9+.25*smoothstep(.3,1.,fb(vec2(vU.y*40.,uK))));gl_FragColor=vec4(e*(uMode>1.5?.45:1.),tc.a);return;}" +
      "vec3 base=tc.rgb;float h0=lm(uv);float hx=lm(uv+vec2(uTx.x,0.))-lm(uv-vec2(uTx.x,0.));float hy=lm(uv+vec2(0.,uTx.y))-lm(uv-vec2(0.,uTx.y));" +
      "vec3 nl=vec3(-hx*uBump,-hy*uBump,1.);" +
      "if(uMat<.5){nl.xy+=(vec2(vn(uv*vec2(520.,700.)),vn(uv*vec2(520.,700.)+9.))-.5)*.18;}" +
      "else if(uMat<1.5){nl.x+=(vn(vec2(uv.x*5.,uv.y*1100.))-.5)*.35;nl.y+=(vn(vec2(uv.x*900.,uv.y*3.))-.5)*.06;}" +
      "else if(uMat>4.5){vec2 p=uv*vec2(3.2,4.6);float f0=fb(p);float fx=fb(p+vec2(.06,0.))-f0;float fy=fb(p+vec2(0.,.06))-f0;float r=abs(sin((uv.x*2.2+uv.y*1.3+fb(uv*2.)*1.4)*6.));" +
      "nl.xy+=vec2(fx,fy)*2.6+vec2(.22,.12)*(1.-smoothstep(0.,.07,r))*sign(sin(uv.y*9.+uv.x*4.));nl.xy+=(vec2(vn(uv*380.),vn(uv*380.+5.))-.5)*.03;}" +
      "vec3 n=normalize(uR*normalize(nl));if(dot(n,V)<0.)n=-n;vec3 H=normalize(L+V);float dif=max(dot(n,L),0.);float nh=max(dot(n,H),0.);" +
      "float fr=pow(1.-max(dot(n,V),0.),3.);vec3 R=reflect(-V,n);" +
      "float env=smoothstep(.62,.98,sin(R.x*3.2+uTime*.45)*.5+.5)*.9+smoothstep(.28,0.,abs(R.y+.25))*.55+.12;" +
      "vec3 col;" +
      "if(uMat<.5){col=base*(.8+.28*dif)+vec3(1.)*pow(nh,36.)*.18+env*.035;}" +
      "else if(uMat<1.5){col=base*(.5+.32*dif)+base*env*.62+vec3(1.,.93,.75)*pow(nh,70.)*.9+vec3(1.,.9,.6)*fr*.2;}" +
      "else if(uMat<2.5){vec3 ir=hue(fract(dot(R.xy,vec2(.9,.55))*1.3+uv.x*.8+uv.y*1.1+uTime*.05));float m=(.22+.3*smoothstep(.3,1.,env))*(1.-h0*.45);col=base*(.68+.3*dif)+ir*m*.75+base*env*.18+vec3(1.)*pow(nh,60.)*.55;}" +
      "else if(uMat<3.5){vec3 ir=hue(fract(dot(R.xy,vec2(.7,.4))+uv.y*.6+uTime*.03));col=base*(.72+.26*dif)+mix(vec3(1.,.95,.85),ir,.35)*env*.22+vec3(1.,.92,.7)*pow(nh,80.)*.9;}" +
      "else{float e2=smoothstep(.2,1.,sin(R.x*2.2+R.y*1.3+uTime*.5)*.5+.5);col=base*(.5+.25*dif)+base*e2*.55+vec3(1.)*pow(nh,45.)*.7+vec3(1.)*fr*.12;}" +
      "if(uMat>1.5&&uMat<4.5){float gq=hs(floor(uv*vec2(230.,320.)));float tw=step(.982,gq)*pow(nh,6.)*(.5+.5*sin(uTime*7.+gq*60.));col+=vec3(1.,.98,.9)*tw*(uMat>2.5?2.2:1.6);}" +
      "col+=fr*.1;gl_FragColor=vec4(col,tc.a);}";
    function sh(t, src) { var s = gl.createShader(t); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; }
    var pr; try { pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr); if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) throw new Error("link"); } catch (e) { console.warn("3D désactivée", e); return null; }
    gl.useProgram(pr);
    var A = { p: gl.getAttribLocation(pr, "aP"), u: gl.getAttribLocation(pr, "aU"), n: gl.getAttribLocation(pr, "aN") }, U = {};
    ["uR", "uT", "uHalf", "uD", "uTex", "uTx", "uMat", "uMode", "uTime", "uL", "uEdge", "uFlipU", "uBump", "uK"].forEach(function (k) { U[k] = gl.getUniformLocation(pr, k); });
    gl.uniform2f(U.uHalf, CW / 2, CH / 2); gl.uniform1f(U.uD, D); gl.uniform1i(U.uTex, 0);
    gl.enable(gl.DEPTH_TEST); gl.disable(gl.CULL_FACE); try { gl.enable(gl.SAMPLE_ALPHA_TO_COVERAGE); } catch (e) {}
    function mesh(nx, ny, w, h, zf) { // grille (bombée pour le pack)
      var P = [], UV = [], N = [], I = [];
      for (var j = 0; j <= ny; j++) for (var i = 0; i <= nx; i++) { var u = i / nx, v = j / ny, x = (u - .5) * w, y = (v - .5) * h, z = zf ? zf(u, v) : 0, e = .01, dx = zf ? (zf(Math.min(1, u + e), v) - zf(Math.max(0, u - e), v)) / (2 * e * w) : 0, dy = zf ? (zf(u, Math.min(1, v + e)) - zf(u, Math.max(0, v - e))) / (2 * e * h) : 0;
        P.push(x, y, z); UV.push(u, v); var l = Math.hypot(dx, dy, 1); N.push(-dx / l, -dy / l, 1 / l); }
      for (j = 0; j < ny; j++) for (i = 0; i < nx; i++) { var a = j * (nx + 1) + i; I.push(a, a + 1, a + nx + 1, a + 1, a + nx + 2, a + nx + 1); }
      function buf(arr, T) { var b = gl.createBuffer(); gl.bindBuffer(T || gl.ARRAY_BUFFER, b); gl.bufferData(T || gl.ARRAY_BUFFER, T ? new Uint16Array(arr) : new Float32Array(arr), gl.STATIC_DRAW); return b; }
      return { p: buf(P), u: buf(UV), n: buf(N), i: buf(I, gl.ELEMENT_ARRAY_BUFFER), c: I.length };
    }
    function use(m) { gl.bindBuffer(gl.ARRAY_BUFFER, m.p); gl.enableVertexAttribArray(A.p); gl.vertexAttribPointer(A.p, 3, gl.FLOAT, false, 0, 0); gl.bindBuffer(gl.ARRAY_BUFFER, m.u); gl.enableVertexAttribArray(A.u); gl.vertexAttribPointer(A.u, 2, gl.FLOAT, false, 0, 0);
      if (A.n >= 0) { gl.bindBuffer(gl.ARRAY_BUFFER, m.n); gl.enableVertexAttribArray(A.n); gl.vertexAttribPointer(A.n, 3, gl.FLOAT, false, 0, 0); } gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, m.i); }
    var QW = 760, QH = 1040, quad = mesh(1, 1, QW, QH);
    function puff(u, v) { var b = Math.pow(Math.sin(Math.PI * u), .55), c2 = .085, k = Math.min(1, Math.max(0, (Math.min(v, 1 - v) - c2) / .16)); k = k * k * (3 - 2 * k); return 34 * b * k; }
    var PW = 600, PH = 840, pfront = mesh(40, 56, PW, PH, function (u, v) { var x = (u * PW - (PW - 540) / 2) / 540, y = (v * PH - (PH - 780) / 2) / 780; return x < 0 || x > 1 || y < 0 || y > 1 ? 0 : puff(x, y); }),
      pback = mesh(20, 28, PW, PH, function (u, v) { var x = (u * PW - (PW - 540) / 2) / 540, y = (v * PH - (PH - 780) / 2) / 780; return (x < 0 || x > 1 || y < 0 || y > 1 ? 0 : -puff(x, y) * .55) - 3; });
    function tex() { var t = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, t); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); return t; }
    var tFront = tex(), tBack = tex(), tPack = tex(), backKey = "";
    function upload(t, src) { gl.bindTexture(gl.TEXTURE_2D, t); gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, src); }
    function rot(ry, rx, rz) { var cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx), cz = Math.cos(rz || 0), sz = Math.sin(rz || 0);
      var Y = [cy, 0, sy, 0, 1, 0, -sy, 0, cy], X = [1, 0, 0, 0, cx, -sx, 0, sx, cx], Z = [cz, -sz, 0, sz, cz, 0, 0, 0, 1];
      function mul(a, b) { var r = []; for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) r[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j]; return r; }
      var m = mul(mul(Z, X), Y); return [m[0], m[3], m[6], m[1], m[4], m[7], m[2], m[5], m[8]]; } // colonne par colonne pour WebGL
    function frame() { gl.viewport(0, 0, CW, CH); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); }
    function common(R, t, lx, ly) { gl.uniformMatrix3fv(U.uR, false, R); gl.uniform1f(U.uTime, t); gl.uniform3f(U.uL, lx, ly, 1100); }
    var octx = null, ocv = null, pcv = null, pctx = null;
    var MAT = { commune: 0, or: 1, icone: 3 };
    return {
      card: function (p, ang, sp, t, tilt) { // carte épaisse : face avant, tranche, dos
        if (!ocv) { ocv = document.createElement("canvas"); ocv.width = QW; ocv.height = QH; octx = ocv.getContext("2d"); }
        var a = ang % (Math.PI * 2), sn = Math.sin(a);
        TEXMODE = true;
        octx.setTransform(1, 0, 0, 1, 0, 0); octx.clearRect(0, 0, QW, QH); octx.translate(QW / 2, QH / 2); card(octx, p, true, null, sp, t, -sn * 46); upload(tFront, ocv);
        var bk = p.name + "|" + p.rk; if (bk !== backKey) { backKey = bk; octx.setTransform(1, 0, 0, 1, 0, 0); octx.clearRect(0, 0, QW, QH); octx.translate(QW / 2, QH / 2); card(octx, p, false, null, 1, 0, 0); upload(tBack, ocv); }
        TEXMODE = false;
        frame(); use(quad); var R = rot(a, tilt || 0), T = 12, rk = RAR[p.rk], mat = MAT[p.rk] != null ? MAT[p.rk] : 2;
        common(R, t, Math.sin(t * .8) * 520, -520 + Math.cos(t * .6) * 160); gl.uniform2f(U.uTx, 1.6 / QW, 1.6 / QH); gl.uniform1f(U.uBump, 3.2); gl.uniform1f(U.uMat, mat);
        var e = (rk.edge || (rk.rank ? "#f5d77a" : "#d7dde5")).replace("#", ""), en = parseInt(e, 16); gl.uniform3f(U.uEdge, (en >> 16) / 255, ((en >> 8) & 255) / 255, (en & 255) / 255);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tFront); for (var k = 1; k < 9; k++) { var z = T / 2 - k * T / 9, r0 = [R[0] * 0 + R[6] * z, R[1] * 0 + R[7] * z, R[2] * 0 + R[8] * z]; gl.uniform3f(U.uT, r0[0], r0[1], r0[2]); gl.uniform1f(U.uMode, 1); gl.uniform1f(U.uK, k); gl.uniform1f(U.uFlipU, 0); gl.drawElements(gl.TRIANGLES, quad.c, gl.UNSIGNED_SHORT, 0); }
        gl.uniform1f(U.uMode, 0); gl.uniform3f(U.uT, R[6] * T / 2, R[7] * T / 2, R[8] * T / 2); gl.uniform1f(U.uFlipU, 0); gl.drawElements(gl.TRIANGLES, quad.c, gl.UNSIGNED_SHORT, 0);
        gl.bindTexture(gl.TEXTURE_2D, tBack); gl.uniform3f(U.uT, -R[6] * T / 2, -R[7] * T / 2, -R[8] * T / 2); gl.uniform1f(U.uFlipU, 1); gl.drawElements(gl.TRIANGLES, quad.c, gl.UNSIGNED_SHORT, 0);
        return c;
      },
      pack: function (t, F, name, sub, logo, ry, rx, rz) { // pack en aluminium bombé et froissé
        if (!pcv) { pcv = document.createElement("canvas"); pcv.width = PW; pcv.height = PH; pctx = pcv.getContext("2d"); }
        pctx.setTransform(1, 0, 0, 1, 0, 0); pctx.clearRect(0, 0, PW, PH); pctx.translate(PW / 2, PH / 2); drawPack(pctx, t, F, name, sub, logo, true); upload(tPack, pcv);
        frame(); var R = rot(ry || 0, rx || 0, rz || 0); common(R, t, -300 + Math.sin(t * .9) * 650, -650); gl.uniform2f(U.uTx, 1.4 / PW, 1.4 / PH); gl.uniform1f(U.uBump, 2.2); gl.uniform1f(U.uMat, 5); gl.uniform3f(U.uT, 0, 0, 0); gl.uniform1f(U.uFlipU, 0);
        var e = parseInt(F[2].replace("#", ""), 16); gl.uniform3f(U.uEdge, (e >> 16) / 255, ((e >> 8) & 255) / 255, (e & 255) / 255);
        gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tPack);
        use(pback); gl.uniform1f(U.uMode, 2); gl.drawElements(gl.TRIANGLES, pback.c, gl.UNSIGNED_SHORT, 0);
        use(pfront); gl.uniform1f(U.uMode, 0); gl.drawElements(gl.TRIANGLES, pfront.c, gl.UNSIGNED_SHORT, 0);
        return c;
      },
      W: CW, H: CH
    };
  })();
  var packCache = { k: null };
  function pack3d(g, t, F, name, sub, logo, ry, rx) { // dessine le pack (3D si possible), une seule fois par image
    if (!G3) { drawPack(g, t, F, name, sub, logo); return; }
    var k = t + "|" + F.join() + name + ry + rx;
    if (packCache.k !== k) { packCache.k = k; packCache.c = G3.pack(t, F, name, sub, logo, ry, rx, 0); if (!packCache.img) { packCache.img = document.createElement("canvas"); packCache.img.width = G3.W; packCache.img.height = G3.H; } var pg = packCache.img.getContext("2d"); pg.clearRect(0, 0, G3.W, G3.H); pg.drawImage(packCache.c, 0, 0); }
    g.drawImage(packCache.img, -G3.W / 2, -G3.H / 2);
  }
  /* timeline de la vidéo (calculée depuis le dernier pack ouvert) */
  var STEP = 1.35;
  function isWalk(L) { return L && RAR[L.cards[L.cards.length - 1].rk].rank >= 2; }
  function TL(L) { var intro = L && (L.who || L.com) ? 3.4 : .4, n = (L ? L.cards.length : 5) - 1, tw = intro + 3.4 + n * STEP + .2, o;
    if (isWalk(L)) o = { walk: true, tun: tw + 1, flag: tw + 2.5, club: tw + 3.5, pos: tw + 4.4, sil: tw + 5.3, flip: tw + 7.1 };
    else o = { walk: false, club: tw + 1, pos: tw + 1.9, note: tw + 2.8, flip: tw + 3.8 };
    o.intro = intro; o.n = n; o.tw = tw; o.sum = o.flip + 4.8; o.end = o.sum + 6; return o; }
  function slot(i, n) { var row = Math.floor(i / 4), inRow = Math.min(4, n - row * 4); return [W / 2 + ((i % 4) - (inRow - 1) / 2) * 240, 330 + row * 300]; }
  function packName(L) { var P = packOf(L.pack); return P.id === "club" ? "PACK " + (L.club || "").toUpperCase() : P.label.toUpperCase(); }
  function drawScene0(g, t) {
    var L = S && S.last; if (!L) { idle(g, t); return; }
    var tm = TL(L), last = L.cards[L.cards.length - 1], bestR = RAR[last.rk], pc = L.pack === "club" ? L.club : "L1", c0 = pc === "L1" ? L1 : club(pc), T = t - tm.intro;
    var gr = g.createRadialGradient(W / 2, 800, 50, W / 2, 900, 1300); gr.addColorStop(0, c0.dark); gr.addColorStop(1, "#000"); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    for (var i = 0; i < 2; i++) { var lx = i ? W + 100 : -100, a = Math.sin(t * .6 + i) * .15; g.save(); g.translate(lx, -50); g.rotate((i ? .55 : -.55) + a); var lg = g.createLinearGradient(0, 0, 0, 1800); lg.addColorStop(0, "rgba(255,255,255,.16)"); lg.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = lg; g.beginPath(); g.moveTo(-40, 0); g.lineTo(40, 0); g.lineTo(260, 1800); g.lineTo(-260, 1800); g.closePath(); g.fill(); g.restore(); }
    var bk = T < 2.9 ? 0 : T < 3.3 ? (T - 2.9) / .4 : T < 3.6 ? 1 - (T - 3.3) / .3 * .6 : 0, bcol = bestR.beam;
    for (var j = 0; j < tm.n; j++) { var ts = tm.intro + 3.4 + j * STEP; if (t >= ts && t < ts + STEP) { bk = Math.max(bk, .25 + .35 * RAR[L.cards[j].rk].rank * (1 - (t - ts) / STEP)); bcol = RAR[L.cards[j].rk].beam; } }
    if (t >= tm.tw + .9 && t < tm.sum) { bk = t < tm.flip + 1 ? 1 : Math.max(.3, 1 - (t - tm.flip - 1) / 1.5); bcol = bestR.beam; }
    beamFx(g, t, bcol, bk);
    g.fillStyle = "rgba(0,0,0,.55)"; for (var k = 0; k < 40; k++) { var x = (k * 97) % W, hh = 60 + (k * 37) % 70, by = Math.sin(t * 6 + k) * (t > tm.flip ? 10 : 2); g.beginPath(); g.arc(x, H - 80 - hh + by, 34, 0, Math.PI * 2); g.fill(); g.fillRect(x - 40, H - 80 - hh + by, 80, 200); }
    if (tm.walk && t >= tm.tun - .4 && t < tm.flip + .6) tunnel(g, t, tm, last, bestR);
    // 0. le commentaire choisi
    if (t < tm.intro + .4 && (L.who || L.com)) {
      var ia = Math.min(1, t / .25) * (t > tm.intro ? 1 - (t - tm.intro) / .4 : 1), isc = .8 + .2 * back(t / .4);
      g.save(); g.globalAlpha = Math.max(0, ia); g.translate(W / 2, 760); g.scale(isc, isc);
      g.font = "800 52px " + FONT; var lines = wrap(g, L.com || "…", 760).slice(0, 4), bh = 150 + lines.length * 66;
      g.shadowColor = "rgba(0,0,0,.4)"; g.shadowBlur = 30; g.fillStyle = "#fff"; rr(g, -440, -bh / 2, 880, bh, 36); g.fill(); g.shadowBlur = 0;
      g.beginPath(); g.moveTo(-340, bh / 2 - 2); g.lineTo(-300, bh / 2 + 40); g.lineTo(-270, bh / 2 - 2); g.fill();
      var who = (L.who || "abonné").replace(/^@?/, "@"); g.fillStyle = "#fe2c55"; g.beginPath(); g.arc(-370, -bh / 2 + 62, 34, 0, Math.PI * 2); g.fill(); g.fillStyle = "#fff"; g.font = "900 34px " + FONT; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(who.charAt(1).toUpperCase() || "?", -370, -bh / 2 + 63);
      g.textAlign = "left"; g.fillStyle = "#8a8f99"; g.font = "700 32px " + FONT; g.fillText("Réponse à " + who, -320, -bh / 2 + 62);
      g.fillStyle = "#111"; g.font = "800 52px " + FONT; lines.forEach(function (l2, i2) { g.fillText(l2, -380, -bh / 2 + 140 + i2 * 66); });
      g.restore();
      bigText(g, "Épisode " + L.epi + " · " + packName(L), 1180, 54, Math.max(0, ia) * clamp((t - .5) / .3), 1, "#f5d77a");
      bigText(g, L.free ? "🎁 Pack offert" : "Prix : " + fmt(L.price) + " 🪙", 1270, 44, Math.max(0, ia) * clamp((t - .8) / .3), 1);
    }
    // 1. le pack
    if (T > -.4 && T < 3.3) {
      var drop = back((T + .1) / .7), shake = T > 1.2 ? Math.sin(t * 60) * (T - 1.2) * 14 : 0, glow = clamp((T - 1.2) / 1.7);
      var F = foilOf(L.pack, L.club), pn = packName(L), sub = L.cards.length + " CARTES", lg2 = function (gg) { badge(gg || g, 0, -90, 135, pc); }, tear = clamp((T - 2.45) / .45), tf = 1 - clamp((T - 2) / .45), ry3 = (Math.sin(t * .9) * .32 + (1 - clamp(drop)) * 2.4) * tf, rx3 = Math.sin(t * .7) * .1 * tf, hold = TEAR.hold && T >= 2.4;
      g.save(); g.translate(W / 2 + shake, -600 + 1560 * drop); g.rotate(shake * .002);
      g.save(); g.shadowColor = "rgba(" + bestR.beam + "," + (.3 + .7 * glow) + ")"; g.shadowBlur = 40 + 120 * glow; g.fillStyle = F[1]; g.scale(.86, .9); packPath(g, 540, 780); g.fill(); g.restore();
      if (hold) { // déchirure au doigt : la bande du haut se décolle là où passe le doigt
        var tp = clamp(TEAR.p), xa = -270 + 540 * tp, live = nowS();
        g.save(); g.beginPath(); g.rect(-300, -322, 600, 800); g.clip(); pack3d(g, t, F, pn, sub, lg2, 0, 0); g.restore();
        g.save(); g.beginPath(); g.rect(xa, -430, 330 - xa, 108); g.clip(); pack3d(g, t, F, pn, sub, lg2, 0, 0); g.restore();
        if (tp > 0) { g.save(); g.translate(xa, -322); g.rotate((.12 + .55 * tp) + Math.sin(live * 9) * .01); g.translate(-xa, 322); g.beginPath(); g.rect(-300, -430, xa + 300, 108); g.clip(); g.shadowColor = "rgba(0,0,0,.5)"; g.shadowBlur = 20; pack3d(g, t, F, pn, sub, lg2, 0, 0); g.restore();
          g.save(); g.strokeStyle = "rgba(255,255,255,.95)"; g.lineWidth = 5; g.shadowColor = "rgba(255,255,255,.9)"; g.shadowBlur = 14; g.beginPath(); g.moveTo(-270, -324); for (var zx = -270; zx < xa; zx += 14) g.lineTo(zx + 7, -324 + ((zx / 14) % 2 ? 4 : -4)); g.stroke(); g.restore();
          g.save(); g.globalCompositeOperation = "lighter"; var sg3 = g.createRadialGradient(xa, -322, 2, xa, -322, 90); sg3.addColorStop(0, "rgba(" + bestR.beam + ",.9)"); sg3.addColorStop(1, "rgba(" + bestR.beam + ",0)"); g.fillStyle = sg3; g.fillRect(xa - 90, -412, 180, 180); g.restore(); }
        else { g.save(); g.setLineDash([16, 12]); g.lineDashOffset = -live * 40; g.strokeStyle = "rgba(255,255,255,.75)"; g.lineWidth = 4; g.beginPath(); g.moveTo(-270, -324); g.lineTo(270, -324); g.stroke(); g.restore(); }
      }
      else if (tear <= 0) pack3d(g, t, F, pn, sub, lg2, ry3, rx3);
      else { g.save(); g.beginPath(); g.rect(-300, -322, 600, 800); g.clip(); pack3d(g, t, F, pn, sub, lg2, ry3, rx3); g.restore(); // le haut se déchire et s'envole
        g.fillStyle = "rgba(255,255,255," + (.9 * tear) + ")"; g.fillRect(-270, -326, 540, 8);
        g.save(); g.translate(260 * tear * tear, -420 * tear * tear); g.rotate(.5 * tear); g.globalAlpha = 1 - tear * .6; g.beginPath(); g.rect(-300, -420, 600, 98); g.clip(); pack3d(g, t, F, pn, sub, lg2, ry3, rx3); g.restore(); }
      g.restore();
      if (T > 1.3 && T < 2.9 && !TEAR.on) bigText(g, "👆 Appuie pour ouvrir", 1640, 54, .6 + .4 * Math.sin(t * 6), 1);
      if (TEAR.on && T > 1.3 && T < 2.45 + (hold ? 1 : 0) && !(hold && TEAR.p > .05)) { var lv2 = nowS(), hx = W / 2 - 230 + ((lv2 * .8) % 1) * 460; bigText(g, "👉 Glisse ton doigt pour déchirer", 1640, 54, .7 + .3 * Math.sin(lv2 * 6), 1); if (hold) { g.save(); g.globalAlpha = .9; g.font = "110px " + FONT; g.textAlign = "center"; g.fillText("👆", hx + 20, 760); g.restore(); } }
    }
    if (T >= 2.9 && T < 3.6) { g.fillStyle = "rgba(255,255,255," + (1 - (T - 2.9) / .7) + ")"; g.fillRect(0, 0, W, H); }
    particles(g, T, 2.95, bestR.beam, 80);
    // 2. les cartes une par une
    var sumK = clamp((t - tm.sum) / .5);
    if (sumK > 0) { g.save(); g.globalAlpha = sumK * .6; g.fillStyle = "#000"; g.fillRect(0, 160, W, H); g.restore(); }
    var hideK = tm.walk ? clamp((t - tm.tun + .3) / .4) * (1 - clamp((t - tm.flip - .3) / .5)) : 0;
    for (var q = 0; q < tm.n; q++) {
      var ts2 = tm.intro + 3.4 + q * STEP, cd = L.cards[q]; if (t < ts2 || hideK >= 1) continue;
      g.save(); g.globalAlpha = 1 - hideK;
      var d = t - ts2, sl = slot(q, tm.n), mv = ease((d - .95) / .35), s0 = .7 * back(d / .3), sc = s0 + (.3 - s0) * mv, cx = W / 2 + (sl[0] - W / 2) * mv, cy = 980 + (sl[1] - 980) * mv;
      if (sumK > 0) { var ss = slotSum(q, L.cards.length); cx += (ss[0] - cx) * ease(sumK); cy += (ss[1] - cy) * ease(sumK); sc += (.27 - sc) * ease(sumK); }
      g.save(); g.translate(cx, cy); g.rotate((1 - Math.min(1, d / .3)) * .3); g.scale(sc, sc); card(g, cd, true, null, Math.min(1, d / .6), t); g.restore();
      if (d > .3) tag(g, cd, cx, cy + 920 * sc / 2 + 20, Math.min(1, (d - .3) / .2), sc > .5 ? 1 : .75);
      if (d < 1) bigText(g, RAR[cd.rk].label, 1520, 66, Math.min(1, d / .15) * (d > .85 ? 1 - (d - .85) / .15 : 1), 1, RAR[cd.rk].rank ? "#f5d77a" : "#fff");
      g.restore();
    }
    // 3. la dernière carte : suspense
    if (t >= tm.tw && t < (tm.walk ? tm.tun : tm.club)) bigText(g, "Et la dernière carte… 👀", 1000, 76, Math.min(1, (t - tm.tw) / .2), .9 + .1 * Math.sin(t * 8));
    var lastInf = info(last), steps = tm.walk ? [[tm.flag, "flag"], [tm.club, "club"], [tm.pos, "pos"]] : [[tm.club, "club"], [tm.pos, "pos"], [tm.note, "note"]];
    if (tm.walk && !flag(lastInf.nat)) steps.shift();
    if (!tm.walk) steps.forEach(function (s2, i, arr) { var d2 = t - s2[0], nx = arr[i + 1] ? arr[i + 1][0] : (tm.walk ? tm.sil : tm.flip - .1); if (d2 < 0 || t > nx + .15) return; var a2 = Math.min(1, d2 / .15) * (t > nx ? 1 - (t - nx) / .15 : 1), sc2 = .4 + .6 * back(d2 / .35);
      if (s2[1] === "flag") { g.save(); g.globalAlpha = a2; g.translate(W / 2, 900); g.scale(sc2, sc2); g.font = "300px " + FONT; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(flag(lastInf.nat), 0, 0); g.restore(); bigText(g, String(lastInf.nat).toUpperCase(), 1180, 80, a2, 1); }
      else if (s2[1] === "club") { g.save(); g.globalAlpha = a2; g.translate(W / 2, 980); g.scale(sc2, sc2); badge(g, 0, 0, 220, last.club); g.restore(); bigText(g, String(last.club).toUpperCase(), 1300, 90, a2, 1); }
      else if (s2[1] === "pos") bigText(g, last.pos, 1000, 280, a2, sc2);
      else { g.save(); g.globalAlpha = a2; g.strokeStyle = "rgba(" + bestR.beam + ",.95)"; g.lineWidth = 14; g.beginPath(); g.arc(W / 2, 1000, 240 * sc2, 0, Math.PI * 2); g.stroke(); g.restore(); bigText(g, String(last.rating), 1000, 300, a2, sc2, bestR.rank >= 2 ? "#f5d77a" : "#fff"); }
    });
    celebrate(g, t, tm, last);
    if (t >= tm.flip - .5) {
      var ca = ease((t - tm.flip + .5) / .5), flip = clamp((t - tm.flip) / .55), sx2 = Math.cos(flip * Math.PI), idl = t > tm.flip + .6 ? Math.sin((t - tm.flip) * 1.6) * 10 : 0;
      var big2 = tm.n > 4, bx = W / 2, byy = (big2 ? 1150 : 1060) + (1 - ca) * 300 + idl, bsc = big2 ? (.6 + .17 * ca) : (.66 + .2 * ca);
      if (sumK > 0) { var sb = slotSum(L.cards.length - 1, L.cards.length); bx += (sb[0] - bx) * ease(sumK); byy += (sb[1] - byy) * ease(sumK); bsc += (.27 - bsc) * ease(sumK); }
      var ang = Math.PI * (1 - ease(flip)) + (t > tm.flip + .55 ? Math.sin((t - tm.flip - .55) * 1.1) * .32 * (1 - sumK) * clamp((t - tm.flip - .55) / .6) : 0);
      g.save(); g.globalAlpha = ca; g.translate(bx, byy); g.scale(bsc, bsc); card3d(g, last, ang, t > tm.flip + .6 && sumK < 1 ? ((t - tm.flip - .6) * .5) % 1.4 : null, clamp((t - tm.flip - .5) / 1.2), t); g.restore();
      if (t > tm.flip + .6) tag(g, t < tm.flip + 2.5 ? { dup: last.dup, sold: last.sold } : last, bx, byy + 920 * bsc / 2 + 24, clamp((t - tm.flip - .6) / .3), sumK > 0 ? .75 : 1.2);
      if (last.value != null && t > tm.flip + 1.3 && t < tm.sum && !btnVis(t)) { var va = clamp((t - tm.flip - 1.3) / .3) * (1 - sumK); g.save(); g.globalAlpha = va; pill(g, "💰 Valeur : " + fmt(last.value) + " 🪙", W / 2, big2 ? 1725 : 1680, "rgba(0,0,0,.7)", "#f5d77a", 40); g.restore(); }
      if (t > tm.flip + 2.5 && t < tm.sum + .3) { var da = clamp((t - tm.flip - 2.5) / .25) * (1 - sumK);
        if (last.sale || last.keep) { var st = .6 + .4 * back((t - tm.flip - 2.5) / .35), col = last.sale ? "#fb923c" : "#22c55e", tx = last.sale ? "💸 VENDUE !" : "🔒 JE LA GARDE"; g.save(); g.globalAlpha = da; g.translate(W / 2, byy); g.rotate(-.18); g.scale(st * 1.6 - .6, st * 1.6 - .6); g.font = "900 96px " + FONT; var tw2 = g.measureText(tx).width + 80; g.lineWidth = 14; g.strokeStyle = col; g.fillStyle = "rgba(0,0,0,.55)"; rr(g, -tw2 / 2, -80, tw2, 160, 26); g.fill(); g.stroke(); g.fillStyle = col; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText(tx, 0, 6); g.restore(); }
        else if (!pending()) bigText(g, "Je la garde ou je la vends ? 👇", big2 ? 1815 : 1790, 60, da, .95 + .05 * Math.sin(t * 6), "#fff"); }
      choiceButtons(g, t, tm, last);
      if (t > tm.flip + .5 && t < tm.sum && !btnVis(t)) bigText(g, "🔥 " + RAR[last.rk].label + " 🔥", big2 ? 1630 : 1590, 72, clamp((t - tm.flip - .5) / .3) * (1 - sumK), .6 + .4 * back((t - tm.flip - .5) / .4), "#f5d77a");
    }
    particles(g, t, tm.flip + .05, bestR.beam, 70);
    if (t > tm.flip + .2 && t < tm.sum + 1) for (var z = 0; z < 70; z++) { var zx = (z * 151) % W, zy = ((t - tm.flip - .2) * (300 + (z * 37) % 300) + (z * 83) % 600) - 200; if (zy > H) continue; g.save(); g.translate(zx + Math.sin(t * 3 + z) * 30, zy); g.rotate(t * 4 + z); var cc = club(last.club); g.fillStyle = [cc.c1, cc.c2, "#f5d77a"][z % 3]; g.fillRect(-10, -5, 20, 10); g.restore(); }
    if (TEAR.hold && TEAR.drag && TEAR.fx != null) { g.save(); g.font = "120px " + FONT; g.textAlign = "center"; g.textBaseline = "top"; g.shadowColor = "rgba(0,0,0,.5)"; g.shadowBlur = 20; g.fillText("👆", TEAR.fx + 10, TEAR.fy - 10); g.restore(); }
    // 4. le bilan : nouvelles, doublons, pièces, album
    if (sumK > 0) summary(g, t, L, tm, sumK);
    g.fillStyle = "rgba(0,0,0,.45)"; rr(g, 200, 60, 680, 90, 45); g.fill(); g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; g.font = "900 42px " + FONT; g.fillText("🃏 ÉPISODE " + L.epi + " · ALBUM LIGUE 1", W / 2, 106);
  }
  /* ---------- réalisation « Hollywood » : caméra virtuelle, flash, reflet d'objectif, halo lumineux ---------- */
  var XT = null; function nowS() { return XT != null ? XT : performance.now() / 1000; }
  function pulse(d, len) { return d < 0 || d > len ? 0 : Math.pow(1 - d / len, 2); }
  function cam(t, tm, L) {
    var T = t - tm.intro, s = 1, x = 0, y = 0, r = 0, sh = 0;
    s += .05 * ease((T - .9) / 1.9) * (1 - ease((T - 2.9) / .6)); // le pack : lente avancée pendant qu'il tremble
    s += .09 * pulse(T - 2.9, .55); sh += 12 * pulse(T - 2.9, .45); // ouverture : coup de zoom et secousse
    for (var j = 0; j < tm.n; j++) { var ts = tm.intro + 3.4 + j * STEP, rk = RAR[L.cards[j].rk].rank; s += (.025 + .02 * rk) * pulse(t - ts, .4); sh += (2 + 4 * rk) * pulse(t - ts, .25); }
    if (!tm.walk) { var a = clamp((t - tm.tw) / (tm.flip - tm.tw)), b = 1 - ease((t - tm.flip) / .9); if (t >= tm.tw) { var k = t < tm.flip ? ease(a) : b; s += .1 * k; r += .012 * k * Math.sin(t * .7); y -= 30 * k; } } // suspense : avancée lente et léger angle
    s += .13 * pulse(t - tm.flip, .8); sh += 18 * pulse(t - tm.flip, .6); // révélation : gros coup de zoom
    if (t > tm.sum - .2) s += .04 * (1 - ease((t - tm.sum + .2) / 1.2)) * clamp((t - tm.sum + .2) / .2); // recul doux vers le bilan
    var D = decT(); if (t > D - 1.2 && t < tm.sum - .2) { var z = 1 - clamp((t - D + 1.2) / .5); s = 1 + (s - 1) * z; r *= z; y *= z; sh *= z; } // cadre fixe pendant les boutons
    x += Math.sin(t * 83) * sh + Math.sin(t * 1.3) * 4; y += Math.cos(t * 71) * sh + Math.cos(t * 1.1) * 3;
    return { s: s, x: x, y: y, r: r };
  }
  var BLM = null, BLM2 = null, CHR = null;
  function post(g, t, tm, L) { // finitions : halo, aberration, reflet anamorphique, vignette, grain
    var cvs = g.canvas;
    if (!BLM) { BLM = document.createElement("canvas"); BLM.width = 135; BLM.height = 240; BLM2 = document.createElement("canvas"); BLM2.width = 270; BLM2.height = 480; }
    var b = BLM.getContext("2d"), b2 = BLM2.getContext("2d");
    b.globalCompositeOperation = "source-over"; b.globalAlpha = 1; b.drawImage(cvs, 0, 0, 135, 240); b.globalCompositeOperation = "multiply"; b.drawImage(BLM, 0, 0); b.drawImage(BLM, 0, 0); // ne garde que les zones très claires
    b2.clearRect(0, 0, 270, 480); b2.drawImage(BLM, 0, 0, 270, 480);
    g.save(); g.globalCompositeOperation = "lighter"; g.globalAlpha = .3; g.imageSmoothingEnabled = true; g.drawImage(BLM2, 0, 0, W, H); g.restore();
    if (tm && L) {
      var R = RAR[L.cards[L.cards.length - 1].rk], fk = pulse(t - tm.flip, .9), ok2 = pulse(t - tm.intro - 2.9, .6);
      if (fk > 0 || ok2 > 0) { var k = Math.max(fk, ok2), cy = fk >= ok2 ? 1060 : 960; // reflet d'objectif anamorphique
        g.save(); g.globalCompositeOperation = "lighter"; var st = g.createLinearGradient(0, 0, W, 0); st.addColorStop(0, "rgba(" + R.beam + ",0)"); st.addColorStop(.5, "rgba(210,235,255," + (.8 * k) + ")"); st.addColorStop(1, "rgba(" + R.beam + ",0)"); g.fillStyle = st; g.fillRect(0, cy - 5 - 10 * k, W, 10 + 20 * k);
        var cg = g.createRadialGradient(W / 2, cy, 0, W / 2, cy, 520); cg.addColorStop(0, "rgba(255,255,255," + (.55 * k) + ")"); cg.addColorStop(1, "rgba(" + R.beam + ",0)"); g.fillStyle = cg; g.fillRect(W / 2 - 520, cy - 520, 1040, 1040);
        [[-.6, 60, .25], [-.25, 26, .35], [.35, 40, .25], [.7, 90, .15]].forEach(function (o) { var gx = W / 2 + (W / 2 - 200) * o[0] * 1.6, gy = cy + (cy - 960) * o[0], gr = g.createRadialGradient(gx, gy, 0, gx, gy, o[1]); gr.addColorStop(0, "rgba(" + R.beam + "," + (o[2] * k) + ")"); gr.addColorStop(1, "rgba(" + R.beam + ",0)"); g.fillStyle = gr; g.fillRect(gx - o[1], gy - o[1], o[1] * 2, o[1] * 2); }); g.restore();
        var ca = Math.max(pulse(t - tm.flip, .3), pulse(t - tm.intro - 2.9, .25)); if (ca > .02) { // aberration chromatique
          if (!CHR) { CHR = document.createElement("canvas"); CHR.width = W; CHR.height = H; } var c2 = CHR.getContext("2d");
          [["#ff0000", -1], ["#0040ff", 1]].forEach(function (cc) { c2.globalCompositeOperation = "source-over"; c2.drawImage(cvs, 0, 0); c2.globalCompositeOperation = "multiply"; c2.fillStyle = cc[0]; c2.fillRect(0, 0, W, H); g.save(); g.globalCompositeOperation = "lighter"; g.globalAlpha = .45 * ca; g.drawImage(CHR, cc[1] * 22 * ca, 0); g.restore(); }); }
      }
    }
    var v = g.createRadialGradient(W / 2, H / 2, H * .35, W / 2, H / 2, H * .78); v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0,.42)"); g.fillStyle = v; g.fillRect(0, 0, W, H);
    grain(g, t, .045);
  }
  function drawScene(g, t) {
    var L = S && S.last; g.setTransform(1, 0, 0, 1, 0, 0);
    if (!L) { idle(g, t); post(g, t, null, null); return; }
    var tm = TL(L), c = cam(t, tm, L);
    g.save(); g.fillStyle = "#000"; g.fillRect(0, 0, W, H); g.translate(W / 2 + c.x, H / 2 + c.y); g.rotate(c.r); g.scale(c.s, c.s); g.translate(-W / 2, -H / 2);
    drawScene0(g, t); g.restore();
    post(g, t, tm, L);
  }

  /* ---------- export haute qualité : 60 images/seconde calculées une par une, flou de mouvement, son calculé à part ---------- */
  function loadMuxer() { return window.Mp4Muxer ? Promise.resolve() : new Promise(function (res, rej) { var s = document.createElement("script"); s.src = "https://cdn.jsdelivr.net/npm/mp4-muxer@5.2.2/build/mp4-muxer.min.js"; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  async function hqSupport() {
    if (!window.VideoEncoder || !window.AudioEncoder || !window.VideoFrame || !window.AudioData || !window.OfflineAudioContext) return null;
    var vc = null; for (var c of ["avc1.64002A", "avc1.4D402A", "avc1.42E02A", "avc1.640028"]) { try { var r = await VideoEncoder.isConfigSupported({ codec: c, width: 1080, height: 1920, bitrate: 20e6, framerate: 60 }); if (r.supported) { vc = c; break; } } catch (e) {} }
    if (!vc) return null; var ac2 = null;
    for (var a of [["mp4a.40.2", "aac"], ["opus", "opus"]]) { try { var r2 = await AudioEncoder.isConfigSupported({ codec: a[0], sampleRate: 48000, numberOfChannels: 2, bitrate: 192000 }); if (r2.supported) { ac2 = a; break; } } catch (e) {} }
    return ac2 ? { v: vc, a: ac2 } : null;
  }
  async function exportHQ(sup) {
    await loadMuxer();
    var L = S.last, fps = 60, TH = tearT(), HOLD = TEAR.on ? 1.5 : 0, dur = Math.min(total() + HOLD + .3, window.__hqLimit || 1e9), N = Math.ceil(dur * fps), sr = 48000, tStart = 0;
    pressed = decided();
    // le son
    var oac = new OfflineAudioContext(2, Math.ceil(sr * (dur + .2)), sr), out = oac.createGain(); out.connect(oac.destination);
    TEAR.done = false; sounds(oac, out, 0, null, HOLD ? TH : null); if (HOLD) { TEAR.done = true; sounds(oac, out, HOLD, TH, null);
      var nb = oac.createBuffer(1, 4096, sr), nd = nb.getChannelData(0); for (var q = 0; q < nd.length; q++) nd[q] = Math.random() * 2 - 1;
      for (var gi = 0; gi < 70; gi++) { var at = TH + .15 + Math.random() * (HOLD - .4), s2 = oac.createBufferSource(), f = oac.createBiquadFilter(), gg = oac.createGain(); s2.buffer = nb; f.type = "bandpass"; f.frequency.value = 1800 + Math.random() * 4500; f.Q.value = 3; gg.gain.setValueAtTime(.22, at); gg.gain.exponentialRampToValueAtTime(.001, at + .04); s2.connect(f); f.connect(gg); gg.connect(out); s2.start(at); s2.stop(at + .05); } }
    msg("🎧 Mixage du son…"); var abuf = await oac.startRendering();
    var muxer = new Mp4Muxer.Muxer({ target: new Mp4Muxer.ArrayBufferTarget(), video: { codec: "avc", width: 1080, height: 1920, frameRate: fps }, audio: { codec: sup.a[1], numberOfChannels: 2, sampleRate: sr }, fastStart: "in-memory", firstTimestampBehavior: "offset" });
    var fail = null, venc = new VideoEncoder({ output: function (c, m) { muxer.addVideoChunk(c, m); }, error: function (e) { fail = e; } });
    venc.configure({ codec: sup.v, width: 1080, height: 1920, bitrate: 20e6, framerate: fps, avc: { format: "avc" } });
    var aenc = new AudioEncoder({ output: function (c, m) { muxer.addAudioChunk(c, m); }, error: function (e) { fail = e; } });
    aenc.configure({ codec: sup.a[0], sampleRate: sr, numberOfChannels: 2, bitrate: 192000 });
    var c0 = abuf.getChannelData(0), c1 = abuf.getChannelData(1), len = Math.min(abuf.length, Math.ceil(dur * sr));
    for (var off = 0; off < len; off += 4800) { var n = Math.min(4800, len - off), dat = new Float32Array(n * 2); dat.set(c0.subarray(off, off + n), 0); dat.set(c1.subarray(off, off + n), n); var ad = new AudioData({ format: "f32-planar", sampleRate: sr, numberOfFrames: n, numberOfChannels: 2, timestamp: Math.round(off / sr * 1e6), data: dat }); aenc.encode(ad); ad.close(); }
    // l'image : deux sous-images par image pour un vrai flou de mouvement
    var A = document.createElement("canvas"), B = document.createElement("canvas"); A.width = B.width = W; A.height = B.height = H; var ag = A.getContext("2d"), bg2 = B.getContext("2d");
    function at2(v) { if (!HOLD || v < TH) { TEAR.hold = false; return v; } if (v < TH + HOLD) { var p = ease((v - TH - .2) / (HOLD - .45)); TEAR.hold = true; TEAR.drag = v - TH > .15 && p < 1; TEAR.p = p; TEAR.fx = W / 2 - 280 + 560 * p; TEAR.fy = 600 + Math.sin(p * 9) * 6; return TH; } TEAR.hold = false; TEAR.done = true; return v - HOLD; }
    var keep = { done: TEAR.done, hold: TEAR.hold, p: TEAR.p, drag: TEAR.drag }, tm = TL(L);
    function fast(t) { var T = t - tm.intro; if (T < .9 || (T > 2.85 && T < 3.7)) return true; for (var j = 0; j < tm.n; j++) { var d = t - (tm.intro + 3.4 + j * STEP); if (d > -.05 && d < .45 || d > .9 && d < 1.35) return true; }
      if (tm.walk && (t > tm.tun - .5 && t < tm.flag)) return true; return Math.abs(t - tm.flip) < .8 || (t > tm.sum - .1 && t < tm.sum + .7); }
    try {
      for (var i = 0; i < N; i++) {
        if (fail) throw fail; var v = i / fps;
        var sc = Math.min(at2(v), total()), nsub = fast(sc) ? 4 : 1; // flou de mouvement seulement quand ça bouge vite
        for (var k = 0; k < nsub; k++) { var vk = Math.max(0, v - k * .6 / fps / Math.max(1, nsub - 1)); XT = vk; bg2.setTransform(1, 0, 0, 1, 0, 0); drawScene(bg2, Math.min(at2(vk), total())); ag.globalAlpha = 1 / (k + 1); ag.drawImage(B, 0, 0); }
        ag.globalAlpha = 1; at2(v);
        var fr = new VideoFrame(A, { timestamp: Math.round(v * 1e6), duration: Math.round(1e6 / fps) }); venc.encode(fr, { keyFrame: i % 120 === 0 }); fr.close();
        if (i === 0) tStart = performance.now();
        if (i % 6 === 0) { var left = i > 30 ? (performance.now() - tStart) / i * (N - i) / 1000 : 0; $("#barI").style.width = Math.round(i / N * 100) + "%"; msg("🎬 Fabrication HD 60 images/s… " + Math.round(i / N * 100) + " %" + (left ? " · encore " + (left > 90 ? Math.ceil(left / 60) + " min" : Math.ceil(left) + " s") : "") + " (garde la page ouverte)"); g.drawImage(A, 0, 0); await new Promise(function (r) { setTimeout(r, 0); }); }
        while (venc.encodeQueueSize > 6) await new Promise(function (r) { setTimeout(r, 5); });
      }
      await venc.flush(); await aenc.flush(); muxer.finalize();
    } finally { XT = null; TEAR.done = keep.done; TEAR.hold = keep.hold; TEAR.p = keep.p; TEAR.drag = keep.drag; }
    return new Blob([muxer.target.buffer], { type: "video/mp4" });
  }
  /* ---------- walkout de cinéma : tunnel, stade de nuit, écran géant, sortie du joueur ---------- */
  var GRAIN = null, CROWD = null;
  function grain(g, t, a) { if (!GRAIN) { GRAIN = document.createElement("canvas"); GRAIN.width = GRAIN.height = 256; var x = GRAIN.getContext("2d"), id = x.createImageData(256, 256); for (var i = 0; i < id.data.length; i += 4) { var v = Math.random() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 255; } x.putImageData(id, 0, 0); }
    g.save(); g.globalAlpha = a; g.globalCompositeOperation = "overlay"; var ox = Math.floor((t * 997) % 256), oy = Math.floor((t * 577) % 256); g.translate(-ox, -oy); g.fillStyle = g.createPattern(GRAIN, "repeat"); g.fillRect(0, 0, W + 256, H + 256); g.restore(); }
  function vignette(g, a) { var v = g.createRadialGradient(W / 2, H / 2, H * .28, W / 2, H / 2, H * .72); v.addColorStop(0, "rgba(0,0,0,0)"); v.addColorStop(1, "rgba(0,0,0," + a + ")"); g.fillStyle = v; g.fillRect(0, 0, W, H); }
  function flare(g, x, y, k, col) { if (k <= 0) return; g.save(); g.globalCompositeOperation = "lighter"; var r = g.createRadialGradient(x, y, 0, x, y, 120 * k); r.addColorStop(0, "rgba(255,255,255," + k + ")"); r.addColorStop(.2, "rgba(" + col + "," + (.5 * k) + ")"); r.addColorStop(1, "rgba(" + col + ",0)"); g.fillStyle = r; g.fillRect(x - 120 * k, y - 120 * k, 240 * k, 240 * k);
    var s = g.createLinearGradient(x - 520, 0, x + 520, 0); s.addColorStop(0, "rgba(" + col + ",0)"); s.addColorStop(.5, "rgba(200,230,255," + (.55 * k) + ")"); s.addColorStop(1, "rgba(" + col + ",0)"); g.fillStyle = s; g.fillRect(x - 520, y - 3 * k, 1040, 6 * k); g.restore(); }
  function smoke(g, t, y0, n, a, col) { for (var s = 0; s < n; s++) { var sx = ((s * 263 + t * (30 + s * 7) * (s % 2 ? 1 : -1)) % (W + 600) + W + 600) % (W + 600) - 300, sy = y0 + (s % 4) * 110 + Math.sin(t * .7 + s) * 40, r = 260 + (s % 3) * 90, sm = g.createRadialGradient(sx, sy, 10, sx, sy, r); sm.addColorStop(0, "rgba(" + (col || "190,200,220") + "," + a + ")"); sm.addColorStop(1, "rgba(" + (col || "190,200,220") + ",0)"); g.fillStyle = sm; g.fillRect(sx - r, sy - r, r * 2, r * 2); } }
  function tunnelRun(g, t, k, cc, R) { // la caméra avance dans le tunnel (k : 0 → 1)
    var cz = 3550 * (1 - Math.pow(1 - k, 1.7)), vx = W / 2 + Math.sin(t * 1.3) * 10, vy = 900 + Math.sin(t * 2.1) * 6, f = 640, end = 4300, hw = 520, top = -440, bot = 560;
    function P(x, y, z) { var dz = Math.max(30, z - cz), s = f / dz; return [vx + x * s, vy + y * s]; }
    g.fillStyle = "#020306"; g.fillRect(0, 0, W, H);
    var e0 = P(-hw, top, end), e1 = P(hw, bot, end), ex = (e0[0] + e1[0]) / 2, ey = (e0[1] + e1[1]) / 2, ew = e1[0] - e0[0], eh = e1[1] - e0[1]; // la sortie, pleine de lumière
    var eg = g.createLinearGradient(0, e0[1], 0, e1[1]); eg.addColorStop(0, "#9fc4ff"); eg.addColorStop(.55, "#ffffff"); eg.addColorStop(.6, "#bfe6b0"); eg.addColorStop(1, "#3c8a3a"); g.fillStyle = eg; g.fillRect(e0[0], e0[1], ew, eh);
    var seg = 230;
    for (var z = Math.floor(end / seg) * seg; z >= Math.max(0, Math.floor(cz / seg) * seg); z -= seg) {
      var z1 = z + seg; if (z1 > end) continue; if (z1 < cz + 30) continue;
      var fog = Math.min(1, (z - cz) / 2200), sh = 1 - fog * .8;
      var a0 = P(-hw, top, z), b0 = P(hw, top, z), c0 = P(hw, bot, z), d0 = P(-hw, bot, z), a1 = P(-hw, top, z1), b1 = P(hw, top, z1), c1 = P(hw, bot, z1), d1 = P(-hw, bot, z1);
      function quad(p, q, r, s2, col) { g.fillStyle = col; g.beginPath(); g.moveTo(p[0], p[1]); g.lineTo(q[0], q[1]); g.lineTo(r[0], r[1]); g.lineTo(s2[0], s2[1]); g.closePath(); g.fill(); }
      var w = Math.round(7 + 16 * sh), fl = Math.round(6 + 20 * sh);
      quad(a0, a1, d1, d0, "rgb(" + w + "," + (w + 4) + "," + (w + 12) + ")"); quad(b0, b1, c1, c0, "rgb(" + w + "," + (w + 4) + "," + (w + 12) + ")");
      quad(a0, b0, b1, a1, "rgb(" + (w - 6) + "," + (w - 4) + "," + w + ")"); quad(d0, c0, c1, d1, "rgb(" + fl + "," + fl + "," + (fl + 6) + ")");
      g.strokeStyle = "rgba(0,0,0,.6)"; g.lineWidth = 3 * sh + 1; g.beginPath(); g.moveTo(a0[0], a0[1]); g.lineTo(b0[0], b0[1]); g.lineTo(c0[0], c0[1]); g.lineTo(d0[0], d0[1]); g.closePath(); g.stroke();
      // bande LED aux couleurs du club le long des murs
      g.save(); g.globalCompositeOperation = "lighter"; g.strokeStyle = cc.c1; g.globalAlpha = .9 * sh; g.lineWidth = 5 * sh + 1; g.shadowColor = cc.c1; g.shadowBlur = 18;
      [[-hw, 140], [hw, 140]].forEach(function (L) { var p0 = P(L[0], L[1], z), p1 = P(L[0], L[1], z1); g.beginPath(); g.moveTo(p0[0], p0[1]); g.lineTo(p1[0], p1[1]); g.stroke(); });
      // plafonnier + reflet sur le sol brillant
      var l0 = P(-150, top + 2, z + 60), l1 = P(150, top + 2, z + 150), lw = l1[0] - l0[0], lh = l1[1] - l0[1]; g.shadowBlur = 0; g.globalAlpha = sh;
      var lg = g.createRadialGradient((l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2, 2, (l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2, Math.max(20, lw)); lg.addColorStop(0, "rgba(255,255,255,.95)"); lg.addColorStop(.35, "rgba(220,235,255,.4)"); lg.addColorStop(1, "rgba(220,235,255,0)"); g.fillStyle = lg; g.fillRect(l0[0] - lw, l0[1] - lw, lw * 3, Math.abs(lh) + lw * 2);
      var r0 = P(-60, bot, z + 60), r1 = P(60, bot, z + 150), rg = g.createLinearGradient(0, r1[1], 0, r0[1]); rg.addColorStop(0, "rgba(255,255,255,0)"); rg.addColorStop(1, "rgba(220,235,255," + (.22 * sh) + ")"); g.fillStyle = rg; g.fillRect(r0[0], r1[1], r1[0] - r0[0], r0[1] - r1[1]);
      g.restore();
    }
    // halo de la sortie qui grandit
    g.save(); g.globalCompositeOperation = "lighter"; var hr = Math.max(ew, eh) * 1.1 + 200, hg = g.createRadialGradient(ex, ey, 10, ex, ey, hr); hg.addColorStop(0, "rgba(255,255,255," + (.22 + .3 * k) + ")"); hg.addColorStop(1, "rgba(" + R.beam + ",0)"); g.fillStyle = hg; g.fillRect(ex - hr, ey - hr, hr * 2, hr * 2); g.restore();
    smoke(g, t, 1250, 6, .1);
  }
  function stadium(g, t, cc, push) { // stade de nuit : tribunes pleines, projecteurs, pelouse
    if (!CROWD) { CROWD = []; var r = rng(77); for (var i = 0; i < 1400; i++) { var tier = Math.floor(r() * 3), y = 640 + tier * 170 + r() * 150, x = r() * W; CROWD.push([x, y, r(), r()]); } }
    g.save(); g.translate(W / 2, 1000); g.scale(push, push); g.translate(-W / 2, -1000);
    var sky = g.createLinearGradient(0, 0, 0, 700); sky.addColorStop(0, "#02040b"); sky.addColorStop(1, "#0b1530"); g.fillStyle = sky; g.fillRect(-200, -200, W + 400, 900);
    for (var tr = 0; tr < 3; tr++) { var y0 = 620 + tr * 170; g.fillStyle = ["#0c1220", "#101828", "#141e30"][tr]; g.fillRect(-200, y0, W + 400, 175); g.fillStyle = "rgba(255,255,255,.05)"; g.fillRect(-200, y0, W + 400, 4); }
    CROWD.forEach(function (c, i) { var bob = Math.sin(t * 6 + c[2] * 30) * 3 * (c[3] > .5 ? 1 : .3); g.fillStyle = c[3] < .3 ? cc.c1 : c[3] < .45 ? cc.c2 : "rgba(40,48,66,1)"; g.fillRect(c[0] - 5, c[1] + bob - 6, 10, 12);
      if (c[2] > .985 && Math.sin(t * 9 + i) > .6) { g.fillStyle = "#fff"; g.fillRect(c[0] - 3, c[1] + bob - 4, 6, 6); } }); // flashs des téléphones
    var pitch = g.createLinearGradient(0, 1130, 0, 1920); pitch.addColorStop(0, "#1d5a24"); pitch.addColorStop(1, "#0f3313"); g.fillStyle = pitch; g.fillRect(-200, 1130, W + 400, 900);
    for (var s = 0; s < 9; s++) { var ya = 1130 + Math.pow(s / 9, 1.6) * 790, yb = 1130 + Math.pow((s + 1) / 9, 1.6) * 790; if (s % 2) { g.fillStyle = "rgba(255,255,255,.045)"; g.fillRect(-200, ya, W + 400, yb - ya); } }
    g.strokeStyle = "rgba(255,255,255,.55)"; g.lineWidth = 4; g.beginPath(); g.moveTo(-200, 1150); g.lineTo(W + 200, 1150); g.stroke(); g.beginPath(); g.ellipse(W / 2, 1500, 520, 150, 0, 0, Math.PI * 2); g.stroke(); g.beginPath(); g.moveTo(W / 2, 1150); g.lineTo(W / 2, 1920); g.stroke();
    [[60, 120], [W - 60, 120], [-40, 330], [W + 40, 330]].forEach(function (L, i) { // pylônes d'éclairage
      g.fillStyle = "#0a0d14"; g.fillRect(L[0] - 6, L[1], 12, 600);
      for (var a = 0; a < 3; a++) for (var b = 0; b < 4; b++) { var lx = L[0] - 45 + b * 30, ly = L[1] - 20 + a * 24; g.fillStyle = "#fffbe8"; g.fillRect(lx, ly, 22, 16); }
      g.save(); g.globalCompositeOperation = "lighter"; var cg = g.createLinearGradient(L[0], L[1], W / 2, 1500); cg.addColorStop(0, "rgba(255,250,230,.22)"); cg.addColorStop(1, "rgba(255,250,230,0)"); g.fillStyle = cg; g.beginPath(); g.moveTo(L[0] - 40, L[1]); g.lineTo(L[0] + 40, L[1]); g.lineTo(W / 2 + (i % 2 ? -150 : 450), 1800); g.lineTo(W / 2 + (i % 2 ? -550 : 50), 1800); g.closePath(); g.fill(); g.restore();
      flare(g, L[0], L[1] + 4, .8 + .2 * Math.sin(t * 3 + i), "180,210,255"); });
    smoke(g, t, 900, 7, .07);
    g.restore();
  }
  function jumbo(g, t, cc, R, what, last, inf, k) { // écran géant suspendu
    if (k <= 0) return; var x = 170, y = 250, w = 740, h = 420;
    g.save(); g.globalAlpha = k;
    g.fillStyle = "#05070c"; g.fillRect(x - 24, y - 24, w + 48, h + 48); g.fillStyle = "#1a2030"; g.fillRect(x - 24, y + h + 24, 20, 140); g.fillRect(x + w + 4, y + h + 24, 20, 140);
    g.save(); g.shadowColor = cc.c1; g.shadowBlur = 60; var sg = g.createLinearGradient(0, y, 0, y + h); sg.addColorStop(0, mix(cc.dark, "#000000", .2)); sg.addColorStop(1, "#000000"); g.fillStyle = sg; g.fillRect(x, y, w, h); g.restore();
    g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.translate(x + w / 2, y + h / 2);
    var pop = .6 + .4 * back(what.d / .35); g.scale(pop, pop); g.textAlign = "center"; g.textBaseline = "middle"; g.fillStyle = "#fff";
    if (what.id === "flag") { g.font = "230px " + FONT; g.fillText(flag(inf.nat), 0, -40); g.font = "900 54px " + FONT; g.fillText(String(inf.nat).toUpperCase(), 0, 150); }
    else if (what.id === "club") { badge(g, 0, -40, 130, last.club); g.font = "900 56px " + FONT; g.fillText(String(last.club).toUpperCase(), 0, 150); }
    else if (what.id === "pos") { g.font = "900 220px " + FONT; g.fillText(last.pos, 0, 0); }
    else { g.font = "900 250px " + FONT; g.fillStyle = "#f5d77a"; g.shadowColor = "rgba(245,215,122,.8)"; g.shadowBlur = 40; g.fillText(String(last.rating), 0, 6); }
    g.restore();
    g.fillStyle = "rgba(0,0,0,.28)"; for (var l = y; l < y + h; l += 6) g.fillRect(x, l, w, 2); // lignes de l'écran
    g.globalCompositeOperation = "lighter"; g.fillStyle = "rgba(255,255,255," + (.03 + .03 * Math.sin(t * 40)) + ")"; g.fillRect(x, y, w, h);
    var sw = (t * .6) % 1.4 - .2, gl2 = g.createLinearGradient(x + sw * w - 80, 0, x + sw * w + 80, 0); gl2.addColorStop(0, "rgba(255,255,255,0)"); gl2.addColorStop(.5, "rgba(255,255,255,.08)"); gl2.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = gl2; g.fillRect(x, y, w, h);
    g.restore();
  }
  function pyro(g, t, t0, cc) { // jets de flammes de chaque côté
    [t0, t0 + .7].forEach(function (s, j) { var d = t - s; if (d < 0 || d > 1) return; var a = d < .15 ? d / .15 : 1 - (d - .15) / .85;
      [180, W - 180].forEach(function (x, i) { var hgt = 620 * (d < .2 ? d / .2 : 1) * (.9 + .1 * Math.sin(t * 50 + i)), by = 1560;
        g.save(); g.globalCompositeOperation = "lighter"; g.globalAlpha = a;
        for (var q = 0; q < 6; q++) { var yy = by - hgt * (q / 6), rr2 = (110 - q * 12) * (1 + .15 * Math.sin(t * 30 + q * 2 + i)), fg = g.createRadialGradient(x + Math.sin(t * 25 + q) * 14, yy, 4, x, yy, rr2); fg.addColorStop(0, "rgba(255,250,220,.9)"); fg.addColorStop(.3, "rgba(255,180,60,.7)"); fg.addColorStop(1, "rgba(255,60,10,0)"); g.fillStyle = fg; g.fillRect(x - rr2, yy - rr2, rr2 * 2, rr2 * 2); }
        g.restore(); });
      g.save(); g.globalCompositeOperation = "lighter"; g.fillStyle = "rgba(255,140,40," + (.18 * a) + ")"; g.fillRect(0, 0, W, H); g.restore(); });
  }
  function tunnel(g, t, tm, last, R) {
    var a = clamp((t - tm.tun + .4) / .4) * (t > tm.flip + .2 ? 1 - (t - tm.flip - .2) / .4 : 1); if (a <= 0) return;
    var cc = club(last.club), inf = info(last), hasFlag = !!flag(inf.nat), tB = tm.flag - .25, tC = tm.sil;
    var shake = 0; [tB, tC, tC + .3, tC + 1].forEach(function (s) { var d = t - s; if (d > 0 && d < .4) shake = Math.max(shake, (1 - d / .4) * 14); });
    g.save(); g.globalAlpha = a; g.translate(Math.sin(t * 70) * shake, Math.cos(t * 63) * shake);
    if (t < tB) tunnelRun(g, t, clamp((t - tm.tun + .4) / (tB - tm.tun + .4)), cc, R);
    else if (t < tC) { // plan du stade avec l'écran géant
      var k = (t - tB) / (tC - tB); stadium(g, t, cc, 1 + .08 * k);
      var id = t < tm.club ? (hasFlag ? "flag" : "club") : t < tm.pos ? "club" : "pos", st2 = id === "flag" ? tm.flag : id === "club" ? (hasFlag ? tm.club : tm.flag) : tm.pos;
      jumbo(g, t, cc, R, { id: id, d: t - st2 }, last, inf, clamp((t - tB) / .3));
    } else { // contrechamp : le joueur sort du tunnel vers la caméra
      stadium(g, t, cc, 1.25); g.fillStyle = "rgba(0,0,0,.45)"; g.fillRect(0, 0, W, H);
      var mx = W / 2, my = 1120, mw = 440, mh = 520; // l'arche du tunnel
      g.fillStyle = "#06080d"; g.fillRect(mx - mw / 2 - 60, my - mh - 60, mw + 120, mh + 60); var ig = g.createRadialGradient(mx, my - mh / 2, 20, mx, my - mh / 2, 420); ig.addColorStop(0, "rgba(255,255,255,1)"); ig.addColorStop(.4, "rgba(" + R.beam + ",.85)"); ig.addColorStop(1, "rgba(" + R.beam + ",.15)"); g.fillStyle = ig; g.fillRect(mx - mw / 2, my - mh, mw, mh);
      g.save(); g.globalCompositeOperation = "lighter"; var bg2 = g.createRadialGradient(mx, my - 200, 50, mx, my - 200, 900); bg2.addColorStop(0, "rgba(" + R.beam + ",.45)"); bg2.addColorStop(1, "rgba(" + R.beam + ",0)"); g.fillStyle = bg2; g.fillRect(0, 0, W, H); g.restore();
      smoke(g, t, 1050, 8, .16, "220,225,240");
      var p = clamp((t - tC) / (tm.flip - tC - .15)), e = p * p, sc = .5 + 1.05 * e, cy = my + 30 + 640 * e, ph = photos[pkey(last)], step = Math.abs(Math.sin(p * 9)) * 18 * (1 - e);
      g.save(); g.translate(mx + Math.sin(p * 9) * 8, cy - step); g.scale(sc, sc);
      g.shadowColor = "rgba(" + R.beam + ",1)"; g.shadowBlur = 45;
      if (ph && "filter" in g) { var hh = 900, ww = hh * ph.width / ph.height; g.filter = "brightness(0)"; g.drawImage(ph, -ww / 2, -hh, ww, hh); g.filter = "none"; }
      else { g.fillStyle = "#000"; g.beginPath(); g.arc(0, -760, 95, 0, Math.PI * 2); g.fill(); g.beginPath(); g.moveTo(-230, -560); g.quadraticCurveTo(0, -660, 230, -560); g.lineTo(260, -160); g.lineTo(150, -150); g.lineTo(120, 0); g.lineTo(30, 0); g.lineTo(0, -300); g.lineTo(-30, 0); g.lineTo(-120, 0); g.lineTo(-150, -150); g.lineTo(-260, -160); g.closePath(); g.fill(); }
      g.restore();
      pyro(g, t, tC + .3, cc);
      jumbo(g, t, cc, R, { id: "note", d: t - tC - .2 }, last, inf, clamp((t - tC - .2) / .3));
    }
    var cut = Math.min(Math.abs(t - tB), Math.abs(t - tC)); if (cut < .18) { g.fillStyle = "rgba(255,255,255," + (1 - cut / .18) * .85 + ")"; g.fillRect(0, 0, W, H); }
    vignette(g, .7); grain(g, t, .09);
    var lb = clamp((t - tm.tun + .4) / .5) * (1 - clamp((t - tm.flip + .1) / .3)); g.fillStyle = "#000"; g.fillRect(0, 0, W, 170 * lb); g.fillRect(0, H - 170 * lb, W, 170 * lb); // bandes cinéma
    g.restore();
    if (t > tm.flip - .35 && t < tm.flip + .1) { g.fillStyle = "rgba(255,255,255," + (1 - Math.abs(t - tm.flip + .12) / .25) + ")"; g.fillRect(0, 0, W, H); }
  }
  // boutons « vendre / garder » dans la vidéo : la lecture s'arrête dessus jusqu'au choix
  var BTN = { sell: [70, 1640, 450, 170], keep: [560, 1640, 450, 170] }, pressed = null;
  function decided() { var L = S && S.last, c = L && L.cards[L.cards.length - 1]; return c && $("#inter").checked ? (c.sale ? "sell" : c.keep ? "keep" : null) : null; }
  function decT() { return S && S.last ? TL(S.last).flip + 1.7 : 1e9; }
  function pending() { var L = S && S.last, c = L && L.cards[L.cards.length - 1]; return !!(c && $("#inter").checked && !c.dup && !c.sale && !c.keep && c.value != null); }
  function btnVis(t) { var D = decT(); return pending() ? t >= D - .3 : !!(pressed && t >= D - 1 && t < D + .8); }
  function choiceButtons(g, t, tm, last) {
    var D = decT(), show = btnVis(t); if (!show) return;
    var a = pending() ? clamp((t - D + .3) / .3) : clamp((t - D + 1) / .3) * (1 - clamp((t - D - .5) / .3));
    g.save(); g.globalAlpha = a; g.fillStyle = "rgba(0,0,0,.5)"; g.fillRect(0, 1505, W, 360);
    [["sell", "💸 VENDRE", fmt(last.value) + " 🪙", "#fb923c", "#2a1000"], ["keep", "🔒 GARDER", "dans l'album", "#22c55e", "#04210f"]].forEach(function (b) {
      var r = BTN[b[0]], on = pressed === b[0], off = pressed && !on, sc = on ? 1 + .08 * Math.sin(clamp((t - D) / .3) * Math.PI) : 1, pulse = pending() ? 1 + .03 * Math.sin(t * 6 + (b[0] === "keep" ? 1.5 : 0)) : 1;
      g.save(); g.globalAlpha = a * (off ? .35 : 1); g.translate(r[0] + r[2] / 2, r[1] + r[3] / 2); g.scale(sc * pulse, sc * pulse);
      g.shadowColor = "rgba(0,0,0,.5)"; g.shadowBlur = 24; g.fillStyle = b[3]; rr(g, -r[2] / 2, -r[3] / 2, r[2], r[3], 40); g.fill(); g.shadowBlur = 0;
      if (on) { g.lineWidth = 10; g.strokeStyle = "#fff"; rr(g, -r[2] / 2, -r[3] / 2, r[2], r[3], 40); g.stroke(); }
      g.fillStyle = b[4]; g.textAlign = "center"; g.textBaseline = "middle"; g.font = "900 58px " + FONT; g.fillText(b[1], 0, -24); g.font = "800 38px " + FONT; g.fillText(b[2], 0, 40); g.restore(); });
    if (pending()) bigText(g, "Je la garde ou je la vends ? 👇", 1560, 54, a, 1, "#fff");
    if (pressed && !pending() && t < D && t > D - .25) { var hb = BTN[pressed]; g.font = "80px " + FONT; g.textAlign = "center"; g.fillText("👆", hb[0] + hb[2] / 2 + 40, hb[1] + hb[3] - 10 + (D - t) * 200); }
    if (pressed && t >= D && t < D + .5) { var q = (t - D) / .5, rb = BTN[pressed]; g.fillStyle = "rgba(255,255,255," + (.5 * (1 - q)) + ")"; g.beginPath(); g.arc(rb[0] + rb[2] / 2, rb[1] + rb[3] / 2, 60 + 260 * q, 0, Math.PI * 2); g.fill(); }
    g.restore();
  }
  // pack en aluminium : bords soudés crantés, effet bombé, reflets qui bougent, plis, motif en relief, bandeau
  var FOIL = { base: ["#f4f6f9", "#b6c0cc", "#5d6773", "#1b2330", "#ffffff"], or: ["#fff2b3", "#e2b93b", "#7a560c", "#2b1d03", "#fff6d0"], futur: ["#b8ffe9", "#19b58c", "#06473a", "#ffffff", "#c8fff0"], totw: ["#4a4a4a", "#1a1a1a", "#040404", "#f5d77a", "#f5d77a"],
    premium: ["#e2c2ff", "#7c3aed", "#25074f", "#ffe9a8", "#ffe9a8"], icone: ["#ffffff", "#ece3c6", "#a88d4c", "#3a2f12", "#d9b85c"] };
  function foilOf(id, cl) { if (id === "club") { var c = club(cl), light = lum(c.c1) > .75; return [light ? c.c1 : mix(c.c1, "#ffffff", .35), c.c1, c.dark, light ? "#111111" : "#ffffff", c.c2]; } return FOIL[id] || FOIL.base; }
  function lum(h) { var n = parseInt(String(h).slice(1), 16); return (.299 * (n >> 16) + .587 * ((n >> 8) & 255) + .114 * (n & 255)) / 255; }
  function mix(a, b, k) { var x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16), r = Math.round((x >> 16) * (1 - k) + (y >> 16) * k), gg = Math.round(((x >> 8) & 255) * (1 - k) + ((y >> 8) & 255) * k), bb = Math.round((x & 255) * (1 - k) + (y & 255) * k); return "#" + ((1 << 24) + (r << 16) + (gg << 8) + bb).toString(16).slice(1); }
  function packPath(g, w, h) { var x = -w / 2, y = -h / 2, n = Math.round(w / 18), i; g.beginPath(); g.moveTo(x, y + 10);
    for (i = 0; i <= n; i++) g.lineTo(x + i * w / n, y + (i % 2 ? 0 : 10)); g.lineTo(-x, -y - 10); for (i = n; i >= 0; i--) g.lineTo(x + i * w / n, -y - (i % 2 ? 0 : 10)); g.closePath(); }
  function drawPack(g, t, F, name, sub, logo, flat) {
    var w = 540, h = 780, cr = 46;
    packPath(g, w, h); var bg = g.createLinearGradient(-w / 2, 0, w / 2, 0); bg.addColorStop(0, F[2]); bg.addColorStop(.18, F[1]); bg.addColorStop(.42, F[0]); bg.addColorStop(.58, F[1]); bg.addColorStop(.85, F[1]); bg.addColorStop(1, F[2]); g.fillStyle = bg; g.fill();
    g.save(); packPath(g, w, h); g.clip();
    var vg = g.createLinearGradient(0, -h / 2, 0, h / 2); vg.addColorStop(0, "rgba(0,0,0,.35)"); vg.addColorStop(.12, "rgba(0,0,0,0)"); vg.addColorStop(.88, "rgba(0,0,0,0)"); vg.addColorStop(1, "rgba(0,0,0,.4)"); g.fillStyle = vg; if (!flat) g.fillRect(-w / 2, -h / 2, w, h); // bombé
    g.globalAlpha = .07; g.strokeStyle = F[3]; g.lineWidth = 2; for (var k = -14; k < 14; k++) { g.beginPath(); g.moveTo(k * 46, -h / 2 + cr); g.lineTo(k * 46 + 300, h / 2 - cr); g.moveTo(k * 46 + 300, -h / 2 + cr); g.lineTo(k * 46, h / 2 - cr); g.stroke(); } g.globalAlpha = 1; // motif en relief
    if (!flat) [[-60, .08], [110, -.07], [-170, .05]].forEach(function (wr, i) { var x0 = wr[0] + Math.sin(t * .7 + i) * 6, lg = g.createLinearGradient(x0 - 40, 0, x0 + 40, 0); lg.addColorStop(0, "rgba(255,255,255,0)"); lg.addColorStop(.45, "rgba(255,255,255," + (.18 + .05 * i) + ")"); lg.addColorStop(.55, "rgba(0,0,0,.12)"); lg.addColorStop(1, "rgba(0,0,0,0)"); g.save(); g.rotate(wr[1]); g.fillStyle = lg; g.fillRect(x0 - 40, -h, 80, h * 2); g.restore(); }); // plis
    var sx = ((t * .35) % 1.6 - .3) * w * 1.4 - w / 2; if (!flat) { g.save(); g.rotate(-.42); g.globalCompositeOperation = "lighter"; var sh = g.createLinearGradient(sx - 120, 0, sx + 120, 0); sh.addColorStop(0, "rgba(255,255,255,0)"); sh.addColorStop(.5, "rgba(255,255,255,.4)"); sh.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = sh; g.fillRect(-w * 1.5, -h, w * 3, h * 2); g.restore(); } // reflet qui bouge
    var hl = g.createLinearGradient(-w / 2, 0, -w / 2 + 120, 0); hl.addColorStop(0, "rgba(255,255,255,0)"); hl.addColorStop(.6, "rgba(255,255,255,.28)"); hl.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = hl; if (!flat) g.fillRect(-w / 2 + 40, -h / 2, 120, h); // reflet fixe
    [-1, 1].forEach(function (sd) { var y0 = sd < 0 ? -h / 2 : h / 2 - cr, cg = g.createLinearGradient(0, y0, 0, y0 + cr); cg.addColorStop(0, sd < 0 ? "rgba(0,0,0,.35)" : "rgba(0,0,0,.05)"); cg.addColorStop(1, sd < 0 ? "rgba(0,0,0,.05)" : "rgba(0,0,0,.35)"); g.fillStyle = cg; g.fillRect(-w / 2, y0, w, cr);
      for (var x = -w / 2; x < w / 2; x += 7) { g.fillStyle = (x / 7) % 2 ? "rgba(255,255,255,.22)" : "rgba(0,0,0,.18)"; g.fillRect(x, y0, 3, cr); } g.fillStyle = "rgba(255,255,255,.35)"; g.fillRect(-w / 2, sd < 0 ? y0 + cr : y0, w, 2); }); // soudures crantées
    g.restore();
    g.save(); packPath(g, w, h); g.lineWidth = 3; g.strokeStyle = "rgba(255,255,255,.45)"; g.stroke(); g.restore();
    g.fillStyle = F[3]; g.globalAlpha = .85; g.font = "800 22px " + FONT; g.textAlign = "center"; g.textBaseline = "middle"; g.fillText("LIGUE 1 · SAISON 2026-2027", 0, -h / 2 + cr + 34); g.globalAlpha = 1;
    logo(g);
    var by = 150; g.save(); g.fillStyle = "rgba(0,0,0,.45)"; g.fillRect(-w / 2, by - 54, w, 108); g.fillStyle = F[4]; g.fillRect(-w / 2, by - 54, w, 5); g.fillRect(-w / 2, by + 49, w, 5); g.restore();
    g.fillStyle = "#fff"; var f2 = 56; g.font = "900 56px " + FONT; while (g.measureText(name).width > w - 50 && f2 > 30) { f2 -= 4; g.font = "900 " + f2 + "px " + FONT; } g.fillText(name, 0, by + 2);
    g.font = "800 30px " + FONT; var sw = g.measureText(sub).width + 44; g.fillStyle = "rgba(0,0,0,.5)"; rr(g, -sw / 2, by + 86, sw, 48, 24); g.fill(); g.fillStyle = "#fff"; g.fillText(sub, 0, by + 111);
  }
  function slotSum(i, n) { var perRow = n > 6 ? 4 : n > 4 ? 3 : n, row = Math.floor(i / perRow), inRow = Math.min(perRow, n - row * perRow); return [W / 2 + ((i % perRow) - (inRow - 1) / 2) * 250, 470 + row * 330]; }
  function tag(g, c, x, y, a, sc) { if (a <= 0) return; g.save(); g.globalAlpha = a; g.translate(x, y); g.scale(sc, sc); if (c.sale) pill(g, "💸 VENDUE +" + fmt(c.sale) + " 🪙", 0, 0, "#fb923c", "#2a1000", 30); else if (c.dup) pill(g, "♻️ DOUBLON +" + fmt(c.sold) + " 🪙", 0, 0, "#f5c542", "#1a1300", 30); else pill(g, "🆕 NOUVELLE", 0, 0, "#22c55e", "#04210f", 30); g.restore(); }
  function summary(g, t, L, tm, k) {
    var a = clamp((t - tm.sum - .3) / .4), nNew = L.cards.filter(function (c) { return !c.dup; }).length, nDup = L.cards.length - nNew, rows = Math.ceil(L.cards.length / (L.cards.length > 6 ? 4 : L.cards.length > 4 ? 3 : L.cards.length)), y0 = 470 + rows * 330 - 40;
    bigText(g, "📦 BILAN DU PACK", 230, 64, a, 1, "#f5d77a");
    var nSold = L.cards.filter(function (c) { return c.sale; }).length;
    var lines = [["🆕 " + nNew + " nouvelle" + (nNew > 1 ? "s" : "") + " · ♻️ " + nDup + " doublon" + (nDup > 1 ? "s" : ""), "#fff"], [(L.earned ? "Doublons +" + fmt(L.earned) + " 🪙 · " : "") + "Bonus d'épisode +" + fmt(L.bonus || 0) + " 🪙", "#f5c542"]].concat(L.sales ? [["💸 " + nSold + " carte" + (nSold > 1 ? "s" : "") + " vendue" + (nSold > 1 ? "s" : "") + " : +" + fmt(L.sales) + " 🪙", "#fb923c"]] : []).concat([, ["💰 Solde : " + fmt(L.coins) + " 🪙", "#fff"]]);
    lines.forEach(function (l, i) { bigText(g, l[0], y0 + i * 78, 50, clamp((t - tm.sum - .5 - i * .35) / .3), 1, l[1]); });
    var pa = clamp((t - tm.sum - 1.6) / .4), pb = y0 + lines.length * 78 + 26, fill = L.album[1] ? (L.albumBefore + (L.album[0] - L.albumBefore) * ease((t - tm.sum - 1.8) / 1)) / L.album[1] : 0;
    if (pa > 0) { g.save(); g.globalAlpha = pa; g.fillStyle = "rgba(255,255,255,.15)"; rr(g, 140, pb, 800, 40, 20); g.fill(); var pgd = g.createLinearGradient(140, 0, 940, 0); pgd.addColorStop(0, "#f5c542"); pgd.addColorStop(1, "#34d399"); g.fillStyle = pgd; rr(g, 140, pb, Math.max(40, 800 * fill), 40, 20); g.fill(); g.restore();
      bigText(g, "📖 Album : " + Math.round(fill * L.album[1]) + " / " + L.album[1] + " joueurs", pb + 90, 46, pa, 1); }
    if (L.completed && L.completed.length) bigText(g, "🏆 Page " + L.completed.join(", ") + " complétée ! 🎁 Pack offert", pb + 170, 44, clamp((t - tm.sum - 2.4) / .3), 1, "#34d399");
    bigText(g, "Quel pack j'ouvre ensuite ? 👇", 1780, 58, clamp((t - tm.sum - 2.8) / .4), .95 + .05 * Math.sin(t * 5), "#fff");
  }
  function idle(g, t) {
    var gr = g.createRadialGradient(W / 2, 800, 50, W / 2, 900, 1300); gr.addColorStop(0, "#0b1530"); gr.addColorStop(1, "#000"); g.fillStyle = gr; g.fillRect(0, 0, W, H);
    g.save(); g.translate(W / 2, 900 + Math.sin(t * 2) * 14); g.rotate(Math.sin(t) * .04); g.save(); g.shadowColor = "rgba(255,210,80,.6)"; g.shadowBlur = 80; g.fillStyle = FOIL.or[1]; g.scale(.86, .9); packPath(g, 540, 780); g.fill(); g.restore(); pack3d(g, t, FOIL.or, "TON 1er PACK", "OFFERT 🎁", function (gg) { badge(gg || g, 0, -90, 135, "L1"); }, Math.sin(t * .8) * .45, Math.sin(t * .6) * .1); g.restore();
    bigText(g, "Choisis un pack et ouvre-le 👈", 1560, 54, 1, 1);
  }

  /* ---------- voix off : commentateur surexcité (voix pro gratuite, fabriquée par le relais du Studio Quiz) ---------- */
  var VO = { key: "", bufs: {}, ready: false, busy: null };
  var SAY_CLUB = { "OM": "l'OM", "PSG": "le PSG", "Paris FC": "le Paris FC" }, SAY_AT = { "OM": "à l'OM", "PSG": "au PSG", "Paris FC": "au Paris FC", "Le Havre": "au Havre", "Le Mans": "au Mans" }, SAY_OF = { "OM": "de l'OM", "PSG": "du PSG", "Paris FC": "du Paris FC", "Le Havre": "du Havre", "Le Mans": "du Mans" };
  var SAY_POS = { G: "gardien", DC: "défenseur central", DG: "latéral gauche", DD: "latéral droit", MDC: "milieu défensif", MC: "milieu central", MOC: "milieu offensif", MG: "milieu gauche", MD: "milieu droit", AG: "ailier gauche", AD: "ailier droit", BU: "buteur" };
  var SAY_RAR = { commune: "carte commune", or: "carte or", futur: "futur talent", forme: "carte en forme", totw: "équipe de la semaine", potm: "joueur du mois", hero: "carte héros", fds: "fin de saison", icone: "icône" };
  function vSet() { var d = {}; try { d = JSON.parse(localStorage.getItem("packs-voice") || "null") || {}; } catch (e) {} var q = {}; try { q = JSON.parse(localStorage.getItem("sq-set") || "{}") || {}; } catch (e) {}
    return { on: d.on !== false, voice: d.voice || "fr-FR-HenriNeural", relay: d.relay || q.relay || "studio-quiz-relais.onrender.com", key: d.key || q.lbKey || "" }; }
  function sayClub(c) { return SAY_CLUB[c] || c; }
  function sayAt(c) { return SAY_AT[c] || "à " + c; }
  function sayOf(c) { return SAY_OF[c] || (/^[AEIOUYÉH]/i.test(c) ? "d'" : "de ") + c; }
  function sayName(n) { return String(n).replace(/[_@#]/g, " ").trim(); }
  function sayCoins(n) { return String(Math.round(n)); }
  // le texte : seulement les moments importants, phrases courtes et punchy
  function vScript(L) {
    var tm = TL(L), c = L.cards, last = c[c.length - 1], inf = info(last), P = packOf(L.pack), pk = P.id === "club" ? "pack " + sayOf(L.club) : P.label.toLowerCase(), out = [];
    function add(x, text, pri, flex) { out.push({ x: x, text: text, pri: pri || 2, flex: flex || 0 }); }
    if (L.who || L.com) add(.25, (L.who ? sayName(L.who) + " veut le " + pk : "Vous voulez le " + pk) + " ! C'est parti !", 3);
    else add(.1, "Épisode " + L.epi + " ! On ouvre le " + pk + " !", 2);
    add(tm.intro + 1.25, TEAR.on ? "On déchire !" : "Ça tremble !", 2, .3);
    for (var j = 0; j < tm.n; j++) { var cd = c[j], rk = RAR[cd.rk].rank, ts = tm.intro + 3.45 + j * STEP;
      if (rk >= 2) add(ts, SAY_RAR[cd.rk] + " ! " + sayName(cd.name) + " ! Énorme !", 3); else if (cd.rk === "or") add(ts, "Carte or ! " + sayName(cd.name) + " !", 2, .4); else if (cd.dup && j === 0) add(ts, "Un doublon… ça fait des pièces !", 1, .5); }
    add(tm.tw + .05, "Et la dernière carte…", 3, .7);
    if (tm.walk) {
      add(tm.tun - .2, "Le tunnel !", 1, .2);
      if (flag(inf.nat)) add(tm.flag + .05, "Nationalité : " + inf.nat + " !", 3, .2);
      add(tm.club + .05, "Il joue " + sayAt(last.club) + " !", 3, .2);
      add(tm.pos + .05, SAY_POS[last.pos] || last.pos, 3, .2);
      add(tm.sil + .1, "Il arrive !", 2, .3);
    } else {
      add(tm.club + .02, sayClub(last.club) + " !", 3, .15); add(tm.pos + .02, SAY_POS[last.pos] || last.pos, 3, .15); add(tm.note + .02, String(last.rating) + " !", 3, .1);
    }
    add(tm.flip + .3, sayName(last.name) + ", " + (RAR[last.rk].rank >= 2 ? SAY_RAR[last.rk] + " !" : last.rating >= 80 ? "quelle carte !" : last.rk === "or" ? "carte or !" : "pas mal !"), 3);
    if (RAR[last.rk].rank >= 2 || last.rating >= 88) add(tm.flip + 1.6, "In-croy-able !", 1, .5);
    if (last.dup) add(tm.flip + 2.6, "Doublon ! Plus " + sayCoins(last.sold) + " pièces !", 2, .3);
    else if (last.value != null) { var D = decT(); add(D + .2, "__DEAL__", 2, .8); }
    var nNew = c.filter(function (x) { return !x.dup; }).length, nDup = c.length - nNew;
    add(tm.sum + .45, "Bilan : " + nNew + " nouvelle" + (nNew > 1 ? "s" : "") + (nDup ? ", " + nDup + " doublon" + (nDup > 1 ? "s" : "") : "") + ", " + sayCoins(L.coins) + " pièces !", 3, .4);
    add(tm.sum + 3.1, "Quel pack ensuite ? Dis-moi en commentaire !", 3, .6);
    return out;
  }
  function vDeal(L) { var last = L.cards[L.cards.length - 1]; return last.sale ? "Vendue, plus " + sayCoins(last.sale) + " pièces !" : last.keep ? "Je la garde !" : "Je la garde ou je la vends ?"; }
  function vTexts(L) { var t = vScript(L).map(function (l) { return l.text; }).filter(function (x) { return x !== "__DEAL__"; }), last = L.cards[L.cards.length - 1]; if (last.value != null) { t.push("Vendue, plus " + sayCoins(last.value) + " pièces !", "Je la garde !", "Je la garde ou je la vends ?"); } return t; }
  function vKey(L) { if (!L) return ""; var c = L.cards[L.cards.length - 1]; return L.epi + "|" + L.cards.length + "|" + c.name + "|" + c.rk + "|" + c.rating + "|" + TEAR.on; }
  function prepVoice(L) { // télécharge toutes les phrases (en parallèle) avant de jouer
    var st = vSet(); if (!st.on || !L) { VO.ready = false; return Promise.resolve(false); }
    var key = vKey(L) + st.voice; if (VO.key === key && VO.ready) return Promise.resolve(true); if (VO.key === key && VO.busy) return VO.busy;
    VO.key = key; VO.ready = false; var a = audio(), base = String(st.relay).trim().replace(/\/+$/, ""); if (!/^[a-z]+:\/\//i.test(base)) base = "https://" + base; base = base.replace(/^ws/i, "http");
    var texts = vTexts(L), fails = 0;
    function trim(b) { var d = b.getChannelData(0), n = d.length, i = 0, j = n - 1, th = .012; while (i < n && Math.abs(d[i]) < th) i++; while (j > i && Math.abs(d[j]) < th) j--; i = Math.max(0, i - Math.round(b.sampleRate * .02)); j = Math.min(n - 1, j + Math.round(b.sampleRate * .06)); if (j <= i) return b;
      var o = a.createBuffer(b.numberOfChannels, j - i + 1, b.sampleRate); for (var c = 0; c < b.numberOfChannels; c++) o.getChannelData(c).set(b.getChannelData(c).subarray(i, j + 1)); return o; }
    function one(tx, tries) { if (VO.bufs[st.voice + "|" + tx]) return Promise.resolve(1);
      return fetch(base + "/tts?engine=edge&rate=" + encodeURIComponent("+12%") + "&voice=" + encodeURIComponent(st.voice) + "&key=" + encodeURIComponent(st.key) + "&text=" + encodeURIComponent(tx), { signal: AbortSignal.timeout ? AbortSignal.timeout(45000) : undefined })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); }).then(function (ab) { return a.decodeAudioData(ab); }).then(function (b) { VO.bufs[st.voice + "|" + tx] = trim(b); }, function () { if (tries > 0) return one(tx, tries - 1); fails++; }); }
    var q = texts.slice(); function worker() { var tx = q.shift(); return tx == null ? Promise.resolve() : one(tx, 1).then(worker); }
    VO.busy = Promise.all([worker(), worker(), worker()])
      .then(function () { VO.busy = null; VO.ready = fails < texts.length; if (fails) msg(fails === texts.length ? "⚠️ La voix ne répond pas : vérifie le relais et la clé dans « Voix off »." : "⚠️ " + fails + " phrase(s) de la voix n'ont pas chargé."); return VO.ready; });
    return VO.busy;
  }
  function vPlan(L) { // place les phrases sans qu'elles se chevauchent
    var st = vSet(); if (!st.on || !VO.ready || VO.key !== vKey(L) + st.voice) return [];
    var lines = vScript(L).map(function (l) { var tx = l.text === "__DEAL__" ? vDeal(L) : l.text; return { x: l.x, pri: l.pri, flex: l.flex, buf: VO.bufs[st.voice + "|" + tx] }; }).filter(function (l) { return l.buf; }).sort(function (a, b) { return a.x - b.x; });
    var res = [], end = -1;
    lines.forEach(function (l) { var x = l.x; if (x < end + .05) { if (end + .05 - x <= l.flex) x = end + .05; else if (l.pri < 3) return; else { while (res.length && x < end + .05 - .25 && res[res.length - 1].pri < 3) { res.pop(); end = res.length ? res[res.length - 1].x + res[res.length - 1].buf.duration : -1; } if (x < end + .05) x = end + .05; } } res.push({ x: x, buf: l.buf, pri: l.pri }); end = x + l.buf.duration; });
    return res;
  }
  /* ---------- sons (créés par la page) ---------- */
  var IMP = null;
  function impulse(ac) { if (IMP && IMP.sampleRate === ac.sampleRate) return IMP; var n = Math.floor(ac.sampleRate * 2.6), b = ac.createBuffer(2, n, ac.sampleRate); for (var c = 0; c < 2; c++) { var d = b.getChannelData(c); for (var i = 0; i < n; i++) { var x = i / n; d[i] = (Math.random() * 2 - 1) * Math.pow(1 - x, 2.8) * (i < ac.sampleRate * .012 ? i / (ac.sampleRate * .012) : 1); } } IMP = b; return b; }
  // petits sons de menu sur les boutons de la page
  document.addEventListener("click", function (e) { var b = e.target.closest && e.target.closest("button, label, .mc, [role=tab]"); if (!b || busy) return; try { var a = audio(), o = a.createOscillator(), g2 = a.createGain(); o.type = "triangle"; o.frequency.setValueAtTime(1300, a.currentTime); o.frequency.exponentialRampToValueAtTime(700, a.currentTime + .06); g2.gain.setValueAtTime(.06, a.currentTime); g2.gain.exponentialRampToValueAtTime(.001, a.currentTime + .08); o.connect(g2); g2.connect(a.destination); o.start(); o.stop(a.currentTime + .1); } catch (er) {} }, true);
  function sounds(ac, dest, t0, minX, maxX) {
    var L = S.last; if (!L) return; var tm = TL(L), lo = minX == null ? -1 : minX, hi = maxX == null ? 1e9 : maxX;
    function ok(t) { var x = t - t0; return x >= lo && x < hi; }
    function tone(t, f1, f2, d, v, type) { if (!ok(t)) return; var o = ac.createOscillator(), g = ac.createGain(); o.type = type || "sine"; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + d); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g); g.connect(bus); o.start(t); o.stop(t + d + .02); }
    var nb = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), nd = nb.getChannelData(0); for (var i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    var bus = ac.createGain(), verb = ac.createConvolver(), wet = ac.createGain(), lim = ac.createDynamicsCompressor(); verb.buffer = impulse(ac); wet.gain.value = .28; lim.threshold.value = -9; lim.knee.value = 6; lim.ratio.value = 12; lim.attack.value = .003; lim.release.value = .2; bus.connect(lim); bus.connect(verb); verb.connect(wet); wet.connect(lim); lim.connect(dest);
    function noise(t, d, f, v, type) { if (!ok(t)) return; var s = ac.createBufferSource(), fl = ac.createBiquadFilter(), g = ac.createGain(); s.buffer = nb; fl.type = type || "bandpass"; fl.frequency.value = f; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); s.connect(fl); fl.connect(g); g.connect(bus); s.start(t); s.stop(t + d); }
    var o = t0 + tm.intro;
    if (L.who || L.com) { tone(t0 + .05, 600, 900, .12, .1); tone(t0 + .14, 900, 1300, .14, .08); }
    tone(o + .55, 120, 45, .5, .5); noise(o + .55, .3, 400, .3);
    tone(o + 1.2, 200, 900, 1.7, .04, "sawtooth"); noise(o + 2.9, 1.2, 3000, .3, "highpass"); tone(o + 2.9, 90, 30, 1.2, .7);
    for (var q = 0; q < tm.n; q++) { var ts = o + 3.4 + q * STEP, rk = RAR[L.cards[q].rk].rank; noise(ts, .18, 2500, .25, "highpass"); tone(ts + .05, 500 + rk * 200, 900 + rk * 300, .18, .08); if (rk) tone(ts + .12, 1175 + rk * 100, 1175 + rk * 100, .4, .05, "triangle"); if (L.cards[q].dup) { tone(ts + .35, 1568, 1568, .12, .05, "square"); tone(ts + .45, 2093, 2093, .2, .05, "square"); } }
    tone(t0 + tm.tw, 150, 60, .9, .3, "triangle");
    /* --- son de jeu vidéo : réverbération de stade, foule, aluminium, déchirure, basses, cœur, flammes --- */
    var walkT = tm.walk, rkL = RAR[L.cards[L.cards.length - 1].rk].rank, lastR = L.cards[L.cards.length - 1].rating;
    function grainN(t, d, f, v, q) { if (!ok(t)) return; var s = ac.createBufferSource(), fl = ac.createBiquadFilter(), gg = ac.createGain(); s.buffer = nb; fl.type = "bandpass"; fl.frequency.value = f; fl.Q.value = q || 2; gg.gain.setValueAtTime(v, t); gg.gain.exponentialRampToValueAtTime(.001, t + d); s.connect(fl); fl.connect(gg); gg.connect(bus); s.start(t, Math.random() * 1.5); s.stop(t + d + .02); }
    function sweep(t, d, f1, f2, v, q) { if (!ok(t)) return; var s = ac.createBufferSource(), fl = ac.createBiquadFilter(), gg = ac.createGain(); s.buffer = nb; s.loop = true; fl.type = "bandpass"; fl.Q.value = q || 1.2; fl.frequency.setValueAtTime(f1, t); fl.frequency.exponentialRampToValueAtTime(f2, t + d); gg.gain.setValueAtTime(.001, t); gg.gain.linearRampToValueAtTime(v, t + d * .6); gg.gain.exponentialRampToValueAtTime(.001, t + d); s.connect(fl); fl.connect(gg); gg.connect(bus); s.start(t); s.stop(t + d + .05); }
    function boom(t, v) { if (!ok(t)) return; var o = ac.createOscillator(), gg = ac.createGain(), ws = ac.createWaveShaper(), cu = new Float32Array(256); for (var i = 0; i < 256; i++) { var x = i / 128 - 1; cu[i] = Math.tanh(x * 2.5); } ws.curve = cu;
      o.frequency.setValueAtTime(62, t); o.frequency.exponentialRampToValueAtTime(26, t + 1.6); gg.gain.setValueAtTime(.001, t); gg.gain.linearRampToValueAtTime(v, t + .02); gg.gain.exponentialRampToValueAtTime(.001, t + 2); o.connect(ws); ws.connect(gg); gg.connect(bus); o.start(t); o.stop(t + 2.1); noise(t, .35, 140, v * .6, "lowpass"); }
    // foule du stade : deux bandes de « voix » avec respiration lente, filtre qui s'ouvre en sortant du tunnel
    (function () { var a = t0 + Math.max(0, lo), b = t0 + Math.min(tm.end, hi); if (b <= a + .1) return;
      var s1 = ac.createBufferSource(), s2 = ac.createBufferSource(), f1 = ac.createBiquadFilter(), f2 = ac.createBiquadFilter(), lp = ac.createBiquadFilter(), gg = ac.createGain(), lfo = ac.createOscillator(), lg = ac.createGain();
      s1.buffer = nb; s2.buffer = nb; s1.loop = s2.loop = true; f1.type = f2.type = "bandpass"; f1.frequency.value = 520; f1.Q.value = .8; f2.frequency.value = 1350; f2.Q.value = 1.1; lp.type = "lowpass";
      lfo.frequency.value = .23; lg.gain.value = .012; lfo.connect(lg); lg.connect(gg.gain);
      s1.connect(f1); s2.connect(f2); f1.connect(lp); f2.connect(lp); lp.connect(gg); gg.connect(bus);
      function at(x) { return Math.min(b, Math.max(a, t0 + x)); }
      var lv = .045; gg.gain.setValueAtTime(lv, a); lp.frequency.setValueAtTime(3000, a);
      if (walkT) { lp.frequency.setValueAtTime(3000, at(tm.tun - .4)); lp.frequency.linearRampToValueAtTime(380, at(tm.tun)); gg.gain.linearRampToValueAtTime(.07, at(tm.tun)); lp.frequency.setValueAtTime(380, at(tm.flag - .3)); lp.frequency.exponentialRampToValueAtTime(3200, at(tm.flag - .1)); gg.gain.linearRampToValueAtTime(.14, at(tm.flag)); gg.gain.linearRampToValueAtTime(.2, at(tm.sil)); gg.gain.linearRampToValueAtTime(.3, at(tm.flip - .1)); }
      else { gg.gain.linearRampToValueAtTime(.06, at(tm.tw)); gg.gain.linearRampToValueAtTime(.09, at(tm.flip - .1)); }
      var roar = .12 + .06 * rkL + (lastR >= 90 ? .1 : 0); gg.gain.linearRampToValueAtTime(roar, at(tm.flip + .3)); gg.gain.linearRampToValueAtTime(roar * .9, at(tm.flip + 1.5)); gg.gain.exponentialRampToValueAtTime(.04, at(tm.sum + 2)); gg.gain.linearRampToValueAtTime(.001, b);
      s1.start(a, Math.random()); s2.start(a, Math.random()); lfo.start(a); s1.stop(b); s2.stop(b); lfo.stop(b); })();
    // aluminium froissé pendant que le pack tremble, puis vraie déchirure
    for (var cr3 = 0; cr3 < 70; cr3++) { var ct = o + .6 + Math.random() * 2.25, kk = (ct - o - .6) / 2.25; grainN(ct, .015 + Math.random() * .04, 2200 + Math.random() * 5500, .03 + .12 * kk * Math.random(), 3); }
    if (!TEAR.on) sweep(o + 2.45, .5, 700, 5200, .45, 1.5); if (!TEAR.on) for (var tc = 0; tc < 14; tc++) grainN(o + 2.45 + tc * .032, .03, 3000 + Math.random() * 3000, .16, 4);
    // chaque carte qui arrive : souffle
    for (var wq = 0; wq < tm.n; wq++) sweep(o + 3.35 + wq * STEP, .32, 380, 2200, .13, 1);
    // montée de tension puis grosse basse à la révélation
    var rs = walkT ? t0 + tm.sil : t0 + tm.tw, re = t0 + tm.flip; sweep(rs, re - rs, 200, 4200, .16, .7);
    (function () { if (!ok(rs)) return; var os = ac.createOscillator(), fl = ac.createBiquadFilter(), gg = ac.createGain(); os.type = "sawtooth"; os.frequency.setValueAtTime(55, rs); os.frequency.exponentialRampToValueAtTime(220, re); fl.type = "lowpass"; fl.frequency.setValueAtTime(200, rs); fl.frequency.exponentialRampToValueAtTime(2400, re); gg.gain.setValueAtTime(.001, rs); gg.gain.linearRampToValueAtTime(.07, re - .05); gg.gain.linearRampToValueAtTime(.001, re + .05); os.connect(fl); fl.connect(gg); gg.connect(bus); os.start(rs); os.stop(re + .1); })();
    boom(t0 + tm.flip, .55 + .1 * rkL);
    if (walkT) {
      // battements de cœur et pas du joueur
      for (var hb = 0, ht = tm.sil; ht < tm.flip - .2; hb++) { tone(t0 + ht, 60, 40, .16, .5); tone(t0 + ht + .17, 55, 38, .14, .35); ht += Math.max(.45, .85 - hb * .08); }
      for (var fs = 0; fs < 6; fs++) noise(t0 + tm.sil + .25 + fs * .26, .07, 160, .25, "lowpass");
      // clappements des supporters sur l'écran géant
      var pat = [0, .5, 1, 1.25, 1.5]; for (var cb = tm.flag; cb < tm.sil - .3; cb += 2) pat.forEach(function (d) { if (cb + d < tm.sil - .2) { for (var cl = 0; cl < 5; cl++) grainN(t0 + cb + d + cl * .006, .05, 1400 + cl * 300, .1, 1.2); } });
      // coups de projecteurs à chaque indice
      [tm.flag, tm.club, tm.pos].forEach(function (x) { boom(t0 + x, .35); });
      // jets de flammes
      [tm.sil + .3, tm.sil + 1].forEach(function (x) { sweep(t0 + x, .9, 300, 900, .4, .5); noise(t0 + x, .9, 500, .25, "lowpass"); });
      sweep(t0 + tm.flag - .3, .4, 3000, 300, .25, .8); sweep(t0 + tm.sil - .1, .3, 2500, 400, .2, .8); // coupes de caméra
    }
    if (tm.walk) { for (var li = 0; li < 4; li++) { noise(t0 + tm.tun + .2 + li * .32, .12, 300, .5, "lowpass"); tone(t0 + tm.tun + .2 + li * .32, 110, 55, .3, .4); } tone(t0 + tm.sil, 80, 160, tm.flip - tm.sil, .12, "sawtooth"); noise(t0 + tm.sil, tm.flip - tm.sil, 600, .08); }
    [tm.walk ? tm.flag : tm.club, tm.walk ? tm.club : tm.pos, tm.walk ? tm.pos : tm.note].forEach(function (s, i) { tone(t0 + s, 70, 40, .5, .75); noise(t0 + s, .25, 200, .5, "lowpass"); tone(t0 + s, 330 + i * 110, 330 + i * 110, .5, .06, "triangle"); });
    var lr = L.cards[L.cards.length - 1].rating, fz = t0 + tm.flip + .35;
    if (lr >= 85) [1568, 2093, 2637, 3136].forEach(function (f, i) { tone(fz + .05 + i * .09, f, f, .7, .035, "triangle"); });
    if (lr >= 90) for (var fw = 0; fw < 8; fw++) { var lt = fz + .15 + fw * .32; tone(lt, 500, 1500, .4, .025); noise(lt + .45, .5, 180, .55, "lowpass"); tone(lt + .45, 70, 35, .5, .45); for (var cr2 = 0; cr2 < 5; cr2++) noise(lt + .7 + cr2 * .09, .05, 4000, .12, "highpass"); }
    tone(t0 + tm.flip, 400, 1600, .3, .1); [0, .12, .24].forEach(function (d, i) { tone(t0 + tm.flip + .35 + d, [784, 988, 1175][i], [784, 988, 1175][i], .6, .08, "triangle"); });
    var cr = ac.createBufferSource(), cf = ac.createBiquadFilter(), cg = ac.createGain(); cr.buffer = nb; cr.loop = true; cf.type = "bandpass"; cf.frequency.value = 900; cf.Q.value = .5; var cs = t0 + Math.max(tm.flip, lo), ce = t0 + Math.min(tm.sum + 1.6, hi);
    if (ce > cs + .1) { cg.gain.setValueAtTime(.001, cs); cg.gain.linearRampToValueAtTime(.3, cs + .5); cg.gain.linearRampToValueAtTime(.001, ce - .1); cr.connect(cf); cf.connect(cg); cg.connect(bus); cr.start(cs); cr.stop(ce); }
    for (var cn = 0; cn < 8; cn++) tone(t0 + tm.sum + 1 + cn * .07, 1800 + cn * 80, 2400, .1, .04, "square");
    var lc = L.cards[L.cards.length - 1], ds = t0 + tm.flip + 2.5;
    if (lc.sale) { tone(ds, 90, 40, .3, .5); for (var cs = 0; cs < 10; cs++) tone(ds + .1 + cs * .06, 1900 + cs * 90, 2600, .1, .05, "square"); }
    else if (lc.keep) { tone(ds, 90, 40, .3, .5); noise(ds, .08, 2500, .3, "highpass"); tone(ds + .08, 660, 660, .12, .08, "square"); }
    else { tone(ds, 392, 392, .2, .06, "triangle"); tone(ds + .22, 494, 494, .3, .06, "triangle"); }
    tone(t0 + tm.sum + 2.9, 523, 523, .25, .07, "triangle"); tone(t0 + tm.sum + 3.1, 784, 784, .45, .07, "triangle");
    vPlan(L).forEach(function (l) { var at = t0 + l.x; if (!ok(at)) return; var s3 = ac.createBufferSource(), vg = ac.createGain(), vs = ac.createGain(); s3.buffer = l.buf; vg.gain.value = 1.6; vs.gain.value = .12; s3.connect(vg); vg.connect(lim); vg.connect(vs); vs.connect(verb); s3.start(at);
      bus.gain.setTargetAtTime(.38, Math.max(0, at - .05), .04); bus.gain.setTargetAtTime(1, at + l.buf.duration, .2); });
  }

  /* ---------- aperçu, lecture, vidéo ---------- */
  var cv = $("#view"), g = cv.getContext("2d"), t0 = performance.now(), busy = false, ac = null, prevGain = null;
  function msg(t) { $("#msg").textContent = t; }
  function audio() { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume(); return ac; }
  function total() { return S && S.last ? TL(S.last).end : 4; }
  var waiting = false, onChoice = null;
  (function loop(now) { if (!busy) { var t = (now - t0) / 1000, D = decT(); if (t > total() + 1.5) { t0 = now; t = 0; pressed = decided(); }
      var TH = tearT(); if (tearPending() && t >= TH) { t = TH; t0 = now - TH * 1000; if (!TEAR.hold) { TEAR.hold = true; TEAR.p = 0; TEAR.out = prevGain; cv.style.touchAction = "none"; try { cv.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {} TEAR.onDone = function () { t0 = performance.now() - TH * 1000; if (soundOn && prevGain) { var a = audio(); sounds(a, prevGain, a.currentTime - TH, TH, pending() ? decT() : null); } }; msg("👉 Glisse ton doigt sur le haut du pack pour le déchirer"); } }
      else if (pending() && t >= D) { t = D; t0 = now - D * 1000; if (!waiting) { waiting = true; msg("👆 Touche VENDRE ou GARDER sur la vidéo"); } }
      drawScene(g, Math.min(t, total())); } requestAnimationFrame(loop); })(performance.now());
  var soundOn = false;
  function tearT() { return S && S.last ? TL(S.last).intro + 2.45 : 1e9; }
  function tearPending() { return !!(S && S.last && TEAR.on && !TEAR.done); }
  function nextHold(from) { var th = tearT(); if (tearPending() && th >= (from || 0)) return th; return pending() ? decT() : null; }
  function tearSound(k) { var a = ac, out = TEAR.out; if (!a || !out) return; try { var n = Math.max(1, Math.round(k * 6)); for (var i = 0; i < n; i++) { var s2 = a.createBufferSource(), b = a.createBuffer(1, 2048, a.sampleRate), d = b.getChannelData(0); for (var j = 0; j < d.length; j++) d[j] = Math.random() * 2 - 1; s2.buffer = b; var f = a.createBiquadFilter(), g2 = a.createGain(), at = a.currentTime + i * .012; f.type = "bandpass"; f.frequency.value = 1800 + Math.random() * 4500; f.Q.value = 3; g2.gain.setValueAtTime(.25, at); g2.gain.exponentialRampToValueAtTime(.001, at + .04); s2.connect(f); f.connect(g2); g2.connect(out); s2.start(at); s2.stop(at + .05); } } catch (e) {} }
  function tearDone() { TEAR.done = true; TEAR.hold = false; TEAR.drag = false; cv.style.touchAction = ""; msg(""); if (TEAR.onDone) TEAR.onDone(); }
  function cvXY(e) { var r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * W, (e.clientY - r.top) / r.height * H]; }
  cv.addEventListener("pointerdown", function (e) { if (!TEAR.hold) return; var p = cvXY(e); TEAR.drag = true; TEAR.lx = p[0]; TEAR.fx = p[0]; TEAR.fy = p[1]; try { cv.setPointerCapture(e.pointerId); } catch (er) {} e.preventDefault(); });
  cv.addEventListener("pointermove", function (e) { if (!TEAR.hold || !TEAR.drag) return; var p = cvXY(e), dx = p[0] - TEAR.lx; TEAR.lx = p[0]; TEAR.fx = p[0]; TEAR.fy = p[1]; if (dx > 0) { TEAR.p += dx / 500; tearSound(Math.min(1, dx / 40)); } e.preventDefault(); if (TEAR.p >= 1) tearDone(); });
  function tearUp() { if (!TEAR.drag) return; TEAR.drag = false; if (TEAR.hold && TEAR.p > .5) { var p0 = TEAR.p, st = performance.now(); (function fin() { TEAR.p = p0 + (1 - p0) * Math.min(1, (performance.now() - st) / 180); if (TEAR.p >= 1) tearDone(); else requestAnimationFrame(fin); })(); } }
  cv.addEventListener("pointerup", tearUp); cv.addEventListener("pointercancel", tearUp);
  function playNow() { if (!S.last) return; var a = audio(); if (prevGain) try { prevGain.disconnect(); } catch (e) {} prevGain = a.createGain(); prevGain.connect(a.destination); t0 = performance.now(); pressed = decided(); waiting = false; soundOn = true; TEAR.done = false; TEAR.hold = false; TEAR.p = 0; sounds(a, prevGain, a.currentTime, null, nextHold()); }
  function choose(which) { // choix fait en touchant la vidéo
    var L = S.last; if (!L || !pending()) return; var D = decT(); pressed = which; fromVideo = true; deal(L.cards.length - 1, which); fromVideo = false; waiting = false; msg(which === "sell" ? "💸 Vendue !" : "🔒 Gardée !");
    if (onChoice) onChoice(); else { t0 = performance.now() - D * 1000; if (soundOn && prevGain) { var a = audio(); sounds(a, prevGain, a.currentTime - D, D, null); } }
  }
  cv.addEventListener("pointerdown", function (e) { if (!pending()) return; var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * H;
    Object.keys(BTN).forEach(function (k) { var b = BTN[k]; if (x >= b[0] && x <= b[0] + b[2] && y >= b[1] - 20 && y <= b[1] + b[3] + 20) { e.preventDefault(); choose(k); } }); });
  $("#play").onclick = function () { if (vSet().on && !VO.ready && S.last) { msg("🎙️ Préparation de la voix…"); Promise.race([prepVoice(S.last), new Promise(function (r) { setTimeout(r, 15000); })]).then(function () { msg(""); playNow(); }); } else playNow(); };
  var lastURL = null, lastFile = null;
  function download(blob, name) {
    if (lastURL) URL.revokeObjectURL(lastURL); lastURL = URL.createObjectURL(blob);
    try { lastFile = new File([blob], name, { type: blob.type }); } catch (e) { lastFile = null; }
    var a = document.createElement("a"); a.href = lastURL; a.download = name; document.body.appendChild(a); try { a.click(); } catch (e) {} a.remove();
    toast("🎬", "Vidéo prête !", name, "good"); var mo = blob.size / 1048576; $("#gotName").textContent = "✅ " + name + " · " + (mo >= 1 ? mo.toFixed(1) + " Mo" : Math.max(1, Math.round(blob.size / 1024)) + " Ko");
    $("#gotDl").href = lastURL; $("#gotDl").setAttribute("download", name);
    var can = false; try { can = !!(lastFile && navigator.canShare && navigator.canShare({ files: [lastFile] })); } catch (e) {} $("#gotShare").hidden = !can; $("#got").hidden = false;
  }
  $("#gotShare").onclick = function () { if (lastFile) navigator.share({ files: [lastFile] }).catch(function () {}); };
  $("#rec").onclick = async function () {
    if (busy) return; if (!S.last) { msg("Ouvre d'abord un pack."); return; }
    if (vSet().on && !VO.ready) { msg("🎙️ Préparation de la voix…"); await Promise.race([prepVoice(S.last), new Promise(function (r) { setTimeout(r, 20000); })]); }
    if (!pending() && !window.__noHQ) { var sup = null; try { sup = await hqSupport(); } catch (e) {} if (sup) { busy = true; $("#rec").disabled = true; $("#bar").hidden = false; msg("🎬 Préparation de la vidéo HD…");
      try { var blob = await exportHQ(sup); download(blob, "pack-episode-" + S.last.epi + "-hd.mp4"); msg("Vidéo HD 60 images/s téléchargée ✅"); }
      catch (e) { console.error(e); window.__noHQ = true; msg("⚠️ La vidéo HD n'a pas marché sur ce téléphone : touche encore « Télécharger la vidéo » pour la version normale."); busy = false; $("#rec").disabled = false; $("#bar").hidden = true; t0 = performance.now(); return; }
      busy = false; $("#rec").disabled = false; $("#bar").hidden = true; t0 = performance.now(); return; } }
    if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) { msg("Ce navigateur ne sait pas créer de vidéo. Utilise Chrome."); return; }
    if (prevGain) try { prevGain.disconnect(); } catch (e) {}
    var a = audio(), dest = a.createMediaStreamDestination(), st = cv.captureStream(30); dest.stream.getAudioTracks().forEach(function (tr) { st.addTrack(tr); });
    var type = ["video/mp4;codecs=avc1.42E01E,mp4a.40.2", "video/mp4;codecs=avc1,mp4a.40.2", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm"].filter(function (x) { return MediaRecorder.isTypeSupported(x); })[0] || "", rec, ch = [], end = total();
    try { rec = new MediaRecorder(st, type ? { mimeType: type, videoBitsPerSecond: 9e6 } : {}); } catch (e) { msg("Impossible de démarrer l'enregistrement."); return; }
    rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); }; var chunks = ch;
    busy = true; $("#rec").disabled = true; $("#bar").hidden = false; msg("Création de la vidéo (" + Math.round(end) + " s)… garde la page ouverte.");
    var inter = pending(), D = decT(), TH = tearT(); pressed = decided(); TEAR.done = false; TEAR.hold = false; TEAR.p = 0; sounds(a, dest, a.currentTime + .2, null, nextHold()); var s0 = performance.now() + 200; rec.start(500);
    onChoice = function () { s0 = performance.now() - D * 1000; try { rec.resume(); } catch (e) {} sounds(a, dest, a.currentTime - D, D, null); msg("Création de la vidéo… garde la page ouverte."); };
    (function fr() { var t = Math.max(0, (performance.now() - s0) / 1000);
      if (tearPending() && t >= TH) { t = TH; s0 = performance.now() - TH * 1000; if (!TEAR.hold) { TEAR.hold = true; TEAR.p = 0; TEAR.out = dest; cv.style.touchAction = "none"; try { cv.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) {} TEAR.onDone = function () { s0 = performance.now() - TH * 1000; sounds(a, dest, a.currentTime - TH, TH, inter ? D : null); msg("Création de la vidéo… garde la page ouverte."); }; msg("👉 Glisse ton doigt sur le haut du pack pour le déchirer (c'est filmé !)"); } }
      else if (pending() && t >= D) { t = D; if (rec.state === "recording") { drawScene(g, D); try { rec.pause(); } catch (e) {} msg("⏸️ Vidéo en pause : touche VENDRE ou GARDER sur la vidéo"); } s0 = performance.now() - D * 1000; }
      drawScene(g, Math.min(t, end)); $("#barI").style.width = Math.round(Math.min(1, t / end) * 100) + "%";
      if (t >= end) { rec.onstop = function () { var ext = /mp4/.test(rec.mimeType || type) ? "mp4" : "webm"; download(new Blob(ch, { type: rec.mimeType || type || "video/webm" }), "pack-episode-" + S.last.epi + "." + ext); msg(ext === "mp4" ? "Vidéo téléchargée ✅" : "Vidéo téléchargée ✅ (format WEBM) : si ta galerie ne la voit pas, ouvre-la dans CapCut et réexporte-la."); busy = false; onChoice = null; $("#rec").disabled = false; $("#bar").hidden = true; t0 = performance.now(); }; try { rec.stop(); } catch (e) { rec.onstop(); } return; }
      requestAnimationFrame(fr); })();
  };

  /* ---------- légende ---------- */
  function makeCap() {
    var L = S.last, tg = ACC === "psg" ? "#psg #teampsg" : "#om #teamom";
    if (!L) { $("#cap").value = "Épisode 1 : j'ouvre mon premier pack de cartes Ligue 1 🃏 Vous choisissez le prochain en commentaire 👇\n\n#packopening #ligue1 " + tg + " #foot #fyp #pourtoi"; return; }
    var best = L.cards[L.cards.length - 1];
    $("#cap").value = "Épisode " + L.epi + " : j'ouvre le " + packName(L).toLowerCase() + (L.who ? " choisi par " + L.who.replace(/^@?/, "@") : "") + " 🃏 " + best.name + " en " + RAR[best.rk].label.toLowerCase() + " 🔥 " + (best.sale ? "Vendue " + fmt(best.sale) + " 🪙 💸 " : best.keep ? "Je la garde 🔒 " : "Je la garde ou je la vends ? ") + "Album : " + L.album[0] + "/" + L.album[1] + ". Quel pack ensuite ? 👇\n\n#packopening #ligue1 " + tg + " #foot #fyp #pourtoi";
  }
  $("#capCopy").onclick = function () { var c = $("#cap"); c.select(); var ok = false; try { if (navigator.clipboard) { navigator.clipboard.writeText(c.value); ok = true; } } catch (e) {} if (!ok) try { document.execCommand("copy"); } catch (e) {} msg("Légende copiée ✅"); };

  /* ---------- événements ---------- */
  $("#open").onclick = openPack;
  try { $("#inter").checked = localStorage.getItem("packs-inter") !== "0"; } catch (e) {}
  (function () { var st = vSet(); $("#vOn").checked = st.on; $("#vVoice").value = st.voice; $("#vRelay").value = st.relay; $("#vKey").value = st.key;
    function sv() { try { localStorage.setItem("packs-voice", JSON.stringify({ on: $("#vOn").checked, voice: $("#vVoice").value, relay: $("#vRelay").value.trim(), key: $("#vKey").value.trim() })); } catch (e) {} VO.ready = false; VO.key = ""; }
    ["#vOn", "#vVoice", "#vRelay", "#vKey"].forEach(function (q) { $(q).onchange = sv; });
    $("#vTest").onclick = function () { sv(); var st2 = vSet(), base = st2.relay.replace(/\/+$/, ""); if (!/^[a-z]+:\/\//i.test(base)) base = "https://" + base; msg("🎙️ Test de la voix…"); fetch(base + "/tts?engine=edge&rate=" + encodeURIComponent("+12%") + "&voice=" + encodeURIComponent(st2.voice) + "&key=" + encodeURIComponent(st2.key) + "&text=" + encodeURIComponent("Et c'est une icône ! Incroyable !")).then(function (r) { if (!r.ok) return r.json().then(function (j) { throw new Error(j.error || r.status); }, function () { throw new Error("erreur " + r.status); }); return r.arrayBuffer(); }).then(function (ab) { return audio().decodeAudioData(ab); }).then(function (b) { var a = audio(), s4 = a.createBufferSource(); s4.buffer = b; s4.connect(a.destination); s4.start(); msg("✅ La voix marche"); }).catch(function (e) { msg("⚠️ La voix ne marche pas : " + e.message); }); };
  })();
  try { TEAR.on = localStorage.getItem("packs-tear") !== "0"; } catch (e) {} $("#tearOn").checked = TEAR.on;
  $("#tearOn").onchange = function () { TEAR.on = this.checked; try { localStorage.setItem("packs-tear", this.checked ? "1" : "0"); } catch (e) {} if (!TEAR.on && TEAR.hold) tearDone(); };
  $("#inter").onchange = function () { try { localStorage.setItem("packs-inter", this.checked ? "1" : "0"); } catch (e) {} pressed = decided(); };
  $("#acc").onchange = function () { ACC = this.value; try { localStorage.setItem("packs-acc", ACC); } catch (e) {} load(); tab = null; fillClubs(); refresh(); showResult(); makeCap(); t0 = performance.now(); };
  $("#exp").onclick = function () { var b = new Blob([JSON.stringify({ acc: ACC, save: S }, null, 1)], { type: "application/json" }), u = URL.createObjectURL(b), a = document.createElement("a"); a.href = u; a.download = "collection-" + ACC + ".json"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 4000); };
  $("#imp").onchange = function () { var f = this.files && this.files[0]; if (!f) return; f.text().then(function (txt) { var j = JSON.parse(txt), s2 = j.save || j; if (!s2 || !s2.cards) throw new Error("fichier"); if (!confirm("Remplacer la collection " + (ACC === "psg" ? "Team PSG" : "Team OM") + " par ce fichier ?")) return; S = s2; save(); refresh(); showResult(); makeCap(); msg("Collection restaurée ✅"); }).catch(function () { msg("⚠️ Ce fichier n'est pas une copie de secours valide."); }); this.value = ""; };
  $("#reset").onclick = function () { if (!confirm("Effacer toute la collection " + (ACC === "psg" ? "Team PSG" : "Team OM") + " ? Les pièces et l'album repartent à zéro.")) return; S = fresh(); save(); refresh(); showResult(); makeCap(); };
  $("#dbSave").onclick = function () { try { localStorage.setItem("packs-db", $("#db").value); } catch (e) {} loadDb(); fillClubs(); refresh(); logosForm(); msg("Liste des joueurs enregistrée ✅ (" + PLAYERS.length + " joueurs)"); };
  $("#dbReset").onclick = function () { if (!confirm("Revenir à la liste d'origine (500 joueurs) ?")) return; try { localStorage.removeItem("packs-db"); } catch (e) {} loadDb(); fillClubs(); refresh(); logosForm(); };

  $("#ppFile").onchange = function () { var f = this.files && this.files[0], k = photoFor; this.value = ""; if (!f || !k) return; var im = new Image(); im.onload = function () { var r = Math.min(1, 640 / im.height), c2 = document.createElement("canvas"); c2.width = Math.round(im.width * r); c2.height = Math.round(im.height * r); c2.getContext("2d").drawImage(im, 0, 0, c2.width, c2.height); var png = /png|webp/.test(f.type), url = c2.toDataURL(png ? "image/png" : "image/jpeg", .85); URL.revokeObjectURL(im.src); idbPut(k, url).then(function () { var i2 = new Image(); i2.onload = function () { photos[k] = i2; refresh(); msg("📷 Photo ajoutée : " + k.split("|")[0]); }; i2.src = url; }, function () { msg("⚠️ Impossible d'enregistrer la photo sur ce téléphone."); }); }; im.src = URL.createObjectURL(f); };
  idbAll();
  (function () { var tt = $("#title"); if (!tt) return; var seen = false; try { seen = sessionStorage.getItem("packs-title") === "1"; } catch (e) {} if (seen) return; tt.hidden = false;
    function go() { if (tt.classList.contains("out")) return; try { sessionStorage.setItem("packs-title", "1"); } catch (e) {} try { var a = audio(), t = a.currentTime; [523, 659, 784, 1047].forEach(function (f, i) { var o = a.createOscillator(), g2 = a.createGain(); o.type = "triangle"; o.frequency.value = f; g2.gain.setValueAtTime(.0001, t + i * .06); g2.gain.exponentialRampToValueAtTime(.08, t + i * .06 + .02); g2.gain.exponentialRampToValueAtTime(.0001, t + i * .06 + .5); o.connect(g2); g2.connect(a.destination); o.start(t + i * .06); o.stop(t + i * .06 + .6); }); } catch (e) {}
      tt.classList.add("out"); setTimeout(function () { tt.hidden = true; }, 650); }
    tt.addEventListener("click", go); document.addEventListener("keydown", function (e) { if (!tt.hidden && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); go(); } }); })();
  loadDb(); load(); fillClubs(); ["L1"].concat(Object.keys(CLUBS)).forEach(loadLogo); logosForm(); refresh(); showResult(); makeCap();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { t0 = performance.now(); });
  window.__packs = { tear: function () { return TEAR; }, setPhoto: function (k, url) { var i3 = new Image(); i3.onload = function () { photos[k] = i3; }; i3.src = url; }, drawScene: drawScene, tl: function () { return S.last ? TL(S.last) : null; }, state: function () { return S; }, open: openPack };
})();
