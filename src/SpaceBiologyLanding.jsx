import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { motion } from "framer-motion";
import { Rocket, Atom, Database, Cpu, Globe2, Satellite, BookOpen } from "lucide-react";

/* =============================================
   3D COMPONENTS
   ============================================= */
function RotatingEarth(props) {
  const mesh = useRef();
  useFrame((state, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.05;
  });
  return (
    <group {...props}>
      <mesh ref={mesh} castShadow receiveShadow>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial metalness={0.2} roughness={0.6} color="#6bb1ff" />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2.4, 0]}>
        <sphereGeometry args={[1.602, 64, 64]} />
        <meshStandardMaterial transparent opacity={0.45} color="#001427" />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.65, 64, 64]} />
        <meshStandardMaterial transparent opacity={0.07} color="#ffffff" />
      </mesh>
    </group>
  );
}

function MiniSatellite({ position = [3, 0.4, -1] }) {
  const ref = useRef();
  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.6;
    ref.current.position.x = Math.sin(Date.now() * 0.0004) * 3.2;
    ref.current.position.z = Math.cos(Date.now() * 0.0004) * 3.2;
  });
  return (
    <group ref={ref} position={position}>
      <mesh castShadow>
        <boxGeometry args={[0.25, 0.25, 0.5]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[0, 0, -0.4]}>
        <boxGeometry args={[0.9, 0.05, 0.02]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
      <mesh position={[0, 0, 0.4]}>
        <boxGeometry args={[0.9, 0.05, 0.02]} />
        <meshStandardMaterial color="#60a5fa" />
      </mesh>
    </group>
  );
}

/* =============================================
   UI HELPERS
   ============================================= */
const Wave = ({ className = "" }) => (
  <svg viewBox="0 0 1440 100" className={className} preserveAspectRatio="none">
    <path d="M0,30 C240,90 480,0 720,40 C960,80 1200,10 1440,50 L1440,100 L0,100 Z" fill="url(#g)"/>
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2"/>
        <stop offset="100%" stopColor="#6366f1" stopOpacity="0.15"/>
      </linearGradient>
    </defs>
  </svg>
);

const Card = ({ icon: Icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-5 backdrop-blur shadow-lg hover:shadow-xl hover:border-slate-500/60 transition"
  >
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 rounded-xl bg-slate-900/60">
        <Icon size={22} />
      </div>
      <h4 className="text-slate-100 font-semibold tracking-wide uppercase text-sm">{title}</h4>
    </div>
    <p className="text-slate-300 text-sm leading-relaxed">{children}</p>
  </motion.div>
);

/* =============================================
   BRAND: PURE SVG WORDMARK + SPLASH
   ============================================= */
function BrandWordmark({ className = "", size = "md" }) {
  const iconSize = size === "sm" ? "h-6 w-6" : "h-7 w-7";
  const titleSize = size === "sm" ? "text-sm md:text-base" : "text-base md:text-lg";
  const sublineSize = size === "sm" ? "text-[9px] md:text-[10px]" : "text-[10px] md:text-[11px]";

  return (
    <div className={`flex items-center gap-3 ${className}`} aria-label="NileStellar — Space Biology Knowledge Engine">
      <svg viewBox="0 0 40 40" className={iconSize} aria-hidden="true">
        <defs>
          <linearGradient id="ns-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA"/>
            <stop offset="100%" stopColor="#6366F1"/>
          </linearGradient>
          <radialGradient id="ns-b" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,.35)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx="20" cy="20" r="19" fill="url(#ns-b)" />
        <ellipse cx="20" cy="18" rx="13" ry="6.2" fill="none" stroke="url(#ns-a)" strokeWidth="1.6" opacity=".9"/>
        <path
          d="M14 31c4-7 12-7 12-16 0-3-2-6-6-6s-6 3-6 6c0 9 8 9 12 16"
          fill="none" stroke="url(#ns-a)" strokeWidth="3" strokeLinecap="round"
        />
      </svg>
      <div className="leading-tight select-none">
        <div className={`text-white font-semibold tracking-tight ${titleSize}`}>
          <span className="font-bold">Nile</span>
          <span className="font-semibold">Stellar</span>
        </div>
        <div className={`hidden sm:block ${sublineSize} text-slate-300/80 tracking-wide`}>
          — Space Biology Knowledge Engine
        </div>
      </div>
    </div>
  );
}

