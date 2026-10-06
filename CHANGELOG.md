# Journal des versions

Ce qui a changé, dans l'ordre, et *pourquoi*. Les versions suivent
[SemVer](https://semver.org/lang/fr/) : le premier nombre change quand le cours change de forme, le
deuxième quand il gagne quelque chose, le troisième quand on répare.

---

## 3.10.0 — 2026-10-06

Le CSS est terminé. **Ses 25 leçons sont au gabarit**, de la première règle aux valeurs qui
s'adaptent. Avec HTML et « JavaScript — La logique », cela fait **64 leçons sur 168**.

### Changé

- **CSS (8 leçons)**, **CSS 2 (7)** et **CSS 3 (10)** passent au gabarit. De 97-200 mots à
  **443-592**. Aucun exercice n'a été touché : seul le cours a été réécrit.

### Ce que la mesure a établi

Chaque nombre cité dans ces leçons a été relevé dans un vrai Chrome. Six résultats servent
directement d'argument :

- **`width: 200px` + 16 de padding + 2 de bordure donne 236 px à l'écran.** C'est le piège
  fondateur du modèle de boîte, et `css-5` le montre en nombres plutôt qu'en principe.

- **Les marges verticales fusionnent, pas les horizontales.** 20 et 20 donnent 20 px en vertical,
  40 en horizontal. L'asymétrie surprend tout le monde ; elle est maintenant expliquée.

- **`z-index` est purement ignoré sur un élément non positionné.** Mesuré : avec `z-index: 99`
  seul, c'est l'autre carré qui passe devant ; avec `position: relative`, l'ordre s'inverse.
  `css-20` en tire la règle utile — si ton z-index ne fait rien, n'augmente pas la valeur.

- **`transform` ne déplace pas les voisins** : le bloc suivant reste à 28 px, que le précédent
  soit à l'échelle 1 ou 2. C'est toute la force de `css-22`.

- **`position: absolute` sans parent positionné se cale sur la page**, à 0 px du bord — et non
  sur son conteneur, qui était à 88.

- **`::before` n'entre pas dans le `textContent`.** L'élément contient « texte » quand l'écran
  affiche « AVANT texte ». D'où la règle de `css-13` : jamais d'information importante dans un
  `content`.

### Où en est la conversion

**64 leçons sur 168**, contre 39. Leur médiane est de **524 mots** ; celle des 104 restantes, de
149. La médiane du cours entier passe de 155 à **181 mots**.

Trois pistes complètes : HTML, CSS, et « JavaScript — La logique ». Restent les deux autres modules
JavaScript, Python, SQL, C, Java et les projets.

Les encarts à double émoji tombent de 44 à **15**.

---

## 3.9.0 — 2026-10-06

Le module HTML est terminé. **Ses 23 leçons sont au gabarit**, des premières balises au débogage.

### Changé

- **HTML 2 (6 leçons)** et **HTML 3 (8 leçons)** passent au gabarit. De 104-268 mots à **499-638**.
  Chacune gagne un « Pourquoi ça existe », une trace pas à pas, des pièges nommés, un « Dans la
  vraie vie » et un « À retenir ».

  Aucun exercice n'a été touché : seul le cours a été réécrit. Les 504 exercices et leurs 434
  correcteurs sont ceux de la 3.8.0.

### Ce que la mesure a établi

Comme pour la fournée précédente, chaque comportement enseigné a d'abord été lancé dans un vrai
Chrome. Quatre résultats servent directement d'argument dans les leçons :

- **Un `&lt;div&gt;` n'est pas atteignable au clavier ; un `&lt;button&gt;` l'est.** Mesuré, pas
  affirmé : `tabIndex` vaut -1 sur l'un, 0 sur l'autre. C'est le cœur de `html-19` — le faux bouton
  n'est pas une question de style, il est inaccessible.

- **Deux boutons radio de `name` différent se cochent tous les deux** et ne se décochent jamais ;
  avec le même `name`, cocher l'un décoche l'autre. Le symptôme déroutant de `html-11` est donc
  exact, et il ne lève aucune erreur.

- **`&lt;time&gt;` ne change rien à l'affichage.** C'est le cas le plus pur de ce que fait le HTML :
  ajouter du sens sans toucher à l'apparence. `html-16` s'appuie dessus.

- **`&lt;dd&gt;`, `&lt;blockquote&gt;` et `&lt;figure&gt;` portent 40 pixels de marge à gauche**
  par défaut. Un décalage qui surprend quand on ne l'attend pas, et que les leçons annoncent.

### Où en est la conversion

**39 leçons sur 168**, contre 25. Les 39 tiennent une médiane de **536 mots** ; les 129 restantes
sont à 149. Le module HTML rejoint « JavaScript — La logique » : deux modules complets.

Reste le nettoyage des encarts à double émoji — **28 sur 121**, contre 44 ce matin. Ils disparaissent
au fil des réécritures.

---

## 3.8.0 — 2026-10-06

Le cours était **trop court**, et le chiffre le dit mieux qu'une impression : médiane de **155 mots
de cours par leçon**. Un ou deux paragraphes, puis les exercices commençaient. Les 12 leçons déjà
passées au gabarit, elles, tenaient 511 mots. L'écart ne tenait pas au sujet : il tenait à ce qu'on
avait pris le temps d'écrire.

Cette version attaque le début du parcours — ce qu'un débutant lit en premier.

### Changé

- **Les 8 leçons du module HTML passent au gabarit.** De 147-188 mots à **482-676**, soit trois fois
  plus. Chacune gagne un « Pourquoi ça existe », une trace pas à pas, une section « Les pièges »
  nommés, un « Dans la vraie vie » et un « À retenir ».

### Ajouté

- **`html-listes` — « Les listes : à puces ou numérotées »**, détachée de `html-3` qui empilait
  deux sujets sans rapport en 155 mots : la mise en valeur du texte *et* les listes. Les trois
  exercices existants portaient tous sur les listes ; ils suivent la notion dans la leçon neuve, et
  `html-3` reçoit trois exercices écrits pour lui — dont une chasse au bug sur la fermante oubliée.

### Ce que la mesure a corrigé

Aucun comportement n'a été décrit de mémoire : chaque faute enseignée a d'abord été lancée dans un
vrai Chrome. Trois résultats ont changé ce qui allait être écrit.

- **Les guillemets oubliés ne cassent pas un lien.** `href=page2.html` fonctionne — le navigateur
  les rajoute. `html-4` enseignait pourtant l'inverse. Le vrai point de rupture est **l'espace** :
  `alt=Un chat roux` ne garde que `alt="Un"` et invente deux attributs `chat=""` et `roux=""`. Comme
  un texte alternatif fait presque toujours plusieurs mots, c'est en `html-5` que le piège mord.

- **`&lt;b&gt;` et `&lt;strong&gt;` rendent exactement pareil** — graisse 700 tous les deux, comme
  `&lt;i&gt;` et `&lt;em&gt;`. La différence n'est donc pas visuelle du tout : elle est de sens. La
  leçon le dit maintenant ainsi.

- **Un `&lt;h4&gt;` s'affiche à la taille d'un paragraphe**, simplement en gras. Prendre un `h4`
  « pour que ce soit plus petit » revient souvent à n'avoir plus de titre visible.

### Corrigé

- **Les encarts affichaient deux émoji.** Le CSS pose déjà 💡, ⚠️ ou 📌 en tête d'un `astuce`,
  `attention` ou `info` — et **44 encarts sur 150** en retapaient un dans leur texte. Le gabarit
  l'interdisait déjà ; les leçons réécrites sont à jour, les autres restent à nettoyer.

### Où en est la conversion

**25 leçons sur 168**, contre 16. Le module HTML rejoint « JavaScript — La logique ». Reste 143
leçons, dont la médiane est toujours de 153 mots : HTML 2 et 3, puis CSS, dans l'ordre du parcours.

---

## 3.7.0 — 2026-10-04

Le module où l'on apprend à programmer pour de bon n'avait presque aucune question de contrôle :
**un QCM pour douze leçons**. C'est pourtant là que vivent les malentendus les plus coûteux du
cours — ceux qui ne produisent aucune erreur et donnent un résultat faux.

### Ajouté

- **Onze QCM dans « JavaScript — La logique »**, un par leçon qui en manquait. Chacun vise un piège
  **nommé dans sa propre leçon**, et pas une question de mémoire :

  | | le piège | ce qui trompe |
  |---|---|---|
  | `js-3` | `"5" + 3` | donne `"53"`, et `"5" * 3` donne bien 15 |
  | `js-5` | `if (age = 18)` | le bloc s'exécute **toujours**, et la variable a changé |
  | `js-6` | `jour === "samedi" \|\| "dimanche"` | vrai un lundi aussi |
  | `js-8` | `fruits[3]` sur trois fruits | `undefined`, sans la moindre erreur |
  | `js-9` | une fonction qui affiche au lieu de renvoyer | **deux** lignes : 8, puis `undefined` |

  Aucun de ces cas ne lève d'erreur. C'est précisément ce qu'une question peut attraper et qu'un
  exercice, dont on finit par copier la solution, laisse passer.

- **Quatre contrôles sur les QCM** dans le harnais de contenu. app.js ne se plaint jamais d'un QCM
  mal écrit : il **dégrade**. Une bonne réponse sans explication affiche un message vide ; une
  mauvaise réponse sans aide retombe sur « Ce n'est pas la bonne réponse — relis la leçon et
  réessaie », qui n'apprend rien. Le harnais refuse désormais les deux, plus deux choix identiques,
  et une aide posée sur la bonne réponse — presque toujours le signe d'un `bonne` décalé.

  > Les quatre ont été mesurés sur les 70 QCM avant d'être posés : zéro faux positif. Puis chacun a
  > été éprouvé en cassant exprès ce qu'il garde — quatre sur quatre refusent le défaut.

### Changé

- **Un QCM s'annonce « ❓ Question », plus « 🎯 Défi »**. Le porte-outils nommait les exercices
  d'après leur **rang** : un QCM placé en troisième position s'annonçait « Défi 3/3 », alors qu'il
  se répond en vingt secondes. Le libellé suit maintenant le **type**. Les 70 QCM du cours sont
  concernés, pas seulement les nouveaux.

- Les dix leçons `js-1` à `js-10` passent à **quatre entrées**, une première dans le cours. Le
  choix s'est fait contre l'autre option : remplacer un exercice existant. Les trois exercices de
  ces leçons forment une montée — guidé, entraînement, défi — qu'on ne peut pas amputer sans
  perdre quelque chose ; et c'est le module où l'élève a le plus besoin de **taper du code**.
  L'application le prévoyait déjà : sa liste de libellés comptait une quatrième entrée inutilisée.

### Un détail qui n'en est pas un

Sur les 59 QCM d'avant, la bonne réponse n'était **jamais** la quatrième : 31 fois la première,
21 fois la deuxième, 7 fois la troisième, 0 fois la dernière. Un élève attentif peut s'en servir
sans rien comprendre au sujet. Les onze nouveaux se répartissent 3 / 3 / 3 / 2 — la dernière place
comprise.

---

## 3.6.0 — 2026-10-02

Une leçon n'est pas qu'un texte suivi d'exercices : c'est une forme. Jusqu'ici cette forme vivait
dans l'habitude de qui écrivait, et se perdait d'une leçon à l'autre. Elle est maintenant écrite.

### Ajouté

- **`outils/gabarit-lecon.md`** — les sept parties d'une leçon, dans l'ordre : *pourquoi ça existe*,
  la notion, les formes qu'on croisera, un **pas à pas** qui déroule l'exécution ligne par ligne,
  *les pièges*, *dans la vraie vie*, puis un **« À retenir »** de deux à quatre points. Un repli
  *« Aller plus loin »* accueille le « sous le capot » sans alourdir la leçon pour autant.

- **`jsav-fleches` — « Les fonctions fléchées »**, détachée de `jsav-2` qui en portait trop.

### Changé

- **Les douze leçons du module « JavaScript — La logique » passent au gabarit**, plus `py-7`, `j-5`
  et `jsav-2`. Seize leçons sur 167 : la conversion se fera au fil de l'eau, et le compteur du
  harnais dit où elle en est à chaque passage.

### Comment le gabarit se contrôle lui-même

Une leçon **entre** dans le gabarit en posant son bloc « À retenir ». Dès lors le harnais exige tout
le reste : les deux titres obligatoires, la trace pas à pas, un « À retenir » de 2 à 4 points, et 350
mots de cours au moins. Les leçons écrites avant ne sont pas en faute — elles sont seulement
comptées, pour qu'on voie l'avancement plutôt que de le supposer.

> L'inverse aurait été de contrôler les 167 leçons d'un coup : 151 erreurs le premier jour, un
> harnais qu'on apprend à ignorer, et un gabarit mort-né.

### Ce qui a été écarté

Ces leçons venaient d'une branche qui portait aussi une refonte graphique complète — une direction
« Veilleuse ». Seuls le gabarit et les leçons ont été repris ; la refonte a été laissée de côté. Le
seul endroit où les deux se touchaient était la pastille du bloc `.info`, que la refonte remplaçait
par `// à retenir` : elle garde son 📌, cohérent avec le 💡 de `.astuce` et le ⚠️ de `.attention`.

Les styles des trois blocs du gabarit ont été vérifiés jeton par jeton avant d'être repris : ils
n'utilisent que des variables qui existaient déjà (`--trait-net`, `--surface`, `--r2`, `--f-code`,
`--accent-fonce`, `--encre-2`). Aucun n'a eu besoin de la refonte pour s'afficher correctement.

