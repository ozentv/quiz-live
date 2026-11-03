# Studio Quiz (quiz-live)

Un quiz en plein écran au format vertical 9:16, lu par la voix de ton téléphone. Pensé pour TikTok.

Le quiz tient dans un seul fichier, `index.html`, sans rien à installer. Le relais facultatif qui lit le chat TikTok est dans `relay/`.

## Deux modes

### 🎬 Vidéo à enregistrer
1. Choisis un thème, le nombre de questions (3, 4 ou 5) et le compte à rebours (3 ou 5 s).
2. Touche **Lancer le quiz**. Un pré-compte de 10 secondes te laisse lancer l'enregistrement d'écran.
3. Le quiz se joue tout seul : intro, questions, réponse et « Le saviez-vous ? », puis l'outro.
4. À la fin, une légende TikTok avec les hashtags est prête à copier.

### 🔴 Live non-stop
1. Lance ton live TikTok et partage l'écran du téléphone.
2. Touche **Lancer le live**. Les questions s'enchaînent sans fin et aucune ne revient avant que toutes soient passées.
3. Quand quelqu'un trouve la bonne réponse, touche **+ Point** et tape son pseudo. Le premier pseudo validé s'affiche comme **WINNER**.
4. Le classement s'affiche tout seul toutes les 3, 5 ou 10 minutes, ou quand tu touches **Classement**.

## 🤖 Points automatiques avec le chat TikTok (mode live)

Un petit **relais** (dossier `relay/`) lit les commentaires de ton live en temps réel et les envoie au quiz :
- la **première** réponse de chaque personne compte : `A`, `b`, `réponse C`, ou le texte exact de la réponse (`Canberra`). Envoyer plusieurs lettres ne sert à rien ;
- à la fin du compte à rebours, le **plus rapide** gagne **3 points** et devient **WINNER**, les deux suivants gagnent **2 points** et tous les autres bons **1 point** ;
- le nombre de réponses s'affiche pendant la question, puis le nombre de bonnes réponses ;
- le bouton **+ Point** manuel reste disponible.

### Installation depuis ton téléphone (une seule fois, gratuit)
1. Crée un compte sur [render.com](https://render.com) avec ton compte GitHub.
2. Touche ce bouton, puis **Apply** :

   [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/ozentv/quiz-live)

3. Attends que le service `studio-quiz-relais` soit **Live**, puis copie son adresse (par exemple `https://studio-quiz-relais.onrender.com`).
4. Dans le quiz, choisis **Live non-stop**, coche **Points automatiques avec le chat TikTok**, puis entre ton pseudo TikTok et l'adresse du relais.
5. Touche **Tester la connexion**. Avec le pseudo `demo`, le relais envoie de faux commentaires pour tester sans être en live.

### Pendant le live
- Lance d'abord ton live TikTok, puis **Lancer le live** dans le quiz.
- Le bouton **Chat** en bas de l'écran indique l'état : ✓ connecté, … en cours de connexion, ✕ erreur. Touche-le pour reconnecter.
- Sur l'offre gratuite de Render, le relais s'endort après 15 minutes sans utilisation. Le premier réveil prend environ une minute : touche **Tester la connexion** un peu avant de commencer.

### Options du relais (facultatif)
Dans Render, onglet **Environment** du service :
- `ALLOWED_USERS` : ton pseudo TikTok, pour que personne d'autre n'utilise ton relais.
- `EULER_API_KEY` : clé gratuite de [eulerstream.com](https://www.eulerstream.com), si la connexion à TikTok devient limitée.

> ⚠️ La lecture du chat passe par une bibliothèque non officielle ([TikTok-Live-Connector](https://github.com/zerodytrash/TikTok-Live-Connector)). TikTok peut la casser lors d'une mise à jour, et ce type d'usage n'est pas prévu par ses conditions d'utilisation. En cas de panne, le bouton **+ Point** manuel fonctionne toujours.

## Thèmes (environ 40 questions chacun)
Géographie, Animaux, Sciences, Histoire, Culture générale, Sport, Gastronomie, Corps humain, Mythologie, Langue française, Pays et capitales, Technologie, Vrai ou faux, ou **Au hasard**.

## Voix off
La voix utilise la synthèse vocale du navigateur (`speechSynthesis`) avec une voix française.
- Sur iPhone, pour installer une voix : Réglages, Accessibilité, Contenu énoncé, Voix, Français.
- Sans voix française, le quiz se joue avec le texte seul.

## Astuces
- Désactive le mode silencieux et mets un volume moyen.
- Un **appui long** sur l'écran arrête le quiz.
- Les réglages, les scores et les questions déjà vues sont gardés dans le navigateur (`localStorage`).

## Utilisation
- **En local** : ouvre `index.html` dans un navigateur.
- **En ligne** : active GitHub Pages sur ce dépôt (Settings, Pages, branche `main`, dossier racine). Le quiz sera disponible à `https://ozentv.github.io/quiz-live/`.

## Ajouter des questions
Dans `index.html`, l'objet `BANK` contient tous les thèmes. Chaque question a ce format :
```js
["La question ?", ["Réponse A", "Réponse B", "Réponse C", "Réponse D"], indexBonneRéponse, "Le saviez-vous ?"]
```
(`indexBonneRéponse` commence à 0.)
