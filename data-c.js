/* ===== Module : C — Le langage des fondations ===== */
window.DATA_C = [

/* ---------- c-1 ---------- */
{
  id: 'c-1',
  titre: 'Le C, et pourquoi il compte encore',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Le C a plus de cinquante ans, et tout ce que tu utilises repose dessus : Windows, Linux, macOS, les moteurs de bases de données, l'intérieur de Python lui-même. C'est le langage des <strong>fondations</strong>.</p>
<p>Il a été créé pour écrire un système d'exploitation — une tâche où l'on ne peut rien se permettre d'invisible. D'où son trait dominant : <strong>le C ne fait rien dans ton dos</strong>. Pas de ramasse-miettes, pas de conversion automatique, pas de vérification au moment de l'exécution. En échange, tu sais exactement ce que fait la machine.</p>

<h2>Compilé, pas interprété</h2>
<p>Python et JavaScript sont lus et exécutés au fil de l'eau. Le C est d'abord <strong>compilé</strong> : un programme traduit l'intégralité de ton code en instructions machine, une fois pour toutes. Le résultat tourne ensuite sans interprète, à pleine vitesse.</p>
<p>Conséquence directe : beaucoup d'erreurs sont attrapées <em>avant</em> la première exécution. Le compilateur refuse de produire un programme dont il ne comprend pas une ligne.</p>

<h2>Le squelette obligatoire</h2>
<pre class="bloc-code">#include &lt;stdio.h&gt;

int main() {
    printf("Bonjour\n");
    return 0;
}</pre>
<ul>
<li><code>#include &lt;stdio.h&gt;</code> — on importe la bibliothèque d'entrées-sorties, sans laquelle <code>printf</code> n'existe pas ;</li>
<li><code>int main()</code> — le point d'entrée. Tout programme C en a un, et un seul ;</li>
<li><code>return 0;</code> — on annonce au système que tout s'est bien passé ;</li>
<li>le <code>\n</code> — le retour à la ligne. <strong>Sans lui, rien ne va à la ligne.</strong></li>
</ul>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>tu écris le code</td><td>un fichier texte, rien de plus</td></tr>
<tr><td>compilation</td><td>traduction en instructions machine — ou refus</td></tr>
<tr><td>exécution</td><td><code>main</code> est appelée, ligne après ligne</td></tr>
<tr><td><code>return 0</code></td><td>le programme rend la main</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Oublier le <code>\n</code>.</strong> Mesuré : deux <code>printf</code> sans retour à la ligne donnent <code>"sans retourcolle"</code>, d'un seul tenant. Rien n'est cassé, et l'affichage est illisible.</p>
<p><strong>Oublier un point-virgule.</strong> Le cours est précis : <em>« il manque un point-virgule <code>;</code> à la fin de cette instruction — j'ai trouvé « printf » juste après. »</em> Il nomme ce qu'il a rencontré, ce qui situe la ligne fautive immédiatement.</p>
<p><strong>Oublier une accolade.</strong> <em>« une accolade { n'a jamais été refermée. »</em></p>
<p><strong>Croire que le C ressemble à Python.</strong> L'indentation n'a aucune valeur ici : ce sont les accolades qui délimitent, et les point-virgules qui terminent. On indente quand même, pour soi.</p>

<h2>Dans la vraie vie</h2>
<p>On n'écrit plus guère d'application entière en C. On y écrit ce qui doit être rapide ou proche du matériel : noyaux de systèmes, pilotes, moteurs de jeu, systèmes embarqués. Et l'on apprend le C pour comprendre ce que les autres langages font pour nous.</p>

<div class="a-retenir">
<ul>
<li>Le C est <strong>compilé</strong> : traduit en entier avant d'être exécuté.</li>
<li>Tout programme a un <code>int main()</code>, et un seul.</li>
<li><code>#include &lt;stdio.h&gt;</code> est nécessaire pour <code>printf</code>.</li>
<li>Sans <code>\n</code>, rien ne va à la ligne.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : que vaut le 0 de return ?</summary>
<p>C'est le <em>code de sortie</em> du programme, lu par le système : zéro veut dire « réussi », toute autre valeur signale une erreur. C'est ce qui permet d'enchaîner des commandes dans un terminal — « fais ceci, et si ça marche, fais cela ». Une convention vieille d'un demi-siècle, encore utilisée chaque jour par tous les outils d'automatisation.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Écris le programme C complet qui affiche <code>Bonjour le monde !</code>. Il te faut le <code>int main()</code>, le <code>printf</code> et le <code>return 0;</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Un programme C a toujours la même carcasse, et elle est déjà sous tes yeux dans la leçon. Il ne manque qu’une instruction à l’intérieur des accolades.",
        "<code>printf</code> affiche ; le <code>\\n</code> à la fin du texte passe à la ligne. Et en C, chaque instruction se termine par un point-virgule — sans exception.",
        "<code>printf(\"Bonjour le monde !\\n\");</code> entre les accolades de <code>main</code>."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    printf("Bonjour le monde !\\n");\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/int\s+main\s*\(/.test(ctx.code)) return { ok: false, message: 'Garde la fonction <code>int main()</code> : c\'est le point de départ obligatoire de tout programme C.' };
        if (!/printf/.test(ctx.code)) return { ok: false, message: 'Utilise <code>printf(...)</code> pour afficher.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche. Vérifie que ton printf est bien à l\'intérieur des accolades de main.' };
        if (l[0] !== 'Bonjour le monde !') return { ok: false, message: 'Attendu exactement <code>Bonjour le monde !</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Ton premier programme C. Compilé pour de vrai, il produirait un fichier exécutable de quelques kilo-octets qui démarre instantanément.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> affiche trois lignes — <code>Ligne 1</code>, <code>Ligne 2</code>, <code>Ligne 3</code>. Attention : c\'est le <code>\\n</code> qui crée le passage à la ligne, pas le printf lui-même.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Le passage à la ligne n’est pas automatique en C : ce n’est pas <code>printf</code> qui le crée, c’est un caractère que tu écris toi-même.",
        "Ce caractère est <code>\\n</code>, et il se place <strong>à l’intérieur</strong> des guillemets, à la fin du texte.",
        "Trois <code>printf</code>, chacun terminé par <code>\\n</code> avant le guillemet fermant."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    printf("Ligne 1\\n");\n    printf("Ligne 2\\n");\n    printf("Ligne 3\\n");\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length === 1 && /Ligne 1.*Ligne 2/.test(l[0])) return { ok: false, message: 'Tout est sur une seule ligne : il manque les <code>\\n</code> à la fin de chaque texte. En C, printf ne passe pas à la ligne tout seul.' };
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes — j\'en compte ' + l.length + '.' };
        if (l[0] !== 'Ligne 1' || l[2] !== 'Ligne 3') return { ok: false, message: 'Attendu : Ligne 1, Ligne 2, Ligne 3 dans cet ordre.' };
        return { ok: true, message: 'Le <code>\\n</code> est explicite en C : c\'est toi qui décides où couper. Plus verbeux, mais plus précis.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Quelle est la différence entre un langage <strong>compilé</strong> (C) et <strong>interprété</strong> (Python) ?',
      choix: [
        'Le compilé est traduit en entier avant de tourner, l\'interprété est lu au fur et à mesure',
        'Le compilé est plus récent que l\'interprété',
        'Le compilé ne peut pas afficher de texte',
        'L\'interprété est toujours plus rapide'
      ],
      bonne: 0,
      explication: 'La compilation produit un programme autonome, très rapide, et détecte beaucoup d\'erreurs à l\'avance. L\'interprétation permet d\'essayer immédiatement, sans étape intermédiaire — plus souple pour apprendre et prototyper.',
      aides: [
        null,
        'C\'est même l\'inverse : le C (1972) est plus ancien que Python (1991). L\'âge n\'a rien à voir avec le mode d\'exécution.',
        'Bien sûr que si — c\'est ce que fait printf ! La différence est dans la façon dont le code devient exécutable.',
        'Généralement l\'inverse : le code compilé est traduit une fois pour toutes en instructions machine, donc il tourne plus vite.'
      ]
    }
  ]
},

/* ---------- c-2 ---------- */
{
  id: 'c-2',
  titre: 'Les types : le C veut tout savoir',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>En Python tu écrivais <code>age = 30</code>. En C, il faut annoncer le type avant le nom :</p>
<pre class="bloc-code">int age = 30;
double prix = 19.99;
char initiale = 'A';</pre>
<p>Pourquoi cette contrainte ? Parce que le C réserve une place <strong>précise</strong> en mémoire, et qu'il doit savoir combien. Un <code>int</code> occupe quatre octets, un <code>char</code> un seul. Sans le type, la machine ne saurait ni combien réserver, ni comment relire ce qu'il y a dedans.</p>
<p>Ce n'est donc pas une formalité administrative : c'est l'information dont le langage a besoin pour travailler sans filet.</p>

<h2>Les types de base</h2>
<ul>
<li><code>int</code> — un entier ;</li>
<li><code>double</code> — un nombre à virgule (et <code>float</code>, sa version moins précise) ;</li>
<li><code>char</code> — un seul caractère, entre apostrophes simples ;</li>
<li>pas de type « texte » : une chaîne est un tableau de <code>char</code>, et c'est l'objet d'une leçon entière.</li>
</ul>
<p>Le C n'a pas non plus de type booléen d'origine : <strong>zéro est faux, tout le reste est vrai</strong>.</p>

<h2>printf et ses formats</h2>
<pre class="bloc-code">int n = 42;
double d = 3.14159;
printf("%d et %.2f\n", n, d);   // 42 et 3.14</pre>
<p>Mesuré. Chaque <code>%</code> est un trou, rempli dans l'ordre par les valeurs qui suivent :</p>
<table class="memo-table trace">
<tr><th>Format</th><th>Pour quoi</th></tr>
<tr><td><code>%d</code></td><td>un entier</td></tr>
<tr><td><code>%f</code> ou <code>%.2f</code></td><td>un décimal, avec le nombre de chiffres voulu</td></tr>
<tr><td><code>%c</code></td><td>un caractère</td></tr>
<tr><td><code>%s</code></td><td>une chaîne</td></tr>
</table>

<h2>Pas à pas</h2>
<p>Le compilateur fait deux choses que Python ne fait pas : il <strong>vérifie</strong> le type à la compilation, et il <strong>convertit</strong> parfois tout seul. <code>int x = 3.7;</code> ne produit pas 3.7 mais 3 : la partie décimale est coupée, sans erreur.</p>

<h2>Les pièges</h2>
<p><strong>Utiliser une variable non déclarée.</strong> Le cours est explicite : <em>« la variable <code>inconnu</code> n'existe pas. En C comme en Java, il faut la déclarer avec son type avant de l'utiliser (par exemple <code>int inconnu = 0;</code>). »</em></p>
<p><strong>Confondre <code>'A'</code> et <code>"A"</code>.</strong> Les apostrophes simples donnent un <code>char</code> ; les guillemets doubles, une chaîne — c'est-à-dire deux cases en mémoire, pas une.</p>
<p><strong>Oublier le type dans une déclaration.</strong> Le C ne devine rien.</p>
<p><strong>Croire qu'une variable non initialisée vaut zéro.</strong> Ici, le cours lui donne zéro — mais un vrai compilateur lui laisse ce qui traînait en mémoire, c'est-à-dire n'importe quoi. <strong>On initialise toujours.</strong></p>

<h2>Dans la vraie vie</h2>
<p>Les types servent aussi d'instrument de précision : sur un système embarqué, on choisit un entier sur 8 ou 16 bits selon la mémoire disponible. Un programme C bien écrit dit exactement ce qu'il consomme, ce qu'aucun langage à ramasse-miettes ne permet.</p>

<div class="a-retenir">
<ul>
<li>Un type devant chaque variable : le C doit savoir combien réserver.</li>
<li><code>int</code>, <code>double</code>, <code>char</code> — et pas de type texte.</li>
<li>Chaque <code>%</code> de <code>printf</code> est un trou rempli dans l'ordre.</li>
<li>On initialise toujours : ailleurs, une variable non initialisée contient n'importe quoi.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : un char est un petit nombre</summary>
<p>En mémoire, <code>'A'</code> est le nombre 65 — son code dans la table des caractères. C'est pourquoi <code>char c = 65;</code> est valide, et pourquoi on peut écrire <code>c + 1</code> pour obtenir le caractère suivant. Cette confusion volontaire entre caractère et petit entier est typique du C : elle est pratique, et c'est une source d'erreurs dans tous les langages qui l'ont héritée.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Déclare un <code>int</code> nommé <code>age</code> valant 30, puis affiche <code>J\'ai 30 ans</code> en utilisant <code>%d</code> (pas en écrivant 30 à la main dans le texte !).',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Le texte et la valeur sont deux choses séparées : le <code>printf</code> laisse un <strong>trou</strong> dans la phrase, et la valeur arrive après.",
        "Le trou pour un entier s’écrit <code>%d</code>. La variable se passe en second argument, après une virgule.",
        "<code>printf(\"J’ai %d ans\\n\", age);</code>"
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int age = 30;\n    printf("J\'ai %d ans\\n", age);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/int\s+age\s*=/.test(ctx.code)) return { ok: false, message: 'Déclare la variable avec son type : <code>int age = 30;</code>' };
        if (!/%d/.test(ctx.code)) return { ok: false, message: 'Utilise le trou <code>%d</code> dans ton texte, et passe <code>age</code> en second argument de printf.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || !/J'ai 30 ans/.test(l[0])) return { ok: false, message: 'Attendu <code>J\'ai 30 ans</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Le %d est remplacé par la valeur de la variable au moment de l\'affichage.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> déclare un <code>double prix</code> valant <code>19.99</code> et affiche <code>Prix : 19.99 euros</code> avec exactement <strong>deux décimales</strong>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Un nombre à virgule n’a pas le même trou qu’un entier — et il faut en plus préciser combien de décimales afficher.",
        "Le trou d’un <code>double</code> est <code>%f</code>. Un point suivi d’un chiffre, glissé entre les deux, fixe le nombre de décimales.",
        "<code>printf(\"Prix : %.2f euros\\n\", prix);</code>"
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    double prix = 19.99;\n    printf("Prix : %.2f euros\\n", prix);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/double\s+prix/.test(ctx.code)) return { ok: false, message: 'Déclare <code>double prix = 19.99;</code> — un nombre à virgule ne rentre pas dans un int.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (/19\.990000/.test(l[0])) return { ok: false, message: 'Six décimales s\'affichent : c\'est le comportement de <code>%f</code> tout seul. Précise le nombre de décimales avec <code>%.2f</code>.' };
        if (l[0] !== 'Prix : 19.99 euros') return { ok: false, message: 'Attendu exactement <code>Prix : 19.99 euros</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: '%.2f est le format des prix. Sans la précision, le C affiche six décimales par défaut.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Défi :</strong> déclare les trois types à la fois — un <code>int</code> <code>annee</code> (2024), un <code>double</code> <code>note</code> (8.5) et un <code>char</code> <code>categorie</code> (<code>\'A\'</code>) — et affiche <code>2024 - 8.5 - A</code> en une seule ligne de printf.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Trois valeurs de trois types différents dans un seul <code>printf</code> : chacune a son propre trou, et l’ordre compte.",
        "<code>%d</code> pour l’entier, <code>%.1f</code> pour le décimal, <code>%c</code> pour le caractère. Les variables suivent dans le même ordre que les trous.",
        "<code>printf(\"%d - %.1f - %c\\n\", annee, note, categorie);</code> — le <code>char</code> se déclare entre apostrophes simples."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int annee = 2024;\n    double note = 8.5;\n    char categorie = \'A\';\n    printf("%d - %.1f - %c\\n", annee, note, categorie);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/char\s+categorie/.test(ctx.code)) return { ok: false, message: 'Déclare <code>char categorie = \'A\';</code> — avec des apostrophes simples, pas des guillemets.' };
        if ((ctx.code.match(/printf/g) || []).length > 1) return { ok: false, message: 'Le défi demande UN seul printf contenant les trois trous.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== '2024 - 8.5 - A') return { ok: false, message: 'Attendu exactement <code>2024 - 8.5 - A</code> — tu affiches « ' + (l[0] || '(rien)') + ' ». Vérifie l\'ordre des valeurs après le texte.' };
        return { ok: true, message: 'Trois types, trois symboles, un seul printf. Tu viens de comprendre le mécanisme le plus utilisé du langage C.' };
      }
    }
  ]
},

