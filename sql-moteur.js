/* =========================================================================
   Un petit moteur SQL écrit en JavaScript.
   Il comprend le sous-ensemble du langage qu'on enseigne dans le module :
   SELECT / INSERT / UPDATE / DELETE, WHERE, ORDER BY, LIMIT, GROUP BY,
   les fonctions d'agrégat et les jointures simples.
   Les messages d'erreur sont écrits pour un débutant, pas pour un serveur.
   ========================================================================= */
(function () {

  const MOTS_CLES = new Set(['SELECT', 'FROM', 'WHERE', 'ORDER', 'BY', 'ASC', 'DESC', 'LIMIT',
    'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'AND', 'OR', 'NOT', 'NULL', 'IS',
    'LIKE', 'IN', 'AS', 'GROUP', 'DISTINCT', 'JOIN', 'ON', 'INNER', 'LEFT', 'BETWEEN',
    'HAVING', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'UNION', 'ALL', 'OUTER']);
  const AGREGATS = new Set(['COUNT', 'SUM', 'AVG', 'MIN', 'MAX']);

  function ErreurSQL(message) { this.message = message; this.sql = true; }

  function erreur(m) { throw new ErreurSQL(m); }

  /* ---------------- Découpage en jetons ---------------- */
  function decouper(sql) {
    const jetons = [];
    let i = 0;
    while (i < sql.length) {
      const c = sql[i];

      if (/\s/.test(c)) { i++; continue; }

      // commentaires -- jusqu'à la fin de la ligne
      if (c === '-' && sql[i + 1] === '-') { while (i < sql.length && sql[i] !== '\n') i++; continue; }

      // texte entre apostrophes (ou guillemets, tolérés)
      if (c === "'" || c === '"') {
        const fin = c;
        let v = '';
        i++;
        while (i < sql.length) {
          if (sql[i] === fin) {
            if (sql[i + 1] === fin) { v += fin; i += 2; continue; }   // '' = apostrophe échappée
            break;
          }
          v += sql[i++];
        }
        if (i >= sql.length) erreur('un texte a été ouvert avec ' + fin + ' mais jamais refermé.');
        i++;
        jetons.push({ type: 'texte', valeur: v });
        continue;
      }

      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(sql[i + 1] || ''))) {
        let v = '';
        while (i < sql.length && /[0-9.]/.test(sql[i])) v += sql[i++];
        jetons.push({ type: 'nombre', valeur: parseFloat(v) });
        continue;
      }

      if (/[A-Za-zÀ-ÿ_]/.test(c)) {
        let v = '';
        while (i < sql.length && /[A-Za-zÀ-ÿ0-9_]/.test(sql[i])) v += sql[i++];
        const haut = v.toUpperCase();
        jetons.push({ type: MOTS_CLES.has(haut) || AGREGATS.has(haut) ? 'cle' : 'nom', valeur: MOTS_CLES.has(haut) || AGREGATS.has(haut) ? haut : v, brut: v });
        continue;
      }

      // opérateurs à deux caractères
      const deux = sql.substr(i, 2);
      if (['<=', '>=', '<>', '!=', '=='].includes(deux)) {
        if (deux === '==') erreur('en SQL, la comparaison s\'écrit avec UN SEUL signe égal : <code>=</code> (le <code>==</code> vient des langages de programmation).');
        jetons.push({ type: 'op', valeur: deux === '!=' ? '<>' : deux });
        i += 2;
        continue;
      }
      if ('=<>'.includes(c)) { jetons.push({ type: 'op', valeur: c }); i++; continue; }
      if ('(),*.;'.includes(c)) { jetons.push({ type: 'ponct', valeur: c }); i++; continue; }
      if ('+-/%'.includes(c)) { jetons.push({ type: 'op', valeur: c }); i++; continue; }

      erreur('je ne comprends pas le caractère « ' + c +' ».');
    }
    return jetons;
  }

  /* ---------------- Analyse ---------------- */
  function Analyseur(jetons) {
    this.j = jetons;
    this.i = 0;
  }
  Analyseur.prototype.fini = function () { return this.i >= this.j.length; };
  Analyseur.prototype.voir = function (d) { return this.j[this.i + (d || 0)]; };
  Analyseur.prototype.estCle = function (mot, d) {
    const t = this.voir(d);
    return t && t.type === 'cle' && t.valeur === mot;
  };
  Analyseur.prototype.avaler = function (mot) {
    if (!this.estCle(mot)) {
      const t = this.voir();
      erreur('j\'attendais le mot <code>' + mot + '</code>' + (t ? ' mais j\'ai trouvé « ' + (t.brut || t.valeur) + ' »' : ' à la fin de ta requête') + '.');
    }
    this.i++;
  };
  Analyseur.prototype.siCle = function (mot) {
    if (this.estCle(mot)) { this.i++; return true; }
    return false;
  };
  Analyseur.prototype.avalerPonct = function (p) {
    const t = this.voir();
    if (!t || t.type !== 'ponct' || t.valeur !== p) {
      erreur('il manque « ' + p + ' »' + (t ? ' — j\'ai trouvé « ' + (t.brut || t.valeur) + ' » à la place' : ' à la fin de ta requête') + '.');
    }
    this.i++;
  };
  Analyseur.prototype.siPonct = function (p) {
    const t = this.voir();
    if (t && t.type === 'ponct' && t.valeur === p) { this.i++; return true; }
    return false;
  };
  Analyseur.prototype.nom = function (quoi) {
    const t = this.voir();
    if (!t || (t.type !== 'nom')) {
      erreur('j\'attendais ' + (quoi || 'un nom') + (t ? ' mais j\'ai trouvé « ' + (t.brut || t.valeur) + ' »' : ' à la fin de ta requête') + '.');
    }
    this.i++;
    return t.brut;
  };

  // Expression : OR < AND < NOT < comparaison < terme
  Analyseur.prototype.expression = function () { return this.ou(); };
  Analyseur.prototype.ou = function () {
    let g = this.et();
    while (this.siCle('OR')) g = { k: 'bin', op: 'OR', g, d: this.et() };
    return g;
  };
  Analyseur.prototype.et = function () {
    let g = this.non();
    while (this.siCle('AND')) g = { k: 'bin', op: 'AND', g, d: this.non() };
    return g;
  };
  Analyseur.prototype.non = function () {
    if (this.siCle('NOT')) return { k: 'non', e: this.non() };
    return this.comparaison();
  };
  Analyseur.prototype.comparaison = function () {
    const g = this.terme();

    // « NOT IN », « NOT LIKE », « NOT BETWEEN » : on note la négation
    // puis on laisse le traitement normal faire son travail.
    if (this.estCle('NOT') && (this.estCle('IN', 1) || this.estCle('LIKE', 1) || this.estCle('BETWEEN', 1))) {
      this.i++;
      const dedans = this.suiteComparaison(g);
      return { k: 'non', e: dedans };
    }
    return this.suiteComparaison(g);
  };

  Analyseur.prototype.suiteComparaison = function (g) {
    const t = this.voir();

    if (t && t.type === 'op' && ['=', '<', '>', '<=', '>=', '<>'].includes(t.valeur)) {
      this.i++;
      return { k: 'bin', op: t.valeur, g, d: this.terme() };
    }
    if (this.estCle('IS')) {
      this.i++;
      const nie = this.siCle('NOT');
      this.avaler('NULL');
      return { k: 'estNul', e: g, nie };
    }
    if (this.estCle('LIKE')) {
      this.i++;
      return { k: 'like', e: g, motif: this.terme() };
    }
    if (this.estCle('IN')) {
      this.i++;
      this.avalerPonct('(');
      // IN (SELECT …) : la liste des valeurs vient d'une autre requête
      if (this.siCle('SELECT')) {
        const res = executerSelect(this, this.base);
        this.avalerPonct(')');
        return { k: 'dans', e: g, liste: res.lignes.map(l => ({ k: 'litt', v: l[0] })) };
      }
      const liste = [this.terme()];
      while (this.siPonct(',')) liste.push(this.terme());
      this.avalerPonct(')');
      return { k: 'dans', e: g, liste };
    }
    if (this.estCle('BETWEEN')) {
      this.i++;
      const bas = this.terme();
      this.avaler('AND');
      return { k: 'entre', e: g, bas, haut: this.terme() };
    }
    return g;
  };
  Analyseur.prototype.terme = function () {
    let g = this.facteur();
    while (true) {
      const t = this.voir();
      if (t && t.type === 'op' && ['+', '-', '*', '/', '%'].includes(t.valeur)) {
        this.i++;
        g = { k: 'bin', op: t.valeur, g, d: this.facteur() };
      } else break;
    }
    return g;
  };
  Analyseur.prototype.facteur = function () {
    const t = this.voir();
    if (!t) erreur('ta requête s\'arrête au milieu d\'une expression.');

    if (t.type === 'ponct' && t.valeur === '(') {
      // (SELECT …) : une sous-requête. On l'exécute tout de suite — elle ne
      // dépend pas de la ligne courante — et on garde son résultat.
      if (this.estCle('SELECT', 1)) {
        this.i++;                       // la parenthèse
        this.avaler('SELECT');          // executerSelect attend le mot déjà consommé
        const res = executerSelect(this, this.base);
        this.avalerPonct(')');
        const valeurs = res.lignes.map(l => l[0]);
        if (res.lignes.length === 1 && res.colonnes.length === 1) return { k: 'litt', v: valeurs[0] };
        return { k: 'liste', valeurs };
      }
      this.i++;
      const e = this.expression();
      this.avalerPonct(')');
      return e;
    }

    // CASE WHEN condition THEN valeur … ELSE valeur END
    if (t.type === 'cle' && t.valeur === 'CASE') {
      this.i++;
      const branches = [];
      while (this.siCle('WHEN')) {
        const cond = this.expression();
        this.avaler('THEN');
        branches.push({ cond, val: this.expression() });
      }
      if (!branches.length) erreur('un <code>CASE</code> doit contenir au moins un <code>WHEN … THEN …</code>.');
      let sinon = null;
      if (this.siCle('ELSE')) sinon = this.expression();
      this.avaler('END');
      return { k: 'cas', branches, sinon };
    }

    if (t.type === 'nombre') { this.i++; return { k: 'litt', v: t.valeur }; }
    if (t.type === 'texte') { this.i++; return { k: 'litt', v: t.valeur }; }
    if (t.type === 'cle' && t.valeur === 'NULL') { this.i++; return { k: 'litt', v: null }; }
    if (t.type === 'op' && t.valeur === '-') { this.i++; return { k: 'neg', e: this.facteur() }; }

    if (t.type === 'cle' && AGREGATS.has(t.valeur)) {
      this.i++;
      this.avalerPonct('(');
      let arg = null;
      if (this.siPonct('*')) arg = { k: 'etoile' };
      else arg = this.expression();
      this.avalerPonct(')');
      return { k: 'agg', fn: t.valeur, arg };
    }
    if (t.type === 'ponct' && t.valeur === '*') { this.i++; return { k: 'etoile' }; }

    if (t.type === 'nom') {
      this.i++;
      // table.colonne
      if (this.voir() && this.voir().type === 'ponct' && this.voir().valeur === '.') {
        this.i++;
        const col = this.nom('un nom de colonne après le point');
        return { k: 'col', table: t.brut, nom: col };
      }
      return { k: 'col', nom: t.brut };
    }
    erreur('« ' + (t.brut || t.valeur) + ' » n\'est pas attendu ici.');
  };

  /* ---------------- Évaluation ---------------- */
  function memeTexte(a, b) { return String(a).toLowerCase() === String(b).toLowerCase(); }

  function comparer(a, b) {
    if (a === null || a === undefined) return b === null || b === undefined ? 0 : -1;
    if (b === null || b === undefined) return 1;
    if (typeof a === 'number' && typeof b === 'number') return a - b;
    return String(a).localeCompare(String(b), 'fr', { sensitivity: 'base' });
  }

  function motifLike(motif) {
    const echappe = String(motif).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('^' + echappe.replace(/%/g, '.*').replace(/_/g, '.') + '$', 'i');
  }

  function valeur(noeud, ligne, ctx) {
    switch (noeud.k) {
      case 'litt': return noeud.v;
      case 'neg': return -valeur(noeud.e, ligne, ctx);
      case 'etoile': return 1;
      case 'liste':
        erreur('cette sous-requête renvoie plusieurs lignes : elle ne peut servir qu\'avec <code>IN (…)</code>, pas dans une comparaison simple.');
        break;
      case 'cas': {
        for (const b of noeud.branches) {
          if (verite(valeur(b.cond, ligne, ctx))) return valeur(b.val, ligne, ctx);
        }
        return noeud.sinon ? valeur(noeud.sinon, ligne, ctx) : null;
      }
      case 'col': {
        const cle = noeud.table ? noeud.table + '.' + noeud.nom : noeud.nom;
        if (ligne && Object.prototype.hasOwnProperty.call(ligne, cle)) return ligne[cle];
        // recherche insensible à la casse et au préfixe de table
        if (ligne) {
          for (const k in ligne) {
            if (memeTexte(k, cle)) return ligne[k];
            if (!noeud.table && memeTexte(k.split('.').pop(), noeud.nom)) return ligne[k];
          }
        }
        erreur('la colonne <code>' + cle + '</code> n\'existe pas' + (ctx && ctx.colonnes ? '. Colonnes disponibles : ' + ctx.colonnes.join(', ') : '') + '.');
        break;
      }
      case 'agg': {
        if (!ligne || !('__agg' in ligne)) erreur('la fonction <code>' + noeud.fn + '()</code> ne peut pas s\'utiliser ici (elle sert à résumer un groupe de lignes, dans SELECT ou HAVING).');
        return ligne.__agg(noeud);
      }
      case 'non': return !verite(valeur(noeud.e, ligne, ctx));
      case 'estNul': {
        const v = valeur(noeud.e, ligne, ctx);
        const nul = v === null || v === undefined || v === '';
        return noeud.nie ? !nul : nul;
      }
      case 'like': return motifLike(valeur(noeud.motif, ligne, ctx)).test(String(valeur(noeud.e, ligne, ctx)));
      case 'dans': {
        const v = valeur(noeud.e, ligne, ctx);
        return noeud.liste.some(x => comparer(v, valeur(x, ligne, ctx)) === 0);
      }
      case 'entre': {
        const v = valeur(noeud.e, ligne, ctx);
        return comparer(v, valeur(noeud.bas, ligne, ctx)) >= 0 && comparer(v, valeur(noeud.haut, ligne, ctx)) <= 0;
      }
      case 'bin': {
        const op = noeud.op;
        if (op === 'AND') return verite(valeur(noeud.g, ligne, ctx)) && verite(valeur(noeud.d, ligne, ctx));
        if (op === 'OR') return verite(valeur(noeud.g, ligne, ctx)) || verite(valeur(noeud.d, ligne, ctx));
        const a = valeur(noeud.g, ligne, ctx), b = valeur(noeud.d, ligne, ctx);
        switch (op) {
          case '=': return comparer(a, b) === 0;
          case '<>': return comparer(a, b) !== 0;
          case '<': return comparer(a, b) < 0;
          case '>': return comparer(a, b) > 0;
          case '<=': return comparer(a, b) <= 0;
          case '>=': return comparer(a, b) >= 0;
          case '+': return Number(a) + Number(b);
          case '-': return Number(a) - Number(b);
          case '*': return Number(a) * Number(b);
          case '/': return Number(b) === 0 ? null : Number(a) / Number(b);
          case '%': return Number(a) % Number(b);
        }
        break;
      }
    }
    erreur('expression incomprise.');
  }

  function verite(v) { return !(v === false || v === null || v === undefined || v === 0 || v === ''); }

  function etiquette(noeud) {
    if (noeud.alias) return noeud.alias;
    switch (noeud.k) {
      case 'col': return noeud.table ? noeud.table + '.' + noeud.nom : noeud.nom;
      case 'agg': return noeud.fn + '(' + (noeud.arg.k === 'etoile' ? '*' : etiquette(noeud.arg)) + ')';
      case 'litt': return String(noeud.v);
      case 'bin': return etiquette(noeud.g) + ' ' + noeud.op + ' ' + etiquette(noeud.d);
      default: return 'valeur';
    }
  }

  /* ---------------- Exécution ---------------- */
  function trouverTable(base, nom) {
    if (base[nom]) return nom;
    for (const k in base) if (memeTexte(k, nom)) return k;
    erreur('la table <code>' + nom + '</code> n\'existe pas. Tables disponibles : ' + Object.keys(base).map(t => '<code>' + t + '</code>').join(', ') + '.');
  }

  function colonnesDe(base, nomTable) {
    const t = base[nomTable];
    return t.colonnes ? t.colonnes.slice() : (t.lignes[0] ? Object.keys(t.lignes[0]) : []);
  }

  function executerSelect(a, base) {
    // --- colonnes demandées ---
    const distinct = a.siCle('DISTINCT');
    const projections = [];
    do {
      const e = a.expression();
      if (a.siCle('AS')) e.alias = a.nom('un nom après AS');
      else if (a.voir() && a.voir().type === 'nom') e.alias = a.nom();
      projections.push(e);
    } while (a.siPonct(','));

    a.avaler('FROM');
    const nomTable = trouverTable(base, a.nom('un nom de table après FROM'));
    let colonnes = colonnesDe(base, nomTable);
    let lignes = base[nomTable].lignes.map(l => Object.assign({}, l));

    // préfixe table.colonne disponible aussi
    lignes.forEach(l => { for (const c of colonnes) l[nomTable + '.' + c] = l[c]; });

    // --- jointures : INNER JOIN (par défaut) et LEFT JOIN ---
    while (true) {
      const gauche = a.siCle('LEFT');
      if (gauche) a.siCle('OUTER');
      else a.siCle('INNER');
      if (!a.siCle('JOIN')) {
        if (gauche) erreur('après <code>LEFT</code>, j\'attends le mot <code>JOIN</code>.');
        break;
      }
      const nom2 = trouverTable(base, a.nom('un nom de table après JOIN'));
      a.avaler('ON');
      const cond = a.expression();
      const cols2 = colonnesDe(base, nom2);
      const jointes = [];
      for (const g of lignes) {
        let apparie = false;
        for (const d of base[nom2].lignes) {
          const fusion = Object.assign({}, g);
          for (const c of cols2) { fusion[nom2 + '.' + c] = d[c]; if (!(c in fusion)) fusion[c] = d[c]; }
          if (verite(valeur(cond, fusion, { colonnes }))) { jointes.push(fusion); apparie = true; }
        }
        // LEFT JOIN : une ligne sans correspondance est conservée, colonnes à NULL
        if (gauche && !apparie) {
          const seul = Object.assign({}, g);
          for (const c of cols2) { seul[nom2 + '.' + c] = null; if (!(c in seul)) seul[c] = null; }
          jointes.push(seul);
        }
      }
      lignes = jointes;
      colonnes = colonnes.concat(cols2.filter(c => colonnes.indexOf(c) === -1));
    }

    const ctx = { colonnes };

    // --- WHERE ---
    if (a.siCle('WHERE')) {
      const cond = a.expression();
      lignes = lignes.filter(l => verite(valeur(cond, l, ctx)));
    }

    // --- GROUP BY ---
    let groupes = null;
    if (a.siCle('GROUP')) {
      a.avaler('BY');
      const cles = [a.expression()];
      while (a.siPonct(',')) cles.push(a.expression());
      const paquets = new Map();
      for (const l of lignes) {
        const signature = cles.map(c => String(valeur(c, l, ctx))).join('');
        if (!paquets.has(signature)) paquets.set(signature, []);
        paquets.get(signature).push(l);
      }
      groupes = [...paquets.values()];
    } else if (projections.some(p => contientAgregat(p))) {
      groupes = lignes.length ? [lignes] : [[]];
    }

    // --- Construction des lignes de résultat ---
    // On garde chaque ligne produite avec la ligne d'origine qui l'a créée :
    // ORDER BY doit pouvoir trier sur une colonne absente du SELECT.
    const entetes = projections.some(p => p.k === 'etoile')
      ? colonnes
      : projections.map(etiquette);

    // --- HAVING : filtre les GROUPES (là où WHERE filtre les lignes) ---
    if (a.estCle('HAVING')) {
      a.i++;
      if (!groupes) erreur('<code>HAVING</code> filtre des groupes : il faut un <code>GROUP BY</code> avant, ou une fonction comme <code>COUNT()</code> dans le SELECT.');
      const cond = a.expression();
      groupes = groupes.filter(paquet => {
        const contexte = Object.assign({}, paquet[0] || {});
        contexte.__agg = (noeud) => calculerAgregat(noeud, paquet, ctx);
        return verite(valeur(cond, contexte, ctx));
      });
    }

    let paires;
    if (groupes) {
      paires = groupes.map(paquet => {
        const modele = paquet[0] || {};
        const contexte = Object.assign({}, modele);
        contexte.__agg = (noeud) => calculerAgregat(noeud, paquet, ctx);
        const sortie = {};
        projections.forEach((p, idx) => {
          if (p.k === 'etoile') { for (const c of colonnes) sortie[c] = modele[c]; }
          else sortie[entetes[idx]] = valeur(p, contexte, ctx);
        });
        return { sortie, source: contexte };
      });
    } else {
      paires = lignes.map(l => {
        const sortie = {};
        projections.forEach((p, idx) => {
          if (p.k === 'etoile') { for (const c of colonnes) sortie[c] = l[c]; }
          else sortie[entetes[idx]] = valeur(p, l, ctx);
        });
        return { sortie, source: l };
      });
    }

    if (distinct) {
      const vus = new Set();
      paires = paires.filter(p => {
        const s = JSON.stringify(p.sortie);
        if (vus.has(s)) return false;
        vus.add(s);
        return true;
      });
    }

    // --- ORDER BY ---
    if (a.siCle('ORDER')) {
      a.avaler('BY');
      const tris = [];
      do {
        const e = a.expression();
        let sens = 1;
        if (a.siCle('DESC')) sens = -1; else a.siCle('ASC');
        tris.push({ e, sens, cle: etiquette(e) });
      } while (a.siPonct(','));

      paires.sort((x, y) => {
        for (const t of tris) {
          // on trie sur la colonne affichée si elle existe, sinon sur la donnée d'origine
          const vx = (t.cle in x.sortie) ? x.sortie[t.cle] : valeur(t.e, x.source, ctx);
          const vy = (t.cle in y.sortie) ? y.sortie[t.cle] : valeur(t.e, y.source, ctx);
          const c = comparer(vx, vy);
          if (c !== 0) return c * t.sens;
        }
        return 0;
      });
    }

    // --- LIMIT ---
    if (a.siCle('LIMIT')) {
      const n = a.expression();
      paires = paires.slice(0, Number(valeur(n, null, ctx)));
    }

    const resultat = paires.map(p => p.sortie);
    const colonnesSortie = resultat.length ? Object.keys(resultat[0]) : entetes;
    return {
      type: 'select',
      colonnes: colonnesSortie,
      lignes: resultat.map(l => colonnesSortie.map(c => l[c])),
      objets: resultat,
      message: resultat.length + (resultat.length > 1 ? ' lignes trouvées' : ' ligne trouvée')
    };
  }

  function contientAgregat(n) {
    if (!n || typeof n !== 'object') return false;
    if (n.k === 'agg') return true;
    return contientAgregat(n.g) || contientAgregat(n.d) || contientAgregat(n.e) || contientAgregat(n.arg);
  }

  function calculerAgregat(noeud, paquet, ctx) {
    const fn = noeud.fn;
    if (fn === 'COUNT') {
      if (noeud.arg.k === 'etoile') return paquet.length;
      return paquet.filter(l => { const v = valeur(noeud.arg, l, ctx); return v !== null && v !== undefined && v !== ''; }).length;
    }
    const valeurs = paquet.map(l => valeur(noeud.arg, l, ctx)).filter(v => v !== null && v !== undefined && v !== '');
    if (!valeurs.length) return null;
    // Les nombres à virgule accumulent des miettes (7.8999999999999995) :
    // on les efface, sinon la leçon sur les moyennes devient incompréhensible.
    const propre = x => Math.round(x * 1e6) / 1e6;
    if (fn === 'SUM') return propre(valeurs.reduce((s, v) => s + Number(v), 0));
    if (fn === 'AVG') return propre(valeurs.reduce((s, v) => s + Number(v), 0) / valeurs.length);
    if (fn === 'MIN') return valeurs.reduce((m, v) => comparer(v, m) < 0 ? v : m);
    if (fn === 'MAX') return valeurs.reduce((m, v) => comparer(v, m) > 0 ? v : m);
    erreur('fonction inconnue : ' + fn);
  }

  function executerInsert(a, base) {
    a.avaler('INTO');
    const nomTable = trouverTable(base, a.nom('un nom de table après INTO'));
    const dispo = colonnesDe(base, nomTable);
    let cibles = dispo;
    if (a.siPonct('(')) {
      cibles = [a.nom('un nom de colonne')];
      while (a.siPonct(',')) cibles.push(a.nom('un nom de colonne'));
      a.avalerPonct(')');
      for (const c of cibles) {
        if (!dispo.some(d => memeTexte(d, c))) erreur('la colonne <code>' + c + '</code> n\'existe pas dans <code>' + nomTable + '</code>. Colonnes : ' + dispo.join(', ') + '.');
      }
    }
    a.avaler('VALUES');
    let ajoutees = 0;
    do {
      a.avalerPonct('(');
      const vals = [a.expression()];
      while (a.siPonct(',')) vals.push(a.expression());
      a.avalerPonct(')');
      if (vals.length !== cibles.length) {
        erreur('tu donnes ' + vals.length + ' valeur(s) pour ' + cibles.length + ' colonne(s) (' + cibles.join(', ') + '). Il en faut autant des deux côtés.');
      }
      const ligne = {};
      for (const c of dispo) ligne[c] = null;
      cibles.forEach((c, k) => {
        const vraiNom = dispo.find(d => memeTexte(d, c)) || c;
        ligne[vraiNom] = valeur(vals[k], null, { colonnes: dispo });
      });
      base[nomTable].lignes.push(ligne);
      ajoutees++;
    } while (a.siPonct(','));

    return { type: 'insert', colonnes: [], lignes: [], modifiees: ajoutees, message: ajoutees + (ajoutees > 1 ? ' lignes ajoutées' : ' ligne ajoutée') + ' dans ' + nomTable };
  }

  function executerUpdate(a, base) {
    const nomTable = trouverTable(base, a.nom('un nom de table après UPDATE'));
    const dispo = colonnesDe(base, nomTable);
    a.avaler('SET');
    const affectations = [];
    do {
      const col = a.nom('un nom de colonne');
      if (!dispo.some(d => memeTexte(d, col))) erreur('la colonne <code>' + col + '</code> n\'existe pas dans <code>' + nomTable + '</code>. Colonnes : ' + dispo.join(', ') + '.');
      const t = a.voir();
      if (!t || t.type !== 'op' || t.valeur !== '=') erreur('il manque le <code>=</code> après <code>' + col + '</code> (on écrit <code>SET colonne = valeur</code>).');
      a.i++;
      affectations.push({ col: dispo.find(d => memeTexte(d, col)), e: a.expression() });
    } while (a.siPonct(','));

    let cond = null;
    if (a.siCle('WHERE')) cond = a.expression();

    let n = 0;
    for (const l of base[nomTable].lignes) {
      if (cond && !verite(valeur(cond, l, { colonnes: dispo }))) continue;
      for (const af of affectations) l[af.col] = valeur(af.e, l, { colonnes: dispo });
      n++;
    }
    return {
      type: 'update', colonnes: [], lignes: [], modifiees: n,
      message: n + (n > 1 ? ' lignes modifiées' : ' ligne modifiée') + (cond ? '' : ' (aucun WHERE : toute la table !)')
    };
  }

  function executerDelete(a, base) {
    a.avaler('FROM');
    const nomTable = trouverTable(base, a.nom('un nom de table après FROM'));
    const dispo = colonnesDe(base, nomTable);
    let cond = null;
    if (a.siCle('WHERE')) cond = a.expression();
    const avant = base[nomTable].lignes.length;
    base[nomTable].lignes = base[nomTable].lignes.filter(l => cond ? !verite(valeur(cond, l, { colonnes: dispo })) : false);
    const n = avant - base[nomTable].lignes.length;
    return {
      type: 'delete', colonnes: [], lignes: [], modifiees: n,
      message: n + (n > 1 ? ' lignes supprimées' : ' ligne supprimée') + (cond ? '' : ' (aucun WHERE : toute la table !)')
    };
  }

  /* ---------------- Point d'entrée ---------------- */
  function executerSQL(sql, base) {
    const propre = String(sql).trim().replace(/;\s*$/, '');
    if (!propre) return { erreur: 'ta requête est vide.' };
    try {
      const jetons = decouper(propre);
      if (!jetons.length) return { erreur: 'ta requête est vide.' };
      const a = new Analyseur(jetons);
      a.base = base;                     // nécessaire aux sous-requêtes
      const premier = a.voir();

      let res;
      if (a.siCle('SELECT')) {
        res = executerSelect(a, base);
        // --- UNION : empile les résultats de deux requêtes ---
        while (a.estCle('UNION')) {
          a.i++;
          const tout = a.siCle('ALL');
          a.avaler('SELECT');
          const suite = executerSelect(a, base);
          if (suite.colonnes.length !== res.colonnes.length) {
            return { erreur: 'les deux requêtes d\'un <code>UNION</code> doivent renvoyer le même nombre de colonnes (' + res.colonnes.length + ' d\'un côté, ' + suite.colonnes.length + ' de l\'autre).', colonnes: [], lignes: [] };
          }
          res.lignes = res.lignes.concat(suite.lignes);
          if (!tout) {
            const vus = new Set();
            res.lignes = res.lignes.filter(l => {
              const s = JSON.stringify(l);
              if (vus.has(s)) return false;
              vus.add(s);
              return true;
            });
          }
          res.message = res.lignes.length + (res.lignes.length > 1 ? ' lignes trouvées' : ' ligne trouvée');
        }
      }
      else if (a.siCle('INSERT')) res = executerInsert(a, base);
      else if (a.siCle('UPDATE')) res = executerUpdate(a, base);
      else if (a.siCle('DELETE')) res = executerDelete(a, base);
      else {
        return { erreur: 'une requête commence par <code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code> ou <code>DELETE</code> — j\'ai trouvé « ' + (premier.brut || premier.valeur) + ' ».' };
      }

      if (!a.fini() && !(a.voir().type === 'ponct' && a.voir().valeur === ';')) {
        const t = a.voir();
        return { erreur: 'je ne comprends pas « ' + (t.brut || t.valeur) + ' » à la fin de ta requête. Vérifie l\'ordre des mots-clés : SELECT … FROM … WHERE … GROUP BY … ORDER BY … LIMIT.' };
      }
      res.erreur = null;
      return res;
    } catch (e) {
      if (e && e.sql) return { erreur: e.message, colonnes: [], lignes: [] };
      return { erreur: 'requête impossible à exécuter (' + (e && e.message ? e.message : e) + ').', colonnes: [], lignes: [] };
    }
  }

  // Copie profonde : chaque exercice repart d'une base intacte
  function clonerBase(base) {
    const copie = {};
    for (const nom in base) {
      copie[nom] = {
        colonnes: base[nom].colonnes.slice(),
        lignes: base[nom].lignes.map(l => Object.assign({}, l))
      };
    }
    return copie;
  }

  window.executerSQL = executerSQL;
  window.clonerBase = clonerBase;
})();
