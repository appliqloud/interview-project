// React
import * as React from 'react';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// Interfaces
import { EUserRole } from '@/app/interfaces/user';
import { IProduct } from '@/app/interfaces/product';

export default function tableProducts({ products, handleDeleteProduct, handleEditProduct, changeStatusProduct, role }: { products: IProduct[], handleDeleteProduct: any, handleEditProduct: any, changeStatusProduct: any, role: EUserRole }) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Precio</TableCell>
            <TableCell align="right">Estado</TableCell>
            <TableCell align="right">Editar</TableCell>
            <TableCell align="right">Eliminar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product: IProduct) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.translations[0].description}
              </TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right">
                <Switch
                  disabled={role !== EUserRole.ADMIN}
                  checked={product.isActive}
                  onChange={() => changeStatusProduct(product.id)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton disabled={role !== EUserRole.ADMIN} aria-label="edit" onClick={() => handleEditProduct(product.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton disabled={role !== EUserRole.ADMIN} aria-label="delete" onClick={() => handleDeleteProduct(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
