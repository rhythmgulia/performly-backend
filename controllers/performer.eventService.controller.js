const EventService = require('../db/models/performer/eventService');


exports.createEventService = async (req, res) => {
  try {
    const eventService = new EventService(req.body);
    const savedService = await eventService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getAllEventServices = async (req, res) => {
  try {
    const services = await EventService.find().populate('userId');
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getEventServiceById = async (req, res) => {
  try {
    const service = await EventService.findById(req.params.id).populate('userId');
    if (!service) return res.status(404).json({ message: 'Event service not found' });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateEventService = async (req, res) => {
  try {
    const updatedService = await EventService.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedService) return res.status(404).json({ message: 'Event service not found' });
    res.json(updatedService);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.deleteEventService = async (req, res) => {
  try {
    const deleted = await EventService.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Event service not found' });
    res.json({ message: 'Event service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
