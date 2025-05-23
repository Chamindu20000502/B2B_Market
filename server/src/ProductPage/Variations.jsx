import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';

const variations = [
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
                },
   {title:'Size',
    choices:[{name:'S'},
            {name:'M'},
            {name:'L'},
            {name:'XL'},
            {name:'XXL'},
            ]
        },
];

export default function Variations(props)
{
    const [selectedChoices, setSelectedChoices] = useState({});
    const [quantity , setQuantity] = useState('');

    function handleChoiceChange(variationTitle, choiceIndex) {
        setSelectedChoices((prevChoices) => ({
            ...prevChoices,
            [variationTitle]: choiceIndex,
        }));
    }

    function UpdateQuantity(event)
    {
        const value = event.target.value;
        if(value < 0)
        {
            setQuantity((previosValue)=>{return(previosValue)});
        }else
        {
            setQuantity(value);
        }
        
        console.log(quantity);
    }

    if(variations.length > 0)
    {
        return(
            <div>
                {
                props.data.variations.map((variation, index) => {
                    const [selectedCard, setSelectedCard] = useState(null);
                    function SetChoice(i) {                                         
                        setSelectedCard(i);
                        handleChoiceChange(variation.name, i);
                    }
                    return(
                        <div key={index} style={{paddingBottom:'1.5rem'}}>
                            <h5 className='variation-title'>{variation.name}</h5>
                        <div style={{display:'flex',flexDirection:'row',flexWrap:'wrap',gap: '1rem'}}>
                            {variation.choices.map((choice, index) => {
                                return(
                                    
                                    <div key={index}>
                                        <Card>
                                            <CardActionArea
                                            onClick={() => SetChoice(index)}
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
                                                <Stack direction="row" spacing={1} sx={{padding:0.75}}>
                                                    {choice.img_url != null ? <img src={choice.img_url} alt={choice.choice} style={{width:'2.5rem',height:'2.5rem'}} />:null}
                                                    <div style={{display:'flex',alignItems:'center',minHeight:'1rem',minWidth:'2rem'}}>  
                                                        <p>{choice.choice}</p>
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
    
                <Stack sx={{justifyContent:'center',alignItems:'center',marginTop:'2rem'}} gap={1}>
                    <div><TextField id="outlined-basic" type='number' label="Quantity" variant="outlined" size='small' onChange={UpdateQuantity} value={quantity}/></div>
                    <div><Button variant="contained" size="large" onClick={()=>{console.log(selectedChoices)}}>Add to Cart</Button></div>
                </Stack>
            </div>
        );
    }    
}