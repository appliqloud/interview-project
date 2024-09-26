"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/authStore";
import { useApi } from "@/app/hooks/useApiRequest";

const LoginComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const setToken = useAuthStore((state) => state.setToken);
  const login = useAuthStore((state) => state.login);

  //** CUSTOM HOOKS
  const { request } = useApi();

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit");

    e.preventDefault();
    try {
      const data = {
        grant_type: "password",
        username: username,
        password: password,
        scope: "",
        client_id: "",
        client_secret: "",
      };
      const tokenData = await request(
        "POST",
        "https://interview.appliqloud.com/users/token",
        data,
        null,
        { "Content-Type": "application/x-www-form-urlencoded" }
      );

      if (tokenData) {
        const token = tokenData.accessToken;
        setToken(token);
        getUserData(token);
        router.push("/dashboardproducts");
      }
    } catch (err) {
      setError("Credenciales incorrectas. Inténtalo nuevamente.");
    }
  };

  const getUserData = async (token: string) => {
    const userData = await request(
      "GET",
      "https://interview.appliqloud.com/users/me",
      null,
      token
    );

    if (userData) {
      login(userData.role, userData.firstName, userData.id, userData.lastName);
    }
  };
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col shadow w-[80%] mx-auto p-4 rounded-lg gap-1 max-w-[500px] justify-center items-center"
      >
        <div className="flex flex-col gap w-full">
          <label>Usuario</label>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap w-full">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="px-6 py-2 border w-auto mt-3 ">
          Iniciar sesión
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginComponent;
