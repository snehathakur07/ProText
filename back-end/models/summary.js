import mongoose from "mongoose";
const {Schema}= mongoose;
const summarySchema= new Schema({
    title:{
        type:String,
        required:true,
        trim: true,
        maxLength: 50
    },
    summary:{
        type:String,
        required:true
    }
}, {timestamps:true})

export default mongoose.model('summary', summarySchema);