import { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi';
import './TrendingTrailers.css';

const TrendingTrailers = ({ movies }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const trendingMovies = movies?.filter(m => m.trending && m.videoUrl) || [];

    useEffect(() => {
        if (trendingMovies.length === 0) return;

        const interval = setInterval(() => {
            if (!isPlaying) {
                setCurrentIndex((prev) => (prev + 1) % trendingMovies.length);
            }
        }, 8000); // Auto-advance every 8 seconds

        return () => clearInterval(interval);
    }, [trendingMovies.length, isPlaying]);

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % trendingMovies.length);
        setIsPlaying(false);
    };

    const goToPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + trendingMovies.length) % trendingMovies.length);
        setIsPlaying(false);
    };

    const getYouTubeId = (url) => {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        return match ? match[1] : null;
    };

    if (trendingMovies.length === 0) {
        return null;
    }

    const currentMovie = trendingMovies[currentIndex];
    const videoId = getYouTubeId(currentMovie?.videoUrl);

    return (
        <div className="trending-trailers-section">
            <div className="trending-header">
                <h2 className="trending-title">
                    <span className="trending-icon">🔥</span>
                    Trending Now
                </h2>
                <p className="trending-subtitle">Watch the hottest movie trailers</p>
            </div>

            <div className="trending-carousel">
                {/* Main Video Player */}
                <div className="trending-video-container">
                    {isPlaying && videoId ? (
                        <iframe
                            ref={videoRef}
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                            title={currentMovie.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="trending-iframe"
                        ></iframe>
                    ) : (
                        <div
                            className="trending-thumbnail"
                            style={{ backgroundImage: `url(${currentMovie?.posterUrl})` }}
                        >
                            <div className="trending-overlay">
                                <button
                                    className="trending-play-btn"
                                    onClick={() => setIsPlaying(true)}
                                >
                                    <FiPlay size={48} />
                                    <span>Play Trailer</span>
                                </button>
                                <div className="trending-info">
                                    <h3>{currentMovie?.title}</h3>
                                    <p className="trending-genres">
                                        {currentMovie?.genres?.slice(0, 3).join(' • ')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Arrows */}
                    {trendingMovies.length > 1 && (
                        <>
                            <button className="trending-nav trending-nav-left" onClick={goToPrev}>
                                <FiChevronLeft size={32} />
                            </button>
                            <button className="trending-nav trending-nav-right" onClick={goToNext}>
                                <FiChevronRight size={32} />
                            </button>
                        </>
                    )}
                </div>

                {/* Thumbnail Strip */}
                {trendingMovies.length > 1 && (
                    <div className="trending-thumbnails">
                        {trendingMovies.map((movie, index) => (
                            <div
                                key={movie._id}
                                className={`trending-thumb ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => {
                                    setCurrentIndex(index);
                                    setIsPlaying(false);
                                }}
                            >
                                <img src={movie.posterUrl} alt={movie.title} />
                                <div className="trending-thumb-overlay">
                                    <span className="trending-thumb-title">{movie.title}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Indicators */}
                <div className="trending-indicators">
                    {trendingMovies.map((_, index) => (
                        <button
                            key={index}
                            className={`trending-indicator ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentIndex(index);
                                setIsPlaying(false);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TrendingTrailers;
