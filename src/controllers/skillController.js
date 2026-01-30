// src/controllers/skillController.js
import Skill from "../models/Skill.js";

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addSkill = async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).json(skill);
    } catch (err) {
        res.status(500).json({ error: "Error creating skill" });
        console.error("Error creating skill:", err.message);
    }
};

export const deleteSkill = async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: "Skill deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting skill" });
    }
};