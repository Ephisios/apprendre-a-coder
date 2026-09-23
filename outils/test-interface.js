/* Vérifie ce que l'élève VOIT.
   ------------------------------------------------------------------------
   verifier-contenu.js juge les CORRECTEURS — acceptent-ils la bonne réponse,
   refusent-ils les mauvaises. Ce script-ci juge l'autre moitié : quel bouton
   d'aide apparaît et après combien d'essais ratés, et ce que l'éditeur
   souligne ou choisit de taire. C'est là qu'on abandonne, donc là qu'il faut
   des tests.

   Usage :  node outils/test-interface.js
   Dépend de jsdom (dépendance de développement, npm install).

   Note sur le montage : app.js déclare son état en `let`. Ces déclarations
   ne deviennent pas des propriétés de window, et l'environnement lexical d'un
   eval est jeté dès qu'il se termine — les fonctions y accèdent encore par
   fermeture, mais aucun eval ULTÉRIEUR ne peut l'atteindre. On charge donc
   tous les scripts ET la passerelle de test en UN SEUL eval, pour qu'ils
   partagent la même portée. Écrire win.leconCourante de l'extérieur ne
   produirait qu'un jumeau que le code ignore. */

const fs = require('fs');
const path = require('path');
const RACINE = path.join(__dirname, '..');

let JSDOM, VirtualConsole;
try { ({ JSDOM, VirtualConsole } = require('jsdom')); }
catch (e) {
  console.error('jsdom n\'est pas installé. Lance « npm install » d\'abord.');
  process.exit(2);
}

/* On charge la vraie page, avec ses vrais scripts — mais sans Skulpt, qui
   pèse un mégaoctet et n'a rien à voir avec l'aide. */
const html = fs.readFileSync(path.join(RACINE, 'index.html'), 'utf8')
  .replace(/<script src="skulpt[^"]*"><\/script>/g, '');

const dom = new JSDOM(html, {
  runScripts: 'outside-only',
  url: 'https://apprendre-a-coder.test/',
  virtualConsole: new VirtualConsole()      // jsdom n'implémente pas scrollTo : on se tait
});
const win = dom.window;

// jsdom ne sait ni faire défiler ni mesurer : ces gestes n'ont pas de sens
// hors d'un écran, et l'aide ne dépend pas d'eux.
win.Element.prototype.scrollIntoView = function () {};
win.scrollTo = function () {};

const sources = [];
for (const m of html.matchAll(/<script src="([^"]+)"><\/script>/g)) {
  sources.push(fs.readFileSync(path.join(RACINE, m[1]), 'utf8'));
}

/* La passerelle est ajoutée à la suite des scripts, dans le même eval : c'est
   la seule façon d'atteindre leur état déclaré en `let`. */
sources.push(`
  window.__pont = {
    poserLecon: v => { leconCourante = v; },
    viderIndices: () => { indicesOuverts = {}; },
    ouvrir: (cle, n) => { indicesOuverts[cle] = n; },
    recours: (i, ex, n) => contenuRecours(i, ex, n),
    montrer: i => montrerIndice(i),
    indicesDe: ex => indicesDe(ex),
    genreDe: ex => genreDe(ex),
    exercicesDe: l => exercicesDe(l),
    modules: () => MODULES,
    colorier: (code, langue, muet) => colorierCode(code, langue, null, muet),
    index: () => construireIndex(),
    chercher: q => chercherDansMemos(q),
    poserProgression: p => { progression = p; },
    aReviser: n => aReviser(n),
    rendreRevision: () => rendreRevision()
  };
`);
win.eval(sources.join('\n;\n'));
const pont = win.__pont;

let echecs = 0, ok = 0;
function verifie(intitule, obtenu, attendu) {
  if (obtenu === attendu) { ok++; return; }
  echecs++;
  console.log('  ÉCHEC  ' + intitule);
  console.log('         attendu : ' + JSON.stringify(attendu));
  console.log('         obtenu  : ' + JSON.stringify(obtenu));
}

// Ce que le panneau de recours propose, résumé en un mot par bouton.
function recours(ex, nbEchecs) {
  const h = pont.recours(0, ex, nbEchecs);
  const boutons = [];
  if (/Un autre indice/.test(h)) boutons.push('indice+');
  else if (/💡 Indice/.test(h)) boutons.push('indice');
  if (/montrerSolution/.test(h)) boutons.push('solution');
  return boutons.join(',') || '(rien)';
}

