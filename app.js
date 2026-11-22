/* Desktop Snow landing — снег/конфетти на фоне, живой рабочий стол Win11 с физикой сугробов,
   песочница снежков, новогодний мир с поездом, превью реальных настроек. Без зависимостей. */
(function () {
'use strict';
var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var pageHidden = false;
document.addEventListener('visibilitychange', function () { pageHidden = document.hidden; });

/* ── общие помощники ── */
function rnd(a, b) { return a + Math.random() * (b - a); }
function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
function fit(cv) { /* логический размер + DPR-бэкинг; возвращает ctx,W,H */
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = cv.clientWidth || 300, h = cv.clientHeight || 150;
  var bw = Math.round(w * dpr), bh = Math.round(h * dpr);
  if (cv.width !== bw || cv.height !== bh) { cv.width = bw; cv.height = bh; }
  var ctx = cv.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx: ctx, W: w, H: h };
}
function visibleLoop(cv, step) { /* rAF-цикл с паузой на скрытой вкладке и вне экрана */
  var visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }, { threshold: .02 }).observe(cv);
  }
  var last = 0;
  function frame(ts) {
    requestAnimationFrame(frame);
    if (!visible || pageHidden) { last = ts; return; }
    var dt = Math.min(.05, (ts - last) / 1000 || .016); last = ts;
    step(dt, ts);
  }
  requestAnimationFrame(frame);
}

