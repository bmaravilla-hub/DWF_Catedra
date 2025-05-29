import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaExchangeAlt } from 'react-icons/fa';
import './MovimientoForm.css';
import BotonRetroceder from '../../components/BotonRetroceder';


const MovimientoForm = ({ show, onHide, productos }) => {
  const [movimiento, setMovimiento] = useState({
    tipo: 'Entrada',
    productoId: '',
    lote: '',
    cantidad: '',
    fecha: '',
    motivo: ''
  });

  const handleChange = (e) => {
    setMovimiento({ ...movimiento, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Movimiento de ${movimiento.tipo} registrado (simulado).`);
    onHide();
  };
<BotonRetroceder />

  return (
    
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title><FaExchangeAlt className="me-2" /> Registrar Movimiento</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Movimiento</Form.Label>
            <Form.Select name="tipo" value={movimiento.tipo} onChange={handleChange}>
              <option value="Entrada">Entrada</option>
              <option value="Salida">Salida</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Producto</Form.Label>
            <Form.Select name="productoId" value={movimiento.productoId} onChange={handleChange} required>
              <option value="">Seleccione...</option>
              {productos.map((prod) => (
                <option key={prod.id} value={prod.id}>{prod.nombre}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Lote</Form.Label>
            <Form.Control type="text" name="lote" value={movimiento.lote} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control type="number" name="cantidad" value={movimiento.cantidad} onChange={handleChange} required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control type="date" name="fecha" value={movimiento.fecha} onChange={handleChange} required />
          </Form.Group>

          {movimiento.tipo === 'Salida' && (
            <Form.Group className="mb-3">
              <Form.Label>Motivo</Form.Label>
              <Form.Control type="text" name="motivo" value={movimiento.motivo} onChange={handleChange} required />
            </Form.Group>
          )}

          <Button type="submit" className="btn-pink w-100">
            Registrar Movimiento
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MovimientoForm;
