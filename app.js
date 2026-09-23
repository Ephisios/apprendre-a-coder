/* ===== Apprendre à coder — moteur de l'application (v3 : multi-exercices + QCM + thèmes) ===== */

// ---- Assemblage des modules (les données viennent des fichiers data-*.js) ----
const MODULES = [
  { id: 'intro', icone: '👋', teinte: 'var(--m-intro)', titre: 'Bienvenue', desc: 'Comprendre ce qu\'est le code et comment utiliser ce logiciel.', lecons: DATA_INTRO },
  { id: 'html',  icone: '🧱', teinte: 'var(--m-html)',  titre: 'HTML — La structure', desc: 'Le squelette de toute page web : textes, liens, images, formulaires, sémantique, SEO.', lecons: DATA_HTML.concat(DATA_HTML2, DATA_HTML3) },
  { id: 'css',   icone: '🎨', teinte: 'var(--m-css)',   titre: 'CSS — L\'apparence', desc: 'Couleurs, mise en page, Grid, animations, variables : rendre une page belle.', lecons: DATA_CSS.concat(DATA_CSS2, DATA_CSS3) },
  { id: 'js',    icone: '⚡', teinte: 'var(--m-js)',    titre: 'JavaScript — La logique', desc: 'Le vrai langage de programmation : variables, conditions, boucles, fonctions.', lecons: DATA_JS1.concat(DATA_JS2) },
  { id: 'js2',   icone: '🧠', teinte: 'var(--m-js2)',   titre: 'JavaScript — La suite', desc: 'switch, tri, reduce, boucles imbriquées, dates, clavier... et un jeu complet.', lecons: DATA_JS3 },
  { id: 'jsav',  icone: '🔥', teinte: 'var(--m-jsav)',  titre: 'JavaScript avancé', desc: 'Les outils des pros : méthodes modernes, DOM dynamique, sauvegarde de données.', lecons: DATA_JSAVANCE.concat(DATA_JS4) },
  { id: 'proj',  icone: '🛠️', teinte: 'var(--m-proj)',  titre: 'Projets guidés', desc: 'Construire de vraies applications, de la première ligne à la dernière.', lecons: DATA_PROJETS },
  { id: 'py',    icone: '🐍', teinte: 'var(--m-py)',    titre: 'Python — Un second langage', desc: 'Le langage des scripts, des données et de l\'IA : mêmes idées, nouvelle grammaire.', lecons: DATA_PYTHON.concat(DATA_PYTHON2, DATA_PYTHON3) },
  { id: 'sql',   icone: '🗄', teinte: 'var(--m-sql)',   titre: 'SQL — Les bases de données', desc: 'Interroger, filtrer, résumer et relier des données : le langage des rapports.', lecons: DATA_SQL.concat(DATA_SQL2) },
  { id: 'c',     icone: '🔧', teinte: 'var(--m-c)',     titre: 'C — Le langage des fondations', desc: 'Types, mémoire, pointeurs : comprendre ce qui se passe vraiment sous le capot.', lecons: DATA_C },
  { id: 'java',  icone: '☕', teinte: 'var(--m-java)',  titre: 'Java — Les grandes applications', desc: 'Classes, objets, héritage : la programmation orientée objet des entreprises.', lecons: DATA_JAVA },
  { id: 'fin',   icone: '🚀', teinte: 'var(--m-fin)',   titre: 'Et après ?', desc: 'Les autres langages, et comment continuer à apprendre seul.', lecons: DATA_FIN },
];

/* ---- Le genre d'un exercice -------------------------------------------
   `type` dit dans QUEL LANGAGE on écrit ; il ne dit pas ce qu'on attend de
   l'élève. Or un entraînement, un défi et une chasse au bug ne se jouent pas
   pareil — et la chasse au bug, en particulier, exige que l'éditeur se taise :
   souligner l'erreur en rouge donnerait la réponse avant la première lecture.

   Le genre était déjà écrit, mais en prose, en tête de consigne. Plutôt que
   de retoucher 481 enregistrements, on le lit là où il se trouve déjà. Un
   exercice peut toujours le déclarer franchement avec `genre:`, qui gagne. */
const GENRES = {
  guide:        { mot: 'Exercice',      icone: '💪', aide: 'On avance pas à pas avec toi.' },
  entrainement: { mot: 'Entraînement',  icone: '🏋️', aide: 'À toi de jouer, sur le même modèle.' },
  defi:         { mot: 'Défi',          icone: '🎯', aide: 'Plus difficile : on ne montre plus le chemin.' },
  bug:          { mot: 'Chasse au bug', icone: '🐛', aide: 'Le code est cassé. Trouver la faute EST l\'exercice — l\'éditeur ne souligne donc rien.' },
  etape:        { mot: 'Étape',         icone: '🧩', aide: 'Une pièce du projet en cours.' },
  qcm:          { mot: 'Question',      icone: '❓', aide: 'Vérifie que la notion est comprise.' }
};

function genreDe(ex) {
  if (ex.genre && GENRES[ex.genre]) return ex.genre;
  if (ex.type === 'qcm') return 'qcm';
  const c = ex.consigne || '';
  if (/^<strong>\s*Chasse au bug/i.test(c)) return 'bug';
  if (/^<strong>\s*D[ée]fi/i.test(c)) return 'defi';
  if (/^<strong>\s*Entra[îi]nement/i.test(c)) return 'entrainement';
  if (/^<strong>\s*[ÉE]tape/i.test(c)) return 'etape';
  return 'guide';
}

// Compatibilité : une leçon peut définir `exercice` (v1, unique) ou `exercices` (v2, tableau)
function exercicesDe(lecon) {
  if (lecon.exercices) return lecon.exercices;
  if (lecon.exercice) return [lecon.exercice];
  return [];
}

// ---- Thème clair / sombre ----
const CLE_THEME = 'aac-theme';

function choisirTheme(nom) {
  const racine = document.documentElement;
  racine.classList.add('sans-transition');
  racine.setAttribute('data-theme', nom);
  try { localStorage.setItem(CLE_THEME, nom); } catch (e) {}
  majBoutonsTheme();
  // On rétablit les transitions une fois le nouveau thème peint.
  requestAnimationFrame(() => requestAnimationFrame(() => racine.classList.remove('sans-transition')));
}
function majBoutonsTheme() {
  const actuel = document.documentElement.getAttribute('data-theme') || 'clair';
  const clair = document.getElementById('theme-clair');
  const sombre = document.getElementById('theme-sombre');
  // aria-pressed : sans lui, ☀️ et 🌙 s'annoncent à l'identique quel que soit
  // le thème actif — on entend deux boutons, jamais lequel est en cours.
  if (clair) {
    clair.classList.toggle('actif', actuel === 'clair');
    clair.setAttribute('aria-pressed', actuel === 'clair' ? 'true' : 'false');
  }
  if (sombre) {
    sombre.classList.toggle('actif', actuel === 'sombre');
    sombre.setAttribute('aria-pressed', actuel === 'sombre' ? 'true' : 'false');
  }
}

// ---- Progression (sauvegardée dans le navigateur) ----
const CLE_PROGRESSION = 'aac-progression';
let progression = { faits: {}, exos: {}, derniere: null };
try {
  const brut = localStorage.getItem(CLE_PROGRESSION);
  if (brut) progression = Object.assign({ faits: {}, exos: {}, derniere: null }, JSON.parse(brut));
} catch (e) { /* stockage indisponible : on continue sans sauvegarde */ }

function sauverProgression() {
  try { localStorage.setItem(CLE_PROGRESSION, JSON.stringify(progression)); } catch (e) {}
}

function exoFait(idLecon, i) {
  return !!(progression.exos[idLecon] && progression.exos[idLecon][i]);
}
function marquerExo(idLecon, i, acquis, essais) {
  if (!progression.exos[idLecon]) progression.exos[idLecon] = {};
  progression.exos[idLecon][i] = true;
  /* Ce qu'un exercice a COÛTÉ, et quand il a été réussi. Sans ces deux
     nombres, la progression ne sait que « fait / pas fait » — impossible de
     savoir ce qui mérite d'être revu. Un exercice réussi du premier coup il
     y a une heure et un autre arraché en six essais le mois dernier ne se
     valent pas, et c'est le second qu'on a oublié. */
  if (!progression.effort) progression.effort = {};
  if (!progression.effort[idLecon]) progression.effort[idLecon] = {};
  progression.effort[idLecon][i] = { essais: Number(essais) || 0, quand: Date.now() };
  // La phrase de réussite est écrite à la main, exercice par exercice, et
  // elle dit ce qu'on vient d'apprendre. C'est la seule matière disponible
  // pour un bilan honnête de fin de leçon : on la garde au lieu de l'oublier
  // une seconde après l'avoir affichée.
  if (acquis) {
    if (!progression.acquis) progression.acquis = {};
    if (!progression.acquis[idLecon]) progression.acquis[idLecon] = {};
    progression.acquis[idLecon][i] = String(acquis).slice(0, 400);
  }
  const lecon = trouverLecon(idLecon).lecon;
  const tous = exercicesDe(lecon).every((_, j) => exoFait(idLecon, j));
  if (tous) progression.faits[idLecon] = true;
  sauverProgression();
}

function acquisDe(idLecon, i) {
  return (progression.acquis && progression.acquis[idLecon] && progression.acquis[idLecon][i]) || '';
}

// Oublier une réussite : l'exercice redevient à faire, et la leçon cesse
// d'être terminée puisqu'il lui manque désormais un exercice.
function oublierExo(idLecon, i) {
  if (progression.exos[idLecon]) delete progression.exos[idLecon][i];
  if (progression.acquis && progression.acquis[idLecon]) delete progression.acquis[idLecon][i];
  if (progression.effort && progression.effort[idLecon]) delete progression.effort[idLecon][i];
  delete progression.faits[idLecon];
  sauverProgression();
}

/* ---- Ce qui mérite d'être revu ----------------------------------------
   Une progression qui ne connaît que « fait / pas fait » ne ramène jamais
   sur rien : une notion arrachée en six essais est comptée comme acquise,
   exactement comme celle qui est tombée du premier coup. C'est pourtant
   celle-là qu'on a oubliée.

   On classe donc les exercices déjà réussis par ce qu'ils ont coûté, puis
   par leur ancienneté. Rien d'un algorithme de répétition espacée : juste
   les deux seuls signaux que le logiciel possède honnêtement. */
const JOUR = 86400000;

function aReviser(combien) {
  const effort = progression.effort || {};
  const maintenant = Date.now();
  const liste = [];

  for (const mod of MODULES) {
    for (const lecon of mod.lecons) {
      exercicesDe(lecon).forEach((ex, i) => {
        if (!exoFait(lecon.id, i)) return;             // jamais réussi : ce n'est pas une révision
        if (ex.type === 'qcm') return;                 // relire quatre choix n'apprend rien
        const e = (effort[lecon.id] || {})[i] || { essais: 0, quand: 0 };
        const jours = e.quand ? Math.floor((maintenant - e.quand) / JOUR) : 999;
        liste.push({
          mod, lecon, ex, i,
          essais: e.essais,
          jours: jours,
          // Ce qu'il a coûté pèse le plus ; l'ancienneté départage.
          poids: e.essais * 10 + Math.min(jours, 60)
        });
      });
    }
  }
  return liste.sort((a, b) => b.poids - a.poids).slice(0, combien || 8);
}

function sauverCode(idLecon, i, code) {
  try { localStorage.setItem('aac-code-' + idLecon + '-' + i, code); } catch (e) {}
}
function chargerCode(idLecon, i) {
  try { return localStorage.getItem('aac-code-' + idLecon + '-' + i); } catch (e) { return null; }
}
function oublierCode(idLecon, i) {
  try { localStorage.removeItem('aac-code-' + idLecon + '-' + i); } catch (e) {}
}

// Une leçon est « entamée » dès qu'on y a réussi quelque chose ou laissé du
// code : inutile de proposer une remise à zéro s'il n'y a rien à remettre.
function leconEntamee(lecon) {
  return exercicesDe(lecon).some((_, i) => exoFait(lecon.id, i) || chargerCode(lecon.id, i) !== null);
}

// ---- Utilitaires ----
function trouverLecon(id) {
  for (const m of MODULES) {
    const i = m.lecons.findIndex(l => l.id === id);
    if (i !== -1) return { module: m, lecon: m.lecons[i], index: i };
  }
  return null;
}

function leconSuivante(id) {
  const toutes = MODULES.flatMap(m => m.lecons);
  const i = toutes.findIndex(l => l.id === id);
  return (i !== -1 && i + 1 < toutes.length) ? toutes[i + 1] : null;
}
function leconPrecedente(id) {
  const toutes = MODULES.flatMap(m => m.lecons);
  const i = toutes.findIndex(l => l.id === id);
  return (i > 0) ? toutes[i - 1] : null;
}

