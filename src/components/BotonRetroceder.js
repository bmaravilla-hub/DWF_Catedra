import React from 'react';
import { Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './BotonRetroceder.css';

const BotonRetroceder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuario } = useAuth();
  
  const handleBack = () => {
    // Si estamos en una ruta de edición o creación, ir directamente a la lista
    if (location.pathname.includes('/proveedores/editar/') || 
        location.pathname.includes('/proveedores/nuevo')) {
      navigate('/proveedores');
    } else if (location.pathname.includes('/productos/editar/') || 
               location.pathname.includes('/productos/nuevo')) {
      navigate('/productos');
    } else if (location.pathname === '/proveedores' || location.pathname === '/productos') {
      // Si estamos en la lista de proveedores o productos, ir al dashboard según el rol
      if (usuario.rol === 'Administrador') {
        navigate('/dashboard-admin');
      } else {
        navigate('/dashboard-empleado');
      }
    } else {
      // En otros casos, usar el comportamiento estándar
      navigate(-1);
    }
  };

  return (
    <Button 
      className="btn-retroceder"
      onClick={handleBack}
    >
      <FaArrowLeft className="me-2" /> Volver
    </Button>
  );
};

export default BotonRetroceder;
