const mongoose = require('mongoose');

const ArtistSubCategoryEnum = {
  LIVE_PAINTERS: 'Live Painters',
  SKETCH_ARTISTS: 'Sketch Artists',
  CALLIGRAPHERS: 'Calligraphers',
  HENNA_ARTISTS: 'Henna Artists'
};

const ArtistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subCategory: {
    type: String,
    enum: Object.values(ArtistSubCategoryEnum),
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

module.exports = mongoose.model("artists", ArtistSchema);