import Stack from '@mui/material/Stack';
import './RegisterPage.css'
import { useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import CountrySelect from './CountrySelect';
import Button from '@mui/joy/Button';
import Error from './Error';
import axios from 'axios';


export default function RegisterPage()
{
    const [formData , setFormData] = useState({});
    const [error , setError] = useState({isError:true,message:'Please enter your country'});
    const [isCountrySelected,setIsCountrySelected] = useState(false);
    const [isPressedContine,steIsPressedContinue] = useState(false);

    function SetFormData(event)
    {
        setError({isError : false});
        setFormData((previousValue)=>{
            if(event.target.name === 'phone_code' || event.target.name === 'phone_number')
            {
                if(!isNaN(event.target.value))
                {
                    return({...previousValue,...{[event.target.name]:event.target.value}});
                }else{
                    return(previousValue);
                }
            }else
            {
                return({...previousValue,...{[event.target.name]:event.target.value}});
            }
        });
    }

    function CheckFormData(data,err_message)
    {
        if(data == null || data === '')
        {
            setError({isError:true,message : err_message + ' cannot be empty!'});
        }
    }

    async function SendData()
    {
        try
        {
            const response = await axios.post('http://localhost:3000/register',formData);
            setError({isError:true,message:response.data});
        }catch(err)
        {
            console.log(err);
        }
    }

    function OnSubmit(event)
    {
        CheckFormData(formData.f_name,'First name');
        CheckFormData(formData.l_name,'Last name');
        CheckFormData(formData.email,'Email');
        CheckFormData(formData.company,'Company name');
        CheckFormData(formData.phone_code,'Country code');
        CheckFormData(formData.phone_number,'Phone number');
        CheckFormData(formData.pw,'Password');
        CheckFormData(formData.c_pw,'Password');
        CheckFormData(formData.country_code,'Country');

        if(!error.isError)
        {
            if(formData.pw === formData.c_pw)
            {
                SendData();
            }else
            {
                setError({isError:true,message : 'Entered passwords are not matching!'});
            }
        }        
        event.preventDefault();
    }

    function OnContinue()
    {
        steIsPressedContinue(true);
        if(!error.isError)
        {
            setIsCountrySelected(true);
        }
    }

    function OnCountrySelect(id)
    {
        setError({isError:false});
        setFormData((previousValue)=>{
            return({...previousValue,...{country_code : id}});
        });
    }

    function ShowError()
    {
        if(error.isError && isPressedContine)
        {
            return(<Error err={error.message}/>);
        }
    }

    return(
        <div id='page-area'>
            <h1>Register</h1>
            <div id='form-area'>
                <div style={{width:'500px'}}>
                    <ShowError/>
                    <form> 
                    
                        {isCountrySelected?<div>
                            <Stack gap={1.2}>
                            <Stack direction='row' sx={{justifyContent:'space-between'}}>
                            <div style={{width:'45%'}}>
                                <FormControl>
                                    <FormLabel>First Name</FormLabel>
                                    <Input id='f_name' value={formData.f_name} name='f_name' placeholder="Placeholder" onChange={SetFormData}/>
                                </FormControl>
                            </div>
                            <div style={{width:'45%'}}>
                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input id='l_name' value={formData.l_name} name='l_name' placeholder="Placeholder" onChange={SetFormData}/>
                                </FormControl>
                            </div>                                                 
                        </Stack>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input name='email' value={formData.email} type='email' onChange={SetFormData}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input name='pw' value={formData.pw} type='password' onChange={SetFormData}/> 
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirm password</FormLabel>
                            <Input name='c_pw' value={formData.c_pw} type='password' onChange={SetFormData}/> 
                        </FormControl>
                        <FormControl>
                            <FormLabel>Company Name</FormLabel>
                            <Input name='company' value={formData.company} onChange={SetFormData}/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Phone number</FormLabel>                     
                            <Stack direction='row' gap={2}>                            
                                <Stack direction='row' sx={{alignItems:'center'}}><Typography sx={{fontSize:'1.5rem'}}>+</Typography><Input value={formData.phone_code === undefined? '':formData.phone_code} name='phone_code' sx={{width:'4rem'}} onChange={SetFormData}/></Stack>
                                <Input name='phone_number' value={formData.phone_number === undefined? '':formData.phone_number} slotProps={{input:'hhh'}} onChange={SetFormData}/>
                            </Stack>
                        </FormControl>
                        <Stack direction='row' sx={{alignItems:'center',justifyContent:'center'}}><Button type='submit' onClick={OnSubmit}>Register</Button></Stack>
                        </Stack>
                        </div>:
                        <div>
                        <Stack gap={1.5}>
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae adipisci dolor aspernatur eaque perferendis quaerat neque perspiciatis, amet sed officiis molestiae maiores assumenda deleniti explicabo, itaque nam repellendus delectus aut.</p>
                        <FormControl>
                            <FormLabel>Select your country</FormLabel>
                            <CountrySelect onSelect={OnCountrySelect}/>
                        </FormControl>
                        <Stack direction='row' sx={{alignItems:'center',justifyContent:'center'}}><Button onClick={OnContinue}>Continue</Button></Stack>
                        </Stack>
                        </div>}
                    </form> 
                </div>
            </div>
        </div>
    );
}
