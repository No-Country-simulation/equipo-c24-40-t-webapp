import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth';

// Configuración de Axios con interceptor para añadir el token
const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Registro
export const register = async (email, password) => {
  try {
    const response = await api.post('/register', { email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error registering user' };
  }
};

// Login
export const login = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    localStorage.setItem('token', response.data.token); // Guardar token
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error logging in' };
  }
};

// Perfil (ruta protegida)
export const getProfile = async () => {
  try {
    const response = await api.get('/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching profile' };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
};