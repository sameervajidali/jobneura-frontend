// src/services/axios.js
import axios from 'axios';

// ✅ Use Vercel proxy for same-origin requests (cookies will work)
const API = axios.create({
  baseURL: '/api',
  withCredentials: true, // ✅ Needed for sending HttpOnly cookies
});

let isRefreshing = false;
let failedQueue = [];
let initialSessionLoad = true;

/**
 * 🔁 Process queued requests after refresh succeeds or fails
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach(promise => {
    if (error) promise.reject(error);
    else promise.resolve(token);
  });
  failedQueue = [];
};

/**
 * 🛡️ Axios response interceptor for handling 401 errors securely
 */
API.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    const isUnauthorized = error.response?.status === 401;
    const isRetryable =
      !originalRequest._retry &&
      !["/auth/login", "/auth/refresh-token", "/auth/me"].some(path =>
        originalRequest.url.includes(path)
      );

    // 🧠 Skip refresh during initial session load
    if (isUnauthorized && isRetryable && !initialSessionLoad) {
      if (isRefreshing) {
        // 🕒 Queue requests during token refresh
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() =>
          new Promise(resolve => setTimeout(() => resolve(API(originalRequest)), 50))
        );
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await API.post('/auth/refresh-token');
        if (data?.user) {
          window.dispatchEvent(
            new CustomEvent('session-refresh', { detail: data.user })
          );
        }
        processQueue(null);
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        localStorage.removeItem('hasSession');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/**
 * 🔁 Allow AuthContext to tell Axios when it's okay to retry requests
 */
window.addEventListener('session-checked', () => {
  initialSessionLoad = false;
});

export default API;
