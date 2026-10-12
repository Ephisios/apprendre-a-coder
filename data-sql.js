/* ===== Module : SQL — Parler aux bases de données ===== */

/* La base utilisée par toutes les leçons : un petit réseau de cinémas.
   Volontairement courte pour qu'on puisse vérifier un résultat à l'œil. */
window.BASE_SQL = {
  films: {
    colonnes: ['id', 'titre', 'annee', 'genre', 'duree', 'note'],
    lignes: [
      { id: 1, titre: 'Le Dernier Train', annee: 2019, genre: 'Thriller', duree: 118, note: 8.2 },
      { id: 2, titre: 'Sable et Cendres', annee: 2023, genre: 'Drame', duree: 142, note: 9.1 },
      { id: 3, titre: 'Les Voisins', annee: 2021, genre: 'Comédie', duree: 95, note: 6.4 },
      { id: 4, titre: 'Nuit Polaire', annee: 2023, genre: 'Thriller', duree: 107, note: 7.8 },
      { id: 5, titre: 'La Grande Traversée', annee: 2018, genre: 'Aventure', duree: 131, note: 8.7 },
      { id: 6, titre: 'Petit Déjeuner', annee: 2021, genre: 'Comédie', duree: 88, note: 5.9 },
      { id: 7, titre: 'Echo', annee: 2024, genre: 'Drame', duree: 124, note: null },
      { id: 8, titre: 'Le Phare', annee: 2019, genre: 'Drame', duree: 111, note: 7.2 }
    ]
  },
  salles: {
    colonnes: ['id', 'nom', 'ville', 'places'],
    lignes: [
      { id: 1, nom: 'Le Rex', ville: 'Lyon', places: 320 },
      { id: 2, nom: 'Studio 7', ville: 'Lyon', places: 90 },
      { id: 3, nom: 'Le Palace', ville: 'Marseille', places: 210 },
      { id: 4, nom: 'Cinéma Nord', ville: 'Lille', places: 150 }
    ]
  },
  seances: {
    colonnes: ['id', 'film_id', 'salle_id', 'jour', 'spectateurs'],
    lignes: [
      { id: 1, film_id: 2, salle_id: 1, jour: 'lundi', spectateurs: 210 },
      { id: 2, film_id: 2, salle_id: 3, jour: 'lundi', spectateurs: 180 },
      { id: 3, film_id: 3, salle_id: 2, jour: 'mardi', spectateurs: 45 },
      { id: 4, film_id: 1, salle_id: 1, jour: 'mardi', spectateurs: 260 },
      { id: 5, film_id: 4, salle_id: 4, jour: 'mercredi', spectateurs: 120 },
      { id: 6, film_id: 2, salle_id: 4, jour: 'mercredi', spectateurs: 140 },
      { id: 7, film_id: 5, salle_id: 3, jour: 'jeudi', spectateurs: 95 },
      { id: 8, film_id: 1, salle_id: 2, jour: 'jeudi', spectateurs: 80 }
    ]
  }
};

/* Petits utilitaires pour écrire les vérificateurs sans se répéter */
function sqlColonnes(ctx) { return ctx.colonnes.map(c => String(c).toLowerCase()); }
function sqlValeurs(ctx, colonne) {
  const i = sqlColonnes(ctx).indexOf(String(colonne).toLowerCase());
  return i === -1 ? [] : ctx.lignes.map(l => l[i]);
}
function sqlMemeEnsemble(a, b) {
  const n = x => x.map(v => String(v).toLowerCase()).sort();
  const x = n(a), y = n(b);
  return x.length === y.length && x.every((v, i) => v === y[i]);
}
function sqlErreurOuVide(ctx, attendu) {
  if (ctx.erreur) return { ok: false, message: ctx.erreur };
  if (ctx.resultat !== 'select') return { ok: false, message: 'Cet exercice attend une requête <code>SELECT</code> qui affiche des lignes.' };
  if (!ctx.lignes.length && attendu) return { ok: false, message: 'Ta requête est valide mais ne renvoie aucune ligne — le filtre est sans doute trop strict.' };
  return null;
}

window.DATA_SQL = [

/* ---------- sql-1 ---------- */
{
  id: 'sql-1',
  titre: 'Les bases de données, et pourquoi SQL',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Jusqu'ici tes données vivaient dans des variables et des listes : elles disparaissaient dès qu'on fermait la page. Une <strong>base de données</strong>, c'est l'endroit où les données d'une vraie application sont rangées pour de bon — et consultées par milliers de requêtes à la seconde.</p>
<p>SQL est le langage qu'on lui parle. Et il n'est pas comme les autres : tu ne dis pas <em>comment</em> trouver les films de 2023, tu dis <strong>ce que tu veux</strong>. Le moteur décide du chemin. C'est ce qu'on appelle un langage <em>déclaratif</em>, et c'est ce qui le rend si court.</p>

<h2>Des tables, des lignes, des colonnes</h2>
<p>Une base est faite de <strong>tables</strong>, qui ressemblent à des feuilles de tableur. Celle de ce cours en a trois : <code>films</code>, <code>salles</code> et <code>seances</code>.</p>
<p>La table <code>films</code> a six colonnes — <code>id</code>, <code>titre</code>, <code>annee</code>, <code>genre</code>, <code>duree</code>, <code>note</code> — et huit lignes. Chaque ligne est un film ; chaque colonne, une caractéristique.</p>

<h2>La première requête</h2>
<pre class="bloc-code">SELECT * FROM films;</pre>
<p>« Prends tout, dans la table films. » L'étoile veut dire « toutes les colonnes », et le point-virgule termine la requête.</p>
<p>Les mots-clés s'écrivent traditionnellement en majuscules — <code>SELECT</code>, <code>FROM</code> — alors que les noms de tables et de colonnes restent en minuscules. Ce n'est pas obligatoire, mais c'est l'usage partout, et ça rend une requête lisible d'un coup d'œil.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Morceau</th><th>Ce qu'il dit</th></tr>
<tr><td><code>SELECT</code></td><td>« je veux lire »</td></tr>
<tr><td><code>*</code></td><td>toutes les colonnes</td></tr>
<tr><td><code>FROM films</code></td><td>dans cette table</td></tr>
<tr><td><code>;</code></td><td>fin de la requête</td></tr>
</table>
<p>L'ordre d'écriture n'est pas celui de l'exécution : le moteur regarde d'abord le <code>FROM</code> — il lui faut une table avant de pouvoir choisir des colonnes. Cette inversion expliquera plus tard certains messages d'erreur.</p>

<h2>Les pièges</h2>
<p><strong>Se tromper de nom de table.</strong> Le moteur du cours ne te laisse pas deviner : <em>« la table <code>acteurs</code> n'existe pas. Tables disponibles : films, salles, seances. »</em></p>
<p><strong>Se tromper de nom de colonne.</strong> Même service rendu : <em>« la colonne <code>realisateur</code> n'existe pas. Colonnes disponibles : id, titre, annee, genre, duree, note. »</em></p>
<p><strong>Écorcher un mot-clé.</strong> <code>SELCT</code> donne : <em>« une requête commence par SELECT, INSERT, UPDATE ou DELETE — j'ai trouvé « SELCT ». »</em></p>
<p><strong>Demander <code>*</code> par habitude.</strong> Ça marche, et c'est une mauvaise habitude : on transporte des colonnes dont on n'a pas besoin, et la requête casse le jour où la table en gagne une. On nomme ce qu'on veut — c'est l'objet de la leçon suivante.</p>

<h2>Dans la vraie vie</h2>
<p>SQL a été conçu dans les années 1970 et il est toujours là, à peu près inchangé. Banques, sites de commerce, applications mobiles, outils internes : presque tout ce qui stocke des données sérieuses parle SQL. C'est sans doute la compétence informatique la plus durable qu'on puisse apprendre.</p>

<div class="a-retenir">
<ul>
<li>Une base est faite de <strong>tables</strong> : des lignes et des colonnes.</li>
<li><code>SELECT ... FROM table;</code> est le squelette de toute lecture.</li>
<li>On dit <em>ce qu'on veut</em>, pas comment le trouver.</li>
<li>Le moteur nomme les tables et colonnes disponibles quand on se trompe.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi « relationnelle » ?</summary>
<p>Le mot ne vient pas des liens entre tables, comme on le croit souvent, mais d'une notion mathématique : une <em>relation</em> est, en théorie des ensembles, exactement ce qu'est une table — un ensemble de lignes partageant la même structure. Le modèle a été formalisé en 1970 par Edgar Codd, et sa solidité théorique explique en partie pourquoi il a survécu à cinquante ans de modes informatiques.</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche <strong>tout le contenu</strong> de la table <code>films</code>. Déplie « Voir les tables » au-dessus si tu veux jeter un œil avant.',
      codeDepart: '-- Toutes les colonnes, toutes les lignes :\n',
      indices: [
        "Une requête SQL se lit comme une phrase : on dit d’abord CE QU’ON VEUT, puis D’OÙ ça vient.",
        "L’étoile veut dire « toutes les colonnes ». Le nom de la table se met après <code>FROM</code>, et la requête se termine par un point-virgule.",
        "<code>SELECT * FROM films;</code>"
      ],
      solution: 'SELECT * FROM films;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 8) return { ok: false, message: 'J\'attends les 8 films de la table. Sans filtre, <code>SELECT * FROM films</code> les renvoie tous.' };
        if (ctx.colonnes.length !== 6) return { ok: false, message: 'Il manque des colonnes : utilise <code>*</code> pour les avoir toutes (' + ctx.colonnes.length + ' affichée(s) sur 6).' };
        return { ok: true, message: 'Ta première requête SQL. Le <code>*</code> est pratique pour explorer, mais en vrai on précise presque toujours les colonnes voulues — c\'est l\'objet de la leçon suivante.' };
      }
    },
    {
      type: 'sql',
      tables: ['salles'],
      consigne: '<strong>Entraînement :</strong> affiche tout le contenu de la table <code>salles</code>.',
      codeDepart: '',
      indices: [
        "Exactement la même formule que juste avant. Un seul mot change.",
        "Ce mot est celui qui suit <code>FROM</code> : c’est lui qui désigne la table.",
        "<code>SELECT * FROM salles;</code>"
      ],
      solution: 'SELECT * FROM salles;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('ville')) return { ok: false, message: 'Je ne vois pas les colonnes de <code>salles</code> — vérifie le nom de la table après <code>FROM</code>.' };
        if (ctx.lignes.length !== 4) return { ok: false, message: 'La table salles contient 4 lignes ; ta requête en renvoie ' + ctx.lignes.length + '.' };
        return { ok: true, message: 'Quatre salles, deux à Lyon. On va bientôt pouvoir poser de vraies questions à cette base.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Dans une table, à quoi sert la colonne <code>id</code> ?',
      choix: [
        'À identifier chaque ligne de façon unique',
        'À classer les lignes par ordre alphabétique',
        'À compter le nombre de colonnes',
        'À indiquer la date de création de la ligne'
      ],
      bonne: 0,
      explication: 'C\'est la « clé primaire » : deux lignes ne peuvent jamais avoir le même id. C\'est ce qui permet de désigner une ligne précise sans ambiguïté — et de relier les tables entre elles, comme on le verra avec les jointures.',
      aides: [
        null,
        'Le classement se demande au moment de la requête, avec ORDER BY. L\'id, lui, ne bouge pas.',
        'Le nombre de colonnes est fixé par la structure de la table, pas par une valeur dans les lignes.',
        'Ce serait une colonne « date_creation ». L\'id n\'est qu\'un numéro unique.'
      ]
    }
  ]
},