/* ---------- c-3 ---------- */
{
  id: 'c-3',
  titre: 'Calculs et le piège de la division',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Les opérateurs sont ceux de partout : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>. Mais le C réserve un piège majeur, et c'est le genre de piège qui ne lève aucune erreur.</p>

<h2>La division entière</h2>
<pre class="bloc-code">int a = 7, b = 2;
printf("%d\n", a / b);   // 3, PAS 3.5
printf("%d\n", a % b);   // 1, le reste</pre>
<p>Mesuré : <code>3</code> puis <code>1</code>. La raison est simple une fois dite : <code>a</code> et <code>b</code> sont des <code>int</code>, donc le C fait une division <strong>d'entiers</strong>, et le résultat est un entier. La partie décimale est jetée, pas arrondie.</p>
<p>C'est le type des opérandes qui décide, pas celui de la variable qui reçoit. Écrire <code>double r = a / b;</code> donne <code>3.0</code> : le calcul faux a déjà eu lieu avant l'affectation.</p>

<h2>Forcer le décimal</h2>
<pre class="bloc-code">printf("%.2f\n", (double) a / b);   // 3.50</pre>
<p>Mesuré. Le <code>(double)</code> devant est une <strong>conversion explicite</strong> : il transforme <code>a</code> en décimal <em>avant</em> la division, ce qui suffit à faire basculer tout le calcul. Convertir un seul des deux opérandes suffit.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Résultat</th><th>Pourquoi</th></tr>
<tr><td><code>7 / 2</code></td><td>3</td><td>deux entiers : division entière</td></tr>
<tr><td><code>7 % 2</code></td><td>1</td><td>le reste</td></tr>
<tr><td><code>(double) 7 / 2</code></td><td>3.5</td><td>un décimal suffit à tout changer</td></tr>
<tr><td><code>7.0 / 2</code></td><td>3.5</td><td>même chose, écrit autrement</td></tr>
</table>

<h2>Les raccourcis</h2>
<p><code>x += 5</code>, <code>x -= 2</code>, <code>x *= 3</code> fonctionnent. Et contrairement à Python, <strong><code>x++</code> existe</strong> — c'est même du C qu'il vient, et que tous les autres langages l'ont emprunté.</p>

<h2>Les pièges</h2>
<p><strong>La division entière non voulue.</strong> C'est le bug numéro un du C débutant : une moyenne qui tombe toujours juste, un pourcentage qui vaut 0. Aucune erreur, un résultat faux et plausible.</p>
<p><strong>Croire que le type de destination suffit.</strong> <code>double moyenne = somme / nombre;</code> avec deux entiers donne un résultat déjà tronqué. La conversion doit avoir lieu <em>dans</em> le calcul.</p>
<p><strong>Diviser par zéro.</strong> Le cours arrête le programme : <em>« division par zéro : impossible. »</em> Sur une vraie machine, le comportement est pire — le programme s'arrête brutalement, sans explication.</p>
<p><strong>Oublier que <code>%</code> ne marche qu'entre entiers.</strong> Le reste d'une division de décimaux n'existe pas en C.</p>

<h2>Dans la vraie vie</h2>
<p>La division entière n'est pas un défaut : c'est exactement ce qu'on veut pour répartir des objets en paquets, calculer une page, convertir des secondes en minutes. <code>/</code> et <code>%</code> ensemble donnent le quotient et le reste — le couple le plus utile de toute l'arithmétique du programmeur.</p>

<div class="a-retenir">
<ul>
<li>Entre deux entiers, <code>/</code> donne un <strong>entier</strong> : 7 / 2 vaut 3.</li>
<li>C'est le type des opérandes qui décide, pas celui de la destination.</li>
<li><code>(double)</code> devant un opérande fait basculer tout le calcul.</li>
<li><code>%</code> donne le reste, et n'existe qu'entre entiers.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le débordement silencieux</summary>
<p>Un <code>int</code> tient sur quatre octets, soit un maximum d'environ deux milliards. Le dépasser ne provoque aucune erreur : la valeur « repart » brutalement dans les négatifs. C'est ce qu'on appelle un débordement, et il a causé de vraies catastrophes — dont la perte d'une fusée Ariane en 1996. Python, lui, n'a pas de limite ; le C, si, et il ne te prévient pas.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Affiche le résultat de <code>7 / 2</code> avec deux <code>int</code>, puis le vrai résultat décimal sur une seconde ligne. Tu dois voir <code>3</code> puis <code>3.50</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int a = 7;\n    int b = 2;\n    \n    return 0;\n}',
      indices: [
        "Deux <code>int</code> divisés donnent un <code>int</code> : la partie décimale est jetée avant même que tu puisses la voir.",
        "Pour obtenir le vrai résultat, il faut qu’au moins l’un des deux soit un décimal <strong>au moment de la division</strong>. On force cela avec une conversion.",
        "<code>printf(\"%d\\n\", a / b);</code> puis <code>printf(\"%.2f\\n\", (double)a / b);</code>"
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int a = 7;\n    int b = 2;\n    printf("%d\\n", a / b);\n    printf("%.2f\\n", (double)a / b);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes : le résultat entier puis le résultat décimal.' };
        if (l[0] !== '3') return { ok: false, message: 'La première ligne doit afficher <code>3</code> (division entre deux int). Tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '3.50') return { ok: false, message: 'La seconde ligne doit afficher <code>3.50</code>. Utilise <code>(double)a / b</code> et le format <code>%.2f</code>. Tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: '3 puis 3.50 : la même division, deux résultats. C\'est le type des opérandes qui décide, pas le format d\'affichage.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> 17 bonbons, 5 enfants. Affiche la part de chacun puis le reste — deux lignes, <code>3</code> puis <code>2</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int bonbons = 17;\n    int enfants = 5;\n    \n    return 0;\n}',
      indices: [
        "Ici, la division entière n’est pas un piège : c’est exactement ce qu’on veut. Reste à obtenir ce qui ne se partage pas.",
        "<code>/</code> donne la part, <code>%</code> donne le reste. Mais attention dans un <code>printf</code> : le <code>%</code> y a déjà un sens.",
        "Pour afficher un vrai signe pourcent, on écrit <code>%%</code>. Le reste, lui, s’obtient avec <code>bonbons % enfants</code>."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int bonbons = 17;\n    int enfants = 5;\n    printf("%d\\n", bonbons / enfants);\n    printf("%d\\n", bonbons % enfants);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes : la part puis le reste.' };
        if (l[0] !== '3') return { ok: false, message: 'La part de chaque enfant est 3. Tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '2') return { ok: false, message: 'Le reste est 2 — c\'est l\'opérateur modulo <code>%</code>. Tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'En Python il fallait <code>//</code> pour la division entière ; en C, entre deux int, c\'est le comportement par défaut.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Chasse au bug :</strong> ce programme calcule une moyenne et affiche <code>0.00</code> au lieu de <code>13.50</code>. Lance-le pour voir, puis répare-le sans changer les valeurs.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int total = 27;\n    int nombre = 2;\n    double moyenne = total / nombre;\n    printf("%.2f\\n", moyenne);\n    return 0;\n}',
      indices: [
        "<code>0.00</code>, ce n’est pas un problème d’affichage : la décimale a déjà été perdue avant d’arriver dans le <code>double</code>.",
        "La division se fait entre deux <code>int</code>, donc 27/2 vaut 13 — et c’est 13 qu’on range dans le <code>double</code>. La conversion arrive trop tard.",
        "Il faut convertir <strong>avant</strong> de diviser : <code>(double)total / nombre</code>."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int total = 27;\n    int nombre = 2;\n    double moyenne = (double)total / nombre;\n    printf("%.2f\\n", moyenne);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0] === '13.00') return { ok: false, message: 'Presque : tu obtiens 13.00, donc la division s\'est encore faite entre deux entiers. Le double ne récupère qu\'un résultat déjà tronqué — il faut convertir AVANT la division : <code>(double)total / nombre</code>.' };
        if (l[0] !== '13.50') return { ok: false, message: 'Attendu <code>13.50</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Le bug le plus vicieux du C : aucune erreur, aucun avertissement, juste un résultat faux. Ranger dans un double ne suffit pas — la perte a lieu pendant le calcul.' };
      }
    }
  ]
},

/* ---------- c-4 ---------- */
{
  id: 'c-4',
  titre: 'Les conditions',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Bonne nouvelle : la syntaxe du <code>if</code> en C est celle que tu connais déjà par JavaScript. Parenthèses autour de la condition, accolades autour du bloc.</p>
<pre class="bloc-code">int note = 15;
if (note &gt;= 10) {
    printf("Recu\n");
} else {
    printf("Recale\n");
}</pre>
<p>Ce n'est pas un hasard : JavaScript, Java, C++ et beaucoup d'autres ont copié la syntaxe du C. L'apprendre ici, c'est l'apprendre pour la moitié des langages du monde.</p>

<h2>Les comparaisons</h2>
<p><code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>. Et les opérateurs logiques s'écrivent avec des symboles : <code>&amp;&amp;</code> pour « et », <code>||</code> pour « ou », <code>!</code> pour « non ».</p>

<h2>Il n'y a pas de booléen</h2>
<p>C'est la particularité à retenir. En C, <strong>zéro est faux, tout le reste est vrai</strong>. Une condition n'a pas besoin d'être une comparaison :</p>
<pre class="bloc-code">int n = 5;
if (n) { ... }   // vrai, puisque n n'est pas zero</pre>
<p>C'est commode, et c'est à l'origine du piège le plus célèbre du langage.</p>

<h2>Pas à pas : un seul égal</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Ce qui se passe</th></tr>
<tr><td><code>if (n == 5)</code></td><td>compare, et la condition vaut vrai ou faux</td></tr>
<tr><td><code>if (n = 5)</code></td><td>range 5 dans <code>n</code>, puis évalue… <strong>5</strong></td></tr>
<tr><td>résultat</td><td>5 n'est pas zéro, donc la condition est <strong>toujours vraie</strong></td></tr>
</table>
<p>Et <code>n</code> a changé au passage. Deux bugs d'un coup, aucune erreur, exactement comme en JavaScript — sauf qu'ici c'est le langage d'origine. Un compilateur moderne émet un avertissement, mais compile quand même.</p>

<h2>Le switch</h2>
<p><code>switch</code> existe aussi, avec le même piège qu'ailleurs : sans <code>break</code>, l'exécution coule dans les cas suivants.</p>

<h2>Les pièges</h2>
<p><strong>Écrire <code>=</code> au lieu de <code>==</code>.</strong> Le piège emblématique du C. Certains développeurs écrivent par prudence <code>if (5 == n)</code> — ainsi, une faute de frappe donne une erreur de compilation au lieu d'un bug silencieux.</p>
<p><strong>Mettre un point-virgule après le <code>if</code>.</strong> <code>if (n &gt; 3);</code> termine l'instruction sur place : le bloc qui suit s'exécute toujours. Rien ne le signale.</p>
<p><strong>Omettre les accolades.</strong> Sans elles, seule la <em>première</em> ligne appartient au <code>if</code>. Ajouter une seconde ligne plus tard introduit un bug invisible. Mets-les toujours.</p>
<p><strong>Comparer des décimaux avec <code>==</code>.</strong> Les calculs à virgule accumulent de minuscules écarts : deux valeurs « égales » peuvent différer à la quinzième décimale. On compare un écart à un seuil.</p>

<h2>Dans la vraie vie</h2>
<p>Le style d'accolades du C — ouverte en fin de ligne, fermée seule — est devenu la norme dans une grande partie du métier. Les querelles à ce sujet ont fait couler beaucoup d'encre ; l'essentiel est de s'en tenir à un seul style par projet.</p>

<div class="a-retenir">
<ul>
<li>Même syntaxe qu'en JavaScript : c'est le C qui l'a inventée.</li>
<li>Pas de booléen : <strong>zéro est faux, tout le reste est vrai</strong>.</li>
<li><code>if (n = 5)</code> range au lieu de comparer, et la condition est toujours vraie.</li>
<li>Un point-virgule après le <code>if</code> vide la condition de son effet.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le vrai booléen, quand même</summary>
<p>Depuis 1999, le C propose <code>#include &lt;stdbool.h&gt;</code>, qui ajoute un type <code>bool</code> et les mots <code>true</code> et <code>false</code>. Ce sont en réalité des entiers déguisés — 1 et 0 — mais le code devient nettement plus lisible. Beaucoup de projets anciens continuent pourtant d'utiliser des <code>int</code>, par habitude autant que par compatibilité.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'La note vaut 15. Écris un <code>if</code>/<code>else</code> : si <code>note >= 10</code>, affiche <code>Reçu</code>, sinon <code>Recalé</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int note = 15;\n    \n    return 0;\n}',
      indices: [
        "La condition va entre parenthèses, et chaque branche entre accolades. Contrairement à Python, le décalage ne compte pas : ce sont les accolades qui décident.",
        "« Supérieur ou égal » s’écrit <code>&gt;=</code>. Le <code>else</code> se place après l’accolade fermante du <code>if</code>.",
        "<code>if (note &gt;= 10) { printf(\"Reçu\\n\"); } else { printf(\"Recalé\\n\"); }</code>"
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int note = 15;\n    if (note >= 10) {\n        printf("Reçu\\n");\n    } else {\n        printf("Recalé\\n");\n    }\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/if\s*\(/.test(ctx.code)) return { ok: false, message: 'Il faut un <code>if (condition)</code> avec la condition entre parenthèses.' };
        if (!/else/.test(ctx.code)) return { ok: false, message: 'Ajoute le cas contraire avec <code>else</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.some(x => /Reçu/.test(x))) return { ok: false, message: 'Avec note = 15, « Reçu » devrait s\'afficher. Vérifie ta condition.' };
        if (l.some(x => /Recalé/.test(x))) return { ok: false, message: 'Les deux messages s\'affichent ! Le second printf doit être DANS le bloc du else, entre ses accolades.' };
        return { ok: true, message: 'Même logique qu\'en JavaScript, avec les mêmes parenthèses et accolades. Tu es en terrain connu.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> avec <code>note = 14</code>, affiche la mention exacte : <code>Très bien</code> si ≥ 16, <code>Bien</code> si ≥ 12, <code>Passable</code> si ≥ 10, sinon <code>Insuffisant</code>. Une seule ligne doit s\'afficher.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int note = 14;\n    \n    return 0;\n}',
      indices: [
        "Quatre cas, et l’ordre décide de tout. Demande-toi ce qui arriverait à un 17 si tu testais d’abord « au moins 10 ».",
        "Dès qu’une condition est vraie, les suivantes sont ignorées. Il faut donc commencer par le seuil le plus exigeant, et descendre.",
        "<code>if (note &gt;= 16)</code>, puis <code>else if (note &gt;= 12)</code>, <code>&gt;= 10</code>, et un <code>else</code> final."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int note = 14;\n    if (note >= 16) {\n        printf("Très bien\\n");\n    } else if (note >= 12) {\n        printf("Bien\\n");\n    } else if (note >= 10) {\n        printf("Passable\\n");\n    } else {\n        printf("Insuffisant\\n");\n    }\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/else\s+if/.test(ctx.code)) return { ok: false, message: 'Utilise des <code>else if</code> pour enchaîner les cas.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 1) return { ok: false, message: 'Une seule ligne doit s\'afficher — j\'en compte ' + l.length + '. Si tu as plusieurs if indépendants, remplace-les par des <code>else if</code>.' };
        if (l[0] !== 'Bien') return { ok: false, message: 'Avec 14, la mention est « Bien ». Tu affiches « ' + l[0] + ' » — vérifie l\'ordre de tes conditions.' };
        return { ok: true, message: 'Le premier cas vrai gagne, les autres sont ignorés. C\'est pour ça que l\'ordre doit aller du plus exigeant au moins exigeant.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Chasse au bug célèbre :</strong> ce programme affiche « Majeur » alors que l\'âge est 15. Trouve pourquoi et corrige.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int age = 15;\n    if (age = 18) {\n        printf("Majeur\\n");\n    } else {\n        printf("Mineur\\n");\n    }\n    return 0;\n}',
      indices: [
        "Le programme affiche « Majeur » alors que l’âge est 15 : la condition est donc vraie alors qu’elle ne devrait pas l’être. Regarde-la de très près.",
        "Un seul <code>=</code> <strong>range</strong> une valeur dans la variable, et c’est le résultat de ce rangement qui sert de condition. Pour comparer, il en faut deux.",
        "<code>if (age == 18)</code> — deux signes égal, collés."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int age = 15;\n    if (age == 18) {\n        printf("Majeur\\n");\n    } else {\n        printf("Mineur\\n");\n    }\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0] === 'Majeur') return { ok: false, message: 'Toujours « Majeur ». La condition contient encore <code>age = 18</code> : ça range 18 dans age, et 18 n\'est pas zéro donc c\'est vrai. Il faut <code>==</code>.' };
        if (l[0] !== 'Mineur') return { ok: false, message: 'Attendu « Mineur » (15 n\'est pas 18). Tu affiches « ' + l[0] + ' ».' };
        if (/age\s*=\s*18/.test(ctx.code.replace(/==/g, '#'))) return { ok: false, message: 'Il reste une affectation <code>age = 18</code> quelque part.' };
        return { ok: true, message: 'Ce bug a coûté des millions à l\'industrie logicielle. Le C ne t\'avertira jamais : à toi de compter les signes égal.' };
      }
    }
  ]
},

