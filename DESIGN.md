# DESIGN.md — Desktop Snow Landing

> Один экран — один продукт. Живой снег на стекле Windows 11, показанный с точностью прибора и тишиной зимнего утра.

**Продукт:** Desktop Snow («Снег на рабочем столе») · слоган «Новый год уже здесь»
**Дата:** 2026-11-22 · **Статус:** Phase B, на утверждении (Phase C после подтверждения)
**Источник референса:** raycast.com → `references/design-systems/raycast.md` (предустановленная система)
**Источник PRD:** бриф пользователя от 2026-11-22 (полностью переопределяет палитру референса)

---

## 1. Visual Theme & Atmosphere

**Style**: Dark Editorial × macOS-native utility — «холодный Новый год» на обсидиане
**Keywords**: obsidian, frost, glass rim, metal headings, arctic glow, air, calm, precision
**Tone**: приборная точность дорогой утилиты и зимняя тишина — NOT новогодний базар, NOT шаблонный ИИ-лендинг, NOT «AI-градиенты»
**Feel**: как смотреть на первый снег сквозь стекло дорогого терминала.

**Interaction Tier**: **L2 流畅交互** — CSS + IntersectionObserver + vanilla JS, **ноль зависимостей** (без GSAP / Lenis / WebGL)
**Dependencies**: только Google Fonts (см. §3). Все анимации — CSS/JS 20 КБ-класса, 60 fps на среднем железе.

**Derivation note (отличия от пресета Raycast — осознанные):**
1. Фон `#070709` вместо raycast-овского `#07080a` — по PRD (обсидиан, не сине-чёрный).
2. Металлические градиенты заголовков `#FFFFFF → #A1A1AA` обязательны (у Raycast заголовки плоские) — фирменный приём этого сайта.
3. Двойной акцент: арктический синий `#38BDF8` + новогодний красный `#EF4444` (у Raycast красный — только brand-пунктуация; здесь красный тоже пунктуация, но входит в aurora-свечение).
4. Многослойная mac-глубина теней, inset-блики и стеклянные кромки — унаследованы от пресета без изменений.

**Landing-принципы (3 «вау» + 1 巧思):**
- Вау #1, Hero: металлический градиент H1 + word-stagger вход + aurora + живой снегопад + крупный реальный скриншот за стеклянной кромкой.
- Вау #2, первый скролл: широкая bento-карточка с гигантской типографикой «0 мс» (реальный факт паузы, не фейковая цифра-статистика).
- Вау #3, витрина: асимметричная bento-сетка со SpotlightCard-подсветкой, следующей за курсором.
- 巧思: хоткей **Ctrl+Alt+S** прямо на сайте включает/выключает снегопад — тот же хоткей, что в приложении. Плюс 4 свотча цвета снега = настройки приложения, перенесённые на страницу.

---

## 2. Color Palette & Roles

```css
:root {
  /* Backgrounds */
  --bg: #070709;                              /* обсидиан, страница (НЕ #0F172A) */
  --surface: #0D0E12;                         /* панели, карточки */
  --surface-2: #0B0C10;                       /* чередующиеся секции */
  --surface-hover: #12141A;                   /* hover-поверхность */

  /* Borders & glass rims */
  --border: rgba(255, 255, 255, 0.08);        /* стеклянная кромка */
  --border-strong: rgba(255, 255, 255, 0.14); /* активная кромка / верхний блик */
  --rim-top: inset 0 1px 0 rgba(255, 255, 255, 0.14); /* свет сверху, обязателен на всех панелях */

  /* Text */
  --text: #F8FAFC;                            /* заголовки, важное */
  --text-2: #8E8E93;                          /* описания, вторичный текст */
  --text-3: #63636A;                          /* подписи, микро-лейблы */
  --text-invert: #101014;                     /* текст на белой кнопке */

  /* Accents */
  --ice: #38BDF8;                             /* арктический синий: ссылки, фокус, активные табы */
  --ice-deep: #0284C7;                        /* глубина свечения */
  --red: #EF4444;                             /* новогодний красный: пунктуация, южная aurora */
  --red-deep: #DC2626;
  --white: #FFFFFF;                           /* морозный белый: главный CTA */

  /* Snow palette (4 цвета из настроек приложения) */
  --snow-1: #FFFFFF;                          /* Белый (default) */
  --snow-2: #BAE6FD;                          /* Ледяной синий */
  --snow-3: #FDE68A;                          /* Тёплое золото */
  --snow-4: #FBCFE8;                          /* Нежно-розовый */

  /* Glow / aurora */
  --glow-ice: rgba(56, 189, 248, 0.16);
  --glow-red: rgba(239, 68, 68, 0.14);
  --glow-white: rgba(255, 255, 255, 0.50);

  /* Metal heading gradient */
  --grad-head: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);

  /* RGB variants for rgba() */
  --bg-rgb: 7, 7, 9;
  --surface-rgb: 13, 14, 18;
  --ice-rgb: 56, 189, 248;
  --red-rgb: 239, 68, 68;
  --white-rgb: 255, 255, 255;
  --text-rgb: 248, 250, 252;
}
```

