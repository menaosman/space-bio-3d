import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SpaceBiologyLanding from "./SpaceBiologyLanding.jsx";
import Adventure from "./pages/Adventure.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpaceBiologyLanding />} />
        <Route path="/adventure" element={<Adventure />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
