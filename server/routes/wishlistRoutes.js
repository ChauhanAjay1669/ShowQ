const express = require('express');
const router = express.Router();
const {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    checkWishlist
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/auth');

// All wishlist routes require authentication
router.use(protect);

router.get('/', getWishlist);
router.get('/check/:movieId', checkWishlist);
router.post('/:movieId', addToWishlist);
router.delete('/:movieId', removeFromWishlist);

module.exports = router;
