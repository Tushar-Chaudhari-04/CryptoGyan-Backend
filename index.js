const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors");

// const authRoute=require("./routes/auth");
// const usersRoute=require("./routes/user");
// const productsRoute=require("./routes/product");
// const cartRoute=require("./routes/cart");
// const orderRoute=require("./routes/order");
// const stripeRoute=require("./routes/stripe");

dotenv.config();                           //dotenv stores all secret keys
const app=express();                       //app uses express for backend

mongoose
    .connect(process.env.MONGODB_URL)
    .then(()=>console.log("DB Connected Successfully"))
    .catch(err=>console.log(err));  //MongoDB Cloud Connection

//Routes used 
app.use(cors());
app.use(express.json());
// app.use("/shopify/auth",authRoute);
// app.use("/shopify/users",usersRoute);
// app.use("/shopify/products",productsRoute);
// app.use("/shopify/cart",cartRoute);
// app.use("/shopify/orders",orderRoute);
// app.use("/shopify/checkout",stripeRoute);

// process.env.PORT || 
app.listen(process.env.PORT || 3000,()=>{           //Server Starting process...npm start
    console.log("Backend Server is Running...")
});