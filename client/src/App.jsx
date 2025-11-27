import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// User Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BrowseMovies from './pages/BrowseMovies';
import MovieDetails from './pages/MovieDetails';
import BookingPage from './pages/BookingPage';
import SeatSelection from './pages/SeatSelection';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyLibrary from './pages/MyLibrary';
import Profile from './pages/Profile';
import OrderHistory from './pages/OrderHistory';
import Wishlist from './pages/Wishlist';
import Release from './pages/Release';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ForgotPassword from './pages/ForgotPassword';

// Admin Pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import MovieManagement from './pages/admin/MovieManagement';
import AddEditMovie from './pages/admin/AddEditMovie';
import UserManagement from './pages/admin/UserManagement';
import OrderManagement from './pages/admin/OrderManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import ReviewManagement from './pages/admin/ReviewManagement';

function App() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/movies" element={<BrowseMovies />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/release" element={<Release />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/booking/:id" element={<BookingPage />} />
                    <Route path="/booking/:id/seats" element={<SeatSelection />} />

                    {/* Protected User Routes */}
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/my-library" element={<ProtectedRoute><MyLibrary /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/order-history" element={<ProtectedRoute><OrderHistory /></ProtectedRoute>} />
                    <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />

                    {/* Admin Routes */}
                    <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="movies" element={<MovieManagement />} />
                        <Route path="movies/add" element={<AddEditMovie />} />
                        <Route path="movies/edit/:id" element={<AddEditMovie />} />
                        <Route path="users" element={<UserManagement />} />
                        <Route path="orders" element={<OrderManagement />} />
                        <Route path="categories" element={<CategoryManagement />} />
                        <Route path="reviews" element={<ReviewManagement />} />
                    </Route>
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
