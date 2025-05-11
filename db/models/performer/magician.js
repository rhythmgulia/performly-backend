const MagicianSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    specialties: {
        type: [String],
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

module.exports = mongoose.model("magicians", MagicianSchema);