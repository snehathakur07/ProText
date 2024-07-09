import mongoose from "mongoose";
const { Schema } = mongoose;
const creativeWritingSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    },
    content: {
        type: String,
        required: true,
    },
    category:{
        type:String,
        required:true
    },
}, { timestamps: true });
export default mongoose.model('CreativeWriting', creativeWritingSchema);