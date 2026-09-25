#!/usr/bin/env node
'use strict';

/* ===========================================================================
   Les deux moteurs écrits à la main, éprouvés directement.
   ===========================================================================

   sql-moteur.js (29 Ko) et moteur-cj.js (53 Ko) sont des interprètes écrits
   de bout en bout pour ce cours — et, depuis la dernière section, les seize
   messages français qui traduisent les erreurs Python de Skulpt. Jusqu'ici, rien ne les éprouvait autrement
   qu'à travers les exercices : 44 requêtes SQL et 78 programmes C/Java, qui
   ne touchent qu'une partie de ce que les moteurs acceptent. Tout ce qu'aucun
   exercice n'utilise n'était vérifié par personne — et un moteur qui répond
   FAUX est pire qu'un moteur qui refuse, parce qu'il enseigne l'erreur.

   Ce fichier fixe leur contrat. Chaque attente a été MESURÉE sur le moteur
   avant d'être écrite : on épingle ce qu'il fait, on n'invente pas ce qu'il
   devrait faire. Une attente qui tombe signale donc un changement de
   comportement, pas une opinion.

   Usage :  node outils/test-moteurs.js
   Sans dépendance : les moteurs sont du JavaScript ordinaire, chargés dans
   un contexte vm avec un faux `window`.
   =========================================================================== */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const RACINE = path.join(__dirname, '..');
const ctx = { window: {}, console };
vm.createContext(ctx);
for (const f of ['data-sql.js', 'data-sql2.js', 'sql-moteur.js', 'moteur-cj.js']) {
  vm.runInContext(fs.readFileSync(path.join(RACINE, f), 'utf8'), ctx, { filename: f });
}
const W = ctx.window;

for (const nom of ['executerSQL', 'clonerBase', 'executerCJ']) {
  if (typeof W[nom] !== 'function') {
    console.error('Le moteur n\'expose pas ' + nom + ' : le contrat a changé, ce fichier ne peut rien juger.');
    process.exit(2);
  }
}

/* ---- Le compte rendu ---------------------------------------------------- */

let echecs = 0, passees = 0;
function verifie(intitule, obtenu, attendu) {
  if (JSON.stringify(obtenu) === JSON.stringify(attendu)) { passees++; return; }
  echecs++;
  console.log('  ÉCHEC  ' + intitule);
  console.log('         attendu : ' + JSON.stringify(attendu));
  console.log('         obtenu  : ' + JSON.stringify(obtenu));
}

/* Un message d'erreur est le produit, ici : c'est lui que l'élève lit. On
   refuse donc le vide, le « undefined », et la trace d'exécution. */