/* ---------- c-5 ---------- */
{
  id: 'c-5',
  titre: 'Les boucles',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Les boucles du C sont celles que tu connais déjà par JavaScript — et pour la même raison qu'au chapitre précédent : c'est d'ici qu'elles viennent.</p>

<h2>La boucle for</h2>
<pre class="bloc-code">for (int i = 0; i &lt; 5; i++) {
    printf("%d\n", i);
}</pre>
<p>Trois parties séparées par des points-virgules :</p>
<ul>
<li><code>int i = 0</code> — le <strong>départ</strong>, exécuté une seule fois ;</li>
<li><code>i &lt; 5</code> — la <strong>condition</strong>, testée avant chaque tour ;</li>
<li><code>i++</code> — le <strong>pas</strong>, exécuté après chaque tour.</li>
</ul>
<p>Mesuré : la boucle affiche 0, 1, 2 — cinq tours pour <code>i &lt; 5</code> en partant de zéro.</p>

<h2>while et do-while</h2>
<pre class="bloc-code">int i = 0;
while (i &lt; 3) { printf("%d\n", i); i++; }

do { printf("au moins une fois\n"); } while (0);</pre>
<p><code>while</code> teste <em>avant</em> ; <code>do-while</code> teste <em>après</em>, et s'exécute donc toujours au moins une fois. Le second est rare, et c'est précisément pour ce cas qu'il existe : un menu qu'on affiche avant de demander si l'on recommence.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Moment</th><th>Ce qui se passe</th></tr>
<tr><td>avant le 1er tour</td><td><code>int i = 0</code> — une seule fois</td></tr>
<tr><td>début de chaque tour</td><td>on teste <code>i &lt; 5</code></td></tr>
<tr><td>fin de chaque tour</td><td><code>i++</code>, puis on reteste</td></tr>
<tr><td>condition fausse</td><td>on sort, <code>i</code> vaut 5</td></tr>
</table>
<p>Retiens l'ordre : le pas s'exécute <strong>après</strong> le corps, pas avant. C'est ce qui explique qu'<code>i</code> vaille 5 à la sortie et non 4.</p>

<h2>break et continue</h2>
<p><code>break</code> sort immédiatement de la boucle ; <code>continue</code> saute au tour suivant. Les deux servent, et les deux doivent rester rares : une boucle avec trois <code>break</code> est une boucle dont la condition est mal posée.</p>

<h2>Les pièges</h2>
<p><strong>Le décalage d'un tour.</strong> <code>i &lt;= 5</code> en partant de 0 fait six tours, pas cinq. Sur un tableau de cinq cases, le sixième passage lit une case qui n'existe pas.</p>
<p><strong>Oublier de faire avancer le compteur.</strong> Le cours arrête le programme : <em>« ton programme tourne sans s'arrêter (boucle infinie ?). Vérifie la condition de ta boucle et que la variable de contrôle évolue bien. »</em> Un vrai programme, lui, fige la machine.</p>
<p><strong>Mettre un point-virgule après le <code>for</code>.</strong> <code>for (...);</code> fait tourner une boucle vide, puis exécute le bloc une seule fois. Le symptôme est déroutant et la cause invisible.</p>
<p><strong>Déclarer le compteur hors de la boucle sans raison.</strong> <code>for (int i = ...)</code> limite <code>i</code> à la boucle, ce qui évite de le réutiliser par accident plus loin.</p>

<h2>Dans la vraie vie</h2>
<p>La forme <code>for (int i = 0; i &lt; n; i++)</code> est sans doute la ligne la plus écrite de toute l'histoire de l'informatique. La reconnaître d'un coup d'œil, et savoir dire combien de tours elle fait, fait partie des réflexes de base du métier.</p>

<div class="a-retenir">
<ul>
<li><code>for (depart; condition; pas)</code> — le pas s'exécute <strong>après</strong> le corps.</li>
<li><code>while</code> teste avant, <code>do-while</code> après : lui s'exécute au moins une fois.</li>
<li><code>i &lt; n</code> fait n tours ; <code>i &lt;= n</code> en fait n+1.</li>
<li>Une boucle dont rien ne fait avancer la condition ne s'arrête jamais.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : i++ ou ++i ?</summary>
<p>Les deux ajoutent 1. La différence est la valeur <em>rendue</em> : <code>i++</code> rend l'ancienne, <code>++i</code> la nouvelle. Dans un <code>for</code>, cette valeur n'est utilisée par personne, donc les deux sont rigoureusement équivalents — malgré ce qu'on lit parfois. La distinction ne compte que lorsqu'on utilise le résultat dans la même expression, ce qu'il vaut mieux éviter.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Affiche les nombres de 1 à 5 séparés par un espace, sur une seule ligne, avec une boucle <code>for</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    printf("\\n");\n    return 0;\n}',
      indices: [
        "Une boucle <code>for</code> a trois parties séparées par des points-virgules : d’où l’on part, jusqu’où l’on va, et comment on avance.",
        "Pour inclure 5, la condition doit être « inférieur ou égal ». Et comme tout tient sur une ligne, le <code>\\n</code> ne va pas dans la boucle.",
        "<code>for (int i = 1; i &lt;= 5; i++) { printf(\"%d \", i); }</code> puis un <code>printf(\"\\n\")</code> après."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d ", i);\n    }\n    printf("\\n");\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/for\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise une boucle <code>for</code>, pas cinq printf écrits à la main.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        const nombres = l[0].trim().split(/\s+/).join(' ');
        if (nombres === '1 2 3 4') return { ok: false, message: 'Le 5 manque : ta condition s\'arrête trop tôt. Avec <code>i < 5</code> la boucle s\'arrête à 4 — il faut <code>i <= 5</code>.' };
        if (nombres === '0 1 2 3 4') return { ok: false, message: 'Tu pars de 0 : commence à <code>int i = 1</code>.' };
        if (nombres !== '1 2 3 4 5') return { ok: false, message: 'Attendu <code>1 2 3 4 5</code> — tu affiches « ' + l[0].trim() + ' ».' };
        return { ok: true, message: 'Départ, condition, pas : les trois réglages d\'une boucle for, tous visibles sur une ligne.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> affiche la table de 7, de <code>7 x 1 = 7</code> jusqu\'à <code>7 x 10 = 70</code>, une ligne par résultat.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Une seule ligne de code, répétée dix fois avec une valeur qui change. Et le résultat doit être calculé, pas écrit à la main.",
        "Deux valeurs à afficher dans la même phrase, donc deux trous <code>%d</code> — l’un pour le compteur, l’autre pour le produit.",
        "<code>printf(\"7 x %d = %d\\n\", i, 7 * i);</code>"
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 10; i++) {\n        printf("7 x %d = %d\\n", i, 7 * i);\n    }\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/for\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise une boucle <code>for</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 10) return { ok: false, message: 'J\'attends 10 lignes — j\'en compte ' + l.length + '.' };
        if (l[0].trim() !== '7 x 1 = 7') return { ok: false, message: 'La première ligne doit être exactement <code>7 x 1 = 7</code>. Tu affiches « ' + l[0].trim() + ' ».' };
        if (l[9].trim() !== '7 x 10 = 70') return { ok: false, message: 'La dernière ligne doit être <code>7 x 10 = 70</code>. Tu affiches « ' + l[9].trim() + ' ».' };
        return { ok: true, message: 'Deux trous dans le même texte, remplis dans l\'ordre. Tu maîtrises printf.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Défi :</strong> calcule la somme des nombres de 1 à 100 avec une boucle et affiche-la. (Le résultat est 5050 — mais c\'est la boucle qui doit le trouver, pas toi.)',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int somme = 0;\n    \n    return 0;\n}',
      indices: [
        "Le motif de l’accumulateur : une variable qui garde le total, déclarée <strong>avant</strong> la boucle.",
        "Dans la boucle, on ajoute le compteur au total. L’affichage vient après l’accolade fermante — sinon il sortirait cent fois.",
        "<code>somme += i;</code> dans la boucle, puis un <code>printf</code> après."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int somme = 0;\n    for (int i = 1; i <= 100; i++) {\n        somme += i;\n    }\n    printf("%d\\n", somme);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'Le total doit venir d\'une boucle.' };
        if (/5050/.test(ctx.code)) return { ok: false, message: 'Le résultat ne doit pas être écrit dans le code : c\'est la boucle qui doit le calculer.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '5050') return { ok: false, message: 'Attendu <code>5050</code> — tu affiches « ' + (l[0] || '(rien)') + ' ». Vérifie que le printf est bien APRÈS la boucle, et que tu pars de somme = 0.' };
        return { ok: true, message: 'L\'accumulateur, encore et toujours : le même motif qu\'en JavaScript et en Python, avec juste des accolades en plus.' };
      }
    }
  ]
},

