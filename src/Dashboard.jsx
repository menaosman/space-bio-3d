import React, { useMemo, useState } from "react";
import data from "./data/bioscience_samples.json";
import FilterBar from "./components/FilterBar.jsx";
import PublicationCard from "./components/PublicationCard.jsx";
import OrbitGlobe from "./components/OrbitGlobe.jsx";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

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
<div className="flex items-center justify-between mb-6">
  <h1 className="text-2xl md:text-3xl font-bold">Space Biology Dashboard</h1>

  {/* Split dropdown button */}
  <div className="relative" >
    <div className="flex">
      <a
        href="/"
        className="px-3 py-2 rounded-l-lg bg-slate-800/70 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-100"
      >
        Home
      </a>
      <button
        id="explore-trigger"
        className="px-3 py-2 rounded-r-lg bg-slate-800/70 border border-slate-700 border-l-0 hover:border-slate-500 hover:bg-slate-800 text-slate-100 flex items-center gap-1"
        onClick={(e) => {
          e.preventDefault();
          const m = document.getElementById("explore-menu");
          m?.classList.toggle("hidden");
        }}
        onMouseEnter={() => document.getElementById("explore-menu")?.classList.remove("hidden")}
      >
        Explore
        <ChevronDown size={16} className="opacity-80" />
      </button>
    </div>

    {/* Menu */}
    <div
      id="explore-menu"
      className="hidden absolute right-0 mt-2 w-56 rounded-xl border border-slate-700 bg-slate-900/95 backdrop-blur shadow-xl z-20"
      onMouseLeave={() => document.getElementById("explore-menu")?.classList.add("hidden")}
    >
      <a
        href="/#orbit-earth"
        className="block px-4 py-3 text-slate-200 hover:bg-slate-800/70 rounded-t-xl"
        onClick={() => document.getElementById("explore-menu")?.classList.add("hidden")}
      >
        ORBIT THE EARTH
      </a>
      <button
        className="w-full text-left block px-4 py-3 text-slate-200 hover:bg-slate-800/70 rounded-b-xl"
        onClick={() => {
          // Placeholder action for now
          document.getElementById("explore-menu")?.classList.add("hidden");
          // TODO: route to your adventure flow when ready
          alert("Choose your Adventure — coming soon!");
        }}
      >
        Choose your Adventure
      </button>
    </div>
  </div>
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