function messageUtile(intitule, texte) {
  const nu = String(texte || '').replace(/<[^>]+>/g, '').trim();
  verifie(intitule + ' — un message existe', nu.length > 15, true);
  verifie(intitule + ' — il ne fuit pas de « undefined »', /undefined|\[object |NaN/.test(nu), false);
  verifie(intitule + ' — ce n\'est pas une trace d\'exécution', /\bat \w+ \(|\.js:\d+/.test(nu), false);
  return nu;
}

/* ---- SQL ---------------------------------------------------------------- */

const sql = (requete) => {
  try { return W.executerSQL(requete, W.clonerBase(W.BASE_SQL)); }
  catch (e) { return { plantage: e && e.message }; }
};
// Les lignes seules, sans les colonnes : c'est ce qu'on compare le plus souvent.
const lignes = (requete) => { const r = sql(requete); return r.plantage ? 'PLANTAGE:' + r.plantage : (r.erreur ? 'ERREUR' : r.lignes); };
const colonnes = (requete) => { const r = sql(requete); return r.erreur ? 'ERREUR' : r.colonnes; };

console.log('\n=== SQL : le moteur répond-il juste ? ===\n');

verifie('SELECT * rend toutes les lignes', lignes('SELECT * FROM films').length, 8);
verifie('SELECT * rend toutes les colonnes, dans l\'ordre',
        colonnes('SELECT * FROM films'), ['id', 'titre', 'annee', 'genre', 'duree', 'note']);
verifie('une projection ne rend que ce qu\'on demande',
        colonnes('SELECT titre, annee FROM films'), ['titre', 'annee']);

verifie('WHERE avec égalité', lignes('SELECT titre FROM films WHERE annee = 2023'),
        [['Sable et Cendres'], ['Nuit Polaire']]);
verifie('WHERE avec AND', lignes('SELECT titre FROM films WHERE note > 8 AND genre = \'Thriller\''),
        [['Le Dernier Train']]);
verifie('WHERE avec OR', lignes('SELECT COUNT(*) FROM films WHERE annee = 2019 OR annee = 2024'), [[3]]);
verifie('WHERE avec NOT', lignes('SELECT COUNT(*) FROM films WHERE NOT genre = \'Drame\''), [[5]]);

verifie('LIKE avec % à la fin', lignes('SELECT titre FROM films WHERE titre LIKE \'Le %\''),
        [['Le Dernier Train'], ['Le Phare']]);
verifie('LIKE avec _ pour un seul caractère',
        lignes('SELECT titre FROM films WHERE titre LIKE \'_cho\''), [['Echo']]);

// La base contient un film sans note : c'est tout l'intérêt pédagogique de NULL.
verifie('IS NULL trouve la valeur absente',
        lignes('SELECT titre FROM films WHERE note IS NULL'), [['Echo']]);
verifie('IS NOT NULL compte les autres',
        lignes('SELECT COUNT(*) FROM films WHERE note IS NOT NULL'), [[7]]);

verifie('IN', lignes('SELECT COUNT(*) FROM films WHERE genre IN (\'Drame\', \'Comédie\')'), [[5]]);
verifie('BETWEEN est inclusif des deux côtés',
        lignes('SELECT COUNT(*) FROM films WHERE duree BETWEEN 88 AND 95'), [[2]]);

verifie('ORDER BY DESC puis LIMIT',
        lignes('SELECT titre FROM films ORDER BY note DESC LIMIT 2'),
        [['Sable et Cendres'], ['La Grande Traversée']]);
verifie('ORDER BY place la valeur absente en tête, en ordre croissant',
        lignes('SELECT titre FROM films ORDER BY note ASC LIMIT 1'), [['Echo']]);
verifie('ORDER BY accepte deux clés',
        lignes('SELECT genre, annee FROM films ORDER BY genre ASC, annee DESC LIMIT 2'),
        [['Aventure', 2018], ['Comédie', 2021]]);

verifie('DISTINCT retire les doublons', lignes('SELECT DISTINCT genre FROM films').length, 4);

/* Le piège classique, et le moteur ne s'y laisse pas prendre : COUNT(*)
   compte les lignes, COUNT(colonne) saute les valeurs absentes. */
verifie('COUNT(*) compte les lignes', lignes('SELECT COUNT(*) FROM films'), [[8]]);
verifie('COUNT(colonne) saute les valeurs absentes', lignes('SELECT COUNT(note) FROM films'), [[7]]);
verifie('AVG ignore aussi les valeurs absentes', lignes('SELECT AVG(note) FROM films'), [[7.614286]]);
verifie('MIN, MAX et SUM', lignes('SELECT MIN(duree), MAX(duree), SUM(duree) FROM films'), [[88, 142, 916]]);

verifie('GROUP BY regroupe', lignes('SELECT genre, COUNT(*) FROM films GROUP BY genre').length, 4);
verifie('HAVING filtre APRÈS le regroupement',
        lignes('SELECT genre FROM films GROUP BY genre HAVING COUNT(*) > 1').length, 3);
verifie('AS renomme la colonne rendue',
        colonnes('SELECT titre AS nom_du_film FROM films'), ['nom_du_film']);

verifie('JOIN rapproche deux tables',
        lignes('SELECT COUNT(*) FROM seances JOIN films ON seances.film_id = films.id'), [[8]]);
verifie('LEFT JOIN garde les lignes sans correspondance',
        lignes('SELECT COUNT(*) FROM films LEFT JOIN seances ON films.id = seances.film_id'), [[11]]);
verifie('une sous-requête sert de valeur',
        lignes('SELECT titre FROM films WHERE annee = (SELECT MAX(annee) FROM films)'), [['Echo']]);
verifie('UNION dédoublonne', lignes('SELECT genre FROM films UNION SELECT genre FROM films').length, 4);
verifie('UNION ALL garde tout', lignes('SELECT genre FROM films UNION ALL SELECT genre FROM films').length, 16);

/* --- l'écriture, et l'isolement d'une tentative à l'autre --- */
console.log('\n=== SQL : écrire, sans contaminer la tentative suivante ===\n');

const base = W.clonerBase(W.BASE_SQL);
const ins = W.executerSQL('INSERT INTO films (id, titre, annee, genre, duree, note) VALUES (9, \'Essai\', 2025, \'Test\', 100, 5)', base);
verifie('INSERT annonce ce qu\'il a fait', ins.type, 'insert');
verifie('INSERT ajoute vraiment la ligne', base.films.lignes.length, 9);
const maj = W.executerSQL('UPDATE films SET note = 10 WHERE id = 1', base);
verifie('UPDATE annonce ce qu\'il a fait', maj.type, 'update');
verifie('UPDATE modifie vraiment', base.films.lignes.find((l) => l.id === 1).note, 10);
const sup = W.executerSQL('DELETE FROM films WHERE id = 9', base);
verifie('DELETE annonce ce qu\'il a fait', sup.type, 'delete');
verifie('DELETE retire vraiment', base.films.lignes.length, 8);

// C'est clonerBase qui permet à un élève de rater un DELETE sans se punir
// pour l'essai suivant. Si la copie n'était pas profonde, la base d'origine
// serait abîmée et l'exercice deviendrait infaisable.
verifie('la base d\'origine n\'a pas bougé', W.BASE_SQL.films.lignes.length, 8);
verifie('ni la note du premier film', W.BASE_SQL.films.lignes.find((l) => l.id === 1).note, 8.2);

/* --- ce que le moteur doit REFUSER, avec un message qui aide --- */
console.log('\n=== SQL : refuser, et dire pourquoi ===\n');

const REFUS = [
  ['table inconnue', 'SELECT * FROM inexistante', /inexistante/],
  ['colonne inconnue', 'SELECT colonne_absente FROM films', /colonne_absente/],
  ['mot-clé mal orthographié', 'SELEC * FROM films', /SELECT/],
  ['requête tronquée', 'SELECT * FROM films WHERE', /expression|s.arr/i],
  ['requête vide', '', /vide/]
];
for (const [nom, requete, attendu] of REFUS) {
  const r = sql(requete);
  verifie('refus — ' + nom + ' : le moteur ne plante pas', !!r.plantage, false);
  const msg = messageUtile('refus — ' + nom, r.erreur);
  verifie('refus — ' + nom + ' : le message nomme le problème', attendu.test(msg), true);
}

// Limite connue, épinglée pour qu'un changement se voie : les alias de table
// ne sont pas gérés dans un JOIN. Aucun exercice n'en utilise — tous écrivent
// « films.titre » en entier. Ce qui compte, c'est que le refus reste lisible.
const alias = sql('SELECT f.titre FROM seances AS s JOIN films AS f ON s.film_id = f.id');
verifie('limite connue — un alias de table dans un JOIN est refusé, pas mal interprété',
        !!alias.erreur, true);
messageUtile('limite connue — alias de JOIN', alias.erreur);

/* ---- C et Java ---------------------------------------------------------- */

const cj = (langage, source) => {
  try { return W.executerCJ(langage, source) || { logs: [], erreur: null }; }
  catch (e) { return { plantage: e && e.message }; }
};
const sortie = (langage, source) => {
  const r = cj(langage, source);
  if (r.plantage) return 'PLANTAGE:' + r.plantage;
  if (r.erreur) return 'ERREUR:' + String(r.erreur).replace(/<[^>]+>/g, '').slice(0, 50);
  return r.logs;
};

const enC = (corps, avant) => '#include <stdio.h>\n' + (avant || '') + 'int main() {\n' + corps + '\nreturn 0;\n}';
const enJava = (corps, avant) => (avant || '') + 'public class Main { public static void main(String[] args) {\n' + corps + '\n} }';

console.log('\n=== C : le moteur exécute-t-il juste ? ===\n');

verifie('printf affiche une ligne', sortie('c', enC('printf("bonjour\\n");')), ['bonjour']);
verifie('les formats %d %f %c', sortie('c', enC('int a=3; float b=2.5; char c=\'x\'; printf("%d %.1f %c\\n",a,b,c);')),
        ['3 2.5 x']);
verifie('une boucle for', sortie('c', enC('for (int i=0;i<3;i++) printf("%d\\n", i);')), ['0', '1', '2']);
verifie('une boucle while', sortie('c', enC('int i=0; while(i<2){ printf("%d\\n",i); i++; }')), ['0', '1']);
verifie('une condition', sortie('c', enC('int n=5; if(n>3) printf("grand\\n"); else printf("petit\\n");')), ['grand']);
verifie('une fonction avec retour', sortie('c', enC('printf("%d\\n", carre(5));', 'int carre(int n){ return n*n; }\n')), ['25']);
verifie('un tableau', sortie('c', enC('int t[3]={1,2,3}; printf("%d\\n", t[1]);')), ['2']);
verifie('un pointeur écrit dans la case visée', sortie('c', enC('int a=7; int *p=&a; *p=9; printf("%d\\n",a);')), ['9']);
verifie('strlen sur une chaîne',
        sortie('c', '#include <stdio.h>\n#include <string.h>\nint main(){ char s[]="salut"; printf("%d\\n",(int)strlen(s)); return 0; }'), ['5']);
verifie('une structure', sortie('c', enC('struct P p; p.x=1; p.y=2; printf("%d\\n", p.x+p.y);', 'struct P { int x; int y; };\n')), ['3']);
verifie('la division entière tronque', sortie('c', enC('printf("%d\\n", 7/2);')), ['3']);

console.log('\n=== Java : le moteur exécute-t-il juste ? ===\n');

verifie('System.out.println', sortie('java', enJava('System.out.println("bonjour");')), ['bonjour']);
verifie('concaténer un nombre et du texte', sortie('java', enJava('int x=3; System.out.println("x vaut " + x);')), ['x vaut 3']);
verifie('une boucle for', sortie('java', enJava('for (int i=0;i<3;i++) System.out.println(i);')), ['0', '1', '2']);
verifie('un tableau et sa longueur', sortie('java', enJava('int[] t={1,2,3}; System.out.println(t.length);')), ['3']);
verifie('les méthodes de String', sortie('java', enJava('String s="salut"; System.out.println(s.length() + " " + s.toUpperCase());')), ['5 SALUT']);
verifie('une méthode statique',
        sortie('java', 'public class Main { static int carre(int n){ return n*n; }\npublic static void main(String[] a){ System.out.println(carre(5)); } }'), ['25']);
verifie('un objet et son constructeur',
        sortie('java', enJava('P p = new P(4); System.out.println(p.get());', 'class P { int x; P(int x){ this.x=x; } int get(){ return x; } }\n')), ['4']);
verifie('la division entière tronque aussi en Java', sortie('java', enJava('System.out.println(7/2);')), ['3']);

console.log('\n=== C et Java : refuser, et dire pourquoi ===\n');

const REFUS_CJ = [
  ['c', 'sans main', '#include <stdio.h>\nint f(){ return 1; }', /main/],
  ['c', 'parenthèse manquante', '#include <stdio.h>\nint main(){ printf("x" return 0; }', /\)/],
  ['c', 'division par zéro', enC('int a = 1/0; printf("%d\\n", a);'), /z.ro/i],
  ['c', 'boucle infinie', enC('while (1) {}'), /arr.ter|infinie/i],
  ['java', 'sans point de départ', 'public class Main { static int f(){ return 1; } }', /d.part|main/i],
  ['java', 'accolade manquante', 'public class Main { public static void main(String[] a){ System.out.println("x" } }', /\)/],
  ['java', 'case hors du tableau', enJava('int[] t={1}; System.out.println(t[5]);'), /case|tableau/i]
];
for (const [langage, nom, source, attendu] of REFUS_CJ) {
  const r = cj(langage, source);
  const ou = langage.toUpperCase() + ' — ' + nom;
  verifie('refus — ' + ou + ' : le moteur ne plante pas', !!r.plantage, false);
  const msg = messageUtile('refus — ' + ou, r.erreur);
  verifie('refus — ' + ou + ' : le message nomme le problème', attendu.test(msg), true);
}

