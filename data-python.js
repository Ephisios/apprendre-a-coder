/* ===== Module : Python — Un nouveau langage ===== */
window.DATA_PYTHON = [

/* ---------- py-1 : Bonjour Python ---------- */
{
  id: 'py-1',
  titre: 'Bonjour Python !',
  contenu: `
<p>Jusqu'ici tu as appris le trio du web : HTML, CSS et JavaScript. <strong>Python</strong>, lui, vit en dehors du navigateur : c'est le langage des scripts, de l'analyse de données, de l'intelligence artificielle, de l'automatisation… C'est aussi le langage le plus recommandé pour débuter, parce qu'il s'écrit presque comme on pense.</p>

<h2>Ta première ligne de Python</h2>
<pre class="bloc-code">print("Bonjour tout le monde !")</pre>
<p>C'est tout. <code>print(...)</code> affiche ce qu'on lui donne — c'est l'équivalent du <code>console.log(...)</code> de JavaScript, mais en plus court. Le texte va entre guillemets, doubles <code>"..."</code> ou simples <code>'...'</code>.</p>

<h2>Les commentaires</h2>
<p>En Python, une ligne qui commence par <code>#</code> est un <strong>commentaire</strong> : Python l'ignore complètement. C'est l'équivalent du <code>//</code> de JavaScript.</p>
<pre class="bloc-code"># Ceci est une note pour les humains
print("Ceci s'affiche")  # on peut aussi commenter en fin de ligne</pre>

<div class="info"><div><strong>Comment Python tourne dans ce logiciel ?</strong> Un interpréteur Python est embarqué directement dans l'application (il s'appelle Skulpt). Il couvre tout ce dont tu as besoin pour apprendre les bases. Quand tu voudras aller plus loin, tu installeras le « vrai » Python depuis python.org — tout ce que tu apprends ici fonctionnera pareil.</div></div>

<div class="astuce"><div>Remarque ce qui a <em>disparu</em> par rapport à JavaScript : pas de <code>;</code> en fin de ligne, pas d'accolades. Python mise tout sur la simplicité visuelle.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'À toi : affiche exactement <code>Bonjour Python !</code> avec <code>print()</code>.',
      codeDepart: '# Écris ta première ligne de Python ici :\n',
      indice: 'La recette : <code>print("ton texte entre guillemets")</code> — vérifie la majuscule au B, l\'espace avant le !',
      solution: 'print("Bonjour Python !")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/print\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise la fonction <code>print(...)</code> pour afficher.' };
        if (!ctx.logs.join('\n').includes('Bonjour Python !')) return { ok: false, message: 'Je ne vois pas exactement « Bonjour Python ! ». Vérifie la majuscule, l\'espace et le point d\'exclamation — et que le texte est bien entre guillemets.' };
        return { ok: true, message: 'Et voilà ta première ligne de Python. Deux langages à ton actif !' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> affiche trois lignes à la suite, avec trois <code>print()</code> : ton prénom, ta ville, et une chose que tu aimes.',
      codeDepart: '# Trois print, trois lignes :\n',
      indice: 'Chaque <code>print()</code> affiche sur sa propre ligne. Trois print = trois lignes.',
      solution: 'print("Alex")\nprint("Lyon")\nprint("le cinéma")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const nb = (ctx.code.match(/print\s*\(/g) || []).length;
        if (nb < 3) return { ok: false, message: 'Il me faut trois <code>print()</code> — j\'en compte ' + nb + '.' };
        if (ctx.logs.filter(l => l.trim() !== '').length < 3) return { ok: false, message: 'Je ne vois pas trois lignes affichées. Chaque print doit contenir du texte entre guillemets.' };
        return { ok: true, message: 'Trois lignes, trois print — tu as compris le principe.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'À quoi sert le <code>#</code> en Python ?',
      choix: [
        'À écrire un commentaire que Python ignore',
        'À afficher un hashtag à l\'écran',
        'À créer un titre, comme le h1 du HTML',
        'À terminer une ligne, comme le ; de JavaScript'
      ],
      bonne: 0,
      explication: 'Tout ce qui suit un # sur une ligne est ignoré par Python. C\'est l\'équivalent du // de JavaScript.',
      aides: [
        null,
        'Pour afficher un # à l\'écran, il faudrait le mettre entre guillemets dans un print. Seul, il commence un commentaire.',
        'Les titres, c\'était le HTML ! Ici le # sert à écrire des notes que Python n\'exécute pas.',
        'Python n\'a justement pas besoin de ; en fin de ligne. Le # sert à autre chose : les commentaires.'
      ]
    }
  ]
},

/* ---------- py-2 : Les variables ---------- */
{
  id: 'py-2',
  titre: 'Les variables, version Python',
  contenu: `
<p>Tu connais déjà les variables grâce à JavaScript. En Python, c'est encore plus simple : <strong>pas de <code>let</code>, pas de <code>const</code></strong>. On écrit le nom, le signe égal, la valeur — terminé.</p>
<pre class="bloc-code">prenom = "Nadia"
age = 32
taille = 1.68</pre>

<h2>Les types de base</h2>
<ul>
<li><code>"Nadia"</code> — du texte, appelé <strong>str</strong> (string, comme en JS) ;</li>
<li><code>32</code> — un nombre entier, appelé <strong>int</strong> ;</li>
<li><code>1.68</code> — un nombre à virgule, appelé <strong>float</strong> (le point remplace la virgule) ;</li>
<li><code>True</code> / <code>False</code> — vrai ou faux, avec une majuscule (différence avec JS !).</li>
</ul>

<h2>Afficher plusieurs choses à la fois</h2>
<p><code>print()</code> accepte plusieurs valeurs séparées par des virgules, et met tout seul des espaces entre elles :</p>
<pre class="bloc-code">prenom = "Nadia"
age = 32
print("Je m'appelle", prenom, "et j'ai", age, "ans")
# → Je m'appelle Nadia et j'ai 32 ans</pre>
<p>Pratique : pas besoin de coller les morceaux avec des <code>+</code> comme en JavaScript (le <code>+</code> existe aussi, mais il refuse de mélanger texte et nombre sans conversion).</p>

<div class="attention"><div>Le nom d'une variable s'écrit sans espaces ni accents : <code>mon_age</code> ✔, <code>mon âge</code> ✘. Python utilise le tiret bas <code>_</code> là où JavaScript préférait <code>monAge</code>.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Crée une variable <code>prenom</code> avec ton prénom et une variable <code>age</code> avec un nombre, puis affiche une phrase qui utilise <strong>les deux variables</strong> dans un seul <code>print()</code> (avec des virgules).',
      codeDepart: '# Deux variables, un print :\n',
      indice: '<code>prenom = "..."</code> puis <code>age = ...</code> puis <code>print("Je m\'appelle", prenom, "et j\'ai", age, "ans")</code>',
      solution: 'prenom = "Alex"\nage = 25\nprint("Je m\'appelle", prenom, "et j\'ai", age, "ans")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\bprenom\s*=/.test(ctx.code)) return { ok: false, message: 'Je ne trouve pas la variable <code>prenom</code>. On la crée avec <code>prenom = "..."</code>' };
        if (!/\bage\s*=/.test(ctx.code)) return { ok: false, message: 'Il manque la variable <code>age</code> (un nombre, sans guillemets).' };
        if (!/print\s*\([^)]*prenom[^)]*\)/.test(ctx.code) || !/print\s*\([^)]*age[^)]*\)/.test(ctx.code)) return { ok: false, message: 'Ton <code>print()</code> doit utiliser les deux variables <code>prenom</code> et <code>age</code> (leurs noms, sans guillemets), séparées par des virgules.' };
        if (ctx.logs.filter(l => l.trim() !== '').length < 1) return { ok: false, message: 'Rien ne s\'affiche — vérifie ton print.' };
        return { ok: true, message: 'Les virgules dans print, c\'est le confort Python : espaces automatiques, et aucun souci pour mélanger texte et nombres.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi (déjà vu en JS !) :</strong> échange le contenu des variables <code>a</code> et <code>b</code>, pour que le premier print affiche 2 et le second 1. Bonus : Python a une astuce magique pour ça, cherche « échanger deux variables python » dans ta mémoire… ou utilise une variable temporaire comme en JS.',
      codeDepart: 'a = 1\nb = 2\n\n# échange les valeurs ici...\n\nprint(a)\nprint(b)',
      indice: 'La méthode classique : <code>temp = a</code> puis <code>a = b</code> puis <code>b = temp</code>. La méthode 100 % Python : <code>a, b = b, a</code> — une seule ligne !',
      solution: 'a = 1\nb = 2\n\na, b = b, a\n\nprint(a)\nprint(b)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/print\s*\(\s*a\s*\)/.test(ctx.code) || !/print\s*\(\s*b\s*\)/.test(ctx.code)) return { ok: false, message: 'Garde les deux print du code de départ : <code>print(a)</code> puis <code>print(b)</code>.' };
        const lignes = ctx.logs.filter(l => l.trim() !== '');
        if (lignes[0] !== '2' || lignes[1] !== '1') return { ok: false, message: 'Le but : que <code>a</code> vaille 2 et <code>b</code> vaille 1 au moment des print. Attention au piège : si tu fais <code>a = b</code> en premier, la valeur de départ de a est perdue !' };
        return { ok: true, message: 'Si tu as utilisé <code>a, b = b, a</code>, tu viens de découvrir pourquoi les développeurs adorent Python.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Quelle est la différence entre <code>3</code> et <code>"3"</code> en Python ?',
      choix: [
        '3 est un nombre (int), "3" est du texte (str)',
        'Aucune, Python convertit tout seul',
        '"3" est plus précis que 3',
        '3 est une variable, "3" est une valeur'
      ],
      bonne: 0,
      explication: 'Avec des guillemets c\'est du texte, sans c\'est un nombre. 3 + 3 donne 6, mais "3" + "3" donne "33" — et 3 + "3" provoque une erreur en Python (contrairement à JavaScript, qui bricolait une réponse).',
      aides: [
        null,
        'Justement non — et c\'est une différence avec JavaScript : Python refuse de mélanger nombre et texte sans conversion explicite. 3 + "3" déclenche une erreur.',
        'La précision n\'a rien à voir : les guillemets changent la nature de la valeur, nombre ou texte.',
        'Une variable, c\'est un nom qu\'on invente. 3 et "3" sont deux valeurs : un nombre et un texte.'
      ]
    }
  ]
},

