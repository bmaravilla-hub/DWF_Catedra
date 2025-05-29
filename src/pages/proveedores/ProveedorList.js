import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaTruck, FaPlusCircle, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import BotonRetroceder from '../../components/BotonRetroceder';
import './ProveedorList.css';

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showDetalle, setShowDetalle] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [proveedorActivo, setProveedorActivo] = useState(null);

  const [nuevoProveedor, setNuevoProveedor] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    correo: '',
    contacto: ''
  });

  useEffect(() => {
    setProveedores([
      {
        id: 1,
        nombre: "Laboratorio Santa Fe",
        telefono: "2222-3333",
        direccion: "San Salvador",
        correo: "santafe@lab.com",
        contacto: "Sr. Luis"
      }
    ]);
  }, []);

  const handleChange = (e) => {
    setNuevoProveedor({ ...nuevoProveedor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modoEditar) {
      const actualizados = proveedores.map((p) =>
        p.id === proveedorActivo.id ? { ...nuevoProveedor, id: p.id } : p
      );
      setProveedores(actualizados);
    } else {
      const nuevo = { ...nuevoProveedor, id: proveedores.length + 1 };
      setProveedores([...proveedores, nuevo]);
    }

    setNuevoProveedor({
      nombre: '', telefono: '', direccion: '', correo: '', contacto: ''
    });
    setModoEditar(false);
    setShowForm(false);
  };

  const handleEditar = (prov) => {
    setModoEditar(true);
    setNuevoProveedor(prov);
    setProveedorActivo(prov);
    setShowForm(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Deseas eliminar este proveedor?")) {
      setProveedores(proveedores.filter((p) => p.id !== id));
    }
  };

  const handleVerDetalle = (prov) => {
    setProveedorActivo(prov);
    setShowDetalle(true);
  };

  return (
    <div className="proveedor-container">
      <BotonRetroceder />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-danger"><FaTruck className="me-2" /> Lista de Proveedores</h2>
        <Button className="btn-pink" onClick={() => { setShowForm(true); setModoEditar(false); }}>
          <FaPlusCircle className="me-2" /> Añadir Proveedor
        </Button>
      </div>

      <Table bordered hover className="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Correo</th>
            <th>Contacto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((p) => (
            <tr key={p.id}>
              <td>{p.nombre}</td>
              <td>{p.telefono}</td>
              <td>{p.direccion}</td>
              <td>{p.correo}</td>
              <td>{p.contacto}</td>
              <td>
                <Button size="sm" variant="outline-info" className="me-2" onClick={() => handleVerDetalle(p)}>
                  <FaEye />
                </Button>
                <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEditar(p)}>
                  <FaEdit />
                </Button>
                <Button size="sm" variant="outline-danger" onClick={() => handleEliminar(p.id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Formulario */}
      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEditar ? 'Editar Proveedor' : 'Registrar Proveedor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={nuevoProveedor.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control name="telefono" value={nuevoProveedor.telefono} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control name="direccion" value={nuevoProveedor.direccion} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="correo" value={nuevoProveedor.correo} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Persona de contacto</Form.Label>
              <Form.Control name="contacto" value={nuevoProveedor.contacto} onChange={handleChange} required />
            </Form.Group>
            <Button type="submit" className="btn-pink w-100">{modoEditar ? 'Guardar Cambios' : 'Guardar Proveedor'}</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal Detalle */}
      <Modal show={showDetalle} onHide={() => setShowDetalle(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle del Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {proveedorActivo && (
            <div>
              <p><strong>Nombre:</strong> {proveedorActivo.nombre}</p>
              <p><strong>Teléfono:</strong> {proveedorActivo.telefono}</p>
              <p><strong>Dirección:</strong> {proveedorActivo.direccion}</p>
              <p><strong>Correo:</strong> {proveedorActivo.correo}</p>
              <p><strong>Contacto:</strong> {proveedorActivo.contacto}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProveedorList;
