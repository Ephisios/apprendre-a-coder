/* =========================================================================
   editeur.js — l'éditeur de code de l'app, pensé pour apprendre
   =========================================================================

   Brique autonome. Aucune dépendance, aucun réglage à faire ailleurs.
   Une seule porte d'entrée :

       attacherEditeur(zoneDeTexte, langage)

   ...où langage vaut 'html', 'css', 'js', 'py', 'sql', 'c' ou 'java'.
   Pour la débrancher, il suffit de ne plus appeler cette fonction : la zone
   de texte redevient une zone de texte ordinaire, rien d'autre ne casse.

   COMMENT ÇA MARCHE
   -----------------
   Un navigateur ne sait pas colorier l'intérieur d'un <textarea>. L'astuce
   classique : on superpose exactement deux couches.

       - dessous : un <pre> qui contient le MÊME texte, mais colorié ;
       - dessus  : le vrai <textarea>, dont le texte est rendu transparent
                   (seul le curseur reste visible).

   Tu écris donc dans le textarea — avec le copier-coller, la sélection, la
   correction et le clavier du système, tout ce qu'un éditeur maison ferait
   mal — et tu lis les couleurs de la couche du dessous. Les deux couches
   doivent avoir EXACTEMENT la même typographie, la même largeur et le même
   retour à la ligne, sinon les lettres se décalent.

   POURQUOI CES COULEURS-LÀ
   ------------------------
   Elles ne sont pas décoratives : elles nomment la structure. En HTML, le
   nom de balise, l'attribut et sa valeur ont trois couleurs différentes,
   parce que c'est ce qu'un débutant confond. Et ce qui est cassé — une
   chaîne jamais refermée, un commentaire ouvert et laissé ouvert — passe en
   rouge, avant même d'avoir exécuté quoi que ce soit.
   ========================================================================= */

