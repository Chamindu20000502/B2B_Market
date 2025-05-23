import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import './ProductPage.css'

export default function Ratings(props) {
  function rowContent(index) {
  return (
    <React.Fragment sx={{width:'100%'}}>
      <TableCell sx={{width:'100%'}}>
        <Stack sx={{width:'100%'}}>
            <Stack direction='row' spacing={1} sx={{alignItems:'center'}}>
                <Avatar sx={{width:'2rem',height:'2rem'}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <h6>{props.data.reviews[index].buyer_id}</h6>
            </Stack>
            
            <Rating value={props.data.reviews[index].rate} size='small' readOnly />
            <p>{props.data.reviews[index].description}</p>
        </Stack>
      </TableCell>
    </React.Fragment>
  );
}

  return (
    <div>
        <h2>Ratings and Reviews</h2>
    <div id='ratings-content' style={{width:'100%'}}>
        <Paper style={{ height: 400, width: '100%' }}>
            <TableVirtuoso sx={{width:'100%'}}
                data={props.data.reviews}
                itemContent={rowContent}
            />
        </Paper>
    </div>
    </div>
  );
}
