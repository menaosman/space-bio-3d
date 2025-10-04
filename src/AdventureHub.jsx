import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * AdventureHub.jsx — themed + neon chevrons + glowing outline buttons
 * Route: /adventure
 */

// overlay to keep portal text readable over images
const archOverlay =
  "linear-gradient(180deg, rgba(4,8,22,0) 0%, rgba(4,8,22,0.15) 55%, rgba(4,8,22,0.45) 100%)";

function ArchCard({ title, subtitle, to = "#", bg, delay = 0 }) {
  const [pos, setPos] = React.useState({ x: "50%", y: "50%" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: [6, 0, 6] }} // gentle idle float
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
      className="relative"
    >
      <Link to={to} className="group block">
        {/* Arch shape via CSS mask + glow ring */}
        <div
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            const x = ((e.clientX - r.left) / r.width) * 100;
            const y = ((e.clientY - r.top) / r.height) * 100;
            setPos({ x: `${x}%`, y: `${y}%` });
          }}
          className="relative w-[300px] sm:w-[340px] lg:w-[360px] h-[460px] mx-auto overflow-hidden
                     transition-transform duration-300 ease-out will-change-transform
                     group-hover:-translate-y-1 group-hover:scale-[1.035]"
          style={{
            WebkitMask:
              "radial-gradient(140px_140px at 50% 0, #000 99%, #0000 100%) top/100% 52% no-repeat, linear-gradient(#000 0 0) bottom/100% 48% no-repeat",
            mask:
              "radial-gradient(140px_140px at 50% 0, #000 99%, #0000 100%) top/100% 52% no-repeat, linear-gradient(#000 0 0) bottom/100% 48% no-repeat",
            backgroundImage: bg,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "28px",
            // spotlight cursor position
            "--hx": pos.x,
            "--hy": pos.y,
          }}
        >
          {/* Inner neon border */}
          <div className="absolute inset-0 rounded-[28px] ring-1 ring-sky-300/30 transition group-hover:ring-sky-300/70" />
          {/* Glow boost on hover */}
          <div className="absolute inset-0 rounded-[28px] transition group-hover:shadow-[0_0_70px_-10px_rgba(125,211,252,0.65)]" />

          {/* Cursor-following spotlight */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition"
            style={{
              background:
                "radial-gradient(200px 200px at var(--hx) var(--hy), rgba(125,211,252,0.20), rgba(56,189,248,0.10) 35%, transparent 60%)",
            }}
          />

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
      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://c02.purpledshub.com/uploads/sites/48/2024/06/facts-space-and-astronomy.jpg?w=1029&webp=1')",
          }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,0.35)_0%,rgba(5,9,20,0.75)_70%,rgba(5,9,20,0.9)_100%)]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(120%_80%_at_50%_0%,black_60%,transparent_100%)] bg-black/20" />
      </div>

      {/* FRAME */}
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
          <ArchCard
            title="Terrestrial Biology & Exobotany"
            subtitle="Habitats • Flora • Life support"
            to="/adventure/exobotany"
            bg={`${archOverlay}, url('/exobotany.png')`}
            delay={0.05}
          />
          <ArchCard
            title="Microbiology & Genetic Engineering"
            subtitle="Wet lab • Cultures • CRISPR"
            to="/adventure/micro-genetics"
            bg={`${archOverlay}, url('/microbiology.png')`}
            delay={0.12}
          />
          <ArchCard
            title="Astrobiology & Human Adaptation"
            subtitle="Stations • EVA • Physiology"
            to="/adventure/astro-human"
            bg={`${archOverlay}, url('/astrobio.png')`}
            delay={0.19}
          />
        </div>
      </main>

      {/* CENTER NEON DOUBLE-CHEVRON + GLOW LINE */}
      <div className="relative mx-auto w-full max-w-7xl px-4">
        {/* glow line (with blur layer) */}
        <div className="relative mx-auto mb-4 h-[2px] w-72 sm:w-96 bg-gradient-to-r from-transparent via-sky-300/80 to-transparent">
          <div className="absolute inset-x-10 -top-3 h-8 blur-2xl bg-sky-400/30" />
        </div>

        {/* neon double chevrons */}
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto w-14 h-14 rounded-full bg-sky-400/10 border border-sky-400/30 flex items-center justify-center
                     [filter:drop-shadow(0_0_12px_rgba(56,189,248,0.6))]"
        >
          <svg viewBox="0 0 48 48" width="28" height="28" fill="none" className="text-sky-200">
            <g stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 28 L24 16 L36 28" />
              <path d="M12 34 L24 22 L36 34" />
            </g>
          </svg>
        </motion.div>
      </div>

      {/* FOOTER ACTIONS — pill outline with glow */}
      <footer className="mx-auto max-w-7xl px-4 pb-10">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/quiz"
            className="px-6 py-2 rounded-full border border-slate-200/40 text-slate-100
                       bg-white/0 hover:bg-white/5 transition
                       shadow-[0_0_0_0_rgba(0,0,0,0)]
                       hover:shadow-[0_0_30px_-6px_rgba(148,163,184,0.35)]
                       focus:outline-none focus:ring-2 focus:ring-sky-300/50"
          >
            Start Quiz
          </Link>
          <Link
            to="/paths"
            className="px-6 py-2 rounded-full border border-sky-300/60 text-sky-100
                       bg-sky-400/5 hover:bg-sky-400/15 transition
                       shadow-[0_0_0_0_rgba(56,189,248,0)]
                       hover:shadow-[0_0_36px_-6px_rgba(56,189,248,0.45)]
                       focus:outline-none focus:ring-2 focus:ring-sky-300/60"
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
