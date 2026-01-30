// src/routes/profile.js
import express from "express";
import { getProfile, updateProfile, createProfile} from "../controllers/profileController.js";

const router = express.Router();
router.post("/", createProfile);
router.get("/", getProfile);
router.put("/", updateProfile);
router.get("/health", (req, res) => {
  res.status(200).send("Profile route is healthy");
});

export default router;
