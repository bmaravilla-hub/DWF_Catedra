import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { FaPills, FaSave, FaList, FaTag, FaMoneyBillAlt, FaTruck } from 'react-icons/fa';
import BotonRetroceder from '../../components/BotonRetroceder';
import { proveedorService } from '../../services/api';
import { toast, ToastContainer } from 'react-toastify';
import './ProductoForm.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'http://localhost:8080';

const ProductoForm = () => {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams(); // Get id from URL parameters for edit mode
  const [producto, setProducto] = useState({
    nombre: '',
    costo: '',
    precio: '',
    descripcion: '',
    idProveedor: ''
  });

  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  // Load data for edit mode
  useEffect(() => {
    const fetchProveedores = async () => {
      setLoading(true);
      try {
        const data = await proveedorService.getAll();
        setProveedores(data);
        console.log('Proveedores cargados:', data);
      } catch (err) {
        console.error('Error al cargar los proveedores:', err);
        setError('Error al cargar los proveedores: ' + (err.message || 'Error desconocido'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchProveedores();
    
    // If we have an ID, fetch the product data for editing
    if (id) {
      console.log(`Intentando cargar producto con ID: ${id}`);
      const fetchProducto = async () => {
        setLoading(true);
        try {
          // Add logging to see what's happening
          console.log(`Realizando petición GET a: ${API_URL}/productos/${id}`);
          console.log(`Token: ${localStorage.getItem('token').substring(0, 20)}...`);
          
          const response = await axios.get(`${API_URL}/productos/${id}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          });
          
          console.log('Respuesta del servidor:', response);
          const productoData = response.data;
          console.log('Datos del producto recibidos:', productoData);
          
          // Format the data for the form
          setProducto({
            nombre: productoData.nombre || '',
            costo: productoData.costo || 0,
            precio: productoData.precio || 0,
            descripcion: productoData.descripcion || '',
            idProveedor: productoData.idProveedor || ''
          });
          
        } catch (err) {
          console.error('Error al cargar el producto:', err);
          const errorMsg = err.response?.data?.message || err.message || 'Error desconocido';
          setError('Error al cargar los datos del producto: ' + errorMsg);
          toast.error('Error al cargar los datos del producto: ' + errorMsg);
        } finally {
          setLoading(false);
        }
      };
      
      fetchProducto();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Para los campos numéricos, asegurar que sean números
    const processedValue = (name === 'costo' || name === 'precio') && value !== '' ? 
      parseFloat(value) : (name === 'idProveedor' && value !== '' ? 
      parseInt(value, 10) : value);
    
    setProducto({ ...producto, [name]: processedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    const isEditing = !!id;
    console.log(isEditing ? 'Actualizando producto:' : 'Enviando producto:', producto);
    
    try {
      if (isEditing) {
        // PUT request to update the product
        const response = await axios.put(`${API_URL}/productos/${id}`, producto, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        console.log('Respuesta del servidor (actualización):', response.data);
        toast.success('Producto actualizado exitosamente');
      } else {
        // POST request to create a new product
        const response = await axios.post(`${API_URL}/productos`, producto, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        console.log('Respuesta del servidor (creación):', response.data);
        toast.success('Producto registrado exitosamente');
      }
      
      setSuccess(true);
      
      // Redirigir a la lista de productos después de 2 segundos
      setTimeout(() => {
        navigate('/productos');
      }, 2000);
      
    } catch (err) {
      console.error(`Error al ${isEditing ? 'actualizar' : 'guardar'} el producto:`, err);
      const errorMessage = err.response?.data?.message || err.message || 'Error desconocido';
      setError(`Error al ${isEditing ? 'actualizar' : 'guardar'} el producto: ` + errorMessage);
      toast.error(`Error al ${isEditing ? 'actualizar' : 'guardar'} el producto: ` + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <BotonRetroceder />
      <h2 className="text-center">
        <FaPills className="me-2" />
        {id ? 'Editar Producto' : 'Registrar Nuevo Producto'}
      </h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Producto {id ? 'actualizado' : 'guardado'} exitosamente</Alert>}

      {loading ? (
        <div className="text-center py-3">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <p className="mt-2">{id ? 'Cargando datos del producto...' : 'Cargando...'}</p>
        </div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              <FaList className="me-2" /> Nombre
            </Form.Label>
            <Form.Control
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              required
              placeholder="Nombre del producto"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaTag className="me-2" /> Descripción
            </Form.Label>
            <Form.Control
              name="descripcion"
              as="textarea"
              rows={3}
              value={producto.descripcion}
              onChange={handleChange}
              required
              placeholder="Descripción detallada"
            />
          </Form.Group>

          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>
                <FaMoneyBillAlt className="me-2" /> Costo ($)
              </Form.Label>
              <Form.Control
                name="costo"
                type="number"
                step="0.01"
                min="0"
                value={producto.costo}
                onChange={handleChange}
                required
                placeholder="Costo de adquisición"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-md-6">
              <Form.Label>
                <FaMoneyBillAlt className="me-2" /> Precio de Venta ($)
              </Form.Label>
              <Form.Control
                name="precio"
                type="number"
                step="0.01"
                min="0"
                value={producto.precio}
                onChange={handleChange}
                required
                placeholder="Precio de venta"
              />
            </Form.Group>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaTruck className="me-2" /> Proveedor
            </Form.Label>
            <Form.Select
              name="idProveedor"
              value={producto.idProveedor}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un proveedor...</option>
              {proveedores.map((proveedor) => (
                <option key={proveedor.idProveedor} value={proveedor.idProveedor}>
                  {proveedor.nombreProveedor}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button 
            type="submit" 
            className="btn-pink w-100 mt-3" 
            disabled={loading}
          >
            <FaSave className="me-2" />
            {loading ? 'Guardando...' : (id ? 'Actualizar Producto' : 'Guardar Producto')}
          </Button>
        </Form>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProductoForm;
