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
// jsdom ne peint pas, donc pas de rafale d images non plus. app.js s en sert
// pour retablir les transitions APRES un changement de theme : on execute le
// rappel tout de suite, ce qui revient au meme hors ecran.
win.requestAnimationFrame = function (f) { f(0); return 0; };
win.cancelAnimationFrame = function () {};

// Le corps du vrai index.html, avant que le moindre test ne le remplace :
// les fonctions de rendu ecrivent dans ses conteneurs, pas dans le vide.
const CORPS_INDEX = win.document.body.innerHTML;

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
    rendreRevision: () => rendreRevision(),
    clesSauvegardables: () => clesSauvegardables(),
    marque: () => MARQUE_SAUVEGARDE,
    restaurer: t => restaurerProgression(t),
    rendreAccueil: () => rendreAccueil(),
    rendreLecon: id => rendreLecon(id),
    rendreBac: () => rendreBac(),
    rendreMemos: o => rendreMemos(o),
    executerJS: (code, rappel) => executerJS(code, rappel),

    // Le bac à sable : « bac » est déclaré en let, donc inatteignable de
    // l'extérieur sans passerelle (voir la note de montage en tête de fichier).
    bacEtat: () => bac,
    poserBac: (v) => { bac = v; },
    cleBac: () => CLE_BAC,
    modeles: () => MODELES,
    nomLibre: (n) => nomLibre(n),
    creerProjet: (n, m) => creerProjet(n, m),
    projetCourant: () => projetCourant(),
    changerProjet: (n) => changerProjet(n),
    supprimerProjet: () => supprimerProjet(),
    exporterProjet: () => exporterProjet(),

    // Les gestes du clavier dans l'éditeur.
    indenter: (z, p) => indenterEditeur(z, p),
    desindenter: (z, p) => desindenterEditeur(z, p),
    brancherClavier: (z, p, id, r, v) => brancherClavierEditeur(z, p, id, r, v),
    majLignes: (i) => majLignes(i),

    // Ce qui s'affiche, et ce qui se navigue.
    afficherConsole: (i, r) => afficherConsole(i, r),
    afficherVerdict: (i, v) => afficherVerdict(i, v),
    repeteLaConsole: (i, m) => verdictRepeteLaConsole(i, m),
    essais: () => essaisRates,
    viderEssais: () => { essaisRates = {}; },
    basculerSommaire: () => basculerSommaire(),
    choisirTheme: (n) => choisirTheme(n),
    cleTheme: () => CLE_THEME,
    changerOngletBac: (n) => changerOngletBac(n),
    basculerPleinEcran: () => basculerPleinEcran(),
    majZoneMemo: () => majZoneMemo(),
    poserMemo: (onglet, recherche) => { ongletMemo = onglet; rechercheMemo = recherche; }
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

/* ======================================================================
   La sauvegarde fait-elle vraiment l'aller-retour ?
   ====================================================================== */
console.log('\n=== Sauvegarder puis restaurer rend-il le même état ? ===\n');

const LS = win.localStorage;
LS.clear();
LS.setItem('aac-progression', JSON.stringify({ exos: { 'js-1': { 0: true } } }));
LS.setItem('aac-code-js-1-0', 'console.log("mon code");');
LS.setItem('aac-bac', '{"projets":{"essai":{}}}');
LS.setItem('aac-theme', 'sombre');
LS.setItem('autre-appli', 'ne doit pas être touché');

const cles = pont.clesSauvegardables();
verifie('sauvegarde — toutes les clés aac- sont prises', cles.length, 4);
verifie('sauvegarde — le code écrit dans les exercices en fait partie',
        cles.indexOf('aac-code-js-1-0') !== -1, true);
verifie('sauvegarde — les projets du bac à sable aussi',
        cles.indexOf('aac-bac') !== -1, true);
verifie('sauvegarde — les clés d\'une autre application sont laissées tranquilles',
        cles.indexOf('autre-appli'), -1);

// Le fichier tel que le bouton l'écrirait.
const donnees = {};
for (const c of cles) donnees[c] = LS.getItem(c);
const fichier = JSON.stringify({ format: pont.marque(), version: 1,
  date: new Date().toISOString(), resume: '1 exercice réussi sur 484', donnees });

// Un fichier étranger doit être refusé, pas appliqué à moitié.
let confirme = false, alerte = '';
win.confirm = () => { confirme = true; return true; };
win.alert = m => { alerte = m; };
win.location.reload = () => {};

