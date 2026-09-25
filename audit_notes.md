# Audit — "Apprendre à coder" (projet local, hors ligne)

Fichier conservé pour la relecture / ré-examen. Explique ce qui a été fait,
ce qui a été vérifié, et ce qui reste à vérifier.

Dernière modification de ce fichier : voir horodatage plus bas.

## 1. Ce qui a été lu du projet

- Racine : index.html + app.js (~119k caractères / 2519 lignes) + style.css
  (~70044 octets / 2262 lignes) + moteurs (sql-moteur.js, moteur-cj.js,
  editeur.js) + Skulpt (skulpt.min.js, skulpt-stdlib.js) + data-*.js
  + icône + outils/ + package.json (jsdom, dev only).
- Contenu : 12 modules / 7 langages / 165 leçons / 481 exercices, vérifié
  par outils/verifier-contenu.js.
- Moteurs : JS (Worker + fallback), Python (Skulpt), SQL (sql-moteur.js),
  C/Java (moteur-cj.js), DOM (jsdom optionnel).
- UI : sidebar, leçon, exercices, bac à sable multi-fichiers, thème
  anti-clignotant, accessibilité de base.


## 2. Ce qui a été fait pour le point 1 (capteur de copies / correcteurs)

### 2.1 Ce qui a été lu dans outils/verifier-contenu.js

- Section 7 (ligne ~398) : saboteurs de copies volontaires.
- Section 7 bis (~419) : saboteurs ciblés.
- Function utils : litterauxDe (445), corrompreTexte, sabotagesCibles,
  sabotagesGeneriques (552).
- Section 8 (596) : async controler, décision "complaisant" à 637-639.
- Sortie : lignes 657-715, avec sabo.testes, sabo.refuses,
  sabo.complaisants.length, sabo.equivalentes, sabo.nonEprouves.


### 2.2 Ce qui a été conclu

- sabo.complaisants.length = nombre de correcteurs à regarder.
- Le run affiche "0 correcteur(s) à regarder" : aucun correcteur n'a
  accepté de copie fausse non-équivalente.
- Les 10 copies écartées = sabo.equivalentes (copies donnant le même
  résultat que la solution) ; elles ne se mélangent pas aux 339 copies
  "réellement fausses présentées" (sabo.testes).
- Le bilan "338 refusées / 0 correcteur à regarder" est cohérent.
## 3. Ce qui a été vérifié (à cet instant)

- Logique du capteur : un correcteur n'est compté "à regarder" que si on lui a
  présenté au moins une copie fausse non-équivalente et qu'il l'a acceptée.
- Les chiffres du run sont cohérents avec la structure du script.
- Rien n'a été modifié dans le projet : l'audit est entièrement en lecture.


## 4. Ce qui reste à vérifier (ouvert)

### 4.1 Exercices sans copie à présenter (non éprouvés)

Le run courant affiche désormais (ligne 682) :
- "10 copies écartées : elles donnaient le même résultat que la solution ;
   16 exercices sans copie à présenter".

Donc dans ce run, 16 exercices n'ont pas pu être éprouvés : on ne peut pas
conclure sur leur correcteur à partir de ce test. C'est normal et documenté,
mais c'est bien l'information à surveiller pour une fausse sécurité.

RÉSOLU le 2026-09-23. Les 16 n'étaient pas des correcteurs laxistes : c'est
le saboteur qui était aveugle. Cinq défauts, tous dans
outils/verifier-contenu.js sauf le dernier :

1. selecteursDe() coupait le sélecteur au premier guillemet intérieur :
   'a[href^="https"]' devenait 'a[href^=', qui ne vise plus rien.
2. retirerSelecteur() refusait tout sélecteur composé ("ul li a",
   "header h1"), c'est-à-dire la forme la plus courante de ces leçons.
   Remplacé par retirerParDom(), qui confie la lecture du sélecteur à jsdom.
3. Une page entièrement vidée était jetée comme "pas une copie" (chaîne vide
   = falsy), alors que c'est la copie la plus fausse qui soit.
4. SQL : une requête d'agrégat sans WHERE, sans nombre et sans texte
   n'offrait prise à aucun sabotage. On vise désormais l'alias et l'agrégat.
5. css-22 [exo 1] était, lui, un VRAI correcteur complaisant : il ne lisait
   que le texte du code. Il acceptait donc une balise <style> cassée et une
   page dont la .carte avait disparu. Deux contrôles sur le DOM ont été
   ajoutés dans data-css3.js.

