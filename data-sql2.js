/* ===== SQL — seconde partie (sql-11 à sql-16) ===== */
window.DATA_SQL2 = [

/* ---------- sql-11 ---------- */
{
  id: 'sql-11',
  titre: 'HAVING : filtrer les groupes',
  contenu: `
<p>Tu sais filtrer des lignes avec <code>WHERE</code>, et regrouper avec <code>GROUP BY</code>. Mais comment garder uniquement les genres qui ont <strong>plus d'un film</strong> ? Le filtre porte cette fois sur le <em>résultat d'un calcul de groupe</em> — et <code>WHERE</code> en est incapable.</p>

<pre class="bloc-code">-- Ceci ne marche PAS :
SELECT genre, COUNT(*) FROM films WHERE COUNT(*) > 1 GROUP BY genre;

-- Ceci marche :
SELECT genre, COUNT(*) AS nombre
FROM films
GROUP BY genre
HAVING COUNT(*) > 1;</pre>

<h2>La différence, en une phrase</h2>
<ul>
<li><code>WHERE</code> filtre <strong>les lignes</strong>, avant le regroupement ;</li>
<li><code>HAVING</code> filtre <strong>les groupes</strong>, après le regroupement et le calcul.</li>
</ul>
<p>C'est pour ça que <code>WHERE</code> ne peut pas voir un <code>COUNT()</code> : au moment où il s'exécute, les groupes n'existent pas encore.</p>

<h2>L'ordre complet, définitif</h2>
<pre class="bloc-code">SELECT   colonnes
FROM     table
WHERE    filtre sur les LIGNES
GROUP BY regroupement
HAVING   filtre sur les GROUPES
ORDER BY tri
LIMIT    coupe</pre>

<h2>Les deux ensemble</h2>
<pre class="bloc-code">SELECT genre, AVG(note) AS moyenne
FROM films
WHERE annee >= 2019          -- on ne garde que les films récents…
GROUP BY genre
HAVING AVG(note) > 7;        -- …puis que les genres bien notés</pre>

<div class="astuce"><div>Moyen mnémotechnique : si ta condition contient une fonction comme <code>COUNT</code>, <code>SUM</code> ou <code>AVG</code>, c'est forcément un <code>HAVING</code>. Sinon, c'est un <code>WHERE</code> — et il vaut mieux filtrer tôt, car il y a alors moins de lignes à regrouper.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche les genres qui comptent <strong>plus d\'un film</strong>, avec leur nombre nommé <code>nombre</code>.',
      codeDepart: 'SELECT genre, COUNT(*) AS nombre\nFROM films\nGROUP BY genre\n-- ajoute le filtre sur les groupes ici\n',
      indices: [
        "<code>WHERE</code> filtre des <strong>lignes</strong>, avant tout regroupement. Ici tu veux filtrer des <strong>groupes</strong>, une fois qu’ils sont formés et comptés : pas le même moment, donc pas le même mot.",
        "Ce mot-là, c’est <code>HAVING</code>, et il se place <strong>après</strong> le <code>GROUP BY</code>. Il peut porter sur un agrégat — ce que <code>WHERE</code> ne sait pas faire.",
        "<code>HAVING COUNT(*) &gt; 1</code>"
      ],
      solution: 'SELECT genre, COUNT(*) AS nombre\nFROM films\nGROUP BY genre\nHAVING COUNT(*) > 1;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length === 4) return { ok: false, message: 'Les 4 genres sont là : le filtre ne s\'applique pas. Ajoute <code>HAVING COUNT(*) > 1</code> après le GROUP BY.' };
        if (ctx.lignes.length !== 3) return { ok: false, message: 'J\'attends 3 genres (Thriller 2, Drame 3, Comédie 2 — l\'Aventure n\'en a qu\'un). Ta requête en renvoie ' + ctx.lignes.length + '.' };
        if (!sqlColonnes(ctx).includes('nombre')) return { ok: false, message: 'Nomme la colonne de comptage <code>nombre</code> avec <code>AS nombre</code>.' };
        return { ok: true, message: 'HAVING voit les résultats des calculs de groupe, ce que WHERE ne peut pas faire.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Entraînement :</strong> affiche les genres dont la <strong>note moyenne dépasse 8</strong>, avec la moyenne nommée <code>moyenne</code>.',
      codeDepart: '',
      indices: [
        "Même structure qu’à l’exercice précédent : on regroupe, puis on ne garde que les groupes qui remplissent une condition.",
        "Seul l’agrégat change : ce n’est plus un comptage mais une moyenne, <code>AVG(note)</code>.",
        "<code>GROUP BY genre HAVING AVG(note) &gt; 8</code>"
      ],
      solution: 'SELECT genre, AVG(note) AS moyenne\nFROM films\nGROUP BY genre\nHAVING AVG(note) > 8;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('moyenne')) return { ok: false, message: 'Nomme la colonne calculée <code>moyenne</code> avec <code>AS moyenne</code>.' };
        if (ctx.lignes.length !== 2) return { ok: false, message: 'Deux genres dépassent 8 de moyenne : le Drame (8.15) et l\'Aventure (8.7). Le Thriller est à 8.0 pile, donc exclu par <code>&gt;</code>. Ta requête renvoie ' + ctx.lignes.length + ' ligne(s).' };
        const m = sqlValeurs(ctx, 'moyenne').map(Number);
        if (m.some(x => x <= 8)) return { ok: false, message: 'Une moyenne inférieure ou égale à 8 est passée à travers le filtre.' };
        return { ok: true, message: 'Remarque que le Thriller, à 8.0 exactement, est exclu : <code>&gt;</code> est strict. Avec <code>&gt;=</code> tu en aurais trois.' };
      }
    },
    {
      type: 'sql',
      tables: ['seances', 'films'],
      consigne: '<strong>Défi :</strong> quels films ont été programmés <strong>au moins deux fois</strong> ? Affiche le <code>titre</code> et le nombre de séances nommé <code>seances_total</code>, du plus programmé au moins programmé.',
      codeDepart: '',
      indices: [
        "Trois étapes, dans cet ordre : relier les deux tables, regrouper sur le titre du film, puis ne garder que les groupes assez gros.",
        "Le regroupement se fait sur <code>films.titre</code>, et la condition sur le groupe s’écrit avec <code>HAVING COUNT(*)</code>.",
        "<code>HAVING COUNT(*) &gt;= 2</code>, puis un <code>ORDER BY … DESC</code> pour le tri."
      ],
      solution: 'SELECT films.titre, COUNT(*) AS seances_total\nFROM seances\nJOIN films ON seances.film_id = films.id\nGROUP BY films.titre\nHAVING COUNT(*) >= 2\nORDER BY seances_total DESC;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('seances_total')) return { ok: false, message: 'Nomme le compte <code>seances_total</code> avec <code>AS seances_total</code>.' };
        if (ctx.lignes.length !== 2) return { ok: false, message: 'Deux films ont au moins deux séances : « Sable et Cendres » (3) et « Le Dernier Train » (2). Ta requête renvoie ' + ctx.lignes.length + ' ligne(s).' };
        const n = sqlValeurs(ctx, 'seances_total').map(Number);
        if (n[0] !== 3) return { ok: false, message: 'Le premier film doit être le plus programmé (3 séances) — ajoute <code>ORDER BY seances_total DESC</code>. Tu obtiens ' + n[0] + '.' };
        return { ok: true, message: 'Jointure, regroupement, filtre de groupe et tri : tu viens d\'assembler presque toute la grammaire du SELECT.' };
      }
    }
  ]
},

/* ---------- sql-12 ---------- */
{
  id: 'sql-12',
  titre: 'Les sous-requêtes',
  contenu: `
<p>Une <strong>sous-requête</strong> est une requête placée à l'intérieur d'une autre, entre parenthèses. Elle sert quand la valeur qui t'intéresse doit elle-même être calculée.</p>

<h2>Le problème typique</h2>
<p>« Quels films ont une note supérieure à la moyenne ? » Tu ne peux pas écrire la moyenne à la main : elle change dès qu'un film est ajouté. Il faut la calculer <em>dans</em> la requête :</p>
<pre class="bloc-code">SELECT titre, note
FROM films
WHERE note > (SELECT AVG(note) FROM films);</pre>
<p>La sous-requête <code>(SELECT AVG(note) FROM films)</code> renvoie <strong>une seule valeur</strong>. SQL la calcule d'abord, puis s'en sert comme si tu l'avais écrite toi-même.</p>

<h2>Une sous-requête qui renvoie une liste : IN</h2>
<pre class="bloc-code">SELECT titre
FROM films
WHERE id IN (SELECT film_id FROM seances);</pre>
<p>Traduction : « les films dont l'identifiant figure dans la liste des films programmés ». La sous-requête renvoie ici plusieurs valeurs, d'où <code>IN</code> et non <code>=</code>.</p>

<h2>Et son contraire : NOT IN</h2>
<pre class="bloc-code">SELECT titre
FROM films
WHERE id NOT IN (SELECT film_id FROM seances);</pre>
<p>Cette fois : les films <strong>jamais programmés</strong>. C'est une question qu'aucune table ne contient — c'est la requête qui la fabrique.</p>

<div class="attention"><div>Une sous-requête utilisée avec <code>=</code> doit renvoyer <strong>une seule ligne et une seule colonne</strong>. Si elle en renvoie plusieurs, il faut <code>IN</code>. C'est l'erreur la plus fréquente sur ce sujet.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche le <code>titre</code> et la <code>note</code> des films dont la note dépasse <strong>la moyenne générale</strong> — calculée par une sous-requête, pas écrite à la main.',
      codeDepart: 'SELECT titre, note\nFROM films\nWHERE note > \n',
      indices: [
        "Comparer chaque note à la moyenne, c’est comparer à une valeur qu’on ne connaît pas d’avance : il faut la calculer dans la requête elle-même.",
        "Une requête peut en contenir une autre, entre parenthèses. Celle du dedans est calculée en premier, et son résultat sert au <code>WHERE</code>.",
        "<code>WHERE note &gt; (SELECT AVG(note) FROM films)</code>"
      ],
      solution: 'SELECT titre, note\nFROM films\nWHERE note > (SELECT AVG(note) FROM films);',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!/\(\s*select/i.test(ctx.code)) return { ok: false, message: 'La moyenne doit venir d\'une sous-requête entre parenthèses : <code>(SELECT AVG(note) FROM films)</code>. Ne l\'écris pas à la main — elle changerait si on ajoutait un film.' };
        if (ctx.lignes.length !== 4) return { ok: false, message: 'Quatre films dépassent la moyenne (environ 7.61). Ta requête en renvoie ' + ctx.lignes.length + '.' };
        const notes = sqlValeurs(ctx, 'note').map(Number);
        if (notes.some(n => n < 7.61)) return { ok: false, message: 'Un film sous la moyenne est passé à travers le filtre.' };
        return { ok: true, message: 'La moyenne est recalculée à chaque exécution : ta requête restera juste même avec dix mille films de plus.' };
      }
    },
    {
      type: 'sql',
      tables: ['films', 'seances'],
      consigne: '<strong>Entraînement :</strong> affiche le <code>titre</code> des films qui ont <strong>au moins une séance</strong>, en utilisant <code>IN</code> et une sous-requête sur <code>seances</code>.',
      codeDepart: '',
      indices: [
        "Cette fois la sous-requête ne rend pas une valeur mais une <strong>liste</strong>. On ne peut donc pas comparer avec <code>=</code>.",
        "<code>IN</code> demande « est-ce que cette valeur figure dans la liste ? ». La sous-requête fournit la liste.",
        "<code>WHERE id IN (SELECT film_id FROM seances)</code>"
      ],
      solution: 'SELECT titre FROM films WHERE id IN (SELECT film_id FROM seances);',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!/\(\s*select/i.test(ctx.code)) return { ok: false, message: 'Utilise une sous-requête : <code>IN (SELECT film_id FROM seances)</code>.' };
        if (ctx.lignes.length !== 5) return { ok: false, message: 'Cinq films sont programmés au moins une fois. Ta requête en renvoie ' + ctx.lignes.length + '.' };
        return { ok: true, message: 'La sous-requête renvoie plusieurs valeurs, d\'où <code>IN</code> : « fait partie de cette liste ».' };
      }
    },
    {
      type: 'sql',
      tables: ['films', 'seances'],
      consigne: '<strong>Défi :</strong> affiche le <code>titre</code> des films qui n\'ont <strong>jamais été programmés</strong>.',
      codeDepart: '',
      indices: [
        "C’est exactement la question inverse de l’exercice précédent. Un seul mot change.",
        "<code>NOT</code> se glisse devant <code>IN</code> pour renverser la condition.",
        "<code>WHERE id NOT IN (SELECT film_id FROM seances)</code>"
      ],
      solution: 'SELECT titre FROM films WHERE id NOT IN (SELECT film_id FROM seances);',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 3) return { ok: false, message: 'Trois films n\'ont jamais été programmés : « Petit Déjeuner », « Echo » et « Le Phare ». Ta requête en renvoie ' + ctx.lignes.length + '.' };
        const titres = ctx.lignes.map(l => String(l[0])).join(' ');
        if (!/Echo/.test(titres)) return { ok: false, message: 'Le film « Echo » devrait figurer dans le résultat — il n\'apparaît dans aucune séance.' };
        return { ok: true, message: 'Trouver ce qui est ABSENT est souvent plus utile que trouver ce qui est présent : stocks jamais vendus, clients jamais recontactés, factures jamais payées.' };
      }
    }
  ]
},

