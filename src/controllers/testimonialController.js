import Testimonial from "../models/Testimonial.js";
import {uploadToCloudinary} from "../utils/uploadCloudinary.js";

export const getTestimonial=async(req,res)=>{
    try{
        const testimonials=await Testimonial.find();
        return res.status(200).json(testimonials);
    }catch(err){
        console.log("Error in getTestimonial",err);
        return res.status(500).json({message:"Error fetching testimonials",error:err.message});
    }
}
export const createTestimonial = async (req, res) => {
  try {
    const { clientName, role, company, content } = req.body;
    console.log("field", req.body);
    if (!clientName || !role || !company || !content) {
      console.log("field", req.body);
      return res.status(400).json({ error: "All fields are required" });
    }
    if (!req.file) {
        return res.status(400).json({ error: "Image file is required" });
    }
    
    const cloudRes = await uploadToCloudinary(Buffer.from(req.file.buffer), "testimonials/Images");
    const imgUrl = cloudRes.secure_url;
    
    const newTestimonial = new Testimonial({
      clientName,
      role,
      company,
      content,
      image: imgUrl,
    });
    const savedTestimonial = await newTestimonial.save();
    return res.status(201).json(savedTestimonial);
  } catch (err) {
    console.log("Error in createTestimonial", err);
    return res
      .status(500)
      .json({ message: "an error occured during the create testimonial", error: err.message });
  }
};

export const deleteTestimonial = async (req, res) => {
    try {
        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: "Testimonial deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting testimonial" });
    }
};