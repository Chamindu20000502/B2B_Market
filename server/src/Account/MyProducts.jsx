import ProductCard from "./ProductCard";
import './Account.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';

export default function MyProducts() {
    return (
        <div>
            <Stack direction="row" spacing={2} sx={{ mb: 2 ,justifyContent: 'space-between',pr:5}}>
                <Paper elevation={2} sx={{backgroundColor:'#4169E1',color:'white',padding:'0rem'}}><h2 style={{marginRight:'1rem',marginLeft:'1rem'}}>My Products</h2></Paper>
                <Fab variant="extended" color="primary" sx={{backgroundColor:'#4169E1',color:'white'}}>
                    <AddIcon sx={{ mr: 1 }} />
                    Add Product
                </Fab>
            </Stack>
            <div id="my-products">
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </div>
        </div>
    );
}