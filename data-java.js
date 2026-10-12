/* ===== Module : Java — Le langage des grandes applications ===== */
window.DATA_JAVA = [

/* ---------- j-1 ---------- */
{
  id: 'j-1',
  titre: 'Java : tout vit dans une classe',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Java est le langage des grandes applications : banques, assurances, administrations, applications Android, systèmes qui tournent depuis vingt ans sans interruption.</p>
<p>Sa devise historique était « écrire une fois, exécuter partout ». L'idée : au lieu de compiler pour une machine précise comme le C, on compile vers un format intermédiaire que n'importe quelle machine équipée d'une <strong>machine virtuelle Java</strong> sait exécuter. Un même programme tourne alors sur Windows, Linux, un téléphone ou un serveur.</p>
<p>Ce choix explique presque tout le reste : Java est plus lent à démarrer que le C, incomparablement plus portable, et il surveille à l'exécution ce que le C laisse passer.</p>

<h2>Tout vit dans une classe</h2>
<pre class="bloc-code">public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour");
    }
}</pre>
<p>En Java, <strong>il n'existe pas de code hors d'une classe</strong>. Même le point d'entrée du programme est une méthode, à l'intérieur d'une classe. Cette rigueur paraît lourde sur trois lignes ; elle prend son sens sur un projet de deux mille fichiers.</p>
<p>Décortiquons la ligne qui fait peur :</p>
<ul>
<li><code>public</code> — visible de partout ;</li>
<li><code>static</code> — appartient à la classe, pas à un objet : on peut l'appeler sans rien créer ;</li>
<li><code>void</code> — ne renvoie rien ;</li>
<li><code>main</code> — le nom que la machine virtuelle cherche pour démarrer ;</li>
<li><code>String[] args</code> — les arguments passés en ligne de commande.</li>
</ul>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>compilation</td><td>ton code devient du <em>bytecode</em>, pas des instructions machine</td></tr>
<tr><td>lancement</td><td>la machine virtuelle lit ce bytecode</td></tr>
<tr><td>elle cherche <code>main</code></td><td>et l'appelle</td></tr>
<tr><td>exécution</td><td>ligne après ligne, avec vérifications permanentes</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Oublier qu'il faut une classe.</strong> Du code posé seul ne compile pas. Tout, absolument tout, est dans une classe.</p>
<p><strong>Se tromper de casse.</strong> <code>System.out.println</code> prend trois majuscules bien placées. Java distingue les majuscules, et <code>system</code> n'existe pas.</p>
<p><strong>Oublier un point-virgule.</strong> Le cours le dit précisément : <em>« il manque un point-virgule <code>;</code> à la fin de cette instruction — j'ai trouvé « System » juste après. »</em></p>
<p><strong>Croire que Java et JavaScript sont parents.</strong> Les noms se ressemblent pour des raisons de marketing de 1995, et les langages n'ont presque rien en commun.</p>

<h2>Dans la vraie vie</h2>
<p>Java reste l'un des langages les plus demandés du marché, parce que les systèmes qu'il fait tourner ne se remplacent pas : une banque ne réécrit pas son cœur métier tous les cinq ans. Sa verbosité, souvent moquée, est le prix d'un code que des équipes de cinquante personnes peuvent lire sans se marcher dessus.</p>

<div class="a-retenir">
<ul>
<li>Java compile vers un format intermédiaire, exécuté par une <strong>machine virtuelle</strong>.</li>
<li>Tout code vit dans une classe — <code>main</code> compris.</li>
<li><code>public static void main(String[] args)</code> est le point d'entrée.</li>
<li>Java distingue les majuscules, partout.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi le fichier doit porter le nom de la classe</summary>
<p>Une classe <code>public</code> doit se trouver dans un fichier qui porte exactement son nom — <code>Main.java</code> pour <code>public class Main</code>. C'est une règle du compilateur, pas une convention : elle permet de retrouver n'importe quelle classe sans index, simplement d'après son nom. Dans ce cours, le fichier est géré pour toi ; dès que tu écriras sur ta machine, cette règle s'appliquera.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Complète le programme pour qu\'il affiche <code>Bonjour le monde !</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Toute la carcasse est déjà là : la classe, le <code>main</code>. Il ne manque qu’une instruction à l’intérieur.",
        "Afficher en Java, c’est <code>System.out.println(…)</code> — long, mais sans ambiguïté. Le texte va entre guillemets.",
        "<code>System.out.println(\"Bonjour le monde !\");</code> — sans oublier le point-virgule."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Bonjour le monde !");\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/System\.out\.print/.test(ctx.code)) return { ok: false, message: 'Utilise <code>System.out.println(...)</code> pour afficher.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche. Ton instruction doit être à l\'intérieur des accolades du main.' };
        if (l[0] !== 'Bonjour le monde !') return { ok: false, message: 'Attendu exactement <code>Bonjour le monde !</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Ton premier programme Java. Trois niveaux d\'accolades pour une ligne utile — bienvenue dans le monde de l\'entreprise.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> affiche trois lignes — <code>Ligne 1</code>, <code>Ligne 2</code>, <code>Ligne 3</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Trois lignes à afficher, donc trois instructions. Mais contrairement au C, tu n’as rien à ajouter à la fin du texte.",
        "Le <code>ln</code> de <code>println</code> veut dire « line » : il passe à la ligne tout seul.",
        "Trois <code>System.out.println(…)</code>, l’un sous l’autre."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Ligne 1");\n        System.out.println("Ligne 2");\n        System.out.println("Ligne 3");\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes — j\'en compte ' + l.length + (l.length === 1 ? '. As-tu utilisé <code>print</code> au lieu de <code>println</code> ?' : '.') };
        if (l[0] !== 'Ligne 1' || l[2] !== 'Ligne 3') return { ok: false, message: 'Attendu : Ligne 1, Ligne 2, Ligne 3 dans cet ordre.' };
        return { ok: true, message: 'println inclut le retour à la ligne — un confort que le C ne t\'offrait pas.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Pourquoi tout code Java doit-il se trouver dans une <code>class</code> ?',
      choix: [
        'Parce que Java est conçu autour des objets : la classe est son unité de base',
        'Parce que c\'est plus rapide à l\'exécution',
        'Parce que le fichier doit avoir moins de 100 lignes',
        'C\'est faux, on peut écrire du code hors classe'
      ],
      bonne: 0,
      explication: 'Java est un langage orienté objet « jusqu\'au bout » : tout est organisé en classes, y compris le point d\'entrée du programme. C\'est un parti pris de conception, pas une contrainte technique.',
      aides: [
        null,
        'La performance ne dépend pas de cette organisation — c\'est un choix de structure du langage.',
        'Aucune limite de taille. Les fichiers Java des grands projets font régulièrement plusieurs centaines de lignes.',
        'En Java, c\'est impossible : même la méthode main doit être déclarée dans une classe. C\'est ce qui le distingue de Python ou du C.'
      ]
    }
  ]
},

/* ---------- j-2 ---------- */
{
  id: 'j-2',
  titre: 'Les types et l\'affichage',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Comme en C, Java exige que tu déclares le type de chaque variable. La différence est immédiate et confortable : <strong>Java possède un vrai type <code>String</code></strong> pour le texte, là où le C n'a que des tableaux de caractères.</p>
<pre class="bloc-code">int age = 30;
double prix = 19.99;
boolean actif = true;
char initiale = 'A';
String nom = "Alex";</pre>
<p>Deux nouveautés par rapport au C : <code>boolean</code>, un vrai type à deux valeurs — pas un entier déguisé — et <code>String</code>, avec sa majuscule, parce que ce n'est pas un type primitif mais une classe.</p>

<h2>Afficher</h2>
<pre class="bloc-code">System.out.println("Bonjour " + nom);
System.out.println("J'ai " + age + " ans");</pre>
<p>Mesuré : <code>"valeur : " + 3</code> affiche bien <code>valeur : 3</code>. Le <code>+</code> entre un texte et un nombre convertit automatiquement — ce que Python refuse et que le C ne sait pas faire. C'est l'une des commodités les plus utilisées du langage.</p>
<p><code>println</code> va à la ligne ; <code>print</code> ne le fait pas.</p>

<h2>Pas à pas : la conversion</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Résultat</th></tr>
<tr><td><code>"total : " + 3</code></td><td><code>total : 3</code> — le nombre devient du texte</td></tr>
<tr><td><code>1 + 2 + " pommes"</code></td><td><code>3 pommes</code> — les nombres s'additionnent d'abord</td></tr>
<tr><td><code>"pommes " + 1 + 2</code></td><td><code>pommes 12</code> — tout est déjà du texte</td></tr>
</table>
<p>La lecture se fait de gauche à droite, et le premier texte rencontré transforme tout le reste. Deux lignes presque identiques, deux résultats différents : c'est un piège réel, et la parenthèse le règle.</p>

<h2>Convertir à la main</h2>
<p><code>Integer.parseInt("42")</code> transforme un texte en entier, <code>Double.parseDouble("1.5")</code> en décimal, et <code>String.valueOf(42)</code> fait l'inverse. Une conversion impossible ne donne pas zéro : elle arrête le programme.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le type.</strong> Le cours est explicite : <em>« la variable <code>inconnu</code> n'existe pas. En C comme en Java, il faut la déclarer avec son type avant de l'utiliser. »</em></p>
<p><strong>Confondre <code>'A'</code> et <code>"A"</code>.</strong> Apostrophes simples pour un <code>char</code>, guillemets doubles pour un <code>String</code>. Les intervertir est une erreur de type, refusée.</p>
<p><strong>Oublier les parenthèses dans une concaténation.</strong> Le tableau ci-dessus montre pourquoi : <code>"total : " + 1 + 2</code> affiche <code>12</code>, pas <code>3</code>.</p>
<p><strong>Écrire <code>string</code> en minuscules.</strong> C'est <code>String</code>, avec sa majuscule — parce que c'est une classe, pas un type de base.</p>

<h2>Dans la vraie vie</h2>
<p>La distinction entre types primitifs (<code>int</code>, <code>double</code>, <code>boolean</code>, <code>char</code>) et classes (<code>String</code> et le reste) traverse tout Java. Les premiers sont rapides et simples ; les secondes ont des méthodes et peuvent valoir <code>null</code>. C'est l'une des premières choses qu'on apprend à distinguer d'instinct.</p>

<div class="a-retenir">
<ul>
<li>Un type devant chaque variable, et <code>String</code> avec sa majuscule.</li>
<li><code>boolean</code> est un vrai type, contrairement au C.</li>
<li>Le <code>+</code> entre texte et nombre convertit — et l'ordre de lecture compte.</li>
<li><code>Integer.parseInt</code> convertit du texte en entier.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les enveloppes</summary>
<p>À chaque type primitif correspond une classe : <code>int</code> a <code>Integer</code>, <code>double</code> a <code>Double</code>. Pourquoi deux ? Parce que certaines structures de Java ne savent manipuler que des objets. Le langage convertit automatiquement de l'un à l'autre depuis 2004 — une commodité qui cache un coût réel, et qui réserve une surprise : deux <code>Integer</code> comparés avec <code>==</code> peuvent être faux alors que leurs valeurs sont égales.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Déclare un <code>String nom</code> valant <code>Alex</code> et un <code>int age</code> valant 30, puis affiche <code>Alex a 30 ans</code> en assemblant les variables avec des <code>+</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Le texte et les variables s’assemblent avec un <code>+</code>. Java devine qu’il s’agit de coller, pas d’additionner, dès qu’un texte est en jeu.",
        "Chaque morceau de texte va entre guillemets, chaque variable sans. Attention aux espaces : ils doivent être <strong>dans</strong> les guillemets.",
        "<code>System.out.println(nom + \" a \" + age + \" ans\");</code>"
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        String nom = "Alex";\n        int age = 30;\n        System.out.println(nom + " a " + age + " ans");\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/String\s+nom/.test(ctx.code)) return { ok: false, message: 'Déclare <code>String nom = "Alex";</code> — String avec un S majuscule.' };
        if (!/int\s+age/.test(ctx.code)) return { ok: false, message: 'Déclare <code>int age = 30;</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0] !== 'Alex a 30 ans') return { ok: false, message: 'Attendu exactement <code>Alex a 30 ans</code> — tu affiches « ' + l[0] + ' ». Vérifie les espaces dans tes guillemets.' };
        return { ok: true, message: 'Le <code>+</code> convertit les nombres en texte automatiquement. Bien plus simple que les %d du C.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> déclare les cinq types (<code>int</code>, <code>double</code>, <code>boolean</code>, <code>char</code>, <code>String</code>) et affiche-les tous sur une seule ligne, séparés par des espaces : <code>30 1.75 true A Alex</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Cinq types à déclarer, chacun avec son mot-clé. Java exige de dire le type <strong>avant</strong> le nom, toujours.",
        "Un piège : <code>true</code> et <code>false</code> s’écrivent tout en minuscules. Et un <code>char</code> va entre apostrophes simples, un <code>String</code> entre guillemets doubles.",
        "Un seul <code>println</code>, avec des <code>+ \" \" +</code> entre chaque variable."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        int age = 30;\n        double taille = 1.75;\n        boolean majeur = true;\n        char initiale = \'A\';\n        String nom = "Alex";\n        System.out.println(age + " " + taille + " " + majeur + " " + initiale + " " + nom);\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/boolean\s+\w+\s*=\s*true/.test(ctx.code)) return { ok: false, message: 'Déclare un <code>boolean</code> valant <code>true</code> (en minuscules — contrairement à Python).' };
        if (!/char\s+\w+\s*=\s*'/.test(ctx.code)) return { ok: false, message: 'Le <code>char</code> s\'écrit avec des apostrophes simples : <code>char initiale = \'A\';</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== '30 1.75 true A Alex') return { ok: false, message: 'Attendu exactement <code>30 1.75 true A Alex</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Cinq types, un seul println. Java affiche chaque valeur selon sa nature, sans que tu aies à le préciser.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Chasse au bug :</strong> ce programme devrait afficher <code>Total : 5</code> mais affiche autre chose. Lance-le pour voir, puis corrige — sans changer les nombres.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Total : " + 2 + 3);\n    }\n}',
      indices: [
        "Ce n’est pas une addition ratée : regarde l’ordre dans lequel Java lit la ligne.",
        "Java lit de gauche à droite. Le texte vient en premier, donc il <strong>absorbe</strong> le 2, puis le 3 : tout devient du collage.",
        "Force le calcul à se faire d’abord, en l’entourant de parenthèses."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Total : " + (2 + 3));\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0] === 'Total : 23') return { ok: false, message: 'Toujours « Total : 23 » : le texte colle le 2 puis le 3 au lieu de les additionner. Entoure l\'addition de parenthèses : <code>+ (2 + 3)</code>.' };
        if (/["']5["']/.test(ctx.code)) return { ok: false, message: 'Le 5 ne doit pas être écrit à la main — c\'est l\'addition qui doit le produire.' };
        if (l[0] !== 'Total : 5') return { ok: false, message: 'Attendu <code>Total : 5</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Le <code>+</code> a deux métiers : additionner des nombres et coller du texte. Dès qu\'un texte est en jeu, il colle — d\'où les parenthèses.' };
      }
    }
  ]
},

/* ---------- j-3 ---------- */
{
  id: 'j-3',
  titre: 'Les opérations et la division entière',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Les opérateurs sont les mêmes qu'en C : <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, <code>%</code>. Et Java reprend <strong>exactement le même piège</strong> sur la division — ce n'est pas un hasard, c'est un héritage assumé.</p>

<h2>La division entière</h2>
<pre class="bloc-code">int a = 7, b = 2;
System.out.println(a / b);              // 3, pas 3.5
System.out.println(a % b);              // 1
System.out.println((double) a / b);     // 3.5</pre>
<p>Mesuré : <code>3</code>, <code>1</code>, <code>3.5</code>. Entre deux entiers, la division donne un entier, et la partie décimale est jetée — pas arrondie.</p>
<p>Comme en C, c'est le type des <em>opérandes</em> qui décide, pas celui de la destination. <code>double m = a / b;</code> donne <code>3.0</code> : le mal est fait avant l'affectation.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Résultat</th><th>Pourquoi</th></tr>
<tr><td><code>7 / 2</code></td><td>3</td><td>deux entiers</td></tr>
<tr><td><code>7.0 / 2</code></td><td>3.5</td><td>un décimal suffit</td></tr>
<tr><td><code>(double) 7 / 2</code></td><td>3.5</td><td>conversion explicite</td></tr>
<tr><td><code>7 / 2.0</code></td><td>3.5</td><td>peu importe lequel des deux</td></tr>
</table>

<h2>Les raccourcis</h2>
<p><code>x += 5</code>, <code>x++</code>, <code>x--</code> fonctionnent comme en C — Java les a repris tels quels. Et <code>Math.round</code>, <code>Math.abs</code>, <code>Math.max</code>, <code>Math.sqrt</code>, <code>Math.random</code> fournissent le reste.</p>
<p><code>Math.random()</code> rend un décimal entre 0 et 1 ; pour un dé, la formule est celle de JavaScript : <code>(int)(Math.random() * 6) + 1</code>.</p>

<h2>Les pièges</h2>
<p><strong>La division entière non voulue.</strong> Une moyenne qui tombe toujours juste, un pourcentage à zéro. Aucune erreur, un résultat faux et plausible — le même bug qu'en C, dans le même contexte.</p>
<p><strong>Croire que le type de destination suffit.</strong> <code>double moyenne = somme / nombre;</code> avec deux entiers est déjà perdu.</p>
<p><strong>Dépasser la capacité d'un <code>int</code>.</strong> Au-delà d'environ deux milliards, la valeur repart dans les négatifs sans le moindre avertissement. Pour de grands nombres, c'est <code>long</code>.</p>
<p><strong>Diviser par zéro.</strong> Le cours arrête : <em>« division par zéro : impossible. »</em> En vrai Java, une division entière par zéro lève une exception — alors qu'une division <em>décimale</em> par zéro rend l'infini, sans erreur. Deux comportements pour un même symbole.</p>

<h2>Dans la vraie vie</h2>
<p>Les calculs d'argent ne se font jamais en <code>double</code> : les décimaux binaires ne représentent pas exactement 0,10 euro, et les écarts s'accumulent. Les applications bancaires comptent en centimes avec des entiers, ou utilisent une classe dédiée aux décimaux exacts. C'est l'une des premières règles qu'on apprend en entreprise.</p>

<div class="a-retenir">
<ul>
<li>Entre deux entiers, <code>/</code> donne un <strong>entier</strong> : 7 / 2 vaut 3.</li>
<li>C'est le type des opérandes qui décide, pas celui de la destination.</li>
<li>Un <code>int</code> déborde silencieusement au-delà de deux milliards.</li>
<li>Jamais de <code>double</code> pour de l'argent.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi Java a gardé ce piège</summary>
<p>Java aurait pu rendre <code>7 / 2</code> égal à 3.5, comme Python 3 l'a fait en 2008. Il ne l'a pas fait pour deux raisons : la compatibilité avec le C, dont il voulait attirer les développeurs, et la performance — une division entière est une instruction processeur, une division décimale en coûte plusieurs. En 1995, sur les machines de l'époque, l'écart comptait.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Affiche le résultat de <code>7 / 2</code> entre deux <code>int</code>, puis le vrai résultat décimal. Tu dois voir <code>3</code> puis <code>3.5</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        int a = 7;\n        int b = 2;\n        \n    }\n}',
      indices: [
        "Deux <code>int</code> divisés donnent un <code>int</code> : la partie décimale est jetée avant que tu puisses la voir.",
        "Pour le vrai résultat, il faut qu’au moins l’un des deux soit un décimal <strong>au moment de la division</strong>.",
        "<code>(double)a / b</code> pour la seconde ligne."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        int a = 7;\n        int b = 2;\n        System.out.println(a / b);\n        System.out.println((double)a / b);\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes : le résultat entier puis le décimal.' };
        if (l[0] !== '3') return { ok: false, message: 'La première ligne doit afficher <code>3</code>. Tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '3.5') return { ok: false, message: 'La seconde doit afficher <code>3.5</code> — utilise <code>(double)a / b</code>. Tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Le même piège qu\'en C, et pour la même raison : c\'est le type des opérandes qui décide du type du résultat.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> utilise <code>Math</code> pour afficher, sur trois lignes : la racine carrée de 144, 2 puissance 10, et le plus grand entre 17 et 42.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Trois calculs, tous fournis par une même boîte à outils du langage. Elle porte un nom évident.",
        "La classe <code>Math</code> regroupe ces fonctions. Leurs noms viennent de l’anglais : <em>square root</em>, <em>power</em>, <em>maximum</em>.",
        "<code>Math.sqrt(144)</code>, <code>Math.pow(2, 10)</code>, <code>Math.max(17, 42)</code>"
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println(Math.sqrt(144));\n        System.out.println(Math.pow(2, 10));\n        System.out.println(Math.max(17, 42));\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/Math\./.test(ctx.code)) return { ok: false, message: 'Utilise les méthodes de <code>Math</code> plutôt que d\'écrire les résultats.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 3) return { ok: false, message: 'J\'attends trois lignes.' };
        if (Number(l[0]) !== 12) return { ok: false, message: 'La racine de 144 vaut 12 — tu affiches « ' + l[0] + ' ». (Note : Java l\'écrit <code>12.0</code> car sqrt renvoie un double.)' };
        if (Number(l[1]) !== 1024) return { ok: false, message: '2 puissance 10 vaut 1024 — tu affiches « ' + l[1] + ' ».' };
        if (Number(l[2]) !== 42) return { ok: false, message: 'Le plus grand entre 17 et 42 est 42 — tu affiches « ' + l[2] + ' ».' };
        return { ok: true, message: 'Le <code>.0</code> derrière 12 et 1024 n\'est pas un bug : ces méthodes renvoient des double, et Java te le montre.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Défi :</strong> convertis 100 minutes en heures et minutes. Affiche exactement <code>1 h 40 min</code>, en calculant les deux valeurs (pas en les écrivant).',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        int total = 100;\n        \n    }\n}',
      indices: [
        "Deux valeurs à calculer : les heures pleines, et ce qui reste. Aucune des deux n’est une division ordinaire.",
        "Ici la division entière tombe bien : elle donne déjà les heures. Le reste, c’est le modulo <code>%</code>.",
        "<code>total / 60</code> pour les heures, <code>total % 60</code> pour les minutes."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        int total = 100;\n        int heures = total / 60;\n        int minutes = total % 60;\n        System.out.println(heures + " h " + minutes + " min");\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/%/.test(ctx.code)) return { ok: false, message: 'Utilise le modulo <code>%</code> pour les minutes restantes.' };
        if (/"1 h 40 min"/.test(ctx.code)) return { ok: false, message: 'Le résultat doit être calculé à partir de <code>total</code>, pas écrit à la main.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== '1 h 40 min') return { ok: false, message: 'Attendu exactement <code>1 h 40 min</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'La division entière devient utile quand c\'est exactement ce qu\'on veut : le duo <code>/</code> et <code>%</code> convertit n\'importe quelle unité.' };
      }
    }
  ]
},

