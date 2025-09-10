import React, { useMemo, useState } from "react";
import data from "./data/bioscience_samples.json";
import FilterBar from "./components/FilterBar.jsx";
import PublicationCard from "./components/PublicationCard.jsx";
import OrbitGlobe from "./components/OrbitGlobe.jsx";

export default function Dashboard(){
  const years = useMemo(()=> Array.from(new Set(data.map(d=>d.year))).sort((a,b)=>b-a), []);
  const subjects = useMemo(()=> Array.from(new Set(data.map(d=>d.subject))), []);
  const missions = useMemo(()=> Array.from(new Set(data.map(d=>d.mission))), []);

  const [q, setQ] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [mission, setMission] = useState("");

  const filtered = useMemo(()=>{
    return data.filter(d=>{
      const matchQ = (q.trim()==="") || (
        d.title.toLowerCase().includes(q.toLowerCase()) ||
        d.organism.toLowerCase().includes(q.toLowerCase()) ||
        d.outcome.toLowerCase().includes(q.toLowerCase())
      );
      const matchYear = year==="" || d.year.toString()===year;
      const matchSubj = subject==="" || d.subject===subject;
      const matchMission = mission==="" || d.mission===mission;
      return matchQ && matchYear && matchSubj && matchMission;
    });
  },[q,year,subject,mission]);

  return (
    <div className="min-h-screen bg-[#050914] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Space Biology Dashboard</h1>
          <a href="/" className="text-sky-400 hover:underline">← Back to Landing</a>
        </div>

        <FilterBar
          q={q} setQ={setQ}
          year={year} setYear={setYear}
          subject={subject} setSubject={setSubject}
          mission={mission} setMission={setMission}
          years={years} subjects={subjects} missions={missions}
        />

        <div className="mt-6 grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 grid gap-4">
            {filtered.map(item => <PublicationCard key={item.id} item={item} />)}
            {filtered.length===0 && <p className="text-slate-400">No results. Adjust filters or search.</p>}
          </div>
          <div className="lg:col-span-1">
            <h3 className="text-sm uppercase tracking-widest text-slate-400 mb-2">3D Explorer</h3>
            <OrbitGlobe items={filtered} />
            <p className="text-xs text-slate-400 mt-2">Showing up to 12 orbits based on filtered items. Ring inclination reflects each item’s mission.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
