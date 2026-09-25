/* ===== Module JavaScript — partie 1 (leçons 1 à 6) ===== */
window.DATA_JS1 = [

{
  id: 'js-1',
  titre: 'Ton premier programme',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un ordinateur ne devine rien. Il ne fait que suivre, à la lettre et dans l'ordre, une liste d'instructions : c'est ça, un <strong>programme</strong>. Le JavaScript est le langage de ces instructions pour les pages web. C'est lui qui fait réagir un bouton, défiler un carrousel ou valider un formulaire, sur la quasi-totalité des sites. C'est aussi le langage le plus utilisé au monde. Tout ce que tu vas apprendre ici (variables, conditions, boucles, fonctions) existe dans <em>tous</em> les autres langages.</p>
<p>Premier problème à régler : un programme travaille en silence. Pour savoir ce qu'il fait, il faut qu'il nous le <em>montre</em>. D'où la toute première instruction de ce cours.</p>

<h2>Afficher quelque chose : console.log</h2>
<pre class="bloc-code">console.log("Bonjour tout le monde !");</pre>
<ul>
<li><code>console.log(...)</code> est une <strong>instruction</strong> : elle affiche ce qu'on lui donne dans la « console ». Chez nous, c'est le cadre de résultat, à côté de l'éditeur ;</li>
<li><code>"Bonjour tout le monde !"</code> est un texte, toujours entouré de <strong>guillemets</strong>. Sans eux, JavaScript croirait lire des instructions ;</li>
<li><code>;</code> termine l'instruction, comme un point termine une phrase.</li>
</ul>

<h2>Un programme = des instructions dans l'ordre</h2>
<pre class="bloc-code">console.log("Première ligne");
console.log("Deuxième ligne");
console.log("Troisième ligne");</pre>
<p>L'ordinateur exécute les instructions <strong>de haut en bas, une par une</strong>. Ça paraît évident, mais c'est le principe de toute la programmation : le résultat dépend de l'ordre dans lequel tu écris les lignes.</p>

<h2>Pas à pas</h2>
<p>Voici un programme avec une faute à la deuxième ligne. Que se passe-t-il exactement ?</p>
<pre class="bloc-code">console.log("a");
Console.log("b");
console.log("c");</pre>
<table class="memo-table trace">
<tr><th>Ligne</th><th>Ce qui se passe</th></tr>
<tr><td>1</td><td>L'instruction est correcte : <code>a</code> s'affiche.</td></tr>
<tr><td>2</td><td><code>Console</code> avec une majuscule n'existe pas. JavaScript s'arrête net et affiche une erreur.</td></tr>
<tr><td>3</td><td>Jamais exécutée : le programme s'est arrêté à la ligne 2. Le <code>c</code> ne s'affiche pas.</td></tr>
</table>
<p>Retiens ce comportement : ce qui est <em>avant</em> l'erreur a déjà tourné, ce qui est <em>après</em> n'a jamais tourné. C'est un premier indice pour trouver où est le problème.</p>

<h2>Les pièges</h2>
<p><strong>Une majuscule de trop.</strong> JavaScript distingue les majuscules des minuscules. <code>Console.log</code> donne le message « Console is not defined », c'est-à-dire « Console n'existe pas ». Il faut écrire <code>console.log</code>, tout en minuscules, avec le point.</p>
<p><strong>Un guillemet oublié.</strong> <code>console.log("Bonjour);</code> : le texte n'est jamais refermé, et JavaScript répond « Invalid or unexpected token », « symbole invalide ou inattendu ». Compte tes guillemets : ils vont toujours par deux.</p>
<p><strong>Une parenthèse oubliée.</strong> <code>console.log("Bonjour";</code> donne « missing ) after argument list », littéralement « il manque une ) après la liste ». Là, le message dit exactement quoi faire.</p>
<p>Les messages sont en anglais, mais ils sont courts et toujours construits pareil. Les lire est la compétence la plus utile de ce cours : un message d'erreur n'est pas un reproche, c'est un indice.</p>

<h2>Dans la vraie vie</h2>
<p>Tous les navigateurs ont une console. Sur n'importe quel site, appuie sur <kbd>F12</kbd> et ouvre l'onglet « Console » : tu y verras parfois les messages que les développeurs ont laissés. Eux aussi passent leurs journées à afficher des valeurs avec <code>console.log</code> pour comprendre ce que fait leur programme.</p>

<div class="a-retenir">
<ul>
<li><code>console.log("texte");</code> affiche un message : c'est ta fenêtre sur ce que fait le programme.</li>
<li>Les instructions s'exécutent de haut en bas ; à la première erreur, tout s'arrête.</li>
<li>Un message d'erreur se lit : il dit ce qui ne va pas, et souvent où.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le point-virgule est-il obligatoire ?</summary>
<p>En JavaScript, pas tout à fait : si tu l'oublies en fin de ligne, le langage en ajoute souvent un tout seul. Mais « souvent » n'est pas « toujours », et certaines situations rares donnent alors un résultat surprenant. La plupart des équipes l'écrivent systématiquement, et ce cours aussi : c'est une habitude qui ne coûte rien et évite des erreurs difficiles à trouver.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Écris un programme qui affiche <strong>trois messages</strong> à la suite avec <code>console.log</code> : d\'abord <code>Bonjour</code>, puis <code>je m\'appelle</code> suivi de ton prénom, puis <code>et j\'apprends le JavaScript</code>.',
      codeDepart: 'console.log("Bonjour");\n',
      indices: [
        "Un <code>console.log</code> affiche un message, et un seul. Pour trois messages, il en faut donc trois — la première ligne te sert de modèle.",
        "Chaque ligne suit le même moule : <code>console.log(\"…\");</code>. Le texte va entre guillemets, les guillemets entre parenthèses, et la ligne se termine par un point-virgule.",
        "<code>console.log(\"je m’appelle …\");</code> puis <code>console.log(\"et j’apprends le JavaScript\");</code>, sous la ligne déjà présente. L’apostrophe ne gêne pas : elle est à l’intérieur de guillemets doubles."
      ],
      solution: 'console.log("Bonjour");\nconsole.log("je m\'appelle Mathéo");\nconsole.log("et j\'apprends le JavaScript");',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>. Lis-la, elle indique souvent la ligne du problème.' };
        if (ctx.logs.length < 3) return { ok: false, message: 'Ton programme affiche ' + ctx.logs.length + ' message(s) — il en faut 3, donc trois <code>console.log</code>.' };
        if (!/bonjour/i.test(ctx.logs[0])) return { ok: false, message: 'Le premier message doit être « Bonjour ».' };
        if (!/appelle/i.test(ctx.logs[1])) return { ok: false, message: 'Le deuxième message doit contenir « je m\'appelle » suivi de ton prénom.' };
        if (!/javascript/i.test(ctx.logs[2])) return { ok: false, message: 'Le troisième message doit contenir « JavaScript ».' };
        return { ok: true, message: 'Ton premier vrai programme fonctionne. Trois instructions, exécutées dans l\'ordre.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Chasse au bug !</strong> Ce programme devrait afficher deux phrases, mais il plante. Clique sur <strong>Vérifier ma réponse</strong>, LIS le message d\'erreur qui s\'affiche à droite (c\'est l\'exercice !), puis répare les <strong>deux</strong> erreurs.',
      codeDepart: 'Console.log("Le code, c\'est logique");\nconsole.log(Une erreur est un indice);',
      indices: [
        "Lance le code et lis le message d’erreur — c’est lui, l’exercice. JavaScript te donne le nom de ce qu’il ne connaît pas.",
        "Deux fautes, à deux endroits différents. La première est une histoire de majuscule : JavaScript distingue <code>Console</code> de <code>console</code>. La seconde, un texte qui n’est pas signalé comme du texte.",
        "<code>console</code> tout en minuscules, et des guillemets autour du texte de la deuxième ligne."
      ],
      solution: 'console.log("Le code, c\'est logique");\nconsole.log("Une erreur est un indice");',
      verifier: function (ctx) {
        if (ctx.erreur) {
          if (/Console/.test(ctx.code)) return { ok: false, message: 'Première erreur toujours là : <code>Console</code> avec majuscule n\'existe pas. Écris <code>console</code> tout en minuscules.' };
          return { ok: false, message: 'Encore une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>. Regarde la 2e ligne : un texte doit être entouré de guillemets.' };
        }
        if (ctx.logs.length < 2) return { ok: false, message: 'Le programme doit afficher les deux phrases.' };
        return { ok: true, message: 'Tu viens de faire ce que les développeurs font 50 fois par jour : lire une erreur, comprendre, corriger. C\'est LA compétence.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : la fusée ASCII.</strong> Les programmeurs adorent dessiner avec du texte. Affiche exactement ces 4 lignes, dans cet ordre : <code>/\\</code> puis <code>||</code> puis <code>||</code> puis <code>/  \\</code> — une fusée vue de face !',
      codeDepart: '// Dessine la fusée ligne par ligne\n',
      indices: [
        "Quatre lignes à afficher, donc quatre instructions. La difficulté n’est pas là : elle tient à un seul caractère.",
        "La barre oblique inversée a un sens spécial en JavaScript : elle annonce un caractère particulier. Pour en afficher une vraie, il faut la doubler.",
        "<code>console.log(\"/\\\\\");</code> — deux barres dans le code pour en afficher une seule. Et la dernière ligne contient deux espaces entre les barres."
      ],
      solution: 'console.log("/\\\\");\nconsole.log("||");\nconsole.log("||");\nconsole.log("/  \\\\");',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>. Astuce de pro : dans un texte, le caractère \\ doit s\'écrire en double : <code>"\\\\"</code> — il est spécial en JavaScript !' };
        if (ctx.logs.length < 4) return { ok: false, message: 'Il faut 4 lignes affichées (tu en as ' + ctx.logs.length + ').' };
        const l = ctx.logs.map(x => x.trim());
        if (l[0] !== '/\\') return { ok: false, message: 'La ligne 1 doit être <code>/\\</code>. (Rappel : pour afficher un \\, écris-le en double dans les guillemets : <code>"/\\\\"</code>.)' };
        if (l[1] !== '||' || l[2] !== '||') return { ok: false, message: 'Les lignes 2 et 3 doivent être <code>||</code> (deux barres verticales : AltGr+6).' };
        if (l[3].replace(/\s+/g, ' ') !== '/ \\' && l[3] !== '/  \\') return { ok: false, message: 'La ligne 4 doit être <code>/  \\</code> (barre, espaces, contre-barre doublée dans le code).' };
        return { ok: true, message: '🚀 Et au passage, tu as découvert les « caractères d\'échappement » (\\\\) — un détail que même des développeurs confirmés oublient.' };
      }
    }
  ]
},