/* ---------- c-6 ---------- */
{
  id: 'c-6',
  titre: 'Les tableaux',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un tableau en C, c'est une suite de cases <strong>de même type, collées en mémoire</strong>. Cette contiguïté n'est pas un détail d'implémentation : c'est ce qui rend l'accès instantané, et c'est aussi ce qui explique tout le reste du comportement des tableaux.</p>
<p>Conséquence directe : <strong>la taille est fixée à la déclaration et ne changera jamais</strong>. Pas de <code>append</code>, pas de liste qui grandit. Le C réserve un bloc, et ce bloc est ce qu'il est.</p>

<h2>Déclarer et remplir</h2>
<pre class="bloc-code">int notes[5];                          // 5 cases, contenu indetermine
int notes[5] = {12, 15, 9, 18, 14};    // 5 cases remplies
int notes[] = {12, 15, 9};             // la taille se deduit : 3

printf("%d\n", notes[0]);              // la premiere
notes[2] = 20;                          // on remplace</pre>
<p>Indices à partir de 0, comme partout ailleurs. Et une case se lit comme elle s'écrit.</p>

<h2>Pas à pas : parcourir</h2>
<pre class="bloc-code">int t[3] = {1, 2, 3};
for (int i = 0; i &lt; 3; i++) printf("%d ", t[i]);</pre>
<p>Mesuré : <code>1 2 3</code>. Remarque le <code>3</code> écrit en dur dans la condition — le C ne sait pas dire la longueur d'un tableau. Il faut la connaître, ou la transporter soi-même.</p>
<table class="memo-table trace">
<tr><th>Ce qu'on veut</th><th>En C</th></tr>
<tr><td>la première case</td><td><code>t[0]</code></td></tr>
<tr><td>la dernière de 5</td><td><code>t[4]</code></td></tr>
<tr><td>la longueur</td><td><strong>à retenir soi-même</strong></td></tr>
</table>

<h2>Sortir des bornes</h2>
<p>Mesuré sur un tableau de trois cases, en lisant <code>t[7]</code> : le cours arrête le programme avec <em>« tu essaies d'accéder à la case 7 d'un tableau qui a 3 cases (numérotées de 0 à 2). »</em></p>
<p><strong>Un vrai compilateur C ne dirait rien.</strong> Il lirait ce qui se trouve en mémoire juste après le tableau — une autre variable, un morceau de code, n'importe quoi — et continuerait comme si de rien n'était. Le cours te protège ici d'une erreur qui, ailleurs, est à l'origine d'une bonne part des failles de sécurité du monde réel.</p>

<h2>Les pièges</h2>
<p><strong>Dépasser d'une case.</strong> <code>i &lt;= 5</code> sur un tableau de 5. Le piège est double : ici tu es averti, ailleurs tu ne le seras pas.</p>
<p><strong>Croire qu'un tableau connaît sa taille.</strong> Il ne la connaît pas. Dès qu'un tableau voyage vers une fonction, il faut lui passer la longueur à côté.</p>
<p><strong>Vouloir l'agrandir.</strong> Impossible. Il faut en déclarer un plus grand et recopier — ou allouer dynamiquement, ce qui est un autre sujet.</p>
<p><strong>Oublier d'initialiser.</strong> <code>int t[5];</code> sans valeurs contient ici des zéros, mais ailleurs n'importe quoi.</p>

<h2>Dans la vraie vie</h2>
<p>Les dépassements de tableau sont la famille de bugs la plus coûteuse de l'histoire de l'informatique — on parle de <em>débordement de tampon</em>, et c'est le mécanisme de la majorité des grandes failles de sécurité depuis trente ans. Les langages modernes vérifient les bornes à chaque accès ; le C a choisi la vitesse.</p>

<div class="a-retenir">
<ul>
<li>Un tableau est une suite de cases <strong>collées</strong>, de taille <strong>fixe</strong>.</li>
<li>Il ne connaît pas sa longueur : on la transporte à côté.</li>
<li>Sortir des bornes est signalé ici — et silencieux sur un vrai compilateur.</li>
<li>On ne peut pas l'agrandir.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le nom d'un tableau est une adresse</summary>
<p>Écrire <code>t</code> tout seul ne donne pas le tableau mais l'<strong>adresse de sa première case</strong>. C'est pour cela qu'un tableau passé à une fonction peut y être modifié, alors qu'un entier ne le peut pas : on n'a pas copié les cases, on a copié une adresse. Cette équivalence entre tableau et pointeur est l'une des idées centrales du C, et la leçon sur les pointeurs va la rendre limpide.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Crée un tableau <code>notes</code> contenant 12, 15, 9, 18, 14 puis affiche la <strong>première</strong> et la <strong>dernière</strong> note, sur deux lignes.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Un tableau se déclare avec des crochets et se remplit entre accolades. Les cases, elles, se comptent à partir de 0.",
        "Avec 5 notes, les positions vont de 0 à 4. La dernière n’est donc pas <code>notes[5]</code>.",
        "<code>int notes[] = {12, 15, 9, 18, 14};</code>, puis <code>notes[0]</code> et <code>notes[4]</code>."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    printf("%d\\n", notes[0]);\n    printf("%d\\n", notes[4]);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes : la première note puis la dernière.' };
        if (l[0].trim() !== '12') return { ok: false, message: 'La première note est 12, à l\'indice <strong>0</strong>. Tu affiches « ' + l[0].trim() + ' ».' };
        if (l[1].trim() !== '14') return { ok: false, message: 'La dernière note est 14, à l\'indice <strong>4</strong> (et non 5 : un tableau de 5 cases va de 0 à 4). Tu affiches « ' + l[1].trim() + ' ».' };
        return { ok: true, message: 'Cinq cases numérotées de 0 à 4. Ce décalage d\'un cran est la source d\'innombrables bugs — il finit par devenir un réflexe.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> parcours le tableau avec une boucle et affiche la <strong>somme</strong> des 5 notes (68).',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    int somme = 0;\n    \n    return 0;\n}',
      indices: [
        "Parcourir un tableau, c’est parcourir ses <strong>positions</strong> : de 0 jusqu’à la taille moins un.",
        "Un accumulateur déclaré avant la boucle, qu’on augmente de <code>notes[i]</code> à chaque tour. L’affichage vient après.",
        "<code>for (int i = 0; i &lt; 5; i++) { somme += notes[i]; }</code>"
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    int somme = 0;\n    for (int i = 0; i < 5; i++) {\n        somme += notes[i];\n    }\n    printf("%d\\n", somme);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'La somme doit venir d\'une boucle qui parcourt le tableau.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '68') return { ok: false, message: 'Attendu <code>68</code> (12+15+9+18+14) — tu affiches « ' + (l[0] || '(rien)') + ' ». Attention : la boucle doit aller de 0 à 4 inclus, donc <code>i < 5</code>.' };
        return { ok: true, message: 'Tableau plus boucle plus accumulateur : le trio de base du traitement de données, identique dans tous les langages.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Défi :</strong> trouve la <strong>meilleure note</strong> du tableau sans l\'écrire à la main, et affiche-la.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    int max = notes[0];\n    \n    return 0;\n}',
      indices: [
        "On garde le meilleur vu jusqu’ici, et on le remplace dès qu’on trouve mieux. Une seule variable suffit.",
        "Pars de la <strong>première note</strong> plutôt que de 0 : si toutes les notes étaient négatives, partir de 0 donnerait un résultat faux.",
        "<code>if (notes[i] &gt; max) { max = notes[i]; }</code> dans la boucle."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    int max = notes[0];\n    for (int i = 1; i < 5; i++) {\n        if (notes[i] > max) {\n            max = notes[i];\n        }\n    }\n    printf("%d\\n", max);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/if\s*\(/.test(ctx.code)) return { ok: false, message: 'Il faut un <code>if</code> dans la boucle pour comparer chaque note au maximum courant.' };
        if (/\b18\b/.test(ctx.code.replace(/\{[^}]*18[^}]*\}/, ''))) { /* 18 est dans le tableau, c'est normal */ }
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '18') return { ok: false, message: 'Attendu <code>18</code> — tu affiches « ' + (l[0] || '(rien)') + ' ». Vérifie que tu compares bien <code>notes[i] > max</code> et que tu mets à jour max.' };
        return { ok: true, message: 'Le C n\'a pas de fonction max() toute prête pour les tableaux : c\'est à toi de l\'écrire. C\'est le prix de la simplicité du langage — et une excellente gymnastique.' };
      }
    }
  ]
},

/* ---------- c-7 ---------- */
{
  id: 'c-7',
  titre: 'Les fonctions',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une fonction C ressemble beaucoup à ce que tu connais, avec une nouveauté : il faut annoncer <strong>le type de ce qu'elle renvoie</strong>.</p>
<pre class="bloc-code">int carre(int x) {
    return x * x;
}

int main() {
    printf("%d\n", carre(7));   // 49
    return 0;
}</pre>
<p>Mesuré : 49. Le premier <code>int</code> est le type de retour, le second celui du paramètre. Pour une fonction qui ne renvoie rien, on écrit <code>void</code>.</p>
<p>Cette obligation sert au compilateur : il vérifie, au moment de la compilation, que tu utilises le résultat correctement. C'est une erreur attrapée avant la première exécution.</p>

<h2>L'ordre compte</h2>
<p>Une fonction doit être <strong>connue avant d'être appelée</strong>. On la place donc au-dessus de <code>main</code> — ou l'on déclare sa signature en haut du fichier :</p>
<pre class="bloc-code">int carre(int x);          // le prototype : on annonce
int main() { ... }          // on peut l'appeler
int carre(int x) { ... }    // on definit plus bas</pre>
<p>Le <strong>prototype</strong> est une particularité du C. Il permet d'organiser le fichier librement, et c'est ce qu'on trouve dans les fichiers d'en-tête — <code>stdio.h</code> n'est rien d'autre qu'une longue liste de prototypes.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td><code>carre(7)</code></td><td>7 est <strong>copié</strong> dans le paramètre <code>x</code></td></tr>
<tr><td>le corps s'exécute</td><td>avec sa propre copie, isolée</td></tr>
<tr><td><code>return x * x</code></td><td>la valeur sort, la fonction se termine</td></tr>
<tr><td>de retour dans main</td><td>la variable d'origine n'a pas bougé</td></tr>
</table>
<p>Retiens le premier point : <strong>les arguments sont copiés</strong>. C'est le comportement par défaut du C, sans exception — et c'est précisément le problème que les pointeurs viennent résoudre.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le type de retour.</strong> Le cours refuse : <em>« je ne comprends pas cette partie du programme. Au premier niveau, on attend des fonctions, des variables globales ou une classe. »</em> Sans type, ce n'est pas une déclaration de fonction valide.</p>
<p><strong>Oublier le <code>return</code>.</strong> Une fonction annoncée <code>int</code> qui ne renvoie rien produit une valeur imprévisible. Les compilateurs modernes avertissent ; le programme compile quand même.</p>
<p><strong>Appeler avant de déclarer.</strong> Place la fonction au-dessus, ou écris un prototype.</p>
<p><strong>Croire qu'une fonction peut modifier son argument.</strong> Elle travaille sur une copie. Modifier <code>x</code> dans <code>carre</code> ne change rien chez l'appelant.</p>

<h2>Dans la vraie vie</h2>
<p>La séparation entre prototype et définition structure tout le C : les <code>.h</code> annoncent ce qui existe, les <code>.c</code> disent comment. C'est ce qui permet de compiler des milliers de fichiers séparément, et de distribuer une bibliothèque sans son code source.</p>

<div class="a-retenir">
<ul>
<li>Une fonction annonce <strong>le type de ce qu'elle renvoie</strong>, ou <code>void</code>.</li>
<li>Elle doit être connue avant d'être appelée — d'où le prototype.</li>
<li>Les arguments sont <strong>copiés</strong> : la fonction ne peut pas modifier l'original.</li>
<li>Les fichiers <code>.h</code> ne contiennent que des annonces.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi des fichiers d'en-tête ?</summary>
<p>Parce qu'en 1972, un compilateur ne pouvait pas garder tout un programme en mémoire : il lisait un fichier à la fois, du début à la fin, sans jamais revenir en arrière. Il fallait donc annoncer à l'avance ce qui existait ailleurs. Les machines ont changé, la contrainte a disparu, et le mécanisme est resté — avec un avantage inattendu : il sépare l'<em>interface</em> de l'<em>implémentation</em>, une idée que tous les langages modernes ont reprise sous une forme ou une autre.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Écris une fonction <code>carre</code> qui prend un <code>int</code> et renvoie son carré, puis affiche <code>carre(7)</code> depuis le main.',
      codeDepart: '#include <stdio.h>\n\n// ta fonction ici (AVANT le main)\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "En C, une fonction se déclare <strong>au-dessus</strong> du <code>main</code> — sinon le compilateur ne la connaît pas encore quand il la rencontre.",
        "La déclaration annonce le type de retour, puis le nom, puis les paramètres avec leur type. Ici : elle reçoit un <code>int</code> et rend un <code>int</code>.",
        "<code>int carre(int x) { return x * x; }</code> puis <code>printf(\"%d\\n\", carre(7));</code>"
      ],
      solution: '#include <stdio.h>\n\nint carre(int x) {\n    return x * x;\n}\n\nint main() {\n    printf("%d\\n", carre(7));\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/int\s+carre\s*\(/.test(ctx.code)) return { ok: false, message: 'Définis la fonction avec son type de retour : <code>int carre(int x)</code>.' };
        if (!/return/.test(ctx.code.replace(/return\s+0\s*;/, ''))) return { ok: false, message: 'La fonction doit <code>return</code> le carré (le return 0 du main ne compte pas).' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '49') return { ok: false, message: 'Attendu <code>49</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Le type de retour devant le nom : c\'est la signature d\'une fonction C.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> écris une fonction <code>void afficher_ligne()</code> qui affiche <code>--------</code>, et appelle-la <strong>trois fois</strong> depuis le main.',
      codeDepart: '#include <stdio.h>\n\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Cette fonction ne rend rien : elle se contente d’afficher. Le C a un mot pour cela, à la place du type de retour.",
        "<code>void</code> veut dire « ne renvoie rien ». Pas de <code>return</code> à écrire, et l’appel s’écrit seul sur sa ligne.",
        "<code>void afficher_ligne() { printf(\"--------\\n\"); }</code>, appelée trois fois."
      ],
      solution: '#include <stdio.h>\n\nvoid afficher_ligne() {\n    printf("--------\\n");\n}\n\nint main() {\n    afficher_ligne();\n    afficher_ligne();\n    afficher_ligne();\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/void\s+afficher_ligne\s*\(/.test(ctx.code)) return { ok: false, message: 'La fonction doit être déclarée <code>void afficher_ligne()</code> — void car elle n\'a rien à renvoyer.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes (trois appels) — j\'en compte ' + l.length + '.' };
        if (l[0].trim() !== '--------') return { ok: false, message: 'Chaque ligne doit être exactement <code>--------</code> (8 tirets). Tu affiches « ' + l[0].trim() + ' ».' };
        return { ok: true, message: 'Une fonction void agit sans rien rendre. C\'est le cas de la plupart des fonctions d\'affichage.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Défi :</strong> écris <code>int max(int a, int b)</code> qui renvoie le plus grand des deux, puis affiche <code>max(12, 30)</code> puis <code>max(45, 8)</code> — deux lignes, <code>30</code> puis <code>45</code>.',
      codeDepart: '#include <stdio.h>\n\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Deux valeurs, un seul résultat à rendre. La fonction doit choisir, puis <strong>renvoyer</strong> — pas afficher.",
        "Un <code>return</code> quitte la fonction immédiatement : ce qui suit n’est jamais exécuté. On peut donc en mettre un par branche.",
        "<code>if (a &gt; b) { return a; } else { return b; }</code>"
      ],
      solution: '#include <stdio.h>\n\nint max(int a, int b) {\n    if (a > b) {\n        return a;\n    } else {\n        return b;\n    }\n}\n\nint main() {\n    printf("%d\\n", max(12, 30));\n    printf("%d\\n", max(45, 8));\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/int\s+max\s*\(\s*int\s+\w+\s*,\s*int\s+\w+\s*\)/.test(ctx.code)) return { ok: false, message: 'La fonction doit prendre DEUX paramètres entiers : <code>int max(int a, int b)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes, une par appel.' };
        if (l[0].trim() !== '30') return { ok: false, message: 'max(12, 30) doit donner 30 — tu affiches « ' + l[0].trim() + ' ».' };
        if (l[1].trim() !== '45') return { ok: false, message: 'max(45, 8) doit donner 45 — tu affiches « ' + l[1].trim() + ' ». Vérifie que ta comparaison marche dans les deux sens.' };
        return { ok: true, message: 'Deux appels, deux résultats différents : ta fonction est vraiment générale, pas taillée pour un cas.' };
      }
    }
  ]
},

