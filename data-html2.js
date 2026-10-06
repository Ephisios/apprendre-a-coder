/* ===== Module HTML — leçons 9 à 14 (approfondissement) ===== */
window.DATA_HTML2 = [

{
  id: 'html-9',
  titre: 'Audio, vidéo et pages imbriquées',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Pendant longtemps, mettre une vidéo sur une page voulait dire installer un greffon — Flash, RealPlayer — que chaque visiteur devait avoir, et qui tombait en panne. Le HTML moderne a pris le problème à sa racine : le son et la vidéo sont devenus des balises, comme les images.</p>
<p>Même logique qu'avec <code>&lt;img&gt;</code> : la balise ne contient pas le film, elle dit où le trouver.</p>

<h2>Vidéo et audio</h2>
<pre class="bloc-code">&lt;video src="recette.mp4" controls width="400"&gt;&lt;/video&gt;

&lt;audio src="podcast.mp3" controls&gt;&lt;/audio&gt;</pre>
<ul>
<li><code>src</code> — le fichier, comme pour une image ;</li>
<li><code>controls</code> — affiche les boutons lecture, pause et volume ;</li>
<li><code>width</code> — la largeur, en pixels.</li>
</ul>
<p>Contrairement à <code>&lt;img&gt;</code>, ces deux balises <strong>se ferment</strong> : <code>&lt;/video&gt;</code>, <code>&lt;/audio&gt;</code>. Ce qu'on écrit entre les deux s'affiche seulement si le navigateur ne sait pas lire le fichier — un message de repli.</p>

<h2>Un attribut qui n'a pas de valeur</h2>
<p><code>controls</code> est un <strong>attribut booléen</strong> : sa seule présence suffit. On écrit <code>controls</code>, pas <code>controls="true"</code>. Et pour désactiver les boutons, on ne met pas <code>controls="false"</code> — on <em>retire</em> l'attribut. C'est tout ou rien.</p>
<p>D'autres suivent la même règle : <code>autoplay</code> (démarre tout seul), <code>loop</code> (recommence), <code>muted</code> (sans son).</p>

<h2>Une page dans une page</h2>
<p>La balise <code>&lt;iframe&gt;</code> affiche une page entière à l'intérieur de la tienne — une carte, une vidéo hébergée ailleurs, un formulaire externe :</p>
<pre class="bloc-code">&lt;iframe src="https://exemple.com" width="600" height="400"
        title="Carte du quartier"&gt;&lt;/iframe&gt;</pre>
<p>Le <code>title</code> n'est pas décoratif : c'est lui qu'annonce un lecteur d'écran en arrivant sur ce cadre. Sans lui, la personne entend « cadre », sans savoir ce qu'il contient.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Ce qu'il en fait</th></tr>
<tr><td>&lt;video</td><td>Il réserve un rectangle dans la page.</td></tr>
<tr><td>src="recette.mp4"</td><td>Il commence à télécharger le fichier, sans bloquer le reste.</td></tr>
<tr><td>controls</td><td>Présent : il dessine les boutons. Aucune valeur à lire.</td></tr>
<tr><td>width="400"</td><td>Le rectangle fera 400 pixels de large.</td></tr>
<tr><td>&lt;/video&gt;</td><td>Rien entre les deux balises : pas de message de repli.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Oublier <code>controls</code>.</strong> La vidéo est bien là, mais sans aucun bouton : impossible de la lancer. L'élève voit un rectangle noir et croit que son code n'a pas marché. Rien ne signale l'oubli — c'est l'erreur numéro un de cette leçon.</p>
<p><strong>Écrire <code>controls="false"</code> en croyant les cacher.</strong> Un attribut booléen ne s'éteint pas avec une valeur : le navigateur voit que l'attribut est là, et affiche les boutons. Même chose pour <code>hidden="false"</code>, qui cache quand même.</p>
<p><strong>Compter sur <code>autoplay</code>.</strong> Les navigateurs refusent de démarrer une vidéo avec du son sans action de l'utilisateur. C'est une protection contre les publicités sonores, et tu ne peux pas la contourner. Une vidéo <code>autoplay</code> ne démarre que si elle est aussi <code>muted</code>.</p>

<h2>Dans la vraie vie</h2>
<p>Le lecteur d'une plateforme vidéo, la carte d'un restaurant sur sa page de contact, le module de paiement d'une boutique : tous sont des <code>&lt;iframe&gt;</code>. C'est aussi ce que ce cours utilise pour t'afficher l'aperçu de tes pages, juste à côté de ton code.</p>

<div class="a-retenir">
<ul>
<li><code>&lt;video&gt;</code> et <code>&lt;audio&gt;</code> lisent un fichier ; elles se ferment, contrairement à <code>&lt;img&gt;</code>.</li>
<li>Un attribut booléen comme <code>controls</code> n'a pas de valeur : on le met, ou on le retire.</li>
<li><code>&lt;iframe&gt;</code> encastre une page entière — avec un <code>title</code>, toujours.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi plusieurs formats ?</summary>
<p>Tous les navigateurs ne lisent pas les mêmes fichiers vidéo. On peut donc, au lieu d'un seul <code>src</code>, placer plusieurs balises <code>&lt;source&gt;</code> à l'intérieur du <code>&lt;video&gt;</code> : le navigateur essaie la première, puis la suivante, jusqu'à en trouver une qu'il sait lire. Aujourd'hui le format MP4 passe à peu près partout, ce qui rend cette précaution moins nécessaire qu'avant.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Prépare le lecteur vidéo d\'un site de recettes : une balise <code>&lt;video&gt;</code> avec <code>src="recette.mp4"</code>, l\'attribut <code>controls</code>, une largeur de <code>400</code>, et l\'attribut <code>loop</code> pour qu\'elle tourne en boucle. (L\'aperçu montrera un lecteur vide : normal, le fichier n\'existe pas — c\'est la structure qui compte.)',
      codeDepart: '<h1>Ma recette en vidéo</h1>\n',
      indices: [
        "Une vidéo n’a pas de contenu à écrire : tout ce qui la règle tient dans ses attributs.",
        "Certains attributs prennent une valeur (<code>src</code>, <code>width</code>), d’autres non : leur seule présence suffit, comme <code>controls</code> ou <code>loop</code>.",
        "<code>&lt;video src=\"recette.mp4\" controls width=\"400\" loop&gt;&lt;/video&gt;</code>"
      ],
      solution: '<h1>Ma recette en vidéo</h1>\n<video src="recette.mp4" controls width="400" loop></video>',
      verifier: function (ctx) {
        const v = ctx.doc.querySelector('video');
        if (!v) return { ok: false, message: 'Il manque la balise <code>&lt;video&gt;</code> (avec sa fermante <code>&lt;/video&gt;</code>).' };
        if ((v.getAttribute('src') || '') !== 'recette.mp4') return { ok: false, message: 'L\'attribut <code>src</code> doit valoir <code>recette.mp4</code>.' };
        if (!v.hasAttribute('controls')) return { ok: false, message: 'Sans l\'attribut <code>controls</code>, l\'utilisateur ne peut ni lancer ni arrêter la vidéo ! Ajoute le mot seul, sans valeur.' };
        if ((v.getAttribute('width') || '') !== '400') return { ok: false, message: 'Il manque <code>width="400"</code>.' };
        if (!v.hasAttribute('loop')) return { ok: false, message: 'Dernier attribut : <code>loop</code> pour la lecture en boucle.' };
        return { ok: true, message: 'Tu viens de rencontrer les attributs booléens (controls, loop) : présents = activés, c\'est tout.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : la page dans la page.</strong> Grâce à l\'attribut <code>srcdoc</code>, une iframe peut contenir directement du HTML ! Crée une <code>&lt;iframe&gt;</code> avec <code>srcdoc="&lt;h1&gt;Coucou depuis l\'intérieur !&lt;/h1&gt;"</code>, une largeur de <code>300</code> et une hauteur de <code>150</code>. Tu verras une mini-page vivre dans ta page.',
      codeDepart: '<h1>Ma page principale</h1>\n<p>Et voici une page incrustée :</p>\n',
      indices: [
        "Une iframe affiche normalement une autre page. Ici, on lui donne directement le HTML à afficher.",
        "L’attribut <code>srcdoc</code> contient du HTML entre guillemets. Attention donc aux guillemets intérieurs, qui fermeraient l’attribut trop tôt.",
        "<code>&lt;iframe srcdoc=\"&lt;h1&gt;Coucou&lt;/h1&gt;\" width=\"300\" height=\"150\"&gt;&lt;/iframe&gt;</code>"
      ],
      solution: '<h1>Ma page principale</h1>\n<p>Et voici une page incrustée :</p>\n<iframe srcdoc="<h1>Coucou depuis l\'intérieur !</h1>" width="300" height="150"></iframe>',
      verifier: function (ctx) {
        const f = ctx.doc.querySelector('iframe');
        if (!f) return { ok: false, message: 'Il manque la balise <code>&lt;iframe&gt;</code>.' };
        const sd = f.getAttribute('srcdoc') || '';
        if (!/coucou/i.test(sd)) return { ok: false, message: 'L\'attribut <code>srcdoc</code> doit contenir le HTML de la mini-page (avec « Coucou depuis l\'intérieur ! »).' };
        if (!/<h1>/i.test(sd)) return { ok: false, message: 'Le texte de la mini-page doit être dans une balise <code>&lt;h1&gt;</code>, à l\'intérieur du srcdoc.' };
        if ((f.getAttribute('width') || '') !== '300' || (f.getAttribute('height') || '') !== '150') return { ok: false, message: 'Ajoute les dimensions : <code>width="300" height="150"</code>.' };
        return { ok: true, message: 'Une page dans la page — et tu sais maintenant comment les aperçus de ce logiciel fonctionnent : ce sont des iframes en srcdoc !' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Que se passe-t-il si tu oublies l\'attribut <code>controls</code> sur une balise <code>&lt;audio&gt;</code> ?',
      choix: [
        'Le son ne peut pas être chargé',
        'Le lecteur est invisible : aucun bouton pour lancer la lecture',
        'La page affiche une erreur',
        'Rien, les boutons apparaissent quand même'
      ],
      bonne: 1,
      explication: 'Sans <code>controls</code>, l\'élément audio existe mais n\'affiche RIEN. C\'est voulu : certains sites pilotent le son en JavaScript et dessinent leurs propres boutons.',
      aides: [
        'Le fichier se charge très bien — c\'est l\'interface visible qui dépend de controls.',
        '',
        'Aucune erreur : le HTML est valide, simplement invisible.',
        'Essaie dans l\'exercice 1 en retirant controls de la vidéo : les boutons disparaissent !'
      ]
    }
  ]
},

{
  id: 'html-10',
  titre: 'Attributs globaux et caractères spéciaux',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Jusqu'ici, chaque attribut appartenait à une balise précise : <code>href</code> au lien, <code>src</code> à l'image. Mais certains besoins ne dépendent pas de la balise — nommer un élément, le cacher, lui ajouter une infobulle. Ceux-là sont des <strong>attributs globaux</strong> : toutes les balises les acceptent, sans exception.</p>

<h2>La famille au complet</h2>
<ul>
<li><code>id="..."</code> — un nom <strong>unique</strong> dans la page. Sert d'ancre, et de cible au CSS et au JavaScript ;</li>
<li><code>class="..."</code> — une étiquette <strong>partageable</strong> : plusieurs éléments peuvent porter la même ;</li>
<li><code>title="..."</code> — une infobulle qui apparaît si la souris s'attarde ;</li>
<li><code>hidden</code> — cache complètement l'élément. Booléen, comme <code>controls</code> ;</li>
<li><code>lang="en"</code> — signale un passage dans une autre langue, pour que la synthèse vocale le prononce correctement ;</li>
<li><code>data-quelquechose="..."</code> — une information à toi, que le navigateur ignore mais que le JavaScript saura lire.</li>
</ul>
<pre class="bloc-code">&lt;p id="intro" class="important" title="Lis-moi d'abord"&gt;
  Bienvenue sur le site.
&lt;/p&gt;</pre>

<h2>Afficher un chevron sans ouvrir de balise</h2>
<p>Un problème se pose dès qu'on veut <em>montrer</em> du code HTML dans une page. Écris <code>&lt;p&gt;</code> dans ton texte et le navigateur l'interprète : il ouvre un paragraphe au lieu d'afficher les caractères.</p>
<p>La solution s'appelle une <strong>entité</strong> : un code qui commence par <code>&amp;</code> et finit par <code>;</code>. Les plus utiles sont <code>&amp;lt;</code> et <code>&amp;gt;</code> pour les deux chevrons, <code>&amp;amp;</code> pour l'esperluette, <code>&amp;nbsp;</code> pour une espace qui ne se coupe jamais en fin de ligne, et <code>&amp;copy;</code> pour le symbole du copyright.</p>
<p>C'est exactement ce que fait cette page pour t'afficher des balises sans les exécuter : tout le code que tu lis ici est écrit en entités.</p>

<h2>Pas à pas</h2>
<p>Deux lectures de la même intention, pour voir où ça bascule :</p>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Ce qu'il en fait</th></tr>
<tr><td>&lt;p&gt;La balise</td><td>Un paragraphe s'ouvre, puis du texte.</td></tr>
<tr><td>&lt;p&gt; (au milieu du texte)</td><td>Il n'affiche rien : il croit qu'un second paragraphe commence.</td></tr>
<tr><td>&amp;lt;</td><td>Une entité : il la remplace par le caractère, sans l'interpréter.</td></tr>
<tr><td>p</td><td>Une lettre ordinaire.</td></tr>
<tr><td>&amp;gt;</td><td>Le second chevron. À l'écran, le visiteur lit enfin la balise.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Réutiliser le même <code>id</code> deux fois.</strong> Un <code>id</code> doit être unique dans la page. Le navigateur ne proteste pas, mais tout ce qui le cherche — une ancre, un <code>label for</code>, du JavaScript — ne trouvera que le <em>premier</em>. Le second est ignoré, en silence. Si tu as besoin de nommer plusieurs éléments pareils, c'est <code>class</code> qu'il te faut.</p>
<p><strong>Oublier le point-virgule d'une entité.</strong> <code>&amp;lt</code> sans son <code>;</code> peut passer, ou s'afficher tel quel selon le contexte. Écris toujours les deux bouts.</p>
<p><strong>Croire que <code>hidden</code> protège quelque chose.</strong> L'élément disparaît de l'écran, mais il reste dans le code, visible par qui regarde la source. Ce n'est pas un coffre-fort : c'est un interrupteur d'affichage.</p>
<p><strong>Inventer un attribut.</strong> <code>couleur="rouge"</code> sur un paragraphe ne fait rien du tout : le navigateur le garde et l'ignore. Pour stocker une information à toi, le nom doit commencer par <code>data-</code> — c'est la seule forme prévue pour ça.</p>

<h2>Dans la vraie vie</h2>
<p>Les <code>data-</code> sont partout dans les sites modernes : <code>data-prix</code> sur un article, <code>data-id</code> sur une ligne de tableau. Le JavaScript lit ces valeurs pour savoir sur quoi on vient de cliquer, sans avoir à les redemander au serveur. Tu t'en serviras au module JavaScript avancé.</p>

<div class="a-retenir">
<ul>
<li>Les attributs globaux marchent sur <strong>toutes</strong> les balises : <code>id</code>, <code>class</code>, <code>title</code>, <code>hidden</code>, <code>lang</code>, <code>data-</code>.</li>
<li>Un <code>id</code> est unique dans la page ; une <code>class</code> se partage.</li>
<li>Les entités (<code>&amp;lt;</code>, <code>&amp;amp;</code>) affichent un caractère que le HTML prendrait sinon pour du code.</li>
<li>Un attribut inventé est ignoré sans erreur — sauf s'il commence par <code>data-</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi &amp;amp; et pas simplement &amp; ?</summary>
<p>Parce que l'esperluette ouvre justement une entité. Si tu écris « Dupont &amp; fils » tel quel, le navigateur lit <code>&amp; fils</code> et cherche une entité nommée « fils ». En pratique il se rattrape et affiche l'esperluette, mais le jour où ton texte contient <code>&amp;copy</code> au milieu d'une phrase, tu obtiendras un symbole de copyright surgi de nulle part. Écrire <code>&amp;amp;</code> supprime toute ambiguïté.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Un lexique interactif : ajoute à chaque mot technique un attribut <code>title</code> contenant sa définition — <code>HTML</code> → <code>Langage de structure des pages</code>, et <code>CSS</code> → <code>Langage d\'apparence</code>. Survole les mots dans l\'aperçu pour voir tes infobulles !',
      codeDepart: '<p>Pour faire un site, il faut du <strong>HTML</strong> et du <strong>CSS</strong>.</p>',
      indices: [
        "L’info-bulle ne se voit qu’au survol : elle n’est donc pas dans le texte, mais dans un attribut.",
        "<code>title</code> s’ajoute dans la balise <strong>ouvrante</strong>, comme n’importe quel attribut.",
        "<code>&lt;strong title=\"Langage de structure des pages\"&gt;HTML&lt;/strong&gt;</code>"
      ],
      solution: '<p>Pour faire un site, il faut du <strong title="Langage de structure des pages">HTML</strong> et du <strong title="Langage d\'apparence">CSS</strong>.</p>',
      verifier: function (ctx) {
        const strongs = ctx.doc.querySelectorAll('strong');
        if (strongs.length < 2) return { ok: false, message: 'Garde les deux mots en <code>&lt;strong&gt;</code>.' };
        const html = [...strongs].find(s => /HTML/.test(s.textContent));
        const css = [...strongs].find(s => /CSS/.test(s.textContent));
        if (!html || !/structure/i.test(html.getAttribute('title') || '')) return { ok: false, message: 'Le mot HTML doit avoir un <code>title</code> contenant sa définition (« Langage de structure des pages »).' };
        if (!css || !/apparence/i.test(css.getAttribute('title') || '')) return { ok: false, message: 'HTML est fait ! Même chose pour CSS : <code>title="Langage d\'apparence"</code>.' };
        return { ok: true, message: 'Survole les mots dans l\'aperçu (laisse la souris posée une seconde) : tes infobulles apparaissent. Zéro JavaScript nécessaire !' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : afficher du code sans l\'exécuter.</strong> Écris un paragraphe qui AFFICHE littéralement le texte <code>&lt;h1&gt;Bonjour&lt;/h1&gt;</code> à l\'écran (les chevrons visibles, sans créer de titre !). Il te faudra les entités <code>&amp;lt;</code> et <code>&amp;gt;</code>.',
      codeDepart: '<p>Pour faire un grand titre, on écrit : </p>',
      indices: [
        "Écrire un chevron tel quel créerait une vraie balise. Pour l’<em>afficher</em>, il faut le déguiser.",
        "Une entité HTML commence par <code>&amp;</code> et finit par <code>;</code>. Celles des chevrons s’appellent <code>lt</code> et <code>gt</code>.",
        "<code>&amp;lt;h1&amp;gt;Bonjour&amp;lt;/h1&amp;gt;</code>"
      ],
      solution: '<p>Pour faire un grand titre, on écrit : &lt;h1&gt;Bonjour&lt;/h1&gt;</p>',
      verifier: function (ctx) {
        if (ctx.doc.querySelector('h1')) return { ok: false, message: 'Oups : un VRAI titre h1 s\'est créé ! Les chevrons tapés directement forment une balise — remplace-les par les entités <code>&amp;lt;</code> et <code>&amp;gt;</code>.' };
        const p = ctx.doc.querySelector('p');
        if (!p) return { ok: false, message: 'Garde le paragraphe.' };
        if (!p.textContent.includes('<h1>') || !p.textContent.includes('</h1>')) return { ok: false, message: 'Le paragraphe doit AFFICHER le texte <code>&lt;h1&gt;Bonjour&lt;/h1&gt;</code> avec les chevrons visibles — via les entités.' };
        return { ok: true, message: 'C\'est exactement comme ça que toutes les leçons de ce logiciel te montrent du code. Boucle bouclée !' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi : les data-attributes.</strong> Une boutique en préparation : ajoute à chaque article un attribut <code>data-prix</code> avec sa valeur (pomme : <code>0.50</code>, pain : <code>1.20</code>) et un attribut <code>data-stock</code> (pomme : <code>12</code>, pain : <code>0</code>). Invisible à l\'écran, mais ton futur JavaScript pourra les lire !',
      codeDepart: '<ul>\n  <li>Pomme</li>\n  <li>Pain</li>\n</ul>',
      indices: [
        "On veut ranger de l’information sur un élément sans qu’elle s’affiche. HTML prévoit une famille d’attributs pour cela.",
        "Tout attribut commençant par <code>data-</code> est libre : tu choisis la suite du nom.",
        "<code>&lt;li data-prix=\"0.50\" data-stock=\"12\"&gt;Pomme&lt;/li&gt;</code>"
      ],
      solution: '<ul>\n  <li data-prix="0.50" data-stock="12">Pomme</li>\n  <li data-prix="1.20" data-stock="0">Pain</li>\n</ul>',
      verifier: function (ctx) {
        const lis = ctx.doc.querySelectorAll('li');
        if (lis.length < 2) return { ok: false, message: 'Garde les deux articles.' };
        const pomme = [...lis].find(l => /pomme/i.test(l.textContent));
        const pain = [...lis].find(l => /pain/i.test(l.textContent));
        if (!pomme || pomme.getAttribute('data-prix') !== '0.50') return { ok: false, message: 'La pomme doit avoir <code>data-prix="0.50"</code>.' };
        if (pomme.getAttribute('data-stock') !== '12') return { ok: false, message: 'Il manque <code>data-stock="12"</code> sur la pomme.' };
        if (!pain || pain.getAttribute('data-prix') !== '1.20' || pain.getAttribute('data-stock') !== '0') return { ok: false, message: 'Le pain doit avoir <code>data-prix="1.20"</code> et <code>data-stock="0"</code>.' };
        return { ok: true, message: 'Des données cachées dans le HTML : les sites de e-commerce font exactement ça pour que leurs scripts connaissent les prix et stocks.' };
      }
    }
  ]
},

{
  id: 'html-11',
  titre: 'Formulaires avancés : radio, required, bornes',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un formulaire qui accepte n'importe quoi crée du travail pour tout le monde : une date de naissance en 1850, un champ obligatoire laissé vide, un numéro écrit en lettres. On peut vérifier tout cela après coup, en JavaScript — ou demander au navigateur de le faire, gratuitement, avant même l'envoi.</p>
<p>C'est le rôle des attributs de cette leçon. Quelques mots dans le HTML, et le formulaire se défend tout seul.</p>

<h2>Les boutons radio : un seul choix</h2>
<pre class="bloc-code">&lt;input type="radio" name="cuisson" value="saignant" id="c1"&gt;
&lt;label for="c1"&gt;Saignant&lt;/label&gt;

&lt;input type="radio" name="cuisson" value="apoint" id="c2"&gt;
&lt;label for="c2"&gt;À point&lt;/label&gt;</pre>
<p>Le point décisif est le <code>name</code>, <strong>identique sur tout le groupe</strong>. C'est lui, et lui seul, qui dit au navigateur « ces boutons vont ensemble : en cocher un décoche l'autre ».</p>
<p>Et le <code>value</code> ? Le texte du <code>&lt;label&gt;</code> est ce que lit l'humain ; le <code>value</code> est ce qui part vers le serveur. Sans lui, le serveur reçoit un choix sans savoir lequel.</p>

<h2>Borner les saisies</h2>
<ul>
<li><code>required</code> — le champ doit être rempli. Booléen ;</li>
<li><code>min</code> et <code>max</code> — les bornes d'un nombre ou d'une date ;</li>
<li><code>maxlength</code> — le nombre maximal de caractères ;</li>
<li><code>pattern="[0-9]{5}"</code> — une forme exacte à respecter, ici cinq chiffres.</li>
</ul>
<pre class="bloc-code">&lt;input type="number" name="places" min="1" max="8" required&gt;</pre>

<h2>Pas à pas</h2>
<p>Ce qui se passe quand on clique sur le second bouton radio, après avoir coché le premier :</p>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>Clic sur « Saignant »</td><td>Il se coche. Le groupe « cuisson » vaut maintenant « saignant ».</td></tr>
<tr><td>Clic sur « À point »</td><td>Le navigateur cherche les autres boutons de même <code>name</code>…</td></tr>
<tr><td>…</td><td>…les décoche tous, puis coche celui-ci.</td></tr>
<tr><td>Envoi du formulaire</td><td>Un seul couple part : <code>cuisson = apoint</code>.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Un <code>name</code> différent sur chaque bouton radio.</strong> C'est l'erreur qui donne le symptôme le plus déroutant : les boutons se cochent <em>tous</em>, et aucun ne décoche les autres. Rien n'est signalé, puisque chacun est valide tout seul — ils forment simplement trois groupes d'un bouton chacun. Même <code>name</code> partout, <code>value</code> différent : c'est l'inverse de l'intuition, et c'est la règle.</p>
<p><strong>Confondre case à cocher et bouton radio.</strong> Un <code>checkbox</code> sert à « zéro, un ou plusieurs choix » ; un <code>radio</code> à « exactement un ». Si l'utilisateur doit pouvoir en cocher deux, le radio est le mauvais outil.</p>
<p><strong>Croire que ces attributs sécurisent quoi que ce soit.</strong> Ils rendent service à l'utilisateur, en l'avertissant tout de suite. Mais ils vivent dans la page, donc ils se contournent en quelques secondes. Un serveur sérieux revérifie <em>tout</em> ce qu'il reçoit. Côté page, c'est du confort ; côté serveur, c'est de la sécurité.</p>

<h2>Dans la vraie vie</h2>
<p>Le message rouge « Veuillez renseigner ce champ » que tu as sûrement déjà vu vient de <code>required</code> : c'est le navigateur qui le produit, dans la langue du visiteur, sans une ligne de code. Les bornes <code>min</code> et <code>max</code> sur une date, elles, désactivent directement les jours impossibles dans le calendrier.</p>

<div class="a-retenir">
<ul>
<li>Des boutons radio forment un groupe par leur <code>name</code> identique ; leur <code>value</code>, lui, les distingue.</li>
<li><code>required</code>, <code>min</code>, <code>max</code>, <code>maxlength</code>, <code>pattern</code> : le navigateur vérifie avant l'envoi.</li>
<li>Case à cocher pour plusieurs choix, radio pour un seul.</li>
<li>Ces contrôles aident l'utilisateur, ils ne protègent pas le serveur.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : ce que dit vraiment pattern</summary>
<p><code>pattern="[0-9]{5}"</code> est une <strong>expression régulière</strong> : <code>[0-9]</code> veut dire « un chiffre », et <code>{5}</code> « cinq fois ». C'est un petit langage à part entière, qu'on retrouve en JavaScript, en Python et dans à peu près tous les langages. Tu le croiseras plus tard ; retiens pour l'instant qu'un motif décrit une <em>forme</em> de texte, pas un texte précis.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le choix de la cuisson : crée un groupe de <strong>trois</strong> boutons radio (<code>Saignant</code>, <code>À point</code>, <code>Bien cuit</code>) partageant le <code>name="cuisson"</code>, chacun avec un <code>value</code> différent et suivi de son <code>&lt;label&gt;</code>. Teste dans l\'aperçu : un seul doit être cochable à la fois !',
      codeDepart: '<h2>Votre cuisson ?</h2>\n',
      indices: [
        "Trois boutons, mais un seul choix possible : ce qui les rend exclusifs n’est pas leur type, c’est autre chose.",
        "C’est le <code>name</code> <strong>identique</strong> qui les regroupe. Le <code>value</code>, lui, diffère pour chacun.",
        "<code>&lt;input type=\"radio\" name=\"cuisson\" value=\"saignant\"&gt;</code>, trois fois avec le même <code>name</code>."
      ],
      solution: '<h2>Votre cuisson ?</h2>\n<input type="radio" name="cuisson" value="saignant"> <label>Saignant</label>\n<input type="radio" name="cuisson" value="apoint"> <label>À point</label>\n<input type="radio" name="cuisson" value="biencuit"> <label>Bien cuit</label>',
      verifier: function (ctx) {
        const radios = ctx.doc.querySelectorAll('input[type="radio"]');
        if (radios.length < 3) return { ok: false, message: 'Il faut trois boutons radio (tu en as ' + radios.length + ').' };
        const names = new Set([...radios].map(r => r.getAttribute('name')));
        if (names.size !== 1 || names.has(null) || names.has('')) return { ok: false, message: 'Les trois radios doivent partager EXACTEMENT le même <code>name="cuisson"</code> — sinon ce sont des groupes séparés et on peut tout cocher !' };
        const values = new Set([...radios].map(r => r.getAttribute('value') || ''));
        if (values.size < 3 || values.has('')) return { ok: false, message: 'Chaque radio doit avoir son propre <code>value</code> (trois valeurs différentes).' };
        if (ctx.doc.querySelectorAll('label').length < 3) return { ok: false, message: 'Chaque bouton doit être suivi de son <code>&lt;label&gt;</code>.' };
        radios[0].click();
        radios[1].click();
        if (radios[0].checked && radios[1].checked) return { ok: false, message: 'J\'ai coché deux boutons et les deux restent cochés — le groupe n\'est pas lié. Vérifie le name commun.' };
        return { ok: true, message: 'Un seul choix possible, garanti par le navigateur : c\'est toute la magie du name partagé.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : borner les saisies.</strong> Ce formulaire de réservation accepte n\'importe quoi. Verrouille-le : le champ nom devient <code>required</code> avec <code>maxlength="30"</code> ; le nombre de personnes reçoit <code>min="1"</code>, <code>max="8"</code> et <code>required</code>.',
      codeDepart: '<h2>Réserver une table</h2>\n<label>Nom :</label>\n<input type="text" id="nom">\n<label>Personnes :</label>\n<input type="number" id="nb">\n<button>Réserver</button>',
      indices: [
        "Le navigateur sait valider un formulaire tout seul, pour peu qu’on lui dise quoi exiger.",
        "<code>required</code> rend le champ obligatoire ; <code>maxlength</code> limite le nombre de caractères. Tous deux dans la balise ouvrante.",
        "<code>&lt;input type=\"text\" id=\"nom\" required maxlength=\"30\"&gt;</code>"
      ],
      solution: '<h2>Réserver une table</h2>\n<label>Nom :</label>\n<input type="text" id="nom" required maxlength="30">\n<label>Personnes :</label>\n<input type="number" id="nb" min="1" max="8" required>\n<button>Réserver</button>',
      verifier: function (ctx) {
        const nom = ctx.doc.querySelector('#nom');
        const nb = ctx.doc.querySelector('#nb');
        if (!nom || !nb) return { ok: false, message: 'Garde les deux champs #nom et #nb.' };
        if (!nom.hasAttribute('required')) return { ok: false, message: 'Le nom doit être obligatoire : ajoute <code>required</code> (attribut seul, sans valeur).' };
        if (nom.getAttribute('maxlength') !== '30') return { ok: false, message: 'Limite le nom à 30 caractères : <code>maxlength="30"</code>.' };
        if (nb.getAttribute('min') !== '1' || nb.getAttribute('max') !== '8') return { ok: false, message: 'Le nombre de personnes doit être borné : <code>min="1" max="8"</code>.' };
        if (!nb.hasAttribute('required')) return { ok: false, message: 'Presque : le nombre de personnes doit aussi être <code>required</code>.' };
        return { ok: true, message: 'Quatre attributs, zéro JavaScript, et le formulaire refuse déjà les réservations absurdes. La validation HTML est ton amie.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Deux boutons radio ont <code>name="choixA"</code> et <code>name="choixB"</code>. Que se passe-t-il ?',
      choix: [
        'Un seul des deux peut être coché, comme d\'habitude',
        'Les deux peuvent être cochés en même temps : ce sont deux groupes différents',
        'Le navigateur affiche une erreur',
        'Le deuxième bouton est ignoré'
      ],
      bonne: 1,
      explication: 'Le lien entre radios passe UNIQUEMENT par le name partagé. Deux names = deux groupes d\'un bouton chacun, tous cochables. C\'est LE bug classique des formulaires débutants.',
      aides: [
        'C\'est le name IDENTIQUE qui crée l\'exclusivité — ici ils sont différents...',
        '',
        'Aucune erreur : le HTML est valide, il fait juste autre chose que prévu (le pire genre de bug !).',
        'Les deux boutons existent et fonctionnent — mais indépendamment.'
      ]
    }
  ]
},

{
  id: 'html-12',
  titre: 'Sémantique avancée : article, section, figure',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu sais déjà poser les grandes zones d'une page : <code>header</code>, <code>main</code>, <code>footer</code>. Mais à l'intérieur du contenu principal, tout retombe vite en <code>&lt;div&gt;</code> — des boîtes qui ne disent rien de ce qu'elles contiennent.</p>
<p>Le problème n'est pas esthétique. Un lecteur d'écran, un moteur de recherche, le mode lecture d'un navigateur : tous essaient de deviner quel bloc est l'article et lequel est la décoration. Face à dix <code>&lt;div&gt;</code> identiques, ils ne peuvent que deviner. Les balises de cette leçon leur donnent la réponse.</p>

<h2>Article ou section ?</h2>
<ul>
<li><code>&lt;article&gt;</code> — un contenu <strong>autonome</strong>, qui garderait du sens si on le sortait de la page : un billet de blog, une fiche produit, un commentaire ;</li>
<li><code>&lt;section&gt;</code> — un <strong>regroupement thématique</strong> à l'intérieur d'un ensemble, qui n'a pas de sens tout seul : le chapitre « Ingrédients » d'une recette ;</li>
<li><code>&lt;aside&gt;</code> — ce qui est <strong>à côté</strong> du sujet : un encadré, une publicité, des liens connexes.</li>
</ul>
<p>Le test qui tranche presque toujours : <em>est-ce que ce bloc, publié seul dans un flux d'actualités, voudrait encore dire quelque chose ?</em> Si oui, c'est un <code>article</code>. Sinon, une <code>section</code>.</p>

<h2>Une image avec sa légende</h2>
<pre class="bloc-code">&lt;figure&gt;
  &lt;img src="graphique.png" alt="Ventes en hausse de 12 % sur un an"&gt;
  &lt;figcaption&gt;Évolution des ventes en 2026&lt;/figcaption&gt;
&lt;/figure&gt;</pre>
<p><code>&lt;figure&gt;</code> lie une illustration à sa <code>&lt;figcaption&gt;</code> : les deux forment un bloc, et le lecteur d'écran les annonce ensemble. Attention à ne pas confondre les deux textes — le <code>alt</code> <em>décrit</em> l'image à qui ne la voit pas, la légende la <em>commente</em> pour tout le monde. Ils ne disent pas la même chose, et répéter l'un dans l'autre fait entendre la phrase deux fois.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Ce qu'un lecteur d'écran en fait</th></tr>
<tr><td>&lt;article&gt;</td><td>« Article. » La personne sait qu'un contenu autonome commence.</td></tr>
<tr><td>&lt;h2&gt;Titre&lt;/h2&gt;</td><td>Le titre de cet article, atteignable directement.</td></tr>
<tr><td>&lt;figure&gt;</td><td>« Figure. » Image et légende seront annoncées ensemble.</td></tr>
<tr><td>&lt;aside&gt;</td><td>« Complémentaire. » La personne peut choisir de sauter ce bloc.</td></tr>
<tr><td>&lt;/article&gt;</td><td>Fin de l'article.</td></tr>
</table>
<p>Avec des <code>&lt;div&gt;</code> à la place, tout ce tableau disparaît : le lecteur d'écran lit une suite de textes, sans jamais pouvoir annoncer où l'on se trouve.</p>

<h2>Les pièges</h2>
<p><strong>Prendre <code>&lt;section&gt;</code> pour un <code>&lt;div&gt;</code> plus joli.</strong> Une <code>section</code> doit avoir un titre : si tu n'arrives pas à lui en donner un, c'est qu'elle n'en est pas une, et qu'un <code>div</code> convient mieux. Un <code>div</code> n'est pas une faute — c'est le bon outil quand le bloc n'existe que pour la mise en page.</p>
<p><strong>Imbriquer <code>&lt;main&gt;</code> plusieurs fois.</strong> Il n'y a qu'un contenu principal par page, donc un seul <code>&lt;main&gt;</code>. C'est lui que vise le raccourci « aller au contenu » des lecteurs d'écran ; en mettre deux brouille ce repère.</p>
<p><strong>Oublier que <code>&lt;figure&gt;</code> a déjà des marges.</strong> Par défaut, le navigateur lui applique un retrait de 40 pixels à gauche, hérité d'une époque où les figures s'encadraient ainsi. Ta légende paraîtra décalée sans raison apparente — c'est normal, et le CSS le remettra d'aplomb au module suivant.</p>

<h2>Dans la vraie vie</h2>
<p>Le mode lecture de ton navigateur — celui qui enlève la publicité et ne garde que le texte — fonctionne en cherchant précisément ces balises. Une page bien balisée s'y affiche parfaitement ; une page en <code>&lt;div&gt;</code> y perd la moitié de son contenu, ou refuse de s'ouvrir.</p>

<div class="a-retenir">
<ul>
<li><code>&lt;article&gt;</code> si le bloc tient debout tout seul, <code>&lt;section&gt;</code> s'il fait partie d'un ensemble, <code>&lt;aside&gt;</code> s'il est à côté du sujet.</li>
<li>Une <code>section</code> sans titre possible est probablement un <code>div</code>.</li>
<li><code>&lt;figure&gt;</code> et <code>&lt;figcaption&gt;</code> lient une illustration à sa légende — qui ne répète pas le <code>alt</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : ces balises changent-elles l'apparence ?</summary>
<p>Presque pas, et c'est voulu. <code>article</code>, <code>section</code> et <code>aside</code> s'affichent exactement comme des <code>div</code> : des blocs empilés. Seule <code>figure</code> se distingue, par ses marges. Tout le bénéfice est invisible — il va aux machines qui lisent ta page. C'est sans doute ce qui rend ces balises si faciles à négliger : rien ne se casse quand on les oublie.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Une photo bien présentée : enveloppe l\'image fournie dans une balise <code>&lt;figure&gt;</code> et ajoute-lui une légende <code>&lt;figcaption&gt;</code> avec le texte de ton choix.',
      codeDepart: '<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'120\'%3E%3Crect width=\'200\' height=\'120\' fill=\'%232a9d8f\'/%3E%3Ccircle cx=\'160\' cy=\'30\' r=\'18\' fill=\'%23e9c46a\'/%3E%3C/svg%3E" alt="Un paysage vert avec un soleil">',
      indices: [
        "Une légende n’est pas un paragraphe ordinaire : elle est <strong>liée</strong> à l’image, et HTML sait exprimer ce lien.",
        "Le <code>&lt;figure&gt;</code> enveloppe l’ensemble ; le <code>&lt;figcaption&gt;</code> porte la légende, à l’intérieur.",
        "<code>&lt;figure&gt;</code>, puis l’image, puis <code>&lt;figcaption&gt;</code>Ma légende<code>&lt;/figcaption&gt;</code>, puis <code>&lt;/figure&gt;</code>."
      ],
      solution: '<figure>\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'120\'%3E%3Crect width=\'200\' height=\'120\' fill=\'%232a9d8f\'/%3E%3Ccircle cx=\'160\' cy=\'30\' r=\'18\' fill=\'%23e9c46a\'/%3E%3C/svg%3E" alt="Un paysage vert avec un soleil">\n  <figcaption>Prairie au soleil couchant, aquarelle numérique.</figcaption>\n</figure>',
      verifier: function (ctx) {
        const figure = ctx.doc.querySelector('figure');
        if (!figure) return { ok: false, message: 'Il manque la balise <code>&lt;figure&gt;</code> autour de l\'image.' };
        if (!figure.querySelector('img')) return { ok: false, message: 'L\'image doit être À L\'INTÉRIEUR de la figure.' };
        const cap = figure.querySelector('figcaption');
        if (!cap || !cap.textContent.trim()) return { ok: false, message: 'Ajoute la légende : <code>&lt;figcaption&gt;...&lt;/figcaption&gt;</code> dans la figure, avec du texte.' };
        return { ok: true, message: 'Image + légende officiellement liées : les moteurs de recherche adorent, les lecteurs d\'écran aussi.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : le blog structuré.</strong> Transforme cette soupe de div en HTML sémantique : le premier bloc (l\'article du jour) devient un <code>&lt;article&gt;</code>, le deuxième (le saviez-vous) devient un <code>&lt;aside&gt;</code>. Garde tout le contenu intérieur !',
      codeDepart: '<div>\n  <h2>Pourquoi le ciel est bleu</h2>\n  <p>La lumière du soleil se disperse dans l\'atmosphère...</p>\n</div>\n\n<div>\n  <h3>Le saviez-vous ?</h3>\n  <p>Sur Mars, le coucher de soleil est bleu !</p>\n</div>',
      indices: [
        "Une <code>&lt;div&gt;</code> ne veut rien dire : c’est une boîte neutre. Les balises sémantiques, elles, annoncent un rôle.",
        "Le contenu autonome devient un <code>&lt;article&gt;</code>, le contenu secondaire un <code>&lt;aside&gt;</code>, le pied de page un <code>&lt;footer&gt;</code>.",
        "Remplace chaque <code>&lt;div&gt;</code> et sa fermante par la balise correspondante."
      ],
      solution: '<article>\n  <h2>Pourquoi le ciel est bleu</h2>\n  <p>La lumière du soleil se disperse dans l\'atmosphère...</p>\n</article>\n\n<aside>\n  <h3>Le saviez-vous ?</h3>\n  <p>Sur Mars, le coucher de soleil est bleu !</p>\n</aside>',
      verifier: function (ctx) {
        const article = ctx.doc.querySelector('article');
        if (!article || !article.querySelector('h2')) return { ok: false, message: 'Le bloc de l\'article (avec son h2) doit devenir une balise <code>&lt;article&gt;</code>.' };
        const aside = ctx.doc.querySelector('aside');
        if (!aside || !/saviez/i.test(aside.textContent)) return { ok: false, message: 'L\'encart « Le saviez-vous ? » doit devenir un <code>&lt;aside&gt;</code>.' };
        if (ctx.doc.querySelector('div')) return { ok: false, message: 'Il reste un <code>&lt;div&gt;</code> — remplace bien les balises ouvrantes ET fermantes.' };
        return { ok: true, message: 'Visuellement identique, sémantiquement transformé : un robot comprend maintenant TA page — « un article autonome, un encart annexe ».' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Un commentaire posté sous un article de blog : quelle balise le représente le mieux ?',
      choix: [
        '<code>&lt;section&gt;</code> — c\'est une partie de la page',
        '<code>&lt;article&gt;</code> — c\'est un contenu autonome qui a du sens tout seul',
        '<code>&lt;aside&gt;</code> — c\'est secondaire',
        '<code>&lt;figure&gt;</code> — il illustre l\'article'
      ],
      bonne: 1,
      explication: 'Surprenant mais officiel : un commentaire est un contenu autonome (auteur, date, texte — publiable seul) → <code>&lt;article&gt;</code>, même imbriqué dans un autre article ! Le test « aurait-il du sens tout seul ? » prime.',
      aides: [
        'Une section est un CHAPITRE de la page. Un commentaire, lui, se suffit à lui-même...',
        '',
        'Secondaire peut-être, mais surtout AUTONOME : il a un auteur, une date, un contenu complet.',
        'figure est réservée aux illustrations (images, schémas, extraits de code) avec légende.'
      ]
    }
  ]
},

{
  id: 'html-13',
  titre: 'Ancres et navigation dans la page',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Sur une page longue — une documentation, un article de fond, une FAQ — le visiteur ne cherche pas tout : il cherche <em>un</em> passage. Lui demander de faire défiler trois écrans pour le trouver, c'est le perdre.</p>
<p>Un lien n'est pas obligé de mener à une autre page. Il peut mener à un endroit précis de celle qu'on lit déjà.</p>

<h2>Le dièse</h2>
<pre class="bloc-code">&lt;a href="#recettes"&gt;Aller aux recettes&lt;/a&gt;

... beaucoup de contenu ...

&lt;h2 id="recettes"&gt;Les recettes&lt;/h2&gt;</pre>
<p>Deux moitiés, qui doivent correspondre exactement :</p>
<ul>
<li>la cible porte un <code>id</code> — un nom unique dans la page ;</li>
<li>le lien reprend ce nom, précédé d'un <strong>dièse</strong>.</li>
</ul>
<p>Au clic, la page défile jusqu'à l'élément, et l'adresse dans la barre du navigateur gagne <code>#recettes</code> à la fin. Cette adresse devient partageable : envoyée à quelqu'un, elle ouvre la page <em>à cet endroit</em>.</p>
<p>Deux cas particuliers méritent d'être connus : <code>href="#"</code> seul remonte en haut de la page, et <code>href="#top"</code> fait la même chose.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>Clic sur le lien</td><td>Le navigateur lit <code>#recettes</code> et ne charge aucune page.</td></tr>
<tr><td>Recherche</td><td>Il cherche dans la page un élément dont l'<code>id</code> vaut « recettes ».</td></tr>
<tr><td>Trouvé</td><td>Il fait défiler jusqu'à lui, qui se retrouve en haut de l'écran.</td></tr>
<tr><td>Adresse</td><td>La barre affiche maintenant la page suivie de <code>#recettes</code>.</td></tr>
<tr><td>Introuvable</td><td>Il ne se passe rien. Aucun message, aucune erreur.</td></tr>
</table>

<h2>Ouvrir ailleurs, et le faire proprement</h2>
<p>L'attribut <code>target="_blank"</code> ouvre un lien dans un nouvel onglet. Il s'accompagne d'une précaution :</p>
<pre class="bloc-code">&lt;a href="https://exemple.com" target="_blank" rel="noopener"&gt;
  Le site d'exemple
&lt;/a&gt;</pre>
<p>Sans <code>rel="noopener"</code>, la page ouverte reçoit une poignée vers la tienne et peut, en une ligne de JavaScript, la remplacer par une fausse page de connexion. Le visiteur revient sur son onglet d'origine et ne voit pas la différence. Les navigateurs récents ajoutent la protection d'eux-mêmes, mais l'écrire ne coûte rien et ne dépend de personne.</p>

<h2>Les pièges</h2>
<p><strong>Mettre le dièse dans l'<code>id</code>.</strong> La cible s'écrit <code>id="recettes"</code>, sans dièse ; seul le lien en porte un. L'erreur inverse est tout aussi fréquente : oublier le dièse dans le <code>href</code>, auquel cas le navigateur cherche un <em>fichier</em> nommé « recettes » et tombe sur une page introuvable.</p>
<p><strong>Une cible qui n'existe pas.</strong> Un <code>id</code> mal orthographié ne provoque rien : le clic ne fait rien du tout, en silence. Si un lien d'ancre reste sans effet, compare les deux orthographes lettre à lettre — majuscules comprises, car elles comptent ici.</p>
<p><strong>Abuser de <code>target="_blank"</code>.</strong> Chaque nouvel onglet retire au visiteur son bouton « Retour ». Réserve-le aux cas où quitter la page ferait perdre quelque chose : un formulaire à moitié rempli, une vidéo en cours.</p>

<h2>Dans la vraie vie</h2>
<p>Le sommaire d'une page de documentation, les questions cliquables d'une FAQ, le bouton « Retour en haut » d'un long article : tous sont des ancres. C'est aussi ce qui permet de pointer un paragraphe précis dans un message — l'adresse avec son dièse suffit.</p>

<div class="a-retenir">
<ul>
<li>Une ancre relie un <code>href="#nom"</code> à un élément portant <code>id="nom"</code> — dièse d'un seul côté.</li>
<li>L'adresse obtenue est partageable : elle rouvre la page au bon endroit.</li>
<li>Une cible absente ne provoque aucune erreur : le clic ne fait rien.</li>
<li><code>target="_blank"</code> s'accompagne de <code>rel="noopener"</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le défilement en douceur</summary>
<p>Par défaut, le saut est instantané — on se retrouve ailleurs sans avoir vu le trajet, ce qui est désorientant sur une page longue. Une seule ligne de CSS, <code>scroll-behavior: smooth</code>, transforme le saut en glissement. Tu la découvriras au module CSS ; retiens surtout que ce confort existe et qu'il tient en un mot.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée une ancre : en haut, un lien <code>Voir la conclusion</code> qui pointe vers <code>#conclusion</code> ; en bas (après les paragraphes), un titre <code>&lt;h2&gt;</code> avec <code>id="conclusion"</code>. Clique sur le lien dans l\'aperçu : ça saute !',
      codeDepart: '<h1>Mon grand dossier</h1>\n\n\n<p>Beaucoup de contenu...</p>\n<p>Encore du contenu...</p>\n<p>Toujours du contenu...</p>\n\n',
      indices: [
        "Un lien peut viser un endroit de la <em>même</em> page. Il faut alors une cible identifiée.",
        "Le <code>href</code> commence par un <code>#</code> suivi du nom. Ce nom doit correspondre à l’<code>id</code> de l’élément visé.",
        "<code>&lt;a href=\"#conclusion\"&gt;…&lt;/a&gt;</code> en haut, et <code>&lt;h2 id=\"conclusion\"&gt;</code> en bas."
      ],
      solution: '<h1>Mon grand dossier</h1>\n<a href="#conclusion">Voir la conclusion</a>\n\n<p>Beaucoup de contenu...</p>\n<p>Encore du contenu...</p>\n<p>Toujours du contenu...</p>\n\n<h2 id="conclusion">Conclusion</h2>',
      verifier: function (ctx) {
        const a = ctx.doc.querySelector('a[href^="#"]');
        if (!a) return { ok: false, message: 'Il manque le lien dont le href commence par <code>#</code> : <code>&lt;a href="#conclusion"&gt;</code>.' };
        if (a.getAttribute('href') !== '#conclusion') return { ok: false, message: 'Le lien doit pointer exactement vers <code>#conclusion</code>.' };
        const cible = ctx.doc.querySelector('#conclusion');
        if (!cible) return { ok: false, message: 'Le lien est prêt, mais sa cible n\'existe pas : ajoute <code>id="conclusion"</code> au titre en bas (sans le # — le dièse ne sert que dans le lien !).' };
        if (cible.tagName !== 'H2') return { ok: false, message: 'La cible doit être un <code>&lt;h2&gt;</code>.' };
        return { ok: true, message: 'Le duo href="#nom" / id="nom" : la téléportation interne du web. Les adresses de ce logiciel (#html-13...) marchent pareil !' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement : le sommaire complet.</strong> Construis une mini-page documentée : un sommaire (liste <code>&lt;ul&gt;</code> de 2 liens ancres) qui pointe vers 2 sections <code>&lt;h2&gt;</code> (<code>id="partie1"</code> et <code>id="partie2"</code>), et tout en bas un lien <code>Retour en haut</code> vers <code>id="haut"</code> posé sur le h1.',
      codeDepart: '<h1>Guide du potager</h1>\n\n<!-- le sommaire ici -->\n\n<!-- les 2 sections ici -->\n\n<!-- le retour en haut ici -->',
      indices: [
        "Un sommaire, ce sont plusieurs ancres à la fois — et un retour vers le haut, qui a lui aussi besoin de sa cible.",
        "Chaque entrée du sommaire pointe vers un <code>id</code> différent. Le h1 lui-même en reçoit un, pour servir de destination au « retour ».",
        "<code>id=\"haut\"</code> sur le h1, puis un <code>&lt;ul&gt;</code> de liens en <code>#partie1</code>, <code>#partie2</code>…"
      ],
      solution: '<h1 id="haut">Guide du potager</h1>\n\n<ul>\n  <li><a href="#partie1">Semer</a></li>\n  <li><a href="#partie2">Récolter</a></li>\n</ul>\n\n<h2 id="partie1">Semer</h2>\n<p>Tout commence par une graine.</p>\n\n<h2 id="partie2">Récolter</h2>\n<p>La récompense de la patience.</p>\n\n<a href="#haut">Retour en haut</a>',
      verifier: function (ctx) {
        const liens = ctx.doc.querySelectorAll('ul li a[href^="#"]');
        if (liens.length < 2) return { ok: false, message: 'Le sommaire doit être une liste <code>&lt;ul&gt;</code> contenant 2 liens ancres.' };
        for (const a of liens) {
          const id = (a.getAttribute('href') || '').slice(1);
          if (!ctx.doc.getElementById(id)) return { ok: false, message: 'Le lien du sommaire <code>' + a.getAttribute('href') + '</code> ne mène nulle part : sa cible avec cet id n\'existe pas.' };
        }
        if (!ctx.doc.querySelector('h1#haut')) return { ok: false, message: 'Le h1 doit porter <code>id="haut"</code> pour servir de cible au retour.' };
        const retour = [...ctx.doc.querySelectorAll('a')].find(a => a.getAttribute('href') === '#haut');
        if (!retour) return { ok: false, message: 'Il manque le lien <code>Retour en haut</code> pointant vers <code>#haut</code>, en bas de page.' };
        return { ok: true, message: 'Sommaire + ancres + retour en haut : le kit de navigation de toutes les pages de documentation.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi sécurité.</strong> Ces trois liens externes s\'ouvrent dans l\'onglet courant (le visiteur quitte le site !) : ajoute à CHACUN le duo <code>target="_blank"</code> + <code>rel="noopener"</code>.',
      codeDepart: '<h2>Nos partenaires</h2>\n<ul>\n  <li><a href="https://exemple-a.com">Partenaire A</a></li>\n  <li><a href="https://exemple-b.com">Partenaire B</a></li>\n  <li><a href="https://exemple-c.com">Partenaire C</a></li>\n</ul>',
      indices: [
        "Ouvrir dans un nouvel onglet ne suffit pas : cela ouvre aussi une faille, car la page appelée garde un lien vers la tienne.",
        "<code>target=\"_blank\"</code> ouvre l’onglet ; <code>rel=\"noopener\"</code> coupe ce lien de retour. Les deux vont ensemble.",
        "<code>&lt;a href=\"https://…\" target=\"_blank\" rel=\"noopener\"&gt;</code>"
      ],
      solution: '<h2>Nos partenaires</h2>\n<ul>\n  <li><a href="https://exemple-a.com" target="_blank" rel="noopener">Partenaire A</a></li>\n  <li><a href="https://exemple-b.com" target="_blank" rel="noopener">Partenaire B</a></li>\n  <li><a href="https://exemple-c.com" target="_blank" rel="noopener">Partenaire C</a></li>\n</ul>',
      verifier: function (ctx) {
        const liens = ctx.doc.querySelectorAll('a[href^="https"]');
        if (liens.length < 3) return { ok: false, message: 'Garde les trois liens partenaires.' };
        for (const a of liens) {
          if (a.getAttribute('target') !== '_blank') return { ok: false, message: 'Le lien « ' + a.textContent.trim() + ' » n\'a pas <code>target="_blank"</code>.' };
          if (!/noopener/.test(a.getAttribute('rel') || '')) return { ok: false, message: 'Le lien « ' + a.textContent.trim() + ' » a le target mais pas son garde du corps : <code>rel="noopener"</code>.' };
        }
        return { ok: true, message: 'Nouvel onglet + sécurité : le réflexe est acquis. Petit détail qui fait la différence en entretien technique, vraiment.' };
      }
    }
  ]
},

{
  id: 'html-14',
  titre: 'Le head : métadonnées et référencement',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Le <code>&lt;head&gt;</code> ne s'affiche pas, alors il est tentant de le bâcler. C'est pourtant la seule partie de ta page que lisent des <em>machines</em> : le moteur de recherche qui décide à quelle place te mettre, le téléphone qui choisit comment afficher la page, le réseau social qui fabrique l'aperçu quand on colle ton lien.</p>
<p>Un contenu excellent dans un <code>head</code> vide reste invisible. Ces quelques lignes décident de qui te trouvera.</p>

<h2>Les quatre lignes indispensables</h2>
<pre class="bloc-code">&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Recettes de saison — Chez Camille&lt;/title&gt;
  &lt;meta name="description" content="Trente recettes simples, classées par mois."&gt;
&lt;/head&gt;</pre>
<ul>
<li><code>charset</code> — l'alphabet. Sans lui, les accents partent en symboles ;</li>
<li><code>viewport</code> — dit au téléphone « adapte-toi à ma largeur d'écran » ;</li>
<li><code>title</code> — le titre de l'onglet, du favori, <strong>et</strong> la ligne bleue cliquable dans les résultats de recherche ;</li>
<li><code>description</code> — le petit texte gris sous cette ligne bleue.</li>
</ul>
<p>Le <code>title</code> est le plus exposé des quatre : c'est, littéralement, ce sur quoi les gens cliquent. Écris-le comme un titre d'article, pas comme un nom de fichier.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Qui lit</th><th>Ce qu'il en retient</th></tr>
<tr><td>Le navigateur</td><td><code>charset</code> pour décoder le texte, <code>title</code> pour l'onglet.</td></tr>
<tr><td>Le téléphone</td><td><code>viewport</code> : il affiche la page à la largeur de l'écran plutôt que de la miniaturiser.</td></tr>
<tr><td>Le moteur de recherche</td><td><code>title</code> et <code>description</code> pour composer son résultat.</td></tr>
<tr><td>Le visiteur</td><td>Rien de tout cela — aucune de ces lignes n'apparaît dans la page.</td></tr>
</table>

<h2>Le viewport, ou la page miniature</h2>
<p>C'est la ligne dont l'oubli se voit le plus. Sans elle, un téléphone suppose que ta page a été conçue pour un écran d'ordinateur : il l'affiche en entier, miniaturisée, et le visiteur doit zoomer pour lire quoi que ce soit. Avec elle, la page occupe la largeur réelle de l'écran.</p>
<p>Si l'on te dit un jour « ton site est illisible sur mobile », c'est la première ligne à vérifier — avant même de toucher au CSS.</p>

<h2>Les pièges</h2>
<p><strong>Confondre <code>&lt;title&gt;</code> et <code>&lt;h1&gt;</code>.</strong> Le premier vit dans le <code>head</code> et nomme l'onglet ; le second vit dans le <code>body</code> et s'affiche. Une page sérieuse a les deux, souvent proches mais rarement identiques : le <code>title</code> peut porter le nom du site en plus, utile dans une liste de résultats.</p>
<p><strong>Deux <code>&lt;h1&gt;</code> sur la même page.</strong> Le sommaire devient ambigu : quel est le sujet de la page ? Un seul <code>h1</code>, et les sections en <code>h2</code>.</p>
<p><strong>Une description recopiée sur toutes les pages.</strong> Elle est censée décrire <em>cette</em> page. Identique partout, elle n'aide ni le visiteur à choisir, ni le moteur à distinguer tes pages entre elles.</p>
<p><strong>Oublier <code>charset</code>.</strong> Le navigateur doit alors deviner l'alphabet, et il devine parfois mal : les accents deviennent des suites de symboles. C'est la première ligne du <code>head</code>, et elle doit le rester.</p>

<h2>Dans la vraie vie</h2>
<p>Tout ce que tu vois dans une page de résultats de recherche — le titre bleu, l'adresse, les deux lignes de description — vient de ces balises. Le travail qui consiste à les soigner porte un nom, le <strong>référencement</strong>, et c'est un métier à part entière. Tu viens d'en voir la base, celle qui compte le plus.</p>

<div class="a-retenir">
<ul>
<li>Quatre lignes font le minimum sérieux : <code>charset</code>, <code>viewport</code>, <code>title</code>, <code>description</code>.</li>
<li>Le <code>title</code> est la ligne cliquable dans les résultats de recherche : il se rédige.</li>
<li>Sans <code>viewport</code>, un téléphone affiche ta page en miniature.</li>
<li>Un seul <code>&lt;h1&gt;</code> par page, et une description différente pour chacune.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la balise keywords ne sert plus à rien</summary>
<p>Tu croiseras encore <code>&lt;meta name="keywords" content="..."&gt;</code> dans de vieux tutoriels. Elle a été massivement truquée dans les années 2000 — on y empilait des mots sans rapport pour capter du trafic — et les moteurs l'ignorent complètement depuis. L'écrire ne nuit pas, mais n'apporte rien. Ce qui compte aujourd'hui est le contenu réel de la page.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Écris une page COMPLÈTE pour une pizzeria : <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html lang="fr"&gt;</code>, un <code>&lt;head&gt;</code> avec charset UTF-8, un <code>&lt;title&gt;</code> contenant <code>Pizzeria</code>, une <code>meta description</code> non vide — et un <code>&lt;body&gt;</code> avec un h1.',
      codeDepart: '<!DOCTYPE html>\n<html lang="fr">\n<head>\n\n</head>\n<body>\n\n</body>\n</html>',
      indices: [
        "Une page complète a deux parties : ce que le navigateur doit savoir, et ce qu’il doit afficher.",
        "Le <code>&lt;head&gt;</code> porte l’encodage, le titre d’onglet et la description ; le <code>&lt;body&gt;</code> porte le contenu visible.",
        "<code>&lt;meta charset=\"UTF-8\"&gt;</code>, un <code>&lt;title&gt;</code>, et une <code>meta description</code> dans le head."
      ],
      solution: '<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <title>Pizzeria Bella — Pizzas au feu de bois</title>\n  <meta name="description" content="Pizzas artisanales au feu de bois, en plein centre-ville. Sur place ou à emporter.">\n</head>\n<body>\n  <h1>Pizzeria Bella</h1>\n</body>\n</html>',
      verifier: function (ctx) {
        if (ctx.doc.documentElement.getAttribute('lang') !== 'fr') return { ok: false, message: 'La balise html doit déclarer la langue : <code>&lt;html lang="fr"&gt;</code>.' };
        if (!ctx.doc.querySelector('meta[charset]')) return { ok: false, message: 'Il manque <code>&lt;meta charset="UTF-8"&gt;</code> dans le head — sans lui, adieu les accents.' };
        if (!/pizzeria/i.test(ctx.doc.title)) return { ok: false, message: 'Le <code>&lt;title&gt;</code> doit contenir « Pizzeria » (c\'est lui qui s\'affiche dans l\'onglet et sur Google).' };
        const desc = ctx.doc.querySelector('meta[name="description"]');
        if (!desc || !(desc.getAttribute('content') || '').trim()) return { ok: false, message: 'Il manque la <code>meta description</code> avec un attribut <code>content</code> rempli.' };
        if (!ctx.doc.querySelector('body h1')) return { ok: false, message: 'Le body doit contenir un h1.' };
        return { ok: true, message: 'Une page complète, prête pour Google : du DOCTYPE à la description. C\'est exactement ce squelette que tu recopieras au début de chaque projet.' };
      }
    },
    {
      type: 'qcm',
      consigne: '<strong>Question de contrôle.</strong> Ta page s\'affiche minuscule sur téléphone, obligeant à zoomer. Quelle ligne manque probablement ?',
      choix: [
        '<code>&lt;meta charset="UTF-8"&gt;</code>',
        '<code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>',
        '<code>&lt;title&gt;Ma page&lt;/title&gt;</code>',
        '<code>&lt;meta name="description" content="..."&gt;</code>'
      ],
      bonne: 1,
      explication: 'Sans le viewport, les téléphones simulent un grand écran et dézooment tout. Cette ligne dit « affiche à la vraie largeur de l\'appareil ». Elle va dans TOUTES tes pages, avec le charset.',
      aides: [
        'Le charset gère les caractères (accents), pas le zoom.',
        '',
        'Le title ne joue que sur l\'onglet et Google — pas sur l\'affichage.',
        'La description n\'influence que l\'apparence sur Google.'
      ]
    },
    {
      type: 'html',
      consigne: '<strong>Défi SEO : l\'audit.</strong> Cette page cumule 4 fautes de référencement : deux <code>&lt;h1&gt;</code>, un saut direct de h1 à h4, une image sans <code>alt</code>, et un <code>&lt;title&gt;</code> vide. Corrige tout : un seul h1, le h4 devient h2, un alt rempli, un title rempli.',
      codeDepart: '<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <title></title>\n</head>\n<body>\n  <h1>Atelier vélo</h1>\n  <h1>Réparations toutes marques</h1>\n  <h4>Nos services</h4>\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\'%3E%3Ccircle cx=\'40\' cy=\'40\' r=\'35\' fill=\'none\' stroke=\'%231e2432\' stroke-width=\'6\'/%3E%3C/svg%3E">\n  <p>Freins, pneus, chaînes : on répare tout.</p>\n</body>\n</html>',
      indices: [
        "Quatre fautes, toutes invisibles à l’œil : la page s’affiche très bien. Ce sont les moteurs de recherche et les lecteurs d’écran qui souffrent.",
        "Une page n’a qu’<strong>un</strong> h1. Les sous-titres sont des h2. Et toute image porteuse d’information a besoin d’un <code>alt</code>.",
        "Le second h1 devient un h2 ou un <code>&lt;p&gt;</code>, « Nos services » passe en h2, et l’image reçoit son <code>alt</code>."
      ],
      solution: '<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <title>Atelier vélo — Réparations toutes marques</title>\n</head>\n<body>\n  <h1>Atelier vélo</h1>\n  <p>Réparations toutes marques</p>\n  <h2>Nos services</h2>\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'80\'%3E%3Ccircle cx=\'40\' cy=\'40\' r=\'35\' fill=\'none\' stroke=\'%231e2432\' stroke-width=\'6\'/%3E%3C/svg%3E" alt="Une roue de vélo">\n  <p>Freins, pneus, chaînes : on répare tout.</p>\n</body>\n</html>',
      verifier: function (ctx) {
        if (ctx.doc.querySelectorAll('h1').length !== 1) return { ok: false, message: 'Il doit rester UN seul <code>&lt;h1&gt;</code> (transforme l\'autre en p ou en h2).' };
        if (ctx.doc.querySelector('h4')) return { ok: false, message: 'Le <code>&lt;h4&gt;</code> saute des niveaux : après un h1 vient un <code>&lt;h2&gt;</code>.' };
        const img = ctx.doc.querySelector('img');
        if (!img || !(img.getAttribute('alt') || '').trim()) return { ok: false, message: 'L\'image n\'a toujours pas d\'attribut <code>alt</code> rempli.' };
        if (!ctx.doc.title.trim()) return { ok: false, message: 'Le <code>&lt;title&gt;</code> est encore vide — c\'est la ligne bleue sur Google, remplis-la !' };
        return { ok: true, message: '🏆 Module HTML approfondi terminé ! Tu sais maintenant écrire des pages complètes, valides, accessibles ET bien référencées. Peu de débutants peuvent en dire autant.' };
      }
    }
  ]
},

];