/* ═══════════ i18n RU / UA / EN ═══════════ */
var I18N = {
  ru: {
    'nav.features':'Возможности','nav.install':'Установка','nav.dl':'Скачать',
    'hero.kicker':'Новогодний оверлей для Windows 10/11',
    'hero.t1':'Новый год уже здесь.','hero.t2':'Прямо на твоём рабочем столе',
    'hero.lead':'Живой снег ложится на окна и панель задач, едет вместе с окнами и сам исчезает в играх. Плюс праздничный мир: наряжай ёлку, лепи снеговиков и лови поезд с подарками.',
    'hero.btn':'Скачать для Windows',
    'hero.badges':'C++ • Direct2D • < 1 МБ • 30–144 FPS • Без установки',
    'panel.mode':'Режим','panel.snow':'Снег','panel.confetti':'Конфетти','panel.color':'Цвет',
    'panel.hint':'Меняет снег на этой странице',
    'panel.c1':'Белый','panel.c2':'Ледяной голубой','panel.c3':'Тёплое золото','panel.c4':'Нежно-розовый',
    'demo.win':'Заметки.txt — Блокнот',
    'demo.l1':'Привет! Это обычное окно Windows.',
    'demo.l2':'Но на его шапке уже лежит снег…',
    'demo.l3':'Схвати меня за шапку и потащи. Дёрни резко — снег слетит!',
    'demo.paused':'Снег на паузе · 0 мс','demo.shake':'Потрясти окно','demo.game':'Режим игры',
    'demo.hint':'Снег ложится на шапку окна и панель задач. Таскай окно — проверь!',
    'bento.k':'Что внутри','bento.h':'Возможности',
    'c1t':'Попиксельная привязка и умная пауза',
    'c1d':'Снег держится ровно за видимой рамкой окна — без зазоров, осыпается при сворачивании и исчезает за 0 мс, когда запускается игра, видео на весь экран или выделение области скриншота.',
    'c1l3':'Ножницы',
    'c2t':'Лепка снежков и снеговиков',
    'c2d':'Зажми ЛКМ на сугробе и проведи мышью — скатаешь ком. Три кома складываются в снеговика прямо на карточке.',
    'c2hint':'Зажми и катай','c2reset':'Сбросить',
    'c3t':'Живой новогодний мир',
    'c3d':'Поезд с подарками проносится по столу и с физикой разбрасывает снеговиков — через пару секунд они собираются обратно.',
    'th1':'Классика','th2':'Иней','th3':'Леденцы','th4':'Золотая ночь',
    'c4t':'Настоящие настройки в стиле Windows 11',
    'c4d':'Отдельное окно настроек в духе Mica: режим «что падает», интенсивность, размер хлопьев, скорость и ветер, четыре фирменных цвета, украшения и мониторы.',
    'c4t1':'Общие','c4t2':'Снег','c4t3':'Украшения',
    'c4cap.g':'Общие — снегопад, автозапуск, паузы и горячие клавиши',
    'c4cap.s':'Снег — интенсивность 200%, размер, скорость, ветер и сугробы',
    'c4cap.d':'Украшения — темы, Дед Мороз, поезд и снежки',
    'launch.t1':'Скачай ZIP','launch.d1':'со страницы Releases',
    'launch.t2':'Распакуй','launch.d2':'в любую папку',
    'launch.t3':'DesktopSnow.exe','launch.d3':'и снег пошёл',
    'launch.btn':'Скачать ZIP',
    'launch.note':'Портативно: без установки и без Visual C++ Redistributable. Управление — из трея и горячими клавишами.',
    'foot.copy':'© 2026 Desktop Snow','foot.repo':'GitHub','foot.rel':'Релизы',
    'alt.g':'Окно настроек Desktop Snow — вкладка «Общие»',
    'alt.s':'Окно настроек Desktop Snow — вкладка «Снег»',
    'alt.d':'Окно настроек Desktop Snow — вкладка «Украшения»',
    title:'Desktop Snow — Новый год уже здесь. Прямо на твоём рабочем столе'
  },
  ua: {
    'nav.features':'Можливості','nav.install':'Встановлення','nav.dl':'Завантажити',
    'hero.kicker':'Новорічний оверлей для Windows 10/11',
    'hero.t1':'Новий рік уже тут.','hero.t2':'Прямо на твоєму робочому столі',
    'hero.lead':'Живий сніг лягає на вікна й панель завдань, їде разом із вікнами й сам зникає в іграх. Плюс святковий світ: наряджай ялинку, ліпи сніговиків і лови потяг із подарунками.',
    'hero.btn':'Завантажити для Windows',
    'hero.badges':'C++ • Direct2D • < 1 МБ • 30–144 FPS • Без встановлення',
    'panel.mode':'Режим','panel.snow':'Сніг','panel.confetti':'Конфеті','panel.color':'Колір',
    'panel.hint':'Змінює сніг на цій сторінці',
    'panel.c1':'Білий','panel.c2':'Крижано-блакитний','panel.c3':'Тепле золото','panel.c4':'Ніжно-рожевий',
    'demo.win':'Нотатки.txt — Блокнот',
    'demo.l1':'Привіт! Це звичайне вікно Windows.',
    'demo.l2':'Але на його шапці вже лежить сніг…',
    'demo.l3':'Хапай мене за шапку й тягни. Різко смикнеш — сніг злетить!',
    'demo.paused':'Сніг на паузі · 0 мс','demo.shake':'Потрусити вікно','demo.game':'Ігровий режим',
    'demo.hint':'Сніг лягає на шапку вікна й панель завдань. Таскай вікно — перевір!',
    'bento.k':'Що всередині','bento.h':'Можливості',
    'c1t':'Піксельна прив’язка й розумна пауза',
    'c1d':'Сніг тримається рівно за видимою рамкою вікна — без зазорів, осипається при згортанні та зникає за 0 мс, коли запускається гра, відео на весь екран чи виділення області скриншота.',
    'c1l3':'Ножиці',
    'c2t':'Ліпка сніжок і сніговиків',
    'c2d':'Затисни ЛКМ на заметі й проведи мишею — скатаєш грудку. Три грудки складаються у сніговика прямо на картці.',
    'c2hint':'Затисни й коти','c2reset':'Скинути',
    'c3t':'Живий новорічний світ',
    'c3d':'Потяг із подарунками проноситься столом і з фізикою розкидає сніговиків — за пару секунд вони збираються назад.',
    'th1':'Класика','th2':'Паморозь','th3':'Цукерки','th4':'Золота ніч',
    'c4t':'Справжні налаштування у стилі Windows 11',
    'c4d':'Окрема книга налаштувань у дусі Mica: режим «що падає», інтенсивність, розмір пластівців, швидкість і вітер, чотири фірмові кольори, прикраси та монітори.',
    'c4t1':'Загальні','c4t2':'Сніг','c4t3':'Прикраси',
    'c4cap.g':'Загальні — снігопад, автозапуск, паузи й гарячі клавіші',
    'c4cap.s':'Сніг — інтенсивність 200%, розмір, швидкість, вітер і замети',
    'c4cap.d':'Прикраси — теми, Дід Мороз, потяг і сніжки',
    'launch.t1':'Завантаж ZIP','launch.d1':'зі сторінки Releases',
    'launch.t2':'Розпакуй','launch.d2':'у будь-яку папку',
    'launch.t3':'DesktopSnow.exe','launch.d3':'і сніг пішов',
    'launch.btn':'Завантаж ZIP',
    'launch.note':'Портативно: без встановлення й без Visual C++ Redistributable. Керування — з трея та гарячими клавішами.',
    'foot.copy':'© 2026 Desktop Snow','foot.repo':'GitHub','foot.rel':'Релізи',
    'alt.g':'Вікно налаштувань Desktop Snow — вкладка «Загальні»',
    'alt.s':'Вікно налаштувань Desktop Snow — вкладка «Сніг»',
    'alt.d':'Вікно налаштувань Desktop Snow — вкладка «Прикраси»',
    title:'Desktop Snow — Новий рік уже тут. Прямо на твоєму робочому столі'
  },
  en: {
    'nav.features':'Features','nav.install':'Install','nav.dl':'Download',
    'hero.kicker':'A New Year overlay for Windows 10/11',
    'hero.t1':'The New Year is here.','hero.t2':'Right on your desktop',
    'hero.lead':'Living snow settles on windows and the taskbar, travels with your windows and disappears on its own in games. Plus a festive world: decorate a tree, roll snowmen and catch the gift train.',
    'hero.btn':'Download for Windows',
    'hero.badges':'C++ • Direct2D • < 1 MB • 30–144 FPS • No install',
    'panel.mode':'Mode','panel.snow':'Snow','panel.confetti':'Confetti','panel.color':'Color',
    'panel.hint':'Changes the snow on this page',
    'panel.c1':'White','panel.c2':'Ice blue','panel.c3':'Warm gold','panel.c4':'Soft pink',
    'demo.win':'Notes.txt — Notepad',
    'demo.l1':'Hi! This is an ordinary Windows window.',
    'demo.l2':'But snow is already piling up on its title bar…',
    'demo.l3':'Grab me by the title bar and drag. Yank hard — the snow flies off!',
    'demo.paused':'Snow paused · 0 ms','demo.shake':'Shake the window','demo.game':'Game mode',
    'demo.hint':'Snow settles on the title bar and the taskbar. Drag the window — try it!',
    'bento.k':'Inside','bento.h':'Features',
    'c1t':'Pixel-perfect snapping & smart pause',
    'c1d':'Snow clings exactly to the visible frame of every window — no gaps, crumbles when you minimize, and vanishes in 0 ms when a game launches, a video goes fullscreen, or you select a screenshot region.',
    'c1l3':'Snipping Tool',
    'c2t':'Rolling snowballs & snowmen',
    'c2d':'Hold LMB on a drift and drag — you roll a snowball. Three balls stack into a snowman right on the card.',
    'c2hint':'Hold & roll','c2reset':'Reset',
    'c3t':'A living Christmas world',
    'c3d':'The gift train rushes across the screen and physically scatters snowmen — a couple of seconds later they pull themselves back together.',
    'th1':'Classic','th2':'Frost','th3':'Candy','th4':'Golden night',
    'c4t':'Real settings, Windows 11 style',
    'c4d':'A dedicated settings window in the Mica spirit: what falls, intensity, flake size, speed and wind, four signature colors, decorations and monitors.',
    'c4t1':'General','c4t2':'Snow','c4t3':'Decorations',
    'c4cap.g':'General — snowfall, autostart, pauses and hotkeys',
    'c4cap.s':'Snow — 200% intensity, size, speed, wind and drifts',
    'c4cap.d':'Decorations — themes, Ded Moroz, the train and snowballs',
    'launch.t1':'Download the ZIP','launch.d1':'from the Releases page',
    'launch.t2':'Unzip','launch.d2':'into any folder',
    'launch.t3':'DesktopSnow.exe','launch.d3':'and the snow begins',
    'launch.btn':'Download ZIP',
    'launch.note':'Portable: no installation, no Visual C++ Redistributable. Control it from the tray and hotkeys.',
    'foot.copy':'© 2026 Desktop Snow','foot.repo':'GitHub','foot.rel':'Releases',
    'alt.g':'Desktop Snow settings window — General tab',
    'alt.s':'Desktop Snow settings window — Snow tab',
    'alt.d':'Desktop Snow settings window — Decorations tab',
    title:'Desktop Snow — The New Year is here. Right on your desktop'
  }
};
var curLang = 'ru', curColIdx = 1, shotTab = 'general';
function T(k){ var d = I18N[curLang] || I18N.ru; return d[k] != null ? d[k] : (I18N.ru[k] != null ? I18N.ru[k] : k); }
function applyLang(l){
  curLang = (I18N[l] ? l : 'ru');
  var d = I18N[curLang];
  var nodes = document.querySelectorAll('[data-i18n]');
  for (var i=0;i<nodes.length;i++){ var k=nodes[i].getAttribute('data-i18n'); if (d[k]!=null) nodes[i].textContent=d[k]; }
  document.documentElement.lang = curLang; document.title = d.title;
  var bs = document.querySelectorAll('.lang');
  for (var j=0;j<bs.length;j++) bs[j].classList.toggle('on', bs[j].getAttribute('data-lang')===curLang);
  updateColname(); updateShot(true);
  try { localStorage.setItem('dsw-lang', curLang); } catch(e){}
}
function updateColname(){
  var el=document.getElementById('panel-colname'); if(el) el.textContent=T('panel.c'+curColIdx);
}
(function(){
  var saved=null; try{ saved=localStorage.getItem('dsw-lang'); }catch(e){}
  applyLang(saved || 'ru');
  var bs=document.querySelectorAll('.lang');
  for (var i=0;i<bs.length;i++) bs[i].addEventListener('click', function(){ applyLang(this.getAttribute('data-lang')); });
})();

/* ═══════════ Гирлянда ═══════════ */
(function(){ var g=document.querySelector('.garland'); if(!g) return; for(var i=0;i<28;i++) g.appendChild(document.createElement('i')); })();

/* ═══════════ Часы на панели задач ═══════════ */
(function(){
  var t=document.getElementById('tb-time'), d=document.getElementById('tb-date'); if(!t) return;
  function tick(){
    var n=new Date(), p=function(x){return (x<10?'0':'')+x;};
    t.textContent=p(n.getHours())+':'+p(n.getMinutes());
    d.textContent=p(n.getDate())+'.'+p(n.getMonth()+1)+'.'+n.getFullYear();
  }
  tick(); setInterval(tick, 15000);
})();

