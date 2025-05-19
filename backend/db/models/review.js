const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    performerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("reviews", ReviewSchema);