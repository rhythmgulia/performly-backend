const express = require('express');
const router = express.Router();
const specialPerformerController = require('../controllers/performer.specialPerformer.controller');

router.post('/', specialPerformerController.createSpecialPerformer);
router.get('/', specialPerformerController.getAllSpecialPerformers);
router.get('/:id', specialPerformerController.getSpecialPerformerById);
router.put('/:id', specialPerformerController.updateSpecialPerformer);
router.delete('/:id', specialPerformerController.deleteSpecialPerformer);

module.exports = router;
