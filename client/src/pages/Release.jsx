import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCountdown from '../components/MovieCountdown';

const Release = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState({
        genre: '',
        language: '',
        search: ''
    });
    const [featuredMovie, setFeaturedMovie] = useState(null);

    const genres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Romance', 'Horror'];
    const languages = ['English', 'Hindi', 'Telugu', 'Tamil', 'Kannada', 'Malayalam'];

    useEffect(() => {
        fetchUpcomingMovies();
    }, [filter]);

    const fetchUpcomingMovies = async () => {
        try {
            setLoading(true);
            const params = {};
            if (filter.genre) params.genre = filter.genre;
            if (filter.language) params.language = filter.language;
            if (filter.search) params.search = filter.search;

            const response = await axios.get('http://localhost:5000/api/movies/upcoming', { params });
            setMovies(response.data.movies);
            if (response.data.movies.length > 0) {
                setFeaturedMovie(response.data.movies[0]);
            }
        } catch (error) {
            console.error('Error fetching upcoming movies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilter(prev => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilter({ genre: '', language: '', search: '' });
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-black">
            {/* Cinematic Hero Section with Featured Upcoming Movie */}
            {featuredMovie && (
                <div className="relative h-[70vh] overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0">
                        <img
                            src={featuredMovie.posterUrl}
                            alt={featuredMovie.title}
                            className="w-full h-full object-cover scale-110 blur-sm"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/70"></div>
                    </div>

                    {/* Content */}
                    <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-600/90 backdrop-blur-sm mb-4 animate-pulse">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                                <span className="text-white text-sm font-bold uppercase tracking-wider">Coming Soon</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black mb-6 text-white drop-shadow-2xl leading-tight">
                                {featuredMovie.title}
                            </h1>

                            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed line-clamp-3">
                                {featuredMovie.description}
                            </p>

                            <div className="flex flex-wrap items-center gap-6 mb-8">
                                {/* Countdown */}
                                <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20">
                                    <p className="text-sm text-gray-300 mb-2 uppercase tracking-wide">Releases In</p>
                                    <MovieCountdown releaseDate={featuredMovie.releaseDate} />
                                </div>

                                {/* Release Date */}
                                <div className="backdrop-blur-md bg-white/10 rounded-xl p-4 border border-white/20">
                                    <p className="text-sm text-gray-300 mb-2 uppercase tracking-wide">Release Date</p>
                                    <p className="text-white font-bold text-lg">{formatDate(featuredMovie.releaseDate)}</p>
                                </div>
                            </div>

                            {/* Genres */}
                            <div className="flex flex-wrap gap-2 mb-8">
                                {featuredMovie.genres.map((genre, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold rounded-full border border-white/30"
                                    >
                                        {genre}
                                    </span>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Link
                                to={`/movies/${featuredMovie._id}`}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-red-600/50"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Modern Section Title */}
            <div className="relative py-16 bg-gradient-to-b from-black to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
                            Upcoming <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">Releases</span>
                        </h2>
                        <p className="text-xl text-gray-400">Mark your calendars for these highly anticipated movies</p>
                    </div>

                    {/* Premium Filters Section */}
                    <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 md:p-8 mb-12 border border-white/10 shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="relative group">
                                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Search Movie</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Enter title..."
                                        value={filter.search}
                                        onChange={(e) => handleFilterChange('search', e.target.value)}
                                        className="w-full px-5 py-3.5 bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all duration-300"
                                    />
                                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>

                            {/* Genre Filter */}
                            <div className="relative group">
                                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Genre</label>
                                <select
                                    value={filter.genre}
                                    onChange={(e) => handleFilterChange('genre', e.target.value)}
                                    className="w-full px-5 py-3.5 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all duration-300 appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-gray-900">All Genres</option>
                                    {genres.map(genre => (
                                        <option key={genre} value={genre} className="bg-gray-900">{genre}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Language Filter */}
                            <div className="relative group">
                                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wider">Language</label>
                                <select
                                    value={filter.language}
                                    onChange={(e) => handleFilterChange('language', e.target.value)}
                                    className="w-full px-5 py-3.5 bg-white/10 border-2 border-white/20 rounded-xl text-white focus:outline-none focus:border-red-500 focus:bg-white/15 transition-all duration-300 appearance-none cursor-pointer"
                                >
                                    <option value="" className="bg-gray-900">All Languages</option>
                                    {languages.map(lang => (
                                        <option key={lang} value={lang} className="bg-gray-900">{lang}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Clear Button */}
                            <div className="flex items-end">
                                <button
                                    onClick={clearFilters}
                                    className="w-full px-5 py-3.5 bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 uppercase tracking-wider text-sm"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="mt-6 pt-6 border-t border-white/10">
                            <p className="text-gray-400 text-center">
                                <span className="text-white font-bold text-2xl">{movies.length}</span> {movies.length === 1 ? 'Movie' : 'Movies'} Found
                            </p>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex flex-col justify-center items-center h-64">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-red-500"></div>
                                <div className="animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-red-500/30"></div>
                            </div>
                            <p className="text-gray-400 mt-6 text-lg">Loading upcoming releases...</p>
                        </div>
                    )}

                    {/* No Movies */}
                    {!loading && movies.length === 0 && (
                        <div className="text-center py-20">
                            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-red-500/20 to-pink-500/20 mb-8">
                                <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                </svg>
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-4">No Upcoming Movies Found</h3>
                            <p className="text-gray-400 text-lg max-w-md mx-auto">Try adjusting your filters or check back later for new releases!</p>
                        </div>
                    )}

                    {/* Premium Movies Grid */}
                    {!loading && movies.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {movies.map((movie) => (
                                <Link
                                    key={movie._id}
                                    to={`/movies/${movie._id}`}
                                    className="group relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10 hover:border-red-500/50 transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-red-500/20"
                                >
                                    {/* Movie Poster */}
                                    <div className="relative aspect-[2/3] overflow-hidden bg-gray-900">
                                        <img
                                            src={movie.posterUrl}
                                            alt={movie.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />

                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>

                                        {/* Upcoming Badge */}
                                        <div className="absolute top-4 right-4">
                                            <div className="px-3 py-1.5 rounded-full bg-red-600 backdrop-blur-sm shadow-lg">
                                                <span className="text-white text-xs font-bold uppercase tracking-wide">Upcoming</span>
                                            </div>
                                        </div>

                                        {/* Rating Badge */}
                                        {movie.rating > 0 && (
                                            <div className="absolute top-4 left-4">
                                                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-yellow-500/90 backdrop-blur-sm shadow-lg">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-white text-sm font-bold">{movie.rating.toFixed(1)}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Hover Overlay with Description */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                            <p className="text-white text-sm leading-relaxed line-clamp-4">{movie.description}</p>
                                        </div>
                                    </div>

                                    {/* Movie Info Card */}
                                    <div className="p-5">
                                        {/* Title */}
                                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-1 group-hover:text-red-400 transition-colors">
                                            {movie.title}
                                        </h3>

                                        {/* Release Date */}
                                        <div className="flex items-center gap-2 text-gray-400 mb-4">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm font-medium">{formatDate(movie.releaseDate)}</span>
                                        </div>

                                        {/* Countdown Timer */}
                                        <div className="mb-4">
                                            <MovieCountdown releaseDate={movie.releaseDate} />
                                        </div>

                                        {/* Genres & Language */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex flex-wrap gap-1.5">
                                                {movie.genres.slice(0, 2).map((genre, index) => (
                                                    <span
                                                        key={index}
                                                        className="px-2.5 py-1 bg-white/10 text-gray-300 text-xs font-semibold rounded-lg border border-white/20"
                                                    >
                                                        {genre}
                                                    </span>
                                                ))}
                                                {movie.genres.length > 2 && (
                                                    <span className="px-2.5 py-1 bg-white/10 text-gray-300 text-xs font-semibold rounded-lg border border-white/20">
                                                        +{movie.genres.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Language */}
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="px-3 py-1 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-full font-medium">
                                                {movie.language}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Shine Effect on Hover */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-full group-hover:translate-x-[-200%] transition-transform duration-1000"></div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Release;
