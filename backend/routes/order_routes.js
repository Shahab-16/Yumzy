const express=require('express');
const orderRouter=express.Router();
const auth =require('../middlewares/auth.js');


const {placeOrder,verifyOrder,userOrders,getOrdersAdmin,updateStatus}=require('../controllers/ordre_controller.js');


orderRouter.post('/place',auth,placeOrder);

orderRouter.post('/verify',auth,verifyOrder);

orderRouter.post('/userorders',auth,userOrders);

orderRouter.get('/list',getOrdersAdmin)

orderRouter.post('/status',updateStatus)



module.exports=orderRouter;