alerte = '';
pont.restaurer('{"format":"autre-chose","donnees":{}}');
verifie('restauration — un fichier étranger est refusé',
        /pas une sauvegarde/.test(alerte), true);
verifie('restauration — et le refus explique où en fabriquer une',
        /Sauvegarder/.test(alerte), true);

alerte = '';
pont.restaurer('ceci n\'est pas du JSON');
verifie('restauration — un fichier illisible est refusé', alerte.length > 0, true);

// Le vrai aller-retour : on saccage tout, puis on restaure.
LS.clear();
LS.setItem('aac-progression', '{"exos":{}}');
LS.setItem('autre-appli', 'ne doit pas être touché');
confirme = false;
pont.restaurer(fichier);

verifie('restauration — la confirmation est demandée AVANT d\'écrire', confirme, true);
verifie('restauration — la progression est revenue',
        JSON.parse(LS.getItem('aac-progression')).exos['js-1'][0], true);
verifie('restauration — le code écrit est revenu',
        LS.getItem('aac-code-js-1-0'), 'console.log("mon code");');
verifie('restauration — les projets du bac à sable sont revenus',
        LS.getItem('aac-bac'), '{"projets":{"essai":{}}}');
verifie('restauration — les clés d\'une autre application ont survécu',
        LS.getItem('autre-appli'), 'ne doit pas être touché');

// Refuser la confirmation ne doit RIEN changer.
LS.clear();
LS.setItem('aac-progression', 'intact');
win.confirm = () => false;
pont.restaurer(fichier);
verifie('restauration — refuser la confirmation ne touche à rien',
        LS.getItem('aac-progression'), 'intact');
LS.clear();

/* ========================================================================
   Le logiciel s'applique-t-il ce qu'il enseigne ?
   ========================================================================
   Le cours apprend le alt vide, le label lié à son champ, et surtout qu'une
   div cliquable est inatteignable au clavier là où un vrai bouton ne l'est
   pas (html-22). Rien ne vérifiait que l'application s'y tienne — et elle
   ne s'y tenait pas : les douze cartes de module de l'accueil étaient des
   <div onclick>. Mesuré dans un vrai navigateur le 2026-09-24, corrigé, et
   contrôlé ici pour que cela ne revienne pas.

   Ce que jsdom NE PEUT PAS juger, et qu'il ne faut pas croire couvert : le
   contraste et la visibilité du focus, qui demandent une mise en page. Les
   deux ont été mesurés à la main dans Chrome — zéro défaut une fois les
   emoji écartés, un emoji étant une image en couleurs et non du texte. */

