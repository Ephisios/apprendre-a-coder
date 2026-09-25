# Journal des versions

Ce qui a changé, dans l'ordre, et *pourquoi*. Les versions suivent
[SemVer](https://semver.org/lang/fr/) : le premier nombre change quand le cours change de forme, le
deuxième quand il gagne quelque chose, le troisième quand on répare.

---

## 3.4.3 — 2026-09-25

**Rien ne change pour l'élève** — 32 vérifications de plus, sur ce qu'il lit et sur ce que
l'application retient.

### Ajouté

- **La console et le verdict**, c'est-à-dire les deux textes qu'on regarde après chaque essai. On
  vérifie qu'un code muet le dit au lieu de laisser un cadre vide, que ce qui précède une erreur
  reste affiché, et qu'un élève qui écrit `print("<b>gras</b>")` **lit ses balises** au lieu de les
  voir interprétées — c'est précisément ce que la leçon lui apprend à observer.

- **Le refus de répéter la console.** Beaucoup de correcteurs renvoient l'erreur du moteur telle
  quelle. Elle est déjà imprimée à quelques centimètres : la répéter mot pour mot ferait croire à
  *deux* problèmes. Le verdict est alors remplacé par une phrase qui désigne la console. Décision
  pédagogique fine, et que rien ne vérifiait.

- **Ce que la navigation retient** : le thème, l'onglet du bac, le plein écran, et l'annonce
  `aria-expanded` du sommaire aux lecteurs d'écran.

### Ce qui n'a pas été écrit, et pourquoi

Les enveloppes d'une ligne — `allerLeconExo` vaut `allerLecon` suivi d'un `setTimeout` — n'ont pas
reçu de contrôle. Les éprouver n'ajouterait que des assertions incapables d'échouer, et les quatre
vues de la section accessibilité les traversent déjà. Un harnais qui ne peut pas rougir ne sert qu'à
se rassurer.

### Ce que les sabotages ont appris

Deux échecs de ma part, aucun du produit.

Un contrôle vivait sous un `if (btnSommaire)` : si le bouton était renommé, **trois vérifications
disparaissaient en silence**. L'absence du bouton est désormais un échec à part entière.

Et mon propre sabotage a raté sa cible : `app.js` contient trois `setAttribute('aria-expanded')`, et
`String.replace` ne remplace que la première occurrence — j'ai donc neutralisé une autre fonction et
conclu à tort que le contrôle ne mordait pas. Visé sur la bonne ligne, il mord.

---

## 3.4.2 — 2026-09-25

**Rien ne change pour l'élève** — 41 vérifications de plus, sur deux endroits que personne ne
regardait : ses projets, et sa capacité à sortir de l'éditeur au clavier.

### Ajouté

- **Les projets du bac à sable.** La sauvegarde de la *progression* était testée depuis longtemps ;
  celle du *travail* de l'élève, jamais — alors qu'il n'y a pas de deuxième copie. On vérifie
  maintenant qu'on ne peut pas supprimer son dernier projet, qu'un refus de confirmation ne touche à
  rien, qu'un projet enregistré avant l'ajout des onglets SQL, C et Java est complété à la volée au
  lieu de casser l'éditeur, et que l'export nomme son fichier correctement dans les cinq onglets.

- **La porte de sortie de l'éditeur.** Une zone de texte qui avale la touche Tab est un piège au
  clavier : on y entre, on n'en sort plus. L'éditeur capture bien Tab — il faut pouvoir indenter —
  mais **Échap relâche la capture**, et l'astuce affichée change pour le dire. Cette porte de sortie
  n'était vérifiée par personne, dans un logiciel qui enseigne l'accessibilité.

### Ce que les sabotages ont appris

Aucun défaut dans le produit. Mais deux contrôles étaient verts **sans rien garantir**, et il a fallu
les casser exprès pour s'en apercevoir.

Compter les projets après une suppression ne prouve rien : si le garde-fou saute, le projet *est*
supprimé, puis `rendreBac` appelle `projetCourant`, qui en recrée aussitôt un vide. Le compte revient
à 1, tout a l'air normal — et le travail de l'élève a disparu. Seul le **nom** le dit.

Et `verifie` compare par égalité stricte : deux tableaux ne sont jamais égaux, donc la première
version du contrôle échouait même sur du code sain. Un contrôle qu'on n'a pas vu passer *et* échouer
n'est pas un contrôle.

---

## 3.4.1 — 2026-09-25

**Rien ne change pour l'élève.** Cette version n'ajoute que des vérifications — mais sur le dernier
morceau de contenu pédagogique que personne ne relisait.

### Ajouté

- **26 vérifications sur les seize messages d'erreur Python.** Skulpt est une bibliothèque tierce et
  ne parle qu'anglais : « bad input on line 2 » pour à peu près toutes les fautes de structure. Deux
  fonctions d'`app.js` relisent le code à la place de l'élève et écrivent en français ce qui cloche.
  C'est du contenu pédagogique pur — ce qu'on lit à l'instant précis où l'on est le plus perdu — et
  aucun harnais ne le touchait, parce que tous rejouent des *solutions*, qui ne plantent pas.

  Les contrôles partent de **vraies fautes exécutées par le vrai Skulpt**, pas de chaînes anglaises
  recopiées à la main. C'est la différence qui compte : le jour où la bibliothèque changera ses
  tournures, toutes les traductions tomberaient silencieusement dans leur dernier `return m` et
  l'élève lirait l'anglais brut. Une ligne compte désormais ces retombées, et doit rester à zéro.

  > Mesure du jour : **14 fautes sur 14 traduites, zéro anglais**, et chaque diagnostic vise juste —
  > y compris la distinction entre « il manque l'indentation à la ligne 2 » et « la ligne 2 est
  > décalée alors que rien ne l'annonce », qui sont des conseils **opposés**. Les intervertir ne
  > laisserait passer aucun anglais : c'est le contrôle de chaque cas qui l'attrape, pas la
  > sentinelle. Les deux sabotages ont été joués avant de garder la section.

---

## 3.4.0 — 2026-09-25

Cinq angles morts, dont deux cachaient un vrai défaut.

### Ajouté

- **`outils/test-moteurs.js`** — 121 vérifications sur les deux interprètes écrits à la main. 82 Ko
  de `sql-moteur.js` et `moteur-cj.js` n'étaient exercés qu'à travers les exercices, donc seulement
  sur ce qu'un exercice se trouve utiliser. Tout le reste n'était vérifié par personne — et un moteur
  qui répond *faux* est pire qu'un moteur qui refuse, parce qu'il enseigne l'erreur.

  Le moteur SQL s'en sort remarquablement : `COUNT(*)` compte les lignes tandis que `COUNT(colonne)`
  saute les valeurs absentes, `AVG` les ignore aussi, `UNION` dédoublonne quand `UNION ALL` garde
  tout, `LEFT JOIN` conserve les lignes sans correspondance. Ce sont les vraies sémantiques SQL, pas
  des approximations.

  > Chaque attente a été mesurée sur le moteur **avant** d'être écrite. Une attente qui tombera plus
  > tard signalera donc un changement de comportement, pas une opinion.

- **Le chemin Worker du moteur JavaScript**, enfin couvert. jsdom n'en fournit pas, donc les dix
  vérifications de la 3.3.1 n'éprouvaient que le *repli*. Le pilote navigateur compare désormais les
  deux chemins sur cinq cas — zéro écart — et met à l'épreuve le garde-fou que **seul** le Worker
  peut offrir : une boucle infinie arrêtée au bout de trois secondes. C'est la seule protection de
  l'élève contre son erreur la plus banale, et personne ne l'avait jamais vérifiée.

- **Le contraste et la visibilité du focus** entrent dans le harnais : ils demandent une mise en
  page, donc jsdom ne pouvait rien en dire.

### Corrigé

- **Ce que le programme avait affiché avant de trébucher était perdu.** En C et en Java, une division
  par zéro ou une case hors du tableau ne rendait que le message d'erreur : `executerCJ` déclarait sa
  machine *dans* le `try`, donc le `catch` ne pouvait pas l'atteindre et renvoyait `logs: []` en
  dur. L'élève perdait la seule chose qui lui disait jusqu'où son programme était allé. Trouvé par le
  nouveau harnais, à sa première exécution.

- **Le bandeau craquait sur téléphone.** Le plus petit palier du CSS était 980 px ; en dessous, la
  rangée du logo tombait à 131 px pour un contenu de 323, et le titre débordait *sous* les boutons —
  on lisait « Apprendr ». Elle prend désormais la ligne entière et les outils passent dessous.
  Mesuré à 375, 560, 700 et 980 px.

- **Sept fichiers restaient en CRLF** alors que `.gitattributes` impose `eol=lf`. Git annonçait une
  réécriture complète à chaque commit.

### Pour qui reprend le projet

```bash
npm run tout-verifier        # les quatre harnais, sans rien ouvrir à la main
```

```
362 exercices rejoués sous Node   — 0 échec, 0 correcteur complaisant
358 copies sabotées présentées    — 358 refusées, 0 non éprouvé
 63 correcteurs de mise en page   — 0 échec, 0 complaisant (navigateur)
 95 vérifications d'interface     — 0 échec, dont 8 d'accessibilité
121 vérifications des moteurs     — 0 échec (SQL, C, Java)
 10 vérifications au navigateur   — 0 échec (Worker, contraste, focus)
425 exercices à trois paliers     — 0 palier cassé, doublé ou inversé
```

Un contrôle a encore menti avant d'être corrigé, et c'est le troisième de cette série : la sonde de
contraste mesurait la page **avant** que l'accueil ne soit peint. Elle trouvait zéro défaut parce
qu'il n'y avait presque rien à mesurer. Elle compte désormais les éléments examinés — 106 sur
l'accueil — et échoue s'il y en a moins de quarante. Un harnais qui ne peut pas échouer n'est pas un
harnais.

---

## 3.3.1 — 2026-09-25

### Corrigé

- **Le repli « sans Worker » faisait échouer une bonne réponse.** `executerJS` lance le code de
  l'élève dans un Worker, et retombe sur une exécution directe quand le navigateur n'en donne pas.
  Ce repli n'avait jamais été exécuté par personne — et il était faux : il rendait la main
  immédiatement, sans attendre les `setTimeout` et `setInterval` que le Worker, lui, surveille.

  Mesuré dans un Chrome réel, Worker désactivé à la main, sur les deux exercices de `jsav-18`
  (« Le temps qui passe ») : **tous deux refusés**, avec « J'attends trois lignes — j'en compte 2 ».
  Un élève écrivant la bonne réponse se voyait reprocher un nombre de lignes, sans le moindre moyen
  de comprendre. Le repli suit désormais les minuteurs, et les éteint avant de rendre la main —
  le Worker le faisait implicitement, en se terminant.

  > Une crainte levée au passage, et c'est l'essentiel de ce qu'on apprend ici : on pouvait redouter
  > que les Workers soient refusés en `file://`, donc que ce repli soit le chemin *normal* d'un
  > projet qui s'ouvre par double-clic. Mesure faite : le Worker fonctionne parfaitement depuis
  > `file://`. Le repli reste un repli.

### Ajouté

- **Dix vérifications sur ce repli.** jsdom ne fournit ni `Worker` ni `URL.createObjectURL` : c'est
  donc toujours lui qui s'exécute dans `test-interface.js`. La couverture était gratuite depuis le
  début, il suffisait de l'appeler.

### Connu, et assumé

- Le repli ne peut pas arrêter une boucle infinie. Le Worker se fait `terminate()` au bout de trois
  secondes et affiche « ton code tourne sans s'arrêter » ; le repli s'exécute sur le fil principal,
  où rien n'interrompt du code synchrone. C'est écrit dans `app.js`, à l'endroit où ça se joue.

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
