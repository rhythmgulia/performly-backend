const express = require('express');
const router = express.Router();
const entertainerController = require('../controllers/performer.entertainer.controller');

router.post('/', entertainerController.createEntertainer);
router.get('/', entertainerController.getAllEntertainers);
router.get('/:id', entertainerController.getEntertainerById);
router.put('/:id', entertainerController.updateEntertainer);
router.delete('/:id', entertainerController.deleteEntertainer);

module.exports = router;
