/* =========================================================================
   verifier-contenu.js — le garde-fou du contenu pédagogique
   =========================================================================

   POURQUOI CET OUTIL EXISTE
   -------------------------
   La valeur de ce logiciel, ce ne sont pas les 8 000 lignes de moteur : ce
   sont les 165 leçons et les 481 exercices. Or un exercice est CORRECT quand
   son correcteur `verifier()` accepte la solution qu'on propose juste à
   côté. Les deux sont du code, écrits à la main, souvent le même jour : une
   faute de frappe dans l'un ou dans l'autre n'empêche PAS la page de
   s'afficher. Elle fait pire — elle félicite l'élève pour un mauvais code,
   ou le bloque sur une bonne réponse. Personne ne le voit avant l'élève.

   Cet outil rejoue, pour chaque exercice, SA solution officielle dans LE
   MÊME moteur que l'application, puis demande au correcteur ce qu'il en
   pense. Et, pour attraper les correcteurs trop indulgents, il leur
   présente aussi des solutions SABOTÉES : un correcteur qui accepte une
   réponse volontairement fausse est un correcteur qui ne corrige rien.

   UTILISATION
   -----------
       node outils/verifier-contenu.js            (depuis le dossier du projet)
       npm run verifier                           (même chose)
       node outils/verifier-contenu.js "C:\\chemin\\vers\\le\\projet"

   Aucune dépendance obligatoire : Node suffit (modules `fs`, `path`, `vm`).
   `jsdom` — déclaré dans package.json en dépendance de DÉVELOPPEMENT — est
   utilisé seulement s'il est installé, et seulement pour les exercices
   HTML/CSS. Le logiciel lui-même (index.html) n'a besoin de rien : on peut
   supprimer node_modules/ et package.json sans rien casser.
   Rien n'est écrit, rien n'est modifié : l'outil ne fait que LIRE.
   Code de sortie 0 si tout va bien, 1 s'il y a du rouge.

   CE QUI EST JUGÉ, ET CE QUI NE PEUT PAS L'ÊTRE
   ---------------------------------------------
   Aujourd'hui, 359 des 481 exercices sont rejoués ici (75 %) :
     jugés sans réserve    JS, SQL, C, Java (moteurs du projet), Python
                           (Skulpt), HTML/CSS dont le correcteur ne lit que
                           le DOM (jsdom).
     non jugés             les 63 exercices CSS qui interrogent la MISE EN
                           PAGE (largeur calculée, position, media queries) :
                           jsdom n'a pas de moteur de rendu, donc l'aperçu du
                           navigateur restera seul juge. Et les 59 QCM, dont
                           la mécanique (bonne réponse = un indice) est
                           vérifiée statiquement.
   Chaque exécution affiche ces nombres, pour qu'aucun trou ne s'oublie.

   DEUX PRÉCAUTIONS POUR NE PAS CRIER AU LOUP
   ------------------------------------------
   Le contrôle par copies sabotées ne relâche ses deux règles que la main
   forcée, parce qu'elles produisaient de fausses alertes (vérifié à la
   main sur ce contenu) :
     - une copie qui DONNE LE MÊME RÉSULTAT que la solution n'est pas une
       mauvaise réponse : elle est écartée du test (par exemple inverser un
       tri sur une requête qui ne renvoie qu'une ligne) ;
     - un correcteur qui RELIT LE CODE de l'élève pour en déduire ce qu'il
       attend n'est pas complaisant quand on lui présente un texte modifié :
       c'est l'exercice lui-même (« change le mot de passe pour tester »).
   Mettre AAC_DEBUG=1 dans l'environnement affiche, pour chaque correcteur
   douteux, les cibles visées et les copies présentées.
   ========================================================================= */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RACINE = process.argv[2] || '.';
const debut = Date.now();

if (!fs.existsSync(path.join(RACINE, 'app.js'))) {
  console.error('Dossier invalide : ' + RACINE + ' — app.js est introuvable.');
  console.error('Indique le dossier du projet en argument, ou lance l\'outil depuis ce dossier.');
  process.exit(2);
}

/* ---- 1. Un faux navigateur, le temps du diagnostic ----------------------
   Les fichiers du projet sont écrits pour un navigateur : ils commencent par
   « window.DATA_X = [...] ». On leur en fournit un, vide mais conforme, pour
   pouvoir les charger tels quels — sans les modifier, sans les copier.

   Volontairement PAS de `document` ici : app.js exécute le JavaScript de
   l'élève dans un Worker, qui n'en a pas non plus — et Skulpt, dès qu'il
   aperçoit un `document`, s'engage dans sa voie « navigateur » et réclame un
   vrai DOM (`document.createElement`) alors qu'on n'en a pas besoin pour
   interpréter du Python. Le `document` des exercices HTML/CSS, lui, est
   fabriqué par jsdom, page par page : c'est `ctx.doc` dans les correcteurs.
   -------------------------------------------------------------------------- */
function creerContexte() {
  const sb = {};
  sb.window = sb;
  sb.self = sb;
  sb.globalThis = sb;
  sb.console = { log() {}, error() {}, warn() {} };
  sb.setTimeout = setTimeout;
  sb.clearTimeout = clearTimeout;
  sb.setInterval = setInterval;
  sb.clearInterval = clearInterval;
  vm.createContext(sb);
  return sb;
}

function charger(sb, fichier) {
  const src = fs.readFileSync(path.join(RACINE, fichier), 'utf8');
  vm.runInContext(src, sb, { filename: fichier, timeout: 30000 });
}

const ctx = creerContexte();

