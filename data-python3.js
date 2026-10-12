/* ===== Python — troisième partie (py-19 à py-26) ===== */
window.DATA_PYTHON3 = [

/* ---------- py-19 ---------- */
{
  id: 'py-19',
  titre: 'Le découpage : extraire un morceau',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu sais lire une case avec <code>t[0]</code>. Mais on veut rarement une seule case : on veut les dix premiers résultats, la deuxième moitié d'une liste, tout sauf le dernier élément.</p>
<p>Python offre pour cela une écriture qui lui est propre, le <strong>découpage</strong>, et c'est l'une des fonctionnalités que ses utilisateurs regrettent le plus ailleurs.</p>

<h2>L'écriture</h2>
<pre class="bloc-code">t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

t[2:5]     # [2, 3, 4]   de 2 INCLUS a 5 EXCLU
t[:3]      # [0, 1, 2]   depuis le debut
t[-3:]     # [7, 8, 9]   les trois derniers
t[::-1]    # [9, 8, ..., 0]   a l'envers</pre>
<p>Tous mesurés. La forme générale est <code>[debut:fin:pas]</code>, et chacun des trois peut être omis.</p>
<p>La règle qui gouverne tout : <strong>le début est inclus, la fin est exclue</strong>. C'est la même convention que <code>range</code>, et elle a une conséquence pratique — <code>t[:3]</code> et <code>t[3:]</code> découpent la liste en deux morceaux complets, sans chevauchement ni oubli.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Ce qu'on obtient</th><th>À quoi ça sert</th></tr>
<tr><td><code>t[:n]</code></td><td>les n premiers</td><td>un aperçu, un top 10</td></tr>
<tr><td><code>t[-n:]</code></td><td>les n derniers</td><td>les plus récents</td></tr>
<tr><td><code>t[:]</code></td><td>tout</td><td>une <strong>copie</strong> de la liste</td></tr>
<tr><td><code>t[::-1]</code></td><td>tout, à l'envers</td><td>inverser sans modifier</td></tr>
</table>
<p>La troisième ligne, tu la connais déjà : c'est ainsi qu'on copie une liste au lieu de la partager.</p>

<h2>Ça marche aussi sur le texte</h2>
<pre class="bloc-code">mot = "bonjour"
mot[:3]     # "bon"
mot[-3:]    # "our"
mot[::-1]   # "ruojnob"</pre>
<p>Un texte est une suite, comme une liste — il se découpe donc pareil. En revanche le résultat est toujours un <em>nouveau</em> texte : on ne modifie jamais l'original.</p>

<h2>Les pièges</h2>
<p><strong>Croire que la fin est incluse.</strong> <code>t[2:5]</code> ne contient pas l'élément 5. C'est l'erreur de bord la plus fréquente, et elle ne lève jamais d'erreur.</p>
<p><strong>Confondre <code>t[-1]</code> et <code>t[-1:]</code>.</strong> Le premier rend l'<em>élément</em>, le second une <em>liste</em> d'un élément. Deux types différents pour deux caractères d'écart.</p>
<p><strong>Oublier que le découpage ne plante jamais.</strong> <code>t[5:99]</code> sur une liste de 3 éléments rend une liste vide, sans erreur — alors que <code>t[99]</code> arrête le programme. C'est commode, et ça peut masquer un problème.</p>
<p><strong>Croire que la copie est profonde.</strong> <code>t[:]</code> duplique la liste, mais si elle contient d'autres listes, ce sont les mêmes. La copie ne va qu'à un niveau.</p>

<h2>Dans la vraie vie</h2>
<p>Paginer des résultats — <code>resultats[20:40]</code> — est l'usage le plus courant. Viennent ensuite retirer un en-tête de fichier avec <code>lignes[1:]</code>, et garder les derniers événements d'un journal avec <code>[-50:]</code>. Trois caractères, là où une boucle prendrait quatre lignes.</p>

<div class="a-retenir">
<ul>
<li><code>[debut:fin:pas]</code> — début inclus, <strong>fin exclue</strong>.</li>
<li><code>[:]</code> copie, <code>[::-1]</code> inverse, <code>[-n:]</code> prend les derniers.</li>
<li>Un découpage hors limites rend une liste vide, sans erreur.</li>
<li>Ça marche aussi sur le texte, qui est une suite comme une autre.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : un pas négatif</summary>
<p><code>t[::-1]</code> se lit « du début à la fin, en reculant d'un pas » — d'où l'inversion. On peut combiner : <code>t[8:2:-1]</code> descend de l'indice 8 à l'indice 3. C'est puissant et vite illisible ; au-delà de <code>[::-1]</code>, une fonction nommée dit mieux l'intention.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'À partir de la liste, affiche sur trois lignes : les <strong>trois premiers</strong> éléments, les <strong>trois derniers</strong>, et la liste <strong>à l\'envers</strong>.',
      codeDepart: 't = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n',
      indices: [
        "Trois découpes différentes sur la même liste. Le principe est toujours le même : deux bornes séparées par <code>:</code>, dont l’une peut manquer.",
        "Une borne omise veut dire « depuis le début » ou « jusqu’à la fin ». Un indice négatif part de la fin. Et un <strong>troisième</strong> nombre, après un second <code>:</code>, donne le pas.",
        "<code>t[:3]</code>, <code>t[-3:]</code>, et <code>t[::-1]</code> — un pas de -1 parcourt à l’envers."
      ],
      solution: 't = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n\nprint(t[:3])\nprint(t[-3:])\nprint(t[::-1])',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 3) return { ok: false, message: 'J\'attends trois lignes.' };
        if (l[0] !== '[0, 1, 2]') return { ok: false, message: 'Les trois premiers, c\'est <code>t[:3]</code> — tu affiches ' + l[0] + '.' };
        if (l[1] !== '[7, 8, 9]') return { ok: false, message: 'Les trois derniers, c\'est <code>t[-3:]</code> — tu affiches ' + l[1] + '.' };
        if (l[2] !== '[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]') return { ok: false, message: 'Pour inverser : <code>t[::-1]</code> — tu affiches ' + l[2] + '.' };
        return { ok: true, message: 'Trois extractions, aucune boucle. Le découpage est l\'une des raisons pour lesquelles le code Python est si court.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> à partir de <code>"Bonjour tout le monde"</code>, affiche les 7 premiers caractères, puis le mot à l\'envers.',
      codeDepart: 'phrase = "Bonjour tout le monde"\n\n',
      indices: [
        "Rien de nouveau ici : un texte se découpe exactement comme une liste, avec la même notation.",
        "Les 7 premiers caractères : une borne de fin, et pas de borne de début. À l’envers : un pas de -1.",
        "<code>phrase[:7]</code> puis <code>phrase[::-1]</code>"
      ],
      solution: 'phrase = "Bonjour tout le monde"\n\nprint(phrase[:7])\nprint(phrase[::-1])',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (l[0] !== 'Bonjour') return { ok: false, message: 'Attendu <code>Bonjour</code> (les 7 premiers caractères) — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== 'ednom el tuot ruojnoB') return { ok: false, message: 'La phrase à l\'envers s\'obtient avec <code>[::-1]</code> — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Une chaîne se découpe comme une liste : en Python, c\'est la même mécanique partout.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi du palindrome :</strong> écris une fonction <code>est_palindrome(mot)</code> qui renvoie <code>True</code> si le mot se lit pareil dans les deux sens. Teste-la sur <code>"kayak"</code> puis <code>"python"</code>.',
      codeDepart: '# ta fonction, puis deux print :\n',
      indices: [
        "Un palindrome se lit pareil dans les deux sens. Tu sais déjà retourner un texte — il ne reste qu’à comparer.",
        "Une comparaison produit déjà <code>True</code> ou <code>False</code> : inutile de passer par un <code>if</code>, la fonction peut renvoyer la comparaison elle-même.",
        "<code>return mot == mot[::-1]</code>"
      ],
      solution: 'def est_palindrome(mot):\n    return mot == mot[::-1]\n\nprint(est_palindrome("kayak"))\nprint(est_palindrome("python"))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/def\s+est_palindrome\s*\(/.test(ctx.code)) return { ok: false, message: 'Définis la fonction <code>est_palindrome(mot)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes, une par test.' };
        if (l[0] !== 'True') return { ok: false, message: '« kayak » est un palindrome : la première ligne doit afficher <code>True</code>. Tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== 'False') return { ok: false, message: '« python » n\'en est pas un : <code>False</code> attendu. Tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Une ligne de code pour un problème classique. En C, il aurait fallu une boucle et deux indices qui se croisent.' };
      }
    }
  ]
},

