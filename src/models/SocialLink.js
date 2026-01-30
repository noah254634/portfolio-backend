// src/models/SocialLink.js
import mongoose from 'mongoose';

const socialLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
    }, // "LinkedIn", "GitHub", etc.
    url: {
      type: String,
      required: true,
    },
    active: {
     type: Boolean,
     default: true,
    }, // Easily hide links without deleting
    order: {
      type: Number,
      default: 0,
    }, // Sort icons left-to-right
  },
  { timestamps: true }
);

export default mongoose.model('SocialLink', socialLinkSchema);
