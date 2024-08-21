const express=require('express');
const cors=require('cors');
const connectDB=require('./config/database');
const food_routes=require('./routes/food_routes.js');
const user_routes=require('./routes/user_routes.js');
const cart_routes=require('./routes/cart_routes.js');
const order_route=require('./routes/order_routes.js');
const app=express();
require('dotenv').config();



app.use(express.json());
app.use(cors());

app.use('/api/v1/food',food_routes);
app.use("/images",express.static("uploads"));
app.use('/api/v1/user',user_routes);
app.use('/api/v1/cart',cart_routes);
app.use('/api/v1/order',order_route);

app.listen(5000,()=>{
    console.log('listening on port 5000');
})


connectDB();

app.get('/',(req,res)=>{
    res.send('hello world');
});