/* ═══════════ Фоновый снег/конфетти: 3 слоя параллакса + ветер от курсора ═══════════ */
var SnowFX = (function(){
  var cv=document.getElementById('snow'); if(!cv||RM) return {setMode:function(){},setColor:function(){}};
  var ctx=cv.getContext('2d'), W=0,H=0, mode='snow', color='#FFFFFF';
  var snow=[], conf=[], windM=0, lastMX=null;
  var DPR=Math.min(window.devicePixelRatio||1,2);
  var LDEF=[ {r:[1,1.7], v:[12,26], a:.45}, {r:[1.9,2.7],v:[30,55], a:.7}, {r:[3,4.4], v:[60,95], a:.95} ];
  var CONF_COLORS=['#FBBF24','#F87171','#34D399','#38BDF8','#FBCFE8','#FDE68A'];
  function spawnSnow(l,top){
    var d=LDEF[l];
    return {l:l,x:Math.random()*W,y:top?-10:Math.random()*H,r:rnd(d.r[0],d.r[1]),v:rnd(d.v[0],d.v[1]),dr:rnd(-9,9),ph:Math.random()*6.283,o:d.a};
  }
  function spawnConf(top){
    return {x:Math.random()*W,y:top?-14:Math.random()*H,w:rnd(4,9),h:rnd(2.4,4.6),
      rot:Math.random()*6.283,vr:rnd(-3.4,3.4),v:rnd(26,64),dr:rnd(-16,16),ph:Math.random()*6.283,
      c:CONF_COLORS[(Math.random()*CONF_COLORS.length)|0],o:rnd(.65,1)};
  }
  function resize(){
    W=cv.clientWidth;H=cv.clientHeight;
    cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
    var total=Math.round(Math.min(230,Math.max(80,W*H/13000)));
    if(mode==='snow'){
      snow=[]; var counts=[total*.5,total*.32,total*.18];
      for(var l=0;l<3;l++){snow[l]=[];for(var i=0;i<counts[l];i++)snow[l][i]=spawnSnow(l,false);}
    } else {
      conf=[]; var n2=Math.round(Math.min(150,Math.max(60,W*H/16000)));
      for(var k=0;k<n2;k++)conf[k]=spawnConf(false);
    }
  }
  function setMode(m){
    if(mode===m) return; mode=m;
    var a=document.getElementById('mode-snow'), b=document.getElementById('mode-confetti');
    if(a) a.classList.toggle('on', m==='snow');
    if(b) b.classList.toggle('on', m==='confetti');
    resize();
  }
  function setColor(c,idx){
    color=c; curColIdx=idx; updateColname();
    var sw=document.querySelectorAll('.sw');
    for(var i=0;i<sw.length;i++) sw[i].classList.toggle('on', sw[i].getAttribute('data-col')===c);
  }
  window.addEventListener('resize',resize);
  window.addEventListener('mousemove',function(e){
    if(lastMX!=null){ windM=Math.max(-42,Math.min(42,windM+(e.clientX-lastMX)*0.55)); }
    lastMX=e.clientX;
  });
  resize();
  visibleLoop(cv,function(dt,ts){
    ctx.clearRect(0,0,W,H);
    var wind=Math.sin(ts*0.00025)*9+ (windM*=0.93);
    if(mode==='snow'){
      ctx.fillStyle=color;
      for(var l=0;l<3;l++){
        var par=[.55,.8,1.15][l], arr=snow[l]; if(!arr) continue;
        for(var i=0;i<arr.length;i++){
          var f=arr[i]; f.ph+=dt*(1+l*.4);
          f.y+=f.v*dt; f.x+=(wind*par+f.dr+Math.sin(f.ph)*7)*dt;
          if(f.y>H+8){arr[i]=spawnSnow(l,true);continue;}
          if(f.x<-10)f.x=W+10; else if(f.x>W+10)f.x=-10;
          ctx.globalAlpha=f.o;
          ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,6.2832);ctx.fill();
        }
      }
    } else {
      for(var j=0;j<conf.length;j++){
        var p=conf[j]; p.ph+=dt; p.rot+=p.vr*dt;
        p.y+=p.v*dt; p.x+=(wind*.8+p.dr+Math.sin(p.ph)*16)*dt;
        if(p.y>H+14){conf[j]=spawnConf(true);continue;}
        if(p.x<-14)p.x=W+14; else if(p.x>W+14)p.x=-14;
        ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);
        ctx.globalAlpha=p.o;ctx.fillStyle=p.c;
        ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);
        ctx.restore();
      }
    }
    ctx.globalAlpha=1;
  });
  return {setMode:setMode,setColor:setColor};
})();
(function(){
  var a=document.getElementById('mode-snow'), b=document.getElementById('mode-confetti');
  if(a) a.addEventListener('click',function(){SnowFX.setMode('snow');});
  if(b) b.addEventListener('click',function(){SnowFX.setMode('confetti');});
  var sw=document.querySelectorAll('.sw');
  var cols=[]; for(var i=0;i<sw.length;i++){cols.push(sw[i].getAttribute('data-col'));
    (function(idx){ sw[idx].addEventListener('click',function(){SnowFX.setColor(cols[idx],idx+1);}); })(i);
  }
})();

