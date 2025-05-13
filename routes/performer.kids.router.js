const express = require('express');
const router = express.Router();
const kidsEntertainmentController = require('../controllers/performer.kids.controller');

router.post('/', kidsEntertainmentController.createKidsEntertainment);
router.get('/', kidsEntertainmentController.getAllKidsEntertainment);
router.get('/:id', kidsEntertainmentController.getKidsEntertainmentById);
router.put('/:id', kidsEntertainmentController.updateKidsEntertainment);
router.delete('/:id', kidsEntertainmentController.deleteKidsEntertainment);

module.exports = router;
