/* Nash Portfolio — Figma-inspired responsive implementation. */
const page = document.body.dataset.page || 'home';
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const reducedMotion = motionPreference.matches;

const icons = {
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10Z"/><path d="m1.5 11 10.5-8 10.5 8"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5.5C9 3.5 6.2 3.3 2.5 4.5v15c3.7-1.2 6.5-1 9.5 1 3-2 5.8-2.2 9.5-1v-15c-3.7-1.2-6.5-1-9.5 1Z"/><path d="M12 5.5v15M6 8l3 .5M6 12l3 .5M15 8.5l3-.5M15 12.5l3-.5"/></svg>`,
  profile: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 21v-2a7.5 7.5 0 0 1 15 0v2M8 21h8"/></svg>`,
  reflect: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2ZM9 3v18M3 7h4M3 11h4M3 15h4"/><path d="m14.5 8 .8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2ZM12 17h5"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8.5" r="5.5"/><path d="m8.5 13-1.7 8 5.2-3 5.2 3-1.7-8M12 5.5l.9 1.8 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3.9-1.8Z"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 5 14 14M19 5 5 19" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`
};

// A restored derivative of the original blue-violet butterfly. Its tiny source
// is retained separately; reconstructed detail is not a verified Figma export.
const butterfly = (small = false, interactive = false) => {
  const image = `<img class="butterfly-logo" src="assets/butterfly-enhanced.webp" alt="" draggable="false" width="132" height="138" />`;
  return interactive
    ? `<button class="butterfly butterfly--interactive" type="button" aria-label="Animate butterfly" title="Give the butterfly a little flutter">${image}</button>`
    : `<span class="butterfly${small ? ' butterfly--mini' : ''}" aria-hidden="true">${image}</span>`;
};


function nav(active) {
  const current = active;
  const links = [
    ['profile', 'About me', 'Return to the homepage', 'index.html', icons.profile, 'introduction'],
    ['reflections', 'Reflections', 'Term reflections', 'reflections.html', icons.reflect, 'reflections'],
    ['achievements', 'Achievements', 'Achievements and activities', 'achievements.html', icons.award, ''],
    ['academics', 'Academics', 'Academic compilation', 'academics.html', icons.book, 'schoolworks']
  ];
  return `<header class="navbar"><a class="brand" href="index.html" aria-label="Nash portfolio home"><span class="brand-butterfly" aria-hidden="true"><img class="brand-butterfly-fallback" src="assets/butterfly-enhanced.webp" alt="" width="132" height="138" decoding="async" /></span><span class="brand-text"><span class="brand-name"><strong class="brand-first">Nash</strong><span class="brand-last">Tolin.</span></span><span class="brand-caption">CREATIVE PORTFOLIO</span></span></a><nav class="navlinks" aria-label="Main navigation">${links.map(([name,text,label,href,icon,section])=>`<a class="navlink ${name === current ? 'is-active' : ''}" data-nav="${name}" data-section="${section}" href="${href}" title="${label}"${name === current ? ` aria-current="${name === 'academics' || name === 'achievements' || name === 'reflections' ? 'page' : 'location'}"` : ''}>${icon}<span class="navlink-label">${text}</span></a>`).join('')}</nav></header>`;
}

function footer() { return `<footer class="footer"><span>NASH · CREATIVE PORTFOLIO</span><span>Made with curiosity <span aria-hidden="true">✳</span></span></footer>`; }
function intro() {
  return `<div class="intro-sequence" id="introSequence" aria-hidden="true"><div class="welcome-nebula"></div>${welcomeParticles()}<div class="intro-loader"><p class="loading-welcome">WELCOME</p><span class="loading-caption">NASH / CREATIVE PORTFOLIO</span></div></div>`;
}

function jellyfishBackground(isHero = false) {
  // Preserve the complete uploaded 1280x720 stream: never downscale on mobile.
  if (isHero) {
    return `<div class="jelly-bg" aria-hidden="true" style="background-image:url('assets/jellyfish-hero-hq-poster.webp?v=2.7.0')"><video class="jelly-video jelly-video--hq" data-hq-video="true" autoplay muted loop playsinline preload="none" poster="assets/jellyfish-hero-hq-poster.webp?v=2.7.0" disablepictureinpicture tabindex="-1"></video></div>`;
  }
  // Reflections retains its independent, previously approved footage.
  const poster = 'assets/jellyfish-poster.webp?v=2.3.0';
  const mobile = 'assets/jellyfish-mobile.mp4?v=2.3.0';
  const desktop = 'assets/jellyfish-loop.mp4?v=2.3.0';
  return `<div class="jelly-bg" aria-hidden="true"><video class="jelly-video" autoplay muted loop playsinline preload="metadata" poster="${poster}" disablepictureinpicture tabindex="-1"><source data-src="${mobile}" media="(max-width: 960px)" type="video/mp4" /><source data-src="${desktop}" type="video/mp4" /></video></div>`;
}

