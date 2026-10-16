import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import footer3DVideo from '../assets/images/hero_engine_showroom.mp4';

export const Footer3DBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Scene & Camera setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100
    );
    camera.position.set(0, 0, 14);

    // Renderer setup following Three.js modern standards
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // Lighting rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const redAccentLight = new THREE.PointLight(0xa31414, 5, 20);
    redAccentLight.position.set(3, 2, 4);
    scene.add(redAccentLight);

    const cyanRimLight = new THREE.PointLight(0x38bdf8, 3, 20);
    cyanRimLight.position.set(-4, -2, 3);
    scene.add(cyanRimLight);

    // 3D Engine Mechanical Wireframe & Assembly Group
    const engineGroup = new THREE.Group();
    scene.add(engineGroup);

    // 1. Rotating Mechanical Ring (Flywheel / Camshaft Gear representation)
    const gearGeometry = new THREE.TorusGeometry(3.2, 0.08, 16, 64);
    const gearMaterial = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2,
      wireframe: true,
    });
    const mainGear = new THREE.Mesh(gearGeometry, gearMaterial);
    engineGroup.add(mainGear);

    // 2. Inner Secondary Gear
    const innerGearGeo = new THREE.TorusGeometry(2.1, 0.05, 12, 48);
    const innerGearMat = new THREE.MeshStandardMaterial({
      color: 0xa31414,
      metalness: 0.8,
      roughness: 0.3,
      wireframe: true,
    });
    const innerGear = new THREE.Mesh(innerGearGeo, innerGearMat);
    engineGroup.add(innerGear);

    // 3. Central Wireframe Cylinder (Piston sleeve representation)
    const cylinderGeo = new THREE.CylinderGeometry(1.2, 1.2, 3.6, 24, 6, true);
    const cylinderMat = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      metalness: 0.85,
      roughness: 0.25,
      wireframe: true,
    });
    const cylinderMesh = new THREE.Mesh(cylinderGeo, cylinderMat);
    cylinderMesh.rotation.x = Math.PI / 3;
    engineGroup.add(cylinderMesh);

    // 4. Floating 3D Spark / Particle Field
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      scales[i] = Math.random() * 0.06 + 0.02;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xfca5a5,
      size: 0.12,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // Position the 3D assembly towards the center-right to frame Quick Navigation naturally
    engineGroup.position.set(2.5, 0, 0);

    // Mouse movement interaction tracking
    let targetRotX = 0;
    let targetRotY = 0;
    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * 0.7;
      targetRotX = y * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container || !canvas) return;
      const width = container.clientWidth;
      const height = Math.max(container.clientHeight, 1);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth damped rotation
      engineGroup.rotation.y += delta * 0.45;
      engineGroup.rotation.x = THREE.MathUtils.damp(engineGroup.rotation.x, targetRotX + Math.sin(elapsedTime * 0.5) * 0.15, 3, delta);
      engineGroup.rotation.z = THREE.MathUtils.damp(engineGroup.rotation.z, targetRotY + Math.cos(elapsedTime * 0.4) * 0.15, 3, delta);

      innerGear.rotation.z -= delta * 0.8;
      cylinderMesh.rotation.y += delta * 0.6;

      // Particle subtle drifting
      particleField.rotation.y = elapsedTime * 0.04;
      particleField.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // Clean disposal on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      gearGeometry.dispose();
      gearMaterial.dispose();
      innerGearGeo.dispose();
      innerGearMat.dispose();
      cylinderGeo.dispose();
      cylinderMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none"
    >
      {/* 3D Background Video: Looping Showroom Engine Video */}
      <video
        src={footer3DVideo}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.2] saturate-[0.85] scale-105"
      />

      {/* Real-time Three.js 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      />

      {/* Cinematic High-Contrast Tint & Edge Vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b0f19]/92 via-[#0b1120]/75 to-[#0b0f19]/90" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19] via-transparent to-[#05070d]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0b0f19]/40 to-[#05070d]/80" />
    </div>
  );
};
