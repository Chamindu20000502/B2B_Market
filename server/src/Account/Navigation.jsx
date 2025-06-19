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

const cards = [
  {
    icon : <DashboardIcon sx={{ fontSize: 30}} />,
    title: 'Dashboard',
  },
  {
    icon : <ViewListIcon sx={{ fontSize: 30}} />,
    title: 'Orders',
  },
  {
    icon : <RateReviewIcon sx={{ fontSize: 30}} />,
    title: 'To Review',
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

    function OnCardClick(index)
    {
        setSelectedCard(index);
        props.onNavChange(cards[index].title);
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
      {cards.map((card, index) => (
        <Card>
          <CardActionArea
            onClick={() => OnCardClick(index)}
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
                <Stack sx={{alignItems:'center',justifyContent:'center',justifyItems:'center'}}>
                <ThemeProvider theme={badgeTheme}>{card.title === 'To Review' ? <Badge badgeContent={toRateCount} color='primary'>{card.icon}</Badge> : card.icon}</ThemeProvider>
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
