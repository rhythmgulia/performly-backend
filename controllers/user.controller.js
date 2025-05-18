const User = require('../db/models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
    static async signup(req, res) {
        try {
            const { name, email, password, phone, type } = req.body;
            
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            const user = new User({
                name,
                email,
                password: hashedPassword,
                phone,
                type
            });

            await user.save();

            const token = jwt.sign(
                { userId: user._id, type: user.type },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                message: 'User created successfully',
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    type: user.type
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }

    static async signin(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({ message: 'Authentication failed' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Authentication failed' });
            }

            const token = jwt.sign(
                { userId: user._id, type: user.type },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    type: user.type
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error signing in', error: error.message });
        }
    }

    static async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.userId).select('-password');
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching profile', error: error.message });
        }
    }

    static async updateProfile(req, res) {
        try {
            const updates = req.body;
            delete updates.password; // Prevent password update through this endpoint

            const user = await User.findByIdAndUpdate(
                req.user.userId,
                updates,
                { new: true }
            ).select('-password');

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Error updating profile', error: error.message });
        }
    }
}

module.exports = UserController;
