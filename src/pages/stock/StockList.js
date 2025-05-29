import React, { useEffect, useState } from 'react';
import { Table, Form } from 'react-bootstrap';
import { FaExchangeAlt} from 'react-icons/fa';
import MovimientoForm from './MovimientoForm';
import './StockList.css';
import BotonRetroceder from '../../components/BotonRetroceder';


const StockList = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('Todos');
  const [showMovimiento, setShowMovimiento] = useState(false);

  useEffect(() => {
    // Demo de movimientos iniciales
    setMovimientos([
      { id: 1, tipo: 'Entrada', producto: 'Paracetamol', lote: 'A123', cantidad: 50, fecha: '2025-04-01' },
      { id: 2, tipo: 'Salida', producto: 'Paracetamol', lote: 'A123', cantidad: 10, fecha: '2025-04-05', motivo: 'Venta' },
      { id: 3, tipo: 'Entrada', producto: 'Ibuprofeno', lote: 'B456', cantidad: 30, fecha: '2025-04-02' }
    ]);

    // Demo de productos
    setProductos([
      { id: 1, nombre: 'Paracetamol' },
      { id: 2, nombre: 'Ibuprofeno' }
    ]);
  }, []);

  const movimientosFiltrados = movimientos.filter(mov =>
    filtro === 'Todos' ? true : mov.tipo === filtro
  );

  return (
    <div className="table-container">
      <BotonRetroceder />

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2 text-danger">
          <FaExchangeAlt size={22} />
          <h2 className="m-0">Movimientos de Stock</h2>
        </div>


      </div>

      <div className="mb-3">
        <Form.Select
          style={{ maxWidth: '250px' }}
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        >
          <option value="Todos">Todos los movimientos</option>
          <option value="Entrada">Solo Entradas</option>
          <option value="Salida">Solo Salidas</option>
        </Form.Select>
      </div>

      <Table bordered hover responsive className="styled-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Producto</th>
            <th>Lote</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Motivo</th>
          </tr>
        </thead>
        <tbody>
          {movimientosFiltrados.map((mov, idx) => (
            <tr key={idx}>
              <td className={mov.tipo === 'Salida' ? 'text-danger fw-bold' : 'text-success fw-bold'}>
                {mov.tipo}
              </td>
              <td>{mov.producto}</td>
              <td>{mov.lote}</td>
              <td>{mov.cantidad}</td>
              <td>{mov.fecha}</td>
              <td>{mov.tipo === 'Salida' ? mov.motivo : '-'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <MovimientoForm
        show={showMovimiento}
        onHide={() => setShowMovimiento(false)}
        productos={productos}
      />
    </div>
  );
};

export default StockList;
