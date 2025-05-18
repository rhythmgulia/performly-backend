const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { bookingValidationRules, validate } = require('../middleware/validators');
const BookingController = require('../controllers/booking.controller');

router.post('/', auth, bookingValidationRules(), validate, BookingController.createBooking);
router.get('/client', auth, BookingController.getClientBookings);
router.get('/performer', auth, BookingController.getPerformerBookings);
router.put('/:id/status', auth, BookingController.updateBookingStatus);
router.put('/:id/payment', auth, BookingController.updatePaymentStatus);

module.exports = router;