/* ---------- sql-2 ---------- */
{
  id: 'sql-2',
  titre: 'Choisir ses colonnes',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>L'étoile est commode pour explorer. En pratique, on ne la garde presque jamais : on nomme les colonnes voulues.</p>
<p>Trois raisons, et elles comptent. C'est plus <strong>lisible</strong> — on sait ce que la requête rapporte sans ouvrir la table. C'est plus <strong>rapide</strong> — on ne transporte pas des données inutiles. Et c'est plus <strong>solide</strong> — le jour où la table gagne une colonne, la requête ne change pas de comportement.</p>

<h2>Nommer ce qu'on veut</h2>
<pre class="bloc-code">SELECT titre, annee FROM films;</pre>
<p>Les colonnes se séparent par des virgules, et <strong>l'ordre d'écriture est l'ordre d'affichage</strong>. Demander <code>annee, titre</code> donne les mêmes données, dans l'autre sens.</p>

<h2>Renommer : AS</h2>
<pre class="bloc-code">SELECT titre AS film, annee AS sortie FROM films;</pre>
<p><code>AS</code> change le nom de la colonne <em>dans le résultat</em>, sans rien toucher à la table. C'est utile pour rendre un résultat lisible, et indispensable dès qu'une colonne est le fruit d'un calcul — sans quoi elle s'appelle quelque chose comme <code>COUNT(*)</code>.</p>

<h2>Calculer au passage</h2>
<pre class="bloc-code">SELECT titre, duree / 60 AS heures FROM films;</pre>
<p>Une colonne peut être un calcul. Le résultat n'existe que le temps de la requête : la table n'a pas changé.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Requête</th><th>Ce qu'on obtient</th></tr>
<tr><td><code>SELECT * FROM films</code></td><td>8 lignes, 6 colonnes</td></tr>
<tr><td><code>SELECT titre FROM films</code></td><td>8 lignes, 1 colonne</td></tr>
<tr><td><code>SELECT titre, note FROM films</code></td><td>8 lignes, 2 colonnes, dans cet ordre</td></tr>
</table>
<p>Remarque ce qui ne change jamais : <strong>le nombre de lignes</strong>. Choisir des colonnes ne filtre rien — c'est le travail du <code>WHERE</code>, à la leçon suivante.</p>

<h2>Les pièges</h2>
<p><strong>Oublier une virgule.</strong> <code>SELECT titre annee FROM films</code> ne lève pas forcément d'erreur : SQL comprend « la colonne titre, renommée annee ». Tu obtiens une colonne au lieu de deux, sans avertissement. C'est le piège le plus discret de la leçon.</p>
<p><strong>Mettre une virgule en trop.</strong> <code>SELECT titre, FROM films</code> casse, cette fois pour de bon.</p>
<p><strong>Croire que <code>AS</code> renomme la table.</strong> Il ne change que l'en-tête du résultat.</p>
<p><strong>Garder <code>*</code> dans du vrai code.</strong> Ça fonctionne toujours et ça vieillit mal. L'étoile sert à explorer, pas à produire.</p>

<h2>Dans la vraie vie</h2>
<p>Une requête d'application nomme toujours ses colonnes. C'est même l'un des premiers points qu'on regarde en relecture : un <code>SELECT *</code> dans du code qui part en production signale, presque à coup sûr, une requête écrite trop vite.</p>

<div class="a-retenir">
<ul>
<li>On nomme les colonnes : plus lisible, plus rapide, plus solide.</li>
<li>L'ordre des colonnes dans la requête est l'ordre d'affichage.</li>
<li><code>AS</code> renomme une colonne dans le résultat seulement.</li>
<li>Choisir des colonnes ne change jamais le nombre de lignes.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : DISTINCT</summary>
<p><code>SELECT DISTINCT genre FROM films</code> ne garde qu'un exemplaire de chaque valeur — quatre lignes au lieu de huit, puisque la base compte quatre genres. C'est la façon la plus rapide de découvrir les valeurs possibles d'une colonne quand on arrive sur une base inconnue.</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche uniquement les colonnes <code>titre</code> et <code>note</code> de la table <code>films</code>.',
      codeDepart: '',
      indices: [
        "Au lieu de tout demander, on nomme les colonnes qu’on veut. L’étoile disparaît.",
        "Les noms des colonnes se listent juste après <code>SELECT</code>, séparés par une virgule.",
        "<code>SELECT titre, note FROM films;</code>"
      ],
      solution: 'SELECT titre, note FROM films;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        const c = sqlColonnes(ctx);
        if (c.length !== 2) return { ok: false, message: 'J\'attends exactement 2 colonnes (titre et note) — j\'en compte ' + c.length + '. Évite le <code>*</code> ici.' };
        if (!sqlMemeEnsemble(c, ['titre', 'note'])) return { ok: false, message: 'Les colonnes attendues sont <code>titre</code> et <code>note</code>. Tu affiches : ' + c.join(', ') + '.' };
        if (ctx.lignes.length !== 8) return { ok: false, message: 'Sans filtre, les 8 films doivent apparaître.' };
        return { ok: true, message: 'C\'est le réflexe professionnel : ne demander que ce dont on a besoin.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Entraînement :</strong> affiche la liste des <strong>genres différents</strong>, sans doublon. Le résultat doit tenir en 4 lignes.',
      codeDepart: '',
      indices: [
        "Il y a huit films mais seulement quatre genres : plusieurs films partagent le même. Il faut donc écarter les répétitions.",
        "Un mot-clé sert exactement à cela, et il se place <strong>juste après</strong> <code>SELECT</code>, avant le nom de la colonne.",
        "<code>SELECT DISTINCT genre FROM films;</code>"
      ],
      solution: 'SELECT DISTINCT genre FROM films;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length === 8) return { ok: false, message: 'Tu obtiens les 8 lignes, donc les genres sont répétés. Ajoute <code>DISTINCT</code> juste après <code>SELECT</code>.' };
        if (ctx.lignes.length !== 4) return { ok: false, message: 'J\'attends 4 genres différents (Thriller, Drame, Comédie, Aventure) — ta requête en renvoie ' + ctx.lignes.length + '.' };
        return { ok: true, message: 'DISTINCT est l\'outil idéal pour découvrir ce que contient une colonne quand on arrive sur une base inconnue.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Défi :</strong> affiche le <code>titre</code> et la durée <strong>en heures</strong> (la durée est en minutes), en nommant cette colonne calculée <code>heures</code> grâce à <code>AS</code>.',
      codeDepart: '',
      indices: [
        "Une colonne n’est pas forcément stockée telle quelle : on peut en calculer une au passage.",
        "Le calcul s’écrit directement dans le <code>SELECT</code>, et <code>AS</code> lui donne un nom lisible.",
        "<code>SELECT titre, duree / 60 AS heures FROM films;</code>"
      ],
      solution: 'SELECT titre, duree / 60 AS heures FROM films;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        const c = sqlColonnes(ctx);
        if (!c.includes('heures')) return { ok: false, message: 'La colonne calculée doit s\'appeler <code>heures</code> — utilise <code>AS heures</code> pour la renommer. Actuellement : ' + c.join(', ') + '.' };
        const v = sqlValeurs(ctx, 'heures');
        if (!v.length || Math.abs(Number(v[0]) - 118 / 60) > 0.01) return { ok: false, message: 'Le calcul attendu est <code>duree / 60</code> (le premier film dure 118 minutes, soit environ 1,97 heure).' };
        return { ok: true, message: 'Une colonne qui n\'existe pas dans la table, calculée à la volée : c\'est tous les jours qu\'on fait ça (prix TTC, marges, durées, pourcentages).' };
      }
    }
  ]
},

