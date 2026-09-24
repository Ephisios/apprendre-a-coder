/* ===== Module Projets guidés ===== */
window.DATA_PROJETS = [

{
  id: 'proj-1',
  titre: 'Projet : la liste de tâches',
  contenu: `
<p>LE projet initiatique de tout développeur web : la <em>to-do list</em>. Petit en apparence, il combine tout ce que tu sais : saisie, événements, création d'éléments, conditions.</p>

<h2>Le cahier des charges</h2>
<ol>
<li>L'utilisateur tape une tâche dans le champ et clique sur « Ajouter » ;</li>
<li>la tâche apparaît dans la liste ;</li>
<li>le champ se vide, prêt pour la suivante ;</li>
<li>si le champ est vide, on n'ajoute rien (pas de tâche fantôme !) ;</li>
<li>cliquer sur une tâche de la liste la supprime (tâche terminée).</li>
</ol>

<h2>Les outils dont tu auras besoin (tous déjà vus !)</h2>
<ul>
<li>lire le champ : <code>champ.value</code> — et le vider : <code>champ.value = "";</code></li>
<li>ignorer le vide : <code>if (texte === "") { return; }</code> — un <code>return</code> seul quitte la fonction immédiatement ;</li>
<li>créer la ligne : <code>createElement</code>, <code>textContent</code>, <code>appendChild</code> ;</li>
<li>supprimer un élément : <code>element.remove()</code> — nouvelle méthode, la seule de ce projet !</li>
</ul>

<div class="astuce">✅ L'astuce élégante pour la suppression : au moment où tu CRÉES un <code>li</code>, attache-lui tout de suite son écouteur de clic : <code>li.addEventListener("click", function () { li.remove(); });</code> — chaque tâche sait s'auto-détruire.</div>

<p>Construis étape par étape : d'abord l'ajout qui marche, exécute et teste, PUIS le champ qui se vide, PUIS le blocage du vide, PUIS la suppression. Jamais tout d'un coup !</p>
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
<p>Deuxième projet : un quiz de culture générale avec score. Nouveau défi : gérer un <strong>état qui avance</strong> (la question courante) et des <strong>données structurées</strong> (le tableau de questions).</p>

<h2>Le cahier des charges</h2>
<ol>
<li>les questions sont dans un tableau d'objets (fourni — ne le modifie pas, la correction s'appuie dessus !) ;</li>
<li>la question courante s'affiche dans <code>#question</code>, ses 3 réponses sur les boutons <code>#r0</code>, <code>#r1</code>, <code>#r2</code> ;</li>
<li>au clic sur une réponse : si c'est la bonne, +1 au score ; dans tous les cas, on passe à la question suivante ;</li>
<li>après la dernière question : affiche <code>Fini ! Score : X / 3</code> dans <code>#question</code>.</li>
</ol>

<h2>La mécanique de l'état</h2>
<p>Deux variables pilotent tout : <code>indexQuestion</code> (où en est-on ?) et <code>score</code>. Et une fonction <code>afficherQuestion()</code> qui remplit l'écran selon l'état courant — appelée au démarrage, puis après chaque réponse :</p>
<pre class="bloc-code">function afficherQuestion() {
  let q = questions[indexQuestion];
  document.querySelector("#question").textContent = q.texte;
  document.querySelector("#r0").textContent = q.reponses[0];
  // ... r1, r2
}</pre>

<h2>Astuce pour les 3 boutons sans copier-coller</h2>
<pre class="bloc-code">for (let i = 0; i < 3; i++) {
  document.querySelector("#r" + i).addEventListener("click", function () {
    repondre(i);   // chaque bouton connaît son numéro !
  });
}</pre>
<p>La fonction <code>repondre(i)</code> compare <code>i</code> à <code>questions[indexQuestion].bonne</code>, met à jour le score, avance l'index, et soit réaffiche, soit termine.</p>
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
<p>Troisième projet : un jeu contre l'ordinateur. Au programme : le hasard, une logique de victoire à trois cas, et un score qui persiste entre les manches.</p>

<h2>Le cahier des charges</h2>
<ol>
<li>trois boutons : <code>#pierre</code>, <code>#feuille</code>, <code>#ciseaux</code> ;</li>
<li>au clic, l'ordinateur choisit au hasard parmi les trois ;</li>
<li>le résultat s'affiche dans <code>#resultat</code>, par exemple : <code>pierre contre ciseaux : gagné !</code> (le mot <strong>gagné</strong>, <strong>perdu</strong> ou <strong>égalité</strong> doit apparaître) ;</li>
<li>le score cumulé s'affiche dans <code>#score</code> au format <code>Toi 3 - 1 Ordi</code>.</li>
</ol>

<h2>Les règles en code</h2>
<p>Trois cas seulement, une fois l'égalité écartée :</p>
<pre class="bloc-code">if (joueur === ordi) {
  // égalité
} else if (
  (joueur === "pierre" && ordi === "ciseaux") ||
  (joueur === "feuille" && ordi === "pierre") ||
  (joueur === "ciseaux" && ordi === "feuille")
) {
  // gagné !
} else {
  // tous les autres cas : perdu
}</pre>
<p>Remarque la puissance du <code>||</code> : les trois situations gagnantes tiennent dans UNE condition. Et le <code>else</code> final attrape tout le reste sans rien lister.</p>

<h2>Le choix aléatoire de l'ordinateur</h2>
<pre class="bloc-code">let choix = ["pierre", "feuille", "ciseaux"];
let ordi = choix[Math.floor(Math.random() * 3)];</pre>
<p>Un index au hasard entre 0 et 2, et le tableau fait le reste — le motif « tirage dans une liste » ressert dans tous les jeux.</p>
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
<p>Le projet de synthèse : une liste de notes <strong>persistante</strong>. Ferme la page, rouvre-la : tes notes sont toujours là. C'est la combinaison de TOUT : DOM dynamique, événements, tableaux, JSON, localStorage.</p>

<h2>Le cahier des charges</h2>
<ol>
<li>un tableau <code>notes</code> est la <strong>source de vérité</strong> : c'est LUI qu'on modifie, jamais le HTML directement ;</li>
<li>une fonction <code>afficher()</code> reconstruit toute la liste depuis le tableau (vider avec <code>innerHTML = ""</code>, puis une boucle de <code>createElement</code>) ;</li>
<li>une fonction <code>sauver()</code> écrit le tableau dans le localStorage (clé <code>"carnet"</code>, via <code>JSON.stringify</code>) ;</li>
<li>ajouter une note = pousser dans le tableau → sauver → afficher ;</li>
<li>cliquer sur une note = la retirer du tableau (<code>notes.splice(i, 1)</code> retire l'élément d'index i) → sauver → afficher ;</li>
<li>au démarrage : relire le localStorage (<code>JSON.parse</code>, ou tableau vide si rien) et afficher.</li>
</ol>

<h2>Pourquoi cette architecture ?</h2>
<div class="info">💬 « Les données d'abord, l'affichage suit » : c'est LE principe des frameworks modernes (React, Vue...). Ton tableau <code>notes</code> est l'état ; l'écran n'en est que le reflet, reconstruit par <code>afficher()</code>. En comprenant ça ici, tu comprends d'avance la philosophie des outils professionnels.</div>

<h2>Le seul outil nouveau</h2>
<pre class="bloc-code">notes.splice(2, 1);   // retire 1 élément à partir de l'index 2</pre>
<p>Et pour connaître l'index dans la boucle d'affichage, utilise un <code>for</code> classique avec <code>i</code> — chaque <code>li</code> retient ainsi quel index il doit supprimer.</p>
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
