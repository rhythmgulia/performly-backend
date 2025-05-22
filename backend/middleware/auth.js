const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        if (!req.header('Authorization')) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (jwtError) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = auth;

