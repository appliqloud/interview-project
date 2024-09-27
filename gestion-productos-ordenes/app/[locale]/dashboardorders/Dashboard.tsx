"use client";
import { useApi } from "@/app/hooks/useApiRequest";
import { useAuthStore } from "@/app/lib/authStore";
import axios from "axios";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useProductStore } from "@/app/lib/userProductStore";
import useTokenExpiration from "@/app/hooks/useTokenExpiration";
import CreateOrderForm from "./components/CreateOrderForm";
import TableOrders from "./components/TableOrders";
import LanguageChanger from "../components/LanguageChanger";
// import { useAuthStore } from "../store/authStore"; // Importamos el store

const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);

  // const [products, setProducts] = useState<any[]>([]);
  const { getProducts, products, productsCount, getProductsCount } =
    useProductStore();
  const { token } = useAuthStore();

  useTokenExpiration(token);

  const { role } = useAuthStore();

  const handleGetProducst = async () => {
    getProducts();
    getProductsCount();
  };

  useEffect(() => {
    handleGetProducst();
    getProductsCount();
  }, []);

  return (
    <div className="flex  flex-col gap-10 mx-auto  p-2">
      <div className="w-full mx-auto flex items-end justify-end h-20 ">
        <LanguageChanger />
      </div>
      <div className="flex gap-2 justify-end items-end w-full">
        {role !== "ADMIN" && (
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setOpenOrderModal(!openOrderModal)}
          >
            add order
          </button>
        )}
      </div>

      <CreateOrderForm
        isOpen={openOrderModal}
        onClose={() => setOpenOrderModal(!openOrderModal)}
        refreshProducts={handleGetProducst}
      />
      <div className="">
        <TableOrders products={products} refreshProducts={handleGetProducst} />
      </div>
    </div>
  );
};

export default AdminDashboard;