/* ---------- py-20 ---------- */
{
  id: 'py-20',
  titre: 'Tuples et ensembles',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Au-delà des listes et des dictionnaires, Python propose deux autres collections. Chacune existe pour une raison précise — ce ne sont pas des variantes de la liste, mais des réponses à des besoins différents.</p>

<h2>Le tuple : figé une fois créé</h2>
<pre class="bloc-code">point = (3, 4)      # parentheses au lieu de crochets
print(point[0])     # 3 — la lecture est identique
point[0] = 9        # refuse</pre>
<p>Mesuré, le message est précis : <em>« cette valeur ne se modifie pas une fois créée — c'est le cas d'un tuple et d'un texte. Pour la changer, il faut en fabriquer une nouvelle. »</em></p>
<p>À quoi sert une liste qu'on ne peut pas modifier ? À garantir qu'elle ne le sera pas. Des coordonnées, une date, une couleur RVB forment un tout : les séparer n'aurait pas de sens. Et parce qu'un tuple ne change jamais, il peut servir de <strong>clé de dictionnaire</strong> — ce qu'une liste ne peut pas.</p>

<h2>Le déballage</h2>
<pre class="bloc-code">x, y = (3, 4)
print(x, y)          # 3 4

def minmax(t):
    return min(t), max(t)

a, b = minmax([5, 1, 9])   # 1 9</pre>
<p>Mesuré. Une fonction peut donc rendre plusieurs valeurs — elle rend en réalité un tuple, que Python déballe automatiquement. C'est le même mécanisme que dans <code>for cle, valeur in d.items()</code>.</p>

<h2>L'ensemble : pas de doublons</h2>
<pre class="bloc-code">s = {1, 2, 2, 3}
print(s)        # {1, 2, 3} — le doublon a disparu
print(len(s))   # 3

a = {1, 2, 3}
b = {2, 3, 4}
print(a &amp; b)    # {2, 3}       ce qui est dans les deux
print(a | b)    # {1, 2, 3, 4} tout
print(a - b)    # {1}          ce qui n'est que dans a</pre>
<p>Tous mesurés. Un ensemble ne garde jamais deux fois la même valeur, et il n'a pas d'ordre. En contrepartie, tester l'appartenance y est bien plus rapide que dans une liste.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Besoin</th><th>Le bon outil</th></tr>
<tr><td>une suite ordonnée qu'on modifie</td><td>liste <code>[ ]</code></td></tr>
<tr><td>un tout qui ne doit pas bouger</td><td>tuple <code>( )</code></td></tr>
<tr><td>des valeurs uniques, sans ordre</td><td>ensemble <code>{ }</code></td></tr>
<tr><td>des étiquettes</td><td>dictionnaire <code>{cle: valeur}</code></td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Créer un tuple d'un seul élément.</strong> <code>(5)</code> n'est pas un tuple mais le nombre 5 entre parenthèses. Il faut une virgule : <code>(5,)</code>.</p>
<p><strong>Confondre ensemble et dictionnaire vides.</strong> <code>{}</code> crée un <em>dictionnaire</em> vide. Pour un ensemble vide, c'est <code>set()</code>.</p>
<p><strong>Attendre un ordre d'un ensemble.</strong> Il n'en a pas. Si l'ordre compte, c'est une liste.</p>
<p><strong>Croire qu'un tuple protège son contenu.</strong> Un tuple qui contient une <em>liste</em> ne peut pas changer de liste — mais la liste, elle, reste modifiable. Le verrou porte sur la structure, pas sur ce qu'elle contient.</p>

<h2>Dans la vraie vie</h2>
<p>Les tuples servent surtout à rendre plusieurs valeurs d'une fonction, et on les écrit souvent sans parenthèses : <code>return min(t), max(t)</code>. Les ensembles servent à dédoublonner — <code>list(set(mots))</code> est l'idiome le plus court pour retirer les répétitions d'une liste.</p>

<div class="a-retenir">
<ul>
<li>Un tuple <code>( )</code> ne se modifie jamais — et peut servir de clé de dictionnaire.</li>
<li><code>x, y = valeur</code> déballe ; une fonction peut ainsi rendre plusieurs valeurs.</li>
<li>Un ensemble <code>{ }</code> supprime les doublons et n'a pas d'ordre.</li>
<li><code>(5,)</code> avec la virgule pour un tuple d'un seul élément ; <code>set()</code> pour un ensemble vide.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi un ensemble est-il si rapide</summary>
<p>Chercher une valeur dans une liste de dix mille éléments demande de les parcourir. Dans un ensemble, Python calcule directement <em>où</em> la valeur devrait se trouver, et regarde là — une seule opération, quelle que soit la taille. C'est le même mécanisme que pour les clés d'un dictionnaire, et c'est pourquoi les deux refusent les valeurs modifiables : si la valeur changeait, le calcul ne mènerait plus au bon endroit.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Écris une fonction <code>extremes(valeurs)</code> qui renvoie <strong>le minimum et le maximum</strong> (un tuple), puis déballe le résultat en deux variables et affiche-les séparées par un espace.',
      codeDepart: 'valeurs = [12, 3, 45, 7]\n\n# ta fonction, puis le déballage :\n',
      indices: [
        "Une fonction peut renvoyer plusieurs valeurs d’un coup : il suffit de les séparer par une virgule. Python en fait un tuple.",
        "À la réception, on peut « déballer » ce tuple dans deux variables d’un seul geste, en les séparant aussi par une virgule.",
        "<code>return min(valeurs), max(valeurs)</code> puis <code>petit, grand = extremes(valeurs)</code>"
      ],
      solution: 'valeurs = [12, 3, 45, 7]\n\ndef extremes(valeurs):\n    return min(valeurs), max(valeurs)\n\npetit, grand = extremes(valeurs)\nprint(petit, grand)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/def\s+extremes\s*\(/.test(ctx.code)) return { ok: false, message: 'Définis la fonction <code>extremes(valeurs)</code>.' };
        if (!/,/.test(ctx.code.split('return')[1] || '')) return { ok: false, message: 'La fonction doit renvoyer DEUX valeurs séparées par une virgule — c\'est ce qui fabrique un tuple.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '3 45') return { ok: false, message: 'Attendu <code>3 45</code> (le minimum puis le maximum) — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Renvoyer plusieurs valeurs d\'un coup : impossible en C ou en Java sans passer par une structure. Python le fait naturellement.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> à partir de la liste avec doublons, affiche le <strong>nombre de valeurs différentes</strong>, puis la liste dédoublonnée et triée.',
      codeDepart: 'notes = [12, 15, 12, 9, 15, 15, 9]\n\n',
      indices: [
        "Un ensemble ne peut pas contenir deux fois la même valeur : le transformer en ensemble suffit donc à dédoublonner.",
        "<code>set(liste)</code> supprime les doublons, mais perd l’ordre au passage. <code>sorted()</code> le rétablit et renvoie une liste.",
        "<code>print(len(set(notes)))</code> puis <code>print(sorted(set(notes)))</code>"
      ],
      solution: 'notes = [12, 15, 12, 9, 15, 15, 9]\n\nprint(len(set(notes)))\nprint(sorted(set(notes)))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/set\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise <code>set(notes)</code> pour supprimer les doublons.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '3') return { ok: false, message: 'Il y a 3 valeurs différentes (9, 12, 15) — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '[9, 12, 15]') return { ok: false, message: 'Attendu <code>[9, 12, 15]</code> — tu affiches ' + l[1] + '. Pense à <code>sorted()</code> autour du set.' };
        return { ok: true, message: 'Dédoublonner en une fonction : c\'est le genre de raccourci qui rend Python si productif pour l\'analyse de données.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi :</strong> deux clients ont acheté des produits. Affiche ceux achetés <strong>par les deux</strong> (triés), puis ceux achetés <strong>uniquement par Alice</strong> (triés).',
      codeDepart: 'alice = {"pain", "lait", "café", "miel"}\nbob = {"lait", "café", "thé"}\n\n',
      indices: [
        "Les ensembles ont leurs propres opérateurs, empruntés aux mathématiques : ce qui est dans les <strong>deux</strong>, et ce qui est dans l’un <strong>sans</strong> être dans l’autre.",
        "L’intersection s’écrit <code>&amp;</code>, la différence <code>-</code>. Un ensemble n’a pas d’ordre : <code>sorted()</code> rend l’affichage stable.",
        "<code>print(sorted(alice &amp; bob))</code> puis <code>print(sorted(alice - bob))</code>"
      ],
      solution: 'alice = {"pain", "lait", "café", "miel"}\nbob = {"lait", "café", "thé"}\n\nprint(sorted(alice & bob))\nprint(sorted(alice - bob))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (l[0] !== "['café', 'lait']") return { ok: false, message: 'Les produits communs sont café et lait : utilise l\'intersection <code>alice & bob</code> entourée de <code>sorted()</code>. Tu affiches ' + l[0] + '.' };
        if (l[1] !== "['miel', 'pain']") return { ok: false, message: 'Alice seule a acheté miel et pain : utilise la différence <code>alice - bob</code>. Tu affiches ' + l[1] + '.' };
        return { ok: true, message: 'Deux lignes là où il aurait fallu deux boucles imbriquées. Les ensembles sont l\'outil du croisement de listes.' };
      }
    }
  ]
},

