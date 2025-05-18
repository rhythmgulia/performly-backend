
const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // was 'User'
        required: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Performer'
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'bookings' // was 'Booking'
    }],
});

module.exports = mongoose.model('Client', ClientSchema);