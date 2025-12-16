import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import api from '../utils/api';
import './MovieEditModal.css';

const MovieEditModal = ({ movie, isOpen, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        posterUrl: '',
        bannerUrl: '',
        videoUrl: '',
        genres: '',
        language: '',
        cast: '',
        director: '',
        price: '',
        offerPrice: '',
        releaseDate: '',
        duration: '',
        status: 'published',
        featured: false,
        trending: false
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (movie) {
            // Edit mode - populate with existing movie data
            setFormData({
                title: movie.title || '',
                description: movie.description || '',
                posterUrl: movie.posterUrl || '',
                bannerUrl: movie.bannerUrl || '',
                videoUrl: movie.videoUrl || '',
                genres: Array.isArray(movie.genres) ? movie.genres.join(', ') : '',
                language: movie.language || '',
                cast: Array.isArray(movie.cast) ? movie.cast.join(', ') : '',
                director: movie.director || '',
                price: movie.price || '',
                offerPrice: movie.offerPrice || '',
                releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : '',
                duration: movie.duration || '',
                status: movie.status || 'published',
                featured: movie.featured || false,
                trending: movie.trending || false
            });
        } else {
            // Create mode - reset to default values
            setFormData({
                title: '',
                description: '',
                posterUrl: '',
                bannerUrl: '',
                videoUrl: '',
                genres: '',
                language: '',
                cast: '',
                director: '',
                price: '',
                offerPrice: '',
                releaseDate: '',
                duration: '',
                status: 'published',
                featured: false,
                trending: false
            });
        }
    }, [movie, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const updateData = {
                ...formData,
                genres: formData.genres.split(',').map(g => g.trim()).filter(g => g),
                cast: formData.cast.split(',').map(c => c.trim()).filter(c => c),
                price: Number(formData.price),
                offerPrice: Number(formData.offerPrice) || 0,
                duration: Number(formData.duration) || 0
            };

            let data;
            if (movie) {
                // Edit existing movie
                const response = await api.put(`/admin/movies/${movie._id}`, updateData);
                data = response.data;
            } else {
                // Create new movie
                const response = await api.post('/admin/movies', updateData);
                data = response.data;
            }

            if (data.success) {
                onUpdate(data.movie);
                onClose();
            }
        } catch (error) {
            console.error('Error saving movie:', error);
            alert(error.response?.data?.message || 'Failed to save movie');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{movie ? 'Edit Movie' : 'Add New Movie'}</h2>
                    <button className="modal-close" onClick={onClose}>
                        <FiX size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="movie-form">
                    <div className="form-grid">
                        {/* Basic Info */}
                        <div className="form-group full-width">
                            <label>Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Description *</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>

                        {/* URLs */}
                        <div className="form-group full-width">
                            <label>Poster URL *</label>
                            <input
                                type="url"
                                name="posterUrl"
                                value={formData.posterUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                                required
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Banner URL (Hero Section)</label>
                            <input
                                type="url"
                                name="bannerUrl"
                                value={formData.bannerUrl}
                                onChange={handleChange}
                                placeholder="https://... (Optional wide banner for homepage hero)"
                            />
                            <small style={{ color: '#888', display: 'block', marginTop: '4px' }}>
                                Recommended: 1920x850px for best display. Leave empty to use poster image.
                            </small>
                        </div>

                        <div className="form-group full-width">
                            <label>Trailer URL (YouTube Embed)</label>
                            <input
                                type="url"
                                name="videoUrl"
                                value={formData.videoUrl}
                                onChange={handleChange}
                                placeholder="https://www.youtube.com/embed/..."
                            />
                        </div>

                        {/* Details */}
                        <div className="form-group">
                            <label>Language *</label>
                            <input
                                type="text"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Director</label>
                            <input
                                type="text"
                                name="director"
                                value={formData.director}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Genres (comma-separated)</label>
                            <input
                                type="text"
                                name="genres"
                                value={formData.genres}
                                onChange={handleChange}
                                placeholder="Action, Thriller, Sci-Fi"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Cast (comma-separated)</label>
                            <input
                                type="text"
                                name="cast"
                                value={formData.cast}
                                onChange={handleChange}
                                placeholder="Actor 1, Actor 2, Actor 3"
                            />
                        </div>

                        {/* Pricing */}
                        <div className="form-group">
                            <label>Price *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Offer Price</label>
                            <input
                                type="number"
                                name="offerPrice"
                                value={formData.offerPrice}
                                onChange={handleChange}
                                min="0"
                            />
                        </div>

                        {/* Date & Duration */}
                        <div className="form-group">
                            <label>Release Date *</label>
                            <input
                                type="date"
                                name="releaseDate"
                                value={formData.releaseDate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Duration (minutes)</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                min="0"
                                placeholder="150"
                            />
                        </div>

                        {/* Status */}
                        <div className="form-group">
                            <label>Status *</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="published">Published</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="draft">Draft</option>
                            </select>
                        </div>

                        {/* Toggles */}
                        <div className="form-group full-width">
                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="trending"
                                        checked={formData.trending}
                                        onChange={handleChange}
                                    />
                                    <span>Show in Trending (Homepage)</span>
                                </label>

                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                    />
                                    <span>Mark as Featured</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : (movie ? 'Save Changes' : 'Create Movie')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MovieEditModal;