// Les mêmes moteurs que ceux chargés par index.html, dans le même ordre :
// c'est ce qui rend le rejeu fidèle plutôt qu'approximatif.
['sql-moteur.js', 'moteur-cj.js'].forEach(f => charger(ctx, f));

/* ---- 2. Ce qu'on va accumuler au fil du contrôle ----------------------- */
const pb = [];    // problèmes certains : un invariant est violé
const notes = []; // points à regarder à la main, sans certitude
const stats = { lecons: 0, memos: 0, qcm: 0, exos: 0, types: {} };
const idsVus = new Map();

/* ---- 3. Inventaire : qui définit quoi ---------------------------------- */
const fichiersData = fs.readdirSync(RACINE).filter(f => /^data-.*\.js$/.test(f)).sort();
const lecons = [];         // { fichier, global, encyclopedie, lecon }
const globauxDefinis = []; // { fichier, global }

for (const fichier of fichiersData) {
  const avant = new Set(Object.keys(ctx));
  charger(ctx, fichier);
  const nouveaux = Object.keys(ctx).filter(k => !avant.has(k) && /^DATA_/.test(k));
  nouveaux.forEach(g => globauxDefinis.push({ fichier, global: g }));
  if (!nouveaux.length) {
    pb.push(fichier + ' : ce fichier ne définit aucun window.DATA_* — est-il complet ?');
    continue;
  }
  for (const g of nouveaux) {
    if (!Array.isArray(ctx[g])) { pb.push(fichier + ' : ' + g + ' n\'est pas un tableau de leçons.'); continue; }
    const encyclopedie = (g === 'DATA_MEMOS');   // mémos : pas un module de cours
    for (const lecon of ctx[g]) lecons.push({ fichier, global: g, encyclopedie, lecon });
  }
}
/* ---- 4. Les branchements : un fichier oublié est un fichier invisible ---
   Un data-*.js parfait mais absent de index.html ne s'affichera jamais, et
   rien ne plantera : le module aura simplement des leçons en moins. C'est le
   genre de trou qu'on ne remarque qu'en recomptant tout à la main.
   -------------------------------------------------------------------------- */
const htmlIndex = fs.readFileSync(path.join(RACINE, 'index.html'), 'utf8');
const sourcesChargees = [];
htmlIndex.replace(/<script[^>]*src="([^"]+)"/g, (m, src) => { sourcesChargees.push(src); return m; });

for (const f of fichiersData) {
  if (sourcesChargees.indexOf(f) === -1) pb.push(f + ' : présent sur le disque mais ABSENT de index.html (leçons invisibles)');
}
for (const src of sourcesChargees) {
  if (!fs.existsSync(path.join(RACINE, src))) pb.push('index.html charge « ' + src + ' » qui n\'existe pas');
}
// app.js doit lire chaque tableau de données, sinon le fichier est chargé pour rien
const srcApp = fs.readFileSync(path.join(RACINE, 'app.js'), 'utf8');
for (const d of globauxDefinis) {
  if (srcApp.indexOf(d.global) === -1 && d.global !== 'BASE_SQL') {
    pb.push(d.fichier + ' définit ' + d.global + ' que app.js ne lit jamais (module non branché)');
  }
}

/* ---- 5. Les invariants d'un exercice ----------------------------------- */
const TYPES_CONNUS = { qcm: 1, html: 1, css: 1, js: 1, py: 1, sql: 1, c: 1, java: 1 };
// Un correcteur qui interroge la mise en page ne peut pas être jugé hors
// navigateur : jsdom ne calcule ni largeur, ni position, ni media query.
const MISE_EN_PAGE = /getComputedStyle|offsetWidth|offsetHeight|clientWidth|clientHeight|getBoundingClientRect|scrollWidth|scrollHeight|innerWidth|innerHeight/;

function exercicesDe(lecon) {
  // compatibilité : une leçon peut définir `exercice` (v1) ou `exercices` (v2)
  if (lecon && lecon.exercices) return lecon.exercices;
  if (lecon && lecon.exercice) return [lecon.exercice];
  return [];
}

const travail = [];   // { ou, fichier, leconId, index, ex, famille } — les exercices à rejouer