/* ---------- py-21 ---------- */
{
  id: 'py-21',
  titre: 'enumerate et zip',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Deux situations reviennent sans cesse dans les boucles, et chacune a sa fonction dédiée. La boucle <code>for</code> de Python donne les valeurs — c'est sa force. Mais parfois on veut aussi le <strong>rang</strong>, ou parcourir <strong>deux listes en parallèle</strong>.</p>
<p>Sans les outils de cette leçon, on retombe sur des solutions maladroites avec <code>range(len(...))</code>, que tout lecteur de Python reconnaît comme un signe de débutant.</p>

<h2>enumerate : la valeur et son numéro</h2>
<pre class="bloc-code"># maladroit
for i in range(len(fruits)):
    print(i, fruits[i])

# avec enumerate
for i, fruit in enumerate(fruits):
    print(i, fruit)</pre>
<p>Mesuré : la seconde affiche <code>0 a</code> puis <code>1 b</code>. On récupère les deux sans jamais écrire de crochets.</p>
<p>Pour commencer à 1 — un affichage numéroté, par exemple — un second argument suffit : <code>enumerate(fruits, 1)</code>.</p>

<h2>zip : deux listes à la fois</h2>
<pre class="bloc-code">for x, y in zip([1, 2], ["un", "deux"]):
    print(x, y)        # 1 un   puis   2 deux</pre>
<p>Mesuré. <code>zip</code> assemble les éléments de même rang, comme les dents d'une fermeture éclair — d'où son nom.</p>
<p>Le point à connaître : <strong>il s'arrête sur la plus courte</strong>. Deux listes de tailles différentes ne provoquent aucune erreur ; les éléments en trop sont simplement ignorés.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'on veut</th><th>L'outil</th></tr>
<tr><td>les valeurs</td><td><code>for x in liste</code></td></tr>
<tr><td>les valeurs et leur rang</td><td><code>for i, x in enumerate(liste)</code></td></tr>
<tr><td>deux listes en parallèle</td><td><code>for a, b in zip(l1, l2)</code></td></tr>
<tr><td>les clés et valeurs d'un dictionnaire</td><td><code>for k, v in d.items()</code></td></tr>
</table>
<p>Les trois dernières lignes reposent toutes sur le même mécanisme : la fonction rend des couples, et Python les déballe en deux variables.</p>

<h2>Les pièges</h2>
<p><strong>Écrire <code>for i in enumerate(...)</code>.</strong> Avec une seule variable, <code>i</code> reçoit le couple entier, et l'affichage donne <code>(0, 'a')</code>. Il en faut deux.</p>
<p><strong>Oublier que <code>zip</code> tronque.</strong> Si une liste a trois éléments et l'autre cinq, deux disparaissent en silence. Quand ce n'est pas voulu, il faut vérifier les longueurs avant.</p>
<p><strong>Vouloir afficher le résultat directement.</strong> <code>print(zip(a, b))</code> n'affiche pas les couples : ces fonctions produisent à la demande. Il faut <code>list(zip(a, b))</code> pour voir.</p>
<p><strong>Utiliser <code>enumerate</code> quand l'indice ne sert pas.</strong> Si tu n'utilises que la valeur, la boucle simple est plus claire.</p>

<h2>Dans la vraie vie</h2>
<p><code>enumerate</code> sert dès qu'on numérote un affichage. <code>zip</code> sert à rapprocher deux sources — des noms et des scores, des questions et des réponses — et, combiné à <code>dict()</code>, il construit un dictionnaire en une ligne : <code>dict(zip(cles, valeurs))</code>.</p>

<div class="a-retenir">
<ul>
<li><code>enumerate(liste)</code> donne le rang <em>et</em> la valeur — jamais <code>range(len(...))</code>.</li>
<li><code>zip(a, b)</code> parcourt deux listes en parallèle et <strong>s'arrête sur la plus courte</strong>.</li>
<li>Les deux rendent des couples, à déballer en deux variables.</li>
<li>Pour voir leur contenu, il faut les passer à <code>list()</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : dézipper</summary>
<p><code>zip(*couples)</code> fait l'opération inverse : à partir d'une liste de couples, il rend deux listes séparées. L'étoile « étale » la liste en arguments — c'est le même symbole que le <code>*args</code> des fonctions avancées. C'est une écriture dense, qu'on croise surtout pour séparer des coordonnées en deux séries avant de les tracer.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Affiche la liste numérotée <strong>à partir de 1</strong>, sous la forme <code>1. Alice</code>, <code>2. Bob</code>, etc., avec <code>enumerate</code>.',
      codeDepart: 'noms = ["Alice", "Bob", "Chloé"]\n\n',
      indices: [
        "Tu pourrais tenir un compteur à la main, mais Python le fait tout seul : une fonction donne à la fois le rang et l’élément.",
        "<code>enumerate()</code> commence à 0 par défaut. Un second argument change ce point de départ — ici, il faut commencer à 1.",
        "<code>for i, nom in enumerate(noms, 1):</code> puis <code>print(f\"{i}. {nom}\")</code>"
      ],
      solution: 'noms = ["Alice", "Bob", "Chloé"]\n\nfor i, nom in enumerate(noms, 1):\n    print(f"{i}. {nom}")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/enumerate\s*\(/.test(ctx.code)) return { ok: false, message: 'L\'exercice porte sur <code>enumerate</code> — utilise-le plutôt qu\'un compteur manuel.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes — j\'en compte ' + l.length + '.' };
        if (l[0].trim() !== '1. Alice') return { ok: false, message: 'La première ligne doit être <code>1. Alice</code> — tu affiches « ' + l[0] + ' ». Pour démarrer à 1, écris <code>enumerate(noms, 1)</code>.' };
        if (l[2].trim() !== '3. Chloé') return { ok: false, message: 'La dernière ligne doit être <code>3. Chloé</code> — tu affiches « ' + l[2] + ' ».' };
        return { ok: true, message: 'Plus de compteur à incrémenter à la main, donc plus d\'oubli possible.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> parcours les deux listes en parallèle avec <code>zip</code> et affiche <code>Alice a 30 ans</code>, une ligne par personne.',
      codeDepart: 'noms = ["Alice", "Bob", "Chloé"]\nages = [30, 25, 41]\n\n',
      indices: [
        "Deux listes à parcourir en même temps, élément par élément. Python a une fonction faite pour les apparier.",
        "<code>zip()</code> donne un couple à chaque tour — d’où les deux noms de variables après le <code>for</code>.",
        "<code>for nom, age in zip(noms, ages):</code> puis <code>print(f\"{nom} a {age} ans\")</code>"
      ],
      solution: 'noms = ["Alice", "Bob", "Chloé"]\nages = [30, 25, 41]\n\nfor nom, age in zip(noms, ages):\n    print(f"{nom} a {age} ans")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/zip\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise <code>zip(noms, ages)</code> pour parcourir les deux listes ensemble.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes — j\'en compte ' + l.length + '.' };
        if (l[0].trim() !== 'Alice a 30 ans') return { ok: false, message: 'Format attendu : <code>Alice a 30 ans</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'zip associe les éléments deux à deux, dans l\'ordre. Les indices ont complètement disparu du code.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi :</strong> à partir des deux listes, construis un <strong>dictionnaire</strong> <code>{nom: age}</code> et affiche l\'âge de Bob.',
      codeDepart: 'noms = ["Alice", "Bob", "Chloé"]\nages = [30, 25, 41]\n\nannuaire = {}\n',
      indices: [
        "Tu sais déjà apparier deux listes. Il ne reste qu’à ranger chaque couple dans un dictionnaire, au fur et à mesure.",
        "Un dictionnaire vide avant la boucle, puis dans la boucle : la clé est le nom, la valeur est l’âge.",
        "<code>annuaire[nom] = age</code> dans la boucle, puis <code>print(annuaire[\"Bob\"])</code>"
      ],
      solution: 'noms = ["Alice", "Bob", "Chloé"]\nages = [30, 25, 41]\n\nannuaire = {}\nfor nom, age in zip(noms, ages):\n    annuaire[nom] = age\n\nprint(annuaire["Bob"])',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/zip\s*\(/.test(ctx.code)) return { ok: false, message: 'Construis le dictionnaire à partir d\'une boucle <code>zip</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '25') return { ok: false, message: 'L\'âge de Bob est 25 — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Deux listes parallèles transformées en dictionnaire : une opération très fréquente quand on lit des données en colonnes.' };
      }
    }
  ]
},

