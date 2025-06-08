
import API from './axios';

// Blog Category Services
const blogCategoryService = {
  list: () => API.get('/blog/categories').then(r => r.data),
  create: (data) => API.post('/blog/categories', data).then(r => r.data),
  update: (id, data) => API.put(`/blog/categories/${id}`, data).then(r => r.data),
  delete: (id) => API.delete(`/blog/categories/${id}`).then(r => r.data),
};

export default blogCategoryService;
