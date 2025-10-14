import React, {useState} from "react";

const API_URL = "https://playground.4geeks.com/contact/agendas/jazbedoya";

const AddContact = () =>{
    const[form,setForm] = useState({
        fullname: "",
        email: "",
        address:"",
        phone:"",

    });


const handleChange = (e) =>{
    setForm({...form,[e.target.name]: e.target.value});
};



const handleSubmit = async (e) =>{
    e.preventDefault();
    await fetch(`${API_URL}/contacts`,{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(form),
    });
    alert ("Contacto agregado!")
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
            <button className="btn-btn-primary">Guardar</button>
        </form>
    </div>
   );
};

export default AddContact;
       