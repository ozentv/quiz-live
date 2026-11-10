#!/usr/bin/env bash
# Fabrique une vidéo Studio Quiz par thème : ./make.sh "om psg football" 5 3 dossier_sortie
set -u
THEMES="$1"; N="${2:-5}"; CD="${3:-3}"; OUT="${4:-out}"
HERE="$(cd "$(dirname "$0")" && pwd)"; mkdir -p "$OUT/work"
STAMP="$(date -u +%Y%m%d-%H%M)"; ok=0
for t in $THEMES; do
  for try in 1 2; do
    if node "$HERE/rec.js" "$t" "$OUT/work/$t" "$N" "$CD" && python3 "$HERE/build.py" "$OUT/work/$t" "$OUT/quiz-$t-$STAMP.mp4"; then
      python3 -c "import json,sys;d=json.load(open(sys.argv[1]));print(d['cap'])" "$OUT/work/$t.json" > "$OUT/quiz-$t-$STAMP.txt"; ok=$((ok+1)); break
    fi
    echo "Nouvel essai pour $t"
  done
  rm -rf "$OUT/work/${t}_frames"
done
echo "$ok vidéo(s) prête(s)"; [ "$ok" -gt 0 ]