/* ---------- py-22 ---------- */
{
  id: 'py-22',
  titre: 'lambda, map et filter',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Certaines fonctions sont si courtes que leur donner un nom est une formalité inutile : « multiplier par deux », « prendre le second élément ». On les écrit alors sur place, sans nom. C'est une <strong>lambda</strong>.</p>
<p>Elle n'ajoute aucun pouvoir au langage — tout ce qu'elle fait, un <code>def</code> le ferait. Elle sert à ne pas interrompre la lecture pour une ligne de calcul.</p>

<h2>L'écriture</h2>
<pre class="bloc-code"># une fonction ordinaire
def doubler(x):
    return x * 2

# la meme en lambda
doubler = lambda x: x * 2

print(doubler(5))   # 10</pre>
<p>Mesuré. Après les deux-points vient une <strong>expression unique</strong>, dont la valeur est rendue automatiquement — il n'y a pas de <code>return</code> à écrire, et on ne peut pas y mettre plusieurs lignes.</p>
<p>Ranger une lambda dans une variable, comme ci-dessus, est d'ailleurs considéré comme une maladresse : si la fonction mérite un nom, elle mérite un <code>def</code>. La lambda prend tout son sens passée directement en argument.</p>

<h2>map et filter</h2>
<pre class="bloc-code">n = [1, 2, 3, 4]

list(map(lambda x: x * 2, n))        # [2, 4, 6, 8]
list(filter(lambda x: x % 2 == 0, n)) # [2, 4]
print(map(lambda x: x, n))            # &lt;map object&gt;</pre>
<p>Mesuré, y compris la dernière ligne : <code>map</code> ne produit pas une liste mais un objet qui fabrique les valeurs à la demande. Sans <code>list()</code> autour, on n'affiche rien d'utile.</p>

<h2>Le tri sur mesure</h2>
<pre class="bloc-code">gens = [{"n": "A", "age": 30}, {"n": "B", "age": 20}]
tries = sorted(gens, key=lambda g: g["age"])   # B avant A</pre>
<p>Mesuré. C'est l'usage le plus fréquent et le plus justifié de la lambda : <code>key</code> demande « trier selon quoi ? », et la réponse tient en une expression.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Besoin</th><th>Écriture Python</th></tr>
<tr><td>transformer</td><td><code>[x * 2 for x in n]</code> — ou <code>map</code></td></tr>
<tr><td>filtrer</td><td><code>[x for x in n if ...]</code> — ou <code>filter</code></td></tr>
<tr><td>trier selon un critère</td><td><code>sorted(l, key=lambda ...)</code></td></tr>
</table>
<p>Les deux premières lignes disent l'essentiel : en Python, la compréhension de liste fait la même chose que <code>map</code> et <code>filter</code>, en plus lisible. C'est elle qu'on écrit. <code>map</code> et <code>filter</code> restent utiles à <em>lire</em>, et avec <code>key</code> la lambda garde toute sa place.</p>

<h2>Les pièges</h2>
<p><strong>Oublier <code>list()</code>.</strong> Afficher un <code>map</code> donne <code>&lt;map object&gt;</code>. La valeur est là, mais pas encore produite.</p>
<p><strong>Vouloir plusieurs lignes dans une lambda.</strong> Impossible : une expression, pas un bloc. C'est le signal qu'il faut un <code>def</code>.</p>
<p><strong>Écrire <code>return</code> dedans.</strong> Erreur de syntaxe : la valeur de l'expression est déjà le résultat.</p>
<p><strong>En abuser.</strong> Une lambda imbriquée dans une autre est illisible. La règle de bon sens : si tu dois t'arrêter pour la comprendre, écris un <code>def</code> avec un nom qui explique.</p>

<h2>Dans la vraie vie</h2>
<p>En Python, la lambda survit surtout grâce à <code>key</code> — dans <code>sorted</code>, <code>max</code> et <code>min</code>. Pour le reste, les compréhensions l'ont largement remplacée, et c'est un choix assumé de la communauté : le code le plus lisible gagne.</p>

<div class="a-retenir">
<ul>
<li>Une lambda est une fonction en une <strong>expression</strong>, sans nom et sans <code>return</code>.</li>
<li>Son usage le plus justifié est <code>key=</code> dans un tri.</li>
<li><code>map</code> et <code>filter</code> rendent des objets à la demande : <code>list()</code> pour les voir.</li>
<li>En Python, on leur préfère les compréhensions de liste.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : trier sur deux critères</summary>
<p><code>key</code> peut rendre un tuple : <code>sorted(gens, key=lambda g: (g["ville"], g["age"]))</code> trie par ville, puis par âge à l'intérieur de chaque ville. Python compare les tuples élément par élément, ce qui donne exactement le comportement attendu. C'est l'une des écritures les plus utiles du langage, et elle tient en une ligne.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Trie les contacts <strong>par âge croissant</strong> avec <code>sorted</code> et une <code>lambda</code>, puis affiche le nom du plus jeune.',
      codeDepart: 'contacts = [\n    {"nom": "Zoé", "age": 30},\n    {"nom": "Alex", "age": 25},\n    {"nom": "Bob", "age": 41}\n]\n\n',
      indices: [
        "<code>sorted()</code> ne sait pas comparer des dictionnaires tout seul : il faut lui dire <strong>sur quoi</strong> trier.",
        "L’argument <code>key</code> reçoit une fonction qui, pour un élément, renvoie la valeur à comparer. Une <code>lambda</code> s’écrit sur place, sans <code>def</code>.",
        "<code>sorted(contacts, key=lambda c: c[\"age\"])</code>, puis le premier élément du résultat."
      ],
      solution: 'contacts = [\n    {"nom": "Zoé", "age": 30},\n    {"nom": "Alex", "age": 25},\n    {"nom": "Bob", "age": 41}\n]\n\ntries = sorted(contacts, key=lambda c: c["age"])\nprint(tries[0]["nom"])',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/lambda/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande une <code>lambda</code> dans le paramètre <code>key=</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'Alex') return { ok: false, message: 'Le plus jeune est Alex (25 ans) — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'La lambda dit à <code>sorted</code> sur quel critère comparer. Change <code>c["age"]</code> en <code>c["nom"]</code> et tu tries par ordre alphabétique.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> avec <code>map</code>, affiche la liste des carrés ; avec <code>filter</code>, la liste des nombres pairs.',
      codeDepart: 'nombres = [1, 2, 3, 4, 5, 6]\n\n',
      indices: [
        "Deux outils différents : l’un <strong>transforme</strong> chaque élément, l’autre en <strong>garde</strong> certains. Et aucun des deux ne renvoie une liste.",
        "<code>map</code> transforme, <code>filter</code> sélectionne. Tous deux rendent un objet paresseux : sans <code>list(…)</code> autour, tu verras une adresse mémoire au lieu des valeurs.",
        "<code>list(map(lambda x: x * x, nombres))</code> et <code>list(filter(lambda x: x % 2 == 0, nombres))</code>"
      ],
      solution: 'nombres = [1, 2, 3, 4, 5, 6]\n\nprint(list(map(lambda x: x * x, nombres)))\nprint(list(filter(lambda x: x % 2 == 0, nombres)))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/map\s*\(/.test(ctx.code) || !/filter\s*\(/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande d\'utiliser <code>map</code> ET <code>filter</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (/map object|<map/.test(l[0])) return { ok: false, message: 'Tu affiches l\'objet map lui-même : entoure-le de <code>list(...)</code> pour voir les valeurs.' };
        if (l[0] !== '[1, 4, 9, 16, 25, 36]') return { ok: false, message: 'Attendu <code>[1, 4, 9, 16, 25, 36]</code> — tu affiches ' + l[0] + '.' };
        if (l[1] !== '[2, 4, 6]') return { ok: false, message: 'Attendu <code>[2, 4, 6]</code> — tu affiches ' + l[1] + '.' };
        return { ok: true, message: 'map transforme, filter sélectionne. Tu as vu les mêmes outils en JavaScript : ce sont des idées universelles.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi :</strong> trie les contacts <strong>par ordre alphabétique de nom</strong> et affiche les trois noms séparés par des virgules, sur une seule ligne.',
      codeDepart: 'contacts = [\n    {"nom": "Zoé", "age": 30},\n    {"nom": "Alex", "age": 25},\n    {"nom": "Bob", "age": 41}\n]\n\n',
      indices: [
        "Deux temps : trier sur le nom, puis assembler les noms en une seule ligne.",
        "<code>join</code> ne fonctionne que sur des textes : il faut d’abord extraire la liste des noms, avec une compréhension.",
        "<code>\", \".join([c[\"nom\"] for c in tries])</code>"
      ],
      solution: 'contacts = [\n    {"nom": "Zoé", "age": 30},\n    {"nom": "Alex", "age": 25},\n    {"nom": "Bob", "age": 41}\n]\n\ntries = sorted(contacts, key=lambda c: c["nom"])\nprint(", ".join([c["nom"] for c in tries]))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'Alex, Bob, Zoé') return { ok: false, message: 'Attendu <code>Alex, Bob, Zoé</code> — tu affiches « ' + (l[0] || '(rien)') + ' ». Trie sur le nom, puis assemble avec <code>", ".join(...)</code>.' };
        return { ok: true, message: 'Tri, compréhension et jointure enchaînés : chaque outil fait une chose, et l\'assemblage résout le problème.' };
      }
    }
  ]
},

