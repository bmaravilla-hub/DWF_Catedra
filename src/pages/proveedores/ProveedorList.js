import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaTruck } from 'react-icons/fa';
import './ProveedorList.css';

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);

  useEffect(() => {
    const demo = [
      { id: 1, nombre: "Laboratorio Santa Fe", contacto: "Ana López", telefono: "7890-1234", frecuencia: "Semanal" },
      { id: 2, nombre: "Medicinas del Norte", contacto: "Carlos Pérez", telefono: "7654-3210", frecuencia: "Mensual" }
    ];
    setProveedores(demo);
  }, []);

  return (
    <div className="table-container">
      <div className="d-flex align-items-center gap-2 mb-3 text-danger">
        <FaTruck size={24} />
        <h2 className="m-0">Listado de Proveedores</h2>
      </div>
      <Table bordered hover responsive className="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Contacto</th>
            <th>Teléfono</th>
            <th>Frecuencia</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.id}>
              <td>{prov.nombre}</td>
              <td>{prov.contacto}</td>
              <td>{prov.telefono}</td>
              <td>{prov.frecuencia}</td>
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

export default ProveedorList;
