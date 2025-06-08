
import API from './axios';

// Blog Notification Services
const blogNotificationService = {
  list: () => API.get('/blog/notifications').then(r => r.data),
  markRead: (id) => API.patch(`/blog/notifications/${id}/read`).then(r => r.data),
};

export default blogNotificationService;
