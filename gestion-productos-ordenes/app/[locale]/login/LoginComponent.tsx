import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/lib/authStore";
import { useApi } from "@/app/hooks/useApiRequest";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const LoginComponent = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const setToken = useAuthStore((state: { setToken: any }) => state.setToken);
  const login = useAuthStore((state: { login: any }) => state.login);

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
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <motion.div
          variants={primaryVariants}
          className="mb-1 inline-block text-sm font-medium"
        >
          <label
            htmlFor="user-input"
            className="mb-1 inline-block text-sm font-medium"
          >
            {t("userForm")}
            <span className="text-red-600">*</span>
          </label>
          <input
            id="user-input"
            type="text"
            placeholder="Usuario"
            value={username}
            className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </motion.div>
        <motion.div
          variants={primaryVariants}
          className="flex flex-col gap w-full"
        >
          <label
            htmlFor="password-input"
            className="mb-1 inline-block text-sm font-medium"
          >
            {t("passwordForm")}
            <span className="text-red-600">*</span>
          </label>
          <input
            id="password-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border-[1px] border-slate-300 px-2.5 py-1.5 focus:outline-indigo-600"
            required
          />
        </motion.div>
        <motion.button
          variants={primaryVariants}
          type="submit"
          className="mb-1.5 w-full rounded bg-indigo-600 px-4 py-2 text-center font-medium text-white transition-colors hover:bg-indigo-700 mt-4 lowercase"
          whileTap={{
            scale: 0.985,
          }}
        >
          {t("headerlogin")}
        </motion.button>
      </form>
      {error && <p>{error}</p>}
    </>
  );
};

export default LoginComponent;

const primaryVariants = {
  initial: {
    y: 25,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};
