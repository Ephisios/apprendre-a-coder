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
<p>Jusqu'ici, tes données vivaient dans des variables et des listes : elles disparaissaient dès qu'on fermait la page. Une <strong>base de données</strong>, c'est l'endroit où les données d'une vraie application sont rangées durablement — les comptes clients d'une banque, les commandes d'un site, les séances d'un cinéma.</p>

<h2>Un tableur, en beaucoup plus sérieux</h2>
<p>Une base est faite de <strong>tables</strong>. Une table ressemble à une feuille de tableur :</p>
<ul>
<li>les <strong>colonnes</strong> décrivent la nature des informations (titre, année, note…) ;</li>
<li>chaque <strong>ligne</strong> est un enregistrement (un film, un client, une facture) ;</li>
<li>la colonne <code>id</code> donne à chaque ligne un numéro unique — c'est sa carte d'identité.</li>
</ul>

<h2>SQL : on décrit ce qu'on veut, pas comment l'obtenir</h2>
<p>C'est la grande différence avec JavaScript et Python. Là-bas, tu écrivais <em>comment</em> faire : parcourir la liste, tester chaque élément, accumuler. En SQL, tu écris seulement <em>ce que tu veux</em>, et le moteur se débrouille :</p>
<pre class="bloc-code">SELECT titre FROM films;</pre>
<p>Littéralement : « sélectionne la colonne titre depuis la table films ». Le <code>*</code> est un raccourci qui veut dire « toutes les colonnes » :</p>
<pre class="bloc-code">SELECT * FROM films;</pre>

<div class="info"><div>SQL a près de <strong>cinquante ans</strong> et reste incontournable : PostgreSQL, MySQL, SQLite, SQL Server… tous le parlent, avec de très légères variantes. Ce que tu apprends ici te servira partout, et probablement toute ta carrière.</div></div>

<div class="astuce"><div>Le point-virgule final marque la fin d'une requête. Ici il est facultatif, mais prends l'habitude : la plupart des outils professionnels l'exigent.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche <strong>tout le contenu</strong> de la table <code>films</code>. Déplie « Voir les tables » au-dessus si tu veux jeter un œil avant.',
      codeDepart: '-- Toutes les colonnes, toutes les lignes :\n',
      indice: 'La formule complète : <code>SELECT * FROM films;</code>',
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
      indice: 'Même formule, en changeant le nom de la table après <code>FROM</code>.',
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
<p>En pratique, on ne demande presque jamais <code>*</code>. On nomme les colonnes voulues, séparées par des virgules — c'est plus lisible, plus rapide, et ça évite de transporter des données inutiles.</p>
<pre class="bloc-code">SELECT titre, annee FROM films;</pre>
<p>L'ordre des colonnes dans le résultat est celui que tu écris : <code>SELECT annee, titre</code> affiche l'année d'abord.</p>

<h2>Renommer une colonne à l'affichage : AS</h2>
<pre class="bloc-code">SELECT titre AS film, annee AS sortie FROM films;</pre>
<p>Les en-têtes du résultat deviennent « film » et « sortie ». La table, elle, n'est pas modifiée : <code>AS</code> ne change que l'affichage. C'est très utile pour rendre lisible un résultat calculé.</p>

<h2>Calculer dans le SELECT</h2>
<p>Une colonne du résultat peut être un calcul :</p>
<pre class="bloc-code">SELECT titre, duree / 60 AS heures FROM films;</pre>

<h2>Éviter les doublons : DISTINCT</h2>
<pre class="bloc-code">SELECT DISTINCT genre FROM films;</pre>
<p>Sans <code>DISTINCT</code>, tu obtiendrais huit lignes (une par film) avec des genres répétés. Avec, tu obtiens la liste des genres <em>différents</em>.</p>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche uniquement les colonnes <code>titre</code> et <code>note</code> de la table <code>films</code>.',
      codeDepart: '',
      indice: 'Les colonnes voulues, séparées par une virgule : <code>SELECT titre, note FROM films;</code>',
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
      indice: 'Le mot-clé qui supprime les doublons se place juste après SELECT : <code>SELECT DISTINCT genre FROM films;</code>',
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
      indice: 'On peut calculer directement dans le SELECT : <code>duree / 60 AS heures</code>',
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
<p>Voici le mot-clé qui rend SQL réellement puissant. <code>WHERE</code> ne garde que les lignes qui remplissent une condition :</p>
<pre class="bloc-code">SELECT titre FROM films WHERE annee = 2023;</pre>

