import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGlobalContext } from "../store.jsx"; // ✅ Usa el contexto global

const Single = () => {
  const { store } = useGlobalContext(); // ✅ Contexto global
  const { theId } = useParams(); // ✅ Id de la URL

  // Buscar contacto con ese id
  const contact = store.contacts?.find((c) => c.id === parseInt(theId));

  // ✅ Si no existe el contacto
  if (!contact) {
    return (
      <div className="container text-center mt-5">
        <h3>Contacto no encontrado 😕</h3>
        <Link to="/" className="btn btn-secondary mt-3">
          Volver a la lista
        </Link>
      </div>
    );
  }

  // ✅ Si el contacto existe
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">{contact.full_name}</h1>
      <p><strong>📧 Email:</strong> {contact.email}</p>
      <p><strong>📞 Teléfono:</strong> {contact.phone}</p>
      <p><strong>🏠 Dirección:</strong> {contact.address}</p>

      <Link to="/" className="btn btn-primary mt-4">
        Volver a la lista
      </Link>
    </div>
  );
};

export default Single;
