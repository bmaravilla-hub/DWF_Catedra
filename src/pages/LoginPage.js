import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { FaUserCircle, FaLock, FaSignInAlt } from 'react-icons/fa';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.css';

const API_URL = 'http://localhost:8080';

const LoginPage = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [roles, setRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rolesLoading, setRolesLoading] = useState(true);
  
  const navigate = useNavigate();
  const { login, error } = useAuth();

  // Cargar roles desde la API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${API_URL}/roles`);
        setRoles(response.data);
      } catch (err) {
        console.error('Error al cargar roles:', err);
        toast.error('No se pudieron cargar los roles');
        // Usar roles por defecto si hay error
        setRoles([
          { idRol: 1, nombreRol: 'Administrador' },
          { idRol: 2, nombreRol: 'Empleado' }
        ]);
      } finally {
        setRolesLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Estos datos se convertirán a correo/contrasena en el servicio
      const userData = await login({ usuario, clave });
      
      toast.success(`¡Bienvenido ${userData.nombre}!`, { autoClose: 2000 });
      
      // Redirigir según el rol
      setTimeout(() => {
        if (userData.rol === 'Administrador') {
          navigate('/dashboard-admin');
        } else {
          navigate('/dashboard-empleado');
        }
      }, 2000);
    } catch (err) {
      console.error('Error login:', err);
      toast.error(err.message || 'Error de autenticación');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <div className="text-center mb-4">
          <FaUserCircle size={60} color="#e75480" />
          <h2 className="mt-2">Iniciar Sesión</h2>
        </div>
        <div className="mb-3">
          <label><FaUserCircle /> Usuario/Correo</label>
          <input 
            type="text" 
            className="form-control" 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingrese su correo"
            required 
          />
        </div>
        <div className="mb-3">
          <label><FaLock /> Contraseña</label>
          <input 
            type="password" 
            className="form-control" 
            value={clave} 
            onChange={(e) => setClave(e.target.value)} 
            placeholder="Ingrese su contraseña"
            required 
          />
        </div>
        
        <button 
          className="btn btn-pink w-100 d-flex justify-content-center align-items-center gap-2" 
          type="submit"
          disabled={isLoading || rolesLoading}
        >
          {isLoading ? 'Autenticando...' : (
            <>
              <FaSignInAlt /> Ingresar
            </>
          )}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
