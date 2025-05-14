import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Variations from './Variations';

const prices = [{
    range: '0-100',
    price: 100,
},
{
    range: '100-200',
    price: 200,
},
{
    range: '200-300',
    price: 300,
},
{
    range: '300-400',
    price: 400,
},
{
    range: '400-500',
    price: 500,
},];



export default function CustomizableArea() {
    return(
        <Paper
            sx={{
                padding: 1,
                margin: 5,
                color: 'text.secondary',
                backgroundColor: '#FAFBFA',   
            }}
        >
            <span class="badge text-bg-warning">Customize</span>
           <div style={{paddingLeft: '3rem',paddingBottom: '3rem', paddingRight: '3rem'}}>

            <div className='customize-region'>
             <h5>Price ranges</h5>
            <Divider sx={{backgroundColor:'black'}} />
            <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container>
            {prices.map((price, index) => {
            return(
                <Grid
                sx={{padding: 1}}
                    index={index}
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                    }}
                    ><p>{price.range} units</p><h3>${price.price}</h3></Grid>
                );
            })}
            </Grid>
            </Box>
           </div>

        <div className='customize-region'>
            <h5>Variations</h5>
            <Divider sx={{backgroundColor:'black'}} />
            <div style={{paddingTop:'1rem',paddingLeft:'2rem'}}>
                <Variations/>
            </div>
        </div>
           </div>
        </Paper>
    );
}


