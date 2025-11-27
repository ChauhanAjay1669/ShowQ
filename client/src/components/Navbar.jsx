import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { FiShoppingCart, FiUser, FiLogOut, FiHeart, FiHome, FiFilm } from 'react-icons/fi';
import { MdAdminPanelSettings } from 'react-icons/md';

const Navbar = () => {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { items } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2">
                        <img src="/src/assets/images/logo.svg" alt="Logo" className="w-36 h-36" />
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="flex items-center space-x-1 hover:text-primary-400 transition">
                            <FiHome className="w-5 h-5" />
                            <span>Home</span>
                        </Link>
                        <Link to="/movies" className="flex items-center space-x-1 hover:text-primary-400 transition">
                            <FiFilm className="w-5 h-5" />
                            <span>Browse Movies</span>
                        </Link>
                    </div>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4">
                        {isAuthenticated ? (
                            <>
                                <Link to="/wishlist" className="relative hover:text-primary-400 transition">
                                    <FiHeart className="w-6 h-6" />
                                </Link>
                                <Link to="/cart" className="relative hover:text-primary-400 transition">
                                    <FiShoppingCart className="w-6 h-6" />
                                    {items.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {items.length}
                                        </span>
                                    )}
                                </Link>
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 hover:text-primary-400 transition">
                                        <FiUser className="w-6 h-6" />
                                        <span className="hidden md:inline">{user?.name}</span>
                                    </button>
                                    <div className="absolute right-0 mt-2 w-48 glass rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                        <Link to="/profile" className="block px-4 py-2 hover:bg-white/10 rounded-t-lg">
                                            Profile
                                        </Link>
                                        <Link to="/my-library" className="block px-4 py-2 hover:bg-white/10">
                                            My Library
                                        </Link>
                                        <Link to="/order-history" className="block px-4 py-2 hover:bg-white/10">
                                            Order History
                                        </Link>
                                        {user?.role === 'admin' && (
                                            <Link to="/admin" className="flex items-center space-x-2 px-4 py-2 hover:bg-white/10 text-primary-400">
                                                <MdAdminPanelSettings className="w-5 h-5" />
                                                <span>Admin Panel</span>
                                            </Link>
                                        )}
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-white/10 rounded-b-lg text-red-400"
                                        >
                                            <FiLogOut className="w-5 h-5" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-4 py-2 hover:text-primary-400 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
