/* Menu commun à toutes les pages du studio (une seule source : modifier ici). */
(function () {
  var P = [["./", "index.html", "🧠", "Quiz"], ["vs.html", "vs.html", "🆚", "VS"], ["clubs.html", "clubs.html", "⚔️", "Bataille des clubs"], ["duel.html", "duel.html", "📊", "Duel en chiffres"], ["histoire.html", "histoire.html", "💬", "Histoires"], ["packs.html", "packs.html", "🃏", "Packs"]];
  var here = location.pathname.split("/").pop() || "index.html";
  var css = ".sq-nav{position:relative;z-index:50;display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;padding:8px max(12px,env(safe-area-inset-left,0px));margin:0 0 6px;background:#0b1220;border-bottom:1px solid rgba(255,255,255,.08);font:600 13px/1 Figtree,system-ui,sans-serif;-webkit-overflow-scrolling:touch}"
    + ".sq-nav::-webkit-scrollbar{display:none}.sq-nav a{flex:none;display:inline-flex;align-items:center;gap:5px;min-height:34px;padding:0 12px;border-radius:17px;color:#cdd6e4;text-decoration:none;background:rgba(255,255,255,.06)}"
    + ".sq-nav a:hover{background:rgba(255,255,255,.12)}.sq-nav a[aria-current=page]{background:#2ec4b6;color:#06222a}.sq-nav a:focus-visible{outline:2px solid #2ec4b6;outline-offset:2px}";
  var st = document.createElement("style"); st.textContent = css; document.head.appendChild(st);
  var nav = document.createElement("nav"); nav.className = "sq-nav"; nav.setAttribute("aria-label", "Pages du studio");
  nav.innerHTML = P.map(function (p) { return "<a href=\"" + p[0] + "\"" + (here === p[1] ? " aria-current=\"page\"" : "") + "><span aria-hidden=\"true\">" + p[2] + "</span>" + p[3] + "</a>"; }).join("");
  document.body.insertBefore(nav, document.body.firstChild);
  try { var bs = getComputedStyle(document.body); nav.style.margin = "-" + bs.paddingTop + " -" + bs.paddingRight + " " + (parseFloat(bs.paddingTop) ? "16px" : "6px") + " -" + bs.paddingLeft; } catch (e) {}
  var cur = nav.querySelector("[aria-current]"); if (cur && cur.scrollIntoView) try { nav.scrollLeft = cur.offsetLeft - 12; } catch (e) {}
})();
