/* ===== Module JavaScript avancé ===== */
window.DATA_JSAVANCE = [

{
  id: 'jsav-1',
  titre: 'Boucles et tableaux, version moderne',
  contenu: `
<p>Tu maîtrises la boucle <code>for</code> classique. Voici maintenant les outils que les développeurs utilisent au quotidien pour travailler plus vite avec les tableaux.</p>

<h2>La boucle for...of : plus simple, plus lisible</h2>
<pre class="bloc-code">let fruits = ["pomme", "banane", "cerise"];

for (const fruit of fruits) {
  console.log(fruit);
}</pre>
<p>Ça se lit : « pour chaque <code>fruit</code> du tableau <code>fruits</code>... ». Plus de compteur <code>i</code>, plus de <code>fruits[i]</code> : la variable <code>fruit</code> prend directement chaque valeur, une par une. Quand tu n'as pas besoin de l'index, c'est la boucle à préférer.</p>

<h2>Trois méthodes de tableau très utiles</h2>
<pre class="bloc-code">let invites = ["Léa", "Tom", "Nina"];

console.log(invites.includes("Tom"));   // true — est-ce dans la liste ?
console.log(invites.indexOf("Nina"));   // 2 — à quelle position ? (-1 si absent)
console.log(invites.join(" et "));      // "Léa et Tom et Nina" — coller en un texte</pre>

<div class="astuce">✅ <code>includes</code> retourne <code>true</code> ou <code>false</code> : c'est un booléen, parfait dans un <code>if</code> : <code>if (invites.includes("Tom")) { ... }</code></div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Réécris ce programme avec une boucle <code>for...of</code> (sans compteur <code>i</code>, sans crochets) : il doit afficher chaque animal précédé de <code>J\'aime les</code>.',
      codeDepart: 'let animaux = ["chats", "chiens", "pandas"];\n\nfor (let i = 0; i < animaux.length; i++) {\n  console.log("J\'aime les " + animaux[i]);\n}',
      indice: '<code>for (const animal of animaux) { console.log("J\'aime les " + animal); }</code>',
      solution: 'let animaux = ["chats", "chiens", "pandas"];\n\nfor (const animal of animaux) {\n  console.log("J\'aime les " + animal);\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/for\s*\(\s*(const|let)\s+\w+\s+of\s+/.test(ctx.code)) return { ok: false, message: 'La consigne demande une boucle <code>for...of</code> : <code>for (const animal of animaux)</code>.' };
        if (/animaux\[/.test(ctx.code)) return { ok: false, message: 'Plus besoin des crochets <code>animaux[i]</code> avec for...of : la variable contient directement la valeur.' };
        if (ctx.logs.length < 3 || !/pandas/.test(ctx.logs[2])) return { ok: false, message: 'Le programme doit afficher les 3 phrases (« J\'aime les chats », etc.).' };
        return { ok: true, message: 'Compare avec l\'ancien code : même résultat, moitié moins de pièges. C\'est ça, le code moderne.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : le videur de boîte de nuit.</strong> Avec <code>includes</code>, vérifie si <code>"Sam"</code> est dans la liste des invités : affiche <code>Bienvenue Sam</code> si oui, <code>Désolé, tu n\'es pas sur la liste</code> sinon. Puis affiche la liste complète en un seul texte séparé par des virgules, avec <code>join(", ")</code>.',
      codeDepart: 'let invites = ["Léa", "Tom", "Sam", "Nina"];\n',
      indice: '<code>if (invites.includes("Sam")) { ... } else { ... }</code> puis <code>console.log(invites.join(", "));</code>',
      solution: 'let invites = ["Léa", "Tom", "Sam", "Nina"];\n\nif (invites.includes("Sam")) {\n  console.log("Bienvenue Sam");\n} else {\n  console.log("Désolé, tu n\'es pas sur la liste");\n}\n\nconsole.log(invites.join(", "));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/\.includes\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise la méthode <code>includes</code> dans ta condition — pas de boucle nécessaire !' };
        if (!/bienvenue/i.test(ctx.logs.join(' '))) return { ok: false, message: 'Sam est dans la liste : « Bienvenue Sam » devrait s\'afficher.' };
        if (!ctx.logs.includes('Léa, Tom, Sam, Nina')) return { ok: false, message: 'Il manque la liste en un seul texte : <code>invites.join(", ")</code> (avec la virgule ET l\'espace).' };
        return { ok: true, message: 'includes pour tester, join pour afficher : deux méthodes qui t\'éviteront des dizaines de boucles.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : l\'inventaire du jeu.</strong> Avec for...of et un accumulateur, compte combien de potions il y a dans l\'inventaire (réponse : 3). Puis vérifie avec <code>includes</code> si le joueur possède une <code>"épée"</code> et affiche <code>Prêt au combat !</code> ou <code>Il te faut une épée...</code>.',
      codeDepart: 'let inventaire = ["potion", "épée", "potion", "bouclier", "potion", "carte"];\n\nlet nbPotions = 0;\n',
      indice: '<code>for (const objet of inventaire) { if (objet === "potion") { nbPotions++; } }</code> — un if DANS la boucle. Puis le test <code>includes("épée")</code>.',
      solution: 'let inventaire = ["potion", "épée", "potion", "bouclier", "potion", "carte"];\n\nlet nbPotions = 0;\nfor (const objet of inventaire) {\n  if (objet === "potion") {\n    nbPotions++;\n  }\n}\nconsole.log(nbPotions);\n\nif (inventaire.includes("épée")) {\n  console.log("Prêt au combat !");\n} else {\n  console.log("Il te faut une épée...");\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/of\s+inventaire/.test(ctx.code)) return { ok: false, message: 'Parcours l\'inventaire avec <code>for...of</code>.' };
        if (!ctx.logs.includes('3')) return { ok: false, message: 'Il y a 3 potions à compter : un <code>if (objet === "potion")</code> dans la boucle, qui incrémente le compteur.' };
        if (!/combat/i.test(ctx.logs.join(' '))) return { ok: false, message: 'Le comptage est bon ! L\'épée est dans l\'inventaire : « Prêt au combat ! » devrait s\'afficher (via <code>includes</code>).' };
        return { ok: true, message: 'Compter selon un critère : LE motif de base de l\'analyse de données. Tu viens de le faire comme un pro.' };
      }
    }
  ]
},

{
  id: 'jsav-2',
  titre: 'forEach, map, filter : la boîte à outils des pros',
  contenu: `
<p>Voici les trois méthodes que tu verras dans TOUT code JavaScript moderne. Elles prennent une fonction en argument — d'abord, un raccourci d'écriture indispensable :</p>

<h2>Les fonctions fléchées</h2>
<pre class="bloc-code">// Fonction classique          // Fonction fléchée (identique !)
function doubler(n) {          const doubler = (n) => n * 2;
  return n * 2;
}</pre>
<p>La flèche <code>=&gt;</code> remplace <code>function</code> et, sur une seule ligne, le <code>return</code> est automatique. Compact, très utilisé.</p>

<h2>Les trois mousquetaires</h2>
<pre class="bloc-code">let nombres = [1, 2, 3, 4, 5, 6];

// forEach : FAIRE quelque chose pour chaque élément
nombres.forEach((n) => console.log(n));

// map : TRANSFORMER chaque élément → nouveau tableau
let doubles = nombres.map((n) => n * 2);
console.log(doubles);    // [2,4,6,8,10,12]

// filter : GARDER certains éléments → nouveau tableau
let pairs = nombres.filter((n) => n % 2 === 0);
console.log(pairs);      // [2,4,6]</pre>

<div class="astuce">✅ Comment choisir ? <strong>forEach</strong> = « fais ça pour chacun » (affichage...). <strong>map</strong> = « transforme chacun » (même nombre d'éléments, valeurs modifiées). <strong>filter</strong> = « garde ceux qui... » (moins d'éléments, valeurs intactes).</div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Le tableau contient des prix en euros. 1) Avec <code>map</code>, crée un tableau <code>prixSoldes</code> où chaque prix est divisé par 2. 2) Affiche-le. 3) Avec <code>forEach</code>, affiche chaque prix soldé sous la forme <code>Prix soldé : X euros</code>.',
      codeDepart: 'let prix = [10, 24, 50, 8];\n',
      indice: '<code>let prixSoldes = prix.map((p) => p / 2);</code> puis <code>prixSoldes.forEach((p) => console.log(\`Prix soldé : \${p} euros\`));</code>',
      solution: 'let prix = [10, 24, 50, 8];\n\nlet prixSoldes = prix.map((p) => p / 2);\nconsole.log(prixSoldes);\n\nprixSoldes.forEach((p) => console.log(`Prix soldé : ${p} euros`));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/\.map\s*\(/.test(ctx.code)) return { ok: false, message: 'La transformation doit passer par <code>map</code> : <code>prix.map((p) => p / 2)</code>.' };
        if (!ctx.logs.some(l => l.includes('[5,12,25,4]') || l.replace(/\s/g, '').includes('[5,12,25,4]'))) return { ok: false, message: 'Affiche le tableau soldé : il doit valoir [5, 12, 25, 4].' };
        if (!/\.forEach\s*\(/.test(ctx.code)) return { ok: false, message: 'Le tableau est bon ! Maintenant l\'affichage ligne par ligne avec <code>forEach</code>.' };
        if (ctx.logs.filter(l => /Prix soldé/.test(l)).length < 4) return { ok: false, message: 'Le forEach doit afficher les 4 lignes « Prix soldé : X euros ».' };
        return { ok: true, message: 'map pour transformer, forEach pour agir : tu écris maintenant du JavaScript de 2026, pas de 2010.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : le tri des candidatures.</strong> Avec <code>filter</code>, crée un tableau <code>admis</code> contenant uniquement les notes supérieures ou égales à 10, puis affiche-le, puis affiche le NOMBRE d\'admis avec <code>.length</code> (réponse : [12, 15, 10, 18] puis 4).',
      codeDepart: 'let notes = [12, 7, 15, 3, 10, 18, 9];\n',
      indice: '<code>let admis = notes.filter((n) => n >= 10);</code> — la condition dans la flèche décide qui reste.',
      solution: 'let notes = [12, 7, 15, 3, 10, 18, 9];\n\nlet admis = notes.filter((n) => n >= 10);\nconsole.log(admis);\nconsole.log(admis.length);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/\.filter\s*\(/.test(ctx.code)) return { ok: false, message: 'Le tri doit passer par <code>filter</code> avec la condition <code>n >= 10</code>.' };
        if (!ctx.logs.some(l => l.replace(/\s/g, '').includes('[12,15,10,18]'))) return { ok: false, message: 'Le tableau des admis doit être [12, 15, 10, 18] — les notes ≥ 10, dans l\'ordre d\'origine.' };
        if (!ctx.logs.includes('4')) return { ok: false, message: 'Le filtre marche ! Affiche aussi le nombre d\'admis : <code>admis.length</code>.' };
        return { ok: true, message: 'filter + une condition = un tri de données en une ligne. Les boucles à 6 lignes, c\'est fini pour ça.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : la chaîne de traitement.</strong> Le grand art : ENCHAÎNER les méthodes. En une seule instruction (avec un point à la suite de l\'autre), filtre les températures positives PUIS transforme-les en Fahrenheit (<code>c * 1.8 + 32</code>), range le résultat dans <code>fahrenheit</code> et affiche-le (attendu : [68, 77, 50]).',
      codeDepart: 'let celsius = [20, -5, 25, -12, 10];\n\n// filter PUIS map, enchaînés\n',
      indice: 'L\'enchaînement : <code>celsius.filter((c) => c > 0).map((c) => c * 1.8 + 32)</code> — le map s\'applique au résultat du filter.',
      solution: 'let celsius = [20, -5, 25, -12, 10];\n\nlet fahrenheit = celsius.filter((c) => c > 0).map((c) => c * 1.8 + 32);\nconsole.log(fahrenheit);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/\.filter\s*\([^)]*\)\s*[\s\S]{0,10}\.map\s*\(/.test(ctx.code.replace(/\n/g, ' '))) return { ok: false, message: 'Le défi : enchaîner directement <code>.filter(...).map(...)</code> en une seule instruction.' };
        if (!ctx.logs.some(l => l.replace(/\s/g, '').includes('[68,77,50]'))) return { ok: false, message: 'Résultat attendu : [68, 77, 50]. Vérifie l\'ordre (filter d\'abord, sinon tu convertis aussi les négatifs !) et la formule <code>c * 1.8 + 32</code>.' };
        return { ok: true, message: 'Les chaînes filter/map, c\'est le quotidien du traitement de données — de l\'appli météo aux tableaux de bord d\'entreprise.' };
      }
    }
  ]
},

