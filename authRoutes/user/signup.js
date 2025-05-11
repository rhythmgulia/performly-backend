const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// User Signup
router.post('/signup', async (req, res) => {
    const { name, email, password, phone, type } = req.body;

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
        type
    });

    try {
        const savedUser = await newUser.save();

        // Create JWT token
        const token = jwt.sign(
            { userId: savedUser._id, type: savedUser.type },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' } // Token expires in 1 day
        );

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