/* ---------- c-8 ---------- */
{
  id: 'c-8',
  titre: 'Les chaînes de caractères',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Voici l'une des grandes singularités du C : <strong>le type « texte » n'existe pas</strong>. Une chaîne est un simple tableau de <code>char</code>.</p>
<pre class="bloc-code">char nom[] = "Alex";</pre>
<p>En mémoire, ce tableau contient <strong>cinq</strong> cases, pas quatre :</p>
<table class="memo-table trace">
<tr><th>Case</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
<tr><td>Contenu</td><td>'A'</td><td>'l'</td><td>'e'</td><td>'x'</td><td><strong>'\0'</strong></td></tr>
</table>
<p>La dernière case contient le <strong>caractère nul</strong>, écrit <code>'\0'</code>. C'est lui qui marque la fin de la chaîne — et il explique à peu près tout le reste.</p>

<h2>Pourquoi un marqueur de fin</h2>
<p>Un tableau ne connaît pas sa longueur. Comment <code>printf</code> saurait-il où s'arrêter d'afficher ? Réponse : il avance case par case jusqu'à rencontrer le zéro. C'est la convention du C, et elle est tenue par toute la bibliothèque standard.</p>
<p>Conséquence pratique : <strong>il faut toujours prévoir une case de plus</strong> que le nombre de caractères.</p>

<h2>Lire et manipuler</h2>
<pre class="bloc-code">char nom[] = "Alex";
printf("%s\n", nom);      // Alex
printf("%c\n", nom[0]);   // A</pre>
<p>Mesuré. <code>%s</code> affiche la chaîne entière, <code>%c</code> un caractère. Et avec <code>#include &lt;string.h&gt;</code>, <code>strlen(nom)</code> rend <strong>4</strong> — mesuré aussi : la longueur ne compte pas le zéro final, même s'il occupe une case.</p>
<p>Les autres outils de la bibliothèque : <code>strcpy</code> pour copier, <code>strcat</code> pour concaténer, <code>strcmp</code> pour comparer.</p>

<h2>Les pièges</h2>
<p><strong>Comparer deux chaînes avec <code>==</code>.</strong> C'est l'erreur classique. <code>==</code> compare deux <em>adresses</em>, pas deux contenus : deux chaînes identiques rangées à deux endroits différents ne seront jamais « égales ». Il faut <code>strcmp</code>, qui rend <strong>0</strong> quand les textes sont identiques — une convention contre-intuitive, puisque zéro veut dire « pareil ».</p>
<p><strong>Oublier la case du zéro final.</strong> <code>char nom[4] = "Alex";</code> ne laisse pas la place au marqueur. L'affichage continue alors au-delà du tableau, jusqu'à rencontrer un zéro par hasard.</p>
<p><strong>Confondre <code>'A'</code> et <code>"A"</code>.</strong> Le premier est un caractère, le second un tableau de deux cases — le A et son zéro.</p>
<p><strong>Dépasser la taille en copiant.</strong> <code>strcpy</code> ne vérifie rien : copier une chaîne de 50 caractères dans un tableau de 10 écrase ce qui suit en mémoire.</p>

<h2>Dans la vraie vie</h2>
<p>Ce dernier point est à l'origine d'une famille entière de failles de sécurité. <code>strcpy</code> est aujourd'hui déconseillée au profit de versions qui prennent une taille maximale. Les langages modernes ont tous abandonné le marqueur de fin au profit d'une longueur stockée — mais des milliards de lignes de C l'utilisent encore.</p>

<div class="a-retenir">
<ul>
<li>Une chaîne est un <strong>tableau de <code>char</code></strong> terminé par <code>'\0'</code>.</li>
<li>Prévois toujours une case de plus que le nombre de caractères.</li>
<li><code>strlen</code> ne compte pas le zéro final.</li>
<li>On compare avec <code>strcmp</code>, qui rend <strong>0</strong> si les textes sont identiques.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : l'erreur à un milliard de dollars</summary>
<p>Le choix du marqueur de fin plutôt que d'une longueur stockée a été critiqué dès les années 1980. Il rend <code>strlen</code> proportionnel à la taille du texte — il faut parcourir pour compter — et surtout il rend impossible toute vérification de borne, puisqu'une chaîne ne sait pas où elle s'arrête tant qu'on ne l'a pas lue. Son auteur l'a défendu par la contrainte de l'époque : chaque octet de mémoire comptait, et une longueur en aurait coûté plusieurs.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Déclare <code>char nom[] = "Alex";</code> puis affiche, sur trois lignes : le nom entier, sa <strong>première lettre</strong>, et sa <strong>longueur</strong>.',
      codeDepart: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Trois choses différentes à tirer de la même variable : le texte entier, un seul caractère, et un nombre. Donc trois trous différents.",
        "<code>%s</code> pour la chaîne, <code>%c</code> pour un caractère, <code>%d</code> pour la longueur — qui s’obtient avec <code>strlen</code>, et exige <code>#include &lt;string.h&gt;</code>.",
        "<code>printf(\"%s\\n\", nom);</code>, <code>printf(\"%c\\n\", nom[0]);</code>, <code>printf(\"%d\\n\", strlen(nom));</code>"
      ],
      solution: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char nom[] = "Alex";\n    printf("%s\\n", nom);\n    printf("%c\\n", nom[0]);\n    printf("%d\\n", strlen(nom));\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 3) return { ok: false, message: 'J\'attends trois lignes : le nom, la première lettre, la longueur.' };
        if (l[0].trim() !== 'Alex') return { ok: false, message: 'La première ligne doit afficher <code>Alex</code> avec <code>%s</code>. Tu affiches « ' + l[0].trim() + ' ».' };
        if (l[1].trim() !== 'A') return { ok: false, message: 'La deuxième ligne doit afficher <code>A</code> — c\'est <code>nom[0]</code>, affiché avec <code>%c</code> (une seule case). Tu affiches « ' + l[1].trim() + ' ».' };
        if (l[2].trim() !== '4') return { ok: false, message: 'La longueur est 4 (le \\0 final ne compte pas). Tu affiches « ' + l[2].trim() + ' ».' };
        return { ok: true, message: '%s pour le tout, %c pour une case : une chaîne C est bel et bien un tableau, et tu viens de le vérifier.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> affiche les lettres de <code>"Bonjour"</code> une par ligne, avec une boucle qui utilise <code>strlen</code> comme limite.',
      codeDepart: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char mot[] = "Bonjour";\n    \n    return 0;\n}',
      indices: [
        "Une chaîne se parcourt comme un tableau : chaque case contient un caractère.",
        "La limite de la boucle, c’est <code>strlen(mot)</code>. Et pour afficher une case, le trou est <code>%c</code>, pas <code>%s</code>.",
        "<code>for (int i = 0; i &lt; strlen(mot); i++) { printf(\"%c\\n\", mot[i]); }</code>"
      ],
      solution: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char mot[] = "Bonjour";\n    for (int i = 0; i < strlen(mot); i++) {\n        printf("%c\\n", mot[i]);\n    }\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/strlen/.test(ctx.code)) return { ok: false, message: 'Utilise <code>strlen(mot)</code> comme limite de boucle plutôt qu\'un 7 écrit à la main.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 7) return { ok: false, message: 'J\'attends 7 lignes, une par lettre de « Bonjour » — j\'en compte ' + l.length + '.' };
        if (l[0].trim() !== 'B' || l[6].trim() !== 'r') return { ok: false, message: 'La première lettre doit être B et la dernière r. Tu affiches « ' + l[0].trim() + ' » puis « ' + l[6].trim() + ' ».' };
        return { ok: true, message: 'Parcourir une chaîne, c\'est parcourir un tableau. La boucle s\'arrête juste avant le \\0.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Défi :</strong> compte le nombre de <code>\'o\'</code> dans <code>"Bonjour tout le monde"</code> et affiche ce nombre.',
      codeDepart: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char phrase[] = "Bonjour tout le monde";\n    int compte = 0;\n    \n    return 0;\n}',
      indices: [
        "Compter, c’est un accumulateur conditionnel : on parcourt, et on n’augmente que dans certains cas.",
        "Un caractère se compare avec <code>==</code>, et s’écrit entre <strong>apostrophes simples</strong> — les guillemets doubles, eux, désignent une chaîne.",
        "<code>if (phrase[i] == 'o') { compte++; }</code>"
      ],
      solution: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char phrase[] = "Bonjour tout le monde";\n    int compte = 0;\n    for (int i = 0; i < strlen(phrase); i++) {\n        if (phrase[i] == \'o\') {\n            compte++;\n        }\n    }\n    printf("%d\\n", compte);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/'o'/.test(ctx.code)) return { ok: false, message: 'Compare avec le caractère <code>\'o\'</code> entre apostrophes simples (les guillemets doubles désignent une chaîne, pas un caractère).' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '4') return { ok: false, message: 'Il y a 4 « o » dans « Bonjour tout le monde » — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Comparer des char avec <code>==</code> fonctionne parce qu\'un caractère est en réalité un petit nombre. \'A\' vaut 65 en mémoire.' };
      }
    }
  ]
},