function echapper(t) {
  return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Compte les exercices faits / total pour un ensemble de leçons
function compter(lecons) {
  let total = 0, faits = 0;
  for (const l of lecons) {
    const exos = exercicesDe(l);
    if (exos.length === 0) { total += 1; if (progression.faits[l.id]) faits += 1; }
    else { total += exos.length; exos.forEach((_, j) => { if (exoFait(l.id, j) || progression.faits[l.id]) faits += 1; }); }
  }
  return { total, faits, pct: total ? Math.round(faits / total * 100) : 0 };
}

// ---- Barre latérale ----
let modulesOuverts = {};
let derniereActive = null;

// Le sommaire est construit avec de vrais éléments interactifs : un <button>
// par module, un <a href="#id"> par leçon. C'est ce qui le rend atteignable au
// clavier — et en prime l'historique du navigateur et l'ouverture en nouvel
// onglet fonctionnent, ce qu'un div + onclick ne donne jamais.
function rendreSidebar(idActive) {
  const nav = document.getElementById('nav-modules');
  nav.innerHTML = '';

  // Arriver sur une leçon déplie son module. Mais une fois qu'on y est, le
  // repli manuel doit tenir : un bouton qui annonce « ouvert » et refuse de se
  // fermer est pire qu'un div, il promet quelque chose qu'il ne fait pas.
  if (idActive !== derniereActive) {
    derniereActive = idActive;
    const mod = MODULES.find(m => m.lecons.some(l => l.id === idActive));
    if (mod) modulesOuverts[mod.id] = true;
  }

  for (const m of MODULES) {
    const faites = m.lecons.filter(l => progression.faits[l.id]).length;
    const ouvert = !!modulesOuverts[m.id];

    const titre = document.createElement('button');
    titre.type = 'button';
    titre.className = 'module-titre' + (ouvert ? ' ouvert' : '');
    titre.setAttribute('aria-expanded', ouvert ? 'true' : 'false');
    titre.setAttribute('aria-controls', 'module-' + m.id);
    titre.style.setProperty('--teinte', m.teinte);
    titre.innerHTML =
      '<span class="module-puce" aria-hidden="true">' + m.icone + '</span>' +
      '<span class="module-nom">' + m.titre.split('—')[0].trim() + '</span>' +
      '<span class="module-pastille' + (faites === m.lecons.length ? ' fini' : '') + '">' +
      faites + '/' + m.lecons.length +
      '<span class="hors-ecran"> leçons terminées</span></span>' +
      '<span class="fleche" aria-hidden="true">▶</span>';
    titre.onclick = () => { modulesOuverts[m.id] = !ouvert; rendreSidebar(idActive); };
    nav.appendChild(titre);

    const liste = document.createElement('div');
    liste.id = 'module-' + m.id;
    liste.className = 'module-lecons' + (ouvert ? ' ouvert' : '');
    m.lecons.forEach((l, i) => {
      const el = document.createElement('a');
      el.className = 'nav-lecon' + (l.id === idActive ? ' active' : '');
      el.href = '#' + l.id;
      if (l.id === idActive) el.setAttribute('aria-current', 'page');
      const fait = progression.faits[l.id];
      const nbExos = exercicesDe(l).length;
      const nbFaits = exercicesDe(l).filter((_, j) => exoFait(l.id, j)).length;
      const detail = nbExos > 0 && !fait && nbFaits > 0 ? ' <span class="detail">(' + nbFaits + '/' + nbExos + ')</span>' : '';
      el.innerHTML = '<span class="coche' + (fait ? ' fait' : '') + '" aria-hidden="true">' +
        (fait ? '✔' : (i + 1) + '.') + '</span>' +
        '<span>' + l.titre + detail + (fait ? '<span class="hors-ecran"> — terminée</span>' : '') + '</span>';
      // Le lien navigue tout seul : le hash change, hashchange rend la leçon.
      el.onclick = fermerNavMobile;
      liste.appendChild(el);
    });
    nav.appendChild(liste);
  }

  // Progression globale (comptée en exercices, plus fine que « leçons lues »)
  const { total, faits, pct } = compter(MODULES.flatMap(m => m.lecons));
  document.getElementById('progression-globale').innerHTML =
    '<div class="prog-ligne"><span>' + faits + ' / ' + total + ' exercices</span><span class="prog-pct">' + pct + '%</span></div>' +
    '<div class="barre-prog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + pct + '"' +
    ' aria-label="Progression du cours : ' + faits + (faits > 1 ? ' exercices réussis' : ' exercice réussi') + ' sur ' + total + '">' +
    '<div style="transform:scaleX(' + (pct / 100) + ')"></div></div>';

  majRepereModule(idActive);
  majBoutonsTheme();
}

// Fenêtre étroite : la liste des leçons est repliée, donc plus rien ne dit où
// on se trouve. Ce repère reste, lui, en permanence dans le bandeau.
function majRepereModule(idActive) {
  const zone = document.getElementById('repere-module');
  if (!zone) return;
  const res = idActive ? trouverLecon(idActive) : null;
  if (!res) { zone.className = 'repere-module'; zone.innerHTML = ''; return; }
  zone.className = 'repere-module actif';
  zone.style.setProperty('--teinte', res.module.teinte);
  zone.innerHTML =
    '<span class="repere-puce" aria-hidden="true">' + res.module.icone + '</span>' +
    '<span class="repere-nom">' + res.module.titre.split('—')[0].trim() + '</span>' +
    '<span class="repere-sep" aria-hidden="true">·</span>' +
    '<span class="repere-pos">leçon ' + (res.index + 1) + '/' + res.module.lecons.length + '</span>';
}

/* Changer de vue, c'est changer de page. Sans ces trois gestes, valider
   « leçon suivante » ne produit AUCUN retour : le focus retombe sur <body>,
   l'onglet garde le même titre pour les 165 leçons, et rien n'est annoncé. */
const TITRE_APP = 'Apprendre à coder — de A à Z';

function poserVue(titre, annonce) {
  document.title = titre ? titre + ' — Apprendre à coder' : TITRE_APP;
  const zone = document.getElementById('annonce-vue');
  if (zone) {
    zone.textContent = '';
    setTimeout(() => { if (zone.isConnected) zone.textContent = annonce || titre || TITRE_APP; }, 60);
  }
  // Le focus repart du titre de la page, pas du tout début du document.
  const h1 = document.querySelector('#contenu h1');
  if (h1) {
    h1.setAttribute('tabindex', '-1');
    h1.focus({ preventScroll: true });
  }
}

// ---- Navigation ----
function fermerNavMobile() {
  document.body.classList.remove('nav-ouverte');
  const b = document.getElementById('btn-sommaire');
  if (b) b.setAttribute('aria-expanded', 'false');
}

// Sur fenêtre étroite, le sommaire se replie derrière son propre bouton.
// Le logo, lui, ne fait plus qu'une chose : ramener à l'accueil.
function basculerSommaire() {
  const ouverte = document.body.classList.toggle('nav-ouverte');
  const b = document.getElementById('btn-sommaire');
  if (b) b.setAttribute('aria-expanded', ouverte ? 'true' : 'false');
}

function allerAccueil() {
  location.hash = '';
  fermerNavMobile();
  rendreAccueil();
}
function allerLecon(id) {
  location.hash = id;
  fermerNavMobile();
  rendreLecon(id);
}
function allerMemos(onglet) {
  location.hash = 'memos';
  fermerNavMobile();
  rendreMemos(onglet || 'html');
}
function allerRevision() {
  location.hash = 'reviser';
  fermerNavMobile();
  rendreRevision();
}

// Garde-fou : la navigation directe (allerLecon...) rend déjà la vue ;
// hashchange ne re-rend que si la vue affichée est différente (boutons précédent/suivant du navigateur)
let vueCourante = null;
window.addEventListener('hashchange', () => {
  const h = location.hash.replace('#', '');
  const cible = h || 'accueil';
  if (cible === vueCourante) return;
  if (!h) rendreAccueil();
  else if (h === 'memos') rendreMemos('html');
  else if (h === 'reviser') rendreRevision();
  else if (h === 'atelier') rendreBac();
  else if (trouverLecon(h)) rendreLecon(h);
});

/* ---- Page « Réviser » --------------------------------------------------
   Le cours ne ramenait jamais en arrière : une fois l'exercice coché, on ne
   le revoyait plus. Or ce qu'on a arraché en six essais, on ne le sait pas
   pour autant — on l'a franchi. Cette page repropose ce qui a coûté cher et
   ce qui remonte à loin, sans rien effacer de la progression. */
function rendreRevision() {
  vueCourante = 'reviser';
  rendreSidebar(null);
  const choix = aReviser(8);

  let html = '<h1>Réviser</h1>';

  if (!choix.length) {
    html += '<p class="revision-vide">Rien à revoir pour l\'instant : il faut d\'abord réussir ' +
      'quelques exercices. Reviens ici quand tu en auras quelques-uns derrière toi — ' +
      'cette page te reproposera ceux qui t\'ont donné du fil à retordre.</p>';
  } else {
    html += '<p class="revision-intro">Ces exercices sont déjà réussis. Ils reviennent ici parce ' +
      'qu\'ils t\'ont coûté des essais, ou qu\'ils commencent à dater — et c\'est exactement ce ' +
      'qu\'on oublie en premier. Les refaire ne touche pas à ta progression.</p>' +
      '<div class="revision-liste">';

    for (const r of choix) {
      const g = GENRES[genreDe(r.ex)];
      const raisons = [];
      if (r.essais >= 1) raisons.push(r.essais === 1 ? '1 essai raté' : r.essais + ' essais ratés');
      if (r.jours >= 7) raisons.push(r.jours >= 999 ? 'de longue date' : 'il y a ' + r.jours + ' jours');
      if (!raisons.length) raisons.push('pour entretenir');
      // Deux exercices d'une même leçon portent le même titre : sans son
      // numéro, on ne sait pas lequel des deux la carte propose.
      const combien = exercicesDe(r.lecon).length;
      const rang = combien > 1 ? ' <span class="revision-rang">n° ' + (r.i + 1) + '</span>' : '';

      html += '<button type="button" class="revision-carte" style="--teinte:' + r.mod.teinte + '"' +
        ' onclick="allerLeconExo(\'' + r.lecon.id + '\', ' + r.i + ')">' +
        '<span class="revision-puce" aria-hidden="true">' + r.mod.icone + '</span>' +
        '<span class="revision-corps">' +
        '<span class="revision-titre">' + echapper(r.lecon.titre) + rang + '</span>' +
        '<span class="revision-detail">' + g.icone + ' ' + g.mot + ' · ' + echapper(raisons.join(' · ')) + '</span>' +
        '</span></button>';
    }
    html += '</div>';
  }

  document.getElementById('contenu').className = '';
  document.body.classList.remove('plein-ecran');
  document.getElementById('contenu').innerHTML = html;
  window.scrollTo(0, 0);
  poserVue('Réviser', choix.length
    ? 'Réviser — ' + choix.length + ' exercice' + (choix.length > 1 ? 's' : '') + ' à revoir'
    : 'Réviser — rien à revoir pour l\'instant');
}

// Ouvrir une leçon directement sur l'un de ses exercices.
function allerLeconExo(id, i) {
  allerLecon(id);
  setTimeout(() => allerExercice(i), 0);
}

// ---- Page d'accueil ----
function rendreAccueil() {
  vueCourante = 'accueil';
  rendreSidebar(null);
  const toutes = MODULES.flatMap(m => m.lecons);
  const premiere = toutes.find(l => !progression.faits[l.id]) || toutes[0];
  const global = compter(toutes);
  const dejaCommence = global.faits > 0;

  let html = '<div class="accueil-hero">' +
    '<h1>Apprendre à coder, de A à Z</h1>' +
    '<p>Pars de zéro et va jusqu\'à tes propres applications. Chaque notion s\'apprend en l\'écrivant : ' +
    'tu tapes du vrai code, le logiciel le corrige et t\'explique ce qui cloche. Hors ligne, à ton rythme.</p>' +
    '<button class="btn" onclick="allerLecon(\'' + premiere.id + '\')">' +
    (dejaCommence ? '▶ Reprendre — ' + premiere.titre : '▶ Commencer la première leçon') + '</button>' +
    '<div class="hero-chiffres">' +
    '<span><b>' + toutes.length + '</b> leçons</span>' +
    '<span><b>' + global.total + '</b> exercices corrigés</span>' +
    '<span><b>' + MODULES.length + '</b> modules</span>' +
    (dejaCommence ? '<span><b>' + global.pct + '%</b> parcourus</span>' : '<span>Aucune installation, aucune connexion</span>') +
    '</div>' +
    '</div>';

  html += '<h2 class="parcours-titre">Ton parcours</h2>' +
    '<p class="parcours-sous">Les modules se suivent : chacun s\'appuie sur le précédent. Tu peux aussi piocher où tu veux.</p>' +
    '<div class="parcours">';

  const idModuleEnCours = (trouverLecon(premiere.id) || {}).module;
  for (const m of MODULES) {
    const faites = m.lecons.filter(l => progression.faits[l.id]).length;
    const c = compter(m.lecons);
    const fini = faites === m.lecons.length;
    const enCours = !fini && idModuleEnCours && idModuleEnCours.id === m.id;
    const etat = fini ? 'Terminé' : (enCours ? 'En cours' : (c.faits > 0 ? 'Commencé' : 'À venir'));
    html += '<div class="etape-module' + (fini ? ' finie' : '') + (enCours ? ' encours' : '') + '"' +
      ' style="--teinte:' + m.teinte + '" onclick="allerLecon(\'' + m.lecons[0].id + '\')">' +
      '<div class="etape-puce">' + m.icone + '</div>' +
      '<div class="etape-corps">' +
      '<div class="etape-nom">' + m.titre + '</div>' +
      '<div class="etape-desc">' + m.desc + '</div>' +
      '<div class="etape-mesure">' +
      '<div class="barre-prog"><div style="transform:scaleX(' + (c.pct / 100) + ')"></div></div>' +
      '<span class="chiffres">' + faites + '/' + m.lecons.length + ' leçons · ' + c.total + ' exercices</span>' +
      '</div></div>' +
      '<div class="etape-etat">' + etat + '</div>' +
      '</div>';
  }
  html += '</div>';

  document.getElementById('contenu').className = '';
  document.body.classList.remove('plein-ecran');
  document.getElementById('contenu').innerHTML = html;
  window.scrollTo(0, 0);
  poserVue('', 'Accueil — ton parcours, ' + global.faits + (global.faits > 1 ? ' exercices réussis' : ' exercice réussi') + ' sur ' + global.total);
}

// ---- Page de leçon ----
let leconCourante = null;

// Un exercice peut imposer les dimensions de son aperçu (utile quand la leçon
// porte justement sur la largeur de l'écran : media queries, responsive…)
function styleApercu(ex) {
  let s = '';
  if (ex.hauteur) s += 'height:' + ex.hauteur + 'px;';
  if (ex.largeur) s += 'width:' + ex.largeur + 'px;max-width:100%;';
  return s ? ' style="' + s + '"' : '';
}

// Verdict, indice et solution : trois marches distinctes, chacune à sa place,
// qui s'empilent. Demander de l'aide ne doit jamais RETIRER de l'écran ce
// qu'on était en train de lire.
function blocsJugement(i, ex) {
  return '<div id="feedback-' + i + '" class="feedback" role="status"></div>' +
    '<div id="indice-' + i + '" class="indice-bloc" role="status"></div>' +
    (ex.type !== 'qcm'
      ? '<div id="zone-solution-' + i + '" class="zone-solution" tabindex="-1">' +
        '<div class="etiquette-zone">Solution</div>' +
        '<pre class="bloc-code">' + echapper(ex.solution) + '</pre></div>'
      : '');
}

function rendreExercice(lecon, ex, i, total) {
  const fait = exoFait(lecon.id, i);
  // L'étiquette suivait la POSITION : le troisième exercice s'appelait « Défi »
  // même quand c'était une chasse au bug. Elle suit maintenant le genre réel.
  const genre = GENRES[genreDe(ex)];
  const etiquette = ex.etiquette || (total === 1 ? '✏️ À toi de jouer !'
    : '<span class="etiquette-genre" title="' + echapperAttr(genre.aide) + '">' +
      genre.icone + ' ' + genre.mot + '</span> ' + (i + 1) + '/' + total);
  // Nom parlé de l'exercice : sans emoji, et distinct des autres cartes de la
  // page — trois éditeurs nommés « Éditeur de code » sont trois inconnus.
  const nomExo = total === 1 ? 'l\'exercice' : 'l\'exercice ' + (i + 1) + ' sur ' + total;
  // L'exercice est un titre de niveau 2 : c'est l'objet de la page, il doit
  // exister dans le plan du document (h1 leçon › h2 exercice › h3 résultat).
  let html = '<div class="exercice" id="exercice-' + i + '">' +
    '<h2 class="exercice-entete">' + etiquette + (fait ? '<span class="badge-fait">✔ réussi</span>' : '') + '</h2>' +
    '<div class="exercice-corps">' +
    '<div class="consigne" id="consigne-' + i + '">' + ex.consigne + '</div>';

  if (ex.type === 'qcm') {
    html += '<div class="qcm" role="radiogroup" aria-labelledby="consigne-' + i + '">';
    ex.choix.forEach((c, j) => {
      html += '<label class="qcm-choix"><input type="radio" name="qcm-' + i + '" value="' + j + '"> <span>' + c + '</span></label>';
    });
    html += '</div>' +
      '<div class="exercice-boutons">' +
      '<button class="btn btn-verifier" onclick="verifier(' + i + ')">✓ Vérifier ma réponse</button>' +
      '</div>' +
      '<div class="exercice-boutons exercice-recours">' + contenuRecours(i, ex, 0) + '</div>' +
      // Pas de colonne de sortie pour un QCM : le jugement reste sous les choix.
      blocsJugement(i, ex);
  } else {
    const codeSauve = chargerCode(lecon.id, i);
    const console_ = LANGAGES_CONSOLE.indexOf(ex.type) !== -1;
    const langue = NOM_LANGAGE[ex.type] || 'HTML';
    if (ex.type === 'sql') html += panneauTables(ex.tables);
    // Le code à gauche, ce qu'il produit à droite : on voit les deux d'un coup
    // au lieu de faire l'aller-retour en défilant.
    html += '<div class="exercice-atelier">' +
      '<div class="exercice-code">' +
      '<div class="editeur-cadre">' +
      '<div class="editeur-barre">' +
      '<span class="editeur-langue">' + langue + '</span>' +
      '<span>Ton code</span>' +
      // role="status" : le texte change quand Échap relâche la capture, et ce
      // changement est la seule chose qui dit qu'on peut sortir.
      '<span class="editeur-astuce" id="astuce-' + i + '" role="status"></span>' +
      '</div>' +
      '<div class="editeur-zone">' +
      '<div class="editeur-lignes" id="lignes-' + i + '" aria-hidden="true"></div>' +
      // rows fixe la hauteur AVANT que le moindre script ne mesure quoi que ce
      // soit : le premier affichage est déjà à la bonne taille, l'ajustement
      // qui suit ne bouge plus rien.
      '<textarea id="editeur-' + i + '" class="editeur" spellcheck="false"' +
      ' rows="' + Math.max(12, String(codeSauve !== null ? codeSauve : ex.codeDepart).split('\n').length) + '"' +
      ' aria-label="Ton code ' + langue + ' pour ' + nomExo + '"' +
      ' aria-describedby="consigne-' + i + '">' +
      echapper(codeSauve !== null ? codeSauve : ex.codeDepart) + '</textarea>' +
      '</div></div>' +
      // Au départ, une seule décision : vérifier. « Exécuter » ne reste que
      // là où l'aperçu est la récompense (HTML et CSS) ; ailleurs « Vérifier »
      // exécute déjà le code avant de juger, le bouton faisait strictement
      // moins. Les recours, eux, apparaissent au fil des essais.
      '<div class="exercice-boutons">' +
      (ex.type === 'html' ? '<button class="btn btn-executer" onclick="executer(' + i + ')">▶ Exécuter</button>' : '') +
      '<button class="btn btn-verifier" onclick="verifier(' + i + ')">✓ Vérifier ma réponse</button>' +
      '</div>' +
      '<div class="exercice-boutons exercice-recours">' + contenuRecours(i, ex, 0) + '</div>' +
      '</div>' +
      // Les zones de résultat sont des zones vivantes : sans role="status", un
      // lecteur d'écran entend le verdict mais jamais ce que le code a produit.
      '<div class="exercice-sortie">' +
      // Le titre porte le numéro de l'exercice : sans lui, la navigation par
      // titres annonçait trois fois « Aperçu de ta page » sans les distinguer.
      '<div class="zone-resultat"><h3>' +
      (ex.type === 'sql' ? 'Résultat de ta requête' : (console_ ? 'Ce que ton code affiche' : 'Aperçu de ta page')) +
      (total > 1 ? '<span class="hors-ecran"> — exercice ' + (i + 1) + ' sur ' + total + '</span>' : '') + '</h3>' +
      (ex.type === 'sql'
        ? '<div id="resultat-sql-' + i + '" class="sql-resultat" role="status"><span class="vide">Clique sur « Vérifier ma réponse » : ta requête sera lancée et le résultat s\'affichera ici.</span></div>'
        : console_
          ? '<div id="console-sortie-' + i + '" class="console-sortie" role="status"><span class="vide">Clique sur « Vérifier ma réponse » : ton code sera exécuté et ce qu\'il affiche apparaîtra ici.</span></div>'
          : '<iframe id="apercu-' + i + '" class="apercu" title="Aperçu de ta page pour ' + nomExo + '"' + styleApercu(ex) + '></iframe>' +
            '<p id="apercu-etat-' + i + '" class="hors-ecran" role="status"></p>') +
      '</div>' +
      // Le jugement est DANS le panneau de droite, avec ce que le code a
      // produit. C'est la règle du côte-à-côte appliquée jusqu'au bout : le
      // verdict est un résultat d'exécution, pas une note en bas de page.
      // Rangé sous l'éditeur, il naissait hors de l'écran sans rien faire
      // défiler — demander de l'aide ressemblait à une panne.
      blocsJugement(i, ex) +
      '</div></div>';
  }

  html += '</div></div>';
  return html;
}

/* LE PORTE-OUTILS
   Sur un établi, les outils sont sur le plan de travail, pas dans une autre
   pièce. Ce panneau occupe le tiers droit resté vide pendant toute la prose :
   il dit où on en est, ce qui attend, et il y emmène d'un clic. C'est aussi
   le seul repère qui survit quand on a défilé loin du fil d'Ariane. */
function panneauEtabli(mod, lecon, index, exos) {
  const faits = exos.filter((_, i) => exoFait(lecon.id, i)).length;
  const etiquettes = ['💪 Exercice', '🏋️ Entraînement', '🎯 Défi', '🚩 Bonus'];

  let liste = '';
  exos.forEach((ex, i) => {
    const fait = exoFait(lecon.id, i);
    const nom = ex.etiquette || (exos.length === 1 ? '✏️ À toi de jouer !' : etiquettes[Math.min(i, 3)] + ' ' + (i + 1) + '/' + exos.length);
    liste += '<li class="etabli-exo' + (fait ? ' fait' : '') + '">' +
      '<a href="#exercice-' + i + '" onclick="allerExercice(' + i + '); return false;">' +
      '<span class="etabli-coche" aria-hidden="true">' + (fait ? '✔' : '○') + '</span>' +
      '<span class="etabli-nom">' + nom + '</span>' +
      '<span class="hors-ecran">' + (fait ? ' — réussi' : ' — à faire') + '</span>' +
      '</a></li>';
  });

  const suivante = leconSuivante(lecon.id);

  return '<aside class="etabli" style="--teinte:' + mod.teinte + '" aria-labelledby="etabli-titre">' +
    '<div class="etabli-module">' +
    '<span class="etabli-puce" aria-hidden="true">' + mod.icone + '</span>' +
    '<span>' + mod.titre.split('—')[0].trim() + ' · leçon ' + (index + 1) + '/' + mod.lecons.length + '</span>' +
    '</div>' +
    (exos.length
      ? '<h2 class="etabli-titre" id="etabli-titre">' +
        (exos.length > 1 ? 'Les ' + exos.length + ' exercices' : 'L\'exercice') +
        '<span class="etabli-compte">' + faits + '/' + exos.length + '</span></h2>' +
        '<ol class="etabli-exos">' + liste + '</ol>'
      : '<h2 class="etabli-titre" id="etabli-titre">Leçon de lecture</h2>' +
        '<p class="etabli-vide">Pas d\'exercice ici : celle-ci se lit. Prends ton temps.</p>') +
    (suivante ? '<a class="etabli-suite" href="#' + suivante.id + '">Ensuite : ' + suivante.titre + ' →</a>' : '') +
    '</aside>';
}

/* LE REÇU
   Finir une leçon ne donnait rien : une seconde de confetti, puis le dernier
   élément durable de la page était « ↺ Remettre à zéro ». C'est le moment où
   se décide si l'on fera la leçon suivante — il mérite mieux qu'un bouton
   d'annulation. Le reçu nomme ce qu'on sait faire maintenant, en reprenant
   les phrases de réussite écrites à la main pour chaque exercice. */
function recuLecon(mod, lecon, index, exos) {
  if (!exos.length || !progression.faits[lecon.id]) return '';

  const acquis = exos.map((_, i) => acquisDe(lecon.id, i)).filter(Boolean);
  const suivante = leconSuivante(lecon.id);
  const faitesDuModule = mod.lecons.filter(l => progression.faits[l.id]).length;
  const moduleFini = faitesDuModule === mod.lecons.length;

  let html = '<section class="recu" style="--teinte:' + mod.teinte + '" aria-labelledby="recu-titre">' +
    '<h2 class="recu-titre" id="recu-titre">' +
    '<span class="recu-sceau" aria-hidden="true">' + (moduleFini ? '🏁' : '✔') + '</span>' +
    'Leçon terminée</h2>' +
    '<p class="recu-position">' + echapper(mod.titre.split('—')[0].trim()) + ' · ' +
    (index + 1) + '<span aria-hidden="true">/</span><span class="hors-ecran"> sur </span>' +
    mod.lecons.length + ' — <strong>' + faitesDuModule + '</strong> ' +
    (faitesDuModule > 1 ? 'leçons faites' : 'leçon faite') + ' dans ce module.</p>';

  if (acquis.length) {
    html += '<p class="recu-intro">Ce que tu sais faire maintenant :</p><ul class="recu-acquis">';
    for (const a of acquis) html += '<li>' + a + '</li>';
    html += '</ul>';
  }

  if (moduleFini) {
    html += '<p class="recu-module">Et tu viens de <strong>boucler le module ' +
      echapper(mod.titre.split('—')[0].trim()) + '</strong> en entier.</p>';
  }

  html += '<div class="recu-suite">' +
    (suivante
      ? '<a class="btn btn-suivant" href="#' + suivante.id + '"><span>' + suivante.titre + '</span>&nbsp;→</a>' +
        '<span class="recu-plus-tard">ou reviens plus tard : ta progression est gardée.</span>'
      : '<a class="btn btn-suivant" href="#" onclick="allerAccueil(); return false;">Revoir ton parcours&nbsp;→</a>') +
    '</div></section>';
  return html;
}

// Le reçu apparaît au moment où la leçon se boucle, sans re-rendre la page :
// re-rendre remonterait en haut et effacerait ce qu'on vient de faire.
function majRecuLecon() {
  if (!leconCourante) return;
  const res = trouverLecon(leconCourante.id);
  const ancre = document.getElementById('recu-ancre');
  if (!res || !ancre) return;
  ancre.innerHTML = recuLecon(res.module, res.lecon, res.index, exercicesDe(res.lecon));
}

// Sauter à un exercice sans passer par le hash (le hash appartient aux leçons).
function allerExercice(i) {
  const carte = document.getElementById('exercice-' + i);
  if (!carte) return;
  carte.scrollIntoView({ block: 'start', behavior: 'smooth' });
  const cible = document.getElementById('editeur-' + i) || carte.querySelector('input[type="radio"]');
  if (!cible) return;
  // Le focus est posé SANS preventScroll : c'est le filet de sécurité. Si le
  // défilement doux n'aboutit pas (préférence de mouvement réduit, onglet en
  // arrière-plan), c'est lui qui garantit qu'on arrive bien à l'exercice.
  setTimeout(() => {
    cible.focus();
    if (carte.getBoundingClientRect().top < -4) carte.scrollIntoView({ block: 'start' });
  }, 420);
}

// L'état des exercices change sans re-rendre la page : le porte-outils suit.
function majEtabli() {
  const zone = document.querySelector('.etabli');
  if (!zone || !leconCourante) return;
  const res = trouverLecon(leconCourante.id);
  if (!res) return;
  const neuf = document.createElement('div');
  neuf.innerHTML = panneauEtabli(res.module, res.lecon, res.index, exercicesDe(res.lecon));
  zone.replaceWith(neuf.firstElementChild);
}

function rendreLecon(id) {
  const res = trouverLecon(id);
  if (!res) return rendreAccueil();
  const { module: mod, lecon, index } = res;
  vueCourante = id;
  leconCourante = lecon;
  progression.derniere = id;
  sauverProgression();
  rendreSidebar(id);

  const exos = exercicesDe(lecon);

  // Un vrai fil d'Ariane : des liens, pas des étiquettes. C'est le seul chemin
  // visible depuis une leçon vers le parcours et vers le début du module.
  let html = '<nav class="fil-ariane" aria-label="Fil d\'Ariane" style="--teinte:' + mod.teinte + '">' +
    '<a href="#" onclick="allerAccueil(); return false;">Le parcours</a>' +
    '<span class="sep" aria-hidden="true">›</span>' +
    '<a href="#' + mod.lecons[0].id + '"><span class="puce-module" aria-hidden="true">' + mod.icone + '</span>' + mod.titre + '</a>' +
    '<span class="sep" aria-hidden="true">›</span>' +
    '<span aria-current="page">Leçon ' + (index + 1) + ' sur ' + mod.lecons.length + '</span>' +
    '</nav>' +
    '<h1 class="titre-lecon">' + lecon.titre + '</h1>' +
    // La prose reste étroite, mais le tiers de page à sa droite n'a plus à
    // rester vide : c'est le porte-outils de l'établi. Il dit où on en est,
    // ce qui attend, et permet d'y sauter sans traverser 1 500 px de cours.
    '<div class="lecon-haut">' +
    '<div class="contenu-lecon">' + lecon.contenu + '</div>' +
    panneauEtabli(mod, lecon, index, exos) +
    '</div>';

  exos.forEach((ex, i) => { html += rendreExercice(lecon, ex, i, exos.length); });

  if (exos.length) {
    html += '<div id="recommencer-lecon" class="recommencer-lecon"' +
      (leconEntamee(lecon) ? '' : ' style="display:none"') + '>' +
      '<button class="btn btn-secondaire btn-mini" onclick="recommencerLecon()" ' +
      'title="Efface ton code et tes réussites sur cette leçon, pour la refaire depuis le début">' +
      '↺ Remettre ' + (exos.length > 1 ? 'les exercices' : 'l\'exercice') + ' à zéro</button>' +
      '</div>';
  }

  // Le reçu vient APRÈS la remise à zéro : c'est lui qui doit être la dernière
  // chose qu'on lit en finissant, pas un bouton d'annulation.
  html += '<div id="recu-ancre">' + recuLecon(mod, lecon, index, exos) + '</div>';

  if (exos.length === 0 && progression.faits[id] === undefined) {
    // Leçon sans exercice : marquée comme lue automatiquement
    progression.faits[id] = true;
    sauverProgression();
    rendreSidebar(id);
  }

  // Pied de page : navigation
  const prec = leconPrecedente(id);
  const suiv = leconSuivante(id);
  html += '<div class="pied-lecon">' +
    (prec ? '<button class="btn btn-secondaire" onclick="allerLecon(\'' + prec.id + '\')">←&nbsp;<span>' + prec.titre + '</span></button>' : '<span></span>') +
    (suiv ? '<button class="btn ' + (exos.length > 0 && !progression.faits[id] ? 'btn-secondaire' : 'btn-suivant') + '" id="btn-suivant" onclick="allerLecon(\'' + suiv.id + '\')"><span>' + suiv.titre + '</span>&nbsp;→</button>' : '<span></span>') +
    '</div>';

  document.getElementById('contenu').className = '';
  document.body.classList.remove('plein-ecran');
  document.getElementById('contenu').innerHTML = html;
  window.scrollTo(0, 0);
  poserVue(lecon.titre, 'Leçon ' + (index + 1) + ' sur ' + mod.lecons.length + ' — ' + lecon.titre);

  // Éditeurs : tabulation, numéros de ligne, sauvegarde, premier aperçu
  exos.forEach((ex, i) => {
    const editeur = document.getElementById('editeur-' + i);
    if (!editeur) return;
    // En Python l'indentation officielle fait 4 espaces ; 2 ailleurs.
    const pas = ['py', 'c', 'java'].indexOf(ex.type) !== -1 ? '    ' : '  ';
    brancherClavierEditeur(editeur, pas, 'astuce-' + i, () => majLignes(i), () => verifier(i));
    editeur.addEventListener('input', function () {
      sauverCode(id, i, this.value); majLignes(i); revelerRecommencerLecon();
    });
    editeur.addEventListener('scroll', function () {
      const g = document.getElementById('lignes-' + i);
      if (g) g.scrollTop = this.scrollTop;
    });
    // Dans une chasse au bug, l'éditeur ne souligne rien : la faute à trouver
    // est le sujet même de l'exercice.
    attacherEditeur(editeur, ex.type, { sansFautes: genreDe(ex) === 'bug' });
    majLignes(i);
    if (ex.type === 'html') executer(i);
  });

  ajouterBoutonsCopie();
  envelopperTableaux();
}

/* =========================================================================
   LE CLAVIER DANS UN ÉDITEUR
   Tab sert à indenter — c'est ce qu'on veut quand on écrit du code. Mais un
   Tab qui n'a AUCUNE échappatoire est un piège au clavier : on entre dans
   l'éditeur et on n'en sort plus (WCAG 2.1.2). Échap relâche donc la capture
   le temps d'un Tab, la frappe suivante la rétablit, et l'astuce de la barre
   dit toujours dans quel état on est.
   ========================================================================= */

// Écrire par execCommand plutôt que par .value : toucher .value efface tout
// l'historique d'annulation, et Ctrl+Z cesserait de marcher.
function indenterEditeur(zone, pas) {
  if (document.execCommand && document.execCommand('insertText', false, pas)) return;
  const d = zone.selectionStart;
  zone.value = zone.value.slice(0, d) + pas + zone.value.slice(zone.selectionEnd);
  zone.selectionStart = zone.selectionEnd = d + pas.length;
}

function desindenterEditeur(zone, pas) {
  const d = zone.selectionStart;
  const debutLigne = zone.value.lastIndexOf('\n', d - 1) + 1;
  const blancs = /^[ \t]+/.exec(zone.value.slice(debutLigne, d));
  if (!blancs) return;
  const n = Math.min(pas.length, blancs[0].length);
  zone.selectionStart = debutLigne;
  zone.selectionEnd = debutLigne + n;
  if (document.execCommand && document.execCommand('delete')) return;
  zone.value = zone.value.slice(0, debutLigne) + zone.value.slice(debutLigne + n);
  zone.selectionStart = zone.selectionEnd = Math.max(debutLigne, d - n);
}

function brancherClavierEditeur(zone, pas, idAstuce, rafraichir, valider) {
  const astuce = idAstuce ? document.getElementById(idAstuce) : null;
  const motValider = valider ? (zone.classList.contains('editeur-atelier') ? 'lance' : 'vérifie') : null;
  let capture = true;

  function direEtat() {
    if (!astuce) return;
    astuce.textContent = capture
      ? 'Tab indente · Échap sort' + (motValider ? ' · Ctrl+Entrée ' + motValider : '')
      : 'Tab quitte l\'éditeur';
  }

  zone.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!capture) return;
      e.preventDefault();
      capture = false;
      direEtat();
      return;
    }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      if (valider) valider();
      return;
    }
    if (e.key !== 'Tab') return;
    if (!capture) {           // capture relâchée : on laisse le focus partir
      capture = true;
      direEtat();
      return;
    }
    e.preventDefault();
    if (e.shiftKey) desindenterEditeur(zone, pas);
    else indenterEditeur(zone, pas);
    rafraichir();
  });

  // Se remettre à taper, c'est se remettre à écrire du code : Tab réindente.
  zone.addEventListener('input', function () {
    if (!capture) { capture = true; direEtat(); }
  });

  direEtat();
}

