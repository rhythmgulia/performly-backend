const User = require('../models/user');

// Performer Role Check Middleware
const isPerformer = (req, res, next) => {
    if (req.user.type !== 1) {
        return res.status(403).json({ error: 'Access denied. This action is for performers only.' });
    }
    next();
};

// User Role Check Middleware
const isUser = (req, res, next) => {
    if (req.user.type !== 0) {
        return res.status(403).json({ error: 'Access denied. This action is for users only.' });
    }
    next();
};

module.exports = { isPerformer, isUser };
