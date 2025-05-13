const express = require('express');
const router = express.Router();
const musicianController = require('../controllers/performer.musician.controller');

router.post('/', musicianController.createMusician);
router.get('/', musicianController.getAllMusicians);
router.get('/:id', musicianController.getMusicianById);
router.put('/:id', musicianController.updateMusician);
router.delete('/:id', musicianController.deleteMusician);

module.exports = router;
