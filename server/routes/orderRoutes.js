const express = require('express');
const router = express.Router();
const {
    createOrder,
    verifyPayment,
    getMyOrders,
    getAllOrders
} = require('../controllers/orderController');
const { protect } = require('../middleware/auth');
const { adminAuth } = require('../middleware/adminAuth');

// User routes
router.post('/', protect, createOrder);
router.post('/verify', protect, verifyPayment);
router.get('/my-orders', protect, getMyOrders);

// Admin routes
router.get('/', protect, adminAuth, getAllOrders);

module.exports = router;