for (const item of lecons) {
  const { fichier, global, lecon } = item;
  const ou = fichier + ' / ' + global + ' / ' + (lecon && lecon.id);

  if (item.encyclopedie) { stats.memos++; continue; }
  stats.lecons++;

  if (!lecon || typeof lecon !== 'object') { pb.push(ou + ' : entrée de leçon qui n\'est pas un objet'); continue; }
  if (!lecon.id) pb.push(fichier + ' : leçon sans id (« ' + tronque(lecon.titre) + ' »)');
  if (!lecon.titre) pb.push(ou + ' : leçon sans titre');
  if (!lecon.contenu) pb.push(ou + ' : leçon sans contenu');
  if (lecon.id) {
    if (idsVus.has(lecon.id)) pb.push(ou + ' : id en DOUBLE avec ' + idsVus.get(lecon.id));
    else idsVus.set(lecon.id, ou);
  }

  const exos = exercicesDe(lecon);
  if (!exos.length) notes.push(ou + ' : leçon sans aucun exercice');
  exos.forEach((ex, i) => {
    stats.exos++;
    const tag = ou + ' [exo ' + i + ']';
    if (!ex || typeof ex !== 'object') { pb.push(tag + ' : exercice qui n\'est pas un objet'); return; }
    const t = ex.type;
    stats.types[t] = (stats.types[t] || 0) + 1;

    if (!TYPES_CONNUS[t]) pb.push(tag + ' : type inconnu « ' + t + ' » — app.js ne saura pas l\'exécuter');
    if (!ex.consigne) pb.push(tag + ' : consigne manquante');

    if (t === 'qcm') {
      stats.qcm++;
      if (!Array.isArray(ex.choix) || ex.choix.length < 2) pb.push(tag + ' : choix[] invalide');
      if (!Array.isArray(ex.choix) || typeof ex.bonne !== 'number' || ex.bonne < 0 || ex.bonne >= ex.choix.length) {
        pb.push(tag + ' : la bonne réponse ' + ex.bonne + ' n\'existe pas dans choix[]');
      }
      if (Array.isArray(ex.choix) && ex.aides && ex.aides.length > ex.choix.length) {
        pb.push(tag + ' : plus d\'aides que de choix');
      }
      return;
    }
    if (typeof ex.verifier !== 'function') { pb.push(tag + ' : correcteur verifier() absent'); return; }
    if (typeof ex.solution !== 'string' || !ex.solution.trim()) {
      notes.push(tag + ' : pas de solution, donc non testable');
      return;
    }
    travail.push({ ou: fichier + ' / ' + lecon.id + ' [exo ' + i + ']', fichier, leconId: lecon.id, index: i, ex });
  });
}
/* ---- 6. Le rejeu : la solution passe-t-elle son propre correcteur ? -----
   On reproduit ici, geste pour geste, ce que fait app.js dans verifier(),
   y compris les cas particuliers : le faux console du Worker (arguments
   joints par une espace, objets passés à JSON.stringify), les minuteurs
   qu'on laisse parler avant de conclure, la limite des 3 secondes, et la
   forme exacte du contexte donné à chaque famille de correcteurs.
   -------------------------------------------------------------------------- */
function tronque(t) {
  return String(t == null ? '' : t).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 60);
}
function nettoyer(t) {
  return String(t == null ? '' : t).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 160);
}

function fauxConsole(logs) {
  return { log: function () {
    const a = [];
    for (let i = 0; i < arguments.length; i++) {
      const v = arguments[i];
      a.push(typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v));
    }
    logs.push(a.join(' '));
  } };
}

// ---- JavaScript : comme le Worker de app.js (aucun DOM, faux console) ----
function executerJS(code) {
  const logs = [], taches = [];
  let erreur = null, idSeq = 0;
  const armes = new Map();     // honorer clearInterval / clearTimeout, comme le vrai Worker
  const sb = {
    console: fauxConsole(logs),
    setTimeout: (f, d) => { const id = ++idSeq; armes.set(id, { f }); taches.push(id); return id; },
    // app.js laisse un setInterval tourner ~6 tours avant de rendre la main (l.926)
    setInterval: (f, d) => { const id = ++idSeq; armes.set(id, { f, repete: true }); for (let k = 0; k < 6; k++) taches.push(id); return id; },
    clearTimeout: id => { armes.delete(id); },
    clearInterval: id => { armes.delete(id); }
  };
  try {
    vm.runInNewContext(code, sb, { timeout: 3000 });
    for (let tour = 0; tour < 40 && taches.length; tour++) {
      const id = taches.shift();
      const a = armes.get(id);
      if (!a) continue;                       // annulé par clearTimeout / clearInterval
      if (!a.repete) armes.delete(id);
      try { a.f(); } catch (e) { erreur = erreur || e.message; }
    }
  } catch (e) { erreur = e.message; }
  return { logs, erreur };
}

// ---- Python : le même Skulpt que le navigateur, chargé dans notre faux window
let SkulptPret = null;
function chargerSkulpt() {
  if (SkulptPret !== null) return SkulptPret;
  try {
    charger(ctx, 'skulpt.min.js');
    charger(ctx, 'skulpt-stdlib.js');
    SkulptPret = (typeof ctx.Sk !== 'undefined' && ctx.Sk.builtinFiles) ? ctx.Sk : false;
  } catch (e) {
    SkulptPret = false;
  }
  return SkulptPret;
}

function executerPython(code) {
  const Sk = chargerSkulpt();
  if (!Sk) return { logs: [], erreur: 'l\'interpréteur Python (skulpt.min.js et skulpt-stdlib.js) n\'a pas pu être chargé.' };
  let sortie = '';
  const LIMITE = 400000;   // même garde-fou que app.js : pas de sortie infinie
  try {
    Sk.configure({
      output: t => { if (sortie.length < LIMITE) sortie += t; },
      read: x => {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) throw "File not found: '" + x + "'";
        return Sk.builtinFiles.files[x];
      },
      __future__: Sk.python3,
      execLimit: 3000,       // 3 secondes maximum, comme pour JavaScript
      killableWhile: true,
      killableFor: true
    });
  } catch (e) {
    return { logs: [], erreur: 'impossible de démarrer l\'interpréteur Python : ' + e };
  }
  const finir = erreur => {
    const logs = sortie.split('\n');
    if (logs.length && logs[logs.length - 1] === '') logs.pop();   // le dernier print ajoute un saut de ligne
    return { logs, erreur: erreur ? String(erreur) : null };
  };
  try {
    const p = Sk.misceval.asyncToPromise(() => Sk.importMainWithBody('<stdin>', false, code, true));
    return p.then(() => finir(null), e => finir(e && e.toString ? e.toString() : String(e)));
  } catch (e) {
    return finir(e && e.toString ? e.toString() : String(e));
  }
}
// ---- HTML/CSS : jsdom, s'il est installé (dépendance de développement) ----
let Jsdom = null;
function chargerJsdom() {
  if (Jsdom !== null) return Jsdom;
  try {
    const m = require('jsdom');
    Jsdom = { JSDOM: m.JSDOM, VirtualConsole: m.VirtualConsole };
  } catch (e) {
    Jsdom = false;   // pas installé : la couverture HTML/CSS sera simplement annoncée comme telle
  }
  return Jsdom;
}

