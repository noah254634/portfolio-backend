import { getHeartBeat } from "../controllers/heartBeatController.js";
import express from "express";  
const router = express.Router();
router.get("/", getHeartBeat);
export default router;