Une tentative intermédiaire a fait retomber le DOM sur le sabotage générique.
Mauvaise idée, et le harnais l'a montré : html-21 [exo 0] s'est retrouvé
accusé parce que les copies abîmaient "UTF-8" ou "</body>" dans un exercice
qui ne parle que d'Open Graph. Le commentaire d'origine ("frapper au hasard
ne prouverait rien") avait raison. Le DOM garde donc sa sortie sèche, et
reçoit à la place un sabotage ciblé : on corrompt les textes que le
correcteur cherche lui-même ("og:title", "https://").

Run du 2026-09-23 : 355 copies présentées, 355 refusées, 0 correcteur à
regarder, 0 exercice sans copie à présenter.

### 4.2 Fallback "sans Worker" (JS)

Non couvert par le verifier (Node), à noter pour plus tard.

RÉSOLU le 2026-09-25. Le repli n'était pas seulement non testé : il était
FAUX, et d'une façon qui accusait l'élève.

D'ABORD, UNE CRAINTE LEVÉE PAR LA MESURE. On pouvait redouter que les
Workers soient refusés en file://, donc que le repli soit le chemin NORMAL
du projet — qui s'ouvre par double-clic. Mesuré dans un Chrome réel :
new Worker(URL.createObjectURL(new Blob(...))) fonctionne parfaitement
depuis file://, l'origine y vaut "file://" et non "null". Le repli reste
donc bien un repli.

CE QUI ÉTAIT FAUX. Le Worker surveille les setTimeout / setInterval de
l'élève et attend qu'ils aient parlé avant de rendre son verdict. Le repli,
lui, rendait la main immédiatement : tout ce qui était différé se perdait.
Conséquence mesurée dans Chrome, Worker désactivé à la main, sur les deux
exercices de jsav-18 (« Le temps qui passe ») :

  exo 0 : REFUSÉ — « J'attends trois lignes — j'en compte 2. »
  exo 1 : REFUSÉ — « J'attends au moins 3 lignes — j'en compte 0. »

Un élève écrivant la bonne réponse se voyait donc reprocher un nombre de
lignes, sans aucun moyen de comprendre pourquoi.

Second défaut, plus discret : le Worker se fait terminate(), ce qui tue ses
minuteurs. Le repli ne coupait rien, et un setInterval de l'élève continuait
de tourner après le verdict. Le test le montre : sur l'ancien repli, le
tableau de logs comptait 0 ligne au verdict et 10 une demi-seconde plus tard.

CE QUI A ÉTÉ FAIT. Le repli suit les minuteurs comme le Worker, et les
éteint avant de rendre la main. setTimeout et setInterval sont passés en
PARAMÈTRES de new Function plutôt que posés sur les globales : le code de
l'élève les voit, le reste de l'application garde les siennes.

Vérifié dans Chrome en comparant les deux chemins sur cinq cas (log simple,
objet, erreur, setTimeout, setInterval) : zéro écart, y compris le nombre de
lignes produites par l'intervalle. Et les deux exercices de jsav-18 sont
désormais acceptés à l'identique avec et sans Worker.

CE QUI RESTE HORS DE PORTÉE, ET QU'AUCUN TEST NE PROUVERA. Le repli ne peut
pas arrêter une boucle infinie. Le Worker se fait terminate() au bout de 3 s
et affiche « ton code tourne sans s'arrêter » ; le repli s'exécute sur le fil
principal, où rien n'interrompt du code synchrone. Une boucle sans fin y fige
l'onglet. C'est écrit dans app.js à l'endroit où ça se joue, et c'est la
raison pour laquelle le Worker reste le chemin normal.

COUVERTURE. jsdom ne fournit ni Worker ni URL.createObjectURL : c'est donc
TOUJOURS le repli qui s'exécute dans test-interface.js. Dix vérifications
l'y attendent maintenant. Le chemin Worker, lui, n'est pas couvert par un
harnais — il a été mesuré à la main.


### 4.3 Sandbox des iframes du bac à sable

srcdoc sans sandbox, cohérent hors ligne, à vérifier si on veut renforcer
la sécurité dans le futur (sans casser le pont postMessage).

RÉSOLU le 2026-09-24, pour le bac à sable seul.

L'aperçu du bac porte désormais
  sandbox="allow-scripts allow-popups allow-forms allow-modals"
donc SANS allow-same-origin : il tombe dans une origine opaque. Mesuré dans
un Chrome réel, avant et après : parent.document et parent.localStorage
lèvent maintenant SecurityError. C'était la seule porte ouverte sur la
progression et les projets — et le bac est précisément l'endroit où l'on
colle du code trouvé ailleurs.

Le pont n'a pas souffert : il passait déjà entièrement par postMessage,
qui traverse les origines. Les deux sens ont été vérifiés dans un vrai
navigateur, sondes temporaires à l'appui :
  - iframe -> parent : le survol d'un élément remonte {genre:"survol",
    ligne:2} et la gouttière s'allume ;
  - parent -> iframe : le survol d'une ligne de code envoie {__aac:"ligne"}
    et le calque retrouve bien l'élément visé (trouves: 1).

