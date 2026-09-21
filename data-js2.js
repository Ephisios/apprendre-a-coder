/* ===== Module JavaScript — partie 2 (leçons 7 à 12) ===== */
window.DATA_JS2 = [

{
  id: 'js-7',
  titre: 'Les boucles : répéter sans se fatiguer',
  contenu: `
<p>Afficher les nombres de 1 à 1000 ? Hors de question d'écrire 1000 lignes. Les <strong>boucles</strong> font répéter du code autant de fois que nécessaire — c'est là que l'ordinateur devient vraiment plus fort que nous.</p>

<h2>La boucle for</h2>
<pre class="bloc-code">for (let i = 1; i <= 5; i++) {
  console.log("Tour numéro " + i);
}</pre>
<p>Résultat : « Tour numéro 1 », « Tour numéro 2 »... jusqu'à 5. La parenthèse contient trois parties, séparées par des points-virgules :</p>
<ol>
<li><code>let i = 1</code> — le <strong>départ</strong> : on crée un compteur <code>i</code> qui commence à 1 ;</li>
<li><code>i &lt;= 5</code> — la <strong>condition pour continuer</strong> : tant que <code>i</code> ne dépasse pas 5, on refait un tour ;</li>
<li><code>i++</code> — <strong>après chaque tour</strong> : augmente <code>i</code> de 1 (<code>i++</code> est le raccourci de <code>i = i + 1</code>).</li>
</ol>
<p>Le compteur s'appelle traditionnellement <code>i</code>, et il est utilisable dans la boucle — c'est ce qui rend chaque tour différent.</p>

<h2>La boucle while</h2>
<p>Quand on ne sait pas d'avance combien de tours il faudra : <code>while</code> (« tant que ») répète tant que sa condition est vraie.</p>
<pre class="bloc-code">let energie = 10;
while (energie > 0) {
  console.log("Je cours ! Énergie : " + energie);
  energie = energie - 2;
}</pre>

<h2>Le motif « accumulateur »</h2>
<p>Très souvent, on utilise une boucle pour <strong>accumuler</strong> un résultat dans une variable créée avant la boucle :</p>
<pre class="bloc-code">let total = 0;
for (let i = 1; i <= 5; i++) {
  total = total + i;      // ou : total += i;
}
console.log(total);       // 1+2+3+4+5 = 15</pre>

<div class="attention">⚠️ Avec <code>while</code>, si la condition ne devient jamais fausse (par exemple si on oublie de diminuer <code>energie</code>), la boucle tourne pour toujours : c'est la fameuse <strong>boucle infinie</strong>. Ici, pas de panique : l'éditeur la détecte et arrête ton code au bout de 3 secondes.</div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Écris le décompte d\'une fusée avec une boucle <code>for</code> : affiche les nombres de <code>5</code> à <code>1</code> (dans cet ordre décroissant !), puis, après la boucle, affiche <code>Décollage !</code>. Astuce : un compteur peut aussi descendre, avec <code>i--</code>.',
      codeDepart: '// Le compte à rebours\n',
      indice: 'Départ à 5, on continue tant que <code>i >= 1</code>, et on descend : <code>for (let i = 5; i >= 1; i--) { ... }</code>. Le « Décollage ! » se met après l\'accolade fermante.',
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
      indice: '<code>for (let i = 1; i <= 8; i++) { tirelire += i; }</code> puis <code>console.log(tirelire);</code> après l\'accolade fermante.',
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
      indice: '<code>for (let i = 1; i <= 10; i++) { console.log(\`7 x \${i} = \${7 * i}\`); }</code> — deux <code>\${}</code> dans le même texte, dont un contenant un calcul.',
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
<p>Une variable stocke UNE valeur. Pour une liste de courses, une liste de scores, une liste de contacts... il nous faut un <strong>tableau</strong> (<em>array</em>).</p>

<h2>Créer et lire un tableau</h2>
<pre class="bloc-code">let fruits = ["pomme", "banane", "cerise"];

console.log(fruits[0]);      // pomme
console.log(fruits[1]);      // banane
console.log(fruits.length);  // 3</pre>
<ul>
<li>les crochets <code>[ ]</code> créent le tableau, les valeurs sont séparées par des virgules ;</li>
<li>chaque valeur a une position, appelée <strong>index</strong>... et attention : <strong>on compte à partir de 0</strong> ! <code>fruits[0]</code> est le premier élément ;</li>
<li><code>.length</code> donne le nombre d'éléments.</li>
</ul>

<div class="info">💬 Pourquoi compter depuis 0 ? Héritage historique de la façon dont la mémoire fonctionne. Tous les langages majeurs font pareil — au début on se trompe tous, puis ça devient une seconde nature. Conséquence utile : le DERNIER élément est à l'index <code>length - 1</code>, donc <code>fruits[fruits.length - 1]</code>.</div>

<h2>Modifier un tableau</h2>
<pre class="bloc-code">let fruits = ["pomme", "banane"];
fruits.push("cerise");        // ajoute à la fin
console.log(fruits);          // ["pomme","banane","cerise"]
fruits[0] = "poire";          // remplace le premier
console.log(fruits.length);   // 3</pre>

<h2>Le duo magique : tableau + boucle</h2>
<p>Les tableaux et les boucles sont faits l'un pour l'autre :</p>
<pre class="bloc-code">let invites = ["Léa", "Tom", "Nina"];

for (let i = 0; i < invites.length; i++) {
  console.log("Bienvenue " + invites[i] + " !");
}</pre>
<p>Remarque la condition <code>i &lt; invites.length</code> : comme on compte de 0, le dernier index est <code>length - 1</code>. Ce motif exact, tu l'écriras des centaines de fois dans ta vie de codeur.</p>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Crée un tableau <code>courses</code> avec 3 articles de ton choix. Ajoutes-en un 4e avec <code>push</code>. Puis parcours le tableau avec une boucle <code>for</code> pour afficher chaque article précédé d\'un tiret, par exemple <code>- pain</code>.',
      codeDepart: '// Ta liste de courses\n',
      indice: 'Création : <code>let courses = ["a", "b", "c"];</code> puis <code>courses.push("d");</code> puis la boucle : <code>for (let i = 0; i < courses.length; i++) { console.log("- " + courses[i]); }</code>',
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
      indice: 'Départ : <code>etapes[0]</code>. Arrivée : <code>etapes[etapes.length - 1]</code> (6 éléments → dernier index 5). Total : <code>etapes.length</code>.',
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
      indice: 'Dans la boucle : <code>somme += notes[i];</code>. Après la boucle : <code>let moyenne = somme / notes.length;</code> puis les deux console.log.',
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
<p>Tu utilises <code>console.log(...)</code> depuis le début : quelqu'un a écrit cette fonctionnalité une fois, et tout le monde la réutilise. Une <strong>fonction</strong>, c'est exactement ça : un bloc de code réutilisable, avec un nom.</p>

<h2>Créer et appeler une fonction</h2>
<pre class="bloc-code">function direBonjour() {
  console.log("Bonjour !");
  console.log("Bienvenue chez nous.");
}

direBonjour();   // exécute le bloc
direBonjour();   // et encore une fois</pre>
<p>Deux temps : on <strong>définit</strong> la fonction (le code ne s'exécute pas encore !), puis on l'<strong>appelle</strong> par son nom suivi de parenthèses, autant de fois qu'on veut.</p>

<h2>Les paramètres : rendre la fonction flexible</h2>
<pre class="bloc-code">function saluer(prenom) {
  console.log("Bonjour " + prenom + " !");
}

saluer("Léa");    // Bonjour Léa !
saluer("Tom");    // Bonjour Tom !</pre>
<p><code>prenom</code> est un <strong>paramètre</strong> : une variable qui reçoit la valeur passée entre les parenthèses à l'appel. Même code, résultats différents.</p>

<h2>return : la fonction qui répond</h2>
<pre class="bloc-code">function doubler(nombre) {
  return nombre * 2;
}

let resultat = doubler(21);
console.log(resultat);        // 42
console.log(doubler(5) + 1);  // 11</pre>
<p><code>return</code> <strong>renvoie</strong> une valeur à celui qui a appelé la fonction — on peut la ranger dans une variable ou l'utiliser dans un calcul. C'est la différence clé : <code>console.log</code> <em>affiche</em> (pour tes yeux), <code>return</code> <em>renvoie</em> (pour le programme).</p>

<div class="astuce">✅ Pourquoi c'est si important ? Un programme bien écrit est un assemblage de petites fonctions qui font chacune UNE chose. C'est ce qui permet de construire des logiciels géants sans s'y perdre.</div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Écris une fonction <code>aireRectangle</code> qui prend deux paramètres <code>largeur</code> et <code>hauteur</code>, et <strong>retourne</strong> leur produit. Puis affiche le résultat de <code>aireRectangle(6, 4)</code> et celui de <code>aireRectangle(10, 3)</code>.',
      codeDepart: 'function aireRectangle(largeur, hauteur) {\n  // à compléter\n}\n\n// Appelle la fonction et affiche les résultats\n',
      indice: 'Dans la fonction : <code>return largeur * hauteur;</code>. Ensuite : <code>console.log(aireRectangle(6, 4));</code>',
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
      indice: 'Dans la fonction : <code>if (age < 12) { return "enfant"; } else if (age < 18) { return "ado"; } return "adulte";</code> — dès qu\'un return s\'exécute, la fonction s\'arrête !',
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
      indice: 'Dans <code>ticket</code>, appelle l\'autre fonction : <code>return \`\${nom} : \${prixTTC(prixHT)} euros TTC\`;</code> — une fonction peut en appeler une autre !',
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
<p>Décrire une personne avec des variables séparées (<code>prenom</code>, <code>age</code>, <code>ville</code>...), ça devient vite le chaos. Un <strong>objet</strong> regroupe des informations liées dans une seule structure.</p>

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
<li>on accède à une valeur avec le <strong>point</strong> : <code>objet.cle</code>.</li>
</ul>

<h2>Modifier un objet</h2>
<pre class="bloc-code">chat.age = 4;              // anniversaire !
chat.jouet = "souris";     // nouvelle clé, créée à la volée
console.log(chat.age);     // 4</pre>

<h2>Des objets dans des tableaux</h2>
<p>Le combo qui fait tourner le monde : un tableau d'objets. C'est exactement la forme des données de toutes les applications (une liste de contacts, de produits, de films...).</p>
<pre class="bloc-code">let films = [
  { titre: "Alien", annee: 1979 },
  { titre: "Titanic", annee: 1997 }
];

for (let i = 0; i < films.length; i++) {
  console.log(films[i].titre + " (" + films[i].annee + ")");
}</pre>

<div class="info">💬 Ce format te dit quelque chose ? Les données échangées sur internet (le « JSON ») s'écrivent quasiment pareil. En apprenant les objets JavaScript, tu apprends la langue des données du web.</div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Crée un objet <code>livre</code> avec trois clés : <code>titre</code> (texte), <code>auteur</code> (texte) et <code>pages</code> (nombre). Affiche ensuite la phrase <code>[titre], de [auteur]</code> en utilisant les clés de l\'objet, puis ajoute une clé <code>lu</code> valant <code>true</code>, et affiche l\'objet entier avec <code>console.log(livre)</code>.',
      codeDepart: 'let livre = {\n\n};\n',
      indice: 'Dans les accolades : <code>titre: "...", auteur: "...", pages: 250</code>. La phrase : <code>console.log(livre.titre + ", de " + livre.auteur);</code>. La nouvelle clé : <code>livre.lu = true;</code>',
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
      indice: 'Dans la boucle : <code>console.log(\`\${playlist[i].titre} — \${playlist[i].duree} min\`);</code> et l\'accumulateur : <code>total += playlist[i].duree;</code>',
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
      indice: 'Dans la fonction : boucle sur contacts, et <code>if (contacts[i].nom === nom) { return contacts[i].tel; }</code>. Le <code>return "Inconnu";</code> se place APRÈS la boucle — il ne s\'exécute que si rien n\'a été trouvé.',
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
<p>Moment charnière : on va réunir tes trois compétences. Le JavaScript peut <strong>lire et modifier la page HTML</strong> en direct — c'est comme ça que les sites deviennent interactifs.</p>

<h2>Attraper un élément</h2>
<pre class="bloc-code">&lt;p id="message"&gt;Texte de départ&lt;/p&gt;

&lt;script&gt;
  let el = document.querySelector("#message");
  el.textContent = "Texte remplacé par le JavaScript !";
&lt;/script&gt;</pre>
<ul>
<li>le JavaScript s'écrit dans une balise <code>&lt;script&gt;</code>, placée <strong>après</strong> le HTML qu'il manipule ;</li>
<li><code>document</code> — l'objet qui représente toute la page ;</li>
<li><code>querySelector("...")</code> — trouve le premier élément correspondant au sélecteur, <strong>exactement comme en CSS</strong> : <code>"#message"</code> pour un id, <code>".classe"</code> pour une classe, <code>"p"</code> pour une balise. Ton CSS resservait déjà !</li>
<li><code>.textContent</code> — le texte de l'élément, qu'on peut lire ou remplacer.</li>
</ul>

<h2>Réagir à un clic</h2>
<pre class="bloc-code">&lt;button id="btn"&gt;Clique-moi&lt;/button&gt;
&lt;p id="message"&gt;En attente...&lt;/p&gt;

&lt;script&gt;
  let btn = document.querySelector("#btn");

  btn.addEventListener("click", function () {
    document.querySelector("#message").textContent = "Tu as cliqué !";
  });
&lt;/script&gt;</pre>
<p><code>addEventListener("click", ...)</code> se lit : « écoute les clics sur cet élément, et à chaque clic, exécute cette fonction ». La fonction sans nom (<em>fonction anonyme</em>) est simplement du code mis en attente jusqu'au clic.</p>

<div class="astuce">✅ C'est LE mécanisme de toute interface : <strong>un événement se produit (clic, saisie, survol...) → une fonction s'exécute → la page change</strong>. Tout le reste n'est que variation.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le bouton ne fait rien. Dans la balise <code>&lt;script&gt;</code>, ajoute un écouteur de clic qui remplace le texte du paragraphe <code>#resultat</code> par <code>Bravo, ça marche !</code>. Teste ensuite en cliquant sur le bouton dans l\'aperçu, puis clique sur Vérifier.',
      codeDepart: '<button id="btn">Clique-moi</button>\n<p id="resultat">En attente d\'un clic...</p>\n\n<script>\n  let btn = document.querySelector("#btn");\n\n  // Ajoute l\'écouteur de clic ici\n\n</script>',
      indice: 'Modèle complet :<br><code>btn.addEventListener("click", function () {<br>&nbsp;&nbsp;document.querySelector("#resultat").textContent = "Bravo, ça marche !";<br>});</code>',
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
      indice: 'Deux blocs indépendants, sur le même modèle que l\'exercice 1 : un <code>addEventListener</code> sur <code>#soleil</code>, un autre sur <code>#pluie</code>, chacun changeant <code>#humeur</code>.',
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
<p>Dernière leçon du module — et cette fois, c'est TOI qui construis. Un compteur interactif : deux boutons, un nombre qui monte et descend. C'est petit, mais ça contient tout : variables, fonctions, événements, DOM.</p>

<h2>Le plan de bataille</h2>
<p>Tout projet, même géant, se découpe en petites étapes. Voici les tiennes :</p>
<ol>
<li>le HTML est fourni : deux boutons et un affichage ;</li>
<li>crée une variable <code>compteur</code> qui démarre à 0 ;</li>
<li>au clic sur <code>#plus</code> : augmente la variable de 1, puis mets à jour l'affichage ;</li>
<li>au clic sur <code>#moins</code> : pareil, en enlevant 1.</li>
</ol>

<h2>Le morceau nouveau (et le seul !)</h2>
<p>Pour afficher un nombre dans un élément, on le range dans <code>textContent</code> :</p>
<pre class="bloc-code">document.querySelector("#affichage").textContent = compteur;</pre>
<p>Tout le reste, tu le connais déjà. Prends ton temps, relance avec <strong>Vérifier ma réponse</strong> à chaque étape, et souviens-toi : les erreurs sont des indices, pas des échecs.</p>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Fais fonctionner le compteur : le clic sur <code>+1</code> doit augmenter le nombre affiché, le clic sur <code>-1</code> doit le diminuer. Utilise une variable, deux <code>addEventListener</code>, et mets à jour <code>#affichage</code> à chaque clic.',
      codeDepart: '<style>\n  body { text-align: center; font-family: sans-serif; }\n  #affichage { font-size: 60px; margin: 20px; }\n  button { font-size: 24px; padding: 8px 24px; }\n</style>\n\n<div id="affichage">0</div>\n<button id="moins">-1</button>\n<button id="plus">+1</button>\n\n<script>\n  let compteur = 0;\n\n  // À toi de jouer !\n\n</script>',
      indice: 'Pour le bouton plus :<br><code>document.querySelector("#plus").addEventListener("click", function () {<br>&nbsp;&nbsp;compteur = compteur + 1;<br>&nbsp;&nbsp;document.querySelector("#affichage").textContent = compteur;<br>});</code><br>Puis pareil pour <code>#moins</code> avec <code>- 1</code>.',
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
      indice: 'Dans l\'écouteur du moins, deux options : ne décrémenter que <code>if (compteur > 0)</code>, ou décrémenter puis corriger : <code>if (compteur < 0) { compteur = 0; }</code>.',
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
