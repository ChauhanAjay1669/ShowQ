import { Routes, Route } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import { FiGrid, FiFilm, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi';
import AdminDashboard from './AdminDashboard';
import AdminMovies from './AdminMovies';
import './AdminLayout.css';

const AdminLayout = () => {
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    const navItems = [
        { path: '/admin', icon: FiGrid, label: 'Dashboard' },
        { path: '/admin/movies', icon: FiFilm, label: 'Movies' },
        { path: '/admin/users', icon: FiUsers, label: 'Users' },
    ];

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <h2>ShowQ Admin</h2>
                    <p>{user.name}</p>
                </div>

                <nav className="admin-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path ||
                            (item.path !== '/admin' && location.pathname.startsWith(item.path));

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-item ${isActive ? 'active' : ''}`}
                            >
                                <Icon />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <button className="logout-btn" onClick={handleLogout}>
                    <FiLogOut />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/movies" element={<AdminMovies />} />
                    <Route path="/users" element={<div className="coming-soon">Users Management Coming Soon</div>} />
                </Routes>
            </main>
        </div>
    );
};

export default AdminLayout;
