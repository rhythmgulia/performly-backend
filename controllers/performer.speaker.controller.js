const SpeakerTrainer = require('../db/models/performer/speaker');


exports.createSpeakerTrainer = async (req, res) => {
  try {
    const newSpeakerTrainer = new SpeakerTrainer(req.body);
    const savedSpeakerTrainer = await newSpeakerTrainer.save();
    res.status(201).json(savedSpeakerTrainer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllSpeakerTrainers = async (req, res) => {
  try {
    const speakerTrainers = await SpeakerTrainer.find().populate('userId');
    res.json(speakerTrainers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getSpeakerTrainerById = async (req, res) => {
  try {
    const speakerTrainer = await SpeakerTrainer.findById(req.params.id).populate('userId');
    if (!speakerTrainer) return res.status(404).json({ message: 'Speaker/Trainer not found' });
    res.json(speakerTrainer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateSpeakerTrainer = async (req, res) => {
  try {
    const updatedSpeakerTrainer = await SpeakerTrainer.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedSpeakerTrainer) return res.status(404).json({ message: 'Speaker/Trainer not found' });
    res.json(updatedSpeakerTrainer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteSpeakerTrainer = async (req, res) => {
  try {
    const deleted = await SpeakerTrainer.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Speaker/Trainer not found' });
    res.json({ message: 'Speaker/Trainer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
