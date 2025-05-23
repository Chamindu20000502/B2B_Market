import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import './SearchListing.css'

function Item()
{
    return(
        <Card className="card mb-3 m-3 border-0">
            <Box sx={{display:{xl:'felx',lg:'flex',md:'flex',sm:'none',xs:'none'}}}>
            <div className="row g-0" style={{minWidth:'64rem'}}>
                <div className="col-md-3">
                    <img src="https://assets.centralindex.com/W/48/34c7b3a1acc00bde588c2857e0154604.jpg" className="img-fluid rounded-start" alt="..." style={{width:'16rem',height:'16rem',minWidth:'16rem',minHeight:'16rem'}}/>
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <Link to={`/product/${1}`}><h5 className="card-title">Female Shoes (Example product)</h5></Link>
                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" style={{marginLeft:'5rem'}}>Contained</Button>
                        <Button variant="outlined">Add to Cart</Button>
                    </Stack>
                </div>
            </div>
            </Box>
            <Box sx={{display:{xl:'none',lg:'none',md:'none',sm:'flex',xs:'none'}}}>
                    <div class="card border-0" style={{width: '14rem'}}>
                        <img src="https://assets.centralindex.com/W/48/34c7b3a1acc00bde588c2857e0154604.jpg" class="card-img-top" alt="..." style={{width:'14rem',height:'14rem'}}/>
                        <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Button variant="contained" className='small-card-button'>Contained</Button>
                        <Button variant="outlined" className='small-card-button'>Add to Cart</Button>
                    </div>
                </div>
            </Box>
            <Box sx={{display:{xl:'none',lg:'none',md:'none',sm:'none',xs:'flex'}}}>
                    <div class="card border-0" style={{width: '10rem'}}>
                        <img src="https://assets.centralindex.com/W/48/34c7b3a1acc00bde588c2857e0154604.jpg" class="card-img-top" alt="..." style={{width:'10rem',height:'10rem'}}/>
                        <div class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Button variant="contained" sx={{margin:'3rem'}}>Contained</Button>
                        <Button variant="outlined" className='small-card-button'>Add to Cart</Button>
                    </div>
                </div>
            </Box>
        </Card>
    );
}

export default Item;