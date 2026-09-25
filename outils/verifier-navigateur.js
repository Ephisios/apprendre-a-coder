#!/usr/bin/env node
'use strict';

/* ===========================================================================
   Ce que seul un vrai navigateur peut juger.
   ===========================================================================

   Trois choses, dans un Chrome sans fenêtre, sur deux pages :

   1. verifier-navigateur.html — les 63 correcteurs qui MESURENT la page :
      une largeur, une position, une couleur calculée, une media query. Ni
      Node ni jsdom ne font de mise en page.

   2. index.html — le moteur JavaScript par son CHEMIN NORMAL. jsdom ne
      fournit pas de Worker, donc test-interface.js n'éprouve que le repli.
      Le chemin qu'emprunte tout élève réel n'était couvert par personne.
      On compare ici les deux, et on vérifie le garde-fou anti-boucle-infinie
      que seul le Worker sait offrir.

   3. index.html — le contraste et la visibilité du focus, qui demandent
      eux aussi une mise en page.

   POURQUOI AUCUNE DÉPENDANCE
   Puppeteer ou Playwright feraient cela en dix lignes, mais téléchargeraient
   un Chromium entier (~300 Mo) dans un projet dont `npm install` ne tire
   aujourd'hui qu'une seule bibliothèque, jsdom. Depuis Node 22, `WebSocket`
   et `fetch` sont globaux : parler le protocole DevTools à un navigateur
   déjà installé tient en une quarantaine de lignes.

   POURQUOI --headless=new
   On MESURE des pages. L'ancien mode sans fenêtre de Chrome ne rendait pas
   tout à fait comme le mode normal ; le nouveau partage le même moteur de
   rendu. Sur un harnais qui compare des largeurs au pixel, ce n'est pas un
   détail.

   SI AUCUN NAVIGATEUR N'EST TROUVÉ
   On le dit haut et fort, et on rend la main sans faire échouer le reste —
   comme le verifier le fait quand jsdom manque. Pour exiger le contraire
   (une machine d'intégration, par exemple) : VERIF_NAVIGATEUR=exige.
   Pour imposer un binaire précis : NAVIGATEUR=/chemin/vers/chrome.
   =========================================================================== */

const { spawn } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const RACINE = path.resolve(__dirname, '..');
const PAGE_MESURE = path.join(__dirname, 'verifier-navigateur.html');
const PAGE_APP = path.join(RACINE, 'index.html');
const EXIGE = process.env.VERIF_NAVIGATEUR === 'exige';
const PATIENCE_MS = 180000;   // 63 exercices × 2 rendus, avec de la marge

/* ---- 1. Trouver un navigateur déjà installé ----------------------------- */

function trouverNavigateur() {
  if (process.env.NAVIGATEUR) return process.env.NAVIGATEUR;   // le dernier mot revient à qui lance
  const candidats = [];
  if (process.platform === 'win32') {
    const bases = [process.env.ProgramFiles, process.env['ProgramFiles(x86)'], process.env.LOCALAPPDATA];
    for (const base of bases.filter(Boolean)) {
      candidats.push(
        path.join(base, 'Google', 'Chrome', 'Application', 'chrome.exe'),
        path.join(base, 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
        path.join(base, 'Chromium', 'Application', 'chrome.exe'));
    }
  } else if (process.platform === 'darwin') {
    candidats.push(
      '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
      '/Applications/Chromium.app/Contents/MacOS/Chromium');
  } else {
    candidats.push(
      '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium',
      '/usr/bin/chromium-browser', '/usr/bin/microsoft-edge', '/snap/bin/chromium');
  }
  return candidats.find((p) => { try { return fs.statSync(p).isFile(); } catch (e) { return false; } }) || null;
}

/* ---- 2. Un client DevTools minuscule ------------------------------------ */

function connecter(url) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(url);
    const enAttente = new Map();
    let dernier = 0;
    const minuteur = setTimeout(() => reject(new Error('le navigateur ne répond pas sur ' + url)), 15000);

    ws.onmessage = (ev) => {
      let m;
      try { m = JSON.parse(ev.data); } catch (e) { return; }
      if (!m.id || !enAttente.has(m.id)) return;
      const { ok, ko } = enAttente.get(m.id);
      enAttente.delete(m.id);
      if (m.error) ko(new Error(m.error.message)); else ok(m.result);
    };
    ws.onerror = () => { clearTimeout(minuteur); reject(new Error('connexion DevTools impossible')); };
    ws.onopen = () => {
      clearTimeout(minuteur);
      resolve({
        envoyer(methode, params) {
          return new Promise((ok, ko) => {
            const id = ++dernier;
            enAttente.set(id, { ok, ko });
            ws.send(JSON.stringify({ id, method: methode, params: params || {} }));
          });
        },
        fermer() { try { ws.close(); } catch (e) { /* déjà fermé */ } }
      });
    };
  });
}

