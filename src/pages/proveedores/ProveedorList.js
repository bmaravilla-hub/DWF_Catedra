import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { FaTruck, FaPlusCircle, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import BotonRetroceder from '../../components/BotonRetroceder';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { proveedorService } from '../../services/api';
import './ProveedorList.css';

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [showDetalle, setShowDetalle] = useState(false);
  const [proveedorActivo, setProveedorActivo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    setLoading(true);
    try {
      const data = await proveedorService.getAll();
      setProveedores(data);
    } catch (err) {
      console.error('Error al cargar los proveedores:', err);
      setError('Error al cargar los proveedores: ' + (err.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar este proveedor?")) {
      try {
        await proveedorService.delete(id);
        toast.success('Proveedor eliminado con éxito');
        fetchProveedores(); // Actualizar la lista después de eliminar
      } catch (err) {
        console.error('Error al eliminar el proveedor:', err);
        toast.error('Error al eliminar el proveedor');
      }
    }
  };

  const handleVerDetalle = (prov) => {
    setProveedorActivo(prov);
    setShowDetalle(true);
  };

  // Función para truncar el texto si es demasiado largo
  const truncateText = (text, maxLength = 20) => {
    return text && text.length > maxLength 
      ? text.substring(0, maxLength) + '...' 
      : text || '';
  };

  return (
    <div className="proveedor-container">
      <BotonRetroceder />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="text-danger"><FaTruck className="me-2" /> Lista de Proveedores</h2>
        <Button className="btn-pink" onClick={() => navigate('/proveedores/nuevo')}>
          <FaPlusCircle className="me-2" /> Añadir Proveedor
        </Button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      
      {loading ? (
        <div className="text-center py-3">Cargando...</div>
      ) : (
        <div className="table-responsive">
          <Table bordered hover className="styled-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Contacto</th>
                <th>Frecuencia</th>
                <th>Tipo Pago</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proveedores.length > 0 ? (
                proveedores.map((p) => (
                  <tr key={p.idProveedor || p.id}>
                    <td data-content={p.nombreProveedor}>{truncateText(p.nombreProveedor, 15)}</td>
                    <td data-content={p.telefono}>{p.telefono}</td>
                    <td data-content={p.direccion}>{truncateText(p.direccion, 15)}</td>
                    <td data-content={p.correo}>{truncateText(p.correo, 15)}</td>
                    <td data-content={p.contacto}>{truncateText(p.contacto, 10)}</td>
                    <td data-content={p.frecuenciaEntrega}>{p.frecuenciaEntrega}</td>
                    <td data-content={p.tipoPago}>{p.tipoPago}</td>
                    <td className="action-cell">
                      <div className="action-buttons">
                        <Button size="sm" variant="outline-info" onClick={() => handleVerDetalle(p)}>
                          <FaEye />
                        </Button>
                        <Button size="sm" variant="outline-primary" onClick={() => navigate(`/proveedores/editar/${p.idProveedor || p.id}`)}>
                          <FaEdit />
                        </Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleEliminar(p.idProveedor || p.id)}>
                          <FaTrash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No hay proveedores registrados.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}

      <Modal show={showDetalle} onHide={() => setShowDetalle(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle del Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {proveedorActivo && (
            <div>
              <p><strong>Nombre:</strong> {proveedorActivo.nombreProveedor}</p>
              <p><strong>Teléfono:</strong> {proveedorActivo.telefono}</p>
              <p><strong>Dirección:</strong> {proveedorActivo.direccion}</p>
              <p><strong>Correo:</strong> {proveedorActivo.correo}</p>
              <p><strong>Contacto:</strong> {proveedorActivo.contacto}</p>
              <p><strong>Frecuencia de Entrega:</strong> {proveedorActivo.frecuenciaEntrega}</p>
              <p><strong>Tipo de Pago:</strong> {proveedorActivo.tipoPago}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default ProveedorList;
