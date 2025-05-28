import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaCapsules } from 'react-icons/fa';
import './ProductoList.css';

const ProductoList = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const demo = [
      { id: 1, nombre: "Paracetamol", descripcion: "500mg", lote: "A123", fechaVencimiento: "2025-12-31", stock: 20, precio: 1.50 },
      { id: 2, nombre: "Ibuprofeno", descripcion: "200mg", lote: "B456", fechaVencimiento: "2024-10-15", stock: 8, precio: 2.00 }
    ];
    setProductos(demo);
  }, []);

  return (
    <div className="table-container">
      <div className="d-flex align-items-center gap-2 mb-3 text-danger">
        <FaCapsules size={25} />
        <h2 className="m-0">Listado de Productos</h2>
      </div>
      <Table bordered hover responsive className="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Lote</th>
            <th>Vencimiento</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id} className={prod.stock <= 10 ? "stock-bajo" : ""}>
              <td>{prod.nombre}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.lote}</td>
              <td>{prod.fechaVencimiento}</td>
              <td>{prod.stock}</td>
              <td>${prod.precio.toFixed(2)}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-2"><FaEdit /></Button>
                <Button variant="outline-danger" size="sm"><FaTrashAlt /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductoList;