function welcomeParticles() {
  // A fixed, irregular field avoids layout shifts and changes only transforms.
  const particles = Array.from({length:24}, (_, i) => {
    const x = 4 + ((i * 37 + 7) % 92);
    const y = 5 + ((i * 53 + 13) % 88);
    return `<span class="welcome-particle" style="--x:${x}%;--y:${y}%;--size:${i % 5 === 0 ? 3 : 1.5}px;--duration:${10 + i % 9}s;--delay:-${i * 1.7}s;--drift:${i % 2 ? -28 : 30}px"></span>`;
  }).join('');
  return `<div class="welcome-particles" aria-hidden="true">${particles}</div>`;
}

function idPortrait() {
  const photos = [
    ['assets/photo-03.webp','Nash holding a camera'],
    ['assets/photo-01.webp','Nash holding two drinks'],
    ['assets/photo-02.webp','Nash in a green blazer with glasses']
  ];
  return '<button class="id-portrait" id="idPortrait" type="button" aria-label="View photo: Nash holding two drinks" aria-haspopup="dialog" title="Click to view this photo">'
    + photos.map(([src,alt],i)=>'<img class="id-portrait-image'+(i===1?' is-current':'')+'" src="'+src+'" alt="'+alt+'" aria-hidden="'+(i!==1)+'" draggable="false"/>').join('')
    + '</button>';
}

function home() {
  return `${intro()}<div class="site-shell home-shell" id="siteShell"><main><div class="portfolio-content">${jellyfishBackground(true)}${nav('profile')}<section class="hero" id="introduction" aria-labelledby="hero-title"><div class="hero-content"><div class="lanyard">
  <div class="lanyard-strap" aria-hidden="true"><span class="lanyard-strap-side lanyard-strap-side--left"><span>JOSÉ RIZAL UNIVERSITY</span></span><span class="lanyard-strap-side lanyard-strap-side--right"><span>JOSÉ RIZAL UNIVERSITY</span></span><span class="lanyard-buckle"></span><span class="lanyard-clip"><span class="lanyard-clip-logo">JRU</span></span></div>
  <span class="lanyard-ring" aria-hidden="true"></span>
  <div class="id-panel" role="group" aria-label="Nash's stylized university ID">
    <span class="id-slot" aria-hidden="true"></span>
    <div class="id-paper">
      <span class="id-paper-watermark" aria-hidden="true">JRU</span>
      <div class="id-school-heading"><strong>JOSÉ RIZAL UNIVERSITY</strong><span>80 Shaw Boulevard, Mandaluyong City</span></div>
      <div class="id-gallery">${idPortrait()}</div>
      <div class="id-student-details"><strong>NASH ALTHEA G. TOLIN</strong><span>BS INFORMATION TECHNOLOGY</span><span>COLLEGE</span></div>
      <span class="id-gold-divider" aria-hidden="true"></span><div class="id-barcode" aria-hidden="true"></div>
    </div>
  </div>
  <span class="lanyard-instruction" aria-hidden="true">↓ DRAG TO INTERACT</span>
</div><div class="introduction-panel"><span class="hero-kicker">A LITTLE ABOUT ME</span><h1 class="hero-intro-title" id="hero-title">Hi, I’m <em>Nash.</em></h1><p>Welcome to my portfolio! My name is <strong>Nash Althea G. Tolin</strong>, a former STEM student from SSCAl, now pursuing my BSIT degree at Jose Rizal University. As an aspiring UI/UX designer who loves all things creative, I put this together to feature my progress and projects in Computer Programming 1.</p></div></div></section><section class="about" id="about" aria-labelledby="about-title"><div class="about-accent about-accent-one"></div><div class="about-accent about-accent-two"></div><h2 class="sr-only" id="about-title">Personal details</h2><div class="about-grid"><article class="about-tile about-tile-date"><span class="tile-label">01 / ORIGINS</span><h3>I was born on<br/><strong>January 20, 2008.</strong></h3><span class="tile-decoration">✳</span></article><article class="about-tile about-tile-age"><span class="tile-label">02 / NOW</span><h3>I am <em>18</em><br/>years old</h3><span class="age-outline">18</span></article><article class="about-tile about-tile-creative"><span class="tile-label">03 / CURIOSITY</span><div class="creative-emoji" aria-hidden="true">♟</div><p>Curiosity is my favorite starting point.</p></article></div><div class="about-actions"><a href="academics.html">Schoolworks ${icons.arrow}</a><a href="achievements.html">Achievements ${icons.arrow}</a><a href="reflections.html">Reflections ${icons.arrow}</a></div></section></div></main></div>`;
}
function githubIcon() { return `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.52.1.72-.23.72-.51v-1.77c-2.93.64-3.54-1.24-3.54-1.24-.48-1.23-1.17-1.56-1.17-1.56-.96-.65.07-.64.07-.64 1.06.07 1.62 1.09 1.62 1.09.94 1.61 2.47 1.15 3.07.88.09-.68.36-1.15.66-1.41-2.34-.26-4.8-1.17-4.8-5.19 0-1.15.41-2.1 1.09-2.83-.11-.27-.47-1.34.1-2.79 0 0 .89-.29 2.89 1.08A10.1 10.1 0 0 1 12 6.59c.89 0 1.79.12 2.62.35 2.01-1.37 2.9-1.08 2.9-1.08.56 1.45.2 2.52.09 2.79.68.73 1.09 1.68 1.09 2.83 0 4.03-2.47 4.92-4.82 5.18.37.32.7.93.7 1.87v2.93c0 .29.19.62.73.51A10.5 10.5 0 0 0 12 1.5Z"/></svg>`; }

