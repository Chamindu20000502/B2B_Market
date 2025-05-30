import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

const columns = [
  {
    width: 100,
    label: 'Item Name',
    dataKey: 'itemName',
  },
  {
    width: 50,
    label: 'Quantity',
    dataKey: 'quantity',
    numeric: true,
  },
  {
    width: 100,
    label: 'Shop Name',
    dataKey: 'shopName',
  },
  {
    width: 100,
    label: 'Order Number',
    dataKey: 'orderNumber',
    numeric: true,
  },
  {
    width: 100,
    label: 'Status',
    dataKey: 'status',
  },
  {
    width: 100,
    label: 'Ordered Data',
    dataKey: 'orderedDate',
  },
  {
    width: 100,
    label: 'Days to Receive',
    dataKey: 'daysToReceive',
    numeric: true,
  },
  {
    width: 100,
    label: 'Payment Method',
    dataKey: 'paymentMethod',
  },
  {
    width: 100,
    label: 'Total Price',
    dataKey: 'totalPrice',
    numeric: true,
  },
];

const rows = [
  {
    itemName: 'Item 1',
    quantity: 2,
    shopName: 'Shop A',
    orderNumber: 12345,
    status: 'Shipped',
    orderedDate: '2023-10-01',
    daysToReceive: 5,
    paymentMethod :'Credit Card',
    totalPrice: 50.00,
  },
  {
    itemName: 'Item 2',
    quantity: 1,
    shopName: 'Shop B',
    orderNumber: 12346,
    status: 'Delivered',
    orderedDate: '2023-10-02',
    daysToReceive: 3,
    paymentMethod :'PayPal',
    totalPrice: 30.00,
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align={column.numeric || false ? 'right' : 'left'}
          style={{ width: column.width }}
          sx={{ backgroundColor: 'background.paper' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? 'right' : 'left'}
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  return (
    <div>
      <Stack direction='row' sx={{alignItems:'center'}}>
        <Paper elevation={2} sx={{backgroundColor:'#4169E1',color:'white',padding:'0rem'}}><h2 style={{marginRight:'1rem',marginLeft:'1rem'}}>Orders</h2></Paper>
        <Stack direction='row' sx={{alignItems:'center',marginBottom:'1rem',marginLeft:'3rem'}}>
          <Typography sx={{fontWeight:'bold'}}>Status : </Typography>
          <Stack direction='row' sx={{alignItems:'center'}}><Checkbox sx={{floodColor:'red'}} defaultChecked /><Typography>del</Typography></Stack>
          <Stack direction='row' sx={{alignItems:'center'}}><Checkbox /><Typography>undel</Typography></Stack>
        </Stack>
      </Stack>
    <Paper style={{ height: '30rem', width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
    </div>
  );
}








