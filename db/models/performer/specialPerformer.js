const mongoose = require('mongoose');

const SpecialPerformerSubCategoryEnum = {
  FIRE_PERFORMERS: 'Fire Performers',
  ACROBATS: 'Acrobats',
  AERIAL_ARTISTS: 'Aerial Artists',
  STUNT_PERFORMERS: 'Stunt Performers',
  CIRCUS_PERFORMERS: 'Circus Performers'
};

const SpecialPerformerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subCategory: {
    type: String,
    enum: Object.values(SpecialPerformerSubCategoryEnum),
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

module.exports = mongoose.model("special_performers", SpecialPerformerSchema);