/* ---------- py-23 ---------- */
{
  id: 'py-23',
  titre: 'Fonctions avancées',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une fonction bien conçue est agréable à appeler : on ne lui donne que ce qui change, et l'ordre des arguments ne se devine pas. Python offre pour cela deux outils — et cache dans le premier l'un de ses pièges les plus célèbres.</p>

<h2>Les valeurs par défaut</h2>
<pre class="bloc-code">def saluer(nom, salutation="Bonjour"):
    return salutation + " " + nom

saluer("Alex")            # "Bonjour Alex"
saluer("Alex", "Salut")   # "Salut Alex"</pre>
<p>Un paramètre avec une valeur par défaut devient facultatif. Règle : <strong>ils se placent après les paramètres obligatoires</strong>, sans quoi Python ne saurait plus quoi associer à quoi.</p>

<h2>Les arguments nommés</h2>
<pre class="bloc-code">def creer(nom, age, ville):
    ...

creer("Alex", 30, "Lyon")                      # qui est quoi ?
creer(nom="Alex", ville="Lyon", age=30)        # clair, et l'ordre est libre</pre>
<p>Nommer les arguments à l'appel rend la ligne lisible sans avoir à ouvrir la fonction. C'est particulièrement précieux dès qu'il y a plus de deux paramètres, ou qu'un booléen traîne — <code>trier(liste, True)</code> ne dit rien, <code>trier(liste, decroissant=True)</code> dit tout.</p>

<h2>Pas à pas : le piège du défaut mutable</h2>
<pre class="bloc-code">def ajoute(x, liste=[]):
    liste.append(x)
    return liste

print(ajoute(1))   # [1]
print(ajoute(2))   # [1, 2]   ?!</pre>
<p>Mesuré : le second appel rend <code>[1, 2]</code>. On attendait <code>[2]</code>.</p>
<table class="memo-table trace">
<tr><th>Moment</th><th>Ce qui se passe</th></tr>
<tr><td>à la <strong>définition</strong></td><td>la liste vide est créée, <strong>une seule fois</strong></td></tr>
<tr><td>premier appel</td><td>on y ajoute 1</td></tr>
<tr><td>second appel</td><td>c'est <em>la même liste</em> : elle contient encore 1</td></tr>
</table>
<p>La valeur par défaut est évaluée à la définition de la fonction, pas à chaque appel. Avec un nombre ou un texte, qui ne se modifient jamais, cela ne se voit pas. Avec une liste ou un dictionnaire, la mémoire persiste d'un appel à l'autre.</p>
<p>La parade est toujours la même : <code>def ajoute(x, liste=None):</code> puis <code>if liste is None: liste = []</code> dans le corps.</p>

<h2>Les pièges</h2>
<p><strong>Le défaut mutable.</strong> Celui-ci, mesuré ci-dessus, est le plus célèbre de Python. Il ne lève aucune erreur, et le bug apparaît seulement au second appel — souvent longtemps après l'écriture.</p>
<p><strong>Un paramètre par défaut avant un obligatoire.</strong> <code>def f(a=1, b)</code> est refusé net par Python.</p>
<p><strong>Mélanger l'ordre à l'appel.</strong> Les arguments nommés viennent toujours après les positionnels : <code>f(nom="Alex", 30)</code> est une erreur de syntaxe.</p>
<p><strong>Trop de paramètres.</strong> Au-delà de quatre ou cinq, la fonction fait sans doute deux choses — ou mérite de recevoir un dictionnaire.</p>

<h2>Dans la vraie vie</h2>
<p>Les bibliothèques Python s'appuient énormément sur les arguments nommés : une fonction de tracé de graphique en accepte parfois trente, tous facultatifs. C'est ce qui permet d'écrire <code>tracer(donnees, couleur="rouge")</code> sans se soucier des vingt-neuf autres.</p>

<div class="a-retenir">
<ul>
<li>Les paramètres à valeur par défaut se placent <strong>après</strong> les obligatoires.</li>
<li>Nommer les arguments à l'appel rend la ligne lisible et libère l'ordre.</li>
<li>Un défaut <strong>mutable</strong> (liste, dictionnaire) est partagé entre tous les appels.</li>
<li>La parade : <code>=None</code>, puis créer la liste dans le corps.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : un nombre libre d'arguments</summary>
<p><code>def total(*nombres)</code> rassemble tous les arguments reçus dans un tuple ; <code>def creer(**options)</code> rassemble les arguments nommés dans un dictionnaire. On les croise surtout dans les fonctions qui en enveloppent d'autres et doivent transmettre ce qu'elles reçoivent sans le connaître. C'est le même symbole que le déballage vu avec <code>zip</code>, utilisé dans l'autre sens.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Écris <code>saluer(nom, salutation="Bonjour")</code> et appelle-la deux fois : une fois sans préciser la salutation, une fois avec <code>"Salut"</code>.',
      codeDepart: '# ta fonction, puis deux appels :\n',
      indices: [
        "Un paramètre peut avoir une valeur prête d’avance, utilisée quand l’appelant n’en donne pas. Elle s’écrit dans la définition.",
        "La valeur par défaut se met après un <code>=</code>, dans la parenthèse du <code>def</code>. Les paramètres ainsi dotés viennent toujours en dernier.",
        "<code>def saluer(nom, salutation=\"Bonjour\"):</code> puis <code>return f\"{salutation} {nom}\"</code>"
      ],
      solution: 'def saluer(nom, salutation="Bonjour"):\n    return f"{salutation} {nom}"\n\nprint(saluer("Alex"))\nprint(saluer("Alex", "Salut"))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/def\s+saluer\s*\([^)]*=/.test(ctx.code)) return { ok: false, message: 'Le second paramètre doit avoir une valeur par défaut : <code>def saluer(nom, salutation="Bonjour"):</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes, pour deux appels différents.' };
        if (l[0].trim() !== 'Bonjour Alex') return { ok: false, message: 'Le premier appel, sans salutation, doit donner <code>Bonjour Alex</code> — tu affiches « ' + l[0] + ' ».' };
        if (l[1].trim() !== 'Salut Alex') return { ok: false, message: 'Le second doit donner <code>Salut Alex</code> — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Un paramètre par défaut rend une fonction simple à utiliser dans le cas courant, sans lui enlever de souplesse.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> écris <code>somme(*nombres)</code> qui additionne <strong>autant d\'arguments qu\'on veut</strong>, et teste-la avec 2 puis avec 4 nombres.',
      codeDepart: '# ta fonction, puis deux appels de tailles différentes :\n',
      indices: [
        "Le nombre d’arguments n’est pas connu d’avance. Python sait les rassembler tous dans une seule variable.",
        "Une étoile devant le nom du paramètre : <code>*nombres</code> devient un tuple contenant tout ce qu’on a passé. Ensuite, une boucle ordinaire suffit.",
        "<code>def somme(*nombres):</code> puis un accumulateur, et <code>return total</code>"
      ],
      solution: 'def somme(*nombres):\n    total = 0\n    for n in nombres:\n        total += n\n    return total\n\nprint(somme(1, 2))\nprint(somme(1, 2, 3, 4))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/def\s+somme\s*\(\s*\*/.test(ctx.code)) return { ok: false, message: 'Le paramètre doit commencer par une étoile : <code>def somme(*nombres):</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux appels avec des nombres d\'arguments différents.' };
        if (l[0] !== '3') return { ok: false, message: 'somme(1, 2) doit donner 3 — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '10') return { ok: false, message: 'somme(1, 2, 3, 4) doit donner 10 — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Une seule fonction, un nombre d\'arguments libre. C\'est ainsi que <code>print()</code> lui-même est construit.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Pourquoi <code>def ajouter(item, liste=[])</code> est-il dangereux ?',
      choix: [
        'La liste est créée une seule fois et se partage entre tous les appels',
        'Python interdit les listes en paramètre',
        'La liste est recréée à chaque appel, ce qui est lent',
        'Il faut toujours mettre les paramètres par défaut en premier'
      ],
      bonne: 0,
      explication: 'La valeur par défaut est évaluée UNE FOIS, à la définition de la fonction. Tous les appels se partagent donc la même liste, qui grossit d\'appel en appel. La solution : mettre None par défaut et créer la liste à l\'intérieur.',
      aides: [
        null,
        'Les listes en paramètre sont parfaitement autorisées. C\'est leur usage comme valeur par DÉFAUT qui pose problème.',
        'C\'est l\'inverse, et c\'est bien là le piège : elle n\'est justement PAS recréée à chaque appel.',
        'C\'est même l\'inverse : les paramètres avec défaut doivent venir après les autres. Mais ce n\'est pas le problème ici.'
      ]
    }
  ]
},

