import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SpaceBiologyLanding from "./SpaceBiologyLanding.jsx";
import Dashboard from "./Dashboard.jsx";

const router = createBrowserRouter([
  { path: "/", element: <SpaceBiologyLanding /> },
  { path: "/dashboard", element: <Dashboard /> },
]);

export default function App(){
  return <RouterProvider router={router} />;
}