PIÈGE DE MESURE, à connaître avant de retoucher à cela. Une iframe
sandboxée passe hors-processus, et les événements souris synthétiques
envoyés par le protocole DevTools n'y entrent PAS. Un premier test a donc
conclu que le repérage était cassé, alors qu'il fonctionnait. Il a fallu
faire déclencher le mouseover DEPUIS l'iframe pour voir juste. Une vraie
souris n'a jamais été concernée.

CE QUI AURAIT ÉTÉ CASSÉ, ET COMMENT ON L'A GARDÉ. Une origine opaque n'a
pas de localStorage : y toucher lève. Or le cours l'enseigne (jsav-6,
proj-4) et le bac est où l'on vient l'essayer. Le pont installe donc un
localStorage de remplacement : la lecture se fait sur une copie posée dans
la page au moment du rendu (donc synchrone, comme la vraie API), et chaque
écriture est renvoyée au parent, qui la garde sous « aac-bac-stockage » —
une clé à part, jamais mêlée à la progression. sessionStorage existe aussi,
mais sans persistance, ce qui est sa sémantique exacte.

CE QUI RESTE HORS SANDBOX, ET POURQUOI. Les iframes d'exercice (apercu-<i>)
gardent l'accès même origine : le correcteur lit ctx.doc et ctx.win, donc
iframe.contentDocument. Les sandboxer casserait les 140 correcteurs DOM et
de mise en page. Le compromis est différent là-bas : le code exécuté est
celui que l'élève écrit pour répondre à une consigne, pas du code collé.


### 4.4 Les moteurs maison, hors du contexte d'un exercice

RÉSOLU le 2026-09-25. sql-moteur.js (29 Ko) et moteur-cj.js (53 Ko) n'étaient
exercés qu'à travers les 44 exercices SQL et 78 C/Java, donc seulement sur ce
que ces exercices se trouvent utiliser. outils/test-moteurs.js fixe leur
contrat en 121 vérifications, toutes mesurées sur le moteur avant d'être
écrites.

CE QUE LE MOTEUR SQL FAIT JUSTE, et qui méritait d'être épinglé : COUNT(*)
compte les lignes, COUNT(colonne) saute les valeurs absentes (8 contre 7 sur
la table films), AVG les ignore également, UNION dédoublonne là où UNION ALL
garde tout, LEFT JOIN conserve les lignes sans correspondance (11 contre 8).
Ce sont les vraies sémantiques SQL.

UNE LIMITE CONNUE, épinglée pour qu'un changement se voie : les alias de
table ne sont pas gérés dans un JOIN. « SELECT f.titre FROM films AS f »
échoue. Aucun exercice n'en utilise — tous écrivent « films.titre » en
entier. Le test vérifie que le refus reste lisible, pas que la requête passe.

UN VRAI DÉFAUT TROUVÉ, dès la première exécution du harnais : en C et en
Java, tout ce que le programme avait AFFICHÉ avant une erreur d'exécution
était perdu. executerCJ déclarait sa machine dans le try ; le catch ne
pouvait pas l'atteindre et renvoyait « logs: [] » en dur. L'élève ne voyait
que le message d'erreur, sans rien de ce qui précédait — alors que c'est
souvent là qu'il comprend jusqu'où il était allé. Corrigé. Les 78 correcteurs
C/Java et leurs copies sabotées passent toujours.


### 4.5 Les messages d'erreur Python

RÉSOLU le 2026-09-25. Seize textes français — diagnostiquerSyntaxe (9) et
traduirePython (7) dans app.js — traduisent les erreurs de Skulpt. Aucun
harnais ne les touchait : tous rejouent des SOLUTIONS, qui ne plantent pas,
donc le chemin d'erreur n'était emprunté par personne.

