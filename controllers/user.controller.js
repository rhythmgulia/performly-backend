const User = require('../db/models/user');
const Client = require('../db/models/client');
const Performer = require('../db/models/performer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
    static async signup(req, res) {
        try {
            const { name, phone, password, type } = req.body;
            
            const existingUser = await User.findOne({ phone });
            if (existingUser) {
                return res.status(400).json({ message: 'User with this phone number already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            
            // Create user in User collection
            const user = new User({
                name,
                phone,
                password: hashedPassword,
                type
            });

            await user.save();

            // Based on type, create entry in respective collection
            if (type === 1) {
                // Create performer profile
                const performer = new Performer({
                    userId: user._id,
                    category: req.body.category,
                    subCategory: req.body.subCategory,
                    pricing: req.body.pricing,
                    experience: req.body.experience
                });
                await performer.save();
            } else if (type === 0) {
                // Create client profile
                const client = new Client({
                    userId: user._id
                });
                await client.save();
            }

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
                    phone: user.phone,
                    type: user.type
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user', error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { phone, password } = req.body;

            const user = await User.findOne({ phone });
            if (!user) {
                return res.status(401).json({ message: 'Phone number not found' });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Incorrect password' });
            }

            const token = jwt.sign(
                { userId: user._id, type: user.type },
                process.env.JWT_SECRET,
                { expiresIn: '7d' } // Changed from '24h' to '7d'
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    phone: user.phone,
                    type: user.type
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Error logging in', error: error.message });
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