// Numéros de ligne. Le texte revient à la ligne tout seul plutôt que de se
// faire couper : une ligne de code peut donc occuper plusieurs rangées à
// l'écran, et son numéro doit s'étirer d'autant. On mesure avec un calque
// invisible qui a exactement la même typographie et la même largeur.
let miroirLignes = null;

function majLignes(i) {
  const editeur = document.getElementById('editeur-' + i);
  const gouttiere = document.getElementById('lignes-' + i);
  if (!editeur || !gouttiere) return;
  const lignes = editeur.value.split('\n');

  if (gouttiere.childElementCount !== lignes.length) {
    let html = '';
    for (let k = 1; k <= lignes.length; k++) html += '<span>' + k + '</span>';
    gouttiere.innerHTML = html;
  }
  ajusterHauteurEditeur(editeur);
  etirerNumeros(editeur, gouttiere, lignes);
  if (editeur.repeindre) editeur.repeindre();
}

// Dans une leçon, l'éditeur grandit avec le code plutôt que de faire défiler
// dans une petite fenêtre. Dans l'atelier il remplit déjà son volet.
function ajusterHauteurEditeur(editeur) {
  if (editeur.classList.contains('editeur-atelier')) return;
  editeur.style.height = 'auto';
  editeur.style.height = Math.min(Math.max(editeur.scrollHeight, 280), 640) + 'px';
}

function etirerNumeros(editeur, gouttiere, lignes) {
  const style = getComputedStyle(editeur);
  const large = editeur.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
  if (!(large > 0)) return;

  if (!miroirLignes) {
    miroirLignes = document.createElement('div');
    miroirLignes.setAttribute('aria-hidden', 'true');
    miroirLignes.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden;white-space:pre-wrap';
    document.body.appendChild(miroirLignes);
  }
  const m = miroirLignes.style;
  m.width = large + 'px';
  m.fontFamily = style.fontFamily;
  m.fontSize = style.fontSize;
  m.lineHeight = style.lineHeight;
  m.letterSpacing = style.letterSpacing;
  m.tabSize = style.tabSize;
  m.overflowWrap = style.overflowWrap;
  m.wordBreak = style.wordBreak;

  // Un seul passage de mise en page pour toutes les lignes, puis une lecture.
  let html = '';
  for (const l of lignes) html += '<div>' + echapper(l || ' ') + '</div>';
  miroirLignes.innerHTML = html;
  // Hauteurs fractionnaires : arrondir à l'entier ferait dériver la
  // numérotation de quelques pixels au bout de plusieurs dizaines de lignes.
  for (let k = 0; k < lignes.length; k++) {
    gouttiere.children[k].style.height = miroirLignes.children[k].getBoundingClientRect().height + 'px';
  }
}

// Les tableaux de référence défilent dans leur propre cadre sur petit écran
function envelopperTableaux() {
  document.querySelectorAll('.memo-table').forEach(t => {
    if (t.parentElement && t.parentElement.classList.contains('table-defilante')) return;
    const cadre = document.createElement('div');
    cadre.className = 'table-defilante';
    t.parentNode.insertBefore(cadre, t);
    cadre.appendChild(t);
  });
}

// Bouton « Copier » sur chaque bloc de code de la page
function ajouterBoutonsCopie() {
  document.querySelectorAll('.bloc-code').forEach(bloc => {
    if (bloc.querySelector('.btn-copier')) return;
    const btn = document.createElement('button');
    btn.className = 'btn-copier';
    btn.type = 'button';
    btn.textContent = 'Copier';
    btn.onclick = e => {
      e.stopPropagation();
      const texte = bloc.textContent.replace(/^Copier|Copié !$/g, '');
      const fini = () => {
        btn.textContent = 'Copié !';
        btn.classList.add('copie');
        setTimeout(() => { btn.textContent = 'Copier'; btn.classList.remove('copie'); }, 1600);
      };
      if (navigator.clipboard) navigator.clipboard.writeText(texte).then(fini, () => {});
      else {
        const z = document.createElement('textarea');
        z.value = texte; document.body.appendChild(z); z.select();
        try { document.execCommand('copy'); fini(); } catch (err) {}
        document.body.removeChild(z);
      }
    };
    bloc.appendChild(btn);
  });
}

