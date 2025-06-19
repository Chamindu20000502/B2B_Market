import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
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
import axios from 'axios';
import Alert from '@mui/material/Alert';

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
    label: 'Ordered Data',
    dataKey: 'placed_date',
  },
  {
    width: 100,
    label: 'Total Price',
    dataKey: 'price',
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
  const userId = 1; // Replace with actual user ID if needed
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [data, setData] = useState(null);
  const [reviewData, setReviewData] = useState({});
  const [isShowWarnig, setIsShowWarning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API + `/account/${userId}/buy/reviews`);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  },[]);


  let modifiedData = [];  
  if(data)
  {
    for (let i = 0; i < data.length; i++) {
      if(data[i].status_id === 6)
      {
        modifiedData.push(
          {
            name: data[i].name,
            qty: data[i].qty,
            company_name: data[i].company_name,
            order_number: data[i].order_number,
            placed_date: data[i].placed_date,
            price: data[i].price,
            button: <Button size='small' variant="contained" value={data[i].order_number} onClick={handleClickOpen}>
              Review
            </Button>
          });
      }else {
        modifiedData.push(
          {
            name: data[i].name,
            qty: data[i].qty,
            company_name: data[i].company_name,
            order_number: data[i].order_number,
            placed_date: data[i].placed_date,
            price: data[i].price,
            button: 'Reviewed'
          });
        }
    }
  }

  function handleClickOpen(event) {
    setOpen(true);
    setReviewData({order_number: event.target.value});
    console.log(reviewData);
  }

  function OnReview(event)
  {
    if(event.target.name === 'review')
    {
      setReviewData((previousValue) => {
        return {...previousValue, review: event.target.value};
      });
    }else if(event.target.name === 'rating')
    {
      setValue(event.target.value);
      setReviewData((previousValue) => {
        return {...previousValue, rating: event.target.value};
      });
    }
    setIsShowWarning(false);
    console.log(reviewData);
  }

  async function HandleSubmit()
  {
    if(reviewData.rating)
    {
      handleClose();
      try
      {
        const response = await axios.post(import.meta.env.VITE_API + `/account/${userId}/buy/reviews`, reviewData);
        try {
          const response = await axios.get(import.meta.env.VITE_API + `/account/${userId}/buy/reviews`);
          setData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }catch (error)
      {
        console.error('Error submitting review:', error);
      }
    }else
    {
      setIsShowWarning(true);
    }
  }

  function handleClose()
  {
    setOpen(false);
    setReviewData({});
    setValue(0);
  }

  return (
    <div>{data?<div>
      <Stack direction='row' sx={{alignItems:'center'}}>
        <Paper elevation={2} sx={{backgroundColor:'#4169E1',color:'white',padding:'0rem'}}><h2 style={{marginRight:'1rem',marginLeft:'1rem'}}>To Review</h2></Paper>
      </Stack>
    <Paper style={{ height: '30rem', width: '100%' }}>
      <TableVirtuoso
        data= {modifiedData}
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
              HandleSubmit();
            },
          },
        }}
      >
        <DialogTitle>Help others in your industry — share your experience.</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{marginBottom:'1rem'}}>
            Your feedback on [Product Name] can help fellow professionals make informed decisions. Please share your review below.
          </DialogContentText>

          {isShowWarnig ?<Alert variant="outlined" severity="warning">We’d appreciate it if you could rate your experience.</Alert> : null}

          <Rating
          sx={{marginTop:'1rem'}}
        name="rating"
        value={value}
        onChange={OnReview}
      />
          <TextField
          autoComplete='off'
            autoFocus
            required
            name='review'
            value={reviewData.review || ''}
            margin="dense"
            id="name"
            label="Review"
            fullWidth
            variant="standard"
            onChange={OnReview}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
    </div> : null}</div>
  );
}
