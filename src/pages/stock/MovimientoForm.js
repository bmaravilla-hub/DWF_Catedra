import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaExchangeAlt, FaBox, FaCalendarAlt, FaLayerGroup } from 'react-icons/fa';
import './MovimientoForm.css';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:8080';

const MovimientoForm = ({ show, onHide, productos, onSuccess }) => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tokenValid, setTokenValid] = useState(true);
  
  const fechaActual = new Date().toISOString().split('T')[0];
  
  const [movimiento, setMovimiento] = useState({
    idProducto: '',
    cantidad: '',
    tipoMovimiento: 'Entrada',
    lote: '',
    fechaVencimiento: '',
  });

  // Verify token is valid when modal opens
  useEffect(() => {
    if (show) {
      const token = localStorage.getItem('token');
      // Verificar que el token existe y que el usuario tiene un ID
      const userObj = JSON.parse(localStorage.getItem('usuario') || '{}');
      
      if (!token || !userObj.idUsuario) {
        setTokenValid(false);
        setError('La sesión ha expirado. Por favor, vuelva a iniciar sesión.');
      } else {
        setTokenValid(true);
        setError(null);
      }
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovimiento({ ...movimiento, [name]: value });
  };

  const handleRelogin = () => {
    logout();
    toast.info('Por favor, inicie sesión nuevamente');
    navigate('/');
    onHide();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (!tokenValid) {
      setError('La sesión ha expirado. Por favor, vuelva a iniciar sesión.');
      toast.error('Error de autenticación: Vuelva a iniciar sesión');
      setLoading(false);
      return;
    }
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No se encontró el token de autenticación.');
      toast.error('Error de autenticación: Token no encontrado');
      setLoading(false);
      return;
    }
    
    try {
      // Usar directamente el ID del usuario del contexto
      const movimientoData = {
        idProducto: Number(movimiento.idProducto),
        idUsuario: Number(usuario.idUsuario),
        cantidad: Number(movimiento.cantidad),
        tipoMovimiento: movimiento.tipoMovimiento,
        fechaVencimiento: movimiento.fechaVencimiento || null,
        lote: movimiento.lote
      };
      
      console.log('Enviando movimiento con usuario ID:', usuario.idUsuario);
      console.log('Datos completos:', movimientoData);
      
      const response = await axios.post(`${API_URL}/movimientos`, movimientoData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Respuesta del servidor:', response.data);
      toast.success(`Movimiento de ${movimiento.tipoMovimiento.toLowerCase()} registrado correctamente`);
      
      // Reset the form and close the modal
      setMovimiento({
        idProducto: '',
        cantidad: '',
        tipoMovimiento: 'Entrada',
        lote: '',
        fechaVencimiento: '',
      });
      
      // Call onSuccess if provided to refresh product list
      if (onSuccess) {
        onSuccess();
      }
      
      onHide();
      
    } catch (err) {
      console.error('Error al registrar el movimiento:', err);
      
      if (err.response) {
        console.log('Respuesta de error:', err.response.status, err.response.data);
        
        if (err.response.status === 403) {
          setError('No tiene permisos para realizar esta acción. Contacte al administrador.');
          toast.error('Acceso denegado: No tiene permisos para registrar movimientos');
        } else if (err.response.status === 401) {
          setTokenValid(false);
          setError('Su sesión ha expirado. Por favor, vuelva a iniciar sesión.');
          toast.error('Sesión expirada. Inicie sesión nuevamente.');
        } else {
          const errorMsg = err.response.data?.message || err.message || 'Error desconocido';
          setError(`Error al registrar el movimiento: ${errorMsg}`);
          toast.error(`Error al registrar el movimiento: ${errorMsg}`);
        }
      } else {
        setError(`Error al registrar el movimiento: ${err.message || 'Error desconocido'}`);
        toast.error(`Error al registrar el movimiento: ${err.message || 'Error desconocido'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <FaExchangeAlt className="me-2" /> 
          Registrar Movimiento de Producto
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger">
            {error}
            {!tokenValid && (
              <div className="mt-2">
                <Button variant="outline-primary" size="sm" onClick={handleRelogin}>
                  Iniciar sesión nuevamente
                </Button>
              </div>
            )}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Movimiento</Form.Label>
            <Form.Select 
              name="tipoMovimiento" 
              value={movimiento.tipoMovimiento} 
              onChange={handleChange}
              required
            >
              <option value="Entrada">Entrada</option>
              <option value="Salida">Salida</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Producto</Form.Label>
            <Form.Select 
              name="idProducto" 
              value={movimiento.idProducto} 
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un producto</option>
              {productos.map((prod) => (
                <option key={prod.idProducto || prod.id} value={prod.idProducto || prod.id}>
                  {prod.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          
          <div className="row">
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>
                <FaBox className="me-2" /> Cantidad
              </Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                min="1"
                value={movimiento.cantidad}
                onChange={handleChange}
                required
                placeholder="Cantidad"
              />
            </Form.Group>
            
            <Form.Group className="mb-3 col-md-6">
              <Form.Label>
                <FaLayerGroup className="me-2" /> Lote
              </Form.Label>
              <Form.Control
                type="text"
                name="lote"
                value={movimiento.lote}
                onChange={handleChange}
                required
                placeholder="Número de lote"
              />
            </Form.Group>
          </div>
          
          <Form.Group className="mb-3">
            <Form.Label>
              <FaCalendarAlt className="me-2" /> Fecha de Vencimiento
            </Form.Label>
            <Form.Control
              type="date"
              name="fechaVencimiento"
              value={movimiento.fechaVencimiento}
              onChange={handleChange}
              min={fechaActual}
              placeholder="Fecha de vencimiento"
            />
            <Form.Text className="text-muted">
              Opcional. Fecha de vencimiento del producto.
            </Form.Text>
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Text className="text-muted">
              {usuario ? (
                <>
                  Usuario: {usuario.nombre} (ID: {usuario.idUsuario})
                  <br />
                  Fecha y hora: {new Date().toLocaleString()}
                </>
              ) : (
                'Usuario no disponible. Intente cerrar sesión y volver a iniciar sesión.'
              )}
            </Form.Text>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="btn-pink"
              disabled={loading || !tokenValid || !usuario?.idUsuario}
            >
              {loading ? 'Guardando...' : 'Registrar Movimiento'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MovimientoForm;
