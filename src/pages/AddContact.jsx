import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalReducer } from "../store";

const API_URL = "https://playground.4geeks.com/contact/agendas/jazbedoya";

const AddContact = () =>{
    const {dispatch} = useGlobalReducer();
    const navigate = useNavigate();
    
    const[form,setForm] = useState({
        fullname: "",
        email: "",
        address:"",
        phone:"",

    });


const handleChange = (e) =>{
    setForm({...form,[e.target.name]: e.target.value});
};

const handleSubmit = async(e)=>{
    e. preventDefault();

try{

    //CRear agenda si no existe
    await fetch(API_URL,{method : "POST"});

     //Crear contacto

   const resp =  await fetch(`${API_URL}/contacts`,{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(form),
    });
    
    if (!resp.ok) throw new Error("Error al crear contacto");
    const newContact = await resp.json();


    //3- Guardar el context
    dispatch({
        type: "SET_CONTACTS",
        payload: (prev) => [...prev, newContact],
    });

    alert ("Contacto agregado correctamente")
    

    // Redirigir a Contacts
    navigate("/contacts");



}catch(error) {
    console.error("ERROR en el handleSubmit:", error);
    alert("Hubo  un problema al agregar conatcto")

}
};

return (
    <div className="container mt-5">
        <h2>Agregar Contacto</h2>
        <form onSubmit={handleSubmit}>
            <input
            className="form-control mb-2"
            placeholder="Nombre"
            name = "full_name"
            onChange= {handleChange}
            />
        
            <input
            className="form-control mb-2"
            placeholder="Email"
            name = "email"
            onChange= {handleChange}
            />
     
            <input
            className="form-control mb-2"
            placeholder="Telefono"
            name = "phone"
            onChange= {handleChange}
            />
            <input
            className="form-control mb-2"
            placeholder="Direccion"
            name = "addres"
            onChange= {handleChange}
            />
            <button className="btn-btn-primary">Guardar</button>
        </form>
    </div>
   );
};

export default AddContact;
       