const mongoose = require('mongoose');

const DancerSubCategoryEnum = {
  SOLO_DANCERS: ['Classical', 'Hip Hop', 'Contemporary'],
  DANCE_GROUPS: ['Folk', 'Street', 'Flash Mob'],
  CHOREOGRAPHERS: 'Choreographers'
};

const DancerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subCategory: {
    type: String,
    enum: [
      ...DancerSubCategoryEnum.SOLO_DANCERS,
      ...DancerSubCategoryEnum.DANCE_GROUPS,
      DancerSubCategoryEnum.CHOREOGRAPHERS
    ],
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

module.exports = mongoose.model("dancers", DancerSchema);