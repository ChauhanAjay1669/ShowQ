import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import api from '../utils/api';
import { FiMail, FiLock, FiAlertCircle } from 'react-icons/fi';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(loginStart());

        try {
            const { data } = await api.post('/auth/login', formData);
            dispatch(loginSuccess(data));
            navigate(data.user.role === 'admin' ? '/admin' : '/');
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed. Please try again.';
            setError(message);
            dispatch(loginFailure());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full glass rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Login to <span className="gradient-text">ShowQ</span>
                </h2>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center space-x-2 text-red-400">
                        <FiAlertCircle />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Enter your email"
                                required
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right">
                        <Link
                            to="/forgot-password"
                            className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary-400 hover:text-primary-300">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
