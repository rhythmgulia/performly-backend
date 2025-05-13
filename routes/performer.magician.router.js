const express = require('express');
const router = express.Router();
const magicianController = require('../controllers/performer.magician.controller');

router.post('/', magicianController.createMagician);
router.get('/', magicianController.getAllMagicians);
router.get('/:id', magicianController.getMagicianById);
router.put('/:id', magicianController.updateMagician);
router.delete('/:id', magicianController.deleteMagician);

module.exports = router;
