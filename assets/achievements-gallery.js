/* Nash Portfolio / Achievements — original certificates and collaborative capstone. */
(function initNashAchievements(){
  'use strict';
  if(document.body.dataset.page !== 'achievements') return;
  const root = document.querySelector('.play-page');
  const gallery = root?.querySelector('.play-gallery');
  const cards = gallery ? [...gallery.querySelectorAll('.play-project')] : [];
  if(!root || cards.length < 5) return;

  const items = [
    {
      file: 'with-honors.webp', title: 'With Honors', category: 'Academic Excellence',
      date: 'December 9, 2025',
      description: 'First semester recognition for academic performance in Grade 12 STEM, S.Y. 2025–2026.',
      alt: 'Original With Honors certificate from Saint Simon of Cyrene Academy for Nash Althea G. Tolin'
    },
    {
      file: 'group-innovation.webp', title: 'Outstanding Group Innovation', category: 'Graduation Recognition',
      date: 'April 28, 2026',
      description: 'Certificate of achievement presented during the 20th graduation and 9th moving-up ceremony.',
      alt: 'Original Outstanding Performance in Group Innovation certificate for Nash Althea G. Tolin'
    },
    {
      file: 'sports-recognition.webp', title: 'Recognition in Sports', category: 'Athletics & Teamwork',
      date: 'April 28, 2026',
      description: 'Recognition for dedication, performance, teamwork, and sportsmanship.',
      alt: 'Original Certificate of Recognition for excellence in sports at Saint Simon of Cyrene Academy'
    },
    {
      file: 'grade-12-report-card.webp', title: 'Grade 12 STEM Record', category: 'Academic Progress',
      date: 'S.Y. 2025–2026',
      description: 'A record of Nash’s senior high school studies and semester results. The private learner ID is hidden.',
      alt: 'Grade 12 STEM report card with school learner ID concealed for privacy'
    }
  ];
  const source = item => `assets/achievements/${encodeURIComponent(item.file)}`;
  let viewer = null, viewerImage, viewerTitle, viewerDescription, viewerCount, active = 0, restoreFocus = null;

  function updateViewer(){
    const item=items[active];
    if(!viewerImage)return;
    viewerImage.src=source(item);
    viewerImage.alt=item.alt;
    viewerTitle.textContent=item.title;
    viewerDescription.textContent=`${item.category} · ${item.date} — ${item.description}`;
    viewerCount.textContent=`${active+1} / ${items.length}`;
  }
  function shift(by){ active=(active+by+items.length)%items.length; updateViewer(); }
  function makeViewer(){
    if(viewer)return;
    viewer=document.createElement('dialog');
    viewer.className='achievement-viewer';
    viewer.setAttribute('aria-label','Achievement document viewer');
    viewer.innerHTML=`<div class="achievement-viewer-panel">
      <div class="achievement-viewer-top"><span>THE ARCHIVE / NASH TOLIN</span><button type="button" class="achievement-viewer-close" aria-label="Close enlarged document">✕</button></div>
      <div class="achievement-viewer-stage"><button type="button" class="achievement-viewer-prev" aria-label="Previous achievement">‹</button><img class="achievement-viewer-image" alt="" draggable="false" /><button type="button" class="achievement-viewer-next" aria-label="Next achievement">›</button></div>
      <div class="achievement-viewer-bottom"><div><strong class="achievement-viewer-title"></strong><p class="achievement-viewer-description"></p></div><span class="achievement-viewer-count" aria-live="polite"></span></div>
    </div>`;
    document.body.appendChild(viewer);
    viewerImage=viewer.querySelector('.achievement-viewer-image');
    viewerTitle=viewer.querySelector('.achievement-viewer-title');
    viewerDescription=viewer.querySelector('.achievement-viewer-description');
    viewerCount=viewer.querySelector('.achievement-viewer-count');
    viewer.querySelector('.achievement-viewer-close').addEventListener('click',()=>viewer.close());
    viewer.querySelector('.achievement-viewer-prev').addEventListener('click',()=>shift(-1));
    viewer.querySelector('.achievement-viewer-next').addEventListener('click',()=>shift(1));
    viewer.addEventListener('keydown',e=>{
      if(e.key==='ArrowLeft'){e.preventDefault();shift(-1)}
      else if(e.key==='ArrowRight'){e.preventDefault();shift(1)}
    });
    viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});
    viewer.addEventListener('close',()=>{
      // Browser dialog top layer sits above every body z-index. Restore the
      // site's existing pointer to its original parent without duplicating it.
      const pointer=viewer.querySelector('.showcase-pointer');
      if(pointer){document.body.appendChild(pointer);pointer.classList.remove('pressed','hovered')}
      viewer.classList.remove('achievement-viewer--custom-pointer');
      restoreFocus?.focus({preventScroll:true});
      restoreFocus=null;
    });
  }
  function openViewer(index){
    makeViewer();restoreFocus=document.activeElement;active=index;updateViewer();
    if(!viewer.open)viewer.showModal();
    const pointer=document.querySelector('.showcase-pointer');
    if(pointer && document.body.classList.contains('has-custom-pointer')){
      viewer.appendChild(pointer);
      viewer.classList.add('achievement-viewer--custom-pointer');
    }
    viewer.querySelector('.achievement-viewer-close').focus({preventScroll:true});
  }

  items.forEach((item,index)=>{
    const card=cards[index];
    const visual=card.querySelector('.play-project-visual');
    const caption=card.querySelector('.play-project-caption');
    if(!visual || !caption)return;
    card.classList.add('achievement-card','achievement-card--'+index);
    const button=document.createElement('button');
    button.type='button';button.className='achievement-image-button';
    button.setAttribute('aria-label',`Enlarge document: ${item.title}`);
    const image=document.createElement('img');
    image.src=source(item);image.alt=item.alt;image.decoding='async';
    image.loading=index<2?'eager':'lazy';
    const badge=document.createElement('span');badge.className='achievement-image-badge';
    badge.textContent='VIEW DOCUMENT ↗';badge.setAttribute('aria-hidden','true');
    button.append(image,badge);visual.replaceChildren(button);
    visual.classList.add('achievement-card-visual');
    visual.removeAttribute('role');visual.removeAttribute('aria-label');
    caption.innerHTML='';
    const copy=document.createElement('div');copy.className='achievement-caption-copy';
    const title=document.createElement('h3');title.textContent=item.title;
    const desc=document.createElement('p');desc.textContent=item.description;
    copy.append(title,desc);
    const date=document.createElement('span');date.textContent=item.date;
    caption.append(copy,date);
    button.addEventListener('click',()=>openViewer(index));
  });

  // The original template has five generic placeholders. Replace the fifth
  // with the more useful, dedicated capstone feature below, not a fake award.
  cards[4].remove();
  const oldNote=root.querySelector('.play-note');
  if(oldNote)oldNote.remove();
  gallery.insertAdjacentHTML('afterend',`
    <section class="achievement-capstone" id="capstone" aria-labelledby="capstone-title">
      <div class="achievement-capstone-heading"><span class="capstone-eyebrow">05 / CAPSTONE RESEARCH · 2025–2026</span><span class="capstone-star" aria-hidden="true">✳</span></div>
      <div class="achievement-capstone-grid">
        <div class="achievement-capstone-copy">
          <h2 id="capstone-title">A smarter way<br>to <em>show up.</em></h2>
          <p class="capstone-lede">An Assessment of the Performance of a Fingerprint-Based Attendance Monitoring System with Kiosk Interface and Web Access for Teachers, Parents, and School Administrators.</p>
          <p>This senior high school capstone evaluated a collaborative prototype combining an ESP32 fingerprint sensor and kiosk with web-based attendance monitoring. Nash was one of eight researchers credited in the study.</p>
          <div class="capstone-stack" aria-label="Technologies used"><span>ESP32</span><span>Fingerprint sensor</span><span>Arduino IDE</span><span>Google Sheets</span><span>Apps Script</span><span>Web kiosk</span></div>
          <div class="capstone-stats" aria-label="Selected reported capstone findings">
            <div><strong>75%</strong><span>First-attempt recognition<br>(6 of 8 trials)</span></div>
            <div><strong>100%</strong><span>Unregistered fingerprints rejected<br>(8 of 8 trials)</span></div>
            <div><strong>52</strong><span>Survey participants<br>across three groups</span></div>
          </div>
          <p class="capstone-caveat">These figures come from the team's reported evaluation. The study also identified limitations in scanner consistency, usability, and device compatibility.</p>
          <div class="capstone-actions"><a class="capstone-primary" href="assets/achievements/capstone-research-brief.pdf" target="_blank" rel="noopener noreferrer">Read the research highlight <span aria-hidden="true">↗</span></a><a class="capstone-secondary" href="#achievement-diagram">Explore system diagram <span aria-hidden="true">↓</span></a></div>
        </div>
        <figure class="achievement-diagram" id="achievement-diagram">
          <img src="assets/achievements/capstone-diagram.webp" loading="lazy" decoding="async" alt="System architecture diagram from the original capstone, showing the ESP32 fingerprint attendance device connected to web and Google Sheets interfaces" />
          <figcaption><span>01 / SYSTEM ARCHITECTURE</span><span>Original capstone diagram</span></figcaption>
        </figure>
      </div>
      <p class="capstone-privacy">The public research highlight omits private contact details from the original report.</p>
    </section>
  `);
})();