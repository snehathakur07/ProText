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
    synonyms: {
        type: [{
            type: String,
            maxlength: 50 
        }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5'] 
    },
    antonyms: {
        type: [{
            type: String,
            maxlength: 50  
        }],
        validate: [arrayLimit, '{PATH} exceeds the limit of 5'] 
    },
    example:{
        type:String,
        required:true
    }
},{timestamps:true});
function arrayLimit(val) {
    return val.length <= 5;
}
export default mongoose.model('wordMeanings', wordSchema);