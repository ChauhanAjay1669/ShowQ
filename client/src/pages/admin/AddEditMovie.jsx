import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import { FiSave, FiX } from 'react-icons/fi';

const AddEditMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEdit = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        posterUrl: '',
        videoUrl: '',
        genres: [],
        language: '',
        cast: [],
        director: '',
        price: '',
        offerPrice: '',
        releaseDate: '',
        status: 'published'
    });
    const [genreInput, setGenreInput] = useState('');
    const [castInput, setCastInput] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit) {
            fetchMovie();
        }
    }, [id]);

    const fetchMovie = async () => {
        try {
            const { data } = await api.get(`/movies/${id}`);
            const movie = data.movie;
            setFormData({
                ...movie,
                releaseDate: movie.releaseDate?.split('T')[0] || ''
            });
        } catch (error) {
            console.error('Error fetching movie:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddGenre = () => {
        if (genreInput.trim()) {
            setFormData({ ...formData, genres: [...formData.genres, genreInput.trim()] });
            setGenreInput('');
        }
    };

    const handleRemoveGenre = (index) => {
        setFormData({ ...formData, genres: formData.genres.filter((_, i) => i !== index) });
    };

    const handleAddCast = () => {
        if (castInput.trim()) {
            setFormData({ ...formData, cast: [...formData.cast, castInput.trim()] });
            setCastInput('');
        }
    };

    const handleRemoveCast = (index) => {
        setFormData({ ...formData, cast: formData.cast.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEdit) {
                await api.put(`/movies/${id}`, formData);
            } else {
                await api.post('/movies', formData);
            }
            navigate('/admin/movies');
        } catch (error) {
            console.error('Error saving movie:', error);
            alert('Failed to save movie');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">{isEdit ? 'Edit Movie' : 'Add New Movie'}</h1>

            <form onSubmit={handleSubmit} className="glass rounded-lg p-8 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Title *</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                    </div>

                    {/* Language */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Language *</label>
                        <input
                            type="text"
                            name="language"
                            value={formData.language}
                            onChange={handleChange}
                            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Price (₹) *</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                            min="0"
                        />
                    </div>

                    {/* Offer Price */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Offer Price (₹)</label>
                        <input
                            type="number"
                            name="offerPrice"
                            value={formData.offerPrice}
                            onChange={handleChange}
                            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            min="0"
                        />
                    </div>

                    {/* Release Date */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Release Date *</label>
                        <input
                            type="date"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Status *</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>

                {/* Full Width Fields */}
                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                    />
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Poster URL *</label>
                    <input
                        type="url"
                        name="posterUrl"
                        value={formData.posterUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        required
                    />
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Video URL</label>
                    <input
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Director</label>
                    <input
                        type="text"
                        name="director"
                        value={formData.director}
                        onChange={handleChange}
                        className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                {/* Genres */}
                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Genres</label>
                    <div className="flex space-x-2 mb-2">
                        <input
                            type="text"
                            value={genreInput}
                            onChange={(e) => setGenreInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddGenre())}
                            placeholder="Add genre"
                            className="flex-1 px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <button type="button" onClick={handleAddGenre} className="px-4 py-3 bg-primary-600 rounded-lg">
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.genres.map((genre, idx) => (
                            <span key={idx} className="flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full">
                                <span>{genre}</span>
                                <button type="button" onClick={() => handleRemoveGenre(idx)}>
                                    <FiX className="w-4 h-4" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Cast */}
                <div className="mt-6">
                    <label className="block text-sm font-medium mb-2">Cast</label>
                    <div className="flex space-x-2 mb-2">
                        <input
                            type="text"
                            value={castInput}
                            onChange={(e) => setCastInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCast())}
                            placeholder="Add cast member"
                            className="flex-1 px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <button type="button" onClick={handleAddCast} className="px-4 py-3 bg-primary-600 rounded-lg">
                            Add
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {formData.cast.map((actor, idx) => (
                            <span key={idx} className="flex items-center space-x-2 px-3 py-1 bg-white/10 rounded-full">
                                <span>{actor}</span>
                                <button type="button" onClick={() => handleRemoveCast(idx)}>
                                    <FiX className="w-4 h-4" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Submit */}
                <div className="mt-8 flex items-center space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition disabled:opacity-50"
                    >
                        <FiSave />
                        <span>{loading ? 'Saving...' : (isEdit ? 'Update Movie' : 'Create Movie')}</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/movies')}
                        className="px-6 py-3 glass hover:bg-white/10 rounded-lg transition"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddEditMovie;
