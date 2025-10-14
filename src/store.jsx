import { createContext,useContext,useReducer } from "react";

//creamos el contexto
export const Context = createContext();

//definimos el estado inicial

const initialState ={
  contacts:[],
};

//Definimos el reducer: como cambia el estado segun acciones
const reducer = (state,action)=> {
  switch(action.type){
    case "SET_CONTACTS":

       return {...state,contacts: action.payload };
    default:
      return state;

  }
};
//Proveedor: envuelve a la app y entrega {store,dispatch}
export const ContextProvider =({children}) => {
  const[ state,dispatch] = useReducer(reducer,initialState);
  return (
    <ContextProvider value={{store: state,dispatch}}>
      {children}
    </ContextProvider>
  );
};

// hook para consumir el contexto final
export const useGlobalReducer = () => useContext(Context);