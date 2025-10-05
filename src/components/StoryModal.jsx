import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Wand2,
  Image as ImageIcon,
  Download,
  Play,
  Pause,
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
} from "lucide-react";

// --- helper: split story into sections and generate placeholder images ---
const splitIntoSections = (story) => {
  if (!story) return [];
  const parts = story.split(/\n\n+|(?<=\.)\s{2,}/g).filter(Boolean).slice(0,6);
  return parts.map((t, i) => ({
    title: `Scene ${i+1}`,
    text: t.trim(),
  }));
};

const makeSvg = ({ title, text, width=1280, height=720 }) => {
  const safe = (s) => (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/><g font-family="Inter, system-ui" fill="#e5e7eb"><text x="50%" y="38%" text-anchor="middle" font-size="44" font-weight="700">${safe(title)}</text></g><foreignObject x="10%" y="46%" width="80%" height="48%"><div xmlns="http://www.w3.org/1999/xhtml" style="color:#cbd5e1;font-size:22px;line-height:1.4;font-family:Inter,system-ui">${safe(text.slice(0,420))}</div></foreignObject></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};



/* -------------------------------------------------------
   UTIL: very light keyword → image mapper (dummy images)
------------------------------------------------------- */
function pickImageFor(sectionTitle, sectionText) {
  const s = `${sectionTitle} ${sectionText}`.toLowerCase();

  if (s.includes("mouse") || s.includes("mice")) {
    return "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1600&auto=format&fit=crop";
  }
  if (s.includes("bone") || s.includes("osteoblast") || s.includes("skeleton")) {
    return "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop";
  }
  if (s.includes("cell") || s.includes("culture") || s.includes("micro")) {
    return "https://images.unsplash.com/photo-1559757175-08f4e90e8c5f?q=80&w=1600&auto=format&fit=crop";
  }
  if (s.includes("space") || s.includes("orbit") || s.includes("mission")) {
    return "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=1600&auto=format&fit=crop";
  }
  if (s.includes("mars") || s.includes("planet")) {
    return "https://images.unsplash.com/photo-1543946207-39bd91e70ca7?q=80&w=1600&auto=format&fit=crop";
  }
  if (s.includes("dna") || s.includes("genes")) {
    return "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=1600&auto=format&fit=crop";
  }
  return "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop";
}

/* -------------------------------------------------------
   DUMMY STORY GENERATOR (replace later with real output)
------------------------------------------------------- */
function generateDummyStory(paper) {
  const base = (paper?.abstract || "").trim();

  const sections = [
    {
      title: "Departure & Mission Goals",
      text: base
        ? "We translate the mission goals into a human-facing prologue that sets the scene and stakes."
        : "We set the scene: the mission begins, our goals are clear, and the first constraints appear.",
    },
    {
      title: "Methods Come Alive",
      text: base
        ? "Laboratory methods—training, instrumentation, and sampling—become characters and moments."
        : "We show how experiments are performed: handling samples in microgravity, devices humming.",
    },
    {
      title: "First Signals",
      text: base
        ? "Initial results surface: early changes in physiology and cell behavior hint at deeper trends."
        : "Early findings appear—subtle shifts in measurements that suggest where the story will go.",
    },
    {
      title: "Conflict & Countermeasures",
      text: base
        ? "Unexpected effects demand interpretation: hypotheses, controls, and countermeasures emerge."
        : "Complications arise; we test countermeasures and refine the design to protect the crew.",
    },
    {
      title: "Resolution & Next Steps",
      text: base
        ? "The study resolves with actionable insights and a path to the next investigation."
        : "We end with conclusions and new questions—pointing to the next journey beyond orbit.",
    },
  ];

  return sections.map((s) => ({
    ...s,
    image: pickImageFor(s.title, `${s.text} ${paper?.title || ""}`),
  }));
}

/* -------------------------------------------------------
   TTS helpers
------------------------------------------------------- */
const canSpeak = () => typeof window !== "undefined" && "speechSynthesis" in window;
const stopSpeak = () => {
  if (canSpeak()) window.speechSynthesis.cancel();
};
function speak(text, { lang = "en-US", rate = 1.0, pitch = 1.0, onend }) {
  if (!canSpeak() || !text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  u.rate = rate;
  u.pitch = pitch;
  u.onend = onend || null;
  window.speechSynthesis.speak(u);
}

/* -------------------------------------------------------
   Modal Component
------------------------------------------------------- */
export default function StorytellingModal({ open, onClose, paper }) {
  const [generating, setGenerating] = React.useState(false);
  const [sections, setSections] = React.useState([]);
  const [viewMode, setViewMode] = React.useState("grid"); // 'grid' | 'slideshow'

  // slideshow state
  const [idx, setIdx] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);
  const [narrationOn, setNarrationOn] = React.useState(true);

  // clean up TTS on unmount / close
  React.useEffect(() => {
    if (!open) stopSpeak();
    return () => stopSpeak();
  }, [open]);

  // keyboard shortcuts for slideshow
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      if (viewMode !== "slideshow") return;
      if (e.key === "ArrowRight") setIdx((i) => Math.min(i + 1, sections.length - 1));
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
      if (e.key.toLowerCase() === " ") setPlaying((p) => !p);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, viewMode, sections.length, onClose]);

  // drive TTS during slideshow
  React.useEffect(() => {
    if (viewMode !== "slideshow" || !playing || !narrationOn) return;
    stopSpeak();
    const s = sections[idx];
    if (!s) return;
    speak(`${s.title}. ${s.text}`, {
      lang: "en-US",
      onend: () => {
        // auto-advance if still playing
        if (!playing) return;
        setTimeout(() => {
          setIdx((i) => {
            const last = sections.length - 1;
            if (i >= last) {
              setPlaying(false);
              return i;
            }
            return i + 1;
          });
        }, 250);
      },
    });
  }, [idx, playing, narrationOn, sections, viewMode]);

  function handleGenerate() {
    setGenerating(true);
    setTimeout(() => {
      const out = generateDummyStory(paper);
      setSections(out);
      setIdx(0);
      setViewMode("grid");
      setGenerating(false);
    }, 400);
  }

  function downloadJSON() {
    const blob = new Blob([JSON.stringify({ paper, sections }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "storyboard.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  const hasStory = sections.length > 0;
  const progress = hasStory ? ((idx + 1) / sections.length) * 100 : 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            className="relative z-10 w-[min(96vw,1100px)] max-h-[92vh] overflow-hidden rounded-2xl border border-slate-700 bg-[#0b1324]/95 text-slate-100 shadow-2xl"
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 18, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700/70">
              <div>
                <h3 className="text-lg font-semibold">Storytelling View</h3>
                <p className="text-sm text-slate-300/90">{paper?.title || "Selected Paper"}</p>
              </div>
              <div className="flex items-center gap-2">
                {hasStory && (
                  <button
                    onClick={() => setViewMode((m) => (m === "grid" ? "slideshow" : "grid"))}
                    className="px-3 py-1.5 rounded-full border border-slate-600 hover:bg-white/5 text-sm"
                  >
                    {viewMode === "grid" ? "Slideshow" : "Grid"}
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="rounded-full p-2 border border-slate-600 hover:bg-white/5"
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-6 pt-4 pb-2 overflow-y-auto max-h-[70vh]">
              {!hasStory ? (
                <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-6">
                  <div className="text-slate-300/90 italic">
                    Click “Generate Story” to create a storyboard from dummy data. When your
                    teammate’s generator is ready, we’ll swap this function to use real sections.
                  </div>
                </div>
              ) : viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sections.map((s, i) => (
                    <div
                      key={i}
                      className="relative overflow-hidden rounded-xl border border-slate-700 bg-slate-900/40"
                    >
                      <div className="relative h-40">
                        <img
                          src={s.image}
                          alt={s.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          loading="lazy"
                          style={{ objectPosition: "50% 55%" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        <div className="absolute bottom-2 left-3 text-xs bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
                          {i + 1}/{sections.length}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="text-base font-semibold flex items-center gap-2">
                          <ImageIcon size={16} className="opacity-80" />
                          {s.title}
                        </h4>
                        <p className="mt-1 text-sm text-slate-300 leading-relaxed">{s.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // slideshow view
                <div className="rounded-xl overflow-hidden border border-slate-700 bg-slate-900/40">
                  <div className="relative h-[44vh] sm:h-[50vh]">
                    <img
                      src={sections[idx].image}
                      alt={sections[idx].title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-xl sm:text-2xl font-bold drop-shadow">{sections[idx].title}</h4>
                      <p className="mt-2 text-sm sm:text-base text-slate-200/95 max-w-4xl leading-relaxed">
                        {sections[idx].text}
                      </p>
                    </div>
                    {/* progress bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-white/10">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 to-indigo-400"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* controls */}
                  <div className="flex items-center justify-between p-3 gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIdx((i) => Math.max(i - 1, 0))}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-600 hover:bg-white/5 text-sm"
                      >
                        <ArrowLeft size={16} /> Prev
                      </button>
                      <button
                        onClick={() => setIdx((i) => Math.min(i + 1, sections.length - 1))}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-600 hover:bg-white/5 text-sm"
                      >
                        Next <ArrowRight size={16} />
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setNarrationOn((v) => !v)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-600 hover:bg-white/5 text-sm"
                        title={narrationOn ? "Mute narration" : "Unmute narration"}
                      >
                        {narrationOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
                        {narrationOn ? "Narration On" : "Narration Off"}
                      </button>
                      <button
                        onClick={() => setPlaying((p) => !p)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-sky-300/70 text-sky-100 bg-sky-400/10 hover:bg-sky-400/20 text-sm"
                      >
                        {playing ? <Pause size={16} /> : <Play size={16} />}
                        {playing ? "Pause" : "Play"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="px-6 py-4 border-t border-slate-700/70 flex items-center justify-end gap-2">
              {hasStory && viewMode === "grid" && (
                <button
                  onClick={() => setViewMode("slideshow")}
                  className="px-4 py-1.5 rounded-full border border-slate-500 hover:bg-white/5 text-sm"
                >
                  Start Slideshow
                </button>
              )}
              {hasStory && (
                <button
                  onClick={downloadJSON}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-500 hover:bg-white/5 text-sm"
                >
                  <Download size={16} />
                  Export JSON
                </button>
              )}
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-full border border-slate-500 hover:bg-white/5 text-sm"
              >
                Close
              </button>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-300/70 text-sky-100 bg-sky-400/10 hover:bg-sky-400/20 disabled:opacity-50 text-sm"
              >
                <Wand2 size={16} />
                {generating ? "Generating…" : "Generate Story"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