/* ---------- sql-3 ---------- */
{
  id: 'sql-3',
  titre: 'Filtrer avec WHERE',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une table réelle contient des millions de lignes. Les rapporter toutes pour n'en garder que trois serait absurde. <code>WHERE</code> est le mot-clé qui rend SQL réellement utile : il ne garde que les lignes qui remplissent une condition.</p>

<h2>La forme</h2>
<pre class="bloc-code">SELECT titre FROM films WHERE annee = 2023;</pre>
<p>Mesuré : deux lignes, « Sable et Cendres » et « Nuit Polaire ». Le <code>WHERE</code> se place toujours après le <code>FROM</code>.</p>
<p>Les comparaisons disponibles : <code>=</code>, <code>&lt;&gt;</code> ou <code>!=</code> pour « différent », <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</p>

<h2>Un seul signe égal</h2>
<p>C'est le piège qui attend tous ceux qui viennent de la programmation. En SQL, la comparaison s'écrit avec <strong>un seul</strong> <code>=</code> — il n'y a pas d'affectation dans une requête, donc aucune ambiguïté à lever.</p>
<p>Le moteur du cours est explicite : <em>« en SQL, la comparaison s'écrit avec UN SEUL signe égal : <code>=</code> (le <code>==</code> vient des langages de programmation). »</em></p>

<h2>Du texte, entre apostrophes</h2>
<pre class="bloc-code">SELECT titre FROM films WHERE genre = 'Drame';</pre>
<p>Mesuré : trois lignes. Les valeurs de texte vont entre <strong>apostrophes simples</strong>. C'est la forme standard, celle qui fonctionne sur toutes les bases du monde — prends-en l'habitude dès maintenant.</p>
<p>Les nombres, eux, s'écrivent nus : <code>annee = 2023</code>, jamais <code>'2023'</code>.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce que fait le moteur</th></tr>
<tr><td><code>FROM films</code></td><td>il prend les 8 lignes</td></tr>
<tr><td><code>WHERE annee = 2023</code></td><td>il teste chaque ligne, une par une, et en garde 2</td></tr>
<tr><td><code>SELECT titre</code></td><td>sur ces 2 lignes, il ne garde que la colonne titre</td></tr>
</table>
<p>L'ordre réel est donc <code>FROM</code>, puis <code>WHERE</code>, puis <code>SELECT</code> — l'inverse de l'écriture. C'est ce qui explique qu'on ne puisse pas utiliser un alias défini dans le <code>SELECT</code> à l'intérieur du <code>WHERE</code> : au moment du filtre, il n'existe pas encore.</p>

<h2>Les pièges</h2>
<p><strong>Écrire <code>==</code>.</strong> Le réflexe des programmeurs. Le moteur le dit clairement, mais sur une vraie base le message serait bien plus obscur.</p>
<p><strong>Oublier les apostrophes autour d'un texte.</strong> <code>WHERE genre = Drame</code> fait chercher une <em>colonne</em> nommée Drame.</p>
<p><strong>Comparer à NULL avec <code>=</code>.</strong> <code>WHERE note = NULL</code> ne rend <strong>aucune ligne</strong> — jamais, même pour les films sans note. C'est la règle du SQL : comparer quoi que ce soit à NULL ne rend jamais vrai. Il faut <code>IS NULL</code>, et c'est précisément pourquoi ce mot-clé existe.</p>
<p><strong>Oublier que <code>WHERE</code> ne voit pas les calculs de groupe.</strong> On y reviendra avec <code>HAVING</code> ; retiens pour l'instant que <code>WHERE</code> filtre des <em>lignes</em>, une par une.</p>

<h2>Dans la vraie vie</h2>
<p>Un <code>WHERE</code> bien écrit est ce qui sépare une requête instantanée d'une requête qui met trente secondes. Sur des millions de lignes, c'est lui qui détermine si le moteur peut utiliser un index — un raccourci dont tu entendras parler à la leçon sur la conception.</p>

<div class="a-retenir">
<ul>
<li><code>WHERE</code> filtre les lignes, une par une, après le <code>FROM</code>.</li>
<li>Un <strong>seul</strong> signe égal pour comparer.</li>
<li>Le texte va entre apostrophes simples ; les nombres, nus.</li>
<li>Rien ne s'égale à NULL : c'est <code>IS NULL</code> qu'il faut.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la logique à trois valeurs</summary>
<p>En SQL, une condition ne vaut pas seulement vrai ou faux : elle peut valoir <em>inconnu</em>. C'est ce que produit toute comparaison avec NULL, et c'est logique — si la note est inconnue, on ne peut pas savoir si elle vaut 8. Une ligne n'est gardée que si la condition est <strong>vraie</strong> ; « inconnu » ne suffit pas. Cette règle surprend, et elle est à l'origine d'une bonne part des requêtes qui « oublient » des lignes.</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche le <code>titre</code> et l\'<code>annee</code> des films sortis en <strong>2023</strong>.',
      codeDepart: '',
      indices: [
        "Filtrer, c’est ajouter une condition à la requête. Un mot-clé l’annonce.",
        "<code>WHERE</code> se place après le <code>FROM</code>. La condition s’écrit avec un seul <code>=</code> — en SQL, c’est bien une comparaison.",
        "<code>WHERE annee = 2023</code> — l’année est un nombre, donc pas d’apostrophes autour."
      ],
      solution: 'SELECT titre, annee FROM films WHERE annee = 2023;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 2) return { ok: false, message: 'Deux films sont sortis en 2023 ; ta requête en renvoie ' + ctx.lignes.length + '. As-tu bien ajouté <code>WHERE annee = 2023</code> ?' };
        if (!sqlColonnes(ctx).includes('annee')) return { ok: false, message: 'Affiche aussi la colonne <code>annee</code>, pour vérifier le filtre d\'un coup d\'œil.' };
        return { ok: true, message: 'WHERE est le mot-clé que tu écriras le plus souvent de toute ta vie de développeur.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Entraînement :</strong> affiche le <code>titre</code> des films de genre <code>Comédie</code>. Attention aux apostrophes !',
      codeDepart: '',
      indices: [
        "Même structure qu’à l’exercice précédent, mais on filtre sur du texte. Et le texte ne s’écrit pas comme un nombre.",
        "En SQL, un texte se met entre <strong>apostrophes simples</strong> — pas entre guillemets doubles.",
        "<code>WHERE genre = 'Comédie'</code>"
      ],
      solution: "SELECT titre FROM films WHERE genre = 'Comédie';",
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 2) return { ok: false, message: 'Il y a exactement 2 comédies dans la base ; ta requête renvoie ' + ctx.lignes.length + ' ligne(s). Vérifie l\'orthographe exacte du genre, accent compris.' };
        return { ok: true, message: 'Les apostrophes autour du texte : tu viens de franchir le piège n°1 des débutants en SQL.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Défi :</strong> affiche le <code>titre</code> et la <code>note</code> des films dont la note est <strong>strictement supérieure à 8</strong>.',
      codeDepart: '',
      indices: [
        "Une comparaison ne se limite pas à l’égalité : on peut demander « plus grand que ».",
        "« Strictement supérieur » s’écrit <code>&gt;</code>, sans le signe égal. Et un nombre ne prend pas d’apostrophes.",
        "<code>WHERE note &gt; 8</code>"
      ],
      solution: 'SELECT titre, note FROM films WHERE note > 8;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        const notes = sqlValeurs(ctx, 'note').map(Number);
        if (!notes.length) return { ok: false, message: 'Affiche aussi la colonne <code>note</code> pour qu\'on puisse vérifier.' };
        if (notes.some(n => n <= 8)) return { ok: false, message: 'Une note inférieure ou égale à 8 est passée à travers le filtre. Utilise <code>&gt;</code> et non <code>&gt;=</code>.' };
        if (ctx.lignes.length !== 3) return { ok: false, message: 'J\'attends 3 films au-dessus de 8 ; ta requête en renvoie ' + ctx.lignes.length + '.' };
        return { ok: true, message: 'Remarque au passage : le film « Echo » n\'a pas de note (NULL) et n\'apparaît pas. On verra pourquoi dans la leçon suivante.' };
      }
    }
  ]
},

/* ---------- sql-4 ---------- */
{
  id: 'sql-4',
  titre: 'Filtres combinés : AND, OR, LIKE, IN',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une seule condition suffit rarement. On veut les drames <em>récents</em>, les films dont le titre <em>commence par</em> L, ceux qui appartiennent à <em>l'un de ces trois genres</em>. SQL fournit pour cela quelques mots-clés qui évitent d'écrire dix conditions à la main.</p>

<h2>Combiner : AND et OR</h2>
<pre class="bloc-code">SELECT titre FROM films WHERE genre = 'Drame' AND annee &gt; 2020;

SELECT titre FROM films WHERE genre = 'Drame' OR genre = 'Thriller';</pre>
<p><code>AND</code> exige les deux, <code>OR</code> se contente d'une. Comme en Python, <strong><code>AND</code> est prioritaire sur <code>OR</code></strong> — ce qui veut dire qu'en les mélangeant, il faut des parenthèses :</p>
<pre class="bloc-code">WHERE (genre = 'Drame' OR genre = 'Thriller') AND annee &gt; 2020</pre>
<p>Sans elles, le moteur comprend tout autre chose, et ne se plaint pas.</p>

<h2>IN : plusieurs valeurs possibles</h2>
<pre class="bloc-code">SELECT titre FROM films WHERE genre IN ('Drame', 'Comédie');</pre>
<p>Mesuré : cinq lignes. C'est la forme courte de <code>genre = 'Drame' OR genre = 'Comédie'</code>, et elle reste lisible même avec dix valeurs.</p>

<h2>LIKE : chercher un morceau de texte</h2>
<pre class="bloc-code">SELECT titre FROM films WHERE titre LIKE 'L%';</pre>
<p>Deux jokers : <code>%</code> remplace <strong>n'importe quel nombre</strong> de caractères, <code>_</code> en remplace <strong>exactement un</strong>.</p>
<table class="memo-table trace">
<tr><th>Motif</th><th>Ce qu'il attrape</th></tr>
<tr><td><code>'L%'</code></td><td>ce qui commence par L</td></tr>
<tr><td><code>'%train%'</code></td><td>ce qui contient « train »</td></tr>
<tr><td><code>'%e'</code></td><td>ce qui finit par e</td></tr>
<tr><td><code>'_a%'</code></td><td>un caractère, puis un a, puis n'importe quoi</td></tr>
</table>

<h2>Les autres</h2>
<p><code>BETWEEN 2020 AND 2023</code> couvre un intervalle, <strong>bornes incluses</strong>. <code>NOT</code> inverse une condition. Et <code>IS NULL</code> reste le seul moyen de trouver les valeurs absentes.</p>
<p>Ces mots-clés ne sont pas du décor : chacun remplace une écriture plus longue et plus facile à rater. Un <code>BETWEEN</code> dit en un mot ce que deux comparaisons disent en six, et il ne risque pas d'inverser ses bornes en chemin.</p>

<h2>Les pièges</h2>
<p><strong>Oublier les parenthèses en mélangeant <code>AND</code> et <code>OR</code>.</strong> Aucune erreur, un résultat faux. C'est l'erreur la plus coûteuse de cette leçon : <code>A OR B AND C</code> se lit <code>A OR (B AND C)</code>, ce qui est rarement ce qu'on voulait.</p>
<p><strong>Oublier le <code>%</code> dans un <code>LIKE</code>.</strong> <code>LIKE 'Train'</code> sans joker se comporte comme un <code>=</code> : il faut le mot entier, à l'identique.</p>
<p><strong>Croire que <code>BETWEEN</code> exclut les bornes.</strong> Il les inclut, des deux côtés — contrairement au <code>range</code> de Python.</p>
<p><strong>Multiplier les <code>OR</code> au lieu d'un <code>IN</code>.</strong> Ça marche, et six <code>OR</code> alignés deviennent illisibles.</p>

<h2>Dans la vraie vie</h2>
<p><code>LIKE '%mot%'</code> est le fond de toute barre de recherche simple. Sur de grosses tables il devient lent, parce qu'un joker en début de motif empêche le moteur d'utiliser ses index — les moteurs de recherche sérieux passent alors à des outils spécialisés.</p>

<div class="a-retenir">
<ul>
<li><code>AND</code> est prioritaire sur <code>OR</code> : des parenthèses dès qu'on les mélange.</li>
<li><code>IN (...)</code> remplace une série de <code>OR</code>.</li>
<li><code>LIKE</code> avec <code>%</code> (plusieurs caractères) et <code>_</code> (un seul).</li>
<li><code>BETWEEN</code> inclut ses deux bornes.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : NOT IN et les NULL</summary>
<p>Un piège réputé : si la liste d'un <code>NOT IN</code> contient un NULL, la requête ne rend <strong>aucune ligne</strong> — jamais. C'est la logique à trois valeurs qui frappe : « différent d'inconnu » vaut inconnu, donc jamais vrai. C'est l'une des erreurs les plus difficiles à diagnostiquer en SQL, parce que la requête a l'air parfaitement sensée.</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche le <code>titre</code> des <strong>thrillers sortis après 2020</strong> (les deux conditions à la fois).',
      codeDepart: '',
      indices: [
        "Deux conditions doivent être vraies <strong>en même temps</strong>.",
        "Le mot qui les relie est <code>AND</code>. Les deux s’écrivent l’une après l’autre, après un seul <code>WHERE</code>.",
        "<code>WHERE genre = 'Thriller' AND annee &gt; 2020</code>"
      ],
      solution: "SELECT titre FROM films WHERE genre = 'Thriller' AND annee > 2020;",
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 1) return { ok: false, message: 'Un seul film remplit les deux conditions ; ta requête en renvoie ' + ctx.lignes.length + '. Avec <code>OR</code> tu en aurais trop : ici il faut <code>AND</code>.' };
        if (!String(ctx.lignes[0][0]).includes('Polaire')) return { ok: false, message: 'Le film attendu est « Nuit Polaire » (Thriller, 2023).' };
        return { ok: true, message: 'AND resserre le filet, OR l\'élargit. Une confusion entre les deux, et le résultat est silencieusement faux — d\'où l\'importance de vérifier le nombre de lignes.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Entraînement :</strong> affiche le <code>titre</code> des films dont le titre <strong>commence par « Le »</strong>.',
      codeDepart: '',
      indices: [
        "On ne cherche pas une égalité exacte mais un <strong>début</strong> de texte. L’opérateur <code>=</code> ne sait pas faire cela.",
        "<code>LIKE</code> compare avec un motif, dans lequel <code>%</code> remplace « n’importe quelle suite de caractères ».",
        "<code>WHERE titre LIKE 'Le %'</code>"
      ],
      solution: "SELECT titre FROM films WHERE titre LIKE 'Le %';",
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        const titres = ctx.lignes.map(l => String(l[0]));
        if (titres.some(t => !/^le /i.test(t))) return { ok: false, message: 'Un titre qui ne commence pas par « Le » est passé : ' + titres.find(t => !/^le /i.test(t)) + '. Le motif doit être ancré au début : <code>\'Le %\'</code>.' };
        if (ctx.lignes.length !== 2) return { ok: false, message: 'J\'attends 2 films : « Le Dernier Train » et « Le Phare ». Ta requête en renvoie ' + ctx.lignes.length + '. Attention à l\'espace dans le motif : <code>\'Le %\'</code> exclut « Les Voisins ».' };
        return { ok: true, message: 'Note que « Les Voisins » ne sort pas : l\'espace du motif <code>\'Le %\'</code> l\'exclut. LIKE est ce qui alimente toutes les barres de recherche du monde — y compris celle de ton encyclopédie.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Défi :</strong> affiche le <code>titre</code> des films <strong>sans note</strong> (la case est vide).',
      codeDepart: '',
      indices: [
        "Une case vide n’est pas une valeur comme les autres : elle ne vaut rien — pas même zéro, ni une chaîne vide.",
        "C’est pour cela qu’elle ne se compare pas avec <code>=</code> : il faut une écriture particulière, qui se lit comme une phrase anglaise.",
        "<code>WHERE note IS NULL</code>"
      ],
      solution: 'SELECT titre FROM films WHERE note IS NULL;',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (ctx.resultat !== 'select') return { ok: false, message: 'Cet exercice attend une requête <code>SELECT</code>.' };
        if (!ctx.lignes.length) return { ok: false, message: 'Aucun résultat. Si tu as écrit <code>note = NULL</code>, c\'est le piège de la leçon : une case vide ne se compare pas avec <code>=</code>. Écris <code>note IS NULL</code>.' };
        if (ctx.lignes.length !== 1 || !String(ctx.lignes[0][0]).includes('Echo')) return { ok: false, message: 'Un seul film n\'a pas de note : « Echo ». Ta requête renvoie ' + ctx.lignes.length + ' ligne(s).' };
        return { ok: true, message: 'NULL veut dire « inconnu », pas « zéro ». Cette nuance sauve des rapports entiers : une moyenne calculée sur des zéros fantômes est fausse.' };
      }
    }
  ]
},

