/* ===== Module : Java — Le langage des grandes applications ===== */
window.DATA_JAVA = [

/* ---------- j-1 ---------- */
{
  id: 'j-1',
  titre: 'Java : tout vit dans une classe',
  contenu: `
<p>Java est le langage des <strong>grandes applications</strong> : banques, assurances, administrations, applications Android, systèmes qui tournent depuis vingt ans sans interruption. Sa devise historique était « écrire une fois, exécuter partout » — un programme Java tourne à l'identique sur Windows, Mac ou Linux.</p>

<h2>Le squelette obligatoire</h2>
<pre class="bloc-code">public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour le monde !");
    }
}</pre>

<p>C'est plus verbeux que <code>print("Bonjour")</code> en Python. Chaque mot a pourtant sa raison :</p>
<ul>
<li><code>public class Main</code> — <strong>en Java, tout code vit dans une classe</strong>. Pas d'exception. Le nom de la classe doit correspondre au nom du fichier : <code>Main.java</code> ;</li>
<li><code>public static void main(String[] args)</code> — le point d'entrée, exactement comme le <code>main</code> du C. C'est cette ligne précise que la machine Java cherche pour démarrer ;</li>
<li><code>System.out.println(...)</code> — affiche une ligne. <em>println</em> = « print line » : le passage à la ligne est inclus, contrairement au <code>printf</code> du C.</li>
</ul>

<h2>println ou print ?</h2>
<pre class="bloc-code">System.out.println("Avec retour à la ligne");
System.out.print("Sans retour ");
System.out.print("à la ligne");</pre>

<div class="astuce"><div>Cette verbosité est un choix assumé : Java privilégie la <strong>clarté à la lecture</strong> sur la rapidité d'écriture. Dans une application de 500 000 lignes maintenue par 50 personnes pendant quinze ans, on relit le code bien plus souvent qu'on ne l'écrit.</div></div>

<div class="info"><div><strong>Comment ça tourne ici ?</strong> Un interpréteur Java est intégré à ce logiciel. Pour de vrai, tu installerais le JDK, puis tu compilerais avec <code>javac Main.java</code> avant d'exécuter avec <code>java Main</code>.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Complète le programme pour qu\'il affiche <code>Bonjour le monde !</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indice: '<code>System.out.println("Bonjour le monde !");</code> — sans oublier le point-virgule.',
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
      indice: 'Trois <code>System.out.println(...)</code> l\'un sous l\'autre. Ici pas besoin de <code>\\n</code> : println passe à la ligne tout seul.',
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
<p>Comme en C, Java exige que tu déclares le type de chaque variable. La différence : Java possède un vrai type <code>String</code> pour le texte, bien plus confortable que les tableaux de caractères du C.</p>

<pre class="bloc-code">int age = 30;
double taille = 1.75;
boolean majeur = true;
char initiale = 'A';
String nom = "Alex";</pre>

<table class="memo-table">
<tr><th>Type</th><th>Contient</th><th>Détail</th></tr>
<tr><td>int</td><td>entier</td><td>de -2 à +2 milliards environ</td></tr>
<tr><td>double</td><td>nombre à virgule</td><td>le point remplace la virgule</td></tr>
<tr><td>boolean</td><td>true ou false</td><td>en minuscules, contrairement à Python</td></tr>
<tr><td>char</td><td>UN caractère</td><td>apostrophes simples : 'A'</td></tr>
<tr><td>String</td><td>du texte</td><td>guillemets doubles, et un <strong>S majuscule</strong></td></tr>
</table>

<h2>Assembler texte et variables : le +</h2>
<p>Bonne nouvelle : plus besoin de <code>%d</code> comme en C. Le <code>+</code> colle les morceaux, et convertit automatiquement les nombres en texte :</p>
<pre class="bloc-code">String nom = "Alex";
int age = 30;
System.out.println(nom + " a " + age + " ans");   // Alex a 30 ans</pre>

<div class="attention"><div>Piège classique : <code>"Total : " + 2 + 3</code> affiche <code>Total : 23</code> et non 5 ! Java lit de gauche à droite : « Total : » + 2 donne du texte, puis ce texte + 3 le rallonge. Pour calculer d'abord, il faut des parenthèses : <code>"Total : " + (2 + 3)</code>.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Déclare un <code>String nom</code> valant <code>Alex</code> et un <code>int age</code> valant 30, puis affiche <code>Alex a 30 ans</code> en assemblant les variables avec des <code>+</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indice: '<code>System.out.println(nom + " a " + age + " ans");</code> — attention aux espaces à l\'intérieur des guillemets.',
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
      indice: 'Un seul println avec des <code>+ " " +</code> entre chaque variable. Le boolean s\'écrit <code>true</code> en minuscules.',
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
      indice: 'Java lit de gauche à droite : le texte absorbe le 2, puis le 3. Force le calcul d\'abord avec des parenthèses.',
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
<p>Les opérateurs sont les mêmes qu'en C : <code>+ - * / %</code>. Et Java reprend <strong>exactement le même piège</strong> sur la division.</p>

<pre class="bloc-code">int a = 7;
int b = 2;
System.out.println(a / b);        // 3, pas 3.5 !
System.out.println(7.0 / 2);      // 3.5
System.out.println((double)a / b); // 3.5</pre>

<p>Deux <code>int</code> divisés donnent un <code>int</code> : la partie décimale est jetée. C'est le même comportement qu'en C, et il surprendra tous ceux qui viennent de Python.</p>

<h2>Les raccourcis</h2>
<pre class="bloc-code">int n = 10;
n += 5;    // n vaut 15
n -= 3;    // 12
n *= 2;    // 24
n++;       // 25
n--;       // 24</pre>

<h2>La bibliothèque Math</h2>
<pre class="bloc-code">System.out.println(Math.sqrt(16));    // 4.0 — racine carrée
System.out.println(Math.pow(2, 10));  // 1024.0 — puissance
System.out.println(Math.abs(-5));     // 5 — valeur absolue
System.out.println(Math.max(3, 9));   // 9
System.out.println(Math.min(3, 9));   // 3
System.out.println(Math.round(3.7));  // 4</pre>
<p>Remarque : <code>Math.sqrt(16)</code> affiche <code>4.0</code> et non <code>4</code>. Ces méthodes renvoient un <code>double</code>, et Java affiche toujours la décimale d'un double — même quand elle vaut zéro. C'est un bon rappel visuel du type manipulé.</p>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Affiche le résultat de <code>7 / 2</code> entre deux <code>int</code>, puis le vrai résultat décimal. Tu dois voir <code>3</code> puis <code>3.5</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        int a = 7;\n        int b = 2;\n        \n    }\n}',
      indice: 'La deuxième ligne a besoin d\'une conversion : <code>(double)a / b</code>.',
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
      indice: '<code>Math.sqrt(144)</code>, <code>Math.pow(2, 10)</code>, <code>Math.max(17, 42)</code>.',
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
      indice: 'Les heures : <code>total / 60</code> (division entière, ce qui tombe bien). Les minutes restantes : <code>total % 60</code>.',
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
<p>Syntaxe identique au C et à JavaScript :</p>
<pre class="bloc-code">int note = 15;

if (note >= 10) {
    System.out.println("Reçu");
} else {
    System.out.println("Recalé");
}</pre>

<h2>Une exigence propre à Java</h2>
<p>Java est plus strict que le C sur un point capital : <strong>une condition doit être un vrai booléen</strong>. Le fameux piège <code>if (x = 5)</code> est ici tout simplement <em>refusé par le compilateur</em> :</p>
<pre class="bloc-code">if (x = 5) { ... }     // ERREUR en Java : ce n'est pas un boolean
if (x == 5) { ... }    // correct</pre>
<p>De même, <code>if (1)</code> ne compile pas en Java, alors que le C l'accepte. Cette rigueur élimine d'un coup toute une famille de bugs — c'est l'une des raisons pour lesquelles les grandes entreprises ont choisi Java.</p>

<h2>Comparer du texte : le piège n°1</h2>
<pre class="bloc-code">String a = "bonjour";
String b = "bonjour";

if (a == b) { ... }        // NE FAIT PAS ce que tu crois
if (a.equals(b)) { ... }   // CORRECT</pre>
<p>Avec <code>==</code>, Java compare les <strong>emplacements en mémoire</strong>, pas le contenu. Deux textes identiques rangés à deux endroits différents seraient jugés différents. Pour comparer le contenu, il faut toujours <code>.equals(...)</code>.</p>

<div class="attention"><div>Retiens cette règle absolue : <strong><code>==</code> pour les nombres, <code>.equals()</code> pour les String.</strong> C'est l'erreur la plus fréquente des débutants en Java, et elle produit des bugs qui n'apparaissent qu'en production.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'La note vaut 15. Écris un <code>if</code>/<code>else</code> qui affiche <code>Reçu</code> si la note est ≥ 10, sinon <code>Recalé</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        int note = 15;\n        \n    }\n}',
      indice: '<code>if (note >= 10) { ... } else { ... }</code>',
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
      indice: 'Pour comparer le <strong>contenu</strong> de deux String, on n\'utilise jamais <code>==</code> mais la méthode <code>.equals(...)</code> : <code>if (a.equals(b))</code>',
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
      indice: 'Enchaîne avec <code>else if</code>, du plus exigeant au moins exigeant.',
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
<p>Rien de neuf si tu as fait le module C : <code>for</code>, <code>while</code> et <code>do...while</code> s'écrivent exactement pareil.</p>

<pre class="bloc-code">for (int i = 1; i <= 5; i++) {
    System.out.println(i);
}

int i = 3;
while (i > 0) {
    System.out.println(i);
    i--;
}</pre>

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

<p><code>break</code> arrête tout ; <code>continue</code> abandonne seulement le tour en cours. Ces deux mots existent aussi en C, en JavaScript et en Python — tu les retrouveras partout.</p>

<div class="astuce"><div>Une boucle avec plusieurs <code>break</code> et <code>continue</code> devient vite illisible. Si tu en accumules, c'est souvent le signe que la condition de boucle mériterait d'être repensée.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Affiche les nombres de 1 à 5, un par ligne, avec une boucle <code>for</code>.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indice: '<code>for (int i = 1; i <= 5; i++) { System.out.println(i); }</code>',
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
      indice: 'Dans la boucle : <code>if (i == 7) { continue; }</code> avant l\'affichage.',
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
      indice: 'Un nombre est multiple de 13 si <code>i % 13 == 0</code>. Affiche puis <code>break;</code> pour sortir tout de suite.',
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
<p>Java corrige la principale faiblesse des tableaux C : <strong>ils connaissent leur propre taille</strong>.</p>

<pre class="bloc-code">int[] notes = {12, 15, 9, 18, 14};
int[] vide = new int[5];              // 5 cases à zéro

System.out.println(notes[0]);         // 12
System.out.println(notes.length);     // 5 — sans parenthèses !</pre>

<p>Remarque la déclaration : les crochets se placent <strong>après le type</strong>, <code>int[] notes</code>. C'est la façon Java, plus logique que celle du C : « un tableau d'entiers » se lit de gauche à droite.</p>

<h2>Deux façons de parcourir</h2>
<pre class="bloc-code">// La boucle classique, quand on a besoin de l'indice
for (int i = 0; i < notes.length; i++) {
    System.out.println(i + " : " + notes[i]);
}

// Le for-each, quand seule la valeur compte
for (int note : notes) {
    System.out.println(note);
}</pre>
<p>Le <code>for (int note : notes)</code> se lit « pour chaque note dans notes ». C'est l'équivalent du <code>for n in notes</code> de Python. Plus court, plus sûr — impossible de se tromper d'indice — mais tu n'as pas accès au numéro de la case.</p>

<div class="attention"><div><code>length</code> pour un tableau s'écrit <strong>sans parenthèses</strong>, alors que <code>length()</code> pour une String en prend. Cette incohérence est un héritage historique de Java, et elle piège tout le monde au moins une fois.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Crée un tableau <code>int[] notes</code> contenant 12, 15, 9, 18, 14, puis affiche sa <strong>taille</strong> et sa <strong>première</strong> valeur, sur deux lignes.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indice: '<code>int[] notes = {12, 15, 9, 18, 14};</code> puis <code>notes.length</code> (sans parenthèses) et <code>notes[0]</code>.',
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
      indice: '<code>for (int n : notes) { somme += n; }</code> puis un println après la boucle.',
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
      indice: 'Il te faut l\'indice, donc la boucle classique : <code>for (int i = 0; i < notes.length; i++)</code> et <code>System.out.println(i + " : " + notes[i]);</code>',
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
<p>En Java, on ne dit pas « fonction » mais <strong>méthode</strong> — parce qu'elle appartient toujours à une classe. Sinon, le principe est celui que tu connais.</p>

<pre class="bloc-code">public class Main {

    static int carre(int x) {
        return x * x;
    }

    public static void main(String[] args) {
        System.out.println(carre(7));    // 49
    }
}</pre>

<h2>Décoder la signature</h2>
<p><code>static int carre(int x)</code> se lit de gauche à droite :</p>
<ul>
<li><code>static</code> — la méthode appartient à la classe elle-même, pas à un objet. C'est nécessaire ici parce que <code>main</code> est static et ne peut appeler que des méthodes static ;</li>
<li><code>int</code> — le type de ce qu'elle renvoie ;</li>
<li><code>carre</code> — son nom, par convention en minuscule au début ;</li>
<li><code>(int x)</code> — ses paramètres avec leurs types.</li>
</ul>

<h2>Ne rien renvoyer : void</h2>
<pre class="bloc-code">static void saluer(String nom) {
    System.out.println("Bonjour " + nom);
}</pre>

<div class="astuce"><div>Contrairement au C, l'<strong>ordre n'a pas d'importance</strong> : tu peux appeler une méthode définie plus bas dans le fichier. Le compilateur Java lit toute la classe avant d'exécuter quoi que ce soit.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Écris une méthode <code>static int carre(int x)</code> qui renvoie le carré, et affiche <code>carre(7)</code> depuis le main.',
      codeDepart: 'public class Main {\n\n    // ta méthode ici\n\n    public static void main(String[] args) {\n        \n    }\n}',
      indice: '<code>static int carre(int x) { return x * x; }</code> — n\'oublie pas <code>static</code>, sinon main ne pourra pas l\'appeler.',
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
      indice: '<code>static void saluer(String nom) { System.out.println("Bonjour " + nom); }</code>',
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
      indice: 'Un nombre est pair si <code>n % 2 == 0</code>. Tu peux renvoyer directement le résultat de la comparaison : <code>return n % 2 == 0;</code>',
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
<p>Le <code>String</code> de Java est un vrai type, avec une boîte à outils complète — bien plus confortable que les <code>char[]</code> du C.</p>

<pre class="bloc-code">String phrase = "Bonjour le monde";

phrase.length()              // 16 — AVEC parenthèses
phrase.toUpperCase()         // "BONJOUR LE MONDE"
phrase.toLowerCase()         // "bonjour le monde"
phrase.charAt(0)             // 'B' — le caractère à l'indice 0
phrase.substring(0, 7)       // "Bonjour" — de 0 inclus à 7 exclu
phrase.indexOf("monde")      // 11 — position, ou -1 si absent
phrase.contains("le")        // true
phrase.replace("monde", "tous")
phrase.trim()                // enlève les espaces au début et à la fin
phrase.equals("autre")       // comparaison de contenu</pre>

<h2>Une propriété essentielle : l'immuabilité</h2>
<p>Aucune de ces méthodes ne modifie la chaîne d'origine : elles en <strong>renvoient une nouvelle</strong>. C'est la même règle qu'en Python.</p>
<pre class="bloc-code">String s = "bonjour";
s.toUpperCase();               // ne sert à rien : le résultat est jeté
System.out.println(s);         // toujours "bonjour"

s = s.toUpperCase();           // là, on garde le résultat
System.out.println(s);         // "BONJOUR"</pre>

<div class="attention"><div>Piège de mémoire : <code>length()</code> avec parenthèses pour une String, <code>length</code> sans parenthèses pour un tableau. Il n'y a pas de logique — c'est un accident historique de Java, il faut simplement le retenir.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'À partir de <code>"Bonjour le monde"</code>, affiche sur quatre lignes : la longueur, la version en majuscules, le premier caractère, et les 7 premiers caractères.',
      codeDepart: 'public class Main {\n    public static void main(String[] args) {\n        String phrase = "Bonjour le monde";\n        \n    }\n}',
      indice: '<code>phrase.length()</code>, <code>phrase.toUpperCase()</code>, <code>phrase.charAt(0)</code>, <code>phrase.substring(0, 7)</code>.',
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
      indice: 'Les méthodes de String ne modifient jamais la chaîne : elles en renvoient une nouvelle. Il faut la récupérer : <code>s = s.toUpperCase();</code>',
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
      indice: 'Parcours avec <code>for (int i = 0; i < phrase.length(); i++)</code> et compare : <code>if (phrase.charAt(i) == \'o\')</code> — apostrophes simples pour un char.',
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
<p>On arrive au cœur de Java. Une <strong>classe</strong> est un moule ; un <strong>objet</strong> est ce qu'on fabrique avec.</p>

<pre class="bloc-code">class Chien {
    String nom;
    int age;

    String aboyer() {
        return nom + " dit Ouaf !";
    }
}

public class Main {
    public static void main(String[] args) {
        Chien rex = new Chien();
        rex.nom = "Rex";
        rex.age = 3;

        System.out.println(rex.aboyer());   // Rex dit Ouaf !
    }
}</pre>

<h2>Le vocabulaire</h2>
<ul>
<li>les variables déclarées dans la classe (<code>nom</code>, <code>age</code>) sont ses <strong>attributs</strong> — ce que l'objet <em>a</em> ;</li>
<li>les fonctions déclarées dans la classe (<code>aboyer</code>) sont ses <strong>méthodes</strong> — ce que l'objet <em>sait faire</em> ;</li>
<li><code>new Chien()</code> <strong>fabrique</strong> un objet à partir du moule ;</li>
<li>le point permet d'atteindre les attributs et les méthodes de cet objet précis.</li>
</ul>

<h2>Chaque objet est indépendant</h2>
<pre class="bloc-code">Chien rex = new Chien();
Chien medor = new Chien();
rex.nom = "Rex";
medor.nom = "Médor";
// deux objets, deux noms, un seul moule</pre>

<div class="info"><div>Tu connais déjà cette idée sans le savoir : la <code>struct</code> du C regroupait des données. La classe fait pareil, <strong>et</strong> y attache les fonctions qui les manipulent. C'est toute la différence, et c'est ce qui a donné son nom à la programmation « orientée objet ».</div></div>
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
<p>Créer un objet puis remplir ses attributs un par un est fastidieux et risqué : on peut en oublier un. Le <strong>constructeur</strong> règle ce problème.</p>

<pre class="bloc-code">class Chien {
    String nom;
    int age;

    // le constructeur : même nom que la classe, aucun type de retour
    Chien(String n, int a) {
        nom = n;
        age = a;
    }

    String decrire() {
        return nom + ", " + age + " ans";
    }
}

public class Main {
    public static void main(String[] args) {
        Chien rex = new Chien("Rex", 3);      // tout est rempli d'un coup
        System.out.println(rex.decrire());
    }
}</pre>

<h2>Les règles du constructeur</h2>
<ul>
<li>il porte <strong>exactement le nom de la classe</strong> ;</li>
<li>il n'a <strong>aucun type de retour</strong> — pas même <code>void</code> ;</li>
<li>il est appelé automatiquement par <code>new</code>.</li>
</ul>

<h2>Le mot-clé this</h2>
<p>On aime donner aux paramètres le même nom qu'aux attributs. Mais alors, comment les distinguer ? Avec <code>this</code>, qui désigne « l'objet en cours de construction » :</p>
<pre class="bloc-code">Chien(String nom, int age) {
    this.nom = nom;      // this.nom = l'attribut, nom = le paramètre
    this.age = age;
}</pre>
<p>C'est la forme que tu verras dans tout le code Java professionnel.</p>

<div class="astuce"><div>Un constructeur garantit qu'un objet est <strong>valide dès sa naissance</strong>. C'est un principe de conception majeur : il vaut mieux rendre un état incorrect impossible à créer que d'avoir à le vérifier partout ensuite.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Ajoute un constructeur <code>Chien(String n, int a)</code> à la classe, puis crée <code>new Chien("Rex", 3)</code> et affiche <code>decrire()</code> — soit <code>Rex, 3 ans</code>.',
      codeDepart: 'class Chien {\n    String nom;\n    int age;\n\n    // ton constructeur ici\n\n    String decrire() {\n        return nom + ", " + age + " ans";\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}',
      indice: '<code>Chien(String n, int a) { nom = n; age = a; }</code> — même nom que la classe, pas de type de retour.',
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
      indice: '<code>this.nom = nom;</code> — à gauche l\'attribut de l\'objet, à droite le paramètre reçu.',
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
      indice: 'Utilise <code>this.largeur = largeur;</code> dans le constructeur, et <code>return largeur * hauteur;</code> dans <code>aire()</code>.',
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
<p>Jusqu'ici, n'importe qui pouvait écrire <code>compte.solde = -999999;</code>. C'est dangereux : rien ne garantit que l'objet reste dans un état cohérent. L'<strong>encapsulation</strong> répond à ce problème.</p>

<h2>Le principe : fermer, puis ouvrir des portes contrôlées</h2>
<pre class="bloc-code">class Compte {
    private int solde;          // PRIVÉ : inaccessible de l'extérieur

    Compte(int solde) {
        this.solde = solde;
    }

    public int getSolde() {     // une porte pour LIRE
        return solde;
    }

    public void deposer(int montant) {    // une porte pour MODIFIER
        if (montant > 0) {                // avec une VÉRIFICATION
            solde = solde + montant;
        }
    }
}</pre>

<ul>
<li><code>private</code> — l'attribut n'est accessible que <strong>depuis l'intérieur de la classe</strong> ;</li>
<li><code>public</code> — accessible de partout ;</li>
<li>une méthode qui lit s'appelle par convention <code>getXxx()</code> ; une méthode qui écrit, <code>setXxx()</code>.</li>
</ul>

<h2>Pourquoi c'est capital</h2>
<p>La méthode <code>deposer</code> peut <strong>refuser</strong> un montant négatif. Si l'attribut était public, aucune vérification ne serait possible : n'importe quelle ligne de code, n'importe où dans une application de 500 000 lignes, pourrait corrompre le solde. En le rendant privé, tu réduis la surface de risque à quelques méthodes que tu contrôles.</p>

<div class="info"><div>C'est le principe du distributeur de billets : tu ne mets pas les mains directement dans le coffre. Tu passes par une interface (l'écran, le clavier) qui vérifie ton droit d'accès et le montant disponible avant d'agir.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Complète la classe <code>Compte</code> : un attribut <code>private int solde</code>, un <code>getSolde()</code> qui le renvoie, et un <code>deposer(int montant)</code> qui l\'augmente. Le main dépose 50 sur un compte de 100 et doit afficher <code>150</code>.',
      codeDepart: 'class Compte {\n    private int solde;\n\n    Compte(int solde) {\n        this.solde = solde;\n    }\n\n    // getSolde et deposer ici\n\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Compte c = new Compte(100);\n        c.deposer(50);\n        System.out.println(c.getSolde());\n    }\n}',
      indice: '<code>public int getSolde() { return solde; }</code> et <code>public void deposer(int montant) { solde = solde + montant; }</code>',
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
      indice: 'Entoure la ligne d\'un <code>if (montant > 0) { ... }</code>.',
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
<p>Imagine une application avec des classes <code>Chien</code>, <code>Chat</code> et <code>Oiseau</code>. Toutes ont un nom, un âge, une méthode pour se présenter… On va copier trois fois le même code ? Non : on le <strong>met en commun</strong>.</p>

<pre class="bloc-code">class Animal {
    String nom;

    Animal(String nom) {
        this.nom = nom;
    }

    String crier() {
        return "...";
    }
}

class Chien extends Animal {
    Chien(String nom) {
        super(nom);           // appelle le constructeur d'Animal
    }

    String crier() {          // on REMPLACE la méthode du parent
        return nom + " fait Ouaf !";
    }
}</pre>

<h2>Les trois mots à retenir</h2>
<ul>
<li><code>extends</code> — « hérite de ». <code>Chien</code> reçoit automatiquement tous les attributs et méthodes d'<code>Animal</code> ;</li>
<li><code>super(...)</code> — appelle le constructeur du parent. Il doit être la <strong>première instruction</strong> du constructeur enfant ;</li>
<li><strong>redéfinir</strong> — réécrire une méthode du parent pour l'adapter. C'est le cas de <code>crier()</code> ici.</li>
</ul>

<h2>La méthode toString()</h2>
<p>Toute classe Java hérite d'une méthode <code>toString()</code>. Si tu la redéfinis, Java l'utilise automatiquement quand tu affiches l'objet :</p>
<pre class="bloc-code">public String toString() {
    return "Chien : " + nom;
}
...
System.out.println(rex);      // affiche « Chien : Rex »</pre>

<div class="astuce"><div>L'héritage doit exprimer une relation « <strong>est un</strong> » : un chien <em>est un</em> animal. Si tu ne peux pas dire cette phrase à voix haute sans que ça sonne faux, c'est probablement qu'il ne faut pas hériter — mieux vaut alors qu'une classe en <em>contienne</em> une autre.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Crée une classe <code>Chien</code> qui <strong>hérite</strong> d\'<code>Animal</code>, avec un constructeur qui appelle <code>super(nom)</code> et une méthode <code>crier()</code> qui renvoie <code>« nom » fait Ouaf !</code>.',
      codeDepart: 'class Animal {\n    String nom;\n\n    Animal(String nom) {\n        this.nom = nom;\n    }\n\n    String crier() {\n        return "...";\n    }\n}\n\n// ta classe Chien ici\n\npublic class Main {\n    public static void main(String[] args) {\n        Chien rex = new Chien("Rex");\n        System.out.println(rex.crier());\n    }\n}',
      indice: '<code>class Chien extends Animal { Chien(String nom) { super(nom); } String crier() { return nom + " fait Ouaf !"; } }</code>',
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
      indice: 'Copie la structure de Chien en changeant le nom de la classe et le texte renvoyé.',
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
      indice: '<code>public String toString() { return "Chien : " + nom; }</code> — Java l\'appelle automatiquement quand on affiche l\'objet.',
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
<p>On combine maintenant les deux notions : un tableau dont chaque case contient un objet. C'est la structure de données la plus courante dans une vraie application — une liste de clients, de commandes, de produits.</p>

<pre class="bloc-code">class Livre {
    String titre;
    int pages;

    Livre(String titre, int pages) {
        this.titre = titre;
        this.pages = pages;
    }
}

public class Main {
    public static void main(String[] args) {
        Livre[] biblio = {
            new Livre("Le Petit Prince", 96),
            new Livre("Les Misérables", 1500),
            new Livre("L'Étranger", 159)
        };

        for (Livre l : biblio) {
            System.out.println(l.titre + " (" + l.pages + " p.)");
        }
    }
}</pre>

<h2>Parcourir et calculer</h2>
<pre class="bloc-code">int total = 0;
for (Livre l : biblio) {
    total += l.pages;
}
System.out.println("Total : " + total + " pages");</pre>

<p>Le for-each s'écrit avec le type des objets : <code>for (Livre l : biblio)</code>. À chaque tour, <code>l</code> désigne un livre du tableau, avec tous ses attributs et ses méthodes.</p>

<div class="info"><div>En vrai Java, on utilise plutôt une <code>ArrayList</code>, qui peut grandir et rétrécir à volonté — contrairement au tableau dont la taille est figée. Le principe de parcours reste exactement le même.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: 'Parcours la bibliothèque avec un <strong>for-each</strong> et affiche chaque livre sous la forme <code>Le Petit Prince (96 p.)</code>.',
      codeDepart: 'class Livre {\n    String titre;\n    int pages;\n\n    Livre(String titre, int pages) {\n        this.titre = titre;\n        this.pages = pages;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Livre[] biblio = {\n            new Livre("Le Petit Prince", 96),\n            new Livre("Les Misérables", 1500),\n            new Livre("L\'Étranger", 159)\n        };\n        \n    }\n}',
      indice: '<code>for (Livre l : biblio) { System.out.println(l.titre + " (" + l.pages + " p.)"); }</code>',
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
      indice: 'Dans le for-each : <code>total += l.pages;</code> puis un println après la boucle.',
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
      indice: 'Même motif que la recherche du maximum, mais sur des objets : <code>if (l.pages > plusLong.pages) { plusLong = l; }</code>',
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
<p>Dernier exercice du module, et de tout le parcours des langages : une petite application qui rassemble classes, encapsulation, tableaux d'objets et parcours.</p>

<h2>Ce que tu vas construire</h2>
<p>Une classe <code>Media</code> représentant un document empruntable, avec un état interne protégé (<code>private boolean emprunte</code>) et des méthodes qui le font évoluer proprement. Puis une petite collection à interroger.</p>

<h2>Ton aide-mémoire</h2>
<pre class="bloc-code">class X {
    private int champ;                    // état protégé
    X(int champ) { this.champ = champ; }  // constructeur
    public int getChamp() { ... }         // lecture
    public void action() { ... }          // modification contrôlée
}

X[] tab = { new X(1), new X(2) };         // tableau d'objets
for (X e : tab) { ... }                   // parcours</pre>

<div class="astuce"><div>C'est le dernier exercice du module. Si tu le réussis, tu sais écrire du code dans <strong>cinq langages</strong> : HTML/CSS pour la structure et l'apparence, JavaScript, Python, SQL, C et Java. Peu de gens qui débutent peuvent en dire autant.</div></div>
`,
  exercices: [
    {
      type: 'java',
      consigne: '<strong>Étape 1 :</strong> complète la classe <code>Media</code> avec une méthode <code>emprunter()</code> qui passe <code>emprunte</code> à <code>true</code>, et <code>estEmprunte()</code> qui renvoie son état. Le main doit afficher <code>false</code> puis <code>true</code>.',
      codeDepart: 'class Media {\n    String titre;\n    private boolean emprunte;\n\n    Media(String titre) {\n        this.titre = titre;\n        this.emprunte = false;\n    }\n\n    // emprunter() et estEmprunte() ici\n\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Media m = new Media("Dune");\n        System.out.println(m.estEmprunte());\n        m.emprunter();\n        System.out.println(m.estEmprunte());\n    }\n}',
      indice: '<code>public void emprunter() { emprunte = true; }</code> et <code>public boolean estEmprunte() { return emprunte; }</code>',
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
      indice: 'Parcours avec un for-each et compte ceux qui ne sont PAS empruntés : <code>if (m.estEmprunte() == false) { dispo++; }</code> — ou plus élégant, <code>if (!m.estEmprunte())</code>.',
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
      indice: 'Dans la boucle, un <code>if</code>/<code>else</code> choisit le mot à afficher — ou, plus court, l\'opérateur ternaire : <code>(m.estEmprunte() ? "emprunté" : "disponible")</code>.',
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
