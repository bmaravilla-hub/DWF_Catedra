import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FaUser, FaPlusCircle, FaEdit, FaTrashAlt } from 'react-icons/fa';
import BotonRetroceder from '../../components/BotonRetroceder';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import './UsuarioList.css';

const API_URL = 'http://localhost:8080';

const UsuarioList = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [roles, setRoles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  // Estado para el formulario de usuario
  const [usuario, setUsuario] = useState({
    nombre: '',
    correo: '',
    contrasena: '',
    rol: ''
  });

  // Cargar usuarios y roles al montar el componente
  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      // Asumiendo que tienes un endpoint para obtener usuarios
      const response = await axios.get(`${API_URL}/usuarios`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsuarios(response.data);
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
      toast.error('No se pudieron cargar los usuarios');
      setError('Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${API_URL}/roles`);
      setRoles(response.data);
    } catch (err) {
      console.error('Error al cargar roles:', err);
      // Usar roles predeterminados en caso de error
      setRoles([
        { idRol: 1, nombreRol: 'Administrador' },
        { idRol: 2, nombreRol: 'Empleado' }
      ]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isEditing) {
        // Si estamos editando, hacer PUT request
        await axios.put(`${API_URL}/usuarios/${usuario.idUsuario}`, usuario, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Usuario actualizado exitosamente');
      } else {
        // Si es nuevo usuario, hacer POST request
        await axios.post(`${API_URL}/auth/registro`, usuario, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Usuario creado exitosamente');
      }
      
      setShowModal(false);
      clearForm();
      fetchUsuarios(); // Actualizar la lista
    } catch (err) {
      console.error('Error al procesar usuario:', err);
      const errorMsg = err.response?.data?.message || 'Error al procesar el usuario';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setUsuario({
      nombre: '',
      correo: '',
      contrasena: '',
      rol: ''
    });
    setError(null);
    setIsEditing(false);
  };

  // Función para abrir modal para añadir
  const handleOpenModal = () => {
    clearForm();
    setShowModal(true);
  };

  // Función para editar usuario
  const handleEdit = (u) => {
    setUsuario({
      idUsuario: u.idUsuario,
      nombre: u.nombre,
      correo: u.correo,
      contrasena: '', // No incluir contraseña al editar por seguridad
      rol: u.rol?.nombreRol || ''
    });
    setIsEditing(true);
    setShowModal(true);
  };

  // Función para eliminar usuario
  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer.')) {
      try {
        await axios.delete(`${API_URL}/usuarios/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Usuario eliminado correctamente');
        fetchUsuarios(); // Actualizar la lista tras eliminar
      } catch (err) {
        console.error('Error al eliminar usuario:', err);
        toast.error('No se pudo eliminar el usuario');
      }
    }
  };

  return (
    <div className="usuario-container">
      <BotonRetroceder />
      
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0"><FaUser className="me-2" /> Gestión de Usuarios</h2>
        <Button className="btn-pink d-flex align-items-center gap-2" onClick={handleOpenModal}>
          <FaPlusCircle /> Añadir Usuario
        </Button>
      </div>

      {loading && <div className="text-center py-3">Cargando...</div>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover responsive className="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((u) => (
              <tr key={u.idUsuario}>
                <td>{u.nombre}</td>
                <td>{u.correo}</td>
                <td>{u.rol?.nombreRol}</td>
                <td>
                  <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEdit(u)}>
                    <FaEdit />
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(u.idUsuario)}>
                    <FaTrashAlt />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No hay usuarios registrados.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal para añadir/editar usuario */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Editar Usuario' : 'Añadir Nuevo Usuario'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={usuario.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={usuario.correo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasena"
                value={usuario.contrasena}
                onChange={handleChange}
                required={!isEditing}
                placeholder={isEditing ? "Dejar en blanco para mantener la actual" : ""}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Rol</Form.Label>
              <Form.Select
                name="rol"
                value={usuario.rol}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione un rol</option>
                {roles.map((rol) => (
                  <option key={rol.idRol} value={rol.nombreRol}>
                    {rol.nombreRol}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Button 
              type="submit" 
              className="w-100 btn-pink"
              disabled={loading}
            >
              {loading ? 'Guardando...' : (isEditing ? 'Actualizar Usuario' : 'Guardar Usuario')}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default UsuarioList;
