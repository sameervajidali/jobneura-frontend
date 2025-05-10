// import axios from 'axios'

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.jobneura.tech/api',
//   withCredentials: true,
// })

// let isRefreshing = false
// let queue = []

// function processQueue(err) {
//   queue.forEach(p => err ? p.reject(err) : p.resolve())
//   queue = []
// }

// API.interceptors.response.use(
//   response => response,
//   async (error) => {
//     const { config, response } = error
//     if (!response || response.status !== 401) return Promise.reject(error)

//       const noRetryPaths = ['/auth/me', '/auth/refresh-token', '/auth/login']

//     if (noRetryPaths.some(path => config.url.includes(path))) {
//       return Promise.reject(error)
//     }

//     if (config._retry) return Promise.reject(error)
//     config._retry = true

//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         queue.push({ resolve: () => resolve(API(config)), reject })
//       })
//     }

//     isRefreshing = true
//     return new Promise((resolve, reject) => {
//       API.post('/auth/refresh-token')
//         .then(() => {
//           isRefreshing = false
//           processQueue()
//           resolve(API(config))
//         })
//         .catch(err => {
//           isRefreshing = false
//           processQueue(err)
//           window.location.href = '/login'
//           reject(err)
//         })
//     })
//   }
// )

// export default API














// src/services/axios.js
import axios from 'axios';
import { logoutUser, getAccessToken, refreshAccessToken } from './auth'; // Auth utils you must implement

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://your-api.com/api',
  withCredentials: true, // needed for cookies if using httpOnly refresh tokens
});

// Request Interceptor: Add token
API.interceptors.request.use(config => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

// Response Interceptor: Handle 401, etc.
API.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;

    // Avoid infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken(); // Get new token and save it
        const newToken = getAccessToken();

        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return API(originalRequest); // Retry request with new token
        }
      } catch (refreshErr) {
        logoutUser(); // Force logout
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
