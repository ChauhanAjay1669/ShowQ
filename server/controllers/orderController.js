const Order = require('../models/Order');
const Razorpay = require('razorpay');

// Check if using demo/test keys
const isDemoMode = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_ID.includes('demo');

// Initialize Razorpay only if keys are provided
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
    razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    if (isDemoMode) {
        console.log('⚠️  Running in DEMO payment mode. Payments will be simulated.');
    } else {
        console.log('✅ Razorpay payment gateway initialized.');
    }
} else {
    console.log('⚠️  Razorpay keys missing. Payment features will be disabled.');
}

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
    try {
        // Handle demo mode - simulate payment
        if (isDemoMode) {
            const { amount, items = [], movie, theater, showtime, seats = [] } = req.body;

            // Create a demo order
            const demoOrder = await Order.create({
                user: req.user._id,
                items: items.length > 0 ? items : [{
                    movie: movie || 'Demo Movie',
                    quantity: seats.length || 1,
                    price: amount || 500
                }],
                totalAmount: amount || 500,
                paymentStatus: 'completed',
                paymentMethod: 'demo',
                razorpayOrderId: 'demo_order_' + Date.now(),
                razorpayPaymentId: 'demo_pay_' + Date.now(),
                status: 'completed'
            });

            return res.status(201).json({
                success: true,
                message: 'Demo payment successful! (No real payment processed)',
                order: demoOrder,
                isDemoMode: true
            });
        }

        // Real payment flow
        if (!razorpay) {
            return res.status(400).json({ message: 'Payment gateway not configured' });
        }

        const { amount } = req.body;
        const options = {
            amount: amount * 100, // Convert to paise
            currency: 'INR',
            receipt: 'order_' + Date.now()
        };

        const razorpayOrder = await razorpay.orders.create(options);

        res.json({
            orderId: razorpayOrder.id,
            amount: razorpayOrder.amount,
            currency: razorpayOrder.currency
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Verify payment
// @route   POST /api/orders/verify
// @access  Private
exports.verifyPayment = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingDetails } = req.body;

        // In demo mode, auto-verify
        if (isDemoMode) {
            const order = await Order.create({
                user: req.user._id,
                items: bookingDetails?.items || [],
                totalAmount: bookingDetails?.totalAmount || 500,
                paymentStatus: 'completed',
                paymentMethod: 'demo',
                razorpayOrderId: razorpay_order_id || 'demo_order_' + Date.now(),
                razorpayPaymentId: razorpay_payment_id || 'demo_pay_' + Date.now(),
                status: 'completed'
            });

            return res.json({
                success: true,
                message: 'Demo payment verified!',
                order,
                isDemoMode: true
            });
        }

        // Real verification logic here
        const crypto = require('crypto');
        const sign = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSign = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(sign.toString())
            .digest("hex");

        if (razorpay_signature === expectedSign) {
            // Payment is successful, create order
            const order = await Order.create({
                user: req.user._id,
                items: bookingDetails?.items || [],
                totalAmount: bookingDetails?.totalAmount,
                paymentStatus: 'completed',
                paymentMethod: 'razorpay',
                razorpayOrderId: razorpay_order_id,
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: 'completed'
            });

            res.json({ success: true, order });
        } else {
            res.status(400).json({ success: false, message: 'Invalid signature' });
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .sort({ createdAt: -1 })
            .populate('items.movie');

        res.json({ orders });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Admin
exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.movie')
            .sort({ createdAt: -1 });

        res.json({ orders });
    } catch (error) {
        next(error);
    }
};
