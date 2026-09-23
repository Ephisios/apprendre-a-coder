/* ===== JavaScript avancé — seconde partie (jsav-8 à jsav-19) ===== */
window.DATA_JS4 = [

/* ---------- jsav-8 ---------- */
{
  id: 'jsav-8',
  titre: 'var, let, const : la portée',
  contenu: `
<p>Tu utilises <code>let</code> et <code>const</code> depuis le début. Voici enfin l'explication complète — et pourquoi <code>var</code>, qu'on croise dans le vieux code, a été abandonné.</p>

<h2>const : la valeur ne sera pas remplacée</h2>
<pre class="bloc-code">const pi = 3.14;
pi = 3;          // ERREUR : Assignment to constant variable</pre>
<p>Nuance importante : <code>const</code> empêche de <strong>remplacer</strong> la variable, pas de modifier son contenu. Un tableau déclaré <code>const</code> peut parfaitement recevoir de nouveaux éléments :</p>
<pre class="bloc-code">const liste = [1, 2];
liste.push(3);      // autorisé : la liste change, mais c'est la même liste
liste = [9];        // ERREUR : on essaie de remplacer la liste</pre>

<h2>La portée de bloc</h2>
<pre class="bloc-code">if (true) {
    let x = 1;
    var y = 2;
}
console.log(y);    // 2 — var ignore les accolades
console.log(x);    // ERREUR : x n'existe pas ici</pre>
<p><code>let</code> et <code>const</code> vivent <strong>à l'intérieur des accolades</strong> où ils sont nés. <code>var</code>, lui, s'échappe et devient visible dans toute la fonction — ce qui provoque des collisions de noms difficiles à traquer.</p>

<h2>La règle des professionnels</h2>
<ol>
<li><code>const</code> par défaut, toujours ;</li>
<li><code>let</code> uniquement si la variable doit vraiment changer ;</li>
<li><code>var</code> jamais, sauf pour lire du code ancien.</li>
</ol>
<p>Cette discipline n'est pas de la coquetterie : voir <code>const</code> dit au lecteur « cette valeur ne bougera pas », et c'est une information précieuse quand on relit du code six mois plus tard.</p>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Déclare une constante <code>pi</code> valant 3.14 et une variable modifiable <code>compteur</code> valant 0. Incrémente <code>compteur</code> deux fois, puis affiche les deux valeurs (une par ligne).',
      codeDepart: '',
      indices: [
        "Deux déclarations, et le choix du mot dépend d’une seule question : est-ce que cette valeur va changer ?",
        "<code>const</code> interdit de réaffecter ; <code>let</code> l’autorise. Ici, l’une des deux valeurs est incrémentée deux fois.",
        "<code>const pi = 3.14;</code> et <code>let compteur = 0;</code>, puis deux <code>compteur++;</code>"
      ],
      solution: 'const pi = 3.14;\nlet compteur = 0;\ncompteur++;\ncompteur++;\nconsole.log(pi);\nconsole.log(compteur);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/const\s+pi/.test(ctx.code)) return { ok: false, message: 'Déclare <code>pi</code> avec <code>const</code> : sa valeur ne change jamais.' };
        if (!/let\s+compteur/.test(ctx.code)) return { ok: false, message: 'Déclare <code>compteur</code> avec <code>let</code> : il va changer, donc const est impossible.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '3.14') return { ok: false, message: 'La première ligne doit afficher 3.14 — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        if (l[1] !== '2') return { ok: false, message: 'Après deux incréments, compteur vaut 2 — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'const pour l\'immuable, let pour le variable : le choix est un message adressé au prochain lecteur du code.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> montre qu\'un tableau <code>const</code> peut quand même être modifié. Déclare <code>const liste = [1, 2]</code>, ajoute 3 avec <code>push</code>, et affiche la liste.',
      codeDepart: '',
      indices: [
        "Le paradoxe de cet exercice : <code>const</code> n’empêche pas de modifier le <em>contenu</em> d’un tableau.",
        "Ce que <code>const</code> interdit, c’est de faire pointer le nom vers un <strong>autre</strong> tableau. Ajouter un élément ne change pas le tableau désigné.",
        "<code>const liste = [1, 2];</code> puis <code>liste.push(3);</code> — parfaitement autorisé."
      ],
      solution: 'const liste = [1, 2];\nliste.push(3);\nconsole.log(liste);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/const\s+liste/.test(ctx.code)) return { ok: false, message: 'Déclare la liste avec <code>const</code> — c\'est tout l\'intérêt de la démonstration.' };
        if (!/push/.test(ctx.code)) return { ok: false, message: 'Ajoute l\'élément avec <code>.push(3)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '[1,2,3]') return { ok: false, message: 'Attendu <code>[1,2,3]</code> — tu affiches ' + (l[0] || '(rien)') + '.' };
        return { ok: true, message: 'const verrouille le NOM, pas le contenu. C\'est la nuance qui surprend tout le monde au début.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Pourquoi éviter <code>var</code> dans du code moderne ?',
      choix: [
        'Parce qu\'il ignore les accolades et reste visible dans toute la fonction',
        'Parce qu\'il est plus lent que let',
        'Parce qu\'il ne fonctionne plus dans les navigateurs récents',
        'Parce qu\'il ne peut contenir que des nombres'
      ],
      bonne: 0,
      explication: 'Une variable var déclarée dans un if ou une boucle déborde dans toute la fonction. Deux boucles utilisant var i dans la même fonction se marchent dessus — un bug très difficile à repérer.',
      aides: [
        null,
        'La vitesse est identique. Le problème est la portée, donc la lisibilité et la sûreté du code.',
        'var fonctionne toujours parfaitement : il faut bien que les millions de lignes écrites avant 2015 continuent de tourner. C\'est un choix de qualité, pas de compatibilité.',
        'var accepte n\'importe quel type, comme let. La différence est ailleurs.'
      ]
    }
  ]
},

/* ---------- jsav-9 ---------- */
{
  id: 'jsav-9',
  titre: '== ou === : la conversion automatique',
  contenu: `
<p>JavaScript possède deux opérateurs d'égalité, et l'un des deux est une source de bugs légendaire.</p>

<pre class="bloc-code">console.log(5 == "5");     // true  (!)
console.log(5 === "5");    // false</pre>

<ul>
<li><code>==</code> compare après avoir <strong>converti</strong> les types pour les rendre comparables ;</li>
<li><code>===</code> compare la valeur <strong>et</strong> le type, sans rien convertir.</li>
</ul>

<h2>Les résultats surprenants du ==</h2>
<pre class="bloc-code">console.log(0 == "");        // true
console.log(0 == false);     // true
console.log(null == undefined);  // true
console.log("" == false);    // true</pre>
<p>Ces règles de conversion sont complexes et peu intuitives. Personne ne les connaît toutes par cœur — c'est pourquoi la règle professionnelle est simple : <strong>utilise toujours <code>===</code></strong> (et <code>!==</code>). Le jour où tu veux vraiment convertir, fais-le explicitement avec <code>Number(...)</code>.</p>

<h2>Le piège du + avec du texte</h2>
<pre class="bloc-code">console.log("5" + 3);      // "53" — le + colle
console.log("5" - 3);      // 2 — le - convertit en nombre !</pre>
<p>Le <code>+</code> a deux métiers (addition et concaténation) ; dès qu'un texte est en jeu, il colle. Les autres opérateurs (<code>-</code>, <code>*</code>, <code>/</code>) n'ont qu'un métier, donc ils convertissent. C'est exactement le bug qu'on rencontre en lisant un champ de formulaire, où toute saisie arrive sous forme de texte.</p>

<div class="attention"><div>Souviens-toi de la comparaison avec les autres langages : Python <strong>refuse</strong> <code>3 + "3"</code> avec une erreur, ce qui est plus sûr. JavaScript devine — et devine parfois mal, sans jamais te prévenir.</div></div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Affiche sur deux lignes le résultat de <code>5 == "5"</code> puis de <code>5 === "5"</code>, pour constater la différence.',
      codeDepart: '',
      indices: [
        "Deux comparaisons presque identiques, et deux résultats opposés. Toute la leçon tient dans ce signe en plus.",
        "<code>==</code> convertit avant de comparer ; <code>===</code> compare aussi le type. Affiche les deux pour voir la différence de tes yeux.",
        "<code>console.log(5 == \"5\");</code> puis <code>console.log(5 === \"5\");</code>"
      ],
      solution: 'console.log(5 == "5");\nconsole.log(5 === "5");',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (l[0] !== 'true') return { ok: false, message: 'La première ligne (avec <code>==</code>) doit afficher <code>true</code> — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== 'false') return { ok: false, message: 'La seconde (avec <code>===</code>) doit afficher <code>false</code> — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Même comparaison, résultats opposés. Voilà pourquoi on n\'utilise que <code>===</code>.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Chasse au bug :</strong> ce code additionne deux valeurs venant d\'un formulaire et affiche <code>105</code> au lieu de <code>15</code>. Répare-le sans changer les valeurs de départ.',
      codeDepart: 'const saisie1 = "10";\nconst saisie2 = "5";\n\nconsole.log(saisie1 + saisie2);',
      indices: [
        "105, ce n’est pas une addition ratée : c’est 10 et 5 mis bout à bout. Demande-toi de quel <strong>type</strong> sont les deux valeurs.",
        "Le <code>+</code> entre deux textes colle au lieu d’additionner. Il faut convertir avant, sans toucher aux valeurs de départ.",
        "<code>Number(saisie1) + Number(saisie2)</code>"
      ],
      solution: 'const saisie1 = "10";\nconst saisie2 = "5";\n\nconsole.log(Number(saisie1) + Number(saisie2));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (/"10"\s*=\s*10|=\s*10\s*;/.test(ctx.code.replace(/saisie1 = "10"/, ''))) { /* rien */ }
        if (!/const\s+saisie1\s*=\s*"10"/.test(ctx.code)) return { ok: false, message: 'Garde les valeurs de départ sous forme de texte : c\'est ainsi qu\'elles arrivent d\'un formulaire.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] === '105') return { ok: false, message: 'Toujours « 105 » : le <code>+</code> colle les deux textes. Enveloppe chaque valeur dans <code>Number(...)</code>.' };
        if (l[0] !== '15') return { ok: false, message: 'Attendu <code>15</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Ce bug touche tous les débutants qui lisent un formulaire : la valeur d\'un champ est TOUJOURS du texte, même quand l\'utilisateur tape un nombre.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> affiche le résultat de <code>"5" - 3</code> puis de <code>"5" + 3</code>, et constate que les deux opérateurs ne se comportent pas pareil.',
      codeDepart: '',
      indices: [
        "Deux opérateurs, deux comportements. L’un n’a qu’un sens possible ; l’autre en a deux, et doit choisir.",
        "Le <code>-</code> n’existe que pour les nombres : il convertit. Le <code>+</code> hésite entre additionner et coller — et devant un texte, il colle.",
        "<code>console.log(\"5\" - 3);</code> puis <code>console.log(\"5\" + 3);</code>"
      ],
      solution: 'console.log("5" - 3);\nconsole.log("5" + 3);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (l[0] !== '2') return { ok: false, message: '<code>"5" - 3</code> donne 2 (le texte est converti) — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '53') return { ok: false, message: '<code>"5" + 3</code> donne "53" (le texte absorbe le nombre) — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Deux opérateurs voisins, deux comportements opposés. En cas de doute : convertis toi-même, ne laisse jamais JavaScript deviner.' };
      }
    }
  ]
},

