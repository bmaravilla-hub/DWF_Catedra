import React, { useState } from 'react';
import './StockForm.css';
import { FaMinusCircle, FaCapsules, FaBarcode, FaCalendarAlt, FaFileAlt } from 'react-icons/fa';

const StockSalidaForm = () => {
  const [salida, setSalida] = useState({
    producto: '',
    lote: '',
    cantidad: '',
    fecha: '',
    motivo: ''
  });

  const handleChange = (e) => {
    setSalida({ ...salida, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Salida registrada correctamente (demo).");
    setSalida({ producto: '', lote: '', cantidad: '', fecha: '', motivo: '' });
  };

  return (
    <div className="form-container">
      <h2><FaMinusCircle className="me-2" /> Registrar Salida de Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label><FaCapsules className="me-2" /> Producto</label>
            <input type="text" className="form-control" name="producto" value={salida.producto} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaBarcode className="me-2" /> Lote</label>
            <input type="text" className="form-control" name="lote" value={salida.lote} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaCalendarAlt className="me-2" /> Fecha</label>
            <input type="date" className="form-control" name="fecha" value={salida.fecha} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaFileAlt className="me-2" /> Motivo</label>
            <input type="text" className="form-control" name="motivo" value={salida.motivo} onChange={handleChange} required />
          </div>
          <div className="mb-3 col-md-6">
            <label><FaMinusCircle className="me-2" /> Cantidad</label>
            <input type="number" className="form-control" name="cantidad" value={salida.cantidad} onChange={handleChange} required />
          </div>
        </div>
        <button className="btn btn-pink w-100 mt-3" type="submit">
          <FaMinusCircle className="me-2" /> Registrar Salida
        </button>
      </form>
    </div>
  );
};

export default StockSalidaForm;
