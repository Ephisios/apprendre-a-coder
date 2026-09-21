/* ===== Module JavaScript — partie 1 (leçons 1 à 6) ===== */
window.DATA_JS1 = [

{
  id: 'js-1',
  titre: 'Ton premier programme',
  contenu: `
<p>Bienvenue dans le grand bain : le <strong>JavaScript</strong> est un vrai langage de programmation — celui qui anime la quasi-totalité des sites web, et le plus utilisé au monde. Tout ce que tu vas apprendre ici (variables, conditions, boucles, fonctions) existe dans <em>tous</em> les autres langages.</p>

<h2>Afficher quelque chose : console.log</h2>
<p>Le premier outil de tout programmeur, c'est afficher un message pour voir ce que fait son programme :</p>
<pre class="bloc-code">console.log("Bonjour tout le monde !");</pre>
<ul>
<li><code>console.log(...)</code> — une <strong>instruction</strong> qui affiche ce qu'on lui donne dans la « console » (chez nous : le cadre de résultat noir en bas) ;</li>
<li><code>"Bonjour tout le monde !"</code> — un texte, toujours entouré de <strong>guillemets</strong> ;</li>
<li><code>;</code> — le point-virgule termine l'instruction, comme un point termine une phrase.</li>
</ul>

<h2>Un programme = des instructions dans l'ordre</h2>
<pre class="bloc-code">console.log("Première ligne");
console.log("Deuxième ligne");
console.log("Troisième ligne");</pre>
<p>L'ordinateur exécute les instructions <strong>de haut en bas, une par une</strong>. Ça paraît évident, mais c'est le principe de base de toute la programmation.</p>

<div class="attention">⚠️ Le JavaScript est pointilleux : <code>console.log</code> s'écrit exactement comme ça (tout attaché, en minuscules, avec le point). <code>Console.Log</code> ou <code>console log</code> provoquent une erreur. Si ça arrive : lis le message d'erreur, il t'indique le problème — c'est ton allié, pas ton ennemi.</div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Écris un programme qui affiche <strong>trois messages</strong> à la suite avec <code>console.log</code> : d\'abord <code>Bonjour</code>, puis <code>je m\'appelle</code> suivi de ton prénom, puis <code>et j\'apprends le JavaScript</code>.',
      codeDepart: 'console.log("Bonjour");\n',
      indice: 'Ajoute deux lignes de plus sur le même modèle : <code>console.log("...");</code> — n\'oublie ni les guillemets ni les parenthèses.',
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
      indice: 'Erreur 1 : la majuscule à <code>Console</code> (JavaScript veut tout en minuscules). Erreur 2 : le texte de la 2e ligne n\'a pas de guillemets autour de lui.',
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
      indice: 'Quatre <code>console.log</code>, un par ligne. Attention : les caractères sont à recopier exactement (le / la barre \\ et les espaces).',
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
<p>Un programme a besoin de retenir des choses : un score, un prénom, un prix... C'est le rôle des <strong>variables</strong> — la notion la plus fondamentale de toute la programmation.</p>

<h2>Créer une variable</h2>
<pre class="bloc-code">let prenom = "Camille";
let age = 28;

console.log(prenom);   // affiche : Camille
console.log(age);      // affiche : 28</pre>
<ul>
<li><code>let</code> — le mot-clé qui crée une variable (<em>let</em> = « soit... ») ;</li>
<li><code>prenom</code> — le <strong>nom</strong> qu'on lui choisit (sans espaces ni accents ; pour un nom composé on colle les mots : <code>scoreJoueur</code>) ;</li>
<li><code>=</code> — l'<strong>affectation</strong> : « range cette valeur dans cette boîte » ;</li>
<li>la valeur : un texte entre guillemets, ou un nombre <strong>sans</strong> guillemets.</li>
</ul>
<p>Une fois créée, on utilise la variable par son nom, <strong>sans guillemets</strong>. Remarque aussi le <code>//</code> : tout ce qui le suit sur la ligne est un <strong>commentaire</strong>, ignoré par l'ordinateur.</p>

<h2>Une variable peut... varier</h2>
<pre class="bloc-code">let score = 0;
console.log(score);   // 0
score = 10;           // on change la valeur (plus besoin de let)
console.log(score);   // 10</pre>

<h2>let ou const ?</h2>
<p>Pour une valeur qui ne changera <strong>jamais</strong>, on utilise <code>const</code> (constante) au lieu de <code>let</code>. Le réflexe des pros : <code>const</code> par défaut, <code>let</code> seulement si la valeur doit changer.</p>

<div class="attention">⚠️ Piège classique : <code>console.log("score")</code> affiche le mot « score », alors que <code>console.log(score)</code> affiche le <em>contenu</em> de la variable. Guillemets = texte littéral ; sans guillemets = variable.</div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Crée une variable <code>animal</code> contenant le nom d\'un animal, et une variable <code>pattes</code> contenant son nombre de pattes (un nombre). Affiche ensuite les deux avec <code>console.log</code>.',
      codeDepart: '// Crée tes deux variables ici\n\n// Puis affiche-les ici\n',
      indice: 'Modèle : <code>let animal = "chat";</code> puis <code>let pattes = 4;</code> (nombre sans guillemets), puis <code>console.log(animal);</code> et <code>console.log(pattes);</code>',
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
      indice: 'Problème 1 : les guillemets dans les <code>console.log</code> affichent le MOT au lieu de la variable. Problème 2 : on ne remet pas <code>let</code> pour modifier une variable qui existe déjà (ça provoque une erreur !).',
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
      indice: 'Comme dans la vraie vie : verse A dans un verre vide (<code>let temporaire = verreA;</code>), puis B dans A (<code>verreA = verreB;</code>), puis le verre temporaire dans B (<code>verreB = temporaire;</code>).',
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
<p>Un ordinateur, à la base, c'est une machine à calculer. Autant en profiter.</p>

<h2>Les opérateurs</h2>
<pre class="bloc-code">console.log(5 + 3);   // 8   addition
console.log(10 - 4);  // 6   soustraction
console.log(6 * 7);   // 42  multiplication (l'étoile)
console.log(20 / 5);  // 4   division (la barre)
console.log(10 % 3);  // 1   le RESTE de la division (10 = 3×3, reste 1)</pre>
<p>Le <code>%</code> (« modulo ») surprend au début, mais il est très utile : par exemple, <code>n % 2</code> vaut 0 si <code>n</code> est pair. Retiens juste qu'il existe.</p>

<h2>Calculer avec des variables</h2>
<p>Toute la puissance vient de là : les calculs marchent avec les variables, et on peut ranger un résultat dans une nouvelle variable.</p>
<pre class="bloc-code">let prixArticle = 25;
let quantite = 3;
let total = prixArticle * quantite;

console.log(total);   // 75</pre>

<h2>Modifier une variable existante</h2>
<pre class="bloc-code">let score = 100;
score = score + 50;   // on prend l'ancienne valeur, on ajoute 50
console.log(score);   // 150
score += 10;          // raccourci pour : score = score + 10
console.log(score);   // 160</pre>

<div class="info">💬 <code>score = score + 50</code> choque les matheux, mais en programmation <code>=</code> ne signifie pas « est égal à » : il signifie « range la valeur de droite dans la variable de gauche ». On calcule d'abord la droite, puis on range.</div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Une pizzeria ! Crée <code>prixPizza</code> valant <code>12</code> et <code>nombrePizzas</code> valant <code>4</code>. Calcule le total dans une variable <code>total</code>, puis ajoute <code>3</code> au total pour la livraison. Affiche le total final (il doit valoir 51).',
      codeDepart: '// La commande de pizzas\n',
      indice: '<code>let total = prixPizza * nombrePizzas;</code> puis <code>total = total + 3;</code> (ou <code>total += 3;</code>), puis affiche.',
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
      indice: 'Sans parenthèses, <code>note1 + note2 + note3 / 3</code> divise SEULEMENT note3 (priorité des opérations, comme à l\'école). Il faut : <code>(note1 + note2 + note3) / 3</code>',
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
      indice: '<code>let heures = Math.floor(totalMinutes / 60);</code> puis <code>let minutes = totalMinutes % 60;</code> — 135 = 2×60 + 15, donc le reste de la division par 60 est 15.',
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
<p>En programmation, un texte s'appelle une <strong>chaîne de caractères</strong> (<em>string</em>). Tu sais déjà les écrire entre guillemets — voyons comment les manipuler.</p>

<h2>Coller des textes ensemble</h2>
<p>Le <code>+</code> entre deux textes les colle (on dit « concaténer ») :</p>
<pre class="bloc-code">let prenom = "Camille";
console.log("Bonjour " + prenom + " !");   // Bonjour Camille !</pre>
<p>Attention aux espaces : ils ne s'ajoutent pas tout seuls, il faut les mettre dans les guillemets (<code>"Bonjour&nbsp;"</code>).</p>

<h2>La méthode moderne : les backticks</h2>
<p>Il existe une troisième sorte de guillemets : les <strong>accents graves</strong> <code>\`...\`</code> (backticks — sur Windows : <kbd>AltGr + 7</kbd>, puis une lettre ou espace). Leur superpouvoir : insérer une variable directement dans le texte avec <code>\${...}</code> :</p>
<pre class="bloc-code">let prenom = "Camille";
let age = 28;
console.log(\`Bonjour \${prenom}, tu as \${age} ans.\`);
// Bonjour Camille, tu as 28 ans.</pre>
<p>Plus lisible, moins d'erreurs d'espaces : c'est la méthode préférée des développeurs aujourd'hui. Les deux façons restent correctes.</p>

<h2>Quelques outils sur les textes</h2>
<pre class="bloc-code">let ville = "Marseille";
console.log(ville.length);          // 9  (nombre de caractères)
console.log(ville.toUpperCase());   // MARSEILLE
console.log(ville.toLowerCase());   // marseille</pre>
<p>Ces « outils attachés » aux valeurs par un point s'appellent des <strong>méthodes</strong>. Tu en connais déjà une sans le savoir : <code>log</code> est une méthode de <code>console</code> !</p>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Crée une variable <code>ville</code> avec le nom d\'une ville. Affiche la phrase <code>J\'habite à [ville]</code> (avec la variable dedans, par la méthode de ton choix), puis affiche le nom de la ville en MAJUSCULES.',
      codeDepart: 'let ville = "Paris";\n',
      indice: 'Phrase : <code>console.log("J\'habite à " + ville);</code> ou avec backticks. Majuscules : <code>console.log(ville.toUpperCase());</code>',
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
      indice: 'Le modèle : <code>console.log(\`\${nom} a \${age} ans et pèse \${poids} kilos.\`);</code> — backticks AltGr+7, et chaque variable dans son <code>\${...}</code>.',
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
      indice: '<code>motDePasse.length</code> donne la longueur (sans parenthèses !), <code>motDePasse.toLowerCase()</code> les minuscules (avec parenthèses). La phrase : backticks + <code>\${motDePasse.length}</code>.',
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
<p>Jusqu'ici, tes programmes exécutent toujours tout, dans l'ordre. Les <strong>conditions</strong> leur apprennent à <strong>choisir</strong> : « SI il pleut, prends un parapluie, SINON prends des lunettes de soleil ».</p>

<h2>La structure if / else</h2>
<pre class="bloc-code">let age = 20;

if (age >= 18) {
  console.log("Tu es majeur");
} else {
  console.log("Tu es mineur");
}</pre>
<ul>
<li><code>if (condition) { ... }</code> — <strong>si</strong> la condition est vraie, exécute ce qui est entre les accolades ;</li>
<li><code>else { ... }</code> — <strong>sinon</strong>, exécute cet autre bloc (optionnel).</li>
</ul>

<h2>Les comparaisons</h2>
<pre class="bloc-code">a === b    // a est égal à b        (OUI, trois signes =)
a !== b    // a est différent de b
a > b      // a est plus grand que b
a >= b     // plus grand ou égal
a < b      // plus petit
a <= b     // plus petit ou égal</pre>

<div class="attention">⚠️ LE piège n°1 du JavaScript : <code>=</code> range une valeur dans une variable, alors que <code>===</code> compare deux valeurs. Dans un <code>if</code>, c'est toujours <code>===</code> qu'il faut. (Tu croiseras aussi <code>==</code> à deux signes : il existe, mais il a des comportements surprenants — prends l'habitude du <code>===</code>.)</div>

<h2>Une condition, ça se lit</h2>
<pre class="bloc-code">let temperature = 30;

if (temperature > 25) {
  console.log("Il fait chaud !");
}</pre>
<p>« Si la température dépasse 25, affiche "Il fait chaud !" » — le code bien écrit se lit presque comme une phrase.</p>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Un contrôle d\'accès : la variable <code>age</code> vaut 16. Écris un <code>if/else</code> qui affiche <code>Entrée autorisée</code> si l\'âge est supérieur ou égal à 18, et <code>Entrée refusée</code> sinon. Puis change la valeur de <code>age</code> pour vérifier que les deux cas marchent !',
      codeDepart: 'let age = 16;\n\n// Ton if/else ici\n',
      indice: 'Modèle : <code>if (age >= 18) { console.log("..."); } else { console.log("..."); }</code>',
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
      indice: '<code>if (nombre > 0) { ... } else if (nombre < 0) { ... } else { ... }</code> — le dernier else attrape le seul cas restant : zéro.',
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
      indice: '<code>if (codeTape === codeSecret) { ... } else { ... }</code> — et dans le else, deux console.log, dont un avec <code>\${codeSecret.length}</code>.',
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
<h2>Enchaîner les cas : else if</h2>
<p>Quand il y a plus de deux possibilités, on enchaîne avec <code>else if</code> (« sinon, si... ») :</p>
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
<p>Le programme teste les conditions <strong>dans l'ordre</strong> et exécute le <strong>premier</strong> bloc dont la condition est vraie — puis ignore tout le reste. Ici : 14 &lt; 16, mais 14 ≥ 12 → « Bien ».</p>

<h2>Combiner des conditions : ET, OU</h2>
<pre class="bloc-code">// && signifie ET : les DEUX conditions doivent être vraies
if (age >= 18 && aBillet) {
  console.log("Bienvenue au concert !");
}

// || signifie OU : AU MOINS UNE doit être vraie
if (jour === "samedi" || jour === "dimanche") {
  console.log("C'est le week-end !");
}</pre>
<ul>
<li><code>&amp;&amp;</code> — « et » (les deux esperluettes : <kbd>&amp;</kbd> deux fois) ;</li>
<li><code>||</code> — « ou » (deux barres verticales : sur Windows, <kbd>AltGr + 6</kbd>).</li>
</ul>

<div class="astuce">✅ Astuce de lecture : remplace mentalement <code>&&</code> par « et » et <code>||</code> par « ou », et relis ta condition à voix haute. Si la phrase est logique, le code l'est probablement aussi.</div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Météo intelligente : avec les variables <code>temperature</code> et <code>ilPleut</code>, écris des conditions qui affichent <code>Sortie parc</code> s\'il fait plus de 20 degrés ET qu\'il ne pleut pas (<code>ilPleut === false</code>), <code>Cinéma</code> s\'il pleut, et <code>Balade</code> dans tous les autres cas.',
      codeDepart: 'let temperature = 25;\nlet ilPleut = false;\n\n// Tes conditions ici\n',
      indice: 'Structure : <code>if (temperature > 20 && ilPleut === false) { ... } else if (ilPleut) { ... } else { ... }</code>',
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
      indice: 'Commence par le seuil le PLUS HAUT (16) et descends. Si tu testais <code>note >= 10</code> en premier, un 17 serait attrapé par ce cas et n\'irait jamais plus loin !',
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
      indice: 'Premier cas : <code>if (age < 6 || age >= 65)</code>. Deuxième : <code>else if (age <= 17)</code> — pas besoin de retester age >= 6, le premier cas a déjà éliminé les moins de 6 ans !',
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
