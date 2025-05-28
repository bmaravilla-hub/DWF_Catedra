import React from 'react';
import Sidebar from '../components/Sidebar';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { FaCapsules, FaUsers, FaFilePdf } from 'react-icons/fa';

const DashboardAdmin = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div className="main-dashboard" style={{ marginLeft: '240px', padding: '30px', width: '100%' }}>
        <h2 className="mb-4 text-center text-danger">Panel Administrativo</h2>
        <Container>
          <Row className="g-4">
            <Col md={4}>
              <Card className="shadow-sm text-center p-3">
                <FaCapsules size={40} color="#e75480" />
                <Card.Body>
                  <Card.Title>Productos</Card.Title>
                  <Card.Text>Gestione el inventario de medicamentos.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm text-center p-3">
                <FaUsers size={40} color="#e75480" />
                <Card.Body>
                  <Card.Title>Proveedores</Card.Title>
                  <Card.Text>Administre información de proveedores.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="shadow-sm text-center p-3">
                <FaFilePdf size={40} color="#e75480" />
                <Card.Body>
                  <Card.Title>Reportes</Card.Title>
                  <Card.Text>Genere reportes exportables en PDF.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default DashboardAdmin;
