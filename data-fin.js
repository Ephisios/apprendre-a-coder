/* ===== Module final : Et après ? ===== */
window.DATA_FIN = [

{
  id: 'fin-1',
  titre: 'Le tour des autres langages',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Félicitations pour être arrivé jusqu'ici. Maintenant, élargissons l'horizon — et surtout, voici la démonstration que <strong>tu peux déjà presque lire les autres langages</strong>.</p>
<p>Cette leçon existe parce que la peur du langage suivant est le principal frein après un premier parcours. On croit avoir appris « le JavaScript ». On a en réalité appris la programmation, et c'est beaucoup plus transférable qu'il n'y paraît.</p>

<h2>La preuve : le même programme en quatre langages</h2>
<p>Une boucle qui dit bonjour à chaque personne d'une liste. D'abord en JavaScript, que tu connais :</p>
<pre class="bloc-code">// JavaScript
let invites = ["Léa", "Tom"];
for (const personne of invites) {
    console.log("Bonjour " + personne);
}</pre>
<p>Le même en <strong>Python</strong> :</p>
<pre class="bloc-code"># Python
invites = ["Léa", "Tom"]
for personne in invites:
    print("Bonjour " + personne)</pre>
<p>En <strong>PHP</strong> :</p>
<pre class="bloc-code">// PHP
$invites = ["Léa", "Tom"];
foreach ($invites as $personne) {
    echo "Bonjour " . $personne;
}</pre>
<p>Et en <strong>Java</strong> :</p>
<pre class="bloc-code">// Java
String[] invites = {"Léa", "Tom"};
for (String personne : invites) {
    System.out.println("Bonjour " + personne);
}</pre>

<h2>Pas à pas</h2>
<p>Mets-les côte à côte, idée par idée, et le vernis tombe :</p>
<table class="memo-table trace">
<tr><th>L'idée</th><th>JavaScript</th><th>Python</th><th>Java</th></tr>
<tr><td>une liste</td><td>crochets</td><td>crochets</td><td>accolades, et le type dit</td></tr>
<tr><td>parcourir</td><td><code>for … of</code></td><td><code>for … in</code></td><td><code>for ( … : … )</code></td></tr>
<tr><td>afficher</td><td><code>console.log</code></td><td><code>print</code></td><td><code>System.out.println</code></td></tr>
<tr><td>coller du texte</td><td><code>+</code></td><td><code>+</code></td><td><code>+</code></td></tr>
</table>
<p>Une liste, une boucle, un affichage : partout les mêmes trois idées. Seuls la ponctuation et les noms changent. C'est ça, le secret — tu n'as pas appris « le JavaScript », tu as appris <em>la programmation</em>.</p>
<p>Et ce n'est pas une figure de style : les versions Python et Java ci-dessus tournent telles quelles dans l'éditeur de ce logiciel, et affichent les deux mêmes lignes que la version JavaScript. Les modules Python et Java sont là pour ça — essaie, c'est plus convaincant que n'importe quel paragraphe.</p>

<h2>Qui fait quoi</h2>
<ul>
<li><strong>Python</strong> — le couteau suisse : données, intelligence artificielle, scripts, automatisation. Réputé le plus simple à lire, et un excellent deuxième langage.</li>
<li><strong>SQL</strong> — interroger les bases de données. Indispensable dès qu'une application stocke quelque chose, et apprenable en quelques jours.</li>
<li><strong>PHP</strong> — fait tourner une part énorme du web côté serveur, WordPress et Wikipédia compris.</li>
<li><strong>Java</strong> et <strong>C#</strong> — les poids lourds des grandes entreprises, d'Android et de Windows.</li>
<li><strong>C</strong> et <strong>C++</strong> — proches de la machine : systèmes d'exploitation, jeux vidéo, objets connectés. Puissants et exigeants.</li>
<li><strong>TypeScript</strong> — un JavaScript renforcé, très demandé. Une évolution naturelle quand le JS est à l'aise.</li>
</ul>

<h2>Les pièges</h2>
<p><strong>Croire qu'il faut tout réapprendre.</strong> Ce qui change d'un langage à l'autre, c'est la syntaxe et la bibliothèque standard — quelques jours de travail. Les notions, elles, sont déjà acquises.</p>
<p><strong>Collectionner les langages.</strong> Trois langages survolés valent bien moins qu'un seul maîtrisé. Mieux vaut consolider, puis élargir.</p>
<p><strong>Choisir selon la mode.</strong> Choisis selon ce que tu veux construire : un site, un script d'automatisation, une analyse de données. Le besoin désigne le langage mieux que n'importe quel classement.</p>
<p><strong>Confondre le langage et son écosystème.</strong> Apprendre Python prend des semaines ; apprendre les outils qui vont autour prend bien plus. C'est normal, et c'est vrai pour tout le monde.</p>

<h2>Dans la vraie vie</h2>
<p>Un développeur expérimenté lit couramment des langages qu'il n'écrit pas. C'est cette lecture qui permet de reprendre un projet existant, de comprendre un exemple trouvé en ligne ou de discuter avec une équipe qui travaille autrement. Tu viens d'acquérir le début de cette compétence — bien plus utile, au quotidien, que la maîtrise d'un langage de plus.</p>

<div class="a-retenir">
<ul>
<li>Les notions se transposent : seules la syntaxe et les bibliothèques changent.</li>
<li>Une liste, une boucle, un affichage — les mêmes idées dans les quatre langages.</li>
<li>Bon plan de route : consolider le JavaScript, puis SQL, puis Python.</li>
<li>Choisis un langage pour ce que tu veux construire, pas pour sa popularité.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : ce qui change vraiment d'un langage à l'autre</summary>
<p>Au-delà de la ponctuation, deux différences comptent. Le <strong>typage</strong> : Java exige que tu annonces le type de chaque variable et refuse de compiler sinon, là où JavaScript et Python te laissent faire et ne protestent qu'à l'exécution. Et la <strong>gestion de la mémoire</strong> : en C, c'est toi qui réserves et libères, tandis que les autres s'en chargent pour toi. Les modules Java et C de ce logiciel te font goûter aux deux — et ce sont ces deux points, pas la syntaxe, qui donnent à chaque langage son caractère.</p>
</details>
`,
  exercices: [
    {
      type: 'qcm',
      consigne: '<strong>Question 1.</strong> Regarde le programme Python de la leçon. Que fait <code>print(...)</code> ?',
      choix: [
        'Il imprime le programme sur papier',
        'La même chose que console.log en JavaScript : afficher',
        'Il crée une variable',
        'Impossible à savoir sans apprendre Python'
      ],
      bonne: 1,
      explication: 'Exactement — chaque langage a sa façon d\'afficher : <code>console.log</code>, <code>print</code>, <code>echo</code>, <code>System.out.println</code>... mais le CONCEPT est identique. Tu sais déjà lire du Python.',
      aides: [
        'Aucune imprimante en jeu ! « print » est le mot historique pour « afficher » (à l\'époque des machines à écrire connectées...).',
        '',
        'Les variables Python se créent comme en JS, juste sans le let : <code>invites = [...]</code>.',
        'Regarde le contexte : print("Bonjour...") juste là où le JavaScript faisait console.log("Bonjour..."). Tu peux déduire !'
      ]
    },
    {
      type: 'qcm',
      consigne: '<strong>Question 2.</strong> Tu veux créer un site qui stocke les avis de ses utilisateurs dans une base de données. Quel duo de compétences te manque-t-il le moins après cette formation ?',
      choix: [
        'Tout est à réapprendre de zéro',
        'Il me manque surtout SQL (la base de données) et un langage serveur — le reste, je l\'ai',
        'Il me manque le HTML et le CSS',
        'Un site ne peut pas stocker de données'
      ],
      bonne: 1,
      explication: 'Tu sais déjà faire l\'interface (HTML/CSS) et la logique côté navigateur (JS). Pour stocker durablement côté serveur : SQL + un langage serveur (Node.js — du JavaScript ! — ou PHP ou Python). Ton bagage couvre déjà la moitié du chemin.',
      aides: [
        'Au contraire : l\'interface et la logique, tu les as déjà. Il ne manque que la partie stockage côté serveur.',
        '',
        'Le HTML et le CSS, tu viens de les apprendre — relis ta propre progression !',
        'Bien sûr que si — c\'est même le rôle principal de la plupart des sites (avis, comptes, messages...).'
      ]
    }
  ]
},

{
  id: 'fin-2',
  titre: 'Continuer à apprendre en autonomie',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Dernière leçon, et peut-être la plus importante. Ce logiciel t'a donné des fondations ; il lui reste à te rendre capable de t'en passer.</p>
<p>Car le vrai risque, après un parcours comme celui-ci, n'est pas de manquer de connaissances : c'est de ne jamais oser construire quelque chose sans consigne. Voici donc comment on continue, seul.</p>

<h2>La règle d'or : des projets, pas des cours</h2>
<p>On n'apprend pas à coder en accumulant des leçons, mais en <strong>construisant des choses</strong>. Le cycle est toujours le même : choisir un petit projet qui fait envie, se retrouver bloqué, chercher, débloquer, recommencer. Chaque blocage résolu est une compétence gagnée — et elle tient, parce qu'elle a coûté quelque chose.</p>
<p>Des idées, par difficulté croissante : ta page de profil en HTML et CSS, un pendu ou un morpion, un suivi d'habitudes avec le <code>localStorage</code>, une calculatrice complète. Et pour finir, l'exercice le plus instructif de tous : refaire la liste de tâches de zéro, sans aide, puis la comparer à celle des projets guidés.</p>

<h2>Ta boîte à outils pour la suite</h2>
<ul>
<li><strong>Un vrai éditeur de code</strong> : installe Visual Studio Code, gratuit. Crée un fichier <code>index.html</code>, ouvre-le dans ton navigateur : te voilà équipé comme un professionnel.</li>
<li><strong>La console du navigateur</strong> : la touche <kbd>F12</kbd> sur n'importe quel site ouvre la même console que dans nos exercices, en plus puissant. Les erreurs de tes pages s'y affichent.</li>
<li><strong>MDN Web Docs</strong> — la référence du web, en français : chaque balise, chaque propriété CSS, chaque fonction JavaScript y est documentée.</li>
<li><strong>L'encyclopédie de ce logiciel</strong> — glossaire, panorama des outils, mémos des langages. Elle est faite pour être consultée pendant des années.</li>
</ul>

<h2>Pas à pas : lire un message d'erreur</h2>
<p>Ce qui distingue un débutant qui progresse d'un débutant qui abandonne, c'est sa réaction devant une erreur. La méthode tient en quatre temps :</p>
<table class="memo-table trace">
<tr><th>Temps</th><th>Ce que tu fais</th><th>Ce que ça donne presque toujours</th></tr>
<tr><td>1</td><td>lire le message en entier</td><td>le type d'erreur, et la ligne</td></tr>
<tr><td>2</td><td>aller voir cette ligne</td><td>la faute de frappe, la parenthèse ou l'accolade</td></tr>
<tr><td>3</td><td>chercher le message en ligne</td><td>quelqu'un a eu la même, et l'a racontée</td></tr>
<tr><td>4</td><td>demander une explication</td><td>de quoi corriger seul la prochaine fois</td></tr>
</table>
<p>Neuf fois sur dix, on s'arrête au deuxième temps. Et le quatrième mérite une précision : demande à une intelligence artificielle d'<em>expliquer</em> ton erreur, pas de réécrire ton code. La différence entre les deux demandes décide de ce que tu sauras faire dans six mois.</p>

<h2>Les pièges</h2>
<p><strong>Le tutoriel sans fin.</strong> Enchaîner les cours donne le sentiment d'avancer sans jamais rien construire. Dès que tu peux coder une chose par toi-même, arrête de lire et code-la.</p>
<p><strong>Attendre de se sentir prêt.</strong> Ce moment n'arrive pas. On devient prêt en commençant, et personne ne commence sans appréhension.</p>
<p><strong>Coder au hasard jusqu'à ce que ça marche.</strong> Changer des choses sans comprendre finit parfois par fonctionner — et l'on refera la même erreur demain, sans savoir pourquoi la première fois s'est arrangée.</p>
<p><strong>Comparer son code à celui des autres.</strong> Les projets qu'on voit en ligne sont finis, relus, réécrits. Le tien est en cours. Comparer un brouillon à une version publiée est le plus sûr moyen de s'arrêter.</p>

<h2>Dans la vraie vie</h2>
<p>Personne ne « connaît tout » en programmation. Les professionnels cherchent dans la documentation tous les jours, oublient la syntaxe exacte d'une fonction utilisée la semaine passée, et copient leurs propres anciens projets. Ce qui fait la différence n'est pas ce qu'ils savent par cœur : c'est qu'ils savent où chercher, et qu'ils ne s'arrêtent pas devant un message d'erreur.</p>

<div class="a-retenir">
<ul>
<li>On apprend en construisant : des projets, pas des cours.</li>
<li>Devant une erreur : lire le message en entier, puis aller à la ligne indiquée.</li>
<li>Demande qu'on t'<strong>explique</strong> une erreur, jamais qu'on la corrige à ta place.</li>
<li>Personne ne connaît tout — on sait chercher, et ça suffit.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : tu es arrivé au bout</summary>
<p>Regarde en arrière un instant : tu as écrit des pages web, des programmes qui décident et qui répètent, des requêtes de base de données, et quatre applications complètes dont une qui garde ses données. Tu as lu du Python, du Java et du C. Rien de tout cela n'était évident il y a quelques semaines.</p>
<p>Ce qui te reste n'est pas une liste de notions à apprendre, c'est une habitude à garder : écrire, exécuter, lire ce qui ne va pas, corriger. Tout le métier tient dans cette boucle, et tu la connais maintenant. Bonne route.</p>
</details>
`,
  exercices: [
    {
      type: 'qcm',
      consigne: '<strong>Question 1.</strong> Ton code affiche une erreur que tu ne comprends pas. Quel est le PREMIER réflexe ?',
      choix: [
        'Tout effacer et recommencer de zéro',
        'Lire le message d\'erreur en entier : il indique souvent la ligne et la cause',
        'Changer des choses au hasard jusqu\'à ce que ça marche',
        'Abandonner le projet, il est maudit'
      ],
      bonne: 1,
      explication: 'Le message d\'erreur est une CARTE AU TRÉSOR, pas une punition. Ligne, type d\'erreur, souvent la cause : tout y est. Les pros le lisent toujours en premier — toi aussi maintenant.',
      aides: [
        'Radical, et tu perdrais tout ton travail... alors que l\'erreur tient souvent à UN caractère.',
        '',
        'Le « debugging au hasard » finit parfois par marcher... sans que tu saches pourquoi. Tu referas la même erreur demain. Lis d\'abord !',
        'Aucun code n\'est maudit — chaque erreur a une cause logique, et elle est presque toujours écrite dans le message.'
      ]
    },
    {
      type: 'qcm',
      consigne: '<strong>Question 2 — la dernière du parcours !</strong> Quelle est la meilleure façon de continuer à progresser maintenant ?',
      choix: [
        'Relire toutes les leçons en boucle jusqu\'à les connaître par cœur',
        'Attendre de se sentir « prêt » avant de coder quoi que ce soit',
        'Construire des petits projets personnels, se bloquer, chercher, se débloquer',
        'Apprendre les 20 langages les plus populaires en parallèle'
      ],
      bonne: 2,
      explication: '🎓 <strong>FORMATION TERMINÉE !</strong> Le cycle projet → blocage → recherche → déblocage est LE moteur de la progression. Tu as les fondations, la méthode, et une encyclopédie sous la main. La suite s\'écrit en codant. Bonne route, développeur.',
      aides: [
        'La théorie s\'évapore sans pratique. Les leçons sont là comme référence — mais c\'est en construisant qu\'on grave les connaissances.',
        'Personne ne se sent jamais « prêt » — les développeurs pros non plus ! On apprend en faisant, pas avant de faire.',
        '',
        'La dispersion est l\'ennemi du débutant : un langage bien maîtrisé vaut mieux que 20 survolés. JavaScript à fond, puis SQL, puis Python — dans cet ordre.'
      ]
    }
  ]
},

];