/* ---------- sql-5 ---------- */
{
  id: 'sql-5',
  titre: 'Trier et limiter',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un résultat sans ordre n'est pas vraiment un résultat. « Les meilleurs films » n'a de sens que trié ; « les dix plus récents » suppose un tri <em>et</em> une limite.</p>
<p>Point important : sans <code>ORDER BY</code>, l'ordre des lignes <strong>n'est pas garanti</strong>. Il paraît stable, puis change le jour où la table grossit ou que le moteur choisit un autre chemin. Si l'ordre compte, il s'écrit.</p>

<h2>ORDER BY</h2>
<pre class="bloc-code">SELECT titre, note FROM films ORDER BY note DESC;</pre>
<ul>
<li><code>ASC</code> — croissant, du plus petit au plus grand, de A à Z. C'est le défaut, on l'écrit rarement ;</li>
<li><code>DESC</code> — décroissant.</li>
</ul>
<p>On peut trier sur plusieurs colonnes : <code>ORDER BY genre, note DESC</code> classe par genre, puis par note décroissante <em>à l'intérieur</em> de chaque genre.</p>

<h2>LIMIT</h2>
<pre class="bloc-code">SELECT titre, note FROM films ORDER BY note DESC LIMIT 3;</pre>
<p>Mesuré : les trois meilleures notes. <code>LIMIT</code> se place en dernier et coupe le résultat.</p>
<p>Il va presque toujours avec un <code>ORDER BY</code> — sans tri, « les 3 premiers » ne veut rien dire, puisque l'ordre n'est pas garanti.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Lignes restantes</th></tr>
<tr><td><code>FROM films</code></td><td>8</td></tr>
<tr><td><code>WHERE</code> (s'il y en a un)</td><td>les lignes gardées</td></tr>
<tr><td><code>ORDER BY note DESC</code></td><td>toujours autant, mais rangées</td></tr>
<tr><td><code>LIMIT 3</code></td><td><strong>3</strong></td></tr>
</table>
<p>L'ordre compte : le tri se fait sur tout le résultat, et la coupe vient ensuite. Inverser les deux donnerait trois lignes au hasard, triées entre elles.</p>

<h2>Les pièges</h2>
<p><strong>Oublier <code>ORDER BY</code> avec un <code>LIMIT</code>.</strong> On obtient trois lignes, mais lesquelles ? Le moteur n'a rien promis. C'est l'erreur qui donne des résultats « qui changent tout seuls ».</p>
<p><strong>Oublier que les NULL se rangent quelque part.</strong> Un tri sur une colonne qui contient des valeurs absentes les place à une extrémité. Un <code>ORDER BY titre LIMIT 1</code> peut donc présenter comme « meilleur film » un titre qui n'a pas de note du tout — on y revient à la leçon sur le débogage.</p>
<p><strong>Trier sur une colonne absente du <code>SELECT</code>.</strong> C'est autorisé : <code>SELECT titre FROM films ORDER BY note</code> fonctionne, même si la note ne s'affiche pas. Surprenant, mais pratique.</p>
<p><strong>Mettre <code>LIMIT</code> ailleurs qu'à la fin.</strong> L'ordre des clauses est fixe : <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>ORDER BY</code>, <code>LIMIT</code>.</p>

<h2>Dans la vraie vie</h2>
<p>Toute page de résultats repose sur ce couple : trier, puis couper. La pagination ajoute un <code>OFFSET</code> — « saute les 20 premiers » — et l'on obtient la page 2. C'est exactement ce que fait ton site de commerce préféré à chaque clic sur « page suivante ».</p>

<div class="a-retenir">
<ul>
<li>Sans <code>ORDER BY</code>, <strong>aucun ordre n'est garanti</strong>.</li>
<li><code>DESC</code> pour décroissant ; on peut trier sur plusieurs colonnes.</li>
<li><code>LIMIT</code> vient en dernier, et appelle presque toujours un tri.</li>
<li>Les valeurs absentes se rangent à une extrémité : attention au premier résultat.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la pagination qui dérive</summary>
<p><code>LIMIT 20 OFFSET 40</code> donne la page 3 — et pose un problème subtil : si une ligne est ajoutée pendant que l'utilisateur navigue, tout se décale, et il peut voir deux fois le même élément ou en sauter un. Les grandes applications utilisent donc une pagination « par curseur » : au lieu de compter des pages, on demande « ce qui vient après cet élément précis ».</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche le <code>titre</code> et la <code>note</code> de tous les films, <strong>du mieux noté au moins bien noté</strong>.',
      codeDepart: '',
      indices: [
        "Le tri se demande à la fin de la requête, après le filtrage s’il y en a un.",
        "<code>ORDER BY</code> suivi de la colonne. Par défaut le tri est croissant : il faut un mot de plus pour l’inverser.",
        "<code>ORDER BY note DESC</code>"
      ],
      solution: 'SELECT titre, note FROM films ORDER BY note DESC;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        const notes = sqlValeurs(ctx, 'note');
        if (!notes.length) return { ok: false, message: 'Affiche la colonne <code>note</code> pour qu\'on puisse vérifier le tri.' };
        const chiffres = notes.filter(n => n !== null && n !== undefined).map(Number);
        for (let i = 1; i < chiffres.length; i++) {
          if (chiffres[i] > chiffres[i - 1]) return { ok: false, message: 'Le tri n\'est pas décroissant : ' + chiffres[i] + ' apparaît après ' + chiffres[i - 1] + '. Ajoute <code>DESC</code> — sans lui, SQL trie du plus petit au plus grand.' };
        }
        if (Number(chiffres[0]) !== 9.1) return { ok: false, message: 'Le premier film devrait être le mieux noté (9.1).' };
        return { ok: true, message: 'Le film sans note se retrouve à part : NULL n\'a pas de place naturelle dans un classement.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Entraînement :</strong> affiche le <code>titre</code> et la <code>note</code> des <strong>3 meilleurs films</strong> seulement.',
      codeDepart: '',
      indices: [
        "Deux choses à enchaîner, et l’ordre compte : couper avant de trier donnerait trois films au hasard.",
        "On trie d’abord, on coupe ensuite. <code>LIMIT</code> vient donc <strong>après</strong> <code>ORDER BY</code>.",
        "<code>ORDER BY note DESC LIMIT 3</code>"
      ],
      solution: 'SELECT titre, note FROM films ORDER BY note DESC LIMIT 3;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 3) return { ok: false, message: 'J\'attends exactement 3 lignes — ajoute <code>LIMIT 3</code> à la fin. Ta requête en renvoie ' + ctx.lignes.length + '.' };
        const notes = sqlValeurs(ctx, 'note').map(Number);
        if (Number(notes[0]) !== 9.1) return { ok: false, message: 'Le podium doit commencer par la meilleure note (9.1) : pense à trier AVANT de limiter.' };
        return { ok: true, message: 'Trier puis couper : c\'est exactement ce que fait un site pour afficher son « Top 3 ».' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Défi :</strong> affiche <code>titre</code>, <code>annee</code> et <code>note</code>, triés par <strong>année décroissante</strong>, et <strong>en cas d\'égalité</strong> par note décroissante.',
      codeDepart: '',
      indices: [
        "Deux critères de tri : le second ne sert qu’à départager les ex æquo du premier.",
        "Ils se listent après un seul <code>ORDER BY</code>, séparés par une virgule. Chacun porte son propre sens de tri.",
        "<code>ORDER BY annee DESC, note DESC</code>"
      ],
      solution: 'SELECT titre, annee, note FROM films ORDER BY annee DESC, note DESC;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        const c = sqlColonnes(ctx);
        if (!c.includes('annee') || !c.includes('note')) return { ok: false, message: 'Affiche les colonnes <code>annee</code> et <code>note</code> pour qu\'on puisse vérifier les deux critères.' };
        const annees = sqlValeurs(ctx, 'annee').map(Number);
        for (let i = 1; i < annees.length; i++) {
          if (annees[i] > annees[i - 1]) return { ok: false, message: 'Le tri par année n\'est pas décroissant (' + annees[i] + ' après ' + annees[i - 1] + ').' };
        }
        const notes = sqlValeurs(ctx, 'note');
        const i2021 = annees.indexOf(2021);
        if (i2021 !== -1 && Number(notes[i2021]) !== 6.4) return { ok: false, message: 'Les deux films de 2021 doivent être départagés par la note décroissante : 6.4 avant 5.9. Ajoute le second critère après une virgule.' };
        return { ok: true, message: 'Le second critère ne sert qu\'aux ex æquo — c\'est ainsi qu\'on obtient un classement stable et prévisible.' };
      }
    }
  ]
},

