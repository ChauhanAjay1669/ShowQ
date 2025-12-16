import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import MovieCard from '../components/MovieCard';
import TrendingTrailers from '../components/TrendingTrailers';
import UpcomingMovies from '../components/UpcomingMovies';
import Loading, { SkeletonCard } from '../components/Loading';
import { FiPlay, FiTrendingUp, FiClock, FiStar, FiArrowRight } from 'react-icons/fi';

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
                const featuredMovies = movies.filter(m => m.featured);
                setFeatured(featuredMovies.length > 0 ? featuredMovies.slice(0, 5) : movies.slice(0, 5));
                setTrending(movies.filter(m => m.trending).slice(0, 6));
                setLatest(movies.slice(0, 6));
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
        <div className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black">
            {/* Hero Section - Clean & Modern */}
            <section className="relative h-[850px] flex items-center justify-center overflow-hidden">
                {/* Background with subtle overlay */}
                <div className="absolute inset-0 bg-black/70 z-10"></div>

                {/* Auto-changing background images - use bannerUrl if available */}
                {featured.map((movie, index) => (
                    <img
                        key={movie._id}
                        src={movie.bannerUrl || movie.posterUrl || 'https://via.placeholder.com/1920x850/0a0a0a/ef4444?text=Featured+Movie'}
                        alt={movie.title}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === heroIndex ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}

                {/* Hero Content */}
                <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <div className="space-y-8 animate-fade-in">
                        {/* Main Heading */}
                        <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tight">
                            Welcome to <span className="text-red-500">S</span><span className="text-white">howQ</span>
                        </h1>

                        {/* Subtitle */}
                        <p className="text-2xl md:text-3xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
                            Buy, Stream, and Own Your Favorite Movies
                        </p>

                        {/* CTA Button */}
                        <div className="pt-4">
                            <Link
                                to="/movies"
                                className="inline-flex items-center space-x-3 px-12 py-5 bg-red-600 hover:bg-red-700 text-white text-xl font-bold rounded-full transition-all duration-300 transform hover:scale-105"
                            >
                                <FiPlay className="w-6 h-6" />
                                <span>Browse Movies</span>
                                <FiArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Hero Indicators */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex gap-3">
                    {featured.slice(0, 5).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setHeroIndex(index)}
                            className={`h-1 rounded-full transition-all duration-300 ${index === heroIndex
                                ? 'bg-red-500 w-12'
                                : 'bg-white/50 w-8 hover:bg-white/80'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Trending Movies Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center space-x-4">
                        <FiTrendingUp className="w-10 h-10 text-red-500" />
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Trending Now
                            </h2>
                            <p className="text-gray-400 mt-2">What everyone's watching</p>
                        </div>
                    </div>
                    <Link
                        to="/movies"
                        className="hidden md:flex items-center space-x-2 text-red-500 hover:text-red-400 font-semibold transition-colors group"
                    >
                        <span>View All</span>
                        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {loading
                        ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        : trending.slice(0, 6).map(movie => <MovieCard key={movie._id} movie={movie} />)
                    }
                </div>
            </section>

            {/* Latest Releases Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center space-x-4">
                        <FiClock className="w-10 h-10 text-red-500" />
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white">
                                Latest Releases
                            </h2>
                            <p className="text-gray-400 mt-2">Fresh from the cinema</p>
                        </div>
                    </div>
                    <Link
                        to="/movies"
                        className="hidden md:flex items-center space-x-2 text-red-500 hover:text-red-400 font-semibold transition-colors group"
                    >
                        <span>View All</span>
                        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    {loading
                        ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        : latest.slice(0, 6).map(movie => <MovieCard key={movie._id} movie={movie} />)
                    }
                </div>
            </section>

            {/* Upcoming Movies */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                {!loading && <UpcomingMovies />}
            </section>

            {/* CTA Section - Clean Design */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
                <div className="relative bg-gray-900 border border-gray-800 rounded-3xl p-16 text-center overflow-hidden">
                    {/* Decorative element */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl"></div>

                    <div className="relative z-10 space-y-6">
                        <FiStar className="w-16 h-16 text-red-500 mx-auto" />
                        <h2 className="text-5xl md:text-6xl font-black text-white">
                            Ready to Start Watching?
                        </h2>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                            Sign up now and get access to thousands of movies. Start your journey today.
                        </p>
                        <div className="pt-4">
                            <Link
                                to="/signup"
                                className="inline-flex items-center space-x-3 px-10 py-4 bg-red-600 hover:bg-red-700 text-white text-lg font-bold rounded-full transition-all duration-300 transform hover:scale-105"
                            >
                                <span>Get Started</span>
                                <FiArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Trailers Carousel */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
                {!loading && <TrendingTrailers movies={allMovies} />}
            </section>
        </div>
    );
};

export default Home;
