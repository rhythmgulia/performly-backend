const Magician = require('../db/models/performer/magician');


exports.createMagician = async (req, res) => {
  try {
    const newMagician = new Magician(req.body);
    const savedMagician = await newMagician.save();
    res.status(201).json(savedMagician);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllMagicians = async (req, res) => {
  try {
    const magicians = await Magician.find().populate('userId');
    res.json(magicians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMagicianById = async (req, res) => {
  try {
    const magician = await Magician.findById(req.params.id).populate('userId');
    if (!magician) return res.status(404).json({ message: 'Magician not found' });
    res.json(magician);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateMagician = async (req, res) => {
  try {
    const updatedMagician = await Magician.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedMagician) return res.status(404).json({ message: 'Magician not found' });
    res.json(updatedMagician);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteMagician = async (req, res) => {
  try {
    const deleted = await Magician.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Magician not found' });
    res.json({ message: 'Magician deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
