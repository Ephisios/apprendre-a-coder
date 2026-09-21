/* ===== Encyclopédie ===== */
window.DATA_MEMOS = [

{
  id: 'html',
  titre: 'Mémo HTML',
  contenu: `
<h2 style="margin-bottom:10px">Les balises essentielles</h2>
<table class="memo-table">
<tr><th>Balise</th><th>Rôle</th><th>Exemple</th></tr>
<tr><td>&lt;h1&gt; à &lt;h6&gt;</td><td>Titres, du plus au moins important</td><td>&lt;h1&gt;Mon titre&lt;/h1&gt;</td></tr>
<tr><td>&lt;p&gt;</td><td>Paragraphe</td><td>&lt;p&gt;Du texte.&lt;/p&gt;</td></tr>
<tr><td>&lt;strong&gt; / &lt;em&gt;</td><td>Important (gras) / accentué (italique)</td><td>&lt;strong&gt;attention&lt;/strong&gt;</td></tr>
<tr><td>&lt;ul&gt; &lt;ol&gt; &lt;li&gt;</td><td>Liste à puces / numérotée / élément</td><td>&lt;ul&gt;&lt;li&gt;Pain&lt;/li&gt;&lt;/ul&gt;</td></tr>
<tr><td>&lt;a href="..."&gt;</td><td>Lien</td><td>&lt;a href="https://..."&gt;Cliquer&lt;/a&gt;</td></tr>
<tr><td>&lt;img src="..." alt="..."&gt;</td><td>Image (pas de balise fermante)</td><td>&lt;img src="chat.jpg" alt="Un chat"&gt;</td></tr>
<tr><td>&lt;br&gt; / &lt;hr&gt;</td><td>Retour à la ligne / séparateur</td><td>(pas de fermante)</td></tr>
<tr><td>&lt;div&gt;</td><td>Boîte générique pour grouper</td><td>&lt;div class="carte"&gt;...&lt;/div&gt;</td></tr>
<tr><td>&lt;span&gt;</td><td>Petit morceau de texte à cibler (dans une ligne)</td><td>&lt;span class="prix"&gt;12€&lt;/span&gt;</td></tr>
<tr><td>&lt;header&gt; &lt;main&gt; &lt;footer&gt; &lt;nav&gt;</td><td>Zones de la page</td><td>&lt;main&gt;contenu&lt;/main&gt;</td></tr>
<tr><td>&lt;table&gt; &lt;tr&gt; &lt;th&gt; &lt;td&gt;</td><td>Tableau, ligne, en-tête, cellule</td><td>&lt;tr&gt;&lt;td&gt;Paris&lt;/td&gt;&lt;/tr&gt;</td></tr>
<tr><td>&lt;input type="..."&gt;</td><td>Champ de saisie (text, number, date, checkbox, password...)</td><td>&lt;input type="text" placeholder="..."&gt;</td></tr>
<tr><td>&lt;textarea&gt;</td><td>Champ de texte multi-lignes</td><td>&lt;textarea&gt;&lt;/textarea&gt;</td></tr>
<tr><td>&lt;button&gt;</td><td>Bouton</td><td>&lt;button&gt;Envoyer&lt;/button&gt;</td></tr>
<tr><td>&lt;select&gt; &lt;option&gt;</td><td>Menu déroulant</td><td>&lt;select&gt;&lt;option&gt;A&lt;/option&gt;&lt;/select&gt;</td></tr>
<tr><td>&lt;label&gt;</td><td>Étiquette d'un champ</td><td>&lt;label&gt;Prénom :&lt;/label&gt;</td></tr>
<tr><td>&lt;script&gt;</td><td>Contient (ou charge) du JavaScript</td><td>&lt;script src="app.js"&gt;&lt;/script&gt;</td></tr>
<tr><td>&lt;style&gt; / &lt;link&gt;</td><td>Contient / charge du CSS</td><td>&lt;link rel="stylesheet" href="style.css"&gt;</td></tr>
<tr><td>&lt;!-- ... --&gt;</td><td>Commentaire (invisible)</td><td>&lt;!-- à faire --&gt;</td></tr>
</table>

<h2 style="margin-bottom:10px">Le squelette d'une page complète</h2>
<div class="bloc-code">&lt;!DOCTYPE html&gt;
&lt;html lang="fr"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;Titre de l'onglet&lt;/title&gt;
  &lt;link rel="stylesheet" href="style.css"&gt;
&lt;/head&gt;
&lt;body&gt;
  ... contenu visible ...
  &lt;script src="app.js"&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</div>

<h2 style="margin-bottom:10px">À retenir</h2>
<ul>
<li>Une balise s'ouvre <code>&lt;p&gt;</code> et se ferme <code>&lt;/p&gt;</code> (sauf img, br, hr, input).</li>
<li>Les attributs vont dans la balise ouvrante : <code>nom="valeur"</code>, avec guillemets.</li>
<li><code>class</code> peut se répéter (et un élément peut avoir plusieurs classes : <code>class="carte grande"</code>), <code>id</code> doit être unique dans la page.</li>
<li>Le <code>&lt;script&gt;</code> se place en FIN de body : il doit voir le HTML qu'il manipule.</li>
<li>Indente le code imbriqué : lisibilité = moins d'erreurs.</li>
</ul>
`
},

{
  id: 'css',
  titre: 'Mémo CSS',
  contenu: `
<h2 style="margin-bottom:10px">La syntaxe</h2>
<div class="bloc-code">selecteur {
  propriete: valeur;   /* point-virgule obligatoire ! */
}</div>

<h2 style="margin-bottom:10px">Les sélecteurs</h2>
<table class="memo-table">
<tr><th>Sélecteur</th><th>Cible</th></tr>
<tr><td>p</td><td>Toutes les balises &lt;p&gt;</td></tr>
<tr><td>.macarte</td><td>Tout élément avec class="macarte"</td></tr>
<tr><td>#menu</td><td>L'élément (unique) avec id="menu"</td></tr>
<tr><td>.carte p</td><td>Les &lt;p&gt; à l'intérieur d'un .carte (espace = descendant)</td></tr>
<tr><td>.btn:hover</td><td>Un .btn survolé par la souris</td></tr>
<tr><td>h1, h2</td><td>Les h1 ET les h2 (virgule = liste)</td></tr>
</table>

<h2 style="margin-bottom:10px">Les propriétés courantes</h2>
<table class="memo-table">
<tr><th>Propriété</th><th>Rôle</th><th>Exemples de valeurs</th></tr>
<tr><td>color</td><td>Couleur du texte</td><td>red, #4f6df5, rgb(0,0,0)</td></tr>
<tr><td>background-color</td><td>Couleur de fond</td><td>white, #eef1fe</td></tr>
<tr><td>font-size</td><td>Taille du texte</td><td>16px, 32px</td></tr>
<tr><td>font-family</td><td>Police</td><td>Arial, sans-serif / monospace</td></tr>
<tr><td>font-weight / font-style</td><td>Graisse / italique</td><td>bold / italic</td></tr>
<tr><td>text-align</td><td>Alignement du texte</td><td>left, center, right</td></tr>
<tr><td>text-decoration</td><td>Soulignement</td><td>underline, none</td></tr>
<tr><td>line-height</td><td>Hauteur de ligne (aération)</td><td>1.6</td></tr>
<tr><td>padding</td><td>Espace intérieur</td><td>16px, ou 12px 24px (vertical horizontal)</td></tr>
<tr><td>margin</td><td>Espace extérieur</td><td>24px, ou margin-top: 8px</td></tr>
<tr><td>border</td><td>Bordure</td><td>2px solid black / 1px dashed #ccc</td></tr>
<tr><td>border-radius</td><td>Coins arrondis</td><td>12px, 50% (cercle)</td></tr>
<tr><td>width / max-width</td><td>Largeur / largeur maximum</td><td>300px, 100%</td></tr>
<tr><td>height</td><td>Hauteur</td><td>200px</td></tr>
<tr><td>transition</td><td>Changement progressif</td><td>all 0.3s</td></tr>
<tr><td>transform</td><td>Déformation (zoom, rotation...)</td><td>scale(1.05), rotate(5deg)</td></tr>
<tr><td>display</td><td>Mode d'affichage</td><td>flex, block, inline-block, none (caché !)</td></tr>
<tr><td>cursor</td><td>Curseur de souris</td><td>pointer (la main)</td></tr>
</table>

<h2 style="margin-bottom:10px">Flexbox (sur le conteneur parent)</h2>
<div class="bloc-code">.conteneur {
  display: flex;             /* enfants côte à côte */
  justify-content: center;   /* horizontal : flex-start, center, flex-end, space-between */
  align-items: center;       /* vertical : center, flex-start, flex-end */
  gap: 16px;                 /* espace entre enfants */
  flex-direction: column;    /* pour empiler verticalement */
}

/* La formule magique du centrage parfait : */
display: flex; justify-content: center; align-items: center;</div>

<h2 style="margin-bottom:10px">Responsive</h2>
<div class="bloc-code">/* Règles appliquées seulement sur écran étroit (≤ 600px) : */
@media (max-width: 600px) {
  .colonnes { flex-direction: column; }
}

/* Le réflexe anti-débordement : */
img { max-width: 100%; }</div>
`
},

{
  id: 'js',
  titre: 'Mémo JavaScript',
  contenu: `
<h2 style="margin-bottom:10px">Les bases</h2>
<div class="bloc-code">console.log("Bonjour");        // afficher dans la console
let score = 0;                 // variable (peut changer)
const nom = "Léa";             // constante (ne change pas)
score = score + 10;            // ou : score += 10;   ou : score++
// ceci est un commentaire</div>

<h2 style="margin-bottom:10px">Textes</h2>
<div class="bloc-code">let p = "Léa";
console.log("Bonjour " + p);       // concaténation
console.log(\`Bonjour \${p} !\`);     // backticks (AltGr+7) : variable dans le texte
p.length          // longueur          p.toUpperCase()   // MAJUSCULES
p.toLowerCase()   // minuscules        Number("42")      // texte → nombre !</div>

<h2 style="margin-bottom:10px">Comparaisons et logique</h2>
<table class="memo-table">
<tr><th>Opérateur</th><th>Signification</th></tr>
<tr><td>===  /  !==</td><td>égal / différent (toujours 3 signes !)</td></tr>
<tr><td>&gt;  &gt;=  &lt;  &lt;=</td><td>plus grand (ou égal), plus petit (ou égal)</td></tr>
<tr><td>&amp;&amp;</td><td>ET (les deux conditions vraies)</td></tr>
<tr><td>||</td><td>OU (au moins une vraie)</td></tr>
<tr><td>!</td><td>NON (inverse : !ilPleut = « il ne pleut pas »)</td></tr>
<tr><td>%</td><td>modulo : le reste de la division (10 % 3 → 1 ; n % 2 === 0 → pair)</td></tr>
</table>

<h2 style="margin-bottom:10px">Conditions</h2>
<div class="bloc-code">if (age >= 18) {
  console.log("majeur");
} else if (age >= 16) {
  console.log("presque");
} else {
  console.log("mineur");
}</div>

<h2 style="margin-bottom:10px">Boucles</h2>
<div class="bloc-code">for (let i = 0; i < 5; i++) { ... }      // 5 tours : i = 0,1,2,3,4
for (const fruit of fruits) { ... }      // moderne : chaque élément directement
while (energie > 0) { energie -= 1; }    // tant que la condition est vraie</div>

<h2 style="margin-bottom:10px">Tableaux</h2>
<div class="bloc-code">let fruits = ["pomme", "banane"];
fruits[0]                    // "pomme" (on compte depuis 0 !)
fruits[fruits.length - 1]    // le dernier élément
fruits.length                // 2
fruits.push("kiwi")          // ajoute à la fin
fruits.splice(1, 1)          // retire 1 élément à l'index 1
fruits.includes("pomme")     // true / false
fruits.indexOf("banane")     // 1 (ou -1 si absent)
fruits.join(", ")            // "pomme, banane"
fruits.forEach((f) => console.log(f))          // faire pour chacun
let doubles = nombres.map((n) => n * 2)        // transformer → nouveau tableau
let grands = nombres.filter((n) => n > 10)     // garder ceux qui... → nouveau tableau</div>

<h2 style="margin-bottom:10px">Fonctions</h2>
<div class="bloc-code">function doubler(nombre) {     // définition + paramètre
  return nombre * 2;           // return : renvoie le résultat
}
let x = doubler(21);           // appel → x vaut 42

const tripler = (n) => n * 3;  // fonction fléchée (return implicite sur 1 ligne)</div>

<h2 style="margin-bottom:10px">Objets</h2>
<div class="bloc-code">let chat = { nom: "Félix", age: 3 };
chat.nom            // "Félix"
chat.age = 4;       // modifier
chat.jouet = "..."; // ajouter une clé
// Tableau d'objets — LA structure des données réelles :
let films = [{ titre: "Alien", annee: 1979 }];
films[0].titre      // crochets pour le tableau, point pour l'objet</div>

<h2 style="margin-bottom:10px">Nombres et hasard</h2>
<div class="bloc-code">Math.round(4.7)    // 5      Math.floor(4.7)   // 4 (vers le bas)
Math.ceil(4.2)     // 5      (3.14159).toFixed(2)  // "3.14"
Math.floor(Math.random() * 6) + 1    // entier aléatoire de 1 à 6</div>

<h2 style="margin-bottom:10px">Manipuler la page (DOM)</h2>
<div class="bloc-code">let el = document.querySelector("#monId");   // ou ".classe", "p"...
el.textContent = "Nouveau texte";            // lire/écrire le texte
el.value                                     // contenu d'un input (TEXTE → Number() !)
el.classList.add("actif") / .remove() / .toggle()
el.style.color = "red";

el.addEventListener("click", function () { ... });   // aussi : "input"

let li = document.createElement("li");       // créer
document.querySelector("#liste").appendChild(li);    // attacher
el.remove();                                 // supprimer
conteneur.innerHTML = "";                    // vider</div>

<h2 style="margin-bottom:10px">Sauvegarder (localStorage)</h2>
<div class="bloc-code">localStorage.setItem("cle", "valeur");   // écrire (tout devient texte !)
localStorage.getItem("cle");             // relire (null si absent)
localStorage.removeItem("cle");          // effacer
// Tableaux et objets : passer par JSON
localStorage.setItem("liste", JSON.stringify(taches));
let relu = JSON.parse(localStorage.getItem("liste")) || [];</div>

<h2 style="margin-bottom:10px">Encaisser les erreurs</h2>
<div class="bloc-code">try {
  // code qui peut échouer
} catch (erreur) {
  console.log(erreur.message);   // exécuté seulement si échec
}
typeof valeur    // "number", "string", "boolean", "object", "function", "undefined"</div>
`
},

{
  id: 'python',
  titre: 'Mémo Python',
  contenu: `
<h2 style="margin-bottom:10px">Les bases</h2>
<table class="memo-table">
<tr><th>Écriture</th><th>Rôle</th><th>Exemple</th></tr>
<tr><td>print(...)</td><td>Afficher (le console.log de Python)</td><td>print("Salut", nom)</td></tr>
<tr><td># ...</td><td>Commentaire ignoré par Python</td><td># à revoir demain</td></tr>
<tr><td>nom = valeur</td><td>Créer une variable (pas de let ni const)</td><td>age = 32</td></tr>
<tr><td>int / float / str</td><td>Entier / nombre à virgule / texte</td><td>7 · 1.68 · "Lyon"</td></tr>
<tr><td>True / False</td><td>Vrai / faux — avec une majuscule</td><td>majeur = True</td></tr>
<tr><td>None</td><td>« rien » (le null de Python)</td><td>resultat = None</td></tr>
<tr><td>int(x) / str(x) / float(x)</td><td>Convertir d'un type à l'autre</td><td>int("42") → 42</td></tr>
<tr><td>type(x)</td><td>Connaître le type d'une valeur</td><td>type(3) → int</td></tr>
</table>

<h2 style="margin-bottom:10px">Calculer</h2>
<table class="memo-table">
<tr><th>Opérateur</th><th>Rôle</th><th>Exemple</th></tr>
<tr><td>+ - * /</td><td>Les quatre opérations (/ donne toujours une virgule)</td><td>7 / 2 → 3.5</td></tr>
<tr><td>//</td><td>Division entière (sans la virgule)</td><td>17 // 5 → 3</td></tr>
<tr><td>%</td><td>Modulo : le reste de la division</td><td>17 % 5 → 2</td></tr>
<tr><td>**</td><td>Puissance</td><td>2 ** 10 → 1024</td></tr>
<tr><td>== != &lt; &gt; &lt;= &gt;=</td><td>Comparer (== compare, = affecte)</td><td>if note >= 10:</td></tr>
<tr><td>and / or / not</td><td>ET / OU / NON — en toutes lettres</td><td>if a > 0 and b > 0:</td></tr>
</table>

<h2 style="margin-bottom:10px">Conditions et boucles</h2>
<div class="bloc-code">if note >= 16:
    print("Très bien")
elif note >= 10:            # le "else if" de Python
    print("Reçu")
else:
    print("Recalé")

for i in range(1, 6):       # 1, 2, 3, 4, 5 — la fin est EXCLUE
    print(i)

for produit in courses:     # parcourt directement les éléments
    print(produit)

while stock > 0:
    stock = stock - 1</div>
<div class="attention"><div>Les deux erreurs de départ : oublier le <code>:</code> en fin de ligne, et oublier de décaler (indenter) la ligne du dessous de 4 espaces. En Python, l'indentation n'est pas de la décoration : c'est elle qui délimite les blocs.</div></div>

<h2 style="margin-bottom:10px">Listes et dictionnaires</h2>
<table class="memo-table">
<tr><th>Écriture</th><th>Rôle</th><th>Exemple</th></tr>
<tr><td>[ ... ]</td><td>Une liste (le tableau de JavaScript)</td><td>notes = [12, 15, 9]</td></tr>
<tr><td>liste[0]</td><td>Le premier élément (on compte depuis 0)</td><td>notes[0] → 12</td></tr>
<tr><td>liste[-1]</td><td>Le DERNIER élément (spécialité Python)</td><td>notes[-1] → 9</td></tr>
<tr><td>len(x)</td><td>La taille (au lieu de .length)</td><td>len(notes) → 3</td></tr>
<tr><td>.append(v)</td><td>Ajouter à la fin (au lieu de .push)</td><td>notes.append(18)</td></tr>
<tr><td>.remove(v) / del l[i]</td><td>Retirer une valeur / un indice</td><td>notes.remove(9)</td></tr>
<tr><td>{ "cle": valeur }</td><td>Un dictionnaire (l'objet de JavaScript)</td><td>{"ville": "Lyon"}</td></tr>
<tr><td>dico["cle"]</td><td>Lire une valeur (clé absente → KeyError)</td><td>contact["ville"]</td></tr>
<tr><td>sum(l) / max(l) / min(l)</td><td>Total / plus grand / plus petit</td><td>sum(notes) → 36</td></tr>
<tr><td>sorted(l)</td><td>Une copie triée de la liste</td><td>sorted([3,1,2]) → [1,2,3]</td></tr>
</table>

<h2 style="margin-bottom:10px">Les fonctions</h2>
<div class="bloc-code">def aire_rectangle(largeur, hauteur):
    return largeur * hauteur

surface = aire_rectangle(4, 5)   # 20

def saluer(nom, politesse="Bonjour"):   # valeur par défaut
    print(politesse, nom)</div>

<h2 style="margin-bottom:10px">Python vs JavaScript — la table de conversion</h2>
<table class="memo-table">
<tr><th>JavaScript</th><th>Python</th><th>Remarque</th></tr>
<tr><td>console.log(x)</td><td>print(x)</td><td>Plus court</td></tr>
<tr><td>let x = 1;</td><td>x = 1</td><td>Ni mot-clé, ni point-virgule</td></tr>
<tr><td>{ ... }</td><td>: puis indentation</td><td>LA différence à retenir</td></tr>
<tr><td>function f() {}</td><td>def f():</td><td>def = « define »</td></tr>
<tr><td>else if</td><td>elif</td><td>Contraction</td></tr>
<tr><td>&amp;&amp; · || · !</td><td>and · or · not</td><td>En toutes lettres</td></tr>
<tr><td>true / false / null</td><td>True / False / None</td><td>Majuscule obligatoire</td></tr>
<tr><td>tab.length</td><td>len(tab)</td><td>Fonction, pas propriété</td></tr>
<tr><td>tab.push(v)</td><td>tab.append(v)</td><td>Même rôle</td></tr>
<tr><td>tab[tab.length - 1]</td><td>tab[-1]</td><td>Bien plus lisible</td></tr>
<tr><td>for (let i = 0; i &lt; 5; i++)</td><td>for i in range(5):</td><td>Bien plus lisible aussi</td></tr>
<tr><td>// commentaire</td><td># commentaire</td><td>Même rôle</td></tr>
</table>

<h2 style="margin-bottom:10px">Les erreurs Python les plus fréquentes</h2>
<table class="memo-table">
<tr><th>Message</th><th>Ce que ça veut dire</th><th>Le réflexe</th></tr>
<tr><td>IndentationError</td><td>Décalage manquant ou en trop</td><td>4 espaces après chaque ligne finissant par :</td></tr>
<tr><td>SyntaxError</td><td>Python ne comprend pas la ligne</td><td>Cherche le : ou la parenthèse manquante</td></tr>
<tr><td>NameError</td><td>Nom inconnu</td><td>Faute de frappe, ou variable créée après usage</td></tr>
<tr><td>TypeError</td><td>Types incompatibles</td><td>3 + "3" interdit : convertis avec str() ou int()</td></tr>
<tr><td>IndexError</td><td>Indice hors de la liste</td><td>Une liste de 3 va de 0 à 2</td></tr>
<tr><td>KeyError</td><td>Clé absente du dictionnaire</td><td>Vérifie l'orthographe de la clé</td></tr>
<tr><td>ZeroDivisionError</td><td>Division par zéro</td><td>Teste le diviseur avant de diviser</td></tr>
</table>

<div class="info"><div><strong>Et le vrai Python ?</strong> Celui de ce logiciel tourne dans ton navigateur et couvre les bases. Pour aller plus loin (fichiers, bibliothèques, IA), installe Python depuis <strong>python.org</strong> et écris tes scripts dans VS Code : tout ce que tu as appris ici fonctionnera à l'identique.</div></div>
`
},

{
  id: 'sql',
  titre: 'Mémo SQL',
  contenu: `
<h2 style="margin-bottom:10px">Le squelette d'une requête</h2>
<div class="bloc-code">SELECT   colonnes ou calculs
FROM     table
JOIN     autre_table ON correspondance
WHERE    conditions
GROUP BY colonne de regroupement
ORDER BY tri (ASC ou DESC)
LIMIT    nombre</div>
<div class="attention"><div>Cet ordre est <strong>immuable</strong>. Toute requête, même très longue, suit ce squelette — et le moteur refuse toute autre disposition.</div></div>

<h2 style="margin-bottom:10px">Lire des données</h2>
<table class="memo-table">
<tr><th>Écriture</th><th>Rôle</th></tr>
<tr><td>SELECT * FROM t</td><td>Toutes les colonnes de la table t</td></tr>
<tr><td>SELECT a, b FROM t</td><td>Seulement les colonnes a et b</td></tr>
<tr><td>SELECT a AS joli_nom</td><td>Renommer une colonne à l'affichage</td></tr>
<tr><td>SELECT DISTINCT a</td><td>Sans les doublons</td></tr>
<tr><td>SELECT prix * 1.2 AS ttc</td><td>Une colonne calculée à la volée</td></tr>
<tr><td>LIMIT 5</td><td>Ne garder que les 5 premières lignes</td></tr>
</table>

<h2 style="margin-bottom:10px">Filtrer : WHERE</h2>
<table class="memo-table">
<tr><th>Écriture</th><th>Rôle</th></tr>
<tr><td>=</td><td>Égal — UN SEUL signe égal, pas ==</td></tr>
<tr><td>&lt;&gt; ou !=</td><td>Différent de</td></tr>
<tr><td>&lt; &gt; &lt;= &gt;=</td><td>Comparaisons de taille</td></tr>
<tr><td>AND / OR / NOT</td><td>Combiner des conditions</td></tr>
<tr><td>IN ('a', 'b')</td><td>Fait partie de cette liste</td></tr>
<tr><td>BETWEEN 10 AND 20</td><td>Dans l'intervalle, bornes INCLUSES</td></tr>
<tr><td>LIKE 'Le %'</td><td>Commence par « Le » (% = n'importe quoi)</td></tr>
<tr><td>LIKE '%mer'</td><td>Se termine par « mer »</td></tr>
<tr><td>LIKE '%uit%'</td><td>Contient « uit »</td></tr>
<tr><td>IS NULL / IS NOT NULL</td><td>Case vide ou non — jamais = NULL !</td></tr>
</table>
<div class="astuce"><div>Le texte va entre <strong>apostrophes simples</strong> : <code>WHERE genre = 'Drame'</code>. Les nombres n'en prennent pas : <code>WHERE annee = 2023</code>.</div></div>

<h2 style="margin-bottom:10px">Résumer : les agrégats</h2>
<table class="memo-table">
<tr><th>Fonction</th><th>Rôle</th></tr>
<tr><td>COUNT(*)</td><td>Nombre de lignes</td></tr>
<tr><td>COUNT(colonne)</td><td>Nombre de lignes où la colonne n'est PAS vide</td></tr>
<tr><td>SUM(colonne)</td><td>Somme</td></tr>
<tr><td>AVG(colonne)</td><td>Moyenne (ignore les cases vides)</td></tr>
<tr><td>MIN / MAX</td><td>Plus petite / plus grande valeur</td></tr>
</table>

<h2 style="margin-bottom:10px">Regrouper : GROUP BY</h2>
<div class="bloc-code">SELECT genre, COUNT(*) AS nombre, AVG(note) AS moyenne
FROM films
GROUP BY genre
ORDER BY nombre DESC;</div>
<p>Une ligne par groupe. Règle d'or : les colonnes affichées doivent être <strong>soit la colonne de regroupement, soit un agrégat</strong>.</p>

<h2 style="margin-bottom:10px">Relier deux tables : la jointure (JOIN)</h2>
<div class="bloc-code">SELECT seances.jour, films.titre
FROM seances
JOIN films ON seances.film_id = films.id;</div>
<p>Une <strong>jointure</strong> recolle deux tables reliées par un identifiant. Le <code>ON</code> dit comment elles se correspondent : ici, le <code>film_id</code> de la séance vaut l'<code>id</code> du film. Ce champ qui pointe vers une autre table s'appelle une <strong>clé étrangère</strong>. On écrit <code>table.colonne</code> pour lever toute ambiguïté quand deux tables ont une colonne du même nom.</p>

<h2 style="margin-bottom:10px">Écrire des données</h2>
<div class="bloc-code">INSERT INTO films (titre, annee) VALUES ('Aurore', 2024);

UPDATE films SET note = 8.5 WHERE id = 3;

DELETE FROM films WHERE id = 3;</div>
<div class="attention"><div><strong>La règle qui sauve des carrières :</strong> un <code>UPDATE</code> ou un <code>DELETE</code> sans <code>WHERE</code> s'applique à TOUTE la table, sans confirmation ni retour en arrière. Le réflexe des pros : écrire d'abord la requête en <code>SELECT *</code> pour voir les lignes concernées, puis remplacer par <code>DELETE</code> ou <code>UPDATE</code>.</div></div>

<h2 style="margin-bottom:10px">Les erreurs SQL les plus fréquentes</h2>
<table class="memo-table">
<tr><th>Symptôme</th><th>Cause probable</th></tr>
<tr><td>Erreur incompréhensible</td><td>Une apostrophe ouverte et jamais refermée</td></tr>
<tr><td>« == » refusé</td><td>En SQL la comparaison s'écrit avec un seul =</td></tr>
<tr><td>Aucune ligne, alors qu'il devrait y en avoir</td><td>WHERE trop strict, ou <code>= NULL</code> au lieu de <code>IS NULL</code></td></tr>
<tr><td>Beaucoup trop de lignes après un JOIN</td><td>Condition <code>ON</code> oubliée ou incorrecte</td></tr>
<tr><td>Toute la table modifiée</td><td>WHERE oublié dans un UPDATE ou un DELETE</td></tr>
<tr><td>Erreur sur GROUP BY</td><td>Une colonne affichée n'est ni groupée ni agrégée</td></tr>
</table>

<div class="info"><div><strong>Et les vraies bases ?</strong> Le moteur de ce logiciel couvre l'essentiel du langage. Dans la vraie vie tu rencontreras PostgreSQL, MySQL ou SQLite : les mots-clés vus ici y fonctionnent à l'identique. SQLite est le plus simple pour commencer — un seul fichier, aucune installation de serveur.</div></div>
`
},

{
  id: 'c',
  titre: 'Mémo C',
  contenu: `
<h2 style="margin-bottom:10px">Le squelette</h2>
<div class="bloc-code">#include &lt;stdio.h&gt;

int main() {
    printf("Bonjour\\n");
    return 0;
}</div>
<p>Compiler pour de vrai : <code>gcc programme.c -o programme</code> puis <code>./programme</code>.</p>

<h2 style="margin-bottom:10px">Les types</h2>
<table class="memo-table">
<tr><th>Type</th><th>Contient</th><th>Exemple</th></tr>
<tr><td>int</td><td>entier</td><td>int n = 42;</td></tr>
<tr><td>double</td><td>nombre à virgule</td><td>double p = 3.14;</td></tr>
<tr><td>char</td><td>UN caractère</td><td>char c = 'A';</td></tr>
<tr><td>char[]</td><td>texte (tableau de char)</td><td>char nom[] = "Alex";</td></tr>
</table>

<h2 style="margin-bottom:10px">printf : les formats</h2>
<table class="memo-table">
<tr><th>Symbole</th><th>Affiche</th></tr>
<tr><td>%d</td><td>un entier</td></tr>
<tr><td>%f</td><td>un nombre à virgule (6 décimales par défaut)</td></tr>
<tr><td>%.2f</td><td>un nombre à virgule, 2 décimales</td></tr>
<tr><td>%s</td><td>une chaîne</td></tr>
<tr><td>%c</td><td>un caractère</td></tr>
<tr><td>\\n</td><td>passage à la ligne (printf ne le fait PAS tout seul)</td></tr>
</table>

<h2 style="margin-bottom:10px">Structures de contrôle</h2>
<div class="bloc-code">if (x &gt; 10) { ... } else if (x &gt; 5) { ... } else { ... }

for (int i = 0; i &lt; 10; i++) { ... }
while (condition) { ... }
do { ... } while (condition);

switch (x) {
    case 1: ... break;
    default: ...
}</div>

<h2 style="margin-bottom:10px">Tableaux</h2>
<div class="bloc-code">int t[5];                    // 5 cases vides
int t[] = {12, 15, 9};       // taille déduite : 3
t[0]                         // première case (numérotée 0 !)
int g[3][3];                 // grille 3×3, g[ligne][colonne]</div>
<div class="attention"><div>Le C ne vérifie <strong>jamais</strong> les limites d'un tableau. <code>t[99]</code> sur un tableau de 3 cases lit de la mémoire qui ne t'appartient pas : c'est la première cause de failles de sécurité au monde. Et il n'existe pas de <code>len()</code> : tu dois retenir la taille toi-même.</div></div>

<h2 style="margin-bottom:10px">Fonctions</h2>
<div class="bloc-code">int carre(int x) { return x * x; }     // renvoie un int
void afficher() { printf("..."); }     // ne renvoie rien</div>
<p>Une fonction doit être définie <strong>avant</strong> son utilisation (ou annoncée par un prototype en haut du fichier).</p>

<h2 style="margin-bottom:10px">Les pointeurs</h2>
<table class="memo-table">
<tr><th>Écriture</th><th>Sens</th></tr>
<tr><td>int *p;</td><td>p est un pointeur vers un int</td></tr>
<tr><td>&amp;x</td><td>l'adresse de x</td></tr>
<tr><td>*p</td><td>la valeur rangée à l'adresse p</td></tr>
<tr><td>*p = 31;</td><td>modifie la variable d'origine</td></tr>
</table>
<div class="bloc-code">// Modifier une variable depuis une fonction
void doubler(int *n) { *n = *n * 2; }
int main() { int x = 5; doubler(&amp;x); }   // x vaut 10</div>
<p>Un tableau passé à une fonction est <strong>toujours</strong> transmis par adresse : pas besoin de <code>&amp;</code>, et la fonction peut le modifier.</p>

<h2 style="margin-bottom:10px">Structures</h2>
<div class="bloc-code">struct Point {
    int x;
    int y;
};                          // ← le point-virgule est obligatoire

struct Point p;
p.x = 3;</div>

<h2 style="margin-bottom:10px">Les erreurs C les plus fréquentes</h2>
<table class="memo-table">
<tr><th>Symptôme</th><th>Cause probable</th></tr>
<tr><td>Erreur signalée à la ligne suivante</td><td>Point-virgule oublié à la ligne d'avant</td></tr>
<tr><td>Une division donne 0 ou un résultat tronqué</td><td>Division entre deux int : convertis avec <code>(double)</code></td></tr>
<tr><td>Une condition est toujours vraie</td><td><code>=</code> au lieu de <code>==</code> dans le if</td></tr>
<tr><td>Valeur aberrante ou plantage</td><td>Dépassement de tableau (indice hors limites)</td></tr>
<tr><td>Une fonction ne modifie rien</td><td>Passage par valeur : il faut un pointeur</td></tr>
<tr><td>Affichage bizarre avec %s</td><td>Chaîne sans <code>'\\0'</code> final</td></tr>
</table>
`
},

{
  id: 'java',
  titre: 'Mémo Java',
  contenu: `
<h2 style="margin-bottom:10px">Le squelette</h2>
<div class="bloc-code">public class Main {
    public static void main(String[] args) {
        System.out.println("Bonjour");
    }
}</div>
<p>Le nom de la classe doit être celui du fichier : <code>Main.java</code>. Compiler et exécuter : <code>javac Main.java</code> puis <code>java Main</code>.</p>

<h2 style="margin-bottom:10px">Les types</h2>
<table class="memo-table">
<tr><th>Type</th><th>Exemple</th></tr>
<tr><td>int</td><td>int n = 42;</td></tr>
<tr><td>double</td><td>double p = 3.14;</td></tr>
<tr><td>boolean</td><td>boolean ok = true;</td></tr>
<tr><td>char</td><td>char c = 'A';</td></tr>
<tr><td>String</td><td>String s = "Alex";  (S majuscule)</td></tr>
</table>

<h2 style="margin-bottom:10px">Afficher</h2>
<div class="bloc-code">System.out.println("avec retour à la ligne");
System.out.print("sans retour");
System.out.println("Nom : " + nom + ", âge : " + age);</div>
<div class="attention"><div><code>"Total : " + 2 + 3</code> affiche <code>Total : 23</code> ! Java lit de gauche à droite et colle. Pour additionner d'abord : <code>"Total : " + (2 + 3)</code>.</div></div>

<h2 style="margin-bottom:10px">Méthodes de String</h2>
<table class="memo-table">
<tr><th>Méthode</th><th>Rôle</th></tr>
<tr><td>s.length()</td><td>longueur (AVEC parenthèses)</td></tr>
<tr><td>s.charAt(0)</td><td>le caractère à l'indice donné</td></tr>
<tr><td>s.substring(0, 7)</td><td>de 0 inclus à 7 exclu</td></tr>
<tr><td>s.toUpperCase() / toLowerCase()</td><td>changement de casse</td></tr>
<tr><td>s.indexOf("x")</td><td>position, ou -1 si absent</td></tr>
<tr><td>s.contains("x")</td><td>true / false</td></tr>
<tr><td>s.equals(autre)</td><td><strong>comparer le contenu</strong></td></tr>
<tr><td>s.trim()</td><td>enlève les espaces autour</td></tr>
</table>
<div class="attention"><div><strong>Règle absolue :</strong> <code>==</code> pour les nombres, <code>.equals()</code> pour les String. Avec <code>==</code>, Java compare les emplacements en mémoire, pas le texte — d'où des bugs qui n'apparaissent qu'en production.</div></div>

<h2 style="margin-bottom:10px">Tableaux</h2>
<div class="bloc-code">int[] t = {12, 15, 9};
int[] vide = new int[5];       // 5 cases à zéro
t.length                       // taille (SANS parenthèses)

for (int i = 0; i &lt; t.length; i++) { ... }   // avec l'indice
for (int v : t) { ... }                      // pour chaque valeur</div>

<h2 style="margin-bottom:10px">Méthodes</h2>
<div class="bloc-code">static int carre(int x) { return x * x; }
static void afficher(String s) { System.out.println(s); }</div>
<p>Contrairement au C, l'ordre de définition n'a pas d'importance.</p>

<h2 style="margin-bottom:10px">Classes et objets</h2>
<div class="bloc-code">class Chien {
    private String nom;              // encapsulation

    Chien(String nom) {              // constructeur
        this.nom = nom;              // this = l'objet en cours
    }

    public String getNom() { return nom; }      // lecture contrôlée
    public String aboyer() { return nom + " dit Ouaf"; }
}

Chien rex = new Chien("Rex");
System.out.println(rex.aboyer());</div>

<h2 style="margin-bottom:10px">Héritage</h2>
<div class="bloc-code">class Animal {
    String nom;
    Animal(String nom) { this.nom = nom; }
    String crier() { return "..."; }
}

class Chien extends Animal {
    Chien(String nom) { super(nom); }      // constructeur du parent
    String crier() { return nom + " fait Ouaf"; }   // redéfinition
}

public String toString() { ... }   // appelée automatiquement à l'affichage</div>
<p>L'héritage doit exprimer une relation « <strong>est un</strong> » : un chien est un animal.</p>

<h2 style="margin-bottom:10px">Math</h2>
<div class="bloc-code">Math.sqrt(16)    Math.pow(2, 10)    Math.abs(-5)
Math.max(a, b)   Math.min(a, b)     Math.round(3.7)
Math.random()    // entre 0 et 1</div>

<h2 style="margin-bottom:10px">Les erreurs Java les plus fréquentes</h2>
<table class="memo-table">
<tr><th>Symptôme</th><th>Cause probable</th></tr>
<tr><td>Deux textes identiques jugés différents</td><td><code>==</code> au lieu de <code>.equals()</code></td></tr>
<tr><td>« incompatible types: int cannot be converted to boolean »</td><td><code>=</code> au lieu de <code>==</code> dans un if</td></tr>
<tr><td>Une division donne un résultat tronqué</td><td>Division entre deux int</td></tr>
<tr><td>Une String ne change pas</td><td>Les méthodes renvoient une nouvelle chaîne : <code>s = s.toUpperCase();</code></td></tr>
<tr><td>« cannot find symbol »</td><td>Variable non déclarée, ou faute de frappe dans le nom</td></tr>
<tr><td>ArrayIndexOutOfBoundsException</td><td>Indice hors du tableau (0 à length-1)</td></tr>
<tr><td>NullPointerException</td><td>Utilisation d'un objet jamais créé avec <code>new</code></td></tr>
</table>
`
},

{
  id: 'erreurs',
  titre: 'SOS erreurs',
  contenu: `
<h2 style="margin-bottom:10px">La méthode face à une erreur</h2>
<ol style="margin:0 0 20px 24px">
<li><strong>Lis le message en entier</strong> — il donne souvent la ligne et la cause.</li>
<li>Va voir la ligne indiquée (et celle juste au-dessus !).</li>
<li>Cherche : faute de frappe, guillemet/parenthèse/accolade manquant, majuscule oubliée.</li>
<li><code>console.log</code> tes variables aux étapes clés : qu'y a-t-il VRAIMENT dedans ?</li>
<li>Réduis le problème : commente des blocs jusqu'à isoler la ligne fautive.</li>
<li>Toujours bloqué ? Copie le message dans un moteur de recherche.</li>
</ol>

<h2 style="margin-bottom:10px">Les erreurs les plus fréquentes</h2>
<table class="memo-table">
<tr><th>Symptôme</th><th>Cause probable</th></tr>
<tr><td>... is not defined</td><td>Nom de variable mal orthographié, ou variable utilisée avant d'être créée</td></tr>
<tr><td>... is not a function</td><td>Faute de frappe dans le nom (console.lgo), ou parenthèses au mauvais endroit</td></tr>
<tr><td>Cannot read properties of null</td><td>querySelector n'a rien trouvé : sélecteur incorrect (# oublié ?) ou script placé AVANT le HTML</td></tr>
<tr><td>Unexpected token / Unexpected end</td><td>Parenthèse, accolade ou guillemet ouvert mais jamais fermé</td></tr>
<tr><td>already been declared</td><td>Deuxième <code>let</code> sur une variable qui existe déjà (pour modifier : sans let)</td></tr>
<tr><td>Le CSS ne s'applique pas</td><td>Point-virgule oublié, point manquant devant la classe (.macarte), faute dans le nom</td></tr>
<tr><td>La page HTML s'affiche bizarrement</td><td>Balise fermante oubliée, ou / manquant dedans</td></tr>
<tr><td>Mon if fait n'importe quoi</td><td>= (affectation) utilisé au lieu de === (comparaison)</td></tr>
<tr><td>"53" au lieu de 8, "1020" au lieu de 30</td><td>Addition de TEXTES : .value et localStorage donnent du texte → Number() avant de calculer</td></tr>
<tr><td>La boucle ne s'arrête jamais</td><td>La condition du while ne devient jamais fausse (compteur non modifié)</td></tr>
<tr><td>undefined s'affiche</td><td>Lecture d'une clé/variable qui n'existe pas, ou fonction sans return</td></tr>
<tr><td>Le clic ne fait rien</td><td>Sélecteur incorrect, faute dans "click", ou code hors de l'écouteur</td></tr>
<tr><td>Off by one : un tour de trop/de moins</td><td>Confusion &lt; / &lt;=, ou oubli que les index commencent à 0</td></tr>
</table>

<h2 style="margin-bottom:10px">Le réflexe du pro</h2>
<p>Appuie sur <strong>F12</strong> dans ton navigateur → onglet « Console ». Toutes les erreurs de ta page s'y affichent en rouge, avec le fichier et la ligne. C'est le premier endroit où regarder quand « ça ne marche pas ». Tu peux même y taper du JavaScript en direct pour tester une idée !</p>
`
},

{
  id: 'glossaire',
  titre: 'Glossaire',
  contenu: `
<p style="margin-bottom:14px">Tous les mots du métier, expliqués simplement. À consulter dès qu'un terme t'échappe — ici ou ailleurs.</p>
<table class="memo-table">
<tr><th>Terme</th><th>Définition</th></tr>
<tr><td>Algorithme</td><td>Une suite d'étapes précises pour résoudre un problème — la recette, indépendamment du langage.</td></tr>
<tr><td>API</td><td>Un « guichet » qu'un logiciel expose pour que d'autres programmes lui parlent (ex : l'API météo donne la météo à ton app).</td></tr>
<tr><td>Application web</td><td>Un site qui se comporte comme un logiciel (Gmail, Google Docs...).</td></tr>
<tr><td>Backend</td><td>La partie invisible côté serveur : base de données, comptes, logique métier. S'oppose au frontend.</td></tr>
<tr><td>Base de données</td><td>Un logiciel spécialisé dans le stockage et la recherche de données (souvent piloté en SQL).</td></tr>
<tr><td>Booléen</td><td>Une valeur qui ne peut être que <code>true</code> ou <code>false</code>. Le carburant des conditions.</td></tr>
<tr><td>Bug</td><td>Un comportement non voulu du programme. Vient d'un vrai insecte coincé dans un ordinateur en 1947 !</td></tr>
<tr><td>Compilateur / interpréteur</td><td>Le programme qui traduit ton code en instructions machine (d'un coup / au fur et à mesure).</td></tr>
<tr><td>Console</td><td>La zone où s'affichent les messages et erreurs d'un programme (F12 dans le navigateur).</td></tr>
<tr><td>Débogage (debugging)</td><td>L'art de trouver et corriger les bugs. 50% du métier, sans exagérer.</td></tr>
<tr><td>DOM</td><td><em>Document Object Model</em> : la représentation de la page HTML que le JavaScript peut lire et modifier.</td></tr>
<tr><td>Framework</td><td>Une grosse boîte à outils qui structure un projet (React, Vue, Angular pour le web). À découvrir APRÈS les bases.</td></tr>
<tr><td>Frontend</td><td>La partie visible dans le navigateur : HTML, CSS, JavaScript. Ce que tu viens d'apprendre !</td></tr>
<tr><td>Full-stack</td><td>Un développeur qui fait à la fois frontend et backend.</td></tr>
<tr><td>Git / GitHub</td><td>Git : l'outil qui historise chaque version de ton code. GitHub : le site où on héberge et partage ces historiques.</td></tr>
<tr><td>IDE / éditeur</td><td>Le logiciel dans lequel on écrit du code (VS Code étant le plus répandu).</td></tr>
<tr><td>JSON</td><td>Le format texte universel pour échanger des données, quasi identique aux objets JavaScript.</td></tr>
<tr><td>Librairie (bibliothèque)</td><td>Du code tout prêt écrit par d'autres, qu'on ajoute à son projet pour gagner du temps.</td></tr>
<tr><td>Open source</td><td>Logiciel dont le code est public : chacun peut le lire, l'utiliser, l'améliorer.</td></tr>
<tr><td>Requête</td><td>Une demande envoyée à un serveur (« donne-moi la page », « enregistre cet avis »).</td></tr>
<tr><td>Responsive</td><td>Design qui s'adapte à toutes les tailles d'écran (media queries !).</td></tr>
<tr><td>Serveur</td><td>Un ordinateur allumé 24h/24 qui répond aux requêtes des visiteurs d'un site.</td></tr>
<tr><td>Syntaxe</td><td>Les règles d'écriture d'un langage — sa grammaire et sa ponctuation.</td></tr>
<tr><td>Terminal (ligne de commande)</td><td>L'interface texte pour piloter l'ordinateur en tapant des commandes.</td></tr>
<tr><td>Variable</td><td>Une boîte nommée qui stocke une valeur. La brique de base de tout programme.</td></tr>
<tr><td>Versionner</td><td>Enregistrer l'historique des modifications du code pour pouvoir revenir en arrière (→ Git).</td></tr>
</table>
`
},

{
  id: 'web',
  titre: 'Comment marche le web',
  contenu: `
<h2 style="margin-bottom:10px">Le voyage d'une page web</h2>
<p>Quand tu tapes <code>www.exemple.com</code> et appuies sur Entrée, voici ce qui se passe en une fraction de seconde :</p>
<ol style="margin:8px 0 18px 24px">
<li><strong>L'adresse est traduite</strong> : un annuaire mondial (le DNS) convertit le nom du site en adresse IP — le « numéro de téléphone » du serveur (ex : 93.184.216.34).</li>
<li><strong>Ton navigateur envoie une requête</strong> au serveur : « donne-moi la page d'accueil » (c'est le protocole HTTP — le S de HTTPS signifie que l'échange est chiffré).</li>
<li><strong>Le serveur répond</strong> en envoyant des fichiers : du HTML, du CSS, du JavaScript, des images.</li>
<li><strong>Ton navigateur assemble tout</strong> et dessine la page — exactement comme il le fait avec les fichiers de ce logiciel, sauf qu'ici ils sont déjà sur ton disque.</li>
</ol>

<h2 style="margin-bottom:10px">Client et serveur : qui fait quoi ?</h2>
<table class="memo-table">
<tr><th></th><th>Le client (ton navigateur)</th><th>Le serveur</th></tr>
<tr><td>C'est où ?</td><td>Sur ton appareil</td><td>Dans un datacenter, allumé 24h/24</td></tr>
<tr><td>Il fait quoi ?</td><td>Affiche les pages, exécute le JavaScript</td><td>Stocke les données, gère les comptes, répond aux requêtes</td></tr>
<tr><td>Langages</td><td>HTML, CSS, JavaScript</td><td>Node.js (du JavaScript !), PHP, Python, Java... + SQL</td></tr>
</table>

<h2 style="margin-bottom:10px">Où vivent les sites ? L'hébergement</h2>
<p>Publier un site = copier ses fichiers sur un serveur accessible au monde entier. Pour un site simple (comme ceux que tu sais faire !), des services gratuits existent : GitHub Pages, Netlify... On y dépose ses fichiers HTML/CSS/JS, on reçoit une adresse, et voilà — ton site est en ligne. Un nom de domaine personnalisé (monsite.fr) se loue ensuite pour quelques euros par an.</p>

<h2 style="margin-bottom:10px">Et une application comme celles de ton PC ?</h2>
<p>Le même principe s'étend : une application web « installée » localement (comme ce logiciel, ou une app avec sa base de données) fait tourner un <strong>mini-serveur sur ta propre machine</strong> — d'où les adresses en <code>localhost</code> que tu croiseras : « localhost » signifie « cet ordinateur-ci ». Le navigateur reste le client ; le serveur est juste à 2 centimètres.</p>

<div class="astuce">✅ À retenir : le web n'est QUE ça — des clients qui demandent, des serveurs qui répondent, et des fichiers HTML/CSS/JS qui voyagent. Tout le reste est de la variation sur ce thème.</div>
`
},

{
  id: 'outils',
  titre: 'Les outils du développeur',
  contenu: `
<h2 style="margin-bottom:10px">1. L'éditeur de code : Visual Studio Code</h2>
<p>Gratuit, standard mondial. Télécharge-le sur <code>code.visualstudio.com</code>. Ce qu'il t'apporte : coloration du code, détection d'erreurs en direct, autocomplétion, et des milliers d'extensions. Pour débuter : crée un dossier, ouvre-le dans VS Code (Fichier → Ouvrir le dossier), crée <code>index.html</code>, <code>style.css</code>, <code>app.js</code> — et ouvre le HTML dans ton navigateur.</p>
<table class="memo-table">
<tr><th>Raccourci VS Code</th><th>Action</th></tr>
<tr><td>Ctrl + S</td><td>Sauvegarder (réflexe permanent !)</td></tr>
<tr><td>Ctrl + Z</td><td>Annuler</td></tr>
<tr><td>Ctrl + F</td><td>Chercher dans le fichier</td></tr>
<tr><td>Ctrl + /</td><td>Commenter/décommenter la ligne</td></tr>
<tr><td>Alt + Shift + F</td><td>Ré-indenter tout le fichier proprement</td></tr>
</table>

<h2 style="margin-bottom:10px">2. Les outils du navigateur : F12</h2>
<p>La touche <kbd>F12</kbd> ouvre les « DevTools » sur n'importe quel site :</p>
<ul style="margin:0 0 18px 24px">
<li><strong>Console</strong> — les erreurs JavaScript en rouge, et tu peux y taper du code en direct ;</li>
<li><strong>Éléments / Inspecteur</strong> — le HTML et le CSS de la page, modifiables en direct (pour expérimenter !) ;</li>
<li><strong>Réseau</strong> — toutes les requêtes que la page envoie ;</li>
<li>l'icône téléphone/tablette — simuler un petit écran pour tester ton responsive.</li>
</ul>

<h2 style="margin-bottom:10px">3. Le terminal : parler texte à l'ordinateur</h2>
<p>Sur Windows : cherche « PowerShell » dans le menu Démarrer. Les commandes de survie :</p>
<div class="bloc-code">cd Documents        # se déplacer dans un dossier (change directory)
cd ..               # remonter d'un dossier
ls                  # lister le contenu du dossier (dir marche aussi)
mkdir mon-projet    # créer un dossier</div>
<p>Tu n'en as pas besoin pour les bases — mais tous les outils avancés (Git, Node.js...) se pilotent par là. L'apprivoiser tôt, c'est un atout.</p>

<h2 style="margin-bottom:10px">4. Git et GitHub : la machine à remonter le temps</h2>
<p><strong>Git</strong> enregistre des « photos » (commits) de ton code à chaque étape : tu peux revenir en arrière, comparer, expérimenter sans peur. <strong>GitHub</strong> héberge ces historiques en ligne : sauvegarde, partage, travail à plusieurs. C'est aussi LE portfolio des développeurs — les recruteurs le consultent.</p>
<div class="bloc-code">git init                      # démarrer le suivi dans un dossier
git add .                     # préparer tous les fichiers modifiés
git commit -m "Mon message"   # prendre la photo, avec une description
git log                       # voir l'historique</div>
<p>À apprendre quand tes projets grossiront — retiens juste que ça existe et que ça sauve des vies (de projets).</p>

<h2 style="margin-bottom:10px">5. La documentation : MDN</h2>
<p><code>developer.mozilla.org</code> — la référence officielle du web, en français. Chaque balise, propriété CSS et fonction JavaScript y a sa page avec exemples. Les développeurs professionnels la consultent quotidiennement : chercher dans la doc n'est pas un aveu de faiblesse, c'est LE geste du métier.</p>
`
},

{
  id: 'langages',
  titre: 'Panorama des langages',
  contenu: `
<h2 style="margin-bottom:10px">La carte du monde des langages</h2>
<table class="memo-table">
<tr><th>Langage</th><th>Terrain de jeu</th><th>Difficulté d'accès</th></tr>
<tr><td>JavaScript / TypeScript</td><td>Sites et applis web, serveurs (Node.js), applis mobiles</td><td>Accessible — tu le connais !</td></tr>
<tr><td>Python</td><td>Données, IA, scripts, automatisation, serveurs</td><td>Le plus accessible</td></tr>
<tr><td>SQL</td><td>Bases de données (toutes les applications sérieuses)</td><td>Accessible, petit périmètre</td></tr>
<tr><td>PHP</td><td>Serveurs web (WordPress = 40% du web)</td><td>Accessible</td></tr>
<tr><td>Java</td><td>Grandes entreprises, Android, systèmes bancaires</td><td>Moyen</td></tr>
<tr><td>C#</td><td>Applications Windows, jeux (moteur Unity)</td><td>Moyen</td></tr>
<tr><td>C / C++</td><td>Systèmes d'exploitation, jeux AAA, embarqué</td><td>Exigeant</td></tr>
<tr><td>Rust / Go</td><td>Outils systèmes et serveurs modernes très rapides</td><td>Exigeant / Moyen</td></tr>
<tr><td>Swift / Kotlin</td><td>Applications iPhone / Android</td><td>Moyen</td></tr>
</table>

<h2 style="margin-bottom:10px">Aperçu de Python (ton futur 2e langage ?)</h2>
<p>Pas d'accolades ni de point-virgules : l'<strong>indentation</strong> délimite les blocs. Compare avec ton JavaScript :</p>
<div class="bloc-code"># Python — tout devrait te sembler familier !
prenom = "Léa"                    # variable (pas de let)
age = 28

if age >= 18:                     # deux-points + indentation = bloc
    print(f"{prenom} est majeure")   # f-string = les backticks de Python

fruits = ["pomme", "banane"]
for fruit in fruits:              # le for...of de Python
    print(fruit)

def doubler(n):                   # def = function
    return n * 2</div>

<h2 style="margin-bottom:10px">Aperçu de SQL (à apprendre en quelques jours)</h2>
<p>SQL ne décrit pas des étapes mais des <strong>demandes</strong> : « donne-moi ceci, trié comme cela ». Une table = un tableau Excel géant.</p>
<div class="bloc-code">-- Lire : les films récents, du plus récent au plus ancien
SELECT titre, annee FROM films
WHERE annee > 2000
ORDER BY annee DESC;

-- Ajouter une ligne
INSERT INTO films (titre, annee) VALUES ('Dune', 2021);

-- Modifier / supprimer (le WHERE est VITAL — sans lui, tout y passe !)
UPDATE films SET annee = 2022 WHERE titre = 'Dune';
DELETE FROM films WHERE annee < 1950;</div>

<h2 style="margin-bottom:10px">Comment aborder un nouveau langage (la méthode)</h2>
<ol style="margin:0 0 8px 24px">
<li>Retrouve tes repères : comment on affiche ? déclare une variable ? écrit un if, une boucle, une fonction ?</li>
<li>Refais un projet que tu connais déjà (la to-do list !) dans le nouveau langage ;</li>
<li>Note les différences dans un mémo personnel — le reste est identique ;</li>
<li>Compte quelques semaines, pas quelques mois : les concepts sont déjà en toi.</li>
</ol>
`
},

{
  id: 'pratiques',
  titre: 'Bonnes pratiques',
  contenu: `
<h2 style="margin-bottom:10px">Nommer, c'est déjà coder</h2>
<div class="bloc-code">// ❌ Illisible                    // ✅ Lisible
let x = 12;                        let prixUnitaire = 12;
let d = new Date();                let dateCommande = new Date();
function f(a, b) { ... }           function calculerTotal(prix, quantite) { ... }</div>
<ul style="margin:0 0 18px 24px">
<li>Un nom dit ce que la variable CONTIENT ou ce que la fonction FAIT ;</li>
<li>En camelCase pour JS : <code>scoreJoueur</code>, <code>calculerMoyenne</code> ;</li>
<li>Les booléens commencent souvent par est/a : <code>estMajeur</code>, <code>aGagne</code>.</li>
</ul>

<h2 style="margin-bottom:10px">Les règles d'or du code propre</h2>
<table class="memo-table">
<tr><th>Règle</th><th>En pratique</th></tr>
<tr><td>Indente toujours</td><td>Le contenu d'un bloc { } est décalé — l'œil voit la structure instantanément</td></tr>
<tr><td>Ne te répète pas (DRY)</td><td>Du code copié-collé 2 fois ? → une fonction. (« Don't Repeat Yourself »)</td></tr>
<tr><td>Petites fonctions</td><td>Une fonction = UNE responsabilité. « calculerEtAfficherEtSauver » = 3 fonctions.</td></tr>
<tr><td>Commente le POURQUOI</td><td>Pas « // ajoute 1 » (on le voit) mais « // la TVA n'est pas incluse dans le prix reçu »</td></tr>
<tr><td>Teste au fur et à mesure</td><td>Exécute après CHAQUE petite étape — jamais 50 lignes d'un coup</td></tr>
<tr><td>Gère les cas limites</td><td>Champ vide ? Liste vide ? Nombre négatif ? Zéro ? Les bugs vivent là.</td></tr>
<tr><td>Les données d'abord</td><td>Modifie tes tableaux/objets, et reconstruis l'affichage depuis eux (cf. projet du carnet)</td></tr>
</table>

<h2 style="margin-bottom:10px">L'état d'esprit</h2>
<ul style="margin:0 0 18px 24px">
<li><strong>Fais simple d'abord.</strong> Une version moche qui marche vaut mieux qu'une version parfaite qui n'existe pas. On améliore ensuite.</li>
<li><strong>Les erreurs sont des informations</strong>, jamais des jugements. Les pros en produisent des dizaines par jour.</li>
<li><strong>Cherche avant de demander, demande avant de bloquer 2 heures.</strong> L'équilibre du bon apprenant.</li>
<li><strong>Relis ton code du mois dernier.</strong> Si tu le trouves mauvais... c'est que tu as progressé. Ça n'arrête jamais.</li>
</ul>

<h2 style="margin-bottom:10px">Check-list avant de dire « c'est fini »</h2>
<ol style="margin:0 0 8px 24px">
<li>Ça marche dans le cas normal ?</li>
<li>Ça marche avec une saisie vide / bizarre / énorme ?</li>
<li>Les noms de variables se comprennent sans explication ?</li>
<li>Pas de code dupliqué qui mériterait une fonction ?</li>
<li>La console (F12) est vide d'erreurs rouges ?</li>
</ol>
`
},

];
