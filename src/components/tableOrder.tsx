// React
import * as React from 'react';
import { useEffect, useState } from 'react';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Checkbox, IconButton, Switch } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

// Services
import { getProductByIdService } from '@/services/product.service';

// Interfaces
import { EUserRole } from '@/app/interfaces/user';
interface ProductNameProps {
    productId: string;
}

export const ProductName: React.FC<ProductNameProps> = ({ productId }) => {
    const [productName, setProductName] = useState<string>('');

    useEffect(() => {
        const fetchProductName = async () => {
            try {
                const res = await getProductByIdService(productId);
                setProductName(res.translations[0].description);
            } catch (error) {
                console.error('Error al obtener el producto:', error);
                setProductName('Producto no disponible...');
            }
        };

        fetchProductName();
    }, [productId]);

    return <span>{productName || 'Cargando...'}</span>;
};


export default function tableOrder({ orders, handleCancelOrder, changeStatusOrder, role }: { orders: any, handleCancelOrder: any, changeStatusOrder: any, role: EUserRole }) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Producto</TableCell>
                        <TableCell align="right">Cantidad</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell align="right">Recibir</TableCell>
                        <TableCell align="right">Cancelar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.sort((a: any, b: any) => {
                        // Si el estado es 'PENDING', queremos que sea menor
                        if (a.status === 'PENDING' && b.status !== 'PENDING') return -1;
                        if (a.status !== 'PENDING' && b.status === 'PENDING') return 1;
                        return 0; // Si ambos tienen el mismo estado, no los reordenamos
                    }).map((row: any) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                <ProductName productId={row.productId} />
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">
                                ${row.total}
                            </TableCell>
                            <TableCell align="right">
                                {role === EUserRole.ADMIN && (

                                    <Checkbox disabled={row.status !== 'PENDING'} checked={row.status !== 'PENDING'} onChange={() => changeStatusOrder(row.id)} />
                                )}
                            </TableCell>
                            <TableCell align="right">
                                {row.status === 'CANCELLED' ? <span>Cancelada</span> : (
                                    <IconButton aria-label="delete" onClick={() => handleCancelOrder(row.id)}>
                                        <ClearIcon />
                                    </IconButton>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
