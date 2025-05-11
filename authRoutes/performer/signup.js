const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Artist = require('../models/performer/artist');
const Comedian = require('../models/performer/comedian');
const Dancer = require('../models/performer/dancer');
const TraditionalPerformer = require('../models/performer/traditionalPerformer');
const SpecialPerformer = require('../models/performer/specialPerformer');
const SpeakerTrainer = require('../models/performer/speakerTrainer');
const router = express.Router();

// Performer Signup
router.post('/signup', async (req, res) => {
    const { name, email, password, phone, subCategory, experience, pricing, performerDetails } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        type: 1 // Performer type
    });

    try {
        const savedUser = await newUser.save();

        // Save performer details based on subCategory
        let performer;
        switch (subCategory) {
            // Artists
            case 'Live Painters':
            case 'Sketch Artists':
            case 'Calligraphers':
            case 'Henna Artists':
                performer = new Artist({ userId: savedUser._id, subCategory, experience, pricing, ...performerDetails });
                break;
            // Comedians
            case 'Stand-up Comedians':
                performer = new Comedian({ userId: savedUser._id, style: performerDetails.style, experience, pricing });
                break;
            // Dancers
            case 'Classical':
            case 'Hip Hop':
            case 'Contemporary':
                performer = new Dancer({ userId: savedUser._id, subCategory, experience, pricing });
                break;
            // Traditional Performers
            case 'Folk Singers':
            case 'Puppet Show Artists':
            case 'Street Play Artists':
                performer = new TraditionalPerformer({ userId: savedUser._id, subCategory, experience, pricing, ...performerDetails });
                break;
            // Special Performers
            case 'Fire Performers':
            case 'Acrobats':
            case 'Aerial Artists':
            case 'Stunt Performers':
            case 'Circus Performers':
                performer = new SpecialPerformer({ userId: savedUser._id, subCategory, experience, pricing, ...performerDetails });
                break;
            // Speaker Trainers
            case 'Motivational Speakers':
            case 'Corporate Trainers':
            case 'Workshop Conductors':
            case 'Hosts':
                performer = new SpeakerTrainer({ userId: savedUser._id, subCategory, experience, pricing, ...performerDetails });
                break;
            default:
                return res.status(400).json({ error: 'Invalid subcategory' });
        }

        await performer.save();

        // Create JWT token for performer
        const token = jwt.sign(
            { userId: savedUser._id, type: savedUser.type },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        );

        res.status(201).json({ message: 'Performer registered successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;