/* ---------- c-9 ---------- */
{
  id: 'c-9',
  titre: 'Les pointeurs — le cœur du C',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>On y est. C'est LA notion qui fait la réputation du C, celle qui bloque tout le monde au début et devient limpide une fois qu'on a l'image. Prends ton temps.</p>
<p>L'idée tient en une phrase : <strong>chaque variable occupe une place en mémoire, et cette place a une adresse</strong>. Un pointeur est une variable qui contient une adresse au lieu d'une valeur.</p>
<p>L'image qui marche : une variable est une maison, son contenu est ce qu'il y a dedans, et l'adresse est l'adresse postale. Un pointeur, c'est un papier sur lequel on a noté l'adresse.</p>

<h2>Les deux symboles</h2>
<pre class="bloc-code">int x = 5;
int *p = &amp;x;        // p recoit l'ADRESSE de x

printf("%d\n", *p);  // 5  — ce qu'il y a A cette adresse
*p = 9;
printf("%d\n", x);   // 9  — x a change !</pre>
<p>Mesuré : <code>5</code> puis <code>9</code>. Deux symboles, et c'est tout :</p>
<ul>
<li><code>&amp;x</code> — « l'adresse de x » ;</li>
<li><code>*p</code> — « ce qui se trouve à l'adresse p ».</li>
</ul>
<p>Le <code>*</code> a deux emplois qu'il faut distinguer : dans <code>int *p</code>, il <em>déclare</em> un pointeur ; dans <code>*p = 9</code>, il <em>suit</em> le pointeur. Même symbole, deux moments. Le tableau de référence, à relire autant de fois qu'il faudra :</p>
<table class="memo-table trace">
<tr><th>Ce qu'on veut dire</th><th>Comment ça s'écrit</th></tr>
<tr><td>pointeur vers un entier</td><td><code>int *p</code></td></tr>
<tr><td>l'adresse de x</td><td><code>&amp;x</code></td></tr>
<tr><td>la valeur rangée à l'adresse p</td><td><code>*p</code></td></tr>
<tr><td>l'adresse elle-même</td><td><code>p</code></td></tr>
</table>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ligne</th><th>x</th><th>p</th></tr>
<tr><td><code>int x = 5;</code></td><td>5</td><td>n'existe pas</td></tr>
<tr><td><code>int *p = &amp;x;</code></td><td>5</td><td>l'adresse de x</td></tr>
<tr><td><code>*p = 9;</code></td><td><strong>9</strong></td><td>inchangé — il pointe toujours au même endroit</td></tr>
</table>
<p>Le point décisif est la dernière ligne : on n'a pas touché à <code>x</code> directement, et <code>x</code> a changé. C'est tout l'intérêt, et c'est pourquoi la leçon suivante existe.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le <code>&amp;</code>.</strong> <code>int *p = x;</code> met la <em>valeur</em> 5 là où une adresse était attendue. Le cours refuse : <em>« l'étoile * ne s'utilise que sur un pointeur (une variable déclarée avec * et remplie avec &amp;). »</em></p>
<p><strong>Confondre <code>p</code> et <code>*p</code>.</strong> <code>p</code> est l'adresse, <code>*p</code> est le contenu. Les intervertir donne des nombres absurdes — ou pire, modifie une zone mémoire au hasard.</p>
<p><strong>Utiliser un pointeur qui ne pointe nulle part.</strong> <code>int *p;</code> sans affectation contient une adresse quelconque. Écrire à travers lui, c'est écrire n'importe où. On initialise à <code>NULL</code> et l'on teste avant usage.</p>
<p><strong>Croire que c'est compliqué.</strong> Il n'y a que deux symboles. La difficulté est de tenir les deux niveaux en tête — l'adresse et le contenu — et ça vient avec la pratique.</p>

<h2>Dans la vraie vie</h2>
<p>Les pointeurs servent à trois choses : modifier une variable depuis une fonction, manipuler de grosses structures sans les copier, et construire des structures de données qui grandissent — listes chaînées, arbres, graphes. Les langages modernes les cachent sous d'autres noms — références, objets — mais le mécanisme sous-jacent est toujours celui-ci.</p>

<div class="a-retenir">
<ul>
<li>Un pointeur contient une <strong>adresse</strong>, pas une valeur.</li>
<li><code>&amp;x</code> donne l'adresse de x ; <code>*p</code> donne ce qui s'y trouve.</li>
<li>Dans <code>int *p</code> l'étoile déclare ; dans <code>*p = 9</code> elle suit.</li>
<li>Un pointeur non initialisé pointe n'importe où : <code>NULL</code> par défaut.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi le type du pointeur compte</summary>
<p>Un <code>int *</code> et un <code>char *</code> contiennent tous deux une adresse — alors pourquoi les distinguer ? Parce que le C doit savoir <em>combien d'octets lire</em> à cette adresse : quatre pour un entier, un pour un caractère. Le type sert aussi à l'arithmétique des pointeurs : <code>p + 1</code> avance d'un <em>élément</em>, pas d'un octet. C'est ce qui fait qu'un tableau se parcourt aussi bien avec des indices qu'avec un pointeur qu'on incrémente.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Déclare <code>int age = 30;</code>, crée un pointeur <code>p</code> vers cette variable, puis affiche la valeur <strong>via le pointeur</strong> (tu dois voir <code>30</code>).',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int age = 30;\n    \n    return 0;\n}',
      indices: [
        "Deux symboles sont en jeu, et ils ne font pas la même chose — c’est tout le sujet de « Deux symboles à ne pas confondre », juste au-dessus.",
        "À la déclaration, l’étoile colle au nom du pointeur : <code>int *p</code>. Et ce qu’on lui donne, ce n’est pas la variable, c’est son <strong>adresse</strong> — qui s’obtient avec <code>&amp;</code>.",
        "Pour lire ce qu’il y a au bout, l’étoile revient devant le pointeur : <code>printf(\"%d\\n\", *p);</code>"
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int age = 30;\n    int *p = &age;\n    printf("%d\\n", *p);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/\*\s*\w+\s*=\s*&/.test(ctx.code)) return { ok: false, message: 'Il n\'y a pas encore de pointeur dans ton code : aucune déclaration ne porte d\'étoile, et rien ne prend l\'adresse de <code>age</code>.' };
        if (!/\*\s*p/.test(ctx.code.replace(/int\s*\*\s*p/, ''))) return { ok: false, message: 'Le pointeur est créé, mais tu affiches encore la variable directement. La consigne demande de passer <strong>par le pointeur</strong>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '30') return { ok: false, message: 'Attendu <code>30</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Tu viens d\'écrire ton premier pointeur. <code>&amp;</code> pour prendre l\'adresse, <code>*</code> pour aller voir ce qu\'il y a dedans.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> modifie <code>age</code> <strong>à travers le pointeur</strong> pour qu\'il vaille 31, puis affiche <code>age</code> (et non <code>*p</code>) pour prouver que la vraie variable a changé.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int age = 30;\n    int *p = &age;\n    \n    printf("%d\\n", age);\n    return 0;\n}',
      indices: [
        "Tu as déjà le pointeur. La vraie question : écrire <em>dans</em> le pointeur, ou dans la case qui est au bout ? Une seule des deux modifie <code>age</code>.",
        "L’étoile devant un pointeur veut dire « la case qui est au bout ». Sans elle, tu écrirais dans l’adresse elle-même — la confusion que raconte « Modifier à distance ».",
        "<code>*p = 31;</code> — puis affiche <code>age</code>, et non <code>*p</code>, pour prouver que la vraie variable a bougé."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int age = 30;\n    int *p = &age;\n    *p = 31;\n    printf("%d\\n", age);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (/\bage\s*=\s*31/.test(ctx.code)) return { ok: false, message: 'Tu modifies <code>age</code> directement — tout l\'intérêt de l\'exercice est de passer par le pointeur.' };
        if (!/\*\s*p\s*=\s*31/.test(ctx.code)) return { ok: false, message: 'Tu n\'écris pas encore <em>à travers</em> le pointeur : il manque l\'étoile devant <code>p</code> au moment de lui affecter 31.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '31') return { ok: false, message: 'Attendu <code>31</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'La preuve est faite : écrire à travers un pointeur modifie bien la variable d\'origine. C\'est ce mécanisme qui va servir dans la leçon suivante.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Dans <code>int *p = &amp;age;</code>, que contient exactement <code>p</code> ?',
      choix: [
        'L\'adresse mémoire de la variable age',
        'Une copie de la valeur de age',
        'Le nom « age » sous forme de texte',
        'Le type de la variable age'
      ],
      bonne: 0,
      explication: 'p contient un numéro : l\'endroit où habite age en mémoire. C\'est en écrivant *p qu\'on va chercher la valeur qui se trouve à ce numéro.',
      aides: [
        null,
        'Non — et c\'est justement la différence : une copie serait indépendante, alors que modifier *p modifie bien la variable d\'origine.',
        'Les noms de variables n\'existent plus une fois le programme compilé : il ne reste que des adresses.',
        'Le type est indiqué dans la déclaration (int *), mais ce n\'est pas ce que p contient à l\'exécution.'
      ]
    }
  ]
},

/* ---------- c-10 ---------- */
{
  id: 'c-10',
  titre: 'Pointeurs et fonctions : modifier pour de vrai',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Voici le problème que les pointeurs résolvent, et la raison pour laquelle ils existent.</p>
<pre class="bloc-code">void doubler(int n) {
    n = n * 2;        // modifie la COPIE
}

int main() {
    int x = 5;
    doubler(x);
    printf("%d\n", x);   // 5 — rien n'a change
}</pre>
<p>Mesuré : <code>5</code>. La fonction a bien doublé quelque chose — sa copie locale, qui disparaît à la sortie. L'original n'a jamais été touché.</p>
<p>Ce n'est pas un défaut : c'est une protection. Une fonction ne peut pas abîmer les variables de son appelant par accident. Mais quand on <em>veut</em> modifier, il faut un moyen.</p>

<h2>La solution</h2>
<pre class="bloc-code">void doubler(int *n) {
    *n = *n * 2;      // modifie CE QUI EST a l'adresse
}

int main() {
    int x = 5;
    doubler(&amp;x);      // on passe l'ADRESSE
    printf("%d\n", x);   // 10
}</pre>
<p>Mesuré : <code>10</code>. Trois changements, et trois seulement : une étoile dans le paramètre, une étoile devant chaque usage, et une esperluette à l'appel.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Version</th><th>Ce que reçoit la fonction</th><th>Résultat</th></tr>
<tr><td><code>doubler(int n)</code></td><td>une copie de la valeur</td><td>x vaut toujours <strong>5</strong></td></tr>
<tr><td><code>doubler(int *n)</code></td><td>une copie de l'<em>adresse</em></td><td>x vaut <strong>10</strong></td></tr>
</table>
<p>Remarque la nuance de la seconde ligne : l'adresse aussi est copiée. Mais une copie d'adresse mène au même endroit — comme deux papiers portant la même adresse postale mènent à la même maison.</p>

<h2>Les tableaux, eux, passent déjà par adresse</h2>
<pre class="bloc-code">void zero(int t[], int n) {
    for (int i = 0; i &lt; n; i++) t[i] = 0;
}</pre>
<p>Mesuré : après l'appel, le tableau de l'appelant vaut bien <code>0 0</code>. Un tableau n'est jamais copié — son nom <em>est</em> une adresse, comme la leçon sur les tableaux l'annonçait. C'est pourquoi une fonction peut le modifier sans qu'on ait rien demandé, et pourquoi il faut lui passer la longueur à côté.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le <code>&amp;</code> à l'appel.</strong> La fonction reçoit une valeur là où elle attend une adresse. Le cours le dit : <em>« l'étoile * ne s'utilise que sur un pointeur. »</em></p>
<p><strong>Oublier l'étoile dans le corps.</strong> <code>n = n * 2</code> au lieu de <code>*n = *n * 2</code> modifie le pointeur lui-même — il pointe désormais ailleurs — au lieu de ce qu'il désigne. Aucune erreur, et la variable d'origine est intacte.</p>
<p><strong>Croire qu'il faut un pointeur pour un tableau.</strong> C'en est déjà un. Écrire <code>&amp;t</code> est inutile et déroutant.</p>
<p><strong>Renvoyer l'adresse d'une variable locale.</strong> Elle disparaît à la fin de la fonction : le pointeur rendu désigne une zone qui n'existe plus. C'est l'une des erreurs les plus difficiles à diagnostiquer du C.</p>

<h2>Dans la vraie vie</h2>
<p>C'est ainsi qu'une fonction C rend plusieurs valeurs : elle en renvoie une, et remplit les autres à travers des pointeurs qu'on lui passe. Tu reconnaîtras le motif partout dans la bibliothèque standard — une fonction qui rend un code d'erreur et pose le vrai résultat dans un paramètre.</p>

<div class="a-retenir">
<ul>
<li>Par défaut, un argument est <strong>copié</strong> : la fonction ne peut pas modifier l'original.</li>
<li>Passer <code>&amp;x</code> et recevoir <code>int *n</code> permet de modifier pour de bon.</li>
<li>Un tableau passe toujours par adresse : il est modifiable d'office.</li>
<li>Ne jamais renvoyer l'adresse d'une variable locale.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : ce que les autres langages en ont fait</summary>
<p>Java et Python ont supprimé les pointeurs explicites — et gardé le mécanisme. Quand tu passes une liste à une fonction Python, tu passes en réalité une référence : la fonction peut la modifier, exactement comme un tableau C. C'est pourquoi le piège de « la liste modifiée par surprise » existe dans les deux langages. Comprendre les pointeurs, c'est comprendre pourquoi.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Ce programme ne fonctionne pas : <code>x</code> vaut toujours 5 à la fin. Corrige la fonction <strong>et</strong> son appel pour qu\'il affiche <code>10</code>.',
      codeDepart: '#include <stdio.h>\n\nvoid doubler(int n) {\n    n = n * 2;\n}\n\nint main() {\n    int x = 5;\n    doubler(x);\n    printf("%d\\n", x);\n    return 0;\n}',
      indices: [
        "En C, une fonction reçoit une <strong>copie</strong> de la valeur : modifier cette copie ne change rien à l’original.",
        "Pour modifier l’original, il faut lui passer son <strong>adresse</strong>. Trois choses changent alors : le type du paramètre, la ligne qui modifie, et l’appel.",
        "<code>void doubler(int *n)</code> · <code>*n = *n * 2;</code> · <code>doubler(&amp;x);</code>"
      ],
      solution: '#include <stdio.h>\n\nvoid doubler(int *n) {\n    *n = *n * 2;\n}\n\nint main() {\n    int x = 5;\n    doubler(&x);\n    printf("%d\\n", x);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/doubler\s*\(\s*int\s*\*/.test(ctx.code)) return { ok: false, message: 'Le paramètre doit être un pointeur : <code>void doubler(int *n)</code>.' };
        if (!/doubler\s*\(\s*&/.test(ctx.code)) return { ok: false, message: 'À l\'appel, envoie l\'adresse : <code>doubler(&x);</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0].trim() === '5') return { ok: false, message: 'x vaut encore 5 : la fonction travaille toujours sur une copie. Vérifie que tu écris bien <code>*n = *n * 2;</code> avec les étoiles.' };
        if (l[0].trim() !== '10') return { ok: false, message: 'Attendu <code>10</code> — tu affiches « ' + l[0].trim() + ' ».' };
        return { ok: true, message: 'Tu viens de faire ce que le C impose et que les autres langages cachent : choisir explicitement entre copier et partager.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Défi de l\'échange :</strong> écris <code>void echanger(int *a, int *b)</code> qui échange les deux valeurs. Le main affiche déjà le résultat — tu dois voir <code>2 1</code>.',
      codeDepart: '#include <stdio.h>\n\n// ta fonction echanger ici\n\nint main() {\n    int x = 1;\n    int y = 2;\n    echanger(&x, &y);\n    printf("%d %d\\n", x, y);\n    return 0;\n}',
      indices: [
        "Le piège classique : si tu écris <code>*a = *b</code> en premier, l’ancienne valeur de <code>a</code> est écrasée et perdue.",
        "Il faut la mettre à l’abri dans une variable temporaire avant de l’écraser. Trois affectations, dans cet ordre précis.",
        "<code>int temp = *a;</code> · <code>*a = *b;</code> · <code>*b = temp;</code>"
      ],
      solution: '#include <stdio.h>\n\nvoid echanger(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 1;\n    int y = 2;\n    echanger(&x, &y);\n    printf("%d %d\\n", x, y);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/echanger\s*\(\s*int\s*\*/.test(ctx.code)) return { ok: false, message: 'La fonction doit recevoir deux pointeurs : <code>void echanger(int *a, int *b)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0].trim() === '1 2') return { ok: false, message: 'Rien n\'a été échangé. Vérifie que tu modifies bien <code>*a</code> et <code>*b</code> (avec les étoiles), et non <code>a</code> et <code>b</code>.' };
        if (l[0].trim() === '2 2' || l[0].trim() === '1 1') return { ok: false, message: 'Une valeur a écrasé l\'autre : il te faut une variable temporaire pour mettre de côté la première avant de l\'écraser.' };
        if (l[0].trim() !== '2 1') return { ok: false, message: 'Attendu <code>2 1</code> — tu affiches « ' + l[0].trim() + ' ».' };
        return { ok: true, message: 'La fonction swap : l\'exemple canonique des pointeurs, celui qu\'on te demandera à coup sûr en entretien. Elle est impossible à écrire en C sans pointeurs.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> écris <code>void tout_doubler(int t[], int taille)</code> qui double chaque case du tableau. Le tableau doit vraiment être modifié — le main affiche <code>2 4 6</code>.',
      codeDepart: '#include <stdio.h>\n\n// ta fonction ici\n\nint main() {\n    int t[] = {1, 2, 3};\n    tout_doubler(t, 3);\n    for (int i = 0; i < 3; i++) {\n        printf("%d ", t[i]);\n    }\n    printf("\\n");\n    return 0;\n}',
      indices: [
        "Surprise : ici, aucune étoile n’est nécessaire — et pourtant le tableau sera bien modifié.",
        "Un tableau est <strong>toujours</strong> passé par adresse en C : la fonction travaille directement sur l’original. Une simple boucle suffit.",
        "<code>t[i] = t[i] * 2;</code> dans une boucle allant jusqu’à <code>taille</code>."
      ],
      solution: '#include <stdio.h>\n\nvoid tout_doubler(int t[], int taille) {\n    for (int i = 0; i < taille; i++) {\n        t[i] = t[i] * 2;\n    }\n}\n\nint main() {\n    int t[] = {1, 2, 3};\n    tout_doubler(t, 3);\n    for (int i = 0; i < 3; i++) {\n        printf("%d ", t[i]);\n    }\n    printf("\\n");\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/tout_doubler\s*\(/.test(ctx.code)) return { ok: false, message: 'Définis la fonction <code>void tout_doubler(int t[], int taille)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        const v = l[0].trim().split(/\s+/).join(' ');
        if (v === '1 2 3') return { ok: false, message: 'Le tableau n\'a pas changé — vérifie que ta boucle écrit bien <code>t[i] = t[i] * 2;</code> à l\'intérieur de la fonction.' };
        if (v !== '2 4 6') return { ok: false, message: 'Attendu <code>2 4 6</code> — tu affiches « ' + v + ' ».' };
        return { ok: true, message: 'Aucune étoile nécessaire, et pourtant le tableau d\'origine est bien modifié : le nom d\'un tableau est déjà une adresse. C\'est une exception à retenir.' };
      }
    }
  ]
},

