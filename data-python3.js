/* ===== Python — troisième partie (py-19 à py-26) ===== */
window.DATA_PYTHON3 = [

/* ---------- py-19 ---------- */
{
  id: 'py-19',
  titre: 'Le découpage : extraire un morceau',
  contenu: `
<p>Tu sais lire une case avec <code>t[0]</code>. Python permet aussi d'extraire <strong>une tranche entière</strong> en une seule écriture — c'est l'une de ses fonctionnalités les plus appréciées.</p>

<pre class="bloc-code">t = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

print(t[2:5])     # [2, 3, 4]  — de l'indice 2 inclus à 5 EXCLU
print(t[:3])      # [0, 1, 2]  — depuis le début
print(t[7:])      # [7, 8, 9]  — jusqu'à la fin
print(t[-3:])     # [7, 8, 9]  — les trois derniers</pre>

<p>La règle est toujours la même : <code>[début:fin]</code>, avec le début <strong>inclus</strong> et la fin <strong>exclue</strong>. C'est exactement la logique du <code>range()</code>, et elle a un avantage pratique : <code>t[0:3]</code> et <code>t[3:6]</code> se suivent sans se chevaucher ni laisser de trou.</p>

<h2>Le troisième nombre : le pas</h2>
<pre class="bloc-code">print(t[::2])     # [0, 2, 4, 6, 8]  — une case sur deux
print(t[::-1])    # [9, 8, 7, ..., 0]  — À L'ENVERS !</pre>
<p><code>[::-1]</code> est l'astuce la plus connue de Python : elle inverse n'importe quelle liste ou chaîne.</p>

<h2>Ça marche aussi sur le texte</h2>
<pre class="bloc-code">mot = "Bonjour"
print(mot[0:3])    # Bon
print(mot[-1])     # r
print(mot[::-1])   # ruojnoB</pre>

<div class="astuce"><div>Le découpage ne modifie jamais l'original : il en fabrique une copie. <code>copie = ma_liste[:]</code> est d'ailleurs la façon classique de dupliquer une liste — utile, car <code>copie = ma_liste</code> ne créerait qu'un second nom pour la même liste.</div></div>
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
<p>Au-delà des listes et des dictionnaires, Python propose deux autres collections, chacune avec une raison d'être précise.</p>

<h2>Le tuple : une liste qu'on ne peut pas modifier</h2>
<pre class="bloc-code">point = (3, 4)         # parenthèses au lieu de crochets
print(point[0])        # 3 — la lecture est identique
# point[0] = 9         # ERREUR : un tuple est figé</pre>
<p>À quoi bon une liste qu'on ne peut pas changer ? Justement à ça : <strong>garantir</strong> que rien ne bougera. Des coordonnées, une date, une couleur RVB n'ont aucune raison d'être modifiées case par case.</p>

<h2>Le tuple permet le retour multiple</h2>
<pre class="bloc-code">def extremes(valeurs):
    return min(valeurs), max(valeurs)    # renvoie un tuple

petit, grand = extremes([3, 9, 1])       # on le « déballe »
print(petit, grand)                      # 1 9</pre>
<p>C'est ce mécanisme qui se cachait derrière l'échange magique <code>a, b = b, a</code> vu au début du module.</p>

<h2>L'ensemble : pas de doublon, pas d'ordre</h2>
<pre class="bloc-code">nombres = {1, 2, 2, 3, 3, 3}
print(nombres)           # {1, 2, 3} — les doublons ont disparu
print(3 in nombres)      # True — un test ultra-rapide
nombres.add(9)</pre>

<h2>Les opérations d'ensembles</h2>
<pre class="bloc-code">a = {1, 2, 3}
b = {2, 3, 4}
print(a &amp; b)    # {2, 3} — l'intersection (dans les deux)
print(a | b)    # {1, 2, 3, 4} — l'union (dans l'un ou l'autre)
print(a - b)    # {1} — la différence (dans a mais pas dans b)</pre>
<p>Ces trois opérations remplacent des boucles imbriquées entières. « Quels clients ont acheté A <em>et</em> B ? » devient une intersection.</p>

<div class="astuce"><div>Astuce classique pour dédoublonner une liste en gardant l'ordre trié : <code>sorted(set(ma_liste))</code>. On convertit en ensemble (les doublons sautent), puis on retrie.</div></div>
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
<p>Deux fonctions qui règlent chacune un problème très concret de parcours.</p>

<h2>enumerate : la valeur ET son numéro</h2>
<p>La boucle <code>for</code> de Python donne les valeurs, pas les indices. Quand tu as besoin des deux, la solution du débutant est maladroite :</p>
<pre class="bloc-code"># Maladroit
i = 0
for nom in noms:
    print(i, nom)
    i += 1

# La bonne façon
for i, nom in enumerate(noms):
    print(i, nom)</pre>
<p><code>enumerate</code> fournit à chaque tour un couple (indice, valeur), qu'on déballe directement en deux variables.</p>
<pre class="bloc-code">for i, nom in enumerate(noms, 1):    # démarrer à 1 plutôt qu'à 0
    print(i, nom)</pre>

<h2>zip : parcourir deux listes en parallèle</h2>
<pre class="bloc-code">noms = ["Alice", "Bob", "Chloé"]
ages = [30, 25, 41]

for nom, age in zip(noms, ages):
    print(nom, "a", age, "ans")</pre>
<p>Sans <code>zip</code>, il faudrait boucler sur les indices et écrire <code>noms[i]</code> et <code>ages[i]</code> — plus long et plus fragile. Si les listes n'ont pas la même longueur, <code>zip</code> s'arrête à la plus courte.</p>

<div class="astuce"><div>La règle générale de Python : si tu écris <code>for i in range(len(ma_liste))</code>, il existe presque toujours plus élégant. <code>enumerate</code> quand tu veux l'indice, <code>zip</code> quand tu parcours deux listes ensemble, et la boucle simple le reste du temps.</div></div>
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
<p>Une <strong>lambda</strong> est une fonction écrite en une seule expression, sans nom. On l'utilise quand une fonction est si courte que lui donner un nom serait excessif.</p>

<pre class="bloc-code"># Une fonction ordinaire
def doubler(x):
    return x * 2

# La même en lambda
doubler = lambda x: x * 2

print(doubler(5))    # 10</pre>
<p>La syntaxe : <code>lambda paramètres: expression</code>. Pas de <code>return</code> — le résultat de l'expression est renvoyé automatiquement. Et pas de bloc : une lambda tient forcément sur une ligne.</p>

<h2>Où elles servent vraiment : en argument</h2>
<pre class="bloc-code">contacts = [{"nom": "Zoé", "age": 30}, {"nom": "Alex", "age": 25}]

# trier par âge
par_age = sorted(contacts, key=lambda c: c["age"])
print(par_age[0]["nom"])    # Alex</pre>
<p>Le paramètre <code>key</code> de <code>sorted</code> attend une fonction qui dit « sur quoi trier ». Écrire une <code>def</code> de trois lignes pour ça serait disproportionné.</p>

<h2>map et filter</h2>
<pre class="bloc-code">nombres = [1, 2, 3, 4]

print(list(map(lambda x: x * x, nombres)))          # [1, 4, 9, 16]
print(list(filter(lambda x: x % 2 == 0, nombres)))  # [2, 4]</pre>
<ul>
<li><code>map</code> applique une fonction à <strong>chaque</strong> élément (comme le <code>.map()</code> de JavaScript) ;</li>
<li><code>filter</code> ne garde que ceux qui passent le test.</li>
</ul>
<p>Le <code>list(...)</code> autour est nécessaire : ces fonctions renvoient un objet paresseux, qui ne calcule que si on le lui demande.</p>

<div class="astuce"><div>En pratique, les Pythonistes préfèrent souvent la compréhension de liste : <code>[x*x for x in nombres]</code> se lit mieux que le <code>map</code> équivalent. Mais <code>lambda</code> reste indispensable pour <code>key=</code> dans les tris — c'est là que tu la rencontreras le plus.</div></div>
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
<h2>Les valeurs par défaut</h2>
<pre class="bloc-code">def saluer(nom, salutation="Bonjour"):
    return salutation + " " + nom

print(saluer("Alex"))               # Bonjour Alex
print(saluer("Alex", "Salut"))      # Salut Alex</pre>
<p>Un paramètre avec une valeur par défaut devient facultatif. Règle : les paramètres avec défaut se placent <strong>toujours après</strong> ceux qui n'en ont pas.</p>

<h2>Nommer les arguments à l'appel</h2>
<pre class="bloc-code">def creer(nom, age, ville):
    return nom + ", " + str(age) + " ans, " + ville

print(creer(nom="Alex", ville="Lyon", age=30))   # l'ordre n'importe plus</pre>
<p>Quand une fonction a beaucoup de paramètres, nommer les arguments rend l'appel bien plus lisible — et immunise contre les erreurs d'ordre.</p>

<h2>*args : un nombre libre d'arguments</h2>
<pre class="bloc-code">def somme(*nombres):
    total = 0
    for n in nombres:
        total += n
    return total

print(somme(1, 2))          # 3
print(somme(1, 2, 3, 4))    # 10</pre>
<p>L'étoile signifie « rassemble tous les arguments restants dans un tuple nommé <code>nombres</code> ». C'est exactement ce qui permet à <code>print()</code> d'accepter autant de valeurs qu'on veut.</p>

<div class="attention"><div>Piège célèbre : ne mets <strong>jamais</strong> une liste ou un dictionnaire comme valeur par défaut (<code>def f(items=[])</code>). Cette liste est créée une seule fois et partagée entre tous les appels : elle se remplit d'un appel à l'autre. La bonne pratique est <code>def f(items=None)</code>, puis créer la liste à l'intérieur.</div></div>
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
<p>Tu as vu l'héritage en Java. Python le propose aussi, en plus léger.</p>

<pre class="bloc-code">class Animal:
    def __init__(self, nom):
        self.nom = nom

    def crier(self):
        return "..."

class Chien(Animal):              # entre parenthèses : la classe parente
    def crier(self):              # on redéfinit la méthode
        return self.nom + " fait Ouaf !"

rex = Chien("Rex")
print(rex.crier())     # Rex fait Ouaf !
print(rex.nom)         # Rex — hérité d'Animal</pre>

<p><code>Chien</code> reçoit tout ce que possède <code>Animal</code>, y compris le constructeur. Comme <code>Chien</code> n'en définit pas, celui du parent est utilisé automatiquement.</p>

<h2>super() : compléter le parent au lieu de le remplacer</h2>
<pre class="bloc-code">class Chat(Animal):
    def __init__(self, nom, couleur):
        super().__init__(nom)      # le parent range le nom
        self.couleur = couleur     # on ajoute notre propre attribut</pre>

<h2>__str__ : décider comment l'objet s'affiche</h2>
<pre class="bloc-code">class Animal:
    def __init__(self, nom):
        self.nom = nom

    def __str__(self):
        return "Animal nommé " + self.nom

a = Animal("Rex")
print(a)      # Animal nommé Rex</pre>
<p>Sans <code>__str__</code>, <code>print(a)</code> afficherait quelque chose comme <code>&lt;__main__.Animal object at 0x...&gt;</code> — techniquement exact, mais illisible. C'est l'équivalent exact du <code>toString()</code> de Java.</p>

<div class="info"><div>Les méthodes entourées de doubles tirets bas (<code>__init__</code>, <code>__str__</code>) sont appelées « méthodes spéciales ». Python les appelle tout seul au bon moment : à la création de l'objet, à l'affichage, à la comparaison… Elles permettent à tes classes de se comporter comme les types intégrés.</div></div>
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
<p>Imagine une fonction qui doit renvoyer un million de nombres. Avec une liste, il faut d'abord tout construire en mémoire — et attendre. Un <strong>générateur</strong> les produit <strong>un par un, à la demande</strong>.</p>

<pre class="bloc-code">def compter(n):
    i = 1
    while i <= n:
        yield i          # yield, pas return !
        i += 1

for x in compter(3):
    print(x)             # 1, 2, 3</pre>

<h2>Ce que change yield</h2>
<p><code>return</code> termine la fonction définitivement. <code>yield</code>, lui, <strong>met la fonction en pause</strong> : elle renvoie une valeur, garde sa place, et reprend exactement là où elle s'était arrêtée au tour suivant.</p>
<p>Conséquence : à aucun moment la totalité des valeurs n'existe en mémoire. Tu peux écrire un générateur infini sans faire exploser ton ordinateur.</p>

<h2>Le comparer à une liste</h2>
<pre class="bloc-code">def carres_liste(n):
    resultat = []
    for i in range(n):
        resultat.append(i * i)
    return resultat          # tout est construit, puis renvoyé

def carres_gen(n):
    for i in range(n):
        yield i * i          # chacun est produit quand on le demande</pre>
<p>Pour 10 valeurs, aucune différence perceptible. Pour 10 millions, la première version sature la mémoire et la seconde n'en utilise presque aucune.</p>

<h2>Le convertir en liste</h2>
<pre class="bloc-code">print(list(compter(4)))     # [1, 2, 3, 4]</pre>

<div class="info"><div>Tu utilises déjà des générateurs sans le savoir : <code>range(1000000)</code> ne fabrique pas un million de nombres, il les produit au fur et à mesure. C'est pour ça qu'il est instantané.</div></div>
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
<p>Manipuler des dates est l'un des besoins les plus fréquents — et l'une des sources de bugs les plus classiques (mois à 30 ou 31 jours, années bissextiles, fuseaux horaires). Python fournit un module dédié : <code>datetime</code>.</p>

<pre class="bloc-code">import datetime

d = datetime.date(2024, 7, 14)      # année, mois, jour
print(d)                            # 2024-07-14
print(d.year, d.month, d.day)       # 2024 7 14

aujourdhui = datetime.date.today()</pre>

<h2>Calculer entre deux dates</h2>
<pre class="bloc-code">debut = datetime.date(2024, 1, 1)
fin = datetime.date(2024, 3, 1)

ecart = fin - debut
print(ecart.days)      # 60</pre>
<p>Soustraire deux dates donne une <strong>durée</strong>, dont <code>.days</code> extrait le nombre de jours. Python gère seul les mois de longueurs différentes et les années bissextiles — c'est précisément pour ça qu'on n'écrit jamais ce calcul à la main.</p>

<h2>Afficher une date au format français</h2>
<pre class="bloc-code">d = datetime.date(2024, 7, 14)
print(d.strftime("%d/%m/%Y"))     # 14/07/2024</pre>
<table class="memo-table">
<tr><th>Code</th><th>Signifie</th></tr>
<tr><td>%d</td><td>le jour sur 2 chiffres</td></tr>
<tr><td>%m</td><td>le mois sur 2 chiffres</td></tr>
<tr><td>%Y</td><td>l'année sur 4 chiffres</td></tr>
</table>

<div class="attention"><div>Ne stocke jamais une date sous forme de texte (<code>"14/07/2024"</code>). Tu ne pourras ni la comparer, ni calculer avec, et le tri sera alphabétique — plaçant le 02/01 avant le 14/07 mais aussi avant le 01/12. Toujours un vrai type date.</div></div>
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
