# Journal des versions

Ce qui a changé, dans l'ordre, et *pourquoi*. Les versions suivent
[SemVer](https://semver.org/lang/fr/) : le premier nombre change quand le cours change de forme, le
deuxième quand il gagne quelque chose, le troisième quand on répare.

---

## 3.3.0 — 2026-09-24

Quatre chantiers, un seul fil : **ce que personne ne vérifiait**.

### Ajouté

- **Le harnais lit les indices au lieu de les compter.** 425 exercices étaient passés à trois paliers
  par scripts, et l'on ne contrôlait d'eux qu'une chose : que ce soient des chaînes non vides. Cinq
  contrôles regardent désormais ce que l'élève *lit* — du HTML mal formé, deux paliers jumeaux, un
  palier qui recopie la consigne, un sur-échappement d'antislash, et une escalade qui redescend.

  > Les seuils ont été mesurés sur le corpus **avant** d'être écrits, et deux candidats ont été
  > retirés à ce moment-là. « Cet identifiant cité n'existe pas dans l'exercice » donnait 156
  > résultats dont aucun n'était une faute : `href`, `img` et `label` sont précisément ce que
  > l'élève doit ajouter. « Le dernier palier recopie la solution » en donnait huit, tous légitimes :
  > sur une solution de deux lignes, le dernier palier *est* censé la donner. Un contrôle qui crie
  > sans raison finit désactivé, et emporte les vrais avec lui.

- **`outils/verifier-navigateur.js`**, qui ouvre la page de mesure à ta place. Les 63 correcteurs de
  mise en page attendaient qu'on pense à les lancer : 13 % des exercices reposaient sur la mémoire
  de quelqu'un. `npm run tout-verifier` enchaîne maintenant les trois harnais.

  > Aucune dépendance ajoutée, et c'est délibéré. Puppeteer ferait cela en dix lignes mais
  > téléchargerait un Chromium entier dans un projet qui n'installe que jsdom. Depuis Node 22,
  > `WebSocket` et `fetch` sont natifs : parler le protocole DevTools au Chrome déjà présent sur la
  > machine tient en quarante lignes.

- **Huit vérifications d'accessibilité** sur l'application elle-même, dans les quatre vues. Le cours
  enseigne le `alt` vide, le `label` lié à son champ, le vrai bouton plutôt que la `div` cliquable —
  rien ne vérifiait qu'il se l'applique.

### Sécurité

- **Le bac à sable ne peut plus toucher à la progression.** Son aperçu tournait à la même origine que
  l'application : du code collé depuis un forum pouvait lire `parent.localStorage` — toute la
  progression, tous les projets — et l'effacer. Il tourne désormais dans une origine opaque
  (`sandbox` sans `allow-same-origin`). Mesuré dans un Chrome réel avant et après.

  Le pont n'a pas souffert : il passait déjà par `postMessage`. Et ton `localStorage` fonctionne
  quand même dans le bac — le pont en installe un vrai, gardé par le parent sous une clé à part.

### Corrigé

- **Douze cartes cliquables inatteignables au clavier**, sur la page d'accueil. Des `<div onclick>`,
  exactement ce que la leçon `html-22` reproche à l'élève. Ce sont de vrais `<button>` désormais,
  avec un nom accessible qui dit l'état : « HTML — La structure — À venir, 0 sur 22 leçons ».
- **Le bac à sable n'avait aucun titre de niveau 1** : un `<b>` en tenait lieu. Un lecteur d'écran
  navigue par titres, et c'était la seule vue à n'en offrir aucun.
- **Une escalade d'aide qui redescendait**, sur `js-1`. Le palier 2 donnait le moule exact, le palier
  3 n'offrait plus aucun code : l'élève était puni d'avoir persévéré. Seul vrai défaut sur les 425.

### Pour qui reprend le projet

```
npm run tout-verifier        # les trois harnais, sans rien ouvrir à la main
```

```
362 exercices rejoués sous Node   — 0 échec, 0 correcteur complaisant
358 copies sabotées présentées    — 358 refusées, 0 non éprouvé
 63 correcteurs de mise en page   — 0 échec, 0 complaisant (navigateur)
 85 vérifications d'interface     — 0 échec, dont 8 d'accessibilité
425 exercices à trois paliers     — 0 palier cassé, doublé ou inversé
```

Chaque nouveau contrôle a été mis à l'épreuve par un défaut introduit exprès, puis retiré. Un l'a
mérité : `Number(null)` vaut `0`, donc `Number(el.getAttribute('tabindex')) >= 0` était vrai pour
*tout* élément sans `tabindex`. Le contrôle des éléments cliquables sautait tout le monde et
annonçait fièrement zéro problème. La lecture ne l'avait pas vu ; le sabotage, si.

---

## 3.2.0 — 2026-09-24

Une seule chose, mais partout : **les trois paliers d'indice couvrent désormais le cours entier**.

### Changé

- **425 exercices sur 425** passent de l'indice unique aux trois paliers — où regarder, comment s'y
  prendre, puis presque la réponse. La version précédente en avait converti dix, à titre d'essai.
  Restaient 415 exercices où l'on tombait d'une phrase allusive à la solution complète, sans rien
  entre les deux.

  Le premier palier ne paraphrase pas la consigne : il nomme le piège de l'exercice.

  En CSS, qu'une règle fausse n'affiche aucune erreur et se contente d'être ignorée en silence ;
  qu'un `z-index` parfaitement écrit peut ne rien faire, faute d'une condition d'existence. En HTML,
  qu'une balise jamais refermée met en gras tout ce qui suit ; qu'un `label` et son champ peuvent
  coexister sans que cliquer sur l'un active l'autre ; qu'une image qui décore et une image qui
  informe n'ont pas le même `alt`. En Python, que `range()` n'atteint jamais sa borne de fin ; que
  le premier élément d'une liste ne porte pas le numéro 1 ; que réclamer une clé absente avec des
  crochets fait planter le programme. En C, qu'écrire *dans* le pointeur et écrire dans la case au
  bout du pointeur ne sont pas le même geste.

- Le champ `indice` (chaîne unique) reste lu par le moteur, mais plus aucun exercice ne l'utilise.

### Pour qui reprend le projet

```
362 exercices rejoués sous Node   — 0 échec, 0 correcteur complaisant
358 copies sabotées présentées    — 358 refusées, 0 non éprouvé
 63 correcteurs de mise en page   — 0 échec, 0 complaisant
 77 vérifications d'interface     — 0 échec
425 exercices à paliers           — 0 à indice unique
```

---

## 3.1.0 — 2026-09-23

Une version consacrée à deux choses : **ce que l'élève voit quand il se trompe**, et **ce qui
garantit que les corrections sont justes**.

### Ajouté

- **L'aide monte marche par marche.** Un exercice peut proposer plusieurs indices (`indices: [...]`),
  rangés du plus discret au plus explicite. Un palier s'ouvre par échec, jamais deux d'affilée : il
  faut avoir réessayé avec le précédent. La solution n'apparaît qu'une fois les paliers épuisés.
  Entre « où regarder » et « voici la réponse », il n'y avait rien — et c'est là qu'on abandonne.
  Dix exercices convertis, choisis où l'on décroche vraiment : pointeurs en C, compréhensions
  Python, classes Java, `HAVING` en SQL. (Les 415 autres ont suivi en 3.2.0.)
- **Chaque exercice annonce sa nature** — Exercice, Entraînement, Défi, Étape, Chasse au bug — avec
  une explication au survol.
- **Une page « Réviser »** (bouton 🔄) qui repropose les exercices déjà réussis ayant coûté le plus
  d'essais, et ceux qui commencent à dater. Les refaire ne touche pas à la progression.
- **Sauvegarder et restaurer sa progression** dans un fichier `.json`, sous la barre de progression.
  Tout vivait dans le `localStorage` et nulle part ailleurs : vider les données du navigateur
  effaçait l'ensemble, sans retour possible.
- **Une première marche à chaque projet guidé.** Le module passait des leçons guidées à
  « implémente tout » d'un coup. Trois étapes préparatoires : faire parler la page avant de la faire
  réagir, faire jouer l'ordinateur avant de désigner un vainqueur, afficher une liste avant de la
  sauvegarder. Le module passe de 5 à 8 exercices.
- **`outils/verifier-navigateur.html`**, qui exécute enfin les 63 correcteurs mesurant la page — le
  dernier angle mort, 13 % des exercices. Ni Node ni jsdom ne savent faire de mise en page.
- **`outils/test-interface.js`**, 77 vérifications sur ce que l'élève voit : l'escalade de l'aide,
  le silence de l'éditeur dans les sept langages, la recherche, la révision, la sauvegarde.
- **Deux licences**, un `NOTICE.md`, un `README.md` et un `.gitattributes`.

### Corrigé

- **Les chasses au bug soulignaient leur propre réponse.** Le LISEZMOI promettait que l'éditeur ne
  signale jamais l'erreur d'une chasse au bug — la trouver étant l'exercice. Cette promesse tenait à
  un cas codé en dur pour la leçon `css-1` : les **quatorze autres** voyaient leur faute soulignée en
  rouge avant la première lecture. Le silence vaut maintenant pour les sept langages.
- **L'étiquette d'un exercice suivait sa position, pas sa nature.** Le troisième exercice d'une leçon
  s'appelait toujours « Défi », même quand c'était une chasse au bug.
- **Le saboteur du harnais était aveugle sur les pages.** Seize correcteurs passaient pour « non
  éprouvés » alors qu'ils n'avaient simplement jamais été attaqués : les sélecteurs à attribut
  étaient tronqués au premier guillemet (`a[href^="https"]` devenait `a[href^=`), les sélecteurs
  composés (`ul li a`) refusés en bloc, et une page entièrement vidée jetée comme « pas une copie »
  alors que c'est la copie la plus fausse qui soit.
- **Un vrai correcteur complaisant : `css-22`.** Il ne lisait que le texte du code, et acceptait donc
  une balise `<style>` cassée ou une page dont l'élément visé avait disparu.
- **La recherche ne voyait que les titres des leçons.** Chercher « pointeur » ramenait le titre, mais
  jamais le paragraphe qui l'explique. L'index passe de 318 à 1741 entrées.

### Changé

- **L'interpréteur Python n'est plus chargé au démarrage** mais au premier code Python. Le premier
  affichage descend de 2304 à 1360 Ko.

  > Honnêteté sur le motif : « cela diviserait le temps de démarrage » était faux. Mesuré dans un
  > navigateur, Skulpt coûte 16 ms sur 194. Ce qu'on économise vraiment, c'est la mémoire d'un
  > interpréteur entier gardé pour rien sur une machine modeste.

- Les 22 `data-*.js` **restent** chargés au démarrage : ils pèsent 40 ms, et les différer
  demanderait un manifeste et un chargement asynchrone qui casseraient la page d'accueil, l'index de
  recherche et les trois harnais. 40 ms ne valent pas ça.

### Pour qui reprend le projet

Trois harnais, et aucun ne remplace les autres :

```bash
npm run tout-verifier        # les correcteurs (Node) + l'interface (jsdom)
```

puis `outils/verifier-navigateur.html`, à ouvrir à la main, pour ce qui se mesure.

```
362 exercices rejoués sous Node   — 0 échec, 0 correcteur complaisant
358 copies sabotées présentées    — 358 refusées, 0 non éprouvé
 63 correcteurs de mise en page   — 0 échec, 0 complaisant
 77 vérifications d'interface     — 0 échec
```

---

## 3.0.0 — 2026-09-21

Première version publiée : le logiciel complet.

- 165 leçons, 481 exercices corrigés automatiquement, 12 modules, 7 langages.
- Python (Skulpt embarqué), SQL, C et Java exécutés pour de vrai, hors ligne.
- Éditeur avec coloration des sept langages, qui ne souligne jamais la ligne du curseur.
- Bac à sable multi-fichiers, avec repérage code ↔ page.
- Encyclopédie de 13 mémos, avec recherche.
- `outils/verifier-contenu.js` : rejeu des exercices et mise à l'épreuve des correcteurs.
