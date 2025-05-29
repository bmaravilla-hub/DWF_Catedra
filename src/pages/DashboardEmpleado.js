import React from 'react';
import Sidebar from '../components/Sidebar';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaCapsules, FaExchangeAlt, FaUser } from 'react-icons/fa';

const DashboardEmpleado = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="container mt-4" style={{ marginLeft: '240px' }}>
        <h2 className="mb-4 text-center text-danger">Bienvenido al Panel del Empleado</h2>
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <Card className="shadow-sm text-center p-3">
                <FaCapsules size={36} color="#e75480" />
                <Card.Body>
                  <Card.Title>Ver Productos</Card.Title>
                  <Card.Text>Consulta y gestiona el inventario disponible.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm text-center p-3">
                <FaExchangeAlt size={36} color="#e75480" />
                <Card.Body>
                  <Card.Title>Movimientos de Stock</Card.Title>
                  <Card.Text>Registra entradas y salidas de productos.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm text-center p-3">
                <FaUser size={36} color="#e75480" />
                <Card.Body>
                  <Card.Title>Reporte</Card.Title>
                  <Card.Text>Generar Reportes de Inventario</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DashboardEmpleado;