/* ---------- sql-6 ---------- */
{
  id: 'sql-6',
  titre: 'Compter et calculer',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Jusqu'ici tu obtenais des <em>lignes</em>. Les fonctions de cette leçon font autre chose : elles <strong>résument</strong> tout un ensemble de lignes en une seule valeur. Combien de films ? Quelle note moyenne ? Quelle durée totale ?</p>
<p>C'est le passage de « montre-moi les données » à « dis-moi ce qu'elles racontent » — et c'est pour cela que SQL est l'outil des gens qui analysent.</p>

<h2>Les cinq fonctions</h2>
<pre class="bloc-code">SELECT COUNT(*) FROM films;        -- 8
SELECT SUM(duree) FROM films;      -- 916
SELECT AVG(note) FROM films;       -- 7.614286
SELECT MIN(note) FROM films;       -- 5.9
SELECT MAX(note) FROM films;       -- 9.1</pre>
<p>Tous mesurés sur la base du cours. Une requête d'agrégat rend <strong>une seule ligne</strong>, quel que soit le nombre de lignes derrière.</p>

<h2>Pas à pas : COUNT(*) ou COUNT(colonne) ?</h2>
<pre class="bloc-code">SELECT COUNT(*), COUNT(note) FROM films;   -- 8 | 7</pre>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Résultat</th><th>Ce qu'elle compte</th></tr>
<tr><td><code>COUNT(*)</code></td><td><strong>8</strong></td><td>les <em>lignes</em></td></tr>
<tr><td><code>COUNT(note)</code></td><td><strong>7</strong></td><td>les <em>valeurs renseignées</em></td></tr>
</table>
<p>Mesuré. Un film n'a pas de note : il compte dans les lignes, pas dans les notes. La différence paraît minime et change tout dès qu'on calcule un pourcentage.</p>
<p>Même logique pour <code>AVG</code> : la moyenne mesurée, 7.614286, est calculée sur <strong>sept</strong> notes, pas huit. Les valeurs absentes sont ignorées, jamais comptées comme zéro — ce qui est le bon comportement, mais il faut le savoir.</p>

<h2>Nommer le résultat</h2>
<pre class="bloc-code">SELECT COUNT(*) AS nombre, AVG(note) AS moyenne FROM films;</pre>
<p>Sans <code>AS</code>, la colonne s'appelle <code>COUNT(*)</code> — correct, et pénible à exploiter. On nomme systématiquement les colonnes calculées.</p>

<h2>Les pièges</h2>
<p><strong>Mélanger un agrégat et une colonne normale.</strong> <code>SELECT titre, COUNT(*) FROM films</code> n'a pas de sens : huit titres, mais un seul compte — quel titre afficher ? C'est le <code>GROUP BY</code> de la leçon suivante qui répond.</p>
<p><strong>Croire que <code>AVG</code> traite les absents comme des zéros.</strong> Il les ignore. Pour les compter comme zéro, il faut l'écrire explicitement.</p>
<p><strong>Utiliser <code>COUNT(colonne)</code> en croyant compter les lignes.</strong> Sur une colonne qui contient des absences, le chiffre est plus petit — et l'écart passe inaperçu.</p>
<p><strong>Oublier que le résultat n'a qu'une ligne.</strong> Un <code>ORDER BY</code> sur un agrégat seul ne sert à rien : il n'y a rien à ranger.</p>

<h2>Dans la vraie vie</h2>
<p>Tout tableau de bord repose là-dessus : chiffre d'affaires du mois, panier moyen, nombre de clients actifs. Et la distinction <code>COUNT(*)</code> contre <code>COUNT(colonne)</code> est l'une des premières questions d'entretien en SQL — précisément parce qu'elle sépare ceux qui ont compris les valeurs absentes des autres.</p>

<div class="a-retenir">
<ul>
<li>Un agrégat résume plusieurs lignes en <strong>une seule</strong> valeur.</li>
<li><code>COUNT(*)</code> compte les lignes ; <code>COUNT(colonne)</code> compte les valeurs renseignées.</li>
<li><code>AVG</code>, <code>SUM</code>, <code>MIN</code>, <code>MAX</code> ignorent les valeurs absentes.</li>
<li>On nomme toujours une colonne calculée avec <code>AS</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : compter les valeurs différentes</summary>
<p><code>COUNT(DISTINCT genre)</code> rend 4 : le nombre de genres <em>différents</em>, et non le nombre de films. C'est la réponse à « combien de clients distincts ont commandé ce mois-ci ? », question où <code>COUNT(*)</code> donnerait le nombre de commandes — un chiffre bien plus flatteur, et faux.</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Compte le nombre total de films et nomme le résultat <code>nombre</code>.',
      codeDepart: '',
      indices: [
        "Compter des lignes n’est pas les afficher : le résultat tiendra sur une seule ligne, avec une seule valeur.",
        "<code>COUNT(*)</code> compte les lignes. <code>AS</code> donne un nom à cette colonne calculée — sans lui, elle en porterait un illisible.",
        "<code>SELECT COUNT(*) AS nombre FROM films;</code>"
      ],
      solution: 'SELECT COUNT(*) AS nombre FROM films;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('nombre')) return { ok: false, message: 'Nomme la colonne du résultat <code>nombre</code> avec <code>AS nombre</code>. Actuellement : ' + ctx.colonnes.join(', ') + '.' };
        if (ctx.lignes.length !== 1) return { ok: false, message: 'Un agrégat sans GROUP BY doit renvoyer une seule ligne ; tu en obtiens ' + ctx.lignes.length + '.' };
        if (Number(ctx.lignes[0][0]) !== 8) return { ok: false, message: 'La table contient 8 films — ta requête annonce ' + ctx.lignes[0][0] + '.' };
        return { ok: true, message: 'Une requête, un chiffre. C\'est ce qui alimente tous les tableaux de bord.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Entraînement :</strong> calcule la <strong>note moyenne</strong> de tous les films, en nommant la colonne <code>moyenne</code>.',
      codeDepart: '',
      indices: [
        "Même forme qu’au précédent : un seul calcul, une seule ligne en résultat. Seule la fonction change.",
        "La moyenne s’écrit <code>AVG</code>, et elle prend en argument la <strong>colonne</strong> à moyenner — pas l’étoile.",
        "<code>SELECT AVG(note) AS moyenne FROM films;</code>"
      ],
      solution: 'SELECT AVG(note) AS moyenne FROM films;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('moyenne')) return { ok: false, message: 'Nomme la colonne <code>moyenne</code> avec <code>AS moyenne</code>.' };
        const v = Number(ctx.lignes[0][0]);
        if (Math.abs(v - 7.614286) > 0.01) return { ok: false, message: 'La moyenne attendue est d\'environ 7.61. Tu obtiens ' + v + '. Utilise <code>AVG(note)</code>.' };
        return { ok: true, message: 'Remarque : AVG ignore le film sans note. Il divise par 7, pas par 8 — c\'est le bon comportement, une note inconnue ne doit pas compter comme un zéro.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Défi :</strong> combien de films sont sortis <strong>après 2020</strong> ? Une seule ligne, une seule valeur, nommée <code>recents</code>.',
      codeDepart: '',
      indices: [
        "Deux choses vues séparément se rencontrent ici : compter, et filtrer.",
        "Le <code>WHERE</code> agit <strong>avant</strong> le comptage : il écarte des lignes, puis <code>COUNT</code> compte celles qui restent.",
        "<code>SELECT COUNT(*) AS recents FROM films WHERE annee &gt; 2020;</code>"
      ],
      solution: 'SELECT COUNT(*) AS recents FROM films WHERE annee > 2020;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('recents')) return { ok: false, message: 'Nomme la colonne <code>recents</code> avec <code>AS recents</code>.' };
        if (ctx.lignes.length !== 1) return { ok: false, message: 'J\'attends une seule ligne avec le compte. Si tu en as plusieurs, tu as probablement oublié <code>COUNT(*)</code>.' };
        if (Number(ctx.lignes[0][0]) !== 5) return { ok: false, message: '5 films sont sortis après 2020 : deux de 2021, deux de 2023 et un de 2024. Tu annonces ' + ctx.lignes[0][0] + ' — vérifie que ta condition est bien <code>annee &gt; 2020</code>.' };
        return { ok: true, message: 'WHERE filtre les lignes, COUNT compte ce qui reste : l\'ordre des opérations compte autant que les mots-clés.' };
      }
    }
  ]
},