/* ---------- j-4 ---------- */
{
  id: 'j-4',
  titre: 'Les conditions',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>La syntaxe du <code>if</code> est identique au C et à JavaScript. Mais Java y ajoute une exigence qui lui est propre, et qui supprime d'un coup le piège le plus célèbre du C.</p>
<pre class="bloc-code">int note = 15;
if (note &gt;= 10) {
    System.out.println("Recu");
} else {
    System.out.println("Recale");
}</pre>

<h2>Une condition doit être un booléen</h2>
<p>En C, <code>if (n)</code> fonctionne : zéro est faux, le reste est vrai. <strong>Java refuse.</strong> Une condition doit valoir <code>true</code> ou <code>false</code>, pas un nombre.</p>
<p>La conséquence est directe : <code>if (x = 5)</code> ne compile pas en Java. L'affectation rend un entier, pas un booléen, et le compilateur s'arrête. Le piège le plus coûteux du C disparaît par construction.</p>
<p>C'est l'illustration d'un principe de conception : Java échange un peu de souplesse contre beaucoup d'erreurs attrapées avant l'exécution.</p>

<h2>Les opérateurs</h2>
<p><code>==</code>, <code>!=</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> pour comparer ; <code>&amp;&amp;</code>, <code>||</code>, <code>!</code> pour combiner. Comme partout, <code>&amp;&amp;</code> est prioritaire sur <code>||</code> : des parenthèses dès qu'on les mélange.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>En C</th><th>En Java</th></tr>
<tr><td><code>if (n)</code></td><td>vrai si n n'est pas zéro</td><td><strong>refusé</strong></td></tr>
<tr><td><code>if (x = 5)</code></td><td>compile, et bogue</td><td><strong>refusé</strong></td></tr>
<tr><td><code>if (x == 5)</code></td><td>correct</td><td>correct</td></tr>
</table>

<h2>Comparer des objets</h2>
<p>Pour les nombres, <code>==</code> compare les valeurs. Pour un <code>String</code> ou tout autre objet, il compare des <strong>références</strong> — c'est-à-dire si ce sont les mêmes objets, pas s'ils se ressemblent.</p>
<p>La règle à retenir dès maintenant : <strong>on compare les textes avec <code>.equals()</code></strong>, jamais avec <code>==</code>. La leçon sur les <code>String</code> y revient en détail.</p>

<h2>Les pièges</h2>
<p><strong>Comparer deux <code>String</code> avec <code>==</code>.</strong> C'est l'erreur numéro un du débutant en Java, et elle est traître : elle fonctionne parfois, par hasard, selon la façon dont les textes ont été créés. Un test qui réussit aujourd'hui échoue demain.</p>
<p><em>Attention</em> : l'éditeur de ce cours ne reproduit pas ce comportement — il répond <code>true</code> dans les deux cas. Un vrai compilateur Java, lui, te donnera <code>false</code>. Prends l'habitude de <code>.equals()</code> maintenant ; tu éviteras de le découvrir en production.</p>
<p><strong>Mettre un point-virgule après le <code>if</code>.</strong> <code>if (x &gt; 3);</code> vide la condition de tout effet.</p>
<p><strong>Omettre les accolades.</strong> Seule la première ligne appartient alors au <code>if</code>. Mets-les toujours.</p>

<h2>Dans la vraie vie</h2>
<p>L'exigence du booléen est représentative de Java : plus on attrape tôt, moins on débogue tard. C'est une philosophie opposée à celle de Python ou de JavaScript, et c'est précisément pourquoi les grandes organisations le choisissent.</p>

<div class="a-retenir">
<ul>
<li>Une condition doit être un <strong>booléen</strong> : <code>if (n)</code> est refusé.</li>
<li>Du coup, <code>if (x = 5)</code> ne compile pas — le piège du C disparaît.</li>
<li>On compare les textes avec <code>.equals()</code>, jamais avec <code>==</code>.</li>
<li>Toujours des accolades, jamais de point-virgule après le <code>if</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le ternaire et le switch moderne</summary>
<p>Java a le ternaire <code>condition ? a : b</code>, hérité du C. Et depuis quelques années, un <code>switch</code> nouvelle manière qui rend une valeur et n'a plus besoin de <code>break</code> : <code>String r = switch (jour) { case SAMEDI, DIMANCHE -&gt; "week-end"; default -&gt; "travail"; };</code>. Le piège du <code>break</code> oublié appartient donc au passé — pour qui écrit du Java récent.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'La note vaut 15. Écris un <code>if</code>/<code>else</code> qui affiche <code>Reçu</code> si la note est ≥ 10, sinon <code>Recalé</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        int note = 15;\n        \n    }\n}',
      indices: [
        "La condition va entre parenthèses, et chaque branche entre accolades — exactement comme en C et en JavaScript.",
        "« Supérieur ou égal » s’écrit <code>&gt;=</code>. Le <code>else</code> se place après l’accolade fermante du <code>if</code>.",
        "<code>if (note &gt;= 10) { … } else { … }</code>"
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        int note = 15;\n        if (note >= 10) {\n            System.out.println("Reçu");\n        } else {\n            System.out.println("Recalé");\n        }\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/else/.test(ctx.code)) return { ok: false, message: 'Ajoute le cas contraire avec <code>else</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.some(x => /Reçu/.test(x))) return { ok: false, message: 'Avec 15, « Reçu » devrait s\'afficher.' };
        if (l.some(x => /Recalé/.test(x))) return { ok: false, message: 'Les deux messages s\'affichent : le second doit être dans le bloc du <code>else</code>.' };
        return { ok: true, message: 'Même structure qu\'en C et en JavaScript. Tu changes de langage sans changer de raisonnement.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Chasse au bug :</strong> ce programme devrait afficher <code>Identiques</code> mais ne le fait pas. Corrige la comparaison de textes.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        String a = "bonjour";\n        String b = "bon" + "jour";\n        if (a == b) {\n            System.out.println("Identiques");\n        } else {\n            System.out.println("Différents");\n        }\n    }\n}',
      indices: [
        "Les deux textes se ressemblent, et pourtant la comparaison échoue. En Java, deux <code>String</code> ne se comparent pas comme deux nombres.",
        "<code>==</code> demande « est-ce le même objet en mémoire ? », pas « est-ce le même texte ? ». C’est l’erreur numéro un des débutants en Java.",
        "<code>if (a.equals(b))</code>"
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        String a = "bonjour";\n        String b = "bon" + "jour";\n        if (a.equals(b)) {\n            System.out.println("Identiques");\n        } else {\n            System.out.println("Différents");\n        }\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/\.equals\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise <code>a.equals(b)</code> — c\'est la seule façon correcte de comparer le contenu de deux String en Java.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || !/Identiques/.test(l[0])) return { ok: false, message: 'Attendu <code>Identiques</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Règle à graver : <code>==</code> pour les nombres, <code>.equals()</code> pour les String. Ce réflexe t\'évitera des heures de débogage.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> avec <code>note = 14</code>, affiche la mention : <code>Très bien</code> (≥16), <code>Bien</code> (≥12), <code>Passable</code> (≥10), sinon <code>Insuffisant</code>. Une seule ligne doit s\'afficher.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        int note = 14;\n        \n    }\n}',
      indices: [
        "Quatre cas, et l’ordre décide de tout. Demande-toi ce qui arriverait à un 17 si tu testais d’abord « au moins 10 ».",
        "Dès qu’une condition est vraie, les suivantes sont ignorées. Il faut donc commencer par le seuil le plus exigeant, et descendre.",
        "<code>if (note &gt;= 16)</code>, puis <code>else if (note &gt;= 12)</code>, <code>&gt;= 10</code>, et un <code>else</code> final."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        int note = 14;\n        if (note >= 16) {\n            System.out.println("Très bien");\n        } else if (note >= 12) {\n            System.out.println("Bien");\n        } else if (note >= 10) {\n            System.out.println("Passable");\n        } else {\n            System.out.println("Insuffisant");\n        }\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/else\s+if/.test(ctx.code)) return { ok: false, message: 'Utilise des <code>else if</code> pour enchaîner les cas.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 1) return { ok: false, message: 'Une seule ligne doit s\'afficher — j\'en compte ' + l.length + '.' };
        if (l[0] !== 'Bien') return { ok: false, message: 'Avec 14, la mention est « Bien ». Tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Le premier cas vrai l\'emporte : l\'ordre des conditions fait toute la logique.' };
      }
    }
  ]
},

