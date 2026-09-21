/* ===== Module final : Et après ? ===== */
window.DATA_FIN = [

{
  id: 'fin-1',
  titre: 'Le tour des autres langages',
  contenu: `
<p>Félicitations pour être arrivé jusqu'ici ! Tu maîtrises les bases du trio du web. Maintenant, élargissons l'horizon : voici les autres grands langages, et surtout — la démonstration que <strong>tu peux déjà presque les lire</strong>.</p>

<h2>La preuve : le même programme en 4 langages</h2>
<p>Une fonction qui dit bonjour à chaque personne d'une liste. D'abord en JavaScript, que tu connais :</p>
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
<p>En <strong>Java</strong> :</p>
<pre class="bloc-code">// Java
String[] invites = {"Léa", "Tom"};
for (String personne : invites) {
    System.out.println("Bonjour " + personne);
}</pre>
<p>Tu vois ? <strong>Une liste, une boucle, un affichage</strong> — partout. Seule la ponctuation change. C'est ça, le secret : tu n'as pas appris « le JavaScript », tu as appris <em>la programmation</em>.</p>

<h2>Qui fait quoi ?</h2>
<ul>
<li><strong>Python</strong> — le couteau suisse : données, IA, scripts, automatisation. Réputé le plus simple à lire. Excellent 2e langage.</li>
<li><strong>SQL</strong> — interroger les bases de données (<code>SELECT * FROM films WHERE annee > 2000</code>). Indispensable dès qu'une application stocke des données. Tes apps l'utilisent déjà !</li>
<li><strong>PHP</strong> — fait tourner une énorme partie du web côté serveur (WordPress, Wikipédia...).</li>
<li><strong>Java / C#</strong> — les poids lourds des grandes entreprises et des applications Android / Windows.</li>
<li><strong>C / C++</strong> — les langages « proches de la machine » : systèmes d'exploitation, jeux vidéo, objets connectés. Puissants et exigeants.</li>
<li><strong>TypeScript</strong> — un JavaScript renforcé, très demandé en entreprise. Quand tu seras à l'aise en JS, c'est une évolution naturelle.</li>
</ul>

<div class="astuce">✅ Le bon plan de route : consolider le JavaScript → apprendre SQL (quelques jours !) → puis Python. Avec ces trois-là, tu peux presque tout faire. L'encyclopédie (bouton 📚) contient un panorama détaillé avec des exemples de Python et de SQL.</div>
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
<p>Dernière leçon — la plus importante peut-être. Ce logiciel t'a donné les fondations ; voici comment construire dessus, seul.</p>

<h2>La règle d'or : des projets, pas des cours</h2>
<p>On n'apprend pas à coder en accumulant des leçons, mais en <strong>construisant des choses</strong>. Le cycle vertueux : choisir un petit projet qui te fait envie → se retrouver bloqué → chercher → débloquer → recommencer. Chaque blocage résolu est une compétence gagnée.</p>
<p>Idées de premiers projets en solo (dans l'ordre de difficulté) :</p>
<ol>
<li>ta page de profil personnelle (HTML/CSS pur) ;</li>
<li>un pendu ou un morpion (tu as toutes les briques !) ;</li>
<li>un tracker d'habitudes avec localStorage ;</li>
<li>une calculatrice complète ;</li>
<li>refaire de zéro, sans aide, la to-do list — puis la comparer à celle des projets guidés.</li>
</ol>

<h2>Ta boîte à outils pour la suite</h2>
<ul>
<li><strong>Un vrai éditeur de code</strong> : installe <strong>Visual Studio Code</strong> (gratuit). Crée un fichier <code>index.html</code>, ouvre-le dans ton navigateur : te voilà équipé comme un pro.</li>
<li><strong>La console du navigateur</strong> : appuie sur <kbd>F12</kbd> sur n'importe quel site → c'est la même console que dans nos exercices, en plus puissant. Les erreurs de tes pages s'y affichent.</li>
<li><strong>MDN Web Docs</strong> (developer.mozilla.org) — LA référence du web, en français. Chaque balise, chaque propriété CSS, chaque fonction JavaScript y est documentée.</li>
<li><strong>freeCodeCamp, OpenClassrooms, Grafikart</strong> — des cours gratuits en ligne pour approfondir, avec exercices.</li>
<li><strong>L'encyclopédie de ce logiciel</strong> (bouton 📚) — glossaire, panorama des outils (Git, terminal, VS Code), mémos des langages : elle est faite pour être consultée pendant des années.</li>
</ul>

<h2>Lire les messages d'erreur (le vrai superpouvoir)</h2>
<p>Ce qui distingue un débutant qui progresse d'un débutant qui abandonne : sa réaction face à une erreur. La méthode :</p>
<ol>
<li><strong>lis le message en entier</strong> — il contient presque toujours la ligne et la cause ;</li>
<li>va voir cette ligne, cherche la faute de frappe, la parenthèse ou l'accolade manquante ;</li>
<li>toujours bloqué ? Copie le message dans un moteur de recherche : quelqu'un a eu la même erreur avant toi, garanti ;</li>
<li>et bien sûr : une IA comme celle qui a construit ce logiciel peut t'expliquer une erreur — mais demande-lui d'<em>expliquer</em>, pas de faire à ta place. C'est toi qui apprends.</li>
</ol>

<div class="astuce">🎓 Tu es arrivé au bout. Retiens ceci : personne ne « connaît tout » en programmation — les professionnels cherchent dans la documentation tous les jours. Ce qui compte, c'est ce que tu as maintenant : les concepts, la méthode, et la certitude que tu peux apprendre le reste. Bonne route, codeur.</div>
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
