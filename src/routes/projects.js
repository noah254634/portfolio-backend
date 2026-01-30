// src/routes/projects.js
import express from "express";
import { getProjects, getProjectById, createProject, updateProject, deleteProject } from "../controllers/projectController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProjectById);
router.post("/", upload.single('image'), createProject);
router.put("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;