26 vérifications dans outils/test-moteurs.js, qui partent de VRAIES fautes
exécutées par le VRAI Skulpt. C'est le point important : comparer des
chaînes anglaises écrites à la main ne prouverait rien. Si Skulpt change ses
tournures, toutes les branches tombent dans leur « return m » final et
l'élève lit l'anglais ; une ligne compte ces retombées et doit rester à 0.

MESURE DU JOUR : 14 fautes sur 14 traduites, 0 anglais. Chaque diagnostic
vise juste, y compris la distinction entre « il manque l'indentation » et
« la ligne est décalée alors que rien ne l'annonce » — deux conseils
OPPOSÉS. Les intervertir ne laisse passer aucun anglais : seul le contrôle
de chaque cas l'attrape. Les deux sabotages ont été joués avant de garder
la section.

UNE BRANCHE MORTE, à savoir avant d'y toucher : traduirePython teste
« IndentationError », que Skulpt n'émet jamais — il dit « bad input » pour
toutes les fautes de structure. La branche est inoffensive et défensive,
mais elle ne s'exécute pas ici.


### 4.6 Les projets du bac, et la sortie clavier de l'éditeur

RÉSOLU le 2026-09-25. 41 vérifications ajoutées à test-interface.js.

LES PROJETS. Le bac garde le travail de l'élève dans le localStorage, et
rien ne le vérifiait — la progression l'était, pas le travail. On contrôle
le garde-fou du dernier projet, le refus de confirmation, la reprise d'un
projet enregistré avant l'ajout des onglets SQL/C/Java (projetCourant le
complète à la volée), et le nom de fichier à l'export dans les cinq onglets.

LA SORTIE CLAVIER. Une zone de texte qui avale Tab est un piège au clavier.
L'éditeur capture Tab pour indenter, mais Échap relâche la capture et
l'astuce affichée l'annonce. Personne ne le vérifiait.

UN PIÈGE DE TEST, à connaître avant d'écrire ici. Compter les projets après
une suppression ne prouve RIEN : sans le garde-fou, le projet est supprimé,
puis rendreBac appelle projetCourant qui en recrée un vide. Le compte
revient à 1 et le contrôle reste vert — alors que le travail a disparu. Le
contrôle porte donc sur le NOM du projet survivant.

UN SECOND PIÈGE : la fonction verifie() de ce fichier compare par égalité
STRICTE, pas par JSON. Comparer deux tableaux échoue toujours. On compare
des chaînes.


### 4.7 L'affichage et la navigation

RÉSOLU le 2026-09-25, en partie et délibérément. 32 vérifications dans
test-interface.js sur ce qui a un vrai comportement : la console, le
verdict, et ce que la navigation retient (thème, onglet du bac, plein
écran, aria-expanded du sommaire).

CE QUI N'A PAS ÉTÉ ÉCRIT, ET POURQUOI. Les enveloppes d'une ligne —
allerLeconExo vaut allerLecon suivi d'un setTimeout, versBacASable et
allerMemos sont des redirections — n'ont pas reçu de contrôle. Les quatre
vues de la section 4.x sur l'accessibilité les traversent déjà, et les
éprouver une à une n'ajouterait que des assertions incapables d'échouer.

LE POINT PÉDAGOGIQUE À NE PAS CASSER : verdictRepeteLaConsole. Quand un
correcteur renvoie l'erreur du moteur telle quelle, le verdict est remplacé
par une phrase qui désigne la console au lieu de répéter le même texte —
sans quoi l'élève croit à deux problèmes distincts. C'est vérifié dans les
deux sens : un message identique est remplacé, un message différent est
laissé intact.

DEUX PIÈGES RENCONTRÉS, à connaître avant d'ajouter ici :
- un contrôle sous « if (element) » disparaît en silence si le balisage
  change. L'absence de l'élément doit être un échec à part entière ;
- app.js contient trois setAttribute('aria-expanded'), et String.replace
  ne remplace que la PREMIÈRE occurrence. Un sabotage de contrôle mal visé
  fait conclure à tort qu'une vérification ne mord pas.


### 4.8 Le câblage

RÉSOLU le 2026-09-25, et c'est un revirement. La section 4.7 affirmait que
les fonctions de câblage ne méritaient pas de contrôle, faute de pouvoir
échouer. C'était vrai des assertions envisagées, faux du câblage lui-même.

SON MODE DE PANNE, unique et sournois : un bouton qui appelle une fonction
qui n'existe plus. Renommer sans toucher au HTML ne casse rien au
chargement — ça casse au clic, chez l'élève, sans un mot dans la console.

