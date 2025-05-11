const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review.controller");


router.post("/", reviewController.createReview);


router.get("/:performerId", reviewController.getReviewsForPerformer);


router.delete("/:id", reviewController.deleteReview);

module.exports = router;
