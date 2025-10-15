import { useEffect } from "react"
import { useGlobalReducer } from"../store.jsx"

const API_URL =" https://playground.4geeks.com/contact/agendas/jazbedoya"

const Contact = () => {
    const {store,dispatch} = useGlobalReducer();


    useEffect(()=>{
        getContacts();
  },  []);
    
const getContacts = async () => {
        const resp = await fetch(`${API_URL}/contacts`)
        const  data = await resp.json();
        dispatch({type: "SET_CONTACTS", payload: data.contacts});

  
};


return (
    <div className="container mt-5">
        <h2>Lista de Contactos</h2>
        {store.contacts.map((c)=>(
            <ContactCard key={c.id} contact={c}/>
        ))}
    </div>
);

};
  
export default Contact;