async function evaluer(co, expression) {
  const r = await co.envoyer('Runtime.evaluate', {
    expression, returnByValue: true, awaitPromise: true
  });
  if (r.exceptionDetails) {
    const d = r.exceptionDetails;
    throw new Error('dans la page : ' + (d.exception && d.exception.description ? d.exception.description : d.text));
  }
  return r.result.value;
}

const patienter = (ms) => new Promise((r) => setTimeout(r, ms));

async function attendre(quoi, condition, limite) {
  const fin = Date.now() + limite;
  for (;;) {
    const v = await condition();
    if (v) return v;
    if (Date.now() > fin) throw new Error('délai dépassé en attendant ' + quoi);
    await patienter(250);
  }
}

/* ---- 3. Le compte rendu ------------------------------------------------- */

let echecs = 0, passees = 0;
function verifie(intitule, obtenu, attendu) {
  if (JSON.stringify(obtenu) === JSON.stringify(attendu)) { passees++; return; }
  echecs++;
  console.log('  ÉCHEC  ' + intitule);
  console.log('         attendu : ' + JSON.stringify(attendu));
  console.log('         obtenu  : ' + JSON.stringify(obtenu));
}

function manque(raison) {
  const barre = '='.repeat(72);
  console.log('\n' + barre);
  console.log('  CE QUE SEUL UN NAVIGATEUR PEUT JUGER N\'A PAS ÉTÉ JUGÉ');
  console.log('  ' + raison);
  console.log('');
  console.log('  Cela couvre les 63 correcteurs de mise en page (13 % des exercices),');
  console.log('  le moteur JavaScript par son chemin normal, le contraste et le focus.');
  console.log('  Ouvre outils/verifier-navigateur.html à la main, ou indique un');
  console.log('  navigateur : NAVIGATEUR=/chemin/vers/chrome npm run verifier-nav');
  console.log(barre + '\n');
  process.exit(EXIGE ? 1 : 0);
}

/* ---- 4. Ce qu'on évalue DANS la page ------------------------------------ */

/* Le moteur JavaScript, par ses deux chemins. On retire window.Worker pour
   forcer le repli, puis on le remet : c'est exactement ce que subit un
   navigateur qui n'en offre pas. */