/* ═══════════ ДЕМО: рабочий стол Win11 — сугроб на шапке окна и на панели задач ═══════════ */
(function(){
  var stage=document.getElementById('stage'), win=document.getElementById('demo-win'),
      bar=document.getElementById('demo-titlebar'), cvs=document.getElementById('demo-canvas'),
      shakeBtn=document.getElementById('shake-btn'), gameBtn=document.getElementById('game-btn');
  if(!stage||!win||!bar||!cvs) return;
  var COL=4, TB_H=50;
  var SW=0,SH=0, WW=328, WH=0;
  var wx=26, wy=112, prevWx=26, winVx=0;
  var pile=[], tbPile=[], flakes=[], flying=[];
  var dragging=false, lastPX=0, lastPY=0, flips=0, lastDXSign=0, lastFlipT=0;
  var shakeT=-1, shakeBase=0, game=false, acc=0;

  function resize(){
    SW=stage.clientWidth; SH=stage.clientHeight;
    var r=win.getBoundingClientRect(); WW=r.width; WH=r.height;
    wx=clamp(wx,6,Math.max(6,SW-WW-6)); wy=clamp(wy,10,Math.max(10,SH-WH-TB_H-8));
    pile=new Array(Math.max(1,Math.ceil(WW/COL)));
    tbPile=new Array(Math.max(1,Math.ceil(SW/COL)));
    for(var i=0;i<pile.length;i++) pile[i]=rnd(0,2.6);
    for(var j=0;j<tbPile.length;j++) tbPile[j]=rnd(0,2.2);
    flakes=[]; flying=[];
  }
  function pileTotal(a){var s=0;for(var i=0;i<a.length;i++)s+=a[i];return s;}
  function spawnFlake(){
    var toWin=Math.random()<0.62;
    flakes.push({
      x: toWin ? wx+rnd(0,WW) : rnd(0,SW),
      y: rnd(-90,-8), v:rnd(55,130), r:rnd(1.3,2.5), dr:rnd(-14,14), ph:Math.random()*6.283, t:toWin?'w':'b'
    });
  }
  function scatter(dirVx){
    for(var c=0;c<pile.length;c++){
      var h=pile[c]; if(h<=0) continue;
      var n=Math.max(1,Math.round(h/2.2));
      for(var i=0;i<n;i++) flying.push({x:wx+c*COL+rnd(0,COL), y:wy-h*.5+rnd(-3,3),
        vx:dirVx*0.55+rnd(-160,160), vy:-rnd(60,380), r:rnd(1.2,3), life:rnd(.7,1.5)});
      pile[c]=0;
    }
  }
  function doShake(){ if(shakeT<0){ shakeT=0; shakeBase=wx; } }
  function setGame(on){
    game=on; stage.classList.toggle('paused',on);
    if(gameBtn){ gameBtn.classList.toggle('on',on); gameBtn.setAttribute('aria-pressed',on?'true':'false'); }
    if(on){ for(var i=0;i<pile.length;i++)pile[i]=0; for(var j=0;j<tbPile.length;j++)tbPile[j]=0;
      flakes=[]; flying=[]; acc=0; }
  }

  bar.addEventListener('pointerdown',function(e){
    dragging=true; lastPX=e.clientX; lastPY=e.clientY;
    flips=0; lastDXSign=0; lastFlipT=0;
    try{ bar.setPointerCapture(e.pointerId); }catch(_){}
    e.preventDefault();
  });
  bar.addEventListener('pointermove',function(e){
    if(!dragging) return;
    var now=performance.now(), dx=e.clientX-lastPX, dy=e.clientY-lastPY;
    wx+=dx; wy+=dy;
    var sgn=dx>0?1:(dx<0?-1:0);
    if(sgn!==0){
      if(lastDXSign!==0 && sgn!==lastDXSign){
        if(now-lastFlipT<220) flips++; else flips=1;
        lastFlipT=now;
      }
      if(lastDXSign===0) lastFlipT=now;
      lastDXSign=sgn;
    }
    if(flips>=3){ scatter(winVx||0); flips=0; }
    lastPX=e.clientX; lastPY=e.clientY;
    e.preventDefault();
  });
  bar.addEventListener('pointerup',function(){dragging=false;});
  bar.addEventListener('pointercancel',function(){dragging=false;});

  /* смахивание снега курсором: и у шапки окна, и на панели задач */
  stage.addEventListener('pointermove',function(e){
    if(dragging||game) return;
    var r=stage.getBoundingClientRect();
    var px=e.clientX-r.left, py=e.clientY-r.top;
    function wipe(p, arr, lo, hi){
      var c0=Math.floor((p-14)/COL), c1=Math.ceil((p+14)/COL), touched=false;
      for(var c=Math.max(0,c0);c<Math.min(arr.length,c1);c++){
        if(arr[c]>1){ arr[c]=Math.max(0,arr[c]-3.4); touched=true; }
      }
      if(touched) for(var i=0;i<3;i++)
        flying.push({x:clamp(p,lo,hi),y:lo<1?wy-rnd(2,16):SH-TB_H-rnd(2,16),vx:rnd(-70,70),vy:-rnd(30,140),r:rnd(1,2.2),life:rnd(.4,.9)});
    }
    if(py>wy-42 && py<wy+10) wipe(px-wx,pile,0,WW);
    else if(py>SH-TB_H-36 && py<SH-TB_H+8) wipe(px,tbPile,0,SW);
  });
  if(shakeBtn) shakeBtn.addEventListener('click',doShake);
  if(gameBtn) gameBtn.addEventListener('click',function(){ setGame(!game); });

  var last=0;
  visibleLoop(cvs,function(dt,ts){
    var m=fit(cvs); if(m.W<10) return;
    /* тряска */
    if(shakeT>=0){
      shakeT+=dt; var k=1-shakeT/0.7;
      if(k<=0){ shakeT=-1; wx=shakeBase; }
      else wx=shakeBase+Math.sin(shakeT*44)*15*k;
    }
    winVx=(wx-prevWx)/dt; prevWx=wx;
    if(!game && Math.abs(winVx)>950) scatter(winVx);

    /* выпадение и накопление */
    if(!game){
      acc+=dt*26;
      while(acc>1){ acc-=1;
        if(pileTotal(pile)<pile.length*5.2+110 || pileTotal(tbPile)<tbPile.length*4.6+90) spawnFlake();
      }
    }
    for(var i=flakes.length-1;i>=0;i--){
      var f=flakes[i]; f.ph+=dt; f.y+=f.v*dt; f.x+=f.dr*dt+Math.sin(f.ph)*8*dt;
      if(f.t==='w'){
        var rel=f.x-wx;
        if(rel>=0 && rel<WW){
          var c=Math.floor(rel/COL);
          if(f.y>=wy-pile[c]){ pile[c]=Math.min(26,pile[c]+f.r*0.9); flakes.splice(i,1); continue; }
        }
      } else {
        var c2=clamp(Math.floor(f.x/COL),0,tbPile.length-1);
        var landY=SH-TB_H-tbPile[c2];
        if(f.y>=landY){ tbPile[c2]=Math.min(16,tbPile[c2]+f.r*0.85); flakes.splice(i,1); continue; }
      }
      if(f.y>SH+10) flakes.splice(i,1);
      else if(f.x<-8)f.x=SW+8; else if(f.x>SW+8)f.x=-8;
    }
    for(var q=flying.length-1;q>=0;q--){
      var p=flying[q]; p.life-=dt; p.vy+=1400*dt; p.x+=p.vx*dt; p.y+=p.vy*dt;
      if(p.life<=0||p.y>SH+24) flying.splice(q,1);
    }
    wx=clamp(wx,6,Math.max(6,SW-WW-6));
    wy=clamp(wy,10,Math.max(10,SH-WH-TB_H-8));

    /* рендер */
    var ctx=m.ctx;
    ctx.clearRect(0,0,m.W,m.H);
    win.style.transform='translate('+wx+'px,'+wy+'px)';
    function drawPile(arr,x0,y0,maxH,ts){
      var n=arr.length; if(!n) return;
      if(!arr.jit){ arr.jit=[]; for(var jj=0;jj<n;jj++) arr.jit[jj]=0.7+Math.random()*0.75; }
      function hgt(c){ return Math.max(0.3, arr[c]*arr.jit[c] + Math.sin(c*0.9+ts*0.0011)*0.9); }
      function path(){
        ctx.beginPath(); ctx.moveTo(x0-2,y0+1);
        for(var c=0;c<n;c++){
          var cx=x0+c*COL+COL/2, y=y0-hgt(c);
          if(c===0) ctx.lineTo(x0,y);
          ctx.quadraticCurveTo(cx-COL/2,y,cx+COL/2,y);
        }
        ctx.lineTo(x0+n*COL,y0+1);
      }
      /* двойная контактная тень на поверхности */
      ctx.save();
      ctx.translate(0,4); path(); ctx.closePath(); ctx.fillStyle='rgba(90,124,176,.30)'; ctx.fill();
      ctx.translate(0,4.5); path(); ctx.closePath(); ctx.fillStyle='rgba(90,124,176,.15)'; ctx.fill();
      ctx.restore();
      /* тело сугроба: свет сверху → ледяная полутень у основания */
      var g=ctx.createLinearGradient(0,y0-maxH-2,0,y0+1);
      g.addColorStop(0,'#FFFFFF'); g.addColorStop(.6,'#EAF2FE'); g.addColorStop(1,'#9FB9DE');
      path(); ctx.closePath(); ctx.fillStyle=g; ctx.fill();
      /* блики на вершинах бугров */
      for(var s=1;s<n-1;s++){
        if(hgt(s)>hgt(s-1)&&hgt(s)>=hgt(s+1)&&hgt(s)>4){
          var sx=x0+s*COL+COL/2, sy=y0-hgt(s);
          var rg=ctx.createRadialGradient(sx,sy,0,sx,sy,7);
          rg.addColorStop(0,'rgba(255,255,255,.85)'); rg.addColorStop(1,'rgba(255,255,255,0)');
          ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(sx,sy,7,0,6.2832); ctx.fill();
        }
      }
    }
    if(!game){
      drawPile(pile,wx,wy,26,ts);
      drawPile(tbPile,0,SH-TB_H,16,ts);
    }
    ctx.fillStyle='#F8FAFC';
    for(var i2=0;i2<flakes.length;i2++){
      var f2=flakes[i2];
      ctx.globalAlpha=.9; ctx.beginPath(); ctx.arc(f2.x,f2.y,f2.r,0,6.2832); ctx.fill();
    }
    for(var j2=0;j2<flying.length;j2++){
      var p2=flying[j2];
      ctx.globalAlpha=clamp(p2.life,0,1);
      ctx.beginPath(); ctx.arc(p2.x,p2.y,p2.r,0,6.2832); ctx.fill();
    }
    ctx.globalAlpha=1;
  });
  window.addEventListener('resize',resize);
  resize();
})();