---

## 3.5.0 — 2026-10-01

Une leçon de plus, et elle vient d'une mesure plutôt que d'une envie.

### Ce que le relevé du contenu a montré

Deux choses sont exemplaires et n'ont demandé aucun travail : les **59 QCM ont tous une aide pour
chaque mauvaise réponse** et une explication sur la bonne ; et l'équilibre des leçons est
remarquablement régulier — 3 exercices par leçon presque partout, 1000 à 1400 signes de cours,
aucune leçon sans exercice.

Un trou, en revanche : **aucune chasse au bug en SQL**, 0 sur 48 exercices, là où C en a 2 et Java 3.
Or c'est le langage où déboguer s'apprend le plus mal seul : un `WHERE` mis à la place d'un
`HAVING`, un `COUNT(*)` après un `LEFT JOIN` — ces fautes ne produisent **aucun message d'erreur**,
juste un résultat faux et plausible.

### Ajouté

- **`sql-17` — « Déboguer une requête »**, en fin de module. Trois chasses au bug, une par famille
  d'erreur silencieuse, et une méthode : retirer les clauses une par une en partant de la fin, et
  regarder le nombre de lignes à chaque étape.

  La troisième est la plus parlante : `ORDER BY titre LIMIT 3` présente comme « meilleur film » un
  titre qui n'a même pas de note. Absurde à l'œil, produit sans la moindre erreur.

