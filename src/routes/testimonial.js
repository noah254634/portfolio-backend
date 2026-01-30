import express from "express";
import { getTestimonial,createTestimonial, deleteTestimonial } from "../controllers/testimonialController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/", getTestimonial);
router.post("/",upload.single('image'), createTestimonial); // Example of another route
router.delete("/:id", deleteTestimonial);


export default router;