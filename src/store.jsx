import { createContext, useContext, useReducer } from "react";

// Creamos el contexto global
export const Context = createContext();

// Estado inicial
const initialState = {
  contacts: [],
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    default:
      return state;
  }
};

// Proveedor del contexto
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ store: state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useGlobalReducer = () => useContext(Context);