// ---- Exécution du code ----
function executer(i) {
  const ex = exercicesDe(leconCourante)[i];
  const code = document.getElementById('editeur-' + i).value;
  if (ex.type === 'sql') {
    const res = executerSQL(code, baseNeuve());
    document.getElementById('resultat-sql-' + i).innerHTML = tableauResultat(res);
  } else if (LANGAGES_CONSOLE.indexOf(ex.type) !== -1) {
    executerCode(ex.type, code, res => afficherConsole(i, res));
  } else {
    const cadre = document.getElementById('apercu-' + i);
    annoncerApercu(i);
    cadre.srcdoc = code;
  }
}

// L'aperçu d'une page est un cadre : son contenu ne s'annonce pas tout seul.
// On dit au moins qu'il vient d'être refait, et où le trouver.
function annoncerApercu(i) {
  const etat = document.getElementById('apercu-etat-' + i);
  if (!etat) return;
  // Vidé d'abord : une zone vivante n'annonce que ce qui change.
  etat.textContent = '';
  setTimeout(function () {
    if (etat.isConnected) etat.textContent = 'Aperçu mis à jour dans le cadre « Aperçu de ta page ».';
  }, 60);
}

// Les messages d'erreur des moteurs C, Java et SQL contiennent du <code> et des
// <br> pour rester lisibles. On échappe tout, puis on ne redonne vie qu'à ces
// deux balises : le message reste formaté sans qu'aucun autre HTML ne passe.
function messageLisible(texte) {
  return echapper(texte)
    .replace(/&lt;code&gt;/g, '<code>')
    .replace(/&lt;\/code&gt;/g, '</code>')
    .replace(/&lt;br&gt;/g, '<br>');
}

function afficherConsole(i, res) {
  const zone = document.getElementById('console-sortie-' + i);
  if (!zone) return;
  let html = '';
  for (const l of res.logs) html += echapper(l) + '\n';
  if (res.erreur) html += '<span class="ligne-erreur">⚠ ' + messageLisible(res.erreur) + '</span>';
  if (!html) html = '<span class="vide">(ton code n\'a rien affiché — utilise une instruction d\'affichage pour voir un résultat)</span>';
  zone.innerHTML = html;
}

// Exécute du JavaScript dans un Worker avec un délai maximum (protège des boucles infinies)
function executerJS(code, rappel) {
  let worker = null;
  try {
    // Le Worker surveille les setTimeout / setInterval programmés par l'élève :
    // sans ça, il renverrait ses résultats avant que les callbacks n'aient parlé,
    // et tout le contenu d'une leçon sur l'asynchrone serait invisible.
    const source = 'self.onmessage=function(e){' +
      'var logs=[];' +
      'var fauxConsole={log:function(){var a=[];for(var i=0;i<arguments.length;i++){var v=arguments[i];a.push(typeof v==="object"&&v!==null?JSON.stringify(v):String(v));}logs.push(a.join(" "));}};' +
      'var attente=0;' +
      'var vraiTimeout=self.setTimeout.bind(self);' +
      'var vraiInterval=self.setInterval.bind(self);' +
      'self.setTimeout=function(f,d){d=Number(d)||0;if(d>attente)attente=d;return vraiTimeout(f,d);};' +
      'self.setInterval=function(f,d){d=Number(d)||0;var total=Math.min(d*6,1200);if(total>attente)attente=total;return vraiInterval(f,d);};' +
      'var erreur=null;' +
      'try{new Function("console",e.data)(fauxConsole);}catch(err){erreur=err.message;}' +
      'var terminer=function(){self.postMessage({logs:logs,erreur:erreur});};' +
      'if(attente>0)vraiTimeout(terminer,Math.min(attente+100,1600));else terminer();' +
      '};';
    worker = new Worker(URL.createObjectURL(new Blob([source], { type: 'application/javascript' })));
  } catch (e) {
    // Repli si les Workers sont indisponibles : exécution directe
    const logs = [];
    const fauxConsole = { log: (...a) => logs.push(a.map(v => typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v)).join(' ')) };
    let erreur = null;
    try { new Function('console', code)(fauxConsole); } catch (err) { erreur = err.message; }
    return rappel({ logs, erreur });
  }
  const minuteur = setTimeout(() => {
    worker.terminate();
    rappel({ logs: [], erreur: 'ton code tourne sans s\'arrêter (boucle infinie ?). Vérifie la condition de ta boucle.' });
  }, 3000);
  worker.onmessage = e => {
    clearTimeout(minuteur);
    worker.terminate();
    rappel(e.data);
  };
  worker.postMessage(code);
}

/* ---------------- SQL : exécution et affichage ---------------- */
// Chaque exercice repart d'une base intacte : une requête DELETE ratée
// ne doit pas pénaliser la tentative suivante.
function baseNeuve() { return clonerBase(window.BASE_SQL || {}); }

function cellule(v) {
  if (v === null || v === undefined) return '<span class="sql-nul">NULL</span>';
  if (typeof v === 'number') return '<span class="sql-nombre">' + echapper(v) + '</span>';
  return echapper(v);
}

function tableauResultat(res) {
  if (res.erreur) return '<div class="sql-erreur">⚠ ' + res.erreur + '</div>';
  if (res.type !== 'select') {
    return '<div class="sql-message">✔ ' + echapper(res.message) + '</div>';
  }
  if (!res.lignes.length) {
    return '<div class="sql-message sql-vide">Aucune ligne ne correspond — la requête est valide, mais elle ne trouve rien.</div>';
  }
  let html = '<div class="table-defilante"><table class="memo-table sql-table"><tr>';
  for (const c of res.colonnes) html += '<th>' + echapper(c) + '</th>';
  html += '</tr>';
  for (const l of res.lignes) {
    html += '<tr>';
    for (const v of l) html += '<td>' + cellule(v) + '</td>';
    html += '</tr>';
  }
  html += '</table></div><div class="sql-message">' + echapper(res.message) + '</div>';
  return html;
}

// Panneau dépliable rappelant le contenu des tables : sans lui,
// impossible d'écrire une requête sans deviner les noms de colonnes.
function panneauTables(tables) {
  const base = window.BASE_SQL || {};
  const noms = tables && tables.length ? tables : Object.keys(base);
  let html = '<details class="sql-schema"><summary>📋 Voir les tables de la base</summary><div class="sql-schema-corps">';
  for (const nom of noms) {
    const t = base[nom];
    if (!t) continue;
    html += '<div class="sql-schema-table"><div class="sql-schema-nom">' + echapper(nom) +
      ' <span class="sql-schema-compte">' + t.lignes.length + ' lignes</span></div>' +
      '<div class="table-defilante"><table class="memo-table sql-table"><tr>';
    for (const c of t.colonnes) html += '<th>' + echapper(c) + '</th>';
    html += '</tr>';
    for (const l of t.lignes) {
      html += '<tr>';
      for (const c of t.colonnes) html += '<td>' + cellule(l[c]) + '</td>';
      html += '</tr>';
    }
    html += '</table></div></div>';
  }
  return html + '</div></details>';
}

// ---- Exécution Python (interpréteur Skulpt embarqué) ----
// Traduit les erreurs Python en français, dans les mots d'un débutant.
// Skulpt ne sait dire que « bad input on line N » pour toutes les erreurs de
// structure. On relit le code à la place de l'utilisateur pour nommer la cause.
function diagnostiquerSyntaxe(code, numero) {
  if (!code || !numero) return null;
  const lignes = code.split('\n');
  const ligne = lignes[numero - 1];
  if (ligne === undefined) return null;
  const creux = l => l.match(/^[ \t]*/)[0].replace(/\t/g, '    ').length;
  const finitParDeuxPoints = l => /:\s*(#.*)?$/.test(l);
  const ouvreUnBloc = /^\s*(if|elif|else|for|while|def|class|try|except|finally|with)\b/;

  let p = numero - 2;
  while (p >= 0 && lignes[p].trim() === '') p--;
  const prec = p >= 0 ? lignes[p] : null;

  if (prec !== null && ligne.trim() !== '' && finitParDeuxPoints(prec) && creux(ligne) <= creux(prec)) {
    return 'il manque l\'indentation à la ligne ' + numero + '. La ligne du dessus se termine par « : », donc celle-ci doit être décalée vers la droite de 4 espaces (touche Tab) pour dire à Python qu\'elle est à l\'intérieur du bloc.';
  }
  if (prec !== null && !finitParDeuxPoints(prec) && creux(ligne) > creux(prec)) {
    return 'la ligne ' + numero + ' est décalée alors que rien ne l\'annonce. On n\'indente qu\'après une ligne qui se termine par « : ». Supprime les espaces au début de cette ligne.';
  }
  const suspectes = [[numero, ligne], [p + 1, prec]];
  for (const [n, l] of suspectes) {
    if (l && ouvreUnBloc.test(l) && !finitParDeuxPoints(l)) {
      return 'il manque le « : » à la fin de la ligne ' + n + '. En Python, les lignes qui commencent par if, elif, else, for, while ou def se terminent toujours par deux-points.';
    }
  }
  return null;
}

function traduirePython(message, code) {
  const m = String(message);
  const numero = parseInt((m.match(/on line (\d+)/) || [])[1], 10);
  const nom = (m.match(/name '([^']+)' is not defined/) || [])[1];
  if (nom) return 'le nom « ' + nom + ' » est inconnu. Soit tu ne l\'as pas encore créé, soit il y a une faute de frappe. (Attention : Python distingue les majuscules des minuscules.)';
  if (/IndentationError|expected an indented block|unexpected indent/i.test(m)) {
    return diagnostiquerSyntaxe(code, numero) || 'problème d\'indentation. Après une ligne qui finit par « : », la ligne suivante doit être décalée de 4 espaces (touche Tab).';
  }
  if (/EOF in multi-line/i.test(m)) return 'il manque une fermeture' + (numero ? ' avant la ligne ' + numero : '') + ' : une parenthèse, un crochet ou un guillemet a été ouvert sans être refermé.';
  if (/bad input|SyntaxError|invalid syntax/i.test(m)) {
    return diagnostiquerSyntaxe(code, numero) ||
      ('erreur de syntaxe' + (numero ? ' à la ligne ' + numero : '') + ' : Python ne comprend pas cette ligne. Regarde s\'il manque un « : » en fin de ligne, une parenthèse ou un guillemet fermant.');
  }
  if (/KeyError/i.test(m)) return 'cette clé n\'existe pas dans le dictionnaire. Vérifie l\'orthographe de la clé — ' + m;
  if (/IndexError|index out of range/i.test(m)) return 'tu demandes un élément qui n\'existe pas dans la liste. Rappel : le premier est à l\'indice 0, donc une liste de 3 éléments va de 0 à 2.';
  if (/division by zero|ZeroDivisionError/i.test(m)) return 'division par zéro impossible.';
  if (/unsupported operand|cannot concatenate|TypeError/i.test(m)) return 'tu mélanges deux types incompatibles — souvent du texte et un nombre. Python refuse « 3 + "3" » : convertis avec str(...) ou int(...). (' + m + ')';
  if (/execution time|timed out|TimeLimit/i.test(m)) return 'ton code tourne sans s\'arrêter (boucle infinie ?). Vérifie que la condition de ta boucle finit par devenir fausse.';
  return m;
}

// Exécute du Python et renvoie {logs, erreur} — même contrat que executerJS,
// pour que la console et les verifier des exercices ne changent pas.
function executerPython(code, rappel) {
  if (typeof Sk === 'undefined') {
    return rappel({ logs: [], erreur: 'l\'interpréteur Python n\'a pas pu être chargé. Vérifie que les fichiers skulpt.min.js et skulpt-stdlib.js sont bien à côté de index.html.' });
  }
  let sortie = '';
  const LIMITE = 400000;   // garde-fou : une boucle qui affiche sans fin ne doit pas figer la page
  try {
    Sk.configure({
      output: function (t) { if (sortie.length < LIMITE) sortie += t; },
      read: function (x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) throw "File not found: '" + x + "'";
        return Sk.builtinFiles.files[x];
      },
      __future__: Sk.python3,
      execLimit: 3000,      // 3 secondes maximum, comme pour JavaScript
      killableWhile: true,
      killableFor: true
    });
  } catch (e) {
    return rappel({ logs: [], erreur: 'impossible de démarrer l\'interpréteur Python : ' + e });
  }

  const finir = (erreur) => {
    const logs = sortie.split('\n');
    if (logs.length && logs[logs.length - 1] === '') logs.pop();   // le dernier print ajoute un saut de ligne
    rappel({ logs, erreur: erreur ? traduirePython(erreur, code) : null });
  };

  try {
    Sk.misceval.asyncToPromise(function () {
      return Sk.importMainWithBody('<stdin>', false, code, true);
    }).then(function () { finir(null); }, function (err) {
      finir(err && err.toString ? err.toString() : String(err));
    });
  } catch (e) {
    finir(e && e.toString ? e.toString() : String(e));
  }
}

// Aiguillage : 'js' part dans le Worker, 'py' dans Skulpt,
// 'c' et 'java' dans l'interpréteur maison (exécution immédiate).
function executerCode(type, code, rappel) {
  if (type === 'py') executerPython(code, rappel);
  else if (type === 'c' || type === 'java') rappel(executerCJ(type, code));
  else executerJS(code, rappel);
}

// Les langages qui s'exécutent dans la console plutôt que dans un aperçu
const LANGAGES_CONSOLE = ['js', 'py', 'c', 'java'];
const NOM_LANGAGE = { js: 'JavaScript', py: 'Python', c: 'C', java: 'Java', sql: 'SQL', html: 'HTML' };

// ---- Vérification ----
function verifier(i) {
  const ex = exercicesDe(leconCourante)[i];

  if (ex.type === 'qcm') {
    const coche = document.querySelector('input[name="qcm-' + i + '"]:checked');
    // Ne rien avoir coché n'est pas une mauvaise réponse : ne pas le peindre
    // en échec, et ne pas le compter comme un essai raté.
    if (!coche) return afficherVerdict(i, { neutre: true, message: 'Coche d\'abord une réponse, puis reclique sur « Vérifier ».' });
    const choix = parseInt(coche.value);
    if (choix === ex.bonne) return afficherVerdict(i, { ok: true, message: ex.explication || '' });
    return afficherVerdict(i, { ok: false, message: ex.aides && ex.aides[choix] ? ex.aides[choix] : 'Ce n\'est pas la bonne réponse — relis la leçon et réessaie.' });
  }

  const code = document.getElementById('editeur-' + i).value;

  if (ex.type === 'sql') {
    const base = baseNeuve();
    const res = executerSQL(code, base);
    document.getElementById('resultat-sql-' + i).innerHTML = tableauResultat(res);
    let verdict;
    try {
      verdict = ex.verifier({
        code, base, erreur: res.erreur, message: res.message, resultat: res.type,
        colonnes: res.colonnes || [], lignes: res.lignes || [], objets: res.objets || []
      });
    } catch (e) {
      verdict = { ok: false, message: 'Impossible de vérifier ta requête. As-tu bien suivi la consigne ?' };
    }
    return afficherVerdict(i, verdict);
  }

  if (LANGAGES_CONSOLE.indexOf(ex.type) !== -1) {
    executerCode(ex.type, code, res => {
      afficherConsole(i, res);
      let verdict;
      try {
        verdict = ex.verifier({ code, logs: res.logs, erreur: res.erreur });
      } catch (e) {
        verdict = { ok: false, message: 'Impossible de vérifier ton code. As-tu bien suivi la consigne ?' };
      }
      afficherVerdict(i, verdict);
    });
  } else {
    const iframe = document.getElementById('apercu-' + i);
    iframe.srcdoc = code;
    // On attend que l'aperçu soit chargé avant de vérifier
    iframe.onload = () => {
      iframe.onload = null;
      let verdict;
      try {
        verdict = ex.verifier({ doc: iframe.contentDocument, code, win: iframe.contentWindow });
      } catch (e) {
        verdict = { ok: false, message: 'Impossible de vérifier ton code. As-tu bien suivi la consigne ?' };
      }
      afficherVerdict(i, verdict);
    };
  }
}

// Combien de fois cet exercice a été raté depuis l'ouverture de la leçon.
// C'est ce qui permet à l'aide de MONTER : le verdict du premier essai et
// celui du troisième n'ont pas à dire la même chose.
let essaisRates = {};
// Le dernier verdict rendu, par exercice : sert à repérer qu'on butte
// plusieurs fois d'affilée sur exactement la même chose.
let dernierVerdict = {};
function cleEssai(i) { return leconCourante.id + '#' + i; }
function nbEchecs(i) { return essaisRates[cleEssai(i)] || 0; }

// Amener un bloc dans le champ, mais SEULEMENT s'il n'y est pas, et du
// minimum nécessaire. Remplace le panneau collant : rien ne bouge pendant
// qu'on lit, ça ne bouge qu'au moment où l'on a demandé quelque chose.
function amenerDansLeChamp(el) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  const marge = 16;
  if (r.top >= marge && r.bottom <= innerHeight - marge) return;   // déjà visible
  el.scrollIntoView({ block: 'nearest' });
}

// « Relis le passage de la leçon » n'est une instruction que si on peut la
// suivre d'un clic. Sur une leçon longue, le passage est à 1 500 px de là.
function revoirLecon() {
  const zone = document.querySelector('.contenu-lecon');
  if (!zone) return;
  zone.scrollIntoView({ block: 'start', behavior: 'smooth' });
  zone.classList.remove('rappelee');
  void zone.offsetWidth;              // relance l'animation si on reclique
  zone.classList.add('rappelee');
  setTimeout(() => zone.classList.remove('rappelee'), 1800);
}

