const crypto = require('crypto');
const Order = require('../models/Order');
const User = require('../models/User');

// @desc    Verify payment
// @route   POST /api/payment/verify
// @access  Private
exports.verifyPayment = async (req, res, next) => {
    try {
        const { orderId, paymentId, signature } = req.body;

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Verify signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(order.razorpayOrderId + '|' + paymentId)
            .digest('hex');

        if (generatedSignature === signature) {
            // Update order
            order.paymentStatus = 'completed';
            order.paymentId = paymentId;
            await order.save();

            // Add movies to user's purchased list
            await User.findByIdAndUpdate(order.userId, {
                $addToSet: { purchasedMovies: { $each: order.movieIds } }
            });

            res.json({ success: true, message: 'Payment verified successfully' });
        } else {
            order.paymentStatus = 'failed';
            await order.save();
            res.status(400).json({ message: 'Payment verification failed' });
        }
    } catch (error) {
        next(error);
    }
};
