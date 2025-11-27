const User = require('../models/User');
const Order = require('../models/Order');
const Movie = require('../models/Movie');
const Category = require('../models/Category');

// @desc    Get dashboard metrics
// @route   GET /api/admin/metrics
// @access  Admin
exports.getDashboardMetrics = async (req, res, next) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalOrders = await Order.countDocuments();
        const totalMovies = await Movie.countDocuments();
        const completedOrders = await Order.countDocuments({ paymentStatus: 'completed' });

        const revenue = await Order.aggregate([
            { $match: { paymentStatus: 'completed' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        const recentOrders = await Order.find()
            .populate('user', 'name email')
            .sort({ createdAt: -1 })
            .limit(10);

        res.json({
            success: true,
            totalUsers,
            totalOrders,
            totalMovies,
            completedOrders,
            totalRevenue: revenue[0]?.total || 0,
            recentOrders
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Admin
exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json({ success: true, users });
    } catch (error) {
        next(error);
    }
};

// @desc    Block/Unblock user
// @route   PATCH /api/admin/users/:id/block
// @access  Admin
exports.toggleBlockUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        user.blocked = !user.blocked;
        await user.save();

        res.json({
            success: true,
            user,
            message: user.blocked ? 'User blocked' : 'User unblocked'
        });
    } catch (error) {
        next(error);
    }
};

// ====================
// MOVIE MANAGEMENT
// ====================

// @desc    Get all movies (Admin view)
// @route   GET /api/admin/movies
// @access  Admin
exports.getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find()
            .populate('createdBy', 'name email')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            count: movies.length,
            movies
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Create new movie
// @route   POST /api/admin/movies
// @access  Admin
exports.createMovie = async (req, res, next) => {
    try {
        const {
            title,
            description,
            posterUrl,
            videoUrl,
            genres,
            language,
            cast,
            director,
            price,
            offerPrice,
            releaseDate,
            duration,
            featured,
            status
        } = req.body;

        // Validate required fields
        if (!title || !description || !posterUrl || !language) {
            return res.status(400).json({
                success: false,
                message: 'Please provide title, description, poster URL, and language'
            });
        }

        // Check if movie with same title already exists
        const existingMovie = await Movie.findOne({ title: title.trim() });
        if (existingMovie) {
            return res.status(400).json({
                success: false,
                message: `Movie "${title}" already exists in database`
            });
        }

        // Process cast - handle both array and string
        let castArray = [];
        if (cast) {
            if (Array.isArray(cast)) {
                castArray = cast.filter(c => c && c.trim());
            } else if (typeof cast === 'string' && cast.trim()) {
                castArray = cast.split(',').map(c => c.trim()).filter(c => c);
            }
        }

        // Process genres
        let genresArray = [];
        if (genres) {
            if (Array.isArray(genres)) {
                genresArray = genres.filter(g => g && g.trim());
            } else if (typeof genres === 'string' && genres.trim()) {
                genresArray = genres.split(',').map(g => g.trim()).filter(g => g);
            }
        }

        const movie = await Movie.create({
            title: title.trim(),
            description: description.trim(),
            posterUrl: posterUrl.trim(),
            videoUrl: videoUrl ? videoUrl.trim() : '',
            genres: genresArray,
            language: language.trim(),
            cast: castArray,
            director: director ? director.trim() : '',
            price: Number(price) || 0,
            offerPrice: Number(offerPrice) || 0,
            releaseDate: releaseDate || new Date(),
            duration: Number(duration) || 0,
            featured: featured === true || featured === 'true',
            status: status || 'published',
            createdBy: req.user._id
        });

        res.status(201).json({
            success: true,
            message: 'Movie created successfully',
            movie
        });
    } catch (error) {
        console.error('Create movie error:', error);

        // Handle duplicate key error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A movie with this title already exists'
            });
        }

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        next(error);
    }
};

// @desc    Update movie
// @route   PUT /api/admin/movies/:id
// @access  Admin
exports.updateMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        // Check if updating title to an existing title
        if (req.body.title && req.body.title !== movie.title) {
            const existingMovie = await Movie.findOne({
                title: req.body.title.trim(),
                _id: { $ne: req.params.id }
            });
            if (existingMovie) {
                return res.status(400).json({
                    success: false,
                    message: `Movie "${req.body.title}" already exists`
                });
            }
        }

        // Update fields
        const allowedUpdates = [
            'title', 'description', 'posterUrl', 'videoUrl', 'genres',
            'language', 'cast', 'director', 'price', 'offerPrice',
            'releaseDate', 'duration', 'featured', 'status'
        ];

        allowedUpdates.forEach(field => {
            if (req.body[field] !== undefined) {
                movie[field] = req.body[field];
            }
        });

        await movie.save();

        res.json({
            success: true,
            message: 'Movie updated successfully',
            movie
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'A movie with this title already exists'
            });
        }
        next(error);
    }
};

// @desc    Delete movie
// @route   DELETE /api/admin/movies/:id
// @access  Admin
exports.deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        await movie.deleteOne();

        res.json({ success: true, message: 'Movie deleted successfully' });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle movie featured status
// @route   PATCH /api/admin/movies/:id/featured
// @access  Admin
exports.toggleFeatured = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        movie.featured = !movie.featured;
        await movie.save();

        res.json({
            success: true,
            message: movie.featured ? 'Movie featured' : 'Movie unfeatured',
            movie
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Toggle movie trending status
// @route   PATCH /api/admin/movies/:id/trending
// @access  Admin
exports.toggleTrending = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }

        movie.trending = !movie.trending;
        await movie.save();

        res.json({
            success: true,
            message: movie.trending ? 'Movie marked as trending' : 'Movie removed from trending',
            movie
        });
    } catch (error) {
        next(error);
    }
};

// ====================
// CATEGORY MANAGEMENT
// ====================

// @desc    Get all categories
// @route   GET /api/admin/categories
// @access  Admin
exports.getAllCategories = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        res.json({ success: true, categories });
    } catch (error) {
        next(error);
    }
};

// @desc    Create category
// @route   POST /api/admin/categories
// @access  Admin
exports.createCategory = async (req, res, next) => {
    try {
        const { name, description } = req.body;

        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).json({
                success: false,
                message: 'Category already exists'
            });
        }

        const category = await Category.create({ name, description });

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update category
// @route   PUT /api/admin/categories/:id
// @access  Admin
exports.updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        category.name = req.body.name || category.name;
        category.description = req.body.description || category.description;

        await category.save();

        res.json({
            success: true,
            message: 'Category updated successfully',
            category
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete category
// @route   DELETE /api/admin/categories/:id
// @access  Admin
exports.deleteCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }

        await category.deleteOne();

        res.json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        next(error);
    }
};
