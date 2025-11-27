const express = require('express');
const router = express.Router();
const {
    getMovies,
    getMovieById,
    getFeatured,
    getTrending,
    getLatest,
    getUpcoming
} = require('../controllers/movieController');

// Public routes - order matters! Specific routes before :id
router.get('/featured', getFeatured);
router.get('/trending', getTrending);
router.get('/latest', getLatest);
router.get('/upcoming', getUpcoming);
router.get('/:id', getMovieById);
router.get('/', getMovies);

module.exports = router;
