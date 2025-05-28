import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FaExchangeAlt } from 'react-icons/fa';
import './StockList.css';

const StockList = () => {
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    const demo = [
      { id: 1, tipo: 'Entrada', producto: 'Paracetamol', lote: 'A123', cantidad: 50, fecha: '2025-04-01' },
      { id: 2, tipo: 'Salida', producto: 'Paracetamol', lote: 'A123', cantidad: 10, fecha: '2025-04-05' },
      { id: 3, tipo: 'Entrada', producto: 'Ibuprofeno', lote: 'B456', cantidad: 30, fecha: '2025-04-02' }
    ];
    setMovimientos(demo);
  }, []);

  return (
    <div className="table-container">
      <div className="d-flex align-items-center gap-2 mb-3 text-danger">
        <FaExchangeAlt size={24} />
        <h2 className="m-0">Movimientos de Stock</h2>
      </div>
      <Table bordered hover responsive className="styled-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Producto</th>
            <th>Lote</th>
            <th>Cantidad</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((mov, index) => (
            <tr key={index}>
              <td className={mov.tipo === 'Salida' ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                {mov.tipo}
              </td>
              <td>{mov.producto}</td>
              <td>{mov.lote}</td>
              <td>{mov.cantidad}</td>
              <td>{mov.fecha}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StockList;
