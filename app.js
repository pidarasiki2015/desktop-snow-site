/* Desktop Snow × Raycast-эстетика. Снег с 4 цветами и ледяным сиянием,
   живое окно Win11 (drag/рывок/смахивание/режим игры), DWM-превью,
   песочница снеговиков + новогодний поезд. Без зависимостей. */
(function () {
'use strict';
var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var pageHidden = false;
document.addEventListener('visibilitychange', function () { pageHidden = document.hidden; });

function rnd(a, b) { return a + Math.random() * (b - a); }
function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
function fit(cv) {
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var w = cv.clientWidth || 300, h = cv.clientHeight || 150;
  var bw = Math.round(w * dpr), bh = Math.round(h * dpr);
  if (cv.width !== bw || cv.height !== bh) { cv.width = bw; cv.height = bh; }
  var ctx = cv.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx: ctx, W: w, H: h };
}
function visibleLoop(cv, step) {
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
    'nav.features':'Возможности','nav.settings':'Настройки','nav.dl':'Скачать',
    'hero.h':'Новый год уже здесь.<br>Прямо на твоём рабочем столе',
    'hero.lead':'Живой снег на каждом окне, лепка снеговиков мышкой, поезд с подарками и мгновенная пауза в играх. Нативно для Windows 10 и 11.',
    'hero.dl':'Скачать для Windows','hero.shake':'Потрясти окно',
    'hero.tech':'Бесплатно • C++ & Direct2D • < 1 МБ • Без установки',
    'pick.label':'Цвет снега',
    'col.c1':'Белый','col.c2':'Ледяной синий','col.c3':'Новогодний красный','col.c4':'Золотой',
    'demo.win':'Заметки.txt — Блокнот',
    'demo.l1':'Привет! Это обычное окно Windows.',
    'demo.l2':'Но на его шапке уже лежит снег…',
    'demo.l3':'Схвати меня за шапку и потащи. Дёрни резко — снег слетит!',
    'demo.game':'Режим игры','demo.paused':'Снег на паузе · 0 мс',
    'demo.hint':'Схвати окно за шапку — снег поедет вместе с ним. Дёрни резко — разлетится!',
    's1.h':'Снег, который чувствует каждое окно',
    's1.p':'Снег держится ровно за видимой рамкой каждого окна — без зазоров. Свернёшь окно — сугроб красиво осыпется вниз. Запустишь игру, YouTube на весь экран или выделение области скриншота в Lightshot, ShareX и «Ножницах» — снег исчезает за 0 мс.',
    's1.k1':'Снег вкл / выкл','s1.k2':'Украсить рабочий стол',
    's2.h':'Лепи снеговиков и запускай новогодний поезд',
    's2.p':'Зажми левую кнопку мыши на сугробе и прокати снежный ком — из трёх комов получится снеговик. Новогодний поезд проносится по столу и с физикой разбрасывает снеговиков — через пару секунд они собираются обратно.',
    's2.train':'Запустить поезд','s2.reset':'Сбросить','s2.hint':'Зажми и катай ком по сугробу',
    's3.h':'Нативный интерфейс в стиле Windows 11',
    's3.p':'Настоящее окно настроек в духе Mica: что падает, интенсивность, размер хлопьев, скорость и ветер, четыре цвета снега, украшения и мониторы.',
    'c4t1':'Общие','c4t2':'Снег','c4t3':'Украшения',
    'c4cap.g':'Общие — снегопад, автозапуск, паузы и горячие клавиши',
    'c4cap.s':'Снег — интенсивность 200%, размер, скорость, ветер и сугробы',
    'c4cap.d':'Украшения — темы, Дед Мороз, поезд и снежки',
    'cta.h':'Готов к Новому году?','cta.btn':'Скачать Desktop Snow','cta.link':'GitHub Releases →',
    'foot.repo':'GitHub','foot.rel':'Релизы',
    'alt.g':'Окно настроек Desktop Snow — вкладка «Общие»',
    'alt.s':'Окно настроек Desktop Snow — вкладка «Снег»',
    'alt.d':'Окно настроек Desktop Snow — вкладка «Украшения»',
    title:'Desktop Snow — Новый год уже здесь. Прямо на твоём рабочем столе'
  },
  ua: {
    'nav.features':'Можливості','nav.settings':'Налаштування','nav.dl':'Завантажити',
    'hero.h':'Новий рік вже тут.<br>Прямо на твоєму робочому столі',
    'hero.lead':'Живий сніг на кожному вікні, ліпка сніговиків мишкою, потяг із подарунками та миттєва пауза в іграх. Нативно для Windows 10 і 11.',
    'hero.dl':'Завантажити для Windows','hero.shake':'Потрусити вікно',
    'hero.tech':'Безкоштовно • C++ & Direct2D • < 1 МБ • Без встановлення',
    'pick.label':'Колір снігу',
    'col.c1':'Білий','col.c2':'Крижано-синій','col.c3':'Новорічний червоний','col.c4':'Золотий',
    'demo.win':'Нотатки.txt — Блокнот',
    'demo.l1':'Привіт! Це звичайне вікно Windows.',
    'demo.l2':'Але на його шапці вже лежить сніг…',
    'demo.l3':'Хапай мене за шапку й тягни. Різко смикнеш — сніг злетить!',
    'demo.game':'Ігровий режим','demo.paused':'Сніг на паузі · 0 мс',
    'demo.hint':'Хапай вікно за шапку — сніг поїде разом із ним. Різко смикнеш — розлетиться!',
    's1.h':'Сніг, який відчуває кожне вікно',
    's1.p':'Сніг тримається рівно за видимою рамкою кожного вікна — без зазорів. Згорнеш вікно — замет красиво осиплеться вниз. Запустиш гру, YouTube на весь екран чи виділення області скриншота в Lightshot, ShareX і «Ножицях» — сніг зникає за 0 мс.',
    's1.k1':'Сніг увімк / вимк','s1.k2':'Прикрасити робочий стіл',
    's2.h':'Ліпи сніговиків і запускай новорічний потяг',
    's2.p':'Затисни ліву кнопку миші на заметі й прокоти сніжку — з трьох грудок вийде сніговик. Новорічний потяг проноситься столом і з фізикою розкидає сніговиків — за пару секунд вони збираються назад.',
    's2.train':'Запустити потяг','s2.reset':'Скинути','s2.hint':'Затисни й коти грудку заметом',
    's3.h':'Нативний інтерфейс у стилі Windows 11',
    's3.p':'Справжнє вікно налаштувань у дусі Mica: що падає, інтенсивність, розмір пластівців, швидкість і вітер, чотири кольори снігу, прикраси та монітори.',
    'c4t1':'Загальні','c4t2':'Сніг','c4t3':'Прикраси',
    'c4cap.g':'Загальні — снігопад, автозапуск, паузи й гарячі клавіші',
    'c4cap.s':'Сніг — інтенсивність 200%, розмір, швидкість, вітер і замети',
    'c4cap.d':'Прикраси — теми, Дід Мороз, потяг і сніжки',
    'cta.h':'Готовий до Нового року?','cta.btn':'Завантажити Desktop Snow','cta.link':'GitHub Releases →',
    'foot.repo':'GitHub','foot.rel':'Релізи',
    'alt.g':'Вікно налаштувань Desktop Snow — вкладка «Загальні»',
    'alt.s':'Вікно налаштувань Desktop Snow — вкладка «Сніг»',
    'alt.d':'Вікно налаштувань Desktop Snow — вкладка «Прикраси»',
    title:'Desktop Snow — Новий рік уже тут. Прямо на твоєму робочому столі'
  },
  en: {
    'nav.features':'Features','nav.settings':'Settings','nav.dl':'Download',
    'hero.h':'The New Year is here.<br>Right on your desktop',
    'hero.lead':'Living snow on every window, snowman-rolling with your mouse, a gift train and instant pause in games. Native for Windows 10 and 11.',
    'hero.dl':'Download for Windows','hero.shake':'Shake the window',
    'hero.tech':'Free • C++ & Direct2D • < 1 MB • No install',
    'pick.label':'Snow color',
    'col.c1':'White','col.c2':'Ice blue','col.c3':'Christmas red','col.c4':'Gold',
    'demo.win':'Notes.txt — Notepad',
    'demo.l1':'Hi! This is an ordinary Windows window.',
    'demo.l2':'But snow is already piling up on its title bar…',
    'demo.l3':'Grab me by the title bar and drag. Yank hard — the snow flies off!',
    'demo.game':'Game mode','demo.paused':'Snow paused · 0 ms',
    'demo.hint':'Grab the window by its title bar — the snow travels with it. Yank hard — it scatters!',
    's1.h':'Snow that feels every window',
    's1.p':'Snow clings exactly to the visible frame of every window — no gaps. Minimize a window and the drift crumbles down. Launch a game, fullscreen YouTube or a screenshot selection in Lightshot, ShareX or Snipping Tool — snow vanishes in 0 ms.',
    's1.k1':'Snow on / off','s1.k2':'Decorate the desktop',
    's2.h':'Roll snowmen and launch the Christmas train',
    's2.p':'Hold the left mouse button on a drift and roll a snowball — three balls make a snowman. The Christmas train rushes across the screen and physically scatters snowmen — they pull themselves back together a couple of seconds later.',
    's2.train':'Launch the train','s2.reset':'Reset','s2.hint':'Hold and roll a ball on the drift',
    's3.h':'Native interface, Windows 11 style',
    's3.p':'A real settings window in the Mica spirit: what falls, intensity, flake size, speed and wind, four snow colors, decorations and monitors.',
    'c4t1':'General','c4t2':'Snow','c4t3':'Decorations',
    'c4cap.g':'General — snowfall, autostart, pauses and hotkeys',
    'c4cap.s':'Snow — 200% intensity, size, speed, wind and drifts',
    'c4cap.d':'Decorations — themes, Ded Moroz, the train and snowballs',
    'cta.h':'Ready for the New Year?','cta.btn':'Download Desktop Snow','cta.link':'GitHub Releases →',
    'foot.repo':'GitHub','foot.rel':'Releases',
    'alt.g':'Desktop Snow settings window — General tab',
    'alt.s':'Desktop Snow settings window — Snow tab',
    'alt.d':'Desktop Snow settings window — Decorations tab',
    title:'Desktop Snow — The New Year is here. Right on your desktop'
  }
};
var curLang='ru', curColIdx=1, shotTab='general';
function T(k){ var d=I18N[curLang]||I18N.ru; return d[k]!=null?d[k]:(I18N.ru[k]!=null?I18N.ru[k]:k); }
function updateColname(){ var el=document.getElementById('panel-colname'); if(el) el.textContent=T('col.c'+curColIdx); }
function updateShot(){
  var img=document.getElementById('shot-img'); if(!img) return;
  img.src='screenshots/settings-'+shotTab+'.png';
  img.alt=T(shotTab==='general'?'alt.g':shotTab==='snow'?'alt.s':'alt.d');
  var cap=document.getElementById('shot-cap');
  if(cap){ var key='c4cap.'+shotTab.charAt(0); cap.setAttribute('data-i18n',key); cap.textContent=T(key); }
}
function applyLang(l){
  curLang=(I18N[l]?l:'ru'); var d=I18N[curLang];
  var nodes=document.querySelectorAll('[data-i18n]');
  for(var i=0;i<nodes.length;i++){
    var k=nodes[i].getAttribute('data-i18n');
    if(d[k]!=null){ if(k==='hero.h') nodes[i].innerHTML=d[k]; else nodes[i].textContent=d[k]; }
  }
  document.documentElement.lang=curLang; document.title=d.title;
  var bs=document.querySelectorAll('.lang');
  for(var j=0;j<bs.length;j++) bs[j].classList.toggle('on',bs[j].getAttribute('data-lang')===curLang);
  updateColname(); updateShot();
  try{ localStorage.setItem('dsw-lang',curLang); }catch(e){}
}
(function(){
  var saved=null; try{ saved=localStorage.getItem('dsw-lang'); }catch(e){}
  applyLang(saved||'ru');
  var bs=document.querySelectorAll('.lang');
  for(var i=0;i<bs.length;i++) bs[i].addEventListener('click',function(){ applyLang(this.getAttribute('data-lang')); });
})();

