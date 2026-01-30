import mongoose from "mongoose";
const testimonialSchema=new mongoose.Schema({
    clientName:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
});
export default mongoose.model("Testimonial",testimonialSchema);