const express = require('express');
const router = express.Router();
const eventServiceController = require('../controllers/performer.eventService.controller');

router.post('/', eventServiceController.createEventService);
router.get('/', eventServiceController.getAllEventServices);
router.get('/:id', eventServiceController.getEventServiceById);
router.put('/:id', eventServiceController.updateEventService);
router.delete('/:id', eventServiceController.deleteEventService);

module.exports = router;
