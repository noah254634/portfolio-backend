// src/controllers/profileController.js
import Profile from "../models/Profile.js";
import {uploadToCloudinary} from "../utils/uploadCloudinary.js";

// GET profile
export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne(); // Only one hero profile
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProfile = async (req, res) => {
  try {
    const image = req.files?.image?.[0];
    const resume = req.files?.resume?.[0];
    const { name, bio, tagline } = req.body;
    
    // Manually construct the links object from the request body
    const links = {
      github: req.body['links[github]'],
      linkedin: req.body['links[linkedin]'] ,
      twitter: req.body['links[twitter]'] 
    };

    if (!name || !bio ) {
      console.log("Missing fields in profile creation", req.body);
      return res.status(400).json({ error: "All fields are required" });
    }

    let imgUrl, resumeUrl;

    if (image) {
      const imageResponse = await uploadToCloudinary(image.buffer, "profile/Images");
      imgUrl = imageResponse.secure_url;
    }

    if (resume) {
      const resumeResponse = await uploadToCloudinary(resume.buffer, "profile/Resumes");
      resumeUrl = resumeResponse.secure_url;
    }

    const newProfile = new Profile({
      name,
      tagline,
      bio,
      links,
      resume: resumeUrl,
      profileImage: imgUrl,
    });

    const savedProfile = await newProfile.save();
    res.status(201).json(savedProfile);
    console.log("Profile created successfully:", savedProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Error creating profile:", err);
    console.log("Request body:", req.body);
  }
};

// PUT profile (admin updates)
export const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Error updating profile:", err);
  }
};
