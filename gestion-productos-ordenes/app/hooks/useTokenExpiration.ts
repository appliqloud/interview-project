import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Usando el router de Next.js para redirigir

const TOKEN_EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutos en milisegundos

const useTokenExpiration = (token: string | null) => {
  const router = useRouter();

  useEffect(() => {
    if (token) {
      // Configuramos un temporizador para redirigir al login cuando expire el token
      const timer = setTimeout(() => {
        console.log("Token ha expirado, redirigiendo al login...");
        router.push("/login"); // Redirige al login
      }, TOKEN_EXPIRATION_TIME);

      // Limpia el temporizador si el componente se desmonta o el token cambia
      return () => clearTimeout(timer);
    }
  }, [token]); // Dependencias: token y router
};

export default useTokenExpiration;
