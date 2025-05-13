const SpecialPerformer = require('../db/models/performer/specialPerformer');

exports.createSpecialPerformer = async (req, res) => {
  try {
    const newSpecialPerformer = new SpecialPerformer(req.body);
    const savedSpecialPerformer = await newSpecialPerformer.save();
    res.status(201).json(savedSpecialPerformer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllSpecialPerformers = async (req, res) => {
  try {
    const specialPerformers = await SpecialPerformer.find().populate('userId');
    res.json(specialPerformers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSpecialPerformerById = async (req, res) => {
  try {
    const specialPerformer = await SpecialPerformer.findById(req.params.id).populate('userId');
    if (!specialPerformer) return res.status(404).json({ message: 'Special Performer not found' });
    res.json(specialPerformer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSpecialPerformer = async (req, res) => {
  try {
    const updatedSpecialPerformer = await SpecialPerformer.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedSpecialPerformer) return res.status(404).json({ message: 'Special Performer not found' });
    res.json(updatedSpecialPerformer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSpecialPerformer = async (req, res) => {
  try {
    const deleted = await SpecialPerformer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Special Performer not found' });
    res.json({ message: 'Special Performer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
