import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Row, Col } from 'react-bootstrap';
import { FaFilePdf } from 'react-icons/fa';
import BotonRetroceder from '../../components/BotonRetroceder';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Reportes.css';

const ReporteInventarioPDF = () => {
  const [filtros, setFiltros] = useState({
    tipo: '',
    stockMenor: '',
    fechaInicio: '',
    fechaFin: ''
  });

  const [filtrado, setFiltrado] = useState([]);
  const [datosOriginales, setDatosOriginales] = useState([]);
  const [fechaHoraReporte, setFechaHoraReporte] = useState('');

  useEffect(() => {
    const demo = [
      { tipo: "Entrada", producto: "Paracetamol", lote: "A100", stock: 30, fecha: "2025-04-01" },
      { tipo: "Salida", producto: "Ibuprofeno", lote: "A200", stock: 5, fecha: "2025-05-10" },
      { tipo: "Entrada", producto: "Amoxicilina", lote: "A300", stock: 50, fecha: "2025-04-20" },
    ];
    setDatosOriginales(demo);
    setFiltrado(demo);
  }, []);

  const aplicarFiltrosYGenerarPDF = () => {
    let datos = [...datosOriginales];
    if (filtros.tipo) {
      datos = datos.filter(d => d.tipo === filtros.tipo);
    }
    if (filtros.stockMenor) {
      datos = datos.filter(d => d.stock <= parseInt(filtros.stockMenor));
    }
    if (filtros.fechaInicio) {
      datos = datos.filter(d => d.fecha >= filtros.fechaInicio);
    }
    if (filtros.fechaFin) {
      datos = datos.filter(d => d.fecha <= filtros.fechaFin);
    }
    setFiltrado(datos);

    
    const ahora = new Date();
    const fechaFormateada = ahora.toLocaleDateString();
    const horaFormateada = ahora.toLocaleTimeString();
    setFechaHoraReporte(`Fecha: ${fechaFormateada} | Hora: ${horaFormateada}`);

    
    setTimeout(() => {
      generarPDF();
    }, 300);
  };

  const generarPDF = () => {
    const input = document.getElementById('reporte-pdf');

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('reporte-inventario.pdf');
    }).catch((error) => {
      console.error("Error al generar PDF:", error);
    });
  };

  return (
    <div className="reporte-container">
      <BotonRetroceder />
      <div className="d-flex align-items-center gap-2 mb-3 text-danger">
        <FaFilePdf size={28} />
        <h2 className="m-0">Reporte PDF</h2>
      </div>

      <Row className="mb-3">
        <Col md={3}>
          <Form.Label>Tipo</Form.Label>
          <Form.Select value={filtros.tipo} onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}>
            <option value="">Todos</option>
            <option value="Entrada">Entrada</option>
            <option value="Salida">Salida</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Label>Stock menor a:</Form.Label>
          <Form.Control type="number" value={filtros.stockMenor} onChange={(e) => setFiltros({ ...filtros, stockMenor: e.target.value })} />
        </Col>
        <Col md={3}>
          <Form.Label>Desde</Form.Label>
          <Form.Control type="date" value={filtros.fechaInicio} onChange={(e) => setFiltros({ ...filtros, fechaInicio: e.target.value })} />
        </Col>
        <Col md={3}>
          <Form.Label>Hasta</Form.Label>
          <Form.Control type="date" value={filtros.fechaFin} onChange={(e) => setFiltros({ ...filtros, fechaFin: e.target.value })} />
        </Col>
      </Row>

      <Button className="btn-pink mb-4" onClick={aplicarFiltrosYGenerarPDF}>
        Generar Reporte
      </Button>

      <div id="reporte-pdf" className="bg-white p-3 rounded">
        <h4 className="text-center mb-1">Reporte de Inventario</h4>
        <p className="text-center mb-3">{fechaHoraReporte}</p>
        <Table bordered hover responsive className="styled-table">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Producto</th>
              <th>Lote</th>
              <th>Stock</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filtrado.map((d, i) => (
              <tr key={i}>
                <td>{d.tipo}</td>
                <td>{d.producto}</td>
                <td>{d.lote}</td>
                <td>{d.stock}</td>
                <td>{d.fecha}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ReporteInventarioPDF;