DEUX CONTRÔLES, dans test-interface.js :

1. Recensement. Les 33 fonctions nommées dans un onclick, onchange ou
   oninput — dans index.html comme dans le HTML fabriqué par app.js —
   doivent exister sur window. Le contrôle nomme les manquantes. Une
   garde exige d'en avoir recensé au moins 25 : si la lecture échouait,
   l'ensemble serait vide et le contrôle passerait sans rien regarder.

2. Traversée des cinq vues, qui épingle deux comportements d'accessibilité
   que rien ne couvrait : chaque vue s'annonce dans la zone lue par les
   lecteurs d'écran, et le focus repart du titre de la vue. Sans ce
   déplacement, la navigation au clavier recommencerait au tout début du
   document à chaque changement.

SABOTAGE DE CONTRÔLE : renommer une fonction appelée par un bouton, retirer
le focus et retirer l'annonce fait tomber 11 vérifications, et le
recensement nomme le coupable.


## 5. Comment ré-examiner ce travail (pour Claude ou autre)

### 5.1 Relancer le verifier (source de vérité)

Depuis la racine du projet :

```powershell
cd <la racine du projet>
npm install   # si jsdom n'est pas installé (outils de dev uniquement)
node outils/verifier-contenu.js
```

Sans jsdom, les 77 exercices HTML/CSS sont annoncés comme non couverts au
lieu d'être rejoués : le rapport le dit, mais c'est un piège si on lit vite.

Interpréter :

- Section "Correcteurs mis à l'épreuve" : 0 correcteur à regarder =
  cohérent avec ce run.
- "X copies écartées" = sabo.equivalentes (copies = même résultat que
  la solution).
- Nombre d'exercices sans copie à présenter = sabo.nonEprouves (0 depuis
  le 2026-09-23 ; la ligne disparaît alors du rapport).

### 5.2 Relire la logique (fichier source)

Fichier : outils/verifier-contenu.js
- Section 7 (~398), 7 bis (~419), sabotagesGeneriques (552),
- controler (596), décision complaisant (620-653), sortie (657-715).
- Variables clés : sabo.testes, sabo.refuses, sabo.complaisants,
  sabo.equivalentes, sabo.nonEprouves.


## 6. Prochaines modifications possibles (liste)

1. FAIT (2026-09-22) — rendre "16 exercices sans copie à présenter" lisible
   dans la sortie du verifier.
2. FAIT (2026-09-22) — lister nommément les exercices non éprouvés.
   Ce sont ces deux lignes qui ont permis de trouver les cinq défauts du
   saboteur décrits en 4.1 : un compte anonyme ne les aurait jamais révélés.
3. FAIT (2026-09-24) — sandbox sans allow-same-origin sur l'aperçu du bac,
   avec un localStorage de remplacement pour ne pas casser ce que le cours
   enseigne. Détail, mesures et piège de mesure en 4.3.
4. FAIT (2026-09-25) — le repli « sans Worker » est couvert par dix
   vérifications, et surtout corrigé : il ignorait les minuteurs et faisait
   refuser les deux exercices de jsav-18. Détail et mesures en 4.2.
5. FAIT (2026-09-23) — les 63 correcteurs qui mesurent la page n'étaient
   rejoués par personne : ni le verifier (Node ne calcule pas de largeur),
   ni une relecture. outils/verifier-navigateur.html les exécute dans un
   vrai navigateur, avec les deux mêmes questions que le harnais Node.
   Premier run : 63 jugés, 0 solution refusée, 0 complaisant.

   Deux pièges rencontrés en l'écrivant, à connaître avant d'y toucher :

   - requestAnimationFrame est SUSPENDU quand l'onglet n'est pas visible.
     S'y fier seul donne un harnais qui reste bloqué pour toujours dès
     qu'on regarde ailleurs — il passe alors pour cassé. On prend le
     premier des deux qui répond, la rafale d'images ou un délai de 60 ms.
   - La page s'ouvre en file:// et ne peut donc PAS lire index.html pour
     en tirer la liste des data-*.js : les navigateurs refusent la requête.
     Elle porte donc sa propre liste, et verifier-contenu.js compare les
     deux — une divergence devient un problème structurel.


## Notes de suivi

- Date de l'audit : 2026-09-22.
- Auteur : Solar (agent).
- Projet d'origine : "Apprendre à coder", package.json version 3.0.0.
- Ce fichier n'a pas modifié le code du projet éducatif : il est un compagnon
  de révision.