/* ---------- jsav-10 ---------- */
{
  id: 'jsav-10',
  titre: 'Les gabarits de chaînes',
  contenu: `
<p>Assembler du texte avec des <code>+</code> devient vite illisible. JavaScript propose une écriture bien plus claire, l'équivalent exact des f-strings de Python.</p>

<pre class="bloc-code">const nom = "Alex";
const age = 30;

// L'ancienne façon
console.log("Je m'appelle " + nom + " et j'ai " + age + " ans");

// Le gabarit : accents graves &#96; et &#36;{...}
console.log(&#96;Je m'appelle &#36;{nom} et j'ai &#36;{age} ans&#96;);</pre>

<p>Le caractère qui entoure le texte n'est ni l'apostrophe ni le guillemet, mais l'<strong>accent grave</strong> (backtick), sur la touche à gauche du 1 sur un clavier français (AltGr + 7).</p>

<h2>On peut calculer dedans</h2>
<pre class="bloc-code">const prix = 19.99;
const quantite = 3;
console.log(&#96;Total : &#36;{(prix * quantite).toFixed(2)} €&#96;);</pre>

<h2>Et écrire sur plusieurs lignes</h2>
<pre class="bloc-code">const message = &#96;Bonjour,
Voici votre facture.
Cordialement&#96;;</pre>
<p>Avec des guillemets ordinaires, il aurait fallu des <code>\\n</code> partout. C'est ce qui rend les gabarits indispensables pour construire du HTML dans du JavaScript.</p>

<div class="astuce"><div>Les apostrophes ne posent plus de problème à l'intérieur d'un gabarit : <code>&#96;l'école&#96;</code> s'écrit sans échappement, alors qu'avec des apostrophes simples il aurait fallu <code>'l\\'école'</code>.</div></div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Réécris cette phrase avec un <strong>gabarit</strong> (accents graves) pour afficher <code>Alex a 30 ans</code>.',
      codeDepart: 'const nom = "Alex";\nconst age = 30;\n\n',
      indices: [
        "Plus de <code>+</code> ni de guillemets à jongler : on écrit la phrase telle quelle, et on désigne les variables dedans.",
        "Le texte va entre accents graves, et chaque variable dans un <code>${…}</code>.",
        "<code>console.log(`${nom} a ${age} ans`);</code>"
      ],
      solution: 'const nom = "Alex";\nconst age = 30;\n\nconsole.log(`${nom} a ${age} ans`);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/`/.test(ctx.code)) return { ok: false, message: 'L\'exercice porte sur les gabarits : utilise des accents graves ` autour du texte (AltGr + 7 sur un clavier français).' };
        if (!/\$\{/.test(ctx.code)) return { ok: false, message: 'Insère les variables avec <code>${nom}</code> — le dollar et les accolades.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'Alex a 30 ans') return { ok: false, message: 'Attendu <code>Alex a 30 ans</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Plus lisible que la file de <code>+</code>, et c\'est exactement la même idée que les f-strings de Python.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> affiche <code>Total : 59.97 €</code> en calculant le prix dans le gabarit, avec deux décimales.',
      codeDepart: 'const prix = 19.99;\nconst quantite = 3;\n\n',
      indices: [
        "Le calcul peut se faire directement dans le gabarit — pas besoin d’une variable intermédiaire.",
        "Mais attention aux parenthèses : <code>toFixed</code> s’applique au <strong>résultat</strong> du calcul, donc le calcul doit être entouré.",
        "<code>${(prix * quantite).toFixed(2)}</code>"
      ],
      solution: 'const prix = 19.99;\nconst quantite = 3;\n\nconsole.log(`Total : ${(prix * quantite).toFixed(2)} €`);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (/59\.969/.test(l[0])) return { ok: false, message: 'Le calcul donne 59.969999… : arrondis avec <code>.toFixed(2)</code>.' };
        if (l[0] !== 'Total : 59.97 €') return { ok: false, message: 'Attendu <code>Total : 59.97 €</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Calcul, arrondi et mise en forme dans une seule expression lisible.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi :</strong> écris une fonction <code>carte(nom, ville)</code> qui renvoie un gabarit <strong>sur trois lignes</strong> : le nom, puis <code>Ville : ...</code>, puis <code>---</code>. Affiche le résultat pour Alex à Lyon.',
      codeDepart: '',
      indices: [
        "Trois lignes à produire, mais une seule instruction : un gabarit peut contenir de vrais retours à la ligne.",
        "Ouvre l’accent grave, appuie sur Entrée, continue d’écrire : le saut de ligne fait partie du texte.",
        "La fonction renvoie <code>${nom}</code>, puis à la ligne <code>Ville : ${ville}</code>, puis à la ligne <code>---</code> — le tout entre deux accents graves."
      ],
      solution: 'function carte(nom, ville) {\n  return `${nom}\nVille : ${ville}\n---`;\n}\n\nconsole.log(carte("Alex", "Lyon"));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/function\s+carte|carte\s*=\s*\(/.test(ctx.code)) return { ok: false, message: 'Définis une fonction <code>carte(nom, ville)</code>.' };
        const brut = ctx.logs.join('\n');
        const l = brut.split('\n').filter(x => x.trim() !== '');
        if (l.length < 3) return { ok: false, message: 'J\'attends trois lignes — un gabarit peut contenir de vrais retours à la ligne. J\'en compte ' + l.length + '.' };
        if (l[0].trim() !== 'Alex') return { ok: false, message: 'La première ligne doit être <code>Alex</code> — tu affiches « ' + l[0] + ' ».' };
        if (l[1].trim() !== 'Ville : Lyon') return { ok: false, message: 'La deuxième ligne doit être <code>Ville : Lyon</code> — tu affiches « ' + l[1] + ' ».' };
        if (l[2].trim() !== '---') return { ok: false, message: 'La troisième ligne doit être <code>---</code>.' };
        return { ok: true, message: 'Le multi-ligne sans <code>\\n</code> : c\'est ce qui rend les gabarits incontournables pour générer du HTML.' };
      }
    }
  ]
},

