/* ===== Module CSS ===== */
window.DATA_CSS = [

{
  id: 'css-1',
  titre: 'C\'est quoi le CSS ?',
  contenu: `
<p>Ton HTML structure le contenu, mais tout s'affiche en noir sur blanc, avec la police par défaut. Le <strong>CSS</strong> (<em>Cascading Style Sheets</em>, « feuilles de style ») va changer ça.</p>

<h2>La syntaxe CSS</h2>
<p>Le CSS ne ressemble pas au HTML. Il s'écrit sous forme de <strong>règles</strong> :</p>
<pre class="bloc-code">h1 {
  color: red;
  font-size: 40px;
}</pre>
<p>Cette règle se lit : « pour tous les <code>&lt;h1&gt;</code> de la page, mets la couleur du texte en rouge et la taille à 40 pixels ». Décortiquons :</p>
<ul>
<li><code>h1</code> — le <strong>sélecteur</strong> : à QUI s'applique la règle ;</li>
<li><code>{ }</code> — les accolades délimitent la liste des réglages ;</li>
<li><code>color: red;</code> — une <strong>déclaration</strong> : une <strong>propriété</strong> (<code>color</code>), deux-points, une <strong>valeur</strong> (<code>red</code>), et un <strong>point-virgule</strong> pour terminer.</li>
</ul>

<div class="attention">⚠️ Le point-virgule <code>;</code> à la fin de chaque déclaration est obligatoire. L'oublier est l'erreur n°1 en CSS — si un style ne s'applique pas, vérifie ça d'abord.</div>

<h2>Où écrit-on le CSS ?</h2>
<p>Pour nos exercices, on l'écrira dans une balise <code>&lt;style&gt;</code> placée au-dessus du HTML :</p>
<pre class="bloc-code">&lt;style&gt;
  h1 { color: blue; }
&lt;/style&gt;

&lt;h1&gt;Ce titre sera bleu&lt;/h1&gt;</pre>
<p>(Dans un vrai projet, on met plutôt le CSS dans un fichier séparé <code>style.css</code> — même principe, juste mieux rangé.)</p>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le code contient un titre et un paragraphe. Ajoute une règle CSS dans la balise <code>&lt;style&gt;</code> pour mettre le <code>h1</code> en <code>blue</code>, et une autre pour mettre le <code>p</code> en <code>green</code>.',
      codeDepart: '<style>\n\n</style>\n\n<h1>Un titre qui veut de la couleur</h1>\n<p>Un paragraphe qui en veut aussi.</p>',
      indices: [
        "Une règle CSS a toujours la même forme : QUI on vise, puis, entre accolades, CE QU’ON CHANGE.",
        "Le sélecteur est ici le nom de la balise. Chaque réglage s’écrit <code>propriété: valeur;</code> — deux-points au milieu, point-virgule à la fin.",
        "<code>h1 { color: blue; }</code> puis, à la ligne, <code>p { color: green; }</code>"
      ],
      solution: '<style>\n  h1 { color: blue; }\n  p { color: green; }\n</style>\n\n<h1>Un titre qui veut de la couleur</h1>\n<p>Un paragraphe qui en veut aussi.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const h1 = ctx.doc.querySelector('h1');
        const p = ctx.doc.querySelector('p');
        if (!h1 || !p) return { ok: false, message: 'Garde le titre et le paragraphe du code de départ.' };
        if (win.getComputedStyle(h1).color !== 'rgb(0, 0, 255)') return { ok: false, message: 'Le <code>h1</code> n\'est pas encore bleu. Vérifie la syntaxe : <code>h1 { color: blue; }</code> — accolades, deux-points et point-virgule compris.' };
        if (win.getComputedStyle(p).color !== 'rgb(0, 128, 0)') return { ok: false, message: 'Le titre est bleu, bravo ! Maintenant le paragraphe : <code>p { color: green; }</code>' };
        return { ok: true, message: 'Tu viens d\'écrire tes premières règles CSS.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Chasse au bug !</strong> Ce CSS devrait mettre le titre en orange et agrandir le paragraphe... mais rien ne marche. <strong>Deux erreurs</strong> se sont glissées dans le code. Trouve-les et répare.',
      codeDepart: '<style>\n  h1 {\n    color orange;\n  }\n  p {\n    font-size: 22px\n    color: purple;\n  }\n</style>\n\n<h1>Je devrais être orange</h1>\n<p>Et moi, grand et violet.</p>',
      indices: [
        "Deux fautes, et aucune ne fait planter la page : un CSS invalide est simplement ignoré, en silence. C’est ce qui le rend difficile à déboguer.",
        "Une déclaration a besoin de <strong>deux-points</strong> entre la propriété et sa valeur, et d’un <strong>point-virgule</strong> à la fin. Sans ce dernier, la ligne suivante est avalée avec.",
        "Les deux-points manquent entre <code>color</code> et <code>orange</code> ; le point-virgule manque après <code>22px</code>."
      ],
      solution: '<style>\n  h1 {\n    color: orange;\n  }\n  p {\n    font-size: 22px;\n    color: purple;\n  }\n</style>\n\n<h1>Je devrais être orange</h1>\n<p>Et moi, grand et violet.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const h1 = ctx.doc.querySelector('h1');
        const p = ctx.doc.querySelector('p');
        if (!h1 || !p) return { ok: false, message: 'Garde le titre et le paragraphe du code de départ.' };
        if (win.getComputedStyle(h1).color !== 'rgb(255, 165, 0)') return { ok: false, message: 'Le titre n\'est toujours pas orange : regarde bien la ligne <code>color orange;</code>... il manque un caractère entre les deux mots.' };
        if (win.getComputedStyle(p).fontSize !== '22px' || win.getComputedStyle(p).color !== 'rgb(128, 0, 128)') return { ok: false, message: 'Le titre est réparé ! Reste le paragraphe : il manque un point-virgule après <code>22px</code> — sans lui, le navigateur ignore aussi la ligne suivante.' };
        return { ok: true, message: 'Tu viens de vivre les deux pannes CSS les plus fréquentes au monde. Maintenant tu sauras les reconnaître en 5 secondes.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Dans la règle <code>p { color: green; }</code>, comment s\'appelle la partie <code>p</code> ?',
      choix: ['La propriété', 'La valeur', 'Le sélecteur', 'La déclaration'],
      bonne: 2,
      explication: 'Le <strong>sélecteur</strong> dit « à qui » s\'applique la règle. <code>color</code> est la propriété, <code>green</code> la valeur, et <code>color: green;</code> l\'ensemble forme une déclaration.',
      aides: [
        'La propriété, c\'est ce qu\'on règle (<code>color</code>). Le <code>p</code> désigne à QUI ça s\'applique...',
        'La valeur, c\'est le réglage choisi (<code>green</code>). Le <code>p</code> désigne à QUI ça s\'applique...',
        '',
        'La déclaration, c\'est le couple propriété + valeur (<code>color: green;</code>). Le <code>p</code> a un autre nom...'
      ]
    }
  ]
},

{
  id: 'css-2',
  titre: 'Les sélecteurs : viser juste',
  contenu: `
<p>Mettre TOUS les paragraphes en vert, c'est rarement ce qu'on veut. Pour viser un élément précis, on utilise les <strong>classes</strong>.</p>

<h2>Les classes</h2>
<p>Côté HTML, on ajoute l'attribut <code>class</code> à l'élément qu'on veut marquer :</p>
<pre class="bloc-code">&lt;p&gt;Un paragraphe normal.&lt;/p&gt;
&lt;p class="important"&gt;Un paragraphe à mettre en valeur !&lt;/p&gt;</pre>
<p>Côté CSS, on sélectionne cette classe avec un <strong>point</strong> devant son nom :</p>
<pre class="bloc-code">.important {
  color: red;
  font-weight: bold;
}</pre>
<p>Seul le deuxième paragraphe devient rouge et gras. La même classe peut être posée sur autant d'éléments que tu veux — c'est ce qui rend les classes si pratiques.</p>

<h2>Récapitulatif des 3 sélecteurs de base</h2>
<ul>
<li><code>p { }</code> — tous les éléments <code>&lt;p&gt;</code> (sélecteur de balise) ;</li>
<li><code>.important { }</code> — tous les éléments qui ont <code>class="important"</code> (le plus utilisé en pratique) ;</li>
<li><code>#menu { }</code> — L'élément unique qui a <code>id="menu"</code>. Un <code>id</code> ne doit exister qu'une seule fois par page.</li>
</ul>

<div class="astuce">✅ Moyen mnémotechnique : le <strong>.point</strong> pour les <strong>classes</strong> (plusieurs possibles), le <strong>#dièse</strong> pour les <strong>id</strong> (unique). En cas de doute, utilise une classe.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Trois paragraphes, mais un seul doit changer : ajoute <code>class="alerte"</code> au <strong>deuxième</strong> paragraphe, puis écris la règle CSS <code>.alerte</code> qui le met en <code>red</code>.',
      codeDepart: '<style>\n\n</style>\n\n<p>Tout va bien.</p>\n<p>Attention, ceci est une alerte !</p>\n<p>Tout va bien aussi.</p>',
      indices: [
        "Viser la balise changerait les trois paragraphes. Il faut un moyen de désigner un seul d’entre eux.",
        "On pose une <strong>classe</strong> sur la balise en HTML, puis on la vise en CSS. Le sélecteur de classe s’écrit avec un point devant son nom — point qui ne figure pas dans le HTML.",
        "HTML : <code>&lt;p class=\"alerte\"&gt;</code> · CSS : <code>.alerte { color: red; }</code>"
      ],
      solution: '<style>\n  .alerte { color: red; }\n</style>\n\n<p>Tout va bien.</p>\n<p class="alerte">Attention, ceci est une alerte !</p>\n<p>Tout va bien aussi.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const ps = ctx.doc.querySelectorAll('p');
        if (ps.length < 3) return { ok: false, message: 'Garde les trois paragraphes du code de départ.' };
        const cible = ps[1];
        if (!cible.classList.contains('alerte')) return { ok: false, message: 'Le deuxième paragraphe doit avoir l\'attribut <code>class="alerte"</code> dans sa balise ouvrante.' };
        if (win.getComputedStyle(cible).color !== 'rgb(255, 0, 0)') return { ok: false, message: 'La classe est posée, mais la règle CSS ne s\'applique pas. As-tu bien mis le <strong>point</strong> : <code>.alerte { color: red; }</code> ?' };
        if (win.getComputedStyle(ps[0]).color === 'rgb(255, 0, 0)') return { ok: false, message: 'Oups, le premier paragraphe est devenu rouge aussi ! Utilise le sélecteur <code>.alerte</code>, pas <code>p</code>.' };
        return { ok: true, message: 'Les classes sont l\'outil n°1 du CSS — tu viens de débloquer un niveau important.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : classe réutilisable.</strong> Quatre articles de blog : deux sont « premium ». Pose la classe <code>premium</code> sur le 1er et le 3e paragraphe, et écris UNE seule règle qui les met en <code>purple</code> et en gras (<code>font-weight: bold;</code>).',
      codeDepart: '<style>\n\n</style>\n\n<p>Article exclusif sur les fusées.</p>\n<p>Article gratuit sur les chats.</p>\n<p>Article exclusif sur les océans.</p>\n<p>Article gratuit sur le fromage.</p>',
      indices: [
        "Tout l’intérêt d’une classe : elle se pose autant de fois qu’on veut, et ne s’écrit qu’une seule fois en CSS.",
        "La même classe sur les deux paragraphes premium, et <strong>une seule</strong> règle qui les habille tous les deux.",
        "<code>&lt;p class=\"premium\"&gt;</code> deux fois, et <code>.premium { color: purple; font-weight: bold; }</code>"
      ],
      solution: '<style>\n  .premium {\n    color: purple;\n    font-weight: bold;\n  }\n</style>\n\n<p class="premium">Article exclusif sur les fusées.</p>\n<p>Article gratuit sur les chats.</p>\n<p class="premium">Article exclusif sur les océans.</p>\n<p>Article gratuit sur le fromage.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const ps = ctx.doc.querySelectorAll('p');
        if (ps.length < 4) return { ok: false, message: 'Garde les quatre paragraphes du code de départ.' };
        if (!ps[0].classList.contains('premium') || !ps[2].classList.contains('premium')) return { ok: false, message: 'La classe <code>premium</code> doit être posée sur le 1er ET le 3e paragraphe (les articles « exclusifs »).' };
        if (ps[1].classList.contains('premium') || ps[3].classList.contains('premium')) return { ok: false, message: 'Les articles gratuits (2e et 4e) ne doivent PAS avoir la classe.' };
        const st = win.getComputedStyle(ps[0]);
        if (st.color !== 'rgb(128, 0, 128)') return { ok: false, message: 'Les classes sont bien posées ! Maintenant la règle CSS : <code>.premium { color: purple; ... }</code>' };
        if (st.fontWeight !== '700' && st.fontWeight !== 'bold') return { ok: false, message: 'Presque : ajoute <code>font-weight: bold;</code> dans la règle <code>.premium</code>.' };
        return { ok: true, message: 'Une règle, deux éléments stylés : c\'est toute la puissance des classes.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Quelle est la différence entre <code>class</code> et <code>id</code> ?',
      choix: [
        'Aucune, ce sont deux noms pour la même chose',
        'Une classe peut être posée sur plusieurs éléments ; un id doit être unique dans la page',
        'Les classes servent au CSS, les id servent au HTML',
        'Les id sont plus rapides que les classes'
      ],
      bonne: 1,
      explication: 'Classe = étiquette réutilisable (sélecteur <code>.nom</code>), id = identifiant unique (sélecteur <code>#nom</code>). En pratique : classes pour styler, id pour désigner UN élément précis (très utile en JavaScript, tu verras).',
      aides: [
        'Ils se ressemblent mais ont une différence fondamentale, côté unicité...',
        '',
        'Les deux servent au CSS (et au JavaScript). La différence est ailleurs : combien d\'éléments peuvent porter le même nom ?',
        'La vitesse n\'a rien à voir — la différence est le nombre d\'éléments autorisés à porter le même nom.'
      ]
    }
  ]
},

{
  id: 'css-3',
  titre: 'Couleurs et fonds',
  contenu: `
<h2>Écrire une couleur</h2>
<p>Trois façons principales d'exprimer une couleur en CSS :</p>
<ul>
<li><strong>Par son nom</strong> : <code>red</code>, <code>blue</code>, <code>orange</code>, <code>white</code>, <code>black</code>... (environ 140 noms existent) ;</li>
<li><strong>En hexadécimal</strong> : <code>#ff0000</code> (rouge). Un <code>#</code> suivi de 6 caractères : deux pour le rouge, deux pour le vert, deux pour le bleu. C'est le format que tu croiseras partout ;</li>
<li><strong>En RGB</strong> : <code>rgb(255, 0, 0)</code> — les mêmes trois quantités, de 0 à 255.</li>
</ul>

<h2>Texte et arrière-plan</h2>
<pre class="bloc-code">.carte {
  color: white;              /* couleur du TEXTE */
  background-color: #4f6df5; /* couleur du FOND */
  padding: 20px;
  border-radius: 12px;
}</pre>
<ul>
<li><code>color</code> — la couleur du texte ;</li>
<li><code>background-color</code> — la couleur de l'arrière-plan ;</li>
<li><code>border-radius</code> — arrondit les coins (petit bonus très utilisé) ;</li>
<li>le texte entre <code>/*</code> et <code>*/</code> est un <strong>commentaire</strong> : ignoré par le navigateur, utile pour les humains.</li>
</ul>

<div class="astuce">✅ Un texte doit toujours bien contraster avec son fond (texte clair sur fond foncé, ou l'inverse). C'est une question de lisibilité — et d'accessibilité.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Transforme le <code>&lt;div class="carte"&gt;</code> en carte colorée : donne à la classe <code>.carte</code> un fond <code>#4f6df5</code> et un texte <code>white</code>.',
      codeDepart: '<style>\n  .carte {\n    padding: 20px;\n    border-radius: 12px;\n  }\n</style>\n\n<div class="carte">\n  <h2>Carte membre</h2>\n  <p>Apprenti codeur — niveau CSS</p>\n</div>',
      indices: [
        "Deux couleurs à poser, et elles ne portent pas le même nom : l’une concerne le fond, l’autre le texte.",
        "Le fond, c’est <code>background-color</code> ; le texte, simplement <code>color</code>. Les deux vont dans la même règle <code>.carte</code>.",
        "<code>background-color: #4f6df5;</code> et <code>color: white;</code>"
      ],
      solution: '<style>\n  .carte {\n    padding: 20px;\n    border-radius: 12px;\n    background-color: #4f6df5;\n    color: white;\n  }\n</style>\n\n<div class="carte">\n  <h2>Carte membre</h2>\n  <p>Apprenti codeur — niveau CSS</p>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const carte = ctx.doc.querySelector('.carte');
        if (!carte) return { ok: false, message: 'Garde le <code>&lt;div class="carte"&gt;</code> du code de départ.' };
        const st = win.getComputedStyle(carte);
        if (st.backgroundColor !== 'rgb(79, 109, 245)') return { ok: false, message: 'Le fond n\'est pas encore bon. Ajoute <code>background-color: #4f6df5;</code> dans la règle <code>.carte</code>.' };
        if (st.color !== 'rgb(255, 255, 255)') return { ok: false, message: 'Le fond est parfait ! Il manque le texte en blanc : <code>color: white;</code>' };
        return { ok: true, message: 'Fond, texte, contraste : tu sais manier les couleurs.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : le code hexadécimal.</strong> Trois pastilles à colorer UNIQUEMENT en hexadécimal : <code>.rouge</code> en fond <code>#e63946</code>, <code>.vert</code> en fond <code>#2a9d8f</code>, <code>.jaune</code> en fond <code>#e9c46a</code>.',
      codeDepart: '<style>\n  .pastille {\n    display: inline-block;\n    width: 80px; height: 80px;\n    border-radius: 50%;\n    margin: 8px;\n  }\n\n  /* Ajoute les 3 règles de couleur ici */\n\n</style>\n\n<div class="pastille rouge"></div>\n<div class="pastille vert"></div>\n<div class="pastille jaune"></div>',
      indices: [
        "Trois pastilles, trois classes différentes : il faut donc trois règles distinctes.",
        "Un code hexadécimal commence par un <code>#</code> suivi de six caractères. C’est une notation, pas un nom de couleur.",
        "<code>.rouge { background-color: #e63946; }</code>, et de même pour les deux autres."
      ],
      solution: '<style>\n  .pastille {\n    display: inline-block;\n    width: 80px; height: 80px;\n    border-radius: 50%;\n    margin: 8px;\n  }\n\n  .rouge { background-color: #e63946; }\n  .vert { background-color: #2a9d8f; }\n  .jaune { background-color: #e9c46a; }\n</style>\n\n<div class="pastille rouge"></div>\n<div class="pastille vert"></div>\n<div class="pastille jaune"></div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const attendus = [['.rouge', 'rgb(230, 57, 70)', '#e63946'], ['.vert', 'rgb(42, 157, 143)', '#2a9d8f'], ['.jaune', 'rgb(233, 196, 106)', '#e9c46a']];
        for (const [sel, rgb, hex] of attendus) {
          const el = ctx.doc.querySelector(sel);
          if (!el) return { ok: false, message: 'Garde les trois pastilles du code de départ.' };
          if (win.getComputedStyle(el).backgroundColor !== rgb) return { ok: false, message: 'La pastille <code>' + sel + '</code> n\'a pas la bonne couleur. Règle attendue : <code>' + sel + ' { background-color: ' + hex + '; }</code>' };
        }
        return { ok: true, message: 'Et tu as remarqué ? Chaque pastille a DEUX classes (<code>pastille</code> + sa couleur) : la forme commune d\'un côté, la couleur spécifique de l\'autre. Très pro.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : le mode sombre.</strong> Transforme cette page claire en page sombre : le <code>body</code> reçoit un fond <code>#1e2432</code> et un texte <code>white</code> ; la classe <code>.encart</code> reçoit un fond <code>#2f3850</code> et des coins arrondis de <code>12px</code>.',
      codeDepart: '<style>\n  body { font-family: sans-serif; padding: 20px; }\n  .encart { padding: 16px; }\n</style>\n\n<h1>Mon blog de nuit</h1>\n<div class="encart">\n  <p>Les meilleurs articles se lisent dans le noir.</p>\n</div>',
      indices: [
        "Rien à créer : les deux règles existent déjà, il n’y a qu’à les compléter.",
        "Le <code>body</code> donne le fond général et la couleur de texte par défaut. L’encart, lui, a besoin de son propre fond pour se détacher.",
        "Dans <code>body</code> : <code>background-color: #1e2432; color: white;</code> — et un fond distinct dans <code>.encart</code>."
      ],
      solution: '<style>\n  body {\n    font-family: sans-serif;\n    padding: 20px;\n    background-color: #1e2432;\n    color: white;\n  }\n  .encart {\n    padding: 16px;\n    background-color: #2f3850;\n    border-radius: 12px;\n  }\n</style>\n\n<h1>Mon blog de nuit</h1>\n<div class="encart">\n  <p>Les meilleurs articles se lisent dans le noir.</p>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const body = ctx.doc.body;
        const encart = ctx.doc.querySelector('.encart');
        if (!encart) return { ok: false, message: 'Garde le <code>&lt;div class="encart"&gt;</code>.' };
        if (win.getComputedStyle(body).backgroundColor !== 'rgb(30, 36, 50)') return { ok: false, message: 'Le fond de la page n\'est pas encore sombre : <code>background-color: #1e2432;</code> dans la règle <code>body</code>.' };
        if (win.getComputedStyle(body).color !== 'rgb(255, 255, 255)') return { ok: false, message: 'Fond sombre OK, mais le texte est illisible : ajoute <code>color: white;</code> au body.' };
        const st = win.getComputedStyle(encart);
        if (st.backgroundColor !== 'rgb(47, 56, 80)') return { ok: false, message: 'Reste l\'encart : <code>background-color: #2f3850;</code> dans la règle <code>.encart</code>.' };
        if (st.borderTopLeftRadius !== '12px') return { ok: false, message: 'Dernière touche : <code>border-radius: 12px;</code> sur l\'encart.' };
        return { ok: true, message: 'Tu viens de créer un mode sombre — la fonctionnalité préférée des développeurs du monde entier.' };
      }
    }
  ]
},

{
  id: 'css-4',
  titre: 'Le texte : taille, police, alignement',
  contenu: `
<p>Le CSS offre un contrôle total sur le texte. Voici les propriétés que tu utiliseras sans arrêt :</p>

<pre class="bloc-code">.titre-hero {
  font-size: 32px;        /* taille */
  font-family: Arial, sans-serif;  /* police */
  font-weight: bold;      /* graisse : bold, normal */
  font-style: italic;     /* italique */
  text-align: center;     /* alignement : left, center, right */
  text-decoration: underline;  /* souligné */
  line-height: 1.6;       /* hauteur des lignes (aération) */
}</pre>

<h2>Deux détails qui comptent</h2>
<ul>
<li><code>font-size</code> se mesure le plus souvent en <strong>pixels</strong> (<code>px</code>). Le texte normal fait environ 16px, un grand titre 28 à 40px.</li>
<li><code>font-family</code> accepte une <strong>liste</strong> de polices : le navigateur essaie la première, et passe à la suivante s'il ne la trouve pas. On termine par une famille générique (<code>sans-serif</code> = sans empattements, moderne ; <code>serif</code> = avec empattements, journal ; <code>monospace</code> = à chasse fixe, code).</li>
</ul>

<div class="info">💬 <code>text-align: center;</code> centre le texte <em>à l'intérieur</em> de son bloc. Centrer le bloc lui-même dans la page, c'est autre chose — on le verra avec Flexbox à la leçon 6.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Style la citation : donne à la classe <code>.citation</code> une taille de <code>24px</code>, un alignement <code>center</code> et le style <code>italic</code>.',
      codeDepart: '<style>\n  .citation {\n\n  }\n</style>\n\n<p class="citation">La seule façon d\'apprendre à coder, c\'est de coder.</p>',
      indices: [
        "Trois réglages de texte, tous dans la même règle. Chacun porte un nom qui dit ce qu’il fait.",
        "La taille, l’alignement, et l’inclinaison. Attention : l’italique n’est pas un « style de police » au sens large, mais une propriété précise.",
        "<code>font-size: 24px;</code> · <code>text-align: center;</code> · <code>font-style: italic;</code>"
      ],
      solution: '<style>\n  .citation {\n    font-size: 24px;\n    text-align: center;\n    font-style: italic;\n  }\n</style>\n\n<p class="citation">La seule façon d\'apprendre à coder, c\'est de coder.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.querySelector('.citation');
        if (!el) return { ok: false, message: 'Garde le paragraphe <code>class="citation"</code>.' };
        const st = win.getComputedStyle(el);
        if (st.fontSize !== '24px') return { ok: false, message: 'La taille n\'y est pas encore : <code>font-size: 24px;</code> (n\'oublie pas le « px »).' };
        if (st.textAlign !== 'center') return { ok: false, message: 'Taille OK ! Maintenant le centrage : <code>text-align: center;</code>' };
        if (st.fontStyle !== 'italic') return { ok: false, message: 'Presque ! Il manque l\'italique : <code>font-style: italic;</code>' };
        return { ok: true, message: 'Une vraie citation de magazine.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : l\'article de presse.</strong> Trois règles à écrire : le <code>h1</code> en <code>34px</code> et centré ; la classe <code>.chapo</code> (l\'intro) en gras (<code>font-weight: bold;</code>) ; la classe <code>.article</code> avec une hauteur de ligne aérée <code>line-height: 1.8;</code>.',
      codeDepart: '<style>\n\n</style>\n\n<h1>Le CSS expliqué à tous</h1>\n<p class="chapo">Trois propriétés suffisent pour transformer un texte.</p>\n<p class="article">La taille change la hiérarchie, l\'alignement structure la page, et la hauteur de ligne rend la lecture agréable. Les grands journaux appliquent exactement ces trois réglages.</p>',
      indices: [
        "Trois cibles différentes : une balise, et deux classes. Donc trois règles séparées.",
        "Le <code>h1</code> reçoit deux réglages ; le chapô, une graisse ; l’article, un interlignage.",
        "<code>h1 { font-size: 34px; text-align: center; }</code>, <code>.chapo { font-weight: bold; }</code>, <code>.article { line-height: 1.8; }</code>"
      ],
      solution: '<style>\n  h1 {\n    font-size: 34px;\n    text-align: center;\n  }\n  .chapo {\n    font-weight: bold;\n  }\n  .article {\n    line-height: 1.8;\n  }\n</style>\n\n<h1>Le CSS expliqué à tous</h1>\n<p class="chapo">Trois propriétés suffisent pour transformer un texte.</p>\n<p class="article">La taille change la hiérarchie, l\'alignement structure la page, et la hauteur de ligne rend la lecture agréable. Les grands journaux appliquent exactement ces trois réglages.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const h1 = ctx.doc.querySelector('h1');
        const chapo = ctx.doc.querySelector('.chapo');
        const article = ctx.doc.querySelector('.article');
        if (!h1 || !chapo || !article) return { ok: false, message: 'Garde les trois éléments du code de départ.' };
        const stH1 = win.getComputedStyle(h1);
        if (stH1.fontSize !== '34px' || stH1.textAlign !== 'center') return { ok: false, message: 'Le <code>h1</code> doit faire 34px ET être centré : <code>h1 { font-size: 34px; text-align: center; }</code>' };
        const fw = win.getComputedStyle(chapo).fontWeight;
        if (fw !== '700' && fw !== 'bold') return { ok: false, message: 'Le titre est bon ! Maintenant le chapo en gras : <code>.chapo { font-weight: bold; }</code>' };
        const lh = win.getComputedStyle(article).lineHeight;
        if (lh === 'normal' || Math.abs(parseFloat(lh) / parseFloat(win.getComputedStyle(article).fontSize) - 1.8) > 0.1) return { ok: false, message: 'Dernière règle : <code>.article { line-height: 1.8; }</code> pour aérer le texte.' };
        return { ok: true, message: 'Trois propriétés, et le texte devient professionnel. Compare avec l\'aperçu de départ !' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : la police fait tout.</strong> Donne à la classe <code>.code-exemple</code> l\'apparence d\'un vrai bout de code : police <code>monospace</code> (via <code>font-family</code>), fond <code>#1e2432</code>, texte <code>#7ee787</code>, et <code>padding</code> de <code>12px</code>.',
      codeDepart: '<style>\n  .code-exemple {\n\n  }\n</style>\n\n<p>Voici à quoi ressemble du code dans un livre :</p>\n<p class="code-exemple">let score = 42;</p>',
      indices: [
        "Ce qui fait ressembler un bloc à du code, ce n’est pas une propriété magique : c’est une combinaison de quatre réglages ordinaires.",
        "Une police à chasse fixe, un fond sombre, un texte clair, et de l’air autour. La police s’appelle <code>monospace</code> — un mot-clé, pas un nom de police.",
        "<code>font-family: monospace;</code> · <code>background-color: #1e2432;</code> · <code>color: #7ee787;</code> · <code>padding: 12px;</code>"
      ],
      solution: '<style>\n  .code-exemple {\n    font-family: monospace;\n    background-color: #1e2432;\n    color: #7ee787;\n    padding: 12px;\n  }\n</style>\n\n<p>Voici à quoi ressemble du code dans un livre :</p>\n<p class="code-exemple">let score = 42;</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.querySelector('.code-exemple');
        if (!el) return { ok: false, message: 'Garde le paragraphe <code>class="code-exemple"</code>.' };
        const st = win.getComputedStyle(el);
        if (!/mono/i.test(st.fontFamily)) return { ok: false, message: 'Commence par la police : <code>font-family: monospace;</code> — celle où toutes les lettres ont la même largeur, comme dans les éditeurs de code.' };
        if (st.backgroundColor !== 'rgb(30, 36, 50)') return { ok: false, message: 'Police OK ! Le fond sombre maintenant : <code>background-color: #1e2432;</code>' };
        if (st.color !== 'rgb(126, 231, 135)') return { ok: false, message: 'Il manque le texte vert « terminal » : <code>color: #7ee787;</code>' };
        if (st.paddingTop !== '12px') return { ok: false, message: 'Dernière touche de respiration : <code>padding: 12px;</code>' };
        return { ok: true, message: 'Tu viens de recréer le style des blocs de code de ce logiciel. Oui, tout ce que tu vois ici est fait avec les propriétés que tu apprends.' };
      }
    }
  ]
},

