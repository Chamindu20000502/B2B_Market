import Paper from '@mui/material/Paper';
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

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
                padding: 2,
                margin: 2,
                textAlign: 'center',
                color: 'text.secondary',
                backgroundColor: '#f5f5f5',   
            }}
        >
            <h2>Customizable Area</h2>
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container>
            {prices.map((price, index) => {
            return(
                <Grid
                sx={{padding: 2}}
                    index={index}
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                    }}
                    ><h5>{price.range} units</h5><p>{price.price}</p></Grid>
                );
            })}

      </Grid>
    </Box>
        </Paper>
    );
}