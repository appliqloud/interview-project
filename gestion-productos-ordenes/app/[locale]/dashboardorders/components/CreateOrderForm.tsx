"use client";
import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
// import ModalWrapper from "../../Layout/ModalWrapper";
import { useProductStore } from "@/app/lib/userProductStore";
import ModalWrapper from "../../Layout/ModalWrapper";
// import ModalWrapper from "@/app/Layout/ModalWrapper";

interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  refreshProducts: () => void;
}

interface OptionType {
  value: string;
  // label: string;
}

// const options: OptionType[] = [
//   { value: "1", label: "Producto 1" },
//   { value: "2", label: "Producto 2" },
//   { value: "3", label: "Producto 3" },
//   { value: "4", label: "Producto 4" },
// ];

const CreateOrderForm: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  refreshProducts,
}) => {
  const { addProduct, products, createOrder, getOrders } = useProductStore(); // Usamos la función addProduct de la store
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    setSelectedProduct(selectedOption ? selectedOption.value : ""); // Aceptamos null como valor
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("selectedProduct", selectedProduct);
    createOrder(selectedProduct, quantity);
    getOrders();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-2xl mb-4">Crear Orden</h1>
        <form onSubmit={handleSubmit}>
          {/* Select para seleccionar un solo producto */}
          <div className="mb-4">
            <label htmlFor="products" className="block text-gray-700">
              Selecciona Producto
            </label>
            <Select
              id="products"
              options={products.map((product) => ({
                value: product.id,
                label: product.id,
              }))}
              onChange={handleChange}
              className="basic-select"
              classNamePrefix="select"
            />
          </div>

          {/* Input para la cantidad */}
          <div className="mb-4">
            <label htmlFor="quantity" className="block text-gray-700">
              Cantidad
            </label>
            <input
              type="number"
              id="quantity"
              className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>

          {/* Botón para enviar */}
          <div className="mb-4">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded"
              disabled={loading || !selectedProduct} // Deshabilitar si no hay producto seleccionado
            >
              {loading ? "Creando..." : "Crear Orden"}
            </button>
          </div>

          {/* Mostrar errores */}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </ModalWrapper>
  );
};

export default CreateOrderForm;
