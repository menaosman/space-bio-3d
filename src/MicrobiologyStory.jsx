import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Dna,
  FlaskConical,
  Microscope,
  TestTubes,
  ArrowLeft,
  ArrowRight,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Headphones,
  MessageSquare,
} from "lucide-react";

/** ---------- Mini panel component ---------- */
const Panel = React.memo(function Panel({ id, title, kicker, body, img, align = "left", active }) {
  return (
    <section id={id} className="min-h-[100svh] grid md:grid-cols-2 items-center gap-8 py-16">
      {/* image */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: active ? 1 : 0.35, y: active ? 0 : 10 }}
        transition={{ duration: 0.6 }}
        className={`${align === "left" ? "order-1" : "order-2"} w-full`}
      >
        <div className="overflow-hidden rounded-2xl shadow-xl">
          <img src={img} alt={title} className="w-full h-[52svh] object-cover" loading="lazy" />
        </div>
      </motion.div>

      {/* text */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: active ? 1 : 0.6, y: active ? 0 : 10 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className={`${align === "left" ? "order-2" : "order-1"} w-full`}
      >
        <p className="text-sm uppercase tracking-widest text-sky-400/90 font-semibold">{kicker}</p>
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">{title}</h2>
        <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">{body}</p>
      </motion.div>
    </section>
  );
});

