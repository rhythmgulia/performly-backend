const express = require('express');
const router = express.Router();
const traditionalPerformerController = require('../controllers/performer.traditionalPerformer.controller');

router.post('/', traditionalPerformerController.createTraditionalPerformer);
router.get('/', traditionalPerformerController.getAllTraditionalPerformers);
router.get('/:id', traditionalPerformerController.getTraditionalPerformerById);
router.put('/:id', traditionalPerformerController.updateTraditionalPerformer);
router.delete('/:id', traditionalPerformerController.deleteTraditionalPerformer);

module.exports = router;
