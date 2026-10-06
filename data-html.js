/* ===== Module HTML ===== */
window.DATA_HTML = [

{
  id: 'html-1',
  titre: 'Ta première page : les balises',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Imagine que tu envoies ce texte à un navigateur :</p>
<pre class="bloc-code">Mes vacances
Cet été, je suis parti en Bretagne.</pre>
<p>Toi, tu vois immédiatement que la première ligne est un titre et la seconde une phrase. Le navigateur, lui, ne reçoit qu'une suite de caractères. Rien, là-dedans, ne dit que « Mes vacances » doit s'afficher en gros.</p>
<p>Le HTML (<em>HyperText Markup Language</em>, « langage de balisage ») répond à ce problème d'une seule façon : <strong>on entoure chaque morceau d'une étiquette qui dit ce qu'il est</strong>. Ces étiquettes s'appellent des <strong>balises</strong>. C'est la notion centrale du langage — tout le reste en découle.</p>

<h2>Anatomie d'une balise</h2>
<pre class="bloc-code">&lt;h1&gt;Mon titre&lt;/h1&gt;</pre>
<ul>
<li><code>&lt;h1&gt;</code> est la <strong>balise ouvrante</strong> : elle annonce « ici commence un titre » ;</li>
<li><code>Mon titre</code> est le <strong>contenu</strong>, le seul morceau que le visiteur verra ;</li>
<li><code>&lt;/h1&gt;</code> est la <strong>balise fermante</strong> : la même, avec une barre oblique <code>/</code>. Elle annonce « le titre s'arrête ici ».</li>
</ul>
<p>Le navigateur n'affiche jamais les balises elles-mêmes. Il les lit pour savoir <em>comment</em> présenter ce qu'elles entourent. <code>h1</code> veut dire « titre de niveau 1 » (<em>heading 1</em>) : le texte sortira donc en gros et en gras.</p>

<h2>Les deux balises que tu utiliseras le plus</h2>
<ul>
<li><code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code> — les titres, du plus important au moins important ;</li>
<li><code>&lt;p&gt;</code> — un paragraphe de texte (<em>paragraph</em>).</li>
</ul>
<pre class="bloc-code">&lt;h1&gt;Mes vacances&lt;/h1&gt;
&lt;p&gt;Cet été, je suis parti en Bretagne.&lt;/p&gt;
&lt;p&gt;Il a plu, mais c'était super.&lt;/p&gt;</pre>

<h2>Pas à pas</h2>
<p>Voici comment le navigateur avance dans ce code, de gauche à droite, sans jamais revenir en arrière :</p>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Ce qu'il en fait</th></tr>
<tr><td>&lt;h1&gt;</td><td>« Un titre commence. » Il n'affiche rien et retient l'information.</td></tr>
<tr><td>Mes vacances</td><td>Du contenu. Il le met de côté, sans savoir encore comment le présenter.</td></tr>
<tr><td>&lt;/h1&gt;</td><td>« Le titre s'arrête. » Il affiche enfin « Mes vacances », en gros et en gras.</td></tr>
<tr><td>&lt;p&gt;</td><td>« Un paragraphe commence. » Nouvelle ligne, taille normale.</td></tr>
<tr><td>&lt;/p&gt;</td><td>Le paragraphe est terminé et affiché.</td></tr>
</table>
<p>Retiens ce point : c'est la balise <em>fermante</em> qui déclenche l'affichage. Tant qu'elle n'est pas arrivée, le navigateur considère qu'il est encore à l'intérieur.</p>

<h2>Les pièges</h2>
<p><strong>La fermante oubliée.</strong> Si tu écris <code>&lt;h1&gt;Mes vacances</code> puis un paragraphe, le navigateur n'a jamais vu le titre se refermer : il avale le paragraphe <em>à l'intérieur</em> du titre. Résultat, toute la page s'affiche en énorme. C'est le symptôme le plus reconnaissable du débutant, et la première chose à vérifier quand un affichage part en vrille.</p>
<p><strong>La barre oblique oubliée.</strong> <code>&lt;h1&gt;Mon titre&lt;h1&gt;</code> n'est pas une fermeture : c'est un <em>second</em> titre qui s'ouvre. Le navigateur se débrouille — il ferme le premier tout seul — mais tu te retrouves avec un titre vide en plus.</p>
<p><strong>La balise inventée.</strong> <code>&lt;titre&gt;Mon titre&lt;/titre&gt;</code> ne provoque aucune erreur : le navigateur ne connaît pas <code>titre</code>, alors il l'ignore et affiche le texte en taille normale. Rien ne te prévient. Les noms de balises ne s'inventent pas, ils se retiennent.</p>
<div class="astuce">Bonne nouvelle au passage : les majuscules n'ont pas d'importance. <code>&lt;H1&gt;</code> fonctionne exactement comme <code>&lt;h1&gt;</code>. L'usage est d'écrire en minuscules, et c'est tout.</div>

<h2>Dans la vraie vie</h2>
<p>Chaque page que tu visites est faite de ça. Sur n'importe quel site, <strong>Ctrl+U</strong> (ou Cmd+U sur Mac) affiche le HTML reçu par ton navigateur. Tu y retrouveras des <code>&lt;h1&gt;</code> et des <code>&lt;p&gt;</code>, noyés dans beaucoup d'autres balises — mais le principe que tu viens d'apprendre est exactement celui-là.</p>

<div class="a-retenir">
<ul>
<li>Une balise entoure un morceau de contenu et dit <strong>ce qu'il est</strong> : <code>&lt;h1&gt;</code> ouvre, <code>&lt;/h1&gt;</code> ferme.</li>
<li>Le navigateur n'affiche jamais les balises : il s'en sert pour présenter ce qu'elles entourent.</li>
<li>Une fermante oubliée fait avaler la suite par la balise restée ouverte — d'où une page toute en gros.</li>
<li>Une balise inconnue ne déclenche aucune erreur : elle est simplement ignorée.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi des chevrons ?</summary>
<p>Les signes <code>&lt;</code> et <code>&gt;</code> ont été choisis parce qu'ils sont rares dans un texte ordinaire : un document pouvait donc être balisé sans que ses propres mots soient pris pour des balises. Quand tu as vraiment besoin d'écrire un chevron dans ton texte, tu l'échappes en <code>&amp;lt;</code> — c'est d'ailleurs ce que fait cette page pour t'afficher du code HTML sans qu'il soit interprété.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée une page contenant un titre <code>&lt;h1&gt;</code> avec le texte de ton choix, suivi d\'un paragraphe <code>&lt;p&gt;</code> qui contient au moins quelques mots.',
      codeDepart: '<!-- Écris ton code ici (cette ligne est un commentaire, tu peux l\'effacer) -->\n',
      indices: [
        "Une balise HTML va presque toujours par paire : une ouvrante, une fermante, et le contenu au milieu.",
        "Le titre principal, c’est <code>&lt;h1&gt;</code> ; un paragraphe, c’est <code>&lt;p&gt;</code>. La fermante reprend le même nom, précédé d’une barre oblique.",
        "<code>&lt;h1&gt;</code>Un titre<code>&lt;/h1&gt;</code> puis, en dessous, <code>&lt;p&gt;</code>Une phrase.<code>&lt;/p&gt;</code>"
      ],
      solution: '<h1>Ma première page</h1>\n<p>Je suis en train d\'apprendre le HTML, et ça marche !</p>',
      verifier: function (ctx) {
        const h1 = ctx.doc.querySelector('h1');
        const p = ctx.doc.querySelector('p');
        if (!h1) return { ok: false, message: 'Je ne trouve pas de balise <code>&lt;h1&gt;</code>. As-tu bien mis la balise ouvrante ET la fermante ?' };
        if (!h1.textContent.trim()) return { ok: false, message: 'Ta balise <code>&lt;h1&gt;</code> est vide : écris un texte entre <code>&lt;h1&gt;</code> et <code>&lt;/h1&gt;</code>.' };
        if (!p) return { ok: false, message: 'Le titre est bon ! Il manque maintenant un paragraphe avec la balise <code>&lt;p&gt;</code>.' };
        if (p.textContent.trim().split(/\s+/).length < 2) return { ok: false, message: 'Ton paragraphe est bien là, mais écris au moins quelques mots dedans.' };
        return { ok: true, message: 'Tu maîtrises la structure de base de toute page web.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Chasse au bug !</strong> Ce code est cassé : l\'affichage dans l\'aperçu est bizarre (tout est énorme). Trouve l\'erreur et répare-la. C\'est ton premier débogage — un moment historique.',
      codeDepart: '<h1>Mon journal<h1>\n<p>Aujourd\'hui, j\'ai réparé mon premier bug.</p>\n<p>Je suis officiellement en route pour devenir codeur.</p>',
      indices: [
        "Tout s’affiche énorme : c’est que le titre n’a jamais été refermé, et que tout ce qui suit en hérite.",
        "Une balise fermante se distingue de l’ouvrante par une seule chose : une barre oblique juste après le chevron.",
        "Regarde la fin de la première ligne : c’est cette barre qui manque."
      ],
      solution: '<h1>Mon journal</h1>\n<p>Aujourd\'hui, j\'ai réparé mon premier bug.</p>\n<p>Je suis officiellement en route pour devenir codeur.</p>',
      verifier: function (ctx) {
        if (!/<\/h1>/i.test(ctx.code)) return { ok: false, message: 'Le problème est toujours là : la première ligne se termine par <code>&lt;h1&gt;</code> au lieu de <code>&lt;/h1&gt;</code> (il manque la barre oblique <code>/</code>).' };
        if (ctx.doc.querySelectorAll('p').length < 2) return { ok: false, message: 'Garde les deux paragraphes du code de départ.' };
        return { ok: true, message: 'Bug trouvé et corrigé — c\'est exactement ça, le quotidien d\'un développeur. Remarque comme UN caractère manquant cassait tout l\'affichage.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi, de mémoire</strong> (sans regarder plus haut !) : crée une page « Mes objectifs » avec un grand titre et <strong>trois</strong> paragraphes : un objectif par paragraphe.',
      codeDepart: '',
      indices: [
        "Rien de nouveau : un titre, puis trois paragraphes, chacun dans sa propre paire de balises.",
        "Trois paragraphes, c’est trois paires <code>&lt;p&gt;</code> — pas un seul paragraphe avec des retours à la ligne.",
        "Un <code>&lt;h1&gt;</code> puis trois blocs <code>&lt;p&gt;</code> à la suite."
      ],
      solution: '<h1>Mes objectifs</h1>\n<p>Apprendre les bases du HTML.</p>\n<p>Créer mon premier site web.</p>\n<p>Coder un petit jeu en JavaScript.</p>',
      verifier: function (ctx) {
        const h1 = ctx.doc.querySelectorAll('h1');
        const p = ctx.doc.querySelectorAll('p');
        if (h1.length !== 1 || !h1[0].textContent.trim()) return { ok: false, message: 'Il faut exactement un <code>&lt;h1&gt;</code> avec du texte (tu en as ' + h1.length + ').' };
        if (p.length < 3) return { ok: false, message: 'Il faut trois paragraphes <code>&lt;p&gt;</code> (tu en as ' + p.length + ' pour l\'instant).' };
        for (const el of p) { if (!el.textContent.trim()) return { ok: false, message: 'Un de tes paragraphes est vide — écris un objectif dans chacun.' }; }
        return { ok: true, message: 'Écrit de mémoire, sans modèle : c\'est comme ça qu\'on sait que c\'est acquis.' };
      }
    }
  ]
},

{
  id: 'html-2',
  titre: 'Titres, paragraphes et hiérarchie',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un livre de cuisine n'est pas un bloc de texte : il a un titre, des chapitres, des recettes. Une page web non plus. Les balises de titre <code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code> servent à poser cette <strong>hiérarchie</strong>.</p>
<p>Et elle ne sert pas qu'à l'œil. Un lecteur d'écran — le logiciel qui lit une page à voix haute pour une personne aveugle — permet de sauter de titre en titre pour trouver la bonne section, exactement comme toi tu parcours une page du regard. Les moteurs de recherche s'en servent aussi pour comprendre de quoi parle la page. Une hiérarchie bien posée, c'est donc du sens, pas de la décoration.</p>

<h2>Six niveaux, comme un sommaire</h2>
<pre class="bloc-code">&lt;h1&gt;Recettes de cuisine&lt;/h1&gt;

&lt;h2&gt;Les entrées&lt;/h2&gt;
&lt;p&gt;Des idées fraîches pour commencer le repas.&lt;/p&gt;

&lt;h2&gt;Les desserts&lt;/h2&gt;
&lt;p&gt;Le meilleur pour la fin.&lt;/p&gt;</pre>
<p>Lis seulement les titres de ce code : « Recettes de cuisine » puis, en dessous, « Les entrées » et « Les desserts ». Tu viens de lire le sommaire de la page. C'est exactement ce qu'en fait un lecteur d'écran.</p>

<h2>Les trois règles</h2>
<ul>
<li><strong>Un seul <code>&lt;h1&gt;</code> par page</strong> : c'est le titre de la page entière, pas d'une section.</li>
<li><strong>On ne saute pas de niveau</strong> : après un <code>&lt;h2&gt;</code> vient un <code>&lt;h3&gt;</code>. Passer de <code>h2</code> à <code>h5</code>, c'est écrire un sommaire avec des numéros manquants.</li>
<li><strong>On choisit un niveau pour son sens, jamais pour sa taille.</strong> Si un <code>&lt;h2&gt;</code> te paraît trop gros, ce n'est pas une raison de prendre un <code>&lt;h4&gt;</code> : la taille se réglera au CSS, au module suivant.</li>
</ul>

<h2>Pas à pas</h2>
<p>Ce que le navigateur retient du code ci-dessus, dans l'ordre :</p>
<table class="memo-table trace">
<tr><th>Balise</th><th>Rang dans le sommaire</th></tr>
<tr><td>&lt;h1&gt;Recettes de cuisine&lt;/h1&gt;</td><td>Niveau 1 : le titre de la page.</td></tr>
<tr><td>&lt;h2&gt;Les entrées&lt;/h2&gt;</td><td>Niveau 2 : une section, à l'intérieur du niveau 1.</td></tr>
<tr><td>&lt;p&gt;…&lt;/p&gt;</td><td>Du texte, rattaché à la section ouverte juste avant.</td></tr>
<tr><td>&lt;h2&gt;Les desserts&lt;/h2&gt;</td><td>Niveau 2 à nouveau : la section précédente se termine, une autre commence.</td></tr>
</table>
<p>Aucune balise ne dit « la section est finie » : c'est l'arrivée d'un titre de même niveau, ou d'un niveau supérieur, qui la clôt.</p>

<h2>Deux balises sans contenu</h2>
<ul>
<li><code>&lt;br&gt;</code> — un retour à la ligne <em>à l'intérieur</em> d'un paragraphe ;</li>
<li><code>&lt;hr&gt;</code> — un trait de séparation horizontal.</li>
</ul>
<p>Ces deux-là n'entourent rien, donc elles n'ont <strong>pas de balise fermante</strong>. Elles sont l'exception : écrire <code>&lt;/br&gt;</code> ne sert à rien.</p>

<h2>Les pièges</h2>
<p><strong>Choisir le titre d'après sa taille.</strong> C'est l'erreur la plus fréquente, et la plus invisible : la page est belle, mais son sommaire est faux. À savoir — un <code>&lt;h4&gt;</code> s'affiche à la <em>même taille</em> qu'un paragraphe ordinaire, simplement en gras. Prendre un <code>h4</code> « pour que ce soit plus petit » revient donc souvent à ne plus avoir de titre visible du tout.</p>
<p><strong>Croire qu'un saut de ligne dans le code en fait un à l'écran.</strong> Appuyer trois fois sur Entrée, ou aligner avec dix espaces, ne change rien : le navigateur réduit toute suite d'espaces et de retours à la ligne à une seule espace. <code>&lt;p&gt;une</code> (trois retours à la ligne) <code>phrase&lt;/p&gt;</code> s'affiche « une phrase ». Pour aller à la ligne, il faut une balise.</p>
<p><strong>Mettre un paragraphe dans un paragraphe.</strong> <code>&lt;p&gt;dehors &lt;p&gt;dedans&lt;/p&gt;&lt;/p&gt;</code> ne s'imbrique pas : un paragraphe ne peut pas en contenir un autre, alors le navigateur ferme le premier avant d'ouvrir le second, et il reste un paragraphe vide à la fin.</p>

<h2>Dans la vraie vie</h2>
<p>Les titres d'un article de presse, les sections d'une page de documentation, les rubriques d'une boutique : tous sont des <code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code>. C'est aussi ce que lit un moteur de recherche en premier pour décider de quoi parle ta page.</p>

<div class="a-retenir">
<ul>
<li>Les titres posent le <strong>sommaire</strong> de la page : un seul <code>&lt;h1&gt;</code>, puis des niveaux qui se suivent sans trou.</li>
<li>On choisit un niveau pour son sens ; la taille est l'affaire du CSS.</li>
<li>Le navigateur écrase les espaces et les retours à la ligne du code : aller à la ligne demande une balise.</li>
<li><code>&lt;br&gt;</code> et <code>&lt;hr&gt;</code> n'entourent rien, donc ne se ferment pas.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : à quoi servent h5 et h6 ?</summary>
<p>Presque jamais, et c'est normal. Il faut une page très découpée — une documentation technique, un rapport — pour descendre si bas. Si tu te retrouves à écrire un <code>&lt;h5&gt;</code> sur une page ordinaire, c'est en général le signe que la page mériterait d'être coupée en deux.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Construis une mini page « Mon carnet » : un <code>&lt;h1&gt;</code> principal, puis <strong>deux</strong> sections ayant chacune un sous-titre <code>&lt;h2&gt;</code> et un paragraphe <code>&lt;p&gt;</code>.',
      codeDepart: '<h1>Mon carnet</h1>\n',
      indices: [
        "Les titres ont des niveaux, comme les chapitres d’un livre : un seul titre principal, puis des sous-titres.",
        "Le <code>&lt;h1&gt;</code> vient en premier. Chaque section commence ensuite par un <code>&lt;h2&gt;</code> suivi de son paragraphe.",
        "Après le h1 : <code>&lt;h2&gt;</code> puis <code>&lt;p&gt;</code>, et de nouveau <code>&lt;h2&gt;</code> puis <code>&lt;p&gt;</code>."
      ],
      solution: '<h1>Mon carnet</h1>\n\n<h2>Lundi</h2>\n<p>Première leçon de code : les balises HTML.</p>\n\n<h2>Mardi</h2>\n<p>Je continue avec les titres et paragraphes.</p>',
      verifier: function (ctx) {
        const h1 = ctx.doc.querySelectorAll('h1');
        const h2 = ctx.doc.querySelectorAll('h2');
        const p = ctx.doc.querySelectorAll('p');
        if (h1.length !== 1) return { ok: false, message: 'Il faut exactement un <code>&lt;h1&gt;</code> (tu en as ' + h1.length + ').' };
        if (h2.length < 2) return { ok: false, message: 'Il faut deux sous-titres <code>&lt;h2&gt;</code> (tu en as ' + h2.length + ' pour l\'instant).' };
        if (p.length < 2) return { ok: false, message: 'Il faut un paragraphe <code>&lt;p&gt;</code> sous chaque sous-titre (tu en as ' + p.length + ' pour l\'instant).' };
        for (const el of [...h2, ...p]) {
          if (!el.textContent.trim()) return { ok: false, message: 'Une de tes balises est vide — mets du texte dans chacune.' };
        }
        return { ok: true, message: 'Ta page est bien structurée, avec une vraie hiérarchie.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Remets de l\'ordre !</strong> Cette page utilise n\'importe quels niveaux de titre : le titre principal est en <code>&lt;h4&gt;</code>, les sections en <code>&lt;h6&gt;</code> et <code>&lt;h3&gt;</code>. Corrige la hiérarchie : le titre principal en <code>&lt;h1&gt;</code>, les deux sections en <code>&lt;h2&gt;</code>.',
      codeDepart: '<h4>Guide du jardinage</h4>\n\n<h6>Planter au printemps</h6>\n<p>Tomates, courgettes et basilic.</p>\n\n<h3>Récolter en été</h3>\n<p>Le meilleur moment de l\'année.</p>',
      indices: [
        "Les niveaux de titre ne se choisissent pas pour leur taille : ils disent la <strong>hiérarchie</strong> du document.",
        "Le titre principal doit être un h1, ses sous-titres des h2. Attention : chaque changement se fait à <strong>deux</strong> endroits.",
        "Change la balise ouvrante ET la fermante : h4 devient h1, h6 devient h2, h3 devient h2."
      ],
      solution: '<h1>Guide du jardinage</h1>\n\n<h2>Planter au printemps</h2>\n<p>Tomates, courgettes et basilic.</p>\n\n<h2>Récolter en été</h2>\n<p>Le meilleur moment de l\'année.</p>',
      verifier: function (ctx) {
        if (ctx.doc.querySelectorAll('h1').length !== 1) return { ok: false, message: 'Le titre principal « Guide du jardinage » doit devenir un <code>&lt;h1&gt;</code> (pense à changer aussi la balise fermante).' };
        if (ctx.doc.querySelectorAll('h2').length < 2) return { ok: false, message: 'Les deux titres de section doivent devenir des <code>&lt;h2&gt;</code>.' };
        if (ctx.doc.querySelector('h3, h4, h5, h6')) return { ok: false, message: 'Il reste un titre avec un mauvais niveau (h3, h4 ou h6) — la page ne doit contenir que h1 et h2.' };
        return { ok: true, message: 'Hiérarchie propre : un h1 unique, des h2 pour les sections. C\'est aussi ce qui aide Google et les lecteurs d\'écran à comprendre une page.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi.</strong> Écris un petit poème (ou une chanson inventée) : un titre <code>&lt;h1&gt;</code>, puis un paragraphe de 3 lignes séparées par des <code>&lt;br&gt;</code>, puis une ligne de séparation <code>&lt;hr&gt;</code>, puis un paragraphe avec le nom de l\'auteur.',
      codeDepart: '',
      indices: [
        "Deux balises particulières ici : elles ne contiennent rien, donc elles ne se ferment pas.",
        "<code>&lt;br&gt;</code> force un retour à la ligne <em>dans</em> un paragraphe ; <code>&lt;hr&gt;</code> trace un trait de séparation entre deux blocs.",
        "Dans le paragraphe : ligne 1, <code>&lt;br&gt;</code>, ligne 2, <code>&lt;br&gt;</code>, ligne 3 — puis un <code>&lt;hr&gt;</code> seul."
      ],
      solution: '<h1>Ode au code</h1>\n<p>Les balises s\'ouvrent<br>\nLes balises se ferment<br>\nEt la page prend vie.</p>\n<hr>\n<p>Écrit par un futur développeur.</p>',
      verifier: function (ctx) {
        if (!ctx.doc.querySelector('h1')) return { ok: false, message: 'Il manque le titre <code>&lt;h1&gt;</code>.' };
        if (ctx.doc.querySelectorAll('br').length < 2) return { ok: false, message: 'Ton poème doit contenir 3 lignes dans UN paragraphe, séparées par au moins deux <code>&lt;br&gt;</code> (sans balise fermante !).' };
        if (!ctx.doc.querySelector('hr')) return { ok: false, message: 'Il manque la ligne de séparation <code>&lt;hr&gt;</code> avant l\'auteur.' };
        if (ctx.doc.querySelectorAll('p').length < 2) return { ok: false, message: 'Il faut deux paragraphes : le poème, puis l\'auteur après le <code>&lt;hr&gt;</code>.' };
        return { ok: true, message: 'br pour les retours à la ligne, hr pour séparer : deux balises « sans fermante » de plus dans ta boîte à outils.' };
      }
    }
  ]
},

{
  id: 'html-3',
  titre: 'Mettre le texte en valeur',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Dans une phrase, tous les mots ne pèsent pas pareil. « Ne coupe <strong>jamais</strong> le fil rouge » ne veut pas dire la même chose que la même phrase récitée d'un ton plat. À l'oral, tu appuies sur le mot. À l'écrit, il faut une balise pour le dire.</p>
<p>Deux balises s'en chargent, et elles s'utilisent <em>à l'intérieur</em> d'un paragraphe, autour de quelques mots seulement.</p>

<h2>Important, et accentué</h2>
<pre class="bloc-code">&lt;p&gt;Ceci est &lt;strong&gt;très important&lt;/strong&gt; et ceci est &lt;em&gt;nuancé&lt;/em&gt;.&lt;/p&gt;</pre>
<ul>
<li><code>&lt;strong&gt;</code> — ce passage est <strong>important</strong>. Le navigateur l'affiche en gras.</li>
<li><code>&lt;em&gt;</code> — ce passage est <em>accentué</em> (<em>emphasis</em>), celui sur lequel la voix monterait. Il s'affiche en italique.</li>
</ul>
<p>Tu viens aussi de rencontrer une idée qui va te servir partout : les balises <strong>s'imbriquent</strong>, comme des poupées russes. Le <code>&lt;strong&gt;</code> vit à l'intérieur du <code>&lt;p&gt;</code>, et il doit se refermer avant lui.</p>

<h2>Pas à pas</h2>
<p>Ce que le navigateur empile en lisant la ligne ci-dessus :</p>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Où il se trouve</th></tr>
<tr><td>&lt;p&gt;</td><td>dans un paragraphe</td></tr>
<tr><td>Ceci est</td><td>dans un paragraphe — texte normal</td></tr>
<tr><td>&lt;strong&gt;</td><td>dans un paragraphe, <em>et</em> dans un passage important</td></tr>
<tr><td>très important</td><td>affiché en gras, parce qu'on est dans les deux à la fois</td></tr>
<tr><td>&lt;/strong&gt;</td><td>de retour dans le paragraphe seul</td></tr>
<tr><td>&lt;/p&gt;</td><td>plus rien d'ouvert</td></tr>
</table>
<p>On ressort toujours des balises dans l'ordre inverse de celui où on y est entré. C'est la règle des poupées russes : la dernière ouverte est la première fermée.</p>

<h2>Les pièges</h2>
<p><strong>Croire que <code>&lt;b&gt;</code> et <code>&lt;strong&gt;</code> sont deux noms pour la même chose.</strong> À l'écran, ils donnent un résultat <em>rigoureusement identique</em> : du gras. La différence est ailleurs. <code>&lt;strong&gt;</code> dit « ce passage est important », et un lecteur d'écran le fait entendre ; <code>&lt;b&gt;</code> dit seulement « mets ça en gras », sans raison. Même histoire entre <code>&lt;em&gt;</code> et <code>&lt;i&gt;</code>. Prends l'habitude de <code>strong</code> et <code>em</code> : tu ne perds rien, et tu dis quelque chose.</p>
<p><strong>Mettre en valeur un paragraphe entier.</strong> Si tout est important, plus rien ne l'est. Ces balises servent à faire ressortir quelques mots dans une phrase, pas à crier.</p>
<p><strong>Croiser les balises.</strong> <code>&lt;strong&gt;&lt;em&gt;texte&lt;/strong&gt;&lt;/em&gt;</code> ferme le <code>strong</code> alors que le <code>em</code> est encore ouvert. Le navigateur rattrape le coup à sa façon, et tu obtiens parfois un résultat qui déborde sur la suite. Ferme toujours dans l'ordre inverse.</p>

<h2>Dans la vraie vie</h2>
<p>Un avertissement de sécurité, le mot clé d'une consigne, le nom d'un produit dans une description : ce sont des <code>&lt;strong&gt;</code>. Un titre d'œuvre, un mot étranger, une nuance d'ironie : ce sont des <code>&lt;em&gt;</code>. Quand tu hésites, demande-toi ce que tu ferais à l'oral — appuyer, ou juste changer de ton.</p>

<div class="a-retenir">
<ul>
<li><code>&lt;strong&gt;</code> marque ce qui est <strong>important</strong>, <code>&lt;em&gt;</code> ce qui est <em>accentué</em>.</li>
<li>Visuellement, <code>&lt;b&gt;</code> et <code>&lt;i&gt;</code> donnent la même chose — mais ils ne disent rien du sens.</li>
<li>Les balises s'imbriquent, et se ferment dans l'ordre inverse de leur ouverture.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi garder b et i, alors ?</summary>
<p>Parce qu'il existe de vrais cas où le gras ou l'italique ne veulent pas dire « important » : un nom de bateau, un terme latin en biologie, les mots clés d'un article qu'on repère au survol. La règle actuelle est d'écrire <code>&lt;b&gt;</code> et <code>&lt;i&gt;</code> quand on veut l'apparence sans l'insistance. En pratique, tu auras besoin de <code>strong</code> et <code>em</code> dans neuf cas sur dix.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      codeDepart: '',
      consigne: 'Écris un paragraphe <code>&lt;p&gt;</code> qui contient au moins six mots, avec <strong>un mot en <code>&lt;strong&gt;</code></strong> et <em>un autre en <code>&lt;em&gt;</code></em>. Ajoute un titre <code>&lt;h1&gt;</code> au-dessus.',
      indices: [
        "Les deux balises se placent à l'INTÉRIEUR du paragraphe, autour de quelques mots seulement — pas autour du paragraphe entier.",
        "Le modèle est toujours le même : <code>&lt;p&gt;du texte &lt;strong&gt;un mot&lt;/strong&gt; encore du texte&lt;/p&gt;</code>.",
        "<code>&lt;h1&gt;Mon titre&lt;/h1&gt;</code> puis <code>&lt;p&gt;Ne touche &lt;strong&gt;jamais&lt;/strong&gt; au fil &lt;em&gt;rouge&lt;/em&gt;.&lt;/p&gt;</code>"
      ],
      solution: '<h1>Consigne de sécurité</h1>\n<p>Ne coupe <strong>jamais</strong> le fil rouge avant d\'avoir lu la <em>notice</em>.</p>',
      verifier: function (ctx) {
        if (!ctx.doc.querySelector('h1')) return { ok: false, message: 'Il manque le titre <code>&lt;h1&gt;</code> au-dessus du paragraphe.' };
        const p = ctx.doc.querySelector('p');
        if (!p) return { ok: false, message: 'Il manque le paragraphe <code>&lt;p&gt;</code>.' };
        if (p.textContent.trim().split(/\s+/).length < 6) return { ok: false, message: 'Le paragraphe doit faire au moins six mots — là il en a ' + p.textContent.trim().split(/\s+/).filter(Boolean).length + '.' };
        const strong = ctx.doc.querySelector('p strong');
        if (!strong) return { ok: false, message: 'Il faut un mot en <code>&lt;strong&gt;</code>, et il doit être À L\'INTÉRIEUR du paragraphe.' };
        if (!strong.textContent.trim()) return { ok: false, message: 'Ton <code>&lt;strong&gt;</code> est vide : mets un mot entre les deux balises.' };
        const em = ctx.doc.querySelector('p em');
        if (!em) return { ok: false, message: 'Il manque un mot en <code>&lt;em&gt;</code> dans le paragraphe.' };
        if (!em.textContent.trim()) return { ok: false, message: 'Ton <code>&lt;em&gt;</code> est vide : mets un mot entre les deux balises.' };
        if (strong.textContent.trim() === p.textContent.trim()) return { ok: false, message: 'Tu as mis le paragraphe ENTIER en gras. Ces balises servent à faire ressortir quelques mots : si tout est important, plus rien ne l\'est.' };
        return { ok: true, message: 'Et au passage tu viens d\'imbriquer des balises : du strong, dans un p. Ça va te resservir partout.' };
      }
    },
    {
      type: 'html',
      genre: 'bug',
      codeDepart: '<h1>Avis de passage</h1>\n<p>Le facteur est passé <strong>ce matin<strong>. Ton colis t\'attend au <em>bureau de poste</em>.</p>',
      consigne: '<strong>Chasse au bug !</strong> Le gras devait s\'arrêter après « ce matin », mais il dévore toute la fin de la phrase. Une seule balise est fautive : trouve-la et répare-la.',
      indices: [
        "Regarde l'aperçu : à partir d'où le gras commence-t-il, et où aurait-il dû s'arrêter ? Le coupable est juste avant l'endroit où il AURAIT dû finir.",
        "Compare les deux balises qui entourent « ce matin ». Elles sont identiques — or une ouvrante et une fermante ne s'écrivent pas pareil.",
        "La seconde devait être une FERMANTE : <code>&lt;/strong&gt;</code>, avec la barre oblique. Sans elle, c'est un deuxième gras qui s'ouvre et qui ne se referme jamais."
      ],
      solution: '<h1>Avis de passage</h1>\n<p>Le facteur est passé <strong>ce matin</strong>. Ton colis t\'attend au <em>bureau de poste</em>.</p>',
      verifier: function (ctx) {
        const strongs = ctx.doc.querySelectorAll('strong');
        if (!strongs.length) return { ok: false, message: 'Tu as retiré le <code>&lt;strong&gt;</code> au lieu de le réparer : « ce matin » doit rester en gras.' };
        if (strongs.length > 1) return { ok: false, message: 'Il y a encore ' + strongs.length + ' balises <code>&lt;strong&gt;</code> ouvertes. La seconde ne doit pas ouvrir un nouveau gras, mais fermer le premier.' };
        const t = strongs[0].textContent.replace(/\s+/g, ' ').trim();
        if (t !== 'ce matin') return { ok: false, message: 'Le gras doit entourer exactement « ce matin » — il entoure « ' + t.slice(0, 40) + ' ».' };
        if (!ctx.doc.querySelector('em')) return { ok: false, message: 'Au passage, le <code>&lt;em&gt;</code> autour de « bureau de poste » a disparu : remets-le.' };
        return { ok: true, message: 'Une barre oblique oubliée, et tout le reste de la phrase changeait d\'apparence. Tu sauras repérer ça maintenant.' };
      }
    },
    {
      type: 'html',
      genre: 'defi',
      codeDepart: '',
      consigne: '<strong>Défi, de mémoire</strong> (sans remonter !) : écris un petit avertissement — un <code>&lt;h1&gt;</code>, puis <strong>deux</strong> paragraphes. Le premier contient un mot en <code>&lt;strong&gt;</code>, le second un mot en <code>&lt;em&gt;</code>. Chaque balise doit entourer un mot, pas la phrase entière.',
      indices: [
        "Un titre, puis deux paragraphes séparés : deux fois <code>&lt;p&gt;</code>…<code>&lt;/p&gt;</code>, l'un après l'autre.",
        "Dans le premier, une seule paire <code>&lt;strong&gt;</code>…<code>&lt;/strong&gt;</code> autour d'UN mot. Dans le second, une paire <code>&lt;em&gt;</code>…<code>&lt;/em&gt;</code>.",
        "<code>&lt;h1&gt;Attention&lt;/h1&gt;</code>, puis <code>&lt;p&gt;Ne laisse &lt;strong&gt;jamais&lt;/strong&gt; la porte ouverte.&lt;/p&gt;</code>, puis <code>&lt;p&gt;Préviens &lt;em&gt;avant&lt;/em&gt; de partir.&lt;/p&gt;</code>"
      ],
      solution: '<h1>Attention</h1>\n<p>Ne laisse <strong>jamais</strong> la porte ouverte.</p>\n<p>Préviens le gardien <em>avant</em> de partir.</p>',
      verifier: function (ctx) {
        if (!ctx.doc.querySelector('h1')) return { ok: false, message: 'Il manque le titre <code>&lt;h1&gt;</code>.' };
        const ps = ctx.doc.querySelectorAll('p');
        if (ps.length < 2) return { ok: false, message: 'Il faut DEUX paragraphes <code>&lt;p&gt;</code> séparés (tu en as ' + ps.length + ').' };
        const s = ps[0].querySelector('strong');
        if (!s || !s.textContent.trim()) return { ok: false, message: 'Le PREMIER paragraphe doit contenir un mot en <code>&lt;strong&gt;</code>.' };
        const e = ps[1].querySelector('em');
        if (!e || !e.textContent.trim()) return { ok: false, message: 'Le SECOND paragraphe doit contenir un mot en <code>&lt;em&gt;</code>.' };
        if (s.textContent.trim() === ps[0].textContent.trim()) return { ok: false, message: 'Le <code>&lt;strong&gt;</code> entoure tout le paragraphe. Il doit faire ressortir un mot à l\'intérieur d\'une phrase.' };
        if (e.textContent.trim() === ps[1].textContent.trim()) return { ok: false, message: 'Le <code>&lt;em&gt;</code> entoure tout le paragraphe. Il doit faire ressortir un mot à l\'intérieur d\'une phrase.' };
        return { ok: true, message: 'De mémoire, et sans te tromper d\'imbrication. Les listes t\'attendent à la leçon suivante.' };
      }
    }
  ]
},

{
  id: 'html-listes',
  titre: 'Les listes : à puces ou numérotées',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Certaines informations ne forment pas une phrase : des courses à faire, des étapes à suivre, des ingrédients. Les écrire à la suite dans un paragraphe, séparées par des virgules, les rend pénibles à lire et impossibles à parcourir des yeux.</p>
<p>Une liste dit deux choses d'un coup : voici <strong>plusieurs éléments de même nature</strong>, et voici <strong>combien il y en a</strong>. C'est pour ça qu'un lecteur d'écran annonce « liste de quatre éléments » avant de commencer.</p>

<h2>Deux listes, trois balises</h2>
<ul>
<li><code>&lt;ul&gt;</code> — une liste <strong>à puces</strong> (<em>unordered list</em>), quand l'ordre n'a pas d'importance ;</li>
<li><code>&lt;ol&gt;</code> — une liste <strong>numérotée</strong> (<em>ordered list</em>), quand l'ordre compte ;</li>
<li><code>&lt;li&gt;</code> — un élément de la liste (<em>list item</em>), à l'intérieur de l'une ou de l'autre.</li>
</ul>
<pre class="bloc-code">&lt;h2&gt;Ma liste de courses&lt;/h2&gt;
&lt;ul&gt;
  &lt;li&gt;Pain&lt;/li&gt;
  &lt;li&gt;Fromage&lt;/li&gt;
  &lt;li&gt;Pommes&lt;/li&gt;
&lt;/ul&gt;</pre>
<p>Pour une recette, où l'ordre des étapes change tout, le même code avec <code>&lt;ol&gt;</code> donnerait 1, 2, 3 à la place des puces. Tu n'écris jamais les numéros toi-même : le navigateur les calcule, et il les recalcule si tu ajoutes une étape au milieu.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Ce qu'il en fait</th></tr>
<tr><td>&lt;ul&gt;</td><td>« Une liste à puces commence. » Compteur d'éléments à zéro.</td></tr>
<tr><td>&lt;li&gt;Pain&lt;/li&gt;</td><td>Premier élément : une puce, puis le mot.</td></tr>
<tr><td>&lt;li&gt;Fromage&lt;/li&gt;</td><td>Deuxième élément, aligné sous le premier.</td></tr>
<tr><td>&lt;li&gt;Pommes&lt;/li&gt;</td><td>Troisième élément.</td></tr>
<tr><td>&lt;/ul&gt;</td><td>La liste se referme : trois éléments en tout.</td></tr>
</table>

<h2>Des listes dans des listes</h2>
<p>Un <code>&lt;li&gt;</code> peut contenir une liste entière. C'est comme ça qu'on fait un sous-menu :</p>
<pre class="bloc-code">&lt;ul&gt;
  &lt;li&gt;Fruits
    &lt;ul&gt;
      &lt;li&gt;Pommes&lt;/li&gt;
      &lt;li&gt;Poires&lt;/li&gt;
    &lt;/ul&gt;
  &lt;/li&gt;
  &lt;li&gt;Fromage&lt;/li&gt;
&lt;/ul&gt;</pre>
<p>La liste intérieure est <em>dans</em> le <code>&lt;li&gt;</code>, pas entre deux <code>&lt;li&gt;</code>. Remarque le décalage en début de ligne : c'est l'<strong>indentation</strong>. Elle ne change rien à l'affichage, mais elle montre d'un coup d'œil ce qui est à l'intérieur de quoi. Prends-en l'habitude tout de suite.</p>

<h2>Les pièges</h2>
<p><strong>Mettre autre chose qu'un <code>&lt;li&gt;</code> directement dans une liste.</strong> Un <code>&lt;p&gt;</code> ou un titre posé entre deux <code>&lt;li&gt;</code> n'a rien à faire là. Tout ce qui est dans une liste doit être dans un élément de liste.</p>
<p><strong>Écrire des <code>&lt;li&gt;</code> sans liste autour.</strong> Le navigateur est indulgent : il les affichera quand même avec une puce, comme si de rien n'était. Mais le sens est perdu — plus rien ne dit qu'ils forment un ensemble, et un lecteur d'écran n'annoncera aucun nombre d'éléments. Une faute qui ne se voit pas est une faute qui reste.</p>
<p><strong>Numéroter à la main.</strong> Écrire <code>&lt;li&gt;1. Casser les œufs&lt;/li&gt;</code> dans un <code>&lt;ol&gt;</code> affiche « 1. 1. Casser les œufs ». Laisse le navigateur compter.</p>

<h2>Dans la vraie vie</h2>
<p>Les menus de navigation d'un site sont presque toujours des <code>&lt;ul&gt;</code> de liens, remis en forme par le CSS pour s'afficher horizontalement. Tu ne devineras jamais que c'est une liste en regardant la page — mais le code, lui, dit la vérité : ce sont des éléments de même nature.</p>

<div class="a-retenir">
<ul>
<li><code>&lt;ul&gt;</code> pour les puces, <code>&lt;ol&gt;</code> pour les numéros, <code>&lt;li&gt;</code> pour chaque élément des deux.</li>
<li>Les numéros d'un <code>&lt;ol&gt;</code> sont calculés par le navigateur : ne les écris jamais toi-même.</li>
<li>Une liste imbriquée se met <em>dans</em> un <code>&lt;li&gt;</code>, pas entre deux.</li>
<li>L'indentation ne change rien à l'affichage, mais elle rend l'imbrication lisible.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : faire démarrer une liste à 5</summary>
<p>Un <code>&lt;ol&gt;</code> accepte un attribut <code>start</code> : <code>&lt;ol start="5"&gt;</code> commence à 5. Pratique quand une liste est coupée par un paragraphe d'explication et doit reprendre où elle s'était arrêtée. Il existe aussi <code>reversed</code>, pour compter à l'envers — utile pour un classement du dernier au premier.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée une page « Top 3 » : un titre <code>&lt;h1&gt;</code>, un paragraphe contenant un mot en <code>&lt;strong&gt;</code>, puis une liste <strong>numérotée</strong> (<code>&lt;ol&gt;</code>) de 3 éléments (tes 3 films, plats ou jeux préférés).',
      codeDepart: '',
      indices: [
        "Une liste, c’est deux niveaux de balises : le conteneur qui dit quel type de liste, et un élément par ligne.",
        "Numérotée, c’est <code>&lt;ol&gt;</code> (<em>ordered list</em>). Chaque ligne est un <code>&lt;li&gt;</code>.",
        "<code>&lt;ol&gt;</code> autour, et trois <code>&lt;li&gt;</code> à l’intérieur."
      ],
      solution: '<h1>Mon top 3 des plats</h1>\n<p>Voici mes plats <strong>préférés</strong> de tous les temps :</p>\n<ol>\n  <li>Les lasagnes</li>\n  <li>Le couscous</li>\n  <li>La raclette</li>\n</ol>',
      verifier: function (ctx) {
        if (!ctx.doc.querySelector('h1')) return { ok: false, message: 'Il manque le titre <code>&lt;h1&gt;</code>.' };
        const strong = ctx.doc.querySelector('p strong');
        if (!strong || !strong.textContent.trim()) return { ok: false, message: 'Il faut un mot en <code>&lt;strong&gt;</code> à l\'intérieur d\'un paragraphe <code>&lt;p&gt;</code>.' };
        const ol = ctx.doc.querySelector('ol');
        if (!ol) return { ok: false, message: 'Il manque la liste numérotée <code>&lt;ol&gt;</code>. (Attention : <code>&lt;ul&gt;</code> c\'est la liste à puces !)' };
        const lis = ol.querySelectorAll('li');
        if (lis.length < 3) return { ok: false, message: 'Ta liste doit contenir 3 éléments <code>&lt;li&gt;</code> (elle en a ' + lis.length + ').' };
        return { ok: true, message: 'Gras, imbrication, listes : tu progresses vite !' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement.</strong> Transforme ce texte plat en liste à puces (<code>&lt;ul&gt;</code>) de 4 éléments, et mets le mot <code>urgent</code> du premier élément en <code>&lt;strong&gt;</code> et le mot <code>tranquillement</code> du dernier en <code>&lt;em&gt;</code>.',
      codeDepart: '<h1>Ma journée</h1>\n<p>Répondre au mail urgent. Faire les courses. Appeler le garage. Lire tranquillement.</p>',
      indices: [
        "Même structure qu’à l’exercice précédent, mais avec des puces au lieu de numéros.",
        "À puces, c’est <code>&lt;ul&gt;</code> (<em>unordered list</em>). Les <code>&lt;li&gt;</code>, eux, ne changent pas.",
        "Remplace le paragraphe par <code>&lt;ul&gt;</code>, quatre <code>&lt;li&gt;</code>, puis <code>&lt;/ul&gt;</code>."
      ],
      solution: '<h1>Ma journée</h1>\n<ul>\n  <li>Répondre au mail <strong>urgent</strong></li>\n  <li>Faire les courses</li>\n  <li>Appeler le garage</li>\n  <li>Lire <em>tranquillement</em></li>\n</ul>',
      verifier: function (ctx) {
        const ul = ctx.doc.querySelector('ul');
        if (!ul) return { ok: false, message: 'Il faut une liste à puces <code>&lt;ul&gt;</code>.' };
        const lis = ul.querySelectorAll('li');
        if (lis.length < 4) return { ok: false, message: 'La liste doit contenir 4 éléments <code>&lt;li&gt;</code> — un par tâche (elle en a ' + lis.length + ').' };
        if (!ul.querySelector('li strong')) return { ok: false, message: 'Le mot « urgent » doit être en <code>&lt;strong&gt;</code> à l\'intérieur de son <code>&lt;li&gt;</code>.' };
        if (!ul.querySelector('li em')) return { ok: false, message: 'Presque ! Le mot « tranquillement » doit être en <code>&lt;em&gt;</code>.' };
        return { ok: true, message: 'Triple imbrication maîtrisée : du strong, dans un li, dans un ul.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : le menu du restaurant.</strong> De mémoire : un <code>&lt;h1&gt;</code> avec le nom du restaurant, puis deux sections « Entrées » et « Desserts » — chacune avec un <code>&lt;h2&gt;</code> suivi d\'une liste à puces d\'au moins 2 plats.',
      codeDepart: '',
      indices: [
        "Deux sections, chacune avec son sous-titre et sa liste. La structure se répète à l’identique.",
        "Un <code>&lt;h1&gt;</code> pour le nom du restaurant, puis deux fois : un <code>&lt;h2&gt;</code> suivi d’un <code>&lt;ul&gt;</code> de deux <code>&lt;li&gt;</code>.",
        "h1, puis (h2 + ul avec 2 li), puis de nouveau (h2 + ul avec 2 li)."
      ],
      solution: '<h1>Chez Mathéo</h1>\n\n<h2>Entrées</h2>\n<ul>\n  <li>Salade de chèvre chaud</li>\n  <li>Soupe à l\'oignon</li>\n</ul>\n\n<h2>Desserts</h2>\n<ul>\n  <li>Tarte tatin</li>\n  <li>Mousse au chocolat</li>\n</ul>',
      verifier: function (ctx) {
        if (!ctx.doc.querySelector('h1')) return { ok: false, message: 'Il manque le nom du restaurant en <code>&lt;h1&gt;</code>.' };
        const h2 = ctx.doc.querySelectorAll('h2');
        if (h2.length < 2) return { ok: false, message: 'Il faut deux sections <code>&lt;h2&gt;</code> : Entrées et Desserts.' };
        const uls = ctx.doc.querySelectorAll('ul');
        if (uls.length < 2) return { ok: false, message: 'Chaque section doit avoir sa propre liste <code>&lt;ul&gt;</code> (tu en as ' + uls.length + ').' };
        for (const ul of uls) {
          if (ul.querySelectorAll('li').length < 2) return { ok: false, message: 'Chaque liste doit contenir au moins 2 plats <code>&lt;li&gt;</code>.' };
        }
        return { ok: true, message: 'Une vraie structure de page de menu — et tu l\'as écrite sans modèle.' };
      }
    }
  ]
},

{
  id: 'html-4',
  titre: 'Les liens : le cœur du web',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Le web s'appelle « la toile » à cause des liens. Sans eux, chaque page serait une impasse : il faudrait connaître l'adresse exacte de la suivante et la taper à la main. Le lien est ce qui transforme un tas de pages en un réseau qu'on parcourt.</p>
<p>Une seule balise s'en charge : <code>&lt;a&gt;</code>, pour <em>anchor</em>, « ancre ».</p>

<h2>Un lien, et une nouveauté</h2>
<pre class="bloc-code">&lt;a href="https://fr.wikipedia.org"&gt;Visiter Wikipédia&lt;/a&gt;</pre>
<p>Regarde la balise ouvrante : elle contient <code>href="..."</code>. C'est un <strong>attribut</strong> — une information donnée à la balise, en plus de son contenu. Un attribut s'écrit toujours dans la balise ouvrante, sous la forme <code>nom="valeur"</code>.</p>
<ul>
<li><code>href</code> (<em>hypertext reference</em>) dit <strong>où va</strong> le lien ;</li>
<li>le texte entre <code>&lt;a&gt;</code> et <code>&lt;/a&gt;</code> est ce qui s'affiche et se clique.</li>
</ul>
<p>Les attributs ne sont pas réservés aux liens : presque toutes les balises en acceptent, et tu en croiseras beaucoup. C'est une notion à retenir pour de bon.</p>

<h2>Deux sortes d'adresses</h2>
<ul>
<li><strong>Complète</strong> : <code>href="https://fr.wikipedia.org"</code> — elle commence par <code>https://</code> et désigne un site, n'importe où dans le monde.</li>
<li><strong>Relative</strong> : <code>href="page2.html"</code> — pas de <code>https://</code>, donc le navigateur cherche un fichier <em>à côté</em> de la page actuelle. C'est ainsi qu'on relie entre elles les pages d'un même site.</li>
</ul>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Ce qu'il en fait</th></tr>
<tr><td>&lt;a</td><td>« Un lien commence. » Il s'attend maintenant à des attributs.</td></tr>
<tr><td>href="https://fr.wikipedia.org"</td><td>Il note la destination, sans rien afficher.</td></tr>
<tr><td>&gt;</td><td>Fin de la balise ouvrante : ce qui suit sera du contenu.</td></tr>
<tr><td>Visiter Wikipédia</td><td>Le texte affiché, souligné et coloré, et cliquable.</td></tr>
<tr><td>&lt;/a&gt;</td><td>Le lien s'arrête : le texte suivant redevient ordinaire.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Mettre l'adresse comme texte au lieu de la mettre dans <code>href</code>.</strong> <code>&lt;a&gt;https://fr.wikipedia.org&lt;/a&gt;</code> affiche bien l'adresse, mais ne mène nulle part : sans <code>href</code>, il n'y a pas de destination. Le modèle à retenir tient en une ligne : <code>&lt;a href="adresse"&gt;texte cliquable&lt;/a&gt;</code>.</p>
<p><strong>Oublier les guillemets quand la valeur contient une espace.</strong> C'est plus subtil qu'il n'y paraît. <code>href=page2.html</code> fonctionne : le navigateur rajoute les guillemets tout seul. Mais <code>href=ma page.html</code> casse — il garde <code>href="ma"</code> et transforme <code>page.html</code> en un second attribut qui ne veut rien dire. Mets toujours les guillemets : tu n'auras pas à te demander si ce cas-ci en a besoin.</p>
<p><strong>Oublier le <code>https://</code> pour un vrai site.</strong> <code>href="exemple.com"</code> ne mène pas au site : sans les <code>https://</code>, le navigateur comprend « un fichier nommé exemple.com, à côté de ma page ». Le lien existe, il est cliquable, et il tombe sur une page introuvable.</p>

<h2>Dans la vraie vie</h2>
<p>Le menu d'un site, le bouton « En savoir plus », un renvoi au milieu d'un article : tous sont des <code>&lt;a&gt;</code>. Un soin compte plus que les autres — <strong>le texte du lien doit décrire sa destination</strong>. « Cliquez ici » répété dix fois sur une page ne dit rien à qui l'entend lire à voix haute, hors contexte. « Lire le mode d'emploi » dit tout.</p>

<div class="a-retenir">
<ul>
<li><code>&lt;a href="adresse"&gt;texte&lt;/a&gt;</code> : la destination est dans l'attribut, le texte cliquable est le contenu.</li>
<li>Un attribut s'écrit <code>nom="valeur"</code> dans la balise ouvrante — et beaucoup de balises en acceptent.</li>
<li>Une adresse sans <code>https://</code> désigne un fichier voisin, pas un site.</li>
<li>Le texte du lien doit dire où il mène, même lu tout seul.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : ouvrir dans un nouvel onglet</summary>
<p>L'attribut <code>target="_blank"</code> ouvre le lien dans un nouvel onglet. À utiliser avec parcimonie : beaucoup de gens préfèrent décider eux-mêmes, et le bouton « Retour » ne fonctionne plus dans un onglet qui vient de s'ouvrir. L'usage raisonnable est de le réserver aux cas où quitter la page ferait perdre quelque chose — un formulaire à moitié rempli, par exemple.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée un paragraphe contenant un lien vers <code>https://fr.wikipedia.org</code> dont le texte cliquable est <code>Mon site préféré</code>. (Dans l\'aperçu, le clic ne chargera pas la vraie page — c\'est normal, on vérifie juste ton code.)',
      codeDepart: '<p>\n\n</p>',
      indices: [
        "Un lien a deux parties distinctes : où il mène, et ce qu’on lit à l’écran. Elles ne sont pas au même endroit.",
        "L’adresse va dans l’attribut <code>href</code>, à l’intérieur de la balise ouvrante. Le texte cliquable, lui, va entre les deux balises.",
        "<code>&lt;a href=\"l’adresse\"&gt;le texte&lt;/a&gt;</code> — sans oublier les guillemets autour de l’adresse."
      ],
      solution: '<p>\n  <a href="https://fr.wikipedia.org">Mon site préféré</a>\n</p>',
      verifier: function (ctx) {
        const a = ctx.doc.querySelector('a');
        if (!a) return { ok: false, message: 'Je ne trouve pas de balise <code>&lt;a&gt;</code>.' };
        const href = a.getAttribute('href') || '';
        if (!href) return { ok: false, message: 'Ta balise <code>&lt;a&gt;</code> n\'a pas d\'attribut <code>href</code>. Ajoute-le dans la balise ouvrante : <code>&lt;a href="..."&gt;</code>' };
        if (!href.replace(/\/$/, '').endsWith('fr.wikipedia.org')) return { ok: false, message: 'Le <code>href</code> doit contenir l\'adresse <code>https://fr.wikipedia.org</code> (actuellement : <code>' + href.replace(/</g, '&lt;') + '</code>).' };
        if (a.textContent.trim().toLowerCase() !== 'mon site préféré') return { ok: false, message: 'Le texte cliquable doit être exactement « Mon site préféré ».' };
        return { ok: true, message: 'Tu sais créer des liens — et tu as découvert les attributs, une notion essentielle.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : le menu de navigation.</strong> Crée une liste à puces de <strong>3 liens</strong> (un par <code>&lt;li&gt;</code>) vers trois sites de ton choix — chaque lien doit avoir un <code>href</code> qui commence par <code>https://</code> et un texte cliquable.',
      codeDepart: '<h1>Mes sites favoris</h1>\n<ul>\n\n</ul>',
      indices: [
        "Une liste de liens, c’est deux structures emboîtées : la liste, et un lien dans chaque élément.",
        "Le lien complet se place <strong>à l’intérieur</strong> du <code>&lt;li&gt;</code>, pas à côté.",
        "<code>&lt;li&gt;&lt;a href=\"https://…\"&gt;Nom du site&lt;/a&gt;&lt;/li&gt;</code>, trois fois."
      ],
      solution: '<h1>Mes sites favoris</h1>\n<ul>\n  <li><a href="https://fr.wikipedia.org">Wikipédia</a></li>\n  <li><a href="https://www.youtube.com">YouTube</a></li>\n  <li><a href="https://developer.mozilla.org">MDN</a></li>\n</ul>',
      verifier: function (ctx) {
        const liens = ctx.doc.querySelectorAll('ul li a');
        if (liens.length < 3) return { ok: false, message: 'Il faut 3 liens, chacun DANS un <code>&lt;li&gt;</code> de la liste (tu en as ' + liens.length + ').' };
        for (const a of liens) {
          const href = a.getAttribute('href') || '';
          if (!href.startsWith('https://')) return { ok: false, message: 'Chaque <code>href</code> doit commencer par <code>https://</code> (problème sur : « ' + (a.textContent.trim() || 'lien sans texte') + ' »).' };
          if (!a.textContent.trim()) return { ok: false, message: 'Un de tes liens n\'a pas de texte cliquable.' };
        }
        return { ok: true, message: 'Tu viens de construire un menu de navigation — la colonne de gauche de ce logiciel fonctionne exactement pareil.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Dans <code>&lt;a href="https://exemple.com"&gt;Cliquez ici&lt;/a&gt;</code>, que voit le visiteur à l\'écran ?',
      choix: [
        'https://exemple.com',
        'Cliquez ici',
        'a href',
        'Rien du tout'
      ],
      bonne: 1,
      explication: 'Le visiteur voit le <strong>contenu</strong> de la balise (« Cliquez ici »), cliquable. L\'adresse dans <code>href</code> reste invisible : c\'est la destination du clic.',
      aides: [
        'L\'adresse est cachée dans l\'attribut <code>href</code> — elle définit la destination, mais ne s\'affiche pas.',
        '',
        'Les balises et attributs ne s\'affichent jamais : le navigateur les lit pour savoir quoi faire, et montre seulement le contenu.',
        'Le contenu entre la balise ouvrante et la fermante s\'affiche bel et bien.'
      ]
    }
  ]
},

{
  id: 'html-5',
  titre: 'Les images',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une page sans image, c'est un mode d'emploi sans schéma. Mais une image n'est pas du texte : elle vit dans un fichier séparé, quelque part. La balise <code>&lt;img&gt;</code> ne contient donc pas l'image — elle dit <strong>où aller la chercher</strong>.</p>
<p>C'est une différence importante avec tout ce que tu as vu jusqu'ici. Un <code>&lt;p&gt;</code> entoure son texte ; un <code>&lt;img&gt;</code> n'entoure rien du tout.</p>

<h2>Deux attributs, et pas de fermante</h2>
<pre class="bloc-code">&lt;img src="chat.jpg" alt="Un chat roux endormi"&gt;</pre>
<ul>
<li><code>src</code> (<em>source</em>) — le chemin du fichier image ;</li>
<li><code>alt</code> (<em>alternative</em>) — une description de l'image en quelques mots.</li>
</ul>
<p>Comme <code>&lt;br&gt;</code>, la balise <code>&lt;img&gt;</code> n'a <strong>pas de balise fermante</strong> : elle n'a pas de contenu à entourer, tout est dans ses attributs.</p>

<h2>À quoi sert vraiment le alt</h2>
<p>Le texte alternatif n'est pas une formalité. Il remplace l'image dans trois situations bien réelles :</p>
<ul>
<li>l'image ne charge pas — mauvais chemin, connexion coupée — et son texte s'affiche à la place ;</li>
<li>un lecteur d'écran lit la page à voix haute : il lit le <code>alt</code>, et sans lui il dit juste « image », ce qui n'apprend rien ;</li>
<li>un moteur de recherche cherche à savoir ce que montre l'image.</li>
</ul>
<p>Un bon <code>alt</code> décrit ce qu'on verrait : « Un chat roux endormi », pas « photo » ni « image1 ». À l'inverse, si l'image est purement décorative, un <code>alt=""</code> vide est le bon choix : il dit « il n'y a rien à annoncer ici », et le lecteur d'écran passe son chemin.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Ce qu'il en fait</th></tr>
<tr><td>&lt;img</td><td>« Une image. » Il réserve une place dans la page.</td></tr>
<tr><td>src="chat.jpg"</td><td>Il part chercher le fichier, sans attendre la suite.</td></tr>
<tr><td>alt="Un chat roux endormi"</td><td>Il met la description de côté, au cas où.</td></tr>
<tr><td>&gt;</td><td>La balise est finie. Pas de fermante à attendre.</td></tr>
<tr><td>le fichier arrive</td><td>L'image s'affiche. S'il n'arrive pas, c'est le <code>alt</code> qui apparaît.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Oublier les guillemets autour du <code>alt</code>.</strong> C'est le piège le plus sournois de cette leçon, parce qu'une description fait presque toujours plusieurs mots. Écris <code>alt=Un chat roux</code> et le navigateur ne garde que <code>alt="Un"</code> : il prend <code>chat</code> et <code>roux</code> pour deux attributs séparés, qu'il ajoute sans rien dire. Ta description est amputée à son premier mot, et aucun message ne te prévient.</p>
<p><strong>Se tromper de chemin.</strong> Si le fichier n'est pas là où <code>src</code> l'indique, il ne se passe rien de spectaculaire : un espace vide, ou le texte du <code>alt</code>. Vérifie l'orthographe exacte du nom, extension comprise — et attention, <code>Chat.jpg</code> et <code>chat.jpg</code> peuvent être deux fichiers différents.</p>
<p><strong>Écrire un <code>alt</code> qui ne décrit rien.</strong> <code>alt="image"</code> est pire que rien : le lecteur d'écran l'annonce déjà comme une image, alors il dira « image image ».</p>

<h2>Dans la vraie vie</h2>
<p>Les photos d'un article, les logos, les illustrations d'une boutique : toutes passent par <code>&lt;img&gt;</code>. Le <code>alt</code> est d'ailleurs une obligation légale pour beaucoup de sites publics en France — il fait partie des règles d'accessibilité.</p>

<div class="a-retenir">
<ul>
<li><code>&lt;img src="fichier" alt="description"&gt;</code> : pas de contenu, donc pas de balise fermante.</li>
<li>Le <code>alt</code> décrit l'image ; vide (<code>alt=""</code>) si elle est purement décorative.</li>
<li>Sans guillemets, une description de plusieurs mots est coupée après le premier, en silence.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les images de ce cours</summary>
<p>Dans les exercices, les images sont écrites directement dans le code, sous la forme d'une longue suite de caractères qui commence par <code>data:image/...</code>. C'est le fichier lui-même, encodé en texte. On le fait rarement en vrai — ça alourdit la page — mais ici ça permet au cours de fonctionner entièrement hors ligne, sans aucun fichier à télécharger.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le code contient une image sans attribut <code>alt</code> — ajoute-lui une description (par exemple <code>Un carré violet</code>). Ajoute ensuite un titre <code>&lt;h1&gt;</code> au-dessus de l\'image.',
      codeDepart: '<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Crect width=\'120\' height=\'120\' rx=\'16\' fill=\'%237a5df5\'/%3E%3C/svg%3E">',
      indices: [
        "Une image ne se ferme pas : tout ce qui la concerne tient dans ses attributs.",
        "<code>alt</code> décrit l’image pour qui ne la voit pas — lecteur d’écran, ou image qui ne charge pas. Il s’ajoute après le <code>src</code>.",
        "<code>&lt;img src=\"…\" alt=\"ta description\"&gt;</code>"
      ],
      solution: '<h1>Ma galerie</h1>\n<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Crect width=\'120\' height=\'120\' rx=\'16\' fill=\'%237a5df5\'/%3E%3C/svg%3E" alt="Un carré violet">',
      verifier: function (ctx) {
        const img = ctx.doc.querySelector('img');
        if (!img) return { ok: false, message: 'L\'image a disparu ! Clique sur « Recommencer » pour repartir du code de départ.' };
        const alt = img.getAttribute('alt');
        if (alt === null) return { ok: false, message: 'Ton image n\'a pas encore d\'attribut <code>alt</code>. Ajoute <code>alt="..."</code> dans la balise, après le <code>src</code>.' };
        if (!alt.trim()) return { ok: false, message: 'Ton attribut <code>alt</code> est vide — écris une description entre les guillemets.' };
        if (!ctx.doc.querySelector('h1')) return { ok: false, message: 'Le alt est bon ! Il manque encore le titre <code>&lt;h1&gt;</code> au-dessus de l\'image.' };
        return { ok: true, message: 'Et en plus, ta page est accessible aux personnes malvoyantes.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : la galerie.</strong> Voici deux images (un carré violet et un rond vert). Construis une galerie : un <code>&lt;h1&gt;</code>, puis chaque image précédée d\'un <code>&lt;h2&gt;</code> qui la décrit. Les deux images doivent avoir un <code>alt</code> rempli.',
      codeDepart: '<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Crect width=\'100\' height=\'100\' rx=\'12\' fill=\'%237a5df5\'/%3E%3C/svg%3E">\n<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'48\' fill=\'%2322c55e\'/%3E%3C/svg%3E">',
      indices: [
        "Deux images, chacune présentée par son propre sous-titre. La structure se répète.",
        "Un <code>&lt;h1&gt;</code>, puis deux fois : un <code>&lt;h2&gt;</code> suivi d’une image. Chaque image a besoin de son <code>alt</code>.",
        "<code>&lt;h2&gt;</code>Le carré<code>&lt;/h2&gt;</code> + l’image, puis <code>&lt;h2&gt;</code>Le rond<code>&lt;/h2&gt;</code> + l’autre."
      ],
      solution: '<h1>Ma galerie de formes</h1>\n\n<h2>Le carré violet</h2>\n<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Crect width=\'100\' height=\'100\' rx=\'12\' fill=\'%237a5df5\'/%3E%3C/svg%3E" alt="Un carré violet aux coins arrondis">\n\n<h2>Le rond vert</h2>\n<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'48\' fill=\'%2322c55e\'/%3E%3C/svg%3E" alt="Un rond vert">',
      verifier: function (ctx) {
        if (!ctx.doc.querySelector('h1')) return { ok: false, message: 'Il manque le titre <code>&lt;h1&gt;</code> de la galerie.' };
        const h2 = ctx.doc.querySelectorAll('h2');
        if (h2.length < 2) return { ok: false, message: 'Chaque image doit être précédée d\'un <code>&lt;h2&gt;</code> qui la décrit (il en faut 2).' };
        const imgs = ctx.doc.querySelectorAll('img');
        if (imgs.length < 2) return { ok: false, message: 'Il faut garder les deux images du code de départ.' };
        for (const img of imgs) {
          if (!(img.getAttribute('alt') || '').trim()) return { ok: false, message: 'Une des images n\'a pas d\'attribut <code>alt</code> rempli.' };
        }
        return { ok: true, message: 'Structure + images + accessibilité : ta galerie est complète.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> À quoi sert l\'attribut <code>alt</code> d\'une image ?',
      choix: [
        'À donner un titre qui s\'affiche au-dessus de l\'image',
        'À décrire l\'image : affiché si elle ne charge pas, lu à voix haute pour les personnes malvoyantes',
        'À indiquer l\'adresse du fichier image',
        'À régler la taille de l\'image'
      ],
      bonne: 1,
      explication: 'Le <code>alt</code> est le filet de sécurité ET l\'accessibilité de l\'image. Les pros le remplissent systématiquement — toi aussi désormais.',
      aides: [
        'Rien ne s\'affiche au-dessus : le alt est invisible tant que l\'image charge correctement.',
        '',
        'L\'adresse du fichier, c\'est le rôle de <code>src</code>.',
        'La taille se règle avec le CSS (ou les attributs width/height) — pas avec alt.'
      ]
    }
  ]
},

{
  id: 'html-6',
  titre: 'Structurer une vraie page',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Jusqu'ici tu as écrit des morceaux de page : un titre, des paragraphes, une liste. Ça suffit pour apprendre, mais un vrai fichier <code>.html</code> a besoin d'un <strong>squelette</strong> autour, qui répond à des questions que ton contenu ne pose jamais : quelle langue parle cette page ? quel titre afficher dans l'onglet ? comment lire les accents ?</p>

<h2>Le squelette officiel</h2>
<pre class="bloc-code">&lt;!DOCTYPE html&gt;
&lt;html lang="fr"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;title&gt;Le titre de l'onglet&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  ... tout le contenu visible va ici ...
&lt;/body&gt;
&lt;/html&gt;</pre>
<ul>
<li><code>&lt;!DOCTYPE html&gt;</code> — « ceci est du HTML moderne ». Sans lui, le navigateur bascule dans un mode de compatibilité ancien et ta mise en page peut se décaler sans raison apparente ;</li>
<li><code>lang="fr"</code> — la langue, utilisée par les lecteurs d'écran pour choisir la bonne prononciation ;</li>
<li><code>&lt;head&gt;</code> — la partie <strong>invisible</strong> : titre de l'onglet, réglages, lien vers le CSS ;</li>
<li><code>&lt;meta charset="UTF-8"&gt;</code> — l'alphabet. C'est lui qui fait que « été » s'affiche « été » et non en caractères bizarres ;</li>
<li><code>&lt;body&gt;</code> — tout ce qui est <strong>visible</strong>.</li>
</ul>
<div class="info">Dans les exercices de ce cours, ce squelette est ajouté pour toi : c'est pour ça que tu peux écrire directement un <code>&lt;h1&gt;</code>. Dès que tu créeras tes propres fichiers, commence par lui.</div>

<h2>Découper le corps en zones</h2>
<p>À l'intérieur du <code>&lt;body&gt;</code>, on regroupe le contenu par grandes zones. Ces balises ne changent presque rien à l'écran : elles servent à <strong>dire ce qu'est chaque bloc</strong>.</p>
<ul>
<li><code>&lt;header&gt;</code> — l'en-tête : logo, titre du site ;</li>
<li><code>&lt;nav&gt;</code> — le menu de navigation ;</li>
<li><code>&lt;main&gt;</code> — le contenu principal, celui pour lequel on est venu ;</li>
<li><code>&lt;footer&gt;</code> — le pied de page : contact, mentions ;</li>
<li><code>&lt;div&gt;</code> — une boîte générique, quand aucune des précédentes ne convient.</li>
</ul>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>&lt;!DOCTYPE html&gt;</td><td>Le navigateur choisit son mode de rendu moderne.</td></tr>
<tr><td>&lt;head&gt;</td><td>Il entre dans les réglages. Rien de tout ça ne s'affichera.</td></tr>
<tr><td>&lt;meta charset="UTF-8"&gt;</td><td>Il sait maintenant décoder les accents du reste du fichier.</td></tr>
<tr><td>&lt;title&gt;</td><td>Il écrit le titre dans l'onglet, pas dans la page.</td></tr>
<tr><td>&lt;body&gt;</td><td>Tout ce qui suit sera affiché.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Mettre du contenu visible dans le <code>&lt;head&gt;</code>.</strong> Un paragraphe écrit là n'apparaîtra pas, ou le navigateur le rattrapera en le déplaçant tout seul dans le <code>&lt;body&gt;</code>. Dans les deux cas tu ne vois pas ce que tu attends. Règle simple : si ça doit se voir, c'est dans le <code>body</code>.</p>
<p><strong>Confondre <code>&lt;title&gt;</code> et <code>&lt;h1&gt;</code>.</strong> Le premier nomme l'onglet et le favori ; le second est le titre affiché dans la page. Une page sérieuse a les deux, et ils se ressemblent souvent — mais ce ne sont pas les mêmes balises, ni au même endroit.</p>
<p><strong>Mettre des <code>&lt;div&gt;</code> partout.</strong> Un <code>&lt;div&gt;</code> ne dit rien : c'est une boîte, point. Quand une balise existe pour le rôle du bloc — <code>header</code>, <code>nav</code>, <code>main</code>, <code>footer</code> — prends-la. Tu y gagnes un code lisible et une page que les lecteurs d'écran savent parcourir.</p>

<h2>Dans la vraie vie</h2>
<p>Fais <strong>Ctrl+U</strong> sur n'importe quel site : tu retrouveras ce squelette, à l'identique, sous des couches de code généré. Les balises de zones, elles, sont ce qui permet au mode « lecture » d'un navigateur de deviner quel bloc est l'article et lesquels sont la décoration.</p>

<div class="a-retenir">
<ul>
<li>Un vrai fichier HTML commence par <code>&lt;!DOCTYPE html&gt;</code>, puis <code>&lt;html&gt;</code> contenant <code>&lt;head&gt;</code> et <code>&lt;body&gt;</code>.</li>
<li>Le <code>head</code> règle ; le <code>body</code> montre.</li>
<li><code>header</code>, <code>nav</code>, <code>main</code> et <code>footer</code> nomment les zones ; <code>div</code> ne sert que par défaut.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : que fait vraiment le DOCTYPE ?</summary>
<p>Il ne décrit rien du contenu. C'est un vestige : dans les années 1990, les navigateurs ont accumulé des comportements incompatibles entre eux, et il a fallu un moyen de dire « applique les règles modernes, pas les vieilles ». La seule chose qui compte aujourd'hui est sa présence — <code>&lt;!DOCTYPE html&gt;</code>, rien de plus. Sans lui, le navigateur active le « mode compatibilité », où certaines largeurs se calculent autrement.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Construis une page avec les 3 zones : un <code>&lt;header&gt;</code> contenant un <code>&lt;h1&gt;</code>, un <code>&lt;main&gt;</code> contenant un paragraphe, et un <code>&lt;footer&gt;</code> contenant aussi un paragraphe (par exemple ton nom).',
      codeDepart: '<header>\n\n</header>\n\n<main>\n\n</main>\n\n<footer>\n\n</footer>',
      indices: [
        "Ces trois balises ne changent rien à l’apparence : elles disent le <strong>rôle</strong> de chaque zone.",
        "Le <code>&lt;header&gt;</code> porte l’en-tête, le <code>&lt;main&gt;</code> le contenu principal, le <code>&lt;footer&gt;</code> le pied de page. Chacun doit contenir quelque chose.",
        "Un <code>&lt;h1&gt;</code> dans le header, un <code>&lt;p&gt;</code> dans le main, un <code>&lt;p&gt;</code> dans le footer."
      ],
      solution: '<header>\n  <h1>Mon site</h1>\n</header>\n\n<main>\n  <p>Bienvenue sur ma page d\'accueil.</p>\n</main>\n\n<footer>\n  <p>Créé par moi, avec mes propres mains.</p>\n</footer>',
      verifier: function (ctx) {
        if (!ctx.doc.querySelector('header h1')) return { ok: false, message: 'Il faut un <code>&lt;h1&gt;</code> à l\'intérieur du <code>&lt;header&gt;</code>.' };
        if (!ctx.doc.querySelector('main p')) return { ok: false, message: 'Il faut un paragraphe <code>&lt;p&gt;</code> à l\'intérieur du <code>&lt;main&gt;</code>.' };
        if (!ctx.doc.querySelector('footer p')) return { ok: false, message: 'Il faut un paragraphe <code>&lt;p&gt;</code> à l\'intérieur du <code>&lt;footer&gt;</code>.' };
        return { ok: true, message: 'Ta page a maintenant la structure d\'un vrai site professionnel.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement.</strong> Ajoute un menu de navigation dans le header : une balise <code>&lt;nav&gt;</code> (après le h1, toujours dans le header) contenant une liste <code>&lt;ul&gt;</code> de 2 liens.',
      codeDepart: '<header>\n  <h1>Mon site</h1>\n\n</header>\n\n<main>\n  <p>Bienvenue sur ma page d\'accueil.</p>\n</main>',
      indices: [
        "Le menu fait partie de l’en-tête : il se place donc <em>dans</em> le header, pas à côté.",
        "Quatre niveaux s’emboîtent : le <code>&lt;nav&gt;</code> qui annonce la navigation, un <code>&lt;ul&gt;</code>, des <code>&lt;li&gt;</code>, et un lien dans chacun.",
        "<code>&lt;nav&gt;&lt;ul&gt;&lt;li&gt;&lt;a href=\"…\"&gt;Accueil&lt;/a&gt;&lt;/li&gt;…&lt;/ul&gt;&lt;/nav&gt;</code>"
      ],
      solution: '<header>\n  <h1>Mon site</h1>\n  <nav>\n    <ul>\n      <li><a href="index.html">Accueil</a></li>\n      <li><a href="contact.html">Contact</a></li>\n    </ul>\n  </nav>\n</header>\n\n<main>\n  <p>Bienvenue sur ma page d\'accueil.</p>\n</main>',
      verifier: function (ctx) {
        const nav = ctx.doc.querySelector('header nav');
        if (!nav) return { ok: false, message: 'Il faut une balise <code>&lt;nav&gt;</code> à l\'intérieur du <code>&lt;header&gt;</code>.' };
        const liens = nav.querySelectorAll('ul li a');
        if (liens.length < 2) return { ok: false, message: 'Le nav doit contenir une liste <code>&lt;ul&gt;</code> avec 2 liens (un <code>&lt;a&gt;</code> dans chaque <code>&lt;li&gt;</code>).' };
        return { ok: true, message: 'header > nav > ul > li > a : cinq niveaux d\'imbrication, et c\'est la structure exacte de millions de sites réels.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Dans le squelette d\'une page HTML, où va le contenu <strong>visible</strong> à l\'écran ?',
      choix: [
        'Dans le <code>&lt;head&gt;</code>',
        'Dans le <code>&lt;body&gt;</code>',
        'Dans le <code>&lt;!DOCTYPE html&gt;</code>',
        'Dans le <code>&lt;title&gt;</code>'
      ],
      bonne: 1,
      explication: '<code>head</code> = les coulisses (réglages, titre d\'onglet), <code>body</code> = la scène (tout ce qui s\'affiche). Moyen mnémotechnique : le corps (<em>body</em>) se voit, la tête pense.',
      aides: [
        'Le <code>head</code> contient la partie INVISIBLE : titre d\'onglet, réglages, liens CSS.',
        '',
        'Le DOCTYPE est une simple déclaration en première ligne — il ne contient rien.',
        'Le <code>title</code> définit le texte de l\'onglet du navigateur, pas le contenu de la page.'
      ]
    }
  ]
},

{
  id: 'html-7',
  titre: 'Les tableaux',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Des horaires, des prix, un classement, des résultats : certaines informations ont deux dimensions. Chaque ligne est un cas, chaque colonne une caractéristique, et c'est le <em>croisement</em> des deux qui porte le sens. « Lyon, 520 000 » ne veut rien dire sans la colonne qui annonce « Habitants ».</p>
<p>Une liste ne sait pas faire ça : elle n'a qu'une dimension. D'où le tableau.</p>

<h2>Quatre balises emboîtées</h2>
<ul>
<li><code>&lt;table&gt;</code> — le tableau entier ;</li>
<li><code>&lt;tr&gt;</code> — une ligne (<em>table row</em>) ;</li>
<li><code>&lt;th&gt;</code> — une cellule d'<strong>en-tête</strong> (<em>table header</em>), affichée en gras ;</li>
<li><code>&lt;td&gt;</code> — une cellule ordinaire (<em>table data</em>).</li>
</ul>
<pre class="bloc-code">&lt;table&gt;
  &lt;tr&gt;
    &lt;th&gt;Ville&lt;/th&gt;
    &lt;th&gt;Habitants&lt;/th&gt;
  &lt;/tr&gt;
  &lt;tr&gt;
    &lt;td&gt;Paris&lt;/td&gt;
    &lt;td&gt;2 100 000&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>
<p>La logique se lit de l'extérieur vers l'intérieur : un tableau contient des <strong>lignes</strong>, et chaque ligne contient des <strong>cellules</strong>. Il n'existe aucune balise « colonne » : les colonnes apparaissent toutes seules, parce que chaque ligne a ses cellules dans le même ordre.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Ce qu'il en fait</th></tr>
<tr><td>&lt;table&gt;</td><td>Il prépare une grille, encore vide.</td></tr>
<tr><td>&lt;tr&gt;</td><td>Première ligne.</td></tr>
<tr><td>&lt;th&gt;Ville&lt;/th&gt;</td><td>Première cellule, en gras : voilà la colonne 1.</td></tr>
<tr><td>&lt;th&gt;Habitants&lt;/th&gt;</td><td>Deuxième cellule : la grille fera donc deux colonnes.</td></tr>
<tr><td>&lt;tr&gt;&lt;td&gt;Paris&lt;/td&gt;…</td><td>Deuxième ligne, dont les cellules s'alignent sous les précédentes.</td></tr>
</table>
<p>C'est la <em>première</em> ligne qui fixe le nombre de colonnes. Les suivantes viennent s'y ranger.</p>

<h2>Les pièges</h2>
<p><strong>Un nombre de cellules qui varie d'une ligne à l'autre.</strong> Si une ligne a deux cellules et la suivante trois, le navigateur ne proteste pas : il élargit la grille et laisse un trou. Le tableau s'affiche de travers sans qu'aucun message n'apparaisse. Compte tes <code>&lt;td&gt;</code>.</p>
<p><strong>Mettre du <code>&lt;td&gt;</code> partout, y compris en en-tête.</strong> Visuellement, tu perds juste le gras. Mais un <code>&lt;th&gt;</code> dit « cette cellule nomme sa colonne », et c'est ce qui permet à un lecteur d'écran d'annoncer « Habitants : 520 000 » au lieu de lâcher un nombre isolé. Dans un tableau de données, la première ligne est faite de <code>&lt;th&gt;</code>.</p>
<p><strong>Se servir d'un tableau pour mettre en page.</strong> C'était la technique des années 2000, faute de mieux. Aujourd'hui c'est le CSS qui place les blocs. Un tableau sert à présenter des <em>données</em>, pas à aligner un menu à côté d'un article.</p>
<div class="astuce">Sans CSS, un tableau n'a aucune bordure : il paraît nu, et c'est normal. L'apparence viendra au module suivant.</div>

<h2>Dans la vraie vie</h2>
<p>Les horaires d'une gare, un comparatif de forfaits, le relevé d'un compte bancaire, le tableau des scores d'un championnat. Partout où tu croises des lignes et des colonnes de données réelles, c'est un <code>&lt;table&gt;</code> en dessous.</p>

<div class="a-retenir">
<ul>
<li>Un <code>&lt;table&gt;</code> contient des lignes <code>&lt;tr&gt;</code>, qui contiennent des cellules <code>&lt;th&gt;</code> ou <code>&lt;td&gt;</code>.</li>
<li>Il n'y a pas de balise « colonne » : les colonnes naissent de l'ordre des cellules.</li>
<li><code>&lt;th&gt;</code> pour les en-têtes — c'est du sens, pas seulement du gras.</li>
<li>Un tableau présente des données ; la mise en page, c'est l'affaire du CSS.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la ligne que tu n'as pas écrite</summary>
<p>Si tu inspectes un tableau dans ton navigateur, tu y verras une balise <code>&lt;tbody&gt;</code> que tu n'as jamais tapée. Le navigateur l'ajoute toujours, parce que la norme prévoit de séparer l'en-tête (<code>&lt;thead&gt;</code>), le corps (<code>&lt;tbody&gt;</code>) et le pied (<code>&lt;tfoot&gt;</code>) d'un tableau. Tu peux les écrire toi-même sur un grand tableau — ça permet, entre autres, de garder l'en-tête visible quand on fait défiler.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée un tableau de 3 lignes : une ligne d\'en-têtes avec deux <code>&lt;th&gt;</code> (<code>Jour</code> et <code>Activité</code>), puis deux lignes de données avec deux <code>&lt;td&gt;</code> chacune.',
      codeDepart: '<table>\n  <tr>\n\n  </tr>\n</table>',
      indices: [
        "Un tableau s’écrit ligne par ligne, et chaque ligne contient ses cellules. Deux sortes de cellules existent.",
        "Le <code>&lt;tr&gt;</code> est une ligne. Le <code>&lt;th&gt;</code> est une cellule d’en-tête ; le <code>&lt;td&gt;</code> une cellule ordinaire.",
        "Première ligne : deux <code>&lt;th&gt;</code>. Puis deux autres <code>&lt;tr&gt;</code> contenant chacun deux <code>&lt;td&gt;</code>."
      ],
      solution: '<table>\n  <tr>\n    <th>Jour</th>\n    <th>Activité</th>\n  </tr>\n  <tr>\n    <td>Samedi</td>\n    <td>Cinéma</td>\n  </tr>\n  <tr>\n    <td>Dimanche</td>\n    <td>Randonnée</td>\n  </tr>\n</table>',
      verifier: function (ctx) {
        const table = ctx.doc.querySelector('table');
        if (!table) return { ok: false, message: 'Il faut garder la balise <code>&lt;table&gt;</code>.' };
        const trs = table.querySelectorAll('tr');
        if (trs.length < 3) return { ok: false, message: 'Il faut 3 lignes <code>&lt;tr&gt;</code> en tout (tu en as ' + trs.length + ').' };
        const ths = trs[0].querySelectorAll('th');
        if (ths.length < 2) return { ok: false, message: 'La première ligne doit contenir deux cellules d\'en-tête <code>&lt;th&gt;</code>.' };
        for (let i = 1; i < 3; i++) {
          if (trs[i].querySelectorAll('td').length < 2) return { ok: false, message: 'La ligne ' + (i + 1) + ' doit contenir deux cellules <code>&lt;td&gt;</code>.' };
        }
        return { ok: true, message: 'Lignes, colonnes, en-têtes : les tableaux n\'ont plus de secret.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement.</strong> Ce tableau d\'horaires n\'a que 2 colonnes. Ajoute une <strong>troisième colonne</strong> « Salle » : un <code>&lt;th&gt;</code> de plus dans la première ligne, et un <code>&lt;td&gt;</code> de plus dans chaque ligne de données.',
      codeDepart: '<table>\n  <tr>\n    <th>Heure</th>\n    <th>Film</th>\n  </tr>\n  <tr>\n    <td>18h00</td>\n    <td>Le Grand Voyage</td>\n  </tr>\n  <tr>\n    <td>20h30</td>\n    <td>Nuit Étoilée</td>\n  </tr>\n</table>',
      indices: [
        "Ajouter une colonne, ce n’est pas ajouter une ligne : il faut toucher à <strong>chaque</strong> ligne du tableau.",
        "Une cellule de plus dans l’en-tête, et une cellule de plus dans chaque ligne de données — sinon le tableau se décale.",
        "Un <code>&lt;th&gt;</code> après celui du film, puis un <code>&lt;td&gt;</code> à la fin de chaque ligne."
      ],
      solution: '<table>\n  <tr>\n    <th>Heure</th>\n    <th>Film</th>\n    <th>Salle</th>\n  </tr>\n  <tr>\n    <td>18h00</td>\n    <td>Le Grand Voyage</td>\n    <td>Salle 1</td>\n  </tr>\n  <tr>\n    <td>20h30</td>\n    <td>Nuit Étoilée</td>\n    <td>Salle 3</td>\n  </tr>\n</table>',
      verifier: function (ctx) {
        const trs = ctx.doc.querySelectorAll('table tr');
        if (trs.length < 3) return { ok: false, message: 'Garde les 3 lignes du tableau de départ.' };
        if (trs[0].querySelectorAll('th').length < 3) return { ok: false, message: 'La ligne d\'en-tête doit maintenant avoir 3 <code>&lt;th&gt;</code> : Heure, Film et Salle.' };
        for (let i = 1; i < 3; i++) {
          if (trs[i].querySelectorAll('td').length < 3) return { ok: false, message: 'La ligne ' + (i + 1) + ' n\'a que ' + trs[i].querySelectorAll('td').length + ' cellules — il en faut 3 (ajoute le numéro de salle).' };
        }
        return { ok: true, message: 'Un tableau de séances de cinéma... ça devrait te parler ! Les vraies applications affichent leurs données exactement comme ça.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi, de mémoire.</strong> Un tableau de scores de jeu : une ligne d\'en-têtes (<code>Joueur</code>, <code>Points</code>), puis <strong>trois</strong> lignes de données. Sans regarder les exemples plus haut !',
      codeDepart: '',
      indices: [
        "Un tableau de mémoire : rien de nouveau, mais chaque niveau doit être refermé dans le bon ordre.",
        "Le <code>&lt;table&gt;</code> contient des <code>&lt;tr&gt;</code>, qui contiennent des <code>&lt;th&gt;</code> ou des <code>&lt;td&gt;</code>. Rien d’autre entre les deux.",
        "Un <code>&lt;tr&gt;</code> de deux <code>&lt;th&gt;</code>, puis trois <code>&lt;tr&gt;</code> de deux <code>&lt;td&gt;</code>."
      ],
      solution: '<table>\n  <tr>\n    <th>Joueur</th>\n    <th>Points</th>\n  </tr>\n  <tr>\n    <td>Léa</td>\n    <td>1250</td>\n  </tr>\n  <tr>\n    <td>Tom</td>\n    <td>980</td>\n  </tr>\n  <tr>\n    <td>Nina</td>\n    <td>1430</td>\n  </tr>\n</table>',
      verifier: function (ctx) {
        const table = ctx.doc.querySelector('table');
        if (!table) return { ok: false, message: 'Commence par la balise <code>&lt;table&gt;</code>.' };
        const trs = table.querySelectorAll('tr');
        if (trs.length < 4) return { ok: false, message: 'Il faut 4 lignes en tout : 1 d\'en-têtes + 3 de données (tu en as ' + trs.length + ').' };
        if (trs[0].querySelectorAll('th').length < 2) return { ok: false, message: 'La première ligne doit utiliser des <code>&lt;th&gt;</code> (cellules d\'en-tête).' };
        for (let i = 1; i < 4; i++) {
          if (trs[i].querySelectorAll('td').length < 2) return { ok: false, message: 'La ligne ' + (i + 1) + ' doit contenir 2 cellules <code>&lt;td&gt;</code>.' };
        }
        return { ok: true, message: 'Tableau complet écrit de mémoire — c\'est du solide.' };
      }
    }
  ]
},

{
  id: 'html-8',
  titre: 'Les formulaires',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tout ce que tu as vu jusqu'ici va dans un seul sens : le site montre, le visiteur lit. Le formulaire inverse le courant. C'est par lui qu'on se connecte, qu'on cherche, qu'on commande, qu'on écrit un message. C'est la dernière grande famille de balises HTML, et la plus utilisée du web.</p>

<h2>Les briques</h2>
<pre class="bloc-code">&lt;label for="prenom"&gt;Ton prénom :&lt;/label&gt;
&lt;input type="text" id="prenom" placeholder="Ex : Camille"&gt;

&lt;button&gt;Envoyer&lt;/button&gt;</pre>
<ul>
<li><code>&lt;input&gt;</code> — un champ de saisie. Pas de balise fermante : comme <code>&lt;img&gt;</code>, tout est dans ses attributs ;</li>
<li><code>&lt;label&gt;</code> — l'étiquette qui dit à quoi sert le champ ;</li>
<li><code>placeholder</code> — l'exemple grisé affiché dans un champ vide ;</li>
<li><code>&lt;button&gt;</code> — un bouton cliquable ;</li>
<li><code>&lt;select&gt;</code> et <code>&lt;option&gt;</code> — un menu déroulant.</li>
</ul>

<h2>Le type change tout</h2>
<p>Un <code>&lt;input&gt;</code> n'est pas un seul objet : son attribut <code>type</code> en fait des choses très différentes.</p>
<ul>
<li><code>text</code> — une ligne de texte ;</li>
<li><code>number</code> — un nombre, avec de petites flèches ;</li>
<li><code>date</code> — un calendrier s'ouvre ;</li>
<li><code>checkbox</code> — une case à cocher ;</li>
<li><code>password</code> — le texte s'affiche en points.</li>
</ul>
<p>Sur un téléphone, le <code>type</code> décide même du clavier qui apparaît : des chiffres pour <code>number</code>, un pavé avec l'arobase pour <code>email</code>. C'est beaucoup de confort pour un seul mot.</p>

<h2>Relier l'étiquette au champ</h2>
<p>Regarde bien le code plus haut : le <code>&lt;label&gt;</code> porte <code>for="prenom"</code> et l'<code>&lt;input&gt;</code> porte <code>id="prenom"</code>. La même valeur des deux côtés, et les voilà reliés. Cliquer sur l'étiquette place alors le curseur dans le champ — et un lecteur d'écran annonce « Ton prénom » quand on y arrive.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Ce qu'il en fait</th></tr>
<tr><td>&lt;label for="prenom"&gt;</td><td>Une étiquette, qui cherchera un champ nommé « prenom ».</td></tr>
<tr><td>Ton prénom :</td><td>Le texte affiché de l'étiquette.</td></tr>
<tr><td>&lt;input type="text" id="prenom"&gt;</td><td>Un champ texte. Son <code>id</code> répond à l'étiquette : les deux sont liés.</td></tr>
<tr><td>&lt;button&gt;Envoyer&lt;/button&gt;</td><td>Un bouton. Au clic, il ne se passera rien pour l'instant.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Une étiquette qui n'est reliée à rien.</strong> Écrire <code>&lt;label&gt;Ton prénom :&lt;/label&gt;</code> sans <code>for</code>, à côté d'un champ sans <code>id</code>, donne exactement la même chose à l'écran. Mais le lien n'existe pas : cliquer sur le texte ne fait rien, et un lecteur d'écran arrive sur un champ qu'il ne sait pas nommer. Deux attributs à ne pas oublier, pour un défaut qui ne se voit pas.</p>
<p><strong>Oublier le <code>type</code>.</strong> Un <code>&lt;input&gt;</code> tout seul fonctionne — il prend <code>text</code> par défaut. Mais tu perds le clavier adapté, le calendrier, les points du mot de passe. Écris toujours le type que tu veux vraiment.</p>
<p><strong>Attendre que le bouton fasse quelque chose.</strong> Un <code>&lt;button&gt;</code> en HTML n'est qu'un bouton : il a l'air cliquable, et il ne fait rien. Réagir à un clic, c'est le travail du JavaScript, que tu verras au module 4. Pour l'instant, tu construis la façade — et c'est déjà beaucoup.</p>

<h2>Dans la vraie vie</h2>
<p>Une barre de recherche, c'est un <code>&lt;input&gt;</code> et un <code>&lt;button&gt;</code>. Un panier, un formulaire de contact, une page de connexion : les mêmes briques, arrangées autrement. Tu viens de voir de quoi est faite la moitié des pages avec lesquelles tu interagis chaque jour.</p>

<div class="a-retenir">
<ul>
<li><code>&lt;input&gt;</code> saisit, <code>&lt;label&gt;</code> nomme, <code>&lt;button&gt;</code> déclenche, <code>&lt;select&gt;</code> propose une liste.</li>
<li>L'attribut <code>type</code> transforme complètement un <code>&lt;input&gt;</code>, et choisit même le clavier sur téléphone.</li>
<li><code>for</code> sur l'étiquette et <code>id</code> sur le champ, avec la même valeur : c'est ce qui les relie.</li>
<li>En HTML seul, un bouton ne fait rien — il faudra du JavaScript.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la balise form et l'attribut name</summary>
<p>Dans un vrai site, tous ces champs sont entourés d'une balise <code>&lt;form&gt;</code>, et chacun porte un attribut <code>name</code>. Au moment de l'envoi, c'est ce <code>name</code> qui sert d'étiquette à la valeur saisie, pour que le serveur sache de quel champ elle vient. Sans <code>name</code>, un champ est tout simplement ignoré à l'envoi : il existe à l'écran, mais il n'arrive jamais de l'autre côté.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée un mini formulaire de contact : un <code>&lt;label&gt;</code>, un champ <code>&lt;input type="text"&gt;</code> avec un <code>placeholder</code> de ton choix, et un <code>&lt;button&gt;</code> avec le texte <code>Envoyer</code>.',
      codeDepart: '<h1>Contact</h1>\n',
      indices: [
        "Trois éléments qui vont ensemble : ce qu’on demande, où l’on répond, et ce qui valide.",
        "Le <code>&lt;label&gt;</code> se ferme ; l’<code>&lt;input&gt;</code> ne se ferme pas ; le <code>&lt;button&gt;</code> se ferme et porte son texte entre les balises.",
        "Dans l’ordre : <code>&lt;label&gt;</code>, puis <code>&lt;input type=\"text\" placeholder=\"…\"&gt;</code>, puis <code>&lt;button&gt;</code>."
      ],
      solution: '<h1>Contact</h1>\n<label>Ton message :</label>\n<input type="text" placeholder="Écris ici...">\n<button>Envoyer</button>',
      verifier: function (ctx) {
        const label = ctx.doc.querySelector('label');
        if (!label || !label.textContent.trim()) return { ok: false, message: 'Il manque une étiquette <code>&lt;label&gt;</code> avec du texte.' };
        const input = ctx.doc.querySelector('input');
        if (!input) return { ok: false, message: 'Il manque le champ <code>&lt;input&gt;</code>.' };
        if ((input.getAttribute('type') || '') !== 'text') return { ok: false, message: 'Ton <code>&lt;input&gt;</code> doit avoir l\'attribut <code>type="text"</code>.' };
        if (!(input.getAttribute('placeholder') || '').trim()) return { ok: false, message: 'Ajoute un attribut <code>placeholder="..."</code> à ton champ.' };
        const bouton = ctx.doc.querySelector('button');
        if (!bouton) return { ok: false, message: 'Il manque le <code>&lt;button&gt;</code>.' };
        if (bouton.textContent.trim().toLowerCase() !== 'envoyer') return { ok: false, message: 'Le texte du bouton doit être « Envoyer ».' };
        return { ok: true, message: 'Ton premier formulaire est en place.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement.</strong> Ajoute au formulaire : un menu déroulant <code>&lt;select&gt;</code> avec 3 <code>&lt;option&gt;</code> (Question, Bug, Autre) précédé d\'un <code>&lt;label&gt;</code>, et une case à cocher <code>&lt;input type="checkbox"&gt;</code> suivie d\'un <code>&lt;label&gt;</code> « Recevoir une copie ».',
      codeDepart: '<h1>Contact</h1>\n<label>Ton message :</label>\n<input type="text" placeholder="Écris ici...">\n\n<!-- Ajoute le menu déroulant et la case à cocher ici -->\n\n<button>Envoyer</button>',
      indices: [
        "Deux ajouts de natures différentes : l’un est une balise à part entière, l’autre un simple type d’<code>input</code>.",
        "Le menu déroulant est un <code>&lt;select&gt;</code> contenant des <code>&lt;option&gt;</code>. La case à cocher, elle, est un <code>input</code> d’un type particulier.",
        "<code>&lt;select&gt;&lt;option&gt;…&lt;/option&gt;…&lt;/select&gt;</code> et <code>&lt;input type=\"checkbox\"&gt;</code>"
      ],
      solution: '<h1>Contact</h1>\n<label>Ton message :</label>\n<input type="text" placeholder="Écris ici...">\n\n<label>Sujet :</label>\n<select>\n  <option>Question</option>\n  <option>Bug</option>\n  <option>Autre</option>\n</select>\n\n<input type="checkbox"> <label>Recevoir une copie</label>\n\n<button>Envoyer</button>',
      verifier: function (ctx) {
        const select = ctx.doc.querySelector('select');
        if (!select) return { ok: false, message: 'Il manque le menu déroulant <code>&lt;select&gt;</code>.' };
        if (select.querySelectorAll('option').length < 3) return { ok: false, message: 'Le menu doit contenir 3 <code>&lt;option&gt;</code>.' };
        if (!ctx.doc.querySelector('input[type="checkbox"]')) return { ok: false, message: 'Il manque la case à cocher : <code>&lt;input type="checkbox"&gt;</code>.' };
        if (ctx.doc.querySelectorAll('label').length < 2) return { ok: false, message: 'Chaque nouvel élément doit avoir son <code>&lt;label&gt;</code>.' };
        return { ok: true, message: 'Champ texte, menu déroulant, case à cocher : tu connais les trois types de saisie les plus courants.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : le formulaire d\'inscription.</strong> De mémoire, crée un formulaire complet : un titre, un label + champ texte (prénom), un label + champ <code>type="number"</code> (âge), un menu déroulant d\'au moins 2 options (niveau : Débutant / Confirmé), et un bouton <code>S\'inscrire</code>.',
      codeDepart: '',
      indices: [
        "Un formulaire complet, de mémoire. Chaque champ va par paire : son étiquette, puis le champ lui-même.",
        "Trois types de champs différents, dont un pour les nombres. Le bouton vient en dernier.",
        "h1, puis label + input texte, label + input <code>type=\"number\"</code>, label + <code>&lt;select&gt;</code> à deux options, et le bouton."
      ],
      solution: '<h1>Inscription au club de code</h1>\n\n<label>Prénom :</label>\n<input type="text" placeholder="Ton prénom">\n\n<label>Âge :</label>\n<input type="number" placeholder="Ton âge">\n\n<label>Niveau :</label>\n<select>\n  <option>Débutant</option>\n  <option>Confirmé</option>\n</select>\n\n<button>S\'inscrire</button>',
      verifier: function (ctx) {
        if (!ctx.doc.querySelector('h1')) return { ok: false, message: 'Il manque le titre.' };
        if (!ctx.doc.querySelector('input[type="text"]')) return { ok: false, message: 'Il manque le champ texte pour le prénom : <code>&lt;input type="text"&gt;</code>.' };
        if (!ctx.doc.querySelector('input[type="number"]')) return { ok: false, message: 'Il manque le champ nombre pour l\'âge : <code>&lt;input type="number"&gt;</code>.' };
        const select = ctx.doc.querySelector('select');
        if (!select || select.querySelectorAll('option').length < 2) return { ok: false, message: 'Il manque le menu déroulant <code>&lt;select&gt;</code> avec au moins 2 options.' };
        if (ctx.doc.querySelectorAll('label').length < 3) return { ok: false, message: 'Chaque champ doit avoir son <code>&lt;label&gt;</code> (il en faut au moins 3).' };
        if (!ctx.doc.querySelector('button')) return { ok: false, message: 'Il manque le bouton pour valider.' };
        return { ok: true, message: '🏆 Module HTML terminé ! Tu connais toutes les balises essentielles — et tu sais les assembler de mémoire. Direction le CSS.' };
      }
    }
  ]
},

];
