import React, { createContext, useReducer, useContext, useEffect } from "react";

const BASE_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "jazbedoya";

const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

// 🧠 Reducer global
const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "SET_CONTACTS":
      return { ...state, loading: false, contacts: action.payload };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Context = createContext();

// ✅ Crear agenda si no existe
const ensureAgendaExists = async () => {
  try {
    const resp = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}`);
    if (resp.status === 404) {
      const create = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}`, {
        method: "POST",
      });
      if (!create.ok) throw new Error("Error al crear la agenda");
      console.log("✅ Agenda creada correctamente");
    }
  } catch (err) {
    console.error("Error verificando o creando agenda:", err);
  }
};

// 📥 Obtener contactos
const getContacts = async (dispatch) => {
  dispatch({ type: "LOADING" });
  try {
    const resp = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`);
    if (!resp.ok) throw new Error("Error al obtener contactos");
    const data = await resp.json();
    dispatch({ type: "SET_CONTACTS", payload: data });
  } catch (err) {
    console.error("Error en getContacts:", err);
    dispatch({ type: "ERROR", payload: err.message });
  }
};

// ➕ Crear contacto
const addContact = async (dispatch, newContact) => {
  try {
    // Asegurarse de que todos los campos requeridos estén definidos
    const contactWithAgenda = {
      full_name: newContact.full_name || "",
      email: newContact.email || "",
      address: newContact.address || "",
      phone: newContact.phone || "",
      agenda_slug: AGENDA_SLUG,
    };

    // Validar antes de enviar
    if (
      !contactWithAgenda.full_name ||
      !contactWithAgenda.email ||
      !contactWithAgenda.address ||
      !contactWithAgenda.phone
    ) {
      throw new Error("Todos los campos son obligatorios");
    }

    const resp = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactWithAgenda),
    });

    const data = await resp.json();

    if (!resp.ok) {
      console.error("Error del servidor:", data);
      throw new Error(data.detail ? data.detail[0].msg : "Error al crear contacto");
    }

    console.log("✅ Contacto agregado correctamente:", data);
    getContacts(dispatch);
  } catch (err) {
    console.error("Error al agregar contacto:", err);
  }
};

// ✏️ Actualizar contacto
const updateContact = async (dispatch, id, updatedContact) => {
  try {
    const resp = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...updatedContact,
        agenda_slug: AGENDA_SLUG,
      }),
    });
    if (!resp.ok) throw new Error("Error al actualizar contacto");
    console.log("✅ Contacto actualizado correctamente");
    getContacts(dispatch);
  } catch (err) {
    console.error("Error al actualizar contacto:", err);
  }
};

// ❌ Eliminar contacto
const deleteContact = async (dispatch, id) => {
  try {
    const resp = await fetch(`${BASE_URL}/agendas/${AGENDA_SLUG}/contacts/${id}`, {
      method: "DELETE",
    });
    if (!resp.ok) throw new Error("Error al eliminar contacto");
    console.log("🗑️ Contacto eliminado correctamente");
    getContacts(dispatch);
  } catch (err) {
    console.error("Error al eliminar contacto:", err);
  }
};

export const ContextProvider = ({ children }) => {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    ensureAgendaExists().then(() => getContacts(dispatch));
  }, []);

  return (
    <Context.Provider
      value={{
        store,
        dispatch,
        getContacts,
        addContact,
        updateContact,
        deleteContact,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useGlobalContext = () => useContext(Context);
