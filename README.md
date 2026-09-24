<div align="center">

# Apprendre à coder — de A à Z

**Un cours de programmation complet, en français, qui tient dans un dossier.**
Pas d'installation. Pas de compte. Pas de connexion. On double-clique sur `index.html`, et on code.

[![Licence](https://img.shields.io/badge/logiciel-MIT-4257e0)](LICENSE)
[![Contenu](https://img.shields.io/badge/cours-CC--BY--SA%204.0-2c7a51)](LICENSE-COURS)
[![Hors ligne](https://img.shields.io/badge/hors%20ligne-100%25-a76410)](#pourquoi-hors-ligne)
[![Dépendances](https://img.shields.io/badge/d%C3%A9pendances-aucune-6d675c)](#et-côté-développement)

</div>

---

## Ce que c'est

Un logiciel éducatif pour quelqu'un qui part **vraiment** de zéro. On y écrit du vrai code, dans un
éditeur intégré ; le logiciel l'exécute, le corrige, et explique ce qui cloche — phrase par phrase,
en français, sans jargon.

|  |  |
|---|---|
| **165 leçons** | progressives, de « c'est quoi coder ? » aux pointeurs et aux classes |
| **484 exercices** | tous corrigés automatiquement, avec un message d'erreur écrit à la main |
| **12 modules** | le parcours se suit dans l'ordre, ou se pioche |
| **7 langages** | HTML, CSS, JavaScript, Python, SQL, C, Java |
| **13 mémos** | une encyclopédie consultable à tout moment, avec recherche |

## Démarrer

```
Télécharge le dossier, puis ouvre index.html dans ton navigateur.
```

C'est tout. Aucune étape suivante.

## Le parcours

| | Module | Ce qu'on y apprend |
|---|---|---|
| 👋 | **Bienvenue** | ce qu'est le code, et comment marche ce logiciel |
| 🧱 | **HTML** — 22 leçons | structure, formulaires, sémantique, médias, SEO, accessibilité |
| 🎨 | **CSS** — 25 leçons | couleurs, Flexbox, Grid, position, animations, `:has`, spécificité |
| ⚡ | **JavaScript** | variables, conditions, boucles, fonctions, objets, DOM |
| 🧠 | **JavaScript — la suite** | switch, tri, reduce, dates, clavier, et un jeu complet |
| 🔥 | **JavaScript avancé** — 19 leçons | méthodes modernes, DOM dynamique, localStorage, closures, classes, async |
| 🛠️ | **Projets guidés** | to-do list, quiz, jeu, carnet persistant — construits étape par étape |
| 🐍 | **Python** — 26 leçons | indentation, listes, dictionnaires, f-strings, compréhensions, héritage |
| 🗄 | **SQL** — 16 leçons | SELECT, GROUP BY, HAVING, sous-requêtes, jointures, conception |
| 🔧 | **C** — 14 leçons | types, mémoire, **pointeurs**, tableaux 2D, structures, récursion |
| ☕ | **Java** — 14 leçons | **classes et objets**, constructeurs, encapsulation, héritage |
| 🚀 | **Et après ?** | les autres langages, et comment continuer seul |

## Ce qui rend ce logiciel particulier

### Python, SQL, C et Java tournent pour de vrai

Pas de simulation, pas de sortie pré-écrite.

- **Python** — l'interpréteur [Skulpt](https://skulpt.org) est embarqué dans le dossier.
- **SQL** — un moteur maison (`sql-moteur.js`) exécute les requêtes sur une vraie base de cinéma.
  Les `INSERT`, `UPDATE` et `DELETE` persistent jusqu'à réinitialisation.
- **C et Java** — un interpréteur maison (`moteur-cj.js`) couvre tout le programme, pointeurs et
  objets compris. Les règles qui comptent sont respectées : les types sont réels, `7/2` vaut `3`,
  le point-virgule est obligatoire, une variable non déclarée est une erreur.

### L'éditeur sait se taire

La coloration syntaxique (`editeur.js`, une brique autonome) souligne en rouge ce qui est cassé —
guillemet non fermé, commentaire laissé ouvert, balise sans son chevron. **Mais jamais sur la ligne
où se trouve le curseur** : pour écrire `"bonjour"`, il faut bien passer par `"bonjour` sans son
guillemet fermant, et le reprocher à cet instant n'aurait aucun sens.

Et dans une **chasse au bug**, l'éditeur se tait complètement : trouver la faute *est* l'exercice.

### L'aide monte marche par marche

Rien n'est proposé avant d'avoir essayé. Premier échec : un indice, qui dit **où regarder**, pas quoi
écrire. Puis un deuxième, qui dit comment s'y prendre. Puis un troisième, qui donne presque la
réponse — et il faut avoir réessayé entre chaque. La solution n'arrive qu'une fois les paliers
épuisés.

**Les 425 exercices corrigés sont tous à trois paliers**, dans les sept langages. Le premier nomme
le piège propre à l'exercice — qu'une règle CSS fausse est ignorée en silence, qu'une balise jamais
refermée met en gras tout ce qui suit, que le premier élément d'une liste Python ne porte pas le
numéro 1.

### Un bac à sable, pas une page de cours

Un atelier plein écran : ton code à gauche, ce qu'il produit à droite. Onglets HTML / CSS / JS d'une
même page, plus Python, SQL, C et Java. Projets nommés et sauvegardés, export en `.html` ou `.py`.

Et un **repérage code ↔ page** : survole une ligne de HTML, l'élément qu'elle fabrique s'entoure dans
l'aperçu. Survole une règle CSS, et ce sont *tous* les éléments qu'elle touche qui s'entourent, avec
leur compte (`<li> × 3`). C'est le meilleur moyen de comprendre ce que fait un sélecteur.

### Une page pour revenir en arrière

Réussir un exercice ne veut pas dire l'avoir compris pour toujours — surtout celui qu'on a arraché en
six essais. La page **Réviser** repropose ce qui a coûté le plus d'essais, et ce qui commence à dater.
Les refaire ne touche à rien.

## Comment le contenu est vérifié

484 exercices corrigés automatiquement, c'est 425 correcteurs écrits à la main. Un correcteur trop
permissif est pire qu'absent : il félicite pour une réponse fausse. Deux harnais veillent.

```bash
npm install          # jsdom, pour les exercices HTML/CSS — développement uniquement
npm run tout-verifier
```

**`outils/verifier-contenu.js`** rejoue chaque exercice dans son vrai moteur et pose deux questions :

1. **Non-régression** — la solution officielle passe-t-elle son propre correcteur ?
2. **Mise à l'épreuve** — une copie *volontairement sabotée* est-elle bien refusée ? Le harnais
   fabrique de fausses copies ciblées : il retire l'élément que le correcteur cherche, corrompt le
   texte qu'il attend, enlève un `WHERE`, remplace un agrégat par un autre.

Un exercice qu'on n'a pas pu saboter n'est pas un exercice validé : le rapport le **nomme**, plutôt
que de le noyer dans un compte.

**`outils/test-interface.js`** juge l'autre moitié — ce que l'élève *voit* : quel bouton d'aide
apparaît après combien d'échecs, ce que l'éditeur souligne ou tait dans chacun des sept langages, et
ce que la recherche retrouve.

**`outils/verifier-navigateur.html`** couvre les 63 correcteurs que Node laisse de côté : ceux qui
*mesurent* la page — une largeur, une position, une couleur calculée, une media query. Ni Node ni
jsdom ne savent faire de mise en page ; seul un vrai navigateur en est capable. Cette page pose les
deux mêmes questions, et reste ouvrable à la main.

**`outils/verifier-navigateur.js`** l'ouvre à ta place. Tant qu'il fallait y penser, un correcteur
de mise en page pouvait partir cassé sans que rien ne crie — 13 % des exercices reposaient sur la
mémoire de quelqu'un. Le pilote lance le Chrome ou l'Edge **déjà installé** sur la machine, en mode
sans fenêtre, et lit le verdict. Pas de Chromium téléchargé, pas de Puppeteer : depuis Node 22,
`WebSocket` et `fetch` sont natifs, et parler le protocole DevTools tient en quarante lignes. Le
projet garde donc son unique dépendance de développement, jsdom.

Sans navigateur sur la machine, il le dit en gros et rend la main sans faire échouer le reste —
`VERIF_NAVIGATEUR=exige` inverse ce choix, `NAVIGATEUR=/chemin/vers/chrome` impose un binaire.

État actuel :

```
362 exercices rejoués sous Node   — 0 échec, 0 correcteur complaisant
358 copies sabotées présentées    — 358 refusées, 0 non éprouvé
 63 correcteurs de mise en page   — 0 échec, 0 complaisant (navigateur)
 77 vérifications d'interface     — 0 échec
425 exercices à trois paliers     — 0 palier cassé, doublé ou inversé
```

Soit **425 correcteurs sur 425** mis à l'épreuve, et pas seulement exécutés — le tout en une seule
commande, sans que personne ait à ouvrir quoi que ce soit.

## Pourquoi hors ligne

Parce qu'apprendre à coder ne devrait dépendre ni d'une connexion, ni d'un abonnement, ni qu'un
service existe encore dans deux ans. Le dossier se copie sur une clé USB et fonctionne tel quel.

Rien n'est envoyé nulle part : la progression, le code et les projets vivent dans le `localStorage`
du navigateur.

## Structure du dossier

```
index.html          le logiciel — c'est le seul fichier à ouvrir
app.js              l'application : navigation, leçons, correction, bac à sable
style.css           thèmes clair et sombre
editeur.js          coloration syntaxique des 7 langages — brique autonome
sql-moteur.js       le moteur SQL et sa base de cinéma
moteur-cj.js        l'interpréteur C et Java
skulpt*.js          l'interpréteur Python, chargé au premier code Python
                    seulement (tiers — voir NOTICE.md)
data-*.js           les 165 leçons et 484 exercices
outils/             les harnais de vérification (développement)
  verifier-contenu.js       rejoue les exercices et sabote les copies (Node)
  test-interface.js         l'aide, les genres, la recherche, la sauvegarde (jsdom)
  verifier-navigateur.html  les correcteurs qui mesurent la page (à ouvrir)
```

### Et côté développement

Le logiciel lui-même n'a **aucune dépendance**. `package.json` ne sert qu'aux outils : `jsdom`, pour
rejouer les exercices HTML/CSS hors navigateur.

## Ce qui a changé

Le [journal des versions](CHANGELOG.md) dit quoi, et surtout **pourquoi** — y compris quand une
mesure a démenti l'intention de départ.

## Licences

Deux, parce qu'il y a deux choses dans ce dossier.

- **Le logiciel** — MIT ([`LICENSE`](LICENSE)). Prends-le, découpe-le, mets-le ailleurs.
- **Le cours** — CC BY-SA 4.0 ([`LICENSE-COURS`](LICENSE-COURS)). Partage, traduis, adapte, même
  commercialement : cite la source, et laisse la suite aussi ouverte que tu l'as trouvée.
- **Les bibliothèques tierces** gardent la leur ([`NOTICE.md`](NOTICE.md)).

---

<div align="center">
<sub>Si ce cours te sert, la meilleure suite est d'écrire le tien.</sub>
</div>
