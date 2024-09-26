import { create } from "zustand";

// Definir la interfaz del estado de autenticación
interface AuthState {
  token: string | null;
  role: string | null;
  isAuthenticated: boolean;
  login: (
    role: string,
    firstName: string,
    id: string,
    lastName: string
  ) => void;
  setToken: (token: string) => void;
  logout: () => void;
  bears: number;
  increasePopulation: () => void;
}

// Crear el store de Zustand
export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null, // Solo acceder a localStorage en el cliente
  role: typeof window !== "undefined" ? localStorage.getItem("role") : null, // Solo acceder a localStorage en el cliente
  isAuthenticated:
    typeof window !== "undefined" ? !!localStorage.getItem("token") : false, // Solo acceder a localStorage en el cliente

  // Función para guardar el token
  setToken: (token: string) => {
    set({ token, isAuthenticated: true });
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token); // Guardar el token en el localStorage
    }
  },

  // Función para manejar la información del usuario después de obtener el token
  login: (role: string, firstName: string, id: string, lastName: string) => {
    set({ role, isAuthenticated: true });
    if (typeof window !== "undefined") {
      localStorage.setItem("role", role);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("id", id);
      localStorage.setItem("lastName", lastName);
    }
  },

  // Función para logout
  logout: () => {
    set({ token: null, role: null, isAuthenticated: false });
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("firstName");
      localStorage.removeItem("id");
      localStorage.removeItem("lastName");
    }
  },
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
}));
