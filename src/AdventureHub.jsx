import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";

/**
 * AdventureHub.jsx — themed to match your reference design, now with your photo background
 * Route: /adventure
 */

// overlay to keep portal text readable over images
const archOverlay =
  "linear-gradient(180deg, rgba(4,8,22,0) 0%, rgba(4,8,22,0.15) 55%, rgba(4,8,22,0.45) 100%)";

function ArchCard({ title, subtitle, to = "#", bg, delay = 0 }) {
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
            backgroundSize: "cover",
            backgroundPosition: "center",
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
            {subtitle && <p className="text-slate-300/90 text-sm mt-1">{subtitle}</p>}
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
    <div className="min-h-screen w-full text-slate-100 relative overflow-hidden">
      {/* BACKGROUND IMAGE (uses your URL) */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://c02.purpledshub.com/uploads/sites/48/2024/06/facts-space-and-astronomy.jpg?w=1029&webp=1')",
          }}
        />
        {/* dark overlay for legibility + slight vignette */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,0.35)_0%,rgba(5,9,20,0.75)_70%,rgba(5,9,20,0.9)_100%)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_0%,black_60%,transparent_100%)] bg-black/20" />
      </div>

      {/* FRAME (thin border around content) */}
      <div className="pointer-events-none absolute inset-4 -z-0 rounded-3xl border border-slate-200/15" />

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
          {/* Exobotany — uses /public/exobotany.png */}
          <ArchCard
            title="Terrestrial Biology & Exobotany"
            subtitle="Habitats • Flora • Life support"
            to="/adventure/exobotany"
            bg={`${archOverlay}, url('/exobotany.png')`}
            delay={0.05}
          />
          {/* Microbiology — uses /public/microbiology.png */}
          <ArchCard
            title="Microbiology & Genetic Engineering"
            subtitle="Wet lab • Cultures • CRISPR"
            to="/adventure/micro-genetics"
            bg={`${archOverlay}, url('/microbiology.png')`}
            delay={0.12}
          />
          {/* ✅ Astrobiology — uses /public/astrobio.png */}
          <ArchCard
            title="Astrobiology & Human Adaptation"
            subtitle="Stations • EVA • Physiology"
            to="/adventure/astro-human"
            bg={`${archOverlay}, url('/astrobio.png')`}
            delay={0.19}
          />
        </div>
      </main>

      {/* CENTER GLOW + CHEVRON */}
      <div className="relative mx-auto w-full max-w-7xl px-4">
        <div className="mx-auto mt-2 mb-6 h-px w-1/2 bg-gradient-to-r from-transparent via-slate-300/30 to-transparent" />
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
        <div className="mt-6 flex items-center justify-between text-slate-200/90 text-sm">
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
