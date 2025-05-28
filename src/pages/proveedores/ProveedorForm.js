import React, { useState } from 'react';
import './ProveedorForm.css';
import { FaPlus, FaUser, FaPhone, FaTruck } from 'react-icons/fa';

const ProveedorForm = () => {
  const [proveedor, setProveedor] = useState({
    nombre: '',
    contacto: '',
    telefono: '',
    frecuencia: ''
  });

  const handleChange = (e) => {
    setProveedor({ ...proveedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Proveedor registrado exitosamente (demo).");
    setProveedor({ nombre: '', contacto: '', telefono: '', frecuencia: '' });
  };

  return (
    <div className="form-container">
      <h2><FaTruck className="me-2" />Registrar Proveedor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label><FaUser className="me-1" /> Nombre</label>
          <input type="text" className="form-control" name="nombre" value={proveedor.nombre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label><FaUser className="me-1" /> Contacto</label>
          <input type="text" className="form-control" name="contacto" value={proveedor.contacto} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label><FaPhone className="me-1" /> Teléfono</label>
          <input type="text" className="form-control" name="telefono" value={proveedor.telefono} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Frecuencia Entrega</label>
          <select className="form-select" name="frecuencia" value={proveedor.frecuencia} onChange={handleChange} required>
            <option value="">Seleccione...</option>
            <option value="Semanal">Semanal</option>
            <option value="Quincenal">Quincenal</option>
            <option value="Mensual">Mensual</option>
          </select>
        </div>
        <button className="btn btn-pink w-100" type="submit">
          <FaPlus className="me-2" /> Guardar Proveedor
        </button>
      </form>
    </div>
  );
};

export default ProveedorForm;
