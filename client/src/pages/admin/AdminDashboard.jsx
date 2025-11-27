import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { FiFilm, FiTrendingUp, FiCalendar, FiUsers, FiDollarSign } from 'react-icons/fi';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalMovies: 0,
        trendingMovies: 0,
        upcomingMovies: 0,
        publishedMovies: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const { data } = await api.get('/admin/movies');
            const movies = data.movies || [];

            setStats({
                totalMovies: movies.length,
                trendingMovies: movies.filter(m => m.trending && m.status === 'published').length,
                upcomingMovies: movies.filter(m => m.status === 'upcoming').length,
                publishedMovies: movies.filter(m => m.status === 'published').length
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Movies',
            value: stats.totalMovies,
            icon: FiFilm,
            color: '#667eea',
            link: '/admin/movies'
        },
        {
            title: 'Published',
            value: stats.publishedMovies,
            icon: FiFilm,
            color: '#4caf50',
            link: '/admin/movies'
        },
        {
            title: 'Trending (Homepage)',
            value: stats.trendingMovies,
            icon: FiTrendingUp,
            color: '#f093fb',
            link: '/admin/movies'
        },
        {
            title: 'Upcoming',
            value: stats.upcomingMovies,
            icon: FiCalendar,
            color: '#2196f3',
            link: '/admin/movies'
        }
    ];

    if (loading) {
        return <div className="dashboard-loading">Loading dashboard...</div>;
    }

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <div>
                    <h1>Dashboard</h1>
                    <p>Welcome back! Here's what's happening today.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Link to={stat.link} key={index} className="stat-card">
                            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                                <Icon size={28} />
                            </div>
                            <div className="stat-content">
                                <p className="stat-title">{stat.title}</p>
                                <h2 className="stat-value">{stat.value}</h2>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="quick-actions">
                <h3>Quick Actions</h3>
                <div className="actions-grid">
                    <Link to="/admin/movies" className="action-card">
                        <FiFilm size={24} />
                        <span>Manage Movies</span>
                    </Link>
                    <Link to="/admin/movies" className="action-card">
                        <FiTrendingUp size={24} />
                        <span>Set Trending</span>
                    </Link>
                    <Link to="/admin/movies" className="action-card">
                        <FiCalendar size={24} />
                        <span>Add Upcoming</span>
                    </Link>
                </div>
            </div>

            {/* Homepage Preview */}
            <div className="homepage-status">
                <h3>🏠 Homepage Status</h3>
                <div className="status-content">
                    <div className="status-item">
                        <strong>Trending Trailers:</strong>
                        <span className={stats.trendingMovies >= 3 ? 'status-good' : 'status-warning'}>
                            {stats.trendingMovies}/5 slots filled
                        </span>
                    </div>
                    {stats.trendingMovies < 3 && (
                        <p className="status-hint">
                            💡 Add more trending movies to fill the homepage carousel
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
