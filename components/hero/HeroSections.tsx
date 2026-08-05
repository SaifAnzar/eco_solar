"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Phone,
  ShieldCheck,
  Zap,
  MapPin,
  Calculator,
  TrendingUp,
  Award,
  Sparkles,
} from "lucide-react";
import * as THREE from "three";
import { calculateSolarQuote } from "@/lib/solar-engine";
import { TypewriterHeadline } from "./TypewriterHeadline";

// ─────────────────────────────────────────────────────────────────────────────
// CLASSIC HERO (Light theme — Original Calculator Card layout)
// ─────────────────────────────────────────────────────────────────────────────

export const HeroSectionClassic: React.FC = () => {
  const [monthlyBill, setMonthlyBill] = useState<number>(3500);
  const estimatedKw = Math.max(1, Math.min(10, Math.round(monthlyBill / 1000)));
  const quote = calculateSolarQuote(estimatedKw, 4.5, true);

  return (
    <section className="relative py-20 lg:py-28 border-b border-slate-100 overflow-hidden bg-white">
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-emerald-200 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                Official Solar Installer · Odisha
              </span>
            </div>

            {/* Dynamic Typewriter Headline */}
            <TypewriterHeadline highlightClassName="text-emerald-600 font-extrabold" textClassName="text-slate-900" />

            {/* Subtitle */}
            <p className="text-lg text-slate-500 leading-relaxed max-w-lg">
              Rooftop solar for homes, offices &amp; farms across Odisha. We take care of panels, installation, government subsidy, and meter approval — start to finish.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20"
              >
                Calculate Solar Savings
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919124318222"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-200 shadow-sm transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                Call Our Team
              </a>
            </div>

            {/* Partnership CTAs */}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block">
                🚀 Grow with Odisha&apos;s Leading Solar Network
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/franchise"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/20 hover:scale-[1.01] active:scale-[0.99] border border-amber-400"
                >
                  Apply for Franchise 🏢
                </Link>
                <Link
                  href="/dealership"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-emerald-50 text-emerald-700 hover:text-emerald-800 font-bold text-sm rounded-xl border-2 border-emerald-500 shadow-sm hover:shadow-emerald-500/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  Become a Dealer 📦
                </Link>
              </div>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-5 pt-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                25-Year Warranty
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Meter Approval Included
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-500" />
                Patia, Bhubaneswar
              </span>
            </div>
          </div>

          {/* RIGHT — Savings Calculator Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xl space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <h2 className="text-lg font-bold text-slate-900">How Much Can You Save?</h2>
              </div>
              <p className="text-sm text-slate-500">Enter your monthly bill to get an instant estimate.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Monthly Electricity Bill (₹)
                </label>
                <input
                  type="number"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value) || 0)}
                  step="500"
                  min="500"
                  max="50000"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-base font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Results */}
            <div className="bg-slate-900 rounded-xl p-5 space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-slate-700 pb-3">
                <span className="text-slate-400">Recommended Size</span>
                <strong className="text-amber-400">{quote.systemKw} kW System</strong>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-slate-700 pb-2">
                <span className="text-slate-400">Central Subsidy (PM Surya Ghar)</span>
                <strong className="text-emerald-400">₹{quote.centralSubsidy.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-slate-700 pb-2">
                <span className="text-slate-400">Odisha State Subsidy</span>
                <strong className="text-amber-400">₹{quote.stateSubsidy.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center text-xs border-b border-slate-700 pb-2">
                <span className="text-slate-300 font-bold">Total Govt Subsidy</span>
                <strong className="text-emerald-300 font-bold">₹{quote.totalSubsidy.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Yearly Savings</span>
                <strong className="text-white">₹{quote.annualSavingsRs.toLocaleString()} / yr</strong>
              </div>
            </div>

            <Link
              href="/calculator"
              className="block w-full text-center py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-emerald-600/30"
            >
              Get My Full Solar Plan →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// FULL-BLEED PHOTOREALISTIC THREE.JS 3D WEBGL HERO CANVAS ENGINE
// ─────────────────────────────────────────────────────────────────────────────

const FullBleedThreeHeroCanvas: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // 1. THREE SCENE & CAMERA
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x040914, 0.07);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.8, 8.8);
    camera.lookAt(0, 0, 0);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 3. LIGHTING
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.6);
    scene.add(ambientLight);

    const fillLight = new THREE.DirectionalLight(0x34d399, 1.0);
    fillLight.position.set(-6, 6, -4);
    scene.add(fillLight);

    // 4. TEXTURE LOADER FOR PHOTOREALISM
    const textureLoader = new THREE.TextureLoader();

    // Load Photorealistic Textures
    const sunTex = textureLoader.load("/images/sun-texture.png");
    const panelTex = textureLoader.load("/images/panel-texture.png");

    sunTex.colorSpace = THREE.SRGBColorSpace;
    panelTex.colorSpace = THREE.SRGBColorSpace;

    // 5. PHOTOREALISTIC 3D SOLAR PANEL ARRAY
    const solarGroup = new THREE.Group();
    const isMobile = width < 1024;
    solarGroup.position.set(isMobile ? 0 : 2.5, isMobile ? -1.5 : -0.2, 0);
    solarGroup.rotation.x = Math.PI * 0.28;
    solarGroup.rotation.y = -Math.PI * 0.15;
    scene.add(solarGroup);

    // Box Geometry with Photorealistic Texture Mapping
    const panelWidth = 4.6;
    const panelHeight = 0.14;
    const panelDepth = 3.1;

    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.88,
      roughness: 0.18,
    });

    const topCellMat = new THREE.MeshPhysicalMaterial({
      map: panelTex,
      metalness: 0.85,
      roughness: 0.08,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 1.0,
    });

    // Multi-material mapping: Top face uses photovoltaic texture map, sides use metallic frame material
    const panelMaterials = [
      frameMat, // right
      frameMat, // left
      topCellMat, // TOP face (photovoltaic silicon cells texture map)
      frameMat, // bottom
      frameMat, // front
      frameMat, // back
    ];

    const panelGeo = new THREE.BoxGeometry(panelWidth, panelHeight, panelDepth);
    const panelMesh = new THREE.Mesh(panelGeo, panelMaterials);
    panelMesh.castShadow = true;
    panelMesh.receiveShadow = true;
    solarGroup.add(panelMesh);

    // Optic Fiber Edge Highlight
    const edgeGeo = new THREE.BoxGeometry(panelWidth + 0.04, 0.04, panelDepth + 0.04);
    const edgeMat = new THREE.MeshBasicMaterial({ color: 0x34d399, wireframe: true });
    const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
    edgeMesh.position.y = 0.03;
    solarGroup.add(edgeMesh);

    // Mounting Pedestal Legs
    const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.4, 16);
    const legMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.85, roughness: 0.25 });

    const leg1 = new THREE.Mesh(legGeo, legMat);
    leg1.position.set(-1.4, -0.7, 0);
    solarGroup.add(leg1);

    const leg2 = new THREE.Mesh(legGeo, legMat);
    leg2.position.set(1.4, -0.7, 0);
    solarGroup.add(leg2);

    const baseGeo = new THREE.BoxGeometry(3.4, 0.08, 0.6);
    const baseMesh = new THREE.Mesh(baseGeo, legMat);
    baseMesh.position.set(0, -1.4, 0);
    solarGroup.add(baseMesh);

    // 6. PHOTOREALISTIC 3D ORBITING SUN & REAL POINT LIGHT
    const sunGroup = new THREE.Group();
    scene.add(sunGroup);

    // 3D Sun Sphere Mesh with Photorealistic Plasma Texture Map & Emissive Glow
    const sunGeo = new THREE.SphereGeometry(0.55, 64, 64);
    const sunMat = new THREE.MeshStandardMaterial({
      map: sunTex,
      emissiveMap: sunTex,
      emissive: 0xfbbf24,
      emissiveIntensity: 2.4,
      roughness: 0.1,
    });
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunGroup.add(sunMesh);

    // Outer Solar Flare Corona Atmosphere
    const coronaGeo = new THREE.SphereGeometry(0.82, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      transparent: true,
      opacity: 0.35,
      wireframe: true,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    sunGroup.add(coronaMesh);

    // REAL 3D POINT LIGHT (Illuminates solar panel and scene with warm golden sun rays)
    const sunPointLight = new THREE.PointLight(0xfbbf24, 18, 40);
    sunPointLight.castShadow = true;
    sunPointLight.shadow.mapSize.width = 1024;
    sunPointLight.shadow.mapSize.height = 1024;
    sunGroup.add(sunPointLight);

    // 7. FULL-HERO 3D PARTICLES DUST & PHOTONS
    const particleCount = 380;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 16;
      particlePositions[i + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i + 2] = (Math.random() - 0.5) * 14;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x34d399,
      size: 0.045,
      transparent: true,
      opacity: 0.7,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 8. FULL-HERO 3D ORBIT TRACK TRAJECTORY
    const orbitCurve = new THREE.EllipseCurve(
      0, 0,
      6.5, 3.0,
      0, 2 * Math.PI,
      false,
      0
    );
    const points = orbitCurve.getPoints(120);
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(
      points.map((p) => new THREE.Vector3(p.x, 0, p.y))
    );
    const orbitMat = new THREE.LineDashedMaterial({
      color: 0xfbbf24,
      dashSize: 0.25,
      gapSize: 0.15,
      opacity: 0.38,
      transparent: true,
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    orbitLine.computeLineDistances();
    scene.add(orbitLine);

    // Parallax Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 9. ANIMATION RENDER LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous 360-Degree 3D Sun Orbit Loop
      const orbitSpeed = 0.35;
      const orbitRadiusX = 6.5;
      const orbitRadiusZ = 3.0;

      const sunX = Math.cos(elapsedTime * orbitSpeed) * orbitRadiusX;
      const sunZ = Math.sin(elapsedTime * orbitSpeed) * orbitRadiusZ;
      const sunY = Math.sin(elapsedTime * orbitSpeed * 0.5) * 0.9 + 0.4;

      sunGroup.position.set(sunX, sunY, sunZ);
      
      // Spin the Photorealistic Sun Plasma Texture on its axis
      sunMesh.rotation.y += 0.008;
      coronaMesh.rotation.y += 0.012;
      coronaMesh.rotation.x += 0.006;

      // Solar Panel Floating Levitation
      solarGroup.position.y = (isMobile ? -1.5 : -0.2) + Math.sin(elapsedTime * 1.4) * 0.1;

      // Mouse Parallax Lerp for Camera & Panel
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.04;
      camera.position.y += (2.0 + mouseY * 0.4 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      solarGroup.rotation.y += (mouseX * 0.35 - (solarGroup.rotation.y - (-Math.PI * 0.15))) * 0.04;

      // Particle Floating drift
      const posArray = particleGeo.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        posArray[i] += 0.004;
        if (posArray[i] > 6) posArray[i] = -4;
      }
      particleGeo.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Listener
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      const mobile = width < 1024;
      solarGroup.position.set(mobile ? 0 : 2.5, mobile ? -1.5 : -0.2, 0);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-auto" />
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// NEW ANIMATED HERO — FULL-BLEED PHOTOREALISTIC 3D WEBGL SUN ORBIT HERO
// ─────────────────────────────────────────────────────────────────────────────

export const HeroSection3DSunOrbit: React.FC = () => {
  const [watts, setWatts] = useState<number>(4890);

  useEffect(() => {
    const interval = setInterval(() => {
      setWatts(4800 + Math.floor(Math.random() * 170));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#040914] text-white border-b border-slate-800">
      {/* ── FULL-BLEED PHOTOREALISTIC THREE.JS 3D CANVAS BACKGROUND ── */}
      <FullBleedThreeHeroCanvas />

      {/* Radial background grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: "radial-gradient(#64748b 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Atmospheric glow overlays */}
      <div className="absolute top-0 left-1/4 w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[650px] h-[650px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ── FOREGROUND CONTENT OVERLAY LAYER ────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full pointer-events-none">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Typography & CTAs (Glass Panel Container) */}
          <div className="space-y-8 backdrop-blur-md bg-slate-950/45 p-6 sm:p-8 rounded-3xl border border-slate-800/80 shadow-2xl pointer-events-auto max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_#34d399]" />
              <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                Official Solar Installer · Odisha
              </span>
            </div>

            {/* Typewriter Headline */}
            <TypewriterHeadline
              highlightClassName="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-300 font-extrabold drop-shadow-[0_0_30px_rgba(52,211,153,0.45)]"
              textClassName="text-white"
            />

            {/* Subtitle */}
            <p className="text-lg text-slate-300 leading-relaxed">
              Rooftop solar for homes, offices &amp; farms across Odisha. We take care of panels, installation, government subsidy, and meter approval — start to finish.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3.5">
              <Link
                href="/calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Calculate Solar Savings
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:+919124318222"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-semibold text-sm rounded-xl border border-slate-700 hover:border-slate-500 shadow-sm transition-all"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                Call Our Team
              </a>
            </div>

            {/* Partnership CTAs */}
            <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2.5">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Grow with Odisha&apos;s Leading Solar Network
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/franchise"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-[0_0_30px_rgba(251,191,36,0.4)] hover:scale-[1.02] active:scale-[0.98] border border-amber-400/80"
                >
                  Apply for Franchise 🏢
                </Link>
                <Link
                  href="/dealership"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900/90 hover:bg-emerald-950/40 text-emerald-300 font-bold text-sm rounded-xl border-2 border-emerald-500/80 hover:border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Become a Dealer 📦
                </Link>
              </div>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap gap-5 pt-2 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                25-Year Warranty
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                Meter Approval Included
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Patia, Bhubaneswar
              </span>
            </div>
          </div>

          {/* RIGHT — FLOATING TELEMETRY GLASS CARDS */}
          <div className="hidden lg:flex flex-col gap-5 items-end justify-center pointer-events-auto">
            {/* Live Generation Card */}
            <div className="backdrop-blur-xl bg-slate-900/85 border border-emerald-500/50 rounded-2xl p-4 shadow-[0_20px_45px_rgba(0,0,0,0.6)] flex items-center gap-4 hover:border-emerald-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                <Zap className="w-6 h-6 fill-emerald-400 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  Live Solar Output
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-xl font-extrabold text-white font-mono mt-0.5">
                  {(watts / 1000).toFixed(2)} <span className="text-xs text-emerald-400 font-sans font-bold">kW</span>
                </div>
              </div>
            </div>

            {/* Bill Reduction Card */}
            <div className="backdrop-blur-xl bg-slate-900/85 border border-amber-500/50 rounded-2xl p-4 shadow-[0_20px_45px_rgba(0,0,0,0.6)] flex items-center gap-4 hover:border-amber-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Monthly Electricity Bill</div>
                <div className="text-xl font-extrabold text-amber-400 mt-0.5">
                  Cut to <span className="text-white underline decoration-emerald-500 decoration-2">Almost 0</span>
                </div>
              </div>
            </div>

            {/* Govt Subsidy Pill */}
            <div className="backdrop-blur-xl bg-slate-900/85 border border-teal-500/40 rounded-full px-5 py-2.5 shadow-xl flex items-center gap-2.5">
              <Award className="w-5 h-5 text-teal-400" />
              <span className="text-xs font-bold text-slate-200">Govt Subsidy: <strong className="text-emerald-400 font-extrabold">Up to ₹78,000</strong></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection3DSunOrbit;
