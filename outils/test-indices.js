/* Vérifie l'escalade de l'aide, à l'échelle de l'interface.
   ------------------------------------------------------------------------
   verifier-contenu.js juge les CORRECTEURS. Ce script-ci juge ce que l'élève
   VOIT : quel bouton d'aide apparaît, après combien d'essais ratés, et ce
   qu'il découvre en cliquant. C'est l'endroit exact où l'on abandonne, donc
   l'endroit qui mérite un test.

   Usage :  node outils/test-indices.js
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
    indicesDe: ex => indicesDe(ex)
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

console.log('\n' + ok + ' vérification(s) passée(s), ' + echecs + ' échec(s).\n');
process.exit(echecs ? 1 : 0);
