import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Linear interpolation helper for fluid, organic easing
 */
function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

export function Global3DBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check reduced motion preference
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Scene, Perspective Camera, and WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 95);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // Master World Group
    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Theme detection for adaptive PBR colors
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.dataset.theme === "dark";

    let pointColor = isDark ? 0x7fd4ff : 0x0284c7;
    let lineColor = isDark ? 0x3b82f6 : 0x94a3b8;
    let geometryColor = isDark ? 0x60a5fa : 0x38bdf8;
    let accentGlowColor = isDark ? 0x38bdf8 : 0x2563eb;

    // 1. Interactive 3D Neural Lattice Particles
    const PARTICLE_COUNT = 90;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const bounds = { x: 85, y: 58, z: 50 };

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * bounds.x * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * bounds.y * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;

      velocities.push({
        x: (Math.random() - 0.5) * 0.035,
        y: (Math.random() - 0.5) * 0.035,
        z: (Math.random() - 0.5) * 0.025,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: pointColor,
      size: 2.4,
      transparent: true,
      opacity: isDark ? 0.65 : 0.42,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    worldGroup.add(particles);

    // Dynamic Connections Buffer
    const MAX_CONNECTIONS = 200;
    const linePositions = new Float32Array(MAX_CONNECTIONS * 2 * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(linePositions, 3)
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: isDark ? 0.22 : 0.14,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    worldGroup.add(lines);

    // 2. Central 3D Floating Geometric Model Group (The Hero 3D Cluster)
    // This model's rotation directly follows mouse-scrubbing with organic easing via lerp!
    const heroModelGroup = new THREE.Group();
    heroModelGroup.position.set(0, 0, -10);
    worldGroup.add(heroModelGroup);

    // Core Geodesic Wireframe Sphere
    const coreGeo = new THREE.IcosahedronGeometry(12, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: geometryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.25 : 0.16,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    heroModelGroup.add(coreMesh);

    // Inner Glowing Nucleus Octahedron
    const nucleusGeo = new THREE.OctahedronGeometry(6, 0);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: accentGlowColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.4 : 0.25,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    heroModelGroup.add(nucleusMesh);

    // Outer Orbiting Gimbal Ring 1
    const ring1Geo = new THREE.TorusGeometry(18, 0.12, 8, 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: pointColor,
      transparent: true,
      opacity: isDark ? 0.3 : 0.18,
    });
    const ring1Mesh = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1Mesh.rotation.x = Math.PI / 3;
    heroModelGroup.add(ring1Mesh);

    // Outer Orbiting Gimbal Ring 2
    const ring2Geo = new THREE.TorusGeometry(22, 0.1, 8, 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: lineColor,
      transparent: true,
      opacity: isDark ? 0.25 : 0.14,
    });
    const ring2Mesh = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2Mesh.rotation.y = Math.PI / 4;
    ring2Mesh.rotation.z = Math.PI / 6;
    heroModelGroup.add(ring2Mesh);

    // 3. Deep spatial ambient polyhedra
    const polyGroup = new THREE.Group();
    worldGroup.add(polyGroup);

    const deepIcoGeo = new THREE.IcosahedronGeometry(7, 0);
    const deepIcoMat = new THREE.MeshBasicMaterial({
      color: geometryColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.14 : 0.08,
    });
    const deepIco = new THREE.Mesh(deepIcoGeo, deepIcoMat);
    deepIco.position.set(-42, 22, -35);
    polyGroup.add(deepIco);

    const deepOctGeo = new THREE.OctahedronGeometry(6, 0);
    const deepOctMat = new THREE.MeshBasicMaterial({
      color: pointColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.14 : 0.07,
    });
    const deepOct = new THREE.Mesh(deepOctGeo, deepOctMat);
    deepOct.position.set(44, -18, -30);
    polyGroup.add(deepOct);

    // Mouse Scrubbing State
    // Target rotation values set by mouse interaction
    let targetRotationX = 0;
    let targetRotationY = 0;
    let targetRotationZ = 0;

    // Current rotation values interpolated via lerp
    let currentRotationX = 0;
    let currentRotationY = 0;
    let currentRotationZ = 0;

    // Camera parallax targets
    let targetCameraX = 0;
    let targetCameraY = 0;
    let currentCameraX = 0;
    let currentCameraY = 0;

    // Scroll parallax
    let targetScrollY = 0;
    let currentScrollY = 0;

    // Pointer move listener for mouse-scrubbing rotation
    const handlePointerMove = (e: MouseEvent) => {
      const winW = window.innerWidth || 1200;
      const winH = window.innerHeight || 800;

      // Normalized coordinates (-1 to +1) across viewport
      const normX = (e.clientX / winW) * 2 - 1;
      const normY = (e.clientY / winH) * 2 - 1;

      // Mouse-scrubbing rotational targets:
      // Moving mouse left/right scrubs the 3D model's Y rotation up to ±1.4 radians (~80 degrees)
      // Moving mouse up/down scrubs the 3D model's X rotation up to ±0.9 radians (~50 degrees)
      targetRotationY = normX * 1.45;
      targetRotationX = normY * 0.95;
      targetRotationZ = -normX * 0.45;

      // Parallax camera offset targets
      targetCameraX = normX * 12;
      targetCameraY = -normY * 8;
    };

    // Scroll parallax listener
    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const scrollRatio = window.scrollY / maxScroll;
      targetScrollY = scrollRatio * 24;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Theme changes observer for seamless dark/light responsiveness
    const themeObserver = new MutationObserver(() => {
      const isNowDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.dataset.theme === "dark";

      const pCol = isNowDark ? 0x7fd4ff : 0x0284c7;
      const lCol = isNowDark ? 0x3b82f6 : 0x94a3b8;
      const gCol = isNowDark ? 0x60a5fa : 0x38bdf8;
      const aCol = isNowDark ? 0x38bdf8 : 0x2563eb;

      particleMaterial.color.setHex(pCol);
      particleMaterial.opacity = isNowDark ? 0.65 : 0.42;
      particleMaterial.blending = isNowDark ? THREE.AdditiveBlending : THREE.NormalBlending;

      lineMaterial.color.setHex(lCol);
      lineMaterial.opacity = isNowDark ? 0.22 : 0.14;
      lineMaterial.blending = isNowDark ? THREE.AdditiveBlending : THREE.NormalBlending;

      coreMat.color.setHex(gCol);
      coreMat.opacity = isNowDark ? 0.25 : 0.16;

      nucleusMat.color.setHex(aCol);
      nucleusMat.opacity = isNowDark ? 0.4 : 0.25;

      ring1Mat.color.setHex(pCol);
      ring1Mat.opacity = isNowDark ? 0.3 : 0.18;

      ring2Mat.color.setHex(lCol);
      ring2Mat.opacity = isNowDark ? 0.25 : 0.14;

      deepIcoMat.color.setHex(gCol);
      deepIcoMat.opacity = isNowDark ? 0.14 : 0.08;

      deepOctMat.color.setHex(pCol);
      deepOctMat.opacity = isNowDark ? 0.14 : 0.07;
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // Main requestAnimationFrame Animation Loop with lerp easing
    let animationFrameId: number;
    let lastTime = performance.now();
    let idleRotationTime = 0;

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      idleRotationTime += delta;

      // 1. Organic easing via lerp:
      // The 3D model's rotation smoothly tracks cursor movement instead of direct pixel mapping!
      // A 0.055 lerp factor gives a fluid, inertia-based cinematic ease-out curve.
      currentRotationX = lerp(currentRotationX, targetRotationX, 0.055);
      currentRotationY = lerp(currentRotationY, targetRotationY, 0.055);
      currentRotationZ = lerp(currentRotationZ, targetRotationZ, 0.055);

      // Camera parallax lerp
      currentCameraX = lerp(currentCameraX, targetCameraX, 0.045);
      currentCameraY = lerp(currentCameraY, targetCameraY, 0.045);
      currentScrollY = lerp(currentScrollY, targetScrollY, 0.05);

      // Apply camera position
      camera.position.x = currentCameraX;
      camera.position.y = currentCameraY - currentScrollY;
      camera.lookAt(0, -currentScrollY * 0.4, 0);

      // 2. Apply mouse-scrubbed rotations to the 3D Hero Model Group
      // Combines mouse-scrubbing rotation with gentle ambient idle float
      heroModelGroup.rotation.x = currentRotationX;
      heroModelGroup.rotation.y = currentRotationY + idleRotationTime * 0.15;
      heroModelGroup.rotation.z = currentRotationZ;

      // Independent multi-axis gimbal rotations inside the hero cluster
      coreMesh.rotation.y = lerp(coreMesh.rotation.y, currentRotationY * 1.4, 0.06);
      nucleusMesh.rotation.x = lerp(nucleusMesh.rotation.x, -currentRotationX * 1.8, 0.07);
      nucleusMesh.rotation.y += delta * 0.4;
      ring1Mesh.rotation.z += delta * 0.25;
      ring2Mesh.rotation.y -= delta * 0.2;

      // Deep spatial polyhedra rotation
      deepIco.rotation.x = lerp(deepIco.rotation.x, currentRotationX * 0.8, 0.05) + idleRotationTime * 0.1;
      deepIco.rotation.y = lerp(deepIco.rotation.y, currentRotationY * 0.8, 0.05) + idleRotationTime * 0.12;

      deepOct.rotation.y = lerp(deepOct.rotation.y, -currentRotationY * 0.9, 0.05) - idleRotationTime * 0.14;
      deepOct.rotation.z = lerp(deepOct.rotation.z, currentRotationZ * 0.9, 0.05);

      // 3. Update particle lattice positions and connection lines
      const pos = particleGeometry.attributes.position.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const idx = i * 3;
        pos[idx] += velocities[i].x;
        pos[idx + 1] += velocities[i].y;
        pos[idx + 2] += velocities[i].z;

        // Soft bounce boundaries
        if (Math.abs(pos[idx]) > bounds.x) velocities[i].x *= -1;
        if (Math.abs(pos[idx + 1]) > bounds.y) velocities[i].y *= -1;
        if (Math.abs(pos[idx + 2]) > bounds.z) velocities[i].z *= -1;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Recompute dynamic nearest-neighbor line segments
      let lineIndex = 0;
      const MAX_DIST = 21;
      const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

      for (let i = 0; i < PARTICLE_COUNT && lineIndex < MAX_CONNECTIONS; i++) {
        const i3 = i * 3;
        const x1 = pos[i3];
        const y1 = pos[i3 + 1];
        const z1 = pos[i3 + 2];

        for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < MAX_CONNECTIONS; j++) {
          const j3 = j * 3;
          const dx = x1 - pos[j3];
          const dy = y1 - pos[j3 + 1];
          const dz = z1 - pos[j3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < MAX_DIST_SQ) {
            const l6 = lineIndex * 6;
            linePositions[l6] = x1;
            linePositions[l6 + 1] = y1;
            linePositions[l6 + 2] = z1;
            linePositions[l6 + 3] = pos[j3];
            linePositions[l6 + 4] = pos[j3 + 1];
            linePositions[l6 + 5] = pos[j3 + 2];
            lineIndex++;
          }
        }
      }

      // Clear unused line indices
      for (let k = lineIndex * 6; k < MAX_CONNECTIONS * 6; k++) {
        linePositions[k] = 0;
      }
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);

      // Render 3D Scene
      renderer.render(scene, camera);
    };

    // Kick off animation loop
    animationFrameId = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();

      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      deepIcoGeo.dispose();
      deepIcoMat.dispose();
      deepOctGeo.dispose();
      deepOctMat.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden opacity-60 dark:opacity-75 transition-opacity duration-500"
      aria-hidden="true"
    />
  );
}
