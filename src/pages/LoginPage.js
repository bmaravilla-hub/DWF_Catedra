import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import { FaUserCircle, FaLock, FaSignInAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';
import './LoginPage.css';

const LoginPage = () => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [rol, setRol] = useState('empleado');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    const datosUsuario = { nombre: usuario, rol };
    login(datosUsuario);
    toast.success(`¡Bienvenido ${usuario}!`, { autoClose: 2000 });

    setTimeout(() => {
      navigate(rol === 'admin' ? '/dashboard-admin' : '/dashboard-empleado');
    }, 2200);
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <div className="text-center mb-4">
          <FaUserCircle size={60} color="#e75480" />
          <h2 className="mt-2">Iniciar Sesión</h2>
        </div>
        <div className="mb-3">
          <label><FaUserCircle /> Usuario</label>
          <input type="text" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label><FaLock /> Contraseña</label>
          <input type="password" className="form-control" value={clave} onChange={(e) => setClave(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Rol</label>
          <select className="form-select" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="empleado">Empleado</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <button className="btn btn-pink w-100 d-flex justify-content-center align-items-center gap-2" type="submit">
          <FaSignInAlt /> Ingresar
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