- **Un invariant qui définit le genre** : *le code de départ d'une chasse au bug doit être refusé par
  son propre correcteur*. S'il passait, l'élève cliquerait « Vérifier » et lirait « Bravo » sans
  avoir rien cherché. Rien ne le vérifiait. Les **18** chasses du cours s'y conforment — 15 sous
  Node, et les 3 dont le correcteur mesure la page, dans le navigateur.

  > Le harnais Node écartait silencieusement ces trois-là. Il les **nomme** désormais, et le pilote
  > navigateur exige d'en éprouver exactement trois : un total qui ne tombe pas juste est la
  > meilleure façon de croire une famille couverte alors qu'elle ne l'est pas.

### Ce qui n'a pas été fait, et pourquoi

Le premier plan était de convertir trois défis SQL existants en chasses au bug, pour respecter le
rythme de trois exercices par leçon. En les lisant, deux d'entre eux se sont révélés être **les
formes correctes des bugs que je voulais faire chercher** — `sql-11 [1]` est le `HAVING AVG` juste,
`sql-13 [2]` le `COUNT(colonne)` juste. Les remplacer aurait supprimé la bonne réponse pour y mettre
l'erreur. Une leçon neuve ne supprime rien et traite la cause plutôt que le symptôme : le manque
n'était pas « trois exercices », c'était que le débogage n'existait pas comme sujet.

