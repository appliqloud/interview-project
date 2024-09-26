import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { IconButton, Switch } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { EUserRole } from '@/app/interfaces/user';

export default function tableProducts({ products, handleDeleteProduct, handleEditProduct, changeStatusProduct, role }: { products: any, handleDeleteProduct: any, handleEditProduct: any, changeStatusProduct: any, role: EUserRole }) {

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
          {products.map((row: any) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.translations[0].description}
              </TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">
                <Switch
                  disabled={role !== EUserRole.ADMIN}
                  checked={row.isActive}
                  onChange={() => changeStatusProduct(row.id)}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              </TableCell>
              <TableCell align="right">
                <IconButton disabled={role !== EUserRole.ADMIN} aria-label="edit" onClick={() => handleEditProduct(row.id)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton disabled={role !== EUserRole.ADMIN} aria-label="delete" onClick={() => handleDeleteProduct(row.id)}>
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
