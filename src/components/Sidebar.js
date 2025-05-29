import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Sidebar.css";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const { usuario, logout } = useAuth();

  if (!usuario) return null;

  return (
    <div className="sidebar">
      <h5 className="sidebar-title">Menú ({usuario.rol})</h5>
      <ul>
        <li>
          <Link to="/productos">Productos</Link>
        </li>
        <li>
          <Link to="/stock">Stock</Link>
        </li>
        {usuario.rol === "admin" && (
          <>
            <li>
              <Link to="/proveedores">Proveedores</Link>
            </li>
            <li>
              <Link to="/admin/usuarios">Usuarios</Link>
            </li>
          </>
        )}
        <li>
          <Link to="/reportes/reporte-stock-critico">Reporte Crítico</Link>
        </li>
        <li>
          <Link to="/reportes/reporte-inventario-pdf">Reporte PDF</Link>
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
