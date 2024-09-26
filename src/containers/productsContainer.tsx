'use client'
import React, { useEffect, useState } from 'react'
import TableProducts from '../components/tableProducts'
import { createProductService, deleteProductService, productsService, updateProductService } from '../services/product.service'
import { Button } from '@mui/material'
import { Modal } from '@mui/material';
import { useDialogs } from '@toolpad/core/useDialogs';
import DialogAddProduct from '../components/dialogAddProduct'
import DialogEditProduct from '../components/dialogEditProduct'
import { v4 as uuidv4 } from 'uuid';
import { activateProductService, deactivateProductService } from '../services/product.service';
import { EUserRole } from '@/app/interfaces/user';

export default function productsContainer({ role }: { role: EUserRole } ) {
  const dialogs = useDialogs();

  const [products, setProducts] = useState<any>([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    const response = await productsService()
    setProducts(response)
  }

  const handleCreateProduct = async (data: any) => {
    await createProductService(data).then((res: any) => {
      console.log(res)
      getProducts()
    })
  }

  const openModalCreateProduct = async () => {
    const result = await dialogs.open(DialogAddProduct, undefined, {
      onClose: async (result: any) => {
        console.log(result)
        if (result) {
          const data = {
            id: uuidv4(),
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
    // const confirmed = await dialogs.confirm('¿Estás seguro de que deseas agregar este producto?', {
    //   title: 'Agregar Producto',
    //   okText: 'Agregar',
    //   cancelText: 'Cancelar',
    // });
  }

  const handleDeleteProduct = async (id: string) => {
    await deleteProductService(id).then((res: any) => {
      console.log(res)
      getProducts()
    })
  }

  const handleEditProduct = async (id: string) => {
    const product = products.find((product: any) => product.id === id)
    console.log(product)
    const result = await dialogs.open(DialogEditProduct, product, {
      onClose: async (result: any) => {
        console.log(result)
        const data = {
          price: result.price,
          translations: [{
            language: 'es',
            description: result.productName,
          }]
        }
        if (result) {
          updateProductService(id, data).then((res: any) => {
            console.log(res)
            getProducts()
          })
        }
      },
    });
  }

  const changeStatusProduct = async (id: string) => {
    if (products.find((product: any) => product.id === id)?.isActive) {
      await deactivateProductService(id).then((res: any) => {
        console.log(res)
        getProducts()
      })
    } else {
      await activateProductService(id).then((res: any) => {
        console.log(res)
        getProducts()
      })
    }
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
        <TableProducts role={role} products={products} handleDeleteProduct={handleDeleteProduct} handleEditProduct={handleEditProduct} changeStatusProduct={changeStatusProduct} />
      </div>
    </div>
  )
}
