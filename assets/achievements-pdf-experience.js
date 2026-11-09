/* Nash Tolin — Achievements: Russell Numo-inspired hover label and white PDF archive.
   Scoped to the public capstone research highlight; does not expose the private source report. */
(() => {
  'use strict';
  if (document.body.dataset.page !== 'achievements') return;

  // The capstone markup is inserted by achievements-gallery.js (loaded first).
  const sourceLink = document.querySelector('.achievement-capstone .capstone-primary');
  const actions = document.querySelector('.achievement-capstone .capstone-actions');
  if (!sourceLink || !actions || document.querySelector('.nash-pdf-preview')) return;

  const pdfUrl = new URL(sourceLink.getAttribute('href'), document.baseURI).href;
  const pdfFilename = 'Nash_Tolin_Capstone_Research_Highlight.pdf';
  sourceLink.classList.add('capstone-open-archive');
  sourceLink.setAttribute('aria-haspopup', 'dialog');
  sourceLink.setAttribute('aria-label', 'View the capstone research PDF in the archive');
  sourceLink.innerHTML = '<span>Open research PDF</span><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M4 19 19 4M8 4h11v11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  // An image-like document tile makes the hover label behave like the
  // floating VIEW PROJECT button in the supplied reference recording.
  const preview = document.createElement('a');
  preview.href = pdfUrl;
  preview.className = 'nash-pdf-preview';
  preview.setAttribute('aria-label', 'Open the fingerprint attendance capstone PDF viewer');
  preview.setAttribute('aria-haspopup', 'dialog');
  preview.innerHTML = `
    <div class="nash-pdf-preview-art" aria-hidden="true">
      <div class="nash-pdf-preview-orbit nash-pdf-preview-orbit-one"></div>
      <div class="nash-pdf-preview-orbit nash-pdf-preview-orbit-two"></div>
      <span class="nash-pdf-preview-index">ARCHIVE ENTRY — 01 / RESEARCH</span>
      <div class="nash-pdf-preview-wordmark">RESEARCH<br><em>IN MOTION.</em></div>
      <div class="nash-pdf-preview-meta"><span>FINGERPRINT ATTENDANCE SYSTEM</span><span>2025—2026</span></div>
    </div>
    <span class="nash-pdf-preview-float" aria-hidden="true">VIEW PDF <svg viewBox="0 0 24 24" width="13" height="13"><path d="M5 19 19 5M9 5h10v10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
  `;
  actions.insertAdjacentElement('afterend', preview);
  const followLabel = preview.querySelector('.nash-pdf-preview-float');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let targetX = 0, targetY = 0, currentX = 0, currentY = 0, animationFrame = 0, tracking = false;

  function positionFromPointer(event) {
    const rect = preview.getBoundingClientRect();
    const limitX = Math.min(75, rect.width / 2);
    const limitY = Math.min(27, rect.height / 2);
    targetX = Math.max(limitX, Math.min(rect.width - limitX, event.clientX - rect.left));
    targetY = Math.max(limitY, Math.min(rect.height - limitY, event.clientY - rect.top));
  }
  function follow() {
    if (!tracking) { animationFrame = 0; return; }
    if (reduceMotion.matches) {
      currentX = targetX; currentY = targetY;
    } else {
      currentX += (targetX - currentX) * 0.24;
      currentY += (targetY - currentY) * 0.24;
    }
    followLabel.style.left = currentX + 'px';
    followLabel.style.top = currentY + 'px';
    if (Math.abs(targetX - currentX) > 0.25 || Math.abs(targetY - currentY) > 0.25) {
      animationFrame = requestAnimationFrame(follow);
    } else {
      animationFrame = 0;
    }
  }
  preview.addEventListener('pointerenter', event => {
    if (!finePointer.matches || event.pointerType === 'touch') return;
    positionFromPointer(event);
    currentX = targetX; currentY = targetY;
    tracking = true;
    preview.classList.add('is-hovering');
    if (!animationFrame) animationFrame = requestAnimationFrame(follow);
  });
  preview.addEventListener('pointermove', event => {
    if (!tracking) return;
    positionFromPointer(event);
    if (!animationFrame) animationFrame = requestAnimationFrame(follow);
  }, { passive: true });
  preview.addEventListener('pointerleave', () => {
    tracking = false;
    preview.classList.remove('is-hovering');
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  });

  // White, near-fullscreen PDF sheet with the browser's native document controls.
  const pdfModal = document.createElement('dialog');
  pdfModal.id = 'nashPdfArchive';
  pdfModal.className = 'nash-pdf-dialog';
  pdfModal.setAttribute('aria-labelledby', 'nash-pdf-title');
  pdfModal.setAttribute('aria-describedby', 'nash-pdf-summary');
  pdfModal.innerHTML = `
    <div class="nash-pdf-dialog-inner">
      <button type="button" class="nash-pdf-close" aria-label="Close PDF viewer">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 5 19 19M19 5 5 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
      <header class="nash-pdf-heading">
        <span class="nash-pdf-eyebrow">THE PORTFOLIO ARCHIVE / NASH TOLIN</span>
        <h2 id="nash-pdf-title">Fingerprint-Based Attendance System — Research Highlight</h2>
        <p id="nash-pdf-summary">A curated public summary of the 2025–2026 capstone research, covering the prototype, method, and selected results.</p>
      </header>
      <div class="nash-pdf-embed-shell">
        <iframe class="nash-pdf-embed" title="Fingerprint-Based Attendance System — research PDF" loading="lazy" referrerpolicy="no-referrer" allow="fullscreen"></iframe>
        <div class="nash-pdf-embed-loading" role="status">Opening research document…</div>
      </div>
      <footer class="nash-pdf-dialog-footer">
        <a class="nash-pdf-download" download="Nash_Tolin_Capstone_Research_Highlight.pdf">
          <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 16v4h16v-4" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Download PDF
        </a>
        <a class="nash-pdf-open-new" target="_blank" rel="noopener noreferrer">Open PDF in a new tab
          <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true"><path d="M5 19 19 5M9 5h10v10" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
        <span class="nash-pdf-footnote">Public research highlight · PDF</span>
      </footer>
    </div>
  `;
  document.body.appendChild(pdfModal);
  const iframe = pdfModal.querySelector('.nash-pdf-embed');
  const loading = pdfModal.querySelector('.nash-pdf-embed-loading');
  const closeButton = pdfModal.querySelector('.nash-pdf-close');
  const download = pdfModal.querySelector('.nash-pdf-download');
  const newTab = pdfModal.querySelector('.nash-pdf-open-new');
  download.href = pdfUrl; download.download = pdfFilename;
  newTab.href = pdfUrl;
  let previousFocus = null;

  iframe.addEventListener('load', () => { loading.hidden = true; });
  closeButton.addEventListener('click', () => pdfModal.close());
  pdfModal.addEventListener('click', e => { if (e.target === pdfModal) pdfModal.close(); });
  pdfModal.addEventListener('close', () => {
    document.body.classList.remove('nash-pdf-open');
    iframe.removeAttribute('src');
    loading.hidden = false;
    previousFocus?.focus({ preventScroll: true });
    previousFocus = null;
  });

  function showPdf(event) {
    // Preserve native open-in-new-tab affordances and non-primary clicks.
    if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    if (pdfModal.open) return;
    previousFocus = document.activeElement;
    // Native PDF plug-ins manage their own pointer events: show the system
    // cursor in this modal rather than a frozen or duplicate pink cursor.
    document.body.classList.add('nash-pdf-open');
    pdfModal.showModal();
    loading.hidden = false;
    iframe.src = pdfUrl + '#toolbar=1&navpanes=0&view=FitH';
    closeButton.focus({ preventScroll: true });
  }
  sourceLink.addEventListener('click', showPdf);
  preview.addEventListener('click', showPdf);
})();