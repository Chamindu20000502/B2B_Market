import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Variations from './Variations';
import { Typography } from '@mui/material';

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



export default function CustomizableArea(props) {
    return(
        <Paper
            sx={{
                padding: 1,
                margin: 2,
                color: 'text.secondary',
                backgroundColor: '#FAFBFA',   
            }}
        >
            <span class="badge text-bg-warning">Customize</span>
           <div style={{paddingLeft: '1.5rem',paddingBottom: '3rem', paddingRight: '1.5rem'}}>

            <div className='customize-region'>
             <h5>Price ranges</h5>
            <Divider sx={{backgroundColor:'black'}} />
            <Box sx={{ flexGrow: 1, p: 1 }}>
            <Grid container gap={2}>
            {props.data.price_ranges.map((price, index) => {
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
                    ><Typography>{price.quantity_min} - {price.quantity_max}</Typography><Typography>units</Typography><h3>${price.price}</h3></Grid>
                );
            })}
            </Grid>
            </Box>
           </div>

        <div className='customize-region'>
            <h5>Variations</h5>
            <Divider sx={{backgroundColor:'black'}} />
            <div style={{paddingTop:'1rem',paddingLeft:'2rem'}}>
                <Variations data={props.data}/>
            </div>
        </div>
           </div>
        </Paper>
    );
}


