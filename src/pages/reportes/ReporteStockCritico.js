import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import './Reportes.css';

const ReporteStockCritico = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const demo = [
      { nombre: "Ibuprofeno", lote: "B456", cantidad: 8 },
      { nombre: "Amoxicilina", lote: "C789", cantidad: 5 }
    ];
    setProductos(demo);
  }, []);

  return (
    <div className="reporte-container">
      <div className="d-flex align-items-center gap-2 mb-3 text-danger">
        <FaExclamationTriangle size={24} />
        <h2 className="m-0">Reporte de Stock Crítico</h2>
      </div>
      <div className="alert alert-warning text-center fw-bold">
        Mostrando productos con ≤ 10 unidades en stock.
      </div>
      <Table bordered hover responsive className="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Lote</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod, idx) => (
            <tr key={idx} className="text-danger fw-bold">
              <td>{prod.nombre}</td>
              <td>{prod.lote}</td>
              <td>{prod.cantidad}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReporteStockCritico;
