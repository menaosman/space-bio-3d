import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import SpaceBiologyLanding from "./SpaceBiologyLanding.jsx";
import Dashboard from "./Dashboard.jsx";
import AdventureHub from "./AdventureHub.jsx";
import ExobotanyStory from "./ExobotanyStory.jsx";
const router = createHashRouter([
  { path: "/", element: <SpaceBiologyLanding /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/adventure", element: <AdventureHub /> },
   { path: "/adventure/exobotany", element: <ExobotanyStory /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}


