const express = require('express');
const router = express.Router();
const speakerTrainerController = require('../controllers/performer.speaker.controller');

router.post('/', speakerTrainerController.createSpeakerTrainer);
router.get('/', speakerTrainerController.getAllSpeakerTrainers);
router.get('/:id', speakerTrainerController.getSpeakerTrainerById);
router.put('/:id', speakerTrainerController.updateSpeakerTrainer);
router.delete('/:id', speakerTrainerController.deleteSpeakerTrainer);

module.exports = router;
