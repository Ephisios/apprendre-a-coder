#!/usr/bin/env node
'use strict';

/* ===========================================================================
   Pilote les 63 correcteurs de mise en page, sans personne devant l'écran.
   ===========================================================================

   verifier-navigateur.html fait tout le travail : il rejoue les exercices que
   Node ne sait pas juger — ceux qui mesurent une largeur, une position, une
   couleur calculée, une media query. Mais il fallait penser à l'ouvrir. Un
   correcteur de mise en page pouvait donc partir cassé sans que rien ne crie.

   Ce fichier ouvre cette page tout seul et lit son verdict.

   POURQUOI AUCUNE DÉPENDANCE
   Puppeteer ou Playwright feraient cela en dix lignes, mais téléchargeraient
   un Chromium entier (~300 Mo) dans un projet dont `npm install` ne tire
   aujourd'hui qu'une seule bibliothèque, jsdom. Depuis Node 22, `WebSocket`
   et `fetch` sont globaux : parler le protocole DevTools à un navigateur
   déjà installé tient en une quarantaine de lignes. C'est ce qu'on fait.

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

const PAGE = path.join(__dirname, 'verifier-navigateur.html');
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
  const r = await co.envoyer('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
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

/* ---- 3. Le déroulé ------------------------------------------------------ */

function manque(raison) {
  const barre = '='.repeat(72);
  console.log('\n' + barre);
  console.log('  LES 63 CORRECTEURS DE MISE EN PAGE N\'ONT PAS ÉTÉ JUGÉS');
  console.log('  ' + raison);
  console.log('');
  console.log('  Ce sont 13 % des exercices, et aucun autre harnais ne les couvre.');
  console.log('  Ouvre outils/verifier-navigateur.html à la main, ou indique un');
  console.log('  navigateur : NAVIGATEUR=/chemin/vers/chrome npm run verifier-nav');
  console.log(barre + '\n');
  process.exit(EXIGE ? 1 : 0);
}

async function principal() {
  if (!fs.existsSync(PAGE)) { console.error('introuvable : ' + PAGE); process.exit(1); }

  const exe = trouverNavigateur();
  if (!exe) manque('Aucun Chrome, Edge ou Chromium trouvé sur cette machine.');
  if (!fs.existsSync(exe)) manque('NAVIGATEUR pointe sur « ' + exe + ' », qui n\'existe pas.');

  const profil = fs.mkdtempSync(path.join(os.tmpdir(), 'aac-nav-'));
  const url = pathToFileURL(PAGE).href;

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
    url
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

    // L'adresse annoncée sur stderr est celle du navigateur ; c'est l'onglet
    // qui nous intéresse, et il faut le demander par HTTP.
    const port = new URL(adresse).port;
    const onglet = await attendre('l\'onglet de la page', async () => {
      try {
        const liste = await (await fetch('http://127.0.0.1:' + port + '/json/list')).json();
        return liste.find((t) => t.type === 'page' && t.url.indexOf('verifier-navigateur.html') !== -1) || null;
      } catch (e) { return null; }
    }, 30000);

    const co = await connecter(onglet.webSocketDebuggerUrl);
    await co.envoyer('Runtime.enable', {});

    await attendre('le chargement de la page', () =>
      evaluer(co, 'document.readyState === "complete" && !!document.getElementById("lancer")'), 60000);

    // Les data-*.js doivent être là : sans eux la page jugerait zéro exercice
    // et annoncerait fièrement zéro échec.
    const combien = await evaluer(co, 'aMesurer().length');
    if (!combien) throw new Error('la page ne voit aucun exercice à mesurer — les data-*.js ne se sont pas chargés');

    console.log('  navigateur : ' + path.basename(exe) + '  ·  ' + combien + ' exercices à mesurer');
    await evaluer(co, 'document.getElementById("lancer").click(), null');

    const bilan = await attendre('le verdict de la page', () => evaluer(co, 'window.__bilan || null'), PATIENCE_MS);
    co.fermer();

    console.log('');
    for (const l of bilan.ennuis) {
      console.log('  ' + (l.classe === 'ko' ? '✘' : '?') + ' ' + l.ou + ' — ' + l.texte);
    }
    if (bilan.ennuis.length) console.log('');
    console.log('  ' + bilan.texte);
    code = (bilan.ko || bilan.complaisants) ? 1 : 0;
  } catch (e) {
    console.error('\n  Le harnais navigateur a échoué : ' + e.message);
    if (erreurs.trim()) {
      console.error('\n  Ce que le navigateur a dit :\n' + erreurs.trim().split('\n').map((l) => '    ' + l).join('\n'));
    }
    console.error('\n  La page reste ouvrable à la main : outils/verifier-navigateur.html');
    code = 1;
  }
  ranger();
  process.exit(code);
}

principal();
