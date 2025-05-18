import React, { useState , useEffect} from 'react';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import axios from 'axios';

export default function CountrySelect(props) {
  const [countries ,setCountries] = useState([]);
  const [selectedCountry , setSelectedCountry] = useState(null);

  useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const response = await axios.get('https://countriesnow.space/api/v0.1/countries/population');
                setCountries(response.data.data);
            }catch(err)
            {
                console.log(err);
            }
        }
        fetchData();
    },[]);

  return (  
    <Select placeholder="Choose one…">
        {countries.map((country)=>{
            return(<Option onClick={()=>{props.onSelect(country.code)}} key={country.code} value={country.code}>{country.country}</Option>);
        })}
    </Select>
  );
}
