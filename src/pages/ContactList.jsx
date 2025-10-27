import React, { useContext } from "react";
import { Context } from "../store";
import { Link } from "react-router-dom";

export const ContactList = () => {
  const { contacts, deleteContact } = useContext(Context);

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Lista de contactos</h1>
      <Link to="/add" className="btn btn-success mb-3">
        + Agregar contacto
      </Link>

      {contacts.length === 0 ? (
        <p>No hay contactos disponibles.</p>
      ) : (
        <ul className="list-group">
          {contacts.map((contact) => (
            <li
              key={contact.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{contact.name}</strong> <br />
                📧 {contact.email} <br />
                📞 {contact.phone} <br />
                🏠 {contact.address}
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteContact(contact.id)}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
