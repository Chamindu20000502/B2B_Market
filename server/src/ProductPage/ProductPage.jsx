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
import './ProductPage.css'

export default function ProductPage() {
  const [data ,setData] = useState();

  useEffect(() => {
    const fetchData = async () =>{
      try {
        const response = await axios.get('http://localhost:3000/product');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error.message);
      }
    }

    fetchData();

  }, []);

  return (
    <div>
      <SearchNavBar/>
    <div id='grid' style={{minWidth:'75rem'}}>
      <div id='carousel'><Carousel/></div>
      <div id='customizable-area'><CustomizableArea/></div>
      <div id='realted-products-area'><RelatedProducts/></div>
      <div id='product-info'><div><ProductInfo/></div></div>
      <div id='description'><Description/></div>
      <div id='ratings'><Ratings/></div>
    </div>  
    </div>
  );
}
