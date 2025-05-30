// src/services/blogService.js
import API from './axios'; // Axios instance with baseURL set to your backend API

// ──────────────────────────────────────────────
// 📄 Fetch paginated blog list with filters
// GET /api/blogs?params
export function fetchBlogs(params = {}) {
  return API.get('/blogs', { params }).then(res => res.data);
}

// ──────────────────────────────────────────────
// 📄 Fetch single blog by ID
// GET /api/blogs/:blogId
export function getBlogById(blogId) {
  return API.get(`/blogs/${blogId}`).then(res => res.data);
}

// ──────────────────────────────────────────────
// ✍️ Create new blog (admin only)
// POST /api/blogs
export function createBlog(data) {
  return API.post('/blogs', data).then(res => res.data);
}

// ──────────────────────────────────────────────
// ✍️ Update existing blog by ID (admin only)
// PATCH /api/blogs/:blogId
export function updateBlog(blogId, data) {
  return API.patch(`/blogs/${blogId}`, data).then(res => res.data);
}

// ──────────────────────────────────────────────
// 🗑️ Soft delete blog by ID (admin only)
// DELETE /api/blogs/:blogId
export function deleteBlog(blogId) {
  return API.delete(`/blogs/${blogId}`).then(res => res.data);
}

// ──────────────────────────────────────────────
// 📂 Fetch categories filtered for blogs
// GET /api/categories?type=blog (adjust endpoint as per backend)
export function fetchBlogCategories() {
  // Assuming your backend supports filter by type on this route
  return API.get('/categories', { params: { type: 'blog' } }).then(res => res.data);
}

// ──────────────────────────────────────────────
// Optional: publish or unpublish blog by updating status
export function publishBlog(blogId) {
  return updateBlog(blogId, { status: 'Published' });
}

export function unpublishBlog(blogId) {
  return updateBlog(blogId, { status: 'Draft' });
}

// ──────────────────────────────────────────────
// Export all as default for easy import
const blogService = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  fetchBlogCategories,
  publishBlog,
  unpublishBlog,
};

export default blogService;
