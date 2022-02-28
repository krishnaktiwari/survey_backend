const mongoose = require("mongoose");

// user schema 
const userSchema = new mongoose.Schema({
    _id:{type:Number,required:true},
    uuid:{type:Number,required:true},
    name:{type:String,required:true},
    phone:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
    status:{type:String,required:true},
    image:{data:Buffer,contentType:String},
    created_by:{type:String,required:true},
    created_at:{type:Number,default:Date.now}
})




const model = mongoose.model("users",userSchema)
module.exports = model