{
  id: 'js-2',
  titre: 'Les variables : la mémoire du programme',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un programme a besoin de retenir des choses : le score d'une partie, le prénom de la personne connectée, le prix d'un panier. Et ces choses changent : le score monte, le panier se remplit. Une <strong>variable</strong> est une boîte avec une étiquette : on range une valeur dedans, on la relit plus tard par son nom, et on peut remplacer ce qu'elle contient. C'est la notion la plus fondamentale de toute la programmation.</p>

<h2>Créer une variable</h2>
<pre class="bloc-code">let prenom = "Camille";
let age = 28;

console.log(prenom);   // affiche : Camille
console.log(age);      // affiche : 28</pre>
<ul>
<li><code>let</code> est le mot-clé qui crée une variable (<em>let</em>, « soit… ») ;</li>
<li><code>prenom</code> est le <strong>nom</strong> choisi : sans espaces ni accents. Pour un nom composé, on colle les mots avec une majuscule au milieu : <code>scoreJoueur</code> ;</li>
<li><code>=</code> est l'<strong>affectation</strong> : « range cette valeur dans cette boîte ». Ce n'est pas le « égal » des mathématiques ;</li>
<li>la valeur : un texte entre guillemets, ou un nombre <strong>sans</strong> guillemets.</li>
</ul>
<p>Une fois créée, on utilise la variable par son nom, <strong>sans guillemets</strong>. Et le <code>//</code> ? Tout ce qui le suit sur la ligne est un <strong>commentaire</strong> : une note pour les humains, que l'ordinateur ignore.</p>

<h2>Une variable peut… varier</h2>
<pre class="bloc-code">let score = 0;
console.log(score);   // 0
score = 10;           // plus de let : la boîte existe déjà
console.log(score);   // 10</pre>
<p>On n'écrit <code>let</code> qu'une fois, à la création. Ensuite, on se contente de ranger une nouvelle valeur : l'ancienne est remplacée, pas ajoutée.</p>

<h2>let ou const ?</h2>
<p>Pour une valeur qui ne changera <strong>jamais</strong> (un taux de TVA, le nom d'un jeu), on utilise <code>const</code> (constante) au lieu de <code>let</code>. Le réflexe des pros : <code>const</code> par défaut, <code>let</code> seulement si la valeur doit changer. Ainsi, en lisant le code, on sait tout de suite ce qui bouge et ce qui ne bouge pas.</p>

<h2>Pas à pas</h2>
<pre class="bloc-code">let score = 0;
score = 10;
score = score + 5;</pre>
<table class="memo-table trace">
<tr><th>Ligne</th><th>Ce qui se passe</th><th>score vaut</th></tr>
<tr><td>1</td><td>La boîte <code>score</code> est créée, avec 0 dedans.</td><td>0</td></tr>
<tr><td>2</td><td>10 remplace 0.</td><td>10</td></tr>
<tr><td>3</td><td>JavaScript calcule d'abord la droite : 10 + 5 = 15. Puis il range 15 dans la boîte.</td><td>15</td></tr>
</table>
<p>La ligne 3 choque les matheux, mais elle se lit simplement : « prends la valeur actuelle de score, ajoute 5, range le résultat dans score ».</p>

<h2>Les pièges</h2>
<p><strong>Des guillemets autour du nom.</strong> <code>console.log("score")</code> affiche le mot « score » ; <code>console.log(score)</code> affiche ce que <em>contient</em> la variable. Guillemets = texte tel quel ; sans guillemets = variable.</p>
<p><strong>Une faute de frappe dans le nom.</strong> <code>console.log(scor)</code> donne « scor is not defined » : JavaScript ne connaît aucune boîte qui s'appelle <code>scor</code>. Il ne corrige jamais tes fautes, et <code>Score</code> avec une majuscule serait aussi une autre boîte.</p>
<p><strong>Créer deux fois la même variable.</strong> Deux <code>let score</code> dans le même programme donnent « Identifier 'score' has already been declared » : ce nom existe déjà. Pour changer la valeur, on écrit <code>score = …</code>, sans <code>let</code>.</p>
<p><strong>Changer une constante.</strong> <code>const</code> puis une nouvelle affectation donne « Assignment to constant variable. » : c'est justement le rôle de <code>const</code> de l'interdire. Si la valeur doit changer, c'était un <code>let</code>.</p>

<h2>Dans la vraie vie</h2>
<p>Quand un site affiche « Bonjour Léa » ou « 3 articles dans ton panier », ces mots et ces nombres sortent de variables. Le jour où tu ajoutes un article, le programme ne réécrit pas la page : il change la variable, puis réaffiche ce qu'elle contient.</p>

<div class="a-retenir">
<ul>
<li><code>let nom = valeur;</code> crée une variable ; <code>nom = autreValeur;</code> la remplace.</li>
<li><code>const</code> pour ce qui ne change jamais, <code>let</code> pour ce qui change.</li>
<li>Sans guillemets, c'est une variable ; avec des guillemets, c'est un texte.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : bien nommer ses variables</summary>
<p>Un bon nom dit ce que contient la boîte : <code>prixTotal</code> plutôt que <code>p</code>, <code>nombreDeVies</code> plutôt que <code>x</code>. Certains mots sont réservés par le langage et ne peuvent pas servir de nom (<code>let</code>, <code>if</code>, <code>for</code>…). Et un nom ne peut pas commencer par un chiffre : <code>2joueurs</code> est refusé, <code>joueur2</code> est accepté. Le code se lit bien plus souvent qu'il ne s'écrit : les noms clairs sont un cadeau pour la personne qui le relira, toi y compris.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Crée une variable <code>animal</code> contenant le nom d\'un animal, et une variable <code>pattes</code> contenant son nombre de pattes (un nombre). Affiche ensuite les deux avec <code>console.log</code>.',
      codeDepart: '// Crée tes deux variables ici\n\n// Puis affiche-les ici\n',
      indices: [
        "Deux variables à créer, puis deux affichages. Une différence essentielle entre elles : l’une contient du texte, l’autre un nombre.",
        "Le texte va entre guillemets ; le nombre, <strong>sans</strong>. Un nombre entre guillemets deviendrait du texte, et on ne pourrait plus calculer avec.",
        "<code>let animal = \"chat\";</code> et <code>let pattes = 4;</code>, puis un <code>console.log</code> pour chacune."
      ],
      solution: 'let animal = "chat";\nlet pattes = 4;\n\nconsole.log(animal);\nconsole.log(pattes);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/(let|const)\s+animal\s*=/.test(ctx.code)) return { ok: false, message: 'Je ne trouve pas la variable <code>animal</code>. Crée-la avec : <code>let animal = "...";</code>' };
        if (!/(let|const)\s+pattes\s*=\s*\d/.test(ctx.code)) return { ok: false, message: 'Il manque la variable <code>pattes</code> avec un nombre <strong>sans guillemets</strong> : <code>let pattes = 4;</code>' };
        if (ctx.logs.length < 2) return { ok: false, message: 'Les variables existent, mais il faut les afficher toutes les deux : <code>console.log(animal);</code> puis <code>console.log(pattes);</code>' };
        if (ctx.logs.includes('animal') || ctx.logs.includes('pattes')) return { ok: false, message: 'Tu affiches le mot « animal » ou « pattes » au lieu du contenu : enlève les guillemets dans le <code>console.log</code>.' };
        return { ok: true, message: 'Tu sais stocker et réutiliser des informations — la base de tout programme.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Chasse au bug !</strong> Ce programme de score devrait afficher <code>0</code> puis <code>100</code>... mais il affiche deux fois le mot « score », et en plus la mise à jour est cassée. Trouve les <strong>deux</strong> problèmes.',
      codeDepart: 'let score = 0;\nconsole.log("score");\n\nlet score = 100;\nconsole.log("score");',
      indices: [
        "Deux fautes. La première se voit dans ce qui s’affiche : ce n’est pas la valeur qui sort, mais autre chose.",
        "Des guillemets autour d’un nom de variable en font du texte ordinaire. Et pour <strong>changer</strong> une variable qui existe déjà, on ne la redéclare pas.",
        "Enlève les guillemets dans les <code>console.log</code>, et le second <code>let</code> devant <code>score</code>."
      ],
      solution: 'let score = 0;\nconsole.log(score);\n\nscore = 100;\nconsole.log(score);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code> — en JavaScript, on ne peut pas refaire <code>let score</code> si la variable existe déjà. Pour la modifier : <code>score = 100;</code> tout court.' };
        if (ctx.logs.includes('score')) return { ok: false, message: 'Le mot « score » s\'affiche encore : enlève les guillemets dans les <code>console.log</code> pour afficher le CONTENU de la variable.' };
        if (ctx.logs[0] !== '0' || ctx.logs[1] !== '100') return { ok: false, message: 'Le programme doit afficher <code>0</code> puis <code>100</code> (actuellement : ' + ctx.logs.join(', ') + ').' };
        return { ok: true, message: 'Deux pièges de débutant désamorcés d\'un coup : guillemets vs variable, et re-déclaration interdite.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : l\'échange.</strong> Deux verres : <code>verreA</code> contient "jus" et <code>verreB</code> contient "eau". Échange leur contenu SANS écrire directement "jus" ou "eau" une deuxième fois — utilise une troisième variable comme verre vide temporaire ! Affiche ensuite verreA puis verreB (résultat attendu : <code>eau</code> puis <code>jus</code>).',
      codeDepart: 'let verreA = "jus";\nlet verreB = "eau";\n\n// L\'échange (avec une 3e variable)...\n\nconsole.log(verreA);\nconsole.log(verreB);',
      indices: [
        "Le piège : si tu écris <code>verreA = verreB</code> en premier, le contenu de A est écrasé et perdu pour de bon. Il faut le mettre à l’abri avant.",
        "Comme dans la vraie vie : verse A dans un verre vide, puis B dans A, puis le verre temporaire dans B. Trois affectations, dans cet ordre précis.",
        "<code>let temporaire = verreA;</code> · <code>verreA = verreB;</code> · <code>verreB = temporaire;</code>"
      ],
      solution: 'let verreA = "jus";\nlet verreB = "eau";\n\nlet temporaire = verreA;\nverreA = verreB;\nverreB = temporaire;\n\nconsole.log(verreA);\nconsole.log(verreB);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const apres = ctx.code.split(/verreB\s*=\s*"eau"\s*;/)[1] || '';
        if (/"jus"|"eau"|'jus'|'eau'/.test(apres)) return { ok: false, message: 'Tu as réécrit "jus" ou "eau" à la main — le défi est de faire l\'échange uniquement avec les variables (et une 3e temporaire).' };
        if (ctx.logs[0] !== 'eau' || ctx.logs[1] !== 'jus') return { ok: false, message: 'Résultat attendu : <code>eau</code> puis <code>jus</code> (actuellement : ' + ctx.logs.join(', ') + '). Attention à l\'ordre des 3 étapes — si tu fais <code>verreA = verreB</code> en premier, le jus est perdu !' };
        return { ok: true, message: 'L\'échange de variables est un grand classique des entretiens d\'embauche de développeurs. Sérieusement. Et tu viens de le réussir.' };
      }
    }
  ]
},

