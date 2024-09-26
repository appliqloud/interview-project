import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    // language resources
    resources: {
        es: {
            translation: {
                navProduct: "Productos",
                navOrders: "Órdenes",
                navLogOut: "Desloguearse",
                titleProduct: "Productos",
                textAdd: "Agregar Producto",
                textTableProduct: "Producto",
                textTableDescription: "Descripción",
                textTablePrice: "Precio",
                btnAdd: "Editar",
                btnDelete: "Eliminar",
                btnDeactive: "Desactivar",
                btnActivate: "Activar",
                btnSave: "Guadar",
                btnBack: "Regresar",
                titleOrders: "Órdenes",
                titleCreateOrders: "Crear Órden",
                textTableId: "Id Producto",
                textTableStatus: "Estatus",
                textTableQuantity: "Cantidad",
                textTableTotal: "Total",
                btnReceive: "Recibida",
                btnCancel: "Cancelar",
                textWrong: "Algo salio mal..",
                textEditProduct: "Editar Productos",
                name: "Nombre",
                description: "Descripción",
                price:"Precio",
                textCreateOrder: "Crear Órden",
                productID: "Id Producto",
                Quantity: "Cantidad",
            }
          },
        en: {
        translation: {
            navProduct: "Products",
            navOrders: "Orders",
            navLogOut: "Log Out",
            titleProduct: "Product",
            textAdd: "Add Product",
            textTableProduct: "Product",
            textTableDescription: "Description",
            textTablePrice: "Price",
            btnAdd: "Edit",
            btnDelete: "Delete",
            btnDeactive: "Deactivate",
            btnActivate: "Activate",
            btnSave: "Save",
            btnBack: "Back",
            titleOrders: "Orders",
            titleCreateOrders: "Create Order",
            textTableId: "Product Id",
            textTableStatus: "Status",
            textTableQuantity: "Quantity",
            textTableTotal: "Total",
            btnReceive: "Receive",
            btnCancel: "Cancel",
            textWrong: "Something went wrong!!",
            textEditProduct: "Edit Product",
            name: "Name",
            description: "Description",
            price:"Price",
            textCreateOrder: "Create Order",
            productID: "Product Id",
            Quantity: "Quantity",
        }
      },
      
    }
  });

export default i18n;