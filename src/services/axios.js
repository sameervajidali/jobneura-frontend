import axios from 'axios';

// Create axios instance with baseURL and cookie sending enabled
const API = axios.create({
  baseURL: '/api',        // Adjust this if you use full URL in production
  withCredentials: true,  // Send HttpOnly cookies automatically
});

// ——————————————————————————————————————————————————
// Refresh token queue management
let isRefreshing = false; // Flag to indicate ongoing refresh
let failedQueue = [];     // Requests queued while refresh happens
let initialSessionLoad = true; // Flag to disable retry on startup

/**
 * Resolves or rejects all queued requests after refresh attempt
 * @param {Error|null} error - refresh error or null on success
 * @param {any} user - user info returned after refresh
 */
const processQueue = (error, user = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(user);
  });
  failedQueue = [];
};

// ——————————————————————————————————————————————————
// Response interceptor to handle 401 & refresh token logic
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Defensive check: config may be undefined if request never sent
    if (!originalRequest) return Promise.reject(error);

    const status = error.response?.status;
    const is401 = status === 401;

    // URLs which should NOT trigger token refresh retry
    const authPaths = ['/auth/login', '/auth/refresh-token', '/auth/me'];
    const isAuthRequest = authPaths.some(path => originalRequest.url.includes(path));

    // Check if user had a valid session before (to avoid retry on first load)
    const hasSession = localStorage.getItem('hasSession') === 'true';

    // Retry conditions:
    if (
      is401 &&                     // Unauthorized error
      !originalRequest._retry &&   // Not already retried
      !isAuthRequest &&            // Not auth related endpoint
      !initialSessionLoad &&       // Initial session load finished
      hasSession                   // User had a session before
    ) {
      if (isRefreshing) {
        // Queue the request until refresh completes
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          return API(originalRequest);
        });
      }

      // Mark the request for retry
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh token endpoint
        const { data } = await API.post('/auth/refresh-token');

        // Mark session as active again
        localStorage.setItem('hasSession', 'true');

        // Resolve queued requests
        processQueue(null, data.user);

        // Retry original request
        return API(originalRequest);
      } catch (refreshError) {
        // Reject queued requests on failure
        processQueue(refreshError, null);

        // Clear session flags and redirect to login
        localStorage.removeItem('hasSession');
        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // For other errors, reject immediately
    return Promise.reject(error);
  }
);

// Listen for a custom event to mark session check as done
window.addEventListener('session-checked', () => {
  initialSessionLoad = false;
});

export default API;
