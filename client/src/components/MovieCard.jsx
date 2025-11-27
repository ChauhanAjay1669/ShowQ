import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { FiStar, FiShoppingCart, FiHeart, FiPlay, FiClock, FiInfo } from 'react-icons/fi';
import { formatCurrency } from '../utils/helpers';
import TrailerModal from './TrailerModal';

const MovieCard = ({ movie }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showTrailer, setShowTrailer] = useState(false);
    const [cardStyle, setCardStyle] = useState({});
    const [posterStyle, setPosterStyle] = useState({});

    // Check if movie is in wishlist
    const isInWishlist = useSelector(state =>
        state.wishlist.items.some(item => item._id === movie._id)
    );

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(movie));
    };

    const handleWatchTrailer = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowTrailer(true);
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(toggleWishlist(movie));
    };

    const handleCardClick = () => {
        navigate(`/movies/${movie._id}`);
    };

    // Parallax tilt effect on mouse move
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        // Calculate tilt values (subtle movement)
        const tiltX = (y - 0.5) * 8; // -4 to 4 degrees
        const tiltY = (0.5 - x) * 8; // -4 to 4 degrees

        setCardStyle({
            transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`
        });

        setPosterStyle({
            transform: `translateX(${(x - 0.5) * -8}px) translateY(${(y - 0.5) * -8}px) scale(1.08)`
        });
    };

    const handleMouseLeave = () => {
        setCardStyle({});
        setPosterStyle({});
    };

    return (
        <>
            <div
                onClick={handleCardClick}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={cardStyle}
                className="group relative bg-gradient-to-b from-gray-900/50 to-black/50 rounded-xl overflow-hidden border border-white/5 hover:border-red-500/30 transition-all duration-500 cursor-pointer will-change-transform shadow-lg hover:shadow-2xl hover:shadow-red-500/20"
            >
                {/* Movie Poster */}
                <div className="relative aspect-[2/3] overflow-hidden bg-black">
                    <img
                        src={movie.posterUrl || 'https://via.placeholder.com/300x450/1a1a1a/ef4444?text=No+Image'}
                        alt={movie.title}
                        style={posterStyle}
                        className="w-full h-full object-cover transition-transform duration-700 will-change-transform"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>

                    {/* Discount Badge - Top Right */}
                    {movie.offerPrice && (
                        <div className="absolute top-3 right-3 z-10 animate-pulse">
                            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-600 to-red-500 shadow-lg shadow-red-500/50">
                                <span className="text-white text-xs font-bold uppercase tracking-wide">
                                    {Math.round((1 - movie.offerPrice / movie.price) * 100)}% OFF
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Rating Badge - Top Left */}
                    {movie.rating > 0 && (
                        <div className="absolute top-3 left-3 z-10">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${movie.rating >= 8 ? 'bg-green-500/90 text-white' :
                                movie.rating >= 6 ? 'bg-yellow-500/90 text-white' :
                                    'bg-red-500/90 text-white'
                                }`}>
                                {movie.rating.toFixed(1)}
                            </div>
                        </div>
                    )}

                    {/* Duration Badge - Bottom Left */}
                    {movie.duration && (
                        <div className="absolute bottom-3 left-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 border border-white/20">
                                <FiClock className="w-3.5 h-3.5 text-white" />
                                <span className="text-white text-xs font-medium">{movie.duration} min</span>
                            </div>
                        </div>
                    )}

                    {/* Play Trailer Button - Center Overlay */}
                    {movie.videoUrl && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/40 z-10">
                            <button
                                onClick={handleWatchTrailer}
                                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full transform transition-all duration-300 hover:scale-110 shadow-2xl shadow-red-600/50 animate-pulse hover:animate-none"
                            >
                                <FiPlay className="w-6 h-6" />
                                <span className="text-sm">Watch Trailer</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* Movie Info Overlay - Slides up on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent p-4 transform translate-y-[65%] group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    {/* Title - Always visible */}
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-1 group-hover:text-red-400 transition-colors duration-300">
                        {movie.title}
                    </h3>

                    {/* Genres - Fade in on hover */}
                    {movie.genres && movie.genres.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                            {movie.genres.slice(0, 3).map((genre, index) => (
                                <span
                                    key={index}
                                    className="px-2.5 py-0.5 bg-white/10 text-gray-200 text-xs font-medium rounded-full border border-white/20"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Language & Year */}
                    <div className="flex items-center gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                        <span className="px-2.5 py-0.5 bg-gradient-to-r from-gray-700/80 to-gray-600/80 text-white text-xs font-semibold rounded-full border border-white/10">
                            {movie.language}
                        </span>
                        {movie.releaseDate && (
                            <span className="text-gray-400 text-xs font-medium">
                                {new Date(movie.releaseDate).getFullYear()}
                            </span>
                        )}
                    </div>

                    {/* Description - Fade in on hover */}
                    {movie.description && (
                        <p className="text-gray-300 text-xs leading-relaxed mb-3 line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                            {movie.description}
                        </p>
                    )}

                    {/* Price and Actions */}
                    <div className="flex items-end justify-between pt-3 border-t border-white/10">
                        {/* Price */}
                        <div className="flex flex-col">
                            {movie.offerPrice ? (
                                <>
                                    <span className="text-xl font-bold text-red-400">
                                        {formatCurrency(movie.offerPrice)}
                                    </span>
                                    <span className="text-gray-500 line-through text-xs">
                                        {formatCurrency(movie.price)}
                                    </span>
                                </>
                            ) : (
                                <span className="text-xl font-bold text-red-400">
                                    {formatCurrency(movie.price)}
                                </span>
                            )}
                        </div>

                        {/* Action Buttons - Fade in on hover */}
                        <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleCardClick();
                                }}
                                className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white transition-all duration-300 transform hover:scale-110 border border-blue-500/30 hover:border-blue-500"
                                title="View Details"
                            >
                                <FiInfo className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="p-2 rounded-lg bg-green-600/20 hover:bg-green-600 text-green-400 hover:text-white transition-all duration-300 transform hover:scale-110 border border-green-500/30 hover:border-green-500"
                                title="Add to Cart"
                            >
                                <FiShoppingCart className="w-4 h-4" />
                            </button>
                            <button
                                onClick={handleToggleWishlist}
                                className={`p-2 rounded-lg transition-all duration-300 transform hover:scale-110 border ${isInWishlist
                                    ? 'bg-red-600 text-white border-red-500'
                                    : 'bg-red-600/20 text-red-400 border-red-500/30 hover:bg-red-600 hover:text-white hover:border-red-500'
                                    }`}
                                title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                            >
                                <FiHeart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-350">
                        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-red-600 to-red-500 w-0 transition-all duration-300"></div>
                        </div>
                    </div>
                </div>

                {/* Shine Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                </div>
            </div>

            {/* Trailer Modal */}
            <TrailerModal
                videoUrl={movie.videoUrl}
                title={movie.title}
                isOpen={showTrailer}
                onClose={() => setShowTrailer(false)}
                movie={movie}
            />
        </>
    );
};

export default MovieCard;
