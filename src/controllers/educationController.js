import Education from '../models/Education.js';

// GET all education entries
export const getEducation = async (req, res) => {
    try{
        const educationEntries = await Education.find();
        res.json(educationEntries);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
        console.log("Error fetching education entries:", err);

    }
}

export const addEducation = async (req, res) => {
    try {
        const education = new Education(req.body);
        await education.save();
        res.status(201).json(education);
    } catch (err) {
        res.status(500).json({ error: "Error creating education" });
        console.error("Error creating education:", err.message);
    }
};

export const deleteEducation = async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: "Education deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error deleting education" });
    }
};