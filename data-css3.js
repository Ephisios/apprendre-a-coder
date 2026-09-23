/* ===== CSS — troisième partie (css-16 à css-25) ===== */
window.DATA_CSS3 = [

/* ---------- css-16 ---------- */
{
  id: 'css-16',
  titre: 'Les sélecteurs de combinaison',
  contenu: `
<p>Tu sais viser une balise, une classe, un id. Voici comment viser un élément <strong>selon sa position</strong> par rapport à un autre — sans avoir à lui ajouter une classe.</p>

<table class="memo-table">
<tr><th>Écriture</th><th>Vise</th></tr>
<tr><td>.carte p</td><td>TOUS les p à l'intérieur d'une carte, même profondément imbriqués</td></tr>
<tr><td>.carte &gt; p</td><td>seulement les p <strong>enfants directs</strong> de la carte</td></tr>
<tr><td>h2 + p</td><td>le p qui suit IMMÉDIATEMENT un h2</td></tr>
<tr><td>h2 ~ p</td><td>TOUS les p qui suivent un h2 (même niveau)</td></tr>
</table>

<h2>Descendant ou enfant direct ?</h2>
<pre class="bloc-code">&lt;div class="carte"&gt;
  &lt;p&gt;Directement dans la carte&lt;/p&gt;
  &lt;div&gt;
    &lt;p&gt;Plus profond&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
<p><code>.carte p</code> touche les <strong>deux</strong> paragraphes. <code>.carte &gt; p</code> ne touche que le premier — le second n'est pas un enfant direct, c'est un petit-enfant.</p>

<h2>Le frère immédiat</h2>
<pre class="bloc-code">h2 + p {
  font-weight: bold;    /* le chapô juste après un titre */
}</pre>
<p>C'est l'astuce classique du chapô : le premier paragraphe après un titre se met en valeur, sans qu'on ait à lui ajouter une classe. Le HTML reste propre, la mise en forme vit entièrement dans le CSS.</p>

<div class="astuce"><div>Ces sélecteurs évitent de polluer le HTML avec des classes purement décoratives. Moins de classes, c'est moins de choses à maintenir quand la structure évolue.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Mets en <strong>rouge</strong> uniquement les paragraphes qui sont <strong>enfants directs</strong> de <code>.carte</code>. Le paragraphe imbriqué plus profond ne doit pas changer.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<div class="carte">\n  <p id="direct">Directement dans la carte</p>\n  <div>\n    <p id="profond">Plus profond</p>\n  </div>\n</div>',
      indice: 'Le chevron désigne l\'enfant direct : <code>.carte > p { color: red; }</code>',
      solution: '<style>\n  .carte > p {\n    color: red;\n  }\n</style>\n\n<div class="carte">\n  <p id="direct">Directement dans la carte</p>\n  <div>\n    <p id="profond">Plus profond</p>\n  </div>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const direct = ctx.doc.getElementById('direct');
        const profond = ctx.doc.getElementById('profond');
        if (!direct || !profond) return { ok: false, message: 'Garde les deux paragraphes du code de départ.' };
        const c1 = win.getComputedStyle(direct).color;
        const c2 = win.getComputedStyle(profond).color;
        if (c1 !== 'rgb(255, 0, 0)') return { ok: false, message: 'Le paragraphe direct doit être rouge — il est actuellement ' + c1 + '.' };
        if (c2 === 'rgb(255, 0, 0)') return { ok: false, message: 'Le paragraphe imbriqué est rouge lui aussi : tu as utilisé <code>.carte p</code> (tous les descendants). Il faut <code>.carte &gt; p</code> pour ne viser que les enfants directs.' };
        return { ok: true, message: 'Le chevron limite la portée à un seul niveau. C\'est souvent exactement ce qu\'on veut pour éviter des effets de bord.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> mets en gras uniquement le paragraphe qui suit <strong>immédiatement</strong> le <code>h2</code> — le chapô. Le second paragraphe doit rester normal.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<h2>Mon article</h2>\n<p id="chapo">Le chapô, juste après le titre.</p>\n<p id="suite">Le reste de l\'article.</p>',
      indice: 'Le plus signifie « frère immédiat » : <code>h2 + p { font-weight: bold; }</code>',
      solution: '<style>\n  h2 + p {\n    font-weight: bold;\n  }\n</style>\n\n<h2>Mon article</h2>\n<p id="chapo">Le chapô, juste après le titre.</p>\n<p id="suite">Le reste de l\'article.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const chapo = ctx.doc.getElementById('chapo');
        const suite = ctx.doc.getElementById('suite');
        if (!chapo || !suite) return { ok: false, message: 'Garde les deux paragraphes du code de départ.' };
        const g1 = win.getComputedStyle(chapo).fontWeight;
        const g2 = win.getComputedStyle(suite).fontWeight;
        if (Number(g1) < 600 && g1 !== 'bold') return { ok: false, message: 'Le chapô doit être en gras — sa graisse actuelle est ' + g1 + '.' };
        if (Number(g2) >= 600 || g2 === 'bold') return { ok: false, message: 'Le second paragraphe est en gras aussi : tu as sans doute utilisé <code>h2 ~ p</code> (tous les frères suivants) ou <code>p</code> tout seul. Le frère IMMÉDIAT s\'écrit <code>h2 + p</code>.' };
        return { ok: true, message: 'Un chapô mis en forme sans ajouter la moindre classe au HTML.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi :</strong> cette fois, mets en <strong>italique</strong> <em>tous</em> les paragraphes qui suivent le <code>h2</code>, pas seulement le premier.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<h2>Mon article</h2>\n<p id="p1">Premier paragraphe.</p>\n<p id="p2">Deuxième paragraphe.</p>\n<p id="p3">Troisième paragraphe.</p>',
      indice: 'Le tilde désigne tous les frères suivants : <code>h2 ~ p { font-style: italic; }</code>',
      solution: '<style>\n  h2 ~ p {\n    font-style: italic;\n  }\n</style>\n\n<h2>Mon article</h2>\n<p id="p1">Premier paragraphe.</p>\n<p id="p2">Deuxième paragraphe.</p>\n<p id="p3">Troisième paragraphe.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const ids = ['p1', 'p2', 'p3'];
        for (const id of ids) {
          const el = ctx.doc.getElementById(id);
          if (!el) return { ok: false, message: 'Garde les trois paragraphes du code de départ.' };
          if (win.getComputedStyle(el).fontStyle !== 'italic') {
            return { ok: false, message: 'Le paragraphe « ' + id + ' » n\'est pas en italique. Avec <code>h2 + p</code> seul le premier serait touché : utilise <code>h2 ~ p</code> pour tous les frères suivants.' };
          }
        }
        return { ok: true, message: 'Le tilde touche tous les frères suivants, le plus seulement le premier. Une nuance qui évite bien des classes inutiles.' };
      }
    }
  ]
},

/* ---------- css-17 ---------- */
{
  id: 'css-17',
  titre: 'Les sélecteurs d\'attribut',
  contenu: `
<p>On peut viser un élément selon la <strong>valeur d'un de ses attributs</strong>. C'est particulièrement utile pour les formulaires et les liens.</p>

<table class="memo-table">
<tr><th>Écriture</th><th>Vise les éléments dont l'attribut…</th></tr>
<tr><td>[disabled]</td><td>existe, quelle que soit sa valeur</td></tr>
<tr><td>[type="email"]</td><td>vaut exactement « email »</td></tr>
<tr><td>[href^="https"]</td><td>COMMENCE par « https »</td></tr>
<tr><td>[href$=".pdf"]</td><td>SE TERMINE par « .pdf »</td></tr>
<tr><td>[href*="video"]</td><td>CONTIENT « video »</td></tr>
</table>

<p>Les trois symboles se retiennent facilement : <code>^</code> pointe vers le début, <code>$</code> marque la fin (comme dans les expressions régulières), <code>*</code> veut dire « n'importe où ».</p>

<h2>Un usage très courant</h2>
<pre class="bloc-code">input[type="email"] {
  border: 2px solid blue;
}

a[href$=".pdf"]::after {
  content: " 📄";        /* signale un lien vers un PDF */
}

button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}</pre>

<div class="astuce"><div>Tous les <code>&lt;input&gt;</code> partagent la même balise mais font des choses très différentes selon leur <code>type</code>. Le sélecteur d'attribut est le seul moyen de les distinguer sans leur ajouter une classe à chacun.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Donne une bordure bleue de 2px uniquement au champ dont le <code>type</code> vaut <code>email</code>. Le champ texte ne doit pas changer.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<input type="text" id="texte" placeholder="Nom">\n<input type="email" id="mail" placeholder="Email">',
      indice: '<code>input[type="email"] { border: 2px solid blue; }</code>',
      solution: '<style>\n  input[type="email"] {\n    border: 2px solid blue;\n  }\n</style>\n\n<input type="text" id="texte" placeholder="Nom">\n<input type="email" id="mail" placeholder="Email">',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const mail = ctx.doc.getElementById('mail');
        const texte = ctx.doc.getElementById('texte');
        if (!mail || !texte) return { ok: false, message: 'Garde les deux champs du code de départ.' };
        const bm = win.getComputedStyle(mail);
        if (bm.borderTopColor !== 'rgb(0, 0, 255)') return { ok: false, message: 'Le champ email doit avoir une bordure bleue — elle est actuellement ' + bm.borderTopColor + '.' };
        if (parseFloat(bm.borderTopWidth) < 2) return { ok: false, message: 'La bordure doit faire 2px — elle fait ' + bm.borderTopWidth + '.' };
        if (win.getComputedStyle(texte).borderTopColor === 'rgb(0, 0, 255)') return { ok: false, message: 'Le champ texte est bleu aussi : ton sélecteur vise tous les <code>input</code>. Précise l\'attribut : <code>input[type="email"]</code>.' };
        return { ok: true, message: 'Deux balises identiques, un seul style appliqué : c\'est l\'attribut qui a fait la différence.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> mets en rouge uniquement les liens dont l\'adresse <strong>se termine</strong> par <code>.pdf</code>.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<a href="page.html" id="page">Une page</a><br>\n<a href="rapport.pdf" id="pdf">Un rapport PDF</a>',
      indice: 'Le dollar marque la fin : <code>a[href$=".pdf"] { color: red; }</code>',
      solution: '<style>\n  a[href$=".pdf"] {\n    color: red;\n  }\n</style>\n\n<a href="page.html" id="page">Une page</a><br>\n<a href="rapport.pdf" id="pdf">Un rapport PDF</a>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const pdf = ctx.doc.getElementById('pdf');
        const page = ctx.doc.getElementById('page');
        if (!pdf || !page) return { ok: false, message: 'Garde les deux liens du code de départ.' };
        if (win.getComputedStyle(pdf).color !== 'rgb(255, 0, 0)') return { ok: false, message: 'Le lien PDF doit être rouge — il est ' + win.getComputedStyle(pdf).color + '.' };
        if (win.getComputedStyle(page).color === 'rgb(255, 0, 0)') return { ok: false, message: 'L\'autre lien est rouge aussi. Le sélecteur doit cibler la FIN de l\'adresse : <code>a[href$=".pdf"]</code>.' };
        return { ok: true, message: 'Signaler automatiquement les liens vers un document : le HTML n\'a rien eu à changer.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi :</strong> rends à moitié transparent (<code>opacity: 0.5</code>) tout bouton portant l\'attribut <code>disabled</code>, sans viser sa classe ni son id.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<button id="actif">Valider</button>\n<button id="inactif" disabled>Indisponible</button>',
      indice: 'Un attribut sans valeur se teste par sa seule présence : <code>button[disabled] { opacity: 0.5; }</code>',
      solution: '<style>\n  button[disabled] {\n    opacity: 0.5;\n  }\n</style>\n\n<button id="actif">Valider</button>\n<button id="inactif" disabled>Indisponible</button>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const actif = ctx.doc.getElementById('actif');
        const inactif = ctx.doc.getElementById('inactif');
        if (!actif || !inactif) return { ok: false, message: 'Garde les deux boutons du code de départ.' };
        if (/#inactif|\.inactif/.test(ctx.code)) return { ok: false, message: 'Vise l\'attribut <code>[disabled]</code>, pas l\'id — ta règle doit fonctionner pour n\'importe quel bouton désactivé.' };
        const o = parseFloat(win.getComputedStyle(inactif).opacity);
        if (Math.abs(o - 0.5) > 0.01) return { ok: false, message: 'Le bouton désactivé doit avoir une opacité de 0.5 — elle vaut ' + o + '.' };
        if (parseFloat(win.getComputedStyle(actif).opacity) < 1) return { ok: false, message: 'Le bouton actif doit rester complètement opaque.' };
        return { ok: true, message: 'La règle s\'appliquera automatiquement à tout bouton désactivé, présent ou futur. C\'est ça, du CSS qui vieillit bien.' };
      }
    }
  ]
},

