/* ===== Module : Python — Un nouveau langage ===== */
window.DATA_PYTHON = [

/* ---------- py-1 : Bonjour Python ---------- */
{
  id: 'py-1',
  titre: 'Bonjour Python !',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu connais le trio du web. Python, lui, vit <em>en dehors</em> du navigateur : il sert à écrire des scripts qui rangent des fichiers, à analyser des données, à entraîner des modèles d'intelligence artificielle, à piloter des machines.</p>
<p>Et il a été conçu avec une obsession : <strong>être lisible</strong>. Son créateur partait d'un constat simple — un programme est lu bien plus souvent qu'il n'est écrit. Beaucoup de ses choix, y compris ceux qui te surprendront, viennent de là.</p>

<h2>Afficher</h2>
<pre class="bloc-code">print("Bonjour Python !")
print(42)
print("J'ai", 32, "ans")</pre>
<p>C'est l'équivalent de <code>console.log</code>. Première différence visible avec JavaScript : <strong>pas de point-virgule</strong> en fin de ligne. Une ligne, une instruction, et c'est tout.</p>
<p>Avec plusieurs valeurs séparées par des virgules, <code>print</code> insère une espace entre chacune — une commodité qui évite de les coller à la main.</p>

<h2>Les commentaires</h2>
<pre class="bloc-code"># Ceci est un commentaire : Python l'ignore
print("ceci s'affiche")   # on peut aussi commenter en fin de ligne</pre>
<p>Le dièse remplace les doubles barres obliques de JavaScript. Un commentaire ne sert pas à redire ce que le code fait déjà — <code># on ajoute 1</code> au-dessus de <code>n += 1</code> n'apprend rien. Il sert à dire <em>pourquoi</em>, ce que le code, lui, ne peut pas raconter.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce que Python lit</th><th>Ce qu'il en fait</th></tr>
<tr><td><code># un commentaire</code></td><td>Il saute la ligne entière.</td></tr>
<tr><td><code>print("Bonjour")</code></td><td>Il affiche, puis passe à la ligne suivante.</td></tr>
<tr><td><code>print("J'ai", 32, "ans")</code></td><td>Il colle les trois valeurs avec une espace entre chacune.</td></tr>
<tr><td>une erreur</td><td>Il <strong>s'arrête net</strong> : rien de ce qui suit ne s'exécute.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Oublier les parenthèses.</strong> <code>print "Bonjour"</code> fonctionnait dans Python 2, abandonné depuis 2020. Tu le croiseras dans de vieux tutoriels, et il ne marchera pas.</p>
<p><strong>Mélanger les guillemets.</strong> <code>"Bonjour'</code> n'est jamais refermé. Python répond alors : <em>« il manque une fermeture : une parenthèse, un crochet ou un guillemet a été ouvert sans être refermé. »</em></p>
<p><strong>Se tromper de casse.</strong> <code>Print</code> avec une majuscule n'existe pas. Le message est explicite : <em>« le nom « Print » est inconnu. Soit tu ne l'as pas encore créé, soit il y a une faute de frappe. »</em> Python distingue les majuscules, toujours.</p>

<h2>Dans la vraie vie</h2>
<p>Python est le langage le plus enseigné au monde, et l'un des plus demandés. On le trouve chez les scientifiques qui n'ont jamais appris à programmer autrement, dans les outils qui automatisent les tâches répétitives d'une entreprise, et derrière la plupart des travaux d'apprentissage automatique.</p>

<div class="a-retenir">
<ul>
<li><code>print(...)</code> affiche ; les virgules ajoutent une espace entre les valeurs.</li>
<li>Pas de point-virgule en fin de ligne, et le dièse <code>#</code> pour commenter.</li>
<li>Python distingue les majuscules : <code>Print</code> n'est pas <code>print</code>.</li>
<li>À la première erreur, tout s'arrête — et le message dit quoi et où.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi « Python » ?</summary>
<p>Pas pour le serpent. Son créateur, Guido van Rossum, était amateur de la troupe comique des Monty Python, et cherchait un nom « court, un peu mystérieux et légèrement irrévérencieux ». L'esprit est resté dans la documentation officielle, où les exemples parlent volontiers de fromage et de perroquets — et dans une commande cachée, <code>import this</code>, qui affiche les vingt principes de conception du langage.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'À toi : affiche exactement <code>Bonjour Python !</code> avec <code>print()</code>.',
      codeDepart: '# Écris ta première ligne de Python ici :\n',
      indices: [
        "Une seule instruction suffit, et c’est celle que la leçon vient de montrer. Le texte à afficher se met entre guillemets, à l’intérieur des parenthèses.",
        "<code>print(\"…\")</code> — remplace les points par le texte demandé. Python affiche exactement ce qui est entre les guillemets, au caractère près.",
        "Trois détails font échouer cet exercice : la majuscule à <code>Bonjour</code>, l’espace avant le <code>!</code>, et les guillemets qui encadrent le tout."
      ],
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
      indices: [
        "Un <code>print()</code> affiche une ligne, et une seule. Pour trois lignes, il n’y a donc pas de mystère.",
        "Écris trois instructions <code>print()</code>, l’une sous l’autre, sans rien devant : en Python le décalage a un sens, et ici il n’y en a aucun.",
        "<code>print(\"Alex\")</code>, puis <code>print(\"Lyon\")</code>, puis <code>print(\"le cinéma\")</code> — avec tes propres réponses."
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Tu connais déjà les variables. Ce qui change en Python, c'est tout ce qui disparaît : pas de <code>let</code>, pas de <code>const</code>, pas de déclaration de type. On écrit le nom, le signe égal, la valeur.</p>
<p>Ce dépouillement n'est pas une facilité pour débutants : c'est la marque de fabrique du langage. Moins de cérémonie, plus de lisibilité.</p>

<h2>Créer et typer</h2>
<pre class="bloc-code">prenom = "Nadia"
age = 32
taille = 1.68
majeur = True</pre>
<p>Quatre types de base, que Python devine tout seul :</p>
<ul>
<li><code>str</code> — du texte, entre guillemets simples ou doubles, au choix ;</li>
<li><code>int</code> — un nombre entier ;</li>
<li><code>float</code> — un nombre à virgule, écrite avec un <strong>point</strong> ;</li>
<li><code>bool</code> — <code>True</code> ou <code>False</code>, avec une <strong>majuscule</strong>.</li>
</ul>
<p><code>type(age)</code> dit le type d'une valeur, et <code>int("42")</code>, <code>str(42)</code>, <code>float("1.5")</code> convertissent de l'un à l'autre.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce que Python lit</th><th>Ce qu'il en fait</th></tr>
<tr><td><code>age = 32</code></td><td>Il crée une boîte nommée <code>age</code> et y range 32.</td></tr>
<tr><td><code>age = 33</code></td><td>Il remplace le contenu. Aucune déclaration à répéter.</td></tr>
<tr><td><code>print(age)</code></td><td>Il affiche le contenu : 33.</td></tr>
<tr><td><code>print("age")</code></td><td>Il affiche le mot. Les guillemets changent tout.</td></tr>
</table>
<p>La dernière ligne est la même frontière qu'en JavaScript : avec des guillemets, c'est du texte ; sans, c'est une variable.</p>

<h2>Les pièges</h2>
<p><strong>Additionner du texte et un nombre.</strong> C'est l'erreur la plus fréquente du débutant en Python, et le langage est plus strict que JavaScript : il refuse au lieu de bricoler. <code>print("age : " + age)</code> s'arrête sur <em>« tu mélanges deux types incompatibles — souvent du texte et un nombre. Python refuse « 3 + "3" » : convertis avec str(...) ou int(...). »</em></p>
<p>Trois solutions : <code>str(age)</code>, les virgules de <code>print</code>, ou les f-strings que tu verras au module suivant.</p>
<p><strong>Écrire <code>true</code> en minuscules.</strong> Python veut <code>True</code> et <code>False</code> avec une majuscule — l'inverse de JavaScript. Le message est alors : <em>« le nom « true » est inconnu. »</em></p>
<p><strong>Utiliser une virgule pour un décimal.</strong> <code>1,68</code> n'est pas un nombre pour Python : c'est deux valeurs séparées. Les décimaux s'écrivent avec un point.</p>
<p><strong>Une faute de frappe dans un nom.</strong> <code>scor</code> au lieu de <code>score</code> donne <em>« le nom « scor » est inconnu »</em>. Python ne corrige jamais, et il rappelle lui-même que les majuscules comptent.</p>

<h2>Dans la vraie vie</h2>
<p>L'absence de déclaration de type rend Python très rapide à écrire — et c'est aussi sa principale critique : une erreur de type ne se découvre qu'à l'exécution. Les grands projets ajoutent donc des <em>annotations</em> facultatives, <code>age: int = 32</code>, que des outils vérifient avant de lancer le programme.</p>

<div class="a-retenir">
<ul>
<li>Une variable se crée sans mot-clé : <code>nom = valeur</code>.</li>
<li>Quatre types de base : <code>str</code>, <code>int</code>, <code>float</code>, <code>bool</code> — et <code>True</code>/<code>False</code> prennent une majuscule.</li>
<li>Python refuse d'additionner du texte et un nombre : convertis avec <code>str(...)</code>.</li>
<li>Les décimaux s'écrivent avec un point, jamais une virgule.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : une variable est une étiquette</summary>
<p>En Python, une variable ne « contient » pas vraiment une valeur : elle lui est <em>attachée</em>, comme une étiquette collée sur un objet. Plusieurs étiquettes peuvent désigner le même objet — c'est ce qui explique le piège de la copie de liste que tu rencontreras bientôt. Pour les nombres et les textes, qui ne se modifient jamais, la distinction reste invisible.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Crée une variable <code>prenom</code> avec ton prénom et une variable <code>age</code> avec un nombre, puis affiche une phrase qui utilise <strong>les deux variables</strong> dans un seul <code>print()</code> (avec des virgules).',
      codeDepart: '# Deux variables, un print :\n',
      indices: [
        "Deux variables à créer d’abord, puis un seul <code>print()</code> qui les utilise toutes les deux.",
        "Dans un <code>print()</code>, les virgules séparent les morceaux : du texte entre guillemets, puis une variable <strong>sans</strong> guillemets, et ainsi de suite. Python glisse une espace entre chaque.",
        "<code>print(\"Je m’appelle\", prenom, \"et j’ai\", age, \"ans\")</code>"
      ],
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
      indices: [
        "Le piège : si tu écris <code>a = b</code> en premier, l’ancienne valeur de <code>a</code> est perdue pour toujours. Il faut soit la mettre de côté, soit tout faire d’un seul geste.",
        "La méthode classique passe par une troisième variable, souvent nommée <code>temp</code>, où l’on range <code>a</code> avant de l’écraser. La méthode Python, elle, tient sur une ligne.",
        "<code>a, b = b, a</code> — Python calcule d’abord toute la droite, puis distribue."
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Python est né pour calculer, et c'est encore l'un de ses usages principaux : finance, science, statistiques. Les opérateurs de base ressemblent à ceux de JavaScript — mais il en possède deux de plus, qui règlent des besoins réels et qu'on ne trouve pas partout.</p>

<h2>Les opérateurs</h2>
<pre class="bloc-code">print(7 + 3)    # 10
print(7 - 3)    # 4
print(7 * 3)    # 21
print(7 / 2)    # 3.5    toujours un decimal
print(7 // 2)   # 3      division ENTIERE
print(7 % 2)    # 1      le reste
print(2 ** 10)  # 1024   puissance</pre>
<p>Tous mesurés. Les trois derniers méritent qu'on s'y arrête.</p>

<h2>Pas à pas : les trois divisions</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Résultat de 7 par 2</th><th>À quoi ça sert</th></tr>
<tr><td><code>/</code></td><td>3.5</td><td>le calcul exact — <strong>toujours un décimal</strong>, même si ça tombe juste</td></tr>
<tr><td><code>//</code></td><td>3</td><td>« combien de fois entier » : des pages, des boîtes, des groupes</td></tr>
<tr><td><code>%</code></td><td>1</td><td>le reste : pair ou impair, répartir, faire tourner</td></tr>
</table>
<p>Retiens le premier point : <code>10 / 2</code> donne <code>5.0</code>, pas <code>5</code>. La division normale produit toujours un <code>float</code>. Pour un entier, c'est <code>//</code>.</p>
<p>Et <code>%</code> est bien plus utile qu'il n'y paraît : <code>n % 2 == 0</code> teste la parité, <code>i % 7</code> fait tourner un compteur sur une semaine.</p>

<h2>Les raccourcis</h2>
<p><code>score += 10</code>, <code>score -= 5</code>, <code>score *= 2</code> fonctionnent comme en JavaScript. En revanche <code>score++</code> <strong>n'existe pas</strong> en Python : on écrit <code>score += 1</code>.</p>

<h2>Les pièges</h2>
<p><strong>Attendre un entier de <code>/</code>.</strong> Un nombre de pages affiché « 5.0 » au lieu de « 5 » vient toujours de là. C'est <code>//</code> qu'il fallait.</p>
<p><strong>Chercher <code>++</code>.</strong> Il n'existe pas, et son absence est volontaire : le créateur du langage le jugeait source de confusion. <code>+= 1</code> dit la même chose, plus clairement.</p>
<p><strong>Diviser par zéro.</strong> Python s'arrête, et le cours traduit : <em>« division par zéro impossible. »</em> Rien à comprendre de plus — mais le programme ne continue pas, donc il faut tester le diviseur quand il vient d'ailleurs.</p>
<p><strong>Oublier les parenthèses.</strong> La priorité est celle des mathématiques : <code>**</code> d'abord, puis <code>*</code> <code>/</code> <code>//</code> <code>%</code>, puis <code>+</code> <code>-</code>. En cas de doute, des parenthèses — elles ne coûtent rien et se relisent.</p>

<h2>Dans la vraie vie</h2>
<p><code>//</code> et <code>%</code> vont presque toujours ensemble : pour répartir 47 objets dans des boîtes de 10, <code>47 // 10</code> donne 4 boîtes pleines et <code>47 % 10</code> les 7 qui restent. C'est le calcul de la pagination, des horaires, des conversions d'unités.</p>

<div class="a-retenir">
<ul>
<li><code>/</code> donne toujours un décimal ; <code>//</code> donne l'entier ; <code>%</code> donne le reste.</li>
<li><code>**</code> élève à la puissance.</li>
<li><code>++</code> n'existe pas : c'est <code>+= 1</code>.</li>
<li>Une division par zéro arrête le programme : <em>« division par zéro impossible. »</em></li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les grands nombres</summary>
<p>Python n'a pas de limite de taille pour les entiers. <code>2 ** 1000</code> donne un nombre de 302 chiffres, exact, sans débordement — là où la plupart des langages abandonnent bien avant. C'est l'une des raisons de sa popularité en cryptographie et en mathématiques, où l'on travaille couramment sur des nombres de plusieurs centaines de chiffres.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Combien y a-t-il d\'heures dans une semaine ? Fais calculer Python : affiche le résultat de <code>7 * 24</code> (le calcul, pas le résultat écrit à la main !).',
      codeDepart: '# Le calcul, pas la réponse toute faite :\n',
      indices: [
        "Le calcul doit être écrit dans le code, pas fait dans ta tête : c’est Python qui compte. Combien d’heures dans un jour, combien de jours dans une semaine ?",
        "Une opération peut se mettre directement dans un <code>print()</code>, sans passer par une variable.",
        "<code>print(7 * 24)</code>"
      ],
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
      indices: [
        "Ce n’est pas une multiplication ordinaire : « 2 puissance 10 », c’est 2 multiplié par lui-même dix fois. Python a un opérateur pour ça.",
        "C’est le seul opérateur de la leçon qui s’écrit avec <strong>deux</strong> symboles collés.",
        "<code>print(2 ** 10)</code>"
      ],
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
      indices: [
        "Deux questions différentes : « combien chacun en reçoit » et « combien il en reste ». Deux opérateurs différents, et aucun des deux n’est la division ordinaire.",
        "<code>//</code> donne le quotient entier — ce que chacun reçoit. <code>%</code> donne le reste — ce qui ne se partage pas.",
        "<code>print(bonbons // enfants)</code> puis <code>print(bonbons % enfants)</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Le <code>if</code> existe partout. Ce qui rend celui de Python particulier, c'est ce qui l'entoure — ou plutôt ce qui ne l'entoure pas.</p>
<pre class="bloc-code"># JavaScript : les accolades delimitent le bloc
if (age &gt;= 18) {
  console.log("Majeur");
}

# Python : ni parentheses, ni accolades
if age &gt;= 18:
    print("Majeur")</pre>
<p>Deux-points en fin de ligne, puis <strong>quatre espaces de décalage</strong>. C'est tout — et ce n'est pas une préférence de style : <strong>l'indentation fait partie du langage</strong>. C'est elle qui dit ce qui est à l'intérieur du bloc.</p>
<p>Le raisonnement derrière ce choix : dans les autres langages, on indente <em>quand même</em>, par lisibilité, en plus des accolades. Autant garder l'indentation et supprimer les accolades — une chose à écrire au lieu de deux, et il devient impossible que les deux se contredisent.</p>

<h2>La chaîne complète</h2>
<pre class="bloc-code">if note &gt;= 16:
    print("Tres bien")
elif note &gt;= 10:
    print("Admis")
else:
    print("Recale")</pre>
<p><code>elif</code> remplace <code>else if</code> — contraction voulue, pour éviter les escaliers. Les comparaisons sont les mêmes qu'ailleurs : <code>==</code>, <code>!=</code>, <code>&gt;</code>, <code>&gt;=</code>, <code>&lt;</code>, <code>&lt;=</code>.</p>
<p>En revanche, les opérateurs logiques s'écrivent en toutes lettres : <strong><code>and</code></strong>, <strong><code>or</code></strong>, <strong><code>not</code></strong>, là où JavaScript utilise des symboles.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce que Python lit</th><th>Ce qu'il en déduit</th></tr>
<tr><td><code>if age &gt;= 18:</code></td><td>Une condition commence ; les deux-points annoncent un bloc.</td></tr>
<tr><td>une ligne décalée</td><td>Elle est <strong>dans</strong> le bloc.</td></tr>
<tr><td>une ligne non décalée</td><td>Le bloc est terminé.</td></tr>
<tr><td><code>elif ...:</code></td><td>Testé seulement si le <code>if</code> était faux.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Oublier les deux-points.</strong> Le cours est précis : <em>« il manque le « : » à la fin de la ligne 2. En Python, les lignes qui commencent par if, elif, else, for, while ou def se terminent toujours par deux-points. »</em></p>
<p><strong>Oublier l'indentation.</strong> Le message est tout aussi guidé : <em>« il manque l'indentation à la ligne 3. La ligne du dessus se termine par « : », donc celle-ci doit être décalée vers la droite de 4 espaces (touche Tab). »</em></p>
<p><strong>Indenter alors que rien ne l'annonce.</strong> L'erreur inverse, et le conseil est l'<em>opposé</em> : le cours répond que la ligne est décalée sans raison. Lis bien lequel des deux messages tu reçois — ils ne demandent pas la même correction.</p>
<p><strong>Mélanger espaces et tabulations.</strong> Deux lignes qui semblent alignées à l'écran peuvent ne pas l'être pour Python. Choisis les espaces, et n'en démords pas — la convention officielle est de quatre.</p>
<p><strong>Écrire <code>&amp;&amp;</code> ou <code>||</code>.</strong> Ils n'existent pas : c'est <code>and</code> et <code>or</code>.</p>

<h2>Dans la vraie vie</h2>
<p>L'indentation obligatoire est ce qui frappe le plus en arrivant d'un autre langage, et ce qu'on finit par apprécier : tout le code Python du monde est indenté de la même façon, parce qu'il ne peut pas en être autrement. Les querelles de style sur le placement des accolades n'ont jamais eu lieu ici.</p>

<div class="a-retenir">
<ul>
<li>Deux-points en fin de ligne, puis quatre espaces : l'indentation <strong>fait</strong> le bloc.</li>
<li><code>elif</code> remplace <code>else if</code>.</li>
<li>Les opérateurs logiques s'écrivent <code>and</code>, <code>or</code>, <code>not</code>.</li>
<li>Deux messages opposés existent : indentation manquante, ou indentation en trop. Lis lequel arrive.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : ce que Python tient pour faux</summary>
<p>Un <code>if</code> accepte autre chose qu'une comparaison. Sont considérés comme faux : <code>False</code>, <code>0</code>, la chaîne vide, la liste vide, le dictionnaire vide et <code>None</code>. Tout le reste est vrai. D'où une écriture très courante : <code>if ma_liste:</code> veut dire « si la liste n'est pas vide », et se lit bien mieux que <code>if len(ma_liste) &gt; 0</code>.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'La note est de 15. Écris un <code>if</code>/<code>else</code> : si <code>note >= 10</code>, affiche <code>Reçu !</code>, sinon affiche <code>Recalé</code>. Attention au <code>:</code> et à l\'indentation !',
      codeDepart: 'note = 15\n\n# ton if / else ici :\n',
      indices: [
        "Deux choses que Python exige, et que beaucoup d’autres langages n’imposent pas : un signe à la fin de la ligne du <code>if</code>, et un décalage pour ce qui en dépend.",
        "La ligne du <code>if</code> se termine par <code>:</code>. Ce qui doit s’exécuter dessous est décalé de 4 espaces. Le <code>else:</code> revient au niveau du <code>if</code>, pas plus loin.",
        "<code>if note &gt;= 10:</code> · 4 espaces · <code>print(\"Reçu !\")</code> · puis <code>else:</code> · 4 espaces · <code>print(\"Recalé\")</code>"
      ],
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
      indices: [
        "Lance le code et lis le message : Python nomme lui-même son erreur, et il est très explicite sur celle-ci.",
        "<code>IndentationError</code> veut dire que le décalage ne va pas. Regarde ce qui suit le <code>if</code> : tout ce qui en dépend doit être poussé vers la droite.",
        "Place ton curseur juste devant <code>print</code> et appuie sur Tab."
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Répéter sans se répéter, tu connais le principe. La version Python est plus courte, et surtout plus directe : au lieu de gérer un compteur, on dit ce qu'on veut parcourir.</p>
<pre class="bloc-code"># JavaScript
for (let i = 0; i &lt; 5; i++) { ... }

# Python
for i in range(5):
    print(i)</pre>
<p>Trois réglages remplacés par un seul mot. C'est la même idée que le <code>for...of</code> de JavaScript, mais c'est ici la boucle <em>normale</em> — pas une alternative.</p>

<h2>Apprivoiser range</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Ce qu'elle produit</th></tr>
<tr><td><code>range(5)</code></td><td>0, 1, 2, 3, 4 — cinq valeurs, en partant de 0</td></tr>
<tr><td><code>range(1, 6)</code></td><td>1, 2, 3, 4, 5 — le second nombre est <strong>exclu</strong></td></tr>
<tr><td><code>range(0, 10, 2)</code></td><td>0, 2, 4, 6, 8 — de deux en deux</td></tr>
</table>
<p>Mesuré. Le point à graver : la borne de fin est toujours exclue. <code>range(1, 6)</code> s'arrête à 5, et c'est voulu — <code>range(n)</code> donne exactement <code>n</code> valeurs.</p>

<h2>Parcourir directement</h2>
<pre class="bloc-code">courses = ["pain", "pommes", "chocolat"]

for article in courses:
    print(article)</pre>
<p>Quand on veut les éléments et non leur rang, on les prend directement. C'est la forme la plus courante, et la plus lisible.</p>

<h2>while, et le motif de l'accumulateur</h2>
<pre class="bloc-code">total = 0
for prix in [12, 8, 5]:
    total += prix
print(total)   # 25</pre>
<p>La variable se crée <strong>avant</strong> la boucle, grandit <em>dedans</em>, et s'affiche <em>après</em>. Ce motif revient dans tous les langages.</p>
<p>Le <code>while</code> existe aussi, pour les cas où le nombre de tours n'est pas connu d'avance : <code>while energie &gt; 0:</code>.</p>

<h2>Les pièges</h2>
<p><strong>Croire que <code>range(1, 6)</code> va jusqu'à 6.</strong> C'est l'erreur de bord la plus fréquente : un tour de moins que prévu, sans aucun message.</p>
<p><strong>Déclarer l'accumulateur dans la boucle.</strong> <code>total = 0</code> à l'intérieur remet le compteur à zéro à chaque tour : le résultat vaut toujours le dernier élément.</p>
<p><strong>Oublier les deux-points ou l'indentation.</strong> Mêmes messages qu'au <code>if</code> — et ils nomment la ligne.</p>
<p><strong>Une boucle <code>while</code> qui ne s'arrête pas.</strong> Si rien ne rapproche la condition de <code>False</code>, le cours intervient : <em>« ton code tourne sans s'arrêter (boucle infinie ?). Vérifie que la condition de ta boucle finit par devenir fausse. »</em></p>

<h2>Dans la vraie vie</h2>
<p>En Python, écrire <code>for i in range(len(liste))</code> puis <code>liste[i]</code> est considéré comme une maladresse : on parcourt directement la liste. Quand l'indice est vraiment nécessaire, il existe <code>enumerate</code>, que tu verras au dernier module.</p>

<div class="a-retenir">
<ul>
<li><code>for x in collection:</code> parcourt directement les éléments — c'est la forme normale.</li>
<li><code>range(n)</code> donne n valeurs à partir de 0 ; la borne de fin est toujours <strong>exclue</strong>.</li>
<li>L'accumulateur se crée avant la boucle, grandit dedans, s'affiche après.</li>
<li><code>while</code> quand le nombre de tours est inconnu — et quelque chose doit faire avancer sa condition.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : range ne fabrique rien</summary>
<p><code>range(1000000)</code> ne crée pas un million de nombres en mémoire : il crée un objet qui sait produire le suivant quand on le lui demande. C'est pourquoi <code>print(range(5))</code> n'affiche pas la liste mais <code>range(0, 5)</code> — et qu'il faut écrire <code>list(range(5))</code> pour la voir. Cette idée de produire à la demande revient dans la leçon sur les générateurs.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Affiche les nombres de 1 à 5 (inclus) avec une boucle <code>for</code> et <code>range()</code>.',
      codeDepart: '# de 1 à 5, avec range :\n',
      indices: [
        "<code>range()</code> ne fait pas tout à fait ce qu’on croit : sa borne de fin n’est jamais atteinte.",
        "Pour aller jusqu’à 5 <strong>inclus</strong>, il faut donc demander une borne de fin plus grande d’un cran.",
        "<code>for i in range(1, 6):</code> puis, décalé, <code>print(i)</code>"
      ],
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
      indices: [
        "Tu n’écris pas dix lignes : tu en écris <strong>une</strong>, que la boucle répète dix fois avec une valeur qui change.",
        "La boucle te donne <code>i</code>, qui vaut 1, puis 2, puis 3… Il ne reste qu’à afficher le produit de 7 par cette valeur.",
        "<code>for i in range(1, 11):</code> puis, décalé, <code>print(7 * i)</code>"
      ],
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
      indices: [
        "Un <code>while</code> ne compte pas tout seul : si rien ne change à l’intérieur, il tourne sans fin. C’est à toi de faire descendre le compteur.",
        "Deux instructions <strong>dans</strong> la boucle : afficher, puis diminuer. Le « Partez ! » n’y est pas — il n’arrive qu’une fois, donc il n’est pas décalé.",
        "<code>while compteur &gt; 0:</code> · décalés : <code>print(compteur)</code> et <code>compteur = compteur - 1</code> · puis, sans décalage, <code>print(\"Partez !\")</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Une variable range une valeur. Pour en ranger trente — les courses, les notes d'une classe, les lignes d'un fichier — il faut autre chose. La <strong>liste</strong> est l'outil le plus utilisé de Python, et c'est l'équivalent exact du tableau JavaScript.</p>

<h2>Créer, lire, modifier</h2>
<pre class="bloc-code">courses = ["pain", "pommes", "chocolat"]

print(courses[0])     # pain — le premier
print(courses[-1])    # chocolat — le DERNIER
print(len(courses))   # 3

courses.append("lait")     # ajoute a la fin
courses.remove("pain")     # retire par valeur
courses[0] = "baguette"    # remplace</pre>
<p>Mêmes crochets qu'en JavaScript, mêmes indices à partir de 0. Mais Python ajoute quelque chose qui manque ailleurs : les <strong>indices négatifs</strong>. <code>[-1]</code> est le dernier, <code>[-2]</code> l'avant-dernier. Plus besoin de <code>len(t) - 1</code>.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Sur <code>["pain", "pommes", "chocolat"]</code></th></tr>
<tr><td><code>[0]</code></td><td>pain</td></tr>
<tr><td><code>[2]</code></td><td>chocolat</td></tr>
<tr><td><code>[-1]</code></td><td>chocolat, sans avoir à compter</td></tr>
<tr><td><code>[3]</code></td><td><strong>erreur</strong> : la case n'existe pas</td></tr>
</table>
<p>La dernière ligne est une bonne nouvelle. Là où JavaScript rend <code>undefined</code> en silence, Python s'arrête et explique : <em>« tu demandes un élément qui n'existe pas dans la liste. Rappel : le premier est à l'indice 0, donc une liste de 3 éléments va de 0 à 2. »</em></p>

<h2>Le piège de la copie</h2>
<pre class="bloc-code">a = [1, 2]
b = a           # PAS une copie
b.append(3)
print(a)        # [1, 2, 3]  — a a change aussi

c = a[:]        # une vraie copie
c.append(9)
print(a)        # [1, 2, 3]  — intacte</pre>
<p>Mesuré. <code>b = a</code> ne duplique rien : les deux noms désignent la même liste. Pour copier, <code>a[:]</code> ou <code>list(a)</code>.</p>
<p>C'est le même piège qu'en JavaScript, et il mord d'autant plus en Python qu'on passe des listes à des fonctions sans y penser.</p>
<p>La raison tient à ce qu'est vraiment une variable en Python : une étiquette collée sur un objet, pas une boîte qui le contient. Écrire <code>b = a</code> colle une seconde étiquette sur le même objet — il n'y a jamais eu qu'une seule liste.</p>

<h2>Les pièges</h2>
<p><strong>Croire que <code>=</code> copie.</strong> Le bug apparaît loin de sa cause : une liste modifiée quelque part, et une autre change sans raison apparente.</p>
<p><strong>Confondre <code>append</code> et <code>+</code>.</strong> <code>append</code> ajoute <em>un</em> élément ; <code>liste + autre</code> colle deux listes. Faire <code>append(["a","b"])</code> ajoute un élément qui est lui-même une liste.</p>
<p><strong>Retirer pendant qu'on parcourt.</strong> La liste se décale sous la boucle, qui saute des éléments. On construit une nouvelle liste, ou on parcourt une copie.</p>
<p><strong>Oublier que <code>append</code> ne rend rien.</strong> <code>courses = courses.append("lait")</code> écrase la liste par <code>None</code>. Les méthodes qui modifient en place ne renvoient rien.</p>

<h2>Dans la vraie vie</h2>
<p>Les listes sont partout : lignes lues dans un fichier, résultats d'une requête, mesures d'un capteur. Et les indices négatifs sont l'une de ces petites commodités qu'on regrette amèrement en revenant à un autre langage.</p>

<div class="a-retenir">
<ul>
<li>Indices à partir de 0 — et <strong>indices négatifs</strong> pour compter depuis la fin.</li>
<li>Un indice hors liste arrête le programme avec un message clair.</li>
<li><code>b = a</code> ne copie pas : <code>a[:]</code> si.</li>
<li><code>append</code> modifie la liste et ne rend rien.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la copie ne va qu'à un niveau</summary>
<p><code>a[:]</code> duplique la liste, mais si elle contient d'autres listes, ce sont les <em>mêmes</em>. Modifier une sous-liste de la copie modifie l'originale. Pour une duplication complète, il faut <code>copy.deepcopy(a)</code>, du module <code>copy</code>. C'est exactement la même limite que le spread en JavaScript.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Crée une liste <code>courses</code> avec 3 produits, ajoute-en un 4e avec <code>append()</code>, puis affiche le nombre d\'éléments avec <code>len()</code>.',
      codeDepart: '# Ta liste de courses :\n',
      indices: [
        "Trois gestes, dans l’ordre : fabriquer la liste, lui ajouter un élément, puis demander sa taille.",
        "Une liste s’écrit entre crochets, éléments séparés par des virgules. <code>append()</code> s’emploie <em>sur</em> la liste, avec un point ; <code>len()</code> s’emploie <em>autour</em> d’elle.",
        "<code>courses.append(\"café\")</code> puis <code>print(len(courses))</code>"
      ],
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
      indices: [
        "Le premier élément ne porte pas le numéro 1 — c’est le piège classique. Et pour le dernier, Python offre un raccourci que peu de langages ont.",
        "On compte à partir de 0. Un indice négatif, lui, part de la <strong>fin</strong> : -1 désigne le dernier élément, quelle que soit la longueur de la liste.",
        "<code>print(courses[0])</code> puis <code>print(courses[-1])</code>"
      ],
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
      indices: [
        "Le mot « accumulateur » dit tout : il faut une variable qui garde le total pendant que la boucle avance. Elle doit exister <strong>avant</strong> la boucle.",
        "Trois temps : <code>total = 0</code> avant ; dans la boucle, on ajoute la note courante au total ; et on affiche <strong>après</strong>, sinon on affiche un total incomplet à chaque tour.",
        "<code>total = 0</code> · <code>for n in notes:</code> · décalé : <code>total = total + n</code> · puis, sans décalage, <code>print(total)</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Imagine un programme qui calcule un prix avec la TVA à cinq endroits différents. Le jour où le taux change, il faut retrouver et corriger les cinq ; en oublier un, c'est un bug que personne ne verra avant qu'un client paie le mauvais prix. Une <strong>fonction</strong> règle ça : on donne un nom à un morceau de code, on l'écrit <em>une</em> fois, et on l'appelle autant de fois qu'on veut. Le jour où il faut changer quelque chose, on le change à un seul endroit.</p>
<p>Tu t'en sers déjà sans le savoir : <code>print</code>, <code>len</code>, <code>input</code> sont des fonctions que quelqu'un a écrites pour toi. Ici, tu écris les tiennes.</p>

<h2>def : définir une fonction</h2>
<p>Les fonctions Python font le même travail qu'en JavaScript ; seul le costume change :</p>
<pre class="bloc-code"># JavaScript
function bonjour(prenom) {
  console.log("Bonjour " + prenom);
}

# Python
def bonjour(prenom):
    print("Bonjour", prenom)

bonjour("Nadia")   # l'appel est identique
bonjour("Karim")</pre>
<ul>
<li><code>def</code> (pour <em>define</em>, « définir ») annonce une fonction ;</li>
<li><code>bonjour</code> est son nom ;</li>
<li><code>prenom</code>, entre parenthèses, est son <strong>paramètre</strong> : une variable qui recevra une valeur à chaque appel ;</li>
<li>les deux-points <code>:</code> ouvrent le corps, et tout le corps est <strong>indenté</strong>. C'est l'indentation, et elle seule, qui dit où la fonction s'arrête.</li>
</ul>
<p>Écrire la fonction ne l'exécute pas : c'est une recette rangée dans un tiroir. Elle ne tourne que quand on l'<strong>appelle</strong>, avec des parenthèses : <code>bonjour("Nadia")</code>. La valeur passée à l'appel, <code>"Nadia"</code>, s'appelle un <strong>argument</strong>.</p>

<h2>return : la fonction qui répond</h2>
<pre class="bloc-code">def aire_rectangle(largeur, hauteur):
    return largeur * hauteur

surface = aire_rectangle(4, 5)
print(surface)              # 20
print(aire_rectangle(3, 3)) # 9 — utilisable directement dans un print</pre>
<p>La distinction la plus importante de la leçon : <code>print</code> <em>montre</em> une valeur à l'écran, pour l'humain qui regarde. <code>return</code> la <em>renvoie</em> au programme, qui peut la ranger dans une variable, la réutiliser dans un calcul, la passer à une autre fonction. Une fonction qui calcule quelque chose devrait presque toujours faire <code>return</code>, et laisser à l'appelant le choix de l'afficher.</p>

<h2>Pas à pas</h2>
<p>Que se passe-t-il pendant <code>surface = aire_rectangle(4, 5)</code> ?</p>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>appel</td><td>Python saute dans la fonction : <code>largeur</code> reçoit <code>4</code>, <code>hauteur</code> reçoit <code>5</code>, dans l'ordre des parenthèses.</td></tr>
<tr><td>calcul</td><td><code>largeur * hauteur</code> donne <code>20</code>.</td></tr>
<tr><td>return</td><td>La fonction s'arrête et renvoie <code>20</code> : l'appel <code>aire_rectangle(4, 5)</code> « vaut » 20.</td></tr>
<tr><td>retour</td><td>Python revient à la ligne de l'appel et range 20 dans <code>surface</code>. <code>largeur</code> et <code>hauteur</code> n'existent plus : elles ne vivaient que pendant l'appel.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Oublier le return.</strong> C'est le plus sournois, parce que rien ne plante :</p>
<pre class="bloc-code">def aire(largeur, hauteur):
    print(largeur * hauteur)    # montre 20… mais ne renvoie rien

resultat = aire(4, 5)
print(resultat)                 # None</pre>
<p><code>None</code>, c'est la façon dont Python dit « rien ». Si tu vois un <code>None</code> inattendu, regarde d'abord s'il ne manque pas un <code>return</code>.</p>
<p><strong>Appeler avant de définir.</strong> Python lit le fichier de haut en bas. Si l'appel <code>bonjour("Nadia")</code> est écrit au-dessus du <code>def</code>, la fonction n'existe pas encore, et l'éditeur te le dira : « le nom « bonjour » est inconnu ». Les <code>def</code> se placent en haut, les appels en dessous.</p>
<p><strong>Oublier les parenthèses.</strong> <code>bonjour</code> tout seul, sans parenthèses, ne provoque aucune erreur… et n'affiche rien : on a <em>nommé</em> la fonction sans l'<em>appeler</em>. Les parenthèses, c'est le bouton « lancer ».</p>

<h2>Dans la vraie vie</h2>
<p>Un vrai programme Python, c'est surtout des fonctions courtes, chacune avec un nom qui dit ce qu'elle fait : <code>calculer_total</code>, <code>envoyer_email</code>, <code>lire_fichier</code>. Et une bibliothèque Python, comme celles qui servent à analyser des données ou à faire de l'intelligence artificielle, n'est rien d'autre qu'une grande collection de fonctions écrites par d'autres, que tu appelles avec leur nom et tes arguments.</p>

<div class="a-retenir">
<ul>
<li><code>def nom(parametres):</code> puis un corps indenté. Écrire une fonction ne l'exécute pas ; il faut l'appeler, avec des parenthèses.</li>
<li><code>return</code> renvoie une valeur au programme ; <code>print</code> ne fait que la montrer. Sans <code>return</code>, la fonction renvoie <code>None</code>.</li>
<li>On définit d'abord, on appelle ensuite.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : return arrête tout</summary>
<p>Dès qu'un <code>return</code> est exécuté, la fonction s'arrête, même s'il reste des lignes en dessous. On s'en sert pour sortir tôt :</p>
<pre class="bloc-code">def diviser(a, b):
    if b == 0:
        return "division impossible"
    return a / b</pre>
<p>Si <code>b</code> vaut 0, la deuxième ligne n'est jamais atteinte. C'est souvent plus lisible qu'un <code>else</code>. Et les noms de fonctions Python s'écrivent en <code>minuscules_avec_tirets_bas</code> : c'est la convention officielle du langage, décrite dans un texte appelé PEP 8.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Définis une fonction <code>bonjour(prenom)</code> qui affiche « Bonjour » suivi du prénom, puis appelle-la <strong>deux fois</strong> avec deux prénoms différents.',
      codeDepart: '# def, puis deux appels :\n',
      indices: [
        "Définir une fonction ne l’exécute pas : c’est une recette qu’on écrit, et qui attend qu’on l’appelle. Il y a donc deux parties à écrire.",
        "La définition commence par <code>def</code>, se termine par <code>:</code>, et son contenu est décalé. L’appel, lui, s’écrit sans décalage et sans <code>def</code>.",
        "<code>def bonjour(prenom):</code> · décalé : <code>print(\"Bonjour\", prenom)</code> · puis <code>bonjour(\"Nadia\")</code> et <code>bonjour(\"Karim\")</code>"
      ],
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
      indices: [
        "<code>print</code> et <code>return</code> ne font pas la même chose : l’un affiche, l’autre <strong>renvoie</strong> une valeur à qui a appelé la fonction. Ici, c’est le second qu’on veut.",
        "La fonction ne doit rien afficher : elle renvoie le produit. C’est à l’extérieur qu’on affiche ce qu’elle a renvoyé.",
        "Dans la fonction : <code>return largeur * hauteur</code>. À l’extérieur : <code>print(aire_rectangle(4, 5))</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Une liste range des choses dans un ordre, et on les retrouve par leur rang. Mais beaucoup d'informations n'ont pas de rang : le nom, la ville et l'âge d'une personne ne forment pas une suite — ce sont des <strong>étiquettes</strong>.</p>
<p>Le dictionnaire range par nom plutôt que par position. C'est l'objet JavaScript, et c'est l'une des structures les plus utilisées de Python.</p>

<h2>Créer et lire</h2>
<pre class="bloc-code">contact = {
    "nom": "Nadia Benali",
    "ville": "Lyon",
    "age": 32
}

print(contact["nom"])          # Nadia Benali
contact["age"] = 33            # modifier
contact["mail"] = "n@ex.fr"    # ajouter</pre>
<p>Seule différence visible avec JavaScript : les <strong>guillemets autour des clés sont obligatoires</strong>, à l'écriture comme à la lecture. Et on lit avec des crochets, jamais avec un point.</p>

<h2>Pas à pas : la clé absente</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Si la clé n'existe pas</th></tr>
<tr><td><code>contact["ville"]</code></td><td><strong>le programme s'arrête</strong></td></tr>
<tr><td><code>contact.get("ville")</code></td><td><code>None</code>, sans erreur</td></tr>
<tr><td><code>contact.get("ville", "inconnue")</code></td><td>« inconnue »</td></tr>
</table>
<p>Mesuré, le message de la première ligne : <em>« cette clé n'existe pas dans le dictionnaire. Vérifie l'orthographe de la clé. »</em></p>
<p>C'est une différence importante avec JavaScript, qui rend <code>undefined</code> sans rien dire. Python préfère s'arrêter — et <code>.get()</code> est là pour les cas où l'absence est normale.</p>

<h2>Parcourir</h2>
<pre class="bloc-code">for cle in contact:
    print(cle, ":", contact[cle])</pre>
<p>Une boucle sur un dictionnaire donne ses <strong>clés</strong>. Pour les valeurs, <code>contact.values()</code> ; pour les deux à la fois, <code>contact.items()</code> — que tu verras au module suivant.</p>
<p>Et <code>"ville" in contact</code> répond par <code>True</code> ou <code>False</code> : c'est le test à écrire avant d'aller chercher une clé incertaine.</p>

<h2>Les pièges</h2>
<p><strong>Lire une clé avec un point.</strong> <code>contact.nom</code> ne fonctionne pas en Python — c'est <code>contact["nom"]</code>. L'habitude venue de JavaScript est tenace.</p>
<p><strong>Oublier les guillemets autour d'une clé.</strong> <code>contact[nom]</code> cherche une <em>variable</em> nommée <code>nom</code>, et donne <em>« le nom « nom » est inconnu »</em>.</p>
<p><strong>Supposer qu'une clé existe.</strong> Dès que la donnée vient d'ailleurs — un fichier, une saisie — il faut <code>.get()</code> ou un test <code>in</code>.</p>
<p><strong>Croire que l'ordre est garanti.</strong> Depuis Python 3.7 l'ordre d'insertion est conservé, mais s'appuyer dessus reste une mauvaise idée : si l'ordre compte, c'est une liste qu'il faut.</p>

<h2>Dans la vraie vie</h2>
<p>Une liste de dictionnaires est <em>la</em> structure de données la plus courante de Python : chaque élément est une fiche, chaque fiche a les mêmes clés. C'est la forme sous laquelle arrivent les données d'un fichier, d'une base, ou d'un service distant.</p>

<div class="a-retenir">
<ul>
<li>Un dictionnaire range par clé, pas par position : <code>{"cle": valeur}</code>.</li>
<li>Guillemets obligatoires autour des clés, et des crochets pour lire — jamais un point.</li>
<li>Une clé absente <strong>arrête</strong> le programme ; <code>.get()</code> rend <code>None</code> à la place.</li>
<li><code>"cle" in dictionnaire</code> teste la présence.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : ce qui peut servir de clé</summary>
<p>Pas n'importe quoi : une clé doit être une valeur qui ne change jamais — un texte, un nombre, un tuple. Une liste est refusée, parce qu'elle pourrait être modifiée après coup et que le dictionnaire ne saurait plus où la ranger. C'est l'une des raisons d'être des tuples, que tu rencontreras au dernier module.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Voici un contact. Affiche sa ville en allant la chercher dans le dictionnaire (pas en la réécrivant à la main !).',
      codeDepart: 'contact = {\n    "nom": "Nadia Benali",\n    "ville": "Lyon",\n    "age": 32\n}\n\n# affiche la ville :\n',
      indices: [
        "Un dictionnaire ne se lit pas par numéro mais par <strong>nom</strong>. Le nom à employer est écrit dans le dictionnaire lui-même, juste à gauche des deux-points.",
        "L’accès ressemble à celui d’une liste, mais entre les crochets on met la clé, entre guillemets, au lieu d’un nombre.",
        "<code>print(contact[\"ville\"])</code>"
      ],
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
      indices: [
        "Ajouter une clé, c’est simplement écrire dedans : il n’existe pas d’<code>append()</code> pour les dictionnaires, contrairement aux listes.",
        "On écrit à une clé qui n’existe pas encore, et Python la crée au passage. <code>len()</code>, lui, compte les clés.",
        "<code>contact[\"email\"] = \"nadia@mail.fr\"</code> puis <code>print(len(contact))</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Dernière leçon du module, et la première occasion d'assembler tout : une liste, une boucle, une condition, un calcul. C'est exactement le genre de script qu'on écrit en Python dans la vraie vie — analyser des ventes, des mesures, des résultats.</p>
<p>Un programme utile est rarement une idée nouvelle. C'est presque toujours quatre outils simples, posés dans le bon ordre.</p>

<h2>La mission</h2>
<p>À partir d'une liste de notes, produire : la moyenne, la meilleure, la plus basse, et le nombre d'élèves au-dessus de la moyenne.</p>
<pre class="bloc-code">notes = [12, 15, 8, 17, 10, 13]

total = 0
for n in notes:
    total += n

moyenne = total / len(notes)
print("Moyenne :", moyenne)
print("Meilleure :", max(notes))
print("Plus basse :", min(notes))</pre>
<p><code>max</code>, <code>min</code>, <code>len</code> et <code>sum</code> sont fournis par Python : <code>sum(notes)</code> remplace à lui seul la boucle d'accumulation ci-dessus. Écrire la boucle d'abord, puis découvrir qu'une fonction existe, est une bonne façon d'apprendre — on comprend ce que la fonction fait.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qu'on obtient</th></tr>
<tr><td><code>total = 0</code></td><td>l'accumulateur, avant la boucle</td></tr>
<tr><td>la boucle</td><td>total vaut 75 après six tours</td></tr>
<tr><td><code>total / len(notes)</code></td><td>12.5 — un décimal, puisque <code>/</code> en donne toujours un</td></tr>
<tr><td>compter au-dessus</td><td>une seconde boucle, avec un <code>if</code> et un compteur</td></tr>
</table>

<h2>La méthode, plus que le code</h2>
<p>Un programme de ce genre ne s'écrit pas d'un trait. On procède par petits morceaux vérifiables :</p>
<ol>
<li>afficher la liste, pour être sûr de l'avoir ;</li>
<li>calculer le total, et l'afficher ;</li>
<li>en tirer la moyenne, et l'afficher ;</li>
<li>ajouter le comptage.</li>
</ol>
<p>À chaque étape, on exécute. Un bug trouvé tout de suite coûte une minute ; le même bug trouvé après quarante lignes en coûte vingt.</p>

<h2>Les pièges</h2>
<p><strong>Diviser par zéro sur une liste vide.</strong> <code>total / len(notes)</code> s'arrête avec <em>« division par zéro impossible »</em> si la liste est vide. Un programme sérieux teste <code>if notes:</code> avant.</p>
<p><strong>Déclarer le compteur dans la boucle.</strong> Toujours le même piège : il repart de zéro à chaque tour.</p>
<p><strong>Comparer dans la mauvaise boucle.</strong> Compter les notes au-dessus de la moyenne demande de connaître la moyenne — donc d'avoir fini la première boucle. Deux boucles successives, pas une seule.</p>
<p><strong>Afficher un décimal interminable.</strong> Une moyenne peut donner 12.333333333333334. <code>round(moyenne, 2)</code> arrondit à deux décimales pour l'affichage.</p>

<h2>Dans la vraie vie</h2>
<p>Remplace « notes » par des ventes, des températures ou des temps de réponse, et tu as le script que des milliers de gens écrivent chaque jour — souvent sans se considérer comme programmeurs. C'est l'usage le plus répandu de Python, bien avant l'intelligence artificielle.</p>

<div class="a-retenir">
<ul>
<li><code>sum</code>, <code>len</code>, <code>max</code> et <code>min</code> évitent d'écrire une boucle à la main.</li>
<li>Deux calculs qui dépendent l'un de l'autre demandent deux boucles successives.</li>
<li>Une liste vide fait diviser par zéro : teste <code>if notes:</code> avant.</li>
<li>On construit par petits morceaux, en exécutant à chaque étape.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la même chose en une ligne</summary>
<p>Compter les notes au-dessus de la moyenne s'écrit aussi <code>sum(1 for n in notes if n &gt; moyenne)</code>. C'est concis, et c'est une écriture que tu comprendras pleinement après la leçon sur les listes en compréhension. Retiens l'ordre d'apprentissage : la boucle explicite d'abord, parce qu'elle montre ce qui se passe ; la forme courte ensuite, quand on sait déjà ce qu'elle remplace.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: '<strong>Étape 1 — la moyenne :</strong> totalise les notes avec une boucle, divise par le nombre d\'élèves (<code>len</code>), affiche le résultat.',
      codeDepart: 'notes = [12, 15, 9, 18]\n\n# total, puis moyenne :\n',
      indices: [
        "Tu as déjà fait l’accumulateur dans la leçon sur les listes : c’est exactement le même geste. Il ne reste qu’à diviser à la fin.",
        "Le total se construit dans la boucle ; la division n’a lieu qu’une fois, <strong>après</strong>. Le nombre d’élèves, c’est <code>len(notes)</code> — ne l’écris pas à la main.",
        "<code>moyenne = total / len(notes)</code> puis <code>print(moyenne)</code>"
      ],
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
      indices: [
        "Le principe : on garde la meilleure note vue jusqu’ici, et on la remplace dès qu’on trouve mieux. Une seule variable suffit.",
        "Il y a <strong>deux</strong> décalages emboîtés : le <code>if</code> est dans le <code>for</code>, et le remplacement est dans le <code>if</code>. Soit 4 espaces, puis 8.",
        "<code>for n in notes:</code> · 4 espaces : <code>if n &gt; meilleure:</code> · 8 espaces : <code>meilleure = n</code>"
      ],
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
      indices: [
        "C’est encore un accumulateur, mais qui n’ajoute pas toujours : il compte, et seulement quand une condition est remplie.",
        "Un compteur à 0 avant la boucle. Dans la boucle, un <code>if</code> ; et dans le <code>if</code>, on augmente le compteur de 1.",
        "<code>if n &gt;= 10:</code> puis, plus décalé, <code>recus = recus + 1</code>"
      ],
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