/* ---------- sql-13 ---------- */
{
  id: 'sql-13',
  titre: 'LEFT JOIN : garder ceux qui n\'ont rien',
  contenu: `
<p>Le <code>JOIN</code> que tu connais ne garde que les lignes qui <strong>trouvent une correspondance</strong>. Un film sans séance disparaît purement et simplement du résultat.</p>

<pre class="bloc-code">SELECT films.titre, seances.jour
FROM films
JOIN seances ON films.id = seances.film_id;
-- les films jamais programmés n'apparaissent pas</pre>

<h2>LEFT JOIN garde tout le monde à gauche</h2>
<pre class="bloc-code">SELECT films.titre, seances.jour
FROM films
LEFT JOIN seances ON films.id = seances.film_id;
-- TOUS les films apparaissent ; jour vaut NULL s'il n'y a pas de séance</pre>

<p>« LEFT » désigne la table écrite <strong>à gauche</strong> du mot JOIN, c'est-à-dire celle du <code>FROM</code>. Toutes ses lignes sont conservées ; quand rien ne correspond à droite, SQL remplit les colonnes manquantes avec <code>NULL</code>.</p>

<h2>L'usage le plus précieux : trouver les absents</h2>
<pre class="bloc-code">SELECT films.titre
FROM films
LEFT JOIN seances ON films.id = seances.film_id
WHERE seances.id IS NULL;</pre>
<p>Astuce à connaître : si la colonne de droite est <code>NULL</code> après un LEFT JOIN, c'est qu'<strong>aucune correspondance n'a été trouvée</strong>. On isole ainsi les orphelins — et c'est souvent exactement ce qu'on cherche : produits jamais commandés, adhérents sans cotisation, machines sans intervention.</p>

<div class="info"><div>Il existe aussi <code>RIGHT JOIN</code> (garder tout à droite) et <code>FULL JOIN</code> (garder les deux côtés). En pratique, on utilise presque toujours <code>LEFT JOIN</code> : il suffit de mettre la table importante en premier.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films', 'seances'],
      consigne: 'Affiche <strong>tous</strong> les films avec le <code>jour</code> de leur séance — y compris ceux qui n\'en ont aucune (leur jour sera <code>NULL</code>).',
      codeDepart: 'SELECT films.titre, seances.jour\nFROM films\n-- remplace par une jointure qui garde tous les films\n',
      indices: [
        "Un <code>JOIN</code> ordinaire écarte les films sans séance : faute de correspondance, la ligne disparaît. Or on veut les garder.",
        "<code>LEFT JOIN</code> garde <strong>toutes</strong> les lignes de la table de gauche, et remplit de <code>NULL</code> ce qui manque à droite.",
        "<code>FROM films LEFT JOIN seances ON films.id = seances.film_id</code>"
      ],
      solution: 'SELECT films.titre, seances.jour\nFROM films\nLEFT JOIN seances ON films.id = seances.film_id;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length === 8) return { ok: false, message: 'Tu obtiens 8 lignes : c\'est un JOIN classique, les films sans séance ont disparu. Utilise <code>LEFT JOIN</code>.' };
        if (ctx.lignes.length !== 11) return { ok: false, message: 'J\'attends 11 lignes : 8 séances + les 3 films jamais programmés. Ta requête en renvoie ' + ctx.lignes.length + '.' };
        const nuls = ctx.lignes.filter(l => l[1] === null || l[1] === undefined).length;
        if (nuls !== 3) return { ok: false, message: 'Il devrait y avoir exactement 3 lignes avec un jour à NULL (les films sans séance).' };
        return { ok: true, message: 'Les NULL ne sont pas des trous : ils disent « ce film existe, mais rien ne lui correspond ».' };
      }
    },
    {
      type: 'sql',
      tables: ['films', 'seances'],
      consigne: '<strong>Entraînement :</strong> affiche uniquement le <code>titre</code> des films <strong>jamais programmés</strong>, en utilisant un <code>LEFT JOIN</code> (pas une sous-requête cette fois).',
      codeDepart: '',
      indices: [
        "Le <code>LEFT JOIN</code> ramène tout le monde. Il reste à ne garder que ceux dont la partie droite est vide.",
        "Ces lignes-là portent des <code>NULL</code> du côté des séances. On les repère donc par un test de nullité.",
        "<code>WHERE seances.id IS NULL</code>, après le <code>LEFT JOIN</code>."
      ],
      solution: 'SELECT films.titre\nFROM films\nLEFT JOIN seances ON films.id = seances.film_id\nWHERE seances.id IS NULL;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!/left\s+join/i.test(ctx.code)) return { ok: false, message: 'L\'exercice demande un <code>LEFT JOIN</code> — c\'est une autre façon d\'obtenir le même résultat que la sous-requête de la leçon précédente.' };
        if (ctx.lignes.length !== 3) return { ok: false, message: 'Trois films n\'ont jamais été programmés. Ta requête en renvoie ' + ctx.lignes.length + '. Pense à filtrer avec <code>WHERE seances.id IS NULL</code>.' };
        return { ok: true, message: 'Deux chemins, un même résultat : sous-requête ou LEFT JOIN. Sur de grandes bases, le LEFT JOIN est souvent le plus rapide.' };
      }
    },
    {
      type: 'sql',
      tables: ['films', 'seances'],
      consigne: '<strong>Défi :</strong> affiche chaque <code>titre</code> avec son <strong>nombre de séances</strong> nommé <code>nb</code> — <strong>y compris les films à zéro séance</strong>. Trie du plus programmé au moins programmé.',
      codeDepart: '',
      indices: [
        "Compter après un <code>LEFT JOIN</code> cache un piège : un film sans séance produit quand même une ligne.",
        "<code>COUNT(*)</code> compterait cette ligne vide et annoncerait 1 au lieu de 0. Compter une <strong>colonne</strong>, en revanche, ignore les <code>NULL</code>.",
        "<code>COUNT(seances.id) AS nb</code>, avec <code>GROUP BY films.titre</code>"
      ],
      solution: 'SELECT films.titre, COUNT(seances.id) AS nb\nFROM films\nLEFT JOIN seances ON films.id = seances.film_id\nGROUP BY films.titre\nORDER BY nb DESC;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('nb')) return { ok: false, message: 'Nomme le compte <code>nb</code> avec <code>AS nb</code>.' };
        if (ctx.lignes.length !== 8) return { ok: false, message: 'J\'attends les 8 films (un par ligne). Ta requête en renvoie ' + ctx.lignes.length + ' — as-tu bien utilisé <code>LEFT JOIN</code> et <code>GROUP BY films.titre</code> ?' };
        const nb = sqlValeurs(ctx, 'nb').map(Number);
        if (nb[0] !== 3) return { ok: false, message: 'Le film le plus programmé a 3 séances : trie avec <code>ORDER BY nb DESC</code>. Ton premier résultat affiche ' + nb[0] + '.' };
        if (!nb.includes(0)) return { ok: false, message: 'Aucun film n\'est à 0 : tu as sans doute utilisé <code>COUNT(*)</code>, qui compte la ligne vide du LEFT JOIN. Utilise <code>COUNT(seances.id)</code>, qui ignore les NULL.' };
        return { ok: true, message: 'La nuance entre <code>COUNT(*)</code> et <code>COUNT(colonne)</code> devient décisive avec un LEFT JOIN. C\'est exactement le genre de détail qui fausse un rapport sans qu\'on s\'en aperçoive.' };
      }
    }
  ]
},

/* ---------- sql-14 ---------- */
{
  id: 'sql-14',
  titre: 'UNION : empiler deux résultats',
  contenu: `
<p>Une jointure met deux tables <strong>côte à côte</strong> (elle ajoute des colonnes). <code>UNION</code> fait tout autre chose : il empile deux résultats <strong>l'un sous l'autre</strong> (il ajoute des lignes).</p>

<pre class="bloc-code">SELECT titre FROM films WHERE annee = 2019
UNION
SELECT titre FROM films WHERE genre = 'Comédie';</pre>

<h2>Les deux règles</h2>
<ol>
<li>les deux requêtes doivent renvoyer <strong>le même nombre de colonnes</strong> ;</li>
<li><code>UNION</code> <strong>supprime les doublons</strong>. Pour tout garder, utilise <code>UNION ALL</code>.</li>
</ol>

<pre class="bloc-code">SELECT genre FROM films WHERE annee = 2019
UNION ALL
SELECT genre FROM films WHERE annee = 2021;
-- ALL conserve les répétitions</pre>

<h2>Quand est-ce vraiment utile ?</h2>
<p>Le cas typique : <strong>rassembler des données de tables différentes</strong> qui décrivent des choses comparables. Une liste unique de tous les contacts d'une entreprise, par exemple, quand clients et fournisseurs sont dans deux tables séparées :</p>
<pre class="bloc-code">SELECT nom, 'client' AS type FROM clients
UNION ALL
SELECT nom, 'fournisseur' AS type FROM fournisseurs;</pre>
<p>Astuce du texte constant (<code>'client'</code>) : il permet de savoir d'où vient chaque ligne dans le résultat combiné.</p>

<div class="attention"><div>Ne confonds pas : <code>JOIN</code> élargit (plus de colonnes), <code>UNION</code> allonge (plus de lignes). Si tu cherches à croiser des informations, c'est un JOIN ; si tu cherches à concaténer des listes, c'est un UNION.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche en une seule liste les <code>titre</code> des films de <strong>2019</strong> et ceux de genre <strong>Comédie</strong>.',
      codeDepart: 'SELECT titre FROM films WHERE annee = 2019\n-- empile la seconde requête ici\n',
      indices: [
        "Deux listes à mettre bout à bout. Ce n’est pas un filtre à deux conditions : ce sont deux requêtes.",
        "<code>UNION</code> s’écrit entre les deux, et la seconde requête est <strong>complète</strong> : son propre <code>SELECT</code>, son propre <code>FROM</code>.",
        "<code>SELECT titre FROM films WHERE annee = 2019</code> · <code>UNION</code> · <code>SELECT titre FROM films WHERE genre = 'Comédie'</code>"
      ],
      solution: "SELECT titre FROM films WHERE annee = 2019\nUNION\nSELECT titre FROM films WHERE genre = 'Comédie';",
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!/union/i.test(ctx.code)) return { ok: false, message: 'Utilise le mot-clé <code>UNION</code> entre les deux requêtes.' };
        if (ctx.lignes.length !== 4) return { ok: false, message: 'J\'attends 4 titres : 2 films de 2019 et 2 comédies. Ta requête en renvoie ' + ctx.lignes.length + '.' };
        return { ok: true, message: 'Deux requêtes, un seul résultat. Chacune peut avoir ses propres conditions — c\'est toute la souplesse d\'UNION.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Entraînement :</strong> empile les <code>genre</code> des films de 2019 et ceux de 2021 <strong>en gardant les doublons</strong>. Tu dois obtenir 4 lignes.',
      codeDepart: '',
      indices: [
        "<code>UNION</code> seul fait discrètement quelque chose qu’on n’a pas demandé : il supprime les doublons.",
        "Pour tout garder, y compris les répétitions, il faut un mot de plus.",
        "<code>UNION ALL</code> au lieu de <code>UNION</code>."
      ],
      solution: 'SELECT genre FROM films WHERE annee = 2019\nUNION ALL\nSELECT genre FROM films WHERE annee = 2021;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length === 3) return { ok: false, message: 'Tu obtiens 3 lignes : les doublons ont été supprimés. Il y a deux comédies en 2021 — pour les garder toutes les deux, utilise <code>UNION ALL</code>.' };
        if (ctx.lignes.length !== 4) return { ok: false, message: 'J\'attends 4 lignes (2 films en 2019, 2 en 2021). Ta requête en renvoie ' + ctx.lignes.length + '.' };
        return { ok: true, message: 'UNION dédoublonne, UNION ALL garde tout — et se trouve être plus rapide, puisqu\'il n\'a rien à comparer.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Quelle est la différence entre <code>JOIN</code> et <code>UNION</code> ?',
      choix: [
        'JOIN ajoute des colonnes (côte à côte), UNION ajoute des lignes (l\'un sous l\'autre)',
        'Ce sont deux mots pour la même opération',
        'JOIN sert aux nombres, UNION au texte',
        'UNION est une version plus rapide de JOIN'
      ],
      bonne: 0,
      explication: 'JOIN croise deux tables pour enrichir chaque ligne (le titre du film à côté de la séance). UNION empile deux résultats qui ont la même forme pour n\'en faire qu\'une seule liste.',
      aides: [
        null,
        'Non : le résultat n\'a ni la même forme ni le même sens. L\'un élargit le tableau, l\'autre l\'allonge.',
        'Le type de données n\'a rien à voir : les deux fonctionnent avec n\'importe quelles colonnes.',
        'Ils ne font pas la même chose, donc la comparaison de vitesse n\'a pas de sens. Ce sont deux outils pour deux besoins différents.'
      ]
    }
  ]
},

