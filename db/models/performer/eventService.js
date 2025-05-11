const mongoose = require('mongoose');

const EventServiceSubCategoryEnum = {
  PHOTOGRAPHERS: 'Photographers',
  VIDEOGRAPHERS: 'Videographers',
  EVENT_HOSTS: 'Event Hosts/MCs',
  EVENT_PLANNERS: 'Event Planners',
  DECORATORS: 'Decorators',
  LIGHTING_SOUND_TECHNICIANS: 'Lighting and Sound Technicians'
};

const EventServiceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subCategory: {
    type: String,
    enum: Object.values(EventServiceSubCategoryEnum),
    required: true
  },
  experience: {
    type: Number,
    required: true
  },
  pricing: {
    type: Number,
    required: true
  },
  availability: {
    type: Object,
    default: {}
  },
  rating: {
    type: Number,
    default: 0
  },
  bio: {
    type: String
  }
});

module.exports = mongoose.model("event_services", EventServiceSchema);