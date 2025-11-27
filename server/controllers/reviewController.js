const Review = require('../models/Review');
const Movie = require('../models/Movie');

// @desc    Get reviews for a movie
// @route   GET /api/reviews/:movieId
// @access  Public
exports.getReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find({ movieId: req.params.movieId })
            .populate('userId', 'name')
            .sort({ createdAt: -1 });

        res.json({ reviews });
    } catch (error) {
        next(error);
    }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
    try {
        const { movieId, rating, comment } = req.body;

        // Check if already reviewed
        const existingReview = await Review.findOne({
            userId: req.user._id,
            movieId
        });

        if (existingReview) {
            return res.status(400).json({ message: 'You have already reviewed this movie' });
        }

        // Create review
        const review = await Review.create({
            userId: req.user._id,
            movieId,
            rating,
            comment
        });

        // Update movie rating
        const reviews = await Review.find({ movieId });
        const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

        await Movie.findByIdAndUpdate(movieId, {
            rating: avgRating,
            numReviews: reviews.length
        });

        await review.populate('userId', 'name');

        res.status(201).json({ review });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Admin/Owner
exports.deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findById(req.params.id);

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Check ownership or admin
        if (review.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized' });
        }

        const movieId = review.movieId;
        await review.deleteOne();

        // Update movie rating
        const reviews = await Review.find({ movieId });
        const avgRating = reviews.length > 0
            ? reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length
            : 0;

        await Movie.findByIdAndUpdate(movieId, {
            rating: avgRating,
            numReviews: reviews.length
        });

        res.json({ message: 'Review deleted' });
    } catch (error) {
        next(error);
    }
};
