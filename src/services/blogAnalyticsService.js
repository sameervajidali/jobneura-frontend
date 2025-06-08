
import API from './axios';

// Blog Analytics Services
const blogAnalyticsService = {
  // Track page view
  track: (slug) => API.post(`/blog/${slug}/analytics`).then(r => r.data),

  // Get analytics (admin)
  list: (params = {}) => API.get('/blog/analytics', { params }).then(r => r.data),
};

export default blogAnalyticsService;