/* ---------- sql-7 ---------- */
{
  id: 'sql-7',
  titre: 'Regrouper avec GROUP BY',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Compter tous les films est utile une fois. Compter les films <strong>par genre</strong>, c'est là que SQL devient impressionnant : une ligne de plus, et l'on passe d'un chiffre à un tableau complet.</p>
<p><code>GROUP BY</code> fait des paquets de lignes qui partagent une même valeur, puis applique l'agrégat à chaque paquet séparément.</p>

<h2>La forme</h2>
<pre class="bloc-code">SELECT genre, COUNT(*) AS nombre
FROM films
GROUP BY genre;</pre>
<p>Mesuré : quatre lignes — Thriller 2, Drame 3, Comédie 2, Aventure 1. Une ligne par genre, au lieu d'une ligne unique.</p>
<p>La règle qui gouverne tout : <strong>ce qui est dans le <code>SELECT</code> doit être soit dans le <code>GROUP BY</code>, soit dans un agrégat</strong>. Rien d'autre n'a de sens — pour un paquet de trois films, quel <code>titre</code> afficher ?</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td><code>FROM films</code></td><td>8 lignes</td></tr>
<tr><td><code>GROUP BY genre</code></td><td>elles se rangent en <strong>4 paquets</strong></td></tr>
<tr><td><code>COUNT(*)</code></td><td>compté <em>dans chaque paquet</em> : 2, 3, 2, 1</td></tr>
<tr><td><code>SELECT genre, ...</code></td><td>4 lignes de résultat</td></tr>
</table>
<p>Le point à visualiser est le deuxième : après le regroupement, il n'y a plus huit lignes mais quatre groupes. Tout ce qui suit travaille sur des groupes, plus sur des lignes.</p>

<h2>Grouper sur plusieurs colonnes</h2>
<pre class="bloc-code">SELECT genre, annee, COUNT(*) FROM films GROUP BY genre, annee;</pre>
<p>Un paquet par <em>combinaison</em> de genre et d'année. On obtient logiquement plus de groupes, et moins de lignes dans chacun.</p>

<h2>Les pièges</h2>
<p><strong>Mettre une colonne libre dans le <code>SELECT</code>.</strong> <code>SELECT genre, titre, COUNT(*) ... GROUP BY genre</code> est refusé par la plupart des bases — et quand une base l'accepte, elle choisit un titre au hasard dans le paquet. Le résultat est faux sans être signalé.</p>
<p><strong>Vouloir filtrer les groupes avec <code>WHERE</code>.</strong> Le moteur du cours est net : <em>« la fonction <code>COUNT()</code> ne peut pas s'utiliser ici (elle sert à résumer un groupe de lignes, dans SELECT ou HAVING). »</em> C'est <code>HAVING</code> qu'il faut, à la leçon suivante.</p>
<p><strong>Confondre « filtrer avant » et « filtrer après ».</strong> <code>WHERE</code> retire des lignes <em>avant</em> le regroupement ; <code>HAVING</code> retire des groupes <em>après</em>. Les deux peuvent coexister dans la même requête, et ils ne font pas la même chose.</p>
<p><strong>Oublier le tri.</strong> L'ordre des groupes n'est pas garanti : un <code>ORDER BY</code> reste nécessaire.</p>

<h2>Dans la vraie vie</h2>
<p>Ventes par mois, clients par pays, erreurs par type : tout rapport commence par un <code>GROUP BY</code>. C'est aussi ce que fait un tableau croisé dynamique de tableur — en moins souple et plus lentement.</p>

<div class="a-retenir">
<ul>
<li><code>GROUP BY</code> fait des paquets ; l'agrégat s'applique à <em>chaque</em> paquet.</li>
<li>Dans le <code>SELECT</code> : soit une colonne du <code>GROUP BY</code>, soit un agrégat.</li>
<li><code>WHERE</code> filtre avant le regroupement, <code>HAVING</code> après.</li>
<li>L'ordre des groupes n'est pas garanti.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : l'ordre réel des clauses</summary>
<p>Le moteur exécute dans cet ordre : <code>FROM</code>, <code>WHERE</code>, <code>GROUP BY</code>, <code>HAVING</code>, <code>SELECT</code>, <code>ORDER BY</code>, <code>LIMIT</code>. Connaître cette liste répond d'un coup à la plupart des questions « pourquoi ça ne marche pas » : un alias défini dans le <code>SELECT</code> n'existe pas encore pour le <code>WHERE</code>, mais il existe pour l'<code>ORDER BY</code>, qui vient après.</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche <strong>le nombre de films par genre</strong> : la colonne <code>genre</code> et un compte nommé <code>nombre</code>.',
      codeDepart: '',
      indices: [
        "Jusqu’ici, un agrégat donnait UNE ligne pour toute la table. Ici on en veut une par genre.",
        "<code>GROUP BY</code> découpe la table en paquets. L’agrégat s’applique alors à chaque paquet séparément.",
        "<code>SELECT genre, COUNT(*) AS nombre FROM films GROUP BY genre;</code>"
      ],
      solution: 'SELECT genre, COUNT(*) AS nombre FROM films GROUP BY genre;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 4) return { ok: false, message: 'J\'attends 4 lignes, une par genre. Tu en obtiens ' + ctx.lignes.length + (ctx.lignes.length === 8 ? ' — il manque le <code>GROUP BY genre</code>.' : '.') };
        if (!sqlColonnes(ctx).includes('nombre')) return { ok: false, message: 'Nomme la colonne de comptage <code>nombre</code> avec <code>AS nombre</code>.' };
        const total = sqlValeurs(ctx, 'nombre').reduce((s, v) => s + Number(v), 0);
        if (total !== 8) return { ok: false, message: 'La somme des comptes devrait faire 8 (le total des films). Elle fait ' + total + '.' };
        return { ok: true, message: 'Une ligne par groupe, et le compte de chacun : tu viens d\'écrire ton premier rapport.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Entraînement :</strong> affiche la <strong>note moyenne par genre</strong> (colonnes <code>genre</code> et <code>moyenne</code>), du genre le mieux noté au moins bien noté.',
      codeDepart: '',
      indices: [
        "Même structure que l’exercice précédent, avec un agrégat différent et un tri en plus.",
        "On peut trier sur le nom donné par <code>AS</code>, alors même que cette colonne n’existe pas dans la table.",
        "<code>GROUP BY genre ORDER BY moyenne DESC</code>"
      ],
      solution: 'SELECT genre, AVG(note) AS moyenne FROM films GROUP BY genre ORDER BY moyenne DESC;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 4) return { ok: false, message: 'J\'attends 4 lignes, une par genre — as-tu bien mis <code>GROUP BY genre</code> ?' };
        if (!sqlColonnes(ctx).includes('moyenne')) return { ok: false, message: 'Nomme la colonne calculée <code>moyenne</code> avec <code>AS moyenne</code>.' };
        const m = sqlValeurs(ctx, 'moyenne').map(Number);
        for (let i = 1; i < m.length; i++) {
          if (m[i] > m[i - 1]) return { ok: false, message: 'Le tri doit être décroissant : ' + m[i] + ' ne peut pas venir après ' + m[i - 1] + '. Ajoute <code>ORDER BY moyenne DESC</code>.' };
        }
        if (Math.abs(m[0] - 8.7) > 0.05) return { ok: false, message: 'Le genre le mieux noté est Aventure, avec 8.7 de moyenne. Ton premier résultat affiche ' + m[0] + '.' };
        return { ok: true, message: 'Filtrer, regrouper, calculer, trier : tu maîtrises maintenant l\'enchaînement complet d\'une requête d\'analyse.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Défi :</strong> combien de films <strong>par année</strong> ? Affiche <code>annee</code> et un compte nommé <code>nombre</code>, de l\'année la plus récente à la plus ancienne.',
      codeDepart: '',
      indices: [
        "Le regroupement ne se limite pas aux catégories : n’importe quelle colonne peut servir de critère.",
        "Regrouper sur l’année donne un paquet par année. Le tri, lui, se fait sur cette même colonne.",
        "<code>GROUP BY annee ORDER BY annee DESC</code>"
      ],
      solution: 'SELECT annee, COUNT(*) AS nombre FROM films GROUP BY annee ORDER BY annee DESC;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 5) return { ok: false, message: 'La base couvre 5 années différentes (2018, 2019, 2021, 2023, 2024) ; ta requête renvoie ' + ctx.lignes.length + ' ligne(s).' };
        const a = sqlValeurs(ctx, 'annee').map(Number);
        if (a[0] !== 2024) return { ok: false, message: 'La première ligne doit être l\'année la plus récente (2024) — ajoute <code>ORDER BY annee DESC</code>.' };
        if (!sqlColonnes(ctx).includes('nombre')) return { ok: false, message: 'Nomme le compte <code>nombre</code> avec <code>AS nombre</code>.' };
        return { ok: true, message: 'Ce type de requête produit directement les histogrammes que tu vois dans les rapports : une ligne, une barre.' };
      }
    }
  ]
},

/* ---------- sql-8 ---------- */
{
  id: 'sql-8',
  titre: 'Modifier les données',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Jusqu'ici tu ne faisais que <em>lire</em>. Trois commandes permettent d'écrire — et elles méritent le respect, car elles changent la base pour de bon. Une lecture ratée ne coûte rien ; une écriture ratée peut coûter très cher.</p>

<h2>INSERT : ajouter une ligne</h2>
<pre class="bloc-code">INSERT INTO films (id, titre, annee, genre, duree, note)
VALUES (9, 'Le Silence', 2024, 'Drame', 101, 7.5);</pre>
<p>On nomme les colonnes, puis on donne les valeurs <strong>dans le même ordre</strong>. Nommer les colonnes n'est pas obligatoire, et c'est fortement conseillé : sans cela, la requête casse dès que la table change.</p>

<h2>UPDATE : modifier</h2>
<pre class="bloc-code">UPDATE films SET note = 8.5 WHERE id = 3;</pre>
<p><code>SET</code> dit quoi changer, <code>WHERE</code> dit où. On peut modifier plusieurs colonnes d'un coup, séparées par des virgules.</p>

<h2>DELETE : supprimer</h2>
<pre class="bloc-code">DELETE FROM films WHERE id = 9;</pre>
<p>Pas de <code>SELECT</code>, pas de colonnes : on supprime des <em>lignes</em> entières.</p>

<h2>Pas à pas : le WHERE qui sauve</h2>
<table class="memo-table trace">
<tr><th>Requête</th><th>Effet</th></tr>
<tr><td><code>UPDATE films SET note = 10 WHERE id = 3</code></td><td>un film modifié</td></tr>
<tr><td><code>UPDATE films SET note = 10</code></td><td><strong>les 8 films</strong> passent à 10</td></tr>
<tr><td><code>DELETE FROM films WHERE id = 9</code></td><td>un film supprimé</td></tr>
<tr><td><code>DELETE FROM films</code></td><td><strong>la table est vidée</strong></td></tr>
</table>
<p>Les lignes 2 et 4 ne provoquent aucune erreur. Elles sont parfaitement valides — et c'est exactement ce qui les rend dangereuses.</p>
<p>Le réflexe des professionnels tient en une phrase : <strong>on écrit toujours le <code>WHERE</code> avant le reste</strong>. Certains vont plus loin et testent d'abord la condition avec un <code>SELECT</code>, pour voir quelles lignes seraient touchées.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le <code>WHERE</code>.</strong> C'est l'incident classique du métier, celui qu'on raconte en soirée. Aucun moteur ne demande confirmation.</p>
<p><strong>Croire qu'on peut annuler.</strong> Sans transaction ouverte, une écriture est immédiate et définitive. Il n'y a pas de bouton « annuler » en SQL.</p>
<p><strong>Oublier une colonne obligatoire dans un <code>INSERT</code>.</strong> La base refuse, et c'est une bonne nouvelle : elle protège sa cohérence.</p>
<p><strong>Réutiliser un identifiant existant.</strong> La clé primaire doit être unique — la base refusera, et c'est précisément son rôle.</p>

<h2>Dans la vraie vie</h2>
<p>Dans une vraie application, ces trois commandes sont presque toujours entourées d'une <strong>transaction</strong> : un bloc où plusieurs écritures réussissent ensemble, ou échouent ensemble. C'est ce qui garantit qu'un virement ne débite jamais un compte sans créditer l'autre.</p>

<div class="a-retenir">
<ul>
<li><code>INSERT INTO ... VALUES</code>, <code>UPDATE ... SET ... WHERE</code>, <code>DELETE FROM ... WHERE</code>.</li>
<li>Sans <code>WHERE</code>, un <code>UPDATE</code> ou un <code>DELETE</code> touche <strong>toute la table</strong>, sans avertir.</li>
<li>On écrit le <code>WHERE</code> en premier — et on le teste au <code>SELECT</code> avant.</li>
<li>Une écriture est immédiate : il n'y a pas d'annulation.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la transaction</summary>
<p><code>BEGIN</code> ouvre une transaction, <code>COMMIT</code> valide tout, <code>ROLLBACK</code> annule tout. Entre les deux, rien n'est visible des autres utilisateurs. C'est la propriété la plus précieuse des bases relationnelles — et la raison pour laquelle les banques les utilisent toujours, cinquante ans après leur invention.</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Ajoute un film à la table : <code>id</code> 9, titre <code>Aurore</code>, année 2024, genre <code>Drame</code>, durée 101, note 7.4.',
      codeDepart: '',
      indices: [
        "Jusqu’ici tu n’as fait que lire. Ajouter une ligne demande un autre verbe, et une autre forme.",
        "On nomme d’abord les colonnes entre parenthèses, puis les valeurs dans le <strong>même ordre</strong>, après <code>VALUES</code>.",
        "<code>INSERT INTO films (id, titre, …) VALUES (9, 'Aurore', …);</code> — textes entre apostrophes, nombres sans."
      ],
      solution: "INSERT INTO films (id, titre, annee, genre, duree, note) VALUES (9, 'Aurore', 2024, 'Drame', 101, 7.4);",
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (ctx.resultat !== 'insert') return { ok: false, message: 'Cet exercice attend une requête <code>INSERT INTO</code>.' };
        const f = ctx.base.films.lignes;
        if (f.length !== 9) return { ok: false, message: 'La table devrait contenir 9 films après l\'ajout ; elle en a ' + f.length + '.' };
        const nouveau = f.find(l => Number(l.id) === 9);
        if (!nouveau) return { ok: false, message: 'Je ne trouve pas de film avec l\'id 9.' };
        if (nouveau.titre !== 'Aurore') return { ok: false, message: 'Le titre attendu est « Aurore » — j\'ai trouvé « ' + nouveau.titre + ' ». Vérifie l\'ordre des valeurs par rapport aux colonnes.' };
        if (Number(nouveau.annee) !== 2024 || Number(nouveau.duree) !== 101) return { ok: false, message: 'Les valeurs ne correspondent pas aux colonnes annoncées : année 2024, durée 101. Vérifie que l\'ordre des VALUES suit exactement l\'ordre des colonnes.' };
        return { ok: true, message: 'Ligne ajoutée. Remarque qu\'un INSERT n\'affiche aucun tableau : il agit, il ne raconte pas.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Entraînement :</strong> le film <code>Les Voisins</code> a été réévalué : mets sa note à <code>8.5</code>. Attention à ne toucher que lui !',
      codeDepart: '',
      indices: [
        "Modifier une ligne est facile. Ce qui est dangereux, c’est d’oublier de dire <strong>laquelle</strong>.",
        "<code>UPDATE … SET …</code> change une valeur, et le <code>WHERE</code> désigne la cible. Sans lui, <strong>tous</strong> les films prendraient cette note.",
        "<code>UPDATE films SET note = 8.5 WHERE titre = 'Les Voisins';</code>"
      ],
      solution: "UPDATE films SET note = 8.5 WHERE titre = 'Les Voisins';",
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (ctx.resultat !== 'update') return { ok: false, message: 'Cet exercice attend une requête <code>UPDATE</code>.' };
        const f = ctx.base.films.lignes;
        const cible = f.find(l => l.titre === 'Les Voisins');
        if (Number(cible.note) !== 8.5) return { ok: false, message: 'La note des « Voisins » devrait être 8.5 — elle vaut ' + cible.note + '.' };
        const touches = f.filter(l => Number(l.note) === 8.5).length;
        if (touches > 1) return { ok: false, message: 'Aïe : ' + touches + ' films ont maintenant la note 8.5. Tu as oublié le <code>WHERE</code> — l\'UPDATE a modifié toute la table. C\'est exactement l\'accident décrit dans la leçon.' };
        return { ok: true, message: 'Une seule ligne touchée, grâce au WHERE. Dans la vraie vie, cette ligne de code est la différence entre une correction et une catastrophe.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Défi :</strong> supprime tous les films sortis <strong>avant 2020</strong>. (Vérifie mentalement combien de lignes ça représente avant de lancer !)',
      codeDepart: '',
      indices: [
        "Même avertissement qu’au précédent, en pire : une suppression ne se rattrape pas.",
        "<code>DELETE FROM</code> n’a pas besoin de <code>SET</code> : la table, puis le <code>WHERE</code> qui désigne les lignes à effacer.",
        "<code>DELETE FROM films WHERE annee &lt; 2020;</code>"
      ],
      solution: 'DELETE FROM films WHERE annee < 2020;',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (ctx.resultat !== 'delete') return { ok: false, message: 'Cet exercice attend une requête <code>DELETE FROM</code>.' };
        const f = ctx.base.films.lignes;
        if (f.length === 0) return { ok: false, message: 'La table est vide ! Tu as supprimé les 8 films : c\'est le <code>DELETE</code> sans <code>WHERE</code>, l\'accident classique. Ajoute la condition.' };
        if (f.length !== 5) return { ok: false, message: '3 films sont antérieurs à 2020 (2018, 2019, 2019), il devrait donc en rester 5. Il en reste ' + f.length + '.' };
        if (f.some(l => Number(l.annee) < 2020)) return { ok: false, message: 'Il reste un film d\'avant 2020 — vérifie ta comparaison.' };
        return { ok: true, message: 'Suppression ciblée réussie. Retiens le réflexe : écris d\'abord <code>SELECT * FROM films WHERE …</code> pour voir ce que tu t\'apprêtes à détruire.' };
      }
    }
  ]
},