/* ═══════════ КАРТОЧКА 1: DWM-привязка + пауза под Lightshot-рамкой ═══════════ */
(function(){
  var cv=document.getElementById('c-dwm'); if(!cv||RM) return;
  var COL=5, dpile=[], flakes=[], kicked=[], acc=0;
  function step(dt,ts){
    var m=fit(cv), ctx=m.ctx, W=m.W, H=m.H;
    var wx0=W*0.06, ww=W*0.88, wy0=H*0.30, barH=24;
    var n=Math.ceil(ww/COL);
    if(dpile.length!==n){ dpile=new Array(n).fill(0); flakes=[]; }
    /* снег */
    acc+=dt*30;
    while(acc>1){ acc-=1; if(Math.random()<0.8) flakes.push({x:rnd(wx0,wx0+ww),y:-6,v:rnd(50,110),r:rnd(1,2.2)}); }
    for(var i=flakes.length-1;i>=0;i--){
      var f=flakes[i]; f.y+=f.v*dt; f.x+=Math.sin(ts*0.001+i)*6*dt;
      var c=clamp(Math.floor((f.x-wx0)/COL),0,n-1);
      if(f.y>=wy0-dpile[c]){ dpile[c]=Math.min(15,dpile[c]+f.r*0.9); flakes.splice(i,1); }
    }
    /* рамка выделения (Lightshot) — снег под ней исчезает за 0 мс */
    var cyc=(ts*0.001)%7.5, mx=-130+((W+280)*(cyc/4.6));
    var marquee={x:mx,y:wy0-26,w:120,h:H*0.5};
    for(var c2=0;c2<n;c2++){
      var colX=wx0+c2*COL;
      if(colX+COL>marquee.x && colX<marquee.x+marquee.w){
        if(dpile[c2]>0.6 && Math.random()<0.3)
          kicked.push({x:colX+COL/2,y:wy0-dpile[c2]/2,vx:rnd(-40,40),vy:-rnd(30,110),r:rnd(1,2),life:rnd(.4,.8)});
        dpile[c2]=0;
      }
    }
    for(var k=kicked.length-1;k>=0;k--){
      var p=kicked[k]; p.life-=dt; p.vy+=900*dt; p.x+=p.vx*dt; p.y+=p.vy*dt;
      if(p.life<=0) kicked.splice(k,1);
    }
    /* рендер */
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle='rgba(16,27,48,.85)'; ctx.strokeStyle='rgba(255,255,255,.12)'; ctx.lineWidth=1;
    roundRect(ctx,wx0,wy0,ww,H*0.46,8); ctx.fill(); ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.06)';
    roundRect(ctx,wx0,wy0,ww,barH,0); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,.05)';
    for(var l2=0;l2<3;l2++) roundRect(ctx,wx0+16,wy0+barH+16+l2*17,ww*0.62-l2*30,6,3), ctx.fill();
    ctx.fillStyle='rgba(248,113,113,.8)';ctx.beginPath();ctx.arc(wx0+ww-14,wy0+barH/2,3.4,0,6.2832);ctx.fill();
    /* сугроб на шапке */
    if(dpile.length){
      var g=ctx.createLinearGradient(0,wy0-16,0,wy0+2);
      g.addColorStop(0,'#FFFFFF'); g.addColorStop(1,'rgba(222,234,252,.8)');
      ctx.fillStyle=g;
      ctx.beginPath(); ctx.moveTo(wx0-1,wy0+1);
      for(var c3=0;c3<n;c3++){
        var cx=wx0+c3*COL+COL/2, y=wy0-dpile[c3];
        if(c3===0) ctx.lineTo(wx0,y);
        ctx.quadraticCurveTo(cx-COL/2,y,cx+COL/2,y);
      }
      ctx.lineTo(wx0+ww,wy0+1); ctx.closePath(); ctx.fill();
    }
    ctx.fillStyle='#F8FAFC';
    for(var s=0;s<flakes.length;s++){ ctx.globalAlpha=.85;ctx.beginPath();ctx.arc(flakes[s].x,flakes[s].y,flakes[s].r,0,6.2832);ctx.fill(); }
    for(var s2=0;s2<kicked.length;s2++){ ctx.globalAlpha=clamp(kicked[s2].life*1.6,0,1);ctx.beginPath();ctx.arc(kicked[s2].x,kicked[s2].y,kicked[s2].r,0,6.2832);ctx.fill(); }
    /* рамка выделения */
    ctx.globalAlpha=1;
    ctx.strokeStyle='#38BDF8'; ctx.setLineDash([5,4]); ctx.lineWidth=1.2;
    ctx.strokeRect(marquee.x,marquee.y,marquee.w,marquee.h);
    ctx.setLineDash([]);
    ctx.fillStyle='rgba(56,189,248,.07)'; ctx.fillRect(marquee.x,marquee.y,marquee.w,marquee.h);
    ctx.fillStyle='#38BDF8';
    var hx=[marquee.x,marquee.x+marquee.w], hy=[marquee.y,marquee.y+marquee.h];
    for(var a=0;a<2;a++)for(var b=0;b<2;b++) ctx.fillRect(hx[a]-2.5,hy[b]-2.5,5,5);
  }
  visibleLoop(cv,step);
  function roundRect(c,x,y,w,h,r){
    r=Math.min(r,w/2,h/2);
    c.beginPath();
    c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);
    c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();
  }
})();

