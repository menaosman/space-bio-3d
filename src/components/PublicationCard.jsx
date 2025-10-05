import React, { useState } from "react";
import SummaryModal from "./SummaryModal.jsx";
import StoryModal from "./StoryModal.jsx";

export default function PublicationCard({ item }) {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const [storyOpen, setStoryOpen] = useState(false);
  const [story, setStory] = useState(null);     // joined text (useful for TTS or fallback)
  const [scenes, setScenes] = useState(null);   // <-- NEW: structured scenes from LLM/fallback
  const [storyLoading, setStoryLoading] = useState(false);

  // Subject → hero image for the story header
  const heroBySubject = (subj) => {
    if (!subj) return "/story/astro-orbit.jpg";
    const s = String(subj).toLowerCase();
    if (s.includes("flora")) return "/story/exo-1.jpg";
    if (s.includes("micro")) return "/story/micro-1.jpg";
    if (s.includes("astro")) return "/story/astro-biosphere.jpg";
    return "/story/astro-orbit.jpg";
  };

  // Prefer env endpoint; otherwise same-origin serverless path
  const API_URL = import.meta.env.VITE_SUMMARY_API_URL || "/api/summarize";

  // === SUMMARY (optional backend) ===
  const handleGenerate = async () => {
    setLoading(true);
    setSummary(null);
    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.title,
          link: item.link,
          abstract: item.abstract || "",
        }),
      });

      if (!resp.ok) {
        const errJson = await resp.json().catch(() => ({}));
        throw new Error(errJson.error || `HTTP ${resp.status}`);
      }

      const data = await resp.json();
      setSummary(data.summary || "No summary returned.");
    } catch (err) {
      console.error("Summarization failed:", err);
      setSummary(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // === STORYBOARD (LLM-first with deterministic fallback) ===
  const handleStory = async () => {
    // Stop any narration still running (if user opened another card earlier)
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }

    setStoryLoading(true);
    setStory(null);
    setScenes(null);

    try {
      // Call our Vercel serverless function
      const r = await fetch("/api/generate_story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item }), // send the whole paper
      });

      if (r.ok) {
        const data = await r.json();
        // data = { title, scenes: [{title,text},...], storyText }
        setStory(data.storyText || null);
        setScenes(Array.isArray(data.scenes) ? data.scenes : null);
        setStoryOpen(true);
        return;
      }

      // If API responded with error, fall back to deterministic scenes
      console.warn("generate_story failed; falling back to local storyboard.");
      throw new Error(`HTTP ${r.status}`);
    } catch (err) {
      // ----- Fallback: deterministic, no-LLM -----
      console.error("Story generation via API failed:", err);

      const bg =
        item.abstract ||
        item.outcome ||
        `This study explores ${item.subject || "space bioscience"}${item.mission ? ` on ${item.mission}` : ""}.`;
      const objective = `Understand how ${item.organism || "organisms"} respond in ${item.mission || "microgravity / spaceflight"} conditions.`;
      const methods = item.instrument
        ? `Experiments were conducted using ${item.instrument}${
            item.orbitAltKm ? ` at ~${item.orbitAltKm} km` : ""
          }${item.inclination ? `, inclination ~${item.inclination}°` : ""}.`
        : `Standard space-bio lab procedures were applied.`;
      const results = item.outcome || `Key physiological and phenotypic changes were observed.`;
      const implications = `Findings inform future ${
        item.subject ? String(item.subject).toLowerCase() : "space biology"
      } research and mission design${item.doi ? ` (DOI: ${item.doi})` : ""}.`;

      const fallbackScenes = [
        { title: "Background", text: bg },
        { title: "Objective", text: objective },
        { title: "Methods", text: methods },
        { title: "Results", text: results },
        { title: "Implications", text: implications },
      ];

      setScenes(fallbackScenes);
      setStory(fallbackScenes.map((s) => `${s.title}: ${s.text}`).join("\n\n"));
      setStoryOpen(true);
    } finally {
      setStoryLoading(false);
    }
  };

  return (
    <>
      <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 hover:border-slate-500/60 transition">
        <div className="flex items-center justify-between gap-3">
          <h4 className="text-slate-100 font-semibold">{item.title}</h4>
          {item.year && (
            <span className="text-xs px-2 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
              {item.year}
            </span>
          )}
        </div>

        {item.journal && <p className="text-slate-300 text-sm mt-1 italic">{item.journal}</p>}
        {item.authors && <p className="text-slate-400 text-xs mt-1">{item.authors}</p>}
        {item.abstract && (
          <p className="text-slate-300 text-sm mt-2 line-clamp-3">{item.abstract}</p>
        )}

        <div className="text-slate-400 text-xs mt-3 flex flex-wrap gap-2">
          {item.organism && (
            <span className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700">
              Organism: {item.organism}
            </span>
          )}
          {item.outcome && (
            <span className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700">
              Outcome: {item.outcome}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 mt-4">
          {item.link && (
            <a
              className="text-sky-400 hover:underline text-sm"
              href={item.link}
              target="_blank"
              rel="noreferrer"
            >
              View Paper
            </a>
          )}

          {/* SUMMARY */}
          <button
            onClick={() => setOpen(true)}
            className="text-xs px-2 py-1 rounded bg-sky-600/30 border border-sky-600/50 text-sky-300 hover:bg-sky-600/50 transition"
          >
            Show Summary
          </button>

          {/* STORY: LLM-first (with fallback) */}
          <button
            onClick={handleStory}
            className="text-xs px-2 py-1 rounded bg-purple-600/30 border border-purple-600/50 text-purple-300 hover:bg-purple-600/50 transition"
          >
            Show Story
          </button>
        </div>
      </div>

      {/* Summary modal */}
      <SummaryModal
        open={open}
        onClose={() => setOpen(false)}
        title={item.title}
        summary={summary}
        loading={loading}
        onGenerate={handleGenerate}
      />

      {/* Story modal: receives structured scenes (preferred) + text fallback */}
      <StoryModal
        key={item.id || item.title} // ensures isolation per paper
        heroSrc={heroBySubject(item.subject)}
        open={storyOpen}
        onClose={() => {
          if (typeof window !== "undefined" && "speechSynthesis" in window) {
            window.speechSynthesis.cancel();
          }
          setStoryOpen(false);
        }}
        title={item.title}
        story={story}
        scenes={scenes}           // <-- NEW
        loading={storyLoading}
        meta={item}               // used to theme images by subject/mission/instrument
      />
    </>
  );
}
