const Entertainer = require('../db/models/performer/entertainer');


exports.createEntertainer = async (req, res) => {
  try {
    const entertainer = new Entertainer(req.body);
    const savedEntertainer = await entertainer.save();
    res.status(201).json(savedEntertainer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllEntertainers = async (req, res) => {
  try {
    const entertainers = await Entertainer.find().populate('userId');
    res.json(entertainers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getEntertainerById = async (req, res) => {
  try {
    const entertainer = await Entertainer.findById(req.params.id).populate('userId');
    if (!entertainer) return res.status(404).json({ message: 'Entertainer not found' });
    res.json(entertainer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateEntertainer = async (req, res) => {
  try {
    const updatedEntertainer = await Entertainer.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedEntertainer) return res.status(404).json({ message: 'Entertainer not found' });
    res.json(updatedEntertainer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteEntertainer = async (req, res) => {
  try {
    const deleted = await Entertainer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Entertainer not found' });
    res.json({ message: 'Entertainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
