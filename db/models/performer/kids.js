const mongoose = require('mongoose');

const KidsEntertainmentSubCategoryEnum = {
  CLOWNS: 'Clowns',
  BALLOON_ARTISTS: 'Balloon Artists',
  FACE_PAINTERS: 'Face Painters',
  MASCOTS_CHARACTER_ACTORS: 'Mascots and Character Actors'
};

const KidsEntertainmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subCategory: {
    type: String,
    enum: Object.values(KidsEntertainmentSubCategoryEnum),
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

module.exports = mongoose.model("kids_entertainment", KidsEntertainmentSchema);