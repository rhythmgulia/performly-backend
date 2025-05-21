const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    performerId: { type: mongoose.Schema.Types.ObjectId, ref: "performers", required: true },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Declined', 'Completed'],
        default: 'Pending'
    },
    paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid'],
        default: 'Pending'
    }
}, { timestamps: true });

module.exports = mongoose.model("bookings", BookingSchema);