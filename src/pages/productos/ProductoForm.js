import React, { useState } from 'react';
import './ProductoForm.css';
import { FaPills, FaPlus, FaBarcode, FaCalendarAlt, FaBoxes, FaDollarSign, FaFileAlt } from 'react-icons/fa';

const ProductoForm = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    lote: '',
    fechaVencimiento: '',
    stock: '',
    precio: ''
  });

  const handleChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Producto registrado correctamente (simulación).");
    setProducto({
      nombre: '',
      descripcion: '',
      lote: '',
      fechaVencimiento: '',
      stock: '',
      precio: ''
    });
  };

  return (
    <div className="form-container">
      <h2><FaPills className="me-2" />Registrar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label><FaPills className="me-2" /> Nombre</label>
            <input type="text" className="form-control" name="nombre" value={producto.nombre} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaFileAlt className="me-2" /> Descripción</label>
            <input type="text" className="form-control" name="descripcion" value={producto.descripcion} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaBarcode className="me-2" /> Lote</label>
            <input type="text" className="form-control" name="lote" value={producto.lote} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaCalendarAlt className="me-2" /> Fecha de Vencimiento</label>
            <input type="date" className="form-control" name="fechaVencimiento" value={producto.fechaVencimiento} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaBoxes className="me-2" /> Stock</label>
            <input type="number" className="form-control" name="stock" value={producto.stock} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaDollarSign className="me-2" /> Precio ($)</label>
            <input type="number" step="0.01" className="form-control" name="precio" value={producto.precio} onChange={handleChange} required />
          </div>
        </div>
        <button type="submit" className="btn btn-pink w-100 mt-3">
          <FaPlus className="me-2" /> Registrar Producto
        </button>
      </form>
    </div>
  );
};

export default ProductoForm;
