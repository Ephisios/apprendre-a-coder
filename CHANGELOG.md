# Journal des versions

Ce qui a changé, dans l'ordre, et *pourquoi*. Les versions suivent
[SemVer](https://semver.org/lang/fr/) : le premier nombre change quand le cours change de forme, le
deuxième quand il gagne quelque chose, le troisième quand on répare.

---

## 3.1.0 — 2026-09-23

Une version consacrée à deux choses : **ce que l'élève voit quand il se trompe**, et **ce qui
garantit que les corrections sont justes**.

### Ajouté

- **L'aide monte marche par marche.** Un exercice peut proposer plusieurs indices (`indices: [...]`),
  rangés du plus discret au plus explicite. Un palier s'ouvre par échec, jamais deux d'affilée : il
  faut avoir réessayé avec le précédent. La solution n'apparaît qu'une fois les paliers épuisés.
  Entre « où regarder » et « voici la réponse », il n'y avait rien — et c'est là qu'on abandonne.
  Dix exercices convertis, choisis où l'on décroche vraiment : pointeurs en C, compréhensions
  Python, classes Java, `HAVING` en SQL.
- **Chaque exercice annonce sa nature** — Exercice, Entraînement, Défi, Étape, Chasse au bug — avec
  une explication au survol.
- **Une page « Réviser »** (bouton 🔄) qui repropose les exercices déjà réussis ayant coûté le plus
  d'essais, et ceux qui commencent à dater. Les refaire ne touche pas à la progression.
- **Sauvegarder et restaurer sa progression** dans un fichier `.json`, sous la barre de progression.
  Tout vivait dans le `localStorage` et nulle part ailleurs : vider les données du navigateur
  effaçait l'ensemble, sans retour possible.
- **Une première marche à chaque projet guidé.** Le module passait des leçons guidées à
  « implémente tout » d'un coup. Trois étapes préparatoires : faire parler la page avant de la faire
  réagir, faire jouer l'ordinateur avant de désigner un vainqueur, afficher une liste avant de la
  sauvegarder. Le module passe de 5 à 8 exercices.
- **`outils/verifier-navigateur.html`**, qui exécute enfin les 63 correcteurs mesurant la page — le
  dernier angle mort, 13 % des exercices. Ni Node ni jsdom ne savent faire de mise en page.
- **`outils/test-interface.js`**, 77 vérifications sur ce que l'élève voit : l'escalade de l'aide,
  le silence de l'éditeur dans les sept langages, la recherche, la révision, la sauvegarde.
- **Deux licences**, un `NOTICE.md`, un `README.md` et un `.gitattributes`.

### Corrigé

- **Les chasses au bug soulignaient leur propre réponse.** Le LISEZMOI promettait que l'éditeur ne
  signale jamais l'erreur d'une chasse au bug — la trouver étant l'exercice. Cette promesse tenait à
  un cas codé en dur pour la leçon `css-1` : les **quatorze autres** voyaient leur faute soulignée en
  rouge avant la première lecture. Le silence vaut maintenant pour les sept langages.
- **L'étiquette d'un exercice suivait sa position, pas sa nature.** Le troisième exercice d'une leçon
  s'appelait toujours « Défi », même quand c'était une chasse au bug.
- **Le saboteur du harnais était aveugle sur les pages.** Seize correcteurs passaient pour « non
  éprouvés » alors qu'ils n'avaient simplement jamais été attaqués : les sélecteurs à attribut
  étaient tronqués au premier guillemet (`a[href^="https"]` devenait `a[href^=`), les sélecteurs
  composés (`ul li a`) refusés en bloc, et une page entièrement vidée jetée comme « pas une copie »
  alors que c'est la copie la plus fausse qui soit.
- **Un vrai correcteur complaisant : `css-22`.** Il ne lisait que le texte du code, et acceptait donc
  une balise `<style>` cassée ou une page dont l'élément visé avait disparu.
- **La recherche ne voyait que les titres des leçons.** Chercher « pointeur » ramenait le titre, mais
  jamais le paragraphe qui l'explique. L'index passe de 318 à 1741 entrées.

### Changé

- **L'interpréteur Python n'est plus chargé au démarrage** mais au premier code Python. Le premier
  affichage descend de 2304 à 1360 Ko.

  > Honnêteté sur le motif : « cela diviserait le temps de démarrage » était faux. Mesuré dans un
  > navigateur, Skulpt coûte 16 ms sur 194. Ce qu'on économise vraiment, c'est la mémoire d'un
  > interpréteur entier gardé pour rien sur une machine modeste.

- Les 22 `data-*.js` **restent** chargés au démarrage : ils pèsent 40 ms, et les différer
  demanderait un manifeste et un chargement asynchrone qui casseraient la page d'accueil, l'index de
  recherche et les trois harnais. 40 ms ne valent pas ça.

### Pour qui reprend le projet

Trois harnais, et aucun ne remplace les autres :

```bash
npm run tout-verifier        # les correcteurs (Node) + l'interface (jsdom)
```

puis `outils/verifier-navigateur.html`, à ouvrir à la main, pour ce qui se mesure.

```
362 exercices rejoués sous Node   — 0 échec, 0 correcteur complaisant
358 copies sabotées présentées    — 358 refusées, 0 non éprouvé
 63 correcteurs de mise en page   — 0 échec, 0 complaisant
 77 vérifications d'interface     — 0 échec
```

---

## 3.0.0 — 2026-09-21

Première version publiée : le logiciel complet.

- 165 leçons, 481 exercices corrigés automatiquement, 12 modules, 7 langages.
- Python (Skulpt embarqué), SQL, C et Java exécutés pour de vrai, hors ligne.
- Éditeur avec coloration des sept langages, qui ne souligne jamais la ligne du curseur.
- Bac à sable multi-fichiers, avec repérage code ↔ page.
- Encyclopédie de 13 mémos, avec recherche.
- `outils/verifier-contenu.js` : rejeu des exercices et mise à l'épreuve des correcteurs.