const prelim = `Our Computer Programming 1 journey started with the fundamentals, introducing us to the core concepts of programming and how to map out logic using flowcharts. At first, I learned the absolute basics, but I struggled quite a bit with problem analysis, especially when it came to identifying the actual problem and figuring out how to solve it logically within my head. Managing my time while trying to puzzle out problem-solving strategies was genuinely challenging. To be honest, I didn't enjoy it very much in the beginning, but looking back, I am so glad I got the chance to learn it. I really don't want to waste the valuable knowledge and foundation that was given to me during this term.`;
const midterm = `Things took an exciting turn during the midterms when Java was introduced to us. Surprisingly, I fell in love with it! Even though it was difficult at first, I genuinely enjoyed learning how to write actual code, and I found myself liking Java much more than flowcharts. It was amazing to dive into the history of programming and discover the basic syntax and structure of coding. Seeing lines of code come together and actually execute made all the challenges worth it.`;
const finalterm = `In the finals, we tackled machine problems, which gave me a taste of truly challenging coding tasks. Surprisingly, I loved it because it never bored me—in fact, it became kind of addictive to keep solving puzzles and fixing errors, even when the hours got long. I still struggled a bit with time management given the heavy workload and tight deadlines, but the satisfaction of cracking a problem kept me going and made me want to code even more.`;

function missingAsset(label, index, variant='') {
  const number = String(index).padStart(2, '0');
  const type = page === 'achievements' ? 'ACHIEVEMENTS' : 'SCHOOLWORKS';
  return `<article class="play-project ${variant ? 'play-project--' + variant : ''}"><div class="play-project-visual" role="img" aria-label="${label}: original visual has not been provided"><span class="play-visual-rings" aria-hidden="true"></span><span class="play-visual-number" aria-hidden="true">${number}</span><span class="play-visual-symbol" aria-hidden="true">✳</span><span class="play-visual-stamp">${type} / ${number}</span><span class="play-visual-status">Original visual<br>pending</span></div><div class="play-project-caption"><h3>${label}</h3><span>${number} / ${type}</span></div></article>`;
}

