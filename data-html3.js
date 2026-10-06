/* ===== HTML — troisième partie (html-15 à html-22) ===== */
window.DATA_HTML3 = [

/* ---------- html-15 ---------- */
{
  id: 'html-15',
  titre: 'Les listes de définition',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu connais deux listes : à puces et numérotée. Toutes deux énumèrent des éléments de même nature. Mais certaines informations vont par <strong>paires</strong> : un terme et son explication, une caractéristique et sa valeur, une question et sa réponse.</p>
<p>Écrire cela dans une liste à puces oblige à inventer un séparateur — « HTML : le langage des pages » — et le lien entre les deux moitiés n'existe alors que dans la tête du lecteur. La liste de définition rend ce lien explicite.</p>

<h2>Trois balises</h2>
<pre class="bloc-code">&lt;dl&gt;
  &lt;dt&gt;HTML&lt;/dt&gt;
  &lt;dd&gt;Le langage qui décrit la structure d'une page.&lt;/dd&gt;

  &lt;dt&gt;CSS&lt;/dt&gt;
  &lt;dd&gt;Le langage qui décrit son apparence.&lt;/dd&gt;
&lt;/dl&gt;</pre>
<ul>
<li><code>&lt;dl&gt;</code> — la liste entière (<em>description list</em>) ;</li>
<li><code>&lt;dt&gt;</code> — le terme décrit (<em>description term</em>) ;</li>
<li><code>&lt;dd&gt;</code> — sa description (<em>description details</em>).</li>
</ul>
<p>Par défaut, le navigateur décale chaque <code>&lt;dd&gt;</code> de 40 pixels vers la droite : le couple se lit d'un coup d'œil, sans aucun CSS.</p>
<p>Rien n'oblige à les apparier un pour un. Un terme peut avoir plusieurs descriptions — plusieurs <code>&lt;dd&gt;</code> à la suite — et plusieurs termes peuvent partager la même, en empilant les <code>&lt;dt&gt;</code> avant le <code>&lt;dd&gt;</code>.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'il lit</th><th>Ce qu'il en fait</th></tr>
<tr><td>&lt;dl&gt;</td><td>« Une liste de couples commence. »</td></tr>
<tr><td>&lt;dt&gt;HTML&lt;/dt&gt;</td><td>Un terme, affiché contre la marge gauche.</td></tr>
<tr><td>&lt;dd&gt;Le langage…&lt;/dd&gt;</td><td>Sa description, décalée de 40 pixels : elle appartient au terme au-dessus.</td></tr>
<tr><td>&lt;dt&gt;CSS&lt;/dt&gt;</td><td>Nouveau terme : le couple précédent est clos.</td></tr>
<tr><td>&lt;/dl&gt;</td><td>Fin de la liste — deux couples en tout.</td></tr>
</table>

<h2>Liste de définition ou tableau ?</h2>
<p>La question revient souvent, et elle a une réponse nette. Un tableau a <strong>deux dimensions</strong> : plusieurs lignes <em>et</em> plusieurs colonnes, dont le croisement porte le sens. Une <code>&lt;dl&gt;</code> n'en a qu'une : une suite de couples.</p>
<p>Prix, couleur et poids d'un seul produit ? C'est une <code>&lt;dl&gt;</code>. Prix, couleur et poids de <em>douze</em> produits ? C'est un tableau — les colonnes deviennent comparables.</p>

<h2>Les pièges</h2>
<p><strong>Mettre un <code>&lt;dt&gt;</code> ou un <code>&lt;dd&gt;</code> hors d'une <code>&lt;dl&gt;</code>.</strong> Rien ne casse à l'écran, mais le couple n'existe plus pour les machines : le lien entre terme et description est précisément ce que la <code>&lt;dl&gt;</code> apporte. Sans elle, il ne reste que deux blocs voisins.</p>
<p><strong>Glisser un <code>&lt;p&gt;</code> entre les couples.</strong> Une <code>&lt;dl&gt;</code> ne contient que des <code>&lt;dt&gt;</code> et des <code>&lt;dd&gt;</code>. Pour aérer, on les regroupe dans un <code>&lt;div&gt;</code> — c'est autorisé — mais on n'y intercale pas de paragraphe.</p>
<p><strong>S'en servir pour un dialogue.</strong> C'était un usage recommandé autrefois, il ne l'est plus : une <code>&lt;dl&gt;</code> associe un terme à sa description, pas un locuteur à sa réplique.</p>

<h2>Dans la vraie vie</h2>
<p>Les caractéristiques techniques d'un produit, un glossaire, les métadonnées d'un article — auteur, date, catégorie — sont des <code>&lt;dl&gt;</code>. Tu ne les reconnaîtras pas à l'œil, parce que le CSS les remet presque toujours en forme, souvent sur deux colonnes.</p>

<div class="a-retenir">
<ul>
<li><code>&lt;dl&gt;</code> contient des couples <code>&lt;dt&gt;</code> (le terme) et <code>&lt;dd&gt;</code> (sa description).</li>
<li>Le <code>&lt;dd&gt;</code> est décalé de 40 pixels par défaut : le couple se voit sans CSS.</li>
<li>Une dimension, c'est une <code>&lt;dl&gt;</code> ; deux dimensions comparables, c'est un tableau.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : le « d » veut dire description, pas définition</summary>
<p>Longtemps appelée « liste de définition », elle a été renommée « liste de description » dans la norme — parce que son usage réel dépassait largement les définitions de dictionnaire. Les noms des balises, eux, n'ont pas changé : <code>dl</code>, <code>dt</code>, <code>dd</code>. Tu croiseras les deux appellations, elles désignent la même chose.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée une liste de définition avec deux termes : <code>HTML</code> et <code>CSS</code>, chacun suivi de son explication.',
      codeDepart: '<h2>Glossaire</h2>\n\n',
      indices: [
        "Une liste de définition n’a pas un mais <strong>deux</strong> types d’éléments : le terme, et son explication.",
        "Le <code>&lt;dl&gt;</code> enveloppe le tout. Le <code>&lt;dt&gt;</code> porte le terme, le <code>&lt;dd&gt;</code> sa définition, et ils alternent.",
        "<code>&lt;dl&gt;</code> autour, puis dt, dd, dt, dd."
      ],
      solution: '<h2>Glossaire</h2>\n\n<dl>\n  <dt>HTML</dt>\n  <dd>Le langage qui décrit la structure d\'une page.</dd>\n  <dt>CSS</dt>\n  <dd>Le langage qui décrit son apparence.</dd>\n</dl>',
      verifier: function (ctx) {
        const dl = ctx.doc.querySelector('dl');
        if (!dl) return { ok: false, message: 'Il manque la balise <code>&lt;dl&gt;</code> qui contient toute la liste.' };
        const dts = dl.querySelectorAll('dt');
        const dds = dl.querySelectorAll('dd');
        if (dts.length < 2) return { ok: false, message: 'J\'attends deux termes <code>&lt;dt&gt;</code> — j\'en compte ' + dts.length + '.' };
        if (dds.length < 2) return { ok: false, message: 'Chaque terme doit avoir son explication <code>&lt;dd&gt;</code> — j\'en compte ' + dds.length + '.' };
        const t = [...dts].map(d => d.textContent.trim().toUpperCase());
        if (!t.includes('HTML') || !t.includes('CSS')) return { ok: false, message: 'Les deux termes attendus sont HTML et CSS — je trouve : ' + t.join(', ') + '.' };
        if (!dds[0].textContent.trim()) return { ok: false, message: 'Les explications ne doivent pas être vides.' };
        return { ok: true, message: 'La bonne balise pour un glossaire. Un moteur de recherche comprend immédiatement qu\'il s\'agit de définitions.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> décris un produit avec une liste de définition : <code>Prix</code>, <code>Couleur</code> et <code>Poids</code>, chacun avec sa valeur.',
      codeDepart: '<h2>Fiche produit</h2>\n\n',
      indices: [
        "Exactement la même structure qu’à l’exercice précédent, avec un couple de plus.",
        "Trois caractéristiques, donc trois <code>&lt;dt&gt;</code> et trois <code>&lt;dd&gt;</code>, toujours dans un seul <code>&lt;dl&gt;</code>.",
        "Prix, Couleur, Poids en <code>&lt;dt&gt;</code> ; leurs valeurs en <code>&lt;dd&gt;</code>."
      ],
      solution: '<h2>Fiche produit</h2>\n\n<dl>\n  <dt>Prix</dt>\n  <dd>29,90 €</dd>\n  <dt>Couleur</dt>\n  <dd>Bleu nuit</dd>\n  <dt>Poids</dt>\n  <dd>340 g</dd>\n</dl>',
      verifier: function (ctx) {
        const dl = ctx.doc.querySelector('dl');
        if (!dl) return { ok: false, message: 'Il manque la balise <code>&lt;dl&gt;</code>.' };
        const dts = [...dl.querySelectorAll('dt')].map(d => d.textContent.trim().toLowerCase());
        const dds = dl.querySelectorAll('dd');
        if (dts.length < 3) return { ok: false, message: 'J\'attends trois termes — j\'en compte ' + dts.length + '.' };
        if (dds.length < 3) return { ok: false, message: 'J\'attends trois valeurs <code>&lt;dd&gt;</code> — j\'en compte ' + dds.length + '.' };
        for (const attendu of ['prix', 'couleur', 'poids']) {
          if (!dts.some(t => t.includes(attendu))) return { ok: false, message: 'Le terme « ' + attendu + ' » manque dans ta liste.' };
        }
        return { ok: true, message: 'Une fiche produit structurée : chaque caractéristique est explicitement reliée à sa valeur.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Quand faut-il préférer <code>&lt;dl&gt;</code> à un <code>&lt;table&gt;</code> ?',
      choix: [
        'Quand on associe un terme à son explication, sans croiser de colonnes',
        'Quand il y a moins de cinq éléments',
        'Quand on ne veut pas de bordures',
        'Quand le contenu doit être centré'
      ],
      bonne: 0,
      explication: 'Un tableau exprime un croisement à deux dimensions : chaque cellule a un sens à l\'intersection d\'une ligne et d\'une colonne. Une liste de définition exprime une relation simple terme vers explication.',
      aides: [
        null,
        'Le nombre d\'éléments n\'entre pas en compte : c\'est la nature de la relation entre les données qui décide.',
        'Les bordures se règlent en CSS pour les deux balises. Le choix doit porter sur le sens, jamais sur l\'apparence.',
        'Le centrage est également affaire de CSS.'
      ]
    }
  ]
},

/* ---------- html-16 ---------- */
{
  id: 'html-16',
  titre: 'Les balises de texte fines',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p><code>&lt;strong&gt;</code> et <code>&lt;em&gt;</code> couvrent l'essentiel : ce qui est important, ce qui est accentué. Mais beaucoup de fragments de texte ont un sens plus précis — une abréviation, une date, une formule chimique, un résultat de recherche surligné.</p>
<p>À chaque fois, la même logique que depuis le début : une balise qui <em>dit ce que c'est</em> vaut mieux qu'une mise en forme qui ne dit rien.</p>

<h2>Le petit peuple des balises de texte</h2>
<ul>
<li><code>&lt;abbr title="..."&gt;</code> — une abréviation, avec sa signification en infobulle. Le navigateur la souligne en <strong>pointillés</strong> ;</li>
<li><code>&lt;time datetime="2026-10-06"&gt;</code> — une date. Le texte affiché reste le tien, mais le <code>datetime</code> donne la version que lit une machine ;</li>
<li><code>&lt;mark&gt;</code> — un passage surligné parce qu'il est pertinent <em>ici et maintenant</em> ;</li>
<li><code>&lt;sup&gt;</code> et <code>&lt;sub&gt;</code> — exposant et indice, affichés plus petits ;</li>
<li><code>&lt;code&gt;</code> — un fragment de code ;</li>
<li><code>&lt;blockquote&gt;</code> — une citation longue, décalée de 40 pixels par défaut ;</li>
<li><code>&lt;q&gt;</code> — une citation courte, dans le fil du texte.</li>
</ul>
<pre class="bloc-code">&lt;p&gt;La surface est de 25 m&lt;sup&gt;2&lt;/sup&gt;, mesurée le
&lt;time datetime="2026-10-06"&gt;6 octobre&lt;/time&gt;.&lt;/p&gt;</pre>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Balise</th><th>Ce que ça change à l'écran</th><th>Ce que ça dit en plus</th></tr>
<tr><td>&lt;abbr title&gt;</td><td>un soulignement pointillé</td><td>la forme complète, en infobulle</td></tr>
<tr><td>&lt;time&gt;</td><td><strong>rien du tout</strong></td><td>une date exploitable par une machine</td></tr>
<tr><td>&lt;mark&gt;</td><td>un fond surligné</td><td>« ce passage répond à ta recherche »</td></tr>
<tr><td>&lt;sup&gt;</td><td>plus petit, surélevé</td><td>un exposant, pas une décoration</td></tr>
</table>
<p>Regarde la ligne de <code>&lt;time&gt;</code> : elle ne change strictement rien à l'affichage. C'est le cas le plus pur de ce que fait le HTML — ajouter du sens sans toucher à l'apparence.</p>

<h2>Les pièges</h2>
<p><strong>Se servir de <code>&lt;mark&gt;</code> comme d'un surligneur décoratif.</strong> Le sens de <code>mark</code> est « pertinent pour ce que tu cherches en ce moment » — typiquement, les mots trouvés dans une page de résultats. Pour insister durablement sur un mot, c'est <code>&lt;strong&gt;</code>.</p>
<p><strong>Écrire une date au format français dans <code>datetime</code>.</strong> L'attribut attend un format machine, année en premier : <code>2026-10-06</code>. Le texte affiché, lui, s'écrit comme tu veux — « 6 octobre », « hier soir ». C'est tout l'intérêt d'avoir les deux.</p>
<p><strong>Confondre <code>&lt;blockquote&gt;</code> et <code>&lt;q&gt;</code>.</strong> Le premier est un bloc, détaché du paragraphe ; le second s'insère dans une phrase et ajoute les guillemets tout seul. Mettre un <code>blockquote</code> au milieu d'un texte coupe le paragraphe en deux.</p>
<p><strong>Abréger sans le <code>title</code>.</strong> Un <code>&lt;abbr&gt;</code> sans sa signification ne sert à rien : il souligne un mot sans l'expliquer. L'attribut <em>est</em> la balise.</p>

<h2>Dans la vraie vie</h2>
<p>Les mots surlignés dans un moteur de recherche sont des <code>&lt;mark&gt;</code>. Les dates d'un blog sont des <code>&lt;time&gt;</code> — c'est ce qui permet à un agrégateur de les trier sans comprendre le français. Et les sigles d'un site administratif portent presque toujours un <code>&lt;abbr&gt;</code>.</p>

<div class="a-retenir">
<ul>
<li>Ces balises nomment un <em>fragment</em> : abréviation, date, exposant, citation.</li>
<li><code>&lt;time&gt;</code> ne change rien à l'écran — son <code>datetime</code> s'adresse aux machines.</li>
<li><code>&lt;mark&gt;</code> veut dire « pertinent maintenant », pas « joli en jaune ».</li>
<li>Un <code>&lt;abbr&gt;</code> sans <code>title</code> est une balise vide de sens.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi un format de date à l'envers ?</summary>
<p><code>2026-10-06</code> suit la norme internationale ISO 8601, et son ordre n'est pas arbitraire : du plus grand au plus petit. L'avantage est qu'un tri alphabétique de ces chaînes donne exactement un tri chronologique — propriété que n'a ni le format français ni l'américain. Tu retrouveras ce format partout : bases de données, fichiers journaux, noms de sauvegardes.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Écris une phrase contenant une <strong>abréviation</strong> <code>HTML</code> dont le <code>title</code> donne la signification complète, et une <strong>date</strong> du 14 juillet 2024 balisée avec son attribut <code>datetime</code>.',
      codeDepart: '<p>Cours publié le ...</p>\n',
      indices: [
        "Deux balises peu connues, mais toutes deux au service des machines autant que des humains.",
        "L’<code>&lt;abbr&gt;</code> porte la signification dans son <code>title</code> ; le <code>&lt;time&gt;</code> porte une date lisible par machine dans <code>datetime</code>.",
        "<code>&lt;abbr title=\"HyperText Markup Language\"&gt;HTML&lt;/abbr&gt;</code> et <code>&lt;time datetime=\"2024-07-14\"&gt;</code>"
      ],
      solution: '<p>Cours de <abbr title="HyperText Markup Language">HTML</abbr> publié le <time datetime="2024-07-14">14 juillet 2024</time>.</p>',
      verifier: function (ctx) {
        const abbr = ctx.doc.querySelector('abbr');
        if (!abbr) return { ok: false, message: 'Il manque la balise <code>&lt;abbr&gt;</code>.' };
        if (!abbr.getAttribute('title')) return { ok: false, message: 'L\'abréviation doit avoir un attribut <code>title</code> qui donne sa signification.' };
        if (abbr.getAttribute('title').length < 10) return { ok: false, message: 'Le <code>title</code> doit contenir la signification complète (HyperText Markup Language).' };
        const time = ctx.doc.querySelector('time');
        if (!time) return { ok: false, message: 'Il manque la balise <code>&lt;time&gt;</code>.' };
        const dt = time.getAttribute('datetime');
        if (!dt) return { ok: false, message: 'La balise <code>&lt;time&gt;</code> doit porter un attribut <code>datetime</code>.' };
        if (!/^2024-07-14$/.test(dt.trim())) return { ok: false, message: 'Le format attendu est <code>2024-07-14</code> (année-mois-jour) — tu as écrit « ' + dt + ' ».' };
        return { ok: true, message: 'Ta page est maintenant lisible par une machine : un moteur de recherche sait exactement quand l\'article a été publié.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> écris <code>La surface est de 25 m2</code> en mettant le 2 en <strong>exposant</strong>, et surligne le nombre <code>25</code> avec <code>&lt;mark&gt;</code>.',
      codeDepart: '<p>La surface est de ...</p>\n',
      indices: [
        "Deux effets différents sur la même phrase : surligner, et mettre en exposant.",
        "Le <code>&lt;mark&gt;</code> surligne. L’exposant, c’est <code>&lt;sup&gt;</code> — et l’indice, son frère <code>&lt;sub&gt;</code>.",
        "<code>&lt;mark&gt;25&lt;/mark&gt; m&lt;sup&gt;2&lt;/sup&gt;</code>"
      ],
      solution: '<p>La surface est de <mark>25</mark> m<sup>2</sup></p>',
      verifier: function (ctx) {
        const sup = ctx.doc.querySelector('sup');
        if (!sup) return { ok: false, message: 'Il manque la balise <code>&lt;sup&gt;</code> pour l\'exposant.' };
        if (sup.textContent.trim() !== '2') return { ok: false, message: 'L\'exposant doit contenir le chiffre 2 — il contient « ' + sup.textContent.trim() + ' ».' };
        const mark = ctx.doc.querySelector('mark');
        if (!mark) return { ok: false, message: 'Il manque la balise <code>&lt;mark&gt;</code> pour le surlignage.' };
        if (mark.textContent.trim() !== '25') return { ok: false, message: 'Le surlignage doit porter sur « 25 » — il porte sur « ' + mark.textContent.trim() + ' ».' };
        return { ok: true, message: 'Le « 2 » en exposant est une information, pas une décoration : un lecteur d\'écran lira bien « mètres carrés ».' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi :</strong> compose une citation longue avec <code>&lt;blockquote&gt;</code> contenant un paragraphe, suivie de son auteur dans un <code>&lt;cite&gt;</code>.',
      codeDepart: '',
      indices: [
        "Une citation longue et sa source sont deux choses distinctes, et HTML les sépare.",
        "Le <code>&lt;blockquote&gt;</code> contient la citation (dans un paragraphe) ; le <code>&lt;cite&gt;</code>, placé après, nomme son auteur.",
        "<code>&lt;blockquote&gt;&lt;p&gt;…&lt;/p&gt;&lt;/blockquote&gt;</code> puis <code>&lt;p&gt;&lt;cite&gt;…&lt;/cite&gt;&lt;/p&gt;</code>"
      ],
      solution: '<blockquote>\n  <p>Le code est lu bien plus souvent qu\'il n\'est écrit.</p>\n</blockquote>\n<p><cite>Guido van Rossum</cite></p>',
      verifier: function (ctx) {
        const bq = ctx.doc.querySelector('blockquote');
        if (!bq) return { ok: false, message: 'Il manque la balise <code>&lt;blockquote&gt;</code>.' };
        if (!bq.querySelector('p')) return { ok: false, message: 'La citation doit contenir un <code>&lt;p&gt;</code> — blockquote est un conteneur de blocs.' };
        if (bq.textContent.trim().length < 10) return { ok: false, message: 'Écris une vraie citation dans le blockquote.' };
        const cite = ctx.doc.querySelector('cite');
        if (!cite) return { ok: false, message: 'Ajoute l\'auteur dans une balise <code>&lt;cite&gt;</code>.' };
        if (!cite.textContent.trim()) return { ok: false, message: 'La balise <code>&lt;cite&gt;</code> ne doit pas être vide.' };
        return { ok: true, message: 'blockquote pour le bloc cité, cite pour la source : chaque élément dit ce qu\'il est.' };
      }
    }
  ]
},

/* ---------- html-17 ---------- */
{
  id: 'html-17',
  titre: 'Les tableaux structurés',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Tu sais faire un tableau : des <code>&lt;tr&gt;</code>, des <code>&lt;th&gt;</code>, des <code>&lt;td&gt;</code>. Ça suffit pour l'afficher. Ça ne suffit pas pour qu'il soit <em>utilisable</em>.</p>
<p>Imagine qu'on te lise un tableau à voix haute, cellule par cellule : « Janvier. 1200. Février. 1450. » Tu t'y retrouves parce que tu vois les colonnes. Une personne aveugle, non — à moins que le tableau ne dise lui-même quelle cellule nomme quoi. Les balises de cette leçon servent à ça.</p>

<h2>Un tableau complet</h2>
<pre class="bloc-code">&lt;table&gt;
  &lt;caption&gt;Ventes du premier trimestre&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;&lt;th scope="col"&gt;Mois&lt;/th&gt;&lt;th scope="col"&gt;Montant&lt;/th&gt;&lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;&lt;th scope="row"&gt;Janvier&lt;/th&gt;&lt;td&gt;1 200&lt;/td&gt;&lt;/tr&gt;
    &lt;tr&gt;&lt;th scope="row"&gt;Février&lt;/th&gt;&lt;td&gt;1 450&lt;/td&gt;&lt;/tr&gt;
  &lt;/tbody&gt;
  &lt;tfoot&gt;
    &lt;tr&gt;&lt;th scope="row"&gt;Total&lt;/th&gt;&lt;td&gt;2 650&lt;/td&gt;&lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;</pre>
<ul>
<li><code>&lt;caption&gt;</code> — le titre du tableau. Il s'affiche au-dessus et fait partie du tableau, contrairement à un <code>&lt;h3&gt;</code> posé juste avant ;</li>
<li><code>&lt;thead&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code> — l'en-tête, le corps, le pied ;</li>
<li><code>scope="col"</code> ou <code>scope="row"</code> — cet en-tête nomme-t-il une colonne, ou une ligne ?</li>
</ul>

<h2>Fusionner des cellules</h2>
<p>Deux attributs étendent une cellule sur ses voisines : <code>colspan="2"</code> l'étale sur deux colonnes, <code>rowspan="3"</code> sur trois lignes. Utile pour une ligne de total, ou un en-tête qui chapeaute plusieurs colonnes.</p>
<p>Attention au décompte : une cellule en <code>colspan="2"</code> en remplace deux. La ligne qui la contient aura donc une balise de moins que les autres — et c'est normal.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Avec scope</th><th>Sans scope</th></tr>
<tr><td>« Janvier, Montant : 1 200 »</td><td>« 1 200 »</td></tr>
<tr><td>« Février, Montant : 1 450 »</td><td>« 1 450 »</td></tr>
<tr><td>« Total, Montant : 2 650 »</td><td>« 2 650 »</td></tr>
</table>
<p>Voilà ce qu'entend une personne qui parcourt le tableau au lecteur d'écran. À gauche, chaque nombre arrive avec ses deux étiquettes. À droite, une suite de nombres nus.</p>

<h2>Les pièges</h2>
<p><strong>Écrire le titre du tableau dans un <code>&lt;h3&gt;</code> juste au-dessus.</strong> Visuellement c'est pareil, mais le lien est perdu : rien ne dit que ce titre appartient à ce tableau. Le <code>&lt;caption&gt;</code> est <em>dans</em> la balise <code>&lt;table&gt;</code>, et il doit être son premier enfant — placé ailleurs, il est déplacé ou ignoré.</p>
<p><strong>Croire que <code>&lt;tfoot&gt;</code> doit s'écrire en dernier.</strong> Sa place dans le code n'a pas d'importance : le navigateur l'affiche en bas quoi qu'il arrive.</p>
<p><strong>Compter faux avec <code>colspan</code>.</strong> Si le total des cellules d'une ligne, fusions comprises, ne tombe pas sur le nombre de colonnes, le tableau se décale en silence — un trou apparaît, ou une colonne de plus. Aucun message ne te prévient.</p>
<p><strong>Oublier le <code>&lt;tbody&gt;</code>… ou plutôt, croire qu'on l'a oublié.</strong> Le navigateur l'ajoute toujours lui-même, même si tu ne l'écris pas. Tu le verras apparaître en inspectant ta page : ce n'est pas une erreur de ta part.</p>

<h2>Dans la vraie vie</h2>
<p>Un relevé bancaire, un comparatif de forfaits, un tableau de résultats sportifs. Le <code>&lt;thead&gt;</code> prend tout son sens sur un long tableau : c'est lui qui permet de garder l'en-tête visible pendant qu'on fait défiler, et de répéter les en-têtes sur chaque page à l'impression.</p>

<div class="a-retenir">
<ul>
<li><code>&lt;caption&gt;</code> titre le tableau <em>de l'intérieur</em>, en premier enfant de <code>&lt;table&gt;</code>.</li>
<li><code>scope="col"</code> et <code>scope="row"</code> disent ce que nomme chaque en-tête : c'est ce qui rend le tableau lisible à voix haute.</li>
<li><code>colspan</code> et <code>rowspan</code> fusionnent — et changent le nombre de balises de la ligne.</li>
<li>Le <code>&lt;tbody&gt;</code> est ajouté par le navigateur, écrit ou non.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : quand scope ne suffit plus</summary>
<p>Sur un tableau à double entrée très complexe — plusieurs niveaux d'en-têtes imbriqués — <code>scope</code> devient ambigu. Il existe alors <code>headers</code>, qui liste les <code>id</code> des en-têtes dont dépend une cellule, un par un. C'est fastidieux à écrire, et c'est souvent le signe qu'il vaudrait mieux couper le tableau en deux.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Structure ce tableau correctement : ajoute un <code>&lt;caption&gt;</code>, mets la ligne d\'en-tête dans un <code>&lt;thead&gt;</code> avec des <code>&lt;th&gt;</code>, et les données dans un <code>&lt;tbody&gt;</code>.',
      codeDepart: '<table>\n  <tr><td>Mois</td><td>Montant</td></tr>\n  <tr><td>Janvier</td><td>1200 €</td></tr>\n  <tr><td>Février</td><td>1450 €</td></tr>\n</table>',
      indices: [
        "Un tableau bien structuré a trois zones, comme un document : un titre, une tête, un corps.",
        "Le <code>&lt;caption&gt;</code> se place juste après <code>&lt;table&gt;</code>. La ligne d’en-tête va dans un <code>&lt;thead&gt;</code>, le reste dans un <code>&lt;tbody&gt;</code>.",
        "Caption, puis thead avec des <code>&lt;th&gt;</code>, puis tbody avec les <code>&lt;tr&gt;</code> de données."
      ],
      solution: '<table>\n  <caption>Ventes du trimestre</caption>\n  <thead>\n    <tr><th>Mois</th><th>Montant</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Janvier</td><td>1200 €</td></tr>\n    <tr><td>Février</td><td>1450 €</td></tr>\n  </tbody>\n</table>',
      verifier: function (ctx) {
        const table = ctx.doc.querySelector('table');
        if (!table) return { ok: false, message: 'Garde la balise <code>&lt;table&gt;</code>.' };
        const caption = table.querySelector('caption');
        if (!caption) return { ok: false, message: 'Ajoute un <code>&lt;caption&gt;</code> juste après la balise ouvrante du tableau.' };
        if (!caption.textContent.trim()) return { ok: false, message: 'Le <code>&lt;caption&gt;</code> ne doit pas être vide : donne un titre au tableau.' };
        const thead = table.querySelector('thead');
        if (!thead) return { ok: false, message: 'La ligne d\'en-tête doit être dans un <code>&lt;thead&gt;</code>.' };
        const ths = thead.querySelectorAll('th');
        if (ths.length < 2) return { ok: false, message: 'Dans le <code>&lt;thead&gt;</code>, les cellules doivent être des <code>&lt;th&gt;</code> et non des <code>&lt;td&gt;</code> — j\'en compte ' + ths.length + '.' };
        const tbody = table.querySelector('tbody');
        if (!tbody) return { ok: false, message: 'Les lignes de données doivent être dans un <code>&lt;tbody&gt;</code>.' };
        if (tbody.querySelectorAll('tr').length < 2) return { ok: false, message: 'Les deux lignes de données doivent être dans le <code>&lt;tbody&gt;</code>.' };
        return { ok: true, message: 'Un tableau structuré peut être trié, lu à voix haute, exporté. Un tableau plat n\'est qu\'un dessin.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> ajoute une ligne de total dans un <code>&lt;tfoot&gt;</code>, où la cellule « Total » s\'étend sur <strong>deux colonnes</strong> grâce à <code>colspan</code>.',
      codeDepart: '<table>\n  <thead>\n    <tr><th>Mois</th><th>Montant</th><th>TVA</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Janvier</td><td>1200 €</td><td>240 €</td></tr>\n  </tbody>\n  <!-- ton tfoot ici -->\n</table>',
      indices: [
        "Une ligne de total n’est ni un en-tête ni une donnée ordinaire : elle a sa propre zone.",
        "Le <code>&lt;tfoot&gt;</code> porte le pied du tableau. Et pour qu’une cellule s’étale sur deux colonnes, il existe un attribut.",
        "<code>&lt;tfoot&gt;&lt;tr&gt;&lt;td colspan=\"2\"&gt;Total&lt;/td&gt;&lt;td&gt;…&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;</code>"
      ],
      solution: '<table>\n  <thead>\n    <tr><th>Mois</th><th>Montant</th><th>TVA</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Janvier</td><td>1200 €</td><td>240 €</td></tr>\n  </tbody>\n  <tfoot>\n    <tr><td colspan="2">Total</td><td>1440 €</td></tr>\n  </tfoot>\n</table>',
      verifier: function (ctx) {
        const tfoot = ctx.doc.querySelector('tfoot');
        if (!tfoot) return { ok: false, message: 'Ajoute un <code>&lt;tfoot&gt;</code> pour la ligne de total.' };
        const cellules = tfoot.querySelectorAll('td, th');
        if (!cellules.length) return { ok: false, message: 'Le <code>&lt;tfoot&gt;</code> doit contenir une ligne avec des cellules.' };
        const fusionnee = [...cellules].find(c => Number(c.getAttribute('colspan')) >= 2);
        if (!fusionnee) return { ok: false, message: 'Une cellule doit s\'étendre sur deux colonnes avec <code>colspan="2"</code>.' };
        return { ok: true, message: 'colspan fusionne horizontalement, rowspan verticalement. Le tableau reste valide car le compte total de colonnes est respecté.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi accessibilité :</strong> ajoute <code>scope="col"</code> aux en-têtes de colonne, et transforme la première cellule de chaque ligne de données en <code>&lt;th scope="row"&gt;</code>.',
      codeDepart: '<table>\n  <thead>\n    <tr><th>Mois</th><th>Montant</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Janvier</td><td>1200 €</td></tr>\n    <tr><td>Février</td><td>1450 €</td></tr>\n  </tbody>\n</table>',
      indices: [
        "Un lecteur d’écran ne voit pas la grille : il a besoin qu’on lui dise ce que chaque en-tête gouverne.",
        "<code>scope=\"col\"</code> dit « cet en-tête vaut pour toute la colonne » ; <code>scope=\"row\"</code>, pour toute la ligne — ce qui suppose un <code>&lt;th&gt;</code> en début de ligne.",
        "Dans le thead : <code>&lt;th scope=\"col\"&gt;</code>. Dans le tbody, le premier <code>&lt;td&gt;</code> devient <code>&lt;th scope=\"row\"&gt;</code>."
      ],
      solution: '<table>\n  <thead>\n    <tr><th scope="col">Mois</th><th scope="col">Montant</th></tr>\n  </thead>\n  <tbody>\n    <tr><th scope="row">Janvier</th><td>1200 €</td></tr>\n    <tr><th scope="row">Février</th><td>1450 €</td></tr>\n  </tbody>\n</table>',
      verifier: function (ctx) {
        const cols = ctx.doc.querySelectorAll('thead th[scope="col"]');
        if (cols.length < 2) return { ok: false, message: 'Les deux en-têtes de colonne doivent porter <code>scope="col"</code> — j\'en compte ' + cols.length + '.' };
        const rows = ctx.doc.querySelectorAll('tbody th[scope="row"]');
        if (rows.length < 2) return { ok: false, message: 'La première cellule de chaque ligne de données doit être un <code>&lt;th scope="row"&gt;</code> — j\'en compte ' + rows.length + '.' };
        return { ok: true, message: 'Un lecteur d\'écran annoncera désormais « Mois : Janvier, Montant : 1200 € ». Le tableau devient compréhensible sans le voir.' };
      }
    }
  ]
},

/* ---------- html-18 ---------- */
{
  id: 'html-18',
  titre: 'Les formulaires bien construits',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un formulaire mal construit ne se voit pas. Il s'affiche correctement, on peut taper dedans, et pourtant il met en difficulté une partie des visiteurs : celui qui navigue au clavier, celle qui n'entend que ce que son lecteur d'écran annonce, ou simplement la personne qui vise une case à cocher minuscule sur un téléphone.</p>
<p>Les quelques attributs de cette leçon ne changent presque rien à l'écran. Ils changent tout à l'usage.</p>

<h2>Le label, d'abord</h2>
<pre class="bloc-code">&lt;label for="prenom"&gt;Prénom&lt;/label&gt;
&lt;input type="text" id="prenom" name="prenom"&gt;</pre>
<p>Le <code>for</code> de l'étiquette doit valoir exactement l'<code>id</code> du champ. Deux bénéfices immédiats :</p>
<ul>
<li>cliquer sur le mot « Prénom » place le curseur dans le champ — et la zone cliquable d'une case à cocher passe de quelques pixels à toute la phrase ;</li>
<li>un lecteur d'écran annonce « Prénom, zone de texte » au lieu de « zone de texte ».</li>
</ul>
<p>Et le <code>name</code> ? Il ne sert ni à l'un ni à l'autre : c'est lui qui étiquette la valeur au moment de l'envoi. Sans <code>name</code>, un champ est rempli à l'écran mais <strong>n'arrive jamais</strong> de l'autre côté. Trois attributs, trois rôles distincts : <code>for</code> relie, <code>id</code> nomme, <code>name</code> transmet.</p>

<h2>Regrouper ce qui va ensemble</h2>
<pre class="bloc-code">&lt;fieldset&gt;
  &lt;legend&gt;Taille du plat&lt;/legend&gt;
  &lt;input type="radio" name="taille" id="p" value="petit"&gt;
  &lt;label for="p"&gt;Petit&lt;/label&gt;
&lt;/fieldset&gt;</pre>
<p><code>&lt;fieldset&gt;</code> entoure un groupe de champs liés, et <code>&lt;legend&gt;</code> le nomme. Le navigateur dessine un cadre autour, avec la légende posée dessus. Pour un groupe de boutons radio, c'est indispensable : sans lui, la question « Taille du plat ? » n'est annoncée nulle part, et l'on entend seulement « Petit, bouton radio ».</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce que fait le visiteur</th><th>Ce qui se passe</th></tr>
<tr><td>Il appuie sur Tab</td><td>Le focus entre dans le champ. Le lecteur annonce son <code>&lt;label&gt;</code>.</td></tr>
<tr><td>Il tape son prénom</td><td>La valeur se range dans le champ.</td></tr>
<tr><td>Il clique sur le mot « Prénom »</td><td>Grâce au <code>for</code>, le curseur revient dans le champ.</td></tr>
<tr><td>Il valide</td><td>Le couple <code>prenom = Camille</code> part — grâce au <code>name</code>.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Un <code>&lt;label&gt;</code> sans <code>for</code>.</strong> Le défaut le plus courant, et le plus invisible : à l'écran, rien ne distingue une étiquette reliée d'une étiquette qui ne l'est pas. Seul l'essai le révèle — clique sur le texte, et vois si le curseur bouge.</p>
<p><strong>Un champ sans <code>name</code>.</strong> Le formulaire a l'air de marcher, l'utilisateur remplit tout, et la donnée se perd à l'envoi. Rien ne le signale.</p>
<p><strong>Un <code>placeholder</code> à la place du <code>&lt;label&gt;</code>.</strong> C'est tentant : le texte gris dans le champ ressemble à une étiquette. Mais il disparaît dès qu'on tape — l'utilisateur qui s'interrompt ne sait plus ce qu'on lui demandait — et beaucoup de lecteurs d'écran ne l'annoncent pas. Le <code>placeholder</code> donne un exemple ; le <code>&lt;label&gt;</code> nomme. Les deux ne se remplacent pas.</p>
<p><strong>Un <code>id</code> réutilisé.</strong> Deux champs avec le même <code>id</code>, et toutes les étiquettes pointent vers le premier. Le second devient inatteignable au clic.</p>

<h2>Dans la vraie vie</h2>
<p>Essaie, sur un site que tu utilises : clique sur le texte à côté d'une case à cocher. Si la case bascule, le formulaire est bien construit. Sinon, il manque un <code>for</code> — et tu viens de repérer un défaut d'accessibilité en une seconde, sans regarder une ligne de code.</p>

<div class="a-retenir">
<ul>
<li><code>for</code> sur l'étiquette et <code>id</code> sur le champ, même valeur : c'est ce qui les relie.</li>
<li><code>name</code> est ce qui transmet la valeur — sans lui, le champ n'arrive jamais au serveur.</li>
<li><code>&lt;fieldset&gt;</code> et <code>&lt;legend&gt;</code> nomment un groupe, indispensable pour des boutons radio.</li>
<li>Un <code>placeholder</code> n'est pas une étiquette : il disparaît dès qu'on écrit.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : l'étiquette qui entoure le champ</summary>
<p>Il existe une seconde écriture : placer l'<code>&lt;input&gt;</code> <em>à l'intérieur</em> du <code>&lt;label&gt;</code>. Le lien est alors implicite, et <code>for</code> comme <code>id</code> deviennent inutiles. C'est plus court, et impossible à désynchroniser. L'inconvénient est que les deux éléments ne peuvent plus être séparés dans la page, ce qui gêne certaines mises en page en colonnes. Les deux formes sont correctes.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée un champ « Prénom » correctement étiqueté : un <code>&lt;label&gt;</code> relié au champ par <code>for</code> / <code>id</code>, et le champ doit être <strong>obligatoire</strong>.',
      codeDepart: '<form>\n  \n</form>',
      indices: [
        "Étiqueter un champ n’est pas le mettre à côté : il faut un lien explicite entre les deux.",
        "L’attribut <code>for</code> du label doit valoir exactement l’<code>id</code> du champ. C’est ce qui rend le libellé cliquable.",
        "<code>&lt;label for=\"prenom\"&gt;Prénom&lt;/label&gt;</code> et <code>&lt;input id=\"prenom\" name=\"prenom\" required&gt;</code>"
      ],
      solution: '<form>\n  <label for="prenom">Prénom</label>\n  <input type="text" id="prenom" name="prenom" required>\n</form>',
      verifier: function (ctx) {
        const label = ctx.doc.querySelector('label');
        if (!label) return { ok: false, message: 'Il manque la balise <code>&lt;label&gt;</code>.' };
        const cible = label.getAttribute('for');
        if (!cible) return { ok: false, message: 'Le label doit porter un attribut <code>for</code>.' };
        const champ = ctx.doc.getElementById(cible);
        if (!champ) return { ok: false, message: 'Le <code>for="' + cible + '"</code> ne correspond à aucun <code>id</code> de champ. Les deux valeurs doivent être identiques.' };
        if (champ.tagName !== 'INPUT') return { ok: false, message: 'Le label doit pointer vers un <code>&lt;input&gt;</code>.' };
        if (!champ.hasAttribute('required')) return { ok: false, message: 'Ajoute l\'attribut <code>required</code> au champ.' };
        return { ok: true, message: 'Le lien label/champ est la base de l\'accessibilité d\'un formulaire — et le confort de clic sur mobile.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> regroupe deux boutons radio (« Oui » et « Non ») dans un <code>&lt;fieldset&gt;</code> avec une <code>&lt;legend&gt;</code> posant la question. Les deux radios doivent partager le même <code>name</code>.',
      codeDepart: '<form>\n  \n</form>',
      indices: [
        "Deux choses à faire : rendre les deux boutons exclusifs, et les regrouper visuellement sous un intitulé.",
        "Le <code>name</code> identique rend les radios exclusifs. Le <code>&lt;fieldset&gt;</code> les encadre, et la <code>&lt;legend&gt;</code> le titre.",
        "Même <code>name</code>, mais un <code>id</code> et un label distincts pour chacun."
      ],
      solution: '<form>\n  <fieldset>\n    <legend>Souhaitez-vous être recontacté ?</legend>\n    <input type="radio" id="oui" name="rappel" value="oui">\n    <label for="oui">Oui</label>\n    <input type="radio" id="non" name="rappel" value="non">\n    <label for="non">Non</label>\n  </fieldset>\n</form>',
      verifier: function (ctx) {
        const fs = ctx.doc.querySelector('fieldset');
        if (!fs) return { ok: false, message: 'Il manque la balise <code>&lt;fieldset&gt;</code>.' };
        const lg = fs.querySelector('legend');
        if (!lg || !lg.textContent.trim()) return { ok: false, message: 'Ajoute une <code>&lt;legend&gt;</code> non vide qui pose la question.' };
        const radios = fs.querySelectorAll('input[type="radio"]');
        if (radios.length < 2) return { ok: false, message: 'Il faut deux boutons radio — j\'en compte ' + radios.length + '.' };
        const n1 = radios[0].getAttribute('name'), n2 = radios[1].getAttribute('name');
        if (!n1 || n1 !== n2) return { ok: false, message: 'Les deux radios doivent partager le MÊME attribut <code>name</code> — sans ça, on pourrait cocher les deux. Actuellement : « ' + n1 + ' » et « ' + n2 + ' ».' };
        const labels = fs.querySelectorAll('label');
        if (labels.length < 2) return { ok: false, message: 'Chaque radio doit avoir son propre <code>&lt;label&gt;</code>.' };
        return { ok: true, message: 'Le name partagé rend les choix exclusifs, la legend donne le sens du groupe : un formulaire compréhensible sans le voir.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Défi :</strong> crée un champ « Code postal » qui n\'accepte qu\'<strong>exactement 5 chiffres</strong>, grâce à l\'attribut <code>pattern</code>. Ajoute son label et rends-le obligatoire.',
      codeDepart: '<form>\n  \n</form>',
      indices: [
        "Le type <code>number</code> ne suffirait pas : un code postal peut commencer par zéro, et sa longueur est fixe.",
        "<code>pattern</code> accepte un motif : entre crochets les caractères autorisés, entre accolades leur nombre exact.",
        "<code>pattern=\"[0-9]{5}\"</code>, avec <code>required</code>."
      ],
      solution: '<form>\n  <label for="cp">Code postal</label>\n  <input type="text" id="cp" name="cp" pattern="[0-9]{5}" required>\n</form>',
      verifier: function (ctx) {
        const champ = ctx.doc.querySelector('input[pattern]');
        if (!champ) return { ok: false, message: 'Le champ doit porter un attribut <code>pattern</code>.' };
        const p = champ.getAttribute('pattern');
        if (!/\{5\}/.test(p)) return { ok: false, message: 'Le motif doit imposer exactement 5 caractères : <code>{5}</code>. Ton motif est « ' + p + ' ».' };
        if (!/0-9|\\d/.test(p)) return { ok: false, message: 'Le motif doit n\'accepter que des chiffres : <code>[0-9]</code> ou <code>\\d</code>. Ton motif est « ' + p + ' ».' };
        if (!champ.hasAttribute('required')) return { ok: false, message: 'Ajoute <code>required</code> au champ.' };
        const label = ctx.doc.querySelector('label[for="' + champ.id + '"]');
        if (!label) return { ok: false, message: 'Ajoute un <code>&lt;label for="' + (champ.id || 'cp') + '"&gt;</code> relié au champ.' };
        return { ok: true, message: 'Une validation de format sans une ligne de JavaScript. Rappel : à revérifier côté serveur, toujours.' };
      }
    }
  ]
},

/* ---------- html-19 ---------- */
{
  id: 'html-19',
  titre: 'L\'accessibilité',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Une page accessible est une page qui reste utilisable par une personne aveugle, malvoyante, daltonienne, ou qui navigue au clavier faute de pouvoir tenir une souris. En France, c'est une obligation légale pour les services publics. Partout ailleurs, c'est une question de qualité : les mêmes choix profitent à tout le monde, de la personne âgée au voyageur qui lit son écran en plein soleil.</p>
<p>Bonne nouvelle : l'essentiel tient dans des balises que tu connais déjà, employées pour ce qu'elles sont.</p>

<h2>Un faux bouton est un piège</h2>
<p>C'est l'erreur la plus répandue du web, et la plus facile à démontrer. Un <code>&lt;div&gt;</code> auquel on a donné l'apparence d'un bouton ressemble à un bouton, se clique comme un bouton… et s'arrête là.</p>
<pre class="bloc-code">&lt;div class="bouton"&gt;Valider&lt;/div&gt;       &lt;!-- inatteignable au clavier --&gt;
&lt;button class="bouton"&gt;Valider&lt;/button&gt; &lt;!-- atteignable, annonçable --&gt;</pre>
<p>La différence est mesurable : un <code>&lt;div&gt;</code> est <strong>non atteignable par la touche Tab</strong>, un <code>&lt;button&gt;</code> l'est d'office. Qui navigue au clavier passera donc devant ton faux bouton sans jamais pouvoir l'atteindre. Et un lecteur d'écran annonce « bouton » sur le second, rien sur le premier.</p>
<p>La règle qui en découle tient en une phrase : <strong>un bouton est un <code>&lt;button&gt;</code>, un lien est un <code>&lt;a&gt;</code></strong>. Si l'action change de page, c'est un lien ; si elle agit sur la page, c'est un bouton.</p>

<h2>Nommer ce qui n'a pas de texte</h2>
<p>Un bouton qui ne contient qu'une croix, une loupe ou une icône n'a rien à annoncer. L'attribut <code>aria-label</code> lui donne un nom, invisible à l'écran mais lu à voix haute :</p>
<pre class="bloc-code">&lt;button aria-label="Fermer la fenêtre"&gt;X&lt;/button&gt;</pre>
<p>C'est un filet de sécurité, pas une solution par défaut : quand un vrai texte est possible, il vaut toujours mieux.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Le visiteur appuie sur Tab</th><th>Avec un div</th><th>Avec un button</th></tr>
<tr><td>Arrivée sur l'élément</td><td>jamais : il est sauté</td><td>le contour de focus apparaît</td></tr>
<tr><td>Annonce vocale</td><td>aucune</td><td>« Valider, bouton »</td></tr>
<tr><td>Touche Entrée</td><td>rien</td><td>l'action se déclenche</td></tr>
</table>

<h2>Les trois autres réflexes</h2>
<ul>
<li><strong>Un <code>alt</code> qui porte l'information.</strong> Décoratif, <code>alt=""</code> ; informatif, une vraie phrase. Un graphique ne se décrit pas par « graphique » mais par ce qu'il montre ;</li>
<li><strong>Des titres dans l'ordre.</strong> Un seul <code>&lt;h1&gt;</code>, pas de niveau sauté : c'est le plan avec lequel on navigue sans voir la page ;</li>
<li><strong>La couleur ne porte jamais seule le sens.</strong> « Les champs en rouge sont obligatoires » ne dit rien à une personne daltonienne. Ajoute un mot, un symbole, un message.</li>
</ul>

<h2>Les pièges</h2>
<p><strong>Supprimer le contour de focus.</strong> On le trouve laid, on l'enlève en CSS — et l'on rend la navigation au clavier impossible : plus rien n'indique où l'on se trouve. On peut le redessiner autrement ; on ne le supprime pas.</p>
<p><strong>Mettre un <code>aria-label</code> sur un bouton qui a déjà du texte.</strong> L'attribut <em>remplace</em> le texte visible pour le lecteur d'écran. Si les deux diffèrent, la personne entend autre chose que ce qu'elle lit — et si quelqu'un dicte « clique sur Envoyer » à une commande vocale, le bouton ne répondra pas.</p>
<p><strong>Croire que l'accessibilité se rattrape à la fin.</strong> Choisir la bonne balise au moment de l'écrire ne coûte rien. Reprendre trois cents <code>&lt;div&gt;</code> six mois plus tard coûte très cher.</p>

<h2>Dans la vraie vie</h2>
<p>Tu peux tester n'importe quel site en dix secondes : pose la souris, et navigue à la touche Tab. Si tu vois clairement où tu es, et si tu peux atteindre tous les boutons, la page est correcte. Si le contour disparaît ou saute des éléments, tu viens de trouver un défaut réel.</p>

<div class="a-retenir">
<ul>
<li>Un <code>&lt;div&gt;</code> ne s'atteint pas au clavier ; un <code>&lt;button&gt;</code> si. La bonne balise fait le travail.</li>
<li><code>aria-label</code> nomme ce qui n'a pas de texte — et remplace celui qui existe, donc à manier avec soin.</li>
<li>Le contour de focus se redessine, jamais ne se supprime.</li>
<li>La couleur ne doit jamais être le seul porteur d'une information.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la première règle d'ARIA</summary>
<p>La norme ARIA fournit des dizaines d'attributs pour décrire des composants complexes. Sa toute première règle officielle est pourtant : <em>n'utilisez pas ARIA</em>. Autrement dit, si une balise HTML existe pour ce que vous faites, prenez-la — elle apporte déjà le clavier, l'annonce et le comportement attendu. ARIA sert à décrire ce que le HTML ne sait pas dire, pas à réparer une balise mal choisie.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Corrige les deux images : celle qui porte de l\'information doit avoir un <code>alt</code> <strong>descriptif</strong>, et celle qui est décorative un <code>alt</code> <strong>vide</strong>.',
      codeDepart: '<img id="info" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'50\'%3E%3Crect width=\'80\' height=\'50\' fill=\'%234f6df5\'/%3E%3C/svg%3E">\n<img id="deco" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'8\'%3E%3Crect width=\'80\' height=\'8\' fill=\'%23ccc\'/%3E%3C/svg%3E">',
      indices: [
        "Les deux images ne jouent pas le même rôle : l’une informe, l’autre décore. Leur <code>alt</code> ne doit donc pas être le même.",
        "Une image porteuse d’information a besoin d’un <code>alt</code> qui la décrit. Une image décorative doit avoir un <code>alt</code> <strong>vide</strong> — pour que le lecteur d’écran la saute.",
        "Un <code>alt</code> descriptif sur la première, et <code>alt=\"\"</code> exactement sur la seconde."
      ],
      solution: '<img id="info" alt="Graphique montrant des ventes en hausse" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'50\'%3E%3Crect width=\'80\' height=\'50\' fill=\'%234f6df5\'/%3E%3C/svg%3E">\n<img id="deco" alt="" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'8\'%3E%3Crect width=\'80\' height=\'8\' fill=\'%23ccc\'/%3E%3C/svg%3E">',
      verifier: function (ctx) {
        const info = ctx.doc.getElementById('info');
        const deco = ctx.doc.getElementById('deco');
        if (!info || !deco) return { ok: false, message: 'Garde les deux images du code de départ.' };
        if (info.getAttribute('alt') === null) return { ok: false, message: 'L\'image informative n\'a pas d\'attribut <code>alt</code> du tout.' };
        const a = info.getAttribute('alt').trim();
        if (a.length < 10) return { ok: false, message: 'Le <code>alt</code> de l\'image informative doit décrire ce qu\'elle apporte — « ' + a + ' » est trop court pour être utile.' };
        if (deco.getAttribute('alt') === null) return { ok: false, message: 'L\'image décorative doit avoir un <code>alt=""</code> vide, et non pas aucun alt : sans attribut, le lecteur d\'écran lira le nom du fichier.' };
        if (deco.getAttribute('alt').trim() !== '') return { ok: false, message: 'L\'image décorative doit avoir un <code>alt</code> strictement vide, pour être ignorée.' };
        return { ok: true, message: 'Décrire l\'information, taire la décoration : c\'est toute la règle du alt.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> ce bouton ne contient qu\'une croix. Ajoute-lui un <code>aria-label</code> qui explique ce qu\'il fait.',
      codeDepart: '<button id="fermer">X</button>',
      indices: [
        "Une croix ne veut rien dire pour qui ne la voit pas. Il faut donner au bouton un nom accessible.",
        "<code>aria-label</code> remplace le contenu visible pour les technologies d’assistance.",
        "<code>&lt;button aria-label=\"Fermer la fenêtre\"&gt;X&lt;/button&gt;</code>"
      ],
      solution: '<button id="fermer" aria-label="Fermer la fenêtre">X</button>',
      verifier: function (ctx) {
        const b = ctx.doc.getElementById('fermer');
        if (!b) return { ok: false, message: 'Garde le bouton du code de départ.' };
        const aria = b.getAttribute('aria-label');
        if (!aria) return { ok: false, message: 'Ajoute un attribut <code>aria-label</code> au bouton : sans lui, un lecteur d\'écran annoncerait seulement « X ».' };
        if (aria.trim().length < 5) return { ok: false, message: 'Le <code>aria-label</code> doit être une vraie phrase décrivant l\'action — « ' + aria + ' » est trop court.' };
        return { ok: true, message: 'Une icône seule est muette. L\'aria-label lui redonne un sens, sans rien changer à l\'apparence.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Chasse au bug :</strong> ce « bouton » est une <code>&lt;div&gt;</code> : il est inatteignable au clavier. Remplace-le par la balise correcte, sans rien perdre.',
      codeDepart: '<div id="valider" style="background:#4f6df5;color:white;padding:10px;display:inline-block">Valider</div>',
      indices: [
        "Une <code>&lt;div&gt;</code> n’est pas atteignable au clavier, et ne réagit ni à Entrée ni à Espace. Aucune classe CSS ne corrigera cela.",
        "La bonne solution n’est pas d’ajouter des attributs : c’est d’utiliser la balise prévue, qui a tout cela d’origine.",
        "Remplace simplement la <code>&lt;div&gt;</code> par un <code>&lt;button&gt;</code>."
      ],
      solution: '<button id="valider" style="background:#4f6df5;color:white;padding:10px">Valider</button>',
      verifier: function (ctx) {
        const el = ctx.doc.getElementById('valider');
        if (!el) return { ok: false, message: 'Garde un élément portant l\'id <code>valider</code>.' };
        if (el.tagName === 'DIV') return { ok: false, message: 'C\'est toujours une <code>&lt;div&gt;</code> : elle ne peut pas recevoir le focus au clavier. Utilise <code>&lt;button&gt;</code>.' };
        if (el.tagName !== 'BUTTON') return { ok: false, message: 'La balise attendue est <code>&lt;button&gt;</code> — tu as utilisé <code>&lt;' + el.tagName.toLowerCase() + '&gt;</code>.' };
        if (!el.textContent.trim()) return { ok: false, message: 'Le bouton doit garder son texte « Valider ».' };
        return { ok: true, message: 'Utiliser la bonne balise donne l\'accessibilité gratuitement : focus, touche Entrée, annonce « bouton ». Reproduire tout ça sur une div demanderait dix lignes.' };
      }
    }
  ]
},

/* ---------- html-20 ---------- */
{
  id: 'html-20',
  titre: 'Les images modernes',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Les images représentent la plus grosse part du poids d'une page, et donc la première cause de lenteur. Le problème n'est pas qu'elles soient lourdes : c'est qu'on les sert mal. On télécharge une photo de 3000 pixels de large pour l'afficher sur 400, on charge trente images alors que le visiteur n'en verra que deux, et la page saute dans tous les sens pendant qu'elles arrivent.</p>
<p>Trois attributs règlent l'essentiel.</p>

<h2>Ne charger qu'au moment utile</h2>
<pre class="bloc-code">&lt;img src="photo.jpg" alt="..." loading="lazy" width="800" height="600"&gt;</pre>
<ul>
<li><code>loading="lazy"</code> — l'image n'est téléchargée que lorsqu'elle approche de l'écran. Sur une page qui en contient trente, le gain est considérable ;</li>
<li><code>width</code> et <code>height</code> — les dimensions réelles du fichier.</li>
</ul>

<h2>Pourquoi écrire les dimensions si le CSS s'en charge</h2>
<p>C'est la question qu'on se pose toujours, et la réponse est contre-intuitive. Ces deux attributs ne servent pas à <em>dimensionner</em> l'image : ils servent à en donner les <strong>proportions</strong> avant son arrivée.</p>
<p>Sans eux, le navigateur ne sait pas quelle place réserver : il affiche le texte, puis l'image arrive et pousse tout vers le bas. C'est ce qui provoque ces sauts désagréables pendant le chargement — et le clic parti au mauvais endroit parce que le bouton a bougé au dernier moment. Avec eux, la place est réservée dès le départ, et rien ne bouge.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Sans width et height</th><th>Avec</th></tr>
<tr><td>Le texte s'affiche</td><td>immédiatement</td><td>immédiatement</td></tr>
<tr><td>Place de l'image</td><td>zéro : rien n'est réservé</td><td>un rectangle vide aux bonnes proportions</td></tr>
<tr><td>L'image arrive</td><td>tout le contenu est poussé vers le bas</td><td>elle se pose dans son emplacement</td></tr>
<tr><td>Le visiteur clique</td><td>le bouton a bougé entre-temps</td><td>rien n'a bougé</td></tr>
</table>

<h2>Une image différente selon l'écran</h2>
<p>La balise <code>&lt;picture&gt;</code> propose plusieurs fichiers et laisse le navigateur choisir :</p>
<pre class="bloc-code">&lt;picture&gt;
  &lt;source media="(max-width: 600px)" srcset="petite.jpg"&gt;
  &lt;img src="grande.jpg" alt="Le port au lever du jour"&gt;
&lt;/picture&gt;</pre>
<p>Sur un écran de moins de 600 pixels, c'est <code>petite.jpg</code> qui part. Sinon, <code>grande.jpg</code>. Le <code>&lt;img&gt;</code> final n'est pas optionnel : c'est lui qui porte le <code>alt</code>, et c'est lui qui sert de repli si aucune <code>&lt;source&gt;</code> ne convient.</p>

<h2>Les pièges</h2>
<p><strong>Mettre <code>loading="lazy"</code> sur la grande image du haut.</strong> Celle-là est visible immédiatement : la différer retarde précisément ce que le visiteur attend. On la réserve aux images situées plus bas.</p>
<p><strong>Donner des dimensions qui ne sont pas celles du fichier.</strong> Les proportions seraient fausses, et l'image s'étirerait ou laisserait un vide. Ces valeurs décrivent le fichier, pas la taille d'affichage souhaitée — celle-là reste l'affaire du CSS.</p>
<p><strong>Oublier le <code>&lt;img&gt;</code> dans un <code>&lt;picture&gt;</code>.</strong> Sans lui, rien ne s'affiche du tout : les <code>&lt;source&gt;</code> ne sont que des propositions.</p>

<h2>Dans la vraie vie</h2>
<p>Les navigateurs mesurent maintenant ces sauts de mise en page et les comptent dans la note de qualité d'un site — une note qui influence le classement dans les résultats de recherche. Deux attributs sur chaque image, et le problème disparaît.</p>

<div class="a-retenir">
<ul>
<li><code>loading="lazy"</code> diffère le téléchargement — mais jamais pour l'image du haut.</li>
<li><code>width</code> et <code>height</code> réservent la place et suppriment les sauts de mise en page.</li>
<li><code>&lt;picture&gt;</code> propose plusieurs fichiers ; le <code>&lt;img&gt;</code> final reste obligatoire.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les formats modernes</summary>
<p>Au-delà du JPEG et du PNG, les formats WebP et AVIF produisent des fichiers deux à trois fois plus légers à qualité égale. On les sert avec <code>&lt;picture&gt;</code> et plusieurs <code>&lt;source&gt;</code> : le navigateur prend le premier format qu'il sait lire, et retombe sur le JPEG s'il ne connaît aucun des autres. C'est la façon la plus simple d'alléger un site sans rien perdre.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Complète cette image avec les trois attributs qui évitent les sauts de mise en page et le chargement inutile : <code>width</code>, <code>height</code> et <code>loading="lazy"</code>. (Elle fait 80 par 50.)',
      codeDepart: '<img id="photo" alt="Un rectangle bleu" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'50\'%3E%3Crect width=\'80\' height=\'50\' fill=\'%234f6df5\'/%3E%3C/svg%3E">',
      indices: [
        "Trois attributs, pour deux problèmes : la page qui sursaute au chargement, et les images inutilement téléchargées.",
        "<code>width</code> et <code>height</code> réservent la place à l’avance ; <code>loading=\"lazy\"</code> diffère le chargement jusqu’à ce que l’image approche de l’écran.",
        "<code>width=\"80\" height=\"50\" loading=\"lazy\"</code>"
      ],
      solution: '<img id="photo" alt="Un rectangle bleu" width="80" height="50" loading="lazy" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'50\'%3E%3Crect width=\'80\' height=\'50\' fill=\'%234f6df5\'/%3E%3C/svg%3E">',
      verifier: function (ctx) {
        const img = ctx.doc.getElementById('photo');
        if (!img) return { ok: false, message: 'Garde l\'image du code de départ.' };
        if (!img.getAttribute('width') || !img.getAttribute('height')) {
          return { ok: false, message: 'Ajoute les attributs <code>width</code> et <code>height</code> : ils permettent au navigateur de réserver la place avant le chargement.' };
        }
        if (Number(img.getAttribute('width')) !== 80 || Number(img.getAttribute('height')) !== 50) {
          return { ok: false, message: 'Les dimensions réelles de l\'image sont 80 par 50 — indique bien ces valeurs.' };
        }
        if (img.getAttribute('loading') !== 'lazy') return { ok: false, message: 'Ajoute <code>loading="lazy"</code> pour différer le chargement.' };
        return { ok: true, message: 'Trois attributs, et la page ne saute plus au chargement. C\'est mesuré par Google sous le nom de « décalage cumulatif ».' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> construis un <code>&lt;picture&gt;</code> qui affiche une image <strong>différente</strong> en dessous de 600px de large, avec une <code>&lt;img&gt;</code> de repli obligatoire.',
      codeDepart: '<!-- les deux images à utiliser :\n     mobile : data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'90\'%3E%3Crect width=\'60\' height=\'90\' fill=\'%23c04f45\'/%3E%3C/svg%3E\n     bureau : data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%234f6df5\'/%3E%3C/svg%3E -->\n\n',
      indices: [
        "Une seule image ne peut pas convenir à tous les écrans. Le <code>&lt;picture&gt;</code> permet d’en proposer plusieurs et de laisser le navigateur choisir.",
        "Chaque <code>&lt;source&gt;</code> porte sa condition dans <code>media</code> et son image dans <code>srcset</code>. L’<code>&lt;img&gt;</code> final est <strong>obligatoire</strong> : c’est le repli.",
        "<code>&lt;picture&gt;&lt;source media=\"(max-width: 600px)\" srcset=\"…\"&gt;&lt;img src=\"…\" alt=\"…\"&gt;&lt;/picture&gt;</code>"
      ],
      solution: '<picture>\n  <source media="(max-width: 600px)" srcset="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'60\' height=\'90\'%3E%3Crect width=\'60\' height=\'90\' fill=\'%23c04f45\'/%3E%3C/svg%3E">\n  <img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'60\'%3E%3Crect width=\'120\' height=\'60\' fill=\'%234f6df5\'/%3E%3C/svg%3E" alt="Bannière du site">\n</picture>',
      verifier: function (ctx) {
        const pic = ctx.doc.querySelector('picture');
        if (!pic) return { ok: false, message: 'Il manque la balise <code>&lt;picture&gt;</code>.' };
        const source = pic.querySelector('source');
        if (!source) return { ok: false, message: 'Ajoute au moins une balise <code>&lt;source&gt;</code> dans le picture.' };
        if (!source.getAttribute('media')) return { ok: false, message: 'La <code>&lt;source&gt;</code> doit porter un attribut <code>media</code> qui indique la condition (ex. <code>(max-width: 600px)</code>).' };
        if (!source.getAttribute('srcset')) return { ok: false, message: 'La <code>&lt;source&gt;</code> utilise <code>srcset</code> (et non <code>src</code>) pour désigner son image.' };
        const img = pic.querySelector('img');
        if (!img) return { ok: false, message: 'La balise <code>&lt;img&gt;</code> de repli est OBLIGATOIRE dans un picture : c\'est elle qui s\'affiche par défaut.' };
        if (!img.getAttribute('alt')) return { ok: false, message: 'Le <code>alt</code> se met sur la balise <code>&lt;img&gt;</code>, pas sur les sources.' };
        return { ok: true, message: 'Le navigateur choisit la source adaptée et retombe sur l\'img si aucune ne convient. Un cadrage vertical sur mobile, horizontal sur écran large.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Pourquoi indiquer <code>width</code> et <code>height</code> sur une image, même si le CSS gère déjà sa taille ?',
      choix: [
        'Pour que le navigateur réserve la place et que la page ne saute pas au chargement',
        'Parce que le CSS ne fonctionne pas sur les images',
        'Pour réduire le poids du fichier image',
        'Parce que c\'est obligatoire en HTML'
      ],
      bonne: 0,
      explication: 'Sans ces attributs, le navigateur ignore les proportions de l\'image tant qu\'il ne l\'a pas téléchargée : le texte qui suit saute brutalement quand elle arrive. C\'est l\'un des critères de qualité mesurés par Google.',
      aides: [
        null,
        'Le CSS fonctionne parfaitement sur les images, et c\'est bien lui qui gère l\'affichage final. Les attributs servent à autre chose : informer le navigateur AVANT le chargement.',
        'Le poids du fichier ne change pas d\'un octet : c\'est une question de mise en page pendant le chargement.',
        'Ce n\'est pas obligatoire — c\'est simplement une très bonne pratique.'
      ]
    }
  ]
},

/* ---------- html-21 ---------- */
{
  id: 'html-21',
  titre: 'Les métadonnées de partage',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Colle le lien d'une page dans une messagerie, et un aperçu apparaît : une image, un titre, une description. Cet aperçu ne s'invente pas. Il est lu dans des balises <code>&lt;meta&gt;</code> placées dans le <code>&lt;head&gt;</code>.</p>
<p>Sans elles, le lien s'affiche en texte brut, ou la messagerie attrape au hasard une image de la page — souvent le logo, parfois un bouton. Un bon contenu partagé sans aperçu est cliqué beaucoup moins : ces trois lignes décident de la première impression.</p>

<h2>Open Graph</h2>
<pre class="bloc-code">&lt;head&gt;
  &lt;meta property="og:title" content="Recettes de saison"&gt;
  &lt;meta property="og:description" content="Trente recettes simples, par mois."&gt;
  &lt;meta property="og:image" content="https://monsite.fr/apercu.jpg"&gt;
  &lt;meta property="og:url" content="https://monsite.fr/recettes"&gt;
&lt;/head&gt;</pre>
<p>Open Graph a été créé par un réseau social, puis adopté par tous les autres : c'est aujourd'hui le standard de fait. Remarque la différence avec les <code>&lt;meta&gt;</code> que tu connais : ici l'attribut s'appelle <code>property</code>, et non <code>name</code>.</p>

<h2>L'adresse de l'image doit être complète</h2>
<p>C'est la règle qui coince le plus souvent. <code>og:image</code> exige une adresse <strong>absolue</strong> — avec <code>https://</code> et le nom de domaine. Pas <code>apercu.jpg</code>, pas <code>/images/apercu.jpg</code>.</p>
<p>La raison est simple une fois dite : ce n'est pas ton visiteur qui lit cette balise, c'est le serveur de la messagerie, depuis ailleurs. Une adresse relative n'a de sens que par rapport à la page qui la contient — ce serveur, lui, n'a aucun moyen de la compléter. Il cherche l'image, ne la trouve pas, et n'affiche rien.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>Tu colles le lien</td><td>La messagerie repère une adresse dans ton message.</td></tr>
<tr><td>Elle va chercher la page</td><td>Depuis ses propres serveurs, pas depuis ton téléphone.</td></tr>
<tr><td>Elle lit le <code>&lt;head&gt;</code></td><td>Elle y cherche les <code>og:</code>, et s'arrête là : le <code>&lt;body&gt;</code> ne l'intéresse pas.</td></tr>
<tr><td>Elle fabrique l'aperçu</td><td>Titre, description, image — et met le tout en cache.</td></tr>
</table>
<p>Le dernier mot compte : <strong>en cache</strong>. Corriger une balise ne change pas un aperçu déjà fabriqué. Les grandes plateformes offrent un outil pour forcer la relecture.</p>

<h2>Les pièges</h2>
<p><strong>Écrire <code>name</code> au lieu de <code>property</code>.</strong> La balise est ignorée, sans aucun message. C'est la faute de frappe la plus fréquente de cette leçon, et la plus silencieuse.</p>
<p><strong>Une image trop petite.</strong> En dessous de 600 pixels de large, la plupart des plateformes affichent une vignette minuscule à côté du texte, au lieu de la grande image. Une proportion de 1200 sur 630 est la valeur sûre.</p>
<p><strong>Croire qu'<code>og:title</code> remplace <code>&lt;title&gt;</code>.</strong> Ce sont deux publics : le <code>&lt;title&gt;</code> sert à l'onglet et au moteur de recherche, l'<code>og:title</code> à l'aperçu partagé. Il manque souvent le nom du site dans le second, parce que le contexte est déjà donné par ailleurs.</p>

<h2>Dans la vraie vie</h2>
<p>Chaque aperçu que tu as vu dans une conversation vient de là. Les rédactions soignent particulièrement l'<code>og:image</code> : c'est elle qui occupe le plus de place à l'écran, et donc ce qui décide du clic. Tu peux vérifier n'importe quel site en affichant sa source et en cherchant « og: ».</p>

<div class="a-retenir">
<ul>
<li>Les balises <code>og:</code> du <code>&lt;head&gt;</code> fabriquent l'aperçu d'un lien partagé.</li>
<li>Elles s'écrivent avec <code>property</code>, pas <code>name</code> — une confusion qui les rend muettes.</li>
<li><code>og:image</code> exige une adresse absolue : c'est un serveur distant qui la lit.</li>
<li>Les aperçus sont mis en cache : une correction n'est pas visible tout de suite.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : et si on ne met rien ?</summary>
<p>Les plateformes se rabattent alors sur le <code>&lt;title&gt;</code> et la <code>meta description</code>, et cherchent une image dans la page — la première assez grande, en général. Le résultat est imprévisible : le logo, une publicité, ou rien. Ce n'est pas catastrophique, mais tu laisses quelqu'un d'autre choisir comment ton travail se présente.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Ajoute les trois métadonnées Open Graph essentielles : <code>og:title</code>, <code>og:description</code> et <code>og:image</code> (avec une adresse absolue).',
      codeDepart: '<head>\n  <meta charset="UTF-8">\n  <title>Mon cours de code</title>\n  \n</head>\n<body>\n  <h1>Mon cours</h1>\n</body>',
      indices: [
        "Ces métadonnées ne servent ni à l’affichage ni au référencement : elles décident de l’aperçu quand on partage le lien.",
        "Elles s’écrivent avec <code>property</code>, et non <code>name</code> — c’est la particularité d’Open Graph, et le piège le plus courant.",
        "<code>&lt;meta property=\"og:title\" content=\"…\"&gt;</code>, et de même pour <code>og:description</code> et <code>og:image</code>."
      ],
      solution: '<head>\n  <meta charset="UTF-8">\n  <title>Mon cours de code</title>\n  <meta property="og:title" content="Mon cours de code">\n  <meta property="og:description" content="Apprendre à programmer depuis zéro.">\n  <meta property="og:image" content="https://exemple.fr/apercu.jpg">\n</head>\n<body>\n  <h1>Mon cours</h1>\n</body>',
      verifier: function (ctx) {
        const trouve = p => ctx.doc.querySelector('meta[property="' + p + '"]');
        for (const p of ['og:title', 'og:description', 'og:image']) {
          const m = trouve(p);
          if (!m) {
            if (ctx.doc.querySelector('meta[name="' + p + '"]')) {
              return { ok: false, message: 'La balise <code>' + p + '</code> utilise l\'attribut <code>property</code>, pas <code>name</code> — c\'est la particularité d\'Open Graph.' };
            }
            return { ok: false, message: 'Il manque la balise <code>' + p + '</code>.' };
          }
          if (!m.getAttribute('content') || !m.getAttribute('content').trim()) {
            return { ok: false, message: 'La balise <code>' + p + '</code> doit avoir un <code>content</code> non vide.' };
          }
        }
        const img = trouve('og:image').getAttribute('content');
        if (!/^https?:\/\//.test(img.trim())) {
          return { ok: false, message: 'L\'adresse de <code>og:image</code> doit être absolue et commencer par <code>https://</code> — tu as mis « ' + img + ' ». Les réseaux sociaux lisent ta page depuis leurs serveurs.' };
        }
        return { ok: true, message: 'Ton lien affichera désormais un aperçu soigné partout où il sera partagé.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Entraînement :</strong> complète le <code>&lt;head&gt;</code> avec les deux métadonnées indispensables à toute page : le <code>viewport</code> et la <code>description</code>.',
      codeDepart: '<head>\n  <meta charset="UTF-8">\n  <title>Mon site</title>\n  \n</head>\n<body>\n  <h1>Bienvenue</h1>\n</body>',
      indices: [
        "Deux balises qu’on trouve sur absolument toutes les pages professionnelles, et dont l’absence se voit immédiatement.",
        "Sans le <code>viewport</code>, la page s’affiche en miniature sur mobile. Sans la <code>description</code>, le moteur de recherche invente le texte sous ton lien.",
        "<code>&lt;meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"&gt;</code> et <code>&lt;meta name=\"description\" content=\"…\"&gt;</code>"
      ],
      solution: '<head>\n  <meta charset="UTF-8">\n  <title>Mon site</title>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <meta name="description" content="Un site pour apprendre à coder depuis zéro.">\n</head>\n<body>\n  <h1>Bienvenue</h1>\n</body>',
      verifier: function (ctx) {
        const vp = ctx.doc.querySelector('meta[name="viewport"]');
        if (!vp) return { ok: false, message: 'Il manque la balise <code>viewport</code> — sans elle, la page s\'affiche en miniature sur mobile.' };
        if (!/width=device-width/.test(vp.getAttribute('content') || '')) {
          return { ok: false, message: 'Le contenu du viewport doit contenir <code>width=device-width</code>.' };
        }
        const desc = ctx.doc.querySelector('meta[name="description"]');
        if (!desc) return { ok: false, message: 'Il manque la balise <code>description</code>, qui fournit le texte affiché sous ton lien dans les résultats de recherche.' };
        if ((desc.getAttribute('content') || '').trim().length < 15) {
          return { ok: false, message: 'La description doit être une vraie phrase (au moins une quinzaine de caractères).' };
        }
        return { ok: true, message: 'Ces deux balises sont sur absolument toutes les pages professionnelles. Les oublier se voit immédiatement.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Pourquoi <code>og:image</code> doit-elle utiliser une adresse absolue ?',
      choix: [
        'Parce que les réseaux sociaux lisent la page depuis leurs propres serveurs',
        'Parce que les adresses relatives sont interdites en HTML',
        'Parce que l\'image doit être plus grande',
        'Parce que le HTML ne comprend pas les chemins relatifs dans le head'
      ],
      bonne: 0,
      explication: 'Quand tu partages un lien, Facebook ou WhatsApp vont chercher ta page depuis leur infrastructure. Une adresse comme "/images/apercu.jpg" serait interprétée par rapport à LEUR domaine, où elle n\'existe pas.',
      aides: [
        null,
        'Les adresses relatives sont parfaitement valides en HTML, et très utilisées ailleurs dans la page.',
        'La taille de l\'image est un autre sujet (on recommande 1200 par 630). Ici, c\'est l\'adresse qui pose problème.',
        'Le head comprend très bien les chemins relatifs — le problème vient de qui lit la page, pas du HTML.'
      ]
    }
  ]
},

/* ---------- html-22 ---------- */
{
  id: 'html-22',
  titre: 'Vérifier et déboguer sa page',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Dernière leçon du module, et la plus utile le jour où ça ne marche pas. Le HTML a une particularité qui le rend déroutant à déboguer : <strong>il ne plante jamais</strong>. Une balise non fermée, un attribut inventé, une imbrication interdite — rien ne s'arrête, rien ne s'affiche en rouge. La page sort simplement de travers.</p>
<p>Chercher au hasard dans deux cents lignes est épuisant. Voici de quoi chercher méthodiquement.</p>

<h2>Les quatre outils</h2>
<ul>
<li><strong>Le validateur du W3C</strong> — <code>validator.w3.org</code> analyse ton HTML et liste chaque erreur avec son numéro de ligne : balises non fermées, attributs inconnus, imbrications interdites ;</li>
<li><strong>L'inspecteur</strong> — la touche F12 ouvre les outils de ton navigateur. L'onglet « Éléments » montre l'arbre <em>tel que le navigateur l'a compris</em>, pas tel que tu l'as écrit ;</li>
<li><strong>La console</strong> — dans ces mêmes outils, elle signale les fichiers introuvables : une image, une feuille de style ;</li>
<li><strong>L'indentation</strong> — le plus simple, et celui qu'on néglige. Un code bien décalé rend une balise non fermée visible à l'œil nu.</li>
</ul>

<h2>L'inspecteur dit la vérité</h2>
<p>C'est l'outil décisif, pour une raison précise : le navigateur <em>répare</em> ce qu'il ne comprend pas, silencieusement. Il ferme les balises restées ouvertes, déplace ce qui n'est pas à sa place, ajoute un <code>&lt;tbody&gt;</code>. Comparer ton fichier à l'arbre de l'inspecteur, c'est voir exactement ce qu'il a rafistolé — et donc où tu t'es trompé.</p>

<h2>Pas à pas</h2>
<p>La méthode, quand une page s'affiche de travers :</p>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qu'on cherche</th></tr>
<tr><td>1. Regarder le symptôme</td><td>Tout est en gros ? en gras ? Le défaut commence où, exactement ?</td></tr>
<tr><td>2. Remonter juste avant</td><td>La faute est presque toujours au <em>début</em> de la zone abîmée.</td></tr>
<tr><td>3. Ouvrir l'inspecteur</td><td>Comparer l'arbre réel à ce qu'on croyait avoir écrit.</td></tr>
<tr><td>4. Passer au validateur</td><td>Si rien ne saute aux yeux : il donne la ligne.</td></tr>
<tr><td>5. Corriger une seule chose</td><td>Puis regarder à nouveau. Deux corrections d'un coup brouillent la piste.</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Les trois symptômes qui ont chacun une cause presque certaine.</strong> Tout le texte en gros : une balise de titre non fermée. Tout en gras à partir d'un endroit : un <code>&lt;strong&gt;</code> fermé sans sa barre oblique. Des accents en symboles bizarres : <code>&lt;meta charset="UTF-8"&gt;</code> absent du <code>&lt;head&gt;</code>. Connaître ces trois-là fait gagner un temps considérable.</p>
<p><strong>Corriger sans comprendre.</strong> Ajouter des balises au hasard jusqu'à ce que ça rentre dans l'ordre donne parfois le bon résultat — et laisse un code que personne, toi compris, ne saura modifier le mois prochain.</p>
<p><strong>Croire qu'une page valide est une bonne page.</strong> Le validateur contrôle la grammaire, pas le sens. Une page entièrement faite de <code>&lt;div&gt;</code>, sans un seul <code>alt</code>, peut passer sans la moindre erreur. Il élimine les fautes de syntaxe : c'est précieux, et ce n'est pas tout.</p>

<h2>Dans la vraie vie</h2>
<p>L'inspecteur est l'outil que les développeurs ouvrent le plus souvent, tous métiers confondus. Il sert aussi à comprendre comment les autres s'y prennent : sur n'importe quel site, tu peux ouvrir l'arbre et lire la structure. Beaucoup de gens ont appris le métier exactement comme ça.</p>

<div class="a-retenir">
<ul>
<li>Le HTML ne plante pas : il se répare tout seul, et c'est ce qui rend ses fautes discrètes.</li>
<li>L'inspecteur (F12) montre l'arbre <em>compris</em> par le navigateur — comparer les deux révèle la faute.</li>
<li>Tout en gros, tout en gras, accents cassés : trois symptômes, trois causes quasi certaines.</li>
<li>Une page valide n'est pas forcément une bonne page.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi le HTML pardonne-t-il tout ?</summary>
<p>C'est un choix d'origine, et il a été âprement discuté. Au début des années 2000, une tentative — XHTML — a voulu imposer la rigueur : la moindre balise mal fermée devait afficher une page d'erreur. L'idée a échoué, parce que des millions de pages existantes seraient devenues illisibles du jour au lendemain. La norme actuelle décrit donc, en détail, comment un navigateur doit rattraper chaque sorte de faute — pour que tous la rattrapent de la même façon.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Cette page contient <strong>une balise jamais fermée</strong>, ce qui met tout le texte en gras. Trouve-la et corrige.',
      codeDepart: '<h2>Mon article</h2>\n<p>Un mot <strong>important dans la phrase.</p>\n<p id="suite">Ce paragraphe ne devrait PAS être en gras.</p>',
      indices: [
        "Tout le texte est en gras à partir d’un certain point : c’est le signe qu’une balise ouverte n’a jamais été refermée.",
        "Il ne s’agit pas de la supprimer, mais de la <strong>fermer</strong> au bon endroit — juste après le mot à mettre en valeur.",
        "Ajoute <code>&lt;/strong&gt;</code> après le mot important."
      ],
      solution: '<h2>Mon article</h2>\n<p>Un mot <strong>important</strong> dans la phrase.</p>\n<p id="suite">Ce paragraphe ne devrait PAS être en gras.</p>',
      verifier: function (ctx) {
        const win = ctx.doc.defaultView;
        const suite = ctx.doc.getElementById('suite');
        if (!suite) return { ok: false, message: 'Garde le second paragraphe avec son id <code>suite</code>.' };
        const g = win.getComputedStyle(suite).fontWeight;
        if (Number(g) >= 600 || g === 'bold') return { ok: false, message: 'Le second paragraphe est encore en gras : la balise <code>&lt;strong&gt;</code> n\'est toujours pas refermée.' };
        const strong = ctx.doc.querySelector('strong');
        if (!strong) return { ok: false, message: 'Garde une balise <code>&lt;strong&gt;</code> autour du mot important — il ne s\'agit pas de la supprimer mais de la fermer.' };
        if (strong.textContent.length > 30) return { ok: false, message: 'Le <code>&lt;strong&gt;</code> englobe encore trop de texte : ferme-le juste après le mot à mettre en valeur.' };
        return { ok: true, message: 'Une balise non fermée contamine tout ce qui suit. C\'est le premier réflexe à avoir quand une page « déraille » d\'un coup.' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Chasse au bug :</strong> cliquer sur le libellé « Email » ne place pas le curseur dans le champ. Répare le lien entre les deux.',
      codeDepart: '<label for="courriel">Email</label>\n<input type="email" id="email" name="email">',
      indices: [
        "Le label existe, le champ aussi, et pourtant cliquer sur l’un n’active pas l’autre. C’est que le lien entre eux est rompu.",
        "Le <code>for</code> du label doit valoir <strong>exactement</strong> l’<code>id</code> du champ. Ici, les deux ne portent pas le même mot.",
        "Aligne les deux : soit le <code>for</code>, soit l’<code>id</code> — mais ils doivent être identiques."
      ],
      solution: '<label for="email">Email</label>\n<input type="email" id="email" name="email">',
      verifier: function (ctx) {
        const label = ctx.doc.querySelector('label');
        const input = ctx.doc.querySelector('input');
        if (!label || !input) return { ok: false, message: 'Garde le label et le champ du code de départ.' };
        const f = label.getAttribute('for');
        const i = input.getAttribute('id');
        if (!f || !i) return { ok: false, message: 'Le label doit avoir un <code>for</code> et le champ un <code>id</code>.' };
        if (f !== i) return { ok: false, message: 'Le <code>for="' + f + '"</code> ne correspond toujours pas à l\'<code>id="' + i + '"</code>. Les deux valeurs doivent être strictement identiques.' };
        return { ok: true, message: 'Label et champ reconnectés. Ce bug est invisible à l\'œil : la page a l\'air correcte, mais elle ne l\'est pas.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Les accents de ta page s\'affichent en symboles bizarres. Quelle est la cause la plus probable ?',
      choix: [
        'La balise <code>&lt;meta charset="UTF-8"&gt;</code> manque dans le head',
        'La police d\'écriture ne contient pas les accents',
        'Le fichier CSS n\'est pas chargé',
        'Il faut échapper chaque accent en HTML'
      ],
      bonne: 0,
      explication: 'Sans déclaration d\'encodage, le navigateur devine — et se trompe souvent. La balise charset doit être la toute première du head, avant le title, pour qu\'il sache lire correctement le reste du fichier.',
      aides: [
        null,
        'Toutes les polices courantes contiennent les accents. Le problème se situe avant l\'affichage : dans le décodage du fichier.',
        'Le CSS n\'a aucun rôle dans le décodage des caractères. C\'est le HTML qui déclare son encodage.',
        'C\'était la pratique il y a vingt ans. Avec UTF-8 correctement déclaré, on écrit les accents normalement.'
      ]
    }
  ]
}
];
