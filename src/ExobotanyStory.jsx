import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

/** -------------------------------------------------------------
 * ExobotanyStory.jsx (revised)
 * - Starts narration automatically from scene 0 (deep/mysterious)
 * - Persistent narration on every scene change
 * - Voice picker prefers deeper voices when available
 * - Hero card + themed UI, hotspots, progress ring, SFX
 * Route: /adventure/exobotany
 * ------------------------------------------------------------- */

// ---- Fixed TopBar (same visual as AdventureHub) ----
function TopBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 h-14 px-4 sm:px-6 lg:px-8
                    flex items-center justify-between
                    backdrop-blur bg-[#050914]/70 border-b border-slate-800/60">
      <Link to="/" className="flex items-center gap-2 group">
        <span className="inline-block w-5 h-5 rounded-full border border-sky-400/50
                         bg-gradient-to-br from-sky-300/30 to-indigo-300/30
                         group-hover:shadow-[0_0_18px_rgba(56,189,248,0.45)] transition" />
        <div className="leading-tight">
          <div className="text-white font-semibold">NileStellar</div>
          <div className="text-[11px] text-slate-300/80">— Space Biology Knowledge Engine</div>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          to="/"
          className="px-3 py-1.5 rounded-full border border-slate-300/30 text-slate-100 bg-white/0 hover:bg-white/5 transition"
        >
          ← Home
        </Link>
        <Link
          to="/dashboard"
          className="px-3 py-1.5 rounded-full border border-sky-300/60 text-sky-100
                     bg-sky-400/10 hover:bg-sky-400/20 transition"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}

// ---- Footer ----
function SiteFooter() {
  return (
    <footer className="mt-10 mx-auto max-w-7xl px-4 pb-10 pt-6 border-t border-slate-800/60">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-300">
        <p>Techno — Created for NASA Space Apps 2025 · Web Design ©2025</p>
        <div className="flex items-center gap-2">
          <span className="inline-block w-5 h-5 rounded-full border border-sky-400/40
                           bg-gradient-to-br from-sky-300/30 to-indigo-300/30" />
          <span className="text-slate-200">NileStellar</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Story scenes ----------------
   - “narration” is what the voice reads (deeper tone).
   - “text” is rendered on screen (very similar, light polish).
-------------------------------------------------*/
const SCENES = [
  {
    id: "start",
    title: "Docking at the Greenhouse",
    narration:
      "Dr. Elara Myles, exobotanist and lead researcher, presses her face to the viewport. Rows of vibrant, unfamiliar flora drift in microgravity, their leaves twisting toward filtered light. The air tastes of chlorophyll and stainless steel. Commander Rafe Lin anchors beside her. 'I've never seen anything like this,' Elara whispers. 'Some of these species aren't even on the charts.' Rafe’s voice is low, steady. 'That’s why you’re here, Elara. If anyone can coax secrets from these plants, it’s you.'",
    text:
      "Dr. Elara Myles floats at the viewport as the orbital greenhouse slides into view. Unfamiliar flora twist toward the filtered light. Commander Rafe Lin steadies beside her: “If anyone can coax secrets from these plants, it’s you.”",
    bg: "/exobotany.png",
    hotspots: [
      { x: "22%", y: "68%", label: "Wick Panel", tip: "Capillary wicks distribute water in microgravity." },
      { x: "70%", y: "36%", label: "LED Array", tip: "Red + blue LEDs drive photosynthesis efficiently." },
    ],
    choices: [
      { label: "Enter the greenhouse", next: "roots", note: "Elara checks the roots and substrate." },
      { label: "Review the light program", next: "leds", note: "Rafe asks for a quick energy audit." },
    ],
  },
  {
    id: "roots",
    title: "The Root Web",
    narration:
      "Inside, Elara’s scanner chirps. 'These aren’t responding to our usual nutrient mix,' she murmurs. Botanist Suri Han floats closer, eyes bright. 'Maybe they need a taste of home. Minerals, a trace gas… something alien.' Elara probes the fibrous matrix. Without gravity, water is the map—her sensor pings a dry pocket near the trellis.",
    text:
      "Elara’s scanner chirps: the roots need more than Earth nutrients. Suri wonders if a trace alien mineral is missing. A dry pocket appears near the trellis—capillary flow isn’t even.",
    bg: "/exobotany.png",
    hotspots: [
      { x: "48%", y: "55%", label: "Moisture Probe", tip: "Balancing capillary flow prevents free droplets." },
    ],
    choices: [
      { label: "Thicken the wicking", next: "bloom", note: "Even flow returns to the root zone." },
      { label: "Pulse aeroponics mist", next: "mist", note: "Fine droplets cling to fibers." },
    ],
  },
  {
    id: "leds",
    title: "Spectral Tuning",
    narration:
      "Elara adjusts the LEDs. Leaves sigh into the new spectrum; stomata ease. 'We’re mimicking their native rhythms,' she says. 'If these plants evolved off-world, Earth mixes may stifle them.' The crystalline pods brighten—chimes quicken as photosystems awaken.",
    text:
      "LED spectrum tweaks calm the leaves and reduce stress. If these species evolved off-world, their rhythms may want different daylight.",
    bg: "/exobotany.png",
    hotspots: [
      { x: "36%", y: "28%", label: "Leaf Edge", tip: "Watch trace gases—ethylene can stress plants in closed loops." },
    ],
    choices: [
      { label: "Scrub trace ethylene", next: "bloom", note: "Gas levels drop; leaves perk up." },
      { label: "Test a new photoperiod", next: "mist", note: "Timing nudges circadian rhythm." },
    ],
  },
  {
    id: "mist",
    title: "The Whispering Mist",
    narration:
      "Soft pulses whisper through the root zone. Droplets cling—nothing escapes into the cabin’s air. The vine unfurls, luminous veins like star maps beneath a thin cuticle.",
    text:
      "Aeroponic pulses keep droplets captured by fibers; the vine unfurls with healthy turgor.",
    bg: "/exobotany.png",
    hotspots: [{ x: "25%", y: "35%", label: "Mist Jet", tip: "Closed misters prevent aerosols from drifting." }],
    choices: [{ label: "Log growth & finish", next: "end", note: "Data synced—mission success." }],
  },
  {
    id: "bloom",
    title: "First Bloom in Orbit",
    narration:
      "Waterlines even out. Chlorophyll sings. A yellow star opens—first bloom of the week in orbit. Rafe folds his arms, a rare smile ghosting his face. 'You’ve done it.' Elara gazes out at the turning Earth. 'Out here, every seed holds a universe of possibility. Someday, these might bloom on worlds we haven’t even dreamed of.'",
    text:
      "Flow stabilizes and a delicate bloom opens. Rafe smiles. Elara whispers: 'Every seed here carries a new world in it.'",
    bg: "/exobotany.png",
    hotspots: [{ x: "60%", y: "44%", label: "First Bloom", tip: "Pollination can be fan-assisted or manual in orbit." }],
    choices: [{ label: "Capture image & finish", next: "end", note: "You stamp the log with a photo." }],
  },
  {
    id: "end",
    title: "Mission Complete",
    narration:
      "The lab dims to evening. Systems stable. Crew morale rising. In the quiet, the plants glow like constellations you can touch.",
    text:
      "Evening mode settles. Systems: green. The greenhouse hums like a small star.",
    bg: "/exobotany.png",
    hotspots: [],
    choices: [],
  },
];

const THEME = {
  grad: "from-emerald-400 to-sky-400",
  ringColor: "#34d399", // emerald-400
  ringTrack: "rgba(148, 163, 184, .25)",
};

// ---- Web Speech (narration) ----
//  - Enabled by default to start from beginning
//  - Prefers deeper voices when available (name heuristics)
//  - Falls back gracefully to default voice
function useSpeech({ defaultEnabled = true } = {}) {
  const [enabled, setEnabled] = React.useState(defaultEnabled);
  const voiceRef = React.useRef(null);

  // pick a deep/mysterious voice if possible
  const pickVoice = React.useCallback(() => {
    const synth = window.speechSynthesis;
    if (!synth) return null;
    const voices = synth.getVoices?.() || [];
    const preferredOrder = [
      /Matthew/i, /Guy/i, /Michael/i, /Daniel/i, /David/i, // en-US / en-GB males often deeper
      /Brian/i, /Arthur/i, /Aaron/i, /Google UK English Male/i
    ];
    for (const pref of preferredOrder) {
      const v = voices.find((vv) => pref.test(vv.name));
      if (v) return v;
    }
    return voices[0] || null;
  }, []);

  React.useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;

    const init = () => {
      voiceRef.current = pickVoice();
      // if narration is enabled and we're on first mount, try to speak a tiny
      // empty utterance to “warm up” some browsers (ignored if blocked)
      if (enabled) {
        try {
          const noop = new SpeechSynthesisUtterance(" ");
          noop.volume = 0; synth.speak(noop);
        } catch {}
      }
    };

    // voices may load async
    synth.onvoiceschanged = init;
    init();
    return () => { synth.onvoiceschanged = null; synth.cancel(); };
  }, [enabled, pickVoice]);

  const speak = React.useCallback((text) => {
    if (!enabled || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    try { synth.cancel(); } catch {}
    const u = new SpeechSynthesisUtterance(text);
    u.voice = voiceRef.current || null;
    u.rate = 0.96;      // slower, more dramatic
    u.pitch = 0.85;     // deeper
    u.volume = 1.0;
    u.lang = (voiceRef.current && voiceRef.current.lang) || "en-US";
    try { synth.speak(u); } catch {}
  }, [enabled]);

  return { enabled, setEnabled, speak };
}

// ---- Tiny SFX (optional; safe if file missing) ----
function useSfx() {
  const clickRef = React.useRef(null);
  React.useEffect(() => {
    try {
      clickRef.current = new Audio("/sfx/click.mp3"); // put a file in /public/sfx/click.mp3 if desired
      clickRef.current.volume = 0.35;
    } catch {}
  }, []);
  const click = React.useCallback(() => clickRef.current?.play().catch(() => {}), []);
  return { click };
}

// ---- Progress ring CSS helper ----
function ringStyle(pct, color = THEME.ringColor, track = THEME.ringTrack) {
  const deg = Math.max(0, Math.min(100, pct)) * 3.6;
  return { background: `conic-gradient(${color} ${deg}deg, ${track} ${deg}deg)` };
}

export default function ExobotanyStory() {
  const nav = useNavigate();
  const [idx, setIdx] = React.useState(0);
  const scene = SCENES[idx];
  const pct = Math.round((idx / (SCENES.length - 1)) * 100);
  const { enabled, setEnabled, speak } = useSpeech({ defaultEnabled: true });
  const { click } = useSfx();

  // speak the very first scene on mount and every change thereafter
  React.useEffect(() => {
    if (scene?.narration) speak(scene.narration);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // also attempt first-read once after mount (covers cases where voices load later)
  React.useEffect(() => {
    const t = setTimeout(() => {
      if (idx === 0 && scene?.narration) speak(scene.narration);
    }, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function go(nextId) {
    click();
    const nextIndex = SCENES.findIndex((s) => s.id === nextId);
    if (nextIndex >= 0) setIdx(nextIndex);
  }

  return (
    <div className="min-h-screen w-full text-slate-100 relative overflow-hidden flex flex-col">
      <TopBar />

      {/* Background wash */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: "url('/exobotany.png')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,9,20,.35)_0%,rgba(5,9,20,.88)_100%)]" />
      </div>

      <main className="flex-1 pt-20 pb-10">
        <div className="mx-auto max-w-7xl px-4">

          {/* HERO CARD */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-slate-900/40">
            <div className="w-full h-[220px] md:h-[260px] bg-cover bg-center"
                 style={{ backgroundImage: "url('/exobotany.png')" }} />
            <div className="absolute inset-x-0 bottom-0 bg-black/55 backdrop-blur px-5 py-3">
              <div className="text-lg md:text-xl font-semibold">Exobotany in Orbit</div>
              <div className="text-sm text-slate-300">by: Mena Osman</div>
            </div>
          </div>

          {/* Top controls */}
          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => nav(-1)}
                className="px-3 py-1.5 rounded-full border border-slate-300/30 hover:bg-white/5">
                ← Back
              </button>

              <div className="relative w-10 h-10 rounded-full" style={ringStyle(pct)}>
                <div className="absolute inset-[3px] rounded-full bg-slate-900/70 grid place-items-center text-xs">
                  {pct}%
                </div>
              </div>

              <h1 className="text-xl md:text-2xl font-semibold bg-clip-text text-transparent
                             bg-gradient-to-r from-emerald-300 to-sky-300">
                {scene.title}
              </h1>
            </div>

            <button
              onClick={() => {
                const next = !enabled;
                setEnabled(next);
                if (next && scene?.narration) speak(scene.narration);
              }}
              className={[
                "px-3 py-1.5 rounded-full border text-sm transition",
                enabled
                  ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100"
                  : "border-slate-300/30 hover:bg-white/5"
              ].join(" ")}
            >
              {enabled ? "🔊 Narration On" : "🔈 Narration Off"}
            </button>
          </div>

          {/* Story panel */}
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, y: 10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28 }}
            className="mt-6 grid md:grid-cols-2 gap-6 items-start"
          >
            {/* Interactive image with hotspots */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40">
              <div className="w-full h-[320px] md:h-[420px] bg-cover bg-center"
                   style={{ backgroundImage: `url('${scene.bg}')` }} />
              {scene.hotspots?.map((h, i) => (
                <button
                  key={i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 px-2 py-1 rounded-full text-xs border
                             border-emerald-300/60 bg-slate-900/70 hover:bg-emerald-400/10"
                  style={{ left: h.x, top: h.y }}
                  title={h.tip}
                >
                  {h.label}
                </button>
              ))}
              <Sparkles className="absolute top-3 right-3 w-4 h-4 text-emerald-200/70" />
            </div>

            {/* Text & choices */}
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-2xl opacity-60 blur-2xl
                              bg-gradient-to-r from-emerald-400/10 to-sky-400/10 pointer-events-none" />
              <div className="relative rounded-2xl border border-slate-800 bg-slate-950/70 p-5">
                <p className="text-slate-200 leading-relaxed">{scene.text}</p>

                <div className="mt-5 space-y-2">
                  {scene.choices?.map((c, idx) => (
                    <button
                      key={idx}
                      onClick={() => go(c.next)}
                      className="w-full text-left px-4 py-2 rounded-xl border text-sm transition
                                 border-emerald-300/50 bg-emerald-400/5 hover:bg-emerald-400/15"
                    >
                      <span className="font-medium">➤ {c.label}</span>
                      <span className="block text-xs text-slate-400">{c.note}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* End screen */}
          <AnimatePresence>
            {scene.id === "end" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-6 text-center"
              >
                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-sky-300">
                  Mission Complete 🌼
                </h2>
                <p className="mt-2 text-slate-300">
                  First bloom logged, systems stable, crew morale +5. Ready for another grow cycle?
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    to="/adventure"
                    className="px-5 py-2 rounded-full border border-slate-300/40 hover:bg-white/5"
                  >
                    Back to Adventure
                  </Link>
                  <button
                    onClick={() => setIdx(0)}
                    className="px-5 py-2 rounded-full border text-sky-100
                               border-emerald-300/60 bg-emerald-400/10 hover:bg-emerald-400/20"
                  >
                    Replay Story
                  </button>
                </div>

                {/* Themed marquee */}
                <div className="mt-6 relative h-8 overflow-hidden rounded-full border border-slate-800">
                  <motion.div
                    className="absolute inset-y-0 left-0 flex items-center gap-8 px-4 text-slate-300 text-sm whitespace-nowrap"
                    initial={{ x: 0 }}
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  >
                    🌱 Wicks, light, and capillary magic • 🚿 Misters that don’t escape • 🌼 Pollinate the stars • 🛰️ Grow food off-world
                    <span className="mx-8">|</span>
                    🌱 Wicks, light, and capillary magic • 🚿 Misters that don’t escape • 🌼 Pollinate the stars • 🛰️ Grow food off-world
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
