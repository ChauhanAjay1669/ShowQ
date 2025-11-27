const Movie = require('../models/Movie');

// @desc    Get all movies
// @route   GET /api/movies
// @access  Public
exports.getMovies = async (req, res, next) => {
    try {
        const { search, category, limit = 20 } = req.query;

        let query = { status: 'published' };

        // Search
        if (search) {
            query.$text = { $search: search };
        }

        // Category filter
        if (category) {
            query.genres = category;
        }

        const movies = await Movie.find(query).limit(parseInt(limit)).sort({ createdAt: -1 });

        res.json({ movies, count: movies.length });
    } catch (error) {
        next(error);
    }
};

// @desc    Get single movie
// @route   GET /api/movies/:id
// @access  Public
exports.getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id);

        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.json({ movie });
    } catch (error) {
        next(error);
    }
};

// @desc    Get featured movies
// @route   GET /api/movies/featured
// @access  Public
exports.getFeatured = async (req, res, next) => {
    try {
        const movies = await Movie.find({
            status: 'published',
            featured: true
        }).limit(10);

        res.json({ movies, count: movies.length });
    } catch (error) {
        next(error);
    }
};

// @desc    Get trending movies
// @route   GET /api/movies/trending
// @access  Public
exports.getTrending = async (req, res, next) => {
    try {
        const movies = await Movie.find({
            status: 'published',
            trending: true
        }).limit(10).sort({ createdAt: -1 });

        res.json({ movies, count: movies.length });
    } catch (error) {
        next(error);
    }
};

// @desc    Get latest movies
// @route   GET /api/movies/latest
// @access  Public
exports.getLatest = async (req, res, next) => {
    try {
        const movies = await Movie.find({
            status: 'published'
        }).limit(12).sort({ releaseDate: -1, createdAt: -1 });

        res.json({ movies, count: movies.length });
    } catch (error) {
        next(error);
    }
};

// @desc    Get upcoming movies
// @route   GET /api/movies/upcoming
// @access  Public
exports.getUpcoming = async (req, res, next) => {
    try {
        const { genre, language, search, limit = 50 } = req.query;

        let query = { status: 'upcoming' };

        // Genre filter
        if (genre) {
            query.genres = genre;
        }

        // Language filter
        if (language) {
            query.language = language;
        }

        // Search by title
        if (search) {
            query.title = { $regex: search, $options: 'i' };
        }

        const movies = await Movie.find(query)
            .limit(parseInt(limit))
            .sort({ releaseDate: 1 }); // Sort by nearest release first

        res.json({ movies, count: movies.length });
    } catch (error) {
        next(error);
    }
};
