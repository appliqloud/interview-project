"use client";
import { useApi } from "@/app/hooks/useApiRequest";
import { useAuthStore } from "@/app/lib/authStore";
import axios from "axios";
// import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CreateProductForm from "./components/CreateProductForm";
import TableProducts from "./components/TableProducts";
import { useProductStore } from "@/app/lib/userProductStore";
import useTokenExpiration from "@/app/hooks/useTokenExpiration";
import LanguageChanger from "../components/LanguageChanger";

// import { useAuthStore } from "../store/authStore"; // Importamos el store

const AdminDashboard = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
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
        {role === "ADMIN" && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setOpenModal(!openModal)}
            disabled={role !== "ADMIN"}
          >
            add product
          </button>
        )}
      </div>

      <CreateProductForm
        isOpen={openModal}
        onClose={() => setOpenModal(!openModal)}
        refreshProducts={handleGetProducst}
      />

      <div className="">
        <TableProducts
          products={products}
          refreshProducts={handleGetProducst}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
