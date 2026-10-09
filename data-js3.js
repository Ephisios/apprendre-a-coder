/* ===== Module JavaScript — la suite (js2-1 à js2-8) ===== */
window.DATA_JS3 = [

{
  id: 'js2-1',
  titre: 'switch et l\'opérateur ternaire',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu sais tout faire avec <code>if / else if / else</code>. Vraiment tout — ces deux formes-ci n'ajoutent aucun pouvoir au langage.</p>
<p>Elles ajoutent de la <strong>lisibilité</strong>, et c'est loin d'être secondaire : du code se lit bien plus souvent qu'il ne s'écrit. Une pile de huit <code>else if</code> qui comparent tous la même variable cache ce qu'elle fait derrière sa longueur. Les deux écritures de cette leçon rendent l'intention visible d'un coup d'œil.</p>

<h2>switch : l'aiguillage</h2>
<pre class="bloc-code">switch (jour) {
  case "samedi":
  case "dimanche":
    console.log("Week-end !");
    break;
  case "mercredi":
    console.log("Milieu de semaine");
    break;
  default:
    console.log("Au travail");
}</pre>
<p>On compare <strong>une</strong> variable à plusieurs valeurs précises. Deux <code>case</code> collés, comme samedi et dimanche, partagent le même traitement. Le <code>default</code> attrape tout le reste — c'est l'équivalent du <code>else</code> final.</p>
<p>Le <code>switch</code> compare avec <code>===</code>, donc sans conversion : le texte « 5 » ne correspondra jamais au nombre 5.</p>

<h2>Le ternaire : un if qui rend une valeur</h2>
<pre class="bloc-code">let tarif = age &lt; 18 ? 5 : 12;</pre>
<p>Il se lit comme une phrase : « si l'âge est inférieur à 18, alors 5, sinon 12 ». Sa force est qu'il <em>produit une valeur</em>, et peut donc se ranger dans une variable — ce qu'un <code>if</code> ordinaire ne sait pas faire.</p>

<h2>Pas à pas : le break oublié</h2>
<p>Voici le piège du <code>switch</code>, mesuré. Avec <code>jour = "samedi"</code> et aucun <code>break</code> :</p>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td><code>case "samedi"</code></td><td>Correspond : il affiche « week-end ».</td></tr>
<tr><td>pas de <code>break</code></td><td>Il <strong>continue</strong> dans le cas suivant, sans le tester.</td></tr>
<tr><td><code>case "lundi"</code></td><td>Il affiche « boulot » — alors qu'on n'est pas lundi.</td></tr>
</table>
<p>Résultat affiché : <code>week-end</code> puis <code>boulot</code>. Aucune erreur n'est signalée. Le <code>break</code> ne décore pas : il dit « sors du switch ». Sans lui, l'exécution coule dans tous les cas suivants.</p>

<h2>Les pièges</h2>
<p><strong>Le <code>break</code> oublié.</strong> C'est l'erreur emblématique de cette leçon, et elle est silencieuse. Si ton switch exécute plusieurs branches, c'est toujours ça.</p>
<p><strong>Un ternaire imbriqué.</strong> <code>a ? b : c ? d : e</code> est valide et illisible. Dès qu'il y a deux conditions, un <code>if / else if</code> est plus clair — et le but de ces formes est justement la clarté.</p>
<p><strong>Un ternaire qu'on utilise comme un <code>if</code>.</strong> Il sert à <em>choisir une valeur</em>. Écrire un ternaire dont les deux branches sont des <code>console.log</code> détourne l'outil : c'est un <code>if</code> qu'il fallait.</p>

<h2>Dans la vraie vie</h2>
<p>Le <code>switch</code> est partout dans le code qui réagit à des états : un type de message reçu, une touche pressée, une étape d'un formulaire. Le ternaire, lui, s'écrit surtout à l'intérieur de textes — un libellé au singulier ou au pluriel, une couleur selon un seuil.</p>

<div class="a-retenir">
<ul>
<li><code>switch</code> compare une variable à des valeurs précises, avec <code>===</code> et sans conversion.</li>
<li>Sans <code>break</code>, l'exécution continue dans les cas suivants — sans les tester, et sans erreur.</li>
<li>Le ternaire <code>condition ? a : b</code> produit une valeur : il se range dans une variable.</li>
<li>Deux conditions ou plus : reviens au <code>if</code>, c'est plus lisible.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la chute volontaire</summary>
<p>Enchaîner deux <code>case</code> sans <code>break</code>, comme samedi et dimanche, s'appelle une « chute » et c'est parfaitement voulu. Le problème n'est pas la chute elle-même mais le fait qu'elle soit <em>invisible</em> : rien ne distingue une chute choisie d'un <code>break</code> oublié. L'usage est d'écrire un commentaire explicite quand on la veut — pour la personne qui relira.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'La machine à menus : avec un <code>switch</code> sur la variable <code>jour</code>, affiche <code>Poisson</code> pour vendredi, <code>Pizza</code> pour samedi, <code>Rôti</code> pour dimanche, et <code>Plat du chef</code> pour tout le reste (default). Teste avec plusieurs jours !',
      codeDepart: 'let jour = "samedi";\n\n// Ton switch ici\n',
      indices: [
        "Un <code>switch</code> compare une valeur à plusieurs cas possibles. Chaque cas doit se terminer par un mot qui empêche de continuer dans le suivant.",
        "Sans <code>break</code>, l’exécution « tombe » dans le cas d’après et affiche tout ce qui reste. Le <code>default</code>, lui, attrape ce qui n’a été prévu nulle part.",
        "<code>switch (jour) { case \"vendredi\": … break; … default: … }</code> — un <code>break</code> après chaque <code>case</code>."
      ],
      solution: 'let jour = "samedi";\n\nswitch (jour) {\n  case "vendredi":\n    console.log("Poisson");\n    break;\n  case "samedi":\n    console.log("Pizza");\n    break;\n  case "dimanche":\n    console.log("Rôti");\n    break;\n  default:\n    console.log("Plat du chef");\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/switch\s*\(/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande un <code>switch</code> (pas des if !).' };
        if (!/default\s*:/.test(ctx.code)) return { ok: false, message: 'Il manque le cas <code>default:</code> pour les autres jours.' };
        const m = ctx.code.match(/let\s+jour\s*=\s*["']([^"']*)/);
        const jour = m ? m[1] : 'samedi';
        const attendu = { vendredi: 'Poisson', samedi: 'Pizza', dimanche: 'Rôti' }[jour] || 'Plat du chef';
        if (ctx.logs.length > 1) return { ok: false, message: 'Plusieurs plats s\'affichent ! Il manque des <code>break;</code> — sans eux, l\'exécution traverse les case suivants.' };
        if (ctx.logs[0] !== attendu) return { ok: false, message: 'Avec jour = "' + jour + '", le menu attendu est « ' + attendu + ' » (affiché : « ' + (ctx.logs[0] || 'rien') + ' »).' };
        return { ok: true, message: 'Et tu as éprouvé le break — l\'oubli le plus sournois du switch, maintenant vacciné.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : le ternaire.</strong> En UNE ligne chacune (avec l\'opérateur <code>? :</code>), crée : <code>parite</code> qui vaut <code>"pair"</code> ou <code>"impair"</code> selon <code>nombre % 2</code>, et <code>badge</code> qui vaut <code>"⭐ VIP"</code> si <code>points >= 100</code>, sinon <code>"Membre"</code>. Affiche les deux.',
      codeDepart: 'let nombre = 7;\nlet points = 150;\n\n// Deux ternaires, deux affichages\n',
      indices: [
        "Le ternaire condense un <code>if/else</code> qui ne fait qu’une chose : choisir entre deux valeurs. Il tient sur une ligne et rend directement un résultat.",
        "La forme : la condition, puis <code>?</code>, puis la valeur si vrai, puis <code>:</code>, puis la valeur si faux. Le tout se range dans une variable.",
        "<code>let parite = (nombre % 2 === 0) ? \"pair\" : \"impair\";</code> — même schéma pour <code>badge</code>."
      ],
      solution: 'let nombre = 7;\nlet points = 150;\n\nlet parite = (nombre % 2 === 0) ? "pair" : "impair";\nlet badge = (points >= 100) ? "⭐ VIP" : "Membre";\n\nconsole.log(parite);\nconsole.log(badge);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/\?/.test(ctx.code) || !/:/.test(ctx.code)) return { ok: false, message: 'Le défi : utiliser l\'opérateur ternaire <code>condition ? siVrai : siFaux</code> — pas de if/else ici !' };
        if (/if\s*\(/.test(ctx.code)) return { ok: false, message: 'Pas de <code>if</code> pour cet exercice : tout en ternaires !' };
        const n = parseInt((ctx.code.match(/nombre\s*=\s*(-?\d+)/) || [])[1] || 7);
        const p = parseInt((ctx.code.match(/points\s*=\s*(\d+)/) || [])[1] || 150);
        const pariteAttendue = n % 2 === 0 ? 'pair' : 'impair';
        const badgeAttendu = p >= 100 ? 'VIP' : 'Membre';
        if (!ctx.logs.some(l => l === pariteAttendue)) return { ok: false, message: 'Avec nombre = ' + n + ', <code>parite</code> devrait valoir « ' + pariteAttendue + ' ». Vérifie la condition <code>nombre % 2 === 0</code>.' };
        if (!ctx.logs.some(l => l.includes(badgeAttendu))) return { ok: false, message: 'Avec points = ' + p + ', le badge attendu contient « ' + badgeAttendu + ' ».' };
        return { ok: true, message: 'Le ternaire : compact, lisible, partout dans le code moderne. Tu le repéreras désormais au premier coup d\'œil.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Dans un switch, on oublie le <code>break;</code> après un case. Que se passe-t-il ?',
      choix: [
        'Une erreur bloque le programme',
        'Le case est ignoré',
        'L\'exécution continue dans le case suivant, même si sa valeur ne correspond pas',
        'Rien, le break est optionnel sans conséquence'
      ],
      bonne: 2,
      explication: 'C\'est le « fall-through » : sans break, le code traverse les case suivants. Parfois voulu (grouper samedi/dimanche), le plus souvent... un bug silencieux. Le pire genre.',
      aides: [
        'Aucune erreur : le langage considère ça comme valide (et parfois utile).',
        'Au contraire, il s\'exécute — ET ceux d\'après aussi.',
        '',
        'Sans conséquence ? Essaie de retirer un break dans l\'exercice 1 : deux plats s\'affichent !'
      ]
    }
  ]
},

{
  id: 'js2-2',
  titre: 'Textes avancés : découper, remplacer, nettoyer',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Les données du monde réel arrivent en vrac : un nom saisi avec des espaces en trop, une liste collée depuis un tableur et séparée par des virgules, une date au mauvais format. Avant de pouvoir s'en servir, il faut les découper, les nettoyer, en extraire des morceaux.</p>
<p>Ce travail-là occupe une bonne part du métier, et JavaScript fournit une petite trousse d'outils pour le faire.</p>

<h2>Découper et extraire</h2>
<pre class="bloc-code">let phrase = "le chat dort";

phrase.split(" ")   // ["le", "chat", "dort"] — un tableau !
phrase.slice(0, 7)  // "le chat" — du caractere 0 jusqu'au 7 exclu
phrase.slice(-4)    // "dort" — les quatre derniers</pre>
<p><code>split</code> transforme un texte en <strong>tableau</strong> : c'est le pont entre les deux mondes, et sans doute la méthode la plus utile de la leçon. <code>slice</code> découpe en comptant les caractères, et accepte des nombres négatifs pour compter depuis la fin.</p>

<h2>Nettoyer et transformer</h2>
<ul>
<li><code>trim()</code> — enlève les espaces au début et à la fin ;</li>
<li><code>toLowerCase()</code> et <code>toUpperCase()</code> — changent la casse ;</li>
<li><code>replace("a", "b")</code> — remplace la <strong>première</strong> occurrence ; <code>replaceAll</code> les remplace toutes ;</li>
<li><code>includes("chat")</code> — rend <code>true</code> ou <code>false</code> ;</li>
<li><code>indexOf("chat")</code> — la position, ou <code>-1</code> si absent.</li>
</ul>

<h2>Pas à pas</h2>
<p>Un nettoyage complet, mesuré sur <code>"  le chat dort  "</code> :</p>
<table class="memo-table trace">
<tr><th>Appel</th><th>Résultat</th></tr>
<tr><td><code>.trim()</code></td><td>« le chat dort » — les espaces des bords ont disparu</td></tr>
<tr><td><code>.trim().split(" ")</code></td><td><code>["le","chat","dort"]</code></td></tr>
<tr><td><code>.trim().slice(0, 7)</code></td><td>« le chat »</td></tr>
<tr><td><code>.trim().slice(-4)</code></td><td>« dort »</td></tr>
</table>
<p>Remarque l'enchaînement : chaque méthode rend un texte, sur lequel on peut aussitôt en appeler une autre. On lit de gauche à droite, dans l'ordre des opérations.</p>

<h2>Les pièges</h2>
<p><strong>Croire qu'une méthode modifie le texte.</strong> C'est le piège central. <code>phrase.trim()</code> ne change pas <code>phrase</code> : il <em>rend</em> un nouveau texte. En JavaScript, les textes ne se modifient jamais. Si tu veux garder le résultat, il faut le ranger : <code>phrase = phrase.trim();</code>.</p>
<p><strong>Oublier que <code>replace</code> ne remplace qu'une fois.</strong> <code>"a-b-c".replace("-", " ")</code> donne « a b-c ». Pour tout remplacer, c'est <code>replaceAll</code>.</p>
<p><strong>Confondre <code>split("")</code> et <code>split(" ")</code>.</strong> Le premier, avec un texte vide, découpe caractère par caractère ; le second découpe aux espaces. Une espace d'écart, et un mot devient une liste de lettres.</p>
<p><strong>Comparer sans normaliser.</strong> « Camille » et « camille » sont deux textes différents pour <code>===</code>. Avant de comparer des saisies, on passe tout en minuscules et on <code>trim</code>.</p>

<h2>Dans la vraie vie</h2>
<p>Un champ de recherche nettoie ce qu'on y tape avant de chercher. Un import de fichier découpe chaque ligne aux virgules. Une vérification d'adresse électronique regarde s'il y a bien une arobase. Tout cela, ce sont les cinq méthodes ci-dessus — et pas grand-chose d'autre.</p>

<div class="a-retenir">
<ul>
<li><code>split</code> transforme un texte en tableau : c'est le pont vers tout ce que tu sais faire sur les tableaux.</li>
<li>Les méthodes de texte ne modifient jamais l'original : elles rendent un nouveau texte à ranger.</li>
<li><code>replace</code> ne remplace que la première occurrence ; <code>replaceAll</code> les remplace toutes.</li>
<li>Avant de comparer des saisies : <code>trim()</code> et <code>toLowerCase()</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi les textes sont-ils immuables ?</summary>
<p>C'est un choix de conception partagé par la plupart des langages modernes. Un texte qui ne change jamais peut être partagé sans risque entre plusieurs endroits du programme : personne ne peut le modifier sous le nez d'un autre. Le prix à payer est qu'il faut tout réaffecter — et c'est précisément l'oubli le plus fréquent du débutant.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Le fichier d\'invités arrive en une seule ligne, séparée par des virgules. 1) Avec <code>split</code>, transforme-le en tableau <code>invites</code>. 2) Affiche le nombre d\'invités (5). 3) Avec une boucle, affiche chaque invité sur sa ligne.',
      codeDepart: 'let donnees = "Léa,Tom,Nina,Sam,Zoé";\n',
      indices: [
        "Une longue chaîne séparée par des virgules n’est pas encore une liste. Il faut la découper avant de pouvoir la compter ou la parcourir.",
        "<code>split(\",\")</code> rend un tableau. Ensuite <code>.length</code> pour le compte, et une boucle pour l’affichage — <code>for…of</code> parcourt directement les valeurs.",
        "<code>let invites = donnees.split(\",\");</code> puis <code>for (const invite of invites) { … }</code>"
      ],
      solution: 'let donnees = "Léa,Tom,Nina,Sam,Zoé";\n\nlet invites = donnees.split(",");\nconsole.log(invites.length);\n\nfor (const invite of invites) {\n  console.log(invite);\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/\.split\s*\(/.test(ctx.code)) return { ok: false, message: 'La découpe passe par <code>split(",")</code> — le texte devient un tableau.' };
        if (!ctx.logs.includes('5')) return { ok: false, message: 'Affiche le nombre d\'invités : <code>invites.length</code> (résultat : 5).' };
        if (!ctx.logs.includes('Léa') || !ctx.logs.includes('Zoé')) return { ok: false, message: 'Chaque invité doit s\'afficher sur sa propre ligne (boucle sur le tableau).' };
        return { ok: true, message: 'Texte → split → tableau → boucle : la chaîne de traitement de 90% des fichiers de données du monde (les fameux CSV !).' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : le nettoyeur de pseudo.</strong> Le pseudo saisi est une horreur : espaces autour, et des espaces interdits au milieu. Nettoie-le en enchaînant les méthodes : <code>trim()</code> pour les bords, <code>replaceAll(" ", "_")</code> pour l\'intérieur, <code>toLowerCase()</code> pour uniformiser. Résultat attendu : <code>super_codeur_3000</code>.',
      codeDepart: 'let saisie = "   Super Codeur 3000  ";\n\n// Nettoie et affiche\n',
      indices: [
        "Trois nettoyages à enchaîner, et leur <strong>ordre</strong> décide du résultat. Demande-toi ce que deviendraient les espaces des bords si tu les remplaçais avant de les couper.",
        "<code>trim()</code> coupe les bords, <code>replaceAll(\" \", \"_\")</code> remplace l’intérieur, <code>toLowerCase()</code> met en minuscules. Chacune rend un texte, donc elles s’enchaînent.",
        "<code>saisie.trim().replaceAll(\" \", \"_\").toLowerCase()</code> — <code>trim</code> en premier, sinon les espaces des bords deviendraient des tirets bas."
      ],
      solution: 'let saisie = "   Super Codeur 3000  ";\n\nlet pseudo = saisie.trim().replaceAll(" ", "_").toLowerCase();\nconsole.log(pseudo);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/trim\s*\(/.test(ctx.code)) return { ok: false, message: 'Commence par <code>trim()</code> pour retirer les espaces des bords.' };
        if (ctx.logs.some(l => /^_|_$/.test(l))) return { ok: false, message: 'Ton résultat commence ou finit par _ : le trim doit passer AVANT le replaceAll (sinon les espaces des bords sont transformés au lieu d\'être supprimés).' };
        if (!ctx.logs.includes('super_codeur_3000')) return { ok: false, message: 'Résultat attendu : <code>super_codeur_3000</code> (obtenu : « ' + (ctx.logs[0] || 'rien') + ' »). Enchaîne trim → replaceAll(" ", "_") → toLowerCase.' };
        return { ok: true, message: 'Enchaîner les méthodes en pipeline de nettoyage : c\'est comme ça que les vrais sites normalisent pseudos et emails.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : les initiales.</strong> Écris une fonction <code>initiales(nomComplet)</code> qui retourne les initiales en majuscules séparées par des points : <code>initiales("marie curie")</code> → <code>M.C</code>. La méthode : split sur l\'espace, prendre le caractère [0] de chaque mot, toUpperCase, join avec un point. Teste avec les deux appels fournis.',
      codeDepart: 'function initiales(nomComplet) {\n\n}\n\nconsole.log(initiales("marie curie"));\nconsole.log(initiales("jean paul du pont"));',
      indices: [
        "Trois étapes : séparer les mots, prendre la première lettre de chacun en majuscule, puis recoller avec des points.",
        "<code>map()</code> transforme chaque élément et rend un <strong>nouveau</strong> tableau ; <code>join(\".\")</code> le recolle en intercalant le point.",
        "<code>mots.map((m) =&gt; m[0].toUpperCase())</code> puis <code>lettres.join(\".\")</code>"
      ],
      solution: 'function initiales(nomComplet) {\n  let mots = nomComplet.split(" ");\n  let lettres = mots.map((m) => m[0].toUpperCase());\n  return lettres.join(".");\n}\n\nconsole.log(initiales("marie curie"));\nconsole.log(initiales("jean paul du pont"));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/function\s+initiales/.test(ctx.code)) return { ok: false, message: 'Garde la fonction <code>initiales(nomComplet)</code>.' };
        if (ctx.logs[0] !== 'M.C') return { ok: false, message: '<code>initiales("marie curie")</code> doit retourner « M.C » (obtenu : « ' + (ctx.logs[0] || 'rien') + ' »). Split → premier caractère de chaque mot → majuscule → join(".").' };
        if (ctx.logs[1] !== 'J.P.D.P') return { ok: false, message: 'Presque ! Avec 4 mots, on attend « J.P.D.P » (obtenu : « ' + (ctx.logs[1] || 'rien') + ' ») — ta fonction doit marcher pour N\'IMPORTE quel nombre de mots.' };
        return { ok: true, message: 'split + map + join en trois lignes : tu combines les textes ET les tableaux avec aisance. C\'est du code de niveau professionnel.' };
      }
    }
  ]
},

{
  id: 'js2-3',
  titre: 'Tableaux avancés : sort, reduce, spread',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu sais parcourir un tableau avec une boucle et un accumulateur. Ça marche, et c'est beaucoup de lignes pour des opérations qui reviennent sans cesse : trier, additionner, copier.</p>
<p>Les méthodes de cette leçon font ces trois choses en une ligne. Et l'une d'elles cache le piège le plus célèbre de JavaScript.</p>

<h2>Trier : le piège légendaire</h2>
<pre class="bloc-code">let mots = ["poire", "abricot", "melon"];
mots.sort();                    // ordre alphabetique, comme attendu

let nombres = [40, 7, 100];
nombres.sort();                 // [100, 40, 7]  ?!
nombres.sort((a, b) =&gt; a - b);  // [7, 40, 100]  correct</pre>
<p>Mesuré, et c'est bien ce qui s'affiche : <code>[100,40,7]</code>. Sans fonction de comparaison, <code>sort</code> convertit tout en <strong>texte</strong> et trie alphabétiquement. Or « 100 » vient avant « 40 » dans l'ordre des mots, comme « ab » vient avant « b ».</p>
<p>La règle est donc sans exception : <strong>pour trier des nombres, on donne toujours un comparateur</strong>. <code>(a, b) =&gt; a - b</code> pour croissant, <code>b - a</code> pour décroissant.</p>
<p>Attention aussi : <code>sort</code> modifie le tableau d'origine, contrairement à presque tout le reste.</p>

<h2>reduce : réduire à une seule valeur</h2>
<pre class="bloc-code">let prix = [12, 8, 5];
let total = prix.reduce((somme, p) =&gt; somme + p, 0);  // 25</pre>
<p>Deux arguments : une fonction qui reçoit l'accumulateur et l'élément courant, puis la <strong>valeur de départ</strong>. Cette valeur de départ n'est pas facultative en pratique — on y revient.</p>

<h2>Le spread : copier au lieu de partager</h2>
<pre class="bloc-code">let a = [1, 2];
let b = [...a];   // une vraie copie
b.push(3);
console.log(a);   // [1,2] — intacte</pre>
<p>Les trois points déroulent un tableau dans un autre. Sans eux, <code>let b = a;</code> ne copie rien : les deux noms désignent le <em>même</em> tableau. Mesuré — après un <code>push</code> sur <code>b</code>, <code>a</code> vaut <code>[1,2,3]</code>.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Code</th><th>Ce que vaut a ensuite</th></tr>
<tr><td><code>let b = a; b.push(3);</code></td><td><code>[1,2,3]</code> — le même tableau</td></tr>
<tr><td><code>let b = [...a]; b.push(3);</code></td><td><code>[1,2]</code> — a est protégée</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Trier des nombres sans comparateur.</strong> Aucune erreur, et un résultat faux qui paraît plausible sur de petits nombres — le bug reste caché jusqu'à ce qu'un 100 croise un 40.</p>
<p><strong>Oublier la valeur de départ de <code>reduce</code>.</strong> Sur un tableau vide, le moteur s'arrête net avec <code>Reduce of empty array with no initial value</code>. Avec un <code>0</code> en second argument, le même code rend <code>0</code> tranquillement. Mets toujours la valeur de départ.</p>
<p><strong>Croire que <code>=</code> copie un tableau.</strong> C'est la source de bugs la plus déroutante du niveau : on modifie une copie, et l'original change aussi. Le spread, ou <code>slice()</code>, font une vraie copie.</p>
<p><strong>Oublier que <code>sort</code> modifie sur place.</strong> Pour garder l'ordre d'origine, trie une copie : <code>[...liste].sort(...)</code>.</p>

<h2>Dans la vraie vie</h2>
<p>Un classement de scores, c'est un <code>sort</code> avec comparateur. Un total de panier, un <code>reduce</code>. Une liste filtrée qu'on ne veut pas abîmer, un spread. Ces trois-là couvrent l'essentiel du traitement de données côté navigateur.</p>

<div class="a-retenir">
<ul>
<li><code>sort()</code> sans comparateur trie comme du texte : <code>[40,7,100]</code> devient <code>[100,40,7]</code>.</li>
<li><code>sort</code> modifie le tableau d'origine — trie une copie si tu veux le garder.</li>
<li><code>reduce</code> prend toujours une valeur de départ, sinon il casse sur un tableau vide.</li>
<li><code>let b = a</code> ne copie pas : <code>[...a]</code> si.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi sort trie-t-il comme du texte ?</summary>
<p>Parce qu'un tableau JavaScript peut contenir n'importe quoi — des nombres, des textes, des objets mélangés. Au moment où <code>sort</code> a été normalisé, le seul ordre qui marchait sur tout était l'ordre alphabétique des représentations textuelles. Le comportement est resté, parce que des millions de pages en dépendent. C'est l'une des rares décisions du langage que personne ne défend, et que personne ne peut plus changer.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Voici des temps de course en secondes. 1) Trie-les en ordre CROISSANT (attention au piège des nombres !) et affiche le tableau trié. 2) Affiche le meilleur temps avec <code>Math.min(...)</code> et le spread.',
      codeDepart: 'let temps = [95, 102, 87, 110, 91];\n',
      indices: [
        "<code>sort()</code> sans rien trie comme du <strong>texte</strong> : 102 passerait avant 87. Pour des nombres, il faut lui dire comment comparer.",
        "La fonction de comparaison reçoit deux valeurs et rend leur différence : négatif si la première passe devant. Et le spread étale un tableau en arguments séparés.",
        "<code>temps.sort((a, b) =&gt; a - b);</code> puis <code>Math.min(...temps)</code>"
      ],
      solution: 'let temps = [95, 102, 87, 110, 91];\n\ntemps.sort((a, b) => a - b);\nconsole.log(temps);\n\nconsole.log(Math.min(...temps));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/\.sort\s*\(/.test(ctx.code)) return { ok: false, message: 'Le tri passe par <code>sort</code>.' };
        if (!/sort\s*\(\s*\(/.test(ctx.code)) return { ok: false, message: 'Piège de la leçon : <code>sort()</code> sans fonction trie les nombres comme du texte ! Il faut <code>sort((a, b) => a - b)</code>.' };
        if (!ctx.logs.some(l => l.replace(/\s/g, '').includes('[87,91,95,102,110]'))) return { ok: false, message: 'Le tableau trié attendu : [87, 91, 95, 102, 110]. Vérifie le comparateur <code>a - b</code> (croissant).' };
        if (!/\.\.\./.test(ctx.code)) return { ok: false, message: 'Le meilleur temps doit passer par le spread : <code>Math.min(...temps)</code>.' };
        if (!ctx.logs.includes('87')) return { ok: false, message: 'Le meilleur temps (87) doit s\'afficher via <code>Math.min(...temps)</code>.' };
        return { ok: true, message: 'sort avec comparateur + spread : deux outils de pro, et le piège du tri alphabétique désamorcé à vie.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : reduce.</strong> Le panier contient des prix. 1) Avec <code>reduce</code> (pas de boucle !), calcule le <code>total</code> (54). 2) Toujours avec reduce, calcule <code>totalRemise</code> : chaque prix compté à 90% (<code>somme + p * 0.9</code>) → 48.6. Affiche les deux.',
      codeDepart: 'let panier = [12, 30, 4, 8];\n',
      indices: [
        "<code>reduce</code>, c’est l’accumulateur en une seule expression : il parcourt le tableau en gardant un total d’un tour à l’autre.",
        "Il reçoit deux choses : une fonction (le total jusqu’ici, l’élément courant) et la valeur de <strong>départ</strong> — le <code>0</code> tout à la fin, qu’on oublie souvent.",
        "<code>panier.reduce((somme, p) =&gt; somme + p, 0)</code> — pour la remise, remplace <code>p</code> par <code>p * 0.9</code>."
      ],
      solution: 'let panier = [12, 30, 4, 8];\n\nlet total = panier.reduce((somme, p) => somme + p, 0);\nconsole.log(total);\n\nlet totalRemise = panier.reduce((somme, p) => somme + p * 0.9, 0);\nconsole.log(totalRemise);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/\.reduce\s*\(/.test(ctx.code)) return { ok: false, message: 'L\'exercice impose <code>reduce</code> — l\'accumulateur en une ligne.' };
        if (/for\s*\(|while\s*\(/.test(ctx.code)) return { ok: false, message: 'Pas de boucle ici : reduce FAIT la boucle pour toi.' };
        if (!ctx.logs.includes('54')) return { ok: false, message: 'Le total attendu est 54. Modèle : <code>panier.reduce((somme, p) => somme + p, 0)</code> — n\'oublie pas le 0 de départ.' };
        if (!ctx.logs.some(l => l === '48.6' || l === '48.60000000000001')) return { ok: false, message: 'Le total est bon ! La remise : même reduce avec <code>somme + p * 0.9</code> (≈ 48.6).' };
        return { ok: true, message: 'reduce est LA méthode des rapports et statistiques : totaux, moyennes, compteurs... une ligne à chaque fois.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : le podium.</strong> Écris une fonction <code>podium(scores)</code> qui retourne les 3 MEILLEURS scores, triés du plus grand au plus petit — SANS modifier le tableau d\'origine ! La combinaison : copier avec <code>[...scores]</code>, trier décroissant, garder les 3 premiers avec <code>slice(0, 3)</code>. Les tests vérifient aussi que l\'original est intact !',
      codeDepart: 'let scores = [820, 1450, 990, 1200, 760];\n\nfunction podium(scores) {\n\n}\n\nconsole.log(podium(scores));\nconsole.log(scores);   // doit rester dans l\'ordre d\'origine !',
      indices: [
        "Attention : <code>sort()</code> modifie le tableau sur lequel il travaille. Trier directement <code>scores</code> le changerait pour de bon.",
        "Il faut donc trier une <strong>copie</strong>. Le spread <code>[...scores]</code> en fabrique une. Ensuite : trier décroissant, puis garder les trois premiers.",
        "<code>return [...scores].sort((a, b) =&gt; b - a).slice(0, 3);</code>"
      ],
      solution: 'let scores = [820, 1450, 990, 1200, 760];\n\nfunction podium(scores) {\n  return [...scores].sort((a, b) => b - a).slice(0, 3);\n}\n\nconsole.log(podium(scores));\nconsole.log(scores);   // doit rester dans l\'ordre d\'origine !',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const sortie = ctx.logs.map(l => l.replace(/\s/g, ''));
        if (!sortie.includes('[1450,1200,990]')) return { ok: false, message: 'Le podium attendu : [1450, 1200, 990] — tri décroissant (<code>b - a</code>) puis <code>slice(0, 3)</code>.' };
        if (!sortie.includes('[820,1450,990,1200,760]')) return { ok: false, message: 'Le podium est bon... mais le tableau d\'origine a été modifié ! <code>sort</code> travaille SUR le tableau : copie-le d\'abord avec <code>[...scores]</code>.' };
        return { ok: true, message: 'Ne jamais modifier les données qu\'on t\'a confiées : ce principe (l\'immutabilité) est au cœur des frameworks modernes. Tu viens de l\'appliquer.' };
      }
    }
  ]
},

{
  id: 'js2-4',
  titre: 'Boucles imbriquées et grilles',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une boucle parcourt une liste. Mais beaucoup de choses ne sont pas des listes : un plateau de morpion, un calendrier, un damier, une image. Ce sont des <strong>grilles</strong> — des lignes et des colonnes.</p>
<p>Pour parcourir une grille, une boucle ne suffit pas : il en faut une pour les lignes, et une autre, à l'intérieur, pour les colonnes de chaque ligne.</p>

<h2>Le principe</h2>
<pre class="bloc-code">for (let ligne = 1; ligne &lt;= 2; ligne++) {
  for (let colonne = 1; colonne &lt;= 3; colonne++) {
    console.log(ligne + "-" + colonne);
  }
}</pre>
<p>La boucle <strong>interne fait tous ses tours à chaque tour</strong> de la boucle externe. Deux lignes fois trois colonnes font donc six passages, dans cet ordre : 1-1, 1-2, 1-3, puis 2-1, 2-2, 2-3.</p>
<p>C'est exactement la façon dont on lit une page : on balaie la première ligne en entier, puis on revient au début de la suivante.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Tour externe</th><th>Tours internes</th><th>Affiché</th></tr>
<tr><td>ligne = 1</td><td>colonne 1, 2, 3</td><td>1-1, 1-2, 1-3</td></tr>
<tr><td>ligne = 2</td><td>colonne 1, 2, 3 — elle repart de 1</td><td>2-1, 2-2, 2-3</td></tr>
</table>
<p>Le point à retenir est celui de la seconde ligne : la variable de la boucle interne est <strong>recréée à chaque tour</strong> de l'externe. Elle repart toujours de son point de départ.</p>

<h2>Construire du texte ligne par ligne</h2>
<p>Pour dessiner, on n'affiche pas chaque case : on assemble une ligne dans une variable, puis on l'affiche d'un coup à la fin du tour externe.</p>
<pre class="bloc-code">for (let i = 1; i &lt;= 4; i++) {
  let ligne = "";
  for (let j = 1; j &lt;= 6; j++) {
    ligne = ligne + "*";
  }
  console.log(ligne);
}</pre>
<p>Remarque où est déclarée la variable <code>ligne</code> : <em>dans</em> la boucle externe, pour repartir vide à chaque fois, et <em>avant</em> la boucle interne, pour survivre à ses tours.</p>

<h2>Les pièges</h2>
<p><strong>Réutiliser le même nom pour les deux compteurs.</strong> Deux <code>i</code> imbriqués, et la boucle interne écrase le compteur de l'externe : on obtient une boucle infinie, ou un nombre de tours absurde. Donne des noms parlants — <code>ligne</code> et <code>colonne</code> valent mieux que <code>i</code> et <code>j</code>.</p>
<p><strong>Déclarer l'accumulateur au mauvais endroit.</strong> Avant la boucle externe, le texte s'accumule sans jamais se vider : on obtient une seule ligne de 24 étoiles. À l'intérieur de la boucle interne, il se vide à chaque case et il ne reste qu'une étoile. Sa place est entre les deux.</p>
<p><strong>Oublier de faire avancer un compteur.</strong> Le risque est double ici, puisqu'il y en a deux. Le moteur du cours rattrape le coup et affiche : <em>« ton code tourne sans s'arrêter (boucle infinie ?). Vérifie la condition de ta boucle. »</em></p>
<p><strong>Imbriquer trois boucles ou plus.</strong> Techniquement possible, pratiquement illisible. Au-delà de deux niveaux, il vaut mieux sortir la boucle interne dans une fonction.</p>

<h2>Dans la vraie vie</h2>
<p>Tout ce qui est grille : un plateau de jeu, un tableau de données affiché en HTML, un calendrier mensuel, le traitement d'une image pixel par pixel. Les boucles imbriquées sont aussi la première occasion de rencontrer la notion de coût : deux boucles de mille tours font un million de passages.</p>

<div class="a-retenir">
<ul>
<li>La boucle interne fait tous ses tours à chaque tour de l'externe.</li>
<li>Son compteur repart de son point de départ à chaque fois.</li>
<li>Un accumulateur de ligne se déclare entre les deux boucles.</li>
<li>Des noms parlants (<code>ligne</code>, <code>colonne</code>) évitent l'écrasement de compteurs.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le coût d'une boucle dans une boucle</summary>
<p>Une boucle sur mille éléments fait mille tours. Deux boucles imbriquées sur les mêmes mille éléments en font un million — mille fois plus, pour une seule ligne de code en plus. C'est la première fois que tu rencontres cette idée, et elle reviendra : en informatique, on classe les algorithmes par la façon dont leur coût grandit avec la taille des données. Une boucle imbriquée est le cas d'école du coût qui explose.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'Dessine un rectangle d\'étoiles de 4 lignes sur 6 colonnes avec deux boucles imbriquées : chaque ligne est construite caractère par caractère (le motif de la leçon), puis affichée. Résultat : 4 lignes de <code>******</code>.',
      codeDepart: '// Le rectangle 4 × 6\n',
      indices: [
        "Deux boucles emboîtées : celle du dehors compte les lignes, celle du dedans construit une ligne caractère par caractère.",
        "La ligne se remet à vide au début de chaque tour extérieur, et ne s’affiche qu’<strong>après</strong> que la boucle intérieure a fini de la remplir.",
        "Externe : <code>let ligne = \"\";</code> · interne : <code>ligne += \"*\";</code> · puis <code>console.log(ligne);</code> après l’interne."
      ],
      solution: 'for (let i = 1; i <= 4; i++) {\n  let ligne = "";\n  for (let j = 1; j <= 6; j++) {\n    ligne += "*";\n  }\n  console.log(ligne);\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const boucles = (ctx.code.match(/for\s*\(/g) || []).length;
        if (boucles < 2) return { ok: false, message: 'Il faut DEUX boucles for, l\'une dans l\'autre — pas d\'étoiles écrites à la main !' };
        if (ctx.logs.length !== 4) return { ok: false, message: 'Il faut exactement 4 lignes affichées (tu en as ' + ctx.logs.length + '). Le console.log va dans la boucle EXTERNE, après la boucle interne.' };
        if (!ctx.logs.every(l => l === '******')) return { ok: false, message: 'Chaque ligne doit contenir exactement 6 étoiles (obtenu : « ' + ctx.logs[0] + ' »). Vérifie la boucle interne (6 tours) et la remise à zéro de la ligne.' };
        return { ok: true, message: 'Ligne par ligne, case par case : tu viens de balayer ta première grille. Écrans, images, plateaux de jeu — tout se parcourt comme ça.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : la pyramide.</strong> Même motif, mais la ligne i contient i étoiles : 1 étoile, puis 2, puis 3, puis 4, puis 5. L\'astuce : la boucle interne va de 1 jusqu\'à... <code>i</code> — la variable de la boucle externe !',
      codeDepart: '// La pyramide de 5 étages\n',
      indices: [
        "Même structure qu’au précédent. Une seule chose change, et elle se trouve dans la condition de la boucle intérieure.",
        "La boucle intérieure ne va plus jusqu’à un nombre fixe, mais jusqu’à <code>i</code> — la variable de la boucle extérieure. La ligne 3 aura donc 3 étoiles.",
        "<code>for (let j = 1; j &lt;= i; j++)</code> — c’est tout ce qui diffère."
      ],
      solution: 'for (let i = 1; i <= 5; i++) {\n  let ligne = "";\n  for (let j = 1; j <= i; j++) {\n    ligne += "*";\n  }\n  console.log(ligne);\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if ((ctx.code.match(/for\s*\(/g) || []).length < 2) return { ok: false, message: 'Deux boucles imbriquées, comme l\'exercice 1 — mais la limite interne change...' };
        if (ctx.logs.length !== 5) return { ok: false, message: 'La pyramide fait 5 étages (tu en affiches ' + ctx.logs.length + ').' };
        for (let i = 1; i <= 5; i++) {
          if (ctx.logs[i - 1] !== '*'.repeat(i)) return { ok: false, message: 'L\'étage ' + i + ' devrait avoir ' + i + ' étoile(s) (obtenu : « ' + ctx.logs[i - 1] + ' »). Le secret : la boucle interne s\'arrête à <code>j <= i</code>.' };
        }
        return { ok: true, message: 'La boucle interne qui dépend de l\'externe : le déclic des boucles imbriquées. La pyramide est un exercice d\'entretien d\'embauche récurrent — coché !' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Défi : le morpion.</strong> Voici une grille 2D. 1) Affiche-la ligne par ligne : chaque ligne du tableau devient un texte via <code>join(" | ")</code>. 2) Puis vérifie la DIAGONALE (cases [0][0], [1][1], [2][2]) : si les trois sont identiques, affiche <code>[symbole] gagne !</code>.',
      codeDepart: 'let grille = [\n  ["X", "O", "O"],\n  ["O", "X", "O"],\n  ["O", "O", "X"]\n];\n',
      indices: [
        "Deux parties indépendantes : afficher la grille, puis tester trois cases précises. Dans un tableau 2D, une case se désigne par <strong>deux</strong> crochets.",
        "<code>join(\" | \")</code> transforme une ligne en texte. Pour la diagonale, il faut comparer les trois cases entre elles — donc deux comparaisons reliées par un « et ».",
        "<code>console.log(ligne.join(\" | \"));</code> puis <code>if (grille[0][0] === grille[1][1] &amp;&amp; grille[1][1] === grille[2][2])</code>"
      ],
      solution: 'let grille = [\n  ["X", "O", "O"],\n  ["O", "X", "O"],\n  ["O", "O", "X"]\n];\n\nfor (const ligne of grille) {\n  console.log(ligne.join(" | "));\n}\n\nif (grille[0][0] === grille[1][1] && grille[1][1] === grille[2][2]) {\n  console.log(grille[0][0] + " gagne !");\n}',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const lignesAffichees = ctx.logs.filter(l => /\|/.test(l));
        if (lignesAffichees.length !== 3) return { ok: false, message: 'La grille doit s\'afficher en 3 lignes de la forme <code>X | O | O</code> (via join sur chaque ligne).' };
        if (lignesAffichees[0].replace(/\s/g, '') !== 'X|O|O') return { ok: false, message: 'La première ligne devrait être <code>X | O | O</code> (obtenu : « ' + lignesAffichees[0] + ' »).' };
        if (!ctx.logs.some(l => /X\s*gagne/.test(l))) return { ok: false, message: 'La diagonale [0][0], [1][1], [2][2] contient trois X : « X gagne ! » doit s\'afficher. Double crochets : <code>grille[ligne][colonne]</code>.' };
        return { ok: true, message: 'Grille 2D affichée ET analysée : tu as les fondations d\'un vrai jeu de morpion. (Défi personnel : vérifier aussi les lignes et colonnes ?)' };
      }
    }
  ]
},

