import axios from "axios";
import { useState } from "react";

// Hook personalizado para manejar solicitudes HTTP
export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función para realizar peticiones HTTP
  const request = async (
    method: string,
    url: string,
    data?: any,
    token?: string | null,
    customHeaders?: Record<string, string>
  ) => {
    setLoading(true);
    setError(null);

    // Encabezados por defecto
    const headers: Record<string, string> = {
      "Content-Type": "application/json", // Usamos application/json por defecto
    };

    // Si hay un token, agregarlo a los headers
    console.log("token", token);

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Si se pasan encabezados personalizados, sobrescribir los valores por defecto
    const finalHeaders = {
      ...headers,
      ...customHeaders, // Sobrescribir encabezados si se pasan customHeaders
    };

    try {
      const response = await axios({
        method,
        url,
        data: data ? data : null,
        headers: finalHeaders, // Usar los encabezados finales
      });

      setLoading(false);
      return response.data; // Retorna los datos de la respuesta
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data || err.message);
      console.error("Error en la solicitud:", err);
    }
  };

  return { request, loading, error };
};
