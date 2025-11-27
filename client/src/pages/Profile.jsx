import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../store/slices/authSlice';
import api from '../utils/api';
import { FiUser, FiMail, FiSave } from 'react-icons/fi';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const { data } = await api.put('/users/profile', formData);
            dispatch(updateUser(data.user));
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8">My Profile</h1>

            <div className="glass rounded-lg p-8">
                {message && (
                    <div className={`mb-6 p-4 rounded-lg ${message.includes('success')
                            ? 'bg-green-500/10 border border-green-500/50 text-green-400'
                            : 'bg-red-500/10 border border-red-500/50 text-red-400'
                        }`}>
                        {message}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                                required
                            />
                        </div>
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
                                required
                            />
                        </div>
                    </div>

                    {/* Role (readonly) */}
                    <div>
                        <label className="block text-sm font-medium mb-2">Role</label>
                        <input
                            type="text"
                            value={user?.role || 'user'}
                            className="w-full px-4 py-3 glass rounded-lg bg-white/5 cursor-not-allowed"
                            readOnly
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center space-x-2 w-full py-3 bg-primary-600 hover:bg-primary-700 rounded-lg font-semibold transition disabled:opacity-50"
                    >
                        <FiSave />
                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Profile;
