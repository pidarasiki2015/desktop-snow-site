/* ============================================================
   Desktop Snow — landing runtime
   L2, zero dependencies. Snow canvas + hero rim drift,
   i18n RU/UA/EN, spotlight cards, magnet CTA, tabs, reveal.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function store(k, d) { try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* private mode */ } }

  /* ---------------- i18n ---------------- */
  var I18N = {
    ru: {
      'nav.features': 'Возможности',
      'nav.interface': 'Интерфейс',
      'nav.download': 'Скачать',
      'hero.badge': 'Windows 10 / 11 · Бесплатно',
      'hero.h1a': 'Новый год уже здесь.',
      'hero.h1b': 'Прямо на\u00A0твоём рабочем\u00A0столе.',
      'hero.lead': 'Живой снег на каждом окне, интерактивные снеговики, поезд с\u00A0подарками и мгновенная пауза в играх. Нативно для Windows 10 и\u00A011.',
      'hero.cta': 'Скачать .exe',
      'hero.portable': 'Портативная версия',
      'hero.ghost': 'GitHub',
      'hero.tech': 'Бесплатно • C++ & Direct2D • < 1\u00A0МБ • 30–144 FPS • Без\u00A0установки',
      'hero.snowlabel': 'Цвет снега',
      'hero.hint': 'Ctrl+Alt+S — снег вкл/выкл',
      'hero.driftHint': 'Кликни, потяни или нажми «Потрясти» — сугроб разлетится.',
      'hero.shake': 'Потрясти',
      'feat.eyebrow': 'Возможности',
      'feat.title': 'Каждая деталь — про\u00A0зиму',
      'feat.dwm.e': 'DWM',
      'feat.dwm.t': 'Попиксельная привязка',
      'feat.dwm.d': 'Снег лежит ровно на верхней рамке каждого окна и живёт по законам Windows:',
      'feat.dwm.l1': 'едет за окном пиксель-в-пиксель',
      'feat.dwm.l2': 'разлетается при резком рывке',
      'feat.dwm.l3': 'осыпается при сворачивании',
      'feat.pause.e': 'Умная пауза',
      'feat.pause.unit': 'мс',
      'feat.pause.t': 'Пауза за 0\u00A0мс',
      'feat.pause.d': 'Мгновенно исчезает в играх, на YouTube во\u00A0весь экран и во\u00A0время выделения области скриншота.',
      'feat.pause.c3': '«Ножницы»',
      'feat.world.e': 'Живой мир',
      'feat.world.t': 'Снеговики, ёлки и\u00A0поезд',
      'feat.world.d': 'Живой мир поверх рабочего стола: Санта, йети и\u00A0поезд с\u00A0подарками сбивает снеговиков на\u00A0своём пути — и\u00A0они собираются обратно.',
      'feat.world.l1': 'снеговики лепятся зажатием ЛКМ',
      'feat.world.l2': 'до\u00A03\u00A0ёлок в\u00A04\u00A0темах оформления',
      'feat.world.l3': 'поезд с\u00A0подарками и\u00A0Санта в\u00A0гостях',
      'feat.keys.e': 'Хоткеи',
      'feat.keys.t': 'Управление из\u00A0любого приложения',
      'feat.keys.c1': 'Снег вкл/выкл',
      'feat.keys.c2': 'Украсить сейчас',
      'feat.keys.d': 'Работают глобально — даже когда окно приложения свёрнуто.',
      'ui.eyebrow': 'Интерфейс',
      'ui.title': 'Настройки в\u00A0стиле Windows\u00A011',
      'ui.lead': 'Родные окна приложения: слайдеры, темы, цвета. Никаких макетов — только реальные скриншоты.',
      'ui.tab1': 'Общие',
      'ui.tab2': 'Снег',
      'ui.tab3': 'Украшения',
      'ui.c1': 'Запуск, хоткеи, язык',
      'ui.c2': 'Интенсивность, размер, палитра',
      'ui.c3': 'Ёлки, снеговики, поезд',
      'cta.title': 'Готов к\u00A0Новому\u00A0году?',
      'cta.text': 'Скачай, распакуй, запусти DesktopSnow.exe — снег пойдёт через секунду.',
      'cta.btn': 'Скачать .exe',
      'cta.portable': 'Портативная версия',
      'cta.note': 'Портативно · Без установки · Windows 10/11',
      'footer.releases': 'Релизы'
    },
    ua: {
      'nav.features': 'Можливості',
      'nav.interface': 'Інтерфейс',
      'nav.download': 'Завантажити',
      'hero.badge': 'Windows 10 / 11 · Безкоштовно',
      'hero.h1a': 'Новий рік уже тут.',
      'hero.h1b': 'Прямо на\u00A0твоєму робочому\u00A0столі.',
      'hero.lead': 'Живий сніг на кожному вікні, інтерактивні сніговики, потяг\u00A0із\u00A0подарунками та миттєва пауза в іграх. Нативно для Windows 10 і\u00A011.',
      'hero.cta': 'Завантажити .exe',
      'hero.portable': 'Портативна версія',
      'hero.ghost': 'GitHub',
      'hero.tech': 'Безкоштовно • C++ & Direct2D • < 1\u00A0МБ • 30–144 FPS • Без\u00A0встановлення',
      'hero.snowlabel': 'Колір снігу',
      'hero.hint': 'Ctrl+Alt+S — сніг увімк/вимк',
      'hero.driftHint': 'Клікни, потягни або натисни «Потрусити» — замет розлетиться.',
      'hero.shake': 'Потрусити',
      'feat.eyebrow': 'Можливості',
      'feat.title': 'Кожна деталь — про\u00A0зиму',
      'feat.dwm.e': 'DWM',
      'feat.dwm.t': 'Попіксельна прив\u2019язка',
      'feat.dwm.d': 'Сніг лежить рівно на верхній рамці кожного вікна і живе за законами Windows:',
      'feat.dwm.l1': 'їде за вікном піксель-у-піксель',
      'feat.dwm.l2': 'розлітається при різкому ривку',
      'feat.dwm.l3': 'обсипається при згортанні',
      'feat.pause.e': 'Розумна пауза',
      'feat.pause.unit': 'мс',
      'feat.pause.t': 'Пауза за 0\u00A0мс',
      'feat.pause.d': 'Миттєво зникає в іграх, на YouTube на\u00A0весь екран і під\u00A0час виділення області скриншота.',
      'feat.pause.c3': '«Ножиці»',
      'feat.world.e': 'Живий світ',
      'feat.world.t': 'Сніговики, ялинки і\u00A0потяг',
      'feat.world.d': 'Живий світ поверх робочого столу: Санта, єті та\u00A0потяг із подарунками збиває сніговиків на\u00A0своєму шляху — і\u00A0вони збираються назад.',
      'feat.world.l1': 'сніговики ліпляться затисканням ЛКМ',
      'feat.world.l2': 'до\u00A03\u00A0ялинок у\u00A04\u00A0темах оформлення',
      'feat.world.l3': 'потяг із подарунками та\u00A0Санта в\u00A0гостях',
      'feat.keys.e': 'Хоткеї',
      'feat.keys.t': 'Керування з\u00A0будь-якого застосунку',
      'feat.keys.c1': 'Сніг увімк/вимк',
      'feat.keys.c2': 'Прикрасити зараз',
      'feat.keys.d': 'Працюють глобально — навіть коли вікно згорнуто.',
      'ui.eyebrow': 'Інтерфейс',
      'ui.title': 'Налаштування у\u00A0стилі Windows\u00A011',
      'ui.lead': 'Рідні вікна застосунку: слайдери, теми, кольори. Жодних макетів — лише реальні скриншоти.',
      'ui.tab1': 'Загальні',
      'ui.tab2': 'Сніг',
      'ui.tab3': 'Прикраси',
      'ui.c1': 'Запуск, хоткеї, мова',
      'ui.c2': 'Інтенсивність, розмір, палітра',
      'ui.c3': 'Ялинки, сніговики, потяг',
      'cta.title': 'Готовий до\u00A0Нового\u00A0року?',
      'cta.text': 'Завантаж, розпакуй, запусти DesktopSnow.exe — сніг піде за\u00A0секунду.',
      'cta.btn': 'Завантажити .exe',
      'cta.portable': 'Портативна версія',
      'cta.note': 'Портативно · Без встановлення · Windows 10/11',
      'footer.releases': 'Релізи'
    },
    en: {
      'nav.features': 'Features',
      'nav.interface': 'Interface',
      'nav.download': 'Download',
      'hero.badge': 'Windows 10 / 11 · Free',
      'hero.h1a': 'The New Year is already here.',
      'hero.h1b': 'Right on\u00A0your desktop.',
      'hero.lead': 'Living snow on every window, interactive snowmen, a gift train and instant pause in games. Native for Windows 10 and\u00A011.',
      'hero.cta': 'Download .exe',
      'hero.portable': 'Portable version',
      'hero.ghost': 'GitHub',
      'hero.tech': 'Free • C++ & Direct2D • < 1\u00A0MB • 30–144 FPS • No\u00A0install',
      'hero.snowlabel': 'Snow color',
      'hero.hint': 'Ctrl+Alt+S — toggle snow',
      'hero.driftHint': 'Click, drag or hit \u201CShake\u201D — the drift bursts apart.',
      'hero.shake': 'Shake',
      'feat.eyebrow': 'Features',
      'feat.title': 'Every detail is\u00A0about winter',
      'feat.dwm.e': 'DWM',
      'feat.dwm.t': 'Pixel-perfect snap',
      'feat.dwm.d': 'Snow rests exactly on\u00A0the top edge of\u00A0every window and obeys Windows physics:',
      'feat.dwm.l1': 'rides with the window, pixel by\u00A0pixel',
      'feat.dwm.l2': 'scatters on\u00A0a\u00A0sharp yank',
      'feat.dwm.l3': 'slides off when the window collapses',
      'feat.pause.e': 'Smart pause',
      'feat.pause.unit': 'ms',
      'feat.pause.t': '0\u00A0ms pause',
      'feat.pause.d': 'Vanishes instantly in\u00A0games, on\u00A0full-screen YouTube and while you select a\u00A0screenshot area.',
      'feat.pause.c3': 'Snipping Tool',
      'feat.world.e': 'Living world',
      'feat.world.t': 'Snowmen, trees and a\u00A0train',
      'feat.world.d': 'A living world on\u00A0top of\u00A0the desktop: Santa, the yeti and a\u00A0gift train knock snowmen down on\u00A0their way — and they put themselves back together.',
      'feat.world.l1': 'mould snowmen with a\u00A0held LMB',
      'feat.world.l2': 'up\u00A0to\u00A03\u00A0trees in\u00A04\u00A0themes',
      'feat.world.l3': 'a\u00A0gift train and Santa visiting',
      'feat.keys.e': 'Hotkeys',
      'feat.keys.t': 'Control from any app',
      'feat.keys.c1': 'Toggle snow',
      'feat.keys.c2': 'Decorate now',
      'feat.keys.d': 'Work globally — even when the window is\u00A0minimized.',
      'ui.eyebrow': 'Interface',
      'ui.title': 'Settings in\u00A0the Windows\u00A011 style',
      'ui.lead': 'Native app windows: sliders, themes, colors. No mockups — only real screenshots.',
      'ui.tab1': 'General',
      'ui.tab2': 'Snow',
      'ui.tab3': 'Decorations',
      'ui.c1': 'Startup, hotkeys, language',
      'ui.c2': 'Intensity, size, palette',
      'ui.c3': 'Trees, snowmen, train',
      'cta.title': 'Ready for the New Year?',
      'cta.text': 'Download, unzip, run DesktopSnow.exe — snow starts in\u00A0a\u00A0second.',
      'cta.btn': 'Download .exe',
      'cta.portable': 'Portable version',
      'cta.note': 'Portable · No install · Windows 10/11',
      'footer.releases': 'Releases'
    }
  };
  var META = {
    ru: { lang: 'ru', title: 'Desktop Snow — Новый год уже здесь' },
    ua: { lang: 'uk', title: 'Desktop Snow — Новий рік уже тут' },
    en: { lang: 'en', title: 'Desktop Snow — The New Year is already here' }
  };

  var lang = store('ds-lang', 'ru');
  if (!I18N[lang]) lang = 'ru';
  var currentTab = 0;

  /* ---------------- Hero H1 split ---------------- */
  function splitH1() {
    var h1 = $('#h1');
    if (!h1) return;
    var idx = 0;
    $$('.line', h1).forEach(function (line) {
      var text = line.textContent.trim();
      line.textContent = '';
      var words = text.split(' ').filter(function (w) { return w.length; });
      words.forEach(function (w, i) {
        var s = document.createElement('span');
        s.className = 'h1w';
        s.textContent = w;
        s.style.setProperty('--i', idx++);
        line.appendChild(s);
        if (i < words.length - 1) line.appendChild(document.createTextNode(' '));
      });
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { h1.classList.add('in'); });
    });
    /* fallback: rAF can be frozen in prerendered/background tabs */
    window.setTimeout(function () { h1.classList.add('in'); }, 400);
  }

  /* ---------------- Language ---------------- */
  function applyLang(l) {
    if (!I18N[l]) l = 'ru';
    lang = l;
    save('ds-lang', l);
    document.documentElement.lang = META[l].lang;
    document.title = META[l].title;
    $$('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (I18N[l][k] != null) el.textContent = I18N[l][k];
    });
    $$('[data-setlang]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-setlang') === l));
    });
    splitH1();
    setTab(currentTab, false);
  }

  /* ---------------- Tabs ---------------- */
  function setTab(i, animate) {
    currentTab = i;
    $$('.tab').forEach(function (t) { t.setAttribute('aria-selected', String(Number(t.getAttribute('data-tab')) === i)); });
    $$('.shot').forEach(function (img) {
      var on = Number(img.getAttribute('data-idx')) === i;
      img.hidden = !on;
      if (on && animate !== false) {
        img.classList.remove('anim');
        void img.offsetWidth;
        img.classList.add('anim');
      }
    });
    var cap = $('#uiCaption');
    if (cap) {
      var k = 'ui.c' + (i + 1);
      if (I18N[lang][k]) cap.textContent = I18N[lang][k];
    }
  }

  /* ---------------- Reveal ---------------- */
  function initReveal() {
    var rvs = $$('.rv');
    var groups = new Map();
    rvs.forEach(function (el) {
      var p = el.parentElement;
      var i = groups.get(p) || 0;
      groups.set(p, i + 1);
      el.style.setProperty('--i', i);
    });
    if (reduceMotion || !('IntersectionObserver' in window)) {
      rvs.forEach(function (el) { el.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    rvs.forEach(function (el) { io.observe(el); });
  }

  /* ---------------- Snow engine ---------------- */
  var canvas = $('#snow');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var driftCanvas = $('#drift');
  var dctx = driftCanvas ? driftCanvas.getContext('2d') : null;
  var W = 0, H = 0, DPR = 1;
  var flakes = [];
  var snowOn = true;
  var driftH = new Float32Array(96);
  var DRIFT_COLS = 96;
  var driftMaxRecent = 0;
  var pointer = { x: -1e4, y: -1e4 };
  var raf = 0, lastT = 0;

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function hexA(hex, a) {
    var m = /^#?([0-9a-f]{6})$/i.exec(hex || '');
    if (!m) return 'rgba(248,250,252,' + a + ')';
    var n = parseInt(m[1], 16);
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + a + ')';
  }

  var colorIdx = Number(store('ds-snow', '1'));
  if (!(colorIdx >= 1 && colorIdx <= 4)) colorIdx = 1;
  var snowColor = cssVar('--snow-' + colorIdx) || 'rgb(255,255,255)';
  var snowShadow = cssVar('--snow-shadow') || snowColor;

  function newFlake(randomY) {
    var z = 0.35 + Math.random() * 0.65;
    return {
      x: Math.random() * Math.max(1, W),
      y: randomY ? Math.random() * Math.max(1, H) : -10 - Math.random() * 40,
      z: z,
      r: 1.0 + z * 2.4,
      vy: 22 + z * 46,
      ph: Math.random() * Math.PI * 2,
      amp: 6 + z * 16
    };
  }

  function resizeDrift() {
    if (!driftCanvas || !dctx) return;
    var frame = $('#heroFrame');
    if (!frame) return;
    var w = Math.max(1, frame.clientWidth);
    var hCss = 36;
    driftCanvas.width = Math.round(w * DPR);
    driftCanvas.height = Math.round(hCss * DPR);
    dctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    if (driftH.length !== DRIFT_COLS) driftH = new Float32Array(DRIFT_COLS);
  }

  var lastW = 0, lastH = 0;

  /* resize НИКОГДА не пересоздаёт частицы: сохраняем существующие,
     пересчитываем координаты. Иначе на мобиле скролл (URL-bar wobble)
     перезапускал снегопад и снежинки телепортировались. */
  function resizeSnowKeep() {
    if (!canvas || !ctx) return;
    var oldW = W || window.innerWidth;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var target = W < 640 ? 70 : 140;
    for (var i = 0; i < flakes.length; i++) {
      var p = flakes[i];
      p.x = p.x / Math.max(1, oldW) * W;
      if (p.y > H + 12) p.y = Math.random() * Math.max(1, H);
    }
    while (flakes.length > target) flakes.pop();
    while (flakes.length < target) flakes.push(newFlake(true));
    resizeDrift();
  }

  function deposit(x, r) {
    var c = Math.min(DRIFT_COLS - 1, Math.max(0, Math.floor((x - r.left) / r.width * DRIFT_COLS)));
    var cap = W < 640 ? 11 : 16;
    var add = 0.9 + Math.random() * 0.7;
    driftH[c] = Math.min(cap, driftH[c] + add);
    if (c > 0) driftH[c - 1] = Math.min(cap, driftH[c - 1] + add * 0.5);
    if (c < DRIFT_COLS - 1) driftH[c + 1] = Math.min(cap, driftH[c + 1] + add * 0.5);
  }

  function drawDrift(dt) {
    if (!driftCanvas || !dctx) return;
    var w = driftCanvas.width / DPR;
    var h = driftCanvas.height / DPR;
    var any = false;
    for (var i = 0; i < DRIFT_COLS; i++) {
      if (!snowOn) driftH[i] *= Math.pow(0.86, dt / 16.7);
      if (driftH[i] < 0.02) driftH[i] = 0;
      else any = true;
    }
    dctx.clearRect(0, 0, w, h);
    if (!any) { driftMaxRecent = 0; return; }
    var mx = 0;
    for (var j = 0; j < DRIFT_COLS; j++) mx = Math.max(mx, driftH[j]);
    driftMaxRecent = mx;

    /* базовая линия = верхняя кромка окна (canvas лежит на 8px ниже кромки);
       у скруглённых углов база огибает дугу radius 16, поэтому снег обтекает шапку */
    var baseY = h - 8;
    var cw = w / DRIFT_COLS;
    var R = 16;
    var EDGE = 12;
    var pts = [], hgt = [];
    for (var k = 0; k < DRIFT_COLS; k++) {
      var xc = (k + 0.5) * cw;
      var arc = 0;
      if (xc < R) {
        var dxl = R - xc;
        arc = R - Math.sqrt(Math.max(0, R * R - dxl * dxl));
      } else if (xc > w - R) {
        var dxr = xc - (w - R);
        arc = R - Math.sqrt(Math.max(0, R * R - dxr * dxr));
      }
      var s = 1;
      if (xc < EDGE) s = xc / EDGE;
      else if (xc > w - EDGE) s = (w - xc) / EDGE;
      s = Math.max(0, Math.min(1, s));
      s = s * s * s; /* кубическое затухание: у самых углов высота строго 0 */
      var hv = driftH[k] * s;
      hgt.push(hv);
      pts.push({ x: xc, yTop: baseY + arc - hv, yBase: baseY + arc });
    }

    function driftPath(dy) {
      dctx.beginPath();
      dctx.moveTo(pts[0].x, pts[0].yTop + dy);
      for (var n = 1; n < pts.length; n++) {
        var p0 = pts[n - 1], p1 = pts[n];
        dctx.quadraticCurveTo(p0.x, p0.yTop + dy, (p0.x + p1.x) / 2, (p0.yTop + p1.yTop) / 2 + dy);
      }
      dctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].yBase + dy);
      for (var n3 = pts.length - 1; n3 >= 0; n3--) dctx.lineTo(pts[n3].x, pts[n3].yBase + dy);
      dctx.closePath();
    }

    /* контактная тень на кромке */
    driftPath(2);
    dctx.fillStyle = hexA(cssVar('--bg') || snowShadow, 0.4);
    dctx.fill();

    /* тело сугроба: между гребнем и кромкой, углы огибаются по дуге */
    driftPath(0);
    var g = dctx.createLinearGradient(0, baseY - 18, 0, baseY + R);
    g.addColorStop(0, hexA(snowColor, 0.97));
    g.addColorStop(1, hexA(snowShadow, 0.6));
    dctx.fillStyle = g;
    dctx.fill();

    /* блик только по реальному гребню (без линий по краевым нулям) */
    var i0 = -1, i1 = -1;
    for (var m = 0; m < hgt.length; m++) {
      if (hgt[m] > 0.5) { if (i0 < 0) i0 = m; i1 = m; }
    }
    if (i0 >= 0) {
      dctx.beginPath();
      dctx.moveTo(pts[i0].x, pts[i0].yTop);
      for (var n2 = i0 + 1; n2 <= i1; n2++) {
        var q0 = pts[n2 - 1], q1 = pts[n2];
        dctx.quadraticCurveTo(q0.x, q0.yTop, (q0.x + q1.x) / 2, (q0.yTop + q1.yTop) / 2);
      }
      dctx.strokeStyle = hexA(cssVar('--white') || snowColor, 0.55);
      dctx.lineWidth = 1;
      dctx.stroke();
    }
  }

  var simT = 0;
  var bursts = [];
  var dragState = { active: false, moved: false, x0: 0, y0: 0, lx: 0, ly: 0, lt: 0, t0: 0 };
  var shx = 0, shy = 0, svx = 0, svy = 0;
  var shakeAge = 99, shakeStrength = 0;
  var stageEl = null;
  function stageRef() { return stageEl || (stageEl = $('#stage')); }

  function applyStage() {
    var st = stageRef();
    if (!st) return;
    var sox = 0, sor = 0;
    if (shakeAge < 1.2) {
      var decay = Math.exp(-shakeAge * 4.0);
      sox = Math.sin(shakeAge * 30) * shakeStrength * decay;
      sor = Math.sin(shakeAge * 26 + 0.7) * shakeStrength * 0.09 * decay;
    }
    var tx = shx + sox;
    var deg = shx * 0.02 + sor;
    if (Math.abs(tx) > 0.02 || Math.abs(shy) > 0.02 || Math.abs(deg) > 0.002) {
      st.style.transform = 'translate3d(' + tx.toFixed(2) + 'px,' + shy.toFixed(2) + 'px,0) rotate(' + deg.toFixed(3) + 'deg)';
    } else if (st.style.transform) {
      st.style.transform = '';
    }
  }

  /* пружинный возврат витрины после драга + затухающая тряска окна */
  function updateStagePhysics(dt) {
    var s = Math.min(dt / 1000, 0.033);
    if (!dragState.active) {
      svx += (-90 * shx - 12 * svx) * s;
      svy += (-90 * shy - 12 * svy) * s;
      shx += svx * s;
      shy += svy * s;
      if (Math.abs(shx) < 0.05 && Math.abs(svx) < 0.5) { shx = 0; svx = 0; }
      if (Math.abs(shy) < 0.05 && Math.abs(svy) < 0.5) { shy = 0; svy = 0; }
    }
    if (shakeAge < 2) shakeAge += dt / 1000;
    applyStage();
  }

  function updateBursts(dt) {
    for (var i = bursts.length - 1; i >= 0; i--) {
      var b = bursts[i];
      b.vy += 900 * dt / 1000;          /* гравитация */
      b.x += b.vx * dt / 1000;
      b.y += b.vy * dt / 1000;
      b.life -= dt / 1000;
      if (b.y > H + 24 || b.life <= 0) bursts.splice(i, 1);
    }
  }

  function drawBursts() {
    if (!bursts.length) return;
    ctx.fillStyle = snowColor;
    for (var i = 0; i < bursts.length; i++) {
      var b = bursts[i];
      ctx.globalAlpha = Math.max(0, Math.min(1, b.life));
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function step(dt, t) {
    ctx.clearRect(0, 0, W, H);
    updateStagePhysics(dt);
    updateBursts(dt);
    var frame = $('#heroFrame');
    var r = frame ? frame.getBoundingClientRect() : null;
    var visible = r && r.top > -r.height && r.top < H;
    var wind = Math.sin(t * 0.00018) * 14;
    if (snowOn) {
      for (var i = 0; i < flakes.length; i++) {
        var p = flakes[i];
        var prevY = p.y;
        p.y += p.vy * dt / 1000;
        p.x += (Math.sin(p.ph + t * 0.00035 * (0.6 + p.z)) * p.amp + wind) * dt / 1000;
        var dx = p.x - pointer.x, dy = p.y - pointer.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 8100) {
          var d = Math.sqrt(d2) || 1;
          var f = (90 - d) / 90;
          p.x += dx / d * f * 1.6;
          p.y += dy / d * f * 0.5;
        }
        if (p.x < -12) p.x = W + 12;
        else if (p.x > W + 12) p.x = -12;
        if (visible && p.x > r.left + 2 && p.x < r.right - 2 && prevY < r.top + 1 && p.y >= r.top + 1) {
          deposit(p.x, r);
          resetFlake(p);
          continue;
        }
        if (p.y > H + 12) resetFlake(p);
        ctx.globalAlpha = 0.30 + 0.55 * p.z;
        ctx.fillStyle = snowColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
    drawBursts();
    drawDrift(dt);
  }

  function loop(t) {
    raf = requestAnimationFrame(loop);
    if (!ctx) return;
    var dt = Math.min(32, t - (lastT || t));
    lastT = t;
    simT = t;
    step(dt, t);
  }

  /* deterministic stepping for QA (rAF is throttled in background tabs) */
  function pump(frames) {
    if (!ctx) return 0;
    frames = frames || 60;
    for (var i = 0; i < frames; i++) {
      simT += 16.7;
      step(16.7, simT);
    }
    return frames;
  }

  function resetFlake(p) {
    var z = 0.35 + Math.random() * 0.65;
    p.x = Math.random() * Math.max(1, W);
    p.y = -10 - Math.random() * 30;
    p.z = z;
    p.r = 1.0 + z * 2.4;
    p.vy = 22 + z * 46;
    p.ph = Math.random() * Math.PI * 2;
    p.amp = 6 + z * 16;
  }

  function toggleSnow() {
    snowOn = !snowOn;
    if (!ctx) return;
    if (!snowOn) {
      ctx.clearRect(0, 0, W, H);
    } else {
      flakes.forEach(function (f) { if (f.y < -40) f.y = Math.random() * H; });
    }
  }

  function resetDrift() {
    var anyH = false;
    for (var i = 0; i < DRIFT_COLS; i++) { if (driftH[i] > 0.5) { anyH = true; break; } }
    driftH.fill(0);
    if (anyH && snowOn && ctx) {
      var frame = $('#heroFrame');
      if (!frame) return;
      var r = frame.getBoundingClientRect();
      for (var k = 0; k < 24; k++) {
        var f = newFlake(false);
        f.x = r.left + 16 + Math.random() * Math.max(32, r.width - 32);
        f.y = Math.max(2, r.top - 8 - Math.random() * 18);
        f.vy = 55 + Math.random() * 35;
        f.z = 0.6;
        flakes.push(f);
      }
      while (flakes.length > (W < 640 ? 110 : 200)) flakes.shift();
    }
  }

  /* ---------------- Magnet ---------------- */
  function initMagnet() {
    if (!canHover || reduceMotion) return;
    $$('.magnet-wrap').forEach(function (wrap) {
      var btn = wrap.querySelector('.magnet');
      if (!btn) return;
      var rx = 0, ry = 0, tf = 0;
      function render() {
        tf = 0;
        btn.style.transform = 'translate(' + rx.toFixed(2) + 'px,' + ry.toFixed(2) + 'px)';
      }
      wrap.addEventListener('pointermove', function (e) {
        var r = wrap.getBoundingClientRect();
        rx = Math.max(-6, Math.min(6, (e.clientX - (r.left + r.width / 2)) / (r.width / 2) * 6));
        ry = Math.max(-6, Math.min(6, (e.clientY - (r.top + r.height / 2)) / (r.height / 2) * 6));
        if (!tf) tf = requestAnimationFrame(render);
      });
      wrap.addEventListener('pointerleave', function () {
        rx = 0; ry = 0;
        if (!tf) tf = requestAnimationFrame(render);
      });
    });
  }

  /* ---------------- Spotlight ---------------- */
  function initSpot() {
    if (!canHover || reduceMotion) return;
    $$('.spot').forEach(function (card) {
      var tf = 0, mx = 50, my = 50;
      function render() {
        tf = 0;
        card.style.setProperty('--mx', mx + '%');
        card.style.setProperty('--my', my + '%');
      }
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        mx = Math.round((e.clientX - r.left) / r.width * 100);
        my = Math.round((e.clientY - r.top) / r.height * 100);
        if (!tf) tf = requestAnimationFrame(render);
      });
    });
  }

  /* ---------------- Nav + aurora parallax ---------------- */
  var nav = $('#nav');
  var a1 = $('.aurora .a1');
  var a2 = $('.aurora .a2');
  var sTf = 0;
  function onScroll() {
    if (sTf) return;
    sTf = requestAnimationFrame(function () {
      sTf = 0;
      var y = window.scrollY || 0;
      if (nav) nav.classList.toggle('scrolled', y > 8);
      if (!reduceMotion) {
        if (a1) a1.style.transform = 'translate3d(0,' + (y * 0.05).toFixed(1) + 'px,0)';
        if (a2) a2.style.transform = 'translate3d(0,' + (y * -0.04).toFixed(1) + 'px,0)';
      }
    });
  }

  /* ---------------- Boot ---------------- */
  function boot() {
    // language
    $$('[data-setlang]').forEach(function (b) {
      b.addEventListener('click', function () { applyLang(b.getAttribute('data-setlang')); });
    });

    // tabs
    $$('.tab').forEach(function (t) {
      t.addEventListener('click', function () { setTab(Number(t.getAttribute('data-tab'))); });
    });
    var tablist = $('.tabs');
    if (tablist) {
      tablist.addEventListener('keydown', function (e) {
        if (e.code !== 'ArrowRight' && e.code !== 'ArrowLeft') return;
        e.preventDefault();
        var dir = e.code === 'ArrowRight' ? 1 : -1;
        var n = (currentTab + dir + 3) % 3;
        setTab(n);
        var btns = $$('.tab');
        if (btns[n]) btns[n].focus();
      });
    }

    // swatches
    $$('.swatch').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(Number(btn.getAttribute('data-snow')) === colorIdx));
      btn.addEventListener('click', function () {
        colorIdx = Number(btn.getAttribute('data-snow'));
        save('ds-snow', String(colorIdx));
        snowColor = cssVar('--snow-' + colorIdx) || snowColor;
        snowShadow = cssVar('--snow-shadow') || snowColor;
        $$('.swatch').forEach(function (b) {
          b.setAttribute('aria-pressed', String(Number(b.getAttribute('data-snow')) === colorIdx));
        });
      });
    });

    // showcase: настоящий драг, тряска, физический разлёт сугроба
    var stage = $('#stage');
    var shakeBtn = $('#shakeBtn');

    function shakeWindow(strength) {
      shakeAge = 0;
      shakeStrength = strength || 18;
    }

    function burstDrift() {
      if (!driftH) return 0;
      var frame = $('#heroFrame');
      var sum = 0, mxv = 0;
      for (var i = 0; i < DRIFT_COLS; i++) {
        sum += driftH[i];
        if (driftH[i] > mxv) mxv = driftH[i];
      }
      var r = frame ? frame.getBoundingClientRect() : null;
      var n = 0;
      if (r && sum > 1.2) {
        n = Math.max(25, Math.min(40, 25 + Math.round(mxv * 1.1)));
        for (var k = 0; k < n; k++) {
          var col = Math.floor(Math.random() * DRIFT_COLS), tries = 0;
          while (driftH[col] < 0.3 && tries++ < 10) col = Math.floor(Math.random() * DRIFT_COLS);
          var x = r.left + (col + 0.5) / DRIFT_COLS * r.width;
          var y = r.top - Math.min(driftH[col], 12) - 2;
          var side = x < r.left + r.width / 2 ? -1 : 1;
          bursts.push({
            x: x, y: y,
            vx: side * (60 + Math.random() * 190) + (Math.random() - 0.5) * 90,
            vy: -(40 + Math.random() * 120),
            r: 1.2 + Math.random() * 2.2,
            life: 1.6 + Math.random() * 0.9
          });
        }
      }
      driftH.fill(0);
      driftMaxRecent = 0;
      return n;
    }

    if (shakeBtn) {
      shakeBtn.addEventListener('click', function () {
        shakeWindow(18);
        burstDrift();
      });
    }

    if (stage) {
      var dg = dragState;
      stage.addEventListener('pointerdown', function (e) {
        if (e.button != null && e.button !== 0) return;
        dg.active = true;
        dg.moved = false;
        dg.x0 = dg.lx = e.clientX;
        dg.y0 = dg.ly = e.clientY;
        dg.lt = dg.t0 = performance.now();
        stage.classList.add('dragging');
        if (stage.setPointerCapture) {
          try { stage.setPointerCapture(e.pointerId); } catch (err) { /* synthetic pointers */ }
        }
      });
      stage.addEventListener('pointermove', function (e) {
        if (!dg.active) return;
        var t = performance.now();
        var dx = e.clientX - dg.x0;
        var dy = e.clientY - dg.y0;
        if (Math.abs(dx) > 6 || Math.abs(dy) > 6) dg.moved = true;
        shx = Math.max(-90, Math.min(90, dx));
        shy = Math.max(-46, Math.min(46, dy * 0.6));
        var dtm = Math.max(1, t - dg.lt);
        /* сглаживание скорости: одиночный микро-джиттер не считается рывком */
        var inst = (e.clientX - dg.lx) / dtm * 1000;
        svx = svx * 0.6 + Math.max(-2500, Math.min(2500, inst)) * 0.4;
        var instY = (e.clientY - dg.ly) / dtm * 1000;
        svy = svy * 0.6 + Math.max(-1500, Math.min(1500, instY)) * 0.4;
        dg.lx = e.clientX;
        dg.ly = e.clientY;
        dg.lt = t;
        /* рывок для разлёта: скорость окна за весь драг (устойчиво к джиттеру) */
        var wvx = dx / Math.max(16, t - dg.t0) * 1000;
        if (dg.moved && Math.abs(dx) > 18 && Math.abs(wvx) > 900 && shakeAge > 0.9) {
          shakeWindow(22);
          burstDrift();
        }
      });
      function endDrag(canceled) {
        if (!dg.active) return;
        dg.active = false;
        stage.classList.remove('dragging');
        /* pointercancel = скролл/жест, а не тап: никакого shake/взрыва */
        var wasClick = !canceled && !dg.moved && (performance.now() - dg.t0) < 420;
        if (wasClick) {
          shakeWindow(18);
          burstDrift();
        }
        if (canceled) {
          svx = 0;
          svy = 0;
        }
      }
      stage.addEventListener('pointerup', function () { endDrag(false); });
      stage.addEventListener('pointercancel', function () { endDrag(true); });
      stage.addEventListener('click', function (e) { e.preventDefault(); });
    }

    // hotkey Ctrl+Alt+S (same as the app)
    window.addEventListener('keydown', function (e) {
      if (!(e.ctrlKey && e.altKey)) return;
      var el = e.target;
      var tag = el && el.tagName ? el.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || (el && el.isContentEditable)) return;
      if (e.code === 'KeyS') {
        e.preventDefault();
        toggleSnow();
      }
    });

    // scroll / pointer
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('pointermove', function (e) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    }, { passive: true });
    onScroll();

    // snow boot
    if (canvas && ctx && !reduceMotion) {
      resizeSnowKeep();
      lastW = W;
      lastH = H;
      var rsTf = 0;
      function onViewportChange() {
        var nw = window.innerWidth;
        var nh = window.innerHeight;
        /* мобильный URL-bar: высота гуляет на десятки px при скролле — игнорируем */
        if (nw === lastW && Math.abs(nh - lastH) < 140) return;
        lastW = nw;
        lastH = nh;
        if (rsTf) return;
        rsTf = requestAnimationFrame(function () {
          rsTf = 0;
          resizeSnowKeep();
        });
      }
      window.addEventListener('resize', onViewportChange, { passive: true });
      window.addEventListener('orientationchange', onViewportChange, { passive: true });
      raf = requestAnimationFrame(loop);
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
        } else if (!raf) {
          lastT = 0;
          raf = requestAnimationFrame(loop);
        }
      });
    }

    // final init
    initReveal();
    initMagnet();
    initSpot();
    applyLang(lang);

    /* reveal fallback: if IO is starved (prerender/background tab), reveal above-the-fold */
    window.setTimeout(function () {
      $$('.rv').forEach(function (el) {
        if (el.classList.contains('in')) return;
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight * 0.95 && r.bottom > 0) el.classList.add('in');
      });
      var h1 = $('#h1');
      if (h1 && !h1.classList.contains('in')) h1.classList.add('in');
    }, 1000);

    // test hooks (invisible; evidence for QA)
    window.__DS = {
      snow: function () { return snowOn; },
      toggleSnow: toggleSnow,
      driftMax: function () { return driftMaxRecent; },
      driftSum: function () {
        var s = 0;
        for (var i = 0; i < DRIFT_COLS; i++) s += driftH[i];
        return s;
      },
      resetDrift: resetDrift,
      shake: shakeWindow,
      burst: burstDrift,
      bursts: function () { return bursts.length; },
      stageX: function () { return shx; },
      stageTransform: function () { var st = $('#stage'); return st ? st.style.transform : ''; },
      pump: pump,
      flakes: function () { return flakes.length; },
      flakesSample: function () {
        return flakes.slice(0, 4).map(function (p) { return [Math.round(p.x), Math.round(p.y)]; });
      },
      lang: function () { return lang; },
      color: function () { return snowColor; },
      tab: function () { return currentTab; },
      setLang: applyLang,
      setTab: setTab,
      warm: function (n) {
        n = n || 12;
        var frame = $('#heroFrame');
        if (!frame || !ctx) return 0;
        var r = frame.getBoundingClientRect();
        for (var k = 0; k < n; k++) {
          var f = newFlake(false);
          f.x = r.left + 20 + Math.random() * Math.max(40, r.width - 40);
          f.y = Math.max(4, r.top - 20 - Math.random() * 10);
          f.vy = 60 + Math.random() * 30;
          f.z = 0.6;
          flakes.push(f);
        }
        return n;
      }
    };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
