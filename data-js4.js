/* ===== JavaScript avancé — seconde partie (jsav-8 à jsav-19) ===== */
window.DATA_JS4 = [

/* ---------- jsav-8 ---------- */
{
  id: 'jsav-8',
  titre: 'var, let, const : la portée',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu écris <code>let</code> et <code>const</code> depuis le début de ce cours, sans qu'on t'ait dit pourquoi il y en a deux — ni pourquoi tu croiseras un troisième mot, <code>var</code>, dans tout code écrit avant 2016.</p>
<p>La différence n'est pas cosmétique : elle touche à la <strong>portée</strong>, c'est-à-dire à l'endroit où une variable existe. Et <code>var</code> a été abandonné précisément parce que sa portée était une source de bugs.</p>

<h2>const : le nom ne sera pas réaffecté</h2>
<pre class="bloc-code">const pi = 3.14;
pi = 3;   // erreur</pre>
<p>Mesuré, le moteur répond : <code>Assignment to constant variable.</code></p>
<p>Attention au sens exact : <code>const</code> interdit de <em>remplacer</em> la valeur, pas de la modifier. Mesuré aussi — un <code>push</code> sur un tableau déclaré en <code>const</code> fonctionne parfaitement :</p>
<pre class="bloc-code">const t = [1, 2];
t.push(3);        // autorise : le tableau change
console.log(t);   // [1,2,3]
t = [9];          // interdit : le nom pointerait ailleurs</pre>
<p>C'est l'<strong>étiquette</strong> qui est verrouillée, pas le contenu de la boîte.</p>

<h2>var : la portée qui fuit</h2>
<pre class="bloc-code">if (true) {
  var a = 1;
  let b = 2;
}
console.log(a);   // 1    il est sorti du bloc !
console.log(b);   // erreur</pre>
<p>Mesuré : la première ligne affiche <code>1</code>, la seconde s'arrête sur <code>b is not defined</code>. <code>var</code> ignore les accolades — il ne connaît que les fonctions. Une variable déclarée dans un <code>if</code> ou une boucle déborde donc sur tout le reste, et peut en écraser une autre sans prévenir.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th></th><th>Portée</th><th>Réaffectation</th></tr>
<tr><td><code>const</code></td><td>le bloc</td><td>interdite</td></tr>
<tr><td><code>let</code></td><td>le bloc</td><td>autorisée</td></tr>
<tr><td><code>var</code></td><td><strong>la fonction entière</strong></td><td>autorisée</td></tr>
</table>
<p>La règle de travail qui en découle est simple, et c'est celle de tous les projets modernes : <strong><code>const</code> par défaut, <code>let</code> quand la valeur doit changer, <code>var</code> jamais</strong>.</p>

<h2>Les pièges</h2>
<p><strong>Croire que <code>const</code> fige un objet.</strong> C'est l'incompréhension la plus répandue. Un objet ou un tableau en <code>const</code> reste entièrement modifiable.</p>
<p><strong>Déclarer en <code>let</code> par réflexe.</strong> Ça marche, et ça fait perdre une information utile : un <code>const</code> dit au lecteur « cette valeur ne bougera plus ». Quand presque tout est en <code>const</code>, les rares <code>let</code> signalent ce qui évolue.</p>
<p><strong>Toucher à du vieux code en <code>var</code>.</strong> Le convertir en <code>let</code> peut révéler des bugs dormants — ou en créer, si le code s'appuyait justement sur la fuite. On convertit prudemment, en vérifiant.</p>

<h2>Dans la vraie vie</h2>
<p>Tous les guides de style récents interdisent <code>var</code>, et les outils de vérification automatique le signalent. Tu continueras pourtant d'en croiser : dans les tutoriels anciens, dans les réponses de forums, dans le code qui a vingt ans et qui tourne encore. Savoir ce qu'il fait sert surtout à lire — pas à écrire.</p>

<div class="a-retenir">
<ul>
<li><code>const</code> et <code>let</code> vivent dans leur bloc ; <code>var</code> déborde sur toute la fonction.</li>
<li><code>const</code> verrouille le nom, pas le contenu : un tableau reste modifiable.</li>
<li>Réaffecter un <code>const</code> : <code>Assignment to constant variable.</code></li>
<li>La règle : <code>const</code> par défaut, <code>let</code> si ça change, <code>var</code> jamais.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la remontée des déclarations</summary>
<p><code>var</code> a une seconde bizarrerie : sa déclaration est « remontée » en haut de la fonction par le moteur. Utiliser la variable avant sa ligne de déclaration ne provoque donc pas d'erreur — elle vaut simplement <code>undefined</code>, ce qui est bien pire qu'un message clair. <code>let</code> et <code>const</code> sont remontés aussi, mais restent inaccessibles jusqu'à leur ligne : les utiliser avant lève une vraie erreur. C'est exactement ce qu'on veut.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>JavaScript possède deux opérateurs d'égalité, et c'est une anomalie. Presque aucun langage n'en a deux. Celui-ci en a hérité d'un choix de 1995 : rendre le langage « tolérant », pour qu'un débutant n'ait pas à se soucier des types.</p>
<p>Le résultat est l'inverse de ce qui était visé. <code>==</code> compare après avoir <em>converti</em> ses deux côtés, selon des règles que personne ne retient — et produit des résultats que personne n'attend.</p>

<h2>Les deux opérateurs</h2>
<pre class="bloc-code">5 == "5"    // true   il convertit, puis compare
5 === "5"   // false  types differents, donc faux</pre>
<p><code>===</code> compare sans rien convertir : si les types diffèrent, c'est faux, point. C'est la seule règle à retenir, et elle tient en une ligne.</p>

<h2>Pas à pas : les résultats de ==</h2>
<p>Tous mesurés dans le moteur du cours :</p>
<table class="memo-table trace">
<tr><th>Comparaison</th><th>Résultat</th></tr>
<tr><td><code>5 == "5"</code></td><td>true</td></tr>
<tr><td><code>"" == 0</code></td><td><strong>true</strong></td></tr>
<tr><td><code>"0" == 0</code></td><td>true</td></tr>
<tr><td><code>[] == false</code></td><td><strong>true</strong></td></tr>
<tr><td><code>null == undefined</code></td><td>true</td></tr>
<tr><td><code>null == 0</code></td><td><strong>false</strong></td></tr>
</table>
<p>Regarde les trois lignes en gras ensemble. Une chaîne vide égale zéro, un tableau vide égale faux — mais <code>null</code> n'égale <em>pas</em> zéro. Il n'y a aucune logique à reconstituer : ce sont des règles de conversion écrites cas par cas il y a trente ans.</p>
<p>D'où la conclusion unanime du métier : <strong>on écrit <code>===</code>, toujours</strong>, et <code>!==</code> pour la différence.</p>

<h2>La seule exception reconnue</h2>
<pre class="bloc-code">if (valeur == null) { ... }</pre>
<p>Cette forme attrape à la fois <code>null</code> et <code>undefined</code> en un seul test — et rien d'autre, comme la dernière ligne du tableau le montre. Beaucoup d'équipes l'autorisent explicitement. C'est la seule.</p>

<h2>Les pièges</h2>
<p><strong>Taper <code>=</code> au lieu de <code>==</code>.</strong> Tu connais déjà celui-là depuis <code>js-5</code> : un seul signe range une valeur au lieu de comparer, et la condition est toujours vraie.</p>
<p><strong>Comparer une saisie sans convertir.</strong> <code>champ.value === 5</code> est toujours faux, puisqu'un champ rend du texte. Avec <code>==</code>, ça « marcherait » — et c'est exactement le genre de facilité qui cache le vrai problème au lieu de le corriger.</p>
<p><strong>Tester un tableau vide avec <code>==</code>.</strong> <code>[] == false</code> est vrai, mais <code>if ([])</code> est vrai aussi — un tableau vide est considéré comme une valeur présente. Pour savoir s'il est vide, c'est <code>t.length === 0</code>.</p>

<h2>Dans la vraie vie</h2>
<p>Tous les outils de vérification automatique signalent un <code>==</code> comme une faute, avec une exception configurable pour <code>== null</code>. C'est l'une des rares règles de style sur lesquelles le métier entier s'accorde — parce que les bugs qu'elle évite sont réels, silencieux, et difficiles à retrouver.</p>

<div class="a-retenir">
<ul>
<li><code>===</code> compare sans convertir : types différents, résultat faux.</li>
<li><code>==</code> convertit d'abord, selon des règles sans logique d'ensemble.</li>
<li><code>"" == 0</code> et <code>[] == false</code> sont vrais ; <code>null == 0</code> est faux.</li>
<li>Seule exception admise : <code>== null</code>, qui attrape <code>null</code> et <code>undefined</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi ne pas avoir corrigé ==</summary>
<p>Parce que le web ne se met pas à jour. Des milliards de pages existantes reposent sur ce comportement, parfois sans que leurs auteurs le sachent. Changer <code>==</code> casserait une partie du web du jour au lendemain. La stratégie retenue a donc été d'ajouter <code>===</code> à côté, et de laisser l'usage faire le reste. Trente ans plus tard, c'est réussi : plus personne n'écrit <code>==</code> volontairement.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Assembler du texte avec des <code>+</code> devient vite illisible. Une phrase de trois variables donne une ligne pleine de guillemets, d'espaces oubliés et de plus accolés — et le moindre oubli produit « BonjourCamillevous avez 3 messages ».</p>
<p>Les <strong>gabarits de chaîne</strong> règlent cela. Si tu connais les <em>f-strings</em> de Python, c'est exactement la même idée.</p>

<h2>La nouvelle écriture</h2>
<p>On remplace les guillemets par des <strong>accents graves</strong> — la touche à gauche du 1 — et l'on glisse les variables dans <code>&#36;{...}</code> :</p>
<pre class="bloc-code">const nom = "Alex";
const n = 3;

// l'ancienne facon
console.log("Bonjour " + nom + ", vous avez " + n + " messages.");

// avec un gabarit
console.log(&#96;Bonjour &#36;{nom}, vous avez &#36;{n} messages.&#96;);</pre>
<p>Les espaces sont à leur place naturelle, dans le texte. Plus rien à recoller.</p>

<h2>Deux avantages de plus</h2>
<p><strong>Les retours à la ligne sont conservés.</strong> Un gabarit peut s'étendre sur plusieurs lignes, et le texte obtenu les garde — là où une chaîne ordinaire exige un <code>\n</code> à chaque fois. C'est ce qui rend les gabarits si commodes pour écrire un bloc de HTML dans du JavaScript : on l'écrit comme on l'écrirait dans un fichier, indentation comprise, au lieu de recoller des morceaux ligne par ligne.</p>
<p><strong>On peut calculer à l'intérieur.</strong> <code>&#36;{prix * 1.2}</code> ou <code>&#36;{nom.toUpperCase()}</code> fonctionnent : ce qui est entre accolades est une expression, pas seulement un nom de variable.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'on écrit</th><th>Ce qui s'affiche</th></tr>
<tr><td>"Bonjour " + nom</td><td>Bonjour Alex — si l'espace a été mis</td></tr>
<tr><td>"Bonjour" + nom</td><td>BonjourAlex — l'oubli classique</td></tr>
<tr><td>gabarit avec &#36;{nom}</td><td>Bonjour Alex — l'espace est dans le texte</td></tr>
<tr><td>"Bonjour &#36;{nom}" (guillemets droits)</td><td><strong>Bonjour &#36;{nom}</strong> — littéralement</td></tr>
</table>
<p>La dernière ligne est le piège, et tu l'as déjà rencontré en <code>js-4</code> : le remplacement n'existe qu'entre accents graves.</p>

<h2>Les pièges</h2>
<p><strong>Confondre l'accent grave et l'apostrophe.</strong> Ils se ressemblent à l'écran, et l'erreur est invisible à la relecture. Si ton gabarit affiche <code>&#36;{...}</code> tel quel, c'est ça.</p>
<p><strong>Oublier le dollar.</strong> <code>&#96;Bonjour {nom}&#96;</code> affiche « Bonjour {nom} » : les accolades seules ne déclenchent rien.</p>
<p><strong>Insérer du HTML venu de l'utilisateur.</strong> Un gabarit assemble du texte, il ne sécurise rien. Le combiner à <code>innerHTML</code> rouvre exactement la faille vue en <code>jsav-4</code>.</p>
<p><strong>En mettre partout.</strong> Pour un seul mot sans variable, des guillemets ordinaires restent plus lisibles. Le gabarit sert quand il y a quelque chose à insérer.</p>

<h2>Dans la vraie vie</h2>
<p>C'est devenu l'écriture par défaut dès qu'un texte contient une variable — messages, libellés, fragments de HTML, requêtes. Les trois quarts des <code>+</code> d'assemblage ont disparu du code moderne.</p>

<div class="a-retenir">
<ul>
<li>Un gabarit s'écrit entre <strong>accents graves</strong>, et insère avec <code>&#36;{...}</code>.</li>
<li>Entre guillemets droits, <code>&#36;{...}</code> s'affiche littéralement.</li>
<li>On peut y mettre une expression complète, pas seulement un nom.</li>
<li>Les retours à la ligne y sont conservés tels quels.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les gabarits étiquetés</summary>
<p>On peut coller un nom de fonction juste devant un gabarit : <code>html&#96;...&#96;</code>. La fonction reçoit alors séparément les morceaux de texte et les valeurs insérées, et décide quoi en faire — par exemple échapper automatiquement tout ce qui vient de l'utilisateur. C'est le mécanisme sur lequel reposent plusieurs bibliothèques d'interface, et il transforme le gabarit d'une commodité d'écriture en véritable outil.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Sortir trois valeurs d'un objet demande normalement trois lignes, qui répètent toutes le même nom d'objet. C'est du bruit : on lit <code>contact</code> quatre fois pour apprendre trois choses.</p>
<p>La <strong>destructuration</strong> fait tenir cela en une ligne, et dit mieux l'intention : voilà ce que je veux de cet objet.</p>

<h2>Sur un objet</h2>
<pre class="bloc-code">const contact = { nom: "Alex", ville: "Lyon", age: 30 };

const nom = contact.nom;
const ville = contact.ville;

const { nom, ville } = contact;   // les deux lignes precedentes, d'un coup</pre>
<p>Les noms entre accolades doivent correspondre <strong>exactement</strong> aux clés : c'est par le nom que la valeur est retrouvée, pas par la position.</p>

<h2>Sur un tableau</h2>
<pre class="bloc-code">const couleurs = ["rouge", "vert", "bleu"];
const [premiere, deuxieme] = couleurs;</pre>
<p>Ici c'est l'inverse : les crochets, et la <strong>position</strong> qui compte — les noms sont libres. Pour sauter un élément, on laisse la place vide : <code>const [, deuxieme] = couleurs;</code>.</p>

<h2>Pas à pas : une clé qui n'existe pas</h2>
<table class="memo-table trace">
<tr><th>Code</th><th>Résultat</th></tr>
<tr><td><code>const { nom, ville } = { nom: "Alex" }</code></td><td><code>nom</code> vaut « Alex », <code>ville</code> vaut <strong>undefined</strong></td></tr>
<tr><td><code>const { ville = "inconnue" } = { nom: "Alex" }</code></td><td><code>ville</code> vaut <strong>« inconnue »</strong></td></tr>
</table>
<p>Mesuré. Une clé absente ne provoque aucune erreur : la variable existe et vaut <code>undefined</code>. La valeur par défaut, elle, ne s'applique que dans ce cas précis — pas si la clé existe et vaut <code>null</code> ou zéro.</p>

<h2>Renommer au passage</h2>
<pre class="bloc-code">const { nom: prenom } = contact;   // la cle nom, rangee dans prenom</pre>
<p>Utile quand le nom de la clé est trop vague, ou qu'il entrerait en conflit avec une variable existante.</p>

<h2>Les pièges</h2>
<p><strong>Confondre accolades et crochets.</strong> Accolades pour un objet, par nom ; crochets pour un tableau, par position. Les intervertir ne donne pas d'erreur — juste des <code>undefined</code> partout.</p>
<p><strong>Croire que la position compte dans un objet.</strong> <code>const { ville, nom } = contact</code> donne exactement la même chose que <code>{ nom, ville }</code>. Seuls les noms comptent.</p>
<p><strong>Une faute de frappe silencieuse.</strong> <code>const { vile } = contact</code> crée une variable <code>vile</code> à <code>undefined</code>, sans un mot. C'est le même piège que la clé mal orthographiée de <code>js-10</code>.</p>
<p><strong>Oublier les parenthèses sur une ligne seule.</strong> Destructurer dans une variable déjà déclarée demande d'entourer le tout : <code>({ nom } = contact);</code>. Sans elles, JavaScript croit lire un bloc de code et refuse.</p>

<h2>Dans la vraie vie</h2>
<p>On la croise surtout en tête de fonction : <code>function afficher({ nom, ville })</code> reçoit un objet entier et en extrait aussitôt ce qui l'intéresse. L'appel reste lisible, et la fonction ne dépend que de ce qu'elle nomme — ajouter une clé à l'objet ne casse rien.</p>

<div class="a-retenir">
<ul>
<li>Accolades pour un objet (par nom), crochets pour un tableau (par position).</li>
<li>Une clé absente donne <code>undefined</code>, sans erreur.</li>
<li><code>= valeur</code> fournit un défaut, uniquement quand la clé est absente.</li>
<li><code>{ cle: autreNom }</code> renomme au passage.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : destructurer en profondeur</summary>
<p>On peut descendre dans un objet imbriqué : <code>const { adresse: { ville } } = contact</code> sort directement la ville. C'est pratique, et c'est fragile — si <code>adresse</code> est absent, la ligne ne donne pas <code>undefined</code> mais lève une erreur. Au-delà d'un niveau, mieux vaut deux lignes lisibles qu'une ligne élégante qui casse.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Trois petits points, deux usages qui paraissent opposés — et une seule idée derrière : <strong>étaler</strong> ce qui est groupé, ou <strong>rassembler</strong> ce qui est épars. Le symbole est le même ; c'est sa place qui décide du sens.</p>

<h2>Spread : étaler</h2>
<pre class="bloc-code">const a = [1, 2];
const b = [...a, 3, 4];           // [1, 2, 3, 4]

const base = { nom: "Alex" };
const complet = { ...base, age: 30 };   // { nom: "Alex", age: 30 }</pre>
<p>Les points déroulent le contenu <em>dans</em> la nouvelle structure. L'original n'est jamais modifié — c'est précisément ce qui en fait l'outil de copie du JavaScript moderne, comme tu l'as vu en <code>js2-3</code>.</p>
<p>Il sert aussi à fusionner : <code>{ ...defauts, ...choix }</code> part des valeurs par défaut et laisse les choix de l'utilisateur écraser celles qui le concernent. L'ordre compte — ce qui vient après gagne.</p>

<h2>Rest : rassembler</h2>
<pre class="bloc-code">function total(...nombres) {
  return nombres.reduce((s, n) =&gt; s + n, 0);
}

total(1, 2, 3);   // 6</pre>
<p>Ici, les points sont dans la <em>déclaration</em> : ils ramassent tous les arguments reçus dans un vrai tableau. La fonction accepte donc un nombre quelconque de valeurs.</p>
<p>Même usage en destructuration : <code>const [premier, ...reste] = liste</code> met le premier élément à part et tout le reste dans un tableau.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Où sont les points</th><th>Ce qu'ils font</th></tr>
<tr><td>dans un littéral : <code>[...a]</code></td><td>ils <strong>étalent</strong> : le contenu de a entre dans le nouveau tableau</td></tr>
<tr><td>dans des paramètres : <code>f(...args)</code></td><td>ils <strong>rassemblent</strong> : les arguments deviennent un tableau</td></tr>
<tr><td>dans un appel : <code>f(...a)</code></td><td>ils étalent à nouveau : a devient une liste d'arguments</td></tr>
</table>
<p>La règle qui tranche : à <em>gauche</em> d'un signe égal ou dans une déclaration de fonction, ils rassemblent ; partout ailleurs, ils étalent.</p>

<h2>Les pièges</h2>
<p><strong>Croire que la copie est profonde.</strong> C'est le piège sérieux. <code>[...liste]</code> copie le tableau, mais si ses éléments sont des objets, ce sont les <em>mêmes</em> objets. Modifier l'un modifie l'autre. La copie ne va qu'à un niveau.</p>
<p><strong>Se tromper d'ordre dans une fusion.</strong> <code>{ ...choix, ...defauts }</code> fait gagner les valeurs par défaut — exactement l'inverse de ce qu'on voulait, et sans aucun signe.</p>
<p><strong>Mettre un paramètre rest ailleurs qu'à la fin.</strong> <code>function f(...a, b)</code> est refusé : comment saurait-il où s'arrêter ? Il doit être le dernier.</p>

<h2>Dans la vraie vie</h2>
<p>La fusion d'options est le cas le plus courant : une fonction a ses réglages par défaut, l'appelant en change deux, et <code>{ ...defauts, ...recus }</code> règle la question en une ligne. Le spread sert aussi à ajouter un élément à une liste sans la modifier — une façon de faire devenue la norme dans les applications modernes, où l'on préfère créer une nouvelle valeur plutôt que changer l'ancienne.</p>

<div class="a-retenir">
<ul>
<li>Mêmes trois points : ils <strong>étalent</strong> dans un littéral, ils <strong>rassemblent</strong> dans une déclaration.</li>
<li><code>{ ...a, ...b }</code> fusionne, et ce qui vient après l'emporte.</li>
<li>La copie ne va qu'à un niveau : les objets contenus restent partagés.</li>
<li>Un paramètre rest est toujours le dernier.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : copier vraiment en profondeur</summary>
<p>Pour dupliquer une structure imbriquée sans aucun lien avec l'originale, les navigateurs offrent désormais <code>structuredClone(objet)</code>. L'ancienne astuce, <code>JSON.parse(JSON.stringify(objet))</code>, fonctionne encore mais perd au passage les fonctions, les dates et les valeurs <code>undefined</code> — comme tu le verras à la leçon sur JSON.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Tu sais transformer un tableau avec <code>map</code> et le filtrer avec <code>filter</code>. Restent les questions plus précises : <em>y en a-t-il un qui…</em>, <em>lequel est le premier qui…</em>, <em>sont-ils tous…</em>. Chacune se répond avec une boucle et un drapeau — ou avec une méthode qui le dit en un mot.</p>

<h2>Cinq méthodes, cinq questions</h2>
<table class="memo-table trace">
<tr><th>Méthode</th><th>Question posée</th><th>Ce qu'elle rend</th></tr>
<tr><td><code>find</code></td><td>quel est le premier qui… ?</td><td>l'élément, ou <code>undefined</code></td></tr>
<tr><td><code>findIndex</code></td><td>à quelle place est-il ?</td><td>l'indice, ou <strong>-1</strong></td></tr>
<tr><td><code>some</code></td><td>y en a-t-il au moins un ?</td><td><code>true</code> ou <code>false</code></td></tr>
<tr><td><code>every</code></td><td>le sont-ils tous ?</td><td><code>true</code> ou <code>false</code></td></tr>
<tr><td><code>includes</code></td><td>cette valeur exacte y est-elle ?</td><td><code>true</code> ou <code>false</code></td></tr>
</table>
<pre class="bloc-code">const t = [1, 5, 9];

t.find(x =&gt; x &gt; 4);      // 5          l'element
t.filter(x =&gt; x &gt; 4);    // [5, 9]     un tableau
t.find(x =&gt; x &gt; 99);     // undefined
t.findIndex(x =&gt; x &gt; 99); // -1</pre>
<p>Mesuré. Retiens la différence de nature entre les deux premières : <code>find</code> rend <strong>un élément</strong>, <code>filter</code> rend <strong>un tableau</strong> — même quand il ne contient qu'une chose.</p>

<h2>Pas à pas</h2>
<p>Pourquoi deux valeurs d'échec différentes ? Parce que les deux méthodes ne rendent pas la même chose :</p>
<table class="memo-table trace">
<tr><th>Rien trouvé par…</th><th>Valeur rendue</th><th>Pourquoi</th></tr>
<tr><td><code>find</code></td><td><code>undefined</code></td><td>il rendait un élément : il n'y en a pas</td></tr>
<tr><td><code>findIndex</code></td><td><code>-1</code></td><td>il rendait un indice : -1 n'en est pas un valide</td></tr>
</table>
<p>D'où un piège symétrique de celui d'<code>indexOf</code> : tester <code>if (t.findIndex(...))</code> échoue quand l'élément est en <strong>première position</strong>, puisque 0 est considéré comme faux. Avec <code>find</code>, le test direct marche — sauf si l'élément cherché vaut lui-même 0 ou une chaîne vide.</p>

<h2>Les pièges</h2>
<p><strong>Utiliser <code>filter</code> quand on cherche un seul élément.</strong> On récupère un tableau, et il faut ajouter <code>[0]</code> — qui donnera <code>undefined</code> si rien n'a été trouvé. <code>find</code> dit directement ce qu'on veut.</p>
<p><strong>Oublier le <code>return</code> dans la fonction de test.</strong> <code>t.find(x =&gt; { x &gt; 4 })</code> avec des accolades ne rend rien : chaque test vaut <code>undefined</code>, donc faux, et <code>find</code> ne trouve jamais rien. Sans accolades, le <code>return</code> est automatique.</p>
<p><strong>Confondre <code>some</code> et <code>every</code> sur un tableau vide.</strong> <code>[].some(...)</code> rend <code>false</code>, mais <code>[].every(...)</code> rend <code>true</code> — « tous » est vrai quand il n'y en a aucun. C'est logique en mathématiques, et surprenant la première fois.</p>

<h2>Dans la vraie vie</h2>
<p>Retrouver un utilisateur par son identifiant, c'est <code>find</code>. Vérifier qu'un panier contient au moins un article en rupture, <code>some</code>. S'assurer que tous les champs obligatoires sont remplis, <code>every</code>. Chacune remplace une boucle de cinq lignes par une ligne qui dit ce qu'elle cherche.</p>

<div class="a-retenir">
<ul>
<li><code>find</code> rend un élément ou <code>undefined</code> ; <code>filter</code> rend toujours un tableau.</li>
<li><code>findIndex</code> rend <strong>-1</strong> quand il échoue : teste avec <code>!== -1</code>.</li>
<li><code>some</code> et <code>every</code> répondent par oui ou non — et <code>every</code> rend <code>true</code> sur un tableau vide.</li>
<li>Des accolades dans la fonction de test exigent un <code>return</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : elles s'arrêtent dès qu'elles savent</summary>
<p><code>find</code>, <code>some</code> et <code>every</code> interrompent le parcours dès que la réponse est acquise : <code>some</code> s'arrête au premier vrai, <code>every</code> au premier faux. Sur un tableau de cent mille éléments dont le premier répond, elles lisent une seule case. <code>filter</code> et <code>map</code>, eux, parcourent toujours tout — ils n'ont pas le choix, puisqu'ils construisent un résultat complet.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Deux méthodes aux noms presque identiques, aux comportements opposés. <code>slice</code> et <code>splice</code> : une lettre d'écart, et l'une respecte ton tableau quand l'autre le découpe.</p>
<p>La confusion entre les deux est un classique, et ses bugs sont retors : le programme marche, puis une donnée a disparu quelque part, sans message.</p>

<h2>slice : découper sans toucher</h2>
<pre class="bloc-code">const t = [0, 1, 2, 3, 4];

t.slice(1, 3);    // [1, 2]   du 1 jusqu'au 3 EXCLU
console.log(t);   // [0,1,2,3,4]   intact</pre>
<p>Mesuré : l'original n'a pas bougé. <code>slice</code> rend une <strong>copie</strong> d'un morceau. Sans argument, <code>t.slice()</code> copie tout — une façon simple de dupliquer un tableau.</p>
<p>Les indices négatifs comptent depuis la fin : <code>t.slice(-2)</code> rend les deux derniers.</p>

<h2>splice : découper pour de bon</h2>
<pre class="bloc-code">const t = [0, 1, 2, 3, 4];

t.splice(1, 2);   // rend [1, 2]
console.log(t);   // [0,3,4]   deux elements ont disparu</pre>
<p>Mesuré aussi. <code>splice</code> <strong>modifie</strong> le tableau d'origine, et rend ce qu'il a retiré. Ses deux arguments ne veulent d'ailleurs pas dire la même chose que ceux de <code>slice</code> : ici c'est une position et un <em>nombre d'éléments</em>, pas une position de fin.</p>
<p>Il sait aussi insérer : <code>t.splice(1, 0, "a", "b")</code> retire zéro élément et en ajoute deux à la position 1.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th></th><th>slice(1, 3)</th><th>splice(1, 2)</th></tr>
<tr><td>arguments</td><td>début, fin exclue</td><td>début, <strong>combien</strong></td></tr>
<tr><td>rend</td><td>une copie du morceau</td><td>les éléments retirés</td></tr>
<tr><td>le tableau d'origine</td><td>intact</td><td><strong>modifié</strong></td></tr>
<tr><td>sur <code>[0,1,2,3,4]</code></td><td>rend [1,2], laisse [0,1,2,3,4]</td><td>rend [1,2], laisse [0,3,4]</td></tr>
</table>
<p>Le moyen mnémotechnique le plus fiable : <strong>splice a un p comme « perturbe »</strong>. Et dans le doute, c'est <code>slice</code> qu'il faut prendre — ne rien casser est toujours le choix prudent.</p>

<h2>Les pièges</h2>
<p><strong>Prendre <code>splice</code> pour <code>slice</code>.</strong> Le symptôme est éloigné de la cause : le tableau rétrécit à chaque appel, et le bug se manifeste bien plus loin dans le programme.</p>
<p><strong>Croire que le second argument est une fin.</strong> <code>t.splice(1, 3)</code> retire <strong>trois</strong> éléments, pas jusqu'à l'indice 3. Deux méthodes voisines, deux conventions différentes.</p>
<p><strong>Utiliser <code>splice</code> dans une boucle qui parcourt le tableau.</strong> Retirer un élément décale tous les suivants : la boucle en saute un à chaque fois. Pour retirer selon un critère, <code>filter</code> est le bon outil — il construit un nouveau tableau au lieu de trafiquer celui qu'on lit.</p>

<h2>Dans la vraie vie</h2>
<p><code>slice</code> sert à paginer — afficher les éléments 20 à 40 d'une liste — et à copier avant de trier. <code>splice</code> sert à retirer un élément précis d'une liste de tâches. Le code moderne lui préfère souvent <code>filter</code> ou le spread, justement pour éviter de modifier ce qu'on tient.</p>

<div class="a-retenir">
<ul>
<li><code>slice</code> copie et ne touche à rien ; <code>splice</code> modifie le tableau d'origine.</li>
<li><code>slice(debut, fin)</code> — la fin est exclue. <code>splice(debut, combien)</code> — un nombre.</li>
<li>Les deux rendent le morceau concerné : seul l'effet sur l'original diffère.</li>
<li>Dans le doute, prends <code>slice</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les méthodes qui modifient</summary>
<p>Elles sont peu nombreuses et valent d'être connues par cœur, parce que ce sont elles qui réservent des surprises : <code>push</code>, <code>pop</code>, <code>shift</code>, <code>unshift</code>, <code>splice</code>, <code>sort</code> et <code>reverse</code>. Toutes les autres rendent une nouvelle valeur. Depuis peu, les navigateurs proposent des jumelles non destructrices — <code>toSorted</code>, <code>toReversed</code>, <code>toSpliced</code> — qui évitent d'avoir à copier avant.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Une boucle <code>for...of</code> parcourt un tableau. Sur un objet, elle ne fonctionne pas : un objet n'est pas une liste ordonnée, c'est un ensemble de couples clé-valeur.</p>
<p>Pour le parcourir, il faut d'abord en extraire ce qu'on veut : les clés, les valeurs, ou les deux ensemble. Trois fonctions s'en chargent, et elles rendent des <strong>tableaux</strong> — c'est-à-dire quelque chose que tu sais déjà manipuler.</p>

<h2>Trois extractions</h2>
<pre class="bloc-code">const stock = { pommes: 12, poires: 5 };

Object.keys(stock);     // ["pommes", "poires"]
Object.values(stock);   // [12, 5]
Object.entries(stock);  // [["pommes", 12], ["poires", 5]]</pre>
<p>Mesuré. <code>entries</code> rend un tableau de petits tableaux à deux cases : la clé puis la valeur. C'est la forme la plus riche, et celle qu'on utilise le plus.</p>

<h2>Parcourir pour de bon</h2>
<pre class="bloc-code">for (const [fruit, quantite] of Object.entries(stock)) {
  console.log(fruit + " : " + quantite);
}</pre>
<p>Les crochets dans la déclaration sont de la destructuration, vue en <code>jsav-11</code> : chaque couple est aussitôt ouvert en deux variables nommées. C'est l'écriture standard pour parcourir un objet, et elle se lit presque comme une phrase.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'on veut</th><th>Ce qu'on écrit</th></tr>
<tr><td>les noms des fruits</td><td><code>Object.keys(stock)</code></td></tr>
<tr><td>le total du stock</td><td><code>Object.values(stock).reduce((s, n) =&gt; s + n, 0)</code></td></tr>
<tr><td>afficher chaque ligne</td><td><code>Object.entries(stock)</code> + <code>for...of</code></td></tr>
<tr><td>savoir s'il y a des fruits</td><td><code>Object.keys(stock).length === 0</code></td></tr>
</table>
<p>La dernière ligne répond à une vraie question : un objet n'a pas de <code>.length</code>. Pour savoir s'il est vide, on compte ses clés.</p>

<h2>Les pièges</h2>
<p><strong>Chercher <code>stock.length</code>.</strong> Il vaut <code>undefined</code>, sans erreur. Les objets n'ont pas de longueur ; les tableaux si.</p>
<p><strong>Utiliser <code>for...in</code> sans précaution.</strong> Il existe et parcourt les clés — mais il remonte aussi celles héritées, ce qui réserve des surprises. <code>Object.keys</code> ne rend que les clés propres à l'objet. Préfère-le systématiquement.</p>
<p><strong>Compter sur l'ordre des clés.</strong> Il est à peu près prévisible aujourd'hui — ordre d'insertion, sauf pour les clés numériques qui passent devant, triées. Mais s'appuyer dessus est fragile : si l'ordre compte, c'est un tableau qu'il te faut.</p>
<p><strong>Oublier les crochets dans le <code>for...of</code>.</strong> Sans eux, la variable reçoit le petit tableau entier, et l'affichage donne <code>pommes,12</code>. Rien n'est signalé.</p>

<h2>Dans la vraie vie</h2>
<p>Afficher un inventaire, construire un tableau HTML à partir de données reçues, compter des occurrences. <code>Object.entries</code> est aussi le pont vers toutes les méthodes de tableau : une fois l'objet transformé en liste de couples, <code>map</code>, <code>filter</code> et <code>sort</code> redeviennent disponibles.</p>

<div class="a-retenir">
<ul>
<li><code>Object.keys</code>, <code>values</code> et <code>entries</code> transforment un objet en tableau.</li>
<li><code>for (const [cle, valeur] of Object.entries(obj))</code> est l'écriture standard.</li>
<li>Un objet n'a pas de <code>.length</code> : on compte <code>Object.keys(obj).length</code>.</li>
<li>Ne compte jamais sur l'ordre des clés — si l'ordre compte, prends un tableau.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le chemin inverse</summary>
<p><code>Object.fromEntries</code> refait un objet à partir d'une liste de couples. Combiné à <code>entries</code>, il permet de transformer un objet entier en une ligne : extraire en couples, filtrer ou modifier avec les méthodes de tableau, puis reconstruire. C'est la façon habituelle de « filtrer un objet », opération pour laquelle il n'existe aucune méthode directe.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Tu sais créer un objet : <code>{ nom: "Rex", age: 3 }</code>. Mais pour en fabriquer cent, avec les mêmes clés et les mêmes fonctions, il faudrait tout recopier cent fois — et corriger cent fois le jour où quelque chose change.</p>
<p>Une <strong>classe</strong> est le moule. On la décrit une fois, et chaque objet fabriqué à partir d'elle reçoit automatiquement la même structure et les mêmes capacités.</p>

<h2>Le moule et ses objets</h2>
<pre class="bloc-code">class Chien {
  constructor(nom, age) {
    this.nom = nom;
    this.age = age;
  }

  aboyer() {
    return this.nom + " dit Ouaf !";
  }
}

const rex = new Chien("Rex", 3);
console.log(rex.aboyer());   // "Rex dit Ouaf !"</pre>
<p>Trois mots nouveaux :</p>
<ul>
<li><code>class</code> déclare le moule — par convention, son nom prend une majuscule ;</li>
<li><code>constructor</code> est appelé automatiquement à chaque fabrication, pour remplir l'objet ;</li>
<li><code>new</code> déclenche la fabrication.</li>
</ul>

<h2>this : l'objet en cours</h2>
<p><code>this</code> désigne l'objet sur lequel on travaille <em>en ce moment</em>. Dans le constructeur de <code>rex</code>, <code>this</code> est <code>rex</code> ; pour un autre chien, ce sera l'autre. C'est ce qui permet à une seule méthode écrite une fois de servir cent objets différents.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ligne</th><th>Ce qui se passe</th></tr>
<tr><td><code>class Chien { ... }</code></td><td>Le moule est rangé. Aucun chien n'existe.</td></tr>
<tr><td><code>new Chien("Rex", 3)</code></td><td>Un objet vide est créé, puis le constructeur le remplit.</td></tr>
<tr><td><code>this.nom = nom</code></td><td><code>this</code> est ce nouvel objet : il reçoit sa clé.</td></tr>
<tr><td><code>rex.aboyer()</code></td><td>La méthode s'exécute avec <code>this</code> valant <code>rex</code>.</td></tr>
</table>
<p>Détail mesuré qui éclaire la mécanique : <code>typeof Chien</code> rend <code>"function"</code>. Une classe JavaScript est, au fond, une fonction de fabrication avec une écriture plus claire.</p>

<h2>Les pièges</h2>
<p><strong>Oublier <code>new</code>.</strong> Mesuré, le moteur refuse net : <code>Class constructor Chien cannot be invoked without 'new'</code>. C'est une bonne nouvelle — l'oubli est signalé immédiatement, là où d'autres erreurs de ce module restent silencieuses.</p>
<p><strong>Oublier <code>this</code> dans une méthode.</strong> Écrire <code>return nom + " dit Ouaf"</code> cherche une variable <code>nom</code> qui n'existe pas, et lève <code>nom is not defined</code>. Les clés d'un objet s'atteignent toujours par <code>this</code>.</p>
<p><strong>Perdre <code>this</code> dans un écouteur.</strong> Si tu passes une méthode à <code>addEventListener</code>, elle sera appelée par le navigateur, et <code>this</code> ne désignera plus ton objet. La parade est une fonction fléchée, qui ne change pas <code>this</code> — comme tu l'as vu en <code>jsav-fleches</code>.</p>

<h2>Dans la vraie vie</h2>
<p>Les classes servent dès qu'un programme manipule beaucoup d'objets semblables : les ennemis d'un jeu, les éléments d'un panier, les composants d'une interface. Elles ne sont pas obligatoires — on peut tout écrire avec des fonctions et des objets simples — et beaucoup de code moderne les évite. Savoir les lire reste indispensable, parce qu'elles sont partout.</p>

<div class="a-retenir">
<ul>
<li>Une classe est un moule ; <code>new</code> fabrique un objet à partir d'elle.</li>
<li><code>constructor</code> remplit l'objet au moment de sa création.</li>
<li><code>this</code> désigne l'objet en cours — toujours nécessaire pour atteindre ses clés.</li>
<li>Oublier <code>new</code> : <code>Class constructor ... cannot be invoked without 'new'</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : hériter d'une classe</summary>
<p><code>class Chiot extends Chien</code> reprend tout ce que fait <code>Chien</code> et permet d'ajouter ou de remplacer des méthodes. Dans le constructeur du Chiot, <code>super(...)</code> appelle celui du parent. C'est puissant, et c'est aussi l'endroit où les hiérarchies deviennent vite ingérables : l'usage actuel est de préférer la <em>composition</em> — assembler des capacités — à de longues chaînes d'héritage.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Voici une notion réputée difficile, et qui devient limpide dès qu'on la voit fonctionner. Le problème qu'elle résout : comment donner une mémoire à une fonction, sans mettre cette mémoire à la portée de tout le programme ?</p>
<p>Un compteur rangé dans une variable globale marche — et n'importe quelle ligne du programme peut le remettre à zéro par erreur. Une <strong>closure</strong> protège cette mémoire tout en la gardant.</p>

<h2>Une fonction qui se souvient</h2>
<pre class="bloc-code">function creerCompteur() {
  let n = 0;
  return function () {
    n++;
    return n;
  };
}

const c = creerCompteur();
console.log(c());   // 1
console.log(c());   // 2

const d = creerCompteur();
console.log(d());   // 1</pre>
<p>Mesuré : 1, puis 2, puis 1. Deux faits s'y lisent.</p>
<p>D'abord, <code>n</code> <strong>survit</strong> à la fin de <code>creerCompteur</code>. Tu sais pourtant depuis <code>js2-5</code> qu'une variable meurt avec sa fonction — sauf si quelque chose la retient. Ici, la fonction renvoyée l'utilise encore : JavaScript garde donc la bulle en vie tant que cette fonction existe.</p>
<p>Ensuite, le second compteur repart de 1 : <strong>chaque appel crée sa propre bulle</strong>. Les deux compteurs ne partagent rien.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td><code>creerCompteur()</code></td><td>Une bulle s'ouvre, <code>n</code> naît à 0.</td></tr>
<tr><td>elle rend une fonction</td><td>Cette fonction utilise <code>n</code> : la bulle ne peut pas être refermée.</td></tr>
<tr><td><code>c()</code></td><td>Elle retrouve <em>son</em> <code>n</code>, le monte à 1.</td></tr>
<tr><td><code>c()</code> à nouveau</td><td>Même bulle, même <code>n</code> : 2.</td></tr>
<tr><td><code>creerCompteur()</code> encore</td><td>Une <strong>nouvelle</strong> bulle, un nouveau <code>n</code> à 0.</td></tr>
</table>
<p>Et le point qui fait tout l'intérêt : <code>n</code> est <strong>inaccessible de l'extérieur</strong>. Aucune ligne du programme ne peut le lire ni le modifier — seule la fonction rendue y touche. C'est la façon la plus simple de rendre une donnée privée en JavaScript.</p>

<h2>Les pièges</h2>
<p><strong>Croire que les compteurs se partagent.</strong> Chaque appel de la fabrique produit une bulle indépendante. Pour une mémoire commune, il faut appeler la fabrique une seule fois et partager la fonction obtenue.</p>
<p><strong>Appeler la fabrique au lieu de garder son résultat.</strong> <code>creerCompteur()()</code> fabrique une bulle, l'utilise une fois, et la jette : le compteur rend éternellement 1.</p>
<p><strong>Retenir sans le vouloir.</strong> Une closure garde en vie tout ce qu'elle utilise. Si elle capture un gros tableau dont elle n'a besoin que d'une valeur, le tableau entier reste en mémoire. C'est l'une des causes des fuites de mémoire dans les applications qui tournent longtemps.</p>

<h2>Dans la vraie vie</h2>
<p>Tu en as déjà écrit sans le savoir : toute fonction passée à <code>addEventListener</code> qui utilise une variable déclarée autour d'elle est une closure. C'est exactement ce qui fait marcher le compteur de <code>js-12</code> — la variable vit en dehors de l'écouteur, et l'écouteur s'en souvient.</p>

<div class="a-retenir">
<ul>
<li>Une closure est une fonction qui garde accès aux variables de l'endroit où elle est née.</li>
<li>Ces variables survivent à la fin de la fonction englobante, tant que la closure existe.</li>
<li>Chaque appel de la fabrique crée une bulle indépendante.</li>
<li>C'est la façon la plus simple d'obtenir une donnée vraiment privée.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la boucle et les trois alertes</summary>
<p>L'exemple historique : une boucle qui crée trois fonctions affichant son compteur. Avec <code>var</code>, les trois affichent 3 — elles partagent la même variable, qui a fini son parcours. Avec <code>let</code>, elles affichent 0, 1, 2, parce que <code>let</code> crée une variable neuve à chaque tour, donc trois bulles distinctes. C'est l'une des raisons les plus concrètes pour lesquelles <code>var</code> a été abandonné.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>JavaScript ne sait pas mettre un programme en pause. Il n'existe aucune instruction « attends trois secondes » — et c'est voulu : le navigateur n'a qu'un seul fil d'exécution, celui qui dessine la page. S'il s'arrêtait, la page se figerait entièrement.</p>
<p>À la place, on <strong>programme du code pour plus tard</strong>, et le programme continue sans attendre.</p>

<h2>Les deux outils</h2>
<pre class="bloc-code">setTimeout(function () { console.log("plus tard"); }, 1000);

const id = setInterval(function () { console.log("tic"); }, 1000);
clearInterval(id);</pre>
<ul>
<li><code>setTimeout</code> — une fois, après le délai ;</li>
<li><code>setInterval</code> — toutes les <em>n</em> millisecondes, sans fin ;</li>
<li><code>clearInterval(id)</code> — arrête l'intervalle, grâce à l'identifiant rendu au départ.</li>
</ul>
<p>Le délai s'exprime en millisecondes : 1000 pour une seconde.</p>

<h2>Pas à pas : ce n'est pas une pause</h2>
<p>Voici ce qui déroute le plus, et c'est mesuré dans le moteur du cours :</p>
<pre class="bloc-code">console.log("avant");
setTimeout(function () { console.log("minuteur"); }, 0);
console.log("apres");</pre>
<table class="memo-table trace">
<tr><th>Ordre d'affichage</th><th>Pourquoi</th></tr>
<tr><td>avant</td><td>exécuté tout de suite</td></tr>
<tr><td><strong>apres</strong></td><td>la ligne suivante ne l'a pas attendu</td></tr>
<tr><td>minuteur</td><td>même avec un délai de <strong>zéro</strong></td></tr>
</table>
<p>Un délai de zéro ne veut donc pas dire « maintenant » : il veut dire « dès que le programme en cours aura fini ». Le minuteur attend toujours son tour. C'est le cœur de l'<strong>asynchrone</strong>, et le point à comprendre avant tout le reste.</p>

<h2>Les pièges</h2>
<p><strong>Attendre un résultat juste après.</strong> Le code qui suit un <code>setTimeout</code> s'exécute <em>avant</em> lui. Tout ce qui dépend du résultat doit aller <strong>à l'intérieur</strong> de la fonction, pas après l'appel.</p>
<p><strong>Mettre des parenthèses à la fonction.</strong> <code>setTimeout(saluer(), 1000)</code> exécute <code>saluer</code> immédiatement et programme son <em>résultat</em>. Sans parenthèses, c'est la fonction qui est programmée. Même piège que pour les écouteurs.</p>
<p><strong>Ne jamais arrêter un intervalle.</strong> Il tourne tant que la page est ouverte. Lancé trois fois, trois intervalles tournent en parallèle : l'affichage saute, et personne ne comprend pourquoi. Garde l'identifiant, et arrête l'ancien avant d'en lancer un nouveau.</p>
<p><strong>Croire le délai exact.</strong> C'est un minimum, pas une promesse : si le fil est occupé, le minuteur attend. Pour mesurer une durée réelle, on compare deux dates.</p>

<h2>Dans la vraie vie</h2>
<p>Un message qui disparaît au bout de trois secondes, une horloge, une animation image par image, un diaporama. Et un usage moins évident mais très courant : attendre que l'utilisateur ait fini de taper avant de lancer une recherche — on programme la recherche dans 300 ms, et chaque nouvelle frappe annule la précédente.</p>

<div class="a-retenir">
<ul>
<li>JavaScript ne met jamais en pause : il programme du code pour plus tard.</li>
<li>Un <code>setTimeout</code> de <strong>0 ms</strong> s'exécute quand même <em>après</em> le code qui le suit.</li>
<li>Ce qui dépend du résultat va à l'intérieur de la fonction, jamais après l'appel.</li>
<li>Un <code>setInterval</code> doit pouvoir être arrêté : garde son identifiant.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la file d'attente</summary>
<p>Le navigateur tient une file : le code en cours s'exécute jusqu'au bout, puis il prend la tâche suivante. Un minuteur ne fait qu'ajouter une tâche à cette file — d'où le délai de zéro qui attend quand même. C'est aussi ce qui explique qu'une boucle infinie fige tout : elle ne rend jamais la main, donc la file n'avance plus, et plus rien ne se dessine. Ce mécanisme porte un nom, la <em>boucle d'événements</em>, et il explique presque tout le comportement asynchrone du langage.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Deux programmes qui veulent s'échanger des données ont un problème : un objet JavaScript vit dans la mémoire d'un navigateur, et ne traverse pas le réseau. Il faut le transformer en quelque chose de transportable — du <strong>texte</strong>.</p>
<p>C'est ce que fait JSON, devenu le format d'échange universel du web. Son nom vient de JavaScript, mais tous les langages le lisent aujourd'hui.</p>

<h2>Aller et retour</h2>
<pre class="bloc-code">const contact = { nom: "Alex", tags: ["a", "b"] };

const texte = JSON.stringify(contact);
// '{"nom":"Alex","tags":["a","b"]}'   du TEXTE

const retour = JSON.parse(texte);
// un vrai objet a nouveau</pre>
<p>Deux fonctions, deux sens. <code>stringify</code> pour envoyer ou stocker, <code>parse</code> pour relire. Tu t'en es déjà servi en <code>jsav-6</code>, pour le <code>localStorage</code>.</p>
<p>Le format est strict, bien plus que JavaScript : guillemets <strong>doubles</strong> obligatoires, y compris autour des clés, et aucune virgule après le dernier élément.</p>

<h2>Pas à pas : ce qui se perd en route</h2>
<p>Mesuré, et c'est la surprise de la leçon :</p>
<pre class="bloc-code">const o = { nom: "Alex", calc: function () { return 1; }, d: undefined, n: 3 };
console.log(JSON.stringify(o));</pre>
<table class="memo-table trace">
<tr><th>Clé</th><th>Devient</th></tr>
<tr><td><code>nom: "Alex"</code></td><td>conservée</td></tr>
<tr><td><code>n: 3</code></td><td>conservée</td></tr>
<tr><td><code>calc: function</code></td><td><strong>disparue</strong></td></tr>
<tr><td><code>d: undefined</code></td><td><strong>disparue</strong></td></tr>
</table>
<p>Le résultat est <code>{"nom":"Alex","n":3}</code> — sans le moindre avertissement. JSON ne transporte que des données : textes, nombres, booléens, tableaux, objets, <code>null</code>. Les fonctions et les <code>undefined</code> sont silencieusement retirés. Une date, elle, se transforme en texte et ne redevient pas une date au retour.</p>

<h2>Quand le texte est invalide</h2>
<p>Mesuré aussi : <code>JSON.parse("{pas du json}")</code> lève <code>Expected property name or '}' in JSON at position 1</code>. Le message est précis — il donne la position — mais l'erreur arrête le programme. D'où la règle, qui rejoint <code>jsav-7</code> : tout <code>JSON.parse</code> sur une donnée qu'on ne contrôle pas s'entoure d'un <code>try / catch</code>.</p>

<h2>Les pièges</h2>
<p><strong>Croire que l'aller-retour conserve tout.</strong> L'astuce <code>JSON.parse(JSON.stringify(obj))</code> pour copier en profondeur est répandue — et elle perd fonctions, dates et <code>undefined</code>. Pour une vraie copie, <code>structuredClone</code>.</p>
<p><strong>Écrire du JSON à la main avec des apostrophes.</strong> <code>{'nom': 'Alex'}</code> est du JavaScript valide et du JSON invalide. Le format n'accepte que les guillemets doubles.</p>
<p><strong>Oublier le <code>try / catch</code>.</strong> Une réponse de serveur tronquée, un fichier abîmé, et tout s'arrête.</p>

<h2>Dans la vraie vie</h2>
<p>Chaque fois qu'une page charge des données sans se recharger, c'est du JSON qui circule. Les fichiers de configuration, les sauvegardes, les échanges entre services : le même format partout. C'est sans doute le format de données le plus utilisé au monde — et il tient en une page de règles.</p>

<div class="a-retenir">
<ul>
<li><code>JSON.stringify</code> transforme un objet en texte, <code>JSON.parse</code> fait le retour.</li>
<li>Fonctions et <code>undefined</code> <strong>disparaissent</strong> sans avertissement.</li>
<li>Guillemets doubles obligatoires, aucune virgule finale.</li>
<li>Tout <code>parse</code> sur une donnée non maîtrisée s'entoure d'un <code>try / catch</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : lire du JSON à l'œil</summary>
<p><code>JSON.stringify(objet, null, 2)</code> ajoute des retours à la ligne et deux espaces d'indentation. Le texte devient lisible, ce qui change tout quand on inspecte une réponse de serveur dans la console. Le deuxième argument, ici <code>null</code>, permet de choisir quelles clés conserver — pratique pour retirer d'un coup les informations sensibles avant d'afficher ou de consigner un objet.</p>
</details>
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
