global.FileReader = class FileReader {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result = buf;
      if (this.onload) this.onload();
      if (this.onloadend) this.onloadend();
    });
  }
  readAsDataURL(blob) {
    blob.arrayBuffer().then((buf) => {
      this.result =
        'data:application/octet-stream;base64,' +
        Buffer.from(buf).toString('base64');
      if (this.onload) this.onload();
      if (this.onloadend) this.onloadend();
    });
  }
};

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';
import fs from 'fs';
import path from 'path';

const scene = new THREE.Scene();
scene.name = 'InnoanswersAICore';

// Root group
const rootGroup = new THREE.Group();
rootGroup.name = 'NeuralCore';
scene.add(rootGroup);

// Outer crystal cage: Icosahedron faceted frame
const outerGeo = new THREE.IcosahedronGeometry(1.2, 0);
const outerMat = new THREE.MeshStandardMaterial({
  color: 0x7fd4ff,
  metalness: 0.85,
  roughness: 0.2,
  flatShading: true,
});
const outerMesh = new THREE.Mesh(outerGeo, outerMat);
outerMesh.name = 'OuterCrystal';
rootGroup.add(outerMesh);

// Inner core: Octahedron
const innerGeo = new THREE.OctahedronGeometry(0.7, 0);
const innerMat = new THREE.MeshStandardMaterial({
  color: 0x0091ff,
  metalness: 0.9,
  roughness: 0.1,
  emissive: 0x002244,
});
const innerMesh = new THREE.Mesh(innerGeo, innerMat);
innerMesh.name = 'QuantumCore';
rootGroup.add(innerMesh);

// Orbital ring 1 (torus)
const ring1Geo = new THREE.TorusGeometry(1.6, 0.03, 16, 64);
const ringMat = new THREE.MeshStandardMaterial({
  color: 0xa5e5ff,
  metalness: 0.95,
  roughness: 0.15,
});
const ring1 = new THREE.Mesh(ring1Geo, ringMat);
ring1.rotation.x = Math.PI / 3;
ring1.name = 'OrbitalRing1';
rootGroup.add(ring1);

// Orbital ring 2 (torus)
const ring2Geo = new THREE.TorusGeometry(1.8, 0.025, 16, 64);
const ring2 = new THREE.Mesh(ring2Geo, ringMat);
ring2.rotation.y = Math.PI / 4;
ring2.rotation.x = -Math.PI / 6;
ring2.name = 'OrbitalRing2';
rootGroup.add(ring2);

// Data nodes at vertices
const nodeGeo = new THREE.SphereGeometry(0.08, 16, 16);
const nodeMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 0.5,
  roughness: 0.2,
  emissive: 0x7fd4ff,
});

const positions = [
  [0, 1.6, 0],
  [0, -1.6, 0],
  [1.6, 0, 0],
  [-1.6, 0, 0],
  [0, 0, 1.6],
  [0, 0, -1.6],
];

positions.forEach((pos, idx) => {
  const node = new THREE.Mesh(nodeGeo, nodeMat);
  node.position.set(pos[0], pos[1], pos[2]);
  node.name = `Node_${idx}`;
  rootGroup.add(node);
});

const outputDir = path.resolve('public/assets');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const exporter = new GLTFExporter();
exporter.parse(
  scene,
  (glb) => {
    const buffer = Buffer.from(glb);
    const outputPath = path.join(outputDir, 'ai-core.glb');
    fs.writeFileSync(outputPath, buffer);
    console.log(`GLB model created successfully at ${outputPath} (${buffer.length} bytes)`);
  },
  (error) => {
    console.error('Error generating GLB:', error);
    process.exit(1);
  },
  { binary: true }
);