console.log('\n=== L\'aide monte-t-elle d\'un cran à chaque essai raté ? ===\n');

/* --- 1. Un seul indice : le comportement historique ne doit pas bouger --- */
pont.poserLecon({ id: 'test-1' }); pont.viderIndices();
const unSeul = { type: 'js', indice: 'Regarde la ligne 2.' };

verifie('1 indice — carte neuve, rien n\'est proposé', recours(unSeul, 0), '(rien)');
verifie('1 indice — après 1 échec, l\'indice', recours(unSeul, 1), 'indice');
verifie('1 indice — après 2 échecs, indice + solution', recours(unSeul, 2), 'indice,solution');

pont.ouvrir('test-1#0', 1);                      // l'eleve a ouvert l'indice
verifie('1 indice ouvert — plus d\'indice à offrir', recours(unSeul, 1), '(rien)');
verifie('1 indice ouvert — la solution après 2 échecs', recours(unSeul, 2), 'solution');

/* --- 2. Trois paliers : un de plus par échec, solution seulement après --- */
const trois = { type: 'js', indices: ['Où regarder.', 'Comment s\'y prendre.', 'Presque la réponse.'] };
pont.poserLecon({ id: 'test-3' }); pont.viderIndices();

verifie('3 paliers — carte neuve, rien', recours(trois, 0), '(rien)');
verifie('3 paliers — 1 échec, le premier palier', recours(trois, 1), 'indice');

pont.ouvrir('test-3#0', 1);
verifie('3 paliers — 1 ouvert, 1 échec : il faut réessayer', recours(trois, 1), '(rien)');
verifie('3 paliers — 1 ouvert, 2 échecs : le palier suivant', recours(trois, 2), 'indice+');
verifie('3 paliers — 1 ouvert, 2 échecs : pas encore la solution',
        /solution/.test(recours(trois, 2)), false);

pont.ouvrir('test-3#0', 3);
verifie('3 paliers — tous ouverts, 3 échecs : pas encore la solution', recours(trois, 3), '(rien)');
verifie('3 paliers — tous ouverts, 4 échecs : la solution', recours(trois, 4), 'solution');

/* --- 3. Un QCM ne dévoile jamais sa solution --------------------------- */
pont.poserLecon({ id: 'test-qcm' }); pont.viderIndices();
verifie('QCM — 9 échecs ne donnent toujours pas de solution',
        /solution/.test(recours({ type: 'qcm', indice: 'Relis le paragraphe 2.' }, 9)), false);

/* --- 4. indicesDe() accepte les deux écritures ------------------------- */
verifie('indicesDe — une chaîne devient un tableau de 1', pont.indicesDe({ indice: 'a' }).length, 1);
verifie('indicesDe — un tableau est gardé tel quel', pont.indicesDe({ indices: ['a', 'b'] }).length, 2);
verifie('indicesDe — les entrées vides sont écartées', pont.indicesDe({ indices: ['a', '', '  '] }).length, 1);
verifie('indicesDe — sans indice, tableau vide', pont.indicesDe({}).length, 0);

/* --- 5. Les paliers s'empilent à l'affichage --------------------------- */
win.document.body.innerHTML =
  '<div id="exercice-0"><div class="exercice-recours"></div>' +
  '<div id="indice-0" class="indice-bloc"></div></div>';
pont.poserLecon({ id: 'test-aff', exercices: [trois] });
pont.viderIndices();
pont.montrer(0); pont.montrer(0);

const zone = win.document.getElementById('indice-0');
verifie('affichage — deux clics montrent deux paliers',
        zone.querySelectorAll('.indice-palier').length, 2);
verifie('affichage — le premier palier reste lisible', /Où regarder/.test(zone.innerHTML), true);
verifie('affichage — les paliers sont numérotés', /Indice 2\/3/.test(zone.innerHTML), true);

pont.montrer(0); pont.montrer(0);      // on insiste au-delà du dernier
verifie('affichage — on ne dépasse jamais le dernier palier',
        zone.querySelectorAll('.indice-palier').length, 3);

/* ======================================================================
   Le genre de l'exercice, et le silence qu'il impose à l'éditeur
   ====================================================================== */
