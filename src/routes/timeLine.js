// src/routes/timeLine.js
import express from "express";
import { getTimeline, createTimelineEntry, deleteTimelineEntry } from "../controllers/timeController.js";

const router = express.Router();

router.get("/", getTimeline);
router.post("/", createTimelineEntry);
router.delete("/:id", deleteTimelineEntry);

export default router;