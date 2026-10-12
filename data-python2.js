/* ===== Python — seconde partie (py-10 à py-18) ===== */
window.DATA_PYTHON2 = [

/* ---------- py-10 ---------- */
{
  id: 'py-10',
  titre: 'Le texte en profondeur',
  contenu: `
<h2>Pourquoi ça existe</h2>
<p>Les données qu'on reçoit ne sont jamais propres : un pseudo tapé avec des espaces au début, une ligne de fichier séparée par des virgules, un nom saisi tantôt en majuscules tantôt en minuscules. Avant de s'en servir, il faut les nettoyer.</p>
<p>En Python, le texte n'est pas une matière inerte : il vient avec une boîte à outils. On appelle ces outils des <strong>méthodes</strong> — des fonctions attachées à la valeur, qu'on appelle avec un point.</p>

<h2>La trousse</h2>
<pre class="bloc-code">p = "  Bonjour Le Monde  "

p.strip()                      # "Bonjour Le Monde"
p.strip().lower()              # "bonjour le monde"
p.strip().split(" ")           # ['Bonjour', 'Le', 'Monde']
p.strip().replace("Monde", "Tous")   # "Bonjour Le Tous"</pre>
<p>Tous mesurés. Remarque l'<strong>enchaînement</strong> : chaque méthode rend un texte, sur lequel on peut aussitôt en appeler une autre. On lit de gauche à droite, dans l'ordre des opérations.</p>
<p>Les autres à connaître : <code>upper()</code>, <code>startswith("Bon")</code>, <code>endswith(".txt")</code>, <code>count("o")</code>, <code>find("Le")</code> et <code>join</code>, qui fait l'inverse de <code>split</code>.</p>

<h2>Pas à pas : le nettoyage d'une saisie</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Valeur</th></tr>
<tr><td>ce que l'utilisateur tape</td><td><code>"  NaDiA  "</code></td></tr>
<tr><td><code>.strip()</code></td><td><code>"NaDiA"</code></td></tr>
<tr><td><code>.lower()</code></td><td><code>"nadia"</code></td></tr>
<tr><td>comparaison</td><td>elle peut enfin réussir</td></tr>
</table>
<p>C'est le réflexe à prendre : avant de comparer deux saisies, on les met dans la même forme. Sans cela, « Nadia » et « nadia » sont deux textes différents.</p>

<h2>Le point à ne jamais oublier</h2>
<pre class="bloc-code">p = "  Bonjour  "
p.strip()        # ne change PAS p
print(p)         # "  Bonjour  " — toujours avec ses espaces

p = p.strip()    # la bonne facon</pre>
<p>En Python, <strong>un texte ne se modifie jamais</strong>. Une méthode ne transforme pas la valeur : elle en rend une nouvelle. Si tu veux la garder, il faut la ranger.</p>

<h2>Les pièges</h2>
<p><strong>Croire qu'une méthode modifie le texte.</strong> C'est le piège central, et son symptôme est trompeur : le programme tourne, et rien n'a changé.</p>
<p><strong>Oublier les parenthèses.</strong> <code>p.strip</code> sans parenthèses ne fait rien — on désigne la méthode au lieu de l'appeler. Aucune erreur n'est levée.</p>
<p><strong>Vouloir modifier un caractère.</strong> <code>p[0] = "z"</code> est refusé, et le cours l'explique : <em>« cette valeur ne se modifie pas une fois créée — c'est le cas d'un tuple et d'un texte. Pour la changer, il faut en fabriquer une nouvelle. »</em></p>
<p><strong>Confondre <code>split()</code> et <code>split(" ")</code>.</strong> Sans argument, <code>split()</code> découpe sur toutes les espaces et ignore les répétitions — bien plus robuste sur du texte réel que de préciser une seule espace.</p>

<h2>Dans la vraie vie</h2>
<p>Lire un fichier ligne par ligne, découper chaque ligne aux virgules, nettoyer chaque morceau : c'est la première moitié de la plupart des scripts Python du monde. Le traitement proprement dit vient après — et il est souvent plus court.</p>

<div class="a-retenir">
<ul>
<li>Les méthodes de texte s'appellent avec un point et des parenthèses.</li>
<li>Un texte ne se modifie jamais : il faut ranger le résultat.</li>
<li><code>split</code> transforme un texte en liste, <code>join</code> fait l'inverse.</li>
<li>Avant de comparer des saisies : <code>strip()</code> puis <code>lower()</code>.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : pourquoi les textes sont figés</summary>
<p>Un texte qui ne change jamais peut être partagé sans risque entre plusieurs endroits du programme, et servir de clé de dictionnaire — ce qu'une liste ne peut pas faire, justement parce qu'elle est modifiable. C'est le même raisonnement que pour les tuples, que tu verras au module suivant. L'immuabilité n'est pas une contrainte : c'est ce qui rend certaines garanties possibles.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'La variable <code>saisie</code> contient un email mal saisi. Nettoie-le : enlève les espaces autour et mets tout en minuscules, puis affiche le résultat.',
      codeDepart: 'saisie = "   Alex.Martin@MAIL.COM  "\n\n# nettoie puis affiche :\n',
      indices: [
        "Deux nettoyages différents à faire : les espaces autour, et la casse. Chacun a sa méthode, et le nom de chacune dit ce qu’elle fait.",
        "Une méthode de texte renvoie un <strong>nouveau</strong> texte : on peut donc en enchaîner plusieurs à la suite, chacune travaillant sur le résultat de la précédente.",
        "<code>saisie.strip().lower()</code> — d’abord les espaces, puis les minuscules."
      ],
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
      indices: [
        "Une chaîne de texte n’est pas une liste : tant qu’elle n’est pas découpée, <code>len()</code> compte ses caractères, pas ses articles.",
        "<code>split()</code> découpe un texte à chaque occurrence du séparateur qu’on lui donne, et renvoie une liste. Ici, le séparateur est la virgule.",
        "<code>articles = courses.split(\",\")</code> puis <code>print(len(articles))</code> et <code>print(articles[0])</code>"
      ],
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
      indices: [
        "Quatre gestes s’enchaînent : séparer les mots, prendre la première lettre de chacun, la mettre en majuscule, puis recoller le tout avec des points.",
        "La première lettre d’un mot, c’est <code>m[0]</code> — un texte s’indexe comme une liste. Et <code>\".\".join(liste)</code> recolle une liste en intercalant le point.",
        "Boucle sur <code>nom.split(\" \")</code>, puis <code>initiales.append(m[0].upper())</code>, et enfin <code>print(\".\".join(initiales))</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Assembler du texte et des variables avec des virgules fonctionne, mais devient vite pénible : on ne contrôle pas les espaces, on ne peut pas formater un nombre, et la ligne devient illisible dès qu'il y a trois valeurs.</p>
<p>Python offre pour cela une écriture dédiée, et c'est l'une des plus appréciées du langage : la <strong>f-string</strong>.</p>

<h2>L'écriture</h2>
<pre class="bloc-code">prenom = "Nadia"
age = 32

# l'ancienne facon
print("Je m'appelle", prenom, "et j'ai", age, "ans")

# avec une f-string
print(f"Je m'appelle {prenom} et j'ai {age} ans")</pre>
<p>Un <code>f</code> collé devant le guillemet ouvrant, et tout ce qui est entre accolades est remplacé par sa valeur. Le texte se lit comme une phrase, espaces compris.</p>
<p>Si tu connais les gabarits de chaîne de JavaScript, c'est exactement la même idée — en plus court à écrire. Les guillemets restent ceux de Python, simples ou doubles au choix : il n'y a pas de caractère spécial à aller chercher au clavier, ce qui explique en partie pourquoi l'écriture s'est imposée si vite.</p>

<h2>Le formatage, qui fait toute la différence</h2>
<pre class="bloc-code">print(f"{3.14159:.2f}")   # 3.14   deux decimales
print(f"{42:04d}")        # 0042   complete avec des zeros
print(f"{'Alex':&gt;8}|")    # "    Alex|"   aligne a droite sur 8
print(f"{2 + 3}")         # 5      un calcul, pas seulement un nom</pre>
<p>Tous mesurés. Un deux-points dans les accolades ouvre les instructions de mise en forme — c'est ce qui permet d'aligner une colonne de prix ou d'afficher une moyenne sans quinze décimales.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ce qu'on écrit</th><th>Ce qui s'affiche</th></tr>
<tr><td><code>"Bonjour {prenom}"</code> (sans le f)</td><td><strong>Bonjour {prenom}</strong> — littéralement</td></tr>
<tr><td><code>f"Bonjour {prenom}"</code></td><td>Bonjour Nadia</td></tr>
<tr><td><code>f"Total : {prix * 1.2:.2f} euros"</code></td><td>Total : 14.40 euros</td></tr>
</table>
<p>La première ligne est le piège : sans le <code>f</code>, rien n'est remplacé, et aucune erreur n'est levée.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le <code>f</code>.</strong> Si tu vois des accolades s'afficher à l'écran, c'est ça. Le symptôme est reconnaissable au premier coup d'œil.</p>
<p><strong>Mélanger les guillemets.</strong> <code>f"{d["nom"]}"</code> casse : les guillemets doubles à l'intérieur ferment la chaîne. On alterne — <code>f"{d['nom']}"</code>.</p>
<p><strong>Écrire une accolade littérale.</strong> Pour afficher une accolade, il faut la doubler : <code>f"{{ceci}}"</code> affiche <code>{ceci}</code>.</p>
<p><strong>Trop en mettre.</strong> Une f-string qui contient trois calculs devient illisible. Calcule avant, affiche après : la ligne de résultat doit se lire comme la phrase qu'elle produit.</p>

<h2>Dans la vraie vie</h2>
<p>Les f-strings sont arrivées en 2016 et ont remplacé en quelques années trois écritures plus anciennes qu'on croise encore dans du vieux code — <code>%</code>, <code>.format()</code> et la concaténation. Si tu en rencontres, sache qu'elles font la même chose en moins clair.</p>

<div class="a-retenir">
<ul>
<li>Un <code>f</code> devant le guillemet, et <code>{variable}</code> dans le texte.</li>
<li>Sans le <code>f</code>, les accolades s'affichent telles quelles, sans erreur.</li>
<li>Un deux-points ouvre le formatage : <code>:.2f</code> pour deux décimales, <code>:04d</code> pour des zéros.</li>
<li>On peut y mettre un calcul, pas seulement un nom de variable.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : afficher le nom et la valeur</summary>
<p>Un signe égal à la fin des accolades affiche les deux : <code>f"{age=}"</code> donne <code>age=32</code>. C'est une commodité pensée pour le débogage — plus besoin d'écrire <code>print("age :", age)</code> à la main, et le nom affiché reste exact même si on renomme la variable.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Réécris cette phrase avec une <strong>f-string</strong> pour afficher : <code>Nadia a 32 ans</code>.',
      codeDepart: 'prenom = "Nadia"\nage = 32\n\n# avec une f-string :\n',
      indices: [
        "Plus besoin de virgules ni de collage : on écrit la phrase telle qu’elle doit sortir, et on désigne les variables à l’intérieur.",
        "Deux choses à ne pas oublier : la lettre <code>f</code> collée juste avant le guillemet ouvrant, et les accolades autour de chaque variable.",
        "<code>print(f\"{prenom} a {age} ans\")</code>"
      ],
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
      indices: [
        "Deux difficultés en une : faire le calcul, et imposer exactement deux décimales — sinon Python affichera <code>59.97000000000001</code> ou <code>60.0</code> selon les cas.",
        "On peut calculer <strong>dans</strong> les accolades. Et après le contenu, un <code>:</code> suivi d’un format impose l’affichage : <code>.2f</code> veut dire « deux décimales ».",
        "<code>print(f\"Total : {prix * quantite:.2f} €\")</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Un motif revient sans arrêt : partir d'une liste, en construire une autre — transformée, ou filtrée. Écrit avec une boucle, cela prend quatre lignes dont trois sont de la mécanique.</p>
<pre class="bloc-code">carres = []
for n in nombres:
    carres.append(n * n)</pre>
<p>Python propose une écriture qui dit la même chose en une ligne, et qui est <em>la</em> marque du langage : la <strong>compréhension de liste</strong>.</p>

<h2>L'écriture</h2>
<pre class="bloc-code">nombres = [1, 2, 3, 4, 5]

print([x * x for x in nombres])              # [1, 4, 9, 16, 25]
print([x for x in nombres if x % 2 == 0])    # [2, 4]</pre>
<p>Mesuré. La structure se lit dans cet ordre : <strong>ce qu'on produit</strong>, puis <strong>d'où ça vient</strong>, puis éventuellement <strong>à quelle condition</strong>.</p>
<p>C'est l'inverse de l'ordre d'écriture d'une boucle, et c'est déroutant au début. Une fois l'habitude prise, on lit la ligne comme une phrase : « les carrés de chaque nombre », « les nombres pairs ».</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Morceau</th><th>Rôle</th></tr>
<tr><td><code>[</code></td><td>on fabrique une liste</td></tr>
<tr><td><code>x * x</code></td><td>ce qu'on met dedans, à chaque tour</td></tr>
<tr><td><code>for x in nombres</code></td><td>sur quoi on tourne</td></tr>
<tr><td><code>if x % 2 == 0</code></td><td>on ne garde que ceux-là</td></tr>
</table>
<p>Les deux rôles se combinent : <code>[x * x for x in nombres if x % 2 == 0]</code> transforme <em>et</em> filtre.</p>

<h2>Pas seulement pour les listes</h2>
<pre class="bloc-code">print({x: x * x for x in [1, 2, 3]})   # {1: 1, 2: 4, 3: 9}</pre>
<p>Mesuré aussi. Avec des accolades et un <code>cle: valeur</code>, on construit un dictionnaire. Même principe, même lecture.</p>

<h2>Les pièges</h2>
<p><strong>En faire trop.</strong> C'est le vrai danger de cette écriture. Deux <code>for</code> imbriqués, un <code>if</code> et un calcul dans la même ligne donnent quelque chose que personne ne relit — toi compris, dans un mois. La règle de bon sens : si la ligne ne tient pas dans la largeur de l'écran, reviens à une boucle.</p>
<p><strong>L'utiliser pour son effet de bord.</strong> <code>[print(x) for x in liste]</code> fonctionne, et construit une liste de <code>None</code> dont personne ne veut. Quand on ne garde pas le résultat, c'est une boucle qu'il faut.</p>
<p><strong>Oublier que l'ordre n'est pas celui de la boucle.</strong> L'expression vient en premier, le <code>for</code> ensuite. L'erreur de débutant est d'écrire <code>[for x in n: x * x]</code>, que Python refuse avec une erreur de syntaxe.</p>

<h2>Dans la vraie vie</h2>
<p>C'est sans doute l'écriture la plus caractéristique de Python : on la croise dans presque tous les programmes, et elle sert de marqueur — du code qui n'en contient aucune a souvent été écrit par quelqu'un qui vient d'un autre langage.</p>
<p>Son usage le plus fréquent reste le plus simple : extraire un champ d'une liste de dictionnaires, <code>[c["nom"] for c in contacts]</code>.</p>

<div class="a-retenir">
<ul>
<li><code>[expression for x in collection if condition]</code> — dans cet ordre.</li>
<li>Elle transforme, filtre, ou les deux à la fois.</li>
<li>Avec des accolades et <code>cle: valeur</code>, elle construit un dictionnaire.</li>
<li>Si la ligne devient illisible, la boucle reste le bon choix.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : la version qui ne construit rien</summary>
<p>En remplaçant les crochets par des parenthèses, on obtient une <em>expression génératrice</em> : elle produit les valeurs une par une au lieu de fabriquer la liste entière. Sur un million d'éléments dont on veut seulement la somme, <code>sum(x * x for x in n)</code> n'occupe presque aucune mémoire, là où la version à crochets construirait d'abord un million de carrés. C'est la même idée que les générateurs du dernier module.</p>
</details>
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
<h2>Pourquoi ça existe</h2>
<p>Python est livré avec une immense bibliothèque d'outils déjà écrits — des centaines de <strong>modules</strong>, pour le hasard, les mathématiques, les dates, les fichiers, le réseau. On dit souvent que Python arrive « piles incluses ».</p>
<p>Rien n'est chargé d'office : on prend ce dont on a besoin, en l'<strong>important</strong> en haut du fichier.</p>

<h2>Le hasard</h2>
<pre class="bloc-code">import random

de = random.randint(1, 6)              # un entier entre 1 et 6 INCLUS
couleur = random.choice(["rouge", "vert"])
random.shuffle(ma_liste)               # melange sur place</pre>
<p>Mesuré sur 300 lancers : le minimum obtenu est 1, le maximum 6. Note la différence avec JavaScript, où il fallait composer <code>Math.floor(Math.random() * 6) + 1</code> : ici, <strong>les deux bornes sont incluses</strong> et la fonction dit ce qu'elle fait.</p>

<h2>Les mathématiques</h2>
<pre class="bloc-code">import math

math.sqrt(16)     # 4.0   — un decimal, toujours
math.pi           # 3.141592653589793
math.floor(4.7)   # 4
math.ceil(4.2)    # 5
round(3.14159, 2) # 3.14  — celui-la est integre, sans import</pre>
<p>Tous mesurés. Attention à <code>sqrt</code> : il rend <code>4.0</code> et non <code>4</code>. Et <code>round</code> fait partie du langage — pas besoin d'importer quoi que ce soit.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Ce qu'elle permet ensuite</th></tr>
<tr><td><code>import random</code></td><td><code>random.randint(1, 6)</code> — le nom du module devant</td></tr>
<tr><td><code>from random import randint</code></td><td><code>randint(1, 6)</code> — directement</td></tr>
<tr><td><code>import random as r</code></td><td><code>r.randint(1, 6)</code> — sous un surnom</td></tr>
</table>
<p>La première forme est la plus sûre : en lisant <code>random.randint</code>, on sait d'où vient la fonction. La deuxième raccourcit, au prix de cette information.</p>

<h2>Les pièges</h2>
<p><strong>Se tromper de nom de module.</strong> <code>import maths</code> — avec un s — donne : <em>« le module « maths » est introuvable. Vérifie son orthographe — les modules les plus utilisés ici sont random, math et datetime. »</em> C'est <code>math</code>, au singulier.</p>
<p><strong>Oublier le préfixe.</strong> Après <code>import random</code>, écrire <code>randint(1, 6)</code> donne <em>« le nom « randint » est inconnu »</em>. Le module est importé, mais ses fonctions restent à l'intérieur.</p>
<p><strong>Croire que <code>randint</code> exclut la borne haute.</strong> Contrairement à <code>range</code>, qui exclut, <code>randint(1, 6)</code> <strong>inclut</strong> le 6. Deux conventions opposées dans le même langage, et c'est une source d'erreur réelle.</p>
<p><strong>Importer dans une boucle.</strong> L'import se met en haut du fichier, une fois. Le répéter ne casse rien, mais signale qu'on n'a pas compris ce qu'il fait.</p>

<h2>Dans la vraie vie</h2>
<p>La bibliothèque standard couvre les dates, les fichiers, le JSON, les expressions régulières, les archives. Et au-delà, un dépôt public de centaines de milliers de modules installables — c'est là que se trouvent les outils de calcul scientifique et d'apprentissage automatique qui ont fait la réputation de Python.</p>

<div class="a-retenir">
<ul>
<li><code>import module</code> en haut du fichier, puis <code>module.fonction()</code>.</li>
<li><code>random.randint(1, 6)</code> inclut les <strong>deux</strong> bornes — contrairement à <code>range</code>.</li>
<li><code>math.sqrt</code> rend un décimal ; <code>round</code> n'a besoin d'aucun import.</li>
<li>Un module mal orthographié est signalé clairement : vérifie le singulier.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : un hasard qui se répète</summary>
<p><code>random.seed(42)</code> fixe le point de départ du générateur : la même suite de nombres « au hasard » sortira à chaque exécution. C'est indispensable pour tester un programme qui utilise le hasard — sans cela, un bug ne se reproduit jamais deux fois. Ce hasard-là est d'ailleurs calculé, donc prévisible : pour la cryptographie, il existe un autre module, <code>secrets</code>.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Importe le module <code>random</code> et affiche un lancer de dé : un nombre entier entre 1 et 6 inclus.',
      codeDepart: '# import puis lancer :\n',
      indices: [
        "Le hasard ne fait pas partie du langage de base : il faut d’abord aller chercher l’outil, par une ligne tout en haut du fichier.",
        "Après <code>import random</code>, les fonctions s’appellent avec le nom du module devant. Celle qui tire un entier entre deux bornes les inclut toutes les deux.",
        "<code>import random</code> puis <code>print(random.randint(1, 6))</code>"
      ],
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
      indices: [
        "Même principe qu’avec <code>random</code> : un module à importer d’abord. Celui des mathématiques porte un nom évident.",
        "« Racine carrée » se dit <em>square root</em>, et « arrondi vers le haut » <em>ceiling</em>, le plafond. Les noms des fonctions viennent de là.",
        "<code>math.sqrt(144)</code> pour la racine, <code>math.ceil(4.1)</code> pour l’arrondi vers le haut."
      ],
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
      indices: [
        "C’est le compteur conditionnel déjà rencontré : une variable à 0, une boucle de 100 tours, et on augmente seulement dans certains cas.",
        "<code>random.choice(liste)</code> tire un élément au hasard. Compare son résultat à <code>\"pile\"</code> dans un <code>if</code>, à l’intérieur de la boucle.",
        "<code>for i in range(100):</code> · <code>if random.choice([\"pile\", \"face\"]) == \"pile\":</code> · <code>piles = piles + 1</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Tu sais lire et écrire une clé. Restent deux besoins constants : <strong>parcourir</strong> un dictionnaire, et <strong>ne pas planter</strong> sur une clé qui manque. Python a une réponse nette pour chacun.</p>

<h2>Les trois façons de parcourir</h2>
<pre class="bloc-code">stock = {"pommes": 12, "poires": 5}

for cle in stock:              # les cles
    print(cle)

for valeur in stock.values():  # les valeurs
    print(valeur)

for cle, valeur in stock.items():   # les deux
    print(cle, valeur)</pre>
<p>Mesuré : la troisième affiche <code>pommes 12</code> puis <code>poires 5</code>. C'est la forme la plus utile, et de loin.</p>
<p>Les deux noms entre le <code>for</code> et le <code>in</code> ne sont pas une syntaxe spéciale : <code>items()</code> rend des couples, et Python les <em>déballe</em> automatiquement en deux variables. Tu reverras ce mécanisme avec les tuples.</p>

<h2>Éviter le plantage</h2>
<table class="memo-table trace">
<tr><th>Écriture</th><th>Si la clé manque</th></tr>
<tr><td><code>stock["cerises"]</code></td><td>le programme <strong>s'arrête</strong></td></tr>
<tr><td><code>stock.get("cerises")</code></td><td><code>None</code></td></tr>
<tr><td><code>stock.get("cerises", 0)</code></td><td><code>0</code></td></tr>
<tr><td><code>"cerises" in stock</code></td><td><code>False</code></td></tr>
</table>
<p>Tous mesurés. Le second argument de <code>.get()</code> est la valeur de repli — et c'est lui qui rend l'écriture vraiment pratique.</p>

<h2>Le motif du comptage</h2>
<pre class="bloc-code">compte = {}
for mot in texte.split():
    compte[mot] = compte.get(mot, 0) + 1</pre>
<p>Trois lignes, et le motif le plus utile de toute la leçon. Il marche pour n'importe quoi : des mots, des notes, des erreurs dans un fichier journal, des votes. Dès qu'il s'agit de répondre à « combien de fois chacun ? », c'est cette ligne-là qu'on écrit.</p>
<p> <code>get(mot, 0)</code> rend zéro la première fois qu'un mot apparaît, puis la valeur accumulée. Sans lui, il faudrait tester l'existence de la clé à chaque tour.</p>

<h2>Les pièges</h2>
<p><strong>Oublier les parenthèses de <code>items()</code>.</strong> <code>stock.items</code> sans parenthèses désigne la méthode au lieu de l'appeler : la boucle part alors sur quelque chose d'inattendu.</p>
<p><strong>Modifier le dictionnaire pendant qu'on le parcourt.</strong> Ajouter ou retirer une clé en cours de boucle fait échouer Python. Il faut parcourir une copie des clés : <code>for cle in list(stock):</code>.</p>
<p><strong>Croire que <code>.get()</code> crée la clé.</strong> Il ne fait que lire : <code>stock.get("cerises", 0)</code> rend 0 sans rien ajouter au dictionnaire.</p>
<p><strong>Confondre <code>in</code> sur un dictionnaire et sur une liste.</strong> Sur un dictionnaire, <code>in</code> teste les <strong>clés</strong>, jamais les valeurs. Pour chercher une valeur, c'est <code>in stock.values()</code>.</p>

<h2>Dans la vraie vie</h2>
<p>Le motif du comptage sert partout : mots d'un texte, occurrences d'une erreur dans un fichier journal, votes par candidat. Et <code>.get()</code> avec sa valeur de repli est l'outil qui rend un programme robuste face à des données incomplètes — c'est-à-dire face à des données réelles.</p>

<div class="a-retenir">
<ul>
<li><code>.items()</code> donne les couples clé-valeur, déballés en deux variables.</li>
<li><code>.get(cle, defaut)</code> ne plante jamais et fournit un repli.</li>
<li><code>compte[x] = compte.get(x, 0) + 1</code> compte les occurrences en une ligne.</li>
<li><code>in</code> sur un dictionnaire teste les clés, pas les valeurs.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les compteurs tout faits</summary>
<p>Le module <code>collections</code> fournit <code>Counter</code>, qui fait le comptage en une seule ligne : <code>Counter(texte.split())</code>. Il sait aussi donner les plus fréquents avec <code>.most_common(3)</code>. Savoir écrire le motif à la main reste utile — c'est lui qui t'apprend ce que <code>Counter</code> fait — mais en vrai projet, on prend l'outil existant.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Parcours le stock avec <code>.items()</code> et affiche une ligne par produit, sous la forme <code>pommes : 12</code>.',
      codeDepart: 'stock = {"pommes": 12, "poires": 5, "cerises": 30}\n\n# une ligne par produit :\n',
      indices: [
        "Parcourir un dictionnaire directement ne donne que les clés. Pour obtenir la clé <strong>et</strong> sa valeur en même temps, il faut le demander.",
        "<code>.items()</code> fournit les deux à chaque tour — d’où les <strong>deux</strong> noms de variables après le <code>for</code>, séparés par une virgule.",
        "<code>for cle, valeur in stock.items():</code> puis <code>print(f\"{cle} : {valeur}\")</code>"
      ],
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
      indices: [
        "Demander une clé absente avec les crochets fait planter le programme. Il existe une façon plus douce de demander.",
        "<code>.get()</code> ne plante jamais : son second argument est la valeur à renvoyer quand la clé n’existe pas.",
        "<code>print(stock.get(\"bananes\", 0))</code>"
      ],
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
      indices: [
        "À chaque mot rencontré, il faut ajouter 1 à son compte. Le problème : la première fois, le mot n’a pas encore de compte du tout.",
        "C’est exactement ce que règle <code>.get(mot, 0)</code> : il donne 0 pour un mot jamais vu, et son compte sinon. Une seule ligne suffit dans la boucle.",
        "<code>compte[mot] = compte.get(mot, 0) + 1</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Jusqu'ici, une erreur arrêtait net ton programme. Dans une vraie application, c'est inacceptable : un utilisateur qui tape « abc » dans un champ « âge » ne doit pas faire tomber le logiciel.</p>
<p>Python propose donc de <strong>tenter</strong> une opération et de prévoir le cas où elle échoue — au lieu de vérifier à l'avance toutes les façons dont elle pourrait rater.</p>

<h2>try et except</h2>
<pre class="bloc-code">try:
    age = int(saisie)
    print("Age :", age)
except ValueError:
    print("Ce n'est pas un nombre.")</pre>
<p>Mesuré : avec <code>"abc"</code>, le programme affiche bien le message et <strong>continue</strong>. Le bloc <code>try</code> contient ce qui peut échouer ; dès qu'une erreur survient, l'exécution saute dans le <code>except</code>.</p>
<p>Le nom après <code>except</code> précise <em>quelle</em> erreur on attrape. Les plus courantes :</p>
<ul>
<li><code>ValueError</code> — la valeur ne convient pas : <code>int("abc")</code> ;</li>
<li><code>KeyError</code> — une clé absente d'un dictionnaire ;</li>
<li><code>IndexError</code> — un indice hors de la liste ;</li>
<li><code>ZeroDivisionError</code> — une division par zéro ;</li>
<li><code>TypeError</code> — des types incompatibles.</li>
</ul>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Saisie</th><th>Ce qui se passe</th></tr>
<tr><td>« 32 »</td><td><code>int</code> réussit, le <code>except</code> est ignoré</td></tr>
<tr><td>« abc »</td><td><code>int</code> échoue : saut immédiat dans le <code>except</code></td></tr>
<tr><td>après</td><td>dans les deux cas, le programme continue</td></tr>
</table>
<p>Un point important : la ligne qui suit <code>int(saisie)</code> dans le <code>try</code> n'est <em>pas</em> exécutée en cas d'échec. Tout ce qui dépend du résultat doit rester à l'intérieur.</p>

<h2>Les deux compléments</h2>
<p><code>else</code> s'exécute si rien n'a échoué ; <code>finally</code> s'exécute dans tous les cas — c'est là qu'on ferme un fichier, par exemple.</p>

<h2>Les pièges</h2>
<p><strong>Attraper tout avec un <code>except:</code> nu.</strong> Il capture absolument tout, y compris les fautes de frappe dans ton propre code — qui deviennent alors invisibles. On nomme toujours l'erreur attendue.</p>
<p><strong>Un <code>except</code> qui ne dit rien.</strong> <code>except ValueError: pass</code> fait disparaître le problème de l'écran, pas du programme. Affiche au moins quelque chose.</p>
<p><strong>Entourer tout le programme.</strong> On ne sait plus alors ce qui a échoué ni où. Le <code>try</code> entoure l'opération risquée, pas le reste.</p>
<p><strong>S'en servir au lieu de tester.</strong> Vérifier qu'une liste n'est pas vide avec un <code>if</code> est plus clair que d'attraper une <code>IndexError</code>. Le <code>try</code> sert pour ce qu'on ne peut pas vérifier à l'avance — une saisie, un fichier, un réseau.</p>

<h2>Dans la vraie vie</h2>
<p>Toute lecture de fichier, tout appel réseau, toute conversion de saisie en est entourée. La culture Python a même un dicton pour cela : « il est plus facile de demander pardon que la permission » — on tente, et on gère l'échec, plutôt que de vérifier toutes les conditions au préalable.</p>

<div class="a-retenir">
<ul>
<li><code>try</code> contient ce qui peut échouer, <code>except</code> ce qu'on fait alors.</li>
<li>On nomme l'erreur attendue : jamais d'<code>except:</code> nu.</li>
<li>Après l'erreur, la suite du <code>try</code> n'est pas exécutée.</li>
<li><code>finally</code> s'exécute dans tous les cas, succès ou échec.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : lever sa propre erreur</summary>
<p><code>raise ValueError("l'âge doit être positif")</code> interrompt volontairement l'exécution avec un message à toi. C'est utile dans une fonction qui reçoit quelque chose d'impossible : mieux vaut s'arrêter net, avec une explication claire, que continuer sur des valeurs fausses et produire un résultat absurde bien plus loin.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Ce code plante. Entoure-le d\'un <code>try</code> / <code>except ValueError</code> pour qu\'il affiche <code>Ce n\'est pas un nombre</code> au lieu de s\'arrêter.',
      codeDepart: 'saisie = "abc"\n\nnombre = int(saisie)\nprint(nombre)\n',
      indices: [
        "On ne corrige pas le code fautif : on l’<strong>entoure</strong>. Le principe est de dire « essaie ceci ; si ça rate, fais cela ».",
        "Les lignes à surveiller passent sous <code>try:</code>, décalées. Puis <code>except ValueError:</code>, au même niveau que <code>try</code>, avec le message dessous.",
        "<code>try:</code> · les deux lignes décalées · <code>except ValueError:</code> · <code>print(\"Ce n’est pas un nombre\")</code>"
      ],
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
      indices: [
        "Même structure qu’à l’exercice précédent. Seul le nom de l’erreur change — et Python te le donne lui-même si tu lances le code sans protection.",
        "Ce nom est très littéral : division, zéro, erreur. En un seul mot, sans espace, chaque partie avec sa majuscule.",
        "<code>except ZeroDivisionError:</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Tu as manipulé des textes, des nombres, des listes, des dictionnaires. Tous ces types étaient fournis. Et si tu créais le tien ?</p>
<p>Un dictionnaire décrit bien un chien — <code>{"nom": "Rex", "age": 3}</code> — mais il ne sait pas <em>aboyer</em>. Une <strong>classe</strong> réunit les deux : les données et ce qu'on peut en faire.</p>

<h2>Le moule</h2>
<pre class="bloc-code">class Chien:
    def __init__(self, nom, age):
        self.nom = nom
        self.age = age

    def crier(self):
        return self.nom + " dit Ouaf !"

rex = Chien("Rex", 3)
print(rex.crier())     # Rex dit Ouaf !</pre>
<p>Mesuré. Trois éléments nouveaux :</p>
<ul>
<li><code>class</code> déclare le moule — son nom prend une majuscule, par convention ;</li>
<li><code>__init__</code> est appelé automatiquement à la création, pour remplir l'objet ;</li>
<li><code>self</code> désigne l'objet en cours, et c'est <strong>toujours le premier paramètre</strong> d'une méthode.</li>
</ul>
<p>Noter aussi ce qui <em>manque</em> par rapport à JavaScript : pas de <code>new</code>. On appelle la classe comme une fonction.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Ligne</th><th>Ce qui se passe</th></tr>
<tr><td><code>class Chien:</code></td><td>Le moule est rangé. Aucun chien n'existe.</td></tr>
<tr><td><code>Chien("Rex", 3)</code></td><td>Un objet vide est créé, puis <code>__init__</code> le remplit.</td></tr>
<tr><td><code>self.nom = nom</code></td><td><code>self</code> est ce nouvel objet : il reçoit son attribut.</td></tr>
<tr><td><code>rex.crier()</code></td><td>La méthode s'exécute avec <code>self</code> valant <code>rex</code>.</td></tr>
</table>
<p>Ce dernier point explique pourquoi <code>self</code> ne s'écrit jamais à l'appel : Python le passe tout seul. On écrit <code>rex.crier()</code>, et la méthode reçoit <code>rex</code> en premier argument.</p>

<h2>Les pièges</h2>
<p><strong>Oublier <code>self</code> dans la déclaration.</strong> C'est l'erreur numéro un, et le cours la nomme désormais précisément : <em>« le nombre d'arguments ne correspond pas à ce que la fonction attend. Dans une classe, la cause la plus fréquente est un « self » oublié en premier paramètre de la méthode. »</em></p>
<p><strong>Oublier <code>self</code> devant un attribut.</strong> Écrire <code>return nom + " dit Ouaf"</code> cherche une variable <code>nom</code> qui n'existe pas : <em>« le nom « nom » est inconnu »</em>. Les attributs s'atteignent toujours par <code>self</code>.</p>
<p><strong>Écrire <code>new</code>.</strong> Il n'existe pas en Python. <code>Chien("Rex", 3)</code> suffit.</p>
<p><strong>Confondre attribut et variable locale.</strong> <code>self.total</code> appartient à l'objet et survit entre les appels ; <code>total</code> seul naît et meurt dans la méthode.</p>

<h2>Dans la vraie vie</h2>
<p>Les classes servent dès qu'un programme manipule beaucoup de choses semblables, avec un comportement propre. Elles ne sont pas obligatoires — une bonne partie du Python écrit chaque jour n'en contient aucune — mais tu en liras partout, et c'est la forme que prennent la plupart des bibliothèques.</p>

<div class="a-retenir">
<ul>
<li>Une classe réunit des données et ce qu'on peut en faire.</li>
<li><code>__init__</code> remplit l'objet au moment de sa création.</li>
<li><code>self</code> est toujours le premier paramètre d'une méthode, et ne s'écrit jamais à l'appel.</li>
<li>Pas de <code>new</code> en Python : on appelle la classe directement.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : afficher un objet proprement</summary>
<p><code>print(rex)</code> affiche par défaut quelque chose d'illisible, du genre <code>&lt;Chien object&gt;</code>. En ajoutant une méthode <code>__str__(self)</code> qui rend un texte, <code>print</code> l'utilise automatiquement. C'est la première d'une famille de méthodes spéciales — toutes encadrées de doubles tirets bas — qui permettent à tes objets de se comporter comme les types natifs du langage.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Crée une classe <code>Chien</code> avec un <code>__init__</code> qui range le <code>nom</code>, puis fabrique un chien nommé <code>Rex</code> et affiche son nom.',
      codeDepart: '# class, puis création, puis affichage :\n',
      indices: [
        "Une classe est un moule ; l’objet est ce qu’on en tire. <code>__init__</code> est la méthode que Python appelle tout seul au moment de la fabrication.",
        "<code>self</code> désigne l’objet en train d’être fabriqué : <code>self.nom = nom</code> range le paramètre <em>dans</em> l’objet, pour qu’il y reste après.",
        "<code>class Chien:</code> · <code>def __init__(self, nom):</code> · <code>self.nom = nom</code> · puis <code>rex = Chien(\"Rex\")</code> et <code>print(rex.nom)</code>"
      ],
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
      indices: [
        "Une méthode s’écrit comme une fonction, mais à l’intérieur de la classe — donc décalée d’un cran — et elle reçoit toujours l’objet en premier paramètre.",
        "Ce premier paramètre s’appelle <code>self</code> par convention, et c’est par lui qu’on atteint le nom : <code>self.nom</code>. La méthode doit <strong>renvoyer</strong> le texte, pas l’afficher.",
        "<code>def aboyer(self):</code> puis <code>return f\"{self.nom} dit Ouaf !\"</code>"
      ],
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
      indices: [
        "Une méthode peut aussi <strong>modifier</strong> l’objet, pas seulement lire dedans. Ici, <code>deposer</code> doit changer le solde pour de bon.",
        "Modifier un attribut, c’est lui réaffecter une valeur : <code>self.solde = …</code>. Sans le <code>self.</code>, tu créerais une variable locale qui disparaîtrait à la fin de la méthode.",
        "<code>self.solde = self.solde + montant</code>, puis <code>c = Compte(100)</code> · <code>c.deposer(50)</code> · <code>print(c.solde)</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Assemblons tout : listes, dictionnaires, boucles, fonctions et f-strings, dans un programme qui ressemble à ce qu'on écrit vraiment. Un carnet de contacts n'a rien de spectaculaire — et c'est exactement la forme que prennent la plupart des données réelles.</p>

<h2>La structure qui compte</h2>
<pre class="bloc-code">carnet = [
    {"nom": "Nadia", "ville": "Lyon", "tel": "06..."},
    {"nom": "Alex",  "ville": "Paris", "tel": "07..."}
]</pre>
<p>Une <strong>liste de dictionnaires</strong>. Retiens cette forme : c'est <em>la</em> structure de données la plus courante de Python, et celle sous laquelle arrivent presque toujours les données d'un fichier, d'une base ou d'un service distant.</p>
<p>Chaque élément est une fiche ; toutes les fiches ont les mêmes clés. La liste donne l'ordre, le dictionnaire donne les étiquettes.</p>

<h2>Les quatre opérations</h2>
<pre class="bloc-code">def ajouter(carnet, nom, ville):
    carnet.append({"nom": nom, "ville": ville})

def chercher(carnet, nom):
    for c in carnet:
        if c["nom"] == nom:
            return c
    return None

def afficher(carnet):
    for c in carnet:
        print(f"{c['nom']} - {c['ville']}")</pre>
<p>Remarque les guillemets simples à l'intérieur de la f-string : les doubles fermeraient la chaîne. Et le <code>return None</code> final de <code>chercher</code> n'est pas décoratif — il dit explicitement « rien trouvé », ce que l'appelant doit tester.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Étape</th><th>Ce qui se passe</th></tr>
<tr><td><code>chercher(carnet, "Nadia")</code></td><td>la boucle parcourt les fiches</td></tr>
<tr><td>la condition est vraie</td><td><code>return</code> <strong>sort immédiatement</strong> de la fonction</td></tr>
<tr><td>aucune ne correspond</td><td>la boucle finit, et <code>return None</code> s'exécute</td></tr>
<tr><td>côté appelant</td><td><code>if resultat:</code> distingue les deux cas</td></tr>
</table>
<p>Le <code>return</code> à l'intérieur de la boucle est la bonne façon de faire : inutile de continuer à chercher une fois trouvé.</p>

<h2>Les pièges</h2>
<p><strong>Oublier le cas « non trouvé ».</strong> Sans <code>return None</code> explicite, la fonction rend quand même <code>None</code> — mais rien ne le dit au lecteur, et l'appelant risque d'oublier de le tester. Ce qui donne alors <em>« tu mélanges deux types incompatibles »</em> quelques lignes plus loin.</p>
<p><strong>Comparer sans normaliser.</strong> « nadia » ne vaut pas « Nadia ». Avant de comparer des noms saisis, <code>.strip().lower()</code> des deux côtés.</p>
<p><strong>Modifier la liste pendant qu'on la parcourt.</strong> Pour supprimer un contact, on construit une nouvelle liste — une compréhension avec un <code>if</code> fait cela en une ligne.</p>
<p><strong>Mélanger les guillemets dans une f-string.</strong> <code>f"{c["nom"]}"</code> casse ; <code>f"{c['nom']}"</code> fonctionne.</p>

<h2>Dans la vraie vie</h2>
<p>Change « contacts » en produits, en commandes ou en mesures, et tu as la structure de la quasi-totalité des petits programmes Python. C'est aussi exactement la forme que prend du JSON une fois chargé — ce qui fait de cette leçon la marche avant la manipulation de données réelles.</p>

<div class="a-retenir">
<ul>
<li>Une <strong>liste de dictionnaires</strong> est la structure la plus courante de Python.</li>
<li>Une fonction de recherche rend l'élément trouvé, ou <code>None</code> — et l'appelant teste.</li>
<li><code>return</code> sort immédiatement de la fonction, boucle comprise.</li>
<li>Dans une f-string, alterne les guillemets : doubles dehors, simples dedans.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : chercher en une ligne</summary>
<p><code>next((c for c in carnet if c["nom"] == nom), None)</code> fait la même chose que la fonction <code>chercher</code> : il parcourt, s'arrête au premier qui correspond, et rend <code>None</code> si aucun ne convient. C'est l'équivalent du <code>find</code> de JavaScript. Écrire la boucle d'abord reste la bonne façon d'apprendre — on comprend ensuite ce que la ligne courte remplace.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: 'Affiche une ligne par contact, sous la forme <code>Nadia (Lyon)</code>.',
      codeDepart: 'carnet = [\n    {"nom": "Nadia", "ville": "Lyon", "age": 32},\n    {"nom": "Karim", "ville": "Lille", "age": 45},\n    {"nom": "Sophie", "ville": "Lyon", "age": 28}\n]\n\n# une ligne par contact :\n',
      indices: [
        "Le carnet est une <strong>liste de dictionnaires</strong> : la boucle te donne un dictionnaire à chaque tour, et c’est dedans qu’il faut aller chercher.",
        "Dans une f-string, les guillemets de la clé doivent être différents de ceux qui entourent la chaîne — sinon Python croit que le texte s’arrête là.",
        "<code>for c in carnet:</code> puis <code>print(f\"{c['nom']} ({c['ville']})\")</code> — apostrophes dedans, guillemets dehors."
      ],
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
      indices: [
        "La fonction ne doit rien afficher : elle <strong>renvoie</strong> une liste, qu’on comptera ensuite avec <code>len()</code>.",
        "Filtrer une liste, c’est une compréhension avec un <code>if</code> à la fin : on garde chaque contact dont la ville correspond au paramètre reçu.",
        "<code>return [c for c in carnet if c[\"ville\"] == ville]</code>, puis <code>print(len(chercher_par_ville(carnet, \"Lyon\")))</code>"
      ],
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
      indices: [
        "Trois choses à enchaîner : totaliser les âges, diviser par le nombre de contacts, et imposer une seule décimale à l’affichage.",
        "Le total se fait avec un accumulateur, ou d’un coup avec <code>sum([…])</code>. Pour l’affichage, c’est le format <code>:.1f</code> dans la f-string.",
        "<code>moyenne = total / len(carnet)</code> puis <code>print(f\"Âge moyen : {moyenne:.1f}\")</code>"
      ],
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
<h2>Pourquoi ça existe</h2>
<p>Dernier projet du module : analyser un texte, comme le font les outils de statistiques éditoriales. Tout ce dont tu as besoin est déjà dans ta boîte à outils — c'est justement l'intérêt de l'exercice.</p>
<p>Et le cœur du programme tient en trois lignes, que tu as vues à la leçon sur les dictionnaires avancés.</p>

<h2>Le motif du comptage</h2>
<pre class="bloc-code">texte = "le chat dort le chien court le chat mange"

mots = texte.split()
compte = {}
for mot in mots:
    compte[mot] = compte.get(mot, 0) + 1

print(compte)</pre>
<p>Trois outils enchaînés : <code>split</code> transforme le texte en liste, le dictionnaire accumule, et <code>get(mot, 0)</code> gère le premier passage de chaque mot. Sans ce dernier, il faudrait tester l'existence de la clé à chaque tour.</p>

<h2>Pas à pas</h2>
<table class="memo-table trace">
<tr><th>Mot lu</th><th><code>compte.get(mot, 0)</code></th><th>Nouvelle valeur</th></tr>
<tr><td>le</td><td>0 — jamais vu</td><td>1</td></tr>
<tr><td>chat</td><td>0</td><td>1</td></tr>
<tr><td>dort</td><td>0</td><td>1</td></tr>
<tr><td>le</td><td><strong>1</strong> — déjà compté</td><td>2</td></tr>
</table>
<p>Le dictionnaire se remplit au fil de la lecture, sans qu'on ait eu à connaître les mots à l'avance.</p>

<h2>Trier le résultat</h2>
<pre class="bloc-code">classement = sorted(compte.items(), key=lambda c: c[1], reverse=True)
print(classement[:3])</pre>
<p><code>items()</code> donne des couples, <code>key</code> dit sur quoi trier — ici le second élément de chaque couple, c'est-à-dire le nombre — et <code>reverse=True</code> met le plus grand d'abord. Le découpage <code>[:3]</code> garde les trois premiers.</p>
<p>La <code>lambda</code> est une fonction écrite en une expression. Tu la verras en détail au module suivant ; retiens pour l'instant qu'elle répond à la question « trier selon quoi ? ».</p>

<h2>Les autres mesures</h2>
<p><code>len(mots)</code> donne le nombre de mots, <code>len(set(mots))</code> le nombre de mots <em>différents</em>, et <code>sum(len(m) for m in mots) / len(mots)</code> la longueur moyenne. Un <code>set</code> est une collection sans doublons — autre chose que tu verras bientôt.</p>

<h2>Les pièges</h2>
<p><strong>Oublier de normaliser.</strong> « Le » et « le » comptent séparément. Un <code>.lower()</code> sur le texte avant le <code>split</code> règle la question.</p>
<p><strong>Laisser la ponctuation.</strong> « chat. » et « chat » sont deux mots différents. Il faut la retirer avant de découper — <code>replace</code> pour les cas simples.</p>
<p><strong>Utiliser <code>split(" ")</code> au lieu de <code>split()</code>.</strong> Sans argument, la méthode gère les espaces multiples et les retours à la ligne. Avec une espace explicite, deux espaces consécutives produisent un mot vide.</p>
<p><strong>Diviser par zéro sur un texte vide.</strong> La longueur moyenne plante si <code>mots</code> est vide. Teste <code>if mots:</code> avant.</p>

<h2>Dans la vraie vie</h2>
<p>Ce programme est l'ancêtre direct de tout le traitement automatique du langage : compter les mots, les normaliser, les classer. Les outils modernes font infiniment plus — mais leur première étape reste un <code>split</code> et un dictionnaire de comptage.</p>

<div class="a-retenir">
<ul>
<li><code>compte[x] = compte.get(x, 0) + 1</code> compte les occurrences de n'importe quoi.</li>
<li><code>sorted(..., key=..., reverse=True)</code> classe le résultat.</li>
<li>Normalise avant de compter : <code>.lower()</code> et la ponctuation retirée.</li>
<li><code>split()</code> sans argument gère les espaces multiples.</li>
</ul>
</div>

<details class="plus-loin">
<summary>Aller plus loin : les mots qui ne comptent pas</summary>
<p>Dans un vrai analyseur, les mots les plus fréquents sont toujours les mêmes — « le », « de », « et » — et n'apprennent rien sur le texte. On les écarte avec une liste de <em>mots vides</em>, propre à chaque langue. C'est la deuxième étape de tout traitement de texte, juste après le découpage, et elle change complètement la lecture du classement.</p>
</details>
`,
  exercices: [
    {
      type: 'py',
      consigne: '<strong>Étape 1 :</strong> découpe le texte en mots et affiche <strong>le nombre total de mots</strong>.',
      codeDepart: 'texte = "le chat dort le chien court le chat mange"\n\n# nombre de mots :\n',
      indices: [
        "Le texte est une seule chaîne : tant qu’elle n’est pas découpée, il n’y a pas de mots à compter.",
        "<code>split(\" \")</code> découpe à chaque espace et renvoie la liste des mots. <code>len()</code> compte ensuite les éléments de cette liste.",
        "<code>mots = texte.split(\" \")</code> puis <code>print(len(mots))</code>"
      ],
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
      indices: [
        "C’est exactement le compteur de mots de la leçon sur les dictionnaires : le même motif, appliqué au texte découpé.",
        "Un dictionnaire vide au départ, puis dans la boucle on ajoute 1 au compte du mot courant — en donnant 0 par défaut pour un mot jamais vu.",
        "<code>compte[mot] = compte.get(mot, 0) + 1</code> puis <code>print(compte[\"le\"])</code>"
      ],
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
      indices: [
        "Même principe que « la meilleure note » : on garde le champion en cours, et on le remplace dès qu’on trouve mieux. Mais ici il faut en retenir <strong>deux</strong>.",
        "Deux variables avant la boucle : le mot champion, et son compte. Dans le <code>if</code>, les deux se mettent à jour ensemble — sinon elles se désaccordent.",
        "<code>for mot, n in compte.items():</code> · <code>if n &gt; meilleur_compte:</code> · puis <code>meilleur_mot = mot</code> et <code>meilleur_compte = n</code>"
      ],
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