**Color Rules:**
- Все цвета — только через CSS-переменные; hardcoded hex в компонентах запрещён.
- В одной секции — один акцент: синий ИЛИ красный (плюс белый/серый). Красный — пунктуация, максимум 2 пятна на страницу (aurora-угол + красный бейдж-точка).
- Заголовки-градиенты только на `h1`/`h2`; тело, подписи, CTA — плоские цвета.
- Запрещённая палитра: `#0F172A` и любые сине-фиолетовые «AI-градиенты».

---

## 3. Typography Rules

**Font Stack:**
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;600&display=swap');
```

| Role | Font | Size | Weight | Line Height | Letter Spacing |
|------|------|------|--------|-------------|----------------|
| Hero H1 | Plus Jakarta Sans | `clamp(40px, 6vw, 72px)` | 800 | 1.02 | −0.04em |
| Section H2 | Plus Jakarta Sans | `clamp(30px, 3.8vw, 44px)` | 800 | 1.08 | −0.03em |
| H3 (карточки) | Plus Jakarta Sans | 20px | 700 | 1.25 | −0.01em |
| Hero lead | Inter | `clamp(16px, 1.8vw, 19px)` | 400 | 1.65 | 0.01em |
| Body | Inter | 17px | 400 | 1.65 | 0.01em |
| Body Small | Inter | 15px | 400 | 1.6 | 0.01em |
| Label (eyebrow) | JetBrains Mono | 12px | 600 | 1 | 0.14em, uppercase |
| Mono Tag (.techline) | JetBrains Mono | 12px | 500 | 1.5 | 0.02em |
| kbd | JetBrains Mono | 12px | 600 | 1 | 0.02em |
| Caption | Inter | 13px | 500 | 1.5 | 0.01em |

**Typography Rules:**
- Заголовки — только Plus Jakarta Sans 700/800 с отрицательным трекингом; Inter 400 в заголовках запрещён.
- Body — Inter 400/500; положительный межбуквенный интервал `+0.01em` (тёмный фон «разрежает» текст).
- **NEVER use**: Arial, системные шрифты по умолчанию (`system-ui` для заголовков), любые serif, Comic-подобные.
- `word-break` заголовков: `&nbsp;` вручную в RU/UA/EN, чтобы не было висячих слов («на&nbsp;твоём рабочем&nbsp;столе»).

**Text Decoration (по `references/text-decoration-rules.md`, стиль = 暗黑科技):**
- Hero h1: металлический градиент `background: var(--grad-head); -webkit-background-clip: text; -webkit-text-fill-color: transparent;` — **без** text-shadow (не стакаем).
- Section h2: тот же градиент только на ключевом span, остальное — `--text` плоский.
- Body / captions / CTA: никаких теней и градиентов.

---

## 4. Component Stylings

### Buttons
```css
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  border-radius: 999px; font: 600 15px/1 'Inter', sans-serif;
  padding: 14px 26px; min-height: 48px; cursor: pointer;
  transition: transform .18s ease, background .18s ease, opacity .18s ease, border-color .18s ease;
}
.btn:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--ice); }
.btn:disabled { opacity: .45; pointer-events: none; }