/* ═══════════ КАРТОЧКА 2: песочница — снежки и снеговики ═══════════ */
(function(){
  var cv=document.getElementById('c-sandbox'); if(!cv||RM) return;
  var resetBtn=document.getElementById('sandbox-reset');
  var balls=[], snowmen=[], dying=[], rolling=null, lastPX=0, flakes=[];
  function driftTop(x,H){
    return H-44 + 13*Math.sin(x*0.021+1.7) + 8*Math.sin(x*0.043+0.4);
  }
  cv.addEventListener('pointerdown',function(e){
    var m=fit(cv), r=cv.getBoundingClientRect();
    var px=(e.clientX-r.left)*(m.W/r.width), py=(e.clientY-r.top)*(m.H/r.height);
    if(py>m.H*0.42){
      rolling={x:px,r:13,acc:0}; lastPX=px;
      try{ cv.setPointerCapture(e.pointerId); }catch(_){}
      e.preventDefault();
    }
  });
  cv.addEventListener('pointermove',function(e){
    if(!rolling) return;
    var m=fit(cv), r=cv.getBoundingClientRect();
    var px=(e.clientX-r.left)*(m.W/r.width);
    var dx=px-lastPX; lastPX=px;
    rolling.acc+=Math.abs(dx);
    rolling.r=Math.min(46,13+rolling.acc*0.13);
    rolling.x=clamp(px,rolling.r,m.W-rolling.r);
    e.preventDefault();
  });
  function release(){
    if(!rolling) return;
    var m=fit(cv);
    balls.push({x:rolling.x,y:driftTop(rolling.x,m.H)-rolling.r*0.55,r:rolling.r});
    rolling=null;
    if(balls.length>=3){
      var big=balls[0]; for(var i=1;i<3;i++) if(balls[i].r>big.r) big=balls[i];
      var sx=big.x;
      snowmen.push({x:clamp(sx,40,m.W-40),t:0,s:0.5});
      balls=[]; puff(m.ctx===null?0:0);
    }
  }
  function puff(){ /* маленький выброс снега при сборке — рисуется в step */ }
  cv.addEventListener('pointerup',release);
  cv.addEventListener('pointercancel',release);
  if(resetBtn) resetBtn.addEventListener('click',function(){ balls=[]; snowmen=[]; dying=[]; rolling=null; });

  function drawSnowman(ctx,x,baseY,s,t){
    var r1=26*s,r2=19*s,r3=13*s;
    var y1=baseY-r1, y2=y1-r2*1.55, y3=y2-r3*1.5;
    function ball(y,r){
      var g=ctx.createRadialGradient(x-r*0.35,y-r*0.4,r*0.2,x,y,r);
      g.addColorStop(0,'#FFFFFF'); g.addColorStop(1,'#C8D8F0');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,6.2832); ctx.fill();
    }
    ball(y1,r1); ball(y2,r2); ball(y3,r3);
    /* руки-веточки */
    ctx.strokeStyle='#8A6A48'; ctx.lineWidth=2*s; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(x-r2*0.8,y2); ctx.lineTo(x-r2*1.8,y2-r2*0.9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+r2*0.8,y2); ctx.lineTo(x+r2*1.8,y2-r2*0.9); ctx.stroke();
    /* шарф */
    ctx.fillStyle='#F87171';
    roundRect(ctx,x-r2*0.62,y2+r2*0.62,r2*1.24,r2*0.4,3*s); ctx.fill();
    /* лицо */
    ctx.fillStyle='#1E293B';
    ctx.beginPath(); ctx.arc(x-r3*0.34,y3-r3*0.15,r3*0.11,0,6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(x+r3*0.34,y3-r3*0.15,r3*0.11,0,6.2832); ctx.fill();
    ctx.fillStyle='#F59E0B';
    ctx.beginPath(); ctx.moveTo(x,y3); ctx.lineTo(x+r3*0.9,y3+r3*0.22); ctx.lineTo(x,y3+r3*0.16); ctx.closePath(); ctx.fill();
    /* пуговицы */
    ctx.fillStyle='#1E293B';
    ctx.beginPath(); ctx.arc(x,y1-r1*0.15,r1*0.07,0,6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(x,y1+r1*0.25,r1*0.07,0,6.2832); ctx.fill();
    /* ведро-шапка */
    ctx.fillStyle='#3B82F6';
    roundRect(ctx,x-r3*0.8,y3-r3*1.75,r3*1.6,r3*0.72,2*s); ctx.fill();
    roundRect(ctx,x-r3*0.95,y3-r3*1.12,r3*1.9,r3*0.26,2*s); ctx.fill();
  }
  function roundRect(c,x,y,w,h,r){
    r=Math.min(r,w/2,h/2);
    c.beginPath();
    c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);
    c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();
  }
  var puffParts=[];
  visibleLoop(cv,function(dt,ts){
    var m=fit(cv), ctx=m.ctx, W=m.W, H=m.H;
    /* лёгкий снегопад внутри */
    if(flakes.length<26 && Math.random()<0.12) flakes.push({x:rnd(0,W),y:-4,v:rnd(18,42),r:rnd(0.8,1.9),ph:Math.random()*6.283});
    for(var i=flakes.length-1;i>=0;i--){
      var f=flakes[i]; f.ph+=dt; f.y+=f.v*dt; f.x+=Math.sin(f.ph)*9*dt;
      if(f.y>H) flakes.splice(i,1);
    }
    /* сборка снеговика: анимация появления */
    for(var s2=0;s2<snowmen.length;s2++){
      var sn=snowmen[s2];
      if(sn.s<1){ sn.t+=dt; sn.s=Math.min(1,0.5+sn.t*1.4); }
    }
    for(var d2=dying.length-1;d2>=0;d2--){
      dying[d2].a-=dt*1.4;
      if(dying[d2].a<=0) dying.splice(d2,1);
    }
    /* рендер */
    ctx.clearRect(0,0,W,H);
    /* сугроб */
    var g=ctx.createLinearGradient(0,H-64,0,H);
    g.addColorStop(0,'#F4F8FF'); g.addColorStop(1,'#B9CDE8');
    ctx.fillStyle=g;
    ctx.beginPath(); ctx.moveTo(0,H);
    for(var x=0;x<=W;x+=8) ctx.lineTo(x,driftTop(x,H));
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#F8FAFC';
    for(var f2=0;f2<flakes.length;f2++){ ctx.globalAlpha=.8;ctx.beginPath();ctx.arc(flakes[f2].x,flakes[f2].y,flakes[f2].r,0,6.2832);ctx.fill(); }
    ctx.globalAlpha=1;
    /* скатываемый ком */
    if(rolling){
      var ry=driftTop(rolling.x,H)-rolling.r*0.55;
      var rg=ctx.createRadialGradient(rolling.x-rolling.r*0.3,ry-rolling.r*0.3,rolling.r*0.2,rolling.x,ry,rolling.r);
      rg.addColorStop(0,'#FFFFFF'); rg.addColorStop(1,'#C8D8F0');
      ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(rolling.x,ry,rolling.r,0,6.2832); ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.8)'; ctx.lineWidth=1; ctx.stroke();
    }
    /* лежащие комы */
    for(var b=0;b<balls.length;b++){
      var ball=balls[b];
      var bg=ctx.createRadialGradient(ball.x-ball.r*0.3,ball.y-ball.r*0.3,ball.r*0.2,ball.x,ball.y,ball.r);
      bg.addColorStop(0,'#FFFFFF'); bg.addColorStop(1,'#C8D8F0');
      ctx.fillStyle=bg; ctx.beginPath(); ctx.arc(ball.x,ball.y,ball.r,0,6.2832); ctx.fill();
    }
    /* снеговики */
    for(var s3=0;s3<snowmen.length;s3++){
      var sn2=snowmen[s3];
      var sc=sn2.s<1 ? (0.5+0.5*easeOutBack(sn2.s)) : 1;
      drawSnowman(ctx,sn2.x,driftTop(sn2.x,H)-6,sc*1.02,sn2.t);
    }
    for(var d3=0;d3<dying.length;d3++){
      ctx.globalAlpha=dying[d3].a;
      drawSnowman(ctx,dying[d3].x,dying[d3].y,1,0);
      ctx.globalAlpha=1;
    }
  });
  function easeOutBack(t){ var c=1.7; t-=1; return 1 + (t*t*((c+1)*t+c)); }
  /* перенос старейшего снеговика в «умирающие» при превышении лимита */
  var origPush=snowmen.push.bind(snowmen);
  snowmen.push=function(sm){
    if(snowmen.length>=2){
      var old=snowmen.shift();
      var m=fit(cv);
      dying.push({x:old.x,y:driftTop(old.x,m.H)-6,a:1});
    }
    origPush(sm);
  };
})();