/* ---------- jsav-11 ---------- */
{
  id: 'jsav-11',
  titre: 'La destructuration',
  contenu: `
<p>Extraire plusieurs valeurs d'un objet ou d'un tableau demande normalement une ligne par valeur. La <strong>destructuration</strong> permet de tout sortir d'un coup.</p>

<h2>Sur un objet</h2>
<pre class="bloc-code">const contact = { nom: "Alex", ville: "Lyon", age: 30 };

// La façon longue
const nom = contact.nom;
const ville = contact.ville;

// La destructuration
const { nom, ville } = contact;
console.log(nom, ville);      // Alex Lyon</pre>
<p>Les noms entre accolades doivent correspondre <strong>exactement aux clés</strong> de l'objet. L'ordre, lui, n'a aucune importance.</p>

<h2>Sur un tableau</h2>
<pre class="bloc-code">const couleurs = ["rouge", "vert", "bleu"];
const [premiere, deuxieme] = couleurs;
console.log(premiere);        // rouge</pre>
<p>Ici, au contraire, c'est bien l'<strong>ordre</strong> qui compte — les noms sont libres.</p>

<h2>Une valeur par défaut</h2>
<pre class="bloc-code">const { pays = "France" } = contact;
console.log(pays);      // France — la clé n'existait pas</pre>

<h2>Dans les paramètres d'une fonction</h2>
<pre class="bloc-code">function afficher({ nom, ville }) {
    console.log(\`\${nom} habite à \${ville}\`);
}
afficher(contact);</pre>
<p>La fonction annonce ainsi <strong>exactement</strong> ce dont elle a besoin. C'est très courant dans le code moderne, notamment avec React.</p>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Extrais <code>nom</code> et <code>ville</code> de l\'objet <strong>en une seule ligne</strong>, puis affiche-les séparés par un espace.',
      codeDepart: 'const contact = { nom: "Alex", ville: "Lyon", age: 30 };\n\n',
      indices: [
        "Extraire plusieurs valeurs d’un objet en une seule ligne, sans répéter son nom à chaque fois.",
        "Les noms entre accolades doivent être <strong>exactement</strong> ceux des clés : c’est par le nom que la correspondance se fait.",
        "<code>const { nom, ville } = contact;</code>"
      ],
      solution: 'const contact = { nom: "Alex", ville: "Lyon", age: 30 };\n\nconst { nom, ville } = contact;\nconsole.log(nom, ville);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/const\s*\{[^}]*\}\s*=/.test(ctx.code)) return { ok: false, message: 'Utilise la destructuration : <code>const { nom, ville } = contact;</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'Alex Lyon') return { ok: false, message: 'Attendu <code>Alex Lyon</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Une ligne au lieu de deux, et l\'intention est plus claire : « je prends ces deux champs ».' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> extrais les deux premières couleurs du tableau par destructuration et affiche-les, une par ligne.',
      codeDepart: 'const couleurs = ["rouge", "vert", "bleu"];\n\n',
      indices: [
        "Même idée, mais sur un tableau. Un tableau n’a pas de noms de clés : il faut donc autre chose pour savoir quoi extraire.",
        "On utilise des crochets, et c’est la <strong>position</strong> qui décide : le premier nom reçoit le premier élément. Les noms, eux, sont libres.",
        "<code>const [premiere, deuxieme] = couleurs;</code>"
      ],
      solution: 'const couleurs = ["rouge", "vert", "bleu"];\n\nconst [premiere, deuxieme] = couleurs;\nconsole.log(premiere);\nconsole.log(deuxieme);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/const\s*\[[^\]]*\]\s*=/.test(ctx.code)) return { ok: false, message: 'Utilise la destructuration de tableau avec des crochets : <code>const [premiere, deuxieme] = couleurs;</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'rouge' || l[1] !== 'vert') return { ok: false, message: 'Attendu « rouge » puis « vert » — tu affiches « ' + l.join(' / ') + ' ».' };
        return { ok: true, message: 'Accolades pour un objet (par nom), crochets pour un tableau (par position). Les deux formes se ressemblent, mais leur logique diffère.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi :</strong> écris une fonction <code>afficher({ nom, ville })</code> qui destructure <strong>directement dans ses paramètres</strong> et affiche <code>Alex habite à Lyon</code>.',
      codeDepart: 'const contact = { nom: "Alex", ville: "Lyon", age: 30 };\n\n',
      indices: [
        "La destructuration peut se faire dès la réception : à la place même du nom du paramètre.",
        "Les accolades s’écrivent directement entre les parenthèses de la fonction. À l’appel, on passe l’objet entier.",
        "<code>function afficher({ nom, ville }) { … }</code>, appelée avec <code>afficher(contact)</code>."
      ],
      solution: 'const contact = { nom: "Alex", ville: "Lyon", age: 30 };\n\nfunction afficher({ nom, ville }) {\n  console.log(`${nom} habite à ${ville}`);\n}\n\nafficher(contact);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/function\s+\w+\s*\(\s*\{/.test(ctx.code) && !/\(\s*\{[^}]*\}\s*\)\s*=>/.test(ctx.code)) return { ok: false, message: 'La destructuration doit se faire DANS les paramètres : <code>function afficher({ nom, ville })</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'Alex habite à Lyon') return { ok: false, message: 'Attendu <code>Alex habite à Lyon</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'La signature de la fonction documente ce dont elle a besoin. C\'est du code qui s\'explique tout seul.' };
      }
    }
  ]
},

/* ---------- jsav-12 ---------- */
{
  id: 'jsav-12',
  titre: 'Les trois points : spread et rest',
  contenu: `
<p>Trois petits points, deux usages opposés — mais une seule idée : <strong>étaler ou rassembler</strong>.</p>

<h2>Spread : étaler le contenu</h2>
<pre class="bloc-code">const a = [1, 2];
const b = [...a, 3, 4];       // [1, 2, 3, 4]

const base = { nom: "Alex" };
const complet = { ...base, ville: "Lyon" };   // les deux clés</pre>
<p>Les trois points « déballent » le contenu à l'endroit où on les écrit. Très pratique pour <strong>copier sans modifier l'original</strong> :</p>
<pre class="bloc-code">const original = [3, 1, 2];
const trie = [...original].sort();     // l'original reste intact</pre>
<p>C'est important : <code>sort()</code> modifie le tableau sur lequel on l'appelle. En le copiant d'abord, on évite un effet de bord invisible.</p>

<h2>Rest : rassembler ce qui reste</h2>
<pre class="bloc-code">function additionner(...nombres) {
    let total = 0;
    for (const n of nombres) total += n;
    return total;
}
console.log(additionner(1, 2, 3));    // 6</pre>
<p>Même syntaxe, sens inverse : ici les trois points <strong>rassemblent</strong> tous les arguments dans un tableau. C'est l'exact équivalent du <code>*args</code> de Python.</p>

<h2>Comment les distinguer ?</h2>
<p>Regarde de quel côté du signe égal (ou des parenthèses) ils se trouvent : à gauche, dans une déclaration de paramètres, ils <strong>rassemblent</strong> ; à droite, dans une valeur, ils <strong>étalent</strong>.</p>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Crée un nouveau tableau contenant les éléments de <code>a</code> suivis de 3 et 4, <strong>sans modifier</strong> <code>a</code>. Affiche le nouveau tableau puis <code>a</code>.',
      codeDepart: 'const a = [1, 2];\n\n',
      indices: [
        "Il ne faut pas modifier <code>a</code> : donc pas de <code>push</code>. Il s’agit de fabriquer un <strong>nouveau</strong> tableau.",
        "Les trois points <strong>étalent</strong> le contenu d’un tableau à l’endroit où on les écrit. On peut ensuite ajouter ce qu’on veut derrière.",
        "<code>const b = [...a, 3, 4];</code>"
      ],
      solution: 'const a = [1, 2];\n\nconst b = [...a, 3, 4];\nconsole.log(b);\nconsole.log(a);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\.\.\./.test(ctx.code)) return { ok: false, message: 'Utilise les trois points <code>...</code> pour étaler le tableau.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '[1,2,3,4]') return { ok: false, message: 'Attendu <code>[1,2,3,4]</code> — tu affiches ' + (l[0] || '(rien)') + '.' };
        if (l[1] !== '[1,2]') return { ok: false, message: 'Le tableau <code>a</code> doit rester intact ([1,2]) — tu affiches ' + l[1] + '. Si tu as utilisé <code>push</code>, tu l\'as modifié.' };
        return { ok: true, message: 'Créer plutôt que modifier : cette habitude évite énormément de bugs, car personne d\'autre ne voit ses données changer sous ses pieds.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> fusionne les deux objets en un seul (les clés de <code>base</code> plus <code>ville: "Lyon"</code>) et affiche le résultat.',
      codeDepart: 'const base = { nom: "Alex", age: 30 };\n\n',
      indices: [
        "Même geste, mais sur un objet : on étale les clés existantes, puis on en ajoute une.",
        "Les trois points fonctionnent aussi entre accolades. Ce qui vient après peut ajouter — ou écraser — une clé.",
        "<code>const complet = { ...base, ville: \"Lyon\" };</code>"
      ],
      solution: 'const base = { nom: "Alex", age: 30 };\n\nconst complet = { ...base, ville: "Lyon" };\nconsole.log(complet);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\.\.\./.test(ctx.code)) return { ok: false, message: 'Utilise <code>...base</code> pour étaler les clés de l\'objet d\'origine.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (!/"nom":"Alex"/.test(l[0]) || !/"ville":"Lyon"/.test(l[0]) || !/"age":30/.test(l[0])) {
          return { ok: false, message: 'Le résultat doit contenir les trois clés (nom, age, ville) — tu affiches ' + l[0] + '.' };
        }
        return { ok: true, message: 'La fusion d\'objets par spread est l\'opération la plus fréquente du développement web moderne : mettre à jour un état sans l\'écraser.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi :</strong> écris <code>additionner(...nombres)</code> qui accepte <strong>autant d\'arguments qu\'on veut</strong>, et teste-la avec 2 puis 4 nombres.',
      codeDepart: '',
      indices: [
        "Les trois points changent de rôle selon l’endroit : dans un appel ils étalent, dans les <strong>paramètres</strong> ils rassemblent.",
        "<code>...nombres</code> récupère tous les arguments dans un vrai tableau, qu’on peut ensuite parcourir normalement.",
        "<code>function additionner(...nombres)</code> puis une boucle sur <code>nombres</code>."
      ],
      solution: 'function additionner(...nombres) {\n  let total = 0;\n  for (const n of nombres) total += n;\n  return total;\n}\n\nconsole.log(additionner(1, 2));\nconsole.log(additionner(1, 2, 3, 4));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\(\s*\.\.\./.test(ctx.code)) return { ok: false, message: 'Le paramètre doit rassembler : <code>function additionner(...nombres)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux appels avec des nombres d\'arguments différents.' };
        if (l[0] !== '3') return { ok: false, message: 'additionner(1, 2) doit donner 3 — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '10') return { ok: false, message: 'additionner(1, 2, 3, 4) doit donner 10 — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Même syntaxe que le spread, sens inverse. Et c\'est exactement le <code>*args</code> de Python : les bonnes idées voyagent.' };
      }
    }
  ]
},

