/* ===== HTML — troisième partie (html-15 à html-22) ===== */
window.DATA_HTML3 = [

/* ---------- html-15 ---------- */
{
  id: 'html-15',
  titre: 'Les listes de définition',
  contenu: `
<p>Tu connais <code>&lt;ul&gt;</code> (liste à puces) et <code>&lt;ol&gt;</code> (liste numérotée). Il existe une troisième liste, moins connue et pourtant très utile : la <strong>liste de définition</strong>, qui associe des termes à leur explication.</p>

<pre class="bloc-code">&lt;dl&gt;
  &lt;dt&gt;HTML&lt;/dt&gt;
  &lt;dd&gt;Le langage qui décrit la structure d'une page.&lt;/dd&gt;

  &lt;dt&gt;CSS&lt;/dt&gt;
  &lt;dd&gt;Le langage qui décrit son apparence.&lt;/dd&gt;
&lt;/dl&gt;</pre>

<table class="memo-table">
<tr><th>Balise</th><th>Signifie</th><th>Contient</th></tr>
<tr><td>&lt;dl&gt;</td><td>definition list</td><td>toute la liste</td></tr>
<tr><td>&lt;dt&gt;</td><td>definition term</td><td>le terme</td></tr>
<tr><td>&lt;dd&gt;</td><td>definition description</td><td>son explication</td></tr>
</table>

<h2>Quand l'utiliser</h2>
<p>Dès qu'il s'agit de <strong>paires nom / valeur</strong> : un glossaire, les caractéristiques d'un produit, une fiche d'identité, une FAQ. Un même <code>&lt;dt&gt;</code> peut d'ailleurs recevoir plusieurs <code>&lt;dd&gt;</code>.</p>

<h2>Pourquoi pas un simple tableau ?</h2>
<p>Un tableau sert à croiser des <strong>données à deux dimensions</strong> (des lignes et des colonnes qui ont chacune un sens). Une liste de définition exprime une relation à une seule dimension : ce terme, cette explication. Choisir la bonne balise, c'est donner du sens à ta page — pour les moteurs de recherche comme pour les lecteurs d'écran.</p>

<div class="astuce"><div>Les <code>&lt;dd&gt;</code> sont indentés par défaut. Comme toujours, l'apparence se corrige en CSS : le choix de la balise doit dépendre du <em>sens</em>, jamais du rendu.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée une liste de définition avec deux termes : <code>HTML</code> et <code>CSS</code>, chacun suivi de son explication.',
      codeDepart: '<h2>Glossaire</h2>\n\n',
      indice: '<code>&lt;dl&gt;</code> autour du tout, puis alternance de <code>&lt;dt&gt;</code> (le terme) et <code>&lt;dd&gt;</code> (l\'explication).',
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
      indice: 'Même structure : trois <code>&lt;dt&gt;</code> et trois <code>&lt;dd&gt;</code> dans un <code>&lt;dl&gt;</code>.',
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
<p>Au-delà de <code>&lt;strong&gt;</code> et <code>&lt;em&gt;</code>, HTML propose des balises qui donnent un <strong>sens précis</strong> à des fragments de texte.</p>

<table class="memo-table">
<tr><th>Balise</th><th>Sens</th></tr>
<tr><td>&lt;abbr title="..."&gt;</td><td>une abréviation, avec sa signification</td></tr>
<tr><td>&lt;time datetime="..."&gt;</td><td>une date lisible par une machine</td></tr>
<tr><td>&lt;mark&gt;</td><td>un passage surligné, pertinent</td></tr>
<tr><td>&lt;sup&gt; / &lt;sub&gt;</td><td>exposant / indice</td></tr>
<tr><td>&lt;q&gt; / &lt;blockquote&gt;</td><td>citation courte / longue</td></tr>
<tr><td>&lt;cite&gt;</td><td>la source d'une citation</td></tr>
</table>

<h2>Pourquoi ne pas simplement styler avec CSS ?</h2>
<p>Parce que ces balises transmettent une <strong>information</strong>, pas seulement une apparence :</p>
<ul>
<li><code>&lt;abbr title&gt;</code> affiche la signification au survol, et un lecteur d'écran peut l'annoncer ;</li>
<li><code>&lt;time datetime&gt;</code> donne la date dans un format qu'une machine comprend, quelle que soit la façon dont tu l'écris à l'écran. C'est ce qui permet à un moteur de recherche d'afficher la date d'un article ;</li>
<li><code>&lt;mark&gt;</code> dit « ce passage est pertinent pour ce que cherche le lecteur » — c'est ce qu'utilise un site pour surligner les mots d'une recherche.</li>
</ul>

<div class="astuce"><div>Le format de <code>datetime</code> est toujours le même : <strong>AAAA-MM-JJ</strong>, du plus grand au plus petit. C'est la norme internationale ISO 8601, et elle a un avantage précieux : trier ces dates alphabétiquement revient à les trier chronologiquement.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Écris une phrase contenant une <strong>abréviation</strong> <code>HTML</code> dont le <code>title</code> donne la signification complète, et une <strong>date</strong> du 14 juillet 2024 balisée avec son attribut <code>datetime</code>.',
      codeDepart: '<p>Cours publié le ...</p>\n',
      indice: '<code>&lt;abbr title="HyperText Markup Language"&gt;HTML&lt;/abbr&gt;</code> et <code>&lt;time datetime="2024-07-14"&gt;14 juillet 2024&lt;/time&gt;</code>',
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
      indice: '<code>&lt;mark&gt;25&lt;/mark&gt; m&lt;sup&gt;2&lt;/sup&gt;</code>',
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
      indice: '<code>&lt;blockquote&gt;&lt;p&gt;Le texte cité&lt;/p&gt;&lt;/blockquote&gt;</code> puis <code>&lt;p&gt;&lt;cite&gt;Nom de l\'auteur&lt;/cite&gt;&lt;/p&gt;</code>',
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
<p>Tu sais faire un tableau simple. Voici les balises qui le rendent réellement exploitable.</p>

<pre class="bloc-code">&lt;table&gt;
  &lt;caption&gt;Ventes du premier trimestre&lt;/caption&gt;
  &lt;thead&gt;
    &lt;tr&gt;&lt;th&gt;Mois&lt;/th&gt;&lt;th&gt;Montant&lt;/th&gt;&lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;&lt;td&gt;Janvier&lt;/td&gt;&lt;td&gt;1 200 €&lt;/td&gt;&lt;/tr&gt;
  &lt;/tbody&gt;
  &lt;tfoot&gt;
    &lt;tr&gt;&lt;td&gt;Total&lt;/td&gt;&lt;td&gt;2 650 €&lt;/td&gt;&lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;</pre>

<table class="memo-table">
<tr><th>Balise</th><th>Rôle</th></tr>
<tr><td>&lt;caption&gt;</td><td>le titre du tableau, annoncé aux lecteurs d'écran</td></tr>
<tr><td>&lt;thead&gt;</td><td>la ligne d'en-tête</td></tr>
<tr><td>&lt;tbody&gt;</td><td>le corps des données</td></tr>
<tr><td>&lt;tfoot&gt;</td><td>la ligne de totaux</td></tr>
<tr><td>&lt;th&gt;</td><td>une cellule d'en-tête (au lieu de &lt;td&gt;)</td></tr>
</table>

<h2>Fusionner des cellules</h2>
<pre class="bloc-code">&lt;td colspan="2"&gt;Sur deux colonnes&lt;/td&gt;
&lt;td rowspan="3"&gt;Sur trois lignes&lt;/td&gt;</pre>

<h2>scope : préciser ce que l'en-tête décrit</h2>
<pre class="bloc-code">&lt;th scope="col"&gt;Mois&lt;/th&gt;
&lt;th scope="row"&gt;Janvier&lt;/th&gt;</pre>
<p>Sans <code>scope</code>, un lecteur d'écran ne sait pas rattacher une cellule à son en-tête. Avec, il annonce « Mois : Janvier, Montant : 1 200 € » — le tableau redevient compréhensible sans le voir.</p>

<div class="attention"><div>Un tableau sert à présenter des <strong>données</strong>, jamais à faire une mise en page. Cette pratique a disparu depuis quinze ans : Flexbox et Grid font ça bien mieux, et un tableau de mise en page rend la page incompréhensible pour un lecteur d'écran.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Structure ce tableau correctement : ajoute un <code>&lt;caption&gt;</code>, mets la ligne d\'en-tête dans un <code>&lt;thead&gt;</code> avec des <code>&lt;th&gt;</code>, et les données dans un <code>&lt;tbody&gt;</code>.',
      codeDepart: '<table>\n  <tr><td>Mois</td><td>Montant</td></tr>\n  <tr><td>Janvier</td><td>1200 €</td></tr>\n  <tr><td>Février</td><td>1450 €</td></tr>\n</table>',
      indice: 'Le <code>&lt;caption&gt;</code> se place juste après <code>&lt;table&gt;</code>. La première ligne passe dans <code>&lt;thead&gt;</code> avec des <code>&lt;th&gt;</code> à la place des <code>&lt;td&gt;</code>.',
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
      indice: '<code>&lt;tfoot&gt;&lt;tr&gt;&lt;td colspan="2"&gt;Total&lt;/td&gt;&lt;td&gt;1440 €&lt;/td&gt;&lt;/tr&gt;&lt;/tfoot&gt;</code>',
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
      indice: 'Dans le thead : <code>&lt;th scope="col"&gt;</code>. Dans le tbody, remplace le premier <code>&lt;td&gt;</code> de chaque ligne par <code>&lt;th scope="row"&gt;</code>.',
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
<h2>label : la balise la plus importante d'un formulaire</h2>
<pre class="bloc-code">&lt;label for="prenom"&gt;Prénom&lt;/label&gt;
&lt;input type="text" id="prenom" name="prenom"&gt;</pre>
<p>Le <code>for</code> du label doit valoir exactement l'<code>id</code> du champ. Deux bénéfices immédiats : cliquer sur le texte place le curseur dans le champ (précieux sur mobile, où les cases à cocher sont minuscules), et un lecteur d'écran annonce le bon libellé.</p>

<h2>fieldset et legend : regrouper</h2>
<pre class="bloc-code">&lt;fieldset&gt;
  &lt;legend&gt;Coordonnées&lt;/legend&gt;
  &lt;label for="mail"&gt;Email&lt;/label&gt;
  &lt;input type="email" id="mail" name="mail"&gt;
&lt;/fieldset&gt;</pre>
<p>Indispensable pour un groupe de boutons radio : la <code>&lt;legend&gt;</code> pose la question, les labels donnent les réponses possibles.</p>

<h2>Valider sans une ligne de JavaScript</h2>
<table class="memo-table">
<tr><th>Attribut</th><th>Effet</th></tr>
<tr><td>required</td><td>le champ doit être rempli</td></tr>
<tr><td>minlength / maxlength</td><td>longueur du texte</td></tr>
<tr><td>min / max</td><td>bornes d'un nombre ou d'une date</td></tr>
<tr><td>pattern="[0-9]{5}"</td><td>format imposé (ici : 5 chiffres)</td></tr>
<tr><td>placeholder</td><td>exemple affiché en gris</td></tr>
</table>
<p>Le navigateur bloque l'envoi et affiche un message dans la langue de l'utilisateur — gratuitement.</p>

<div class="attention"><div>Cette validation est un <strong>confort</strong>, pas une sécurité. Elle se contourne en trois clics. Toute donnée doit être revérifiée côté serveur, sans exception. Et <code>placeholder</code> ne remplace jamais un <code>label</code> : il disparaît dès qu'on tape.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée un champ « Prénom » correctement étiqueté : un <code>&lt;label&gt;</code> relié au champ par <code>for</code> / <code>id</code>, et le champ doit être <strong>obligatoire</strong>.',
      codeDepart: '<form>\n  \n</form>',
      indice: '<code>&lt;label for="prenom"&gt;Prénom&lt;/label&gt;</code> puis <code>&lt;input type="text" id="prenom" name="prenom" required&gt;</code>',
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
      indice: 'Le même <code>name</code> pour les deux radios les rend exclusifs. Chacun a son propre <code>id</code> et son label.',
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
      indice: '<code>pattern="[0-9]{5}"</code> — entre crochets les caractères autorisés, entre accolades le nombre exact.',
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
<p>Rendre une page accessible, c'est faire qu'elle reste utilisable par une personne aveugle, malvoyante, daltonienne, ou qui navigue au clavier faute de pouvoir tenir une souris. En France, c'est une <strong>obligation légale</strong> pour les services publics — et partout, c'est une question de qualité.</p>

<h2>1. Des alternatives textuelles utiles</h2>
<pre class="bloc-code">&lt;img src="graphique.png" alt="Les ventes ont doublé entre janvier et juin"&gt;

&lt;!-- Image purement décorative : alt VIDE, pas absent --&gt;
&lt;img src="separateur.png" alt=""&gt;</pre>
<p>Un <code>alt</code> décrit ce que l'image <strong>apporte</strong>, pas ce qu'elle montre. Écrire <code>alt="graphique"</code> ne sert à rien ; décrire ce qu'on y lit, si. Et un <code>alt=""</code> vide dit « ignore-moi », ce qui est exactement ce qu'il faut pour une décoration.</p>

<h2>2. Des libellés partout</h2>
<p>Un bouton qui ne contient qu'une icône n'a aucun texte à annoncer :</p>
<pre class="bloc-code">&lt;button aria-label="Fermer la fenêtre"&gt;X&lt;/button&gt;</pre>

<h2>3. Une navigation au clavier</h2>
<p>Tout ce qui est cliquable doit être atteignable avec la touche Tab. C'est automatique avec <code>&lt;button&gt;</code> et <code>&lt;a&gt;</code> — et perdu si on met un gestionnaire de clic sur une <code>&lt;div&gt;</code>. Utilise la bonne balise, et l'accessibilité vient gratuitement.</p>

<h2>4. Un contraste suffisant</h2>
<p>Le texte doit atteindre un rapport de contraste de <strong>4,5:1</strong> avec son fond. Du gris clair sur blanc est illisible pour beaucoup de gens — et sous le soleil, pour tout le monde.</p>

<div class="astuce"><div>Le test le plus rapide : essaie de naviguer sur ta page <strong>uniquement au clavier</strong>. Si tu ne peux pas atteindre un bouton, ou si tu ne vois pas où tu te trouves, l'accessibilité est à revoir. Ce test prend deux minutes et détecte l'essentiel des problèmes.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Corrige les deux images : celle qui porte de l\'information doit avoir un <code>alt</code> <strong>descriptif</strong>, et celle qui est décorative un <code>alt</code> <strong>vide</strong>.',
      codeDepart: '<img id="info" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'50\'%3E%3Crect width=\'80\' height=\'50\' fill=\'%234f6df5\'/%3E%3C/svg%3E">\n<img id="deco" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'8\'%3E%3Crect width=\'80\' height=\'8\' fill=\'%23ccc\'/%3E%3C/svg%3E">',
      indice: 'Sur la première : un <code>alt</code> qui décrit l\'information (au moins quelques mots). Sur la seconde : <code>alt=""</code> exactement.',
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
      indice: '<code>&lt;button aria-label="Fermer la fenêtre"&gt;X&lt;/button&gt;</code>',
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
      indice: 'Un <code>&lt;button&gt;</code> est focusable et activable à la touche Entrée sans aucun effort. Remplace simplement <code>div</code> par <code>button</code>.',
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
<p>Une image mal servie est la première cause de lenteur d'un site. Voici les outils qui règlent le problème.</p>

<h2>loading="lazy" : ne charger qu'au moment utile</h2>
<pre class="bloc-code">&lt;img src="photo.jpg" alt="..." loading="lazy"&gt;</pre>
<p>L'image n'est téléchargée que lorsqu'elle approche de l'écran. Sur une page qui en contient trente, c'est un gain considérable — pour un seul attribut. À ne pas mettre sur les images visibles d'emblée, qu'on veut au contraire charger tout de suite.</p>

<h2>width et height : réserver la place</h2>
<pre class="bloc-code">&lt;img src="photo.jpg" alt="..." width="800" height="600"&gt;</pre>
<p>Sans ces attributs, le navigateur ignore la taille de l'image avant de l'avoir chargée : le texte saute au moment où elle apparaît. En les indiquant, il réserve l'espace à l'avance. C'est l'un des critères de qualité mesurés par Google.</p>

<h2>srcset : la bonne taille selon l'écran</h2>
<pre class="bloc-code">&lt;img src="photo-800.jpg"
     srcset="photo-400.jpg 400w, photo-800.jpg 800w"
     sizes="(max-width: 600px) 100vw, 50vw"
     alt="..."&gt;</pre>
<p>Le navigateur choisit lui-même le fichier adapté. Inutile d'envoyer une image de 1600 pixels à un téléphone.</p>

<h2>picture : changer carrément d'image</h2>
<pre class="bloc-code">&lt;picture&gt;
  &lt;source media="(max-width: 600px)" srcset="portrait.jpg"&gt;
  &lt;img src="paysage.jpg" alt="..."&gt;
&lt;/picture&gt;</pre>
<p>Là où <code>srcset</code> propose la même image en plusieurs tailles, <code>&lt;picture&gt;</code> permet d'en servir une <strong>différente</strong> — un cadrage vertical sur mobile, par exemple. La balise <code>&lt;img&gt;</code> finale reste obligatoire : c'est elle qui s'affiche si aucune condition ne correspond.</p>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Complète cette image avec les trois attributs qui évitent les sauts de mise en page et le chargement inutile : <code>width</code>, <code>height</code> et <code>loading="lazy"</code>. (Elle fait 80 par 50.)',
      codeDepart: '<img id="photo" alt="Un rectangle bleu" src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'80\' height=\'50\'%3E%3Crect width=\'80\' height=\'50\' fill=\'%234f6df5\'/%3E%3C/svg%3E">',
      indice: 'Ajoute <code>width="80" height="50" loading="lazy"</code> dans la balise.',
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
      indice: '<code>&lt;picture&gt;&lt;source media="(max-width: 600px)" srcset="..."&gt;&lt;img src="..." alt="..."&gt;&lt;/picture&gt;</code>',
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
<p>Quand on colle le lien d'une page sur WhatsApp, Facebook ou LinkedIn, un aperçu apparaît : titre, description, image. Cet aperçu ne s'invente pas — il vient de balises <code>&lt;meta&gt;</code> placées dans le <code>&lt;head&gt;</code>.</p>

<h2>Open Graph : le standard du partage</h2>
<pre class="bloc-code">&lt;head&gt;
  &lt;meta property="og:title" content="Apprendre à coder de A à Z"&gt;
  &lt;meta property="og:description" content="121 leçons pour débuter."&gt;
  &lt;meta property="og:image" content="https://exemple.fr/apercu.jpg"&gt;
  &lt;meta property="og:url" content="https://exemple.fr/cours"&gt;
&lt;/head&gt;</pre>

<p>Remarque une différence : ces balises utilisent <code>property</code> alors que les meta classiques utilisent <code>name</code>. C'est une subtilité qui piège tout le monde une fois.</p>

<table class="memo-table">
<tr><th>Balise</th><th>Rôle</th></tr>
<tr><td>og:title</td><td>le titre affiché dans l'aperçu</td></tr>
<tr><td>og:description</td><td>le texte sous le titre</td></tr>
<tr><td>og:image</td><td>l'image (adresse ABSOLUE, pas relative)</td></tr>
<tr><td>og:url</td><td>l'adresse canonique de la page</td></tr>
</table>

<h2>Les métadonnées indispensables par ailleurs</h2>
<pre class="bloc-code">&lt;meta charset="UTF-8"&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;meta name="description" content="Résumé pour les moteurs de recherche."&gt;
&lt;title&gt;Le titre de l'onglet&lt;/title&gt;</pre>
<p><code>charset</code> évite les accents transformés en symboles ; <code>viewport</code> est ce qui rend la page utilisable sur mobile ; <code>description</code> est le texte affiché sous ton lien dans les résultats de recherche.</p>

<div class="attention"><div>L'adresse de <code>og:image</code> doit être <strong>absolue</strong> (commençant par <code>https://</code>). Les réseaux sociaux lisent ta page depuis leurs propres serveurs : une adresse relative ne mène nulle part pour eux.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Ajoute les trois métadonnées Open Graph essentielles : <code>og:title</code>, <code>og:description</code> et <code>og:image</code> (avec une adresse absolue).',
      codeDepart: '<head>\n  <meta charset="UTF-8">\n  <title>Mon cours de code</title>\n  \n</head>\n<body>\n  <h1>Mon cours</h1>\n</body>',
      indice: '<code>&lt;meta property="og:title" content="..."&gt;</code> — attention, c\'est <code>property</code> et non <code>name</code>.',
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
      indice: '<code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code> et <code>&lt;meta name="description" content="..."&gt;</code>',
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
<p>Dernière leçon du module : comment repérer et corriger ce qui cloche, méthodiquement plutôt qu'au hasard.</p>

<h2>1. Le validateur officiel</h2>
<p>Le W3C propose un outil gratuit qui analyse ton HTML et signale chaque erreur : <strong>validator.w3.org</strong>. Il détecte les balises non fermées, les attributs inventés, les imbrications interdites. Une page valide n'est pas forcément bonne, mais une page invalide réserve des surprises selon les navigateurs.</p>

<h2>2. Les outils de développement (F12)</h2>
<table class="memo-table">
<tr><th>Onglet</th><th>Sert à</th></tr>
<tr><td>Éléments</td><td>voir le HTML réel et tester du CSS en direct</td></tr>
<tr><td>Console</td><td>lire les erreurs JavaScript</td></tr>
<tr><td>Réseau</td><td>repérer un fichier introuvable (erreur 404)</td></tr>
<tr><td>Lighthouse</td><td>obtenir une note de performance et d'accessibilité</td></tr>
</table>
<p>L'onglet Éléments est le plus utile au quotidien : il montre le HTML <em>tel que le navigateur l'a compris</em>, ce qui peut différer de ce que tu as écrit — une balise mal fermée sera « réparée » automatiquement, souvent pas comme tu l'espérais.</p>

<h2>3. Les erreurs les plus fréquentes</h2>
<table class="memo-table">
<tr><th>Symptôme</th><th>Cause probable</th></tr>
<tr><td>Toute la page est en gras ou en lien</td><td>une balise jamais fermée</td></tr>
<tr><td>Des caractères bizarres à la place des accents</td><td><code>&lt;meta charset="UTF-8"&gt;</code> manquant</td></tr>
<tr><td>La page s'affiche minuscule sur mobile</td><td>balise <code>viewport</code> absente</td></tr>
<tr><td>Le CSS ne s'applique pas</td><td>chemin du fichier erroné (à vérifier dans Réseau)</td></tr>
<tr><td>Un clic sur un label ne fait rien</td><td><code>for</code> et <code>id</code> ne correspondent pas</td></tr>
</table>

<div class="astuce"><div>La méthode qui marche toujours : <strong>réduire</strong>. Quand une page se comporte bizarrement, supprime la moitié du code. Si le problème persiste, il est dans la moitié restante ; sinon, il est dans celle que tu viens d'enlever. En cinq coupes, tu as isolé la ligne fautive.</div></div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Cette page contient <strong>une balise jamais fermée</strong>, ce qui met tout le texte en gras. Trouve-la et corrige.',
      codeDepart: '<h2>Mon article</h2>\n<p>Un mot <strong>important dans la phrase.</p>\n<p id="suite">Ce paragraphe ne devrait PAS être en gras.</p>',
      indice: 'La balise <code>&lt;strong&gt;</code> est ouverte mais jamais refermée : tout ce qui suit hérite du gras. Ajoute <code>&lt;/strong&gt;</code> au bon endroit.',
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
      indice: 'Le <code>for</code> du label vaut « courriel » mais l\'<code>id</code> du champ vaut « email » : les deux doivent être identiques.',
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
