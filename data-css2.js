/* ===== Module CSS — leçons 9 à 15 (approfondissement) ===== */
window.DATA_CSS2 = [

{
  id: 'css-9',
  titre: 'Les unités : %, rem, vh',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu n'as écrit que des pixels. C'est honnête, et c'est insuffisant : un pixel ne s'adapte à rien. Une colonne de 900 pixels déborde d'un téléphone, un texte de 14 pixels ignore le réglage d'une personne qui voit mal, une carte de 300 pixels de haut ne remplira jamais exactement l'écran.</p>
<p>Les autres unités ne sont pas des variantes : chacune répond à une question précise, « relatif à <em>quoi</em> ? ».</p>

<h2>Les quatre familles</h2>
<ul>
<li><code>px</code> — fixe. Parfait pour une bordure, un petit espacement, un rayon d'angle ;</li>
<li><code>%</code> — relatif au <strong>parent</strong>. <code>width: 50%</code> dans un conteneur de 300 pixels donne exactement 150 pixels ;</li>
<li><code>rem</code> — relatif à la taille de police de la page, 16 pixels par défaut. <code>1.5rem</code> vaut 24 pixels — et suit le réglage du visiteur s'il l'a changé ;</li>
<li><code>vw</code> et <code>vh</code> — relatifs à la <strong>fenêtre</strong>. <code>100vh</code>, c'est toute sa hauteur ; <code>50vw</code>, la moitié de sa largeur.</li>
</ul>

<h2>Pas à pas : le piège des pourcentages de hauteur</h2>
<p>La largeur et la hauteur ne se comportent pas pareil, et ça déroute. Mesuré :</p>
<table class="memo-table trace">
<tr><th>Ce qu'on écrit</th><th>Ce qu'on obtient</th></tr>
<tr><td><code>width: 50%</code>, parent de 300 px</td><td>150 px — comme prévu</td></tr>
<tr><td><code>height: 50%</code>, parent <em>sans hauteur</em></td><td>pas la moitié : la règle est ignorée</td></tr>
</table>
<p>La raison est logique une fois dite : un pourcentage de hauteur se calcule sur la hauteur du parent — et si le parent n'en a pas, étant lui-même à la taille de son contenu, il n'y a rien à diviser. La largeur, elle, est toujours connue : celle de la fenêtre, en dernier recours.</p>
<p>D'où le réflexe : pour remplir l'écran en hauteur, on prend <code>100vh</code>, pas <code>100%</code>.</p>

<h2>Les pièges</h2>
<p><strong>Tout mettre en pixels.</strong> Un texte en <code>px</code> ignore le réglage de taille du navigateur. Pour qui a augmenté la police par défaut — souvent parce qu'il voit mal — ton site reste minuscule. Les tailles de texte vont en <code>rem</code>.</p>
<p><strong>Utiliser <code>100vh</code> sur mobile sans y penser.</strong> Sur téléphone, la barre d'adresse se rétracte quand on fait défiler : la hauteur de fenêtre change en cours de route, et un bloc en <code>100vh</code> se met à sauter. Les unités <code>dvh</code>, récentes, règlent ce cas précis.</p>
<p><strong>Mélanger les repères sans y réfléchir.</strong> Un <code>padding</code> en pourcentage se calcule sur la <em>largeur</em> du parent, même en haut et en bas. C'est contre-intuitif, parfaitement normatif, et la cause de bien des espacements mystérieux.</p>

<h2>Dans la vraie vie</h2>
<p>Un site bien réglé mélange les quatre : <code>rem</code> pour le texte et les espacements, <code>%</code> ou <code>fr</code> pour les largeurs de colonnes, <code>vh</code> pour une bannière plein écran, <code>px</code> pour les bordures. Ce n'est pas de la coquetterie : chaque unité répond à une question différente.</p>

<div class="a-retenir">
<ul>
<li><code>%</code> dépend du parent, <code>rem</code> de la page, <code>vw</code> et <code>vh</code> de la fenêtre, <code>px</code> de rien.</li>
<li>Un pourcentage de hauteur ne marche que si le parent a une hauteur.</li>
<li>Les tailles de texte en <code>rem</code>, pour suivre le réglage du visiteur.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : l'unité ch</summary>
<p><code>1ch</code> vaut la largeur du caractère « 0 » dans la police courante. Son usage le plus utile : limiter la largeur d'un paragraphe à <code>65ch</code>, soit environ soixante-cinq caractères par ligne. C'est la longueur que les typographes considèrent comme la plus confortable à lire — au-delà, l'œil peine à retrouver le début de la ligne suivante.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Par défaut, les éléments s'empilent dans l'ordre du HTML, les uns après les autres. On appelle ça le <strong>flux normal</strong>, et c'est une bonne chose : c'est ce qui fait qu'une page reste lisible sans qu'on s'en occupe.</p>
<p>Mais certaines choses ne vivent pas dans le flux. Une pastille de notification posée sur un coin d'icône, un en-tête qui reste collé en haut pendant qu'on défile, une fenêtre modale par-dessus la page. Pour celles-là, il faut pouvoir sortir du rang.</p>

<h2>Les quatre modes</h2>
<ul>
<li><code>static</code> — le défaut : dans le flux, <code>top</code> et <code>left</code> sans effet ;</li>
<li><code>relative</code> — reste à sa place et garde la sienne, mais peut être décalé. Surtout : il devient un <strong>point de repère</strong> pour ses enfants en absolu ;</li>
<li><code>absolute</code> — sort du flux et se place par rapport au premier parent positionné ;</li>
<li><code>fixed</code> — sort du flux et se place par rapport à la <strong>fenêtre</strong>. Il ne bouge pas au défilement.</li>
</ul>
<p>Il en existe un cinquième, <code>sticky</code> : normal jusqu'à un certain point de défilement, puis épinglé. C'est ce qui donne les en-têtes de tableau qui restent visibles.</p>

<h2>Pas à pas : le couple relative et absolute</h2>
<p>C'est la combinaison qu'on écrit tout le temps, et sa logique n'est pas devinable. Un élément en <code>absolute</code> avec <code>left: 0</code>, à l'intérieur d'un conteneur éloigné de 80 pixels du bord :</p>
<table class="memo-table trace">
<tr><th>Le parent est…</th><th>L'enfant se place à…</th></tr>
<tr><td>sans position (défaut)</td><td><strong>0 px du bord de la page</strong> — il ignore son parent</td></tr>
<tr><td><code>position: relative</code></td><td><strong>88 px</strong> — soit le coin de son parent</td></tr>
</table>
<p>Un élément en <code>absolute</code> remonte l'arbre à la recherche d'un ancêtre positionné. S'il n'en trouve aucun, il se cale sur la page entière. D'où la règle à retenir telle quelle : <strong>pour placer un enfant en absolu dans un parent, le parent doit être en <code>relative</code></strong>, même sans aucun décalage.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le <code>relative</code> sur le parent.</strong> L'élément part se coller dans un coin de la page, loin de l'endroit prévu. Le symptôme est spectaculaire et la cause invisible : il manque une seule déclaration, dans une <em>autre</em> règle que celle qu'on est en train de regarder.</p>
<p><strong>Écrire <code>top</code> et <code>left</code> sur un élément <code>static</code>.</strong> Rien ne se passe. Les décalages n'ont d'effet que sur un élément positionné, et le CSS ne dit rien.</p>
<p><strong>Se servir du positionnement pour faire une mise en page.</strong> C'était la technique d'avant Flexbox. Elle demande de tout calculer à la main, et casse dès que le contenu change de taille. Pour disposer des blocs, c'est Flexbox ou Grid ; le positionnement sert à <em>superposer</em>.</p>

<h2>Dans la vraie vie</h2>
<p>Le bandeau de cookies, le bouton « retour en haut », la pastille rouge sur une icône de messagerie, l'en-tête qui suit le défilement : tous sortent du flux. Remarque qu'ils ont un point commun — ce sont des éléments qui se superposent au contenu, jamais des éléments qui <em>sont</em> le contenu.</p>

<div class="a-retenir">
<ul>
<li><code>relative</code> garde sa place et sert de repère ; <code>absolute</code> sort du flux ; <code>fixed</code> se cale sur la fenêtre.</li>
<li>Un enfant en <code>absolute</code> se place par rapport au premier ancêtre positionné — sinon par rapport à la page.</li>
<li><code>top</code> et <code>left</code> n'ont aucun effet sur un élément <code>static</code>.</li>
<li>Le positionnement sert à superposer, pas à mettre en page.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : sortir du flux a un coût</summary>
<p>Un élément en <code>absolute</code> ou <code>fixed</code> ne prend plus aucune place : ses voisins se referment sur lui comme s'il n'existait pas. C'est précisément ce qu'on veut pour une pastille — et c'est précisément le danger pour un bloc de contenu, qui peut en recouvrir un autre sans que rien ne le signale. Plus la fenêtre change de taille, plus ces collisions deviennent probables.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Flexbox aligne sur <em>une</em> ligne, ou une colonne. C'est parfait pour une barre de navigation. Ça devient acrobatique dès qu'on veut un vrai quadrillage — une galerie de douze vignettes, un tableau de bord, la structure générale d'une page.</p>
<p>Grid est l'autre grand système de mise en page, et le seul à travailler en lignes <strong>et</strong> colonnes à la fois.</p>

<h2>Définir une grille</h2>
<pre class="bloc-code">.galerie {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}</pre>
<p>Trois colonnes égales, séparées de 16 pixels. Comme avec Flexbox, on active sur le <strong>conteneur</strong>, et les enfants se rangent tout seuls — sans qu'on ait à leur écrire quoi que ce soit.</p>
<p>L'unité <code>fr</code> est propre à Grid : elle signifie « une part de l'espace disponible ». <code>1fr 2fr</code> dans 300 pixels donne donc 100 et 200 pixels — mesuré. Et comme c'est une part de ce qui <em>reste</em>, les <code>gap</code> sont déjà déduits : pas de calcul à faire.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'on écrit</th><th>Ce qui se passe</th></tr>
<tr><td>rien</td><td>Les blocs s'empilent, un par ligne.</td></tr>
<tr><td><code>display: grid</code></td><td>Une grille d'une seule colonne : rien ne change encore.</td></tr>
<tr><td><code>grid-template-columns: 1fr 1fr 1fr</code></td><td>Trois colonnes. Les enfants se répartissent de gauche à droite, puis passent à la ligne.</td></tr>
<tr><td>un 4e enfant</td><td>Une deuxième ligne apparaît toute seule, sans qu'on l'ait déclarée.</td></tr>
</table>
<p>C'est le trait qui distingue Grid : on décrit les <em>colonnes</em>, et les lignes se créent au besoin.</p>

<h2>Occuper plusieurs cases</h2>
<pre class="bloc-code">.vedette {
  grid-column: span 2;
}</pre>
<p>Cet élément occupera deux colonnes au lieu d'une — l'équivalent du <code>colspan</code> d'un tableau. C'est ce qui permet qu'un article mis en avant soit deux fois plus large que ses voisins, sans toucher au HTML.</p>

<h2>Les pièges</h2>
<p><strong>Déclarer les colonnes sur les enfants.</strong> Comme pour Flexbox, <code>grid-template-columns</code> va sur le conteneur. L'erreur est universelle, et silencieuse.</p>
<p><strong>Confondre <code>fr</code> et <code>%</code>.</strong> Trois colonnes à <code>33%</code> avec un <code>gap</code> de 16 pixels débordent : les pourcentages ignorent les espaces. Trois colonnes à <code>1fr</code> ne débordent jamais, parce que <code>fr</code> partage ce qui <em>reste</em> après les gaps.</p>
<p><strong>Choisir Grid quand Flexbox suffit.</strong> Une seule rangée de boutons ne demande pas une grille. La règle est nette : une dimension, c'est Flexbox ; deux dimensions, c'est Grid.</p>

<h2>Dans la vraie vie</h2>
<p>Les galeries de photos, les tableaux de bord, les grilles d'articles d'un site d'actualités. Grid sert aussi à poser la structure générale d'une page — en-tête, menu latéral, contenu, pied — en une seule règle, là où il fallait autrefois des colonnes flottantes et beaucoup de patience.</p>

<div class="a-retenir">
<ul>
<li><code>display: grid</code> sur le conteneur, puis <code>grid-template-columns</code> pour décrire les colonnes.</li>
<li>L'unité <code>fr</code> partage l'espace <em>restant</em> : les <code>gap</code> sont déjà pris en compte.</li>
<li>Les lignes se créent toutes seules ; seules les colonnes se déclarent.</li>
<li>Une dimension, Flexbox ; deux dimensions, Grid.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : dessiner la page en ASCII</summary>
<p>Grid permet de nommer des zones et de dessiner la mise en page littéralement, dans le CSS : <code>grid-template-areas</code> accepte des lignes de texte où chaque mot est une zone. On lit la structure d'un coup d'œil, et la réorganiser pour mobile revient à redessiner trois lignes. C'est la fonctionnalité la plus lisible de tout le CSS moderne — et l'une des moins connues.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Une interface entièrement plate est difficile à lire : rien ne dit ce qui est au-dessus de quoi, ce qui est cliquable, ce qui flotte au-dessus du reste. Les ombres et les dégradés donnent de la <strong>profondeur</strong>, et la profondeur donne de la hiérarchie.</p>
<p>Ce sont aussi les effets qu'on surdose le plus volontiers. La bonne mesure est celle du sel : on ne doit pas les remarquer.</p>

<h2>Les ombres</h2>
<pre class="bloc-code">.carte {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}</pre>
<p>Quatre valeurs, dans cet ordre : décalage horizontal, décalage vertical, flou, couleur. Ici : aucun décalage à droite, 4 pixels vers le bas, 12 pixels de flou, et un noir à 15 % d'opacité.</p>
<p>La règle qui rend une ombre crédible : la lumière vient d'en haut. Le décalage horizontal reste donc à zéro, et seul le vertical est positif. Une ombre décalée latéralement paraît fausse sans qu'on sache dire pourquoi.</p>
<p>La seconde règle est l'opacité : une ombre noire pure est toujours trop dure. On travaille entre 0,08 et 0,2.</p>

<h2>Les dégradés</h2>
<pre class="bloc-code">.banniere {
  background-image: linear-gradient(to right, #4f6df5, #22c55e);
}</pre>
<p>Un dégradé n'est pas une couleur : c'est une <strong>image</strong>, générée par le navigateur. D'où <code>background-image</code> et non <code>background-color</code> — une confusion fréquente, et silencieuse.</p>
<p>La direction s'écrit en clair (<code>to right</code>, <code>to bottom</code>) ou en degrés (<code>135deg</code>), et on peut enchaîner autant de couleurs qu'on veut.</p>

<h2>Pas à pas</h2>
<p>Comment une ombre se construit, valeur par valeur :</p>
<table class="memo-table trace">
<tr><th>Valeur</th><th>Effet si on l'augmente</th></tr>
<tr><td>décalage horizontal</td><td>l'ombre part sur le côté — à éviter</td></tr>
<tr><td>décalage vertical</td><td>l'objet paraît plus haut au-dessus de la page</td></tr>
<tr><td>flou</td><td>l'ombre s'adoucit ; un flou nul donne un bord net, dur</td></tr>
<tr><td>opacité de la couleur</td><td>l'ombre s'assombrit — et devient vite sale</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Des ombres trop fortes.</strong> C'est l'erreur de débutant la plus visible : <code>rgba(0,0,0,0.5)</code> et 20 pixels de flou donnent une carte qui semble flotter à dix centimètres. Les interfaces soignées restent autour de <code>0 1px 3px rgba(0,0,0,0.1)</code>.</p>
<p><strong>Mettre un dégradé dans <code>background-color</code>.</strong> La déclaration est ignorée, sans message. C'est <code>background-image</code>, ou le raccourci <code>background</code>.</p>
<p><strong>Oublier le contraste du texte sur un dégradé.</strong> Un texte blanc lisible sur la partie foncée devient illisible sur la partie claire. Il faut vérifier aux <em>deux</em> extrémités, pas au milieu.</p>

<h2>Dans la vraie vie</h2>
<p>Les systèmes de design des grandes applications définissent une petite échelle d'ombres — trois ou quatre niveaux, du presque invisible au bien détaché — et s'y tiennent. Chaque niveau correspond à une hauteur : une carte posée, un menu ouvert, une fenêtre modale. L'uniformité fait plus pour la qualité perçue que la beauté de chaque ombre prise isolément.</p>

<div class="a-retenir">
<ul>
<li><code>box-shadow</code> prend décalage horizontal, vertical, flou, couleur — et l'horizontal reste à zéro.</li>
<li>Une ombre crédible est légère : opacité entre 0,08 et 0,2.</li>
<li>Un dégradé est une <strong>image</strong> : il va dans <code>background-image</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : l'ombre intérieure</summary>
<p>Le mot-clé <code>inset</code>, ajouté en tête des valeurs, retourne l'ombre vers l'intérieur : l'élément paraît creusé plutôt que soulevé. C'est ce qui donne l'aspect enfoncé d'un champ de saisie, ou d'un bouton pendant qu'on appuie dessus. Deux ombres peuvent se cumuler sur un même élément, séparées par une virgule.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Ajouter une classe à chaque élément fonctionne, mais devient vite lourd : une classe sur le premier élément d'une liste, une autre sur les lignes paires d'un tableau, une troisième sur les puces décoratives. Et surtout, ces classes doivent être maintenues à la main — insérer une ligne au milieu casse tout.</p>
<p>Le CSS sait viser un élément par sa <strong>position</strong>, et même fabriquer du contenu décoratif sans toucher au HTML.</p>

<h2>Cibler par position</h2>
<pre class="bloc-code">li:first-child  { font-weight: bold; }
li:last-child   { border: none; }
tr:nth-child(odd)  { background: #f6f6f6; }
tr:nth-child(3n)   { color: red; }</pre>
<ul>
<li><code>:first-child</code> et <code>:last-child</code> — le premier, le dernier ;</li>
<li><code>:nth-child(odd)</code> et <code>(even)</code> — impairs, pairs ;</li>
<li><code>:nth-child(3n)</code> — un sur trois.</li>
</ul>
<p>Le grand avantage : la règle suit le contenu. Ajoute une ligne au milieu d'un tableau, et le zébrage se recalcule tout seul.</p>

<h2>Fabriquer du contenu : ::before et ::after</h2>
<pre class="bloc-code">.externe::after {
  content: " (lien externe)";
  color: grey;
}</pre>
<p>Ces deux <strong>pseudo-éléments</strong> insèrent quelque chose avant ou après le contenu d'un élément. L'attribut <code>content</code> est obligatoire, même vide : sans lui, rien n'apparaît du tout.</p>

<h2>Pas à pas : ce contenu n'en est pas vraiment un</h2>
<p>Mesuré sur un paragraphe « texte », avec un <code>::before</code> qui ajoute « AVANT » :</p>
<table class="memo-table trace">
<tr><th>Question</th><th>Réponse</th></tr>
<tr><td>Ce que voit le visiteur</td><td>AVANT texte</td></tr>
<tr><td>Ce que contient réellement l'élément</td><td><strong>« texte »</strong>, seulement</td></tr>
</table>
<p>Le contenu généré vit dans l'affichage, pas dans le document. Il ne se sélectionne pas toujours à la souris, et le JavaScript ne le voit pas. La conséquence pratique est nette : <strong>jamais d'information importante dans un <code>content</code></strong>. De la décoration, un symbole, un séparateur — oui. Un prix, un nom, une consigne — non.</p>

<h2>Les pièges</h2>
<p><strong>Oublier <code>content</code>.</strong> Un <code>::before</code> sans <code>content</code> n'existe pas. C'est la cause numéro un des pseudo-éléments qui « ne marchent pas ».</p>
<p><strong>Croire que <code>:first-child</code> vise le premier de son genre.</strong> <code>p:first-child</code> veut dire « un paragraphe qui est le premier enfant de son parent » — s'il est précédé d'un titre, il ne correspond à rien. Pour « le premier paragraphe parmi les paragraphes », c'est <code>p:first-of-type</code>.</p>
<p><strong>Compter à partir de zéro.</strong> <code>:nth-child</code> commence à 1, contrairement aux tableaux que tu rencontreras en programmation. <code>:nth-child(1)</code> est bien le premier.</p>

<h2>Dans la vraie vie</h2>
<p>Le zébrage d'un tableau, le trait de séparation absent sous le dernier élément d'une liste, la petite flèche après un lien externe, les guillemets décoratifs d'une citation : tous se font ainsi, sans une balise de plus dans le HTML. C'est précisément l'objectif — la décoration appartient au CSS.</p>

<div class="a-retenir">
<ul>
<li><code>:nth-child()</code> et ses voisines visent par position, et suivent le contenu quand il change.</li>
<li><code>::before</code> et <code>::after</code> exigent un <code>content</code>, même vide.</li>
<li>Le contenu généré est décoratif : il n'est pas dans le document, donc jamais d'information importante dedans.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : lire nth-child(2n+1)</summary>
<p>La formule générale s'écrit <code>an+b</code>, où <code>n</code> prend successivement les valeurs 0, 1, 2, 3… <code>2n+1</code> donne donc 1, 3, 5, 7 — les impairs, ce qu'<code>odd</code> dit plus simplement. Mais <code>3n+2</code> donne 2, 5, 8, et aucun mot-clé ne le résume. La formule sert dès que le motif sort des pairs et impairs.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Une <code>transition</code> anime un <em>changement</em> : il faut un déclencheur, le survol par exemple. Mais certaines animations n'attendent rien — un indicateur de chargement qui tourne, une pastille qui pulse, un élément qui apparaît en fondu à l'ouverture de la page.</p>
<p>Pour celles-là, il faut décrire une chorégraphie complète. C'est le rôle de <code>@keyframes</code>.</p>

<h2>Deux temps : décrire, puis appliquer</h2>
<pre class="bloc-code">@keyframes pulsation {
  0%   { transform: scale(1); }
  50%  { transform: scale(1.15); }
  100% { transform: scale(1); }
}

.pastille {
  animation: pulsation 2s infinite;
}</pre>
<p>Le bloc <code>@keyframes</code> nomme une chorégraphie et décrit ses <strong>étapes-clés</strong>, en pourcentages du temps total. Le navigateur calcule tout ce qu'il y a entre.</p>
<p>La propriété <code>animation</code> la déclenche, avec au minimum un nom et une durée. <code>infinite</code> la fait recommencer sans fin ; sans ce mot, elle se joue une fois.</p>
<p>Pour une animation simple, <code>from</code> et <code>to</code> remplacent <code>0%</code> et <code>100%</code>.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Moment</th><th>Ce que fait le navigateur</th></tr>
<tr><td>0 s</td><td>Taille normale — l'étape 0 %.</td></tr>
<tr><td>0,5 s</td><td>Il calcule : à un quart du trajet entre 0 % et 50 %, la taille vaut environ 1,07.</td></tr>
<tr><td>1 s</td><td>Taille 1,15 — l'étape 50 %.</td></tr>
<tr><td>2 s</td><td>Retour à 1. Puis tout recommence, grâce à <code>infinite</code>.</td></tr>
</table>
<p>Tu ne décris que les étapes ; les images intermédiaires sont calculées. C'est exactement le principe du dessin animé, où un animateur chevronné dessine les poses clés et laisse remplir le reste.</p>

<h2>Les pièges</h2>
<p><strong>Animer autre chose que <code>transform</code> et <code>opacity</code>.</strong> La même règle que pour les transitions, et elle compte davantage ici : une animation tourne soixante fois par seconde. Animer <code>width</code> ou <code>top</code> oblige le navigateur à recalculer toute la mise en page à chaque image, et ça saccade. <code>transform</code> et <code>opacity</code> ne coûtent presque rien.</p>
<p><strong>Oublier la durée.</strong> <code>animation: pulsation;</code> sans durée vaut zéro seconde : l'animation se joue instantanément, donc ne se voit pas. Rien ne signale l'oubli.</p>
<p><strong>Ne pas prévoir ceux que le mouvement gêne.</strong> Une animation en boucle peut provoquer malaises et vertiges. Une personne concernée l'a signalé dans les réglages de son système, et le CSS peut le lire : <code>@media (prefers-reduced-motion: reduce)</code>. On y met <code>animation: none</code>. C'est deux lignes.</p>
<p><strong>Animer pour animer.</strong> Une animation attire l'œil — c'est sa fonction. Trois éléments animés en même temps sur une page ne s'ajoutent pas, ils se disputent l'attention et n'en captent plus aucune.</p>

<h2>Dans la vraie vie</h2>
<p>Le cercle qui tourne pendant un chargement, le point qui clignote sur une notification, l'apparition en fondu d'une fenêtre modale. Les bonnes animations d'interface durent entre 0,2 et 0,4 seconde et ne se remarquent pas — elles expliquent ce qui vient de se passer, au lieu de décorer.</p>

<div class="a-retenir">
<ul>
<li><code>@keyframes</code> décrit des étapes-clés en pourcentages ; <code>animation</code> les déclenche.</li>
<li>Une animation sans durée ne se voit pas.</li>
<li>On anime <code>transform</code> et <code>opacity</code> — les autres propriétés font saccader.</li>
<li><code>prefers-reduced-motion</code> permet de désactiver le mouvement pour qui l'a demandé.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la courbe du mouvement</summary>
<p>Par défaut, une animation accélère puis ralentit légèrement. On peut choisir autrement avec <code>animation-timing-function</code> : <code>linear</code> donne une vitesse constante — indispensable pour un objet qui tourne en boucle, sinon la rotation paraît hoqueter. <code>ease-out</code>, qui démarre vite et finit doucement, est le choix habituel pour une apparition : l'élément semble se poser.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Ta couleur de marque apparaît trente fois dans ton CSS. Le jour où elle change, il faut trouver les trente — en espérant n'en oublier aucune, et ne pas modifier par erreur un bleu qui n'était pas celui-là.</p>
<p>Les variables CSS résolvent ce problème, et un second, plus intéressant : elles permettent de changer tout un thème en modifiant une poignée de valeurs.</p>

<h2>Déclarer et utiliser</h2>
<pre class="bloc-code">:root {
  --principale: #4f6df5;
  --rayon: 12px;
}

.bouton {
  background: var(--principale);
  border-radius: var(--rayon);
}</pre>
<ul>
<li>une variable se déclare avec <strong>deux tirets</strong> devant son nom ;</li>
<li>elle se lit avec <code>var(--nom)</code> ;</li>
<li><code>:root</code> désigne la racine du document — donc « partout ».</li>
</ul>
<p>Un nom de variable est sensible à la casse, et il n'y a pas de liste officielle : tu choisis les tiens.</p>

<h2>Pas à pas : elles se transmettent</h2>
<p>C'est leur propriété la plus utile, et elle est mesurée : une variable déclarée sur un élément est disponible dans <strong>tous ses descendants</strong>, aussi profonds soient-ils.</p>
<table class="memo-table trace">
<tr><th>Où on déclare</th><th>Qui peut l'utiliser</th></tr>
<tr><td><code>:root</code></td><td>toute la page</td></tr>
<tr><td>une carte</td><td>cette carte et tout ce qu'elle contient</td></tr>
<tr><td>nulle part au-dessus</td><td>personne : <code>var()</code> ne trouve rien</td></tr>
</table>
<p>D'où la technique du mode sombre, qui tient en quelques lignes : on redéclare les mêmes variables sous une autre condition, et toute la page suit — sans toucher à une seule règle.</p>

<h2>Une valeur de secours</h2>
<p><code>var(--accent, blue)</code> prend <code>blue</code> si <code>--accent</code> n'existe pas. C'est utile quand on écrit un composant destiné à être réutilisé : il fonctionne même si la page hôte n'a défini aucune variable.</p>

<h2>Les pièges</h2>
<p><strong>Oublier les deux tirets.</strong> <code>principale: #4f6df5;</code> n'est pas une variable mais une propriété inconnue, ignorée en silence. Les deux tirets <em>sont</em> ce qui crée la variable.</p>
<p><strong>Déclarer trop bas.</strong> Une variable posée sur <code>.carte</code> n'existe pas pour le pied de page. Quand un <code>var()</code> ne donne rien, la question n'est pas « ai-je bien écrit le nom ? » mais « suis-je à l'intérieur de l'élément où je l'ai déclarée ? ».</p>
<p><strong>Confondre avec les variables d'un préprocesseur.</strong> Celles de Sass ou Less sont remplacées une fois pour toutes avant d'arriver au navigateur. Les variables CSS, elles, vivent dans la page : on peut les changer au survol, dans une media query, ou en JavaScript. C'est une différence de nature, pas de syntaxe.</p>

<h2>Dans la vraie vie</h2>
<p>Tous les systèmes de design modernes reposent dessus : une palette, une échelle d'espacements, des rayons d'angle, le tout en variables. Changer de thème revient alors à remplacer une liste de valeurs. Ce cours fonctionne exactement ainsi — son mode sombre ne redéfinit que des variables.</p>

<div class="a-retenir">
<ul>
<li>Une variable se déclare avec deux tirets et se lit avec <code>var(--nom)</code>.</li>
<li>Elle est disponible dans tous les descendants de l'élément où elle est déclarée : <code>:root</code> la rend globale.</li>
<li><code>var(--nom, secours)</code> fournit une valeur de repli.</li>
<li>Contrairement à celles d'un préprocesseur, elles vivent dans la page et peuvent changer à l'exécution.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les lire et les écrire en JavaScript</summary>
<p>Parce qu'elles existent au moment où la page tourne, le JavaScript peut les modifier : une seule ligne change une variable, et tout ce qui en dépend se met à jour d'un coup. C'est ainsi que fonctionnent les sélecteurs de thème, ou les interfaces où l'utilisateur choisit sa couleur d'accent. Aucune autre façon de faire ne demande aussi peu de code.</p>
</details>
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