function executerAvecDom(code) {
  const j = chargerJsdom();
  if (!j) return { impossible: 'jsdom non installé' };
  const dom = new j.JSDOM(code, {
    runScripts: 'dangerously',        // comme l'aperçu : les <script> de la page s'exécutent
    url: 'https://apprendre-a-coder.test/',   // une vraie origine : localStorage, URL, cookies
    pretendToBeVisual: true,          // requestAnimationFrame et compagnie
    virtualConsole: new j.VirtualConsole()    // on fait taire les avertissements de jsdom
  });
  return { doc: dom.window.document, win: dom.window, code, fermer: () => dom.window.close() };
}

// ---- Quelle famille de moteur juge cet exercice ? -----------------------
function familleDe(ex) {
  if (ex.type === 'js') return 'js';
  if (ex.type === 'py') return 'py';
  if (ex.type === 'c' || ex.type === 'java') return 'cj';
  if (ex.type === 'sql') return 'sql';
  if (ex.type === 'html' || ex.type === 'css') {
    // Un correcteur qui mesure la page ne peut pas être jugé sans moteur de rendu.
    return MISE_EN_PAGE.test(String(ex.verifier)) ? 'mise en page' : 'dom';
  }
  return '?';
}

// Renvoie une promesse de contexte prêt pour ex.verifier(), ou { impossible }.
async function rejouer(code, ex, famille) {
  if (famille === 'js') {
    const r = executerJS(code);
    return { code, logs: r.logs, erreur: r.erreur };
  }
  if (famille === 'py') {
    const r = await Promise.resolve(executerPython(code));
    return { code, logs: r.logs, erreur: r.erreur };
  }
  if (famille === 'cj') {
    const r = ctx.executerCJ(ex.type, code) || { logs: [], erreur: null };
    return { code, logs: r.logs, erreur: r.erreur };
  }
  if (famille === 'sql') {
    const base = ctx.clonerBase(ctx.BASE_SQL || {});   // la base cinéma, neuve à chaque essai
    const res = ctx.executerSQL(code, base) || {};
    return { code, base, erreur: res.erreur, message: res.message, resultat: res.type,
             colonnes: res.colonnes || [], lignes: res.lignes || [], objets: res.objets || [] };
  }
  if (famille === 'dom') {
    const d = executerAvecDom(code);
    if (d.impossible) return { impossible: d.impossible };
    d.fermerApres = true;
    return d;
  }
  return { impossible: 'famille inconnue' };
}

// Applique le correcteur, en refermant proprement la page si l'on en a ouvert une.
function juger(ex, ct) {
  let verdict;
  try { verdict = ex.verifier(ct); }
  catch (e) { verdict = { ok: false, message: 'le correcteur a planté : ' + e.message }; }
  if (ct && ct.fermer) ct.fermer();
  return verdict;
}
/* ---- 7. Les solutions sabotées -----------------------------------------
   Un correcteur qui répond « bravo » à tout ne corrige rien, et c'est
   invisible : chaque élève est félicité. On lui présente donc des copies
   volontairement fausses, fabriquées en abîmant la solution officielle
   (un nombre changé, un texte changé, un opérateur inversé, la dernière
   ligne retirée, une classe retirée, un WHERE supprimé). Il suffit qu'UN
   seul sabotage soit refusé pour que le correcteur ait fait son travail.
   S'ils sont TOUS acceptés, c'est le correcteur qu'il faut regarder.
   -------------------------------------------------------------------------- */
/* Signature de ce que l'élève OBTIENT : sa sortie, ses lignes de résultat, sa
   page. Deux copies qui produisent la même signature ne sont pas de mauvaises
   réponses : ce sont des réponses équivalentes, et un correcteur a raison de
   les accepter. On refuse donc de les compter comme sabotage. */
function signature(ct) {
  if (!ct) return '';
  if (ct.lignes) return 'SQL|' + JSON.stringify(ct.colonnes || []) + '|' + JSON.stringify(ct.lignes) + '|' + String(ct.erreur || '');
  if (ct.logs) return 'SORTIE|' + JSON.stringify(ct.logs) + '|' + String(ct.erreur || '');
  if (ct.doc) { try { return 'DOM|' + ct.doc.documentElement.outerHTML.replace(/\s+/g, ' '); } catch (e) { return 'DOM?'; } }
  return '';
}

/* ---- 7 bis. Les saboteurs ciblés ---------------------------------------
   Une copie sabotée au hasard ne prouve rien : retirer un <h1> d'un exercice
   qui parle de listes est inoffensif, et le correcteur a raison de l'accepter.
   On attaque donc EXACTEMENT ce que le correcteur regarde, en lisant son code :
     - les sélecteurs qu'il interroge (querySelector('li')…) : on enlève de la
       page tout ce qui y répond ;
     - les textes qu'il cherche dans la sortie (includes('Bonjour Python !')) :
       on les corrompt dans la solution ;
     - pour SQL : on retire le WHERE ou on ajoute un LIMIT 1, ce qui change
       les lignes renvoyées — un correcteur qui compare les résultats doit
       s'en apercevoir.
   Si le correcteur accepte SA propre cible détruite, il ne corrige rien.
   -------------------------------------------------------------------------- */
