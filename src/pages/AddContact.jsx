import React, { useState, useContext } from "react";
import { Context } from "../store";
import { useNavigate } from "react-router-dom";

export const AddContact = () => {
  const { addContact } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addContact(formData);
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <h2>Agregar nuevo contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Teléfono</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Dirección</label>
          <input
            type="text"
            name="address"
            className="form-control"
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
};