/* ---------- sql-15 ---------- */
{
  id: 'sql-15',
  titre: 'CASE WHEN : des colonnes conditionnelles',
  contenu: `
<p><code>CASE WHEN</code> est le <code>if / else if / else</code> du SQL. Il permet de fabriquer une colonne dont la valeur <strong>dépend d'une condition</strong>.</p>

<pre class="bloc-code">SELECT titre, note,
  CASE
    WHEN note >= 8 THEN 'excellent'
    WHEN note >= 7 THEN 'bon'
    ELSE 'moyen'
  END AS avis
FROM films;</pre>

<p>La structure se lit dans l'ordre :</p>
<ul>
<li><code>WHEN condition THEN valeur</code> — autant de fois que nécessaire ;</li>
<li><code>ELSE valeur</code> — le cas par défaut (facultatif ; sans lui, tu obtiens <code>NULL</code>) ;</li>
<li><code>END</code> — <strong>obligatoire</strong>, il ferme le CASE ;</li>
<li><code>AS nom</code> — pour donner un titre à cette colonne inventée.</li>
</ul>
<p>Comme dans un <code>if</code>, <strong>le premier cas vrai gagne</strong> et les suivants sont ignorés. L'ordre des <code>WHEN</code> est donc décisif.</p>

<h2>Transformer une valeur pour un rapport</h2>
<pre class="bloc-code">SELECT titre,
  CASE WHEN note IS NULL THEN 'pas encore noté' ELSE 'noté' END AS statut
FROM films;</pre>

<div class="astuce"><div>C'est l'outil qui transforme des données brutes en <strong>information lisible</strong>. Un tableau de bord n'affiche pas « 8.2 » mais « excellent » ; pas « 0 » mais « rupture de stock ». Le CASE WHEN fait ce travail directement dans la requête, sans qu'aucun code applicatif n'ait à s'en mêler.</div></div>
`,
  exercices: [
    {
      type: 'sql',
      tables: ['films'],
      consigne: 'Affiche le <code>titre</code>, la <code>note</code>, et une colonne <code>avis</code> qui vaut <code>excellent</code> si la note est ≥ 8, <code>bon</code> si elle est ≥ 7, et <code>moyen</code> sinon.',
      codeDepart: 'SELECT titre, note,\n  -- ton CASE ici\nFROM films;',
      indices: [
        "On veut une colonne qui n’existe pas dans la table, et dont la valeur dépend d’une condition.",
        "<code>CASE</code> enchaîne des <code>WHEN … THEN …</code>, puis un <code>ELSE</code> pour le reste. Et il se ferme par un mot qu’on oublie souvent.",
        "<code>CASE WHEN note &gt;= 8 THEN 'excellent' WHEN note &gt;= 7 THEN 'bon' ELSE 'moyen' END AS avis</code>"
      ],
      solution: "SELECT titre, note,\n  CASE\n    WHEN note >= 8 THEN 'excellent'\n    WHEN note >= 7 THEN 'bon'\n    ELSE 'moyen'\n  END AS avis\nFROM films;",
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('avis')) return { ok: false, message: 'Nomme la colonne calculée <code>avis</code> avec <code>AS avis</code>. Colonnes actuelles : ' + ctx.colonnes.join(', ') + '.' };
        const avis = sqlValeurs(ctx, 'avis').map(v => String(v));
        const notes = sqlValeurs(ctx, 'note');
        if (ctx.lignes.length !== 8) return { ok: false, message: 'Les 8 films doivent apparaître.' };
        for (let i = 0; i < notes.length; i++) {
          const n = notes[i];
          const attendu = (n !== null && Number(n) >= 8) ? 'excellent' : (n !== null && Number(n) >= 7) ? 'bon' : 'moyen';
          if (avis[i] !== attendu) return { ok: false, message: 'Pour la note ' + (n === null ? 'NULL' : n) + ', j\'attends « ' + attendu + ' » mais j\'obtiens « ' + avis[i] + ' ». Vérifie l\'ordre de tes WHEN : le premier vrai l\'emporte.' };
        }
        return { ok: true, message: 'Remarque le film sans note : NULL n\'est ni ≥ 8 ni ≥ 7, il tombe donc dans le ELSE.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Entraînement :</strong> affiche le <code>titre</code> et une colonne <code>statut</code> valant <code>pas encore noté</code> quand la note est vide, et <code>noté</code> sinon.',
      codeDepart: '',
      indices: [
        "Même structure, mais la condition ne porte pas sur une valeur : elle porte sur son <strong>absence</strong>.",
        "Une case vide se teste avec <code>IS NULL</code>, jamais avec <code>=</code>. Un seul <code>WHEN</code> suffit ici.",
        "<code>CASE WHEN note IS NULL THEN 'pas encore noté' ELSE 'noté' END AS statut</code>"
      ],
      solution: "SELECT titre,\n  CASE WHEN note IS NULL THEN 'pas encore noté' ELSE 'noté' END AS statut\nFROM films;",
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('statut')) return { ok: false, message: 'Nomme la colonne <code>statut</code> avec <code>AS statut</code>.' };
        const st = sqlValeurs(ctx, 'statut').map(v => String(v));
        const sansNote = st.filter(v => v === 'pas encore noté').length;
        if (sansNote !== 1) return { ok: false, message: 'Un seul film n\'a pas de note (« Echo ») : j\'attends une seule ligne « pas encore noté », j\'en compte ' + sansNote + '. Rappel : une case vide se teste avec <code>IS NULL</code>, jamais avec <code>= NULL</code>.' };
        if (st.filter(v => v === 'noté').length !== 7) return { ok: false, message: 'Les 7 autres films doivent afficher « noté ».' };
        return { ok: true, message: 'Une donnée manquante devient un message clair. C\'est ce qui sépare une base de données d\'un rapport lisible.' };
      }
    },
    {
      type: 'sql',
      tables: ['films'],
      consigne: '<strong>Défi :</strong> affiche le <code>titre</code> et une colonne <code>duree_texte</code> valant <code>long</code> si la durée dépasse 120 minutes, <code>moyen</code> entre 100 et 120 inclus, et <code>court</code> en dessous.',
      codeDepart: '',
      indices: [
        "Trois cas, et comme pour un <code>else if</code>, l’ordre décide de tout.",
        "Le premier <code>WHEN</code> vrai l’emporte : il faut donc commencer par le seuil le plus élevé. Le second n’a alors plus besoin de retester la borne haute.",
        "<code>WHEN duree &gt; 120 THEN 'long' WHEN duree &gt;= 100 THEN 'moyen' ELSE 'court'</code>"
      ],
      solution: "SELECT titre,\n  CASE\n    WHEN duree > 120 THEN 'long'\n    WHEN duree >= 100 THEN 'moyen'\n    ELSE 'court'\n  END AS duree_texte\nFROM films;",
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (!sqlColonnes(ctx).includes('duree_texte')) return { ok: false, message: 'Nomme la colonne <code>duree_texte</code> avec <code>AS duree_texte</code>.' };
        const v = sqlValeurs(ctx, 'duree_texte').map(x => String(x));
        const attendus = ['moyen', 'long', 'court', 'moyen', 'long', 'court', 'long', 'moyen'];
        for (let i = 0; i < attendus.length; i++) {
          if (v[i] !== attendus[i]) return { ok: false, message: 'Ligne ' + (i + 1) + ' : j\'attends « ' + attendus[i] +' » et j\'obtiens « ' + v[i] + ' ». Attention aux bornes : « plus de 120 » est strict, « entre 100 et 120 » inclut les deux.' };
        }
        return { ok: true, message: 'Trois catégories fabriquées à partir d\'un nombre. Ajoute un <code>GROUP BY duree_texte</code> et tu obtiens directement la répartition du catalogue.' };
      }
    }
  ]
},

