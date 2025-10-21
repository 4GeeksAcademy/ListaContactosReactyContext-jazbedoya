import React from "react";
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="text-center mt-3">
      <h1>React Boilerplate</h1>
      <nav>
        <Link to="/" className="btn btn-primary m-2">Contactos</Link>
        <Link to="/add" className="btn btn-success m-2">Agregar</Link>
        <Link to="/demo" className="btn btn-info m-2">Demo</Link>
      </nav>
      <Outlet /> {/* 👈 Esto es clave */}
    </div>
  );
};

export default Layout;
