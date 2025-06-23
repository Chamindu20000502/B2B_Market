import ProductCard from "./ProductCard";
import './Account.css'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useState, useEffect, use } from "react";

const userId = 200; // Replace with dynamic user ID if needed

export default function MyProducts(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(import.meta.env.VITE_API+`/account/${userId}/sell/my_products`);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);

    console.log(data);

    return (
        <div>
            {data ? <div>
                <Stack direction="row" spacing={2} sx={{ mb: 2 ,justifyContent: 'space-between',pr:5}}>
                <Paper elevation={2} sx={{backgroundColor:'#36454F',color:'white',padding:'0rem'}}><h2 style={{marginRight:'1rem',marginLeft:'1rem'}}>My Products</h2></Paper>
                <Fab variant="extended" color="primary" sx={{backgroundColor:'#36454F',color:'white'}} onClick={props.addProduct}>
                    <AddIcon sx={{ mr: 1 }} />
                    Add Product
                </Fab>
            </Stack>
            <div id="my-products">
                {data.map((product) => (
                    <ProductCard key={product.id} info={product} />
                ))}
            </div>
            </div> : <h1>No products found</h1>}
        </div>
    );
}