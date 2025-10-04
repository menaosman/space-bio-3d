import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

/**
 * AdventureHub.jsx — themed to match your reference design
 * Route: /adventure
 *
 * Notes:
 * - Uses Tailwind for styling + subtle framer‑motion.
 * - "Arch" cards are built with CSS masks to get the rounded‑top portal look + neon glow.
 * - Replace the three BG images with your assets (PNG/JPG/WebP). Place them in /src/assets/adventure/.
 * - Buttons at the bottom: Start Quiz (/quiz) + Explore Paths (/paths) — adjust routes as you like.
 */

// --- Replace these with your real images once you add them to /src/assets/adventure ---
// import exobotanyImg from "./assets/adventure/exobotany.jpg";
// import microGenImg from "./assets/adventure/microgen.jpg";
// import astroBioImg from "./assets/adventure/astrobio.jpg";

// Temporary gradient placeholders (will swap to real images when you add them)
const gradA =
  "radial-gradient(120% 100% at 50% 0%, rgba(64,224,208,0.18) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, rgba(10,48,61,0.8) 0%, rgba(5,9,20,0.9) 100%)";
const gradB =
  "radial-gradient(120% 100% at 50% 0%, rgba(204,153,255,0.18) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, rgba(31,21,54,0.8) 0%, rgba(5,9,20,0.9) 100%)";
const gradC =
  "radial-gradient(120% 100% at 50% 0%, rgba(130,170,255,0.18) 0%, rgba(0,0,0,0) 55%), linear-gradient(180deg, rgba(19,33,73,0.8) 0%, rgba(5,9,20,0.9) 100%)";

function ArchCard({ title, subtitle, to = "#", bg = gradA, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="relative"
    >
      <Link to={to} className="group block">
        {/* Arch shape via CSS mask + glow ring */}
        <div
          className="relative w-[300px] sm:w-[340px] lg:w-[360px] h-[460px] mx-auto overflow-hidden"
          style={{
            WebkitMask:
              "radial-gradient(140px_140px at 50% 0, #000 99%, #0000 100%) top/100% 52% no-repeat, linear-gradient(#000 0 0) bottom/100% 48% no-repeat",
            mask:
              "radial-gradient(140px_140px at 50% 0, #000 99%, #0000 100%) top/100% 52% no-repeat, linear-gradient(#000 0 0) bottom/100% 48% no-repeat",
            backgroundImage: bg,
            borderRadius: "28px",
          }}
        >
          {/* Inner neon border */}
          <div className="absolute inset-0 rounded-[28px] ring-1 ring-sky-300/30 group-hover:ring-sky-300/60 transition" />
          <div className="absolute inset-0 rounded-[28px] group-hover:shadow-[0_0_60px_-10px_rgba(125,211,252,0.55)] transition" />

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 text-center">
            <div className="mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-sky-300/40 to-transparent mb-3" />
            <h3 className="text-lg font-semibold tracking-tight drop-shadow-sm">{title}</h3>
            {subtitle && (
              <p className="text-slate-300/90 text-sm mt-1">{subtitle}</p>
            )}
          </div>

          {/* Subtle sparkles */}
          <Sparkles className="absolute top-4 right-4 w-4 h-4 opacity-40" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function AdventureHub() {
  return (
    <div className="min-h-screen w-full text-slate-100 relative overflow-hidden bg-[#050914]">
      {/* STARFIELD BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        {/* deep space gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0a1b3b_0%,#050914_50%,#050914_100%)]" />
        {/* stars grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)",
            backgroundSize: "26px 26px",
          }}
        />
        {/* soft galaxy glow */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-24 w-[900px] h-[900px] rounded-full blur-[120px] bg-sky-500/10" />
      </div>

      {/* FRAME (thin border around content) */}
      <div className="pointer-events-none absolute inset-4 -z-0 rounded-3xl border border-slate-400/20" />

      {/* HEADER */}
      <header className="mx-auto max-w-7xl px-4 pt-12 pb-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
        >
          Choose Your Adventure
        </motion.h1>
      </header>

      {/* ARCH TRIPLET */}
      <main className="mx-auto max-w-7xl px-4 pb-10">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <ArchCard
            title="Terrestrial Biology & Exobotany"
            subtitle="Habitats • Flora • Life support"
            to="/adventure/exobotany"
            bg={gradA}
            delay={0.05}
          />
          <ArchCard
            title="Microbiology & Genetic Engineering"
            subtitle="Wet lab • Cultures • CRISPR"
            to="/adventure/micro-genetics"
            bg={gradB}
            delay={0.12}
          />
          <ArchCard
            title="Astrobiology & Human Adaptation"
            subtitle="Stations • EVA • Physiology"
            to="/adventure/astro-human"
            bg={gradC}
            delay={0.19}
          />
        </div>
      </main>

      {/* CENTER GLOW + CHEVRON */}
      <div className="relative mx-auto w-full max-w-7xl px-4">
        <div className="mx-auto mt-2 mb-6 h-px w-1/2 bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />
        <div className="mx-auto w-12 h-12 rounded-full bg-sky-400/10 border border-sky-400/30 flex items-center justify-center shadow-[0_0_80px_-20px_rgba(56,189,248,0.55)]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 6v12m0 0-5-5m5 5 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <footer className="mx-auto max-w-7xl px-4 pb-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/quiz"
            className="px-6 py-2 rounded-full border border-slate-300/30 bg-white/5 hover:bg-white/10 backdrop-blur text-slate-100 transition shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
          >
            Start Quiz
          </Link>
          <Link
            to="/paths"
            className="px-6 py-2 rounded-full border border-sky-300/40 bg-sky-400/10 hover:bg-sky-400/20 text-sky-100 transition"
          >
            Explore Paths
          </Link>
        </div>

        {/* Branding row */}
        <div className="mt-6 flex items-center justify-between text-slate-400/80 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-sky-300/40 to-indigo-300/40 border border-slate-500/30" />
            <span>NileStellar</span>
          </div>
          <div className="w-4 h-4 rounded-sm border border-slate-500/30 rotate-45 bg-slate-200/10" />
        </div>
      </footer>
    </div>
  );
}
