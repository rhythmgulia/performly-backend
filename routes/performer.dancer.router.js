const express = require('express');
const router = express.Router();
const dancerController = require('../controllers/performer.dancer.controller');

router.post('/', dancerController.createDancer);
router.get('/', dancerController.getAllDancers);
router.get('/:id', dancerController.getDancerById);
router.put('/:id', dancerController.updateDancer);
router.delete('/:id', dancerController.deleteDancer);

module.exports = router;
