/* ===== Module JavaScript — partie 2 (leçons 7 à 12) ===== */
window.DATA_JS2 = [

{
  id: 'js-7',
  titre: 'Les boucles : répéter sans se fatiguer',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Afficher les nombres de 1 à 1000 ? Hors de question d'écrire 1000 lignes. Envoyer un message à chaque membre d'un groupe, vérifier chaque case d'une grille, additionner chaque article d'un panier : dès qu'il faut <strong>répéter</strong>, on écrit une <strong>boucle</strong>. C'est là que l'ordinateur devient vraiment plus fort que nous : il répète un million de fois sans se lasser ni se tromper.</p>

<h2>La boucle for</h2>
<pre class="bloc-code">for (let i = 1; i &lt;= 5; i++) {
  console.log("Tour numéro " + i);
}</pre>
<p>Résultat : « Tour numéro 1 », « Tour numéro 2 »… jusqu'à 5. La parenthèse contient trois parties, séparées par des points-virgules :</p>
<ol>
<li><code>let i = 1</code> : le <strong>départ</strong>. On crée un compteur <code>i</code> qui commence à 1 ;</li>
<li><code>i &lt;= 5</code> : la <strong>condition pour continuer</strong>. Tant qu'elle est vraie, on refait un tour ;</li>
<li><code>i++</code> : ce qui se passe <strong>après chaque tour</strong>. <code>i++</code> est le raccourci de <code>i = i + 1</code>.</li>
</ol>
<p>Le compteur s'appelle traditionnellement <code>i</code>, et il est utilisable dans la boucle : c'est ce qui rend chaque tour différent. Il peut aussi descendre : <code>for (let i = 10; i >= 1; i--)</code> compte à rebours, avec <code>i--</code> qui retire 1.</p>

<h2>La boucle while</h2>
<p>Quand on ne sait pas d'avance combien de tours il faudra, <code>while</code> (« tant que ») répète tant que sa condition est vraie :</p>
<pre class="bloc-code">let energie = 10;
while (energie > 0) {
  console.log("Je cours ! Énergie : " + energie);
  energie = energie - 3;
}</pre>
<p>Ici : 10, 7, 4, 1, puis <code>energie</code> passe à -2 et la boucle s'arrête. Combien de tours ? On ne l'a écrit nulle part : c'est la condition qui décide.</p>

<h2>Le motif « accumulateur »</h2>
<p>Très souvent, une boucle sert à <strong>accumuler</strong> un résultat dans une variable créée <em>avant</em> la boucle :</p>
<pre class="bloc-code">let total = 0;
for (let i = 1; i &lt;= 4; i++) {
  total = total + i;      // ou : total += i;
}
console.log(total);       // 10</pre>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>i</th><th>i &lt;= 4 ?</th><th>total avant</th><th>total après</th></tr>
<tr><td>1</td><td>oui</td><td>0</td><td>0 + 1 = 1</td></tr>
<tr><td>2</td><td>oui</td><td>1</td><td>1 + 2 = 3</td></tr>
<tr><td>3</td><td>oui</td><td>3</td><td>3 + 3 = 6</td></tr>
<tr><td>4</td><td>oui</td><td>6</td><td>6 + 4 = 10</td></tr>
<tr><td>5</td><td>non</td><td colspan="2">la boucle s'arrête ; la ligne suivante affiche 10</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>La boucle infinie.</strong> Si la condition d'un <code>while</code> ne devient jamais fausse (par exemple si on oublie de diminuer <code>energie</code>), la boucle tourne pour toujours. Pas de panique : l'éditeur l'arrête et affiche « ton code tourne sans s'arrêter (boucle infinie ?). Vérifie la condition de ta boucle. » Vérifie que quelque chose, dans la boucle, rapproche la condition de <code>false</code>.</p>
<p><strong>Un tour de trop, ou de moins.</strong> <code>i &lt; 5</code> en partant de 1 fait 4 tours (1, 2, 3, 4) ; <code>i &lt;= 5</code> en fait 5. Quand un résultat est décalé de un, c'est presque toujours cette comparaison : déroule le premier et le dernier tour à la main.</p>
<p><strong>L'accumulateur au mauvais endroit.</strong> Si <code>let total = 0</code> est écrit <em>dans</em> la boucle, il est remis à zéro à chaque tour, et le total final ne vaut que le dernier ajout. De même, un <code>console.log(total)</code> placé dans la boucle affiche tous les totaux intermédiaires : pour le résultat final seul, il va <em>après</em> l'accolade fermante.</p>

<h2>Dans la vraie vie</h2>
<p>Afficher la liste de tes messages, c'est une boucle sur les messages. Une animation, c'est une boucle qui redessine l'image soixante fois par seconde. Une application qui perd le réseau réessaie de se connecter <em>tant que</em> la connexion échoue : c'est un <code>while</code>.</p>

<div class="a-retenir">
<ul>
<li><code>for (départ; condition; pas)</code> quand on connaît le nombre de tours ; <code>while (condition)</code> sinon.</li>
<li>Toute boucle doit faire évoluer ce que teste sa condition, sinon elle ne s'arrête jamais.</li>
<li>Accumulateur : la variable se crée avant la boucle, grandit dedans, s'affiche après.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le compteur n'existe que dans la boucle</summary>
<p>Le <code>i</code> déclaré dans la parenthèse du <code>for</code> n'existe que pendant la boucle. Écrire <code>console.log(i)</code> après l'accolade fermante donne « i is not defined ». C'est voulu : chaque boucle a son propre compteur, et deux boucles à la suite peuvent toutes les deux utiliser <code>i</code> sans se gêner. Si tu as besoin de la valeur après la boucle, crée la variable avant.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Écris le décompte d\'une fusée avec une boucle <code>for</code> : affiche les nombres de <code>5</code> à <code>1</code> (dans cet ordre décroissant !), puis, après la boucle, affiche <code>Décollage !</code>. Astuce : un compteur peut aussi descendre, avec <code>i--</code>.',
      codeDepart: '// Le compte à rebours\n',
      indices: [
        "Une boucle <code>for</code> a trois parties, séparées par des points-virgules : d’où l’on part, jusqu’où l’on va, et comment on avance. Ici, on ne monte pas : on descend.",
        "Départ à 5, condition « tant que <code>i</code> vaut au moins 1 », et un pas qui retire 1 à chaque tour. Le « Décollage ! » n’est affiché qu’une fois : il va donc après l’accolade fermante.",
        "<code>for (let i = 5; i &gt;= 1; i--) { … }</code> puis, en dehors, <code>console.log(\"Décollage !\");</code>"
      ],
      solution: 'for (let i = 5; i >= 1; i--) {\n  console.log(i);\n}\nconsole.log("Décollage !");',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'Il faut utiliser une boucle (<code>for</code>), pas écrire les 5 lignes à la main !' };
        const attendu = ['5', '4', '3', '2', '1'];
        const nombres = ctx.logs.filter(l => /^\d+$/.test(l.trim()));
        if (nombres.length === 0) return { ok: false, message: 'Ta boucle n\'affiche aucun nombre. Mets <code>console.log(i);</code> à l\'intérieur des accolades.' };
        if (nombres.join(',') === '1,2,3,4,5') return { ok: false, message: 'Ça compte dans le mauvais sens ! Pars de 5 (<code>let i = 5</code>), continue tant que <code>i >= 1</code>, et descends avec <code>i--</code>.' };
        if (nombres.join(',') !== attendu.join(',')) return { ok: false, message: 'Le décompte affiché est : ' + nombres.join(', ') + ' — attendu : 5, 4, 3, 2, 1. Vérifie le départ et la condition.' };
        if (!/décollage/i.test(ctx.logs.join(' '))) return { ok: false, message: 'Le décompte est parfait ! Il manque le <code>console.log("Décollage !")</code> APRÈS la boucle (après l\'accolade fermante).' };
        return { ok: true, message: '🚀 Et pense à la puissance : remplace 5 par 1000, et la boucle obéit sans effort.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : la tirelire.</strong> Chaque semaine pendant 8 semaines, tu mets ton numéro de semaine en euros dans la tirelire (1€ la semaine 1, 2€ la semaine 2...). Avec le motif accumulateur, calcule le total dans une variable <code>tirelire</code> et affiche-le APRÈS la boucle (résultat : 36).',
      codeDepart: 'let tirelire = 0;\n\n// La boucle des 8 semaines\n',
      indices: [
        "Le motif de l’accumulateur : une variable qui garde le total, déclarée <strong>avant</strong> la boucle — sinon elle repartirait de zéro à chaque tour.",
        "Dans la boucle, on ajoute le numéro de semaine au total : <code>tirelire += i;</code>. L’affichage vient après l’accolade fermante.",
        "<code>let tirelire = 0;</code> · <code>for (let i = 1; i &lt;= 8; i++) { tirelire += i; }</code> · puis l’affichage."
      ],
      solution: 'let tirelire = 0;\n\nfor (let i = 1; i <= 8; i++) {\n  tirelire += i;\n}\n\nconsole.log(tirelire);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'Le calcul doit passer par une boucle (imagine 52 semaines : pas question de tout écrire à la main).' };
        if (ctx.logs.length === 0) return { ok: false, message: 'Affiche le total avec <code>console.log(tirelire);</code> après la boucle.' };
        const dernier = ctx.logs[ctx.logs.length - 1];
        if (ctx.logs.length > 1 && ctx.logs.slice(0, -1).some(l => /^\d+$/.test(l))) return { ok: false, message: 'Le total s\'affiche à chaque tour : ton <code>console.log</code> est DANS la boucle. Déplace-le après l\'accolade fermante pour n\'afficher que le résultat final.' };
        if (dernier !== '36') return { ok: false, message: 'Le total affiché est ' + dernier + ' au lieu de 36 (1+2+3+4+5+6+7+8). Vérifie le départ (i = 1), la condition (i <= 8) et l\'accumulation (tirelire += i).' };
        return { ok: true, message: 'Le motif accumulateur (créer avant, remplir pendant, lire après) est un des schémas les plus utilisés de toute la programmation.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : la table de multiplication.</strong> Affiche la table de 7 complète avec une boucle et des backticks : dix lignes de la forme <code>7 x 1 = 7</code>, <code>7 x 2 = 14</code>... jusqu\'à <code>7 x 10 = 70</code>. Le calcul doit être fait par l\'ordinateur (<code>7 * i</code>), pas par toi !',
      codeDepart: '// La table de 7\n',
      indices: [
        "Une seule ligne de code, répétée dix fois avec une valeur qui change. Et le résultat doit être calculé, pas écrit à la main.",
        "Les accents graves permettent d’insérer plusieurs valeurs dans un même texte. L’une est le compteur, l’autre un <strong>calcul</strong> — on a le droit de calculer dans un <code>${…}</code>.",
        "<code>console.log(`7 x ${i} = ${7 * i}`);</code>"
      ],
      solution: 'for (let i = 1; i <= 10; i++) {\n  console.log(`7 x ${i} = ${7 * i}`);\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'Dix lignes = une boucle. C\'est la règle du jeu !' };
        if (ctx.logs.length < 10) return { ok: false, message: 'Il faut 10 lignes (tu en as ' + ctx.logs.length + '). Vérifie la condition : <code>i <= 10</code>.' };
        for (let i = 1; i <= 10; i++) {
          const attendu = '7 x ' + i + ' = ' + (7 * i);
          const ligne = ctx.logs[i - 1].replace(/\s+/g, ' ').trim().replace(/×|\*/g, 'x');
          if (ligne !== attendu) return { ok: false, message: 'La ligne ' + i + ' devrait être <code>' + attendu + '</code> (obtenu : <code>' + ctx.logs[i - 1].replace(/</g, '&lt;') + '</code>). Le format : <code>\`7 x \${i} = \${7 * i}\`</code>' };
        }
        return { ok: true, message: 'Boucle + interpolation + calcul dans le \${} : trois notions imbriquées sans effort. Tu peux générer la table de n\'importe quel nombre en changeant un chiffre.' };
      }
    }
  ]
},