/* Primary — белая «морозная» пилюля */
.btn-primary { background: rgba(255,255,255,.92); color: var(--text-invert); border: 1px solid rgba(255,255,255,.6);
  box-shadow: var(--rim-top), 0 10px 30px rgba(0,0,0,.45); }
.btn-primary:hover { background: var(--white); transform: translateY(-1px); }
.btn-primary:active { transform: translateY(0) scale(.99); }

/* Ghost — вторичное действие */
.btn-ghost { background: transparent; color: var(--text); border: 1px solid var(--border-strong);
  box-shadow: var(--rim-top); }
.btn-ghost:hover { border-color: rgba(255,255,255,.28); background: rgba(255,255,255,.04); }
.btn-ghost:active { background: rgba(255,255,255,.07); }

/* Nav download — компактная версия основной */
.btn-nav { padding: 10px 18px; min-height: 38px; font-size: 13px; }
```

### Cards (Mica / Acrylic, стеклянная кромка)
```css
.card {
  position: relative; overflow: hidden;
  background: rgba(20, 22, 30, 0.62);
  border: 1px solid var(--border);
  border-radius: 18px;
  box-shadow: var(--rim-top), 0 1px 2px rgba(0,0,0,.35);
  backdrop-filter: blur(14px) saturate(1.15);
  padding: clamp(22px, 3vw, 34px);
  transition: border-color .25s ease, transform .25s ease;
}
.card:hover { border-color: var(--border-strong); }
.card:focus-within { border-color: var(--ice); }
/* Spotlight-подсветка, следующая за курсором (см. §7) */
.card::before {
  content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0;
  background: radial-gradient(240px circle at var(--mx, 50%) var(--my, 50%),
              rgba(56,189,248,.10), transparent 65%);
  transition: opacity .3s ease;
}
.card:hover::before { opacity: 1; }
```

### Navigation
```css
.nav {
  position: fixed; inset: 0 0 auto 0; z-index: 50; height: 64px;
  display: flex; align-items: center; padding: 0 clamp(16px, 4vw, 40px);
  background: rgba(7, 7, 9, 0.72);
  backdrop-filter: blur(14px) saturate(1.2);
  border-bottom: 1px solid transparent;
  transition: background .25s ease, border-color .25s ease;
}
.nav.scrolled { background: rgba(7, 7, 9, 0.88); border-bottom-color: var(--border); }
.nav a { color: var(--text-2); font: 500 14px/1 'Inter', sans-serif; padding: 10px 12px; border-radius: 8px; }
.nav a:hover { color: var(--text); background: rgba(255,255,255,.05); }
.nav a:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--ice); }
```

### Links
```css
.link { color: var(--ice); text-decoration: none; text-underline-offset: 4px; transition: color .15s ease; }
.link:hover { color: #7DD3FC; text-decoration: underline; }
.link:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--ice); border-radius: 4px; }
```

### Tags / Badges / Tech line
```css
.techline { font: 500 12px/1.5 'JetBrains Mono', monospace; color: var(--text-3); letter-spacing: .02em; }
.techline .dot { color: var(--text-3); margin: 0 8px; }
.badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 12px; border-radius: 999px;
  background: rgba(255,255,255,.05); border: 1px solid var(--border); box-shadow: var(--rim-top);
  font: 600 12px/1 'JetBrains Mono', monospace; color: var(--text-2); }
