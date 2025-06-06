import React, { useState, useEffect } from 'react';
import tutorialsService from '../../services/tutorialsService';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

function AdminTutorialsPage() {
  // ─── State ────────────────────────────────
  const [tutorials, setTutorials] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
    const [total, setTotal] = useState(0);
    

  // For add/edit modal
  const [editingTutorial, setEditingTutorial] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: '',
    content: '',
    status: 'Draft',
  });

  // Loading and error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ─── Load Tutorials & Categories ─────────────
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTutorials();
  }, [page, categoryFilter, statusFilter, search]);

  async function fetchCategories() {
    try {
      const cats = await tutorialsService.getTutorialCategories();
      setCategories(cats);
    } catch (e) {
      console.error('Failed to load categories', e);
    }
  }

  async function fetchTutorials() {
    setLoading(true);
    setError(null);
    try {
      // Assuming your API supports pagination & filters via query params
      const params = {
        page,
        limit,
        category: categoryFilter,
        status: statusFilter,
        search,
      };
      const data = await tutorialsService.getPublicTutorials(params);
      setTutorials(data.tutorials || data);
      setTotal(data.total || data.length);
    } catch (e) {
      setError('Failed to load tutorials');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  // ─── Handlers ──────────────────────────────
  function openNewTutorial() {
    setEditingTutorial(null);
    setForm({
      title: '',
      category: '',
      content: '',
      status: 'Draft',
    });
    setShowModal(true);
  }

  function openEditTutorial(tut) {
    setEditingTutorial(tut);
    setForm({
      title: tut.title,
      category: tut.category?._id || tut.category || '',
      content: tut.content || '',
      status: tut.status || 'Draft',
    });
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingTutorial(null);
  }

  async function saveTutorial() {
    setLoading(true);
    setError(null);
    try {
      if (editingTutorial) {
        await tutorialsService.updateTutorial(editingTutorial._id, form);
      } else {
        await tutorialsService.createTutorial(form);
      }
      fetchTutorials();
      closeModal();
    } catch (e) {
      setError('Failed to save tutorial');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function deleteTutorial(id) {
    if (!window.confirm('Are you sure you want to delete this tutorial?')) return;
    try {
      await tutorialsService.deleteTutorial(id);
      fetchTutorials();
    } catch (e) {
      alert('Delete failed');
      console.error(e);
    }
  }

  // ─── Pagination Helpers ─────────────────────
  const totalPages = Math.ceil(total / limit);
  function goToPage(p) {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  }

  // ─── JSX Render ─────────────────────────────
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Admin Tutorials</h1>

      {/* Filters & Search */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <input
          type="text"
          placeholder="Search tutorials..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-xs"
        />
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Statuses</option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
          <option value="Archived">Archived</option>
        </select>

        <button
          onClick={openNewTutorial}
          className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          title="Add New Tutorial"
        >
          <FaPlus /> Add Tutorial
        </button>
      </div>

      {/* Error */}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Tutorials Table */}
      {loading ? (
        <p>Loading tutorials...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Created At</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutorials.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">No tutorials found.</td>
              </tr>
            ) : (
              tutorials.map(tut => (
                <tr key={tut._id} className="hover:bg-gray-50">
                  <td className="border p-2">{tut.title}</td>
                  <td className="border p-2">{tut.category?.name || 'Uncategorized'}</td>
                  <td className="border p-2">{tut.status}</td>
                  <td className="border p-2">{new Date(tut.createdAt).toLocaleDateString()}</td>
                  <td className="border p-2 flex gap-2">
                    <button onClick={() => openEditTutorial(tut)} className="text-blue-600 hover:text-blue-800" title="Edit"><FaEdit /></button>
                    <button onClick={() => deleteTutorial(tut._id)} className="text-red-600 hover:text-red-800" title="Delete"><FaTrash /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button disabled={page <= 1} onClick={() => goToPage(page - 1)} className="px-3 py-1 border rounded disabled:opacity-50">&laquo;</button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${page === i + 1 ? 'bg-blue-600 text-white' : ''}`}
            >
              {i + 1}
            </button>
          ))}
          <button disabled={page >= totalPages} onClick={() => goToPage(page + 1)} className="px-3 py-1 border rounded disabled:opacity-50">&raquo;</button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded p-6 max-w-lg w-full relative shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{editingTutorial ? 'Edit Tutorial' : 'Add New Tutorial'}</h2>

            <label className="block mb-2">
              Title
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                className="border w-full px-3 py-2 rounded"
              />
            </label>

            <label className="block mb-2">
              Category
              <select
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="border w-full px-3 py-2 rounded"
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
            </label>

            <label className="block mb-2">
              Content (HTML)
              <textarea
                rows="6"
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                className="border w-full px-3 py-2 rounded"
              />
            </label>

            <label className="block mb-4">
              Status
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                className="border w-full px-3 py-2 rounded"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </label>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveTutorial}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTutorialsPage;
