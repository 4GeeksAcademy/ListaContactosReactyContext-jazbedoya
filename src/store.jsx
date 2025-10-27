import React, { createContext, useState, useEffect } from "react";

export const Context = createContext();

const API_URL = "https://playground.4geeks.com/contact/agendas/jazbedoya/contacts";

export const ContextProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  // Obtener todos los contactos
  const getContacts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setContacts(data.contacts || []); // 👈 Importante: usar data.contacts
    } catch (error) {
      console.error("Error al obtener contactos:", error);
    }
  };

  // Agregar contacto
  const addContact = async (newContact) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
      });
      if (response.ok) getContacts();
    } catch (error) {
      console.error("Error al agregar contacto:", error);
    }
  };

  //  Editar contacto
  const updateContact = async (id, updatedContact) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact)
      });
      if (response.ok) getContacts();
    } catch (error) {
      console.error("Error al actualizar contacto:", error);
    }
  };

  //  Eliminar contacto
  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (response.ok) getContacts();
    } catch (error) {
      console.error("Error al eliminar contacto:", error);
    }
  };

  // Cargar al inicio
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Context.Provider value={{ contacts, addContact, updateContact, deleteContact }}>
      {children}
    </Context.Provider>
  );
};
