
// src/services/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,    // send HttpOnly cookies
  
});

// ——————————————————————————————————————————————————
// QUEUE & REFRESH CONTROLS
let isRefreshing = false;
let failedQueue = [];
let initialSessionLoad = true;

/**
 * Resolve or reject all queued requests
 */
const processQueue = (error, token = null) => {
  console.log('[axios] processQueue:', { error, queued: failedQueue.length });
  failedQueue.forEach(p => {
    error ? p.reject(error) : p.resolve(token);
  });
  failedQueue = [];
};

// ——————————————————————————————————————————————————
// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  res => res,
  async err => {
    const orig = err.config;
    console.log('[axios] response error:', orig.url, err.response?.status);

    const is401 = err.response?.status === 401;
    const isAuthCall = ['/auth/login','/auth/refresh-token','/auth/me']
      .some(path => orig.url.includes(path));
    const hasSession = localStorage.getItem('hasSession') === 'true';

    // only retry-protected calls after we know there *was* a session
    if (is401 && !orig._retry && !isAuthCall && !initialSessionLoad && hasSession) {
      if (isRefreshing) {
        console.log('[axios] queueing during refresh:', orig.url);
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          console.log('[axios] replaying queued:', orig.url);
          return API(orig);
        });
      }

      orig._retry = true;
      isRefreshing = true;
      console.log('[axios] refreshing token…');

      try {
        const { data } = await API.post('/auth/refresh-token');
        console.log('[axios] refresh-token success:', data);
        localStorage.setItem('hasSession', 'true');
        processQueue(null, data.user);
        return API(orig);
      } catch (refreshErr) {
        console.error('[axios] refresh-token failed:', refreshErr);
        processQueue(refreshErr, null);
        localStorage.removeItem('hasSession');
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

// ——————————————————————————————————————————————————
// ALLOW BOOTSTRAP TO SIGNAL READY
window.addEventListener('session-checked', () => {
  console.log('[axios] session-checked → disable initialSessionLoad');
  initialSessionLoad = false;
});

export default API;
