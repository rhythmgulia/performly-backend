const TraditionalPerformer = require('../db/models/performer/traditionalPerformer');

exports.createTraditionalPerformer = async (req, res) => {
  try {
    const newTraditionalPerformer = new TraditionalPerformer(req.body);
    const savedTraditionalPerformer = await newTraditionalPerformer.save();
    res.status(201).json(savedTraditionalPerformer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllTraditionalPerformers = async (req, res) => {
  try {
    const traditionalPerformers = await TraditionalPerformer.find().populate('userId');
    res.json(traditionalPerformers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTraditionalPerformerById = async (req, res) => {
  try {
    const traditionalPerformer = await TraditionalPerformer.findById(req.params.id).populate('userId');
    if (!traditionalPerformer) return res.status(404).json({ message: 'Traditional Performer not found' });
    res.json(traditionalPerformer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTraditionalPerformer = async (req, res) => {
  try {
    const updatedTraditionalPerformer = await TraditionalPerformer.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedTraditionalPerformer) return res.status(404).json({ message: 'Traditional Performer not found' });
    res.json(updatedTraditionalPerformer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTraditionalPerformer = async (req, res) => {
  try {
    const deleted = await TraditionalPerformer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Traditional Performer not found' });
    res.json({ message: 'Traditional Performer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
