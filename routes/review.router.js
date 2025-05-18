const express = require('express');
const router = express.Router();
const ReviewController = require('../controllers/review.controller');
const auth = require('../middleware/auth');
const { reviewValidationRules, validate } = require('../middleware/validators');
const { isClient } = require('../middleware/role');

router.post('/', auth, isClient, reviewValidationRules(), validate, ReviewController.createReview);
router.get('/performer/:performerId', ReviewController.getReviewsForPerformer);
router.put('/:id', auth, isClient, reviewValidationRules(), validate, ReviewController.updateReview);
router.delete('/:id', auth, isClient, ReviewController.deleteReview);

module.exports = router;