/* ---------- j-5 ---------- */
{
  id: 'j-5',
  titre: 'Les boucles',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Afficher les nombres de 1 à 100, parcourir les 3 000 commandes d'une boutique, redemander un mot de passe tant qu'il est faux : dès qu'il faut <strong>répéter</strong>, on n'écrit pas cent fois la même ligne, on écrit une <strong>boucle</strong>. Une boucle, c'est un bloc de code que Java rejoue tant qu'une condition reste vraie. Java en propose trois, qui répondent chacune à une situation différente.</p>

<h2>for : quand on sait combien de tours</h2>
<pre class="bloc-code">for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}</pre>
<p>La parenthèse contient trois morceaux, séparés par des points-virgules :</p>
<ul>
<li><code>int i = 1</code> : le <strong>départ</strong>, exécuté une seule fois. On crée un compteur ;</li>
<li><code>i &lt;= 5</code> : la <strong>condition</strong>, vérifiée avant chaque tour. Tant qu'elle est vraie, on continue ;</li>
<li><code>i++</code> : le <strong>pas</strong>, exécuté après chaque tour. Ici, on ajoute 1 au compteur.</li>
</ul>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Valeur de i</th><th>Condition i &lt;= 5</th><th>Ce qui se passe</th></tr>
<tr><td>1</td><td>vraie</td><td>affiche 1, puis <code>i++</code></td></tr>
<tr><td>2</td><td>vraie</td><td>affiche 2, puis <code>i++</code></td></tr>
<tr><td>…</td><td>…</td><td>…</td></tr>
<tr><td>5</td><td>vraie</td><td>affiche 5, puis <code>i++</code></td></tr>
<tr><td>6</td><td>fausse</td><td>la boucle s'arrête ; Java passe à la suite du programme</td></tr>
</table>
<p>Remarque que la condition est testée <em>six</em> fois pour cinq tours : la dernière vérification, celle qui échoue, est ce qui arrête la boucle.</p>

<h2>while et do...while : quand on ne sait pas</h2>
<pre class="bloc-code">int i = 3;
while (i > 0) {
    System.out.println(i);
    i--;
}
System.out.println("Partez !");</pre>
<p><code>while</code> (« tant que ») ne garde que la condition. On s'en sert quand on ne connaît pas le nombre de tours à l'avance : diviser un nombre par deux tant qu'il dépasse 1, lire des lignes tant qu'il en reste. Le compteur, s'il y en a un, c'est à toi de le faire évoluer dans le corps.</p>
<p><code>do { … } while (condition);</code> est la même chose à un détail près : la condition est vérifiée <em>après</em> le tour, donc le corps s'exécute <strong>au moins une fois</strong>. C'est la boucle des menus : on affiche le menu, puis on recommence tant que l'utilisateur n'a pas choisi « quitter ».</p>
<table class="memo-table">
<tr><th>Boucle</th><th>À choisir quand…</th></tr>
<tr><td>for</td><td>on connaît le nombre de tours (de 1 à 10, chaque case d'un tableau)</td></tr>
<tr><td>while</td><td>on s'arrête sur une condition, peut-être sans faire un seul tour</td></tr>
<tr><td>do...while</td><td>on doit faire au moins un tour avant de vérifier</td></tr>
</table>

<h2>break et continue</h2>
<pre class="bloc-code">for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        break;       // sort complètement de la boucle
    }
    System.out.println(i);   // affiche 1 2 3 4
}

for (int i = 1; i <= 5; i++) {
    if (i == 3) {
        continue;    // saute CE tour, passe au suivant
    }
    System.out.println(i);   // affiche 1 2 4 5
}</pre>
<p><code>break</code> arrête tout ; <code>continue</code> abandonne seulement le tour en cours. On sort <code>break</code> quand on a trouvé ce qu'on cherchait : inutile de parcourir la suite.</p>

<h2>Les pièges</h2>
<p><strong>La boucle qui ne s'arrête jamais.</strong> Dans un <code>while</code>, si tu oublies <code>i--</code>, <code>i</code> vaut 3 pour toujours et la condition reste vraie pour toujours. L'éditeur coupe le programme et te prévient : « ton programme affiche beaucoup trop de texte (boucle sans fin ?) », ou, si la boucle n'affiche rien, « ton programme tourne sans s'arrêter (boucle infinie ?) ». Réflexe : vérifie que quelque chose, dans le corps, rapproche la condition de <code>false</code>.</p>
<p><strong>Un tour de trop, ou de moins.</strong> <code>i &lt; 5</code> fait 4 tours en partant de 1 ; <code>i &lt;= 5</code> en fait 5. Quand un résultat est décalé de un, c'est presque toujours cette comparaison. Déroule le premier et le dernier tour à la main, comme dans le tableau plus haut.</p>
<p><strong>Utiliser i après la boucle.</strong> Un compteur déclaré dans la parenthèse du <code>for</code> n'existe que dans la boucle. Écrire <code>System.out.println(i);</code> après l'accolade fermante est une erreur, et l'éditeur te répond que « la variable <code>i</code> n'existe pas ». S'il te faut sa valeur après, déclare-la avant la boucle.</p>

<h2>Dans la vraie vie</h2>
<p>Un jeu vidéo tourne dans une grande boucle : lire les touches, déplacer les personnages, redessiner l'écran, recommencer, soixante fois par seconde. Un serveur web attend dans une boucle la requête suivante. Et ces trois boucles s'écrivent presque à l'identique en C et en JavaScript : ce que tu apprends ici te servira partout.</p>

<div class="a-retenir">
<ul>
<li><code>for</code> quand on connaît le nombre de tours ; <code>while</code> quand on s'arrête sur une condition ; <code>do...while</code> pour au moins un tour.</li>
<li>Toute boucle doit faire évoluer ce que teste sa condition, sinon elle ne s'arrête jamais.</li>
<li><code>break</code> sort de la boucle ; <code>continue</code> passe au tour suivant.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les boucles imbriquées</summary>
<p>Une boucle peut en contenir une autre. Pour chaque tour de la boucle extérieure, la boucle intérieure fait tous ses tours :</p>
<pre class="bloc-code">for (int ligne = 1; ligne <= 3; ligne++) {
    for (int col = 1; col <= 3; col++) {
        System.out.print(ligne * col + " ");
    }
    System.out.println();
}</pre>
<p>Cela affiche une table de multiplication de 3 sur 3 : 9 tours au total. C'est la forme qu'on retrouve pour parcourir une grille, un plateau de jeu ou une image, pixel par pixel. Attention au coût : 1 000 tours dans 1 000 tours, c'est un million.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Affiche les nombres de 1 à 5, un par ligne, avec une boucle <code>for</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Une boucle <code>for</code> a trois parties séparées par des points-virgules : d’où l’on part, jusqu’où l’on va, et comment on avance.",
        "Pour inclure 5, la condition doit être « inférieur ou égal ». Le compteur se déclare dans la boucle elle-même.",
        "<code>for (int i = 1; i &lt;= 5; i++) { System.out.println(i); }</code>"
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 5; i++) {\n            System.out.println(i);\n        }\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/for\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise une boucle <code>for</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.join(',') !== '1,2,3,4,5') return { ok: false, message: 'Attendu 1, 2, 3, 4, 5 (un par ligne) — tu affiches ' + l.join(', ') + '. Rappel : <code>i <= 5</code> pour inclure le 5.' };
        return { ok: true, message: 'Même forme qu\'en C, avec println à la place de printf.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> affiche les nombres de 1 à 10 <strong>sauf le 7</strong>, un par ligne, en utilisant <code>continue</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Il ne s’agit pas d’arrêter la boucle, seulement de <strong>sauter</strong> un tour.",
        "<code>continue</code> passe immédiatement au tour suivant. Il doit donc venir <strong>avant</strong> l’affichage, sinon le 7 serait déjà sorti.",
        "<code>if (i == 7) { continue; }</code> en première ligne de la boucle."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        for (int i = 1; i <= 10; i++) {\n            if (i == 7) {\n                continue;\n            }\n            System.out.println(i);\n        }\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/continue/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande d\'utiliser <code>continue</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.includes('7')) return { ok: false, message: 'Le 7 s\'affiche encore : le <code>continue</code> doit venir AVANT le println.' };
        if (l.join(',') !== '1,2,3,4,5,6,8,9,10') return { ok: false, message: 'Attendu 1 à 10 sans le 7 — tu affiches ' + l.join(', ') + '.' };
        return { ok: true, message: 'continue saute le reste du tour et repart au suivant. break, lui, aurait tout arrêté à 7.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Défi :</strong> trouve le premier multiple de 13 supérieur à 100, affiche-le, et arrête la boucle avec <code>break</code>. (Une seule ligne doit s\'afficher.)',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        for (int i = 101; i <= 200; i++) {\n            \n        }\n    }\n}',
      indices: [
        "Une seule ligne doit sortir : dès que le bon nombre est trouvé, il faut quitter la boucle.",
        "« Multiple de 13 » se teste avec le modulo : le reste de la division par 13 doit valoir 0. Et <code>break</code> sort de la boucle sur-le-champ.",
        "<code>if (i % 13 == 0) { System.out.println(i); break; }</code>"
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        for (int i = 101; i <= 200; i++) {\n            if (i % 13 == 0) {\n                System.out.println(i);\n                break;\n            }\n        }\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/break/.test(ctx.code)) return { ok: false, message: 'Utilise <code>break;</code> pour arrêter la boucle dès le premier trouvé.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 1) return { ok: false, message: 'Une seule ligne doit s\'afficher — j\'en compte ' + l.length + '. Le <code>break</code> doit être juste après le println.' };
        if (l[0] !== '104') return { ok: false, message: 'Le premier multiple de 13 après 100 est 104 (13 × 8) — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'break sert exactement à ça : on a trouvé ce qu\'on cherchait, inutile de continuer à chercher.' };
      }
    }
  ]
},

/* ---------- j-6 ---------- */
{
  id: 'j-6',
  titre: 'Les tableaux et la boucle for-each',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Java corrige la principale faiblesse des tableaux du C : <strong>ils connaissent leur propre taille</strong>. Plus besoin de la transporter à côté, plus de risque de se tromper en la recopiant.</p>
<pre class="bloc-code">int[] notes = {12, 15, 9, 18, 14};
int[] vide = new int[3];          // 3 cases a zero

System.out.println(notes.length);  // 5
System.out.println(notes[0]);      // 12</pre>
<p>Mesuré : <code>.length</code> rend bien la taille, et <code>new int[3]</code> donne trois zéros. Noter la syntaxe : les crochets sont <strong>après le type</strong>, pas après le nom — <code>int[] notes</code>, à la différence du C.</p>
<p>Et <code>.length</code> s'écrit <strong>sans parenthèses</strong> : c'est un attribut, pas une méthode. Une bizarrerie qu'il faut simplement retenir, puisque <code>String</code> utilise <code>.length()</code> avec parenthèses.</p>

<h2>La boucle for-each</h2>
<pre class="bloc-code">for (int n : notes) {
    System.out.println(n);
}</pre>
<p>Mesuré : elle parcourt bien toutes les cases. Elle se lit « pour chaque entier <code>n</code> dans <code>notes</code> » — l'équivalent du <code>for...of</code> de JavaScript et du <code>for in</code> de Python.</p>
<p>Elle est plus courte et surtout plus sûre : sans compteur, impossible de se tromper d'une case. On la prend par défaut, et l'on revient au <code>for</code> classique seulement quand l'indice sert vraiment.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Besoin</th><th>Écriture</th></tr>
<tr><td>parcourir les valeurs</td><td><code>for (int n : t)</code></td></tr>
<tr><td>connaître la taille</td><td><code>t.length</code> — sans parenthèses</td></tr>
<tr><td>avoir aussi l'indice</td><td><code>for (int i = 0; i &lt; t.length; i++)</code></td></tr>
<tr><td>modifier les cases</td><td>le <code>for</code> classique — le for-each donne une copie de la valeur</td></tr>
</table>
<p>La dernière ligne compte : dans un for-each sur des entiers, modifier <code>n</code> ne change pas le tableau.</p>

<h2>Les pièges</h2>
<p><strong>Sortir des bornes.</strong> Mesuré, le cours arrête : <em>« tu essaies d'accéder à la case 7 d'un tableau qui a 3 cases (numérotées de 0 à 2). »</em> Un vrai Java fait de même, avec une exception — contrairement au C, qui ne dit rien. C'est l'une des grandes différences entre les deux langages.</p>
<p><strong>Écrire <code>.length()</code> sur un tableau.</strong> Avec parenthèses, c'est pour un <code>String</code>. Sur un tableau, c'est sans.</p>
<p><strong>Mettre les crochets après le nom.</strong> <code>int notes[]</code> est toléré par héritage du C, et contraire au style Java. On écrit <code>int[] notes</code>.</p>
<p><strong>Croire qu'un tableau peut grandir.</strong> Sa taille est fixée à la création, comme en C. Pour une liste qui grandit, Java fournit <code>ArrayList</code>.</p>

<h2>Dans la vraie vie</h2>
<p>Les tableaux bruts sont rares dans le code Java moderne : on leur préfère <code>ArrayList</code>, qui grandit toute seule et offre des méthodes. Mais le tableau reste dessous — <code>ArrayList</code> en utilise un en interne, et le remplace par un plus grand quand il est plein.</p>

<div class="a-retenir">
<ul>
<li>Un tableau Java connaît sa taille : <code>t.length</code>, <strong>sans parenthèses</strong>.</li>
<li>Les crochets vont après le type : <code>int[] notes</code>.</li>
<li>Le for-each est plus court et plus sûr quand l'indice ne sert pas.</li>
<li>Sortir des bornes est signalé — contrairement au C.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi length sans parenthèses</summary>
<p>Parce qu'un tableau n'est pas vraiment une classe : c'est un type à part, défini directement dans la machine virtuelle, et <code>length</code> y est un champ exposé. <code>String</code>, lui, est une vraie classe, dont la longueur est une méthode. L'incohérence est reconnue comme un défaut de conception, et conservée depuis 1995 pour ne rien casser.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Crée un tableau <code>int[] notes</code> contenant 12, 15, 9, 18, 14, puis affiche sa <strong>taille</strong> et sa <strong>première</strong> valeur, sur deux lignes.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Un tableau se déclare avec des crochets accolés au type, et se remplit entre accolades.",
        "Sa taille est une <strong>propriété</strong>, pas une méthode : elle s’écrit sans parenthèses. Et la première case porte le numéro 0.",
        "<code>int[] notes = {12, 15, 9, 18, 14};</code>, puis <code>notes.length</code> et <code>notes[0]</code>."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        int[] notes = {12, 15, 9, 18, 14};\n        System.out.println(notes.length);\n        System.out.println(notes[0]);\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/\.length/.test(ctx.code)) return { ok: false, message: 'Utilise <code>notes.length</code> — sans parenthèses pour un tableau.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes : la taille puis la première note.' };
        if (l[0] !== '5') return { ok: false, message: 'La taille est 5 — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '12') return { ok: false, message: 'La première note est 12, à l\'indice 0 — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'En Java le tableau connaît sa taille : plus besoin de la transporter à part comme en C.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> parcours le tableau avec une boucle <strong>for-each</strong> et affiche la somme des notes (68).',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        int[] notes = {12, 15, 9, 18, 14};\n        int somme = 0;\n        \n    }\n}',
      indices: [
        "Le <em>for-each</em> ne donne pas la position mais directement la valeur : pas de compteur, pas de crochets.",
        "La forme est <code>for (int n : notes)</code> — le deux-points se lit « dans ». L’accumulateur, lui, se déclare avant la boucle.",
        "<code>for (int n : notes) { somme += n; }</code> puis un <code>println</code> après."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        int[] notes = {12, 15, 9, 18, 14};\n        int somme = 0;\n        for (int n : notes) {\n            somme += n;\n        }\n        System.out.println(somme);\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/for\s*\([^;)]*:[^)]*\)/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande un <strong>for-each</strong> : <code>for (int n : notes)</code>, avec un deux-points.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== '68') return { ok: false, message: 'Attendu <code>68</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Le for-each évite toute erreur d\'indice. Quand tu n\'as pas besoin du numéro de case, c\'est toujours le meilleur choix.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Défi :</strong> affiche chaque note précédée de son indice, sous la forme <code>0 : 12</code>, <code>1 : 15</code>, etc. (Ici le for-each ne suffit pas !)',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        int[] notes = {12, 15, 9, 18, 14};\n        \n    }\n}',
      indices: [
        "Cette fois il faut afficher le numéro de chaque note. Or le <em>for-each</em> ne le fournit pas.",
        "Il faut donc revenir à la boucle classique avec un compteur, qui sert à la fois d’indice d’accès et de numéro à afficher.",
        "<code>for (int i = 0; i &lt; notes.length; i++) { System.out.println(i + \" : \" + notes[i]); }</code>"
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        int[] notes = {12, 15, 9, 18, 14};\n        for (int i = 0; i < notes.length; i++) {\n            System.out.println(i + " : " + notes[i]);\n        }\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 5) return { ok: false, message: 'J\'attends 5 lignes — j\'en compte ' + l.length + '.' };
        if (l[0].replace(/\s/g, '') !== '0:12') return { ok: false, message: 'La première ligne doit être <code>0 : 12</code> — tu affiches « ' + l[0] + ' ».' };
        if (l[4].replace(/\s/g, '') !== '4:14') return { ok: false, message: 'La dernière ligne doit être <code>4 : 14</code> — tu affiches « ' + l[4] + ' ».' };
        return { ok: true, message: 'Dès que l\'indice compte, on revient à la boucle classique. Chaque forme a son usage.' };
      }
    }
  ]
},

