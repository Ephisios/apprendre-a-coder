/* ===== Module HTML ===== */
window.DATA_HTML = [

{
  id: 'html-1',
  titre: 'Ta première page : les balises',
  contenu: `
<p>Le HTML (<em>HyperText Markup Language</em>) décrit le contenu d'une page à l'aide de <strong>balises</strong>. C'est LA notion à comprendre — tout le reste en découle.</p>

<h2>Anatomie d'une balise</h2>
<pre class="bloc-code">&lt;h1&gt;Mon titre&lt;/h1&gt;</pre>
<ul>
<li><code>&lt;h1&gt;</code> est la <strong>balise ouvrante</strong> : elle annonce « ici commence un titre » ;</li>
<li><code>Mon titre</code> est le <strong>contenu</strong> ;</li>
<li><code>&lt;/h1&gt;</code> est la <strong>balise fermante</strong> : identique à l'ouvrante, mais avec une barre oblique <code>/</code>. Elle annonce « ici se termine le titre ».</li>
</ul>
<p>Le navigateur ne montre jamais les balises elles-mêmes : il les lit pour savoir <em>comment afficher</em> le contenu. <code>h1</code> signifie « titre de niveau 1 » (<em>heading 1</em>), donc le texte s'affiche en gros et en gras.</p>

<h2>Les deux balises les plus courantes</h2>
<ul>
<li><code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code> — les titres, du plus important (h1) au moins important (h6) ;</li>
<li><code>&lt;p&gt;</code> — un paragraphe de texte (<em>paragraph</em>).</li>
</ul>
<pre class="bloc-code">&lt;h1&gt;Mes vacances&lt;/h1&gt;
&lt;p&gt;Cet été, je suis parti en Bretagne.&lt;/p&gt;
&lt;p&gt;Il a plu, mais c'était super.&lt;/p&gt;</pre>

<div class="attention">⚠️ L'erreur classique du débutant : oublier la balise fermante, ou oublier le <code>/</code> dedans. Si ta page s'affiche bizarrement, vérifie d'abord ça !</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée une page contenant un titre <code>&lt;h1&gt;</code> avec le texte de ton choix, suivi d\'un paragraphe <code>&lt;p&gt;</code> qui contient au moins quelques mots.',
      codeDepart: '<!-- Écris ton code ici (cette ligne est un commentaire, tu peux l\'effacer) -->\n',
      indice: 'Structure attendue : <code>&lt;h1&gt;Un titre&lt;/h1&gt;</code> puis en dessous <code>&lt;p&gt;Une phrase.&lt;/p&gt;</code>',
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
      indice: 'Regarde bien la fin de la première ligne : la balise fermante d\'un <code>&lt;h1&gt;</code> doit contenir une barre oblique : <code>&lt;/h1&gt;</code>.',
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
      indice: 'Un <code>&lt;h1&gt;...&lt;/h1&gt;</code> puis trois blocs <code>&lt;p&gt;...&lt;/p&gt;</code> à la suite.',
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
<p>Une vraie page a une <strong>hiérarchie</strong>, comme un document : un grand titre, des sous-titres, des paragraphes. C'est le rôle des balises <code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code>.</p>

<pre class="bloc-code">&lt;h1&gt;Recettes de cuisine&lt;/h1&gt;

&lt;h2&gt;Les entrées&lt;/h2&gt;
&lt;p&gt;Des idées fraîches pour commencer le repas.&lt;/p&gt;

&lt;h2&gt;Les desserts&lt;/h2&gt;
&lt;p&gt;Le meilleur pour la fin.&lt;/p&gt;</pre>

<h2>Les règles d'or</h2>
<ul>
<li><strong>Un seul <code>&lt;h1&gt;</code> par page</strong> : c'est LE titre principal.</li>
<li>On ne saute pas de niveau : après un <code>&lt;h2&gt;</code> vient un <code>&lt;h3&gt;</code>, pas un <code>&lt;h5&gt;</code>.</li>
<li>On choisit un niveau de titre pour son <em>sens</em> (importance), pas pour sa taille — la taille se réglera avec le CSS.</li>
</ul>

<h2>Deux balises bonus</h2>
<ul>
<li><code>&lt;br&gt;</code> — un retour à la ligne <em>dans</em> un paragraphe. Balise spéciale : elle n'a pas de contenu, donc <strong>pas de balise fermante</strong>.</li>
<li><code>&lt;hr&gt;</code> — une ligne de séparation horizontale. Pareil, pas de fermante.</li>
</ul>

<div class="info">💬 À savoir : dans le code HTML, appuyer sur Entrée ou mettre plusieurs espaces ne change RIEN à l'affichage. Le navigateur ignore les sauts de ligne du code. Pour aller à la ligne, il faut une balise (<code>&lt;p&gt;</code> ou <code>&lt;br&gt;</code>).</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Construis une mini page « Mon carnet » : un <code>&lt;h1&gt;</code> principal, puis <strong>deux</strong> sections ayant chacune un sous-titre <code>&lt;h2&gt;</code> et un paragraphe <code>&lt;p&gt;</code>.',
      codeDepart: '<h1>Mon carnet</h1>\n',
      indice: 'Après le h1, enchaîne : <code>&lt;h2&gt;...&lt;/h2&gt;</code> <code>&lt;p&gt;...&lt;/p&gt;</code> <code>&lt;h2&gt;...&lt;/h2&gt;</code> <code>&lt;p&gt;...&lt;/p&gt;</code>',
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
      indice: 'Change les balises ouvrantes ET fermantes : <code>&lt;h4&gt;</code>→<code>&lt;h1&gt;</code>, <code>&lt;h6&gt;</code>→<code>&lt;h2&gt;</code>, <code>&lt;h3&gt;</code>→<code>&lt;h2&gt;</code>.',
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
      indice: 'Dans le paragraphe : <code>&lt;p&gt;ligne 1&lt;br&gt;ligne 2&lt;br&gt;ligne 3&lt;/p&gt;</code>. Puis <code>&lt;hr&gt;</code> seul, puis un dernier <code>&lt;p&gt;</code>.',
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
  titre: 'Mettre le texte en valeur et faire des listes',
  contenu: `
<h2>Gras et italique</h2>
<p>Deux balises s'utilisent <em>à l'intérieur</em> d'un paragraphe pour mettre des mots en valeur :</p>
<ul>
<li><code>&lt;strong&gt;</code> — texte <strong>important</strong>, affiché en gras ;</li>
<li><code>&lt;em&gt;</code> — texte <em>accentué</em>, affiché en italique.</li>
</ul>
<pre class="bloc-code">&lt;p&gt;Ceci est &lt;strong&gt;très important&lt;/strong&gt; et ceci est &lt;em&gt;nuancé&lt;/em&gt;.&lt;/p&gt;</pre>
<p>Tu viens de voir un concept clé : les balises peuvent être <strong>imbriquées</strong> les unes dans les autres, comme des poupées russes. Le <code>&lt;strong&gt;</code> vit à l'intérieur du <code>&lt;p&gt;</code>.</p>

<h2>Les listes</h2>
<p>Deux types de listes existent :</p>
<ul>
<li><code>&lt;ul&gt;</code> — liste <strong>à puces</strong> (<em>unordered list</em>, liste non ordonnée) ;</li>
<li><code>&lt;ol&gt;</code> — liste <strong>numérotée</strong> (<em>ordered list</em>).</li>
</ul>
<p>Dans les deux cas, chaque élément de la liste s'écrit avec la balise <code>&lt;li&gt;</code> (<em>list item</em>) :</p>
<pre class="bloc-code">&lt;h2&gt;Ma liste de courses&lt;/h2&gt;
&lt;ul&gt;
  &lt;li&gt;Pain&lt;/li&gt;
  &lt;li&gt;Fromage&lt;/li&gt;
  &lt;li&gt;Pommes&lt;/li&gt;
&lt;/ul&gt;</pre>

<div class="astuce">✅ Remarque les <strong>espaces en début de ligne</strong> devant les <code>&lt;li&gt;</code> : c'est l'<strong>indentation</strong>. Elle ne change rien à l'affichage, mais elle montre d'un coup d'œil ce qui est imbriqué dans quoi. Prends l'habitude d'indenter, ton futur toi te dira merci.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée une page « Top 3 » : un titre <code>&lt;h1&gt;</code>, un paragraphe contenant un mot en <code>&lt;strong&gt;</code>, puis une liste <strong>numérotée</strong> (<code>&lt;ol&gt;</code>) de 3 éléments (tes 3 films, plats ou jeux préférés).',
      codeDepart: '',
      indice: 'La liste numérotée s\'écrit : <code>&lt;ol&gt; &lt;li&gt;...&lt;/li&gt; &lt;li&gt;...&lt;/li&gt; &lt;li&gt;...&lt;/li&gt; &lt;/ol&gt;</code>. Le <code>&lt;strong&gt;</code> se place autour d\'un mot, à l\'intérieur du <code>&lt;p&gt;</code>.',
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
      indice: 'Remplace le paragraphe par : <code>&lt;ul&gt;</code> puis 4 <code>&lt;li&gt;...&lt;/li&gt;</code> puis <code>&lt;/ul&gt;</code>. Dans le premier li : <code>&lt;strong&gt;urgent&lt;/strong&gt;</code>.',
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
      indice: 'Squelette : h1, puis (h2 + ul avec 2 li), puis encore (h2 + ul avec 2 li).',
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
<p>Le web s'appelle « la toile » parce que ses pages sont reliées entre elles par des <strong>liens</strong>. Un lien se crée avec la balise <code>&lt;a&gt;</code> (<em>anchor</em>, « ancre »).</p>

<pre class="bloc-code">&lt;a href="https://fr.wikipedia.org"&gt;Visiter Wikipédia&lt;/a&gt;</pre>

<h2>Nouveauté : les attributs</h2>
<p>Regarde bien la balise ouvrante : elle contient <code>href="..."</code>. C'est un <strong>attribut</strong> — une information supplémentaire donnée à la balise. Un attribut s'écrit toujours dans la balise ouvrante, sous la forme <code>nom="valeur"</code>.</p>
<ul>
<li><code>href</code> indique la <strong>destination</strong> du lien (l'adresse, appelée URL) ;</li>
<li>le texte entre <code>&lt;a&gt;</code> et <code>&lt;/a&gt;</code> est ce qui est <strong>affiché et cliquable</strong>.</li>
</ul>

<div class="attention">⚠️ Pièges classiques : oublier les <strong>guillemets</strong> autour de la valeur, ou mettre l'adresse comme texte du lien au lieu de la mettre dans <code>href</code>. Le modèle à retenir : <code>&lt;a href="adresse"&gt;texte cliquable&lt;/a&gt;</code></div>

<p>Les attributs ne sont pas réservés aux liens : presque toutes les balises peuvent en recevoir. Tu en verras beaucoup d'autres (et dès la prochaine leçon avec les images).</p>

<div class="info">💬 Un lien peut aussi pointer vers un autre fichier de ton propre ordinateur : <code>&lt;a href="page2.html"&gt;Page 2&lt;/a&gt;</code>. C'est comme ça qu'on relie les pages d'un site entre elles.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée un paragraphe contenant un lien vers <code>https://fr.wikipedia.org</code> dont le texte cliquable est <code>Mon site préféré</code>. (Dans l\'aperçu, le clic ne chargera pas la vraie page — c\'est normal, on vérifie juste ton code.)',
      codeDepart: '<p>\n\n</p>',
      indice: 'Modèle : <code>&lt;a href="l\'adresse"&gt;le texte&lt;/a&gt;</code> — n\'oublie pas les guillemets autour de l\'adresse.',
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
      indice: 'Dans chaque <code>&lt;li&gt;</code>, place un lien complet : <code>&lt;li&gt;&lt;a href="https://..."&gt;Nom du site&lt;/a&gt;&lt;/li&gt;</code>',
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
<p>Une image s'insère avec la balise <code>&lt;img&gt;</code>. Elle utilise deux attributs :</p>

<pre class="bloc-code">&lt;img src="chat.jpg" alt="Un chat roux endormi"&gt;</pre>

<ul>
<li><code>src</code> (<em>source</em>) — le chemin ou l'adresse du fichier image ;</li>
<li><code>alt</code> (<em>alternative</em>) — un texte qui décrit l'image. Il s'affiche si l'image ne charge pas, et il est lu à voix haute par les logiciels pour personnes malvoyantes. <strong>Toujours le remplir.</strong></li>
</ul>

<p>Remarque : comme <code>&lt;br&gt;</code>, la balise <code>&lt;img&gt;</code> n'a <strong>pas de balise fermante</strong> — une image n'a pas de « contenu texte », tout est dans ses attributs.</p>

<h2>D'où viennent les images ?</h2>
<ul>
<li>D'un fichier à côté de ta page : <code>src="photo.jpg"</code> ou <code>src="images/photo.jpg"</code> ;</li>
<li>D'une adresse internet : <code>src="https://exemple.com/photo.jpg"</code>.</li>
</ul>

<div class="info">💬 Pour les exercices, on utilise des images spéciales intégrées directement dans le code (une longue suite de caractères qui commence par <code>data:image/...</code>). C'est rare en pratique, mais ça nous permet de travailler 100% hors ligne.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le code contient une image sans attribut <code>alt</code> — ajoute-lui une description (par exemple <code>Un carré violet</code>). Ajoute ensuite un titre <code>&lt;h1&gt;</code> au-dessus de l\'image.',
      codeDepart: '<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'120\'%3E%3Crect width=\'120\' height=\'120\' rx=\'16\' fill=\'%237a5df5\'/%3E%3C/svg%3E">',
      indice: 'L\'attribut s\'ajoute dans la balise, après le src : <code>&lt;img src="..." alt="ta description"&gt;</code>. Le h1 se place sur une ligne avant.',
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
      indice: 'Structure : <code>&lt;h1&gt;</code>, puis <code>&lt;h2&gt;Le carré&lt;/h2&gt;</code> + première image avec alt, puis <code>&lt;h2&gt;Le rond&lt;/h2&gt;</code> + deuxième image avec alt.',
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
<p>Jusqu'ici, on a écrit des bouts de page. Une vraie page HTML complète a un squelette officiel :</p>

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
<li><code>&lt;!DOCTYPE html&gt;</code> — annonce « ceci est du HTML moderne » ;</li>
<li><code>&lt;head&gt;</code> — la partie <strong>invisible</strong> : titre de l'onglet, réglages, liens vers le CSS ;</li>
<li><code>&lt;body&gt;</code> — tout ce qui est <strong>visible</strong> à l'écran.</li>
</ul>
<div class="info">💬 Dans nos exercices, ce squelette est ajouté automatiquement — c'est pour ça qu'on peut l'omettre. Mais quand tu créeras tes propres fichiers <code>.html</code>, commence toujours par lui.</div>

<h2>Découper le contenu en zones</h2>
<p>À l'intérieur du <code>body</code>, on regroupe le contenu en grandes zones avec des balises dédiées :</p>
<ul>
<li><code>&lt;header&gt;</code> — l'en-tête (logo, titre du site) ;</li>
<li><code>&lt;nav&gt;</code> — le menu de navigation ;</li>
<li><code>&lt;main&gt;</code> — le contenu principal ;</li>
<li><code>&lt;footer&gt;</code> — le pied de page (contact, mentions) ;</li>
<li><code>&lt;div&gt;</code> — une boîte générique, quand aucune zone spéciale ne convient. Tu la verras partout.</li>
</ul>
<p>Ces balises ne changent presque rien visuellement : elles servent à <strong>organiser</strong>. C'est le CSS (prochain module !) qui les transformera en vraies mises en page.</p>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Construis une page avec les 3 zones : un <code>&lt;header&gt;</code> contenant un <code>&lt;h1&gt;</code>, un <code>&lt;main&gt;</code> contenant un paragraphe, et un <code>&lt;footer&gt;</code> contenant aussi un paragraphe (par exemple ton nom).',
      codeDepart: '<header>\n\n</header>\n\n<main>\n\n</main>\n\n<footer>\n\n</footer>',
      indice: 'Place un <code>&lt;h1&gt;...&lt;/h1&gt;</code> entre <code>&lt;header&gt;</code> et <code>&lt;/header&gt;</code>, puis un <code>&lt;p&gt;...&lt;/p&gt;</code> dans le main et un autre dans le footer.',
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
      indice: 'Dans le header : <code>&lt;nav&gt;&lt;ul&gt; &lt;li&gt;&lt;a href="..."&gt;Accueil&lt;/a&gt;&lt;/li&gt; &lt;li&gt;&lt;a href="..."&gt;Contact&lt;/a&gt;&lt;/li&gt; &lt;/ul&gt;&lt;/nav&gt;</code>',
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
<p>Pour présenter des données en lignes et colonnes (horaires, prix, résultats...), on utilise un <strong>tableau</strong>. Quatre balises travaillent ensemble :</p>

<ul>
<li><code>&lt;table&gt;</code> — le tableau entier ;</li>
<li><code>&lt;tr&gt;</code> — une ligne (<em>table row</em>) ;</li>
<li><code>&lt;th&gt;</code> — une cellule d'<strong>en-tête</strong>, en gras (<em>table header</em>) ;</li>
<li><code>&lt;td&gt;</code> — une cellule normale (<em>table data</em>).</li>
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
  &lt;tr&gt;
    &lt;td&gt;Lyon&lt;/td&gt;
    &lt;td&gt;520 000&lt;/td&gt;
  &lt;/tr&gt;
&lt;/table&gt;</pre>

<p>La logique : le tableau contient des lignes, et chaque ligne contient des cellules. L'indentation aide vraiment à s'y retrouver !</p>

<div class="astuce">✅ Sans CSS, un tableau n'a pas de bordures visibles — il paraît « nu ». C'est normal : l'apparence viendra au prochain module.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée un tableau de 3 lignes : une ligne d\'en-têtes avec deux <code>&lt;th&gt;</code> (<code>Jour</code> et <code>Activité</code>), puis deux lignes de données avec deux <code>&lt;td&gt;</code> chacune.',
      codeDepart: '<table>\n  <tr>\n\n  </tr>\n</table>',
      indice: 'Première ligne : deux <code>&lt;th&gt;</code>. Ajoute ensuite deux autres blocs <code>&lt;tr&gt;...&lt;/tr&gt;</code> contenant chacun deux <code>&lt;td&gt;</code>.',
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
      indice: 'Ajoute <code>&lt;th&gt;Salle&lt;/th&gt;</code> après le th « Film », puis un <code>&lt;td&gt;...&lt;/td&gt;</code> à la fin de chaque ligne de données (avant le <code>&lt;/tr&gt;</code>).',
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
      indice: 'table > tr(2 th) puis 3 × tr(2 td). Chaque balise ouverte doit être refermée.',
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
<p>Champs de texte, boutons, menus déroulants... tout ce qui permet à un visiteur de <strong>saisir</strong> quelque chose s'appelle un formulaire. C'est la dernière grande famille de balises HTML.</p>

<h2>Les briques de base</h2>
<pre class="bloc-code">&lt;label&gt;Ton prénom :&lt;/label&gt;
&lt;input type="text" placeholder="Ex : Camille"&gt;

&lt;button&gt;Envoyer&lt;/button&gt;</pre>
<ul>
<li><code>&lt;input&gt;</code> — un champ de saisie (pas de balise fermante). Son attribut <code>type</code> change tout : <code>text</code> (texte), <code>number</code> (nombre), <code>date</code>, <code>checkbox</code> (case à cocher), <code>password</code>... ;</li>
<li><code>&lt;label&gt;</code> — l'étiquette qui décrit un champ ;</li>
<li><code>placeholder</code> — le texte grisé d'exemple affiché dans un champ vide ;</li>
<li><code>&lt;button&gt;</code> — un bouton cliquable ;</li>
<li><code>&lt;select&gt;</code> + <code>&lt;option&gt;</code> — un menu déroulant.</li>
</ul>

<pre class="bloc-code">&lt;select&gt;
  &lt;option&gt;Petit&lt;/option&gt;
  &lt;option&gt;Moyen&lt;/option&gt;
  &lt;option&gt;Grand&lt;/option&gt;
&lt;/select&gt;</pre>

<div class="info">💬 Pour l'instant, nos formulaires ne « font » rien quand on clique : réagir à un clic, c'est le travail du JavaScript, que tu verras au module 4. Chaque chose en son temps !</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée un mini formulaire de contact : un <code>&lt;label&gt;</code>, un champ <code>&lt;input type="text"&gt;</code> avec un <code>placeholder</code> de ton choix, et un <code>&lt;button&gt;</code> avec le texte <code>Envoyer</code>.',
      codeDepart: '<h1>Contact</h1>\n',
      indice: 'Dans l\'ordre : <code>&lt;label&gt;...&lt;/label&gt;</code>, puis <code>&lt;input type="text" placeholder="..."&gt;</code>, puis <code>&lt;button&gt;Envoyer&lt;/button&gt;</code>.',
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
      indice: 'Menu : <code>&lt;select&gt;&lt;option&gt;Question&lt;/option&gt;...&lt;/select&gt;</code>. Case : <code>&lt;input type="checkbox"&gt; &lt;label&gt;Recevoir une copie&lt;/label&gt;</code>',
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
      indice: 'Enchaîne : h1, label + input text, label + input number, label + select(2 options), button. Le type number s\'écrit <code>&lt;input type="number"&gt;</code>.',
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