const SONDE_MOTEUR = `(async () => {
  const CAS = [
    ['log simple',  'console.log("bonjour"); console.log(1 + 1);'],
    ['objet',       'console.log({ a: 1 }); console.log([1, 2]); console.log(null);'],
    ['erreur',      'console.log("avant"); nexistePas();'],
    ['setTimeout',  'console.log("tout de suite"); setTimeout(function () { console.log("plus tard"); }, 120);'],
    ['setInterval', 'var n = 0; setInterval(function () { console.log("tic" + (++n)); }, 40);']
  ];
  const lancer = (code) => new Promise((r) => window.executerJS(code, r));
  const resume = (x) => ({ logs: x.logs.length, tete: x.logs.slice(0, 2).join('|'), err: x.erreur ? 'oui' : 'non' });

  const avant = typeof window.Worker;
  const avec = {};
  for (const [nom, code] of CAS) avec[nom] = resume(await lancer(code));

  // Le garde-fou que seul le Worker peut offrir : on l'éprouve pour de vrai.
  const debut = Date.now();
  const boucle = await lancer('while (true) {}');
  const duree = Date.now() - debut;

  const vrai = window.Worker;
  delete window.Worker;
  const sans = {};
  for (const [nom, code] of CAS) sans[nom] = resume(await lancer(code));
  window.Worker = vrai;

  const ecarts = CAS.map(([n]) => n).filter((n) => JSON.stringify(avec[n]) !== JSON.stringify(sans[n]));
  return {
    workerDisponible: avant,
    workerRetabli: typeof window.Worker,
    avec, sans, ecarts,
    boucleInfinie: { logs: boucle.logs.length, erreur: String(boucle.erreur || ''), secondes: Math.round(duree / 1000) }
  };
})()`;

/* Le contraste et le focus. Deux pièges, tous deux rencontrés à la main :
   - Chrome rend certaines couleurs en « color(srgb 0.69 0.66 0.94) », dont
     les composantes valent déjà 0..1 : les diviser par 255 accuse tout le
     monde ;
   - un emoji est une image en couleurs, pas du texte. Sa couleur calculée ne
     gouverne pas son rendu, et le mesurer accuse chaque icône de l'interface. */
const SONDE_APPARENCE = `(() => {
  const composantes = (c) => {
    if (!c) return null;
    if (c.startsWith('color(')) { const v = c.match(/-?\\d*\\.?\\d+/g); return v && v.length >= 3 ? v.slice(0, 3).map(Number) : null; }
    const v = c.match(/-?\\d*\\.?\\d+/g);
    if (!v || v.length < 3) return null;
    if (v.length >= 4 && Number(v[3]) === 0) return null;
    return v.slice(0, 3).map((x) => Number(x) / 255);
  };
  const lum = (c) => {
    const m = composantes(c); if (!m) return null;
    const f = m.map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
  };
  const fond = (el) => { let n = el; while (n) { const L = lum(getComputedStyle(n).backgroundColor); if (L !== null) return L; n = n.parentElement; } return 1; };
  const EMOJI = /^[\\s\\p{Extended_Pictographic}\\u200d\\ufe0f\\u{1f3fb}-\\u{1f3ff}]+$/u;

  const faibles = [];
  let examines = 0;
  for (const el of document.querySelectorAll('body *')) {
    if (!el.offsetParent) continue;
    const txt = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join('').trim();
    if (txt.length < 2 || EMOJI.test(txt)) continue;
    examines++;
    const st = getComputedStyle(el);
    const L1 = lum(st.color); if (L1 === null) continue;
    const L2 = fond(el);
    const r = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const px = parseFloat(st.fontSize);
    const seuil = (px >= 24 || (px >= 18.66 && Number(st.fontWeight) >= 700)) ? 3 : 4.5;
    if (r < seuil) faibles.push({ el: el.tagName.toLowerCase() + '.' + String(el.className).trim().split(/\\s+/)[0],
      ratio: +r.toFixed(2), seuil, texte: txt.slice(0, 30) });
  }

  // La promesse du focus : une règle :focus-visible globale, avec un contour
  // qu'on voit. Sans elle, personne ne sait où il est au clavier.
  let contourFocus = null;
  for (const feuille of document.styleSheets) {
    let regles; try { regles = feuille.cssRules; } catch (e) { continue; }
    for (const regle of regles || []) {
      if (!regle.selectorText || !/:focus-visible/.test(regle.selectorText)) continue;
      const o = regle.style.outline || regle.style.outlineWidth || regle.style.boxShadow;
      if (regle.selectorText.trim() === ':focus-visible' && o) contourFocus = String(o);
    }
  }
  return { faibles, examines, contourFocus, vue: document.title };
})()`;

