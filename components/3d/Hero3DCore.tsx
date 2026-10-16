import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface Hero3DCoreProps {
  className?: string;
}

export function Hero3DCore({ className }: Hero3DCoreProps = {}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    container.appendChild(renderer.domElement);

    // Group for entire 3D Core
    const coreGroup = new THREE.Group();
    coreGroup.position.y = 0.2; // center visually with shadow below
    scene.add(coreGroup);

    // Theme detection
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.dataset.theme === "dark";

    const primaryColor = isDark ? 0x7fd4ff : 0x0284c7;
    const accentColor = isDark ? 0x3b82f6 : 0x2563eb;
    const highlightColor = isDark ? 0x93c5fd : 0x0369a1;

    // 1. Inner Core: Geodesic Icosahedron Wireframe
    const coreGeo = new THREE.IcosahedronGeometry(1.35, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      wireframe: true,
      roughness: 0.25,
      metalness: 0.85,
      transparent: true,
      opacity: isDark ? 0.85 : 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // 2. Inner Solid Crystalline Nucleus
    const nucleusGeo = new THREE.SphereGeometry(0.68, 28, 28);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: accentColor,
      roughness: 0.18,
      metalness: 0.9,
      emissive: primaryColor,
      emissiveIntensity: isDark ? 0.4 : 0.2,
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleusMesh);

    // 3. Gimbal Orbital Ring 1 (Inner Gyro)
    const ring1Geo = new THREE.TorusGeometry(2.05, 0.04, 16, 96);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      metalness: 0.92,
      roughness: 0.18,
      transparent: true,
      opacity: isDark ? 0.8 : 0.65,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    // 4. Gimbal Orbital Ring 2 (Outer Gyro)
    const ring2Geo = new THREE.TorusGeometry(2.45, 0.035, 16, 96);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: accentColor,
      metalness: 0.88,
      roughness: 0.25,
      transparent: true,
      opacity: isDark ? 0.7 : 0.55,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.z = Math.PI / 6;
    coreGroup.add(ring2);

    // 5. Equatorial Coordinate Ring with ticks
    const ring3Geo = new THREE.TorusGeometry(2.75, 0.02, 12, 80);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: highlightColor,
      metalness: 0.8,
      roughness: 0.3,
      transparent: true,
      opacity: isDark ? 0.5 : 0.4,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 2;
    coreGroup.add(ring3);

    // 6. Orbiting Data Satellites (InstancedMesh)
    const SATELLITE_COUNT = 14;
    const satelliteGeo = new THREE.OctahedronGeometry(0.12);
    const satelliteMat = new THREE.MeshStandardMaterial({
      color: primaryColor,
      metalness: 0.95,
      roughness: 0.1,
      emissive: primaryColor,
      emissiveIntensity: isDark ? 0.5 : 0.25,
    });

    const satellites = new THREE.InstancedMesh(
      satelliteGeo,
      satelliteMat,
      SATELLITE_COUNT
    );
    coreGroup.add(satellites);

    const dummy = new THREE.Object3D();
    const satelliteSpeeds: number[] = [];
    const satelliteRadii: number[] = [];
    const satelliteOffsets: number[] = [];

    for (let i = 0; i < SATELLITE_COUNT; i++) {
      satelliteSpeeds.push(0.4 + Math.random() * 0.6);
      satelliteRadii.push(2.55 + Math.random() * 0.7);
      satelliteOffsets.push(Math.random() * Math.PI * 2);
    }

    // 7. Contact Shadow Grounding Plane (per Three.js skill)
    // Procedural soft radial gradient shadow texture
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, isDark ? "rgba(2, 6, 23, 0.75)" : "rgba(15, 23, 42, 0.35)");
      grad.addColorStop(0.5, isDark ? "rgba(2, 6, 23, 0.3)" : "rgba(15, 23, 42, 0.12)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;

    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: isDark ? 0.8 : 0.6,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.3;
    scene.add(shadowPlane);

    // 3-Point Studio Lighting Rig
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(5, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(accentColor, 2.0);
    fillLight.position.set(-5, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(primaryColor, 1.6);
    rimLight.position.set(0, 6, -5);
    scene.add(rimLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambLight);

    // Pointer Interactivity (Hover + Drag Orbit)
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let dragRotX = 0;
    let dragRotY = 0;

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        dragRotY += deltaX * 0.008;
        dragRotX += deltaY * 0.008;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      } else {
        targetRotY = x * 0.55;
        targetRotX = -y * 0.55;
      }
    };

    const handlePointerUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("mouseup", handlePointerUp);

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        prevPointerX = e.touches[0].clientX;
        prevPointerY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevPointerX;
        const deltaY = e.touches[0].clientY - prevPointerY;
        dragRotY += deltaX * 0.01;
        dragRotX += deltaY * 0.01;
        prevPointerX = e.touches[0].clientX;
        prevPointerY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Handle Resize with ResizeObserver
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    }
    window.addEventListener("resize", handleResize);

    // Theme changes observer
    const themeObserver = new MutationObserver(() => {
      const isNowDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.dataset.theme === "dark";

      const pColor = isNowDark ? 0x7fd4ff : 0x0284c7;
      const aColor = isNowDark ? 0x3b82f6 : 0x2563eb;
      const hColor = isNowDark ? 0x93c5fd : 0x0369a1;

      coreMat.color.setHex(pColor);
      coreMat.opacity = isNowDark ? 0.85 : 0.75;
      nucleusMat.color.setHex(aColor);
      nucleusMat.emissive.setHex(pColor);
      nucleusMat.emissiveIntensity = isNowDark ? 0.4 : 0.2;
      ring1Mat.color.setHex(pColor);
      ring2Mat.color.setHex(aColor);
      ring3Mat.color.setHex(hColor);
      satelliteMat.color.setHex(pColor);
      satelliteMat.emissive.setHex(pColor);
      fillLight.color.setHex(aColor);
      rimLight.color.setHex(pColor);

      // Redraw shadow texture
      if (shadowCtx) {
        shadowCtx.clearRect(0, 0, 128, 128);
        const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, isNowDark ? "rgba(2, 6, 23, 0.75)" : "rgba(15, 23, 42, 0.35)");
        grad.addColorStop(0.5, isNowDark ? "rgba(2, 6, 23, 0.3)" : "rgba(15, 23, 42, 0.12)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        shadowCtx.fillStyle = grad;
        shadowCtx.fillRect(0, 0, 128, 128);
        shadowTex.needsUpdate = true;
      }
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // Animation loop with exponential damping (per Three.js skill)
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth damping rotation to pointer + drag offset
      const currentTargetY = targetRotY + dragRotY;
      const currentTargetX = targetRotX + dragRotX;

      coreGroup.rotation.y += (currentTargetY - coreGroup.rotation.y) * 0.06;
      coreGroup.rotation.x += (currentTargetX - coreGroup.rotation.x) * 0.06;

      // Continuous internal kinematics
      coreMesh.rotation.y += delta * 0.35;
      coreMesh.rotation.x += delta * 0.2;

      ring1.rotation.z += delta * 0.45;
      ring2.rotation.x -= delta * 0.38;
      ring3.rotation.z += delta * 0.15;

      // Orbiting satellites
      for (let i = 0; i < SATELLITE_COUNT; i++) {
        const angle = time * 0.001 * satelliteSpeeds[i] + satelliteOffsets[i];
        const r = satelliteRadii[i];
        dummy.position.set(
          Math.cos(angle) * r,
          Math.sin(angle * 1.5) * 0.65,
          Math.sin(angle) * r
        );
        dummy.rotation.x += delta * 2;
        dummy.rotation.y += delta * 2;
        dummy.updateMatrix();
        satellites.setMatrixAt(i, dummy.matrix);
      }
      satellites.instanceMatrix.needsUpdate = true;

      // Subtle pulse to nucleus
      const pulse = 1 + Math.sin(time * 0.003) * 0.04;
      nucleusMesh.scale.set(pulse, pulse, pulse);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();

      coreGeo.dispose();
      coreMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      satelliteGeo.dispose();
      satelliteMat.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTex.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative select-none ${
        isInteracting ? "cursor-grabbing" : "cursor-grab"
      } ${
        className ||
        "mx-auto h-[250px] w-[250px] sm:h-[300px] sm:w-[300px] md:h-[340px] md:w-[340px] transition-transform duration-300 hover:scale-[1.03]"
      }`}
      title="Interactive 3D Deterministic AI Core — Click and drag to orbit in 3D"
    />
  );
}

export const Interactive3DCore = Hero3DCore;
