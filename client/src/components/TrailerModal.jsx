import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiX, FiPlay, FiStar, FiClock, FiCalendar, FiShoppingCart, FiHeart, FiInfo } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { formatCurrency } from '../utils/helpers';

const TrailerModal = ({ videoUrl, title, isOpen, onClose, movie }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isInWishlist = useSelector(state =>
        movie ? state.wishlist.items.some(item => item._id === movie._id) : false
    );

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    // Extract video ID from YouTube URL
    const getYouTubeId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

    const videoId = getYouTubeId(videoUrl);

    const handleAddToCart = () => {
        if (movie) {
            dispatch(addToCart(movie));
        }
    };

    const handleToggleWishlist = () => {
        if (movie) {
            dispatch(toggleWishlist(movie));
        }
    };

    const handleViewDetails = () => {
        if (movie) {
            navigate(`/movies/${movie._id}`);
            onClose();
        }
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md animate-fadeIn overflow-y-auto py-8"
            onClick={onClose}
        >
            {/* Background Poster with Blur */}
            {movie?.posterUrl && (
                <div className="fixed inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-20 blur-2xl"
                        style={{
                            backgroundImage: `url(${movie.posterUrl})`,
                            transform: 'scale(1.1)'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90" />
                </div>
            )}

            <div
                className="relative z-10 w-full max-w-7xl mx-4 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 transform transition-all duration-500"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    className="absolute top-6 right-6 z-30 p-3 rounded-full bg-black/80 hover:bg-red-600 text-white transition-all duration-300 hover:scale-110 shadow-xl border border-white/20"
                    onClick={onClose}
                >
                    <FiX className="w-6 h-6" />
                </button>

                {/* Content */}
                <div className="flex flex-col lg:flex-row min-h-[600px] max-h-[90vh]">
                    {/* Left Side - Trailer Video */}
                    <div className="flex-1 bg-black/40 backdrop-blur-sm flex items-center justify-center p-8 lg:p-12 border-r border-white/5">
                        <div className="w-full max-w-3xl">
                            {videoId ? (
                                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                                        title={`${title} Trailer`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    ></iframe>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-400 py-20">
                                    <div className="p-6 bg-white/5 rounded-full mb-6">
                                        <FiPlay className="w-20 h-20" />
                                    </div>
                                    <p className="text-2xl font-semibold">Trailer not available</p>
                                    <p className="text-sm text-gray-500 mt-2">Check back later for updates</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side - Movie Information */}
                    <div className="flex-1 bg-gradient-to-b from-gray-900/80 to-gray-950/80 backdrop-blur-sm p-8 lg:p-12 overflow-y-auto custom-scrollbar">
                        {movie ? (
                            <div className="space-y-6">
                                {/* Title */}
                                <div>
                                    <div className="inline-block px-4 py-1 bg-red-600/20 rounded-full border border-red-500/30 mb-4">
                                        <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Now Playing</span>
                                    </div>
                                    <h2 className="text-5xl font-black text-white mb-3 leading-tight">
                                        {movie.title}
                                    </h2>
                                    {movie.tagline && (
                                        <p className="text-gray-400 text-lg italic font-light">"{movie.tagline}"</p>
                                    )}
                                </div>

                                {/* Rating & Stats */}
                                <div className="flex flex-wrap items-center gap-3">
                                    {movie.rating > 0 && (
                                        <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/40 hover:border-yellow-500/60 transition-colors">
                                            <FiStar className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                                            <span className="text-2xl font-bold text-white">{movie.rating.toFixed(1)}</span>
                                            <span className="text-gray-400 text-sm font-medium">/10</span>
                                        </div>
                                    )}

                                    {movie.duration && (<div className="flex items-center gap-2 px-5 py-3 bg-blue-500/20 rounded-xl border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                                        <FiClock className="w-4 h-4 text-blue-400" />
                                        <span className="text-white font-semibold">{movie.duration} min</span>
                                    </div>
                                    )}

                                    {movie.releaseDate && (
                                        <div className="flex items-center gap-2 px-5 py-3 bg-purple-500/20 rounded-xl border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                                            <FiCalendar className="w-4 h-4 text-purple-400" />
                                            <span className="text-white font-semibold">{new Date(movie.releaseDate).getFullYear()}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Genres */}
                                {movie.genres && movie.genres.length > 0 && (
                                    <div>
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Genres</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {movie.genres.map((genre, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold rounded-full border border-white/10 hover:border-red-500/50 transition-all cursor-pointer"
                                                >
                                                    {genre}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                {movie.description && (
                                    <div className="bg-black/40 p-6 rounded-xl border border-white/10">
                                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <FiInfo className="w-4 h-4" />
                                            Synopsis
                                        </h3>
                                        <p className="text-gray-300 leading-relaxed text-base">{movie.description}</p>
                                    </div>
                                )}

                                {/* Cast & Crew */}
                                {(movie.director || (movie.cast && movie.cast.length > 0)) && (
                                    <div className="grid grid-cols-1 gap-4 p-6 bg-white/5 rounded-xl border border-white/10">
                                        {movie.director && (
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Director</h3>
                                                <p className="text-white font-semibold text-lg">{movie.director}</p>
                                            </div>
                                        )}
                                        {movie.cast && movie.cast.length > 0 && (
                                            <div>
                                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Cast</h3>
                                                <p className="text-gray-300">{movie.cast.join(', ')}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Language & Release Date */}
                                <div className="flex flex-wrap gap-4">
                                    {movie.language && (
                                        <div>
                                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Language</h3>
                                            <span className="inline-block px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-white font-semibold rounded-lg shadow-lg">
                                                {movie.language}
                                            </span>
                                        </div>
                                    )}
                                    {movie.releaseDate && (
                                        <div>
                                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Release Date</h3>
                                            <p className="text-white text-lg font-semibold">{formatDate(movie.releaseDate)}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Pricing */}
                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex items-end justify-between mb-6">
                                        <div>
                                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Ticket Price</h3>
                                            {movie.offerPrice ? (
                                                <div className="flex items-baseline gap-4">
                                                    <span className="text-5xl font-black bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                                                        {formatCurrency(movie.offerPrice)}
                                                    </span>
                                                    <span className="text-xl text-gray-500 line-through font-medium">
                                                        {formatCurrency(movie.price)}
                                                    </span>
                                                    <div className="px-3 py-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white text-sm font-bold rounded-full shadow-lg">
                                                        SAVE {Math.round((1 - movie.offerPrice / movie.price) * 100)}%
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-5xl font-black bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                                                    {formatCurrency(movie.price)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <button
                                            onClick={handleViewDetails}
                                            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                                        >
                                            <FiPlay className="w-5 h-5" />
                                            <span>Details</span>
                                        </button>

                                        <button
                                            onClick={handleAddToCart}
                                            className="flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                                        >
                                            <FiShoppingCart className="w-5 h-5" />
                                            <span>Add Cart</span>
                                        </button>

                                        <button
                                            onClick={handleToggleWishlist}
                                            className={`flex items-center justify-center gap-2 px-6 py-4 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl ${isInWishlist
                                                ? 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white'
                                                : 'bg-red-500/10 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-500 text-red-400 hover:text-white border-2 border-red-600 hover:border-transparent'
                                                }`}
                                        >
                                            <FiHeart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                                            <span>{isInWishlist ? 'Saved' : 'Wishlist'}</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-400 text-xl">Movie information not available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 5px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(180deg, rgba(239, 68, 68, 0.6), rgba(239, 68, 68, 0.8));
                    border-radius: 5px;
                    border: 2px solid transparent;
                    background-clip: content-box;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(180deg, rgba(239, 68, 68, 0.8), rgba(239, 68, 68, 1));
                    background-clip: content-box;
                }
            `}</style>
        </div>
    );
};

TrailerModal.propTypes = {
    videoUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    movie: PropTypes.object
};

export default TrailerModal;