/* ---- 5. Le déroulé ------------------------------------------------------ */

async function ongletPour(port, motif) {
  return attendre('l\'onglet ' + motif, async () => {
    try {
      const liste = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
      return liste.find((t) => t.type === 'page' && t.url.indexOf(motif) !== -1) || null;
    } catch (e) { return null; }
  }, 30000);
}

async function suiteMesure(port) {
  const onglet = await ongletPour(port, 'verifier-navigateur.html');
  const co = await connecter(onglet.webSocketDebuggerUrl);
  await co.envoyer('Runtime.enable', {});
  await attendre('le chargement de la page de mesure', () =>
    evaluer(co, 'document.readyState === "complete" && !!document.getElementById("lancer")'), 60000);

  // Sans les data-*.js, la page jugerait zéro exercice et annoncerait
  // fièrement zéro échec.
  const combien = await evaluer(co, 'aMesurer().length');
  if (!combien) throw new Error('la page ne voit aucun exercice à mesurer — les data-*.js ne se sont pas chargés');

  console.log('\n=== Les correcteurs qui mesurent la page (' + combien + ') ===\n');
  await evaluer(co, 'document.getElementById("lancer").click(), null');
  const bilan = await attendre('le verdict de la page', () => evaluer(co, 'window.__bilan || null'), PATIENCE_MS);

  for (const l of bilan.ennuis) console.log('  ' + (l.classe === 'ko' ? '✘' : '?') + ' ' + l.ou + ' — ' + l.texte);
  if (bilan.ennuis.length) console.log('');
  console.log('  ' + bilan.texte);
  verifie('mise en page — aucune solution officielle refusée', bilan.ko, 0);
  verifie('mise en page — aucun correcteur complaisant', bilan.complaisants, 0);
  return co;   // le même onglet servira pour l'application
}

