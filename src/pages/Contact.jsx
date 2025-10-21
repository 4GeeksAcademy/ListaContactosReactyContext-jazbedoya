import React, { useEffect } from "react";
import { useGlobalContext } from "../store.jsx";

const Contact = () => {
  const { store, getContacts, deleteContact } = useGlobalContext();

  // 🧩 Cargar contactos al montar el componente
  useEffect(() => {
    getContacts();
  }, []);

  // ⏳ Estado de carga
  if (store.loading) {
    return <p className="text-center mt-5">Cargando contactos...</p>;
  }

  // ⚠️ Error
  if (store.error) {
    return (
      <p className="text-center text-danger mt-5">
        Error: {store.error}
      </p>
    );
  }

  // ✅ Renderizar lista de contactos
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Lista de contactos</h2>

      {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
        store.contacts.map((c) => (
          <div
            key={c.id}
            className="d-flex justify-content-between align-items-center border rounded p-3 mb-2 shadow-sm"
          >
            <div>
              <strong>{c.full_name}</strong> <br />
              <small>{c.email}</small> <br />
              <small>📞 {c.phone}</small> <br />
              <small>🏠 {c.address}</small>
            </div>

            <button
              onClick={() => deleteContact(c.id)}
              className="btn btn-danger btn-sm"
            >
              Eliminar
            </button>
          </div>
        ))
      ) : (
        <p className="text-center mt-4">No hay contactos disponibles.</p>
      )}
    </div>
  );
};

export default Contact;
