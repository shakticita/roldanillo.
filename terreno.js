/* Bloque de terreno: corte esquemático del occidente colombiano con epicentro e hipocentro del sismo del 10 de agosto de 2026. */
(function () {
  var root = document.getElementById('terreno');
  if (!root) return;
  var cv = root.querySelector('canvas');
  var ctx = cv.getContext('2d');
  var labels = root.querySelectorAll('[data-at]');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var NX = 56, NZ = 40;
  var noiseSeed = [];
  for (var i = 0; i < 64; i++) noiseSeed.push(Math.sin(i * 12.9898) * 43758.5453 % 1);
  function n2(x, z) { // cheap smooth noise
    return 0.5 * Math.sin(x * 9.1 + z * 3.7) * Math.cos(z * 7.3 - x * 2.1) + 0.3 * Math.sin(x * 21 + z * 17) * Math.sin(z * 13 - x * 5);
  }
  function height(x, z) {
    var ridgeW = 0.42 + 0.06 * (z - 0.5);           // Cordillera Occidental
    var ridgeC = 0.92 + 0.04 * (z - 0.5);           // Cordillera Central
    var occ = 0.62 * Math.exp(-Math.pow((x - ridgeW) / 0.085, 2));
    var cen = 0.78 * Math.exp(-Math.pow((x - ridgeC) / 0.11, 2));
    var valley = x > 0.55 && x < 0.82 ? -0.02 : 0;
    var h = 0.07 + occ + cen + valley;
    h += 0.05 * n2(x, z) * (0.4 + occ + cen);
    return Math.max(0.03, h);
  }
  var grid = [];
  for (var j = 0; j <= NZ; j++) { var row = []; for (var k = 0; k <= NX; k++) row.push(height(k / NX, j / NZ)); grid.push(row); }

  var EPI = { x: 0.355, z: 0.66 };   // San José del Palmar, ladera occidental de la cordillera
  var ROL = { x: 0.6, z: 0.42 };     // Roldanillo, borde occidental del valle del Cauca
  var DEPTH = 0.62;                  // espesor del bloque (≈ 120 km)
  var HYPO = DEPTH * 96 / 120;       // 96 km

  var W = 1, Dp = 0.72, HS = 0.36;   // block size in world units
  var yaw = -0.55, pitch = 0.62, auto = !reduce, t0 = performance.now(), dragging = false, lastX = 0;
  var cw, ch, dpr, scale, cx, cy;

  function size() {
    dpr = Math.min(2, window.devicePixelRatio || 1);
    var r = cv.getBoundingClientRect();
    cw = r.width; ch = r.height;
    cv.width = Math.round(cw * dpr); cv.height = Math.round(ch * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    scale = cw < 520 ? Math.min(cw * 0.86, ch * 1.1) : Math.min(cw * 0.6, ch * 1.0);
    cx = cw / 2; cy = ch * (cw < 520 ? 0.36 : 0.42);
  }
  function P(x, z, y, bob) { // world (0..1 grid coords, y height) -> screen
    var X = (x - 0.5) * W, Z = (z - 0.5) * Dp, Y = y * HS;
    var c = Math.cos(yaw), s = Math.sin(yaw);
    var rx = X * c - Z * s, rz = X * s + Z * c;
    return { x: cx + rx * scale, y: cy + bob + rz * scale * Math.sin(pitch) - Y * scale * Math.cos(pitch), d: rz };
  }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function mix(c1, c2, t) { return 'rgb(' + Math.round(lerp(c1[0], c2[0], t)) + ',' + Math.round(lerp(c1[1], c2[1], t)) + ',' + Math.round(lerp(c1[2], c2[2], t)) + ')'; }
  var LOW = [58, 92, 54], MID = [44, 70, 44], HIGH = [96, 120, 78];

  function draw(now) {
    var t = (now - t0) / 1000;
    if (auto) yaw = -0.55 + Math.sin(t * 0.18) * 0.38;
    var bob = reduce ? 0 : Math.sin(t * 0.9) * 4;
    ctx.clearRect(0, 0, cw, ch);

    // shadow under the floating block
    var sh = P(0.5, 0.5, -DEPTH, 0);
    ctx.save(); ctx.globalAlpha = 0.5;
    var g = ctx.createRadialGradient(sh.x, sh.y + 70, 10, sh.x, sh.y + 70, scale * 0.55);
    g.addColorStop(0, 'rgba(200,242,90,0.18)'); g.addColorStop(1, 'rgba(200,242,90,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(sh.x, sh.y + 70, scale * 0.55, scale * 0.12, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();

    // walls facing the camera
    var c = Math.cos(yaw), s = Math.sin(yaw);
    var walls = [];
    // south wall z=0 (normal -Z): visible if rz of normal <0 ... compute via projected depth of normal
    function wall(edge) { // edge: array of [x,z] along boundary
      var top = edge.map(function (e) { return P(e[0], e[1], heightAt(e[0], e[1]), bob); });
      var bot = edge.map(function (e) { return P(e[0], e[1], -DEPTH, bob); });
      return { top: top, bot: bot };
    }
    function heightAt(x, z) { var k = Math.round(x * NX), j = Math.round(z * NZ); return grid[Math.min(NZ, Math.max(0, j))][Math.min(NX, Math.max(0, k))]; }
    var edges = {
      s: { pts: [], n: [0, -1] }, n: { pts: [], n: [0, 1] }, w: { pts: [], n: [-1, 0] }, e: { pts: [], n: [1, 0] }
    };
    for (var k = 0; k <= NX; k++) { edges.s.pts.push([k / NX, 0]); edges.n.pts.push([k / NX, 1]); }
    for (var j = 0; j <= NZ; j++) { edges.w.pts.push([0, j / NZ]); edges.e.pts.push([1, j / NZ]); }
    Object.keys(edges).forEach(function (key) {
      var e = edges[key];
      var depthN = e.n[0] * s * W + e.n[1] * c * Dp; // rz of normal
      if (depthN > 0) walls.push(wall(e.pts));
    });
    walls.forEach(function (wl) {
      ctx.beginPath();
      wl.top.forEach(function (p, i) { i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); });
      for (var i = wl.bot.length - 1; i >= 0; i--) ctx.lineTo(wl.bot[i].x, wl.bot[i].y);
      ctx.closePath();
      var yTop = Math.min.apply(null, wl.top.map(function (p) { return p.y; }));
      var yBot = Math.max.apply(null, wl.bot.map(function (p) { return p.y; }));
      var gr = ctx.createLinearGradient(0, yTop, 0, yBot);
      gr.addColorStop(0, '#6b4a2f'); gr.addColorStop(0.18, '#8a6040'); gr.addColorStop(0.45, '#5a4232');
      gr.addColorStop(0.75, '#3a2f27'); gr.addColorStop(1, '#221d19');
      ctx.fillStyle = gr; ctx.fill();
      ctx.save(); ctx.clip();
      // strata lines
      for (var L = 1; L <= 9; L++) {
        var yy = -DEPTH * L / 10;
        ctx.beginPath();
        wl.bot.forEach(function (p, i) {
          var q = { x: p.x, y: p.y - (yy + DEPTH) * HS * scale * Math.cos(pitch) + Math.sin(i * 0.7 + L) * 1.5 };
          i ? ctx.lineTo(q.x, q.y) : ctx.moveTo(q.x, q.y);
        });
        ctx.strokeStyle = 'rgba(232,238,228,' + (L % 3 ? 0.06 : 0.13) + ')'; ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.restore();
      ctx.strokeStyle = 'rgba(232,238,228,0.18)'; ctx.lineWidth = 1; ctx.stroke();
    });

    // hypocenter: dashed line + glow (drawn "x-ray" over the walls)
    var epTop = P(EPI.x, EPI.z, heightAt(EPI.x, EPI.z), bob);
    var hyp = P(EPI.x, EPI.z, -HYPO, bob);

    // top surface quads, far to near
    var quads = [];
    for (var j = 0; j < NZ; j++) for (var k = 0; k < NX; k++) {
      var h00 = grid[j][k], h10 = grid[j][k + 1], h01 = grid[j + 1][k], h11 = grid[j + 1][k + 1];
      var a = P(k / NX, j / NZ, h00, bob), b = P((k + 1) / NX, j / NZ, h10, bob), cc = P((k + 1) / NX, (j + 1) / NZ, h11, bob), d = P(k / NX, (j + 1) / NZ, h01, bob);
      quads.push({ p: [a, b, cc, d], d: (a.d + cc.d) / 2, h: (h00 + h10 + h01 + h11) / 4, sl: (h10 - h00) + (h11 - h01) - (h01 - h00) * 0.6 });
    }
    quads.sort(function (q1, q2) { return q1.d - q2.d; });
    quads.forEach(function (q) {
      var hh = q.h, col;
      if (hh < 0.12) col = mix(LOW, MID, hh / 0.12);
      else col = mix(MID, HIGH, Math.min(1, (hh - 0.12) / 0.6));
      ctx.beginPath(); ctx.moveTo(q.p[0].x, q.p[0].y); ctx.lineTo(q.p[1].x, q.p[1].y); ctx.lineTo(q.p[2].x, q.p[2].y); ctx.lineTo(q.p[3].x, q.p[3].y); ctx.closePath();
      ctx.fillStyle = col; ctx.fill();
      var shade = Math.max(-0.35, Math.min(0.35, q.sl * 6 * Math.cos(yaw)));
      if (shade) { ctx.fillStyle = shade > 0 ? 'rgba(255,255,230,' + shade * 0.5 + ')' : 'rgba(0,0,0,' + (-shade) * 0.7 + ')'; ctx.fill(); }
      ctx.strokeStyle = 'rgba(0,0,0,0.06)'; ctx.lineWidth = 0.6; ctx.stroke();
    });

    // contour lines (marching squares on the height grid)
    var levels = [0.12, 0.2, 0.28, 0.36, 0.44, 0.52, 0.6, 0.68];
    ctx.lineWidth = 1;
    levels.forEach(function (lv, li) {
      ctx.strokeStyle = li % 2 ? 'rgba(200,242,90,0.30)' : 'rgba(200,242,90,0.55)';
      ctx.beginPath();
      for (var j = 0; j < NZ; j++) for (var k = 0; k < NX; k++) {
        var v = [grid[j][k], grid[j][k + 1], grid[j + 1][k + 1], grid[j + 1][k]];
        var cs = [[k, j], [k + 1, j], [k + 1, j + 1], [k, j + 1]];
        var pts = [];
        for (var e = 0; e < 4; e++) {
          var v1 = v[e], v2 = v[(e + 1) % 4];
          if ((v1 - lv) * (v2 - lv) < 0) {
            var tt = (lv - v1) / (v2 - v1);
            var X = lerp(cs[e][0], cs[(e + 1) % 4][0], tt) / NX, Z = lerp(cs[e][1], cs[(e + 1) % 4][1], tt) / NZ;
            pts.push(P(X, Z, lv + 0.003, bob));
          }
        }
        if (pts.length >= 2) { ctx.moveTo(pts[0].x, pts[0].y); ctx.lineTo(pts[1].x, pts[1].y); }
        if (pts.length === 4) { ctx.moveTo(pts[2].x, pts[2].y); ctx.lineTo(pts[3].x, pts[3].y); }
      }
      ctx.stroke();
    });

    // río Cauca
    ctx.beginPath();
    for (var j = 0; j <= NZ; j++) {
      var z = j / NZ, x = 0.69 + 0.025 * Math.sin(z * 9) + 0.03 * (z - 0.5);
      var p = P(x, z, heightAt(x, z) + 0.004, bob);
      j ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y);
    }
    ctx.strokeStyle = 'rgba(140,200,230,0.85)'; ctx.lineWidth = 2; ctx.stroke();

    // seismic rings on the surface
    var nR = 3;
    for (var r = 0; r < nR; r++) {
      var ph = reduce ? (r + 1) / (nR + 1) : ((t * 0.35 + r / nR) % 1);
      var rad = 0.03 + ph * 0.42;
      ctx.beginPath();
      for (var a2 = 0; a2 <= 64; a2++) {
        var ang = a2 / 64 * Math.PI * 2;
        var x2 = EPI.x + Math.cos(ang) * rad, z2 = EPI.z + Math.sin(ang) * rad / Dp * 0.75;
        if (x2 < 0 || x2 > 1 || z2 < 0 || z2 > 1) { ctx.moveTo(P(Math.min(1, Math.max(0, x2)), Math.min(1, Math.max(0, z2)), 0, bob).x, P(Math.min(1, Math.max(0, x2)), Math.min(1, Math.max(0, z2)), 0, bob).y); continue; }
        var pp = P(x2, z2, heightAt(x2, z2) + 0.006, bob);
        a2 ? ctx.lineTo(pp.x, pp.y) : ctx.moveTo(pp.x, pp.y);
      }
      ctx.strokeStyle = 'rgba(200,242,90,' + (0.85 * (1 - ph)) + ')'; ctx.lineWidth = 1.6; ctx.stroke();
    }

    // dashed depth line + beam
    ctx.save();
    var beam = ctx.createLinearGradient(hyp.x, hyp.y, epTop.x, epTop.y);
    beam.addColorStop(0, 'rgba(200,242,90,0.55)'); beam.addColorStop(1, 'rgba(200,242,90,0.05)');
    ctx.beginPath(); ctx.moveTo(hyp.x, hyp.y); ctx.lineTo(epTop.x - 26, epTop.y); ctx.lineTo(epTop.x + 26, epTop.y); ctx.closePath();
    ctx.fillStyle = beam; ctx.fill();
    ctx.setLineDash([4, 5]); ctx.strokeStyle = '#C8F25A'; ctx.lineWidth = 1.4;
    ctx.beginPath(); ctx.moveTo(epTop.x, epTop.y); ctx.lineTo(hyp.x, hyp.y); ctx.stroke();
    ctx.restore();
    var pulse = reduce ? 1 : 0.7 + 0.3 * Math.sin(t * 3);
    var hg = ctx.createRadialGradient(hyp.x, hyp.y, 0, hyp.x, hyp.y, 22 * pulse);
    hg.addColorStop(0, 'rgba(200,242,90,1)'); hg.addColorStop(0.35, 'rgba(200,242,90,0.5)'); hg.addColorStop(1, 'rgba(200,242,90,0)');
    ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(hyp.x, hyp.y, 22 * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#C8F25A'; ctx.beginPath(); ctx.arc(epTop.x, epTop.y, 4, 0, Math.PI * 2); ctx.fill();

    // Roldanillo marker
    var rol = P(ROL.x, ROL.z, heightAt(ROL.x, ROL.z), bob);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(rol.x, rol.y, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(rol.x, rol.y, 9, 0, Math.PI * 2); ctx.stroke();

    // place HTML labels
    var anchors = {
      epi: epTop, hyp: hyp, rol: rol,
      occ: P(0.43, 0.15, heightAt(0.43, 0.15), bob),
      cen: P(0.92, 0.45, heightAt(0.92, 0.45), bob),
      val: P(0.7, 0.92, heightAt(0.7, 0.92), bob),
      cho: P(0.12, 0.9, heightAt(0.12, 0.9), bob)
    };
    labels.forEach(function (el) {
      var a = anchors[el.dataset.at]; if (!a) return;
      el.style.transform = 'translate(' + Math.round(a.x) + 'px,' + Math.round(a.y) + 'px)';
    });

    if (!reduce || dragging) requestAnimationFrame(draw);
  }

  cv.addEventListener('pointerdown', function (e) { dragging = true; auto = false; lastX = e.clientX; cv.setPointerCapture(e.pointerId); root.classList.add('grab'); });
  cv.addEventListener('pointermove', function (e) { if (!dragging) return; yaw += (e.clientX - lastX) * 0.008; yaw = Math.max(-1.35, Math.min(1.35, yaw)); lastX = e.clientX; if (reduce) requestAnimationFrame(draw); });
  function up() { dragging = false; root.classList.remove('grab'); }
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  root.querySelectorAll('[data-rot]').forEach(function (b) {
    b.addEventListener('click', function () { auto = false; yaw = Math.max(-1.35, Math.min(1.35, yaw + (+b.dataset.rot) * 0.3)); if (reduce) requestAnimationFrame(draw); });
  });
  window.addEventListener('resize', function () { size(); if (reduce) requestAnimationFrame(draw); });
  size();
  requestAnimationFrame(draw);
})();
