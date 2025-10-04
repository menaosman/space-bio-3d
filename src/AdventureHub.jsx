function PathsModal({ open, onClose, onStartQuiz, onOpenGallery, onFinish }) {
  const paths = [
    { key: "exobotany", title: "Mentari’s Guide to Xenobiology", blurb: "Grow life off-world: light, nutrients, capillary tricks.", color: "from-emerald-400 to-sky-400", progress: 65 },
    { key: "micro", title: "Microbes & Gene Editing Lab", blurb: "Biofilms, PCR, CRISPR—keep it sterile in zero-g.", color: "from-fuchsia-400 to-violet-400", progress: 42 },
    { key: "astro", title: "Astrobiology & Human Adaptation", blurb: "Radiation, SANS, countermeasures, EVA drills.", color: "from-sky-400 to-indigo-400", progress: 23 },
  ];

  function tilt(e) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--rx", `${(-y * 6).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  }
  const untilt = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-[min(94vw,1000px)] rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur p-6 md:p-8 text-slate-100 shadow-[0_20px_80px_rgba(2,6,23,.6)]"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold">Pick a Path</h3>
                <p className="text-slate-300/80 text-sm">Short, gamified learning tracks with progress.</p>
              </div>
              <button onClick={onClose} className="px-3 py-1.5 rounded-full border border-slate-300/30 hover:bg-white/5">✕</button>
            </div>

            {/* Cards */}
            <div className="mt-6 grid md:grid-cols-3 gap-5">
              {paths.map((p, idx) => (
                <motion.div
                  key={p.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.35 }}
                  className="relative rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden"
                >
                  <div
                    onMouseMove={tilt}
                    onMouseLeave={untilt}
                    style={{ transform: "perspective(900px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))", transition: "transform 180ms ease" }}
                    className="relative p-5 h-full"
                  >
                    <div className={`absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition bg-gradient-to-br ${p.color}/20`} />
                    <div className="absolute -inset-px rounded-2xl ring-1 ring-slate-700/60 pointer-events-none" />
                    <h4 className="text-lg font-semibold pr-10">{p.title}</h4>
                    <p className="mt-2 text-sm text-slate-300/90">{p.blurb}</p>

                    <div className="mt-4">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Progress</span><span>{p.progress}%</span>
                      </div>
                      <div className="mt-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${p.color}`} style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2">
                      <button
                        onClick={() => onStartQuiz?.(p.key)}
                        className="px-4 py-2 rounded-full border text-sm transition border-sky-300/60 bg-sky-400/10 hover:bg-sky-400/20"
                      >
                        Start Path
                      </button>
                      {/* View All -> open full gallery */}
                      <button
                        onClick={() => { onClose?.(); onOpenGallery?.(); }}
                        className="px-4 py-2 rounded-full border text-sm transition border-slate-300/30 hover:bg-white/5"
                      >
                        View All
                      </button>
                    </div>

                    <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-sky-300 shadow-[0_0_20px_6px_rgba(56,189,248,0.6)]" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ⬇️ INSERTED MARQUEE JUST BEFORE THE ENDING BAR */}
            <div className="mt-6 relative h-8 overflow-hidden rounded-full border border-slate-800">
              <motion.div
                className="absolute inset-y-0 left-0 flex items-center gap-8 px-4 text-slate-300 text-sm whitespace-nowrap"
                initial={{ x: 0 }}
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              >
                🌱 Grow food off-world • 🧫 Edit genomes in micro-g • 🧠 Adapt bodies for deep space • 🛰️ Build your space-bio superpowers
                <span className="mx-8">|</span>
                🌱 Grow food off-world • 🧫 Edit genomes in micro-g • 🧠 Adapt bodies for deep space • 🛰️ Build your space-bio superpowers
              </motion.div>
            </div>

            {/* Pretty ending bar */}
            <div className="mt-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-slate-900/60 p-3">
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
                <div className="text-slate-300 text-sm">
                  Ready to wrap up? Celebrate your picks with a cosmic send-off ✨
                </div>
                <button
                  onClick={() => { onClose?.(); onFinish?.(); }}
                  className="px-4 py-2 rounded-full border border-emerald-400/60 bg-emerald-400/10 text-emerald-100 hover:bg-emerald-400/20 text-sm"
                >
                  Finish Exploring ✨
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
