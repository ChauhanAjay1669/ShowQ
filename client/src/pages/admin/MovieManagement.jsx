import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { formatCurrency } from '../../utils/helpers';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const MovieManagement = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const { data } = await api.get('/movies?limit=100');
            setMovies(data.movies || []);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this movie?')) return;

        try {
            await api.delete(`/movies/${id}`);
            setMovies(movies.filter(m => m._id !== id));
        } catch (error) {
            console.error('Error deleting movie:', error);
            alert('Failed to delete movie');
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">Movie Management</h1>
                <Link
                    to="/admin/movies/add"
                    className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition"
                >
                    <FiPlus />
                    <span>Add Movie</span>
                </Link>
            </div>

            <div className="glass rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="text-left py-4 px-6">Poster</th>
                            <th className="text-left py-4 px-6">Title</th>
                            <th className="text-left py-4 px-6">Price</th>
                            <th className="text-left py-4 px-6">Rating</th>
                            <th className="text-left py-4 px-6">Status</th>
                            <th className="text-left py-4 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movies.map((movie) => (
                            <tr key={movie._id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="py-4 px-6">
                                    <img
                                        src={movie.posterUrl || 'https://via.placeholder.com/60x90/1a1a1a/ef4444?text=No+Image'}
                                        alt={movie.title}
                                        className="w-12 h-18 object-cover rounded"
                                    />
                                </td>
                                <td className="py-4 px-6 font-semibold">{movie.title}</td>
                                <td className="py-4 px-6">{formatCurrency(movie.offerPrice || movie.price)}</td>
                                <td className="py-4 px-6">{movie.rating?.toFixed(1) || 'N/A'} ⭐</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm ${movie.status === 'published'
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {movie.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <div className="flex items-center space-x-2">
                                        <Link
                                            to={`/admin/movies/edit/${movie._id}`}
                                            className="p-2 hover:bg-blue-500/20 rounded text-blue-400"
                                        >
                                            <FiEdit />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(movie._id)}
                                            className="p-2 hover:bg-red-500/20 rounded text-red-400"
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
        </div>
    );
};

export default MovieManagement;