// Le verdict ne fait-il que recopier l'erreur déjà affichée à côté ? Vaut
// aussi pour SQL, où le moteur écrit dans le panneau de résultat.
function verdictRepeteLaConsole(i, message) {
  const zone = document.getElementById('console-sortie-' + i) || document.getElementById('resultat-sql-' + i);
  if (!zone || !message) return false;
  const ligne = zone.querySelector('.ligne-erreur') || zone.querySelector('.sql-erreur');
  if (!ligne) return false;
  const nu = t => String(t).replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const verdict = nu(message);
  const console_ = nu(ligne.textContent).replace(/^⚠\s*/, '');
  if (verdict.length < 15) return false;
  return console_ === verdict || console_.indexOf(verdict) !== -1 || verdict.indexOf(console_) !== -1;
}

function afficherVerdict(i, v) {
  const fb = document.getElementById('feedback-' + i);

  // Ne rien avoir coché n'est pas une faute : c'est une étape sautée.
  if (v.neutre) {
    fb.className = 'feedback neutre';
    fb.innerHTML = '👉 ' + (v.message || '');
    return;
  }

  if (v.ok) {
    const leconDejaFinie = !!progression.faits[leconCourante.id];
    fb.className = 'feedback ok';
    fb.innerHTML = '🎉 <strong>Bravo, c\'est réussi !</strong> ' + (v.message || '');
    marquerExo(leconCourante.id, i, v.message, nbEchecs(i));
    rendreSidebar(leconCourante.id);
    revelerRecommencerLecon();
    majEtabli();

    const carte = document.getElementById('exercice-' + i);
    if (carte) {
      carte.classList.remove('celebre');
      void carte.offsetWidth;      // relance l'animation si l'exercice est revalidé
      carte.classList.add('celebre');
    }
    const entete = document.querySelector('#exercice-' + i + ' .exercice-entete');
    if (entete && !entete.querySelector('.badge-fait')) entete.innerHTML += '<span class="badge-fait">✔ réussi</span>';

    majRecuLecon();
    if (progression.faits[leconCourante.id]) {
      const btn = document.getElementById('btn-suivant');
      if (btn) btn.className = 'btn btn-suivant';
      // La leçon vient d'être bouclée : c'est le moment qui mérite d'être fêté.
      if (!leconDejaFinie) celebrer();
    }
  } else {
    essaisRates[cleEssai(i)] = nbEchecs(i) + 1;
    const n = nbEchecs(i);
    fb.className = 'feedback ko';
    let corps = v.message || 'Relis la consigne et réessaie.';
    // Beaucoup de correcteurs renvoient l'erreur du moteur telle quelle. Elle
    // est déjà imprimée dans la console, à quelques centimètres : la répéter
    // mot pour mot fait croire à deux problèmes différents.
    if (verdictRepeteLaConsole(i, corps)) {
      const zoneNommee = document.getElementById('resultat-sql-' + i) ? 'Résultat de ta requête' : 'Ce que ton code affiche';
      corps = 'Ton code s\'est arrêté sur une erreur. Elle est écrite en toutes lettres dans ' +
        '« ' + zoneNommee + ' », juste à côté — c\'est elle qui dit quoi corriger.';
    }
    // Est-ce la MÊME chose qui bloque depuis plusieurs essais ? Le diagnostic
    // sait déjà ce qui manque ; s'il se répète mot pour mot, l'app peut le
    // remarquer au lieu de le redire une fois de plus.
    const cle = cleEssai(i);
    const memoire = dernierVerdict[cle];
    const identique = !!memoire && memoire.texte === corps;
    dernierVerdict[cle] = { texte: corps, suite: identique ? memoire.suite + 1 : 1 };
    const dAffilee = dernierVerdict[cle].suite;

    let texte = '🤔 <strong>Pas encore.</strong> ' + corps;
    // À partir du deuxième essai, l'interface propose l'aide au lieu
    // d'attendre qu'on la réclame. C'est là qu'on abandonne, pas au premier.
    // On ne cite un bouton que s'il est réellement là.
    const indiceDispo = !!document.querySelector('#exercice-' + i + ' .btn-indice');
    const solutionDispo = !!document.getElementById('zone-solution-' + i);
    const revoir = '<button type="button" class="lien-relance" onclick="revoirLecon()">↑ Revoir la leçon</button>';

    if (n === 2 && indiceDispo) {
      texte += '<div class="verdict-relance">Deuxième essai. Si ça bloque, le bouton ' +
        '<strong>💡 Indice</strong>, sous l\'éditeur, te dit où regarder — sans donner le code. ' +
        revoir + '</div>';
    } else if (dAffilee >= 3 && solutionDispo) {
      // Trois fois exactement le même reproche : ce n'est plus un oubli, c'est
      // une information qui manque. Insister serait de la friction inutile.
      texte += '<div class="verdict-relance">C\'est la ' + dAffilee + 'ᵉ fois d\'affilée que c\'est ' +
        '<strong>la même chose</strong> qui manque. Ce n\'est pas de l\'étourderie : il te manque une ' +
        'information. Ouvre la <strong>solution</strong>, lis-la ligne par ligne, referme-la, et ' +
        'réécris de mémoire — comprendre une solution, c\'est apprendre aussi. ' + revoir + '</div>';
    } else if (n >= 4) {
      texte += '<div class="verdict-relance">' + n + 'ᵉ essai. Tu peux aussi <strong>laisser celui-là ' +
        'et y revenir</strong> : il t\'attendra, et une notion se comprend souvent mieux après la suivante. ' +
        revoir + '</div>';
    } else if (n === 3) {
      texte += '<div class="verdict-relance">3ᵉ essai. Tu peux ' +
        (indiceDispo ? 'prendre l\'<strong>indice</strong>, ' : '') +
        (solutionDispo ? 'ouvrir la <strong>solution</strong> et la comprendre ligne par ligne, ' : '') +
        'ou revenir au cours. ' + revoir + '</div>';
    }
    fb.innerHTML = texte;
    majRecours(i);
    amenerDansLeChamp(fb);
  }
}

// Pluie de confettis à la fin d'une leçon (désactivée si l'utilisateur réduit les animations)
function celebrer() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const couleurs = ['#4f6df5', '#7c5cf6', '#2c8a6d', '#d2703a', '#e0b13a', '#c04f45'];
  const zone = document.createElement('div');
  zone.className = 'confetti-zone';
  for (let k = 0; k < 46; k++) {
    const c = document.createElement('span');
    c.className = 'confetti';
    c.style.left = (Math.random() * 100) + 'vw';
    c.style.background = couleurs[k % couleurs.length];
    c.style.setProperty('--derive', (Math.random() * 200 - 100) + 'px');
    c.style.setProperty('--tour', (Math.random() * 1080 - 540) + 'deg');
    c.style.setProperty('--duree', (1900 + Math.random() * 1400) + 'ms');
    c.style.animationDelay = (Math.random() * 320) + 'ms';
    if (k % 3 === 0) { c.style.width = '7px'; c.style.height = '7px'; c.style.borderRadius = '50%'; }
    zone.appendChild(c);
  }
  document.body.appendChild(zone);
  setTimeout(() => zone.remove(), 4200);
}

/* Un exercice peut proposer UN indice (`indice`, une chaîne) ou PLUSIEURS
   (`indices`, un tableau rangé du plus discret au plus explicite). Les deux
   formes coexistent : la première est celle de tous les exercices écrits
   jusqu'ici, et rien ne l'oblige à changer. */
function indicesDe(ex) {
  if (Array.isArray(ex.indices)) return ex.indices.filter(t => t && String(t).trim());
  return ex.indice ? [ex.indice] : [];
}

let indicesOuverts = {};
function nbIndicesOuverts(i) { return indicesOuverts[cleEssai(i)] || 0; }

function montrerIndice(i) {
  const zone = document.getElementById('indice-' + i);
  const ex = exercicesDe(leconCourante)[i];
  const liste = indicesDe(ex);
  if (!zone || !liste.length) return;

  const n = Math.min(nbIndicesOuverts(i) + 1, liste.length);
  indicesOuverts[cleEssai(i)] = n;

  // Les paliers déjà ouverts restent affichés : on relit le premier en
  // découvrant le second, sinon l'aide se contredit d'un clic à l'autre.
  zone.className = 'indice-bloc visible';
  zone.innerHTML = liste.slice(0, n).map((texte, k) =>
    '<p class="indice-palier">💡 <strong>Indice' +
    (liste.length > 1 ? ' ' + (k + 1) + '/' + liste.length : '') +
    ' :</strong> ' + texte + '</p>').join('');

  // Un palier est sorti : le bouton qui l'appelait doit changer, ou partir.
  majRecours(i);
  ajouterBoutonsCopie();
  amenerDansLeChamp(zone);
}

/* L'échelle d'aide monte avec les essais, et rien d'autre n'est proposé avant
   d'avoir essayé. Carte neuve : « Vérifier » et un « ⋯ ». Premier échec :
   le premier indice apparaît. Chaque échec suivant en ouvre un de plus, s'il
   en reste. Quand ils sont épuisés, un dernier échec découvre la solution.
   C'était six boutons de même poids au moment de la page où l'on hésite le
   plus — et, avant les paliers, un saut direct de « où regarder » à « voici
   la réponse », qui est l'endroit exact où l'on abandonne. */
function contenuRecours(i, ex, echecs) {
  const liste = indicesDe(ex);
  const ouverts = nbIndicesOuverts(i);
  let h = '';
  // Il faut avoir réessayé AVEC le palier précédent pour mériter le suivant :
  // sans cette condition, trois clics suffiraient à tout dévoiler sans avoir
  // écrit une ligne.
  if (ouverts < liste.length && echecs >= ouverts + 1) {
    h += '<button class="btn btn-secondaire btn-mini btn-indice btn-apparu" onclick="montrerIndice(' + i + ')">💡 ' +
      (ouverts === 0 ? 'Indice' : 'Un autre indice') + '</button>';
  }
  // Un QCM n'a pas de solution à ouvrir : la dévoiler ne serait pas une aide,
  // ce serait un clic vers une réussite vide. Il garde l'indice et le retour
  // en arrière, rien d'autre.
  if (ex.type !== 'qcm' && echecs >= Math.max(liste.length, 1) + 1) {
    h += '<button class="btn btn-secondaire btn-mini btn-apparu" onclick="montrerSolution(' + i + ')">👀 Solution</button>';
  }
  h += '<details class="menu-plus">' +
    '<summary class="btn btn-secondaire btn-mini" aria-label="Autres actions sur cet exercice">⋯</summary>' +
    '<div class="menu-plus-corps">' +
    (ex.type === 'qcm'
      ? '<button class="btn btn-secondaire btn-mini" onclick="effacerReponseQcm(' + i + ')">↺ Effacer ma réponse</button>' +
        '<button class="btn btn-secondaire btn-mini" onclick="revoirLecon()">↑ Revoir la leçon</button>'
      : '<button class="btn btn-secondaire btn-mini" onclick="reinitialiser(' + i + ')">↺ Remettre le code de départ</button>' +
        '<button class="btn btn-secondaire btn-mini" onclick="revoirLecon()">↑ Revoir la leçon</button>' +
        '<button class="btn btn-secondaire btn-mini" onclick="versBacASable(' + i + ')">🧪 Ouvrir dans le bac à sable</button>') +
    '</div></details>';
  return h;
}

// Un QCM se « remet à zéro » en décochant : le code de départ n'existe pas.
function effacerReponseQcm(i) {
  fermerMenus();
  document.querySelectorAll('input[name="qcm-' + i + '"]').forEach(r => { r.checked = false; });
  const fb = document.getElementById('feedback-' + i);
  if (fb) { fb.className = 'feedback'; fb.innerHTML = ''; }
  const ind = document.getElementById('indice-' + i);
  if (ind) { ind.className = 'indice-bloc'; ind.innerHTML = ''; }
  delete essaisRates[cleEssai(i)];
  delete indicesOuverts[cleEssai(i)];
  delete dernierVerdict[cleEssai(i)];
  oublierExo(leconCourante.id, i);
  const badge = document.querySelector('#exercice-' + i + ' .badge-fait');
  if (badge) badge.remove();
  rendreSidebar(leconCourante.id);
  majRecours(i);
  majEtabli();
  majRecuLecon();
}

function majRecours(i) {
  const zone = document.querySelector('#exercice-' + i + ' .exercice-recours');
  if (!zone) return;
  zone.innerHTML = contenuRecours(i, exercicesDe(leconCourante)[i], nbEchecs(i));
}

function fermerMenus() {
  document.querySelectorAll('details.menu-plus[open]').forEach(d => d.removeAttribute('open'));
}
document.addEventListener('click', function (e) {
  document.querySelectorAll('details.menu-plus[open]').forEach(d => {
    if (!d.contains(e.target)) d.removeAttribute('open');
  });
});
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fermerMenus(); });

function montrerSolution(i) {
  fermerMenus();
  const zone = document.getElementById('zone-solution-' + i);
  zone.classList.add('visible');
  ajouterBoutonsCopie();
  envelopperTableaux();
  // Le focus va sur la solution : au clavier on y est, au lecteur d'écran
  // elle se lit. Sans ça, elle apparaissait sans que rien ne le signale.
  zone.focus();
  amenerDansLeChamp(zone);
}

// Recommencer, c'est repartir de zéro pour de bon : le code de départ revient,
// et la réussite est effacée. Garder le ✔ alors qu'on efface la réponse serait
// mentir sur l'état de l'exercice.
function reinitialiser(i) {
  const ex = exercicesDe(leconCourante)[i];
  document.getElementById('editeur-' + i).value = ex.codeDepart;
  oublierCode(leconCourante.id, i);
  document.getElementById('feedback-' + i).className = 'feedback';
  oublierExo(leconCourante.id, i);

  // Repartir de zéro, c'est aussi refermer l'aide : compteur d'essais,
  // indice et solution reviennent à leur état de départ.
  fermerMenus();
  delete essaisRates[cleEssai(i)];
  delete indicesOuverts[cleEssai(i)];
  delete dernierVerdict[cleEssai(i)];
  const zoneIndice = document.getElementById('indice-' + i);
  if (zoneIndice) { zoneIndice.className = 'indice-bloc'; zoneIndice.innerHTML = ''; }
  const zoneSolution = document.getElementById('zone-solution-' + i);
  if (zoneSolution) zoneSolution.classList.remove('visible');
  majRecours(i);

  const badge = document.querySelector('#exercice-' + i + ' .badge-fait');
  if (badge) badge.remove();
  rendreSidebar(leconCourante.id);
  majBoutonRecommencerLecon();
  majEtabli();
  majRecuLecon();

  majLignes(i);
  if (ex.type === 'html') executer(i);
}

// Remise à zéro de la leçon entière : c'est destructif, donc on demande.
function recommencerLecon() {
  const lecon = leconCourante;
  const exos = exercicesDe(lecon);
  if (!exos.length) return;
  const message = 'Remettre à zéro les ' + exos.length + ' exercices de « ' + lecon.titre + ' » ?\n\n' +
    'Ton code sera remplacé par le code de départ et tes réussites sur cette leçon seront effacées.\n' +
    'Le reste de ta progression n\'est pas touché.';
  if (!confirm(message)) return;

  exos.forEach((_, i) => {
    oublierCode(lecon.id, i);
    delete essaisRates[lecon.id + '#' + i];
    delete indicesOuverts[lecon.id + '#' + i];
    delete dernierVerdict[lecon.id + '#' + i];
  });
  delete progression.exos[lecon.id];
  delete progression.faits[lecon.id];
  sauverProgression();
  rendreLecon(lecon.id);
}

// Le bouton n'a de sens que s'il y a quelque chose à effacer.
function majBoutonRecommencerLecon() {
  const zone = document.getElementById('recommencer-lecon');
  if (zone) zone.style.display = leconEntamee(leconCourante) ? '' : 'none';
}
// Version économique, appelée à chaque frappe : dès qu'on écrit, il y a
// forcément quelque chose à effacer, inutile de relire tout le stockage.
function revelerRecommencerLecon() {
  const zone = document.getElementById('recommencer-lecon');
  if (zone && zone.style.display === 'none') zone.style.display = '';
}

/* =========================================================================
   BAC À SABLE — l'éditeur libre
   Un espace sans correction, sans objectif : on essaie, on casse, on garde.
   ========================================================================= */
const CLE_BAC = 'aac-bac';

