
import React, { useEffect, useState } from 'react';
import {
  fetchBlogs,
  fetchBlogCategories,
  updateBlogStatus,
  deleteBlog,
} from '../../../services/blogService';
import { useNavigate } from 'react-router-dom';
import BlogCategoryFilter from './components/BlogCategoryFilter';
import BlogStatusFilter from './components/BlogStatusFilter';
import BlogSearchInput from './components/BlogSearchInput';
import BlogPagination from './components/BlogPagination';
import BulkActionsToolbar from './components/BulkActionsToolbar';
import BlogTableRow from './components/BlogTableRow';

export default function AdminBlogListPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;
  const [totalBlogs, setTotalBlogs] = useState(0);
 const navigate = useNavigate();
  const [selectedBlogs, setSelectedBlogs] = useState(new Set());

  // This holds the list of categories for dropdown
  const [categories, setCategories] = useState([]);

  // Fetch categories on component mount for the dropdown
  useEffect(() => {
    fetchBlogCategories()
      .then((data) => {
        // Defensive: If response is an array or wrapped inside object
        if (Array.isArray(data)) setCategories(data);
        else if (Array.isArray(data.categories)) setCategories(data.categories);
        else setCategories([]);
      })
      .catch(() => setCategories([]));
  }, []);

  // Fetch blogs whenever filters or pagination change
  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      setError(null);
      try {
        const { blogs, total } = await fetchBlogs({
          page,
          limit,
          search: searchTerm,
          category: categoryFilter,  // Send category _id as filter
          status: statusFilter,
        });
        setBlogs(blogs);
        setTotalBlogs(total);
      } catch {
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, [page, limit, searchTerm, categoryFilter, statusFilter]);

  // ... your other handlers (bulk delete, bulk publish, select toggles)...

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <button
          onClick={() => window.location.href = '/admin/blogs/new'}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + New Blog
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <BlogSearchInput value={searchTerm} onChange={setSearchTerm} />
        <BlogCategoryFilter
          categories={categories} // <-- pass categories array here
          value={categoryFilter}   // currently selected category id
          onChange={setCategoryFilter}
        />
        <BlogStatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Bulk Actions, Errors, Loading, etc */}

      <table className="w-full border-collapse table-auto">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">
              <input
                type="checkbox"
                checked={selectedBlogs.size === blogs.length && blogs.length > 0}
                onChange={() => { /* toggle select all logic here */ }}
                aria-label="Select all blogs"
              />
            </th>
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Category</th>
            <th className="p-3">Status</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-6">
                No blogs found.
              </td>
            </tr>
          ) : (
            blogs.map(blog => (
              <BlogTableRow
                key={blog._id}
                blog={blog}
                isSelected={selectedBlogs.has(blog._id)}
                toggleSelect={() => {/* toggle logic here */}}
                onDeleted={() => setPage(1)} // refresh list on delete
                onEdit={() => navigate(`/admin/blogs/${blog._id}`)}  // pass navigate callback here
              />
            ))
          )}
        </tbody>
      </table>

      <BlogPagination
        total={totalBlogs}
        currentPage={page}
        pageSize={limit}
        onPageChange={setPage}
      />
    </div>
  );
}
