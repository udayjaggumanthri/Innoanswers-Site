import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export interface TechGlobe3DProps {
  className?: string;
}

// Convert latitude and longitude to 3D Cartesian coordinates
function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Global enterprise AI tech hubs
const HUBS = [
  { name: "San Francisco", lat: 37.77, lon: -122.42 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "Zurich", lat: 47.38, lon: 8.54 },
  { name: "Tokyo", lat: 35.68, lon: 139.65 },
  { name: "Singapore", lat: 1.35, lon: 103.82 },
  { name: "Bengaluru", lat: 12.97, lon: 77.59 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
  { name: "São Paulo", lat: -23.55, lon: -46.63 },
];

// Great-circle connection arc pairs
const HUB_CONNECTIONS = [
  [0, 1], // SF - NY
  [0, 4], // SF - Tokyo
  [1, 2], // NY - London
  [2, 3], // London - Zurich
  [2, 6], // London - Bengaluru
  [3, 5], // Zurich - Singapore
  [4, 5], // Tokyo - Singapore
  [5, 7], // Singapore - Sydney
  [1, 8], // NY - São Paulo
];

// Continental sampling bounding boxes [minLat, maxLat, minLon, maxLon]
const CONTINENT_BOXES = [
  // North America
  [15, 65, -135, -60],
  [50, 70, -165, -130], // Alaska
  // South America
  [-55, 10, -80, -35],
  // Europe
  [36, 70, -10, 40],
  // Africa
  [-35, 36, -18, 50],
  // Asia
  [8, 70, 40, 140],
  [10, 50, 95, 145], // East / SE Asia
  // Australia & New Zealand
  [-44, -12, 113, 154],
  [-46, -34, 166, 178], // NZ
];

function isLand(lat: number, lon: number): boolean {
  for (const box of CONTINENT_BOXES) {
    if (lat >= box[0] && lat <= box[1] && lon >= box[2] && lon <= box[3]) {
      // Discard Atlantic / Pacific mid-ocean zones
      if (lat >= 10 && lat <= 45 && lon >= -50 && lon <= -22) return false;
      if (lat >= -50 && lat <= 0 && lon >= -30 && lon <= -5) return false;
      if (lat >= -40 && lat <= 15 && lon >= 60 && lon <= 85) return false; // Indian ocean
      return true;
    }
  }
  return false;
}

export function TechGlobe3D({ className }: TechGlobe3DProps = {}) {
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

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.3, 5.8);

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

    // Root Globe Group (tilted on earth axial tilt ~23.5 deg)
    const globeRoot = new THREE.Group();
    globeRoot.rotation.z = -0.25; // ~14 deg axial tilt for clean perspective
    scene.add(globeRoot);

    const GLOBE_RADIUS = 1.85;

    // Theme detection
    const isDark =
      document.documentElement.classList.contains("dark") ||
      document.documentElement.dataset.theme === "dark";

    let primaryColor = isDark ? 0x38bdf8 : 0x0284c7; // cyan / sky
    let secondaryColor = isDark ? 0x818cf8 : 0x4f46e5; // indigo / violet
    let glowColor = isDark ? 0x0ea5e9 : 0x2563eb;
    let sphereBaseColor = isDark ? 0x030718 : 0x0f172a;

    // 1. Inner Core Sphere
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.985, 48, 48);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: sphereBaseColor,
      roughness: 0.6,
      metalness: 0.8,
      transparent: true,
      opacity: isDark ? 0.92 : 0.88,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeRoot.add(sphereMesh);

    // 2. Latitude and Longitude Geodesic Rings
    const ringsGroup = new THREE.Group();
    globeRoot.add(ringsGroup);

    const gridMat = new THREE.LineBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.22 : 0.18,
    });

    // Latitudes (every 30 degrees)
    for (let lat = -60; lat <= 60; lat += 30) {
      const phi = (90 - lat) * (Math.PI / 180);
      const r = GLOBE_RADIUS * Math.sin(phi);
      const y = GLOBE_RADIUS * Math.cos(phi);
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segs = 64;
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r));
      }
      ringGeo.setFromPoints(points);
      const ringLine = new THREE.Line(ringGeo, gridMat);
      ringsGroup.add(ringLine);
    }

    // Longitudes (every 45 degrees)
    for (let lon = 0; lon < 180; lon += 45) {
      const ringGeo = new THREE.BufferGeometry();
      const points: THREE.Vector3[] = [];
      const segs = 64;
      for (let i = 0; i <= segs; i++) {
        const theta = (i / segs) * Math.PI * 2;
        const x = Math.sin(theta) * GLOBE_RADIUS;
        const y = Math.cos(theta) * GLOBE_RADIUS;
        points.push(new THREE.Vector3(x, y, 0));
      }
      ringGeo.setFromPoints(points);
      const ringLine = new THREE.Line(ringGeo, gridMat);
      ringLine.rotation.y = (lon * Math.PI) / 180;
      ringsGroup.add(ringLine);
    }

    // 3. Continental Landmass Dot Matrix via InstancedMesh
    const dotCoords: THREE.Vector3[] = [];
    const latStep = 2.4;
    const lonStep = 2.4;

    for (let lat = -75; lat <= 78; lat += latStep) {
      for (let lon = -180; lon < 180; lon += lonStep) {
        if (isLand(lat, lon)) {
          // slight random jitter for natural digital texture
          const jitterLat = lat + (Math.random() - 0.5) * 0.4;
          const jitterLon = lon + (Math.random() - 0.5) * 0.4;
          dotCoords.push(latLonToVector3(jitterLat, jitterLon, GLOBE_RADIUS * 1.002));
        }
      }
    }

    const dotCount = dotCoords.length;
    const dotGeo = new THREE.SphereGeometry(0.016, 6, 6);
    const dotMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.85 : 0.75,
    });
    const dotMesh = new THREE.InstancedMesh(dotGeo, dotMat, dotCount);
    const dummy = new THREE.Object3D();

    for (let i = 0; i < dotCount; i++) {
      dummy.position.copy(dotCoords[i]);
      // orient outward normal
      dummy.lookAt(0, 0, 0);
      dummy.updateMatrix();
      dotMesh.setMatrixAt(i, dummy.matrix);
    }
    dotMesh.instanceMatrix.needsUpdate = true;
    globeRoot.add(dotMesh);

    // 4. Global Hubs & Beacons
    const hubPositions: THREE.Vector3[] = HUBS.map((h) =>
      latLonToVector3(h.lat, h.lon, GLOBE_RADIUS * 1.01)
    );

    const hubGroup = new THREE.Group();
    globeRoot.add(hubGroup);

    const hubDotGeo = new THREE.SphereGeometry(0.038, 12, 12);
    const hubDotMat = new THREE.MeshBasicMaterial({
      color: secondaryColor,
    });

    const hubRingGeo = new THREE.RingGeometry(0.045, 0.07, 24);
    const hubRingMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });

    const hubRings: THREE.Mesh[] = [];

    hubPositions.forEach((pos) => {
      // Small core pin
      const hubMesh = new THREE.Mesh(hubDotGeo, hubDotMat);
      hubMesh.position.copy(pos);
      hubGroup.add(hubMesh);

      // Radar beacon ring
      const ringMesh = new THREE.Mesh(hubRingGeo, hubRingMat);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.002));
      ringMesh.lookAt(0, 0, 0);
      hubGroup.add(ringMesh);
      hubRings.push(ringMesh);
    });

    // 5. Great-Circle 3D Data Arcs between Hubs
    const arcsGroup = new THREE.Group();
    globeRoot.add(arcsGroup);

    const arcMat = new THREE.LineBasicMaterial({
      color: secondaryColor,
      transparent: true,
      opacity: isDark ? 0.65 : 0.55,
      blending: THREE.AdditiveBlending,
    });

    // Traveling photons along arcs
    interface ArcPhoton {
      curve: THREE.CubicBezierCurve3;
      mesh: THREE.Mesh;
      progress: number;
      speed: number;
    }
    const photons: ArcPhoton[] = [];
    const photonGeo = new THREE.SphereGeometry(0.026, 8, 8);
    const photonMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
    });

    HUB_CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const vStart = hubPositions[startIdx];
      const vEnd = hubPositions[endIdx];

      // Distance on sphere
      const dist = vStart.distanceTo(vEnd);
      const arcElevation = GLOBE_RADIUS + Math.min(dist * 0.45, 0.7);

      const mid1 = vStart.clone().lerp(vEnd, 0.33);
      mid1.normalize().multiplyScalar(arcElevation);

      const mid2 = vStart.clone().lerp(vEnd, 0.66);
      mid2.normalize().multiplyScalar(arcElevation);

      const curve = new THREE.CubicBezierCurve3(vStart, mid1, mid2, vEnd);
      const curvePts = curve.getPoints(40);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curvePts);
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcsGroup.add(arcLine);

      // Add 1 or 2 photons per arc
      const photonMesh = new THREE.Mesh(photonGeo, photonMat);
      arcsGroup.add(photonMesh);
      photons.push({
        curve,
        mesh: photonMesh,
        progress: Math.random(),
        speed: 0.18 + Math.random() * 0.15,
      });
    });

    // 6. Outer Celestial / Telemetry Orbit Ring
    const orbitGroup = new THREE.Group();
    orbitGroup.rotation.x = Math.PI / 3;
    globeRoot.add(orbitGroup);

    const orbitRingGeo = new THREE.TorusGeometry(GLOBE_RADIUS * 1.35, 0.005, 12, 100);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: primaryColor,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
    });
    const orbitMesh = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitGroup.add(orbitMesh);

    // Satellites on orbit
    const satGeo = new THREE.BoxGeometry(0.045, 0.03, 0.03);
    const satMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
    });
    const satelliteCount = 3;
    const satellites: THREE.Mesh[] = [];
    for (let i = 0; i < satelliteCount; i++) {
      const s = new THREE.Mesh(satGeo, satMat);
      orbitGroup.add(s);
      satellites.push(s);
    }

    // 7. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.8 : 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, isDark ? 2.2 : 1.8);
    keyLight.position.set(4, 3, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(glowColor, isDark ? 2.5 : 1.5);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    // 8. Interactive Orbit & Drag Controls with Inertial Damping
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotVelY = 0.0035; // base constant rotation
    let rotVelX = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normalizedX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normalizedY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      if (isDragging) {
        const deltaX = e.clientX - prevX;
        const deltaY = e.clientY - prevY;
        globeRoot.rotation.y += deltaX * 0.007;
        globeRoot.rotation.x += deltaY * 0.007;
        prevX = e.clientX;
        prevY = e.clientY;
      } else {
        targetTiltX = normalizedY * 0.2;
        targetTiltY = normalizedX * 0.2;
      }
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - prevX;
        const deltaY = e.touches[0].clientY - prevY;
        globeRoot.rotation.y += deltaX * 0.009;
        globeRoot.rotation.x += deltaY * 0.009;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // Responsive sizing
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 400;
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

    // Theme Mutation Observer
    const themeObserver = new MutationObserver(() => {
      const isNowDark =
        document.documentElement.classList.contains("dark") ||
        document.documentElement.dataset.theme === "dark";

      primaryColor = isNowDark ? 0x38bdf8 : 0x0284c7;
      secondaryColor = isNowDark ? 0x818cf8 : 0x4f46e5;
      glowColor = isNowDark ? 0x0ea5e9 : 0x2563eb;
      sphereBaseColor = isNowDark ? 0x030718 : 0x0f172a;

      sphereMat.color.setHex(sphereBaseColor);
      sphereMat.opacity = isNowDark ? 0.92 : 0.88;
      gridMat.color.setHex(primaryColor);
      dotMat.color.setHex(primaryColor);
      hubDotMat.color.setHex(secondaryColor);
      hubRingMat.color.setHex(primaryColor);
      arcMat.color.setHex(secondaryColor);
      orbitRingMat.color.setHex(primaryColor);
      ambientLight.intensity = isNowDark ? 0.8 : 1.1;
      keyLight.intensity = isNowDark ? 2.2 : 1.8;
      rimLight.color.setHex(glowColor);
      rimLight.intensity = isNowDark ? 2.5 : 1.5;
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    // Animation Loop with delta time
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Continuous autonomous rotation when not actively dragging
      if (!isDragging) {
        globeRoot.rotation.y += rotVelY;
        // subtle cursor parallax damping
        globeRoot.rotation.x += (targetTiltX - globeRoot.rotation.x * 0.1) * 0.03;
      }

      // Pulse beacon rings
      const pulse = 1 + Math.sin(time * 0.0035) * 0.35;
      hubRings.forEach((ring) => {
        ring.scale.set(pulse, pulse, pulse);
      });

      // Advance photons along great-circle arcs
      photons.forEach((p) => {
        p.progress = (p.progress + delta * p.speed) % 1;
        const pt = p.curve.getPointAt(p.progress);
        p.mesh.position.copy(pt);
      });

      // Orbit satellites around outer telemetry ring
      const orbitSpeed = time * 0.0006;
      const orbitR = GLOBE_RADIUS * 1.35;
      satellites.forEach((sat, idx) => {
        const offset = (idx / satelliteCount) * Math.PI * 2;
        const angle = orbitSpeed + offset;
        sat.position.set(Math.cos(angle) * orbitR, Math.sin(angle) * orbitR, 0);
        sat.rotation.z = angle + Math.PI / 2;
      });

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      themeObserver.disconnect();

      // Clean disposal
      sphereGeo.dispose();
      sphereMat.dispose();
      gridMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      hubDotGeo.dispose();
      hubDotMat.dispose();
      hubRingGeo.dispose();
      hubRingMat.dispose();
      arcMat.dispose();
      photonGeo.dispose();
      photonMat.dispose();
      orbitRingGeo.dispose();
      orbitRingMat.dispose();
      satGeo.dispose();
      satMat.dispose();
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
        "mx-auto h-[320px] w-full sm:h-[400px] md:h-[440px]"
      }`}
      title="Global AI Autonomous Network — Click and drag to rotate the globe"
    />
  );
}
