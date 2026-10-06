/* ===== CSS — troisième partie (css-16 à css-25) ===== */
window.DATA_CSS3 = [

/* ---------- css-16 ---------- */
{
  id: 'css-16',
  titre: 'Les sélecteurs de combinaison',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu sais viser une balise, une classe, un identifiant. Mais il arrive souvent qu'on veuille viser un élément <em>selon sa place</em> : le paragraphe qui suit un titre, les liens d'un menu et d'aucun autre, le premier enfant d'une carte.</p>
<p>On peut toujours ajouter une classe à chacun. Les combinateurs évitent ce travail — et surtout, ils évitent de devoir y repenser chaque fois que le contenu change.</p>

<h2>Les quatre combinateurs</h2>
<ul>
<li><code>.carte p</code> — <strong>une espace</strong> : tous les paragraphes à l'intérieur d'une carte, même profondément imbriqués ;</li>
<li><code>.carte &gt; p</code> — <strong>le chevron</strong> : seulement les enfants directs ;</li>
<li><code>h2 + p</code> — <strong>le plus</strong> : le paragraphe qui suit immédiatement un titre, et lui seul ;</li>
<li><code>h2 ~ p</code> — <strong>le tilde</strong> : tous les paragraphes qui suivent un titre, au même niveau.</li>
</ul>
<p>L'espace et le chevron descendent dans l'arbre ; le plus et le tilde se déplacent latéralement, entre voisins du même parent.</p>

<h2>Pas à pas</h2>
<p>Sur une carte contenant un titre, deux paragraphes, puis une boîte contenant un troisième paragraphe :</p>
<table class="memo-table trace">
<tr><th>Sélecteur</th><th>Ce qu'il attrape</th></tr>
<tr><td><code>.carte p</code></td><td>les trois paragraphes — l'imbrication n'a pas d'importance</td></tr>
<tr><td><code>.carte &gt; p</code></td><td>les deux premiers : le troisième est dans une boîte</td></tr>
<tr><td><code>h2 + p</code></td><td>le premier seulement</td></tr>
<tr><td><code>h2 ~ p</code></td><td>les deux premiers</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Mettre une espace là où il n'en faut pas.</strong> <code>.rouge.gras</code> vise un élément qui porte <em>les deux</em> classes ; <code>.rouge .gras</code>, avec une espace, vise un élément de classe <code>gras</code> à l'intérieur d'un élément de classe <code>rouge</code>. Une espace, et le sens change complètement. C'est l'erreur la plus difficile à repérer à la relecture.</p>
<p><strong>Descendre trop profond.</strong> <code>.page .contenu .carte .titre span</code> fonctionne, et devient impossible à maintenir : la règle casse dès qu'on déplace un bloc. Deux niveaux suffisent presque toujours ; au-delà, une classe sur l'élément visé est plus solide.</p>
<p><strong>Croire que <code>+</code> regarde en arrière.</strong> Les combinateurs latéraux ne vont que vers l'avant. Il n'existe aucun sélecteur « l'élément qui précède » — une limite assumée, liée à la façon dont le navigateur lit la page, de haut en bas.</p>

<h2>Dans la vraie vie</h2>
<p><code>h2 + p</code> sert à rapprocher un chapeau de son titre. <code>li + li</code> pose une bordure entre les éléments d'une liste, sans en mettre une avant le premier. <code>.menu &gt; li</code> ne vise que le premier niveau d'un menu déroulant, sans toucher aux sous-menus — un cas où le chevron est indispensable.</p>

<div class="a-retenir">
<ul>
<li>Une espace veut dire « à l'intérieur », le chevron « enfant direct ».</li>
<li><code>+</code> vise le voisin immédiat, <code>~</code> tous les suivants du même niveau.</li>
<li><code>.a.b</code> (collés) et <code>.a .b</code> (espacés) ne veulent pas du tout dire la même chose.</li>
<li>Aucun sélecteur ne regarde en arrière.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le navigateur lit de droite à gauche</summary>
<p>Pour <code>.page .carte p</code>, il ne cherche pas les <code>.page</code> : il part de <em>tous</em> les paragraphes, puis remonte vérifier leurs ancêtres. C'est plus efficace, et ça explique pourquoi un sélecteur très long coûte plus cher qu'un sélecteur court. Sur une page ordinaire la différence est imperceptible — mais c'est une bonne raison de plus de ne pas empiler cinq niveaux.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Mets en <strong>rouge</strong> uniquement les paragraphes qui sont <strong>enfants directs</strong> de <code>.carte</code>. Le paragraphe imbriqué plus profond ne doit pas changer.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<div class="carte">\n  <p id="direct">Directement dans la carte</p>\n  <div>\n    <p id="profond">Plus profond</p>\n  </div>\n</div>',
      indices: [
        "Un sélecteur séparé par une espace vise <em>tous</em> les descendants, à n’importe quelle profondeur. Ici on ne veut que le premier niveau.",
        "Le chevron <code>&gt;</code> restreint aux <strong>enfants directs</strong> : les petits-enfants sont exclus.",
        "<code>.carte &gt; p { color: red; }</code>"
      ],
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
      indices: [
        "On ne vise pas un enfant mais un <strong>voisin</strong> : l’élément qui suit immédiatement, au même niveau.",
        "Le <code>+</code> désigne le frère immédiat — et seulement lui.",
        "<code>h2 + p { font-weight: bold; }</code>"
      ],
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
      indices: [
        "Même idée qu’au précédent, mais sans s’arrêter au premier voisin.",
        "Le tilde <code>~</code> vise <strong>tous</strong> les frères qui suivent, pas seulement le suivant immédiat.",
        "<code>h2 ~ p { font-style: italic; }</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Certains éléments se distinguent par un <strong>attribut</strong>, pas par une classe. Un champ désactivé porte <code>disabled</code>, un champ d'adresse électronique porte <code>type="email"</code>, un lien externe commence par <code>https</code>.</p>
<p>Ces informations sont déjà dans le HTML. Leur ajouter une classe serait les écrire deux fois — avec le risque que les deux se désynchronisent.</p>

<h2>Les formes</h2>
<ul>
<li><code>[disabled]</code> — l'attribut existe, quelle que soit sa valeur ;</li>
<li><code>[type="email"]</code> — il vaut exactement « email » ;</li>
<li><code>[href^="https"]</code> — il <strong>commence</strong> par « https » ;</li>
<li><code>[href$=".pdf"]</code> — il <strong>finit</strong> par « .pdf » ;</li>
<li><code>[href*="exemple"]</code> — il <strong>contient</strong> « exemple ».</li>
</ul>
<p>Les trois symboles se retiennent par analogie : <code>^</code> est le signe du début en expression régulière, <code>$</code> celui de la fin, et <code>*</code> évoque « n'importe où ».</p>
<pre class="bloc-code">a[href$=".pdf"]::after {
  content: " (PDF)";
}

input[required] {
  border-left: 3px solid orange;
}</pre>

<h2>Pas à pas</h2>
<p>Sur quatre liens, voyons ce que chaque sélecteur attrape :</p>
<table class="memo-table trace">
<tr><th>Le lien pointe vers</th><th>[href^="https"]</th><th>[href$=".pdf"]</th></tr>
<tr><td>https://exemple.com</td><td>oui</td><td>non</td></tr>
<tr><td>https://exemple.com/notice.pdf</td><td>oui</td><td>oui</td></tr>
<tr><td>page2.html</td><td>non</td><td>non</td></tr>
<tr><td>/docs/guide.pdf</td><td>non</td><td>oui</td></tr>
</table>
<p>Les deux sélecteurs sont indépendants et peuvent se cumuler : <code>a[href^="https"][href$=".pdf"]</code> ne vise que la deuxième ligne.</p>

<h2>Les pièges</h2>
<p><strong>Oublier les guillemets.</strong> <code>[type=email]</code> fonctionne tant que la valeur est un mot simple, et casse dès qu'elle contient une espace ou un tiret. Mets-les toujours : tu n'auras pas à te demander si ce cas-ci en a besoin.</p>
<p><strong>Confondre <code>^</code> et <code>*</code>.</strong> <code>[href*="https"]</code> attrape aussi une adresse qui contient « https » <em>au milieu</em> — par exemple une adresse de redirection. Pour un vrai test de début, c'est <code>^</code>.</p>
<p><strong>Croire que ça remplace une classe.</strong> Un sélecteur d'attribut dépend de la <em>valeur</em> écrite dans le HTML. Si quelqu'un change une adresse, ton style disparaît sans prévenir. C'est excellent pour les attributs structurels — <code>type</code>, <code>disabled</code>, <code>required</code> — et fragile pour le reste.</p>

<h2>Le cas des attributs data-</h2>
<p>Les sélecteurs d'attribut prennent tout leur sens avec les <code>data-</code>, ces informations qu'on range soi-même dans le HTML. Un article marqué <code>data-stock="0"</code> peut être grisé par une seule règle :</p>
<pre class="bloc-code">.article[data-stock="0"] {
  opacity: 0.5;
}</pre>
<p>L'information n'est écrite qu'une fois, là où elle a du sens — dans le HTML — et le style la suit. Le jour où le stock change, rien à faire du côté du CSS.</p>

<h2>Dans la vraie vie</h2>
<p>Marquer les liens externes d'une flèche, signaler les liens de téléchargement, griser les champs désactivés, repérer les champs obligatoires : tout cela se fait sans toucher au HTML. Les bibliothèques de composants s'en servent énormément — un menu déroulant change d'apparence selon un <code>data-etat="ouvert"</code> posé par le JavaScript, sans qu'il ait à manipuler la moindre classe.</p>

<div class="a-retenir">
<ul>
<li><code>[attribut]</code> teste l'existence, <code>[attribut="valeur"]</code> l'égalité exacte.</li>
<li><code>^=</code> pour le début, <code>$=</code> pour la fin, <code>*=</code> pour « contient ».</li>
<li>Les guillemets autour de la valeur, toujours.</li>
<li>Idéal pour les attributs structurels ; fragile pour ceux qui changent souvent.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : ignorer la casse</summary>
<p>Un <code>i</code> avant le crochet fermant rend la comparaison insensible aux majuscules : <code>[href$=".PDF" i]</code> attrape aussi <code>.pdf</code> et <code>.Pdf</code>. C'est précieux sur des adresses venues d'un serveur qu'on ne contrôle pas, où la casse des extensions n'est jamais garantie.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Donne une bordure bleue de 2px uniquement au champ dont le <code>type</code> vaut <code>email</code>. Le champ texte ne doit pas changer.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<input type="text" id="texte" placeholder="Nom">\n<input type="email" id="mail" placeholder="Email">',
      indices: [
        "Les deux champs sont des <code>input</code> : le nom de balise ne suffit pas à les distinguer. Ce qui les sépare est un attribut.",
        "Un sélecteur d’attribut s’écrit entre crochets, juste après la balise, avec la valeur entre guillemets.",
        "<code>input[type=\"email\"] { border: 2px solid blue; }</code>"
      ],
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
      indices: [
        "On ne cherche pas une valeur exacte mais une <strong>terminaison</strong>. Le sélecteur d’attribut sait faire cela.",
        "Un symbole glissé avant le <code>=</code> change le sens : le dollar veut dire « se termine par ».",
        "<code>a[href$=\".pdf\"] { color: red; }</code>"
      ],
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
      indices: [
        "<code>disabled</code> n’a pas de valeur : il est là, ou il n’est pas là. On teste donc sa seule présence.",
        "Les crochets avec le seul nom de l’attribut suffisent — pas de <code>=</code>, pas de guillemets.",
        "<code>button[disabled] { opacity: 0.5; }</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Trois situations reviennent sans cesse, et chacune demandait autrefois des contorsions : styler tout <em>sauf</em> un élément, appliquer la même règle à plusieurs sélecteurs sans tout réécrire, et styler un parent <em>selon ce qu'il contient</em>.</p>
<p>Trois pseudo-classes modernes règlent les trois. La dernière, <code>:has</code>, faisait partie des manques les plus anciens du langage.</p>

<h2>:not — tout sauf</h2>
<pre class="bloc-code">li:not(.actif) {
  opacity: 0.6;
}</pre>
<p>Sans elle, il fallait deux règles : styler tous les <code>li</code>, puis annuler pour l'actif. Une règle au lieu de deux, et surtout plus aucun risque d'oublier d'annuler quelque chose.</p>

<h2>:is — factoriser</h2>
<pre class="bloc-code">:is(h1, h2, h3) + p {
  margin-top: 0;
}</pre>
<p>Équivaut à écrire trois sélecteurs séparés par des virgules — en beaucoup plus court dès que la partie commune est longue.</p>

<h2>:has — le parent qui dépend de son contenu</h2>
<pre class="bloc-code">.carte:has(img) {
  padding: 0;
}</pre>
<p>« Une carte <em>qui contient</em> une image. » Pendant vingt ans, le CSS ne savait pas faire ça : un sélecteur ne pouvait que descendre. On passait donc par du JavaScript, pour ajouter une classe au parent. Aujourd'hui, une ligne suffit.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>On veut</th><th>Avant</th><th>Maintenant</th></tr>
<tr><td>tout sauf l'actif</td><td>deux règles, dont une d'annulation</td><td><code>:not(.actif)</code></td></tr>
<tr><td>la même règle pour 3 titres</td><td>trois sélecteurs recopiés</td><td><code>:is(h1, h2, h3)</code></td></tr>
<tr><td>un parent selon son contenu</td><td>du JavaScript</td><td><code>:has(img)</code></td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Empiler les <code>:not</code>.</strong> <code>li:not(.a):not(.b):not(.c)</code> fonctionne, et devient illisible. Au troisième, une classe posée sur les éléments concernés est plus claire.</p>
<p><strong>Oublier que <code>:is</code> prend la spécificité du plus fort.</strong> <code>:is(#menu, .carte)</code> hérite du poids de l'identifiant, même quand c'est la carte qui correspond. Pour factoriser sans alourdir, il existe <code>:where</code>, identique mais de poids nul — bien plus prévisible dans une feuille de style partagée.</p>
<p><strong>Mettre <code>:has</code> partout.</strong> Il oblige le navigateur à regarder en avant dans l'arbre, ce qui coûte plus cher que les autres sélecteurs. Sur quelques règles, invisible ; sur une feuille entière écrite comme ça, perceptible.</p>

<h2>Elles acceptent des listes</h2>
<p>Les trois prennent plusieurs sélecteurs, séparés par des virgules, et correspondent dès que l'un d'eux correspond :</p>
<pre class="bloc-code">.carte:not(.active, .desactivee) {
  border-color: grey;
}</pre>
<p>Une carte qui n'est ni active ni désactivée. Cette écriture est récente — longtemps, <code>:not</code> n'acceptait qu'un seul argument, et il fallait les enchaîner. Si tu croises du code avec trois <code>:not</code> collés les uns aux autres, c'est l'ancienne forme.</p>

<h2>Dans la vraie vie</h2>
<p><code>:has</code> a changé des habitudes bien installées. Un formulaire peut maintenant signaler une erreur sur la ligne entière — <code>.ligne:has(input:invalid)</code> — alors qu'il fallait auparavant du JavaScript pour poser une classe sur le parent. Beaucoup de code écrit dans les années 2010 n'existait que pour contourner ce manque, et peut aujourd'hui être supprimé.</p>

<div class="a-retenir">
<ul>
<li><code>:not()</code> exclut, <code>:is()</code> factorise, <code>:has()</code> regarde le contenu.</li>
<li><code>:is()</code> prend la spécificité de son argument le plus fort ; <code>:where()</code> ne pèse rien.</li>
<li><code>:has()</code> permet enfin de styler un parent selon ce qu'il contient.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi :has a tant tardé</summary>
<p>Le navigateur lit la page de haut en bas, et applique les styles au fur et à mesure. Savoir si un élément contient une image demande de connaître la suite — donc, en principe, d'attendre. Pendant des années, cela a été jugé trop coûteux. Les moteurs modernes ont fini par trouver comment le faire sans tout ralentir, et <code>:has</code> est arrivé dans tous les navigateurs en 2023.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Rends à moitié transparents tous les <code>li</code> <strong>sauf</strong> celui qui a la classe <code>actif</code>, en une seule règle avec <code>:not</code>.',
      codeDepart: '<style>\n  /* ta règle ici */\n\n</style>\n\n<ul>\n  <li id="a">Accueil</li>\n  <li id="b" class="actif">Produits</li>\n  <li id="c">Contact</li>\n</ul>',
      indices: [
        "Une seule règle pour « tous sauf un » : il existe un sélecteur qui exclut.",
        "<code>:not()</code> prend entre parenthèses ce qu’il faut écarter.",
        "<code>li:not(.actif) { opacity: 0.5; }</code>"
      ],
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
      indices: [
        "Sans raccourci, il faudrait écrire trois sélecteurs presque identiques. <code>:is()</code> les regroupe.",
        "Attention à l’espace avant <code>:is</code> : elle signifie « à l’intérieur de <code>article</code> ».",
        "<code>article :is(h1, h2, h3) { color: navy; }</code>"
      ],
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
      indices: [
        "Jusqu’ici, le CSS ne savait viser qu’en descendant. <code>:has()</code> fait l’inverse : il sélectionne un parent d’après son contenu.",
        "On vise la carte, et entre parenthèses on décrit ce qu’elle doit contenir.",
        "<code>.carte:has(img) { background-color: yellow; }</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Tu as écrit une règle, elle est correcte, et elle ne s'applique pas. C'est la situation la plus frustrante du CSS, et la plus courante. La cause est presque toujours la même : une autre règle, écrite ailleurs, l'emporte.</p>
<p>Ce n'est pas un bug. Le conflit entre règles est prévu par le langage, et arbitré par un calcul précis qu'on peut apprendre en cinq minutes — après quoi le CSS cesse d'être imprévisible.</p>

<h2>Le calcul en trois nombres</h2>
<p>Chaque sélecteur reçoit un score à trois chiffres : <strong>(identifiants, classes, balises)</strong>.</p>
<table class="memo-table trace">
<tr><th>Sélecteur</th><th>Score</th><th>Pourquoi</th></tr>
<tr><td><code>p</code></td><td>0-0-1</td><td>une balise</td></tr>
<tr><td><code>.rouge</code></td><td>0-1-0</td><td>une classe</td></tr>
<tr><td><code>#menu</code></td><td>1-0-0</td><td>un identifiant</td></tr>
<tr><td><code>.carte p</code></td><td>0-1-1</td><td>une classe et une balise</td></tr>
<tr><td><code>#menu .item a</code></td><td>1-1-1</td><td>un de chaque</td></tr>
</table>
<p>On compare chiffre par chiffre, de gauche à droite, et le premier écart tranche. Conséquence qui surprend : <strong>aucune accumulation de classes ne battra jamais un seul identifiant</strong>. Même <code>.a.b.c.d.e</code>, à 0-5-0, perd contre <code>#x</code>, à 1-0-0.</p>

<h2>Pas à pas</h2>
<p>Un paragraphe <code>&lt;p id="titre" class="rouge"&gt;</code>, visé par trois règles. Mesuré :</p>
<table class="memo-table trace">
<tr><th>Règle</th><th>Score</th><th>Verdict</th></tr>
<tr><td><code>p { color: blue; }</code></td><td>0-0-1</td><td>perd</td></tr>
<tr><td><code>.rouge { color: red; }</code></td><td>0-1-0</td><td>perd</td></tr>
<tr><td><code>#titre { color: green; }</code></td><td>1-0-0</td><td><strong>gagne</strong> — le texte est vert</td></tr>
</table>
<p>Et à score identique ? La <strong>dernière écrite</strong> l'emporte. C'est la seule situation où l'ordre compte.</p>

<h2>Les pièges</h2>
<p><strong>Croire que la dernière règle gagne toujours.</strong> Elle ne gagne qu'à score égal. Une règle de classe écrite en premier bat une règle de balise écrite en dernier — et c'est l'origine de la plupart des « mais ma règle est pourtant en bas ! ».</p>
<p><strong>Répondre à un conflit en montant d'un cran.</strong> La tentation est d'ajouter un identifiant, ou un sélecteur plus long, pour forcer le passage. Chaque surenchère rend la suivante plus difficile, et la feuille de style devient une course aux armements. La bonne réponse est de <em>baisser</em> le poids de la règle adverse.</p>
<p><strong>Utiliser <code>!important</code>.</strong> Il écrase tout, y compris les identifiants. Et il ne se bat plus qu'avec un autre <code>!important</code> — placé plus bas. On le réserve à un seul cas honnête : surcharger une bibliothèque extérieure qu'on ne peut pas modifier.</p>

<h2>Dans la vraie vie</h2>
<p>L'inspecteur du navigateur affiche toutes les règles qui visent un élément, les perdantes <strong>barrées</strong>, dans l'ordre de priorité. C'est le moyen le plus rapide de comprendre un conflit — et il montre le résultat du calcul, sans avoir à le faire.</p>
<p>Les équipes qui souffrent le moins de spécificité sont celles qui n'emploient que des classes, toutes au même niveau : à score égal partout, seul l'ordre compte, et l'ordre se lit.</p>

<div class="a-retenir">
<ul>
<li>Le score s'écrit (identifiants, classes, balises) et se compare de gauche à droite.</li>
<li>Un identifiant bat n'importe quel nombre de classes.</li>
<li>À score égal, la dernière règle écrite gagne — c'est le seul cas où l'ordre compte.</li>
<li><code>!important</code> écrase tout, et n'a qu'un usage honnête : surcharger du code extérieur.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les couches en cascade</summary>
<p>Une addition récente, <code>@layer</code>, permet de déclarer des couches ordonnées : tout ce qui est dans une couche supérieure gagne, <em>quelle que soit</em> la spécificité. On peut ainsi ranger une bibliothèque extérieure dans une couche basse et son propre CSS dans une couche haute — et surcharger ses règles avec un simple sélecteur de classe, sans jamais écrire <code>!important</code>.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le paragraphe doit finir en <strong>vert</strong>. Sans supprimer ni modifier la règle <code>p</code> existante, ajoute une règle <strong>plus spécifique</strong> qui l\'emporte.',
      codeDepart: '<style>\n  p { color: red; }\n  /* ajoute ta règle ici */\n\n</style>\n\n<p class="special" id="cible">Ce texte doit devenir vert.</p>',
      indices: [
        "On ne peut pas toucher à la règle existante : il faut donc en écrire une qui la <strong>batte</strong>.",
        "La spécificité se compte en trois chiffres : id, classe, balise. Une classe l’emporte toujours sur une balise, quel que soit l’ordre.",
        "<code>.special { color: green; }</code>"
      ],
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
      indices: [
        "<code>!important</code> écrase tout, y compris les règles plus précises. C’est justement pour cela qu’on l’évite.",
        "La bonne solution n’est pas d’en ajouter un autre : c’est de retirer celui qui est là.",
        "Une fois <code>!important</code> retiré, la classe l’emporte naturellement sur la balise."
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Deux questions se posent dès qu'une page devient dense. Que faire d'un contenu trop grand pour sa boîte ? Et quand deux éléments se superposent, lequel passe devant ?</p>
<p>Les deux propriétés de cette leçon y répondent — et toutes deux réservent une surprise.</p>

<h2>overflow : le contenu qui déborde</h2>
<ul>
<li><code>visible</code> — il déborde et reste visible. C'est le défaut ;</li>
<li><code>hidden</code> — ce qui dépasse est coupé ;</li>
<li><code>scroll</code> — une barre de défilement, toujours affichée ;</li>
<li><code>auto</code> — une barre, seulement si nécessaire. C'est presque toujours le bon choix.</li>
</ul>
<p>Un point mesuré, qui compte : <code>overflow: hidden</code> ne <em>réduit</em> rien. Un bloc de 400 pixels dans un conteneur de 100 mesure toujours 400 pixels — il n'en est visible que 100. Le contenu est caché, pas redimensionné.</p>

<h2>Pas à pas : z-index ne marche pas seul</h2>
<p>Voici le piège le plus déroutant du CSS, mesuré sur deux carrés superposés. Le rouge vient en premier dans le HTML, avec <code>z-index: 99</code> ; le bleu vient après, sans rien :</p>
<table class="memo-table trace">
<tr><th>Le rouge a…</th><th>Qui est devant</th></tr>
<tr><td><code>z-index: 99</code> seul</td><td><strong>le bleu</strong> — le z-index est ignoré</td></tr>
<tr><td><code>z-index: 99</code> + <code>position: relative</code></td><td>le rouge, enfin</td></tr>
</table>
<p>La règle est sans exception : <strong><code>z-index</code> n'a aucun effet sur un élément non positionné</strong>. Il faut une <code>position</code> autre que <code>static</code> — <code>relative</code> suffit, même sans décalage.</p>
<p>Et par défaut, sans z-index du tout, c'est le <em>dernier écrit</em> qui passe devant. D'où le réflexe à avoir : si ton z-index ne fait rien, ne l'augmente pas — ajoute <code>position: relative</code>.</p>

<h2>Les pièges</h2>
<p><strong>Monter le z-index indéfiniment.</strong> <code>z-index: 9999</code> est le symptôme d'un problème mal compris. Soit l'élément n'est pas positionné — et aucune valeur ne marchera — soit il est pris dans un contexte d'empilement dont il ne peut pas sortir.</p>
<p><strong>Un parent qui emprisonne ses enfants.</strong> Un élément positionné avec un z-index crée un <strong>contexte d'empilement</strong> : ses enfants ne peuvent plus passer devant ses voisins à lui, quelle que soit leur valeur. Une infobulle enfermée dans une carte au z-index bas restera derrière la carte d'à côté. C'est la vraie raison des z-index qui « ne marchent pas ».</p>
<p><strong>Mettre <code>overflow: hidden</code> pour cacher un débordement.</strong> Ça masque le symptôme, et ça coupe parfois une infobulle ou un menu déroulant qui avaient besoin de sortir. Mieux vaut d'abord comprendre pourquoi le contenu déborde.</p>

<h2>Dans la vraie vie</h2>
<p><code>overflow: auto</code> sert aux zones de code et aux tableaux larges sur mobile. <code>overflow: hidden</code> sert à découper une image dans un cadre arrondi. Quant aux z-index, les équipes sérieuses en définissent une petite échelle — 10 pour les menus, 100 pour les fenêtres modales, 1000 pour les notifications — plutôt que de laisser chacun improviser.</p>

<div class="a-retenir">
<ul>
<li><code>overflow: auto</code> dans le doute ; <code>hidden</code> coupe sans redimensionner.</li>
<li><code>z-index</code> est ignoré si l'élément n'est pas positionné.</li>
<li>Sans z-index, c'est le dernier élément écrit qui passe devant.</li>
<li>Un parent positionné enferme ses enfants dans son propre contexte d'empilement.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : ce qui crée un contexte d'empilement</summary>
<p><code>position</code> et <code>z-index</code> ne sont pas les seuls. Une <code>opacity</code> inférieure à 1, un <code>transform</code>, un <code>filter</code> en créent aussi — sans qu'on l'ait demandé. C'est ce qui explique les cas les plus obscurs : on ajoute une animation sur une carte, et une infobulle qui fonctionnait se met à passer derrière. L'inspecteur signale ces contextes, et c'est souvent la seule façon de s'en sortir.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'La boîte fait 80px de haut mais son contenu déborde. Ajoute une <strong>barre de défilement verticale</strong> qui n\'apparaît que si nécessaire.',
      codeDepart: '<style>\n  .boite {\n    height: 80px;\n    width: 200px;\n    border: 2px solid #333;\n    /* ta propriété ici */\n\n  }\n</style>\n\n<div class="boite" id="boite">\n  <p>Ligne 1</p>\n  <p>Ligne 2</p>\n  <p>Ligne 3</p>\n  <p>Ligne 4</p>\n  <p>Ligne 5</p>\n</div>',
      indices: [
        "Le contenu déborde. On peut le couper, ou permettre de le faire défiler — ici, c’est la seconde option.",
        "<code>auto</code> n’affiche la barre que si elle est nécessaire, contrairement à <code>scroll</code> qui la montre toujours.",
        "<code>overflow: auto;</code>"
      ],
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
      indices: [
        "Le <code>z-index</code> est bien écrit, et pourtant il ne fait rien. C’est qu’il a une condition d’existence.",
        "<code>z-index</code> est ignoré sur un élément en <code>position: static</code> — la valeur par défaut. Il faut le positionner pour qu’il compte.",
        "Ajoute <code>position: relative;</code> au carré bleu."
      ],
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
      indices: [
        "Cette fois on ne veut pas de barre de défilement : ce qui dépasse doit disparaître.",
        "C’est la même propriété qu’à l’exercice sur le débordement, avec une autre valeur.",
        "<code>overflow: hidden;</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Tu as posé des couleurs de fond. Mais une bannière avec une photo, une texture derrière un bloc, un dégradé par-dessus une image : tout cela passe par la même famille de propriétés, et <code>background</code> en cache en réalité cinq.</p>
<p>Les piloter séparément évite une mauvaise surprise fréquente, sur laquelle on revient plus bas.</p>

<h2>Les cinq réglages</h2>
<pre class="bloc-code">.banniere {
  background-color: #333;
  background-image: url("photo.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}</pre>
<ul>
<li><code>background-color</code> — la couleur, visible là où l'image ne couvre pas ;</li>
<li><code>background-image</code> — le fichier, ou un dégradé ;</li>
<li><code>background-size</code> — comment l'image remplit la boîte ;</li>
<li><code>background-position</code> — quelle partie reste visible si l'image est recadrée ;</li>
<li><code>background-repeat</code> — si elle se répète en mosaïque.</li>
</ul>

<h2>cover ou contain</h2>
<p>Deux valeurs de <code>background-size</code> répondent à deux besoins opposés, et les confondre est l'erreur la plus visible :</p>
<table class="memo-table trace">
<tr><th>Valeur</th><th>Ce qu'elle garantit</th><th>Ce qu'elle sacrifie</th></tr>
<tr><td><code>cover</code></td><td>la boîte est entièrement remplie</td><td>une partie de l'image est coupée</td></tr>
<tr><td><code>contain</code></td><td>l'image est entièrement visible</td><td>des bandes vides apparaissent</td></tr>
</table>
<p>Pour une bannière, c'est <code>cover</code> : mieux vaut recadrer que laisser des vides. Pour un logo ou un schéma, c'est <code>contain</code> : on ne coupe pas un logo.</p>
<p>Avec <code>cover</code>, <code>background-position</code> décide de ce qui survit au recadrage. <code>center</code> convient presque toujours ; sur un portrait, <code>top</code> évite de couper les têtes.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'on écrit</th><th>Ce qu'on voit</th></tr>
<tr><td>une image seule</td><td>à sa taille réelle, répétée en mosaïque si elle est plus petite que la boîte</td></tr>
<tr><td>+ <code>no-repeat</code></td><td>une seule fois, en haut à gauche</td></tr>
<tr><td>+ <code>size: cover</code></td><td>agrandie jusqu'à remplir, le débord coupé</td></tr>
<tr><td>+ <code>position: center</code></td><td>recadrée autour du centre</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Le raccourci qui efface tout.</strong> <code>background: red;</code> ne se contente pas de poser une couleur : il <em>réinitialise</em> les quatre autres réglages. Une image définie plus haut disparaît, sans message. Quand tu ne veux changer qu'une chose, écris la propriété complète.</p>
<p><strong>Oublier les guillemets dans <code>url()</code>.</strong> Souvent toléré, et rompu dès que le chemin contient une espace ou une parenthèse.</p>
<p><strong>Du texte sur une photo, sans précaution.</strong> Une photo a des zones claires et des zones sombres : un texte blanc lisible sur l'une devient invisible sur l'autre. On pose un voile entre les deux — un dégradé semi-transparent dans la même propriété, avant l'image, séparé par une virgule.</p>

<h2>Dans la vraie vie</h2>
<p>Toutes les grandes bannières de site fonctionnent ainsi : <code>cover</code>, <code>center</code>, <code>no-repeat</code>, et un voile sombre par-dessus pour que le titre reste lisible. C'est devenu une combinaison si standard qu'on la reconnaît d'un coup d'œil.</p>

<div class="a-retenir">
<ul>
<li><code>background</code> est un raccourci qui réinitialise les cinq réglages : attention aux effacements silencieux.</li>
<li><code>cover</code> remplit en coupant, <code>contain</code> montre tout en laissant des vides.</li>
<li><code>background-position</code> choisit ce qui survit au recadrage.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : plusieurs fonds superposés</summary>
<p>Une même propriété accepte plusieurs images séparées par des virgules — la première passe devant. C'est ainsi qu'on pose un dégradé sombre par-dessus une photo en une seule déclaration. Chaque réglage accepte alors lui aussi une liste, dans le même ordre. C'est puissant, et vite illisible au-delà de deux couches.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Fais en sorte que l\'image de fond <strong>remplisse toute la boîte</strong> sans se répéter, et qu\'elle soit centrée.',
      codeDepart: '<style>\n  .banniere {\n    height: 150px;\n    background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'60\'%3E%3Crect width=\'100\' height=\'60\' fill=\'%234f6df5\'/%3E%3C/svg%3E");\n    /* tes propriétés ici */\n\n  }\n</style>\n\n<div class="banniere" id="banniere"></div>',
      indices: [
        "Trois défauts à corriger : l’image se répète, elle n’est pas dimensionnée, et elle est calée en haut à gauche.",
        "<code>cover</code> remplit la boîte quitte à rogner ; <code>no-repeat</code> empêche la répétition ; <code>center</code> recentre.",
        "<code>background-size: cover; background-repeat: no-repeat; background-position: center;</code>"
      ],
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
      indices: [
        "Un élément peut porter <strong>plusieurs</strong> fonds superposés, séparés par une virgule.",
        "Le premier de la liste est celui du dessus. Le voile doit donc venir <strong>avant</strong> l’image.",
        "<code>background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(…);</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Déplacer un élément de dix pixels avec <code>margin-left</code> fonctionne — et pousse tous ses voisins. Agrandir une carte avec <code>width</code> décale tout ce qui l'entoure. Pour une animation au survol, c'est catastrophique : la page entière frémit à chaque passage de souris.</p>
<p><code>transform</code> règle exactement ce problème : il modifie l'apparence d'un élément <strong>sans déranger la mise en page</strong>.</p>

<h2>Les quatre fonctions</h2>
<ul>
<li><code>translate(20px, 10px)</code> — déplace de 20 à droite, 10 vers le bas ;</li>
<li><code>scale(1.2)</code> — agrandit de 20 % ;</li>
<li><code>rotate(45deg)</code> — fait pivoter ;</li>
<li><code>skew(10deg)</code> — incline.</li>
</ul>
<p>Elles se combinent sur une seule ligne, séparées par des espaces : <code>transform: translateY(-4px) scale(1.02);</code> — le petit soulèvement au survol d'une carte.</p>

<h2>Pas à pas : la place reste la même</h2>
<p>Mesuré sur deux blocs empilés, le premier agrandi au double :</p>
<table class="memo-table trace">
<tr><th>Situation</th><th>Position du second bloc</th></tr>
<tr><td>sans transform</td><td>28 px du haut</td></tr>
<tr><td>le premier en <code>scale(2)</code></td><td><strong>28 px</strong> — il n'a pas bougé</td></tr>
</table>
<p>Le premier bloc paraît deux fois plus grand, et déborde par-dessus son voisin. Mais la place qu'il <em>occupe</em> dans le flux n'a pas changé d'un pixel. C'est à la fois sa grande force et son principal piège : un élément transformé peut en recouvrir un autre sans que rien ne le signale.</p>

<h2>Pourquoi c'est fluide</h2>
<p>Il y a une raison technique, et elle vaut d'être connue. Modifier <code>width</code> ou <code>margin</code> oblige le navigateur à recalculer la position de tout ce qui suit, puis à redessiner. Un <code>transform</code>, lui, ne change aucune position : le navigateur peut confier la transformation à la carte graphique, qui la traite sans rien recalculer.</p>
<p>C'est pourquoi <code>transform</code> et <code>opacity</code> sont les deux seules propriétés qu'on anime sans crainte.</p>

<h2>Les pièges</h2>
<p><strong>Écrire deux <code>transform</code> dans la même règle.</strong> La seconde écrase la première, comme pour n'importe quelle propriété. Il faut tout mettre sur une seule ligne.</p>
<p><strong>L'ordre des fonctions compte.</strong> <code>rotate(45deg) translateX(20px)</code> et <code>translateX(20px) rotate(45deg)</code> ne donnent pas le même résultat : dans le premier cas, le déplacement suit l'axe déjà tourné. Elles s'appliquent de droite à gauche.</p>
<p><strong>Oublier qu'un <code>transform</code> crée un contexte d'empilement.</strong> Un élément transformé devient une référence pour ses enfants en position absolue, et peut emprisonner leurs z-index. C'est la cause de bien des infobulles qui passent soudain derrière leur voisine après l'ajout d'une animation.</p>

<h2>Dans la vraie vie</h2>
<p>La carte qui se soulève au survol, l'icône qui pivote quand un menu s'ouvre, l'image qui zoome doucement dans son cadre — toutes en <code>transform</code>. Les panneaux latéraux qui glissent depuis le bord de l'écran aussi : <code>translateX</code> de 100 % à 0, sans jamais toucher à la mise en page.</p>

<div class="a-retenir">
<ul>
<li><code>transform</code> change l'apparence sans modifier la place occupée — les voisins ne bougent pas.</li>
<li>Les fonctions se combinent sur une seule ligne, et leur ordre change le résultat.</li>
<li>C'est la propriété la plus fluide à animer, parce qu'elle ne fait rien recalculer.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : déplacer le point de pivot</summary>
<p>Par défaut, tout tourne et s'agrandit autour du <em>centre</em> de l'élément. <code>transform-origin</code> déplace ce point : <code>left center</code> fait pivoter autour du bord gauche, comme une porte sur ses gonds. C'est indispensable pour une aiguille d'horloge, ou pour un menu qui se déplie depuis son coin supérieur.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Fais pivoter le carré de <strong>45 degrés</strong> avec <code>transform</code>.',
      codeDepart: '<style>\n  .carre {\n    width: 80px;\n    height: 80px;\n    background: #4f6df5;\n    margin: 40px;\n    /* ta propriété ici */\n\n  }\n</style>\n\n<div class="carre" id="carre"></div>',
      indices: [
        "Faire pivoter n’est pas changer une position : c’est une <strong>transformation</strong> visuelle, qui ne bouscule pas les voisins.",
        "<code>transform</code> accepte plusieurs fonctions ; celle qui fait tourner prend un angle en degrés.",
        "<code>transform: rotate(45deg);</code>"
      ],
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
      indices: [
        "Deux règles à écrire : l’état normal porte la transition, le survol porte la transformation.",
        "Monter, c’est un <code>translateY</code> <strong>négatif</strong> — l’axe Y descend en CSS. Et grossir, c’est <code>scale</code>.",
        "<code>transition: transform 0.2s;</code> sur <code>.carte</code> ; <code>transform: translateY(-6px) scale(1.05);</code> sur <code>.carte:hover</code>."
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Tu sais aligner avec Flexbox. Il reste une question que <code>justify-content</code> ne règle pas : quand il reste de la place, <strong>qui la prend</strong> ? Et quand il en manque, qui rétrécit ?</p>
<p>C'est ce qui sépare une barre de navigation qui tient à toutes les tailles d'une barre qui casse dès qu'un mot s'allonge.</p>

<h2>flex-grow : partager ce qui reste</h2>
<pre class="bloc-code">.conteneur { display: flex; }
.gauche    { flex-grow: 1; }
.droite    { flex-grow: 2; }</pre>
<p>L'espace disponible est découpé en parts. Mesuré dans un conteneur de 300 pixels : la gauche obtient <strong>100 pixels</strong>, la droite <strong>200</strong>. Une part contre deux.</p>
<p>La valeur par défaut est <code>0</code> : sans rien écrire, un élément ne grandit pas, et l'espace reste vide à la fin de la rangée.</p>

<h2>Les deux autres</h2>
<ul>
<li><code>flex-shrink</code> — à quel point l'élément accepte de rétrécir quand la place manque. Par défaut <code>1</code> : tout le monde rétrécit. Mettre <code>0</code> protège un logo qu'on ne veut jamais voir écrasé ;</li>
<li><code>flex-basis</code> — la taille de départ, avant tout partage. C'est elle, et non <code>width</code>, que Flexbox regarde en premier.</li>
</ul>
<p>Le raccourci <code>flex: 1</code> réunit les trois : grandir d'une part, accepter de rétrécir, partir de zéro. C'est l'écriture qu'on croise le plus souvent.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Réglage</th><th>Résultat dans 300 px</th></tr>
<tr><td>rien</td><td>chacun à sa taille naturelle, du vide à la fin</td></tr>
<tr><td><code>flex-grow: 1</code> sur le premier</td><td>il absorbe tout l'espace restant</td></tr>
<tr><td><code>1</code> et <code>2</code></td><td>100 px et 200 px</td></tr>
<tr><td><code>flex: 1</code> sur les deux</td><td>150 px chacun, quel que soit leur contenu</td></tr>
</table>
<p>La dernière ligne mérite attention : avec <code>flex: 1</code>, la base passe à zéro, et le contenu ne compte plus. C'est ce qu'on veut pour des colonnes égales — et pas du tout ce qu'on veut pour des boutons de longueurs différentes.</p>

<h2>Les pièges</h2>
<p><strong>Croire que <code>flex-grow: 2</code> donne un élément deux fois plus large.</strong> Il reçoit deux parts de l'<em>espace restant</em>, pas deux fois la largeur totale. Si les éléments ont déjà des tailles différentes, le rapport final n'est pas de un à deux.</p>
<p><strong>Oublier que <code>width</code> s'efface devant <code>flex-basis</code>.</strong> Une largeur qui semble ignorée dans un conteneur flex, c'est presque toujours ça.</p>
<p><strong>Laisser un logo rétrécir.</strong> Par défaut tout le monde rétrécit, images comprises, et un logo finit écrasé sur un écran étroit. <code>flex-shrink: 0</code> le protège.</p>
<p><strong>Oublier <code>min-width: 0</code>.</strong> Un élément flex refuse par défaut de devenir plus petit que son contenu — un long mot sans espace, par exemple. Il déborde alors du conteneur. <code>min-width: 0</code> lève ce blocage ; c'est l'un des réglages les plus obscurs du langage, et l'un des plus utiles.</p>

<h2>Dans la vraie vie</h2>
<p>La barre de recherche qui s'étire entre un logo fixe et un bouton fixe, c'est <code>flex: 1</code> au milieu et <code>flex-shrink: 0</code> aux extrémités. Une mise en page en deux colonnes dont l'une suit le contenu et l'autre prend le reste : même principe, deux lignes.</p>

<div class="a-retenir">
<ul>
<li><code>flex-grow</code> partage l'espace <strong>restant</strong>, en parts.</li>
<li><code>flex-shrink: 0</code> protège ce qui ne doit jamais être écrasé.</li>
<li>Dans un conteneur flex, <code>flex-basis</code> passe avant <code>width</code>.</li>
<li><code>min-width: 0</code> débloque un élément qui déborde à cause de son contenu.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : passer à la ligne</summary>
<p>Par défaut, une rangée flex ne passe jamais à la ligne : les éléments rétrécissent jusqu'à déborder. <code>flex-wrap: wrap</code> les autorise à revenir à la ligne quand la place manque. Combiné à un <code>flex-basis</code> et à <code>flex-grow: 1</code>, cela donne une grille qui se réorganise seule — sans une seule media query.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'La barre latérale doit faire <strong>exactement 120px</strong> et ne jamais rétrécir ; le contenu doit prendre <strong>tout le reste</strong>.',
      codeDepart: '<style>\n  .page { display: flex; gap: 10px; }\n  .barre {\n    background: #4f6df5;\n    color: white;\n    padding: 10px;\n    /* ta règle ici */\n\n  }\n  .contenu {\n    background: #eef1fe;\n    padding: 10px;\n    /* ta règle ici */\n\n  }\n</style>\n\n<div class="page">\n  <div class="barre" id="barre">Menu</div>\n  <div class="contenu" id="contenu">Contenu principal</div>\n</div>',
      indices: [
        "Deux comportements opposés : l’un doit rester figé, l’autre prendre tout ce qui reste.",
        "<code>flex</code> réunit trois valeurs : grandir, rétrécir, taille de base. Deux zéros signifient « ne bouge pas ».",
        "<code>flex: 0 0 120px;</code> sur la barre, <code>flex: 1;</code> sur le contenu."
      ],
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
      indices: [
        "Il ne s’agit pas de largeurs fixes mais de <strong>parts</strong> : l’espace libre se partage.",
        "<code>flex-grow</code> dit combien de parts chacun prend. Deux fois plus large, c’est deux parts contre une.",
        "<code>.gauche { flex-grow: 1; }</code> et <code>.droite { flex-grow: 2; }</code>"
      ],
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
      indices: [
        "L’ordre du HTML ne doit pas changer — seul l’ordre <em>visuel</em> change. Flexbox sait faire cela.",
        "Tous les éléments ont <code>order: 0</code> par défaut. Une valeur plus petite passe devant.",
        "<code>order: -1;</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Tu sais déclarer trois colonnes. Mais trois colonnes restent trois colonnes, y compris sur un téléphone où elles font chacune soixante pixels. On ajoute alors des media queries : deux colonnes en dessous de 900 pixels, une seule en dessous de 600. Ça marche, et ça se maintient mal — chaque nouvelle grille veut ses propres seuils.</p>
<p>Grid sait faire autrement : décrire une <em>intention</em>, et laisser le navigateur compter.</p>

<h2>La ligne qui remplace les media queries</h2>
<pre class="bloc-code">.galerie {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}</pre>
<p>Elle se lit : « autant de colonnes que possible, chacune d'au moins 200 pixels, et qui se partagent l'espace restant à égalité ».</p>
<ul>
<li><code>repeat()</code> — répète une définition de colonne ;</li>
<li><code>auto-fit</code> — « autant que ça rentre », au lieu d'un nombre fixe ;</li>
<li><code>minmax(200px, 1fr)</code> — jamais moins de 200 pixels, jamais plus qu'une part égale.</li>
</ul>
<p>Sur un écran large, six colonnes ; sur une tablette, trois ; sur un téléphone, une. Sans un seul seuil écrit à la main — et sans rien à modifier si le design change.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Largeur disponible</th><th>Ce que le navigateur calcule</th></tr>
<tr><td>1200 px</td><td>six colonnes de 200 tiennent : il en fait six</td></tr>
<tr><td>700 px</td><td>trois tiennent, la quatrième non : trois colonnes, élargies pour remplir</td></tr>
<tr><td>350 px</td><td>une seule tient : une colonne pleine largeur</td></tr>
</table>
<p>À chaque fois, le <code>1fr</code> de <code>minmax</code> fait élargir les colonnes retenues pour qu'il ne reste aucun vide.</p>

<h2>Placer un élément précisément</h2>
<pre class="bloc-code">.vedette {
  grid-column: span 2;
  grid-row: span 2;
}</pre>
<p>Cet élément occupe deux colonnes et deux lignes — un article mis en avant au milieu d'une grille de vignettes. Les autres se réorganisent autour, sans qu'on ait à y penser.</p>

<h2>Les pièges</h2>
<p><strong>Confondre <code>auto-fit</code> et <code>auto-fill</code>.</strong> Les deux créent autant de colonnes que possible. Mais s'il n'y a pas assez d'éléments pour les remplir, <code>auto-fit</code> fait disparaître les colonnes vides et élargit les autres, tandis qu'<code>auto-fill</code> les garde — laissant un grand vide à droite. Pour une galerie, c'est <code>auto-fit</code>.</p>
<p><strong>Un minimum trop grand.</strong> <code>minmax(400px, 1fr)</code> sur un écran de 350 pixels donne une colonne de 400 : elle déborde. Le minimum doit tenir sur le plus petit écran visé.</p>
<p><strong>Déclarer les lignes sans nécessité.</strong> Grid les crée au besoin. Fixer <code>grid-template-rows</code> à l'avance se retourne dès qu'il y a un élément de plus que prévu.</p>

<h2>Dans la vraie vie</h2>
<p>Les galeries d'images, les grilles de produits, les tableaux de bord de cartes. Cette unique ligne a remplacé, dans beaucoup de projets, une cinquantaine de lignes de media queries — et surtout, elle continue de fonctionner quand le contenu change.</p>

<div class="a-retenir">
<ul>
<li><code>repeat(auto-fit, minmax(200px, 1fr))</code> fabrique une grille qui s'adapte sans media query.</li>
<li><code>auto-fit</code> absorbe les colonnes vides ; <code>auto-fill</code> les conserve.</li>
<li><code>span</code> fait occuper plusieurs colonnes ou lignes à un élément.</li>
<li>Les lignes se créent seules : on ne déclare que les colonnes.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : nommer les lignes de la grille</summary>
<p>On peut donner des noms aux traits de la grille — <code>[debut-contenu]</code>, <code>[fin-contenu]</code> — et y placer les éléments par leur nom plutôt que par leur numéro. Le CSS devient lisible comme un plan, et surtout il ne casse plus quand on insère une colonne : les numéros auraient tous changé, les noms non.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée une galerie qui s\'adapte toute seule : autant de colonnes que possible, chacune d\'au moins <strong>150px</strong>, avec un écart de 10px.',
      codeDepart: '<style>\n  .galerie {\n    display: grid;\n    /* tes propriétés ici */\n\n  }\n  .galerie div { background: #4f6df5; color: white; padding: 20px; text-align: center; }\n</style>\n\n<div class="galerie" id="galerie">\n  <div>1</div><div>2</div><div>3</div><div>4</div>\n</div>',
      indices: [
        "On ne sait pas combien de colonnes tiendront : c’est à la grille de le décider selon la place disponible.",
        "<code>repeat(auto-fit, …)</code> crée autant de colonnes que possible, et <code>minmax()</code> fixe leur largeur minimale et maximale.",
        "<code>grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));</code>"
      ],
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
      indices: [
        "Plutôt que de placer chaque élément par ses coordonnées, on dessine la mise en page avec des noms.",
        "Chaque chaîne représente une ligne de la grille, et chaque mot une cellule. Un nom répété occupe plusieurs cellules.",
        "<code>grid-template-areas: \"entete entete\" \"menu contenu\";</code> puis <code>grid-area: entete;</code> dans chaque classe."
      ],
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
      indices: [
        "La case doit déborder sur la colonne voisine, sans qu’on ait à redéfinir toute la grille.",
        "<code>grid-column</code> avec <code>span</code> dit combien de colonnes l’élément occupe à partir de sa position.",
        "<code>grid-column: span 2;</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Un titre de 48 pixels écrase un téléphone ; le même à 24 pixels paraît timide sur un grand écran. La réponse habituelle est une media query, puis une deuxième, puis une troisième — une par élément et par seuil.</p>
<p>Trois fonctions permettent d'écrire directement la règle qu'on avait en tête : « grandis avec l'écran, mais jamais en dessous de ceci ni au-dessus de cela ».</p>

<h2>clamp : une valeur bornée</h2>
<pre class="bloc-code">h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}</pre>
<p>Trois arguments, dans cet ordre : <strong>minimum, valeur idéale, maximum</strong>. Le titre suit la largeur de l'écran (5 % de celle-ci), sans jamais descendre sous 1,5 rem ni dépasser 3 rem.</p>
<p>Une ligne, et le titre est réglé pour toutes les tailles d'écran — y compris celles qui n'existent pas encore.</p>

<h2>min et max</h2>
<ul>
<li><code>min(90%, 1200px)</code> — prend la plus petite des deux : 90 % sur un petit écran, plafonné à 1200 pixels sur un grand ;</li>
<li><code>max(1rem, 3vw)</code> — prend la plus grande : au moins 1 rem, davantage si l'écran est large.</li>
</ul>
<p>Attention au sens, qui se retourne facilement dans la tête : <code>min()</code> sert à poser un <em>plafond</em>, <code>max()</code> un <em>plancher</em>. C'est logique — prendre toujours le plus petit, c'est interdire de dépasser — et ça demande un instant de réflexion à chaque fois.</p>

<h2>Pas à pas</h2>
<p><code>clamp(1.5rem, 5vw, 3rem)</code>, soit entre 24 et 48 pixels :</p>
<table class="memo-table trace">
<tr><th>Largeur d'écran</th><th>5vw donne</th><th>Taille retenue</th></tr>
<tr><td>360 px</td><td>18 px</td><td>24 px — le minimum s'applique</td></tr>
<tr><td>800 px</td><td>40 px</td><td>40 px — la valeur idéale passe</td></tr>
<tr><td>1600 px</td><td>80 px</td><td>48 px — le maximum s'applique</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Se tromper d'ordre dans <code>clamp</code>.</strong> Minimum, idéal, maximum. Inverser le premier et le dernier donne un résultat figé, sans aucune erreur signalée.</p>
<p><strong>Une valeur idéale en <code>vw</code> pur pour du texte.</strong> Si le visiteur zoome, une taille en <code>vw</code> ne bouge pas — elle dépend de l'écran, pas du réglage. Un texte devient alors impossible à agrandir. L'usage sûr est de mélanger : <code>clamp(1rem, 0.5rem + 1.5vw, 2rem)</code>, où la part en <code>rem</code> suit le zoom.</p>
<p><strong>En mettre partout.</strong> Un <code>clamp</code> sur chaque propriété rend une feuille de style impossible à relire. On s'en sert là où l'échelle compte vraiment : les titres, la largeur du contenu, les grands espacements.</p>

<h2>Dans la vraie vie</h2>
<p><code>width: min(90%, 1200px)</code> est devenue l'écriture standard d'un conteneur centré : pleine largeur avec des marges sur mobile, plafonné sur grand écran — là où il fallait auparavant une largeur, une largeur maximale et une media query. Trois lignes remplacées par une.</p>

<div class="a-retenir">
<ul>
<li><code>clamp(min, idéal, max)</code> borne une valeur qui s'adapte.</li>
<li><code>min()</code> pose un plafond, <code>max()</code> un plancher — l'inverse de l'intuition.</li>
<li>Pour du texte, mélange toujours une part en <code>rem</code>, sinon le zoom du visiteur est ignoré.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les calculs s'imbriquent</summary>
<p>Ces trois fonctions acceptent des opérations à l'intérieur, sans avoir besoin de <code>calc()</code> : <code>clamp(1rem, 0.5rem + 1.5vw, 2rem)</code> est valide tel quel. On peut même les emboîter les unes dans les autres. La limite n'est pas technique mais humaine : au-delà de deux niveaux, plus personne ne sait ce que la ligne calcule — toi compris, dans trois mois.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Donne au titre une taille <strong>fluide</strong> avec <code>clamp()</code> : au minimum 20px, idéalement 5vw, au maximum 48px.',
      codeDepart: '<style>\n  h1 {\n    /* ta propriété ici */\n\n  }\n</style>\n\n<h1 id="titre">Un titre adaptatif</h1>',
      indices: [
        "Trois valeurs à concilier : un plancher, une taille idéale qui suit l’écran, et un plafond.",
        "<code>clamp()</code> prend exactement ces trois-là, dans cet ordre : minimum, valeur préférée, maximum.",
        "<code>font-size: clamp(20px, 5vw, 48px);</code>"
      ],
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
      indices: [
        "Fixer la hauteur à la main casserait les proportions dès que la largeur change. Mieux vaut déclarer le <strong>rapport</strong>.",
        "<code>aspect-ratio</code> prend deux nombres séparés par une barre oblique. La hauteur se calcule alors toute seule.",
        "<code>aspect-ratio: 16 / 9;</code>"
      ],
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
      indices: [
        "L’image est écrasée parce qu’on lui impose deux dimensions incompatibles avec ses proportions.",
        "<code>object-fit</code> dit comment elle doit remplir l’espace : <code>cover</code> recadre au lieu de déformer.",
        "<code>object-fit: cover;</code>"
      ],
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
