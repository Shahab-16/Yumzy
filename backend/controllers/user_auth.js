const user=require('../models/user_schema');
const validator=require('validator');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

exports.signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!validator.isEmail(email)){
            return res.status(400).json({
                success:false,
                message:'Please provide valid email'
            })
        }
        if(password.length<8){
            res.status(400).json({
                success:false,
                message:'Password should be at least 8 characters'
            })
        }
        let user_data=await user.findOne({email:email});
        if(user_data){
           return res.status(400).json({
                success:false,
                message:'User already exists'
            })
        }

        let hashpassword=await bcrypt.hash(password,10);
        user_data=new user({
            name:name,
            email:email,
            password:hashpassword
        });
        await user_data.save();
        const token=createToken(user_data._id);
        return res.status(200).json({
            success:true,
            token:token,
            message:'User created successfully'
        });
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Problem in signing up and this is in user_auth.js controller line no 34",
        });
    }
}

exports.login=async(req,res)=>{
    try{
        let {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:'Please provide email and password'
            });
        }

        let user_data=await user.findOne({email:email});
        if(!user_data){
            return res.status(400).json({
                success:false,
                message:'User does not exist'
            });
        }
        const isMatch=await bcrypt.compare(password,user_data.password);
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:'Incorrect password'
            });
        }

        const token=createToken(user_data._id);
        
        return res.status(200).json({
            success:true,
            message:'User logged in successfully',
            token:token
        });
        
    }
    catch(err){
        console.log("Error in login")
        return res.status(400).json({
            success:false,
            message:"Problem in login and this is in user_auth.js controller line no 68",
        });
    }
}