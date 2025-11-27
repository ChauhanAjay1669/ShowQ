const express = require('express');
const router = express.Router();
const {
    getDashboardMetrics,
    getUsers,
    toggleBlockUser,
    // Movie management
    getAllMovies,
    createMovie,
    updateMovie,
    deleteMovie,
    toggleFeatured,
    toggleTrending,
    // Category management
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

// All routes require authentication and admin role
router.use(protect, adminAuth);

// Dashboard
router.get('/metrics', getDashboardMetrics);

// User management
router.get('/users', getUsers);
router.patch('/users/:id/block', toggleBlockUser);

// Movie management
router.route('/movies')
    .get(getAllMovies)
    .post(createMovie);

router.route('/movies/:id')
    .put(updateMovie)
    .delete(deleteMovie);

router.patch('/movies/:id/featured', toggleFeatured);
router.patch('/movies/:id/trending', toggleTrending);

// Category management
router.route('/categories')
    .get(getAllCategories)
    .post(createCategory);

router.route('/categories/:id')
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;
