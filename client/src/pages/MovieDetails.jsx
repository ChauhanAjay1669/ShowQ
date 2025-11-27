import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import api from '../utils/api';
import Loading from '../components/Loading';
import { formatCurrency, formatDate, getRatingColor } from '../utils/helpers';
import { FiStar, FiShoppingCart, FiHeart, FiCalendar, FiFilm } from 'react-icons/fi';
import { movies as dummyMovies } from '../assets/data/dummyData';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(5);
    const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        fetchMovieDetails();
    }, [id]);

    const fetchMovieDetails = async () => {
        try {
            const [movieRes, reviewsRes] = await Promise.all([
                api.get(`/movies/${id}`),
                api.get(`/reviews/${id}`)
            ]);
            setMovie(movieRes.data.movie);
            setReviews(reviewsRes.data.reviews || []);
        } catch (error) {
            console.error('Error fetching movie details, using demo data:', error);
            // Find in dummy data
            const foundMovie = dummyMovies.find(m => m.id == id);
            if (foundMovie) {
                setMovie({
                    _id: foundMovie.id,
                    title: foundMovie.title,
                    posterUrl: foundMovie.image,
                    rating: foundMovie.rating,
                    description: foundMovie.description,
                    price: 299,
                    offerPrice: 199,
                    language: 'English',
                    genres: [foundMovie.genre],
                    releaseDate: new Date().toISOString(),
                    cast: ["Demo Actor 1", "Demo Actor 2"],
                    director: "Demo Director"
                });
                setReviews([]);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        dispatch(addToCart(movie));
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) return;

        try {
            await api.post('/reviews', {
                movieId: id,
                rating,
                comment: reviewText
            });
            setReviewText('');
            setRating(5);
            fetchMovieDetails(); // Refresh reviews
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    if (loading) return <Loading />;
    if (!movie) return <div className="text-center py-12">Movie not found</div>;

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="relative h-[500px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent z-10"></div>
                <img
                    src={movie.posterUrl || 'https://via.placeholder.com/1920x500/1a1a1a/ef4444?text=Movie+Poster'}
                    alt={movie.title}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-20">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Poster */}
                    <div className="md:col-span-1">
                        <img
                            src={movie.posterUrl || 'https://via.placeholder.com/300x450/1a1a1a/ef4444?text=No+Poster'}
                            alt={movie.title}
                            className="w-full rounded-lg shadow-2xl"
                        />
                    </div>

                    {/* Details */}
                    <div className="md:col-span-2 glass rounded-lg p-8">
                        <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className={`flex items-center space-x-1 ${getRatingColor(movie.rating)}`}>
                                <FiStar className="fill-current" />
                                <span className="font-semibold">{movie.rating?.toFixed(1) || 'N/A'}</span>
                            </div>
                            <span className="flex items-center space-x-1 text-gray-400">
                                <FiCalendar />
                                <span>{formatDate(movie.releaseDate)}</span>
                            </span>
                            <span className="flex items-center space-x-1 text-gray-400">
                                <FiFilm />
                                <span>{movie.language}</span>
                            </span>
                        </div>

                        {/* Genres */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {movie.genres?.map((genre, idx) => (
                                <span key={idx} className="px-3 py-1 bg-white/10 rounded-full text-sm">
                                    {genre}
                                </span>
                            ))}
                        </div>

                        <p className="text-gray-300 mb-6 text-lg">{movie.description}</p>

                        {/* Cast & Director */}
                        <div className="mb-6 space-y-2">
                            {movie.director && (
                                <p><span className="text-gray-400">Director:</span> {movie.director}</p>
                            )}
                            {movie.cast && movie.cast.length > 0 && (
                                <p><span className="text-gray-400">Cast:</span> {movie.cast.join(', ')}</p>
                            )}
                        </div>

                        {/* Price & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                            <div>
                                {movie.offerPrice ? (
                                    <>
                                        <span className="text-3xl font-bold text-primary-400">{formatCurrency(movie.offerPrice)}</span>
                                        <span className="text-gray-500 line-through ml-3 text-xl">{formatCurrency(movie.price)}</span>
                                        <span className="ml-3 px-2 py-1 bg-primary-600 rounded text-sm">
                                            {Math.round((1 - movie.offerPrice / movie.price) * 100)}% OFF
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-3xl font-bold text-primary-400">{formatCurrency(movie.price)}</span>
                                )}
                            </div>

                            <button
                                onClick={() => navigate(`/booking/${id}`)}
                                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition shadow-lg shadow-primary-600/30"
                            >
                                <FiFilm />
                                <span>Book Tickets</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-12 glass rounded-lg p-8">
                    <h2 className="text-2xl font-bold mb-6">Reviews</h2>

                    {/* Add Review Form */}
                    {isAuthenticated && (
                        <form onSubmit={handleSubmitReview} className="mb-8 p-6 bg-white/5 rounded-lg">
                            <h3 className="font-semibold mb-4">Write a Review</h3>
                            <div className="mb-4">
                                <label className="block mb-2">Rating</label>
                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-600'}`}
                                        >
                                            <FiStar className={star <= rating ? 'fill-current' : ''} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                placeholder="Share your thoughts about this movie..."
                                className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4"
                                rows="4"
                                required
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition"
                            >
                                Submit Review
                            </button>
                        </form>
                    )}

                    {/* Reviews List */}
                    <div className="space-y-4">
                        {reviews.length > 0 ? (
                            reviews.map((review) => (
                                <div key={review._id} className="p-4 bg-white/5 rounded-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-semibold">{review.userId?.name || 'Anonymous'}</span>
                                        <div className="flex items-center space-x-1 text-yellow-500">
                                            <FiStar className="fill-current" />
                                            <span>{review.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-300">{review.comment}</p>
                                    <p className="text-sm text-gray-500 mt-2">{formatDate(review.createdAt)}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No reviews yet. Be the first to review!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
