const Booking = require("../db/models/booking");


const createBooking = async (req, res) => {
    try {
        const { performerId, date, time, location } = req.body;
        const clientId = req.user.userId;

        const newBooking = new Booking({
            performerId,
            clientId,
            date,
            time, // ✅ Save time
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
        const bookings = await Booking.find({ userId: req.user.userId }) // secured
      .populate("performerId", "name email")
      .sort({ createdAt: -1 });
        if (bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this performer" });
        }

        res.status(200).json(bookings);
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


// Add these methods to the existing booking controller

const getClientBookings = async (req, res) => {
     try {
        const bookings = await Booking.find({ clientId: req.params.id })
            .populate("performerId", "name email")
            .sort({ createdAt: -1 });

        if (!bookings || bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this client" });
        }

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};

const getPerformerBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ performerId: req.user.userId })
            .populate('clientId', 'name email')
            .sort({ createdAt: -1 });

        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error: error.message });
    }
};

const updatePaymentStatus = async (req, res) => {
    try {
        const { paymentStatus } = req.body;
        
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Only allow client to update payment status
        if (booking.clientId.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        booking.paymentStatus = paymentStatus;
        await booking.save();

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating payment status', error: error.message });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking,
    getClientBookings,
    getPerformerBookings,
    updatePaymentStatus
};
