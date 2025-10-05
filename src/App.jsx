import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import SpaceBiologyLanding from "./SpaceBiologyLanding.jsx";
import Dashboard from "./Dashboard.jsx";
import AdventureHub from "./AdventureHub.jsx";
import ExobotanyStory from "./ExobotanyStory.jsx";
import MicrobiologyStory from "./MicrobiologyStory.jsx";
// If you have an Astro page component, import it too:
import AstrobiologyStory from "./AstrobiologyStory.jsx";

const router = createHashRouter([
  { path: "/", element: <SpaceBiologyLanding /> },
  { path: "/dashboard", element: <Dashboard /> },

  // Hub
  { path: "/adventure", element: <AdventureHub /> },

  // Stories
  { path: "/adventure/exobotany", element: <ExobotanyStory /> },

  // ✅ This MUST exist (matches your card’s `to="/adventure/micro-genetics"`):
  { path: "/adventure/micro-genetics", element: <MicrobiologyStory /> },

  // If you also want the astro card to work right now:
   { path: "/adventure/astro-human", element: <AstrobiologyStory /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
