import { useState, useEffect } from 'react';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { FiLock, FiUnlock } from 'react-icons/fi';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/admin/users');
            setUsers(data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleBlock = async (id) => {
        try {
            const { data } = await api.patch(`/admin/users/${id}/block`);
            setUsers(users.map(u => u._id === id ? data.user : u));
        } catch (error) {
            console.error('Error toggling user block:', error);
            alert('Failed to update user');
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <h1 className="text-4xl font-bold mb-8">User Management</h1>

            <div className="glass rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-white/5">
                        <tr>
                            <th className="text-left py-4 px-6">Name</th>
                            <th className="text-left py-4 px-6">Email</th>
                            <th className="text-left py-4 px-6">Role</th>
                            <th className="text-left py-4 px-6">Joined</th>
                            <th className="text-left py-4 px-6">Status</th>
                            <th className="text-left py-4 px-6">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="py-4 px-6 font-semibold">{user.name}</td>
                                <td className="py-4 px-6">{user.email}</td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm ${user.role === 'admin'
                                            ? 'bg-primary-500/20 text-primary-400'
                                            : 'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-400">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`px-3 py-1 rounded-full text-sm ${user.blocked
                                            ? 'bg-red-500/20 text-red-400'
                                            : 'bg-green-500/20 text-green-400'
                                        }`}>
                                        {user.blocked ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <button
                                        onClick={() => handleToggleBlock(user._id)}
                                        disabled={user.role === 'admin'}
                                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed ${user.blocked
                                                ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                                                : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                                            }`}
                                    >
                                        {user.blocked ? <FiUnlock /> : <FiLock />}
                                        <span>{user.blocked ? 'Unblock' : 'Block'}</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
