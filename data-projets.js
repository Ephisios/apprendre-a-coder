/* ===== Module Projets guidés ===== */
window.DATA_PROJETS = [

{
  id: 'proj-1',
  titre: 'Projet : la liste de tâches',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>C'est le projet initiatique de tout développeur web : la liste de tâches. Petit en apparence, et il combine tout ce que tu sais — saisie, événements, création d'éléments, conditions.</p>
<p>S'il est devenu un passage obligé, c'est qu'il contient en miniature la structure de n'importe quelle application : l'utilisateur agit, quelque chose change, l'affichage suit. Tout le reste n'est qu'une question d'échelle.</p>

<h2>Le cahier des charges</h2>
<ul>
<li>l'utilisateur tape une tâche et clique sur « Ajouter » ;</li>
<li>la tâche apparaît dans la liste ;</li>
<li>le champ se vide, prêt pour la suivante ;</li>
<li>si le champ est vide, on n'ajoute rien — pas de tâche fantôme ;</li>
<li>cliquer sur une tâche la supprime.</li>
</ul>
<p>Lis-le deux fois avant d'écrire une ligne. Un cahier des charges est aussi une liste de contrôle : à la fin, chaque point se vérifie à la main, dans l'aperçu.</p>

<h2>Les outils, tous déjà vus</h2>
<p><code>querySelector</code> pour attraper le champ et le bouton, <code>addEventListener</code> pour le clic, <code>.value</code> pour lire la saisie, <code>createElement</code> et <code>appendChild</code> pour ajouter, <code>.remove()</code> pour supprimer — la seule méthode nouvelle du projet.</p>
<p>Aucune notion neuve, donc. C'est précisément l'exercice : reconnaître lequel de tes outils répond à chaque ligne du cahier des charges.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qu'on vérifie avant de passer à la suite</th></tr>
<tr><td>écouter le clic</td><td>un <code>console.log</code> s'affiche : l'écouteur est bien branché</td></tr>
<tr><td>lire le champ</td><td>le texte tapé apparaît dans la console</td></tr>
<tr><td>créer la ligne</td><td>la tâche s'affiche dans la liste</td></tr>
<tr><td>vider le champ</td><td>on peut enchaîner deux ajouts sans rien effacer</td></tr>
<tr><td>ignorer le vide</td><td>cliquer sans rien taper n'ajoute rien</td></tr>
<tr><td>supprimer au clic</td><td>une tâche cliquée disparaît, les autres restent</td></tr>
</table>
<p>Six étapes, six vérifications. C'est la vraie leçon de ce projet : on n'écrit jamais tout d'un trait. Un défaut trouvé à la troisième étape coûte une minute ; le même cherché après la sixième en coûte vingt, parce qu'il faut d'abord deviner lequel des six morceaux le cause.</p>

<h2>Les pièges</h2>
<p><strong>Lire <code>.value</code> en dehors de l'écouteur.</strong> La variable garde alors la valeur qu'avait le champ au chargement — c'est-à-dire rien. Le symptôme déroute : le programme ajoute toujours une tâche vide, quoi qu'on tape. <code>.value</code> se lit <em>au moment du clic</em>.</p>
<p><strong>Tester le vide après avoir créé la ligne.</strong> L'ordre compte : on refuse d'abord, on fabrique ensuite. Un <code>return</code> seul, en début d'écouteur, quitte la fonction sans rien faire d'autre.</p>
<p><strong>Attendre la fin pour brancher la suppression.</strong> Le bon moment pour donner à une tâche son écouteur de clic est celui où on la crée — elle a son <code>li</code> sous la main, et sait donc qui supprimer. Chercher après coup quelle ligne a été cliquée est un détour.</p>
<p><strong>Dupliquer le calcul du compteur.</strong> Dans l'amélioration, le nombre de tâches change à l'ajout <em>et</em> à la suppression. Écrire le calcul deux fois, c'est se garantir d'en oublier un le jour où il évolue : une fonction appelée aux deux endroits règle la question.</p>

<h2>Dans la vraie vie</h2>
<p>Ce projet est si universel qu'il sert d'étalon pour comparer les outils du métier : un site entier réécrit la même liste de tâches dans des dizaines de bibliothèques, pour qu'on puisse les comparer à vue. Tu viens d'en écrire la version sans aucun outil — celle qui permet de comprendre ce que les autres font à ta place.</p>

<div class="a-retenir">
<ul>
<li>Le cahier des charges est aussi la liste de contrôle finale.</li>
<li>On construit par étapes, en vérifiant chacune avant la suivante.</li>
<li><code>.value</code> se lit <strong>dans</strong> l'écouteur, au moment du clic.</li>
<li>On refuse la saisie vide <em>avant</em> de créer quoi que ce soit.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : où vit cette liste</summary>
<p>Ferme l'onglet et tout disparaît : les tâches n'existent nulle part ailleurs que dans les <code>&lt;li&gt;</code> de la page. L'état de l'application <em>est</em> le HTML. C'est tenable ici, parce que rien n'a besoin de le relire — et c'est exactement ce qui deviendra intenable au projet 4, où il faudra sauvegarder. Garde la remarque en tête : c'est elle qui justifiera l'architecture du carnet.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      hauteur: 320,
      consigne: 'Réalise le cahier des charges complet : ajout au clic, champ vidé après ajout, champ vide ignoré, clic sur une tâche = suppression. Teste chaque étape dans l\'aperçu avant de vérifier !',
      codeDepart: '<style>\n  body { font-family: sans-serif; padding: 16px; }\n  input { padding: 8px; width: 200px; }\n  button { padding: 8px 16px; }\n  li { cursor: pointer; padding: 6px; margin: 4px 0; background: #eef1fe; border-radius: 6px; list-style: none; }\n  li:hover { background: #fdecec; text-decoration: line-through; }\n</style>\n\n<h2>📝 Mes tâches</h2>\n<input id="champ" type="text" placeholder="Nouvelle tâche...">\n<button id="ajouter">Ajouter</button>\n<ul id="liste"></ul>\n\n<script>\n  let champ = document.querySelector("#champ");\n  let liste = document.querySelector("#liste");\n\n  document.querySelector("#ajouter").addEventListener("click", function () {\n    // À toi de jouer, étape par étape !\n\n  });\n</script>',
      indices: [
        "Quatre exigences du cahier des charges, et chacune tient en une ligne ou deux dans l’écouteur du bouton.",
        "Lire le champ, refuser s’il est vide, fabriquer un <code>&lt;li&gt;</code>, l’accrocher à la liste, puis vider le champ. Le clic sur une tâche, lui, demande un écouteur sur le <code>li</code> lui-même.",
        "<code>let texte = champ.value;</code> · <code>if (texte === \"\") { return; }</code> · <code>createElement(\"li\")</code> · <code>appendChild</code> · <code>champ.value = \"\";</code>"
      ],
      solution: '<style>\n  body { font-family: sans-serif; padding: 16px; }\n  input { padding: 8px; width: 200px; }\n  button { padding: 8px 16px; }\n  li { cursor: pointer; padding: 6px; margin: 4px 0; background: #eef1fe; border-radius: 6px; list-style: none; }\n  li:hover { background: #fdecec; text-decoration: line-through; }\n</style>\n\n<h2>📝 Mes tâches</h2>\n<input id="champ" type="text" placeholder="Nouvelle tâche...">\n<button id="ajouter">Ajouter</button>\n<ul id="liste"></ul>\n\n<script>\n  let champ = document.querySelector("#champ");\n  let liste = document.querySelector("#liste");\n\n  document.querySelector("#ajouter").addEventListener("click", function () {\n    let texte = champ.value;\n    if (texte === "") {\n      return;\n    }\n\n    let li = document.createElement("li");\n    li.textContent = texte;\n    li.addEventListener("click", function () {\n      li.remove();\n    });\n\n    liste.appendChild(li);\n    champ.value = "";\n  });\n</script>',
      verifier: function (ctx) {
        const champ = ctx.doc.querySelector('#champ');
        const btn = ctx.doc.querySelector('#ajouter');
        const liste = ctx.doc.querySelector('#liste');
        if (!champ || !btn || !liste) return { ok: false, message: 'Garde le champ, le bouton et la liste du code de départ.' };
        champ.value = 'Acheter du pain';
        btn.click();
        let lis = liste.querySelectorAll('li');
        if (lis.length !== 1 || !/Acheter du pain/.test(lis[0].textContent)) return { ok: false, message: '<strong>Étape 1 :</strong> j\'ai tapé « Acheter du pain » et cliqué — la tâche devrait apparaître dans la liste. (createElement → textContent → appendChild)' };
        if (champ.value !== '') return { ok: false, message: '<strong>Étape 2 :</strong> l\'ajout marche, mais le champ doit se vider après (<code>champ.value = "";</code>).' };
        btn.click();
        if (liste.querySelectorAll('li').length !== 1) return { ok: false, message: '<strong>Étape 3 :</strong> j\'ai cliqué avec un champ vide et une tâche fantôme est apparue ! Bloque ce cas : <code>if (texte === "") { return; }</code> au début.' };
        champ.value = 'Faire du sport';
        btn.click();
        lis = liste.querySelectorAll('li');
        if (lis.length !== 2) return { ok: false, message: 'La deuxième tâche ne s\'ajoute pas — chaque clic (avec du texte) doit créer une nouvelle ligne.' };
        lis[0].click();
        lis = liste.querySelectorAll('li');
        if (lis.length !== 1 || !/sport/i.test(lis[0].textContent)) return { ok: false, message: '<strong>Étape 4 :</strong> j\'ai cliqué sur la première tâche pour la terminer — elle devrait disparaître (et l\'autre rester). L\'astuce : attacher <code>li.remove()</code> au clic du li, au moment de sa création.' };
        return { ok: true, message: '🏆 PREMIÈRE APPLICATION COMPLÈTE ! Une vraie to-do list, robuste, écrite de tes mains. Ce projet est LE rite de passage des développeurs web — bienvenue au club.' };
      }
    },
    {
      type: 'html',
      hauteur: 320,
      consigne: '<strong>Amélioration : le compteur de tâches.</strong> Reprends la solution (fournie en code de départ) et ajoute un compteur : le paragraphe <code>#compteur</code> doit toujours afficher <code>X tâche(s) restante(s)</code>. Mets-le à jour à CHAQUE ajout et CHAQUE suppression, en comptant les éléments avec <code>liste.querySelectorAll("li").length</code>.',
      codeDepart: '<style>\n  body { font-family: sans-serif; padding: 16px; }\n  input { padding: 8px; width: 200px; }\n  button { padding: 8px 16px; }\n  li { cursor: pointer; padding: 6px; margin: 4px 0; background: #eef1fe; border-radius: 6px; list-style: none; }\n</style>\n\n<h2>📝 Mes tâches</h2>\n<p id="compteur">0 tâche(s) restante(s)</p>\n<input id="champ" type="text" placeholder="Nouvelle tâche...">\n<button id="ajouter">Ajouter</button>\n<ul id="liste"></ul>\n\n<script>\n  let champ = document.querySelector("#champ");\n  let liste = document.querySelector("#liste");\n\n  document.querySelector("#ajouter").addEventListener("click", function () {\n    let texte = champ.value;\n    if (texte === "") {\n      return;\n    }\n\n    let li = document.createElement("li");\n    li.textContent = texte;\n    li.addEventListener("click", function () {\n      li.remove();\n    });\n\n    liste.appendChild(li);\n    champ.value = "";\n  });\n</script>',
      indices: [
        "Le compteur doit rester juste après un ajout <strong>comme</strong> après une suppression. Recopier le calcul à deux endroits serait la garantie de l’oublier un jour.",
        "Écris une fonction qui recompte tout, et appelle-la après chaque changement. Compter les tâches, c’est compter les <code>&lt;li&gt;</code> présents dans la liste.",
        "<code>liste.querySelectorAll(\"li\").length</code> dans une fonction <code>majCompteur()</code>, appelée à l’ajout et à la suppression."
      ],
      solution: '<style>\n  body { font-family: sans-serif; padding: 16px; }\n  input { padding: 8px; width: 200px; }\n  button { padding: 8px 16px; }\n  li { cursor: pointer; padding: 6px; margin: 4px 0; background: #eef1fe; border-radius: 6px; list-style: none; }\n</style>\n\n<h2>📝 Mes tâches</h2>\n<p id="compteur">0 tâche(s) restante(s)</p>\n<input id="champ" type="text" placeholder="Nouvelle tâche...">\n<button id="ajouter">Ajouter</button>\n<ul id="liste"></ul>\n\n<script>\n  let champ = document.querySelector("#champ");\n  let liste = document.querySelector("#liste");\n\n  function majCompteur() {\n    let n = liste.querySelectorAll("li").length;\n    document.querySelector("#compteur").textContent = n + " tâche(s) restante(s)";\n  }\n\n  document.querySelector("#ajouter").addEventListener("click", function () {\n    let texte = champ.value;\n    if (texte === "") {\n      return;\n    }\n\n    let li = document.createElement("li");\n    li.textContent = texte;\n    li.addEventListener("click", function () {\n      li.remove();\n      majCompteur();\n    });\n\n    liste.appendChild(li);\n    champ.value = "";\n    majCompteur();\n  });\n</script>',
      verifier: function (ctx) {
        const champ = ctx.doc.querySelector('#champ');
        const btn = ctx.doc.querySelector('#ajouter');
        const liste = ctx.doc.querySelector('#liste');
        const compteur = ctx.doc.querySelector('#compteur');
        if (!champ || !btn || !liste || !compteur) return { ok: false, message: 'Garde tous les éléments du code de départ, dont le <code>#compteur</code>.' };
        champ.value = 'Tâche A';
        btn.click();
        champ.value = 'Tâche B';
        btn.click();
        if (!/2/.test(compteur.textContent)) return { ok: false, message: 'Après deux ajouts, le compteur devrait afficher 2 (affiché : « ' + compteur.textContent + ' »). Appelle ta mise à jour après chaque appendChild.' };
        liste.querySelectorAll('li')[0].click();
        if (!/1/.test(compteur.textContent)) return { ok: false, message: 'L\'ajout compte bien, mais après une suppression le compteur doit redescendre (ici : 1). Appelle aussi la mise à jour dans l\'écouteur de suppression, APRÈS le remove().' };
        return { ok: true, message: 'Tu as remarqué ? Tu as écrit une FONCTION pour ne pas dupliquer le code de mise à jour. C\'est exactement le réflexe d\'un développeur expérimenté.' };
      }
    }
  ]
},