/* ---------- py-24 ---------- */
{
  id: 'py-24',
  titre: 'L\'héritage en Python',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un chien et un chat partagent beaucoup : un nom, un âge, la capacité de crier. Écrire deux classes complètes reviendrait à recopier tout ce qui est commun — et à le corriger deux fois le jour où il change.</p>
<p>L'<strong>héritage</strong> permet de dire : « un chien <em>est</em> un animal, avec ceci en plus ».</p>

<h2>Le parent et l'enfant</h2>
<pre class="bloc-code">class Animal:
    def __init__(self, nom):
        self.nom = nom

    def crier(self):
        return "..."

class Chien(Animal):          # entre parentheses : la classe parente
    def crier(self):          # on redefinit la methode
        return "Ouaf"

c = Chien("Rex")
print(c.nom, c.crier())       # Rex Ouaf
print(isinstance(c, Animal))  # True</pre>
<p>Mesuré. <code>Chien</code> n'a pas de <code>__init__</code> : il reprend celui d'<code>Animal</code>. Il redéfinit seulement <code>crier</code>, et c'est bien sa version qui s'exécute.</p>
<p><code>isinstance(c, Animal)</code> rend <code>True</code> : un chien <em>est</em> un animal. C'est le test à retenir — il accepte aussi les classes filles, contrairement à une comparaison de type exacte.</p>

<h2>super : compléter au lieu de remplacer</h2>
<pre class="bloc-code">class Chien(Animal):
    def __init__(self, nom, race):
        super().__init__(nom)    # le travail du parent
        self.race = race         # puis le sien</pre>
<p><code>super()</code> appelle la méthode du parent. Sans lui, redéfinir <code>__init__</code> écraserait complètement celui d'<code>Animal</code>, et <code>self.nom</code> n'existerait jamais.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Appel</th><th>Où Python cherche</th></tr>
<tr><td><code>c.crier()</code></td><td>dans <code>Chien</code> d'abord : trouvé, il s'arrête</td></tr>
<tr><td><code>c.nom</code></td><td>posé par <code>__init__</code>, hérité d'<code>Animal</code></td></tr>
<tr><td>une méthode absente des deux</td><td>erreur : <em>l'attribut n'existe pas</em></td></tr>
</table>
<p>La règle tient en une phrase : <strong>on cherche d'abord dans l'enfant, puis on remonte</strong>.</p>

<h2>Les pièges</h2>
<p><strong>Oublier <code>super().__init__()</code>.</strong> L'objet se crée sans erreur, et plante plus tard sur un attribut manquant — loin de la cause.</p>
<p><strong>Oublier <code>self</code> dans la méthode redéfinie.</strong> Même message que d'habitude, et il nomme la cause : <em>« la cause la plus fréquente est un « self » oublié en premier paramètre. »</em></p>
<p><strong>Hériter sans raison.</strong> L'héritage n'est justifié que si l'enfant <em>est</em> vraiment un cas particulier du parent. Si la relation est « contient » plutôt que « est », mieux vaut ranger un objet dans un attribut.</p>
<p><strong>Empiler les niveaux.</strong> Trois ou quatre générations de classes rendent impossible de savoir d'où vient une méthode. L'usage moderne est de rester très plat.</p>

<h2>Dans la vraie vie</h2>
<p>L'héritage est partout dans les bibliothèques : on hérite d'une classe fournie pour en adapter le comportement. En revanche, dans le code d'application, la tendance actuelle est de l'utiliser avec parcimonie — et de préférer la <em>composition</em>, qui consiste à assembler des objets plutôt qu'à les faire descendre les uns des autres.</p>

<div class="a-retenir">
<ul>
<li><code>class Enfant(Parent):</code> reprend tout, et peut redéfinir.</li>
<li><code>super().__init__(...)</code> appelle le constructeur du parent — à ne pas oublier.</li>
<li>Python cherche d'abord dans l'enfant, puis remonte.</li>
<li><code>isinstance(obj, Classe)</code> accepte aussi les classes filles.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : hériter de plusieurs classes</summary>
<p>Python l'autorise : <code>class C(A, B)</code>. La plupart des langages l'interdisent, parce que la question « si A et B ont la même méthode, laquelle gagne ? » devient vite inextricable. Python y répond par un ordre de résolution précis et documenté — mais l'usage reste réservé à des cas particuliers, et la plupart des guides de style recommandent de s'en passer.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Crée une classe <code>Chien</code> qui <strong>hérite</strong> d\'<code>Animal</code> et redéfinit <code>crier()</code> pour renvoyer <code>« nom » fait Ouaf !</code>. Affiche le résultat pour un chien nommé Rex.',
      codeDepart: 'class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n\n    def crier(self):\n        return "..."\n\n# ta classe Chien ici\n',
      indices: [
        "Hériter, c’est repartir d’une classe existante : la nouvelle reçoit tout ce que l’ancienne avait, y compris son constructeur.",
        "La classe parente se met entre parenthèses après le nom. Redéfinir une méthode, c’est simplement en réécrire une du même nom dans la classe enfant.",
        "<code>class Chien(Animal):</code> puis <code>def crier(self):</code> avec <code>return self.nom + \" fait Ouaf !\"</code>"
      ],
      solution: 'class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n\n    def crier(self):\n        return "..."\n\nclass Chien(Animal):\n    def crier(self):\n        return self.nom + " fait Ouaf !"\n\nrex = Chien("Rex")\nprint(rex.crier())',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/class\s+Chien\s*\(\s*Animal\s*\)/.test(ctx.code)) return { ok: false, message: 'La classe doit hériter : <code>class Chien(Animal):</code> — le parent va entre parenthèses.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche — pense à créer un chien et à afficher son cri.' };
        if (l[0] === '...') return { ok: false, message: 'C\'est la méthode d\'Animal qui s\'exécute : ta méthode dans Chien doit s\'appeler exactement <code>crier</code>.' };
        if (l[0].trim() !== 'Rex fait Ouaf !') return { ok: false, message: 'Attendu <code>Rex fait Ouaf !</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Chien n\'a pas de constructeur, et pourtant <code>Chien("Rex")</code> fonctionne : celui d\'Animal est hérité automatiquement.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> ajoute une classe <code>Chat</code> avec un constructeur qui prend <code>nom</code> ET <code>couleur</code>, en appelant <code>super()</code> pour le nom. Affiche <code>Félix est blanc</code>.',
      codeDepart: 'class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n\n# ta classe Chat ici\n',
      indices: [
        "Le chat a un nom, comme tout animal, plus une couleur. Le nom est déjà géré par le parent : inutile de refaire son travail.",
        "<code>super()</code> désigne la classe parente. On appelle son constructeur pour le nom, puis on ajoute ce qui est propre au chat.",
        "<code>super().__init__(nom)</code> puis <code>self.couleur = couleur</code>"
      ],
      solution: 'class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n\nclass Chat(Animal):\n    def __init__(self, nom, couleur):\n        super().__init__(nom)\n        self.couleur = couleur\n\nc = Chat("Félix", "blanc")\nprint(f"{c.nom} est {c.couleur}")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/super\s*\(\s*\)\s*\.\s*__init__/.test(ctx.code)) return { ok: false, message: 'Appelle le constructeur du parent avec <code>super().__init__(nom)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'Félix est blanc') return { ok: false, message: 'Attendu <code>Félix est blanc</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'super() complète le travail du parent au lieu de le refaire. Si Animal change, Chat en profite automatiquement.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi :</strong> ajoute une méthode <code>__str__</code> à <code>Animal</code> qui renvoie <code>Animal nommé Rex</code>, puis affiche l\'objet <strong>directement</strong> avec <code>print(a)</code>.',
      codeDepart: 'class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n\n    # ta méthode __str__ ici\n\na = Animal("Rex")\nprint(a)',
      indices: [
        "Afficher un objet donne normalement quelque chose d’illisible. Une méthode spéciale permet de décider ce que <code>print</code> en montre.",
        "Son nom est encadré de deux tirets bas de chaque côté, comme <code>__init__</code>. Elle doit <strong>renvoyer</strong> un texte, pas l’afficher.",
        "<code>def __str__(self):</code> puis <code>return \"Animal nommé \" + self.nom</code>"
      ],
      solution: 'class Animal:\n    def __init__(self, nom):\n        self.nom = nom\n\n    def __str__(self):\n        return "Animal nommé " + self.nom\n\na = Animal("Rex")\nprint(a)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/__str__/.test(ctx.code)) return { ok: false, message: 'Ajoute la méthode spéciale <code>__str__(self)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (/object at|instance/.test(l[0])) return { ok: false, message: 'Python affiche l\'adresse mémoire de l\'objet : ta méthode <code>__str__</code> n\'est pas prise en compte. Vérifie son nom (deux tirets bas de chaque côté) et son indentation dans la classe.' };
        if (l[0].trim() !== 'Animal nommé Rex') return { ok: false, message: 'Attendu <code>Animal nommé Rex</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: '__str__ est le toString() de Python. Le définir dans tes classes rend le débogage nettement plus agréable.' };
      }
    }
  ]
},