/* ---------- j-7 ---------- */
{
  id: 'j-7',
  titre: 'Les méthodes',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>En Java, on ne dit pas « fonction » mais <strong>méthode</strong> — parce qu'elle appartient toujours à une classe. Il n'existe pas de fonction flottante, comme il n'existe pas de code hors classe.</p>
<pre class="bloc-code">public class Main {
    static int carre(int x) {
        return x * x;
    }

    public static void main(String[] args) {
        System.out.println(carre(7));   // 49
    }
}</pre>
<p>Mesuré : <code>49</code>. La signature se lit de gauche à droite : visibilité, <code>static</code> ou non, type de retour, nom, paramètres typés.</p>

<h2>Le mot static</h2>
<p>C'est la nouveauté à comprendre. <strong><code>static</code> veut dire « appartient à la classe, pas à un objet »</strong> : on peut appeler la méthode sans avoir rien créé.</p>
<p>Tant qu'on travaille dans <code>main</code> — qui est elle-même <code>static</code> — les méthodes qu'on appelle doivent l'être aussi. C'est la source d'un message d'erreur que tout débutant Java rencontre, et dont la cause n'est pas évidente.</p>
<p>Dès la leçon sur les objets, on écrira des méthodes <em>non</em> statiques, qui appartiennent à un objet et peuvent lire ses attributs.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Morceau</th><th>Ce qu'il dit</th></tr>
<tr><td><code>static</code></td><td>appelable sans objet</td></tr>
<tr><td><code>int</code></td><td>le type de ce qu'elle renvoie</td></tr>
<tr><td><code>carre</code></td><td>son nom</td></tr>
<tr><td><code>(int x)</code></td><td>ce qu'elle reçoit, typé</td></tr>
<tr><td><code>return x * x;</code></td><td>la valeur sort, la méthode s'arrête</td></tr>
</table>
<p>Pour une méthode qui ne renvoie rien, le type est <code>void</code> — et <code>return</code> devient facultatif.</p>

<h2>La surcharge</h2>
<p>Java autorise plusieurs méthodes du même nom, si leurs paramètres diffèrent :</p>
<pre class="bloc-code">static int max(int a, int b) { ... }
static double max(double a, double b) { ... }</pre>
<p>Le compilateur choisit d'après les types fournis. C'est pourquoi <code>System.out.println</code> accepte un entier, un texte ou un objet : il en existe une version pour chacun.</p>

<h2>Les pièges</h2>
<p><strong>Oublier <code>static</code>.</strong> Appeler depuis <code>main</code> une méthode non statique échoue, avec un message qui parle de « contexte statique » et n'aide pas beaucoup. Tant qu'il n'y a pas d'objets, tout est <code>static</code>.</p>
<p><strong>Oublier le type de retour.</strong> Java ne le devine pas.</p>
<p><strong>Oublier le <code>return</code>.</strong> Une méthode annoncée <code>int</code> doit renvoyer sur tous les chemins — <em>y compris</em> dans la branche <code>else</code>. Le compilateur vérifie, et refuse sinon.</p>
<p><strong>Croire qu'une méthode peut modifier son argument.</strong> Les valeurs sont copiées, comme en C. Mais un <strong>objet</strong> passé en argument peut, lui, être modifié — on y revient avec les objets.</p>

<h2>Dans la vraie vie</h2>
<p>La vérification des chemins de retour est typique de Java : il refuse de compiler un code dont il ne peut pas prouver qu'il renvoie toujours quelque chose. C'est contraignant à l'écriture, et cela élimine une famille entière de bugs.</p>

<div class="a-retenir">
<ul>
<li>Une méthode appartient toujours à une classe.</li>
<li><code>static</code> veut dire « appelable sans objet » — nécessaire depuis <code>main</code>.</li>
<li>Le type de retour est obligatoire, ou <code>void</code>.</li>
<li>Deux méthodes peuvent porter le même nom si leurs paramètres diffèrent.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi main est-elle statique</summary>
<p>Parce qu'au lancement du programme, aucun objet n'existe encore — la machine virtuelle doit pouvoir appeler quelque chose sans rien avoir créé. D'où <code>static</code>. C'est aussi pourquoi les débutants se heurtent si vite à cette contrainte : leur tout premier code vit dans un contexte statique, et tout ce qu'ils appellent doit l'être aussi.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Écris une méthode <code>static int carre(int x)</code> qui renvoie le carré, et affiche <code>carre(7)</code> depuis le main.',
      codeDepart: 'public class Main {\n\n    // ta méthode ici\n\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Une méthode se déclare à l’intérieur de la classe, à côté du <code>main</code> — pas dedans.",
        "Un mot-clé est indispensable : sans lui, la méthode appartiendrait à un objet, et le <code>main</code> ne pourrait pas l’appeler.",
        "<code>static int carre(int x) { return x * x; }</code>"
      ],
      solution: 'public class Main {\n\n    static int carre(int x) {\n        return x * x;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(carre(7));\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/carre\s*\(\s*int/.test(ctx.code)) return { ok: false, message: 'Définis la méthode <code>static int carre(int x)</code>.' };
        if (!/return/.test(ctx.code)) return { ok: false, message: 'La méthode doit <code>return</code> le carré.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== '49') return { ok: false, message: 'Attendu <code>49</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Une méthode dans la même classe que main : c\'est la structure de tout petit programme Java.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> écris <code>static void saluer(String nom)</code> qui affiche <code>Bonjour</code> suivi du nom, et appelle-la deux fois avec deux prénoms différents.',
      codeDepart: 'public class Main {\n\n\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Cette méthode ne rend rien : elle affiche. Le mot qui remplace le type de retour est le même qu’en C.",
        "<code>void</code> veut dire « ne renvoie rien », et <code>static</code> reste nécessaire pour que le <code>main</code> puisse l’appeler.",
        "<code>static void saluer(String nom) { System.out.println(\"Bonjour \" + nom); }</code>"
      ],
      solution: 'public class Main {\n\n    static void saluer(String nom) {\n        System.out.println("Bonjour " + nom);\n    }\n\n    public static void main(String[] args) {\n        saluer("Nadia");\n        saluer("Karim");\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/void\s+saluer\s*\(\s*String/.test(ctx.code)) return { ok: false, message: 'La méthode doit être <code>static void saluer(String nom)</code> — void car elle n\'a rien à renvoyer.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes, pour deux appels.' };
        if (!/^Bonjour /.test(l[0])) return { ok: false, message: 'Chaque ligne doit commencer par « Bonjour » suivi du prénom. Tu affiches « ' + l[0] + ' ».' };
        if (l[0] === l[1]) return { ok: false, message: 'Utilise deux prénoms différents — c\'est ce qui prouve que le paramètre fonctionne.' };
        return { ok: true, message: 'Une méthode void agit sans rien rendre : parfait pour l\'affichage.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Défi :</strong> écris <code>static boolean estPair(int n)</code> qui renvoie <code>true</code> si le nombre est pair, puis affiche le résultat pour 4 et pour 7 (deux lignes : <code>true</code> puis <code>false</code>).',
      codeDepart: 'public class Main {\n\n\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "La méthode doit rendre <code>true</code> ou <code>false</code>. Son type de retour est donc <code>boolean</code>.",
        "Inutile d’écrire un <code>if</code> : une comparaison <strong>est déjà</strong> un <code>true</code> ou un <code>false</code>, qu’on peut renvoyer telle quelle.",
        "<code>return n % 2 == 0;</code>"
      ],
      solution: 'public class Main {\n\n    static boolean estPair(int n) {\n        return n % 2 == 0;\n    }\n\n    public static void main(String[] args) {\n        System.out.println(estPair(4));\n        System.out.println(estPair(7));\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/boolean\s+estPair/.test(ctx.code)) return { ok: false, message: 'La méthode doit renvoyer un <code>boolean</code> : <code>static boolean estPair(int n)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (l[0] !== 'true') return { ok: false, message: '4 est pair, donc la première ligne doit afficher <code>true</code> — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== 'false') return { ok: false, message: '7 est impair, donc <code>false</code> — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Une méthode qui renvoie un booléen se nomme souvent <code>estXxx</code> : la convention rend le code lisible sans commentaire.' };
      }
    }
  ]
},

/* ---------- j-8 ---------- */
{
  id: 'j-8',
  titre: 'Les String et leurs méthodes',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Le <code>String</code> de Java est un vrai type, avec une boîte à outils complète — bien plus confortable que les <code>char[]</code> du C, où il fallait compter les cases et surveiller le zéro final.</p>
<pre class="bloc-code">String p = "Bonjour le monde";

p.length()          // 16   — AVEC parentheses
p.toUpperCase()     // "BONJOUR LE MONDE"
p.substring(0, 7)   // "Bonjour"
p.contains("monde") // true</pre>
<p>Tous mesurés. Les autres à connaître : <code>trim()</code>, <code>toLowerCase()</code>, <code>replace()</code>, <code>split()</code>, <code>indexOf()</code>, <code>charAt(i)</code>.</p>
<p><code>substring(0, 7)</code> suit la règle habituelle : le début est inclus, la fin est <strong>exclue</strong>.</p>

<h2>Un String ne change jamais</h2>
<p>C'est le point à comprendre en premier. <code>p.toUpperCase()</code> ne modifie pas <code>p</code> : il rend un <strong>nouveau</strong> texte. Pour garder le résultat, il faut le ranger.</p>
<pre class="bloc-code">p.trim();            // ne change rien
p = p.trim();        // la bonne facon</pre>
<p>Même règle qu'en Python. Et elle a une conséquence : assembler mille textes avec <code>+</code> dans une boucle crée mille objets intermédiaires. Pour cela, Java fournit <code>StringBuilder</code>.</p>

<h2>Pas à pas : == contre equals</h2>
<p>Voici l'erreur numéro un du débutant en Java, et elle mérite qu'on s'y arrête.</p>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Ce qu'elle compare</th></tr>
<tr><td><code>a == b</code></td><td>si ce sont <strong>le même objet</strong> en mémoire</td></tr>
<tr><td><code>a.equals(b)</code></td><td>si les <strong>textes</strong> sont identiques</td></tr>
</table>
<p>Deux textes identiques rangés à deux endroits différents ne sont pas « le même objet ». <code>==</code> peut donc rendre <code>false</code> sur deux mots pourtant égaux — et, pire, rendre <code>true</code> dans d'autres cas, selon la façon dont Java a rangé les textes. Un test qui réussit aujourd'hui échoue demain.</p>
<div class="attention">L'éditeur de ce cours ne reproduit pas ce comportement : il répond <code>true</code> dans les deux cas. Un vrai compilateur Java, lui, te donnera <code>false</code>. Prends l'habitude d'<code>.equals()</code> dès maintenant — c'est l'un des premiers pièges qu'on te tendra en entretien.</div>

<h2>Les pièges</h2>
<p><strong>Comparer avec <code>==</code>.</strong> Le piège central, décrit ci-dessus.</p>
<p><strong>Croire qu'une méthode modifie le texte.</strong> Elle rend un nouveau texte. Si rien ne change, c'est que tu n'as pas rangé le résultat.</p>
<p><strong>Confondre <code>.length</code> et <code>.length()</code>.</strong> Sans parenthèses pour un tableau, avec pour un <code>String</code>.</p>
<p><strong>Appeler une méthode sur un <code>String</code> qui vaut <code>null</code>.</strong> Le programme s'arrête. Un texte vide et un texte absent sont deux choses différentes.</p>

<h2>Dans la vraie vie</h2>
<p>Le choix de rendre les textes immuables est une décision de conception assumée : un texte qui ne change jamais peut être partagé entre plusieurs fils d'exécution sans aucun risque. Java étant le langage des applications qui font mille choses en parallèle, c'était presque obligatoire.</p>

<div class="a-retenir">
<ul>
<li>Un <code>String</code> ne se modifie jamais : les méthodes rendent un nouveau texte.</li>
<li><code>.equals()</code> pour comparer des textes, <strong>jamais <code>==</code></strong>.</li>
<li><code>.length()</code> avec parenthèses pour un texte, sans pour un tableau.</li>
<li><code>substring(a, b)</code> : début inclus, fin exclue.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le réservoir de textes</summary>
<p>Java range les textes écrits en clair dans le code dans un réservoir commun : deux occurrences de <code>"oui"</code> dans ton programme désignent le <em>même</em> objet. C'est pour cela que <code>==</code> semble parfois fonctionner. Mais un texte construit à l'exécution — lu dans un fichier, assemblé par concaténation — est un objet neuf, et la comparaison échoue. Le comportement dépend donc de l'origine du texte, ce qui en fait un bug particulièrement déroutant.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'À partir de <code>"Bonjour le monde"</code>, affiche sur quatre lignes : la longueur, la version en majuscules, le premier caractère, et les 7 premiers caractères.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        String phrase = "Bonjour le monde";\n        \n    }\n}',
      indices: [
        "Quatre informations à tirer de la même chaîne, chacune par une méthode différente.",
        "En Java, <strong>toutes</strong> s’appellent avec des parenthèses — y compris la longueur, contrairement aux tableaux.",
        "<code>phrase.length()</code>, <code>phrase.toUpperCase()</code>, <code>phrase.charAt(0)</code>, <code>phrase.substring(0, 7)</code>"
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        String phrase = "Bonjour le monde";\n        System.out.println(phrase.length());\n        System.out.println(phrase.toUpperCase());\n        System.out.println(phrase.charAt(0));\n        System.out.println(phrase.substring(0, 7));\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 4) return { ok: false, message: 'J\'attends quatre lignes — j\'en compte ' + l.length + '.' };
        if (l[0] !== '16') return { ok: false, message: 'La longueur est 16 — utilise <code>phrase.length()</code> (avec parenthèses). Tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== 'BONJOUR LE MONDE') return { ok: false, message: 'Attendu <code>BONJOUR LE MONDE</code> — tu affiches « ' + l[1] + ' ».' };
        if (l[2] !== 'B') return { ok: false, message: 'Le premier caractère est <code>B</code> — utilise <code>charAt(0)</code>. Tu affiches « ' + l[2] + ' ».' };
        if (l[3] !== 'Bonjour') return { ok: false, message: 'Attendu <code>Bonjour</code> — <code>substring(0, 7)</code> va de 0 inclus à 7 exclu. Tu affiches « ' + l[3] + ' ».' };
        return { ok: true, message: 'Quatre méthodes, quatre résultats. Le String Java est bien plus riche que le tableau de char du C.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Chasse au bug :</strong> ce programme devrait afficher <code>BONJOUR</code> mais affiche <code>bonjour</code>. Trouve pourquoi.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        String s = "bonjour";\n        s.toUpperCase();\n        System.out.println(s);\n    }\n}',
      indices: [
        "La méthode est bien appelée, et pourtant rien ne change. Demande-toi ce que devient son résultat.",
        "En Java, une chaîne ne se modifie <strong>jamais</strong> : les méthodes en renvoient une <em>nouvelle</em>. Si on ne récupère pas ce retour, il est perdu.",
        "<code>s = s.toUpperCase();</code> — il faut ranger le résultat."
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        String s = "bonjour";\n        s = s.toUpperCase();\n        System.out.println(s);\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0] === 'bonjour') return { ok: false, message: 'Toujours en minuscules : le résultat de <code>toUpperCase()</code> est calculé puis jeté. Range-le : <code>s = s.toUpperCase();</code>' };
        if (l[0] !== 'BONJOUR') return { ok: false, message: 'Attendu <code>BONJOUR</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Une String est immuable : on ne la transforme pas, on en fabrique une nouvelle. Même règle qu\'en Python.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Défi :</strong> compte le nombre de <code>o</code> dans <code>"Bonjour tout le monde"</code> et affiche ce nombre.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        String phrase = "Bonjour tout le monde";\n        int compte = 0;\n        \n    }\n}',
      indices: [
        "Compter, c’est un accumulateur conditionnel : on parcourt, et on n’augmente que dans certains cas.",
        "Un caractère s’obtient avec <code>charAt(i)</code>, se compare avec <code>==</code>, et s’écrit entre <strong>apostrophes simples</strong>.",
        "<code>if (phrase.charAt(i) == 'o') { compte++; }</code>"
      ],
      solution: 'public class Main {\n    public static void main(String[] args) {\n        String phrase = "Bonjour tout le monde";\n        int compte = 0;\n        for (int i = 0; i < phrase.length(); i++) {\n            if (phrase.charAt(i) == \'o\') {\n                compte++;\n            }\n        }\n        System.out.println(compte);\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/charAt/.test(ctx.code)) return { ok: false, message: 'Utilise <code>phrase.charAt(i)</code> pour lire chaque caractère.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== '4') return { ok: false, message: 'Il y a 4 « o » — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Ici <code>==</code> fonctionne car on compare des <code>char</code>, pas des String. La règle du .equals() ne vaut que pour les String.' };
      }
    }
  ]
},