{
  id: 'js-3',
  titre: 'Nombres et calculs',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Le total d'un panier, la moyenne d'un bulletin, le temps restant avant la fin d'une vidéo : derrière presque chaque écran, il y a des calculs. Un ordinateur est d'abord une machine à calculer, extrêmement rapide et qui ne se trompe jamais… à condition qu'on lui pose le bon calcul. Toute la difficulté est là.</p>

<h2>Les opérateurs</h2>
<pre class="bloc-code">console.log(5 + 3);   // 8   addition
console.log(10 - 4);  // 6   soustraction
console.log(6 * 7);   // 42  multiplication (l'étoile)
console.log(20 / 5);  // 4   division (la barre)
console.log(10 % 3);  // 1   le RESTE de la division</pre>
<p>Le <code>%</code> (« modulo ») donne le reste d'une division : 10 = 3 × 3, reste 1. Il surprend au début mais sert tout le temps. <code>n % 2</code> vaut 0 si <code>n</code> est pair. Et pour convertir 200 minutes : <code>200 % 60</code> donne les minutes restantes, 20.</p>
<p>Pour la partie entière d'une division (combien de fois 60 « rentre » dans 200), JavaScript a <code>Math.floor(...)</code>, qui arrondit vers le bas : <code>Math.floor(200 / 60)</code> vaut 3.</p>

<h2>L'ordre des opérations</h2>
<p>Comme en maths, <code>*</code>, <code>/</code> et <code>%</code> passent avant <code>+</code> et <code>-</code>. Les parenthèses imposent un autre ordre :</p>
<pre class="bloc-code">console.log(2 + 3 * 4);     // 14 : la multiplication d'abord
console.log((2 + 3) * 4);   // 20 : les parenthèses d'abord</pre>

<h2>Calculer avec des variables</h2>
<pre class="bloc-code">let prixArticle = 25;
let quantite = 3;
let total = prixArticle * quantite;

console.log(total);   // 75</pre>
<p>Les calculs marchent avec des variables, et le résultat se range dans une autre variable. Change <code>quantite</code>, et <code>total</code> sera juste au prochain lancement : c'est tout l'intérêt.</p>

<h2>Pas à pas</h2>
<pre class="bloc-code">let score = 100;
score = score + 50;
score += 10;</pre>
<table class="memo-table trace">
<tr><th>Ligne</th><th>Calcul à droite</th><th>score vaut ensuite</th></tr>
<tr><td>1</td><td>—</td><td>100</td></tr>
<tr><td>2</td><td><code>score + 50</code>, soit 100 + 50 = 150</td><td>150</td></tr>
<tr><td>3</td><td><code>+=</code> est un raccourci pour <code>score = score + 10</code> : 150 + 10</td><td>160</td></tr>
</table>
<p>Il existe aussi <code>-=</code>, <code>*=</code> et <code>/=</code>, sur le même modèle.</p>

<h2>Les pièges</h2>
<p><strong>L'ordre des opérations.</strong> Pour la moyenne de 10, 14 et 18, <code>10 + 14 + 18 / 3</code> donne 30 et non 14 : seul le 18 est divisé par 3. Il faut <code>(10 + 14 + 18) / 3</code>. Aucune erreur ne s'affiche, le résultat est juste faux : c'est le pire genre de bug.</p>
<p><strong>Un nombre entre guillemets.</strong> <code>"5" + 3</code> donne <code>"53"</code> : entre guillemets, 5 est un texte, et <code>+</code> colle deux textes au lieu de les additionner. Curieusement, <code>"5" * 3</code> donne bien 15. Garde tes nombres sans guillemets.</p>
<p><strong>Les décimales.</strong> Les nombres à virgule s'écrivent avec un point : <code>12.5</code>. Et <code>0.1 + 0.2</code> donne <code>0.30000000000000004</code> : l'ordinateur stocke les décimales en binaire, avec une infime approximation. Pour afficher un prix, on arrondit.</p>
<p><strong>Diviser par zéro.</strong> <code>10 / 0</code> ne provoque pas d'erreur : le résultat vaut <code>Infinity</code> (l'infini). Si ce mot apparaît dans ton affichage, cherche la division.</p>

