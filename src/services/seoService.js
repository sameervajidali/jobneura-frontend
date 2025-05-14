import API from './axios';

const seoService = {
  getAll: () => API.get('/seo/all').then(res => res.data),
  save: (data) => API.post('/seo', data),
  delete: (path) => API.delete(`/seo/${encodeURIComponent(path)}`)
};

export default seoService;
