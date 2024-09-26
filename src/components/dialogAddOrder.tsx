// React
'use client'
import * as React from 'react';
import { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';

// MUI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { TextField, Select, MenuItem, SelectChangeEvent, FormHelperText } from '@mui/material';

// Services
import { productsService } from '@/services/product.service';

// Interfaces
import { IOrderAddModel } from '@/app/model/order.add.model';
import { IProduct } from '@/app/interfaces/product';


export default function DialogAddOrder({ payload, open, onClose }: any) {
    const [formValues, setFormValues] = useState<IOrderAddModel>({
        productId: "",
        quantity: 0,
    });

    const [formErrors, setFormErrors] = useState({
        productId: null,
        quantity: null,
    });

    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await productsService()
        const listProducts = response.filter((product:  IProduct) => product.isActive)
        setProducts(listProducts)
    }

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            onClose(formValues as IOrderAddModel);
        }
    }

    const validateForm = () => {
        const errors: { productId: string | null, quantity: string | null } = {
            productId: null,
            quantity: null,
        };
        
        if (!formValues.productId) {
            errors.productId = 'El producto es requerido';
        }
        if (!formValues.quantity) {
            errors.quantity = 'La cantidad es requerida';
        }
        setFormErrors(errors as any);
        return Object.values(errors).every(error => error === null);
    }

    return (
        <Dialog fullWidth open={open} onClose={() => onClose()}>
            <form onSubmit={handleSubmit} noValidate className='w-full'>
                <DialogTitle>Crear Orden</DialogTitle>
                <DialogContent>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="productId">Producto</label>
                            <Select
                                name='productId'
                                value={formValues.productId}
                                onChange={handleSelectChange}
                                size='small'
                                id="productId"
                                error={Boolean(formErrors.productId)}
                            >
                                {products && products.map((product: any) => (
                                    <MenuItem key={product.id} value={product.id}>{product.translations[0].description}</MenuItem>
                                ))}
                            </Select>
                            <FormHelperText className='text-red-500'>{formErrors.productId}</FormHelperText>
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="quantity">Cantidad</label>
                            <TextField
                                type='number'
                                size='small'
                                id="quantity"
                                name='quantity'
                                value={formValues.quantity}
                                onChange={handleInputChange}
                                error={Boolean(formErrors.quantity)}
                            />
                            <FormHelperText className='text-red-500'>{formErrors.quantity}</FormHelperText>
                        </div>
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button type='button' variant="outlined" onClick={() => onClose()}>Cancelar</Button>
                    <Button variant="contained" type='submit'>Agregar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}