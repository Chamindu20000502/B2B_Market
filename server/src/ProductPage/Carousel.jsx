import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import './ProductPage.css'

function Carousel(props)
{
    return(
        <div>
          <Paper elevation={0} id='product-name'>
            <h5>{props.data.name}</h5>
            <Rating name="half-rating-read" defaultValue={props.data.rating} precision={0.5} readOnly size='small' />
            <Stack direction="row" gap={1} sx={{alignItems:'center'}}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{width:'2rem' , height:'2rem'}}/>
              <a href="" style={{color:'black'}}>Store id = {props.data.store_id}</a>
            </Stack>
          </Paper>
          <div id="carouselExampleIndicators" class="carousel slide carousel-margin">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>    
    {props.data.images.map((image, index) => {
      if(index !== 0){
        return (
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} aria-label={`Slide ${index + 1}`}></button>
        );
      }
    })}
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src={props.data.images[0].img_url} class="d-block w-100" alt="..."/>
    </div>
    {props.data.images.map((image, index) => {
      if(index !== 0){
        return (
        <div class="carousel-item" key={index}>
          <img src={image.img_url} class="d-block w-100" alt="..."/>
        </div>
      );
      }
    })}
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