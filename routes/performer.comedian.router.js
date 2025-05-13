const express = require('express');
const router = express.Router();
const comedianController = require('../controllers/performer.comedian.controller');

router.post('/', comedianController.createComedian);
router.get('/', comedianController.getAllComedians);
router.get('/:id', comedianController.getComedianById);
router.put('/:id', comedianController.updateComedian);
router.delete('/:id', comedianController.deleteComedian);

module.exports = router;