/* ---------- py-3 : Calculer ---------- */
{
  id: 'py-3',
  titre: 'Python, la calculatrice ultime',
  contenu: `
<p>Python est né pour calculer — c'est même l'un de ses usages principaux dans la vraie vie (finance, science, statistiques). Les opérateurs de base sont les mêmes qu'en JavaScript :</p>
<pre class="bloc-code">print(7 + 3)    # 10 — addition
print(7 - 3)    # 4  — soustraction
print(7 * 3)    # 21 — multiplication
print(7 / 2)    # 3.5 — division (toujours à virgule)</pre>

<h2>Les trois opérateurs bonus</h2>
<pre class="bloc-code">print(17 // 5)  # 3  — division ENTIÈRE : combien de fois 5 rentre dans 17
print(17 % 5)   # 2  — MODULO : ce qu'il reste après la division
print(2 ** 10)  # 1024 — PUISSANCE : 2 multiplié par lui-même 10 fois</pre>
<p>Tu connais déjà le modulo <code>%</code> depuis JavaScript (pair/impair !). Les deux nouveaux : <code>//</code> pour la division sans virgule, et <code>**</code> pour la puissance.</p>

<h2>La priorité des opérations</h2>
<p>Comme en maths : les multiplications avant les additions, et les parenthèses pour forcer l'ordre.</p>
<pre class="bloc-code">print(2 + 3 * 4)    # 14, pas 20
print((2 + 3) * 4)  # 20</pre>

<div class="astuce"><div>Exemple concret du duo <code>//</code> et <code>%</code> : 17 bonbons à partager entre 5 enfants → <code>17 // 5</code> = 3 bonbons chacun, et <code>17 % 5</code> = 2 bonbons restants pour toi.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Combien y a-t-il d\'heures dans une semaine ? Fais calculer Python : affiche le résultat de <code>7 * 24</code> (le calcul, pas le résultat écrit à la main !).',
      codeDepart: '# Le calcul, pas la réponse toute faite :\n',
      indice: '<code>print(7 * 24)</code> — Python calcule, toi tu écris le calcul.',
      solution: 'print(7 * 24)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\*/.test(ctx.code)) return { ok: false, message: 'Écris le calcul avec l\'opérateur <code>*</code> — c\'est Python qui doit calculer, pas toi.' };
        if (!ctx.logs.some(l => l.trim() === '168')) return { ok: false, message: 'Je devrais voir 168 s\'afficher (7 jours × 24 heures).' };
        return { ok: true, message: '168 heures par semaine. Python ne se trompe jamais en calcul mental.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> les puissances de 2 sont partout en informatique (les octets, les Go…). Affiche <code>2 ** 10</code> — la fameuse valeur du « kilo » informatique.',
      codeDepart: '# 2 puissance 10 :\n',
      indice: 'L\'opérateur puissance, c\'est deux étoiles collées : <code>**</code>',
      solution: 'print(2 ** 10)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\*\*/.test(ctx.code)) return { ok: false, message: 'Utilise l\'opérateur puissance <code>**</code> (deux étoiles).' };
        if (!ctx.logs.some(l => l.trim() === '1024')) return { ok: false, message: 'Le résultat attendu est 1024 — vérifie ton calcul : <code>2 ** 10</code>.' };
        return { ok: true, message: '1024, et pas 1000 : voilà pourquoi ton disque « 1 To » affiche 931 Go. Mystère résolu.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi des bonbons :</strong> 17 bonbons, 5 enfants. Affiche sur une première ligne combien de bonbons reçoit chaque enfant (division entière), et sur une seconde combien il en reste (modulo).',
      codeDepart: 'bonbons = 17\nenfants = 5\n\n# Ligne 1 : la part de chacun\n# Ligne 2 : le reste\n',
      indice: '<code>print(bonbons // enfants)</code> puis <code>print(bonbons % enfants)</code>',
      solution: 'bonbons = 17\nenfants = 5\n\nprint(bonbons // enfants)\nprint(bonbons % enfants)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\/\//.test(ctx.code)) return { ok: false, message: 'Utilise la division entière <code>//</code> pour la part de chaque enfant.' };
        if (!/%/.test(ctx.code)) return { ok: false, message: 'Utilise le modulo <code>%</code> pour le reste.' };
        const lignes = ctx.logs.filter(l => l.trim() !== '');
        if (lignes[0] !== '3' || lignes[1] !== '2') return { ok: false, message: 'Attendu : 3 (part de chacun) puis 2 (le reste). Vérifie l\'ordre de tes deux print.' };
        return { ok: true, message: '3 bonbons chacun, 2 pour l\'organisateur. Le duo // et % sert sans arrêt : convertir des minutes en heures, répartir des équipes, paginer des listes…' };
      }
    }
  ]
},

/* ---------- py-4 : Conditions et indentation ---------- */
{
  id: 'py-4',
  titre: 'Les conditions — et LA règle de Python',
  contenu: `
<p>Le <code>if</code> existe aussi en Python, mais avec une différence fondamentale qu'il faut comprendre tout de suite. Compare :</p>
<pre class="bloc-code"># JavaScript : les accolades délimitent le bloc
if (age >= 18) {
  console.log("Majeur");
}

# Python : PAS d'accolades, pas de parenthèses obligatoires
if age >= 18:
    print("Majeur")</pre>

<h2>L'indentation n'est pas décorative</h2>
<p>En JavaScript, indenter (décaler le code vers la droite) rendait le code lisible, mais restait optionnel. <strong>En Python, l'indentation EST la structure</strong> : le <code>:</code> en fin de ligne annonce un bloc, et tout ce qui est décalé de 4 espaces en dessous appartient à ce bloc. Pas de décalage = erreur.</p>
<pre class="bloc-code">note = 15

if note >= 10:
    print("Reçu !")           # ← dans le if (décalé)
    print("Félicitations")    # ← dans le if aussi
print("Fin du programme")     # ← PAS dans le if (pas décalé)</pre>

<h2>else et elif</h2>
<pre class="bloc-code">if note >= 16:
    print("Mention très bien")
elif note >= 12:
    print("Mention assez bien")
elif note >= 10:
    print("Reçu")
else:
    print("Recalé")</pre>
<p><code>elif</code> est la contraction de « else if » — le <code>else if</code> de JavaScript. Les comparaisons sont identiques : <code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Et pour combiner : <code>and</code> et <code>or</code>, en toutes lettres (au lieu de <code>&amp;&amp;</code> et <code>||</code>).</p>

<div class="attention"><div>L'oubli le plus courant en Python : le <strong><code>:</code></strong> à la fin de la ligne du if. Le second : oublier de décaler la ligne d'en dessous. Tu vas faire ces deux erreurs — c'est normal, et le message d'erreur te le dira.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'La note est de 15. Écris un <code>if</code>/<code>else</code> : si <code>note >= 10</code>, affiche <code>Reçu !</code>, sinon affiche <code>Recalé</code>. Attention au <code>:</code> et à l\'indentation !',
      codeDepart: 'note = 15\n\n# ton if / else ici :\n',
      indice: 'La structure :<br><code>if note >= 10:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Reçu !")</code><br><code>else:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;print("Recalé")</code>',
      solution: 'note = 15\n\nif note >= 10:\n    print("Reçu !")\nelse:\n    print("Recalé")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur + (/indent/i.test(ctx.erreur) ? ' — décale la ligne sous le if avec 4 espaces (ou la touche Tab).' : '') };
        if (!/if\s+[^\n]*:/.test(ctx.code)) return { ok: false, message: 'Il me faut un <code>if</code> qui se termine par <code>:</code> — par exemple <code>if note >= 10:</code>' };
        if (!/else\s*:/.test(ctx.code)) return { ok: false, message: 'Ajoute le cas contraire avec <code>else:</code> (avec son deux-points).' };
        const lignes = ctx.logs.filter(l => l.trim() !== '');
        if (!lignes.some(l => l.includes('Reçu'))) return { ok: false, message: 'Avec note = 15, on devrait voir « Reçu ! ». Vérifie ta condition : <code>note >= 10</code>.' };
        if (lignes.some(l => l.includes('Recalé'))) return { ok: false, message: 'Les deux messages s\'affichent ! Le print de « Recalé » doit être décalé SOUS le else, pas au niveau du programme.' };
        return { ok: true, message: 'if, deux-points, indentation : tu tiens la grammaire de Python.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Chasse au bug :</strong> ce code plante avec une erreur d\'indentation. Lance-le pour voir le message, puis répare-le.',
      codeDepart: 'temperature = 30\n\nif temperature > 25:\nprint("Il fait chaud !")',
      indice: 'La ligne du print appartient au if : elle doit être décalée de 4 espaces. Place ton curseur devant <code>print</code> et appuie sur Tab.',
      solution: 'temperature = 30\n\nif temperature > 25:\n    print("Il fait chaud !")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Encore une erreur : ' + ctx.erreur + ' — la ligne du print doit être décalée de 4 espaces sous le if.' };
        if (!/if[^\n]*:\s*\n[ \t]+\S/.test(ctx.code)) return { ok: false, message: 'Le print doit être indenté (décalé) sous le if — c\'est ce décalage qui dit à Python « cette ligne fait partie du if ».' };
        if (!ctx.logs.some(l => l.includes('Il fait chaud'))) return { ok: false, message: 'Le message « Il fait chaud ! » devrait s\'afficher (30 > 25). Garde le print du code de départ.' };
        return { ok: true, message: 'IndentationError réparée ! Tu viens de corriger l\'erreur n°1 de tous les débutants Python — tu la reconnaîtras désormais au premier coup d\'œil.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Dans un <code>if</code> / <code>elif</code> / <code>elif</code> / <code>else</code>, combien de blocs peuvent s\'exécuter au maximum ?',
      choix: [
        'Un seul — le premier dont la condition est vraie',
        'Tous ceux dont la condition est vraie',
        'Toujours le if et le else',
        'Ça dépend du nombre de elif'
      ],
      bonne: 0,
      explication: 'Python teste les conditions de haut en bas et exécute LE PREMIER bloc vrai, puis saute tout le reste. Si aucune n\'est vraie, c\'est le else qui s\'exécute (s\'il existe).',
      aides: [
        null,
        'Non — dès qu\'une condition est vraie, Python exécute son bloc et ignore tous les elif/else suivants, même s\'ils auraient été vrais aussi.',
        'Le else ne s\'exécute que si TOUTES les conditions au-dessus sont fausses. Le if et le else ne peuvent jamais s\'exécuter tous les deux.',
        'Peu importe leur nombre : la règle reste « le premier vrai gagne, les autres sont ignorés ».'
      ]
    }
  ]
},

