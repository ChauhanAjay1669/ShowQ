import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import MovieCard from '../components/MovieCard';
import { SkeletonCard } from '../components/Loading';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { movies as dummyMovies, categories as dummyCategories } from '../assets/data/dummyData';

const BrowseMovies = () => {
    const [movies, setMovies] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();

    const searchQuery = searchParams.get('search') || '';
    const categoryFilter = searchParams.get('category') || '';
    const [searchInput, setSearchInput] = useState(searchQuery);

    useEffect(() => {
        fetchData();
    }, [searchQuery, categoryFilter]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchQuery) params.append('search', searchQuery);
            if (categoryFilter) params.append('category', categoryFilter);

            const [moviesRes, categoriesRes] = await Promise.all([
                api.get(`/movies?${params.toString()}`),
                api.get('/categories')
            ]);

            const fetchedMovies = moviesRes.data.movies || [];
            if (fetchedMovies.length > 0) {
                setMovies(fetchedMovies);
                setCategories(categoriesRes.data.categories || []);
            } else {
                throw new Error("No movies found from API");
            }

        } catch (error) {
            console.error('Error fetching data, using demo data:', error);
            // Filter dummy movies based on search and category
            let filteredMovies = dummyMovies.map(d => ({
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

            if (searchQuery) {
                const lowerQuery = searchQuery.toLowerCase();
                filteredMovies = filteredMovies.filter(m =>
                    m.title.toLowerCase().includes(lowerQuery) ||
                    m.description.toLowerCase().includes(lowerQuery)
                );
            }

            setMovies(filteredMovies);
            setCategories(dummyCategories.map(c => ({ _id: c.id, name: c.name })));
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchParams({ search: searchInput, category: categoryFilter });
    };

    const handleCategoryFilter = (category) => {
        setSearchParams({ search: searchQuery, category });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">Browse Movies</h1>

            {/* Search & Filter */}
            <div className="mb-8 space-y-4">
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search movies by title, cast, director..."
                        className="w-full pl-12 pr-4 py-4 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                </form>

                {/* Category Filter */}
                <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                    <FiFilter className="text-gray-400 flex-shrink-0" />
                    <button
                        onClick={() => handleCategoryFilter('')}
                        className={`px-4 py-2 rounded-lg transition flex-shrink-0 ${!categoryFilter
                            ? 'bg-primary-600'
                            : 'glass hover:bg-white/10'
                            }`}
                    >
                        All
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat._id}
                            onClick={() => handleCategoryFilter(cat._id)}
                            className={`px-4 py-2 rounded-lg transition flex-shrink-0 ${categoryFilter === cat._id
                                ? 'bg-primary-600'
                                : 'glass hover:bg-white/10'
                                }`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results */}
            <div className="mb-4 text-gray-400">
                {loading ? 'Loading...' : `${movies.length} movies found`}
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading
                    ? Array(10).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    : movies.map((movie) => <MovieCard key={movie._id} movie={movie} />)
                }
            </div>

            {!loading && movies.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No movies found. Try a different search.</p>
                </div>
            )}
        </div>
    );
};

export default BrowseMovies;
