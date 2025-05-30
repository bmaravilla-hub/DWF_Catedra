import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
const API_URL = 'http://localhost:8080';

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar el usuario desde localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    const storedToken = localStorage.getItem("token");
    
    if (storedUser && storedToken) {
      setUsuario(JSON.parse(storedUser));
      setToken(storedToken);
      
      // Configurar interceptor para incluir token en todas las solicitudes
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setError(null);
      
      // Llamar al servicio de autenticación
      const response = await axios.post(`${API_URL}/auth/login`, {
        correo: credentials.usuario,
        contrasena: credentials.clave
      });
      
      console.log('Respuesta de autenticación:', response);
      
      // Extraer datos de la respuesta del backend
      // Ahora la respuesta incluye token, correo, rol e idUsuario
      const { token, correo, rol, idUsuario } = response.data;
      
      // Crear objeto de usuario con ID incluido desde la respuesta
      const userData = {
        nombre: correo, // Podría ser nombre real si viene en la respuesta
        correo: correo,
        rol: rol,
        idUsuario: idUsuario
      };
      
      // Guardar datos en estado y localStorage
      setUsuario(userData);
      setToken(token);
      localStorage.setItem('usuario', JSON.stringify(userData));
      localStorage.setItem('token', token);
      
      // Configurar header para futuras solicitudes
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return userData;
    } catch (err) {
      console.error('Error de autenticación:', err);
      const errorMsg = err.response?.data?.message || 'Error de autenticación';
      setError(errorMsg);
      throw new Error(errorMsg);
    }
  };

  const logout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("token");
    setUsuario(null);
    setToken(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  const isAuthenticated = () => {
    return !!usuario && !!token;
  };

  const hasRole = (requiredRole) => {
    return usuario?.rol === requiredRole;
  };

  return (
    <AuthContext.Provider value={{ 
      usuario, 
      loading, 
      error, 
      login, 
      logout, 
      isAuthenticated,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
