import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import { FaUserPlus, FaUserShield } from 'react-icons/fa';
import './UsuarioList.css';
import BotonRetroceder from '../../components/BotonRetroceder';


const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    username: '',
    password: '',
    rol: 'EMPLEADO'
  });

  useEffect(() => {
    const demo = [
      { id: 1, nombre: 'Admin', username: 'admin', rol: 'ADMIN' },
      { id: 2, nombre: 'Empleado', username: 'emple', rol: 'EMPLEADO' }
    ];
    setUsuarios(demo);
  }, []);

  const handleChange = (e) => {
    setNuevoUsuario({ ...nuevoUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevo = { ...nuevoUsuario, id: usuarios.length + 1 };
    setUsuarios([...usuarios, nuevo]);
    setShowModal(false);
    setNuevoUsuario({ nombre: '', username: '', password: '', rol: 'EMPLEADO' });
  };

  return (
    <div className="usuario-container">
        <BotonRetroceder />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-danger"><FaUserShield className="me-2" />Gestión de Usuarios</h2>
        <Button className="btn-pink" onClick={() => setShowModal(true)}>
          <FaUserPlus className="me-2" /> Registrar Usuario
        </Button>
      </div>

      <Table bordered hover className="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Usuario</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.username}</td>
              <td>
                <span className={`badge ${u.rol === 'ADMIN' ? 'bg-danger' : 'bg-secondary'}`}>
                  {u.rol}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="nombre" value={nuevoUsuario.nombre} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control name="username" value={nuevoUsuario.username} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="password" value={nuevoUsuario.password} onChange={handleChange} required />
            </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="email" value={nuevoUsuario.email} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select name="rol" value={nuevoUsuario.rol} onChange={handleChange}>
                <option value="EMPLEADO">Empleado</option>
                <option value="ADMIN">Administrador</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" className="btn-pink w-100">Guardar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UsuarioList;
