
import API from './axios';

// Blog Comment Services
const blogCommentService = {
  // List comments for post
  list: (postId) => API.get(`/blog/${postId}/comments`).then(r => r.data),

  // Add comment to post
  add: (postId, data) =>
    API.post(`/blog/${postId}/comments`, data).then(r => r.data),

  // Reply to comment
  reply: (parentId, data) =>
    API.post(`/blog/comments/${parentId}/reply`, data).then(r => r.data),

  // Update comment
  update: (id, data) =>
    API.put(`/blog/comments/${id}`, data).then(r => r.data),

  // Delete comment
  delete: (id) => API.delete(`/blog/comments/${id}`).then(r => r.data),
};

export default blogCommentService;