{
  id: 'js-8',
  titre: 'Les tableaux : des listes de valeurs',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une variable stocke UNE valeur. Mais une liste de courses, les scores d'une partie, les contacts d'un téléphone ? Créer <code>contact1</code>, <code>contact2</code>… <code>contact500</code> serait absurde, et impossible à parcourir. Il nous faut une seule variable qui contient toute une liste, dans l'ordre : un <strong>tableau</strong> (<em>array</em>).</p>

<h2>Créer et lire un tableau</h2>
<pre class="bloc-code">let fruits = ["pomme", "banane", "cerise"];

console.log(fruits[0]);      // pomme
console.log(fruits[1]);      // banane
console.log(fruits.length);  // 3</pre>
<ul>
<li>les crochets <code>[ ]</code> créent le tableau ; les valeurs sont séparées par des virgules ;</li>
<li>chaque valeur a une position, appelée <strong>index</strong>. Et attention : <strong>on compte à partir de 0</strong>. <code>fruits[0]</code> est le premier élément ;</li>
<li><code>.length</code> donne le nombre d'éléments.</li>
</ul>
<p>Conséquence : le DERNIER élément est à l'index <code>length - 1</code>. Pour un tableau de 3 éléments, les index vont de 0 à 2. On l'écrit <code>fruits[fruits.length - 1]</code>, ce qui reste juste même si le tableau grandit.</p>

<h2>Modifier un tableau</h2>
<pre class="bloc-code">let fruits = ["pomme", "banane"];
fruits.push("cerise");        // ajoute à la fin
console.log(fruits);          // ["pomme","banane","cerise"]
fruits[0] = "poire";          // remplace le premier
console.log(fruits.length);   // 3</pre>
<p>Un tableau entier s'affiche entre crochets, ses textes entre guillemets : c'est ainsi que la console le montre.</p>

<h2>Le duo magique : tableau + boucle</h2>
<pre class="bloc-code">let invites = ["Léa", "Tom", "Nina"];

for (let i = 0; i &lt; invites.length; i++) {
  console.log("Bienvenue " + invites[i] + " !");
}</pre>
<p>Le compteur <code>i</code> sert d'index : il part de 0 et s'arrête juste avant <code>length</code>. Ce motif exact, tu l'écriras des centaines de fois.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>i</th><th>i &lt; 3 ?</th><th>invites[i]</th><th>Affichage</th></tr>
<tr><td>0</td><td>oui</td><td>"Léa"</td><td>Bienvenue Léa !</td></tr>
<tr><td>1</td><td>oui</td><td>"Tom"</td><td>Bienvenue Tom !</td></tr>
<tr><td>2</td><td>oui</td><td>"Nina"</td><td>Bienvenue Nina !</td></tr>
<tr><td>3</td><td>non</td><td>—</td><td>la boucle s'arrête</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Commencer à 1.</strong> <code>fruits[1]</code> est le <em>deuxième</em> fruit. Tout le monde s'y trompe au début ; ça devient vite une seconde nature.</p>
<p><strong>Lire après la fin.</strong> <code>fruits[fruits.length]</code> n'est pas le dernier élément : c'est une case qui n'existe pas, et JavaScript renvoie <code>undefined</code> (« non défini ») sans afficher d'erreur. De même, une boucle écrite avec <code>i &lt;= invites.length</code> fait un tour de trop et affiche « Bienvenue undefined ! ». Si tu vois <code>undefined</code>, cherche un index trop grand.</p>
<p><strong>Oublier que le tableau peut changer.</strong> Écrire <code>fruits[2]</code> pour « le dernier » marche… jusqu'au jour où on ajoute un fruit. <code>fruits[fruits.length - 1]</code> reste toujours juste. Même idée pour une moyenne : on divise par <code>length</code>, pas par un nombre écrit à la main.</p>

<h2>Dans la vraie vie</h2>
<p>Ta boîte de réception est un tableau de messages, un panier un tableau d'articles, un classement un tableau de scores. Chaque fois qu'une application affiche une liste, il y a derrière un tableau et une boucle qui le parcourt.</p>

<div class="a-retenir">
<ul>
<li><code>let t = [a, b, c];</code> ; le premier est <code>t[0]</code>, le dernier <code>t[t.length - 1]</code>.</li>
<li><code>t.push(x)</code> ajoute à la fin ; <code>t[i] = x</code> remplace.</li>
<li>Pour parcourir : <code>for (let i = 0; i &lt; t.length; i++)</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi compter depuis 0 ?</summary>
<p>L'index n'est pas un numéro d'ordre, c'est un <em>décalage</em> depuis le début du tableau en mémoire : le premier élément est à 0 case du début, le deuxième à 1 case. Presque tous les langages ont gardé cette convention, héritée du langage C (que tu croiseras plus loin dans ce cours). Et un tableau peut contenir n'importe quoi, y compris d'autres tableaux : une grille de morpion est un tableau de trois lignes, chacune un tableau de trois cases.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Crée un tableau <code>courses</code> avec 3 articles de ton choix. Ajoutes-en un 4e avec <code>push</code>. Puis parcours le tableau avec une boucle <code>for</code> pour afficher chaque article précédé d\'un tiret, par exemple <code>- pain</code>.',
      codeDepart: '// Ta liste de courses\n',
      indices: [
        "Trois gestes : créer le tableau, y ajouter un élément, puis le parcourir. Le parcours se fait par les <strong>positions</strong>, pas par les valeurs.",
        "Un tableau s’écrit entre crochets. <code>push()</code> ajoute à la fin. La boucle part de 0 et s’arrête <em>avant</em> <code>courses.length</code>.",
        "<code>for (let i = 0; i &lt; courses.length; i++)</code>, et dedans <code>console.log(\"- \" + courses[i]);</code>"
      ],
      solution: 'let courses = ["pain", "lait", "œufs"];\ncourses.push("chocolat");\n\nfor (let i = 0; i < courses.length; i++) {\n  console.log("- " + courses[i]);\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/\[/.test(ctx.code)) return { ok: false, message: 'Je ne vois pas de tableau. Crée-le avec des crochets : <code>let courses = ["...", "...", "..."];</code>' };
        if (!/\.push\s*\(/.test(ctx.code)) return { ok: false, message: 'Le tableau est là ! Ajoute maintenant un 4e article avec <code>courses.push("...");</code>' };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'Il faut parcourir le tableau avec une boucle, pas afficher les articles un par un à la main.' };
        const lignes = ctx.logs.filter(l => l.trim().startsWith('-'));
        if (lignes.length < 4) return { ok: false, message: 'Ta boucle affiche ' + lignes.length + ' ligne(s) commençant par un tiret — il en faut 4 (les 3 articles + celui du push). Vérifie la condition <code>i < courses.length</code> et le <code>"- "</code> dans le console.log.' };
        return { ok: true, message: 'Tableau + boucle : tu viens d\'apprendre le duo le plus utilisé de toute la programmation.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : premier et dernier.</strong> Voici un tableau de 6 villes-étapes d\'un voyage. SANS compter à la main (le tableau pourrait changer !), affiche : la ville de départ (premier élément), la ville d\'arrivée (dernier élément, via <code>length - 1</code>), et le nombre total d\'étapes.',
      codeDepart: 'let etapes = ["Paris", "Dijon", "Lyon", "Avignon", "Aix", "Nice"];\n',
      indices: [
        "Le premier élément est à la position 0. Le dernier n’est donc pas à <code>length</code>, mais juste avant.",
        "Avec 6 éléments, les positions vont de 0 à 5 : le dernier index est <code>length - 1</code>. Et ça reste vrai quelle que soit la taille du tableau.",
        "<code>etapes[0]</code>, <code>etapes[etapes.length - 1]</code>, et <code>etapes.length</code>."
      ],
      solution: 'let etapes = ["Paris", "Dijon", "Lyon", "Avignon", "Aix", "Nice"];\n\nconsole.log(etapes[0]);\nconsole.log(etapes[etapes.length - 1]);\nconsole.log(etapes.length);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!ctx.logs.includes('Paris')) return { ok: false, message: 'Il manque la ville de départ : <code>etapes[0]</code> (le premier index est 0, pas 1 !).' };
        if (!ctx.logs.includes('Nice')) return { ok: false, message: 'Il manque l\'arrivée. Le dernier index est <code>length - 1</code> : <code>etapes[etapes.length - 1]</code>.' };
        if (!/length\s*-\s*1/.test(ctx.code)) return { ok: false, message: 'Tu as écrit <code>etapes[5]</code> à la main ? Ça marche ici, mais si on ajoute une étape, ton code casse. Utilise <code>etapes[etapes.length - 1]</code> — il marche toujours.' };
        if (!ctx.logs.includes('6')) return { ok: false, message: 'Il manque le nombre d\'étapes : <code>etapes.length</code>.' };
        return { ok: true, message: 'Le coup du <code>length - 1</code> pour le dernier élément : réflexe de pro acquis.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : les statistiques de la classe.</strong> Voici les notes d\'une classe. Avec UNE boucle et le motif accumulateur, calcule la <strong>somme</strong> des notes, puis la <strong>moyenne</strong> (somme divisée par le nombre de notes, SANS écrire 5 à la main). Affiche la somme (61) puis la moyenne (12.2).',
      codeDepart: 'let notes = [14, 9, 16, 11, 11];\n\nlet somme = 0;\n// La boucle...\n',
      indices: [
        "Encore l’accumulateur, mais cette fois sur les valeurs d’un tableau. La moyenne, elle, ne se calcule qu’une seule fois : après la boucle.",
        "Dans la boucle : ajouter <code>notes[i]</code> à la somme. Après : diviser par <code>notes.length</code> plutôt que par 5, pour que ça marche encore si le tableau change.",
        "<code>somme += notes[i];</code> dans la boucle, puis <code>let moyenne = somme / notes.length;</code>"
      ],
      solution: 'let notes = [14, 9, 16, 11, 11];\n\nlet somme = 0;\nfor (let i = 0; i < notes.length; i++) {\n  somme += notes[i];\n}\n\nlet moyenne = somme / notes.length;\nconsole.log(somme);\nconsole.log(moyenne);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'La somme doit être calculée par une boucle (imagine 300 notes...).' };
        if (!ctx.logs.includes('61')) return { ok: false, message: 'La somme de 14+9+16+11+11 est 61. Vérifie ton accumulateur : <code>somme += notes[i];</code> dans la boucle.' };
        if (!ctx.logs.includes('12.2')) return { ok: false, message: 'La somme est bonne ! Pour la moyenne : <code>somme / notes.length</code> = 61 / 5 = 12.2.' };
        if (!/notes\.length/.test(ctx.code.split('somme')[1] || ctx.code)) return { ok: false, message: 'Utilise <code>notes.length</code> pour diviser, pas le chiffre 5 écrit à la main — ton code doit marcher même si on ajoute des notes.' };
        return { ok: true, message: 'Somme, moyenne, sur n\'importe quelle liste : tu viens d\'écrire ton premier vrai traitement de données.' };
      }
    }
  ]
},

