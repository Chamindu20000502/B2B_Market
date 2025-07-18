import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import React, { Fragment } from 'react';
import axios from 'axios';
import { Typography } from '@mui/material';

const userId = 1; // Replace with actual user ID or fetch dynamically

export default function AddProduct() {
  const [formData, setFormData] = useState({});
  const [priceRanges, setPriceRanges] = useState([{}]);
  const [catagories, setCategories] = useState([]);
  const [companyName, setCompanyName] = useState(''); 
  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API + `/account/${userId}/sell/add_product`);
        setCategories(response.data.catagories);
        setCompanyName(response.data.company_name);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchData();
  }, []);

  const productData = new FormData();

  function SetFileData(event) {
    if(event.target.name === 'thumbnail') {
      productData.append('thumbnail', event.target.files[0]);
    }else if(event.target.name === 'images') {
      for(let i = 0; i < event.target.files.length; i++) {
        productData.append('images', event.target.files[i]);
      }
    }
  }

  function SetFormData(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function SetAttributes(event)
  {
    setAttributes((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  async function SendData()
  {
    try{
      await axios.post(import.meta.env.VITE_API + '/account/1/sell/add_product', productData);
      productData.delete('thumbnail');
      productData.delete('images');
      productData.delete('product_name');
      productData.delete('description');
      productData.delete('category_id');
      productData.delete('company_name');
      productData.delete('price_ranges');
      productData.delete('attributes');
      setFormData({});
      setPriceRanges([]);
      setAttributes({});
      alert('Product added successfully!');
    }catch(err) {
      console.error('Error sending product data:', err);
    }
  }

  function onSubmit() {
    productData.append('product_name', formData.product_name);
    productData.append('description', formData.description);
    productData.append('category_id', formData.category_id);
    productData.append('company_name', companyName);
    productData.append('price_ranges', JSON.stringify(priceRanges));
    productData.append('attributes', JSON.stringify(attributes));
    SendData();
  }

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };



    return (
      <div>
  <Stack
    direction="row"
    spacing={2}
    sx={{ mb: 2, justifyContent: 'space-between', pr: 5 }}
  >
    <Paper
      elevation={2}
      sx={{ backgroundColor: '#36454F', color: 'white', padding: '0rem' }}
    >
      <h2 style={{ marginRight: '1rem', marginLeft: '1rem' }}>Add New Product</h2>
    </Paper>
  </Stack>

  <form action="/account/1/sell/add_product" method="post">
    <Grid container spacing={2}>
      {/* Product Name */}
      <Grid size={3}>Product name</Grid>
      <Grid size={1}>:</Grid>
      <Grid size={8}>
        <TextField
          id="outlined-multiline-flexible"
          placeholder="Enter product name"
          multiline
          name='product_name'
          onChange={SetFormData}
          value={formData.product_name || ''}
          maxRows={4}
          size="small"
          sx={{ width: '80%' }}
        />
      </Grid>

      {/* Company Name */}
      <Grid size={3}>Company name</Grid>
      <Grid size={1}>:</Grid>
      <Grid size={8}>
        <TextField
          id="outlined-multiline-flexible"
          multiline
          disabled
          maxRows={4}
          value={companyName || ''}
          size="small"
          sx={{ width: '80%' }}
        />
      </Grid>

      {/* Product Category */}
      <Grid size={3}>Product Category</Grid>
      <Grid size={1}>:</Grid>
      <Grid size={8}>
        <FormControl sx={{ width: '30%' }} size="small">
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            size="small"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Select Category"
            onChange={handleChange}
          >
            {catagories.map((category, index) => (
              <MenuItem key={index} value={category.id} onClick={() => setFormData((prev) => ({ ...prev, category_id: category.id }))}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      {/* Description */}
      <Grid size={3}>Description</Grid>
      <Grid size={1}>:</Grid>
      <Grid size={8}>
        <TextField
          id="outlined-multiline-flexible"
          placeholder="Enter product name"
          multiline
          name='description'
          onChange={SetFormData}
          value={formData.description || ''}
          maxRows={4}
          size="small"
          sx={{ width: '80%' }}
        />
      </Grid>

      {/* Price Ranges */}
      <Grid size={3}>Price Ranges</Grid>
      <Grid size={1}>:</Grid>
      <Grid size={8}>
        <Stack spacing={2} sx={{ width: '80%' }}>
          {priceRanges.map((priceRange, index) => (
            <Stack key={index} direction="row" spacing={2}>
              <TextField
                placeholder="Min Qty"
                multiline
                value={priceRange.min || null}
                maxRows={4}
                onChange={(e) => {setPriceRanges((prev)=>{if(prev[index]){prev[index].min = e.target.value;return [...prev]}else{return [...prev,{min: e.target.value, max: '', price: ''}]}})}}
                size="small"
                sx={{ width: '80%' }}
              />
              <TextField
                placeholder="Max Qty"
                multiline
                value={priceRange.max || null}
                maxRows={4}
                onChange={(e) => {setPriceRanges((prev)=>{if(prev[index]){prev[index].max = e.target.value;return [...prev]}else{return [...prev,{min: '', max: e.target.value, price: ''}]}})}}
                size="small"
                sx={{ width: '80%' }}
              />
              <TextField
                placeholder="Price"
                multiline
                value={priceRange.price || null}
                maxRows={4}
                onChange={(e) => {setPriceRanges((prev)=>{if(prev[index]){prev[index].price = e.target.value;return [...prev]}else{return [...prev,{min: '', max: '', price: e.target.value}]}})}}
                size="small"
                sx={{ width: '80%' }}
              />
            </Stack>
          ))}
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            onClick={() =>
              setPriceRanges((prev) => [
                ...prev,
                { min: '', max: '', price: '' },
              ])
            }
          >
            <AddIcon />
          </Fab>
        </Stack>
      </Grid>

      {/* Thumbnail Upload */}
      <Grid size={3}>Upload thumbnail</Grid>
      <Grid size={1}>:</Grid>
      <Grid size={8}>
        <input type="file" name="thumbnail" onChange={SetFileData} />
      </Grid>

      {/* Product Images Upload */}
      <Grid size={3}>Product Images</Grid>
      <Grid size={1}>:</Grid>
      <Grid size={8}>
        <input type="file" name="images" multiple onChange={SetFileData} />
      </Grid>
    </Grid>

    {/* Attributes Section */}
    <Typography variant="h4" display="block" gutterBottom sx={{ mt: 7 }}>
      Attributes
    </Typography>

    <Grid container spacing={2} sx={{ mb: 2 }}>
      {[
        'Brand Name',
        'Origin',
        'Model',
        'Warrenty',
        'Payment',
        'Shipping',
        'Single package weight',
        'Single package size',
      ].map((label, idx) => (
        <React.Fragment key={idx}>
          <Grid size={3}>{label}</Grid>
          <Grid size={1}>:</Grid>
          <Grid size={8}>
            <TextField
              id="outlined-multiline-flexible"
              placeholder="Enter attribute name"
              multiline
              name={label.toLowerCase().replace(/\s+/g, '_')}
              onChange={SetAttributes}
              maxRows={4}
              size="small"
              sx={{ width: '80%' }}
            />
          </Grid>
        </React.Fragment>
      ))}
    </Grid>

    {/* Submit Button */}
    <Stack
      sx={{
        width: '80%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: '2rem',
        marginBottom: '5rem',
      }}
    >
      <div>
        <Button variant="contained" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </Stack>
  </form>
</div>

    );
}
