// src/components/PaperStore.jsx
import React, { createContext, useEffect, useState } from "react";
import Papa from "papaparse";

export const PaperContext = createContext();

export function PaperProvider({ children }) {
  const [papers, setPapers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load CSV from public folder
    fetch("/data/papers.csv")
      .then((r) => r.text())
      .then((csvText) => {
        const { data } = Papa.parse(csvText, { header: true, skipEmptyLines: true });
        setPapers(data);
        // default filter: ISS + Arabidopsis + Veggie
        const def = data.filter(
          (p) =>
            (p.mission?.toLowerCase() || "").includes("iss") &&
            (p.organism?.toLowerCase() || "").includes("arabidopsis") &&
            (p.instrument?.toLowerCase() || "").includes("veggie")
        );
        setFiltered(def);
      })
      .catch((err) => {
        console.error("Failed to load papers.csv", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const filter = (filters) => {
    // simple filter function; filters: { mission, organism, instrument, subject }
    const res = papers.filter((p) => {
      if (filters.mission && !(p.mission || "").toLowerCase().includes(filters.mission.toLowerCase())) return false;
      if (filters.organism && !(p.organism || "").toLowerCase().includes(filters.organism.toLowerCase())) return false;
      if (filters.instrument && !(p.instrument || "").toLowerCase().includes(filters.instrument.toLowerCase())) return false;
      if (filters.subject && !(p.subject || "").toLowerCase().includes(filters.subject.toLowerCase())) return false;
      return true;
    });
    setFiltered(res);
  };

  return (
    <PaperContext.Provider value={{ papers, filtered, loading, filter }}>
      {children}
    </PaperContext.Provider>
  );
}
