const mongoose = require('mongoose');

const SpeakerTrainerSubCategoryEnum = {
  MOTIVATIONAL_SPEAKERS: 'Motivational Speakers',
  CORPORATE_TRAINERS: 'Corporate Trainers',
  WORKSHOP_CONDUCTORS: 'Workshop Conductors',
  HOSTS: 'Hosts'
};

const SpeakerTrainerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subCategory: {
    type: String,
    enum: Object.values(SpeakerTrainerSubCategoryEnum),
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

module.exports = mongoose.model("speakers_trainers", SpeakerTrainerSchema);