console.log('\n=== Le genre est-il bien lu, et fait-il taire l\'éditeur ? ===\n');

const g = c => pont.genreDe({ type: 'js', consigne: c });
verifie('genre — sans préfixe, c\'est un exercice guidé', g('Affiche ton prénom.'), 'guide');
verifie('genre — « Entraînement »', g('<strong>Entraînement :</strong> à toi.'), 'entrainement');
verifie('genre — « Défi »', g('<strong>Défi :</strong> plus dur.'), 'defi');
verifie('genre — « Chasse au bug »', g('<strong>Chasse au bug !</strong> Ce code est cassé.'), 'bug');
verifie('genre — « Étape »', g('<strong>Étape 2 —</strong> la suite du projet.'), 'etape');
verifie('genre — un QCM est reconnu par son type',
        pont.genreDe({ type: 'qcm', consigne: 'Question 1.' }), 'qcm');
verifie('genre — un champ genre explicite l\'emporte sur la prose',
        pont.genreDe({ type: 'js', genre: 'defi', consigne: '<strong>Entraînement :</strong> …' }), 'defi');
verifie('genre — un genre inconnu est ignoré, on retombe sur la prose',
        pont.genreDe({ type: 'js', genre: 'farfelu', consigne: '<strong>Défi :</strong> …' }), 'defi');

// Tous les exercices du cours doivent tomber dans un genre connu.
const connus = ['guide', 'entrainement', 'defi', 'bug', 'etape', 'qcm'];
const compte = {};
let inconnus = 0, totalExos = 0;
for (const mod of pont.modules()) {
  for (const lecon of mod.lecons) {
    pont.exercicesDe(lecon).forEach(ex => {
      const genre = pont.genreDe(ex);
      totalExos++;
      compte[genre] = (compte[genre] || 0) + 1;
      if (connus.indexOf(genre) === -1) inconnus++;
    });
  }
}
verifie('genre — aucun exercice ne tombe dans un genre inconnu', inconnus, 0);
// Pas de nombre en dur ici : il casserait au premier exercice ajouté, et le
// vrai invariant n'est pas « il y en a N », c'est « ils sont tous classés ».
verifie('genre — chaque exercice est compté une fois et une seule',
        connus.reduce((s, k) => s + (compte[k] || 0), 0), totalExos);
verifie('genre — le cours a bien tous ses exercices', totalExos > 400, true);
console.log('         ' + connus.map(k => k + ' ' + (compte[k] || 0)).join('  ·  '));

/* Une chasse au bug doit taire TOUTES les fautes, dans les sept langages :
   souligner l'erreur en rouge donnerait la réponse avant la première
   lecture. Hors chasse au bug, elle doit au contraire rester visible. */
const CASSES = [
  ['html', '<div class="carte\n<p>suite</p>', 'chevron fermant oublié'],
  ['html', '<!-- commentaire jamais refermé\n<p>a</p>', 'commentaire laissé ouvert'],
  ['js',   'const s = "bonjour;\nconsole.log(s);', 'guillemet non fermé'],
  ['py',   'print("oups\nx = 1', 'guillemet non fermé'],
  ['c',    'char *s = "abc;\nreturn 0;', 'guillemet non fermé'],
  ['java', 'String s = "abc;\nint x;', 'guillemet non fermé'],
  ['sql',  "SELECT 'abc FROM t;", 'apostrophe non fermée']
];
for (const [langue, code, quoi] of CASSES) {
  verifie(langue + ' — ' + quoi + ' : souligné normalement',
          /j-err/.test(pont.colorier(code, langue, false)), true);
  verifie(langue + ' — ' + quoi + ' : tu en chasse au bug',
          /j-err/.test(pont.colorier(code, langue, true)), false);
}

/* ======================================================================
   La recherche atteint-elle le CORPS des leçons, et pas que leurs titres ?
   ====================================================================== */
console.log('\n=== La recherche trouve-t-elle les explications ? ===\n');

const index = pont.index();
const parOu = {};
for (const e of index) parOu[e.ou] = (parOu[e.ou] || 0) + 1;

verifie('index — le corps des leçons y est entré', (parOu.lecon || 0) > 1000, true);
verifie('index — l\'encyclopédie y est toujours', (parOu.memo || 0) > 200, true);
verifie('index — chaque entrée sait où elle mène',
        index.every(e => e.ou === 'lecon' || e.ou === 'memo'), true);
