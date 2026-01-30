// src/models/TimelineEntry.js
import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  type: {
     type: String,
      enum: ["education", "work"], 
      required: true 
    },
  institution: { 
    type: String,
     required: true
     },  // Company or school
  roleOrDegree: 
  { type: String, 
    required: true
 },
  duration: { 
    type: String
 },                      // “2021 – 2023”
  description: {
     type: String
     },                   // Short summary
}, { timestamps: true });

export default mongoose.models.TimelineEntry || mongoose.model("TimelineEntry", timelineSchema);
