const Dancer = require('../db/models/performer/dancer');


exports.createDancer = async (req, res) => {
  try {
    const dancer = new Dancer(req.body);
    const savedDancer = await dancer.save();
    res.status(201).json(savedDancer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllDancers = async (req, res) => {
  try {
    const dancers = await Dancer.find().populate('userId');
    res.json(dancers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getDancerById = async (req, res) => {
  try {
    const dancer = await Dancer.findById(req.params.id).populate('userId');
    if (!dancer) return res.status(404).json({ message: 'Dancer not found' });
    res.json(dancer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateDancer = async (req, res) => {
  try {
    const updated = await Dancer.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.status(404).json({ message: 'Dancer not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteDancer = async (req, res) => {
  try {
    const deleted = await Dancer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Dancer not found' });
    res.json({ message: 'Dancer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
