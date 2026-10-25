(function(){
  var root=document.documentElement;
  // theme toggle
  var dark=matchMedia('(prefers-color-scheme: dark)').matches;
  document.getElementById('theme').addEventListener('click',function(){
    dark=!dark; root.setAttribute('data-theme',dark?'dark':'light');
  });
  // reading progress + back to top
  var bar=document.getElementById('bar'),top=document.getElementById('top');
  function onScroll(){
    var h=root.scrollHeight-innerHeight;
    bar.style.width=(h>0?scrollY/h*100:0)+'%';
    top.classList.toggle('show',scrollY>700);
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  top.addEventListener('click',function(){scrollTo({top:0,behavior:'smooth'})});
  // highlight current section in nav
  var links=[].slice.call(document.querySelectorAll('nav a'));
  var secs=links.map(function(a){return document.querySelector(a.getAttribute('href'))});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){
        if(e.isIntersecting){links.forEach(function(a){
          a.setAttribute('aria-current',a.getAttribute('href')==='#'+e.target.id?'true':'false')});}
      });
    },{rootMargin:'-35% 0px -60% 0px'});
    secs.forEach(function(s){if(s)io.observe(s)});
  }
  // lightbox
  var dlg=document.getElementById('lightbox'),lbi=document.getElementById('lb-img'),lbc=document.getElementById('lb-cap');
  document.querySelectorAll('.zoom').forEach(function(b){
    b.addEventListener('click',function(){
      lbi.src=b.dataset.src;lbi.alt=b.querySelector('img').alt;lbc.textContent=b.dataset.cap;
      if(dlg.showModal)dlg.showModal();
    });
  });
  document.getElementById('lb-close').addEventListener('click',function(){dlg.close()});
  dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close()});
  // checklist progress
  var boxes=[].slice.call(document.querySelectorAll('.guide input')),m=document.getElementById('meter');
  function upd(){
    var n=boxes.filter(function(b){return b.checked}).length;
    document.getElementById('meter-fill').style.width=(n/boxes.length*100)+'%';
    document.getElementById('meter-text').textContent=n===boxes.length?'All 7 steps done. You are ready to visit.':'Tick each step as you prepare: '+n+' of '+boxes.length+' done';
    m.classList.toggle('done',n===boxes.length);
  }
  boxes.forEach(function(b){b.addEventListener('change',upd)});
})();
