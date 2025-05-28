import React, { useState } from 'react';
import './StockForm.css';
import { FaPlusCircle, FaTruck, FaCapsules, FaBarcode, FaCalendarAlt, FaUser } from 'react-icons/fa';

const StockEntradaForm = () => {
  const [entrada, setEntrada] = useState({
    producto: '',
    lote: '',
    cantidad: '',
    fecha: '',
    proveedor: ''
  });

  const handleChange = (e) => {
    setEntrada({ ...entrada, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Entrada registrada correctamente (demo).");
    setEntrada({ producto: '', lote: '', cantidad: '', fecha: '', proveedor: '' });
  };

  return (
    <div className="form-container">
      <h2><FaTruck className="me-2" /> Registrar Entrada de Stock</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label><FaCapsules className="me-2" /> Producto</label>
            <input type="text" className="form-control" name="producto" value={entrada.producto} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaBarcode className="me-2" /> Lote</label>
            <input type="text" className="form-control" name="lote" value={entrada.lote} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaCalendarAlt className="me-2" /> Fecha</label>
            <input type="date" className="form-control" name="fecha" value={entrada.fecha} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaUser className="me-2" /> Proveedor</label>
            <input type="text" className="form-control" name="proveedor" value={entrada.proveedor} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaPlusCircle className="me-2" /> Cantidad</label>
            <input type="number" className="form-control" name="cantidad" value={entrada.cantidad} onChange={handleChange} required />
          </div>
        </div>
        <button className="btn btn-pink w-100 mt-3" type="submit">
          <FaPlusCircle className="me-2" /> Guardar Entrada
        </button>
      </form>
    </div>
  );
};

export default StockEntradaForm;