const MODELES = {
  vide: {
    nom: 'Page vide',
    desc: 'Le strict minimum, pour partir de rien.',
    html: '<h1>Ma page</h1>\n<p>À toi de jouer !</p>',
    css: 'body {\n  font-family: sans-serif;\n  padding: 24px;\n}',
    js: '// Ton JavaScript ici\n'
  },
  perso: {
    nom: 'Page personnelle',
    desc: 'Un titre, une présentation, une liste de passions.',
    html: '<header>\n  <h1>Alex Martin</h1>\n  <p class="sous-titre">Apprenti développeur</p>\n</header>\n\n<main>\n  <h2>Ce que j\'aime</h2>\n  <ul>\n    <li>Le cinéma</li>\n    <li>La randonnée</li>\n    <li>Le code (depuis peu !)</li>\n  </ul>\n</main>',
    css: 'body {\n  font-family: sans-serif;\n  max-width: 600px;\n  margin: 0 auto;\n  padding: 32px 20px;\n  line-height: 1.6;\n  color: #222;\n}\nheader {\n  border-bottom: 3px solid #4f6df5;\n  padding-bottom: 16px;\n  margin-bottom: 24px;\n}\nh1 { margin: 0; }\n.sous-titre {\n  color: #666;\n  margin: 4px 0 0;\n}',
    js: '// Rien pour l\'instant — cette page n\'a pas besoin de JavaScript.\n'
  },
  carte: {
    nom: 'Carte de visite',
    desc: 'Une carte centrée, avec Flexbox et une ombre.',
    html: '<div class="carte">\n  <div class="avatar">AM</div>\n  <h2>Alex Martin</h2>\n  <p>Développeur web en formation</p>\n  <button id="bouton">Me contacter</button>\n</div>',
    css: 'body {\n  font-family: sans-serif;\n  min-height: 100vh;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #eef1fe;\n}\n.carte {\n  background: white;\n  padding: 32px;\n  border-radius: 16px;\n  box-shadow: 0 10px 30px rgba(0,0,0,.12);\n  text-align: center;\n}\n.avatar {\n  width: 72px;\n  height: 72px;\n  margin: 0 auto 16px;\n  border-radius: 50%;\n  background: #4f6df5;\n  color: white;\n  font-size: 26px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\nbutton {\n  margin-top: 16px;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n  background: #4f6df5;\n  color: white;\n  font-size: 15px;\n  cursor: pointer;\n}',
    js: 'let bouton = document.querySelector("#bouton");\n\nbouton.addEventListener("click", function () {\n  alert("Merci de ton intérêt !");\n});'
  },
  compteur: {
    nom: 'Mini-jeu : le compteur',
    desc: 'Du HTML, du CSS et du JavaScript déjà reliés entre eux.',
    html: '<h1>Compteur</h1>\n<div id="affichage">0</div>\n<button id="moins">−</button>\n<button id="plus">+</button>',
    css: 'body {\n  font-family: sans-serif;\n  text-align: center;\n  padding: 40px;\n}\n#affichage {\n  font-size: 72px;\n  font-weight: bold;\n  color: #4f6df5;\n  margin: 20px 0;\n}\nbutton {\n  font-size: 24px;\n  width: 60px;\n  height: 60px;\n  margin: 0 6px;\n  border: none;\n  border-radius: 12px;\n  background: #eef1fe;\n  cursor: pointer;\n}\nbutton:hover { background: #dbe1fd; }',
    js: 'let valeur = 0;\nlet affichage = document.querySelector("#affichage");\n\ndocument.querySelector("#plus").addEventListener("click", function () {\n  valeur = valeur + 1;\n  affichage.textContent = valeur;\n});\n\ndocument.querySelector("#moins").addEventListener("click", function () {\n  valeur = valeur - 1;\n  affichage.textContent = valeur;\n});'
  }
};

const PY_DEPART = '# Ton terrain de jeu Python.\n# Essaie, casse, recommence : rien n\'est corrigé ici.\n\nfor i in range(1, 6):\n    print("Ligne", i)\n';

// Un 5e modèle qui ouvre directement côté Python
MODELES.python = {
  nom: 'Script Python',
  desc: 'Un fichier Python vierge, pour calculer ou tester une idée.',
  python: true,
  html: MODELES.vide.html,
  css: MODELES.vide.css,
  js: MODELES.vide.js,
  py: '# Un script tout neuf.\n\nnotes = [12, 15, 9, 18]\n\ntotal = 0\nfor n in notes:\n    total = total + n\n\nprint("Moyenne :", total / len(notes))\n'
};

const SQL_DEPART = '-- Interroge la base du cinéma comme tu veux.\n-- Astuce : Ctrl+Entrée pour lancer.\n\nSELECT titre, annee, note\nFROM films\nORDER BY note DESC\nLIMIT 5;';

const C_DEPART = '#include <stdio.h>\n\nint main() {\n    printf("Bonjour depuis le C !\\n");\n\n    for (int i = 1; i <= 3; i++) {\n        printf("Tour %d\\n", i);\n    }\n\n    return 0;\n}';

const JAVA_DEPART = 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Bonjour depuis Java !");\n\n        for (int i = 1; i <= 3; i++) {\n            System.out.println("Tour " + i);\n        }\n    }\n}';

// La base du bac à sable vit le temps de la session : un INSERT reste visible
// tant qu'on ne clique pas sur « Réinitialiser la base ».
let baseBac = null;
function baseAtelier() {
  if (!baseBac) baseBac = baseNeuve();
  return baseBac;
}
function reinitialiserBaseBac() {
  baseBac = baseNeuve();
  const zone = document.getElementById('resultat-bac');
  if (zone) zone.innerHTML = '<div class="sql-message">✔ Base remise à son état d\'origine.</div>';
  const panneau = document.getElementById('schema-bac');
  if (panneau) panneau.innerHTML = panneauTablesLive();
}

// Version du panneau qui montre la base VIVANTE du bac à sable
function panneauTablesLive() {
  const base = baseAtelier();
  let html = '<details class="sql-schema"><summary>📋 Voir les tables (état actuel)</summary><div class="sql-schema-corps">';
  for (const nom in base) {
    const t = base[nom];
    html += '<div class="sql-schema-table"><div class="sql-schema-nom">' + echapper(nom) +
      ' <span class="sql-schema-compte">' + t.lignes.length + ' lignes</span></div>' +
      '<div class="table-defilante"><table class="memo-table sql-table"><tr>';
    for (const c of t.colonnes) html += '<th>' + echapper(c) + '</th>';
    html += '</tr>';
    for (const l of t.lignes) {
      html += '<tr>';
      for (const c of t.colonnes) html += '<td>' + cellule(l[c]) + '</td>';
      html += '</tr>';
    }
    html += '</table></div></div>';
  }
  return html + '</div></details>';
}

let bac = { projets: {}, courant: null, onglet: 'web', fichier: 'html' };
try {
  const brut = localStorage.getItem(CLE_BAC);
  if (brut) bac = Object.assign({ projets: {}, courant: null, onglet: 'web', fichier: 'html' }, JSON.parse(brut));
} catch (e) {}

function sauverBac() {
  try { localStorage.setItem(CLE_BAC, JSON.stringify(bac)); } catch (e) {}
}

function nomLibre(base) {
  if (!bac.projets[base]) return base;
  let n = 2;
  while (bac.projets[base + ' ' + n]) n++;
  return base + ' ' + n;
}

function creerProjet(nom, modele) {
  const m = MODELES[modele] || MODELES.vide;
  const vrai = nomLibre(nom || m.nom);
  bac.projets[vrai] = { html: m.html, css: m.css, js: m.js, py: m.py || PY_DEPART, sql: SQL_DEPART, c: C_DEPART, java: JAVA_DEPART };
  bac.courant = vrai;
  // On ouvre l'onglet correspondant au modèle : choisir « Carte de visite »
  // en étant côté Python afficherait sinon un éditeur qui n'a rien à voir.
  bac.onglet = m.python ? 'python' : 'web';
  sauverBac();
  return vrai;
}

function projetCourant() {
  if (!bac.courant || !bac.projets[bac.courant]) {
    const noms = Object.keys(bac.projets);
    if (noms.length) bac.courant = noms[0];
    else creerProjet('Mon premier essai', 'perso');
  }
  const p = bac.projets[bac.courant];
  // Projets créés avant l'ajout d'un onglet : on complète à la volée
  if (p.sql === undefined) p.sql = SQL_DEPART;
  if (p.c === undefined) p.c = C_DEPART;
  if (p.java === undefined) p.java = JAVA_DEPART;
  return p;
}

// ---- Repérage code ↔ page ----
// Pour relier une ligne de code à un morceau de page, on marque chaque balise
// ouvrante avec le numéro de ligne où elle est écrite. Le marquage n'ajoute ni
// ne retire aucun retour à la ligne : la numérotation du JavaScript reste juste.
function annoterLignes(source) {
  const n = source.length;
  let sortie = '', ligne = 1, i = 0;

  const compter = t => { const m = t.match(/\n/g); if (m) ligne += m.length; };

  while (i < n) {
    const c = source[i];
    if (c === '\n') { sortie += c; ligne++; i++; continue; }
    if (c !== '<') { sortie += c; i++; continue; }

    if (source.startsWith('<!--', i)) {          // un commentaire n'est pas une balise
      const f = source.indexOf('-->', i);
      const bloc = f === -1 ? source.slice(i) : source.slice(i, f + 3);
      compter(bloc); sortie += bloc; i += bloc.length; continue;
    }
    if (source[i + 1] === '!' || source[i + 1] === '/') { sortie += c; i++; continue; }

    const debut = /^<([a-zA-Z][\w-]*)/.exec(source.slice(i, i + 40));
    if (!debut) { sortie += c; i++; continue; }

    // fin de la balise ouvrante, en laissant tranquille ce qui est entre guillemets
    let j = i + debut[0].length, guillemet = null;
    while (j < n) {
      const d = source[j];
      if (guillemet) { if (d === guillemet) guillemet = null; }
      else if (d === '"' || d === '\'') guillemet = d;
      else if (d === '>') break;
      j++;
    }
    const balise = source.slice(i, Math.min(j + 1, n));
    sortie += '<' + debut[1] + ' data-aac-l="' + ligne + '"' + balise.slice(debut[0].length);
    compter(balise);
    i += balise.length;

    // le contenu d'un <script> ou d'un <style> est du texte, pas des balises
    const nom = debut[1].toLowerCase();
    if (nom === 'script' || nom === 'style') {
      const reste = source.slice(i);
      const f = new RegExp('</' + nom + '\\s*>', 'i').exec(reste);
      const bloc = f ? reste.slice(0, f.index) : reste;
      compter(bloc); sortie += bloc; i += bloc.length;
    }
  }
  return sortie;
}

