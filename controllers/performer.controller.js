const { PerformerSchema: Performer } = require('../models/Performer');

// Create performer
exports.createPerformer = async (req, res) => {
  try {
    const performer = new Performer({ ...req.body, userId: req.user.id });
    await performer.save();
    res.status(201).json({ success: true, performer });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Get all performers
exports.getAllPerformers = async (req, res) => {
  try {
    const performers = await Performer.find();
    res.status(200).json({ success: true, performers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get performer by ID
exports.getPerformerById = async (req, res) => {
  try {
    const performer = await Performer.findById(req.params.id);
    if (!performer) {
      return res.status(404).json({ success: false, message: "Performer not found" });
    }
    res.status(200).json({ success: true, performer });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update performer
exports.updatePerformer = async (req, res) => {
  try {
    const performer = await Performer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!performer) {
      return res.status(404).json({ success: false, message: "Performer not found" });
    }
    res.status(200).json({ success: true, performer });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete performer
exports.deletePerformer = async (req, res) => {
  try {
    const performer = await Performer.findByIdAndDelete(req.params.id);
    if (!performer) {
      return res.status(404).json({ success: false, message: "Performer not found" });
    }
    res.status(200).json({ success: true, message: "Performer deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