function auditA11y(racine) {
  const maux = [];
  const nom = (el) => el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') +
    (typeof el.className === 'string' && el.className.trim()
      ? '.' + el.className.trim().split(/\s+/)[0] : '');
  const parId = (id) => racine.querySelector('[id="' + String(id).replace(/"/g, '') + '"]');

  const aUnNom = (el) => {
    if (el.getAttribute('aria-label') || el.getAttribute('title')) return true;
    const lb = el.getAttribute('aria-labelledby');
    if (lb && lb.split(/\s+/).some((id) => id && parId(id))) return true;
    if (el.id && racine.querySelector('label[for="' + el.id + '"]')) return true;
    if (el.closest('label')) return true;
    return !!(el.textContent || '').trim();
  };

  for (const img of racine.querySelectorAll('img')) {
    if (!img.hasAttribute('alt')) maux.push('image sans alt — ' + nom(img));
  }
  for (const c of racine.querySelectorAll('input, select, textarea')) {
    if (c.getAttribute('type') === 'hidden') continue;
    if (!aUnNom(c)) maux.push('champ sans nom accessible — ' + nom(c));
  }
  for (const b of racine.querySelectorAll('button, a[href], [role="button"]')) {
    if (!aUnNom(b)) maux.push('commande sans nom — ' + nom(b));
  }
  // Le point que le cours enseigne lui-même.
  for (const el of racine.querySelectorAll('[onclick]')) {
    if (el.matches('button, a[href], input, select, textarea, summary, option')) continue;
    // Number(null) vaut 0, et 0 >= 0 : ecrire Number(getAttribute(...)) >= 0
    // laisserait passer TOUT element sans tabindex, et ce controle ne
    // dirait plus rien. Le sabotage l'a montre ; la lecture, non.
    const ti = el.getAttribute('tabindex');
    if (ti !== null && Number(ti) >= 0) continue;
    maux.push('cliquable mais hors du clavier — ' + nom(el));
  }
  for (const el of racine.querySelectorAll('[tabindex]')) {
    if (Number(el.getAttribute('tabindex')) > 0) maux.push('tabindex positif — ' + nom(el));
  }
  for (const a of ['aria-labelledby', 'aria-describedby', 'aria-controls']) {
    for (const el of racine.querySelectorAll('[' + a + ']')) {
      for (const id of (el.getAttribute(a) || '').split(/\s+/)) {
        if (id && !parId(id)) maux.push(a + ' vers un id absent « ' + id + ' » — ' + nom(el));
      }
    }
  }
  return maux;
}

function poserScene() {
  win.document.body.innerHTML = CORPS_INDEX;
  return win.document.body;
}

console.log('\n=== Le logiciel s\'applique-t-il ce qu\'il enseigne ? ===\n');

const VUES = [
  ['accueil', () => pont.rendreAccueil()],
  ['leçon', () => pont.rendreLecon(pont.modules()[0].lecons[0].id)],
  ['bac à sable', () => pont.rendreBac()],
  ['encyclopédie', () => pont.rendreMemos()]
];

for (const [titre, rendre] of VUES) {
  const contenu = poserScene();
  let plante = null;
  try { rendre(); } catch (e) { plante = e.message; }
  if (plante) { verifie('a11y — la vue « ' + titre + ' » se rend', plante, null); continue; }

  const maux = auditA11y(contenu);
  if (maux.length) {
    console.log('         ' + titre + ' : ' + maux.slice(0, 6).join('\n                   '));
  }
  verifie('a11y — « ' + titre + ' » : rien d\'inatteignable ni d\'anonyme', maux.length, 0);

  const h1 = contenu.querySelectorAll('h1').length;
  verifie('a11y — « ' + titre + ' » a un titre de niveau 1 et un seul', h1, 1);
}

/* ========================================================================
   Les projets du bac à sable
   ========================================================================
   Le bac garde les projets de l'élève dans le localStorage, et rien ne les
   vérifiait. La sauvegarde de la PROGRESSION est testée depuis longtemps ;
   celle de son TRAVAIL, non. Un défaut ici ne se rattrape pas : il n'y a pas
   de deuxième copie.

   Deux points comptent plus que les autres. Le garde-fou qui empêche de
   supprimer son dernier projet — sans lui, un clic laisse l'atelier vide.
   Et la reprise en douceur d'un projet enregistré AVANT l'ajout des onglets
   SQL, C et Java : projetCourant le complète à la volée, faute de quoi un
   ancien projet ferait planter l'éditeur. */

console.log('\n=== Le bac à sable garde-t-il le travail de l\'élève ? ===\n');

function bacNeuf(projets, courant, onglet) {
  pont.poserBac({ projets: projets, courant: courant, onglet: onglet || 'web', fichier: 'html' });
}

// --- nomLibre : deux projets ne peuvent pas porter le même nom ---
bacNeuf({}, null);
verifie('bac — un nom libre est rendu tel quel', pont.nomLibre('Essai'), 'Essai');
bacNeuf({ 'Essai': {} }, 'Essai');
verifie('bac — un nom déjà pris devient « Essai 2 »', pont.nomLibre('Essai'), 'Essai 2');
bacNeuf({ 'Essai': {}, 'Essai 2': {} }, 'Essai');
verifie('bac — puis « Essai 3 »', pont.nomLibre('Essai'), 'Essai 3');

// --- créer ---
LS.clear();
bacNeuf({}, null);
const cree = pont.creerProjet('Mon essai', 'vide');
verifie('bac — créer rend le nom retenu', cree, 'Mon essai');
verifie('bac — le projet existe', !!pont.bacEtat().projets['Mon essai'], true);
verifie('bac — il devient le projet courant', pont.bacEtat().courant, 'Mon essai');
verifie('bac — et il est écrit dans le localStorage', !!LS.getItem(pont.cleBac()), true);
verifie('bac — un projet neuf a ses sept fichiers',
        Object.keys(pont.bacEtat().projets['Mon essai']).sort().join(','), 'c,css,html,java,js,py,sql');

// Choisir un modèle Python en étant côté web afficherait sinon un éditeur
// HTML qui n'a rien à voir avec ce qu'on vient de demander.
const modelePython = Object.keys(pont.modeles()).find((k) => pont.modeles()[k].python);
if (modelePython) {
  bacNeuf({}, null, 'web');
  pont.creerProjet('Essai python', modelePython);
  verifie('bac — un modèle Python ouvre l\'onglet Python', pont.bacEtat().onglet, 'python');
}

// --- projetCourant : il répare ce qui manque ---
bacNeuf({ 'Ancien': { html: '<p>x</p>', css: '', js: '' } }, 'Ancien');
const repare = pont.projetCourant();
verifie('bac — un projet d\'avant les onglets SQL/C/Java est complété',
        [typeof repare.sql, typeof repare.c, typeof repare.java].join(','), 'string,string,string');
verifie('bac — et son HTML n\'a pas été touché', repare.html, '<p>x</p>');

bacNeuf({ 'A': { html: 'a' }, 'B': { html: 'b' } }, 'Disparu');
pont.projetCourant();
verifie('bac — un projet courant disparu retombe sur un autre', pont.bacEtat().courant, 'A');

bacNeuf({}, null);
pont.projetCourant();
verifie('bac — sans aucun projet, il en crée un', Object.keys(pont.bacEtat().projets).length, 1);

// --- changer ---
poserScene();
bacNeuf({ 'A': { html: 'a' }, 'B': { html: 'b' } }, 'A');
pont.changerProjet('B');
verifie('bac — changer de projet suit', pont.bacEtat().courant, 'B');
pont.changerProjet('Inconnu');
verifie('bac — un nom inconnu ne change rien', pont.bacEtat().courant, 'B');

// --- supprimer : c'est là qu'on perd du travail ---
let demandes = [];
win.alert = (q) => { demandes.push('ALERTE:' + String(q)); };

/* Le confirm dit OUI ici, et c'est tout l'intérêt : si le garde-fou saute,
   le dernier projet DISPARAÎT pour de bon. L'éprouver avec un confirm qui
   refuse ne prouverait rien — le projet survivrait de toute façon, et le
   contrôle resterait vert sans rien garantir. */
win.confirm = (q) => { demandes.push('CONFIRME:' + String(q)); return true; };
poserScene();
bacNeuf({ 'Seul': { html: 'a' } }, 'Seul');
demandes = [];
pont.supprimerProjet();
/* Compter les projets ne suffirait pas, et c'est un piège à connaître :
   si le garde-fou saute, le projet EST supprimé, puis rendreBac appelle
   projetCourant, qui en recrée aussitôt un vide. Le compte revient à 1 et
   tout a l'air normal — alors que le travail de l'élève a disparu. Seul le
   NOM le dit. */
verifie('bac — le dernier projet survit, sous son nom',
        Object.keys(pont.bacEtat().projets).join(','), 'Seul');
verifie('bac — on le dit, au lieu de ne rien faire',
        demandes.length === 1 && demandes[0].indexOf('ALERTE:') === 0, true);
verifie("bac — et la confirmation n'est même pas posée",
        demandes.some((d) => d.indexOf('CONFIRME:') === 0), false);

win.confirm = (q) => { demandes.push(String(q)); return false; };
poserScene();
bacNeuf({ 'A': { html: 'a' }, 'B': { html: 'b' } }, 'A');
demandes = [];
pont.supprimerProjet();
verifie('bac — supprimer demande confirmation', demandes.length, 1);
verifie('bac — refuser ne supprime rien', Object.keys(pont.bacEtat().projets).length, 2);

win.confirm = () => true;
poserScene();
bacNeuf({ 'A': { html: 'a' }, 'B': { html: 'b' } }, 'A');
pont.supprimerProjet();
verifie('bac — accepter supprime le bon projet',
        Object.keys(pont.bacEtat().projets).join(','), 'B');
verifie('bac — et le courant retombe sur celui qui reste', pont.bacEtat().courant, 'B');

// --- exporter : le nom du fichier et son extension ---
// jsdom n'a pas createObjectURL : on le pose, et on retient le lien fabriqué.
let telecharge = null;
win.URL.createObjectURL = () => 'blob:essai';
win.URL.revokeObjectURL = () => {};
const vraiClic = win.HTMLAnchorElement.prototype.click;
win.HTMLAnchorElement.prototype.click = function () { telecharge = this.download; };

for (const [onglet, extension] of [['web', '.html'], ['python', '.py'], ['sql', '.sql'], ['c', '.c'], ['java', '.java']]) {
  poserScene();
  bacNeuf({ 'Mon projet': { html: 'h', css: '', js: '', py: 'p', sql: 's', c: 'c', java: 'j' } }, 'Mon projet', onglet);
  telecharge = null;
  pont.exporterProjet();
  verifie('bac — export depuis l\'onglet « ' + onglet + ' »', telecharge, 'Mon-projet' + extension);
}

poserScene();
bacNeuf({ 'Café: / brûlé*?' : { html: 'h', css: '', js: '', py: '', sql: '', c: '', java: '' } }, 'Café: / brûlé*?', 'web');
telecharge = null;
pont.exporterProjet();
verifie('bac — un nom à caractères interdits devient un nom de fichier sûr',
        /^[a-zA-Z0-9à-ÿ_-]+\.html$/.test(String(telecharge)), true);
win.HTMLAnchorElement.prototype.click = vraiClic;

/* ========================================================================
   Les gestes du clavier dans l'éditeur
   ========================================================================
   Une zoneClavier de texte qui avale la touche Tab est un piège au clavier : on y
   entre, on n'en sort plus. C'est un manquement d'accessibilité caractérisé,
   et le cours l'enseigne lui-même. L'éditeur capture bien Tab — il faut
   pouvoir indenter — mais Échap relâche la capture, et l'astuce affichée
   change pour le dire. Rien ne vérifiait cette porte de sortie.

   jsdom ne fournit pas document.execCommand : les deux fonctions prennent
   donc leur chemin manuel, celui qui manipule la valeur à la main. C'est
   celui qu'on veut éprouver, puisque c'est le seul qui soit à nous. */

console.log('\n=== L\'éditeur laisse-t-il sortir au clavier ? ===\n');

function zoneClavierAvec(texte, curseur) {
  poserScene();
  const z = win.document.createElement('textarea');
  z.value = texte;
  z.selectionStart = z.selectionEnd = curseur === undefined ? texte.length : curseur;
  win.document.body.appendChild(z);
  return z;
}

let z = zoneClavierAvec('abc', 3);
pont.indenter(z, '    ');
verifie('éditeur — Tab insère l\'indentation au curseur', z.value, 'abc    ');

z = zoneClavierAvec('ab', 1);
pont.indenter(z, '    ');
verifie('éditeur — et au milieu aussi', z.value, 'a    b');
verifie('éditeur — le curseur suit l\'insertion', z.selectionStart, 5);

z = zoneClavierAvec('x\n        y', 11);
pont.desindenter(z, '    ');
verifie('éditeur — Maj+Tab retire quatre espaces', z.value, 'x\n    y');

z = zoneClavierAvec('x\n  y', 5);
pont.desindenter(z, '    ');
verifie('éditeur — il ne retire que ce qui est là', z.value, 'x\ny');

z = zoneClavierAvec('x\ny', 3);
pont.desindenter(z, '    ');
verifie('éditeur — et rien du tout s\'il n\'y a pas d\'espaces', z.value, 'x\ny');

// --- la porte de sortie ---
const scene = poserScene();
const astuce = win.document.createElement('p');
astuce.id = 'astuce-test';
win.document.body.appendChild(astuce);
const zoneClavier = win.document.createElement('textarea');
zoneClavier.value = 'du code';
zoneClavier.selectionStart = zoneClavier.selectionEnd = 7;
win.document.body.appendChild(zoneClavier);

let valide = 0;
pont.brancherClavier(zoneClavier, '    ', 'astuce-test', () => {}, () => { valide++; });

const touche = (cle, options) => {
  const e = new win.KeyboardEvent('keydown', Object.assign({ key: cle, bubbles: true, cancelable: true }, options || {}));
  zoneClavier.dispatchEvent(e);
  return e;
};

verifie('éditeur — Tab est d\'abord capturé, pour indenter', touche('Tab').defaultPrevented, true);
verifie('éditeur — et le code a bien été indenté', zoneClavier.value, 'du code    ');

const echap = touche('Escape');
verifie('éditeur — Échap est pris en compte', echap.defaultPrevented, true);
verifie('éditeur — l\'astuce annonce la sortie', /Tab quitte/.test(astuce.textContent), true);
verifie('éditeur — Tab n\'est PLUS capturé : on peut sortir au clavier',
        touche('Tab').defaultPrevented, false);
const avant = zoneClavier.value;
verifie('éditeur — et Tab n\'indente plus', zoneClavier.value, avant);

verifie('éditeur — Ctrl+Entrée lance la vérification', (touche('Enter', { ctrlKey: true }), valide), 1);

/* ========================================================================
   Ce qui s'affiche, et ce qui se navigue
   ========================================================================
   Deux familles restaient hors de portée : les fonctions d'affichage et
   celles de navigation. On n'en couvre ici qu'une partie, et c'est
   délibéré — beaucoup sont des enveloppes d'une ligne (allerLeconExo vaut
   allerLecon suivi d'un setTimeout) que les quatre vues de la section
   accessibilité exercent déjà. Les éprouver une à une n'ajouterait que des
   contrôles incapables d'échouer, et un harnais qui ne peut pas rougir ne
   sert qu'à se rassurer.

   Ce qui suit porte donc sur ce qui a un vrai comportement, et surtout sur
   ce que l'élève LIT : la console, le verdict, et le refus délibéré de
   répéter deux fois la même erreur. */

console.log("\n=== Ce que l'élève lit : console et verdict ===\n");

function sceneExercice() {
  poserScene();
  const d = win.document.getElementById('contenu');
  d.innerHTML =
    '<div id="exercice-0" class="exercice">' +
    '<div class="exercice-entete">Exercice</div>' +
    '<pre id="console-sortie-0"></pre>' +
    '<div id="feedback-0"></div>' +
    '</div>';
  return d;
}

// --- la console ---
sceneExercice();
pont.afficherConsole(0, { logs: ['bonjour', '42'], erreur: null });
verifie('console — les lignes sont affichées dans l\'ordre',
        win.document.getElementById('console-sortie-0').textContent.trim(), 'bonjour\n42');

sceneExercice();
pont.afficherConsole(0, { logs: ['avant'], erreur: 'NameError: x' });
const avecErreur = win.document.getElementById('console-sortie-0');
verifie('console — ce qui précède l\'erreur reste visible', /avant/.test(avecErreur.textContent), true);
verifie('console — et l\'erreur est signalée à part',
        !!avecErreur.querySelector('.ligne-erreur'), true);

sceneExercice();
pont.afficherConsole(0, { logs: [], erreur: null });
verifie('console — un code muet le dit, au lieu de rester vide',
        /rien affiché/.test(win.document.getElementById('console-sortie-0').textContent), true);

/* Un élève qui affiche du HTML doit LIRE son HTML, pas le voir interprété.
   Sans échappement, print("<b>x</b>") mettrait la console en gras et ferait
   disparaître les balises — précisément ce que la leçon lui apprend à voir. */
sceneExercice();
pont.afficherConsole(0, { logs: ['<b>gras</b>'], erreur: null });
const echappee = win.document.getElementById('console-sortie-0');
verifie('console — le HTML affiché par l\'élève reste du texte',
        echappee.textContent.indexOf('<b>gras</b>') !== -1, true);
verifie('console — et n\'est surtout pas interprété', echappee.querySelector('b'), null);

// --- le verdict ---
// Une VRAIE leçon du cours : marquerExo passe par trouverLecon, qui ne
// connaît que celles-là. Une leçon inventée le ferait planter.
const leconEssai = pont.modules()[0].lecons[0];
pont.poserLecon(leconEssai);
pont.poserProgression({ faits: {}, exos: {} });

sceneExercice();
pont.afficherVerdict(0, { neutre: true, message: 'Coche une réponse.' });
verifie('verdict — ne rien avoir coché n\'est pas une faute',
        win.document.getElementById('feedback-0').className, 'feedback neutre');

sceneExercice();
pont.viderEssais();
pont.afficherVerdict(0, { ok: false, message: 'Il manque le point-virgule.' });
verifie('verdict — un échec se voit', win.document.getElementById('feedback-0').className, 'feedback ko');
verifie('verdict — et il compte, car c\'est lui qui fait monter l\'aide',
        Object.values(pont.essais())[0], 1);

sceneExercice();
pont.viderEssais();
pont.afficherVerdict(0, { ok: false });
verifie('verdict — sans message, on dit quand même quoi faire',
        /Relis la consigne/.test(win.document.getElementById('feedback-0').textContent), true);

sceneExercice();
pont.poserProgression({ faits: {}, exos: {} });
pont.afficherVerdict(0, { ok: true, message: 'Bien vu.' });
verifie('verdict — une réussite se voit', win.document.getElementById('feedback-0').className, 'feedback ok');
verifie('verdict — et l\'exercice porte sa marque',
        !!win.document.querySelector('#exercice-0 .badge-fait'), true);
pont.afficherVerdict(0, { ok: true, message: 'Bien vu.' });
verifie('verdict — revalider n\'ajoute pas une deuxième marque',
        win.document.querySelectorAll('#exercice-0 .badge-fait').length, 1);

/* Beaucoup de correcteurs renvoient l'erreur du moteur telle quelle. Elle
   est déjà imprimée dans la console, à quelques centimètres : la répéter mot
   pour mot ferait croire à DEUX problèmes différents. Le verdict est alors
   remplacé par une phrase qui désigne la console. Décision fine, et que
   personne ne vérifiait. */
sceneExercice();
const memeTexte = "NameError: name 'total' is not defined on line 3";
pont.afficherConsole(0, { logs: [], erreur: memeTexte });
verifie('verdict — un verdict identique à la console est reconnu comme tel',
        pont.repeteLaConsole(0, memeTexte), true);
pont.viderEssais();
pont.afficherVerdict(0, { ok: false, message: memeTexte });
const fb = win.document.getElementById('feedback-0').textContent;
verifie('verdict — il ne répète pas l\'erreur, il montre où elle est déjà écrite',
        /juste à côté/.test(fb) && fb.indexOf('NameError') === -1, true);

sceneExercice();
pont.afficherConsole(0, { logs: [], erreur: 'NameError: x' });
verifie('verdict — un message vraiment différent, lui, est laissé intact',
        pont.repeteLaConsole(0, 'Relis la consigne : il faut afficher la somme.'), false);

console.log('\n=== La navigation garde-t-elle sa trace ? ===\n');

poserScene();
const btnSommaire = win.document.getElementById('btn-sommaire');
// Sans cette ligne, un bouton renommé ferait disparaître les trois contrôles
// suivants sans que personne ne le remarque : un test qui sait se taire ne
// vaut pas mieux que pas de test.
verifie('sommaire — le bouton est bien dans la page', !!btnSommaire, true);
if (btnSommaire) {
  verifie('sommaire — replié au départ', btnSommaire.getAttribute('aria-expanded'), 'false');
  pont.basculerSommaire();
  verifie('sommaire — l\'ouvrir l\'annonce aux lecteurs d\'écran', btnSommaire.getAttribute('aria-expanded'), 'true');
  pont.basculerSommaire();
  verifie('sommaire — et le refermer aussi', btnSommaire.getAttribute('aria-expanded'), 'false');
}

poserScene();
LS.removeItem(pont.cleTheme());
pont.choisirTheme('sombre');
verifie('thème — il est posé sur la page', win.document.documentElement.getAttribute('data-theme'), 'sombre');
verifie('thème — et retenu pour la prochaine ouverture', LS.getItem(pont.cleTheme()), 'sombre');
pont.choisirTheme('clair');
verifie('thème — en changer suit', LS.getItem(pont.cleTheme()), 'clair');

poserScene();
bacNeuf({ 'A': { html: 'a', css: '', js: '', py: '', sql: '', c: '', java: '' } }, 'A', 'web');
pont.changerOngletBac('python');
verifie('bac — changer d\'onglet est retenu', pont.bacEtat().onglet, 'python');
verifie('bac — et écrit tout de suite', JSON.parse(LS.getItem(pont.cleBac())).onglet, 'python');

poserScene();
bacNeuf({ 'A': { html: 'a', css: '', js: '', py: '', sql: '', c: '', java: '' } }, 'A', 'web');
pont.basculerPleinEcran();
verifie('bac — le plein écran se retient', pont.bacEtat().plein, true);
verifie('bac — et marque la page', win.document.body.classList.contains('plein-ecran'), true);
pont.basculerPleinEcran();
verifie('bac — en sortir aussi', win.document.body.classList.contains('plein-ecran'), false);

// --- l'encyclopédie : onglet ou recherche, jamais les deux ---
poserScene();
win.document.getElementById('contenu').innerHTML =
  '<div id="memo-onglets"><button class="memo-onglet" data-memo="html">HTML</button>' +
  '<button class="memo-onglet" data-memo="css">CSS</button></div>' +
  '<button id="memo-effacer"></button><div id="memo-zone"></div>';
pont.poserMemo('css', '');
pont.majZoneMemo();
verifie('encyclopédie — sans recherche, l\'onglet choisi est actif',
        win.document.querySelector('.memo-onglet[data-memo="css"]').classList.contains('actif'), true);
verifie('encyclopédie — et le bouton d\'effacement reste caché',
        win.document.getElementById('memo-effacer').style.display, 'none');

pont.poserMemo('css', 'boucle');
pont.majZoneMemo();
verifie('encyclopédie — en recherche, plus aucun onglet n\'est actif',
        win.document.querySelectorAll('.memo-onglet.actif').length, 0);
verifie('encyclopédie — et on peut effacer sa recherche',
        win.document.getElementById('memo-effacer').style.display, 'grid');

/* ========================================================================
   Le moteur JavaScript quand les Workers manquent
   ========================================================================
   executerJS lance le code de l'élève dans un Worker, et retombe sur une
   exécution directe si le navigateur n'en donne pas. Ce repli n'avait jamais
   été exécuté par personne : ni ici, ni dans verifier-contenu.js, qui a son
   propre moteur.

   jsdom ne fournit ni Worker ni URL.createObjectURL. C'est donc TOUJOURS le
   repli qui s'exécute dans ce fichier — la couverture était gratuite, il
   suffisait de l'appeler. Les assertions ci-dessous valent pour lui seul ;
   le chemin Worker a été mesuré à la main dans Chrome, y compris depuis
   file://, où il fonctionne (contrairement à ce que l'on pouvait craindre
   d'une origine réputée opaque).

   Ce que ce repli NE SAIT PAS faire, et qu'aucun test ne peut donc prouver :
   arrêter une boucle infinie. Rien n'interrompt du code synchrone sur le fil
   principal. C'est écrit dans app.js, à l'endroit où ça se joue. */

const lancerJS = (code) => new Promise((resolve) => pont.executerJS(code, resolve));

(async () => {
  console.log('\n=== Le repli « sans Worker » rend-il la même chose ? ===\n');

  verifie('repli — c\'est bien lui qui s\'exécute ici', typeof win.Worker, 'undefined');

  const simple = await lancerJS('console.log("bonjour"); console.log(1 + 1);');
  verifie('repli — les console.log sont captés', simple.logs.join('|'), 'bonjour|2');
  verifie('repli — pas d\'erreur quand il n\'y en a pas', simple.erreur, null);

  const objet = await lancerJS('console.log({ a: 1 }); console.log([1, 2]); console.log(null);');
  verifie('repli — un objet est rendu en JSON, comme dans le Worker',
          objet.logs.join('|'), '{"a":1}|[1,2]|null');

  const plante = await lancerJS('console.log("avant"); nexistePas();');
  verifie('repli — ce qui précède l\'erreur reste affiché', plante.logs.join('|'), 'avant');
  verifie('repli — l\'erreur est rapportée', /nexistePas/.test(plante.erreur || ''), true);

  // Le vrai manque d'avant : le repli rendait la main tout de suite, donc
  // tout ce qui était différé se perdait — et jsav-18 n'affichait rien.
  const differe = await lancerJS(
    'console.log("tout de suite"); setTimeout(function () { console.log("plus tard"); }, 120);');
  verifie('repli — un setTimeout est attendu, pas ignoré',
          differe.logs.join('|'), 'tout de suite|plus tard');

  // Le Worker se fait terminate() ; ici il faut éteindre les minuteurs à la
  // main, sinon l'intervalle de l'élève tourne encore après le verdict.
  const repete = await lancerJS('var n = 0; setInterval(function () { console.log("tic" + (++n)); }, 40);');
  verifie('repli — un setInterval a bien parlé', repete.logs.length > 0, true);
  const apresVerdict = repete.logs.length;
  await new Promise((r) => setTimeout(r, 500));
  verifie('repli — et il s\'arrête une fois le verdict rendu', repete.logs.length, apresVerdict);

  verifie('repli — la réponse n\'a que les deux champs attendus',
          Object.keys(simple).sort().join(','), 'erreur,logs');

  console.log('\n' + ok + ' vérification(s) passée(s), ' + echecs + ' échec(s).\n');
  process.exit(echecs ? 1 : 0);
})();
