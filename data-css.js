/* ===== Module CSS ===== */
window.DATA_CSS = [

{
  id: 'css-1',
  titre: 'C\'est quoi le CSS ?',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Ton HTML fonctionne, mais il est en noir sur blanc, dans la police par défaut du navigateur. Tu pourrais être tenté de corriger ça balise par balise — c'est d'ailleurs ce qu'on faisait dans les années 1990, avec des attributs de couleur sur chaque élément.</p>
<p>Le problème sautait aux yeux au premier changement d'avis : pour passer trois cents titres du rouge au bleu, il fallait modifier trois cents balises. Le CSS (<em>Cascading Style Sheets</em>) sépare les deux questions une fois pour toutes. Le HTML dit <strong>ce que c'est</strong> ; le CSS dit <strong>à quoi ça ressemble</strong>. Une règle, et les trois cents titres changent ensemble.</p>

<h2>La forme d'une règle</h2>
<pre class="bloc-code">h1 {
  color: red;
  font-size: 40px;
}</pre>
<p>Cette règle se lit : « pour tous les titres <code>h1</code> de la page, mets le texte en rouge et la taille à 40 pixels ». Trois morceaux à nommer, parce qu'on va s'en servir tout le temps :</p>
<ul>
<li><code>h1</code> est le <strong>sélecteur</strong> : il désigne les éléments visés ;</li>
<li><code>color</code> est une <strong>propriété</strong> : ce qu'on veut changer ;</li>
<li><code>red</code> est la <strong>valeur</strong> : ce qu'on veut à la place.</li>
</ul>
<p>Le couple propriété-valeur s'appelle une <strong>déclaration</strong>. Elle se termine par un point-virgule, et toutes les déclarations d'une règle tiennent entre accolades.</p>

<h2>Où écrire le CSS</h2>
<p>Dans les exercices de ce cours, il va dans une balise <code>&lt;style&gt;</code> à l'intérieur du HTML. Dans un vrai site, on le range plutôt dans un fichier à part — <code>style.css</code> — relié par une ligne dans le <code>&lt;head&gt;</code>. L'avantage est le même que celui qui a fait naître le CSS : un seul fichier sert toutes les pages du site.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce que fait le navigateur</th></tr>
<tr><td>Il lit le HTML</td><td>Il construit l'arbre des éléments : un h1, deux p.</td></tr>
<tr><td>Il lit le CSS</td><td>Il range les règles, sans rien appliquer encore.</td></tr>
<tr><td>Il croise les deux</td><td>Pour chaque élément, il cherche les règles dont le sélecteur correspond.</td></tr>
<tr><td>Il applique</td><td>Le h1 reçoit <code>color: red</code> et <code>font-size: 40px</code>.</td></tr>
<tr><td>Il dessine</td><td>La page s'affiche, enfin.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Le point-virgule oublié.</strong> C'est l'erreur numéro un, et son symptôme est déroutant : la déclaration fautive <em>et celle qui la suit</em> sont ignorées, tandis que le reste de la règle fonctionne. Tu vois donc une partie de tes styles s'appliquer et l'autre non. Aucun message d'erreur : le CSS ne plante jamais, il saute ce qu'il ne comprend pas.</p>
<p><strong>Écrire du HTML dans le CSS, ou l'inverse.</strong> Les deux langages ne se ressemblent pas du tout : pas de chevrons en CSS, pas d'accolades en HTML. Une balise <code>&lt;p&gt;</code> égarée dans un bloc <code>&lt;style&gt;</code> ne provoque rien d'autre qu'une règle ignorée.</p>
<p><strong>Confondre la propriété et la valeur.</strong> <code>red: color;</code> est accepté par le fichier et ignoré par le navigateur, qui ne connaît pas de propriété nommée <code>red</code>. L'ordre ne s'invente pas : propriété, deux-points, valeur.</p>

<h2>Dans la vraie vie</h2>
<p>Le bouton « mode sombre » de tes applications est du CSS : le HTML ne change pas d'un caractère, seules les règles changent. C'est aussi ce qui permet à un même site de s'afficher différemment sur un téléphone et sur un écran large, sans rien réécrire du contenu.</p>

<div class="a-retenir">
<ul>
<li>Le HTML dit ce qu'est le contenu, le CSS à quoi il ressemble.</li>
<li>Une règle, c'est un <strong>sélecteur</strong> puis des déclarations <strong>propriété: valeur;</strong> entre accolades.</li>
<li>Le CSS ne plante pas : il ignore en silence ce qu'il ne comprend pas.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : que veut dire « cascading » ?</summary>
<p>C'est le mot le plus important du nom, et le moins expliqué. Plusieurs règles peuvent viser le même élément, et parfois se contredire. La « cascade » est l'ensemble des arbitrages qui décident laquelle l'emporte — l'ordre d'écriture, la précision du sélecteur, l'origine de la feuille. Tu verras la mécanique à la leçon suivante ; retiens pour l'instant que le conflit est prévu par le langage, pas accidentel.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Le sélecteur <code>p</code> vise <em>tous</em> les paragraphes de la page. C'est exactement ce qu'on veut pour la police ou l'interligne — et jamais pour un avertissement qu'on souhaite en rouge. Il faut pouvoir viser un élément précis, ou quelques-uns, sans toucher aux autres.</p>
<p>D'où les classes : une étiquette qu'on pose soi-même sur les éléments à traiter ensemble.</p>

<h2>Les classes</h2>
<p>Côté HTML, on pose l'étiquette :</p>
<pre class="bloc-code">&lt;p&gt;Un paragraphe ordinaire.&lt;/p&gt;
&lt;p class="important"&gt;Un paragraphe à mettre en valeur.&lt;/p&gt;</pre>
<p>Côté CSS, on la vise avec un <strong>point</strong> devant son nom :</p>
<pre class="bloc-code">.important {
  color: red;
  font-weight: bold;
}</pre>
<p>Une même classe peut être posée sur autant d'éléments qu'on veut, et un même élément peut en porter plusieurs, séparées par une espace : <code>class="carte premium"</code>. C'est ce qui rend les classes si pratiques — on combine des étiquettes au lieu d'écrire une règle par cas.</p>

<h2>Les trois sélecteurs de base</h2>
<ul>
<li><code>p</code> — par balise : tous les paragraphes ;</li>
<li><code>.important</code> — par classe : tous les éléments qui portent cette étiquette ;</li>
<li><code>#menu</code> — par identifiant : l'élément unique qui porte cet <code>id</code>.</li>
</ul>
<p>Et pour viser plus finement : <code>.carte p</code> désigne les paragraphes <em>situés à l'intérieur</em> d'un élément de classe <code>carte</code> — une espace entre deux sélecteurs veut dire « à l'intérieur de ».</p>

<h2>Qui gagne quand deux règles se contredisent</h2>
<p>C'est là que le mot « cascade » prend son sens. Le navigateur tranche selon deux critères, dans cet ordre :</p>
<ol>
<li><strong>La précision du sélecteur.</strong> Un <code>id</code> l'emporte sur une classe, qui l'emporte sur une balise — quelle que soit la position dans le fichier.</li>
<li><strong>À précision égale, la dernière écrite gagne.</strong></li>
</ol>

<h2>Pas à pas</h2>
<p>Un paragraphe <code>&lt;p id="titre" class="rouge"&gt;</code>, et trois règles qui le visent :</p>
<table class="memo-table trace">
<tr><th>La règle</th><th>Sa force</th><th>Résultat</th></tr>
<tr><td>p { color: blue; }</td><td>une balise</td><td>perdue</td></tr>
<tr><td>.rouge { color: red; }</td><td>une classe — plus fort</td><td>perdue aussi</td></tr>
<tr><td>#titre { color: green; }</td><td>un id — le plus fort</td><td><strong>le texte sera vert</strong></td></tr>
</table>
<p>Et si deux classes se contredisent, sans <code>id</code> en jeu, c'est celle écrite en dernier qui gagne : mesuré, pas supposé.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le point devant une classe.</strong> Écrire <code>important { ... }</code> au lieu de <code>.important { ... }</code> vise une balise nommée « important », qui n'existe pas. La règle ne s'applique à rien, et rien ne le signale. C'est l'erreur la plus fréquente du débutant en CSS.</p>
<p><strong>Mettre le point dans le HTML.</strong> L'attribut s'écrit <code>class="important"</code>, sans point. Le point appartient au CSS, et à lui seul.</p>
<p><strong>Se servir d'un <code>id</code> pour styler.</strong> Il est unique, donc non réutilisable, et sa force écrase les classes — ce qui crée des conflits pénibles à démêler. Les <code>id</code> servent aux ancres et au JavaScript ; pour le style, prends des classes.</p>
<p><strong>Croire qu'une règle plus bas gagne toujours.</strong> Faux : la précision passe d'abord. Une règle de classe écrite en premier battra une règle de balise écrite en dernier.</p>

<h2>Dans la vraie vie</h2>
<p>Ouvre l'inspecteur sur n'importe quel site, choisis un élément : le panneau des styles montre toutes les règles qui le visent, les perdantes <em>barrées</em>. C'est la cascade, rendue visible — et le meilleur outil pour comprendre pourquoi une règle ne s'applique pas.</p>

<div class="a-retenir">
<ul>
<li>Une classe se pose en HTML (<code>class="nom"</code>) et se vise en CSS (<code>.nom</code>) — le point n'existe que d'un côté.</li>
<li>Une espace entre deux sélecteurs veut dire « à l'intérieur de ».</li>
<li>En cas de conflit : id &gt; classe &gt; balise ; et à force égale, la dernière écrite gagne.</li>
<li>Pour le style, on prend des classes — les id sont trop forts et uniques.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le poids se compte vraiment</summary>
<p>Derrière « id &gt; classe &gt; balise » se cache un calcul exact : chaque sélecteur reçoit un score à trois chiffres — nombre d'id, nombre de classes, nombre de balises. <code>#menu .item a</code> vaut 1-1-1, <code>.menu .item a</code> vaut 0-2-1. On compare chiffre par chiffre, de gauche à droite, et le premier écart tranche. C'est pourquoi aucune accumulation de classes ne battra jamais un seul id.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>La couleur est le premier outil qu'on saisit en CSS, et pour de bonnes raisons : elle hiérarchise, elle regroupe, elle signale. Un bouton rouge et un bouton gris ne racontent pas la même chose, même sans un mot.</p>
<p>Encore faut-il savoir l'écrire — et le CSS propose trois notations, qu'on croise toutes les trois dans du code réel.</p>

<h2>Trois façons d'écrire la même couleur</h2>
<ul>
<li><strong>Par son nom</strong> : <code>red</code>, <code>blue</code>, <code>tomato</code>, <code>rebeccapurple</code>… environ 140 existent. Pratique pour essayer, trop limité pour un vrai design ;</li>
<li><strong>En hexadécimal</strong> : <code>#ff0000</code>. Un dièse, puis six caractères : deux pour le rouge, deux pour le vert, deux pour le bleu, de <code>00</code> à <code>ff</code>. C'est la notation que tu croiseras partout ;</li>
<li><strong>En RGB</strong> : <code>rgb(255, 0, 0)</code>. Les mêmes trois quantités, écrites en clair de 0 à 255.</li>
</ul>
<p>Ces trois lignes donnent exactement le même rouge. L'hexadécimal est plus court, le RGB plus lisible quand on cherche une nuance à la main.</p>

<h2>Le texte et le fond</h2>
<pre class="bloc-code">.carte {
  color: #1f2937;
  background-color: #f3f4f6;
}</pre>
<p>Deux propriétés à ne pas confondre : <code>color</code> concerne le <strong>texte</strong>, <code>background-color</code> le <strong>fond</strong>. Le nom de la première est trompeur — on s'attendrait à <code>text-color</code>, qui n'existe pas.</p>
<p>Une couleur de fond s'étend à toute la boîte de l'élément, bordure comprise, et pas seulement derrière les lettres.</p>

<h2>Pas à pas</h2>
<p>Comment lire <code>#4f6df5</code> sans outil :</p>
<table class="memo-table trace">
<tr><th>Morceau</th><th>Ce qu'il dit</th></tr>
<tr><td>4f</td><td>rouge, à peu près un tiers du maximum</td></tr>
<tr><td>6d</td><td>vert, un peu moins de la moitié</td></tr>
<tr><td>f5</td><td>bleu, presque au maximum</td></tr>
<tr><td>total</td><td>beaucoup de bleu, un peu de vert, peu de rouge : un bleu vif</td></tr>
</table>
<p>Deux repères suffisent pour s'y retrouver : <code>00</code> est le minimum, <code>ff</code> le maximum. <code>#000000</code> est donc noir, <code>#ffffff</code> blanc, et trois valeurs identiques donnent toujours un gris.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le dièse.</strong> <code>color: ff0000;</code> ne veut rien dire pour le navigateur : il ignore la déclaration et garde la couleur précédente. Rien ne te prévient, et l'on cherche parfois longtemps.</p>
<p><strong>Écrire <code>background</code> en croyant écrire <code>background-color</code>.</strong> Celle-là marche — <code>background</code> accepte une couleur — mais elle réinitialise au passage tout le reste du fond : une image, un dégradé posé ailleurs disparaissent sans explication.</p>
<p><strong>Choisir des couleurs au contraste insuffisant.</strong> Un gris clair sur blanc est illisible au soleil, sur un vieil écran, ou pour une personne malvoyante. C'est l'un des défauts d'accessibilité les plus répandus, et il se mesure : des outils gratuits donnent le rapport de contraste d'un couple de couleurs.</p>

<h2>Dans la vraie vie</h2>
<p>Les sites sérieux ne choisissent pas leurs couleurs une par une : ils définissent une petite palette — une couleur principale, une d'accent, deux ou trois gris — et s'y tiennent. C'est ce qui donne l'impression d'unité d'un site bien fait, bien plus que le choix des teintes elles-mêmes.</p>

<div class="a-retenir">
<ul>
<li>Trois notations pour la même couleur : nom, hexadécimal <code>#ff0000</code>, et <code>rgb(255, 0, 0)</code>.</li>
<li><code>color</code> pour le texte, <code>background-color</code> pour le fond.</li>
<li>En hexadécimal, <code>00</code> est le minimum et <code>ff</code> le maximum ; trois valeurs égales donnent un gris.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la transparence</summary>
<p>Une quatrième valeur s'ajoute aux trois autres : l'opacité. En RGB, <code>rgba(255, 0, 0, 0.5)</code> donne un rouge à moitié transparent. En hexadécimal, on ajoute deux caractères à la fin : <code>#ff000080</code>. C'est ce qui permet de poser un voile sombre sur une photo pour que le texte reste lisible par-dessus — une technique qu'on retrouve sur presque toutes les bannières de site.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Un site, c'est presque entièrement du texte. Avant toute question de couleur ou de disposition, ce qui décide si une page est agréable ou pénible, c'est sa lisibilité : la taille des caractères, l'espace entre les lignes, la longueur des lignes.</p>
<p>Ce sont aussi les propriétés que tu écriras le plus souvent — autant les connaître par cœur.</p>

<h2>Les propriétés du texte</h2>
<pre class="bloc-code">.article {
  font-size: 18px;
  font-family: Georgia, serif;
  font-weight: bold;
  font-style: italic;
  text-align: center;
  text-decoration: underline;
  line-height: 1.6;
}</pre>
<p>Deux méritent un mot de plus.</p>
<p><code>font-family</code> prend une <strong>liste</strong>, pas une police. Le navigateur essaie la première ; si elle n'est pas installée, il passe à la suivante. On termine toujours par une famille générique — <code>serif</code>, <code>sans-serif</code>, <code>monospace</code> — qui existe partout, pour ne jamais tomber sur la police par défaut du navigateur.</p>
<p><code>line-height</code> s'écrit sans unité : <code>1.6</code> veut dire « une fois et demie la taille du texte, et un peu plus ». L'avantage de l'absence d'unité est qu'il s'adapte : si un titre est plus gros, son interligne grandit proportionnellement.</p>

<h2>Les unités de taille</h2>
<p>Trois reviennent sans cesse, et la différence compte :</p>
<ul>
<li><code>px</code> — une taille fixe. 18 pixels restent 18 pixels ;</li>
<li><code>em</code> — relatif à la taille du <strong>parent</strong> ;</li>
<li><code>rem</code> — relatif à la taille de <strong>la page entière</strong>, qui vaut 16 pixels par défaut.</li>
</ul>

<h2>Pas à pas</h2>
<p>Le piège de <code>em</code>, mesuré sur une boîte dans une boîte, toutes deux en <code>font-size: 2em</code> :</p>
<table class="memo-table trace">
<tr><th>Élément</th><th>Avec em</th><th>Avec rem</th></tr>
<tr><td>la page</td><td>16 px</td><td>16 px</td></tr>
<tr><td>la boîte extérieure</td><td>32 px — deux fois 16</td><td>32 px</td></tr>
<tr><td>la boîte intérieure</td><td><strong>64 px</strong> — deux fois 32 !</td><td>32 px — toujours deux fois 16</td></tr>
</table>
<p>Le <code>em</code> s'<strong>accumule</strong> à chaque niveau d'imbrication. C'est voulu, et très utile pour qu'un composant entier grandisse d'un coup — mais c'est la cause numéro un des tailles de texte devenues incontrôlables. Le <code>rem</code>, lui, repart toujours de la même référence.</p>

<h2>Les pièges</h2>
<p><strong>Une seule police dans <code>font-family</code>.</strong> <code>font-family: Georgia;</code> fonctionne sur ta machine, où Georgia est installée. Ailleurs, le navigateur retombe sur sa police par défaut, et ta page ne ressemble plus à rien. Termine toujours par <code>serif</code> ou <code>sans-serif</code>.</p>
<p><strong>Des <code>em</code> imbriqués.</strong> Deux niveaux à <code>1.2em</code> donnent déjà 1,44 fois la taille, trois en donnent 1,73. Quand des tailles s'emballent sans raison apparente, c'est presque toujours ça.</p>
<p><strong>Oublier les guillemets sur une police à nom composé.</strong> <code>font-family: Times New Roman;</code> est ambigu ; il faut <code>"Times New Roman"</code>.</p>
<p><strong>Un <code>line-height</code> trop serré.</strong> C'est le réglage qui change le plus le confort de lecture, et le plus souvent négligé. En dessous de 1,4 sur un paragraphe, l'œil accroche d'une ligne à l'autre.</p>

<h2>Dans la vraie vie</h2>
<p>Les sites de presse travaillent ces trois réglages avant tout le reste : une taille d'au moins 18 pixels, un interligne autour de 1,6, et une largeur de colonne limitée à une soixantaine de caractères. Ce n'est pas une affaire de goût mais de fatigue oculaire — on lit plus longtemps sans s'épuiser.</p>

<div class="a-retenir">
<ul>
<li><code>font-family</code> prend une liste de secours, terminée par une famille générique.</li>
<li><code>line-height</code> s'écrit sans unité, et 1,5 à 1,6 convient à un paragraphe.</li>
<li><code>em</code> dépend du parent et <strong>s'accumule</strong> ; <code>rem</code> part toujours des 16 pixels de la page.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi ne pas tout mettre en pixels ?</summary>
<p>Parce qu'un visiteur peut avoir augmenté la taille de police par défaut de son navigateur — souvent parce qu'il voit mal. Les tailles en <code>rem</code> suivent ce réglage ; celles en <code>px</code> l'ignorent et restent minuscules. C'est la raison pour laquelle les sites soignés dimensionnent leur texte en <code>rem</code>, et réservent les pixels aux bordures et aux petits détails.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Jusqu'ici tu as changé des couleurs et du texte, c'est-à-dire ce qu'il y a <em>dans</em> les éléments. Dès qu'on veut agir sur l'espace — écarter deux blocs, encadrer une carte, aérer un bouton — il faut comprendre une chose : en CSS, <strong>tout élément est une boîte rectangulaire</strong>. Même un mot en gras, même une image.</p>
<p>Et cette boîte a quatre couches. Les confondre est la source de la moitié des problèmes de mise en page.</p>

<h2>Les quatre couches</h2>
<p>De l'intérieur vers l'extérieur :</p>
<ul>
<li>le <strong>contenu</strong> — le texte, l'image ;</li>
<li>le <code>padding</code> — l'espace <em>intérieur</em>, entre le contenu et le bord. Il prend la couleur de fond ;</li>
<li>la <code>border</code> — la bordure elle-même ;</li>
<li>la <code>margin</code> — l'espace <em>extérieur</em>, qui repousse les boîtes voisines. Toujours transparent.</li>
</ul>
<pre class="bloc-code">.carte {
  padding: 16px;
  border: 2px solid #ccc;
  margin: 24px;
}</pre>
<p>La distinction qui compte : <code>padding</code> agrandit la boîte vers l'intérieur et se colore ; <code>margin</code> creuse un vide autour et ne se colore jamais. Quand tu hésites, demande-toi si l'espace doit prendre la couleur de fond.</p>

<h2>Pas à pas : width ne veut pas dire largeur</h2>
<p>Voici le piège le plus déroutant du CSS, en nombres mesurés. Une boîte en <code>width: 200px</code>, avec 16 pixels de padding et 2 de bordure :</p>
<table class="memo-table trace">
<tr><th>Couche</th><th>Largeur ajoutée</th></tr>
<tr><td>le contenu (<code>width</code>)</td><td>200 px</td></tr>
<tr><td>le padding, des deux côtés</td><td>+ 32 px</td></tr>
<tr><td>la bordure, des deux côtés</td><td>+ 4 px</td></tr>
<tr><td><strong>largeur réelle à l'écran</strong></td><td><strong>236 px</strong></td></tr>
</table>
<p>Par défaut, <code>width</code> dimensionne donc le <em>contenu seul</em>, pas la boîte. Deux cartes à 50 % côte à côte, avec du padding, déborderont — et c'est exactement ce qui arrive à tout le monde la première fois.</p>

<h2>La ligne qui règle le problème</h2>
<pre class="bloc-code">* {
  box-sizing: border-box;
}</pre>
<p><code>border-box</code> dit : « que <code>width</code> compte la boîte entière, bordure comprise ». La même boîte mesure alors exactement 200 pixels, comme on l'attendait. L'étoile vise tous les éléments.</p>
<p>Cette règle est posée en tête de pratiquement tous les sites modernes. Le comportement par défaut, lui, vient des années 1990 et ne pouvait plus être changé sans casser le web existant.</p>

<h2>Les pièges</h2>
<p><strong>Les marges verticales qui fusionnent.</strong> Deux blocs empilés, avec 20 pixels de marge chacun : l'espace entre eux n'est pas de 40 pixels, mais de <strong>20</strong>. Les marges verticales se « télescopent » — la plus grande l'emporte, elles ne s'additionnent pas. Horizontalement, en revanche, 20 et 20 font bien 40. Cette asymétrie surprend tout le monde ; elle est voulue, pour que des paragraphes successifs gardent un espacement régulier.</p>
<p><strong>Confondre padding et margin pour écarter deux éléments.</strong> Un padding agrandit l'élément ; seule la margin crée du vide <em>entre</em> deux éléments. Si ton fond coloré s'étale plus que prévu, tu as pris le mauvais des deux.</p>
<p><strong>Oublier le style d'une bordure.</strong> <code>border: 2px black;</code> n'affiche rien du tout : il manque <code>solid</code>. Les trois morceaux — épaisseur, style, couleur — sont attendus, et l'omission est silencieuse.</p>

<h2>Dans la vraie vie</h2>
<p>Ouvre l'inspecteur et sélectionne un élément : un schéma en couches apparaît, avec les quatre zones et leurs tailles. C'est le diagramme du modèle de boîte, appliqué en direct — l'outil le plus rapide pour comprendre pourquoi un bloc est plus large que prévu.</p>

<div class="a-retenir">
<ul>
<li>Toute boîte a quatre couches : contenu, <code>padding</code>, <code>border</code>, <code>margin</code>.</li>
<li>Le padding se colore avec le fond ; la margin reste toujours transparente.</li>
<li>Par défaut, <code>width</code> ne compte que le contenu : 200 px deviennent 236 à l'écran. <code>box-sizing: border-box</code> corrige ça.</li>
<li>Les marges verticales fusionnent (20 et 20 font 20) ; les horizontales s'additionnent.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi des marges qui fusionnent ?</summary>
<p>Imagine une suite de paragraphes, chacun avec une marge en haut et en bas. Sans fusion, l'espace entre deux paragraphes serait le double de celui qui précède le premier — le texte paraîtrait mal calé. La fusion rend l'espacement régulier sans qu'on ait à réfléchir. C'est une décision de typographe, prise à une époque où le CSS servait surtout à mettre en page des documents.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Centrer un élément a longtemps été la blague récurrente du métier. Horizontalement, on s'en sortait ; verticalement, il fallait des astuces de contorsionniste — tableaux détournés, positionnements absolus, calculs à la main. Des générations de développeurs ont perdu des heures là-dessus.</p>
<p>Flexbox a réglé la question. C'est aujourd'hui l'outil normal pour aligner des éléments, et le premier réflexe dès qu'il s'agit de placer des choses côte à côte.</p>

<h2>Le principe : on active sur le parent</h2>
<p>C'est l'idée à saisir, et elle n'est pas intuitive : on ne touche pas aux éléments qu'on veut déplacer, mais à <strong>leur conteneur</strong>. Les enfants s'organisent alors tout seuls.</p>
<pre class="bloc-code">.rangee {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}</pre>
<ul>
<li><code>display: flex</code> — active le mode. Les enfants, qui s'empilaient, se mettent côte à côte ;</li>
<li><code>justify-content</code> — leur répartition sur l'axe <strong>horizontal</strong> ;</li>
<li><code>align-items</code> — leur alignement sur l'axe <strong>vertical</strong> ;</li>
<li><code>gap</code> — l'espace entre eux, sans avoir à poser de marges.</li>
</ul>

<h2>Les valeurs qui servent vraiment</h2>
<p>Pour <code>justify-content</code> : <code>flex-start</code> (tout à gauche, le défaut), <code>center</code>, <code>flex-end</code>, <code>space-between</code> (collés aux deux bords, l'espace réparti entre eux) et <code>space-around</code>.</p>
<p>Pour <code>align-items</code> : <code>stretch</code> (le défaut — les enfants prennent toute la hauteur), <code>center</code>, <code>flex-start</code>, <code>flex-end</code>.</p>
<p>Le centrage parfait, celui qui coûtait si cher autrefois, tient désormais en trois lignes : <code>display: flex</code>, <code>justify-content: center</code>, <code>align-items: center</code>.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'on écrit</th><th>Ce qui change</th></tr>
<tr><td>rien</td><td>Les blocs s'empilent, chacun sur sa ligne.</td></tr>
<tr><td><code>display: flex</code></td><td>Ils se mettent côte à côte, collés à gauche.</td></tr>
<tr><td><code>gap: 16px</code></td><td>Seize pixels les séparent, sans marge à écrire.</td></tr>
<tr><td><code>justify-content: center</code></td><td>Le groupe entier glisse au milieu, horizontalement.</td></tr>
<tr><td><code>align-items: center</code></td><td>Il se centre aussi en hauteur.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Écrire <code>display: flex</code> sur l'enfant.</strong> C'est l'erreur de départ de tout le monde. La propriété va sur le <em>conteneur</em>, et elle n'agit que sur ses enfants directs — pas sur les petits-enfants.</p>
<p><strong>Confondre les deux axes.</strong> <code>justify-content</code> agit horizontalement, <code>align-items</code> verticalement. Les noms ne le disent pas, et il n'y a pas de truc pour s'en souvenir : c'est à apprendre tel quel. Et attention — si tu ajoutes <code>flex-direction: column</code>, les deux axes s'échangent.</p>
<p><strong>Centrer verticalement dans une boîte sans hauteur.</strong> <code>align-items: center</code> centre dans la hauteur <em>disponible</em>. Si le conteneur fait exactement la hauteur de son contenu, il n'y a rien à centrer et rien ne bouge. Il faut d'abord lui donner une <code>height</code> ou une <code>min-height</code>.</p>
<p><strong>Poser des marges au lieu de <code>gap</code>.</strong> Ça marche, mais la dernière marge dépasse à droite, et il faut ensuite la rattraper. <code>gap</code> n'espace qu'<em>entre</em> les éléments.</p>

<h2>Dans la vraie vie</h2>
<p>La barre de navigation de presque tous les sites est un conteneur flex : logo à gauche, menu à droite, obtenus par un simple <code>justify-content: space-between</code>. Les cartes alignées d'une boutique, les boutons d'un formulaire, la barre d'outils d'un éditeur : toutes sont des rangées flex.</p>

<div class="a-retenir">
<ul>
<li><code>display: flex</code> se met sur le <strong>conteneur</strong> ; ce sont ses enfants directs qui s'organisent.</li>
<li><code>justify-content</code> aligne horizontalement, <code>align-items</code> verticalement.</li>
<li><code>gap</code> espace les enfants sans ajouter de marge en trop sur les bords.</li>
<li>Centrer verticalement demande un conteneur qui a de la hauteur.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : Flexbox ou Grid ?</summary>
<p>Il existe un second système, CSS Grid, qui travaille en lignes <em>et</em> colonnes simultanément. La règle de choix est simple : Flexbox pour une dimension — une rangée, une colonne — et Grid pour une vraie grille à deux dimensions, comme la mise en page générale d'une page. Les deux coexistent très bien, souvent dans le même site : Grid pour la structure d'ensemble, Flexbox à l'intérieur de chaque bloc.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Une page figée donne l'impression d'être cassée. Quand la souris passe sur un bouton et qu'il ne se passe rien, on ne sait pas s'il est cliquable. La réaction au survol n'est pas une coquetterie : c'est un <strong>retour d'information</strong>, qui dit « cet élément t'attend ».</p>
<p>Deux outils suffisent à le faire, et bien.</p>

<h2>La pseudo-classe :hover</h2>
<pre class="bloc-code">.bouton {
  background-color: #4f6df5;
}

.bouton:hover {
  background-color: #22c55e;
}</pre>
<p>En ajoutant <code>:hover</code> à un sélecteur, la règle ne s'applique que pendant que la souris survole l'élément. On appelle ça une <strong>pseudo-classe</strong> : une condition sur l'état, pas sur l'élément lui-même.</p>
<p>D'autres suivent la même logique : <code>:focus</code> (l'élément a le curseur, au clavier), <code>:active</code> (on est en train de cliquer), <code>:first-child</code> (le premier enfant de son parent).</p>

<h2>La transition</h2>
<p>Sans rien de plus, le changement est instantané — et brutal. La propriété <code>transition</code> étale le passage dans le temps :</p>
<pre class="bloc-code">.bouton {
  background-color: #4f6df5;
  transition: background-color 0.3s;
}</pre>
<p>Trois dixièmes de seconde pour passer d'une couleur à l'autre. En dessous de 0,15 s on ne voit rien ; au-delà de 0,5 s, l'interface paraît lente.</p>

<h2>Pas à pas : pourquoi la transition va dans la règle normale</h2>
<p>C'est la question qui revient toujours, et elle a une réponse nette. Comparons les deux écritures :</p>
<table class="memo-table trace">
<tr><th>Moment</th><th>transition dans <code>.bouton</code></th><th>transition dans <code>:hover</code></th></tr>
<tr><td>La souris arrive</td><td>passage en douceur</td><td>passage en douceur</td></tr>
<tr><td>La souris repart</td><td>retour en douceur</td><td><strong>retour instantané</strong></td></tr>
</table>
<p>Quand la souris quitte l'élément, la règle <code>:hover</code> ne s'applique plus — et la transition qu'elle contenait disparaît avec elle. D'où ce retour sec, qu'on remarque sans savoir l'expliquer. Mise dans la règle normale, la transition vaut dans les deux sens.</p>

<h2>Les pièges</h2>
<p><strong>Animer toutes les propriétés d'un coup.</strong> <code>transition: all 0.3s;</code> est tentant, et c'est un mauvais réflexe : le navigateur surveille tout, y compris des propriétés dont l'animation coûte cher à calculer. Nomme ce que tu animes.</p>
<p><strong>Animer des propriétés qui font recalculer la page.</strong> Changer <code>width</code>, <code>height</code> ou <code>margin</code> oblige le navigateur à refaire toute la mise en page, soixante fois par seconde — l'animation saccade. <code>transform</code> (déplacer, agrandir) et <code>opacity</code> sont les deux propriétés qu'il sait animer sans rien recalculer. Pour qu'une carte se soulève, on préfère donc <code>transform: scale(1.05)</code> à un changement de largeur.</p>
<p><strong>Ne penser qu'à la souris.</strong> <code>:hover</code> n'existe pas sur un écran tactile, et ne se déclenche pas au clavier. Un bouton dont l'état ne change qu'au survol laisse sans repère qui navigue au clavier. On écrit donc souvent <code>.bouton:hover, .bouton:focus</code> ensemble.</p>

<h2>Dans la vraie vie</h2>
<p>Ouvre n'importe quel site soigné et promène la souris : les liens changent de couleur, les cartes se soulèvent de quelques pixels, les boutons s'assombrissent. Presque tout est en <code>transform</code> et <code>opacity</code>, sur des durées entre 0,15 et 0,3 seconde. Ce sont ces détails, pris ensemble, qui donnent l'impression d'un site « bien fait ».</p>

<div class="a-retenir">
<ul>
<li><code>:hover</code> est une pseudo-classe : une règle conditionnée par l'état de l'élément.</li>
<li>La <code>transition</code> se met dans la règle <strong>normale</strong>, pour valoir à l'aller comme au retour.</li>
<li>On anime <code>transform</code> et <code>opacity</code> : les autres propriétés font recalculer la page.</li>
<li><code>:hover</code> n'existe ni au doigt ni au clavier — pense à <code>:focus</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : respecter ceux que le mouvement gêne</summary>
<p>Les animations peuvent provoquer nausées et vertiges chez certaines personnes, qui désactivent le mouvement dans les réglages de leur système. Une règle CSS permet de le détecter : <code>@media (prefers-reduced-motion: reduce)</code>. On y annule les transitions. C'est deux lignes, et c'est la différence entre un site utilisable et un site qui rend malade.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Ta page sera lue sur un écran de 30 pouces et sur un téléphone de 6. Une mise en page en trois colonnes, parfaite sur l'un, devient illisible sur l'autre : trois colonnes de quinze caractères de large.</p>
<p>Pendant quelques années, on a fabriqué deux sites séparés — un « normal » et un « mobile ». C'était deux fois le travail, et deux fois les oublis. Le <strong>responsive</strong> fait l'inverse : un seul site, qui se réorganise selon la place dont il dispose.</p>

<h2>La media query</h2>
<pre class="bloc-code">.colonnes {
  display: flex;
  gap: 16px;
}

@media (max-width: 600px) {
  .colonnes {
    flex-direction: column;
  }
}</pre>
<p>Un bloc <code>@media</code> contient du CSS qui ne s'applique <em>que si</em> une condition d'écran est remplie. Ici : en dessous de 600 pixels de large, les colonnes s'empilent au lieu de se juxtaposer.</p>
<p><code>max-width: 600px</code> se lit « si la fenêtre fait au plus 600 pixels ». Son contraire, <code>min-width</code>, veut dire « au moins ». Les deux existent, et le choix entre les deux dessine deux façons de travailler.</p>

<h2>Commencer par le petit écran</h2>
<p>L'usage est d'écrire d'abord le CSS du <strong>téléphone</strong>, puis d'ajouter des <code>@media (min-width: ...)</code> pour les écrans plus larges. Cela paraît à l'envers, et c'est pourtant plus simple : la version mobile est la plus contrainte, donc celle qui force à décider de l'essentiel. Élargir ensuite est facile ; rétrécir après coup ne l'est jamais.</p>

<h2>Pas à pas : l'image qui déborde</h2>
<p>Une image de 800 pixels dans un cadre de 300 :</p>
<table class="memo-table trace">
<tr><th>CSS appliqué</th><th>Largeur réelle de l'image</th></tr>
<tr><td>aucun</td><td><strong>800 px</strong> — elle sort du cadre</td></tr>
<tr><td><code>max-width: 100%</code></td><td><strong>300 px</strong> — elle rentre</td></tr>
</table>
<p>Mesuré, et c'est la règle la plus rentable de toute la leçon : <code>img { max-width: 100%; }</code> suffit à régler l'immense majorité des débordements sur mobile. <code>max-width</code> plutôt que <code>width</code>, pour qu'une petite image ne soit jamais étirée au-delà de sa taille réelle.</p>

<h2>Les pièges</h2>
<p><strong>Oublier la balise <code>viewport</code>.</strong> Sans <code>&lt;meta name="viewport"&gt;</code> dans le <code>&lt;head&gt;</code>, le téléphone affiche la page en miniature et <em>aucune</em> media query ne se déclenche — il prétend avoir un écran large. On peut passer des heures à chercher pourquoi le responsive ne marche pas, alors qu'il manque une ligne de HTML.</p>
<p><strong>Choisir des seuils d'après les modèles de téléphone.</strong> Les tailles d'écran changent tous les ans. On place un seuil là où <em>la mise en page</em> commence à être à l'étroit — en réduisant la fenêtre jusqu'à ce que ça coince — pas à la largeur d'un appareil précis.</p>
<p><strong>Mettre des largeurs fixes.</strong> <code>width: 900px</code> débordera de tout écran plus étroit. Les pourcentages, <code>max-width</code> et Flexbox s'adaptent ; les pixels non.</p>
<p><strong>Tester en redimensionnant la fenêtre seulement.</strong> C'est utile, mais ça ne reproduit ni le doigt, ni le clavier qui recouvre la moitié de l'écran, ni les zones qu'on n'atteint pas d'une main.</p>

<h2>Dans la vraie vie</h2>
<p>Plus de la moitié du trafic web vient des téléphones, et les moteurs de recherche évaluent désormais les sites sur leur version mobile. Un site qui demande de zoomer est pénalisé deux fois : par le visiteur qui s'en va, et par le classement.</p>

<div class="a-retenir">
<ul>
<li><code>@media (max-width: 600px) { ... }</code> n'applique son CSS qu'en dessous de 600 pixels.</li>
<li>Sans la balise <code>viewport</code> dans le HTML, aucune media query ne se déclenche sur mobile.</li>
<li><code>img { max-width: 100%; }</code> règle la plupart des débordements.</li>
<li>On place un seuil là où la mise en page casse, jamais d'après un modèle de téléphone.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : s'adapter au conteneur, pas à la fenêtre</summary>
<p>Une media query interroge la <em>fenêtre</em>. Or une carte placée dans une colonne étroite devrait se réorganiser même si la fenêtre est large — ce qu'aucune media query ne sait voir. Les <em>container queries</em>, arrivées récemment dans tous les navigateurs, interrogent la largeur du conteneur parent. C'est ce qui manquait depuis quinze ans pour écrire des composants vraiment réutilisables.</p>
</details>
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
