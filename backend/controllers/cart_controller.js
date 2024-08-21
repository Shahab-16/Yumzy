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
            message:err.message
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
            message:err.message
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
            message:err.message
        })
    }
};

