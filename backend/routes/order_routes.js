const express=require('express');
const orderRouter=express.Router();
const auth =require('../middlewares/auth.js');


const {placeOrder,verifyPayment,userOrders}=require('../controllers/ordre_controller.js');


orderRouter.post('/place',auth,placeOrder);

orderRouter.post('/verify',auth,verifyPayment);

orderRouter.post('/userorders',auth,userOrders);



module.exports=orderRouter;