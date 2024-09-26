import { useAuthStore } from "@/app/lib/authStore";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EditProductForm from "./EditProductForm";
import { useProductStore } from "@/app/lib/userProductStore";
import classNames from "classnames";

const roleMaster = "ADMIN";

const TableProducts = ({ products, refreshProducts }: any) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { isAuthenticated, role } = useAuthStore();
  const { deleteProduct, activateProduct, deactivateProduct } =
    useProductStore();

  // Función para manejar la apertura del modal con el producto seleccionado
  const openEditProduct = (product: any) => {
    console.log("product", product);

    setSelectedProduct(product); // Establecer el producto seleccionado
    setOpenModal(true); // Abrir el modal
  };

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);
    refreshProducts();
  };

  const handleActivateProduct = async (productId: string) => {
    await activateProduct(productId);
    refreshProducts();
  };

  const handleDeactivateProduct = async (productId: string) => {
    await deactivateProduct(productId);
    refreshProducts();
  };

  return (
    <div>
      <EditProductForm
        isOpen={openModal}
        onClose={() => setOpenModal(!openModal)}
        refreshProducts={refreshProducts}
        product={selectedProduct}
      />
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Id</th>
            <th className="px-4 py-2">Precio</th>
            <th className="px-4 py-2">Translations</th>
            <th className="px-4 py-2">Actions</th>
            <th className="px-4 py-2">Activate</th>
            <th className="px-4 py-2">Deactivate</th>
          </tr>
        </thead>
        <tbody>
          {/* Aquí se deben mostrar los productos */}
          {products.map((product: any) => (
            <tr key={product.id} className="bg-gray-100">
              <td className="border px-4 py-2">{product.id}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">
                {product.translations.map((translation: any, index: number) => {
                  return (
                    <div key={index}>
                      <p>{translation.language}</p>
                      <p>{translation.name}</p>
                    </div>
                  );
                })}
              </td>
              <td className="border px-4 py-2 ">
                <button
                  className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 ${
                    role !== roleMaster && "cursor-not-allowed opacity-25 "
                  }`}
                  onClick={() => openEditProduct(product)}
                  disabled={role !== roleMaster}
                >
                  Edit
                </button>
                <button
                  className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ${
                    role !== roleMaster && "cursor-not-allowed opacity-25 "
                  }`}
                  onClick={() => handleDeleteProduct(product.id)}
                  disabled={role !== roleMaster}
                >
                  Delete
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className={classNames(
                    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
                    {
                      "cursor-not-allowed opacity-25 bg-gray-500 hover:bg-gray-500":
                        product.isActive || role !== roleMaster,
                    }
                  )}
                  onClick={() => handleActivateProduct(product.id)}
                  // Deshabilitar si el producto ya está activo
                  // Sólo puede utilizarlo el admin
                  disabled={product.isActive || role !== roleMaster}
                >
                  Activate
                </button>
              </td>
              <td className="border px-4 py-2">
                <button
                  className={classNames(
                    "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
                    {
                      "cursor-not-allowed opacity-25 bg-gray-500 hover:bg-gray-500":
                        !product.isActive || role !== roleMaster,
                    }
                  )}
                  onClick={() => handleDeactivateProduct(product.id)}
                  disabled={!product.isActive || role !== roleMaster}
                >
                  Deactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProducts;
