const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PerformerController = require('../controllers/performer.controller');

router.get('/', PerformerController.getAllPerformers);
router.get('/category/:category', PerformerController.getPerformersByCategory);
router.get('/:id', PerformerController.getPerformerById);
router.post('/profile', auth, PerformerController.createProfile);
router.put('/profile', auth, PerformerController.updateProfile);

module.exports = router;
