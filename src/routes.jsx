import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "./pages/Layout.jsx";        // si lo usas

import Contact from "./pages/Contact.jsx";      //lista
import AddContact from "./pages/AddContact.jsx"; //crear / editar
import Single from "./pages/Single.jsx";        // si lo usas
import Demo from "./pages/Demo.jsx";            // si lo usas


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<h1>Not found!</h1>}>

      {/* Lista de contactos en la ruta "/" */}
      <Route path="/" element={<Contact />} />

      {/* Crear contacto */}
      <Route path="/add" element={<AddContact />} />

      {/* Editar contacto */}
      <Route path="/edit/:id" element={<AddContact />} />

      {/* Vista individual (si la usas) */}
      <Route path="/single/:theId" element={<Single />} />

      {/* Demo (si la usas) */}
      <Route path="/demo" element={<Demo />} />

    </Route>
  )
);