/* ---------- c-11 ---------- */
{
  id: 'c-11',
  titre: 'Les tableaux à deux dimensions',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un tableau de tableaux : c'est ainsi qu'on représente une grille, un plateau de jeu, une image, une feuille de calcul. Tout ce qui a des lignes et des colonnes.</p>
<pre class="bloc-code">int grille[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

printf("%d\n", grille[0][0]);   // 1 — premiere ligne, premiere colonne
printf("%d\n", grille[1][2]);   // 6 — deuxieme ligne, troisieme colonne</pre>
<p>Mesuré. L'ordre est toujours le même : <strong>ligne d'abord, colonne ensuite</strong>. Et les deux comptent à partir de zéro.</p>

<h2>Le parcours</h2>
<pre class="bloc-code">for (int l = 0; l &lt; 3; l++) {
    for (int c = 0; c &lt; 3; c++) {
        printf("%d ", grille[l][c]);
    }
    printf("\n");
}</pre>
<p>Deux boucles imbriquées, comme en JavaScript et en Python. La boucle intérieure parcourt une ligne entière ; le <code>printf("\n")</code> est <em>après</em> elle, pour passer à la ligne suivante une seule fois par rangée.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Tour externe</th><th>Tours internes</th><th>Affiché</th></tr>
<tr><td>l = 0</td><td>c = 0, 1, 2</td><td><code>1 2 3</code> puis un retour</td></tr>
<tr><td>l = 1</td><td>c repart de 0</td><td><code>4 5 6</code> puis un retour</td></tr>
</table>
<p>Le compteur intérieur repart de zéro à chaque tour extérieur — c'est ce qui fait le balayage case par case.</p>

<h2>En mémoire, c'est une seule ligne</h2>
<p>Voici la particularité du C. Une grille 3×3 n'est pas trois tableaux dispersés : ce sont <strong>neuf cases collées</strong>, les unes derrière les autres. <code>grille[1][0]</code> est simplement la quatrième case.</p>
<p>Ça n'a l'air de rien, et c'est ce qui rend l'accès si rapide — et ce qui explique qu'une grille doive connaître sa largeur pour être passée à une fonction : sans elle, impossible de savoir où commence la ligne suivante.</p>

<h2>Les pièges</h2>
<p><strong>Inverser ligne et colonne.</strong> Sur une grille carrée, le programme tourne et donne un résultat faux. Sur une grille rectangulaire, on sort des bornes — ici signalé, ailleurs silencieux.</p>
<p><strong>Mettre le retour à la ligne au mauvais endroit.</strong> À l'intérieur de la boucle interne, on obtient une colonne ; en dehors des deux, une seule ligne de neuf nombres.</p>
<p><strong>Réutiliser le même compteur.</strong> Deux <code>i</code> imbriqués, et la boucle interne écrase celui de l'externe. Nomme-les <code>l</code> et <code>c</code>, ou <code>ligne</code> et <code>colonne</code>.</p>
<p><strong>Oublier qu'on ne peut pas redimensionner.</strong> Comme un tableau simple, une grille a une taille fixée pour de bon.</p>

<h2>Dans la vraie vie</h2>
<p>Une image en mémoire est exactement cela : une grille de pixels, rangée en une seule longue ligne. Les traitements d'image, les plateaux de jeu, les matrices du calcul scientifique reposent tous sur cette représentation — et sur le fait qu'elle soit contiguë.</p>

<div class="a-retenir">
<ul>
<li><code>grille[ligne][colonne]</code> — ligne d'abord, et les deux à partir de 0.</li>
<li>Deux boucles imbriquées la parcourent ; le retour à la ligne va entre les deux.</li>
<li>En mémoire, c'est une seule suite de cases collées.</li>
<li>Passée à une fonction, une grille doit emporter sa largeur.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : l'ordre de parcours change la vitesse</summary>
<p>Parcourir ligne par ligne est nettement plus rapide que colonne par colonne — parfois d'un facteur dix sur de grandes matrices. La raison tient au matériel : le processeur charge la mémoire par blocs, et lire des cases voisines tombe dans le même bloc. C'est un cas typique d'optimisation où le code « juste » et le code « rapide » diffèrent d'un simple échange de deux boucles.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Affiche la grille complète, une ligne par ligne, les nombres séparés par un espace. Tu dois obtenir trois lignes : <code>1 2 3</code>, <code>4 5 6</code>, <code>7 8 9</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int grille[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    \n    return 0;\n}',
      indices: [
        "Deux boucles emboîtées : celle du dehors parcourt les lignes, celle du dedans les colonnes.",
        "Le retour à la ligne n’a lieu qu’une fois par ligne : il va donc <strong>après</strong> la boucle intérieure, mais <strong>dans</strong> la boucle extérieure.",
        "<code>printf(\"%d \", grille[i][j]);</code> dans la boucle interne, puis <code>printf(\"\\n\");</code> juste après elle."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int grille[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++) {\n            printf("%d ", grille[i][j]);\n        }\n        printf("\\n");\n    }\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length === 1) return { ok: false, message: 'Tout est sur une seule ligne : le <code>printf("\\n")</code> doit être dans la boucle extérieure, juste après la boucle intérieure.' };
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes — j\'en compte ' + l.length + '.' };
        if (l[0].trim().split(/\s+/).join(' ') !== '1 2 3') return { ok: false, message: 'La première ligne doit être <code>1 2 3</code>. Tu affiches « ' + l[0].trim() + ' ».' };
        if (l[2].trim().split(/\s+/).join(' ') !== '7 8 9') return { ok: false, message: 'La troisième ligne doit être <code>7 8 9</code>. Tu affiches « ' + l[2].trim() + ' ».' };
        return { ok: true, message: 'Deux boucles imbriquées, et une grille s\'affiche. C\'est la structure de tout traitement d\'image.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> calcule la somme de <strong>tous</strong> les nombres de la grille et affiche-la (45).',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int grille[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    int somme = 0;\n    \n    return 0;\n}',
      indices: [
        "Mêmes boucles emboîtées, mais au lieu d’afficher on accumule.",
        "L’accumulateur se déclare avant les deux boucles, et le <code>printf</code> vient après les deux — pas entre.",
        "<code>somme += grille[i][j];</code> dans la boucle interne."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int grille[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    int somme = 0;\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3; j++) {\n            somme += grille[i][j];\n        }\n    }\n    printf("%d\\n", somme);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (/\b45\b/.test(ctx.code)) return { ok: false, message: 'Le résultat ne doit pas être écrit dans le code : c\'est aux boucles de le calculer.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '45') return { ok: false, message: 'Attendu <code>45</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Le même accumulateur, avec deux boucles au lieu d\'une. La logique ne change pas, seule la profondeur augmente.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Défi :</strong> affiche uniquement la <strong>diagonale</strong> de la grille (1, 5, 9) séparée par des espaces. Astuce : une seule boucle suffit.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int grille[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    \n    printf("\\n");\n    return 0;\n}',
      indices: [
        "Une seule boucle suffit : sur la diagonale, il n’y a qu’une case par ligne, et sa position n’est pas un hasard.",
        "Sur la diagonale, le numéro de ligne et celui de colonne sont <strong>identiques</strong>.",
        "<code>grille[i][i]</code> dans une boucle simple."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int grille[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    for (int i = 0; i < 3; i++) {\n        printf("%d ", grille[i][i]);\n    }\n    printf("\\n");\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        const v = l[0].trim().split(/\s+/).join(' ');
        if (v !== '1 5 9') return { ok: false, message: 'Attendu <code>1 5 9</code> — tu affiches « ' + v + ' ». Sur la diagonale, l\'indice de ligne et celui de colonne sont identiques.' };
        return { ok: true, message: 'Une seule boucle et <code>grille[i][i]</code> : quand on comprend la structure, le code se simplifie tout seul.' };
      }
    }
  ]
},

/* ---------- c-12 ---------- */
{
  id: 'c-12',
  titre: 'Les structures',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un tableau range des valeurs de <strong>même nature</strong>. Mais comment décrire un étudiant, avec un nom, un âge et une moyenne ? Trois types différents, qui vont ensemble.</p>
<p>C'est le rôle de la <strong>structure</strong> : elle regroupe des données de types différents sous un seul nom. C'est l'ancêtre direct des objets, et l'idée dont tout le reste découle.</p>

<h2>Déclarer le moule</h2>
<pre class="bloc-code">struct Etudiant {
    char nom[50];
    int age;
    double moyenne;
};</pre>
<p>Cette déclaration crée un <strong>nouveau type</strong>. Elle ne réserve aucune mémoire : c'est un moule, pas un objet.</p>
<p>Remarque le point-virgule après l'accolade fermante — obligatoire, et souvent oublié.</p>

<h2>Créer et remplir</h2>
<pre class="bloc-code">struct Etudiant e;
e.age = 20;
e.moyenne = 14.5;
printf("%d ans, moyenne %.1f\n", e.age, e.moyenne);</pre>
<p>Mesuré. Le point atteint chaque champ — exactement la notation des objets JavaScript et des dictionnaires Python. En C, on remplit champ par champ.</p>
<p>Noter la répétition de <code>struct</code> : en C, le mot fait partie du type. <code>struct Etudiant e;</code>, pas <code>Etudiant e;</code>.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ligne</th><th>Ce qui se passe</th></tr>
<tr><td><code>struct Etudiant { ... };</code></td><td>un type est défini. Zéro octet réservé.</td></tr>
<tr><td><code>struct Etudiant e;</code></td><td><strong>là</strong> la mémoire est réservée : tous les champs d'un coup</td></tr>
<tr><td><code>e.age = 20;</code></td><td>un champ reçoit sa valeur</td></tr>
</table>
<p>La deuxième ligne est le moment décisif : une structure occupe la somme de ses champs, en un seul bloc contigu. C'est ce qui permet de la copier, de la passer à une fonction, de l'écrire dans un fichier d'un seul tenant.</p>

<h2>Un tableau de structures</h2>
<pre class="bloc-code">struct Etudiant promo[30];
promo[0].age = 20;</pre>
<p>Trente étudiants, chacun avec ses trois champs. C'est le motif le plus courant : une liste d'enregistrements, qu'on parcourt à la boucle.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le point-virgule après l'accolade.</strong> L'erreur la plus fréquente de la leçon, et son message est déroutant — le compilateur se plaint de la ligne <em>suivante</em>.</p>
<p><strong>Oublier le mot <code>struct</code> à la déclaration d'une variable.</strong> En C, il fait partie du type.</p>
<p><strong>Copier une structure en croyant partager.</strong> <code>struct Etudiant b = a;</code> copie <em>tous</em> les champs. Modifier <code>b</code> ne touche pas <code>a</code> — contrairement à un tableau, qui lui est partagé.</p>
<p><strong>Comparer deux structures avec <code>==</code>.</strong> Interdit en C. Il faut comparer champ par champ.</p>

<h2>Dans la vraie vie</h2>
<p>Les structures sont partout : une couleur avec ses trois composantes, un point avec ses coordonnées, un en-tête de fichier. Et c'est d'elles que viennent les objets — une classe n'est, à l'origine, qu'une structure à laquelle on a ajouté des fonctions.</p>

<div class="a-retenir">
<ul>
<li>Une structure regroupe des champs de types <strong>différents</strong> sous un nom.</li>
<li>Point-virgule après l'accolade fermante, et <code>struct</code> dans le type.</li>
<li>La déclaration ne réserve rien : c'est la variable qui occupe la mémoire.</li>
<li>Une structure se <strong>copie</strong> entièrement à l'affectation, contrairement à un tableau.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : typedef, pour s'épargner le mot struct</summary>
<p><code>typedef struct { ... } Etudiant;</code> crée un alias : on écrit alors <code>Etudiant e;</code> tout court. C'est l'usage dans presque tout le code C moderne, et c'est pourquoi on voit rarement le mot <code>struct</code> dans les bibliothèques. L'apprendre avec le mot complet reste utile : il rappelle qu'il s'agit bien d'un agrégat de champs, et non d'un type magique.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Définis une structure <code>Point</code> avec deux champs <code>int x</code> et <code>int y</code>. Crée ensuite un point, mets-y 3 et 4, et affiche <code>3,4</code>.',
      codeDepart: '#include <stdio.h>\n\n// ta structure ici (avant le main)\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Une structure regroupe plusieurs champs sous un seul nom. Elle se définit en dehors du <code>main</code>, au-dessus de lui.",
        "Attention au détail qui fait rater la compilation : la définition se termine par une accolade fermante <strong>suivie d’un point-virgule</strong>.",
        "<code>struct Point { int x; int y; };</code> puis <code>struct Point p; p.x = 3; p.y = 4;</code>"
      ],
      solution: '#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint main() {\n    struct Point p;\n    p.x = 3;\n    p.y = 4;\n    printf("%d,%d\\n", p.x, p.y);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/struct\s+Point\s*\{/.test(ctx.code)) return { ok: false, message: 'Définis la structure : <code>struct Point { int x; int y; };</code>' };
        if (!/struct\s+Point\s+\w+\s*;/.test(ctx.code)) return { ok: false, message: 'Crée une variable de ce type : <code>struct Point p;</code> — en C, le mot <code>struct</code> fait partie du type.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '3,4') return { ok: false, message: 'Attendu <code>3,4</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Tu viens de créer ton propre type de donnée. C\'est le premier pas vers les objets.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> ajoute une structure <code>Etudiant</code> avec <code>int age</code> et <code>double moyenne</code>. Crée un étudiant de 20 ans avec 14.5 de moyenne et affiche <code>20 ans, moyenne 14.5</code>.',
      codeDepart: '#include <stdio.h>\n\n\nint main() {\n    \n    return 0;\n}',
      indices: [
        "Même geste qu’à l’exercice précédent, mais avec deux champs de types différents.",
        "On accède à un champ avec un point : <code>e.age</code>, <code>e.moyenne</code>. Chacun a son trou : <code>%d</code> et <code>%.1f</code>.",
        "<code>printf(\"%d ans, moyenne %.1f\\n\", e.age, e.moyenne);</code>"
      ],
      solution: '#include <stdio.h>\n\nstruct Etudiant {\n    int age;\n    double moyenne;\n};\n\nint main() {\n    struct Etudiant e;\n    e.age = 20;\n    e.moyenne = 14.5;\n    printf("%d ans, moyenne %.1f\\n", e.age, e.moyenne);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/struct\s+Etudiant\s*\{/.test(ctx.code)) return { ok: false, message: 'Définis <code>struct Etudiant</code> avec ses deux champs.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0].trim() !== '20 ans, moyenne 14.5') return { ok: false, message: 'Attendu exactement <code>20 ans, moyenne 14.5</code> — tu affiches « ' + l[0].trim() + ' ». Pense au format <code>%.1f</code> pour une seule décimale.' };
        return { ok: true, message: 'Deux types différents dans une même boîte : c\'est précisément ce qu\'un tableau ne sait pas faire.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Défi :</strong> écris une fonction <code>int distance_origine(struct Point p)</code> qui renvoie <code>p.x + p.y</code> (une distance simplifiée), et affiche le résultat pour le point (3, 4) — soit <code>7</code>.',
      codeDepart: '#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\n// ta fonction ici\n\nint main() {\n    struct Point p;\n    p.x = 3;\n    p.y = 4;\n    \n    return 0;\n}',
      indices: [
        "Une structure se passe à une fonction exactement comme un <code>int</code> : il n’y a rien de spécial à écrire.",
        "Le type du paramètre s’écrit <code>struct Point</code> en entier. À l’intérieur, on lit ses champs avec un point.",
        "<code>int distance_origine(struct Point p) { return p.x + p.y; }</code>"
      ],
      solution: '#include <stdio.h>\n\nstruct Point {\n    int x;\n    int y;\n};\n\nint distance_origine(struct Point p) {\n    return p.x + p.y;\n}\n\nint main() {\n    struct Point p;\n    p.x = 3;\n    p.y = 4;\n    printf("%d\\n", distance_origine(p));\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/distance_origine\s*\(\s*struct\s+Point/.test(ctx.code)) return { ok: false, message: 'La fonction doit prendre une structure en paramètre : <code>int distance_origine(struct Point p)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '7') return { ok: false, message: 'Attendu <code>7</code> (3 + 4) — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Une structure voyage comme une valeur ordinaire. Ajoute-lui des fonctions attachées, et tu obtiens un objet — c\'est toute l\'histoire de la programmation moderne.' };
      }
    }
  ]
},

