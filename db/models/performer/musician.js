const MusicianSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    genre: {
        type: [String],
        required: true
    },
    instrument: {
        type: [String]
    },
    experience: {
        type: Number, // Years of experience
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