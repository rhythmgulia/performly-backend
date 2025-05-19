const User = require('../db/models/user');
const Client = require('../db/models/client');
const Performer = require('../db/models/performer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  static async signup(req, res) {
    try {
      const { name, email, phone, password, type } = req.body;

      // Validate required fields
      if (!name || !email || !phone || !password || type === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Check for existing user
      const existingUser = await User.findOne({ phone });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this phone number already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = new User({
        name,
        email,
        phone,
        password: hashedPassword,
        type
      });
      await user.save();

      // Create corresponding profile
      if (type === 0) {
        const client = new Client({ userId: user._id });
        await client.save();
      }

      // Future logic for performer
      // else if (type === 1) {
      //   const performer = new Performer({
      //     userId: user._id,
      //     category: req.body.category,
      //     subCategory: req.body.subCategory,
      //     pricing: req.body.pricing,
      //     experience: req.body.experience
      //   });
      //   await performer.save();
      // }

      const token = jwt.sign(
        { userId: user._id, type: user.type },
        process.env.JWT_SECRET || 'default_secret', // fallback for dev
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
      console.error('Signup error:', error);
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
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '7d' }
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
      console.error('Login error:', error);
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
      const updates = { ...req.body };
      delete updates.password; // prevent password updates here

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
