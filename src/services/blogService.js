
import API from './axios';

// Blog Post Services
const blogService = {
  // List all blog posts (with optional filters)
  list: (params = {}) => API.get('/blog', { params }).then(r => r.data),

  // Get single post by slug
  get: (slug) => API.get(`/blog/${slug}`).then(r => r.data),

  // Get my posts (authenticated)
  listMy: () => API.get('/blog/my-posts').then(r => r.data),

  // Create a new post
  create: (data) => API.post('/blog', data).then(r => r.data),

  // Update post by ID
  update: (id, data) => API.put(`/blog/${id}`, data).then(r => r.data),

  // Delete post by ID
  delete: (id) => API.delete(`/blog/${id}`).then(r => r.data),

  // Publish post
  publish: (id) => API.patch(`/blog/${id}/publish`).then(r => r.data),

  // Get post revisions
  getRevisions: (id) => API.get(`/blog/${id}/revisions`).then(r => r.data),
};

export default blogService;