.badge .live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--red); box-shadow: 0 0 10px var(--glow-red); }
```

### kbd — физические клавиши (5-слойная mac-тень из пресета Raycast)
```css
.kbd {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 34px; height: 34px; padding: 0 9px; margin: 0 2px;
  border-radius: 7px; border: 1px solid rgba(255,255,255,.14);
  background: linear-gradient(180deg, #17181D 0%, #0F1014 100%);
  color: var(--text); font: 600 12px/1 'JetBrains Mono', monospace;
  box-shadow: var(--rim-top),
              0 1px 0 rgba(0,0,0,.6),
              0 3px 0 rgba(0,0,0,.45),
              inset 0 -1px 0 rgba(0,0,0,.5);
  transform: translateY(0); transition: transform .1s ease, box-shadow .1s ease;
}
.kbd:active, .kbd.pressed { transform: translateY(2px);
  box-shadow: var(--rim-top), 0 1px 0 rgba(0,0,0,.6), inset 0 -1px 0 rgba(0,0,0,.5); }
.kbd-plus { color: var(--text-3); font: 500 12px 'JetBrains Mono', monospace; margin: 0 4px; }
```

### Tabs (сегмент-контрол, строго одна строка без переносов)
```css
.tabs { display: inline-flex; flex-wrap: nowrap; gap: 4px; padding: 4px; border-radius: 999px;
  background: rgba(255,255,255,.04); border: 1px solid var(--border); box-shadow: var(--rim-top); }
.tab { white-space: nowrap; padding: 9px 18px; border-radius: 999px; border: 1px solid transparent;
  background: transparent; color: var(--text-2); font: 500 13px/1 'Inter', sans-serif; cursor: pointer;
  transition: color .18s ease, background .18s ease; }
.tab:hover { color: var(--text); }
.tab[aria-selected="true"] { color: var(--text); background: rgba(255,255,255,.10);
  border-color: var(--border); box-shadow: var(--rim-top); }
.tab:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--ice); }
```

### Snow color swatches (зеркало настроек приложения)
```css
.swatch { width: 22px; height: 22px; border-radius: 50%; cursor: pointer;
  border: 1px solid rgba(255,255,255,.25); padding: 0; }