<h2>Un seul signe égal</h2>
<p>Attention, gros piège quand on vient de JavaScript ou de Python : <strong>en SQL, la comparaison s'écrit avec un seul <code>=</code></strong>. Le <code>==</code> n'existe pas.</p>

<h2>Les comparaisons disponibles</h2>
<table class="memo-table">
<tr><th>Écriture</th><th>Sens</th></tr>
<tr><td>=</td><td>égal à</td></tr>
<tr><td>&lt;&gt; (ou !=)</td><td>différent de</td></tr>
<tr><td>&lt; &nbsp; &gt; &nbsp; &lt;= &nbsp; &gt;=</td><td>plus petit, plus grand, ou égal</td></tr>
</table>

<h2>Texte ou nombre ?</h2>
<p>Le texte va entre <strong>apostrophes simples</strong>, les nombres n'en prennent pas :</p>
<pre class="bloc-code">SELECT titre FROM films WHERE genre = 'Drame';   -- texte : apostrophes
SELECT titre FROM films WHERE note > 8;          -- nombre : rien</pre>

<div class="attention"><div>L'apostrophe non refermée est l'erreur SQL la plus fréquente au monde. Si le moteur te répond quelque chose d'incompréhensible, compte tes apostrophes avant tout.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche le <code>titre</code> et l\'<code>annee</code> des films sortis en <strong>2023</strong>.',
      codeDepart: '',
      indice: '<code>SELECT titre, annee FROM films WHERE annee = 2023;</code> — l\'année est un nombre, donc pas d\'apostrophes.',
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
      indice: 'Le texte se met entre apostrophes simples : <code>WHERE genre = \'Comédie\'</code>',
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
      indice: 'Un nombre ne prend pas d\'apostrophes : <code>WHERE note > 8</code>',
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
<h2>Combiner plusieurs conditions</h2>
<p>Comme en Python, on assemble avec <code>AND</code> (les deux) et <code>OR</code> (l'un ou l'autre) :</p>
<pre class="bloc-code">SELECT titre FROM films WHERE genre = 'Drame' AND annee > 2020;
SELECT titre FROM films WHERE genre = 'Drame' OR genre = 'Thriller';</pre>
<p>Quand tu mélanges les deux, mets des parenthèses — sinon <code>AND</code> l'emporte sur <code>OR</code> et le résultat te surprendra :</p>
<pre class="bloc-code">SELECT titre FROM films
WHERE (genre = 'Drame' OR genre = 'Thriller') AND annee = 2023;</pre>

<h2>IN : une liste de valeurs acceptées</h2>
<pre class="bloc-code">SELECT titre FROM films WHERE genre IN ('Drame', 'Comédie');</pre>
<p>Bien plus lisible qu'une chaîne de <code>OR</code> quand la liste s'allonge.</p>

<h2>BETWEEN : un intervalle</h2>
<pre class="bloc-code">SELECT titre FROM films WHERE annee BETWEEN 2019 AND 2021;</pre>
<p>Les deux bornes sont <strong>incluses</strong> (contrairement au <code>range()</code> de Python !).</p>

<h2>LIKE : chercher un morceau de texte</h2>
<p>Deux jokers : <code>%</code> remplace n'importe quel nombre de caractères, <code>_</code> exactement un.</p>
<pre class="bloc-code">WHERE titre LIKE 'Le %'    -- commence par « Le »
WHERE titre LIKE '%mer'    -- se termine par « mer »
WHERE titre LIKE '%uit%'   -- contient « uit »</pre>

<h2>NULL : la case vide</h2>
<p><code>NULL</code> signifie « on ne sait pas ». Ce n'est ni zéro, ni du texte vide — et surtout, <strong>on ne peut pas le comparer avec <code>=</code></strong>. Il faut une écriture spéciale :</p>
<pre class="bloc-code">SELECT titre FROM films WHERE note IS NULL;
SELECT titre FROM films WHERE note IS NOT NULL;</pre>

