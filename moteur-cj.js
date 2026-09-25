/* =========================================================================
   Interpréteur d'un sous-ensemble de C et de Java, écrit en JavaScript.

   Les deux langages partagent la même grammaire de base (accolades,
   point-virgules, types déclarés) : un seul moteur les couvre, paramétré
   par le dialecte. Ce qui compte pédagogiquement est respecté :
     - les types sont réels (int, double, char, boolean, String) ;
     - la division entière tronque : 5 / 2 vaut 2, pas 2.5 ;
     - une variable non déclarée est une erreur, pas une création implicite.
   Les messages d'erreur sont écrits pour un débutant.
   ========================================================================= */
(function () {

  const TYPES = new Set(['int', 'long', 'short', 'float', 'double', 'char', 'void',
    'boolean', 'bool', 'String', 'string']);
  const MODIFICATEURS = new Set(['public', 'private', 'protected', 'static', 'final', 'const', 'unsigned']);
  const MOTS = new Set(['if', 'else', 'while', 'for', 'do', 'return', 'break', 'continue',
    'switch', 'case', 'default', 'new', 'class', 'struct', 'true', 'false', 'null', 'sizeof']);

  function ErreurCJ(msg, ligne) { this.message = msg; this.ligne = ligne; this.cj = true; }
  function boum(msg, ligne) { throw new ErreurCJ(msg, ligne); }

  /* ------------------------- Découpage ------------------------- */
  function decouper(src) {
    const jetons = [];
    let i = 0, ligne = 1;
    const pousser = (type, valeur) => jetons.push({ type, valeur, ligne });

    while (i < src.length) {
      const c = src[i];

      if (c === '\n') { ligne++; i++; continue; }
      if (/\s/.test(c)) { i++; continue; }

      // directives du préprocesseur C : ignorées (on n'a rien à charger)
      if (c === '#') { while (i < src.length && src[i] !== '\n') i++; continue; }

      if (c === '/' && src[i + 1] === '/') { while (i < src.length && src[i] !== '\n') i++; continue; }
      if (c === '/' && src[i + 1] === '*') {
        i += 2;
        while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) { if (src[i] === '\n') ligne++; i++; }
        i += 2;
        continue;
      }

      if (c === '"' || c === "'") {
        const fin = c;
        let v = '';
        i++;
        while (i < src.length && src[i] !== fin) {
          if (src[i] === '\\') {
            const suite = src[i + 1];
            v += suite === 'n' ? '\n' : suite === 't' ? '\t' : suite === '\\' ? '\\'
              : suite === '"' ? '"' : suite === "'" ? "'" : suite === '0' ? '\0' : suite;
            i += 2;
            continue;
          }
          if (src[i] === '\n') boum('un texte a été ouvert avec ' + fin + ' mais jamais refermé sur la même ligne.', ligne);
          v += src[i++];
        }
        if (i >= src.length) boum('un texte a été ouvert avec ' + fin + ' mais jamais refermé.', ligne);
        i++;
        pousser(fin === '"' ? 'texte' : 'car', v);
        continue;
      }

      if (/[0-9]/.test(c)) {
        let v = '';
        while (i < src.length && /[0-9.]/.test(src[i])) v += src[i++];
        if (/[fFdDlL]/.test(src[i] || '')) i++;          // suffixes 1.5f, 10L…
        pousser('nombre', v.includes('.') ? { d: parseFloat(v) } : { e: parseInt(v, 10) });
        continue;
      }

      if (/[A-Za-z_]/.test(c)) {
        let v = '';
        while (i < src.length && /[A-Za-z0-9_]/.test(src[i])) v += src[i++];
        pousser('nom', v);
        continue;
      }

      const trois = src.substr(i, 3);
      if (['<<=', '>>=', '...'].includes(trois)) { pousser('op', trois); i += 3; continue; }
      const deux = src.substr(i, 2);
      if (['==', '!=', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%=', '->', '<<', '>>'].includes(deux)) {
        pousser('op', deux); i += 2; continue;
      }
      if ('+-*/%=<>!&|^~?:.,;(){}[]'.includes(c)) { pousser('op', c); i++; continue; }

      boum('je ne comprends pas le caractère « ' + c + ' ».', ligne);
    }
    pousser('fin', null);
    return jetons;
  }

  /* ------------------------- Analyse ------------------------- */
  function Analyseur(jetons, langage) {
    this.j = jetons;
    this.i = 0;
    this.langage = langage;
  }
  const A = Analyseur.prototype;

  A.voir = function (d) { return this.j[this.i + (d || 0)]; };
  A.estOp = function (v, d) { const t = this.voir(d); return t.type === 'op' && t.valeur === v; };
  A.estNom = function (v, d) { const t = this.voir(d); return t.type === 'nom' && t.valeur === v; };
  A.avancer = function () { return this.j[this.i++]; };
  A.siOp = function (v) { if (this.estOp(v)) { this.i++; return true; } return false; };
  A.siNom = function (v) { if (this.estNom(v)) { this.i++; return true; } return false; };
  A.exigerOp = function (v) {
    if (!this.estOp(v)) {
      const t = this.voir();
      boum('il manque « ' + v + ' »' + (t.type === 'fin' ? ' (fin du programme atteinte)' :
        ' — j\'ai trouvé « ' + affichetJeton(t) + ' » à la place') + '.', t.ligne);
    }
    return this.avancer();
  };
  A.exigerNom = function (quoi) {
    const t = this.voir();
    if (t.type !== 'nom') boum('j\'attendais ' + (quoi || 'un nom') + ' mais j\'ai trouvé « ' + affichetJeton(t) + ' ».', t.ligne);
    return this.avancer().valeur;
  };

  // Le point-virgule est obligatoire : c'est l'erreur n°1 des débutants en C
  // et en Java, le moteur doit donc la signaler comme un vrai compilateur.
  A.finInstruction = function (ligne) {
    if (this.siOp(';')) return;
    const t = this.voir();
    boum('il manque un point-virgule <code>;</code> à la fin de cette instruction' +
      (t.type !== 'fin' ? ' — j\'ai trouvé « ' + affichetJeton(t) + ' » juste après' : '') + '.', ligne);
  };

  function affichetJeton(t) {
    if (t.type === 'fin') return 'la fin du code';
    if (t.type === 'nombre') return t.valeur.e !== undefined ? t.valeur.e : t.valeur.d;
    if (t.type === 'texte') return '"' + t.valeur + '"';
    return t.valeur;
  }

  // Un type suivi d'un nom : « int x », « String[] noms », « double t[] »,
  // « struct Point p » (en C, le mot struct fait partie du type)
  const sautable = (t) => t.type === 'nom' && (MODIFICATEURS.has(t.valeur) || t.valeur === 'struct');

  A.estDeclaration = function () {
    let k = this.i;
    const t = this.j[k];
    if (t.type !== 'nom') return false;
    if (!TYPES.has(t.valeur) && !this.classes[t.valeur] && !sautable(t)) return false;
    while (sautable(this.j[k])) k++;
    if (this.j[k].type !== 'nom') return false;
    if (!TYPES.has(this.j[k].valeur) && !this.classes[this.j[k].valeur]) return false;
    k++;
    while (this.j[k].type === 'op' && this.j[k].valeur === '*') k++;           // int *p
    while (this.j[k].type === 'op' && this.j[k].valeur === '[') {              // int[] t
      if (this.j[k + 1].type === 'op' && this.j[k + 1].valeur === ']') k += 2; else break;
    }
    return this.j[k].type === 'nom';
  };

  A.lireType = function () {
    while (sautable(this.voir())) this.i++;
    const base = this.exigerNom('un type (int, double, String…)');
    let pointeur = 0, tableau = 0;
    while (this.siOp('*')) pointeur++;
    while (this.estOp('[') && this.estOp(']', 1)) { this.i += 2; tableau++; }
    return { base, pointeur, tableau };
  };

  /* --- Instructions --- */
  A.bloc = function () {
    this.exigerOp('{');
    const corps = [];
    while (!this.estOp('}')) {
      if (this.voir().type === 'fin') boum('une accolade { n\'a jamais été refermée.', this.voir().ligne);
      corps.push(this.instruction());
    }
    this.exigerOp('}');
    return { k: 'bloc', corps };
  };

  A.instruction = function () {
    const t = this.voir();
    const ligne = t.ligne;

    if (this.estOp('{')) return this.bloc();
    if (this.estOp(';')) { this.i++; return { k: 'vide' }; }

    if (t.type === 'nom') {
      switch (t.valeur) {
        case 'if': {
          this.i++;
          this.exigerOp('(');
          const cond = this.expression();
          this.exigerOp(')');
          const alors = this.instruction();
          let sinon = null;
          if (this.siNom('else')) sinon = this.instruction();
          return { k: 'si', cond, alors, sinon, ligne };
        }
        case 'while': {
          this.i++;
          this.exigerOp('(');
          const cond = this.expression();
          this.exigerOp(')');
          return { k: 'tantque', cond, corps: this.instruction(), ligne };
        }
        case 'do': {
          this.i++;
          const corps = this.instruction();
          if (!this.siNom('while')) boum('un <code>do</code> doit être suivi de <code>while (condition);</code>', ligne);
          this.exigerOp('(');
          const cond = this.expression();
          this.exigerOp(')');
          this.siOp(';');
          return { k: 'faire', cond, corps, ligne };
        }
        case 'for': {
          this.i++;
          this.exigerOp('(');

          // « pour chaque » : for (int v : tableau) — on repère le « : »
          if (this.estDeclaration()) {
            const depart = this.i;
            this.lireType();
            if (this.voir().type === 'nom' && this.estOp(':', 1)) {
              const nomVar = this.avancer().valeur;
              this.i++;                       // le « : »
              const source = this.expression();
              this.exigerOp(')');
              return { k: 'pourChaque', nomVar, source, corps: this.instruction(), ligne };
            }
            this.i = depart;
          }

          const init = this.estOp(';') ? null : (this.estDeclaration() ? this.declaration(true) : { k: 'expr', e: this.expression() });
          this.siOp(';');
          const cond = this.estOp(';') ? null : this.expression();
          this.exigerOp(';');
          const pas = this.estOp(')') ? null : this.expression();
          this.exigerOp(')');
          return { k: 'pour', init, cond, pas, corps: this.instruction(), ligne };
        }
        case 'switch': {
          this.i++;
          this.exigerOp('(');
          const sujet = this.expression();
          this.exigerOp(')');
          this.exigerOp('{');
          const cas = [];
          while (!this.estOp('}')) {
            if (this.siNom('case')) {
              const val = this.expression();
              this.exigerOp(':');
              cas.push({ val, corps: [] });
            } else if (this.siNom('default')) {
              this.exigerOp(':');
              cas.push({ val: null, corps: [] });
            } else {
              if (!cas.length) boum('dans un switch, le code doit se trouver après un <code>case</code> ou <code>default</code>.', this.voir().ligne);
              cas[cas.length - 1].corps.push(this.instruction());
            }
          }
          this.exigerOp('}');
          return { k: 'switch', sujet, cas, ligne };
        }
        case 'return': {
          this.i++;
          const e = this.estOp(';') ? null : this.expression();
          this.finInstruction(ligne);
          return { k: 'retour', e, ligne };
        }
        case 'break': this.i++; this.finInstruction(ligne); return { k: 'sortir', ligne };
        case 'continue': this.i++; this.finInstruction(ligne); return { k: 'suivant', ligne };
      }
    }

    if (this.estDeclaration()) return this.declaration(false);

    const e = this.expression();
    this.finInstruction(ligne);
    return { k: 'expr', e, ligne };
  };

  A.declaration = function (dansPour) {
    const ligne = this.voir().ligne;
    const type = this.lireType();
    const vars = [];
    do {
      const nom = this.exigerNom('un nom de variable');
      let dims = type.tableau;
      let taille = null;
      while (this.siOp('[')) {                     // C : int t[5]
        if (!this.estOp(']')) taille = this.expression();
        this.exigerOp(']');
        dims++;
      }
      let init = null;
      if (this.siOp('=')) init = this.estOp('{') ? this.litteralTableau() : this.expression();
      vars.push({ nom, dims, taille, init });
    } while (this.siOp(','));
    if (!dansPour) this.finInstruction(ligne);
    return { k: 'declare', type, vars, ligne };
  };

  A.litteralTableau = function () {
    this.exigerOp('{');
    const elements = [];
    if (!this.estOp('}')) {
      do { elements.push(this.estOp('{') ? this.litteralTableau() : this.expression()); } while (this.siOp(','));
    }
    this.exigerOp('}');
    return { k: 'litTableau', elements };
  };

  /* --- Expressions, par ordre de priorité --- */
  A.expression = function () { return this.affectation(); };

  A.affectation = function () {
    const g = this.ternaire();
    const t = this.voir();
    if (t.type === 'op' && ['=', '+=', '-=', '*=', '/=', '%='].includes(t.valeur)) {
      if (t.valeur === '=' && g.k === 'binaire' && ['==', '<', '>'].includes(g.op)) {
        boum('pour comparer, on écrit <code>==</code> (deux signes égal) ; un seul <code>=</code> sert à affecter.', t.ligne);
      }
      this.i++;
      const d = this.affectation();
      return { k: 'affect', op: t.valeur, cible: g, valeur: d, ligne: t.ligne };
    }
    return g;
  };

  A.ternaire = function () {
    const c = this.ou();
    if (this.siOp('?')) {
      const a = this.expression();
      this.exigerOp(':');
      return { k: 'ternaire', cond: c, alors: a, sinon: this.expression() };
    }
    return c;
  };

  function niveau(nom, ops, suivant) {
    A[nom] = function () {
      let g = this[suivant]();
      while (true) {
        const t = this.voir();
        if (t.type === 'op' && ops.includes(t.valeur)) {
          this.i++;
          g = { k: 'binaire', op: t.valeur, g, d: this[suivant](), ligne: t.ligne };
        } else return g;
      }
    };
  }
  niveau('ou', ['||'], 'et');
  niveau('et', ['&&'], 'egalite');
  niveau('egalite', ['==', '!='], 'relation');
  niveau('relation', ['<', '>', '<=', '>='], 'somme');
  niveau('somme', ['+', '-'], 'produit');
  niveau('produit', ['*', '/', '%'], 'unaire');

  A.unaire = function () {
    const t = this.voir();
    if (t.type === 'op' && ['!', '-', '+', '*', '&', '++', '--'].includes(t.valeur)) {
      this.i++;
      if (t.valeur === '++' || t.valeur === '--') return { k: 'prefixe', op: t.valeur, cible: this.unaire(), ligne: t.ligne };
      return { k: 'unaire', op: t.valeur, e: this.unaire(), ligne: t.ligne };
    }
    // conversion explicite : (int) x
    if (t.type === 'op' && t.valeur === '(' && this.voir(1).type === 'nom' && TYPES.has(this.voir(1).valeur)
      && this.voir(2).type === 'op' && this.voir(2).valeur === ')') {
      this.i += 3;
      return { k: 'conversion', vers: this.j[this.i - 2].valeur, e: this.unaire(), ligne: t.ligne };
    }
    return this.postfixe();
  };

  A.postfixe = function () {
    let e = this.primaire();
    while (true) {
      if (this.estOp('[')) { this.i++; const idx = this.expression(); this.exigerOp(']'); e = { k: 'index', cible: e, idx, ligne: this.voir().ligne }; continue; }
      if (this.estOp('.') || this.estOp('->')) {
        const fleche = this.voir().valeur === '->';
        this.i++;
        const membre = this.exigerNom('un nom de champ ou de méthode');
        if (this.estOp('(')) {
          const args = this.arguments_();
          e = { k: 'appelMembre', objet: e, membre, args, fleche, ligne: this.voir().ligne };
        } else {
          e = { k: 'champ', objet: e, membre, fleche, ligne: this.voir().ligne };
        }
        continue;
      }
      if (this.estOp('++') || this.estOp('--')) { const op = this.avancer().valeur; e = { k: 'postfixe', op, cible: e }; continue; }
      return e;
    }
  };

  A.arguments_ = function () {
    this.exigerOp('(');
    const args = [];
    if (!this.estOp(')')) { do { args.push(this.expression()); } while (this.siOp(',')); }
    this.exigerOp(')');
    return args;
  };

  A.primaire = function () {
    const t = this.voir();

    if (t.type === 'nombre') { this.i++; return { k: 'litt', v: t.valeur.e !== undefined ? { t: 'int', v: t.valeur.e } : { t: 'double', v: t.valeur.d } }; }
    if (t.type === 'texte') { this.i++; return { k: 'litt', v: { t: 'String', v: t.valeur } }; }
    if (t.type === 'car') { this.i++; return { k: 'litt', v: { t: 'char', v: t.valeur } }; }

    if (t.type === 'op' && t.valeur === '(') { this.i++; const e = this.expression(); this.exigerOp(')'); return e; }

    if (t.type === 'nom') {
      if (t.valeur === 'true') { this.i++; return { k: 'litt', v: { t: 'boolean', v: true } }; }
      if (t.valeur === 'false') { this.i++; return { k: 'litt', v: { t: 'boolean', v: false } }; }
      if (t.valeur === 'null') { this.i++; return { k: 'litt', v: { t: 'null', v: null } }; }

      if (t.valeur === 'new') {
        this.i++;
        const type = this.exigerNom('un nom de classe ou un type');
        if (this.estOp('[')) {
          this.i++;
          const taille = this.expression();
          this.exigerOp(']');
          return { k: 'nouveauTableau', type, taille, ligne: t.ligne };
        }
        if (this.estOp('{')) return { k: 'litTableau', elements: this.litteralTableau().elements };
        return { k: 'nouveau', classe: type, args: this.arguments_(), ligne: t.ligne };
      }

      this.i++;
      if (this.estOp('(')) return { k: 'appel', nom: t.valeur, args: this.arguments_(), ligne: t.ligne };
      return { k: 'variable', nom: t.valeur, ligne: t.ligne };
    }

    boum('« ' + affichetJeton(t) + ' » n\'est pas attendu ici.', t.ligne);
  };

  /* --- Programme complet --- */
  A.programme = function () {
    this.classes = {};
    const fonctions = {};
    const globales = [];
    const structs = {};

    // premier survol : repérer les noms de classes et de structs
    for (let k = 0; k < this.j.length - 1; k++) {
      if (this.j[k].type === 'nom' && (this.j[k].valeur === 'class' || this.j[k].valeur === 'struct')
        && this.j[k + 1].type === 'nom') this.classes[this.j[k + 1].valeur] = true;
    }

    while (this.voir().type !== 'fin') {
      while (this.voir().type === 'nom' && MODIFICATEURS.has(this.voir().valeur)) this.i++;

      if (this.estNom('class') || this.estNom('struct')) {
        const estStruct = this.voir().valeur === 'struct';
        this.i++;
        const nom = this.exigerNom('un nom de classe');
        let parent = null;
        if (this.siNom('extends')) parent = this.exigerNom('le nom de la classe parente après extends');
        if (this.siNom('implements')) this.exigerNom('un nom d\'interface');
        const membres = this.corpsDeClasse(nom);
        membres.parent = parent;
        membres.nom = nom;
        this.classes[nom] = membres;
        if (estStruct) { structs[nom] = membres; this.siOp(';'); }
        continue;
      }

      if (this.estDeclaration()) {
        // fonction ou variable globale ?
        const depart = this.i;
        const type = this.lireType();
        const nom = this.exigerNom('un nom');
        if (this.estOp('(')) {
          const params = this.parametres();
          const corps = this.bloc();
          fonctions[nom] = { nom, type, params, corps };
        } else {
          this.i = depart;
          globales.push(this.declaration(false));
        }
        continue;
      }

      boum('je ne comprends pas cette partie du programme. Au premier niveau, on attend des fonctions, des variables globales ou une classe.', this.voir().ligne);
    }
    return { fonctions, classes: this.classes, globales, structs };
  };

  A.corpsDeClasse = function (nomClasse) {
    this.exigerOp('{');
    const champs = [], methodes = {};
    let constructeur = null;
    while (!this.estOp('}')) {
      if (this.voir().type === 'fin') boum('l\'accolade de la classe ' + nomClasse + ' n\'a jamais été refermée.', this.voir().ligne);
      while (this.voir().type === 'nom' && MODIFICATEURS.has(this.voir().valeur)) this.i++;

      // constructeur : NomClasse(...)
      if (this.estNom(nomClasse) && this.estOp('(', 1)) {
        this.i++;
        const params = this.parametres();
        constructeur = { params, corps: this.bloc() };
        continue;
      }
      const type = this.lireType();
      const nom = this.exigerNom('un nom de champ ou de méthode');
      if (this.estOp('(')) {
        const params = this.parametres();
        methodes[nom] = { nom, type, params, corps: this.bloc() };
      } else {
        let init = null;
        if (this.siOp('=')) init = this.expression();
        this.siOp(';');
        champs.push({ nom, type, init });
      }
    }
    this.exigerOp('}');
    return { champs, methodes, constructeur };
  };

  A.parametres = function () {
    this.exigerOp('(');
    const params = [];
    if (!this.estOp(')')) {
      do {
        const type = this.lireType();
        const nom = this.exigerNom('un nom de paramètre');
        let dims = type.tableau;
        while (this.siOp('[')) { this.exigerOp(']'); dims++; }
        params.push({ nom, type, dims });
      } while (this.siOp(','));
    }
    this.exigerOp(')');
    return params;
  };

  /* ------------------------- Exécution ------------------------- */
  const SORTIR = { signal: 'sortir' };
  const SUIVANT = { signal: 'suivant' };
  function Retour(v) { this.signal = 'retour'; this.v = v; }

  function Portee(parent) { this.vars = {}; this.parent = parent; }
  Portee.prototype.trouver = function (nom) {
    let p = this;
    while (p) { if (Object.prototype.hasOwnProperty.call(p.vars, nom)) return p; p = p.parent; }
    return null;
  };
  Portee.prototype.lire = function (nom, ligne) {
    const p = this.trouver(nom);
    if (!p) boum('la variable <code>' + nom + '</code> n\'existe pas. En C comme en Java, il faut la déclarer avec son type avant de l\'utiliser (par exemple <code>int ' + nom + ' = 0;</code>).', ligne);
    return p.vars[nom];
  };
  Portee.prototype.ecrire = function (nom, val, ligne) {
    const p = this.trouver(nom);
    if (!p) boum('la variable <code>' + nom + '</code> n\'a pas été déclarée.', ligne);
    p.vars[nom] = adapter(p.vars[nom], val, nom, ligne);
  };
  Portee.prototype.declarer = function (nom, val) { this.vars[nom] = val; };

  function estEntier(t) { return t === 'int' || t === 'long' || t === 'short' || t === 'char'; }
  function estNombre(t) { return estEntier(t) || t === 'double' || t === 'float'; }

  // Conserver le type déclaré : une case int reste int même si on y range un double
  function adapter(ancien, nouveau, nom, ligne) {
    if (!ancien) return nouveau;
    if (estEntier(ancien.t) && nouveau.t === 'double') return { t: ancien.t, v: Math.trunc(nouveau.v) };
    if ((ancien.t === 'double' || ancien.t === 'float') && estEntier(nouveau.t)) return { t: ancien.t, v: nouveau.v };
    if (ancien.t === 'String' && nouveau.t !== 'String' && nouveau.t !== 'null') {
      boum('la variable <code>' + nom + '</code> est de type String : on ne peut pas y ranger ' + decrire(nouveau) + '.', ligne);
    }
    if (ancien.t === 'boolean' && nouveau.t !== 'boolean') {
      boum('la variable <code>' + nom + '</code> est un booléen : elle ne peut valoir que <code>true</code> ou <code>false</code>.', ligne);
    }
    return nouveau;
  }

  function decrire(v) {
    if (!v) return 'rien';
    if (v.t === 'String') return 'du texte';
    if (v.t === 'boolean') return 'un booléen';
    if (v.t === 'tableau') return 'un tableau';
    if (estEntier(v.t)) return 'un entier';
    return 'un nombre';
  }

  function texte(v) {
    if (v === null || v === undefined) return 'null';
    if (v.t === 'null') return 'null';
    if (v.t === 'boolean') return v.v ? 'true' : 'false';
    if (v.t === 'pointeur') return '&' + texte(v.cible.lire());
    // un tableau de char issu d'une chaîne se réaffiche comme du texte
    if (v.t === 'tableau' && v.elem === 'char') return v.v.map(c => c.v).join('');
    if (v.t === 'tableau') return '[' + v.v.map(texte).join(', ') + ']';
    if (v.t === 'objet') return v.classe + '@objet';
    if (v.t === 'double' || v.t === 'float') {
      if (Number.isInteger(v.v)) return v.v.toFixed(1);
      return String(v.v);
    }
    return String(v.v);
  }

  // En Java, une condition DOIT être un booléen : « if (x = 3) » est refusé
  // par le compilateur. En C c'est légal (0 = faux), et c'est un piège célèbre.
  function verite(v, ligne, langage) {
    if (v.t === 'boolean') return v.v;
    if (langage === 'java') {
      boum('en Java, une condition doit valoir <code>true</code> ou <code>false</code>. ' +
        (estNombre(v.t)
          ? 'Ici tu donnes un nombre — as-tu écrit <code>=</code> (affectation) au lieu de <code>==</code> (comparaison) ?'
          : 'Ici la condition vaut ' + decrire(v) + '.'), ligne);
    }
    if (estNombre(v.t)) return v.v !== 0;
    if (v.t === 'null') return false;
    boum('cette condition ne donne ni vrai ni faux.', ligne);
  }

  function Machine(prog, langage, limite) {
    this.prog = prog;
    this.langage = langage;
    this.sortie = '';
    this.pas = 0;
    this.limite = limite || 2000000;
  }
  const M = Machine.prototype;

  M.ecrire = function (s) {
    this.sortie += s;
    if (this.sortie.length > 200000) boum('ton programme affiche beaucoup trop de texte (boucle sans fin ?).');
  };

  M.tic = function (ligne) {
    if (++this.pas > this.limite) {
      boum('ton programme tourne sans s\'arrêter (boucle infinie ?). Vérifie la condition de ta boucle et que la variable de contrôle évolue bien.', ligne);
    }
  };

  M.executer = function (n, portee) {
    switch (n.k) {
      case 'bloc': {
        const p = new Portee(portee);
        for (const s of n.corps) {
          const r = this.executer(s, p);
          if (r) return r;
        }
        return null;
      }
      case 'vide': return null;
      case 'expr': this.evaluer(n.e, portee); return null;

      case 'declare': {
        for (const v of n.vars) {
          let valeur;
          if (v.init) {
            valeur = v.init.k === 'litTableau' ? this.construireTableau(v.init, n.type, portee) : this.evaluer(v.init, portee);
            // char nom[] = "Alex" : en C une chaîne EST un tableau de caractères
            if (n.type.base === 'char' && v.dims > 0 && valeur.t === 'String') {
              valeur = { t: 'tableau', elem: 'char', chaine: true, v: String(valeur.v).split('').map(c => ({ t: 'char', v: c })) };
            }
            else if (estEntier(n.type.base) && valeur.t === 'double') valeur = { t: n.type.base, v: Math.trunc(valeur.v) };
            else if ((n.type.base === 'double' || n.type.base === 'float') && estEntier(valeur.t)) valeur = { t: n.type.base, v: valeur.v };
            else if (!['tableau', 'objet', 'null', 'pointeur'].includes(valeur.t)) valeur = { t: n.type.base, v: valeur.v };
          } else if (v.dims > 0 && v.taille) {
            const t = this.evaluer(v.taille, portee);
            valeur = { t: 'tableau', elem: n.type.base, v: new Array(t.v).fill(0).map(() => defautDe(n.type.base)) };
          } else if (v.dims > 0) {
            valeur = { t: 'null', v: null };
          } else {
            valeur = this.defautPour(n.type.base);
          }
          portee.declarer(v.nom, valeur);
        }
        return null;
      }

      case 'si':
        if (verite(this.evaluer(n.cond, portee), n.ligne, this.langage)) return this.executer(n.alors, portee);
        else if (n.sinon) return this.executer(n.sinon, portee);
        return null;

      case 'tantque':
        while (verite(this.evaluer(n.cond, portee), n.ligne, this.langage)) {
          this.tic(n.ligne);
          const r = this.executer(n.corps, portee);
          if (r === SORTIR) break;
          if (r && r !== SUIVANT) return r;
        }
        return null;

      case 'faire':
        do {
          this.tic(n.ligne);
          const r = this.executer(n.corps, portee);
          if (r === SORTIR) break;
          if (r && r !== SUIVANT) return r;
        } while (verite(this.evaluer(n.cond, portee), n.ligne, this.langage));
        return null;

      case 'pour': {
        const p = new Portee(portee);
        if (n.init) this.executer(n.init, p);
        while (n.cond === null || verite(this.evaluer(n.cond, p), n.ligne, this.langage)) {
          this.tic(n.ligne);
          const r = this.executer(n.corps, p);
          if (r === SORTIR) break;
          if (r && r !== SUIVANT) return r;
          if (n.pas) this.evaluer(n.pas, p);
        }
        return null;
      }

      case 'pourChaque': {
        const src = this.evaluer(n.source, portee);
        if (src.t !== 'tableau') boum('la boucle <code>for (… : …)</code> attend un tableau à parcourir.', n.ligne);
        for (const element of src.v) {
          this.tic(n.ligne);
          const p = new Portee(portee);
          p.declarer(n.nomVar, element);
          const r = this.executer(n.corps, p);
          if (r === SORTIR) break;
          if (r && r !== SUIVANT) return r;
        }
        return null;
      }

      case 'switch': {
        const sujet = this.evaluer(n.sujet, portee);
        const p = new Portee(portee);
        let actif = false;
        for (const c of n.cas) {
          if (!actif) {
            if (c.val === null) actif = true;
            else if (comparerEgal(sujet, this.evaluer(c.val, p))) actif = true;
          }
          if (actif) {
            for (const s of c.corps) {
              const r = this.executer(s, p);
              if (r === SORTIR) return null;
              if (r) return r;
            }
          }
        }
        return null;
      }

      case 'retour': return new Retour(n.e ? this.evaluer(n.e, portee) : { t: 'void', v: null });
      case 'sortir': return SORTIR;
      case 'suivant': return SUIVANT;
    }
    boum('instruction inconnue.', n.ligne);
  };

  function defautDe(base) {
    if (base === 'String') return { t: 'String', v: '' };
    if (base === 'boolean' || base === 'bool') return { t: 'boolean', v: false };
    if (base === 'double' || base === 'float') return { t: 'double', v: 0 };
    if (base === 'char') return { t: 'char', v: '\0' };
    return { t: 'int', v: 0 };
  }

  /* --- Héritage : chaîne des classes, portée d'objet, constructeurs --- */

  // De l'ancêtre le plus lointain jusqu'à la classe elle-même
  M.ancetres = function (nomClasse) {
    const chaine = [];
    let c = this.prog.classes[nomClasse];
    const vus = new Set();
    while (c && c !== true) {
      if (vus.has(c)) break;                 // garde-fou contre un héritage circulaire
      vus.add(c);
      chaine.unshift(c);
      c = c.parent ? this.prog.classes[c.parent] : null;
    }
    return chaine;
  };

  // Une portée où « this » existe et où les champs de l'objet sont accessibles
  // directement par leur nom (comme en Java à l'intérieur d'une méthode).
  M.porteeObjet = function (obj, classe) {
    const p = new Portee(null);
    p.declarer('this', obj);
    p.declarer('__classe', { t: 'meta', v: classe });
    for (const nom in obj.champs) {
      Object.defineProperty(p.vars, nom, {
        get: () => obj.champs[nom],
        set: (x) => { obj.champs[nom] = x; },
        enumerable: true, configurable: true
      });
    }
    return p;
  };

  M.appelerConstructeur = function (cl, obj, args, ligne) {
    if (!cl || cl === true) return;
    if (!cl.constructeur) {
      // pas de constructeur ici : on tente celui du parent
      if (cl.parent) this.appelerConstructeur(this.prog.classes[cl.parent], obj, args, ligne);
      return;
    }
    const p = this.porteeObjet(obj, cl);
    cl.constructeur.params.forEach((prm, i) =>
      p.declarer(prm.nom, args[i] !== undefined ? args[i] : defautDe(prm.type.base)));
    this.executer(cl.constructeur.corps, p);
  };

  // Cherche une méthode dans la classe puis chez ses ancêtres
  M.trouverMethode = function (classe, nom) {
    let c = classe;
    while (c && c !== true) {
      if (c.methodes && c.methodes[nom]) return { methode: c.methodes[nom], classe: c };
      c = c.parent ? this.prog.classes[c.parent] : null;
    }
    return null;
  };

  // « struct Point p; » crée un objet avec ses champs à zéro,
  // là où « int x; » ne crée qu'un entier.
  M.defautPour = function (base) {
    const cl = this.prog.classes[base];
    if (cl && cl !== true) {
      const obj = { t: 'objet', classe: base, champs: {}, def: cl };
      for (const c of cl.champs) obj.champs[c.nom] = defautDe(c.type.base);
      return obj;
    }
    return defautDe(base);
  };

  M.construireTableau = function (n, type, portee) {
    const elements = n.elements.map(e =>
      e.k === 'litTableau' ? this.construireTableau(e, type, portee) : this.evaluer(e, portee));
    return { t: 'tableau', elem: type ? type.base : 'int', v: elements };
  };

  function comparerEgal(a, b) {
    if (a.t === 'String' || b.t === 'String') return String(a.v) === String(b.v);
    return a.v === b.v;
  }

  M.evaluer = function (n, portee) {
    switch (n.k) {
      case 'litt': return { t: n.v.t, v: n.v.v };
      case 'variable': return portee.lire(n.nom, n.ligne);
      case 'litTableau': return this.construireTableau(n, null, portee);

      case 'nouveauTableau': {
        const t = this.evaluer(n.taille, portee);
        return { t: 'tableau', elem: n.type, v: new Array(t.v).fill(0).map(() => defautDe(n.type)) };
      }

      case 'conversion': {
        const v = this.evaluer(n.e, portee);
        if (estEntier(n.vers)) return { t: n.vers, v: Math.trunc(Number(v.v)) };
        if (n.vers === 'double' || n.vers === 'float') return { t: 'double', v: Number(v.v) };
        if (n.vers === 'String') return { t: 'String', v: texte(v) };
        return v;
      }

      case 'binaire': {
        const op = n.op;
        if (op === '&&') return { t: 'boolean', v: verite(this.evaluer(n.g, portee), n.ligne, this.langage) && verite(this.evaluer(n.d, portee), n.ligne, this.langage) };
        if (op === '||') return { t: 'boolean', v: verite(this.evaluer(n.g, portee), n.ligne, this.langage) || verite(this.evaluer(n.d, portee), n.ligne, this.langage) };
        const a = this.evaluer(n.g, portee), b = this.evaluer(n.d, portee);

        if (op === '==') return { t: 'boolean', v: comparerEgal(a, b) };
        if (op === '!=') return { t: 'boolean', v: !comparerEgal(a, b) };
        if (['<', '>', '<=', '>='].includes(op)) {
          const x = a.t === 'String' ? a.v : Number(a.v), y = b.t === 'String' ? b.v : Number(b.v);
          return { t: 'boolean', v: op === '<' ? x < y : op === '>' ? x > y : op === '<=' ? x <= y : x >= y };
        }

        if (op === '+' && (a.t === 'String' || b.t === 'String')) {
          if (this.langage === 'c') boum('en C, on ne colle pas deux textes avec <code>+</code>. Utilise plusieurs <code>%s</code> dans un seul <code>printf</code>.', n.ligne);
          return { t: 'String', v: texte(a) + texte(b) };
        }
        if (!estNombre(a.t) || !estNombre(b.t)) {
          boum('l\'opération <code>' + op + '</code> attend des nombres, mais reçoit ' + decrire(a) + ' et ' + decrire(b) + '.', n.ligne);
        }

        const entier = estEntier(a.t) && estEntier(b.t);
        const x = Number(a.v), y = Number(b.v);
        let r;
        switch (op) {
          case '+': r = x + y; break;
          case '-': r = x - y; break;
          case '*': r = x * y; break;
          case '/':
            if (y === 0) boum(entier ? 'division par zéro : impossible.' : 'division par zéro.', n.ligne);
            r = entier ? Math.trunc(x / y) : x / y;
            break;
          case '%':
            if (y === 0) boum('modulo par zéro : impossible.', n.ligne);
            r = x % y;
            break;
          default: boum('opérateur inconnu : ' + op, n.ligne);
        }
        return { t: entier ? 'int' : 'double', v: r };
      }

      case 'unaire': {
        // &x : on fabrique un pointeur branché sur la case de x
        if (n.op === '&') return { t: 'pointeur', cible: this.evaluerCible(n.e, portee) };
        // *p : on va lire ce qui se trouve à l'adresse pointée
        if (n.op === '*') {
          const p = this.evaluer(n.e, portee);
          if (p && p.t === 'pointeur') return p.cible.lire();
          boum('l\'étoile <code>*</code> ne s\'utilise que sur un pointeur (une variable déclarée avec <code>*</code> et remplie avec <code>&amp;</code>).', n.ligne);
        }
        const v = this.evaluer(n.e, portee);
        if (n.op === '!') return { t: 'boolean', v: !verite(v, n.ligne, this.langage) };
        if (n.op === '-') return { t: v.t === 'double' ? 'double' : 'int', v: -Number(v.v) };
        return v;
      }

      case 'ternaire':
        return verite(this.evaluer(n.cond, portee), n.ligne, this.langage) ? this.evaluer(n.alors, portee) : this.evaluer(n.sinon, portee);

      case 'prefixe': case 'postfixe': {
        const cible = this.evaluerCible(n.cible, portee);
        const avant = cible.lire();
        const delta = n.op === '++' ? 1 : -1;
        const neuf = { t: avant.t, v: Number(avant.v) + delta };
        cible.ecrire(neuf);
        return n.k === 'prefixe' ? neuf : avant;
      }

      case 'affect': {
        const cible = this.evaluerCible(n.cible, portee);
        let v = this.evaluer(n.valeur, portee);
        if (n.op !== '=') {
          const op = n.op[0];
          v = this.evaluer({ k: 'binaire', op, g: { k: 'litt', v: cible.lire() }, d: { k: 'litt', v }, ligne: n.ligne }, portee);
        }
        cible.ecrire(v);
        return v;
      }

      case 'index': {
        const tab = this.evaluer(n.cible, portee);
        const idx = this.evaluer(n.idx, portee);
        if (tab.t !== 'tableau') boum('cette valeur n\'est pas un tableau : impossible d\'utiliser <code>[ ]</code> dessus.', n.ligne);
        const i = Number(idx.v);
        if (i < 0 || i >= tab.v.length) {
          boum('tu essaies d\'accéder à la case ' + i + ' d\'un tableau qui a ' + tab.v.length + ' cases (numérotées de 0 à ' + (tab.v.length - 1) + ').', n.ligne);
        }
        return tab.v[i];
      }

      case 'champ': {
        const o = this.evaluer(n.objet, portee);
        if (o.t === 'tableau' && n.membre === 'length') return { t: 'int', v: o.v.length };
        if (o.t === 'objet') {
          if (!(n.membre in o.champs)) boum('l\'objet n\'a pas de champ <code>' + n.membre + '</code>.', n.ligne);
          return o.champs[n.membre];
        }
        boum('impossible de lire <code>.' + n.membre + '</code> sur cette valeur.', n.ligne);
        break;
      }

      case 'appel': return this.appelFonction(n, portee);
      case 'appelMembre': return this.appelMembre(n, portee);

      case 'nouveau': {
        const cl = this.prog.classes[n.classe];
        if (!cl || cl === true) boum('la classe <code>' + n.classe + '</code> n\'est pas définie.', n.ligne);
        const obj = { t: 'objet', classe: n.classe, champs: {}, def: cl };
        // les champs hérités existent aussi : on remonte la chaîne, ancêtres d'abord
        for (const c of this.ancetres(n.classe)) {
          for (const ch of c.champs) obj.champs[ch.nom] = ch.init ? this.evaluer(ch.init, new Portee(null)) : defautDe(ch.type.base);
        }
        this.appelerConstructeur(cl, obj, n.args.map(a => this.evaluer(a, portee)), n.ligne);
        return obj;
      }
    }
    boum('expression incomprise.', n.ligne);
  };

  // Renvoie de quoi lire ET écrire une case (variable, élément de tableau, champ).
  // lire() est une fonction et non une valeur figée : c'est ce qui permet à un
  // pointeur de rester branché sur la variable d'origine.
  M.evaluerCible = function (n, portee) {
    if (n.k === 'variable') {
      const p = portee.trouver(n.nom);
      if (!p) boum('la variable <code>' + n.nom + '</code> n\'a pas été déclarée. En C et en Java, on écrit son type devant : <code>int ' + n.nom + ' = 0;</code>', n.ligne);
      return { lire: () => p.vars[n.nom], ecrire: v => { p.vars[n.nom] = adapter(p.vars[n.nom], v, n.nom, n.ligne); } };
    }
    if (n.k === 'index') {
      const tab = this.evaluer(n.cible, portee);
      const i = Number(this.evaluer(n.idx, portee).v);
      if (tab.t !== 'tableau') boum('cette valeur n\'est pas un tableau.', n.ligne);
      if (i < 0 || i >= tab.v.length) boum('tu écris dans la case ' + i + ' d\'un tableau qui n\'a que ' + tab.v.length + ' cases (0 à ' + (tab.v.length - 1) + ').', n.ligne);
      return { lire: () => tab.v[i], ecrire: v => { tab.v[i] = adapter(tab.v[i], v, 'case ' + i, n.ligne); } };
    }
    if (n.k === 'champ') {
      const o = this.evaluer(n.objet, portee);
      if (o.t !== 'objet') boum('impossible d\'écrire dans <code>.' + n.membre + '</code>.', n.ligne);
      return { lire: () => o.champs[n.membre], ecrire: v => { o.champs[n.membre] = adapter(o.champs[n.membre], v, n.membre, n.ligne); } };
    }
    // *p = valeur  →  on écrit à l'adresse contenue dans p
    if (n.k === 'unaire' && n.op === '*') {
      const p = this.evaluer(n.e, portee);
      if (p && p.t === 'pointeur') return p.cible;
      boum('l\'étoile <code>*</code> ne s\'utilise que sur un pointeur.', n.ligne);
    }
    boum('on ne peut pas affecter une valeur à cet endroit.', n.ligne);
  };

  /* --- printf et compagnie --- */
  function formater(gabarit, args, ligne) {
    let sortie = '', k = 0;
    for (let i = 0; i < gabarit.length; i++) {
      if (gabarit[i] !== '%') { sortie += gabarit[i]; continue; }
      if (gabarit[i + 1] === '%') { sortie += '%'; i++; continue; }
      let spec = '%';
      i++;
      while (i < gabarit.length && /[-+ 0-9.]/.test(gabarit[i])) spec += gabarit[i++];
      const conv = gabarit[i];
      spec += conv;
      const a = args[k++];
      if (a === undefined) boum('il manque une valeur pour le <code>' + spec + '</code> de ton printf.', ligne);
      const precision = /\.(\d+)/.exec(spec);
      switch (conv) {
        case 'd': case 'i': sortie += String(Math.trunc(Number(a.v))); break;
        case 'f': sortie += Number(a.v).toFixed(precision ? Number(precision[1]) : 6); break;
        case 's': sortie += texte(a); break;
        case 'c': sortie += String(a.v); break;
        case 'b': sortie += texte(a); break;
        case 'n': sortie += '\n'; k--; break;
        default: boum('le format <code>' + spec + '</code> n\'est pas reconnu. Les plus courants : <code>%d</code> (entier), <code>%f</code> (nombre à virgule), <code>%s</code> (texte), <code>%c</code> (caractère).', ligne);
      }
    }
    if (k < args.length) boum('tu donnes ' + args.length + ' valeur(s) à printf mais le texte n\'en attend que ' + k + '.', ligne);
    return sortie;
  }

  M.appelFonction = function (n, portee) {
    const nom = n.nom;
    const args = n.args.map(a => this.evaluer(a, portee));

    // super(...) : appelle le constructeur de la classe parente
    if (nom === 'super') {
      const pMeta = portee.trouver('__classe');
      const pThis = portee.trouver('this');
      const cl = pMeta ? pMeta.vars['__classe'].v : null;
      if (!cl || !cl.parent || !pThis) {
        boum('<code>super(...)</code> ne s\'utilise que dans le constructeur d\'une classe qui hérite d\'une autre (<code>extends</code>).', n.ligne);
      }
      this.appelerConstructeur(this.prog.classes[cl.parent], pThis.vars['this'], args, n.ligne);
      return { t: 'void', v: null };
    }

    if (nom === 'printf') {
      if (!args.length) boum('printf attend au moins un texte à afficher.', n.ligne);
      this.ecrire(formater(String(args[0].v), args.slice(1), n.ligne));
      return { t: 'int', v: 0 };
    }
    if (nom === 'puts') { this.ecrire(texte(args[0]) + '\n'); return { t: 'int', v: 0 }; }
    if (nom === 'strlen') {
      const a = args[0];
      if (a.t === 'tableau') return { t: 'int', v: a.v.length };     // char nom[] = "..."
      return { t: 'int', v: String(a.v).length };
    }
    if (nom === 'sqrt') return { t: 'double', v: Math.sqrt(Number(args[0].v)) };
    if (nom === 'pow') return { t: 'double', v: Math.pow(Number(args[0].v), Number(args[1].v)) };
    if (nom === 'abs' || nom === 'fabs') return { t: args[0].t === 'double' ? 'double' : 'int', v: Math.abs(Number(args[0].v)) };
    if (nom === 'floor') return { t: 'double', v: Math.floor(Number(args[0].v)) };
    if (nom === 'ceil') return { t: 'double', v: Math.ceil(Number(args[0].v)) };

    const f = this.prog.fonctions[nom];
    if (!f) {
      boum('la fonction <code>' + nom + '()</code> n\'existe pas. Vérifie l\'orthographe, ou définis-la avant de l\'appeler.', n.ligne);
    }
    if (args.length !== f.params.length) {
      boum('la fonction <code>' + nom + '</code> attend ' + f.params.length + ' argument(s), tu lui en donnes ' + args.length + '.', n.ligne);
    }
    const p = new Portee(null);
    f.params.forEach((prm, i) => {
      let v = args[i];
      if (estEntier(prm.type.base) && v.t === 'double') v = { t: prm.type.base, v: Math.trunc(v.v) };
      p.declarer(prm.nom, v);
    });
    const r = this.executer(f.corps, p);
    if (r instanceof Retour) {
      let v = r.v;
      if (estEntier(f.type.base) && v.t === 'double') v = { t: f.type.base, v: Math.trunc(v.v) };
      return v;
    }
    return { t: 'void', v: null };
  };

  // Afficher un objet appelle sa méthode toString() si elle existe,
  // exactement comme le fait Java.
  M.enTexte = function (v, ligne) {
    if (v && v.t === 'objet') {
      const trouve = this.trouverMethode(v.def, 'toString');
      if (trouve) {
        const p = this.porteeObjet(v, trouve.classe);
        const r = this.executer(trouve.methode.corps, p);
        if (r instanceof Retour) return texte(r.v);
      }
    }
    return texte(v);
  };

  M.appelMembre = function (n, portee) {
    // System.out.println(...) / System.out.print(...) / System.out.printf(...)
    if (n.objet.k === 'champ' && n.objet.objet.k === 'variable'
      && n.objet.objet.nom === 'System' && n.objet.membre === 'out') {
      const args = n.args.map(a => this.evaluer(a, portee));
      if (n.membre === 'println') { this.ecrire((args.length ? this.enTexte(args[0], n.ligne) : '') + '\n'); return { t: 'void', v: null }; }
      if (n.membre === 'print') { this.ecrire(args.length ? this.enTexte(args[0], n.ligne) : ''); return { t: 'void', v: null }; }
      if (n.membre === 'printf') { this.ecrire(formater(String(args[0].v), args.slice(1), n.ligne)); return { t: 'void', v: null }; }
      boum('<code>System.out.' + n.membre + '</code> n\'est pas reconnu. Utilise <code>println</code>, <code>print</code> ou <code>printf</code>.', n.ligne);
    }

    // Math.xxx(...)
    if (n.objet.k === 'variable' && n.objet.nom === 'Math') {
      const a = n.args.map(x => this.evaluer(x, portee));
      const nb = i => Number(a[i].v);
      switch (n.membre) {
        case 'sqrt': return { t: 'double', v: Math.sqrt(nb(0)) };
        case 'pow': return { t: 'double', v: Math.pow(nb(0), nb(1)) };
        case 'abs': return { t: a[0].t === 'double' ? 'double' : 'int', v: Math.abs(nb(0)) };
        case 'max': return { t: (a[0].t === 'double' || a[1].t === 'double') ? 'double' : 'int', v: Math.max(nb(0), nb(1)) };
        case 'min': return { t: (a[0].t === 'double' || a[1].t === 'double') ? 'double' : 'int', v: Math.min(nb(0), nb(1)) };
        case 'round': return { t: 'int', v: Math.round(nb(0)) };
        case 'floor': return { t: 'double', v: Math.floor(nb(0)) };
        case 'ceil': return { t: 'double', v: Math.ceil(nb(0)) };
        case 'random': return { t: 'double', v: Math.random() };
      }
      boum('<code>Math.' + n.membre + '</code> n\'est pas disponible ici.', n.ligne);
    }

    // Integer.parseInt / String.valueOf
    if (n.objet.k === 'variable' && (n.objet.nom === 'Integer' || n.objet.nom === 'Double')) {
      const a = this.evaluer(n.args[0], portee);
      if (n.membre === 'parseInt') {
        const x = parseInt(String(a.v), 10);
        if (isNaN(x)) boum('<code>Integer.parseInt("' + a.v + '")</code> échoue : ce texte n\'est pas un nombre entier.', n.ligne);
        return { t: 'int', v: x };
      }
      if (n.membre === 'parseDouble') return { t: 'double', v: parseFloat(String(a.v)) };
      if (n.membre === 'toString' || n.membre === 'valueOf') return { t: 'String', v: texte(a) };
    }
    if (n.objet.k === 'variable' && n.objet.nom === 'String' && n.membre === 'valueOf') {
      return { t: 'String', v: texte(this.evaluer(n.args[0], portee)) };
    }

    const cible = this.evaluer(n.objet, portee);
    const args = n.args.map(a => this.evaluer(a, portee));

    // méthodes de String
    if (cible.t === 'String') {
      const s = String(cible.v);
      switch (n.membre) {
        case 'length': return { t: 'int', v: s.length };
        case 'charAt': {
          const i = Number(args[0].v);
          if (i < 0 || i >= s.length) boum('<code>charAt(' + i + ')</code> : ce texte n\'a que ' + s.length + ' caractères (indices 0 à ' + (s.length - 1) + ').', n.ligne);
          return { t: 'char', v: s[i] };
        }
        case 'substring': return { t: 'String', v: args.length > 1 ? s.substring(Number(args[0].v), Number(args[1].v)) : s.substring(Number(args[0].v)) };
        case 'indexOf': return { t: 'int', v: s.indexOf(String(args[0].v)) };
        case 'equals': return { t: 'boolean', v: s === String(args[0].v) };
        case 'equalsIgnoreCase': return { t: 'boolean', v: s.toLowerCase() === String(args[0].v).toLowerCase() };
        case 'toUpperCase': return { t: 'String', v: s.toUpperCase() };
        case 'toLowerCase': return { t: 'String', v: s.toLowerCase() };
        case 'contains': return { t: 'boolean', v: s.includes(String(args[0].v)) };
        case 'trim': return { t: 'String', v: s.trim() };
        case 'isEmpty': return { t: 'boolean', v: s.length === 0 };
        case 'replace': return { t: 'String', v: s.split(String(args[0].v)).join(String(args[1].v)) };
        case 'startsWith': return { t: 'boolean', v: s.startsWith(String(args[0].v)) };
        case 'endsWith': return { t: 'boolean', v: s.endsWith(String(args[0].v)) };
      }
      boum('la méthode <code>' + n.membre + '()</code> n\'existe pas sur un texte.', n.ligne);
    }

    if (cible.t === 'objet') {
      const trouve = this.trouverMethode(cible.def, n.membre);
      if (!trouve) boum('l\'objet de classe <code>' + cible.classe + '</code> n\'a pas de méthode <code>' + n.membre + '()</code>.', n.ligne);
      const p = this.porteeObjet(cible, trouve.classe);
      trouve.methode.params.forEach((prm, i) => p.declarer(prm.nom, args[i] !== undefined ? args[i] : defautDe(prm.type.base)));
      const r = this.executer(trouve.methode.corps, p);
      return r instanceof Retour ? r.v : { t: 'void', v: null };
    }

    boum('impossible d\'appeler <code>' + n.membre + '()</code> sur cette valeur.', n.ligne);
  };

  /* ------------------------- Point d'entrée ------------------------- */
  function executerCJ(langage, source) {
    /* La machine est déclarée HORS du try, et c'est tout l'enjeu : quand le
       programme trébuche en cours de route — division par zéro, case hors du
       tableau, boucle sans fin — ce qu'il a déjà AFFICHÉ doit rester à
       l'écran. C'est souvent la seule chose qui dise à l'élève jusqu'où il
       était allé. Tant qu'elle vivait dans le try, le catch ne pouvait pas
       l'atteindre et renvoyait « logs: [] » en dur : le message d'erreur
       arrivait seul, sans rien avant lui. */
    let machine = null;
    const dejaAffiche = () => {
      if (!machine || !machine.sortie) return [];
      const l = machine.sortie.split('\n');
      if (l.length && l[l.length - 1] === '') l.pop();
      return l;
    };
    try {
      const jetons = decouper(String(source));
      const an = new Analyseur(jetons, langage);
      const prog = an.programme();

      // Java : le point d'entrée est le main d'une classe
      let mainF = prog.fonctions['main'];
      let porteeMain = new Portee(null);

      if (!mainF) {
        for (const nom in prog.classes) {
          const cl = prog.classes[nom];
          if (cl && cl !== true && cl.methodes && cl.methodes['main']) {
            mainF = cl.methodes['main'];
            // Les autres méthodes de la classe porteuse sont appelables
            // directement depuis main (ce sont les méthodes « static ».)
            for (const m in cl.methodes) if (m !== 'main' && !prog.fonctions[m]) prog.fonctions[m] = cl.methodes[m];
            break;
          }
        }
      }
      if (!mainF) {
        boum(langage === 'java'
          ? 'je ne trouve pas le point de départ. Un programme Java commence par :<br><code>public class Main {<br>&nbsp;&nbsp;public static void main(String[] args) { ... }<br>}</code>'
          : 'je ne trouve pas la fonction <code>main</code>. Un programme C commence par :<br><code>int main() { ... return 0; }</code>');
      }

      machine = new Machine(prog, langage);
      for (const g of prog.globales) machine.executer(g, porteeMain);
      const p = new Portee(porteeMain);
      if (mainF.params && mainF.params.length) p.declarer(mainF.params[0].nom, { t: 'tableau', elem: 'String', v: [] });
      machine.executer(mainF.corps, p);

      return { logs: dejaAffiche(), erreur: null };

    } catch (e) {
      if (e && e.cj) return { logs: dejaAffiche(), erreur: e.message + (e.ligne ? ' (ligne ' + e.ligne + ')' : '') };
      return { logs: dejaAffiche(), erreur: 'ton programme n\'a pas pu être exécuté (' + (e && e.message ? e.message : e) + ').' };
    }
  }

  window.executerCJ = executerCJ;
})();
