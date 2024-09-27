import React from "react";

// Define la interfaz para las props del ModalWrapper
interface ModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // 'children' puede ser cualquier nodo de React
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null; // No renderiza el modal si no está abierto.

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      {/* Contenido del modal */}
      <div className="bg-white rounded-lg shadow-lg p-6 z-10 w-11/12 max-w-md relative">
        {/* Botón de cerrar */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Aquí renderizamos el contenido dinámico del modal */}
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
