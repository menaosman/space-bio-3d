import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import FilterBar from "./components/FilterBar.jsx";
import PublicationCard from "./components/PublicationCard.jsx";
import OrbitGlobe from "./components/OrbitGlobe.jsx";
// import { ChevronDown } from "lucide-react"; // not used

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [q, setQ] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");
  const [mission, setMission] = useState("");
  const [journal, setJournal] = useState(""); // NEW: wired up

  // helpers for robust comparisons
  const norm = (v) => String(v ?? "").trim().toLowerCase();
  const isAll = (v) => {
    const n = norm(v);
    return n === "" || n === "all" || n === "any" || n.startsWith("all ");
  };
  const equalsNorm = (a, b) => norm(a) === norm(b);
  const containsNorm = (hay, needle) => norm(hay).includes(norm(needle));

  useEffect(() => {
    async function load() {
      const normalizeRow = (r) => {
        const n = (x) => (x == null ? null : String(x).trim());
        const num = (x) => (x == null || x === "" ? null : Number(x));
        return {
          id: r.id || r.ID || null,
          title: n(r.title || r.Title || r.paper_title) || "Untitled",
          year: num(r.year || r.Year || r.pub_year),
          journal: n(r.journal || r.Journal || r.source),
          authors: n(r.authors || r.Authors || r.author),
          abstract: n(r.abstract || r.Abstract || r.summary),
          subject: n(r.subject || r.Subject || r.topic),
          organism: n(r.organism || r.Organism),
          mission: n(r.mission || r.Mission),
          outcome: n(r.outcome || r.Outcome),
          doi: n(r.doi || r.DOI),
          link: n(r.link || r.url || r.URL),
          image: n(r.image),
          orbitAltKm: num(r.orbitAltKm),
          inclination: num(r.inclination),
        };
      };

      try {
        // Try CSV in /public first
        const res = await fetch("/data/nasa_papers_meta_cleaned.csv", { cache: "no-store" });
        if (!res.ok) throw new Error("CSV not found");
        const csvText = await res.text();
        const parsed = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        const rows = (parsed?.data || []).map(normalizeRow).filter((x) => x && x.title);
        setData(rows);
      } catch {
        // Fallback to local JSON in src/data
        try {
          const mod = await import("./data/bioscience_samples.json");
          const rows = (mod?.default || []).map(normalizeRow).filter((x) => x && x.title);
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

  // dropdown options (dedupe on normalized value)
  const years = useMemo(() => {
    const ys = Array.from(new Set(data.map((d) => d.year).filter((v) => v != null)));
    ys.sort((a, b) => b - a);
    return ys;
  }, [data]);

  const subjects = useMemo(() => {
    const map = new Map();
    for (const d of data) {
      if (!d.subject) continue;
      const key = norm(d.subject);
      if (!map.has(key)) map.set(key, d.subject.trim());
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const missions = useMemo(() => {
    const map = new Map();
    for (const d of data) {
      if (!d.mission) continue;
      const key = norm(d.mission);
      if (!map.has(key)) map.set(key, d.mission.trim());
    }
    return Array.from(map.values()).sort((a, b) => a.localeCompare(b));
  }, [data]);

  // filtering (robust, case/whitespace-insensitive)
  const filtered = useMemo(() => {
    const ql = norm(q);
    const wantYear = !isAll(year);
    const wantSubject = !isAll(subject);
    const wantMission = !isAll(mission);
    const wantJournal = !isAll(journal);

    return data.filter((d) => {
      if (wantYear && Number(d.year) !== Number(year)) return false;

      if (wantSubject) {
        // allow tolerant match (exact after normalize OR substring)
        if (!(equalsNorm(d.subject, subject) || containsNorm(d.subject || "", subject))) return false;
      }

      if (wantMission) {
        if (!(equalsNorm(d.mission, mission) || containsNorm(d.mission || "", mission))) return false;
      }

      if (wantJournal) {
        if (!d.journal || !containsNorm(d.journal, journal)) return false;
      }

      if (ql) {
        const hay = [
          d.title,
          d.organism,
          d.outcome,
          d.abstract,
          d.journal,
          d.subject,
          d.mission,
          d.doi,
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
          q={q} setQ={setQ}
          year={year} setYear={setYear}
          subject={subject} setSubject={setSubject}
          mission={mission} setMission={setMission}
          journal={journal} setJournal={setJournal}  // NEW: passed to FilterBar
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
