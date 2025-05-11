const ClientSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "bookings"
    }]
});

module.exports = mongoose.model("clients", ClientSchema);