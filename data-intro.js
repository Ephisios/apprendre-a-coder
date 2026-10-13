/* ===== Module Bienvenue ===== */
window.DATA_INTRO = [

{
  id: 'intro-1',
  titre: 'C\'est quoi, coder ?',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Un ordinateur ne comprend rien, ne devine rien, n'improvise jamais. En revanche, il exécute <strong>exactement</strong> ce qu'on lui demande, des millions de fois par seconde, sans se tromper ni se fatiguer.</p>
<p>De ce décalage naît tout le métier : il a fallu inventer une façon de parler à une machine qui n'interprète pas. C'est à ça que servent les langages de programmation — et c'est pour ça qu'ils sont si pointilleux.</p>

<h2>Coder, c'est écrire sans ambiguïté</h2>
<p><strong>Coder</strong>, c'est écrire des instructions que l'ordinateur suivra à la lettre. Ces instructions s'écrivent dans un <strong>langage de programmation</strong> : un langage inventé par des humains, au vocabulaire réduit et aux règles très strictes, que la machine sait interpréter.</p>
<p>Une recette de cuisine en donne une bonne idée : « casse trois œufs, fouette, ajoute la farine ». Un programme est fait de la même matière — une liste d'étapes précises. La différence, c'est qu'un cuisinier comprend « fouette énergiquement », alors qu'un ordinateur a besoin qu'on lui dise <em>tout</em>, dans le bon ordre.</p>

<h2>Pas à pas</h2>
<p>Voici la même intention, écrite trois fois, et ce qu'une machine peut en faire :</p>
<table class="memo-table trace">
<tr><th>Ce qu'on écrit</th><th>Ce qu'un ordinateur en fait</th></tr>
<tr><td>« fais une belle page »</td><td>rien : aucune de ces notions ne se mesure</td></tr>
<tr><td>« mets le titre en bleu »</td><td>presque : quel titre, quel bleu ?</td></tr>
<tr><td>« le premier titre : couleur #1d4ed8 »</td><td>exécutable, et le résultat est toujours le même</td></tr>
</table>
<p>Apprendre à coder, c'est surtout apprendre à descendre de la première ligne à la troisième. La difficulté n'est pas la machine : c'est de transformer une intention vague en une suite d'étapes qui ne laissent rien à deviner.</p>

<h2>Pourquoi il existe plein de langages</h2>
<p>Comme les langues humaines, il y en a des dizaines, chacun plus adapté à certains usages : <strong>HTML</strong> et <strong>CSS</strong> pour décrire le contenu et l'apparence des pages web, <strong>JavaScript</strong> pour les rendre interactives, <strong>Python</strong> pour les données et l'automatisation, <strong>SQL</strong> pour interroger des bases de données — et bien d'autres encore : Java, C, C#, PHP, Go.</p>
<p>Voici maintenant le secret que tous les développeurs connaissent : <strong>les concepts sont les mêmes partout</strong>. Variables, conditions, boucles, fonctions — une fois acquis dans un langage, on les reconnaît dans tous les autres. Le premier langage prend des mois ; le deuxième, quelques semaines ; le troisième, quelques jours.</p>

<h2>Les pièges</h2>
<p><strong>Croire qu'il faut être bon en maths.</strong> Il faut surtout être capable de décomposer un problème en étapes et de rester précis. Les mathématiques servent dans certains domaines, pas pour apprendre à coder.</p>
<p><strong>Vouloir choisir « le bon » langage avant de commencer.</strong> C'est le plus sûr moyen de ne jamais commencer. Comme les concepts se transposent, le premier langage n'engage à rien.</p>
<p><strong>Prendre une erreur pour un échec.</strong> C'est l'habitude la plus coûteuse de toutes, et ce cours y reviendra sans arrêt. Un message d'erreur n'est pas un jugement : c'est l'ordinateur qui explique où il s'est arrêté, et pourquoi.</p>
<p><strong>Vouloir tout comprendre avant d'essayer.</strong> On apprend à coder dans l'autre sens : on écrit, on exécute, on regarde ce qui sort, et la compréhension suit. C'est pourquoi chaque leçon d'ici finit par des exercices.</p>

<h2>Dans la vraie vie</h2>
<p>Cette exigence de précision déborde largement le code. Rédiger une procédure qu'un collègue devra suivre sans vous, décrire un bogue pour qu'il soit reproductible, découper une tâche floue en étapes faisables : c'est la même compétence. Beaucoup de gens disent que coder a changé leur façon d'écrire bien avant leur façon de calculer.</p>

<div class="a-retenir">
<ul>
<li>Coder, c'est écrire des instructions précises qu'une machine exécute à la lettre.</li>
<li>Un ordinateur ne devine rien — toute l'ambiguïté doit disparaître.</li>
<li>Les concepts se transposent d'un langage à l'autre : le premier choix n'engage à rien.</li>
<li>Les erreurs font partie du travail, pas de l'échec.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : HTML est-il un langage de programmation ?</summary>
<p>Non, et la distinction est utile. HTML et CSS <em>décrivent</em> : « ici un titre, là une image en bleu ». Ils ne décident de rien, ne comptent pas, ne répètent pas. On les appelle des langages de description. JavaScript, Python ou Java, eux, peuvent choisir (une condition), recommencer (une boucle) et calculer — ce sont des langages de programmation. C'est pourquoi ce cours commence par la description, plus simple et immédiatement visible, avant de passer à la décision.</p>
</details>
`,
  exercices: [
    {
      type: 'qcm',
      consigne: '<strong>Question 1.</strong> Qu\'est-ce que « coder » ?',
      choix: [
        'Écrire des instructions précises que l\'ordinateur va exécuter',
        'Réparer des ordinateurs en panne',
        'Créer des mots de passe secrets',
        'Installer des logiciels sur un ordinateur'
      ],
      bonne: 0,
      explication: 'Coder = écrire des instructions dans un langage que la machine sait interpréter. Ni plus, ni moins.',
      aides: [
        '',
        'Ça, c\'est le métier de technicien ou réparateur. Coder, c\'est écrire des instructions.',
        'Le mot « code » fait penser aux codes secrets, mais en programmation il désigne les instructions données à la machine.',
        'Installer des logiciels, tout le monde le fait. Coder, c\'est les <em>fabriquer</em> : écrire les instructions qui les composent.'
      ]
    },
    {
      type: 'qcm',
      consigne: '<strong>Question 2.</strong> Pourquoi commencer par HTML, CSS et JavaScript plutôt qu\'un autre langage ?',
      choix: [
        'Parce que ce sont les seuls langages qui existent encore',
        'Parce que le résultat s\'affiche immédiatement dans le navigateur, sans rien installer',
        'Parce qu\'ils sont réservés aux débutants',
        'Parce que les autres langages sont payants'
      ],
      bonne: 1,
      explication: 'Le navigateur que tu utilises déjà sait les exécuter : tu vois le résultat de ton code instantanément. Et les concepts appris se retrouvent dans tous les autres langages.',
      aides: [
        'Il existe des dizaines de langages bien vivants (Python, Java, C...). Le trio du web est choisi pour une autre raison.',
        '',
        'Pas du tout : JavaScript fait tourner des applications géantes (Gmail, Netflix...). Il est juste aussi accessible aux débutants.',
        'Presque tous les langages de programmation sont gratuits. La raison est ailleurs : le navigateur affiche le résultat immédiatement.'
      ]
    },
    {
      type: 'qcm',
      consigne: '<strong>Question 3.</strong> Une fois qu\'on maîtrise son premier langage de programmation, apprendre le deuxième est...',
      choix: [
        'Aussi long : il faut tout recommencer de zéro',
        'Impossible : on ne peut connaître qu\'un langage à la fois',
        'Beaucoup plus rapide : les concepts (variables, boucles...) sont les mêmes partout',
        'Inutile : un seul langage suffit pour tout faire'
      ],
      bonne: 2,
      explication: 'C\'est LE secret des développeurs : on n\'apprend pas « un langage », on apprend LA programmation. Ensuite, seule la ponctuation change (tu le verras de tes yeux dans le module « Et après ? »).',
      aides: [
        'Bonne nouvelle : non ! Les concepts fondamentaux se transfèrent d\'un langage à l\'autre.',
        'Les développeurs professionnels jonglent couramment avec 3, 4, 5 langages.',
        '',
        'Chaque langage a son domaine de prédilection : le web, les données, les jeux... En connaître plusieurs ouvre des portes.'
      ]
    }
  ]
},

{
  id: 'intro-2',
  titre: 'Comment fonctionne un site web',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Avant d'écrire une ligne de code, il vaut la peine de savoir ce qui se passe quand on ouvre un site. Sans cette image, les trois langages qui viennent ressemblent à trois matières sans rapport — alors qu'ils sont trois couches d'une même chose.</p>

<h2>Le navigateur, ton meilleur ami</h2>
<p>Chrome, Edge, Firefox : un <strong>navigateur</strong> est un programme dont le métier est de lire des fichiers de code et de les transformer en pages visibles. Quand tu vas sur un site, il télécharge des fichiers, les lit, et dessine la page. C'est tout.</p>
<p>Et voici le point qui nous intéresse : <strong>un navigateur sait aussi lire des fichiers posés sur ton propre ordinateur</strong>. Pas besoin d'internet ni de serveur pour apprendre — ce logiciel lui-même fonctionne comme ça, et c'est pour cette raison qu'il tient dans un dossier.</p>

<h2>Les trois langages du web</h2>
<p>Une page est faite de trois couches, chacune avec son langage. <strong>HTML</strong> est le squelette : « ici un titre, là un paragraphe, là un bouton » — le contenu et sa structure. <strong>CSS</strong> est la peau : « le titre est bleu, centré, en gros » — l'apparence. <strong>JavaScript</strong> est le muscle : « quand on clique, affiche un message » — le comportement.</p>
<p>Si une page web était une maison, le HTML serait les murs et les pièces, le CSS la peinture, et le JavaScript l'électricité et la plomberie. Les trois sont distincts, et aucun ne remplace les autres.</p>

<h2>Pas à pas</h2>
<p>Ce qui se passe, dans l'ordre, quand une page s'affiche :</p>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce que fait le navigateur</th><th>Ce que tu vois</th></tr>
<tr><td>il reçoit le fichier</td><td>il lit le HTML de haut en bas</td><td>rien encore</td></tr>
<tr><td>il construit la page</td><td>il range titres, textes et images</td><td>un texte brut, sans style</td></tr>
<tr><td>il applique le CSS</td><td>il repeint, déplace, espace</td><td>la page telle qu'elle doit être</td></tr>
<tr><td>il exécute le JavaScript</td><td>il branche les réactions aux clics</td><td>une page qui répond</td></tr>
</table>
<p>Cet ordre explique deux choses. D'abord qu'une page sans CSS reste lisible — c'est pour ça qu'un HTML bien écrit compte autant. Ensuite qu'un JavaScript qui s'exécute trop tôt ne trouve pas encore les éléments qu'il cherche : un classique, que tu rencontreras pour de bon au module JavaScript.</p>

<h2>À quoi ressemble du code</h2>
<p>Voici une page web complète, minuscule mais réelle :</p>
<pre class="bloc-code">&lt;h1&gt;Bonjour !&lt;/h1&gt;
&lt;p&gt;Ceci est ma première page web.&lt;/p&gt;</pre>
<p>Deux lignes, et un navigateur en fait une page avec un gros titre et un paragraphe. Ne cherche pas encore à tout comprendre : dès la prochaine leçon, tu écriras ce code toi-même et verras le résultat s'afficher à côté.</p>

<h2>Les pièges</h2>
<p><strong>Croire qu'il faut un serveur ou internet.</strong> Pour tout ce que tu apprendras ici, un fichier et un navigateur suffisent. Le serveur n'arrive que le jour où plusieurs personnes doivent partager les mêmes données.</p>
<p><strong>Mettre l'apparence dans le HTML.</strong> C'était l'usage il y a vingt ans, et les pages devenaient impossibles à faire évoluer. Chaque couche à sa place : le quoi en HTML, le comment en CSS.</p>
<p><strong>Prendre HTML pour un langage de programmation.</strong> Il décrit, il ne décide pas. Le confondre avec JavaScript fait chercher dans le HTML des réponses qui ne s'y trouveront jamais.</p>
<p><strong>Juger une page sur sa seule apparence.</strong> Deux pages identiques à l'œil peuvent avoir des HTML très différents — et l'une sera lisible par un lecteur d'écran, référençable et modifiable, l'autre pas.</p>

<h2>Dans la vraie vie</h2>
<p>Cette séparation en couches n'a rien de propre au web : on la retrouve partout en informatique sous le nom de séparation des responsabilités. Les données d'un côté, leur présentation de l'autre, le comportement encore ailleurs — c'est ce qui permet de changer l'un sans tout casser. Tu l'appliqueras ici dès le module CSS, et tu la reconnaîtras ensuite dans tous les outils que tu croiseras.</p>

<div class="a-retenir">
<ul>
<li>Un navigateur lit des fichiers de code et dessine une page — y compris des fichiers locaux.</li>
<li><strong>HTML = structure, CSS = apparence, JavaScript = comportement.</strong></li>
<li>L'ordre compte : le HTML est lu, puis habillé, puis animé.</li>
<li>Chaque couche à sa place : c'est ce qui rend une page modifiable.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi apprendre dans cet ordre</summary>
<p>HTML, puis CSS, puis JavaScript : l'ordre suit celui du navigateur, et ce n'est pas un hasard. Le CSS a besoin d'un HTML à habiller — on ne peut pas mettre un titre en bleu avant d'avoir un titre. Et JavaScript a besoin des deux, puisqu'il travaille en modifiant la page construite par les premiers. Chaque module s'appuie donc sur le précédent, et c'est aussi pourquoi revenir en arrière n'est jamais du temps perdu.</p>
</details>
`,
  exercices: [
    {
      type: 'qcm',
      consigne: '<strong>Question 1.</strong> Sur un site web, quel langage s\'occupe de l\'<strong>apparence</strong> (couleurs, tailles, mise en page) ?',
      choix: ['Le HTML', 'Le CSS', 'Le JavaScript', 'Le navigateur'],
      bonne: 1,
      explication: 'HTML = structure, <strong>CSS = apparence</strong>, JavaScript = comportement. Ce trio, tu vas le vivre module par module.',
      aides: [
        'Le HTML décrit la structure et le contenu (« ici un titre, là une image »). L\'apparence, c\'est le rôle d\'un autre langage...',
        '',
        'Le JavaScript gère le comportement : ce qui se passe quand on clique, quand on tape... L\'apparence, c\'est un autre langage.',
        'Le navigateur n\'est pas un langage : c\'est le programme qui lit les trois langages et dessine la page.'
      ]
    },
    {
      type: 'qcm',
      consigne: '<strong>Question 2.</strong> Que fait un navigateur (Chrome, Firefox, Edge...) quand tu ouvres une page web ?',
      choix: [
        'Il envoie ta page à Google pour qu\'elle soit affichée',
        'Il lit des fichiers de code (HTML, CSS, JS) et les transforme en page visible',
        'Il imprime la page sur ton disque dur',
        'Il traduit la page en français'
      ],
      bonne: 1,
      explication: 'C\'est exactement son métier : lire du code, dessiner une page. Et il sait le faire avec des fichiers de ton propre ordinateur, sans internet — la preuve : ce logiciel !',
      aides: [
        'Google n\'a rien à voir là-dedans : ton navigateur fait tout le travail d\'affichage lui-même, localement.',
        '',
        'Rien n\'est imprimé : le navigateur lit les fichiers et les <em>affiche</em> à l\'écran.',
        'La traduction est une fonction annexe de certains navigateurs. Leur vrai métier : transformer du code en page visible.'
      ]
    },
    {
      type: 'qcm',
      consigne: '<strong>Question 3.</strong> Dans l\'image de la maison, le JavaScript correspond à...',
      choix: [
        'Les murs et les pièces',
        'La peinture et la décoration',
        'L\'électricité et la plomberie qui font que tout fonctionne',
        'Le terrain sur lequel la maison est construite'
      ],
      bonne: 2,
      explication: 'Le JavaScript apporte le <strong>comportement</strong> : boutons qui réagissent, contenus qui changent, calculs... Sans lui, la page est belle mais inerte.',
      aides: [
        'Les murs et les pièces, c\'est la structure : le HTML.',
        'La peinture et la déco, c\'est l\'apparence : le CSS.',
        '',
        'Joli concept, mais dans notre image le terrain serait plutôt le navigateur qui héberge tout ça !'
      ]
    }
  ]
},

{
  id: 'intro-3',
  titre: 'Comment utiliser ce logiciel',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Dernière étape avant de plonger. Ce logiciel n'est pas une vidéo ni un livre : c'est un éditeur de code doublé d'un correcteur. Il vaut donc la peine de savoir comment il fonctionne — cinq minutes qui en économiseront beaucoup.</p>
<p>Et il y a une raison de fond à ce format. On n'apprend pas à coder en regardant quelqu'un coder, pas plus qu'on n'apprend à nager depuis le bord. Ici, tu écris, tu exécutes, et tu te trompes — c'est précisément le programme.</p>

<h2>Le principe</h2>
<ul>
<li>Chaque leçon <strong>explique une notion</strong>, puis propose une <strong>série d'exercices</strong> de difficulté croissante : un exercice guidé, un entraînement, et souvent un défi.</li>
<li><strong>✓ Vérifier ma réponse</strong> lance ton code, montre le résultat et dit ce qui va ou ne va pas. C'est le seul bouton dont tu as besoin la plupart du temps.</li>
<li>En HTML et en CSS, <strong>▶ Exécuter</strong> s'ajoute : il montre ta page sans te corriger, pour tâtonner tranquillement.</li>
<li>Le bouton <strong>⋯</strong> range ce qui sert plus rarement : remettre le code de départ, ou reprendre ton code dans le bac à sable.</li>
<li>Ta progression et ton code sont <strong>sauvegardés automatiquement</strong> : ferme, reviens plus tard, tu reprendras où tu en étais.</li>
<li><strong>📚 Encyclopédie</strong>, en bas à gauche, ouvre les références : mémos des langages, glossaire, panorama des outils. Elle servira longtemps après la dernière leçon.</li>
</ul>

<h2>Pas à pas</h2>
<p>La boucle que tu vas répéter des centaines de fois, et l'aide qui apparaît à mesure :</p>
<table class="memo-table trace">
<tr><th>Ce que tu fais</th><th>Ce qui s'ouvre à toi</th></tr>
<tr><td>tu écris et tu vérifies</td><td>le résultat, et un verdict qui dit où ça coince</td></tr>
<tr><td>ça ne passe pas : tu relis</td><td><strong>💡 Indice</strong> apparaît — il dit où regarder, pas quoi écrire</td></tr>
<tr><td>tu réessaies</td><td><strong>👀 Solution</strong> s'ajoute, si tu en as besoin</td></tr>
<tr><td>ça passe</td><td>à toi de jouer : change une valeur, casse, répare</td></tr>
</table>
<p>L'aide arrive dans cet ordre exprès. Un indice livré avant le premier essai ne sert à rien : c'est en cherchant quelques minutes qu'on fabrique le souvenir auquel l'indice viendra s'accrocher. Regarder la solution n'est pas tricher — mais la regarder <em>trop tôt</em> fait perdre le bénéfice de l'exercice sans qu'on s'en aperçoive.</p>

<h2>Trois conseils qui changent tout</h2>
<p><strong>Tape le code toi-même.</strong> Ne copie-colle jamais : c'est en tapant qu'on mémorise, fautes de frappe comprises — et ce sont elles qui apprennent à lire les messages d'erreur.</p>
<p><strong>Les erreurs sont normales.</strong> Les développeurs professionnels en font toute la journée. Une erreur est une information : lis le message, cherche ce qui cloche, corrige. C'est le cœur du métier, pas un accident de parcours.</p>
<p><strong>Expérimente.</strong> Après chaque exercice réussi, amuse-toi : change une valeur, casse le code exprès, répare-le. Les deux minutes passées là valent souvent la leçon entière.</p>

<h2>Les pièges</h2>
<p><strong>Copier-coller le code des leçons.</strong> Ça marche du premier coup, et il n'en reste rien. Taper est lent, et c'est le but : chaque caractère tapé est une occasion de se tromper, donc d'apprendre.</p>
<p><strong>Ouvrir la solution dès le premier blocage.</strong> On la lit, tout paraît évident, et l'on ne saurait pas la réécrire cinq minutes plus tard. Laisse-toi d'abord chercher sans savoir.</p>
<p><strong>Sauter les exercices pour « avancer ».</strong> Le texte d'une leçon ne s'installe qu'en étant utilisé. Sans les exercices, on avance dans le sommaire, pas dans la compétence.</p>
<p><strong>Vouloir tout retenir.</strong> Personne ne connaît par cœur les propriétés CSS ni les méthodes de tableau. Ce qui se retient, ce sont les notions ; le détail se cherche — y compris dans l'encyclopédie de ce logiciel.</p>

<h2>Dans la vraie vie</h2>
<p>Cette boucle — essayer, lire le retour, corriger — est exactement celle d'une journée de développement. Un professionnel écrit un bout de code, l'exécute, lit l'erreur, ajuste, recommence, des dizaines de fois par jour. En t'y habituant ici, tu n'apprends pas seulement du code : tu prends le rythme de travail du métier.</p>

<div class="a-retenir">
<ul>
<li><strong>✓ Vérifier ma réponse</strong> suffit presque toujours ; l'aide vient ensuite, dans l'ordre.</li>
<li>Tape le code, ne le copie pas : les fautes de frappe font partie de l'apprentissage.</li>
<li>Une erreur est une information, jamais un verdict sur toi.</li>
<li>Tout est sauvegardé : tu peux fermer et revenir quand tu veux.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi l'indice n'arrive qu'après un essai</summary>
<p>Ce n'est pas pour te faire souffrir, et ce n'est pas une idée de ce logiciel : c'est l'un des résultats les mieux établis sur la mémoire. Un effort de récupération, même infructueux, prépare le terrain mieux que la lecture d'une réponse juste. Autrement dit : avoir cherché pendant trois minutes et avoir eu tort rend l'indice beaucoup plus efficace que de l'avoir lu tout de suite. Les boutons apparaissent donc dans cet ordre, et c'est à ton avantage.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      consigne: 'Le code ci-dessous affiche « Bonjour ». Remplace le mot <code>Bonjour</code> par <code>Bonjour, je code !</code> puis clique sur <strong>Exécuter</strong> pour voir le résultat, et enfin sur <strong>Vérifier ma réponse</strong>.',
      codeDepart: '<h1>Bonjour</h1>',
      indices: [
        "Le code est déjà écrit et il fonctionne. Une seule chose est à changer, et ce n’est pas du code : c’est du texte.",
        "Les chevrons <code>&lt;h1&gt;</code> et <code>&lt;/h1&gt;</code> encadrent le texte affiché. C’est ce qui est <strong>entre</strong> les deux qu’il faut remplacer.",
        "Clique dans le cadre sombre et remplace le mot, sans toucher aux chevrons de part et d’autre."
      ],
      solution: '<h1>Bonjour, je code !</h1>',
      verifier: function (ctx) {
        const h1 = ctx.doc.querySelector('h1');
        if (!h1) return { ok: false, message: 'Il faut garder la balise <code>&lt;h1&gt;</code> autour du texte.' };
        const t = h1.textContent.trim().toLowerCase().replace(/\s+/g, ' ');
        if (t.indexOf('je code') !== -1) {
          return { ok: true, message: 'Tu viens d\'écrire et d\'exécuter ton premier code. Officiellement, l\'aventure commence !' };
        }
        if (t === 'bonjour') return { ok: false, message: 'Tu n\'as pas encore modifié le texte. Remplace « Bonjour » par « Bonjour, je code ! ».' };
        return { ok: false, message: 'Presque ! Le texte attendu est : <code>Bonjour, je code !</code>' };
      }
    },
    {
      type: 'html',
      consigne: '<strong>Déjà un défi !</strong> Sans regarder la leçon suivante : ajoute une <strong>deuxième ligne</strong> sous le titre, en recopiant ce modèle avec ta propre phrase : <code>&lt;p&gt;Ma phrase.&lt;/p&gt;</code> — tu viens de découvrir la balise « paragraphe ».',
      codeDepart: '<h1>Bonjour, je code !</h1>\n',
      indices: [
        "Tu viens de voir qu’un titre s’écrit entre deux balises. Un paragraphe suit exactement la même logique, avec un autre nom.",
        "La balise du paragraphe s’appelle <code>p</code>. Comme pour le titre, il en faut une pour ouvrir et une pour fermer.",
        "Sur la ligne du dessous : <code>&lt;p&gt;</code>, puis ta phrase, puis <code>&lt;/p&gt;</code>."
      ],
      solution: '<h1>Bonjour, je code !</h1>\n<p>Et voici ma toute première phrase en HTML.</p>',
      verifier: function (ctx) {
        const p = ctx.doc.querySelector('p');
        if (!p) return { ok: false, message: 'Je ne trouve pas de balise <code>&lt;p&gt;</code>. Modèle : <code>&lt;p&gt;Ma phrase.&lt;/p&gt;</code>' };
        if (!p.textContent.trim()) return { ok: false, message: 'Ta balise <code>&lt;p&gt;</code> est vide : écris une phrase entre l\'ouvrante et la fermante.' };
        if (!ctx.doc.querySelector('h1')) return { ok: false, message: 'Garde aussi le titre <code>&lt;h1&gt;</code> au-dessus !' };
        return { ok: true, message: 'Tu as déjà deviné comment fonctionne une balise — le module HTML va te sembler naturel.' };
      }
    }
  ]
},

];
