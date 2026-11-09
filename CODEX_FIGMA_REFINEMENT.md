# CODEX — NASH PORTFOLIO | Figma Fidelity & Motion Refinement

**Repository:** `sylvonjamesgonzaga/nash-s-portfolio`  
**Target branch:** `main` (make a backup branch before any structural rewrite)  
**Reference Figma:** `https://www.figma.com/design/erQovUZMbj7ZQy6BYJpozM/comprog-portfolio-final`  
**Intended owner:** Nash Althea G. Tolin  
**Status:** Fix-in-place continuation, **not** a request to redesign.

## Mission

Compare the deployed website against the user's Figma screenshots and per-section CSS. Refine the site until the layout and animation agree with the original design at desktop, tablet, and phone sizes. Preserve the exact visual assets already supplied; **do not substitute a different butterfly logo, personal photo, or background**. The user's highest-priority corrections are (1) visible animated backgrounds; (2) full-viewport sections; (3) a three-photo stack, including the ORIGINAL Figma camera photo; (4) the ORIGINAL ornate blue-violet butterfly, not a generic wing SVG.

## Verified facts and important limits

- The uploaded file named `portfolio_bg_animated(3).gif` is actually a **PNG with one frame** (520×293). Prior code converted it to `assets/jellyfish.webp`, which is static. A CSS parallax drift has now been implemented. This moves the image but does **not** truly animate individual jellyfish. For exact per-jellyfish animation, request the original multi-frame GIF/video/WebM; never claim the supplied file is genuinely animated.
- The original ornate butterfly image can be retrieved from the repository history at `assets/original-butterfly.png`, old commit `f702f458b7a1570832f4355e8ad5910dcf6eb851`, Git blob `8ad4f37565e39c5cf7e75af1daa2b6a901408170`. Use this **original asset** on the loading screen and Academic page. Do not replace with another butterfly graphic.
- The three personal pictures are: `assets/photo-03.webp` (camera photo cropped from user's Figma screenshot), `assets/photo-01.webp` (holding two drinks), `assets/photo-02.webp` (green blazer). Replace the camera crop only when a **higher-resolution original camera picture** is supplied.
- The Figma MCP connector reached its Starter plan tool-call limit. If tool access resumes, retrieve design context/screenshots **read-only** to verify exact positioning and export assets without changing the Figma file. Otherwise use the previously supplied screenshots as visual references and document uncertainties.
- The original schoolwork screenshots/flowcharts/code outputs, certificates, and target PDF were shown in Figma screenshots but **not supplied as separate source files**. Do not invent, synthesize, or fabricate school documents. Clearly identified placeholders are acceptable until supplied.

## Required navigation (from the owner's conversation)

- Loading screen with ornate violet butterfly -> purple `WELCOME` -> main introduction, with a deliberate smooth transition.
- House icon -> `index.html?welcome=1` (WELCOME without replaying initial loading logo).
- Open-book icon -> separate Academic compilation `academics.html`.
- Person/head icon -> main jellyfish introduction `index.html#introduction`.
- Reflection icon -> three term reflections `academics.html#reflections`.
- Achievements/certificates are on `achievements.html`, accessible from Academic and currently by a separate extra nav control. **Do not invent additional icons or alter the owner's navigation without comparing the final Figma prototype**. If the achievements/girl icon mapping remains ambiguous, document the ambiguity rather than silently changing a known behavior.

## Fullscreen layout requirements

1. Loading/WELCOME each occupy the full viewport, centered both axes; no letterboxing, content clipping, or unnecessary scroll.
2. Main homepage intro section fills `100svh` / `100dvh` minus sticky navigation. The jellyfish background should fill the full available viewport width and height; never confine it to a centered 1160 px box.
3. Personal-information section follows the intro and fills at least one viewport, with the three Figma cards in responsive columns. The homepage **ends there**; keep schoolworks separate.
4. Academic page is independent, with a full-viewport intro and a long scrolling image gallery; Reflections section occupies a complete section beneath.
5. Achievements page uses the user's dark-to-purple gradient, photos/certificates and eventual PDF button, with correct alignment and no fabricated files.
6. Prefer fluid CSS Grid/Flex, `clamp()`, `minmax()`, viewport units, max-width on *inner content* only. Do not transplant Figma's 711x397 and 750x440 absolute artboard dimensions as fixed browser dimensions.
7. Respect safe areas on phones and `prefers-reduced-motion`; never force desktop-only positioning on mobile.

## Interactive features

- Mouse cursor: pink React Drops Showcase Pointer style **without any name tag**. Keyboard focus indicator must remain visible. Revert to native cursor on coarse pointer/reduced-motion devices.
- Violet butterfly: original image + smooth floating/hover feedback. The user's reference is the interactive bee from Léo Parpeix, but the subject must remain an ornate **butterfly**. Keep it performant.
- Hanging ID: preserve lanyard, ring, slot, quote and social row. The picture area contains all three actual photos, stacked on default, spreading on hover; the active card lifts; click triggers a 3D flip/tilt preview. Escape and close button dismiss; restore keyboard focus. The deck must not push the page sideways.
- Background motion: animate the still-source jellyfish background via transform/overlay as a **temporary** fallback. When a real animated source is supplied, use it with `object-fit: cover`, pause/reduced-motion alternative, and no blocking controls.
- Home icon returns to WELCOME, while person icon returns to the main intro. The two destinations must remain distinct.

## QA checklist and exit criteria

- Desktop 1440×900, tablet 768×1024, mobile 390×844 and small 320×700.
- Each viewport: assert document `scrollWidth <= innerWidth`; inspect hero top/bottom and cards; no overflowing quote or overlap with navigation.
- Exact butterfly asset loads on Loading and Academic pages, not a drawn substitute.
- Stack has three images from the specified files and fan hover + click + flip + tilt + Escape close works.
- Verify background transform progresses over time (two screenshots 3 seconds apart) and `prefers-reduced-motion` disables animation.
- All navigation links resolve and work from every page. Test `index.html?welcome=1`, `index.html#introduction`, `academics.html`, `academics.html#reflections`, `achievements.html`.
- All images `200`/nonempty; no broken thumbnails. Check the browser console for JS errors and asset 404s.
- Test that `WELCOME` does not automatically disappear when navigated to using the house icon, and loader transitions to it on first visit.
- Do not upload fabricated school documents. Leave placeholders and list missing originals in the final report.
- Publish only tested changes and verify GitHub Pages after a cache-busting version bump. Report changed files, commit SHA, actual tests performed, screenshots, and unresolved design differences.

## Commit safety

Inspect the current `main` before making changes. Create a backup branch or tag at its exact commit. Preserve the original Figma file, existing Git history, and user assets. Avoid unrelated changes to other repos. When data/assets are missing, **do not replace with guessed content**.

## Current implementation notes

The latest correction pass uses `styles.css` full-viewport overrides, `app.js` dynamic 3-image stack and original butterfly path, and versioned HTML asset queries (`?v=2.0.1`). If the visible page remains stale, hard-refresh and inspect GitHub Pages's latest deployment, but do not assume that CDN caching is the only explanation.