function SplashLockup() {
  return (
    <div className="flex flex-col items-center text-center">
      <svg viewBox="0 0 520 320" className="w-[260px] md:w-[360px] h-auto drop-shadow-[0_12px_30px_rgba(56,189,248,.35)]">
        <defs>
          <linearGradient id="lg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60A5FA"/><stop offset="100%" stopColor="#6366F1"/>
          </linearGradient>
          <radialGradient id="glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(255,255,255,.35)"/><stop offset="100%" stopColor="transparent"/>
          </radialGradient>
        </defs>
        <circle cx="260" cy="140" r="130" fill="url(#glow)" opacity=".5"/>
        <ellipse cx="260" cy="120" rx="145" ry="38" fill="none" stroke="url(#lg1)" strokeWidth="3"/>
        <path d="M200 250c50-85 120-70 120-140 0-28-20-50-60-50s-60 22-60 50c0 70 70 55 120 140"
              fill="none" stroke="url(#lg1)" strokeWidth="12" strokeLinecap="round"/>
        <g transform="translate(0,260)">
          <text x="260" textAnchor="middle" fill="#fff" fontWeight="700" fontSize="54" fontFamily="ui-sans-serif, system-ui">NileStellar</text>
          <text x="260" y="28" textAnchor="middle" fill="rgba(226,232,240,.9)" fontSize="16" letterSpacing=".04em">
            — Space Biology Knowledge Engine
          </text>
        </g>
      </svg>
      <div className="mt-3">
        <div className="mx-auto h-[3px] w-48 rounded-full bg-slate-600/40 overflow-hidden">
          <div className="h-full w-1/3 animate-[splashbar_1.2s_ease_infinite] bg-gradient-to-r from-sky-400 to-indigo-400" />
        </div>
        <p className="mt-3 text-slate-300/90 text-sm">Engaging Systems…</p>
      </div>
      <style>{`
        @keyframes splashbar { 0%{transform:translateX(-50%)}50%{transform:translateX(150%)}100%{transform:translateX(350%)}}
      `}</style>
    </div>
  );
}

function SplashScreen({ onDone, duration = 1400 }) {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), duration);
    return () => clearTimeout(t);
  }, [onDone, duration]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050914]">
      <div className="absolute inset-4 rounded-3xl bg-gradient-to-b from-[#0b1224] to-[#050914] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)]" />
      <div className="relative z-10">
        <SplashLockup />
      </div>
    </div>
  );
}

/* =============================================
   PAGE
   ============================================= */
export default function SpaceBiologyLanding() {
  const [showSplash, setShowSplash] = useState(false);

  return (
    <div className="min-h-screen w-full bg-[#050914] text-slate-100 selection:bg-sky-400/30 selection:text-white">
      {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}

      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-[#050914]/70 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <a href="/" className="hover:opacity-95 transition" aria-label="NileStellar home">
            <BrandWordmark />
          </a>
          <nav className="hidden md:flex gap-8 text-slate-300 text-sm">
            <a className="hover:text-white" href="#about">About</a>
            <div className="relative group">
              <a href="#technology" className="hover:text-white flex items-center gap-1">
                Technology
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </a>
              <div
                className="pointer-events-auto invisible opacity-0 translate-y-2 scale-95
                           group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                           transition duration-200 ease-out will-change-transform
                           absolute right-0 mt-2 w-56 rounded-xl border border-slate-700
                           bg-slate-900/95 backdrop-blur shadow-2xl z-50"
                role="menu"
              >
                <a href="/#orbit-earth" role="menuitem" className="block px-4 py-3 text-slate-200 hover:bg-slate-800/70 rounded-t-xl">ORBIT THE EARTH</a>
                <a href="#adventure" role="menuitem" className="block px-4 py-3 text-slate-200 hover:bg-slate-800/70 rounded-b-xl">Choose your Adventure</a>
              </div>
            </div>
            <a className="hover:text-white" href="#gallery">Gallery</a>
            <a className="hover:text-white" href="#satellites">Satellites</a>
            <a className="px-3 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/30" href="#apply">Apply</a>
          </nav>
        </div>
      </header>

      {/* Hero video */}
      <div className="w-full h-[800px] overflow-hidden relative">
        <video className="w-full h-full object-cover" src="/hero.mp4" autoPlay loop muted playsInline />
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* HERO */}
      <section id="orbit-earth" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 py-16 md:py-24 px-4 sm:px-6 lg:px-8 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              ORBIT THE <span className="text-sky-400">EARTH</span>
            </motion.h1>
            <p className="mt-5 text-slate-300 max-w-xl">
              NASA has been performing biology experiments in space for decades, generating a tremendous amount of
              information. Your challenge: build a dynamic dashboard powered by AI and knowledge graphs to summarize
              bioscience publications and explore the impact of space experiments.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="/dashboard" className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold">Get Started</a>
              <a href="#learn-more" className="px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-400">Learn More</a>
            </div>
          </div>
          <div className="relative h-[360px] md:h-[440px] lg:h-[520px] rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
            <Canvas camera={{ position: [0, 1.2, 5], fov: 50 }} shadows>
              <ambientLight intensity={0.5} />
              <directionalLight position={[3, 5, 2]} intensity={1.2} castShadow />
              <Stars radius={80} depth={60} count={6000} factor={4} fade />
              <RotatingEarth position={[0, 0, 0]} />
              <MiniSatellite />
              <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.2} />
            </Canvas>
            <div className="absolute inset-x-0 bottom-0 pointer-events-none">
              <Wave className="w-full h-16 opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Adventure CTA */}
      <section id="adventure" className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl" style={{ backgroundImage: "url('/adventure-lab.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#040816]/80 via-[#040816]/40 to-transparent" />
            <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16 max-w-3xl">
              <h2 className="text-white font-extrabold tracking-tight drop-shadow text-4xl sm:text-5xl md:text-6xl leading-tight">
                Unlock the <span className="text-sky-400">Cosmos</span> of Biology
              </h2>
              <div className="mt-6">
                {/* ✅ Updated link */}
                <a
                  href="/adventure"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl
                             bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-900 font-semibold
                             shadow-[0_8px_30px_rgba(56,189,248,0.35)]
                             hover:from-sky-300 hover:to-indigo-300 transition"
                >
                  Choose Your Adventure
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24
