import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './ProductPage.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories) {
  return { name, calories };
}



export default function ProductInfo(props) {
  const rows = [
  createData('Brand',props.data.attributes[0].brand_name),
  createData('Model',props.data.attributes[0].model),
  createData('Place of origin',props.data.attributes[0].origin),
  createData('Payment methods',props.data.attributes[0].payment),
  createData('Shipping',props.data.attributes[0].shipping),
  createData('Single package size',props.data.attributes[0].single_package_size),
  createData('Single package weight',props.data.attributes[0].single_package_weight),
  createData('Warrenty',props.data.attributes[0].warrenty),
];
  return (
    <div>
        <h2>Product Info</h2>
        <div id='product-info-table'>
            <TableContainer component={Paper} >
      <Table aria-label="customized table" sx={{p:5}}>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right">{row.calories}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
    </div>
  );
}
