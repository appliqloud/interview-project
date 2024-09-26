// React
import React, { useEffect, useState } from 'react'

// Hooks
import { useDialogs } from '@toolpad/core/useDialogs';

// Material UI
import { Button, CircularProgress } from '@mui/material';

// Components
import DialogAddOrder from '@/components/dialogAddOrder';
import TableOrder from '@/components/tableOrder';

// Services
import { cancelOrderService, changeStatusOrderService, createOrderService, getOrdersService } from '@/services/order.service';

// Interfaces
import { EUserRole } from '@/app/interfaces/user';

function orderContainer({ role }: { role: EUserRole }) {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState<boolean>(true)
    const dialogs = useDialogs();


    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = async () => {
        const response = await getOrdersService()
        setOrders(response)
        setLoading(false)
    }

    const openModalCreateOrder = async () => {
        const result = await dialogs.open(DialogAddOrder, undefined, {
            onClose: async (result: any) => {
                if (result) {
                    await createOrderService(result)
                    getOrders()
                }
            },
        });
    }

    const handleCancelOrder = async (id: string) => {
        await cancelOrderService(id)
        getOrders()
    }

    const changeStatusOrder = async (id: string) => {
        await changeStatusOrderService(id)
        getOrders()
    }

    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div className='flex justify-between'>
                <h3>Lista de Ordenes</h3>
                <Button disabled={role !== EUserRole.USER} variant="contained" color="primary" onClick={openModalCreateOrder}>
                    Crear Orden
                </Button>

            </div>
            <div className='w-full'>
                {orders.length === 0 && !loading ? <div className='w-full h-full flex items-center justify-center'><h3>No hay ordenes</h3></div> : (
                    loading ? <div className='w-full h-full flex items-center justify-center'><CircularProgress /></div> : (
                        <TableOrder role={role} orders={orders} handleCancelOrder={handleCancelOrder} changeStatusOrder={changeStatusOrder} />
                    )
                )}
            </div>
        </div>
    )
}

export default orderContainer