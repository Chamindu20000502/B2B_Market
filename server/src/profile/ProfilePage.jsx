import "./Profile.css"
import Navigation from "./Navigation";
import Orders from "./Orders";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import BuyDash from "./BuyDash";
import { useState } from "react";
import ToReview from "./ToReview";

export default function ProfilePage()
{
    const [alignment, setAlignment] = useState('buy');

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <div>
            <div id="grid">
                <div id='top-bar'>
                    <h1>Helow world</h1>
                </div>
                <div id="buy-sell-buttons">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton size="small" value="buy">Buy</ToggleButton>
                        <ToggleButton size="small" value="sell">Sell</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                
                {alignment === 'buy' ? <BuyContent/> : null}
            </div>
        </div>
    );
}

function BuyContent()
{
    const [page , setPage] = useState('dashboard');

    function OnNavChange(page)
    {
        setPage(page.toLowerCase());
    }

    return(
        <div style={{display : 'grid',gridTemplateColumns:'repeat(12,1fr)',gridColumn: 'span 12'}}>
            <div id="navigation">
                    <Navigation onNavChange={OnNavChange}/>
                </div>
                <div id="content">
                    <ContentPage page={page}/>
                </div>
        </div>
    );
}


function ContentPage(props)
{
    switch(props.page)
    {
        case 'dashboard':
            return <BuyDash/>;
        case 'orders':
            return <Orders/>;
        case 'to review':
            return <ToReview/>;
    }
}