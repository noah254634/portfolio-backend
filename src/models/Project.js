// src/models/Project.js
import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true
    },
    techStack: [String], // ["React", "Node.js", "MongoDB"]
    githubLink: {
      type: String,
    },
    liveDemoLink: {
      type: String,
    },
    image: {
      type: String,
    }, // URL to project image
    featured: {
      type: Boolean,
      default: false,
    }, // Featured card
    status: {
      type: String,
      enum: ['building', 'shipped', 'archived'], 
      default: 'building',
   },
  },
  { timestamps: true }
);

export default mongoose.models.Project ||
  mongoose.model('Project', projectSchema);
