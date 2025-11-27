const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        movie: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Movie'
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['razorpay', 'demo'],
        default: 'demo'
    },
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    status: {
        type: String,
        enum: ['pending', 'completed', 'cancelled', 'expired'],
        default: 'pending'
    },
    // Booking details
    bookingDetails: {
        theater: String,
        showtime: String,
        date: String,
        seats: [String]
    },
    // Auto-delete after 5 days
    expiryDate: {
        type: Date,
        default: function () {
            return new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // 5 days from now
        }
    }
}, {
    timestamps: true
});

// TTL index for auto-deletion after 5 days
orderSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('Order', orderSchema);
