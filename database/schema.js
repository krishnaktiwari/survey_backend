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

const surveySchema = new mongoose.Schema({
    _id:{type:Number,required:true},
    uuid:{type:Number,required:true},
    title:{type:String,required:true},
    description:{type:String,required:true},
    status:{type:String,required:true},
    created_by:{type:String,required:true},
    created_at:{type:Number,default:Date.now}
})


const questionSchema = new mongoose.Schema({
    _id:{type:Number,required:true},
    uuid:{type:Number,required:true},
    survey_id:{type:Number,required:true},
    question:{type:String,required:true},
    type:{type:String,required:true},
    Option:{type:String,required:true},
    created_by:{type:String,required:true},
    created_at:{type:Number,default:Date.now}
})

const surveyreportSchema = new mongoose.Schema({
    _id:{type:Number,required:true},
    uuid:{type:Number,required:true},
    user_id:{type:Number,required:true},
    question_id:{type:Number,required:true},
    answer:{type:String,required:true},
    created_by:{type:String,required:true},
    created_at:{type:Number,default:Date.now}
})




const model = mongoose.model("users",userSchema)
module.exports = model
const models = mongoose.model("surveys",surveySchema)
module.exports = models
const modelss = mongoose.model("questions",questionSchema)
modeule.exports = modelss
const modelsss = mongoose.model("surveyreport",surveyreportSchema)
module.exports = modelsss