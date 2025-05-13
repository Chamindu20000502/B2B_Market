import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from 'react';

const prices = [{
    range: '0-100',
    price: 100,
},
{
    range: '100-200',
    price: 200,
},
{
    range: '200-300',
    price: 300,
},
{
    range: '300-400',
    price: 400,
},
{
    range: '400-500',
    price: 500,
},];

const variations = {
    withImages:[
                {  
                     title:'Colours',
                    choices:[{imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Solid_red.svg/800px-Solid_red.svg.png',name:'Red'},
                            {imageUrl:'https://cdn11.bigcommerce.com/s-3uewkq06zr/images/stencil/1280x1280/products/253/412/fluorescent_blue__29378.1492487687.png?c=2',name:'Blue'},
                            {imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZBSMRpLgAiLH-2pdqrW5DJPWLZVm99krNYA&s',name:'Green'},
                            ]  
                },
                {
                    title:'Background',
                    choices:[{imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe_Qz5K2qUAi4Wp_bByEclQX18K5Cru60_PecaXt6y1Y3WrnA7esJLXInwBExIZT3JK4&usqp=CAU',name:'Background 1'},
                            {imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe_Qz5K2qUAi4Wp_bByEclQX18K5Cru60_PecaXt6y1Y3WrnA7esJLXInwBExIZT3JK4&usqp=CAU',name:'Background 2'},
                            {imageUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJe_Qz5K2qUAi4Wp_bByEclQX18K5Cru60_PecaXt6y1Y3WrnA7esJLXInwBExIZT3JK4&usqp=CAU',name:'Background 3'},
                            ]
                }
],
    withoutImages:[
        {title:'Size',
        choices:[{name:'S'},
                {name:'M'},
                {name:'L'},
                {name:'XL'},
                {name:'XXL'},
                ]
        },
    ]
};

export default function CustomizableArea() {
    return(
        <Paper
            sx={{
                padding: 1,
                margin: 5,
                color: 'text.secondary',
                backgroundColor: '#FAFBFA',   
            }}
        >
            <span class="badge text-bg-warning">Customize</span>
           <div style={{paddingLeft: '3rem',paddingBottom: '3rem', paddingRight: '3rem'}}>

            <div className='customize-region'>
             <h5>Price ranges</h5>
            <Divider sx={{backgroundColor:'black'}} />
            <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container>
            {prices.map((price, index) => {
            return(
                <Grid
                sx={{padding: 1}}
                    index={index}
                    size={{
                        xs: 12,
                        sm: 6,
                        md: 4,
                        lg: 3,
                    }}
                    ><p>{price.range} units</p><h3>${price.price}</h3></Grid>
                );
            })}
            </Grid>
            </Box>
           </div>

        <div className='customize-region'>
            <h5>Variations</h5>
            <Divider sx={{backgroundColor:'black'}} />
            <div style={{paddingTop:'1rem',paddingLeft:'2rem'}}>
                {Variations()}
                {VariationsWithoutImages()}
            </div>
        </div>

           </div>
        </Paper>
    );
}

function Variations()
{
    const [selectedCard, setSelectedCard] = useState(0);
    if(variations.withImages.length > 0)
    {
        return(
            <div>
                {variations.withImages.map((variation, index) => {
                    return(
                        <div key={index} style={{paddingBottom:'1.5rem'}}>
                            <h5 className='variation-title'>{variation.title}</h5>
                        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap: '1rem'}}>
                            {variation.choices.map((choice, index) => {
                                return(
                                    <div key={index}>
                                        <Card>
                                            <CardActionArea
                                            onClick={() => setSelectedCard(index)}
                                            data-active={selectedCard === index ? '' : undefined}
                                            sx={{
                                                height: '100%',
                                                '&[data-active]': {
                                                    backgroundColor: 'action.selected',
                                                    '&:hover': {
                                                    backgroundColor: 'action.selectedHover',
                                                    },
                                                },
                                            }}>
                                                <Stack direction="row" spacing={1} sx={{padding:1}}>
                                                    <img src={choice.imageUrl} alt={choice.name} style={{width:'3rem',height:'3rem'}} />
                                                    <div style={{display:'flex',alignItems:'center',height:'3rem'}}>  
                                                        <p>{choice.name}</p>
                                                    </div>
                                                </Stack>
                                            </CardActionArea>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                        </div>
                    );
                })}
            </div>
        );
    }    
}

function VariationsWithoutImages()
{
    return(
        <div>
            {variations.withoutImages.map((variation, index) => {
                return(
                    <div key={index} style={{paddingBottom:'1.5rem'}}>
                        <h5 className='variation-title'>{variation.title}</h5>
                    <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap: '1rem'}}>
                        {variation.choices.map((choice, index) => {
                            return(
                                <div key={index}>
                                    <Card>
                                        <CardActionArea>
                                            <Stack direction="row" spacing={1} sx={{padding:1}}>
                                                <p>{choice.name}</p>
                                            </Stack>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                );
            })}
        </div>
    );
}