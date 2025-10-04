// src/components/WhatIfPanel.jsx
import React, { useState } from "react";

/*
 Simple "what-if" module:
 - user picks a parameter (light, water, gravity)
 - app returns a mock result sentence based on rules
 For full scientific simulation you would call a model or backend.
*/

export default function WhatIfPanel() {
  const [gravity, setGravity] = useState(0);
  const [light, setLight] = useState(100); // arbitrary units
  const [water, setWater] = useState(1); // relative
  const [result, setResult] = useState(null);

  function runScenario() {
    // small rule-based "inference"
    const gravityNote = gravity < 0.5 ? "reduced gravity may slow root downward growth and alter auxin distribution." :
                        gravity > 1 ? "hypergravity may accelerate mechanical stress responses." :
                        "microgravity-like conditions may promote altered cell wall synthesis.";
    const lightNote = light > 200 ? "high light likely increases photosynthetic rate but may stress the plant." : "light is within tolerant range.";
    const waterNote = water < 0.5 ? "low water may cause wilting and reduced growth." : "water supply sufficient for normal growth.";

    const summary = `Scenario result: ${gravityNote} ${lightNote} ${waterNote}`;
    setResult(summary);
  }

  return (
    <div className="p-4 border rounded-md bg-white">
      <h3 className="font-semibold">What-If Scenario Explorer</h3>

      <div className="mt-3">
        <label className="block text-sm">Gravity (g)</label>
        <input type="range" min="0" max="2" step="0.1" value={gravity} onChange={(e)=>setGravity(Number(e.target.value))} />
        <div className="text-xs text-gray-600">Gravity: {gravity} g</div>
      </div>

      <div className="mt-3">
        <label className="block text-sm">Light intensity</label>
        <input type="range" min="0" max="400" step="10" value={light} onChange={(e)=>setLight(Number(e.target.value))} />
        <div className="text-xs text-gray-600">Light: {light}</div>
      </div>

      <div className="mt-3">
        <label className="block text-sm">Water level (relative)</label>
        <input type="range" min="0" max="2" step="0.1" value={water} onChange={(e)=>setWater(Number(e.target.value))} />
        <div className="text-xs text-gray-600">Water: {water}</div>
      </div>

      <div className="mt-3 flex gap-2">
        <button className="px-3 py-1 rounded bg-blue-600 text-white" onClick={runScenario}>Run Scenario</button>
        <button className="px-3 py-1 rounded border" onClick={()=>{ setResult(null); setGravity(0); setLight(100); setWater(1); }}>Reset</button>
      </div>

      {result && (
        <div className="mt-4 p-3 bg-gray-50 rounded">
          <strong>Model output:</strong>
          <p className="mt-2">{result}</p>
        </div>
      )}
    </div>
  );
}
