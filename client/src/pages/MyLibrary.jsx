import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import Loading from '../components/Loading';
import { FiFilm, FiDownload } from 'react-icons/fi';

const MyLibrary = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLibrary();
    }, []);

    const fetchLibrary = async () => {
        try {
            const { data } = await api.get('/users/library');
            setMovies(data.purchasedMovies || []);
        } catch (error) {
            console.error('Error fetching library:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">My Library</h1>

            {movies.length === 0 ? (
                <div className="text-center py-12 glass rounded-lg">
                    <FiFilm className="w-24 h-24 text-gray-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold mb-2">Your library is empty</h2>
                    <p className="text-gray-400 mb-6">Purchase some movies to build your collection</p>
                    <Link
                        to="/movies"
                        className="inline-block px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition"
                    >
                        Browse Movies
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <div key={movie._id} className="glass rounded-lg overflow-hidden group">
                            <Link to={`/movies/${movie._id}`}>
                                <div className="aspect-[2/3] relative overflow-hidden">
                                    <img
                                        src={movie.posterUrl || 'https://via.placeholder.com/300x450/1a1a1a/ef4444?text=No+Image'}
                                        alt={movie.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg flex items-center space-x-2">
                                            <FiDownload />
                                            <span>Download</span>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                            <div className="p-4">
                                <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
                                <p className="text-sm text-gray-400">{movie.language}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyLibrary;
