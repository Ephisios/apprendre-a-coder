/* ===== Python — seconde partie (py-10 à py-18) ===== */
window.DATA_PYTHON2 = [

/* ---------- py-10 ---------- */
{
  id: 'py-10',
  titre: 'Le texte en profondeur',
  contenu: `
<p>En Python, le texte n'est pas une matière inerte : il vient avec une boîte à outils. On appelle ces outils des <strong>méthodes</strong> — des fonctions attachées à la valeur, qu'on appelle avec un point.</p>

<pre class="bloc-code">phrase = "  Bonjour Le Monde  "

print(phrase.strip())          # enlève les espaces au début et à la fin
print(phrase.lower())          # tout en minuscules
print(phrase.upper())          # TOUT EN MAJUSCULES
print(phrase.replace("Monde", "Python"))
print(len(phrase))             # la longueur (fonction, pas méthode)</pre>

<h2>Découper et recoller</h2>
<pre class="bloc-code">mots = "pain,lait,café".split(",")
print(mots)                    # ['pain', 'lait', 'café']

print("-".join(["a", "b", "c"]))   # a-b-c</pre>
<p><code>split</code> transforme un texte en liste, <code>join</code> fait l'inverse. Ce duo sert en permanence : lire un fichier CSV, découper une phrase en mots, reconstruire une adresse.</p>

<h2>Chercher dedans</h2>
<pre class="bloc-code">print("Bonjour".startswith("Bon"))   # True
print("photo.jpg".endswith(".jpg"))  # True
print("café" in "j'aime le café")    # True — le mot-clé in marche aussi sur du texte</pre>

<div class="attention"><div>Une méthode ne modifie <strong>jamais</strong> le texte d'origine : elle en renvoie un nouveau. <code>phrase.upper()</code> seul ne sert à rien — il faut <code>phrase = phrase.upper()</code> ou utiliser directement le résultat.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'La variable <code>saisie</code> contient un email mal saisi. Nettoie-le : enlève les espaces autour et mets tout en minuscules, puis affiche le résultat.',
      codeDepart: 'saisie = "   Alex.Martin@MAIL.COM  "\n\n# nettoie puis affiche :\n',
      indice: 'On peut enchaîner les méthodes : <code>saisie.strip().lower()</code>',
      solution: 'saisie = "   Alex.Martin@MAIL.COM  "\n\nprint(saisie.strip().lower())',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche — pense au <code>print()</code>.' };
        if (l[0] !== 'alex.martin@mail.com') return { ok: false, message: 'Attendu exactement <code>alex.martin@mail.com</code>. Tu affiches « ' + l[0] + ' ». Il faut <code>.strip()</code> pour les espaces ET <code>.lower()</code> pour les majuscules.' };
        return { ok: true, message: 'C\'est très exactement ce que fait un formulaire d\'inscription sérieux avant d\'enregistrer un email.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> découpe la liste de courses (séparée par des virgules) et affiche <strong>le nombre d\'articles</strong>, puis <strong>le premier</strong>.',
      codeDepart: 'courses = "pain,lait,café,pommes"\n\n# découpe, puis affiche le nombre et le premier :\n',
      indice: '<code>articles = courses.split(",")</code> puis <code>print(len(articles))</code> et <code>print(articles[0])</code>',
      solution: 'courses = "pain,lait,café,pommes"\n\narticles = courses.split(",")\nprint(len(articles))\nprint(articles[0])',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\.split\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise <code>.split(",")</code> pour transformer le texte en liste.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '4') return { ok: false, message: 'Le nombre d\'articles attendu est 4 — affiche <code>len(...)</code> de la liste obtenue.' };
        if (l[1] !== 'pain') return { ok: false, message: 'Le premier article est « pain » (indice 0 de la liste).' };
        return { ok: true, message: 'split transforme du texte brut en données manipulables : c\'est la première étape de toute lecture de fichier.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi des initiales :</strong> à partir du nom complet, affiche les initiales en majuscules, séparées par un point — ici <code>A.M</code>.',
      codeDepart: 'nom = "alex martin"\n\n# affiche : A.M\n',
      indice: 'Découpe avec <code>.split(" ")</code>, prends le premier caractère de chaque morceau avec <code>[0]</code>, mets en majuscule avec <code>.upper()</code>, et recolle avec <code>".".join(...)</code>.',
      solution: 'nom = "alex martin"\n\nmorceaux = nom.split(" ")\ninitiales = []\nfor m in morceaux:\n    initiales.append(m[0].upper())\n\nprint(".".join(initiales))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[0] !== 'A.M') return { ok: false, message: 'Attendu exactement <code>A.M</code> — tu affiches « ' + l[0] + ' ». Vérifie les majuscules et le point de séparation.' };
        if (/["']A\.M["']/.test(ctx.code)) return { ok: false, message: 'Le résultat ne doit pas être écrit à la main : calcule-le à partir de la variable <code>nom</code>, pour que ça marche avec n\'importe quel nom.' };
        return { ok: true, message: 'Découper, transformer, recoller : ce trio résout une majorité des problèmes de traitement de texte.' };
      }
    }
  ]
},

/* ---------- py-11 ---------- */
{
  id: 'py-11',
  titre: 'Les f-strings : afficher proprement',
  contenu: `
<p>Assembler du texte et des variables avec des virgules fonctionne, mais devient vite pénible. Python offre une écriture bien plus lisible : la <strong>f-string</strong>.</p>

<pre class="bloc-code">prenom = "Nadia"
age = 32

# L'ancienne façon
print("Je m'appelle", prenom, "et j'ai", age, "ans")

# La f-string : un f devant les guillemets, les variables entre accolades
print(f"Je m'appelle {prenom} et j'ai {age} ans")</pre>

<p>Le <code>f</code> avant le guillemet ouvrant est indispensable. Sans lui, Python affiche littéralement les accolades.</p>

<h2>On peut calculer dans les accolades</h2>
<pre class="bloc-code">prix = 19.99
quantite = 3
print(f"Total : {prix * quantite} €")</pre>

<h2>Contrôler les décimales</h2>
<p>Un calcul donne souvent une avalanche de décimales. On les limite avec <code>:.2f</code> (deux chiffres après la virgule) :</p>
<pre class="bloc-code">moyenne = 13.666666666
print(f"Moyenne : {moyenne:.2f}")     # Moyenne : 13.67</pre>
<p><code>.1f</code> pour une décimale, <code>.0f</code> pour aucune. Python arrondit correctement au passage.</p>

<div class="astuce"><div>Si tu as vu du vieux code Python avec des <code>%s</code> ou des <code>.format()</code>, sache que les f-strings les remplacent avantageusement depuis Python 3.6. C'est aujourd'hui la façon normale d'écrire.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Réécris cette phrase avec une <strong>f-string</strong> pour afficher : <code>Nadia a 32 ans</code>.',
      codeDepart: 'prenom = "Nadia"\nage = 32\n\n# avec une f-string :\n',
      indice: 'Un <code>f</code> collé devant le guillemet, et les variables entre accolades : <code>print(f"{prenom} a {age} ans")</code>',
      solution: 'prenom = "Nadia"\nage = 32\n\nprint(f"{prenom} a {age} ans")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/f["']/.test(ctx.code)) return { ok: false, message: 'L\'exercice porte sur les f-strings : ajoute un <code>f</code> juste avant le guillemet ouvrant.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'Nadia a 32 ans') return { ok: false, message: 'Attendu exactement <code>Nadia a 32 ans</code> — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        if (/\{\s*["']/.test(ctx.code)) return { ok: false, message: 'Dans les accolades, on met le NOM de la variable sans guillemets : <code>{prenom}</code>, pas <code>{"prenom"}</code>.' };
        return { ok: true, message: 'Beaucoup plus lisible qu\'une file de virgules — et c\'est ce que tu verras dans tout le code Python moderne.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> affiche le total de la commande sous la forme <code>Total : 59.97 €</code> — avec exactement <strong>deux décimales</strong>.',
      codeDepart: 'prix = 19.99\nquantite = 3\n\n# Total : 59.97 €\n',
      indice: 'On peut calculer dans les accolades et imposer le format : <code>{prix * quantite:.2f}</code>',
      solution: 'prix = 19.99\nquantite = 3\n\nprint(f"Total : {prix * quantite:.2f} €")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (/59\.969/.test(l[0])) return { ok: false, message: 'Presque ! Le calcul donne 59.969999... : limite l\'affichage à deux décimales avec <code>:.2f</code> dans les accolades.' };
        if (l[0] !== 'Total : 59.97 €') return { ok: false, message: 'Attendu exactement <code>Total : 59.97 €</code> — tu affiches « ' + l[0] + ' ».' };
        if (/59\.97["']/.test(ctx.code)) return { ok: false, message: 'Le total doit être calculé (<code>prix * quantite</code>), pas écrit à la main.' };
        return { ok: true, message: ':.2f est LE format des prix. Sans lui, tes montants afficheraient des décimales absurdes — un grand classique des sites mal finis.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Que fait <code>print("Bonjour {prenom}")</code> — sans le <code>f</code> devant le guillemet ?',
      choix: [
        'Il affiche littéralement « Bonjour {prenom} », accolades comprises',
        'Il affiche le contenu de la variable prenom',
        'Il provoque une erreur',
        'Il affiche « Bonjour » puis une ligne vide'
      ],
      bonne: 0,
      explication: 'Sans le f, Python voit du texte ordinaire et n\'interprète rien. C\'est un oubli fréquent, et sournois : il n\'y a pas d\'erreur, juste un affichage absurde qu\'on ne remarque pas toujours.',
      aides: [
        null,
        'Non — c\'est justement le rôle du f de déclencher le remplacement. Sans lui, les accolades restent du texte.',
        'Pas d\'erreur, hélas : Python affiche simplement le texte tel quel. C\'est ce qui rend l\'oubli difficile à repérer.',
        'Non, la ligne s\'affiche en entier — mais sans remplacer la variable.'
      ]
    }
  ]
},

/* ---------- py-12 ---------- */
{
  id: 'py-12',
  titre: 'Les listes en compréhension',
  contenu: `
<p>Voici une écriture typiquement Python, qu'on ne trouve pas en JavaScript sous cette forme. Elle condense en une ligne ce qui prenait quatre lignes de boucle.</p>

<h2>Le problème</h2>
<pre class="bloc-code">nombres = [1, 2, 3, 4, 5]

# La façon classique
carres = []
for n in nombres:
    carres.append(n * n)
print(carres)      # [1, 4, 9, 16, 25]</pre>

<h2>La compréhension de liste</h2>
<pre class="bloc-code">carres = [n * n for n in nombres]</pre>
<p>Lis-la de droite à gauche : « pour chaque <code>n</code> dans <code>nombres</code> » … « prends <code>n * n</code> ». Le résultat est directement une nouvelle liste.</p>

<h2>Avec un filtre</h2>
<pre class="bloc-code">pairs = [n for n in nombres if n % 2 == 0]
print(pairs)       # [2, 4]</pre>
<p>Le <code>if</code> à la fin ne garde que les éléments qui remplissent la condition. C'est l'équivalent du <code>filter</code> que tu as vu en JavaScript.</p>

<h2>Et sur du texte</h2>
<pre class="bloc-code">mots = ["pain", "lait", "café"]
majuscules = [m.upper() for m in mots]
courts = [m for m in mots if len(m) <= 4]</pre>

<div class="attention"><div>La compréhension est élégante tant qu'elle tient sur une ligne lisible. Si tu dois y empiler deux conditions et un calcul compliqué, la bonne vieille boucle reste plus claire — et la clarté prime toujours sur la concision.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Crée la liste des <strong>doubles</strong> de chaque nombre, en une seule ligne avec une compréhension, puis affiche-la.',
      codeDepart: 'nombres = [1, 2, 3, 4, 5]\n\n# doubles = ... (en une ligne)\n',
      indices: [
        "Une compréhension se lit à l’envers de ce qu’on croit : on annonce d’abord ce qu’on veut <strong>obtenir</strong>, et seulement ensuite d’où ça vient.",
        "La carcasse est <code>[ … for n in nombres]</code>. Il ne reste qu’à dire, à la place des points, ce qu’on fait de chaque <code>n</code>.",
        "Doubler, c’est multiplier par 2 : <code>[n * 2 for n in nombres]</code>"
      ],
      solution: 'nombres = [1, 2, 3, 4, 5]\n\ndoubles = [n * 2 for n in nombres]\nprint(doubles)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\[[^\]]*\bfor\b[^\]]*\]/.test(ctx.code)) return { ok: false, message: 'L\'exercice porte sur la compréhension de liste : la boucle doit tenir DANS les crochets, sous la forme <code>[... for ... in ...]</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '[2, 4, 6, 8, 10]') return { ok: false, message: 'Attendu <code>[2, 4, 6, 8, 10]</code> — tu affiches ' + (l[0] || '(rien)') + '.' };
        return { ok: true, message: 'Une ligne au lieu de quatre, et l\'intention saute aux yeux. C\'est très courant dans le code Python professionnel.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> à partir des notes, construis la liste des <strong>notes supérieures ou égales à 10</strong> et affiche-la.',
      codeDepart: 'notes = [12, 7, 15, 9, 18, 4]\n\n# reçues = ...\n',
      indices: [
        "Garder certains éléments, ce n’est pas les transformer : chaque note gardée sort telle quelle. Ce qui s’ajoute, c’est une <strong>condition</strong>.",
        "La condition se met tout à la fin, après le <code>for</code> : <code>[n for n in notes if …]</code>",
        "« Supérieure ou égale à 10 » s’écrit <code>n &gt;= 10</code> : <code>[n for n in notes if n &gt;= 10]</code>"
      ],
      solution: 'notes = [12, 7, 15, 9, 18, 4]\n\nrecues = [n for n in notes if n >= 10]\nprint(recues)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\[[^\]]*\bfor\b[^\]]*\bif\b[^\]]*\]/.test(ctx.code)) return { ok: false, message: 'Utilise une compréhension AVEC filtre : <code>[n for n in notes if ...]</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '[12, 15, 18]') return { ok: false, message: 'Attendu <code>[12, 15, 18]</code> — tu affiches ' + (l[0] || '(rien)') + '. Attention : « supérieure ou égale » s\'écrit <code>>=</code>.' };
        return { ok: true, message: 'Filtrer une liste en une ligne : tu retrouveras exactement cette idée dans le WHERE du SQL.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi :</strong> à partir des prix hors taxes, construis la liste des prix TTC (multipliés par 1.2), <strong>arrondis à 2 décimales</strong>, et affiche-la.',
      codeDepart: 'ht = [10.0, 25.5, 8.99]\n\n# ttc = ...\n',
      indices: [
        "Deux gestes sur chaque prix : multiplier, puis arrondir. Les deux tiennent à la place du « ce que je veux obtenir », tout au début.",
        "On a le droit d’appeler une fonction à cet endroit. <code>round(x, 2)</code> arrondit <code>x</code> à deux décimales.",
        "<code>[round(p * 1.2, 2) for p in ht]</code>"
      ],
      solution: 'ht = [10.0, 25.5, 8.99]\n\nttc = [round(p * 1.2, 2) for p in ht]\nprint(ttc)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\[[^\]]*\bfor\b[^\]]*\]/.test(ctx.code)) return { ok: false, message: 'Utilise une compréhension de liste.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (/10\.799999/.test(l[0])) return { ok: false, message: 'Les décimales débordent : enveloppe le calcul dans <code>round(..., 2)</code>.' };
        if (l[0] !== '[12.0, 30.6, 10.79]') return { ok: false, message: 'Attendu <code>[12.0, 30.6, 10.79]</code> — tu affiches ' + l[0] + '.' };
        return { ok: true, message: 'Calcul et arrondi dans la même ligne. Voilà le genre de traitement qu\'on applique à des milliers de lignes de facturation.' };
      }
    }
  ]
},

/* ---------- py-13 ---------- */
{
  id: 'py-13',
  titre: 'Le hasard et les maths',
  contenu: `
<p>Python est livré avec une immense bibliothèque de modules prêts à l'emploi. Pour en utiliser un, on l'<strong>importe</strong> en haut du fichier.</p>

<h2>random : le hasard</h2>
<pre class="bloc-code">import random

de = random.randint(1, 6)          # un entier entre 1 et 6 INCLUS
print(de)

couleur = random.choice(["rouge", "vert", "bleu"])   # un élément au hasard
print(couleur)</pre>
<p>Attention à la différence avec <code>range()</code> : ici, <strong>les deux bornes sont incluses</strong>. <code>randint(1, 6)</code> peut donner 6.</p>

<h2>math : les outils de calcul</h2>
<pre class="bloc-code">import math

print(math.sqrt(16))     # 4.0 — racine carrée
print(math.floor(3.7))   # 3 — arrondi vers le bas
print(math.ceil(3.2))    # 4 — arrondi vers le haut
print(math.pi)           # 3.14159...</pre>

<h2>La forme d'un import</h2>
<p><code>import math</code> charge le module ; ensuite on écrit <code>math.sqrt(...)</code>, avec le nom du module devant. C'est ce point qui indique « cette fonction vient de là ».</p>

<div class="info"><div>Cette bibliothèque intégrée s'appelle la « bibliothèque standard », et elle est célèbre pour son ampleur : dates, fichiers, réseau, compression, statistiques… La devise de Python est d'ailleurs « batteries included » — les piles sont fournies.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Importe le module <code>random</code> et affiche un lancer de dé : un nombre entier entre 1 et 6 inclus.',
      codeDepart: '# import puis lancer :\n',
      indice: '<code>import random</code> en haut, puis <code>print(random.randint(1, 6))</code>',
      solution: 'import random\n\nprint(random.randint(1, 6))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/import\s+random/.test(ctx.code)) return { ok: false, message: 'Commence par <code>import random</code> — sans import, le module n\'existe pas.' };
        if (!/randint/.test(ctx.code)) return { ok: false, message: 'Utilise <code>random.randint(1, 6)</code> pour un entier entre 1 et 6.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        const n = Number(l[0]);
        if (!l.length || isNaN(n)) return { ok: false, message: 'J\'attends un nombre affiché.' };
        if (n < 1 || n > 6 || n !== Math.floor(n)) return { ok: false, message: 'Le résultat (' + l[0] + ') sort des faces d\'un dé : il doit être un entier entre 1 et 6.' };
        return { ok: true, message: 'Relance plusieurs fois : le résultat change à chaque exécution. Tu tiens le cœur de tous les jeux de hasard.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> importe <code>math</code> et affiche la racine carrée de 144, puis l\'arrondi <strong>vers le haut</strong> de 4.1.',
      codeDepart: '# deux lignes de résultat :\n',
      indice: '<code>math.sqrt(144)</code> pour la racine, <code>math.ceil(4.1)</code> pour l\'arrondi vers le haut.',
      solution: 'import math\n\nprint(math.sqrt(144))\nprint(math.ceil(4.1))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/import\s+math/.test(ctx.code)) return { ok: false, message: 'Il faut <code>import math</code> en haut du fichier.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (Number(l[0]) !== 12) return { ok: false, message: 'La racine carrée de 144 vaut 12 — utilise <code>math.sqrt(144)</code>. Tu affiches ' + (l[0] || '(rien)') + '.' };
        if (Number(l[1]) !== 5) return { ok: false, message: 'L\'arrondi vers le haut de 4.1 est 5 : c\'est <code>math.ceil</code> (ceil = plafond). <code>floor</code> aurait donné 4.' };
        return { ok: true, message: 'ceil vers le plafond, floor vers le plancher : le moyen mnémotechnique tient en deux mots anglais.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi du pile ou face :</strong> lance une pièce 100 fois et affiche le nombre de « pile ». Le résultat doit tourner autour de 50 — relance plusieurs fois pour le voir varier.',
      codeDepart: 'import random\n\npiles = 0\n# lance 100 fois...\n',
      indice: 'Une boucle <code>for i in range(100):</code>, et dedans : <code>if random.choice(["pile", "face"]) == "pile":</code> puis <code>piles = piles + 1</code>.',
      solution: 'import random\n\npiles = 0\nfor i in range(100):\n    if random.choice(["pile", "face"]) == "pile":\n        piles = piles + 1\n\nprint(piles)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/for\s+\w+\s+in\s+range\s*\(\s*100\s*\)/.test(ctx.code)) return { ok: false, message: 'Il faut une boucle de 100 tours : <code>for i in range(100):</code>' };
        if (!/random\.(choice|randint)/.test(ctx.code)) return { ok: false, message: 'Le tirage doit être aléatoire — utilise <code>random.choice([...])</code> ou <code>random.randint(0, 1)</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        const n = Number(l[l.length - 1]);
        if (isNaN(n)) return { ok: false, message: 'J\'attends un nombre : le total des « pile ».' };
        if (n < 20 || n > 80) return { ok: false, message: 'Le résultat (' + n + ') est trop éloigné de 50 pour 100 lancers équilibrés. Vérifie que tu comptes bien un seul cas sur les deux.' };
        return { ok: true, message: 'Autour de 50, jamais exactement 50 : tu viens de faire ta première simulation. C\'est ainsi qu\'on teste des probabilités en science et en finance.' };
      }
    }
  ]
},

/* ---------- py-14 ---------- */
{
  id: 'py-14',
  titre: 'Dictionnaires avancés',
  contenu: `
<p>Tu sais lire et écrire une clé. Voyons maintenant comment parcourir un dictionnaire et éviter ses pièges.</p>

<h2>Les trois façons de parcourir</h2>
<pre class="bloc-code">stock = {"pommes": 12, "poires": 5, "cerises": 30}

for cle in stock:                  # les clés
    print(cle)

for valeur in stock.values():      # les valeurs
    print(valeur)

for cle, valeur in stock.items():  # LES DEUX à la fois
    print(cle, ":", valeur)</pre>
<p><code>.items()</code> est de loin la plus utile : elle donne la clé et la valeur en même temps, dans deux variables.</p>

<h2>get() : lire sans risquer l'erreur</h2>
<p>Tu te souviens que <code>stock["bananes"]</code> provoque un <code>KeyError</code> si la clé n'existe pas. <code>get()</code> répond gentiment à la place :</p>
<pre class="bloc-code">print(stock.get("bananes"))         # None — pas d'erreur
print(stock.get("bananes", 0))      # 0 — valeur par défaut au choix</pre>

<h2>Le compteur : le motif à connaître</h2>
<pre class="bloc-code">mots = ["chat", "chien", "chat", "oiseau", "chat"]
compte = {}

for mot in mots:
    compte[mot] = compte.get(mot, 0) + 1

print(compte)    # {'chat': 3, 'chien': 1, 'oiseau': 1}</pre>
<p>Décortiquons la ligne clé : « prends le compte actuel de ce mot (0 s'il est inconnu), ajoute 1, range le résultat ». Sans <code>get</code>, il aurait fallu un <code>if</code> pour traiter le premier passage. Ce motif compte des mots, des ventes, des visites — tu le réutiliseras souvent.</p>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Parcours le stock avec <code>.items()</code> et affiche une ligne par produit, sous la forme <code>pommes : 12</code>.',
      codeDepart: 'stock = {"pommes": 12, "poires": 5, "cerises": 30}\n\n# une ligne par produit :\n',
      indice: '<code>for cle, valeur in stock.items():</code> puis, indenté, un print avec une f-string : <code>print(f"{cle} : {valeur}")</code>',
      solution: 'stock = {"pommes": 12, "poires": 5, "cerises": 30}\n\nfor cle, valeur in stock.items():\n    print(f"{cle} : {valeur}")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\.items\s*\(\s*\)/.test(ctx.code)) return { ok: false, message: 'L\'exercice porte sur <code>.items()</code> — utilise <code>for cle, valeur in stock.items():</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes, une par produit — j\'en compte ' + l.length + '.' };
        if (!/pommes\s*:\s*12/.test(l[0])) return { ok: false, message: 'La première ligne devrait ressembler à <code>pommes : 12</code>. Tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: '.items() donne la clé et la valeur d\'un coup : c\'est la façon normale de parcourir un dictionnaire en Python.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> affiche le stock de <code>bananes</code>. Le produit n\'existe pas dans le dictionnaire — ton code doit afficher <code>0</code> au lieu de planter.',
      codeDepart: 'stock = {"pommes": 12, "poires": 5}\n\n# doit afficher 0, sans erreur :\n',
      indice: '<code>stock.get("bananes", 0)</code> — le second argument est la valeur renvoyée si la clé est absente.',
      solution: 'stock = {"pommes": 12, "poires": 5}\n\nprint(stock.get("bananes", 0))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur + ' — c\'est justement ce que <code>.get()</code> permet d\'éviter.' };
        if (!/\.get\s*\(/.test(ctx.code)) return { ok: false, message: 'Utilise la méthode <code>.get()</code> avec une valeur par défaut, plutôt que les crochets.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== '0') return { ok: false, message: 'Attendu <code>0</code> — tu affiches « ' + (l[0] || '(rien)') + ' ». Pense au second argument de get.' };
        return { ok: true, message: 'get évite les plantages sur données incomplètes — et dans la vraie vie, les données sont toujours incomplètes.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi du compteur :</strong> compte combien de fois chaque mot apparaît, et affiche le dictionnaire obtenu.',
      codeDepart: 'mots = ["chat", "chien", "chat", "oiseau", "chat", "chien"]\n\ncompte = {}\n# ta boucle :\n',
      indice: 'Dans la boucle, une seule ligne suffit : <code>compte[mot] = compte.get(mot, 0) + 1</code>',
      solution: 'mots = ["chat", "chien", "chat", "oiseau", "chat", "chien"]\n\ncompte = {}\nfor mot in mots:\n    compte[mot] = compte.get(mot, 0) + 1\n\nprint(compte)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/for\s+\w+\s+in\s+mots/.test(ctx.code)) return { ok: false, message: 'Le comptage doit venir d\'une boucle sur <code>mots</code>, pas d\'un dictionnaire écrit à la main.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        const texte = l.join(' ');
        if (!/chat['"]?\s*:\s*3/.test(texte)) return { ok: false, message: '« chat » apparaît 3 fois — je ne retrouve pas ce compte dans ton résultat : ' + (l[0] || '(rien)') + '.' };
        if (!/chien['"]?\s*:\s*2/.test(texte) || !/oiseau['"]?\s*:\s*1/.test(texte)) return { ok: false, message: 'Attendu : chat 3, chien 2, oiseau 1. Ton résultat : ' + l[0] + '.' };
        return { ok: true, message: 'Ce motif en une ligne est un classique absolu : compter des occurrences est l\'une des tâches les plus fréquentes en traitement de données.' };
      }
    }
  ]
},

/* ---------- py-15 ---------- */
{
  id: 'py-15',
  titre: 'Gérer les erreurs sans planter',
  contenu: `
<p>Jusqu'ici, une erreur arrêtait net ton programme. Dans une vraie application, c'est inacceptable : un utilisateur qui tape « abc » dans un champ « âge » ne doit pas faire tomber le logiciel. Python propose de <strong>tenter</strong> une opération et de prévoir le cas où elle échoue.</p>

<pre class="bloc-code">try:
    nombre = int("abc")
    print(nombre)
except ValueError:
    print("Ce n'est pas un nombre valide.")

print("Le programme continue !")</pre>

<ul>
<li><code>try:</code> — « essaie ce bloc » ;</li>
<li><code>except TypeErreur:</code> — « si CETTE erreur survient, fais plutôt ça » ;</li>
<li>et le programme <strong>continue</strong> ensuite, au lieu de s'arrêter.</li>
</ul>

<h2>Attraper la bonne erreur</h2>
<p>Chaque type d'erreur a un nom, que tu as déjà croisé : <code>ValueError</code> (conversion impossible), <code>ZeroDivisionError</code>, <code>KeyError</code>, <code>IndexError</code>, <code>TypeError</code>. On peut en attraper plusieurs :</p>
<pre class="bloc-code">try:
    resultat = 10 / 0
except ZeroDivisionError:
    print("Division par zéro impossible")
except ValueError:
    print("Valeur incorrecte")</pre>

<div class="attention"><div>Écrire <code>except:</code> tout seul attrape <em>toutes</em> les erreurs, y compris celles que tu n'avais pas prévues — et masque donc tes propres bugs. Nomme toujours l'erreur que tu attends vraiment : c'est la différence entre gérer un cas et cacher la poussière sous le tapis.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Ce code plante. Entoure-le d\'un <code>try</code> / <code>except ValueError</code> pour qu\'il affiche <code>Ce n\'est pas un nombre</code> au lieu de s\'arrêter.',
      codeDepart: 'saisie = "abc"\n\nnombre = int(saisie)\nprint(nombre)\n',
      indice: 'Décale les deux lignes sous <code>try:</code>, puis ajoute <code>except ValueError:</code> avec le message.',
      solution: 'saisie = "abc"\n\ntry:\n    nombre = int(saisie)\n    print(nombre)\nexcept ValueError:\n    print("Ce n\'est pas un nombre")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Le programme plante encore : ' + ctx.erreur + ' — c\'est justement ce que le <code>try</code> doit empêcher.' };
        if (!/try\s*:/.test(ctx.code) || !/except/.test(ctx.code)) return { ok: false, message: 'Il faut un bloc <code>try:</code> et un bloc <code>except ValueError:</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.some(x => /n'est pas un nombre/i.test(x))) return { ok: false, message: 'Le message attendu est « Ce n\'est pas un nombre ». Affiché : ' + (l[0] || '(rien)') + '.' };
        return { ok: true, message: 'Le programme a survécu à l\'erreur. C\'est la base de toute application qui accepte des données venant de l\'extérieur.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> la division par zéro doit afficher <code>Division impossible</code>, et le programme doit continuer jusqu\'au message final (déjà écrit).',
      codeDepart: 'a = 10\nb = 0\n\n# protège cette division :\nresultat = a / b\nprint(resultat)\n\nprint("Fin du programme")',
      indice: 'L\'erreur à attraper s\'appelle <code>ZeroDivisionError</code>.',
      solution: 'a = 10\nb = 0\n\ntry:\n    resultat = a / b\n    print(resultat)\nexcept ZeroDivisionError:\n    print("Division impossible")\n\nprint("Fin du programme")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Le programme plante encore : ' + ctx.erreur };
        if (!/except\s+ZeroDivisionError/.test(ctx.code)) return { ok: false, message: 'Attrape précisément <code>ZeroDivisionError</code> (et non un <code>except:</code> nu, qui masquerait tout).' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.some(x => /division impossible/i.test(x))) return { ok: false, message: 'Le message « Division impossible » devrait s\'afficher.' };
        if (!l.some(x => /fin du programme/i.test(x))) return { ok: false, message: 'Le programme doit atteindre « Fin du programme » — vérifie que ce print est bien HORS du try, sans indentation.' };
        return { ok: true, message: 'Erreur gérée, programme intact : le comportement d\'un logiciel professionnel.' };
      }
    },
    {
      type: 'qcm',
      consigne: 'Pourquoi éviter d\'écrire <code>except:</code> tout seul, sans nommer l\'erreur ?',
      choix: [
        'Parce qu\'il attrape aussi les erreurs imprévues et masque tes propres bugs',
        'Parce que c\'est interdit par Python',
        'Parce que c\'est plus lent à l\'exécution',
        'Parce qu\'il ne fonctionne que dans les fonctions'
      ],
      bonne: 0,
      explication: 'Un except nu attrape absolument tout — y compris une faute de frappe dans un nom de variable. Ton programme continue comme si de rien n\'était, et le vrai bug reste invisible pendant des semaines.',
      aides: [
        null,
        'Python l\'autorise techniquement — c\'est une mauvaise pratique, pas une erreur de syntaxe. D\'où l\'importance de connaître la raison.',
        'La performance n\'a rien à voir : le problème est que tu perds l\'information sur ce qui a réellement échoué.',
        'Il fonctionne partout. Le souci est ailleurs : il attrape trop de choses.'
      ]
    }
  ]
},

