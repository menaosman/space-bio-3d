import React from "react";
export default function PublicationCard({ item }){
  return (
    <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-4 hover:border-slate-500/60 transition">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-slate-100 font-semibold">{item.title}</h4>
        <span className="text-xs px-2 py-1 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">{item.year}</span>
      </div>
      <p className="text-slate-300 text-sm mt-1">{item.outcome}</p>
      <div className="text-slate-400 text-xs mt-3 flex flex-wrap gap-2">
        <span className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700">Mission: {item.mission}</span>
        <span className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700">Subject: {item.subject}</span>
        <span className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700">Organism: {item.organism}</span>
        <span className="px-2 py-1 rounded bg-slate-900/60 border border-slate-700">Instrument: {item.instrument}</span>
      </div>
      <a className="inline-block mt-3 text-sky-400 hover:underline" href={`https://doi.org/${item.doi}`} target="_blank" rel="noreferrer">DOI</a>
    </div>
  );
}
