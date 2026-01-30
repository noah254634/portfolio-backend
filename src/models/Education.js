import mongoose from "mongoose";

const educationSchema=new mongoose.Schema({
    institution:{
        type:String,
        required:true,
    },
    duration:{
        type:String,
        required:true,
    },
    degree:{
        type:String,
        required:true,

    },
    location:{
        type:String,
    },
    description:{
        type:String,
    },
  })
  export default mongoose.model("Education",educationSchema);