import Education from "../models/Education.js";
import Profile from "../models/Profile.js";
import Skill from "../models/Skill.js";
import Testimonial from "../models/Testimonial.js";
import Project from "../models/Project.js";
export const getPortfolioData=async(req,res)=>{
    try{
        const [profile,education,skills,testimonials,projects]=await Promise.all([
            Profile.findOne({}),
            Education.find({}).sort({duration:-1}),
            Skill.find({}),
            Testimonial.find({}),
            Project.find({status:"building"}).sort({createdAt:1}),
        ]);
        return res.status(200).json({
            profile,
            education,
            skills,
            testimonials,
            projects
        });
    }catch(err){
        res.status(500).json({message:"SORRY, AN ERROR OCCURED WHILE FETCHING PORTFOLIO DATA"});
    }

};