/* ---------- j-9 ---------- */
{
  id: 'j-9',
  titre: 'Les classes et les objets',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>On arrive au cœur de Java. Jusqu'ici tu écrivais des méthodes statiques dans une seule classe — c'était du C avec des accolades. L'intérêt du langage commence ici.</p>
<p>Une <strong>classe</strong> est un moule ; un <strong>objet</strong> est ce qu'on fabrique avec. La classe décrit ce qu'un chien <em>a</em> (un nom, un âge) et ce qu'il <em>sait faire</em> (aboyer). Chaque chien créé a ses propres valeurs.</p>

<h2>Le moule et ses objets</h2>
<pre class="bloc-code">class Chien {
    String nom;
    int age;

    String aboyer() {
        return nom + " dit Ouaf !";
    }
}

public class Main {
    public static void main(String[] args) {
        Chien c = new Chien();
        c.nom = "Rex";
        System.out.println(c.aboyer());   // Rex dit Ouaf !
    }
}</pre>
<p>Mesuré. Trois choses à noter :</p>
<ul>
<li><code>new Chien()</code> fabrique un objet et rend sa référence ;</li>
<li><code>aboyer()</code> n'est <strong>pas</strong> <code>static</code> : elle appartient à un chien précis, et peut lire ses attributs ;</li>
<li>le point atteint un attribut comme une méthode.</li>
</ul>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ligne</th><th>Ce qui se passe</th></tr>
<tr><td><code>class Chien { ... }</code></td><td>un moule est défini. Aucun chien n'existe.</td></tr>
<tr><td><code>new Chien()</code></td><td>un objet est créé, ses attributs à leur valeur par défaut</td></tr>
<tr><td><code>c.nom = "Rex"</code></td><td>cet objet-là reçoit son nom</td></tr>
<tr><td><code>c.aboyer()</code></td><td>la méthode s'exécute <em>sur</em> cet objet : <code>nom</code> vaut « Rex »</td></tr>
</table>
<p>Le point décisif est le dernier : dans <code>aboyer()</code>, le mot <code>nom</code> désigne l'attribut de l'objet sur lequel on a appelé la méthode. Cent chiens peuvent partager la même méthode et donner cent réponses différentes.</p>

<h2>La référence</h2>
<p><code>Chien c</code> ne contient pas le chien : il contient une <strong>référence</strong> vers lui — c'est-à-dire, au fond, un pointeur déguisé. Conséquence directe : <code>Chien d = c;</code> ne copie pas le chien. Les deux noms désignent le même animal, et modifier l'un modifie l'autre.</p>

<h2>Les pièges</h2>
<p><strong>Oublier <code>new</code>.</strong> <code>Chien c;</code> déclare une référence qui ne pointe sur rien. L'utiliser arrête un vrai programme Java avec une exception de référence nulle — la plus célèbre du langage.</p>
<p><strong>Mettre <code>static</code> sur une méthode qui lit un attribut.</strong> Elle n'appartient alors à aucun objet, et ne peut rien lire. Le compilateur refuse.</p>
<p><strong>Croire qu'une affectation copie l'objet.</strong> Elle copie la référence. Pour une vraie copie, il faut créer un nouvel objet et recopier les attributs.</p>
<p><strong>Comparer deux objets avec <code>==</code>.</strong> Même problème qu'avec les textes : on compare des références.</p>

<h2>Dans la vraie vie</h2>
<p>Tout Java est bâti là-dessus. Une application réelle, c'est quelques centaines de classes qui se représentent chacune une chose du métier — un client, une commande, un paiement — et qui se parlent. Apprendre à découper un problème en classes est l'essentiel du métier, bien plus que la syntaxe.</p>

<div class="a-retenir">
<ul>
<li>Une classe est un moule, un objet est fabriqué avec <code>new</code>.</li>
<li>Une méthode non statique appartient à un objet et lit ses attributs.</li>
<li>Une variable d'objet contient une <strong>référence</strong>, pas l'objet.</li>
<li>Une affectation copie la référence, jamais l'objet.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le mot this</summary>
<p>À l'intérieur d'une méthode, <code>this</code> désigne l'objet courant. On peut donc écrire <code>this.nom</code> au lieu de <code>nom</code> — c'est équivalent, et plus explicite. Il devient obligatoire quand un paramètre porte le même nom qu'un attribut : <code>this.nom = nom;</code> distingue alors les deux. C'est exactement ce que fait un constructeur, à la leçon suivante.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Crée une classe <code>Chien</code> avec un attribut <code>String nom</code> et une méthode <code>aboyer()</code> qui renvoie <code>« nom » dit Ouaf !</code>. Fabrique un chien nommé Rex et affiche le résultat.',
      codeDepart: 'class Chien {\n    \n}\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Une classe est un moule, pas un objet. Il faut donc deux choses : décrire le moule (hors du <code>main</code>), puis en fabriquer un exemplaire avec <code>new</code>.",
        "Dans la classe : un attribut <code>String nom;</code> et une méthode qui renvoie un texte. Dans le <code>main</code> : un <code>new Chien()</code>, puis on remplit son <code>nom</code>.",
        "<code>String aboyer() { return nom + \" dit Ouaf !\"; }</code>, et côté main <code>Chien rex = new Chien(); rex.nom = \"Rex\";</code>"
      ],
      solution: 'class Chien {\n    String nom;\n\n    String aboyer() {\n        return nom + " dit Ouaf !";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien();\n        rex.nom = "Rex";\n        System.out.println(rex.aboyer());\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/class\s+Chien/.test(ctx.code)) return { ok: false, message: 'Définis la classe <code>class Chien { ... }</code>.' };
        if (!/new\s+Chien\s*\(/.test(ctx.code)) return { ok: false, message: 'Fabrique un objet avec <code>new Chien()</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== 'Rex dit Ouaf !') return { ok: false, message: 'Attendu exactement <code>Rex dit Ouaf !</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Ton premier objet Java. La méthode accède à l\'attribut <code>nom</code> sans qu\'on ait besoin de le lui passer : il appartient à l\'objet.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> fabrique <strong>deux</strong> chiens différents et affiche les deux aboiements, pour vérifier que chaque objet garde ses propres données.',
      codeDepart: 'class Chien {\n    String nom;\n\n    String aboyer() {\n        return nom + " dit Ouaf !";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Un seul <code>new</code> ne fabrique qu’un seul objet. Deux chiens différents, cela veut dire deux appels.",
        "Deux variables distinctes, chacune recevant son propre <code>new Chien()</code> — puis son propre nom.",
        "<code>Chien a = new Chien(); a.nom = \"Rex\";</code> puis <code>Chien b = new Chien(); b.nom = \"Bella\";</code>"
      ],
      solution: 'class Chien {\n    String nom;\n\n    String aboyer() {\n        return nom + " dit Ouaf !";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien();\n        rex.nom = "Rex";\n        Chien medor = new Chien();\n        medor.nom = "Médor";\n        System.out.println(rex.aboyer());\n        System.out.println(medor.aboyer());\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if ((ctx.code.match(/new\s+Chien\s*\(/g) || []).length < 2) return { ok: false, message: 'Il faut fabriquer DEUX objets : deux fois <code>new Chien()</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes, une par chien.' };
        if (l[0] === l[1]) return { ok: false, message: 'Les deux lignes sont identiques : donne des noms différents à tes deux chiens.' };
        if (!/dit Ouaf/.test(l[0])) return { ok: false, message: 'Chaque ligne doit ressembler à « Rex dit Ouaf ! ». Tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Un moule, deux objets, deux états indépendants. C\'est exactement ce qui permet de gérer 10 000 clients avec une seule classe Client.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Quelle est la différence entre une <strong>classe</strong> et un <strong>objet</strong> ?',
      choix: [
        'La classe est le moule, l\'objet est ce qu\'on fabrique avec',
        'Ce sont deux mots pour la même chose',
        'La classe contient les données, l\'objet contient les méthodes',
        'L\'objet est une classe qui n\'a pas de méthodes'
      ],
      bonne: 0,
      explication: 'On écrit UNE classe Chien, et on fabrique autant d\'objets qu\'on veut avec new Chien(). Chacun a ses propres valeurs d\'attributs, mais tous partagent les mêmes méthodes définies dans la classe.',
      aides: [
        null,
        'Non : la classe est écrite une fois dans le code, les objets sont créés autant de fois qu\'on en a besoin pendant l\'exécution.',
        'La classe décrit les deux — attributs ET méthodes. L\'objet, lui, porte les valeurs concrètes de ces attributs.',
        'Un objet a toujours accès aux méthodes de sa classe. Ce n\'est pas une classe diminuée, c\'est un exemplaire fabriqué à partir d\'elle.'
      ]
    }
  ]
},

