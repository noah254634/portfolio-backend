// src/models/Profile.js
import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: {
      type: String,
    }, // Short “I build X” text
    bio: {
      type: String,
    }, // Longer bio
    profileImage: {
      type: String,
    }, // URL to image
    links: {
      github: { type: String },
      linkedin: { type: String },
      twitter: { type: String },
    },
    resume: {
      type: String,
    }, // URL to resume
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
