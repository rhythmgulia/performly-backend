const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// Performer Signin
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ error: 'User not found' });
    }

    // Check if the user is a performer
    if (user.type !== 1) {
        return res.status(400).json({ error: 'This account is not a performer' });
    }

    // Compare passwords
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT token for performer
    const token = jwt.sign(
        { userId: user._id, type: user.type },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Signin successful', token });
});

module.exports = router;
