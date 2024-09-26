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
    if (error.response.status === 401) {
      // Si recibimos un 401, significa que el token ha expirado o no es válido
      localStorage.removeItem('token');  // Borrar el token del localStorage
      
      // Redirigir al usuario al login
      if (typeof window !== 'undefined') {
        window.location.href = '/login';  // Redirigir al login en el lado del cliente
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;