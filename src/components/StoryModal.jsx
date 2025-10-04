// src/components/StoryModal.jsx
import React from "react";

export default function StoryModal({ open, onClose, title, story, loading, onGenerate }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-lg w-full border border-slate-600">
        <h3 className="text-slate-100 font-semibold mb-4">Storytelling View</h3>
        <p className="text-slate-300 text-sm mb-4">{title}</p>

        <div className="bg-slate-900/60 p-3 rounded-lg min-h-[100px]">
          {loading ? (
            <p className="text-slate-400 italic">Generating story...</p>
          ) : story ? (
            <p className="text-slate-200 whitespace-pre-wrap">{story}</p>
          ) : (
            <p className="text-slate-500 italic">Click below to generate a story.</p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs"
          >
            Close
          </button>
          <button
            onClick={onGenerate}
            disabled={loading}
            className="px-3 py-1 rounded bg-sky-600/40 hover:bg-sky-600/60 text-sky-200 text-xs border border-sky-500/50"
          >
            {loading ? "Generating..." : "Generate Story"}
          </button>
        </div>
      </div>
    </div>
  );
}
