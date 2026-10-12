/* ===== SQL — seconde partie (sql-11 à sql-16) ===== */
window.DATA_SQL2 = [

/* ---------- sql-11 ---------- */
{
  id: 'sql-11',
  titre: 'HAVING : filtrer les groupes',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu sais filtrer des lignes avec <code>WHERE</code> et regrouper avec <code>GROUP BY</code>. Mais comment ne garder que les genres qui comptent plus d'un film ?</p>
<p>Le filtre ne porte plus sur une ligne : il porte sur le <strong>résultat d'un calcul de groupe</strong>. Or au moment du <code>WHERE</code>, les groupes n'existent pas encore. D'où un second mot-clé.</p>

<h2>HAVING</h2>
<pre class="bloc-code">SELECT genre, COUNT(*) AS nombre
FROM films
GROUP BY genre
HAVING COUNT(*) &gt; 1;</pre>
<p>Mesuré : trois lignes — Thriller, Drame, Comédie. Le genre Aventure, qui n'a qu'un film, a disparu.</p>
<p><code>HAVING</code> se place <strong>après</strong> le <code>GROUP BY</code>, et peut utiliser les fonctions d'agrégat, ce que <code>WHERE</code> ne peut pas.</p>

<h2>Pas à pas : les deux filtres</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui est filtré</th></tr>
<tr><td><code>FROM films</code></td><td>8 lignes</td></tr>
<tr><td><code>WHERE annee &gt; 2020</code></td><td>des <strong>lignes</strong> sont retirées, avant tout regroupement</td></tr>
<tr><td><code>GROUP BY genre</code></td><td>ce qui reste se range en paquets</td></tr>
<tr><td><code>HAVING COUNT(*) &gt; 1</code></td><td>des <strong>paquets</strong> entiers sont retirés</td></tr>
</table>
<p>Les deux coexistent très bien dans la même requête, et ils ne font pas la même chose : <code>WHERE</code> décide qui entre dans les paquets, <code>HAVING</code> décide quels paquets sortent.</p>
<p>Conséquence pratique : quand les deux sont possibles, <strong>préfère <code>WHERE</code></strong>. Filtrer avant le regroupement, c'est regrouper moins de lignes — donc aller plus vite.</p>

<h2>Les pièges</h2>
<p><strong>Mettre un agrégat dans le <code>WHERE</code>.</strong> Le moteur du cours est explicite : <em>« la fonction <code>COUNT()</code> ne peut pas s'utiliser ici (elle sert à résumer un groupe de lignes, dans SELECT ou HAVING). »</em> Sur une vraie base, le message serait bien plus sec.</p>
<p><strong>Mettre une condition de ligne dans le <code>HAVING</code>.</strong> <code>HAVING annee &gt; 2020</code> peut fonctionner, et c'est une mauvaise idée : le filtre s'applique trop tard, après avoir regroupé des lignes dont on ne voulait pas.</p>
<p><strong>Oublier le <code>GROUP BY</code>.</strong> Un <code>HAVING</code> sans regroupement traite tout le résultat comme un seul paquet. Ça ne lève pas d'erreur, et ça ne fait presque jamais ce qu'on voulait.</p>
<p><strong>Croire qu'on peut utiliser l'alias.</strong> <code>HAVING nombre &gt; 1</code> échoue sur beaucoup de bases : le <code>SELECT</code> s'exécute <em>après</em> le <code>HAVING</code>, donc l'alias n'existe pas encore. On répète <code>COUNT(*)</code>.</p>

<h2>Dans la vraie vie</h2>
<p>« Les clients ayant passé plus de trois commandes », « les produits vendus au moins dix fois », « les jours où les ventes ont dépassé mille euros » : toutes ces questions sont des <code>HAVING</code>. Dès qu'un énoncé contient « ayant plus de » suivi d'un décompte, c'est le signal.</p>

<div class="a-retenir">
<ul>
<li><code>WHERE</code> filtre des <strong>lignes</strong> avant le regroupement ; <code>HAVING</code> filtre des <strong>groupes</strong> après.</li>
<li>Seul <code>HAVING</code> accepte les fonctions d'agrégat.</li>
<li>Quand les deux sont possibles, <code>WHERE</code> est plus rapide.</li>
<li>L'alias du <code>SELECT</code> n'est pas disponible dans le <code>HAVING</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le repère qui tranche</summary>
<p>Une question simple suffit à choisir : <em>ma condition a-t-elle besoin d'avoir vu plusieurs lignes ?</em> « L'année est supérieure à 2020 » se juge sur une ligne seule — c'est un <code>WHERE</code>. « Il y a plus d'un film » demande de les avoir comptés — c'est un <code>HAVING</code>. Ce test fonctionne à tous les coups.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>« Quels films ont une note supérieure à la moyenne ? » Cette question paraît simple, et elle ne l'est pas : pour filtrer, il faut connaître la moyenne — qui se calcule elle-même sur toute la table.</p>
<p>On pourrait faire deux requêtes : calculer la moyenne, lire le résultat, l'écrire à la main dans la seconde. Ça marche une fois, et c'est faux dès que la table change. Une <strong>sous-requête</strong> fait les deux d'un coup.</p>

<h2>La forme</h2>
<pre class="bloc-code">SELECT titre, note
FROM films
WHERE note &gt; (SELECT AVG(note) FROM films);</pre>
<p>Mesuré : quatre films. La requête entre parenthèses s'exécute d'abord, rend une valeur unique — 7.614286 — et la requête principale s'en sert comme d'un nombre ordinaire.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>la sous-requête</td><td><code>AVG(note)</code> sur les 8 films : <strong>7.614286</strong></td></tr>
<tr><td>elle est remplacée</td><td>la condition devient <code>note &gt; 7.614286</code></td></tr>
<tr><td>la requête principale</td><td>garde les 4 films au-dessus</td></tr>
</table>
<p>Le point à comprendre : le résultat n'est pas figé. Ajoute un film, et la moyenne change — la requête reste juste, sans qu'on la modifie.</p>

<h2>Les trois formes</h2>
<ul>
<li><strong>Une valeur</strong> — avec <code>=</code>, <code>&gt;</code>, <code>&lt;</code> : la sous-requête doit rendre une seule case ;</li>
<li><strong>Une liste</strong> — avec <code>IN</code> : <code>WHERE id IN (SELECT film_id FROM seances)</code> ;</li>
<li><strong>Une existence</strong> — avec <code>EXISTS</code> : « y a-t-il au moins une ligne ? », sans se soucier de laquelle.</li>
</ul>
<p>La deuxième forme est très courante : elle répond à « les films qui ont au moins une séance » sans jointure et sans risque de dupliquer des lignes.</p>

<h2>Les pièges</h2>
<p><strong>Rendre plusieurs lignes là où une est attendue.</strong> <code>WHERE note &gt; (SELECT note FROM films)</code> ne peut pas marcher : huit valeurs, et une comparaison qui en attend une. Avec <code>IN</code>, en revanche, plusieurs lignes sont exactement ce qu'il faut.</p>
<p><strong>Oublier les parenthèses.</strong> Une sous-requête en est toujours entourée, sans exception.</p>
<p><strong>En empiler trois.</strong> Une sous-requête dans une sous-requête dans une sous-requête est juste, et illisible. Au-delà d'un niveau, une jointure ou une étape intermédiaire dit mieux l'intention.</p>
<p><strong>Oublier les NULL avec <code>NOT IN</code>.</strong> Si la sous-requête rend ne serait-ce qu'une valeur absente, <code>NOT IN</code> ne rend <strong>aucune ligne</strong> — jamais. C'est la logique à trois valeurs, et c'est l'un des pièges les plus retors du langage.</p>

<h2>Dans la vraie vie</h2>
<p>« Les commandes supérieures au panier moyen », « les produits jamais vendus », « les clients sans commande ce mois-ci » : toutes ces questions passent par une sous-requête. C'est aussi l'outil qui permet d'écrire une requête <em>auto-adaptative</em> — qui reste juste quand les données changent.</p>

<div class="a-retenir">
<ul>
<li>Une sous-requête est une requête entre parenthèses, exécutée en premier.</li>
<li>Une valeur avec <code>=</code> ou <code>&gt;</code> ; une liste avec <code>IN</code> ; une existence avec <code>EXISTS</code>.</li>
<li>Elle reste juste quand les données changent — contrairement à une valeur écrite à la main.</li>
<li><code>NOT IN</code> sur une liste contenant un NULL ne rend jamais rien.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la sous-requête corrélée</summary>
<p>Une sous-requête peut faire référence à la ligne en cours de la requête principale — on l'appelle alors <em>corrélée</em>, et elle est réexécutée pour chaque ligne. C'est très expressif, et très coûteux : sur un million de lignes, c'est un million de requêtes. Les moteurs modernes savent souvent la réécrire en jointure, mais pas toujours. Quand une requête est inexplicablement lente, c'est l'une des premières choses à regarder.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Le <code>JOIN</code> que tu connais ne garde que les lignes qui trouvent une <strong>correspondance</strong>. Un film sans séance disparaît purement et simplement du résultat.</p>
<p>C'est souvent ce qu'on veut — et parfois exactement l'inverse. « Quels films n'ont jamais été programmés ? » est une question légitime, et le <code>JOIN</code> ordinaire est incapable d'y répondre : les films concernés sont précisément ceux qu'il écarte.</p>

<h2>LEFT JOIN</h2>
<pre class="bloc-code">SELECT films.titre, seances.jour
FROM films
LEFT JOIN seances ON films.id = seances.film_id;</pre>
<p>Mesuré : <strong>11 lignes</strong>, contre 8 pour le <code>JOIN</code> ordinaire. Trois films sans séance apparaissent, avec <code>NULL</code> dans la colonne <code>jour</code>.</p>
<p>Le mot « LEFT » désigne la table écrite <em>à gauche</em> du <code>JOIN</code> : toutes ses lignes sont conservées, qu'elles trouvent une correspondance ou non. Celles de droite ne viennent que si elles correspondent.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Cas</th><th>JOIN</th><th>LEFT JOIN</th></tr>
<tr><td>film avec 2 séances</td><td>2 lignes</td><td>2 lignes</td></tr>
<tr><td>film avec 1 séance</td><td>1 ligne</td><td>1 ligne</td></tr>
<tr><td>film <strong>sans</strong> séance</td><td><strong>absent</strong></td><td>1 ligne, <code>jour</code> à NULL</td></tr>
<tr><td>total mesuré</td><td><strong>8</strong></td><td><strong>11</strong></td></tr>
</table>

<h2>Trouver les orphelins</h2>
<pre class="bloc-code">SELECT films.titre
FROM films
LEFT JOIN seances ON films.id = seances.film_id
WHERE seances.id IS NULL;</pre>
<p>Voilà la réponse à « quels films n'ont jamais été programmés ». L'astuce est élégante : on joint tout, puis on ne garde que les lignes où la table de droite n'a rien apporté — c'est-à-dire là où sa clé est NULL.</p>
<p>Ce motif a un nom dans le métier : la <em>jointure anti</em>. Il sert partout — clients sans commande, produits sans stock, utilisateurs sans activité.</p>

<h2>Les pièges</h2>
<p><strong>Mettre la condition dans le <code>WHERE</code> au lieu du <code>ON</code>.</strong> C'est le piège sérieux. <code>LEFT JOIN seances ... WHERE seances.jour = 'lundi'</code> élimine les films sans séance, puisque leur <code>jour</code> est NULL : le <code>LEFT JOIN</code> redevient un <code>JOIN</code> ordinaire, sans que rien ne le signale. La condition sur la table de droite va dans le <code>ON</code>.</p>
<p><strong>Compter après un <code>LEFT JOIN</code>.</strong> <code>COUNT(*)</code> compte aussi les lignes vides. Pour compter les séances réelles, c'est <code>COUNT(seances.id)</code>, qui ignore les NULL — et la distinction vue en <code>sql-6</code> prend ici tout son sens.</p>
<p><strong>Inverser les tables.</strong> C'est celle de gauche qui est conservée. Écrire <code>FROM seances LEFT JOIN films</code> répond à une tout autre question.</p>

<h2>Dans la vraie vie</h2>
<p>Le <code>LEFT JOIN</code> est la jointure la plus utilisée des rapports : on part toujours de la liste complète — tous les clients, tous les produits — et l'on y rattache ce qui existe. Un rapport fait au <code>JOIN</code> ordinaire oublie silencieusement tous ceux qui n'ont rien, et personne ne s'en aperçoit.</p>

<div class="a-retenir">
<ul>
<li><code>LEFT JOIN</code> garde <strong>toutes</strong> les lignes de la table de gauche.</li>
<li>Les colonnes de droite valent NULL quand il n'y a pas de correspondance.</li>
<li><code>WHERE cledroite IS NULL</code> trouve les orphelins.</li>
<li>Une condition sur la table de droite va dans le <code>ON</code>, pas dans le <code>WHERE</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les autres jointures</summary>
<p><code>RIGHT JOIN</code> fait l'inverse — on l'écrit rarement, puisqu'il suffit d'intervertir les tables. <code>FULL OUTER JOIN</code> garde les orphelins des deux côtés, utile pour comparer deux sources de données. Et <code>CROSS JOIN</code> apparie chaque ligne avec chaque ligne, ce qui sert à générer des combinaisons — toutes les tailles pour toutes les couleurs, par exemple.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Une jointure met deux tables <strong>côte à côte</strong> : elle ajoute des colonnes. <code>UNION</code> fait tout autre chose — il <strong>empile</strong> deux résultats l'un sous l'autre, et ajoute donc des lignes.</p>
<p>On s'en sert quand une même question a deux réponses de nature différente, qu'on veut voir ensemble : les films de 2023 <em>et</em> les drames, les commandes en cours <em>et</em> les commandes archivées.</p>

<h2>La forme</h2>
<pre class="bloc-code">SELECT titre FROM films WHERE annee = 2023
UNION
SELECT titre FROM films WHERE genre = 'Drame';</pre>
<p>Mesuré : quatre lignes. Deux conditions, un seul résultat.</p>
<p>Deux règles non négociables : les deux requêtes doivent rendre <strong>le même nombre de colonnes</strong>, et des types compatibles. Les noms de colonnes du résultat sont ceux de la première.</p>

<h2>Pas à pas : UNION ou UNION ALL ?</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Lignes</th><th>Ce qu'elle fait</th></tr>
<tr><td><code>UNION</code></td><td><strong>4</strong></td><td>empile, puis <em>retire les doublons</em></td></tr>
<tr><td><code>UNION ALL</code></td><td><strong>5</strong></td><td>empile, et garde tout</td></tr>
</table>
<p>Mesuré. L'écart d'une ligne s'explique : « Sable et Cendres » est à la fois de 2023 et un drame. Il apparaît dans les deux requêtes — <code>UNION</code> n'en garde qu'un, <code>UNION ALL</code> les garde tous les deux.</p>
<p>Le choix n'est pas cosmétique. Retirer les doublons oblige le moteur à comparer toutes les lignes entre elles, ce qui coûte cher sur de gros volumes. <strong>Quand tu sais qu'il n'y a pas de doublon possible, <code>UNION ALL</code> est nettement plus rapide.</strong></p>

<h2>Trier le tout</h2>
<p>Un <code>ORDER BY</code> se place <strong>à la fin</strong>, après la dernière requête, et s'applique à l'ensemble. Le mettre au milieu n'aurait pas de sens : on trierait un morceau avant de l'empiler.</p>

<h2>Les pièges</h2>
<p><strong>Un nombre de colonnes différent.</strong> La base refuse net. C'est l'erreur la plus fréquente, et au moins elle est signalée.</p>
<p><strong>Des colonnes dans le désordre.</strong> Si la première requête rend <code>titre, annee</code> et la seconde <code>annee, titre</code>, le compte est bon — et les données se mélangent. Aucune erreur : des années apparaissent dans la colonne des titres.</p>
<p><strong>Oublier que <code>UNION</code> dédoublonne.</strong> Un total calculé dessus peut être inférieur à la réalité, sans que rien ne le signale.</p>
<p><strong>Confondre avec <code>JOIN</code>.</strong> La question à se poser : est-ce que je veux <em>plus de colonnes</em> (jointure) ou <em>plus de lignes</em> (union) ?</p>

<h2>Dans la vraie vie</h2>
<p><code>UNION ALL</code> sert à rassembler des données découpées : des tables mensuelles d'archives, plusieurs sources à consolider. Et pour construire un tableau de bord qui empile des indicateurs hétérogènes, c'est souvent la seule façon d'obtenir un résultat d'un seul tenant.</p>

<div class="a-retenir">
<ul>
<li><code>JOIN</code> ajoute des colonnes, <code>UNION</code> ajoute des lignes.</li>
<li>Même nombre de colonnes, types compatibles, et les noms viennent de la première requête.</li>
<li><code>UNION</code> retire les doublons ; <code>UNION ALL</code> garde tout et va plus vite.</li>
<li>L'<code>ORDER BY</code> se place à la toute fin.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : INTERSECT et EXCEPT</summary>
<p>Deux cousins, moins connus et parfois très commodes : <code>INTERSECT</code> ne garde que ce qui figure dans <em>les deux</em> résultats, <code>EXCEPT</code> ne garde que ce qui est dans le premier et pas dans le second. On peut obtenir la même chose avec des jointures ou des sous-requêtes, mais ces deux mots-clés disent l'intention bien plus directement.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p><code>CASE WHEN</code> est le <code>if / else if / else</code> du SQL. Il permet de fabriquer une colonne dont la valeur <strong>dépend d'une condition</strong> — une appréciation à partir d'une note, une tranche d'âge à partir d'un âge, un libellé à partir d'un code.</p>
<p>Sans lui, il faudrait sortir les données brutes et les traiter ailleurs. Avec lui, la base rend directement le tableau qu'on voulait.</p>

<h2>La forme</h2>
<pre class="bloc-code">SELECT titre, note,
  CASE
    WHEN note &gt;= 8 THEN 'excellent'
    WHEN note &gt;= 7 THEN 'bon'
    ELSE 'moyen'
  END AS avis
FROM films;</pre>
<p>Mesuré : huit lignes, une appréciation par film. Le <code>END</code> ferme le bloc, et <code>AS</code> nomme la colonne — sans quoi elle s'appellerait quelque chose d'inexploitable.</p>

<h2>Pas à pas : le premier vrai l'emporte</h2>
<table class="memo-table trace">
<tr><th>Note</th><th>1er WHEN (&gt;= 8)</th><th>2e WHEN (&gt;= 7)</th><th>Résultat</th></tr>
<tr><td>9.1</td><td><strong>vrai</strong> — on s'arrête</td><td>pas testé</td><td>excellent</td></tr>
<tr><td>7.8</td><td>faux</td><td><strong>vrai</strong></td><td>bon</td></tr>
<tr><td>6.4</td><td>faux</td><td>faux</td><td>moyen (ELSE)</td></tr>
</table>
<p>Les conditions sont testées <strong>dans l'ordre</strong>, et la première vraie gagne. C'est exactement le comportement d'un <code>elif</code> — et cela implique une règle : <strong>du plus exigeant au moins exigeant</strong>.</p>
<p>Inverse les deux premières lignes, et tout devient « bon » : une note de 9.1 passe le test <code>&gt;= 7</code> en premier, et « excellent » n'est jamais atteint. Aucune erreur ne le signale.</p>

<h2>Les pièges</h2>
<p><strong>Mettre les conditions dans le mauvais ordre.</strong> Le piège central, et il est silencieux. Si toutes tes lignes tombent dans la même catégorie, c'est presque toujours ça.</p>
<p><strong>Oublier le <code>ELSE</code>.</strong> Sans lui, les lignes qui ne correspondent à rien reçoivent <code>NULL</code>. Ce n'est pas une erreur, et c'est rarement ce qu'on voulait — un <code>ELSE 'inconnu'</code> rend le résultat lisible.</p>
<p><strong>Oublier que NULL ne passe aucun test.</strong> Le film sans note ne vaut ni <code>&gt;= 8</code> ni <code>&gt;= 7</code> : il tombe dans le <code>ELSE</code>. Si tu veux le distinguer, il faut un <code>WHEN note IS NULL</code> — et le placer <strong>en premier</strong>.</p>
<p><strong>Oublier le <code>END</code>.</strong> Le bloc n'est pas fermé, et la requête entière devient incompréhensible pour le moteur.</p>

<h2>Dans la vraie vie</h2>
<p>Traduire des codes en libellés lisibles, répartir en tranches, marquer des lignes à traiter : <code>CASE WHEN</code> est partout dans les rapports. Il sert aussi dans un <code>ORDER BY</code>, pour imposer un ordre qui n'est ni alphabétique ni numérique — faire remonter les urgences en premier, par exemple.</p>

<div class="a-retenir">
<ul>
<li><code>CASE WHEN ... THEN ... ELSE ... END</code>, et <code>AS</code> pour nommer la colonne.</li>
<li>Les conditions sont testées dans l'ordre : <strong>la première vraie l'emporte</strong>.</li>
<li>On écrit du plus exigeant au moins exigeant.</li>
<li>Une valeur NULL ne passe aucun test et tombe dans le <code>ELSE</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : compter par catégorie en une requête</summary>
<p>Combiné à <code>SUM</code>, le <code>CASE</code> permet de compter plusieurs catégories sur une seule ligne : <code>SUM(CASE WHEN note &gt;= 8 THEN 1 ELSE 0 END) AS excellents</code>. On obtient ainsi un tableau à plusieurs colonnes là où un <code>GROUP BY</code> donnerait plusieurs lignes. C'est la façon manuelle de faire ce qu'on appelle un tableau croisé — et elle marche sur toutes les bases.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Tu sais interroger une base. Cette leçon aborde l'autre moitié du métier : bien la <strong>construire</strong>. Et c'est la moitié décisive — une base mal conçue rend certaines questions impossibles à poser, ou leurs réponses fausses.</p>
<p>Le pire est qu'on ne s'en aperçoit qu'une fois les données accumulées, quand il est coûteux de revenir en arrière.</p>

<h2>La clé primaire</h2>
<p>C'est la colonne qui identifie une ligne de façon <strong>unique et définitive</strong>. Dans <code>films</code>, c'est <code>id</code>. La base garantit alors deux choses : jamais deux fois la même valeur, et jamais de valeur absente.</p>
<p>Pourquoi un numéro plutôt que le titre ? Parce qu'un titre peut changer, se répéter, contenir une faute. Une clé ne doit <em>jamais</em> porter de sens métier — sinon le jour où le sens change, toutes les références deviennent fausses.</p>

<h2>La clé étrangère</h2>
<p><code>seances.film_id</code> pointe vers <code>films.id</code>. Déclarée comme clé étrangère, la base refuse alors d'insérer une séance pour un film inexistant, et peut empêcher de supprimer un film encore programmé.</p>
<p>C'est ce qui garantit qu'une base ne contient jamais de référence dans le vide — une cohérence que le code applicatif, seul, finit toujours par laisser échapper.</p>

<h2>Ne jamais répéter : la normalisation</h2>
<table class="memo-table trace">
<tr><th>Mauvais</th><th>Bon</th></tr>
<tr><td>le titre du film dans chaque séance</td><td>un <code>film_id</code> qui pointe</td></tr>
<tr><td>à corriger partout en cas de faute</td><td>à corriger <strong>une fois</strong></td></tr>
<tr><td>deux lignes peuvent se contredire</td><td>impossible</td></tr>
</table>
<p>La règle tient en une phrase : <strong>une information, un seul endroit</strong>. C'est ce qu'on appelle normaliser, et c'est l'essentiel de la conception.</p>

<h2>Les index</h2>
<p>Un index est à une colonne ce que l'index d'un livre est à ses pages : au lieu de tout parcourir, le moteur va directement au bon endroit. Sur un million de lignes, la différence se compte en secondes.</p>
<p>Il n'est pas gratuit : il occupe de la place, et chaque écriture doit le mettre à jour. On en pose sur les colonnes qui servent souvent à filtrer ou à joindre — pas sur toutes.</p>

<h2>Les pièges</h2>
<p><strong>Prendre une donnée métier comme clé.</strong> Un numéro de téléphone, une adresse électronique : tout cela change. La clé doit être un numéro sans signification.</p>
<p><strong>Répéter une information « pour aller plus vite ».</strong> La tentation est réelle, et le prix se paie plus tard, en incohérences qu'on ne sait plus démêler.</p>
<p><strong>Indexer tout.</strong> Chaque index ralentit les écritures. Une table truffée d'index est aussi mal réglée qu'une table sans aucun.</p>
<p><strong>Tout mettre dans une seule table.</strong> La « grande table qui contient tout » est le premier réflexe du débutant, et la cause la plus fréquente de bases ingérables.</p>

<h2>Dans la vraie vie</h2>
<p>Les choix de conception survivent aux applications. Une base mal structurée se traîne pendant des années, avec son cortège de requêtes alambiquées et de données douteuses. C'est pourquoi on prend le temps de dessiner les tables avant d'écrire la première ligne de code.</p>

<div class="a-retenir">
<ul>
<li>Une <strong>clé primaire</strong> identifie une ligne, et ne porte jamais de sens métier.</li>
<li>Une <strong>clé étrangère</strong> pointe vers une autre table, et la base en garantit la validité.</li>
<li>Une information, <strong>un seul endroit</strong> : c'est la normalisation.</li>
<li>Un index accélère les lectures et ralentit les écritures : on en pose où l'on filtre.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : quand on dénormalise exprès</summary>
<p>Les très gros systèmes acceptent parfois de répéter une information — stocker le nom du client dans la commande, par exemple — pour éviter une jointure coûteuse sur des milliards de lignes. C'est un choix assumé, documenté, avec un mécanisme pour maintenir la cohérence. Dénormaliser sans le savoir est une faute ; le faire sciemment, après mesure, est de l'ingénierie.</p>
</details>
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
        return { ok: true, message: 'Jointures, agrégats, groupes, filtres de groupes, sous-requêtes, LEFT JOIN, UNION, CASE, et maintenant la conception : tu disposes de tout l\'outillage d\'un analyste de données. Reste une dernière leçon, sur les requêtes qui ne se plaignent pas.' };
      }
    }
  ]
}
,
/* ---------- sql-17 ---------- */
{
  id: 'sql-17',
  titre: 'Déboguer une requête',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Jusqu'ici, quand une requête était fausse, le moteur te le disait. Cette leçon parle du cas inverse, et c'est le plus dangereux : <strong>une requête fausse ne se plaint pas, elle répond</strong>.</p>
<p>Elle rend un tableau de chiffres parfaitement plausible, que personne ne pense à vérifier — et c'est ainsi qu'on prend des décisions sur des données qui ne disent pas ce qu'on croit.</p>

<h2>La méthode : retirer les clauses une par une</h2>
<p>Face à une requête dont le résultat semble douteux, on ne la relit pas : on la <strong>démonte</strong>, en partant de la fin.</p>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qu'on regarde</th></tr>
<tr><td>retirer le <code>LIMIT</code></td><td>combien de lignes au total ?</td></tr>
<tr><td>retirer le <code>HAVING</code></td><td>les groupes sont-ils les bons ?</td></tr>
<tr><td>retirer le <code>GROUP BY</code></td><td>combien de lignes avant regroupement ?</td></tr>
<tr><td>remplacer le <code>SELECT</code> par <code>*</code></td><td>quelles lignes exactement ?</td></tr>
<tr><td>retirer le <code>WHERE</code></td><td>combien y en a-t-il en tout ?</td></tr>
</table>
<p>Le nombre de lignes à chaque étape est le signal le plus fiable. S'il augmente d'un coup après une jointure, les lignes se sont multipliées ; s'il chute brutalement, un filtre élimine plus qu'il ne devrait.</p>

<h2>Les trois erreurs silencieuses</h2>
<p><strong>Le <code>WHERE</code> mis à la place d'un <code>HAVING</code>.</strong> Celle-là est bruyante — le moteur refuse. Mais l'inverse ne l'est pas : un <code>HAVING</code> qui porte sur une condition de ligne regroupe d'abord des lignes dont on ne voulait pas, et le total est faux sans le moindre avertissement.</p>
<p><strong>Le <code>COUNT(*)</code> après une jointure.</strong> Il ne compte plus les films mais les correspondances. Un film programmé trois fois compte triple. C'est l'erreur la plus fréquente des rapports faux, et le résultat reste tout à fait crédible.</p>
<p><strong>Le tri qui ignore les valeurs absentes.</strong> <code>ORDER BY titre LIMIT 3</code> peut présenter comme « meilleur film » un titre qui n'a aucune note. Absurde à l'œil, produit sans la moindre erreur — parce que le tri porte sur le titre, pas sur ce qu'on croyait.</p>

<h2>Les pièges</h2>
<p><strong>Faire confiance à un ordre de grandeur plausible.</strong> « Environ 200 » n'est pas une vérification. Le seul contrôle sérieux est de recompter autrement : par un autre chemin, sur un sous-ensemble connu.</p>
<p><strong>Corriger sans comprendre.</strong> Ajouter un <code>DISTINCT</code> parce que « il y a des doublons » masque le symptôme et laisse la cause. Les doublons viennent presque toujours d'une jointure qui multiplie les lignes — et c'est elle qu'il faut regarder.</p>
<p><strong>Déboguer sur toute la table.</strong> Ajoute un <code>WHERE</code> qui réduit à quelques lignes connues, et vérifie à la main. Sur huit films, on peut compter ; sur un million, on ne peut que croire.</p>
<p><strong>Changer deux choses à la fois.</strong> Une modification, une exécution, un regard. Deux d'un coup, et l'on ne sait plus laquelle a agi.</p>

<h2>Dans la vraie vie</h2>
<p>Un rapport faux coûte plus cher qu'un rapport absent : on agit dessus. Les équipes sérieuses recoupent donc systématiquement un chiffre important par deux chemins différents — et quand les deux ne concordent pas, c'est qu'il y a quelque chose à apprendre.</p>

<div class="a-retenir">
<ul>
<li>Une requête fausse ne lève aucune erreur : elle <strong>répond</strong>.</li>
<li>On démonte la requête clause par clause, en surveillant le nombre de lignes.</li>
<li>Après une jointure, <code>COUNT(*)</code> compte les correspondances, pas les objets.</li>
<li>Un ordre de grandeur plausible n'est pas une vérification.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : vérifier par un autre chemin</summary>
<p>La technique la plus fiable consiste à calculer le même chiffre de deux façons indépendantes. Le nombre de séances peut se compter directement dans <code>seances</code>, ou comme la somme des séances par film. Si les deux diffèrent, l'une des requêtes se trompe — et savoir laquelle est souvent plus instructif que le chiffre lui-même.</p>
</details>
`,
  exercices: [
    {
      type: 'sql',
      genre: 'bug',
      tables: ['films'],
      consigne: "<strong>Chasse au bug :</strong> cette requête doit afficher les genres dont la <strong>note moyenne</strong> dépasse 8, avec la moyenne nommée <code>moyenne</code>. Elle en rend trois. Un seul des deux attendus manque à l'appel, et un intrus s'est invité.",
      codeDepart: "SELECT genre, AVG(note) AS moyenne\nFROM films\nWHERE note > 8\nGROUP BY genre;\n",
      indices: [
        "Rien ne plante, et pourtant le Thriller est là. Sa vraie moyenne est 8.0 — calcule-la à la main sur les deux films du genre pour voir ce que la requête a compté.",
        "Le <code>WHERE</code> s'applique AVANT le regroupement : il jette « Nuit Polaire » (7.8), et il ne reste plus qu'un film pour faire la moyenne du Thriller. Le filtre doit porter sur le groupe, pas sur la ligne.",
        "Retire la ligne <code>WHERE</code>, et pose <code>HAVING AVG(note) > 8</code> après le <code>GROUP BY</code>."
      ],
      solution: "SELECT genre, AVG(note) AS moyenne\nFROM films\nGROUP BY genre\nHAVING AVG(note) > 8;",
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (/\bwhere\b/i.test(ctx.code)) {
          return { ok: false, message: 'Il reste un <code>WHERE</code>. C\'est lui le bug : il jette des films avant que la moyenne ne soit calculée.' };
        }
        if (ctx.lignes.length === 4) return { ok: false, message: 'Les 4 genres sont là : plus aucun filtre ne s\'applique. Il en faut un, mais sur les groupes.' };
        if (ctx.lignes.length !== 2) {
          return { ok: false, message: 'J\'attends 2 genres — Drame (8.15) et Aventure (8.7). Ta requête en rend ' + ctx.lignes.length + '.' };
        }
        if (!sqlMemeEnsemble(sqlValeurs(ctx, 'genre'), ['Drame', 'Aventure'])) {
          return { ok: false, message: 'Les deux genres attendus sont Drame et Aventure. Le Thriller ne doit plus y être : sa vraie moyenne est 8.0.' };
        }
        if (!sqlColonnes(ctx).includes('moyenne')) return { ok: false, message: 'Garde le nom <code>moyenne</code> pour la colonne de moyenne.' };
        return { ok: true, message: 'WHERE jette des lignes, HAVING juge des groupes. Le résultat faux était propre et plausible — c\'est exactement ce qui rend cette faute difficile à voir.' };
      }
    },
    {
      type: 'sql',
      genre: 'bug',
      tables: ['films', 'seances'],
      consigne: "<strong>Chasse au bug :</strong> cette requête doit afficher chaque film avec son nombre de séances nommé <code>nb</code>, y compris les films jamais programmés. Elle prétend que « Petit Déjeuner » a une séance. Il n'en a aucune.",
      codeDepart: "SELECT films.titre, COUNT(*) AS nb\nFROM films\nLEFT JOIN seances ON films.id = seances.film_id\nGROUP BY films.titre;\n",
      indices: [
        "Le <code>LEFT JOIN</code> fait bien son travail : les films sans séance sont là. C'est le comptage qui se trompe de chose à compter.",
        "Un film sans séance produit quand même une ligne, avec les colonnes de <code>seances</code> vides. <code>COUNT(*)</code> compte cette ligne ; il faut compter autre chose.",
        "<code>COUNT(seances.id)</code> ne compte que les valeurs présentes — donc 0 pour un film jamais programmé."
      ],
      solution: "SELECT films.titre, COUNT(seances.id) AS nb\nFROM films\nLEFT JOIN seances ON films.id = seances.film_id\nGROUP BY films.titre;",
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        const cols = sqlColonnes(ctx);
        const iNb = cols.indexOf('nb');
        if (iNb === -1) return { ok: false, message: 'Garde le nom <code>nb</code> pour la colonne de comptage.' };
        if (ctx.lignes.length !== 8) {
          return { ok: false, message: 'J\'attends les 8 films, même ceux sans séance. Ta requête en rend ' + ctx.lignes.length + ' — le <code>LEFT JOIN</code> est-il toujours là ?' };
        }
        const iTitre = iNb === 0 ? 1 : 0;
        const compte = {};
        for (const l of ctx.lignes) compte[String(l[iTitre])] = l[iNb];
        const jamais = ['Petit Déjeuner', 'Echo', 'Le Phare'];
        const faux = jamais.filter(function (t) { return Number(compte[t]) !== 0; });
        if (faux.length) {
          return { ok: false, message: '« ' + faux[0] + ' » n\'a aucune séance, et ta requête lui en compte ' + compte[faux[0]] + '. <code>COUNT(*)</code> compte la ligne, pas la séance.' };
        }
        if (Number(compte['Sable et Cendres']) !== 3) {
          return { ok: false, message: 'Les zéros sont bons, mais « Sable et Cendres » doit garder ses 3 séances.' };
        }
        return { ok: true, message: 'COUNT(*) compte des lignes, COUNT(colonne) compte des valeurs présentes. Après un LEFT JOIN, toute la différence est là.' };
      }
    },
    {
      type: 'sql',
      genre: 'bug',
      tables: ['films'],
      consigne: "<strong>Chasse au bug :</strong> cette requête doit afficher les <strong>trois films les mieux notés</strong> avec leur note. Elle place « Echo » en tête — un film qui n'a même pas de note.",
      codeDepart: "SELECT titre, note\nFROM films\nORDER BY titre\nLIMIT 3;\n",
      indices: [
        "Il y a bien un <code>ORDER BY</code> et un <code>LIMIT 3</code>. Regarde sur QUOI porte le tri, puis relis la consigne.",
        "<code>LIMIT</code> coupe après le tri : il garde les trois premiers de l'ordre en vigueur. Ici l'ordre est alphabétique, donc les trois premiers sont ceux dont le titre commence le plus tôt dans l'alphabet.",
        "Trie sur la note, et du plus grand au plus petit : <code>ORDER BY note DESC</code>."
      ],
      solution: "SELECT titre, note\nFROM films\nORDER BY note DESC\nLIMIT 3;",
      verifier: function (ctx) {
        const pb = sqlErreurOuVide(ctx, true); if (pb) return pb;
        if (ctx.lignes.length !== 3) {
          return { ok: false, message: 'J\'attends exactement 3 films. Ta requête en rend ' + ctx.lignes.length + ' — garde le <code>LIMIT 3</code>.' };
        }
        const titres = sqlValeurs(ctx, 'titre').map(String);
        const attendus = ['Sable et Cendres', 'La Grande Traversée', 'Le Dernier Train'];
        if (titres.join('|') === 'Echo|La Grande Traversée|Le Dernier Train') {
          return { ok: false, message: 'Toujours l\'ordre alphabétique : « Echo » passe devant parce que son titre commence par un E, pas parce qu\'il est bien noté. Il n\'a même pas de note.' };
        }
        if (titres.join('|') !== attendus.join('|')) {
          return { ok: false, message: 'J\'attends, dans cet ordre : ' + attendus.join(', ') + '. Tu rends : ' + titres.join(', ') + '.' };
        }
        return { ok: true, message: 'LIMIT coupe après le tri : sans le bon ORDER BY, il ne garde pas les meilleurs, il garde les premiers venus.' };
      }
    }
  ]
}
];
