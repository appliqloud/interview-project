import axiosInstance from "@/utils/axios"

export const createOrderService = async (data: any) => {
    try {
        const response = await axiosInstance.post('orders/', data)
        return response.data
    } catch (error) {
        throw error
    }
}
export const getOrdersService = async () => {
    try {
        const response = await axiosInstance.get('orders/')
        return response.data
    } catch (error) {
        throw error
    }
}
export const changeStatusOrderService = async (id: string) => {
    try {
        const response = await axiosInstance.put(`orders/receive/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const cancelOrderService = async (id: string) => {
    try {
        const response = await axiosInstance.put(`orders/cancel/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

