const mongoose=require('mongoose');
require('dotenv').config();


const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.Database_URL)
        .then(console.log('connected to db'));
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports=connectDB;