/* ---------- sql-16 ---------- */
{
  id: 'sql-16',
  titre: 'Concevoir une base : clés, index, normalisation',
  contenu: `
<p>Tu sais interroger une base. Cette dernière leçon aborde l'autre moitié du métier : <strong>bien la construire</strong>. Une base mal conçue rend certaines questions impossibles à poser.</p>

<h2>La clé primaire</h2>
<p>C'est la colonne qui identifie chaque ligne de façon unique — presque toujours nommée <code>id</code>. Elle ne peut être ni vide ni répétée. Sans elle, impossible de désigner une ligne précise : imagine deux clients homonymes.</p>

<h2>La clé étrangère</h2>
<p>C'est une colonne qui <strong>pointe vers la clé primaire d'une autre table</strong>. Dans notre base, <code>seances.film_id</code> pointe vers <code>films.id</code>. C'est ce lien qui rend les jointures possibles — et la base de données peut même refuser une séance qui référencerait un film inexistant.</p>

<h2>La normalisation : ne jamais répéter une information</h2>
<p>Imagine qu'on stocke le titre du film directement dans chaque séance :</p>
<table class="memo-table">
<tr><th>id</th><th>titre_film</th><th>jour</th></tr>
<tr><td>1</td><td>Sable et Cendres</td><td>lundi</td></tr>
<tr><td>2</td><td>Sable et Cendres</td><td>mardi</td></tr>
<tr><td>3</td><td>Sable et Cendre</td><td>mercredi</td></tr>
</table>
<p>Trois problèmes surgissent aussitôt :</p>
<ul>
<li>une faute de frappe crée un « nouveau » film (ligne 3) ;</li>
<li>corriger le titre oblige à modifier toutes les lignes ;</li>
<li>on ne peut pas enregistrer un film qui n'a pas encore de séance.</li>
</ul>
<p>La solution — une table <code>films</code> séparée et un simple <code>film_id</code> — s'appelle la <strong>normalisation</strong> : chaque information n'existe qu'à un seul endroit.</p>

<h2>Les index : le sommaire de la base</h2>
<p>Sans index, chercher <code>WHERE titre = 'Echo'</code> oblige la base à lire <strong>toutes</strong> les lignes. Un index est une structure de recherche, comme l'index d'un livre : au lieu de parcourir 500 pages, on regarde le sommaire.</p>
<pre class="bloc-code">CREATE INDEX idx_titre ON films(titre);</pre>
<p>Sur une table d'un million de lignes, une recherche peut passer de plusieurs secondes à moins d'une milliseconde. En contrepartie, chaque index ralentit un peu les écritures et occupe de l'espace : on n'en met donc que sur les colonnes réellement utilisées dans les <code>WHERE</code> et les <code>JOIN</code>.</p>

<div class="info"><div>Ces trois notions — clés, normalisation, index — sont ce qui distingue une base qui tient dix ans d'un fichier Excel géant. Elles sont aussi ce qu'on te demandera en entretien pour tout poste touchant aux données.</div></div>
`,
  exercices: [
    {
      type: 'qcm',
      consigne: 'Pourquoi la table <code>seances</code> stocke-t-elle un <code>film_id</code> plutôt que le titre du film ?',
      choix: [
        'Pour que l\'information n\'existe qu\'à un seul endroit et reste corrigeable d\'un coup',
        'Parce que les nombres prennent moins de place que le texte',
        'Parce que SQL interdit le texte dans une table de liaison',
        'Pour que les requêtes soient plus courtes à écrire'
      ],
      bonne: 0,
      explication: 'C\'est le principe de normalisation. Le titre n\'existe qu\'une fois, dans films. Le corriger met à jour toutes les séances d\'un seul coup, et aucune faute de frappe ne peut créer un doublon fantôme.',
      aides: [
        null,
        'L\'espace est un bénéfice secondaire, réel mais mineur. Le vrai enjeu est la cohérence : une seule source de vérité.',
        'Rien ne l\'interdit techniquement — c\'est un choix de conception, pas une contrainte du langage.',
        'Au contraire : cela oblige à écrire une jointure. On accepte cette complexité pour garantir la cohérence des données.'
      ]
    },
    {
      type: 'qcm',
      consigne: 'À quoi sert un <strong>index</strong> sur une colonne ?',
      choix: [
        'À accélérer les recherches sur cette colonne, comme l\'index d\'un livre',
        'À empêcher les doublons dans cette colonne',
        'À trier automatiquement la table',
        'À réduire la taille de la base'
      ],
      bonne: 0,
      explication: 'Sans index, la base lit toutes les lignes pour trouver ce que tu cherches. Avec, elle va droit au but. Le prix à payer : des écritures un peu plus lentes et un peu d\'espace disque en plus.',
      aides: [
        null,
        'C\'est le rôle d\'une contrainte UNIQUE. Un index ordinaire accepte parfaitement les valeurs répétées.',
        'L\'ordre d\'affichage se demande toujours avec ORDER BY. L\'index organise la recherche en interne, pas le résultat.',
        'C\'est l\'inverse : un index occupe de l\'espace supplémentaire. On l\'accepte pour gagner en vitesse de lecture.'
      ]
    },
    {
      type: 'sql',
      tables: ['films', 'seances', 'salles'],
      consigne: '<strong>Bilan du module :</strong> pour chaque <strong>ville</strong>, affiche le nombre de séances (<code>nb</code>) et le total de spectateurs (<code>total</code>), uniquement pour les villes ayant accueilli <strong>plus de 2 séances</strong>, triées par total décroissant.',
      codeDepart: '',
      indices: [
        "Bilan du module : tout y passe — relier, regrouper, filtrer les groupes, trier.",
        "Le filtre porte sur le <strong>nombre de séances par ville</strong>, donc sur un agrégat : c’est <code>HAVING</code>, pas <code>WHERE</code>.",
        "<code>GROUP BY salles.ville HAVING COUNT(*) &gt; 2</code>, puis <code>ORDER BY total DESC</code>"
      ],
      solution: 'SELECT salles.ville, COUNT(*) AS nb, SUM(seances.spectateurs) AS total\nFROM seances\nJOIN salles ON seances.salle_id = salles.id\nGROUP BY salles.ville\nHAVING COUNT(*) > 2\nORDER BY total DESC;',
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        const c = sqlColonnes(ctx);
        if (!c.includes('nb') || !c.includes('total')) return { ok: false, message: 'Nomme les colonnes <code>nb</code> et <code>total</code> avec <code>AS</code>. Actuellement : ' + ctx.colonnes.join(', ') + '.' };
        if (ctx.lignes.length !== 1) return { ok: false, message: 'Une seule ville dépasse 2 séances : Lyon, avec 4. Ta requête renvoie ' + ctx.lignes.length + ' ligne(s) — vérifie le <code>HAVING COUNT(*) > 2</code>.' };
        if (Number(sqlValeurs(ctx, 'nb')[0]) !== 4) return { ok: false, message: 'Lyon a accueilli 4 séances (deux salles). Tu affiches ' + sqlValeurs(ctx, 'nb')[0] + '.' };
        if (Number(sqlValeurs(ctx, 'total')[0]) !== 595) return { ok: false, message: 'Le total lyonnais est 595 spectateurs (210 + 45 + 260 + 80). Tu affiches ' + sqlValeurs(ctx, 'total')[0] + ' — utilise <code>SUM</code>, pas <code>COUNT</code>.' };
        return { ok: true, message: 'Module SQL complet ! 🗄 Jointures, agrégats, groupes, filtres de groupes, sous-requêtes, LEFT JOIN, UNION, CASE — tu disposes maintenant de tout l\'outillage d\'un analyste de données.' };
      }
    }
  ]
}
];