/* ---------- py-16 ---------- */
{
  id: 'py-16',
  titre: 'Les objets : créer ses propres types',
  contenu: `
<p>Tu as manipulé des textes, des nombres, des listes. Et si tu créais <strong>ton propre type</strong> de donnée ? C'est ce que permet une <strong>classe</strong> : un moule à partir duquel on fabrique des objets.</p>

<pre class="bloc-code">class Chien:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

    def aboyer(self):
        return f"{self.nom} dit Ouaf !"

rex = Chien("Rex", 3)
medor = Chien("Médor", 7)

print(rex.nom)         # Rex
print(rex.aboyer())    # Rex dit Ouaf !
print(medor.aboyer())  # Médor dit Ouaf !</pre>

<h2>Décryptage</h2>
<ul>
<li><code>class Chien:</code> — le moule. Par convention, son nom prend une majuscule ;</li>
<li><code>__init__</code> — la méthode de construction, appelée automatiquement à chaque <code>Chien(...)</code>. Elle range les données dans l'objet ;</li>
<li><code>self</code> — l'objet en cours de fabrication. <code>self.nom = nom</code> signifie « garde ce nom dans cet objet précis ». Il est <strong>toujours</strong> le premier paramètre des méthodes ;</li>
<li><code>rex.aboyer()</code> — l'appel d'une méthode sur un objet, exactement comme <code>"texte".upper()</code>.</li>
</ul>

<h2>Pourquoi c'est utile</h2>
<p>Un dictionnaire décrit des données. Une classe regroupe les données <strong>et</strong> les actions qui vont avec. Quand un programme grossit, ça évite d'avoir vingt fonctions éparpillées qui manipulent toutes le même genre de dictionnaire.</p>

<div class="info"><div>Tu viens de toucher à la « programmation orientée objet ». C'est un vaste sujet — des livres entiers y sont consacrés. Ce qui compte à ton niveau : savoir lire une classe et comprendre que <code>self</code> désigne l'objet lui-même.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Crée une classe <code>Chien</code> avec un <code>__init__</code> qui range le <code>nom</code>, puis fabrique un chien nommé <code>Rex</code> et affiche son nom.',
      codeDepart: '# class, puis création, puis affichage :\n',
      indice: '<code>class Chien:</code> · <code>def __init__(self, nom):</code> · <code>self.nom = nom</code>. Ensuite : <code>rex = Chien("Rex")</code> et <code>print(rex.nom)</code>.',
      solution: 'class Chien:\n    def __init__(self, nom):\n        self.nom = nom\n\nrex = Chien("Rex")\nprint(rex.nom)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/class\s+Chien\s*:/.test(ctx.code)) return { ok: false, message: 'Définis la classe avec <code>class Chien:</code>' };
        if (!/def\s+__init__\s*\(\s*self/.test(ctx.code)) return { ok: false, message: 'Il manque le constructeur <code>def __init__(self, nom):</code> — attention aux DEUX tirets bas de chaque côté.' };
        if (!/self\.nom\s*=/.test(ctx.code)) return { ok: false, message: 'Range le nom dans l\'objet avec <code>self.nom = nom</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l[0] !== 'Rex') return { ok: false, message: 'J\'attends « Rex » affiché — tu affiches « ' + (l[0] || '(rien)') + ' ».' };
        return { ok: true, message: 'Tu viens de créer ton propre type de donnée. Chaque Chien fabriqué aura son nom à lui.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> ajoute une méthode <code>aboyer()</code> qui <strong>renvoie</strong> <code>Rex dit Ouaf !</code>, et affiche son résultat pour deux chiens différents.',
      codeDepart: 'class Chien:\n    def __init__(self, nom):\n        self.nom = nom\n\n    # ta méthode aboyer ici\n\n',
      indice: '<code>def aboyer(self):</code> puis <code>return f"{self.nom} dit Ouaf !"</code>. N\'oublie pas <code>self</code> en premier paramètre.',
      solution: 'class Chien:\n    def __init__(self, nom):\n        self.nom = nom\n\n    def aboyer(self):\n        return f"{self.nom} dit Ouaf !"\n\nrex = Chien("Rex")\nmedor = Chien("Médor")\nprint(rex.aboyer())\nprint(medor.aboyer())',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/def\s+aboyer\s*\(\s*self/.test(ctx.code)) return { ok: false, message: 'La méthode doit commencer par <code>def aboyer(self):</code> — <code>self</code> est obligatoire en premier paramètre.' };
        if (!/return/.test(ctx.code)) return { ok: false, message: 'La méthode doit <code>return</code> le texte (et non l\'afficher elle-même).' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length < 2) return { ok: false, message: 'J\'attends deux lignes, pour deux chiens différents.' };
        if (!/dit Ouaf/i.test(l[0])) return { ok: false, message: 'La première ligne devrait ressembler à « Rex dit Ouaf ! » — tu affiches « ' + l[0] + ' ».' };
        if (l[0] === l[1]) return { ok: false, message: 'Les deux chiens doivent avoir des noms différents — c\'est ce qui prouve que chaque objet garde ses propres données.' };
        return { ok: true, message: 'Une seule classe, deux objets indépendants : chacun connaît son nom. C\'est tout l\'intérêt du moule.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi du compte en banque :</strong> crée une classe <code>Compte</code> avec un <code>solde</code> de départ, une méthode <code>deposer(montant)</code> qui l\'augmente, et affiche le solde après un dépôt de 50 sur un compte ouvert à 100.',
      codeDepart: '# Attendu à l\'écran : 150\n',
      indice: 'Dans <code>deposer</code>, modifie l\'attribut : <code>self.solde = self.solde + montant</code>. Puis <code>c = Compte(100)</code>, <code>c.deposer(50)</code>, <code>print(c.solde)</code>.',
      solution: 'class Compte:\n    def __init__(self, solde):\n        self.solde = solde\n\n    def deposer(self, montant):\n        self.solde = self.solde + montant\n\nc = Compte(100)\nc.deposer(50)\nprint(c.solde)',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/class\s+Compte\s*:/.test(ctx.code)) return { ok: false, message: 'Définis <code>class Compte:</code>' };
        if (!/def\s+deposer\s*\(\s*self/.test(ctx.code)) return { ok: false, message: 'Il faut une méthode <code>def deposer(self, montant):</code>' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (Number(l[l.length - 1]) !== 150) return { ok: false, message: 'Attendu 150 (100 + 50) — tu affiches ' + (l[l.length - 1] || '(rien)') + '. La méthode doit modifier <code>self.solde</code>, pas une variable locale.' };
        return { ok: true, message: 'Un objet qui garde son état et le modifie lui-même : tu tiens le principe des objets. C\'est exactement ainsi qu\'est conçu tout logiciel bancaire.' };
      }
    }
  ]
},

/* ---------- py-17 ---------- */
{
  id: 'py-17',
  titre: 'Projet : le carnet de contacts',
  contenu: `
<p>Assemblons tout : listes, dictionnaires, boucles, fonctions et f-strings, dans un programme qui ressemble à ce qu'on écrit vraiment.</p>

<h2>La structure de données</h2>
<p>Un contact est décrit par un dictionnaire. Le carnet est une <strong>liste de dictionnaires</strong> — c'est LA structure de base de la manipulation de données en Python (et ce que renvoie n'importe quelle base de données, tu le verras avec SQL) :</p>
<pre class="bloc-code">carnet = [
    {"nom": "Nadia", "ville": "Lyon", "age": 32},
    {"nom": "Karim", "ville": "Lille", "age": 45},
    {"nom": "Sophie", "ville": "Lyon", "age": 28}
]</pre>

