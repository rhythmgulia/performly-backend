const express = require('express');
const router = express.Router();
const performerController = require('../controllers/performerController');

// Optional: Middleware to authenticate user if needed
// const authenticate = require('../middleware/auth');

// Public Routes (or protected using `authenticate`)
router.post('/', performerController.createPerformer);
router.get('/', performerController.getAllPerformers);
router.get('/:id', performerController.getPerformerById);
router.put('/:id', performerController.updatePerformer);
router.delete('/:id', performerController.deletePerformer);

module.exports = router;
