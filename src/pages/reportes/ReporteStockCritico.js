import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaExclamationTriangle } from 'react-icons/fa';
import BotonRetroceder from '../../components/BotonRetroceder';
import './Reportes.css';

const ReporteStockCritico = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const demo = [
      { nombre: "Ibuprofeno", lote: "L003", stock: 5, vencimiento: "2024-10-10" },
      { nombre: "Omeprazol", lote: "L014", stock: 9, vencimiento: "2024-12-01" }
    ];
    setProductos(demo);
  }, []);

  return (
    <div className="reporte-container">
      <BotonRetroceder />
      <div className="d-flex align-items-center gap-2 mb-3 text-danger">
        <FaExclamationTriangle size={24} />
        <h2 className="m-0">Stock Crítico (≤ 10)</h2>
      </div>
      <Table bordered hover responsive className="styled-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Lote</th>
            <th>Stock</th>
            <th>Fecha Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p, i) => (
            <tr key={i} className="text-danger fw-bold">
              <td>{p.nombre}</td>
              <td>{p.lote}</td>
              <td>{p.stock}</td>
              <td>{p.vencimiento}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ReporteStockCritico;
