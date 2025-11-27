import { useState, useEffect } from 'react';
import api from '../../utils/api';
import Loading from '../../components/Loading';
import { FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const CategoryManagement = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const { data } = await api.get('/categories');
            setCategories(data.categories || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await api.put(`/categories/${editingId}`, formData);
            } else {
                await api.post('/categories', formData);
            }
            setFormData({ name: '', description: '' });
            setEditingId(null);
            setShowForm(false);
            fetchCategories();
        } catch (error) {
            console.error('Error saving category:', error);
            alert('Failed to save category');
        }
    };

    const handleEdit = (category) => {
        setFormData({ name: category.name, description: category.description || '' });
        setEditingId(category._id);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await api.delete(`/categories/${id}`);
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
            alert('Failed to delete category');
        }
    };

    if (loading) return <Loading />;

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">Category Management</h1>
                <button
                    onClick={() => { setShowForm(true); setFormData({ name: '', description: '' }); setEditingId(null); }}
                    className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition"
                >
                    <FiPlus />
                    <span>Add Category</span>
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmit} className="glass rounded-lg p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Category' : 'New Category'}</h2>
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Category Name"
                            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                            required
                        />
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            placeholder="Description"
                            rows="3"
                            className="w-full px-4 py-3 glass rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                        <div className="flex space-x-3">
                            <button type="submit" className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition">
                                {editingId ? 'Update' : 'Create'}
                            </button>
                            <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 glass hover:bg-white/10 rounded-lg transition">
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                    <div key={category._id} className="glass rounded-lg p-6">
                        <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
                        <p className="text-gray-400 mb-4">{category.description}</p>
                        <div className="flex space-x-2">
                            <button onClick={() => handleEdit(category)} className="p-2 hover:bg-blue-500/20 rounded text-blue-400">
                                <FiEdit />
                            </button>
                            <button onClick={() => handleDelete(category._id)} className="p-2 hover:bg-red-500/20 rounded text-red-400">
                                <FiTrash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryManagement;
