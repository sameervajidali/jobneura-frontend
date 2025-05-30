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

  // Categories for dropdown filter
  const [categories, setCategories] = useState([]);

  const transformedBlogs = blogs.map(blog => ({
  ...blog,
  authorName: blog.author?.name || 'Unknown',
  categoryName: blog.category?.name || 'N/A',
  categoryId: blog.category?._id?.toString() || '',  // for any future use
}));

  // Fetch categories once on mount
  useEffect(() => {
    fetchBlogCategories()
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
        else if (Array.isArray(data.categories)) setCategories(data.categories);
        else setCategories([]);
      })
      .catch(() => setCategories([]));
  }, []);

  // Fetch blogs on filter or page change
  useEffect(() => {
    async function loadBlogs() {
      setLoading(true);
      setError(null);
      try {
        const { blogs, total } = await fetchBlogs({
          page,
          limit,
          search: searchTerm,
          category: categoryFilter,
          status: statusFilter,
        });

        // Flatten authorName and categoryName from nested objects
        const transformedBlogs = blogs.map(blog => ({
          ...blog,
          authorName: blog.author?.name || 'Unknown',
          categoryName: blog.category?.name || 'N/A',
        }));

        setBlogs(transformedBlogs);
        setTotalBlogs(total);
      } catch {
        setError('Failed to load blogs');
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, [page, limit, searchTerm, categoryFilter, statusFilter]);

  // Bulk delete, publish etc. omitted for brevity

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <button
          onClick={() => navigate('/admin/blogs/new')}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          + New Blog
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <BlogSearchInput value={searchTerm} onChange={setSearchTerm} />
        <BlogCategoryFilter
          categories={categories}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
        <BlogStatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      {/* Bulk Actions Toolbar could go here */}

      {error && <p className="text-red-600 my-4">{error}</p>}

      {loading ? (
        <div className="text-center py-10">Loading blogs...</div>
      ) : (
        <>
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">
                  <input
                    type="checkbox"
                    checked={selectedBlogs.size === blogs.length && blogs.length > 0}
                    onChange={() => {/* Implement select all toggle logic */}}
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
                    toggleSelect={() => {/* Toggle selection logic */}}
                    onDeleted={() => setPage(1)} // refresh after delete
                    onEdit={() => navigate(`/admin/blogs/${blog._id}`)}
                    onPreview={() => navigate(`/admin/blogs/review/${blog._id}`)}
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
        </>
      )}
    </div>
  );
}
