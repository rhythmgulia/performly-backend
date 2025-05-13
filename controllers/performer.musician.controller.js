const Musician = require('../db/models/performer/musician');


exports.createMusician = async (req, res) => {
  try {
    const newMusician = new Musician(req.body);
    const savedMusician = await newMusician.save();
    res.status(201).json(savedMusician);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllMusicians = async (req, res) => {
  try {
    const musicians = await Musician.find().populate('userId');
    res.json(musicians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getMusicianById = async (req, res) => {
  try {
    const musician = await Musician.findById(req.params.id).populate('userId');
    if (!musician) return res.status(404).json({ message: 'Musician not found' });
    res.json(musician);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateMusician = async (req, res) => {
  try {
    const updatedMusician = await Musician.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedMusician) return res.status(404).json({ message: 'Musician not found' });
    res.json(updatedMusician);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteMusician = async (req, res) => {
  try {
    const deleted = await Musician.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Musician not found' });
    res.json({ message: 'Musician deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
