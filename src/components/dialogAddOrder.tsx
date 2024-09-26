'use client'
import * as React from 'react';
import { DialogsProvider, useDialogs, DialogProps } from '@toolpad/core/useDialogs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ChangeEvent, useState } from 'react';
import { TextField, Select, MenuItem, SelectChangeEvent, FormHelperText } from '@mui/material';
import { productsService } from '@/services/product.service';
import { useEffect } from 'react';
export default function DialogAddOrder({ payload, open, onClose }: DialogProps) {
    const [formValues, setFormValues] = useState({
        productId: "",
        quantity: "",
    });

    const [formErrors, setFormErrors] = useState({
        productId: null,
        quantity: null,
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await productsService()
        const listProducts = response.filter((product: any) => product.isActive)
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
        onClose(formValues as any);
    }
    return (
        <Dialog fullWidth open={open} onClose={() => onClose()}>
            <form onSubmit={handleSubmit} noValidate className='w-full'>
                <DialogTitle>Agregar Orden</DialogTitle>
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
                            <FormHelperText>{formErrors.productId}</FormHelperText>
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
                                helperText={formErrors.quantity}
                            />
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