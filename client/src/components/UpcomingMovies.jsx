import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { FiCalendar, FiClock } from 'react-icons/fi';
import './UpcomingMovies.css';

const UpcomingMovies = () => {
    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUpcoming();
    }, []);

    const fetchUpcoming = async () => {
        try {
            const { data } = await api.get('/movies/upcoming');
            setUpcomingMovies(data.movies || []);
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getDaysUntil = (date) => {
        const days = Math.ceil((new Date(date) - new Date()) / (1000 * 60 * 60 * 24));
        return days;
    };

    if (loading) {
        return <div className="upcoming-loading">Loading upcoming movies...</div>;
    }

    if (upcomingMovies.length === 0) {
        return null;
    }

    return (
        <section className="upcoming-movies-section">
            <div className="upcoming-header">
                <div className="upcoming-title-container">
                    <FiCalendar className="upcoming-icon" />
                    <h2 className="upcoming-title">Coming Soon</h2>
                </div>
                <p className="upcoming-subtitle">Get ready for these exciting releases!</p>
            </div>

            <div className="upcoming-grid">
                {upcomingMovies.map((movie) => {
                    const daysUntil = getDaysUntil(movie.releaseDate);
                    return (
                        <Link
                            key={movie._id}
                            to={`/movies/${movie._id}`}
                            className="upcoming-card"
                        >
                            <div className="upcoming-poster-container">
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="upcoming-poster"
                                />
                                <div className="upcoming-overlay">
                                    <div className="upcoming-badge">Coming Soon</div>
                                </div>
                            </div>

                            <div className="upcoming-info">
                                <h3 className="upcoming-movie-title">{movie.title}</h3>

                                <div className="upcoming-meta">
                                    <div className="upcoming-date">
                                        <FiCalendar size={16} />
                                        <span>{formatDate(movie.releaseDate)}</span>
                                    </div>
                                    <div className="upcoming-countdown">
                                        <FiClock size={16} />
                                        <span>
                                            {daysUntil > 0
                                                ? `${daysUntil} day${daysUntil !== 1 ? 's' : ''}`
                                                : 'Today!'
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className="upcoming-genres">
                                    {movie.genres?.slice(0, 3).map((genre, idx) => (
                                        <span key={idx} className="upcoming-genre-tag">
                                            {genre}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default UpcomingMovies;
