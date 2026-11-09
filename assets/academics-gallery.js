/* Nash Portfolio / Academics — scoped original screenshot gallery. */
(function initNashAcademics() {
  'use strict';
  if (document.body.dataset.page !== 'academics') return;
  const items=[
    {file:'acads (4).png',title:'Flowchart Symbols',type:'Programming Fundamentals',details:'A visual guide to flowchart shapes, labels, and their meanings.'},
    {file:'acads (2).png',title:'Preliminary Grade Flowchart',type:'Problem Analysis',details:'A flowchart for reading grade components and computing a preliminary grade.'},
    {file:'acads.png',title:'Number Classification',type:'Java Programming',details:'An early Java exercise using number input and conditional statements.'},
    {file:'acads (1).png',title:'Character Occurrence Counter',type:'Java Programming',details:'A Java program that counts occurrences of selected characters in a string.'},
    {file:'acads (3).png',title:'Days of the Week',type:'Java Programming',details:'Condition-based logic that maps number inputs to weekday names.'},
    {file:'acads (5).png',title:'Chess Piece Point Values',type:'Java Programming',details:'A Java switch-case activity assigning point values to chess pieces.'},
    {file:'acads (6).png',title:'Weather Suggestions',type:'Java Programming',details:'A switch-case exercise that suggests activities for different weather conditions.'}
  ];
  const gallery=document.querySelector('.play-gallery');
  if(!gallery)return;
  const cards=[...gallery.querySelectorAll('.play-project')];
  if(cards.length<items.length)return;
  let modal,viewImage,viewTitle,viewDescription,viewCount,activeIndex=0,previousFocus;
  const ready=new Set();
  const src=item=>'assets/academics/'+encodeURIComponent(item.file);
  function refreshModal(){
    const available=[...ready].sort((a,b)=>a-b);
    if(!available.length)return;
    if(!ready.has(activeIndex))activeIndex=available[0];
    const item=items[activeIndex];
    viewImage.src=src(item);viewImage.alt=item.title+', original uploaded academic screenshot';
    viewTitle.textContent=item.title;viewDescription.textContent=item.details;
    viewCount.textContent=(available.indexOf(activeIndex)+1)+' / '+available.length;
  }
  function move(delta){
    const available=[...ready].sort((a,b)=>a-b);
    if(!available.length)return;
    activeIndex=available[(available.indexOf(activeIndex)+delta+available.length)%available.length];
    refreshModal();
  }
  function initModal(){
    if(modal)return;
    modal=document.createElement('dialog');
    modal.className='academic-viewer';
    modal.setAttribute('aria-label','Academic work image viewer');
    modal.innerHTML=`<div class="academic-viewer-panel">
      <div class="academic-viewer-top"><span class="academic-viewer-eyebrow">NASH / ACADEMIC ARCHIVE</span><button type="button" class="academic-viewer-close" aria-label="Close image viewer">✕</button></div>
      <div class="academic-viewer-stage"><button type="button" class="academic-viewer-previous" aria-label="Previous academic work">‹</button><img class="academic-viewer-image" alt="" draggable="false"><button type="button" class="academic-viewer-next" aria-label="Next academic work">›</button></div>
      <div class="academic-viewer-bottom"><div><strong class="academic-viewer-title"></strong><p class="academic-viewer-desc"></p></div><span class="academic-viewer-count" aria-live="polite"></span></div>
    </div>`;
    document.body.append(modal);
    viewImage=modal.querySelector('.academic-viewer-image');
    viewTitle=modal.querySelector('.academic-viewer-title');
    viewDescription=modal.querySelector('.academic-viewer-desc');
    viewCount=modal.querySelector('.academic-viewer-count');
    modal.querySelector('.academic-viewer-close').addEventListener('click',()=>modal.close());
    modal.querySelector('.academic-viewer-previous').addEventListener('click',()=>move(-1));
    modal.querySelector('.academic-viewer-next').addEventListener('click',()=>move(1));
    modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
    modal.addEventListener('keydown',e=>{
      if(e.key==='ArrowLeft'){e.preventDefault();move(-1)}
      if(e.key==='ArrowRight'){e.preventDefault();move(1)}
    });
    // <dialog>.showModal() enters the browser's top layer, which is above
    // any z-index on body. Portal the site's ONE existing pink cursor into
    // that top layer rather than drawing a competing second pointer.
    modal.addEventListener('close',()=>{
      const pointer=modal.querySelector('.showcase-pointer');
      if(pointer){
        document.body.appendChild(pointer);
        pointer.classList.remove('hovered','pressed');
      }
      modal.classList.remove('academic-viewer--cursor-layer');
      previousFocus?.focus({preventScroll:true});
    });
  }
  function open(index){
    if(!ready.has(index))return;
    initModal();
    previousFocus=document.activeElement;
    activeIndex=index;
    refreshModal();
    if(!modal.open)modal.showModal();
    // Preserve the existing animated cursor while the dialog is in top layer.
    // On touch/reduced-motion devices no custom cursor exists; leave the
    // browser's native cursor and focus behavior unchanged.
    const pointer=document.querySelector('.showcase-pointer');
    if(pointer && document.body.classList.contains('has-custom-pointer')){
      modal.appendChild(pointer);
      modal.classList.add('academic-viewer--cursor-layer');
    }
    modal.querySelector('.academic-viewer-close').focus({preventScroll:true});
  }
  items.forEach((item,index)=>{
    const probe=new Image();
    probe.onload=()=>{
      const card=cards[index],visual=card?.querySelector('.play-project-visual');
      if(!visual)return;
      ready.add(index);
      card.classList.add('has-academic-image');
      card.classList.toggle('academic-image-portrait',probe.naturalHeight>probe.naturalWidth);
      visual.classList.add('play-project-visual--original');
      visual.setAttribute('role','group');
      visual.setAttribute('aria-label',item.title+', original uploaded screenshot');
      const button=document.createElement('button');
      button.type='button';button.className='academic-image-button';
      button.setAttribute('aria-label','Open full-size image: '+item.title);
      const img=document.createElement('img');
      img.className='academic-work-image';img.src=probe.src;img.decoding='async';
      img.loading=index<2?'eager':'lazy';
      img.alt=item.title+", screenshot of Nash's Computer Programming 1 activity";
      const hint=document.createElement('span');hint.className='academic-image-hint';
      hint.setAttribute('aria-hidden','true');hint.textContent='VIEW ORIGINAL ↗';
      button.append(img,hint);visual.replaceChildren(button);
      button.addEventListener('click',()=>open(index));
      card.querySelector('.play-project-caption h3').textContent=item.title;
      card.querySelector('.play-project-caption span').textContent=item.type;
      const note=document.querySelector('.play-note p');
      if(note)note.textContent='Original Computer Programming 1 activities, flowcharts, and coding video. PDF materials to follow.';
    };
    probe.onerror=()=>console.warn('Academics image not yet uploaded:',item.file);
    probe.src=src(item);
  });

  // Original course recording, displayed after seven academic screenshots.
  function mountAcademicVideo(){
    if(document.querySelector('.academic-video-feature'))return;
    const section=document.createElement('section');
    section.id='academic-video';
    section.className='academic-video-feature';
    section.setAttribute('aria-labelledby','academic-video-title');
    section.innerHTML=[
      '<div class="academic-video-header">',
        '<span class="academic-video-kicker">08 / CODING DEMONSTRATION</span>',
        '<div class="academic-video-heading-row">',
          '<div><h2 id="academic-video-title">Java in <em>action.</em></h2>',
          '<p>Chess Piece Point Values — a Java switch-case activity running in VS Code.</p></div>',
          '<span class="academic-video-duration">00:32 / FULL HD</span>',
        '</div>',
      '</div>',
      '<div class="academic-video-frame">',
        '<video class="academic-video-player" controls preload="metadata" playsinline poster="assets/academics/acads%20(5).png" aria-label="Chess piece point values Java coding demonstration">',
          '<source src="assets/academics/acadscoding.mp4" type="video/mp4">',
          'Your browser does not support HTML5 video.',
        '</video>',
      '</div>',
      '<div class="academic-video-footer"><span>VIDEO DOCUMENTATION / COMPUTER PROGRAMMING 1</span>',
      '<p>Original 32-second recording · Java code and program output</p></div>'
    ].join('');
    gallery.insertAdjacentElement('afterend',section);
    // Avoid a double cursor over the browser's native video controls.
    const video=section.querySelector('video');
    const nativePointer=()=>document.body.classList.add('academic-video-native-pointer');
    const restorePointer=()=>document.body.classList.remove('academic-video-native-pointer');
    video.addEventListener('pointerenter',nativePointer);
    video.addEventListener('pointerleave',restorePointer);
    video.addEventListener('blur',restorePointer);
    window.addEventListener('pagehide',restorePointer,{once:true});
  }
  mountAcademicVideo();
})();