{
  id: 'js-9',
  titre: 'Les fonctions : tes propres instructions',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu utilises <code>console.log(...)</code> depuis le début : quelqu'un a écrit cette fonctionnalité une fois, et tout le monde la réutilise sans savoir comment elle marche à l'intérieur. Une <strong>fonction</strong>, c'est exactement ça : un bloc de code avec un nom, écrit une fois et appelé autant de fois qu'on veut.</p>
<p>Imagine un calcul de prix copié à cinq endroits d'un programme. Le jour où il faut le corriger, il faut retrouver les cinq copies, et en oublier une, c'est un bug. Rangé dans une fonction, il n'existe qu'à un seul endroit : on le corrige une fois, et tous les appels en profitent.</p>

<h2>Créer et appeler une fonction</h2>
<pre class="bloc-code">function direBonjour() {
  console.log("Bonjour !");
  console.log("Bienvenue chez nous.");
}

direBonjour();   // exécute le bloc
direBonjour();   // et encore une fois</pre>
<p>Deux temps : on <strong>définit</strong> la fonction (le code ne s'exécute pas encore, il est rangé), puis on l'<strong>appelle</strong> par son nom suivi de parenthèses.</p>

<h2>Les paramètres : rendre la fonction flexible</h2>
<pre class="bloc-code">function saluer(prenom) {
  console.log("Bonjour " + prenom + " !");
}

saluer("Léa");    // Bonjour Léa !
saluer("Tom");    // Bonjour Tom !</pre>
<p><code>prenom</code> est un <strong>paramètre</strong> : une variable qui reçoit, à chaque appel, la valeur écrite entre les parenthèses. Plusieurs paramètres se séparent par des virgules : <code>function aire(largeur, hauteur)</code>, et les valeurs sont données dans le même ordre à l'appel.</p>

<h2>return : la fonction qui répond</h2>
<pre class="bloc-code">function doubler(nombre) {
  return nombre * 2;
}

let resultat = doubler(21);
console.log(resultat);        // 42
console.log(doubler(5) + 1);  // 11</pre>
<p><code>return</code> <strong>renvoie</strong> une valeur à celui qui a appelé la fonction : on peut la ranger dans une variable, l'utiliser dans un calcul, ou la passer à une autre fonction. C'est la différence clé : <code>console.log</code> <em>affiche</em>, pour tes yeux ; <code>return</code> <em>renvoie</em>, pour le programme.</p>
<p>Une fonction peut en appeler une autre : <code>function quadrupler(n) { return doubler(doubler(n)); }</code>. C'est ainsi qu'on construit de gros programmes à partir de petites pièces.</p>

<h2>Pas à pas</h2>
<p>Que se passe-t-il pendant <code>let resultat = doubler(21);</code> ?</p>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>appel</td><td>JavaScript saute dans la fonction : <code>nombre</code> reçoit 21.</td></tr>
<tr><td>calcul</td><td><code>nombre * 2</code> donne 42.</td></tr>
<tr><td>return</td><td>La fonction s'arrête et renvoie 42 : l'appel <code>doubler(21)</code> « vaut » 42.</td></tr>
<tr><td>retour</td><td>JavaScript revient à la ligne de l'appel et range 42 dans <code>resultat</code>.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Oublier le return.</strong> Une fonction qui calcule sans renvoyer ne donne rien : <code>function doubler(n) { n * 2; }</code> puis <code>console.log(doubler(4))</code> affiche <code>undefined</code>. Le calcul est fait, puis jeté. Aucune erreur ne s'affiche : c'est à toi de repérer ce <code>undefined</code>.</p>
<p><strong>Afficher au lieu de renvoyer.</strong> Un <code>console.log</code> dans la fonction montre bien la bonne valeur à l'écran… mais l'appel, lui, vaut toujours <code>undefined</code>, et on ne peut rien en faire. Une fonction qui calcule doit <code>return</code> ; c'est l'appelant qui décide d'afficher.</p>
<p><strong>Oublier les parenthèses à l'appel.</strong> <code>console.log(doubler)</code> n'appelle pas la fonction : il affiche son code, « function doubler(nombre) { … } ». Les parenthèses, c'est le bouton « lancer ».</p>
<p><strong>Du code après le return.</strong> Tout ce qui suit un <code>return</code> exécuté ne tourne jamais : la fonction s'est déjà arrêtée.</p>

<h2>Dans la vraie vie</h2>
<p>Un site de commerce a une fonction pour calculer un total, une autre pour formater un prix en « 12,50 € », une autre pour vérifier une adresse e-mail. Un programme bien écrit est un assemblage de petites fonctions qui font chacune UNE chose, avec un nom qui dit laquelle. C'est ce qui permet de construire des logiciels géants sans s'y perdre.</p>

<div class="a-retenir">
<ul>
<li><code>function nom(parametres) { ... }</code> définit ; <code>nom(valeurs)</code> appelle.</li>
<li><code>return</code> renvoie une valeur et arrête la fonction ; sans lui, l'appel vaut <code>undefined</code>.</li>
<li><code>console.log</code> montre, <code>return</code> transmet : une fonction qui calcule renvoie.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les variables d'une fonction lui appartiennent</summary>
<p>Un paramètre, ou une variable créée avec <code>let</code> dans une fonction, n'existe que pendant l'appel : de l'extérieur, <code>nombre</code> est inconnu. Deux fonctions peuvent donc avoir chacune leur variable <code>total</code> sans se marcher dessus. On appelle ça la <em>portée</em> des variables ; le module « JavaScript, la suite » y consacre une leçon, et le module avancé montre une écriture plus courte des fonctions, avec une flèche.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Écris une fonction <code>aireRectangle</code> qui prend deux paramètres <code>largeur</code> et <code>hauteur</code>, et <strong>retourne</strong> leur produit. Puis affiche le résultat de <code>aireRectangle(6, 4)</code> et celui de <code>aireRectangle(10, 3)</code>.',
      codeDepart: 'function aireRectangle(largeur, hauteur) {\n  // à compléter\n}\n\n// Appelle la fonction et affiche les résultats\n',
      indices: [
        "Une fonction se déclare une fois, puis s’appelle autant qu’on veut. Ici, elle ne doit rien afficher : elle <strong>retourne</strong> un résultat.",
        "Les deux paramètres se déclarent entre les parenthèses du <code>function</code>. C’est à l’extérieur qu’on affiche ce qu’elle a retourné.",
        "<code>function aireRectangle(largeur, hauteur) { return largeur * hauteur; }</code> puis <code>console.log(aireRectangle(6, 4));</code>"
      ],
      solution: 'function aireRectangle(largeur, hauteur) {\n  return largeur * hauteur;\n}\n\nconsole.log(aireRectangle(6, 4));\nconsole.log(aireRectangle(10, 3));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/function\s+aireRectangle/.test(ctx.code)) return { ok: false, message: 'Garde la définition <code>function aireRectangle(largeur, hauteur) { ... }</code>' };
        if (!/return/.test(ctx.code)) return { ok: false, message: 'Ta fonction doit <code>return</code> le résultat (pas seulement l\'afficher).' };
        if (!ctx.logs.includes('24')) return { ok: false, message: '<code>aireRectangle(6, 4)</code> devrait donner 24. As-tu bien <code>return largeur * hauteur;</code> et l\'appel dans un <code>console.log</code> ?' };
        if (!ctx.logs.includes('30')) return { ok: false, message: 'Le premier appel est bon ! Il manque l\'affichage de <code>aireRectangle(10, 3)</code> (qui doit donner 30).' };
        return { ok: true, message: 'Définir, paramétrer, retourner, appeler : tu maîtrises le concept le plus puissant de la programmation.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : fonction + condition.</strong> Écris une fonction <code>categorie(age)</code> qui RETOURNE <code>"enfant"</code> si l\'âge est inférieur à 12, <code>"ado"</code> s\'il est inférieur à 18, et <code>"adulte"</code> sinon. Teste-la en affichant <code>categorie(8)</code>, <code>categorie(15)</code> et <code>categorie(30)</code>.',
      codeDepart: 'function categorie(age) {\n\n}\n\n// Les trois tests\n',
      indices: [
        "Trois réponses possibles, mais la fonction n’en rend qu’une. Ce qui compte : dès qu’un <code>return</code> s’exécute, la fonction s’arrête net.",
        "On peut donc enchaîner les tests du plus restrictif au plus large. Le dernier cas n’a même pas besoin de condition : s’il reste quelque chose, c’est lui.",
        "<code>if (age &lt; 12) return \"enfant\";</code> · <code>else if (age &lt; 18) return \"ado\";</code> · puis <code>return \"adulte\";</code>"
      ],
      solution: 'function categorie(age) {\n  if (age < 12) {\n    return "enfant";\n  } else if (age < 18) {\n    return "ado";\n  }\n  return "adulte";\n}\n\nconsole.log(categorie(8));\nconsole.log(categorie(15));\nconsole.log(categorie(30));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/function\s+categorie/.test(ctx.code)) return { ok: false, message: 'La fonction doit s\'appeler <code>categorie</code> et prendre un paramètre <code>age</code>.' };
        if ((ctx.code.match(/return/g) || []).length < 2) return { ok: false, message: 'La fonction doit RETOURNER une valeur différente selon l\'âge — il faut plusieurs <code>return</code> (un par cas).' };
        if (ctx.logs[0] !== 'enfant') return { ok: false, message: '<code>categorie(8)</code> doit retourner « enfant » (obtenu : « ' + (ctx.logs[0] || 'rien') + ' »).' };
        if (ctx.logs[1] !== 'ado') return { ok: false, message: '<code>categorie(15)</code> doit retourner « ado » (obtenu : « ' + (ctx.logs[1] || 'rien') + ' »).' };
        if (ctx.logs[2] !== 'adulte') return { ok: false, message: '<code>categorie(30)</code> doit retourner « adulte » (obtenu : « ' + (ctx.logs[2] || 'rien') + ' »).' };
        return { ok: true, message: 'Une fonction qui prend une décision et répond : c\'est le cœur de la logique métier de toutes les applications.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : les fonctions s\'appellent entre elles.</strong> 1) Écris <code>prixTTC(prixHT)</code> qui retourne le prix multiplié par <code>1.2</code> (TVA 20%). 2) Écris <code>ticket(nom, prixHT)</code> qui UTILISE <code>prixTTC</code> pour retourner la phrase <code>[nom] : [prix] euros TTC</code>. 3) Affiche <code>ticket("Clavier", 50)</code> → <code>Clavier : 60 euros TTC</code>.',
      codeDepart: 'function prixTTC(prixHT) {\n\n}\n\nfunction ticket(nom, prixHT) {\n\n}\n\nconsole.log(ticket("Clavier", 50));',
      indices: [
        "Deux fonctions, et la seconde se sert de la première. C’est normal : une fonction peut en appeler une autre, exactement comme tu appelles les tiennes.",
        "Dans <code>ticket</code>, à l’endroit où il faut le prix, écris l’appel à <code>prixTTC(prixHT)</code> — son résultat prendra sa place.",
        "<code>return `${nom} : ${prixTTC(prixHT)} euros TTC`;</code>"
      ],
      solution: 'function prixTTC(prixHT) {\n  return prixHT * 1.2;\n}\n\nfunction ticket(nom, prixHT) {\n  return `${nom} : ${prixTTC(prixHT)} euros TTC`;\n}\n\nconsole.log(ticket("Clavier", 50));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/function\s+prixTTC/.test(ctx.code) || !/function\s+ticket/.test(ctx.code)) return { ok: false, message: 'Il faut les deux fonctions : <code>prixTTC</code> et <code>ticket</code>.' };
        if (!/prixTTC\s*\(/.test(ctx.code.split(/function\s+ticket/)[1] || '')) return { ok: false, message: 'La fonction <code>ticket</code> doit APPELER <code>prixTTC(...)</code> à l\'intérieur d\'elle-même — pas refaire le calcul × 1.2 !' };
        const sortie = ctx.logs.join(' ');
        if (!/Clavier\s*:\s*60\s*euros\s*TTC/.test(sortie)) return { ok: false, message: 'Attendu : <code>Clavier : 60 euros TTC</code> (obtenu : « ' + (ctx.logs[0] || 'rien').replace(/</g, '&lt;') + ' »). Vérifie le calcul (50 × 1.2 = 60) et le format de la phrase.' };
        return { ok: true, message: 'Des fonctions qui s\'appuient sur d\'autres fonctions : tu viens de découvrir comment les logiciels de millions de lignes restent organisés.' };
      }
    }
  ]
},

