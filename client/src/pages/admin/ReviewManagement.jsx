import { useState, useEffect } from 'react';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { FiTrash2, FiStar } from 'react-icons/fi';
import { formatDate } from '../../utils/helpers';

const ReviewManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            // Fetch all reviews (would need a new endpoint or get from movies)
            const { data } = await api.get('/movies');
            const allReviews = [];

            // For demo purposes, we'll show placeholder text
            // In production, you'd create a /api/admin/reviews endpoint
            setReviews(allReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this review?')) return;
        try {
            await api.delete(`/reviews/${id}`);
            setReviews(reviews.filter(r => r._id !== id));
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('Failed to delete review');
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">Review Management</h1>

            {reviews.length === 0 ? (
                <div className="glass rounded-lg p-12 text-center">
                    <FiStar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">No reviews to moderate</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {reviews.map((review) => (
                        <div key={review._id} className="glass rounded-lg p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="font-semibold">{review.userId?.name}</span>
                                        <div className="flex items-center text-yellow-500">
                                            {Array(review.rating).fill(0).map((_, i) => (
                                                <FiStar key={i} className="fill-current" />
                                            ))}
                                        </div>
                                        <span className="text-sm text-gray-400">{formatDate(review.createdAt)}</span>
                                    </div>
                                    <p className="text-gray-300">{review.comment}</p>
                                    <p className="text-sm text-gray-500 mt-2">Movie: {review.movieId?.title}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(review._id)}
                                    className="p-2 hover:bg-red-500/20 rounded text-red-400"
                                >
                                    <FiTrash2 />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ReviewManagement;
