const express=require('express');
const router=express.Router();
const auth =require('../middlewares/auth.js');

const {addToCart,removeFromCart,getCartItems}=require('../controllers/cart_controller.js');



router.post('/addtocart',auth,addToCart);
router.post('/removefromcart',auth,removeFromCart);
router.post('/getcartitems',auth,getCartItems);



module.exports=router;