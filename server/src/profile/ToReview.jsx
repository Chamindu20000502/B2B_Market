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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
    label: 'Ordered Data',
    dataKey: 'orderedDate',
  },
  {
    width: 100,
    label: 'Total Price',
    dataKey: 'totalPrice',
    numeric: true,
  },
  {
    width: 100,
    label: '',
    dataKey: 'button',
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

export default function ToReview() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const rows = [
  {
    itemName: 'Item 1',
    quantity: 2,
    shopName: 'Shop A',
    orderNumber: 12345,
    orderedDate: '2023-10-01',
    totalPrice: 50.00,
    button: <Button size='small' variant="contained" onClick={handleClickOpen}>
        Review
      </Button>
  },
  {
    itemName: 'Item 2',
    quantity: 1,
    shopName: 'Shop B',
    orderNumber: 12346,
    orderedDate: '2023-10-02',
    totalPrice: 30.00,
    button: <Button size='small' variant="contained" onClick={handleClickOpen}>
        Review
      </Button>
  },
];

  return (
    <div>
      <Stack direction='row' sx={{alignItems:'center'}}>
        <Paper elevation={2} sx={{backgroundColor:'#4169E1',color:'white',padding:'0rem'}}><h2 style={{marginRight:'1rem',marginLeft:'1rem'}}>To Review</h2></Paper>
      </Stack>
    <Paper style={{ height: '30rem', width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>




    <React.Fragment>
      
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          },
        }}
      >
        <DialogTitle>Help others in your industry — share your experience.</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your feedback on [Product Name] can help fellow professionals make informed decisions. Please share your review below.
          </DialogContentText>
          <Rating
          sx={{marginTop: '2rem'}}
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            label="Review"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div>
  );
}