/* ---------- py-5 : Les boucles ---------- */
{
  id: 'py-5',
  titre: 'Les boucles : for, range et while',
  contenu: `
<p>Répéter sans se répéter — tu connais le principe depuis JavaScript. La version Python est plus lisible :</p>
<pre class="bloc-code"># JavaScript
for (let i = 0; i < 5; i++) { console.log(i); }

# Python
for i in range(5):
    print(i)          # affiche 0, 1, 2, 3, 4</pre>

<h2>Apprivoiser range()</h2>
<ul>
<li><code>range(5)</code> → 0, 1, 2, 3, 4 (cinq valeurs, en partant de 0, 5 exclu) ;</li>
<li><code>range(1, 6)</code> → 1, 2, 3, 4, 5 (de 1 inclus à 6 exclu) ;</li>
<li><code>range(0, 20, 5)</code> → 0, 5, 10, 15 (de 5 en 5).</li>
</ul>
<p>La borne de fin est toujours <strong>exclue</strong> — comme la fin d'un <code>&lt;</code> en JavaScript. <code>range(1, 6)</code> se lit « de 1 jusqu'à 6 exclu ».</p>

<h2>while : tant que</h2>
<pre class="bloc-code">compteur = 5
while compteur > 0:
    print(compteur)
    compteur = compteur - 1
print("Partez !")</pre>
<p>Même logique qu'en JS : la boucle continue tant que la condition est vraie. Et même piège : si tu oublies de faire évoluer <code>compteur</code>, la boucle ne s'arrête jamais (le logiciel la coupera au bout de 3 secondes, comme pour JavaScript).</p>

<div class="astuce"><div>Règle de choix identique à JavaScript : nombre de tours connu d'avance → <code>for</code> ; « je continue jusqu'à ce que quelque chose change » → <code>while</code>.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Affiche les nombres de 1 à 5 (inclus) avec une boucle <code>for</code> et <code>range()</code>.',
      codeDepart: '# de 1 à 5, avec range :\n',
      indice: 'La borne de fin est exclue : pour aller jusqu\'à 5, écris <code>range(1, 6)</code>.',
      solution: 'for i in range(1, 6):\n    print(i)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/range\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise <code>range()</code> dans ta boucle for.' };
        const lignes = ctx.logs.filter(l => l.trim() !== '');
        if (lignes.join(',') !== '1,2,3,4,5') return { ok: false, message: 'Attendu : 1, 2, 3, 4, 5 — chacun sur sa ligne. Rappel : <code>range(1, 6)</code>, car la fin est exclue.' };
        return { ok: true, message: 'range(1, 6) pour aller de 1 à 5 : le décalage de la borne de fin ne te piègera plus.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> la table de 7, de <code>7 × 1</code> à <code>7 × 10</code>. Dix lignes, chacune montrant juste le résultat (7, 14, 21…).',
      codeDepart: '# La table de 7 :\n',
      indice: '<code>for i in range(1, 11):</code> puis, indenté, <code>print(7 * i)</code>',
      solution: 'for i in range(1, 11):\n    print(7 * i)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/for\s+\w+\s+in\s+range/.test(ctx.code)) return { ok: false, message: 'Utilise une boucle <code>for ... in range(...)</code> — pas dix print écrits à la main !' };
        const lignes = ctx.logs.filter(l => l.trim() !== '');
        if (lignes.length < 10 || lignes[0] !== '7' || lignes[9] !== '70') return { ok: false, message: 'Attendu : 10 lignes, de 7 à 70. Vérifie <code>range(1, 11)</code> et le calcul <code>7 * i</code>.' };
        return { ok: true, message: 'La même table de 7 qu\'en JavaScript, en deux lignes au lieu de trois. Python aime la concision.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi :</strong> le décompte de fusée, avec un <code>while</code> cette fois : affiche 5, 4, 3, 2, 1 puis <code>Partez !</code>',
      codeDepart: 'compteur = 5\n\n# ton while ici, puis le print final :\n',
      indice: '<code>while compteur > 0:</code> puis, indentés : le print et <code>compteur = compteur - 1</code>. Le print de « Partez ! » vient APRÈS la boucle, sans indentation.',
      solution: 'compteur = 5\n\nwhile compteur > 0:\n    print(compteur)\n    compteur = compteur - 1\n\nprint("Partez !")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/while\s+[^\n]*:/.test(ctx.code)) return { ok: false, message: 'Le défi impose un <code>while</code> (avec son deux-points).' };
        const lignes = ctx.logs.filter(l => l.trim() !== '');
        if (lignes.join(',') !== '5,4,3,2,1,Partez !') return { ok: false, message: 'Attendu : 5, 4, 3, 2, 1 puis « Partez ! ». Si la boucle ne s\'arrête pas : as-tu bien <code>compteur = compteur - 1</code> DANS la boucle (indenté) ? Et « Partez ! » doit être après la boucle (non indenté).' };
        return { ok: true, message: 'Décollage réussi. Tu maîtrises maintenant les boucles dans deux langages différents — et tu as remarqué que la logique est exactement la même.' };
      }
    }
  ]
},

/* ---------- py-6 : Les listes ---------- */
{
  id: 'py-6',
  titre: 'Les listes',
  contenu: `
<p>La liste Python, c'est le tableau JavaScript avec un nom plus naturel. Mêmes crochets, mêmes indices qui commencent à 0 :</p>
<pre class="bloc-code">courses = ["pain", "pommes", "chocolat"]

print(courses[0])      # pain — le premier
print(len(courses))    # 3 — le nombre d'éléments
courses.append("café") # ajoute à la fin</pre>

<h2>Les différences avec JavaScript</h2>
<ul>
<li><code>len(courses)</code> au lieu de <code>courses.length</code> — c'est une fonction, pas une propriété ;</li>
<li><code>append</code> au lieu de <code>push</code> pour ajouter à la fin ;</li>
<li>et le bonus Python : <strong>les indices négatifs</strong>. <code>courses[-1]</code> = le dernier élément, <code>courses[-2]</code> = l'avant-dernier. Fini le <code>courses[courses.length - 1]</code> !</li>
</ul>

<h2>Parcourir une liste</h2>
<p>La boucle <code>for</code> de Python parcourt directement les éléments — encore plus simple que <code>for...of</code> :</p>
<pre class="bloc-code">for produit in courses:
    print("À acheter :", produit)</pre>

<h2>L'accumulateur, version Python</h2>
<pre class="bloc-code">notes = [12, 15, 9, 18]
total = 0
for n in notes:
    total = total + n
print(total)   # 54</pre>
<p>Le même schéma qu'en JavaScript : on part de 0, on ajoute à chaque tour. Ce motif revient partout.</p>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Crée une liste <code>courses</code> avec 3 produits, ajoute-en un 4e avec <code>append()</code>, puis affiche le nombre d\'éléments avec <code>len()</code>.',
      codeDepart: '# Ta liste de courses :\n',
      indice: '<code>courses = ["...", "...", "..."]</code> puis <code>courses.append("...")</code> puis <code>print(len(courses))</code>',
      solution: 'courses = ["pain", "pommes", "chocolat"]\ncourses.append("café")\nprint(len(courses))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\.append\s*\(/.test(ctx.code)) return { ok: false, message: 'Ajoute le 4e produit avec <code>.append("...")</code> — pas en l\'écrivant directement dans la liste.' };
        if (!/len\s*\(/.test(ctx.code)) return { ok: false, message: 'Affiche le compte avec <code>len(...)</code> — la fonction qui mesure une liste.' };
        const lignes = ctx.logs.filter(l => l.trim() !== '');
        if (lignes[lignes.length - 1] !== '4') return { ok: false, message: 'Le compte affiché devrait être 4 : 3 produits au départ + 1 ajouté par append.' };
        return { ok: true, message: 'append pour remplir, len pour compter : les deux gestes de base des listes.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> affiche le premier produit de la liste, puis le dernier — en utilisant l\'indice négatif <code>[-1]</code> pour le dernier (le superpouvoir de Python !).',
      codeDepart: 'courses = ["pain", "pommes", "chocolat"]\n\n# premier puis dernier :\n',
      indice: '<code>print(courses[0])</code> puis <code>print(courses[-1])</code>',
      solution: 'courses = ["pain", "pommes", "chocolat"]\n\nprint(courses[0])\nprint(courses[-1])',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\[\s*-1\s*\]/.test(ctx.code)) return { ok: false, message: 'Utilise l\'indice négatif <code>[-1]</code> pour attraper le dernier élément — c\'est tout l\'intérêt de l\'exercice !' };
        const lignes = ctx.logs.filter(l => l.trim() !== '');
        if (lignes[0] !== 'pain' || lignes[1] !== 'chocolat') return { ok: false, message: 'Attendu : « pain » (indice 0) puis « chocolat » (indice -1).' };
        return { ok: true, message: '[-1] pour le dernier : une fois qu\'on y a goûté, on ne comprend plus pourquoi les autres langages n\'ont pas ça.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi de l\'accumulateur :</strong> calcule le total des notes avec une boucle <code>for</code> (pas de calcul à la main !), puis affiche-le.',
      codeDepart: 'notes = [12, 15, 9, 18]\n\n# total = 0, puis la boucle...\n',
      indice: 'Trois étapes : <code>total = 0</code> · puis <code>for n in notes:</code> · puis, indenté, <code>total = total + n</code>. Et après la boucle : <code>print(total)</code>.',
      solution: 'notes = [12, 15, 9, 18]\n\ntotal = 0\nfor n in notes:\n    total = total + n\n\nprint(total)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/for\s+\w+\s+in\s+notes/.test(ctx.code)) return { ok: false, message: 'Parcours la liste avec <code>for n in notes:</code> — le total doit venir de la boucle.' };
        if (!ctx.logs.some(l => l.trim() === '54')) return { ok: false, message: 'Le total attendu est 54 (12 + 15 + 9 + 18). Pars de <code>total = 0</code> et ajoute chaque note dans la boucle.' };
        return { ok: true, message: 'L\'accumulateur fonctionne dans tous les langages — tu l\'as maintenant fait en JavaScript ET en Python. C\'est un réflexe pour la vie.' };
      }
    }
  ]
},