function academics() {
  return `<div class="site-shell play-site">${nav('academics')}<main class="play-page" id="schoolworks"><section class="play-masthead" aria-labelledby="academics-title"><div class="play-masthead-top"><span class="play-kicker">001 / Computer Programming 1</span><p class="play-masthead-summary">Exploring how ideas become logic, flowcharts, and working Java programs.</p></div><h1 class="play-heading" id="academics-title"><span class="play-line"><span class="play-line-inner">Made while</span></span><span class="play-line"><span class="play-line-inner">learning.</span></span></h1><div class="play-masthead-bottom"><p>From the first programming concepts to practical problem-solving — a collection of work made along the way.</p><span class="play-scroll-cue">Scroll to explore ${icons.arrow}</span></div></section><section class="play-gallery" aria-label="Schoolworks gallery">${missingAsset('Programming fundamentals',1,'tall')}${missingAsset('First flowchart',2)}${missingAsset('Problem-solving exercise',3)}${missingAsset('Java code — activity',4,'wide')}${missingAsset('Java code — activity',5)}${missingAsset('Machine problem',6)}${missingAsset('Programming output',7,'wide')}</section><div class="play-note"><p>Schoolwork visuals are clearly marked as pending until the original screenshots are supplied.</p></div></main>${footer()}</div>`;
}
function reflections() {
  return `<div class="site-shell reflections-shell">${nav('reflections')}<main><section class="reflections" id="reflections" aria-labelledby="reflections-title">${jellyfishBackground(true)}<div class="reflections-content"><div class="section-heading"><span class="eyebrow">002 — THE LEARNING PROCESS</span><h2 id="reflections-title">Term reflections<span>.</span></h2></div><div class="reflection-grid"><article class="reflection-card"><h3>Prelim Term<br/>Reflection</h3><div class="reflection-glass"><p>${prelim}</p><span class="reflection-doodle">✦</span></div></article><article class="reflection-card"><h3>Midterm Term<br/>Reflection</h3><div class="reflection-glass"><p>${midterm}</p><span class="reflection-doodle">✳</span></div></article><article class="reflection-card"><h3>Final Term<br/>Reflection</h3><div class="reflection-glass"><p>${finalterm}</p><span class="reflection-doodle">✦</span></div></article></div></div></section></main></div>`;
}
function achievements() {
  return `<div class="site-shell play-site">${nav('achievements')}<main class="play-page" id="achievements-content"><section class="play-masthead" aria-labelledby="achievements-title"><div class="play-masthead-top"><span class="play-kicker">002 / Beyond the classroom</span><p class="play-masthead-summary">Experiences, activities, certificates, and moments that make the journey.</p></div><h1 class="play-heading" id="achievements-title"><span class="play-line"><span class="play-line-inner">Moments that</span></span><span class="play-line"><span class="play-line-inner">matter.</span></span></h1><div class="play-masthead-bottom"><p>I've always loved staying active and building experience since Senior High School, and I continue joining school events and organizations in college.</p><span class="play-scroll-cue">Explore the collection ${icons.arrow}</span></div></section><section class="play-gallery" aria-label="Certificates and achievements gallery">${missingAsset('School document',1,'tall')}${missingAsset('Achievement certificate',2)}${missingAsset('Recognition certificate',3)}${missingAsset('Activity certificate',4)}${missingAsset('Event certificate',5)}</section><div class="play-note"><p>Original certificate images will be added when available.</p><button class="pdf-button" type="button" disabled title="The source PDF has not yet been provided">PDF <span>Awaiting original file</span></button></div></main>${footer()}</div>`;
}

function resolveLegacyWelcome() {
  if(page === 'home' && location.hash === '#welcome') {
    history.replaceState(history.state, '', location.pathname + location.search + '#introduction');
    return true;
  }
  return false;
}

function render() {
  // Preserve existing bookmarks to the former Academics reflections section.
  if(page === 'academics' && location.hash === '#reflections') {
    location.replace('reflections.html' + location.search);
    return;
  }
  // Preserve old external Welcome links after merging it into the loader.
  resolveLegacyWelcome();
  const app = document.getElementById('app');
  if(page==='academics') app.innerHTML=academics();
  else if(page==='achievements') app.innerHTML=achievements();
  else if(page==='reflections') app.innerHTML=reflections();
  else app.innerHTML=home();
  customPointer();
  setupButterflies();
  setupJellyfish();
  setupNavigation();
  setupPlayGallery();
  if(page==='home') {
    setupIntro(); setupPhotoRotation(); setupLanyard();
    window.addEventListener('hashchange',()=>{
      if(resolveLegacyWelcome()) {
        document.getElementById('introduction').scrollIntoView({behavior:motionPreference.matches?'instant':'smooth',block:'start'});
      }
    });
  }
  // Native hash links handle subsequent navigation. Resolve initial anchors
  // after the dynamically rendered sections exist, without replaying a loader.
  if(location.hash) requestAnimationFrame(()=>{
    const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    target?.scrollIntoView({behavior:'instant',block:'start'});
  });
}