<h2>Dans la vraie vie</h2>
<p>Un site de commerce calcule un sous-total, ajoute la livraison, applique une remise en pourcentage. Un lecteur vidéo convertit des secondes en « 2 min 15 » avec exactement <code>Math.floor</code> et <code>%</code>. Et un tableau dont une ligne sur deux est grisée utilise souvent <code>% 2</code> pour savoir si le numéro de ligne est pair.</p>

<div class="a-retenir">
<ul>
<li><code>+ - * /</code> comme en maths, et <code>%</code> pour le reste d'une division.</li>
<li>Multiplication et division passent avant l'addition : en cas de doute, des parenthèses.</li>
<li><code>score += 10</code> est un raccourci pour <code>score = score + 10</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : arrondir</summary>
<p><code>Math.floor(4.7)</code> arrondit vers le bas (4), <code>Math.ceil(4.2)</code> vers le haut (5), <code>Math.round(4.5)</code> au plus proche (5). Pour un prix à deux décimales, <code>(19.9 * 3).toFixed(2)</code> donne le texte <code>"59.70"</code>. Attention : <code>toFixed</code> renvoie un texte, fait pour l'affichage, pas pour continuer à calculer.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Une pizzeria ! Crée <code>prixPizza</code> valant <code>12</code> et <code>nombrePizzas</code> valant <code>4</code>. Calcule le total dans une variable <code>total</code>, puis ajoute <code>3</code> au total pour la livraison. Affiche le total final (il doit valoir 51).',
      codeDepart: '// La commande de pizzas\n',
      indices: [
        "Le total doit être <strong>calculé</strong>, pas écrit à la main : c’est JavaScript qui multiplie. Puis la livraison s’ajoute au résultat.",
        "Une variable peut se modifier à partir d’elle-même : <code>total = total + 3;</code>. La droite est calculée d’abord, puis rangée à gauche.",
        "<code>let total = prixPizza * nombrePizzas;</code> puis <code>total += 3;</code>, et l’affichage."
      ],
      solution: 'let prixPizza = 12;\nlet nombrePizzas = 4;\nlet total = prixPizza * nombrePizzas;\ntotal = total + 3;\nconsole.log(total);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/(let|const)\s+prixPizza/.test(ctx.code) || !/(let|const)\s+nombrePizzas/.test(ctx.code)) return { ok: false, message: 'Commence par créer les deux variables <code>prixPizza</code> (12) et <code>nombrePizzas</code> (4).' };
        if (!/[*]/.test(ctx.code)) return { ok: false, message: 'Le total doit être <strong>calculé</strong> avec une multiplication (<code>*</code>), pas écrit à la main.' };
        if (ctx.logs.length === 0) return { ok: false, message: 'N\'oublie pas d\'afficher le total avec <code>console.log(total);</code>' };
        if (ctx.logs[ctx.logs.length - 1] !== '51') return { ok: false, message: 'Le total affiché est ' + ctx.logs[ctx.logs.length - 1] + ' au lieu de 51. Vérifie : 12 × 4 = 48, plus 3 de livraison = 51.' };
        return { ok: true, message: 'Calculs, variables, raccourcis : tu programmes pour de vrai maintenant.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : la moyenne.</strong> Trois notes : <code>note1 = 12</code>, <code>note2 = 15</code>, <code>note3 = 9</code>. Calcule la moyenne dans une variable <code>moyenne</code> (additionne les trois, divise par 3) et affiche-la. Attention au piège mathématique des parenthèses !',
      codeDepart: 'let note1 = 12;\nlet note2 = 15;\nlet note3 = 9;\n\n// Calcule et affiche la moyenne\n',
      indices: [
        "Le piège est mathématique, pas informatique : la division se fait avant l’addition, exactement comme à l’école.",
        "Sans parenthèses, seul le <strong>dernier</strong> terme est divisé. Il faut donc forcer l’ordre : additionner d’abord, diviser ensuite.",
        "<code>(note1 + note2 + note3) / 3</code>"
      ],
      solution: 'let note1 = 12;\nlet note2 = 15;\nlet note3 = 9;\n\nlet moyenne = (note1 + note2 + note3) / 3;\nconsole.log(moyenne);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (ctx.logs.length === 0) return { ok: false, message: 'Affiche la moyenne avec <code>console.log(moyenne);</code>' };
        const dernier = ctx.logs[ctx.logs.length - 1];
        if (dernier === '30') return { ok: false, message: 'Tu obtiens 30 : c\'est le piège ! Sans parenthèses, seul note3 est divisé par 3 (12 + 15 + 3 = 30). Entoure l\'addition : <code>(note1 + note2 + note3) / 3</code>' };
        if (dernier !== '12') return { ok: false, message: 'La moyenne de 12, 15 et 9 est 12 (tu affiches ' + dernier + '). Vérifie ton calcul.' };
        if (!/\(/.test(ctx.code)) return { ok: false, message: 'Le résultat est bon mais... sans parenthèses ? Utilise le calcul avec les variables, pas le résultat à la main !' };
        return { ok: true, message: 'La priorité des opérations s\'applique au code comme aux maths — les parenthèses sont tes amies.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : le convertisseur de durée.</strong> La variable <code>totalMinutes</code> vaut <code>135</code>. Calcule combien ça fait d\'<code>heures</code> pleines (division entière : utilise <code>Math.floor(totalMinutes / 60)</code> qui arrondit vers le bas) et de <code>minutes</code> restantes (le fameux modulo <code>%</code> !). Affiche les deux : résultat attendu <code>2</code> puis <code>15</code>.',
      codeDepart: 'let totalMinutes = 135;\n\n// heures pleines, puis minutes restantes\n',
      indices: [
        "Deux questions : combien d’heures <strong>pleines</strong>, et combien de minutes il reste. Aucune des deux n’est une division ordinaire.",
        "<code>Math.floor()</code> arrondit vers le bas — il donne les heures pleines. Ce qui reste, c’est le modulo <code>%</code>.",
        "<code>Math.floor(totalMinutes / 60)</code> et <code>totalMinutes % 60</code> — 135 = 2×60 + 15."
      ],
      solution: 'let totalMinutes = 135;\n\nlet heures = Math.floor(totalMinutes / 60);\nlet minutes = totalMinutes % 60;\n\nconsole.log(heures);\nconsole.log(minutes);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/%/.test(ctx.code)) return { ok: false, message: 'Le défi impose d\'utiliser le modulo <code>%</code> pour les minutes restantes : <code>totalMinutes % 60</code>.' };
        if (ctx.logs.length < 2) return { ok: false, message: 'Affiche les deux valeurs : les heures, puis les minutes.' };
        if (!ctx.logs.includes('2')) return { ok: false, message: '135 minutes = 2 heures pleines. Utilise <code>Math.floor(totalMinutes / 60)</code> pour arrondir vers le bas.' };
        if (!ctx.logs.includes('15')) return { ok: false, message: 'Les heures sont bonnes ! Reste les minutes : <code>totalMinutes % 60</code> donne le reste, soit 15.' };
        return { ok: true, message: 'Le modulo vient de te servir pour de vrai — et tu as rencontré <code>Math.floor</code>, ta première fonction mathématique intégrée.' };
      }
    }
  ]
},

