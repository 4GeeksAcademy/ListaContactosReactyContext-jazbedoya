import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../store.jsx";

const AddContact = () => {
  const { store, addContact, updateContact } = useGlobalContext();
  const navigate = useNavigate();
  const { id } = useParams();

  //Estado local del formulario
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    address: "",
    phone: "",
  });

  // Si hay un ID, cargar datos del contacto para editar
  useEffect(() => {
    if (id && store.contacts.length > 0) {
      const contactToEdit = store.contacts.find((c) => c.id === parseInt(id));
      if (contactToEdit) setFormData(contactToEdit);
    }
  }, [id, store.contacts]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Guardar contacto
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.phone || !formData.address) {
      alert("Por favor completa todos los campos");
      return;
    }

    try {
      if (id) {
        // Actualizar contacto existente
        await updateContact(id, formData);
        alert("Contacto actualizado correctamente ");
      } else {
        // Crear nuevo contacto
        await addContact(formData);
        alert("Contacto agregado correctamente ");
      }
      navigate("/"); // Volver a la lista
    } catch (err) {
      console.error("Error al guardar contacto:", err);
      alert(" Hubo un error al guardar el contacto");
    }
  };

  return (
    <div className="container text-center mt-5">
      <h2 className="mb-4">{id ? "Editar contacto" : "Add a new contact"}</h2>

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-2 mx-auto" style={{ maxWidth: "400px" }}>
        <input
          type="text"
          name="full_name"
          placeholder="Nombre completo"
          className="form-control"
          value={formData.full_name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          className="form-control"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          className="form-control"
          value={formData.phone}
          onChange={handleChange}
        />
        <button className="btn btn-primary mt-3" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddContact;
