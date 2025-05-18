const Review = require("../db/models/review");
const Booking = require("../db/models/booking");

class ReviewController {
    static async createReview(req, res) {
        try {
            const { performerId, rating, comment } = req.body;
            
            // Check if there's a completed booking
            const booking = await Booking.findOne({
                performerId,
                clientId: req.user.userId,
                status: 'Completed'
            });

            if (!booking) {
                return res.status(403).json({
                    message: "You can only review performers after completing a booking with them"
                });
            }

            // Check if user already reviewed this performer
            const existingReview = await Review.findOne({
                performerId,
                clientId: req.user.userId
            });

            if (existingReview) {
                return res.status(400).json({
                    message: "You have already reviewed this performer"
                });
            }

            const newReview = new Review({
                performerId,
                clientId: req.user.userId,
                rating,
                comment
            });

            await newReview.save();

            // Populate client details
            await newReview.populate('clientId', 'name');

            res.status(201).json(newReview);
        } catch (error) {
            res.status(500).json({ message: "Failed to create review", error: error.message });
        }
    }

    static async getReviewsForPerformer(req, res) {
        try {
            const { performerId } = req.params;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const reviews = await Review.find({ performerId })
                .populate("clientId", "name")
                .sort({ createdAt: -1 })
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Review.countDocuments({ performerId });

            res.status(200).json({
                reviews,
                pagination: {
                    total,
                    pages: Math.ceil(total / limit),
                    currentPage: page
                }
            });
        } catch (error) {
            res.status(500).json({ message: "Failed to fetch reviews", error: error.message });
        }
    }

    static async updateReview(req, res) {
        try {
            const { rating, comment } = req.body;

            const review = await Review.findOne({
                _id: req.params.id,
                clientId: req.user.userId
            });

            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }

            review.rating = rating;
            review.comment = comment;
            review.updatedAt = Date.now();

            await review.save();
            await review.populate('clientId', 'name');

            res.status(200).json(review);
        } catch (error) {
            res.status(500).json({ message: "Failed to update review", error: error.message });
        }
    }

    static async deleteReview(req, res) {
        try {
            const review = await Review.findOneAndDelete({
                _id: req.params.id,
                clientId: req.user.userId
            });

            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }

            res.status(200).json({ message: "Review deleted successfully" });
        } catch (error) {
            res.status(500).json({ message: "Failed to delete review", error: error.message });
        }
    }
}

module.exports = ReviewController;
