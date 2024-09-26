import { IProduct } from "@/app/interfaces/product"
import axiosInstance from "@/utils/axios"

export const productsService = async () => {
    try {
        const response = await axiosInstance.get('products/')
        return response.data
    } catch (error) {
        throw error
    }
}

export const getProductByIdService = async (id: string) => {
    try {
        const response = await axiosInstance.get(`products/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}

export const createProductService = async (data: IProduct) => {
    try {
        const response = await axiosInstance.post('products/', data)
        return response.data
    } catch (error) {
        throw error
    }
}

export const updateProductService = async (id: string, data: any) => {
    try {
        const response = await axiosInstance.put(`products/${id}`, data)
        return response.data
    } catch (error) {
        throw error
    }
}
export const deleteProductService = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`products/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const activateProductService = async (id: string) => {
    try {
        const response = await axiosInstance.put(`products/activate/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const deactivateProductService = async (id: string) => {
    try {
        const response = await axiosInstance.put(`products/deactivate/${id}`)
        return response.data
    } catch (error) {
        throw error
    }
}