/* Ce qui précède l'erreur doit rester affiché : c'est souvent là que l'élève
   comprend jusqu'où son programme est allé avant de trébucher. */
const avantErreur = cj('c', enC('printf("premiere\\n"); printf("%d\\n", 1/0);'));
verifie('ce qui a été affiché avant l\'erreur est conservé', avantErreur.logs, ['premiere']);

/* ========================================================================
   Ce que l'élève lit quand son Python casse
   ========================================================================
   Skulpt est une bibliothèque tierce et ne parle qu'anglais : « bad input on
   line 2 » pour à peu près toutes les fautes de structure. Deux fonctions
   d'app.js relisent le code à la place de l'élève et écrivent en français ce
   qui cloche — diagnostiquerSyntaxe (9 diagnostics) et traduirePython (7
   branches). Seize textes, qui sont du contenu pédagogique pur : c'est ce
   qu'on lit à l'instant précis où l'on est le plus perdu.

   Rien ne les vérifiait. Les autres harnais rejouent des SOLUTIONS, qui par
   définition ne plantent pas : le chemin d'erreur n'était emprunté par
   personne. Et le risque n'est pas qu'un message soit laid — c'est qu'il
   envoie chercher au mauvais endroit, ou qu'il ne se déclenche pas du tout
   et laisse l'anglais brut.

   On part donc de VRAIES fautes, exécutées par le VRAI Skulpt : si un jour
   la bibliothèque change ses tournures, toutes les traductions tomberaient
   silencieusement dans leur dernier « return m » et ces contrôles le
   diraient. Comparer des chaînes anglaises écrites à la main ne prouverait
   rien de tel.

   POURQUOI EXTRAIRE LES DEUX FONCTIONS plutôt que charger app.js : app.js a
   besoin d'un DOM et fait beaucoup de choses au chargement, alors que ces
   deux-là sont pures — des chaînes en entrée, une chaîne en sortie. On les
   découpe donc du fichier source. Si le découpage échoue, on s'arrête net
   plutôt que de sauter la section en silence. */