/* ---------- py-25 ---------- */
{
  id: 'py-25',
  titre: 'Les générateurs : produire à la demande',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Imagine une fonction qui doit renvoyer un million de nombres. Avec une liste, il faut d'abord tout construire en mémoire, puis attendre que ce soit fini — avant même de pouvoir regarder le premier.</p>
<p>Un <strong>générateur</strong> les produit un par un, à la demande. Rien n'est construit d'avance, et le premier résultat arrive tout de suite.</p>

<h2>yield, au lieu de return</h2>
<pre class="bloc-code">def compter(n):
    i = 1
    while i &lt;= n:
        yield i
        i += 1

print(list(compter(3)))   # [1, 2, 3]
print(compter(3))         # &lt;generator object compter&gt;</pre>
<p>Mesuré, y compris la dernière ligne. Un seul mot change tout : <code>yield</code> au lieu de <code>return</code>.</p>
<p>La différence est de nature. <code>return</code> <strong>termine</strong> la fonction ; <code>yield</code> la met <strong>en pause</strong>, rend une valeur, et reprend exactement là où elle s'était arrêtée au tour suivant — avec toutes ses variables intactes.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Moment</th><th>Ce qui se passe</th></tr>
<tr><td><code>compter(3)</code></td><td>Rien ne s'exécute. On reçoit un générateur.</td></tr>
<tr><td>on demande la 1re valeur</td><td>Le corps tourne jusqu'au <code>yield</code> : il rend 1, et <strong>gèle</strong>.</td></tr>
<tr><td>on demande la 2e</td><td>Il reprend après le <code>yield</code>, avec <code>i</code> valant toujours 1.</td></tr>
<tr><td>la condition devient fausse</td><td>La fonction se termine : plus rien à produire.</td></tr>
</table>
<p>Le point surprenant est le premier : appeler la fonction n'exécute <em>rien</em>. C'est pourquoi <code>print(compter(3))</code> affiche <code>&lt;generator object&gt;</code> et non des nombres.</p>

<h2>Le bénéfice réel</h2>
<p>Une liste d'un million de nombres occupe la mémoire d'un million de nombres. Un générateur n'en garde qu'un à la fois, quel que soit le total. Et si l'on s'arrête au dixième, les neuf cent quatre-vingt-dix mille autres ne sont jamais calculés.</p>
<p>C'est ce qui permet de lire un fichier de dix gigaoctets ligne par ligne sans jamais le charger entièrement.</p>

<h2>Les pièges</h2>
<p><strong>Croire qu'on obtient une liste.</strong> Sans <code>list()</code>, on ne voit rien d'utile. C'est le symptôme reconnaissable.</p>
<p><strong>Le parcourir deux fois.</strong> Un générateur <strong>s'épuise</strong> : une fois parcouru, il est vide. Une seconde boucle ne donne rien, sans aucune erreur. Si tu dois relire, garde une liste.</p>
<p><strong>Chercher <code>len()</code>.</strong> Il n'en a pas : il ne sait pas combien de valeurs il produira. Il faut le convertir, ce qui annule son intérêt.</p>
<p><strong>En faire un par réflexe.</strong> Sur dix éléments, la liste est plus simple et plus pratique. Le générateur se justifie quand le volume est grand, ou quand on peut s'arrêter en route.</p>

<h2>Dans la vraie vie</h2>
<p>Tu en utilises depuis le début sans le savoir : <code>range</code>, <code>map</code>, <code>filter</code>, <code>zip</code> et <code>enumerate</code> fonctionnent tous ainsi. C'est pour cela que <code>print(range(5))</code> affiche <code>range(0, 5)</code> au lieu de la liste — Python ne fabrique rien tant qu'on ne demande pas.</p>

<div class="a-retenir">
<ul>
<li><code>yield</code> met la fonction en pause et la reprend où elle s'était arrêtée.</li>
<li>Appeler la fonction n'exécute rien : il faut parcourir ou convertir.</li>
<li>Un générateur <strong>s'épuise</strong> : on ne le parcourt qu'une fois.</li>
<li><code>range</code>, <code>map</code>, <code>filter</code> et <code>zip</code> fonctionnent tous de cette façon.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : un générateur sans fin</summary>
<p><code>while True: yield i; i += 1</code> produit des nombres indéfiniment — et ne bloque pas, puisque rien n'est calculé d'avance. On l'arrête en cessant de demander, ou avec <code>itertools.islice(gen, 10)</code> pour en prendre dix. C'est impossible avec une liste, qu'il faudrait construire en entier : certaines idées ne sont réalisables qu'avec des générateurs.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Écris un générateur <code>compter(n)</code> qui produit les nombres de 1 à n avec <code>yield</code>, et parcours <code>compter(3)</code> dans une boucle pour afficher 1, 2, 3.',
      codeDepart: '# ton générateur, puis la boucle :\n',
      indices: [
        "Un générateur ne rend pas une liste toute faite : il produit ses valeurs une par une, à mesure qu’on les demande.",
        "Le mot-clé n’est pas <code>return</code> — celui-là arrêterait tout au premier tour. Il en faut un qui donne une valeur <strong>sans</strong> terminer la fonction.",
        "<code>while i &lt;= n:</code> · <code>yield i</code> · <code>i += 1</code>"
      ],
      solution: 'def compter(n):\n    i = 1\n    while i <= n:\n        yield i\n        i += 1\n\nfor x in compter(3):\n    print(x)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/yield/.test(ctx.code)) return { ok: false, message: 'L\'exercice porte sur les générateurs : utilise <code>yield</code> et non <code>return</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.join(',') !== '1,2,3') return { ok: false, message: 'Attendu 1, 2, 3 (un par ligne) — tu affiches ' + l.join(', ') + '.' };
        return { ok: true, message: 'La fonction se met en pause à chaque yield et reprend au tour suivant. Aucune liste n\'a été construite.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> écris un générateur <code>carres(n)</code> qui produit les carrés de 0 à n-1, et affiche <code>list(carres(5))</code>.',
      codeDepart: '',
      indices: [
        "Même principe qu’au précédent, mais avec un <code>for</code> au lieu d’un <code>while</code> : plus court, et aucun compteur à gérer.",
        "Le générateur ne produit rien tant qu’on ne le parcourt pas. <code>list()</code> le parcourt entièrement d’un coup.",
        "<code>for i in range(n):</code> puis <code>yield i * i</code>, et <code>print(list(carres(5)))</code>"
      ],
      solution: 'def carres(n):\n    for i in range(n):\n        yield i * i\n\nprint(list(carres(5)))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/yield/.test(ctx.code)) return { ok: false, message: 'Utilise <code>yield</code> pour en faire un générateur.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (/generator/.test(l[0] || '')) return { ok: false, message: 'Tu affiches l\'objet générateur lui-même : entoure-le de <code>list(...)</code> pour voir les valeurs.' };
        if (l[0] !== '[0, 1, 4, 9, 16]') return { ok: false, message: 'Attendu <code>[0, 1, 4, 9, 16]</code> — tu affiches ' + (l[0] || '(rien)') + '.' };
        return { ok: true, message: 'Un générateur ne devient une liste que si tu le demandes explicitement. Le reste du temps, il reste économe.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Quelle est la différence entre <code>return</code> et <code>yield</code> ?',
      choix: [
        'return termine la fonction ; yield la met en pause et elle reprend au tour suivant',
        'yield est une écriture plus moderne de return',
        'yield ne fonctionne que dans les boucles for',
        'return renvoie un nombre, yield renvoie une liste'
      ],
      bonne: 0,
      explication: 'Avec yield, la fonction garde son état — la valeur de ses variables, sa position dans la boucle — et repart exactement de là au tour suivant. C\'est ce qui permet de produire des valeurs sans jamais toutes les stocker.',
      aides: [
        null,
        'Ce sont deux comportements différents, pas deux styles. Une fonction avec yield ne renvoie pas une valeur mais un générateur.',
        'On l\'utilise souvent avec une boucle for, mais rien ne l\'y oblige : <code>list()</code> ou <code>next()</code> fonctionnent aussi.',
        'Le type renvoyé n\'a rien à voir : les deux peuvent produire n\'importe quelle valeur. La différence est dans la mise en pause.'
      ]
    }
  ]
},