{
  id: 'css-5',
  titre: 'Le modèle de boîte : marges et bordures',
  contenu: `
<p>Concept fondamental : en CSS, <strong>chaque élément est une boîte rectangulaire</strong>. Et chaque boîte a quatre couches, de l'intérieur vers l'extérieur :</p>
<ol>
<li>le <strong>contenu</strong> (le texte, l'image...) ;</li>
<li>le <strong>padding</strong> — l'espace intérieur, entre le contenu et le bord ;</li>
<li>la <strong>border</strong> — la bordure ;</li>
<li>la <strong>margin</strong> — l'espace extérieur, qui repousse les autres boîtes.</li>
</ol>

<pre class="bloc-code">.boite {
  padding: 16px;              /* respiration intérieure */
  border: 2px solid black;    /* épaisseur, style, couleur */
  margin: 24px;               /* distance avec les voisins */
  width: 300px;               /* largeur du contenu */
}</pre>

<h2>Comment retenir padding vs margin ?</h2>
<div class="info">📦 Imagine un colis : le <strong>padding</strong> c'est le papier bulle À L'INTÉRIEUR du carton (protège le contenu du bord), la <strong>border</strong> c'est le carton lui-même, la <strong>margin</strong> c'est la distance avec les autres colis dans le camion.</div>

<p>La bordure demande 3 valeurs : épaisseur (<code>2px</code>), style (<code>solid</code> = trait plein, <code>dashed</code> = pointillés), couleur. Et tu peux cibler un seul côté : <code>margin-top</code>, <code>padding-left</code>, etc.</p>

<div class="astuce">✅ Un design paraît « pro » quand il respire : en cas de doute, ajoute du padding. La différence entre une page amateur et une page soignée, c'est souvent juste de l'espace.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'La classe <code>.encadre</code> est toute nue. Donne-lui : un <code>padding</code> de <code>16px</code>, une bordure <code>2px solid black</code>, et une <code>margin</code> de <code>24px</code>.',
      codeDepart: '<style>\n  .encadre {\n\n  }\n</style>\n\n<p class="encadre">Encadre-moi comme un tableau de maître !</p>',
      indices: [
        "Trois réglages, et deux d’entre eux se confondent souvent : l’un pousse vers l’intérieur, l’autre vers l’extérieur.",
        "<code>padding</code> est l’air <strong>dedans</strong>, entre la bordure et le contenu. <code>margin</code> est l’air <strong>dehors</strong>, entre la boîte et ses voisines.",
        "<code>padding: 16px;</code> · <code>border: 2px solid black;</code> · <code>margin: 24px;</code>"
      ],
      solution: '<style>\n  .encadre {\n    padding: 16px;\n    border: 2px solid black;\n    margin: 24px;\n  }\n</style>\n\n<p class="encadre">Encadre-moi comme un tableau de maître !</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.querySelector('.encadre');
        if (!el) return { ok: false, message: 'Garde le paragraphe <code>class="encadre"</code>.' };
        const st = win.getComputedStyle(el);
        if (st.paddingTop !== '16px') return { ok: false, message: 'Commence par l\'espace intérieur : <code>padding: 16px;</code>' };
        if (st.borderTopWidth !== '2px' || st.borderTopStyle !== 'solid') return { ok: false, message: 'Padding OK ! Maintenant la bordure : <code>border: 2px solid black;</code> (les 3 valeurs, séparées par des espaces).' };
        if (st.marginTop !== '24px') return { ok: false, message: 'Plus que la marge extérieure : <code>margin: 24px;</code>' };
        return { ok: true, message: 'Le modèle de boîte est LA notion centrale du CSS — et tu viens de la mettre en pratique.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : padding vs margin, pour de vrai.</strong> Deux cartes collées l\'une à l\'autre, au texte écrasé contre les bords. Répare : donne à <code>.carte</code> un <code>padding</code> de <code>20px</code> (respiration intérieure) et une <code>margin-bottom</code> de <code>16px</code> (espace entre les cartes).',
      codeDepart: '<style>\n  .carte {\n    background-color: #eef1fe;\n    border-radius: 12px;\n  }\n</style>\n\n<div class="carte">\n  <h2>Carte du haut</h2>\n  <p>Mon texte est collé aux bords, à l\'aide !</p>\n</div>\n<div class="carte">\n  <h2>Carte du bas</h2>\n  <p>Et moi je suis collée à ma voisine.</p>\n</div>',
      indices: [
        "Deux problèmes distincts : le texte est écrasé contre les bords, et les cartes se touchent. Ce ne sont pas les mêmes réglages.",
        "Le texte écrasé, c’est un manque de <code>padding</code>. Les cartes collées, un manque de <code>margin</code>.",
        "<code>padding: 20px;</code> pour l’intérieur, <code>margin-bottom: 16px;</code> pour l’espace entre les cartes."
      ],
      solution: '<style>\n  .carte {\n    background-color: #eef1fe;\n    border-radius: 12px;\n    padding: 20px;\n    margin-bottom: 16px;\n  }\n</style>\n\n<div class="carte">\n  <h2>Carte du haut</h2>\n  <p>Mon texte est collé aux bords, à l\'aide !</p>\n</div>\n<div class="carte">\n  <h2>Carte du bas</h2>\n  <p>Et moi je suis collée à ma voisine.</p>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const cartes = ctx.doc.querySelectorAll('.carte');
        if (cartes.length < 2) return { ok: false, message: 'Garde les deux cartes du code de départ.' };
        const st = win.getComputedStyle(cartes[0]);
        if (st.paddingTop !== '20px') return { ok: false, message: 'Le texte est encore collé aux bords : <code>padding: 20px;</code> dans <code>.carte</code>.' };
        if (st.marginBottom !== '16px') return { ok: false, message: 'L\'intérieur respire ! Maintenant écarte les deux cartes : <code>margin-bottom: 16px;</code>' };
        return { ok: true, message: 'Padding pour l\'intérieur, margin pour l\'extérieur : tu ne les confondras plus jamais.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : fabrique un bouton.</strong> Un lien <code>&lt;a&gt;</code> peut ressembler à un vrai bouton avec le bon CSS ! Donne à <code>.btn</code> : un fond <code>#4f6df5</code>, un texte <code>white</code>, un padding <code>12px 24px</code> (haut/bas puis gauche/droite), des coins arrondis <code>10px</code>, et <code>text-decoration: none;</code> pour supprimer le soulignement.',
      codeDepart: '<style>\n  .btn {\n\n  }\n</style>\n\n<p>Ceci est un simple lien déguisé :</p>\n<a class="btn" href="#">Cliquez ici</a>',
      indices: [
        "Un lien ne ressemble pas à un bouton pour deux raisons : il n’a ni fond ni forme, et il porte un soulignement par défaut.",
        "Il faut donc un fond, une couleur de texte, de l’air autour, des coins arrondis — et surtout <strong>retirer</strong> le soulignement.",
        "<code>text-decoration: none;</code> est celle qu’on oublie, avec <code>padding: 12px 24px;</code> et <code>border-radius: 10px;</code>."
      ],
      solution: '<style>\n  .btn {\n    background-color: #4f6df5;\n    color: white;\n    padding: 12px 24px;\n    border-radius: 10px;\n    text-decoration: none;\n  }\n</style>\n\n<p>Ceci est un simple lien déguisé :</p>\n<a class="btn" href="#">Cliquez ici</a>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.querySelector('.btn');
        if (!el) return { ok: false, message: 'Garde le lien <code>class="btn"</code>.' };
        const st = win.getComputedStyle(el);
        if (st.backgroundColor !== 'rgb(79, 109, 245)') return { ok: false, message: 'Commence par le fond : <code>background-color: #4f6df5;</code>' };
        if (st.color !== 'rgb(255, 255, 255)') return { ok: false, message: 'Le texte doit passer en blanc : <code>color: white;</code>' };
        if (st.paddingTop !== '12px' || st.paddingLeft !== '24px') return { ok: false, message: 'Le padding à deux valeurs : <code>padding: 12px 24px;</code> (12 en haut/bas, 24 à gauche/droite).' };
        if (st.borderTopLeftRadius !== '10px') return { ok: false, message: 'Il manque les coins arrondis : <code>border-radius: 10px;</code>' };
        if (st.textDecorationLine !== 'none') return { ok: false, message: 'Dernier détail : le soulignement du lien. <code>text-decoration: none;</code> le supprime.' };
        return { ok: true, message: 'Tous les boutons de ce logiciel sont fabriqués EXACTEMENT comme ça. Tu connais maintenant le secret.' };
      }
    }
  ]
},

{
  id: 'css-6',
  titre: 'Flexbox : aligner et centrer',
  contenu: `
<p>Pendant des années, centrer un élément en CSS était un cauchemar. Puis <strong>Flexbox</strong> est arrivé et a tout simplifié. C'est aujourd'hui l'outil standard pour aligner des éléments.</p>

<h2>Le principe</h2>
<p>On l'active sur le <strong>parent</strong> (le conteneur), et ce sont ses <strong>enfants</strong> qui s'organisent :</p>
<pre class="bloc-code">.conteneur {
  display: flex;            /* active Flexbox */
  justify-content: center;  /* alignement horizontal */
  align-items: center;      /* alignement vertical */
  gap: 16px;                /* espace entre les enfants */
}</pre>

<ul>
<li><code>display: flex;</code> — les enfants se placent côte à côte (au lieu d'empilés) ;</li>
<li><code>justify-content</code> — répartition horizontale : <code>flex-start</code> (début), <code>center</code>, <code>flex-end</code> (fin), <code>space-between</code> (étalés aux extrémités) ;</li>
<li><code>align-items</code> — alignement vertical : <code>center</code>, <code>flex-start</code>, <code>flex-end</code> ;</li>
<li><code>gap</code> — l'espace entre chaque enfant, sans bidouiller les marges.</li>
</ul>

<div class="astuce">✅ La formule magique à retenir par cœur pour centrer parfaitement quelque chose (menus, pages de connexion, popups...) :<br><code>display: flex; justify-content: center; align-items: center;</code></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Trois pastilles sont empilées verticalement. Utilise Flexbox sur la classe <code>.rangee</code> pour les placer <strong>côte à côte, centrées</strong> horizontalement, avec un <code>gap</code> de <code>16px</code>.',
      codeDepart: '<style>\n  .rangee {\n\n  }\n  .pastille {\n    background: #4f6df5; color: white;\n    padding: 14px 20px; border-radius: 30px;\n  }\n</style>\n\n<div class="rangee">\n  <div class="pastille">Un</div>\n  <div class="pastille">Deux</div>\n  <div class="pastille">Trois</div>\n</div>',
      indices: [
        "Par défaut, ces éléments s’empilent. Une seule propriété change complètement la façon dont le conteneur range ses enfants.",
        "<code>display: flex</code> se met sur le <strong>parent</strong>, jamais sur les enfants. Ensuite, <code>justify-content</code> les place sur l’axe horizontal.",
        "<code>display: flex; justify-content: center; gap: 16px;</code> dans <code>.rangee</code>."
      ],
      solution: '<style>\n  .rangee {\n    display: flex;\n    justify-content: center;\n    gap: 16px;\n  }\n  .pastille {\n    background: #4f6df5; color: white;\n    padding: 14px 20px; border-radius: 30px;\n  }\n</style>\n\n<div class="rangee">\n  <div class="pastille">Un</div>\n  <div class="pastille">Deux</div>\n  <div class="pastille">Trois</div>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.querySelector('.rangee');
        if (!el) return { ok: false, message: 'Garde le <code>&lt;div class="rangee"&gt;</code> et ses pastilles.' };
        const st = win.getComputedStyle(el);
        if (st.display !== 'flex') return { ok: false, message: 'Première étape : activer Flexbox avec <code>display: flex;</code> dans la règle <code>.rangee</code>.' };
        if (st.justifyContent !== 'center') return { ok: false, message: 'Flexbox est activé (les pastilles sont côte à côte) ! Maintenant centre-les : <code>justify-content: center;</code>' };
        if (st.gap !== '16px' && st.columnGap !== '16px') return { ok: false, message: 'Dernière touche : espace-les avec <code>gap: 16px;</code>' };
        return { ok: true, message: 'Flexbox maîtrisé — c\'est l\'outil de mise en page que tu utiliseras le plus.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : la barre de navigation.</strong> Le grand classique du web : le logo à gauche, le menu à droite. Sur la classe <code>.barre</code>, active Flexbox avec <code>justify-content: space-between;</code> (les enfants s\'écartent aux deux extrémités) et <code>align-items: center;</code>.',
      codeDepart: '<style>\n  .barre {\n    background: #1e2432;\n    color: white;\n    padding: 14px 20px;\n\n  }\n  .menu { display: flex; gap: 18px; }\n</style>\n\n<div class="barre">\n  <strong>MonLogo</strong>\n  <div class="menu">\n    <span>Accueil</span>\n    <span>Tarifs</span>\n    <span>Contact</span>\n  </div>\n</div>',
      indices: [
        "Le logo à gauche, le menu à droite : il ne s’agit pas de centrer, mais de pousser les deux extrémités.",
        "<code>space-between</code> colle le premier élément au début, le dernier à la fin, et répartit l’espace entre. <code>align-items</code>, lui, gère l’alignement vertical.",
        "<code>display: flex; justify-content: space-between; align-items: center;</code>"
      ],
      solution: '<style>\n  .barre {\n    background: #1e2432;\n    color: white;\n    padding: 14px 20px;\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .menu { display: flex; gap: 18px; }\n</style>\n\n<div class="barre">\n  <strong>MonLogo</strong>\n  <div class="menu">\n    <span>Accueil</span>\n    <span>Tarifs</span>\n    <span>Contact</span>\n  </div>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.querySelector('.barre');
        if (!el) return { ok: false, message: 'Garde la <code>&lt;div class="barre"&gt;</code> et son contenu.' };
        const st = win.getComputedStyle(el);
        if (st.display !== 'flex') return { ok: false, message: 'Active d\'abord Flexbox : <code>display: flex;</code> dans <code>.barre</code>.' };
        if (st.justifyContent !== 'space-between') return { ok: false, message: 'Il faut écarter logo et menu aux deux extrémités : <code>justify-content: space-between;</code>' };
        if (st.alignItems !== 'center') return { ok: false, message: 'Presque : aligne verticalement avec <code>align-items: center;</code>' };
        return { ok: true, message: 'Cette barre logo-à-gauche-menu-à-droite, tu la vois sur 90% des sites du monde. Maintenant tu sais la faire.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : le centrage parfait.</strong> La carte doit se retrouver exactement au CENTRE de la zone grise (horizontalement ET verticalement). Applique la formule magique de la leçon sur la classe <code>.zone</code>.',
      codeDepart: '<style>\n  .zone {\n    background: #e4e7ef;\n    height: 220px;\n\n  }\n  .carte {\n    background: white;\n    padding: 20px 30px;\n    border-radius: 12px;\n  }\n</style>\n\n<div class="zone">\n  <div class="carte">Parfaitement centrée ?</div>\n</div>',
      indices: [
        "Centrer horizontalement, tu sais faire. Le vrai sujet ici, c’est le centrage <strong>vertical</strong>, longtemps réputé difficile en CSS.",
        "Flexbox le règle en une ligne de plus : un axe est géré par <code>justify-content</code>, l’autre par <code>align-items</code>.",
        "<code>display: flex; justify-content: center; align-items: center;</code> sur <code>.zone</code>."
      ],
      solution: '<style>\n  .zone {\n    background: #e4e7ef;\n    height: 220px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .carte {\n    background: white;\n    padding: 20px 30px;\n    border-radius: 12px;\n  }\n</style>\n\n<div class="zone">\n  <div class="carte">Parfaitement centrée ?</div>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.querySelector('.zone');
        if (!el || !ctx.doc.querySelector('.carte')) return { ok: false, message: 'Garde la zone et la carte du code de départ.' };
        const st = win.getComputedStyle(el);
        if (st.display !== 'flex') return { ok: false, message: 'Commence par <code>display: flex;</code> sur <code>.zone</code> (le PARENT — c\'est toujours le parent qui pilote).' };
        if (st.justifyContent !== 'center') return { ok: false, message: 'Centre horizontalement : <code>justify-content: center;</code>' };
        if (st.alignItems !== 'center') return { ok: false, message: 'Et verticalement : <code>align-items: center;</code> — c\'est ça qui était presque impossible avant Flexbox !' };
        return { ok: true, message: 'La formule magique est à toi. Pages de connexion, popups, écrans de chargement : tu sauras toujours les centrer.' };
      }
    }
  ]
},

