import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../store/slices/wishlistSlice';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';

const Wishlist = () => {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.wishlist.items);

    const handleClearWishlist = () => {
        if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
            wishlistItems.forEach(item => {
                dispatch(removeFromWishlist(item._id));
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                            My <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Wishlist</span>
                        </h1>
                        <p className="text-gray-400">
                            {wishlistItems.length} {wishlistItems.length === 1 ? 'movie' : 'movies'} saved
                        </p>
                    </div>

                    {wishlistItems.length > 0 && (
                        <button
                            onClick={handleClearWishlist}
                            className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-colors border border-red-500/30 hover:border-red-500"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Empty State */}
                {wishlistItems.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 mb-8">
                            <FiHeart className="w-16 h-16 text-red-500" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-4">Your Wishlist is Empty</h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                            Start adding movies to your wishlist by clicking the heart icon on any movie card
                        </p>
                        <Link
                            to="/movies"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl shadow-red-600/30"
                        >
                            <FiShoppingBag className="w-5 h-5" />
                            Browse Movies
                        </Link>
                    </div>
                ) : (
                    /* Movies Grid */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {wishlistItems.map((movie) => (
                            <MovieCard key={movie._id} movie={movie} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Wishlist;