/* ---------- py-26 ---------- */
{
  id: 'py-26',
  titre: 'Les dates',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Manipuler des dates est l'un des besoins les plus fréquents — et l'une des sources de bugs les plus classiques. Combien de jours en février ? Quelle date dans 45 jours ? Quel âge a quelqu'un né le 29 février ?</p>
<p>Personne ne veut recalculer cela à la main. Python fournit un module dédié, <code>datetime</code>, qui connaît les mois irréguliers et les années bissextiles.</p>

<h2>Créer et lire une date</h2>
<pre class="bloc-code">import datetime

d = datetime.date(2026, 10, 12)
print(d)                      # 2026-10-12
print(d.year, d.month, d.day) # 2026 10 12</pre>
<p>Mesuré. Première bonne nouvelle par rapport à JavaScript : <strong>les mois comptent à partir de 1</strong>. Octobre est le mois 10, comme on l'écrit partout ailleurs.</p>
<p>Et <code>print(d)</code> affiche directement <code>2026-10-12</code> — le format international, où l'ordre décroissant permet de trier des dates par simple comparaison de texte.</p>

<h2>Afficher autrement</h2>
<pre class="bloc-code">print(d.strftime("%d/%m/%Y"))   # 12/10/2026</pre>
<p>Mesuré. <code>strftime</code> met en forme : <code>%d</code> le jour, <code>%m</code> le mois, <code>%Y</code> l'année sur quatre chiffres. Les codes sont nombreux et se cherchent dans la documentation — personne ne les retient tous.</p>

<h2>Pas à pas : la différence entre deux dates</h2>
<pre class="bloc-code">d = datetime.date(2026, 10, 12)
e = datetime.date(2026, 12, 25)
print((e - d).days)   # 74</pre>
<table class="memo-table trace">
<tr><th>Opération</th><th>Ce qu'on obtient</th></tr>
<tr><td><code>e - d</code></td><td>une <strong>durée</strong>, pas un nombre</td></tr>
<tr><td><code>(e - d).days</code></td><td>74 — le nombre de jours</td></tr>
<tr><td><code>d + timedelta(days=30)</code></td><td>une nouvelle date, 30 jours plus tard</td></tr>
</table>
<p>Mesuré : 74 jours, mois irréguliers compris. C'est précisément ce qu'on ne veut pas calculer soi-même.</p>
<p>Deux types cohabitent donc : <code>date</code>, un point dans le temps, et <code>timedelta</code>, une durée. Soustraire deux dates donne une durée ; ajouter une durée à une date donne une date.</p>

<h2>Les pièges</h2>
<p><strong>Croire que <code>e - d</code> donne un nombre.</strong> C'est un <code>timedelta</code>. Il faut <code>.days</code> pour obtenir l'entier.</p>
<p><strong>Confondre <code>date</code> et <code>datetime</code>.</strong> Le premier est un jour, le second un jour <em>et</em> une heure. Les mélanger dans une soustraction lève une erreur de types.</p>
<p><strong>Calculer un âge en divisant par 365.</strong> Les années bissextiles faussent le résultat. On compare les années, puis on retire 1 si l'anniversaire n'est pas encore passé.</p>
<p><strong>Oublier l'import.</strong> <code>datetime.date(...)</code> sans <code>import datetime</code> donne <em>« le nom « datetime » est inconnu »</em>.</p>

<h2>Dans la vraie vie</h2>
<p>Dès que les fuseaux horaires entrent en jeu, les choses se compliquent sérieusement : un même instant n'a pas la même date selon l'endroit, et les changements d'heure créent des heures qui n'existent pas. Les équipes passent alors à des bibliothèques spécialisées — mais pour une date de naissance ou une échéance, <code>datetime</code> suffit largement.</p>

<div class="a-retenir">
<ul>
<li><code>datetime.date(2026, 10, 12)</code> — et les mois comptent à partir de <strong>1</strong>.</li>
<li>Soustraire deux dates donne une <strong>durée</strong> : <code>.days</code> pour le nombre de jours.</li>
<li><code>strftime</code> met en forme ; <code>timedelta</code> permet d'ajouter une durée.</li>
<li>Un âge ne se calcule jamais en divisant par 365.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le format qui se trie tout seul</summary>
<p><code>2026-10-12</code> suit la norme ISO 8601, et son ordre — du plus grand au plus petit — n'est pas arbitraire : un tri alphabétique de ces chaînes donne exactement un tri chronologique. Aucun autre format courant n'a cette propriété. C'est pourquoi on le retrouve dans les bases de données, les noms de fichiers de sauvegarde et les fichiers journaux du monde entier.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Crée la date du <strong>14 juillet 2024</strong> et affiche, sur deux lignes : l\'année seule, puis la date au format <code>14/07/2024</code>.',
      codeDepart: 'import datetime\n\n',
      indices: [
        "Comme <code>random</code> et <code>math</code>, les dates viennent d’un module à importer. Une date se construit avec trois nombres.",
        "L’ordre est année, mois, jour — du plus grand au plus petit. L’année seule est un attribut ; la mise en forme passe par une méthode et un motif.",
        "<code>datetime.date(2024, 7, 14)</code>, puis <code>d.year</code> et <code>d.strftime(\"%d/%m/%Y\")</code>"
      ],
      solution: 'import datetime\n\nd = datetime.date(2024, 7, 14)\nprint(d.year)\nprint(d.strftime("%d/%m/%Y"))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/import\s+datetime/.test(ctx.code)) return { ok: false, message: 'Commence par <code>import datetime</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (l[0] !== '2024') return { ok: false, message: 'La première ligne doit afficher l\'année, 2024 — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '14/07/2024') return { ok: false, message: 'Attendu <code>14/07/2024</code> — utilise <code>strftime("%d/%m/%Y")</code>. Tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Une vraie date, pas du texte : tu peux la comparer, la trier, calculer avec.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> calcule le <strong>nombre de jours</strong> entre le 1er janvier 2024 et le 1er mars 2024, et affiche-le.',
      codeDepart: 'import datetime\n\ndebut = datetime.date(2024, 1, 1)\nfin = datetime.date(2024, 3, 1)\n\n',
      indices: [
        "Deux dates se soustraient comme deux nombres. Mais le résultat n’est pas un nombre : c’est une <strong>durée</strong>.",
        "Cette durée porte son nombre de jours dans un attribut au nom évident, au pluriel.",
        "<code>(fin - debut).days</code>"
      ],
      solution: 'import datetime\n\ndebut = datetime.date(2024, 1, 1)\nfin = datetime.date(2024, 3, 1)\n\necart = fin - debut\nprint(ecart.days)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (/\b60\b/.test(ctx.code)) return { ok: false, message: 'Le résultat doit être calculé, pas écrit à la main.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '60') return { ok: false, message: 'Attendu <code>60</code> jours (31 en janvier + 29 en février 2024, année bissextile) — tu affiches « ' + (l[0] || '(rien)') + ' ». Pense au <code>.days</code>.' };
        return { ok: true, message: '60 et non 59 : 2024 est bissextile, et Python l\'a su tout seul. C\'est exactement le genre de détail qu\'un calcul manuel rate.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi :</strong> écris une fonction <code>age_en_jours(naissance)</code> qui renvoie le nombre de jours entre une date de naissance et le <strong>1er janvier 2025</strong>, et teste-la avec le 1er janvier 2000.',
      codeDepart: 'import datetime\n\n# ta fonction, puis le test :\n',
      indices: [
        "C’est la même soustraction qu’à l’exercice précédent, rangée dans une fonction. La date d’arrivée, elle, ne change jamais.",
        "La date de référence se construit à l’intérieur de la fonction ; la date de naissance, elle, arrive en paramètre.",
        "<code>return (reference - naissance).days</code>"
      ],
      solution: 'import datetime\n\ndef age_en_jours(naissance):\n    reference = datetime.date(2025, 1, 1)\n    return (reference - naissance).days\n\nprint(age_en_jours(datetime.date(2000, 1, 1)))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/def\s+age_en_jours\s*\(/.test(ctx.code)) return { ok: false, message: 'Définis la fonction <code>age_en_jours(naissance)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '9132') return { ok: false, message: 'Attendu <code>9132</code> jours entre le 1er janvier 2000 et le 1er janvier 2025 — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: '25 ans, dont 6 années bissextiles : 9132 jours. Module Python terminé ! 🐍 Découpage, tuples, ensembles, lambdas, héritage, générateurs et dates — tu couvres maintenant tout ce qu\'on attend d\'un développeur Python débutant, et un peu au-delà.' };
      }
    }
  ]
}
];
