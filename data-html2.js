/* ===== Module HTML — leçons 9 à 14 (approfondissement) ===== */
window.DATA_HTML2 = [

{
  id: 'html-9',
  titre: 'Audio, vidéo et pages imbriquées',
  contenu: `
<p>Le HTML moderne sait afficher bien plus que du texte et des images : du son, de la vidéo, et même... d'autres pages web.</p>

<h2>La vidéo</h2>
<pre class="bloc-code">&lt;video src="film.mp4" controls width="400"&gt;&lt;/video&gt;</pre>
<ul>
<li><code>controls</code> — affiche les boutons lecture/pause/volume. C'est un <strong>attribut booléen</strong> : sa seule présence suffit, pas de valeur à écrire ;</li>
<li><code>width</code> — la largeur en pixels ;</li>
<li>autres attributs utiles : <code>autoplay</code> (lecture auto), <code>loop</code> (en boucle), <code>muted</code> (sans son), <code>poster="image.jpg"</code> (l'image de couverture).</li>
</ul>

<h2>L'audio</h2>
<pre class="bloc-code">&lt;audio src="musique.mp3" controls&gt;&lt;/audio&gt;</pre>
<p>Même logique, sans dimension. Sans <code>controls</code>, le lecteur est invisible !</p>

<h2>L'iframe : une page dans la page</h2>
<pre class="bloc-code">&lt;iframe src="https://exemple.com" width="500" height="300"&gt;&lt;/iframe&gt;</pre>
<p>Une <code>&lt;iframe&gt;</code> incruste une page web dans la tienne — c'est comme ça qu'on intègre une vidéo YouTube ou une carte Google Maps. D'ailleurs... les aperçus de CE logiciel sont des iframes ! Ton code s'exécute dans une page incrustée.</p>

<div class="info">💬 On travaille hors ligne, donc pas de vrais fichiers vidéo ici — mais les attributs, eux, se vérifient très bien. Dans tes futurs projets, il suffira de mettre un vrai chemin dans <code>src</code>.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Prépare le lecteur vidéo d\'un site de recettes : une balise <code>&lt;video&gt;</code> avec <code>src="recette.mp4"</code>, l\'attribut <code>controls</code>, une largeur de <code>400</code>, et l\'attribut <code>loop</code> pour qu\'elle tourne en boucle. (L\'aperçu montrera un lecteur vide : normal, le fichier n\'existe pas — c\'est la structure qui compte.)',
      codeDepart: '<h1>Ma recette en vidéo</h1>\n',
      indice: 'Tout dans la balise ouvrante : <code>&lt;video src="recette.mp4" controls width="400" loop&gt;&lt;/video&gt;</code> — controls et loop s\'écrivent seuls, sans ="..."',
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
      indice: '<code>&lt;iframe srcdoc="&lt;h1&gt;Coucou depuis l\'intérieur !&lt;/h1&gt;" width="300" height="150"&gt;&lt;/iframe&gt;</code> — attention, le HTML intérieur vit DANS les guillemets de srcdoc.',
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
<h2>Les attributs que TOUTES les balises acceptent</h2>
<p>Tu connais <code>class</code> et <code>id</code>. Voici le reste de la famille des <strong>attributs globaux</strong> :</p>
<ul>
<li><code>title="..."</code> — une infobulle qui apparaît quand la souris reste sur l'élément ;</li>
<li><code>hidden</code> — cache complètement l'élément (booléen). Très utilisé avec JavaScript pour montrer/cacher ;</li>
<li><code>lang="en"</code> — signale un passage dans une autre langue (les lecteurs d'écran changent d'accent !) ;</li>
<li><code>data-*</code> — range tes propres informations : <code>data-prix="12"</code>, <code>data-categorie="fruit"</code>... invisibles à l'écran, lisibles en JavaScript.</li>
</ul>

<h2>Les entités : afficher les caractères interdits</h2>
<p>Comment afficher un chevron <code>&lt;</code> dans une page, alors qu'il annonce une balise ? Avec une <strong>entité HTML</strong> :</p>
<table class="memo-table">
<tr><th>Pour afficher</th><th>On écrit</th></tr>
<tr><td>&lt;</td><td>&amp;lt; (less than)</td></tr>
<tr><td>&gt;</td><td>&amp;gt; (greater than)</td></tr>
<tr><td>&amp;</td><td>&amp;amp;</td></tr>
<tr><td>" (dans un attribut)</td><td>&amp;quot;</td></tr>
<tr><td>espace insécable</td><td>&amp;nbsp;</td></tr>
</table>
<div class="info">💬 Toutes les leçons de ce logiciel utilisent ces entités pour te MONTRER du code HTML sans qu'il s'exécute. L'encyclopédie que tu lis est truffée de &amp;lt; !</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Un lexique interactif : ajoute à chaque mot technique un attribut <code>title</code> contenant sa définition — <code>HTML</code> → <code>Langage de structure des pages</code>, et <code>CSS</code> → <code>Langage d\'apparence</code>. Survole les mots dans l\'aperçu pour voir tes infobulles !',
      codeDepart: '<p>Pour faire un site, il faut du <strong>HTML</strong> et du <strong>CSS</strong>.</p>',
      indice: 'L\'attribut va dans la balise ouvrante du strong : <code>&lt;strong title="Langage de structure des pages"&gt;HTML&lt;/strong&gt;</code>',
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
      indice: 'Dans le paragraphe : <code>&amp;lt;h1&amp;gt;Bonjour&amp;lt;/h1&amp;gt;</code> — chaque chevron devient son entité.',
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
      indice: 'Modèle : <code>&lt;li data-prix="0.50" data-stock="12"&gt;Pomme&lt;/li&gt;</code>',
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
<h2>Les boutons radio : un seul choix possible</h2>
<pre class="bloc-code">&lt;input type="radio" name="taille" value="petit"&gt; &lt;label&gt;Petit&lt;/label&gt;
&lt;input type="radio" name="taille" value="grand"&gt; &lt;label&gt;Grand&lt;/label&gt;</pre>
<p>Le point crucial : le <strong>même</strong> attribut <code>name</code> sur tout le groupe. C'est lui qui dit au navigateur « ces boutons sont liés : un seul coché à la fois ». Deux <code>name</code> différents = deux groupes indépendants (et là, bug classique : on peut tout cocher !).</p>
<p><code>value</code> donne la valeur envoyée (et lisible en JavaScript) quand ce bouton est choisi.</p>

<h2>La validation intégrée : le HTML fait la police</h2>
<pre class="bloc-code">&lt;input type="text" required&gt;              &lt;!-- champ obligatoire --&gt;
&lt;input type="number" min="1" max="10"&gt;     &lt;!-- nombre borné --&gt;
&lt;input type="text" maxlength="20"&gt;         &lt;!-- 20 caractères max --&gt;
&lt;input type="email"&gt;                       &lt;!-- exige une forme d'email --&gt;</pre>
<p>Avec ces attributs, le navigateur bloque tout seul les saisies invalides à l'envoi d'un formulaire — sans une ligne de JavaScript. Première ligne de défense de toutes les applications sérieuses.</p>

<div class="astuce">✅ Règle d'or de la validation : le HTML filtre d'abord (confort), le serveur vérifie toujours (sécurité). Un utilisateur malin peut contourner le navigateur — jamais le serveur.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le choix de la cuisson : crée un groupe de <strong>trois</strong> boutons radio (<code>Saignant</code>, <code>À point</code>, <code>Bien cuit</code>) partageant le <code>name="cuisson"</code>, chacun avec un <code>value</code> différent et suivi de son <code>&lt;label&gt;</code>. Teste dans l\'aperçu : un seul doit être cochable à la fois !',
      codeDepart: '<h2>Votre cuisson ?</h2>\n',
      indice: 'Trois fois le modèle : <code>&lt;input type="radio" name="cuisson" value="saignant"&gt; &lt;label&gt;Saignant&lt;/label&gt;</code> — même name partout, value différents.',
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
      indice: 'Ajoute les attributs dans les balises : <code>&lt;input type="text" id="nom" required maxlength="30"&gt;</code> et <code>&lt;input type="number" id="nb" min="1" max="8" required&gt;</code>',
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
<p>Tu connais header/main/footer. Voici le reste de la famille <strong>sémantique</strong> — les balises qui donnent du SENS au contenu. Visuellement neutres, mais précieuses pour Google, les lecteurs d'écran... et le développeur qui te relira.</p>

<h2>Découper le contenu</h2>
<ul>
<li><code>&lt;article&gt;</code> — un contenu <strong>autonome</strong>, qui aurait du sens tout seul : un article de blog, une annonce, une recette, un commentaire ;</li>
<li><code>&lt;section&gt;</code> — un <strong>chapitre</strong> thématique d'une page, généralement avec son titre ;</li>
<li><code>&lt;aside&gt;</code> — un contenu <strong>annexe</strong> : encart « le saviez-vous », publicité, liens connexes.</li>
</ul>

<h2>Les images légendées</h2>
<pre class="bloc-code">&lt;figure&gt;
  &lt;img src="tour-eiffel.jpg" alt="La tour Eiffel au coucher du soleil"&gt;
  &lt;figcaption&gt;La tour Eiffel, été 2025.&lt;/figcaption&gt;
&lt;/figure&gt;</pre>
<p><code>&lt;figure&gt;</code> groupe une illustration et sa légende <code>&lt;figcaption&gt;</code> — le duo officiel pour toute image commentée.</p>

<div class="info">💬 Comment choisir entre div, section et article ? Pose la question : « ce bloc aurait-il du sens publié tout seul ? » → article. « C'est un chapitre de ma page ? » → section. « Je groupe juste pour le style ? » → div. En cas de doute, div n'est jamais faux — juste moins parlant.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Une photo bien présentée : enveloppe l\'image fournie dans une balise <code>&lt;figure&gt;</code> et ajoute-lui une légende <code>&lt;figcaption&gt;</code> avec le texte de ton choix.',
      codeDepart: '<img src="data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'120\'%3E%3Crect width=\'200\' height=\'120\' fill=\'%232a9d8f\'/%3E%3Ccircle cx=\'160\' cy=\'30\' r=\'18\' fill=\'%23e9c46a\'/%3E%3C/svg%3E" alt="Un paysage vert avec un soleil">',
      indice: 'Structure : <code>&lt;figure&gt;</code> puis l\'image, puis <code>&lt;figcaption&gt;Ma légende&lt;/figcaption&gt;</code>, puis <code>&lt;/figure&gt;</code>.',
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
      indice: 'Remplace les <code>&lt;div&gt;</code>/<code>&lt;/div&gt;</code> : le premier par <code>&lt;article&gt;</code>/<code>&lt;/article&gt;</code>, le second par <code>&lt;aside&gt;</code>/<code>&lt;/aside&gt;</code>.',
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
<h2>Sauter à un endroit de la page</h2>
<p>Un lien peut pointer vers... un autre endroit de la même page. La cible est un élément avec un <code>id</code>, et le lien y accède avec <code>#</code> :</p>
<pre class="bloc-code">&lt;a href="#recettes"&gt;Aller aux recettes&lt;/a&gt;

... beaucoup de contenu ...

&lt;h2 id="recettes"&gt;Les recettes&lt;/h2&gt;</pre>
<p>Clic → la page défile jusqu'au titre. C'est le mécanisme des sommaires, des liens « retour en haut », et des menus de pages longues. (Le <code>#nom</code> apparaît aussi dans l'adresse — ce logiciel s'en sert pour retenir la leçon en cours !)</p>

<h2>Ouvrir dans un nouvel onglet</h2>
<pre class="bloc-code">&lt;a href="https://exemple.com" target="_blank" rel="noopener"&gt;Voir le site&lt;/a&gt;</pre>
<ul>
<li><code>target="_blank"</code> — ouvre dans un nouvel onglet ;</li>
<li><code>rel="noopener"</code> — l'accompagnateur de sécurité : il empêche la page ouverte de manipuler la tienne. Les deux vont toujours ensemble, c'est un réflexe.</li>
</ul>

<div class="astuce">✅ Bon usage : nouvel onglet pour les sites EXTERNES (le visiteur garde ta page), même onglet pour la navigation INTERNE de ton site.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Crée une ancre : en haut, un lien <code>Voir la conclusion</code> qui pointe vers <code>#conclusion</code> ; en bas (après les paragraphes), un titre <code>&lt;h2&gt;</code> avec <code>id="conclusion"</code>. Clique sur le lien dans l\'aperçu : ça saute !',
      codeDepart: '<h1>Mon grand dossier</h1>\n\n\n<p>Beaucoup de contenu...</p>\n<p>Encore du contenu...</p>\n<p>Toujours du contenu...</p>\n\n',
      indice: 'En haut : <code>&lt;a href="#conclusion"&gt;Voir la conclusion&lt;/a&gt;</code>. En bas : <code>&lt;h2 id="conclusion"&gt;Conclusion&lt;/h2&gt;</code> — le # dans le lien, PAS dans l\'id.',
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
      indice: 'h1 avec <code>id="haut"</code> ; sommaire : <code>&lt;ul&gt;&lt;li&gt;&lt;a href="#partie1"&gt;...&lt;/a&gt;&lt;/li&gt;...&lt;/ul&gt;</code> ; deux <code>&lt;h2 id="partie1"&gt;</code>/<code>partie2</code> avec un peu de contenu ; et <code>&lt;a href="#haut"&gt;Retour en haut&lt;/a&gt;</code>.',
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
      indice: 'Chaque lien devient : <code>&lt;a href="https://..." target="_blank" rel="noopener"&gt;...&lt;/a&gt;</code>',
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
<p>La partie invisible d'une page, le <code>&lt;head&gt;</code>, est loin d'être décorative : c'est elle que lisent Google, les réseaux sociaux et le navigateur pour comprendre ta page.</p>

<h2>Les indispensables</h2>
<pre class="bloc-code">&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Recettes de saison — Le Potager&lt;/title&gt;
  &lt;meta name="description" content="50 recettes simples avec les légumes du moment."&gt;
&lt;/head&gt;</pre>
<ul>
<li><code>charset="UTF-8"</code> — l'encodage des caractères. Sans lui, les accents deviennent des hiéroglyphes (Ã©tÃ©...) ;</li>
<li><code>viewport</code> — dit aux téléphones de ne pas dézoomer la page. OBLIGATOIRE pour le responsive ;</li>
<li><code>&lt;title&gt;</code> — le texte de l'onglet ET le titre bleu dans les résultats Google ;</li>
<li><code>meta description</code> — le petit texte gris sous le titre dans Google. Ta vitrine en 150 caractères.</li>
</ul>

<h2>Le référencement (SEO) en deux phrases</h2>
<p>Google classe les pages selon leur pertinence. Tes armes de base : un <code>&lt;title&gt;</code> précis, une description engageante, UN seul h1, une vraie hiérarchie de titres, des <code>alt</code> remplis, du HTML sémantique. Autrement dit : <strong>tout ce que tu apprends ici depuis le début</strong>.</p>

<div class="info">💬 Dans les exercices précédents on omettait le squelette — ici c'est LUI l'exercice : tu écriras des pages complètes, du DOCTYPE à la fermeture.</div>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Écris une page COMPLÈTE pour une pizzeria : <code>&lt;!DOCTYPE html&gt;</code>, <code>&lt;html lang="fr"&gt;</code>, un <code>&lt;head&gt;</code> avec charset UTF-8, un <code>&lt;title&gt;</code> contenant <code>Pizzeria</code>, une <code>meta description</code> non vide — et un <code>&lt;body&gt;</code> avec un h1.',
      codeDepart: '<!DOCTYPE html>\n<html lang="fr">\n<head>\n\n</head>\n<body>\n\n</body>\n</html>',
      indice: 'Dans le head : <code>&lt;meta charset="UTF-8"&gt;</code>, <code>&lt;title&gt;Pizzeria Bella — Pizzas au feu de bois&lt;/title&gt;</code>, <code>&lt;meta name="description" content="..."&gt;</code>. Dans le body : un h1.',
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
      indice: 'Le 2e h1 peut devenir un <code>&lt;p&gt;</code> ou un h2 ; « Nos services » passe en <code>&lt;h2&gt;</code> ; ajoute <code>alt="Une roue de vélo"</code> ; écris un vrai titre dans <code>&lt;title&gt;</code>.',
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
