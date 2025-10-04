import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/** Simple brand chip you already have (optional: import your BrandWordmark instead) */
function BrandChip() {
  return (
    <Link to="/" className="flex items-center gap-2 text-slate-300 hover:opacity-90">
      <span className="inline-block h-2 w-2 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500" />
      <span className="font-medium">NileStellar</span>
    </Link>
  );
}

export default function Adventure() {
  return (
    <main className="min-h-screen bg-[#050914] text-slate-100">
      {/* Page frame */}
      <div className="relative mx-auto max-w-6xl px-5 pt-10 pb-16">
        {/* Glowy frame */}
        <div className="pointer-events-none absolute inset-0 -z-10 mx-2 my-4 rounded-[28px] border border-slate-700/60
                        shadow-[0_0_0_1px_rgba(99,102,241,0.15),inset_0_0_60px_rgba(56,189,248,0.06)]" />
        {/* Starry bg */}
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(1200px_600px_at_50%_-10%,rgba(56,189,248,.12),transparent)]" />

        {/* Header */}
        <header className="mb-10 flex items-center justify-between">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Choose Your <span className="text-sky-400">Adventure</span>
          </h1>
          <BrandChip />
        </header>

        {/* Cards */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <AdventureCard
            title="Terrestrial Biology & Exobotany"
            to="/adventure/terrestrial-bio"
            img="/images/adventure-terrestrial.jpg" /* replace with your asset */
            glowFrom="from-emerald-400/40"
            glowTo="to-sky-400/30"
          />
          {/* Card 2 */}
          <AdventureCard
            title="Microbiology & Genetic Engineering"
            to="/adventure/micro-genetics"
            img="/images/adventure-lab.png" /* you already used this on home */
            glowFrom="from-sky-400/40"
            glowTo="to-indigo-400/30"
          />
          {/* Card 3 */}
          <AdventureCard
            title="Astrobiology & Human Adaptation"
            to="/adventure/astro-human"
            img="/images/adventure-astro.jpg"
            glowFrom="from-fuchsia-400/40"
            glowTo="to-indigo-400/30"
          />
        </section>

        {/* CTA Row */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            to="/adventure/quiz"
            className="rounded-2xl px-5 py-2 text-slate-900 font-semibold
                       bg-slate-100 hover:bg-white transition"
          >
            Start Quiz
          </Link>
          <Link
            to="/paths"
            className="rounded-2xl px-5 py-2 border border-slate-600 hover:border-slate-400 transition"
          >
            Explore Paths
          </Link>

          {/* Center glow arrow */}
          <div className="ml-auto hidden md:block">
            <div className="mx-auto mt-1 h-[3px] w-40 rounded-full bg-slate-700/40 overflow-hidden">
              <div className="h-full w-1/3 animate-[sweep_1.4s_ease_infinite] bg-gradient-to-r from-sky-400 to-indigo-400" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes sweep {
          0% { transform: translateX(-60%); }
          50% { transform: translateX(140%); }
          100% { transform: translateX(320%); }
        }
      `}</style>
    </main>
  );
}

function AdventureCard({ title, to, img, glowFrom, glowTo }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="group relative overflow-hidden rounded-[24px] border border-slate-700/70 bg-slate-900/40 backdrop-blur"
    >
      {/* image */}
      <Link to={to} className="block">
        <div
          className="aspect-[3/4] w-full bg-cover bg-center"
          style={{ backgroundImage: `url('${img}')` }}
        />
        {/* neon arch frame */}
        <div
          className={`pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-slate-600/30
                      bg-gradient-to-b ${glowFrom} ${glowTo} opacity-0 group-hover:opacity-100 transition`}
        />
        {/* title plaque */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[82%] rounded-xl bg-slate-900/70 border border-slate-700/70 px-4 py-2 text-center shadow-lg">
          <div className="text-sm sm:text-base font-semibold">{title}</div>
        </div>
      </Link>
    </motion.div>
  );
}
