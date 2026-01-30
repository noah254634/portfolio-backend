// src/controllers/timeController.js
import TimelineEntry from "../models/TimeLineEntry.js";

export const getTimeline = async (req, res) => {
  try {
    const entries = await TimelineEntry.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createTimelineEntry = async (req, res) => {
  try {
    const entry = new TimelineEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteTimelineEntry = async (req, res) => {
    try {
        await TimelineEntry.findByIdAndDelete(req.params.id);
        res.json({ message: "Timeline entry deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting timeline entry" });
    }
};