.swatch[aria-pressed="true"] { box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--ice); }
.swatch:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--bg), 0 0 0 4px var(--ice); }
```

### Screenshot frame (реальный скриншот программы в стеклянном обрамлении)
```css
.shot-frame {
  position: relative; border-radius: 16px; overflow: hidden;
  border: 1px solid var(--border-strong);
  background: var(--surface-2);
  box-shadow: var(--rim-top), 0 48px 140px rgba(0,0,0,.65), 0 18px 48px rgba(0,0,0,.5);
}
.shot-frame img { display: block; width: 100%; height: auto; }
/* aurora-ореол вокруг витрины — не тень, а размытый градиент позади (без filter: blur) */
.shot-glow::after { content: ""; position: absolute; inset: -18%; z-index: -1; pointer-events: none;
  background:
    radial-gradient(46% 42% at 22% 12%, var(--glow-ice), transparent 70%),
    radial-gradient(40% 38% at 82% 88%, var(--glow-red), transparent 70%);
}
```

---

## 5. Layout Principles

**Container:**
- Max width: `1160px`, padding `0 clamp(16px, 4vw, 32px)`
- Hero showcase (витрина): `max-width: 1080px` (по PRD)
- Narrow variant (текстовые блоки): `760px`

**Spacing Scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96 / 128
- Section padding (вертикаль): `clamp(72px, 9vw, 128px)`
- Component gap: 16–24px; bento gap: `clamp(14px, 1.6vw, 20px)`
- Card internal padding: `clamp(22px, 3vw, 34px)`

**Grid:**
```css
.bento { display: grid; grid-template-columns: repeat(12, 1fr); gap: clamp(14px, 1.6vw, 20px); }
.bento .w7 { grid-column: span 7; }
.bento .w5 { grid-column: span 5; }
```

**Композиция страницы (по PRD):**
1. Nav (fixed, 64px) → 2. Hero (H1 + lead + CTA + techline + витрина 1080px) → 3. Bento features (4 карточки: 7/5 + 5/7) → 4. Настройки Win11 (табы + крупный скриншот) → 5. Финальный CTA → 6. Футер одной строкой.

---

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| 0 Void | нет тени, `--bg` | фон страницы |
| 1 Subtle | `0 1px 2px rgba(0,0,0,.35)` | мелкие элементы, разделители |
| 2 Ring | `--rim-top` + `1px solid var(--border)` | карточки, панели, чипы |
| 3 Mica | Level 2 + `backdrop-filter: blur(14px) saturate(1.15)` + `rgba(20,22,30,.62)` | стеклянные карточки bento |
| 4 Elevated | `0 24px 64px rgba(0,0,0,.55)` + `--rim-top` | всплывающие панели, активная вкладка-пилюля |
| 5 Showcase | `0 48px 140px rgba(0,0,0,.65), 0 18px 48px rgba(0,0,0,.5)` + `--rim-top` | витрина скриншота (hero и секция настроек) |
| 6 Key | 4-слойная тень + inset-грани (см. `.kbd`) | физические клавиши kbd |

**Shadow Philosophy (унаследовано от Raycast):** тени всегда парные — внешняя тень + inset-блик сверху; элементы ощущаются как стекло на тёмном столе, а не как плоские прямоугольники. Ореолы-свечения — только `radial-gradient` на псевдоэлементах, без `filter: blur()`.

---

## 7. Animation & Interaction

**Motion Philosophy**: 静かに動く — «движется тихо». Только `opacity` и `transform`. Всё, что не помогает читать продукт, — не анимируется.
**Tier**: L2. **Dependencies**: нет (ни GSAP, ни Lenis, ни WebGL). Fonts — единственный внешний ресурс.

### 6 обязательных signature moments (L2-манифест)

| # | Класс | Приём | Реализация |
|---|-------|-------|------------|
| 1 | Text — Hero H1 | SplitText-like word-stagger: слова в spans, вход `translateY(24px)→0 + opacity`, stagger 60ms, 700ms `cubic-bezier(.2,.7,.2,1)`; градиент — статичный металл | vanilla JS split + CSS `.w{display:inline-block}` |
| 2 | Text — Section H2 | ScrollFloat: `translateY(36px)→0` по IntersectionObserver, 850ms, тот же easing | CSS + IO |
| 3 | Text — Body/Label | ScrollReveal: `.rv{opacity:0; transform:translateY(16px)}` → `.in`, stagger через `--i` (70ms шаг) | CSS + IO (threshold .15) |
| 4 | Element | **Magnet** на главном CTA (±6px к курсору, `rAF`-троттлинг, только `hover:hover`) + GlareHover на витрине | JS 15 строк |
| 5 | Component | **SpotlightCard** на bento (`--mx/--my` + `::before` radial 240px) + табы скриншотов с переходом `opacity + scale(.985→1)` 280ms | CSS vars + JS |
| 6 | Background | CSS Aurora (2 радиальных градиента, fixed) + Canvas-снегопад: 3 слоя глубины, ветер, реакция на курсор, 4 цвета | Canvas 2D, один rAF |

### Base Setup (снегопад — ключевая механика страницы)
```js
// Один rAF-цикл на всё. DPR ≤ 2. Плотность: 140 частиц desktop / 70 mobile.
// 3 слоя: depth 1.0 / 0.65 / 0.35 → радиус, скорость и параллакс масштабируются.
// Ветер: sin(t) горизонтальный дрейф; реакция на курсор — отталкивание в радиусе 90px.
// Пауза: document.hidden → cancel rAF; prefers-reduced-motion → снег не запускается вовсе.
// Хоткей Ctrl+Alt+S (как в приложении) — вкл/выкл снегопада на странице (игнорировать в input/textarea).
// 4 цвета: --snow-1..4, свотчи .swatch переключают палитру частиц (localStorage-память).
```

### Entrance Animation
```css
.rv { opacity: 0; transform: translateY(16px); }
.rv.in { opacity: 1; transform: none;
  transition: opacity .6s cubic-bezier(.2,.7,.2,1) calc(var(--i, 0) * 70ms),
              transform .7s cubic-bezier(.2,.7,.2,1) calc(var(--i, 0) * 70ms); }
