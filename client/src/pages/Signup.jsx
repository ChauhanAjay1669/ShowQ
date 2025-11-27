import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../store/slices/authSlice';
import api from '../utils/api';
import { isValidEmail, validatePassword } from '../utils/helpers';
import { FiMail, FiLock, FiUser, FiAlertCircle } from 'react-icons/fi';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!isValidEmail(formData.email)) newErrors.email = 'Invalid email address';

        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) newErrors.password = passwordErrors[0];

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setLoading(true);
        try {
            const { data } = await api.post('/auth/register', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });
            dispatch(loginSuccess(data));
            navigate('/');
        } catch (err) {
            setErrors({ general: err.response?.data?.message || 'Registration failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full glass rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Join <span className="text-white"><span className="text-red-500">S</span>howQ</span>
                </h2>

                {errors.general && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center space-x-2 text-red-400">
                        <FiAlertCircle />
                        <span>{errors.general}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <div className="relative">
                            <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>

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
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
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
                                placeholder="Create a password"
                                required
                                autoComplete="new-password"
                            />
                        </div>
                        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Confirm Password</label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                placeholder="Confirm your password"
                                required
                                autocomplete="new-password"
                            />
                        </div>
                        {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center mt-6 text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary-400 hover:text-primary-300">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