console.log('\n=== Python : ce que l\'élève lit quand son code casse ===\n');

function extraireFonction(source, nom) {
  const debut = source.indexOf('function ' + nom + '(');
  if (debut === -1) return null;
  let profondeur = 0;
  for (let k = source.indexOf('{', debut); k < source.length; k++) {
    if (source[k] === '{') profondeur++;
    else if (source[k] === '}') { profondeur--; if (!profondeur) return source.slice(debut, k + 1); }
  }
  return null;
}

let traduirePython = null;
{
  const app = fs.readFileSync(path.join(RACINE, 'app.js'), 'utf8');
  const morceaux = ['diagnostiquerSyntaxe', 'traduirePython'].map((n) => extraireFonction(app, n));
  if (morceaux.some((m) => !m)) {
    console.error('  Impossible de retrouver diagnostiquerSyntaxe ou traduirePython dans app.js.');
    console.error('  Elles ont été renommées ou déplacées : ces contrôles ne peuvent plus rien juger.');
    process.exit(2);
  }
  const boite = { exports: {} };
  new Function('module', morceaux.join('\n') + '\nmodule.exports = { traduirePython };')(boite);
  traduirePython = boite.exports.traduirePython;
}

// Skulpt : la même mise en route que verifier-contenu.js.
let Sk = null;
try {
  const bac = { console, setTimeout, clearTimeout, Date, Math, JSON, RegExp, Error };
  bac.window = bac; bac.self = bac; bac.globalThis = bac;
  vm.createContext(bac);
  for (const f of ['skulpt.min.js', 'skulpt-stdlib.js']) {
    vm.runInContext(fs.readFileSync(path.join(RACINE, f), 'utf8'), bac, { filename: f });
  }
  if (bac.Sk && bac.Sk.builtinFiles) Sk = bac.Sk;
} catch (e) { Sk = null; }

