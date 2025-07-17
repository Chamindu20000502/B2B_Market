import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';

export default function AddProduct() {
  const [formData, setFormData] = useState({});

  const file = new FormData();

  function SetFileData(event) {
    if(event.target.name === 'thumbnail') {
      file.append('thumbnail', event.target.files[0]);
    }else if(event.target.name === 'images') {
      for(let i = 0; i < event.target.files.length; i++) {
        file.append('images', event.target.files[i]);
      }
    }
  }

  async function SendData()
  {
    await axios.post(import.meta.env.VITE_API + '/account/1/sell/add_product', file);
  }

  function onSubmit(event) {
    SendData();
    event.preventDefault();
  }

    return (
        <div>
            <Stack direction="row" spacing={2} sx={{ mb: 2 ,justifyContent: 'space-between',pr:5}}>
                <Paper elevation={2} sx={{backgroundColor:'#36454F',color:'white',padding:'0rem'}}><h2 style={{marginRight:'1rem',marginLeft:'1rem'}}>Add New Product</h2></Paper>
            </Stack>
            
        

        
      <form action="/account/1/sell/add_product" method='post'>
      <Grid container spacing={2}>
        <Grid size={3}>
          Product name
        </Grid>
        <Grid size={1}>:</Grid>
        <Grid size={8}>
          <TextField
          id="outlined-multiline-flexible"
          placeholder='Enter product name'
          multiline
          maxRows={4}
          size='small'
          sx={{ width: '80%' }}
        />
        </Grid>
        <Grid size={3}>
          Company name
        </Grid>
        <Grid size={1}>:</Grid>
        <Grid size={8}>
          <TextField
          id="outlined-multiline-flexible"
          multiline
          disabled
          maxRows={4}
          value={'This field is disabled'}
          size='small'
          sx={{ width: '80%' }}
        />
        </Grid>
      </Grid>
        <input type="file" name='thumbnail' onChange={SetFileData}/>
        <input type="file" name='images' multiple onChange={SetFileData}/>
        <button type='submit' onClick={onSubmit}>submit</button>
      </form>
        </div>
    );
}