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

### 4.2 Fallback "sans Worker" (JS)

Non couvert par le verifier (Node), à noter pour plus tard.


### 4.3 Sandbox des iframes du bac à sable

srcdoc sans sandbox, cohérent hors ligne, à vérifier si on veut renforcer
la sécurité dans le futur (sans casser le pont postMessage).


## 5. Comment ré-examiner ce travail (pour Claude ou autre)

### 5.1 Relancer le verifier (source de vérité)

Depuis la racine du projet :

```powershell
cd c:\Users\mathe\Downloads\Apprendre-a-coder\Apprendre-a-coder
npm install   # si jsdom n'est pas installé (outils de dev uniquement)
node outils/verifier-contenu.js
```

Interpréter :

- Section "Correcteurs mis à l'épreuve" : 0 correcteur à regarder =
  cohérent avec ce run.
- "X copies écartées" = sabo.equivalentes (copies = même résultat que
  la solution).
- Nombre d'exercices sans copie à présenter = sabo.nonEprouves (16 dans
  ce run).

### 5.2 Relire la logique (fichier source)

Fichier : outils/verifier-contenu.js
- Section 7 (~398), 7 bis (~419), sabotagesGeneriques (552),
- controler (596), décision complaisant (620-653), sortie (657-715).
- Variables clés : sabo.testes, sabo.refuses, sabo.complaisants,
  sabo.equivalentes, sabo.nonEprouves.


## 6. Prochaines modifications possibles (liste, non appliquées)

1. Rendre "16 exercices sans copie à présenter" encore plus lisible dans la
   sortie du verifier (ex. ligne explicite).
2. Éventuellement lister les exercices non éprouvés dans la section
   "À regarder".
3. Renforcer la sécurité des iframes du bac (sandbox) si besoin, après
   vérification du pont postMessage.
4. (Plus tard) couverture du fallback JS "sans Worker" en conditions réelles.


## Notes de suivi

- Date de l'audit : 2026-09-22.
- Auteur : Solar (agent).
- Projet d'origine : "Apprendre à coder", package.json version 3.0.0.
- Ce fichier n'a pas modifié le code du projet éducatif : il est un compagnon
  de révision.

