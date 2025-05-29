import React from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductoList from "./pages/productos/ProductoList";
import ProductoForm from "./pages/productos/ProductoForm";
import ProveedorList from "./pages/proveedores/ProveedorList";
import ProveedorForm from "./pages/proveedores/ProveedorForm";
import StockList from "./pages/stock/StockList";
import StockEntradaForm from "./pages/stock/StockEntradaForm";
import StockSalidaForm from "./pages/stock/StockSalidaForm";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardEmpleado from "./pages/DashboardEmpleado";
import UsuarioList from "./pages/admin/UsuarioList";
import ReporteStockCritico from "./pages/reportes/ReporteStockCritico";
import ReporteInventarioPDF from "./pages/reportes/ReporteInventarioPDF";

const PrivateRoute = ({ children }) => {
  const { usuario } = useAuth();
  return usuario ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard-admin"
            element={
              <PrivateRoute>
                <DashboardAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard-empleado"
            element={
              <PrivateRoute>
                <DashboardEmpleado />
              </PrivateRoute>
            }
          />
          <Route path="/productos" element={<ProductoList />} />
          <Route path="/productos/nuevo" element={<ProductoForm />} />
          <Route path="/proveedores" element={<ProveedorList />} />
          <Route path="/proveedores/nuevo" element={<ProveedorForm />} />
          <Route path="/stock" element={<StockList />} />
          <Route path="/stock/entrada" element={<StockEntradaForm />} />
          <Route path="/stock/salida" element={<StockSalidaForm />} />
          <Route path="/admin/usuarios" element={<UsuarioList />} />
          <Route
            path="/reportes/reporte-stock-critico"
            element={<ReporteStockCritico />}
          />
          <Route
            path="/reportes/reporte-inventario-pdf"
            element={<ReporteInventarioPDF />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