/* ═══════════ Часы панели задач ═══════════ */
(function(){
  var t=document.getElementById('tb-time'), d=document.getElementById('tb-date'); if(!t) return;
  function tick(){ var n=new Date(), p=function(x){return (x<10?'0':'')+x;};
    t.textContent=p(n.getHours())+':'+p(n.getMinutes());
    d.textContent=p(n.getDate())+'.'+p(n.getMonth()+1)+'.'+n.getFullYear(); }
  tick(); setInterval(tick,15000);
})();

/* ═══════════ Фоновый снег: параллакс + ветер + ледяное сияние ═══════════ */
var SnowFX=(function(){
  var cv=document.getElementById('snow'); if(!cv||RM) return {setColor:function(){}};
  var ctx=cv.getContext('2d'), W=0,H=0, color='#FFFFFF';
  var snow=[], windM=0, lastMX=null;
  var DPR=Math.min(window.devicePixelRatio||1,2);
  var LDEF=[ {r:[1,1.6], v:[12,26], a:.4}, {r:[1.8,2.6],v:[30,55], a:.65}, {r:[2.8,4], v:[58,92], a:.9} ];
  function spawnSnow(l,top){
    var d=LDEF[l];
    return {l:l,x:Math.random()*W,y:top?-10:Math.random()*H,r:rnd(d.r[0],d.r[1]),v:rnd(d.v[0],d.v[1]),dr:rnd(-9,9),ph:Math.random()*6.283,o:d.a};
  }
  function resize(){
    W=cv.clientWidth;H=cv.clientHeight;
    cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
    var total=Math.round(Math.min(210,Math.max(70,W*H/15000)));
    snow=[]; var counts=[total*.5,total*.32,total*.18];
    for(var l=0;l<3;l++){snow[l]=[];for(var i=0;i<counts[l];i++)snow[l][i]=spawnSnow(l,false);}
  }
  function setColor(c,idx){
    color=c; curColIdx=idx; updateColname();
    var sw=document.querySelectorAll('.sw');
    for(var i=0;i<sw.length;i++) sw[i].classList.toggle('on',sw[i].getAttribute('data-col')===c);
  }
  window.addEventListener('resize',resize);
  window.addEventListener('mousemove',function(e){
    if(lastMX!=null){ windM=Math.max(-38,Math.min(38,windM+(e.clientX-lastMX)*0.5)); }
    lastMX=e.clientX;
  });
  resize();
  visibleLoop(cv,function(dt,ts){
    ctx.clearRect(0,0,W,H);
    var wind=Math.sin(ts*0.00025)*8+(windM*=0.93);
    ctx.fillStyle=color;
    for(var l=0;l<3;l++){
      var par=[.55,.8,1.15][l], arr=snow[l]; if(!arr) continue;
      if(l===2){ ctx.shadowColor='rgba(56,189,248,.55)'; ctx.shadowBlur=7; } else { ctx.shadowBlur=0; }
      for(var i=0;i<arr.length;i++){
        var f=arr[i]; f.ph+=dt*(1+l*.4);
        f.y+=f.v*dt; f.x+=(wind*par+f.dr+Math.sin(f.ph)*7)*dt;
        if(f.y>H+8){arr[i]=spawnSnow(l,true);continue;}
        if(f.x<-10)f.x=W+10; else if(f.x>W+10)f.x=-10;
        ctx.globalAlpha=f.o;
        ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,6.2832);ctx.fill();
      }
    }
    ctx.shadowBlur=0; ctx.globalAlpha=1;
  });
  return {setColor:setColor};
})();
(function(){
  var sw=document.querySelectorAll('.sw');
  var cols=[]; for(var i=0;i<sw.length;i++){ cols.push(sw[i].getAttribute('data-col'));
    (function(idx){ sw[idx].addEventListener('click',function(){ SnowFX.setColor(cols[idx],idx+1); }); })(i);
  }
})();