/* ---------- css-18 ---------- */
{
  id: 'css-18',
  titre: ':not, :is et :has',
  contenu: `
<p>Trois pseudo-classes modernes qui remplacent des acrobaties compliquées.</p>

<h2>:not — tout sauf</h2>
<pre class="bloc-code">li:not(.actif) {
  opacity: 0.6;        /* tous les éléments SAUF l'actif */
}</pre>
<p>Sans <code>:not</code>, il aurait fallu styler tous les <code>li</code> puis annuler la règle pour l'actif. Une règle au lieu de deux, et surtout : pas de risque d'oublier d'annuler.</p>

<h2>:is — factoriser une liste de sélecteurs</h2>
<pre class="bloc-code">/* Avant */
article h1, article h2, article h3 { color: navy; }

/* Avec :is */
article :is(h1, h2, h3) { color: navy; }</pre>
<p>Le gain devient énorme quand la partie gauche est longue : <code>.page .contenu article :is(h1, h2, h3)</code> évite d'écrire trois fois le même chemin.</p>

<h2>:has — le sélecteur de parent</h2>
<pre class="bloc-code">.carte:has(img) {
  padding: 0;          /* les cartes QUI CONTIENNENT une image */
}</pre>
<p>C'est la nouveauté la plus attendue du CSS depuis vingt ans. Jusqu'ici, on ne pouvait styler un élément qu'en fonction de lui-même ou de ses ancêtres — jamais en fonction de son contenu. <code>:has</code> permet enfin de remonter, et rend inutiles beaucoup de lignes de JavaScript.</p>

<pre class="bloc-code">/* Un champ dont le label suit, quand il est coché */
label:has(input:checked) { font-weight: bold; }</pre>

<div class="info"><div><code>:has</code> est disponible dans tous les navigateurs modernes depuis 2023. Pour un site devant supporter de vieux navigateurs, prévois une apparence de repli acceptable.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Rends à moitié transparents tous les <code>li</code> <strong>sauf</strong> celui qui a la classe <code>actif</code>, en une seule règle avec <code>:not</code>.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<ul>\n  <li id="a">Accueil</li>\n  <li id="b" class="actif">Produits</li>\n  <li id="c">Contact</li>\n</ul>',
      indice: '<code>li:not(.actif) { opacity: 0.5; }</code>',
      solution: '<style>\n  li:not(.actif) {\n    opacity: 0.5;\n  }\n</style>\n\n<ul>\n  <li id="a">Accueil</li>\n  <li id="b" class="actif">Produits</li>\n  <li id="c">Contact</li>\n</ul>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const a = ctx.doc.getElementById('a'), b = ctx.doc.getElementById('b'), c = ctx.doc.getElementById('c');
        if (!a || !b || !c) return { ok: false, message: 'Garde les trois éléments de la liste.' };
        if (!/:not\s*\(/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande une seule règle avec <code>:not(...)</code>.' };
        if (parseFloat(win.getComputedStyle(a).opacity) >= 1) return { ok: false, message: 'Le premier élément devrait être transparent — son opacité vaut ' + win.getComputedStyle(a).opacity + '.' };
        if (parseFloat(win.getComputedStyle(b).opacity) < 1) return { ok: false, message: 'L\'élément actif doit rester complètement opaque — il vaut ' + win.getComputedStyle(b).opacity + '. Vérifie que <code>:not(.actif)</code> l\'exclut bien.' };
        if (parseFloat(win.getComputedStyle(c).opacity) >= 1) return { ok: false, message: 'Le troisième élément devrait être transparent lui aussi.' };
        return { ok: true, message: 'Une règle qui décrit l\'exception plutôt que d\'appliquer puis d\'annuler : moins de code, moins d\'oublis.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> mets en bleu marine (<code>navy</code>) les <code>h1</code>, <code>h2</code> et <code>h3</code> situés dans <code>article</code>, en une seule règle avec <code>:is</code>.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<article>\n  <h1 id="t1">Titre</h1>\n  <h2 id="t2">Sous-titre</h2>\n  <h3 id="t3">Section</h3>\n</article>\n<h1 id="dehors">Hors article</h1>',
      indice: '<code>article :is(h1, h2, h3) { color: navy; }</code>',
      solution: '<style>\n  article :is(h1, h2, h3) {\n    color: navy;\n  }\n</style>\n\n<article>\n  <h1 id="t1">Titre</h1>\n  <h2 id="t2">Sous-titre</h2>\n  <h3 id="t3">Section</h3>\n</article>\n<h1 id="dehors">Hors article</h1>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        if (!/:is\s*\(/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande <code>:is(h1, h2, h3)</code> — une seule règle, pas trois.' };
        for (const id of ['t1', 't2', 't3']) {
          const el = ctx.doc.getElementById(id);
          if (!el) return { ok: false, message: 'Garde les trois titres du code de départ.' };
          if (win.getComputedStyle(el).color !== 'rgb(0, 0, 128)') return { ok: false, message: 'Le titre « ' + id + ' » n\'est pas en navy — il est ' + win.getComputedStyle(el).color + '.' };
        }
        const dehors = ctx.doc.getElementById('dehors');
        if (dehors && win.getComputedStyle(dehors).color === 'rgb(0, 0, 128)') return { ok: false, message: 'Le titre hors de l\'article est coloré aussi : ta règle doit commencer par <code>article</code>.' };
        return { ok: true, message: ':is factorise la liste des cibles sans répéter le chemin qui y mène.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi :</strong> avec <code>:has</code>, donne un fond jaune (<code>yellow</code>) uniquement aux <code>.carte</code> qui <strong>contiennent une image</strong>.',
      codeDepart: '<style>\n  .carte { padding: 10px; border: 1px solid #ccc; margin-bottom: 8px; }\n  /* ta règle ici */\n\n</style>\n\n<div class="carte" id="avec">\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'%3E%3Crect width=\'40\' height=\'40\' fill=\'%234f6df5\'/%3E%3C/svg%3E" alt="carré">\n  <p>Avec image</p>\n</div>\n<div class="carte" id="sans">\n  <p>Sans image</p>\n</div>',
      indice: '<code>.carte:has(img) { background-color: yellow; }</code>',
      solution: '<style>\n  .carte { padding: 10px; border: 1px solid #ccc; margin-bottom: 8px; }\n  .carte:has(img) {\n    background-color: yellow;\n  }\n</style>\n\n<div class="carte" id="avec">\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\'%3E%3Crect width=\'40\' height=\'40\' fill=\'%234f6df5\'/%3E%3C/svg%3E" alt="carré">\n  <p>Avec image</p>\n</div>\n<div class="carte" id="sans">\n  <p>Sans image</p>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        if (!/:has\s*\(/.test(ctx.code)) return { ok: false, message: 'L\'exercice porte sur <code>:has(...)</code> — c\'est la seule façon de styler un parent selon son contenu.' };
        const avec = ctx.doc.getElementById('avec');
        const sans = ctx.doc.getElementById('sans');
        if (!avec || !sans) return { ok: false, message: 'Garde les deux cartes du code de départ.' };
        if (win.getComputedStyle(avec).backgroundColor !== 'rgb(255, 255, 0)') return { ok: false, message: 'La carte contenant l\'image doit avoir un fond jaune — il est ' + win.getComputedStyle(avec).backgroundColor + '.' };
        if (win.getComputedStyle(sans).backgroundColor === 'rgb(255, 255, 0)') return { ok: false, message: 'La carte sans image est jaune aussi : vérifie que la condition <code>:has(img)</code> est bien présente.' };
        return { ok: true, message: 'Styler un parent selon son contenu : c\'était impossible en CSS pendant vingt ans, et ça remplaçait des dizaines de lignes de JavaScript.' };
      }
    }
  ]
},

/* ---------- css-19 ---------- */
{
  id: 'css-19',
  titre: 'La spécificité : qui gagne ?',
  contenu: `
<p>Quand deux règles visent le même élément avec des valeurs contradictoires, laquelle s'applique ? Ce n'est pas forcément la dernière écrite : c'est la <strong>plus spécifique</strong>.</p>

<h2>Le calcul, en trois nombres</h2>
<p>Chaque sélecteur reçoit un score sous la forme (ids, classes, balises) :</p>
<table class="memo-table">
<tr><th>Sélecteur</th><th>Score</th><th>Compte</th></tr>
<tr><td>p</td><td>0-0-1</td><td>une balise</td></tr>
<tr><td>.rouge</td><td>0-1-0</td><td>une classe</td></tr>
<tr><td>p.rouge</td><td>0-1-1</td><td>une classe + une balise</td></tr>
<tr><td>#titre</td><td>1-0-0</td><td>un id</td></tr>
<tr><td>#titre p.rouge</td><td>1-1-1</td><td>un id, une classe, une balise</td></tr>
</table>
<p>On compare de gauche à droite : un seul id l'emporte sur cent classes. C'est pour ça qu'on évite de styler par id — on se retrouve coincé, incapable de surcharger la règle sans ajouter un autre id.</p>

<h2>À spécificité égale, le dernier gagne</h2>
<pre class="bloc-code">p { color: blue; }
p { color: green; }    /* c'est celui-ci qui s'applique */</pre>

<h2>!important : l'arme à ne pas utiliser</h2>
<pre class="bloc-code">p { color: red !important; }   /* écrase tout */</pre>
<p><code>!important</code> court-circuite tout le calcul. Le problème : quand on veut ensuite surcharger cette règle, il faut un autre <code>!important</code>, puis un autre… Et le CSS devient impossible à maintenir. Il n'existe pratiquement aucune bonne raison de l'utiliser dans son propre code.</p>

<div class="astuce"><div>La bonne pratique moderne : styler presque tout par <strong>classes</strong> (0-1-0), qui se surchargent facilement entre elles. Les ids servent aux ancres et au JavaScript, pas à la mise en forme.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le paragraphe doit finir en <strong>vert</strong>. Sans supprimer ni modifier la règle <code>p</code> existante, ajoute une règle <strong>plus spécifique</strong> qui l\'emporte.',
      codeDepart: '<style>\n  p { color: red; }\n  /* ajoute ta règle ici */\n\n</style>\n\n<p class="special" id="cible">Ce texte doit devenir vert.</p>',
      indice: 'Une classe (0-1-0) bat une balise (0-0-1) : <code>.special { color: green; }</code>',
      solution: '<style>\n  p { color: red; }\n  .special { color: green; }\n</style>\n\n<p class="special" id="cible">Ce texte doit devenir vert.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.getElementById('cible');
        if (!el) return { ok: false, message: 'Garde le paragraphe du code de départ.' };
        if (!/p\s*\{\s*color:\s*red/.test(ctx.code.replace(/\s+/g, ' ').replace(/\s*\{\s*/g, ' { '))) {
          return { ok: false, message: 'Ne supprime pas la règle <code>p { color: red; }</code> — l\'exercice consiste à la battre par la spécificité.' };
        }
        if (/!important/.test(ctx.code)) return { ok: false, message: 'Sans <code>!important</code> : c\'est justement ce que la spécificité permet d\'éviter.' };
        const c = win.getComputedStyle(el).color;
        if (c !== 'rgb(0, 128, 0)') return { ok: false, message: 'Le texte doit être vert — il est ' + c + '. Ajoute une règle plus spécifique, par exemple sur la classe.' };
        return { ok: true, message: 'Une classe l\'emporte sur une balise, quel que soit l\'ordre d\'écriture.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Entre <code>#menu p</code> et <code>.navigation .lien p</code>, quel sélecteur l\'emporte ?',
      choix: [
        '#menu p, car un id bat n\'importe quel nombre de classes',
        '.navigation .lien p, car il a plus de parties',
        'Celui qui est écrit en dernier',
        'Ils sont à égalité'
      ],
      bonne: 0,
      explication: '#menu p vaut 1-0-1 et .navigation .lien p vaut 0-2-1. On compare d\'abord le nombre d\'ids : 1 contre 0, la partie est jouée. Aucun nombre de classes ne rattrapera jamais un seul id.',
      aides: [
        null,
        'Le nombre total de parties n\'entre pas en compte : on compare colonne par colonne, en commençant par les ids.',
        'L\'ordre d\'écriture ne départage QUE des sélecteurs de spécificité identique. Ici ils diffèrent.',
        'Non : 1-0-1 contre 0-2-1, il y a un vainqueur net dès la première colonne.'
      ]
    },
    {
      type: 'html',
      consigne: '<strong>Chasse au bug :</strong> le développeur précédent a utilisé <code>!important</code>, et maintenant plus rien ne peut le surcharger. Enlève-le et fais fonctionner la mise en forme <strong>par la spécificité</strong> : le titre doit être bleu.',
      codeDepart: '<style>\n  h1 { color: red !important; }\n  .titre-principal { color: blue; }\n</style>\n\n<h1 class="titre-principal" id="cible">Mon titre</h1>',
      indice: 'Retire simplement <code>!important</code> : la classe <code>.titre-principal</code> (0-1-0) l\'emportera alors sur la balise <code>h1</code> (0-0-1).',
      solution: '<style>\n  h1 { color: red; }\n  .titre-principal { color: blue; }\n</style>\n\n<h1 class="titre-principal" id="cible">Mon titre</h1>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.getElementById('cible');
        if (!el) return { ok: false, message: 'Garde le titre du code de départ.' };
        if (/!important/.test(ctx.code)) return { ok: false, message: 'Il reste un <code>!important</code> dans ton code — c\'est justement ce qu\'il faut retirer.' };
        const c = win.getComputedStyle(el).color;
        if (c !== 'rgb(0, 0, 255)') return { ok: false, message: 'Le titre doit être bleu — il est ' + c + '. La classe doit l\'emporter naturellement une fois le !important retiré.' };
        return { ok: true, message: 'Sans !important, la spécificité fait son travail toute seule. C\'est pour ça qu\'on n\'en met pas : il casse le mécanisme au lieu de s\'en servir.' };
      }
    }
  ]
},