/* ---------- jsav-13 ---------- */
{
  id: 'jsav-13',
  titre: 'Chercher dans un tableau',
  contenu: `
<p>Tu connais <code>map</code> et <code>filter</code>. Voici les méthodes qui répondent à des questions plus précises — et qui évitent d'écrire une boucle à chaque fois.</p>

<table class="memo-table">
<tr><th>Méthode</th><th>Question posée</th><th>Renvoie</th></tr>
<tr><td>find</td><td>Quel est le premier qui…</td><td>l'élément, ou undefined</td></tr>
<tr><td>findIndex</td><td>À quelle position est le premier qui…</td><td>un indice, ou -1</td></tr>
<tr><td>some</td><td>Y en a-t-il AU MOINS UN qui…</td><td>true / false</td></tr>
<tr><td>every</td><td>Est-ce que TOUS…</td><td>true / false</td></tr>
<tr><td>includes</td><td>Cette valeur exacte est-elle dedans ?</td><td>true / false</td></tr>
<tr><td>indexOf</td><td>À quelle position est cette valeur ?</td><td>un indice, ou -1</td></tr>
</table>

<pre class="bloc-code">const notes = [12, 5, 18, 9];

console.log(notes.find(n => n > 10));      // 12 — le PREMIER trouvé
console.log(notes.some(n => n < 10));      // true — il y en a
console.log(notes.every(n => n > 0));      // true — toutes le sont
console.log(notes.includes(18));           // true
console.log(notes.indexOf(18));            // 2</pre>

<h2>find sur des objets : le cas le plus utile</h2>
<pre class="bloc-code">const contacts = [
    { id: 1, nom: "Alex" },
    { id: 2, nom: "Bob" }
];

const trouve = contacts.find(c => c.id === 2);
console.log(trouve.nom);      // Bob</pre>
<p>C'est l'opération qu'on fait cent fois par jour dans une application : retrouver un élément par son identifiant.</p>

<div class="attention"><div><code>find</code> renvoie <code>undefined</code> quand rien ne correspond. Écrire <code>trouve.nom</code> sans vérifier provoque alors l'erreur la plus fréquente de JavaScript : « Cannot read properties of undefined ». Vérifie toujours, ou utilise <code>?.</code> que nous verrons plus loin.</div></div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Avec les méthodes du tableau, affiche sur trois lignes : la première note supérieure à 10, si <strong>au moins une</strong> note est en dessous de 10, et si <strong>toutes</strong> sont positives.',
      codeDepart: 'const notes = [12, 5, 18, 9];\n\n',
      indices: [
        "Trois questions différentes : « laquelle ? », « au moins une ? », « toutes ? ». Trois méthodes, une par question.",
        "<code>find</code> rend l’élément ; <code>some</code> et <code>every</code> rendent vrai ou faux. Toutes trois reçoivent une fonction qui teste un élément.",
        "<code>notes.find(n =&gt; n &gt; 10)</code>, <code>notes.some(…)</code>, <code>notes.every(…)</code>"
      ],
      solution: 'const notes = [12, 5, 18, 9];\n\nconsole.log(notes.find(n => n > 10));\nconsole.log(notes.some(n => n < 10));\nconsole.log(notes.every(n => n > 0));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 3) return { ok: false, message: 'J\'attends trois lignes.' };
        if (l[0] !== '12') return { ok: false, message: '<code>find</code> renvoie le PREMIER élément qui correspond, soit 12 — tu affiches « ' + l[0] + ' ». (Si tu obtiens un tableau, tu as utilisé filter.)' };
        if (l[1] !== 'true') return { ok: false, message: '<code>some(n => n < 10)</code> doit donner true (5 et 9 sont en dessous) — tu affiches « ' + l[1] + ' ».' };
        if (l[2] !== 'true') return { ok: false, message: '<code>every(n => n > 0)</code> doit donner true — tu affiches « ' + l[2] + ' ».' };
        return { ok: true, message: 'find renvoie un élément, some et every répondent par oui ou non. Choisir la bonne méthode, c\'est déjà écrire du code clair.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> retrouve le contact dont l\'<code>id</code> vaut 2 et affiche son nom.',
      codeDepart: 'const contacts = [\n  { id: 1, nom: "Alex" },\n  { id: 2, nom: "Bob" },\n  { id: 3, nom: "Chloé" }\n];\n\n',
      indices: [
        "Chercher dans un tableau d’objets : la fonction de test reçoit l’objet entier, et doit regarder à l’intérieur.",
        "<code>find</code> rend le <strong>premier</strong> objet qui satisfait le test — donc l’objet complet, dont on lit ensuite la clé voulue.",
        "<code>const trouve = contacts.find(c =&gt; c.id === 2);</code> puis <code>trouve.nom</code>"
      ],
      solution: 'const contacts = [\n  { id: 1, nom: "Alex" },\n  { id: 2, nom: "Bob" },\n  { id: 3, nom: "Chloé" }\n];\n\nconst trouve = contacts.find(c => c.id === 2);\nconsole.log(trouve.nom);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\.find\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise <code>.find(...)</code> pour retrouver l\'élément.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'Bob') return { ok: false, message: 'Attendu <code>Bob</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Retrouver un élément par son identifiant : l\'opération la plus courante de toute application de gestion.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi :</strong> cherche le contact d\'id 99 (qui n\'existe pas) et affiche <code>introuvable</code> au lieu de planter.',
      codeDepart: 'const contacts = [\n  { id: 1, nom: "Alex" },\n  { id: 2, nom: "Bob" }\n];\n\n',
      indices: [
        "Que rend <code>find</code> quand il ne trouve rien ? Ce n’est pas une erreur — et c’est justement le piège.",
        "Il rend <code>undefined</code>. Lire une clé dessus fait planter : il faut donc tester le résultat avant de s’en servir.",
        "<code>if (trouve) { … } else { console.log(\"introuvable\"); }</code>"
      ],
      solution: 'const contacts = [\n  { id: 1, nom: "Alex" },\n  { id: 2, nom: "Bob" }\n];\n\nconst trouve = contacts.find(c => c.id === 99);\nif (trouve) {\n  console.log(trouve.nom);\n} else {\n  console.log("introuvable");\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur + ' — c\'est exactement ce que l\'exercice demande d\'éviter. Vérifie le résultat de find avant de l\'utiliser.' };
        if (!/\.find\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise <code>.find(...)</code>, puis vérifie son résultat.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'introuvable') return { ok: false, message: 'Attendu <code>introuvable</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Traiter le cas « rien trouvé » n\'est pas facultatif : c\'est la différence entre un code qui tient en production et un code qui plante au premier imprévu.' };
      }
    }
  ]
},

/* ---------- jsav-14 ---------- */
{
  id: 'jsav-14',
  titre: 'Copier, découper, insérer',
  contenu: `
<p>Deux méthodes aux noms proches et aux comportements radicalement différents. La confusion entre les deux est un classique.</p>

<h2>slice : découpe SANS toucher à l'original</h2>
<pre class="bloc-code">const t = [0, 1, 2, 3, 4];

console.log(t.slice(1, 3));    // [1, 2] — de 1 inclus à 3 exclu
console.log(t.slice(-2));      // [3, 4] — les deux derniers
console.log(t.slice());        // une copie complète
console.log(t);                // [0,1,2,3,4] — intact</pre>
<p>C'est l'exact équivalent du découpage <code>t[1:3]</code> de Python.</p>

<h2>splice : MODIFIE le tableau d'origine</h2>
<pre class="bloc-code">const u = [0, 1, 2, 3, 4];

u.splice(1, 2);              // supprime 2 éléments à partir de l'indice 1
console.log(u);              // [0, 3, 4] — u a changé !

u.splice(1, 0, "a", "b");    // supprime 0, insère "a" et "b"
console.log(u);              // [0, "a", "b", 3, 4]</pre>
<p>Les arguments sont : <code>(position, combien_supprimer, éléments_à_insérer...)</code>.</p>

<h2>Le moyen de ne plus les confondre</h2>
<p><strong>slice</strong> comme « une tranche de gâteau » : on prélève une part, le gâteau reste. <strong>splice</strong> comme « épisser un câble » : on coupe et on rababoute — l'original est transformé.</p>

<div class="astuce"><div>Dans le code moderne, on préfère nettement les opérations qui ne modifient rien : <code>slice</code>, le spread <code>[...t]</code>, <code>map</code>, <code>filter</code>. Modifier un tableau partagé est une source de bugs redoutable, parce que le changement apparaît à un endroit du code qu'on ne regardait pas.</div></div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Avec <code>slice</code>, affiche les éléments d\'indice 1 et 2, puis le tableau d\'origine pour vérifier qu\'il n\'a pas bougé.',
      codeDepart: 'const t = [0, 1, 2, 3, 4];\n\n',
      indices: [
        "<code>slice</code> découpe sans rien abîmer : il rend un morceau et laisse l’original intact.",
        "Le premier nombre est inclus, le second <strong>exclu</strong>. Pour obtenir les indices 1 et 2, il faut donc aller jusqu’à 3.",
        "<code>t.slice(1, 3)</code>"
      ],
      solution: 'const t = [0, 1, 2, 3, 4];\n\nconsole.log(t.slice(1, 3));\nconsole.log(t);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes : la tranche puis le tableau d\'origine.' };
        if (l[0] !== '[1,2]') return { ok: false, message: 'Attendu <code>[1,2]</code> — tu affiches ' + l[0] + '. Rappel : <code>slice(1, 3)</code> va de 1 inclus à 3 exclu.' };
        if (l[1] !== '[0,1,2,3,4]') return { ok: false, message: 'Le tableau d\'origine doit rester intact — tu affiches ' + l[1] + '. As-tu utilisé splice au lieu de slice ?' };
        return { ok: true, message: 'slice prélève sans abîmer. Même logique que le découpage de Python.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> avec <code>splice</code>, supprime les 2 éléments à partir de l\'indice 1, puis affiche le tableau modifié.',
      codeDepart: 'const u = [0, 1, 2, 3, 4];\n\n',
      indices: [
        "<code>splice</code> est le contraire de <code>slice</code> : il <strong>modifie</strong> le tableau sur place.",
        "Ses deux nombres ne sont pas des bornes : le premier est la position de départ, le second le <strong>nombre</strong> d’éléments à retirer.",
        "<code>u.splice(1, 2);</code>"
      ],
      solution: 'const u = [0, 1, 2, 3, 4];\n\nu.splice(1, 2);\nconsole.log(u);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/splice/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande <code>splice</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '[0,3,4]') return { ok: false, message: 'Attendu <code>[0,3,4]</code> — tu affiches ' + (l[0] || '(rien)') + '. Vérifie les deux arguments : position 1, puis 2 éléments à supprimer.' };
        return { ok: true, message: 'splice a bien transformé le tableau lui-même. À utiliser en connaissance de cause.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi :</strong> trie une copie du tableau <strong>sans modifier l\'original</strong>. Affiche la copie triée puis l\'original intact.',
      codeDepart: 'const original = [3, 1, 2];\n\n',
      indices: [
        "<code>sort()</code> trie sur place : appelé directement, il détruirait l’ordre d’origine.",
        "Il faut donc trier une copie. Deux façons d’en fabriquer une : le spread, ou un <code>slice()</code> sans argument.",
        "<code>const trie = [...original].sort();</code>"
      ],
      solution: 'const original = [3, 1, 2];\n\nconst trie = [...original].sort();\nconsole.log(trie);\nconsole.log(original);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes : la copie triée puis l\'original.' };
        if (l[0] !== '[1,2,3]') return { ok: false, message: 'La copie triée doit être <code>[1,2,3]</code> — tu affiches ' + l[0] + '.' };
        if (l[1] !== '[3,1,2]') return { ok: false, message: 'L\'original doit rester <code>[3,1,2]</code> — tu affiches ' + l[1] + '. C\'est le piège : <code>sort()</code> modifie le tableau sur lequel on l\'appelle, il faut donc copier AVANT.' };
        return { ok: true, message: 'Ce piège de <code>sort()</code> surprend même des développeurs expérimentés. Copier d\'abord est le réflexe qui sauve.' };
      }
    }
  ]
},

