import express from "express";
import env from "dotenv";
import pg from "pg";

env.config();

const app = express();
const PORT = process.env.PORT;
const db = new pg.Client({
  user : process.env.DB_USER,
  host : process.env.DB_HOST,
  database : process.env.DB_NAME,
  password : process.env.DB_PW,
  port: process.env.DB_PORT
});

db.connect();

app.get("/product", async(req,res)=>{
  const product_id = 1;
  var details = {};
  var catagory_id = null;

  try
  {
    const response = await db.query('select * from product where product_id = $1',[product_id]);
    details.name = response.rows[0].name;
    details.description = response.rows[0].description;
    catagory_id = response.rows[0].catagory;

    try{
      const response = await db.query('select name from catagory where id = $1',[catagory_id]);
      details.catagory = response.rows[0].name;
    }catch(err)
    {
      console.log('ERROR : ' + err);
    }

  }catch(err)
  {
    console.log('ERROR : ' + err);
  }
  
  try
  {
    const response = await db.query('select quantity_min, quantity_max, price from price_ranges where product_id = $1',[product_id]);
    details.price_ranges = response.rows;
  }catch(err)
  {
    console.log('ERROR : ' + err);
  }
  
  try
  {
    const response = await db.query('select variation_id, name from variations where product_id = $1',[product_id]);
    var variations = response.rows;   

    for(var i = 0; i < variations.length; i++)
    {
      try{
        const response = await db.query('select choice_id,choice ,img_url from variation_choices where variation_id = $1',[variations[i].variation_id]);
        variations[i].choices = response.rows;
      }catch(err)
      {
        console.log('ERROR : ' + err);
      }      
    }
    details.variations = variations;
  }catch(err)
  {
    console.log('ERROR : ' + err);
  }

  try
  {
    const response = await db.query('select brand_name, origin, model, warrenty, payment, shipping, single_package_size, single_package_weight from product_attributes where product_id = $1',[product_id]);
    details.attributes = response.rows;
  }catch(err)
  {
    console.log('ERROR : ' + err);
  }
  
  try
  {
    const response = await db.query('select buyer_id, description, rate from product_reviews where product_id = $1',[product_id]);
    var rating = null;
    for(var i =0; i < response.rowCount; i++)
    {
      rating += response.rows[i].rate;
    }
    rating /= response.rowCount;
    details.rating = rating;

    details.reviews = response.rows;

  }catch(err)
  {
    console.log('ERROR : ' + err);
  }

  res.json(details);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});