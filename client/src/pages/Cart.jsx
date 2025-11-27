import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, calculateTotal } from '../store/slices/cartSlice';
import { formatCurrency } from '../utils/helpers';
import { FiTrash2, FiShoppingBag } from 'react-icons/fi';

const Cart = () => {
    const { items, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(calculateTotal());
    }, [items, dispatch]);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    if (items.length === 0) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
                <FiShoppingBag className="w-24 h-24 text-gray-600 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                <p className="text-gray-400 mb-6">Add some movies to get started!</p>
                <Link
                    to="/movies"
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition"
                >
                    Browse Movies
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item._id} className="glass rounded-lg p-4 flex gap-4">
                            <img
                                src={item.posterUrl || 'https://via.placeholder.com/100x150/1a1a1a/ef4444?text=No+Image'}
                                alt={item.title}
                                className="w-24 h-36 object-cover rounded"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                                <p className="text-gray-400 text-sm mb-2 line-clamp-2">{item.description}</p>
                                <div className="flex items-center space-x-2">
                                    {item.offerPrice ? (
                                        <>
                                            <span className="text-primary-400 font-bold">{formatCurrency(item.offerPrice)}</span>
                                            <span className="text-gray-500 line-through text-sm">{formatCurrency(item.price)}</span>
                                        </>
                                    ) : (
                                        <span className="text-primary-400 font-bold">{formatCurrency(item.price)}</span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemove(item._id)}
                                className="p-2 hover:bg-red-500/20 rounded-lg transition text-red-400"
                            >
                                <FiTrash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="glass rounded-lg p-6 sticky top-20">
                        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-gray-400">
                                <span>Items ({items.length})</span>
                                <span>{formatCurrency(total)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400">
                                <span>Tax</span>
                                <span>₹0</span>
                            </div>
                            <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-primary-400">{formatCurrency(total)}</span>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition"
                        >
                            Proceed to Checkout
                        </button>

                        <Link
                            to="/movies"
                            className="block text-center mt-4 text-primary-400 hover:text-primary-300"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
