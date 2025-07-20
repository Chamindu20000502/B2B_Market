import express from "express";
import env from "dotenv";
import pg from "pg";
import bodyParser from "body-parser";
import bcrypt from 'bcrypt';
import multer from "multer";
import fs from "fs";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";

env.config();

const app = express();
const PORT = process.env.PORT;
const saltRounds = 10;
const db = new pg.Client({
  user : process.env.DB_USER,
  host : process.env.DB_HOST,
  database : process.env.DB_NAME,
  password : process.env.DB_PW,
  port: process.env.DB_PORT
});

app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : true,
  cookie :{
    maxAge : 1000 * 60 * 60 * 24
  }
}));

app.use(passport.initialize());
app.use(passport.session());

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

const insertProduct = async (req, res, next) => {
  const userId = req.params.id;
  try {
    const response = await db.query(
      'INSERT INTO product (store_id) VALUES ($1) RETURNING product_id',
      [userId]
    );
    req.product_id = response.rows[0].product_id; // Attach to req for use in multer
    next();
  } catch (err) {
    console.error('ERROR (insert product):', err);
    res.status(500).json({ error: 'Failed to insert product' });
  }
};


const storage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const userId = req.params.id;
    var product_id = req.product_id || req.body.product_id;
    var folderPath ='';
    if(file.fieldname === 'thumbnail')
    {
      folderPath = process.env.PRODUCT_IMAGES_PATH + product_id + '/thumbnail';
      await db.query('UPDATE product SET thumbnail = $1 WHERE product_id = $2', [product_id + '/thumbnail' + '/' + file.originalname, product_id])
    }else if(file.fieldname === 'images')
    {
      folderPath = process.env.PRODUCT_IMAGES_PATH + product_id + '/images';
      await db.query('INSERT INTO product_images (product_id, img_url) VALUES ($1, $2)', [product_id, product_id + '/images' + '/' + file.originalname]);
    }
    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath); // Folder to save files
},
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

db.connect();