/* ---------- css-20 ---------- */
{
  id: 'css-20',
  titre: 'overflow et z-index',
  contenu: `
<h2>overflow : que faire du contenu qui déborde ?</h2>
<p>Quand un contenu est plus grand que sa boîte, CSS te laisse choisir.</p>
<table class="memo-table">
<tr><th>Valeur</th><th>Effet</th></tr>
<tr><td>visible</td><td>le contenu déborde et reste visible (par défaut)</td></tr>
<tr><td>hidden</td><td>ce qui dépasse est coupé</td></tr>
<tr><td>scroll</td><td>une barre de défilement, toujours affichée</td></tr>
<tr><td>auto</td><td>une barre de défilement, seulement si nécessaire</td></tr>
</table>
<pre class="bloc-code">.boite {
  height: 100px;
  overflow: auto;      /* le meilleur choix par défaut */
}</pre>
<p><code>overflow-x</code> et <code>overflow-y</code> permettent de traiter chaque axe séparément — c'est ainsi qu'on rend un tableau large défilable horizontalement sans que toute la page ne bouge.</p>

<h2>z-index : qui passe devant ?</h2>
<p>Quand des éléments se superposent, <code>z-index</code> décide de l'ordre de profondeur. Plus le nombre est grand, plus l'élément est devant.</p>
<pre class="bloc-code">.derriere { position: relative; z-index: 1; }
.devant   { position: relative; z-index: 2; }</pre>

<div class="attention"><div><strong>Le piège :</strong> <code>z-index</code> n'a aucun effet sur un élément en <code>position: static</code> — c'est-à-dire la valeur par défaut. Si ton z-index « ne marche pas », c'est presque toujours qu'il manque un <code>position: relative</code>.</div></div>

<div class="astuce"><div>Évite les valeurs comme <code>z-index: 9999</code>. Elles trahissent une guerre d'empilement qu'on finit toujours par perdre. Une échelle simple et documentée (10 pour les menus, 20 pour les fenêtres, 30 pour les alertes) reste maîtrisable.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'La boîte fait 80px de haut mais son contenu déborde. Ajoute une <strong>barre de défilement verticale</strong> qui n\'apparaît que si nécessaire.',
      codeDepart: '<style>\n  .boite {\n    height: 80px;\n    width: 200px;\n    border: 2px solid #333;\n    /* ta propriété ici */\n\n  }\n</style>\n\n<div class="boite" id="boite">\n  <p>Ligne 1</p>\n  <p>Ligne 2</p>\n  <p>Ligne 3</p>\n  <p>Ligne 4</p>\n  <p>Ligne 5</p>\n</div>',
      indice: '<code>overflow: auto;</code> — la barre n\'apparaît que quand le contenu dépasse.',
      solution: '<style>\n  .boite {\n    height: 80px;\n    width: 200px;\n    border: 2px solid #333;\n    overflow: auto;\n  }\n</style>\n\n<div class="boite" id="boite">\n  <p>Ligne 1</p>\n  <p>Ligne 2</p>\n  <p>Ligne 3</p>\n  <p>Ligne 4</p>\n  <p>Ligne 5</p>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const b = ctx.doc.getElementById('boite');
        if (!b) return { ok: false, message: 'Garde la boîte du code de départ.' };
        const o = win.getComputedStyle(b).overflowY;
        if (o === 'visible') return { ok: false, message: 'Le contenu déborde toujours librement : ajoute <code>overflow: auto;</code> à la boîte.' };
        if (o === 'hidden') return { ok: false, message: 'Avec <code>hidden</code>, le contenu est coupé et devient inaccessible. Utilise <code>auto</code> pour permettre le défilement.' };
        if (o !== 'auto' && o !== 'scroll') return { ok: false, message: 'La valeur attendue est <code>auto</code> — la tienne est « ' + o + ' ».' };
        if (b.scrollHeight <= b.clientHeight + 2) return { ok: false, message: 'La boîte doit garder sa hauteur de 80px pour que le défilement ait un sens.' };
        return { ok: true, message: 'auto plutôt que scroll : pas de barre inutile quand le contenu tient. C\'est le choix par défaut des professionnels.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Chasse au bug :</strong> le carré bleu devrait passer <strong>devant</strong> le rouge, mais son <code>z-index</code> semble ignoré. Trouve ce qui manque.',
      codeDepart: '<style>\n  .carre { width: 100px; height: 100px; }\n  .rouge {\n    background: red;\n    position: relative;\n    z-index: 1;\n  }\n  .bleu {\n    background: blue;\n    margin-top: -50px;\n    z-index: 5;\n  }\n</style>\n\n<div class="carre rouge" id="rouge"></div>\n<div class="carre bleu" id="bleu"></div>',
      indice: '<code>z-index</code> est ignoré sur un élément en <code>position: static</code> (la valeur par défaut). Ajoute <code>position: relative;</code> au carré bleu.',
      solution: '<style>\n  .carre { width: 100px; height: 100px; }\n  .rouge {\n    background: red;\n    position: relative;\n    z-index: 1;\n  }\n  .bleu {\n    background: blue;\n    margin-top: -50px;\n    position: relative;\n    z-index: 5;\n  }\n</style>\n\n<div class="carre rouge" id="rouge"></div>\n<div class="carre bleu" id="bleu"></div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const bleu = ctx.doc.getElementById('bleu');
        if (!bleu) return { ok: false, message: 'Garde les deux carrés du code de départ.' };
        const pos = win.getComputedStyle(bleu).position;
        if (pos === 'static') return { ok: false, message: 'Le carré bleu est toujours en <code>position: static</code> : c\'est précisément pour ça que son z-index n\'a aucun effet. Ajoute-lui <code>position: relative;</code>.' };
        const z = win.getComputedStyle(bleu).zIndex;
        if (z === 'auto' || Number(z) <= 1) return { ok: false, message: 'Le carré bleu doit garder un z-index supérieur à celui du rouge (5 > 1) — le sien vaut « ' + z + ' ».' };
        return { ok: true, message: 'z-index ne fonctionne que sur un élément positionné. C\'est la cause n°1 des « mon z-index ne marche pas ».' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> le texte long déborde horizontalement de sa boîte. Coupe ce qui dépasse avec <code>overflow: hidden</code>, sans changer la largeur.',
      codeDepart: '<style>\n  .etiquette {\n    width: 150px;\n    border: 2px solid #333;\n    white-space: nowrap;\n    /* ta propriété ici */\n\n  }\n</style>\n\n<div class="etiquette" id="etiquette">Un texte beaucoup trop long pour cette boîte étroite</div>',
      indice: '<code>overflow: hidden;</code> coupe simplement ce qui dépasse.',
      solution: '<style>\n  .etiquette {\n    width: 150px;\n    border: 2px solid #333;\n    white-space: nowrap;\n    overflow: hidden;\n  }\n</style>\n\n<div class="etiquette" id="etiquette">Un texte beaucoup trop long pour cette boîte étroite</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const e = ctx.doc.getElementById('etiquette');
        if (!e) return { ok: false, message: 'Garde l\'étiquette du code de départ.' };
        const o = win.getComputedStyle(e).overflowX;
        if (o !== 'hidden') return { ok: false, message: 'Attendu <code>overflow: hidden</code> — la valeur actuelle est « ' + o + ' ».' };
        if (Math.round(e.getBoundingClientRect().width) > 160) return { ok: false, message: 'La boîte doit conserver sa largeur de 150px.' };
        return { ok: true, message: 'Ajoute <code>text-overflow: ellipsis</code> et le texte coupé se terminera par « … » — la finition qu\'on voit partout.' };
      }
    }
  ]
},

/* ---------- css-21 ---------- */
{
  id: 'css-21',
  titre: 'Les arrière-plans en détail',
  contenu: `
<p>La propriété <code>background</code> cache en réalité plusieurs réglages, qu'on peut piloter séparément.</p>

<pre class="bloc-code">.banniere {
  background-color: #333;
  background-image: url("photo.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}</pre>

<h2>background-size : les deux valeurs à connaître</h2>
<table class="memo-table">
<tr><th>Valeur</th><th>Effet</th></tr>
<tr><td>cover</td><td>remplit toute la boîte, quitte à rogner l'image</td></tr>
<tr><td>contain</td><td>montre l'image entière, quitte à laisser du vide</td></tr>
<tr><td>100% 200px</td><td>largeur et hauteur imposées</td></tr>
</table>
<p><code>cover</code> pour une bannière (aucun trou visible), <code>contain</code> pour un logo (rien ne doit être coupé). Ce choix résume 90 % des cas.</p>

<h2>Superposer plusieurs fonds</h2>
<pre class="bloc-code">.hero {
  background-image:
    linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url("photo.jpg");
  background-size: cover;
}</pre>
<p>Les fonds se déclarent du <strong>plus proche au plus lointain</strong> : le dégradé noir semi-transparent est devant la photo, ce qui l'assombrit et rend le texte lisible par-dessus. C'est la technique universelle des bannières de site.</p>

<div class="astuce"><div>Une image décorative va en <code>background-image</code> ; une image porteuse d'information va en <code>&lt;img&gt;</code> avec un <code>alt</code>. La différence compte pour l'accessibilité : un lecteur d'écran ignore complètement les arrière-plans.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Fais en sorte que l\'image de fond <strong>remplisse toute la boîte</strong> sans se répéter, et qu\'elle soit centrée.',
      codeDepart: '<style>\n  .banniere {\n    height: 150px;\n    background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'60\'%3E%3Crect width=\'100\' height=\'60\' fill=\'%234f6df5\'/%3E%3C/svg%3E");\n    /* tes propriétés ici */\n\n  }\n</style>\n\n<div class="banniere" id="banniere"></div>',
      indice: 'Trois propriétés : <code>background-size: cover;</code>, <code>background-repeat: no-repeat;</code> et <code>background-position: center;</code>',
      solution: '<style>\n  .banniere {\n    height: 150px;\n    background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'60\'%3E%3Crect width=\'100\' height=\'60\' fill=\'%234f6df5\'/%3E%3C/svg%3E");\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center;\n  }\n</style>\n\n<div class="banniere" id="banniere"></div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const b = ctx.doc.getElementById('banniere');
        if (!b) return { ok: false, message: 'Garde la bannière du code de départ.' };
        const s = win.getComputedStyle(b);
        if (s.backgroundSize !== 'cover') return { ok: false, message: 'Utilise <code>background-size: cover;</code> pour remplir toute la boîte — la valeur actuelle est « ' + s.backgroundSize + ' ».' };
        if (!/no-repeat/.test(s.backgroundRepeat)) return { ok: false, message: 'Ajoute <code>background-repeat: no-repeat;</code> — sinon l\'image se répète en mosaïque.' };
        if (!/50%|center/.test(s.backgroundPosition)) return { ok: false, message: 'Ajoute <code>background-position: center;</code> — la valeur actuelle est « ' + s.backgroundPosition + ' ».' };
        return { ok: true, message: 'Ce trio est le réglage standard de toute image de fond. Tu l\'écriras des centaines de fois.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> le texte blanc est illisible sur l\'image claire. Ajoute un <strong>voile noir semi-transparent</strong> par-dessus l\'image, avec un dégradé, sans toucher au HTML.',
      codeDepart: '<style>\n  .hero {\n    height: 150px;\n    color: white;\n    padding: 20px;\n    background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'60\'%3E%3Crect width=\'100\' height=\'60\' fill=\'%23ffe08a\'/%3E%3C/svg%3E");\n    background-size: cover;\n  }\n</style>\n\n<div class="hero" id="hero"><h2>Titre lisible</h2></div>',
      indice: 'Deux fonds séparés par une virgule, le voile en premier :<br><code>background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("...");</code>',
      solution: '<style>\n  .hero {\n    height: 150px;\n    color: white;\n    padding: 20px;\n    background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'60\'%3E%3Crect width=\'100\' height=\'60\' fill=\'%23ffe08a\'/%3E%3C/svg%3E");\n    background-size: cover;\n  }\n</style>\n\n<div class="hero" id="hero"><h2>Titre lisible</h2></div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const h = ctx.doc.getElementById('hero');
        if (!h) return { ok: false, message: 'Garde le bloc hero du code de départ.' };
        const bg = win.getComputedStyle(h).backgroundImage;
        if (!/gradient/.test(bg)) return { ok: false, message: 'Ajoute un <code>linear-gradient</code> semi-transparent devant l\'image.' };
        if (!/url/.test(bg)) return { ok: false, message: 'L\'image de fond doit rester : les deux fonds se déclarent ensemble, séparés par une virgule.' };
        if (bg.indexOf('gradient') > bg.indexOf('url')) return { ok: false, message: 'L\'ordre compte : le dégradé doit être déclaré AVANT l\'image pour passer devant elle.' };
        if (!/rgba/.test(bg)) return { ok: false, message: 'Le voile doit être semi-transparent : utilise <code>rgba(0,0,0,0.5)</code> plutôt qu\'un noir opaque, sinon l\'image disparaît.' };
        return { ok: true, message: 'Voile sombre plus photo : la recette de toutes les bannières de site que tu as vues.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Quelle est la différence entre <code>background-size: cover</code> et <code>contain</code> ?',
      choix: [
        'cover remplit la boîte quitte à rogner ; contain montre tout quitte à laisser du vide',
        'cover agrandit l\'image, contain la réduit',
        'cover centre l\'image, contain la place en haut à gauche',
        'Il n\'y a aucune différence visible'
      ],
      bonne: 0,
      explication: 'Les deux conservent les proportions. cover privilégie le remplissage (une partie de l\'image sort du cadre), contain privilégie l\'intégralité (des zones vides peuvent apparaître). Bannière : cover. Logo : contain.',
      aides: [
        null,
        'Les deux peuvent agrandir ou réduire selon la taille de la boîte. La différence est dans ce qu\'on privilégie : le remplissage ou l\'intégralité.',
        'Le positionnement se règle séparément avec background-position, indépendamment du size.',
        'La différence est très visible dès que les proportions de l\'image et de la boîte diffèrent.'
      ]
    }
  ]
},

/* ---------- css-22 ---------- */
{
  id: 'css-22',
  titre: 'transform : déplacer, tourner, agrandir',
  contenu: `
<p><code>transform</code> modifie l'apparence d'un élément <strong>sans déranger ses voisins</strong>. C'est sa grande force : la place occupée dans la mise en page reste exactement la même.</p>

<table class="memo-table">
<tr><th>Fonction</th><th>Effet</th></tr>
<tr><td>translate(20px, 10px)</td><td>déplace de 20px à droite, 10px vers le bas</td></tr>
<tr><td>scale(1.2)</td><td>agrandit de 20 %</td></tr>
<tr><td>rotate(45deg)</td><td>fait pivoter de 45 degrés</td></tr>
<tr><td>skew(10deg)</td><td>incline</td></tr>
</table>

<h2>Les combiner</h2>
<pre class="bloc-code">.carte:hover {
  transform: translateY(-4px) scale(1.02);
}</pre>
<p>L'ordre compte : les transformations s'appliquent de gauche à droite. Une rotation avant une translation ne donne pas le même résultat qu'après.</p>

<h2>Pourquoi c'est la propriété reine des animations</h2>
<p>Animer <code>top</code> ou <code>width</code> oblige le navigateur à <strong>recalculer toute la mise en page</strong> à chaque image — c'est lent, et ça saccade. <code>transform</code> et <code>opacity</code>, eux, sont traités directement par la carte graphique : l'animation reste fluide même sur un téléphone modeste.</p>
<pre class="bloc-code">.carte {
  transition: transform 0.2s;
}
.carte:hover {
  transform: translateY(-4px);
}</pre>

<div class="astuce"><div>Retiens la règle : pour animer, n'utilise que <code>transform</code> et <code>opacity</code>. Si tu te surprends à animer <code>margin</code>, <code>width</code> ou <code>top</code>, il existe presque toujours une façon de faire la même chose avec un transform.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Fais pivoter le carré de <strong>45 degrés</strong> avec <code>transform</code>.',
      codeDepart: '<style>\n  .carre {\n    width: 80px;\n    height: 80px;\n    background: #4f6df5;\n    margin: 40px;\n    /* ta propriété ici */\n\n  }\n</style>\n\n<div class="carre" id="carre"></div>',
      indice: '<code>transform: rotate(45deg);</code>',
      solution: '<style>\n  .carre {\n    width: 80px;\n    height: 80px;\n    background: #4f6df5;\n    margin: 40px;\n    transform: rotate(45deg);\n  }\n</style>\n\n<div class="carre" id="carre"></div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const c = ctx.doc.getElementById('carre');
        if (!c) return { ok: false, message: 'Garde le carré du code de départ.' };
        const t = win.getComputedStyle(c).transform;
        if (t === 'none') return { ok: false, message: 'Aucune transformation appliquée : ajoute <code>transform: rotate(45deg);</code>.' };
        const m = t.match(/matrix\(([^)]+)\)/);
        if (!m) return { ok: false, message: 'Transformation non reconnue : utilise <code>rotate(45deg)</code>.' };
        const a = parseFloat(m[1].split(',')[0]);
        const angle = Math.round(Math.acos(Math.min(1, Math.max(-1, a))) * 180 / Math.PI);
        if (Math.abs(angle - 45) > 3) return { ok: false, message: 'L\'angle mesuré est d\'environ ' + angle + '° — il en faut 45. Vérifie l\'unité : <code>45deg</code>.' };
        return { ok: true, message: 'Le carré a pivoté, et pourtant la place qu\'il occupe dans la page n\'a pas changé d\'un pixel.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> au survol, la carte doit <strong>monter de 6px</strong> et grossir de 5 %, avec une transition douce de 0.2s.',
      codeDepart: '<style>\n  .carte {\n    width: 150px;\n    padding: 20px;\n    background: #eef1fe;\n    border-radius: 12px;\n    /* la transition ici */\n\n  }\n  .carte:hover {\n    /* la transformation ici */\n\n  }\n</style>\n\n<div class="carte" id="carte">Survole-moi</div>',
      indice: 'Sur <code>.carte</code> : <code>transition: transform 0.2s;</code>. Sur <code>.carte:hover</code> : <code>transform: translateY(-6px) scale(1.05);</code>',
      solution: '<style>\n  .carte {\n    width: 150px;\n    padding: 20px;\n    background: #eef1fe;\n    border-radius: 12px;\n    transition: transform 0.2s;\n  }\n  .carte:hover {\n    transform: translateY(-6px) scale(1.05);\n  }\n</style>\n\n<div class="carte" id="carte">Survole-moi</div>',
      verifier: function (ctx) {
        const code = ctx.code.replace(/\s+/g, ' ');
        // Lire le texte du code ne suffit pas : une balise <style> cassée ou une
        // carte effacée laissent les bonnes lignes bien visibles alors que plus
        // rien ne s'applique. On vérifie donc d'abord que la page tient debout.
        if (!ctx.doc.querySelector('style')) return { ok: false, message: 'Ton CSS doit être dans une balise <code>&lt;style&gt;</code> correctement ouverte et fermée — sinon il s\'affiche comme du texte au lieu d\'habiller la page.' };
        if (!ctx.doc.querySelector('.carte')) return { ok: false, message: 'Garde l\'élément <code>&lt;div class="carte"&gt;</code> : c\'est lui que la règle <code>.carte</code> habille, et il n\'y a rien à survoler sans lui.' };
        if (!/transition:[^;]*transform/.test(code)) return { ok: false, message: 'Ajoute <code>transition: transform 0.2s;</code> sur <code>.carte</code> (et non sur le hover).' };
        if (!/:hover\s*\{[^}]*transform:/.test(code)) return { ok: false, message: 'La transformation doit être dans la règle <code>.carte:hover</code>.' };
        const hover = code.match(/:hover\s*\{([^}]*)\}/);
        const dedans = hover ? hover[1] : '';
        if (!/translateY\s*\(\s*-\s*6px\s*\)/.test(dedans)) return { ok: false, message: 'Pour monter, la valeur doit être négative : <code>translateY(-6px)</code>.' };
        if (!/scale\s*\(\s*1\.05\s*\)/.test(dedans)) return { ok: false, message: 'Ajoute <code>scale(1.05)</code> pour agrandir de 5 %.' };
        return { ok: true, message: 'Transform plus transition : l\'effet de survol le plus utilisé du web, et l\'un des plus fluides à afficher.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Pourquoi vaut-il mieux animer <code>transform: translateY(-10px)</code> que <code>top: -10px</code> ?',
      choix: [
        'transform est traité par la carte graphique, sans recalculer la mise en page',
        'top ne fonctionne pas dans les animations',
        'transform est plus court à écrire',
        'top est réservé aux éléments en position absolue'
      ],
      bonne: 0,
      explication: 'Modifier top oblige le navigateur à recalculer la position de tout ce qui suit, à chaque image de l\'animation. transform et opacity sont les deux seules propriétés qu\'il peut déléguer au processeur graphique — d\'où une fluidité très supérieure.',
      aides: [
        null,
        'top s\'anime parfaitement bien — le problème est le coût de calcul, pas la faisabilité.',
        'La longueur du code n\'a rien à voir : c\'est une question de performance à l\'affichage.',
        'C\'est vrai que top demande un positionnement, mais ce n\'est pas la raison pour laquelle on préfère transform.'
      ]
    }
  ]
},

/* ---------- css-23 ---------- */
{
  id: 'css-23',
  titre: 'Flexbox : la répartition de l\'espace',
  contenu: `
<p>Tu sais aligner avec Flexbox. Voici comment contrôler précisément <strong>comment l'espace se distribue</strong> entre les éléments.</p>

<h2>flex-grow : qui prend la place restante ?</h2>
<pre class="bloc-code">.conteneur { display: flex; }
.gauche  { flex-grow: 1; }   /* prend 1 part */
.droite  { flex-grow: 2; }   /* prend 2 parts */</pre>
<p>L'espace <em>disponible</em> est réparti en 3 parts : une pour la gauche, deux pour la droite. Avec <code>flex-grow: 0</code> (le défaut), un élément ne s'étire pas du tout.</p>

<h2>flex-shrink : qui rétrécit quand ça déborde ?</h2>
<pre class="bloc-code">.logo { flex-shrink: 0; }    /* ne rétrécit JAMAIS */</pre>
<p>C'est l'astuce indispensable pour qu'un logo ou une icône ne s'écrase pas quand la place manque.</p>

<h2>flex-basis : la taille de départ</h2>
<pre class="bloc-code">.colonne { flex-basis: 200px; }   /* avant répartition */</pre>

<h2>Le raccourci flex</h2>
<pre class="bloc-code">.element { flex: 1; }            /* = grow 1, shrink 1, basis 0 */
.element { flex: 0 0 200px; }    /* largeur fixe de 200px */</pre>
<p><code>flex: 1</code> est de loin le plus utilisé : « prends toute la place disponible, à égalité avec les autres ».</p>

<h2>align-self et order</h2>
<pre class="bloc-code">.special { align-self: flex-end; }   /* cet élément seul s'aligne en bas */
.premier { order: -1; }              /* passe devant, sans toucher au HTML */</pre>

<div class="astuce"><div>La mise en page classique « barre latérale fixe + contenu élastique » tient en deux lignes : <code>.barre { flex: 0 0 250px; }</code> et <code>.contenu { flex: 1; }</code>.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'La barre latérale doit faire <strong>exactement 120px</strong> et ne jamais rétrécir ; le contenu doit prendre <strong>tout le reste</strong>.',
      codeDepart: '<style>\n  .page { display: flex; gap: 10px; }\n  .barre {\n    background: #4f6df5;\n    color: white;\n    padding: 10px;\n    /* ta règle ici */\n\n  }\n  .contenu {\n    background: #eef1fe;\n    padding: 10px;\n    /* ta règle ici */\n\n  }\n</style>\n\n<div class="page">\n  <div class="barre" id="barre">Menu</div>\n  <div class="contenu" id="contenu">Contenu principal</div>\n</div>',
      indice: 'Sur la barre : <code>flex: 0 0 120px;</code> (ne grandit pas, ne rétrécit pas, base 120px). Sur le contenu : <code>flex: 1;</code>',
      solution: '<style>\n  .page { display: flex; gap: 10px; }\n  .barre {\n    background: #4f6df5;\n    color: white;\n    padding: 10px;\n    flex: 0 0 120px;\n  }\n  .contenu {\n    background: #eef1fe;\n    padding: 10px;\n    flex: 1;\n  }\n</style>\n\n<div class="page">\n  <div class="barre" id="barre">Menu</div>\n  <div class="contenu" id="contenu">Contenu principal</div>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const barre = ctx.doc.getElementById('barre');
        const contenu = ctx.doc.getElementById('contenu');
        if (!barre || !contenu) return { ok: false, message: 'Garde les deux blocs du code de départ.' };
        const sb = win.getComputedStyle(barre);
        if (parseFloat(sb.flexBasis) !== 120) {
          return { ok: false, message: 'La barre doit partir d\'une base de 120px : <code>flex: 0 0 120px;</code>. Sa base actuelle est « ' + sb.flexBasis + ' ».' };
        }
        if (parseFloat(sb.flexGrow) !== 0) return { ok: false, message: 'La barre ne doit pas s\'étirer : le premier nombre de <code>flex</code> (grow) doit valoir 0.' };
        if (parseFloat(sb.flexShrink) !== 0) return { ok: false, message: 'La barre ne doit jamais rétrécir : le second nombre de <code>flex</code> (shrink) doit valoir 0.' };
        const sc = win.getComputedStyle(contenu);
        if (parseFloat(sc.flexGrow) < 1) return { ok: false, message: 'Le contenu doit prendre tout l\'espace restant : ajoute-lui <code>flex: 1;</code>.' };
        const lc = contenu.getBoundingClientRect().width;
        const lb = barre.getBoundingClientRect().width;
        if (lc < lb * 2) return { ok: false, message: 'Le contenu ne s\'étend pas (il fait ' + Math.round(lc) + 'px contre ' + Math.round(lb) + 'px pour la barre).' };
        return { ok: true, message: 'Deux lignes de CSS pour la mise en page la plus répandue du web : barre fixe et contenu élastique. (La barre mesure 140px à l\'écran : 120 de base plus ses 20px de padding — c\'est le modèle de boîte par défaut.)' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> répartis l\'espace pour que la zone de droite soit <strong>deux fois plus large</strong> que celle de gauche, avec <code>flex-grow</code>.',
      codeDepart: '<style>\n  .page { display: flex; gap: 10px; }\n  .zone { padding: 10px; background: #eef1fe; }\n  .gauche { /* ta règle */ }\n  .droite { /* ta règle */ }\n</style>\n\n<div class="page">\n  <div class="zone gauche" id="gauche">Gauche</div>\n  <div class="zone droite" id="droite">Droite</div>\n</div>',
      indice: '<code>.gauche { flex-grow: 1; }</code> et <code>.droite { flex-grow: 2; }</code>',
      solution: '<style>\n  .page { display: flex; gap: 10px; }\n  .zone { padding: 10px; background: #eef1fe; }\n  .gauche { flex-grow: 1; }\n  .droite { flex-grow: 2; }\n</style>\n\n<div class="page">\n  <div class="zone gauche" id="gauche">Gauche</div>\n  <div class="zone droite" id="droite">Droite</div>\n</div>',
      verifier: function (ctx) {
        const g = ctx.doc.getElementById('gauche');
        const d = ctx.doc.getElementById('droite');
        if (!g || !d) return { ok: false, message: 'Garde les deux zones du code de départ.' };
        const lg = g.getBoundingClientRect().width;
        const ld = d.getBoundingClientRect().width;
        if (lg < 20 || ld < 20) return { ok: false, message: 'Les deux zones doivent rester visibles.' };
        const rapport = ld / lg;
        if (rapport < 1.4) return { ok: false, message: 'La zone de droite (' + Math.round(ld) + 'px) n\'est pas assez large par rapport à la gauche (' + Math.round(lg) + 'px). Donne-lui un <code>flex-grow</code> deux fois plus grand.' };
        if (rapport > 3) return { ok: false, message: 'La droite est trop large (rapport de ' + rapport.toFixed(1) + '). Le rapport visé est d\'environ 2.' };
        return { ok: true, message: 'flex-grow répartit l\'espace disponible en parts. C\'est proportionnel, donc ça tient à toutes les tailles d\'écran.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi :</strong> fais passer l\'élément « Priorité » <strong>en premier</strong> visuellement, sans toucher à l\'ordre du HTML.',
      codeDepart: '<style>\n  .liste { display: flex; gap: 10px; }\n  .item { padding: 10px; background: #eef1fe; }\n  .priorite {\n    background: #ffe08a;\n    /* ta règle ici */\n\n  }\n</style>\n\n<div class="liste">\n  <div class="item" id="un">Un</div>\n  <div class="item" id="deux">Deux</div>\n  <div class="item priorite" id="prio">Priorité</div>\n</div>',
      indice: 'Par défaut tous les éléments ont <code>order: 0</code>. Une valeur négative passe devant : <code>order: -1;</code>',
      solution: '<style>\n  .liste { display: flex; gap: 10px; }\n  .item { padding: 10px; background: #eef1fe; }\n  .priorite {\n    background: #ffe08a;\n    order: -1;\n  }\n</style>\n\n<div class="liste">\n  <div class="item" id="un">Un</div>\n  <div class="item" id="deux">Deux</div>\n  <div class="item priorite" id="prio">Priorité</div>\n</div>',
      verifier: function (ctx) {
        const prio = ctx.doc.getElementById('prio');
        const un = ctx.doc.getElementById('un');
        if (!prio || !un) return { ok: false, message: 'Garde les trois éléments du code de départ.' };
        const xPrio = prio.getBoundingClientRect().left;
        const xUn = un.getBoundingClientRect().left;
        if (xPrio >= xUn) return { ok: false, message: 'L\'élément « Priorité » est toujours après les autres. Ajoute-lui <code>order: -1;</code> pour le faire passer devant.' };
        if (!/order\s*:/.test(ctx.code)) return { ok: false, message: 'Utilise la propriété <code>order</code> plutôt que de réorganiser le HTML.' };
        return { ok: true, message: 'L\'ordre visuel change, l\'ordre du HTML reste logique. Attention toutefois : la navigation au clavier suit le HTML, pas l\'affichage — à utiliser avec discernement.' };
      }
    }
  ]
},

/* ---------- css-24 ---------- */
{
  id: 'css-24',
  titre: 'Grid avancé',
  contenu: `
<p>Tu connais les colonnes de Grid. Voici les outils qui rendent une grille réellement adaptative.</p>

<h2>repeat, auto-fit et minmax : la grille qui se réorganise seule</h2>
<pre class="bloc-code">.galerie {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}</pre>
<p>Cette seule ligne remplace toutes les media queries d'une galerie. Elle se lit ainsi : « fais autant de colonnes que possible, chacune d'au moins 200px, et répartis l'espace restant à parts égales ». Sur un grand écran tu obtiens 4 colonnes, sur un téléphone une seule — sans qu'aucun point de rupture n'ait été écrit.</p>

<h2>Les zones nommées</h2>
<pre class="bloc-code">.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "entete entete"
    "menu   contenu"
    "pied   pied";
}

.entete  { grid-area: entete; }
.menu    { grid-area: menu; }
.contenu { grid-area: contenu; }
.pied    { grid-area: pied; }</pre>
<p>La mise en page se <strong>dessine</strong> dans le CSS. C'est lisible d'un coup d'œil, même par quelqu'un qui découvre le projet — et réorganiser la page revient à déplacer des mots.</p>

<h2>S'étendre sur plusieurs cases</h2>
<pre class="bloc-code">.vedette {
  grid-column: span 2;    /* occupe 2 colonnes */
  grid-row: span 2;       /* et 2 lignes */
}</pre>

<div class="astuce"><div>Règle de choix : <strong>Flexbox pour une dimension</strong> (une rangée, une colonne), <strong>Grid pour deux</strong> (une vraie grille). Et les deux se combinent très bien : une grille dont chaque case est un conteneur flex.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée une galerie qui s\'adapte toute seule : autant de colonnes que possible, chacune d\'au moins <strong>150px</strong>, avec un écart de 10px.',
      codeDepart: '<style>\n  .galerie {\n    display: grid;\n    /* tes propriétés ici */\n\n  }\n  .galerie div { background: #4f6df5; color: white; padding: 20px; text-align: center; }\n</style>\n\n<div class="galerie" id="galerie">\n  <div>1</div><div>2</div><div>3</div><div>4</div>\n</div>',
      indice: '<code>grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));</code> et <code>gap: 10px;</code>',
      solution: '<style>\n  .galerie {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));\n    gap: 10px;\n  }\n  .galerie div { background: #4f6df5; color: white; padding: 20px; text-align: center; }\n</style>\n\n<div class="galerie" id="galerie">\n  <div>1</div><div>2</div><div>3</div><div>4</div>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const g = ctx.doc.getElementById('galerie');
        if (!g) return { ok: false, message: 'Garde la galerie du code de départ.' };
        if (!/auto-fit|auto-fill/.test(ctx.code)) return { ok: false, message: 'Utilise <code>repeat(auto-fit, ...)</code> pour que le nombre de colonnes s\'adapte tout seul.' };
        if (!/minmax\s*\(\s*150px/.test(ctx.code)) return { ok: false, message: 'Chaque colonne doit faire au moins 150px : <code>minmax(150px, 1fr)</code>.' };
        const s = win.getComputedStyle(g);
        if (parseFloat(s.gap || s.gridGap || 0) < 8) return { ok: false, message: 'Ajoute <code>gap: 10px;</code> entre les cases.' };
        const colonnes = s.gridTemplateColumns.split(' ').filter(x => x.trim()).length;
        if (colonnes < 2) return { ok: false, message: 'La grille ne produit qu\'une colonne : vérifie ton <code>repeat(auto-fit, minmax(150px, 1fr))</code>.' };
        return { ok: true, message: 'Une ligne de CSS qui remplace toutes les media queries d\'une galerie. C\'est l\'exemple le plus spectaculaire de Grid.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> compose la page avec des <strong>zones nommées</strong> : l\'en-tête sur toute la largeur, puis le menu à gauche et le contenu à droite.',
      codeDepart: '<style>\n  .page {\n    display: grid;\n    grid-template-columns: 120px 1fr;\n    gap: 8px;\n    /* déclare les zones ici */\n\n  }\n  .entete { background: #4f6df5; color: white; padding: 10px; /* grid-area */ }\n  .menu { background: #ffe08a; padding: 10px; /* grid-area */ }\n  .contenu { background: #eef1fe; padding: 10px; /* grid-area */ }\n</style>\n\n<div class="page">\n  <div class="entete" id="entete">En-tête</div>\n  <div class="menu" id="menu">Menu</div>\n  <div class="contenu" id="contenu">Contenu</div>\n</div>',
      indice: 'Dans <code>.page</code> : <code>grid-template-areas: "entete entete" "menu contenu";</code> puis <code>grid-area: entete;</code> dans chaque classe.',
      solution: '<style>\n  .page {\n    display: grid;\n    grid-template-columns: 120px 1fr;\n    gap: 8px;\n    grid-template-areas:\n      "entete entete"\n      "menu contenu";\n  }\n  .entete { background: #4f6df5; color: white; padding: 10px; grid-area: entete; }\n  .menu { background: #ffe08a; padding: 10px; grid-area: menu; }\n  .contenu { background: #eef1fe; padding: 10px; grid-area: contenu; }\n</style>\n\n<div class="page">\n  <div class="entete" id="entete">En-tête</div>\n  <div class="menu" id="menu">Menu</div>\n  <div class="contenu" id="contenu">Contenu</div>\n</div>',
      verifier: function (ctx) {
        if (!/grid-template-areas/.test(ctx.code)) return { ok: false, message: 'Déclare les zones avec <code>grid-template-areas</code>.' };
        const entete = ctx.doc.getElementById('entete');
        const menu = ctx.doc.getElementById('menu');
        const contenu = ctx.doc.getElementById('contenu');
        if (!entete || !menu || !contenu) return { ok: false, message: 'Garde les trois blocs du code de départ.' };
        const re = entete.getBoundingClientRect(), rm = menu.getBoundingClientRect(), rc = contenu.getBoundingClientRect();
        if (re.width < rm.width + rc.width) return { ok: false, message: 'L\'en-tête doit occuper toute la largeur : dans la première rangée, écris <code>"entete entete"</code>.' };
        if (rm.top < re.bottom - 5) return { ok: false, message: 'Le menu doit se trouver sous l\'en-tête.' };
        if (rc.left <= rm.left) return { ok: false, message: 'Le contenu doit être à droite du menu — vérifie la seconde rangée <code>"menu contenu"</code>.' };
        return { ok: true, message: 'La mise en page se lit littéralement dans le CSS. Réorganiser la page revient à déplacer des mots.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi :</strong> dans cette grille de 3 colonnes, fais en sorte que la case « Vedette » occupe <strong>2 colonnes</strong>.',
      codeDepart: '<style>\n  .grille {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 8px;\n  }\n  .case { background: #eef1fe; padding: 20px; text-align: center; }\n  .vedette {\n    background: #ffe08a;\n    /* ta règle ici */\n\n  }\n</style>\n\n<div class="grille">\n  <div class="case vedette" id="vedette">Vedette</div>\n  <div class="case" id="c2">2</div>\n  <div class="case" id="c3">3</div>\n</div>',
      indice: '<code>grid-column: span 2;</code>',
      solution: '<style>\n  .grille {\n    display: grid;\n    grid-template-columns: repeat(3, 1fr);\n    gap: 8px;\n  }\n  .case { background: #eef1fe; padding: 20px; text-align: center; }\n  .vedette {\n    background: #ffe08a;\n    grid-column: span 2;\n  }\n</style>\n\n<div class="grille">\n  <div class="case vedette" id="vedette">Vedette</div>\n  <div class="case" id="c2">2</div>\n  <div class="case" id="c3">3</div>\n</div>',
      verifier: function (ctx) {
        const v = ctx.doc.getElementById('vedette');
        const c2 = ctx.doc.getElementById('c2');
        if (!v || !c2) return { ok: false, message: 'Garde les cases du code de départ.' };
        const lv = v.getBoundingClientRect().width;
        const l2 = c2.getBoundingClientRect().width;
        if (lv < l2 * 1.6) return { ok: false, message: 'La vedette (' + Math.round(lv) + 'px) doit être environ deux fois plus large qu\'une case ordinaire (' + Math.round(l2) + 'px). Utilise <code>grid-column: span 2;</code>.' };
        return { ok: true, message: 'Une case qui déborde sur plusieurs colonnes : c\'est la base de toutes les mises en page façon magazine.' };
      }
    }
  ]
},

/* ---------- css-25 ---------- */
{
  id: 'css-25',
  titre: 'Les valeurs qui s\'adaptent',
  contenu: `
<p>Trois fonctions modernes qui permettent d'écrire un CSS réellement adaptable, sans multiplier les media queries.</p>

<h2>clamp() : une valeur bornée</h2>
<pre class="bloc-code">h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}</pre>
<p>Trois arguments : <strong>minimum, valeur idéale, maximum</strong>. Ici, le titre grandit avec la largeur de l'écran (5vw), mais ne descend jamais sous 1.5rem ni ne dépasse 3rem. Une seule ligne remplace trois media queries — et le résultat est fluide plutôt que par paliers.</p>

<h2>aspect-ratio : garder les proportions</h2>
<pre class="bloc-code">.video {
  width: 100%;
  aspect-ratio: 16 / 9;    /* la hauteur suit automatiquement */
}</pre>
<p>Avant, obtenir ce résultat demandait une bidouille bien connue à base de <code>padding-bottom: 56.25%</code>. Aujourd'hui, une propriété suffit.</p>

<h2>object-fit : cadrer une image</h2>
<pre class="bloc-code">img {
  width: 100%;
  height: 200px;
  object-fit: cover;      /* remplit sans déformer */
}</pre>
<p>Sans <code>object-fit</code>, imposer une largeur et une hauteur à une image l'<strong>écrase</strong>. Avec <code>cover</code>, elle est recadrée intelligemment — exactement comme <code>background-size: cover</code>, mais sur une vraie balise <code>&lt;img&gt;</code> qui garde son <code>alt</code>.</p>

<div class="astuce"><div>Ces trois propriétés ont remplacé des années de contournements. Si tu trouves un tutoriel qui explique le truc du <code>padding-bottom</code> pour les vidéos, c'est qu'il date d'avant 2021 : <code>aspect-ratio</code> fait la même chose en clair.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Donne au titre une taille <strong>fluide</strong> avec <code>clamp()</code> : au minimum 20px, idéalement 5vw, au maximum 48px.',
      codeDepart: '<style>\n  h1 {\n    /* ta propriété ici */\n\n  }\n</style>\n\n<h1 id="titre">Un titre adaptatif</h1>',
      indice: '<code>font-size: clamp(20px, 5vw, 48px);</code>',
      solution: '<style>\n  h1 {\n    font-size: clamp(20px, 5vw, 48px);\n  }\n</style>\n\n<h1 id="titre">Un titre adaptatif</h1>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const t = ctx.doc.getElementById('titre');
        if (!t) return { ok: false, message: 'Garde le titre du code de départ.' };
        if (!/clamp\s*\(/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande la fonction <code>clamp(...)</code>.' };
        const taille = parseFloat(win.getComputedStyle(t).fontSize);
        if (taille < 20 || taille > 48) return { ok: false, message: 'La taille calculée (' + Math.round(taille) + 'px) sort des bornes 20-48px. Vérifie l\'ordre des arguments : minimum, idéal, maximum.' };
        if (!/5vw/.test(ctx.code)) return { ok: false, message: 'La valeur idéale doit dépendre de la largeur de l\'écran : <code>5vw</code>.' };
        return { ok: true, message: 'Le titre grandit avec l\'écran, mais jamais au-delà du raisonnable. Une ligne au lieu de trois media queries.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> donne au bloc vidéo les proportions <strong>16/9</strong> avec <code>aspect-ratio</code>, sans fixer sa hauteur.',
      codeDepart: '<style>\n  .video {\n    width: 320px;\n    background: #333;\n    /* ta propriété ici */\n\n  }\n</style>\n\n<div class="video" id="video"></div>',
      indice: '<code>aspect-ratio: 16 / 9;</code> — la hauteur se calcule toute seule.',
      solution: '<style>\n  .video {\n    width: 320px;\n    background: #333;\n    aspect-ratio: 16 / 9;\n  }\n</style>\n\n<div class="video" id="video"></div>',
      verifier: function (ctx) {
        const v = ctx.doc.getElementById('video');
        if (!v) return { ok: false, message: 'Garde le bloc vidéo du code de départ.' };
        if (/height\s*:/.test(ctx.code.replace(/max-height|min-height/g, ''))) return { ok: false, message: 'Ne fixe pas la hauteur : c\'est <code>aspect-ratio</code> qui doit la calculer.' };
        const r = v.getBoundingClientRect();
        if (r.height < 5) return { ok: false, message: 'Le bloc n\'a aucune hauteur : ajoute <code>aspect-ratio: 16 / 9;</code>.' };
        const rapport = r.width / r.height;
        if (Math.abs(rapport - 16 / 9) > 0.15) return { ok: false, message: 'Le rapport mesuré est de ' + rapport.toFixed(2) + ' au lieu de 1.78 (16/9). Vérifie ta valeur.' };
        return { ok: true, message: 'La hauteur suit la largeur automatiquement, à toutes les tailles d\'écran. Fini le calcul de pourcentage obscur.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi :</strong> l\'image est déformée parce qu\'on lui impose une largeur et une hauteur. Corrige-la avec <code>object-fit</code> pour qu\'elle remplisse le cadre <strong>sans être écrasée</strong>.',
      codeDepart: '<style>\n  img {\n    width: 300px;\n    height: 100px;\n    /* ta propriété ici */\n\n  }\n</style>\n\n<img id="photo" alt="Un rectangle bleu" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%234f6df5\'/%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'60\' fill=\'white\'/%3E%3C/svg%3E">',
      indice: '<code>object-fit: cover;</code> recadre l\'image au lieu de la déformer.',
      solution: '<style>\n  img {\n    width: 300px;\n    height: 100px;\n    object-fit: cover;\n  }\n</style>\n\n<img id="photo" alt="Un rectangle bleu" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'200\'%3E%3Crect width=\'200\' height=\'200\' fill=\'%234f6df5\'/%3E%3Ccircle cx=\'100\' cy=\'100\' r=\'60\' fill=\'white\'/%3E%3C/svg%3E">',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const img = ctx.doc.getElementById('photo');
        if (!img) return { ok: false, message: 'Garde l\'image du code de départ.' };
        const fit = win.getComputedStyle(img).objectFit;
        if (fit === 'fill') return { ok: false, message: 'L\'image est toujours déformée (<code>object-fit: fill</code> par défaut). Ajoute <code>object-fit: cover;</code>.' };
        if (fit !== 'cover') return { ok: false, message: 'Attendu <code>cover</code> pour remplir le cadre — ta valeur est « ' + fit + ' ». (<code>contain</code> laisserait des bandes vides.)' };
        return { ok: true, message: 'Même logique que background-size, mais sur une vraie balise <code>img</code> — donc avec son <code>alt</code> et son accessibilité.' };
      }
    }
  ]
}
];
