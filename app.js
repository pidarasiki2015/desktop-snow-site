/* Снегопад на фоне — как в самом приложении, только на canvas.
   Уважает prefers-reduced-motion и не ест CPU на скрытой вкладке. */
(function () {
  var cv = document.getElementById('snow');
  if (!cv) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var ctx = cv.getContext('2d');
  var W = 0, H = 0, flakes = [];
  var DPR = Math.min(window.devicePixelRatio || 1, 2);

  function rnd(a, b) { return a + Math.random() * (b - a); }

  function make(top) {
    return {
      x: Math.random() * W,
      y: top ? -10 : Math.random() * H,
      r: rnd(1, 3.2),
      vy: rnd(20, 60) * (0.6 + 0.4 * Math.random()),
      drift: rnd(-18, 18),
      phase: Math.random() * Math.PI * 2,
      o: rnd(0.5, 1)
    };
  }

  function resize() {
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var n = Math.round(Math.min(180, Math.max(60, W * H / 14000)));
    flakes = []; for (var i = 0; i < n; i++) flakes.push(make(false));
  }

  var last = 0, hidden = false;
  document.addEventListener('visibilitychange', function () { hidden = document.hidden; });

  function frame(ts) {
    requestAnimationFrame(frame);
    if (hidden) return;
    var dt = Math.min(0.05, (ts - last) / 1000 || 0.016);
    last = ts;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#eef4ff';
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.phase += dt;
      f.y += f.vy * dt;
      f.x += (f.drift + Math.sin(f.phase) * 12) * dt;
      if (f.y > H + 8) { flakes[i] = make(true); continue; }
      if (f.x < -8) f.x = W + 8; else if (f.x > W + 8) f.x = -8;
      ctx.globalAlpha = f.o;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, 6.2832);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(frame);
})();