/* ═══════════ КАРТОЧКА 3: живой мир — поезд, снеговики, ёлка с темами ═══════════ */
(function(){
  var cv=document.getElementById('c-world'); if(!cv||RM) return;
  var THEMES={
    classic:['#FBBF24','#F87171','#34D399','#FFFFFF'],
    frost:['#BAE6FD','#7DD3FC','#E0F2FE','#FFFFFF'],
    candy:['#F472B6','#FBCFE8','#F87171','#6EE7B7'],
    gold:['#FDE68A','#FBBF24','#F59E0B','#FEF3C7']
  };
  var theme=THEMES.classic;
  var thBtns=document.querySelectorAll('.chip.th');
  for(var i=0;i<thBtns.length;i++){
    (function(b){ b.addEventListener('click',function(){
      theme=THEMES[b.getAttribute('data-theme')]||THEMES.classic;
      for(var j=0;j<thBtns.length;j++) thBtns[j].classList.toggle('on',thBtns[j]===b);
    }); })(thBtns[i]);
  }
  var snowmen=[], pieces=[], puffs=[], trainX=-999, trainGo=false, waitT=1.4, bob=0;
  function init(W){
    snowmen=[ {x:W*0.24,s:0,parts:null},{x:W*0.48,s:0,parts:null} ];
  }
  function drawSnowman(ctx,x,gy,s){
    var r1=17*s,r2=12.5*s,r3=8.5*s;
    var y1=gy-r1,y2=y1-r2*1.5,y3=y2-r3*1.45;
    function ball(y,r,fill){
      var g=ctx.createRadialGradient(x-r*0.35,y-r*0.4,r*0.2,x,y,r);
      g.addColorStop(0,fill||'#FFFFFF'); g.addColorStop(1,'#BCCFEA');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,6.2832); ctx.fill();
    }
    ball(y1,r1); ball(y2,r2); ball(y3,r3);
    ctx.fillStyle='#1E293B';
    ctx.beginPath(); ctx.arc(x-r3*0.32,y3-r3*0.14,r3*0.12,0,6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(x+r3*0.32,y3-r3*0.14,r3*0.12,0,6.2832); ctx.fill();
    ctx.fillStyle='#F59E0B';
    ctx.beginPath(); ctx.moveTo(x,y3+r3*0.1); ctx.lineTo(x+r3*0.95,y3+r3*0.35); ctx.lineTo(x,y3+r3*0.34); ctx.closePath(); ctx.fill();
    ctx.strokeStyle='#8A6A48'; ctx.lineWidth=1.6*s; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(x-r2*0.85,y2); ctx.lineTo(x-r2*1.75,y2-r2*0.85); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+r2*0.85,y2); ctx.lineTo(x+r2*1.75,y2-r2*0.85); ctx.stroke();
    ctx.fillStyle='#F87171';
    roundRect(ctx,x-r2*0.6,y2+r2*0.6,r2*1.2,r2*0.36,2); ctx.fill();
  }
  function roundRect(c,x,y,w,h,r){
    r=Math.min(r,w/2,h/2);
    c.beginPath();
    c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);
    c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();
  }
  function drawTrain(ctx,gy,x,dir){
    /* паровозик + вагон с подарками; dir=-1 → едет влево */
    var s=1, L=64*2; /* длина состава */
    var bx=x, by=gy-9;
    ctx.save();
    if(dir<0){ /* рисуем в естественных координатах, состав уже ориентирован влево */ }
    /* вагон */
    var wagX=bx+78*dir*-1*-1; /* вагон позади паровоза */
    wagX=bx+78;
    ctx.fillStyle='#232F4D'; ctx.strokeStyle='rgba(251,191,36,.5)'; ctx.lineWidth=1.2;
    roundRect(ctx,wagX,by-26,58,24,5); ctx.fill(); ctx.stroke();
    for(var gI=0;gI<3;gI++){
      var gc=['#EF4444','#34D399','#FBBF24'][gI];
      ctx.fillStyle=gc;
      roundRect(ctx,wagX+7+gI*17,by-36,12,11,2); ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.55)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(wagX+13+gI*17,by-36); ctx.lineTo(wagX+13+gI*17,by-25);
      ctx.moveTo(wagX+7+gI*17,by-30.5); ctx.lineTo(wagX+19+gI*17,by-30.5); ctx.stroke();
    }
    ctx.fillStyle='#141B30';
    ctx.beginPath(); ctx.arc(wagX+12,by+2,6,0,6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(wagX+44,by+2,6,0,6.2832); ctx.fill();
    /* паровоз */
    ctx.fillStyle='#B91C1C';
    roundRect(ctx,bx,by-30,52,26,6); ctx.fill();
    ctx.fillStyle='#7F1D1D';
    roundRect(ctx,bx+30,by-44,22,18,4); ctx.fill();
    ctx.fillStyle='#FBBF24';
    roundRect(ctx,bx+4,by-24,10,10,2); ctx.fill();
    ctx.beginPath(); ctx.arc(bx+26,by-40,5,0,6.2832); ctx.fill();
    ctx.fillStyle='#141B30';
    ctx.beginPath(); ctx.arc(bx+12,by+2,7,0,6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(bx+34,by+2,7,0,6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(bx+48,by+2,5,0,6.2832); ctx.fill();
    ctx.fillStyle='#38BDF8';
    roundRect(ctx,bx+33,by-40,16,9,2); ctx.fill();
    ctx.restore();
  }
  visibleLoop(cv,function(dt,ts){
    var m=fit(cv), ctx=m.ctx, W=m.W, H=m.H;
    var gy=H-34;
    if(snowmen.length!==2 || snowmen[0].refW!==W){ init(W); snowmen[0].refW=W; snowmen[1].refW=W; }
    bob=ts*0.001;
    /* поезд по расписанию */
    if(!trainGo){
      waitT-=dt;
      if(waitT<=0){ trainGo=true; trainX=W+150; }
    } else {
      trainX-=dt*(W+300)/3.6;
      if(Math.random()<0.25) puffs.push({x:trainX+36,y:gy-46,r:rnd(2,4.4),vy:-rnd(18,34),life:rnd(.7,1.3)});
      /* столкновения со снеговиками */
      for(var i=0;i<snowmen.length;i++){
        var sn=snowmen[i];
        if(sn.s===0 && Math.abs(trainX+6-sn.x)<12){
          sn.s=1; sn.t=0;
          for(var k=0;k<9;k++) pieces.push({x:sn.x+rnd(-8,8),y:gy-rnd(8,34),vx:rnd(-120,120),vy:-rnd(60,260),r:rnd(2,5),life:rnd(.6,1.2)});
        }
      }
      if(trainX<-180){ trainGo=false; waitT=rnd(2.6,4.2); }
    }
    /* снеговики: осыпание/восстановление */
    for(var j=0;j<snowmen.length;j++){
      var s2=snowmen[j];
      if(s2.s===1){ s2.t+=dt; if(s2.t>1.9){ s2.s=0; s2.t=0; } }
      else s2.t+=dt;
    }
    for(var p=pieces.length-1;p>=0;p--){
      var pc=pieces[p]; pc.life-=dt; pc.vy+=1200*dt; pc.x+=pc.vx*dt; pc.y+=pc.vy*dt;
      if(pc.life<=0) pieces.splice(p,1);
    }
    for(var pf=puffs.length-1;pf>=0;pf--){
      var pu=puffs[pf]; pu.life-=dt; pu.y+=pu.vy*dt; pu.x-=20*dt; pu.r+=6*dt;
      if(pu.life<=0) puffs.splice(pf,1);
    }
    /* рендер */
    ctx.clearRect(0,0,W,H);
    var sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#0B1526'); sky.addColorStop(1,'#0E1D38');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    /* дальний лес */
    ctx.fillStyle='#0A1224';
    for(var tI=0;tI<6;tI++){
      var tx=20+tI*(W/6)+Math.sin(tI*7)*12;
      ctx.beginPath(); ctx.moveTo(tx-11,gy+8); ctx.lineTo(tx,gy-26-(tI%3)*8); ctx.lineTo(tx+11,gy+8); ctx.closePath(); ctx.fill();
    }
    /* ёлка справа — детализированная, с гирляндой темы */
    drawTree(ctx,W*0.84,gy,theme,bob);
    /* поезд за сугробом */
    if(trainGo) drawTrain(ctx,gy,trainX,-1);
    /* снеговики */
    for(var s3=0;s3<snowmen.length;s3++){
      var sn2=snowmen[s3];
      if(sn2.s===0){
        var sc=Math.min(1,sn2.t*1.3);
        if(sc>0) drawSnowman(ctx,sn2.x,gy,0.6+0.4*easeOutBack(sc));
      }
    }
    /* разлетевшиеся куски */
    ctx.fillStyle='#F8FAFC';
    for(var pc2=0;pc2<pieces.length;pc2++){
      ctx.globalAlpha=clamp(pieces[pc2].life,0,1);
      ctx.beginPath(); ctx.arc(pieces[pc2].x,pieces[pc2].y,pieces[pc2].r,0,6.2832); ctx.fill();
    }
    ctx.globalAlpha=1;
    /* дым */
    for(var pu2=0;pu2<puffs.length;pu2++){
      ctx.globalAlpha=clamp(puffs[pu2].life*0.6,0,1)*0.7;
      ctx.fillStyle='#C9D6EE';
      ctx.beginPath(); ctx.arc(puffs[pu2].x,puffs[pu2].y,puffs[pu2].r,0,6.2832); ctx.fill();
    }
    ctx.globalAlpha=1;
    /* сугроб-земля */
    var gg=ctx.createLinearGradient(0,gy-10,0,H);
    gg.addColorStop(0,'#F1F6FF'); gg.addColorStop(1,'#AEC3E0');
    ctx.fillStyle=gg;
    ctx.beginPath(); ctx.moveTo(0,H);
    for(var gx=0;gx<=W;gx+=10) ctx.lineTo(gx,gy+4+6*Math.sin(gx*0.05+2)+3*Math.sin(gx*0.11));
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
  });
  function drawTree(ctx,x,gy,theme,ts){
    var tiers=[[46,30],[38,58],[30,86],[22,112]]; /* [полуширина, отступ вверх] */
    var baseY=gy+6;
    ctx.fillStyle='#5B4226';
    roundRect(ctx,x-5,baseY-10,10,12,2); ctx.fill();
    for(var i=0;i<tiers.length;i++){
      var wHalf=tiers[i][0], lift=tiers[i][1];
      var yTop=baseY-lift-30, yBot=baseY-lift;
      ctx.fillStyle=i%2?'#1D5C43':'#17503C';
      ctx.beginPath();
      ctx.moveTo(x,yTop);
      var steps=5;
      for(var s=0;s<=steps;s++){
        var t2=s/steps, y=yTop+(yBot-yTop)*t2, w=wHalf*(0.35+0.65*t2);
        ctx.lineTo(x+w*(s%2?1:0.62)- (s%2?w*0.24:0), y);
      }
      for(var s2b=steps;s2b>=0;s2b--){
        var t3=s2b/steps, y3=yTop+(yBot-yTop)*t3, w3=wHalf*(0.35+0.65*t3);
        ctx.lineTo(x-w3*(s2b%2?0.76:0.62)+(s2b%2?w3*0.24:0), y3+ (s2b%2?4:0));
      }
      ctx.closePath(); ctx.fill();
    }
    /* гирлянда */
    for(var l=0;l<3;l++){
      var ly=baseY-38-l*26, spread=34+l*10;
      for(var d=0;d<=6;d++){
        var lx=x-spread+ (spread*2)*(d/6);
        var ly2=ly+Math.sin(d*1.9)*4;
        var c=theme[(l*3+d)%theme.length];
        var tw=0.55+0.45*Math.sin(ts*2.4+l*2+d);
        ctx.globalAlpha=tw;
        ctx.fillStyle=c;
        ctx.beginPath(); ctx.arc(lx,ly2,2.1,0,6.2832); ctx.fill();
        ctx.globalAlpha=tw*0.25;
        ctx.beginPath(); ctx.arc(lx,ly2,4.6,0,6.2832); ctx.fill();
      }
    }
    ctx.globalAlpha=1;
    /* шары */
    for(var b=0;b<4;b++){
      var bx2=x-20+b*13, by2=baseY-30-(b%2)*22;
      ctx.fillStyle=theme[(b+1)%theme.length];
      ctx.beginPath(); ctx.arc(bx2,by2,3.4,0,6.2832); ctx.fill();
      ctx.fillStyle='rgba(255,255,255,.5)';
      ctx.beginPath(); ctx.arc(bx2-1,by2-1.2,1.1,0,6.2832); ctx.fill();
    }
    /* звезда */
    var sy=baseY-150;
    ctx.fillStyle='#FBBF24';
    ctx.save(); ctx.translate(x,sy); 
    ctx.beginPath();
    for(var sp=0;sp<10;sp++){
      var rr=sp%2?4:9, an=-Math.PI/2+sp*Math.PI/5;
      ctx.lineTo(Math.cos(an)*rr,Math.sin(an)*rr);
    }
    ctx.closePath(); ctx.fill();
    ctx.globalAlpha=.35; ctx.beginPath(); ctx.arc(0,0,14+Math.sin(ts*2)*2,0,6.2832); ctx.fill();
    ctx.restore(); ctx.globalAlpha=1;
  }
  function easeOutBack(t){ var c=1.7; t-=1; return 1 + (t*t*((c+1)*t+c)); }
})();

