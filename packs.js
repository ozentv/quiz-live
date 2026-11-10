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
    if (!useFree && S.coins < P.price) { msg("Pas assez de pièces : il te faut " + fmt(P.price) + " 🪙."); return; }
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
    save(); refresh(); showResult(); makeCap(); playNow();
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
    L.coins = S.coins; L.album = [albumCount(), PLAYERS.length]; save(); refresh(); showResult(); makeCap(); if (!fromVideo) { pressed = null; t0 = performance.now() - (TL(L).flip + .8) * 1000; }
  }
  var fromVideo = false;
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;" }[c]; }); }

  /* ---------- formulaire, album ---------- */
  var tab = null;
  function refresh() {
    $("#acc").value = ACC; $("#epi").value = String(S.epi + 1);
    $("#wCoins").textContent = fmt(S.coins); $("#wFree").textContent = String(S.free);
    var have = albumCount(); $("#wAlbum").textContent = have + "/" + PLAYERS.length; $("#progI").style.width = (PLAYERS.length ? have / PLAYERS.length * 100 : 0) + "%";
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
    g.save(); g.shadowColor = "rgba(" + R.beam + ",.6)"; g.shadowBlur = 60; cardPath(g, w, h);
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
    if (R.rank >= 2) holo(g, w, h, tt + pxo / 120, R);
    if (shine != null) { var sx = -w + shine * w * 2.2, sg = g.createLinearGradient(sx - 120, 0, sx + 120, 0); sg.addColorStop(0, "rgba(255,255,255,0)"); sg.addColorStop(.5, "rgba(255,255,255,.5)"); sg.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = sg; g.save(); g.rotate(-.35); g.fillRect(-w, -h, w * 2, h * 2); g.restore(); }
    g.restore();
    g.save(); cardPath(g, w, h); g.lineWidth = 8; g.strokeStyle = R.edge || "rgba(255,255,255,.7)"; g.stroke();
    if (R.rank >= 2 && g.createConicGradient) { var cg2 = g.createConicGradient(tt * 1.6, 0, 0); ["#ff5f6d", "#ffc371", "#f5d77a", "#7cf7d4", "#5ec8ff", "#c48bff", "#ff5f6d"].forEach(function (col, i, a) { cg2.addColorStop(i / (a.length - 1), col); }); g.lineWidth = 10; g.globalAlpha = .85; g.strokeStyle = cg2; g.stroke(); }
    g.restore();
    if (R.rank >= 2) sparkles(g, w, h, tt);
  }
  // carte en 3D : dessinée hors écran puis affichée en bandes verticales avec perspective
  var oc = null, ocg = null, OW = 760, OH = 1040;
  function card3d(g, p, ang, shine, sp, t) {
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

  /* timeline de la vidéo (calculée depuis le dernier pack ouvert) */
  var STEP = 1.35;
  function isWalk(L) { return L && RAR[L.cards[L.cards.length - 1].rk].rank >= 2; }
  function TL(L) { var intro = L && (L.who || L.com) ? 3.4 : .4, n = (L ? L.cards.length : 5) - 1, tw = intro + 3.4 + n * STEP + .2, o;
    if (isWalk(L)) o = { walk: true, tun: tw + 1, flag: tw + 2.5, club: tw + 3.5, pos: tw + 4.4, sil: tw + 5.3, flip: tw + 7.1 };
    else o = { walk: false, club: tw + 1, pos: tw + 1.9, note: tw + 2.8, flip: tw + 3.8 };
    o.intro = intro; o.n = n; o.tw = tw; o.sum = o.flip + 4.8; o.end = o.sum + 6; return o; }
  function slot(i, n) { var row = Math.floor(i / 4), inRow = Math.min(4, n - row * 4); return [W / 2 + ((i % 4) - (inRow - 1) / 2) * 240, 330 + row * 300]; }
  function packName(L) { var P = packOf(L.pack); return P.id === "club" ? "PACK " + (L.club || "").toUpperCase() : P.label.toUpperCase(); }
  function drawScene(g, t) {
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
      g.save(); g.translate(W / 2 + shake, -600 + 1560 * drop); g.rotate(shake * .002); g.shadowColor = "rgba(" + bestR.beam + "," + (.3 + .7 * glow) + ")"; g.shadowBlur = 40 + 120 * glow;
      var pg = g.createLinearGradient(-260, -380, 260, 380); pg.addColorStop(0, c0.c1); pg.addColorStop(.55, c0.dark); pg.addColorStop(1, c0.c2); g.fillStyle = pg; rr(g, -260, -380, 520, 760, 40); g.fill(); g.shadowBlur = 0;
      g.save(); rr(g, -260, -380, 520, 760, 40); g.clip(); g.globalAlpha = .16; g.fillStyle = "#fff"; for (var s = -8; s < 8; s++) g.fillRect(s * 80 + ((t * 120) % 80), -400, 26, 800); g.globalAlpha = 1;
      var fs = (t * .8) % 1, fsg = g.createLinearGradient(-400 + fs * 900, 0, -200 + fs * 900, 0); fsg.addColorStop(0, "rgba(255,255,255,0)"); fsg.addColorStop(.5, "rgba(255,255,255,.45)"); fsg.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = fsg; g.fillRect(-260, -380, 520, 760); g.restore();
      badge(g, 0, -60, 130, pc); g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; var pn = packName(L); g.font = "900 56px " + FONT; var pf = 56; while (g.measureText(pn).width > 470 && pf > 30) { pf -= 4; g.font = "900 " + pf + "px " + FONT; } g.fillText(pn, 0, 200); g.font = "700 34px " + FONT; g.fillText(L.cards.length + " CARTES", 0, 260);
      g.restore();
      if (T > 1.3 && T < 2.9) bigText(g, "👆 Appuie pour ouvrir", 1640, 54, .6 + .4 * Math.sin(t * 6), 1);
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
    steps.forEach(function (s2, i, arr) { var d2 = t - s2[0], nx = arr[i + 1] ? arr[i + 1][0] : (tm.walk ? tm.sil : tm.flip - .1); if (d2 < 0 || t > nx + .15) return; var a2 = Math.min(1, d2 / .15) * (t > nx ? 1 - (t - nx) / .15 : 1), sc2 = .4 + .6 * back(d2 / .35);
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
    // 4. le bilan : nouvelles, doublons, pièces, album
    if (sumK > 0) summary(g, t, L, tm, sumK);
    g.fillStyle = "rgba(0,0,0,.45)"; rr(g, 200, 60, 680, 90, 45); g.fill(); g.fillStyle = "#fff"; g.textAlign = "center"; g.textBaseline = "middle"; g.font = "900 42px " + FONT; g.fillText("🃏 ÉPISODE " + L.epi + " · ALBUM LIGUE 1", W / 2, 106);
  }
  function tunnel(g, t, tm, last, R) { // walkout : tunnel, fumée, projecteurs, silhouette qui arrive
    var a = clamp((t - tm.tun + .4) / .4) * (t > tm.flip + .2 ? 1 - (t - tm.flip - .2) / .4 : 1); if (a <= 0) return;
    g.save(); g.globalAlpha = a; g.fillStyle = "#020306"; g.fillRect(0, 0, W, H);
    var vx = W / 2, vy = 820; // point de fuite
    g.fillStyle = "#0b0f18"; g.beginPath(); g.moveTo(0, H); g.lineTo(vx - 150, vy + 120); g.lineTo(vx + 150, vy + 120); g.lineTo(W, H); g.closePath(); g.fill(); // sol
    g.fillStyle = "#070a12"; g.beginPath(); g.moveTo(0, 0); g.lineTo(vx - 150, vy - 260); g.lineTo(vx - 150, vy + 120); g.lineTo(0, H); g.closePath(); g.fill(); g.beginPath(); g.moveTo(W, 0); g.lineTo(vx + 150, vy - 260); g.lineTo(vx + 150, vy + 120); g.lineTo(W, H); g.closePath(); g.fill();
    var door = g.createRadialGradient(vx, vy - 60, 10, vx, vy - 60, 260); door.addColorStop(0, "rgba(" + R.beam + "," + (.25 + .5 * clamp((t - tm.sil) / 1)) + ")"); door.addColorStop(1, "rgba(" + R.beam + ",0)"); g.fillStyle = door; g.fillRect(vx - 300, vy - 400, 600, 600);
    g.fillStyle = "rgba(" + R.beam + ",.35)"; g.fillRect(vx - 150, vy - 260, 300, 380);
    for (var i = 0; i < 4; i++) { var on = t >= tm.tun + .2 + i * .32, k = (i + 1) / 5, lx = vx + (i % 2 ? 1 : -1) * (150 + (W / 2 - 150) * (1 - k)), ly = (vy - 260) * (1 - k) + 40 * k; if (!on) continue; // projecteurs qui s'allument un par un
      var fl = clamp((t - tm.tun - .2 - i * .32) / .15), lg = g.createRadialGradient(lx, ly, 2, lx, ly, 160 * (1 - k * .5)); lg.addColorStop(0, "rgba(255,255,255," + fl + ")"); lg.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = lg; g.fillRect(lx - 200, ly - 200, 400, 400);
      g.save(); g.globalCompositeOperation = "lighter"; var cg = g.createLinearGradient(lx, ly, vx, H); cg.addColorStop(0, "rgba(255,255,255," + (.18 * fl) + ")"); cg.addColorStop(1, "rgba(255,255,255,0)"); g.fillStyle = cg; g.beginPath(); g.moveTo(lx - 10, ly); g.lineTo(lx + 10, ly); g.lineTo(vx + (i % 2 ? 260 : -100), H); g.lineTo(vx + (i % 2 ? 100 : -260), H); g.closePath(); g.fill(); g.restore(); }
    for (var s = 0; s < 9; s++) { var sx = ((s * 211 + t * 40 * (s % 2 ? 1 : -1)) % (W + 400)) - 200, sy = 1300 + (s % 3) * 160 + Math.sin(t + s) * 30, sm = g.createRadialGradient(sx, sy, 10, sx, sy, 320); sm.addColorStop(0, "rgba(200,210,230,.16)"); sm.addColorStop(1, "rgba(200,210,230,0)"); g.fillStyle = sm; g.fillRect(sx - 320, sy - 320, 640, 640); } // fumée
    if (t >= tm.sil) { // la silhouette avance vers la caméra
      var p = clamp((t - tm.sil) / (tm.flip - tm.sil - .2)), e = p * p, sc = .22 + .95 * e, cy = vy + 60 + 560 * e, ph = photos[pkey(last)];
      g.save(); g.translate(vx + Math.sin(t * 5) * 6 * (1 - e), cy); g.scale(sc, sc);
      g.shadowColor = "rgba(" + R.beam + ",.95)"; g.shadowBlur = 50;
      if (ph && "filter" in g) { var hh = 900, ww = hh * ph.width / ph.height; g.filter = "brightness(0)"; g.drawImage(ph, -ww / 2, -hh, ww, hh); g.filter = "none"; }
      else { g.fillStyle = "#000"; g.beginPath(); g.arc(0, -760, 95, 0, Math.PI * 2); g.fill(); g.beginPath(); g.moveTo(-230, -560); g.quadraticCurveTo(0, -660, 230, -560); g.lineTo(260, -160); g.lineTo(150, -150); g.lineTo(120, 0); g.lineTo(30, 0); g.lineTo(0, -300); g.lineTo(-30, 0); g.lineTo(-120, 0); g.lineTo(-150, -150); g.lineTo(-260, -160); g.closePath(); g.fill(); }
      g.restore();
      bigText(g, String(last.rating), 330, 170, clamp((t - tm.sil - .6) / .3), 1, "#f5d77a");
    }
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
    g.save(); g.translate(W / 2, 900 + Math.sin(t * 2) * 14); g.rotate(Math.sin(t) * .04); var pg = g.createLinearGradient(-260, -380, 260, 380); pg.addColorStop(0, L1.c1); pg.addColorStop(.55, L1.dark); pg.addColorStop(1, L1.c2); g.shadowColor = "rgba(255,210,80,.6)"; g.shadowBlur = 80; g.fillStyle = pg; rr(g, -260, -380, 520, 760, 40); g.fill(); g.shadowBlur = 0; badge(g, 0, -60, 130, "L1"); g.fillStyle = "#fff"; g.font = "900 56px " + FONT; g.textAlign = "center"; g.fillText("TON 1er PACK", 0, 200); g.restore();
    bigText(g, "Choisis un pack et ouvre-le 👈", 1560, 54, 1, 1);
  }

  /* ---------- sons (créés par la page) ---------- */
  function sounds(ac, dest, t0, minX, maxX) {
    var L = S.last; if (!L) return; var tm = TL(L), lo = minX == null ? -1 : minX, hi = maxX == null ? 1e9 : maxX;
    function ok(t) { var x = t - t0; return x >= lo && x < hi; }
    function tone(t, f1, f2, d, v, type) { if (!ok(t)) return; var o = ac.createOscillator(), g = ac.createGain(); o.type = type || "sine"; o.frequency.setValueAtTime(f1, t); o.frequency.exponentialRampToValueAtTime(f2, t + d); g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g); g.connect(dest); o.start(t); o.stop(t + d + .02); }
    var nb = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), nd = nb.getChannelData(0); for (var i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
    function noise(t, d, f, v, type) { if (!ok(t)) return; var s = ac.createBufferSource(), fl = ac.createBiquadFilter(), g = ac.createGain(); s.buffer = nb; fl.type = type || "bandpass"; fl.frequency.value = f; g.gain.setValueAtTime(v, t); g.gain.exponentialRampToValueAtTime(.001, t + d); s.connect(fl); fl.connect(g); g.connect(dest); s.start(t); s.stop(t + d); }
    var o = t0 + tm.intro;
    if (L.who || L.com) { tone(t0 + .05, 600, 900, .12, .1); tone(t0 + .14, 900, 1300, .14, .08); }
    tone(o + .55, 120, 45, .5, .5); noise(o + .55, .3, 400, .3);
    for (var k = 0; k < 16; k++) noise(o + 1.25 + k * .1, .06, 1500 + k * 120, .05 + k * .01);
    tone(o + 1.2, 200, 900, 1.7, .06, "sawtooth"); noise(o + 2.9, 1.2, 3000, .5, "highpass"); tone(o + 2.9, 90, 30, 1.2, .7);
    for (var q = 0; q < tm.n; q++) { var ts = o + 3.4 + q * STEP, rk = RAR[L.cards[q].rk].rank; noise(ts, .18, 2500, .25, "highpass"); tone(ts + .05, 500 + rk * 200, 900 + rk * 300, .18, .08); if (rk) tone(ts + .12, 1175 + rk * 100, 1175 + rk * 100, .4, .05, "triangle"); if (L.cards[q].dup) { tone(ts + .35, 1568, 1568, .12, .05, "square"); tone(ts + .45, 2093, 2093, .2, .05, "square"); } }
    tone(t0 + tm.tw, 150, 60, .9, .3, "triangle");
    if (tm.walk) { for (var li = 0; li < 4; li++) { noise(t0 + tm.tun + .2 + li * .32, .12, 300, .5, "lowpass"); tone(t0 + tm.tun + .2 + li * .32, 110, 55, .3, .4); } tone(t0 + tm.sil, 80, 160, tm.flip - tm.sil, .12, "sawtooth"); noise(t0 + tm.sil, tm.flip - tm.sil, 600, .08); }
    [tm.walk ? tm.flag : tm.club, tm.walk ? tm.club : tm.pos, tm.walk ? tm.pos : tm.note].forEach(function (s, i) { tone(t0 + s, 70, 40, .5, .75); noise(t0 + s, .25, 200, .5, "lowpass"); tone(t0 + s, 330 + i * 110, 330 + i * 110, .5, .06, "triangle"); });
    var lr = L.cards[L.cards.length - 1].rating, fz = t0 + tm.flip + .35;
    if (lr >= 85) [1568, 2093, 2637, 3136].forEach(function (f, i) { tone(fz + .05 + i * .09, f, f, .7, .035, "triangle"); });
    if (lr >= 90) for (var fw = 0; fw < 8; fw++) { var lt = fz + .15 + fw * .32; tone(lt, 500, 1500, .4, .025); noise(lt + .45, .5, 180, .55, "lowpass"); tone(lt + .45, 70, 35, .5, .45); for (var cr2 = 0; cr2 < 5; cr2++) noise(lt + .7 + cr2 * .09, .05, 4000, .12, "highpass"); }
    tone(t0 + tm.flip, 400, 1600, .3, .1); [0, .12, .24].forEach(function (d, i) { tone(t0 + tm.flip + .35 + d, [784, 988, 1175][i], [784, 988, 1175][i], .6, .08, "triangle"); });
    var cr = ac.createBufferSource(), cf = ac.createBiquadFilter(), cg = ac.createGain(); cr.buffer = nb; cr.loop = true; cf.type = "bandpass"; cf.frequency.value = 900; cf.Q.value = .5; var cs = t0 + Math.max(tm.flip, lo), ce = t0 + Math.min(tm.sum + 1.6, hi);
    if (ce > cs + .1) { cg.gain.setValueAtTime(.001, cs); cg.gain.linearRampToValueAtTime(.3, cs + .5); cg.gain.linearRampToValueAtTime(.001, ce - .1); cr.connect(cf); cf.connect(cg); cg.connect(dest); cr.start(cs); cr.stop(ce); }
    for (var cn = 0; cn < 8; cn++) tone(t0 + tm.sum + 1 + cn * .07, 1800 + cn * 80, 2400, .1, .04, "square");
    var lc = L.cards[L.cards.length - 1], ds = t0 + tm.flip + 2.5;
    if (lc.sale) { tone(ds, 90, 40, .3, .5); for (var cs = 0; cs < 10; cs++) tone(ds + .1 + cs * .06, 1900 + cs * 90, 2600, .1, .05, "square"); }
    else if (lc.keep) { tone(ds, 90, 40, .3, .5); noise(ds, .08, 2500, .3, "highpass"); tone(ds + .08, 660, 660, .12, .08, "square"); }
    else { tone(ds, 392, 392, .2, .06, "triangle"); tone(ds + .22, 494, 494, .3, .06, "triangle"); }
    tone(t0 + tm.sum + 2.9, 523, 523, .25, .07, "triangle"); tone(t0 + tm.sum + 3.1, 784, 784, .45, .07, "triangle");
  }

  /* ---------- aperçu, lecture, vidéo ---------- */
  var cv = $("#view"), g = cv.getContext("2d"), t0 = performance.now(), busy = false, ac = null, prevGain = null;
  function msg(t) { $("#msg").textContent = t; }
  function audio() { if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)(); if (ac.state === "suspended") ac.resume(); return ac; }
  function total() { return S && S.last ? TL(S.last).end : 4; }
  var waiting = false, onChoice = null;
  (function loop(now) { if (!busy) { var t = (now - t0) / 1000, D = decT(); if (t > total() + 1.5) { t0 = now; t = 0; pressed = decided(); }
      if (pending() && t >= D) { t = D; t0 = now - D * 1000; if (!waiting) { waiting = true; msg("👆 Touche VENDRE ou GARDER sur la vidéo"); } }
      drawScene(g, Math.min(t, total())); } requestAnimationFrame(loop); })(performance.now());
  var soundOn = false;
  function playNow() { if (!S.last) return; var a = audio(); if (prevGain) try { prevGain.disconnect(); } catch (e) {} prevGain = a.createGain(); prevGain.connect(a.destination); t0 = performance.now(); pressed = decided(); waiting = false; soundOn = true; sounds(a, prevGain, a.currentTime, null, pending() ? decT() : null); }
  function choose(which) { // choix fait en touchant la vidéo
    var L = S.last; if (!L || !pending()) return; var D = decT(); pressed = which; fromVideo = true; deal(L.cards.length - 1, which); fromVideo = false; waiting = false; msg(which === "sell" ? "💸 Vendue !" : "🔒 Gardée !");
    if (onChoice) onChoice(); else { t0 = performance.now() - D * 1000; if (soundOn && prevGain) { var a = audio(); sounds(a, prevGain, a.currentTime - D, D, null); } }
  }
  cv.addEventListener("pointerdown", function (e) { if (!pending()) return; var r = cv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width * W, y = (e.clientY - r.top) / r.height * H;
    Object.keys(BTN).forEach(function (k) { var b = BTN[k]; if (x >= b[0] && x <= b[0] + b[2] && y >= b[1] - 20 && y <= b[1] + b[3] + 20) { e.preventDefault(); choose(k); } }); });
  $("#play").onclick = playNow;
  var lastURL = null, lastFile = null;
  function download(blob, name) {
    if (lastURL) URL.revokeObjectURL(lastURL); lastURL = URL.createObjectURL(blob);
    try { lastFile = new File([blob], name, { type: blob.type }); } catch (e) { lastFile = null; }
    var a = document.createElement("a"); a.href = lastURL; a.download = name; document.body.appendChild(a); try { a.click(); } catch (e) {} a.remove();
    var mo = blob.size / 1048576; $("#gotName").textContent = "✅ " + name + " · " + (mo >= 1 ? mo.toFixed(1) + " Mo" : Math.max(1, Math.round(blob.size / 1024)) + " Ko");
    $("#gotDl").href = lastURL; $("#gotDl").setAttribute("download", name);
    var can = false; try { can = !!(lastFile && navigator.canShare && navigator.canShare({ files: [lastFile] })); } catch (e) {} $("#gotShare").hidden = !can; $("#got").hidden = false;
  }
  $("#gotShare").onclick = function () { if (lastFile) navigator.share({ files: [lastFile] }).catch(function () {}); };
  $("#rec").onclick = function () {
    if (busy) return; if (!S.last) { msg("Ouvre d'abord un pack."); return; }
    if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream) { msg("Ce navigateur ne sait pas créer de vidéo. Utilise Chrome."); return; }
    if (prevGain) try { prevGain.disconnect(); } catch (e) {}
    var a = audio(), dest = a.createMediaStreamDestination(), st = cv.captureStream(30); dest.stream.getAudioTracks().forEach(function (tr) { st.addTrack(tr); });
    var type = ["video/mp4;codecs=avc1.42E01E,mp4a.40.2", "video/mp4;codecs=avc1,mp4a.40.2", "video/mp4", "video/webm;codecs=vp9,opus", "video/webm"].filter(function (x) { return MediaRecorder.isTypeSupported(x); })[0] || "", rec, ch = [], end = total();
    try { rec = new MediaRecorder(st, type ? { mimeType: type, videoBitsPerSecond: 9e6 } : {}); } catch (e) { msg("Impossible de démarrer l'enregistrement."); return; }
    rec.ondataavailable = function (e) { if (e.data && e.data.size) chunks.push(e.data); }; var chunks = ch;
    busy = true; $("#rec").disabled = true; $("#bar").hidden = false; msg("Création de la vidéo (" + Math.round(end) + " s)… garde la page ouverte.");
    var inter = pending(), D = decT(); pressed = decided(); sounds(a, dest, a.currentTime + .2, null, inter ? D : null); var s0 = performance.now() + 200; rec.start(500);
    onChoice = function () { s0 = performance.now() - D * 1000; try { rec.resume(); } catch (e) {} sounds(a, dest, a.currentTime - D, D, null); msg("Création de la vidéo… garde la page ouverte."); };
    (function fr() { var t = Math.max(0, (performance.now() - s0) / 1000);
      if (pending() && t >= D) { t = D; if (rec.state === "recording") { drawScene(g, D); try { rec.pause(); } catch (e) {} msg("⏸️ Vidéo en pause : touche VENDRE ou GARDER sur la vidéo"); } s0 = performance.now() - D * 1000; }
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
  $("#inter").onchange = function () { try { localStorage.setItem("packs-inter", this.checked ? "1" : "0"); } catch (e) {} pressed = decided(); };
  $("#acc").onchange = function () { ACC = this.value; try { localStorage.setItem("packs-acc", ACC); } catch (e) {} load(); tab = null; fillClubs(); refresh(); showResult(); makeCap(); t0 = performance.now(); };
  $("#exp").onclick = function () { var b = new Blob([JSON.stringify({ acc: ACC, save: S }, null, 1)], { type: "application/json" }), u = URL.createObjectURL(b), a = document.createElement("a"); a.href = u; a.download = "collection-" + ACC + ".json"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 4000); };
  $("#imp").onchange = function () { var f = this.files && this.files[0]; if (!f) return; f.text().then(function (txt) { var j = JSON.parse(txt), s2 = j.save || j; if (!s2 || !s2.cards) throw new Error("fichier"); if (!confirm("Remplacer la collection " + (ACC === "psg" ? "Team PSG" : "Team OM") + " par ce fichier ?")) return; S = s2; save(); refresh(); showResult(); makeCap(); msg("Collection restaurée ✅"); }).catch(function () { msg("⚠️ Ce fichier n'est pas une copie de secours valide."); }); this.value = ""; };
  $("#reset").onclick = function () { if (!confirm("Effacer toute la collection " + (ACC === "psg" ? "Team PSG" : "Team OM") + " ? Les pièces et l'album repartent à zéro.")) return; S = fresh(); save(); refresh(); showResult(); makeCap(); };
  $("#dbSave").onclick = function () { try { localStorage.setItem("packs-db", $("#db").value); } catch (e) {} loadDb(); fillClubs(); refresh(); logosForm(); msg("Liste des joueurs enregistrée ✅ (" + PLAYERS.length + " joueurs)"); };
  $("#dbReset").onclick = function () { if (!confirm("Revenir à la liste d'origine (500 joueurs) ?")) return; try { localStorage.removeItem("packs-db"); } catch (e) {} loadDb(); fillClubs(); refresh(); logosForm(); };

  $("#ppFile").onchange = function () { var f = this.files && this.files[0], k = photoFor; this.value = ""; if (!f || !k) return; var im = new Image(); im.onload = function () { var r = Math.min(1, 640 / im.height), c2 = document.createElement("canvas"); c2.width = Math.round(im.width * r); c2.height = Math.round(im.height * r); c2.getContext("2d").drawImage(im, 0, 0, c2.width, c2.height); var png = /png|webp/.test(f.type), url = c2.toDataURL(png ? "image/png" : "image/jpeg", .85); URL.revokeObjectURL(im.src); idbPut(k, url).then(function () { var i2 = new Image(); i2.onload = function () { photos[k] = i2; refresh(); msg("📷 Photo ajoutée : " + k.split("|")[0]); }; i2.src = url; }, function () { msg("⚠️ Impossible d'enregistrer la photo sur ce téléphone."); }); }; im.src = URL.createObjectURL(f); };
  idbAll();
  loadDb(); load(); fillClubs(); ["L1"].concat(Object.keys(CLUBS)).forEach(loadLogo); logosForm(); refresh(); showResult(); makeCap();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { t0 = performance.now(); });
  window.__packs = { setPhoto: function (k, url) { var i3 = new Image(); i3.onload = function () { photos[k] = i3; }; i3.src = url; }, drawScene: drawScene, tl: function () { return S.last ? TL(S.last) : null; }, state: function () { return S; }, open: openPack };
})();
