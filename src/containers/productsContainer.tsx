// React
'use client'
import React, { useEffect, useState } from 'react'

// Components
import TableProducts from '../components/tableProducts'
import DialogAddProduct from '../components/dialogAddProduct'
import DialogEditProduct from '../components/dialogEditProduct'
// Services
import { createProductService, deleteProductService, productsService, updateProductService } from '../services/product.service'
import { activateProductService, deactivateProductService } from '../services/product.service';
import { v4 as uuidv4 } from 'uuid';

// Material UI
import { Button } from '@mui/material'
import { useDialogs } from '@toolpad/core/useDialogs';

// Interfaces
import { EUserRole } from '@/app/interfaces/user';
import { IProductAddModel } from '@/app/model/product.add.model'
import { IProduct } from '@/app/interfaces/product'

export default function productsContainer({ role }: { role: EUserRole }) {

  const [products, setProducts] = useState<any>([])
  const dialogs = useDialogs();


  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await productsService()
    setProducts(response)
  }

  const handleCreateProduct = async (data: IProduct) => {
    await createProductService(data).then((res: IProduct) => {
      getProducts()
    })
  }

  const handleUpdateProduct = async (data: IProduct) => {
    await updateProductService(data.id, data).then((res: IProduct) => {
      getProducts()
    })
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteProductService(id).then((res: IProduct) => {
      getProducts()
    })
  }

  const openModalEditProduct = async (id: string) => {
    const product = products.find((product: IProduct) => product.id === id)
    await dialogs.open(DialogEditProduct as any, product, {
      onClose: async (result: IProductAddModel) => {
        if (result) {
          const data: IProduct = {
            id: product.id,
            price: result.price,
            isActive: product.isActive,
            translations: [{
              language: product.translations[0].language,
              description: result.productName,
            }]
          }
          handleUpdateProduct(data)
        }
      },
    });
  }

  const openModalCreateProduct = async () => {
    await dialogs.open(DialogAddProduct as any, undefined, {
      onClose: async (result: IProductAddModel) => {
        if (result) {
          const data: IProduct = {
            id: uuidv4(),
            isActive: true,
            price: result.price,
            translations: [{
              language: 'es',
              description: result.productName,
            }]
          }
          handleCreateProduct(data)
        }
      },
    });
  }

      // const confirmed = await dialogs.confirm('¿Estás seguro de que deseas agregar este producto?', {
    //   title: 'Agregar Producto',
    //   okText: 'Agregar',
    //   cancelText: 'Cancelar',
    // });

  const changeStatusProduct = async (id: string) => {
    const isActiveProduct = products.find((product: IProduct) => product.id === id)?.isActive
    if (isActiveProduct) {
      await deactivateProductService(id)
    } else {
      await activateProductService(id)
    }
    getProducts()
  }

  return (
    <div className='w-full h-full flex flex-col gap-8'>
      <div className='flex justify-between'>
        <h3>Lista de Productos</h3>
        <Button disabled={role !== EUserRole.ADMIN} variant="contained" color="primary" onClick={openModalCreateProduct}>
          Agregar Producto
        </Button>
      </div>
      <div className='w-full'>
        <TableProducts role={role} products={products} handleDeleteProduct={handleDeleteProduct} handleEditProduct={openModalEditProduct} changeStatusProduct={changeStatusProduct} />
      </div>
    </div>
  )
}
