import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // URL base de la API
  headers: {
    'Content-Type': 'application/json',
  },
});

// Puedes añadir interceptores si necesitas manejar tokens de autenticación o errores globales
axiosInstance.interceptors.request.use(
  (config) => {
    // Agregar el token a las cabeceras si existe
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo global de errores
    if (error.response && error.response.status === 401) {
      // Por ejemplo, redirigir al usuario al login si está no autenticado
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;