{
  id: 'proj-2',
  titre: 'Projet : le quiz',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Deuxième projet : un quiz avec score. Le défi est neuf — il ne s'agit plus seulement de réagir à un clic, mais de gérer un <strong>état qui avance</strong> : quelle question en est-on, combien de points.</p>
<p>C'est le premier programme où la question « où vit l'information ? » se pose vraiment. Et la réponse décide de tout le reste.</p>

<h2>Le cahier des charges</h2>
<ul>
<li>les questions sont dans un tableau d'objets, fourni — ne le modifie pas, la correction s'appuie dessus ;</li>
<li>la question courante s'affiche dans <code>#question</code>, ses trois réponses sur <code>#r0</code>, <code>#r1</code> et <code>#r2</code> ;</li>
<li>au clic : si c'est la bonne, un point de plus ; dans tous les cas, on passe à la suivante ;</li>
<li>après la dernière, <code>#question</code> affiche le score final.</li>
</ul>

<h2>Deux variables, et c'est tout</h2>
<p>Toute la mécanique tient dans <code>indexQuestion</code> — où en est-on — et <code>score</code>. Ces deux variables sont l'<strong>état</strong> du quiz : elles se créent <em>une seule fois</em>, en dehors des écouteurs, et évoluent à chaque réponse.</p>
<p>Le tableau de questions, lui, ne change jamais : c'est la donnée. Distinguer ce qui bouge de ce qui ne bouge pas est l'une des habitudes les plus utiles qu'on puisse prendre tôt — et le reste du projet en découle.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Moment</th><th>indexQuestion</th><th>score</th><th>Ce qui s'affiche</th></tr>
<tr><td>au départ</td><td>0</td><td>0</td><td>la question 0</td></tr>
<tr><td>bonne réponse</td><td>devient 1</td><td>devient 1</td><td>la question 1</td></tr>
<tr><td>mauvaise réponse</td><td>devient 2</td><td>reste 1</td><td>la question 2</td></tr>
<tr><td>après la dernière</td><td>vaut 3</td><td>—</td><td>le score final</td></tr>
</table>
<p>La dernière ligne est celle qu'on oublie. Quand l'index atteint la taille du tableau, il n'y a plus de question à aller chercher : il faut le tester <em>avant</em> d'afficher, sinon on demande son titre à une question qui n'existe pas et le programme s'arrête là.</p>

<h2>Deux fonctions, deux rôles</h2>
<p><code>afficherQuestion()</code> met la page à jour depuis l'état. <code>repondre(i)</code> modifie l'état — comparer, compter, avancer — puis rappelle la première.</p>
<p>Ce découpage n'est pas cosmétique : il garantit qu'il n'existe <strong>qu'un seul endroit</strong> qui touche à l'affichage. Le jour où tu veux ajouter « question 2 sur 3 » à l'écran, tu sais exactement où l'écrire, et une seule fois.</p>

<h2>Les pièges</h2>
<p><strong>Déclarer <code>indexQuestion</code> ou <code>score</code> dans l'écouteur.</strong> Ils repartent de zéro à chaque clic : le quiz reste bloqué sur la première question et le score ne dépasse jamais 1. C'est le piège du compteur, revu une dernière fois.</p>
<p><strong>Avancer avant de comparer.</strong> L'ordre compte : on compare la réponse à celle de la question <em>courante</em>, puis on avance. Dans l'autre sens, chaque réponse est jugée sur la question suivante.</p>
<p><strong>Brancher les trois boutons avec <code>var</code>.</strong> Le piège le plus fourbe du projet. Dans <code>for (var i = 0; i &lt; 3; i++)</code>, les trois écouteurs partagent la même variable <code>i</code> — et quand le premier clic arrive, la boucle est finie depuis longtemps : <code>i</code> vaut 3. Les trois boutons répondent donc <code>3</code>, une réponse qui n'existe pas, et le score reste désespérément à zéro. Avec <code>let</code>, chaque tour a son propre <code>i</code>, et chaque bouton garde le sien.</p>
<p><strong>Mettre à jour la page à deux endroits.</strong> Dès qu'il y a deux fonctions qui écrivent dans <code>#question</code>, les deux finissent par se contredire.</p>

<h2>Dans la vraie vie</h2>
<p>« L'état d'un côté, l'affichage qui le reflète » est l'idée centrale de toutes les bibliothèques d'interface actuelles. Elles automatisent le rappel d'<code>afficherQuestion()</code> — c'est à peu près tout ce qu'elles font de plus que ce que tu viens d'écrire à la main.</p>

<div class="a-retenir">
<ul>
<li>L'<strong>état</strong> se crée une fois, en dehors des écouteurs.</li>
<li>Une fonction modifie l'état, une autre met l'affichage à jour — et elle seule.</li>
<li>On compare la réponse <em>avant</em> d'avancer l'index.</li>
<li>Dans une boucle qui crée des écouteurs, <code>let</code> et non <code>var</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi un tableau d'objets</summary>
<p>Les questions auraient pu tenir dans trois tableaux parallèles — un pour les énoncés, un pour les réponses, un pour les bonnes. Ça marche, et ça casse au premier décalage : ajouter une question en oubliant l'un des trois donne un quiz incohérent, sans la moindre erreur. Un tableau d'objets garde chaque question d'un seul tenant, et c'est la même raison qui a fait inventer les structures du langage C.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      hauteur: 300,
      genre: 'etape',
      consigne: '<strong>Étape 1 — afficher la question.</strong> Avant de faire marcher le quiz, fais-le simplement <strong>parler</strong> : remplis <code>afficherQuestion()</code> pour que <code>#question</code> montre le texte de la question courante, et les trois boutons ses trois réponses.',
      codeDepart: '<style>\n  body { font-family: sans-serif; padding: 16px; text-align: center; }\n  #question { font-size: 20px; font-weight: bold; min-height: 50px; }\n  button { display: block; width: 240px; margin: 8px auto; padding: 10px; font-size: 15px; }\n</style>\n\n<p id="question"></p>\n<button id="r0"></button>\n<button id="r1"></button>\n<button id="r2"></button>\n\n<script>\n  let questions = [\n    { texte: "Quel langage gère l\'APPARENCE d\'une page ?", reponses: ["HTML", "CSS", "JavaScript"], bonne: 1 },\n    { texte: "Que retourne 10 % 3 ?", reponses: ["1", "3", "3.33"], bonne: 0 }\n  ];\n\n  let indexQuestion = 0;\n\n  function afficherQuestion() {\n    let q = questions[indexQuestion];\n    // 1. le texte de la question dans #question\n\n    // 2. les trois réponses dans #r0, #r1 et #r2\n\n  }\n\n  afficherQuestion();\n</script>',
      indices: [
        'Tout ce dont tu as besoin est déjà dans la variable <code>q</code> : <code>q.texte</code> d\'un côté, <code>q.reponses</code> de l\'autre. Il ne reste qu\'à écrire ces valeurs dans la page.',
        'Écrire du texte dans un élément, c\'est <code>document.querySelector("#question").textContent = …</code>. Les réponses sont un tableau : la première est <code>q.reponses[0]</code>.',
        '<code>document.querySelector("#question").textContent = q.texte;</code> puis la même ligne pour <code>#r0</code> avec <code>q.reponses[0]</code>, et ainsi de suite.'
      ],
      solution: '<style>\n  body { font-family: sans-serif; padding: 16px; text-align: center; }\n  #question { font-size: 20px; font-weight: bold; min-height: 50px; }\n  button { display: block; width: 240px; margin: 8px auto; padding: 10px; font-size: 15px; }\n</style>\n\n<p id="question"></p>\n<button id="r0"></button>\n<button id="r1"></button>\n<button id="r2"></button>\n\n<script>\n  let questions = [\n    { texte: "Quel langage gère l\'APPARENCE d\'une page ?", reponses: ["HTML", "CSS", "JavaScript"], bonne: 1 },\n    { texte: "Que retourne 10 % 3 ?", reponses: ["1", "3", "3.33"], bonne: 0 }\n  ];\n\n  let indexQuestion = 0;\n\n  function afficherQuestion() {\n    let q = questions[indexQuestion];\n    document.querySelector("#question").textContent = q.texte;\n    document.querySelector("#r0").textContent = q.reponses[0];\n    document.querySelector("#r1").textContent = q.reponses[1];\n    document.querySelector("#r2").textContent = q.reponses[2];\n  }\n\n  afficherQuestion();\n</script>',
      verifier: function (ctx) {
        const q = ctx.doc.querySelector('#question');
        const r = [ctx.doc.querySelector('#r0'), ctx.doc.querySelector('#r1'), ctx.doc.querySelector('#r2')];
        if (!q || r.some(b => !b)) return { ok: false, message: 'Garde le paragraphe <code>#question</code> et les trois boutons <code>#r0</code>, <code>#r1</code>, <code>#r2</code>.' };
        if (!q.textContent.trim()) return { ok: false, message: 'Le paragraphe <code>#question</code> est resté vide : écris-y <code>q.texte</code>.' };
        if (!/apparence/i.test(q.textContent)) return { ok: false, message: 'C\'est la question courante qu\'il faut afficher — ici la première, celle sur l\'APPARENCE d\'une page. Tu affiches : « ' + q.textContent.trim() + ' ».' };
        const vus = r.map(b => b.textContent.trim());
        if (vus.some(t => !t)) return { ok: false, message: 'Un bouton au moins est resté vide. Il en faut trois : <code>#r0</code>, <code>#r1</code> et <code>#r2</code>.' };
        const attendus = ['HTML', 'CSS', 'JavaScript'];
        for (let i = 0; i < 3; i++) {
          if (vus[i] !== attendus[i]) return { ok: false, message: 'Le bouton <code>#r' + i + '</code> devrait montrer « ' + attendus[i] + ' », pas « ' + vus[i] + ' ». Les réponses vont dans l\'ordre du tableau <code>q.reponses</code>.' };
        }
        return { ok: true, message: 'La page parle ! Elle ne réagit pas encore, mais elle affiche les bonnes données au bon endroit — et c\'est toujours par là qu\'on commence.' };
      }
    },
    {
      type: 'html',
      hauteur: 300,
      consigne: 'Implémente le quiz complet dans la fonction <code>repondre(i)</code> et la fonction <code>afficherQuestion()</code>. Rappel du flux : comparer → scorer → avancer → réafficher ou terminer avec <code>Fini ! Score : X / 3</code>.',
      codeDepart: '<style>\n  body { font-family: sans-serif; padding: 16px; text-align: center; }\n  #question { font-size: 20px; font-weight: bold; min-height: 50px; }\n  button { display: block; width: 240px; margin: 8px auto; padding: 10px; font-size: 15px; }\n</style>\n\n<p id="question"></p>\n<button id="r0"></button>\n<button id="r1"></button>\n<button id="r2"></button>\n\n<script>\n  let questions = [\n    { texte: "Quel langage gère l\'APPARENCE d\'une page ?", reponses: ["HTML", "CSS", "JavaScript"], bonne: 1 },\n    { texte: "Que retourne 10 % 3 ?", reponses: ["1", "3", "3.33"], bonne: 0 },\n    { texte: "Quelle méthode AJOUTE un élément à un tableau ?", reponses: ["add()", "append()", "push()"], bonne: 2 }\n  ];\n\n  let indexQuestion = 0;\n  let score = 0;\n\n  function afficherQuestion() {\n    // Remplis #question, #r0, #r1, #r2 depuis questions[indexQuestion]\n\n  }\n\n  function repondre(i) {\n    // Compare i à la bonne réponse, score, avance, réaffiche ou termine\n\n  }\n\n  for (let i = 0; i < 3; i++) {\n    document.querySelector("#r" + i).addEventListener("click", function () {\n      repondre(i);\n    });\n  }\n\n  afficherQuestion();\n</script>',
      indices: [
        "Quatre gestes, dans cet ordre : comparer, compter le point, avancer d’une question, puis décider si le quiz continue ou s’arrête.",
        "L’index doit avancer <strong>avant</strong> de réafficher, sinon la même question reviendrait. Et la fin se reconnaît à un index qui a dépassé la taille du tableau.",
        "<code>if (i === questions[indexQuestion].bonne) { score++; }</code> · <code>indexQuestion++;</code> · puis <code>afficherQuestion()</code> ou le message final."
      ],
      solution: '<style>\n  body { font-family: sans-serif; padding: 16px; text-align: center; }\n  #question { font-size: 20px; font-weight: bold; min-height: 50px; }\n  button { display: block; width: 240px; margin: 8px auto; padding: 10px; font-size: 15px; }\n</style>\n\n<p id="question"></p>\n<button id="r0"></button>\n<button id="r1"></button>\n<button id="r2"></button>\n\n<script>\n  let questions = [\n    { texte: "Quel langage gère l\'APPARENCE d\'une page ?", reponses: ["HTML", "CSS", "JavaScript"], bonne: 1 },\n    { texte: "Que retourne 10 % 3 ?", reponses: ["1", "3", "3.33"], bonne: 0 },\n    { texte: "Quelle méthode AJOUTE un élément à un tableau ?", reponses: ["add()", "append()", "push()"], bonne: 2 }\n  ];\n\n  let indexQuestion = 0;\n  let score = 0;\n\n  function afficherQuestion() {\n    let q = questions[indexQuestion];\n    document.querySelector("#question").textContent = q.texte;\n    document.querySelector("#r0").textContent = q.reponses[0];\n    document.querySelector("#r1").textContent = q.reponses[1];\n    document.querySelector("#r2").textContent = q.reponses[2];\n  }\n\n  function repondre(i) {\n    if (i === questions[indexQuestion].bonne) {\n      score++;\n    }\n    indexQuestion++;\n    if (indexQuestion < questions.length) {\n      afficherQuestion();\n    } else {\n      document.querySelector("#question").textContent = `Fini ! Score : ${score} / 3`;\n    }\n  }\n\n  for (let i = 0; i < 3; i++) {\n    document.querySelector("#r" + i).addEventListener("click", function () {\n      repondre(i);\n    });\n  }\n\n  afficherQuestion();\n</script>',
      verifier: function (ctx) {
        const q = ctx.doc.querySelector('#question');
        const r = [ctx.doc.querySelector('#r0'), ctx.doc.querySelector('#r1'), ctx.doc.querySelector('#r2')];
        if (!q || r.some(b => !b)) return { ok: false, message: 'Garde le paragraphe #question et les trois boutons #r0, #r1, #r2.' };
        if (!/apparence/i.test(q.textContent)) return { ok: false, message: 'Au chargement, la première question doit s\'afficher dans <code>#question</code> — complète <code>afficherQuestion()</code>.' };
        if (r[1].textContent.trim() !== 'CSS') return { ok: false, message: 'Les boutons doivent afficher les réponses de la question courante (ici #r1 devrait montrer « CSS »).' };
        r[1].click();
        if (!/10\s*%\s*3/.test(q.textContent)) return { ok: false, message: 'Après une réponse, la question suivante doit s\'afficher (attendu : la question sur 10 % 3). Dans <code>repondre</code> : avancer l\'index PUIS réafficher.' };
        r[0].click();
        if (!/push|AJOUTE/i.test(q.textContent + r[2].textContent)) return { ok: false, message: 'La troisième question devrait maintenant être à l\'écran.' };
        r[2].click();
        if (!/Fini/.test(q.textContent)) return { ok: false, message: 'Après la dernière réponse, affiche <code>Fini ! Score : X / 3</code> dans #question (le cas <code>indexQuestion >= questions.length</code>).' };
        if (!/3\s*\/\s*3/.test(q.textContent)) return { ok: false, message: 'J\'ai donné les 3 bonnes réponses (CSS, 1, push) : le score final devrait être 3 / 3 (affiché : « ' + q.textContent + ' »). Vérifie la comparaison <code>i === questions[indexQuestion].bonne</code> et le score++.' };
        return { ok: true, message: '🏆 Un quiz complet, piloté par des données ! Change les questions du tableau : le moteur s\'adapte tout seul. Séparer données et logique, c\'est l\'architecture de toutes les vraies applications.' };
      }
    }
  ]
},