{
  id: 'jsav-3',
  titre: 'Math, hasard et arrondis',
  contenu: `
<p>JavaScript embarque une boîte à outils mathématique : l'objet <code>Math</code>. En voici le best-of.</p>

<h2>Arrondir</h2>
<pre class="bloc-code">Math.round(4.7)   // 5   arrondi classique
Math.floor(4.7)   // 4   vers le bas (plancher)
Math.ceil(4.2)    // 5   vers le haut (plafond)
(3.14159).toFixed(2)   // "3.14"  garde 2 décimales (donne un TEXTE)</pre>

<h2>Le hasard : Math.random()</h2>
<pre class="bloc-code">Math.random()     // un nombre au hasard entre 0 et 1 (ex : 0.7264...)</pre>
<p>Pour obtenir un entier entre 1 et 6 (un dé !), la formule consacrée :</p>
<pre class="bloc-code">let de = Math.floor(Math.random() * 6) + 1;</pre>
<p>Décodage : <code>random()</code> donne 0 à 0.999..., fois 6 → 0 à 5.999..., <code>floor</code> → 0 à 5, plus 1 → <strong>1 à 6</strong>. Cette formule sert dans tous les jeux.</p>

<h2>Convertir du texte en nombre</h2>
<pre class="bloc-code">Number("42")       // 42 — le texte devient un nombre
Number("3.5")      // 3.5
"5" + 3            // "53" !! piège : + colle les textes
Number("5") + 3    // 8   ✓</pre>
<div class="attention">⚠️ Ce piège est réel : les champs de saisie des pages web donnent toujours du TEXTE. Avant de calculer avec, on convertit avec <code>Number()</code>. Tu vas le vivre dès la leçon 5 !</div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Lance le dé ! Avec la formule de la leçon, crée une variable <code>de</code> contenant un nombre entier au hasard entre 1 et 6, et affiche <code>Tu as fait un X !</code>. Reclique plusieurs fois sur <strong>Vérifier ma réponse</strong> : le nombre doit changer !',
      codeDepart: '// Le lancer de dé\n',
      indice: 'Trois morceaux, tous dans la leçon : <code>Math.random()</code> donne un nombre à virgule entre 0 et 1, la multiplication l\'étale sur la plage voulue, et <code>Math.floor</code> coupe la virgule. Attention au décalage : sans le <code>+ 1</code>, ton dé a une face 0.',
      solution: 'let de = Math.floor(Math.random() * 6) + 1;\nconsole.log(`Tu as fait un ${de} !`);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/Math\.random/.test(ctx.code)) return { ok: false, message: 'Le hasard vient de <code>Math.random()</code> — sans lui, ton dé est pipé !' };
        if (!/Math\.floor/.test(ctx.code)) return { ok: false, message: 'Il faut <code>Math.floor</code> pour transformer le nombre à virgule en entier.' };
        const m = ctx.logs.join(' ').match(/un\s+(\d+(?:\.\d+)?)/);
        if (!m) return { ok: false, message: 'Affiche la phrase « Tu as fait un X ! » avec le résultat dedans.' };
        const v = parseFloat(m[1]);
        if (!Number.isInteger(v) || v < 1 || v > 6) return { ok: false, message: 'Ton dé donne ' + v + ' — il doit donner un ENTIER entre 1 et 6. La formule exacte : <code>Math.floor(Math.random() * 6) + 1</code>.' };
        return { ok: true, message: 'Reclique plusieurs fois sur « Vérifier » pour voir le hasard en action. Cette formule anime tous les jeux de dés, cartes mélangées et loots aléatoires du monde.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : la caisse du magasin.</strong> Trois articles à 19.99, 4.50 et 12.30. Calcule le total, puis le total avec remise de 10% (<code>total * 0.9</code>), et affiche ce dernier arrondi à 2 décimales avec <code>toFixed(2)</code> (résultat attendu : <code>33.11</code>).',
      codeDepart: 'let a = 19.99;\nlet b = 4.50;\nlet c = 12.30;\n',
      indice: '<code>let total = a + b + c;</code> puis <code>let remise = total * 0.9;</code> puis <code>console.log(remise.toFixed(2));</code>',
      solution: 'let a = 19.99;\nlet b = 4.50;\nlet c = 12.30;\n\nlet total = a + b + c;\nlet remise = total * 0.9;\nconsole.log(remise.toFixed(2));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/toFixed/.test(ctx.code)) return { ok: false, message: 'L\'affichage propre passe par <code>.toFixed(2)</code> — essentiel pour les prix (sinon tu obtiens 33.111000000000004... les ordinateurs et les virgules, longue histoire !).' };
        if (!ctx.logs.includes('33.11')) return { ok: false, message: 'Résultat attendu : 33.11 — c\'est (19.99 + 4.50 + 12.30) × 0.9, arrondi à 2 décimales.' };
        return { ok: true, message: 'Au passage, tu as évité le célèbre bug des nombres à virgule flottante. Google « 0.1 + 0.2 JavaScript » un jour, tu vas sourire.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : pile ou face, 10 lancers.</strong> Avec une boucle de 10 tours et <code>Math.random() < 0.5</code> comme condition, simule 10 lancers de pièce : compte les « pile » dans une variable, et affiche à la fin <code>Pile : X / 10</code>. Exécute plusieurs fois : le score doit varier autour de 5 !',
      codeDepart: 'let nbPile = 0;\n\n// 10 lancers...\n',
      indice: '<code>for (let i = 0; i < 10; i++) { if (Math.random() < 0.5) { nbPile++; } }</code> puis l\'affichage.',
      solution: 'let nbPile = 0;\n\nfor (let i = 0; i < 10; i++) {\n  if (Math.random() < 0.5) {\n    nbPile++;\n  }\n}\n\nconsole.log(`Pile : ${nbPile} / 10`);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: '10 lancers = une boucle de 10 tours.' };
        if (!/Math\.random/.test(ctx.code)) return { ok: false, message: 'Chaque lancer utilise <code>Math.random() < 0.5</code> (une chance sur deux).' };
        const m = ctx.logs.join(' ').match(/Pile\s*:\s*(\d+)\s*\/\s*10/i);
        if (!m) return { ok: false, message: 'L\'affichage final attendu : <code>Pile : X / 10</code>.' };
        const v = parseInt(m[1]);
        if (v < 0 || v > 10) return { ok: false, message: 'Ton compte de piles (' + v + ') dépasse les bornes — vérifie que tu n\'incrémentes qu\'une fois par tour.' };
        return { ok: true, message: 'Tu viens d\'écrire une simulation aléatoire — la base des jeux, mais aussi des prévisions météo et des modèles financiers (en beaucoup plus gros).' };
      }
    }
  ]
},

{
  id: 'jsav-4',
  titre: 'Créer des éléments : le DOM dynamique',
  contenu: `
<p>Jusqu'ici, ton JavaScript modifiait des éléments existants. Niveau supérieur : <strong>créer</strong> des éléments de toutes pièces. C'est comme ça qu'une liste de tâches s'allonge ou qu'un fil d'actualité se remplit.</p>

<h2>Créer et ajouter</h2>
<pre class="bloc-code">let li = document.createElement("li");   // fabrique un &lt;li&gt; (en mémoire)
li.textContent = "Nouvel élément";       // le remplit
document.querySelector("#liste").appendChild(li);   // l'ajoute DANS la liste</pre>
<p>Trois temps : <strong>créer</strong> (createElement), <strong>remplir</strong> (textContent), <strong>attacher</strong> (appendChild). Tant qu'il n'est pas attaché, l'élément existe en mémoire mais reste invisible.</p>

<h2>Habiller l'élément créé</h2>
<pre class="bloc-code">li.classList.add("important");     // ajoute une classe CSS
li.classList.remove("important");  // la retire
li.classList.toggle("surligne");   // l'ajoute si absente, la retire si présente
li.style.color = "red";            // style direct (à petite dose !)</pre>
<p><code>classList</code> est le pont parfait entre JavaScript et CSS : le JS pose ou enlève des classes, le CSS décrit à quoi elles ressemblent. Chacun son métier.</p>

<h2>Vider un conteneur</h2>
<pre class="bloc-code">document.querySelector("#liste").innerHTML = "";   // supprime tout le contenu</pre>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Au clic sur le bouton, crée un nouvel élément <code>&lt;li&gt;</code> contenant <code>Une pomme de plus</code> et ajoute-le à la liste <code>#panier</code>. Chaque clic doit ajouter une ligne — teste dans l\'aperçu !',
      codeDepart: '<button id="ajouter">🍎 Ajouter une pomme</button>\n<ul id="panier"></ul>\n\n<script>\n  document.querySelector("#ajouter").addEventListener("click", function () {\n    // 1. créer le li — 2. le remplir — 3. l\'attacher\n\n  });\n</script>',
      indice: 'Les trois temps, dans l\'écouteur : <code>let li = document.createElement("li");</code> puis <code>li.textContent = "Une pomme de plus";</code> puis <code>document.querySelector("#panier").appendChild(li);</code>',
      solution: '<button id="ajouter">🍎 Ajouter une pomme</button>\n<ul id="panier"></ul>\n\n<script>\n  document.querySelector("#ajouter").addEventListener("click", function () {\n    let li = document.createElement("li");\n    li.textContent = "Une pomme de plus";\n    document.querySelector("#panier").appendChild(li);\n  });\n</script>',
      verifier: function (ctx) {
        const btn = ctx.doc.querySelector('#ajouter');
        const panier = ctx.doc.querySelector('#panier');
        if (!btn || !panier) return { ok: false, message: 'Garde le bouton et la liste <code>#panier</code>.' };
        btn.click();
        btn.click();
        btn.click();
        const lis = panier.querySelectorAll('li');
        if (lis.length === 0) return { ok: false, message: 'J\'ai cliqué 3 fois : aucune ligne n\'apparaît. Les trois temps : createElement, textContent, appendChild — dans cet ordre, dans l\'écouteur.' };
        if (lis.length !== 3) return { ok: false, message: 'Après 3 clics, il devrait y avoir 3 lignes (il y en a ' + lis.length + '). Tout doit se passer À L\'INTÉRIEUR de l\'écouteur de clic.' };
        if (!/pomme/i.test(lis[0].textContent)) return { ok: false, message: 'Chaque ligne doit contenir « Une pomme de plus » (via textContent).' };
        return { ok: true, message: 'Créer, remplir, attacher : le cycle de vie d\'un élément dynamique. Ta prochaine liste de tâches utilisera exactement ça.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : le surligneur.</strong> La classe CSS <code>.surligne</code> existe déjà. Fais que le clic sur le bouton <code>#marquer</code> AJOUTE cette classe au paragraphe <code>#phrase</code>, et que le clic sur <code>#effacer</code> la RETIRE. (classList.add / classList.remove)',
      codeDepart: '<style>\n  .surligne { background: #ffe97a; font-weight: bold; }\n</style>\n\n<p id="phrase">La phrase la plus importante de la page.</p>\n<button id="marquer">🖍️ Surligner</button>\n<button id="effacer">🧽 Effacer</button>\n\n<script>\n\n</script>',
      indice: 'Deux écouteurs : dans le premier <code>document.querySelector("#phrase").classList.add("surligne");</code>, dans le second <code>...classList.remove("surligne");</code>',
      solution: '<style>\n  .surligne { background: #ffe97a; font-weight: bold; }\n</style>\n\n<p id="phrase">La phrase la plus importante de la page.</p>\n<button id="marquer">🖍️ Surligner</button>\n<button id="effacer">🧽 Effacer</button>\n\n<script>\n  document.querySelector("#marquer").addEventListener("click", function () {\n    document.querySelector("#phrase").classList.add("surligne");\n  });\n\n  document.querySelector("#effacer").addEventListener("click", function () {\n    document.querySelector("#phrase").classList.remove("surligne");\n  });\n</script>',
      verifier: function (ctx) {
        const marquer = ctx.doc.querySelector('#marquer');
        const effacer = ctx.doc.querySelector('#effacer');
        const phrase = ctx.doc.querySelector('#phrase');
        if (!marquer || !effacer || !phrase) return { ok: false, message: 'Garde les deux boutons et le paragraphe du code de départ.' };
        marquer.click();
        if (!phrase.classList.contains('surligne')) return { ok: false, message: 'Le clic sur Surligner doit AJOUTER la classe : <code>classList.add("surligne")</code>.' };
        effacer.click();
        if (phrase.classList.contains('surligne')) return { ok: false, message: 'Le surlignage marche ! Mais Effacer doit RETIRER la classe : <code>classList.remove("surligne")</code>.' };
        return { ok: true, message: 'JS pose la classe, CSS la décrit : cette séparation des rôles est la marque d\'un code bien construit. (toggle aurait permis UN bouton qui alterne — à essayer !)' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : le générateur de palette.</strong> Au clic sur le bouton, génère 3 pastilles de couleur ALÉATOIRE : pour chacune, crée un <code>&lt;div&gt;</code>, donne-lui la classe <code>pastille</code> (fournie), et un fond aléatoire via <code>el.style.backgroundColor = \`rgb(\${r}, \${v}, \${b})\`</code> avec r, v, b tirés au hasard entre 0 et 255. Vide d\'abord <code>#palette</code> avec <code>innerHTML = ""</code> pour remplacer l\'ancienne palette !',
      codeDepart: '<style>\n  .pastille { display: inline-block; width: 90px; height: 90px; border-radius: 14px; margin: 6px; }\n</style>\n\n<button id="generer">🎨 Nouvelle palette</button>\n<div id="palette"></div>\n\n<script>\n  document.querySelector("#generer").addEventListener("click", function () {\n\n  });\n</script>',
      indice: 'Dans l\'écouteur : vider (<code>palette.innerHTML = ""</code>), puis une boucle de 3 tours qui fait : createElement("div") → classList.add("pastille") → 3 nombres <code>Math.floor(Math.random() * 256)</code> → style.backgroundColor → appendChild.',
      solution: '<style>\n  .pastille { display: inline-block; width: 90px; height: 90px; border-radius: 14px; margin: 6px; }\n</style>\n\n<button id="generer">🎨 Nouvelle palette</button>\n<div id="palette"></div>\n\n<script>\n  document.querySelector("#generer").addEventListener("click", function () {\n    let palette = document.querySelector("#palette");\n    palette.innerHTML = "";\n\n    for (let i = 0; i < 3; i++) {\n      let pastille = document.createElement("div");\n      pastille.classList.add("pastille");\n      let r = Math.floor(Math.random() * 256);\n      let v = Math.floor(Math.random() * 256);\n      let b = Math.floor(Math.random() * 256);\n      pastille.style.backgroundColor = `rgb(${r}, ${v}, ${b})`;\n      palette.appendChild(pastille);\n    }\n  });\n</script>',
      verifier: function (ctx) {
        const btn = ctx.doc.querySelector('#generer');
        const palette = ctx.doc.querySelector('#palette');
        if (!btn || !palette) return { ok: false, message: 'Garde le bouton et le conteneur <code>#palette</code>.' };
        btn.click();
        let pastilles = palette.querySelectorAll('.pastille');
        if (pastilles.length !== 3) return { ok: false, message: 'Après un clic : 3 pastilles attendues (trouvées : ' + pastilles.length + '). Une boucle de 3 tours dans l\'écouteur, avec la classe <code>pastille</code> sur chaque div.' };
        const c1 = pastilles[0].style.backgroundColor;
        if (!c1 || !/rgb/.test(c1)) return { ok: false, message: 'Les pastilles n\'ont pas de couleur : <code>pastille.style.backgroundColor = \`rgb(\${r}, \${v}, \${b})\`</code> avec des valeurs aléatoires.' };
        btn.click();
        pastilles = palette.querySelectorAll('.pastille');
        if (pastilles.length !== 3) return { ok: false, message: 'Après un DEUXIÈME clic, il doit y avoir 3 pastilles (pas 6) : vide la palette avec <code>innerHTML = ""</code> au début de l\'écouteur.' };
        return { ok: true, message: 'Boucle + création + hasard + styles : quatre briques assemblées en un vrai petit outil. Clique encore, chaque palette est unique !' };
      }
    }
  ]
},

{
  id: 'jsav-5',
  titre: 'Lire ce que tape l\'utilisateur',
  contenu: `
<p>Un programme vraiment utile <strong>écoute</strong> son utilisateur. La porte d'entrée : les champs <code>&lt;input&gt;</code> et leur propriété <code>.value</code>.</p>

<h2>Lire un champ</h2>
<pre class="bloc-code">&lt;input id="pseudo" type="text" placeholder="Ton pseudo"&gt;
&lt;button id="valider"&gt;OK&lt;/button&gt;
&lt;p id="salut"&gt;&lt;/p&gt;

&lt;script&gt;
  document.querySelector("#valider").addEventListener("click", function () {
    let pseudo = document.querySelector("#pseudo").value;
    document.querySelector("#salut").textContent = "Salut " + pseudo + " !";
  });
&lt;/script&gt;</pre>
<p><code>.value</code> donne le contenu ACTUEL du champ, au moment où on le lit — d'où l'importance de le lire <em>dans</em> l'écouteur, pas avant.</p>

<h2>Le piège du texte (le revoilà !)</h2>
<pre class="bloc-code">let age = document.querySelector("#age").value;   // "25" — du TEXTE !
console.log(age + 5);          // "255" 😱
console.log(Number(age) + 5);  // 30 ✓</pre>
<div class="attention">⚠️ <code>.value</code> renvoie TOUJOURS du texte, même pour un <code>type="number"</code>. Avant tout calcul : <code>Number(...)</code>. Ce bug précis a fait transpirer tous les débutants du monde.</div>

<h2>Réagir pendant la frappe</h2>
<pre class="bloc-code">champ.addEventListener("input", function () {
  console.log("Contenu actuel : " + champ.value);
});</pre>
<p>L'événement <code>"input"</code> se déclenche à CHAQUE caractère tapé — parfait pour les aperçus en direct et les compteurs de caractères.</p>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le badge personnalisé : au clic sur <code>#faire</code>, lis le contenu du champ <code>#prenom</code> et affiche <code>Bienvenue, [prénom] !</code> dans le paragraphe <code>#badge</code>. Teste en tapant ton prénom dans l\'aperçu !',
      codeDepart: '<input id="prenom" type="text" placeholder="Ton prénom">\n<button id="faire">Créer mon badge</button>\n<p id="badge"></p>\n\n<script>\n\n</script>',
      indice: 'Dans l\'écouteur du bouton : <code>let p = document.querySelector("#prenom").value;</code> puis <code>document.querySelector("#badge").textContent = \`Bienvenue, \${p} !\`;</code>',
      solution: '<input id="prenom" type="text" placeholder="Ton prénom">\n<button id="faire">Créer mon badge</button>\n<p id="badge"></p>\n\n<script>\n  document.querySelector("#faire").addEventListener("click", function () {\n    let p = document.querySelector("#prenom").value;\n    document.querySelector("#badge").textContent = `Bienvenue, ${p} !`;\n  });\n</script>',
      verifier: function (ctx) {
        const champ = ctx.doc.querySelector('#prenom');
        const btn = ctx.doc.querySelector('#faire');
        const badge = ctx.doc.querySelector('#badge');
        if (!champ || !btn || !badge) return { ok: false, message: 'Garde le champ, le bouton et le paragraphe <code>#badge</code>.' };
        champ.value = 'Testeur';
        btn.click();
        if (!/Bienvenue,?\s*Testeur/i.test(badge.textContent)) return { ok: false, message: 'J\'ai tapé « Testeur » et cliqué : le badge devrait afficher « Bienvenue, Testeur ! » (obtenu : « ' + badge.textContent + ' »). Lis <code>.value</code> DANS l\'écouteur.' };
        champ.value = 'Alice';
        btn.click();
        if (!/Alice/.test(badge.textContent)) return { ok: false, message: 'Presque ! Si je change le prénom et re-clique, le badge doit suivre : la lecture de <code>.value</code> doit être À L\'INTÉRIEUR de la fonction du clic, pas avant.' };
        return { ok: true, message: 'Lire au bon moment, c\'est LA subtilité des interfaces. Ton programme dialogue maintenant avec son utilisateur.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : la calculatrice d\'âge de chien.</strong> L\'utilisateur tape son âge dans <code>#age</code> ; au clic sur <code>#calculer</code>, affiche dans <code>#resultat</code> : <code>En années de chien : X</code> où X = l\'âge × 7. Piège de la leçon inclus : sans <code>Number()</code>, 5 × ... marche mais 5 + ... aurait collé les textes — convertis proprement !',
      codeDepart: '<input id="age" type="number" placeholder="Ton âge">\n<button id="calculer">Calculer</button>\n<p id="resultat"></p>\n\n<script>\n\n</script>',
      indice: '<code>let age = Number(document.querySelector("#age").value);</code> puis affiche <code>age * 7</code> dans le paragraphe.',
      solution: '<input id="age" type="number" placeholder="Ton âge">\n<button id="calculer">Calculer</button>\n<p id="resultat"></p>\n\n<script>\n  document.querySelector("#calculer").addEventListener("click", function () {\n    let age = Number(document.querySelector("#age").value);\n    document.querySelector("#resultat").textContent = `En années de chien : ${age * 7}`;\n  });\n</script>',
      verifier: function (ctx) {
        const champ = ctx.doc.querySelector('#age');
        const btn = ctx.doc.querySelector('#calculer');
        const res = ctx.doc.querySelector('#resultat');
        if (!champ || !btn || !res) return { ok: false, message: 'Garde le champ, le bouton et le paragraphe <code>#resultat</code>.' };
        if (!/Number\s*\(/.test(ctx.code)) return { ok: false, message: 'Convertis la saisie avec <code>Number(...)</code> — .value donne du texte, toujours.' };
        champ.value = '4';
        btn.click();
        if (!/28/.test(res.textContent)) return { ok: false, message: 'Pour un âge de 4, le résultat attendu est 28 (obtenu : « ' + res.textContent + ' »).' };
        champ.value = '10';
        btn.click();
        if (!/70/.test(res.textContent)) return { ok: false, message: 'Presque : avec 10, on attend 70. Relis le calcul dans ton écouteur.' };
        return { ok: true, message: 'Saisie → conversion → calcul → affichage : la chaîne complète d\'un vrai outil web. C\'est exactement le squelette d\'un convertisseur de devises ou d\'un simulateur de prêt.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : le compteur de caractères en direct.</strong> Comme sur les réseaux sociaux ! Avec l\'événement <code>"input"</code> (pas "click" !), affiche en permanence dans <code>#compte</code> le nombre de caractères tapés dans <code>#message</code>, au format <code>X / 100</code>. Bonus vérifié : si X dépasse 100, ajoute la classe <code>depasse</code> (fournie) au compteur, sinon retire-la.',
      codeDepart: '<style>\n  .depasse { color: red; font-weight: bold; }\n</style>\n\n<textarea id="message" placeholder="Écris ton message..."></textarea>\n<p id="compte">0 / 100</p>\n\n<script>\n  let champ = document.querySelector("#message");\n  let compte = document.querySelector("#compte");\n\n  champ.addEventListener("input", function () {\n\n  });\n</script>',
      indice: 'Dans l\'écouteur : <code>let n = champ.value.length;</code> puis <code>compte.textContent = \`\${n} / 100\`;</code> puis un if/else avec <code>classList.add("depasse")</code> / <code>classList.remove("depasse")</code>.',
      solution: '<style>\n  .depasse { color: red; font-weight: bold; }\n</style>\n\n<textarea id="message" placeholder="Écris ton message..."></textarea>\n<p id="compte">0 / 100</p>\n\n<script>\n  let champ = document.querySelector("#message");\n  let compte = document.querySelector("#compte");\n\n  champ.addEventListener("input", function () {\n    let n = champ.value.length;\n    compte.textContent = `${n} / 100`;\n    if (n > 100) {\n      compte.classList.add("depasse");\n    } else {\n      compte.classList.remove("depasse");\n    }\n  });\n</script>',
      verifier: function (ctx) {
        const champ = ctx.doc.querySelector('#message');
        const compte = ctx.doc.querySelector('#compte');
        if (!champ || !compte) return { ok: false, message: 'Garde le textarea et le paragraphe <code>#compte</code>.' };
        champ.value = 'Bonjour';
        champ.dispatchEvent(new ctx.win.Event('input'));
        if (!/7\s*\/\s*100/.test(compte.textContent)) return { ok: false, message: 'J\'ai simulé la frappe de « Bonjour » (7 caractères) : le compteur devrait afficher « 7 / 100 » (obtenu : « ' + compte.textContent + ' »). L\'événement à écouter est <code>"input"</code>, et la longueur vient de <code>champ.value.length</code>.' };
        champ.value = 'a'.repeat(120);
        champ.dispatchEvent(new ctx.win.Event('input'));
        if (!compte.classList.contains('depasse')) return { ok: false, message: 'Le comptage marche ! Avec 120 caractères, la classe <code>depasse</code> doit être ajoutée au compteur.' };
        champ.value = 'court';
        champ.dispatchEvent(new ctx.win.Event('input'));
        if (compte.classList.contains('depasse')) return { ok: false, message: 'Dernier détail : quand on repasse SOUS la limite, la classe doit être retirée (le else avec classList.remove).' };
        return { ok: true, message: 'Réaction en temps réel à la frappe : ton interface est vivante. Twitter, à un détail près.' };
      }
    }
  ]
},

{
  id: 'jsav-6',
  titre: 'localStorage : sauvegarder des données',
  contenu: `
<p>Ferme un onglet : tout ce que ton JavaScript avait en mémoire disparaît. Pour qu'une donnée <strong>survive</strong>, le navigateur offre un petit coffre-fort : le <code>localStorage</code>. C'est lui qui sauvegarde ta progression dans ce logiciel !</p>

<h2>Les trois opérations</h2>
<pre class="bloc-code">localStorage.setItem("pseudo", "Mathéo");   // sauvegarder (clé, valeur)
let p = localStorage.getItem("pseudo");     // relire → "Mathéo" (ou null si absent)
localStorage.removeItem("pseudo");          // effacer</pre>
<p>Une <strong>clé</strong> (le nom de la case) et une <strong>valeur</strong> : comme un objet, mais permanent. Les données restent après fermeture du navigateur, et même après redémarrage du PC.</p>

<h2>Le détail qui compte : tout est texte</h2>
<pre class="bloc-code">localStorage.setItem("score", 42);
let s = localStorage.getItem("score");   // "42" — du TEXTE (encore lui !)
let score = Number(s);                   // 42 ✓</pre>

<h2>Et pour les tableaux/objets ? JSON !</h2>
<pre class="bloc-code">let taches = ["courses", "sport"];
localStorage.setItem("taches", JSON.stringify(taches));  // objet → texte
let relu = JSON.parse(localStorage.getItem("taches"));   // texte → objet</pre>
<p><code>JSON.stringify</code> transforme n'importe quelle structure en texte, <code>JSON.parse</code> fait l'inverse. Ce duo est partout : c'est aussi le format des échanges entre sites web et serveurs.</p>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le mémo permanent : au clic sur <code>#sauver</code>, sauvegarde le contenu du champ <code>#note</code> dans le localStorage sous la clé <code>"ma-note"</code> et affiche <code>Sauvegardé !</code> dans <code>#etat</code>. Au clic sur <code>#relire</code>, relis la valeur et affiche-la dans <code>#etat</code>.',
      codeDepart: '<input id="note" type="text" placeholder="Une note à retenir...">\n<button id="sauver">💾 Sauver</button>\n<button id="relire">📖 Relire</button>\n<p id="etat"></p>\n\n<script>\n\n</script>',
      indice: 'Écouteur 1 : <code>localStorage.setItem("ma-note", document.querySelector("#note").value);</code> puis le message. Écouteur 2 : <code>etat.textContent = localStorage.getItem("ma-note");</code>',
      solution: '<input id="note" type="text" placeholder="Une note à retenir...">\n<button id="sauver">💾 Sauver</button>\n<button id="relire">📖 Relire</button>\n<p id="etat"></p>\n\n<script>\n  document.querySelector("#sauver").addEventListener("click", function () {\n    localStorage.setItem("ma-note", document.querySelector("#note").value);\n    document.querySelector("#etat").textContent = "Sauvegardé !";\n  });\n\n  document.querySelector("#relire").addEventListener("click", function () {\n    document.querySelector("#etat").textContent = localStorage.getItem("ma-note");\n  });\n</script>',
      verifier: function (ctx) {
        const note = ctx.doc.querySelector('#note');
        const sauver = ctx.doc.querySelector('#sauver');
        const relire = ctx.doc.querySelector('#relire');
        const etat = ctx.doc.querySelector('#etat');
        if (!note || !sauver || !relire || !etat) return { ok: false, message: 'Garde le champ, les deux boutons et le paragraphe <code>#etat</code>.' };
        try {
          note.value = 'Test de sauvegarde 123';
          sauver.click();
          if (ctx.win.localStorage.getItem('ma-note') !== 'Test de sauvegarde 123') { return { ok: false, message: 'Après le clic Sauver, la clé <code>"ma-note"</code> devrait contenir le texte du champ : <code>localStorage.setItem("ma-note", ...)</code>.' }; }
          if (!/sauvegardé/i.test(etat.textContent)) return { ok: false, message: 'La sauvegarde marche ! Affiche aussi « Sauvegardé ! » dans <code>#etat</code>.' };
          etat.textContent = '';
          relire.click();
          if (!/Test de sauvegarde 123/.test(etat.textContent)) return { ok: false, message: 'Le clic Relire doit afficher la valeur relue : <code>localStorage.getItem("ma-note")</code>.' };
          return { ok: true, message: 'Ta note survivrait à la fermeture du navigateur. C\'est EXACTEMENT le mécanisme qui sauvegarde ta progression dans ce logiciel.' };
        } finally {
          try { ctx.win.localStorage.removeItem('ma-note'); } catch (e) {}
        }
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : le score record.</strong> Un dé à lancer. À chaque clic sur <code>#lancer</code> : tire un nombre 1-100, affiche-le dans <code>#tirage</code>. Puis compare-le au record stocké (clé <code>"record"</code>, pense à <code>Number()</code> !) : s\'il le bat (ou si aucun record n\'existe), sauvegarde-le et affiche <code>Nouveau record : X</code> dans <code>#record</code>, sinon affiche <code>Record à battre : [record]</code>.',
      codeDepart: '<button id="lancer">🎲 Lancer (1-100)</button>\n<p id="tirage"></p>\n<p id="record"></p>\n\n<script>\n  document.querySelector("#lancer").addEventListener("click", function () {\n    let tirage = Math.floor(Math.random() * 100) + 1;\n    document.querySelector("#tirage").textContent = tirage;\n\n    // À toi : comparer au record stocké, sauvegarder si battu\n\n  });\n</script>',
      indice: '<code>let record = Number(localStorage.getItem("record"));</code> (null devient 0, pratique !). Puis <code>if (tirage > record) { localStorage.setItem("record", tirage); ... } else { ... }</code>',
      solution: '<button id="lancer">🎲 Lancer (1-100)</button>\n<p id="tirage"></p>\n<p id="record"></p>\n\n<script>\n  document.querySelector("#lancer").addEventListener("click", function () {\n    let tirage = Math.floor(Math.random() * 100) + 1;\n    document.querySelector("#tirage").textContent = tirage;\n\n    let record = Number(localStorage.getItem("record"));\n    if (tirage > record) {\n      localStorage.setItem("record", tirage);\n      document.querySelector("#record").textContent = `Nouveau record : ${tirage}`;\n    } else {\n      document.querySelector("#record").textContent = `Record à battre : ${record}`;\n    }\n  });\n</script>',
      verifier: function (ctx) {
        const btn = ctx.doc.querySelector('#lancer');
        const rec = ctx.doc.querySelector('#record');
        if (!btn || !rec) return { ok: false, message: 'Garde le bouton et les deux paragraphes.' };
        try {
          ctx.win.localStorage.setItem('record', '0');
          btn.click();
          const stocke1 = Number(ctx.win.localStorage.getItem('record'));
          if (!stocke1 || stocke1 < 1) return { ok: false, message: 'Premier lancer (record à 0) : le tirage devrait devenir le nouveau record stocké. Vérifie le <code>setItem</code> dans le if.' };
          if (!/record/i.test(rec.textContent)) return { ok: false, message: 'Affiche le résultat de la comparaison dans <code>#record</code>.' };
          ctx.win.localStorage.setItem('record', '999');
          btn.click();
          if (Number(ctx.win.localStorage.getItem('record')) !== 999) return { ok: false, message: 'Avec un record de 999 (imbattable ici), un nouveau lancer ne doit PAS l\'écraser — le setItem doit être uniquement dans le cas « battu ».' };
          if (!/999/.test(rec.textContent)) return { ok: false, message: 'Quand le record tient, affiche « Record à battre : 999 » (relu et converti avec Number).' };
          return { ok: true, message: 'Lire, comparer, sauvegarder conditionnellement : la mécanique des meilleurs scores de tous les jeux du monde. Et elle est à toi.' };
        } finally {
          try { ctx.win.localStorage.removeItem('record'); } catch (e) {}
        }
      }
    }
  ]
},

{
  id: 'jsav-7',
  titre: 'Erreurs, typeof et l\'art de déboguer',
  contenu: `
<p>Dernière leçon avancée, et peut-être la plus précieuse : que faire quand ça ne marche pas — et comment écrire du code qui encaisse les problèmes.</p>

<h2>typeof : demander son type à une valeur</h2>
<pre class="bloc-code">typeof 42            // "number"
typeof "42"          // "string"  (du texte !)
typeof true          // "boolean"
typeof maFonction    // "function"
typeof [1, 2]        // "object"  (les tableaux sont des objets)
typeof x             // "undefined" si x n'a jamais reçu de valeur</pre>
<p>Quand un calcul donne n'importe quoi, <code>console.log(typeof maVariable)</code> révèle souvent le coupable (un texte déguisé en nombre, par exemple).</p>

<h2>try / catch : essayer sans planter</h2>
<pre class="bloc-code">try {
  // code qui PEUT échouer
  let donnees = JSON.parse(texteRecu);
  console.log("Données lues !");
} catch (erreur) {
  // exécuté SEULEMENT si le try a planté
  console.log("Échec : " + erreur.message);
}</pre>
<p>Sans <code>try/catch</code>, une erreur <strong>arrête tout le programme</strong>. Avec, tu la captures et tu décides quoi faire : message à l'utilisateur, valeur par défaut, nouvel essai...</p>

<h2>La méthode de débogage universelle</h2>
<ol>
<li><strong>Lis le message d'erreur</strong> — nom de l'erreur + ligne. 80% des cas se résolvent là.</li>
<li><strong>console.log tes variables</strong> aux étapes clés : « qu'est-ce qu'il y a VRAIMENT dedans à ce moment-là ? »</li>
<li><strong>Réduis le problème</strong> : commente des blocs jusqu'à isoler la ligne fautive.</li>
<li><strong>Explique le code à voix haute</strong> (au canard en plastique, dit la tradition) — 9 fois sur 10, tu entends l'erreur en la formulant.</li>
</ol>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Détective des types : pour chacune des quatre variables fournies, affiche son type avec <code>typeof</code>. Puis regarde le résultat et médite sur <code>b</code> : il a l\'air d\'un nombre... mais il n\'en est pas un !',
      codeDepart: 'let a = 42;\nlet b = "42";\nlet c = true;\nlet d = [1, 2, 3];\n\n// Affiche les 4 types\n',
      indice: '<code>console.log(typeof a);</code> et ainsi de suite pour b, c, d.',
      solution: 'let a = 42;\nlet b = "42";\nlet c = true;\nlet d = [1, 2, 3];\n\nconsole.log(typeof a);\nconsole.log(typeof b);\nconsole.log(typeof c);\nconsole.log(typeof d);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const attendus = ['number', 'string', 'boolean', 'object'];
        for (let i = 0; i < 4; i++) {
          if (ctx.logs[i] !== attendus[i]) return { ok: false, message: 'L\'affichage n°' + (i + 1) + ' devrait être « ' + attendus[i] + ' » (obtenu : « ' + (ctx.logs[i] || 'rien') + ' »). Utilise <code>typeof</code> sur chaque variable, dans l\'ordre.' };
        }
        return { ok: true, message: '"42" est un string : voilà pourquoi <code>"42" + 1</code> donne "421". typeof est ton détecteur de mensonges à variables.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : le parseur blindé.</strong> La fonction <code>lireDonnees</code> reçoit du texte censé être du JSON... mais parfois cassé. Complète-la avec <code>try/catch</code> : si <code>JSON.parse(texte)</code> réussit, retourne le résultat ; s\'il plante, retourne <code>"données illisibles"</code> SANS faire planter le programme. Les deux tests fournis doivent afficher le prénom puis le message d\'erreur.',
      codeDepart: 'function lireDonnees(texte) {\n  // try / catch ici\n\n}\n\nlet bon = lireDonnees(\'{"prenom": "Léa"}\');\nconsole.log(bon.prenom || bon);\n\nlet casse = lireDonnees(\'{prenom: Léa}\');\nconsole.log(casse.prenom || casse);',
      indice: '<code>try { return JSON.parse(texte); } catch (erreur) { return "données illisibles"; }</code>',
      solution: 'function lireDonnees(texte) {\n  try {\n    return JSON.parse(texte);\n  } catch (erreur) {\n    return "données illisibles";\n  }\n}\n\nlet bon = lireDonnees(\'{"prenom": "Léa"}\');\nconsole.log(bon.prenom || bon);\n\nlet casse = lireDonnees(\'{prenom: Léa}\');\nconsole.log(casse.prenom || casse);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Le programme plante encore : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code> — c\'est exactement ce que le try/catch doit empêcher ! Entoure le JSON.parse.' };
        if (!/try\s*\{/.test(ctx.code) || !/catch/.test(ctx.code)) return { ok: false, message: 'La structure attendue : <code>try { ... } catch (erreur) { ... }</code> dans la fonction.' };
        if (ctx.logs[0] !== 'Léa') return { ok: false, message: 'Avec le JSON valide, la fonction doit retourner l\'objet (et le test affiche « Léa »).' };
        if (ctx.logs[1] !== 'données illisibles') return { ok: false, message: 'Le cas valide marche ! Avec le JSON cassé, il faut retourner « données illisibles » depuis le catch.' };
        return { ok: true, message: 'Un programme qui gère l\'échec proprement au lieu de planter : c\'est ce qui sépare un prototype d\'un vrai logiciel. Les données du monde réel sont TOUJOURS un peu cassées.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi final : la chasse aux 3 bugs.</strong> Ce programme devrait afficher <code>Total du panier : 60 euros</code>... mais il contient trois bugs classiques. Utilise la méthode : exécute, lis l\'erreur, corrige, recommence. (Les bugs : une faute de frappe de variable, un type texte au lieu d\'un nombre, et une condition avec = au lieu de ===.)',
      codeDepart: 'let panier = [10, "20", 30];\nlet total = 0;\n\nfor (const prix of panier) {\n  total += prix;\n}\n\nif (totale = 60) {\n  console.log("Total du panier : " + total + " euros");\n}',
      indice: 'Bug 1 : <code>"20"</code> est un texte — corrige-le en <code>20</code> (ou convertis avec Number dans la boucle). Bug 2 : <code>totale</code> n\'existe pas, c\'est <code>total</code>. Bug 3 : la comparaison, c\'est <code>===</code>, pas <code>=</code>.',
      solution: 'let panier = [10, 20, 30];\nlet total = 0;\n\nfor (const prix of panier) {\n  total += prix;\n}\n\nif (total === 60) {\n  console.log("Total du panier : " + total + " euros");\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Il reste une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code> — lis-la bien, elle nomme le coupable (indice : « totale » n\'existe nulle part).' };
        if (/totale/.test(ctx.code)) return { ok: false, message: 'La variable <code>totale</code> traîne encore quelque part — elle s\'appelle <code>total</code>.' };
        if (/if\s*\(\s*total\s*=\s*60\s*\)/.test(ctx.code)) return { ok: false, message: 'Le <code>=</code> dans le if AFFECTE au lieu de comparer : il faut <code>===</code>.' };
        const sortie = ctx.logs.join(' ');
        if (/1030|10203/.test(sortie) || /"20"/.test(ctx.code)) return { ok: false, message: 'Le "20" entre guillemets est du TEXTE : la somme colle les caractères au lieu d\'additionner (souviens-toi : "10" + "20" = "1020"). Enlève les guillemets.' };
        if (!/60\s*euros/.test(sortie)) return { ok: false, message: 'Le programme doit afficher « Total du panier : 60 euros ». Encore un bug quelque part — console.log(total) avant le if pour enquêter !' };
        return { ok: true, message: '🏆 MODULE AVANCÉ TERMINÉ ! Trois bugs réels, trouvés et corrigés à la méthode. Tu es prêt pour les projets guidés — les vraies applications t\'attendent.' };
      }
    }
  ]
},

];
