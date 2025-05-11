const mongoose = require('mongoose');

const TraditionalPerformerSubCategoryEnum = {
  FOLK_SINGERS: 'Folk Singers',
  PUPPET_SHOW_ARTISTS: 'Puppet Show Artists',
  CLASSICAL_DANCERS: ['Bharatanatyam', 'Kathak'],
  STREET_PLAY_ARTISTS: 'Street Play Artists'
};

const TraditionalPerformerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subCategory: {
    type: String,
    enum: [
      ...TraditionalPerformerSubCategoryEnum.CLASSICAL_DANCERS,
      TraditionalPerformerSubCategoryEnum.FOLK_SINGERS,
      TraditionalPerformerSubCategoryEnum.PUPPET_SHOW_ARTISTS,
      TraditionalPerformerSubCategoryEnum.STREET_PLAY_ARTISTS
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

module.exports = mongoose.model("traditional_performers", TraditionalPerformerSchema);