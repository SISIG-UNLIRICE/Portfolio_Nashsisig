/* Original jellyfish background, portfolio navigation and headings preserved. */
(function initNashReflectionsAccordion(){
  'use strict';
  if(document.body.dataset.page!=='reflections')return;
  // The original app.js creates the full Reflections page including the animated
  // jellyfish background, header, footer and the three authentic journal texts.
  // Replace ONLY the reflection cards with reference-style expandable rows.
  const reflectionSection=document.querySelector('.reflections');
  const grid=reflectionSection?.querySelector('.reflection-grid');
  if(!grid)return;
  const paragraphs=[...grid.querySelectorAll('.reflection-card .reflection-glass p')].map(p=>p.textContent.trim());
  if(paragraphs.length!==3||paragraphs.some(p=>!p))return;
  const terms=[
    {id:'prelim',index:'01',name:'PRELIM',description:'Foundations, flowcharts and learning to solve problems'},
    {id:'midterm',index:'02',name:'MIDTERM',description:'Learning Java and writing my first programs'},
    {id:'finals',index:'03',name:'FINALS',description:'Machine problems, challenges and progress'}
  ];
  const list=document.createElement('div');
  list.className='reflection-accordion-list';
  list.setAttribute('aria-label','Computer Programming 1 term reflections');
  terms.forEach((term,i)=>{
    const article=document.createElement('article');
    article.className='reflection-accordion-item';
    article.id=term.id;
    const heading=document.createElement('h3');
    heading.className='reflection-accordion-heading';
    const button=document.createElement('button');
    button.className='reflection-accordion-toggle';
    button.type='button';
    button.id=term.id+'-toggle';
    button.setAttribute('aria-expanded','false');
    button.setAttribute('aria-controls',term.id+'-content');
    const index=document.createElement('span');
    index.className='reflection-accordion-index';
    index.textContent=term.index+' / TERM';
    const title=document.createElement('span');
    title.className='reflection-accordion-title';
    title.textContent=term.name;
    const period=document.createElement('span');
    period.className='reflection-accordion-period';
    period.textContent='.';
    period.setAttribute('aria-hidden','true');
    title.append(period);
    const label=document.createElement('span');
    label.className='reflection-accordion-action';
    label.textContent='VIEW SECTIONS';
    label.setAttribute('aria-hidden','true');
    const plus=document.createElement('span');
    plus.className='reflection-accordion-plus';
    plus.setAttribute('aria-hidden','true');
    button.append(index,title,label,plus);
    heading.append(button);
    const panel=document.createElement('div');
    panel.className='reflection-accordion-panel';
    panel.id=term.id+'-content';
    panel.setAttribute('role','region');
    panel.setAttribute('aria-labelledby',button.id);
    panel.setAttribute('aria-hidden','true');
    panel.inert=true;
    const inner=document.createElement('div');
    inner.className='reflection-accordion-inner';
    const content=document.createElement('div');
    content.className='reflection-accordion-content';
    const meta=document.createElement('p');
    meta.className='reflection-accordion-meta';
    meta.textContent=term.index+' / LEARNING JOURNAL — '+term.description;
    const prose=document.createElement('p');
    prose.className='reflection-accordion-prose';
    prose.textContent=paragraphs[i];
    content.append(meta,prose);
    inner.append(content);
    panel.append(inner);
    article.append(heading,panel);
    list.append(article);
  });
  grid.replaceWith(list);
  const heading=reflectionSection.querySelector('.section-heading');
  if(heading && !heading.querySelector('.reflection-accordion-instructions')){
    const instruction=document.createElement('p');
    instruction.className='reflection-accordion-instructions';
    instruction.textContent='Open a term to explore its learning journal.';
    heading.append(instruction);
  }
  const items=[...list.querySelectorAll('.reflection-accordion-item')];
  const setExpanded=(selected,opened)=>{
    items.forEach(item=>{
      const isOpen=item===selected && opened;
      item.classList.toggle('is-open',isOpen);
      const toggle=item.querySelector('.reflection-accordion-toggle');
      const panel=item.querySelector('.reflection-accordion-panel');
      toggle.setAttribute('aria-expanded',String(isOpen));
      panel.setAttribute('aria-hidden',String(!isOpen));
      panel.inert=!isOpen;
    });
  };
  items.forEach(item=>{
    item.querySelector('.reflection-accordion-toggle').addEventListener('click',()=>{
      setExpanded(item,!item.classList.contains('is-open'));
    });
  });
  const target=items.find(item=>location.hash==='#'+item.id);
  if(target)setExpanded(target,true);
  document.body.classList.add('reflection-accordion-ready');
})();
