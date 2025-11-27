import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../utils/api';
import Loading from '../components/Loading';
import { formatCurrency, formatDate } from '../utils/helpers';
import { FiCheckCircle, FiShoppingBag } from 'react-icons/fi';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const showSuccess = location.state?.success;

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders/history');
            setOrders(data.orders || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">Order History</h1>

            {showSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg flex items-center space-x-2 text-green-400">
                    <FiCheckCircle className="w-6 h-6" />
                    <span>Payment successful! Your movies have been added to your library.</span>
                </div>
            )}

            {orders.length === 0 ? (
                <div className="text-center py-12 glass rounded-lg">
                    <FiShoppingBag className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
                    <p className="text-gray-400">Your purchase history will appear here</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order._id} className="glass rounded-lg p-6">
                            <div className="flex flex-wrap items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm text-gray-400">Order ID: {order._id}</p>
                                    <p className="text-sm text-gray-400">{formatDate(order.createdAt)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold text-primary-400">{formatCurrency(order.amount)}</p>
                                    <span className={`inline-block px-3 py-1 rounded-full text-sm ${order.paymentStatus === 'completed'
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        {order.paymentStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {order.movieIds?.map((movie) => (
                                    <div key={movie._id} className="flex items-center space-x-3 bg-white/5 rounded-lg p-3">
                                        <img
                                            src={movie.posterUrl || 'https://via.placeholder.com/60x90/1a1a1a/ef4444?text=No+Image'}
                                            alt={movie.title}
                                            className="w-12 h-18 object-cover rounded"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-sm truncate">{movie.title}</p>
                                            <p className="text-xs text-gray-400">{movie.language}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
