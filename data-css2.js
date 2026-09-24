/* ===== Module CSS — leçons 9 à 15 (approfondissement) ===== */
window.DATA_CSS2 = [

{
  id: 'css-9',
  titre: 'Les unités : %, rem, vh',
  contenu: `
<p>Tu n'as utilisé que des pixels. Les pros jonglent avec quatre familles d'unités — chacune résout un problème précis.</p>

<h2>Le pixel (px) : l'absolu</h2>
<p>Taille fixe, identique partout. Parfait pour les bordures, les petits espacements... mais rigide pour les mises en page.</p>

<h2>Le pourcentage (%) : relatif au parent</h2>
<pre class="bloc-code">.colonne { width: 50%; }   /* la moitié de la largeur de son PARENT */</pre>

<h2>Le rem : relatif à la taille de texte de base</h2>
<pre class="bloc-code">h1 { font-size: 2rem; }      /* 2 × 16px = 32px */
p  { font-size: 1.125rem; }  /* 18px */</pre>
<p><code>1rem</code> = la taille de texte racine du navigateur (16px par défaut). L'énorme avantage : si l'utilisateur agrandit le texte dans ses réglages (malvoyance...), tout ton site suit proportionnellement. Les pixels, eux, ignorent ce réglage. <strong>Le réflexe pro : rem pour les textes.</strong></p>

<h2>vh / vw : relatifs à l'écran</h2>
<pre class="bloc-code">.hero { height: 100vh; }   /* toute la hauteur de l'écran */
.demi { height: 50vh; }    /* la moitié */</pre>
<p><code>100vh</code> = 100% de la hauteur du <em>viewport</em> (la fenêtre), <code>vw</code> pareil en largeur. C'est l'unité des grandes sections d'accueil plein écran.</p>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'La jauge de progression : donne à <code>.barre-fond</code> une largeur de <code>100%</code>, et à <code>.barre-remplie</code> une largeur de <code>75%</code> (75% de son parent, la barre de fond !). Observe : redimensionne mentalement — tout suivrait.',
      codeDepart: '<style>\n  .barre-fond {\n    background: #e4e7ef;\n    border-radius: 20px;\n    height: 24px;\n  }\n  .barre-remplie {\n    background: #22c55e;\n    border-radius: 20px;\n    height: 24px;\n  }\n</style>\n\n<p>Progression du niveau :</p>\n<div class="barre-fond">\n  <div class="barre-remplie"></div>\n</div>',
      indices: [
        "Deux largeurs à poser, et leur relation fait tout : la barre intérieure se mesure par rapport à celle qui la contient.",
        "Un pourcentage se calcule toujours sur le parent. 100 % pour le fond, et la part voulue pour le remplissage.",
        "<code>width: 100%;</code> dans <code>.barre-fond</code>, <code>width: 75%;</code> dans <code>.barre-remplie</code>."
      ],
      solution: '<style>\n  .barre-fond {\n    background: #e4e7ef;\n    border-radius: 20px;\n    height: 24px;\n    width: 100%;\n  }\n  .barre-remplie {\n    background: #22c55e;\n    border-radius: 20px;\n    height: 24px;\n    width: 75%;\n  }\n</style>\n\n<p>Progression du niveau :</p>\n<div class="barre-fond">\n  <div class="barre-remplie"></div>\n</div>',
      verifier: function (ctx) {
        const fond = ctx.doc.querySelector('.barre-fond');
        const remplie = ctx.doc.querySelector('.barre-remplie');
        if (!fond || !remplie) return { ok: false, message: 'Garde les deux barres du code de départ.' };
        if (!/width\s*:\s*75%/.test(ctx.code)) return { ok: false, message: 'La barre remplie doit avoir <code>width: 75%;</code> — en pourcentage, pas en pixels !' };
        const lf = fond.getBoundingClientRect().width;
        const lr = remplie.getBoundingClientRect().width;
        if (lf === 0) return { ok: false, message: 'La barre de fond doit avoir <code>width: 100%;</code>.' };
        if (Math.abs(lr / lf - 0.75) > 0.02) return { ok: false, message: 'La barre verte devrait occuper 75% de la barre de fond (mesuré : ' + Math.round(lr / lf * 100) + '%). Le % se calcule par rapport au PARENT.' };
        return { ok: true, message: 'Cette jauge, c\'est exactement la barre de progression de ce logiciel (regarde en bas à gauche !) — 100% élastique.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : le texte en rem.</strong> Convertis les tailles en rem : le <code>h1</code> à <code>2rem</code> (= 32px), le paragraphe à <code>1.25rem</code> (= 20px). Le calcul : pixels voulus ÷ 16.',
      codeDepart: '<style>\n  h1 {\n\n  }\n  p {\n\n  }\n</style>\n\n<h1>Un titre accessible</h1>\n<p>Un texte qui respecte les réglages de l\'utilisateur.</p>',
      indices: [
        "Le <code>rem</code> ne fixe pas une taille absolue : il se calcule à partir de la taille de base du navigateur.",
        "Cette base vaut 16 px par défaut. Il suffit donc de diviser la taille voulue par 16.",
        "<code>h1 { font-size: 2rem; }</code> et <code>p { font-size: 1.25rem; }</code>"
      ],
      solution: '<style>\n  h1 {\n    font-size: 2rem;\n  }\n  p {\n    font-size: 1.25rem;\n  }\n</style>\n\n<h1>Un titre accessible</h1>\n<p>Un texte qui respecte les réglages de l\'utilisateur.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        if (!/rem/.test(ctx.code)) return { ok: false, message: 'L\'exercice demande l\'unité <code>rem</code> — pas de pixels ici !' };
        const h1 = ctx.doc.querySelector('h1');
        const p = ctx.doc.querySelector('p');
        if (win.getComputedStyle(h1).fontSize !== '32px') return { ok: false, message: 'Le h1 doit faire 2rem, soit 32px calculés (obtenu : ' + win.getComputedStyle(h1).fontSize + ').' };
        if (win.getComputedStyle(p).fontSize !== '20px') return { ok: false, message: 'Le h1 est bon ! Le paragraphe doit faire 1.25rem = 20px (obtenu : ' + win.getComputedStyle(p).fontSize + ').' };
        return { ok: true, message: 'Mêmes tailles à l\'écran qu\'en pixels — mais si un utilisateur malvoyant agrandit son texte de base, TA page suivra. C\'est ça, l\'accessibilité.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : la section plein écran.</strong> Crée l\'écran d\'accueil d\'un site : la classe <code>.hero</code> doit occuper <code>100vh</code> (toute la hauteur visible), avec le contenu parfaitement centré (la formule Flexbox !), un fond <code>#1e2432</code> et un texte <code>white</code>.',
      codeDepart: '<style>\n  body { margin: 0; font-family: sans-serif; }\n  .hero {\n\n  }\n</style>\n\n<div class="hero">\n  <h1>Bienvenue dans le grand bain</h1>\n</div>\n\n<p style="padding: 20px">Ce contenu n\'apparaît qu\'en défilant — l\'écran d\'accueil prend TOUTE la hauteur.</p>',
      indices: [
        "Occuper tout l’écran ne se fait pas en pixels : il existe une unité qui vaut un pourcentage de la hauteur de la fenêtre.",
        "<code>vh</code> veut dire « viewport height » : <code>100vh</code>, c’est toute la hauteur visible. Le centrage, lui, passe par Flexbox.",
        "<code>height: 100vh;</code> plus <code>display: flex; justify-content: center; align-items: center;</code>"
      ],
      solution: '<style>\n  body { margin: 0; font-family: sans-serif; }\n  .hero {\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    background: #1e2432;\n    color: white;\n  }\n</style>\n\n<div class="hero">\n  <h1>Bienvenue dans le grand bain</h1>\n</div>\n\n<p style="padding: 20px">Ce contenu n\'apparaît qu\'en défilant — l\'écran d\'accueil prend TOUTE la hauteur.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const hero = ctx.doc.querySelector('.hero');
        if (!hero) return { ok: false, message: 'Garde la div <code>.hero</code>.' };
        if (!/100vh/.test(ctx.code)) return { ok: false, message: 'La hauteur doit s\'exprimer en unité d\'écran : <code>height: 100vh;</code>' };
        const h = hero.getBoundingClientRect().height;
        if (Math.abs(h - win.innerHeight) > 5) return { ok: false, message: 'La section devrait mesurer exactement la hauteur de l\'aperçu (' + win.innerHeight + 'px), elle mesure ' + Math.round(h) + 'px.' };
        const st = win.getComputedStyle(hero);
        if (st.display !== 'flex' || st.justifyContent !== 'center' || st.alignItems !== 'center') return { ok: false, message: 'La hauteur est bonne ! Centre maintenant le titre avec la formule magique Flexbox.' };
        if (st.backgroundColor !== 'rgb(30, 36, 50)') return { ok: false, message: 'Dernière touche : le fond <code>#1e2432</code> (et le texte blanc).' };
        return { ok: true, message: 'L\'écran d\'accueil plein écran au titre centré : l\'ouverture de la moitié des sites vitrines modernes. Fais défiler l\'aperçu pour voir la suite !' };
      }
    }
  ]
},

{
  id: 'css-10',
  titre: 'position : sortir du flux',
  contenu: `
<p>Par défaut, les éléments s'empilent dans l'ordre du HTML — le « flux normal ». La propriété <code>position</code> permet d'en sortir : superposer, épingler, ancrer.</p>

<h2>Les quatre modes</h2>
<ul>
<li><code>position: relative;</code> — l'élément reste à sa place, mais devient un <strong>point de repère</strong> pour ses enfants absolus (et peut être décalé avec top/left...) ;</li>
<li><code>position: absolute;</code> — l'élément <strong>quitte le flux</strong> et se place par rapport à son ancêtre positionné le plus proche (le fameux parent en relative !) ;</li>
<li><code>position: fixed;</code> — épinglé par rapport à la <strong>fenêtre</strong> : il ne bouge pas au défilement (bandeaux cookies, boutons de chat...) ;</li>
<li><code>position: sticky;</code> — hybride : défile normalement, puis se colle en atteignant le bord (les en-têtes de menu qui restent visibles).</li>
</ul>

<h2>Le duo iconique : relative + absolute</h2>
<pre class="bloc-code">.carte { position: relative; }
.badge {
  position: absolute;
  top: 8px;
  right: 8px;
}</pre>
<p>Le badge se cale en haut à droite <strong>de la carte</strong> (pas de la page !). Pastilles « Promo », compteurs de notifications, croix de fermeture : ce motif est partout.</p>

<div class="attention">⚠️ L'oubli du <code>relative</code> sur le parent est LE bug de position classique : l'enfant absolu se réfère alors à la page entière et atterrit n'importe où.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Pose le badge « PROMO » en haut à droite de la carte : <code>.carte</code> passe en <code>position: relative;</code>, et <code>.badge</code> en <code>position: absolute;</code> avec <code>top: 8px;</code> et <code>right: 8px;</code>.',
      codeDepart: '<style>\n  .carte {\n    background: #eef1fe;\n    border-radius: 12px;\n    padding: 24px;\n    width: 220px;\n  }\n  .badge {\n    background: #e63946;\n    color: white;\n    padding: 4px 10px;\n    border-radius: 20px;\n    font-size: 13px;\n    display: inline-block;\n  }\n</style>\n\n<div class="carte">\n  <span class="badge">PROMO</span>\n  <h2>Casque audio</h2>\n  <p>59,99 €</p>\n</div>',
      indices: [
        "Un élément en position absolue se place par rapport à son ancêtre positionné le plus proche. Sans ancêtre, il se cale sur la page entière.",
        "C’est pourquoi le parent doit passer en <code>relative</code> : il devient la référence. L’enfant, lui, passe en <code>absolute</code>.",
        "<code>position: relative;</code> dans <code>.carte</code> ; <code>position: absolute; top: 8px; right: 8px;</code> dans <code>.badge</code>."
      ],
      solution: '<style>\n  .carte {\n    background: #eef1fe;\n    border-radius: 12px;\n    padding: 24px;\n    width: 220px;\n    position: relative;\n  }\n  .badge {\n    background: #e63946;\n    color: white;\n    padding: 4px 10px;\n    border-radius: 20px;\n    font-size: 13px;\n    display: inline-block;\n    position: absolute;\n    top: 8px;\n    right: 8px;\n  }\n</style>\n\n<div class="carte">\n  <span class="badge">PROMO</span>\n  <h2>Casque audio</h2>\n  <p>59,99 €</p>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const carte = ctx.doc.querySelector('.carte');
        const badge = ctx.doc.querySelector('.badge');
        if (!carte || !badge) return { ok: false, message: 'Garde la carte et le badge.' };
        if (win.getComputedStyle(badge).position !== 'absolute') return { ok: false, message: 'Le badge doit passer en <code>position: absolute;</code> avec <code>top: 8px; right: 8px;</code>.' };
        if (win.getComputedStyle(carte).position !== 'relative') return { ok: false, message: 'LE piège de la leçon : sans <code>position: relative;</code> sur la carte, le badge se réfère à la page entière. Ajoute-le !' };
        const rc = carte.getBoundingClientRect();
        const rb = badge.getBoundingClientRect();
        if (Math.abs(rb.top - rc.top - 8) > 3 || Math.abs(rc.right - rb.right - 8) > 3) return { ok: false, message: 'Le badge devrait se caler à 8px du haut et de la droite DE LA CARTE. Vérifie top/right (et que le relative est bien sur .carte).' };
        return { ok: true, message: 'Le duo relative/absolute est à toi. Pastilles de notification, croix de fermeture, prix barrés : tout se positionne comme ça.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : le bandeau épinglé.</strong> Le bandeau cookie doit rester collé en BAS de la fenêtre, même en défilant : donne à <code>.bandeau</code> une <code>position: fixed;</code>, <code>bottom: 0;</code>, <code>left: 0;</code> et <code>width: 100%;</code>. Fais défiler l\'aperçu pour vérifier qu\'il ne bouge pas !',
      codeDepart: '<style>\n  body { margin: 0; font-family: sans-serif; }\n  .bandeau {\n    background: #1e2432;\n    color: white;\n    padding: 14px 20px;\n  }\n</style>\n\n<h1>Un long article</h1>\n<p>Paragraphe 1...</p><p>Paragraphe 2...</p><p>Paragraphe 3...</p>\n<p>Paragraphe 4...</p><p>Paragraphe 5...</p><p>Paragraphe 6...</p>\n<p>Paragraphe 7...</p><p>Paragraphe 8...</p><p>Paragraphe 9...</p>\n\n<div class="bandeau">🍪 Ce site utilise des cookies (imaginaires).</div>',
      indices: [
        "Le bandeau ne doit pas bouger quand on fait défiler : ce n’est donc ni <code>relative</code>, ni <code>absolute</code>.",
        "<code>fixed</code> le cale sur la fenêtre, pas sur le document. Il faut ensuite lui dire où, et lui donner une largeur.",
        "<code>position: fixed; bottom: 0; left: 0; width: 100%;</code>"
      ],
      solution: '<style>\n  body { margin: 0; font-family: sans-serif; }\n  .bandeau {\n    background: #1e2432;\n    color: white;\n    padding: 14px 20px;\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n  }\n</style>\n\n<h1>Un long article</h1>\n<p>Paragraphe 1...</p><p>Paragraphe 2...</p><p>Paragraphe 3...</p>\n<p>Paragraphe 4...</p><p>Paragraphe 5...</p><p>Paragraphe 6...</p>\n<p>Paragraphe 7...</p><p>Paragraphe 8...</p><p>Paragraphe 9...</p>\n\n<div class="bandeau">🍪 Ce site utilise des cookies (imaginaires).</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const bandeau = ctx.doc.querySelector('.bandeau');
        if (!bandeau) return { ok: false, message: 'Garde le bandeau cookie.' };
        const st = win.getComputedStyle(bandeau);
        if (st.position !== 'fixed') return { ok: false, message: 'Pour l\'épingler à la FENÊTRE (et non à la page qui défile) : <code>position: fixed;</code>' };
        if (st.bottom !== '0px') return { ok: false, message: 'Cale-le en bas : <code>bottom: 0;</code>' };
        const r = bandeau.getBoundingClientRect();
        if (Math.abs(r.bottom - win.innerHeight) > 3) return { ok: false, message: 'Le bandeau devrait toucher le bas de la fenêtre — vérifie fixed + bottom: 0.' };
        if (r.width < win.innerWidth * 0.95) return { ok: false, message: 'Presque : il doit traverser toute la largeur (<code>left: 0; width: 100%;</code>).' };
        return { ok: true, message: 'Fais défiler l\'aperçu : le bandeau reste vissé en bas. Fixed = épinglé à la fenêtre, quoi qu\'il arrive.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Un élément en <code>position: absolute;</code> se positionne par rapport à...',
      choix: [
        'Toujours par rapport à la page entière',
        'Son ancêtre positionné le plus proche (souvent un parent en relative), sinon la page',
        'L\'élément juste avant lui dans le HTML',
        'Le centre de l\'écran'
      ],
      bonne: 1,
      explication: 'L\'absolu cherche un repère en remontant ses ancêtres : le premier qui a une position (relative, absolute, fixed...) devient sa référence. Aucun trouvé → la page. D\'où le réflexe : <code>relative</code> sur le parent.',
      aides: [
        'Seulement si AUCUN ancêtre n\'est positionné — c\'est justement le bug classique !',
        '',
        'L\'ordre du HTML n\'a plus d\'importance une fois sorti du flux.',
        'Rien ne se réfère au centre par défaut — le centrage, c\'est le travail de Flexbox.'
      ]
    }
  ]
},

{
  id: 'css-11',
  titre: 'CSS Grid : les grilles',
  contenu: `
<p>Flexbox aligne sur UNE ligne (ou colonne). Pour un vrai quadrillage — galeries, tableaux de bord, pages entières — voici <strong>Grid</strong>, l'autre grand système de mise en page.</p>

<h2>La base : définir les colonnes</h2>
<pre class="bloc-code">.galerie {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;   /* 3 colonnes égales */
  gap: 16px;
}</pre>
<p>Les enfants se rangent automatiquement dans la grille, ligne après ligne. L'unité <code>fr</code> (<em>fraction</em>) partage l'espace disponible : <code>1fr 1fr 1fr</code> = trois parts égales, <code>2fr 1fr</code> = deux tiers / un tiers.</p>

<h2>Mélanger fixe et souple</h2>
<pre class="bloc-code">.app {
  display: grid;
  grid-template-columns: 200px 1fr;   /* menu fixe + contenu extensible */
}</pre>
<p>La mise en page de CE logiciel (menu à gauche, contenu à droite) suit exactement cette logique !</p>

<h2>Grid ou Flexbox ?</h2>
<div class="astuce">✅ La règle simple : <strong>une dimension → Flexbox</strong> (une barre de nav, une rangée de boutons) ; <strong>deux dimensions → Grid</strong> (une galerie, un dashboard). Les deux se combinent sans problème dans une même page — c'est même la norme.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Range les 6 photos en galerie : active <code>display: grid;</code> sur <code>.galerie</code>, avec <code>grid-template-columns: 1fr 1fr 1fr;</code> (3 colonnes égales) et un <code>gap</code> de <code>12px</code>.',
      codeDepart: '<style>\n  .galerie {\n\n  }\n  .photo {\n    background: #4f6df5;\n    height: 80px;\n    border-radius: 10px;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n</style>\n\n<div class="galerie">\n  <div class="photo">1</div>\n  <div class="photo">2</div>\n  <div class="photo">3</div>\n  <div class="photo">4</div>\n  <div class="photo">5</div>\n  <div class="photo">6</div>\n</div>',
      indices: [
        "Flexbox range sur une ligne ; ici on veut une vraie grille, avec des colonnes définies d’avance.",
        "<code>display: grid</code> sur le parent, puis <code>grid-template-columns</code> pour décrire les colonnes. <code>1fr</code> veut dire « une part égale ».",
        "<code>display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px;</code>"
      ],
      solution: '<style>\n  .galerie {\n    display: grid;\n    grid-template-columns: 1fr 1fr 1fr;\n    gap: 12px;\n  }\n  .photo {\n    background: #4f6df5;\n    height: 80px;\n    border-radius: 10px;\n    color: white;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n  }\n</style>\n\n<div class="galerie">\n  <div class="photo">1</div>\n  <div class="photo">2</div>\n  <div class="photo">3</div>\n  <div class="photo">4</div>\n  <div class="photo">5</div>\n  <div class="photo">6</div>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const g = ctx.doc.querySelector('.galerie');
        if (!g) return { ok: false, message: 'Garde la div .galerie et ses photos.' };
        const st = win.getComputedStyle(g);
        if (st.display !== 'grid') return { ok: false, message: 'Active la grille : <code>display: grid;</code>' };
        const cols = st.gridTemplateColumns.split(' ').length;
        if (cols !== 3) return { ok: false, message: 'Il faut 3 colonnes : <code>grid-template-columns: 1fr 1fr 1fr;</code> (actuellement : ' + cols + ' colonne(s)).' };
        if (st.gap !== '12px' && st.columnGap !== '12px') return { ok: false, message: 'Espace les photos : <code>gap: 12px;</code>' };
        const photos = g.querySelectorAll('.photo');
        if (Math.abs(photos[0].getBoundingClientRect().top - photos[2].getBoundingClientRect().top) > 2) return { ok: false, message: 'Les photos 1, 2 et 3 devraient être sur la même ligne — vérifie ta grille.' };
        return { ok: true, message: '6 éléments, 2 lignes, 0 calcul : la grille place tout. Ajoute une 7e photo par la pensée : elle irait toute seule en ligne 3.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : la mise en page d\'application.</strong> Reproduis la structure de ce logiciel : <code>.app</code> en grille de 2 colonnes — un menu FIXE de <code>150px</code> et un contenu qui prend le RESTE (<code>1fr</code>).',
      codeDepart: '<style>\n  body { margin: 0; font-family: sans-serif; }\n  .app {\n    height: 100vh;\n\n  }\n  .menu { background: #1e2432; color: white; padding: 16px; }\n  .contenu { background: #f6f7fb; padding: 16px; }\n</style>\n\n<div class="app">\n  <div class="menu">Menu</div>\n  <div class="contenu"><h1>Contenu principal</h1></div>\n</div>',
      indices: [
        "Deux colonnes de natures différentes : l’une a une largeur fixe, l’autre prend ce qui reste.",
        "On peut mélanger les unités dans <code>grid-template-columns</code> : un pixel fixe, puis <code>1fr</code> pour le reste.",
        "<code>display: grid; grid-template-columns: 150px 1fr;</code>"
      ],
      solution: '<style>\n  body { margin: 0; font-family: sans-serif; }\n  .app {\n    height: 100vh;\n    display: grid;\n    grid-template-columns: 150px 1fr;\n  }\n  .menu { background: #1e2432; color: white; padding: 16px; }\n  .contenu { background: #f6f7fb; padding: 16px; }\n</style>\n\n<div class="app">\n  <div class="menu">Menu</div>\n  <div class="contenu"><h1>Contenu principal</h1></div>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const app = ctx.doc.querySelector('.app');
        if (!app) return { ok: false, message: 'Garde la structure .app / .menu / .contenu.' };
        const st = win.getComputedStyle(app);
        if (st.display !== 'grid') return { ok: false, message: 'Active la grille sur .app : <code>display: grid;</code>' };
        if (!/150px/.test(st.gridTemplateColumns)) return { ok: false, message: 'La première colonne (menu) doit être fixe : <code>grid-template-columns: 150px 1fr;</code>' };
        const menu = ctx.doc.querySelector('.menu').getBoundingClientRect();
        if (Math.abs(menu.width - 150) > 3) return { ok: false, message: 'Le menu devrait mesurer exactement 150px (mesuré : ' + Math.round(menu.width) + 'px).' };
        const contenu = ctx.doc.querySelector('.contenu').getBoundingClientRect();
        if (contenu.left <= menu.left) return { ok: false, message: 'Le contenu doit se placer À CÔTÉ du menu, dans la deuxième colonne.' };
        return { ok: true, message: 'Menu fixe + contenu extensible : tu viens de recréer le squelette de ce logiciel (et de Gmail, Discord, VS Code...).' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Une rangée de 4 boutons de réseaux sociaux à aligner côte à côte : Grid ou Flexbox ?',
      choix: [
        'Grid — c\'est plus moderne',
        'Flexbox — une seule dimension (une ligne), c\'est son terrain',
        'Ni l\'un ni l\'autre, il faut des tableaux',
        'Obligatoirement Grid, Flexbox ne sait pas aligner'
      ],
      bonne: 1,
      explication: 'Une ligne = une dimension = Flexbox (<code>display: flex; gap: ...;</code> et c\'est réglé). Grid prend le relais quand lignes ET colonnes comptent. Les deux cohabitent dans toute vraie page.',
      aides: [
        'Grid marcherait, mais c\'est sortir le marteau-piqueur pour une punaise. Une dimension suffit ici...',
        '',
        'Les tableaux HTML servent aux DONNÉES tabulaires, jamais à la mise en page (c\'était la méthode... des années 90 !).',
        'Flexbox est justement NÉ pour aligner sur un axe.'
      ]
    }
  ]
},

{
  id: 'css-12',
  titre: 'Ombres, dégradés et transparence',
  contenu: `
<p>Trois effets qui transforment un design plat en design qui a de la profondeur — avec modération, comme le sel.</p>

<h2>Les ombres</h2>
<pre class="bloc-code">.carte {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
/*           │  │   │    └ couleur (noir à 15% d'opacité)
             │  │   └ flou
             │  └ décalage vertical
             └ décalage horizontal */</pre>
<p><code>rgba()</code> = rgb + un 4e nombre : l'<strong>opacité</strong> (0 = invisible, 1 = opaque). Une ombre douce et légère (grand flou, faible opacité) donne l'effet « carte qui flotte » de tous les designs modernes. Il existe aussi <code>text-shadow</code> pour le texte.</p>

<h2>Les dégradés</h2>
<pre class="bloc-code">.banniere {
  background: linear-gradient(135deg, #4f6df5, #7a5df5);
}</pre>
<p>Un dégradé est un <em>fond généré</em> : direction (angle ou <code>to right</code>), puis les couleurs étapes. Le bandeau d'accueil de ce logiciel est exactement ce dégradé !</p>

<h2>La transparence</h2>
<pre class="bloc-code">.filigrane { opacity: 0.5; }              /* TOUT l'élément à 50% */
.voile { background: rgba(30, 36, 50, 0.6); }  /* juste le fond */</pre>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Fais flotter la carte : ajoute-lui une ombre douce <code>box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);</code> — puis compare avec l\'aperçu de départ (Recommencer) pour mesurer l\'effet.',
      codeDepart: '<style>\n  body { background: #f6f7fb; padding: 30px; font-family: sans-serif; }\n  .carte {\n    background: white;\n    border-radius: 14px;\n    padding: 24px;\n    width: 220px;\n  }\n</style>\n\n<div class="carte">\n  <h2>Carte plate</h2>\n  <p>Fais-moi décoller du fond !</p>\n</div>',
      indices: [
        "Une ombre se décrit par quatre valeurs : deux décalages, un flou, et une couleur.",
        "Ici le décalage horizontal est nul et le vertical positif : l’ombre tombe vers le bas, comme si la lumière venait d’en haut.",
        "<code>box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);</code>"
      ],
      solution: '<style>\n  body { background: #f6f7fb; padding: 30px; font-family: sans-serif; }\n  .carte {\n    background: white;\n    border-radius: 14px;\n    padding: 24px;\n    width: 220px;\n    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);\n  }\n</style>\n\n<div class="carte">\n  <h2>Carte plate</h2>\n  <p>Fais-moi décoller du fond !</p>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const carte = ctx.doc.querySelector('.carte');
        if (!carte) return { ok: false, message: 'Garde la carte.' };
        const bs = win.getComputedStyle(carte).boxShadow;
        if (bs === 'none') return { ok: false, message: 'Pas encore d\'ombre — la déclaration : <code>box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);</code> (4 valeurs puis la couleur).' };
        if (!/rgba/.test(ctx.code)) return { ok: false, message: 'L\'ombre est là, mais utilise une couleur <code>rgba(...)</code> semi-transparente — une ombre noire opaque, c\'est très années 2000 !' };
        return { ok: true, message: 'L\'effet « carte qui flotte » : LA signature du design moderne. Toutes les cartes de ce logiciel portent une ombre de cette famille.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : la bannière en dégradé.</strong> Donne à <code>.banniere</code> un fond en dégradé <code>linear-gradient(135deg, #4f6df5, #7a5df5)</code>, un texte <code>white</code>, un <code>padding</code> de <code>30px</code> et des coins arrondis <code>16px</code> — la copie conforme de l\'accueil de ce logiciel !',
      codeDepart: '<style>\n  .banniere {\n\n  }\n</style>\n\n<div class="banniere">\n  <h1>Apprendre à coder</h1>\n  <p>de A à Z, sans internet</p>\n</div>',
      indices: [
        "Un dégradé n’est pas une couleur : c’est une <strong>image</strong> générée. Il se pose donc là où l’on met un fond.",
        "<code>linear-gradient</code> prend d’abord un angle, puis les couleurs à traverser.",
        "<code>background: linear-gradient(135deg, #4f6df5, #7a5df5);</code> plus la couleur de texte et le padding."
      ],
      solution: '<style>\n  .banniere {\n    background: linear-gradient(135deg, #4f6df5, #7a5df5);\n    color: white;\n    padding: 30px;\n    border-radius: 16px;\n  }\n</style>\n\n<div class="banniere">\n  <h1>Apprendre à coder</h1>\n  <p>de A à Z, sans internet</p>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const b = ctx.doc.querySelector('.banniere');
        if (!b) return { ok: false, message: 'Garde la bannière.' };
        const st = win.getComputedStyle(b);
        if (!/linear-gradient/.test(st.backgroundImage)) return { ok: false, message: 'Le fond doit être un dégradé : <code>background: linear-gradient(135deg, #4f6df5, #7a5df5);</code>' };
        if (st.color !== 'rgb(255, 255, 255)') return { ok: false, message: 'Le dégradé est superbe ! Passe le texte en blanc pour le contraste.' };
        if (st.paddingTop !== '30px' || st.borderTopLeftRadius !== '16px') return { ok: false, message: 'Finitions : <code>padding: 30px;</code> et <code>border-radius: 16px;</code>' };
        return { ok: true, message: 'Compare avec la page d\'accueil du logiciel : c\'est le même dégradé, les mêmes valeurs. Tu sais maintenant recréer ce que tu utilises.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : le voile sur image.</strong> Le texte est illisible sur l\'image chargée. La solution des pros : un voile semi-transparent. Donne à <code>.voile</code> un fond <code>rgba(30, 36, 50, 0.65)</code>, la hauteur <code>100%</code>, et le centrage Flexbox complet — le texte blanc redeviendra lisible sur n\'importe quelle image.',
      codeDepart: '<style>\n  .visuel {\n    background: repeating-linear-gradient(45deg, #e9c46a, #e9c46a 12px, #2a9d8f 12px, #2a9d8f 24px);\n    border-radius: 14px;\n    height: 160px;\n    overflow: hidden;\n  }\n  .voile {\n    color: white;\n    font-size: 22px;\n    font-weight: bold;\n\n  }\n</style>\n\n<div class="visuel">\n  <div class="voile">Texte à sauver !</div>\n</div>',
      indices: [
        "Le texte est illisible parce que l’image est trop claire. On ne touche pas à l’image : on glisse un voile entre elle et le texte.",
        "Une couleur en <code>rgba</code> a une quatrième valeur : son opacité. À 0.65, on devine encore l’image dessous.",
        "<code>background: rgba(30, 36, 50, 0.65);</code> sur <code>.voile</code>, avec Flexbox pour centrer."
      ],
      solution: '<style>\n  .visuel {\n    background: repeating-linear-gradient(45deg, #e9c46a, #e9c46a 12px, #2a9d8f 12px, #2a9d8f 24px);\n    border-radius: 14px;\n    height: 160px;\n    overflow: hidden;\n  }\n  .voile {\n    color: white;\n    font-size: 22px;\n    font-weight: bold;\n    background: rgba(30, 36, 50, 0.65);\n    height: 100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n</style>\n\n<div class="visuel">\n  <div class="voile">Texte à sauver !</div>\n</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const voile = ctx.doc.querySelector('.voile');
        if (!voile) return { ok: false, message: 'Garde le voile et son texte.' };
        const st = win.getComputedStyle(voile);
        if (!/rgba\(30,\s*36,\s*50,\s*0\.65\)/.test(st.backgroundColor)) return { ok: false, message: 'Le fond du voile doit être semi-transparent : <code>background: rgba(30, 36, 50, 0.65);</code> — le 4e nombre est l\'opacité.' };
        if (voile.getBoundingClientRect().height < 150) return { ok: false, message: 'Le voile doit couvrir TOUTE l\'image : <code>height: 100%;</code>' };
        if (st.display !== 'flex' || st.justifyContent !== 'center' || st.alignItems !== 'center') return { ok: false, message: 'Dernière étape : centre le texte dans le voile (la formule Flexbox — troisième fois qu\'elle sert, elle est rentabilisée !).' };
        return { ok: true, message: 'Le voile assombrissant : la technique universelle pour poser du texte sur des photos. Toutes les bannières du web l\'utilisent — regarde-les avec ton nouvel œil.' };
      }
    }
  ]
},

{
  id: 'css-13',
  titre: 'Cibler sans classes : nth-child, before, after',
  contenu: `
<p>Parfois, ajouter des classes partout est lourd. Le CSS sait cibler des éléments par leur <strong>position</strong> — et même créer du contenu décoratif sans toucher au HTML.</p>

<h2>Cibler par position</h2>
<pre class="bloc-code">li:first-child { font-weight: bold; }   /* le premier li */
li:last-child { border: none; }         /* le dernier */
li:nth-child(odd) { background: #f6f7fb; }   /* les impairs (1, 3, 5...) */
li:nth-child(even) { ... }              /* les pairs */
li:nth-child(3) { ... }                 /* le 3e précisément */</pre>
<p>Le grand classique : les <strong>lignes zébrées</strong> des tableaux (une ligne sur deux colorée), qui guident l'œil sans effort.</p>

<h2>Le contenu généré : ::before et ::after</h2>
<pre class="bloc-code">.etape::before {
  content: "→ ";
  color: #4f6df5;
}</pre>
<p><code>::before</code> insère un pseudo-élément AVANT le contenu (et <code>::after</code>, après). La propriété <code>content</code> est obligatoire, même vide. Usage : puces personnalisées, icônes décoratives, guillemets de citations... sans polluer le HTML — la décoration reste dans le CSS, à sa place.</p>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Zèbre le tableau des scores : avec <code>nth-child</code>, colore les lignes impaires (<code>odd</code>) du tableau en <code>#eef1fe</code>. Aucune classe à ajouter — tout se joue dans le CSS !',
      codeDepart: '<style>\n  table { border-collapse: collapse; width: 100%; }\n  td, th { padding: 8px 12px; text-align: left; }\n\n</style>\n\n<table>\n  <tr><th>Joueur</th><th>Score</th></tr>\n  <tr><td>Léa</td><td>1250</td></tr>\n  <tr><td>Tom</td><td>980</td></tr>\n  <tr><td>Nina</td><td>1430</td></tr>\n  <tr><td>Sam</td><td>760</td></tr>\n</table>',
      indices: [
        "Une seule règle doit viser une ligne sur deux. Il existe un sélecteur qui sait compter les enfants.",
        "<code>:nth-child()</code> accepte <code>odd</code> (impairs) et <code>even</code> (pairs), en plus des nombres.",
        "<code>tr:nth-child(odd) { background: #eef1fe; }</code>"
      ],
      solution: '<style>\n  table { border-collapse: collapse; width: 100%; }\n  td, th { padding: 8px 12px; text-align: left; }\n\n  tr:nth-child(odd) { background: #eef1fe; }\n</style>\n\n<table>\n  <tr><th>Joueur</th><th>Score</th></tr>\n  <tr><td>Léa</td><td>1250</td></tr>\n  <tr><td>Tom</td><td>980</td></tr>\n  <tr><td>Nina</td><td>1430</td></tr>\n  <tr><td>Sam</td><td>760</td></tr>\n</table>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const trs = ctx.doc.querySelectorAll('tr');
        if (trs.length < 5) return { ok: false, message: 'Garde les 5 lignes du tableau.' };
        const bg1 = win.getComputedStyle(trs[0]).backgroundColor;
        const bg2 = win.getComputedStyle(trs[1]).backgroundColor;
        const bg3 = win.getComputedStyle(trs[2]).backgroundColor;
        if (!/nth-child/.test(ctx.code)) return { ok: false, message: 'Le défi : utiliser <code>:nth-child(odd)</code>, sans toucher au HTML.' };
        if (bg1 !== 'rgb(238, 241, 254)' || bg3 !== 'rgb(238, 241, 254)') return { ok: false, message: 'Les lignes IMPAIRES (1re, 3e, 5e) doivent être en #eef1fe. Règle : <code>tr:nth-child(odd) { background: #eef1fe; }</code>' };
        if (bg2 === bg1) return { ok: false, message: 'Toutes les lignes ont la même couleur — les lignes paires doivent rester blanches. Vérifie le <code>odd</code> dans la parenthèse.' };
        return { ok: true, message: 'Lignes zébrées sans une seule classe. Ajoute 100 lignes au tableau : le zébrage suit tout seul.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : les flèches décoratives.</strong> Avec <code>::before</code>, ajoute automatiquement <code>→ </code> (flèche + espace) devant chaque élément de classe <code>.etape</code>, en couleur <code>#4f6df5</code>. La flèche : copie-la d\'ici → ou tape <code>-></code> stylisé... non, copie-la !',
      codeDepart: '<style>\n  .etape { list-style: none; padding: 4px 0; }\n\n</style>\n\n<ul style="padding: 0">\n  <li class="etape">Préchauffer le four</li>\n  <li class="etape">Étaler la pâte</li>\n  <li class="etape">Garnir et enfourner</li>\n</ul>',
      indices: [
        "La flèche n’est pas dans le HTML, et n’a pas à y être : c’est une décoration, donc c’est le CSS qui la fabrique.",
        "<code>::before</code> insère un contenu avant l’élément. Deux-points <strong>doublés</strong>, et la propriété <code>content</code> est obligatoire.",
        "<code>.etape::before { content: \"→ \"; color: #4f6df5; }</code>"
      ],
      solution: '<style>\n  .etape { list-style: none; padding: 4px 0; }\n\n  .etape::before {\n    content: "→ ";\n    color: #4f6df5;\n  }\n</style>\n\n<ul style="padding: 0">\n  <li class="etape">Préchauffer le four</li>\n  <li class="etape">Étaler la pâte</li>\n  <li class="etape">Garnir et enfourner</li>\n</ul>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const etape = ctx.doc.querySelector('.etape');
        if (!etape) return { ok: false, message: 'Garde les étapes de la recette.' };
        const avant = win.getComputedStyle(etape, '::before');
        if (!avant.content || avant.content === 'none' || !/→/.test(avant.content)) return { ok: false, message: 'Le pseudo-élément n\'existe pas encore : <code>.etape::before { content: "→ "; }</code> — sans content, pas de ::before !' };
        if (avant.color !== 'rgb(79, 109, 245)') return { ok: false, message: 'La flèche est là ! Colore-la : <code>color: #4f6df5;</code> dans la même règle.' };
        return { ok: true, message: 'Du contenu créé par le CSS : le HTML reste pur (3 étapes, zéro décoration), le style fait le reste. Séparation parfaite des rôles.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Pourquoi une règle <code>.badge::before { color: red; }</code> n\'affiche-t-elle RIEN ?',
      choix: [
        'Parce que ::before n\'existe que sur les liens',
        'Parce qu\'il manque la propriété content — sans elle, le pseudo-élément n\'est pas créé',
        'Parce que la couleur rouge est réservée aux erreurs',
        'Parce qu\'il faut écrire :before avec un seul deux-points'
      ],
      bonne: 1,
      explication: '<code>content</code> est l\'acte de naissance du pseudo-élément : même <code>content: "";</code> (vide, pour un décor purement CSS) est obligatoire. Sans lui, la règle est ignorée en silence.',
      aides: [
        '::before fonctionne sur presque tous les éléments.',
        '',
        'Aucune couleur n\'est réservée — le CSS ne juge pas tes goûts.',
        'Un seul deux-points marche aussi (vieille syntaxe) — le problème est ailleurs : il manque une propriété créatrice...'
      ]
    }
  ]
},

{
  id: 'css-14',
  titre: 'Animations : @keyframes',
  contenu: `
<p>Les transitions animent un CHANGEMENT (survol...). Pour une animation <strong>autonome</strong> — qui tourne en boucle, sans interaction — voici <code>@keyframes</code>.</p>

<h2>Deux temps : définir, puis appliquer</h2>
<pre class="bloc-code">/* 1. La chorégraphie (les étapes-clés) */
@keyframes pulsation {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}

/* 2. L'appliquer à un élément */
.coeur {
  animation: pulsation 1s infinite;
}</pre>
<ul>
<li><code>@keyframes nom { ... }</code> — décrit les états à des pourcentages du parcours ;</li>
<li><code>animation: nom durée répétitions;</code> — <code>infinite</code> = boucle sans fin, ou un nombre, ou rien (une seule fois) ;</li>
<li>on peut aussi écrire <code>from { }</code> et <code>to { }</code> au lieu de 0% / 100% pour deux étapes simples.</li>
</ul>

<h2>Le grand classique : le spinner de chargement</h2>
<pre class="bloc-code">@keyframes tourne {
  to { transform: rotate(360deg); }
}
.spinner { animation: tourne 1s linear infinite; }</pre>
<p>(<code>linear</code> = vitesse constante, sans accélération — indispensable pour une rotation fluide.)</p>

<div class="astuce">✅ Transition ou animation ? <strong>Réaction à un événement → transition. Mouvement autonome/répété → animation.</strong></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Fais battre le cœur : définis un bloc <code>@keyframes pulsation</code> (3 étapes : scale 1 → 1.2 → 1) et applique-le au <code>.coeur</code> avec <code>animation: pulsation 1s infinite;</code>.',
      codeDepart: '<style>\n  .coeur {\n    font-size: 60px;\n    display: inline-block;\n\n  }\n\n  /* Le @keyframes ici */\n\n</style>\n\n<div class="coeur">❤️</div>',
      indices: [
        "Une animation s’écrit en deux temps : décrire les étapes, puis l’appliquer à un élément.",
        "<code>@keyframes</code> nomme l’animation et décrit ses étapes en pourcentages. La propriété <code>animation</code>, elle, la déclenche.",
        "<code>@keyframes pulsation { 0% {…} 50% {…} 100% {…} }</code>, puis <code>animation: pulsation …;</code>"
      ],
      solution: '<style>\n  .coeur {\n    font-size: 60px;\n    display: inline-block;\n    animation: pulsation 1s infinite;\n  }\n\n  @keyframes pulsation {\n    0%   { transform: scale(1); }\n    50%  { transform: scale(1.2); }\n    100% { transform: scale(1); }\n  }\n</style>\n\n<div class="coeur">❤️</div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const coeur = ctx.doc.querySelector('.coeur');
        if (!coeur) return { ok: false, message: 'Garde le cœur.' };
        if (!/@keyframes\s+pulsation/.test(ctx.code)) return { ok: false, message: 'Définis d\'abord la chorégraphie : <code>@keyframes pulsation { ... }</code>' };
        const st = win.getComputedStyle(coeur);
        if (st.animationName !== 'pulsation') return { ok: false, message: 'Le keyframes existe, mais le cœur ne l\'utilise pas : <code>animation: pulsation 1s infinite;</code> dans .coeur.' };
        if (st.animationIterationCount !== 'infinite') return { ok: false, message: 'Il bat une fois puis s\'arrête ! Ajoute <code>infinite</code> pour la boucle sans fin.' };
        if (!/scale/.test(ctx.code)) return { ok: false, message: 'Les étapes du keyframes doivent jouer sur <code>transform: scale(...)</code>.' };
        return { ok: true, message: 'Regarde-le battre dans l\'aperçu. Cœurs de like, points de « en train d\'écrire... », pastilles de notification : ce battement anime tout le web.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : le spinner de chargement.</strong> L\'anneau est immobile. Anime-le : un <code>@keyframes tourne</code> qui va <code>to { transform: rotate(360deg); }</code>, appliqué avec <code>animation: tourne 1s linear infinite;</code>.',
      codeDepart: '<style>\n  .spinner {\n    width: 50px;\n    height: 50px;\n    border: 6px solid #e4e7ef;\n    border-top-color: #4f6df5;\n    border-radius: 50%;\n\n  }\n\n</style>\n\n<p>Chargement en cours...</p>\n<div class="spinner"></div>',
      indices: [
        "Une rotation sans fin : l’animation doit se répéter indéfiniment, et à vitesse constante.",
        "Quand il n’y a qu’une étape d’arrivée, <code>to</code> suffit. Et trois mots comptent dans la déclaration : la durée, <code>linear</code>, et <code>infinite</code>.",
        "<code>@keyframes tourne { to { transform: rotate(360deg); } }</code> puis <code>animation: tourne 1s linear infinite;</code>"
      ],
      solution: '<style>\n  .spinner {\n    width: 50px;\n    height: 50px;\n    border: 6px solid #e4e7ef;\n    border-top-color: #4f6df5;\n    border-radius: 50%;\n    animation: tourne 1s linear infinite;\n  }\n\n  @keyframes tourne {\n    to { transform: rotate(360deg); }\n  }\n</style>\n\n<p>Chargement en cours...</p>\n<div class="spinner"></div>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const sp = ctx.doc.querySelector('.spinner');
        if (!sp) return { ok: false, message: 'Garde le spinner.' };
        if (!/@keyframes/.test(ctx.code) || !/rotate\s*\(\s*360deg\s*\)/.test(ctx.code)) return { ok: false, message: 'Le keyframes doit faire un tour complet : <code>to { transform: rotate(360deg); }</code>' };
        const st = win.getComputedStyle(sp);
        if (st.animationName === 'none') return { ok: false, message: 'Applique l\'animation au spinner : <code>animation: tourne 1s linear infinite;</code>' };
        if (st.animationIterationCount !== 'infinite') return { ok: false, message: 'Un chargement qui s\'arrête de tourner, c\'est louche : ajoute <code>infinite</code>.' };
        if (st.animationTimingFunction !== 'linear') return { ok: false, message: 'Presque : sans <code>linear</code>, la rotation accélère et ralentit à chaque tour (regarde bien !). Vitesse constante exigée.' };
        return { ok: true, message: 'Un cercle, une bordure colorée d\'un seul côté, une rotation : le spinner universel démonté et remonté. 10 lignes de CSS, zéro image.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Un bouton doit changer de couleur en douceur quand on le survole. Transition ou animation ?',
      choix: [
        'Animation @keyframes — c\'est plus puissant',
        'Transition — c\'est la réaction à un événement (le survol)',
        'Les deux sont obligatoires ensemble',
        'Ni l\'un ni l\'autre, il faut du JavaScript'
      ],
      bonne: 1,
      explication: 'Réaction à un événement → transition (2 lignes). Mouvement autonome ou multi-étapes → animation. Le bon outil pour le bon besoin — un des marqueurs qui distinguent un CSS senior d\'un CSS débutant.',
      aides: [
        'Puissant, oui, mais surdimensionné : gérer un simple aller-retour au survol avec des keyframes, c\'est déjà du bricolage.',
        '',
        'Elles cohabitent souvent dans une même page, mais chacune sur SON cas d\'usage.',
        'Le CSS gère ça nativement depuis 15 ans — le JavaScript n\'a rien à faire ici.'
      ]
    }
  ]
},

{
  id: 'css-15',
  titre: 'Variables CSS et cascade',
  contenu: `
<h2>Les variables CSS : une couleur, un seul endroit</h2>
<p>Ta couleur de marque apparaît 30 fois dans ton CSS ? Le jour où elle change, bonjour. La solution :</p>
<pre class="bloc-code">:root {
  --principale: #4f6df5;     /* déclaration : deux tirets */
  --rayon: 12px;
}

.bouton { background: var(--principale); border-radius: var(--rayon); }
.lien   { color: var(--principale); }</pre>
<ul>
<li><code>:root</code> — la racine du document : les variables déclarées là sont visibles partout ;</li>
<li><code>--nom: valeur;</code> — déclaration (deux tirets obligatoires) ;</li>
<li><code>var(--nom)</code> — utilisation.</li>
</ul>
<p>Change <code>--principale</code> UNE fois → tout le site suit. C'est exactement ainsi que ce logiciel gère ses couleurs (ouvre son style.css un jour : tout commence par un bloc :root !).</p>

<h2>La cascade : qui gagne en cas de conflit ?</h2>
<p>Deux règles visent le même élément avec des valeurs différentes. Qui l'emporte ? Trois critères, dans l'ordre :</p>
<ol>
<li><strong>La spécificité</strong> : id (#) &gt; classe (.) &gt; balise. Un <code>#menu</code> écrase un <code>.menu</code> qui écrase un <code>nav</code> ;</li>
<li>à spécificité égale : <strong>la dernière règle écrite</strong> gagne ;</li>
<li>l'attribut <code>style="..."</code> directement dans le HTML bat presque tout (raison de plus pour l'éviter).</li>
</ol>
<div class="astuce">✅ Le « C » de CSS, c'est cette Cascade. Quand un style ne s'applique pas mystérieusement, il y a 9 chances sur 10 qu'une règle plus spécifique gagne ailleurs — F12 te montre laquelle (les styles barrés ont perdu).</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Centralise le thème : déclare dans <code>:root</code> deux variables — <code>--marque</code> valant <code>#e63946</code> et <code>--rayon</code> valant <code>14px</code> — puis utilise-les avec <code>var()</code> : le fond du bouton et la couleur du titre prennent <code>--marque</code>, le bouton prend le rayon.',
      codeDepart: '<style>\n  /* :root ici */\n\n  h1 {\n    /* couleur via var() */\n  }\n  .bouton {\n    color: white;\n    padding: 12px 24px;\n    border: none;\n    font-size: 16px;\n    /* fond et rayon via var() */\n  }\n</style>\n\n<h1>Boutique du sport</h1>\n<button class="bouton">Voir les offres</button>',
      indices: [
        "Une couleur répétée à trois endroits est une couleur qu’on oubliera de changer quelque part. Il faut la déclarer une seule fois.",
        "Les variables se déclarent dans <code>:root</code>, avec deux tirets devant leur nom, et se relisent avec <code>var(…)</code>.",
        "<code>:root { --marque: #e63946; --rayon: 14px; }</code> puis <code>color: var(--marque);</code>"
      ],
      solution: '<style>\n  :root {\n    --marque: #e63946;\n    --rayon: 14px;\n  }\n\n  h1 {\n    color: var(--marque);\n  }\n  .bouton {\n    color: white;\n    padding: 12px 24px;\n    border: none;\n    font-size: 16px;\n    background: var(--marque);\n    border-radius: var(--rayon);\n  }\n</style>\n\n<h1>Boutique du sport</h1>\n<button class="bouton">Voir les offres</button>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const racine = win.getComputedStyle(ctx.doc.documentElement);
        if (racine.getPropertyValue('--marque').trim() !== '#e63946') return { ok: false, message: 'Déclare la variable dans la racine : <code>:root { --marque: #e63946; }</code> (deux tirets !).' };
        if (racine.getPropertyValue('--rayon').trim() !== '14px') return { ok: false, message: 'Il manque la deuxième variable : <code>--rayon: 14px;</code> dans le même bloc :root.' };
        const h1 = ctx.doc.querySelector('h1');
        const btn = ctx.doc.querySelector('.bouton');
        if (win.getComputedStyle(h1).color !== 'rgb(230, 57, 70)') return { ok: false, message: 'Le titre doit UTILISER la variable : <code>color: var(--marque);</code>' };
        if (win.getComputedStyle(btn).backgroundColor !== 'rgb(230, 57, 70)') return { ok: false, message: 'Le fond du bouton aussi : <code>background: var(--marque);</code>' };
        if (win.getComputedStyle(btn).borderTopLeftRadius !== '14px') return { ok: false, message: 'Et le rayon : <code>border-radius: var(--rayon);</code>' };
        if (!/var\(--marque\)/.test(ctx.code)) return { ok: false, message: 'Les couleurs doivent passer par <code>var(--marque)</code>, pas par le code hex répété !' };
        return { ok: true, message: 'Maintenant change juste le #e63946 du :root en #2a9d8f et ré-exécute : TOUT suit. Une modification, effet global — c\'est ça, un thème.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : le combat de la cascade.</strong> Le paragraphe est ciblé par TROIS règles de couleurs différentes (balise, classe, id) et il s\'affiche... rouge (l\'id gagne). Sans toucher aux règles existantes, fais-le passer en <code>green</code> en modifiant la SEULE règle qui peut gagner : celle de l\'id.',
      codeDepart: '<style>\n  p { color: gray; }\n  .message { color: orange; }\n  #special { color: red; }\n</style>\n\n<p class="message" id="special">De quelle couleur vais-je finir ?</p>',
      indices: [
        "Trois règles visent le même paragraphe, et une seule gagne. Ce n’est pas l’ordre qui décide, mais la <strong>précision</strong> du sélecteur.",
        "La hiérarchie est toujours la même : un id l’emporte sur une classe, qui l’emporte sur une balise. Modifier une règle perdante ne servira à rien.",
        "Seul <code>#special</code> peut l’emporter : c’est SA couleur qu’il faut changer."
      ],
      solution: '<style>\n  p { color: gray; }\n  .message { color: orange; }\n  #special { color: green; }\n</style>\n\n<p class="message" id="special">De quelle couleur vais-je finir ?</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const p = ctx.doc.querySelector('#special');
        if (!p) return { ok: false, message: 'Garde le paragraphe avec sa classe et son id.' };
        if (!/p\s*{\s*color\s*:\s*gray/.test(ctx.code) || !/\.message\s*{\s*color\s*:\s*orange/.test(ctx.code)) return { ok: false, message: 'Ne touche pas aux règles <code>p</code> et <code>.message</code> — le défi est de comprendre POURQUOI elles perdent.' };
        if (win.getComputedStyle(p).color !== 'rgb(0, 128, 0)') return { ok: false, message: 'Le paragraphe n\'est pas vert. La seule règle assez puissante pour gagner est <code>#special</code> (un id bat une classe qui bat une balise) — c\'est elle qu\'il faut modifier.' };
        return { ok: true, message: '🏆 Module CSS approfondi terminé ! Tu comprends maintenant la Cascade — le C de CSS — et avec elle, le dernier grand mystère des styles qui « ne marchent pas ».' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> <code>.bouton { color: blue; }</code> est écrit APRÈS <code>#valider { color: red; }</code> dans le fichier. L\'élément a la classe ET l\'id. Quelle couleur gagne ?',
      choix: [
        'Bleu — la dernière règle écrite gagne toujours',
        'Rouge — l\'id est plus spécifique que la classe, peu importe l\'ordre',
        'Violet — les couleurs se mélangent',
        'Aucune — le navigateur refuse le conflit'
      ],
      bonne: 1,
      explication: 'L\'ordre d\'écriture ne départage QUE les égalités de spécificité. Ici id (#) &gt; classe (.) : rouge gagne, même écrit avant. C\'est le piège de cascade le plus fréquent en débogage CSS.',
      aides: [
        '« Le dernier gagne » ne vaut qu\'à spécificité ÉGALE — ici, l\'id pèse plus lourd.',
        '',
        'Le CSS ne mélange jamais : une seule règle l\'emporte, entièrement.',
        'Aucun refus : la cascade est justement l\'algorithme qui TRANCHE les conflits.'
      ]
    }
  ]
},

];
