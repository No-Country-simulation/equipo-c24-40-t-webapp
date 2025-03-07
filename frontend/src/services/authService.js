// src/services/authService.js
import api2 from './api2';

// Registro
export const register = async (email, password) => {
  try {
    const response = await api2.post('/register', { email, password });

    console.log(response)
    return response.data;

  } catch (error) {
    throw error.response?.data || { message: 'Error registering user' };
  }
};

// Login
export const login = async (email, password) => {
  try {
    const response = await api2.post('/login', { email, password });
    localStorage.setItem('token', response.data.token); // Guardar token
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error logging in' };
  }
};

// Perfil (ruta protegida)
export const getProfile = async () => {
  try {
    const response = await api2.get('/profile');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching profile' };
  }
};

// Logout
export const logout = () => {
  localStorage.removeItem('token');
};