import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes.jsx";
import { ContextProvider } from "./store.jsx"; // 👈 Importa bien el contexto

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>   {/* 👈 Debe envolver al RouterProvider */}
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);
