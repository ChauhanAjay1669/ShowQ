const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getLibrary, getWishlist, toggleWishlist } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.get('/library', getLibrary);
router.get('/wishlist', getWishlist);
router.post('/wishlist/:movieId', toggleWishlist);

module.exports = router;
