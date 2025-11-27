import { useState, useEffect } from 'react';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { formatCurrency, formatDate } from '../../utils/helpers';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data.orders || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Order Management</h1>

            <div className="glass rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="text-left py-4 px-6">Order ID</th>
                            <th className="text-left py-4 px-6">Customer</th>
                            <th className="text-left py-4 px-6">Movies</th>
                            <th className="text-left py-4 px-6">Amount</th>
                            <th className="text-left py-4 px-6">Status</th>
                            <th className="text-left py-4 px-6">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="py-4 px-6 font-mono text-sm">{order._id.slice(-8)}</td>
                                <td className="py-4 px-6">{order.userId?.name}</td>
                                <td className="py-4 px-6">{order.movieIds?.length || 0} movies</td>
                                <td className="py-4 px-6 font-semibold">{formatCurrency(order.amount)}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm ${order.paymentStatus === 'completed'
                                            ? 'bg-green-500/20 text-green-400'
                                            : order.paymentStatus === 'pending'
                                                ? 'bg-yellow-500/20 text-yellow-400'
                                                : 'bg-red-500/20 text-red-400'
                                        }`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-400">{formatDate(order.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderManagement;