{
  id: 'css-7',
  titre: 'Survol et transitions : donner vie',
  contenu: `
<p>Un site moderne <em>réagit</em> : les boutons changent au survol de la souris, en douceur. Deux outils CSS suffisent.</p>

<h2>1. La pseudo-classe :hover</h2>
<p>En ajoutant <code>:hover</code> à un sélecteur, la règle ne s'applique que <strong>quand la souris survole</strong> l'élément :</p>
<pre class="bloc-code">.bouton {
  background-color: #4f6df5;
}
.bouton:hover {
  background-color: #22c55e;  /* devient vert au survol */
}</pre>

<h2>2. La transition</h2>
<p>Par défaut, le changement est instantané — brutal. La propriété <code>transition</code> le rend progressif :</p>
<pre class="bloc-code">.bouton {
  background-color: #4f6df5;
  transition: background-color 0.3s;
}</pre>
<p>Ça se lit : « quand <code>background-color</code> change, étale le changement sur 0,3 seconde ». On peut aussi écrire <code>transition: all 0.3s;</code> pour animer tous les changements.</p>

<div class="info">💬 Important : la transition se déclare sur l'état <strong>normal</strong> (pas dans le <code>:hover</code>), pour que l'animation joue à l'aller ET au retour de la souris.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Rends le bouton vivant : ajoute une règle <code>.btn:hover</code> qui passe le fond en <code>#22c55e</code>, et ajoute <code>transition: background-color 0.3s;</code> dans la règle <code>.btn</code>. Puis survole le bouton dans l\'aperçu pour admirer !',
      codeDepart: '<style>\n  .btn {\n    background-color: #4f6df5;\n    color: white;\n    padding: 12px 24px;\n    border: none;\n    border-radius: 10px;\n    font-size: 16px;\n  }\n</style>\n\n<button class="btn">Survole-moi</button>',
      indices: [
        "Deux choses à écrire : ce qui se passe au survol, et ce qui rend le changement <em>progressif</em> plutôt que brutal.",
        "<code>:hover</code> s’accroche au sélecteur et forme une <strong>nouvelle</strong> règle. La transition, elle, se met sur l’état normal — pas sur le survol.",
        "<code>.btn:hover { background-color: #22c55e; }</code>, et <code>transition: background-color 0.3s;</code> dans <code>.btn</code>."
      ],
      solution: '<style>\n  .btn {\n    background-color: #4f6df5;\n    color: white;\n    padding: 12px 24px;\n    border: none;\n    border-radius: 10px;\n    font-size: 16px;\n    transition: background-color 0.3s;\n  }\n  .btn:hover {\n    background-color: #22c55e;\n  }\n</style>\n\n<button class="btn">Survole-moi</button>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const btn = ctx.doc.querySelector('.btn');
        if (!btn) return { ok: false, message: 'Garde le bouton <code>class="btn"</code>.' };
        const st = win.getComputedStyle(btn);
        const aHover = /\.btn:hover\s*\{[^}]*background/i.test(ctx.code);
        if (!aHover) return { ok: false, message: 'Je ne trouve pas la règle <code>.btn:hover { background-color: #22c55e; }</code> — vérifie l\'orthographe de <code>:hover</code> (collé au sélecteur).' };
        if (!/22c55e/i.test(ctx.code)) return { ok: false, message: 'La couleur de survol attendue est <code>#22c55e</code>.' };
        if (st.transitionDuration === '0s') return { ok: false, message: 'Le :hover est bon ! Il manque la douceur : <code>transition: background-color 0.3s;</code> dans la règle <code>.btn</code> (pas dans le :hover).' };
        return { ok: true, message: 'Survole le bouton dans l\'aperçu : ce petit fondu, c\'est toi qui l\'as codé.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : la carte qui se soulève.</strong> Effet très en vogue : au survol, la carte grossit légèrement. Ajoute à <code>.carte</code> une <code>transition: all 0.3s;</code>, puis une règle <code>.carte:hover</code> avec <code>transform: scale(1.05);</code> (agrandissement de 5%) et un fond <code>#4f6df5</code> avec texte <code>white</code>.',
      codeDepart: '<style>\n  .carte {\n    background: #eef1fe;\n    padding: 24px;\n    border-radius: 14px;\n    width: 220px;\n  }\n</style>\n\n<div class="carte">\n  <h2>Offre Premium</h2>\n  <p>Survole-moi pour voir la magie.</p>\n</div>',
      indices: [
        "Même principe qu’à l’exercice précédent, mais avec plusieurs propriétés qui changent en même temps.",
        "<code>transition: all</code> anime tout ce qui bouge. Et grossir légèrement, c’est <code>transform: scale(…)</code> — pas une modification de largeur.",
        "<code>.carte:hover { transform: scale(1.05); … }</code>, avec <code>transition: all 0.3s;</code> sur <code>.carte</code>."
      ],
      solution: '<style>\n  .carte {\n    background: #eef1fe;\n    padding: 24px;\n    border-radius: 14px;\n    width: 220px;\n    transition: all 0.3s;\n  }\n  .carte:hover {\n    transform: scale(1.05);\n    background: #4f6df5;\n    color: white;\n  }\n</style>\n\n<div class="carte">\n  <h2>Offre Premium</h2>\n  <p>Survole-moi pour voir la magie.</p>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.querySelector('.carte');
        if (!el) return { ok: false, message: 'Garde la carte du code de départ.' };
        if (win.getComputedStyle(el).transitionDuration === '0s') return { ok: false, message: 'Commence par la transition dans <code>.carte</code> : <code>transition: all 0.3s;</code>' };
        if (!/\.carte:hover\s*\{[^}]*transform\s*:\s*scale/i.test(ctx.code)) return { ok: false, message: 'Il manque la règle <code>.carte:hover</code> avec <code>transform: scale(1.05);</code>' };
        if (!/\.carte:hover\s*\{[^}]*(background|color)/i.test(ctx.code)) return { ok: false, message: 'Le scale est là ! Ajoute aussi le changement de couleurs dans le :hover (fond #4f6df5, texte white).' };
        return { ok: true, message: 'Survole la carte dans l\'aperçu — cet effet de zoom doux, tu le reverras sur tous les sites modernes. (Les cartes de l\'accueil de ce logiciel font pareil !)' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Pourquoi place-t-on la <code>transition</code> dans la règle normale (<code>.btn</code>) plutôt que dans le <code>:hover</code> ?',
      choix: [
        'Parce que c\'est interdit de la mettre dans un :hover',
        'Pour que l\'animation joue à l\'aller ET au retour de la souris',
        'Parce que ça rend l\'animation plus rapide',
        'Aucune raison, les deux sont identiques'
      ],
      bonne: 1,
      explication: 'Dans le :hover, la transition ne s\'appliquerait qu\'à l\'arrivée de la souris — au départ, le retour serait brutal. Sur l\'état normal, elle joue dans les deux sens.',
      aides: [
        'Ce n\'est pas interdit — ça fonctionne, mais avec un effet de bord gênant au retour de la souris...',
        '',
        'La vitesse est fixée par la durée (0.3s), peu importe où la transition est déclarée.',
        'Essaie les deux dans l\'exercice précédent : tu verras une vraie différence quand la souris REPART de l\'élément.'
      ]
    }
  ]
},

{
  id: 'css-8',
  titre: 'Responsive : s\'adapter aux écrans',
  contenu: `
<p>Ta page sera vue sur des écrans de 30 pouces et des téléphones de 6 pouces. Le design <strong>responsive</strong> (« adaptatif »), c'est faire en sorte qu'elle soit belle partout.</p>

<h2>Les media queries</h2>
<p>L'outil principal : la <strong>media query</strong>, un bloc de CSS qui ne s'applique que si une condition d'écran est remplie :</p>
<pre class="bloc-code">.colonnes {
  display: flex;
  gap: 16px;
}

/* Si l'écran fait 600px de large ou moins... */
@media (max-width: 600px) {
  .colonnes {
    flex-direction: column;  /* ...on empile au lieu d'aligner */
  }
}</pre>
<p>Ça se lit : « par défaut, les colonnes sont côte à côte ; mais sur un écran étroit (≤ 600px), empile-les verticalement ». <code>flex-direction: column;</code> est une propriété Flexbox qui change le sens d'empilement.</p>

<h2>Les bons réflexes responsive</h2>
<ul>
<li>éviter les largeurs fixes trop grandes (préférer <code>max-width</code> ou les pourcentages) ;</li>
<li><code>img { max-width: 100%; }</code> pour que les images ne débordent jamais ;</li>
<li>tester en réduisant la fenêtre de son navigateur.</li>
</ul>

<div class="astuce">✅ Tu peux tester en direct : dans les exercices ci-dessous, la zone d'aperçu est étroite (moins de 600px), donc tes media queries s'y déclencheront !</div>
`,
  exercices: [
    {
      type: 'html',
      largeur: 380,   // aperçu volontairement étroit : la media query doit pouvoir s'y déclencher
      consigne: 'Les deux cartes sont côte à côte, mais l\'aperçu est un écran étroit : ajoute une media query <code>@media (max-width: 600px)</code> qui passe <code>.colonnes</code> en <code>flex-direction: column;</code>. Tu verras les cartes s\'empiler dans l\'aperçu.',
      codeDepart: '<style>\n  .colonnes {\n    display: flex;\n    gap: 16px;\n  }\n  .carte {\n    background: #eef1fe;\n    padding: 20px;\n    border-radius: 12px;\n    flex: 1;\n  }\n</style>\n\n<div class="colonnes">\n  <div class="carte">Carte A</div>\n  <div class="carte">Carte B</div>\n</div>',
      indices: [
        "Le CSS écrit jusqu’ici s’applique toujours. Ici, il ne doit s’appliquer qu’en dessous d’une certaine largeur d’écran.",
        "Une <em>media query</em> est un bloc qui <strong>contient</strong> des règles : il y a donc deux niveaux d’accolades, et deux à refermer à la fin.",
        "<code>@media (max-width: 600px) { .colonnes { flex-direction: column; } }</code>"
      ],
      solution: '<style>\n  .colonnes {\n    display: flex;\n    gap: 16px;\n  }\n  .carte {\n    background: #eef1fe;\n    padding: 20px;\n    border-radius: 12px;\n    flex: 1;\n  }\n  @media (max-width: 600px) {\n    .colonnes {\n      flex-direction: column;\n    }\n  }\n</style>\n\n<div class="colonnes">\n  <div class="carte">Carte A</div>\n  <div class="carte">Carte B</div>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const el = ctx.doc.querySelector('.colonnes');
        if (!el) return { ok: false, message: 'Garde le <code>&lt;div class="colonnes"&gt;</code> et ses cartes.' };
        if (!/@media\s*\(\s*max-width\s*:\s*600px\s*\)/i.test(ctx.code)) return { ok: false, message: 'Je ne trouve pas la media query. Elle commence par : <code>@media (max-width: 600px) {</code>' };
        const st = win.getComputedStyle(el);
        if (st.flexDirection !== 'column') return { ok: false, message: 'La media query est là, mais la règle à l\'intérieur ne s\'applique pas. Elle doit contenir : <code>.colonnes { flex-direction: column; }</code> — vérifie que chaque accolade ouverte est bien refermée.' };
        return { ok: true, message: 'Ta page s\'adapte à l\'écran — bienvenue dans le monde du responsive.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : l\'image qui déborde.</strong> Cette image de 800px de large déborde de l\'aperçu (regarde la barre de défilement horizontale !). Ajoute la règle réflexe des pros : <code>img { max-width: 100%; }</code> — et le débordement disparaît.',
      codeDepart: '<style>\n\n</style>\n\n<h1>Mon paysage</h1>\n<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'200\'%3E%3Crect width=\'800\' height=\'200\' fill=\'%234f6df5\'/%3E%3Ctext x=\'400\' y=\'110\' fill=\'white\' font-size=\'30\' text-anchor=\'middle\'%3EImage de 800px de large%3C/text%3E%3C/svg%3E" alt="Un paysage bleu très large">\n<p>Ce texte est bien visible, mais l\'image déborde !</p>',
      indices: [
        "L’image fait 800 px de large, et l’aperçu bien moins. Plutôt que de lui fixer une largeur, il vaut mieux lui poser une <strong>limite</strong>.",
        "<code>max-width</code> en pourcentage se calcule sur la largeur du conteneur : l’image rétrécira si besoin, mais ne grossira jamais au-delà de sa taille réelle.",
        "<code>img { max-width: 100%; }</code>"
      ],
      solution: '<style>\n  img { max-width: 100%; }\n</style>\n\n<h1>Mon paysage</h1>\n<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'200\'%3E%3Crect width=\'800\' height=\'200\' fill=\'%234f6df5\'/%3E%3Ctext x=\'400\' y=\'110\' fill=\'white\' font-size=\'30\' text-anchor=\'middle\'%3EImage de 800px de large%3C/text%3E%3C/svg%3E" alt="Un paysage bleu très large">\n<p>Ce texte est bien visible, mais l\'image déborde !</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const img = ctx.doc.querySelector('img');
        if (!img) return { ok: false, message: 'Garde l\'image du code de départ.' };
        const st = win.getComputedStyle(img);
        if (st.maxWidth !== '100%') return { ok: false, message: 'La règle attendue : <code>img { max-width: 100%; }</code> dans la balise style.' };
        return { ok: true, message: 'Une ligne de CSS, et plus jamais d\'image qui déborde. Ce réflexe est dans le code de démarrage de quasiment tous les sites professionnels.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Que signifie <code>@media (max-width: 600px) { ... }</code> ?',
      choix: [
        'Les règles s\'appliquent seulement si l\'écran fait 600px de large OU MOINS',
        'Les règles s\'appliquent seulement si l\'écran fait 600px de large OU PLUS',
        'La page ne peut pas dépasser 600px de large',
        'Les images sont limitées à 600px'
      ],
      bonne: 0,
      explication: '<code>max-width: 600px</code> = « largeur maximum 600px » = écrans étroits (téléphones). Pour cibler les grands écrans, on utiliserait <code>min-width</code>. 🏆 <strong>Module CSS terminé !</strong> Structure + apparence : tu sais construire de vraies pages. Place au JavaScript, le gros morceau.',
      aides: [
        '',
        'C\'est l\'inverse : <code>max-width</code> fixe un plafond. La condition est vraie pour les écrans PLUS PETITS que 600px. (<code>min-width</code> ferait ce que tu décris.)',
        'La media query ne limite pas la taille de la page : elle applique des règles CSS différentes SELON la taille de l\'écran.',
        'Rien à voir avec les images : la condition porte sur la largeur de l\'écran/fenêtre.'
      ]
    }
  ]
},

];
