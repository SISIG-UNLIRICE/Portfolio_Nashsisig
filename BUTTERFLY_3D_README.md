# Nash — Real Interactive 3D Butterfly

## What is included

- `assets/crystal-butterfly.glb` — real 3D model (four separate curved, textured wings, gem body, antennae; not a sprite, flat CSS transform, or GIF).
- `butterfly3d.js` — flight controller that animates independent wing movement and curved, bee-like autonomous motion. Clicking/tapping a non-interactive area lures the butterfly to the point. Its model banks/tilts as it flies.
- `butterfly3d.css` — pointer-transparent overlay; it never blocks buttons, scroll, or form inputs. Existing still logo remains a fallback if WebGL or model loading fails.
- `demo.html` — full-screen standalone interactive demonstration.
- `assets/Wing_*.png` — the four source textures used in the model, for future editing.
- `glb-preview.png`, `glb-preview-angle.png` — model inspections only.

## Run the demonstration

Serve the directory via a local server rather than opening `file://`:

```bash
python -m http.server 8000
```

Open `http://localhost:8000/demo.html`. The HTML loads Three.js v0.180.0 from jsDelivr; an internet connection is needed for the runtime. No static image alone can do real wing articulation and free flight.

## Integrate into the portfolio

For each HTML page (`index.html`, `academics.html`, `achievements.html`), place in `<head>`:

```html
<link rel="stylesheet" href="butterfly3d.css?v=3.0.0">
<script type="importmap">
{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.180.0/examples/jsm/"}}
</script>
<script type="module" src="butterfly3d.js?v=3.0.0"></script>
```

This is an additive integration: existing portfolio navigation, photo stack, video, and text remain untouched.

## Controls and behavior

- Autonomous curved patrol with smooth arrival and banking, inspired by the flight behavior of the bee on Léo Parpeix’s portfolio.
- Fast, asynchronous independent upper/lower wing flapping.
- Click/tap **non-interactive page area**: butterfly flies to that point then resumes patrol.
- Mouse near the butterfly: small reactive wobble.
- Mobile: same click/tap attraction, smaller scene size, caps pixel density.
- Reduced motion: butterfly stays approximately in one spot with minimal wing movement.
- WebGL unavailable: still butterfly image remains as a fallback.

## Accuracy and limitations

The model reuses the detailed blue/gold crystalline wing artwork from the user's recent generated reference, but its shape has been reconstructed into curved, alpha-textured meshes. It is a real 3D model whose wings move individually, though it is not a hand-sculpted manifold-quality asset. The flying motion is inspired by, not copied from, the original website. Texture details, blur glow and reflections will vary with viewer GPU and browser. A CDN connection is required for Three.js. Avoid browser autoloading from `file://`.
