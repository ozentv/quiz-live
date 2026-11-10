# Studio Quiz (quiz-live)

Un quiz en plein écran au format vertical 9:16, lu par la voix de ton téléphone. Pensé pour TikTok.

Toutes les pages du studio (Quiz, VS, Bataille des clubs, Duel en chiffres, Histoires, Packs) ont le même menu en haut, défini une seule fois dans `nav.js`.

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

## ✨ Options de jeu

- **Plusieurs thèmes à la fois** : touche plusieurs thèmes pour les mélanger. « Au hasard » utilise tous les thèmes.
- **Difficulté** : *Facile* (2 choix), *Normal* (4 choix) ou *Expert* (les choix n'apparaissent qu'à la moitié du temps : il faut connaître la réponse).

- **🎮 Gameplay parkour en petit** (activé par défaut) : une animation de parkour en blocs vue à la première personne (sauts de bloc en bloc au-dessus du vide), dessinée directement dans le quiz, tourne en boucle dans une petite fenêtre en bas à gauche. Elle est 100 % originale. Tu peux la remplacer par ta propre vidéo de jeu, sans le son.

- **🎵 Musique d'ambiance** (activée par défaut) : une musique de jeu télé composée en direct par le quiz (grosse caisse, claps, basse rebondissante, cuivres et clochette, à 118 battements par minute), donc sans droits d'auteur. Trois volumes : Très bas, Bas, Moyen. Elle baisse toute seule quand la voix parle. Bouton « Écouter » dans les réglages pour l'essayer.

- **🎬 Effets de plateau télé** (activés par défaut) :
  - décor de studio animé : projecteurs qui balaient l'écran, rangées de LED qui clignotent au rythme de la musique, sol brillant, flash de couleur à la révélation ;
  - question qui apparaît en zoom, puis réponses qui glissent une à une avec un son ;
  - l'écran pulse en rouge pendant les 3 dernières secondes ;
  - jingles composés par le quiz : générique au début, transition avant chaque question, bonus, vote et podium ;
  - « ding » pour la bonne réponse, buzzer quand la majorité du chat s'est trompée.

