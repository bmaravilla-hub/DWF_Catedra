import React, { useEffect, useState } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import { FaEdit, FaTrashAlt, FaEye, FaPlusCircle, FaExchangeAlt } from 'react-icons/fa';
import MovimientoForm from '../stock/MovimientoForm';
import BotonRetroceder from '../../components/BotonRetroceder';
import './ProductoList.css';

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [modoEditar, setModoEditar] = useState(false);
  const [showMovimiento, setShowMovimiento] = useState(false);

  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    lote: '',
    fechaVencimiento: '',
    imagen: '',
    proveedorNombre: ''
  });

  useEffect(() => {
    const demo = [
      {
        id: 1,
        nombre: "Paracetamol",
        descripcion: "500mg - Caja x10",
        lote: "A123",
        fechaVencimiento: "2025-12-31",
        stock: 20,
        precio: 1.50,
        proveedorNombre: "Laboratorio Santa Fe"
      },
      {
        id: 2,
        nombre: "Ibuprofeno",
        descripcion: "200mg - Blíster",
        lote: "B456",
        fechaVencimiento: "2024-10-15",
        stock: 8,
        precio: 2.00,
        proveedorNombre: "Medicinas del Norte"
      }
    ];
    setProductos(demo);
  }, []);

  const handleVerDetalle = (producto) => {
    setProductoSeleccionado(producto);
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleAgregarProducto = (e) => {
    e.preventDefault();
    if (modoEditar && productoSeleccionado) {
      const actualizados = productos.map((p) =>
        p.id === productoSeleccionado.id ? { ...nuevoProducto, id: p.id } : p
      );
      setProductos(actualizados);
    } else {
      const nuevo = { ...nuevoProducto, id: productos.length + 1 };
      setProductos([...productos, nuevo]);
    }

    setNuevoProducto({
      nombre: '', descripcion: '', precio: '', stock: '', lote: '',
      fechaVencimiento: '', imagen: '', proveedorNombre: ''
    });
    setModoEditar(false);
    setShowForm(false);
  };

  const handleEditar = (prod) => {
    setModoEditar(true);
    setNuevoProducto(prod);
    setProductoSeleccionado(prod);
    setShowForm(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Deseas eliminar este producto?")) {
      setProductos(productos.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="table-container">
      <BotonRetroceder />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">Listado de Productos</h2>
        <Button className="btn-pink d-flex align-items-center gap-2" onClick={() => {
          setModoEditar(false);
          setNuevoProducto({
            nombre: '', descripcion: '', precio: '', stock: '', lote: '',
            fechaVencimiento: '', imagen: '', proveedorNombre: ''
          });
          setShowForm(true);
        }}>
          <FaPlusCircle /> Añadir Producto
        </Button>
      </div>

      <Table striped bordered hover responsive className="styled-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod) => (
            <tr key={prod.id} className={prod.stock <= 10 ? "stock-bajo" : ""}>
              <td>{prod.nombre}</td>
              <td>{prod.descripcion}</td>
              <td>{prod.stock}</td>
              <td>${prod.precio.toFixed(2)}</td>
              <td>
                <Button variant="outline-info" size="sm" className="me-2" onClick={() => handleVerDetalle(prod)}>
                  <FaEye />
                </Button>
                <Button variant="outline-warning" size="sm" className="me-2" onClick={() => {
                  setProductoSeleccionado(prod);
                  setShowMovimiento(true);
                }}>
                  <FaExchangeAlt />
                </Button>
                <Button variant="outline-primary" size="sm" className="me-2" onClick={() => handleEditar(prod)}>
                  <FaEdit />
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleEliminar(prod.id)}>
                  <FaTrashAlt />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalle del Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productoSeleccionado && (
            <div className="text-center">
              <img
                src={productoSeleccionado.imagen}
                alt="Producto"
                className="img-fluid mb-3 rounded"
                style={{ maxHeight: '180px' }}
              />
              <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
              <p><strong>Descripción:</strong> {productoSeleccionado.descripcion}</p>
              <p><strong>Precio:</strong> ${productoSeleccionado.precio.toFixed(2)}</p>
              <p><strong>Stock:</strong> {productoSeleccionado.stock}</p>
              <p><strong>Lote:</strong> {productoSeleccionado.lote}</p>
              <p><strong>Fecha de vencimiento:</strong> {productoSeleccionado.fechaVencimiento}</p>
              <p><strong>Proveedor:</strong> {productoSeleccionado.proveedorNombre || 'N/A'}</p>
            </div>
          )}
        </Modal.Body>
      </Modal>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEditar ? 'Editar Producto' : 'Registrar Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleAgregarProducto}>
            <div className="mb-3">
              <label>Nombre</label>
              <input type="text" name="nombre" className="form-control" value={nuevoProducto.nombre} onChange={handleFormChange} required />
            </div>
            <div className="mb-3">
              <label>Descripción</label>
              <input type="text" name="descripcion" className="form-control" value={nuevoProducto.descripcion} onChange={handleFormChange} required />
            </div>
            <div className="mb-3">
              <label>Precio</label>
              <input type="number" step="0.01" name="precio" className="form-control" value={nuevoProducto.precio} onChange={handleFormChange} required />
            </div>
            <div className="mb-3">
              <label>Stock</label>
              <input type="number" name="stock" className="form-control" value={nuevoProducto.stock} onChange={handleFormChange} required />
            </div>
            <div className="mb-3">
              <label>Lote</label>
              <input type="text" name="lote" className="form-control" value={nuevoProducto.lote} onChange={handleFormChange} required />
            </div>
            <div className="mb-3">
              <label>Fecha de Vencimiento</label>
              <input type="date" name="fechaVencimiento" className="form-control" value={nuevoProducto.fechaVencimiento} onChange={handleFormChange} required />
            </div>
            <div className="mb-3">
              <label>Proveedor</label>
              <select name="proveedorNombre" className="form-select" value={nuevoProducto.proveedorNombre} onChange={handleFormChange} required>
                <option value="">Seleccione...</option>
                <option value="Laboratorio Santa Fe">Laboratorio Santa Fe</option>
                <option value="Medicinas del Norte">Medicinas del Norte</option>
              </select>
            </div>
            <Button type="submit" className="btn-pink w-100">{modoEditar ? 'Guardar Cambios' : 'Guardar Producto'}</Button>
          </form>
        </Modal.Body>
      </Modal>


      <MovimientoForm
        show={showMovimiento}
        onHide={() => setShowMovimiento(false)}
        productos={productoSeleccionado ? [productoSeleccionado] : productos}
      />
    </div>
  );
};

export default ProductoList;