/* ---------- py-7 : Les fonctions ---------- */
{
  id: 'py-7',
  titre: 'Les fonctions : def',
  contenu: `
<p>Les fonctions Python font exactement le même travail qu'en JavaScript : emballer du code réutilisable. Seul le costume change :</p>
<pre class="bloc-code"># JavaScript
function bonjour(prenom) {
  console.log("Bonjour " + prenom);
}

# Python
def bonjour(prenom):
    print("Bonjour", prenom)

bonjour("Nadia")   # l'appel est identique
bonjour("Karim")</pre>
<p><code>def</code> (pour « define »), le nom, les paramètres entre parenthèses, le <code>:</code> — et le corps indenté, évidemment.</p>

<h2>return : la fonction qui répond</h2>
<pre class="bloc-code">def aire_rectangle(largeur, hauteur):
    return largeur * hauteur

surface = aire_rectangle(4, 5)
print(surface)              # 20
print(aire_rectangle(3, 3)) # 9 — utilisable directement dans un print</pre>
<p>Même distinction cruciale qu'en JavaScript : <code>print</code> <em>montre</em> une valeur à l'écran, <code>return</code> la <em>renvoie</em> au programme pour qu'il puisse s'en servir (la ranger dans une variable, la réutiliser dans un calcul…).</p>

<div class="astuce"><div>Les noms de fonctions Python s'écrivent en <code>minuscules_avec_tirets_bas</code> : <code>aire_rectangle</code>, <code>calculer_age</code>. C'est la convention officielle du langage (elle a même un nom : PEP 8).</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Définis une fonction <code>bonjour(prenom)</code> qui affiche « Bonjour » suivi du prénom, puis appelle-la <strong>deux fois</strong> avec deux prénoms différents.',
      codeDepart: '# def, puis deux appels :\n',
      indice: '<code>def bonjour(prenom):</code> puis, indenté, <code>print("Bonjour", prenom)</code>. Ensuite, sans indentation : <code>bonjour("Nadia")</code> et <code>bonjour("Karim")</code>.',
      solution: 'def bonjour(prenom):\n    print("Bonjour", prenom)\n\nbonjour("Nadia")\nbonjour("Karim")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/def\s+bonjour\s*\(/.test(ctx.code)) return { ok: false, message: 'Définis la fonction avec <code>def bonjour(prenom):</code>' };
        if ((ctx.code.match(/bonjour\s*\(/g) || []).length < 3) return { ok: false, message: 'Je vois la définition, mais il faut aussi APPELER la fonction deux fois : <code>bonjour("...")</code> sur deux lignes.' };
        const lignes = ctx.logs.filter(l => l.trim() !== '');
        if (lignes.length < 2 || !lignes[0].includes('Bonjour') || !lignes[1].includes('Bonjour')) return { ok: false, message: 'Deux appels = deux lignes « Bonjour ... » affichées. Vérifie que le print est bien DANS la fonction (indenté).' };
        if (lignes[0] === lignes[1]) return { ok: false, message: 'Utilise deux prénoms différents pour tes deux appels — c\'est ça qui prouve que le paramètre fonctionne !' };
        return { ok: true, message: 'Une définition, deux appels, deux résultats différents : c\'est exactement à ça que servent les paramètres.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> écris une fonction <code>aire_rectangle(largeur, hauteur)</code> qui <code>return</code> le produit des deux, puis affiche <code>aire_rectangle(4, 5)</code>.',
      codeDepart: '# une fonction qui RENVOIE (return) :\n',
      indice: 'Dans la fonction : <code>return largeur * hauteur</code>. À l\'extérieur : <code>print(aire_rectangle(4, 5))</code>.',
      solution: 'def aire_rectangle(largeur, hauteur):\n    return largeur * hauteur\n\nprint(aire_rectangle(4, 5))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/def\s+aire_rectangle\s*\(/.test(ctx.code)) return { ok: false, message: 'Définis <code>def aire_rectangle(largeur, hauteur):</code>' };
        if (!/return/.test(ctx.code)) return { ok: false, message: 'La fonction doit utiliser <code>return</code> — c\'est le cœur de l\'exercice. Le print se fait à l\'extérieur.' };
        if (!ctx.logs.some(l => l.trim() === '20')) return { ok: false, message: 'On attend 20 à l\'écran (4 × 5). Affiche le résultat avec <code>print(aire_rectangle(4, 5))</code>.' };
        return { ok: true, message: 'return renvoie la valeur, print l\'affiche : cette séparation des rôles, tu la connaissais déjà en JavaScript. Elle est universelle.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Quelle est la différence entre <code>return</code> et <code>print</code> dans une fonction ?',
      choix: [
        'return renvoie la valeur au programme, print l\'affiche juste à l\'écran',
        'C\'est pareil, return est juste plus moderne',
        'print est plus puissant : il renvoie ET affiche',
        'return n\'existe que dans les longues fonctions'
      ],
      bonne: 0,
      explication: 'Avec return, le programme peut RÉCUPÉRER le résultat : le ranger dans une variable, le passer à une autre fonction, l\'additionner… print se contente de le montrer à l\'humain, puis la valeur est perdue.',
      aides: [
        null,
        'Pas du tout pareil : essaie <code>x = bonjour("test")</code> avec une fonction qui ne fait que print — x sera vide (None). Avec return, x contiendrait la valeur.',
        'C\'est l\'inverse : print affiche mais ne renvoie rien d\'utilisable. return renvoie sans rien afficher.',
        'return s\'utilise dans toutes les fonctions qui produisent un résultat, même en une seule ligne.'
      ]
    }
  ]
},

/* ---------- py-8 : Les dictionnaires ---------- */
{
  id: 'py-8',
  titre: 'Les dictionnaires',
  contenu: `
<p>Le dictionnaire Python, c'est l'objet JavaScript : des paires clé → valeur pour décrire une chose. La syntaxe est quasi identique — seule différence visible, les guillemets obligatoires autour des clés :</p>
<pre class="bloc-code">contact = {
    "nom": "Nadia Benali",
    "ville": "Lyon",
    "age": 32
}

print(contact["ville"])       # Lyon — accès par crochets
contact["email"] = "n@mail.fr"  # ajout d'une nouvelle clé
contact["age"] = 33             # modification
print(len(contact))             # 4 — len marche aussi ici !</pre>

<h2>Attention à la clé inconnue</h2>
<p>Demander une clé qui n'existe pas provoque une erreur nette : <code>KeyError</code>. C'est différent de JavaScript, qui répondait <code>undefined</code> sans broncher. Python préfère t'arrêter tout de suite — tu sauras exactement où est le problème.</p>

<h2>Parcourir un dictionnaire</h2>
<pre class="bloc-code">for cle in contact:
    print(cle, ":", contact[cle])
# nom : Nadia Benali
# ville : Lyon
# ...</pre>

<div class="info"><div>Liste ou dictionnaire ? Même règle qu'en JavaScript : une <strong>collection</strong> d'éléments semblables → liste. La <strong>description</strong> d'une chose avec ses caractéristiques → dictionnaire. Et le vrai monde combine les deux : une liste de dictionnaires, c'est un carnet de contacts.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Voici un contact. Affiche sa ville en allant la chercher dans le dictionnaire (pas en la réécrivant à la main !).',
      codeDepart: 'contact = {\n    "nom": "Nadia Benali",\n    "ville": "Lyon",\n    "age": 32\n}\n\n# affiche la ville :\n',
      indice: 'L\'accès par clé : <code>contact["ville"]</code> — la clé entre guillemets, dans des crochets.',
      solution: 'contact = {\n    "nom": "Nadia Benali",\n    "ville": "Lyon",\n    "age": 32\n}\n\nprint(contact["ville"])',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/contact\s*\[\s*["']ville["']\s*\]/.test(ctx.code)) return { ok: false, message: 'Va chercher la valeur dans le dictionnaire : <code>contact["ville"]</code>' };
        if (!ctx.logs.some(l => l.trim() === 'Lyon')) return { ok: false, message: '« Lyon » devrait s\'afficher. Vérifie ton print.' };
        return { ok: true, message: 'La clé entre crochets — comme en JavaScript avec la notation crochets. Tu es en terrain connu.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> ajoute une clé <code>"email"</code> au contact (avec l\'adresse de ton choix), puis affiche le nombre de clés du dictionnaire avec <code>len()</code>.',
      codeDepart: 'contact = {\n    "nom": "Nadia Benali",\n    "ville": "Lyon",\n    "age": 32\n}\n\n# ajoute l\'email, puis compte :\n',
      indice: '<code>contact["email"] = "..."</code> puis <code>print(len(contact))</code>',
      solution: 'contact = {\n    "nom": "Nadia Benali",\n    "ville": "Lyon",\n    "age": 32\n}\n\ncontact["email"] = "nadia@mail.fr"\nprint(len(contact))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/contact\s*\[\s*["']email["']\s*\]\s*=/.test(ctx.code)) return { ok: false, message: 'Ajoute la clé avec <code>contact["email"] = "..."</code> — une affectation, comme pour une variable.' };
        if (!ctx.logs.some(l => l.trim() === '4')) return { ok: false, message: 'len(contact) devrait afficher 4 : les 3 clés de départ + email.' };
        return { ok: true, message: 'Un dictionnaire s\'enrichit à la volée : on affecte une nouvelle clé, elle existe. len() compte les clés, comme il comptait les éléments d\'une liste.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Que se passe-t-il si tu demandes <code>contact["telephone"]</code> alors que cette clé n\'existe pas ?',
      choix: [
        'Python s\'arrête avec une erreur KeyError',
        'Python répond None et continue',
        'Python répond undefined, comme JavaScript',
        'Python crée la clé automatiquement, vide'
      ],
      bonne: 0,
      explication: 'KeyError: \'telephone\' — Python refuse de deviner et s\'arrête net. C\'est plus strict que JavaScript (qui répondait undefined), et c\'est voulu : l\'erreur se voit immédiatement, au bon endroit.',
      aides: [
        null,
        'None existe en Python (c\'est son null), mais un accès par crochets sur une clé absente ne le renvoie pas : il déclenche KeyError.',
        'undefined n\'existe pas en Python ! C\'était justement un comportement de JavaScript. Python préfère lever une erreur claire.',
        'La création automatique n\'arrive que lors d\'une AFFECTATION (contact["telephone"] = ...). En lecture, clé absente = KeyError.'
      ]
    }
  ]
},

/* ---------- py-9 : Mini-projet ---------- */
{
  id: 'py-9',
  titre: 'Mini-projet : l\'analyseur de notes',
  contenu: `
<p>Dernier exercice du module : un vrai petit programme qui combine tout — liste, boucle, condition, calcul. C'est exactement le genre de script qu'on écrit en Python dans la vraie vie (analyser des ventes, des mesures, des résultats…).</p>

<h2>La mission</h2>
<p>Un professeur a saisi les notes de sa classe :</p>
<pre class="bloc-code">notes = [12, 15, 9, 18]</pre>
<p>Ton programme va calculer, en trois étapes : la <strong>moyenne</strong>, la <strong>meilleure note</strong>, et le <strong>nombre d'élèves reçus</strong> (note ≥ 10).</p>

<h2>Les outils dont tu disposes</h2>
<ul>
<li>l'accumulateur (vu en py-6) pour totaliser ;</li>
<li><code>len(notes)</code> pour compter les élèves ;</li>
<li>une variable « record » qu'on met à jour dans une boucle avec un <code>if</code> ;</li>
<li>un compteur qu'on incrémente sous condition.</li>
</ul>

<div class="astuce"><div>Python a des fonctions toutes prêtes pour certaines de ces missions (<code>sum()</code>, <code>max()</code>)… mais l'exercice te demande de les construire toi-même : c'est en fabriquant l'outil une fois qu'on comprend ce qu'il fait. Après, tu auras le droit aux raccourcis pour toujours.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: '<strong>Étape 1 — la moyenne :</strong> totalise les notes avec une boucle, divise par le nombre d\'élèves (<code>len</code>), affiche le résultat.',
      codeDepart: 'notes = [12, 15, 9, 18]\n\n# total, puis moyenne :\n',
      indice: 'L\'accumulateur : <code>total = 0</code>, boucle <code>for n in notes:</code>, <code>total = total + n</code>. Puis <code>moyenne = total / len(notes)</code> et un print.',
      solution: 'notes = [12, 15, 9, 18]\n\ntotal = 0\nfor n in notes:\n    total = total + n\n\nmoyenne = total / len(notes)\nprint(moyenne)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/for\s+\w+\s+in\s+notes/.test(ctx.code)) return { ok: false, message: 'Totalise avec une boucle <code>for n in notes:</code> — pas d\'addition à la main.' };
        if (!/len\s*\(/.test(ctx.code)) return { ok: false, message: 'Divise par <code>len(notes)</code> — comme ça, ton programme marchera quel que soit le nombre d\'élèves.' };
        if (!ctx.logs.some(l => l.trim() === '13.5')) return { ok: false, message: 'La moyenne attendue est 13.5 (54 ÷ 4). Vérifie le total, puis la division.' };
        return { ok: true, message: '13.5 de moyenne. Remarque : ton programme marcherait à l\'identique avec 40 000 notes — c\'est ça, la puissance d\'un script.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Étape 2 — la meilleure note</strong>, sans utiliser <code>max()</code> : pars d\'une variable <code>meilleure = 0</code>, parcours les notes, et remplace <code>meilleure</code> chaque fois qu\'une note la dépasse.',
      codeDepart: 'notes = [12, 15, 9, 18]\n\nmeilleure = 0\n# ta boucle avec un if :\n',
      indice: 'Dans la boucle : <code>if n > meilleure:</code> puis, encore plus indenté, <code>meilleure = n</code>. Deux niveaux d\'indentation : le if est dans le for, le remplacement est dans le if.',
      solution: 'notes = [12, 15, 9, 18]\n\nmeilleure = 0\nfor n in notes:\n    if n > meilleure:\n        meilleure = n\n\nprint(meilleure)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (/\bmax\s*\(/.test(ctx.code)) return { ok: false, message: 'Pas de <code>max()</code> pour cet exercice — construis le mécanisme toi-même, avec un if dans la boucle. (Promis, après tu pourras utiliser max() à vie.)' };
        if (!/if\s+[^\n]*:/.test(ctx.code)) return { ok: false, message: 'Il faut un <code>if</code> dans la boucle : « si cette note dépasse la meilleure, elle devient la meilleure ».' };
        if (!ctx.logs.some(l => l.trim() === '18')) return { ok: false, message: 'La meilleure note attendue est 18. Vérifie ton if : <code>if n > meilleure:</code> puis <code>meilleure = n</code>.' };
        return { ok: true, message: 'Tu viens de réinventer max() — et de faire ta première double indentation : un if dans un for. C\'est le moment où Python devient vraiment lisible : le décalage montre la structure.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Étape 3 — les reçus :</strong> compte combien de notes sont supérieures ou égales à 10, et affiche ce nombre.',
      codeDepart: 'notes = [12, 15, 9, 18]\n\nrecus = 0\n# compte les notes >= 10 :\n',
      indice: 'Le compteur conditionnel : dans la boucle, <code>if n >= 10:</code> puis <code>recus = recus + 1</code>. Et un print après la boucle.',
      solution: 'notes = [12, 15, 9, 18]\n\nrecus = 0\nfor n in notes:\n    if n >= 10:\n        recus = recus + 1\n\nprint(recus)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/if\s+[^\n]*>=?\s*10/.test(ctx.code)) return { ok: false, message: 'La condition à tester : <code>if n >= 10:</code> — reçu à partir de 10.' };
        if (!ctx.logs.some(l => l.trim() === '3')) return { ok: false, message: 'Attendu : 3 reçus (12, 15 et 18 — le 9 est recalé). Incrémente le compteur DANS le if.' };
        return { ok: true, message: '3 reçus sur 4. Module Python terminé ! 🐍 Tu sais maintenant lire et écrire les bases de DEUX langages — et tu as vu que les concepts (variables, boucles, conditions, fonctions) sont les mêmes partout. Le prochain langage sera encore plus facile.' };
      }
    }
  ]
}
];