// Quel sélecteur CSS s'applique à la ligne survolée ? On empile les blocs
// ouverts avant cette ligne : le sommet de la pile est la règle en cours. Une
// pile (et pas un simple compteur) pour retrouver le `h1` d'un `@media { h1 {…} }`.
function selecteurDeLigne(css, ligne) {
  const lignes = css.split('\n');
  if (ligne < 1 || ligne > lignes.length) return null;
  let debut = 0;
  for (let k = 0; k < ligne - 1; k++) debut += lignes[k].length + 1;

  const pile = [];
  let debutSel = 0;
  for (let k = 0; k < debut; k++) {
    if (css[k] === '{') { pile.push(css.slice(debutSel, k)); debutSel = k + 1; }
    else if (css[k] === '}') { pile.pop(); debutSel = k + 1; }
  }

  let brut = pile.length ? pile[pile.length - 1] : '';
  if (!propre(brut)) {
    // On n'est pas dans une règle utilisable : la ligne ouvre peut-être la suivante.
    const ouvre = css.indexOf('{', debut);
    const ferme = css.indexOf('}', debut);
    brut = (ouvre !== -1 && (ferme === -1 || ouvre < ferme)) ? css.slice(debutSel, ouvre) : '';
  }
  return propre(brut);

  // @media, @keyframes… ne désignent aucun élément de la page
  function propre(t) {
    if (!t) return null;
    const s = t.replace(/\/\*[\s\S]*?\*\//g, '').trim();
    return (!s || s.charAt(0) === '@') ? null : s;
  }
}

// Le calque de repérage, injecté dans l'aperçu : il dessine le contour des
// éléments visés et renvoie au parent ce que la souris survole dans la page.
const CALQUE_REPERAGE =
  '<script>(function(){\n' +
  'var socle=null,boites=[],etiquette=null,vus=[];\n' +
  // Le CSS de la page est écrit par l'utilisateur : « all:initial » neutralise
  // ses règles ordinaires, et tout ce qu'on pose ensuite est en !important pour
  // survivre à un « * { … !important } » écrit pendant qu'il expérimente.
  'function poser(e,o){for(var k in o)e.style.setProperty(k,o[k],"important");}\n' +
  // NEUTRE annule ce qui déplacerait ou masquerait le calque : « transform »
  // surtout, que l'utilisateur apprend justement à manipuler en CSS.
  'var NEUTRE={margin:"0",padding:"0",border:"0",transform:"none",filter:"none",\n' +
  ' opacity:"1",visibility:"visible","clip-path":"none","max-width":"none","max-height":"none"};\n' +
  'function avecNeutre(o){var r={},k;for(k in NEUTRE)r[k]=NEUTRE[k];for(k in o)r[k]=o[k];return r;}\n' +
  'function creer(){if(socle)return;\n' +
  ' socle=document.createElement("div");socle.style.cssText="all:initial";\n' +
  ' poser(socle,avecNeutre({position:"fixed",left:"0",top:"0",right:"0",bottom:"0",\n' +
  '  "pointer-events":"none","z-index":"2147483647"}));\n' +
  ' etiquette=document.createElement("div");etiquette.style.cssText="all:initial";\n' +
  ' poser(etiquette,avecNeutre({position:"fixed",display:"none",padding:"2px 7px","border-radius":"5px",\n' +
  '  background:"#4560e0",color:"#fff","font-family":"Consolas,monospace","font-size":"11px",\n' +
  '  "font-weight":"600","line-height":"1.5","white-space":"nowrap",\n' +
  '  "box-shadow":"0 2px 8px rgba(0,0,0,.3)"}));\n' +
  ' socle.appendChild(etiquette);\n' +
  ' (document.body||document.documentElement).appendChild(socle);}\n' +
  'function boite(k){while(boites.length<=k){var b=document.createElement("div");\n' +
  ' b.style.cssText="all:initial";\n' +
  ' poser(b,avecNeutre({position:"fixed",display:"none",background:"rgba(79,109,245,.16)",\n' +
  '  outline:"2px solid #4560e0","outline-offset":"-1px","border-radius":"2px"}));\n' +
  ' socle.insertBefore(b,etiquette);boites.push(b);}return boites[k];}\n' +
  'function effacer(){for(var k=0;k<boites.length;k++)poser(boites[k],{display:"none"});\n' +
  ' if(etiquette)poser(etiquette,{display:"none"});vus=[];}\n' +
  'function dessiner(){creer();var visibles=[];\n' +
  ' for(var k=0;k<vus.length&&visibles.length<40;k++){var r=vus[k].getBoundingClientRect();\n' +
  '  if(r.width||r.height)visibles.push({e:vus[k],r:r});}\n' +
  ' for(var k=0;k<Math.max(visibles.length,boites.length);k++){var b=boite(k);\n' +
  '  if(k>=visibles.length){poser(b,{display:"none"});continue;}\n' +
  '  var r=visibles[k].r;\n' +
  '  poser(b,{display:"block",left:r.left+"px",top:r.top+"px",width:r.width+"px",height:r.height+"px"});}\n' +
  ' if(!visibles.length){poser(etiquette,{display:"none"});return;}\n' +
  ' var p=visibles[0].r,nom="<"+visibles[0].e.tagName.toLowerCase()+">";\n' +
  ' if(vus.length>1)nom+=" \\u00d7 "+vus.length;\n' +
  ' etiquette.textContent=nom;\n' +
  ' poser(etiquette,{display:"block",left:Math.max(2,Math.min(p.left,innerWidth-120))+"px",\n' +
  '  top:(p.top>22?p.top-21:Math.min(p.bottom+3,innerHeight-20))+"px"});}\n' +
  'function viser(liste){vus=[];for(var k=0;k<liste.length;k++)vus.push(liste[k]);\n' +
  ' if(!vus.length){effacer();return;}\n' +
  ' var r=vus[0].getBoundingClientRect();\n' +
  ' if(r.bottom<0||r.top>innerHeight)vus[0].scrollIntoView({block:"center"});\n' +
  ' dessiner();}\n' +
  'addEventListener("message",function(e){var d=e.data;if(!d||!d.__aac)return;\n' +
  ' if(d.__aac==="effacer"){effacer();return;}\n' +
  ' if(d.__aac==="ligne"){viser(document.querySelectorAll(\'[data-aac-l="\'+d.ligne+\'"]\'));return;}\n' +
  ' if(d.__aac==="selecteur"){try{viser(document.querySelectorAll(d.sel));}catch(x){effacer();}}});\n' +
  'addEventListener("scroll",function(){if(vus.length)dessiner();},true);\n' +
  'addEventListener("resize",function(){if(vus.length)dessiner();});\n' +
  'document.addEventListener("mouseover",function(e){\n' +
  ' var el=e.target&&e.target.closest?e.target.closest("[data-aac-l]"):null;if(!el)return;\n' +
  ' viser([el]);\n' +
  ' try{parent.postMessage({__bac:1,genre:"survol",ligne:+el.getAttribute("data-aac-l")},"*");}catch(x){}});\n' +
  'document.addEventListener("mouseout",function(e){if(e.relatedTarget)return;effacer();\n' +
  ' try{parent.postMessage({__bac:1,genre:"survol",ligne:0},"*");}catch(x){}});\n' +
  '})();<\/script>';

// Assemble les trois zones en une page complète, avec un pont qui renvoie
// les console.log et les erreurs vers la console du bac à sable.
function pageComplete(p, avecPont) {
  // Le marquage des lignes ne sert qu'à l'aperçu : la page exportée ou ouverte
  // dans un onglet reste exactement le code de l'utilisateur.
  const corps = avecPont ? annoterLignes(p.html) : p.html;
  const tete = '<!DOCTYPE html>\n<html lang="fr">\n<head>\n<meta charset="UTF-8">\n<title>' +
    echapper(bac.courant || 'Ma page') + '</title>\n<style>\n' + p.css + '\n</style>\n</head>\n<body>\n' +
    corps + '\n';

  if (!avecPont) return tete + '<script>\n' + p.js + '\n<\/script>\n</body>\n</html>';

  // Le pont capture console.log et les erreurs pour les renvoyer à la console
  // du bac à sable. Les numéros de ligne sont recalés sur l'éditeur JavaScript
  // de l'utilisateur, pas sur la page assemblée.
  const pont = '<script>(function(){\n' +
    'var DECALAGE=__DECALAGE__;\n' +
    'function envoyer(genre,texte){try{parent.postMessage({__bac:1,genre:genre,texte:texte},"*");}catch(e){}}\n' +
    'function joindre(args){return Array.prototype.map.call(args,function(v){' +
    'try{return (typeof v==="object"&&v!==null)?JSON.stringify(v):String(v);}catch(e){return String(v);}}).join(" ");}\n' +
    'var vrai=console.log;console.log=function(){envoyer("log",joindre(arguments));vrai.apply(console,arguments);};\n' +
    'var vraiErr=console.error;console.error=function(){envoyer("err",joindre(arguments));vraiErr.apply(console,arguments);};\n' +
    'window.onerror=function(m,s,l){var n=l-DECALAGE;envoyer("err",m+(n>0?" (ligne "+n+" de ton JavaScript)":""));return false;};\n' +
    '})();<\/script>';

  const prefixe = tete + pont + CALQUE_REPERAGE + '<script>\n';
  const decalage = prefixe.split('\n').length - 1;   // lignes avant la 1re ligne de JS
  return prefixe.replace('__DECALAGE__', decalage) + p.js + '\n<\/script>\n</body>\n</html>';
}

// Un seul écouteur global pour tous les messages venant de l'aperçu
let pontInstalle = false;
function installerPont() {
  if (pontInstalle) return;
  pontInstalle = true;
  window.addEventListener('message', e => {
    if (!e.data || !e.data.__bac) return;
    // La souris se promène dans l'aperçu : on éclaire la ligne correspondante.
    if (e.data.genre === 'survol') { viserLigneCode(e.data.ligne); return; }
    const zone = document.getElementById('console-bac');
    if (!zone) return;
    if (zone.querySelector('.vide')) zone.innerHTML = '';
    const ligne = document.createElement('div');
    if (e.data.genre === 'err') ligne.className = 'ligne-erreur';
    ligne.textContent = (e.data.genre === 'err' ? '⚠ ' : '') + e.data.texte;
    zone.appendChild(ligne);
  });
}

// Les trois fichiers de l'onglet « Page web ». Un seul est affiché à la fois :
// un grand éditeur vaut mieux que trois petits qu'il faut faire défiler.
const FICHIERS_WEB = [
  { cle: 'html', zone: 'bs-html', nom: 'HTML', role: 'la structure : les mots et les blocs de ta page' },
  { cle: 'css', zone: 'bs-css', nom: 'CSS', role: 'l\'apparence : couleurs, tailles, disposition' },
  { cle: 'js', zone: 'bs-js', nom: 'JavaScript', role: 'le comportement : ce qui bouge et réagit' }
];

function rendreBac() {
  vueCourante = 'atelier';
  rendreSidebar(null);
  installerPont();
  const p = projetCourant();
  const mode = ['python', 'sql', 'c', 'java'].indexOf(bac.onglet) !== -1 ? bac.onglet : 'web';
  const web = mode === 'web';
  if (!FICHIERS_WEB.some(f => f.cle === bac.fichier)) bac.fichier = 'html';

  // ---- Bandeau : le projet ouvert et ce qu'on peut en faire
  let html = '<div class="atelier-tete">' +
    '<div class="atelier-titre"><span class="atelier-puce">🧪</span>' +
    '<b>Ton atelier</b><em>écris ce que tu veux : rien n\'est corrigé, rien n\'est noté</em></div>' +
    '<div class="atelier-projet">' +
    '<label class="bac-etiquette" for="bac-projet">Projet</label>' +
    '<select id="bac-projet" class="bac-select" onchange="changerProjet(this.value)">';
  for (const nom of Object.keys(bac.projets)) {
    html += '<option value="' + echapperAttr(nom) + '"' + (nom === bac.courant ? ' selected' : '') + '>' + echapper(nom) + '</option>';
  }
  html += '</select>' +
    '<button class="btn btn-secondaire btn-mini" onclick="ouvrirNouveauProjet()">➕ Nouveau</button>' +
    '<button class="btn btn-secondaire btn-mini" onclick="supprimerProjet()">🗑 Supprimer</button>' +
    '<button class="btn btn-secondaire btn-mini" onclick="exporterProjet()" title="Télécharger un fichier que tu peux ouvrir seul">⬇ Exporter</button>' +
    '<button class="btn btn-secondaire btn-mini" id="btn-plein" onclick="basculerPleinEcran()" title="Masquer le menu de gauche pour coder sur tout l\'écran (Échap pour revenir)">' +
    (bac.plein ? '⛶ Quitter le plein écran' : '⛶ Plein écran') + '</button>' +
    '</div></div>';

  // ---- Choix du langage
  html += '<div class="bac-onglets atelier-langues">' +
    '<button class="bac-onglet' + (mode === 'web' ? ' actif' : '') + '" onclick="changerOngletBac(\'web\')">🌐 Page web</button>' +
    '<button class="bac-onglet' + (mode === 'python' ? ' actif' : '') + '" onclick="changerOngletBac(\'python\')">🐍 Python</button>' +
    '<button class="bac-onglet' + (mode === 'sql' ? ' actif' : '') + '" onclick="changerOngletBac(\'sql\')">🗄 SQL</button>' +
    '<button class="bac-onglet' + (mode === 'c' ? ' actif' : '') + '" onclick="changerOngletBac(\'c\')">🔧 C</button>' +
    '<button class="bac-onglet' + (mode === 'java' ? ' actif' : '') + '" onclick="changerOngletBac(\'java\')">☕ Java</button>' +
    '</div>';

  html += '<div id="bac-nouveau" class="bac-nouveau"></div>';

  // ---- L'atelier : le code à gauche, ce qu'il produit à droite
  html += '<div class="atelier-plan"><section class="atelier-code">';

  if (web) {
    html += '<div class="atelier-barre"><div class="fichiers-onglets">';
    for (const f of FICHIERS_WEB) {
      html += '<button class="fichier-onglet' + (f.cle === bac.fichier ? ' actif' : '') +
        '" data-fichier="' + f.cle + '" onclick="changerFichierBac(\'' + f.cle + '\')">' + f.nom + '</button>';
    }
    html += '</div><span class="atelier-role" id="atelier-role">' +
      echapper(FICHIERS_WEB.find(f => f.cle === bac.fichier).role) + '</span>' +
      '<span class="editeur-astuce" id="astuce-atelier" role="status"></span>' +
      boutonLancer() + '</div><div class="atelier-editeurs">';
    for (const f of FICHIERS_WEB) {
      html += '<div class="pane-fichier' + (f.cle === bac.fichier ? ' actif' : '') + '" data-fichier="' + f.cle + '">' +
        cadreAtelier(f.zone, f.nom, p[f.cle]) + '</div>';
    }
    html += '</div>';
  } else {
    const fiche = {
      python: { zone: 'bs-py', nom: 'Python', fichier: 'script.py', valeur: p.py },
      c: { zone: 'bs-c', nom: 'C', fichier: 'programme.c', valeur: p.c },
      java: { zone: 'bs-java', nom: 'Java', fichier: 'Programme.java', valeur: p.java },
      sql: { zone: 'bs-sql', nom: 'SQL', fichier: 'requete.sql', valeur: p.sql }
    }[mode];
    html += '<div class="atelier-barre"><span class="atelier-fichier">' + fiche.fichier + '</span>' +
      (mode === 'sql'
        ? '<span class="atelier-role">interroge la base de cinéma comme tu veux</span>' +
          '<button class="btn btn-secondaire btn-mini" onclick="reinitialiserBaseBac()" title="Annule tous tes INSERT, UPDATE et DELETE">↺ Réinitialiser la base</button>'
        : '<span class="atelier-role">ton programme ' + fiche.nom + '</span>') +
      '<span class="editeur-astuce" id="astuce-atelier" role="status"></span>' +
      boutonLancer() + '</div>' +
      '<div class="atelier-editeurs"><div class="pane-fichier actif">' +
      cadreAtelier(fiche.zone, fiche.nom, fiche.valeur) + '</div></div>';
  }

  html += '</section><section class="atelier-sortie">';

  if (web) {
    html += '<div class="sortie-bloc sortie-apercu">' +
      '<div class="etiquette-zone etiquette-barre">Aperçu' +
      '<button class="lien-discret" id="btn-apercu" onclick="ouvrirApercuOnglet()" title="Voir ta page en grand">⤢ Ouvrir dans un onglet</button>' +
      '</div>' +
      '<iframe id="apercu-bac" class="apercu apercu-plein" title="Aperçu de ta page"></iframe></div>' +
      '<div class="sortie-bloc sortie-console">' +
      '<div class="etiquette-zone">Console</div>' +
      '<div id="console-bac" class="console-sortie console-plein"><span class="vide">Les console.log de ton JavaScript s\'afficheront ici.</span></div></div>';
  } else if (mode === 'sql') {
    html += '<div id="schema-bac" class="atelier-schema">' + panneauTablesLive() + '</div>' +
      '<div class="sortie-bloc sortie-console">' +
      '<div class="etiquette-zone">Résultat</div>' +
      '<div id="resultat-bac" class="sql-resultat console-plein"><span class="vide">Clique sur « Lancer » pour exécuter ta requête.</span></div></div>';
  } else {
    html += '<div class="sortie-bloc sortie-console">' +
      '<div class="etiquette-zone">Ce que ton programme affiche</div>' +
      '<div id="console-bac" class="console-sortie console-plein"><span class="vide">Clique sur « Lancer » pour lancer ton programme.</span></div></div>';
  }

  html += '</section></div>';

  const cadre = document.getElementById('contenu');
  cadre.className = 'atelier';
  document.body.classList.toggle('plein-ecran', !!bac.plein);
  cadre.innerHTML = html;
  brancherEditeursBac();
  if (web) { brancherReperage(); lancerBac(); }
  window.scrollTo(0, 0);
  poserVue('Bac à sable', 'Bac à sable — éditeur libre, projet « ' + (projetCourant().nom || bac.courant) + ' »');
}

function boutonLancer() {
  return '<button class="btn btn-verifier btn-lancer" onclick="lancerBac()">▶ Lancer' +
    '<kbd class="raccourci">Ctrl+Entrée</kbd></button>';
}

// Éditeur de l'atelier : pas de barre propre (elle est mutualisée au-dessus),
// et il occupe toute la hauteur disponible.
function cadreAtelier(id, langue, valeur) {
  return '<div class="editeur-cadre editeur-plein">' +
    '<div class="editeur-zone">' +
    '<div class="editeur-lignes" id="lignes-' + id + '" aria-hidden="true"></div>' +
    '<textarea id="editeur-' + id + '" class="editeur editeur-atelier" spellcheck="false" ' +
    'aria-label="Éditeur ' + langue + '">' + echapper(valeur || '') + '</textarea>' +
    '</div></div>';
}

// Changer de fichier n'efface rien : les trois éditeurs restent en place, on
// n'en montre qu'un. L'aperçu et la console gardent ce qu'ils affichaient.
function changerFichierBac(cle) {
  const f = FICHIERS_WEB.find(x => x.cle === cle);
  if (!f) return;
  bac.fichier = cle;
  sauverBac();
  for (const pane of document.querySelectorAll('.pane-fichier')) {
    pane.classList.toggle('actif', pane.dataset.fichier === cle);
  }
  for (const bouton of document.querySelectorAll('.fichier-onglet')) {
    bouton.classList.toggle('actif', bouton.dataset.fichier === cle);
  }
  const role = document.getElementById('atelier-role');
  if (role) role.textContent = f.role;
  const editeur = document.getElementById('editeur-' + f.zone);
  if (editeur) { majLignes(f.zone); editeur.focus(); }
}

// Plein écran : le menu de gauche s'efface, l'atelier prend tout l'écran.
// On ne re-rend rien, l'aperçu et la console gardent leur contenu.
function basculerPleinEcran() {
  bac.plein = !bac.plein;
  sauverBac();
  document.body.classList.toggle('plein-ecran', bac.plein);
  const b = document.getElementById('btn-plein');
  if (b) b.textContent = bac.plein ? '⛶ Quitter le plein écran' : '⛶ Plein écran';
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && bac.plein && vueCourante === 'atelier') basculerPleinEcran();
});

// Voir sa page en grand. D'abord un vrai onglet du navigateur : c'est la page
// telle qu'elle serait publiée, sans le cadre de l'atelier autour. Si le
// navigateur bloque l'ouverture d'onglets, on l'agrandit sur place — le bouton
// aboutit toujours à quelque chose.
function ouvrirApercuOnglet() {
  const plan = document.querySelector('.atelier-plan');
  if (plan && plan.classList.contains('plan-apercu')) { grandApercu(false); return; }

  let fenetre = null;
  try { fenetre = window.open('', '_blank'); } catch (e) {}
  if (fenetre && fenetre.document) {
    fenetre.document.open();
    fenetre.document.write(pageComplete(projetCourant(), false));
    fenetre.document.close();
    return;
  }
  grandApercu(true);
}

function grandApercu(actif) {
  const plan = document.querySelector('.atelier-plan');
  if (!plan) return;
  plan.classList.toggle('plan-apercu', actif);
  const b = document.getElementById('btn-apercu');
  if (b) b.textContent = actif ? '↩ Revenir au code' : '⤢ Ouvrir dans un onglet';
}


const ZONES_BAC = { 'bs-html': 'html', 'bs-css': 'css', 'bs-js': 'js', 'bs-py': 'py', 'bs-sql': 'sql', 'bs-c': 'c', 'bs-java': 'java' };

function brancherEditeursBac() {
  for (const id in ZONES_BAC) {
    const editeur = document.getElementById('editeur-' + id);
    if (!editeur) continue;
    const champ = ZONES_BAC[id];
    const pas = ['py', 'c', 'java'].indexOf(champ) !== -1 ? '    ' : '  ';
    // Une seule astuce pour les éditeurs de l'atelier : ils partagent la barre
    // du haut, et un seul volet est visible à la fois.
    brancherClavierEditeur(editeur, pas, 'astuce-atelier', () => majLignes(id), lancerBac);
    editeur.addEventListener('input', function () {
      projetCourant()[champ] = this.value;
      sauverBac();
      majLignes(id);
    });
    editeur.addEventListener('scroll', function () {
      const g = document.getElementById('lignes-' + id);
      if (g) g.scrollTop = this.scrollTop;
    });
    attacherEditeur(editeur, champ);
    majLignes(id);
  }
}

// ---- Repérage, côté atelier ----
// Survoler une ligne de HTML éclaire l'élément dans l'aperçu ; survoler une
// règle CSS éclaire tout ce qu'elle touche. C'est ce qui rend visible le lien
// entre « ce que j'écris » et « ce que je vois ».
// Une ligne de code peut revenir à la ligne : diviser par la hauteur de ligne
// donnerait un mauvais numéro. On lit la gouttière, dont les hauteurs sont
// justement calées sur les lignes réelles.
function ligneSousLaSouris(editeur, gouttiere, e) {
  if (!gouttiere || !gouttiere.children.length) return 0;
  const style = getComputedStyle(editeur);
  const rect = editeur.getBoundingClientRect();
  const y = e.clientY - rect.top - parseFloat(style.paddingTop) + editeur.scrollTop;
  if (y < 0) return 0;
  let cumul = 0;
  for (let k = 0; k < gouttiere.children.length; k++) {
    cumul += gouttiere.children[k].getBoundingClientRect().height;
    if (y < cumul) return k + 1;
  }
  return 0;
}

function parlerAApercu(message) {
  const cadre = document.getElementById('apercu-bac');
  if (cadre && cadre.contentWindow) {
    try { cadre.contentWindow.postMessage(message, '*'); } catch (e) {}
  }
}

let ligneVisee = 0;
function viserDepuisCode(cle, ligne) {
  if (ligne === ligneVisee) return;
  ligneVisee = ligne;
  eclairerGouttiere(cle === 'html' ? ligne : 0);
  if (!ligne) { parlerAApercu({ __aac: 'effacer' }); return; }
  if (cle === 'html') { parlerAApercu({ __aac: 'ligne', ligne: ligne }); return; }
  const sel = selecteurDeLigne(projetCourant().css, ligne);
  parlerAApercu(sel ? { __aac: 'selecteur', sel: sel } : { __aac: 'effacer' });
}

// Sens inverse : la souris est dans l'aperçu, on éclaire la ligne de HTML.
function viserLigneCode(ligne) {
  eclairerGouttiere(bac.fichier === 'html' ? ligne : 0);
}

function eclairerGouttiere(ligne) {
  const gouttiere = document.getElementById('lignes-bs-html');
  if (!gouttiere) return;
  const ancienne = gouttiere.querySelector('.ligne-visee');
  if (ancienne) ancienne.classList.remove('ligne-visee');
  const cible = ligne ? gouttiere.children[ligne - 1] : null;
  if (cible) cible.classList.add('ligne-visee');
}

function brancherReperage() {
  for (const f of FICHIERS_WEB) {
    if (f.cle === 'js') continue;          // le JavaScript ne dessine rien de repérable
    const editeur = document.getElementById('editeur-' + f.zone);
    const gouttiere = document.getElementById('lignes-' + f.zone);
    if (!editeur) continue;
    editeur.addEventListener('mousemove', function (e) { viserDepuisCode(f.cle, ligneSousLaSouris(this, gouttiere, e)); });
    editeur.addEventListener('mouseleave', function () { viserDepuisCode(f.cle, 0); });
  }
}

function lancerBac() {
  const p = projetCourant();
  const zone = document.getElementById('console-bac');

  if (bac.onglet === 'sql') {
    const sortie = document.getElementById('resultat-bac');
    const res = executerSQL(p.sql, baseAtelier());
    if (sortie) sortie.innerHTML = tableauResultat(res);
    // une modification change la base : le panneau doit suivre
    const panneau = document.getElementById('schema-bac');
    if (panneau && res.type && res.type !== 'select') panneau.innerHTML = panneauTablesLive();
    return;
  }

  if (bac.onglet === 'c' || bac.onglet === 'java') {
    const src = bac.onglet === 'c' ? p.c : p.java;
    const res = executerCJ(bac.onglet, src);
    if (zone) {
      let html = '';
      for (const ligne of res.logs) html += echapper(ligne) + '\n';
      if (res.erreur) html += '<span class="ligne-erreur">⚠ ' + messageLisible(res.erreur) + '</span>';
      if (!html) html = '<span class="vide">(ton programme n\'a rien affiché)</span>';
      zone.innerHTML = html;
    }
    return;
  }

  if (bac.onglet === 'python') {
    if (zone) zone.innerHTML = '<span class="vide">Exécution en cours…</span>';
    executerPython(p.py, res => {
      if (!zone) return;
      let html = '';
      for (const l of res.logs) html += echapper(l) + '\n';
      if (res.erreur) html += '<span class="ligne-erreur">⚠ Erreur : ' + echapper(res.erreur) + '</span>';
      if (!html) html = '<span class="vide">(ton programme n\'a rien affiché — utilise print pour voir quelque chose)</span>';
      zone.innerHTML = html;
    });
  } else {
    if (zone) zone.innerHTML = '<span class="vide">Les console.log de ton JavaScript s\'afficheront ici.</span>';
    const cadre = document.getElementById('apercu-bac');
    if (cadre) cadre.srcdoc = pageComplete(p, true);
    // L'aperçu repart de zéro : sans ça, re-survoler la même ligne qu'avant
    // ne ferait rien, le repérage se croyant déjà sur cette ligne.
    ligneVisee = 0;
  }
}

