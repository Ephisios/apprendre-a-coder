/* ===== Module JavaScript — la suite (js2-1 à js2-8) ===== */
window.DATA_JS3 = [

{
  id: 'js2-1',
  titre: 'switch et l\'opérateur ternaire',
  contenu: `
<p>Tu sais tout faire avec if/else... mais parfois, d'autres formes sont plus lisibles. Voici les deux alternatives que tu croiseras dans tout code réel.</p>

<h2>switch : l'aiguillage</h2>
<p>Quand on compare UNE variable à plusieurs valeurs précises, le <code>switch</code> est plus clair qu'une pile de else if :</p>
<pre class="bloc-code">let jour = "samedi";

switch (jour) {
  case "samedi":
  case "dimanche":
    console.log("Week-end !");
    break;
  case "mercredi":
    console.log("Milieu de semaine");
    break;
  default:
    console.log("Jour de travail");
}</pre>
<ul>
<li><code>case valeur:</code> — « si la variable vaut ça... » ;</li>
<li><code>break;</code> — sort du switch. <strong>Sans lui, l'exécution CONTINUE dans le case suivant !</strong> (deux case collés comme samedi/dimanche exploitent justement cet enchaînement) ;</li>
<li><code>default:</code> — le « else » du switch.</li>
</ul>

<h2>Le ternaire : le if en une ligne</h2>
<pre class="bloc-code">let age = 20;
let statut = (age >= 18) ? "majeur" : "mineur";
//            condition  ? si vrai  : si faux</pre>
<p>Parfait pour choisir entre DEUX valeurs. Au-delà, reste sur if/else — un ternaire imbriqué est illisible.</p>
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
<p>Les données du monde réel sont du texte mal fichu : espaces en trop, mauvais séparateurs, morceaux à extraire. Voici la trousse de chirurgie des chaînes.</p>

<h2>Découper et extraire</h2>
<pre class="bloc-code">let phrase = "le chat dort";
phrase.split(" ")        // ["le", "chat", "dort"] — texte → tableau !
phrase.slice(0, 7)       // "le chat" — extrait du caractère 0 à 7 (exclu)
phrase.slice(3)          // "chat dort" — du 3e à la fin
phrase[0]                // "l" — un caractère par son index</pre>
<p><code>split</code> est une passerelle majeure : il transforme un texte en tableau, et d'un coup TOUT ton arsenal de tableaux (boucles, map, filter...) s'applique au texte. L'inverse est <code>join</code>.</p>

<h2>Remplacer et nettoyer</h2>
<pre class="bloc-code">let texte = "  Bonjour le monde  ";
texte.trim()                       // "Bonjour le monde" — espaces des bords retirés
texte.replace("monde", "code")     // remplace la 1re occurrence
texte.replaceAll("o", "0")         // remplace TOUTES les occurrences
texte.startsWith("Bon")            // true / false
texte.includes("jour")             // true / false</pre>

<div class="astuce">✅ Réflexe pro : TOUJOURS <code>trim()</code> les saisies utilisateur. Un espace invisible tapé par mégarde a fait échouer des millions de connexions (« mot de passe incorrect »... à cause d'un espace).</div>
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
<h2>Trier : sort</h2>
<pre class="bloc-code">let mots = ["poire", "abricot", "melon"];
mots.sort();                      // ["abricot", "melon", "poire"] — alphabétique

let nombres = [40, 7, 100];
nombres.sort();                   // [100, 40, 7] ?! — trié comme du TEXTE !
nombres.sort((a, b) => a - b);    // [7, 40, 100] ✓ croissant
nombres.sort((a, b) => b - a);    // [100, 40, 7] ✓ décroissant</pre>
<div class="attention">⚠️ Le piège légendaire : sans fonction de comparaison, <code>sort</code> trie les nombres par ordre alphabétique ("100" avant "7" car "1" &lt; "7"). Pour les nombres : TOUJOURS <code>(a, b) =&gt; a - b</code>.</div>

<h2>Tout résumer en une valeur : reduce</h2>
<pre class="bloc-code">let prix = [10, 24, 8];
let total = prix.reduce((somme, p) => somme + p, 0);   // 42</pre>
<p><code>reduce</code> parcourt le tableau en maintenant un accumulateur : la fonction reçoit (accumulateur, élément), le <code>0</code> final est la valeur de départ. C'est le motif accumulateur en une ligne.</p>

<h2>Étaler : le spread ...</h2>
<pre class="bloc-code">let a = [1, 2];
let b = [3, 4];
let tout = [...a, ...b];        // [1, 2, 3, 4] — fusion
let copie = [...a];             // vraie copie indépendante
let max = Math.max(...tout);    // 4 — étale le tableau en arguments</pre>
<p>Les trois points « déballent » un tableau. Détail crucial : <code>let c = a;</code> ne copie PAS (les deux noms pointent le même tableau !) — <code>[...a]</code> copie vraiment.</p>
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
<p>Une boucle DANS une boucle : c'est l'outil des grilles, des tableaux à deux dimensions, des combinaisons. Vertigineux au début, ultra-courant ensuite.</p>

<h2>Le principe</h2>
<pre class="bloc-code">for (let ligne = 1; ligne <= 2; ligne++) {
  for (let colonne = 1; colonne <= 3; colonne++) {
    console.log(\`ligne \${ligne}, colonne \${colonne}\`);
  }
}
// ligne 1 colonne 1, 1-2, 1-3, ligne 2 colonne 1, 2-2, 2-3</pre>
<p>La boucle INTERNE fait tous ses tours à CHAQUE tour de la boucle externe : 2 lignes × 3 colonnes = 6 passages. C'est le balayage d'une grille, case par case, ligne par ligne.</p>

<h2>Construire du texte ligne par ligne</h2>
<pre class="bloc-code">for (let i = 1; i <= 3; i++) {
  let ligne = "";
  for (let j = 1; j <= 4; j++) {
    ligne += "*";
  }
  console.log(ligne);   // ****, trois fois
}</pre>
<p>Motif classique : une variable texte vidée à chaque ligne, remplie par la boucle interne, affichée à la fin du tour externe.</p>

<h2>Les tableaux de tableaux (2D)</h2>
<pre class="bloc-code">let morpion = [
  ["X", "O", "X"],
  ["O", "X", "O"],
  ["X", "O", "X"]
];
console.log(morpion[1][2]);   // "O" — ligne 1, colonne 2</pre>
<p>Un tableau dont chaque case est un tableau : la structure des grilles de jeu, des plateaux, des feuilles de calcul.</p>
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
<h2>La portée : chaque fonction a sa bulle</h2>
<pre class="bloc-code">function calculer() {
  let secret = 42;        // née DANS la fonction...
  console.log(secret);    // 42 ✓
}
calculer();
console.log(secret);      // ERREUR : secret n'existe pas ici !</pre>
<p>Une variable créée dans une fonction (ou dans un bloc <code>{ }</code>) n'existe QUE là. C'est une protection : les fonctions ne polluent pas le programme, et 200 fonctions peuvent chacune avoir leur variable <code>total</code> sans conflit. L'inverse marche : une fonction VOIT les variables déclarées au-dessus d'elle.</p>

<h2>Les paramètres par défaut</h2>
<pre class="bloc-code">function saluer(nom = "visiteur") {
  console.log("Bonjour " + nom + " !");
}
saluer("Léa");    // Bonjour Léa !
saluer();         // Bonjour visiteur !  (le défaut prend le relais)</pre>

<h2>Les callbacks : passer une fonction à une fonction</h2>
<p>Tu le fais depuis longtemps sans le nom : la fonction donnée à <code>addEventListener</code>, à <code>map</code>, à <code>filter</code>... s'appelle un <strong>callback</strong> (fonction de rappel). Tu peux en recevoir dans TES fonctions :</p>
<pre class="bloc-code">function troisFois(action) {
  action();
  action();
  action();
}
troisFois(() => console.log("hop"));   // hop hop hop</pre>
<p>Une fonction devient une valeur qu'on transporte et qu'on exécute plus tard. C'est LE concept qui rend JavaScript si flexible.</p>
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
<h2>L'objet Date</h2>
<pre class="bloc-code">let maintenant = new Date();       // l'instant présent
maintenant.getFullYear()           // 2026
maintenant.getMonth()              // 6 ⚠️ = juillet (les mois comptent de 0 !)
maintenant.getDate()               // le jour du mois (1-31)
maintenant.getDay()                // le jour de la SEMAINE (0 = dimanche)
maintenant.getHours()              // l'heure (0-23)
maintenant.getMinutes()            // les minutes</pre>
<div class="attention">⚠️ Deux chausse-trappes historiques : <code>getMonth()</code> compte de 0 (janvier = 0, décembre = 11) et <code>getDay()</code> donne le jour de SEMAINE, pas du mois. Tous les développeurs s'y sont fait avoir. Tous.</div>

<h2>Programmer dans le futur : setTimeout et setInterval</h2>
<pre class="bloc-code">setTimeout(() => {
  console.log("3 secondes plus tard...");
}, 3000);                        // UNE fois, dans 3000 ms

let minuteur = setInterval(() => {
  console.log("toutes les secondes");
}, 1000);                        // EN BOUCLE, toutes les 1000 ms

clearInterval(minuteur);         // stop !</pre>
<p>Le temps s'exprime en <strong>millisecondes</strong> (1000 = 1 seconde). Ces deux fonctions prennent un callback — encore lui ! — exécuté plus tard. Notifications, horloges, diaporamas, compte à rebours : tout le « différé » du web passe par là.</p>
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
<p>Le clic n'est qu'UN événement parmi des dizaines. Voici les autres capteurs qui rendent une page vraiment vivante.</p>

<h2>Le clavier : keydown</h2>
<pre class="bloc-code">document.addEventListener("keydown", function (evenement) {
  console.log(evenement.key);   // "a", "Enter", "ArrowRight", "Escape"...
});</pre>
<p>Nouveauté majeure : la fonction reçoit un <strong>objet événement</strong> qui décrit ce qui s'est passé. Sa clé <code>.key</code> donne la touche : lettres telles quelles, touches spéciales par leur nom (<code>"Enter"</code>, <code>"ArrowLeft"</code>, <code>"ArrowRight"</code>, <code>"Escape"</code>, <code>" "</code> pour espace).</p>
<pre class="bloc-code">if (evenement.key === "ArrowRight") { ... }   // flèche droite !</pre>
<p>C'est TOUT le secret des jeux au clavier — et des raccourcis type Ctrl+S.</p>

<h2>Le reste de la famille</h2>
<table class="memo-table">
<tr><th>Événement</th><th>Se déclenche quand...</th></tr>
<tr><td>"click"</td><td>clic (tu connais !)</td></tr>
<tr><td>"input"</td><td>chaque caractère tapé dans un champ</td></tr>
<tr><td>"change"</td><td>un champ/menu change ET perd le focus</td></tr>
<tr><td>"keydown"</td><td>une touche s'enfonce</td></tr>
<tr><td>"mouseover" / "mouseout"</td><td>la souris entre / sort (le :hover du JS)</td></tr>
<tr><td>"submit"</td><td>un formulaire est envoyé</td></tr>
<tr><td>"dblclick"</td><td>double-clic</td></tr>
</table>
<p>Tous suivent le même schéma : <code>element.addEventListener("nom", (e) =&gt; { ... })</code>. Un seul mécanisme à connaître, des dizaines de déclencheurs.</p>
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
<p>Pour clore ce module, un jeu complet à construire : l'ordinateur choisit un nombre entre 1 et 100, le joueur le devine, le programme guide — « plus grand ! », « plus petit ! » — et compte les essais.</p>

<h2>Le cahier des charges</h2>
<ol>
<li>le nombre secret est déjà tiré (fourni) : <code>window.secret</code>, entre 1 et 100 ;</li>
<li>au clic sur <code>#deviner</code> : lis le champ <code>#essai</code>, convertis en nombre (le piège éternel !), incrémente le compteur d'essais ;</li>
<li>compare : trop petit → affiche <code>Plus grand !</code> dans <code>#reponse</code> ; trop grand → <code>Plus petit !</code> ;</li>
<li>trouvé → <code>Trouvé en X essais !</code></li>
</ol>

<h2>Rappel des munitions (tout est déjà en toi)</h2>
<pre class="bloc-code">let essai = Number(document.querySelector("#essai").value);
if (essai < window.secret) { ... }
else if (essai > window.secret) { ... }
else { ... }</pre>

<div class="astuce">✅ Pourquoi <code>window.secret</code> et pas <code>let secret</code> ? Pour que le correcteur puisse tricher un peu et vérifier ton jeu avec un nombre connu ! <code>window</code> est l'objet global de la page — une variable accrochée dessus est visible partout.</div>
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
