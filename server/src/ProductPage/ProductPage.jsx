import {useEffect , useState} from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Carousel from './Carousel';
import SearchNavBar from '../SearchListing/SearchNavBar';
import CustomizableArea from './CustomizableArea';
import RelatedProducts from './RelatedProducts';
import ProductInfo from './ProductInfo';
import Description from './Description';
import Ratings from './Ratings';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ProductPage.css';


export default function ProductPage() {
  const {id} = useParams();
  console.log(id);
  const [data ,setData] = useState();

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const response = await axios.get(import.meta.env.VITE_API+'/product/' + id);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();

  }, []);
  if (data) {
    return (
    <div>
      <SearchNavBar/>
    <div id='grid' style={{minWidth:'75rem'}}>
      <div id='carousel'><Carousel data={data}/></div>
      <div id='customizable-area'><CustomizableArea data={data}/></div>
      <div id='realted-products-area'><RelatedProducts/></div>
      <div id='product-info'><div><ProductInfo data={data}/></div></div>
      <div id='description'><Description data={data}/></div>
      <div id='ratings'><Ratings data={data}/></div>
    </div>  
    </div>
  );
  }else{
    return(
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
  
}