{
  id: 'js-10',
  titre: 'Les objets : regrouper des informations',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Décrire un chat avec des variables séparées (<code>nomChat</code>, <code>ageChat</code>, <code>couleurChat</code>) marche pour un chat. Pour cent chats, ou pour un contact avec nom, téléphone, adresse et anniversaire, ça devient vite le chaos : rien ne dit quelles variables vont ensemble. Un <strong>objet</strong> regroupe des informations liées dans une seule structure, où chaque information porte un nom.</p>

<h2>Créer et lire un objet</h2>
<pre class="bloc-code">let chat = {
  nom: "Félix",
  age: 3,
  couleur: "roux"
};

console.log(chat.nom);     // Félix
console.log(chat.age);     // 3</pre>
<ul>
<li>les accolades <code>{ }</code> créent l'objet ;</li>
<li>chaque information est une paire <strong>clé: valeur</strong>, séparée des autres par une virgule ;</li>
<li>on lit une valeur avec le <strong>point</strong> : <code>objet.cle</code>.</li>
</ul>
<p>La différence avec un tableau : un tableau range des valeurs <em>par position</em> (la première, la deuxième…), un objet les range <em>par nom</em>.</p>

<h2>Modifier un objet</h2>
<pre class="bloc-code">chat.age = 4;              // anniversaire !
chat.jouet = "souris";     // nouvelle clé, créée à la volée
console.log(chat);
// {"nom":"Félix","age":4,"couleur":"roux","jouet":"souris"}</pre>
<p>Affiché en entier, un objet apparaît entre accolades, avec ses clés entre guillemets : c'est ainsi que la console de ce logiciel le montre.</p>

<h2>Des objets dans des tableaux</h2>
<p>Le combo qui fait tourner le monde : un tableau d'objets. C'est exactement la forme des données de toutes les applications, qu'il s'agisse de contacts, de produits ou de films.</p>
<pre class="bloc-code">let films = [
  { titre: "Alien", annee: 1979 },
  { titre: "Titanic", annee: 1997 }
];

for (let i = 0; i &lt; films.length; i++) {
  console.log(films[i].titre + " (" + films[i].annee + ")");
}</pre>

<h2>Pas à pas</h2>
<p>Comment se lit <code>films[i].titre</code> ? De gauche à droite, un morceau à la fois :</p>
<table class="memo-table trace">
<tr><th>i</th><th>films[i]</th><th>.titre</th><th>.annee</th></tr>
<tr><td>0</td><td>le premier objet</td><td>"Alien"</td><td>1979</td></tr>
<tr><td>1</td><td>le deuxième objet</td><td>"Titanic"</td><td>1997</td></tr>
<tr><td>2</td><td colspan="3">2 n'est pas &lt; 2 : la boucle s'arrête</td></tr>
</table>
<p><code>films[i]</code> donne un objet ; le <code>.titre</code> qui suit s'applique à cet objet. On peut enchaîner ainsi aussi loin que la structure le permet.</p>

<h2>Les pièges</h2>
<p><strong>Une clé mal orthographiée.</strong> <code>chat.Nom</code> ou <code>chat.nome</code> ne provoquent aucune erreur : JavaScript renvoie <code>undefined</code>, comme pour une clé qui n'existe pas. Si un <code>undefined</code> s'affiche, compare lettre à lettre le nom de la clé.</p>
<p><strong>Lire une clé sur quelque chose qui n'existe pas.</strong> <code>films[2].titre</code>, alors qu'il n'y a que deux films : <code>films[2]</code> vaut <code>undefined</code>, et lui demander un titre donne « Cannot read properties of undefined (reading 'titre') », « impossible de lire les propriétés de undefined ». Le message nomme la clé demandée ; le coupable est ce qu'il y a <em>avant</em> le point.</p>
<p><strong>La virgule oubliée.</strong> Entre deux paires, la virgule est obligatoire. <code>{ nom: "Félix" age: 3 }</code> donne « Unexpected identifier 'age' » : JavaScript ne s'attendait pas à trouver <code>age</code> juste là.</p>

<h2>Dans la vraie vie</h2>
<p>Quand une application météo reçoit les prévisions, ou quand un site reçoit la liste des produits, les données arrivent dans un format appelé JSON, qui s'écrit presque exactement comme ces objets et tableaux. En apprenant les objets JavaScript, tu apprends la langue dans laquelle les données circulent sur le web.</p>

<div class="a-retenir">
<ul>
<li><code>{ cle: valeur, cle2: valeur2 }</code> regroupe des informations par nom ; on lit avec <code>objet.cle</code>.</li>
<li>Une clé absente ou mal écrite donne <code>undefined</code>, sans erreur.</li>
<li>Un tableau d'objets se parcourt avec une boucle : <code>liste[i].cle</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les crochets</summary>
<p>Il existe une seconde façon de lire une clé : <code>chat["nom"]</code>, avec le nom entre guillemets et entre crochets. Elle devient indispensable quand le nom de la clé est dans une variable : <code>let cle = "age"; console.log(chat[cle]);</code> affiche 3. Le point, lui, prend le mot tel quel : <code>chat.cle</code> chercherait une clé qui s'appelle littéralement « cle ».</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Crée un objet <code>livre</code> avec trois clés : <code>titre</code> (texte), <code>auteur</code> (texte) et <code>pages</code> (nombre). Affiche ensuite la phrase <code>[titre], de [auteur]</code> en utilisant les clés de l\'objet, puis ajoute une clé <code>lu</code> valant <code>true</code>, et affiche l\'objet entier avec <code>console.log(livre)</code>.',
      codeDepart: 'let livre = {\n\n};\n',
      indices: [
        "Un objet regroupe des informations <strong>nommées</strong>, entre accolades. Chacune a un nom et une valeur, séparés par deux-points.",
        "On accède à une valeur avec un point : <code>livre.titre</code>. Et écrire à une clé qui n’existe pas encore la crée au passage.",
        "<code>let livre = { titre: \"…\", auteur: \"…\", pages: 700 };</code>, puis <code>livre.lu = true;</code>"
      ],
      solution: 'let livre = {\n  titre: "Dune",\n  auteur: "Frank Herbert",\n  pages: 700\n};\n\nconsole.log(livre.titre + ", de " + livre.auteur);\nlivre.lu = true;\nconsole.log(livre);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>. Vérifie les virgules entre les paires clé: valeur.' };
        if (!/titre\s*:/.test(ctx.code) || !/auteur\s*:/.test(ctx.code) || !/pages\s*:/.test(ctx.code)) return { ok: false, message: 'L\'objet doit contenir les trois clés <code>titre</code>, <code>auteur</code> et <code>pages</code> (avec les deux-points).' };
        const phrase = ctx.logs.find(l => /, de /.test(l));
        if (!phrase) return { ok: false, message: 'Je ne vois pas la phrase « [titre], de [auteur] ». Construis-la avec <code>livre.titre</code> et <code>livre.auteur</code>.' };
        if (!/livre\s*\.\s*lu\s*=\s*true/.test(ctx.code)) return { ok: false, message: 'Il manque l\'ajout de la clé : <code>livre.lu = true;</code> (après la création de l\'objet).' };
        const objAffiche = ctx.logs.find(l => /"lu"\s*:\s*true/.test(l));
        if (!objAffiche) return { ok: false, message: 'Dernière étape : affiche l\'objet entier avec <code>console.log(livre);</code> APRÈS avoir ajouté la clé <code>lu</code>.' };
        return { ok: true, message: 'Variables, tableaux, objets : tu connais maintenant toutes les façons de structurer des données.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : le tableau d\'objets.</strong> Voici la playlist du moment. Avec une boucle, affiche chaque morceau au format <code>[titre] — [duree] min</code>, puis calcule et affiche la durée TOTALE de la playlist (résultat : 11).',
      codeDepart: 'let playlist = [\n  { titre: "Intro", duree: 2 },\n  { titre: "Voyage", duree: 4 },\n  { titre: "Final", duree: 5 }\n];\n',
      indices: [
        "Un tableau d’objets : la boucle te donne une <strong>position</strong>, et à cette position se trouve un objet dont il faut lire les clés.",
        "<code>playlist[i]</code> est l’objet ; <code>playlist[i].duree</code> est sa durée. L’accumulateur additionne ces durées au fil des tours.",
        "Dans la boucle : l’affichage avec <code>${playlist[i].titre}</code>, et <code>total += playlist[i].duree;</code>"
      ],
      solution: 'let playlist = [\n  { titre: "Intro", duree: 2 },\n  { titre: "Voyage", duree: 4 },\n  { titre: "Final", duree: 5 }\n];\n\nlet total = 0;\nfor (let i = 0; i < playlist.length; i++) {\n  console.log(`${playlist[i].titre} — ${playlist[i].duree} min`);\n  total += playlist[i].duree;\n}\n\nconsole.log(total);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'Parcours la playlist avec une boucle — c\'est le combo tableau d\'objets + boucle de la leçon.' };
        const lignes = ctx.logs.filter(l => /min/.test(l));
        if (lignes.length < 3) return { ok: false, message: 'Il faut afficher les 3 morceaux (format <code>Titre — X min</code>). Pour accéder au titre du morceau i : <code>playlist[i].titre</code> — crochets PUIS point.' };
        if (!ctx.logs.includes('11')) return { ok: false, message: 'Les morceaux s\'affichent ! Il manque la durée totale : accumule <code>playlist[i].duree</code> dans une variable et affiche-la après la boucle (2+4+5 = 11).' };
        return { ok: true, message: 'playlist[i].duree : crochets pour le tableau, point pour l\'objet. Cette gymnastique, c\'est 80% du travail avec des données réelles.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : la recherche.</strong> Dans ce carnet de contacts, écris une fonction <code>chercher(nom)</code> qui parcourt le tableau et RETOURNE le numéro de téléphone du contact trouvé, ou <code>"Inconnu"</code> si aucun nom ne correspond. Affiche <code>chercher("Léa")</code> puis <code>chercher("Bob")</code>.',
      codeDepart: 'let contacts = [\n  { nom: "Léa", tel: "06 11 22 33 44" },\n  { nom: "Tom", tel: "07 55 66 77 88" },\n  { nom: "Nina", tel: "06 99 88 77 66" }\n];\n\nfunction chercher(nom) {\n\n}\n\nconsole.log(chercher("Léa"));\nconsole.log(chercher("Bob"));',
      indices: [
        "La fonction parcourt le carnet et s’arrête dès qu’elle trouve. Si elle arrive au bout sans rien trouver, c’est qu’il n’y a rien.",
        "Le <code>return</code> du numéro est <strong>dans</strong> la boucle ; celui de « Inconnu » est <strong>après</strong> — il ne s’exécute que si la boucle est allée jusqu’au bout.",
        "<code>if (contacts[i].nom === nom) { return contacts[i].tel; }</code> dans la boucle, puis <code>return \"Inconnu\";</code> après."
      ],
      solution: 'let contacts = [\n  { nom: "Léa", tel: "06 11 22 33 44" },\n  { nom: "Tom", tel: "07 55 66 77 88" },\n  { nom: "Nina", tel: "06 99 88 77 66" }\n];\n\nfunction chercher(nom) {\n  for (let i = 0; i < contacts.length; i++) {\n    if (contacts[i].nom === nom) {\n      return contacts[i].tel;\n    }\n  }\n  return "Inconnu";\n}\n\nconsole.log(chercher("Léa"));\nconsole.log(chercher("Bob"));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/function\s+chercher/.test(ctx.code)) return { ok: false, message: 'Garde la fonction <code>chercher(nom)</code>.' };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'La fonction doit PARCOURIR le tableau avec une boucle — pas tester chaque contact à la main.' };
        if (ctx.logs[0] !== '06 11 22 33 44') return { ok: false, message: '<code>chercher("Léa")</code> doit retourner son numéro. Dans la boucle : si <code>contacts[i].nom === nom</code>, retourne <code>contacts[i].tel</code>.' };
        if (ctx.logs[1] !== 'Inconnu') return { ok: false, message: 'La recherche marche ! Mais <code>chercher("Bob")</code> doit retourner « Inconnu » : place <code>return "Inconnu";</code> APRÈS la boucle (s\'il était dans la boucle, il s\'exécuterait dès le premier contact non-correspondant).' };
        return { ok: true, message: 'Tu viens d\'écrire un moteur de recherche miniature. Le placement du « Inconnu » après la boucle est une subtilité que beaucoup ratent — pas toi.' };
      }
    }
  ]
},

