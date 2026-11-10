# Met à jour la liste des vidéos (dans le texte de la release « videos ») et supprime les plus anciennes.
import json, os, re, subprocess, sys
OUT = sys.argv[1]; KEEP = 30; TAG = "videos"
def gh(*a, check=True): return subprocess.run(["gh", *a], check=check, capture_output=True, text=True).stdout
body = gh("release", "view", TAG, "--json", "body", "-q", ".body", check=False)
m = re.search(r"<!--DATA(.*?)DATA-->", body or "", re.S)
items = json.loads(m.group(1)) if m else []
new = []
for f in sorted(os.listdir(OUT)):
    if f.endswith(".mp4"):
        cap = open(os.path.join(OUT, f[:-4] + ".txt"), encoding="utf-8").read().strip() if os.path.exists(os.path.join(OUT, f[:-4] + ".txt")) else ""
        theme = f.split("-")[1]
        new.append({"file": f, "theme": theme, "date": f.split("-", 2)[2][:-4], "cap": cap})
items = new + [i for i in items if i["file"] not in {n["file"] for n in new}]
old, items = items[KEEP:], items[:KEEP]
for i in old: gh("release", "delete-asset", TAG, i["file"], "-y", check=False)
txt = "Vidéos Studio Quiz prêtes à télécharger : https://ozentv.github.io/quiz-live/videos.html\n\n" + "\n".join("- " + i["file"] for i in items)
txt += "\n\n<!--DATA" + json.dumps(items, ensure_ascii=False) + "DATA-->"
open(os.path.join(OUT, "notes.md"), "w", encoding="utf-8").write(txt)
gh("release", "edit", TAG, "--notes-file", os.path.join(OUT, "notes.md"))
print(len(new), "ajoutée(s),", len(old), "supprimée(s),", len(items), "en ligne")
