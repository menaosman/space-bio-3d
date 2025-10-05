import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import FilterBar from "./components/FilterBar.jsx";
import PublicationCard from "./components/PublicationCard.jsx";
import OrbitGlobe from "./components/OrbitGlobe.jsx";
import { ChevronDown } from "lucide-react";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [q, setQ] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [mission, setMission] = useState("");
  const [journal, setJournal] = useState("");

  useEffect(() => {
    async function load() {
      const normalize = (r) => ({
        id: r.id || r.ID || null,
        title: r.title || r.Title || r.paper_title || "Untitled",
        year: Number(r.year || r.Year || r.pub_year || "") || null,
        journal: r.journal || r.Journal || r.source || null,
        authors: r.authors || r.Authors || r.author || null,
        abstract: r.abstract || r.Abstract || r.summary || null,
        subject: r.subject || r.Subject || r.topic || null,
        organism: r.organism || r.Organism || null,
        mission: r.mission || r.Mission || null,
        outcome: r.outcome || r.Outcome || null,
        doi: r.doi || r.DOI || null,
        link: r.link || r.url || r.URL || null,
        image: r.image || null,
        orbitAltKm: r.orbitAltKm ? Number(r.orbitAltKm) : null,
        inclination: r.inclination ? Number(r.inclination) : null,
      });

      try {
        // Try CSV in /public first
        const res = await fetch("/data/nasa_papers_meta_cleaned.csv", { cache: "no-store" });
        if (!res.ok) throw new Error("CSV not found");
        const csvText = await res.text();
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const rows = (parsed?.data || []).map(normalize).filter((x) => x && x.title);
        setData(rows);
      } catch (e) {
        // Fallback to local JSON in src/data
        try {
          const mod = await import("./data/bioscience_samples.json");
          const rows = (mod?.default || []).map(normalize);
          setData(rows);
        } catch (err) {
          console.error("Failed to load papers:", err);
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // dropdown options
  const years = useMemo(() => {
    const ys = Array.from(new Set(data.map((d) => d.year).filter(Boolean)));
    ys.sort((a, b) => b - a);
    return ys;
  }, [data]);

  const subjects = useMemo(() => {
    const s = Array.from(new Set(data.map((d) => d.subject).filter(Boolean)));
    s.sort();
    return s;
  }, [data]);

  const missions = useMemo(() => {
    const m = Array.from(new Set(data.map((d) => d.mission).filter(Boolean)));
    m.sort();
    return m;
  }, [data]);

  // filtering
  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return data.filter((d) => {
      if (year && Number(d.year) !== Number(year)) return false;
      if (subject && String(d.subject) !== subject) return false;
      if (mission && String(d.mission) !== mission) return false;
      if (journal && d.journal && !String(d.journal).toLowerCase().includes(journal.toLowerCase()))
        return false;
      if (ql) {
        const hay = [
          d.title,
          d.organism,
          d.outcome,
          d.abstract,
          d.journal,
          d.subject,
          d.mission,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(ql)) return false;
      }
      return true;
    });
  }, [data, q, year, subject, mission, journal]);

  const limitedResults = filtered.slice(0, 12);

  if (loading) return <div className="p-6 text-slate-200">Loading papers…</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-100">Space Bioscience Papers</h1>

      <div className="mt-4">
        <FilterBar
          q={q}
          setQ={setQ}
          year={year}
          setYear={setYear}
          subject={subject}
          setSubject={setSubject}
          mission={mission}
          setMission={setMission}
          years={years}
          subjects={subjects}
          missions={missions}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        <div className="lg:col-span-3 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-slate-400">No papers match your filters.</div>
          ) : (
            filtered.map((item, i) => <PublicationCard key={item.id || i} item={item} />)
          )}
        </div>

        <div className="lg:col-span-1">
          <h3 className="text-sm uppercase tracking-widest text-slate-400 mb-2">3D Explorer</h3>
          <OrbitGlobe items={limitedResults} />
          <p className="text-xs text-slate-400 mt-2">Showing up to 12 filtered orbits.</p>
        </div>
      </div>
    </div>
  );
}
