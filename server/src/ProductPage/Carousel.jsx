import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import './ProductPage.css'

function Carousel()
{
    return(
        <div>
          <Paper elevation={0} id='product-name'>
            <h5>Product Name</h5>
            <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly size='small' />
            <Stack direction="row" gap={1} sx={{alignItems:'center'}}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{width:'2rem' , height:'2rem'}}/>
              <a href="" style={{color:'black'}}>Store link</a>
            </Stack>
          </Paper>
          <div id="carouselExampleIndicators" class="carousel slide carousel-margin">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://www.wambooli.com/blog/wp-content/uploads/2008/04/aspect1.png" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTI6nkgGjqtZkc0WT5ut-kSvuCrizUKS7cMnzUc2OlWtrdPeu8JVQn4ODS0sWlMPGTLUfE&usqp=CAU" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe_Qz5K2qUAi4Wp_bByEclQX18K5Cru60_PecaXt6y1Y3WrnA7esJLXInwBExIZT3JK4&usqp=CAU" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        </div>
    );
}

export default Carousel;