import "./Account.css"
import Navigation from "./Navigation";
import Orders from "./Orders";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BuyDash from "./BuyDash";
import { useState } from "react";
import ToReview from "./ToReview";
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MyProducts from "./MyProducts";
import SellDash from "./SellDash";
import AddProduct from "./AddProduct";

export default function ProfilePage()
{
    const [alignment, setAlignment] = useState('buy');

    const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };

    return (
        <div>
            <div id="grid">
                <div id='top-bar'>
                    <h1>Helow world</h1>
                </div>
                <div id="buy-sell-buttons">
                    <Stack direction="row" spacing={4}>
                      <ToggleButtonGroup
                        value={alignment}
                        exclusive
                        onChange={handleAlignment}
                        aria-label="text alignment"
                        size="small"
                      >
                        <ToggleButton value="buy" aria-label="left aligned">
                          <Typography>Buy</Typography>
                        </ToggleButton>
                        <ToggleButton value="sell" aria-label="centered">
                          <Typography>Sell</Typography>
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>
                </div>
                
                {alignment === 'buy' ? <BuyContent/> : <SellContent/>}
            </div>
        </div>
    );
}

function BuyContent()
{
    const [page , setPage] = useState('buy dashboard');

    function OnNavChange(page)
    {
        setPage(page.toLowerCase());
    }

    return(
        <div style={{display : 'grid',gridTemplateColumns:'repeat(12,1fr)',gridColumn: 'span 12'}}>
            <div id="navigation">
                    <Navigation onNavChange={OnNavChange} mode='buy'/>
                </div>
                <div id="content">
                    <ContentPage page={page}/>
                </div>
        </div>
    );
}

function SellContent()
{
    const [page , setPage] = useState('sell dashboard');

    function OnNavChange(page)
    {
        setPage(page.toLowerCase());
    }

    function OnAddProduct()
    {
        setPage('add product');
    }

    return(
        <div style={{display : 'grid',gridTemplateColumns:'repeat(12,1fr)',gridColumn: 'span 12'}}>
            <div id="navigation">
                    <Navigation onNavChange={OnNavChange} mode='sell'/>
                </div>
                <div id="content">
                    <ContentPage page={page} addProduct={OnAddProduct}/>
                </div>
        </div>
    );
}


function ContentPage(props)
{
    switch(props.page)
    {
        case 'buy dashboard':
            return <BuyDash/>;
        case 'orders':
            return <Orders/>;
        case 'to review':
            return <ToReview/>;
        case 'my products':
            return <MyProducts addProduct={props.addProduct}/>;
        case 'sell dashboard':
            return <SellDash/>;
        case 'add product':
            return <AddProduct/>;
    }
}