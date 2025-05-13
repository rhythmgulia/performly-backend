const Comedian = require('../db/models/performer/comedian');


exports.createComedian = async (req, res) => {
    try {
        const newComedian = new Comedian(req.body);
        const savedComedian = await newComedian.save();
        res.status(201).json(savedComedian);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.getAllComedians = async (req, res) => {
    try {
        const comedians = await Comedian.find().populate('userId');
        res.status(200).json(comedians);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getComedianById = async (req, res) => {
    try {
        const comedian = await Comedian.findById(req.params.id).populate('userId');
        if (!comedian) return res.status(404).json({ error: 'Comedian not found' });
        res.status(200).json(comedian);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.updateComedian = async (req, res) => {
    try {
        const updatedComedian = await Comedian.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedComedian) return res.status(404).json({ error: 'Comedian not found' });
        res.status(200).json(updatedComedian);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.deleteComedian = async (req, res) => {
    try {
        const deletedComedian = await Comedian.findByIdAndDelete(req.params.id);
        if (!deletedComedian) return res.status(404).json({ error: 'Comedian not found' });
        res.status(200).json({ message: 'Comedian deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
