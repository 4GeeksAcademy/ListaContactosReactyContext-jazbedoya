import React, { useEffect } from "react";
import { useGlobalContext } from "../store.jsx";

const Contact = () => {
  const { store, getContacts, deleteContact, dispatch } = useGlobalContext();

  useEffect(() => {
    getContacts(dispatch);
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-center">Lista de contactos</h2>

      {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
        store.contacts.map((c) => (
          <div
            key={c.id}
            className="d-flex justify-content-between align-items-center border p-2 mb-2"
          >
            <div>
              <strong>{c.full_name}</strong> <br />
              <small>{c.email}</small>
            </div>
            <button
              onClick={() => deleteContact(dispatch, c.id)}
              className="btn btn-danger btn-sm"
            >
              Eliminar
            </button>
          </div>
        ))
      ) : (
        <p className="text-center">No hay contactos disponibles.</p>
      )}
    </div>
  );
};

export default Contact;
