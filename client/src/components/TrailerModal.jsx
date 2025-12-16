import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FiX, FiPlay, FiStar, FiClock, FiCalendar, FiShoppingCart, FiHeart, FiInfo } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/slices/cartSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { formatCurrency, formatDuration } from '../utils/helpers';

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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fadeIn p-4 md:p-6"
            onClick={onClose}
        >
            {/* Background Poster with Blur */}
            {movie?.posterUrl && (
                <div className="fixed inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-10 blur-3xl"
                        style={{
                            backgroundImage: `url(${movie.posterUrl})`,
                            transform: 'scale(1.2)'
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/80" />
                </div>
            )}

            {/* Main Modal Container - Theater Split Mode */}
            <div
                className="relative z-10 w-full max-w-[98vw] h-[92vh] bg-gray-900/40 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row transform transition-all duration-500"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button - Floating */}
                <button
                    className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-black/60 hover:bg-red-600 text-white transition-all duration-300 hover:scale-110 shadow-lg border border-white/10 backdrop-blur-md group"
                    onClick={onClose}
                >
                    <FiX className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Left Section: Video Player (Takes up ~65% width on desktop) */}
                <div className="flex-grow lg:flex-[2] relative bg-black flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 group">
                    {videoId ? (
                        <div className="w-full h-full relative">
                            <iframe
                                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1`}
                                title={`${title} Trailer`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute inset-0 w-full h-full"
                            ></iframe>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400">
                            <div className="p-8 bg-white/5 rounded-full mb-6 animate-pulse">
                                <FiPlay className="w-20 h-20 opacity-50" />
                            </div>
                            <p className="text-2xl font-light tracking-wide">Trailer Unavailable</p>
                        </div>
                    )}
                </div>

                {/* Right Section: Sidebar Info Panel (Takes up ~35% width on desktop) */}
                <div className="w-full lg:w-[500px] xl:w-[550px] flex-shrink-0 bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-md h-[40vh] lg:h-full overflow-y-auto custom-scrollbar flex flex-col">
                    <div className="p-6 lg:p-8 space-y-6">

                        {/* Title & Quick Stats */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-2.5 py-1 bg-red-600 rounded text-white text-[10px] font-bold uppercase tracking-wider shadow-lg shadow-red-600/20">
                                    Now Playing
                                </span>
                                {movie?.language && (
                                    <span className="px-2.5 py-1 bg-white/10 rounded text-gray-300 text-[10px] uppercase tracking-wider font-medium">
                                        {movie.language}
                                    </span>
                                )}
                            </div>

                            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                                {movie?.title || title}
                            </h2>

                            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm font-medium">
                                {movie?.rating > 0 && (
                                    <div className="flex items-center gap-1.5 text-yellow-500">
                                        <FiStar className="fill-current w-4 h-4" />
                                        <span className="font-bold text-white text-base">{movie.rating.toFixed(1)}</span>
                                    </div>
                                )}
                                {movie?.duration && (
                                    <div className="flex items-center gap-1.5">
                                        <FiClock className="w-4 h-4" />
                                        <span>{formatDuration(movie.duration)}</span>
                                    </div>
                                )}
                                {movie?.releaseDate && (
                                    <div className="flex items-center gap-1.5">
                                        <FiCalendar className="w-4 h-4" />
                                        <span>{new Date(movie.releaseDate).getFullYear()}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={handleAddToCart}
                                className="col-span-2 flex items-center justify-center gap-2 px-6 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/40 hover:-translate-y-0.5"
                            >
                                <FiShoppingCart className="w-5 h-5" />
                                <span>Buy Ticket</span>
                            </button>

                            <button
                                onClick={handleViewDetails}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all border border-white/5 hover:border-white/20"
                            >
                                <FiInfo className="w-4 h-4" />
                                <span>Details</span>
                            </button>

                            <button
                                onClick={handleToggleWishlist}
                                className={`flex items-center justify-center gap-2 px-4 py-3 font-semibold rounded-xl transition-all border ${isInWishlist
                                    ? 'bg-red-600/20 border-red-500/50 text-red-500'
                                    : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <FiHeart className={`w-4 h-4 ${isInWishlist ? 'fill-current' : ''}`} />
                                <span>{isInWishlist ? 'Saved' : 'Save'}</span>
                            </button>
                        </div>

                        {/* Price Information */}
                        <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Ticket Price</p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-4xl font-black text-white">
                                    {formatCurrency(movie?.offerPrice || movie?.price || 0)}
                                </span>
                                {movie?.offerPrice && (
                                    <span className="text-lg text-gray-500 line-through">
                                        {formatCurrency(movie.price)}
                                    </span>
                                )}
                            </div>
                            {movie?.offerPrice && (
                                <div className="mt-2 text-xs text-green-400 font-medium flex items-center gap-1">
                                    Save {Math.round((1 - movie.offerPrice / movie.price) * 100)}% on this booking
                                </div>
                            )}
                        </div>

                        {/* Genres */}
                        {movie?.genres && (
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Genres</p>
                                <div className="flex flex-wrap gap-2">
                                    {movie.genres.map((genre, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold rounded-lg border border-white/5 transition-colors cursor-default">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Synopsis */}
                        {movie?.description && (
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Synopsis</p>
                                <p className="text-gray-300 text-sm leading-relaxed">
                                    {movie.description}
                                </p>
                            </div>
                        )}

                        {/* Cast */}
                        {movie?.cast && movie.cast.length > 0 && (
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-3">Cast</p>
                                <p className="text-gray-400 text-sm">
                                    {movie.cast.join(', ')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-out forwards;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(0, 0, 0, 0.2);
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.4);
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
