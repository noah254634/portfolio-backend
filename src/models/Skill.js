// src/models/Skill.js
import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }, // Skill name
    category: {
      type: String,
      enum: ['frontend', 'backend', 'AI', 'tools'],
      default: 'tools',
    },
    proficiency: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    }, // Optional for progress bars
  },
  { timestamps: true }
);

export default mongoose.model('Skill', skillSchema);