<h2>Parcourir</h2>
<pre class="bloc-code">for contact in carnet:
    print(f"{contact['nom']} habite à {contact['ville']}")</pre>
<p>Note l'astuce : dans une f-string écrite avec des guillemets doubles, on utilise des apostrophes simples pour les clés — sinon Python croit que le texte s'arrête.</p>

<h2>Filtrer</h2>
<pre class="bloc-code">lyonnais = [c for c in carnet if c["ville"] == "Lyon"]
print(len(lyonnais))    # 2</pre>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Affiche une ligne par contact, sous la forme <code>Nadia (Lyon)</code>.',
      codeDepart: 'carnet = [\n    {"nom": "Nadia", "ville": "Lyon", "age": 32},\n    {"nom": "Karim", "ville": "Lille", "age": 45},\n    {"nom": "Sophie", "ville": "Lyon", "age": 28}\n]\n\n# une ligne par contact :\n',
      indice: '<code>for c in carnet:</code> puis <code>print(f"{c[\'nom\']} ({c[\'ville\']})")</code>',
      solution: 'carnet = [\n    {"nom": "Nadia", "ville": "Lyon", "age": 32},\n    {"nom": "Karim", "ville": "Lille", "age": 45},\n    {"nom": "Sophie", "ville": "Lyon", "age": 28}\n]\n\nfor c in carnet:\n    print(f"{c[\'nom\']} ({c[\'ville\']})")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (l.length !== 3) return { ok: false, message: 'J\'attends 3 lignes, une par contact — j\'en compte ' + l.length + '.' };
        if (l[0].trim() !== 'Nadia (Lyon)') return { ok: false, message: 'Format attendu : <code>Nadia (Lyon)</code> — tu affiches « ' + l[0] + ' ».' };
        if (l[2].trim() !== 'Sophie (Lyon)') return { ok: false, message: 'La troisième ligne devrait être <code>Sophie (Lyon)</code>.' };
        return { ok: true, message: 'Une liste de dictionnaires parcourue proprement : c\'est le pain quotidien du traitement de données.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Entraînement :</strong> écris une fonction <code>chercher_par_ville(carnet, ville)</code> qui <strong>renvoie</strong> la liste des contacts de cette ville, et affiche le nombre de Lyonnais.',
      codeDepart: 'carnet = [\n    {"nom": "Nadia", "ville": "Lyon", "age": 32},\n    {"nom": "Karim", "ville": "Lille", "age": 45},\n    {"nom": "Sophie", "ville": "Lyon", "age": 28}\n]\n\n# ta fonction, puis print(len(...)) :\n',
      indice: 'Dans la fonction : <code>return [c for c in carnet if c["ville"] == ville]</code>. Ensuite : <code>print(len(chercher_par_ville(carnet, "Lyon")))</code>',
      solution: 'carnet = [\n    {"nom": "Nadia", "ville": "Lyon", "age": 32},\n    {"nom": "Karim", "ville": "Lille", "age": 45},\n    {"nom": "Sophie", "ville": "Lyon", "age": 28}\n]\n\ndef chercher_par_ville(carnet, ville):\n    return [c for c in carnet if c["ville"] == ville]\n\nprint(len(chercher_par_ville(carnet, "Lyon")))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/def\s+chercher_par_ville\s*\(/.test(ctx.code)) return { ok: false, message: 'Définis la fonction <code>def chercher_par_ville(carnet, ville):</code>' };
        if (!/return/.test(ctx.code)) return { ok: false, message: 'La fonction doit <code>return</code> la liste trouvée.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (Number(l[l.length - 1]) !== 2) return { ok: false, message: 'Deux contacts habitent Lyon — tu affiches ' + (l[l.length - 1] || '(rien)') + '.' };
        return { ok: true, message: 'Une fonction de recherche réutilisable : change la ville en argument et elle fonctionne toujours.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Défi :</strong> affiche l\'<strong>âge moyen</strong> du carnet, arrondi à une décimale, sous la forme <code>Âge moyen : 35.0</code>.',
      codeDepart: 'carnet = [\n    {"nom": "Nadia", "ville": "Lyon", "age": 32},\n    {"nom": "Karim", "ville": "Lille", "age": 45},\n    {"nom": "Sophie", "ville": "Lyon", "age": 28}\n]\n\n# Âge moyen : 35.0\n',
      indice: 'Totalise les âges avec une boucle (ou <code>sum([c["age"] for c in carnet])</code>), divise par <code>len(carnet)</code>, et formate avec <code>:.1f</code> dans une f-string.',
      solution: 'carnet = [\n    {"nom": "Nadia", "ville": "Lyon", "age": 32},\n    {"nom": "Karim", "ville": "Lille", "age": 45},\n    {"nom": "Sophie", "ville": "Lyon", "age": 28}\n]\n\ntotal = 0\nfor c in carnet:\n    total = total + c["age"]\n\nmoyenne = total / len(carnet)\nprint(f"Âge moyen : {moyenne:.1f}")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/len\s*\(/.test(ctx.code)) return { ok: false, message: 'Divise par <code>len(carnet)</code>, pour que le calcul reste juste si on ajoute un contact.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (/35\.0{4,}|33\.33/.test(l[0])) return { ok: false, message: 'Limite l\'affichage à une décimale avec <code>:.1f</code>.' };
        if (l[0].trim() !== 'Âge moyen : 35.0') return { ok: false, message: 'Attendu exactement <code>Âge moyen : 35.0</code> — tu affiches « ' + l[0] + ' ».' };
        return { ok: true, message: 'Parcourir, totaliser, moyenner, formater : le squelette de tout script d\'analyse.' };
      }
    }
  ]
},