---

## 3.4.6 — 2026-10-01

**Rien ne change pour l'élève** — 32 vérifications sur ce que le bac à sable a de plus distinctif,
et qui ne reposait jusqu'ici que sur une mesure faite à la main.

### Ajouté

- **Le repérage code ↔ page.** Survoler une ligne de HTML entoure l'élément qu'elle fabrique ;
  survoler une règle CSS entoure *tous* les éléments qu'elle touche, avec leur compte. C'est le
  meilleur moyen de comprendre ce que fait un sélecteur, et rien ne le vérifiait.

  La pièce maîtresse est `selecteurDeLigne` : à partir du texte du CSS et d'un numéro de ligne, elle
  retrouve la règle à laquelle cette ligne appartient. Pile d'accolades, regard en avant quand la
  ligne *ouvre* la règle, et refus des `@media`, qui ne désignent aucun élément de la page — tout en
  acceptant la règle qu'un `@media` **contient**. C'est ce dernier point qui casse en premier quand
  on touche à la pile.

- **La ligne sous la souris**, dans le pilote navigateur. C'est la seule pièce du repérage que jsdom
  ne peut pas juger : elle additionne les hauteurs réelles des numéros de ligne. On présente au
  calcul le centre vertical de chaque numéro affiché, et on attend la ligne correspondante. Si les
  deux colonnes se désalignaient, le survol désignerait la mauvaise ligne sans que rien ne crie.

### Ce que la répartition apprend

Six des sept fonctions du repérage vivent **côté parent** : seul le dessin du cadre a lieu dans
l'aperçu. C'est ce qui rend l'essentiel testable sous jsdom, alors que la fonctionnalité semblait
réservée à un vrai navigateur. Le travail fait à la main pendant le durcissement du bac — sondes
temporaires, survol déclenché depuis l'intérieur de l'iframe — est désormais permanent, et sans
sonde.

