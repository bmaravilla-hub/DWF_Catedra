import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaEye, FaPlusCircle, FaExchangeAlt } from 'react-icons/fa';
import BotonRetroceder from '../../components/BotonRetroceder';
import './ProductoList.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import MovimientoForm from '../stock/MovimientoForm';

const API_URL = 'http://localhost:8080';

const ProductoList = () => {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMovimientoModal, setShowMovimientoModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/productos`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProductos(response.data);
    } catch (err) {
      console.error('Error al cargar los productos:', err);
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  };

  const handleVerDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const handleEditar = (prod) => {
    // Redireccionar a la página de edición
    navigate(`/productos/editar/${prod.idProducto || prod.id}`);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      try {
        await axios.delete(`${API_URL}/productos/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        toast.success('Producto eliminado con éxito');
        fetchProductos(); // Actualizar la lista después de eliminar
      } catch (err) {
        console.error('Error al eliminar el producto:', err);
        toast.error('Error al eliminar el producto');
      }
    }
  };

  // Add this function to handle successful movement registration
  const handleMovimientoSuccess = () => {
    // Refresh the products list to get updated stock values
    fetchProductos();
  };

  return (
    <div className="table-container">
      <BotonRetroceder />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Listado de Productos</h2>
        <div className="d-flex gap-2">
          <Button 
            className="btn-pink d-flex align-items-center gap-2" 
            onClick={() => navigate('/productos/nuevo')}
          >
            <FaPlusCircle /> Añadir Producto
          </Button>
          <Button 
            className="btn-secondary d-flex align-items-center gap-2" 
            onClick={() => setShowMovimientoModal(true)}
          >
            <FaExchangeAlt /> Registrar Movimiento
          </Button>
        </div>
      </div>

      {loading && <div className="text-center py-3">Cargando productos...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <Table striped bordered hover responsive className="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length > 0 ? (
            productos.map((prod) => (
              <tr key={prod.idProducto || prod.id} className={prod.stock <= 10 ? "stock-bajo" : ""}>
                <td>{prod.nombre}</td>
                <td>{prod.descripcion}</td>
                <td>{prod.stock || 0}</td>
                <td>${parseFloat(prod.precio).toFixed(2)}</td>
                <td>
                  <div className="action-buttons">
                    <Button variant="outline-info" size="sm" onClick={() => handleVerDetalle(prod)}>
                      <FaEye />
                    </Button>
                    <Button variant="outline-primary" size="sm" onClick={() => handleEditar(prod)}>
                      <FaEdit />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(prod.idProducto || prod.id)}>
                      <FaTrashAlt />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No hay productos registrados.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal para registrar movimientos */}
      <MovimientoForm 
        show={showMovimientoModal} 
        onHide={() => setShowMovimientoModal(false)} 
        productos={productos}
        onSuccess={handleMovimientoSuccess}
      />
      
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoSeleccionado && (
            <div className="text-center">
              {productoSeleccionado.imagen && (
                <img
                  src={productoSeleccionado.imagen}
                  alt="Producto"
                  className="img-fluid mb-3 rounded"
                  style={{ maxHeight: '180px' }}
                />
              )}
              <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
              <p><strong>Descripción:</strong> {productoSeleccionado.descripcion}</p>
              <p><strong>Precio:</strong> ${parseFloat(productoSeleccionado.precio).toFixed(2)}</p>
              <p><strong>Stock:</strong> {productoSeleccionado.stock || 0}</p>
              <p><strong>Proveedor:</strong> {productoSeleccionado.proveedor?.nombreProveedor || 'No asignado'}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
      
      <ToastContainer />
    </div>
  );
};

export default ProductoList;
