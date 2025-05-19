import express from "express";
import env from "dotenv";
import pg from "pg";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';

env.config();

const app = express();
const PORT = process.env.PORT;
const saltRounds = process.env.SALT_ROUNDS;
const db = new pg.Client({
  user : process.env.DB_USER,
  host : process.env.DB_HOST,
  database : process.env.DB_NAME,
  password : process.env.DB_PW,
  port: process.env.DB_PORT
});

console.log(saltRounds);

app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());

db.connect();


//Provide data for product page
app.get("/product", async(req,res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const product_id = 1;
  var details = {};
  var catagory_id = null;

  try
  {
    const response = await db.query('select * from product where product_id = $1',[product_id]);
    details.name = response.rows[0].name;
    details.description = response.rows[0].description;
    details.store_id = response.rows[0].store_id;
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
    const response = await db.query('select img_url from product_images where product_id = $1',[product_id]);
    details.images = response.rows;
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



//Hanndling data coming from register page
app.post("/register",async(req,res)=>{
  const data = req.body;
  const phone_no = '+' + data.phone_code + ' ' +data.phone_number;

  bcrypt.hash(data.pw,saltRounds,async(err,hash)=>{
    if(err)
    {
      console.log('ERROR (hashing) => ' + err);
      res.send(err);
    }else
    {
      console.log('hash : ' + hash);
      try
      {
        await db.query('insert into client (f_name, l_name, country_code, tel, company_name, email, pw) values($1,$2,$3,$4,$5,$6,$7)',[
        data.f_name, data.l_name, data.country_code,phone_no, data.company, data.email, hash
        ]);
      }catch(err)
      {
        console.log('ERROR (register) : ' + err);

        switch(err.constraint.split("_")[1])
        {
          case 'tel' : res.send("This phone number is already registered!"); break;
          case 'email' : res.send("This email is already registered!"); break;
          default : res.send("Something went wrong!");
        }
      }
    }
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});