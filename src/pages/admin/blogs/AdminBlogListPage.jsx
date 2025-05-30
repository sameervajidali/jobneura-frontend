import React, { useEffect, useState } from 'react';
import {
  fetchBlogs,
  fetchBlogCategories,
  updateBlogStatus,
  deleteBlog,
} from '../../../services/blogService'; // Ensure these exist in blogService.js

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

  const [selectedBlogs, setSelectedBlogs] = useState(new Set());

  const [categories, setCategories] = useState([]);

  // Load categories once on mount
  useEffect(() => {
    fetchBlogCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  // Load blogs on filters or pagination change
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

  // Bulk delete blogs (call deleteBlog one by one)
  async function handleBulkDelete() {
    if (selectedBlogs.size === 0) return;
    try {
      await Promise.all(Array.from(selectedBlogs).map(id => deleteBlog(id)));
      setSelectedBlogs(new Set());
      setPage(1); // Refresh list
    } catch {
      alert('Failed to delete selected blogs');
    }
  }

  // Bulk publish/unpublish blogs
  async function handleBulkPublish(publish = true) {
    if (selectedBlogs.size === 0) return;
    try {
      await Promise.all(
        Array.from(selectedBlogs).map(id =>
          updateBlogStatus(id, publish ? 'Published' : 'Draft')
        )
      );
      setSelectedBlogs(new Set());
      setPage(1); // Refresh list
    } catch {
      alert('Failed to update blog status');
    }
  }

  // Toggle select for single blog
  function toggleSelectBlog(id) {
    const newSet = new Set(selectedBlogs);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedBlogs(newSet);
  }

  // Toggle select all blogs on current page
  function toggleSelectAll() {
    if (selectedBlogs.size === blogs.length) {
      setSelectedBlogs(new Set());
    } else {
      setSelectedBlogs(new Set(blogs.map(b => b._id)));
    }
  }

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <BlogSearchInput value={searchTerm} onChange={setSearchTerm} />
        <BlogCategoryFilter
          categories={categories}
          value={categoryFilter}
          onChange={setCategoryFilter}
        />
        <BlogStatusFilter value={statusFilter} onChange={setStatusFilter} />
      </div>

      <BulkActionsToolbar
        selectedCount={selectedBlogs.size}
        onDelete={handleBulkDelete}
        onPublish={() => handleBulkPublish(true)}
        onUnpublish={() => handleBulkPublish(false)}
      />

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
                    onChange={toggleSelectAll}
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
                    toggleSelect={() => toggleSelectBlog(blog._id)}
                    onDeleted={() => setPage(1)} // refresh list on single delete
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