{
  id: 'js-11',
  titre: 'JavaScript dans la page : le DOM',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une page HTML seule est figée : ce qui est écrit dans le fichier s'affiche, un point c'est tout. Un menu qui s'ouvre, un bouton « J'aime » dont le compteur monte, un message « Mot de passe trop court » qui apparaît pendant la saisie : tout ça, c'est du JavaScript qui <strong>lit et modifie la page</strong> pendant qu'on la regarde. La page vue par JavaScript s'appelle le <strong>DOM</strong> (<em>Document Object Model</em>) : chaque balise y devient un objet qu'on peut attraper et transformer. C'est le moment où tes trois compétences (HTML, CSS, JavaScript) se rejoignent.</p>

<h2>Attraper un élément</h2>
<pre class="bloc-code">&lt;p id="message"&gt;Texte de départ&lt;/p&gt;

&lt;script&gt;
  let el = document.querySelector("#message");
  el.textContent = "Texte remplacé par le JavaScript !";
&lt;/script&gt;</pre>
<ul>
<li>le JavaScript s'écrit dans une balise <code>&lt;script&gt;</code>, placée <strong>après</strong> le HTML qu'il manipule ;</li>
<li><code>document</code> est l'objet qui représente toute la page ;</li>
<li><code>querySelector("...")</code> trouve le premier élément qui correspond au sélecteur, <strong>exactement comme en CSS</strong> : <code>"#message"</code> pour un id, <code>".classe"</code> pour une classe, <code>"p"</code> pour une balise. Ton CSS resservait déjà ;</li>
<li><code>.textContent</code> est le texte de l'élément, qu'on peut lire ou remplacer.</li>
</ul>

<h2>Réagir à un clic</h2>
<pre class="bloc-code">&lt;button id="btn"&gt;Clique-moi&lt;/button&gt;
&lt;p id="message"&gt;En attente...&lt;/p&gt;

&lt;script&gt;
  let btn = document.querySelector("#btn");

  btn.addEventListener("click", function () {
    let msg = document.querySelector("#message");
    msg.textContent = "Tu as cliqué !";
  });
&lt;/script&gt;</pre>
<p><code>addEventListener("click", ...)</code> se lit : « écoute les clics sur cet élément, et à chaque clic, exécute cette fonction ». La fonction n'a pas de nom (on dit <em>fonction anonyme</em>) : c'est simplement du code mis en attente jusqu'au clic.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Moment</th><th>Ce qui se passe</th></tr>
<tr><td>chargement</td><td>Le navigateur affiche le bouton et le paragraphe, puis lit le script : il trouve le bouton et y attache l'écouteur. Rien ne change à l'écran.</td></tr>
<tr><td>1er clic</td><td>La fonction s'exécute : elle trouve le paragraphe et remplace son texte par « Tu as cliqué ! ».</td></tr>
<tr><td>2e clic</td><td>La fonction s'exécute à nouveau et remet le même texte : l'écouteur reste actif tant que la page est ouverte.</td></tr>
</table>
<p>C'est LE mécanisme de toute interface : <strong>un événement se produit → une fonction s'exécute → la page change</strong>. Tout le reste n'est que variation.</p>

<h2>Les pièges</h2>
<p>Ici, une erreur de script ne s'affiche pas : il ne se passe simplement rien. Un vrai navigateur, lui, l'écrit dans sa console (touche <kbd>F12</kbd>), en général sous la forme « Cannot read properties of null ». Le <code>null</code> veut dire : <code>querySelector</code> n'a rien trouvé.</p>
<p><strong>Le sélecteur sans son symbole.</strong> <code>querySelector("message")</code> cherche une balise <code>&lt;message&gt;</code>, qui n'existe pas. Pour un id, il faut le <code>#</code> ; pour une classe, le point.</p>
<p><strong>Le script avant le HTML.</strong> Le navigateur lit la page de haut en bas. Un script placé avant le bouton cherche un bouton qui n'existe pas encore, et reçoit <code>null</code>. D'où la règle : le <code>&lt;script&gt;</code> en dernier.</p>
<p><strong>Des parenthèses de trop.</strong> <code>btn.addEventListener("click", changer())</code> <em>appelle</em> <code>changer</code> tout de suite, une seule fois, au chargement, au lieu de la confier à l'écouteur. On donne la fonction elle-même, sans parenthèses : <code>addEventListener("click", changer)</code>.</p>

<h2>Dans la vraie vie</h2>
<p>Le bouton qui ouvre le menu sur téléphone, le cœur qui se remplit quand tu aimes une photo, le compteur « 280 caractères restants » sous un champ de texte : chacun est un écouteur d'événement qui modifie un morceau de la page. Des outils comme React ou Vue, utilisés par les grands sites, automatisent ce mécanisme, mais ne le remplacent pas.</p>

<div class="a-retenir">
<ul>
<li><code>document.querySelector("#id")</code> attrape un élément, avec les sélecteurs du CSS.</li>
<li><code>.textContent</code> lit ou remplace son texte.</li>
<li><code>element.addEventListener("click", function () { ... })</code> : un clic, une fonction, une page qui change.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les autres événements</summary>
<p>Le clic n'est qu'un événement parmi d'autres : <code>"input"</code> se déclenche à chaque caractère tapé dans un champ, <code>"mouseover"</code> au survol de la souris, <code>"keydown"</code> à l'appui d'une touche du clavier. Tous s'écoutent de la même façon, avec <code>addEventListener</code>. Le module « JavaScript, la suite » consacre une leçon au clavier et aux autres événements.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le bouton ne fait rien. Dans la balise <code>&lt;script&gt;</code>, ajoute un écouteur de clic qui remplace le texte du paragraphe <code>#resultat</code> par <code>Bravo, ça marche !</code>. Teste ensuite en cliquant sur le bouton dans l\'aperçu, puis clique sur Vérifier.',
      codeDepart: '<button id="btn">Clique-moi</button>\n<p id="resultat">En attente d\'un clic...</p>\n\n<script>\n  let btn = document.querySelector("#btn");\n\n  // Ajoute l\'écouteur de clic ici\n\n</script>',
      indices: [
        "Rien ne se passe parce que personne n’écoute le bouton. Il faut lui dire quoi faire quand on clique dessus.",
        "<code>addEventListener(\"click\", …)</code> attache une fonction au bouton. Dans cette fonction, on change le <code>textContent</code> du paragraphe visé.",
        "<code>btn.addEventListener(\"click\", function () { document.querySelector(\"#resultat\").textContent = \"Bravo, ça marche !\"; });</code>"
      ],
      solution: '<button id="btn">Clique-moi</button>\n<p id="resultat">En attente d\'un clic...</p>\n\n<script>\n  let btn = document.querySelector("#btn");\n\n  btn.addEventListener("click", function () {\n    document.querySelector("#resultat").textContent = "Bravo, ça marche !";\n  });\n</script>',
      verifier: function (ctx) {
        const btn = ctx.doc.querySelector('#btn');
        const res = ctx.doc.querySelector('#resultat');
        if (!btn || !res) return { ok: false, message: 'Garde le bouton <code>#btn</code> et le paragraphe <code>#resultat</code> du code de départ.' };
        if (!/addEventListener/.test(ctx.code)) return { ok: false, message: 'Je ne vois pas d\'<code>addEventListener</code> dans ton code. Regarde le modèle dans l\'indice.' };
        btn.click();
        if (!/bravo/i.test(res.textContent)) return { ok: false, message: 'J\'ai simulé un clic, mais le texte du paragraphe n\'a pas changé en « Bravo, ça marche ! ». Vérifie le sélecteur <code>"#resultat"</code> et le <code>.textContent = "..."</code>.' };
        return { ok: true, message: 'HTML + CSS + JavaScript réunis : tu viens de créer ta première page interactive.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : le sélecteur d\'humeur.</strong> Deux boutons, un affichage. Fais que le clic sur <code>#soleil</code> mette le texte <code>Il fait beau dans mon cœur ☀️</code> dans <code>#humeur</code>, et le clic sur <code>#pluie</code> y mette <code>Petite journée grise 🌧️</code>. Deux écouteurs à écrire !',
      codeDepart: '<button id="soleil">☀️ Soleil</button>\n<button id="pluie">🌧️ Pluie</button>\n<p id="humeur">Comment te sens-tu ?</p>\n\n<script>\n\n</script>',
      indices: [
        "Deux boutons, deux comportements : ce sont deux écouteurs indépendants, écrits l’un après l’autre.",
        "Chacun suit exactement le modèle de l’exercice précédent : on vise le bouton, on écoute le clic, on écrit dans <code>#humeur</code>.",
        "Un <code>addEventListener</code> sur <code>#soleil</code>, un autre sur <code>#pluie</code>, chacun changeant le <code>textContent</code> de <code>#humeur</code>."
      ],
      solution: '<button id="soleil">☀️ Soleil</button>\n<button id="pluie">🌧️ Pluie</button>\n<p id="humeur">Comment te sens-tu ?</p>\n\n<script>\n  document.querySelector("#soleil").addEventListener("click", function () {\n    document.querySelector("#humeur").textContent = "Il fait beau dans mon cœur ☀️";\n  });\n\n  document.querySelector("#pluie").addEventListener("click", function () {\n    document.querySelector("#humeur").textContent = "Petite journée grise 🌧️";\n  });\n</script>',
      verifier: function (ctx) {
        const soleil = ctx.doc.querySelector('#soleil');
        const pluie = ctx.doc.querySelector('#pluie');
        const humeur = ctx.doc.querySelector('#humeur');
        if (!soleil || !pluie || !humeur) return { ok: false, message: 'Garde les deux boutons et le paragraphe <code>#humeur</code>.' };
        soleil.click();
        if (!/beau/i.test(humeur.textContent)) return { ok: false, message: 'J\'ai cliqué sur ☀️ mais le texte n\'a pas changé. Vérifie l\'écouteur du bouton <code>#soleil</code>.' };
        pluie.click();
        if (!/grise/i.test(humeur.textContent)) return { ok: false, message: 'Le soleil marche ! Mais le clic sur 🌧️ ne change rien : il faut un DEUXIÈME addEventListener, sur <code>#pluie</code>.' };
        soleil.click();
        if (!/beau/i.test(humeur.textContent)) return { ok: false, message: 'Presque : après re-clic sur ☀️, le texte doit re-changer. Chaque bouton doit avoir son propre écouteur permanent.' };
        return { ok: true, message: 'Deux boutons, deux comportements, un affichage partagé : c\'est le schéma de base de toutes les interfaces (onglets, filtres, menus...).' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Que fait <code>document.querySelector(".rouge")</code> ?',
      choix: [
        'Il trouve le premier élément qui a class="rouge"',
        'Il trouve l\'élément qui a id="rouge"',
        'Il colore le premier élément en rouge',
        'Il crée un nouvel élément rouge'
      ],
      bonne: 0,
      explication: 'querySelector utilise la MÊME syntaxe que les sélecteurs CSS : <code>.rouge</code> = classe, <code>#rouge</code> = id, <code>p</code> = balise. Ton apprentissage du CSS ressert directement en JavaScript.',
      aides: [
        '',
        'L\'id s\'attraperait avec un dièse : <code>querySelector("#rouge")</code>. Le point, c\'est pour les classes — comme en CSS !',
        'querySelector ne modifie rien : il TROUVE un élément et te le donne. À toi ensuite de le modifier.',
        'querySelector cherche dans la page existante — pour créer des éléments, il y a d\'autres outils (tu les verras dans le module JavaScript avancé !).'
      ]
    }
  ]
},

{
  id: 'js-12',
  titre: 'Projet final : le compteur',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Dernière leçon du module, et cette fois, c'est toi qui construis : un compteur interactif, avec deux boutons et un nombre qui monte et descend. C'est petit, mais c'est le squelette de beaucoup d'interfaces : la quantité d'un article dans un panier, le nombre de « J'aime », la page 3 sur 12 d'une galerie. Et ça mobilise tout le module : variables, fonctions, événements, DOM.</p>

<h2>Le plan de bataille</h2>
<p>Tout projet, même géant, se découpe en petites étapes. Voici les tiennes :</p>
<ol>
<li>le HTML est fourni : deux boutons et un affichage ;</li>
<li>crée une variable <code>compteur</code> qui démarre à 0 ;</li>
<li>au clic sur <code>#plus</code> : augmente la variable de 1, puis mets à jour l'affichage ;</li>
<li>au clic sur <code>#moins</code> : pareil, en enlevant 1.</li>
</ol>
<p>Avance étape par étape, et relance <strong>Vérifier ma réponse</strong> après chacune : un programme se construit par petits morceaux qui marchent, pas d'un seul bloc.</p>

<h2>L'idée clé : la variable d'abord, l'affichage ensuite</h2>
<p>Le nombre existe à deux endroits : dans ta variable <code>compteur</code> (ce que le programme <em>sait</em>) et dans le texte de <code>#affichage</code> (ce que l'utilisateur <em>voit</em>). La variable est la référence ; l'affichage n'en est qu'une copie. À chaque clic, on modifie d'abord la variable, puis on recopie sa valeur dans la page :</p>
<pre class="bloc-code">document.querySelector("#affichage").textContent = compteur;</pre>
<p>C'est le seul morceau nouveau de ce projet. Tout le reste, tu le connais déjà.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Événement</th><th>compteur</th><th>Affichage</th></tr>
<tr><td>chargement</td><td>0</td><td>0</td></tr>
<tr><td>clic sur +1</td><td>0 + 1 = 1</td><td>recopié : 1</td></tr>
<tr><td>clic sur +1</td><td>1 + 1 = 2</td><td>recopié : 2</td></tr>
<tr><td>clic sur -1</td><td>2 - 1 = 1</td><td>recopié : 1</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Oublier de recopier.</strong> La variable change, mais l'écran reste à 0 : sans la ligne <code>textContent = compteur</code>, rien ne prévient la page. La page ne se met jamais à jour toute seule.</p>
<p><strong>La variable créée dans l'écouteur.</strong> Si <code>let compteur = 0</code> est écrit <em>à l'intérieur</em> de la fonction du clic, il est recréé à 0 à chaque clic : le compteur affiche 1, et encore 1, et toujours 1. La variable se crée une seule fois, en dehors des écouteurs.</p>
<p><strong>Calculer à partir du texte affiché.</strong> Lire <code>textContent</code> puis lui ajouter 1 donne « 01 », puis « 011 » : le texte de la page est du texte, et <code>"1" + 1</code> colle au lieu d'additionner. C'est pour ça qu'on calcule sur la variable, jamais sur l'affichage.</p>

<h2>Dans la vraie vie</h2>
<p>Ce découpage (une variable qui fait foi, un affichage qu'on recopie depuis elle) porte un nom chez les développeurs : l'<em>état</em> et la <em>vue</em>. Les grandes applications gèrent des milliers de variables d'état et des centaines de morceaux de vue, mais le principe est exactement celui de ton compteur.</p>

<div class="a-retenir">
<ul>
<li>La variable est la référence, l'affichage en est la copie.</li>
<li>À chaque événement : modifier la variable, puis recopier dans la page avec <code>textContent</code>.</li>
<li>La variable se crée une seule fois, en dehors des écouteurs.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : une seule fonction pour afficher</summary>
<p>Les deux écouteurs finissent par la même ligne de mise à jour. Quand du code se répète, on le range dans une fonction : <code>function afficher() { document.querySelector("#affichage").textContent = compteur; }</code>, que chaque écouteur appelle. Le jour où l'affichage change (« 3 articles » au lieu de « 3 »), il n'y a plus qu'un endroit à modifier. C'est le réflexe de la leçon sur les fonctions, appliqué à un vrai projet.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Fais fonctionner le compteur : le clic sur <code>+1</code> doit augmenter le nombre affiché, le clic sur <code>-1</code> doit le diminuer. Utilise une variable, deux <code>addEventListener</code>, et mets à jour <code>#affichage</code> à chaque clic.',
      codeDepart: '<style>\n  body { text-align: center; font-family: sans-serif; }\n  #affichage { font-size: 60px; margin: 20px; }\n  button { font-size: 24px; padding: 8px 24px; }\n</style>\n\n<div id="affichage">0</div>\n<button id="moins">-1</button>\n<button id="plus">+1</button>\n\n<script>\n  let compteur = 0;\n\n  // À toi de jouer !\n\n</script>',
      indices: [
        "Trois choses à relier : une variable qui retient le nombre, deux écouteurs, et l’affichage à remettre à jour après chaque changement.",
        "La variable vit <strong>en dehors</strong> des écouteurs — sinon elle repartirait de zéro à chaque clic. Chaque écouteur la modifie, puis réécrit <code>#affichage</code>.",
        "Dans l’écouteur de <code>#plus</code> : <code>compteur = compteur + 1;</code> puis <code>document.querySelector(\"#affichage\").textContent = compteur;</code>"
      ],
      solution: '<style>\n  body { text-align: center; font-family: sans-serif; }\n  #affichage { font-size: 60px; margin: 20px; }\n  button { font-size: 24px; padding: 8px 24px; }\n</style>\n\n<div id="affichage">0</div>\n<button id="moins">-1</button>\n<button id="plus">+1</button>\n\n<script>\n  let compteur = 0;\n\n  document.querySelector("#plus").addEventListener("click", function () {\n    compteur = compteur + 1;\n    document.querySelector("#affichage").textContent = compteur;\n  });\n\n  document.querySelector("#moins").addEventListener("click", function () {\n    compteur = compteur - 1;\n    document.querySelector("#affichage").textContent = compteur;\n  });\n</script>',
      verifier: function (ctx) {
        const plus = ctx.doc.querySelector('#plus');
        const moins = ctx.doc.querySelector('#moins');
        const aff = ctx.doc.querySelector('#affichage');
        if (!plus || !moins || !aff) return { ok: false, message: 'Garde les deux boutons <code>#plus</code> / <code>#moins</code> et le <code>#affichage</code> du code de départ.' };
        const depart = parseInt(aff.textContent) || 0;
        plus.click();
        plus.click();
        const apresPlus = parseInt(aff.textContent);
        if (apresPlus !== depart + 2) return { ok: false, message: 'J\'ai cliqué deux fois sur +1 : l\'affichage devrait montrer ' + (depart + 2) + ', il montre « ' + aff.textContent + ' ». Vérifie l\'écouteur du bouton <code>#plus</code> : augmenter la variable PUIS mettre à jour <code>#affichage</code>.' };
        moins.click();
        const apresMoins = parseInt(aff.textContent);
        if (apresMoins !== depart + 1) return { ok: false, message: 'Le +1 marche parfaitement ! Mais après un clic sur -1, l\'affichage devrait montrer ' + (depart + 1) + ', il montre « ' + aff.textContent + ' ». Vérifie l\'écouteur du bouton <code>#moins</code>.' };
        return { ok: true, message: '🏆 PROJET RÉUSSI ! Tu es parti de zéro, et tu viens de coder une application interactive complète, seul.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi bonus : le plancher.</strong> Reprends ton compteur (ou la solution) et améliore-le : le compteur ne doit JAMAIS descendre en dessous de 0. Un <code>if</code> bien placé dans l\'écouteur du bouton moins suffit !',
      codeDepart: '<style>\n  body { text-align: center; font-family: sans-serif; }\n  #affichage { font-size: 60px; margin: 20px; }\n  button { font-size: 24px; padding: 8px 24px; }\n</style>\n\n<div id="affichage">0</div>\n<button id="moins">-1</button>\n<button id="plus">+1</button>\n\n<script>\n  let compteur = 0;\n\n  document.querySelector("#plus").addEventListener("click", function () {\n    compteur = compteur + 1;\n    document.querySelector("#affichage").textContent = compteur;\n  });\n\n  document.querySelector("#moins").addEventListener("click", function () {\n    compteur = compteur - 1;\n    document.querySelector("#affichage").textContent = compteur;\n  });\n</script>',
      indices: [
        "Une seule ligne à ajouter, et une seule question à trancher : empêcher la descente, ou la corriger après coup.",
        "Soit on ne retire 1 que si le compteur est encore au-dessus de 0, soit on retire puis on remonte à 0 si on est passé en dessous.",
        "<code>if (compteur &gt; 0) { compteur = compteur - 1; }</code> dans l’écouteur du bouton moins."
      ],
      solution: '<style>\n  body { text-align: center; font-family: sans-serif; }\n  #affichage { font-size: 60px; margin: 20px; }\n  button { font-size: 24px; padding: 8px 24px; }\n</style>\n\n<div id="affichage">0</div>\n<button id="moins">-1</button>\n<button id="plus">+1</button>\n\n<script>\n  let compteur = 0;\n\n  document.querySelector("#plus").addEventListener("click", function () {\n    compteur = compteur + 1;\n    document.querySelector("#affichage").textContent = compteur;\n  });\n\n  document.querySelector("#moins").addEventListener("click", function () {\n    if (compteur > 0) {\n      compteur = compteur - 1;\n    }\n    document.querySelector("#affichage").textContent = compteur;\n  });\n</script>',
      verifier: function (ctx) {
        const plus = ctx.doc.querySelector('#plus');
        const moins = ctx.doc.querySelector('#moins');
        const aff = ctx.doc.querySelector('#affichage');
        if (!plus || !moins || !aff) return { ok: false, message: 'Garde les deux boutons et l\'affichage.' };
        moins.click();
        moins.click();
        if (parseInt(aff.textContent) < 0) return { ok: false, message: 'J\'ai cliqué deux fois sur -1 depuis zéro : l\'affichage montre « ' + aff.textContent + ' » — il devrait rester à 0. Ajoute le <code>if</code> dans l\'écouteur du moins.' };
        plus.click();
        plus.click();
        moins.click();
        if (parseInt(aff.textContent) !== 1) return { ok: false, message: 'Le plancher marche, mais le compteur normal est cassé : +1, +1, -1 devrait donner 1 (affiché : « ' + aff.textContent + ' »).' };
        return { ok: true, message: '🏆🏆 MODULE JAVASCRIPT TERMINÉ ! Gérer les « cas limites » (comme le zéro), c\'est ce qui distingue un programme qui marche d\'un programme solide. Direction le JavaScript avancé.' };
      }
    }
  ]
},

];
