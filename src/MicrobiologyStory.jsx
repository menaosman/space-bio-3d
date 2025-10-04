import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Dna, FlaskConical, Microscope, TestTubes, ArrowLeft, ArrowRight } from "lucide-react";

/** Mini panel component (self-contained) */
function Panel({ id, title, kicker, body, img, align = "left", active }) {
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
          <img
            src={img}
            alt={title}
            className="w-full h-[52svh] object-cover"
            loading="lazy"
          />
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
        <h2 className="mt-2 text-3xl md:text-4xl font-extrabold">
          {title}
        </h2>
        <p className="mt-4 text-base md:text-lg text-white/80 leading-relaxed">{body}</p>
      </motion.div>
    </section>
  );
}

export default function MicrobiologyStory() {
  const sections = [
    {
      id: "intro",
      icon: <Microscope size={18} />,
      step: "Sterile Workflow",
      kicker: "Wet Lab • Aseptic Technique",
      title: "Setting up a Clean Bench",
      body:
        "We prep a Class II biosafety cabinet: 70% ethanol wipe-down, Bunsen burner/sterile zone, and labeled disposables. Controls first, samples second. Gloves on; talk and movement minimized.",
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
        "Streak for isolated colonies, incubate at the organism’s preferred temperature, then evaluate morphology: shape, elevation, color, hemolysis. Pick single colonies for purity.",
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
        "Fix, crystal violet, iodine, decolorize, counterstain. Gram-positive retain violet; Gram-negative appear pink. This guides antibiotic strategy and downstream isolation steps.",
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
        "Design gRNA (on-target/high specificity), choose Cas variant, and provide donor template if HDR is needed. Deliver via plasmid or RNP. Screen by PCR and Sanger/NGS to confirm edits.",
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
        "Transition to shake flasks/bioreactors; monitor OD600, pH, DO. Document sterility checks and waste decontamination. Ensure BSL policies, PPE, and incident logs are followed.",
      img: "/story/micro-5.jpg",
      align: "left",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const refs = useRef([]);

  // page title (polish)
  useEffect(() => {
    const prev = document.title;
    document.title = "Microbiology & Genetic Engineering — Space Bio";
    return () => (document.title = prev);
  }, []);

  useEffect(() => {
    refs.current = refs.current.slice(0, sections.length);
    const obs = new IntersectionObserver(
      (entries) => {
        const topMost = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (topMost) {
          const idx = refs.current.findIndex((r) => r === topMost.target);
          if (idx !== -1) setActiveIdx(idx);
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "0px 0px -20% 0px" }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // keyboard nav (optional but handy)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx]);

  const go = (dir) => {
    const next = Math.min(Math.max(activeIdx + dir, 0), sections.length - 1);
    const target = refs.current[next];
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white">
      {/* top bar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-black/30 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dna className="opacity-90" />
            <span className="font-semibold">Microbiology & Genetic Engineering</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
            <span>Wet lab</span>
            <span> Cultures</span>
            <span> CRISPR</span>
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
              <div
                className={`h-1 rounded-full transition-all ${
                  i <= activeIdx ? "bg-sky-400" : "bg-white/15"
                }`}
              />
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
            <Panel
              id={sec.id}
              title={sec.title}
              kicker={sec.kicker}
              body={sec.body}
              img={sec.img}
              align={sec.align}
              active={i === activeIdx}
            />
          </div>
        ))}
      </main>

      {/* nav buttons */}
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
