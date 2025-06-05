// src/services/axios.js
import axios from 'axios';

// Create an axios instance with baseURL and credentials to send HttpOnly cookies automatically
const API = axios.create({
  baseURL: '/api',           // Base URL for all requests; can be replaced with full URL in production
  withCredentials: true,     // Send cookies (HttpOnly tokens) with every request
});

// ——————————————————————————————————————————————————
// QUEUE & REFRESH CONTROLS
let isRefreshing = false;    // Flag to indicate if token refresh is in progress
let failedQueue = [];        // Queue to hold requests during refresh token call
let initialSessionLoad = true;  // Flag to prevent retry logic during initial load

/**
 * Process all queued requests after refresh token resolves or fails
 * @param {Error|null} error - If token refresh failed, reject queued requests with this error
 * @param {string|null} token - If refresh succeeded, resolve queued requests with the new token/user info
 */
const processQueue = (error, token = null) => {
  console.log('[axios] processQueue:', { error, queued: failedQueue.length });
  failedQueue.forEach(p => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token);
    }
  });
  failedQueue = []; // Clear queue after processing
};

// ——————————————————————————————————————————————————
// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  res => res,   // Return successful responses directly
  async err => {
    const orig = err.config;  // Original request config that caused error
    console.log('[axios] response error:', orig.url, err.response?.status);

    // Check for 401 Unauthorized responses
    const is401 = err.response?.status === 401;

    // Paths related to authentication which should NOT be retried by refresh logic
    const isAuthCall = ['/auth/login', '/auth/refresh-token', '/auth/me']
      .some(path => orig.url.includes(path));

    // Check localStorage flag to know if user previously had a session
    const hasSession = localStorage.getItem('hasSession') === 'true';

    // Retry logic applies only when:
    // - 401 error occurred,
    // - original request not already retried (_retry flag),
    // - request is NOT an auth call (to prevent infinite loops),
    // - initialSessionLoad flag is false (to skip retries during startup),
    // - user had a session previously (to avoid retry on fresh visits)
    if (is401 && !orig._retry && !isAuthCall && !initialSessionLoad && hasSession) {
      if (isRefreshing) {
        // If token refresh is already happening, queue this request and retry later
        console.log('[axios] queueing during refresh:', orig.url);
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          console.log('[axios] replaying queued:', orig.url);
          return API(orig);
        });
      }

      // Mark request as retrying
      orig._retry = true;
      isRefreshing = true;
      console.log('[axios] refreshing token…');

      try {
        // Call refresh token endpoint
        const { data } = await API.post('/auth/refresh-token');
        console.log('[axios] refresh-token success:', data);

        // Mark session as active in localStorage
        localStorage.setItem('hasSession', 'true');

        // Resolve all queued requests with new token info
        processQueue(null, data.user);

        // Retry the original request with refreshed token
        return API(orig);
      } catch (refreshErr) {
        // If refresh fails, reject queued requests and clear session
        console.error('[axios] refresh-token failed:', refreshErr);
        processQueue(refreshErr, null);
        localStorage.removeItem('hasSession');

        // Redirect to login page on refresh failure to force re-authentication
        window.location.href = '/login';

        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    // For all other errors, just reject the promise with the error
    return Promise.reject(err);
  }
);

// ——————————————————————————————————————————————————
// LISTEN FOR CUSTOM EVENT TO STOP initialSessionLoad FLAG
window.addEventListener('session-checked', () => {
  console.log('[axios] session-checked → disable initialSessionLoad');
  initialSessionLoad = false;
});

export default API;