const MOTS_TECHNIQUES = ['code', 'logs', 'erreur', 'ok', 'message', 'doc', 'win', 'base',
  'colonnes', 'lignes', 'objets', 'resultat', 'neutre', 'donnees'];

/* Corrompt un texte SANS changer sa longueur d'un caractère : on glisse un X
   au MILIEU. Coller un X à la fin ne prouverait rien — `includes('autorisée')`
   reste vrai pour « autoriséeX » alors qu'il devient faux pour « autorXisée ». */
function corrompreTexte(t) {
  const milieu = Math.floor(t.length / 2);
  return t.slice(0, milieu) + 'X' + t.slice(milieu);
}

// Les textes que le correcteur cherche vraiment : assez longs, et porteurs
// d'au moins une lettre ou un chiffre (« ... » ou « -> » ne prouvent rien).
function litterauxDe(src) {
  const out = [];
  const re = /'([^'\\\n]{4,60})'|"([^"\\\n]{4,60})"/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const t = m[1] !== undefined ? m[1] : m[2];
    if (!t) continue;
    if (!/[a-zà-öø-ÿ0-9]/i.test(t)) continue;
    if (MOTS_TECHNIQUES.indexOf(t.toLowerCase()) !== -1) continue;
    if (out.indexOf(t) === -1) out.push(t);
  }
  return out;
}

function selecteursDe(src) {
  const out = [];
  // Le sélecteur est délimité par SES guillemets à lui, et peut en contenir
  // d'autres : couper au premier venu réduisait « a[href^="https"] » à
  // « a[href^= », qui ne vise plus rien. Le correcteur passait alors pour
  // non éprouvé alors qu'il n'avait tout simplement jamais été attaqué.
  const re = /(querySelectorAll|querySelector|getElementById|getElementsByTagName)\(\s*(?:'([^']*)'|"([^"]*)")/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const brut = m[2] !== undefined ? m[2] : m[3];
    const sel = m[1] === 'getElementById' ? '#' + brut : brut;
    if (brut && out.indexOf(sel) === -1) out.push(sel);
  }
  return out;
}

/* Enlève de la page tout ce que `sel` désigne, en confiant la lecture du
   sélecteur à jsdom plutôt qu'à une expression régulière. « ul li a »,
   « header h1 » ou « meta[name="viewport"] » sont alors traités exactement
   comme le navigateur les traite — l'approximation en regex, elle, les
   refusait tous et laissait leur correcteur sans copie à refuser.
   Rend null quand il n'y a rien à retirer, ou quand le sélecteur a été
   assemblé à l'exécution et n'est donc pas lisible dans la source. */
function retirerParDom(code, sel) {
  const j = chargerJsdom();
  if (!j) return null;
  let dom;
  try { dom = new j.JSDOM(code, { virtualConsole: new j.VirtualConsole() }); }
  catch (e) { return null; }
  try {
    const vises = dom.window.document.querySelectorAll(sel);
    if (!vises.length) return null;          // rien à retirer : ce n'est pas un sabotage
    for (const noeud of vises) noeud.remove();
    return dom.serialize();
  } catch (e) {
    return null;                             // sélecteur illisible statiquement
  } finally {
    dom.window.close();
  }
}

// Repli quand jsdom manque : une classe, un id, une balise — rien de composé.
function retirerSelecteur(code, sel) {
  const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  if (sel[0] === '.' && sel.length > 1) {
    const re = new RegExp('class="([^"]*?)\\b' + esc(sel.slice(1)) + '\\b([^"]*)"', 'g');
    if (!re.test(code)) return null;
    return code.replace(new RegExp('class="([^"]*?)\\b' + esc(sel.slice(1)) + '\\b([^"]*)"', 'g'),
                        (m, avant, apres) => 'class="' + (avant + apres).replace(/\s+/g, ' ').trim() + '"');
  }
  if (sel[0] === '#' && sel.length > 1) {
    const re = new RegExp('id="' + esc(sel.slice(1)) + '"', 'g');
    if (!re.test(code)) return null;
    return code.replace(new RegExp('id="' + esc(sel.slice(1)) + '"', 'g'), 'id="' + sel.slice(1) + 'X"');
  }
  if (!/^[a-z][\w-]*$/i.test(sel)) return null;      // sélecteurs composés : on laisse tomber
  const paire = new RegExp('<' + esc(sel) + '\\b[^>]*>[\\s\\S]*?<\\/' + esc(sel) + '>', 'gi');
  if (!paire.test(code)) return null;
  return code.replace(new RegExp('<' + esc(sel) + '\\b[^>]*>[\\s\\S]*?<\\/' + esc(sel) + '>', 'gi'), '');
}