/* ---------- sql-9 ---------- */
{
  id: 'sql-9',
  titre: 'Relier deux tables : JOIN',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Voici l'idée centrale des bases relationnelles. Regarde la table <code>seances</code> : elle ne contient pas le titre du film, mais un <code>film_id</code>. Pourquoi faire compliqué ?</p>
<p>Parce que répéter une information est la source de tous les maux. Si chaque séance portait le titre complet, il faudrait le corriger partout le jour d'une faute de frappe — et deux lignes finiraient fatalement par se contredire. On stocke donc l'information <strong>une seule fois</strong>, et on la référence.</p>

<h2>La jointure</h2>
<pre class="bloc-code">SELECT films.titre, seances.jour
FROM films
JOIN seances ON films.id = seances.film_id;</pre>
<p>Mesuré : huit lignes. <code>ON</code> dit comment les deux tables se correspondent — ici, l'<code>id</code> d'un film et le <code>film_id</code> d'une séance.</p>
<p>Quand une colonne existe dans les deux tables, on la préfixe du nom de sa table. Beaucoup de gens le font systématiquement : la requête reste lisible même quand on ne connaît pas le schéma.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>8 films, 8 séances</td><td>deux tables séparées</td></tr>
<tr><td><code>JOIN ... ON</code></td><td>chaque séance retrouve son film</td></tr>
<tr><td>résultat</td><td><strong>8 lignes</strong> — une par séance</td></tr>
</table>
<p>Le nombre de lignes du résultat suit les <em>correspondances</em>, pas les tables. Un film qui a trois séances apparaît trois fois ; un film sans séance <strong>disparaît</strong>.</p>
<p>Cette disparition n'est pas un bug : <code>JOIN</code> ne garde que ce qui s'apparie. Pour garder les orphelins, il existe <code>LEFT JOIN</code> — c'est l'objet d'une leçon du module suivant.</p>

<h2>Les alias</h2>
<pre class="bloc-code">SELECT f.titre, s.jour
FROM films f
JOIN seances s ON f.id = s.film_id;</pre>
<p>Une lettre après le nom de la table suffit à la renommer pour la requête. Indispensable dès qu'il y a trois tables.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le <code>ON</code>.</strong> Sans condition, certaines bases apparient <em>chaque</em> ligne avec <em>chaque</em> ligne : 8 films × 8 séances font 64 lignes. Le résultat paraît plausible, et il est absurde.</p>
<p><strong>Se tromper de colonnes dans le <code>ON</code>.</strong> <code>ON films.id = seances.id</code> compare deux identifiants qui n'ont rien à voir. La requête fonctionne et rend n'importe quoi.</p>
<p><strong>Oublier que les lignes se multiplient.</strong> Après une jointure, <code>COUNT(*)</code> ne compte plus les films mais les correspondances. C'est l'une des erreurs les plus fréquentes des rapports faux.</p>
<p><strong>Oublier le préfixe sur une colonne ambiguë.</strong> Si les deux tables ont une colonne <code>id</code>, le moteur ne peut pas deviner.</p>

<h2>Dans la vraie vie</h2>
<p>Une requête d'application joint couramment trois à six tables : commandes, clients, produits, adresses. C'est ce découpage — ne jamais répéter une information — qui permet à une base de rester cohérente avec des millions de lignes et des centaines d'utilisateurs simultanés.</p>

<div class="a-retenir">
<ul>
<li>On stocke une information <strong>une seule fois</strong> et on la référence par son identifiant.</li>
<li><code>JOIN ... ON</code> dit comment les deux tables se correspondent.</li>
<li>Le résultat compte les <em>correspondances</em> : un film sans séance disparaît.</li>
<li>Après une jointure, <code>COUNT(*)</code> ne compte plus ce qu'on croit.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la clé étrangère</summary>
<p><code>film_id</code> est une <em>clé étrangère</em> : une colonne qui pointe vers la clé primaire d'une autre table. Déclarée comme telle, la base refuse alors d'insérer une séance pour un film inexistant, et peut supprimer automatiquement les séances d'un film supprimé. C'est ce qui garantit qu'une base ne contient jamais de référence dans le vide.</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['seances', 'films'],
      consigne: 'Affiche pour chaque séance : le <code>jour</code>, le <code>titre</code> du film, et le nombre de <code>spectateurs</code>. Il faut relier <code>seances</code> et <code>films</code>.',
      codeDepart: 'SELECT seances.jour, films.titre, seances.spectateurs\nFROM seances\n-- complète la jointure ici\n',
      indices: [
        "L’information est répartie sur deux tables : les séances savent quel film, mais pas son titre. Il faut les relier.",
        "<code>JOIN</code> rattache la seconde table, et <code>ON</code> dit par quelles colonnes : celle qui porte la référence, et celle qui porte l’identifiant.",
        "<code>FROM seances JOIN films ON seances.film_id = films.id</code>"
      ],
      solution: 'SELECT seances.jour, films.titre, seances.spectateurs\nFROM seances\nJOIN films ON seances.film_id = films.id;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 8) return { ok: false, message: 'J\'attends 8 lignes, une par séance. Tu en obtiens ' + ctx.lignes.length + (ctx.lignes.length > 8 ? ' — sans la condition <code>ON</code>, chaque séance est associée à TOUS les films.' : '.') };
        const titres = ctx.lignes.map(l => String(l[1]));
        if (titres.some(t => /^\d+$/.test(t))) return { ok: false, message: 'La deuxième colonne affiche des numéros, pas des titres : vérifie que tu sélectionnes bien <code>films.titre</code>.' };
        return { ok: true, message: 'Les deux tables sont recollées. C\'est le mécanisme sur lequel repose absolument toute application sérieuse.' };
      }
    },
    {
      type: 'sql',
      tables: ['seances', 'salles'],
      consigne: '<strong>Entraînement :</strong> affiche le <code>jour</code>, le <code>nom</code> de la salle et les <code>spectateurs</code> de chaque séance, en reliant <code>seances</code> et <code>salles</code>.',
      codeDepart: '',
      indices: [
        "Exactement le même geste qu’à l’exercice précédent, avec une autre table au bout.",
        "La colonne de référence change de nom, et celle qu’on rejoint aussi. Le reste est identique.",
        "<code>FROM seances JOIN salles ON seances.salle_id = salles.id</code>"
      ],
      solution: 'SELECT seances.jour, salles.nom, seances.spectateurs\nFROM seances\nJOIN salles ON seances.salle_id = salles.id;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 8) return { ok: false, message: 'J\'attends 8 lignes (une par séance) ; tu en obtiens ' + ctx.lignes.length + '. Vérifie la condition après <code>ON</code>.' };
        const texte = JSON.stringify(ctx.lignes);
        if (!texte.includes('Rex') && !texte.includes('Palace')) return { ok: false, message: 'Je ne vois pas les noms de salles (Le Rex, Studio 7, Le Palace, Cinéma Nord) — sélectionne bien <code>salles.nom</code>.' };
        return { ok: true, message: 'Tu sais maintenant relier n\'importe quelles tables tant qu\'un identifiant les rapproche.' };
      }
    },
    {
      type: 'sql',
      tables: ['seances', 'films'],
      consigne: '<strong>Défi :</strong> quel film a attiré le plus de spectateurs <strong>au total</strong> ? Affiche le <code>titre</code> et la somme des spectateurs nommée <code>total</code>, du plus grand au plus petit.',
      codeDepart: '',
      indices: [
        "Trois choses s’enchaînent ici, et chacune a été vue séparément : relier, regrouper, trier.",
        "On relie les deux tables, on regroupe sur le titre du film, et on somme les spectateurs de chaque paquet.",
        "<code>SUM(seances.spectateurs) AS total</code>, puis <code>GROUP BY films.titre ORDER BY total DESC</code>"
      ],
      solution: 'SELECT films.titre, SUM(seances.spectateurs) AS total\nFROM seances\nJOIN films ON seances.film_id = films.id\nGROUP BY films.titre\nORDER BY total DESC;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('total')) return { ok: false, message: 'Nomme la somme <code>total</code> avec <code>AS total</code>. Colonnes actuelles : ' + ctx.colonnes.join(', ') + '.' };
        if (ctx.lignes.length !== 5) return { ok: false, message: 'Cinq films différents sont programmés : j\'attends 5 lignes, tu en obtiens ' + ctx.lignes.length + '. Pense au <code>GROUP BY</code>.' };
        const premier = ctx.lignes[0];
        if (!String(premier[0]).includes('Sable')) return { ok: false, message: 'Le film en tête devrait être « Sable et Cendres » (3 séances cumulées). Tu affiches « ' + premier[0] + '  » — vérifie le tri décroissant.' };
        if (Number(sqlValeurs(ctx, 'total')[0]) !== 530) return { ok: false, message: 'Le total attendu pour le film de tête est 530 (210 + 180 + 140). Tu obtiens ' + sqlValeurs(ctx, 'total')[0] + ' — utilise <code>SUM</code>, pas <code>COUNT</code>.' };
        return { ok: true, message: 'Jointure, regroupement, somme et tri dans une seule requête : c\'est le niveau qu\'on attend d\'un développeur en poste. Tu y es.' };
      }
    }
  ]
},

