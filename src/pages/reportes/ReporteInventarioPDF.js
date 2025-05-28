import React from 'react';
import './Reportes.css';
import { Button } from 'react-bootstrap';
import { FaFilePdf } from 'react-icons/fa';

const ReporteInventarioPDF = () => {
  const handleExport = () => {
    alert("Simulación: Reporte PDF generado.");
  };

  return (
    <div className="reporte-container text-center">
      <FaFilePdf size={50} className="mb-3 text-danger" />
      <h2 className="text-danger">Exportar Inventario en PDF</h2>
      <p>Este módulo simula la exportación del inventario completo.</p>
      <Button className="btn-pink mt-3" onClick={handleExport}>
        <FaFilePdf className="me-2" /> Generar PDF
      </Button>
    </div>
  );
};

export default ReporteInventarioPDF;
