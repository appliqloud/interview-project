import { Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDialogs } from '@toolpad/core/useDialogs';
import DialogAddOrder from '@/components/dialogAddOrder';
import { cancelOrderService, changeStatusOrderService, createOrderService, getOrdersService } from '@/services/order.service';
import { v4 as uuidv4 } from 'uuid';
import TableOrder from '@/components/tableOrder';
import { EUserRole } from '@/app/interfaces/user';

function orderContainer({ role }: { role: EUserRole }) {
    const dialogs = useDialogs();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = async () => {
        const response = await getOrdersService()
        setOrders(response)
    }

    const openModalCreateOrder = async () => {
        const result = await dialogs.open(DialogAddOrder, undefined, {
            onClose: async (result: any) => {
                if (result) {
                    const response = await createOrderService(result)
                    getOrders()
                }
            },
        });
    }

    const handleCancelOrder = async (id: string) => {
        const response = await cancelOrderService(id)
        getOrders()
    }

    const changeStatusOrder = async (id: string) => {
        const response = await changeStatusOrderService(id)
        getOrders()
    }

    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div className='flex justify-between'>
                <h3>Lista de Ordenes</h3>
                <Button disabled={role !== EUserRole.USER} variant="contained" color="primary" onClick={openModalCreateOrder}>
                    Agregar Orden
                </Button>

            </div>
            <div className='w-full'>
                <TableOrder role={role} orders={orders} handleCancelOrder={handleCancelOrder} changeStatusOrder={changeStatusOrder} />
            </div>
        </div>
    )
}

export default orderContainer