/** ---------- Story component with narration ---------- */
export default function MicrobiologyStory() {
  const sections = [
    {
      id: "intro",
      icon: <Microscope size={18} />,
      step: "Sterile Workflow",
      kicker: "Wet Lab • Aseptic Technique",
      title: "Setting up a Clean Bench",
      body:
        "We prep a Class II biosafety cabinet: 70% ethanol wipe-down, a stable sterile zone, and labeled disposables. Start with controls, then samples. Gloves on; limit movement and talking to reduce turbulence.",
      img: "/story/micro-1.jpg",
      align: "left",
    },
    {
      id: "cultures",
      icon: <TestTubes size={18} />,
      step: "Cultures",
      kicker: "Agar Plates • Colony Morphology",
      title: "Streak, Incubate, Inspect",
      body:
        "Streak for isolated colonies, incubate at the organism’s preferred temperature, then assess morphology—shape, elevation, color, and hemolysis. Pick a single colony to maintain purity.",
      img: "/story/micro-2.jpg",
      align: "right",
    },
    {
      id: "stain",
      icon: <Microscope size={18} />,
      step: "Gram Stain",
      kicker: "Crystal Violet • Safranin",
      title: "Classifying Cell Walls",
      body:
        "Fix the smear, stain with crystal violet, iodine, decolorize, then counterstain. Gram-positive retain violet; Gram-negative appear pink. This informs antibiotic strategy and isolation steps.",
      img: "/story/micro-3.jpg",
      align: "left",
    },
    {
      id: "crispr",
      icon: <Dna size={18} />,
      step: "CRISPR Edit",
      kicker: "Guide RNA • Donor Template",
      title: "Design → Deliver → Select",
      body:
        "Design a specific gRNA, choose the right Cas variant, and include a donor template for HDR if needed. Deliver via plasmid or RNP. Screen candidates by PCR and confirm with Sanger or NGS.",
      img: "/story/micro-4.jpg",
      align: "right",
    },
    {
      id: "scale",
      icon: <FlaskConical size={18} />,
      step: "Scale & Safety",
      kicker: "Bioreactor • BSL Compliance",
      title: "From Bench to Bioreactor",
      body:
        "Scale to shake flasks or bioreactors. Track OD600, pH, dissolved oxygen, and sterility checks. Log waste decontamination and follow BSL policies, PPE requirements, and incident reporting.",
      img: "/story/micro-5.jpg",
      align: "left",
    },
  ];

  // Narration scripts (short, paced for voice)
  const narrationScripts = useMemo(
    () => [
      "Welcome to the Microbiology and Genetic Engineering lab. First, we set up a sterile workspace. Ethanol wipe-down, stable airflow, and labeled disposables keep contamination low. Controls first, then samples.",
      "Time to culture. Streak the plate for single colonies, incubate at the right temperature, then inspect morphology. Choose one clean colony to stay pure for downstream work.",
      "Let’s Gram stain. Crystal violet, iodine, decolorize, then safranin. Gram-positive cells stay violet; Gram-negative turn pink. This classification guides your antibiotic choices.",
      "Now CRISPR. Design a specific guide RNA, pick the Cas enzyme, and include a donor template if you want HDR. Deliver the edit, then screen by PCR and confirm by sequencing.",
      "Scale up with care. Move to flasks or a bioreactor, watching OD600, pH, and dissolved oxygen. Keep strict BSL compliance, document waste handling, and maintain a sterile process.",
    ],
    []
  );

  // Optional: pre-recorded audio files (place in public/audio/)
  const audioSrcs = useMemo(
    () => [
      "/audio/micro-1.mp3",
      "/audio/micro-2.mp3",
      "/audio/micro-3.mp3",
      "/audio/micro-4.mp3",
      "/audio/micro-5.mp3",
    ],
    []
  );

  const [activeIdx, setActiveIdx] = useState(0);
  const refs = useRef([]);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState("tts"); // 'tts' | 'audio'
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.9);

  // Page title
  useEffect(() => {
    const prev = document.title;
    document.title = "Microbiology & Genetic Engineering — Space Bio";
    return () => (document.title = prev);
  }, []);

  // Intersection observer (activates panel + triggers narration)
  useEffect(() => {
    refs.current = refs.current.slice(0, sections.length);
    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (top) {
          const idx = refs.current.findIndex((r) => r === top.target);
          if (idx !== -1) setActiveIdx(idx);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "0px 0px -20% 0px" }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [sections.length]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx]);

  // Keep audio element volume/mute updated
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = muted;
    }
  }, [volume, muted]);

  // Stop current narration (TTS or audio)
  const stopNarration = () => {
    // TTS stop
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    // Audio stop/pause
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Play narration for current index
  const speakCurrent = async () => {
    stopNarration();
    if (mode === "audio" && audioRef.current) {
      audioRef.current.src = audioSrcs[activeIdx];
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
      return;
    }

    // TTS
    const text = narrationScripts[activeIdx] || "";
    if (!text) return;
    if (!("speechSynthesis" in window)) {
      console.warn("Speech Synthesis not supported; switch to audio mode or add files.");
      return;
    }
    const utter = new SpeechSynthesisUtterance(text);
    // You can switch to "ar-EG" if you want Arabic narration
    utter.lang = "en-US";
    utter.rate = 1.0;
    utter.pitch = 1.0;
    utter.volume = muted ? 0 : volume;
    utter.onend = () => setIsPlaying(false);
    setIsPlaying(true);
    window.speechSynthesis.speak(utter);
  };

  // Auto-play narration when index changes while playing
  useEffect(() => {
    if (isPlaying) {
      speakCurrent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx, mode]);

  const go = (dir) => {
    const next = Math.min(Math.max(activeIdx + dir, 0), sections.length - 1);
    const target = refs.current[next];
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopNarration();
    } else {
      setIsPlaying(true);
      speakCurrent();
    }
  };

  const toggleMode = () => {
    const nextMode = mode === "tts" ? "audio" : "tts";
    setMode(nextMode);
    setIsPlaying(false);
    stopNarration();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* hidden audio element for pre-recorded mode */}
      <audio
        ref={audioRef}
        onEnded={() => {
          setIsPlaying(false);
        }}
        preload="none"
      />

      {/* top bar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dna className="opacity-90" />
            <span className="font-semibold">Microbiology & Genetic Engineering</span>
          </div>

          {/* Narration controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMode}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-300/30 hover:bg-white/5 text-sm"
              title={mode === "tts" ? "Switch to Audio files" : "Switch to Text-to-Speech"}
            >
              {mode === "tts" ? <MessageSquare size={16} /> : <Headphones size={16} />}
              <span className="hidden sm:inline">{mode === "tts" ? "TTS" : "Audio"}</span>
            </button>

            <button
              onClick={() => go(-1)}
              className="px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/10 text-sm"
              title="Previous section"
            >
              <ArrowLeft size={16} />
            </button>

            <button
              onClick={togglePlay}
              className="px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/10 text-sm"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              onClick={() => go(1)}
              className="px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/10 text-sm"
              title="Next section"
            >
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => setMuted((m) => !m)}
              className="px-3 py-1.5 rounded-full border border-white/15 hover:bg-white/10 text-sm"
              title={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-24 accent-sky-400"
              title="Volume"
            />
          </div>

          <Link
            to="/adventure"
            className="text-white/80 hover:text-white text-sm underline underline-offset-4"
          >
            Back to Hub
          </Link>
        </div>
      </header>

      {/* progress */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-6 flex items-center gap-3">
          {sections.map((s, i) => (
            <div key={s.id} className="flex-1">
              <div className={`h-1 rounded-full transition-all ${i <= activeIdx ? "bg-sky-400" : "bg-white/15"}`} />
              <div className="mt-2 flex items-center gap-2 text-xs text-white/70">
                <span
                  className={`w-5 h-5 grid place-items-center rounded-full border ${
                    i === activeIdx ? "bg-sky-500 text-black border-sky-400" : "border-white/25"
                  }`}
                >
                  {s.icon}
                </span>
                <span className={`${i === activeIdx ? "text-white" : ""}`}>{s.step}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* content */}
      <main className="mx-auto max-w-6xl px-4 space-y-2">
        {sections.map((sec, i) => (
          <div key={sec.id} ref={(el) => (refs.current[i] = el)}>
            <Panel {...sec} active={i === activeIdx} />
          </div>
        ))}
      </main>

      {/* bottom nav */}
      <div className="sticky bottom-4 z-40">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex justify-between">
            <button
              onClick={() => go(-1)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-white/10 hover:bg-white/15 border border-white/15"
            >
              <ArrowLeft size={16} /> Prev
            </button>
            <button
              onClick={() => go(1)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-sky-500/90 hover:bg-sky-400 text-black"
            >
              Next <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* footer */}
      <footer className="mt-16 pb-10 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Space Bio • Microbiology & Genetic Engineering
      </footer>
    </div>
  );
}
