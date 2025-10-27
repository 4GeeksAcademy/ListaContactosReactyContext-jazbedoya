import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./store";
import { ContactList } from "./pages/ContactList";
import { AddContact } from "./pages/AddContact";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ContactList />} />
          <Route path="/add" element={<AddContact />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
