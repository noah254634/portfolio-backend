// src/controllers/projectController.js
import Project from "../models/Project.js";
import { uploadToCloudinary } from "../utils/uploadCloudinary.js";

// GET all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error("Error fetching projects in getProjects:", err);
  }
};

// GET single project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: "Error fetching project" });
  }
};

// POST new project (admin)
export const createProject = async (req, res) => {
  try {
    const { title, techStack, description } = req.body;
    if (!title || !techStack || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let imageUrl;
    if (req.file) {
      const result = await uploadToCloudinary(Buffer.from(req.file.buffer));
      imageUrl = result.secure_url;
    }

    const project = new Project({
      title,
      techStack,
      description,
      image: imageUrl,
    });
    console.log("Creating project with data:", req.body);
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: "an error occured during the create project", message: err.message });
    console.error("Error creating project in createProject:", err.message);
  }
};

// PUT update project
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE project
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting project" });
  }
};