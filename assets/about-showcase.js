/* Nash Portfolio | About Me: scoped, accessible visual enhancement. */
(function initNashAboutShowcase(){
  "use strict";
  if(document.body.dataset.page!=="home")return;
  const about=document.getElementById("about");
  const grid=about?.querySelector(".about-grid");
  const title=about?.querySelector("#about-title");
  const actions=about?.querySelector(".about-actions");
  const cards=grid?[...grid.querySelectorAll(".about-tile")]:[];
  if(!about||!title||!actions||cards.length!==3||about.dataset.showcaseReady)return;
  about.dataset.showcaseReady="true";
  about.classList.add("about-showcase");
  about.setAttribute("aria-label","A little more about Nash");

  const head=document.createElement("div");
  head.className="about-showcase-head";
  const kicker=document.createElement("div");
  kicker.className="about-showcase-kicker";
  kicker.innerHTML='<span class="about-kicker-led" aria-hidden="true"></span><span>BEHIND THE PORTFOLIO</span><span class="about-kicker-index">/ 02</span>';
  title.className="about-showcase-title";
  title.innerHTML='The person<br>behind <em>the pixels.</em>';
  const intro=document.createElement("p");
  intro.className="about-showcase-description";
  intro.textContent="Three little things about me — where my story began, where I am now, and what keeps me exploring.";
  head.append(kicker,title,intro);
  grid.before(head);

  cards[0].innerHTML=`
    <div class="about-card-header"><span class="tile-label">01 / ORIGINS</span><span class="about-card-glyph" aria-hidden="true">✳</span></div>
    <div class="about-card-main about-origin-main">
      <div class="about-date-art" aria-hidden="true"><span class="about-date-month">JAN</span><strong>20</strong><span class="about-date-year">2008</span></div>
      <p class="about-card-line">I was born on <strong>January 20, 2008.</strong></p>
    </div>
    <div class="about-card-footer"><span>WHERE IT ALL BEGAN</span><span class="about-card-rule" aria-hidden="true"></span><span>01</span></div>`;
  cards[1].innerHTML=`
    <div class="about-card-header"><span class="tile-label">02 / THE PRESENT</span><span class="about-card-glyph about-card-glyph--tiny" aria-hidden="true">✦</span></div>
    <div class="about-card-main about-age-main">
      <div class="about-age-art"><span class="about-age-mini">CURRENT CHAPTER</span><strong aria-label="18">18<span class="about-age-spark" aria-hidden="true">✳</span></strong><span class="about-age-unit">YEARS OLD</span></div>
      <p class="about-card-line">I am <strong>18 years old.</strong> Still learning. Always creating.</p>
    </div>
    <div class="about-card-footer"><span>GROWING & DISCOVERING</span><span class="about-card-rule" aria-hidden="true"></span><span>02</span></div>`;
  cards[2].innerHTML=`
    <div class="about-card-header"><span class="tile-label">03 / CURIOSITY</span><span class="about-card-glyph" aria-hidden="true">✧</span></div>
    <div class="about-card-main about-curiosity-main">
      <div class="about-curiosity-orbit" aria-hidden="true"><span class="about-orbit-track about-orbit-track--a"></span><span class="about-orbit-track about-orbit-track--b"></span><span class="about-orbit-center">♟</span><span class="about-orbit-star">✦</span></div>
      <h3 class="about-curiosity-title">Stay <em>curious.</em></h3>
      <p class="about-card-line">Curiosity is my favorite starting point.</p>
    </div>
    <div class="about-card-footer"><span>IDEAS BEGIN WITH A QUESTION</span><span class="about-card-rule" aria-hidden="true"></span><span>03</span></div>`;
  cards.forEach((card,i)=>{
    card.classList.add("about-showcase-card");
    card.dataset.card=String(i+1).padStart(2,"0");
  });

  const journey=document.createElement("div");
  journey.className="about-journey";
  journey.innerHTML='<span class="about-journey-line" aria-hidden="true"></span><span>KEEP EXPLORING</span><span class="about-journey-line" aria-hidden="true"></span>';
  actions.before(journey);
  actions.classList.add("about-showcase-actions");
  actions.querySelectorAll("a").forEach((link,i)=>{
    const label=link.textContent.trim();
    const arrow=link.querySelector("svg");
    const arrowMarkup=arrow?arrow.outerHTML:"↗";
    link.replaceChildren();
    const number=document.createElement("span");
    number.className="about-link-number";
    number.textContent=String(i+1).padStart(2,"0");
    const name=document.createElement("span");
    name.className="about-link-name";
    name.textContent=label;
    const circle=document.createElement("span");
    circle.className="about-link-arrow";
    circle.setAttribute("aria-hidden","true");
    circle.innerHTML=arrowMarkup;
    link.append(number,name,circle);
  });

  const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer=window.matchMedia("(pointer: fine)");
  if(!reduceMotion.matches && finePointer.matches){
    cards.forEach(card=>{
      let queued=false, posX=50,posY=50;
      card.addEventListener("pointermove",event=>{
        const box=card.getBoundingClientRect();
        posX=((event.clientX-box.left)/box.width)*100;
        posY=((event.clientY-box.top)/box.height)*100;
        if(queued)return;
        queued=true;
        requestAnimationFrame(()=>{
          card.style.setProperty("--about-pointer-x",Math.max(0,Math.min(100,posX)).toFixed(1)+"%");
          card.style.setProperty("--about-pointer-y",Math.max(0,Math.min(100,posY)).toFixed(1)+"%");
          queued=false;
        });
      },{passive:true});
      card.addEventListener("pointerleave",()=>{
        card.style.removeProperty("--about-pointer-x");
        card.style.removeProperty("--about-pointer-y");
      });
    });
  }
  if(!reduceMotion.matches && "IntersectionObserver" in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add("about-in-view");
          observer.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:"0px 0px -25px 0px"});
    [head,...cards,journey,actions].forEach((element,i)=>{
      element.style.setProperty("--about-reveal-delay",Math.min(i*65,310)+"ms");
      observer.observe(element);
    });
    window.addEventListener("pagehide",()=>observer.disconnect(),{once:true});
  }
})();