function setupPlayGallery() {
  const projects = Array.from(document.querySelectorAll('.play-page .play-project'));
  if (!projects.length || reducedMotion || !('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px 70px 0px', threshold: 0.07 });
  for (const project of projects) {
    project.classList.add('is-to-reveal');
    observer.observe(project);
  }
  window.addEventListener('pagehide', () => observer.disconnect(), { once: true });
}

function setupNavigation() {
  const links = [...document.querySelectorAll('.navlink')];
  const sections = page === 'home'
    ? [['introduction','profile'], ['about','profile']]
    : [];
  if(!sections.length) return;
  let current = '';
  let queued = false;
  const update = () => {
    queued = false;
    const offset = document.querySelector('.navbar').getBoundingClientRect().height + 80;
    let active = page === 'home' ? 'profile' : 'academics';
    sections.forEach(([id,name])=>{
      if(document.getElementById(id).getBoundingClientRect().top <= offset) active = name;
    });
    if(current === active) return;
    current = active;
    links.forEach(link=>{
      const selected = link.dataset.nav === active;
      link.classList.toggle('is-active', selected);
      if(selected) link.setAttribute('aria-current', active === 'profile' ? 'page' : 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const queueUpdate = () => {
    if(!queued) { queued = true; requestAnimationFrame(update); }
  };
  window.addEventListener('scroll', queueUpdate, {passive:true});
  window.addEventListener('resize', queueUpdate);
  window.addEventListener('hashchange', queueUpdate);
  queueUpdate();
}

function setupIntro() {
  const overlay = document.getElementById('introSequence');
  const historyNavigation = performance.getEntriesByType('navigation')[0]?.type === 'back_forward';
  if(location.hash || location.search.includes('welcome') || reducedMotion || historyNavigation) {
    overlay.remove();
    return;
  }
  const dismiss = () => overlay.remove();
  // Decorative only: pointer events and scrolling are never gated by it.
  window.setTimeout(()=>{
    overlay.classList.add('intro-hidden');
    window.setTimeout(dismiss, 350);
  }, 1500);
  window.addEventListener('scroll', dismiss, {once:true, passive:true});
  window.addEventListener('keydown', dismiss, {once:true});
  window.addEventListener('hashchange', dismiss, {once:true});
  window.addEventListener('pageshow', event => { if(event.persisted) dismiss(); });
  motionPreference.addEventListener('change', event => { if(event.matches) dismiss(); });
}


// The hanging ID moves like a physical lanyard. Keep the quote bubble still,
// while the strap, ring and card swing together around the top attachment.
function setupLanyard() {
  const lanyard = document.querySelector('.lanyard');
  if (!lanyard) return;
  const strap = lanyard.querySelector('.lanyard-strap');
  const ring = lanyard.querySelector('.lanyard-ring');
  const panel = lanyard.querySelector('.id-panel');
  if (!strap || !ring || !panel) return;

  // Keep the original strap, ring, and card as a single hinged unit.
  const swing = document.createElement('div');
  swing.className = 'lanyard-swing';
  lanyard.insertBefore(swing, strap);
  [strap, ring, panel].forEach(part => swing.appendChild(part));

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  let angle = 0;
  let velocity = 0;
  let frame = 0;
  let grab = null;

  function draw() {
    swing.style.setProperty('--id-angle', angle.toFixed(2) + 'deg');
  }

  function settle() {
    frame = 0;
    if (grab) return;
    if (motionPreference.matches) {
      angle = velocity = 0;
      swing.style.removeProperty('--id-angle');
      swing.classList.remove('is-interacting');
      return;
    }
    // Only animate the physical return after release; never animate on hover.
    velocity = (velocity - angle * .055) * .82;
    angle += velocity;
    draw();
    if (Math.abs(angle) > .08 || Math.abs(velocity) > .05) {
      frame = requestAnimationFrame(settle);
    } else {
      angle = velocity = 0;
      swing.style.removeProperty('--id-angle');
      swing.classList.remove('is-interacting');
    }
  }

  function beginSettle() {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(settle);
  }

  swing.addEventListener('pointerdown', event => {
    // Buttons in the ID's rotating photo area keep their original behavior.
    if (event.target.closest('button, a')) return;
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (grab) return;

    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    const bounds = panel.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    grab = {
      id: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      previousX: event.clientX,
      startAngle: angle,
      clickDirection: event.clientX >= centerX ? -1 : 1,
      moved: false
    };
    velocity = 0;
    swing.classList.add('is-interacting', 'is-grabbed');
    swing.setPointerCapture(event.pointerId);
    event.preventDefault();
  });

  swing.addEventListener('pointermove', event => {
    // Pointer movement alone is intentionally ignored.
    if (!grab || event.pointerId !== grab.id) return;
    const dx = event.clientX - grab.startX;
    if (Math.abs(dx) > 3) grab.moved = true;
    if (!grab.moved) return;
    grab.previousX = grab.lastX;
    grab.lastX = event.clientX;

    // CSS positive rotation moves the bottom LEFT around an upper pivot.
    // Negating the horizontal drag makes the ID's bottom follow the cursor:
    // drag RIGHT -> card swings RIGHT; drag LEFT -> card swings LEFT.
    angle = clamp(grab.startAngle - dx * .12, -19, 19);
    velocity = 0;
    draw();
  });

  function release(event) {
    if (!grab || event.pointerId !== grab.id) return;
    const ending = grab;
    grab = null;
    if (swing.hasPointerCapture(event.pointerId)) {
      swing.releasePointerCapture(event.pointerId);
    }
    swing.classList.remove('is-grabbed');

    if (!ending.moved) {
      // A click or tap alone gives a short swing, even without a drag.
      angle = ending.clickDirection * 2.8;
      velocity = ending.clickDirection * 1.65;
      draw();
    } else {
      // Momentum keeps the SAME horizontal direction as the release gesture.
      velocity = clamp(-(ending.lastX - ending.previousX) * .09, -2.4, 2.4);
    }

    if (motionPreference.matches) {
      angle = velocity = 0;
      swing.style.removeProperty('--id-angle');
      swing.classList.remove('is-interacting');
      return;
    }
    beginSettle();
  }

  // A canceled touch (for example, a normal page scroll) must not swing the card.
  function cancelGrab(event) {
    if (!grab || event.pointerId !== grab.id) return;
    grab = null;
    velocity = angle = 0;
    swing.classList.remove('is-grabbed', 'is-interacting');
    swing.style.removeProperty('--id-angle');
  }
  swing.addEventListener('pointerup', release);
  swing.addEventListener('pointercancel', cancelGrab);
  swing.addEventListener('lostpointercapture', cancelGrab);
  motionPreference.addEventListener('change', event => {
    if (!event.matches) return;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    grab = null;
    velocity = angle = 0;
    swing.classList.remove('is-interacting', 'is-grabbed');
    swing.style.removeProperty('--id-angle');
  });
}

function setupPhotoRotation() {
  const portrait = document.getElementById('idPortrait');
  if (!portrait) return;

  const photos = [...portrait.querySelectorAll('.id-portrait-image')];
  if (photos.length !== 3) return;

  const INTERVAL_MS = 5000;
  let active = 1;
  let hovering = false;
  let focused = false;
  let viewerOpen = false;
  let timer = 0;
  let modal = null;
  let lastFocused = null;

  function show(index) {
    active = (index + photos.length) % photos.length;
    photos.forEach((img, i) => {
      const current = i === active;
      img.classList.toggle('is-current', current);
      img.setAttribute('aria-hidden', String(!current));
    });
    portrait.setAttribute('aria-label', 'View photo: ' + photos[active].alt);
    portrait.title = 'Click to view: ' + photos[active].alt;
    if (modal) updateViewer();
  }

  function restart() {
    clearTimeout(timer);
    timer = 0;
    if (hovering || focused || viewerOpen || document.hidden) return;
    timer = window.setTimeout(() => {
      show(active + 1);
      restart();
    }, INTERVAL_MS);
  }

  // Only a pointer OVER THE PHOTO freezes the current frame.
  // Hovering the ID strap, card text, or outside area does not pause it.
  portrait.addEventListener('pointerenter', e => {
    if (e.pointerType === 'mouse' || e.pointerType === 'pen') {
      hovering = true;
      restart();
    }
  });
  portrait.addEventListener('pointerleave', () => {
    hovering = false;
    restart();
  });
  portrait.addEventListener('focus', () => {
    // Only keyboard focus pauses cycling. Mouse click focus should not freeze it.
    focused = portrait.matches(':focus-visible');
    restart();
  });
  portrait.addEventListener('blur', () => {
    focused = false;
    restart();
  });

  function updateViewer() {
    if (!modal) return;
    const photo = photos[active];
    const img = modal.querySelector('.id-photo-viewer-image');
    img.src = photo.getAttribute('src');
    img.alt = photo.alt;
    modal.querySelector('.id-photo-viewer-caption').textContent = photo.alt;
    modal.querySelector('.id-photo-viewer-count').textContent =
      String(active + 1).padStart(2, '0') + ' / ' + String(photos.length).padStart(2, '0');
  }

  function viewerKeydown(event) {
    if (!modal) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeViewer();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(active + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(active - 1);
    } else if (event.key === 'Tab') {
      const buttons = [...modal.querySelectorAll('button:not([disabled])')];
      if (!buttons.length) return;
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function closeViewer() {
    if (!modal) return;
    modal.remove();
    modal = null;
    viewerOpen = false;
    document.body.classList.remove('id-photo-viewer-open');
    document.removeEventListener('keydown', viewerKeydown);
    restart();
    (lastFocused || portrait).focus({ preventScroll: true });
    lastFocused = null;
  }

  function openViewer() {
    if (modal) return;
    lastFocused = document.activeElement;
    viewerOpen = true;
    restart();
    modal = document.createElement('div');
    modal.className = 'id-photo-viewer';
    modal.innerHTML = `<section class="id-photo-viewer-dialog" role="dialog" aria-modal="true"
        aria-label="Nash photo viewer">
      <div class="id-photo-viewer-toolbar">
        <span class="id-photo-viewer-title">NASH / PHOTO COLLECTION</span>
        <button class="id-photo-viewer-close" type="button" aria-label="Close photo viewer">✕</button>
      </div>
      <div class="id-photo-viewer-stage">
        <button type="button" class="id-photo-viewer-prev" aria-label="Previous photo">‹</button>
        <img class="id-photo-viewer-image" alt="" draggable="false" />
        <button type="button" class="id-photo-viewer-next" aria-label="Next photo">›</button>
      </div>
      <div class="id-photo-viewer-footer">
        <span class="id-photo-viewer-caption"></span>
        <span class="id-photo-viewer-count"></span>
      </div>
    </section>`;
    document.body.appendChild(modal);
    document.body.classList.add('id-photo-viewer-open');
    // The original pointer remains visible as the modal takes focus above the page.
    document.querySelector('.showcase-pointer')?.classList.add('visible');
    modal.querySelector('.id-photo-viewer-close').addEventListener('click', closeViewer);
    modal.querySelector('.id-photo-viewer-prev').addEventListener('click', () => show(active - 1));
    modal.querySelector('.id-photo-viewer-next').addEventListener('click', () => show(active + 1));
    modal.addEventListener('click', event => {
      if (event.target === modal) closeViewer();
    });
    document.addEventListener('keydown', viewerKeydown);
    updateViewer();
    modal.querySelector('.id-photo-viewer-close').focus({ preventScroll: true });
  }

  portrait.addEventListener('click', openViewer);
  document.addEventListener('visibilitychange', restart);
  window.addEventListener('pagehide', () => {
    clearTimeout(timer);
    document.removeEventListener('keydown', viewerKeydown);
  }, { once: true });

  show(active);
  restart();
}

function setupJellyfish() {
  const videos = [...document.querySelectorAll('.jelly-video')];
  const visible = new Set();
  const hqLoads = new WeakMap();
  // Parts are split for repository-upload compatibility, not compressed.
  // Their bytes reconstruct exactly the original 1280x720 H.264 video stream.
  const highQualityParts = [
    'assets/jellyfish-hero-hq-01.bin?v=2.7.0',
    'assets/jellyfish-hero-hq-02.bin?v=2.7.0',
    'assets/jellyfish-hero-hq-03.bin?v=2.7.0',
    'assets/jellyfish-hero-hq-04.bin?v=2.7.0',
    'assets/jellyfish-hero-hq-05.bin?v=2.7.0',
    'assets/jellyfish-hero-hq-06.bin?v=2.7.0',
    'assets/jellyfish-hero-hq-07.bin?v=2.7.0'
  ];
  const sync = video => {
    if (motionPreference.matches || document.hidden || !visible.has(video)) {
      video.pause();
      return;
    }
    if (video.dataset.hqVideo === 'true') {
      if (video.getAttribute('src')) {
        video.play().catch(() => {});
        return;
      }
      if (!hqLoads.has(video)) {
        // Retry temporary CDN/network errors before using the lower-resolution fallback.
        // 'reload' on retry bypasses a potentially stale cached error response.
        const loadPart = async path => {
          let error;
          for (let attempt = 0; attempt < 3; attempt++) {
            try {
              const response = await fetch(path, {cache: attempt ? 'reload' : 'force-cache'});
              if (!response.ok) throw new Error('Video asset unavailable: ' + response.status);
              return await response.arrayBuffer();
            } catch (cause) {
              error = cause;
              if (attempt < 2) {
                await new Promise(resolve => setTimeout(resolve, (attempt + 1) * 300));
              }
            }
          }
          throw error;
        };
        const load = Promise.all(highQualityParts.map(loadPart)).then(buffers => {
          const url = URL.createObjectURL(new Blob(buffers, {type:'video/mp4'}));
          video.src = url;
          video.load();
          if (!motionPreference.matches && !document.hidden && visible.has(video)) {
            video.play().catch(() => {});
          }
        }).catch(() => {
          // Keep playback functional if a segment is unexpectedly unavailable.
          video.src = 'assets/jellyfish-hero-v2.mp4?v=2.6.0';
          video.load();
          if (!motionPreference.matches && !document.hidden && visible.has(video)) {
            video.play().catch(() => {});
          }
        });
        hqLoads.set(video, load);
      }
      return;
    }
    const sources = [...video.querySelectorAll('source')];
    if (sources.length && !sources[0].hasAttribute('src')) {
      sources.forEach(source => {source.src = source.dataset.src;});
      video.muted = true;
      video.load();
    }
    video.play().catch(() => {});
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({target,isIntersecting,intersectionRatio}) => {
      if (isIntersecting && intersectionRatio >= .01) visible.add(target);
      else visible.delete(target);
      sync(target);
    });
  }, {threshold:.01});
  videos.forEach(video => {
    video.muted = true;
    video.defaultMuted = true;
    observer.observe(video);
  });
  document.addEventListener('visibilitychange', () => videos.forEach(sync));
  motionPreference.addEventListener('change', () => videos.forEach(sync));
}

function setupButterflies(){
  document.querySelectorAll('.butterfly--interactive').forEach(el=>{
    const finePointer = window.matchMedia('(pointer: fine)');
    let flutterTimer;
    el.addEventListener('pointerenter',()=>{
      if(!motionPreference.matches && finePointer.matches) el.classList.add('butterfly-excited');
    });
    el.addEventListener('pointermove',(e)=>{
      if(motionPreference.matches || !finePointer.matches) return;
      const r=el.getBoundingClientRect();
      el.style.setProperty('--wing-x', `${((e.clientX-r.left)/r.width-.5)*22}px`);
      el.style.setProperty('--wing-y', `${((e.clientY-r.top)/r.height-.5)*16}px`);
    }, {passive:true});
    el.addEventListener('pointerleave',()=>{
      el.classList.remove('butterfly-excited');
      el.style.removeProperty('--wing-x'); el.style.removeProperty('--wing-y');
    });
    el.addEventListener('click',()=>{
      if(motionPreference.matches) return;
      clearTimeout(flutterTimer);
      el.classList.remove('butterfly-dart');
      // Restart the small CSS arc even when tapped repeatedly.
      void el.offsetWidth;
      el.classList.add('butterfly-dart');
      flutterTimer = setTimeout(()=>el.classList.remove('butterfly-dart'),850);
    });
    motionPreference.addEventListener('change',()=>{
      clearTimeout(flutterTimer);
      el.classList.remove('butterfly-excited','butterfly-dart');
      el.style.removeProperty('--wing-x');el.style.removeProperty('--wing-y');
    });
  });
}

function customPointer(){
  if(window.matchMedia('(pointer:coarse)').matches || reducedMotion)return;
  document.body.classList.add('has-custom-pointer');
  const cursor=document.createElement('div');cursor.className='showcase-pointer';cursor.setAttribute('aria-hidden','true');cursor.innerHTML=`<svg viewBox="0 0 38 46"><path d="M3 3 3 36 11 29 17 42 24 39 18 26 30 25Z" fill="#ec59df" stroke="#fff" stroke-width="2" stroke-linejoin="round"/></svg>`;
  document.body.append(cursor);let x=-99,y=-99;let frame;
  window.addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;if(frame)return;frame=requestAnimationFrame(()=>{cursor.style.transform=`translate3d(${x}px,${y}px,0)`;cursor.classList.add('visible');frame=null;});},{passive:true});
  document.addEventListener('pointerover',e=>cursor.classList.toggle('hovered',!!e.target.closest('a,button,.butterfly')));
  document.addEventListener('pointerdown',()=>cursor.classList.add('pressed'));
  document.addEventListener('pointerup',()=>cursor.classList.remove('pressed'));
  document.addEventListener('mouseleave',()=>cursor.classList.remove('visible'));
}

render();
