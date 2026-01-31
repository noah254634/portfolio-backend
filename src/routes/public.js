import { getPortfolioData } from "../controllers/publicController.js";
import express from "express";
const router = express.Router();
router.get("/", getPortfolioData);
export default router;