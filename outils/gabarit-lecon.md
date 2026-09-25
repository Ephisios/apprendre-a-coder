# Le gabarit d'une leçon

Une leçon n'est pas une fiche. La fiche dit **comment** ; la leçon dit aussi **pourquoi**, **ce qui se
passe vraiment**, **ce qui va mal tourner** et **à quoi ça sert**. Les exercices viennent ensuite
vérifier : ils ne doivent pas avoir à enseigner à la place du cours.

Objectif : **400 à 700 mots de cours** (3 à 5 minutes de lecture), hors blocs de code et hors
« Aller plus loin ». Le vérificateur refuse une leçon au gabarit qui descend sous 350 mots.

Leçons de référence : `jsav-fleches`, `jsav-2`, `py-7`, `j-5`.

## Les sept parties, dans l'ordre

| # | Partie | Balisage | Obligatoire |
|---|---|---|---|
| 1 | **Pourquoi ça existe** : le problème que la notion résout, dans une situation concrète. Un ou deux paragraphes. | `<h2>Pourquoi ça existe</h2>` | oui |
| 2 | **La notion** : la syntaxe, expliquée morceau par morceau. Un ou plusieurs `<h2>` au titre libre. | `<h2>…</h2>` | oui |
| 3 | **Pas à pas** : une trace d'exécution, une ligne par étape, avec les valeurs. | `<table class="memo-table trace">` | oui |
| 4 | **Les pièges** : deux ou trois erreurs fréquentes. Chacune : le code fautif, ce qu'on voit, comment corriger. | `<h2>Les pièges</h2>` | oui |
| 5 | **Dans la vraie vie** : où l'on croise la notion dans un vrai site, une vraie application. | `<h2>Dans la vraie vie</h2>` | recommandée |
| 6 | **À retenir** : 2 à 4 points, relisibles seuls, la veille d'un exercice. | `<div class="a-retenir"><ul>…</ul></div>` | oui |
| 7 | **Aller plus loin** : le « sous le capot », pour les curieux. Replié par défaut. | `<details class="plus-loin"><summary>Aller plus loin : …</summary>…</details>` | non |

C'est la présence du bloc `a-retenir` qui fait entrer une leçon dans le gabarit : à partir de là,
`npm run verifier` exige les parties obligatoires. Les leçons écrites avant le gabarit ne sont pas
des erreurs ; le vérificateur les compte (« gabarit de leçon : 4 / 166 »), pour qu'on voie la
conversion avancer.

## Les règles d'écriture

- **Tutoiement, phrases courtes, aucun mot technique qui ne soit expliqué** la première fois.
- **Chaque leçon tient debout seule.** « Comme en C » peut servir de repère, jamais de dispense
  d'explication : l'élève a pu arriver directement.
- **Un message d'erreur cité est un message vérifié.** Avant de l'écrire, lancer le code fautif dans
  le logiciel et recopier ce qu'il affiche vraiment. Les moteurs maison ont leurs propres mots
  (« la variable `i` n'existe pas »), et la console affiche un tableau de `undefined` sous la forme
  `[null,null]`.
- **Ne pas utiliser une notion avant de l'avoir enseignée**, même dans un exemple. Si c'est
  inévitable, le dire en une phrase et renvoyer à la leçon qui l'explique.
- **Les blocs de code tiennent dans la colonne** : les commentaires longs vont sur leur propre ligne,
  au-dessus du code, plutôt qu'en bout de ligne.
- **Pas d'émoji dans les encarts** : `astuce`, `attention` et `info` affichent déjà leur étiquette.
- **Échapper le HTML** dans le cours : `&lt;` pour `<`, et pas d'accent grave ni de `${` dans un
  `contenu` (il est écrit dans un gabarit de chaîne JavaScript).

## Squelette à copier

```html
<h2>Pourquoi ça existe</h2>
<p>…</p>

<h2>La notion, avec un titre parlant</h2>
<pre class="bloc-code">…</pre>
<p>…</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td>…</td><td>…</td></tr>
</table>

<h2>Les pièges</h2>
<p><strong>Le piège, en une phrase.</strong> …</p>

<h2>Dans la vraie vie</h2>
<p>…</p>

<div class="a-retenir">
<ul>
<li>…</li>
<li>…</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : …</summary>
<p>…</p>
</details>
```
