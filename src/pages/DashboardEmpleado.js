import React from 'react';
import Sidebar from '../components/Sidebar';

const DashboardEmpleado = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="container mt-4" style={{ marginLeft: '240px' }}>
        <h2>Bienvenido Empleado 🧑‍⚕️</h2>
        <p>Puede registrar entradas, salidas y consultar reportes.</p>
      </div>
    </div>
  );
};

export default DashboardEmpleado;