/* ═══════════ КАРТОЧКА 4: вкладки реальных скриншотов ═══════════ */
function updateShot(silent){
  var img=document.getElementById('shot-img'); if(!img) return;
  img.src='screenshots/settings-'+shotTab+'.png';
  img.alt=T(shotTab==='general'?'alt.g':shotTab==='snow'?'alt.s':'alt.d');
  var cap=document.getElementById('shot-cap');
  if(cap){
    var key='c4cap.'+shotTab.charAt(0);
    cap.setAttribute('data-i18n',key);
    cap.textContent=T(key);
  }
}
(function(){
  var btns=document.querySelectorAll('.shot-tabs .chip');
  for(var i=0;i<btns.length;i++){
    (function(b){ b.addEventListener('click',function(){
      shotTab=b.getAttribute('data-shot');
      for(var j=0;j<btns.length;j++) btns[j].classList.toggle('on',btns[j]===b);
      updateShot();
    }); })(btns[i]);
  }
})();

/* ═══════════ Reveal при скролле ═══════════ */
(function(){
  /* Фоновая вкладка: IO/rAF не тикают — показываем всё сразу, анимация только для видимой страницы */
  if(RM || !('IntersectionObserver' in window) || document.visibilityState==='hidden'){
    var all=document.querySelectorAll('.rv');
    for(var i=0;i<all.length;i++) all[i].classList.add('in');
    return;
  }
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12});
  document.querySelectorAll('.rv').forEach(function(el){io.observe(el);});
})();
})();