### En live
- **Top 3 en direct** en haut de l'écran pendant les questions.
- **Bienvenue** affichée et annoncée quand un joueur marque son premier point, et **séries** 🔥 à 3, 5 et 10 bonnes réponses d'affilée.
- **Question bonus ×2** : 1 question sur 5 ou sur 10 rapporte deux fois plus de points (aussi avec + Point).
- **Vote du chat pour le thème** : au début, puis toutes les 5 ou 10 questions, le chat écrit 1, 2 ou 3 pour choisir le thème suivant parmi les thèmes sélectionnés (avec les points automatiques).
- **Récap après chaque question** (5, 7 ou 10 secondes, ou désactivé) : la liste des bonnes réponses avec la photo, le pseudo et les points gagnés (+3, +2, +1, ⭐ ×2, ❤️ ×3, ❄️ gelé), puis le top 5 du classement avec les places gagnées ou perdues (▲▼, NEW). La voix résume : combien ont répondu et trouvé, le plus rapide et ses points, les suivants, qui est en tête, ou « personne n'a trouvé » avec la bonne réponse.
- **⚡ Votes surprise bonus ou malus** (Rare, Normal ou Souvent, ou désactivé) : après une question, un vote peut tomber au hasard (jamais deux à moins de 3 questions d'écart). Trois formes alternent, et la voix off explique la règle à chaque fois :
  - **🪙 Pile ou face** : le bonus et le malus sont affichés, le chat écrit « pile » ou « face », puis la pièce est lancée. Si la majorité a deviné juste, bonus pour tout le monde, sinon malus pour tout le monde.
  - **⚖️ Le dilemme** : deux choix avec chacun un avantage et un défaut (par exemple +2 points pour tous ou prochaine question ×5 mais −3 en cas d'erreur), le chat écrit 1 ou 2.
  - **🎯 La cible** : un malus (−3, −5, −8 points ou gel) tombe sur un joueur du top 3, et le chat écrit 1, 2 ou 3 pour choisir qui le prend.
  Le 🛡️ bouclier protège des malus. Sans vote, le hasard choisit. Ces points ne comptent que pour le classement de la session (pas pour le classement public).
- **🎤 Animateur** (activé par défaut, réglage dans les effets) : en bas à gauche du live, avec le bandeau « ANIMATEUR ». Trois choix :
  - **Présentateur** (par défaut) : un présentateur humain dessiné en costume, cravate aux couleurs du thème, 4 teints de peau. Il cligne des yeux, parle avec la bouche synchronisée sur la voix off en levant son micro, fait coucou quand quelqu'un trouve et se prend la tête quand personne ne trouve.
  - **Mascotte ronde** : le petit personnage avec casque-micro et antenne « ? ».
  - **Ma photo ou vidéo** : ta propre photo (gardée en mémoire) ou une vidéo en boucle, d'une personne qui a donné son accord.
  Si l'incrustation du jeu est activée, elle passe en bas à droite.
- **« Prochaine question »** : après le récap, une roulette fait défiler les thèmes de plus en plus lentement, puis s'arrête sur celui de la question suivante.
- **Photos des joueurs sur les réponses** : pendant la question, la photo de profil de chaque personne qui répond apparaît sur la réponse qu'elle a choisie (5 photos maximum par réponse, puis un compteur « +N », et l'initiale du pseudo quand il n'y a pas de photo).
- **Répartition des réponses** : à la révélation, chaque choix affiche le pourcentage du chat, avec une barre.
- **⚡ Premier à répondre** : le pseudo du plus rapide s'affiche pendant la question, sans dévoiler sa réponse.
- **Effets de jeu télé** : battements de cœur pendant les 5 dernières secondes, roulement de tambour avant la réponse, confettis et applaudissements pour le WINNER, « ouuuh » quand personne n'a trouvé, tremblement de l'écran lors d'un gel ou d'un vol.
- **❤️ Jauge de likes** : tous les 500, 1 000 ou 2 000 likes (réglable), la question suivante vaut ×3.
- **Photos de profil TikTok** dans le top 3, le classement et le podium.
- **Podium final** : en touchant **Arrêter** deux fois, le top 3 s'affiche sur un podium et le vainqueur est annoncé. **✕ Fermer** termine le live.

## 🤖 Points automatiques avec le chat TikTok (mode live)

Un petit **relais** (dossier `relay/`) lit les commentaires de ton live en temps réel et les envoie au quiz :
- la **première** réponse de chaque personne compte : `A`, `b`, `réponse C`, `je dis B`, `B Canberra`, 🅱️, ou le texte de la réponse (`Canberra`). Les messages ambigus comme `A ou B ?` sont ignorés, et envoyer plusieurs lettres ne sert à rien ;
- comme le live TikTok a quelques secondes de retard, les réponses comptent encore pendant le **décalage** choisi dans les réglages (3, 6 ou 10 secondes) après la fin du compte à rebours ;
- le bouton **Chat ✓** affiche le nombre de commentaires reçus, et les réglages montrent les derniers commentaires : pratique pour vérifier que le chat arrive bien ;
- à la fin du compte à rebours, le **plus rapide** gagne **3 points** et devient **WINNER**, les deux suivants gagnent **2 points** et tous les autres bons **1 point** ;
- le nombre de réponses s'affiche pendant la question, puis le nombre de bonnes réponses ;
- le bouton **+ Point** manuel reste disponible.

### 🎁 Effets des cadeaux TikTok
Avec les points automatiques, chaque cadeau reçu en live déclenche un effet selon sa valeur (option « Effets des cadeaux TikTok » dans les réglages) :

| Cadeau (exemples) | Pièces | Effet |
|---|---|---|
| 🌹 Rose, GG | 1 – 4 | +1 point par cadeau (les combos comptent : Rose ×5 = +5) |
| 🫰 Cœur avec les doigts | 5 – 9 | 🛡️ bouclier contre les malus pendant 5 questions |
| 🌹 Rosa | 10 – 19 | ⭐ prochaine bonne réponse ×2 |
| 🧴 Parfum | 20 – 29 | 💡 joker 50/50 : 2 mauvaises réponses disparaissent pour tous |
| 🍩 Donut | 30 – 99 | ❄️ gèle le joueur juste devant (0 point à la question suivante) |
| 🫶 Cœurs avec les mains, 🎉 Confettis | 100 – 499 | 💣 vole 3 points au joueur juste devant |
| 🔫 Money Gun… | 500 et + | 👑 choisit le thème : 5 questions bonus ×2 |
| 🌌 Galaxie | — | remet le classement à zéro (annulable avec **+ Point → Annuler la Galaxie**) |

Pour que les spectateurs sachent ce que fait chaque cadeau :
- une **ligne d'info** défile en haut de l'écran pendant les questions, avec un cadeau toutes les 4,5 secondes ;
- un **écran récapitulatif** des cadeaux s'affiche tout seul toutes les 10 questions, avec un rappel à la voix ;
- le bouton **🎁** de la barre du bas affiche ce récap quand tu veux (le bouton **🏆** affiche le classement).

Les effets sont calculés selon la valeur en pièces envoyée par TikTok, donc ils marchent même si le nom d'un cadeau change. Les prix des cadeaux peuvent varier selon le pays. Les points des bonnes réponses restent la source principale : on peut gagner sans rien envoyer. Il n'y a ni hasard payant ni récompense réelle.

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

### 🏆 Classement public du mois
Une page publique, **https://ozentv.github.io/quiz-live/classement.html**, montre le classement de la saison (un mois) à tes spectateurs :
- les points du mois, avec la photo et les ▲▼ depuis hier ;
- un top 3, un top 10, un top 50 et une recherche de pseudo ;
- les donateurs du mois et le badge « En direct maintenant » ;
- un compte à rebours jusqu'à la remise à zéro du 1er du mois.

**Badges** (sur la page et dans le quiz) : 👑 champion de la semaine dernière, 🎁 meilleur donateur du mois, 🔥 série de 5 bonnes réponses ou plus.

**Remerciements** : en live, un bandeau remercie les nouveaux abonnés (💙) et ceux qui partagent le live (🔁), en les regroupant s'ils sont nombreux.

**Installation (une seule fois, gratuit) :**
1. Crée un compte sur [upstash.com](https://upstash.com), puis **Create Database** : type **Redis**, offre **Free**, une région en Europe.
2. Dans la base, partie **REST API**, copie **UPSTASH_REDIS_REST_URL** et **UPSTASH_REDIS_REST_TOKEN**.
3. Sur Render, service `studio-quiz-relais`, onglet **Environment**, ajoute ces 2 variables, plus **ADMIN_KEY** avec un mot de passe de ton choix. Enregistre, puis **Manual Deploy**.
4. Dans le quiz, sous les points automatiques, écris ce mot de passe dans **« Clé du classement »**. « Tester la connexion » doit afficher « Classement public : enregistrement actif ».

Les points sont enregistrés seulement avec la bonne clé : personne d'autre ne peut modifier ton classement. La Galaxie remet à zéro le classement du live, pas celui du mois.

### Options du relais (facultatif)
Dans Render, onglet **Environment** du service :
- `ALLOWED_USERS` : ton pseudo TikTok, pour que personne d'autre n'utilise ton relais.
- `GEMINI_API_KEY` : voix off IA Gemini (voir « Voix off » plus bas).
- `EULER_API_KEY` : clé gratuite de [eulerstream.com](https://www.eulerstream.com). **Recommandée** : sans clé, le service gratuit qui permet de se connecter aux lives TikTok est vite limité, surtout depuis Render. Le message « Limite gratuite du service de connexion TikTok atteinte » veut dire qu'il faut l'ajouter.

### Ajouter la clé Euler Stream
1. Crée un compte gratuit sur [eulerstream.com](https://www.eulerstream.com) et crée une clé API dans ton tableau de bord.
2. Sur Render, ouvre le service **studio-quiz-relais**, puis l'onglet **Environment**.
3. Ajoute la variable `EULER_API_KEY` avec ta clé comme valeur, puis enregistre. Render redémarre le relais tout seul, en une ou deux minutes.

> ⚠️ La lecture du chat passe par une bibliothèque non officielle ([TikTok-Live-Connector](https://github.com/zerodytrash/TikTok-Live-Connector)). TikTok peut la casser lors d'une mise à jour, et ce type d'usage n'est pas prévu par ses conditions d'utilisation. En cas de panne, le bouton **+ Point** manuel fonctionne toujours.

## ⚔️ Bataille des clubs (jeu interactif pour les lives)
Page : https://ozentv.github.io/quiz-live/clubs.html
- 12 cartes de clubs (au choix parmi les 96 du générateur), chacune avec une lettre de A à L. Le chat écrit la lettre (ou le nom du club) pour lui donner 1 point (un point par seconde maximum par personne).
- Cadeaux : pièces × 1, 5 ou 10 points pour le club de la personne. Likes : 1 point tous les 5, 10 ou 25 likes pour le dernier club soutenu.
- Classement en direct : les cartes glissent à leur nouvelle place avec un flash, cadres métal or, argent et bronze pour le top 3, ruban de rang, barre de progression par rapport au leader, « +1 » et cœurs qui s'envolent, dernier supporter avec sa photo.
- **Visuel stade** : stade de nuit dessiné (tribunes aux couleurs des 12 clubs, projecteurs, panneaux LED, pelouse), flashs d'appareils photo qui se multiplient quand le chat s'emballe, tableau d'affichage avec chrono lumineux, saison, match, leader et nombre de votes.
- **⭐ Top supporters** : les 5 personnes qui ont rapporté le plus de points (photo, club, points). À la fin du match, le premier est élu **MVP**.
- **🎨 Tribunes aux couleurs du leader** : le public du stade prend peu à peu les couleurs du club en tête (fondu à chaque changement de leader). À chaque but, un **tifo géant** se déploie, comme des cartons retournés par le public, avec les couleurs et le logo du club.
- **📣 Chants de supporters** (activés par défaut) : quand un club est en feu, la tribune chante « Olé, olé… Al-lez ! » sur des claquements de mains, et le commentateur en parle. L'ovation de la foule grandit avec l'écart au score.
- **🎬 Récap vidéo** (sur ordinateur, Chrome ou Edge) : coche l'option ou clique sur « 🎬 Activer le récap » pendant le jeu, puis choisis l'onglet du jeu. La page filme les 20 dernières secondes de chaque match et l'écran de victoire, avec le son, en 720 × 1280 (format TikTok). Le bouton « ⬇️ Récap match N » télécharge la vidéo (MP4 quand le navigateur le permet, sinon WEBM). Les 3 derniers récaps restent disponibles.
- **⚽ BUT !** : quand un club passe 100, 250, 500, 1 000 ou 2 000 points, grand bandeau « BUT ! », ovation et annonce.
- **🔥 Mode derby** (réglage « Mode de jeu ») : seulement 2 clubs, par exemple OM contre PSG. Deux grandes cartes, une barre façon tir à la corde avec les pourcentages, les derniers supporters de chaque camp, et un commentaire propre au derby (égalité, écart, la corde penche…). Le chat vote avec A ou B, ou avec le nom du club.
- **🔁 Commentaire en continu** (activé par défaut) : le commentateur parle sans arrêt, comme pendant un vrai match. Il annonce le leader, l'écart avec le 2e, la lanterne rouge, les clubs qui grimpent ou tombent, les duels serrés, le club en feu sur les 10 dernières secondes, le meilleur supporter, les pseudos qui votent, les cadeaux, le temps restant et les buts qui approchent. Il évite de répéter la même phrase, et les sous-titres s'affichent en haut sous le tableau d'affichage.
- **🎙️ Commentateur** (voix + sous-titres) : coup d'envoi, changements de leader, gros cadeaux, événements, « plus qu'une minute », 30 s, 10 s, relances quand le chat est calme, et fin du match avec le gagnant et le MVP.
- **🏟️ Sons de stade** (générés par la page) : rumeur de la foule qui monte avec le nombre de votes, coup de sifflet au début et à la fin, ovation sur les buts, bips des 10 dernières secondes.
- **⚡ Événements surprises** (environ toutes les 70 à 110 secondes) : points doublés pour tous (30 s), Remontada ×2 pour les clubs hors du podium (30 s), ou club en vedette ×3 (20 s). Bandeau avec compte à rebours et badge « ×2 / ×3 » sur les cartes concernées.
- **Animateur** en bas à gauche : présentateur animé qui parle en même temps que le commentateur et réagit aux buts (4 couleurs de peau, ou pas d'animateur).
- Volume des sons de stade : faible (par défaut), moyen ou fort.
- Manches de 2, 3, 5 ou 10 minutes : à la fin du chrono, le club en tête gagne (confettis, trophée 🏆 sur sa carte, MVP), puis le **classement de la saison** s'affiche (victoires et points cumulés), avant la manche suivante. Saisons de 100 matchs.
- Sur chaque club : « 👤 » met une photo (un joueur) en fond de carte et « 🛡️ » met le logo du club, posé en grand au milieu (PNG transparent conservé). Logo seul : il s'affiche sur un fond aux couleurs du club. Les images restent seulement sur ton téléphone ; sans image, l'écusson aux couleurs du club s'affiche.
- **✂️ Logo derrière le joueur** (activé par défaut) : la photo du joueur est détourée automatiquement, directement sur le téléphone (outil MediaPipe de Google, chargé une seule fois, rien n'est envoyé). Sur la carte, le joueur passe devant un grand logo du club. Le détourage se fait à l'import d'une photo, ou pour toutes les photos avec « ✂️ Détourer les photos ». Décoche l'option pour revenir au rendu combo ci-dessous.
- **Combo photo + logo** : quand un club a les deux, la carte devient une carte de collection. La photo du joueur est cadrée sur le visage, avec un dégradé et une double bande diagonale aux couleurs du club, le logo en filigrane sur la photo et le logo net dans un médaillon en haut à droite.
- « 📥 Importer toutes les images d'un coup » : sélectionne jusqu'à 12 images en une fois ; chacune va sur la bonne carte si son nom de fichier est la lettre (A.jpg) ou le nom du club (psg.jpg, real madrid.png), sinon dans l'ordre A, B, C… Un fichier dont le nom contient « logo », « écusson » ou « blason » (psg logo.png) devient le logo du club, les autres deviennent la photo.
- Utilise les mêmes réglages de relais que le quiz. Mode démo pour tester sans live.

## 💬 Histoire en messages (OM contre PSG)
Page : https://ozentv.github.io/quiz-live/histoire.html
- Une conversation qui s'écrit toute seule sur un écran de messagerie (appli inventée, sans marque) : tes messages se tapent lettre par lettre au clavier, les réponses arrivent après « … en train d'écrire », et le fil défile tout seul.
- **307 histoires prêtes à l'emploi**, chacune en version **Team OM** (« Moi » = l'OM) et **Team PSG** (« Moi » = le PSG) :
  - 5 histoires spéciales : Le Classique, Le pari, Les ex, Le mercato, et une vide ;
  - 302 conversations de 31 à 56 secondes, en 3 parties, avec un vrai dialogue, en 15 catégories : 😏 Chambrage, 🤝 Paris et défis, 💔 Amour et ex, ✍️ Mercato et joueurs, 🏟️ Jour de match, 👨‍👩‍👧 Supporters et famille, 🤪 Délires, 👥 Groupes de supporters, 👻 Snap et réseaux, 🏆 Coupes et soirées européennes, 🎮 Console, five et foot entre potes, 🏫 École, boulot et vie de tous les jours, 🔥 Chambrage (saison 2), 💞 Amour, famille et rivalité, 😂 Délires (saison 2), 👥 Groupes de supporters (saison 2).
  - Les nouvelles histoires utilisent les snaps, la carte, les sondages, les autocollants, les effets `[choc]`, les captures d'écran, les appels vidéo et les vocaux.
  - Les noms, stades, villes, couleurs, slogans et emojis s'adaptent tout seuls au camp choisi. « 🎲 Une histoire au hasard » en tire une.
- **Réalisme** : « ✓ Envoyé » puis « ✓✓ Lu » sous ton dernier message ; réponse à un message avec la citation au-dessus (`[répond: …]`) ; réactions qui se posent sur une bulle (`[réaction 😂]`) ; message supprimé (`[supprimé]`) ; hésitations (`Moi: [hésite: Je t'aime] Bonne nuit` : tu tapes, tu effaces, tu retapes ; `[hésite]` : l'autre écrit puis n'envoie rien).
- **📞 Appels** : écran d'appel entrant plein écran avec sonnerie (`[appel] PSG`), puis « Appel manqué » dans le fil, ou appel décroché avec chrono (`[appel] PSG | accepté`).
- **👥 Groupes de discussion** (`@groupe Supporters OM | 💙`) : chaque personne (Lucas, Inès, Karim…) a son nom et sa couleur, et les membres s'affichent sous le nom du groupe. 6 histoires de groupe prêtes : le match, le spoiler, le billet en trop, la photo floue, le traître, le capitaine.
- **🎵 Musiques** : Auto (change selon les chapitres : drôle, tension, romantique ou triste), Drôle, Tension, Romantique, Triste, Douce, ou sans musique.
- **⚽ 5 duels** : OM contre PSG, OL contre ASSE, Real contre Barça, Lens contre Lille, Liverpool contre Man United. Les 100 conversations s'adaptent à chaque duel (noms, stades, villes, couleurs, slogans, nom du derby, hashtags).
- **✨ Inventer une histoire** : choisis un thème (chambrage, pari, amour, jour de match) et la page assemble une nouvelle histoire en 3 parties à chaque clic (50 à 60 secondes), avec un gage tiré au hasard pour les paris.
- **🎤 Messages vocaux** (`[vocal] texte`) : bulle avec forme d'onde et durée, « enregistre un vocal… » chez l'autre, enregistrement en rouge dans ta barre d'écriture, et la voix (voix pro gratuites du relais) dans la vidéo. Tu choisis ta voix et celle de l'autre.
- **📍 Position partagée** (`[position] Devant le Vélodrome`), **📸 photo éphémère** qui s'efface après 5 secondes (`[photo 1 éphémère]`).
- **🕐 Heure qui avance** pendant l'histoire et saute avec les sauts dans le temps (« TROIS HEURES PLUS TARD », « LE LENDEMAIN MATIN »…), batterie qui baisse. Heure de départ réglable (ou `@heure 23:40`).
- **🔒 Écran verrouillé** au début (activé par défaut) : grande horloge, date, puis une notification « PSG est en train d'écrire… » qui devient « PSG t'a envoyé un message » (sans dévoiler le message). L'écran glisse vers le haut et la conversation s'ouvre avec le premier message déjà là. Le fond d'écran est le logo du club de « Moi » importé dans « Logos des clubs » (OM pour Team OM, PSG pour Team PSG…), sur les couleurs du club.
- **💥 Phrase d'accroche** : un grand texte style TikTok pendant les 2 premières secondes (« Ils se sont écrit avant le Classique… 😳 »). Tu l'écris ou tu cliques sur « 💡 Idée » ; vide = aucune.
- **📥 Liste des conversations** après l'écran verrouillé : « Messages », la conversation qui vient d'arriver en haut (aperçu du message, pastille « 1 ») et d'autres discussions (Maman, le groupe de supporters, le coach…), le doigt tape dessus et la conversation s'ouvre.
- **🔤 Fautes de frappe corrigées** : sur certains de tes messages, une lettre voisine est tapée par erreur, effacée puis corrigée, comme une vraie personne (case à cocher).
- **Effets d'écran** : `[choc]` l'écran tremble avec un flash rouge et un boum, `[zoom]` zoom sur le dernier message avec un son dramatique, `[flash]` flash blanc. Ils marchent aussi en début de message : `PSG: [choc] QUOI ???`.
- **😂 Gros emojis** : un message fait seulement de 1 à 3 emojis s'affiche en grand avec un petit saut. **Autocollants** dessinés par la page : `[sticker chevre]` (GOAT), `ballon`, `coupe`, `but`, `pleure`, `rire`, `feu`, `clown`, `mur`, `dodo`, `coeur`, `bus` (`Moi: [sticker coupe]` pour le tien).
- **📸 Capture d'écran** : `[capture]` affiche « 📸 PSG a fait une capture d'écran ! », `Moi: [capture]` « 📸 Tu as fait une capture d'écran » avec un flash, et un bruit d'appareil photo.
- **📊 Sondage** : `[sondage] Qui gagne dimanche ? | OM | PSG | Nul` affiche un sondage où les votes arrivent et les barres bougent (`| OM 41` pour choisir le nombre de votes, ✓ sur l'option de ton club). `Moi: [sondage] …` pour le tien.
- **📹 Appel vidéo** : `[appel vidéo] PSG | accepté` montre la « caméra » de l'autre (son logo qui bouge comme filmé à la main), ta petite fenêtre avec ton logo et les boutons ; sans « accepté », appel vidéo manqué.
- **🖼️ Fond de conversation** aux couleurs du club de « Moi », avec le logo en filigrane (case à cocher).
- **👻 Comme sur Snap** :
  - `[snap 1] légende` : « Nouveau Snap » (carré rouge) que le doigt ouvre, la photo s'affiche en plein écran avec le compte à rebours, puis « Ouvert » ; `Moi: [snap 2]` : aperçu plein écran avec « Envoyer ➤ », puis « Envoyé » et « Ouvert » ;
  - `[snapmap] PSG est devant le Vélodrome 👀` : carte avec l'avatar posé dessus, les zones chaudes et des amis autour ;
  - 🔥 flammes à côté du nom (`@flammes 247`, `@flammes 0` pour les cacher), `[flamme perdue]` affiche « ⌛ Votre série de flammes va expirer ! » et un ⌛ dans l'en-tête ;
  - l'avatar de l'autre apparaît en bas quand il regarde la conversation (« 👀 regarde la conversation »), `[parti]` affiche « PSG est parti 👋 » et le fait disparaître ;
  - notifications de l'écran verrouillé façon Snap : « PSG est en train d'écrire… » puis « de PSG · 💬 Discussion » (ou « 📸 Snap »).
- **Sons plus réalistes** : vrai « toc » de clavier de téléphone (attaque sèche, petite résonance, rythme irrégulier comme un humain), « bloup » à l'envoi, « pop » à la réception, son d'ouverture de snap (sons recréés par la page).
- **🌙 Mode sombre** pour toute l'appli de messagerie.
- **🛡️ Logos des clubs** : importe le logo de l'OM et celui du PSG. Ils remplacent les écussons dessinés (photo du contact, « en train d'écrire », ton avatar, article de journal) et restent sur le téléphone.
- Pour écrire ta propre histoire, une ligne par message :
  - `Moi: texte` pour ton message, `PSG: texte` pour l'autre ;
  - `# Partie 1 : …` pour un chapitre (affiché au-dessus du clavier) ;
  - `-- TROIS HEURES PLUS TARD --` pour un saut dans le temps ;
  - `[notif] Nom : texte` pour une notification qui tombe du haut ;
  - `[photo 1] légende` pour une photo de ta galerie, et `[journal] Titre | texte` pour un article d'un journal inventé ;
  - `@contact PSG | 💔` pour changer les emojis du contact en cours d'histoire, et `[pause 2]` pour un silence.
- 6 emplacements pour tes photos (gardées sur le téléphone), vitesse lente, normale ou rapide, texte normal ou grand.
- Sons (clavier, envoi, réception, notification) et musique d'ambiance douce, créés par la page.
- Vidéo en 720p ou 1080p, encadré « Télécharger » et « Partager », et légende TikTok avec hashtags prête à copier.

## 🃏 Packs et album (série « pack opening »)
Page : https://ozentv.github.io/quiz-live/packs.html
- **Une vidéo = un épisode** : tes abonnés choisissent le pack en commentaire ; tu tapes le pseudo et le commentaire, la vidéo commence par ce commentaire (comme une réponse TikTok), puis le pack s'ouvre.
- **500 joueurs des 18 clubs de Ligue 1** (effectifs 2026-2027 relevés sur Wikipédia en novembre 2026), modifiables dans la page après un transfert. Les notes sont calculées par la page (niveau du club, sélection nationale, âge).
- **9 raretés** : commune, or rare, futur talent, en forme, équipe de la semaine, joueur du mois, héros, fin de saison, icône. **Packs** : de base (500 🪙), club (1 500), or (2 500), équipe de la semaine (5 000), premium (10 000) ; 5 à 7 cartes, la meilleure en dernier avec le suspense (club, poste, note) puis la carte qui se retourne.
- **Album** : une page par club (case grise « ? » pour les joueurs manquants) et une page des cartes spéciales. Club complété = 1 pack offert.
- **Doublons revendus** automatiquement (commune 50, or 200, équipe de la semaine 1 000, joueur du mois 1 500, héros 2 500) + **bonus d'épisode** de 500 🪙. Si tu ne peux plus rien acheter, le pack de base est offert : la série ne s'arrête jamais.
- La fin de la vidéo fait le **bilan** : nouvelles cartes, doublons, pièces gagnées, solde, album qui se remplit, « Quel pack j'ouvre ensuite ? 👇 ».
- **Walkout** pour les grosses cartes (équipe de la semaine, joueur du mois, héros) : tunnel du stade, projecteurs qui s'allument un par un, fumée, puis le drapeau du pays, l'écusson du club, le poste, la silhouette du joueur qui avance vers la caméra, et la carte qui se retourne.
- **Vrais postes** (G, DC, DG, DD, MDC, MC, MOC, MG, MD, AG, AD, BU) relevés dans les fiches Wikipédia des joueurs, **drapeau de la nationalité** sur chaque carte ; stats adaptées au poste.
- **Photos des joueurs** : touche un joueur dans l'album pour lui mettre une photo (gardée sur le téléphone) ; elle apparaît sur toutes ses cartes et en silhouette pendant le walkout.
- **Cartes brillantes** : reflet holographique qui bouge, petites étoiles et contour arc-en-ciel animé pour les cartes spéciales.
- **Nouvelles raretés** : Futur talent (joueurs de moins de 21 ans), En forme, Fin de saison et **Icônes** (32 légendes des clubs, à la retraite : Papin, Drogba, Ibrahimović, Ronaldinho, Juninho, Henry, Cantona…, avec leur page « 👑 Icônes » dans l'album). Nouveaux packs : Futurs talents (4 000 🪙) et Icône (25 000 🪙) ; le pack premium peut donner une fin de saison ou une icône.
- **Vendre ou garder** : chaque carte a une valeur sur le marché (selon sa note et sa rareté, le marché bouge à chaque épisode). Après l'ouverture, « 💸 Vendre » ou « 🔒 Garder » pour chaque nouvelle carte. Dans la vidéo, la dernière carte affiche sa valeur puis le tampon « 💸 VENDUE ! » ou « 🔒 JE LA GARDE » ; sans choix, la vidéo demande « Je la garde ou je la vends ? 👇 ». Le bilan compte les ventes.
- **🎮 Choisir dans la vidéo** (case cochée par défaut) : quand la dernière carte est retournée, la vidéo s'arrête sur deux gros boutons « 💸 VENDRE (prix) » et « 🔒 GARDER ». Tu touches la vidéo, le bouton s'enfonce et le tampon apparaît. Pendant l'enregistrement, la vidéo se met en pause le temps du choix (l'attente n'est pas dans le fichier). Si le choix est déjà fait, la vidéo rejoue l'appui sur le bon bouton.
- **Carte en 3D** : la dernière carte se retourne en vraie perspective puis tourne doucement, la photo bouge un peu devant le fond (effet de profondeur), le reflet holographique suit l'angle.
- **Fête selon la note** : pluie d'or et carillon à partir de 85 ; à partir de 90, les projecteurs du stade s'allument un par un et 8 feux d'artifice éclatent (sifflement, boum, crépitements).
- Une collection **Team OM** et une **Team PSG**, gardées sur le téléphone, avec copie de secours (fichier) ; logos des clubs facultatifs (et le logo de la Ligue 1 pour les packs Ligue 1, à importer soi-même ; ses bords blancs sont coupés automatiquement) ; légende TikTok prête à copier.

## 📊 Duel en chiffres (vidéos « Clasico en chiffres »)
Page : https://ozentv.github.io/quiz-live/duel.html
- Deux clubs face à face, chacun avec son nom, ses couleurs et son logo (importé, gardé sur le téléphone ; sinon un écusson aux couleurs du club).
- Jusqu'à 8 chiffres : chaque ligne arrive avec un whoosh, les nombres défilent, une barre façon tir à la corde penche, et le gagnant de la ligne s'allume en or. L'option « Le plus petit gagne » sert par exemple pour l'année de création. Le score des chiffres gagnés monte en haut.
- Fin de vidéo : le score final, « Avantage … », et ta phrase de fin.
- **11 modèles prêts à l'emploi** : OM contre PSG, Real contre Barça, Messi contre Ronaldo, Mbappé contre Haaland, Liverpool contre Man United, Bayern contre Dortmund, Juventus contre Inter, Arsenal contre Tottenham, France contre Argentine, Lyon contre Saint-Étienne, ou vide pour tes propres chiffres. Les chiffres sont ceux de la fin de la saison 2024-2025 : vérifie-les avant de poster.
- Boutons **Team [club de gauche]**, **Team [club de droite]** ou **Neutre** : ils écrivent la phrase de fin avec le slogan du club (« Droit au but ! », « Ici c'est Paris ! », « ¡Hala Madrid ! »…). « Échanger les côtés » met l'autre club à gauche.
- **💥 Effets** (activés par défaut) : flash et confettis aux couleurs du club gagnant sur chaque chiffre, tremblement de l'écran, ralenti avec suspense sur le dernier chiffre, pluie de confettis à la fin.
- **❓ Fin avec suspense** (case à cocher pour chaque vidéo) : le dernier chiffre reste caché avec des « ? », le badge « PARTIE 1 » s'affiche, et la vidéo finit sur « + 1 chiffre mystère » avec une phrase de fin à part (« Réponse dans la partie 2 ! »). Décoche la case pour faire la partie 2 avec tout révélé.
- **🎙️ Voix off** (activée par défaut) : la voix pro gratuite du relais lit le titre (« Le Classique en chiffres ! OM contre PSG ! »), chaque chiffre (« Coupes de France : OM, 10 ; PSG, 16 ! »), puis le score final et ta phrase de fin. Elle est enregistrée dans la vidéo, la musique baisse quand elle parle, et l'animation attend la fin de chaque phrase. 10 voix au choix. Le relais et la clé sont repris des réglages du quiz. « ▶ Préparer et écouter avec la voix » donne l'aperçu avec le son. Si le relais ne répond pas, la vidéo se fait sans voix.
- **📋 Légende TikTok** : écrite toute seule avec les deux équipes et leurs hashtags (#om #psg #leclassique…), « 🎲 Autre idée » et « 📋 Copier la légende ».
- Vidéo d'environ 20 secondes en 720p ou 1080p, avec beat et effets sonores, plus l'image finale. Encadré « Télécharger » et « Enregistrer / Partager » comme sur le VS.

## 🆚 Générateur VS (vidéos « Team contre Team »)
Page : https://ozentv.github.io/quiz-live/vs.html
- Deux cartes de profil (nom, emoji, @pseudo, suivis, followers, j'aime, photo, boutons Suivre / Message en option) et un grand texte au milieu (« VS » par défaut).
- **🕺 Danseurs animés** (fond par défaut) : deux danseurs dessinés en direct par la page.
  - 22 danses : Groove, Shuffle, Bras en l'air, Hip-hop, Robot, Saut, Floss, Dab, Disco, Tape dans les mains, Running man, Cavalier, Tecktonik, Coucou, Glisse, Twist, Marche, Salsa, Grands coups de pied, Champion, Pogo, Vague, plus un Mélange qui les enchaîne.
  - Tenues OM et PSG stylisées (couleurs du club, sans logo) : maillots OM domicile, extérieur et third, maillots PSG domicile, extérieur et third avec la bande centrale, écharpe OM avec sweat blanc, écharpe PSG avec doudoune.
  - 20 tenues par danseur (sweats et cagoules, streetwear, maillots de foot unis ou rayés, doudounes, costume, survêts à bandes, bandeau, coiffure afro, couronne…), avec les couleurs du haut, du bas et de l'accessoire modifiables.
  - 3 vitesses, 11 décors : ciel, ville, néon, studio, stade de foot (public aux couleurs des deux équipes), Vélodrome la nuit (fumigènes bleu ciel et craquages), Parc des Princes (tifo bleu, rouge et bleu qui fait la vague), Marseille et le Vieux-Port au coucher du soleil, Paris et la tour Eiffel qui scintille, vestiaire avec les maillots des deux équipes, plage, ensemble, en miroir ou décalés, vidéo de 10 à 60 secondes, musique au choix : beat électro, trap, drill ou afro.
- **⚽ Écussons de club** : sur chaque carte, le bouton « Écusson de club » propose les 96 clubs des 5 grands championnats (Premier League, Liga, Serie A, Bundesliga, Ligue 1) sous forme d'écussons aux couleurs du club avec ses initiales (ce ne sont pas les logos officiels, qui sont des marques protégées ; un vrai logo peut être importé depuis la galerie). Le nom du club peut remplir la carte, et « Écusson perso » crée un écusson avec tes lettres et tes couleurs.
- **📋 Légende TikTok** : la page écrit une légende avec une question et 6 hashtags selon tes équipes (clubs reconnus avec leur championnat et les grands derbies : #leclassique, #elclasico…, Team Boys contre Team Girls, danse). « Autre idée » propose une autre phrase, et « Copier la légende » la met dans le presse-papiers pour la coller dans TikTok.
- **🎬 Animation d'entrée** (activée par défaut) : les cartes arrivent de chaque côté, puis le « VS » tombe en zoom avec un flash blanc et un éclair. « Revoir l'animation d'entrée » la rejoue dans l'aperçu.
- **🔥 Effet autour du VS** : flammes, éclairs ou étincelles animés.
- **💾 Mes VS enregistrés** : enregistre un VS sous un nom (20 au maximum) et rouvre-le en un clic.
- **🖼️ Cadres** : contour au choix (aucun, simple, néon lumineux, dégradé de 2 couleurs, couleurs de chaque équipe, arc-en-ciel animé), avec la couleur, l'épaisseur et l'arrondi des coins réglables. Tu peux aussi changer la taille des cadres (60 à 125 %), la couleur et l'opacité de leur fond, les cacher tous les deux, ou revenir aux cadres d'origine.
- **Textes** : ajoute autant de textes que tu veux (taille, couleur, style contour, ombre ou bandeau) et fais-les glisser avec le doigt sur l'aperçu. Le « VS » et les deux cadres entiers se déplacent de la même façon (bouton pour les remettre à leur place).
- Ou choisis ta propre vidéo ou photo de fond depuis ta galerie, puis télécharge :
  - **la vidéo finie** avec le son (MP4 quand le navigateur le permet, sinon WEBM), en 720p ou 1080p, jusqu'à 60 secondes ;
  - **l'image transparente** des cartes, à poser au-dessus de n'importe quelle vidéo dans CapCut ;
  - **l'image avec le fond**.
- Une fois le fichier créé, un encadré reste affiché avec « ⬇️ Télécharger » (si le téléchargement automatique n'a pas marché) et, sur téléphone, « 📤 Enregistrer dans la galerie / Partager » pour le mettre dans la galerie ou l'envoyer directement dans TikTok ou CapCut.
- Les réglages restent enregistrés sur le téléphone. « Échanger les équipes » inverse les deux cartes.

## Thèmes (35 thèmes, 1732 questions)
- **57 questions** : Géographie, Animaux, Sciences, Histoire, Culture générale, Sport, Gastronomie, Corps humain, Mythologie, Langue française, Pays et capitales, Technologie, Cinéma, Musique, Jeux vidéo, Espace, Dessins animés, Football, Drapeaux, Séries, Marques et logos, France.
- **85 questions** : Calcul mental.
- **61 questions** : Vrai ou faux.
- **42 questions** : Monuments du monde, Inventions, Nature.
- **25 questions** : Mangas et animes, Anglais, Dinosaures et préhistoire, Art et peinture, Littérature, Rap français.
- **28 questions** : OM et PSG (pour les comptes de supporters : fondation, titres, finales, légendes, stades…).
- **Au hasard** mélange tous les thèmes.

## Voix off
Trois types de voix, au choix dans les réglages du quiz et de la Bataille des clubs (« Type de voix ») :
- **🎙️ Voix pro gratuite** (conseillée) : les voix « Natural » de Microsoft (Henri, Rémy, Denise, Vivienne, Éloïse, plus des voix belges, suisses et québécoises), fabriquées par le relais. Gratuites, sans quota, rapides (moins d'une seconde) : il faut seulement la « Clé du classement » (ADMIN_KEY), rien à créer. Elle passe par le service de lecture à voix haute de Microsoft Edge, qui n'est pas une API officielle : si Microsoft le change, la voix du téléphone prend le relais.
- **📱 Voix du téléphone** : synthèse vocale du navigateur (`speechSynthesis`) avec une voix française. Sur PC, dans **Microsoft Edge**, choisis une voix « Online (Natural) » (Henri, Denise, Vivienne, Rémy…) : elles sont gratuites et très naturelles. Sur iPhone, pour installer une voix : Réglages, Accessibilité, Contenu énoncé, Voix, Français. Sans voix française, le quiz se joue avec le texte seul.
- **✨ Voix IA Gemini** : voix très naturelle de Google Gemini (15 voix, hommes et femmes), avec un ton d'animateur télé pour le quiz et de commentateur sportif pour la Bataille des clubs. C'est le relais qui fabrique l'audio : ta clé Gemini reste sur Render et n'est jamais dans la page.
  1. Crée une clé gratuite sur [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
  2. Sur Render, service **studio-quiz-relais**, onglet **Environment** : ajoute `GEMINI_API_KEY` avec cette clé (garde aussi `ADMIN_KEY`). Enregistre, puis **Manual Deploy**.
  3. Dans le quiz, mets ta « Clé du classement » (la valeur d'`ADMIN_KEY`) : elle empêche les autres d'utiliser ton quota. La Bataille des clubs la reprend toute seule.
  4. Choisis « ✨ Voix IA Gemini », une voix, puis « Écouter la voix ».
  - Le quiz prépare la voix des questions à l'avance pour ne pas faire attendre. Les phrases déjà dites sont gardées en mémoire et ne coûtent rien.
  - Si Gemini est trop lent, refuse la clé ou dépasse le quota gratuit de Google, la voix du téléphone prend le relais automatiquement et le message s'affiche sous le choix de la voix.
  - Variable facultative `GEMINI_TTS_MODEL` pour changer de modèle (par défaut `gemini-3.8-flash-tts`).

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

Après un merge, le site se met à jour en une à deux minutes environ. Si l’ancienne version s’affiche, recharge la page.
