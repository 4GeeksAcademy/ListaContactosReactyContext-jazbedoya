import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ContactList } from "./pages/ContactList.jsx";
import { AddContact } from "./pages/AddContact.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ContactList />,
  },
  {
    path: "/add",
    element: <AddContact />,
  },
]);