/* ---------- j-10 ---------- */
{
  id: 'j-10',
  titre: 'Les constructeurs',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Créer un objet puis remplir ses attributs un par un est fastidieux et risqué : on peut en oublier un, et l'objet existe alors dans un état incomplet. Entre <code>new Chien()</code> et la dernière affectation, il y a un moment où le chien n'a pas de nom.</p>
<p>Le <strong>constructeur</strong> règle ce problème : il fait de la création et du remplissage une seule opération, indivisible.</p>

<h2>La forme</h2>
<pre class="bloc-code">class Chien {
    String nom;
    int age;

    Chien(String n, int a) {
        nom = n;
        age = a;
    }

    String aboyer() { return nom + " dit Ouaf !"; }
}

Chien c = new Chien("Rex", 3);</pre>
<p>Mesuré : <code>Rex dit Ouaf</code>. Trois règles, et seulement trois :</p>
<ul>
<li>il porte <strong>exactement</strong> le nom de la classe ;</li>
<li>il n'a <strong>aucun type de retour</strong> — pas même <code>void</code> ;</li>
<li>il est appelé automatiquement par <code>new</code>.</li>
</ul>

<h2>this, quand les noms se ressemblent</h2>
<pre class="bloc-code">Chien(String nom, int age) {
    this.nom = nom;
    this.age = age;
}</pre>
<p>Ici le paramètre et l'attribut portent le même nom. <code>this.nom</code> désigne l'attribut, <code>nom</code> seul le paramètre. C'est l'écriture standard, qu'on retrouve dans tout le code Java — elle évite d'inventer des noms comme <code>n</code> ou <code>nomParam</code>.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td><code>new Chien("Rex", 3)</code></td><td>la mémoire est réservée, attributs à zéro</td></tr>
<tr><td>le constructeur s'exécute</td><td>avec <code>this</code> valant le nouvel objet</td></tr>
<tr><td><code>this.nom = nom</code></td><td>l'attribut reçoit la valeur du paramètre</td></tr>
<tr><td>la référence est rendue</td><td>l'objet est complet <strong>dès sa naissance</strong></td></tr>
</table>

<h2>Plusieurs constructeurs</h2>
<p>Comme les méthodes, un constructeur peut être surchargé : <code>Chien(String nom)</code> et <code>Chien(String nom, int age)</code> coexistent. Le second peut appeler le premier avec <code>this(nom)</code>, pour ne pas répéter le code.</p>
<p>Attention à un effet discret : <strong>dès qu'on écrit un constructeur, celui par défaut disparaît</strong>. <code>new Chien()</code> sans argument cesse alors de fonctionner.</p>

<h2>Les pièges</h2>
<p><strong>Mettre un type de retour.</strong> <code>void Chien(...)</code> n'est pas un constructeur mais une méthode ordinaire qui porte le nom de la classe. Elle ne sera jamais appelée par <code>new</code>, et l'objet restera vide. Aucune erreur — c'est le piège le plus déroutant de la leçon.</p>
<p><strong>Se tromper de casse dans le nom.</strong> <code>chien(...)</code> au lieu de <code>Chien(...)</code> : même conséquence.</p>
<p><strong>Oublier <code>this</code> quand les noms se ressemblent.</strong> <code>nom = nom;</code> affecte le paramètre à lui-même. L'attribut reste vide, sans la moindre erreur.</p>
<p><strong>Oublier que le constructeur par défaut disparaît.</strong> Si tu veux garder <code>new Chien()</code>, il faut l'écrire explicitement.</p>

<h2>Dans la vraie vie</h2>
<p>Le constructeur est le gardien de la cohérence : c'est là qu'on vérifie les valeurs reçues et qu'on refuse de créer un objet absurde. Un âge négatif, un nom vide — mieux vaut un échec immédiat qu'un objet défectueux qui circule dans toute l'application.</p>

<div class="a-retenir">
<ul>
<li>Un constructeur porte le nom de la classe et n'a <strong>aucun type de retour</strong>.</li>
<li>Il est appelé par <code>new</code>, et garantit un objet complet dès sa naissance.</li>
<li><code>this.nom = nom</code> distingue l'attribut du paramètre.</li>
<li>Écrire un constructeur fait disparaître celui par défaut.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : quand il y a trop de paramètres</summary>
<p>Un constructeur à huit paramètres est illisible à l'appel : <code>new Client("Alex", 30, true, false, null, 3, "", 0)</code> ne dit rien. Au-delà de quatre, les équipes passent à un <em>constructeur fluide</em> : une petite classe compagne où l'on nomme chaque valeur, et qui fabrique l'objet à la fin. Le code d'appel redevient lisible, au prix d'une classe de plus.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Ajoute un constructeur <code>Chien(String n, int a)</code> à la classe, puis crée <code>new Chien("Rex", 3)</code> et affiche <code>decrire()</code> — soit <code>Rex, 3 ans</code>.',
      codeDepart: 'class Chien {\n    String nom;\n    int age;\n\n    // ton constructeur ici\n\n    String decrire() {\n        return nom + ", " + age + " ans";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Un constructeur sert à remplir l’objet au moment de sa fabrication. Il ne ressemble pas tout à fait à une méthode ordinaire.",
        "Il porte <strong>exactement</strong> le nom de la classe, et n’a <strong>aucun</strong> type de retour — pas même <code>void</code>.",
        "<code>Chien(String n, int a) { nom = n; age = a; }</code>"
      ],
      solution: 'class Chien {\n    String nom;\n    int age;\n\n    Chien(String n, int a) {\n        nom = n;\n        age = a;\n    }\n\n    String decrire() {\n        return nom + ", " + age + " ans";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien("Rex", 3);\n        System.out.println(rex.decrire());\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/Chien\s*\(\s*String/.test(ctx.code)) return { ok: false, message: 'Écris le constructeur <code>Chien(String n, int a)</code> — sans type de retour devant.' };
        if (!/new\s+Chien\s*\(\s*"/.test(ctx.code)) return { ok: false, message: 'Appelle le constructeur avec ses valeurs : <code>new Chien("Rex", 3)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== 'Rex, 3 ans') return { ok: false, message: 'Attendu <code>Rex, 3 ans</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Un objet complet en une seule ligne. Plus aucun risque d\'oublier de remplir un attribut.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> réécris le constructeur en donnant aux paramètres <strong>le même nom</strong> que les attributs, avec <code>this.</code> pour les distinguer.',
      codeDepart: 'class Chien {\n    String nom;\n    int age;\n\n    Chien(String nom, int age) {\n        // utilise this. ici\n        \n    }\n\n    String decrire() {\n        return nom + ", " + age + " ans";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien("Rex", 3);\n        System.out.println(rex.decrire());\n    }\n}',
      indices: [
        "Le paramètre et l’attribut portent désormais le même nom. Il faut donc un moyen de dire lequel on désigne.",
        "<code>this</code> désigne l’objet en cours de fabrication : à gauche l’attribut de l’objet, à droite le paramètre reçu.",
        "<code>this.nom = nom;</code>"
      ],
      solution: 'class Chien {\n    String nom;\n    int age;\n\n    Chien(String nom, int age) {\n        this.nom = nom;\n        this.age = age;\n    }\n\n    String decrire() {\n        return nom + ", " + age + " ans";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien("Rex", 3);\n        System.out.println(rex.decrire());\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/this\.nom\s*=/.test(ctx.code)) return { ok: false, message: 'Utilise <code>this.nom = nom;</code> — c\'est tout l\'objet de l\'exercice.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== 'Rex, 3 ans') return { ok: false, message: 'Attendu <code>Rex, 3 ans</code> — tu affiches « ' + (l[0] || '(rien)') + ' ». Sans <code>this.</code>, tu affecterais le paramètre à lui-même !' };
        return { ok: true, message: '<code>this</code> lève l\'ambiguïté. C\'est la forme que tu retrouveras dans absolument tout le code Java professionnel.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Défi :</strong> crée une classe <code>Rectangle</code> avec un constructeur <code>(int largeur, int hauteur)</code> et une méthode <code>aire()</code>. Affiche l\'aire d\'un rectangle 4×5 — soit <code>20</code>.',
      codeDepart: '\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indices: [
        "Une classe complète à écrire : deux attributs, un constructeur, et une méthode qui calcule.",
        "Le constructeur range les deux paramètres avec <code>this.</code>. La méthode <code>aire()</code>, elle, n’a besoin d’aucun paramètre : elle lit les attributs.",
        "<code>this.largeur = largeur;</code> dans le constructeur, et <code>return largeur * hauteur;</code> dans <code>aire()</code>."
      ],
      solution: 'class Rectangle {\n    int largeur;\n    int hauteur;\n\n    Rectangle(int largeur, int hauteur) {\n        this.largeur = largeur;\n        this.hauteur = hauteur;\n    }\n\n    int aire() {\n        return largeur * hauteur;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Rectangle r = new Rectangle(4, 5);\n        System.out.println(r.aire());\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/class\s+Rectangle/.test(ctx.code)) return { ok: false, message: 'Crée la classe <code>Rectangle</code>.' };
        if (!/aire\s*\(\s*\)/.test(ctx.code)) return { ok: false, message: 'Ajoute une méthode <code>aire()</code> qui renvoie le produit.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== '20') return { ok: false, message: 'Attendu <code>20</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Données et comportement dans la même boîte : la classe Rectangle sait calculer sa propre aire. C\'est ça, penser objet.' };
      }
    }
  ]
},

/* ---------- j-11 ---------- */
{
  id: 'j-11',
  titre: 'L\'encapsulation : protéger ses données',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Jusqu'ici, n'importe qui pouvait écrire <code>compte.solde = -999999;</code>. C'est dangereux : rien ne garantit que l'objet reste dans un état cohérent. Un compte avec un solde négatif de un million n'aurait jamais dû exister.</p>
<p>L'<strong>encapsulation</strong> répond à ce problème. Le principe tient en une phrase : <strong>les données sont privées, les opérations sont publiques</strong>. On ne touche pas aux attributs directement ; on demande à l'objet de faire quelque chose, et c'est lui qui décide si c'est légitime.</p>

<h2>Le principe</h2>
<pre class="bloc-code">class Compte {
    private int solde;

    public void deposer(int montant) {
        if (montant &gt; 0) solde += montant;
    }

    public int getSolde() {
        return solde;
    }
}</pre>
<p>Mesuré : déposer 100 puis −5 laisse bien le solde à 100. Le dépôt négatif est refusé par la méthode — et il n'y a aucun autre chemin pour modifier le solde.</p>
<ul>
<li><code>private</code> — accessible uniquement depuis l'intérieur de la classe ;</li>
<li><code>public</code> — accessible de partout.</li>
</ul>
<p>Les méthodes qui lisent et écrivent un attribut privé portent des noms conventionnels : <code>getSolde()</code> et <code>setSolde()</code>. On les appelle couramment <em>accesseurs</em>.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Tentative</th><th>Sans encapsulation</th><th>Avec</th></tr>
<tr><td><code>c.solde = -999999</code></td><td>acceptée</td><td><strong>refusée par le compilateur</strong></td></tr>
<tr><td><code>c.deposer(100)</code></td><td>—</td><td>acceptée</td></tr>
<tr><td><code>c.deposer(-5)</code></td><td>—</td><td>ignorée : la méthode vérifie</td></tr>
</table>
<p>La valeur de l'encapsulation n'est pas d'empêcher les erreurs de l'auteur, mais de garantir que <strong>l'objet se défend lui-même</strong>, quel que soit le code qui l'utilise. Sur un projet à vingt personnes, c'est la différence entre une règle et une consigne.</p>

<div class="attention">L'éditeur de ce cours n'applique pas encore <code>private</code> : écrire <code>c.solde = -999</code> y fonctionne. Un vrai compilateur Java, lui, refuse de compiler cette ligne. Écris le code comme si la protection existait — c'est celui qui sera juste partout ailleurs.</div>

<h2>Les pièges</h2>
<p><strong>Mettre des accesseurs sur tout.</strong> Un <code>get</code> et un <code>set</code> sur chaque attribut privé n'encapsule rien : on a simplement rendu l'accès public par un détour. La question à se poser est ce que l'objet doit <em>savoir faire</em>, pas quels attributs exposer.</p>
<p><strong>Confondre encapsulation et getters.</strong> <code>deposer(montant)</code> vaut mieux que <code>setSolde(getSolde() + montant)</code> : la première exprime une opération du métier, la seconde une manipulation de donnée.</p>
<p><strong>Rendre tout public « pour que ça marche ».</strong> Ça marche, en effet — jusqu'au jour où un objet se retrouve dans un état impossible et où personne ne sait quelle ligne l'a mis là.</p>
<p><strong>Oublier que <code>private</code> protège la <em>classe</em>, pas l'objet.</strong> Deux objets de la même classe peuvent lire leurs attributs privés mutuellement.</p>

<h2>Dans la vraie vie</h2>
<p>C'est le principe le plus universel de la programmation objet, et il déborde largement Java : on retrouve la même idée en Python (par convention), en C++ et en C#. Derrière, il y a une règle générale du métier — exposer le moins possible, pour pouvoir changer l'intérieur sans casser l'extérieur.</p>

<div class="a-retenir">
<ul>
<li>Données <code>private</code>, opérations <code>public</code>.</li>
<li>L'objet se défend lui-même : la vérification est <em>dans</em> la méthode.</li>
<li>Des accesseurs sur tout n'encapsulent rien.</li>
<li>Cet éditeur n'applique pas encore <code>private</code> — un vrai compilateur, si.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les quatre niveaux de visibilité</summary>
<p>Java en propose quatre, du plus fermé au plus ouvert : <code>private</code> (la classe seule), rien du tout (le paquetage), <code>protected</code> (le paquetage et les classes filles), <code>public</code> (tout le monde). Le niveau par défaut — quand on n'écrit rien — est le second, ce qui surprend : il est plus ouvert que <code>private</code> et moins que <code>public</code>. L'usage recommandé reste simple : <code>private</code> par défaut, et l'on n'ouvre qu'avec une raison.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Complète la classe <code>Compte</code> : un attribut <code>private int solde</code>, un <code>getSolde()</code> qui le renvoie, et un <code>deposer(int montant)</code> qui l\'augmente. Le main dépose 50 sur un compte de 100 et doit afficher <code>150</code>.',
      codeDepart: 'class Compte {\n    private int solde;\n\n    Compte(int solde) {\n        this.solde = solde;\n    }\n\n    // getSolde et deposer ici\n\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Compte c = new Compte(100);\n        c.deposer(50);\n        System.out.println(c.getSolde());\n    }\n}',
      indices: [
        "L’attribut est <code>private</code> : personne ne peut le lire ni l’écrire depuis l’extérieur. Il faut donc ouvrir deux portes contrôlées.",
        "Une méthode qui <strong>rend</strong> la valeur, et une qui la <strong>modifie</strong>. Toutes deux <code>public</code>, sinon elles seraient inutiles.",
        "<code>public int getSolde() { return solde; }</code> et <code>public void deposer(int montant) { solde = solde + montant; }</code>"
      ],
      solution: 'class Compte {\n    private int solde;\n\n    Compte(int solde) {\n        this.solde = solde;\n    }\n\n    public int getSolde() {\n        return solde;\n    }\n\n    public void deposer(int montant) {\n        solde = solde + montant;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Compte c = new Compte(100);\n        c.deposer(50);\n        System.out.println(c.getSolde());\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/getSolde\s*\(\s*\)/.test(ctx.code)) return { ok: false, message: 'Ajoute la méthode <code>public int getSolde()</code>.' };
        if (!/deposer\s*\(\s*int/.test(ctx.code)) return { ok: false, message: 'Ajoute la méthode <code>public void deposer(int montant)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== '150') return { ok: false, message: 'Attendu <code>150</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'L\'attribut est privé, mais l\'objet reste utilisable : c\'est tout l\'art de l\'encapsulation.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> ajoute une <strong>vérification</strong> dans <code>deposer</code> : un montant négatif ou nul doit être ignoré. Le main tente un dépôt de -500 puis de 50 : le solde final doit être <code>150</code>.',
      codeDepart: 'class Compte {\n    private int solde;\n\n    Compte(int solde) {\n        this.solde = solde;\n    }\n\n    public int getSolde() {\n        return solde;\n    }\n\n    public void deposer(int montant) {\n        solde = solde + montant;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Compte c = new Compte(100);\n        c.deposer(-500);\n        c.deposer(50);\n        System.out.println(c.getSolde());\n    }\n}',
      indices: [
        "Tout l’intérêt de l’encapsulation est là : la méthode peut <strong>refuser</strong> ce qu’on lui demande.",
        "Une seule ligne à protéger, avec une condition autour. Si le montant n’est pas positif, on ne fait rien du tout.",
        "<code>if (montant &gt; 0) { solde = solde + montant; }</code>"
      ],
      solution: 'class Compte {\n    private int solde;\n\n    Compte(int solde) {\n        this.solde = solde;\n    }\n\n    public int getSolde() {\n        return solde;\n    }\n\n    public void deposer(int montant) {\n        if (montant > 0) {\n            solde = solde + montant;\n        }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Compte c = new Compte(100);\n        c.deposer(-500);\n        c.deposer(50);\n        System.out.println(c.getSolde());\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/if\s*\(\s*montant/.test(ctx.code)) return { ok: false, message: 'Ajoute la vérification <code>if (montant > 0)</code> dans la méthode deposer.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0] === '-350') return { ok: false, message: 'Le dépôt négatif est passé : le solde vaut -350. Ta vérification doit empêcher l\'opération quand le montant n\'est pas positif.' };
        if (l[0] !== '150') return { ok: false, message: 'Attendu <code>150</code> (le -500 refusé, le +50 accepté) — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'La méthode protège l\'objet contre les usages absurdes. C\'est impossible à faire avec un attribut public — voilà pourquoi l\'encapsulation est un réflexe professionnel.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Quel est l\'intérêt principal de déclarer un attribut <code>private</code> ?',
      choix: [
        'Contrôler comment il est modifié, en passant par des méthodes qui vérifient',
        'Rendre le programme plus rapide',
        'Économiser de la mémoire',
        'Empêcher les autres développeurs de lire le code'
      ],
      bonne: 0,
      explication: 'private réduit la surface d\'attaque : au lieu que 500 endroits du code puissent écrire n\'importe quoi dans l\'attribut, seules les quelques méthodes de la classe le peuvent — et elles peuvent vérifier.',
      aides: [
        null,
        'Aucun effet sur la vitesse : private est une contrainte vérifiée à la compilation, pas à l\'exécution.',
        'La mémoire occupée est exactement la même. C\'est une question d\'organisation du code, pas de ressources.',
        'private n\'a rien à voir avec la confidentialité du code source, qui reste parfaitement lisible. Il s\'agit de contrôler les accès pendant l\'exécution.'
      ]
    }
  ]
},

