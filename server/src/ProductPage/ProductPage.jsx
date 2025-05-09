import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Carousel from './Carousel';
import SearchNavBar from '../SearchListing/SearchNavBar';
import CustomizableArea from './CustomizableArea';
import './ProductPage.css'

export default function ProductPage() {
  return (
    // <div>
    //   <SearchNavBar />
    //   <Box sx={{ flexGrow: 1, p: 2 }}>
    //   <Grid
    //     container
    //     sx={{
    //       '--Grid-borderWidth': '1px',
    //       borderTop: 'var(--Grid-borderWidth) solid',
    //       borderLeft: 'var(--Grid-borderWidth) solid',
    //       borderColor: 'divider',
    //       '& > div': {
    //         borderRight: 'var(--Grid-borderWidth) solid',
    //         borderBottom: 'var(--Grid-borderWidth) solid',
    //         borderColor: 'divider',
    //       },
    //     }}
    //   >
    //     <Grid
    //         minHeight={160}
    //         size={{
    //           xs: 12,
    //           sm: 6,
    //           md: 4,
    //           lg: 5,
    //         }}
    //       ><Carousel/></Grid>
    //     <Grid
    //         minHeight={160}
    //         size={{
    //           xs: 12,
    //           sm: 6,
    //           md: 4,
    //           lg: 5,
    //         }}
    //       ><CustomizableArea/></Grid>
    //       <Grid
    //         minHeight={160}
    //         size={{
    //           xs: 12,
    //           sm: 6,
    //           md: 4,
    //           lg: 5,
    //         }}
    //       ><CustomizableArea/></Grid>

    //   </Grid>
    // </Box>
    // </div>
    
    <div>
      <SearchNavBar/>
    <div id='grid'>
      <div id='carousel'><Carousel/></div>
      <div id='customizable-area'><CustomizableArea/></div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
    </div>
    </div>
  );
}
