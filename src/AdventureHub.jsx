import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Rocket, Atom, Satellite, Microscope, Brain, Globe2, FlaskConical, Zap } from "lucide-react";

const tiles = [
  { title: "Space Biology", icon: Rocket, to: "/adventure/space-biology", desc: "Missions, experiments, and life-support systems in orbit.", tag: "Featured" },
  { title: "Genomics Lab", icon: Atom, to: "/adventure/genomics", desc: "Sequence data, biomarkers, and precision medicine demos.", tag: "New" },
  { title: "Neuroscience", icon: Brain, to: "/adventure/neuro", desc: "Cognition, signals, and human factors in space." },
  { title: "Astro-Microbiology", icon: Microscope, to: "/adventure/microbio", desc: "Microbes in harsh environments and bioreactors." },
  { title: "Earth & Remote Sensing", icon: Globe2, to: "/adventure/earth-rs", desc: "Observe climate, oceans, and ecosystems from orbit." },
  { title: "AI + Simulation", icon: Zap, to: "/adventure/ai-sim", desc: "Agents, digital twins, and real-time decision tools." },
  { title: "Wet Lab", icon: FlaskConical, to: "/adventure/wetlab", desc: "Bench protocols and visual explainers." },
  { title: "Sat Ops", icon: Satellite, to: "/adventure/sat-ops", desc: "Telemetry, comms, and operations dashboards." },
];

export default function AdventureHub() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900/40 via-slate-950 to-slate-950"/>
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.4) 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}/>
        <div className="absolute -top-24 left:1/2 h-[46rem] w-[46rem] -translate-x-1/2 rounded-full blur-3xl bg-sky-500/10"/>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Link to="/" className="hover:text-slate-200 transition">Home</Link>
          <span>/</span>
          <span className="text-slate-200">Choose Your Adventure</span>
        </div>
      </div>

      <header className="mx-auto max-w-7xl px-4 py-8">
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
          Choose Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-300 to-indigo-300">Adventure</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="mt-3 max-w-2xl text-slate-300">
          Dive into interactive tracks. Each tile opens a focused experience—labs, visual explainers, and live demos.
        </motion.p>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tiles.map(({ title, icon: Icon, desc, to, tag }, idx) => (
            <motion.div key={title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.03 * idx, ease: "easeOut" }}>
              <Link to={to} className="group block">
                <div className="relative h-full">
                  <div className="h-full rounded-2xl border border-slate-800/70 bg-slate-900/40 backdrop-blur p-4 hover:border-sky-500/50 hover:bg-slate-900/60 transition shadow-[0_0_0_1px_rgba(15,23,42,0.4)]">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-xl bg-sky-400/10 border border-sky-400/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-semibold truncate">{title}</h3>
                          {tag && (<span className="text-[10px] uppercase tracking-wide px-1.5 py-0.5 rounded-md bg-sky-400/10 border border-sky-400/20 text-sky-200/90">{tag}</span>)}
                        </div>
                        <p className="mt-1 text-sm text-slate-400 line-clamp-2">{desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-slate-400 group-hover:text-sky-200 transition">Open</span>
                      <svg className="w-4 h-4 opacity-70 group-hover:opacity-100 transition" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 5h6m0 0v6m0-6L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-sky-400/30 group-hover:shadow-[0_0_35px_-8px_rgba(56,189,248,0.45)] transition"/>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-10">
        <div className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-lg font-semibold">Not sure where to start?</h4>
            <p className="text-slate-400 text-sm">Try the Space Biology track—interactive, visual, and beginner-friendly.</p>
          </div>
          <Link to="/adventure/space-biology" className="px-4 py-2 rounded-xl bg-sky-500/90 hover:bg-sky-400 text-slate-900 font-semibold transition">Launch</Link>
        </div>
      </footer>
    </div>
  );
}
