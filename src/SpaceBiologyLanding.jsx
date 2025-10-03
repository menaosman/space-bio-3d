import React, { useRef } from "react";
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
   BRAND (logo + wordmark)
   ============================================= */
function Brand() {
  return (
    <a href="/" className="flex items-center gap-3 group" aria-label="Nile Stellar — Space Biology Knowledge Engine">
      {/* LOGO IMAGE — put your file at /public/brand/nilestellar-mark.png */}
      <img
        src="/brand/nilestellar-mark.png"
        alt=""
        className="h-15 w-15 rounded-xl ring-1 ring-white/10 shadow-md group-hover:shadow-lg transition"
        loading="eager"
        decoding="async"
      />
      {/* WORDMARK */}
      <div className="leading-tight">
        <div className="text-white font-semibold tracking-tight text-base md:text-lg">
          Nile <span className="font-semibold">Stellar</span>
        </div>
        <div className="hidden sm:block text-[10px] md:text-[11px] text-slate-300/80 tracking-wide">
          — Space Biology Knowledge Engine
        </div>
      </div>
    </a>
  );
}

/* =============================================
   PAGE
   ============================================= */
export default function SpaceBiologyLanding() {
  return (
    <div className="min-h-screen w-full bg-[#050914] text-slate-100 selection:bg-sky-400/30 selection:text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-40 backdrop-blur bg-[#050914]/70 border-b border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Brand />

          <nav className="hidden md:flex gap-8 text-slate-300 text-sm">
            <a className="hover:text-white" href="#about">About</a>

            {/* TECHNOLOGY with hover dropdown */}
            <div className="relative group">
              <a href="#technology" className="hover:text-white flex items-center gap-1">
                Technology
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </a>

              {/* Dropdown */}
              <div
                className="pointer-events-auto invisible opacity-0 translate-y-2 scale-95
                           group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100
                           focus-within:visible focus-within:opacity-100 focus-within:translate-y-0 focus-within:scale-100
                           transition duration-200 ease-out will-change-transform
                           absolute right-0 mt-2 w-56 rounded-xl border border-slate-700
                           bg-slate-900/95 backdrop-blur shadow-2xl z-50"
                role="menu"
                aria-label="Technology menu"
              >
                <a
                  href="/#orbit-earth"
                  role="menuitem"
                  className="block px-4 py-3 text-slate-200 hover:bg-slate-800/70 rounded-t-xl focus:outline-none focus:bg-slate-800/70"
                >
                  ORBIT THE EARTH
                </a>
                {/* Link to the on-page Adventure section */}
                <a
                  href="#adventure"
                  role="menuitem"
                  className="block px-4 py-3 text-slate-200 hover:bg-slate-800/70 rounded-b-xl focus:outline-none focus:bg-slate-800/70"
                >
                  Choose your Adventure
                </a>
              </div>
            </div>

            <a className="hover:text-white" href="#gallery">Gallery</a>
            <a className="hover:text-white" href="#satellites">Satellites</a>
            <a
              className="px-3 py-1 rounded-lg bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:bg-sky-500/30"
              href="#apply"
            >
              Apply
            </a>
          </nav>
        </div>
      </header>

      {/* Hero video directly under the nav bar */}
      <div className="w-full h-[800px] overflow-hidden relative">
        <video
          className="w-full h-full object-cover"
          src="/hero.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        {/* Optional overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* HERO */}
      <section id="orbit-earth" className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 items-center gap-10 py-16 md:py-24">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight">
              ORBIT THE <span className="text-sky-400">EARTH</span>
            </motion.h1>
            <p className="mt-5 text-slate-300 max-w-xl">
              NASA has been performing biology experiments in space for decades, generating a tremendous amount of
              information. Your challenge: build a dynamic dashboard powered by AI and knowledge graphs to summarize
              bioscience publications and explore the impact of space experiments.
            </p>
            <div className="mt-6 flex gap-4">
              <a href="/dashboard" className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold">
                Get Started
              </a>
              <a href="#learn-more" className="px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-400">
                Learn More
              </a>
            </div>
          </div>

          {/* 3D EARTH */}
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

        {/* Stat cards row */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Card icon={Globe2} title="LEO (Low Earth Orbit)">300–1500 km altitude. Rapid revisit cycles and microgravity suited for bioscience payloads.</Card>
          <Card icon={Rocket} title="H+ SPEED">~28,000 km/h orbital velocity. Complete an orbit in ~90 minutes.</Card>
          <Card icon={Atom} title="EARTH ORBIT">365D / year observation window. Day–night cycles enable multi-modal experiments.</Card>
        </div>
      </section>

      {/* ================= CHOOSE YOUR ADVENTURE (overlay style) ================= */}
      <section id="adventure" className="relative py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Background image panel with overlayed content */}
          <div
            className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
            style={{
              backgroundImage: "url('/adventure-lab.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* vignette/gradient for readability */}
            <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_20%_20%,rgba(2,6,23,0.15),transparent)]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#040816]/80 via-[#040816]/40 to-transparent" />

            {/* Content overlay */}
            <div className="relative z-10 p-6 sm:p-10 md:p-14 lg:p-16 max-w-3xl">
              <h2 className="text-white font-extrabold tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] text-4xl sm:text-5xl md:text-6xl leading-tight">
                Unlock the <span className="text-sky-400">Cosmos</span> of Biology
              </h2>

              <div className="mt-6">
                <a
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl
                             bg-gradient-to-r from-sky-400 to-indigo-400 text-slate-900 font-semibold
                             shadow-[0_8px_30px_rgba(56,189,248,0.35)]
                             hover:from-sky-300 hover:to-indigo-300 transition"
                >
                  Choose Your Adventure
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>

              <p className="mt-2 text-xs text-slate-300/80">
                Simulated environment
              </p>
            </div>

            {/* keep card height on small screens */}
            <div className="pt-[46%] sm:pt-[36%] md:pt-[32%] lg:pt-[28%]" />
          </div>

          {/* Cards below */}
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Latest Research */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-white">Latest Research</h3>
              <p className="text-slate-300 text-sm mt-1">Fresh findings from NASA bioscience.</p>

              {/* mini SVG chart */}
              <svg viewBox="0 0 300 100" className="mt-4 w-full h-28">
                <defs>
                  <linearGradient id="fillSky" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="rgb(56 189 248 / .35)"/>
                    <stop offset="100%" stopColor="transparent"/>
                  </linearGradient>
                </defs>
                <polyline fill="url(#fillSky)" stroke="none"
                  points="0,90 0,80 40,72 80,76 120,55 160,60 200,40 240,48 280,28 300,34 300,90" />
                <polyline fill="none" stroke="rgb(56 189 248)" strokeWidth="3"
                  points="0,80 40,72 80,76 120,55 160,60 200,40 240,48 280,28 300,34" />
              </svg>

              <div className="mt-2 text-2xl font-bold text-white">
                125% <span className="text-rose-400">↓</span> Mission Duration
              </div>
              <div className="text-xs text-slate-400">Synthetic data · demo only</div>
            </div>

            {/* Interactive Simulators */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-white">Interactive Simulators</h3>
              <p className="text-slate-300 text-sm mt-1">Configure microgravity & thermal profiles.</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-800/70 border border-slate-700 p-4">
                  <p className="text-sm text-slate-200">Your Mission:</p>
                  <ul className="mt-2 text-xs text-slate-300 space-y-1">
                    <li>✔ Microgravity</li>
                    <li>✔ Temperature shifts</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-slate-800/70 border border-slate-700 p-4">
                  <p className="text-sm text-slate-200">Preview:</p>
                  <div className="mt-2 h-16 rounded-lg bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-slate-700" />
                </div>
              </div>
            </div>

            {/* Learning Paths */}
            <div className="rounded-2xl border border-slate-700/60 bg-slate-900/60 backdrop-blur p-5 shadow-xl">
              <h3 className="text-lg font-semibold text-white">Learning Paths</h3>
              <p className="text-slate-300 text-sm mt-1">Choose a guided path to start.</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <a className="rounded-xl bg-sky-500/15 border border-sky-500/40 p-4 hover:bg-sky-500/25 transition" href="/dashboard">
                  <div className="text-sky-300 text-sm font-semibold">Xenobiology Guide</div>
                  <div className="text-xs text-slate-300 mt-1">Mentari’s path</div>
                </a>
                <a className="rounded-xl bg-pink-500/15 border border-pink-500/40 p-4 hover:bg-pink-500/25 transition" href="/dashboard">
                  <div className="text-pink-300 text-sm font-semibold">Uncharted Plants</div>
                  <div className="text-xs text-slate-300 mt-1">Upanner’s path</div>
                </a>
              </div>

              <div className="mt-4 text-xs text-slate-400">
                Upcoming paths · Learner story quests
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ================= end adventure ================= */}

      {/* MISSION */}
      <section id="technology" className="relative py-20 md:py-24">
        <div className="absolute inset-x-0 -top-8">
          <Wave className="w-full h-16" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">OUR MISSION <span className="text-sky-400">RAPIDSCAT</span></h2>
            <p className="mt-4 text-slate-300">
              Improve weather forecasting and ocean-surface wind understanding. In our context, RAPIDSCAT-like datasets
              feed the Knowledge Engine to enrich bioscience experiment metadata.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#view-all" className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold">View All</a>
              <a href="#docs" className="px-4 py-2 rounded-lg border border-slate-600 hover:border-slate-400">Docs</a>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 p-2">
            <div className="h-[320px] rounded-xl overflow-hidden">
              <Canvas camera={{ position: [0, 1.5, 4.2], fov: 50 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[3,3,2]} intensity={1.1} />
                <MiniSatellite position={[0,0,0]} />
                <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
                <Stars radius={40} depth={20} count={3000} factor={2} fade />
              </Canvas>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-slate-950 via-slate-950 to-[#050914] border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight">Functions of the Knowledge Engine</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card icon={Database} title="Knowledge Graph">
              Link experiments, organisms, missions, instruments, and outcomes to power faceted exploration.
            </Card>
            <Card icon={Cpu} title="AI Summaries">
              Generate concise, reliable abstracts for NASA bioscience publications with source grounding.
            </Card>
            <Card icon={BookOpen} title="Learning Hub">
              Education-ready views for students and youth. Explain microgravity biology with visuals.
            </Card>
            <Card icon={Satellite} title="Mission Browser">
              Filter by orbit, mission, payload, or year. Compare outcomes across platforms.
            </Card>
            <Card icon={Globe2} title="3D Explorer">
              Inspect Earth orbit, toggle inclination bands, and preview payload trajectories.
            </Card>
            <Card icon={Atom} title="Bio-Impact Maps">
              Map experimental variables to phenotypic effects; export figures for reports.
            </Card>
          </div>
          <div className="mt-10 flex gap-4">
            <a href="#try" className="px-5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-900 font-semibold">View All</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>Techno — Created for NASA Space Apps 2025 · Web Design ©2025</p>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500" />
            <span className="tracking-widest uppercase">Nile Stellar</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
