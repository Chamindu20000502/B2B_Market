import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import './RegisterPage.css'
import React, { useEffect, useState } from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import CountrySelect from './CountrySelect';
import Button from '@mui/joy/Button';


export default function RegisterPage()
{
    const [formData , setFormData] = useState({});

    function UpdateFormData(event)
    {
        switch(event.target.name)
        {
            case 'f_name' : setFormData((previousValue)=>{
                return(
                    {
                        f_name: event.target.value,
                        email : previousValue.email,
                        company : previousValue.company,
                        tel : previousValue.tel
                    }
                );
            }); break;

            case 'email' : setFormData((previousValue)=>{
                return(
                    {
                        f_name: previousValue.f_name,
                        email : event.target.value,
                        company : previousValue.company,
                        tel : previousValue.tel
                    }
                );
            }); break;

            case 'company' : setFormData((previousValue)=>{
                return(
                    {
                        f_name: previousValue.f_name,
                        email : previousValue.email,
                        company : event.target.value,
                        tel : previousValue.tel
                    }
                );
            }); break;

            case 'tel' : setFormData((previousValue)=>{
                return(
                    {
                        f_name: previousValue.f_name,
                        email : previousValue.email,
                        company : previousValue.company,
                        tel : event.target.value
                    }
                );
            }); break;
        }
        console.log(formData);
    }

    return(
        <div id='page-area'>
            <h1>Register</h1>
            <div id='form-area'>
                <div style={{width:'500px'}}>                    
                    
                        <Stack direction='row' sx={{justifyContent:'space-between'}}>
                            <div style={{width:'45%'}}>
                                <FormControl>
                                    <FormLabel>First Name</FormLabel>
                                    <Input id='f_name' placeholder="Placeholder"/>
                                </FormControl>
                            </div>
                            <div style={{width:'45%'}}>
                                <FormControl>
                                    <FormLabel>Last Name</FormLabel>
                                    <Input id='l_name' placeholder="Placeholder"/>
                                </FormControl>
                            </div>                                                 
                        </Stack>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type='email'/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <Input type='password'/> 
                        </FormControl>
                        <FormControl>
                            <FormLabel>Confirm password</FormLabel>
                            <Input type='password'/> 
                        </FormControl>
                        <FormControl>
                            <FormLabel>Company Name</FormLabel>
                            <Input/>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Phone number</FormLabel>                     
                            <Stack direction='row' gap={2}>                            
                                <Stack direction='row' sx={{alignItems:'center'}}><Typography sx={{fontSize:'1.5rem'}}>+</Typography><Input sx={{width:'4rem'}} type='number'/></Stack>
                                <Input slotProps={{input:'hhh'}}/>
                            </Stack>
                        </FormControl>   
                        <FormControl><FormLabel>Select your country</FormLabel></FormControl>                    
                    <CountrySelect/>
                    <Button>Register</Button>
                </div>
            </div>
        </div>
    );
}