/* ---------- sql-10 ---------- */
{
  id: 'sql-10',
  titre: 'Mini-projet : le tableau de bord du cinéma',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Dernière leçon du module, et pas une notion de plus. Le directeur du réseau te pose trois questions, et tu as déjà tout ce qu'il faut pour y répondre.</p>
<p>C'est exactement ainsi qu'on travaille : on ne réapprend pas à chaque fois, on <strong>assemble</strong> ce qu'on sait. Et savoir choisir quoi assembler est précisément ce qui distingue quelqu'un qui connaît SQL de quelqu'un qui l'a lu.</p>

<h2>La méthode, avant les requêtes</h2>
<p>Face à une question en français, trois réflexes dans cet ordre :</p>
<ol>
<li><strong>De quelle table viennent les données ?</strong> Et faut-il en joindre une autre ?</li>
<li><strong>Faut-il filtrer des lignes ?</strong> C'est le <code>WHERE</code>.</li>
<li><strong>Faut-il résumer ?</strong> Si la réponse est un chiffre par catégorie, c'est <code>GROUP BY</code>.</li>
</ol>
<p>Ces trois questions suffisent à écrire la structure d'à peu près n'importe quelle requête, avant même de se soucier de la syntaxe.</p>

<h2>Pas à pas</h2>
<p>« Quel est le genre qui compte le plus de films ? »</p>
<table class="memo-table trace">
<tr><th>Question</th><th>Réponse</th><th>Ce que ça donne</th></tr>
<tr><td>quelle table ?</td><td>films seule</td><td><code>FROM films</code></td></tr>
<tr><td>filtrer ?</td><td>non</td><td>pas de <code>WHERE</code></td></tr>
<tr><td>résumer ?</td><td>un compte par genre</td><td><code>GROUP BY genre</code></td></tr>
<tr><td>et « le plus » ?</td><td>trier et couper</td><td><code>ORDER BY ... DESC LIMIT 1</code></td></tr>
</table>
<pre class="bloc-code">SELECT genre, COUNT(*) AS nombre
FROM films
GROUP BY genre
ORDER BY nombre DESC
LIMIT 1;</pre>
<p>Remarque qu'on trie sur l'alias <code>nombre</code> : l'<code>ORDER BY</code> s'exécute après le <code>SELECT</code>, donc l'alias existe déjà. Dans un <code>WHERE</code>, il n'existerait pas.</p>

<h2>Les pièges</h2>
<p><strong>Vouloir tout faire en une requête.</strong> Une question complexe se découpe. Écris d'abord la requête qui rapporte les bonnes lignes, vérifie-la, puis ajoute le regroupement, vérifie encore. Construire par étapes vaut mieux que déboguer d'un bloc.</p>
<p><strong>Oublier que <code>COUNT(*)</code> change après une jointure.</strong> Si la question mêle films et séances, compter les films après un <code>JOIN</code> compte en réalité les séances.</p>
<p><strong>Répondre à côté.</strong> « Le genre le plus représenté » demande un genre, pas la liste de tous les genres triés. Le <code>LIMIT 1</code> fait partie de la réponse.</p>
<p><strong>Faire confiance à un résultat non vérifié.</strong> Une requête fausse ne se plaint pas : elle répond. Un ordre de grandeur plausible n'est pas une preuve — on y revient en fin de module suivant.</p>

<h2>Dans la vraie vie</h2>
<p>C'est le travail quotidien de milliers de gens qui ne se considèrent pas comme programmeurs : analystes, gestionnaires, chargés d'études. Traduire une question posée en français en une requête juste est une compétence en soi — et elle se transfère à toutes les bases du monde.</p>

<div class="a-retenir">
<ul>
<li>Trois questions : quelle table, faut-il filtrer, faut-il résumer ?</li>
<li>On construit par étapes, en vérifiant à chaque ajout.</li>
<li>L'<code>ORDER BY</code> peut utiliser un alias du <code>SELECT</code> ; le <code>WHERE</code>, non.</li>
<li>Une requête fausse ne lève aucune erreur : elle répond.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : lire un plan d'exécution</summary>
<p><code>EXPLAIN</code> placé devant une requête ne l'exécute pas : il montre le chemin que le moteur compte emprunter — quelle table d'abord, quel index utilisé, combien de lignes examinées. C'est l'outil de base pour comprendre pourquoi une requête met trente secondes, et il révèle souvent qu'un simple index manquant explique tout.</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['salles', 'seances'],
      consigne: '<strong>Question 1 :</strong> quelle est la <strong>fréquentation totale par ville</strong> ? Affiche <code>ville</code> et la somme des spectateurs nommée <code>total</code>, de la ville la plus fréquentée à la moins fréquentée.',
      codeDepart: '',
      indices: [
        "La ville est dans une table, les spectateurs dans une autre. Comme toujours, il faut relier avant de calculer.",
        "On regroupe sur la ville, et on somme les spectateurs. Le tri se fait ensuite sur le total obtenu.",
        "<code>JOIN salles ON seances.salle_id = salles.id</code>, puis <code>GROUP BY salles.ville</code>"
      ],
      solution: 'SELECT salles.ville, SUM(seances.spectateurs) AS total\nFROM seances\nJOIN salles ON seances.salle_id = salles.id\nGROUP BY salles.ville\nORDER BY total DESC;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 3) return { ok: false, message: 'Trois villes accueillent des séances (Lyon, Marseille, Lille) : j\'attends 3 lignes, tu en obtiens ' + ctx.lignes.length + '.' };
        if (!sqlColonnes(ctx).includes('total')) return { ok: false, message: 'Nomme la somme <code>total</code> avec <code>AS total</code>.' };
        const t = sqlValeurs(ctx, 'total').map(Number);
        if (t[0] !== 595) return { ok: false, message: 'Lyon devrait arriver en tête avec 595 spectateurs (210 + 45 + 260 + 80). Ton premier total est ' + t[0] + '.' };
        for (let i = 1; i < t.length; i++) if (t[i] > t[i - 1]) return { ok: false, message: 'Le classement doit être décroissant — ajoute <code>ORDER BY total DESC</code>.' };
        return { ok: true, message: 'Lyon domine avec ses deux salles. Ce chiffre, aucune table ne le contenait : tu viens de le fabriquer.' };
      }
    },
    {
      type: 'sql',
      tables: ['films', 'seances'],
      consigne: '<strong>Question 2 :</strong> quels films ont été programmés <strong>plus d\'une fois</strong> ? Affiche le <code>titre</code> et le nombre de séances nommé <code>seances_total</code>, du plus programmé au moins programmé, en te limitant aux 3 premiers.',
      codeDepart: '',
      indices: [
        "Compter les séances d’un film, c’est compter les lignes de son paquet après regroupement.",
        "<code>COUNT(*)</code> par paquet, regroupement sur le titre, tri décroissant, puis une coupe.",
        "<code>COUNT(*) AS seances_total</code> · <code>GROUP BY films.titre</code> · <code>ORDER BY … DESC LIMIT 3</code>"
      ],
      solution: 'SELECT films.titre, COUNT(*) AS seances_total\nFROM seances\nJOIN films ON seances.film_id = films.id\nGROUP BY films.titre\nORDER BY seances_total DESC\nLIMIT 3;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('seances_total')) return { ok: false, message: 'Nomme le compte <code>seances_total</code> avec <code>AS seances_total</code>.' };
        if (ctx.lignes.length !== 3) return { ok: false, message: 'J\'attends exactement 3 lignes — pense à <code>LIMIT 3</code>. Tu en obtiens ' + ctx.lignes.length + '.' };
        const n = sqlValeurs(ctx, 'seances_total').map(Number);
        if (n[0] !== 3) return { ok: false, message: 'Le film le plus programmé a 3 séances. Ton premier résultat en annonce ' + n[0] + ' — vérifie le <code>COUNT(*)</code> et le tri décroissant.' };
        if (!String(ctx.lignes[0][0]).includes('Sable')) return { ok: false, message: 'Le film de tête devrait être « Sable et Cendres ».' };
        return { ok: true, message: 'COUNT compte les séances, SUM aurait additionné les spectateurs : deux questions différentes, deux fonctions différentes.' };
      }
    },
    {
      type: 'sql',
      tables: ['films', 'seances'],
      consigne: '<strong>Question 3 — la plus difficile :</strong> quelle est la <strong>fréquentation moyenne par séance</strong> pour chaque genre de film ? Affiche <code>genre</code> et la moyenne nommée <code>moyenne</code>, du genre le plus fréquenté au moins fréquenté.',
      codeDepart: '',
      indices: [
        "La question mêle les deux tables : le genre vient des films, les spectateurs des séances.",
        "On regroupe sur le genre, et on prend la <strong>moyenne</strong> des spectateurs — pas leur somme.",
        "<code>AVG(seances.spectateurs) AS moyenne</code>, avec <code>GROUP BY films.genre</code>"
      ],
      solution: 'SELECT films.genre, AVG(seances.spectateurs) AS moyenne\nFROM seances\nJOIN films ON seances.film_id = films.id\nGROUP BY films.genre\nORDER BY moyenne DESC;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('moyenne')) return { ok: false, message: 'Nomme la moyenne <code>moyenne</code> avec <code>AS moyenne</code>.' };
        if (ctx.lignes.length !== 4) return { ok: false, message: 'Quatre genres sont programmés : j\'attends 4 lignes, tu en obtiens ' + ctx.lignes.length + '. Regroupe sur <code>films.genre</code>.' };
        const m = sqlValeurs(ctx, 'moyenne').map(Number);
        if (Math.abs(m[0] - 176.666667) > 0.5) return { ok: false, message: 'Le genre de tête est le Drame, avec environ 176.7 spectateurs par séance. Ton premier résultat affiche ' + m[0] + ' — utilise <code>AVG</code> et non <code>SUM</code>.' };
        for (let i = 1; i < m.length; i++) if (m[i] > m[i - 1]) return { ok: false, message: 'Trie en décroissant avec <code>ORDER BY moyenne DESC</code>.' };
        return { ok: true, message: 'Module SQL terminé ! 🗄 Tu sais interroger, filtrer, trier, résumer, relier et modifier une base de données. C\'est une compétence recherchée en soi — beaucoup de métiers (analyste, gestionnaire, marketing) vivent uniquement de ça.' };
      }
    }
  ]
}
];
