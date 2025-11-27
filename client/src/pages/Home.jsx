import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import MovieCard from '../components/MovieCard';
import TrendingTrailers from '../components/TrendingTrailers';
import UpcomingMovies from '../components/UpcomingMovies';
import Loading, { SkeletonCard } from '../components/Loading';
import { FiPlay, FiTrendingUp, FiClock } from 'react-icons/fi';

import { movies as dummyMovies } from '../assets/data/dummyData';

const Home = () => {
    const [featured, setFeatured] = useState([]);
    const [trending, setTrending] = useState([]);
    const [latest, setLatest] = useState([]);
    const [allMovies, setAllMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [heroIndex, setHeroIndex] = useState(0);

    useEffect(() => {
        fetchMovies();
    }, []);

    // Auto-change hero background every 10 seconds
    useEffect(() => {
        if (featured.length > 0) {
            const interval = setInterval(() => {
                setHeroIndex((prev) => (prev + 1) % Math.min(featured.length, 5));
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [featured]);

    const fetchMovies = async () => {
        try {
            const { data } = await api.get('/movies?limit=20');
            const movies = data.movies || [];
            if (movies.length > 0) {
                setAllMovies(movies);
                setFeatured(movies.slice(0, 5)); // For hero carousel
                setTrending(movies.filter(m => m.trending).slice(0, 6)); // Only 6
                setLatest(movies.slice(0, 6)); // Only 6
            } else {
                throw new Error('No movies found');
            }
        } catch (error) {
            console.error('Error fetching movies, using demo data:', error);
            const mappedMovies = dummyMovies.map(d => ({
                _id: d.id,
                title: d.title,
                posterUrl: d.image,
                rating: d.rating,
                description: d.description,
                price: 299,
                offerPrice: 199,
                language: 'English',
                genres: [d.genre]
            }));
            setAllMovies(mappedMovies);
            setFeatured(mappedMovies.slice(0, 5));
            setTrending(mappedMovies.slice(0, 6));
            setLatest(mappedMovies.slice(0, 6));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section with Auto-Changing Background */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent z-10"></div>

                {/* Auto-changing background images */}
                {featured.map((movie, index) => (
                    <img
                        key={movie._id}
                        src={movie.posterUrl || 'https://via.placeholder.com/1920x600/1a1a1a/ef4444?text=Featured+Movie'}
                        alt={movie.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === heroIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                        Welcome to <span className=" ">ShowQ</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-slide-up">
                        Buy, Stream, and Own Your Favorite Movies
                    </p>
                    <Link
                        to="/movies"
                        className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 rounded-lg text-lg font-semibold transition transform hover:scale-105"
                    >
                        <FiPlay />
                        <span>Browse Movies</span>
                    </Link>
                </div>

                {/* Hero Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                    {featured.slice(0, 5).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setHeroIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === heroIndex
                                ? 'bg-primary-500 w-8'
                                : 'bg-white/50 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Trending Movies - Only 6 */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <FiTrendingUp className="w-8 h-8 text-primary-500" />
                        <h2 className="text-3xl font-bold">Trending Now</h2>
                    </div>
                    <Link to="/movies" className="text-primary-500 hover:text-primary-400">
                        View All →
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {loading
                        ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        : trending.slice(0, 6).map(movie => <MovieCard key={movie._id} movie={movie} />)
                    }
                </div>
            </section>

            {/* Latest Releases - Only 6 */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-2">
                        <FiClock className="w-8 h-8 text-primary-500" />
                        <h2 className="text-3xl font-bold">Latest Releases</h2>
                    </div>
                    <Link to="/movies" className="text-primary-500 hover:text-primary-400">
                        View All →
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {loading
                        ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        : latest.slice(0, 6).map(movie => <MovieCard key={movie._id} movie={movie} />)
                    }
                </div>
            </section>

            {/* Upcoming Movies */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {!loading && <UpcomingMovies />}
            </section>

            {/* CTA Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="glass rounded-2xl p-12 text-center">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Watching?</h2>
                    <p className="text-gray-400 text-lg mb-8">
                        Sign up now and get access to thousands of movies
                    </p>
                    <Link
                        to="/signup"
                        className="inline-block px-8 py-4 bg-primary-600 hover:bg-primary-700 rounded-lg text-lg font-semibold transition transform hover:scale-105"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* Trending Trailers Carousel - Above Footer */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {!loading && <TrendingTrailers movies={allMovies} />}
            </section>
        </div>
    );
};

export default Home;
