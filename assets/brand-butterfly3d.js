/**
 * Nash — stationary 3D butterfly header mark.
 * Render the original crystal-butterfly GLB once, then only when resized.
 * No animation frames, flapping, floating, or rotation loops.
 * The enhanced butterfly image stays visible if WebGL or the model fails.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

function mountStaticBrandButterfly() {
  const holder = document.querySelector('.brand-butterfly');
  if (!holder || holder.dataset.webglMounted === 'true') return;
  holder.dataset.webglMounted = 'true';

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'low-power'
    });
  } catch (error) {
    console.info('Header butterfly: displaying static fallback.', error);
    return;
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.25));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.28;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.1, 50);
  camera.position.set(0, 0, 10);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xd6f3ff, 0x160a39, 3));

  const key = new THREE.PointLight(0x8edfff, 34, 18);
  key.position.set(3, 3, 6);
  scene.add(key);
  const rim = new THREE.PointLight(0xb985ff, 21, 18);
  rim.position.set(-3, -1, 4);
  scene.add(rim);

  const butterfly = new THREE.Group();
  scene.add(butterfly);
  const canvas = renderer.domElement;
  canvas.setAttribute('aria-hidden', 'true');
  holder.appendChild(canvas);

  let modelReady = false;
  let disposed = false;

  function renderStill() {
    if (!modelReady || disposed) return;
    const width = Math.max(1, Math.round(holder.clientWidth));
    const height = Math.max(1, Math.round(holder.clientHeight));
    renderer.setSize(width, height, false);
    const aspect = width / height;
    camera.left = -2 * aspect;
    camera.right = 2 * aspect;
    camera.top = 2;
    camera.bottom = -2;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    holder.classList.add('is-3d-ready');
  }

  function useFallback() {
    holder.classList.remove('is-3d-ready');
    canvas.remove();
    if (!disposed) renderer.dispose();
  }

  const loader = new GLTFLoader();
  loader.load('assets/crystal-butterfly.glb?v=3.0.0', (gltf) => {
    if (disposed) return;
    const model = gltf.scene;
    const bounds = new THREE.Box3().setFromObject(model);
    if (bounds.isEmpty()) {
      useFallback();
      return;
    }

    const dimensions = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    model.position.sub(center);
    butterfly.scale.setScalar(3.25 / Math.max(dimensions.x, dimensions.y, 0.001));
    butterfly.add(model);

    // Symmetric, permanently open-wing pose. Never advance animation.
    const wingNames = ['Wing_L_Upper', 'Wing_R_Upper', 'Wing_L_Lower', 'Wing_R_Lower'];
    for (const name of wingNames) {
      const wing = model.getObjectByName(name);
      if (!wing) continue;
      const left = name.includes('_L_');
      const lower = name.includes('Lower');
      wing.rotation.y += (left ? 1 : -1) * (lower ? 0.12 : 0.16);
    }
    butterfly.rotation.set(0, -0.10, 0.015);
    butterfly.position.set(0, 0, 0);
    modelReady = true;

    try { renderStill(); } catch (error) {
      console.warn('Static 3D brand render failed; image fallback remains.', error);
      useFallback();
    }
  }, undefined, (error) => {
    console.info('Header 3D model unavailable; using image fallback.', error);
    useFallback();
  });

  const onResize = () => {
    if (!modelReady) return;
    try { renderStill(); } catch (error) { useFallback(); }
  };
  window.addEventListener('resize', onResize, { passive: true });

  window.addEventListener('pagehide', () => {
    disposed = true;
    window.removeEventListener('resize', onResize);
    renderer.dispose();
  }, { once: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountStaticBrandButterfly, { once: true });
} else {
  mountStaticBrandButterfly();
}
