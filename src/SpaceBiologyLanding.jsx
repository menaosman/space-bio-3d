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
      {/* Subtle glow ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <ringGeometry args={[1.8, 2.2, 64]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function MiniSatellite() {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      const r = 2.9;
      ref.current.position.x = Math.cos(t * 0.6) * r;
      ref.current.position.z = Math.sin(t * 0.6) * r;
      ref.current.position.y = 0.3 + Math.sin(t) * 0.1;
      ref.current.rotation.y = t * 1.2;
    }
  });
  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[0.18, 0.18, 0.18]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.6} roughness={0.2} />
      </mesh>
      <mesh position={[0.36, 0, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.02]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
      <mesh position={[-0.36, 0, 0]}>
        <boxGeometry args={[0.4, 0.1, 0.02]} />
        <meshStandardMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}

/* =============================================
   SMALL REUSABLES (Brand, Wave, Icons Stack)
   ============================================= */
function BrandWordmark({ titleSize = "text-xl sm:text-2xl" }) {
  return (
    <div className="inline-flex items-center gap-3">
      {/* Tiny orbital logo */}
      <svg width="40" height="40" viewBox="0 0 40 40" className="drop-shadow">
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
          NileStellar
        </div>
        <div className="text-[11px] text-slate-400 -mt-0.5">Space Biology Engine</div>
      </div>
    </div>
  );
}

function Wave({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0,96L60,122.7C120,149,240,203,360,224C480,245,600,235,720,224C840,213,960,203,1080,176C1200,149,1320,107,1380,85.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        fill="url(#wave-grad)" fillOpacity="0.35"
      />
      <defs>
        <linearGradient id="wave-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function FloatingIcons() {
  const items = [
    { Icon: Rocket, label: "Missions" },
    { Icon: Atom, label: "Biology" },
    { Icon: Database, label: "Datasets" },
    { Icon: Cpu, label: "AI" },
    { Icon: Globe2, label: "Earth" },
    { Icon: Satellite, label: "Sat" },
    { Icon: BookOpen, label: "Docs" },
  ];
  return (
    <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 opacity-90">
      {items.map(({ Icon, label }, i) => (
        <motion.div
          key={label}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: [0, -6, 0], opacity: 1 }}
          transition={{ delay: 0.1 * i, duration: 4, repeat: Infinity }}
          className="rounded-2xl bg-white/5 border border-white/10 px-3 py-2 flex flex-col items-center gap-1"
        >
          <Icon className="w-5 h-5 text-sky-400" />
          <span className="text-[11px] text-slate-300">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* =============================================
   SPLASH SCREEN (Optional Intro)
   ============================================= */
function SplashLockup() {
  return (
    <div className="flex items-center gap-5">
      <svg width="120" height="120" viewBox="0 0 520 280" className="drop-shadow-xl">
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
          <text x="260" textAnchor="middle" fill="#fff" fontSize="54" fontFamily="ui-sans-serif, system-ui">NileStellar</text>
          <text x="260" y="28" textAnchor="middle" fill="rgba(226,232,240,.9)" fontSize="16" letterSpacing=".04em">
            — Space Biology Knowledge Engine
          </text>
        </g>
      </svg>
      <div className="max-w-sm text-slate-200">
        <div className="text-2xl font-semibold">Launching</div>
        <div className="text-sm text-slate-400 mt-1">Preparing your space-biology cockpit…</div>
      </div>
    </div>
  );
}

function SplashScreen({ onDone, duration = 1400 }) {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), duration);
    return () => clearTimeout(t);
  }, [onDone, duration]);

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-[#040816]">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-6"
      >
        <SplashLockup />
      </motion.div>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </a>
              <div
                className="pointer-events-auto invisible opacity-0 translate-y-2 scale-95
                           group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                           transition duration-200 ease-out will-change-transform
                           absolute right-0 mt-3 w-[340px] rounded-2xl border border-slate-800 bg-[#070b1a]/95 backdrop-blur p-4 shadow-2xl"
              >
                <div className="text-slate-200 text-sm font-medium mb-3">What’s inside</div>
                <FloatingIcons />
              </div>
            </div>
            <a className="hover:text-white" href="#contact">Contact</a>
          </nav>
          <div className="hidden md:block">
            <a href="/dashboard" className="px-4 py-2 rounded-xl bg-sky-300 hover:bg-sky-400 text-slate-900 font-semibold">Get Started</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center px-4 sm:px-6 lg:px-8 py-16">
          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow">
              Space Biology,
              <br className="hidden sm:block" />
              <span className="text-sky-400"> Supercharged by AI</span>
            </h1>
            <p className="mt-5 text-slate-300 max-w-xl">
              NASA has been performing biology experiments in space for decades, generating a tremendous amount of
              information. Your challenge: build a dynamic dashboard powered by AI and knowledge graphs to summarize
              bioscience publications and explore the impact of space experiments.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="/dashboard" className="px-4 py-2 rounded-xl bg-sky-300 hover:bg-sky-400 text-slate-900 font-semibold">Get Started</a>
              <a href="#learn-more" className="px-4 py-2 rounded-xl text-slate-200 bg-transparent border border-slate-600 hover:border-slate-400">Learn More</a>
            </div>
          </div>
          <div className="relative h-[360px] md:h-[440px] rounded-[28px] border border-slate-800/60 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
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
          <div className="relative rounded-3xl overflow-hidden border border-slate-800/60"
               style={{ backgroundImage: "url('/hero-bg-light@2x.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            {/* decorative overlay already closed above */}
          </div>
        </div>
      </section>

      {/* Footer (optional simple) */}
      <footer className="py-10 text-center text-slate-500 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          Built with React • Three.js • Tailwind • Framer Motion
        </div>
      </footer>
    </div>
  );
}
