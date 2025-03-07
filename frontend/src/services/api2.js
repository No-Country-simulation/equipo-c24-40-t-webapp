// src/services/api.js
import axios from 'axios';
import config from '../config/env';

const api2 = axios.create({
    baseURL: config.apiUrlAuth,
});

// Interceptor para añadir el token automáticamente
api2.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api2;