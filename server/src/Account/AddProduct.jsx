import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

export default function AddProduct() {
    return (
        <div>
            <Stack direction="row" spacing={2} sx={{ mb: 2 ,justifyContent: 'space-between',pr:5}}>
                <Paper elevation={2} sx={{backgroundColor:'#36454F',color:'white',padding:'0rem'}}><h2 style={{marginRight:'1rem',marginLeft:'1rem'}}>Add New Product</h2></Paper>
            </Stack>
            
        

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
        </div>
    );
}