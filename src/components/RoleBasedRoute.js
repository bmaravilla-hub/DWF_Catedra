import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RoleBasedRoute = ({ requiredRoles, children }) => {
  const { usuario, isAuthenticated } = useAuth();

  if (!isAuthenticated()) {
    // No autenticado, redirigir al login
    return <Navigate to="/" replace />;
  }

  // Verificar si el usuario tiene el rol requerido
  if (requiredRoles && !requiredRoles.includes(usuario.rol)) {
    // Usuario no tiene el rol requerido, redirigir según su rol
    if (usuario.rol === 'Administrador') {
      return <Navigate to="/dashboard-admin" replace />;
    } else {
      return <Navigate to="/dashboard-empleado" replace />;
    }
  }

  // Usuario autenticado y con rol adecuado
  return children;
};

export default RoleBasedRoute;