const mongoose = require('mongoose');

const MusicianSubCategoryEnum = {
  SINGERS: ['Classical', 'Pop', 'Jazz', 'Rock', 'Folk'],
  INSTRUMENTALISTS: ['Guitarists', 'Pianists', 'Violinists', 'Drummers'],
  BANDS: ['Rock Bands', 'Jazz Bands', 'Acoustic Bands'],
  DJs: 'DJs'
};

const MusicianSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  subCategory: {
    type: String,
    enum: [
      ...MusicianSubCategoryEnum.SINGERS,
      ...MusicianSubCategoryEnum.INSTRUMENTALISTS,
      ...MusicianSubCategoryEnum.BANDS,
      MusicianSubCategoryEnum.DJs
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

module.exports = mongoose.model("musicians", MusicianSchema);