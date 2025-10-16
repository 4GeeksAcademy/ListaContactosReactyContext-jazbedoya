import { createContext, useContext, useReducer } from "react";
import AddContact from "./pages/AddContact";

// 1 Creamos el contexto global
export const Context = createContext();

// 2 Estado inicial
const initialState = {
  contacts: [],
};

// 3 Reducer con todas las acciones 
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_CONTACTS": //leer
      return { ...state, contacts: action.payload };
    
    case "ADD_CONTACT": //CREAR
      return{...state, contacts:[...state.contacts,action.payload]};

    case "DELETE_CONTACT": //Eliminar
       return {
         ...state,
         contacts: state.contacts.filter(
          (contact)=> contact.id !== action.payload
         ),

       };

    case "UPDATE_CONTACT": //EDITAR
      return{
        ...state,
        contacts: state.contacts.map((c)=>
          c.id == action.payload.id? action.payload : c
        ),
      };
        
    default:
      return state;

  }
};



// Proveedor del contexto
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //helpers
  const AddContact =(newContact) => {
    dispatch({type:"ADD_CONTACT", payload : newContact});
  }
   
  const deleteContact =(id) => {
    dispatch({type:"DELETE_CONTACT", payload : id});

   }

  const updateContact =(updatedContact) => {
    dispatch({type:"UPDATE_CONTACT", payload : updatedContact});
  }



 return (
    <Context.Provider value={{ 
      store: state, 
      dispatch,
      AddContact,
      deleteContact,
      updateContact
       }}>
      {children}
    </Context.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useGlobalReducer = () => useContext(Context);
