import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface InteractiveRobot3DProps {
  className?: string;
}

export function InteractiveRobot3D({ className }: InteractiveRobot3DProps = {}) {
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

    const width = container.clientWidth || 460;
    const height = container.clientHeight || 540;

    const scene = new THREE.Scene();
    // Camera set with comfortable FOV and distance to completely prevent clipping
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.22, 6.7);

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
    renderer.domElement.style.overflow = "visible";
    container.appendChild(renderer.domElement);

    // Master Group for entire floating robot
    const robotRoot = new THREE.Group();
    robotRoot.position.y = -0.08;
    scene.add(robotRoot);

    // Theme detection
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.dataset.theme === "dark";

    // High-End Tech Palette
    let pearlColor = isDark ? 0x0b1120 : 0xffffff;
    let graphiteTrim = isDark ? 0x1e293b : 0x0f172a;
    let chromeMetal = isDark ? 0x475569 : 0x94a3b8;
    let visorColor = 0x030712; // Ultra-deep obsidian black OLED
    let cyanGlow = isDark ? 0x38bdf8 : 0x0284c7;
    let coreGlow = isDark ? 0x00f0ff : 0x0369a1;

    // Materials with rich specular highlights
    const bodyMat = new THREE.MeshStandardMaterial({
      color: pearlColor,
      roughness: isDark ? 0.3 : 0.16,
      metalness: isDark ? 0.4 : 0.18,
    });

    const trimMat = new THREE.MeshStandardMaterial({
      color: graphiteTrim,
      roughness: 0.28,
      metalness: 0.65,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: chromeMetal,
      roughness: 0.18,
      metalness: 0.88,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: visorColor,
      roughness: 0.06,
      metalness: 0.95,
    });

    const eyeMat = new THREE.MeshStandardMaterial({
      color: cyanGlow,
      emissive: cyanGlow,
      emissiveIntensity: isDark ? 3.2 : 2.6,
      roughness: 0.1,
      metalness: 0.1,
    });

    const coreLightMat = new THREE.MeshStandardMaterial({
      color: coreGlow,
      emissive: coreGlow,
      emissiveIntensity: isDark ? 3.0 : 2.4,
      roughness: 0.12,
      metalness: 0.15,
    });

    const seamGlowMat = new THREE.MeshBasicMaterial({
      color: cyanGlow,
      transparent: true,
      opacity: isDark ? 0.85 : 0.65,
      blending: THREE.AdditiveBlending,
    });

    const thrusterFlameMat = new THREE.MeshBasicMaterial({
      color: cyanGlow,
      transparent: true,
      opacity: isDark ? 0.7 : 0.45,
      blending: THREE.AdditiveBlending,
    });

    // ==========================================
    // 1. TORSO ASSEMBLY (Streamlined Tech Chassis)
    // ==========================================
    const torsoGroup = new THREE.Group();
    robotRoot.add(torsoGroup);

    // Sculpted Aerodynamic Chest Shell
    const chestGeo = new THREE.SphereGeometry(0.72, 36, 36);
    chestGeo.scale(1.0, 1.15, 0.82);
    const chestMesh = new THREE.Mesh(chestGeo, bodyMat);
    chestMesh.position.y = 0.45;
    torsoGroup.add(chestMesh);

    // Graphite Collar Shield
    const collarGeo = new THREE.TorusGeometry(0.38, 0.05, 16, 36);
    collarGeo.rotateX(Math.PI / 2);
    const collarMesh = new THREE.Mesh(collarGeo, trimMat);
    collarMesh.position.y = 1.15;
    torsoGroup.add(collarMesh);

    // Chest Breastplate Bezel
    const breastplateGeo = new THREE.CylinderGeometry(0.48, 0.42, 0.55, 32);
    breastplateGeo.scale(1, 1, 0.46);
    const breastplateMesh = new THREE.Mesh(breastplateGeo, trimMat);
    breastplateMesh.position.set(0, 0.48, 0.45);
    torsoGroup.add(breastplateMesh);

    // Glowing Reactor Core with Gyro Ring
    const gyroRingGeo = new THREE.TorusGeometry(0.2, 0.024, 16, 32);
    const gyroRing = new THREE.Mesh(gyroRingGeo, chromeMat);
    gyroRing.position.set(0, 0.48, 0.63);
    torsoGroup.add(gyroRing);

    const reactorCoreGeo = new THREE.SphereGeometry(0.13, 24, 24);
    reactorCoreGeo.scale(1, 1, 0.4);
    const reactorCoreMesh = new THREE.Mesh(reactorCoreGeo, coreLightMat);
    reactorCoreMesh.position.set(0, 0.48, 0.63);
    torsoGroup.add(reactorCoreMesh);

    // Linear Circuit Seams on chest
    const chestSeamGeo = new THREE.BoxGeometry(0.025, 0.35, 0.02);
    const leftChestSeam = new THREE.Mesh(chestSeamGeo, seamGlowMat);
    leftChestSeam.position.set(-0.35, 0.45, 0.52);
    leftChestSeam.rotation.z = -0.15;
    torsoGroup.add(leftChestSeam);

    const rightChestSeam = new THREE.Mesh(chestSeamGeo, seamGlowMat);
    rightChestSeam.position.set(0.35, 0.45, 0.52);
    rightChestSeam.rotation.z = 0.15;
    torsoGroup.add(rightChestSeam);

    // Lower Pelvis & Waist Belt
    const waistGeo = new THREE.SphereGeometry(0.55, 32, 32);
    waistGeo.scale(0.95, 0.7, 0.8);
    const waistMesh = new THREE.Mesh(waistGeo, bodyMat);
    waistMesh.position.y = -0.25;
    torsoGroup.add(waistMesh);

    const beltGeo = new THREE.TorusGeometry(0.52, 0.045, 16, 36);
    beltGeo.rotateX(Math.PI / 2);
    const beltMesh = new THREE.Mesh(beltGeo, trimMat);
    beltMesh.position.y = -0.05;
    torsoGroup.add(beltMesh);

    // Anti-gravity Ion Thruster
    const thrusterConeGeo = new THREE.CylinderGeometry(0.28, 0.16, 0.28, 24);
    const thrusterConeMesh = new THREE.Mesh(thrusterConeGeo, trimMat);
    thrusterConeMesh.position.y = -0.62;
    torsoGroup.add(thrusterConeMesh);

    const nozzleRingGeo = new THREE.TorusGeometry(0.16, 0.03, 16, 24);
    nozzleRingGeo.rotateX(Math.PI / 2);
    const nozzleRingMesh = new THREE.Mesh(nozzleRingGeo, coreLightMat);
    nozzleRingMesh.position.y = -0.75;
    torsoGroup.add(nozzleRingMesh);

    const flameGeo = new THREE.ConeGeometry(0.24, 0.65, 24);
    flameGeo.rotateX(Math.PI);
    const flameMesh = new THREE.Mesh(flameGeo, thrusterFlameMat);
    flameMesh.position.y = -1.1;
    torsoGroup.add(flameMesh);

    // ==========================================
    // 2. HEAD ASSEMBLY (Precise Cursor Tracking)
    // ==========================================
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 1.45, 0); // Neck pivot point
    robotRoot.add(headGroup);

    // Ball Neck Joint
    const neckBallGeo = new THREE.SphereGeometry(0.22, 24, 24);
    const neckBallMesh = new THREE.Mesh(neckBallGeo, chromeMat);
    headGroup.add(neckBallMesh);

    // Sleek Aerodynamic Helmet
    const helmetGeo = new THREE.SphereGeometry(0.74, 36, 36);
    helmetGeo.scale(1.0, 0.95, 1.05);
    const helmetMesh = new THREE.Mesh(helmetGeo, bodyMat);
    headGroup.add(helmetMesh);

    // Crown Trim Stripe
    const crownStripeGeo = new THREE.TorusGeometry(0.74, 0.035, 16, 48, Math.PI);
    crownStripeGeo.rotateY(Math.PI / 2);
    crownStripeGeo.rotateZ(Math.PI / 2);
    const crownStripeMesh = new THREE.Mesh(crownStripeGeo, trimMat);
    crownStripeMesh.position.set(0, 0.05, 0);
    headGroup.add(crownStripeMesh);

    // Visor Outer Rim
    const visorRimGeo = new THREE.TorusGeometry(0.55, 0.04, 16, 36);
    const visorRimMesh = new THREE.Mesh(visorRimGeo, trimMat);
    visorRimMesh.scale.set(1.0, 0.72, 1.0);
    visorRimMesh.position.set(0, 0, 0.44);
    headGroup.add(visorRimMesh);

    // High-Contrast Obsidian OLED Screen
    const visorGeo = new THREE.SphereGeometry(0.66, 36, 36);
    visorGeo.scale(0.88, 0.62, 0.88);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.position.set(0, -0.02, 0.18);
    headGroup.add(visorMesh);

    // Glowing Expressive Cyber Eyes Container
    const eyesContainer = new THREE.Group();
    eyesContainer.position.set(0, 0.02, 0.75);
    headGroup.add(eyesContainer);

    const eyeGeo = new THREE.CapsuleGeometry(0.065, 0.11, 16, 20);
    eyeGeo.rotateZ(Math.PI / 2);

    const leftEyeMesh = new THREE.Mesh(eyeGeo, eyeMat);
    leftEyeMesh.position.set(-0.21, 0, 0);
    eyesContainer.add(leftEyeMesh);

    const rightEyeMesh = new THREE.Mesh(eyeGeo, eyeMat);
    rightEyeMesh.position.set(0.21, 0, 0);
    eyesContainer.add(rightEyeMesh);

    // Ear Pods & Glowing Accent Rings
    const earCupGeo = new THREE.CylinderGeometry(0.18, 0.22, 0.14, 24);
    earCupGeo.rotateZ(Math.PI / 2);

    const leftEar = new THREE.Mesh(earCupGeo, trimMat);
    leftEar.position.set(-0.76, 0.02, 0);
    headGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earCupGeo, trimMat);
    rightEar.position.set(0.76, 0.02, 0);
    headGroup.add(rightEar);

    const earRingGeo = new THREE.RingGeometry(0.12, 0.16, 24);
    earRingGeo.rotateY(Math.PI / 2);

    const leftEarRing = new THREE.Mesh(earRingGeo, coreLightMat);
    leftEarRing.position.set(-0.84, 0.02, 0);
    headGroup.add(leftEarRing);

    const rightEarRing = new THREE.Mesh(earRingGeo, coreLightMat);
    rightEarRing.position.set(0.84, 0.02, 0);
    rightEarRing.rotation.y = Math.PI;
    headGroup.add(rightEarRing);

    // Communication Antenna on right ear
    const antennaStemGeo = new THREE.CylinderGeometry(0.018, 0.025, 0.42, 12);
    const antennaStem = new THREE.Mesh(antennaStemGeo, chromeMat);
    antennaStem.position.set(0.82, 0.42, -0.05);
    antennaStem.rotation.z = -0.22;
    headGroup.add(antennaStem);

    const antennaBeaconGeo = new THREE.SphereGeometry(0.048, 16, 16);
    const antennaBeacon = new THREE.Mesh(antennaBeaconGeo, coreLightMat);
    antennaBeacon.position.set(0.92, 0.62, -0.05);
    headGroup.add(antennaBeacon);

    // ==========================================
    // 3. ARTICULATED CYBER LIMBS & HANDS
    // ==========================================
    // Left Arm (relaxed natural stance)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.82, 0.82, 0);
    torsoGroup.add(leftArmGroup);

    const pauldronGeo = new THREE.SphereGeometry(0.24, 24, 24);
    pauldronGeo.scale(1.1, 1.0, 0.9);
    const leftPauldron = new THREE.Mesh(pauldronGeo, bodyMat);
    leftArmGroup.add(leftPauldron);

    const upperArmGeo = new THREE.CapsuleGeometry(0.1, 0.35, 12, 16);
    const leftUpperArm = new THREE.Mesh(upperArmGeo, trimMat);
    leftUpperArm.position.set(-0.1, -0.25, 0);
    leftUpperArm.rotation.z = 0.22;
    leftArmGroup.add(leftUpperArm);

    const elbowGeo = new THREE.SphereGeometry(0.11, 16, 16);
    const leftElbow = new THREE.Mesh(elbowGeo, chromeMat);
    leftElbow.position.set(-0.2, -0.52, 0);
    leftArmGroup.add(leftElbow);

    const leftForearmGroup = new THREE.Group();
    leftForearmGroup.position.set(-0.2, -0.52, 0);
    leftArmGroup.add(leftForearmGroup);

    const forearmGeo = new THREE.CapsuleGeometry(0.1, 0.38, 12, 16);
    const leftForearm = new THREE.Mesh(forearmGeo, bodyMat);
    leftForearm.position.set(-0.06, -0.22, 0.12);
    leftForearm.rotation.x = -0.4;
    leftForearmGroup.add(leftForearm);

    const wristGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.08, 16);
    const leftWrist = new THREE.Mesh(wristGeo, chromeMat);
    leftWrist.position.set(-0.08, -0.44, 0.22);
    leftForearmGroup.add(leftWrist);

    const palmGeo = new THREE.BoxGeometry(0.15, 0.16, 0.08);
    const leftPalm = new THREE.Mesh(palmGeo, trimMat);
    leftPalm.position.set(-0.08, -0.54, 0.26);
    leftForearmGroup.add(leftPalm);

    // Left fingers
    const fingerGeo = new THREE.CapsuleGeometry(0.024, 0.12, 8, 8);
    const fingerPositions = [
      [-0.14, -0.62, 0.28, 0.2],
      [-0.1, -0.66, 0.3, 0.05],
      [-0.06, -0.67, 0.3, 0.0],
      [-0.02, -0.64, 0.29, -0.05],
    ];
    fingerPositions.forEach(([fx, fy, fz, frot]) => {
      const finger = new THREE.Mesh(fingerGeo, chromeMat);
      finger.position.set(fx, fy, fz);
      finger.rotation.z = frot;
      finger.rotation.x = 0.25;
      leftForearmGroup.add(finger);
    });

    // Right Arm (Interactive Gesturing toward cursor!)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.82, 0.82, 0);
    torsoGroup.add(rightArmGroup);

    const rightPauldron = new THREE.Mesh(pauldronGeo, bodyMat);
    rightArmGroup.add(rightPauldron);

    const rightUpperArm = new THREE.Mesh(upperArmGeo, trimMat);
    rightUpperArm.position.set(0.1, -0.25, 0);
    rightUpperArm.rotation.z = -0.22;
    rightArmGroup.add(rightUpperArm);

    const rightElbow = new THREE.Mesh(elbowGeo, chromeMat);
    rightElbow.position.set(0.2, -0.52, 0);
    rightArmGroup.add(rightElbow);

    const rightForearmGroup = new THREE.Group();
    rightForearmGroup.position.set(0.2, -0.52, 0);
    rightArmGroup.add(rightForearmGroup);

    const rightForearm = new THREE.Mesh(forearmGeo, bodyMat);
    rightForearm.position.set(0.06, -0.2, 0.14);
    rightForearm.rotation.x = -0.55;
    rightForearmGroup.add(rightForearm);

    const rightWrist = new THREE.Mesh(wristGeo, chromeMat);
    rightWrist.position.set(0.08, -0.42, 0.26);
    rightForearmGroup.add(rightWrist);

    const rightPalm = new THREE.Mesh(palmGeo, trimMat);
    rightPalm.position.set(0.08, -0.52, 0.32);
    rightForearmGroup.add(rightPalm);

    const rightFingerPositions = [
      [0.14, -0.6, 0.34, -0.2],
      [0.1, -0.64, 0.36, -0.05],
      [0.06, -0.65, 0.36, 0.0],
      [0.02, -0.62, 0.35, 0.05],
    ];
    rightFingerPositions.forEach(([fx, fy, fz, frot]) => {
      const finger = new THREE.Mesh(fingerGeo, chromeMat);
      finger.position.set(fx, fy, fz);
      finger.rotation.z = frot;
      finger.rotation.x = 0.3;
      rightForearmGroup.add(finger);
    });

    // ==========================================
    // 4. FLOATING CONTACT SHADOW (Soft Ground Reflection)
    // ==========================================
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext("2d");
    if (shadowCtx) {
      const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, isDark ? "rgba(2, 6, 23, 0.72)" : "rgba(15, 23, 42, 0.22)");
      grad.addColorStop(0.5, isDark ? "rgba(2, 6, 23, 0.24)" : "rgba(15, 23, 42, 0.06)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      shadowCtx.fillStyle = grad;
      shadowCtx.fillRect(0, 0, 128, 128);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(2.8, 2.8);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.55;
    scene.add(shadowMesh);

    // ==========================================
    // 5. STUDIO LIGHTING RIG
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.05 : 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.6 : 2.2);
    keyLight.position.set(4.0, 5.0, 5.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x60a5fa, isDark ? 2.2 : 1.35);
    fillLight.position.set(-4.0, 1.5, 3.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, isDark ? 3.4 : 1.9);
    rimLight.position.set(0, 4.0, -4.5);
    scene.add(rimLight);

    const thrusterPointLight = new THREE.PointLight(cyanGlow, isDark ? 2.5 : 1.8, 4.0);
    thrusterPointLight.position.set(0, -1.0, 0);
    torsoGroup.add(thrusterPointLight);

    // ==========================================
    // 6. PRECISE CURSOR TRACKING LOGIC
    // ==========================================
    let targetHeadRotY = 0;
    let targetHeadRotX = 0;
    let targetTorsoRotY = 0;
    let targetTorsoRotX = 0;
    let eyeOffsetX = 0;
    let eyeOffsetY = 0;

    let isBlinking = false;
    let nextBlinkTime = performance.now() + 2500;
    let blinkDuration = 135;
    let blinkStartTime = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      // Calculate center of robot's head in screen pixels
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.38;

      // Distance normalized against viewport bounds
      const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.52);
      const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.52);

      // Clamped natural range
      const clampedX = Math.max(-1.15, Math.min(1.15, deltaX));
      const clampedY = Math.max(-0.95, Math.min(0.95, deltaY));

      targetHeadRotY = clampedX * 0.76;
      targetHeadRotX = clampedY * 0.44;

      targetTorsoRotY = clampedX * 0.26;
      targetTorsoRotX = clampedY * 0.14;

      eyeOffsetX = clampedX * 0.055;
      eyeOffsetY = -clampedY * 0.045;

      // Update dynamic CSS spotlight on .robot-container
      const robotContainer = (container.closest(".robot-container") || container) as HTMLElement;
      const cRect = robotContainer.getBoundingClientRect();
      const pctX = Math.max(5, Math.min(95, ((e.clientX - cRect.left) / cRect.width) * 100));
      const pctY = Math.max(5, Math.min(95, ((e.clientY - cRect.top) / cRect.height) * 100));
      robotContainer.style.setProperty("--spotlight-x", `${pctX.toFixed(1)}%`);
      robotContainer.style.setProperty("--spotlight-y", `${pctY.toFixed(1)}%`);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!container || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.38;

      const deltaX = (touch.clientX - centerX) / (window.innerWidth * 0.52);
      const deltaY = (touch.clientY - centerY) / (window.innerHeight * 0.52);

      const clampedX = Math.max(-1.15, Math.min(1.15, deltaX));
      const clampedY = Math.max(-0.95, Math.min(0.95, deltaY));

      targetHeadRotY = clampedX * 0.7;
      targetHeadRotX = clampedY * 0.4;
      targetTorsoRotY = clampedX * 0.22;
      targetTorsoRotX = clampedY * 0.12;
      eyeOffsetX = clampedX * 0.05;
      eyeOffsetY = -clampedY * 0.04;

      const robotContainer = (container.closest(".robot-container") || container) as HTMLElement;
      const cRect = robotContainer.getBoundingClientRect();
      const pctX = Math.max(5, Math.min(95, ((touch.clientX - cRect.left) / cRect.width) * 100));
      const pctY = Math.max(5, Math.min(95, ((touch.clientY - cRect.top) / cRect.height) * 100));
      robotContainer.style.setProperty("--spotlight-x", `${pctX.toFixed(1)}%`);
      robotContainer.style.setProperty("--spotlight-y", `${pctY.toFixed(1)}%`);
    };

    const handleMouseEnter = () => setIsInteracting(true);
    const handleMouseLeave = () => {
      setIsInteracting(false);
      targetHeadRotY = 0;
      targetHeadRotX = 0;
      targetTorsoRotY = 0;
      targetTorsoRotX = 0;
      eyeOffsetX = 0;
      eyeOffsetY = 0;

      const robotContainer = (container.closest(".robot-container") || container) as HTMLElement;
      robotContainer.style.setProperty("--spotlight-x", "50%");
      robotContainer.style.setProperty("--spotlight-y", "45%");
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    // Responsive camera & frustum resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 460;
      const h = container.clientHeight || 540;
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

    // Dynamic Theme Listener
    const themeObserver = new MutationObserver(() => {
      const isNowDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.dataset.theme === "dark";

      pearlColor = isNowDark ? 0x0b1120 : 0xffffff;
      graphiteTrim = isNowDark ? 0x1e293b : 0x0f172a;
      chromeMetal = isNowDark ? 0x475569 : 0x94a3b8;
      cyanGlow = isNowDark ? 0x38bdf8 : 0x0284c7;
      coreGlow = isNowDark ? 0x00f0ff : 0x0369a1;

      bodyMat.color.setHex(pearlColor);
      bodyMat.roughness = isNowDark ? 0.3 : 0.16;
      bodyMat.metalness = isNowDark ? 0.4 : 0.18;
      trimMat.color.setHex(graphiteTrim);
      chromeMat.color.setHex(chromeMetal);
      eyeMat.color.setHex(cyanGlow);
      eyeMat.emissive.setHex(cyanGlow);
      eyeMat.emissiveIntensity = isNowDark ? 3.2 : 2.6;
      coreLightMat.color.setHex(coreGlow);
      coreLightMat.emissive.setHex(coreGlow);
      coreLightMat.emissiveIntensity = isNowDark ? 3.0 : 2.4;
      seamGlowMat.color.setHex(cyanGlow);
      thrusterFlameMat.color.setHex(cyanGlow);
      thrusterPointLight.color.setHex(cyanGlow);

      ambientLight.intensity = isNowDark ? 1.05 : 1.4;
      keyLight.intensity = isNowDark ? 2.6 : 2.2;
      fillLight.intensity = isNowDark ? 2.2 : 1.35;
      rimLight.intensity = isNowDark ? 3.4 : 1.9;

      if (shadowCtx) {
        shadowCtx.clearRect(0, 0, 128, 128);
        const grad = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
        grad.addColorStop(0, isNowDark ? "rgba(2, 6, 23, 0.72)" : "rgba(15, 23, 42, 0.22)");
        grad.addColorStop(0.5, isNowDark ? "rgba(2, 6, 23, 0.24)" : "rgba(15, 23, 42, 0.06)");
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

    // ==========================================
    // 7. HIGH-FIDELITY FLUID KINEMATICS LOOP
    // ==========================================
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.08);
      lastTime = time;

      // Delta-independent exponential spring damping
      const fastSpring = 1 - Math.exp(-9.5 * delta);
      const gentleSpring = 1 - Math.exp(-6.0 * delta);

      // 1. Natural Floating Levitation
      const hoverY = Math.sin(time * 0.0022) * 0.085;
      robotRoot.position.y = -0.08 + hoverY;

      // Ground shadow expands/contracts with hover elevation
      const shadowScale = 1 - hoverY * 0.65;
      shadowMesh.scale.set(shadowScale, shadowScale, 1);

      // 2. Head Cursor Tracking with spring physics
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * fastSpring;
      headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * fastSpring;

      // Curiosity head tilt
      const headTiltZ = Math.sin(time * 0.0016) * 0.035 - targetHeadRotY * 0.09;
      headGroup.rotation.z += (headTiltZ - headGroup.rotation.z) * gentleSpring;

      // 3. Torso Accompanying Tracking
      torsoGroup.rotation.y += (targetTorsoRotY - torsoGroup.rotation.y) * gentleSpring;
      torsoGroup.rotation.x += (targetTorsoRotX - torsoGroup.rotation.x) * gentleSpring;
      torsoGroup.rotation.z = Math.sin(time * 0.0018) * 0.02;

      // 4. Gyro Ring continuous slow spin around reactor
      gyroRing.rotation.z += delta * 1.2;
      gyroRing.rotation.x = Math.sin(time * 0.002) * 0.2;

      // 5. Eye Pupils Tracking & Natural Blinking
      if (!isBlinking && time > nextBlinkTime) {
        isBlinking = true;
        blinkStartTime = time;
      }

      let eyeScaleY = 1.0;
      if (isBlinking) {
        const elapsed = time - blinkStartTime;
        if (elapsed < blinkDuration / 2) {
          eyeScaleY = 1.0 - (elapsed / (blinkDuration / 2)) * 0.95;
        } else if (elapsed < blinkDuration) {
          eyeScaleY = 0.05 + ((elapsed - blinkDuration / 2) / (blinkDuration / 2)) * 0.95;
        } else {
          isBlinking = false;
          eyeScaleY = 1.0;
          nextBlinkTime = time + 3200 + Math.random() * 3200;
        }
      }

      leftEyeMesh.scale.y = eyeScaleY;
      rightEyeMesh.scale.y = eyeScaleY;

      leftEyeMesh.position.x += (-0.21 + eyeOffsetX - leftEyeMesh.position.x) * (fastSpring * 1.2);
      leftEyeMesh.position.y += (eyeOffsetY - leftEyeMesh.position.y) * (fastSpring * 1.2);

      rightEyeMesh.position.x += (0.21 + eyeOffsetX - rightEyeMesh.position.x) * (fastSpring * 1.2);
      rightEyeMesh.position.y += (eyeOffsetY - rightEyeMesh.position.y) * (fastSpring * 1.2);

      // 6. Arm & Hand Natural Gesturing toward Cursor
      const armBreathe = Math.sin(time * 0.002) * 0.05;
      leftArmGroup.rotation.x = armBreathe - targetTorsoRotX * 0.3;
      leftArmGroup.rotation.z = Math.sin(time * 0.0014) * 0.04;

      // Right arm dynamically reaches toward cursor gaze
      rightArmGroup.rotation.x += (-armBreathe - targetTorsoRotX * 0.45 + targetHeadRotX * 0.22 - rightArmGroup.rotation.x) * gentleSpring;
      rightArmGroup.rotation.y += (targetHeadRotY * 0.28 - rightArmGroup.rotation.y) * gentleSpring;
      rightForearmGroup.rotation.y = targetHeadRotY * 0.15;

      // 7. Reactor Core & Thruster Flame Pulse
      const corePulse = 1 + Math.sin(time * 0.004) * 0.07;
      reactorCoreMesh.scale.set(corePulse, corePulse, 0.4);

      const flamePulse = 1 + Math.sin(time * 0.009) * 0.14;
      flameMesh.scale.set(flamePulse, flamePulse * 1.1, flamePulse);

      // 8. Dynamic 3D Spotlight: Shifts specular highlights on metallic & pearl surfaces
      keyLight.position.x += (4.0 + targetHeadRotY * 3.4 - keyLight.position.x) * fastSpring;
      keyLight.position.y += (4.8 - targetHeadRotX * 2.6 - keyLight.position.y) * fastSpring;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();

      // Memory Disposal
      chestGeo.dispose();
      collarGeo.dispose();
      breastplateGeo.dispose();
      gyroRingGeo.dispose();
      reactorCoreGeo.dispose();
      chestSeamGeo.dispose();
      waistGeo.dispose();
      beltGeo.dispose();
      thrusterConeGeo.dispose();
      nozzleRingGeo.dispose();
      flameGeo.dispose();

      neckBallGeo.dispose();
      helmetGeo.dispose();
      crownStripeGeo.dispose();
      visorRimGeo.dispose();
      visorGeo.dispose();
      eyeGeo.dispose();
      earCupGeo.dispose();
      earRingGeo.dispose();
      antennaStemGeo.dispose();
      antennaBeaconGeo.dispose();

      pauldronGeo.dispose();
      upperArmGeo.dispose();
      elbowGeo.dispose();
      forearmGeo.dispose();
      wristGeo.dispose();
      palmGeo.dispose();
      fingerGeo.dispose();
      shadowGeo.dispose();
      shadowTex.dispose();

      bodyMat.dispose();
      trimMat.dispose();
      chromeMat.dispose();
      visorMat.dispose();
      eyeMat.dispose();
      coreLightMat.dispose();
      seamGlowMat.dispose();
      thrusterFlameMat.dispose();
      shadowMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative mx-auto w-full select-none cursor-default transition-transform duration-300 ${
        className || "h-[460px] sm:h-[520px] lg:h-[580px]"
      }`}
      title="Innoanswers AI Companion — Tracks your cursor & head position in real time"
    />
  );
}
