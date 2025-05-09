import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import DevicesIcon from '@mui/icons-material/Devices';
import ChairIcon from '@mui/icons-material/Chair';
import DryCleaningIcon from '@mui/icons-material/DryCleaning';
import DiamondIcon from '@mui/icons-material/Diamond';
import HandymanIcon from '@mui/icons-material/Handyman';
import CarCrashIcon from '@mui/icons-material/CarCrash';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import Slide from '@mui/material/Slide';

const cards = [
  {
    icon: <DevicesIcon style={{fontSize:"3rem"}}/>,
    title: 'Electronics',
    description: 'Plants are essential for all life.',
  },
  {
    icon: <ChairIcon style={{fontSize:"3rem"}}/>,
    title: 'Furniture',
    description: 'Animals are a part of nature.',
  },
  {
    icon: <DryCleaningIcon style={{fontSize:"3rem"}}/>,
    title: 'Clothing',
    description: 'Humans depend on plants and animals for survival.',
  },
  {
    icon: <DiamondIcon style={{fontSize:"3rem"}}/>,
    title: 'Jewellery',
    description: 'Humans depend on plants and animals for survival.',
  },
  {
    icon: <HandymanIcon style={{fontSize:"3rem"}}/>,
    title: 'Tools',
    description: 'Humans depend on plants and animals for survival.',
  },
  {
    icon: <CarCrashIcon style={{fontSize:"3rem"}}/>,
    title: 'Spare Parts',
    description: 'Humans depend on plants and animals for survival.',
  },
  {
    icon: <SmartToyIcon style={{fontSize:"3rem"}}/>,
    title: 'Toys',
    description: 'Humans depend on plants and animals for survival.',
  },
  {
    icon: <SoupKitchenIcon style={{fontSize:"3rem"}}/>,
    title: 'Seasonal Items',
    description: 'Electronics are devices that operate on electrical energy.',
  }
];

function CatagoriesArea() {
  const [selectedCard, setSelectedCard] = React.useState(0);
  return (
    <div style={{backgroundColor:'#2a52be'}}>
        <Box className="container"
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(20rem, 100%), 1fr))',
        gap: 2,
        p:{xs:2 , md:4 , lg:12}
      }}
    >{cards.map((card,index) =>{
        return(
            <Slide key={index} direction="up" in={true} mountOnEnter unmountOnExit>
        <Card raised={selectedCard === index? true :false} style={{margin:"1rem"}}>
          <CardActionArea
            onMouseOver={() => setSelectedCard(index)}
            sx={{
              height: '100%',
              backgroundColor: '#000f89',
            }}
          >
            <CardContent sx={{ height: '100%' }}>
              <Typography style={{color:'white'}} variant="h5" component="div">
                {card.icon}   {card.title}
              </Typography>
              <Typography style={{color:'white'}} variant="body2" color="text.secondary">
                {card.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        </Slide>
        );
    })}
        
        

        
    </Box>
    </div>
  );
}

export default CatagoriesArea;
