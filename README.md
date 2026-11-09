# Nash's Portfolio — Figma-inspired responsive website

A static HTML/CSS/JavaScript implementation based on the supplied Figma screenshots, section CSS and design references. The design has been reflowed to fullscreen responsive sections rather than fixed 711px Figma coordinates.

## Pages

- `index.html`: WELCOME loading screen, followed directly by the jellyfish introduction and personal cards; no butterfly on Home. There is no separate Welcome section, Enter/Continue button, or automatic scrolling.
- `academics.html`: on-brand dark violet editorial gallery with butterfly powered by predictive pursuit steering (an autonomous wandering target, acceleration-limited curves, fast wingbeats, direction-aware banking, proximity avoidance and click-to-approach). It does not depend on scroll position.
- `achievements.html`: matching staggered achievements gallery with the same real-3D butterfly pursuit animation and a disabled PDF placeholder until the original file is provided.
- `reflections.html`: dedicated term-reflections webpage with the three original cards and the same original-quality jellyfish background as Home; no butterfly.

## Assets

- `assets/original-butterfly.png`: **original butterfly**, recovered from this repository's historical commit `f702f458b7a1570832f4355e8ad5910dcf6eb851` (blob `8ad4f37565e39c5cf7e75af1daa2b6a901408170`).
- `assets/butterfly-enhanced.webp`: an image-assisted restoration of that tiny original, delivered at 528 × 552 for crisp small displays. Its original blue/violet silhouette and central motif are retained, but fine filigree and shading are reconstructed; this is an enhanced interpretation, not an exact high-resolution Figma export. The original PNG is preserved unchanged.
- `assets/photo-03.webp`: first (camera) photo cropped from the screenshot of the original Figma ID card; low-resolution until original is supplied.
- `assets/photo-01.webp` and `assets/photo-02.webp`: two original uploaded portraits.
- `assets/jellyfish-loop.mp4` and `assets/jellyfish-mobile.mp4`: the user's confirmed jellyfish upload (`29b45032dfd4643c6783558c6fc48e01.mp4`), cleaned with restrained denoising/debanding and sharpening. Both retain 50 fps, 9.4-second motion, silent inline looping, and front-loaded MP4 metadata. Desktop uses a 1280 × 552 Lanczos-resampled derivative; screens up to 960 px use the smaller native 728 × 314 copy. Both Introduction and Term Reflections pause footage offscreen and avoid loading it for reduced motion. The 736 × 414 source's moiré/grid remains; resampling does not recover genuine HD detail.
- `assets/jellyfish-poster.webp`: a matching frame extracted from that processed video, used as the still poster and reduced-motion/autoplay fallback. `assets/jellyfish.webp` remains the historical still asset.

## Key interactions

Navigation has consistent SVG icons and visible labels: Home → `index.html`; Academics → `academics.html`; About me → `index.html#about`; Achievements → `achievements.html`; Reflections → `reflections.html`. The active label follows the current section, and mobile navigation keeps all five destinations visible. Home shows a welcome-only loading treatment briefly, then the introduction. Direct anchors, browser history and reduced-motion visits skip it. Old `#welcome` links resolve to `#introduction` for compatibility.

The loading screen combines an irregular drifting particle field, purple nebula and WELCOME lettering. It fades after about 1.5 seconds; scrolling or keyboard input dismisses it immediately. It never blocks page input. The Academic butterfly has a restrained glow and pointer response; its “Animate butterfly” button also works with touch, Enter, and Space. Long mobile Introduction and Reflections sections keep the footage at viewport height while content scrolls over it, avoiding extreme video enlargement.

Photos form a compact fan with camera left, drinks center/front, and glasses/pink ribbons right. Hover or keyboard focus reveals the fan; each photo lifts in place and opens a preview. Touch users can tap the stack once or use “Show all 3 photos,” then tap any photo. Escape, the close button, or the backdrop dismisses the preview and restores focus. The modal keeps keyboard focus inside it. Cursor remains an anonymous pink pointer; coarse pointers and reduced-motion users use their native cursor.

## Known missing originals

Exact high-resolution original butterfly (the 132 × 138 source and its labeled restoration are retained), original camera photo (currently a screenshot crop), exact nebula background/GIF, full-resolution schoolwork images, certificates, and PDF target file. School documents and personal photos have not been invented. The purple nebula remains a CSS approximation; the restored logo and resampled video are not verified HD source exports.

## Run locally

```bash
python -m http.server 8000
```

Open `http://localhost:8000/index.html`. GitHub Pages may serve directly from `main` root.

## Codex continuation

See [`CODEX_FIGMA_REFINEMENT.md`](CODEX_FIGMA_REFINEMENT.md) for strict design-fidelity requirements and the QA checklist. Do not redesign approved elements without the owner's instructions.

The owner's latest request combines WELCOME and the butterfly in the loader, superseding the handoff's separate scrolling Welcome section and navigation. Real jellyfish footage supersedes the older drifting-still notes. This remains a dependency-free static site suitable for GitHub Pages; there is no build step. The existing typefaces are self-hosted in `assets/fonts/`, with their OFL licenses, so no external font service is required.

`styles.css` owns page layouts, `assets/navigation.css` owns the labeled navigation, and `assets/atmosphere.css` owns loading-screen particles and butterfly presentation.