/* ---------- j-12 ---------- */
{
  id: 'j-12',
  titre: 'L\'héritage',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Imagine une application avec des classes <code>Chien</code>, <code>Chat</code> et <code>Oiseau</code>. Toutes ont un nom, un âge, une méthode pour se présenter. Copier trois fois le même code, c'est devoir le corriger trois fois — et en oublier une.</p>
<p>L'<strong>héritage</strong> met ce qui est commun dans une classe parente, et chaque enfant n'ajoute que sa différence.</p>

<h2>Le parent et l'enfant</h2>
<pre class="bloc-code">class Animal {
    String nom;
    Animal(String n) { nom = n; }
    String crier() { return "..."; }
}

class Chien extends Animal {
    Chien(String n) { super(n); }
    String crier() { return "Ouaf"; }
}

Chien c = new Chien("Rex");
System.out.println(c.nom + " " + c.crier());   // Rex Ouaf</pre>
<p>Mesuré : <code>Rex Ouaf</code>. Trois mots nouveaux :</p>
<ul>
<li><code>extends</code> — « hérite de » ;</li>
<li><code>super(n)</code> — appelle le constructeur du parent ;</li>
<li>redéfinir <code>crier()</code> remplace la version du parent, pour cet enfant.</li>
</ul>
<p><code>Chien</code> n'a pas déclaré <code>nom</code> : il l'a reçu. Il n'a redéfini que ce qui le distingue.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Appel</th><th>Où Java cherche</th></tr>
<tr><td><code>c.crier()</code></td><td>dans <code>Chien</code> d'abord : trouvé, il s'arrête</td></tr>
<tr><td><code>c.nom</code></td><td>pas dans <code>Chien</code> : il remonte à <code>Animal</code></td></tr>
<tr><td>une méthode nulle part</td><td>le compilateur refuse</td></tr>
</table>
<p>La règle : <strong>on cherche dans l'enfant, puis on remonte</strong>. C'est ce qui permet à un enfant de modifier un comportement sans toucher au parent.</p>

<h2>Le polymorphisme</h2>
<pre class="bloc-code">Animal[] zoo = { new Chien("Rex"), new Chat("Felix") };
for (Animal a : zoo) {
    System.out.println(a.crier());
}</pre>
<p>Voilà le vrai gain. Le tableau est déclaré <code>Animal</code>, et pourtant chaque élément répond <em>selon sa vraie classe</em> : le chien fait « Ouaf », le chat « Miaou ». Java choisit la bonne méthode à l'exécution, pas à la compilation.</p>
<p>On peut donc écrire du code qui manipule des animaux sans savoir lesquels — et ajouter un <code>Oiseau</code> demain sans toucher à cette boucle. C'est l'idée la plus puissante de la programmation objet.</p>

<h2>Les pièges</h2>
<p><strong>Oublier <code>super(...)</code>.</strong> Si le parent n'a pas de constructeur sans argument, le compilateur refuse — et son message n'est pas limpide. Le <code>super</code> doit être la <strong>première</strong> ligne du constructeur.</p>
<p><strong>Croire qu'on peut descendre.</strong> Un <code>Animal</code> n'est pas forcément un <code>Chien</code> : lui demander une méthode propre au chien est refusé. L'inverse est toujours vrai.</p>
<p><strong>Hériter sans raison.</strong> L'héritage n'est justifié que si l'enfant <em>est</em> un cas particulier du parent. Si la relation est « contient », il faut un attribut, pas un <code>extends</code>.</p>
<p><strong>Empiler les générations.</strong> Trois ou quatre niveaux rendent impossible de savoir d'où vient une méthode. L'usage moderne est de rester très plat.</p>

<h2>Dans la vraie vie</h2>
<p>Le polymorphisme est partout dans les bibliothèques Java : une méthode qui accepte un <code>Animal</code> accepte tous ses descendants, y compris ceux qui n'existaient pas quand elle a été écrite. C'est ce qui permet d'étendre un programme sans le modifier — et c'est exactement ce qu'on attend d'une application qui doit vivre vingt ans.</p>

<div class="a-retenir">
<ul>
<li><code>extends</code> reprend tout du parent ; redéfinir une méthode la remplace.</li>
<li><code>super(...)</code> appelle le constructeur du parent, en première ligne.</li>
<li>Java cherche dans l'enfant, puis remonte.</li>
<li><strong>Polymorphisme</strong> : chaque objet répond selon sa vraie classe, à l'exécution.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : l'interface</summary>
<p>Une classe ne peut hériter que d'une seule autre, mais elle peut <em>implémenter</em> autant d'<strong>interfaces</strong> qu'elle veut. Une interface ne contient que des signatures de méthodes : elle dit ce qu'une classe doit savoir faire, sans rien imposer sur sa parenté. C'est le mécanisme que Java privilégie aujourd'hui — « être capable de » plutôt que « être un ».</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Crée une classe <code>Chien</code> qui <strong>hérite</strong> d\'<code>Animal</code>, avec un constructeur qui appelle <code>super(nom)</code> et une méthode <code>crier()</code> qui renvoie <code>« nom » fait Ouaf !</code>.',
      codeDepart: 'class Animal {\n    String nom;\n\n    Animal(String nom) {\n        this.nom = nom;\n    }\n\n    String crier() {\n        return "...";\n    }\n}\n\n// ta classe Chien ici\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien("Rex");\n        System.out.println(rex.crier());\n    }\n}',
      indices: [
        "Hériter, c’est repartir d’une classe existante. Mais le parent a un constructeur qui attend un nom : il faut l’appeler.",
        "<code>extends</code> établit le lien ; <code>super(nom)</code> appelle le constructeur du parent, et doit être la <strong>première</strong> instruction du constructeur enfant.",
        "<code>class Chien extends Animal { Chien(String nom) { super(nom); } String crier() { return nom + \" fait Ouaf !\"; } }</code>"
      ],
      solution: 'class Animal {\n    String nom;\n\n    Animal(String nom) {\n        this.nom = nom;\n    }\n\n    String crier() {\n        return "...";\n    }\n}\n\nclass Chien extends Animal {\n    Chien(String nom) {\n        super(nom);\n    }\n\n    String crier() {\n        return nom + " fait Ouaf !";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien("Rex");\n        System.out.println(rex.crier());\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/class\s+Chien\s+extends\s+Animal/.test(ctx.code)) return { ok: false, message: 'La classe doit hériter : <code>class Chien extends Animal</code>.' };
        if (!/super\s*\(/.test(ctx.code)) return { ok: false, message: 'Le constructeur de Chien doit appeler celui du parent : <code>super(nom);</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0] === '...') return { ok: false, message: 'C\'est la méthode d\'Animal qui s\'exécute : ta classe Chien doit redéfinir <code>crier()</code> avec le même nom.' };
        if (l[0] !== 'Rex fait Ouaf !') return { ok: false, message: 'Attendu <code>Rex fait Ouaf !</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Chien récupère l\'attribut <code>nom</code> sans le redéclarer, et remplace <code>crier()</code>. C\'est tout le mécanisme de l\'héritage.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> ajoute une classe <code>Chat</code> qui hérite aussi d\'<code>Animal</code> et dont <code>crier()</code> renvoie <code>« nom » fait Miaou !</code>. Le main doit afficher les deux cris.',
      codeDepart: 'class Animal {\n    String nom;\n\n    Animal(String nom) {\n        this.nom = nom;\n    }\n\n    String crier() {\n        return "...";\n    }\n}\n\nclass Chien extends Animal {\n    Chien(String nom) {\n        super(nom);\n    }\n\n    String crier() {\n        return nom + " fait Ouaf !";\n    }\n}\n\n// ta classe Chat ici\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien("Rex");\n        Chat felix = new Chat("Félix");\n        System.out.println(rex.crier());\n        System.out.println(felix.crier());\n    }\n}',
      indices: [
        "Rien de nouveau : c’est exactement la même construction que pour <code>Chien</code>.",
        "Seuls changent le nom de la classe et le texte renvoyé par <code>crier()</code>. Le lien au parent et l’appel à <code>super</code> restent identiques.",
        "<code>class Chat extends Animal { Chat(String nom) { super(nom); } String crier() { return nom + \" fait Miaou !\"; } }</code>"
      ],
      solution: 'class Animal {\n    String nom;\n\n    Animal(String nom) {\n        this.nom = nom;\n    }\n\n    String crier() {\n        return "...";\n    }\n}\n\nclass Chien extends Animal {\n    Chien(String nom) {\n        super(nom);\n    }\n\n    String crier() {\n        return nom + " fait Ouaf !";\n    }\n}\n\nclass Chat extends Animal {\n    Chat(String nom) {\n        super(nom);\n    }\n\n    String crier() {\n        return nom + " fait Miaou !";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien("Rex");\n        Chat felix = new Chat("Félix");\n        System.out.println(rex.crier());\n        System.out.println(felix.crier());\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/class\s+Chat\s+extends\s+Animal/.test(ctx.code)) return { ok: false, message: 'Ajoute <code>class Chat extends Animal</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (!/Ouaf/.test(l[0])) return { ok: false, message: 'La première ligne doit être le cri du chien.' };
        if (!/Miaou/.test(l[1])) return { ok: false, message: 'La seconde ligne doit être <code>Félix fait Miaou !</code> — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Deux classes filles, un seul parent, et chacune son comportement. Ajouter un Oiseau ne demanderait que six lignes.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Défi :</strong> ajoute à <code>Chien</code> une méthode <code>toString()</code> qui renvoie <code>Chien : « nom »</code>. Le main affiche directement l\'objet — tu dois voir <code>Chien : Rex</code>.',
      codeDepart: 'class Animal {\n    String nom;\n\n    Animal(String nom) {\n        this.nom = nom;\n    }\n}\n\nclass Chien extends Animal {\n    Chien(String nom) {\n        super(nom);\n    }\n\n    // ta méthode toString ici\n\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien("Rex");\n        System.out.println(rex);\n    }\n}',
      indices: [
        "Afficher un objet donne normalement quelque chose d’illisible. Une méthode au nom précis permet de décider ce que Java en montre.",
        "Elle s’appelle <code>toString()</code>, ne prend aucun paramètre, et rend un <code>String</code>. Java l’appelle tout seul quand on affiche l’objet.",
        "<code>public String toString() { return \"Chien : \" + nom; }</code>"
      ],
      solution: 'class Animal {\n    String nom;\n\n    Animal(String nom) {\n        this.nom = nom;\n    }\n}\n\nclass Chien extends Animal {\n    Chien(String nom) {\n        super(nom);\n    }\n\n    public String toString() {\n        return "Chien : " + nom;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien("Rex");\n        System.out.println(rex);\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/toString\s*\(\s*\)/.test(ctx.code)) return { ok: false, message: 'Ajoute la méthode <code>public String toString()</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== 'Chien : Rex') return { ok: false, message: 'Attendu <code>Chien : Rex</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Java appelle toString() tout seul à l\'affichage. Redéfinir cette méthode dans tes classes rend le débogage bien plus agréable.' };
      }
    }
  ]
},

/* ---------- j-13 ---------- */
{
  id: 'j-13',
  titre: 'Les tableaux d\'objets',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>On combine maintenant les deux notions : un tableau dont chaque case contient un objet. C'est la structure de données la plus courante dans une vraie application — une liste de clients, de commandes, de livres.</p>

<h2>Créer et remplir</h2>
<pre class="bloc-code">Livre[] biblio = new Livre[3];

biblio[0] = new Livre("Dune", 1965);
biblio[1] = new Livre("Fondation", 1951);</pre>
<p>Mesuré. Deux temps, et c'est tout l'enjeu de la leçon :</p>
<ol>
<li><code>new Livre[3]</code> crée le <strong>tableau</strong> — trois cases vides ;</li>
<li><code>new Livre(...)</code> crée <strong>chaque livre</strong>, un par un.</li>
</ol>
<p>Le premier <code>new</code> ne crée aucun livre. Les cases contiennent <code>null</code> — « rien » — jusqu'à ce qu'on les remplisse.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>État du tableau</th></tr>
<tr><td><code>new Livre[3]</code></td><td>[null, null, null]</td></tr>
<tr><td><code>biblio[0] = new Livre(...)</code></td><td>[Dune, null, null]</td></tr>
<tr><td><code>biblio[1] = new Livre(...)</code></td><td>[Dune, Fondation, null]</td></tr>
<tr><td><code>biblio[2].titre</code></td><td><strong>le programme s'arrête</strong></td></tr>
</table>
<p>La dernière ligne est l'erreur emblématique de Java : demander quelque chose à une case qui ne contient rien. Elle a un nom que tu entendras souvent — l'exception de référence nulle.</p>

<h2>Parcourir</h2>
<pre class="bloc-code">for (Livre l : biblio) {
    if (l != null) {
        System.out.println(l.titre + " (" + l.annee + ")");
    }
}</pre>
<p>Le test <code>l != null</code> n'est pas une précaution d'école : c'est le réflexe qui sépare un programme qui tourne d'un programme qui s'arrête. Dès qu'un tableau d'objets peut être partiellement rempli, il faut le poser.</p>

<h2>Chercher dedans</h2>
<pre class="bloc-code">static Livre chercher(Livre[] t, String titre) {
    for (Livre l : t) {
        if (l != null &amp;&amp; l.titre.equals(titre)) return l;
    }
    return null;
}</pre>
<p>Deux choses à noter : <code>.equals()</code> pour comparer les textes, et <code>return null</code> explicite quand rien n'est trouvé — que l'appelant devra tester à son tour.</p>
<p>L'ordre dans la condition compte aussi : <code>l != null</code> <em>avant</em> <code>l.titre</code>. Java s'arrête dès que la première partie est fausse, ce qui évite l'erreur.</p>

<h2>Les pièges</h2>
<p><strong>Croire que <code>new Livre[3]</code> crée trois livres.</strong> Il crée trois cases vides. C'est l'erreur de départ de tout le monde.</p>
<p><strong>Oublier le test contre <code>null</code>.</strong> Un tableau partiellement rempli arrête le programme à la première case vide.</p>
<p><strong>Inverser l'ordre dans la condition.</strong> <code>l.titre.equals(...) &amp;&amp; l != null</code> échoue avant d'avoir testé.</p>
<p><strong>Comparer les titres avec <code>==</code>.</strong> Le piège des <code>String</code>, dans son habitat naturel.</p>

<h2>Dans la vraie vie</h2>
<p>Les applications modernes utilisent plutôt <code>ArrayList</code>, qui grandit toute seule et n'a pas de cases vides. Le problème du <code>null</code> reste entier pour autant : il est si fréquent que son inventeur l'a publiquement qualifié d'« erreur à un milliard de dollars », et que les langages récents conçoivent des moyens de s'en passer.</p>

<div class="a-retenir">
<ul>
<li>Deux <code>new</code> : un pour le tableau, un par objet.</li>
<li>Les cases non remplies valent <code>null</code>.</li>
<li>Toujours tester <code>!= null</code> avant d'utiliser un élément.</li>
<li>L'ordre des conditions compte : le test de nullité d'abord.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : l'erreur à un milliard de dollars</summary>
<p>La référence nulle a été inventée en 1965 par Tony Hoare, qui l'a regrettée publiquement quarante ans plus tard : « je l'ai mise parce que c'était si facile à implémenter ». Elle a causé d'innombrables pannes, parce qu'une variable peut valoir <code>null</code> sans que rien dans son type ne le signale. Les langages récents — Kotlin, Swift, Rust — distinguent dans le type lui-même ce qui peut être absent de ce qui ne peut pas l'être.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Parcours la bibliothèque avec un <strong>for-each</strong> et affiche chaque livre sous la forme <code>Le Petit Prince (96 p.)</code>.',
      codeDepart: 'class Livre {\n    String titre;\n    int pages;\n\n    Livre(String titre, int pages) {\n        this.titre = titre;\n        this.pages = pages;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Livre[] biblio = {\n            new Livre("Le Petit Prince", 96),\n            new Livre("Les Misérables", 1500),\n            new Livre("L\'Étranger", 159)\n        };\n        \n    }\n}',
      indices: [
        "Un tableau d’objets : chaque tour de boucle te donne un <code>Livre</code> entier, dont il faut lire les attributs.",
        "Le <em>for-each</em> fonctionne aussi sur des objets — il suffit d’annoncer leur type : <code>for (Livre l : biblio)</code>.",
        "<code>System.out.println(l.titre + \" (\" + l.pages + \" p.)\");</code>"
      ],
      solution: 'class Livre {\n    String titre;\n    int pages;\n\n    Livre(String titre, int pages) {\n        this.titre = titre;\n        this.pages = pages;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Livre[] biblio = {\n            new Livre("Le Petit Prince", 96),\n            new Livre("Les Misérables", 1500),\n            new Livre("L\'Étranger", 159)\n        };\n        for (Livre l : biblio) {\n            System.out.println(l.titre + " (" + l.pages + " p.)");\n        }\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/for\s*\(\s*Livre/.test(ctx.code)) return { ok: false, message: 'Utilise un for-each typé : <code>for (Livre l : biblio)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes — j\'en compte ' + l.length + '.' };
        if (l[0] !== 'Le Petit Prince (96 p.)') return { ok: false, message: 'Format attendu : <code>Le Petit Prince (96 p.)</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Chaque case du tableau est un objet complet, avec ses attributs. C\'est la structure de toute application de gestion.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Entraînement :</strong> calcule et affiche le <strong>nombre total de pages</strong> de la bibliothèque, sous la forme <code>Total : 1755 pages</code>.',
      codeDepart: 'class Livre {\n    String titre;\n    int pages;\n\n    Livre(String titre, int pages) {\n        this.titre = titre;\n        this.pages = pages;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Livre[] biblio = {\n            new Livre("Le Petit Prince", 96),\n            new Livre("Les Misérables", 1500),\n            new Livre("L\'Étranger", 159)\n        };\n        int total = 0;\n        \n    }\n}',
      indices: [
        "Encore l’accumulateur, mais sur un attribut des objets parcourus.",
        "Le total se déclare avant la boucle, s’augmente à chaque tour, et ne s’affiche qu’après — sinon il sortirait une fois par livre.",
        "<code>total += l.pages;</code> dans la boucle, puis un <code>println</code> après."
      ],
      solution: 'class Livre {\n    String titre;\n    int pages;\n\n    Livre(String titre, int pages) {\n        this.titre = titre;\n        this.pages = pages;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Livre[] biblio = {\n            new Livre("Le Petit Prince", 96),\n            new Livre("Les Misérables", 1500),\n            new Livre("L\'Étranger", 159)\n        };\n        int total = 0;\n        for (Livre l : biblio) {\n            total += l.pages;\n        }\n        System.out.println("Total : " + total + " pages");\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (/1755/.test(ctx.code)) return { ok: false, message: 'Le total doit être calculé par la boucle, pas écrit à la main.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== 'Total : 1755 pages') return { ok: false, message: 'Attendu <code>Total : 1755 pages</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'L\'accumulateur appliqué à des objets : on additionne un attribut au fil du parcours.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Défi :</strong> trouve le livre le <strong>plus long</strong> et affiche son titre (<code>Les Misérables</code>).',
      codeDepart: 'class Livre {\n    String titre;\n    int pages;\n\n    Livre(String titre, int pages) {\n        this.titre = titre;\n        this.pages = pages;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Livre[] biblio = {\n            new Livre("Le Petit Prince", 96),\n            new Livre("Les Misérables", 1500),\n            new Livre("L\'Étranger", 159)\n        };\n        Livre plusLong = biblio[0];\n        \n    }\n}',
      indices: [
        "Même motif que la recherche du maximum, mais ce qu’on garde n’est plus un nombre : c’est l’objet entier.",
        "On compare les <strong>attributs</strong>, mais on retient l’<strong>objet</strong> — sinon on perdrait son titre en cours de route.",
        "<code>if (l.pages &gt; plusLong.pages) { plusLong = l; }</code>"
      ],
      solution: 'class Livre {\n    String titre;\n    int pages;\n\n    Livre(String titre, int pages) {\n        this.titre = titre;\n        this.pages = pages;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Livre[] biblio = {\n            new Livre("Le Petit Prince", 96),\n            new Livre("Les Misérables", 1500),\n            new Livre("L\'Étranger", 159)\n        };\n        Livre plusLong = biblio[0];\n        for (Livre l : biblio) {\n            if (l.pages > plusLong.pages) {\n                plusLong = l;\n            }\n        }\n        System.out.println(plusLong.titre);\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/if\s*\(/.test(ctx.code)) return { ok: false, message: 'Il faut un <code>if</code> dans la boucle pour comparer les livres.' };
        if (/"Les Misérables"\s*\)\s*;/.test(ctx.code.replace(/new Livre\([^)]*\)/g, ''))) return { ok: false, message: 'Le titre ne doit pas être écrit en dur : c\'est la boucle qui doit le trouver.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || l[0] !== 'Les Misérables') return { ok: false, message: 'Attendu <code>Les Misérables</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'On ne garde pas la plus grande valeur, mais l\'objet entier qui la porte — ce qui permet ensuite d\'accéder à tous ses attributs.' };
      }
    }
  ]
},

