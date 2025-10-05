// src/components/PublicationCard.jsx
import React, { useState } from "react";
import SummaryModal from "./SummaryModal.jsx";
import StoryModal from "./StoryModal.jsx";

export default function PublicationCard({ item }) {
  const [open, setOpen] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [storyOpen, setStoryOpen] = useState(false);
  const [story, setStory] = useState(null);
  const [storyLoading, setStoryLoading] = useState(false);

  const heroBySubject = (subj) => {
    if (!subj) return '/story/astro-orbit.jpg';
    const s = String(subj).toLowerCase();
    if (s.includes('flora')) return '/story/exo-1.jpg';
    if (s.includes('micro')) return '/story/micro-1.jpg';
    if (s.includes('astro')) return '/story/astro-biosphere.jpg';
    return '/story/astro-orbit.jpg';
  };


  // Use env override if provided, otherwise default to localhost dev URL
  const API_URL =
    import.meta.env.VITE_SUMMARY_API_URL || "";

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
        }),
      });

      // Non-2xx -> read error body (if any) and throw for catch()
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
  const handleStory = async () => {
    setStoryLoading(true);
    setStory(null);
    try {
      const prompt = `Explain this research in a fun, simple way for kids:
      Title: ${item.title}
      Abstract: ${item.abstract || item.outcome || `Mission: ${item.mission || ""}. Subject: ${item.subject || ""}. Organism: ${item.organism || ""}.`}`;
  
      const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo", // reliable free option
          messages: [{ role: "user", content: prompt }],
        }),
      });
  
      const data = await resp.json();
      console.log("Story API response:", data); // 👈 debug
  
      const storyText =
        data?.choices?.[0]?.message?.content ||
        data?.choices?.[0]?.text ||
        "No story returned.";
  
      setStory(storyText);
  
      if (storyText && storyText !== "No story returned.") {
        const utterance = new SpeechSynthesisUtterance(storyText);
        utterance.lang = "en-US";
        speechSynthesis.speak(utterance);
      }
    } catch (err) {
      console.error("Storytelling failed:", err);
      setStory(`Error: ${err.message}`);
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
          <button
            onClick={() => setOpen(true)}
            className="text-xs px-2 py-1 rounded bg-sky-600/30 border border-sky-600/50 text-sky-300 hover:bg-sky-600/50 transition"
          >
            Show Summary
          </button>
          <button
            onClick={() => setStoryOpen(true)}
            className="text-xs px-2 py-1 rounded bg-purple-600/30 border border-purple-600/50 text-purple-300 hover:bg-purple-600/50 transition"
          >
            Show Story
          </button>

        </div>
      </div>

      <StoryModal
        heroSrc={heroBySubject(item.subject)}
        open={storyOpen}
        onClose={() => setStoryOpen(false)}
        title={item.title}
        story={story}
        loading={storyLoading}
        onGenerate={handleStory}
      />
      
    </>
  );
}
