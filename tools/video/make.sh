#!/usr/bin/env bash
# Fabrique des vidéos Studio Quiz par thème : ./make.sh "om psg football" 5 3 dossier_sortie [vidéos_par_thème]
set -u
THEMES="$1"; N="${2:-5}"; CD="${3:-3}"; OUT="${4:-out}"; COPIES="${5:-1}"
HERE="$(cd "$(dirname "$0")" && pwd)"; mkdir -p "$OUT/work"
ok=0
for c in $(seq 1 "$COPIES"); do
for t in $THEMES; do
  STAMP="$(date -u +%Y%m%d-%H%M)"; [ -e "$OUT/quiz-$t-$STAMP.mp4" ] && { sleep 60; STAMP="$(date -u +%Y%m%d-%H%M)"; }
  for try in 1 2; do
    if node "$HERE/rec.js" "$t" "$OUT/work/$t" "$N" "$CD" && python3 "$HERE/build.py" "$OUT/work/$t" "$OUT/quiz-$t-$STAMP.mp4"; then
      python3 -c "import json,sys;d=json.load(open(sys.argv[1]));print(d['cap'])" "$OUT/work/$t.json" > "$OUT/quiz-$t-$STAMP.txt"; ok=$((ok+1)); break
    fi
    echo "Nouvel essai pour $t"
  done
  rm -rf "$OUT/work/${t}_frames"
done
done
echo "$ok vidéo(s) prête(s)"; [ "$ok" -gt 0 ]
