import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { FaSave, FaTruck, FaUser, FaPhone } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import BotonRetroceder from "../../components/BotonRetroceder";
import { proveedorService } from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import "./ProveedorForm.css";

const ProveedorForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [proveedor, setProveedor] = useState({
    nombreProveedor: "",
    telefono: "",
    direccion: "",
    correo: "",
    contacto: "",
    frecuenciaEntrega: "",
    tipoPago: "",
  });

  useEffect(() => {
    if (id) {
      const fetchProveedor = async () => {
        setLoading(true);
        try {
          const data = await proveedorService.getById(id);
          setProveedor(data);
        } catch (err) {
          console.error("Error al cargar el proveedor:", err);
          toast.error("No se pudo cargar la información del proveedor");
          setError("Error al cargar los datos del proveedor: " + (err.response?.data || err.message));
        } finally {
          setLoading(false);
        }
      };

      fetchProveedor();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Para el campo telefono, convertir a número si es un campo numérico
    const processedValue = name === 'telefono' && value !== '' ? 
      parseInt(value, 10) : value;
    
    setProveedor({ 
      ...proveedor, 
      [name]: processedValue 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      if (id) {
        await proveedorService.update(id, proveedor);
        toast.success("Proveedor actualizado exitosamente");
      } else {
        await proveedorService.create(proveedor);
        toast.success("Proveedor registrado exitosamente");
      }
      
      setSuccess(true);
      
      // Después de guardar exitosamente, esperar un momento y regresar a la lista
      setTimeout(() => {
        navigate("/proveedores");
      }, 1500);
    } catch (err) {
      console.error("Error al guardar el proveedor:", err);
      setError("Error al guardar los datos del proveedor: " + (err.response?.data || err.message));
      toast.error("Error al guardar los datos del proveedor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <BotonRetroceder />
      <h2>
        <FaTruck className="me-2" />
        {id ? "Editar Proveedor" : "Registrar Proveedor"}
      </h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">Proveedor guardado exitosamente</Alert>
      )}

      {loading && !error ? (
        <div className="text-center py-3">Cargando...</div>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>
              <FaUser className="me-1" /> Nombre
            </Form.Label>
            <Form.Control
              name="nombreProveedor"
              value={proveedor.nombreProveedor}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaPhone className="me-1" /> Teléfono
            </Form.Label>
            <Form.Control
              name="telefono"
              type="number"
              value={proveedor.telefono}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              name="direccion"
              value={proveedor.direccion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={proveedor.correo}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              <FaUser className="me-1" /> Persona de contacto
            </Form.Label>
            <Form.Control
              name="contacto"
              value={proveedor.contacto}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Frecuencia de Entrega</Form.Label>
            <Form.Select
              name="frecuenciaEntrega"
              value={proveedor.frecuenciaEntrega}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="Semanal">Semanal</option>
              <option value="Quincenal">Quincenal</option>
              <option value="Mensual">Mensual</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de Pago</Form.Label>
            <Form.Select
              name="tipoPago"
              value={proveedor.tipoPago}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione...</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Efectivo">Efectivo</option>
            </Form.Select>
          </Form.Group>

          <Button type="submit" className="btn-pink w-100" disabled={loading}>
            <FaSave className="me-2" />
            {loading
              ? "Guardando..."
              : id
              ? "Guardar Cambios"
              : "Guardar Proveedor"}
          </Button>
        </Form>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProveedorForm;
