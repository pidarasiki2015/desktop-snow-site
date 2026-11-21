/* Desktop Snow landing — снегопад с параллаксом + интерактивное демо-окно с физикой снега.
   Без зависимостей. requestAnimationFrame, пауза на скрытой вкладке, prefers-reduced-motion. */
(function () {
'use strict';
var RM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ═══════════ i18n RU / UA / EN ═══════════ */
var I18N = {
  ru: {
    'nav.features':'Фишки','nav.demo':'Интерактив','nav.how':'Как работает','nav.dl':'Скачать',
    'hero.kicker':'Windows 10 / 11 • Нативно • Без установки',
    'hero.t1':'Новый год уже здесь.','hero.t2':'Прямо на твоём рабочем столе',
    'hero.sub':'Живой снег на каждом окне, интерактивные снеговики, ёлки, Санта и поезд — для Windows 10 и 11. Работает на видеокарте, весит меньше мегабайта и не мешает в играх.',
    'hero.btn':'Скачать бесплатно (Windows 10/11)',
    'hero.note':'Портативная версия • Без установки • Direct2D',
    'demo.win':'Заметки.txt — Блокнот',
    'demo.l1':'Привет! Это обычное окно Windows.',
    'demo.l2':'Но на его шапке уже лежит снег…',
    'demo.l3':'Схвати меня за шапку и потащи. Дёрни резко — снег слетит!',
    'demo.hint':'Снег ложится на шапку окна и едет вместе с ним. Потяни окно — проверь!',
    'demo.shake':'Потрясти окно',
    'bento.h':'Фишки',
    'b1t':'Снег на каждом окне','b1d':'Попиксельная привязка к границам окон (DWM) — снег лежит ровно на шапке окна и мгновенно следует за ним при перетаскивании.',
    'b2t':'Физика рывка и сворачивания','b2d':'Швырни окно — снег разлетится; сверни окно — сугроб красиво осыплется на окно снизу или на панель задач.',
    'b3t':'Лепи снеговиков мышкой','b3d':'Зажми ЛКМ на сугробе и катай снежный ком, чтобы он рос, а затем поставь шары друг на друга прямо на окне.',
    'b4t':'Живой новогодний мир','b4d':'До 3 наряжаемых ёлок с гирляндами и шарами, любопытный Санта, йети и новогодний поезд, который с физикой сбивает снеговиков на своём пути.',
    'b5t':'Умная пауза в играх и браузере','b5d':'Мгновенно скрывается за 0 мс, когда ты открываешь игру, YouTube или браузер на весь экран — ноль помех и 0% нагрузки в фоне.',
    'b6t':'Современные настройки в стиле Windows 11','b6d':'Тёмная и светлая тема, выбор цвета снега, лимит FPS (30–144 Гц), поддержка нескольких мониторов и разных DPI.',
    'tech.h':'Лёгкий и быстрый',
    't1t':'Нативный C++ и Direct2D','t1d':'Никакого тяжёлого Electron — миллионы снежинок рендерит видеокарта.',
    't2t':'Нагрузка на CPU','t2d':'Менее ~3% и минимум оперативной памяти. Даже на старых ноутбуках.',
    't3t':'Сквозные клики','t3d':'Снег никогда не перекрывает нажатия по твоим программам.',
    'how.h':'Быстрый старт за 3 шага',
    's1t':'Скачай ZIP-архив','s1d':'со страницы GitHub Releases — это займёт секунды.',
    's2t':'Распакуй в любую папку','s2d':'Установка не нужна — всё в одном архиве.',
    's3t':'Запусти DesktopSnow.exe','s3d':'И наслаждайся атмосферой — снег пойдёт сразу.',
    'foot.sig':'Сделано с любовью к снегу. С Новым годом!','foot.repo':'GitHub-репозиторий','foot.rel':'Релизы',
    title:'Desktop Snow — Новый год уже здесь. Прямо на твоём рабочем столе'
  },
  ua: {
    'nav.features':'Фішки','nav.demo':'Інтерактив','nav.how':'Як працює','nav.dl':'Завантажити',
    'hero.kicker':'Windows 10 / 11 • Нативно • Без встановлення',
    'hero.t1':'Новий рік уже тут.','hero.t2':'Прямо на твоєму робочому столі',
    'hero.sub':'Живий сніг на кожному вікні, інтерактивні сніговики, ялинки, Санта та потяг — для Windows 10 і 11. Працює на відеокарті, важить менше мегабайта й не заважає в іграх.',
    'hero.btn':'Завантажити безкоштовно (Windows 10/11)',
    'hero.note':'Портативна версія • Без встановлення • Direct2D',
    'demo.win':'Нотатки.txt — Блокнот',
    'demo.l1':'Привіт! Це звичайне вікно Windows.',
    'demo.l2':'Але на його шапці вже лежить сніг…',
    'demo.l3':'Хапай мене за шапку й тягни. Різко смикнеш — сніг злетить!',
    'demo.hint':'Сніг лягає на шапку вікна і їде разом із ним. Потягни вікно — перевір!',
    'demo.shake':'Потрусити вікно',
    'bento.h':'Фішки',
    'b1t':'Сніг на кожному вікні','b1d':'Піксельна прив’язка до меж вікон (DWM) — сніг лежить рівно на шапці вікна й миттєво слідує за ним при перетягуванні.',
    'b2t':'Фізика ривка та згортання','b2d':'Шмигни вікном — сніг розлетиться; згорни вікно — замет красиво осиплеться на вікно знизу або на панель задач.',
    'b3t':'Ліпи сніговиків мишкою','b3d':'Затисни ЛКМ на заметі й коти сніжку, щоб вона росла, а потім постав кулі одна на одну прямо на вікні.',
    'b4t':'Живий новорічний світ','b4d':'До 3 наряджаних ялинок з гірляндами та кулями, допитливий Санта, єті та новорічний потяг, який з фізикою збиває сніговиків на своєму шляху.',
    'b5t':'Розумна пауза в іграх і браузері','b5d':'Миттєво ховається за 0 мс, коли ти відкриваєш гру, YouTube чи браузер на весь екран — нуль завад і 0% навантаження у фоні.',
    'b6t':'Сучасні налаштування у стилі Windows 11','b6d':'Темна й світла теми, вибір кольору снігу, ліміт FPS (30–144 Гц), підтримка кількох моніторів і різних DPI.',
    'tech.h':'Легкий і швидкий',
    't1t':'Нативний C++ і Direct2D','t1d':'Жодного важкого Electron — мільйони сніжинок рендерить відеокарта.',
    't2t':'Навантаження на CPU','t2d':'Менше ~3% і мінімум оперативної пам’яті. Навіть на старих ноутбуках.',
    't3t':'Наскрізні кліки','t3d':'Сніг ніколи не перекриває натискання по твоїх програмах.',
    'how.h':'Швидкий старт за 3 кроки',
    's1t':'Завантаж ZIP-архів','s1d':'зі сторінки GitHub Releases — це займе секунди.',
    's2t':'Розпакуй у будь-яку папку','s2d':'Встановлення не потрібне — все в одному архіві.',
    's3t':'Запусти DesktopSnow.exe','s3d':'І насолоджуйся атмосферою — сніг піде одразу.',
    'foot.sig':'Зроблено з любов’ю до снігу. З Новим роком!','foot.repo':'GitHub-репозиторій','foot.rel':'Релізи',
    title:'Desktop Snow — Новий рік уже тут. Прямо на твоєму робочому столі'
  },
  en: {
    'nav.features':'Features','nav.demo':'Interactive','nav.how':'How it works','nav.dl':'Download',
    'hero.kicker':'Windows 10 / 11 • Native • No install',
    'hero.t1':'The New Year is here.','hero.t2':'Right on your desktop',
    'hero.sub':'Living snow on every window, interactive snowmen, trees, Santa and a train — for Windows 10 and 11. GPU-powered, under a megabyte, never gets in the way of your games.',
    'hero.btn':'Download free (Windows 10/11)',
    'hero.note':'Portable • No installation • Direct2D',
    'demo.win':'Notes.txt — Notepad',
    'demo.l1':'Hi! This is an ordinary Windows window.',
    'demo.l2':'But snow is already piling up on its title bar…',
    'demo.l3':'Grab me by the title bar and drag. Yank hard — the snow flies off!',
    'demo.hint':'Snow settles on the title bar and travels with the window. Drag it — try it!',
    'demo.shake':'Shake the window',
    'bento.h':'Features',
    'b1t':'Snow on every window','b1d':'Pixel-perfect snapping to window edges (DWM) — snow rests right on the title bar and follows the window instantly as you drag it.',
    'b2t':'Fling & minimize physics','b2d':'Fling a window and the snow scatters; minimize it and the drift beautifully collapses onto the window or the taskbar.',
    'b3t':'Roll snowmen with your mouse','b3d':'Hold LMB on a drift and roll a snowball until it grows, then stack the balls on top of each other right on the window.',
    'b4t':'A living Christmas world','b4d':'Up to 3 decorate-able trees with garlands and baubles, a curious Santa, a yeti and a Christmas train that physically knocks snowmen off its path.',
    'b5t':'Smart pause in games & browser','b5d':'Instantly hides in 0 ms when you open a game, YouTube or a fullscreen browser — zero interference and 0% background load.',
    'b6t':'Modern Windows 11-style settings','b6d':'Dark and light themes, snow color picker, FPS cap (30–144 Hz), multi-monitor and mixed-DPI support.',
    'tech.h':'Light and fast',
    't1t':'Native C++ and Direct2D','t1d':'No heavy Electron — your GPU renders millions of snowflakes.',
    't2t':'CPU load','t2d':'Under ~3% with minimal RAM. Even on old laptops.',
    't3t':'Click-through','t3d':'Snow never blocks clicks to your apps.',
    'how.h':'Quick start in 3 steps',
    's1t':'Download the ZIP','s1d':'from GitHub Releases — it takes seconds.',
    's2t':'Unzip anywhere','s2d':'No installation needed — everything in one archive.',
    's3t':'Run DesktopSnow.exe','s3d':'And enjoy the atmosphere — snow starts right away.',
    'foot.sig':'Made with love for snow. Merry Christmas!','foot.repo':'GitHub repo','foot.rel':'Releases',
    title:'Desktop Snow — The New Year is here. Right on your desktop'
  }
};
function applyLang(l){
  var d = I18N[l] || I18N.ru;
  var nodes = document.querySelectorAll('[data-i18n]');
  for (var i=0;i<nodes.length;i++){ var k=nodes[i].getAttribute('data-i18n'); if (d[k]!=null) nodes[i].textContent=d[k]; }
  document.documentElement.lang = l; document.title = d.title;
  var bs = document.querySelectorAll('.lang');
  for (var j=0;j<bs.length;j++) bs[j].classList.toggle('on', bs[j].getAttribute('data-lang')===l);
  try { localStorage.setItem('dsw-lang', l); } catch(e){}
}
(function(){
  var saved=null; try{ saved=localStorage.getItem('dsw-lang'); }catch(e){}
  applyLang(saved || 'ru');
  var bs=document.querySelectorAll('.lang');
  for (var i=0;i<bs.length;i++) bs[i].addEventListener('click', function(){ applyLang(this.getAttribute('data-lang')); });
})();

/* ═══════════ Гирлянда ═══════════ */
(function(){ var g=document.querySelector('.garland'); if(!g) return; for(var i=0;i<28;i++) g.appendChild(document.createElement('i')); })();

/* ═══════════ Фоновый снег: 3 слоя параллакса + ветер + реакция на курсор ═══════════ */
(function(){
  var cv=document.getElementById('snow'); if(!cv||RM) return;
  var ctx=cv.getContext('2d'), W=0,H=0, layers=[], windM=0, lastMX=null, hidden=false;
  var DPR=Math.min(window.devicePixelRatio||1,2);
  function rnd(a,b){return a+Math.random()*(b-a);}
  var LDEF=[
    {r:[1,1.7], v:[12,26], a:.45},
    {r:[1.9,2.7],v:[30,55], a:.7},
    {r:[3,4.4], v:[60,95], a:.95}
  ];
  function spawn(l,top){
    var d=LDEF[l];
    return {l:l,x:Math.random()*W,y:top?-10:Math.random()*H,r:rnd(d.r[0],d.r[1]),v:rnd(d.v[0],d.v[1]),dr:rnd(-9,9),ph:Math.random()*6.283,o:d.a};
  }
  function resize(){
    W=cv.clientWidth;H=cv.clientHeight;
    cv.width=W*DPR;cv.height=H*DPR;ctx.setTransform(DPR,0,0,DPR,0,0);
    var total=Math.round(Math.min(230,Math.max(80,W*H/13000)));
    layers=[];
    var counts=[Math.round(total*.5),Math.round(total*.32),Math.round(total*.18)];
    for(var l=0;l<3;l++){layers[l]=[];for(var i=0;i<counts[l];i++)layers[l][i]=spawn(l,false);}
  }
  document.addEventListener('visibilitychange',function(){hidden=document.hidden;});
  window.addEventListener('mousemove',function(e){
    if(lastMX!=null){ windM=Math.max(-42,Math.min(42,windM+(e.clientX-lastMX)*0.55)); }
    lastMX=e.clientX;
  });
  var last=0;
  function frame(ts){
    requestAnimationFrame(frame);
    if(hidden) return;
    var dt=Math.min(.05,(ts-last)/1000||.016); last=ts;
    windM*=0.93;
    var wind=Math.sin(ts*0.00025)*9+windM;
    ctx.clearRect(0,0,W,H); ctx.fillStyle='#F8FAFC';
    for(var l=0;l<3;l++){
      var par=[.55,.8,1.15][l], arr=layers[l];
      for(var i=0;i<arr.length;i++){
        var f=arr[i]; f.ph+=dt*(1+l*.4);
        f.y+=f.v*dt; f.x+=(wind*par+f.dr+Math.sin(f.ph)*7)*dt;
        if(f.y>H+8){arr[i]=spawn(l,true);continue;}
        if(f.x<-10)f.x=W+10; else if(f.x>W+10)f.x=-10;
        ctx.globalAlpha=f.o;
        ctx.beginPath();ctx.arc(f.x,f.y,f.r,0,6.2832);ctx.fill();
      }
    }
    ctx.globalAlpha=1;
  }
  window.addEventListener('resize',resize);
  resize(); requestAnimationFrame(frame);
})();

/* ═══════════ ДЕМО: окно с сугробом, drag / рывок / смахивание ═══════════ */
(function(){
  var stage=document.getElementById('stage'), win=document.getElementById('demo-win'),
      bar=document.getElementById('demo-titlebar'), cvs=document.getElementById('demo-canvas'),
      shakeBtn=document.getElementById('shake-btn');
  if(!stage||!win||!bar||!cvs) return;
  var ctx=cvs.getContext('2d');
  var DPR=Math.min(window.devicePixelRatio||1,2);
  var SW=0,SH=0, COL=4, cols=0, pile=[], flakes=[], flying=[];
  var wx=24, wy=120, WW=330, WH=0, prevWx=24, winVx=0;
  var dragging=false, lastPX=0, lastPY=0, lastPT=0, flips=0, lastDXSign=0, lastFlipT=0;
  var shakeT=-1, shakeBase=0;
  function rnd(a,b){return a+Math.random()*(b-a);}

  function resize(){
    SW=stage.clientWidth; SH=stage.clientHeight;
    cvs.width=SW*DPR; cvs.height=SH*DPR; ctx.setTransform(DPR,0,0,DPR,0,0);
    var r=win.getBoundingClientRect();
    WW=r.width; WH=r.height;
    cols=Math.ceil(WW/COL); pile=new Array(cols).fill(0);
    wx=Math.min(Math.max(wx,8),Math.max(8,SW-WW-8)); wy=Math.min(wy,SH-WH-40);
    flakes=[]; flying=[];
  }
  function spawnFlake(){
    flakes.push({x:rnd(0,WW), y:rnd(-90,-6), v:rnd(55,130), r:rnd(1.3,2.5), dr:rnd(-14,14), ph:Math.random()*6.283});
  }
  function scatter(dirVx){
    for(var c=0;c<cols;c++){
      var h=pile[c]; if(h<=0) continue;
      var n=Math.max(1,Math.round(h/2.2));
      for(var i=0;i<n;i++){
        flying.push({x:wx+c*COL+rnd(0,COL), y:wy-h*.5+rnd(-3,3),
          vx:dirVx*0.55+rnd(-160,160), vy:-rnd(60,380), r:rnd(1.2,3), life:rnd(.7,1.5)});
      }
      pile[c]=0;
    }
  }
  function pileTotal(){var s=0;for(var i=0;i<cols;i++)s+=pile[i];return s;}
  function doShake(){ if(shakeT<0){ shakeT=0; shakeBase=wx; } }

  /* drag за шапку */
  bar.addEventListener('pointerdown',function(e){
    dragging=true; lastPX=e.clientX; lastPY=e.clientY; lastPT=performance.now();
    flips=0; lastDXSign=0; lastFlipT=0;
    try{ bar.setPointerCapture(e.pointerId); }catch(_){}
    e.preventDefault();
  });
  bar.addEventListener('pointermove',function(e){
    if(!dragging) return;
    var now=performance.now();
    var dx=e.clientX-lastPX, dy=e.clientY-lastPY;
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
    lastPX=e.clientX; lastPY=e.clientY; lastPT=now;
    e.preventDefault();
  });
  bar.addEventListener('pointerup',function(){dragging=false;});
  bar.addEventListener('pointercancel',function(){dragging=false;});

  /* смахивание снега курсором рядом с шапкой */
  stage.addEventListener('pointermove',function(e){
    if(dragging) return;
    var r=stage.getBoundingClientRect();
    var px=e.clientX-r.left, py=e.clientY-r.top;
    if(py>wy-42 && py<wy+10){
      var c0=Math.floor((px-wx-16)/COL), c1=Math.ceil((px-wx+16)/COL);
      var touched=false;
      for(var c=Math.max(0,c0);c<Math.min(cols,c1);c++){
        if(pile[c]>1){ pile[c]=Math.max(0,pile[c]-3.4); touched=true; }
      }
      if(touched) for(var i=0;i<3;i++)
        flying.push({x:px+rnd(-12,12),y:wy-rnd(2,16),vx:rnd(-70,70),vy:-rnd(30,140),r:rnd(1,2.2),life:rnd(.4,.9)});
    }
  });
  if(shakeBtn) shakeBtn.addEventListener('click',doShake);

  function clampPos(){
    wx=Math.min(Math.max(wx,6),Math.max(6,SW-WW-6));
    wy=Math.min(Math.max(wy,64),SH-WH-10);
  }

  var last=0, hidden=false, acc=0;
  document.addEventListener('visibilitychange',function(){hidden=document.hidden;});
  function frame(ts){
    requestAnimationFrame(frame);
    var dt=Math.min(.05,(ts-last)/1000||.016); last=ts;
    if(hidden) return;

    /* программная тряска (кнопка) */
    if(shakeT>=0){
      shakeT+=dt; var dur=.7, k=1-shakeT/dur;
      if(k<=0){ shakeT=-1; wx=shakeBase; }
      else wx=shakeBase+Math.sin(shakeT*44)*15*k;
    }
    winVx=(wx-prevWx)/dt; prevWx=wx;
    if(Math.abs(winVx)>950) scatter(winVx);

    /* снежинки падают на шапку и копятся */
    acc+=dt*26; while(acc>1){acc-=1; if(pileTotal()<cols*5.4+120) spawnFlake();}
    for(var i=flakes.length-1;i>=0;i--){
      var f=flakes[i]; f.ph+=dt; f.y+=f.v*dt; f.x+=f.dr*dt+Math.sin(f.ph)*8*dt;
      var c=Math.floor(f.x/COL);
      if(c<0||c>=cols){flakes.splice(i,1);continue;}
      if(f.y>=wy-pile[c]){
        pile[c]=Math.min(30,pile[c]+f.r*0.9);
        flakes.splice(i,1);
      }
    }
    /* разлетевшийся снег */
    for(var j=flying.length-1;j>=0;j--){
      var p=flying[j]; p.life-=dt; p.vy+=1400*dt; p.x+=p.vx*dt; p.y+=p.vy*dt;
      if(p.life<=0||p.y>SH+24) flying.splice(j,1);
    }
    clampPos();

    /* рендер */
    ctx.clearRect(0,0,SW,SH);
    win.style.transform='translate('+wx+'px,'+wy+'px)';
    if(cols){
      ctx.beginPath(); ctx.moveTo(wx-2,wy);
      for(var c2=0;c2<cols;c2++){
        var x=wx+c2*COL+COL/2, y=wy-pile[c2];
        if(c2===0) ctx.lineTo(wx,y);
        ctx.quadraticCurveTo(x-COL/2,y,x+COL/2,y);
      }
      ctx.lineTo(wx+WW,wy); ctx.closePath();
      ctx.fillStyle='rgba(248,250,252,.94)'; ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,.9)'; ctx.lineWidth=1; ctx.stroke();
    }
    ctx.fillStyle='#F8FAFC';
    for(var i2=0;i2<flakes.length;i2++){
      var f2=flakes[i2];
      ctx.globalAlpha=.9; ctx.beginPath(); ctx.arc(wx+f2.x,wy+f2.y,f2.r,0,6.2832); ctx.fill();
    }
    for(var j2=0;j2<flying.length;j2++){
      var p2=flying[j2];
      ctx.globalAlpha=Math.max(0,Math.min(1,p2.life));
      ctx.beginPath(); ctx.arc(p2.x,p2.y,p2.r,0,6.2832); ctx.fill();
    }
    ctx.globalAlpha=1;
  }

  window.addEventListener('resize',function(){
    var oldSW=SW||1; resize(); wx=wx*(SW/oldSW); prevWx=wx;
  });
  resize(); requestAnimationFrame(frame);
})();

/* ═══════════ Reveal при скролле ═══════════ */
(function(){
  if(RM || !('IntersectionObserver' in window)){
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
