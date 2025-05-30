import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProductoList from "./pages/productos/ProductoList";
import ProductoForm from "./pages/productos/ProductoForm";
import ProveedorList from "./pages/proveedores/ProveedorList";
import ProveedorForm from "./pages/proveedores/ProveedorForm";
import StockList from "./pages/stock/StockList";
import StockEntradaForm from "./pages/stock/StockEntradaForm";
import StockSalidaForm from "./pages/stock/StockSalidaForm";
import { AuthProvider } from "./context/AuthContext";
import RoleBasedRoute from "./components/RoleBasedRoute";
import LoginPage from "./pages/LoginPage";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardEmpleado from "./pages/DashboardEmpleado";
import UsuarioList from "./pages/admin/UsuarioList";
import ReporteStockCritico from "./pages/reportes/ReporteStockCritico";
import ReporteInventarioPDF from "./pages/reportes/ReporteInventarioPDF";
import AuthDebugger from "./components/AuthDebugger";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/dashboard-admin"
            element={
              <RoleBasedRoute requiredRoles={['Administrador']}>
                <DashboardAdmin />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/dashboard-empleado"
            element={
              <RoleBasedRoute requiredRoles={['Empleado']}>
                <DashboardEmpleado />
              </RoleBasedRoute>
            }
          />
          <Route 
            path="/productos" 
            element={
              <RoleBasedRoute requiredRoles={['Administrador', 'Empleado']}>
                <ProductoList />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/productos/nuevo" 
            element={
              <RoleBasedRoute requiredRoles={['Administrador', 'Empleado']}>
                <ProductoForm />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/productos/editar/:id" 
            element={
              <RoleBasedRoute requiredRoles={['Administrador', 'Empleado']}>
                <ProductoForm />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/proveedores" 
            element={
              <RoleBasedRoute requiredRoles={['Administrador']}>
                <ProveedorList />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/proveedores/nuevo" 
            element={
              <RoleBasedRoute requiredRoles={['Administrador']}>
                <ProveedorForm />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/proveedores/editar/:id" 
            element={
              <RoleBasedRoute requiredRoles={['Administrador']}>
                <ProveedorForm />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/stock" 
            element={
              <RoleBasedRoute requiredRoles={['Administrador', 'Empleado']}>
                <StockList />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/stock/entrada" 
            element={
              <RoleBasedRoute requiredRoles={['Administrador', 'Empleado']}>
                <StockEntradaForm />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/stock/salida" 
            element={
              <RoleBasedRoute requiredRoles={['Administrador', 'Empleado']}>
                <StockSalidaForm />
              </RoleBasedRoute>
            } 
          />
          <Route 
            path="/admin/usuarios" 
            element={
              <RoleBasedRoute requiredRoles={['Administrador']}>
                <UsuarioList />
              </RoleBasedRoute>
            } 
          />
          <Route
            path="/reportes/reporte-stock-critico"
            element={
              <RoleBasedRoute requiredRoles={['Administrador', 'Empleado']}>
                <ReporteStockCritico />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/reportes/reporte-inventario-pdf"
            element={
              <RoleBasedRoute requiredRoles={['Administrador', 'Empleado']}>
                <ReporteInventarioPDF />
              </RoleBasedRoute>
            }
          />
          <Route path="/debug" element={<AuthDebugger />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
