const mongoose = require('mongoose');

const EntertainerSubCategoryEnum = {
  COMEDIANS: 'Stand-up Comedians',
  MAGICIANS: 'Magicians',
  CLOWNS: 'Clowns',
  PUPPETEERS: 'Puppeteers',
  STORYTELLERS: 'Storytellers'
};

const EntertainerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subCategory: {
    type: String,
    enum: Object.values(EntertainerSubCategoryEnum),
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

module.exports = mongoose.model("entertainers", EntertainerSchema);