/* ===== Module Bienvenue ===== */
window.DATA_INTRO = [

{
  id: 'intro-1',
  titre: 'C\'est quoi, coder ?',
  contenu: `
<p>Bienvenue ! Tu pars de zéro, et c'est très bien : ce logiciel est fait exactement pour ça. Commençons par le commencement.</p>

<h2>Un ordinateur est bête (mais obéissant)</h2>
<p>Un ordinateur ne comprend rien, ne devine rien, n'improvise jamais. En revanche, il exécute <strong>exactement</strong> ce qu'on lui demande, des millions de fois par seconde, sans jamais se tromper ni se fatiguer.</p>
<p><strong>Coder</strong> (ou « programmer »), c'est écrire des instructions que l'ordinateur va suivre à la lettre. Ces instructions s'écrivent dans un <strong>langage de programmation</strong> : un langage inventé par les humains, avec un vocabulaire réduit et des règles très strictes, que l'ordinateur sait interpréter.</p>

<div class="info">💬 Une recette de cuisine est un bon parallèle : « casse 3 œufs, fouette, ajoute la farine... ». Un programme, c'est pareil : une liste d'étapes précises. La différence, c'est qu'un cuisinier comprend « fouette énergiquement » alors qu'un ordinateur a besoin qu'on lui dise <em>tout</em>, dans le bon ordre, sans ambiguïté.</div>

<h2>Pourquoi il existe plein de langages ?</h2>
<p>Comme les langues humaines, il existe des dizaines de langages de programmation. Chacun est plus adapté à certains usages :</p>
<ul>
<li><strong>HTML et CSS</strong> — décrire le contenu et l'apparence des pages web (ce ne sont pas de « vrais » langages de programmation, mais des langages de description — on y reviendra) ;</li>
<li><strong>JavaScript</strong> — rendre les pages web interactives ; c'est le langage le plus utilisé au monde ;</li>
<li><strong>Python</strong> — analyse de données, automatisation, intelligence artificielle, scripts ;</li>
<li><strong>SQL</strong> — interroger des bases de données ;</li>
<li>et bien d'autres : Java, C, C#, PHP, Go...</li>
</ul>

<h2>La bonne nouvelle</h2>
<p>Voici le secret que tous les développeurs connaissent : <strong>les concepts sont les mêmes partout</strong>. Variables, conditions, boucles, fonctions... une fois que tu les maîtrises dans un langage, tu les reconnais dans tous les autres. Apprendre son premier langage prend des mois ; le deuxième, quelques semaines ; le troisième, quelques jours.</p>
<p>C'est pourquoi ce logiciel se concentre d'abord sur le trio du web — <strong>HTML, CSS, JavaScript</strong> — qui a un énorme avantage pour débuter : le résultat s'affiche immédiatement sous tes yeux, dans le navigateur que tu utilises déjà tous les jours.</p>

<div class="astuce">✅ Retiens simplement : <strong>coder = écrire des instructions précises que l'ordinateur exécute</strong>. Tout le reste s'apprend pas à pas. Vérifie que c'est acquis avec les questions ci-dessous.</div>
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
<p>Avant d'écrire ta première ligne de code, comprenons ce qui se passe quand tu ouvres un site web.</p>

<h2>Le navigateur, ton meilleur ami</h2>
<p>Chrome, Edge, Firefox... un <strong>navigateur</strong> est un programme dont le métier est de lire des fichiers de code et de les transformer en pages visibles. Quand tu vas sur un site, ton navigateur télécharge des fichiers, les lit, et dessine la page. C'est tout.</p>
<p>Et voici le point clé pour nous : <strong>le navigateur peut aussi lire des fichiers stockés sur ton propre ordinateur</strong>. Pas besoin d'internet ni de serveur pour apprendre — ce logiciel lui-même fonctionne comme ça !</p>

<h2>Les trois langages du web</h2>
<p>Une page web est faite de trois couches, chacune avec son langage :</p>
<ul>
<li><strong>HTML</strong> — le <em>squelette</em> : « ici un titre, là un paragraphe, là une image, là un bouton ». Le contenu et sa structure.</li>
<li><strong>CSS</strong> — la <em>peau</em> : « le titre est bleu, centré, en gros ; le bouton a des coins arrondis ». L'apparence.</li>
<li><strong>JavaScript</strong> — les <em>muscles</em> : « quand on clique sur le bouton, affiche un message ». Le comportement, l'interactivité.</li>
</ul>

<div class="info">🏠 Image classique : si une page web était une maison, le HTML serait les murs et les pièces, le CSS la peinture et la décoration, et le JavaScript l'électricité et la plomberie qui font que tout fonctionne.</div>

<h2>À quoi ressemble du code ?</h2>
<p>Voici une page web complète, minuscule mais réelle :</p>
<pre class="bloc-code">&lt;h1&gt;Bonjour !&lt;/h1&gt;
&lt;p&gt;Ceci est ma première page web.&lt;/p&gt;</pre>
<p>Ne cherche pas encore à tout comprendre — dès la prochaine leçon, tu écriras ce code toi-même et tu verras le résultat s'afficher.</p>

<div class="astuce">✅ Retiens : <strong>HTML = structure, CSS = apparence, JavaScript = comportement</strong>. On va les apprendre dans cet ordre, car chacun s'appuie sur le précédent.</div>
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
<p>Dernière étape avant de plonger : voyons comment fonctionnent les leçons.</p>

<h2>Le principe</h2>
<ul>
<li>Chaque leçon <strong>explique une notion</strong>, puis te propose une <strong>série d'exercices</strong> de difficulté croissante : un exercice guidé, un entraînement, et souvent un défi.</li>
<li>Le bouton <strong>✓ Vérifier ma réponse</strong> lance ton code, affiche le résultat, et te dit ce qui va ou ne va pas. C'est le seul bouton dont tu as besoin la plupart du temps.</li>
<li>En HTML et en CSS, un bouton <strong>▶ Exécuter</strong> s'ajoute : il montre ta page sans te corriger, pour tâtonner tranquillement.</li>
<li>Bloqué ? Après un premier essai raté, un bouton <strong>💡 Indice</strong> apparaît : il te dit <em>où regarder</em>, sans écrire le code à ta place. Après un deuxième essai, <strong>👀 Solution</strong> s'ajoute. S'en servir n'est pas tricher — mais l'ordre compte : c'est en essayant de travers qu'on apprend le plus.</li>
<li>Le bouton <strong>⋯</strong> range ce qui sert plus rarement : remettre le code de départ, ou reprendre ton code dans le bac à sable.</li>
<li>Ta progression et ton code sont <strong>sauvegardés automatiquement</strong> : tu peux fermer et revenir plus tard, tu reprendras où tu en étais.</li>
<li>Le bouton <strong>📚 Encyclopédie</strong> (en bas à gauche) ouvre les références : mémos des langages, glossaire, panorama des outils... Elle t'accompagnera bien après la fin des leçons.</li>
</ul>

<h2>Trois conseils qui changent tout</h2>
<ol>
<li><strong>Tape le code toi-même.</strong> Ne copie-colle jamais : c'est en tapant qu'on mémorise, y compris en faisant des fautes de frappe.</li>
<li><strong>Les erreurs sont normales.</strong> Les développeurs professionnels en font toute la journée. Une erreur n'est pas un échec, c'est une information : lis le message, cherche ce qui cloche, corrige. C'est LE cœur du métier.</li>
<li><strong>Expérimente.</strong> Après chaque exercice réussi, amuse-toi : change une valeur, casse le code, répare-le. C'est là qu'on apprend vraiment.</li>
</ol>

<h2>Tes tout premiers exercices</h2>
<p>Pour vérifier que tout fonctionne, deux exercices symboliques t'attendent. La tradition veut que tout programmeur commence par afficher « Bonjour » (les anglophones disent « Hello World »). À toi !</p>
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