{
  id: 'proj-3',
  titre: 'Projet : pierre-feuille-ciseaux',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Troisième projet : un jeu contre l'ordinateur. Au programme, trois choses ensemble pour la première fois — le hasard, une logique de victoire à plusieurs cas, et un score qui survit aux manches.</p>
<p>C'est aussi le premier programme où la partie difficile n'est pas le code mais la <strong>logique</strong> : comment décider qui gagne sans écrire neuf conditions ?</p>

<h2>Le cahier des charges</h2>
<ul>
<li>trois boutons : <code>#pierre</code>, <code>#feuille</code>, <code>#ciseaux</code> ;</li>
<li>au clic, l'ordinateur choisit au hasard parmi les trois ;</li>
<li><code>#resultat</code> annonce la manche, et contient le mot gagné, perdu ou égalité ;</li>
<li><code>#score</code> affiche le cumul au format <code>Toi 3 - 1 Ordi</code>.</li>
</ul>

<h2>Le hasard, appliqué à un tableau</h2>
<p>Avec <code>choix</code> qui contient les trois coups, <code>Math.random() * 3</code> donne un nombre entre 0 et 2,999…, et <code>Math.floor</code> en fait 0, 1 ou 2 — exactement les indices du tableau. Pas de <code>+ 1</code> ici, justement parce qu'on vise des indices et non un dé.</p>
<p>Le tirage doit se faire <em>dans</em> la fonction appelée au clic. Fait une fois pour toutes au chargement, l'ordinateur jouerait le même coup toute la partie.</p>

<h2>Pas à pas</h2>
<p>La tentation est d'écrire une condition par combinaison. Il y en a neuf. La bonne façon en demande trois :</p>
<table class="memo-table trace">
<tr><th>Test</th><th>Ce qu'il règle</th></tr>
<tr><td>les deux coups sont identiques</td><td>c'est nul : trois cas sur neuf, en une ligne</td></tr>
<tr><td>une des trois victoires</td><td>pierre bat ciseaux, feuille bat pierre, ciseaux battent feuille</td></tr>
<tr><td>tout le reste</td><td>c'est perdu : les trois derniers cas, sans rien écrire</td></tr>
</table>
<p>Neuf cas réduits à trois tests, parce que chaque test en absorbe trois d'un coup. C'est le genre de simplification qui distingue un programme qu'on peut relire d'un programme qu'on subit — et elle se trouve en cherchant la structure sous l'énumération, pas en codant plus vite.</p>

<h2>Le score entre les manches</h2>
<p>Deux compteurs, <code>victoires</code> et <code>defaites</code>, déclarés <strong>en dehors</strong> de la fonction de jeu. Ce sont eux la mémoire de la partie, et ils doivent survivre d'un clic au suivant. Les égalités, elles, ne comptent dans aucun des deux.</p>

<h2>Les pièges</h2>
<p><strong>Déclarer le score dans la fonction du clic.</strong> Il repart à zéro à chaque manche, et l'affichage reste éternellement à « Toi 1 - 0 Ordi » ou « Toi 0 - 1 Ordi ». Même piège que le compteur, dernier rappel.</p>
<p><strong>Oublier le cas de l'égalité.</strong> Sans lui, deux coups identiques tombent dans le <code>else</code> et comptent comme une défaite. Aucune erreur ne s'affiche, et le jeu est simplement injuste — c'est le genre de défaut qu'on ne trouve qu'en jouant.</p>
<p><strong>Écrire les neuf conditions.</strong> Ça marche. C'est illisible, et une faute de frappe dans la septième passe inaperçue : elle ne se manifestera que sur une combinaison rare.</p>
<p><strong>Couper une comparaison en deux.</strong> <code>joueur === "pierre" &amp;&amp; ordi === "ciseaux" || "feuille"</code> est toujours vrai, parce que le texte « feuille » est vrai tout seul. Chaque branche d'un <code>||</code> doit être une comparaison complète.</p>

<h2>Dans la vraie vie</h2>
<p>Ramener neuf cas à trois est exactement le travail qu'on fait sur une règle métier : une tarification, un calcul de droits, l'attribution d'un badge. On commence toujours par lister les cas, puis on cherche ce qui se regroupe — et c'est ce second temps qui décide si le code sera maintenable.</p>

<div class="a-retenir">
<ul>
<li><code>choix[Math.floor(Math.random() * 3)]</code> tire un élément au hasard — sans <code>+ 1</code>, puisque ce sont des indices.</li>
<li>Le tirage va dans la fonction du clic, pas au chargement.</li>
<li>Traiter l'égalité en premier élimine un tiers des cas.</li>
<li>Le score vit en dehors de la fonction, pour survivre aux manches.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la victoire sans aucune condition</summary>
<p>Dans le tableau <code>["pierre", "feuille", "ciseaux"]</code>, chaque coup bat celui qui le précède, en bouclant. En comparant les indices du joueur et de l'ordinateur, une seule expression suffit donc : <code>(i - j + 3) % 3</code> vaut 0 pour une égalité, 1 pour une victoire, 2 pour une défaite — et c'est juste sur les neuf combinaisons. C'est élégant, et c'est incompréhensible pour qui relit six mois plus tard, toi compris. Les trois tests explicites sont souvent le meilleur choix : l'astuce n'est pas toujours la qualité.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      hauteur: 300,
      genre: 'etape',
      consigne: '<strong>Étape 1 — faire jouer l\'ordinateur.</strong> Avant de désigner un vainqueur, occupe-toi du plus simple : dans <code>jouer(joueur)</code>, fais <strong>tirer l\'ordinateur au hasard</strong> parmi <code>choix</code>, et affiche les deux coups dans <code>#resultat</code>, sous la forme <code>Toi : pierre — Ordi : ciseaux</code>. Aucune comparaison pour l\'instant.',
      codeDepart: '<style>\n  body { font-family: sans-serif; text-align: center; padding: 16px; }\n  button { font-size: 26px; padding: 12px 18px; margin: 4px; }\n  #resultat { font-size: 17px; min-height: 24px; }\n</style>\n\n<h2>Pierre, feuille, ciseaux !</h2>\n<button id="pierre">🪨</button>\n<button id="feuille">📄</button>\n<button id="ciseaux">✂️</button>\n<p id="resultat">Choisis ton arme...</p>\n\n<script>\n  let choix = ["pierre", "feuille", "ciseaux"];\n\n  function jouer(joueur) {\n    // 1. tire un indice au hasard entre 0 et 2\n\n    // 2. affiche les deux coups dans #resultat\n\n  }\n\n  document.querySelector("#pierre").addEventListener("click", function () { jouer("pierre"); });\n  document.querySelector("#feuille").addEventListener("click", function () { jouer("feuille"); });\n  document.querySelector("#ciseaux").addEventListener("click", function () { jouer("ciseaux"); });\n</script>',
      indices: [
        'Deux choses à faire, et le tirage vient en premier. <code>Math.random()</code> donne un nombre entre 0 et 1 — il faut en tirer un indice de tableau, c\'est-à-dire 0, 1 ou 2.',
        'La recette habituelle : <code>Math.floor(Math.random() * choix.length)</code>. Cet indice te donne le coup de l\'ordi avec <code>choix[indice]</code>.',
        '<code>let ordi = choix[Math.floor(Math.random() * choix.length)];</code> puis <code>document.querySelector("#resultat").textContent = "Toi : " + joueur + " — Ordi : " + ordi;</code>'
      ],
      solution: '<style>\n  body { font-family: sans-serif; text-align: center; padding: 16px; }\n  button { font-size: 26px; padding: 12px 18px; margin: 4px; }\n  #resultat { font-size: 17px; min-height: 24px; }\n</style>\n\n<h2>Pierre, feuille, ciseaux !</h2>\n<button id="pierre">🪨</button>\n<button id="feuille">📄</button>\n<button id="ciseaux">✂️</button>\n<p id="resultat">Choisis ton arme...</p>\n\n<script>\n  let choix = ["pierre", "feuille", "ciseaux"];\n\n  function jouer(joueur) {\n    let ordi = choix[Math.floor(Math.random() * choix.length)];\n    document.querySelector("#resultat").textContent = "Toi : " + joueur + " — Ordi : " + ordi;\n  }\n\n  document.querySelector("#pierre").addEventListener("click", function () { jouer("pierre"); });\n  document.querySelector("#feuille").addEventListener("click", function () { jouer("feuille"); });\n  document.querySelector("#ciseaux").addEventListener("click", function () { jouer("ciseaux"); });\n</script>',
      verifier: function (ctx) {
        const res = ctx.doc.querySelector('#resultat');
        const bouton = ctx.doc.querySelector('#pierre');
        if (!res || !bouton) return { ok: false, message: 'Garde le paragraphe <code>#resultat</code> et les trois boutons.' };
        if (!/random/.test(ctx.code)) return { ok: false, message: 'Le coup de l\'ordinateur doit être TIRÉ AU HASARD, avec <code>Math.random()</code> — pas écrit à la main.' };
        const depart = res.textContent;
        bouton.click();
        const apres = res.textContent;
        if (apres === depart) return { ok: false, message: 'Rien ne change quand on clique sur 🪨 : <code>#resultat</code> affiche toujours « ' + depart + ' ». C\'est <code>jouer()</code> qui doit écrire dedans.' };
        if (!/pierre/i.test(apres)) return { ok: false, message: 'Après un clic sur 🪨, le texte doit rappeler TON coup — « pierre ». Affiché : « ' + apres + ' ».' };
        // Les deux coups doivent y être : sur dix clics, l'ordi sort forcément
        // autre chose que « pierre » au moins une fois, sauf s'il ne joue pas.
        let vus = {};
        for (let n = 0; n < 40; n++) { bouton.click(); vus[res.textContent] = true; }
        if (Object.keys(vus).length < 2) return { ok: false, message: 'Le texte est toujours le même après 40 clics : le coup de l\'ordinateur n\'est pas vraiment tiré au hasard à CHAQUE partie. Le tirage va DANS <code>jouer()</code>.' };
        const unTexte = Object.keys(vus)[0];
        if (!/ordi/i.test(unTexte)) return { ok: false, message: 'Le texte doit nommer les deux joueurs, par exemple <code>Toi : pierre — Ordi : ciseaux</code>. Affiché : « ' + unTexte + ' ».' };
        return { ok: true, message: 'L\'ordinateur joue, et il joue différemment à chaque fois. Le hasard est en place : il ne reste plus qu\'à décider qui gagne.' };
      }
    },
    {
      type: 'html',
      hauteur: 300,
      consigne: 'Implémente le jeu complet dans la fonction <code>jouer(joueur)</code> : tirage de l\'ordinateur, comparaison, affichage du résultat (avec « gagné », « perdu » ou « égalité » dedans) et mise à jour du score au format <code>Toi X - Y Ordi</code>. Puis affronte la machine dans l\'aperçu !',
      codeDepart: '<style>\n  body { font-family: sans-serif; text-align: center; padding: 16px; }\n  button { font-size: 26px; padding: 12px 18px; margin: 4px; }\n  #resultat { font-size: 17px; min-height: 24px; }\n  #score { font-size: 22px; font-weight: bold; }\n</style>\n\n<h2>Pierre, feuille, ciseaux !</h2>\n<button id="pierre">🪨</button>\n<button id="feuille">📄</button>\n<button id="ciseaux">✂️</button>\n<p id="resultat">Choisis ton arme...</p>\n<p id="score">Toi 0 - 0 Ordi</p>\n\n<script>\n  let victoires = 0;\n  let defaites = 0;\n  let choix = ["pierre", "feuille", "ciseaux"];\n\n  function jouer(joueur) {\n    // 1. tirage de l\'ordi — 2. comparaison — 3. affichages\n\n  }\n\n  document.querySelector("#pierre").addEventListener("click", function () { jouer("pierre"); });\n  document.querySelector("#feuille").addEventListener("click", function () { jouer("feuille"); });\n  document.querySelector("#ciseaux").addEventListener("click", function () { jouer("ciseaux"); });\n</script>',
      indices: [
        "Trois temps : l’ordinateur joue, on compare, on affiche. La comparaison est le seul morceau délicat.",
        "L’égalité se teste en premier, car elle est la plus simple. Restent trois cas de victoire à énumérer — pierre bat ciseaux, ciseaux battent feuille, feuille bat pierre.",
        "<code>choix[Math.floor(Math.random() * 3)]</code> pour le tirage, puis le <code>if / else if / else</code>, en incrémentant le bon compteur."
      ],
      solution: '<style>\n  body { font-family: sans-serif; text-align: center; padding: 16px; }\n  button { font-size: 26px; padding: 12px 18px; margin: 4px; }\n  #resultat { font-size: 17px; min-height: 24px; }\n  #score { font-size: 22px; font-weight: bold; }\n</style>\n\n<h2>Pierre, feuille, ciseaux !</h2>\n<button id="pierre">🪨</button>\n<button id="feuille">📄</button>\n<button id="ciseaux">✂️</button>\n<p id="resultat">Choisis ton arme...</p>\n<p id="score">Toi 0 - 0 Ordi</p>\n\n<script>\n  let victoires = 0;\n  let defaites = 0;\n  let choix = ["pierre", "feuille", "ciseaux"];\n\n  function jouer(joueur) {\n    let ordi = choix[Math.floor(Math.random() * 3)];\n    let verdict;\n\n    if (joueur === ordi) {\n      verdict = "égalité !";\n    } else if (\n      (joueur === "pierre" && ordi === "ciseaux") ||\n      (joueur === "feuille" && ordi === "pierre") ||\n      (joueur === "ciseaux" && ordi === "feuille")\n    ) {\n      verdict = "gagné !";\n      victoires++;\n    } else {\n      verdict = "perdu...";\n      defaites++;\n    }\n\n    document.querySelector("#resultat").textContent = `${joueur} contre ${ordi} : ${verdict}`;\n    document.querySelector("#score").textContent = `Toi ${victoires} - ${defaites} Ordi`;\n  }\n\n  document.querySelector("#pierre").addEventListener("click", function () { jouer("pierre"); });\n  document.querySelector("#feuille").addEventListener("click", function () { jouer("feuille"); });\n  document.querySelector("#ciseaux").addEventListener("click", function () { jouer("ciseaux"); });\n</script>',
      verifier: function (ctx) {
        const pierre = ctx.doc.querySelector('#pierre');
        const resultat = ctx.doc.querySelector('#resultat');
        const score = ctx.doc.querySelector('#score');
        if (!pierre || !resultat || !score) return { ok: false, message: 'Garde les boutons et les deux zones d\'affichage.' };
        if (!/Math\.random/.test(ctx.code)) return { ok: false, message: 'L\'ordinateur doit choisir au hasard avec <code>Math.random()</code>.' };
        let vuGagne = false, vuPerdu = false, vuEgalite = false;
        for (let i = 0; i < 30; i++) {
          pierre.click();
          const t = resultat.textContent.toLowerCase();
          if (/gagn/.test(t)) vuGagne = true;
          else if (/perdu/.test(t)) vuPerdu = true;
          else if (/égalité|egalite/.test(t)) vuEgalite = true;
        }
        if (!vuGagne && !vuPerdu && !vuEgalite) return { ok: false, message: 'Après 30 manches simulées, <code>#resultat</code> n\'affiche jamais gagné/perdu/égalité. Le verdict doit contenir un de ces trois mots.' };
        if (!(vuGagne && vuPerdu && vuEgalite)) return { ok: false, message: 'Sur 30 manches en jouant pierre, les trois issues devraient toutes apparaître au moins une fois (vu : ' + [vuGagne && 'gagné', vuPerdu && 'perdu', vuEgalite && 'égalité'].filter(Boolean).join(', ') + '). Vérifie ta logique de comparaison.' };
        const m = score.textContent.match(/Toi\s+(\d+)\s*-\s*(\d+)\s+Ordi/i);
        if (!m) return { ok: false, message: 'Le score doit suivre le format <code>Toi X - Y Ordi</code> (affiché : « ' + score.textContent + ' »).' };
        if (parseInt(m[1]) + parseInt(m[2]) > 30 || parseInt(m[1]) === 0 || parseInt(m[2]) === 0) return { ok: false, message: 'Le score semble incohérent après 30 manches (' + score.textContent + ') : victoires et défaites doivent s\'accumuler correctement (pas les égalités).' };
        return { ok: true, message: '🏆 Un jeu complet contre l\'ordinateur ! Hasard, logique de victoire, état persistant : tu viens d\'assembler le cœur de tout jeu vidéo — en 30 lignes.' };
      }
    }
  ]
},

