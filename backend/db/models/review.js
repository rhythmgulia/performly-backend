const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    performerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "performers",
        required: true
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "clients",
        required: true
    },
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookings",
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    }
}, { timestamps: true });

module.exports = mongoose.model("reviews", ReviewSchema);
