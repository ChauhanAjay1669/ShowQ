import { useState, useEffect } from 'react';
import api from '../../utils/api';
import MovieEditModal from '../../components/MovieEditModal';
import { FiEdit, FiTrash2, FiPlus, FiTrendingUp, FiStar, FiEye, FiEyeOff, FiCalendar } from 'react-icons/fi';
import './AdminMovies.css';

const AdminMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, published, upcoming, draft
    const [editingMovie, setEditingMovie] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const { data } = await api.get('/admin/movies');
            setMovies(data.movies || []);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleTrending = async (movieId, currentStatus) => {
        try {
            const { data } = await api.patch(`/admin/movies/${movieId}/trending`);
            if (data.success) {
                setMovies(movies.map(m =>
                    m._id === movieId ? { ...m, trending: !currentStatus } : m
                ));
            }
        } catch (error) {
            console.error('Error toggling trending:', error);
            alert('Failed to update trending status');
        }
    };

    const toggleFeatured = async (movieId, currentStatus) => {
        try {
            const { data } = await api.patch(`/admin/movies/${movieId}/featured`);
            if (data.success) {
                setMovies(movies.map(m =>
                    m._id === movieId ? { ...m, featured: !currentStatus } : m
                ));
            }
        } catch (error) {
            console.error('Error toggling featured:', error);
            alert('Failed to update featured status');
        }
    };

    const changeStatus = async (movieId, newStatus) => {
        try {
            const { data } = await api.put(`/admin/movies/${movieId}`, { status: newStatus });
            if (data.success) {
                setMovies(movies.map(m =>
                    m._id === movieId ? { ...m, status: newStatus } : m
                ));
            }
        } catch (error) {
            console.error('Error changing status:', error);
            alert('Failed to update movie status');
        }
    };

    const deleteMovie = async (movieId, title) => {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            const { data } = await api.delete(`/admin/movies/${movieId}`);
            if (data.success) {
                setMovies(movies.filter(m => m._id !== movieId));
            }
        } catch (error) {
            console.error('Error deleting movie:', error);
            alert('Failed to delete movie');
        }
    };

    const handleEditMovie = (movie) => {
        setEditingMovie(movie);
        setIsEditModalOpen(true);
    };

    const handleUpdateMovie = (updatedMovie) => {
        // Check if this is a new movie (not in current list) or an update
        const existingIndex = movies.findIndex(m => m._id === updatedMovie._id);

        if (existingIndex !== -1) {
            // Update existing movie
            setMovies(movies.map(m => m._id === updatedMovie._id ? updatedMovie : m));
        } else {
            // Add new movie to the list
            setMovies([updatedMovie, ...movies]);
        }
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setEditingMovie(null);
    };

    const filteredMovies = movies.filter(m => {
        if (filter === 'all') return true;
        return m.status === filter;
    });

    const trendingCount = movies.filter(m => m.trending && m.status === 'published').length;
    const upcomingCount = movies.filter(m => m.status === 'upcoming').length;
    const featuredCount = movies.filter(m => m.featured && m.status === 'published').length;

    if (loading) {
        return <div className="admin-loading">Loading movies...</div>;
    }

    return (
        <div className="admin-movies">
            <div className="admin-header">
                <div>
                    <h1>Movie Management</h1>
                    <p className="admin-subtitle">
                        {featuredCount} hero featured • {trendingCount} trending • {upcomingCount} upcoming • {movies.length} total
                    </p>
                </div>
                <button
                    className="btn-primary"
                    onClick={() => {
                        setEditingMovie(null);
                        setIsEditModalOpen(true);
                    }}
                >
                    <FiPlus /> Add New Movie
                </button>
            </div>

            {/* Filter Tabs */}
            <div className="admin-filters">
                <button
                    className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Movies ({movies.length})
                </button>
                <button
                    className={`filter-tab ${filter === 'published' ? 'active' : ''}`}
                    onClick={() => setFilter('published')}
                >
                    Published ({movies.filter(m => m.status === 'published').length})
                </button>
                <button
                    className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setFilter('upcoming')}
                >
                    Upcoming ({upcomingCount})
                </button>
                <button
                    className={`filter-tab ${filter === 'draft' ? 'active' : ''}`}
                    onClick={() => setFilter('draft')}
                >
                    Draft ({movies.filter(m => m.status === 'draft').length})
                </button>
            </div>

            {/* Hero Banner Preview */}
            <div className="homepage-preview" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(234, 88, 12, 0.05) 100%)', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
                <h3>🎬 Hero Banner ({featuredCount}/5)</h3>
                <p>Movies marked as <strong>featured</strong> will appear in the homepage hero carousel</p>
                {featuredCount === 0 && (
                    <div className="warning-box">
                        ⚠️ No featured movies set! Mark up to 5 movies as featured to show in hero banner.
                    </div>
                )}
                {featuredCount > 5 && (
                    <div className="warning-box" style={{ background: 'rgba(234, 179, 8, 0.1)', borderColor: 'rgba(234, 179, 8, 0.5)' }}>
                        ⚡ You have {featuredCount} featured movies, but only the first 5 will appear in hero.
                    </div>
                )}
            </div>

            {/* Homepage Preview */}
            <div className="homepage-preview">
                <h3>🏠 Homepage Trailers ({trendingCount}/5)</h3>
                <p>Movies marked as <strong>trending</strong> with trailers will appear in the carousel</p>
                {trendingCount === 0 && (
                    <div className="warning-box">
                        ⚠️ No trending movies set! Mark movies as trending to show trailers on homepage.
                    </div>
                )}
            </div>

            {/* Movies Table */}
            <div className="movies-table-container">
                <table className="movies-table">
                    <thead>
                        <tr>
                            <th>Movie</th>
                            <th>Status</th>
                            <th>Release Date</th>
                            <th>Trailer</th>
                            <th>Homepage Controls</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMovies.map(movie => (
                            <tr key={movie._id}>
                                <td>
                                    <div className="movie-cell">
                                        <img src={movie.posterUrl} alt={movie.title} />
                                        <div>
                                            <strong>{movie.title}</strong>
                                            <span className="movie-lang">{movie.language}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <select
                                        value={movie.status}
                                        onChange={(e) => changeStatus(movie._id, e.target.value)}
                                        className={`status-select status-${movie.status}`}
                                    >
                                        <option value="published">Published</option>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </td>
                                <td>
                                    <div className="date-cell">
                                        <FiCalendar size={14} />
                                        {new Date(movie.releaseDate).toLocaleDateString()}
                                    </div>
                                </td>
                                <td>
                                    {movie.videoUrl ? (
                                        <span className="badge badge-success">✓ Available</span>
                                    ) : (
                                        <span className="badge badge-warning">✗ Missing</span>
                                    )}
                                </td>
                                <td>
                                    <div className="toggle-controls">
                                        <button
                                            className={`toggle-btn ${movie.trending ? 'active' : ''}`}
                                            onClick={() => toggleTrending(movie._id, movie.trending)}
                                            title="Show in trending carousel"
                                        >
                                            <FiTrendingUp />
                                            {movie.trending ? 'Trending' : 'Set Trending'}
                                        </button>
                                        <button
                                            className={`toggle-btn ${movie.featured ? 'active' : ''}`}
                                            onClick={() => toggleFeatured(movie._id, movie.featured)}
                                            title="Show in hero banner"
                                        >
                                            <FiStar />
                                            {movie.featured ? '⭐ Hero' : 'Set Hero'}
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="btn-icon btn-edit"
                                            title="Edit"
                                            onClick={() => handleEditMovie(movie)}
                                        >
                                            <FiEdit />
                                        </button>
                                        <button
                                            className="btn-icon btn-delete"
                                            title="Delete"
                                            onClick={() => deleteMovie(movie._id, movie.title)}
                                        >
                                            <FiTrash2 />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredMovies.length === 0 && (
                <div className="empty-state">
                    <p>No movies found in this category</p>
                </div>
            )}

            {/* Edit Modal */}
            <MovieEditModal
                movie={editingMovie}
                isOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                onUpdate={handleUpdateMovie}
            />
        </div>
    );
};

export default AdminMovies;
