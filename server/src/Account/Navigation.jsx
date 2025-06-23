import './Account.css'
import React, { useState , useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import RateReviewIcon from '@mui/icons-material/RateReview';
import Badge from '@mui/material/Badge';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const buyCards = [
  {
    icon : <DashboardIcon sx={{ fontSize: 25}} />,
    title: 'Buy Dashboard',
  },
  {
    icon : <ViewListIcon sx={{ fontSize: 25}} />,
    title: 'Orders',
  },
  {
    icon : <RateReviewIcon sx={{ fontSize: 25}} />,
    title: 'To Review',
  },
];

const sellCards = [
  {
    icon : <DashboardIcon sx={{ fontSize: 25}} />,
    title: 'Sell Dashboard',
  },
  {
    icon : <ViewListIcon sx={{ fontSize: 25}} />,
    title: 'My products',
  },
  {
    icon : <RateReviewIcon sx={{ fontSize: 25}} />,
    title: 'Orders',
  },
];

const badgeTheme = createTheme({
  palette: {
    color: {
      main: '#FF0000',
    },
  }});

function Navigation(props) {
  const [selectedCard, setSelectedCard] = useState(0);
  const [toRateCount,setToRateCount] = useState(0);

  useEffect(()=>{
    const fetchData = async ()=>{
      try
      {
        const response = await axios.get(import.meta.env.VITE_API+`/account/1/buy/review_count`);
        setToRateCount(response.data);
      }catch(error)
      {
        console.log(error);
      }
    }
    fetchData();
  },[]);

    function OnBuyCardClick(index)
    {
        setSelectedCard(index);
        props.onNavChange(buyCards[index].title);
    }

    function OnSellCardClick(index)
    {
        setSelectedCard(index);
        props.onNavChange(sellCards[index].title);
    }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px, 100%), 1fr))',
        gap: 2,
      }}
    >
      {props.mode === 'buy' ? buyCards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => OnBuyCardClick(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            
            <CardContent sx={{ height: '100%' ,padding:0,paddingTop:2, paddingBottom:1}}>
                <Stack direction={"row"} gap={2} sx={{alignItems:'center',justifyItems:'center',paddingLeft:2}}>
                <ThemeProvider theme={badgeTheme}>{card.title === 'To Review' ? <Badge badgeContent={toRateCount} color='primary'>{card.icon}</Badge> : card.icon}</ThemeProvider>
              <Typography variant="body2" color="text.secondary">
                {card.title}
              </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      )) : 
      sellCards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => OnSellCardClick(index)}
            data-active={selectedCard === index ? '' : undefined}
            sx={{
              height: '100%',
              '&[data-active]': {
                backgroundColor: 'action.selected',
                '&:hover': {
                  backgroundColor: 'action.selectedHover',
                },
              },
            }}
          >
            
            <CardContent sx={{ height: '100%' ,padding:0,paddingTop:2, paddingBottom:1}}>
                <Stack direction={"row"} gap={2} sx={{alignItems:'center',justifyItems:'center',paddingLeft:2}}>
                {card.icon}
              <Typography variant="body2" color="text.secondary">
                {card.title}
              </Typography>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}

export default Navigation;
