# Licences et bibliothèques tierces

## Quelle licence couvre quoi

Ce projet en porte deux, parce qu'il contient deux choses différentes. Le
fichier `LICENSE` ne contient que le texte MIT, sans un mot de plus : c'est à
cette condition que GitHub le reconnaît. Le partage des rôles est donc écrit
ici.

| Ce que c'est | Fichiers | Licence |
|---|---|---|
| **Le logiciel** | `index.html`, `app.js`, `style.css`, `editeur.js`, `sql-moteur.js`, `moteur-cj.js`, `outils/`, `package.json`, `icone.ico` | MIT — voir `LICENSE` |
| **Le cours** | les 22 fichiers `data-*.js` : 165 leçons, 481 exercices | CC BY-SA 4.0 — voir `LICENSE-COURS` |
| **L'emprunté** | `skulpt.min.js`, `skulpt-stdlib.js` | MIT — voir ci-dessous |

Le moteur est un outil : qu'on le reprenne et qu'on s'en serve ailleurs sans
rien devoir, tant mieux. Le cours est un travail d'écriture : on peut le
reprendre et même le vendre, à condition de dire d'où il vient et de laisser
la suite aussi ouverte qu'on l'a trouvée.

---

## Bibliothèques tierces embarquées

Ce projet fonctionne hors ligne : les bibliothèques dont il a besoin sont
**copiées dans le dossier** plutôt que téléchargées. Elles gardent leur propre
licence, distincte de celles de ce projet (voir `LICENSE` et `LICENSE-COURS`).

Ce fichier existe parce que la licence MIT impose de conserver la mention de
copyright dans toute copie — et que la minification l'a effacée des fichiers
ci-dessous.

---

## Skulpt

L'interpréteur Python qui fait tourner les leçons Python dans le navigateur,
sans rien installer.

| | |
|---|---|
| **Fichiers** | `skulpt.min.js`, `skulpt-stdlib.js` |
| **Licence** | MIT |
| **Copyright** | © Scott Graham et les contributeurs du projet Skulpt |
| **Source** | https://skulpt.org — https://github.com/skulpt/skulpt |

`skulpt-stdlib.js` embarque une partie de la **bibliothèque standard de
Python**, dont les modules portent leurs propres en-têtes d'auteur et restent
sous la licence de la Python Software Foundation (PSF).

> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction... The above copyright notice and this
> permission notice shall be included in all copies or substantial portions of
> the Software.

Le texte intégral : https://github.com/skulpt/skulpt/blob/master/LICENSE

---

## Ce qui n'est PAS tiers

Tout le reste est écrit pour ce projet, et n'emprunte à personne :

- `sql-moteur.js` — le moteur SQL, et sa base de cinéma
- `moteur-cj.js` — l'interpréteur C et Java
- `editeur.js` — la coloration syntaxique des sept langages
- `app.js`, `style.css`, `index.html` — le logiciel lui-même
- `data-*.js` — les 165 leçons et 481 exercices

---

## Outils de développement

`jsdom` (licence MIT) est utilisé par `outils/verifier-contenu.js` pour rejouer
les exercices HTML/CSS. Il n'est **pas** embarqué dans le dossier : il
s'installe avec `npm install` et ne sert qu'au développement. Le logiciel
lui-même n'en a aucun besoin.
