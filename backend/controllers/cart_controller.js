const userModel=require('../models/user_schema')


exports.addToCart=async(req,res)=>{
    try{
        let userData=await userModel.findById({_id:req.body.userId});
        let cartData=userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:cartData});
        return res.status(200).json({
            success:true,
            message:'Item added to cart'
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Add to Cart failed and this is in cart_controller.js controller line no 23"  
        })
    }
};


exports.removeFromCart=async(req,res)=>{
    try{
        let userData=await userModel.findOne({_id:req.body.userId});
        let cartData=userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:cartData});
        return res.status(200).json({
            success:true,
            message:'Item removed from cart'
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Remove from Cart failed and this is in cart_controller.js controller line no 47"
        })
    }
};

exports.getCartItems=async(req,res)=>{
    try{
        let userData=await userModel.findById({_id:req.body.userId});
        let cartData=userData.cartData;
        return res.status(200).json({
            success:true,
            data:cartData
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Get Cart Items failed and this is in cart_controller.js controller line no 64"
        })
    }
};