function changerOngletBac(nom) {
  bac.onglet = nom;
  sauverBac();
  rendreBac();
}

function changerProjet(nom) {
  if (!bac.projets[nom]) return;
  bac.courant = nom;
  sauverBac();
  rendreBac();
}

function ouvrirNouveauProjet() {
  const zone = document.getElementById('bac-nouveau');
  if (!zone) return;
  if (zone.classList.contains('ouvert')) { zone.classList.remove('ouvert'); zone.innerHTML = ''; return; }
  let html = '<div class="bac-nouveau-corps">' +
    '<label class="bac-etiquette" for="bac-nom">Nom du projet</label>' +
    '<input id="bac-nom" class="bac-input" type="text" value="' + echapperAttr(nomLibre('Nouveau projet')) + '" spellcheck="false">' +
    '<div class="etiquette-zone" style="margin:16px 0 8px">Partir de</div>' +
    '<div class="bac-modeles">';
  for (const cle in MODELES) {
    html += '<button class="bac-modele" onclick="validerNouveauProjet(\'' + cle + '\')">' +
      '<strong>' + echapper(MODELES[cle].nom) + '</strong>' +
      '<span>' + echapper(MODELES[cle].desc) + '</span></button>';
  }
  html += '</div></div>';
  zone.innerHTML = html;
  zone.classList.add('ouvert');
  const champ = document.getElementById('bac-nom');
  if (champ) { champ.focus(); champ.select(); }
}

function validerNouveauProjet(modele) {
  const champ = document.getElementById('bac-nom');
  const nom = (champ && champ.value.trim()) || 'Nouveau projet';
  creerProjet(nom, modele);
  rendreBac();
}

function supprimerProjet() {
  const noms = Object.keys(bac.projets);
  if (noms.length <= 1) {
    alert('C\'est ton seul projet — crée-en un autre avant de supprimer celui-ci.');
    return;
  }
  if (!confirm('Supprimer définitivement le projet « ' + bac.courant + ' » ?\nCette action est irréversible.')) return;
  delete bac.projets[bac.courant];
  bac.courant = Object.keys(bac.projets)[0];
  sauverBac();
  rendreBac();
}

// Télécharge le projet : une page .html autonome, ou un script .py
function exporterProjet() {
  const p = projetCourant();
  const SOURCES = { python: [p.py, '.py'], sql: [p.sql, '.sql'], c: [p.c, '.c'], java: [p.java, '.java'] };
  const choix = SOURCES[bac.onglet];
  const contenu = choix ? choix[0] : pageComplete(p, false);
  const extension = choix ? choix[1] : '.html';
  const texteSimple = extension !== '.html';
  const nomFichier = String(bac.courant || 'projet').replace(/[^a-zA-Z0-9à-ÿ _-]/g, '').trim().replace(/\s+/g, '-') + extension;
  try {
    const lien = document.createElement('a');
    lien.href = URL.createObjectURL(new Blob([contenu], { type: texteSimple ? 'text/plain;charset=utf-8' : 'text/html;charset=utf-8' }));
    lien.download = nomFichier;
    document.body.appendChild(lien);
    lien.click();
    document.body.removeChild(lien);
    setTimeout(() => URL.revokeObjectURL(lien.href), 4000);
  } catch (e) {
    alert('Le téléchargement a été refusé par le navigateur.\nTu peux toujours sélectionner ton code et le copier à la main.');
  }
}

// Depuis un exercice : « Continuer dans le bac à sable »
function versBacASable(i) {
  const ex = exercicesDe(leconCourante)[i];
  const code = document.getElementById('editeur-' + i).value;
  const nom = creerProjet('Exercice — ' + leconCourante.titre, 'vide');
  const p = bac.projets[nom];
  if (ex.type === 'py') { p.py = code; bac.onglet = 'python'; }
  else if (ex.type === 'c') { p.c = code; bac.onglet = 'c'; }
  else if (ex.type === 'java') { p.java = code; bac.onglet = 'java'; }
  else if (ex.type === 'sql') { p.sql = code; bac.onglet = 'sql'; }
  else if (ex.type === 'js') { p.js = code; p.html = '<h1>Mon essai</h1>\n<p>Ouvre la console pour voir les résultats.</p>'; bac.onglet = 'web'; bac.fichier = 'js'; }
  else { p.html = code; p.css = ''; p.js = ''; bac.onglet = 'web'; bac.fichier = 'html'; }
  sauverBac();
  allerBac();
}

function allerBac() {
  location.hash = 'atelier';
  fermerNavMobile();
  rendreBac();
}

// ---- Encyclopédie ----
let ongletMemo = 'html';
let rechercheMemo = '';

function echapperAttr(t) { return echapper(t).replace(/"/g, '&quot;'); }

// Accents et majuscules ignorés : « elem » doit trouver « élément »
function normaliser(t) {
  return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// ---- Index de recherche ----
// Chaque ligne de tableau, définition ou bloc de code devient une entrée
// autonome : on renvoie l'information précise, pas « c'est quelque part
// dans l'onglet CSS ». Construit une seule fois, à la première recherche.
let indexMemos = null;

/* Découpe un contenu HTML en entrées autonomes — une ligne de tableau, une
   définition, un bloc de code — et passe chacune à `faire`. Les mémos et les
   leçons ont la même forme : autant les découper au même endroit. */
function decouperEnEntrees(html, faire) {
  const boite = document.createElement('div');
  boite.innerHTML = html;
  let section = '';
  boite.querySelectorAll('h2, h3, tr, li, p, .bloc-code').forEach(el => {
    if (el.tagName === 'H2' || el.tagName === 'H3') { section = el.textContent.trim(); return; }
    if (el.tagName === 'TR' && el.querySelector('th')) return;      // ligne d'en-tête
    if (el.closest('li') && el.tagName === 'P') return;             // évite les doublons
    const texte = el.textContent.replace(/\s+/g, ' ').trim();
    if (texte.length < 3) return;
    faire({
      genre: el.tagName === 'TR' ? 'ligne' : (el.classList.contains('bloc-code') ? 'code' : 'texte'),
      cellules: el.tagName === 'TR' ? [...el.children].map(c => c.innerHTML) : null,
      html: el.innerHTML,
      texte,
      section
    });
  });
}

function construireIndex() {
  if (indexMemos) return indexMemos;
  indexMemos = [];

  // 1) Les titres de leçons : retrouver un cours par mot-clé
  for (const mod of MODULES) {
    mod.lecons.forEach((lecon, i) => {
      indexMemos.push({
        genre: 'lecon',
        ou: 'lecon',
        cible: lecon.id,
        source: mod.titre,
        section: 'Leçon ' + (i + 1),
        cellules: null,
        html: lecon.titre,
        texte: lecon.titre,
        cle: normaliser(lecon.titre),
        cleContexte: normaliser(mod.titre)
      });
    });
  }

  // 2) Le contenu de l'encyclopédie, découpé en entrées
  for (const memo of DATA_MEMOS) {
    decouperEnEntrees(memo.contenu, e => {
      indexMemos.push({
        genre: e.genre, ou: 'memo', cible: memo.id,
        source: memo.titre, section: e.section,
        cellules: e.cellules, html: e.html, texte: e.texte,
        cle: normaliser(e.texte),
        cleContexte: normaliser(memo.titre + ' ' + e.section)
      });
    });
  }

  /* 3) Le CORPS des leçons. Sans lui, chercher « boucle for » ne ramenait que
        les titres qui contiennent ces mots — jamais le paragraphe qui les
        explique. C'est pourtant ce paragraphe qu'on cherche. */
  for (const mod of MODULES) {
    for (const lecon of mod.lecons) {
      if (!lecon.contenu) continue;
      decouperEnEntrees(lecon.contenu, e => {
        indexMemos.push({
          genre: e.genre, ou: 'lecon', cible: lecon.id,
          source: lecon.titre, section: e.section,
          cellules: e.cellules, html: e.html, texte: e.texte,
          cle: normaliser(e.texte),
          cleContexte: normaliser(mod.titre + ' ' + lecon.titre + ' ' + e.section)
        });
      });
    }
  }
  return indexMemos;
}

function chercherDansMemos(requete) {
  const mots = normaliser(requete).split(/\s+/).filter(Boolean);
  if (!mots.length) return [];
  const candidats = [];
  for (const e of construireIndex()) {
    let touches = 0, score = 0;
    for (const m of mots) {
      const pos = e.cle.indexOf(m);
      if (pos !== -1) {
        touches++;
        // Un mot entier vaut bien plus qu'une syllabe prise au milieu d'un
        // autre mot — sans ça, « flex » remonterait « réflexe ».
        if (pos === 0) score += 12;
        else if (/[^a-z0-9]/.test(e.cle[pos - 1])) score += 7;
        else score += 1;
      } else if (e.cleContexte.includes(m)) {
        touches++;              // trouvé dans le titre du mémo ou de la section
        score += 3;
      }
    }
    if (!touches) continue;
    if (e.genre === 'lecon') score += 8;
    if (e.genre === 'ligne') score += 4;
    score -= Math.min(6, e.texte.length / 120);   // les entrées courtes sont plus précises
    candidats.push({ e, touches, score });
  }
  if (!candidats.length) return [];

  // On garde les entrées qui couvrent le plus de mots de la requête. Faute
  // d'entrée contenant tout, on affiche les meilleures partielles plutôt
  // que de répondre « aucun résultat ».
  const meilleur = Math.max(...candidats.map(c => c.touches));
  return candidats
    .filter(c => c.touches === meilleur)
    .sort((a, b) => b.score - a.score)
    .map(c => c.e);
}

// Entoure les termes trouvés de <mark>, en ne touchant qu'au texte
// (jamais aux balises, sinon le HTML de l'entrée serait cassé)
function surligner(racine, requete) {
  const mots = normaliser(requete).split(/\s+/).filter(Boolean);
  if (!mots.length) return;
  const marcheur = document.createTreeWalker(racine, NodeFilter.SHOW_TEXT);
  const noeuds = [];
  while (marcheur.nextNode()) noeuds.push(marcheur.currentNode);

  for (const noeud of noeuds) {
    const brut = noeud.nodeValue;
    const cle = normaliser(brut);
    const plages = [];
    for (const m of mots) {
      let i = cle.indexOf(m);
      while (i !== -1) { plages.push([i, i + m.length]); i = cle.indexOf(m, i + m.length); }
    }
    if (!plages.length) continue;
    plages.sort((a, b) => a[0] - b[0]);
    const fusion = [];
    for (const p of plages) {
      const dernier = fusion[fusion.length - 1];
      if (dernier && p[0] <= dernier[1]) dernier[1] = Math.max(dernier[1], p[1]);
      else fusion.push([p[0], p[1]]);
    }
    const frag = document.createDocumentFragment();
    let pos = 0;
    for (const [d, f] of fusion) {
      if (d > pos) frag.appendChild(document.createTextNode(brut.slice(pos, d)));
      const marque = document.createElement('mark');
      marque.textContent = brut.slice(d, f);
      frag.appendChild(marque);
      pos = f;
    }
    if (pos < brut.length) frag.appendChild(document.createTextNode(brut.slice(pos)));
    noeud.parentNode.replaceChild(frag, noeud);
  }
}

const MAX_RESULTATS = 60;

function rendreMemos(onglet) {
  vueCourante = 'memos';
  if (onglet) ongletMemo = onglet;
  rendreSidebar(null);

  let html = '<h1 class="titre-lecon">📚 Encyclopédie</h1>' +
    '<p class="memo-intro">Références, mémos et culture générale du code — à consulter à tout moment, pendant et après les leçons.</p>' +
    '<div class="memo-recherche">' +
    '<span class="loupe" aria-hidden="true">🔎</span>' +
    '<input type="search" id="memo-recherche" autocomplete="off" spellcheck="false"' +
    ' placeholder="Rechercher une balise, une propriété, une erreur, une leçon…"' +
    ' aria-label="Rechercher dans l\'encyclopédie" value="' + echapperAttr(rechercheMemo) + '">' +
    '<button class="btn-effacer" id="memo-effacer" onclick="effacerRecherche()" aria-label="Effacer la recherche">✕</button>' +
    '</div>' +
    '<div class="memo-onglets" id="memo-onglets">';
  for (const m of DATA_MEMOS) {
    html += '<button class="memo-onglet" data-memo="' + m.id + '" onclick="choisirOngletMemo(\'' + m.id + '\')">' + m.titre + '</button>';
  }
  html += '</div><div id="memo-zone"></div>';

  document.getElementById('contenu').className = '';
  document.body.classList.remove('plein-ecran');
  document.getElementById('contenu').innerHTML = html;

  const champ = document.getElementById('memo-recherche');
  champ.addEventListener('input', function () { rechercheMemo = this.value; majZoneMemo(); });
  champ.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && this.value) { e.stopPropagation(); effacerRecherche(); }
  });

  majZoneMemo();
  window.scrollTo(0, 0);
  poserVue('Encyclopédie', 'Encyclopédie — mémos, glossaire et recherche');
}

function choisirOngletMemo(id) {
  ongletMemo = id;
  rechercheMemo = '';
  const champ = document.getElementById('memo-recherche');
  if (champ) champ.value = '';
  majZoneMemo();
  window.scrollTo(0, 0);
}

function effacerRecherche() {
  rechercheMemo = '';
  const champ = document.getElementById('memo-recherche');
  if (champ) { champ.value = ''; champ.focus(); }
  majZoneMemo();
}

function majZoneMemo() {
  const zone = document.getElementById('memo-zone');
  if (!zone) return;
  const requete = rechercheMemo.trim();
  const enRecherche = requete.length >= 2;

  const effacer = document.getElementById('memo-effacer');
  if (effacer) effacer.style.display = requete ? 'grid' : 'none';

  document.querySelectorAll('#memo-onglets .memo-onglet').forEach(b => {
    b.classList.toggle('actif', !enRecherche && b.dataset.memo === ongletMemo);
  });

  if (!enRecherche) {
    const memo = DATA_MEMOS.find(m => m.id === ongletMemo) || DATA_MEMOS[0];
    zone.innerHTML = '<div class="contenu-lecon large">' + memo.contenu + '</div>';
    ajouterBoutonsCopie();
    envelopperTableaux();
    return;
  }

  const resultats = chercherDansMemos(requete);
  if (!resultats.length) {
    zone.innerHTML = '<div class="memo-vide"><strong>Aucun résultat pour « ' + echapper(requete) + ' »</strong>' +
      'Essaie un mot plus court, ou le nom exact de ce que tu cherches : ' +
      '<code>flex</code>, <code>input</code>, <code>let</code>, <code>boucle</code>.</div>';
    return;
  }

  const montres = resultats.slice(0, MAX_RESULTATS);
  let html = '<div class="memo-compte"><strong>' + resultats.length + '</strong> ' +
    (resultats.length > 1 ? 'résultats' : 'résultat') + ' pour « ' + echapper(requete) + ' »' +
    (resultats.length > MAX_RESULTATS ? ' — les ' + MAX_RESULTATS + ' plus pertinents sont affichés' : '') +
    '</div><div class="resultats">';

  montres.forEach((e, i) => {
    let corps;
    if (e.genre === 'ligne' && e.cellules) {
      corps = '<code class="resultat-cle">' + e.cellules[0] + '</code>';
      if (e.cellules[1]) corps += '<div>' + e.cellules[1] + '</div>';
      if (e.cellules[2]) corps += '<span class="resultat-exemple">' + e.cellules[2] + '</span>';
    } else if (e.genre === 'code') {
      corps = '<pre class="bloc-code">' + e.html + '</pre>';
    } else {
      corps = '<div>' + e.html + '</div>';
    }
    html += '<div class="resultat" data-i="' + i + '" tabindex="0" role="button">' +
      '<div class="resultat-source">' +
      (e.ou === 'lecon' ? '<span class="ou">Leçon</span><span class="sep">›</span>' : '') +
      '<span>' + echapper(e.source) + '</span>' +
      (e.section ? '<span class="sep">›</span><span>' + echapper(e.section) + '</span>' : '') +
      '</div><div class="resultat-corps">' + corps + '</div></div>';
  });
  html += '</div>';
  zone.innerHTML = html;

  // Surlignage + navigation (clic et clavier)
  zone.querySelectorAll('.resultat').forEach(el => {
    surligner(el.querySelector('.resultat-corps'), requete);
    const e = montres[+el.dataset.i];
    // `genre` dit comment AFFICHER l'entrée, `ou` dit où elle MÈNE : un bloc
    // de code peut venir d'un mémo comme d'une leçon.
    const aller = () => { if (e.ou === 'lecon') allerLecon(e.cible); else choisirOngletMemo(e.cible); };
    el.addEventListener('click', aller);
    el.addEventListener('keydown', ev => {
      if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); aller(); }
    });
  });
}

// ---- Démarrage ----
(function demarrer() {
  majBoutonsTheme();
  const h = location.hash.replace('#', '');
  if (h === 'memos') rendreMemos('html');
  else if (h === 'reviser') rendreRevision();
  else if (h === 'atelier') rendreBac();
  else if (h && trouverLecon(h)) rendreLecon(h);
  else rendreAccueil();
})();
