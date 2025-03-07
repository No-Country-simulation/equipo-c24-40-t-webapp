// src/services/serviceService.js
import api from './api';

export const getServices = async () => {
  try {
    const response = await api.get('/services');
    return response.data;
  } catch (error) {
    console.error('Error en getServices:', error);
    throw error.response?.data || { message: 'Error fetching services' };
  }
};
// Obtener un servicio por ID
export const getServiceById = async (id) => {
  try {
    const response = await api.get(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error fetching service' };
  }
};

// Crear un nuevo servicio
export const createService = async (serviceData) => {
  try {
    const response = await api.post('/services', serviceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error creating service' };
  }
};

// Actualizar un servicio existente
export const updateService = async (id, serviceData) => {
  try {
    const response = await api.put(`/services/${id}`, serviceData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error updating service' };
  }
};

// Eliminar un servicio
export const deleteService = async (id) => {
  try {
    const response = await api.delete(`/services/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error deleting service' };
  }
};