/* ===== Module : C — Le langage des fondations ===== */
window.DATA_C = [

/* ---------- c-1 ---------- */
{
  id: 'c-1',
  titre: 'Le C, et pourquoi il compte encore',
  contenu: `
<p>Le C a plus de cinquante ans, et pourtant tout ce que tu utilises repose dessus : Windows, Linux, macOS, les moteurs de bases de données, l'intérieur de Python lui-même. C'est le langage des <strong>fondations</strong>.</p>

<h2>Compilé, pas interprété</h2>
<p>Voilà la grande différence avec tout ce que tu as vu jusqu'ici. Python et JavaScript sont <strong>interprétés</strong> : un programme lit ton code et l'exécute au fur et à mesure. Le C est <strong>compilé</strong> : un outil (le compilateur) traduit d'abord ton fichier entier en instructions machine, et produit un programme autonome.</p>
<ul>
<li>Avantage : c'est <strong>très rapide</strong>, et le compilateur repère beaucoup d'erreurs avant même que le programme tourne ;</li>
<li>Inconvénient : il faut compiler à chaque modification, et le langage ne pardonne rien.</li>
</ul>

<h2>Le squelette obligatoire</h2>
<pre class="bloc-code">#include &lt;stdio.h&gt;

int main() {
    printf("Bonjour le monde !\\n");
    return 0;
}</pre>

<p>Chaque ligne a un rôle précis :</p>
<ul>
<li><code>#include &lt;stdio.h&gt;</code> — charge les outils d'affichage (<em>st</em>andard <em>i</em>nput/<em>o</em>utput). Sans lui, <code>printf</code> n'existe pas ;</li>
<li><code>int main()</code> — <strong>le point de départ</strong>. Tout programme C commence par cette fonction, jamais ailleurs ;</li>
<li><code>printf(...)</code> — affiche du texte. Le <code>\\n</code> à la fin signifie « passe à la ligne » : contrairement au <code>print</code> de Python, <code>printf</code> ne le fait pas tout seul ;</li>
<li><code>return 0;</code> — annonce au système « tout s'est bien passé ». 0 veut dire succès.</li>
</ul>

<div class="attention"><div>Le <strong>point-virgule</strong> termine chaque instruction. L'oublier est l'erreur numéro un des débutants en C, et le message du compilateur pointe souvent la ligne <em>suivante</em> — ce qui rend la chasse déroutante au début.</div></div>

<div class="info"><div><strong>Comment ça tourne ici ?</strong> Un interpréteur C est intégré à ce logiciel : il exécute ton code immédiatement, sans étape de compilation. C'est parfait pour apprendre la syntaxe et le raisonnement. Pour compiler pour de vrai, tu installeras <code>gcc</code> (Linux/Mac) ou MinGW (Windows) et tu taperas <code>gcc mon_fichier.c -o mon_programme</code>.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Écris le programme C complet qui affiche <code>Bonjour le monde !</code>. Il te faut le <code>int main()</code>, le <code>printf</code> et le <code>return 0;</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
      indice: 'À l\'intérieur des accolades de main : <code>printf("Bonjour le monde !\\n");</code> — sans oublier le point-virgule.',
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
      indice: 'Trois <code>printf</code>, chacun se terminant par <code>\\n</code> à l\'intérieur des guillemets.',
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
<p>En Python tu écrivais <code>age = 30</code>. En C, il faut <strong>annoncer le type</strong> avant le nom :</p>
<pre class="bloc-code">int age = 30;
double prix = 19.99;
char initiale = 'A';</pre>

<p>Pourquoi cette contrainte ? Parce que le C réserve <strong>une place précise en mémoire</strong> : 4 octets pour un <code>int</code>, 8 pour un <code>double</code>, 1 pour un <code>char</code>. Il doit savoir combien réserver avant même que le programme démarre.</p>

<h2>Les types de base</h2>
<table class="memo-table">
<tr><th>Type</th><th>Contient</th><th>Exemple</th></tr>
<tr><td>int</td><td>un nombre entier</td><td>int n = 42;</td></tr>
<tr><td>double</td><td>un nombre à virgule</td><td>double p = 3.14;</td></tr>
<tr><td>char</td><td>UN seul caractère</td><td>char c = 'A';</td></tr>
</table>

<p>Remarque : le <code>char</code> utilise des <strong>apostrophes simples</strong> <code>'A'</code>, alors que le texte utilise des guillemets doubles <code>"Alex"</code>. Cette distinction n'existait pas en Python — elle est importante en C.</p>

<h2>Afficher : chaque type a son symbole</h2>
<p><code>printf</code> ne devine rien. Tu écris un texte avec des <strong>trous</strong>, et tu fournis les valeurs qui vont dedans :</p>
<pre class="bloc-code">int age = 30;
double taille = 1.75;
printf("J'ai %d ans et je mesure %.2f m\\n", age, taille);</pre>

<table class="memo-table">
<tr><th>Symbole</th><th>Pour afficher</th></tr>
<tr><td>%d</td><td>un entier (int)</td></tr>
<tr><td>%f</td><td>un nombre à virgule</td></tr>
<tr><td>%.2f</td><td>un nombre à virgule, 2 décimales</td></tr>
<tr><td>%s</td><td>du texte</td></tr>
<tr><td>%c</td><td>un caractère</td></tr>
</table>

<div class="attention"><div>Les trous et les valeurs doivent se correspondre <strong>en nombre et dans l'ordre</strong>. Deux <code>%d</code> réclament deux valeurs, et la première valeur remplit le premier trou.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Déclare un <code>int</code> nommé <code>age</code> valant 30, puis affiche <code>J\'ai 30 ans</code> en utilisant <code>%d</code> (pas en écrivant 30 à la main dans le texte !).',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
      indice: '<code>int age = 30;</code> puis <code>printf("J\'ai %d ans\\n", age);</code>',
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
      indice: 'Le format à deux décimales s\'écrit <code>%.2f</code> : <code>printf("Prix : %.2f euros\\n", prix);</code>',
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
      indice: 'Trois trous dans le même texte : <code>printf("%d - %.1f - %c\\n", annee, note, categorie);</code> — le char va entre apostrophes simples.',
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
<p>Les opérateurs sont les mêmes que partout : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>. Mais le C réserve un piège majeur.</p>

<h2>La division entière</h2>
<pre class="bloc-code">int a = 7;
int b = 2;
printf("%d\\n", a / b);      // affiche 3, PAS 3.5 !</pre>

<p>Pourquoi ? Parce que <code>a</code> et <code>b</code> sont des <code>int</code>. Le C se dit : « deux entiers, donc résultat entier », et il <strong>coupe la partie décimale</strong> — il ne l'arrondit même pas, il la jette. 7/2 donne 3, et 9/10 donne 0.</p>

<h2>Comment obtenir 3.5</h2>
<p>Il suffit qu'<strong>un seul</strong> des deux nombres soit à virgule :</p>
<pre class="bloc-code">printf("%.2f\\n", 7.0 / 2);        // 3.50 — le .0 change tout
printf("%.2f\\n", (double)a / b);   // 3.50 — conversion explicite</pre>
<p><code>(double)a</code> se lit « traite <code>a</code> comme un double le temps de ce calcul ». C'est une <strong>conversion de type</strong>, un geste très courant en C.</p>

<h2>Les raccourcis</h2>
<pre class="bloc-code">int n = 10;
n = n + 5;   // la façon longue
n += 5;      // exactement pareil
n++;         // ajoute 1
n--;         // enlève 1</pre>

<div class="attention"><div>Ce piège cause de vrais bugs en production. Un calcul de moyenne <code>total / nombre</code> entre deux <code>int</code> donnera un résultat faux et silencieux : aucune erreur, juste une valeur tronquée. Retiens le réflexe : dès qu'une division doit donner des décimales, passe par des <code>double</code>.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Affiche le résultat de <code>7 / 2</code> avec deux <code>int</code>, puis le vrai résultat décimal sur une seconde ligne. Tu dois voir <code>3</code> puis <code>3.50</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int a = 7;\n    int b = 2;\n    \n    return 0;\n}',
      indice: 'Première ligne : <code>printf("%d\\n", a / b);</code>. Seconde : force le décimal avec <code>(double)a / b</code> et affiche-le en <code>%.2f</code>.',
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
      indice: 'En C, la division de deux int donne déjà la part entière : <code>bonbons / enfants</code>. Le reste s\'obtient avec <code>%</code> — mais attention, dans un printf il faut écrire <code>%%</code> pour afficher le symbole lui-même.',
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
      indice: 'La division <code>total / nombre</code> se fait ENTRE DEUX INT avant même d\'être rangée dans le double : 27/2 donne 13, la décimale est déjà perdue. Convertis avant : <code>(double)total / nombre</code>.',
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
<p>Bonne nouvelle : la syntaxe du <code>if</code> en C est celle que tu connais déjà par JavaScript.</p>
<pre class="bloc-code">int note = 15;

if (note >= 10) {
    printf("Reçu\\n");
} else {
    printf("Recalé\\n");
}</pre>
<p>Parenthèses autour de la condition, accolades autour du bloc. Pas de <code>:</code> ni d'indentation obligatoire comme en Python — mais indente quand même, la lisibilité n'est pas négociable.</p>

<h2>Les comparaisons et les combinaisons</h2>
<pre class="bloc-code">==  égal          !=  différent
&lt;   &gt;   &lt;=  &gt;=    comparaisons de taille
&amp;&amp;  ET            ||  OU            !  NON</pre>

<h2>Plusieurs cas : else if</h2>
<pre class="bloc-code">if (note >= 16) {
    printf("Très bien\\n");
} else if (note >= 12) {
    printf("Bien\\n");
} else if (note >= 10) {
    printf("Passable\\n");
} else {
    printf("Insuffisant\\n");
}</pre>

<h2>Le piège légendaire du C</h2>
<pre class="bloc-code">if (x = 5) { ... }   // ATTENTION : ceci n'est PAS une comparaison</pre>
<p>Avec un seul <code>=</code>, tu <strong>ranges</strong> 5 dans x, et le résultat (5) est considéré comme vrai — donc le bloc s'exécute <em>toujours</em>. Le C accepte cette écriture sans broncher, car elle est parfois volontaire. En C, tout ce qui n'est pas zéro est vrai ; zéro est faux.</p>

<div class="astuce"><div>Astuce des vieux briscards : écrire la constante à gauche, <code>if (5 == x)</code>. Si tu tapes un seul <code>=</code> par erreur, le compilateur refuse — on ne peut rien ranger dans 5. Le bug devient impossible.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'La note vaut 15. Écris un <code>if</code>/<code>else</code> : si <code>note >= 10</code>, affiche <code>Reçu</code>, sinon <code>Recalé</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int note = 15;\n    \n    return 0;\n}',
      indice: '<code>if (note >= 10) { printf("Reçu\\n"); } else { printf("Recalé\\n"); }</code>',
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
      indice: 'Enchaîne avec <code>else if</code> : dès qu\'une condition est vraie, les suivantes sont ignorées. L\'ordre compte — du plus exigeant au moins exigeant.',
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
      indice: 'Regarde très attentivement le signe dans la condition. Un seul <code>=</code> range une valeur ; il en faut <strong>deux</strong> pour comparer.',
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
<h2>La boucle for, forme complète</h2>
<pre class="bloc-code">for (int i = 0; i < 5; i++) {
    printf("%d ", i);      // 0 1 2 3 4
}</pre>
<p>Trois parties séparées par des points-virgules, dans les parenthèses :</p>
<ol>
<li><code>int i = 0</code> — le <strong>départ</strong>, exécuté une seule fois ;</li>
<li><code>i &lt; 5</code> — la <strong>condition de continuation</strong>, testée avant chaque tour ;</li>
<li><code>i++</code> — le <strong>pas</strong>, exécuté à la fin de chaque tour.</li>
</ol>
<p>C'est exactement la forme que tu as vue en JavaScript. Python la cachait derrière <code>range()</code> ; ici tout est visible.</p>

<h2>Compter de 1 à 5</h2>
<pre class="bloc-code">for (int i = 1; i <= 5; i++) {
    printf("%d ", i);      // 1 2 3 4 5
}</pre>
<p>Deux réglages suffisent : partir de 1, et utiliser <code>&lt;=</code> au lieu de <code>&lt;</code>.</p>

<h2>while et do...while</h2>
<pre class="bloc-code">int i = 3;
while (i > 0) {
    printf("%d\\n", i);
    i--;
}</pre>
<p>Le <code>do...while</code> est une particularité du C : il exécute le bloc <strong>avant</strong> de tester, donc au moins une fois.</p>
<pre class="bloc-code">int n = 100;
do {
    printf("Je passe quand même\\n");
} while (n < 10);      // faux dès le départ, mais affiché une fois</pre>

<div class="attention"><div>Oublier le <code>i++</code> dans un <code>while</code> crée une boucle infinie. En C compilé, le programme se fige et il faut le tuer à la main. Ici, l'interpréteur t'arrête au bout de quelques secondes avec un message.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Affiche les nombres de 1 à 5 séparés par un espace, sur une seule ligne, avec une boucle <code>for</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    printf("\\n");\n    return 0;\n}',
      indice: '<code>for (int i = 1; i <= 5; i++) { printf("%d ", i); }</code> — remarque le <code>&lt;=</code> pour inclure 5.',
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
      indice: '<code>printf("7 x %d = %d\\n", i, 7 * i);</code> — deux trous, deux valeurs.',
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
      indice: 'L\'accumulateur : dans la boucle, <code>somme += i;</code> puis, après la boucle, un printf.',
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
<p>Un tableau en C, c'est une <strong>suite de cases de même type, collées en mémoire</strong>. Sa taille est fixée à la déclaration et ne changera jamais.</p>

<pre class="bloc-code">int notes[5];                          // 5 cases vides
int notes[5] = {12, 15, 9, 18, 14};    // 5 cases remplies
int notes[] = {12, 15, 9, 18, 14};     // le C compte pour toi : 5</pre>

<h2>Accéder aux cases</h2>
<pre class="bloc-code">printf("%d\\n", notes[0]);   // 12 — la PREMIÈRE case porte le numéro 0
printf("%d\\n", notes[4]);   // 14 — la dernière d'un tableau de 5
notes[2] = 10;              // on modifie la troisième case</pre>

<h2>Parcourir un tableau</h2>
<pre class="bloc-code">for (int i = 0; i < 5; i++) {
    printf("%d ", notes[i]);
}</pre>

<div class="attention"><div><strong>Le C ne vérifie rien.</strong> Écrire <code>notes[10]</code> dans un tableau de 5 cases ne provoque aucune erreur à la compilation : le programme va lire (ou écrire !) de la mémoire qui ne lui appartient pas. Résultat : une valeur aberrante, un plantage, ou pire — une faille de sécurité. C'est la fameuse « erreur de segmentation », et c'est la première cause de vulnérabilités dans les logiciels écrits en C.</div></div>

<div class="info"><div>Contrairement à Python, il n'existe pas de <code>len()</code> pour un tableau C : la taille n'est pas stockée avec lui. Tu dois la retenir toi-même, généralement dans une constante ou une variable à côté.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Crée un tableau <code>notes</code> contenant 12, 15, 9, 18, 14 puis affiche la <strong>première</strong> et la <strong>dernière</strong> note, sur deux lignes.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}',
      indice: '<code>int notes[] = {12, 15, 9, 18, 14};</code> — la première case est <code>notes[0]</code>, la dernière <code>notes[4]</code>.',
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
      indice: '<code>for (int i = 0; i < 5; i++) { somme += notes[i]; }</code> puis un printf après la boucle.',
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
      indice: 'Pars de la première note, parcours les suivantes, et remplace <code>max</code> chaque fois que tu trouves mieux : <code>if (notes[i] > max) { max = notes[i]; }</code>',
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
<p>Une fonction C ressemble beaucoup à ce que tu connais, avec une nouveauté : il faut <strong>annoncer le type de ce qu'elle renvoie</strong>.</p>

<pre class="bloc-code">int carre(int x) {
    return x * x;
}

int main() {
    printf("%d\\n", carre(7));   // 49
    return 0;
}</pre>

<p>Décomposons <code>int carre(int x)</code> :</p>
<ul>
<li>le premier <code>int</code> — <strong>le type de retour</strong> : cette fonction renvoie un entier ;</li>
<li><code>carre</code> — son nom ;</li>
<li><code>(int x)</code> — ses paramètres, chacun avec son type.</li>
</ul>

<h2>Une fonction qui ne renvoie rien : void</h2>
<pre class="bloc-code">void saluer(char nom[]) {
    printf("Bonjour %s !\\n", nom);
    // pas de return : rien à renvoyer
}</pre>
<p><code>void</code> signifie « vide ». C'est aussi pour ça que <code>main</code> est déclaré <code>int</code> : il renvoie un code de sortie au système, d'où le <code>return 0;</code>.</p>

<h2>L'ordre compte</h2>
<p>Le C lit ton fichier de haut en bas. Une fonction doit être <strong>définie avant</strong> l'endroit où on l'appelle — sinon le compilateur ne la connaît pas encore. En pratique, on place ses fonctions au-dessus de <code>main</code>.</p>

<div class="astuce"><div>Dans les vrais projets, on annonce les fonctions en haut du fichier par un <strong>prototype</strong> — <code>int carre(int x);</code> avec un point-virgule et sans corps — puis on écrit leur code plus bas, dans l'ordre qu'on veut. C'est ce que contiennent les fichiers <code>.h</code> comme <code>stdio.h</code>.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Écris une fonction <code>carre</code> qui prend un <code>int</code> et renvoie son carré, puis affiche <code>carre(7)</code> depuis le main.',
      codeDepart: '#include <stdio.h>\n\n// ta fonction ici (AVANT le main)\n\nint main() {\n    \n    return 0;\n}',
      indice: '<code>int carre(int x) { return x * x; }</code> au-dessus du main, puis <code>printf("%d\\n", carre(7));</code> dedans.',
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
      indice: '<code>void</code> veut dire « ne renvoie rien » : <code>void afficher_ligne() { printf("--------\\n"); }</code>',
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
      indice: 'Dans la fonction : <code>if (a > b) { return a; } else { return b; }</code>. Un <code>return</code> quitte immédiatement la fonction.',
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
<p>Voici une des grandes singularités du C : <strong>le type « texte » n'existe pas</strong>. Une chaîne est un simple tableau de <code>char</code>.</p>

<pre class="bloc-code">char nom[] = "Alex";</pre>

<p>En mémoire, ce tableau contient cinq cases, pas quatre :</p>
<table class="memo-table">
<tr><th>Case</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th></tr>
<tr><td>Contenu</td><td>'A'</td><td>'l'</td><td>'e'</td><td>'x'</td><td>'\\0'</td></tr>
</table>

<h2>Le caractère invisible qui change tout</h2>
<p>Le <code>'\\0'</code> final s'appelle le <strong>caractère nul</strong>. C'est lui qui marque la fin du texte. Sans lui, aucune fonction ne saurait où s'arrêter : <code>printf</code> continuerait à afficher la mémoire suivante jusqu'à tomber par hasard sur un zéro. Le C ne stocke pas la longueur — il stocke une <strong>borne</strong>.</p>

<h2>Manipuler du texte</h2>
<pre class="bloc-code">char nom[] = "Alex";

printf("%s\\n", nom);              // Alex — %s pour une chaîne
printf("%c\\n", nom[0]);           // A — une seule case, donc %c
printf("%d\\n", strlen(nom));      // 4 — la longueur, sans le '\\0'</pre>

<p><code>strlen</code> compte les caractères jusqu'au <code>'\\0'</code>. Elle vient de <code>&lt;string.h&gt;</code>, qu'il faut inclure dans un vrai programme.</p>

<div class="attention"><div>On ne peut <strong>pas</strong> écrire <code>nom = "Bob"</code> après la déclaration, ni coller deux textes avec <code>+</code> comme en Python ou en Java. Un tableau n'est pas une valeur qu'on remplace : il faut copier caractère par caractère (ou utiliser <code>strcpy</code>). Cette rigidité est le prix du contrôle total sur la mémoire.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Déclare <code>char nom[] = "Alex";</code> puis affiche, sur trois lignes : le nom entier, sa <strong>première lettre</strong>, et sa <strong>longueur</strong>.',
      codeDepart: '#include <stdio.h>\n#include <string.h>\n\nint main() {\n    \n    return 0;\n}',
      indice: 'Trois formats différents : <code>%s</code> pour la chaîne, <code>%c</code> pour <code>nom[0]</code>, <code>%d</code> pour <code>strlen(nom)</code>.',
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
      indice: '<code>for (int i = 0; i < strlen(mot); i++) { printf("%c\\n", mot[i]); }</code>',
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
      indice: 'Dans la boucle, compare la case au caractère : <code>if (phrase[i] == \'o\') { compte++; }</code> — apostrophes simples pour un char.',
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
<p>On y est. C'est LA notion qui fait la réputation du C, celle qui bloque tout le monde au début et qui devient limpide une fois qu'on a compris l'image. Prends ton temps sur cette leçon.</p>

<h2>L'idée : une variable a une adresse</h2>
<p>Quand tu écris <code>int age = 30;</code>, le programme réserve une case en mémoire. Cette case contient <strong>30</strong>, et elle se trouve <strong>quelque part</strong> — à une adresse, comme une maison dans une rue.</p>
<p>Un <strong>pointeur</strong> est une variable qui ne contient pas une valeur, mais <strong>l'adresse d'une autre variable</strong>.</p>

<pre class="bloc-code">int age = 30;
int *p = &age;     // p contient l'ADRESSE de age

printf("%d\\n", age);    // 30 — la valeur
printf("%d\\n", *p);     // 30 — la valeur trouvée À cette adresse</pre>

<h2>Deux symboles à ne pas confondre</h2>
<table class="memo-table">
<tr><th>Écriture</th><th>Sens</th></tr>
<tr><td>&amp;age</td><td>« l'adresse de age » — on prend le numéro de la maison</td></tr>
<tr><td>*p</td><td>« ce qui se trouve à l'adresse p » — on entre dans la maison</td></tr>
<tr><td>int *p</td><td>déclaration : « p est un pointeur vers un int »</td></tr>
</table>

<h2>Modifier à distance</h2>
<p>C'est là que ça devient puissant : à travers un pointeur, on peut <strong>changer la variable d'origine</strong>.</p>
<pre class="bloc-code">int age = 30;
int *p = &age;
*p = 31;                  // on écrit À l'adresse pointée
printf("%d\\n", age);      // 31 — age a changé !</pre>

<div class="info"><div><strong>L'image à retenir :</strong> <code>age</code> est une maison, <code>&amp;age</code> est son adresse postale, <code>p</code> est un carnet où tu as noté cette adresse, et <code>*p</code> c'est aller à l'adresse notée pour voir ce qu'il y a dedans. Si tu déposes quelque chose à cette adresse, c'est bien dans la vraie maison que ça atterrit.</div></div>

<div class="astuce"><div>Pourquoi s'embêter ? Parce que passer une adresse est <strong>instantané</strong>, même pour une donnée énorme : on transmet un numéro, pas une copie. C'est ce qui rend le C si rapide — et c'est la raison d'être de la leçon suivante.</div></div>
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
<p>Voici le problème que les pointeurs résolvent, et la raison pour laquelle ils existent.</p>

<h2>Par défaut, une fonction reçoit une copie</h2>
<pre class="bloc-code">void doubler(int n) {
    n = n * 2;              // modifie la COPIE locale
}

int main() {
    int x = 5;
    doubler(x);
    printf("%d\\n", x);      // 5 — x n'a pas bougé !
    return 0;
}</pre>
<p>La fonction a bien doublé quelque chose… mais sa propre copie, qui disparaît à la fin de l'appel. C'est ce qu'on appelle le <strong>passage par valeur</strong>, et c'est le comportement par défaut du C.</p>

<h2>La solution : passer l'adresse</h2>
<pre class="bloc-code">void doubler(int *n) {
    *n = *n * 2;            // modifie ce qui est À l'adresse
}

int main() {
    int x = 5;
    doubler(&x);            // on envoie l'ADRESSE de x
    printf("%d\\n", x);      // 10 — x a vraiment changé
    return 0;
}</pre>

<p>Trois changements, toujours les mêmes :</p>
<ol>
<li>le paramètre devient <code>int *n</code> ;</li>
<li>dans la fonction, on travaille sur <code>*n</code> ;</li>
<li>à l'appel, on passe <code>&amp;x</code>.</li>
</ol>

<div class="info"><div>Tu utilises ce mécanisme depuis toujours sans le savoir : en Python, modifier une liste dans une fonction affecte la liste d'origine, alors que modifier un nombre ne change rien. Python fait ce choix pour toi, silencieusement. Le C te le met dans les mains — d'où sa réputation d'être à la fois plus difficile et plus honnête.</div></div>

<div class="astuce"><div>Un tableau passé à une fonction est <strong>toujours</strong> transmis par adresse, sans qu'on ait à écrire <code>&amp;</code> : le nom d'un tableau <em>est</em> l'adresse de sa première case. C'est pour ça qu'une fonction peut modifier un tableau reçu en paramètre.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Ce programme ne fonctionne pas : <code>x</code> vaut toujours 5 à la fin. Corrige la fonction <strong>et</strong> son appel pour qu\'il affiche <code>10</code>.',
      codeDepart: '#include <stdio.h>\n\nvoid doubler(int n) {\n    n = n * 2;\n}\n\nint main() {\n    int x = 5;\n    doubler(x);\n    printf("%d\\n", x);\n    return 0;\n}',
      indice: 'Trois modifications : le paramètre devient <code>int *n</code>, la ligne devient <code>*n = *n * 2;</code>, et l\'appel devient <code>doubler(&x);</code>',
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
      indice: 'Il faut une variable temporaire, sinon la première valeur est perdue :<br><code>int temp = *a;</code><br><code>*a = *b;</code><br><code>*b = temp;</code>',
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
      indice: 'Pas besoin d\'étoiles ici : un tableau est déjà passé par adresse. Une simple boucle suffit : <code>t[i] = t[i] * 2;</code>',
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
<p>Un tableau de tableaux : c'est ainsi qu'on représente une grille, un plateau de jeu, une image, une feuille de calcul.</p>

<pre class="bloc-code">int grille[3][3] = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

printf("%d\\n", grille[0][0]);   // 1 — première ligne, première colonne
printf("%d\\n", grille[1][2]);   // 6 — deuxième ligne, troisième colonne</pre>

<p>L'ordre est toujours <strong>[ligne][colonne]</strong>. C'est la convention universelle, et l'inverser est une source d'erreurs classique.</p>

<h2>Parcourir une grille : deux boucles imbriquées</h2>
<pre class="bloc-code">for (int i = 0; i < 3; i++) {          // chaque ligne
    for (int j = 0; j < 3; j++) {      // chaque colonne de cette ligne
        printf("%d ", grille[i][j]);
    }
    printf("\\n");                      // fin de ligne
}</pre>

<p>La boucle extérieure avance ligne par ligne ; pour chaque ligne, la boucle intérieure parcourt toutes les colonnes. Le <code>printf("\\n")</code> est placé <strong>dans la boucle extérieure</strong>, après la boucle intérieure — c'est ce qui produit l'affichage en grille.</p>

<div class="astuce"><div>Une image numérique n'est rien d'autre qu'un tableau à deux dimensions : chaque case contient une couleur. Les filtres de retouche photo sont des boucles imbriquées qui passent sur chaque pixel — exactement la structure ci-dessus.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Affiche la grille complète, une ligne par ligne, les nombres séparés par un espace. Tu dois obtenir trois lignes : <code>1 2 3</code>, <code>4 5 6</code>, <code>7 8 9</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int grille[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    \n    return 0;\n}',
      indice: 'Deux boucles imbriquées, et le <code>printf("\\n")</code> APRÈS la boucle intérieure mais DANS la boucle extérieure.',
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
      indice: 'Mêmes boucles imbriquées, mais au lieu d\'afficher : <code>somme += grille[i][j];</code>. Le printf vient après les deux boucles.',
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
      indice: 'Sur la diagonale, la ligne et la colonne portent le même numéro : <code>grille[i][i]</code>.',
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
<p>Un tableau range des valeurs <strong>de même nature</strong>. Mais comment décrire un étudiant, avec un nom, un âge et une moyenne ? C'est le rôle de la <strong>structure</strong> : elle regroupe des données de types différents sous un seul nom.</p>

<pre class="bloc-code">struct Etudiant {
    char nom[50];
    int age;
    double moyenne;
};</pre>

<p>Cette déclaration crée un <strong>nouveau type</strong>. Elle ne réserve aucune mémoire : c'est un moule, pas un objet. Remarque le point-virgule après l'accolade fermante — obligatoire, et souvent oublié.</p>

<h2>Créer et remplir</h2>
<pre class="bloc-code">struct Etudiant e;
e.age = 20;
e.moyenne = 14.5;

printf("%d ans, moyenne %.1f\\n", e.age, e.moyenne);</pre>
<p>Le <strong>point</strong> permet d'atteindre chaque champ. C'est exactement la notation des objets JavaScript et des dictionnaires Python — mais ici, la liste des champs est figée à la compilation : impossible d'en ajouter un à la volée.</p>

<h2>Structures et fonctions</h2>
<pre class="bloc-code">double bonus(struct Etudiant e) {
    return e.moyenne + 1;
}</pre>

<div class="info"><div>La structure est l'ancêtre direct de l'objet. En C++, en Java, en Python, on a ajouté aux structures la possibilité de contenir aussi des <em>fonctions</em> — et l'objet était né. Comprendre <code>struct</code>, c'est comprendre d'où vient la programmation orientée objet.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Définis une structure <code>Point</code> avec deux champs <code>int x</code> et <code>int y</code>. Crée ensuite un point, mets-y 3 et 4, et affiche <code>3,4</code>.',
      codeDepart: '#include <stdio.h>\n\n// ta structure ici (avant le main)\n\nint main() {\n    \n    return 0;\n}',
      indice: '<code>struct Point { int x; int y; };</code> — sans oublier le point-virgule final. Puis <code>struct Point p; p.x = 3; p.y = 4;</code>',
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
      indice: 'Format d\'affichage : <code>printf("%d ans, moyenne %.1f\\n", e.age, e.moyenne);</code>',
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
      indice: 'Une structure se passe en paramètre comme n\'importe quelle valeur : <code>int distance_origine(struct Point p) { return p.x + p.y; }</code>',
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
<p>Une fonction <strong>récursive</strong> est une fonction qui s'appelle elle-même. L'idée déroute au début, puis devient un outil élégant pour les problèmes qui se décomposent naturellement.</p>

<h2>L'exemple canonique : la factorielle</h2>
<p>La factorielle de 5 s'écrit 5! et vaut 5 × 4 × 3 × 2 × 1 = 120. Remarque la structure : 5! = 5 × 4!, et 4! = 4 × 3!, etc. Le problème se ramène toujours à une version plus petite de lui-même.</p>

<pre class="bloc-code">int factorielle(int n) {
    if (n <= 1) {
        return 1;              // le CAS D'ARRÊT
    }
    return n * factorielle(n - 1);   // l'appel récursif
}</pre>

<h2>Le déroulé</h2>
<pre class="bloc-code">factorielle(4)
= 4 * factorielle(3)
= 4 * (3 * factorielle(2))
= 4 * (3 * (2 * factorielle(1)))
= 4 * (3 * (2 * 1))
= 24</pre>

<h2>La règle absolue</h2>
<p>Toute fonction récursive a besoin de deux choses :</p>
<ol>
<li>un <strong>cas d'arrêt</strong> qui ne s'appelle pas lui-même (ici <code>n &lt;= 1</code>) ;</li>
<li>un appel qui <strong>se rapproche</strong> du cas d'arrêt (ici <code>n - 1</code>).</li>
</ol>

<div class="attention"><div>Sans cas d'arrêt, la fonction s'appelle indéfiniment jusqu'à saturer la mémoire réservée aux appels : c'est le <strong>débordement de pile</strong> (« stack overflow » — oui, comme le site). En C, le programme plante brutalement.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: 'Écris la fonction <code>factorielle</code> et affiche <code>factorielle(5)</code>, qui doit valoir <code>120</code>.',
      codeDepart: '#include <stdio.h>\n\n// ta fonction récursive ici\n\nint main() {\n    printf("%d\\n", factorielle(5));\n    return 0;\n}',
      indice: 'Le cas d\'arrêt d\'abord : <code>if (n <= 1) return 1;</code>. Puis l\'appel récursif : <code>return n * factorielle(n - 1);</code>',
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
      indice: 'La somme jusqu\'à n vaut n plus la somme jusqu\'à n-1. Cas d\'arrêt : <code>if (n <= 0) return 0;</code>',
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
<p>Dernier exercice du module : un programme complet qui rassemble tableaux, boucles, fonctions et calculs. C'est le genre d'utilitaire qu'on écrit vraiment en C.</p>

<h2>Ce que tu vas construire</h2>
<p>À partir d'un tableau de notes, ton programme calculera successivement la moyenne, la meilleure note, et le nombre de reçus. Chaque étape est un exercice.</p>

<h2>Ton aide-mémoire</h2>
<pre class="bloc-code">int t[] = {…};                 // tableau
for (int i = 0; i < n; i++)    // parcours
somme += t[i];                 // accumulateur
(double)somme / n              // moyenne SANS perdre les décimales
if (t[i] > max) max = t[i];    // recherche du maximum
printf("%.2f\\n", x);           // affichage à 2 décimales</pre>

<div class="astuce"><div>Méthode quand un programme C résiste : ajoute des <code>printf</code> temporaires pour voir la valeur des variables à chaque tour de boucle. C'est rudimentaire, mais c'est encore aujourd'hui la technique de débogage la plus utilisée au monde.</div></div>
`,
  exercices: [
    {
      type: 'c',
      consigne: '<strong>Étape 1 :</strong> calcule et affiche la <strong>moyenne</strong> des 5 notes avec deux décimales. Attention au piège de la division entière — le résultat attendu est <code>13.60</code>.',
      codeDepart: '#include <stdio.h>\n\nint main() {\n    int notes[] = {12, 15, 9, 18, 14};\n    int taille = 5;\n    int somme = 0;\n    \n    return 0;\n}',
      indice: 'Totalise avec une boucle, puis divise en convertissant : <code>(double)somme / taille</code>. Affiche avec <code>%.2f</code>.',
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
      indice: 'Dans la fonction : pars de <code>t[0]</code>, parcours à partir de l\'indice 1, et remplace si tu trouves mieux. Puis <code>printf("%d\\n", maximum(notes, 5));</code>',
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
      indice: 'Compteur conditionnel dans la boucle : <code>if (notes[i] >= 10) { recus++; }</code>. Puis <code>printf("%d recus sur %d\\n", recus, taille);</code>',
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