async function suiteApplication(co) {
  // Chrome sans fenêtre refuse plusieurs URL au lancement (« Multiple targets
  // are not supported in headless mode »). On navigue donc dans l'onglet
  // qu'on a déjà, plutôt que d'en ouvrir un second.
  await co.envoyer('Page.enable', {});
  await co.envoyer('Page.navigate', { url: pathToFileURL(PAGE_APP).href });
  await attendre('le chargement de l\'application', () =>
    evaluer(co, 'document.readyState === "complete" && typeof window.executerJS === "function"')
      .catch(() => false), 60000);

  /* --- le moteur JavaScript, par ses deux chemins --- */
  console.log('\n=== Le moteur JavaScript : le Worker et son repli ===\n');
  const m = await evaluer(co, SONDE_MOTEUR);

  verifie('moteur — le navigateur offre bien un Worker', m.workerDisponible, 'function');
  verifie('moteur — il est rendu après le test du repli', m.workerRetabli, 'function');
  verifie('moteur — aucun écart entre le Worker et le repli', m.ecarts, []);
  for (const nom of Object.keys(m.avec)) {
    console.log('  ' + nom.padEnd(13) + ' Worker : ' + JSON.stringify(m.avec[nom]));
    console.log('  ' + ' '.repeat(13) + ' repli  : ' + JSON.stringify(m.sans[nom]));
  }

  // Le Worker se fait terminate() au bout de 3 s. C'est la seule protection
  // de l'élève contre sa propre boucle infinie, et personne ne l'avait jamais
  // éprouvée. Le repli, lui, ne peut pas : rien n'interrompt du code
  // synchrone sur le fil principal. C'est dit dans app.js.
  console.log('\n  boucle infinie, chemin Worker : ' + m.boucleInfinie.secondes + ' s, « '
    + m.boucleInfinie.erreur.slice(0, 60) + ' »');
  verifie('moteur — une boucle infinie est arrêtée, pas subie',
          /sans s'arrêter|boucle infinie/.test(m.boucleInfinie.erreur), true);
  verifie('moteur — et elle est arrêtée en quelques secondes, pas jamais',
          m.boucleInfinie.secondes >= 2 && m.boucleInfinie.secondes <= 6, true);

  /* --- contraste et focus --- */
  console.log('\n=== Ce qui se voit : contraste et focus ===\n');
  // L'accueil se peint après le chargement des scripts : mesurer trop tôt
  // donnerait une page presque vide, donc zéro défaut — le pire des verts.
  await attendre('le rendu de l\'accueil', () =>
    evaluer(co, 'document.querySelectorAll(".etape-module").length >= 10').catch(() => false), 30000);
  const a = await evaluer(co, SONDE_APPARENCE);
  console.log('  vue « ' + a.vue + ' » — ' + a.examines + ' éléments de texte mesurés');
  for (const f of a.faibles) {
    console.log('  ✘ ' + f.el + ' — contraste ' + f.ratio + ' pour un seuil de ' + f.seuil + ' (« ' + f.texte + ' »)');
  }
  // Un compte trop bas veut dire qu'on a mesuré une page pas encore peinte :
  // c'est un échec, pas une réussite.
  verifie('apparence — la page mesurée est bien celle qu\'on voit', a.examines >= 40, true);
  verifie('apparence — aucun texte sous son seuil de contraste', a.faibles.length, 0);
  console.log('  règle :focus-visible globale : ' + (a.contourFocus || 'AUCUNE'));
  verifie('apparence — le focus clavier laisse une marque visible',
          !!a.contourFocus && !/^(none|0px|0)$/.test(a.contourFocus.trim()), true);

  co.fermer();
}

async function principal() {
  for (const p of [PAGE_MESURE, PAGE_APP]) {
    if (!fs.existsSync(p)) { console.error('introuvable : ' + p); process.exit(1); }
  }

  const exe = trouverNavigateur();
  if (!exe) manque('Aucun Chrome, Edge ou Chromium trouvé sur cette machine.');
  if (!fs.existsSync(exe)) manque('NAVIGATEUR pointe sur « ' + exe + ' », qui n\'existe pas.');

  const profil = fs.mkdtempSync(path.join(os.tmpdir(), 'aac-nav-'));

  const nav = spawn(exe, [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=0',
    '--user-data-dir=' + profil,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-background-networking',
    '--allow-file-access-from-files',
    '--window-size=1200,900',
    pathToFileURL(PAGE_MESURE).href
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  let erreurs = '';
  let adresse = null;
  nav.stderr.on('data', (b) => {
    const t = String(b);
    erreurs += t;
    const m = t.match(/ws:\/\/[^\s]+/);
    if (m && !adresse) adresse = m[0];
  });
  nav.on('error', (e) => { erreurs += '\n' + e.message; });

  const ranger = () => {
    try { nav.kill(); } catch (e) { /* déjà mort */ }
    // Windows garde parfois le profil verrouillé une seconde de plus : ce
    // n'est pas une raison de faire échouer un run par ailleurs réussi.
    try { fs.rmSync(profil, { recursive: true, force: true, maxRetries: 3 }); } catch (e) { /* tant pis */ }
  };
  process.on('exit', ranger);

  let code = 1;
  try {
    await attendre('l\'ouverture du navigateur', async () => adresse, 30000);
    const port = new URL(adresse).port;
    console.log('  navigateur : ' + path.basename(exe));

    const co = await suiteMesure(port);
    await suiteApplication(co);

    console.log('\n' + passees + ' vérification(s) passée(s), ' + echecs + ' échec(s).\n');
    code = echecs ? 1 : 0;
  } catch (e) {
    console.error('\n  Le harnais navigateur a échoué : ' + e.message);
    if (erreurs.trim()) {
      console.error('\n  Ce que le navigateur a dit :\n' + erreurs.trim().split('\n').map((l) => '    ' + l).join('\n'));
    }
    console.error('\n  La page de mesure reste ouvrable à la main : outils/verifier-navigateur.html');
    code = 1;
  }
  ranger();
  process.exit(code);
}

principal();
