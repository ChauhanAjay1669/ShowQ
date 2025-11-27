const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getProfile = async (req, res, next) => {
    try {
        res.json({ user: req.user });
    } catch (error) {
        next(error);
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true }
        ).select('-password');

        res.json({ user });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user library (purchased movies)
// @route   GET /api/users/library
// @access  Private
exports.getLibrary = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('purchasedMovies');
        res.json({ purchasedMovies: user.purchasedMovies });
    } catch (error) {
        next(error);
    }
};

// @desc    Get wishlist
// @route   GET /api/users/wishlist
// @access  Private
exports.getWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).populate('favorites');
        res.json({ favorites: user.favorites });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle wishlist
// @route   POST /api/users/wishlist/:movieId
// @access  Private
exports.toggleWishlist = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        const movieId = req.params.movieId;

        const index = user.favorites.indexOf(movieId);

        if (index > -1) {
            user.favorites.splice(index, 1);
        } else {
            user.favorites.push(movieId);
        }

        await user.save();
        await user.populate('favorites');

        res.json({ favorites: user.favorites });
    } catch (error) {
        next(error);
    }
};
