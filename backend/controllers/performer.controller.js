const { Performer } = require('../db/models/performer');
const User = require('../db/models/user');

class PerformerController {
    // performerController.js
static async getAllPerformers(req, res) {
  try {
    const performers = await Performer.find().populate('userId', 'name');
    res.status(200).json(performers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


    static async getPerformersByCategory(req, res) {
        try {
            const { category } = req.params;
            const performers = await Performer.find({ category })
                .populate('userId', 'name email phone');
            res.json(performers);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching performers', error: error.message });
        }
    }

    static async getPerformerById(req, res) {
        try {
            const performer = await Performer.findById(req.params.id)
                .populate('userId', 'name email phone');
            if (!performer) {
                return res.status(404).json({ message: 'Performer not found' });
            }
            res.json(performer);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching performer', error: error.message });
        }
    }

    static async createProfile(req, res) {
        try {
            if (req.user.type !== 1) {
                return res.status(403).json({ message: 'Only performers can create performer profiles' });
            }

            const existingProfile = await Performer.findOne({ userId: req.user.userId });
            if (existingProfile) {
                return res.status(400).json({ message: 'Profile already exists' });
            }

            const profile = new Performer({
                ...req.body,
                               
                userId: req.user.userId
            });

            await profile.save();
            res.status(201).json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Error creating profile', error: error.message });
        }
    }

    static async updateProfile(req, res) {
        try {
            const profile = await Performer.findOneAndUpdate(
                { userId: req.user.userId },
                req.body,
                { new: true, runValidators: true }
            );

            if (!profile) {
                return res.status(404).json({ message: 'Profile not found' });
            }

            res.json(profile);
        } catch (error) {
            res.status(500).json({ message: 'Error updating profile', error: error.message });
        }
    }
}

module.exports = PerformerController;