<div class="attention"><div><code>WHERE note = NULL</code> ne renvoie jamais rien, même s'il y a des cases vides. C'est un classique qui fait perdre des heures : retiens <code>IS NULL</code>.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche le <code>titre</code> des <strong>thrillers sortis après 2020</strong> (les deux conditions à la fois).',
      codeDepart: '',
      indice: 'Deux conditions reliées par <code>AND</code> : <code>WHERE genre = \'Thriller\' AND annee > 2020</code>',
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
      indice: 'Le joker <code>%</code> remplace la suite : <code>WHERE titre LIKE \'Le %\'</code>',
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
      indice: 'Une case vide ne se compare pas avec <code>=</code> : il faut <code>WHERE note IS NULL</code>.',
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
<h2>ORDER BY : mettre de l'ordre</h2>
<pre class="bloc-code">SELECT titre, note FROM films ORDER BY note DESC;</pre>
<ul>
<li><code>ASC</code> : ordre croissant (du plus petit au plus grand, de A à Z). C'est le comportement par défaut, on l'écrit rarement ;</li>
<li><code>DESC</code> : ordre décroissant. À retenir, c'est celui qu'on veut le plus souvent (meilleures notes d'abord, ventes les plus fortes en tête…).</li>
</ul>

<h2>Trier sur plusieurs colonnes</h2>
<pre class="bloc-code">SELECT titre, annee, note FROM films ORDER BY annee DESC, note DESC;</pre>
<p>D'abord par année décroissante ; <em>en cas d'égalité</em>, par note décroissante. Le second critère ne départage que les ex æquo.</p>

<h2>LIMIT : ne garder que les premiers</h2>
<pre class="bloc-code">SELECT titre, note FROM films ORDER BY note DESC LIMIT 3;</pre>
<p>Le trio gagnant. C'est la recette de tous les classements que tu vois sur le web : trier, puis couper.</p>

<div class="astuce"><div>L'ordre des mots-clés n'est pas négociable : <code>SELECT … FROM … WHERE … ORDER BY … LIMIT</code>. Le moteur refuse toute autre disposition. Apprends cette phrase par cœur, elle te servira pour toutes tes requêtes.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche le <code>titre</code> et la <code>note</code> de tous les films, <strong>du mieux noté au moins bien noté</strong>.',
      codeDepart: '',
      indice: '<code>ORDER BY note DESC</code> se place à la fin de la requête.',
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
      indice: 'Trier d\'abord, couper ensuite : <code>ORDER BY note DESC LIMIT 3</code>',
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
      indice: 'Deux critères séparés par une virgule, chacun avec son sens : <code>ORDER BY annee DESC, note DESC</code>',
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
<p>Jusqu'ici tu obtenais des lignes. Les <strong>fonctions d'agrégat</strong> font autre chose : elles résument tout un ensemble de lignes en <strong>une seule valeur</strong>.</p>

<table class="memo-table">
<tr><th>Fonction</th><th>Ce qu'elle calcule</th></tr>
<tr><td>COUNT(*)</td><td>le nombre de lignes</td></tr>
<tr><td>SUM(colonne)</td><td>la somme</td></tr>
<tr><td>AVG(colonne)</td><td>la moyenne</td></tr>
<tr><td>MIN(colonne) / MAX(colonne)</td><td>la plus petite / la plus grande valeur</td></tr>
</table>

<pre class="bloc-code">SELECT COUNT(*) FROM films;              -- 8
SELECT AVG(note) FROM films;             -- la note moyenne
SELECT MIN(annee), MAX(annee) FROM films; -- le plus ancien et le plus récent</pre>

<h2>Compter avec un filtre</h2>
<p>Le <code>WHERE</code> s'applique d'abord, l'agrégat ensuite :</p>
<pre class="bloc-code">SELECT COUNT(*) FROM films WHERE genre = 'Drame';</pre>

<h2>COUNT(*) ou COUNT(colonne) ?</h2>
<p><code>COUNT(*)</code> compte toutes les lignes. <code>COUNT(note)</code> ne compte que les lignes où la note <strong>n'est pas vide</strong>. Sur notre table : 8 d'un côté, 7 de l'autre. Cette différence est une source d'erreurs classique dans les rapports.</p>

<div class="astuce"><div>Pense toujours à nommer tes colonnes calculées avec <code>AS</code> : <code>SELECT COUNT(*) AS nombre_films FROM films;</code> — un rapport lisible vaut mieux qu'un en-tête « COUNT(*) ».</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Compte le nombre total de films et nomme le résultat <code>nombre</code>.',
      codeDepart: '',
      indice: '<code>SELECT COUNT(*) AS nombre FROM films;</code>',
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
      indice: '<code>SELECT AVG(note) AS moyenne FROM films;</code>',
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
      indice: 'On combine WHERE et COUNT : <code>SELECT COUNT(*) AS recents FROM films WHERE annee > 2020;</code>',
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
<p>Compter tous les films, c'est bien. Compter les films <strong>par genre</strong>, c'est là que SQL devient impressionnant. <code>GROUP BY</code> fait des paquets de lignes qui partagent une même valeur, puis applique l'agrégat <em>à chaque paquet</em>.</p>

<pre class="bloc-code">SELECT genre, COUNT(*) AS nombre
FROM films
GROUP BY genre;</pre>

<p>Le résultat n'a plus une ligne par film, mais <strong>une ligne par genre</strong> :</p>
<table class="memo-table">
<tr><th>genre</th><th>nombre</th></tr>
<tr><td>Thriller</td><td>2</td></tr>
<tr><td>Drame</td><td>3</td></tr>
<tr><td>Comédie</td><td>2</td></tr>
<tr><td>Aventure</td><td>1</td></tr>
</table>

<h2>La règle d'or</h2>
<p>Les colonnes affichées doivent être <strong>soit la colonne de regroupement, soit un agrégat</strong>. Demander <code>SELECT titre, COUNT(*) … GROUP BY genre</code> n'a aucun sens : quel titre afficher, puisque le paquet en contient plusieurs ?</p>

<h2>Trier un regroupement</h2>
<pre class="bloc-code">SELECT genre, AVG(note) AS moyenne
FROM films
GROUP BY genre
ORDER BY moyenne DESC;</pre>
<p>On peut trier sur le nom donné par <code>AS</code> — pratique et lisible.</p>

<div class="info"><div>Combiné à <code>WHERE</code>, l'ordre est : filtrer les lignes (WHERE), faire les paquets (GROUP BY), calculer, puis trier (ORDER BY). C'est cet enchaînement qui produit tous les rapports d'entreprise du monde.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche <strong>le nombre de films par genre</strong> : la colonne <code>genre</code> et un compte nommé <code>nombre</code>.',
      codeDepart: '',
      indice: '<code>SELECT genre, COUNT(*) AS nombre FROM films GROUP BY genre;</code>',
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
      indice: 'Regroupe, calcule, puis trie : <code>GROUP BY genre ORDER BY moyenne DESC</code>',
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
      indice: 'Le regroupement peut porter sur n\'importe quelle colonne : <code>GROUP BY annee ORDER BY annee DESC</code>',
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
<p>Jusqu'ici tu ne faisais que <em>lire</em>. Trois commandes permettent d'écrire — et elles méritent le respect, car elles changent la base pour de bon.</p>

<h2>INSERT : ajouter une ligne</h2>
<pre class="bloc-code">INSERT INTO films (id, titre, annee, genre, duree, note)
VALUES (9, 'Aurore', 2024, 'Drame', 101, 7.4);</pre>
<p>Les colonnes d'un côté, les valeurs de l'autre, <strong>dans le même ordre et en même nombre</strong>.</p>

<h2>UPDATE : modifier des lignes existantes</h2>
<pre class="bloc-code">UPDATE films
SET note = 8.5
WHERE titre = 'Les Voisins';</pre>

<h2>DELETE : supprimer des lignes</h2>
<pre class="bloc-code">DELETE FROM films WHERE id = 9;</pre>

<div class="attention"><div><strong>La règle qui sauve des carrières.</strong> Un <code>UPDATE</code> ou un <code>DELETE</code> sans <code>WHERE</code> s'applique à <strong>toute la table</strong>. <code>DELETE FROM films;</code> vide la table entière, sans confirmation et sans retour en arrière. Le réflexe des professionnels : écrire d'abord la requête en <code>SELECT</code> pour voir quelles lignes seront touchées, puis remplacer <code>SELECT *</code> par <code>DELETE</code>.</div></div>

<div class="astuce"><div>Rassure-toi : dans ce logiciel, chaque exercice repart d'une base intacte. Tu peux tout casser sans conséquence — c'est même une bonne façon d'apprendre.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Ajoute un film à la table : <code>id</code> 9, titre <code>Aurore</code>, année 2024, genre <code>Drame</code>, durée 101, note 7.4.',
      codeDepart: '',
      indice: '<code>INSERT INTO films (id, titre, annee, genre, duree, note) VALUES (9, \'Aurore\', 2024, \'Drame\', 101, 7.4);</code>',
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
      indice: '<code>UPDATE films SET note = 8.5 WHERE titre = \'Les Voisins\';</code> — sans le WHERE, tous les films prendraient cette note.',
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
      indice: '<code>DELETE FROM films WHERE annee < 2020;</code>',
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
<p>Voici l'idée centrale des bases de données relationnelles. Regarde la table <code>seances</code> : elle ne contient pas le titre du film, mais un <code>film_id</code>. Pourquoi ?</p>

<h2>Ne jamais répéter une information</h2>
<p>Si chaque séance stockait le titre du film, un titre mal orthographié devrait être corrigé à cent endroits. En rangeant les films dans leur propre table et en n'y faisant référence que par un numéro, l'information n'existe qu'<strong>une seule fois</strong>. Ce numéro s'appelle une <strong>clé étrangère</strong>.</p>

<h2>JOIN : recoller les morceaux</h2>
<pre class="bloc-code">SELECT seances.jour, films.titre, seances.spectateurs
FROM seances
JOIN films ON seances.film_id = films.id;</pre>
<p>Traduction : « pour chaque séance, va chercher la ligne de <code>films</code> dont l'<code>id</code> correspond au <code>film_id</code> de la séance ». Le <code>ON</code> indique <strong>comment</strong> les deux tables se correspondent.</p>

<h2>Préciser la table</h2>
<p>Quand deux tables ont une colonne du même nom (ici <code>id</code>), on écrit <code>table.colonne</code> pour lever l'ambiguïté. C'est une bonne habitude même quand ce n'est pas obligatoire : la requête devient lisible sans connaître la base par cœur.</p>

<div class="info"><div>Une jointure peut se combiner avec tout le reste : <code>WHERE</code>, <code>GROUP BY</code>, <code>ORDER BY</code>. C'est ainsi qu'on répond à des questions comme « quel film a attiré le plus de spectateurs cette semaine ? » — exactement le genre de question qu'on pose à une base de cinéma.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['seances', 'films'],
      consigne: 'Affiche pour chaque séance : le <code>jour</code>, le <code>titre</code> du film, et le nombre de <code>spectateurs</code>. Il faut relier <code>seances</code> et <code>films</code>.',
      codeDepart: 'SELECT seances.jour, films.titre, seances.spectateurs\nFROM seances\n-- complète la jointure ici\n',
      indice: '<code>JOIN films ON seances.film_id = films.id;</code>',
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
      indice: 'Même principe : <code>FROM seances JOIN salles ON seances.salle_id = salles.id</code>',
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
      indice: 'Jointure + regroupement + tri : <code>JOIN … GROUP BY films.titre ORDER BY total DESC</code>. La somme s\'écrit <code>SUM(seances.spectateurs) AS total</code>.',
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
<p>Le directeur du réseau te pose trois questions. À toi d'y répondre en SQL — sans nouvelle notion, uniquement ce que tu sais déjà. C'est exactement ainsi qu'on travaille : on ne réapprend pas, on assemble.</p>

<h2>Ton aide-mémoire</h2>
<pre class="bloc-code">SELECT   colonnes ou calculs
FROM     table
JOIN     autre_table ON correspondance
WHERE    conditions
GROUP BY colonne de regroupement
ORDER BY tri
LIMIT    nombre</pre>
<p>Cet ordre est immuable. Toute requête, même très longue, suit ce squelette.</p>

<div class="astuce"><div>Méthode quand une requête résiste : commence par <code>SELECT * FROM table</code>, regarde le résultat, puis ajoute <strong>un seul</strong> morceau à la fois en relançant à chaque étape. Une requête complexe se construit par couches, jamais d'un seul jet.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['salles', 'seances'],
      consigne: '<strong>Question 1 :</strong> quelle est la <strong>fréquentation totale par ville</strong> ? Affiche <code>ville</code> et la somme des spectateurs nommée <code>total</code>, de la ville la plus fréquentée à la moins fréquentée.',
      codeDepart: '',
      indice: 'Relie <code>seances</code> et <code>salles</code>, regroupe sur <code>salles.ville</code>, et somme <code>seances.spectateurs</code>.',
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
      indice: 'Compte les séances par film avec <code>COUNT(*)</code>, regroupe sur <code>films.titre</code>, trie en décroissant et coupe avec <code>LIMIT 3</code>.',
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
      indice: 'Relie <code>seances</code> à <code>films</code>, regroupe sur <code>films.genre</code>, et calcule <code>AVG(seances.spectateurs) AS moyenne</code>.',
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
