const Wishlist = require('../models/Wishlist');
const Movie = require('../models/Movie');

// @desc    Get user's wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res, next) => {
    try {
        const wishlist = await Wishlist.find({ user: req.user._id })
            .populate('movie')
            .sort({ createdAt: -1 });

        res.json({
            count: wishlist.length,
            wishlist
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Add movie to wishlist
// @route   POST /api/wishlist/:movieId
// @access  Private
exports.addToWishlist = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.movieId);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Check if already in wishlist
        const exists = await Wishlist.findOne({
            user: req.user._id,
            movie: req.params.movieId
        });

        if (exists) {
            return res.status(400).json({ message: 'Movie already in wishlist' });
        }

        const wishlistItem = await Wishlist.create({
            user: req.user._id,
            movie: req.params.movieId
        });

        const populated = await wishlistItem.populate('movie');

        res.status(201).json({
            message: 'Added to wishlist',
            wishlistItem: populated
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Remove movie from wishlist
// @route   DELETE /api/wishlist/:movieId
// @access  Private
exports.removeFromWishlist = async (req, res, next) => {
    try {
        const result = await Wishlist.findOneAndDelete({
            user: req.user._id,
            movie: req.params.movieId
        });

        if (!result) {
            return res.status(404).json({ message: 'Item not found in wishlist' });
        }

        res.json({ message: 'Removed from wishlist' });
    } catch (error) {
        next(error);
    }
};

// @desc    Check if movie is in wishlist
// @route   GET /api/wishlist/check/:movieId
// @access  Private
exports.checkWishlist = async (req, res, next) => {
    try {
        const exists = await Wishlist.findOne({
            user: req.user._id,
            movie: req.params.movieId
        });

        res.json({ inWishlist: !!exists });
    } catch (error) {
        next(error);
    }
};