function sabotagesCibles(ex, famille) {
  const sol = ex.solution;
  const src = String(ex.verifier);
  const out = [];
  // Un texte vide n'est pas « pas de copie » : une page effacée est au
  // contraire la copie la plus fausse qui soit, et tout correcteur doit la
  // refuser. Seule la différence avec la solution compte donc ici.
  const proposer = (nom, texte) => {
    if (texte == null || texte === sol || out.length >= 6) return;
    out.push({ nom: texte.trim() === '' ? nom + ' — il ne reste rien' : nom, texte });
  };

  if (famille === 'dom') {
    for (const sel of selecteursDe(src)) {
      const attaque = retirerParDom(sol, sel) || retirerSelecteur(sol, sel);
      if (attaque) proposer('la page ne contient plus rien qui réponde à « ' + sel + ' »', attaque);
    }
    // Les textes que le correcteur cherche — « og:title », « https:// » —
    // sont ce que l'exercice demande vraiment. Les corrompre est une faute
    // qu'il DOIT voir, et cela reste dans le sujet : c'est ce qui distingue
    // cette attaque du sabotage au hasard auquel le DOM renonce.
    let vises = 0;
    for (const lit of litterauxDe(src)) {
      if (sol.indexOf(lit) === -1) continue;
      proposer('le texte « ' + lit + ' » corrompu au milieu', sol.replace(lit, corrompreTexte(lit)));
      if (++vises >= 3) break;
    }
  } else if (famille === 'js' || famille === 'py' || famille === 'cj') {
    // Ce correcteur relit le code de l'élève pour en déduire ce qu'il attend
    // (« change le mot de passe pour tester ») : corrompre un texte de la
    // solution n'est alors pas une faute, c'est l'exercice. On se tait.
    if (/ctx\.code\.(match|indexOf|includes|replace|split)/.test(src)) return out;
    // jusqu'à trois textes visés, deux façons de les abîmer à chaque fois :
    // un X glissé au milieu, puis le texte remplacé par des z — le second
    // change aussi la nature du texte (plus de chiffre, plus de majuscule),
    // ce qui attrape les correcteurs qui ne regardent que la forme.
    let essaies = 0;
    for (const lit of litterauxDe(src)) {
      if (sol.indexOf(lit) === -1) continue;
      proposer('le texte « ' + lit + ' » corrompu au milieu', sol.replace(lit, corrompreTexte(lit)));
      proposer('le texte « ' + lit + ' » remplacé par des z', sol.replace(lit, new Array(Math.max(4, lit.length) + 1).join('z')));
      if (++essaies >= 3) break;
    }
  } else if (famille === 'sql') {
    // Une requête d'agrégat sans WHERE, sans nombre et sans texte échappait à
    // tous les sabotages : on vise alors l'alias et l'agrégat eux-mêmes, qui
    // sont précisément ce que la requête affirme.
    const alias = sol.match(/\bAS\s+([a-zA-Z_]\w*)/i);
    if (alias) proposer('l\'alias « ' + alias[1] + ' » disparaît', sol.replace(alias[0], ''));

    const agg = sol.match(/\b(COUNT|AVG|SUM|MAX|MIN)\s*\(([^()]*)\)/i);
    if (agg) {
      const dedans = agg[2].trim();
      if (dedans === '*') {
        proposer('le comptage devient une constante', sol.replace(agg[0], '3'));
      } else {
        const autre = { COUNT: 'MAX', AVG: 'MAX', SUM: 'COUNT', MAX: 'MIN', MIN: 'MAX' }[agg[1].toUpperCase()];
        proposer('l\'agrégat ' + agg[1].toUpperCase() + ' devient ' + autre, sol.replace(agg[0], autre + '(' + dedans + ')'));
      }
    }

    if (/\bwhere\b/i.test(sol)) {
      proposer('clause WHERE retirée (les lignes filtrées reviennent)',
        sol.replace(/\bwhere\b[\s\S]*?(?=\border by\b|\bgroup by\b|\blimit\b|$)/i, ''));
    }
    if (/\border\s+by\b/i.test(sol)) {
      // inverser le tri : tout correcteur qui parle de l'ordre doit s'en apercevoir
      if (/\bdesc\b/i.test(sol)) proposer('tri inversé (DESC devient ASC)', sol.replace(/\bdesc\b/i, 'ASC'));
      else if (/\basc\b/i.test(sol)) proposer('tri inversé (ASC devient DESC)', sol.replace(/\basc\b/i, 'DESC'));
    }
    if (/\bdistinct\b/i.test(sol)) proposer('DISTINCT retiré (des doublons reviennent)', sol.replace(/\bdistinct\s*/i, ''));
    if (/\blimit\s+\d+/i.test(sol)) proposer('LIMIT retiré (plus de lignes renvoyées)', sol.replace(/\s*\blimit\s+\d+/i, ''));
    // Ajouter un LIMIT n'a de sens que si son effet se voit : sur un agrégat ou
    // un GROUP BY, une seule ligne sortait déjà — le sabotage ne prouverait rien.
    const agrege = /\b(count|sum|avg|min|max)\s*\(|\bgroup\s+by\b/i.test(sol);
    if (/^\s*select/i.test(sol) && !agrege && !/\blimit\b/i.test(sol)) {
      proposer('LIMIT 1 ajouté (une seule ligne renvoyée)', sol.replace(/\s*;?\s*$/, '') + ' LIMIT 1');
    }
    const nb = sol.match(/\d+(?:\.\d+)?/);
    if (nb) proposer('la valeur ' + nb[0] + ' modifiée', sol.replace(nb[0], String(Number(nb[0]) + 1)));
  }
  return out;
}

// L'attaque ciblée d'abord : sélecteurs retirés, textes visés corrompus. Si
// le correcteur ne dit rien de précis à viser, les attaques génériques
// servent de secours — sauf pour les pages HTML/CSS, où frapper au hasard ne
// prouverait rien : on préfère alors ne rien affirmer, et l'exercice est
// nommé dans le rapport comme non éprouvé.
function sabotages(ex, famille) {
  const ciblees = sabotagesCibles(ex, famille);
  if (ciblees.length) return ciblees;
  // Sur une page, le sabotage au hasard abîme presque toujours autre chose
  // que ce que l'exercice demande — corrompre « UTF-8 » dans un exercice sur
  // Open Graph accuse un correcteur qui a raison de laisser passer. On
  // préfère donc ne rien affirmer, et le dire dans le rapport.
  if (famille === 'dom') return [];
  return sabotagesGeneriques(ex.solution, famille);
}

function sabotagesGeneriques(code, famille) {
  const out = [];
  const proposer = (nom, texte) => {
    if (texte != null && texte !== code && out.length < 4 && !out.some(s => s.texte === texte)) out.push({ nom, texte });
  };

  // a) le dernier morceau utile disparaît
  const lignes = code.split('\n');
  let k = lignes.length - 1;
  while (k >= 0 && lignes[k].trim() === '') k--;
  if (k >= 0) { const c = lignes.slice(); c.splice(k, 1); proposer('dernière ligne retirée', c.join('\n')); }

  // b) un nombre change de valeur
  const nb = code.match(/\d+(?:\.\d+)?/);
  if (nb) proposer('nombre ' + nb[0] + ' modifié', code.replace(nb[0], String(Number(nb[0]) + 1)));

  // c) un texte affiché change
  const lit = code.match(/'[^'\n]{2,}'|"[^"\n]{2,}"/);
  if (lit) proposer('texte modifié', code.replace(lit[0], lit[0][0] + corrompreTexte(lit[0].slice(1, -1)) + lit[0][0]));

  // d) un opérateur s'inverse
  for (const [a, b] of [['<=', '>'], ['>=', '<'], ['===', '!=='], ['==', '!='], ['<', '>'], ['&&', '||'], ['+', '-']]) {
    if (code.indexOf(a) !== -1) { proposer('opérateur ' + a + ' inversé', code.replace(a, b)); break; }
  }

  // e) HTML/CSS : une classe disparaît, ou à défaut une balise
  if (famille === 'dom') {
    const cls = code.match(/class="([^"]+)"/);
    if (cls) {
      const parties = cls[1].trim().split(/\s+/);
      if (parties.length > 1) proposer('classe « ' + parties[parties.length - 1] + ' » retirée', code.replace(cls[0], 'class="' + parties.slice(0, -1).join(' ') + '"'));
      else proposer('classe « ' + parties[0] + ' » renommée', code.replace(cls[0], 'class="' + parties[0] + 'X"'));
    } else {
      const bal = code.match(/<([a-z][\w-]*)[^>]*>/i);
      if (bal) proposer('balise <' + bal[1] + '> retirée', code.replace(bal[0], ''));
    }
  }

  // f) SQL : le filtre disparaît
  if (famille === 'sql' && /where/i.test(code)) {
    proposer('clause WHERE retirée', code.replace(/\bwhere\b[\s\S]*?(?=\border by\b|\bgroup by\b|\blimit\b|$)/i, ''));
  }
  return out;
}
/* ---- 8. Un exercice à la fois, comme le ferait l'élève ----------------- */
const moteurs = { js: { juges: 0, ko: [] }, py: { juges: 0, ko: [] }, cj: { juges: 0, ko: [] },
                  sql: { juges: 0, ko: [] }, dom: { juges: 0, ko: [] } };
