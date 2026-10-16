import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export interface FullHumanoidRobot3DProps {
  className?: string;
}

export function FullHumanoidRobot3D({ className }: FullHumanoidRobot3DProps = {}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    // Camera positioned with optimal focal distance for complete, unclipped viewing
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    camera.position.set(0, 0.05, 8.2);

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

    // Master Robot Hierarchy
    const robotRoot = new THREE.Group();
    robotRoot.position.y = 0.08;
    scene.add(robotRoot);

    // Theme detection
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.dataset.theme === "dark";

    // Futuristic Realistic Palette:
    // Light Theme: Polished aerospace pearl-white armor, deep graphite chassis, satin titanium joints, cyan optical sensor
    // Dark Theme: Midnight titanium-graphite armor, carbon-fiber chassis, chrome joints, electric cyan sensor
    let armorColor = isDark ? 0x0f172a : 0xf8fafc;
    let carbonColor = isDark ? 0x070b14 : 0x1e293b;
    let titaniumColor = isDark ? 0x64748b : 0x94a3b8;
    let chromeColor = isDark ? 0x94a3b8 : 0xd8e2ec;
    let glassVisorColor = 0x030712; // Panoramic dark glass visor
    let sensorGlowColor = isDark ? 0x38bdf8 : 0x0284c7; // Electric cyan
    let coreGlowColor = isDark ? 0x00f0ff : 0x0284c7;

    // Materials with PBR specular highlights
    const armorMat = new THREE.MeshStandardMaterial({
      color: armorColor,
      roughness: isDark ? 0.28 : 0.18,
      metalness: isDark ? 0.35 : 0.2,
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: carbonColor,
      roughness: 0.45,
      metalness: 0.55,
    });

    const titaniumMat = new THREE.MeshStandardMaterial({
      color: titaniumColor,
      roughness: 0.22,
      metalness: 0.85,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: chromeColor,
      roughness: 0.12,
      metalness: 0.95,
    });

    const visorMat = new THREE.MeshStandardMaterial({
      color: glassVisorColor,
      roughness: 0.06,
      metalness: 0.95,
    });

    const sensorMat = new THREE.MeshStandardMaterial({
      color: sensorGlowColor,
      emissive: sensorGlowColor,
      emissiveIntensity: isDark ? 3.0 : 2.4,
      roughness: 0.1,
      metalness: 0.1,
    });

    const coreLightMat = new THREE.MeshStandardMaterial({
      color: coreGlowColor,
      emissive: coreGlowColor,
      emissiveIntensity: isDark ? 2.8 : 2.2,
      roughness: 0.15,
      metalness: 0.2,
    });

    const conduitMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x1e293b : 0x334155,
      roughness: 0.55,
      metalness: 0.4,
    });

    const glowLineMat = new THREE.MeshBasicMaterial({
      color: sensorGlowColor,
      transparent: true,
      opacity: isDark ? 0.85 : 0.65,
    });

    // ==========================================
    // 1. MINIMALIST TELEMETRY PEDESTAL
    // ==========================================
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.y = -2.15;
    robotRoot.add(pedestalGroup);

    const baseDiscGeo = new THREE.CylinderGeometry(1.65, 1.75, 0.08, 48);
    const baseDiscMesh = new THREE.Mesh(baseDiscGeo, carbonMat);
    pedestalGroup.add(baseDiscMesh);

    const innerRingGeo = new THREE.RingGeometry(1.25, 1.34, 48);
    innerRingGeo.rotateX(-Math.PI / 2);
    const innerRingMesh = new THREE.Mesh(innerRingGeo, glowLineMat);
    innerRingMesh.position.y = 0.045;
    pedestalGroup.add(innerRingMesh);

    const outerRingGeo = new THREE.RingGeometry(1.48, 1.54, 48);
    outerRingGeo.rotateX(-Math.PI / 2);
    const outerRingMesh = new THREE.Mesh(outerRingGeo, titaniumMat);
    outerRingMesh.position.y = 0.045;
    pedestalGroup.add(outerRingMesh);

    // ==========================================
    // 2. LOWER BODY: BIPEDAL LEGS & ARTICULATED FEET
    // ==========================================
    const lowerBodyGroup = new THREE.Group();
    robotRoot.add(lowerBodyGroup);

    // Heavy-duty Pelvis Hub
    const pelvisGeo = new THREE.BoxGeometry(0.72, 0.35, 0.45);
    const pelvisMesh = new THREE.Mesh(pelvisGeo, carbonMat);
    pelvisMesh.position.y = -0.42;
    lowerBodyGroup.add(pelvisMesh);

    const pelvisPlateGeo = new THREE.BoxGeometry(0.55, 0.25, 0.48);
    const pelvisPlate = new THREE.Mesh(pelvisPlateGeo, armorMat);
    pelvisPlate.position.set(0, -0.42, 0.02);
    lowerBodyGroup.add(pelvisPlate);

    // Function to build articulated robotic leg
    function createLeg(isLeft: boolean) {
      const legGroup = new THREE.Group();
      const sign = isLeft ? -1 : 1;
      legGroup.position.set(sign * 0.34, -0.48, 0);

      // Hip ball joint
      const hipBallGeo = new THREE.SphereGeometry(0.14, 20, 20);
      const hipBall = new THREE.Mesh(hipBallGeo, titaniumMat);
      legGroup.add(hipBall);

      // Thigh with streamlined armor & piston
      const thighGroup = new THREE.Group();
      legGroup.add(thighGroup);

      const thighGeo = new THREE.CylinderGeometry(0.13, 0.11, 0.65, 20);
      const thighMesh = new THREE.Mesh(thighGeo, armorMat);
      thighMesh.position.y = -0.35;
      thighGroup.add(thighMesh);

      const thighPistonGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.55, 16);
      const thighPiston = new THREE.Mesh(thighPistonGeo, chromeMat);
      thighPiston.position.set(sign * 0.06, -0.35, -0.09);
      thighGroup.add(thighPiston);

      // Knee Joint Rotor Disc
      const kneeGroup = new THREE.Group();
      kneeGroup.position.set(0, -0.7, 0);
      legGroup.add(kneeGroup);

      const kneeRotorGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.22, 24);
      kneeRotorGeo.rotateZ(Math.PI / 2);
      const kneeRotor = new THREE.Mesh(kneeRotorGeo, titaniumMat);
      kneeGroup.add(kneeRotor);

      const kneeCapGeo = new THREE.BoxGeometry(0.16, 0.18, 0.14);
      const kneeCap = new THREE.Mesh(kneeCapGeo, carbonMat);
      kneeCap.position.set(0, 0, 0.1);
      kneeGroup.add(kneeCap);

      // Shin / Calf
      const calfGroup = new THREE.Group();
      kneeGroup.add(calfGroup);

      const calfGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.72, 20);
      const calfMesh = new THREE.Mesh(calfGeo, armorMat);
      calfMesh.position.y = -0.42;
      calfGroup.add(calfMesh);

      const calfDamperGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.58, 12);
      const calfDamper = new THREE.Mesh(calfDamperGeo, chromeMat);
      calfDamper.position.set(0, -0.42, -0.08);
      calfGroup.add(calfDamper);

      // Ankle joint
      const ankleGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const ankle = new THREE.Mesh(ankleGeo, titaniumMat);
      ankle.position.y = -0.82;
      calfGroup.add(ankle);

      // Foot sole (firmly planted on tech pedestal)
      const footGeo = new THREE.BoxGeometry(0.24, 0.12, 0.48);
      const footMesh = new THREE.Mesh(footGeo, carbonMat);
      footMesh.position.set(0, -0.9, 0.08);
      calfGroup.add(footMesh);

      const toePlateGeo = new THREE.BoxGeometry(0.22, 0.06, 0.22);
      const toePlate = new THREE.Mesh(toePlateGeo, armorMat);
      toePlate.position.set(0, -0.86, 0.22);
      calfGroup.add(toePlate);

      return legGroup;
    }

    const leftLeg = createLeg(true);
    const rightLeg = createLeg(false);
    lowerBodyGroup.add(leftLeg);
    lowerBodyGroup.add(rightLeg);

    // ==========================================
    // 3. TORSO, EXOSKELETON & BIO-MECHANICAL SPINE
    // ==========================================
    const torsoGroup = new THREE.Group();
    torsoGroup.position.y = -0.22;
    robotRoot.add(torsoGroup);

    // Waist Rotator Gimbal
    const waistRotatorGeo = new THREE.CylinderGeometry(0.24, 0.26, 0.2, 24);
    const waistRotator = new THREE.Mesh(waistRotatorGeo, titaniumMat);
    waistRotator.position.y = 0.1;
    torsoGroup.add(waistRotator);

    // Exposed Titanium Spine Vertebrae
    const spineGroup = new THREE.Group();
    torsoGroup.add(spineGroup);
    for (let i = 0; i < 4; i++) {
      const vertGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16);
      vertGeo.rotateX(Math.PI / 2);
      const vert = new THREE.Mesh(vertGeo, titaniumMat);
      vert.position.set(0, 0.22 + i * 0.16, -0.16);
      spineGroup.add(vert);
    }

    // Spine Hydraulic Conduits (braided cables running up spine)
    const conduitGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.65, 12);
    const leftConduit = new THREE.Mesh(conduitGeo, conduitMat);
    leftConduit.position.set(-0.11, 0.46, -0.16);
    torsoGroup.add(leftConduit);

    const rightConduit = new THREE.Mesh(conduitGeo, conduitMat);
    rightConduit.position.set(0.11, 0.46, -0.16);
    torsoGroup.add(rightConduit);

    // Main Sculpted Exoskeleton Chest Plate
    const chestPlateGeo = new THREE.BoxGeometry(0.88, 0.72, 0.52);
    const chestPlate = new THREE.Mesh(chestPlateGeo, armorMat);
    chestPlate.position.set(0, 0.65, 0.04);
    torsoGroup.add(chestPlate);

    // Carbon fiber back shell
    const backPackGeo = new THREE.BoxGeometry(0.72, 0.62, 0.22);
    const backPack = new THREE.Mesh(backPackGeo, carbonMat);
    backPack.position.set(0, 0.68, -0.28);
    torsoGroup.add(backPack);

    // Central Hexagonal Quantum Energy Core
    const coreRingGeo = new THREE.TorusGeometry(0.18, 0.03, 16, 32);
    const coreRing = new THREE.Mesh(coreRingGeo, titaniumMat);
    coreRing.position.set(0, 0.68, 0.31);
    torsoGroup.add(coreRing);

    const coreCrystalGeo = new THREE.IcosahedronGeometry(0.12, 1);
    const coreCrystal = new THREE.Mesh(coreCrystalGeo, coreLightMat);
    coreCrystal.position.set(0, 0.68, 0.31);
    torsoGroup.add(coreCrystal);

    // Telemetry status line
    const lineGeo = new THREE.BoxGeometry(0.24, 0.02, 0.02);
    const topDiagLine = new THREE.Mesh(lineGeo, glowLineMat);
    topDiagLine.position.set(0, 0.88, 0.31);
    torsoGroup.add(topDiagLine);

    // ==========================================
    // 4. ARTICULATED HEAD WITH LIDAR & CAMERAS
    // ==========================================
    const neckGroup = new THREE.Group();
    neckGroup.position.set(0, 1.05, 0);
    torsoGroup.add(neckGroup);

    // Dual neck hydraulic actuators that physically flex with head pitch
    const neckPistonGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.25, 12);
    const leftNeckPiston = new THREE.Mesh(neckPistonGeo, chromeMat);
    leftNeckPiston.position.set(-0.16, 0.08, -0.06);
    neckGroup.add(leftNeckPiston);

    const rightNeckPiston = new THREE.Mesh(neckPistonGeo, chromeMat);
    rightNeckPiston.position.set(0.16, 0.08, -0.06);
    neckGroup.add(rightNeckPiston);

    // Head Pivot
    const headGroup = new THREE.Group();
    headGroup.position.set(0, 0.25, 0);
    neckGroup.add(headGroup);

    // Sleek Android Cranium Shell
    const craniumGeo = new THREE.BoxGeometry(0.52, 0.48, 0.54);
    const craniumMesh = new THREE.Mesh(craniumGeo, armorMat);
    craniumMesh.position.set(0, 0.12, 0);
    headGroup.add(craniumMesh);

    // Carbon occipital plate
    const occipitalGeo = new THREE.BoxGeometry(0.46, 0.42, 0.2);
    const occipital = new THREE.Mesh(occipitalGeo, carbonMat);
    occipital.position.set(0, 0.12, -0.2);
    headGroup.add(occipital);

    // Panoramic Curved Glass Visor Screen
    const visorRimGeo = new THREE.BoxGeometry(0.5, 0.24, 0.08);
    const visorRim = new THREE.Mesh(visorRimGeo, visorMat);
    visorRim.position.set(0, 0.13, 0.28);
    headGroup.add(visorRim);

    // Dual Optical Eyes inside visor (track cursor with micro-saccades)
    const eyesContainer = new THREE.Group();
    eyesContainer.position.set(0, 0.13, 0.32);
    headGroup.add(eyesContainer);

    const lensGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.04, 24);
    lensGeo.rotateX(Math.PI / 2);

    const leftEyeLens = new THREE.Mesh(lensGeo, sensorMat);
    leftEyeLens.position.set(-0.13, 0, 0);
    eyesContainer.add(leftEyeLens);

    const rightEyeLens = new THREE.Mesh(lensGeo, sensorMat);
    rightEyeLens.position.set(0.13, 0, 0);
    eyesContainer.add(rightEyeLens);

    // Temple sensor fins
    const earFinGeo = new THREE.BoxGeometry(0.06, 0.18, 0.28);
    const leftEarFin = new THREE.Mesh(earFinGeo, titaniumMat);
    leftEarFin.position.set(-0.28, 0.15, 0);
    headGroup.add(leftEarFin);

    const rightEarFin = new THREE.Mesh(earFinGeo, titaniumMat);
    rightEarFin.position.set(0.28, 0.15, 0);
    headGroup.add(rightEarFin);

    // ==========================================
    // 5. ARTICULATED 5-FINGER ROBOTIC ARMS
    // ==========================================
    // Left Arm (Natural relaxed posture)
    const leftArmGroup = new THREE.Group();
    leftArmGroup.position.set(-0.56, 0.88, 0);
    torsoGroup.add(leftArmGroup);

    const shoulderBallGeo = new THREE.SphereGeometry(0.15, 24, 24);
    const leftShoulder = new THREE.Mesh(shoulderBallGeo, titaniumMat);
    leftArmGroup.add(leftShoulder);

    const bicepGroup = new THREE.Group();
    leftArmGroup.add(bicepGroup);

    const bicepGeo = new THREE.CylinderGeometry(0.11, 0.09, 0.52, 20);
    const leftBicep = new THREE.Mesh(bicepGeo, armorMat);
    leftBicep.position.set(-0.04, -0.32, 0);
    bicepGroup.add(leftBicep);

    const leftElbowGroup = new THREE.Group();
    leftElbowGroup.position.set(-0.04, -0.62, 0);
    leftArmGroup.add(leftElbowGroup);

    const elbowRotorGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.18, 20);
    elbowRotorGeo.rotateZ(Math.PI / 2);
    const leftElbowMesh = new THREE.Mesh(elbowRotorGeo, titaniumMat);
    leftElbowGroup.add(leftElbowMesh);

    const leftForearmGroup = new THREE.Group();
    leftElbowGroup.add(leftForearmGroup);

    const forearmGeo = new THREE.CylinderGeometry(0.095, 0.08, 0.52, 20);
    const leftForearm = new THREE.Mesh(forearmGeo, armorMat);
    leftForearm.position.set(0, -0.3, 0.06);
    leftForearm.rotation.x = -0.25;
    leftForearmGroup.add(leftForearm);

    // Left articulated hand
    const leftHandGroup = new THREE.Group();
    leftHandGroup.position.set(0, -0.6, 0.14);
    leftForearmGroup.add(leftHandGroup);

    const palmGeo = new THREE.BoxGeometry(0.14, 0.14, 0.06);
    const leftPalm = new THREE.Mesh(palmGeo, carbonMat);
    leftHandGroup.add(leftPalm);

    // 5 fingers on Left hand
    const fingerPhalanxGeo = new THREE.CylinderGeometry(0.018, 0.016, 0.08, 12);
    for (let f = 0; f < 5; f++) {
      const finger = new THREE.Mesh(fingerPhalanxGeo, chromeMat);
      const fx = -0.05 + f * 0.026;
      finger.position.set(fx, -0.1, 0.02);
      finger.rotation.x = 0.2;
      leftHandGroup.add(finger);
    }

    // Right Arm (Reaches and points naturally toward cursor)
    const rightArmGroup = new THREE.Group();
    rightArmGroup.position.set(0.56, 0.88, 0);
    torsoGroup.add(rightArmGroup);

    const rightShoulder = new THREE.Mesh(shoulderBallGeo, titaniumMat);
    rightArmGroup.add(rightShoulder);

    const rightBicepGroup = new THREE.Group();
    rightArmGroup.add(rightBicepGroup);

    const rightBicep = new THREE.Mesh(bicepGeo, armorMat);
    rightBicep.position.set(0.04, -0.32, 0);
    rightBicepGroup.add(rightBicep);

    const rightElbowGroup = new THREE.Group();
    rightElbowGroup.position.set(0.04, -0.62, 0);
    rightArmGroup.add(rightElbowGroup);

    const rightElbowMesh = new THREE.Mesh(elbowRotorGeo, titaniumMat);
    rightElbowGroup.add(rightElbowMesh);

    const rightForearmGroup = new THREE.Group();
    rightElbowGroup.add(rightForearmGroup);

    const rightForearm = new THREE.Mesh(forearmGeo, armorMat);
    rightForearm.position.set(0, -0.3, 0.08);
    rightForearm.rotation.x = -0.42;
    rightForearmGroup.add(rightForearm);

    // Right Articulated 5-Finger Hand
    const rightHandGroup = new THREE.Group();
    rightHandGroup.position.set(0, -0.6, 0.2);
    rightForearmGroup.add(rightHandGroup);

    const rightPalm = new THREE.Mesh(palmGeo, carbonMat);
    rightHandGroup.add(rightPalm);

    // 5 Individual articulated fingers with dual-knuckle joints
    const rightFingers: THREE.Mesh[] = [];
    for (let f = 0; f < 5; f++) {
      const fGroup = new THREE.Group();
      fGroup.position.set(-0.05 + f * 0.026, -0.08, 0.02);
      rightHandGroup.add(fGroup);

      const phalanx1 = new THREE.Mesh(fingerPhalanxGeo, chromeMat);
      phalanx1.position.y = -0.04;
      fGroup.add(phalanx1);

      const phalanx2 = new THREE.Mesh(fingerPhalanxGeo, titaniumMat);
      phalanx2.position.set(0, -0.09, 0.02);
      phalanx2.rotation.x = 0.35;
      fGroup.add(phalanx2);

      rightFingers.push(phalanx1);
    }

    // ==========================================
    // 6. STUDIO LIGHTING RIG
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.15 : 1.45);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.8 : 2.4);
    keyLight.position.set(4.5, 5.5, 6.0);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(isDark ? 0x38bdf8 : 0x60a5fa, isDark ? 2.0 : 1.3);
    fillLight.position.set(-4.5, 2.0, 4.0);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(sensorGlowColor, isDark ? 3.2 : 1.8);
    rimLight.position.set(0, 4.5, -5.0);
    scene.add(rimLight);

    const platformLight = new THREE.PointLight(sensorGlowColor, isDark ? 2.6 : 1.8, 4.5);
    platformLight.position.set(0, -2.0, 0.5);
    scene.add(platformLight);

    // ==========================================
    // 7. PRECISE REALISTIC CURSOR TRACKING
    // ==========================================
    let targetHeadRotY = 0;
    let targetHeadRotX = 0;
    let targetTorsoRotY = 0;
    let targetTorsoRotX = 0;
    let targetArmPitch = 0;
    let targetArmYaw = 0;

    const handlePointerMove = (e: MouseEvent) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.32; // Centered at robot's head level

      const deltaX = (e.clientX - centerX) / (window.innerWidth * 0.48);
      const deltaY = (e.clientY - centerY) / (window.innerHeight * 0.48);

      const clampedX = Math.max(-1.15, Math.min(1.15, deltaX));
      const clampedY = Math.max(-0.95, Math.min(0.95, deltaY));

      targetHeadRotY = clampedX * 0.72;
      targetHeadRotX = clampedY * 0.40;

      targetTorsoRotY = clampedX * 0.26;
      targetTorsoRotX = clampedY * 0.12;

      targetArmYaw = clampedX * 0.42;
      targetArmPitch = clampedY * 0.46;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!container || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.32;

      const deltaX = (touch.clientX - centerX) / (window.innerWidth * 0.48);
      const deltaY = (touch.clientY - centerY) / (window.innerHeight * 0.48);

      const clampedX = Math.max(-1.15, Math.min(1.15, deltaX));
      const clampedY = Math.max(-0.95, Math.min(0.95, deltaY));

      targetHeadRotY = clampedX * 0.68;
      targetHeadRotX = clampedY * 0.36;
      targetTorsoRotY = clampedX * 0.22;
      targetTorsoRotX = clampedY * 0.1;
      targetArmYaw = clampedX * 0.38;
      targetArmPitch = clampedY * 0.42;
    };

    const handleMouseLeave = () => {
      targetHeadRotY = 0;
      targetHeadRotX = 0;
      targetTorsoRotY = 0;
      targetTorsoRotX = 0;
      targetArmPitch = 0;
      targetArmYaw = 0;
    };

    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("mouseleave", handleMouseLeave);

    // Responsive camera resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 600;
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

      armorColor = isNowDark ? 0x0f172a : 0xf8fafc;
      carbonColor = isNowDark ? 0x070b14 : 0x1e293b;
      titaniumColor = isNowDark ? 0x64748b : 0x94a3b8;
      chromeColor = isNowDark ? 0x94a3b8 : 0xd8e2ec;
      sensorGlowColor = isNowDark ? 0x38bdf8 : 0x0284c7;
      coreGlowColor = isNowDark ? 0x00f0ff : 0x0284c7;

      armorMat.color.setHex(armorColor);
      armorMat.roughness = isNowDark ? 0.28 : 0.18;
      armorMat.metalness = isNowDark ? 0.35 : 0.2;
      carbonMat.color.setHex(carbonColor);
      titaniumMat.color.setHex(titaniumColor);
      chromeMat.color.setHex(chromeColor);
      sensorMat.color.setHex(sensorGlowColor);
      sensorMat.emissive.setHex(sensorGlowColor);
      sensorMat.emissiveIntensity = isNowDark ? 3.0 : 2.4;
      coreLightMat.color.setHex(coreGlowColor);
      coreLightMat.emissive.setHex(coreGlowColor);
      coreLightMat.emissiveIntensity = isNowDark ? 2.8 : 2.2;
      glowLineMat.color.setHex(sensorGlowColor);

      ambientLight.intensity = isNowDark ? 1.15 : 1.45;
      keyLight.intensity = isNowDark ? 2.8 : 2.4;
      fillLight.intensity = isNowDark ? 2.0 : 1.3;
      rimLight.intensity = isNowDark ? 3.2 : 1.8;
      platformLight.color.setHex(sensorGlowColor);
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // ==========================================
    // 8. REALISTIC KINEMATICS ENGINE
    // ==========================================
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.08);
      lastTime = time;

      const fastSpring = 1 - Math.exp(-9.0 * delta);
      const gentleSpring = 1 - Math.exp(-5.5 * delta);

      // Core pulse and slow rotation
      const pulse = 1 + Math.sin(time * 0.0035) * 0.08;
      coreCrystal.scale.set(pulse, pulse, pulse);
      coreCrystal.rotation.y += delta * 0.8;
      coreRing.rotation.z -= delta * 0.5;

      // Platform inner ring subtle rotation
      innerRingMesh.rotation.z += delta * 0.12;

      // Lifelike Idle Breathing Kinematics
      const breathing = Math.sin(time * 0.0018) * 0.02;
      torsoGroup.position.y = -0.22 + breathing * 0.4;
      chestPlate.scale.set(1 + breathing * 0.015, 1 + breathing * 0.02, 1 + breathing * 0.015);

      // Natural Head Gaze Tracking
      headGroup.rotation.y += (targetHeadRotY - headGroup.rotation.y) * fastSpring;
      headGroup.rotation.x += (targetHeadRotX - headGroup.rotation.x) * fastSpring;

      // Neck pistons react realistically to head pitch
      leftNeckPiston.scale.y = 1 + targetHeadRotX * 0.35;
      rightNeckPiston.scale.y = 1 - targetHeadRotX * 0.35;

      // Torso accompanying lean
      torsoGroup.rotation.y += (targetTorsoRotY - torsoGroup.rotation.y) * gentleSpring;
      torsoGroup.rotation.x += (targetTorsoRotX - torsoGroup.rotation.x) * gentleSpring;

      // Optical Eye lenses focus subtly toward gaze
      leftEyeLens.position.x = -0.13 + targetHeadRotY * 0.015;
      rightEyeLens.position.x = 0.13 + targetHeadRotY * 0.015;

      // Right arm gestures naturally toward cursor
      rightArmGroup.rotation.x += (-targetArmPitch * 0.55 - rightArmGroup.rotation.x) * fastSpring;
      rightArmGroup.rotation.y += (targetArmYaw * 0.75 - rightArmGroup.rotation.y) * fastSpring;
      rightForearmGroup.rotation.x = -0.42 - targetArmPitch * 0.25;

      // Realistic finger articulation
      const fingerCurl = 0.22 + Math.sin(time * 0.0028) * 0.1;
      rightFingers.forEach((f, idx) => {
        f.rotation.x = fingerCurl + idx * 0.035;
      });

      // Left arm natural stance micro-sway
      leftArmGroup.rotation.x = Math.sin(time * 0.002) * 0.04 - targetTorsoRotX * 0.25;

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();

      // Complete resource disposal
      baseDiscGeo.dispose();
      innerRingGeo.dispose();
      outerRingGeo.dispose();
      pelvisGeo.dispose();
      pelvisPlateGeo.dispose();
      waistRotatorGeo.dispose();
      chestPlateGeo.dispose();
      backPackGeo.dispose();
      coreRingGeo.dispose();
      coreCrystalGeo.dispose();
      lineGeo.dispose();
      neckPistonGeo.dispose();
      conduitGeo.dispose();
      craniumGeo.dispose();
      occipitalGeo.dispose();
      visorRimGeo.dispose();
      lensGeo.dispose();
      earFinGeo.dispose();
      shoulderBallGeo.dispose();
      bicepGeo.dispose();
      elbowRotorGeo.dispose();
      forearmGeo.dispose();
      palmGeo.dispose();
      fingerPhalanxGeo.dispose();

      armorMat.dispose();
      carbonMat.dispose();
      titaniumMat.dispose();
      chromeMat.dispose();
      visorMat.dispose();
      sensorMat.dispose();
      coreLightMat.dispose();
      conduitMat.dispose();
      glowLineMat.dispose();

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`relative w-full cursor-default select-none ${
        className || "h-[480px] sm:h-[540px] lg:h-[600px]"
      }`}
      title="Autonomous Humanoid Android — Real-time cursor tracking & realistic robotics"
    />
  );
}