{
  id: 'js2-5',
  titre: 'Fonctions avancées : portée, défauts, callbacks',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un programme de deux cents fonctions ne peut pas fonctionner si chacune peut lire et modifier les variables des autres. Il faut une règle qui dise où vit une variable, et jusqu'où elle est visible.</p>
<p>Cette règle s'appelle la <strong>portée</strong>, et c'est l'une des idées les plus importantes de la programmation. Deux autres notions l'accompagnent ici : donner une valeur par défaut à un paramètre, et passer une fonction en argument.</p>

<h2>La portée : chaque fonction a sa bulle</h2>
<pre class="bloc-code">function calculer() {
  let secret = 42;
  console.log(secret);   // 42
}

calculer();
console.log(secret);     // erreur</pre>
<p>Mesuré dans le moteur du cours, la dernière ligne s'arrête net : <em>« secret is not defined »</em> — « secret n'existe pas ». La variable est née dans la fonction, elle meurt avec elle.</p>
<p>Ce n'est pas une contrainte mais une <strong>protection</strong> : deux cents fonctions peuvent chacune avoir leur variable <code>total</code> sans jamais se marcher dessus. La règle vaut aussi pour les blocs : un <code>let</code> déclaré dans un <code>if</code> ou dans une boucle n'existe pas en dehors.</p>
<p>L'inverse est vrai : une fonction <em>peut</em> lire les variables déclarées au-dessus d'elle. La visibilité va de l'extérieur vers l'intérieur, jamais le contraire.</p>

<h2>Les paramètres par défaut</h2>
<pre class="bloc-code">function commander(boisson = "café", taille = "moyen") {
  return taille + " " + boisson;
}

commander();              // "moyen café"
commander("thé");         // "moyen thé"</pre>
<p>Un paramètre non fourni prend sa valeur par défaut. Mesuré : <code>salut()</code> rend bien « bonjour inconnu ». Cela évite une série de tests au début de chaque fonction.</p>

<h2>Les callbacks : une fonction en argument</h2>
<p>Une fonction peut être rangée dans une variable, et donc passée à une autre fonction. Celle qu'on passe s'appelle un <strong>callback</strong> — « fonction de rappel ».</p>
<pre class="bloc-code">function repeter(n, action) {
  for (let i = 1; i &lt;= n; i++) {
    action(i);
  }
}

repeter(3, function (numero) {
  console.log("tour " + numero);
});</pre>
<p>Tu en as déjà utilisé sans le savoir : le comparateur de <code>sort</code>, la fonction d'un <code>addEventListener</code>. C'est le mécanisme qui permet de dire « voici <em>quoi</em> faire, décide toi-même <em>quand</em> ».</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ligne</th><th>Ce qui se passe</th></tr>
<tr><td><code>function calculer() {...}</code></td><td>La fonction est rangée. Rien ne s'exécute.</td></tr>
<tr><td><code>calculer();</code></td><td>La bulle s'ouvre, <code>secret</code> naît, s'affiche, puis la bulle se referme.</td></tr>
<tr><td><code>console.log(secret)</code></td><td>Plus rien ne porte ce nom : <code>secret is not defined</code>.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Croire qu'une variable de fonction survit à l'appel.</strong> C'est l'erreur de départ. Pour récupérer un résultat, il n'y a qu'un moyen : <code>return</code>.</p>
<p><strong>Appeler le callback au lieu de le passer.</strong> <code>repeter(3, action())</code> avec les parenthèses <em>exécute</em> la fonction tout de suite et passe son résultat. Sans parenthèses, <code>repeter(3, action)</code> passe la fonction elle-même. Une paire de parenthèses sépare les deux sens.</p>
<p><strong>Mettre un paramètre par défaut avant un paramètre obligatoire.</strong> <code>function f(a = 1, b)</code> est valide mais inutilisable : on ne peut pas fournir <code>b</code> sans fournir <code>a</code>. Les paramètres à défaut vont à la fin.</p>

<h2>Dans la vraie vie</h2>
<p>La portée est ce qui rend possible le travail à plusieurs sur un même programme : chacun écrit ses fonctions sans craindre d'écraser les variables d'un autre. Les callbacks, eux, sont partout dès qu'il s'agit de réagir — un clic, une réponse de serveur, un minuteur.</p>

<div class="a-retenir">
<ul>
<li>Une variable déclarée dans une fonction ou un bloc n'existe que là : <code>secret is not defined</code> en dehors.</li>
<li>La visibilité va de l'extérieur vers l'intérieur, jamais l'inverse.</li>
<li>Un paramètre par défaut se place en fin de liste.</li>
<li>Passer une fonction, c'est l'écrire <strong>sans parenthèses</strong>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : une fonction qui se souvient</summary>
<p>Une fonction définie à l'intérieur d'une autre garde accès aux variables de celle-ci — même après que la fonction extérieure a fini. Cette mémoire s'appelle une <em>fermeture</em>, et c'est ce qui permet de fabriquer un compteur dont la valeur est inaccessible de l'extérieur. C'est l'une des idées les plus puissantes du langage, et tu la retrouveras au module JavaScript avancé.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'La machine à café configurable : écris <code>commander(boisson = "café", taille = "moyen")</code> qui RETOURNE <code>Un [boisson] [taille], tout de suite !</code>. Teste les trois appels fournis — le troisième sans aucun argument doit utiliser les deux défauts.',
      codeDepart: 'function commander(boisson, taille) {\n\n}\n\nconsole.log(commander("thé", "grand"));\nconsole.log(commander("chocolat"));\nconsole.log(commander());',
      indices: [
        "Une valeur par défaut sert quand l’appelant ne donne rien. Le troisième appel, sans aucun argument, doit donc utiliser les deux.",
        "Les défauts s’écrivent dans la parenthèse du <code>function</code>, avec un <code>=</code>. Et la fonction <strong>retourne</strong> la phrase, elle ne l’affiche pas.",
        "<code>function commander(boisson = \"café\", taille = \"moyen\") { return `Un ${boisson} ${taille}, tout de suite !`; }</code>"
      ],
      solution: 'function commander(boisson = "café", taille = "moyen") {\n  return `Un ${boisson} ${taille}, tout de suite !`;\n}\n\nconsole.log(commander("thé", "grand"));\nconsole.log(commander("chocolat"));\nconsole.log(commander());',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/boisson\s*=\s*["']café["']/.test(ctx.code) || !/taille\s*=\s*["']moyen["']/.test(ctx.code)) return { ok: false, message: 'Les valeurs par défaut se déclarent DANS la parenthèse : <code>(boisson = "café", taille = "moyen")</code>.' };
        if (!/Un thé grand/.test(ctx.logs[0] || '')) return { ok: false, message: 'Premier appel : « Un thé grand, tout de suite ! » attendu.' };
        if (!/Un chocolat moyen/.test(ctx.logs[1] || '')) return { ok: false, message: 'Deuxième appel : la taille manquante doit prendre son défaut → « Un chocolat moyen, tout de suite ! ».' };
        if (!/Un café moyen/.test(ctx.logs[2] || '')) return { ok: false, message: 'Troisième appel sans argument : les DEUX défauts jouent → « Un café moyen, tout de suite ! ».' };
        return { ok: true, message: 'Des fonctions qui marchent avec ou sans arguments : plus souples, plus solides. Les bibliothèques professionnelles en sont remplies.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : ton premier callback.</strong> Écris <code>repeter(n, action)</code> qui exécute la fonction <code>action</code> n fois, en lui passant le numéro du tour (de 1 à n). Puis appelle <code>repeter(3, (i) => console.log("Tour " + i));</code> — résultat : Tour 1, Tour 2, Tour 3.',
      codeDepart: 'function repeter(n, action) {\n\n}\n\nrepeter(3, (i) => console.log("Tour " + i));',
      indices: [
        "Le second paramètre n’est pas une valeur : c’est une <strong>fonction</strong>. On la reçoit, et on s’en sert.",
        "Une fonction reçue en paramètre s’appelle comme n’importe quelle autre : avec des parenthèses, en lui passant ce qu’elle attend — ici, le numéro du tour.",
        "<code>for (let i = 1; i &lt;= n; i++) { action(i); }</code>"
      ],
      solution: 'function repeter(n, action) {\n  for (let i = 1; i <= n; i++) {\n    action(i);\n  }\n}\n\nrepeter(3, (i) => console.log("Tour " + i));',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        if (!/action\s*\(/.test(ctx.code)) return { ok: false, message: 'Dans ta boucle, il faut APPELER le callback : <code>action(i);</code> — une fonction reçue en paramètre s\'exécute comme n\'importe quelle fonction.' };
        if (ctx.logs.join(',') !== 'Tour 1,Tour 2,Tour 3') return { ok: false, message: 'Attendu : Tour 1, Tour 2, Tour 3 (obtenu : ' + (ctx.logs.join(', ') || 'rien') + '). La boucle va de 1 à n, et passe i au callback.' };
        return { ok: true, message: 'Tu viens d\'écrire ta version de forEach ! Les callbacks n\'ont plus de mystère : ce sont des fonctions-valises, transportées puis ouvertes.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Ce code affiche quoi ?<br><code>function test() { let x = 5; }<br>test();<br>console.log(x);</code>',
      choix: [
        '5 — la fonction a bien créé x',
        'undefined — x existe mais est vide',
        'Une erreur : x n\'existe pas en dehors de la fonction',
        '0 — la valeur par défaut des variables'
      ],
      bonne: 2,
      explication: '<code>x</code> est né dans la bulle de la fonction et meurt avec elle : dehors, « x is not defined ». C\'est la PORTÉE — une protection, pas une punition : elle évite que 200 fonctions se marchent dessus.',
      aides: [
        'La fonction a créé x... dans SA bulle. La bulle éclate à la fin de la fonction.',
        'undefined serait une variable déclarée sans valeur — ici elle n\'est pas déclarée DU TOUT dans ce contexte.',
        '',
        'Aucune valeur par défaut n\'existe en JavaScript — une variable inconnue lève une erreur.'
      ]
    }
  ]
},

{
  id: 'js2-6',
  titre: 'Les dates et le temps',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une date paraît simple, et ne l'est jamais. Combien de jours en février ? Quel jour de la semaine tombe le 3 mars 2027 ? Que se passe-t-il à minuit, au changement d'heure, au 31 décembre ?</p>
<p>Personne ne veut recalculer cela à la main. L'objet <code>Date</code> s'en charge — au prix de deux bizarreries historiques qu'il faut connaître avant d'écrire la moindre ligne.</p>

<h2>Lire la date</h2>
<pre class="bloc-code">let maintenant = new Date();

maintenant.getFullYear()   // 2026
maintenant.getMonth()      // 0 pour janvier !
maintenant.getDate()       // le jour du mois, 1 a 31
maintenant.getDay()        // le jour de la SEMAINE, 0 = dimanche
maintenant.getHours()      // l'heure, 0 a 23</pre>
<p>Le mot-clé <code>new</code> est nouveau : il fabrique un objet à partir d'un modèle. Tu le reverras avec les classes.</p>

<h2>Pas à pas : les deux chausse-trappes</h2>
<p>Mesuré sur le 15 janvier 2026, créé par <code>new Date(2026, 0, 15)</code> :</p>
<table class="memo-table trace">
<tr><th>Appel</th><th>Résultat</th><th>Ce qu'il faut comprendre</th></tr>
<tr><td><code>getMonth()</code></td><td><strong>0</strong></td><td>janvier est le mois zéro — décembre vaut 11</td></tr>
<tr><td><code>getDate()</code></td><td>15</td><td>le jour du mois, lui, compte normalement</td></tr>
<tr><td><code>getDay()</code></td><td>4</td><td>le jour de la <em>semaine</em> : jeudi, dimanche valant 0</td></tr>
</table>
<p>Deux pièges dans trois méthodes, dont deux noms qui se ressemblent et ne disent pas la même chose. C'est la leçon où l'on relit deux fois.</p>
<p>Le remède habituel pour le mois : un tableau de noms, et <code>mois[d.getMonth()]</code>. Comme les tableaux comptent aussi à partir de zéro, les deux décalages s'annulent exactement.</p>

<h2>Le temps qui passe</h2>
<ul>
<li><code>setTimeout(fonction, 1000)</code> — exécute <strong>une fois</strong>, dans une seconde ;</li>
<li><code>setInterval(fonction, 1000)</code> — exécute <strong>toutes</strong> les secondes, sans fin ;</li>
<li><code>clearInterval(id)</code> — arrête un intervalle, grâce à l'identifiant rendu au départ.</li>
</ul>
<p>Pour une horloge, c'est <code>setInterval</code>. Pour un message qui disparaît, <code>setTimeout</code>.</p>

<h2>Les pièges</h2>
<p><strong>Afficher <code>getMonth()</code> tel quel.</strong> En janvier, l'utilisateur lit « mois 0 ». Si un mois est décalé d'une unité dans ton affichage, c'est toujours ça — et il faut ajouter 1, ou passer par un tableau de noms.</p>
<p><strong>Confondre <code>getDate</code> et <code>getDay</code>.</strong> Les deux noms se ressemblent, et les deux rendent un petit nombre : l'erreur passe inaperçue tant qu'on est entre le 1er et le 7 du mois.</p>
<p><strong>Lancer un <code>setInterval</code> sans jamais l'arrêter.</strong> Il tourne tant que la page est ouverte. Si l'utilisateur relance l'horloge trois fois, trois intervalles tournent en parallèle et l'affichage saute. Garde l'identifiant et arrête l'ancien.</p>
<p><strong>Croire que <code>setTimeout(f, 1000)</code> attend exactement une seconde.</strong> C'est un minimum, pas une promesse : si le navigateur est occupé, l'appel attend son tour. Pour mesurer une durée réelle, on compare deux dates.</p>

<h2>Dans la vraie vie</h2>
<p>Un « publié il y a 3 jours », une date d'expiration, un compte à rebours, une horloge. Dès que les fuseaux horaires et les formats régionaux entrent en jeu, les équipes passent à une bibliothèque spécialisée — l'objet <code>Date</code> montre alors ses limites, qui sont connues et anciennes.</p>

<div class="a-retenir">
<ul>
<li><code>getMonth()</code> compte à partir de 0 : janvier vaut 0, décembre 11.</li>
<li><code>getDate()</code> donne le jour du mois ; <code>getDay()</code> le jour de la semaine, dimanche valant 0.</li>
<li><code>setTimeout</code> agit une fois, <code>setInterval</code> en boucle — et un intervalle doit pouvoir être arrêté.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : d'où vient le mois zéro ?</summary>
<p>De 1995, quand JavaScript a été écrit en dix jours en copiant l'objet Date du langage Java, lui-même inspiré d'une convention du langage C où les mois étaient indexés à partir de zéro pour servir d'indice dans un tableau de noms. Trois décennies plus tard, la bizarrerie est toujours là, parce que la corriger casserait d'innombrables pages. Un remplaçant moderne, <code>Temporal</code>, arrive progressivement dans les navigateurs — et compte les mois à partir de 1.</p>
</details>
`,
  exercices: [
    {
      type: 'js',
      consigne: 'La carte du jour : avec <code>new Date()</code>, affiche 1) l\'année actuelle, 2) le jour du mois, 3) la phrase <code>Nous sommes en [année]</code>. Ton code doit marcher n\'importe quel jour — aucune valeur écrite à la main !',
      codeDepart: 'let maintenant = new Date();\n',
      indices: [
        "<code>new Date()</code> capture l’instant présent. Tout ce qu’on veut en tirer passe par des méthodes, jamais par une valeur écrite à la main.",
        "L’année s’obtient avec <code>getFullYear()</code>, le jour du mois avec <code>getDate()</code>. Les deux s’appellent avec des parenthèses.",
        "<code>maintenant.getFullYear()</code>, <code>maintenant.getDate()</code>, puis une phrase en accents graves."
      ],
      solution: 'let maintenant = new Date();\n\nconsole.log(maintenant.getFullYear());\nconsole.log(maintenant.getDate());\nconsole.log(`Nous sommes en ${maintenant.getFullYear()}`);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const annee = String(new Date().getFullYear());
        const jour = String(new Date().getDate());
        if (!ctx.logs.includes(annee)) return { ok: false, message: 'L\'année actuelle (' + annee + ') doit s\'afficher via <code>getFullYear()</code> — pas écrite à la main !' };
        if (!ctx.logs.includes(jour)) return { ok: false, message: 'Le jour du mois (' + jour + ') vient de <code>getDate()</code> — attention, pas getDay() qui donne le jour de semaine !' };
        if (!ctx.logs.some(l => l.includes('Nous sommes en ' + annee))) return { ok: false, message: 'Il manque la phrase « Nous sommes en ' + annee + ' » construite avec la méthode dans les backticks.' };
        if (new RegExp(annee).test(ctx.code)) return { ok: false, message: 'L\'année est écrite en dur dans ton code ! Elle doit venir de <code>getFullYear()</code> pour que le programme reste juste l\'an prochain.' };
        return { ok: true, message: 'Un programme qui connaît la date : ce code affichera la bonne année dans dix ans sans qu\'on y retouche.' };
      }
    },
    {
      type: 'js',
      consigne: '<strong>Entraînement : le calculateur d\'âge.</strong> Écris <code>calculerAge(anneeNaissance)</code> qui utilise l\'année ACTUELLE (via Date, pas en dur !) pour retourner l\'âge. Puis affiche <code>calculerAge(2000)</code> et la phrase <code>Le web a [âge] ans</code> avec <code>calculerAge(1991)</code> (année de naissance du web !).',
      codeDepart: 'function calculerAge(anneeNaissance) {\n\n}\n\nconsole.log(calculerAge(2000));\nconsole.log(`Le web a ${calculerAge(1991)} ans`);',
      indices: [
        "L’âge, c’est une soustraction. La seule difficulté : l’année actuelle ne doit pas être écrite en dur, sinon le code sera faux l’an prochain.",
        "On peut créer la date et lire son année dans la même expression, sans passer par une variable intermédiaire.",
        "<code>return new Date().getFullYear() - anneeNaissance;</code>"
      ],
      solution: 'function calculerAge(anneeNaissance) {\n  return new Date().getFullYear() - anneeNaissance;\n}\n\nconsole.log(calculerAge(2000));\nconsole.log(`Le web a ${calculerAge(1991)} ans`);',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code a une erreur : <code>' + ctx.erreur.replace(/</g, '&lt;') + '</code>' };
        const annee = new Date().getFullYear();
        if (!/getFullYear/.test(ctx.code)) return { ok: false, message: 'L\'année actuelle doit venir de <code>new Date().getFullYear()</code> — jamais écrite en dur.' };
        if (!ctx.logs.includes(String(annee - 2000))) return { ok: false, message: '<code>calculerAge(2000)</code> devrait donner ' + (annee - 2000) + ' cette année.' };
        if (!ctx.logs.some(l => l.includes('Le web a ' + (annee - 1991) + ' ans'))) return { ok: false, message: 'La phrase attendue : « Le web a ' + (annee - 1991) + ' ans » (avec l\'appel dans les backticks).' };
        return { ok: true, message: 'Oui, le web n\'a que ' + (annee - 1991) + ' ans — et te voilà en train d\'apprendre son langage. Vertigineux, non ?' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Tu veux une horloge qui se met à jour chaque seconde. Quel outil ?',
      choix: [
        '<code>setTimeout(maj, 1000)</code> — exécute dans une seconde',
        '<code>setInterval(maj, 1000)</code> — exécute TOUTES les secondes',
        '<code>setInterval(maj, 1)</code> — toutes les secondes',
        'Une boucle while infinie qui vérifie l\'heure'
      ],
      bonne: 1,
      explication: 'setTimeout = une fois, setInterval = en boucle. Et le temps est en MILLISECONDES : 1000 = 1 seconde (le choix 3 ferait 1000 mises à jour par seconde !). Quant au while infini... tu connais la sanction. 😉',
      aides: [
        'setTimeout ne tire qu\'UNE fois — ton horloge afficherait la bonne heure... une seule seconde.',
        '',
        'Le temps s\'exprime en millisecondes : 1 = un millième de seconde. Ton horloge serait mise à jour 1000 fois par seconde !',
        'Une boucle infinie fige la page (et déclenche notre garde-fou des 3 secondes !). setInterval attend sans bloquer.'
      ]
    }
  ]
},

{
  id: 'js2-7',
  titre: 'Le clavier et les autres événements',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Le clic est l'événement qu'on apprend en premier, et c'est loin d'être le seul. Une page vivante réagit à la frappe au clavier, au survol, à l'envoi d'un formulaire, au défilement, au redimensionnement de la fenêtre.</p>
<p>Et surtout : jusqu'ici, tes fonctions d'écoute ne recevaient rien. Elles peuvent recevoir une <strong>description de ce qui vient de se passer</strong> — quelle touche, quel élément, où exactement.</p>

<h2>L'objet événement</h2>
<pre class="bloc-code">document.addEventListener("keydown", function (evenement) {
  console.log(evenement.key);
});</pre>
<p>La fonction reçoit un argument : l'objet événement. Sa propriété <code>.key</code> donne la touche sous forme de texte — <code>"a"</code>, <code>"Enter"</code>, <code>"ArrowRight"</code>, <code>"Escape"</code>. Les lettres arrivent telles quelles, les touches spéciales portent un nom anglais.</p>
<p>Le nom <code>evenement</code> n'a rien d'obligatoire : c'est un paramètre comme un autre. Beaucoup de code l'appelle simplement <code>e</code>.</p>

<h2>Les événements utiles</h2>
<ul>
<li><code>keydown</code> — une touche est enfoncée ;</li>
<li><code>input</code> — le contenu d'un champ a changé, à chaque caractère ;</li>
<li><code>change</code> — le champ a changé <em>et</em> on l'a quitté ;</li>
<li><code>submit</code> — un formulaire est envoyé ;</li>
<li><code>mouseover</code> et <code>mouseout</code> — la souris entre, la souris sort.</li>
</ul>
<p>Sur quoi écouter ? Un clic s'écoute sur le bouton concerné ; le clavier, en général sur <code>document</code>, puisque la frappe n'appartient à aucun élément en particulier.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Moment</th><th>Ce qui se passe</th></tr>
<tr><td>La page charge</td><td><code>addEventListener</code> s'exécute : il <em>enregistre</em> la fonction. Rien d'autre.</td></tr>
<tr><td>Le visiteur appuie sur une touche</td><td>Le navigateur fabrique un objet décrivant l'événement.</td></tr>
<tr><td>Il appelle ta fonction</td><td>En lui passant cet objet en argument.</td></tr>
<tr><td>Ta fonction s'exécute</td><td>Elle lit <code>evenement.key</code> et agit.</td></tr>
</table>
<p>C'est le renversement à comprendre : tu n'appelles jamais ta fonction toi-même. Tu la déposes, et c'est le navigateur qui l'appellera — peut-être jamais, peut-être cent fois.</p>

<h2>Empêcher le comportement par défaut</h2>
<p>Certains événements déclenchent une action du navigateur : un formulaire envoyé recharge la page, une touche fléchée fait défiler. <code>evenement.preventDefault()</code> annule cette action, pour que ton code décide à la place.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le paramètre.</strong> Sans <code>function (evenement)</code>, impossible de savoir quelle touche a été pressée. L'objet est donné, encore faut-il le recevoir.</p>
<p><strong>Mettre des parenthèses à la fonction passée.</strong> <code>addEventListener("click", maFonction())</code> exécute la fonction immédiatement et enregistre son résultat. Sans parenthèses, c'est la fonction elle-même qui est déposée. Même piège qu'avec les callbacks.</p>
<p><strong>Confondre <code>input</code> et <code>change</code>.</strong> Pour une recherche qui filtre pendant la frappe, c'est <code>input</code>. <code>change</code> n'arrive qu'une fois le champ quitté — beaucoup trop tard.</p>
<p><strong>Enregistrer plusieurs fois le même écouteur.</strong> Si le code qui l'ajoute s'exécute deux fois, la fonction sera appelée deux fois à chaque événement. Les compteurs qui avancent de deux en deux viennent presque toujours de là.</p>

<h2>Dans la vraie vie</h2>
<p>La recherche qui filtre pendant la frappe, le raccourci clavier qui ouvre un panneau, la touche Échap qui ferme une fenêtre, le formulaire qui se vérifie avant l'envoi. Tout ce qui rend une interface agréable tient dans ces quelques événements.</p>

<div class="a-retenir">
<ul>
<li>La fonction d'écoute reçoit un objet événement : <code>evenement.key</code> donne la touche.</li>
<li>On dépose une fonction, le navigateur l'appelle — jamais l'inverse.</li>
<li><code>input</code> réagit à chaque caractère, <code>change</code> seulement après la sortie du champ.</li>
<li><code>preventDefault()</code> annule l'action automatique du navigateur.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : l'événement remonte</summary>
<p>Un clic sur un bouton déclenche aussi les écouteurs de son parent, puis de leur parent, jusqu'au document. On appelle ça la <em>propagation</em>. C'est très utile : plutôt que de poser cent écouteurs sur cent lignes de liste, on en pose un seul sur la liste, et <code>evenement.target</code> dit quelle ligne a été cliquée. Cette technique porte un nom — la délégation d'événements — et elle est partout dans le code professionnel.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le détecteur de touches : écoute <code>keydown</code> sur <code>document</code> et affiche dans <code>#touche</code> la phrase <code>Touche : [la touche]</code> à chaque frappe (via <code>evenement.key</code>). Clique dans l\'aperçu puis tape des lettres et des flèches pour tester !',
      codeDepart: '<h2>Tape sur ton clavier !</h2>\n<p id="touche" style="font-size: 24px; font-weight: bold;">En attente...</p>\n\n<script>\n\n</script>',
      indices: [
        "Cette fois l’écouteur ne se met pas sur un bouton mais sur le document entier : une touche ne vise aucun élément en particulier.",
        "La fonction de l’écouteur reçoit un <strong>événement</strong> en paramètre. C’est lui qui porte la touche pressée, dans <code>.key</code>.",
        "<code>document.addEventListener(\"keydown\", function (evenement) { … evenement.key … });</code>"
      ],
      solution: '<h2>Tape sur ton clavier !</h2>\n<p id="touche" style="font-size: 24px; font-weight: bold;">En attente...</p>\n\n<script>\n  document.addEventListener("keydown", function (evenement) {\n    document.querySelector("#touche").textContent = "Touche : " + evenement.key;\n  });\n</script>',
      verifier: function (ctx) {
        const p = ctx.doc.querySelector('#touche');
        if (!p) return { ok: false, message: 'Garde le paragraphe <code>#touche</code>.' };
        if (!/keydown/.test(ctx.code)) return { ok: false, message: 'L\'événement à écouter s\'appelle <code>"keydown"</code>.' };
        ctx.doc.dispatchEvent(new ctx.win.KeyboardEvent('keydown', { key: 'a' }));
        if (!/Touche\s*:\s*a/.test(p.textContent)) return { ok: false, message: 'J\'ai simulé la touche « a » : l\'affichage devrait devenir « Touche : a » (obtenu : « ' + p.textContent + ' »). La touche vient de <code>evenement.key</code>.' };
        ctx.doc.dispatchEvent(new ctx.win.KeyboardEvent('keydown', { key: 'ArrowRight' }));
        if (!/ArrowRight/.test(p.textContent)) return { ok: false, message: 'Les touches spéciales aussi : la flèche droite devrait afficher « Touche : ArrowRight ».' };
        return { ok: true, message: 'Ta page entend le clavier. Note les noms des flèches (ArrowLeft, ArrowRight...) : ils servent dans l\'exercice suivant !' };
      }
    },
    {
      type: 'html',
      hauteur: 300,
      consigne: '<strong>Défi : le personnage qui bouge.</strong> Fais bouger le carré au clavier : sur <code>ArrowRight</code>, augmente sa position de 20 (variable <code>position</code>, appliquée via <code>carre.style.marginLeft = position + "px"</code>) ; sur <code>ArrowLeft</code>, diminue de 20 — sans jamais descendre sous 0 ! Clique dans l\'aperçu puis pilote aux flèches.',
      codeDepart: '<style>\n  #carre {\n    width: 50px; height: 50px;\n    background: #4f6df5;\n    border-radius: 8px;\n    margin-left: 0px;\n  }\n</style>\n\n<h2>Pilote le carré aux flèches !</h2>\n<div id="carre"></div>\n\n<script>\n  let carre = document.querySelector("#carre");\n  let position = 0;\n\n  document.addEventListener("keydown", function (evenement) {\n\n  });\n</script>',
      indices: [
        "Une variable retient la position, et chaque flèche la modifie. Mais changer la variable ne suffit pas : il faut aussi l’appliquer au carré.",
        "On compare <code>evenement.key</code> à <code>\"ArrowRight\"</code> et <code>\"ArrowLeft\"</code>. La position s’applique avec <code>carre.style.marginLeft = position + \"px\"</code> — l’unité est obligatoire.",
        "<code>if (evenement.key === \"ArrowRight\") { position += 20; }</code>, un <code>else if</code> pour la gauche avec un garde-fou à 0, puis l’application du style."
      ],
      solution: '<style>\n  #carre {\n    width: 50px; height: 50px;\n    background: #4f6df5;\n    border-radius: 8px;\n    margin-left: 0px;\n  }\n</style>\n\n<h2>Pilote le carré aux flèches !</h2>\n<div id="carre"></div>\n\n<script>\n  let carre = document.querySelector("#carre");\n  let position = 0;\n\n  document.addEventListener("keydown", function (evenement) {\n    if (evenement.key === "ArrowRight") {\n      position += 20;\n    } else if (evenement.key === "ArrowLeft") {\n      position -= 20;\n      if (position < 0) {\n        position = 0;\n      }\n    }\n    carre.style.marginLeft = position + "px";\n  });\n</script>',
      verifier: function (ctx) {
        const carre = ctx.doc.querySelector('#carre');
        if (!carre) return { ok: false, message: 'Garde le carré.' };
        const envoyer = (k) => ctx.doc.dispatchEvent(new ctx.win.KeyboardEvent('keydown', { key: k }));
        envoyer('ArrowRight');
        envoyer('ArrowRight');
        if (parseInt(carre.style.marginLeft) !== 40) return { ok: false, message: 'Deux flèches droites : le carré devrait être à 40px (mesuré : « ' + (carre.style.marginLeft || '0') + ' »). Incrémente la variable PUIS applique-la au style.' };
        envoyer('ArrowLeft');
        if (parseInt(carre.style.marginLeft) !== 20) return { ok: false, message: 'La droite marche ! Après une flèche gauche, on attend 20px — vérifie le cas ArrowLeft.' };
        envoyer('ArrowLeft');
        envoyer('ArrowLeft');
        envoyer('ArrowLeft');
        if (parseInt(carre.style.marginLeft) < 0) return { ok: false, message: 'J\'ai matraqué la flèche gauche : le carré est sorti de l\'écran par la gauche (position négative) ! Ajoute le garde-fou du zéro.' };
        return { ok: true, message: '🎮 Un personnage, des contrôles, une limite de terrain : tu viens d\'écrire le cœur d\'un jeu vidéo. Littéralement — Pac-Man ne fait rien d\'autre.' };
      }
    }
  ]
},

{
  id: 'js2-8',
  titre: 'Mini-projet : le nombre mystère',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un module se termine mal s'il ne reste qu'une collection d'exercices séparés. Ce mini-projet rassemble presque tout ce que tu viens d'apprendre dans un programme complet et jouable : lire un champ, convertir, comparer, compter, afficher, et savoir s'arrêter.</p>
<p>C'est aussi la première fois que tu écris quelque chose qui a un <em>état</em> — une mémoire qui évolue entre deux clics.</p>

<h2>Le cahier des charges</h2>
<ul>
<li>le nombre secret est déjà tiré, entre 1 et 100 : il t'attend dans <code>window.secret</code> ;</li>
<li>au clic sur <code>#deviner</code> : lire le champ <code>#essai</code>, le convertir en nombre, incrémenter le compteur d'essais ;</li>
<li>comparer, puis afficher « Plus grand ! », « Plus petit ! », ou le message de victoire avec le nombre d'essais ;</li>
<li>à la victoire, désactiver le bouton.</li>
</ul>

<h2>Le piège de la conversion</h2>
<p>Un champ de saisie rend <strong>toujours</strong> du texte, même s'il ne contient que des chiffres. Sans conversion, <code>"50" &lt; 100</code> compare un texte à un nombre, et les résultats deviennent imprévisibles.</p>
<p>Trois comportements mesurés, qui méritent d'être connus avant d'écrire la ligne :</p>
<table class="memo-table trace">
<tr><th>Saisie</th><th><code>Number(...)</code></th><th><code>parseInt(...)</code></th></tr>
<tr><td>« 42 »</td><td>42</td><td>42</td></tr>
<tr><td>« 12ans »</td><td><strong>NaN</strong></td><td><strong>12</strong></td></tr>
<tr><td>champ vide</td><td><strong>0</strong></td><td>NaN</td></tr>
</table>
<p>Deux conséquences pratiques. <code>parseInt</code> est tolérant : il lit ce qu'il peut et ignore la suite — pratique, et dangereux si tu veux refuser une saisie fautive. Et <code>Number("")</code> rend <strong>0</strong>, pas <code>NaN</code> : un champ vide devient donc une proposition valide de zéro. C'est l'origine du bug le plus fréquent de ce projet.</p>
<p><code>isNaN(valeur)</code> permet de tester le résultat avant de s'en servir.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce que fait ton code</th></tr>
<tr><td>Clic sur le bouton</td><td>La fonction d'écoute démarre.</td></tr>
<tr><td>Lire le champ</td><td><code>.value</code> rend du texte, toujours.</td></tr>
<tr><td>Convertir</td><td>Et vérifier le résultat avant d'aller plus loin.</td></tr>
<tr><td>Compter</td><td>La variable du compteur vit <strong>en dehors</strong> de l'écouteur.</td></tr>
<tr><td>Comparer et afficher</td><td>Trois cas : plus grand, plus petit, gagné.</td></tr>
</table>
<p>L'avant-dernière ligne est celle qui coûte le plus de temps à tout le monde : un compteur déclaré à l'intérieur de la fonction du clic repart à zéro à chaque essai, et affiche éternellement « trouvé en 1 coup ».</p>

<h2>Les pièges</h2>
<p><strong>Comparer sans convertir.</strong> Le symptôme est trompeur : ça semble marcher sur certains nombres et pas sur d'autres, puisque la comparaison se fait alors dans l'ordre alphabétique.</p>
<p><strong>Le compteur dans l'écouteur.</strong> Même piège que le compteur de la leçon <code>js-12</code>. Une variable d'état se crée une seule fois, en dehors.</p>
<p><strong>Oublier de désactiver le bouton.</strong> Le joueur continue de proposer des nombres après avoir gagné, et le compteur grimpe. Un jeu doit savoir qu'il est fini.</p>

<h2>Dans la vraie vie</h2>
<p>Tu viens d'écrire la boucle de base de n'importe quel jeu : lire une action, la valider, mettre à jour l'état, afficher le résultat, tester la fin de partie. Un jeu du pendu, un quiz, un morpion suivent exactement la même structure — seules les règles changent.</p>

<div class="a-retenir">
<ul>
<li>Un champ de saisie rend toujours du texte : il faut convertir avant de comparer.</li>
<li><code>Number("")</code> vaut <strong>0</strong> et <code>parseInt("12ans")</code> vaut <strong>12</strong> : vérifie le résultat avec <code>isNaN</code>.</li>
<li>Une variable d'état se crée une seule fois, en dehors de l'écouteur.</li>
<li>Un jeu doit savoir s'arrêter : désactive le bouton à la victoire.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la meilleure stratégie</summary>
<p>Couper en deux à chaque coup — proposer 50, puis 25 ou 75 — garantit de trouver n'importe quel nombre entre 1 et 100 en sept essais au maximum. Chaque proposition élimine la moitié des possibilités restantes : 100, puis 50, 25, 13, 7, 4, 2, 1. Cette méthode s'appelle la <em>recherche dichotomique</em>, et c'est l'un des algorithmes les plus utilisés de l'informatique — c'est ainsi qu'une base de données retrouve une ligne parmi des millions sans les parcourir toutes.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      hauteur: 300,
      consigne: 'Implémente le jeu complet selon le cahier des charges : lecture + conversion, comparaison à trois branches, compteur d\'essais, et le message de victoire <code>Trouvé en X essais !</code>. Puis... joue !',
      codeDepart: '<style>\n  body { font-family: sans-serif; text-align: center; padding: 20px; }\n  input { font-size: 18px; padding: 8px; width: 90px; }\n  button { font-size: 18px; padding: 8px 18px; }\n  #reponse { font-size: 22px; font-weight: bold; min-height: 30px; }\n</style>\n\n<h2>🎯 Le nombre mystère (1 à 100)</h2>\n<input id="essai" type="number" min="1" max="100">\n<button id="deviner">Deviner !</button>\n<p id="reponse">À toi de jouer...</p>\n\n<script>\n  window.secret = Math.floor(Math.random() * 100) + 1;\n  let nbEssais = 0;\n\n  document.querySelector("#deviner").addEventListener("click", function () {\n    // À toi !\n\n  });\n</script>',
      indices: [
        "Quatre choses à faire dans l’écouteur, dans cet ordre : lire la saisie, compter l’essai, comparer, puis répondre.",
        "La valeur d’un champ est toujours du <strong>texte</strong> : <code>Number(…)</code> la convertit, sinon la comparaison sera fausse. Et la comparaison a trois branches : trop petit, trop grand, ou gagné.",
        "<code>let essai = Number(document.querySelector(\"#essai\").value);</code> · <code>nbEssais++;</code> · puis le <code>if / else if / else</code>."
      ],
      solution: '<style>\n  body { font-family: sans-serif; text-align: center; padding: 20px; }\n  input { font-size: 18px; padding: 8px; width: 90px; }\n  button { font-size: 18px; padding: 8px 18px; }\n  #reponse { font-size: 22px; font-weight: bold; min-height: 30px; }\n</style>\n\n<h2>🎯 Le nombre mystère (1 à 100)</h2>\n<input id="essai" type="number" min="1" max="100">\n<button id="deviner">Deviner !</button>\n<p id="reponse">À toi de jouer...</p>\n\n<script>\n  window.secret = Math.floor(Math.random() * 100) + 1;\n  let nbEssais = 0;\n\n  document.querySelector("#deviner").addEventListener("click", function () {\n    let essai = Number(document.querySelector("#essai").value);\n    nbEssais++;\n\n    let reponse = document.querySelector("#reponse");\n    if (essai < window.secret) {\n      reponse.textContent = "Plus grand !";\n    } else if (essai > window.secret) {\n      reponse.textContent = "Plus petit !";\n    } else {\n      reponse.textContent = `Trouvé en ${nbEssais} essais !`;\n    }\n  });\n</script>',
      verifier: function (ctx) {
        const champ = ctx.doc.querySelector('#essai');
        const btn = ctx.doc.querySelector('#deviner');
        const rep = ctx.doc.querySelector('#reponse');
        if (!champ || !btn || !rep) return { ok: false, message: 'Garde le champ, le bouton et le paragraphe #reponse.' };
        ctx.win.secret = 42;
        champ.value = '10';
        btn.click();
        if (!/plus grand/i.test(rep.textContent)) return { ok: false, message: 'Secret fixé à 42, j\'ai proposé 10 : « Plus grand ! » attendu (obtenu : « ' + rep.textContent + ' »). Compare <code>essai < window.secret</code>.' };
        champ.value = '80';
        btn.click();
        if (!/plus petit/i.test(rep.textContent)) return { ok: false, message: 'Avec 80 (> 42), on attend « Plus petit ! ». Vérifie le deuxième cas.' };
        champ.value = '42';
        btn.click();
        if (!/trouvé/i.test(rep.textContent)) return { ok: false, message: 'J\'ai donné la bonne réponse (42) : le message de victoire manque.' };
        if (!/3/.test(rep.textContent)) return { ok: false, message: 'Le jeu marche, mais le compteur cloche : après 3 tentatives, on attend « Trouvé en 3 essais ! » (obtenu : « ' + rep.textContent + ' »). Le <code>nbEssais++</code> doit compter CHAQUE clic.' };
        return { ok: true, message: '🏆 MODULE TERMINÉ EN BEAUTÉ ! Un jeu complet : hasard, état, comparaison, interface. Défi bonus non corrigé : bloquer le jeu une fois gagné, ou limiter à 7 essais. Tu as tout ce qu\'il faut.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question stratégie.</strong> Au nombre mystère (1-100), quelle stratégie garantit de trouver en 7 essais maximum ?',
      choix: [
        'Essayer les nombres dans l\'ordre : 1, 2, 3...',
        'Proposer au hasard',
        'Toujours couper l\'intervalle restant en deux : 50, puis 25 ou 75, etc.',
        'Commencer par les nombres porte-bonheur'
      ],
      bonne: 2,
      explication: 'Couper en deux à chaque coup : 100 → 50 → 25 → 13 → 7 → 4 → 2 → 1. C\'est la <strong>recherche dichotomique</strong> — un des algorithmes les plus célèbres de l\'informatique. Les bases de données retrouvent une ligne parmi des milliards exactement comme ça. Tu viens d\'apprendre ton premier grand algorithme via un jeu.',
      aides: [
        'Dans le pire des cas (secret = 100)... 100 essais. On peut faire mieux !',
        'Le hasard ne garantit rien — tu peux retomber sur les mêmes nombres.',
        '',
        'L\'ordinateur est hermétique à la chance — mais très sensible à la logique. Indice : chaque essai devrait éliminer la moitié des possibilités.'
      ]
    }
  ]
},

];