/* ═══════════ ВИТРИНА: живое окно Win11 — drag / рывок / смахивание / пауза ═══════════ */
var DemoFX=(function(){
  var stage=document.getElementById('stage'), win=document.getElementById('demo-win'),
      bar=document.getElementById('demo-titlebar'), cvs=document.getElementById('demo-canvas'),
      shakeBtn=document.getElementById('btn-shake'), gameBtn=document.getElementById('game-btn');
  if(!stage||!win||!bar||!cvs) return {shake:function(){}};
  var COL=4, TB_H=52;
  var SW=0,SH=0, WW=560, WH=0, centered=false;
  var wx=0, wy=56, prevWx=0, winVx=0;
  var pile=[], tbPile=[], flakes=[], flying=[];
  var dragging=false, lastPX=0, lastPY=0, flips=0, lastDXSign=0, lastFlipT=0;
  var shakeT=-1, shakeBase=0, game=false, acc=0;

  function resize(){
    SW=stage.clientWidth; SH=stage.clientHeight;
    var r=win.getBoundingClientRect(); WW=r.width; WH=r.height;
    if(!centered && SW>10){ wx=(SW-WW)/2; centered=true; }
    wx=clamp(wx,6,Math.max(6,SW-WW-6)); wy=clamp(wy,10,Math.max(10,SH-WH-TB_H-8));
    pile=new Array(Math.max(1,Math.ceil(WW/COL)));
    tbPile=new Array(Math.max(1,Math.ceil(SW/COL)));
    for(var i=0;i<pile.length;i++) pile[i]=rnd(0,2.6);
    for(var j=0;j<tbPile.length;j++) tbPile[j]=rnd(0,2.2);
    flakes=[]; flying=[];
    pile.jit=null; tbPile.jit=null;
  }
  function pileTotal(a){var s=0;for(var i=0;i<a.length;i++)s+=a[i];return s;}
  function spawnFlake(){
    var toWin=Math.random()<0.62;
    flakes.push({ x: toWin?wx+rnd(0,WW):rnd(0,SW), y:rnd(-90,-8), v:rnd(55,130), r:rnd(1.3,2.5), dr:rnd(-14,14), ph:Math.random()*6.283, t:toWin?'w':'b' });
  }
  function scatter(dirVx){
    for(var c=0;c<pile.length;c++){
      var h=pile[c]; if(h<=0) continue;
      var n=Math.max(1,Math.round(h/2.2));
      for(var i=0;i<n;i++) flying.push({x:wx+c*COL+rnd(0,COL), y:wy-h*.5+rnd(-3,3),
        vx:dirVx*0.55+rnd(-170,170), vy:-rnd(60,400), r:rnd(1.2,3), life:rnd(.7,1.5)});
      pile[c]=0;
    }
  }
  function doShake(){ if(shakeT<0){ shakeT=0; shakeBase=wx; } setTimeout(function(){ if(shakeT<0) scatter(rnd(-200,200)); },60); }
  function setGame(on){
    game=on; stage.classList.toggle('paused',on);
    if(gameBtn){ gameBtn.classList.toggle('on',on); gameBtn.setAttribute('aria-pressed',on?'true':'false'); }
    if(on){ for(var i=0;i<pile.length;i++)pile[i]=0; for(var j=0;j<tbPile.length;j++)tbPile[j]=0; flakes=[]; flying=[]; acc=0; }
  }

  bar.addEventListener('pointerdown',function(e){
    if(e.target.closest('.gamechip')||e.target.closest('.wb')) return;
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
      if(lastDXSign!==0&&sgn!==lastDXSign){ if(now-lastFlipT<220)flips++; else flips=1; lastFlipT=now; }
      if(lastDXSign===0) lastFlipT=now;
      lastDXSign=sgn;
    }
    if(flips>=3){ scatter(winVx||0); flips=0; }
    lastPX=e.clientX; lastPY=e.clientY;
    e.preventDefault();
  });
  bar.addEventListener('pointerup',function(){dragging=false;});
  bar.addEventListener('pointercancel',function(){dragging=false;});

  stage.addEventListener('pointermove',function(e){
    if(dragging||game) return;
    var r=stage.getBoundingClientRect();
    var px=e.clientX-r.left, py=e.clientY-r.top;
    function wipe(p,arr,ybase){
      var c0=Math.floor((p-14)/COL), c1=Math.ceil((p+14)/COL), touched=false;
      for(var c=Math.max(0,c0);c<Math.min(arr.length,c1);c++){
        if(arr[c]>1){ arr[c]=Math.max(0,arr[c]-3.4); touched=true; }
      }
      if(touched) for(var i=0;i<3;i++)
        flying.push({x:px,y:ybase-rnd(2,16),vx:rnd(-70,70),vy:-rnd(30,140),r:rnd(1,2.2),life:rnd(.4,.9)});
    }
    if(py>wy-42&&py<wy+10) wipe(px-wx,pile,wy);
    else if(py>SH-TB_H-36&&py<SH-TB_H+8) wipe(px,tbPile,SH-TB_H);
  });
  if(shakeBtn) shakeBtn.addEventListener('click',doShake);
  if(gameBtn) gameBtn.addEventListener('click',function(){ setGame(!game); });

  visibleLoop(cvs,function(dt,ts){
    var m=fit(cvs); if(m.W<10) return;
    var ctx=m.ctx;
    if(shakeT>=0){
      shakeT+=dt; var k=1-shakeT/0.7;
      if(k<=0){ shakeT=-1; wx=shakeBase; }
      else wx=shakeBase+Math.sin(shakeT*44)*15*k;
    }
    winVx=(wx-prevWx)/dt; prevWx=wx;
    if(!game&&Math.abs(winVx)>950) scatter(winVx);
    if(!game){
      acc+=dt*26;
      while(acc>1){ acc-=1;
        if(pileTotal(pile)<pile.length*5.2+110||pileTotal(tbPile)<tbPile.length*4.6+90) spawnFlake();
      }
    }
    for(var i=flakes.length-1;i>=0;i--){
      var f=flakes[i]; f.ph+=dt; f.y+=f.v*dt; f.x+=f.dr*dt+Math.sin(f.ph)*8*dt;
      if(f.t==='w'){
        var rel=f.x-wx;
        if(rel>=0&&rel<WW){
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

    ctx.clearRect(0,0,m.W,m.H);
    win.style.transform='translate('+wx+'px,'+wy+'px)';
    function drawPile(arr,x0,y0,maxH){
      var n=arr.length; if(!n) return;
      if(!arr.jit){ arr.jit=[]; for(var jj=0;jj<n;jj++) arr.jit[jj]=0.7+Math.random()*0.75; }
      function hgt(c){ return Math.max(0.3, arr[c]*arr.jit[c]+Math.sin(c*0.9+ts*0.0011)*0.9); }
      function path(){
        ctx.beginPath(); ctx.moveTo(x0-2,y0+1);
        for(var c=0;c<n;c++){
          var cx=x0+c*COL+COL/2, y=y0-hgt(c);
          if(c===0) ctx.lineTo(x0,y);
          ctx.quadraticCurveTo(cx-COL/2,y,cx+COL/2,y);
        }
        ctx.lineTo(x0+n*COL,y0+1);
      }
      ctx.save();
      ctx.translate(0,4); path(); ctx.closePath(); ctx.fillStyle='rgba(70,90,130,.3)'; ctx.fill();
      ctx.translate(0,4.5); path(); ctx.closePath(); ctx.fillStyle='rgba(70,90,130,.15)'; ctx.fill();
      ctx.restore();
      var g=ctx.createLinearGradient(0,y0-maxH-2,0,y0+1);
      g.addColorStop(0,'#FFFFFF'); g.addColorStop(.6,'#E7EEFA'); g.addColorStop(1,'#96A9C9');
      path(); ctx.closePath(); ctx.fillStyle=g; ctx.fill();
      for(var s=1;s<n-1;s++){
        if(hgt(s)>hgt(s-1)&&hgt(s)>=hgt(s+1)&&hgt(s)>4){
          var sx=x0+s*COL+COL/2, sy=y0-hgt(s);
          var rg=ctx.createRadialGradient(sx,sy,0,sx,sy,7);
          rg.addColorStop(0,'rgba(255,255,255,.85)'); rg.addColorStop(1,'rgba(255,255,255,0)');
          ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(sx,sy,7,0,6.2832); ctx.fill();
        }
      }
    }
    if(!game){ drawPile(pile,wx,wy,26); drawPile(tbPile,0,SH-TB_H,16); }
    ctx.fillStyle='#F4F4F5';
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
  window.addEventListener('resize',function(){ centered=false; resize(); });
  resize();
  return {shake:doShake};
})();

/* ═══════════ СЕКЦИЯ 1: DWM-привязка + пауза под рамкой скриншота ═══════════ */
(function(){
  var cv=document.getElementById('c-dwm'); if(!cv||RM) return;
  var COL=6, dpile=[], flakes=[], kicked=[], acc=0;
  visibleLoop(cv,function(dt,ts){
    var m=fit(cv), ctx=m.ctx, W=m.W, H=m.H;
    var wx0=W*0.08, ww=W*0.84, wy0=H*0.34, barH=30;
    var n=Math.ceil(ww/COL);
    if(dpile.length!==n){ dpile=new Array(n).fill(0); flakes=[]; }
    acc+=dt*34;
    while(acc>1){ acc-=1; if(Math.random()<0.82) flakes.push({x:rnd(wx0,wx0+ww),y:-6,v:rnd(50,110),r:rnd(1,2.2)}); }
    for(var i=flakes.length-1;i>=0;i--){
      var f=flakes[i]; f.y+=f.v*dt; f.x+=Math.sin(ts*0.001+i)*6*dt;
      var c=clamp(Math.floor((f.x-wx0)/COL),0,n-1);
      if(f.y>=wy0-dpile[c]){ dpile[c]=Math.min(16,dpile[c]+f.r*0.9); flakes.splice(i,1); }
    }
    var cyc=(ts*0.001)%8.2, mx=-160+((W+320)*(cyc/5.2));
    var marquee={x:mx,y:wy0-30,w:140,h:H*0.5};
    for(var c2=0;c2<n;c2++){
      var colX=wx0+c2*COL;
      if(colX+COL>marquee.x&&colX<marquee.x+marquee.w){
        if(dpile[c2]>0.6&&Math.random()<0.3)
          kicked.push({x:colX+COL/2,y:wy0-dpile[c2]/2,vx:rnd(-40,40),vy:-rnd(30,110),r:rnd(1,2),life:rnd(.4,.8)});
        dpile[c2]=0;
      }
    }
    for(var k=kicked.length-1;k>=0;k--){
      var p=kicked[k]; p.life-=dt; p.vy+=900*dt; p.x+=p.vx*dt; p.y+=p.vy*dt;
      if(p.life<=0) kicked.splice(k,1);
    }
    ctx.clearRect(0,0,W,H);
    /* тёмное окно */
    var wg=ctx.createLinearGradient(0,wy0,0,wy0+H*0.46);
    wg.addColorStop(0,'rgba(24,27,34,.95)'); wg.addColorStop(1,'rgba(13,14,18,.97)');
    ctx.fillStyle=wg; ctx.strokeStyle='rgba(255,255,255,.14)'; ctx.lineWidth=1.4;
    roundRect(ctx,wx0,wy0,ww,H*0.46,12); ctx.fill(); ctx.stroke();
    ctx.fillStyle='rgba(255,255,255,.055)';
    roundRect(ctx,wx0,wy0,ww,barH,0); ctx.fill();
    ctx.fillStyle='rgba(255,255,255,.05)';
    for(var l2=0;l2<3;l2++) { roundRect(ctx,wx0+22,wy0+barH+22+l2*22,ww*0.6-l2*36,7,3); ctx.fill(); }
    /* кнопки окна */
    var btns=[['#8E8E93','min'],['#8E8E93','max'],['#EF4444','x']];
    for(var b=0;b<3;b++){
      var bx=wx0+ww-14-(2-b)*30, by=wy0+barH/2;
      ctx.strokeStyle=btns[b][0]; ctx.lineWidth=1.4; ctx.beginPath();
      if(btns[b][1]==='min'){ ctx.moveTo(bx-4,by); ctx.lineTo(bx+4,by); }
      else if(btns[b][1]==='max'){ ctx.rect(bx-4,by-4,8,8); }
      else { ctx.moveTo(bx-3.5,by-3.5); ctx.lineTo(bx+3.5,by+3.5); ctx.moveTo(bx+3.5,by-3.5); ctx.lineTo(bx-3.5,by+3.5); }
      ctx.stroke();
    }
    /* объёмный сугроб на шапке */
    if(dpile.length){
      if(!dpile.jit){ dpile.jit=[]; for(var jj=0;jj<n;jj++) dpile.jit[jj]=0.7+Math.random()*0.75; }
      function hgt(c){ return Math.max(0.3, dpile[c]*dpile.jit[c]+Math.sin(c*0.9+ts*0.0011)*0.9); }
      ctx.save(); ctx.translate(0,4);
      ctx.beginPath(); ctx.moveTo(wx0-1,wy0+1);
      for(var c3=0;c3<n;c3++){ var cx3=wx0+c3*COL+COL/2, y3=wy0-hgt(c3); if(c3===0)ctx.lineTo(wx0,y3); ctx.quadraticCurveTo(cx3-COL/2,y3,cx3+COL/2,y3); }
      ctx.lineTo(wx0+ww,wy0+1); ctx.closePath(); ctx.fillStyle='rgba(60,80,120,.32)'; ctx.fill(); ctx.restore();
      var g=ctx.createLinearGradient(0,wy0-18,0,wy0+1);
      g.addColorStop(0,'#FFFFFF'); g.addColorStop(.6,'#E7EEFA'); g.addColorStop(1,'#96A9C9');
      ctx.beginPath(); ctx.moveTo(wx0-1,wy0+1);
      for(var c4=0;c4<n;c4++){ var cx4=wx0+c4*COL+COL/2, y4=wy0-hgt(c4); if(c4===0)ctx.lineTo(wx0,y4); ctx.quadraticCurveTo(cx4-COL/2,y4,cx4+COL/2,y4); }
      ctx.lineTo(wx0+ww,wy0+1); ctx.closePath(); ctx.fillStyle=g; ctx.fill();
      for(var s=1;s<n-1;s++){
        if(hgt(s)>hgt(s-1)&&hgt(s)>=hgt(s+1)&&hgt(s)>5){
          var sx=wx0+s*COL+COL/2, sy=wy0-hgt(s);
          var rg=ctx.createRadialGradient(sx,sy,0,sx,sy,9);
          rg.addColorStop(0,'rgba(255,255,255,.9)'); rg.addColorStop(1,'rgba(255,255,255,0)');
          ctx.fillStyle=rg; ctx.beginPath(); ctx.arc(sx,sy,9,0,6.2832); ctx.fill();
        }
      }
    }
    ctx.fillStyle='#F4F4F5';
    for(var s2=0;s2<flakes.length;s2++){ ctx.globalAlpha=.85;ctx.beginPath();ctx.arc(flakes[s2].x,flakes[s2].y,flakes[s2].r,0,6.2832);ctx.fill(); }
    for(var s3=0;s3<kicked.length;s3++){ ctx.globalAlpha=clamp(kicked[s3].life*1.6,0,1);ctx.beginPath();ctx.arc(kicked[s3].x,kicked[s3].y,kicked[s3].r,0,6.2832);ctx.fill(); }
    /* рамка выделения Lightshot */
    ctx.globalAlpha=1;
    ctx.strokeStyle='#38BDF8'; ctx.setLineDash([6,4]); ctx.lineWidth=1.4;
    ctx.strokeRect(marquee.x,marquee.y,marquee.w,marquee.h);
    ctx.setLineDash([]);
    ctx.fillStyle='rgba(56,189,248,.06)'; ctx.fillRect(marquee.x,marquee.y,marquee.w,marquee.h);
    ctx.fillStyle='#38BDF8';
    var hx=[marquee.x,marquee.x+marquee.w], hy=[marquee.y,marquee.y+marquee.h];
    for(var a=0;a<2;a++)for(var b2=0;b2<2;b2++) ctx.fillRect(hx[a]-3,hy[b2]-3,6,6);
  });
  function roundRect(c,x,y,w,h,r){
    r=Math.min(r,w/2,h/2);
    c.beginPath();
    c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);
    c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();
  }
})();

/* ═══════════ СЕКЦИЯ 2: песочница снеговиков + новогодний поезд ═══════════ */
(function(){
  var cv=document.getElementById('c-stage'); if(!cv||RM) return;
  var trainBtn=document.getElementById('train-btn'), resetBtn=document.getElementById('stage-reset');
  var balls=[], snowmen=[], pieces=[], puffs=[], flakes=[];
  var trainGo=false, trainX=-999, autoT=rnd(3,6), seeded=false;
  function driftTop(x,H){ return H-58+13*Math.sin(x*0.018+1.7)+8*Math.sin(x*0.039+0.4); }
  cv.addEventListener('pointerdown',function(e){
    var m=fit(cv), r=cv.getBoundingClientRect();
    var px=(e.clientX-r.left)*(m.W/r.width), py=(e.clientY-r.top)*(m.H/r.height);
    if(py>m.H*0.45){
      balls.rolling={x:px,r:14,acc:0}; balls.lastPX=px;
      try{ cv.setPointerCapture(e.pointerId); }catch(_){}
      e.preventDefault();
    }
  });
  cv.addEventListener('pointermove',function(e){
    if(!balls.rolling) return;
    var m=fit(cv), r=cv.getBoundingClientRect();
    var px=(e.clientX-r.left)*(m.W/r.width);
    var dx=px-balls.lastPX; balls.lastPX=px;
    balls.rolling.acc+=Math.abs(dx);
    balls.rolling.r=Math.min(48,14+balls.rolling.acc*0.13);
    balls.rolling.x=clamp(px,balls.rolling.r,m.W-balls.rolling.r);
    e.preventDefault();
  });
  function release(){
    if(!balls.rolling) return;
    var m=fit(cv);
    balls.push({x:balls.rolling.x,y:driftTop(balls.rolling.x,m.H)-balls.rolling.r*0.55,r:balls.rolling.r});
    balls.rolling=null;
    if(balls.length>=3){
      var big=balls[0]; for(var i=1;i<3;i++) if(balls[i].r>big.r) big=balls[i];
      snowmen.push({x:clamp(big.x,44,m.W-120),t:0,s:0});
      balls=[];
    }
  }
  cv.addEventListener('pointerup',release);
  cv.addEventListener('pointercancel',release);
  if(resetBtn) resetBtn.addEventListener('click',function(){ balls=[]; snowmen=[]; pieces=[]; });
  if(trainBtn) trainBtn.addEventListener('click',function(){ launchTrain(); });
  function launchTrain(){
    var m=fit(cv);
    if(!trainGo){ trainGo=true; trainX=m.W+170; }
  }
  function knock(sn){
    sn.s=1; sn.t=0;
    for(var k=0;k<10;k++) pieces.push({x:sn.x+rnd(-9,9),y:driftTop(sn.x,cv.clientHeight||300)-rnd(8,36),vx:rnd(-130,130),vy:-rnd(60,270),r:rnd(2,5),life:rnd(.6,1.2)});
  }
  function drawSnowman(ctx,x,gy,s){
    var r1=19*s,r2=14*s,r3=9.5*s;
    var y1=gy-r1,y2=y1-r2*1.5,y3=y2-r3*1.45;
    function ball(y,r){
      var g=ctx.createRadialGradient(x-r*0.35,y-r*0.4,r*0.2,x,y,r);
      g.addColorStop(0,'#FFFFFF'); g.addColorStop(1,'#B9CCE9');
      ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,r,0,6.2832); ctx.fill();
    }
    ball(y1,r1); ball(y2,r2); ball(y3,r3);
    ctx.fillStyle='#17181C';
    ctx.beginPath(); ctx.arc(x-r3*0.32,y3-r3*0.14,r3*0.12,0,6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(x+r3*0.32,y3-r3*0.14,r3*0.12,0,6.2832); ctx.fill();
    ctx.fillStyle='#EF4444';
    ctx.beginPath(); ctx.moveTo(x,y3+r3*0.1); ctx.lineTo(x+r3*0.95,y3+r3*0.35); ctx.lineTo(x,y3+r3*0.34); ctx.closePath(); ctx.fill();
    ctx.strokeStyle='#8A6A48'; ctx.lineWidth=1.7*s; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(x-r2*0.85,y2); ctx.lineTo(x-r2*1.75,y2-r2*0.85); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x+r2*0.85,y2); ctx.lineTo(x+r2*1.75,y2-r2*0.85); ctx.stroke();
    ctx.fillStyle='#EF4444';
    roundRect(ctx,x-r2*0.6,y2+r2*0.6,r2*1.2,r2*0.36,2); ctx.fill();
  }
  function drawTrain(ctx,gy,x){
    var by=gy-10;
    var wagX=x+86;
    ctx.fillStyle='#1D1F26'; ctx.strokeStyle='rgba(56,189,248,.5)'; ctx.lineWidth=1.3;
    roundRect(ctx,wagX,by-30,62,26,5); ctx.fill(); ctx.stroke();
    var gc=['#EF4444','#38BDF8','#FBBF24'];
    for(var gI=0;gI<3;gI++){
      ctx.fillStyle=gc[gI];
      roundRect(ctx,wagX+8+gI*18,by-40,13,11,2); ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.55)'; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(wagX+14.5+gI*18,by-40); ctx.lineTo(wagX+14.5+gI*18,by-29);
      ctx.moveTo(wagX+8+gI*18,by-34.5); ctx.lineTo(wagX+21+gI*18,by-34.5); ctx.stroke();
    }
    ctx.fillStyle='#101116';
    ctx.beginPath(); ctx.arc(wagX+13,by+1,6.5,0,6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(wagX+47,by+1,6.5,0,6.2832); ctx.fill();
    ctx.fillStyle='#B91C1C';
    roundRect(ctx,x,by-34,56,28,6); ctx.fill();
    ctx.fillStyle='#7F1D1D';
    roundRect(ctx,x+32,by-48,22,18,4); ctx.fill();
    ctx.fillStyle='#FBBF24';
    roundRect(ctx,x+4,by-28,10,10,2); ctx.fill();
    ctx.beginPath(); ctx.arc(x+28,by-44,5,0,6.2832); ctx.fill();
    ctx.fillStyle='#101116';
    ctx.beginPath(); ctx.arc(x+13,by+1,7.5,0,6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(x+36,by+1,7.5,0,6.2832); ctx.fill();
    ctx.beginPath(); ctx.arc(x+50,by+1,5.5,0,6.2832); ctx.fill();
    ctx.fillStyle='#38BDF8';
    roundRect(ctx,x+35,by-44,16,9,2); ctx.fill();
  }
  function drawTree(ctx,x,gy,ts){
    var baseY=gy+6;
    var tiers=[[46,30],[38,58],[30,86],[22,112]];
    ctx.fillStyle='#4A3A22';
    roundRect(ctx,x-5,baseY-10,10,12,2); ctx.fill();
    for(var i=0;i<tiers.length;i++){
      var wHalf=tiers[i][0], yTop=baseY-tiers[i][1]-30, yBot=baseY-tiers[i][1];
      ctx.fillStyle=i%2?'#173A2C':'#123023';
      ctx.beginPath(); ctx.moveTo(x,yTop);
      for(var s=0;s<=5;s++){ var t2=s/5; ctx.lineTo(x+wHalf*(0.35+0.65*t2)*(s%2?0.76:0.62),yTop+(yBot-yTop)*t2); }
      for(var s2=5;s2>=0;s2--){ var t3=s2/5; ctx.lineTo(x-wHalf*(0.35+0.65*t3)*(s2%2?0.76:0.62),yTop+(yBot-yTop)*t3+(s2%2?4:0)); }
      ctx.closePath(); ctx.fill();
    }
    var cols=['#38BDF8','#EF4444','#FBBF24','#E0F2FE'];
    for(var l=0;l<3;l++){
      var ly=baseY-38-l*26, spread=34+l*10;
      for(var d=0;d<=6;d++){
        var lx=x-spread+(spread*2)*(d/6), ly2=ly+Math.sin(d*1.9)*4;
        var c=cols[(l*3+d)%4], tw=0.5+0.5*Math.sin(ts*2.2+l*2+d);
        ctx.globalAlpha=tw; ctx.fillStyle=c;
        ctx.beginPath(); ctx.arc(lx,ly2,2.2,0,6.2832); ctx.fill();
        ctx.globalAlpha=tw*0.25; ctx.beginPath(); ctx.arc(lx,ly2,4.8,0,6.2832); ctx.fill();
      }
    }
    ctx.globalAlpha=1;
    ctx.save(); ctx.translate(x,baseY-150); ctx.fillStyle='#FBBF24';
    ctx.beginPath();
    for(var sp=0;sp<10;sp++){ var rr=sp%2?4:9, an=-Math.PI/2+sp*Math.PI/5; ctx.lineTo(Math.cos(an)*rr,Math.sin(an)*rr); }
    ctx.closePath(); ctx.fill();
    ctx.globalAlpha=.3; ctx.beginPath(); ctx.arc(0,0,14+Math.sin(ts*2)*2,0,6.2832); ctx.fill();
    ctx.restore(); ctx.globalAlpha=1;
  }
  function roundRect(c,x,y,w,h,r){
    r=Math.min(r,w/2,h/2);
    c.beginPath();
    c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);
    c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();
  }
  visibleLoop(cv,function(dt,ts){
    var m=fit(cv), ctx=m.ctx, W=m.W, H=m.H;
    var gy=H-52;
    if(!seeded && W>10){ snowmen.push({x:W*0.30,t:1.1,s:0},{x:W*0.52,t:1.35,s:0}); seeded=true; }
    /* поезд */
    if(!trainGo){ autoT-=dt; if(autoT<=0){ trainGo=true; trainX=W+170; } }
    else {
      trainX-=dt*(W+340)/4.2;
      if(Math.random()<0.3) puffs.push({x:trainX+38,y:gy-50,r:rnd(2,4.5),vy:-rnd(18,36),life:rnd(.7,1.3)});
      for(var i=0;i<snowmen.length;i++){ var sn=snowmen[i]; if(sn.s===0&&sn.t>0.5&&Math.abs(trainX+8-sn.x)<14) knock(sn); }
      if(trainX<-200){ trainGo=false; autoT=rnd(5,8); }
    }
    for(var j=0;j<snowmen.length;j++){ var s2=snowmen[j]; if(s2.s===1){ s2.t+=dt; if(s2.t>1.9){ s2.s=0; s2.t=0; } } else s2.t+=dt; }
    for(var p=pieces.length-1;p>=0;p--){ var pc=pieces[p]; pc.life-=dt; pc.vy+=1200*dt; pc.x+=pc.vx*dt; pc.y+=pc.vy*dt; if(pc.life<=0) pieces.splice(p,1); }
    for(var pf=puffs.length-1;pf>=0;pf--){ var pu=puffs[pf]; pu.life-=dt; pu.y+=pu.vy*dt; pu.x-=22*dt; pu.r+=6*dt; if(pu.life<=0) puffs.splice(pf,1); }
    if(flakes.length<46&&Math.random()<0.24) flakes.push({x:rnd(0,W),y:-4,v:rnd(20,46),r:rnd(0.8,2.1),ph:Math.random()*6.283});
    for(var wf=flakes.length-1;wf>=0;wf--){ var f2=flakes[wf]; f2.ph+=dt; f2.y+=f2.v*dt; f2.x+=Math.sin(f2.ph)*10*dt; if(f2.y>H) flakes.splice(wf,1); }
    /* ── рендер ── */
    var sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,'#08090D'); sky.addColorStop(1,'#0D0E14');
    ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#101218';
    for(var tI=0;tI<7;tI++){
      var tx=30+tI*(W/7)+Math.sin(tI*7)*14;
      ctx.beginPath(); ctx.moveTo(tx-12,gy+8); ctx.lineTo(tx,gy-28-(tI%3)*8); ctx.lineTo(tx+12,gy+8); ctx.closePath(); ctx.fill();
    }
    drawTree(ctx,W*0.9,gy,ts);
    if(trainGo){ ctx.save(); ctx.translate(trainX+70,gy-20); ctx.scale(1.16,1.16); ctx.translate(-(trainX+70),-(gy-20)); drawTrain(ctx,gy,trainX); ctx.restore(); }
    for(var s3=0;s3<snowmen.length;s3++){
      var sn2=snowmen[s3];
      if(sn2.s===0){ var sc=Math.min(1,sn2.t*1.3); if(sc>0.05) drawSnowman(ctx,sn2.x,driftTop(sn2.x,H)-6,0.6+0.4*easeOutBack(sc)); }
    }
    ctx.fillStyle='#F4F4F5';
    for(var pc2=0;pc2<pieces.length;pc2++){ ctx.globalAlpha=clamp(pieces[pc2].life,0,1); ctx.beginPath(); ctx.arc(pieces[pc2].x,pieces[pc2].y,pieces[pc2].r,0,6.2832); ctx.fill(); }
    ctx.globalAlpha=1;
    for(var pu2=0;pu2<puffs.length;pu2++){ ctx.globalAlpha=clamp(puffs[pu2].life*0.6,0,1)*0.7; ctx.fillStyle='#9BA3B2'; ctx.beginPath(); ctx.arc(puffs[pu2].x,puffs[pu2].y,puffs[pu2].r,0,6.2832); ctx.fill(); }
    ctx.globalAlpha=1;
    var gg=ctx.createLinearGradient(0,gy-12,0,H);
    gg.addColorStop(0,'#FFFFFF'); gg.addColorStop(.55,'#DCE7F5'); gg.addColorStop(1,'#8FA6C8');
    ctx.fillStyle=gg;
    ctx.beginPath(); ctx.moveTo(0,H);
    for(var gx=0;gx<=W;gx+=10) ctx.lineTo(gx,driftTop(gx,H)+4);
    ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    /* скатываемый ком поверх сугроба */
    if(balls.rolling){
      var rl=balls.rolling, ry=driftTop(rl.x,H)-rl.r*0.55;
      var rg2=ctx.createRadialGradient(rl.x-rl.r*0.3,ry-rl.r*0.3,rl.r*0.2,rl.x,ry,rl.r);
      rg2.addColorStop(0,'#FFFFFF'); rg2.addColorStop(1,'#B9CCE9');
      ctx.fillStyle=rg2; ctx.beginPath(); ctx.arc(rl.x,ry,rl.r,0,6.2832); ctx.fill();
    }
    for(var b2=0;b2<balls.length;b2++){
      var ball=balls[b2];
      var bg=ctx.createRadialGradient(ball.x-ball.r*0.3,ball.y-ball.r*0.3,ball.r*0.2,ball.x,ball.y,ball.r);
      bg.addColorStop(0,'#FFFFFF'); bg.addColorStop(1,'#B9CCE9');
      ctx.fillStyle=bg; ctx.beginPath(); ctx.arc(ball.x,ball.y,ball.r,0,6.2832); ctx.fill();
    }
  });
  function easeOutBack(t){ var c=1.7; t-=1; return 1+(t*t*((c+1)*t+c)); }
})();

/* ═══════════ СЕКЦИЯ 3: вкладки реальных скриншотов ═══════════ */
(function(){
  var btns=document.querySelectorAll('.shot-tabs .tab');
  for(var i=0;i<btns.length;i++){
    (function(b){ b.addEventListener('click',function(){
      shotTab=b.getAttribute('data-shot');
      for(var j=0;j<btns.length;j++) btns[j].classList.toggle('on',btns[j]===b);
      updateShot();
    }); })(btns[i]);
  }
})();

/* ═══════════ Reveal ═══════════ */
(function(){
  if(RM||!('IntersectionObserver' in window)||document.visibilityState==='hidden'){
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
