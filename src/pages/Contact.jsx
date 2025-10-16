import { useEffect } from "react";
import { useGlobalReducer } from "../store.jsx";
import ContactCard from "./ContactCard.jsx";

const API_URL = "https://playground.4geeks.com/contact/agendas/jazbedoya";

const Contact = () => {
  const { store, dispatch } = useGlobalReducer();

  // 1 Cargar contactos al iniciar
  useEffect(() => {
    getContacts();
  }, []);

  // 2 Obtener todos los contactos (GET)
  const getContacts = async () => {
    try {
      const resp = await fetch(`${API_URL}/contacts`);
      if (!resp.ok) throw new Error("Error al obtener contactos");

      const data = await resp.json();
      dispatch({
        type: "SET_CONTACTS",
        payload: data.contacts || [],
      });
    } catch (error) {
      console.error("Error en getContacts:", error);
    }
  };

  // 3 Eliminar contacto (DELETE)
  const deleteContact = async (id) => {
    try {
      const resp = await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error("Error al eliminar");

      // Vuelve a cargar los contactos después de borrar
      getContacts();
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Lista de Contactos</h2>

      {store.contacts.length === 0 ? (
        <p>No hay contactos.</p>
      ) : (
        store.contacts.map((c) => (
          <ContactCard 
            key={c.id} 
            contact={c} 
            deleteContact={deleteContact}  //Se pasa la función
          />
        ))
      )}
    </div>
  );
};

export default Contact;