### Ce que les sabotages ont donné

Laisser passer les `@media`, décaler la gouttière d'un cran, retirer le garde qui évite de renvoyer
le même message à chaque pixel, décaler le calcul de la ligne sous la souris : **neuf vérifications
tombent**, réparties sur les deux harnais. Le décalage de la souris se lit directement dans la
sortie — `[2, 3, 4, 5, 6]` au lieu de `[1, 2, 3, 4, 5]`.

---

## 3.4.5 — 2026-10-01

**Rien ne change pour l'élève** — 27 vérifications de plus, sur le chemin le plus parcouru du
logiciel et sur les seules fonctions qui détruisent son travail.

### Ajouté

- **Le clic sur « Vérifier ».** Point d'entrée le plus emprunté de l'application, et aucun harnais ne
  l'exécutait : `verifier-contenu.js` juge les correcteurs un par un, mais en les appelant lui-même.
  Le chemin qui va du clic au verdict — lire la case cochée, choisir le bon message, décider si
  l'essai compte — n'était parcouru par personne.

  Les **59 QCM** en dépendent entièrement : ils n'ont pas de correcteur à eux, toute leur mécanique
  vit là. On vérifie les trois cas, dont les deux qui portent la pédagogie : ne rien avoir coché est
  une étape sautée, pas une faute — donc ce n'est ni peint en rouge ni compté comme un essai raté ;
  et une mauvaise réponse reçoit **l'aide propre à ce choix-là**, celle qui dit pourquoi *celle-ci*
  est fausse, et non un message générique servi à tout le monde.

- **Ce qui efface du travail.** Trois fonctions détruisent ce que l'élève a fait, aucune n'était
  exercée. `recommencerLecon` fait en plus une promesse écrite dans sa propre demande de
  confirmation — « Le reste de ta progression n'est pas touché » — et c'est maintenant une
  vérification. Si elle devenait fausse, l'élève perdrait tout en croyant ne perdre qu'une leçon.

- **L'aller-retour complet de la sauvegarde.** La restauration était vérifiée depuis longtemps,
  l'écriture du fichier ne l'était pas : un export malformé ne se découvre que le jour où l'on en a
  besoin. On exporte, on efface tout, on restaure, on compare. Et on s'assure que les clés d'une
  autre application n'y entrent pas.

- **Un invariant de structure** dans `verifier-contenu.js` : les 425 exercices à éditeur ont tous un
  `codeDepart`. Sans lui, « Recommencer » écrirait littéralement le mot `undefined` dans l'éditeur.
  Mesuré avant d'être écrit — aucun ne manque aujourd'hui.

### Ce que les sabotages ont donné

Servir le message générique au lieu de l'aide par réponse, compter une case non cochée comme une
faute, effacer toute la progression au lieu d'une leçon, vider le fichier de sauvegarde : **8
vérifications tombent**, chacune nommant sa promesse.

---

## 3.4.4 — 2026-09-25

**Rien ne change pour l'élève** — 24 vérifications de plus, sur le câblage. Et un revirement de ma
part, qui vaut d'être écrit.

### Ce que j'avais tort d'écarter

La version précédente affirmait que les fonctions de câblage — celles qui ne font qu'en appeler
d'autres — ne méritaient pas de contrôle, faute de pouvoir échouer. C'était vrai des assertions que
j'avais en tête, et faux du câblage lui-même. Il a un mode de panne, précis et sournois : **un bouton
qui appelle une fonction qui n'existe plus**. Renommer sans toucher au HTML ne casse rien au
chargement — ça casse au clic, chez l'élève, sans un mot dans la console.

### Ajouté

- **Un recensement des gestionnaires.** Les 33 fonctions nommées dans un `onclick`, `onchange` ou
  `oninput` — dans `index.html` comme dans le HTML fabriqué par `app.js` — doivent toutes exister.
  Le contrôle nomme celles qui manquent.

- **La traversée des cinq vues**, qui épingle au passage deux comportements d'accessibilité que rien
  ne couvrait. Chaque vue **s'annonce** dans la zone que lisent les lecteurs d'écran, et le focus
  **repart du titre de la vue** — sans quoi la navigation au clavier recommencerait au tout début du
  document à chaque changement, et il faudrait retraverser le menu entier pour atteindre le contenu.

### Ce que les sabotages ont donné

Renommer une seule fonction appelée par un bouton, retirer le déplacement du focus et retirer
l'annonce : **11 vérifications tombent**, et le recensement nomme le coupable. C'est la section la
plus dense du harnais en rapport entre lignes écrites et pannes couvertes — l'inverse de ce que
j'avais prédit.

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
