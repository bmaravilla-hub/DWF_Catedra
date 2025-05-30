import axios from 'axios';

const API_URL = 'http://localhost:8080';

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authService = {
  login: async (credentials) => {
    // Convertir el formato de los datos
    const loginData = {
      correo: credentials.usuario, // Convertir de usuario a correo
      contrasena: credentials.clave // Convertir de clave a contrasena
    };
    
    console.log('Enviando datos de login:', loginData);
    
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    return response.data;
  },
  getRoles: async () => {
    const response = await axios.get(`${API_URL}/roles`, {
      headers: getAuthHeader()
    });
    return response.data;
  }
};

export const proveedorService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_URL}/proveedores`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching proveedores:', error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/proveedores/${id}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching proveedor with id ${id}:`, error);
      throw error;
    }
  },

  create: async (proveedor) => {
    try {
      const response = await axios.post(`${API_URL}/proveedores`, proveedor, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error('Error creating proveedor:', error);
      throw error;
    }
  },

  update: async (id, proveedor) => {
    try {
      const response = await axios.put(`${API_URL}/proveedores/${id}`, proveedor, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating proveedor with id ${id}:`, error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/proveedores/${id}`, {
        headers: getAuthHeader()
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting proveedor with id ${id}:`, error);
      throw error;
    }
  }
};