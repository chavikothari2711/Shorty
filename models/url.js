import mongoose from "mongoose";
const urlSchema = new mongoose.Schema({
    shortID:{
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    visitHistory:[{timestamps:{type:Number},date:{type:String},time:{type:String}}],

},{timestamps:true})

export default mongoose.model('url',urlSchema)