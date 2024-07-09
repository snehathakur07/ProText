import mongoose from "mongoose";
const {Schema}=mongoose;
const wordSchema= new Schema({
    word:{
        type:String,
        required:true
    },
    meaning:{
        type:String,
        required:true
    },
    example:{
        type:String,
        required:true
    }
},{timestamps:true});
export default mongoose.model('wordMeanings', wordSchema);