verifie('index — chaque entrée a une cible',
        index.every(e => !!e.cible), true);
console.log('         ' + index.length + ' entrées : ' +
            Object.keys(parOu).sort().map(k => k + ' ' + parOu[k]).join('  ·  '));

/* Le cas qui motivait tout : chercher une notion doit ramener le passage qui
   l'explique, pas seulement un titre qui contient le mot. */
function premiers(q, n) { return pont.chercher(q).slice(0, n); }

verifie('« pointeur » trouve quelque chose', pont.chercher('pointeur').length > 0, true);
verifie('« pointeur » ramène du corps de leçon, pas qu\'un titre',
        premiers('pointeur', 5).some(e => e.ou === 'lecon' && e.genre !== 'lecon'), true);
verifie('« localStorage » ramène du code expliqué',
        premiers('localStorage', 5).some(e => e.genre === 'code'), true);
verifie('« indentation » trouve encore les mémos',
        premiers('indentation', 5).some(e => e.ou === 'memo'), true);
verifie('un mot absent ne renvoie rien', pont.chercher('xyzzyplover').length, 0);

// La règle de l'index d'origine, qui ne doit pas se perdre : un mot entier
// vaut mieux qu'une syllabe prise au milieu d'un autre mot.
const flex = premiers('flex', 3);
verifie('« flex » ne remonte pas « réflexe » en tête',
        flex.length > 0 && !/réflexe/i.test(flex[0].texte), true);

// Les accents et les majuscules ne doivent pas compter.
verifie('la recherche ignore les accents',
        pont.chercher('elements').length > 0, true);

/* ======================================================================
   La révision repropose-t-elle ce qui a coûté cher ?
   ====================================================================== */
console.log('\n=== La révision choisit-elle bien quoi revoir ? ===\n');

const JOURS = 86400000;
const maintenant = Date.now();

// Une progression fabriquée : trois exercices réussis, de coûts très
// différents, plus un QCM qui ne doit jamais revenir.
pont.poserProgression({
  faits: {}, derniere: null,
  exos:   { 'js-1': { 0: true, 1: true }, 'js-2': { 0: true }, 'intro-1': { 0: true } },
  effort: {
    'js-1': { 0: { essais: 0, quand: maintenant },             // sans peine, aujourd'hui
              1: { essais: 6, quand: maintenant } },           // arraché
    'js-2': { 0: { essais: 0, quand: maintenant - 40 * JOURS } }, // facile mais ancien
    'intro-1': { 0: { essais: 9, quand: maintenant } }         // un QCM : hors sujet
  }
});

const revoir = pont.aReviser(8);
verifie('révision — seuls les exercices réussis sont proposés',
        revoir.every(r => ['js-1', 'js-2'].indexOf(r.lecon.id) !== -1), true);
verifie('révision — aucun QCM : relire quatre choix n\'apprend rien',
        revoir.some(r => r.ex.type === 'qcm'), false);
verifie('révision — le plus coûteux passe devant',
        revoir[0].lecon.id + '#' + revoir[0].i, 'js-1#1');
verifie('révision — l\'ancien passe devant le récent sans peine',
        revoir.findIndex(r => r.lecon.id === 'js-2') <
        revoir.findIndex(r => r.lecon.id === 'js-1' && r.i === 0), true);
verifie('révision — on n\'en propose jamais plus que demandé',
        pont.aReviser(2).length <= 2, true);

// Rien de réussi : la page doit le dire, pas rester vide.
pont.poserProgression({ faits: {}, exos: {}, effort: {}, derniere: null });
verifie('révision — sans progression, rien à revoir', pont.aReviser(8).length, 0);

win.document.body.innerHTML = '<main id="contenu"></main><p id="annonce-vue"></p>' +
  '<aside id="sidebar"><div id="repere-module"></div><nav id="nav-modules"></nav>' +
  '<div id="progression-globale"></div></aside>';
pont.rendreRevision();
verifie('révision — la page vide explique quoi faire',
        /Rien à revoir/.test(win.document.getElementById('contenu').innerHTML), true);

console.log('\n' + ok + ' vérification(s) passée(s), ' + echecs + ' échec(s).\n');
process.exit(echecs ? 1 : 0);
