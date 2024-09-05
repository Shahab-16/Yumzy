const jwt=require('jsonwebtoken');


const auth=async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return res.status(400).json({
            success:false,
            message:'Please provide token'
        })
    }
    try{
        const decode_token=jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId=decode_token.id;
        next();
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:'Please provide valid token and code is in auth.js middleware line no 20'
        })
    }
}

module.exports=auth