//Provide data for product page
app.get("/product/:id", async(req,res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  const product_id = req.params.id;
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

app.get("/account/:id/buy/orders/:status_id", async(req,res)=>{
  const id = req.params.id;
  const status_list = req.params.status_id.split(",");
  var status_list_int = [];
  for(var i = 0; i < status_list.length; i++)
  {
    status_list_int.push(parseInt(status_list[i]));
  }

  var details = [];
  try
  {
    var quary = 'select * from orders inner join order_status on orders.status_id = order_status.status_id inner join payment_method on orders.pay_method_id = payment_method.id where buyer_id = $1 and orders.status_id in (';
    for(var i = 0; i < status_list_int.length; i++)
    {
      if(i !== 0)
      {
        quary += ',';
      }
      quary += status_list_int[i];
    }
    quary += ')';
    const response = await db.query(quary,[id]);
    
    if(response.rowCount === 1)
    {
      try
      {
        const response_2_1 = await db.query('select company_name from client where id = $1',[response.rows[0].seller_id]);
        const response_2_2 = await db.query('select name from product where product_id = $1',[response.rows[0].product_id]);
        details.push({...response.rows[0],...response_2_1.rows[0],...response_2_2.rows[0]});
        res.json(details);
      }catch(err)
      {
        console.log('ERROR (response 2): ' + err);
      }
    }else if(response.rowCount > 1)
    {
      for(var i = 0; i < response.rowCount; i++)
      {
        try
        {
          const response_3_1 = await db.query('select company_name from client where id = $1',[response.rows[i].seller_id]);
          const response_3_2 = await db.query('select name from product where product_id = $1',[response.rows[i].product_id]);
          details.push({...response.rows[i],...response_3_1.rows[0],...response_3_2.rows[0]});
        }catch(err)
        {
          console.log('ERROR (response 3): ' + err);
        }
      }
      res.json(details);
    }else
    {
      res.json([]);
    }

  }catch(err)
  {
    console.log(err);
  }
});

app.get("/account/:id/buy/reviews", async(req,res)=>{
  const id = req.params.id;

  try
  {
    const response = await db.query('select order_number, seller_id, qty, status_id, placed_date, price , company_name , name from orders inner join client on client.id = orders.seller_id inner join product on product.product_id = orders.product_id where buyer_id = $1 and status_id in (6,7)',[id]);
    res.json(response.rows);
  }catch(err)
  {
    console.log('ERROR (reviews) : ' + err);
    console.log('Failed to fetch reviews for buyer ID: ' + id);
  }
});

app.post("/account/:id/buy/reviews", async(req,res)=>{
  const id = req.params.id;
  const rate = req.body.rating;
  const description = req.body.review;
  var product_id = null;
  const order_number = req.body.order_number;

  try
  {
    const response = await db.query('select product_id from orders where order_number = $1',[order_number]);
    product_id = response.rows[0].product_id;
  }catch(err)
  {
    console.log('ERROR (fetching product_id) : ' + err);
  }

  try
  {
    await db.query('insert into product_reviews (buyer_id, product_id, description, rate) values($1,$2,$3,$4)',[
      id, product_id, description, rate
    ]);
    await db.query('update orders set status_id = 7 where order_number = $1',[order_number]);
    res.json({status: "success", message: "Review submitted successfully!"});
  }catch(err)
  {
    console.log('ERROR (review) : ' + err);
    res.json({status: "error", message: "Failed to submit review. Please try again later."});
  }
});

app.get("/account/:id/buy/review_count",async(req,res)=>{
  const id = req.params.id;
  try
  {
    const response = await db.query('select count (status_id) from orders where buyer_id = $1 and status_id = 6',[id]);
    res.send(parseInt(response.rows[0].count));
  }catch(err)
  {
    res.send(0);
    console.log(err);
  }
});

app.get("/account/:id/sell/my_products", async(req,res)=>{
  const id = req.params.id;
  var details = [];
  try
  {
    const response = await db.query('select product_id, product.name, description, store_id, catagory.name as catagory from product inner join catagory on product.catagory = catagory.id where store_id = $1',[id]);
    for(var i = 0; i < response.rowCount; i++)
    {
      try
      {
        const response_2 = await db.query('select min(price), max(price) from price_ranges where product_id = $1',[response.rows[i].product_id]);
        details.push({...response.rows[i],...response_2.rows[0]});
      }catch(err)
      {
        console.log('ERROR (my_products) : ' + err);
      }
    }
    res.json(details);
  }catch(err)
  {
    console.log('ERROR (my_products) : ' + err);
    res.json([]);
  }
});

app.post("/account/:id/sell/add_product", insertProduct ,upload.fields([{name:'thumbnail', maxCount :1},{name:'images', maxCount:10}]), async(req,res)=>{
  try
  {
    console.log(req.body);
    try
    {
      await db.query('update product set name = $1, description = $2, catagory = $3 where product_id = $4',[
      req.body.product_name, req.body.description, req.body.category_id, req.product_id]);
      const price_ranges = JSON.parse(req.body.price_ranges);
      if(price_ranges && price_ranges.length > 0)
      {
        for(var i = 0; i < price_ranges.length; i++)
        {
          try{
            await db.query('insert into price_ranges (product_id, quantity_min, quantity_max, price) values ($1, $2, $3, $4)',[
              req.product_id, price_ranges[i].min, price_ranges[i].max, price_ranges[i].price
            ]);
          }catch(err)
          {
            console.log('ERROR (inserting price range) : ' + err);
          }
        }
      }
      const attributes = JSON.parse(req.body.attributes);
      try
      {
        await db.query('insert into product_attributes (product_id, brand_name, origin, model, warrenty, payment, shipping, single_package_size, single_package_weight) values ($1, $2, $3, $4, $5, $6, $7, $8, $9)',[
          req.product_id,
          attributes.brand_name,
          attributes.origin,
          attributes.model,
          attributes.warrenty,
          attributes.payment,
          attributes.shipping,
          attributes.single_package_size,
          attributes.single_package_weight
        ]);
      }catch(err)
      {
        console.log('ERROR (inserting attributes) : ' + err);
      }
    }catch(err)
    {
      console.log(err);
      res.status(500).send('Failed to update product details');
      return;
    }
    
  }catch(err)
  {
    console.log('ERROR (add_product) : ' + err);
    res.status(500).send('Failed to add product');
    return;
  }
  res.send('File uploaded successfully!');
});

app.get("/account/:id/sell/add_product", async(req,res)=>{
  const id = req.params.id;
  try
  {
    const response = await db.query('select * from catagory');
    const response_2 = await db.query('select company_name from client where id = $1',[id]);
    res.json({catagories: response.rows, company_name: response_2.rows[0].company_name});
  }catch(err)
  {
    console.log('ERROR (fetching categories) : ' + err);
    res.json([]);
  }
});

app.post("/login", passport.authenticate("local", { failureRedirect: "/login" }), (req, res) => {
  res.json({status: "success", message: "Login successful!", user: req.user});
});

passport.use("local",new Strategy(async function verify(username,password,cb){
  try
  {
    const response = await db.query('SELECT * FROM client WHERE email = $1', [username]);
    if(response.rowCount > 0)
      {        
        const user = response.rows[0];
        const hashedPw = response.rows[0]["pw"];
        bcrypt.compare(password,hashedPw,(err,result)=>{
          if(!err)
          {
            if(result)
              {
                return cb(null,user);
              }else{
                return cb(null,false);
              }
          }else
          {
            return cb(err);
          }
        });
      }else
      {
        return cb("Username not found");
      }
  }catch(err)
  {
    return cb(err);
  }
}));

passport.serializeUser((user,cb)=>{
  cb(null,user);
});

passport.deserializeUser((user,cb)=>{
  cb(null,user);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});