{
  id: 'proj-4',
  titre: 'Projet final : le carnet qui n\'oublie rien',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Le projet de synthèse : une liste de notes <strong>persistante</strong>. Ferme la page, rouvre-la : tes notes sont toujours là.</p>
<p>C'est la combinaison de tout — DOM dynamique, événements, tableaux, JSON, <code>localStorage</code>. Et surtout, c'est le projet où une décision d'architecture devient obligatoire, là où les trois premiers pouvaient s'en passer.</p>

<h2>La décision : où vit la vérité</h2>
<p>Dans la liste de tâches, l'état vivait dans le HTML : les tâches n'existaient que dans les <code>&lt;li&gt;</code>. Ça tenait, parce que rien n'avait besoin de les relire.</p>
<p>Ici, il faut les sauvegarder. Relire le HTML pour reconstituer la liste serait pénible et fragile. D'où la règle qui structure tout le projet :</p>
<div class="info">Le tableau <code>notes</code> est la <strong>source de vérité</strong>. C'est lui qu'on modifie, jamais le HTML directement. L'affichage n'en est qu'un reflet, refabriqué à partir du tableau.</div>

<h2>Trois rôles bien séparés</h2>
<p><code>afficher()</code> vide la liste puis la reconstruit depuis le tableau. <code>sauver()</code> écrit le tableau dans le <code>localStorage</code>, sous la clé <code>"carnet"</code>, converti en texte par <code>JSON.stringify</code>. Les écouteurs, eux, ne font que modifier le tableau avant d'appeler les deux autres.</p>
<p>Au démarrage, la lecture tient en une ligne : <code>JSON.parse</code> de ce que rend le <code>localStorage</code>, suivi d'un <code>|| []</code> qui prend le relais à la première visite — car il n'y a alors rien à lire.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Action</th><th>Ce qui se passe, dans l'ordre</th></tr>
<tr><td>ouverture de la page</td><td>on relit le stockage, puis <code>afficher()</code></td></tr>
<tr><td>ajout d'une note</td><td>on pousse dans le tableau, puis <code>sauver()</code>, puis <code>afficher()</code></td></tr>
<tr><td>clic sur une note</td><td>on la retire du tableau, puis <code>sauver()</code>, puis <code>afficher()</code></td></tr>
<tr><td>fermeture</td><td>rien à faire : tout est déjà écrit</td></tr>
</table>
<p>Le même trio revient à chaque action : <strong>modifier, sauver, afficher</strong>. Dès qu'une action s'en écarte, quelque chose se désynchronise — et c'est toujours la sauvegarde qui perd.</p>

<h2>Les pièges</h2>
<p><strong>Modifier le HTML sans modifier le tableau.</strong> L'écran est juste, la sauvegarde est fausse, et l'on ne s'en aperçoit qu'au rechargement suivant. C'est exactement le défaut que la règle de la source de vérité empêche.</p>
<p><strong>Oublier <code>sauver()</code> après une suppression.</strong> La note supprimée revient à la prochaine ouverture. L'ajout, lui, est rarement oublié : c'est la suppression qui passe à la trappe, parce qu'on la code en dernier et qu'on la teste moins.</p>
<p><strong>Boucler avec <code>var</code> dans <code>afficher()</code>.</strong> Les lignes partagent alors le même <code>i</code>, qui vaut la taille du tableau une fois la boucle finie : <code>splice</code> est appelé sur un indice qui n'existe pas et <strong>ne retire rien du tout</strong>. Aucune erreur, aucun message — on clique, et rien ne se passe. Avec <code>let</code>, chaque ligne garde l'indice de son tour.</p>
<p><strong>Ne pas prévoir la première visite.</strong> Le <code>localStorage</code> rend <code>null</code> pour une clé absente, et <code>JSON.parse(null)</code> rend <code>null</code> à son tour. Sans le <code>|| []</code>, le premier ajout essaie de pousser dans rien, et le programme s'arrête sur <code>Cannot read properties of null</code> — chez ton utilisateur, à sa toute première ouverture.</p>

<h2>Dans la vraie vie</h2>
<p>« Une source de vérité, un affichage qui la reflète » est le principe sur lequel reposent toutes les interfaces modernes. Les bibliothèques automatisent l'appel à <code>afficher()</code> — elles le déclenchent elles-mêmes quand les données changent, et ne redessinent que ce qui a bougé. Le principe, lui, est exactement celui que tu viens d'appliquer à la main.</p>

<div class="a-retenir">
<ul>
<li>Le tableau est la <strong>source de vérité</strong> ; le HTML n'en est qu'un reflet.</li>
<li>À chaque action : <strong>modifier, sauver, afficher</strong>.</li>
<li><code>JSON.stringify</code> à l'écriture, <code>JSON.parse</code> à la lecture, <code>|| []</code> pour la première visite.</li>
<li>Dans la boucle d'affichage, <code>let</code> : avec <code>var</code>, la suppression ne retire rien.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : ce que tu viens de construire</summary>
<p>Une application qui garde son état entre deux visites, avec une architecture explicite : des données, un affichage dérivé, des actions qui modifient les données. C'est la structure d'un vrai logiciel. Il n'y manque qu'un serveur pour que tes notes te suivent d'un appareil à l'autre — le <code>localStorage</code>, lui, ne quitte jamais le navigateur où il a été écrit. Tout ce que tu croiseras ensuite, quelle que soit la bibliothèque, sera une variation sur ces trois mots : données, affichage, actions.</p>
</details>
`,
  exercices: [
    {
      type: 'html',
      hauteur: 320,
      genre: 'etape',
      consigne: '<strong>Étape 1 — afficher la liste.</strong> Oublie la sauvegarde pour l\'instant : le tableau <code>notes</code> est déjà rempli. Écris <code>afficher()</code> pour qu\'il apparaisse à l\'écran — <strong>un <code>&lt;li&gt;</code> par note</strong>, dans <code>#liste</code>. Pense à vider la liste avant de la remplir, sinon les notes se dupliqueront à chaque appel.',
      codeDepart: '<style>\n  body { font-family: sans-serif; padding: 16px; }\n  li { padding: 6px; margin: 4px 0; background: #eef1fe; border-radius: 6px; list-style: none; }\n</style>\n\n<h2>🗒️ Mon carnet</h2>\n<ul id="liste"></ul>\n\n<script>\n  let liste = document.querySelector("#liste");\n  let notes = ["Acheter du pain", "Réviser les boucles", "Appeler Maya"];\n\n  function afficher() {\n    // 1. vider la liste\n\n    // 2. une boucle sur notes : un <li> par note\n\n  }\n\n  afficher();\n</script>',
      indices: [
        'Deux temps, et le premier est celui qu\'on oublie : <strong>vider</strong> avant de remplir. Sans ça, un second appel à <code>afficher()</code> écrirait tout une deuxième fois à la suite.',
        'Vider, c\'est <code>liste.innerHTML = "";</code>. Ensuite une boucle sur <code>notes</code>, et pour chacune un <code>document.createElement("li")</code> qu\'on ajoute avec <code>liste.appendChild(…)</code>.',
        '<code>liste.innerHTML = "";<br>for (let n of notes) {<br>&nbsp;&nbsp;let li = document.createElement("li");<br>&nbsp;&nbsp;li.textContent = n;<br>&nbsp;&nbsp;liste.appendChild(li);<br>}</code>'
      ],
      solution: '<style>\n  body { font-family: sans-serif; padding: 16px; }\n  li { padding: 6px; margin: 4px 0; background: #eef1fe; border-radius: 6px; list-style: none; }\n</style>\n\n<h2>🗒️ Mon carnet</h2>\n<ul id="liste"></ul>\n\n<script>\n  let liste = document.querySelector("#liste");\n  let notes = ["Acheter du pain", "Réviser les boucles", "Appeler Maya"];\n\n  function afficher() {\n    liste.innerHTML = "";\n    for (let n of notes) {\n      let li = document.createElement("li");\n      li.textContent = n;\n      liste.appendChild(li);\n    }\n  }\n\n  afficher();\n</script>',
      verifier: function (ctx) {
        const liste = ctx.doc.querySelector('#liste');
        if (!liste) return { ok: false, message: 'Garde la liste <code>&lt;ul id="liste"&gt;</code> : c\'est elle qu\'on remplit.' };
        const li = liste.querySelectorAll('li');
        if (!li.length) return { ok: false, message: 'Aucun <code>&lt;li&gt;</code> dans la liste. La boucle doit en créer un par note, et l\'ajouter avec <code>appendChild</code>.' };
        if (li.length !== 3) return { ok: false, message: 'J\'attends 3 éléments, un par note — j\'en compte ' + li.length + '. Si tu en vois 6, c\'est que la liste n\'a pas été vidée avant d\'être remplie.' };
        const textes = [...li].map(e => e.textContent.trim());
        const attendues = ['Acheter du pain', 'Réviser les boucles', 'Appeler Maya'];
        for (let i = 0; i < 3; i++) {
          if (textes[i] !== attendues[i]) return { ok: false, message: 'Le <code>&lt;li&gt;</code> n°' + (i + 1) + ' devrait contenir « ' + attendues[i] + ' », pas « ' + textes[i] + ' ». Les notes s\'affichent dans l\'ordre du tableau.' };
        }
        // Le piège du doublon : appeler afficher() deux fois ne doit rien changer.
        if (ctx.win && typeof ctx.win.afficher === 'function') {
          ctx.win.afficher();
          const apres = liste.querySelectorAll('li').length;
          if (apres !== 3) return { ok: false, message: 'Deux appels à <code>afficher()</code> laissent ' + apres + ' éléments au lieu de 3 : la liste n\'est pas vidée au début. Ajoute <code>liste.innerHTML = "";</code> en première ligne.' };
        }
        return { ok: true, message: 'Trois notes, trois <code>&lt;li&gt;</code> — et le réflexe qui compte : vider avant de remplir. C\'est ce geste qui rendra la suppression possible tout à l\'heure.' };
      }
    },
    {
      type: 'html',
      hauteur: 340,
      consigne: 'Implémente le carnet persistant complet : <code>afficher()</code>, <code>sauver()</code>, l\'ajout, la suppression au clic, et le chargement initial depuis le localStorage. La correction vérifie chaque point du cahier des charges — y compris la persistance réelle !',
      codeDepart: '<style>\n  body { font-family: sans-serif; padding: 16px; }\n  input { padding: 8px; width: 200px; }\n  button { padding: 8px 16px; }\n  li { cursor: pointer; padding: 6px; margin: 4px 0; background: #eef1fe; border-radius: 6px; list-style: none; }\n</style>\n\n<h2>🗒️ Mon carnet permanent</h2>\n<input id="champ" type="text" placeholder="Nouvelle note...">\n<button id="ajouter">Ajouter</button>\n<ul id="liste"></ul>\n\n<script>\n  let champ = document.querySelector("#champ");\n  let liste = document.querySelector("#liste");\n\n  // 6. Chargement initial : relire "carnet" (JSON.parse) ou partir de []\n  let notes = [];\n\n  function sauver() {\n    // JSON.stringify vers la clé "carnet"\n  }\n\n  function afficher() {\n    // vider la liste, puis une boucle : créer les li, clic = splice + sauver + afficher\n  }\n\n  document.querySelector("#ajouter").addEventListener("click", function () {\n    // pousser dans notes (si non vide), vider le champ, sauver, afficher\n  });\n\n  afficher();\n</script>',
      indices: [
        "Trois responsabilités séparées : lire au démarrage, écrire à chaque changement, et redessiner la liste. Chacune a sa fonction.",
        "Le localStorage ne stocke que du texte : <code>JSON.parse</code> à la lecture, <code>JSON.stringify</code> à l’écriture. Et au tout premier lancement il n’y a rien — d’où le <code>|| []</code>.",
        "<code>let notes = JSON.parse(localStorage.getItem(\"carnet\")) || [];</code>, puis <code>afficher()</code> qui vide et reconstruit, et <code>sauver()</code> appelée après chaque modification."
      ],
      solution: '<style>\n  body { font-family: sans-serif; padding: 16px; }\n  input { padding: 8px; width: 200px; }\n  button { padding: 8px 16px; }\n  li { cursor: pointer; padding: 6px; margin: 4px 0; background: #eef1fe; border-radius: 6px; list-style: none; }\n</style>\n\n<h2>🗒️ Mon carnet permanent</h2>\n<input id="champ" type="text" placeholder="Nouvelle note...">\n<button id="ajouter">Ajouter</button>\n<ul id="liste"></ul>\n\n<script>\n  let champ = document.querySelector("#champ");\n  let liste = document.querySelector("#liste");\n\n  let notes = JSON.parse(localStorage.getItem("carnet")) || [];\n\n  function sauver() {\n    localStorage.setItem("carnet", JSON.stringify(notes));\n  }\n\n  function afficher() {\n    liste.innerHTML = "";\n    for (let i = 0; i < notes.length; i++) {\n      let li = document.createElement("li");\n      li.textContent = notes[i];\n      li.addEventListener("click", function () {\n        notes.splice(i, 1);\n        sauver();\n        afficher();\n      });\n      liste.appendChild(li);\n    }\n  }\n\n  document.querySelector("#ajouter").addEventListener("click", function () {\n    let texte = champ.value;\n    if (texte === "") {\n      return;\n    }\n    notes.push(texte);\n    champ.value = "";\n    sauver();\n    afficher();\n  });\n\n  afficher();\n</script>',
      verifier: function (ctx) {
        const champ = ctx.doc.querySelector('#champ');
        const btn = ctx.doc.querySelector('#ajouter');
        const liste = ctx.doc.querySelector('#liste');
        if (!champ || !btn || !liste) return { ok: false, message: 'Garde le champ, le bouton et la liste.' };
        try {
          ctx.win.localStorage.removeItem('carnet');
          champ.value = 'Première note';
          btn.click();
          champ.value = 'Deuxième note';
          btn.click();
          if (liste.querySelectorAll('li').length !== 2) return { ok: false, message: 'Deux ajouts → deux lignes affichées. Le flux : notes.push → sauver() → afficher().' };
          let stocke;
          try { stocke = JSON.parse(ctx.win.localStorage.getItem('carnet')); } catch (e) { stocke = null; }
          if (!Array.isArray(stocke) || stocke.length !== 2) return { ok: false, message: 'L\'affichage marche, mais le localStorage (clé « carnet ») devrait contenir le tableau JSON des 2 notes — vérifie <code>sauver()</code> avec <code>JSON.stringify</code>.' };
          liste.querySelectorAll('li')[0].click();
          if (liste.querySelectorAll('li').length !== 1) return { ok: false, message: 'Le clic sur une note doit la supprimer de l\'écran (splice + sauver + afficher).' };
          try { stocke = JSON.parse(ctx.win.localStorage.getItem('carnet')); } catch (e) { stocke = null; }
          if (!Array.isArray(stocke) || stocke.length !== 1 || !/Deuxième/.test(stocke[0])) return { ok: false, message: 'Après suppression de la première note, le localStorage doit contenir uniquement « Deuxième note » — la suppression doit passer par le TABLEAU (splice) puis re-sauver.' };
          if (!/JSON\.parse/.test(ctx.code) || !/getItem/.test(ctx.code)) return { ok: false, message: 'Dernier point du cahier des charges : au démarrage, relis le carnet depuis le localStorage (<code>JSON.parse(localStorage.getItem("carnet")) || []</code>) — sinon tout disparaît à la réouverture !' };
          return { ok: true, message: '🏆🏆🏆 PROJET FINAL RÉUSSI ! Données comme source de vérité, affichage reconstruit, persistance JSON : tu viens d\'appliquer l\'architecture des applications professionnelles. Tu n\'es plus un débutant.' };
        } finally {
          try { ctx.win.localStorage.removeItem('carnet'); } catch (e) {}
        }
      }
    }
  ]
},

];
