/**
 * NASH — Interactive 3D butterfly mascot
 * A curved, textured GLB, not an image/GIF or a single billboard plane.
 * Independent wing articulation, autonomous curved pursuit flight, pointer response.
 * MIT-compatible original integration code; texture uses user-provided artwork.
 *
 * Expects importmap: "three" and "three/addons/" pointing to matching releases.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const isDemo = document.body?.dataset.butterflyDemo === 'true';
const page = document.body?.dataset.page || 'home';
const layout = {
  home: { x: 0.53, y: 0.42 },
  academics: { x: 0.62, y: 0.48 },
  achievements: { x: 0.62, y: 0.48 },
  demo: { x: 0.51, y: 0.47 }
}[isDemo ? 'demo' : page] || { x: 0.55, y: 0.4 };

function mountButterfly() {
  if (!document.body || document.getElementById('nash-flying-butterfly')) return;

  const holder = document.createElement('div');
  holder.id = 'nash-flying-butterfly';
  holder.className = 'nash-flying-butterfly';
  holder.setAttribute('aria-hidden', 'true');
  document.body.appendChild(holder);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  } catch (error) {
    console.warn('3D butterfly unavailable; page navigation remains usable.', error);
    holder.remove();
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.24;
  renderer.setClearColor(0x000000, 0);
  holder.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 50);
  camera.position.set(0, 0, 10.2);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xbfe6ff, 0x0a0031, 2.7));
  const key = new THREE.PointLight(0x76dbff, 65, 20);
  key.position.set(2.5, 3.5, 5.5);
  scene.add(key);
  const rim = new THREE.PointLight(0xaf67ff, 40, 16);
  rim.position.set(-4, -1, 2);
  scene.add(rim);

  // The reference bee uses a pursuer that anticipates a moving, wandering evader.
  // We reproduce that steering behaviour for the original butterfly GLB,
  // rather than a deterministic scroll curve, slow hover, or mouse-follow tween.
  let width = window.innerWidth;
  let height = window.innerHeight;
  let size = 235;
  let limits;
  const flight = { x: width * layout.x, y: height * layout.y, vx: 0, vy: 0 };
  const evader = { x: width * .36, y: height * .37, vx: 0, vy: 0 };
  const evaderGoal = { x: width * .72, y: height * .6 };
  const pointer = { x: -10000, y: -10000, seenAt: -10000 };
  let lure = null;
  let nextGoalAt = 0;
  let flightTime = 0;
  let previousTime = performance.now();
  let frame = null;
  let disposed = false;
  let model = null;
  let wingParts = [];
  let loaded = false;
  let quietRendered = false;

  const clamp = THREE.MathUtils.clamp;
  const length2 = (x, y) => Math.hypot(x, y);

  function measure() {
    width = window.innerWidth;
    height = window.innerHeight;
    size = Math.max(126, Math.min(298, width * (width < 650 ? .29 : .19)));
    if (isDemo) size = Math.max(180, Math.min(440, width * .34));
    holder.style.width = size + 'px';
    holder.style.height = size + 'px';
    renderer.setSize(size, size, false);
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    const navHeight = document.querySelector('.navbar')?.getBoundingClientRect().height || 0;
    const horizontal = Math.min(width * .25, size * .48 + 12);
    const vertical = Math.min(height * .27, size * .46 + 12);
    limits = {
      left: horizontal,
      right: Math.max(horizontal + 1, width - horizontal),
      top: Math.min(height * .55, Math.max(navHeight + size * .25, vertical)),
      bottom: Math.max(height * .55 + 1, height - vertical)
    };
    for (const entity of [flight, evader, evaderGoal]) {
      entity.x = clamp(entity.x, limits.left, limits.right);
      entity.y = clamp(entity.y, limits.top, limits.bottom);
    }
    quietRendered = false;
  }

  function stayInView(entity) {
    if (entity.x <= limits.left || entity.x >= limits.right) {
      entity.vx *= -0.45;
      entity.x = clamp(entity.x, limits.left, limits.right);
    }
    if (entity.y <= limits.top || entity.y >= limits.bottom) {
      entity.vy *= -0.45;
      entity.y = clamp(entity.y, limits.top, limits.bottom);
    }
  }

  function chooseEvaderGoal() {
    // Frequent but smooth changes create unpredictable, curving insect flight.
    let x = evader.x;
    let y = evader.y;
    const minTravel = Math.min(width, height) * .22;
    for (let attempt = 0; attempt < 7; attempt++) {
      x = limits.left + Math.random() * (limits.right - limits.left);
      y = limits.top + Math.random() * (limits.bottom - limits.top);
      if (Math.hypot(x - evader.x, y - evader.y) > minTravel) break;
    }
    evaderGoal.x = x;
    evaderGoal.y = y;
    nextGoalAt = flightTime + 1.5 + Math.random() * 2.3;
  }

  // Acceleration-limited seek / arrive, equivalent to the core steering used
  // by the bee's autonomous prey and its faster pursuer.
  function steer(entity, goal, maxSpeed, maxAcceleration, slowRadius, dt) {
    const dx = goal.x - entity.x;
    const dy = goal.y - entity.y;
    const distance = length2(dx, dy) || 1;
    const targetSpeed = maxSpeed * Math.min(1, distance / slowRadius);
    let forceX = dx / distance * targetSpeed - entity.vx;
    let forceY = dy / distance * targetSpeed - entity.vy;
    const forceLength = length2(forceX, forceY);
    if (forceLength > maxAcceleration * dt && forceLength > 0) {
      const factor = maxAcceleration * dt / forceLength;
      forceX *= factor;
      forceY *= factor;
    }
    entity.vx += forceX;
    entity.vy += forceY;
    const speed = length2(entity.vx, entity.vy);
    if (speed > maxSpeed) {
      entity.vx *= maxSpeed / speed;
      entity.vy *= maxSpeed / speed;
    }
    entity.x += entity.vx * dt;
    entity.y += entity.vy * dt;
    stayInView(entity);
  }

  function onPointerMove(event) {
    if (event.pointerType === 'touch') return;
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.seenAt = performance.now();
  }

  function onClick(event) {
    if (!event.isTrusted || reduceMotion.matches) return;
    if (event.target.closest('a, button, input, textarea, select, [role="button"]')) return;
    // As when feeding the reference bee, a click calls the character to a spot.
    // This deliberately does not create fruit or change the actual page content.
    lure = {
      x: clamp(event.clientX, limits.left, limits.right),
      y: clamp(event.clientY, limits.top, limits.bottom),
      until: flightTime + 3.3
    };
  }

  function updateFlight(dt, now) {
    const unit = Math.min(width, height);
    // Motion is viewport-scaled rather than artificially constrained to 68px/s.
    const maxSpeed = clamp(width * .25, 190, 465);
    const evaderSpeed = clamp(width * .145, 105, 265);
    const maxAcceleration = clamp(width * .67, 390, 1050);
    const evaderAcceleration = clamp(width * .38, 190, 570);

    if (flightTime >= nextGoalAt || length2(evaderGoal.x - evader.x, evaderGoal.y - evader.y) < 42) {
      chooseEvaderGoal();
    }
    steer(evader, evaderGoal, evaderSpeed, evaderAcceleration, unit * .12, dt);

    const distanceToEvader = length2(evader.x - flight.x, evader.y - flight.y);
    const evaderVelocity = length2(evader.vx, evader.vy);
    const lookAhead = clamp(distanceToEvader / (maxSpeed + evaderVelocity + 1), .05, .95);
    let goalX = clamp(evader.x + evader.vx * lookAhead, limits.left, limits.right);
    let goalY = clamp(evader.y + evader.vy * lookAhead, limits.top, limits.bottom);

    if (lure && flightTime < lure.until) {
      goalX = lure.x;
      goalY = lure.y;
      if (Math.hypot(lure.x - flight.x, lure.y - flight.y) < 36) lure.until = flightTime + .3;
    } else {
      lure = null;
    }
    steer(flight, { x: goalX, y: goalY }, maxSpeed, maxAcceleration, 68, dt);

    // Proximity reaction: real bee-like swerving, not a permanent mouse tether.
    if (now - pointer.seenAt < 1800) {
      const dx = flight.x - pointer.x;
      const dy = flight.y - pointer.y;
      const dist = length2(dx, dy);
      const radius = Math.max(120, Math.min(size * .6, 195));
      if (dist < radius) {
        const strength = Math.pow(1 - dist / radius, 1.3);
        const angle = dist > 1 ? Math.atan2(dy, dx) : flightTime * 8;
        flight.vx += Math.cos(angle) * strength * maxAcceleration * dt * 1.55;
        flight.vy += Math.sin(angle) * strength * maxAcceleration * dt * 1.55;
        const speed = length2(flight.vx, flight.vy);
        if (speed > maxSpeed) {
          flight.vx = flight.vx / speed * maxSpeed;
          flight.vy = flight.vy / speed * maxSpeed;
        }
      }
    }
  }

  const wingNames = ['Wing_L_Upper', 'Wing_R_Upper', 'Wing_L_Lower', 'Wing_R_Lower'];
  new GLTFLoader().load('assets/crystal-butterfly.glb?v=3.0.0', (gltf) => {
    if (disposed) return;
    model = gltf.scene;
    model.scale.setScalar(.88);
    scene.add(model);
    wingParts = wingNames.map(name => model.getObjectByName(name)).filter(Boolean).map(mesh => ({
      mesh, baseX: mesh.rotation.x, baseY: mesh.rotation.y
    }));
    loaded = true;
    holder.classList.add('is-loaded');
    document.body.classList.add('has-live-butterfly-3d');
  }, undefined, error => {
    console.warn('3D butterfly model unavailable.', error);
    holder.remove();
    renderer.dispose();
  });

  function tick(now) {
    frame = requestAnimationFrame(tick);
    if (disposed || !loaded || document.hidden) {
      previousTime = now;
      return;
    }
    const dt = Math.min(.045, Math.max(0, (now - previousTime) / 1000));
    previousTime = now;
    const quiet = reduceMotion.matches;
    if (quiet && quietRendered) return;
    flightTime += dt;

    if (quiet) {
      flight.x = clamp(width * layout.x, limits.left, limits.right);
      flight.y = clamp(height * layout.y, limits.top, limits.bottom);
      flight.vx = flight.vy = 0;
    } else {
      updateFlight(dt, now);
    }

    // Animation and banking follow the actual velocity, rather than a fixed sine path.
    const bob = quiet ? 0 : Math.sin(flightTime * 4.2) * 4.7;
    holder.style.transform = 'translate3d(' +
      (flight.x - size / 2).toFixed(1) + 'px,' +
      (flight.y - size / 2 + bob).toFixed(1) + 'px,0)';
    const beat = quiet ? 0 : Math.cos(flightTime * 27) * .70;
    for (const wing of wingParts) {
      const left = wing.mesh.name.includes('_L_');
      const lower = wing.mesh.name.includes('Lower');
      const amount = (lower ? .71 : 1) * beat;
      wing.mesh.rotation.y = wing.baseY + (left ? 1 : -1) * (.11 + amount);
      wing.mesh.rotation.x = wing.baseX + (lower ? 1 : -1) *
        (quiet ? 0 : Math.sin(flightTime * 27 + .65) * .055);
    }
    if (model) {
      const speed = length2(flight.vx, flight.vy);
      const movementX = speed > 1 ? flight.vx / speed : 0;
      const movementY = speed > 1 ? flight.vy / speed : 0;
      const smooth = 1 - Math.exp(-dt * 7);
      const z = quiet ? 0 : -movementX * .52 + Math.sin(flightTime * 3.1) * .035;
      const y = quiet ? 0 : movementX * .63;
      const x = quiet ? 0 : -movementY * .38;
      model.rotation.z += (z - model.rotation.z) * smooth;
      model.rotation.y += (y - model.rotation.y) * smooth;
      model.rotation.x += (x - model.rotation.x) * smooth;
      model.scale.setScalar(.88 * (quiet ? 1 : 1 + Math.sin(flightTime * 3.6) * .024));
    }
    renderer.render(scene, camera);
    quietRendered = quiet;
  }

  function onReducedMotionChange() {
    quietRendered = false;
    previousTime = performance.now();
  }

  measure();
  chooseEvaderGoal();
  window.addEventListener('resize', measure, { passive: true });
  document.addEventListener('pointermove', onPointerMove, { passive: true });
  document.addEventListener('click', onClick, { passive: true });
  reduceMotion.addEventListener('change', onReducedMotionChange);
  frame = requestAnimationFrame(tick);

  window.addEventListener('pagehide', () => {
    disposed = true;
    cancelAnimationFrame(frame);
    window.removeEventListener('resize', measure);
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('click', onClick);
    reduceMotion.removeEventListener('change', onReducedMotionChange);
    renderer.dispose();
  }, { once: true });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountButterfly, { once: true });
else mountButterfly();
