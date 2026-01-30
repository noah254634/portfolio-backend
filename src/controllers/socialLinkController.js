// src/controllers/socialLinkController.js
import SocialLink from "../models/SocialLink.js";

// GET social links
export const getSocialLinks = async (req, res) => {
  try {
    const socialLinks = await SocialLink.find();
    res.json(socialLinks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addSocialLink = async (req, res) => {
    try {
        const socialLink = new SocialLink(req.body);
        await socialLink.save();
        res.status(201).json(socialLink);
    } catch (err) {
        res.status(500).json({ error: "Error creating social link" });
        console.error("Error creating social link:", err.message);
    }
};

export const deleteSocialLink = async (req, res) => {
    try {
        await SocialLink.findByIdAndDelete(req.params.id);
        res.json({ message: "Social link deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting social link" });
    }
};