{
  id: 'js-4',
  titre: 'Les textes (chaînes de caractères)',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>La plupart de ce qu'un programme montre, c'est du texte : « Bonjour Camille », « 3 nouveaux messages », « Mot de passe trop court ». Et ce texte est presque toujours <em>fabriqué</em> à partir de variables. En programmation, un texte s'appelle une <strong>chaîne de caractères</strong> (<em>string</em>). Tu sais déjà l'écrire entre guillemets ; voyons comment l'assembler et le transformer.</p>

<h2>Coller des textes ensemble</h2>
<p>Le <code>+</code> entre deux textes les colle bout à bout (on dit « concaténer ») :</p>
<pre class="bloc-code">let prenom = "Camille";
console.log("Bonjour " + prenom + " !");   // Bonjour Camille !</pre>
<p>Les espaces ne s'ajoutent pas tout seuls : il faut les mettre dans les guillemets, comme après <code>"Bonjour&nbsp;"</code>.</p>

<h2>La méthode moderne : les backticks</h2>
<p>Il existe une troisième sorte de guillemets : les <strong>accents graves</strong> <code>\`...\`</code>, appelés <em>backticks</em>. Sur Windows : <kbd>AltGr + 7</kbd>, puis une espace. Leur superpouvoir : insérer une variable directement dans le texte avec <code>\${...}</code> :</p>
<pre class="bloc-code">let prenom = "Camille";
let age = 28;
console.log(\`Bonjour \${prenom}, tu as \${age} ans.\`);
// Bonjour Camille, tu as 28 ans.</pre>
<p>Plus lisible, et plus d'espaces oubliés : c'est la méthode préférée des développeurs aujourd'hui. Les deux façons restent correctes.</p>

<h2>Quelques outils sur les textes</h2>
<pre class="bloc-code">let ville = "Marseille";
console.log(ville.length);          // 9  (nombre de caractères)
console.log(ville.toUpperCase());   // MARSEILLE
console.log(ville.toLowerCase());   // marseille</pre>
<p>Ces outils attachés aux valeurs par un point s'appellent des <strong>méthodes</strong>. Tu en connais déjà une sans le savoir : <code>log</code> est une méthode de <code>console</code>. Remarque la différence d'écriture : <code>length</code> est une information qu'on lit, sans parenthèses ; <code>toUpperCase()</code> est une action qu'on déclenche, avec des parenthèses.</p>

<h2>Pas à pas</h2>
<p>Comment JavaScript construit-il <code>"Bonjour " + prenom + " !"</code> ?</p>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>1</td><td><code>prenom</code> est remplacé par sa valeur : <code>"Bonjour " + "Camille" + " !"</code>.</td></tr>
<tr><td>2</td><td>Le premier <code>+</code> colle les deux premiers morceaux : <code>"Bonjour Camille"</code>.</td></tr>
<tr><td>3</td><td>Le second <code>+</code> ajoute la fin : <code>"Bonjour Camille !"</code>.</td></tr>
<tr><td>4</td><td><code>console.log</code> affiche le texte terminé.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>L'espace oublié.</strong> <code>"Bonjour" + prenom</code> affiche « BonjourCamille ». Le <code>+</code> colle exactement ce qu'on lui donne, ni plus ni moins.</p>
<p><strong>Le <code>\${}</code> dans de mauvais guillemets.</strong> <code>"Bonjour \${prenom}"</code> entre guillemets droits affiche littéralement « Bonjour \${prenom} ». Le remplacement ne marche qu'entre backticks. Et entre backticks, sans le <code>$</code>, <code>\`Bonjour {prenom}\`</code> affiche « Bonjour {prenom} ».</p>
<p><strong>Les parenthèses des méthodes.</strong> <code>ville.length()</code> donne « ville.length is not a function » : <code>length</code> n'est pas une action, pas de parenthèses. À l'inverse, <code>ville.toUpperCase</code> sans parenthèses n'affiche pas MARSEILLE mais la description de l'outil lui-même : « function toUpperCase() { [native code] } ».</p>

<h2>Dans la vraie vie</h2>
<p>Les messages personnalisés d'une application se construisent exactement ainsi. Et les méthodes de texte servent à nettoyer ce que tape l'utilisateur : une adresse e-mail est souvent mise en minuscules avant d'être comparée, pour que « Lea@Mail.fr » et « lea@mail.fr » soient reconnues comme la même.</p>

<div class="a-retenir">
<ul>
<li><code>+</code> colle des textes, espaces compris ; les backticks insèrent des variables avec <code>\${...}</code>.</li>
<li><code>.length</code> donne le nombre de caractères, sans parenthèses.</li>
<li><code>.toUpperCase()</code> et <code>.toLowerCase()</code> changent la casse, avec parenthèses.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : un texte ne change jamais</summary>
<p><code>ville.toUpperCase()</code> ne modifie pas <code>ville</code> : il fabrique un <em>nouveau</em> texte en majuscules. Après la ligne, <code>ville</code> vaut toujours « Marseille ». Pour garder la version en majuscules, il faut la ranger : <code>let villeMaj = ville.toUpperCase();</code>. C'est vrai de toutes les méthodes de texte : elles renvoient une copie transformée et laissent l'original intact.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Crée une variable <code>ville</code> avec le nom d\'une ville. Affiche la phrase <code>J\'habite à [ville]</code> (avec la variable dedans, par la méthode de ton choix), puis affiche le nom de la ville en MAJUSCULES.',
      codeDepart: 'let ville = "Paris";\n',
      indices: [
        "Deux affichages. Le premier mêle du texte et une variable ; le second transforme le texte avant de l’afficher.",
        "Coller du texte et une variable : soit avec <code>+</code>, soit avec des accents graves et <code>${…}</code>. Les méthodes de texte, elles, s’appellent avec un point et des parenthèses.",
        "<code>console.log(`J’habite à ${ville}`);</code> puis <code>console.log(ville.toUpperCase());</code>"
      ],
      solution: 'let ville = "Paris";\nconsole.log(`J\'habite à ${ville}`);\nconsole.log(ville.toUpperCase());',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (ctx.logs.length < 2) return { ok: false, message: 'Il faut deux affichages : la phrase, puis la ville en majuscules.' };
        const phrase = ctx.logs.find(l => /habite/i.test(l));
        if (!phrase) return { ok: false, message: 'Je ne vois pas la phrase « J\'habite à ... ». Colle le texte et la variable ensemble.' };
        if (/\$\{/.test(phrase)) return { ok: false, message: 'Ton <code>\${...}</code> s\'affiche tel quel : tu as utilisé des guillemets normaux au lieu des accents graves <code>\`...\`</code>.' };
        const maj = ctx.logs.find(l => l.length > 1 && l === l.toUpperCase() && /[A-ZÀ-Ý]/.test(l) && !/habite/i.test(l));
        if (!maj) return { ok: false, message: 'La phrase est bonne ! Il manque l\'affichage en majuscules : <code>console.log(ville.toUpperCase());</code>' };
        return { ok: true, message: 'Concaténation, backticks, méthodes : les textes n\'ont plus de secret.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : la carte d\'identité.</strong> Avec les variables fournies, affiche avec des <strong>backticks</strong> la phrase exacte : <code>Rex a 5 ans et pèse 12 kilos.</code> — une seule ligne de code pour l\'affichage !',
      codeDepart: 'let nom = "Rex";\nlet age = 5;\nlet poids = 12;\n\n// Une seule ligne avec des backticks\n',
      indices: [
        "Une seule ligne d’affichage, avec trois variables dedans. C’est exactement ce à quoi servent les accents graves.",
        "Le texte va entre accents graves (AltGr + 7), et chaque variable s’insère dans un <code>${…}</code>. La ponctuation finale fait partie du texte.",
        "<code>console.log(`${nom} a ${age} ans et pèse ${poids} kilos.`);</code>"
      ],
      solution: 'let nom = "Rex";\nlet age = 5;\nlet poids = 12;\n\nconsole.log(`${nom} a ${age} ans et pèse ${poids} kilos.`);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const attendu = 'Rex a 5 ans et pèse 12 kilos.';
        const trouve = ctx.logs.find(l => l.trim() === attendu);
        if (!trouve) {
          const proche = ctx.logs.find(l => /Rex/.test(l));
          if (proche && /\$\{/.test(proche)) return { ok: false, message: 'Le <code>\${...}</code> s\'affiche tel quel — il faut des BACKTICKS <code>\`</code> (AltGr+7), pas des guillemets normaux.' };
          if (proche) return { ok: false, message: 'Presque ! Attendu exactement : <code>' + attendu + '</code> — obtenu : <code>' + proche.replace(/</g, '&lt;') + '</code>. Compare espace par espace.' };
          return { ok: false, message: 'Je ne vois pas la phrase. Utilise les trois variables dans un seul console.log avec backticks.' };
        }
        if (!/`/.test(ctx.code)) return { ok: false, message: 'Le résultat est bon, mais l\'exercice demande la méthode moderne : les backticks <code>\`...\`</code> avec <code>\${variable}</code>.' };
        return { ok: true, message: 'Les backticks vont devenir ton réflexe — c\'est la façon la plus lisible de construire du texte.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : l\'analyseur de mot de passe.</strong> La variable <code>motDePasse</code> contient un mot de passe. Affiche : 1) sa longueur (nombre de caractères), 2) la phrase <code>Longueur : X caractères</code> avec la longueur dedans, 3) le mot de passe en minuscules. Ton code doit marcher <strong>quel que soit</strong> le mot de passe (change-le pour tester !).',
      codeDepart: 'let motDePasse = "Azerty123";\n',
      indices: [
        "Trois affichages, et une distinction à ne pas rater : certaines choses sont des <strong>propriétés</strong>, d’autres des <strong>méthodes</strong>.",
        "Une propriété se lit sans parenthèses — <code>motDePasse.length</code>. Une méthode s’appelle avec — <code>motDePasse.toLowerCase()</code>.",
        "Les trois lignes : <code>.length</code>, puis une phrase avec <code>${motDePasse.length}</code>, puis <code>.toLowerCase()</code>."
      ],
      solution: 'let motDePasse = "Azerty123";\n\nconsole.log(motDePasse.length);\nconsole.log(`Longueur : ${motDePasse.length} caractères`);\nconsole.log(motDePasse.toLowerCase());',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const mdpMatch = ctx.code.match(/motDePasse\s*=\s*["'`]([^"'`]*)["'`]/);
        const mdp = mdpMatch ? mdpMatch[1] : 'Azerty123';
        if (!ctx.logs.includes(String(mdp.length))) return { ok: false, message: 'Il manque l\'affichage de la longueur seule : <code>console.log(motDePasse.length);</code> (length sans parenthèses — c\'est une propriété, pas une méthode).' };
        if (!ctx.logs.some(l => /Longueur\s*:/.test(l) && l.includes(String(mdp.length)))) return { ok: false, message: 'Il manque la phrase <code>Longueur : ' + mdp.length + ' caractères</code> — construis-la avec des backticks.' };
        if (!ctx.logs.includes(mdp.toLowerCase())) return { ok: false, message: 'Dernier affichage manquant : le mot de passe en minuscules avec <code>.toLowerCase()</code>.' };
        return { ok: true, message: 'Propriété (.length), méthode (.toLowerCase()), interpolation (backticks) : trois outils de manipulation de texte d\'un coup. Les vrais sites vérifient les mots de passe exactement comme ça.' };
      }
    }
  ]
},

{
  id: 'js-5',
  titre: 'Les conditions : si... alors',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Jusqu'ici, tes programmes exécutent toujours tout, dans l'ordre. Mais un vrai programme doit <strong>réagir</strong> : afficher « Mot de passe incorrect » seulement si le mot de passe est faux, terminer la partie seulement quand les vies tombent à zéro. Les <strong>conditions</strong> lui apprennent à choisir : « SI il pleut, prends un parapluie, SINON prends des lunettes de soleil ».</p>

<h2>La structure if / else</h2>
<pre class="bloc-code">let age = 20;

if (age >= 18) {
  console.log("Tu es majeur");
} else {
  console.log("Tu es mineur");
}</pre>
<ul>
<li><code>if (condition) { ... }</code> : <strong>si</strong> la condition est vraie, exécute ce qui est entre les accolades ;</li>
<li><code>else { ... }</code> : <strong>sinon</strong>, exécute cet autre bloc. Il est facultatif : sans lui, on ne fait rien quand la condition est fausse.</li>
</ul>
<p>Une condition est une question dont la réponse est oui ou non. En JavaScript, ces deux réponses sont des valeurs à part entière : <code>true</code> (vrai) et <code>false</code> (faux). <code>console.log(20 >= 18)</code> affiche <code>true</code>.</p>

<h2>Les comparaisons</h2>
<pre class="bloc-code">a === b    // a est égal à b        (OUI, trois signes =)
a !== b    // a est différent de b
a > b      // a est plus grand que b
a >= b     // plus grand ou égal
a &lt; b      // plus petit
a &lt;= b     // plus petit ou égal</pre>

<h2>Plus de deux cas : else if</h2>
<p>Quand il y a trois possibilités ou plus, on enchaîne avec <code>else if</code> (« sinon, si… ») :</p>
<pre class="bloc-code">let heure = 14;

if (heure &lt; 12) {
  console.log("Bonjour");
} else if (heure &lt; 18) {
  console.log("Bon après-midi");
} else {
  console.log("Bonsoir");
}</pre>
<p>La leçon suivante y revient en détail, avec un piège d'ordre à connaître.</p>

<h2>Pas à pas</h2>
<p>Le premier exemple, avec <code>age</code> qui vaut 20, puis 15 :</p>
<table class="memo-table trace">
<tr><th>age</th><th>age &gt;= 18</th><th>Ce qui s'exécute</th></tr>
<tr><td>20</td><td><code>true</code></td><td>le bloc du <code>if</code> : « Tu es majeur ». Le <code>else</code> est sauté.</td></tr>
<tr><td>15</td><td><code>false</code></td><td>le bloc du <code>if</code> est sauté ; le <code>else</code> s'exécute : « Tu es mineur ».</td></tr>
</table>
<p>Un seul des deux blocs s'exécute, jamais les deux, jamais aucun.</p>

<h2>Les pièges</h2>
<p><strong>Un seul <code>=</code> au lieu de trois.</strong> C'est LE piège du JavaScript. <code>if (age = 18)</code> ne compare pas : il <em>range</em> 18 dans <code>age</code>, et la condition est considérée comme vraie. Aucune erreur ne s'affiche, le bloc s'exécute toujours, et <code>age</code> a changé en douce. Pour comparer : <code>===</code>, toujours.</p>
<p><strong>Comparer un texte et un nombre.</strong> <code>"18" === 18</code> vaut <code>false</code> : pour <code>===</code>, un texte n'est jamais égal à un nombre, même s'ils se ressemblent. Ça arrive dès qu'on lit ce que tape un utilisateur, qui est toujours du texte. Tu apprendras à convertir plus tard.</p>
<p><strong>Tester les deux cas.</strong> Un <code>if/else</code> a deux chemins ; si tu n'en essaies qu'un, l'autre peut cacher une faute. Change la valeur de la variable et relance : c'est le réflexe qui distingue un programme qui marche d'un programme qui a l'air de marcher.</p>

<h2>Dans la vraie vie</h2>
<p>Chaque message d'un formulaire (« Ce champ est obligatoire », « Adresse e-mail invalide ») est au bout d'une condition. Un jeu vérifie à chaque instant si les vies sont à zéro ; une boutique, si le stock est vide avant d'afficher « Rupture ».</p>

<div class="a-retenir">
<ul>
<li><code>if (condition) { ... } else { ... }</code> : un seul des deux blocs s'exécute.</li>
<li>On compare avec <code>===</code>, <code>!==</code>, <code>&gt;</code>, <code>&gt;=</code>, <code>&lt;</code>, <code>&lt;=</code> ; le résultat est <code>true</code> ou <code>false</code>.</li>
<li><code>=</code> range une valeur, <code>===</code> compare : dans un <code>if</code>, c'est toujours <code>===</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : et le double égal ?</summary>
<p>Tu croiseras aussi <code>==</code>, avec deux signes. Il compare en convertissant d'abord les valeurs : <code>"18" == 18</code> vaut <code>true</code>. Ça paraît pratique, mais ses règles de conversion réservent des surprises, au point que la plupart des équipes l'interdisent. Une leçon du module avancé y revient. D'ici là, <code>===</code> partout.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Un contrôle d\'accès : la variable <code>age</code> vaut 16. Écris un <code>if/else</code> qui affiche <code>Entrée autorisée</code> si l\'âge est supérieur ou égal à 18, et <code>Entrée refusée</code> sinon. Puis change la valeur de <code>age</code> pour vérifier que les deux cas marchent !',
      codeDepart: 'let age = 16;\n\n// Ton if/else ici\n',
      indices: [
        "La condition se met entre parenthèses, et ce qui en dépend entre accolades. Il y a deux blocs : celui du <code>if</code>, et celui du <code>else</code>.",
        "« Supérieur ou égal » s’écrit <code>&gt;=</code>, dans cet ordre. Le <code>else</code> se place juste après l’accolade fermante du <code>if</code>.",
        "<code>if (age &gt;= 18) { … } else { … }</code>, avec un <code>console.log</code> dans chaque bloc."
      ],
      solution: 'let age = 16;\n\nif (age >= 18) {\n  console.log("Entrée autorisée");\n} else {\n  console.log("Entrée refusée");\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>. Vérifie que chaque accolade ouverte <code>{</code> est refermée <code>}</code>.' };
        if (!/if\s*\(/.test(ctx.code)) return { ok: false, message: 'Je ne trouve pas de <code>if</code>. Structure : <code>if (condition) { ... } else { ... }</code>' };
        if (!/else/.test(ctx.code)) return { ok: false, message: 'Il manque le <code>else</code> pour le cas « sinon ».' };
        if (/if\s*\(\s*age\s*=\s*[^=]/.test(ctx.code)) return { ok: false, message: 'Piège classique repéré : dans ta condition tu as écrit <code>=</code> (affectation) au lieu d\'une comparaison (<code>&gt;=</code>).' };
        const ageMatch = ctx.code.match(/let\s+age\s*=\s*(\d+)/);
        const age = ageMatch ? parseInt(ageMatch[1]) : 16;
        const attendu = age >= 18 ? 'autorisée' : 'refusée';
        const inverse = age >= 18 ? 'refusée' : 'autorisée';
        const sortie = ctx.logs.join(' ').toLowerCase();
        if (sortie.includes(inverse.toLowerCase()) && !sortie.includes(attendu.toLowerCase())) return { ok: false, message: 'Ta condition est à l\'envers : avec age = ' + age + ', le programme devrait afficher « Entrée ' + attendu + ' ».' };
        if (!sortie.includes(attendu.toLowerCase())) return { ok: false, message: 'Avec age = ' + age + ', le programme devrait afficher « Entrée ' + attendu + ' ».' };
        return { ok: true, message: 'Ton programme sait prendre des décisions. C\'est un cap énorme.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : positif, négatif ou nul ?</strong> La variable <code>nombre</code> vaut <code>-7</code>. Écris une chaîne <code>if / else if / else</code> qui affiche <code>Positif</code> si le nombre est &gt; 0, <code>Négatif</code> s\'il est &lt; 0, et <code>Zéro</code> sinon. Teste les trois cas en changeant la valeur !',
      codeDepart: 'let nombre = -7;\n\n// if / else if / else\n',
      indices: [
        "Trois cas, donc trois branches. Mais « zéro » n’a pas besoin d’être testé : c’est le seul cas qui reste quand les deux autres ont échoué.",
        "Après le premier <code>if</code>, on enchaîne avec <code>else if</code> pour le deuxième cas, puis un <code>else</code> nu pour tout le reste.",
        "<code>if (nombre &gt; 0) { … } else if (nombre &lt; 0) { … } else { … }</code>"
      ],
      solution: 'let nombre = -7;\n\nif (nombre > 0) {\n  console.log("Positif");\n} else if (nombre < 0) {\n  console.log("Négatif");\n} else {\n  console.log("Zéro");\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const m = ctx.code.match(/let\s+nombre\s*=\s*(-?\d+)/);
        const n = m ? parseInt(m[1]) : -7;
        const attendu = n > 0 ? 'positif' : (n < 0 ? 'négatif' : 'zéro');
        const sortie = ctx.logs.join(' ').toLowerCase();
        if (ctx.logs.length !== 1) return { ok: false, message: 'Un seul message doit s\'afficher (le bon !) — actuellement il y en a ' + ctx.logs.length + '. C\'est tout l\'intérêt du else if : un seul chemin est pris.' };
        if (!sortie.includes(attendu.normalize('NFD').replace(/[̀-ͯ]/g, '')) && !sortie.includes(attendu)) return { ok: false, message: 'Avec nombre = ' + n + ', l\'affichage attendu est « ' + attendu.charAt(0).toUpperCase() + attendu.slice(1) + ' ».' };
        return { ok: true, message: 'Trois chemins possibles, un seul emprunté : la logique conditionnelle est en place.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : le digicode.</strong> La variable <code>codeSecret</code> vaut <code>"4271"</code> et <code>codeTape</code> vaut <code>"1234"</code>. Compare-les avec <code>===</code> : affiche <code>Porte ouverte</code> s\'ils sont identiques, sinon affiche <code>Code incorrect</code> ET la phrase <code>Il y avait 4 chiffres à trouver</code> en calculant le nombre de chiffres avec <code>.length</code> (pas écrit à la main !).',
      codeDepart: 'let codeSecret = "4271";\nlet codeTape = "1234";\n',
      indices: [
        "Comparer deux valeurs ne s’écrit pas avec un seul <code>=</code> : celui-là <em>range</em> une valeur. Pour comparer, il en faut trois.",
        "Dans le <code>else</code>, il y a <strong>deux</strong> choses à afficher, donc deux <code>console.log</code> dans les mêmes accolades. La longueur du code s’obtient avec <code>.length</code>.",
        "<code>if (codeTape === codeSecret)</code>, et dans le <code>else</code> une phrase avec <code>${codeSecret.length}</code>."
      ],
      solution: 'let codeSecret = "4271";\nlet codeTape = "1234";\n\nif (codeTape === codeSecret) {\n  console.log("Porte ouverte");\n} else {\n  console.log("Code incorrect");\n  console.log(`Il y avait ${codeSecret.length} chiffres à trouver`);\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/===/.test(ctx.code)) return { ok: false, message: 'La comparaison doit utiliser le triple égal <code>===</code> — le réflexe à prendre dès maintenant.' };
        const secret = (ctx.code.match(/codeSecret\s*=\s*["'`]([^"'`]*)/) || [])[1] || '4271';
        const tape = (ctx.code.match(/codeTape\s*=\s*["'`]([^"'`]*)/) || [])[1] || '1234';
        const sortie = ctx.logs.join(' | ');
        if (secret === tape) {
          if (!/porte ouverte/i.test(sortie)) return { ok: false, message: 'Les deux codes sont identiques : « Porte ouverte » devrait s\'afficher.' };
        } else {
          if (!/code incorrect/i.test(sortie)) return { ok: false, message: 'Les codes sont différents : « Code incorrect » devrait s\'afficher.' };
          if (!sortie.includes(String(secret.length))) return { ok: false, message: 'Il manque la phrase avec le nombre de chiffres, calculé avec <code>codeSecret.length</code> (pas écrit à la main).' };
        }
        return { ok: true, message: 'Conditions + méthodes de texte combinées : tu commences à assembler tes outils, comme un vrai développeur.' };
      }
    }
  ]
},

{
  id: 'js-6',
  titre: 'Conditions avancées : et, ou, sinon si',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>La vraie vie a rarement deux cas seulement. Un tarif dépend de plusieurs tranches d'âge, une mention de plusieurs seuils de notes. Et une décision dépend souvent de plusieurs critères à la fois : on entre au concert si on est majeur <em>et</em> qu'on a un billet ; c'est le week-end si on est samedi <em>ou</em> dimanche. Cette leçon donne les deux outils pour ça : les chaînes <code>else if</code>, et les mots « et » et « ou » du JavaScript.</p>

<h2>Enchaîner les cas : else if</h2>
<pre class="bloc-code">let note = 14;

if (note >= 16) {
  console.log("Très bien");
} else if (note >= 12) {
  console.log("Bien");
} else if (note >= 10) {
  console.log("Passable");
} else {
  console.log("Insuffisant");
}</pre>
<p>Le programme teste les conditions <strong>dans l'ordre</strong> et exécute le <strong>premier</strong> bloc dont la condition est vraie. Puis il ignore tout le reste de la chaîne, même les conditions qui auraient aussi été vraies.</p>

<h2>Pas à pas</h2>
<p>Avec <code>note</code> qui vaut 14 :</p>
<table class="memo-table trace">
<tr><th>Test</th><th>Résultat</th><th>Ce qui se passe</th></tr>
<tr><td>note &gt;= 16</td><td><code>false</code></td><td>on passe au test suivant</td></tr>
<tr><td>note &gt;= 12</td><td><code>true</code></td><td>« Bien » s'affiche</td></tr>
<tr><td>note &gt;= 10</td><td>jamais testé</td><td>la chaîne est terminée : un bloc a déjà été choisi</td></tr>
</table>

<h2>Combiner des conditions : ET, OU</h2>
<pre class="bloc-code">// && signifie ET : les DEUX conditions doivent être vraies
if (age >= 18 &amp;&amp; aBillet) {
  console.log("Bienvenue au concert !");
}

// || signifie OU : AU MOINS UNE doit être vraie
if (jour === "samedi" || jour === "dimanche") {
  console.log("C'est le week-end !");
}</pre>
<ul>
<li><code>&amp;&amp;</code> : « et » (deux esperluettes, <kbd>&amp;</kbd> deux fois) ;</li>
<li><code>||</code> : « ou » (deux barres verticales ; sur Windows, <kbd>AltGr + 6</kbd>).</li>
</ul>
<p>Le cas le plus courant : vérifier qu'une valeur est <strong>entre deux bornes</strong>. « L'âge est entre 6 et 17 inclus » s'écrit <code>age >= 6 &amp;&amp; age &lt;= 17</code> : deux comparaisons, reliées par un ET.</p>

<h2>Les pièges</h2>
<p><strong>Le mauvais ordre dans la chaîne.</strong> Si le test <code>note >= 10</code> vient en premier, une note de 18 le passe déjà : elle affiche « Passable », et « Très bien » n'est jamais atteint. Dans une chaîne de seuils, on commence par le plus exigeant.</p>
<p><strong>Le OU raccourci.</strong> <code>jour === "samedi" || "dimanche"</code> a l'air de dire « samedi ou dimanche », mais c'est toujours vrai, même un lundi : la partie droite, <code>"dimanche"</code> tout seul, est un texte non vide, que JavaScript considère comme vrai. Chaque côté du <code>||</code> doit être une comparaison complète.</p>
<p><strong>ET à la place de OU.</strong> <code>jour === "samedi" &amp;&amp; jour === "dimanche"</code> n'est jamais vrai : un jour ne peut pas être les deux à la fois. Relis ta condition à voix haute en remplaçant <code>&amp;&amp;</code> par « et » et <code>||</code> par « ou » : si la phrase est absurde, le code l'est aussi.</p>

<h2>Dans la vraie vie</h2>
<p>« Livraison gratuite dès 50 € d'achat en France métropolitaine » : c'est un ET entre un montant et une destination. « Accès réservé aux administrateurs ou au propriétaire de la page » : un OU. Les grilles de tarifs, les frais de port et les droits d'accès sont faits de ces chaînes et de ces combinaisons.</p>

<div class="a-retenir">
<ul>
<li><code>else if</code> teste dans l'ordre et s'arrête au premier cas vrai : on commence par le seuil le plus exigeant.</li>
<li><code>&amp;&amp;</code> = les deux vraies ; <code>||</code> = au moins une vraie.</li>
<li>Chaque côté d'un <code>&amp;&amp;</code> ou d'un <code>||</code> est une comparaison complète.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le NON</summary>
<p>Le point d'exclamation inverse une condition : <code>!ilPleut</code> vaut <code>true</code> quand <code>ilPleut</code> vaut <code>false</code>. <code>if (!ilPleut)</code> se lit « s'il ne pleut pas », et dit la même chose que <code>if (ilPleut === false)</code>, en plus court. Quand une condition devient longue, rien n'interdit des parenthèses pour la rendre lisible : <code>(age >= 18 &amp;&amp; aBillet) || estInvite</code>.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Météo intelligente : avec les variables <code>temperature</code> et <code>ilPleut</code>, écris des conditions qui affichent <code>Sortie parc</code> s\'il fait plus de 20 degrés ET qu\'il ne pleut pas (<code>ilPleut === false</code>), <code>Cinéma</code> s\'il pleut, et <code>Balade</code> dans tous les autres cas.',
      codeDepart: 'let temperature = 25;\nlet ilPleut = false;\n\n// Tes conditions ici\n',
      indices: [
        "Le premier cas demande <strong>deux</strong> conditions vraies en même temps. Les suivants n’en demandent qu’une.",
        "« Et en même temps » s’écrit <code>&amp;&amp;</code>. Les deux conditions tiennent dans les mêmes parenthèses, de part et d’autre.",
        "<code>if (temperature &gt; 20 &amp;&amp; ilPleut === false) { … } else if (ilPleut) { … } else { … }</code>"
      ],
      solution: 'let temperature = 25;\nlet ilPleut = false;\n\nif (temperature > 20 && ilPleut === false) {\n  console.log("Sortie parc");\n} else if (ilPleut) {\n  console.log("Cinéma");\n} else {\n  console.log("Balade");\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/&&/.test(ctx.code)) return { ok: false, message: 'Ta première condition doit combiner température ET pluie avec l\'opérateur <code>&&</code>.' };
        if (!/else\s+if/.test(ctx.code)) return { ok: false, message: 'Il faut trois cas, donc au moins un <code>else if</code>.' };
        const tMatch = ctx.code.match(/let\s+temperature\s*=\s*(-?\d+)/);
        const pMatch = ctx.code.match(/let\s+ilPleut\s*=\s*(true|false)/);
        const t = tMatch ? parseInt(tMatch[1]) : 25;
        const p = pMatch ? pMatch[1] === 'true' : false;
        const attendu = (t > 20 && !p) ? 'parc' : (p ? 'cinema' : 'balade');
        const sortie = ctx.logs.join(' ').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        if (!sortie.includes(attendu)) return { ok: false, message: 'Avec temperature = ' + t + ' et ilPleut = ' + p + ', le bon affichage serait « ' + (attendu === 'parc' ? 'Sortie parc' : attendu === 'cinema' ? 'Cinéma' : 'Balade') + ' ». Vérifie l\'ordre et la logique de tes conditions.' };
        return { ok: true, message: 'ET, OU, SINON SI : tu sais exprimer une vraie logique. Change les valeurs de départ pour tester les trois cas !' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : les mentions du bac.</strong> La variable <code>note</code> vaut 13. Écris la chaîne complète : ≥ 16 → <code>Mention très bien</code>, ≥ 14 → <code>Mention bien</code>, ≥ 12 → <code>Mention assez bien</code>, ≥ 10 → <code>Admis</code>, sinon → <code>Rattrapage</code>. L\'ordre des conditions est crucial !',
      codeDepart: 'let note = 13;\n',
      indices: [
        "Cinq cas, et l’ordre décide de tout. Demande-toi ce qui arriverait à un 17 si tu testais d’abord « au moins 10 ».",
        "Un <code>else if</code> n’est examiné que si tous les précédents ont échoué. Il faut donc commencer par le seuil le <strong>plus haut</strong> et descendre.",
        "<code>if (note &gt;= 16)</code>, puis <code>else if (note &gt;= 14)</code>, <code>&gt;= 12</code>, <code>&gt;= 10</code>, et un <code>else</code> pour le rattrapage."
      ],
      solution: 'let note = 13;\n\nif (note >= 16) {\n  console.log("Mention très bien");\n} else if (note >= 14) {\n  console.log("Mention bien");\n} else if (note >= 12) {\n  console.log("Mention assez bien");\n} else if (note >= 10) {\n  console.log("Admis");\n} else {\n  console.log("Rattrapage");\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const m = ctx.code.match(/let\s+note\s*=\s*(\d+)/);
        const n = m ? parseInt(m[1]) : 13;
        const attendu = n >= 16 ? 'très bien' : n >= 14 ? 'mention bien' : n >= 12 ? 'assez bien' : n >= 10 ? 'admis' : 'rattrapage';
        if (ctx.logs.length !== 1) return { ok: false, message: 'Un seul message doit s\'afficher (il y en a ' + ctx.logs.length + '). Enchaîne avec <code>else if</code>, pas des <code>if</code> séparés !' };
        const sortie = ctx.logs[0].toLowerCase();
        if (!sortie.includes(attendu)) return { ok: false, message: 'Avec note = ' + n + ', l\'affichage attendu contient « ' + attendu + ' » (obtenu : « ' + ctx.logs[0] + ' »). Vérifie l\'ordre : du seuil le plus haut au plus bas.' };
        return { ok: true, message: 'L\'ordre des else if est une vraie subtilité — tu l\'as comprise. Change la note pour vérifier chaque mention !' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : le tarif du musée.</strong> Gratuit si <code>age < 6</code> OU <code>age >= 65</code> → affiche <code>Gratuit</code>. Demi-tarif si l\'âge est entre 6 et 17 inclus → affiche <code>5 euros</code>. Sinon plein tarif → <code>10 euros</code>. Utilise <code>||</code> pour le premier cas. Teste avec plusieurs âges !',
      codeDepart: 'let age = 70;\n',
      indices: [
        "La gratuité couvre deux tranches d’âge opposées — les très jeunes et les plus âgés. C’est un « ou », pas un « et ».",
        "« Ou » s’écrit <code>||</code>. Et pour le demi-tarif, inutile de retester la borne basse : le premier cas a déjà écarté les moins de 6 ans.",
        "<code>if (age &lt; 6 || age &gt;= 65) { … } else if (age &lt;= 17) { … } else { … }</code>"
      ],
      solution: 'let age = 70;\n\nif (age < 6 || age >= 65) {\n  console.log("Gratuit");\n} else if (age <= 17) {\n  console.log("5 euros");\n} else {\n  console.log("10 euros");\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/\|\|/.test(ctx.code)) return { ok: false, message: 'Le cas « Gratuit » regroupe deux situations (très jeune OU senior) : utilise l\'opérateur <code>||</code>.' };
        const m = ctx.code.match(/let\s+age\s*=\s*(\d+)/);
        const a = m ? parseInt(m[1]) : 70;
        const attendu = (a < 6 || a >= 65) ? 'gratuit' : (a <= 17 ? '5' : '10');
        const sortie = ctx.logs.join(' ').toLowerCase();
        if (!sortie.includes(attendu)) return { ok: false, message: 'Avec age = ' + a + ', l\'affichage attendu est « ' + (attendu === 'gratuit' ? 'Gratuit' : attendu + ' euros') + ' ». Relis ta logique à voix haute avec « ou » et « sinon si ».' };
        return { ok: true, message: 'Cette grille tarifaire, c\'est EXACTEMENT le genre de logique qu\'on code tous les jours en entreprise. Tu es prêt pour les boucles !' };
      }
    }
  ]
},

];
