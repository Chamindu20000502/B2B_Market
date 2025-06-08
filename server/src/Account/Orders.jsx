import React, { useEffect, useState } from 'react';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const columns = [
  {
    width: 100,
    label: 'Item Name',
    dataKey: 'name',
  },
  {
    width: 50,
    label: 'Quantity',
    dataKey: 'qty',
    numeric: true,
  },
  {
    width: 100,
    label: 'Shop Name',
    dataKey: 'company_name',
  },
  {
    width: 100,
    label: 'Order Number',
    dataKey: 'order_number',
    numeric: true,
  },
  {
    width: 100,
    label: 'Status',
    dataKey: 'order_state',
  },
  {
    width: 100,
    label: 'Ordered Data',
    dataKey: 'placed_date',
  },
  {
    width: 100,
    label: 'Days to Receive',
    dataKey: 'eta_days',
    numeric: true,
  },
  {
    width: 100,
    label: 'Payment Method',
    dataKey: 'pay_method',
  },
  {
    width: 100,
    label: 'Total Price',
    dataKey: 'price',
    numeric: true,
  },
];

const theme = createTheme({
  palette: {
    color: {
      main: '#4169E1', // Royal Blue
    },
  }});

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
  const [data, setData] = useState(null);
  const [status_list, setStatusList] = useState(['1']);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API+`/account/1/buy/orders/${status_list}`);
        setData(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }
  fetchData();
  }, []);

  async function OnCheckClicked(event)
  {
    const value = event.target.value;
    let newStatusList = [...status_list];

    if (event.target.checked) {
      newStatusList.push(value);
    } else {
      newStatusList = newStatusList.filter(status => status !== value);
    }

    setStatusList(newStatusList);

    if (newStatusList.length !== 0) {
      try
      {
        const response = await axios.get(import.meta.env.VITE_API+`/account/1/buy/orders/${newStatusList}`);
        setData(response.data);
      }catch (error) {
        console.error(error.message);
      }
    }
  }

  return (
    <div>
      {data ? <div>
      <Stack direction='row' sx={{alignItems:'center'}}>
        <Paper elevation={2} sx={{backgroundColor:'#4169E1',color:'white',padding:'0rem'}}><h2 style={{marginRight:'1rem',marginLeft:'1rem'}}>Orders</h2></Paper>
        <ThemeProvider theme={theme}>
          <Stack direction='row' sx={{alignItems:'center',marginBottom:'1rem',marginLeft:'3rem'}}>
            <Typography sx={{fontWeight:'bold'}}>Status : </Typography>
            <Stack direction='row' sx={{alignItems:'center',marginRight:'2rem'}}><Checkbox value={1} sx={{color:'color.main'}} defaultChecked onClick={OnCheckClicked}/><Typography>Pending</Typography></Stack>
            <Stack direction='row' sx={{alignItems:'center',marginRight:'2rem'}}><Checkbox value={2} sx={{color:'color.main'}} onClick={OnCheckClicked}/><Typography>Confirmed</Typography></Stack>
            <Stack direction='row' sx={{alignItems:'center',marginRight:'2rem'}}><Checkbox value={3} sx={{color:'color.main'}} onClick={OnCheckClicked}/><Typography>In Progress</Typography></Stack>
            <Stack direction='row' sx={{alignItems:'center',marginRight:'2rem'}}><Checkbox value={4} sx={{color:'color.main'}} onClick={OnCheckClicked}/><Typography>Shipped</Typography></Stack>
            <Stack direction='row' sx={{alignItems:'center',marginRight:'2rem'}}><Checkbox value={5} sx={{color:'color.main'}} onClick={OnCheckClicked}/><Typography>In Transit</Typography></Stack>
            <Stack direction='row' sx={{alignItems:'center',marginRight:'2rem'}}><Checkbox value={6} sx={{color:'color.main'}} onClick={OnCheckClicked}/><Typography>Delivered</Typography></Stack>
          </Stack>
        </ThemeProvider>
      </Stack>
    <Paper style={{ height: '30rem', width: '100%' }}>
      <TableVirtuoso
        data={data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
    </div> :null}
    </div>
  );
}








