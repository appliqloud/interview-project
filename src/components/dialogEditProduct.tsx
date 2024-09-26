'use client'
import * as React from 'react';
import { DialogsProvider, useDialogs, DialogProps } from '@toolpad/core/useDialogs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { ChangeEvent, useState } from 'react';
import { TextField } from '@mui/material';

export default function DialogEditProduct({ payload, open, onClose }: any) {
    debugger
    const [formValues, setFormValues] = useState({
        productName: payload?.translations[0]?.description || '',
        price: payload?.price || 0,
    });

    const [formErrors, setFormErrors] = useState({
        productName: null,
        price: null,
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>
    ) => {
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
                <DialogTitle>Editar Producto</DialogTitle>
                <DialogContent>
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="email">Nombre del producto</label>
                            <TextField
                                name='productName'
                                value={formValues.productName}
                                onChange={handleInputChange}
                                size='small'
                                id="productName"
                                helperText={formErrors.productName}
                                error={Boolean(formErrors.productName)}
                            />
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <label htmlFor="price">Precio</label>
                            <TextField
                                type='number'
                                size='small'
                                id="password"
                                name='price'
                                value={formValues.price}
                                onChange={handleInputChange}
                                error={Boolean(formErrors.price)}
                                helperText={formErrors.price}
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