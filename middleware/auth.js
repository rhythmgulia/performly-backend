const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Authentication Middleware
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded; // Attaches the decoded user info to the request object
        next();
    } catch (err) {
        return res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticateToken;
