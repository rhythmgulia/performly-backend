const KidsEntertainment = require('../db/models/performer/kids');


exports.createKidsEntertainment = async (req, res) => {
  try {
    const newProvider = new KidsEntertainment(req.body);
    const savedProvider = await newProvider.save();
    res.status(201).json(savedProvider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllKidsEntertainment = async (req, res) => {
  try {
    const providers = await KidsEntertainment.find().populate('userId');
    res.json(providers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getKidsEntertainmentById = async (req, res) => {
  try {
    const provider = await KidsEntertainment.findById(req.params.id).populate('userId');
    if (!provider) return res.status(404).json({ message: 'Provider not found' });
    res.json(provider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateKidsEntertainment = async (req, res) => {
  try {
    const updatedProvider = await KidsEntertainment.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedProvider) return res.status(404).json({ message: 'Provider not found' });
    res.json(updatedProvider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteKidsEntertainment = async (req, res) => {
  try {
    const deleted = await KidsEntertainment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Provider not found' });
    res.json({ message: 'Provider deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