/* ---------- py-18 ---------- */
{
  id: 'py-18',
  titre: 'Projet : l\'analyseur de texte',
  contenu: `
<p>Dernier projet du module : un programme qui analyse un texte, comme le font les outils de statistiques éditoriales. Tout ce dont tu as besoin est déjà dans ta boîte à outils.</p>

<h2>Le texte à analyser</h2>
<pre class="bloc-code">texte = "le chat dort le chien court le chat mange"</pre>

<h2>La méthode</h2>
<ol>
<li>découper le texte en mots avec <code>.split(" ")</code> ;</li>
<li>compter les mots avec <code>len()</code> ;</li>
<li>compter les occurrences de chacun avec le motif <code>compte.get(mot, 0) + 1</code> ;</li>
<li>trouver le mot le plus fréquent en parcourant le dictionnaire.</li>
</ol>

<h2>Trouver le maximum d'un dictionnaire</h2>
<p>Même principe que la meilleure note d'une liste, mais avec deux variables à retenir — le mot ET son compte :</p>
<pre class="bloc-code">meilleur_mot = ""
meilleur_compte = 0

for mot, n in compte.items():
    if n > meilleur_compte:
        meilleur_compte = n
        meilleur_mot = mot</pre>

<div class="astuce"><div>C'est le dernier exercice du module Python. Si tu le réussis, tu sais faire en Python tout ce que tu savais faire en JavaScript — et tu as en plus les compréhensions, les f-strings et les objets.</div></div>
`,
  exercices: [
    {
      type: 'py',
      consigne: '<strong>Étape 1 :</strong> découpe le texte en mots et affiche <strong>le nombre total de mots</strong>.',
      codeDepart: 'texte = "le chat dort le chien court le chat mange"\n\n# nombre de mots :\n',
      indice: '<code>mots = texte.split(" ")</code> puis <code>print(len(mots))</code>',
      solution: 'texte = "le chat dort le chien court le chat mange"\n\nmots = texte.split(" ")\nprint(len(mots))',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/\.split\s*\(/.test(ctx.code)) return { ok: false, message: 'Découpe le texte avec <code>.split(" ")</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (Number(l[0]) !== 9) return { ok: false, message: 'Le texte contient 9 mots — tu affiches ' + (l[0] || '(rien)') + '.' };
        return { ok: true, message: 'Du texte brut à des données comptables en deux lignes.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Étape 2 :</strong> compte les occurrences de chaque mot et affiche combien de fois apparaît le mot <code>le</code>.',
      codeDepart: 'texte = "le chat dort le chien court le chat mange"\nmots = texte.split(" ")\n\ncompte = {}\n# ta boucle, puis affiche compte["le"] :\n',
      indice: 'Le motif du compteur : <code>compte[mot] = compte.get(mot, 0) + 1</code>, puis <code>print(compte["le"])</code>',
      solution: 'texte = "le chat dort le chien court le chat mange"\nmots = texte.split(" ")\n\ncompte = {}\nfor mot in mots:\n    compte[mot] = compte.get(mot, 0) + 1\n\nprint(compte["le"])',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (!/for\s+\w+\s+in\s+mots/.test(ctx.code)) return { ok: false, message: 'Le comptage doit venir d\'une boucle sur <code>mots</code>.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (Number(l[l.length - 1]) !== 3) return { ok: false, message: 'Le mot « le » apparaît 3 fois — tu affiches ' + (l[l.length - 1] || '(rien)') + '.' };
        return { ok: true, message: 'Ton dictionnaire contient maintenant la fréquence de chaque mot du texte.' };
      }
    },
    {
      type: 'py',
      consigne: '<strong>Étape 3 — la finale :</strong> trouve le mot <strong>le plus fréquent</strong> et affiche-le sous la forme <code>le (3 fois)</code>.',
      codeDepart: 'texte = "le chat dort le chien court le chat mange"\nmots = texte.split(" ")\n\ncompte = {}\nfor mot in mots:\n    compte[mot] = compte.get(mot, 0) + 1\n\n# trouve le maximum, puis affiche : le (3 fois)\n',
      indice: 'Deux variables à retenir : <code>meilleur_mot = ""</code> et <code>meilleur_compte = 0</code>. Puis <code>for mot, n in compte.items():</code> avec un <code>if n > meilleur_compte:</code> qui met les deux à jour.',
      solution: 'texte = "le chat dort le chien court le chat mange"\nmots = texte.split(" ")\n\ncompte = {}\nfor mot in mots:\n    compte[mot] = compte.get(mot, 0) + 1\n\nmeilleur_mot = ""\nmeilleur_compte = 0\nfor mot, n in compte.items():\n    if n > meilleur_compte:\n        meilleur_compte = n\n        meilleur_mot = mot\n\nprint(f"{meilleur_mot} ({meilleur_compte} fois)")',
      verifier: function (ctx) {
        if (ctx.erreur) return { ok: false, message: 'Ton code plante : ' + ctx.erreur };
        if (/["']le \(3 fois\)["']/.test(ctx.code)) return { ok: false, message: 'Le résultat doit être calculé, pas écrit à la main — sinon ton programme ne marcherait que pour ce texte précis.' };
        const l = ctx.logs.filter(x => x.trim() !== '');
        if (!l.length) return { ok: false, message: 'Rien ne s\'affiche.' };
        if (l[l.length - 1].trim() !== 'le (3 fois)') return { ok: false, message: 'Attendu exactement <code>le (3 fois)</code> — tu affiches « ' + l[l.length - 1] + ' ».' };
        return { ok: true, message: 'Module Python terminé ! 🐍 Découper, compter, chercher un maximum, formater : tu viens d\'écrire un vrai outil d\'analyse. Change le texte de départ, il fonctionne toujours.' };
      }
    }
  ]
}
];
