const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    cartData:{
        type:Object,
        default:{}
    }
},{minimize:false})

module.exports=mongoose.model('User',userSchema)