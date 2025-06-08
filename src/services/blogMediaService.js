
import API from './axios';

// Blog Media Services
const blogMediaService = {
  // Upload image/file (formData: {file, alt, caption})
  upload: (formData) =>
    API.post('/blog/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(r => r.data),

  // List my uploads
  listMy: () => API.get('/blog/media/my').then(r => r.data),

  // Delete media by ID
  delete: (id) => API.delete(`/blog/media/${id}`).then(r => r.data),
};

export default blogMediaService;
