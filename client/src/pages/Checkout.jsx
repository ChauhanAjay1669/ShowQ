import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';
import api from '../utils/api';
import { formatCurrency } from '../utils/helpers';
import { FiCheckCircle } from 'react-icons/fi';

const Checkout = () => {
    const { state } = useLocation();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);

    // Determine items and total (either from direct booking or cart)
    const items = state?.booking ? [state.booking.movie] : cart.items;
    const total = state?.booking ? state.booking.total : cart.total;
    const bookingDetails = state?.booking;

    const handlePayment = async () => {
        setProcessing(true);
        try {
            // Create order
            const { data } = await api.post('/orders/create', {
                movieIds: items.map(item => item._id),
                amount: total
            });

            // Initialize Razorpay
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_dummy',
                amount: total * 100, // Razorpay expects amount in paise
                currency: 'INR',
                name: 'QuickShow',
                description: 'Movie Purchase',
                order_id: data.orderId,
                handler: async function (response) {
                    try {
                        // Verify payment
                        await api.post('/payment/verify', {
                            orderId: data.order._id,
                            paymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature
                        });

                        dispatch(clearCart());
                        navigate('/order-history', { state: { success: true } });
                    } catch (error) {
                        console.error('Payment verification failed:', error);
                        alert('Payment verification failed. Please contact support.');
                    }
                },
                prefill: {
                    name: data.order.userId.name,
                    email: data.order.userId.email
                },
                theme: {
                    color: '#ef4444'
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment initialization failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">Checkout</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Order Items */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
                    <div className="glass rounded-lg p-6 space-y-4">
                        {items.map((item) => (
                            <div key={item._id} className="flex justify-between items-center">
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={item.posterUrl || 'https://via.placeholder.com/60x90/1a1a1a/ef4444?text=No+Image'}
                                        alt={item.title}
                                        className="w-12 h-18 object-cover rounded"
                                    />
                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-400">{item.language}</p>
                                        {bookingDetails && (
                                            <div className="text-xs text-gray-400 mt-1">
                                                <p>{bookingDetails.theater.name}</p>
                                                <p>{bookingDetails.date} | {bookingDetails.time}</p>
                                                <p>Seats: {bookingDetails.seats.join(', ')}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <span className="font-semibold">
                                    {formatCurrency(bookingDetails ? bookingDetails.price : (item.offerPrice || item.price))}
                                </span>
                            </div>
                        ))}

                        <div className="border-t border-white/10 pt-4 mt-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total Amount</span>
                                <span className="text-primary-400">{formatCurrency(total)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment */}
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
                    <div className="glass rounded-lg p-6">
                        <div className="mb-6">
                            <div className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg">
                                <input
                                    type="radio"
                                    id="razorpay"
                                    name="payment"
                                    defaultChecked
                                    className="w-4 h-4"
                                />
                                <label htmlFor="razorpay" className="flex-1">
                                    <span className="font-semibold">Razorpay</span>
                                    <p className="text-sm text-gray-400">Pay securely with Razorpay</p>
                                </label>
                                <img
                                    src="https://razorpay.com/assets/razorpay-glyph.svg"
                                    alt="Razorpay"
                                    className="h-8"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handlePayment}
                            disabled={processing || items.length === 0}
                            className="w-full py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Processing...' : `Pay ${formatCurrency(total)}`}
                        </button>

                        <div className="mt-6 text-sm text-gray-400">
                            <p className="flex items-center space-x-2 mb-2">
                                <FiCheckCircle className="text-green-500" />
                                <span>Secure payment</span>
                            </p>
                            <p className="flex items-center space-x-2">
                                <FiCheckCircle className="text-green-500" />
                                <span>Instant access to purchased movies</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