/* ---------- jsav-15 ---------- */
{
  id: 'jsav-15',
  titre: 'Parcourir un objet',
  contenu: `
<p>Une boucle <code>for...of</code> parcourt un tableau. Pour un objet, il faut d'abord en extraire ce qu'on veut parcourir — clés, valeurs, ou les deux.</p>

<pre class="bloc-code">const stock = { pommes: 12, poires: 5, cerises: 30 };

console.log(Object.keys(stock));      // ["pommes", "poires", "cerises"]
console.log(Object.values(stock));    // [12, 5, 30]
console.log(Object.entries(stock));   // [["pommes",12], ["poires",5], ...]</pre>

<p>Ces trois fonctions transforment un objet en tableau — et te redonnent donc accès à <code>map</code>, <code>filter</code>, <code>find</code> et compagnie.</p>

<h2>Parcourir clé et valeur ensemble</h2>
<pre class="bloc-code">for (const [produit, quantite] of Object.entries(stock)) {
    console.log(\`\${produit} : \${quantite}\`);
}</pre>
<p>La destructuration <code>[produit, quantite]</code> déballe chaque petit tableau à deux cases. C'est l'équivalent exact du <code>.items()</code> de Python.</p>

<h2>Calculer sur un objet</h2>
<pre class="bloc-code">const total = Object.values(stock).reduce((somme, n) => somme + n, 0);
console.log(total);      // 47</pre>

<div class="astuce"><div>Retiens la démarche générale : dès qu'un objet doit être parcouru, trié ou filtré, convertis-le en tableau avec <code>Object.entries()</code>, travaille dessus avec les méthodes de tableau, et reconvertis si besoin avec <code>Object.fromEntries()</code>.</div></div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Affiche sur deux lignes la liste des <strong>clés</strong> puis celle des <strong>valeurs</strong> de l\'objet.',
      codeDepart: 'const stock = { pommes: 12, poires: 5, cerises: 30 };\n\n',
      indices: [
        "Un objet n’est pas un tableau : pour le parcourir, il faut d’abord en extraire une liste.",
        "<code>Object.keys()</code> rend le tableau des noms, <code>Object.values()</code> celui des valeurs.",
        "<code>Object.keys(stock)</code> et <code>Object.values(stock)</code>"
      ],
      solution: 'const stock = { pommes: 12, poires: 5, cerises: 30 };\n\nconsole.log(Object.keys(stock));\nconsole.log(Object.values(stock));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (l[0] !== '["pommes","poires","cerises"]') return { ok: false, message: 'Attendu la liste des clés — tu affiches ' + l[0] + '.' };
        if (l[1] !== '[12,5,30]') return { ok: false, message: 'Attendu la liste des valeurs <code>[12,5,30]</code> — tu affiches ' + l[1] + '.' };
        return { ok: true, message: 'Un objet devient un tableau, et toute la boîte à outils des tableaux redevient disponible.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> parcours l\'objet avec <code>Object.entries</code> et affiche une ligne par produit, sous la forme <code>pommes : 12</code>.',
      codeDepart: 'const stock = { pommes: 12, poires: 5, cerises: 30 };\n\n',
      indices: [
        "Il faut la clé <strong>et</strong> la valeur en même temps, à chaque tour. Une troisième méthode donne les deux.",
        "<code>Object.entries()</code> rend un tableau de paires. La destructuration permet de récupérer les deux d’un coup dans la boucle.",
        "<code>for (const [produit, quantite] of Object.entries(stock))</code>"
      ],
      solution: 'const stock = { pommes: 12, poires: 5, cerises: 30 };\n\nfor (const [produit, quantite] of Object.entries(stock)) {\n  console.log(`${produit} : ${quantite}`);\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/Object\.entries/.test(ctx.code)) return { ok: false, message: 'Utilise <code>Object.entries(stock)</code> pour obtenir les couples clé/valeur.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes — j\'en compte ' + l.length + '.' };
        if (l[0].replace(/\s/g, '') !== 'pommes:12') return { ok: false, message: 'Format attendu : <code>pommes : 12</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'La destructuration dans la boucle rend le code très lisible : on nomme directement ce qu\'on manipule.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi :</strong> calcule le <strong>total du stock</strong> (47) en une seule expression, avec <code>Object.values</code> et <code>reduce</code>.',
      codeDepart: 'const stock = { pommes: 12, poires: 5, cerises: 30 };\n\n',
      indices: [
        "Une seule expression : extraire les valeurs, puis les additionner sans écrire de boucle.",
        "<code>Object.values()</code> donne le tableau des nombres ; <code>reduce</code> les totalise. Le second argument de <code>reduce</code> est le point de départ.",
        "<code>Object.values(stock).reduce((somme, n) =&gt; somme + n, 0)</code>"
      ],
      solution: 'const stock = { pommes: 12, poires: 5, cerises: 30 };\n\nconsole.log(Object.values(stock).reduce((somme, n) => somme + n, 0));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/reduce/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande <code>reduce</code>.' };
        if (/\b47\b/.test(ctx.code)) return { ok: false, message: 'Le total doit être calculé, pas écrit à la main.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '47') return { ok: false, message: 'Attendu <code>47</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Objet → tableau → reduce → un seul nombre. Cet enchaînement résout une grande partie des calculs sur des données.' };
      }
    }
  ]
},

/* ---------- jsav-16 ---------- */
{
  id: 'jsav-16',
  titre: 'Les classes JavaScript',
  contenu: `
<p>Tu as vu les classes en Java et en Python. JavaScript a les siennes, avec une syntaxe très proche.</p>

<pre class="bloc-code">class Chien {
    constructor(nom, age) {
        this.nom = nom;
        this.age = age;
    }

    aboyer() {
        return \`\${this.nom} dit Ouaf !\`;
    }
}

const rex = new Chien("Rex", 3);
console.log(rex.aboyer());
console.log(rex.nom);</pre>

<p>Les différences avec Java sont minces : pas de types à déclarer, le constructeur s'appelle littéralement <code>constructor</code>, et <code>this</code> joue le même rôle.</p>

<h2>L'héritage</h2>
<pre class="bloc-code">class Chiot extends Chien {
    constructor(nom) {
        super(nom, 0);            // appelle le constructeur parent
    }

    aboyer() {
        return super.aboyer() + " (tout aigu)";
    }
}</pre>
<p>Remarque <code>super.aboyer()</code> : on peut appeler la version du parent <strong>et</strong> y ajouter quelque chose, au lieu de la remplacer entièrement.</p>

<h2>Un piège propre à JavaScript : this</h2>
<pre class="bloc-code">const methode = rex.aboyer;
methode();      // ERREUR : this est perdu !</pre>
<p>En JavaScript, <code>this</code> dépend de <strong>comment</strong> la fonction est appelée, pas de l'endroit où elle a été écrite. Sortie de son objet, la méthode ne sait plus à qui elle appartient. C'est déroutant au début, et c'est l'une des raisons pour lesquelles les fonctions fléchées, qui n'ont pas leur propre <code>this</code>, sont si appréciées.</p>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Crée une classe <code>Chien</code> avec un constructeur prenant <code>nom</code>, et une méthode <code>aboyer()</code> renvoyant <code>« nom » dit Ouaf !</code>. Fabrique Rex et affiche son aboiement.',
      codeDepart: '',
      indices: [
        "Une classe décrit un moule ; <code>new</code> en tire un objet. Le constructeur reçoit ce qu’il faut pour le fabriquer.",
        "Dans le constructeur, <code>this.nom = nom</code> range la valeur dans l’objet. Les méthodes s’écrivent ensuite, sans <code>function</code> devant.",
        "<code>class Chien { constructor(nom) { this.nom = nom; } aboyer() { return `${this.nom} dit Ouaf !`; } }</code>"
      ],
      solution: 'class Chien {\n  constructor(nom) {\n    this.nom = nom;\n  }\n  aboyer() {\n    return `${this.nom} dit Ouaf !`;\n  }\n}\n\nconst rex = new Chien("Rex");\nconsole.log(rex.aboyer());',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/class\s+Chien/.test(ctx.code)) return { ok: false, message: 'Définis une <code>class Chien</code>.' };
        if (!/constructor\s*\(/.test(ctx.code)) return { ok: false, message: 'Ajoute un <code>constructor(nom)</code> qui range le nom avec <code>this.nom = nom;</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'Rex dit Ouaf !') return { ok: false, message: 'Attendu <code>Rex dit Ouaf !</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Même structure qu\'en Java, sans les types. Les concepts voyagent d\'un langage à l\'autre.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> ajoute une classe <code>Chiot</code> qui hérite de <code>Chien</code> et dont <code>aboyer()</code> renvoie le cri du parent suivi de <code> (tout aigu)</code>.',
      codeDepart: 'class Chien {\n  constructor(nom) {\n    this.nom = nom;\n  }\n  aboyer() {\n    return `${this.nom} dit Ouaf !`;\n  }\n}\n\n',
      indices: [
        "La classe enfant reprend tout du parent. Il suffit de redéfinir la méthode qu’on veut changer.",
        "<code>extends</code> établit le lien, et <code>super.methode()</code> appelle la version du parent — ce qui évite de la réécrire.",
        "<code>class Chiot extends Chien { aboyer() { return super.aboyer() + \" (tout aigu)\"; } }</code>"
      ],
      solution: 'class Chien {\n  constructor(nom) {\n    this.nom = nom;\n  }\n  aboyer() {\n    return `${this.nom} dit Ouaf !`;\n  }\n}\n\nclass Chiot extends Chien {\n  aboyer() {\n    return super.aboyer() + " (tout aigu)";\n  }\n}\n\nconsole.log(new Chiot("Bouba").aboyer());',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/extends\s+Chien/.test(ctx.code)) return { ok: false, message: 'La classe doit hériter : <code>class Chiot extends Chien</code>.' };
        if (!/super\s*\.\s*aboyer/.test(ctx.code)) return { ok: false, message: 'Réutilise la méthode du parent avec <code>super.aboyer()</code> plutôt que de recopier son texte.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length || !/dit Ouaf ! \(tout aigu\)/.test(l[0])) return { ok: false, message: 'Attendu quelque chose comme <code>Bouba dit Ouaf ! (tout aigu)</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: '<code>super.methode()</code> permet de compléter le parent au lieu de le remplacer : on évite ainsi de dupliquer son code.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi :</strong> crée une classe <code>Compteur</code> avec une valeur interne à 0, une méthode <code>incrementer()</code> et une méthode <code>valeur()</code>. Incrémente trois fois et affiche <code>3</code>.',
      codeDepart: '',
      indices: [
        "Un état interne à l’objet, et deux méthodes pour agir dessus : l’une le change, l’autre le lit.",
        "Le constructeur ne prend aucun paramètre : il initialise simplement la valeur à 0. Chaque méthode passe par <code>this.</code> pour l’atteindre.",
        "<code>constructor() { this.n = 0; }</code> · <code>incrementer() { this.n++; }</code> · <code>valeur() { return this.n; }</code>"
      ],
      solution: 'class Compteur {\n  constructor() {\n    this.n = 0;\n  }\n  incrementer() {\n    this.n++;\n  }\n  valeur() {\n    return this.n;\n  }\n}\n\nconst c = new Compteur();\nc.incrementer();\nc.incrementer();\nc.incrementer();\nconsole.log(c.valeur());',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/class\s+Compteur/.test(ctx.code)) return { ok: false, message: 'Définis une <code>class Compteur</code>.' };
        if (!/incrementer\s*\(/.test(ctx.code) || !/valeur\s*\(/.test(ctx.code)) return { ok: false, message: 'Il faut les deux méthodes : <code>incrementer()</code> et <code>valeur()</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '3') return { ok: false, message: 'Attendu <code>3</code> après trois incréments — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Un objet qui garde son état et le fait évoluer par ses propres méthodes : le principe de base de toute application.' };
      }
    }
  ]
},

/* ---------- jsav-17 ---------- */
{
  id: 'jsav-17',
  titre: 'Les closures',
  contenu: `
<p>Voici une notion réputée difficile, et pourtant limpide une fois vue en action. Une <strong>closure</strong> (« fermeture »), c'est une fonction qui <strong>se souvient</strong> de l'endroit où elle est née.</p>

<pre class="bloc-code">function creerCompteur() {
    let n = 0;                    // variable locale

    return function () {
        n++;                      // la fonction interne y accède
        return n;
    };
}

const compter = creerCompteur();
console.log(compter());    // 1
console.log(compter());    // 2
console.log(compter());    // 3</pre>

<h2>Ce qui devrait te surprendre</h2>
<p><code>creerCompteur()</code> s'est terminée dès la première ligne. Normalement, sa variable locale <code>n</code> aurait dû disparaître avec elle. Pourtant elle survit, et continue de s'incrémenter.</p>
<p>C'est parce que la fonction renvoyée <strong>garde un lien vivant</strong> vers l'environnement où elle a été créée. Tant qu'elle existe, <code>n</code> existe.</p>

<h2>Chaque appel crée un environnement neuf</h2>
<pre class="bloc-code">const a = creerCompteur();
const b = creerCompteur();
a(); a();
console.log(a());    // 3
console.log(b());    // 1 — b a son propre n</pre>

<h2>À quoi ça sert vraiment</h2>
<p>À créer des variables <strong>réellement privées</strong>. <code>n</code> n'est accessible de nulle part ailleurs : impossible de l'écraser par accident. C'est le mécanisme sur lequel reposent la plupart des bibliothèques JavaScript, et c'était la seule façon d'obtenir de l'encapsulation avant l'arrivée des classes.</p>

<div class="astuce"><div>Tu en as déjà utilisé sans le savoir : chaque fonction passée à <code>addEventListener</code> ou à <code>setTimeout</code> est une closure — elle se souvient des variables qui l'entouraient au moment où tu l'as écrite.</div></div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Écris <code>creerCompteur()</code> qui renvoie une fonction. Chaque appel de cette fonction doit renvoyer un nombre plus grand. Appelle-la trois fois et affiche les trois résultats.',
      codeDepart: '',
      indices: [
        "La fonction renvoyée doit se souvenir d’un nombre entre deux appels. La vraie question est : <strong>où</strong> déclarer ce nombre ?",
        "À l’intérieur de <code>creerCompteur</code>, mais en dehors de la fonction renvoyée. Celle-ci garde alors accès à cette variable, même après le retour.",
        "<code>let n = 0;</code> puis <code>return function () { n++; return n; };</code>"
      ],
      solution: 'function creerCompteur() {\n  let n = 0;\n  return function () {\n    n++;\n    return n;\n  };\n}\n\nconst compter = creerCompteur();\nconsole.log(compter());\nconsole.log(compter());\nconsole.log(compter());',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/return\s+function|=>\s*\{|return\s*\(/.test(ctx.code)) return { ok: false, message: 'La fonction <code>creerCompteur</code> doit RENVOYER une autre fonction.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.join(',') !== '1,2,3') return { ok: false, message: 'Attendu 1, 2, 3 — tu affiches ' + l.join(', ') + '. Si tu obtiens 1, 1, 1, la variable est déclarée au mauvais endroit : elle doit être DANS creerCompteur, pas dans la fonction renvoyée.' };
        return { ok: true, message: 'La variable a survécu à la fin de la fonction qui l\'a créée. C\'est exactement ça, une closure.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> crée <strong>deux</strong> compteurs indépendants. Incrémente le premier deux fois et le second une fois, puis affiche leurs valeurs (<code>3</code> puis <code>1</code>).',
      codeDepart: 'function creerCompteur() {\n  let n = 0;\n  return function () {\n    n++;\n    return n;\n  };\n}\n\n',
      indices: [
        "Chaque appel à <code>creerCompteur()</code> refabrique tout — y compris la variable interne.",
        "Deux appels séparés donnent donc deux variables indépendantes. Ce que fait l’un n’a aucun effet sur l’autre.",
        "<code>const a = creerCompteur();</code> et <code>const b = creerCompteur();</code>"
      ],
      solution: 'function creerCompteur() {\n  let n = 0;\n  return function () {\n    n++;\n    return n;\n  };\n}\n\nconst a = creerCompteur();\nconst b = creerCompteur();\na();\na();\nconsole.log(a());\nconsole.log(b());',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes : la valeur du premier compteur puis celle du second.' };
        if (l[0] !== '3') return { ok: false, message: 'Le premier compteur doit valoir 3 au troisième appel — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '1') return { ok: false, message: 'Le second compteur doit valoir 1 : il est indépendant. Tu affiches « ' + l[1] + ' » — as-tu bien appelé <code>creerCompteur()</code> une seconde fois ?' };
        return { ok: true, message: 'Chaque appel fabrique un environnement neuf. C\'est ce qui permet de créer autant de compteurs isolés qu\'on veut.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi :</strong> écris <code>creerMultiplicateur(facteur)</code> qui renvoie une fonction multipliant par ce facteur. Crée un doubleur et un tripleur, puis affiche <code>doubler(5)</code> et <code>tripler(5)</code>.',
      codeDepart: '',
      indices: [
        "Même mécanisme que le compteur, mais ce dont la fonction se souvient n’est plus une variable interne : c’est le <strong>paramètre</strong>.",
        "La fonction renvoyée capture <code>facteur</code>. Deux appels avec 2 et 3 donnent deux fonctions qui n’oublieront jamais le leur.",
        "<code>function creerMultiplicateur(facteur) { return function (x) { return x * facteur; }; }</code>"
      ],
      solution: 'function creerMultiplicateur(facteur) {\n  return function (x) {\n    return x * facteur;\n  };\n}\n\nconst doubler = creerMultiplicateur(2);\nconst tripler = creerMultiplicateur(3);\nconsole.log(doubler(5));\nconsole.log(tripler(5));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/creerMultiplicateur/.test(ctx.code)) return { ok: false, message: 'Définis la fonction <code>creerMultiplicateur(facteur)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes.' };
        if (l[0] !== '10') return { ok: false, message: 'doubler(5) doit donner 10 — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== '15') return { ok: false, message: 'tripler(5) doit donner 15 — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Une fonction qui fabrique des fonctions sur mesure. C\'est un motif extrêmement puissant, qu\'on retrouve dans toutes les bibliothèques modernes.' };
      }
    }
  ]
},

/* ---------- jsav-18 ---------- */
{
  id: 'jsav-18',
  titre: 'Le temps qui passe : setTimeout et setInterval',
  contenu: `
<p>JavaScript ne sait pas mettre un programme en pause. À la place, il permet de <strong>programmer du code pour plus tard</strong>.</p>

<pre class="bloc-code">console.log("avant");

setTimeout(function () {
    console.log("3 secondes plus tard");
}, 3000);

console.log("après");</pre>
<p>L'ordre d'affichage est : <code>avant</code>, <code>après</code>, puis <code>3 secondes plus tard</code>. Ça surprend au début, mais c'est logique : <code>setTimeout</code> <strong>enregistre</strong> la fonction et rend la main immédiatement. Le programme continue.</p>

<h2>Pourquoi c'est fait comme ça</h2>
<p>Parce qu'un navigateur ne peut pas se figer. Si JavaScript s'arrêtait vraiment 3 secondes, la page entière deviendrait insensible : plus de défilement, plus de clic. En programmant la suite « pour plus tard », le navigateur reste vivant.</p>

<h2>setInterval : répéter indéfiniment</h2>
<pre class="bloc-code">let n = 0;
const id = setInterval(function () {
    n++;
    console.log("tic " + n);
    if (n === 3) {
        clearInterval(id);      // INDISPENSABLE
    }
}, 1000);</pre>
<p><code>setInterval</code> répète sans jamais s'arrêter tout seul. Il faut garder son identifiant et appeler <code>clearInterval</code> pour le stopper — sinon il tourne jusqu'à la fermeture de la page, consommant des ressources pour rien.</p>

<div class="attention"><div>Le délai est un <strong>minimum</strong>, pas une garantie. Si le navigateur est occupé, ta fonction attendra son tour. C'est pourquoi on ne construit jamais une horloge précise en additionnant des <code>setTimeout</code> : les millisecondes perdues s'accumulent.</div></div>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Affiche <code>avant</code>, programme l\'affichage de <code>plus tard</code> dans 300 ms, puis affiche <code>apres</code>. Observe l\'ordre réel dans la console.',
      codeDepart: '',
      indices: [
        "<code>setTimeout</code> ne met pas le programme en pause : il <strong>programme</strong> quelque chose pour plus tard, et passe immédiatement à la suite.",
        "L’ordre affiché ne sera donc pas l’ordre écrit : « apres » sortira avant « plus tard », même avec un délai très court.",
        "<code>setTimeout(function () { console.log(\"plus tard\"); }, 300);</code> entre les deux autres."
      ],
      solution: 'console.log("avant");\nsetTimeout(function () {\n  console.log("plus tard");\n}, 300);\nconsole.log("apres");',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/setTimeout/.test(ctx.code)) return { ok: false, message: 'Utilise <code>setTimeout</code> pour programmer l\'affichage.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 3) return { ok: false, message: 'J\'attends trois lignes — j\'en compte ' + l.length + '.' };
        if (l[0] !== 'avant') return { ok: false, message: 'La première ligne affichée doit être « avant ».' };
        if (l[1] !== 'apres') return { ok: false, message: 'La deuxième ligne devrait être « apres » : setTimeout n\'arrête pas le programme, il enregistre la fonction pour plus tard. Tu affiches « ' + l[1] + ' ».' };
        if (l[2] !== 'plus tard') return { ok: false, message: 'La dernière ligne affichée doit être « plus tard ».' };
        return { ok: true, message: 'L\'ordre du code n\'est pas l\'ordre d\'exécution. C\'est le premier pas vers la programmation asynchrone.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> avec <code>setInterval</code>, affiche <code>tic 1</code>, <code>tic 2</code>, <code>tic 3</code> toutes les 100 ms, puis <strong>arrête la répétition</strong>.',
      codeDepart: 'let n = 0;\n\n',
      indices: [
        "<code>setInterval</code> répète sans fin. Pour l’arrêter, il faut avoir gardé de quoi le désigner.",
        "Il rend un identifiant : range-le dans une variable. Quand le compteur atteint 3, passe cet identifiant à <code>clearInterval</code>.",
        "<code>const id = setInterval(…)</code>, et dedans <code>if (n === 3) clearInterval(id);</code>"
      ],
      solution: 'let n = 0;\n\nconst id = setInterval(function () {\n  n++;\n  console.log("tic " + n);\n  if (n === 3) {\n    clearInterval(id);\n  }\n}, 100);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/setInterval/.test(ctx.code)) return { ok: false, message: 'Utilise <code>setInterval</code>.' };
        if (!/clearInterval/.test(ctx.code)) return { ok: false, message: 'Il faut arrêter la répétition avec <code>clearInterval(id)</code> — sinon elle tournerait indéfiniment.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 3) return { ok: false, message: 'J\'attends au moins 3 lignes — j\'en compte ' + l.length + '.' };
        if (l[0] !== 'tic 1' || l[2] !== 'tic 3') return { ok: false, message: 'Attendu « tic 1 », « tic 2 », « tic 3 » — tu affiches ' + l.slice(0, 3).join(', ') + '.' };
        if (l.length > 4) return { ok: false, message: 'La répétition ne s\'est pas arrêtée (' + l.length + ' lignes) : vérifie que <code>clearInterval</code> est bien appelé quand n vaut 3.' };
        return { ok: true, message: 'Un setInterval sans clearInterval est une fuite : il continue de consommer des ressources même quand plus personne ne le regarde.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Pourquoi <code>setTimeout(f, 3000)</code> ne met-il pas le programme en pause pendant 3 secondes ?',
      choix: [
        'Parce que la page deviendrait totalement insensible pendant ce temps',
        'Parce que JavaScript ne sait pas mesurer le temps',
        'Parce que 3000 millisecondes, c\'est trop long',
        'Parce que la fonction f s\'exécute immédiatement'
      ],
      bonne: 0,
      explication: 'JavaScript n\'a qu\'un seul fil d\'exécution dans le navigateur : s\'il s\'arrête, tout s\'arrête — défilement, clics, animations. En programmant la suite pour plus tard, le navigateur reste réactif.',
      aides: [
        null,
        'Il le mesure très bien — c\'est justement le rôle du délai. La question est de savoir ce que fait le programme pendant ce temps.',
        'La durée n\'a rien à voir : le comportement est identique avec 10 millisecondes.',
        'Non, elle s\'exécute bien après le délai. C\'est le reste du programme qui, lui, continue immédiatement.'
      ]
    }
  ]
},

/* ---------- jsav-19 ---------- */
{
  id: 'jsav-19',
  titre: 'JSON, erreurs et écritures modernes',
  contenu: `
<h2>JSON : le format d'échange universel</h2>
<p>JSON (JavaScript Object Notation) est la façon dont les applications s'envoient des données. C'est du texte, qui ressemble à un objet JavaScript.</p>
<pre class="bloc-code">const contact = { nom: "Alex", tags: ["a", "b"] };

const texte = JSON.stringify(contact);   // objet → texte
console.log(typeof texte);               // string

const retour = JSON.parse(texte);        // texte → objet
console.log(retour.nom);                 // Alex</pre>
<p>Tu l'as déjà utilisé pour <code>localStorage</code>, qui ne sait stocker que du texte. C'est aussi le format que renvoient presque toutes les API du web.</p>

<h2>try / catch : ne pas planter</h2>
<pre class="bloc-code">try {
    const data = JSON.parse("ceci n'est pas du JSON");
    console.log(data);
} catch (erreur) {
    console.log("Données illisibles");
}
console.log("le programme continue");</pre>
<p>Même principe qu'en Python : on tente, et on prévoit le cas où ça échoue. Indispensable dès qu'on traite des données venant de l'extérieur.</p>

<h2>Deux écritures qui simplifient la vie</h2>
<pre class="bloc-code">const config = { serveur: { port: 8080 } };

// Le chaînage optionnel ?.
console.log(config?.serveur?.port);      // 8080
console.log(config?.base?.port);         // undefined — sans planter

// Le ?? : une valeur de repli si null ou undefined
const port = config.base?.port ?? 3000;
console.log(port);                       // 3000</pre>
<p>Attention à la nuance entre <code>??</code> et <code>||</code> : <code>0 || 100</code> donne 100 (car 0 est considéré comme faux), alors que <code>0 ?? 100</code> donne 0. Quand une valeur de 0 est légitime, <code>??</code> est le bon choix.</p>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Convertis l\'objet en texte JSON, affiche son <code>typeof</code>, puis reconvertis-le en objet et affiche son <code>nom</code>.',
      codeDepart: 'const contact = { nom: "Alex", ville: "Lyon" };\n\n',
      indices: [
        "Deux conversions opposées : un objet vers du texte, puis ce texte vers un objet. Le <code>typeof</code> entre les deux montre ce qui a changé.",
        "<code>JSON.stringify</code> transforme en texte, <code>JSON.parse</code> reconstruit l’objet. Une fois reconstruit, on lit ses clés normalement.",
        "<code>const texte = JSON.stringify(contact);</code> puis <code>JSON.parse(texte).nom</code>"
      ],
      solution: 'const contact = { nom: "Alex", ville: "Lyon" };\n\nconst texte = JSON.stringify(contact);\nconsole.log(typeof texte);\nconst retour = JSON.parse(texte);\nconsole.log(retour.nom);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/JSON\.stringify/.test(ctx.code) || !/JSON\.parse/.test(ctx.code)) return { ok: false, message: 'Utilise <code>JSON.stringify</code> puis <code>JSON.parse</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'string') return { ok: false, message: 'Après stringify, le type doit être <code>string</code> — tu affiches « ' + l[0] + ' ».' };
        if (l[1] !== 'Alex') return { ok: false, message: 'Après parse, <code>retour.nom</code> vaut Alex — tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Objet → texte → objet : ce va-et-vient est au cœur de toute communication entre applications.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement :</strong> protège un <code>JSON.parse</code> sur un texte invalide avec <code>try</code>/<code>catch</code>. Affiche <code>Données illisibles</code> puis <code>le programme continue</code>.',
      codeDepart: 'const mauvais = "ceci n\'est pas du JSON";\n\n',
      indices: [
        "Le parse va échouer, c’est voulu. Ce qui compte, c’est que le programme <strong>continue</strong> ensuite.",
        "Ce qui peut planter va dans le <code>try</code>, le message dans le <code>catch</code>. Le dernier affichage, lui, se place après le bloc entier.",
        "<code>try { JSON.parse(mauvais); } catch (erreur) { console.log(\"Données illisibles\"); }</code> puis la suite."
      ],
      solution: 'const mauvais = "ceci n\'est pas du JSON";\n\ntry {\n  JSON.parse(mauvais);\n} catch (erreur) {\n  console.log("Données illisibles");\n}\nconsole.log("le programme continue");',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Le programme plante encore : ' + ctx.erreur + ' — c\'est justement ce que le try/catch doit éviter.' };
        if (!/try\s*\{/.test(ctx.code) || !/catch\s*\(/.test(ctx.code)) return { ok: false, message: 'Il faut un bloc <code>try { ... } catch (e) { ... }</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.some(x => /illisibles/i.test(x))) return { ok: false, message: 'Le message « Données illisibles » devrait s\'afficher dans le catch.' };
        if (!l.some(x => /continue/i.test(x))) return { ok: false, message: 'La ligne « le programme continue » doit s\'afficher : place-la APRÈS le bloc try/catch.' };
        return { ok: true, message: 'Erreur attrapée, programme intact. C\'est indispensable dès qu\'on traite des données qu\'on ne contrôle pas.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi :</strong> avec <code>?.</code> et <code>??</code>, affiche le port du serveur (<code>8080</code>) puis celui de la base — qui n\'existe pas et doit valoir <code>3000</code> par défaut.',
      codeDepart: 'const config = { serveur: { port: 8080 } };\n\n',
      indices: [
        "Deux écritures modernes, pour deux problèmes différents : traverser une structure sans planter, et remplacer une absence par une valeur.",
        "<code>?.</code> s’arrête proprement si le chemin est rompu. <code>??</code> fournit une valeur de repli quand on obtient <code>undefined</code> ou <code>null</code>.",
        "<code>config?.serveur?.port</code> et <code>config.base?.port ?? 3000</code>"
      ],
      solution: 'const config = { serveur: { port: 8080 } };\n\nconsole.log(config?.serveur?.port);\nconsole.log(config.base?.port ?? 3000);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur + ' — le chaînage optionnel <code>?.</code> évite précisément ce plantage.' };
        if (!/\?\./.test(ctx.code)) return { ok: false, message: 'Utilise le chaînage optionnel <code>?.</code>.' };
        if (!/\?\?/.test(ctx.code)) return { ok: false, message: 'Utilise l\'opérateur <code>??</code> pour la valeur par défaut.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '8080') return { ok: false, message: 'Le premier port est 8080 — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        if (l[1] !== '3000') return { ok: false, message: 'La configuration de base n\'existe pas : le résultat doit être 3000 grâce à <code>?? 3000</code>. Tu affiches « ' + l[1] + ' ».' };
        return { ok: true, message: 'Module JavaScript avancé terminé ! ⚡ Portée, égalité stricte, destructuration, spread, closures, classes, asynchrone, JSON : tu écris désormais du JavaScript moderne, celui qu\'on trouve dans les vrais projets.' };
      }
    }
  ]
}
];