const nonJuges = { miseEnPage: 0, qcm: stats.qcm, domSansJsdom: 0, pasDeMoteur: 0 };
const sabo = { testes: 0, refuses: 0, complaisants: [], nonEprouves: 0, sansCopie: [], equivalentes: 0 };

async function controler() {
  for (const t of travail) {
    const ex = t.ex;
    const famille = familleDe(ex);

    if (famille === 'mise en page') { nonJuges.miseEnPage++; continue; }
    if (famille === 'dom' && !chargerJsdom()) { nonJuges.domSansJsdom++; continue; }
    if (!moteurs[famille]) { nonJuges.pasDeMoteur++; continue; }

    // 1. la solution officielle doit être ACCEPTÉE
    let ct;
    try { ct = await rejouer(ex.solution, ex, famille); }
    catch (e) { moteurs[famille].ko.push(t.ou + ' — solution impossible à rejouer : ' + nettoyer(e.message)); continue; }

    if (ct.impossible) { nonJuges.pasDeMoteur++; continue; }
    let verdict = juger(ex, ct);
    moteurs[famille].juges++;

    if (verdict && verdict.ok === true) {
      // 2. une copie sabotée doit être REFUSÉE — mais seulement si cette copie
      //    donne vraiment autre chose : sinon elle n'est pas fausse du tout.
      const copies = sabotages(ex, famille);
      if (!copies.length) { sabo.nonEprouves++; sabo.sansCopie.push(t.ou); }   // on garde QUI, pas seulement COMBIEN
      const sigOfficielle = signature(ct);
      let refuse = false, essais = 0;
      for (const copie of copies) {
        let c2;
        try { c2 = await rejouer(copie.texte, ex, famille); } catch (e) { continue; }
        if (c2.impossible) continue;
        if (signature(c2) === sigOfficielle) { sabo.equivalentes++; continue; }   // même résultat : rien à prouver
        essais++;
        const v2 = juger(ex, c2);
        if (!v2 || v2.ok !== true) { refuse = true; sabo.refuses++; break; }
      }
      sabo.testes += essais;
      if (essais && !refuse) {
        sabo.complaisants.push(t.ou + ' — « ' + tronque(ex.consigne) + ' » : les ' + essais +
          ' copies sabotées (' + copies.slice(0, essais).map(c => c.nom).join(', ') + ') sont toutes ACCEPTÉES');
        if (process.env.AAC_DEBUG) {
          console.log('    [debug] ' + t.ou + ' (famille ' + famille + ')');
          console.log('      textes visés par le correcteur : ' + JSON.stringify(litterauxDe(String(ex.verifier)).slice(0, 5)));
          console.log('      sélecteurs visés            : ' + JSON.stringify(selecteursDe(String(ex.verifier)).slice(0, 5)));
          copies.forEach(c => console.log('      sabotage « ' + c.nom + ' » → ' +
            JSON.stringify(c.texte.slice(0, 110))));
        }
      }
    } else {
      const cause = ct.erreur
        ? 'la solution officielle PLANTE → ' + nettoyer(ct.erreur)
        : 'la solution officielle est REFUSÉE → ' + nettoyer(verdict && verdict.message);
      moteurs[famille].ko.push(t.ou + ' — « ' + tronque(ex.consigne) + ' » : ' + cause);
    }
  }
}

