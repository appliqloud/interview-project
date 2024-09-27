import { create } from "zustand";
import axios from "axios";

// Interfaz que define la traducción del producto
interface Translation {
  language: string;
  description: string;
}

// Interfaz que define el producto
interface Product {
  id: string;
  name: string;
  price: number;
  translations: Translation[];
}
interface NumberOfProducts {
  count: number;
}

interface Order {
  id: string;
  status: string;
  productId: string;
  quantity: number;
  total: number;
}
// Interfaz que define el estado de la tienda de productos
interface ProductState {
  products: Product[];
  orders: Order[];
  productsCount: number;
  ordersCount: number;
  getOrders: () => Promise<void>;
  getProducts: () => Promise<void>;
  getOrdersCount: () => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  receiveOrder: (orderId: string) => Promise<void>;
  addProduct: (
    productId: string,
    productPrice: number,
    translations: Translation[]
  ) => Promise<void>;
  editProduct: (
    productId: string,
    productPrice: number,
    translations: Translation[]
  ) => Promise<void>;

  deleteProduct: (productId: string) => Promise<void>;
  activateProduct: (productId: string) => Promise<void>;
  deactivateProduct: (productId: string) => Promise<void>;
  getProductsCount: () => Promise<void>;
  createOrder: (productId: string, quantity: number) => Promise<void>;

  // getAllProducts: () => Promise<void>;l
}

// Crear la tienda Zustand con tipado
export const useProductStore = create<ProductState>((set) => ({
  products: [],
  orders: [],
  productsCount: 0,
  ordersCount: 0,
  getOrders: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get<Order[]>(
        "https://interview.appliqloud.com/orders/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ orders: response.data });
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  },
  // Función para obtener los productos
  getProducts: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get<Product[]>(
        "https://interview.appliqloud.com/products/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ products: response.data });
    } catch (error) {
      console.error("Error fetching products", error);
    }
  },

  // Función para añadir un nuevo producto
  addProduct: async (productId, productPrice, translations) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.post<Product>(
        "https://interview.appliqloud.com/products/",
        {
          id: productId,
          price: productPrice,
          translations, // Enviar las traducciones
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Agregar el nuevo producto a la lista de productos en el estado global
      set((state) => ({
        products: [...state.products, response.data],
      }));
    } catch (error) {
      console.error("Error adding product", error);
    }
  },
  editProduct: async (productId, productPrice, translations) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put<Product>(
        `https://interview.appliqloud.com/products/${productId}`,
        {
          price: productPrice,
          translations, // Enviar las traducciones
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Actualizar el producto en la lista de productos en el estado global
      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? response.data : product
        ),
      }));
    } catch (error) {
      console.error("Error editing product", error);
    }
  },
  deleteProduct: async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete<Product>(
        `https://interview.appliqloud.com/products/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Eliminar el producto de la lista de productos en el estado global
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
      }));
    } catch (error) {
      console.error("Error deleting product", error);
    }
  },
  activateProduct: async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put<Product>(
        `https://interview.appliqloud.com/products/activate/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Actualizar el producto en la lista de productos en el estado global
      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? response.data : product
        ),
      }));
    } catch (error) {
      console.error("Error editing product", error);
    }
  },
  deactivateProduct: async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.put<Product>(
        `https://interview.appliqloud.com/products/deactivate/${productId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Actualizar el producto en la lista de productos en el estado global
      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? response.data : product
        ),
      }));
    } catch (error) {
      console.error("Error editing product", error);
    }
  },
  getProductsCount: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.get<NumberOfProducts>(
        "https://interview.appliqloud.com/products/count",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ productsCount: response.data.count });
    } catch (error) {
      console.error("Error fetching products", error);
    }
  },
  createOrder: async (productId, quantity) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.post<Product>(
        "https://interview.appliqloud.com/orders/",
        {
          productId,
          quantity,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error creating order", error);
    }
  },
  cancelOrder: async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.put<Product>(
        `https://interview.appliqloud.com/orders/cancel/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        // body
      );
    } catch (error) {
      console.error("Error canceling order", error);
    }
  },
  receiveOrder: async (orderId) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.put<Product>(
        `https://interview.appliqloud.com/orders/receive/${orderId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        // body
      );
    } catch (error) {
      console.error("Error receiving order", error);
    }
  },
  getOrdersCount: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const response = await axios.get<NumberOfProducts>(
        "https://interview.appliqloud.com/orders/count",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ ordersCount: response.data.count });
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  },
}));
