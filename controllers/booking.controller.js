const Booking = require("../db/models/booking");


const createBooking = async (req, res) => {
    try {
        const { performerId, clientId, date, location } = req.body;

        const newBooking = new Booking({
            performerId,
            clientId,
            date,
            location
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }
};


const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("performerId", "name email")
            .populate("clientId", "name email");

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};


const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("performerId", "name email")
            .populate("clientId", "name email");

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving booking", error: error.message });
    }
};


const updateBookingStatus = async (req, res) => {
    try {
        const { status, paymentStatus } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status, paymentStatus },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking updated", booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ message: "Error updating booking", error: error.message });
    }
};


const deleteBooking = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndDelete(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting booking", error: error.message });
    }
};


module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking
};
