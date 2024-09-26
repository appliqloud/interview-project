import React from 'react'
import TableProducts from '../components/tableProducts'

export default function productsContainer() {
  return (
    <div className='w-full h-full flex flex-col gap-8'>
        <h3>Lista de Productos</h3>
        <div className='w-full'>
            <TableProducts />
        </div>
    </div>
  )
}