/* ---------- c-13 ---------- */
{
  id: 'c-13',
  titre: 'La récursion',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une fonction <strong>récursive</strong> est une fonction qui s'appelle elle-même. L'idée déroute au début, puis devient un outil élégant pour les problèmes qui se décomposent naturellement.</p>
<p>Le principe : résoudre un gros problème en le ramenant à un problème <em>plus petit du même genre</em>, jusqu'à tomber sur un cas qu'on sait traiter directement.</p>

<h2>L'exemple canonique</h2>
<pre class="bloc-code">int fact(int n) {
    if (n &lt;= 1) return 1;        // le cas d'arret
    return n * fact(n - 1);       // le cas recursif
}

printf("%d\n", fact(5));          // 120</pre>
<p>Mesuré : <code>120</code>. Deux parties, et toujours les deux :</p>
<ul>
<li>le <strong>cas d'arrêt</strong> — une situation si simple qu'on répond sans récursion ;</li>
<li>le <strong>cas récursif</strong> — qui rappelle la fonction sur un problème plus petit.</li>
</ul>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Appel</th><th>Ce qu'il fait</th></tr>
<tr><td><code>fact(5)</code></td><td>5 × fact(4) — et il attend</td></tr>
<tr><td><code>fact(4)</code></td><td>4 × fact(3) — et il attend</td></tr>
<tr><td><code>fact(2)</code></td><td>2 × fact(1) — et il attend</td></tr>
<tr><td><code>fact(1)</code></td><td><strong>1</strong> — le cas d'arrêt, enfin</td></tr>
<tr><td>remontée</td><td>2×1=2, puis 3×2=6, 4×6=24, 5×24=<strong>120</strong></td></tr>
</table>
<p>Le point à saisir : rien n'est calculé à la descente. Les appels s'empilent, en attente, et tout se calcule à la remontée — en sens inverse.</p>

<h2>Ce que ça coûte</h2>
<p>Chaque appel en attente occupe une place dans une zone de mémoire appelée la <strong>pile</strong>. Elle n'est pas infinie : si la récursion ne s'arrête jamais, elle déborde. Mesuré, le cours le signale — <em>« Maximum call stack size exceeded »</em> — et un vrai programme s'arrête brutalement.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le cas d'arrêt.</strong> La fonction s'appelle sans fin et la pile déborde. C'est l'équivalent récursif de la boucle infinie.</p>
<p><strong>Un cas d'arrêt jamais atteint.</strong> <code>fact(n - 1)</code> avec un <code>n</code> négatif au départ ne rencontrera jamais <code>n &lt;= 1</code>… sauf qu'ici il le rencontre tout de suite. En revanche, oublier le <code>-1</code> boucle à l'infini sur la même valeur.</p>
<p><strong>Récursionner là où une boucle suffit.</strong> La factorielle s'écrit très bien avec un <code>for</code>, en consommant moins. La récursion se justifie quand le problème est <em>naturellement</em> récursif : parcourir un arbre, explorer un labyrinthe, trier par division.</p>
<p><strong>Recalculer mille fois la même chose.</strong> Une suite de Fibonacci écrite naïvement recalcule les mêmes valeurs un nombre astronomique de fois. C'est correct, et inutilisable au-delà de quarante.</p>

<h2>Dans la vraie vie</h2>
<p>La récursion brille sur les structures arborescentes : un dossier qui contient des dossiers, une page HTML dont les balises en contiennent d'autres, un menu à sous-menus. Écrire ces parcours avec une boucle demande de gérer une pile à la main — autant laisser le langage le faire.</p>

<div class="a-retenir">
<ul>
<li>Toujours deux parties : un <strong>cas d'arrêt</strong> et un cas récursif qui réduit le problème.</li>
<li>Rien ne se calcule à la descente : tout se calcule à la remontée.</li>
<li>Chaque appel en attente occupe la pile, qui n'est pas infinie.</li>
<li>Une boucle suffit souvent ; la récursion est pour ce qui est naturellement imbriqué.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la récursion terminale</summary>
<p>Quand l'appel récursif est la toute dernière opération — rien à faire au retour — certains compilateurs le transforment automatiquement en boucle, et la pile ne grandit plus. On parle de <em>récursion terminale</em>. Le C n'en donne aucune garantie, contrairement à des langages comme le Scheme où l'optimisation est obligatoire. C'est pourquoi une récursion profonde reste risquée ici.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Écris la fonction <code>factorielle</code> et affiche <code>factorielle(5)</code>, qui doit valoir <code>120</code>.',
      codeDepart: '#include <stdio.h>\n\n// ta fonction récursive ici\n\nint main() {\n    printf("%d\\n", factorielle(5));\n    return 0;\n}',
      indices: [
        "Une fonction récursive s’appelle elle-même. Sans un cas qui l’arrête, elle tourne jusqu’au plantage.",
        "Le cas d’arrêt vient <strong>en premier</strong> : pour <code>n</code> valant 1 ou moins, on rend 1 sans rappeler la fonction.",
        "<code>if (n &lt;= 1) { return 1; }</code> puis <code>return n * factorielle(n - 1);</code>"
      ],
      solution: '#include <stdio.h>\n\nint factorielle(int n) {\n    if (n <= 1) {\n        return 1;\n    }\n    return n * factorielle(n - 1);\n}\n\nint main() {\n    printf("%d\\n", factorielle(5));\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/factorielle\s*\([^)]*\)\s*;?[^;]*factorielle\s*\(/.test(ctx.code.replace(/\s+/g, ' '))) {
          if (!/return[^;]*factorielle\s*\(/.test(ctx.code)) return { ok: false, message: 'La fonction doit s\'appeler elle-même — c\'est le principe de la récursion : <code>return n * factorielle(n - 1);</code>' };
        }
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '120') return { ok: false, message: 'Attendu <code>120</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Une fonction qui s\'appelle elle-même, et qui s\'arrête. Tu tiens le concept le plus élégant de l\'informatique.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Entraînement :</strong> écris <code>int somme_jusqu_a(int n)</code> qui renvoie 1+2+…+n de façon <strong>récursive</strong> (sans boucle), et affiche <code>somme_jusqu_a(10)</code> — soit <code>55</code>.',
      codeDepart: '#include <stdio.h>\n\n\nint main() {\n    printf("%d\\n", somme_jusqu_a(10));\n    return 0;\n}',
      indices: [
        "Même structure que la factorielle. Une seule chose change : l’opération qui relie <code>n</code> au résultat du cas plus petit.",
        "La somme jusqu’à <code>n</code> vaut <code>n</code> <strong>plus</strong> la somme jusqu’à <code>n-1</code>. Le cas d’arrêt, lui, rend 0.",
        "<code>if (n &lt;= 0) { return 0; }</code> puis <code>return n + somme_jusqu_a(n - 1);</code>"
      ],
      solution: '#include <stdio.h>\n\nint somme_jusqu_a(int n) {\n    if (n <= 0) {\n        return 0;\n    }\n    return n + somme_jusqu_a(n - 1);\n}\n\nint main() {\n    printf("%d\\n", somme_jusqu_a(10));\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande une solution <strong>récursive</strong> : pas de boucle, la fonction doit s\'appeler elle-même.' };
        if (!/return[^;]*somme_jusqu_a\s*\(/.test(ctx.code)) return { ok: false, message: 'La fonction doit s\'appeler elle-même avec une valeur plus petite.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '55') return { ok: false, message: 'Attendu <code>55</code> — tu affiches « ' + (l[0] || '(rien)') + ' ». Vérifie ton cas d\'arrêt.' };
        return { ok: true, message: 'Le même résultat qu\'une boucle, mais exprimé comme une définition mathématique. Selon les problèmes, l\'une ou l\'autre approche sera la plus lisible.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Que se passe-t-il si une fonction récursive n\'a <strong>pas</strong> de cas d\'arrêt ?',
      choix: [
        'Elle s\'appelle sans fin jusqu\'à saturer la mémoire et le programme plante',
        'Le compilateur refuse de compiler le programme',
        'Elle s\'arrête toute seule au bout de 100 appels',
        'Elle renvoie automatiquement 0'
      ],
      bonne: 0,
      explication: 'Chaque appel consomme un peu de mémoire (la « pile d\'appels »). Sans condition d\'arrêt, cette pile déborde : c\'est le « stack overflow », qui a donné son nom au célèbre site d\'entraide entre développeurs.',
      aides: [
        null,
        'Le compilateur ne peut pas le deviner : savoir si un programme s\'arrête est un problème mathématiquement indécidable. L\'erreur n\'apparaît qu\'à l\'exécution.',
        'Aucune limite automatique en C. D\'autres langages (comme Python) fixent une limite arbitraire et lèvent une erreur, mais le C te laisse aller jusqu\'au crash.',
        'Non — sans return atteint, la fonction ne renvoie rien de fiable. Mais de toute façon, elle n\'arrivera jamais jusque-là.'
      ]
    }
  ]
},

/* ---------- c-14 ---------- */
{
  id: 'c-14',
  titre: 'Mini-projet : le carnet de notes',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Dernier exercice du module : un programme complet qui rassemble tableaux, boucles, fonctions et calculs. C'est le genre d'utilitaire qu'on écrit vraiment en C — court, précis, qui fait une chose et la fait vite.</p>
<p>Et c'est l'occasion de voir comment les notions du module s'emboîtent, ce qu'aucune leçon prise isolément ne montre.</p>

<h2>Ce que tu vas construire</h2>
<p>À partir d'un tableau de notes : la moyenne, la meilleure, la plus basse, et le nombre de notes au-dessus de la moyenne.</p>
<pre class="bloc-code">int notes[6] = {12, 15, 8, 17, 10, 13};
int taille = 6;

int somme = 0;
for (int i = 0; i &lt; taille; i++) {
    somme += notes[i];
}

double moyenne = (double) somme / taille;
printf("Moyenne : %.2f\n", moyenne);</pre>
<p>Deux détails qui décident de tout : <code>taille</code> transportée à côté du tableau, et le <code>(double)</code> devant la division.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qu'on obtient</th></tr>
<tr><td>la boucle d'accumulation</td><td>somme = 75</td></tr>
<tr><td><code>somme / taille</code></td><td><strong>12</strong> — la division entière frappe</td></tr>
<tr><td><code>(double) somme / taille</code></td><td><strong>12.50</strong> — ce qu'on voulait</td></tr>
<tr><td>seconde boucle</td><td>compter ceux au-dessus de 12.5</td></tr>
</table>
<p>La deuxième ligne est le piège de <code>c-3</code>, et il se présente ici dans son habitat naturel. Sans la conversion, la moyenne est fausse et parfaitement plausible.</p>

<h2>Découper en fonctions</h2>
<pre class="bloc-code">double moyenne(int t[], int n) {
    int s = 0;
    for (int i = 0; i &lt; n; i++) s += t[i];
    return (double) s / n;
}</pre>
<p>Mesuré : un tableau passé à une fonction y est bien lisible, et la longueur voyage en second paramètre. Découper ainsi rend chaque morceau vérifiable séparément — et c'est la seule façon de garder la tête claire au-delà de cinquante lignes.</p>

<h2>Les pièges</h2>
<p><strong>La division entière.</strong> Le piège central de ce projet. Une moyenne qui tombe toujours juste est un symptôme, pas une coïncidence.</p>
<p><strong>Déclarer l'accumulateur dans la boucle.</strong> Il repart de zéro à chaque tour, et le résultat vaut la dernière note.</p>
<p><strong>Oublier de transporter la taille.</strong> Une fonction qui reçoit un tableau ne peut pas la deviner. C'est le point que le C ne pardonne pas.</p>
<p><strong>Comparer dans la mauvaise boucle.</strong> Compter les notes au-dessus de la moyenne suppose de connaître la moyenne : il faut deux boucles successives, pas une.</p>

<h2>Dans la vraie vie</h2>
<p>Remplace « notes » par des mesures de capteur, des temps de réponse ou des tailles de fichier, et tu as le genre d'utilitaire qu'on écrit en C depuis cinquante ans : lire des données, calculer, afficher. Court, rapide, sans dépendance — et toujours là.</p>

<div class="a-retenir">
<ul>
<li>La taille d'un tableau voyage toujours à côté de lui.</li>
<li><code>(double)</code> dans le calcul, jamais seulement sur la destination.</li>
<li>L'accumulateur se déclare avant la boucle.</li>
<li>Deux calculs dépendants demandent deux boucles successives.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi le C reste imbattable ici</summary>
<p>Un programme comme celui-ci, compilé, s'exécute en quelques microsecondes et n'occupe que quelques kilo-octets. Le même en Python met plusieurs millisecondes et charge un interprète de dizaines de méga-octets. Sur un fichier de dix lignes, personne ne le remarque ; sur un milliard de mesures, ou sur un microcontrôleur avec deux kilo-octets de mémoire, c'est la différence entre possible et impossible.</p>
</details>
`,
  exercices: [
    {
      type: 'c',
      consigne: '<strong>Étape 1 :</strong> calcule et affiche la <strong>moyenne</strong> des 5 notes avec deux décimales. Attention au piège de la division entière — le résultat attendu est <code>13.60</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    int taille = 5;\n    int somme = 0;\n    \n    return 0;\n}',
      indices: [
        "Le piège de la division entière revient ici. La moyenne de nombres entiers n’est presque jamais un entier.",
        "Totalise avec une boucle, puis convertis <strong>avant</strong> de diviser — sinon la décimale est perdue d’avance.",
        "<code>(double)somme / taille</code>, affiché avec <code>%.2f</code>."
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    int taille = 5;\n    int somme = 0;\n    for (int i = 0; i < taille; i++) {\n        somme += notes[i];\n    }\n    printf("%.2f\\n", (double)somme / taille);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'Le total doit venir d\'une boucle sur le tableau.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0].trim() === '13.00') return { ok: false, message: 'Tu obtiens 13.00 : la division s\'est faite entre deux entiers et la décimale est perdue. Convertis avant : <code>(double)somme / taille</code>.' };
        if (l[0].trim() !== '13.60') return { ok: false, message: 'Attendu <code>13.60</code> — tu affiches « ' + l[0].trim() + ' ».' };
        return { ok: true, message: 'Le piège de la division entière évité. C\'est le réflexe le plus rentable de tout le module.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Étape 2 :</strong> écris une <strong>fonction</strong> <code>int maximum(int t[], int taille)</code> qui renvoie la plus grande note, et affiche son résultat (<code>18</code>).',
      codeDepart: '#include <stdio.h>\n\n// ta fonction maximum ici\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    \n    return 0;\n}',
      indices: [
        "La fonction reçoit le tableau et sa taille, et doit <strong>renvoyer</strong> la plus grande valeur — pas l’afficher.",
        "Pars de la première case, puis parcours à partir de l’indice 1 en remplaçant chaque fois que tu trouves mieux.",
        "<code>int max = t[0];</code> puis une boucle depuis <code>i = 1</code>, et <code>return max;</code>"
      ],
      solution: '#include <stdio.h>\n\nint maximum(int t[], int taille) {\n    int max = t[0];\n    for (int i = 1; i < taille; i++) {\n        if (t[i] > max) {\n            max = t[i];\n        }\n    }\n    return max;\n}\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    printf("%d\\n", maximum(notes, 5));\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/int\s+maximum\s*\(/.test(ctx.code)) return { ok: false, message: 'Définis la fonction <code>int maximum(int t[], int taille)</code>.' };
        if (!/return/.test(ctx.code.replace(/return\s+0\s*;/g, ''))) return { ok: false, message: 'La fonction doit <code>return</code> le maximum trouvé.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0].trim() !== '18') return { ok: false, message: 'Attendu <code>18</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Une fonction qui reçoit un tableau et sa taille : c\'est la signature standard en C, puisque le tableau ne connaît pas sa propre longueur.' };
      }
    },
    {
      type: 'c',
      consigne: '<strong>Étape 3 — la finale :</strong> affiche le nombre de notes ≥ 10 sous la forme exacte <code>4 recus sur 5</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    int taille = 5;\n    int recus = 0;\n    \n    return 0;\n}',
      indices: [
        "Encore un accumulateur, mais qui compte au lieu d’additionner — et seulement quand la condition est remplie.",
        "Un compteur à 0 avant la boucle, un <code>if</code> dedans, et l’affichage après. La phrase demandée contient deux nombres.",
        "<code>if (notes[i] &gt;= 10) { recus++; }</code> puis <code>printf(\"%d recus sur %d\\n\", recus, taille);</code>"
      ],
      solution: '#include <stdio.h>\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    int taille = 5;\n    int recus = 0;\n    for (int i = 0; i < taille; i++) {\n        if (notes[i] >= 10) {\n            recus++;\n        }\n    }\n    printf("%d recus sur %d\\n", recus, taille);\n    return 0;\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/if\s*\(/.test(ctx.code)) return { ok: false, message: 'Il faut un <code>if</code> dans la boucle pour ne compter que les notes suffisantes.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0].trim() !== '4 recus sur 5') return { ok: false, message: 'Attendu exactement <code>4 recus sur 5</code> — tu affiches « ' + l[0].trim() + ' ». (Il y a 4 notes supérieures ou égales à 10 : le 9 est recalé.)' };
        return { ok: true, message: 'Module C terminé ! 🔧 Tu sais écrire des programmes structurés dans le langage qui fait tourner les systèmes d\'exploitation — et tu as compris les pointeurs, ce qui n\'est pas donné à tout le monde.' };
      }
    }
  ]
}
];