/* H1 слова */
.h1w { display: inline-block; opacity: 0; transform: translateY(24px); }
.h1w.in { opacity: 1; transform: none; transition: opacity .5s ease calc(var(--i) * 60ms), transform .7s cubic-bezier(.2,.7,.2,1) calc(var(--i) * 60ms); }
```

### Scroll Behavior
```js
// IO один на страницу: new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add('in'), io.unobserve(e.target))), {threshold:.15, rootMargin:'0px 0px -8% 0px'});
// Nav: passive scroll + rAF → .nav.scrolled при scrollY > 8.
// Aurora: фиксированные радиальные градиенты; лёгкий сдвиг (translateY ±14px) от scrollY — параллакс без джанка.
```

### Hover & Focus States
```css
/* Каждый интерактивный элемент: hover + :focus-visible (см. §4) */
/* Магнит: */
.magnet { transition: transform .18s ease; }
/* Табы: смена скриншота без layout-shift — оба img предзагружены, у контейнера фикс. aspect-ratio ~1.34 */
```

### Special Effects
- Aurora: два пятна — северное (синее, `--glow-ice`) за hero и южное (красное, `--glow-red`) за футером; между ними страница «дышит» обсидианом.
- Свечение витрины: радиальный ореол синий/красный позади `.shot-frame` (псевдоэлемент, `z-index:-1`), **без** `filter: blur()`.
- Тихая деталь: точка-индикатор в бейдже «Windows 10 / 11» медленно пульсирует (opacity 1→.5, 2.4s) — единственная «живая» точка вне снега.

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
  .rv, .h1w { opacity: 1 !important; transform: none !important; }
  .magnet { transform: none !important; }
  /* снегопад: JS не создаёт canvas; aurora остаётся статичным градиентом */
}
```

### Performance Budget
- ≤ 2 `pointermove`-слушателя, оба rAF-троттлинг; один rAF-цикл на снег.
- `backdrop-filter: blur(14px)` только nav + bento-карточки (малые площади); на moving-элементах — никогда.
- Никаких `filter: blur()` на анимациях; SVG-снежинка логотипа — статичная инлайн-SVG (без анимации пути).
- Все секции ниже первого экрана не анимируют ничего до появления в вьюпорте.

---

## 8. Do's and Don'ts

### Do
- Строить визуал **только** на реальных скриншотах `screenshots/settings-{general,snow,decor}.png`, типографике и фоновом снегопаде.
- Держать двойную тень (внешняя + inset-блик) на каждой панели — это ДНК референса.
- Металлический градиент `#FFFFFF→#A1A1AA` — на h1 и ключевых span h2, и только там.
- Красный — пунктуация: 2 пятна на всю страницу (aurora-угол + live-точка), не больше.
- Один акцент на секцию: синий ИЛИ красный; белый/серый — нейтральный фон системы.
- Все интерактивные элементы: hover + `:focus-visible` + touch-таргет ≥ 44×44px.
- i18n RU/UA/EN без перезагрузки: `data-i18n` + JS-словарь, `&nbsp;` в заголовках каждого языка.
- Табы «Общие / Снег / Украшения» — строго одна строка (`white-space: nowrap`), без переносов на 390px.
- Снегопад — деликатный: ≤ 140 частиц на десктопе, пауза в скрытой вкладке, полное выключение при `prefers-reduced-motion`.

