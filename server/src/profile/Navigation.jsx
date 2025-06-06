import './Profile.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Stack from '@mui/material/Stack';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListIcon from '@mui/icons-material/ViewList';
import RateReviewIcon from '@mui/icons-material/RateReview';

const cards = [
  {
    icon : <DashboardIcon sx={{ fontSize: 40}} />,
    title: 'Dashboard',
  },
  {
    icon : <ViewListIcon sx={{ fontSize: 40}} />,
    title: 'Orders',
  },
  {
    icon : <RateReviewIcon sx={{ fontSize: 40}} />,
    title: 'To Review',
  },
];

function Navigation(props) {
  const [selectedCard, setSelectedCard] = React.useState(0);

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
            
            <CardContent sx={{ height: '100%' ,padding:0,paddingTop:1, paddingBottom:1}}>
                <Stack sx={{alignItems:'center',justifyContent:'center',justifyItems:'center'}}>
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
