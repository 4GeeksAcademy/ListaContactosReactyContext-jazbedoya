import React from "react";
import Contact from "./Contact";

const ContactCard = ({ contact, deleteContact }) => {
    return (
        <div className="card mb-3 p-3">
            <h5>{contact.full_name}</h5>    
            <p><strong>Email:</strong>{contact.email}</p>
            <p><strong>Telefono:</strong>{contact.phone}</p>
            <p><strong>Direccion:</strong>{contact.address}</p>

            <button className="btn btn-danger" 
            onClick={() => deleteContact(contact.id) }> 
                       Eliminar 
            </button>
        </div>
    );
};
         

     export default ContactCard;