### Don't
- ❌ Никаких нарисованных кодом муляжей интерфейса: фейковое окно «Заметки.txt — Блокнот», CSS-панель задач, canvas-сцены с поездом/ёлками/лепкой комов — **удаляются полностью**.
- ❌ Никаких эмодзи (`📝`, `🎄`, `⛄`) — ни в UI, ни в тексте, ни в иконках.
- ❌ Никаких «ёлок-треугольников» (▲) и серых прямоугольников-заглушек вместо иллюстраций.
- ❌ Не делать секцию «3 цифры в ряд» (C++/3%/0 мс), блок «3 шага 1-2-3» и футер «Сделано с любовью».
- ❌ Никакого фона `#0F172A` и сине-фиолетовых «AI-градиентов» — только обсидиан `#070709`.
- ❌ Никаких дефолтных шрифтов (Arial / system-ui / Inter 400) в заголовках.
- ❌ Не накладывать `text-shadow` на градиентные заголовки (визуальный перегруз).
- ❌ Не использовать `filter: blur()` на движущихся элементах и `backdrop-filter` > 14px.
- ❌ Никакого WebGL, GSAP, Lenis, scroll-jacking — бюджет L2 без зависимостей.
- ❌ Не писать hardcoded hex в компонентах — только CSS-переменные.
- ❌ Не рисовать фейковые desktop-мокапы «рабочего стола с сугробами» — если нет реального ассета, обходимся типографикой.
- ❌ Не допускать горизонтального overflow на 390px и висячих слов в заголовках.

---

## 9. Responsive Behavior

**Breakpoints:**
| Name | Width | Key Changes |
|------|-------|-------------|
| Desktop | ≥ 1200px | bento 12 колонок 7/5+5/7, витрина 1080px, hero H1 до 72px |
| Laptop | 900–1199px | bento 12 колонок, витрина 100%, H1 ≤ 60px |
| Tablet | 640–899px | bento: w7/w5 → span 12 (две карточки в ряд через span 6), nav-якоря скрыты |
| Mobile | < 640px | одна колонка, H1 40px, витрина 100%, табы в одну строку (13px→12px), kbd 34→30px |

**Touch Targets:** минимум 44×44px; кнопки — 48px высоты; свотчи — визуально 22px, но hit-area 44px (`::after` inset −11px).
**Collapsing Strategy:** nav-якоря `display:none` < 900px (без бургера — остаются лого, язык, «Скачать»); bento — в одну колонку < 640px; techline переносится по точкам-разделителям, не рвёт слова; табы не переносятся никогда (сжимается padding).

```css
@media (max-width: 899px) {
  .bento .w7, .bento .w5 { grid-column: span 12; }
  .nav-links { display: none; }
  .hero-showcase { max-width: 100%; }
}
@media (max-width: 639px) {
  :root { --section-pad: 64px; }
  .kbd { min-width: 30px; height: 30px; font-size: 11px; }
  .tab { padding: 8px 12px; font-size: 12px; }
  body { overflow-x: hidden; }
}
```

---

## Приложение A — Карта реальных ассетов (проверено)

| Файл | Размер | Где используется |
|------|--------|------------------|
| `screenshots/settings-general.png` | 972×724 (1.343) | секция «Интерфейс», таб «Общие» |
| `screenshots/settings-snow.png` | 977×725 (1.348) | **Hero-витрина** (самый визуальный: слайдеры + 4 цвета) + таб «Снег» |
| `screenshots/settings-decor.png` | 983×718 (1.369) | секция «Интерфейс», таб «Украшения» |

`demo.mp4` отсутствует (видео отложено пользователем) → по брифу Hero использует «крупную презентацию реальных скриншотов». Никаких других иллюстраций не создаётся: логотип — инлайн-SVG снежинка, иконки — инлайн-SVG (без библиотек).

## Приложение B — Приёмка Phase C (checklist)

- [ ] Старые муляжи (фейковый блокнот, CSS-таскбар, canvas-сцены, эмодзи) физически удалены из кода.
- [ ] Все цвета — через CSS-переменные; grep по `#` в CSS/JS — только в `:root`.
- [ ] Шрифты: Plus Jakarta Sans 800 в заголовках, Inter в тексте, JetBrains Mono в технических строках.
- [ ] 6 signature moments реализованы; `prefers-reduced-motion` гасит всё.
- [ ] Скриншоты 1440×900 и 390×844: `ovf=0`, табы в одну строку, H1 не рвётся.
- [ ] Ctrl+Alt+S переключает снегопад; 4 свотча меняют цвет частиц.
- [ ] Языки RU/UA/EN переключаются без перезагрузки, все строки переведены.
- [ ] Статус: DONE VERIFIED только со скриншотами живого браузера + строкой консоли.
