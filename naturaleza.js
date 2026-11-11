/* Elementos naturales en movimiento: pasto, roca con musgo flotante, hojas y polvo, enredadera que crece al leer y grietas que se abren. */
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var DPR = Math.min(2, window.devicePixelRatio || 1);
  function rnd(seed) { var s = seed % 2147483647; if (s <= 0) s += 2147483646; return function () { s = s * 16807 % 2147483647; return (s - 1) / 2147483646; }; }
  function fit(cv) {
    var r = cv.getBoundingClientRect();
    cv.width = Math.max(1, Math.round(r.width * DPR)); cv.height = Math.max(1, Math.round(r.height * DPR));
    var c = cv.getContext('2d'); c.setTransform(DPR, 0, 0, DPR, 0, 0); return { c: c, w: r.width, h: r.height };
  }
  var loops = [];
  var visible = new Map();
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) { es.forEach(function (e) { visible.set(e.target, e.isIntersecting); }); }, { rootMargin: '120px' }) : null;
  function register(cv, setup, frame) {
    var st = { cv: cv, setup: setup, frame: frame, g: null };
    st.g = fit(cv); setup(st);
    if (io) io.observe(cv); else visible.set(cv, true);
    loops.push(st);
    window.addEventListener('resize', function () { st.g = fit(cv); setup(st); if (reduce) frame(st, 0); });
    if (reduce) { frame(st, 0); }
  }
  var t0 = performance.now();
  function tick(now) {
    var t = (now - t0) / 1000;
    loops.forEach(function (st) { if (visible.get(st.cv) !== false) st.frame(st, t); });
    requestAnimationFrame(tick);
  }

  /* ---------- pasto que se mece ---------- */
  var GREENS = ['#14281a', '#1d3a22', '#24452a', '#2d5531', '#3b6a3a', '#4f7a3f'];
  document.querySelectorAll('canvas.pasto').forEach(function (cv, idx) {
    register(cv, function (st) {
      var R = rnd(97 + idx * 31), w = st.g.w, h = st.g.h, n = Math.round(w / 3.2);
      st.blades = [];
      for (var i = 0; i < n; i++) {
        var x = R() * w, layer = R();
        st.blades.push({ x: x, h: h * (0.25 + 0.75 * R()) * (0.55 + layer * 0.45), w: 1.5 + R() * 3.2, ph: R() * 6.28, col: GREENS[Math.floor(layer * GREENS.length)], tip: R() < 0.05, lean: (R() - 0.5) * 0.5, layer: layer });
      }
      st.blades.sort(function (a, b) { return a.layer - b.layer; });
      st.flowers = [];
      for (var k = 0; k < Math.round(w / 140); k++) st.flowers.push({ x: R() * w, h: h * (0.35 + R() * 0.4), ph: R() * 6, c: R() < 0.5 ? '#E9E7B8' : '#C8F25A' });
    }, function (st, t) {
      var c = st.g.c, w = st.g.w, h = st.g.h;
      c.clearRect(0, 0, w, h);
      st.blades.forEach(function (b) {
        var sway = (reduce ? 0.3 : Math.sin(t * 1.3 + b.ph + b.x * 0.012)) * b.h * 0.22 + b.lean * b.h;
        var tx = b.x + sway, ty = h - b.h;
        c.beginPath(); c.moveTo(b.x - b.w, h + 1);
        c.quadraticCurveTo(b.x - b.w * 0.3 + sway * 0.4, h - b.h * 0.5, tx, ty);
        c.quadraticCurveTo(b.x + b.w * 0.3 + sway * 0.4, h - b.h * 0.5, b.x + b.w, h + 1);
        c.closePath(); c.fillStyle = b.tip ? '#9cc84f' : b.col; c.fill();
      });
      st.flowers.forEach(function (f) {
        var sway = (reduce ? 0 : Math.sin(t * 1.1 + f.ph)) * 6;
        var x = f.x + sway, y = h - f.h;
        c.strokeStyle = '#3b6a3a'; c.lineWidth = 1.2; c.beginPath(); c.moveTo(f.x, h); c.quadraticCurveTo(f.x, y + f.h * 0.4, x, y); c.stroke();
        c.fillStyle = f.c; for (var p = 0; p < 5; p++) { var a = p / 5 * 6.28 + t * 0.2; c.beginPath(); c.arc(x + Math.cos(a) * 3, y + Math.sin(a) * 3, 2.4, 0, 6.28); c.fill(); }
        c.fillStyle = '#B98A5E'; c.beginPath(); c.arc(x, y, 1.8, 0, 6.28); c.fill();
      });
    });
  });

  /* ---------- hojas y polvo ---------- */
  document.querySelectorAll('canvas.hojas').forEach(function (cv, idx) {
    register(cv, function (st) {
      var R = rnd(11 + idx), w = st.g.w, h = st.g.h;
      st.R = R; st.p = [];
      for (var i = 0; i < 26; i++) st.p.push(make(true));
      function make(init) {
        var leaf = R() < 0.45;
        return { leaf: leaf, x: R() * w, y: init ? R() * h : -20, s: leaf ? 5 + R() * 6 : 1 + R() * 1.8, vy: leaf ? 14 + R() * 18 : 4 + R() * 6, vx: 6 + R() * 14, rot: R() * 6.28, vr: (R() - 0.5) * 2, ph: R() * 6, col: leaf ? ['#6a9c4b', '#9cc84f', '#B98A5E', '#C8F25A'][Math.floor(R() * 4)] : 'rgba(232,230,200,0.55)' };
      }
      st.make = make;
    }, function (st, t) {
      var c = st.g.c, w = st.g.w, h = st.g.h;
      var dt = st.last ? Math.min(0.05, t - st.last) : 0.016; st.last = t;
      c.clearRect(0, 0, w, h);
      st.p.forEach(function (p, i) {
        if (!reduce) { p.y += p.vy * dt; p.x += (p.vx + Math.sin(t + p.ph) * 18) * dt; p.rot += p.vr * dt; }
        if (p.y > h + 20 || p.x > w + 20) st.p[i] = st.make(false);
        c.save(); c.translate(p.x, p.y); c.rotate(p.rot);
        if (p.leaf) {
          c.fillStyle = p.col; c.globalAlpha = 0.85;
          c.beginPath(); c.moveTo(-p.s, 0); c.quadraticCurveTo(0, -p.s * 0.7, p.s, 0); c.quadraticCurveTo(0, p.s * 0.7, -p.s, 0); c.fill();
          c.strokeStyle = 'rgba(0,0,0,0.25)'; c.lineWidth = 0.6; c.beginPath(); c.moveTo(-p.s, 0); c.lineTo(p.s, 0); c.stroke();
        } else { c.fillStyle = p.col; c.beginPath(); c.arc(0, 0, p.s, 0, 6.28); c.fill(); }
        c.restore();
      });
    });
  });

  /* ---------- roca con musgo flotante (con temblor periódico) ---------- */
  document.querySelectorAll('canvas.roca').forEach(function (cv, idx) {
    register(cv, function (st) {
      var R = rnd(523 + idx * 7), w = st.g.w, h = st.g.h;
      var rx = Math.min(w * 0.44, h * 0.52), ry = rx * 0.3;
      st.geo = { cx: w / 2, cy: h * 0.38, rx: rx, ry: ry };
      var N = 44; st.edge = [];
      for (var i = 0; i < N; i++) { var a = i / N * 6.283; st.edge.push({ a: a, r: 0.88 + R() * 0.16 }); }
      st.tip = { x: (R() - 0.5) * rx * 0.2, y: rx * 0.8 };
      st.facets = []; for (var f = 0; f < 9; f++) st.facets.push({ a: 0.15 + R() * 2.85, k: 0.3 + R() * 0.5 });
      st.moss = []; for (var m = 0; m < 260; m++) { var ang = R() * 6.283, rr = Math.sqrt(R()); st.moss.push({ x: Math.cos(ang) * rr, y: Math.sin(ang) * rr, s: 1.5 + R() * 3.5, c: GREENS[1 + Math.floor(R() * 5)] }); }
      st.moss.sort(function (a, b) { return a.y - b.y; });
      st.grass = []; for (var g = 0; g < 70; g++) { var ga = R() * 6.283; st.grass.push({ a: ga, r: 0.55 + R() * 0.45, h: 6 + R() * 18, ph: R() * 6, c: GREENS[3 + Math.floor(R() * 3)] }); }
      st.trees = []; for (var tr = 0; tr < 3; tr++) st.trees.push({ x: (R() - 0.5) * 1.1, y: (R() - 0.6) * 0.8, s: 0.6 + R() * 0.5 });
      st.roots = []; for (var q = 0; q < 6; q++) st.roots.push({ a: 0.5 + R() * 2.1, len: 30 + R() * 70, ph: R() * 6 });
      st.crumbs = []; st.R = R; st.nextQuake = 4;
    }, function (st, t) {
      var c = st.g.c, w = st.g.w, h = st.g.h, G = st.geo;
      var dt = st.last ? Math.min(0.05, t - st.last) : 0.016; st.last = t;
      c.clearRect(0, 0, w, h);
      var quake = 0;
      if (!reduce) { if (t > st.nextQuake && t < st.nextQuake + 0.9) quake = 1 - (t - st.nextQuake) / 0.9; if (t > st.nextQuake + 0.9) st.nextQuake = t + 6 + st.R() * 4; }
      var bob = reduce ? 0 : Math.sin(t * 0.9) * 6;
      var sx = quake ? (st.R() - 0.5) * 7 * quake : 0, sy = quake ? (st.R() - 0.5) * 4 * quake : 0;
      var cx = G.cx + sx, cy = G.cy + bob + sy;

      // seismic rings + glow on the "ground" below
      var gy = h * 0.93;
      var glow = c.createRadialGradient(G.cx, gy, 4, G.cx, gy, G.rx * 1.1);
      glow.addColorStop(0, 'rgba(200,242,90,0.25)'); glow.addColorStop(1, 'rgba(200,242,90,0)');
      c.fillStyle = glow; c.beginPath(); c.ellipse(G.cx, gy, G.rx * 1.1, G.rx * 0.18, 0, 0, 6.28); c.fill();
      for (var k = 0; k < 3; k++) {
        var ph = reduce ? (k + 1) / 4 : ((t * 0.3 + k / 3) % 1);
        c.strokeStyle = 'rgba(200,242,90,' + (0.6 * (1 - ph)) + ')'; c.lineWidth = 1.2;
        c.beginPath(); c.ellipse(G.cx, gy, G.rx * (0.2 + ph), G.rx * 0.045 * (1 + ph * 3), 0, 0, 6.28); c.stroke();
      }

      function ept(e) { return { x: cx + Math.cos(e.a) * G.rx * e.r, y: cy + Math.sin(e.a) * G.ry * e.r }; }
      var tip = { x: cx + st.tip.x, y: cy + st.tip.y };

      // roots behind
      c.lineCap = 'round';
      st.roots.forEach(function (r) {
        var p = { x: cx + Math.cos(r.a) * G.rx * 0.4, y: cy + G.rx * 0.55 };
        var sw = reduce ? 0 : Math.sin(t * 1.2 + r.ph) * 6;
        c.strokeStyle = 'rgba(150,110,70,0.75)'; c.lineWidth = 1.6;
        c.beginPath(); c.moveTo(p.x, p.y); c.bezierCurveTo(p.x + 8, p.y + r.len * 0.4, p.x - 10 + sw, p.y + r.len * 0.7, p.x + sw * 1.4, p.y + r.len); c.stroke();
      });

      // body: irregular rounded chunk of earth under the front rim
      var front = st.edge.filter(function (e) { return Math.sin(e.a) >= -0.05; }).sort(function (a, b) { return a.a - b.a; });
      c.beginPath();
      var p0 = ept({ a: 0, r: st.edge[0].r }); c.moveTo(p0.x, p0.y);
      front.forEach(function (e) { var p = ept(e); c.lineTo(p.x, p.y); });
      var pl = ept({ a: Math.PI, r: st.edge[Math.round(st.edge.length / 2)].r }); c.lineTo(pl.x, pl.y);
      for (var bi = front.length - 1; bi >= 0; bi--) {
        var e2 = front[bi], sa = Math.max(0, Math.sin(e2.a));
        var bx = cx + Math.cos(e2.a) * G.rx * (0.78 - 0.35 * sa) * e2.r;
        var by = cy + Math.sin(e2.a) * G.ry + G.rx * (0.22 + 0.5 * Math.pow(sa, 1.6)) * (0.9 + 0.2 * e2.r);
        if (Math.abs(Math.cos(e2.a)) < 0.25) by = tip.y - 6 + (bi % 2) * 10;
        c.lineTo(bx, by);
      }
      c.closePath();
      var bg = c.createLinearGradient(0, cy, 0, tip.y);
      bg.addColorStop(0, '#7a5638'); bg.addColorStop(0.25, '#9a7048'); bg.addColorStop(0.55, '#5e4733'); bg.addColorStop(1, '#2a221c');
      c.fillStyle = bg; c.fill();
      c.save(); c.clip();
      for (var L = 1; L < 8; L++) { // strata
        c.strokeStyle = 'rgba(240,230,210,' + (L % 2 ? 0.08 : 0.16) + ')'; c.lineWidth = 1;
        c.beginPath(); c.ellipse(cx, cy + L * G.rx * 0.11, G.rx * (1 - L * 0.06), G.ry * (1 - L * 0.05), 0, 0.05, Math.PI - 0.05); c.stroke();
      }
      st.facets.forEach(function (f) { // rock facets
        var e = ept({ a: f.a, r: 1 }); c.strokeStyle = 'rgba(0,0,0,0.28)'; c.lineWidth = 1.2;
        c.beginPath(); c.moveTo(e.x, e.y + 3); c.lineTo(e.x + (tip.x - e.x) * f.k, e.y + (tip.y - e.y) * f.k); c.stroke();
      });
      var shade = c.createLinearGradient(cx - G.rx, 0, cx + G.rx, 0);
      shade.addColorStop(0, 'rgba(0,0,0,0.35)'); shade.addColorStop(0.5, 'rgba(0,0,0,0)'); shade.addColorStop(1, 'rgba(0,0,0,0.25)');
      c.fillStyle = shade; c.fillRect(cx - G.rx * 1.2, cy - G.ry, G.rx * 2.4, tip.y - cy + G.ry);
      c.restore();

      // mossy top
      c.beginPath(); st.edge.forEach(function (e, i) { var p = ept(e); i ? c.lineTo(p.x, p.y) : c.moveTo(p.x, p.y); }); c.closePath();
      var mg = c.createLinearGradient(0, cy - G.ry, 0, cy + G.ry); mg.addColorStop(0, '#5f8f45'); mg.addColorStop(1, '#2f5a2f');
      c.fillStyle = mg; c.fill();
      // moss spilling over the front edge
      front.forEach(function (e, i) { if (i % 2) return; var p = ept(e); c.fillStyle = GREENS[3 + (i % 3)]; c.beginPath(); c.ellipse(p.x, p.y + 3, 7 + (i % 4) * 2, 5 + (i % 3) * 2, 0, 0, 6.28); c.fill(); });
      st.moss.forEach(function (m) { c.fillStyle = m.c; c.beginPath(); c.arc(cx + m.x * G.rx * 0.9, cy + m.y * G.ry * 0.85, m.s * (G.rx / 220), 0, 6.28); c.fill(); });
      // little trees
      st.trees.forEach(function (tr) {
        var x = cx + tr.x * G.rx * 0.7, y = cy + tr.y * G.ry, s = tr.s * G.rx / 6;
        var sw = reduce ? 0 : Math.sin(t * 1.4 + tr.x * 5) * 2;
        c.strokeStyle = '#4a3527'; c.lineWidth = 2; c.beginPath(); c.moveTo(x, y); c.lineTo(x + sw * 0.3, y - s * 0.9); c.stroke();
        [['#24452a', 1], ['#3b6a3a', 0.78], ['#6a9c4b', 0.5]].forEach(function (lv, j) {
          c.fillStyle = lv[0]; c.beginPath(); c.arc(x + sw * (0.5 + j * 0.2), y - s * (0.9 + j * 0.28), s * 0.42 * lv[1], 0, 6.28); c.fill();
        });
      });
      // grass on the rim
      st.grass.forEach(function (g) {
        var p = { x: cx + Math.cos(g.a) * G.rx * g.r * 0.95, y: cy + Math.sin(g.a) * G.ry * g.r * 0.95 };
        var sw = (reduce ? 0.2 : Math.sin(t * 1.6 + g.ph)) * 4 + quake * (st.R() - 0.5) * 6;
        c.strokeStyle = g.c; c.lineWidth = 1.4; c.beginPath(); c.moveTo(p.x, p.y); c.quadraticCurveTo(p.x + sw * 0.3, p.y - g.h * 0.5, p.x + sw, p.y - g.h * (G.rx / 220)); c.stroke();
      });

      // crumbs falling from the tip (more during a tremor)
      if (!reduce) {
        var spawn = quake ? 3 : (st.R() < 0.12 ? 1 : 0);
        for (var s = 0; s < spawn; s++) st.crumbs.push({ x: tip.x + (st.R() - 0.5) * G.rx * (quake ? 0.9 : 0.25), y: tip.y - 10 - st.R() * 20 * quake, vy: 10 + st.R() * 20, vx: (st.R() - 0.5) * 10, s: 1 + st.R() * 2.4, life: 1 });
      }
      st.crumbs = st.crumbs.filter(function (k) { return k.life > 0 && k.y < h; });
      st.crumbs.forEach(function (k) {
        k.vy += 90 * dt; k.y += k.vy * dt; k.x += k.vx * dt; k.life -= dt * 0.5;
        c.fillStyle = 'rgba(150,110,70,' + Math.max(0, k.life) + ')'; c.fillRect(k.x, k.y, k.s, k.s);
      });
    });
  });

  /* ---------- enredadera que crece con la lectura ---------- */
  var vine = document.getElementById('vine');
  if (vine) {
    var path = vine.querySelector('.stem'), len = path.getTotalLength();
    path.style.strokeDasharray = len; path.style.strokeDashoffset = len;
    var leaves = [], g = vine.querySelector('.leaves');
    var R2 = rnd(77);
    for (var d = 40; d < len; d += 34 + R2() * 30) {
      var pt = path.getPointAtLength(d), pt2 = path.getPointAtLength(Math.min(len, d + 2));
      var ang = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI + (R2() < 0.5 ? 50 : -50) + (R2() - 0.5) * 30;
      var el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      var s = 0.7 + R2() * 0.7;
      el.setAttribute('d', 'M0 0 Q 9 -8 20 0 Q 9 8 0 0 Z');
      el.setAttribute('fill', ['#3b6a3a', '#4f8243', '#6a9c4b', '#9cc84f'][Math.floor(R2() * 4)]);
      el.setAttribute('transform', 'translate(' + pt.x + ' ' + pt.y + ') rotate(' + ang + ') scale(0)');
      el.dataset.base = 'translate(' + pt.x + ' ' + pt.y + ') rotate(' + ang + ')';
      el.dataset.s = s; el.dataset.at = d / len;
      g.appendChild(el); leaves.push(el);
    }
    var growVine = function () {
      var hdoc = document.documentElement, max = hdoc.scrollHeight - hdoc.clientHeight;
      var p = reduce ? 1 : Math.min(1, Math.max(0, hdoc.scrollTop / Math.max(1, max)) * 1.08 + 0.04);
      path.style.strokeDashoffset = len * (1 - p);
      leaves.forEach(function (l) { var k = Math.max(0, Math.min(1, (p - l.dataset.at) * 14)); l.setAttribute('transform', l.dataset.base + ' scale(' + (k * l.dataset.s).toFixed(3) + ')'); });
    };
    document.addEventListener('scroll', growVine, { passive: true }); growVine();
  }

  /* ---------- grietas que se abren y títulos que tiemblan ---------- */
  if ('IntersectionObserver' in window) {
    var qo = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('quaked'); qo.unobserve(e.target); } });
    }, { threshold: 0.45 });
    document.querySelectorAll('.ch-band').forEach(function (b) { qo.observe(b); });
  } else {
    document.querySelectorAll('.ch-band').forEach(function (b) { b.classList.add('quaked'); });
  }

  if (!reduce) requestAnimationFrame(tick);
})();
