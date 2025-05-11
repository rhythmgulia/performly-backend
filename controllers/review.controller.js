const Review = require("../db/models/review");

exports.createReview = async (req, res) => {
    try {
        const { performerId, clientId, rating, comment } = req.body;
        const newReview = new Review({ performerId, clientId, rating, comment });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: "Failed to create review" });
    }
};


exports.getReviewsForPerformer = async (req, res) => {
    try {
        const { performerId } = req.params;
        const reviews = await Review.find({ performerId }).populate("clientId", "name");
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch reviews" });
    }
};


exports.deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Review.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ error: "Review not found" });
        }
        res.status(200).json({ message: "Review deleted" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete review" });
    }
};