/* ---------- j-14 ---------- */
{
  id: 'j-14',
  titre: 'Mini-projet : la médiathèque',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Dernier exercice du module, et de tout le parcours des langages. Une petite application qui rassemble classes, encapsulation, tableaux d'objets et parcours — c'est-à-dire tout ce que Java t'a appris.</p>
<p>Et c'est le moment de voir que ces notions ne sont pas des chapitres séparés : elles n'ont de sens qu'ensemble.</p>

<h2>Ce que tu vas construire</h2>
<p>Une classe <code>Livre</code> avec ses attributs privés et son constructeur, un tableau de livres, et quelques opérations : ajouter, chercher, lister, compter.</p>
<pre class="bloc-code">class Livre {
    private String titre;
    private int annee;

    public Livre(String titre, int annee) {
        this.titre = titre;
        this.annee = annee;
    }

    public String getTitre() { return titre; }
    public int getAnnee() { return annee; }

    public String decrire() {
        return titre + " (" + annee + ")";
    }
}</pre>
<p>Remarque <code>decrire()</code> : elle ne se contente pas de rendre un attribut, elle produit quelque chose d'utile. C'est la différence entre un objet et une simple boîte à données.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qu'on écrit</th></tr>
<tr><td>la classe</td><td>attributs privés, constructeur, méthodes</td></tr>
<tr><td>le tableau</td><td><code>Livre[] biblio = new Livre[5];</code> — cinq cases vides</td></tr>
<tr><td>ajouter</td><td><code>biblio[n] = new Livre(...)</code>, avec un compteur</td></tr>
<tr><td>parcourir</td><td>for-each, avec un test <code>!= null</code></td></tr>
<tr><td>chercher</td><td>une méthode qui rend le livre, ou <code>null</code></td></tr>
</table>
<p>La troisième ligne cache le point le plus subtil : il faut un compteur à côté du tableau, pour savoir où est la prochaine case libre. Un tableau Java connaît sa <em>capacité</em>, pas son <em>remplissage</em>.</p>

<h2>La méthode, plus que le code</h2>
<p>On n'écrit pas une application d'un trait. On procède par morceaux vérifiables :</p>
<ol>
<li>écrire la classe <code>Livre</code>, créer un seul livre, l'afficher ;</li>
<li>créer le tableau, en mettre deux, les lister ;</li>
<li>ajouter la recherche, la tester sur un titre qui existe <em>et</em> un qui n'existe pas ;</li>
<li>ajouter le reste.</li>
</ol>
<p>À chaque étape, on exécute. Le quatrième point de la liste est celui qu'on saute le plus volontiers, et c'est celui qui révèle les bugs.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le compteur de remplissage.</strong> Sans lui, impossible de savoir où ajouter — et <code>biblio.length</code> rend 5 même si un seul livre existe.</p>
<p><strong>Oublier le test contre <code>null</code> au parcours.</strong> Le programme s'arrête à la première case vide.</p>
<p><strong>Comparer les titres avec <code>==</code>.</strong> Le piège des <code>String</code>, qui revient une dernière fois.</p>
<p><strong>Rendre les attributs publics « pour aller plus vite ».</strong> C'est précisément ce que la leçon sur l'encapsulation demandait d'éviter — et c'est au moment d'assembler qu'on est le plus tenté.</p>

<h2>Dans la vraie vie</h2>
<p>Change « livres » en clients, en commandes ou en patients, et tu as la structure de la quasi-totalité des applications Java de gestion : une classe par chose du métier, une collection pour les ranger, des méthodes pour les opérations. C'est tout ce que font des milliers de développeurs chaque jour — avec plus de classes, et les mêmes idées.</p>

<div class="a-retenir">
<ul>
<li>Une classe par chose du métier, avec ses attributs privés et son constructeur.</li>
<li>Un tableau connaît sa capacité, pas son remplissage : garde un compteur.</li>
<li>Test <code>!= null</code> à chaque parcours, <code>.equals()</code> à chaque comparaison de texte.</li>
<li>On construit par morceaux, en exécutant à chaque étape.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la suite, si tu veux continuer</summary>
<p>Trois directions s'ouvrent après cette leçon. Les <strong>collections</strong> — <code>ArrayList</code>, <code>HashMap</code> — qui remplacent les tableaux et règlent le problème du compteur. Les <strong>interfaces</strong>, pour décrire ce qu'une classe sait faire sans imposer sa parenté. Et les <strong>exceptions</strong>, pour gérer proprement ce qui peut mal tourner. Les trois sont au programme de n'importe quel second cours de Java — et tu as maintenant tout ce qu'il faut pour les aborder.</p>
</details>
`,
  exercices: [
    {
      type: 'java',
      consigne: '<strong>Étape 1 :</strong> complète la classe <code>Media</code> avec une méthode <code>emprunter()</code> qui passe <code>emprunte</code> à <code>true</code>, et <code>estEmprunte()</code> qui renvoie son état. Le main doit afficher <code>false</code> puis <code>true</code>.',
      codeDepart: 'class Media {\n    String titre;\n    private boolean emprunte;\n\n    Media(String titre) {\n        this.titre = titre;\n        this.emprunte = false;\n    }\n\n    // emprunter() et estEmprunte() ici\n\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Media m = new Media("Dune");\n        System.out.println(m.estEmprunte());\n        m.emprunter();\n        System.out.println(m.estEmprunte());\n    }\n}',
      indices: [
        "Deux méthodes aux rôles opposés : l’une <strong>change</strong> l’état, l’autre se contente de le <strong>lire</strong>.",
        "Celle qui change ne rend rien : son type est <code>void</code>. Celle qui lit rend un <code>boolean</code>.",
        "<code>public void emprunter() { emprunte = true; }</code> et <code>public boolean estEmprunte() { return emprunte; }</code>"
      ],
      solution: 'class Media {\n    String titre;\n    private boolean emprunte;\n\n    Media(String titre) {\n        this.titre = titre;\n        this.emprunte = false;\n    }\n\n    public void emprunter() {\n        emprunte = true;\n    }\n\n    public boolean estEmprunte() {\n        return emprunte;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Media m = new Media("Dune");\n        System.out.println(m.estEmprunte());\n        m.emprunter();\n        System.out.println(m.estEmprunte());\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/emprunter\s*\(\s*\)/.test(ctx.code)) return { ok: false, message: 'Ajoute la méthode <code>public void emprunter()</code>.' };
        if (!/estEmprunte\s*\(\s*\)/.test(ctx.code)) return { ok: false, message: 'Ajoute la méthode <code>public boolean estEmprunte()</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (l[0] !== 'false') return { ok: false, message: 'Au départ le média n\'est pas emprunté : la première ligne doit afficher <code>false</code>. Tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== 'true') return { ok: false, message: 'Après <code>emprunter()</code>, l\'état doit être <code>true</code>. Tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'L\'état est privé, mais il évolue à travers des méthodes claires. C\'est exactement ainsi qu\'on modélise un objet métier.' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Étape 2 :</strong> emprunte le premier et le troisième média, puis affiche le nombre de médias <strong>encore disponibles</strong> sous la forme <code>1 disponible(s)</code>.',
      codeDepart: 'class Media {\n    String titre;\n    private boolean emprunte;\n\n    Media(String titre) {\n        this.titre = titre;\n        this.emprunte = false;\n    }\n\n    public void emprunter() {\n        emprunte = true;\n    }\n\n    public boolean estEmprunte() {\n        return emprunte;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Media[] medias = {\n            new Media("Dune"),\n            new Media("Blade Runner"),\n            new Media("Solaris")\n        };\n        medias[0].emprunter();\n        medias[2].emprunter();\n        int dispo = 0;\n        \n    }\n}',
      indices: [
        "Compter les disponibles, c’est compter ceux qui ne sont <strong>pas</strong> empruntés — donc un compteur conditionnel, avec une condition inversée.",
        "On peut écrire <code>== false</code>, mais Java a plus court : un point d’exclamation devant une condition la renverse.",
        "<code>if (!m.estEmprunte()) { dispo++; }</code>"
      ],
      solution: 'class Media {\n    String titre;\n    private boolean emprunte;\n\n    Media(String titre) {\n        this.titre = titre;\n        this.emprunte = false;\n    }\n\n    public void emprunter() {\n        emprunte = true;\n    }\n\n    public boolean estEmprunte() {\n        return emprunte;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Media[] medias = {\n            new Media("Dune"),\n            new Media("Blade Runner"),\n            new Media("Solaris")\n        };\n        medias[0].emprunter();\n        medias[2].emprunter();\n        int dispo = 0;\n        for (Media m : medias) {\n            if (!m.estEmprunte()) {\n                dispo++;\n            }\n        }\n        System.out.println(dispo + " disponible(s)");\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        if (!/for\s*\(/.test(ctx.code)) return { ok: false, message: 'Le comptage doit venir d\'une boucle sur le tableau.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0] === '3 disponible(s)') return { ok: false, message: 'Tu comptes tous les médias : ajoute la condition pour ne garder que ceux qui ne sont pas empruntés.' };
        if (l[0] !== '1 disponible(s)') return { ok: false, message: 'Attendu <code>1 disponible(s)</code> — deux médias sur trois sont empruntés. Tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Le <code>!</code> inverse une condition : <code>!m.estEmprunte()</code> se lit « n\'est pas emprunté ».' };
      }
    },
    {
      type: 'java',
      consigne: '<strong>Étape 3 — la finale :</strong> affiche la liste complète avec l\'état de chacun, sous la forme <code>Dune : emprunté</code> ou <code>Blade Runner : disponible</code>.',
      codeDepart: 'class Media {\n    String titre;\n    private boolean emprunte;\n\n    Media(String titre) {\n        this.titre = titre;\n        this.emprunte = false;\n    }\n\n    public void emprunter() {\n        emprunte = true;\n    }\n\n    public boolean estEmprunte() {\n        return emprunte;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Media[] medias = {\n            new Media("Dune"),\n            new Media("Blade Runner"),\n            new Media("Solaris")\n        };\n        medias[0].emprunter();\n        medias[2].emprunter();\n        \n    }\n}',
      indices: [
        "Pour chaque média, un mot à choisir entre deux. C’est un <code>if/else</code>… qui ne fait que choisir une valeur.",
        "Dans ce cas précis, l’opérateur ternaire tient sur une ligne : une condition, un <code>?</code>, la valeur si vrai, un <code>:</code>, la valeur si faux.",
        "<code>m.estEmprunte() ? \"emprunté\" : \"disponible\"</code>"
      ],
      solution: 'class Media {\n    String titre;\n    private boolean emprunte;\n\n    Media(String titre) {\n        this.titre = titre;\n        this.emprunte = false;\n    }\n\n    public void emprunter() {\n        emprunte = true;\n    }\n\n    public boolean estEmprunte() {\n        return emprunte;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Media[] medias = {\n            new Media("Dune"),\n            new Media("Blade Runner"),\n            new Media("Solaris")\n        };\n        medias[0].emprunter();\n        medias[2].emprunter();\n        for (Media m : medias) {\n            if (m.estEmprunte()) {\n                System.out.println(m.titre + " : emprunté");\n            } else {\n                System.out.println(m.titre + " : disponible");\n            }\n        }\n    }\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes, une par média — j\'en compte ' + l.length + '.' };
        if (l[0] !== 'Dune : emprunté') return { ok: false, message: 'La première ligne doit être <code>Dune : emprunté</code> — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== 'Blade Runner : disponible') return { ok: false, message: 'La deuxième ligne doit être <code>Blade Runner : disponible</code> — tu affiches « ' + l[1] + ' ».' };
        if (l[2] !== 'Solaris : emprunté') return { ok: false, message: 'La troisième ligne doit être <code>Solaris : emprunté</code> — tu affiches « ' + l[2] + ' ».' };
        return { ok: true, message: 'Module Java terminé ! ☕ Objets, encapsulation, héritage, collections : tu as vu les fondations de la programmation d\'entreprise. Et avec ça, tu as désormais touché aux six langages les plus utilisés au monde.' };
      }
    }
  ]
}
];
