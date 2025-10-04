/* ---------- Full-screen Paths Gallery (opened by “View All”) ---------- */
function PathsGallery({ open, onClose, onStartQuiz }) {
  const [query, setQuery] = React.useState("");
  const cards = [
    { key: "exobotany", title: "Exobotany • Green Habitats", tag: "plants", color: "from-emerald-400 to-sky-400", href: "/paths/exobotany" },
    { key: "micro", title: "Micro • Gene Editing Lab", tag: "microbes", color: "from-fuchsia-400 to-violet-400", href: "/paths/micro" },
    { key: "astro", title: "Astro • Human Adaptation", tag: "crew", color: "from-sky-400 to-indigo-400", href: "/paths/astro" },
  ];

  const filtered = cards.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.tag.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          {/* starry backdrop */}
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,#0a1b3b_0%,#050914_50%,#050914_100%)]/95" />
          <div className="absolute inset-0 opacity-[0.08]"
               style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)", backgroundSize: "26px 26px" }} />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          <motion.div
            className="relative z-10 w-[min(96vw,1200px)] max-h-[92vh] overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur p-6 md:p-8 text-slate-100 shadow-[0_30px_120px_rgba(2,6,23,.7)]"
            initial={{ y: 28, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          >
            {/* header + search */}
            <div className="flex flex-wrap items-center gap-3 justify-between">
              <h3 className="text-xl md:text-2xl font-semibold">All Learning Paths</h3>
              <div className="flex items-center gap-2">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search paths…"
                  className="px-3 py-1.5 rounded-full border border-slate-600/70 bg-slate-900/60 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300/50"
                />
                <button onClick={onClose} className="px-3 py-1.5 rounded-full border border-slate-300/30 hover:bg-white/5">✕</button>
              </div>
            </div>

            {/* cards grid */}
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pr-1 overflow-y-auto max-h-[62vh]">
              {filtered.map((c, idx) => (
                <motion.div key={c.key} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * idx, duration: 0.35 }}
                  className="relative rounded-2xl border border-slate-800 bg-slate-900/40 overflow-hidden">
                  <div className="p-5">
                    <div className={`absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition bg-gradient-to-br ${c.color}/15`} />
                    <div className="absolute -inset-px rounded-2xl ring-1 ring-slate-700/60 pointer-events-none" />
                    <h4 className="text-lg font-semibold">{c.title}</h4>
                    <p className="mt-1 text-xs uppercase tracking-wide text-slate-400">{c.tag}</p>

                    <div className="mt-4 h-28 rounded-xl border border-slate-700/60 bg-gradient-to-br from-slate-800/60 to-slate-900/40" />

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => onStartQuiz?.(c.key)}
                        className="px-4 py-2 rounded-full border text-sm transition border-sky-300/60 bg-sky-400/10 hover:bg-sky-400/20"
                      >
                        Start Path
                      </button>
                      <Link
                        to={c.href}
                        onClick={onClose}
                        className="px-4 py-2 rounded-full border text-sm transition border-slate-300/30 hover:bg-white/5"
                      >
                        Open Path
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div className="col-span-full text-center text-slate-400 py-10">
                  No paths match “{query}”.
                </div>
              )}
            </div>

            {/* 🔻 INSERTED MARQUEE (same as in PathsModal) */}
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

            {/* pretty ending bar (optional) */}
            <div className="mt-6 rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900/60 via-slate-900/40 to-slate-900/60 p-3">
              <div className="flex flex-col sm:flex-row items-center gap-3 justify-between">
                <div className="text-slate-300 text-sm">
                  Found what you like? Jump into a path or close the gallery.
                </div>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-slate-300/40 hover:bg-white/5 text-sm"
                >
                  Close Gallery
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