/* ---- 9. Rapport -------------------------------------------------------- */
controler().then(() => {
  const duree = ((Date.now() - debut) / 1000).toFixed(1);
  let totalKo = 0, totalJuges = 0;
  for (const f of Object.keys(moteurs)) { totalKo += moteurs[f].ko.length; totalJuges += moteurs[f].juges; }
  const totalNonJuges = nonJuges.miseEnPage + nonJuges.qcm + nonJuges.domSansJsdom + nonJuges.pasDeMoteur;

  console.log('=== Contenu ===');
  console.log(stats.lecons + ' leçons, ' + stats.memos + ' mémos, ' + stats.exos + ' exercices (dont ' + stats.qcm + ' QCM)');
  console.log('types : ' + Object.keys(stats.types).sort().map(k => k + '=' + stats.types[k]).join('  '));
  console.log('');

  console.log('=== Non-régression : la solution officielle passe-t-elle son correcteur ? ===');
  const noms = { js: 'JavaScript', py: 'Python', cj: 'C et Java', sql: 'SQL', dom: 'HTML/CSS (DOM)' };
  for (const f of Object.keys(moteurs)) {
    console.log('  ' + noms[f].padEnd(16) + String(moteurs[f].juges).padStart(4) + ' rejoués' +
                (moteurs[f].ko.length ? ', ' + moteurs[f].ko.length + ' EN ÉCHEC' : ', tout passe'));
  }
  console.log('  ' + 'total'.padEnd(16) + String(totalJuges).padStart(4) + ' / ' + stats.exos + ' exercices jugés');
  console.log('');

  console.log('=== Correcteurs mis à l\'épreuve : une copie sabotée est-elle refusée ? ===');
  console.log('  ' + sabo.testes + ' copies réellement fausses présentées, ' + sabo.refuses + ' refusées, ' +
              sabo.complaisants.length + ' correcteur(s) à regarder');
  console.log('  ' + sabo.equivalentes + ' copies écartées : elles donnaient le même résultat que la solution' +
              (sabo.nonEprouves ? ' ; ' + sabo.nonEprouves + ' exercices sans copie à présenter' : ''));
// Un correcteur qu'on n'a pas pu éprouver n'est pas un correcteur validé :
  // un simple compte dans une parenthèse se lit, puis s'oublie. On NOMME donc
  // les exercices concernés, pour qu'ils restent à vérifier dans la liste.
  if (sabo.nonEprouves) {
    console.log('      ces exercices n\'ont reçu aucune copie fausse à refuser — correcteur NON ÉPROUVÉ :');
    for (const ou of sabo.sansCopie) console.log('        - ' + ou);
  }
  console.log('');

  console.log('=== Ce qui n\'a PAS pu être jugé ici (' + totalNonJuges + ') ===');
  console.log('  ' + String(nonJuges.miseEnPage).padStart(4) + '  correcteurs qui mesurent la page (largeur, position, media queries) — seul le navigateur peut en juger');
  console.log('  ' + String(nonJuges.qcm).padStart(4) + '  QCM — leur mécanique (bonne réponse = un indice de choix) est contrôlée statiquement');
  if (nonJuges.domSansJsdom) console.log('  ' + String(nonJuges.domSansJsdom).padStart(4) + '  HTML/CSS — jsdom n\'est pas installé (« npm install » pour les couvrir)');
  if (nonJuges.pasDeMoteur) console.log('  ' + String(nonJuges.pasDeMoteur).padStart(4) + '  exercices dont le moteur n\'a pas pu démarrer');
  console.log('');

  if (pb.length) {
    console.log('=== PROBLÈMES (' + pb.length + ') ===');
    pb.forEach(p => console.log('  ! ' + p));
    console.log('');
  }
  if (totalKo) {
    console.log('=== ÉCHECS DE NON-RÉGRESSION (' + totalKo + ') ===');
    for (const f of Object.keys(moteurs)) moteurs[f].ko.forEach(k => console.log('  x [' + f + '] ' + k));
    console.log('');
  }
  if (sabo.complaisants.length) {
    console.log('=== CORRECTEURS COMPLAISANTS (' + sabo.complaisants.length + ') ===');
    sabo.complaisants.forEach(c => console.log('  ? ' + c));
    console.log('');
  }
  if (notes.length) {
    console.log('=== À REGARDER (' + notes.length + ') ===');
    notes.forEach(n => console.log('  - ' + n));
    console.log('');
  }
  console.log(totalJuges + ' exercices rejoués en ' + duree + ' s — ' + totalKo + ' échec(s), ' +
              pb.length + ' problème(s) structurel(s), ' + sabo.complaisants.length + ' correcteur(s) complaisant(s).');
  process.exit(totalKo || pb.length ? 1 : 0);
});





