import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";
import { FaUserCircle, FaUsers, FaCapsules, FaBoxOpen, FaFileAlt, FaFilePdf, FaUserTie } from "react-icons/fa";

const Sidebar = () => {
  const { usuario, logout } = useAuth();

  if (!usuario) return null;

  return (
    <div className="sidebar">
      <h5 className="sidebar-title">Menú ({usuario.rol})</h5>
      <ul>
        <li>
          <Link to="/productos" className="d-flex align-items-center">
            <FaCapsules className="me-2" /> Productos
          </Link>
        </li>
        <li>
          <Link to="/stock" className="d-flex align-items-center">
            <FaBoxOpen className="me-2" /> Stock
          </Link>
        </li>
        {usuario.rol === "Administrador" && (
          <>
            <li>
              <Link to="/proveedores" className="d-flex align-items-center">
                <FaUserTie className="me-2" /> Proveedores
              </Link>
            </li>
            <li>
              <Link to="/admin/usuarios" className="d-flex align-items-center">
                <FaUsers className="me-2" /> Usuarios
              </Link>
            </li>
          </>
        )}
        <li>
          <Link to="/reportes/reporte-stock-critico" className="d-flex align-items-center">
            <FaFileAlt className="me-2" /> Reporte Crítico
          </Link>
        </li>
        <li>
          <Link to="/reportes/reporte-inventario-pdf" className="d-flex align-items-center">
            <FaFilePdf className="me-2" /> Reporte PDF
          </Link>
        </li>

        <li>
          <button className="btn btn-danger mt-2 w-100" onClick={logout}>
            Cerrar sesión
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
