import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { TableVirtuoso } from 'react-virtuoso';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import './ProductPage.css'

const ratings = [
    {
        name:'Chamindu',
        imgUrl:'',
        rating:3,
        description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa quod amet odit dignissimos illo maiores similique rem aliquid quisquam? Commodi voluptatem fuga inventore libero corrupti debitis illum doloribus cupiditate deserunt?'
    },
    {
        name:'Dilshan',
        imgUrl:'',
        rating:3,
        description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa quod amet odit dignissimos illo maiores similique rem aliquid quisquam? Commodi voluptatem fuga inventore libero corrupti debitis illum doloribus cupiditate deserunt?'
    },
    {
        name:'Dhanapala',
        imgUrl:'',
        rating:3,
        description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa quod amet odit dignissimos illo maiores similique rem aliquid quisquam? Commodi voluptatem fuga inventore libero corrupti debitis illum doloribus cupiditate deserunt?'
    },
    {
        name:'Chamindu',
        imgUrl:'',
        rating:3,
        description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa quod amet odit dignissimos illo maiores similique rem aliquid quisquam? Commodi voluptatem fuga inventore libero corrupti debitis illum doloribus cupiditate deserunt?'
    },
];


function rowContent(index) {
  return (
    <React.Fragment>
      <TableCell>
        <Stack>
            <Stack direction='row' spacing={1} sx={{alignItems:'center'}}>
                <Avatar sx={{width:'2rem',height:'2rem'}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <h6>{ratings[index].name}</h6>
            </Stack>
            
            <Rating value={ratings[index].rating} size='small' readOnly />
            <p>{ratings[index].description}</p>
        </Stack>
      </TableCell>
    </React.Fragment>
  );
}

export default function Ratings() {
  return (
    <div>
        <h2>Ratings and Reviews</h2>
    <div id='ratings-content'>
        <Paper style={{ height: 400, width: '100%' }}>
            <TableVirtuoso
                data={ratings}
                itemContent={rowContent}
            />
        </Paper>
    </div>
    </div>
  );
}
