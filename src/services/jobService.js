import API from './axios';

const jobService = {
  getAll: () => API.get('/jobs/public').then(res => res.data.jobs),
  create: (data) => API.post('/jobs', data),
  update: (id, data) => API.put(`/jobs/${id}`, data),
  remove: (id) => API.delete(`/jobs/${id}`),
  bulkUpload: (formData) => API.post('/jobs/admin/bulk-upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

export default jobService;