if (!Sk) {
  // Même convention que le reste du projet : on le dit, on ne le cache pas.
  console.log('  Skulpt n\'a pas pu être chargé : les seize messages français ne sont PAS jugés.');
  verifie('python — l\'interpréteur est disponible', false, true);
} else {
  const lancerPython = (code) => {
    Sk.configure({
      output: () => {},
      read: (x) => {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) throw "File not found: '" + x + "'";
        return Sk.builtinFiles.files[x];
      },
      __future__: Sk.python3,
      execLimit: 3000
    });
    try { Sk.importMainWithBody('<stdin>', false, code, true); return null; }
    catch (e) { return (e && e.toString) ? e.toString() : String(e); }
  };

  /* Chaque cas : une faute de débutant, et le mot que le message DOIT
     contenir pour envoyer l'élève au bon endroit. Les trois diagnostics de
     structure sont les plus délicats — « il manque l'indentation » et « la
     ligne est décalée alors que rien ne l'annonce » sont des conseils
     OPPOSÉS, et les confondre serait pire que se taire. */
  const FAUTES = [
    ['un nom inconnu', 'print(mavariable)', /« mavariable » est inconnu/],
    ['une majuscule de trop', 'age = 3\nprint(Age)', /« Age » est inconnu/],
    ['l\'indentation manquante', 'if True:\nprint("x")', /manque l'indentation à la ligne 2/],
    ['l\'indentation en trop', 'a = 1\n    b = 2', /ligne 2 est décalée alors que rien ne l'annonce/],
    ['les deux-points oubliés, if', 'if True\n    print("x")', /manque le « : » à la fin de la ligne 1/],
    ['les deux-points oubliés, for', 'for i in range(3)\n    print(i)', /manque le « : » à la fin de la ligne 1/],
    ['une parenthèse jamais refermée', 'print("bonjour"', /manque une fermeture/],
    ['une clé absente', 'd = {"a": 1}\nprint(d["b"])', /clé n'existe pas dans le dictionnaire/],
    ['un indice hors de la liste', 't = [1, 2, 3]\nprint(t[9])', /premier est à l'indice 0/],
    ['une division par zéro', 'print(1 / 0)', /division par zéro/],
    ['du texte ajouté à un nombre', 'print(3 + "3")', /types incompatibles/],
    ['une boucle sans fin', 'while True:\n    pass', /sans s'arrêter/]
  ];

  let restesEnAnglais = 0;
  for (const [nom, code, attendu] of FAUTES) {
    const brut = lancerPython(code);
    verifie('python — ' + nom + ' : Skulpt signale bien une erreur', typeof brut === 'string' && brut.length > 0, true);
    const lu = traduirePython(brut, code);
    if (lu === brut) restesEnAnglais++;
    verifie('python — ' + nom + ' : le message vise le bon endroit', attendu.test(String(lu)), true);
  }

  /* L'invariant qui compte le plus : aucune de ces fautes ne doit laisser
     passer l'anglais de Skulpt. Le jour où la bibliothèque changera ses
     tournures, c'est cette ligne qui le dira. */
  verifie('python — aucune de ces fautes ne laisse l\'anglais brut', restesEnAnglais, 0);

  // Et un programme juste ne doit évidemment rien signaler du tout.
  verifie('python — un programme correct ne produit aucune erreur',
          lancerPython('for i in range(3):\n    print(i)'), null);
}

console.log('\n' + passees + ' vérification(s) passée(s), ' + echecs + ' échec(s).\n');
process.exit(echecs ? 1 : 0);
