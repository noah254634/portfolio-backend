// src/routes/socialLinks.js
import express from "express";
import { getSocialLinks, addSocialLink, deleteSocialLink } from "../controllers/socialLinkController.js";

const router = express.Router();

router.get("/", getSocialLinks);
router.post("/", addSocialLink);
router.delete("/:id", deleteSocialLink);

export default router;