(function () {
  'use strict';

  function echapper(t) {
    return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* -----------------------------------------------------------------------
     La ligne en cours d'écriture ne se fait jamais gronder

     Pour écrire "bonjour", il faut bien passer par "bonjour sans guillemet
     fermant. Signaler l'erreur à ce moment-là, c'est reprocher à quelqu'un
     une faute qu'il est en train de ne pas faire — et pour un débutant, du
     rouge veut dire « tu t'es trompé ».
     On se tait donc sur la ligne où se trouve le curseur, et on ne parle que
     de ce qui est déjà écrit ailleurs.
     ----------------------------------------------------------------------- */
  let zoneSilencieuse = null;   // { debut, fin } : la ligne où est le curseur
  let curseurActuel = null;     // son indice exact dans le texte

  /* Et il existe un second silence, celui-là voulu par l'exercice : dans une
     CHASSE AU BUG, trouver l'erreur EST le travail. La souligner en rouge
     donnerait la réponse avant même la première lecture. L'éditeur se tait
     alors sur toutes les fautes, pas seulement sur la ligne du curseur. */
  let sansFautes = false;

  function enCoursDEcriture(position, finDuMorceau) {
    if (zoneSilencieuse === null) return false;
    // Le morceau fautif commence sur la ligne où l'on écrit.
    if (position >= zoneSilencieuse.debut && position <= zoneSilencieuse.fin) return true;
    // Ou bien le curseur est DEDANS : une balise qu'on étale sur plusieurs
    // lignes n'est pas encore refermée, c'est normal, on la laisse tranquille.
    return typeof finDuMorceau === 'number' && curseurActuel !== null &&
      curseurActuel >= position && curseurActuel <= finDuMorceau;
  }

  function peindre(texte, classe, position, finDuMorceau) {
    if (!texte) return '';
    if (classe === 'j-err' && (sansFautes || enCoursDEcriture(position || 0, finDuMorceau))) classe = null;
    return classe ? '<span class="' + classe + '">' + echapper(texte) + '</span>' : echapper(texte);
  }

  /* -----------------------------------------------------------------------
     Le moteur de règles

     Chaque langage se décrit par une liste de règles [{re, cls}], essayées
     dans l'ordre à la position courante. La première qui accroche gagne.
     Aucun caractère n'est jamais perdu : ce qui n'accroche rien est recopié
     tel quel. C'est ce qui garantit que le texte colorié fait exactement la
     même longueur que le texte tapé — donc que les deux couches restent
     superposées.

     Le décalage dit OÙ l'on se trouve dans le texte complet, même quand on
     colorie un morceau détaché (le contenu d'une balise, la valeur d'une
     propriété CSS) — sans lui, impossible de savoir si c'est la ligne en
     cours d'écriture.
     ----------------------------------------------------------------------- */
  function appliquer(code, regles, decalage) {
    decalage = decalage || 0;
    let sortie = '';
    let i = 0;
    const n = code.length;
    while (i < n) {
      let trouve = null;
      for (const r of regles) {
        r.re.lastIndex = i;
        const m = r.re.exec(code);
        if (m && m.index === i && m[0].length > 0) { trouve = { texte: m[0], cls: r.cls }; break; }
      }
      if (trouve) { sortie += peindre(trouve.texte, trouve.cls, decalage + i); i += trouve.texte.length; }
      else { sortie += echapper(code[i]); i++; }
    }
    return sortie;
  }

  // Une chaîne bien fermée est verte ; la même sans son guillemet final est
  // rouge. C'est l'erreur la plus fréquente et la plus difficile à voir.
  function chaine(ouvrant) {
    const o = ouvrant.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return [
      { re: new RegExp(o + '(?:\\\\.|[^\\\\' + o + '\\n])*' + o, 'y'), cls: 'j-txt' },
      { re: new RegExp(o + '(?:\\\\.|[^\\\\' + o + '\\n])*', 'y'), cls: 'j-err' }
    ];
  }

  const COMMENTAIRES_C = [
    { re: /\/\/[^\n]*/y, cls: 'j-com' },
    { re: /\/\*[\s\S]*?\*\//y, cls: 'j-com' },
    { re: /\/\*[\s\S]*/y, cls: 'j-err' }   // ouvert et jamais refermé
  ];

  const NOMBRE = { re: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/y, cls: 'j-num' };
  const APPEL = { re: /\b[A-Za-z_$][\w$]*(?=\s*\()/y, cls: 'j-fn' };
  const PONCT = { re: /[{}()[\];,.:=+\-*/%<>!&|?~^]+/y, cls: 'j-op' };

  function motsCles(liste, classe) {
    return { re: new RegExp('\\b(?:' + liste.join('|') + ')\\b', 'y'), cls: classe || 'j-mot' };
  }

  /* ---------------------------- JavaScript ---------------------------- */
  const REGLES_JS = [].concat(
    COMMENTAIRES_C,
    chaine('"'), chaine("'"),
    [{ re: /`(?:\\.|[^\\`])*`/y, cls: 'j-txt' }],
    [motsCles(['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
      'break', 'continue', 'switch', 'case', 'default', 'new', 'delete', 'typeof', 'instanceof',
      'this', 'class', 'extends', 'super', 'try', 'catch', 'finally', 'throw', 'of', 'in',
      'async', 'await', 'yield', 'import', 'export', 'from'])],
    [motsCles(['true', 'false', 'null', 'undefined', 'NaN', 'Infinity'], 'j-val')],
    [NOMBRE, APPEL, PONCT]
  );

  /* ------------------------------ Python ------------------------------ */
  const REGLES_PY = [].concat(
    [{ re: /#[^\n]*/y, cls: 'j-com' }],
    [{ re: /[fFrRbB]?"""[\s\S]*?"""/y, cls: 'j-txt' },
     { re: /[fFrRbB]?'''[\s\S]*?'''/y, cls: 'j-txt' }],
    [{ re: /[fFrRbB]?"(?:\\.|[^\\"\n])*"/y, cls: 'j-txt' },
     { re: /[fFrRbB]?'(?:\\.|[^\\'\n])*'/y, cls: 'j-txt' },
     { re: /[fFrRbB]?["'][^\n]*/y, cls: 'j-err' }],
    [motsCles(['def', 'return', 'if', 'elif', 'else', 'for', 'while', 'in', 'not', 'and', 'or',
      'import', 'from', 'as', 'class', 'try', 'except', 'finally', 'raise', 'with', 'lambda',
      'pass', 'break', 'continue', 'global', 'yield', 'assert', 'del', 'is'])],
    [motsCles(['True', 'False', 'None'], 'j-val')],
    [motsCles(['print', 'len', 'range', 'int', 'float', 'str', 'list', 'dict', 'set', 'tuple',
      'input', 'sum', 'min', 'max', 'abs', 'round', 'sorted', 'enumerate', 'zip', 'type',
      'open', 'map', 'filter', 'bool', 'self'], 'j-fn')],
    [NOMBRE, PONCT]
  );

  /* ------------------------------ C / Java ------------------------------ */
  const COMMUNS_CJ = [
    { re: /#[a-z]+[^\n]*/y, cls: 'j-com' },        // #include, #define
    { re: /'(?:\\.|[^\\'\n])'/y, cls: 'j-txt' }    // un caractère
  ];
  const REGLES_C = [].concat(
    COMMENTAIRES_C, COMMUNS_CJ, chaine('"'),
    [motsCles(['int', 'float', 'double', 'char', 'void', 'long', 'short', 'unsigned', 'signed',
      'struct', 'const', 'static', 'sizeof', 'typedef', 'enum', 'union'], 'j-type')],
    [motsCles(['if', 'else', 'for', 'while', 'do', 'return', 'break', 'continue', 'switch',
      'case', 'default', 'goto'])],
    [motsCles(['NULL'], 'j-val')],
    [NOMBRE, APPEL, PONCT]
  );
  const REGLES_JAVA = [].concat(
    COMMENTAIRES_C, COMMUNS_CJ, chaine('"'),
    [motsCles(['int', 'double', 'float', 'char', 'boolean', 'void', 'long', 'short', 'byte',
      'String', 'var'], 'j-type')],
    [motsCles(['public', 'private', 'protected', 'static', 'final', 'abstract', 'class',
      'interface', 'extends', 'implements', 'new', 'this', 'super', 'return', 'if', 'else',
      'for', 'while', 'do', 'break', 'continue', 'switch', 'case', 'default', 'try', 'catch',
      'finally', 'throw', 'throws', 'import', 'package', 'instanceof'])],
    [motsCles(['true', 'false', 'null'], 'j-val')],
    [NOMBRE, APPEL, PONCT]
  );

  /* -------------------------------- SQL -------------------------------- */
  const CLES_SQL = ['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT',
    'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER',
    'JOIN', 'INNER', 'LEFT', 'RIGHT', 'OUTER', 'ON', 'AS', 'AND', 'OR', 'NOT', 'IN', 'IS',
    'NULL', 'LIKE', 'BETWEEN', 'DISTINCT', 'ASC', 'DESC', 'UNION', 'ALL', 'CASE', 'WHEN',
    'THEN', 'ELSE', 'END', 'EXISTS', 'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'INDEX'];
  const REGLES_SQL = [].concat(
    [{ re: /--[^\n]*/y, cls: 'j-com' }],
    [{ re: /\/\*[\s\S]*?\*\//y, cls: 'j-com' }],
    chaine("'"),
    [{ re: new RegExp('\\b(?:' + CLES_SQL.join('|') + ')\\b', 'iy'), cls: 'j-mot' }],
    [{ re: /\b(?:COUNT|SUM|AVG|MIN|MAX|ROUND|UPPER|LOWER|LENGTH|SUBSTR|COALESCE)\b(?=\s*\()/iy, cls: 'j-fn' }],
    [NOMBRE, PONCT]
  );

  /* -------------------------------- CSS --------------------------------
     Le CSS a deux mondes : DEHORS des accolades, on nomme des éléments (le
     sélecteur) ; DEDANS, on donne des réglages (propriété : valeur). Ce sont
     deux choses très différentes, elles n'ont pas la même couleur.
     --------------------------------------------------------------------- */
  const REGLES_VALEUR = [].concat(
    chaine('"'), chaine("'"),
    [{ re: /#[0-9a-fA-F]{3,8}\b/y, cls: 'j-num' },
     { re: /-?\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw|s|ms|deg|fr|ch|pt|vmin|vmax)?/y, cls: 'j-num' },
     { re: /!important\b/y, cls: 'j-mot' },
     { re: /[a-zA-Z-]+(?=\s*\()/y, cls: 'j-fn' },
     { re: /[(),/]+/y, cls: 'j-op' }]
  );

  function colorierCSS(code, decalage) {
    decalage = decalage || 0;
    let sortie = '';
    let i = 0;
    let dedans = false;                     // sommes-nous entre { } ?
    const n = code.length;

    while (i < n) {
      // Un commentaire coupe tout, où qu'il soit.
      if (code.startsWith('/*', i)) {
        const fin = code.indexOf('*/', i + 2);
        const bloc = fin === -1 ? code.slice(i) : code.slice(i, fin + 2);
        sortie += peindre(bloc, fin === -1 ? 'j-err' : 'j-com', decalage + i);
        i += bloc.length;
        continue;
      }

      if (!dedans) {
        // On lit un sélecteur (ou une règle @) jusqu'à l'accolade ouvrante.
        let j = i;
        while (j < n && code[j] !== '{' && code[j] !== '}' && !code.startsWith('/*', j)) j++;
        const brut = code.slice(i, j);
        if (brut.trim()) {
          const avant = brut.match(/^\s*/)[0];
          const apres = brut.match(/\s*$/)[0];
          const noyau = brut.slice(avant.length, brut.length - apres.length);
          sortie += echapper(avant) +
            peindre(noyau, noyau.charAt(0) === '@' ? 'j-mot' : 'j-sel', decalage + i + avant.length) +
            echapper(apres);
        } else {
          sortie += echapper(brut);
        }
        i = j;
        if (i < n && (code[i] === '{' || code[i] === '}')) {
          dedans = code[i] === '{';
          sortie += peindre(code[i], 'j-op', decalage + i);
          i++;
        }
        continue;
      }

      // Dedans : propriété, puis valeur.
      if (code[i] === '}') { dedans = false; sortie += peindre('}', 'j-op', decalage + i); i++; continue; }
      if (/\s/.test(code[i])) { sortie += echapper(code[i]); i++; continue; }

      let j = i;
      while (j < n && code[j] !== ':' && code[j] !== '}' && code[j] !== ';' && !code.startsWith('/*', j)) j++;
      if (j < n && code[j] === ':') {
        sortie += peindre(code.slice(i, j), 'j-prop', decalage + i) + peindre(':', 'j-op', decalage + j);
        i = j + 1;
        let k = i;
        while (k < n && code[k] !== ';' && code[k] !== '}' && !code.startsWith('/*', k)) k++;
        sortie += appliquer(code.slice(i, k), REGLES_VALEUR, decalage + i);
        i = k;
        if (i < n && code[i] === ';') { sortie += peindre(';', 'j-op', decalage + i); i++; }
      } else {
        // Une propriété sans ses deux-points est laissée SANS couleur, jamais
        // en rouge. Non pas parce qu'un exercice précis la cherche — ça, c'est
        // le travail de `sansFautes` — mais parce qu'une propriété qu'on n'a
        // pas fini de taper y ressemble exactement.
        sortie += echapper(code.slice(i, j));
        i = j;
        if (i < n && code[i] === ';') { sortie += peindre(';', 'j-op', decalage + i); i++; }
      }
    }
    return sortie;
  }

  /* -------------------------------- HTML --------------------------------
     Trois couleurs distinctes pour ce qu'un débutant confond : le NOM DE
     BALISE, l'ATTRIBUT, et la VALEUR de l'attribut. Le contenu d'un <style>
     ou d'un <script> est confié au coloriste du langage concerné.
     --------------------------------------------------------------------- */
  function colorierHTML(code, decalage) {
    decalage = decalage || 0;
    let sortie = '';
    let i = 0;
    const n = code.length;

    while (i < n) {
      if (code.startsWith('<!--', i)) {
        const fin = code.indexOf('-->', i);
        const bloc = fin === -1 ? code.slice(i) : code.slice(i, fin + 3);
        sortie += peindre(bloc, fin === -1 ? 'j-err' : 'j-com', decalage + i);
        i += bloc.length;
        continue;
      }
      if (code.startsWith('<!', i)) {
        const fin = code.indexOf('>', i);
        const bloc = fin === -1 ? code.slice(i) : code.slice(i, fin + 1);
        sortie += peindre(bloc, 'j-com', decalage + i);
        i += bloc.length;
        continue;
      }

      const debut = /^<(\/?)([a-zA-Z][\w-]*)/.exec(code.slice(i, i + 40));
      if (!debut) { sortie += echapper(code[i]); i++; continue; }

      // La balise s'étend jusqu'au « > », guillemets respectés. Une balise a
      // le droit de tenir sur plusieurs lignes, donc on ne s'arrête pas au
      // retour à la ligne — mais un « < » avant le « > » ne trompe pas : la
      // balise précédente n'a jamais été refermée, et sans cette règle elle
      // avalerait silencieusement la suivante.
      let j = i + debut[0].length;
      let guillemet = null;
      let avortee = false;
      while (j < n) {
        const c = code[j];
        if (guillemet) { if (c === guillemet) guillemet = null; }
        else if (c === '"' || c === "'") guillemet = c;
        else if (c === '>') break;
        else if (c === '<') { avortee = true; break; }
        j++;
      }
      const fermee = j < n && !avortee;
      const interieur = code.slice(i + debut[0].length, j);
      const cls = fermee ? 'j-bal' : 'j-err';

      sortie += peindre('<' + debut[1], 'j-op', decalage + i) +
        peindre(debut[2], cls, decalage + i, decalage + j) +
        appliquer(interieur, [
          { re: /[a-zA-Z-][\w:-]*(?==)/y, cls: 'j-att' },
          { re: /"[^"]*"/y, cls: 'j-val' },
          { re: /'[^']*'/y, cls: 'j-val' },
          { re: /=/y, cls: 'j-op' },
          { re: /[a-zA-Z-][\w:-]*/y, cls: 'j-att' }
        ], decalage + i + debut[0].length) +
        (fermee ? peindre('>', 'j-op', decalage + j) : '');
      i = fermee ? j + 1 : j;

      // Le contenu d'un <style> ou d'un <script> n'est pas du HTML.
      const nom = debut[2].toLowerCase();
      if (!debut[1] && fermee && (nom === 'style' || nom === 'script')) {
        const reste = code.slice(i);
        const f = new RegExp('</' + nom + '\\s*>', 'i').exec(reste);
        const bloc = f ? reste.slice(0, f.index) : reste;
        sortie += nom === 'style' ? colorierCSS(bloc, decalage + i) : appliquer(bloc, REGLES_JS, decalage + i);
        i += bloc.length;
      }
    }
    return sortie;
  }

  const COLORISTES = {
    html: colorierHTML,
    css: colorierCSS,
    js: code => appliquer(code, REGLES_JS),
    py: code => appliquer(code, REGLES_PY),
    sql: code => appliquer(code, REGLES_SQL),
    c: code => appliquer(code, REGLES_C),
    java: code => appliquer(code, REGLES_JAVA)
  };

  // curseur : indice du caractère où se trouve le curseur, ou null si l'on
  // n'écrit pas dans cet éditeur (relecture, banc de test, encyclopédie).
  function colorier(code, langage, curseur, muet) {
    curseurActuel = typeof curseur === 'number' ? curseur : null;
    zoneSilencieuse = ligneAutourDe(code, curseur);
    sansFautes = !!muet;
    const f = COLORISTES[langage] || COLORISTES.js;
    try { return f(code, 0); } catch (e) { return echapper(code); }   // jamais de page cassée
    finally { zoneSilencieuse = null; curseurActuel = null; sansFautes = false; }
  }

  function ligneAutourDe(code, curseur) {
    if (typeof curseur !== 'number' || curseur < 0 || curseur > code.length) return null;
    let debut = code.lastIndexOf('\n', curseur - 1) + 1;
    let fin = code.indexOf('\n', curseur);
    if (fin === -1) fin = code.length;
    return { debut: debut, fin: fin };
  }

  /* -----------------------------------------------------------------------
     Superposition des deux couches
     ----------------------------------------------------------------------- */
  function attacherEditeur(zone, langage, options) {
    if (!zone || zone.dataset.colorie === 'oui') return null;
    const muet = !!(options && options.sansFautes);

    const parent = zone.parentElement;
    if (!parent) return null;

    const couche = document.createElement('pre');
    couche.className = 'editeur-couleurs';
    couche.setAttribute('aria-hidden', 'true');
    parent.insertBefore(couche, zone);
    zone.dataset.colorie = 'oui';

    function rafraichir() {
      // On ne se tait que si le curseur est VRAIMENT là. Dès qu'on quitte
      // l'éditeur, on relit le code et tout ce qui cloche redevient visible.
      const curseur = document.activeElement === zone ? zone.selectionStart : null;
      // Le saut de ligne final est mangé par <pre> : on en ajoute un pour que
      // la dernière ligne vide existe aussi dans la couche coloriée.
      couche.innerHTML = colorier(zone.value, langage, curseur, muet) + '\n';
      couche.scrollTop = zone.scrollTop;
    }
    function suivreLeDefilement() {
      couche.scrollTop = zone.scrollTop;
      couche.scrollLeft = zone.scrollLeft;
    }

    zone.addEventListener('input', rafraichir);
    zone.addEventListener('scroll', suivreLeDefilement);
    // Le curseur change aussi de ligne sans qu'on tape : flèches, clic,
    // entrée et sortie de l'éditeur. La ligne silencieuse doit suivre.
    zone.addEventListener('keyup', rafraichir);
    zone.addEventListener('click', rafraichir);
    zone.addEventListener('focus', rafraichir);
    // Pendant l'événement « blur », document.activeElement désigne encore
    // l'éditeur qu'on quitte : on attend le tour suivant pour repeindre.
    zone.addEventListener('blur', function () { setTimeout(rafraichir, 0); });

    // Le code change aussi sans frappe : bouton « Recommencer », touche Tab,
    // reprise du code sauvegardé. majLignes() passe par là dans tous les cas,
    // c'est donc le point sûr pour ne jamais laisser les couleurs en retard.
    zone.repeindre = rafraichir;
    rafraichir();

    return { rafraichir: rafraichir, langage: langage };
  }

  window.attacherEditeur = attacherEditeur;
  window.colorierCode = colorier;   // utile aux blocs de code de l'encyclopédie
})();
