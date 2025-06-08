
import API from './axios';

// Blog Tag Services
const blogTagService = {
  list: () => API.get('/blog/tags').then(r => r.data),
  create: (data) => API.post('/blog/tags', data).then(r => r.data),
  update: (id, data) => API.put(`/blog/tags/${id}`, data).then(r => r.data),
  delete: (id) => API.delete(`/blog/tags/${id}`).then(r => r.data),
};

export default blogTagService;
