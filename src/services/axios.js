
// import axios from 'axios';

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL
//     ? import.meta.env.VITE_API_BASE_URL
//     : import.meta.env.DEV
//     ? 'http://localhost:5000/api'
//     : 'https://api.jobneura.tech/api',
//   withCredentials: true,
// });

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
//   failedQueue = [];
// };

// API.interceptors.response.use(
//   res => res,
//   async err => {
//     const originalRequest = err.config;

//     const isUnauthorized = err.response?.status === 401;
//     const isRetryable = !originalRequest._retry &&
//       !["/auth/login", "/auth/refresh-token", "/auth/me"].some(path =>
//         originalRequest.url.includes(path)
//       );

//     if (isUnauthorized && isRetryable) {
//       if (isRefreshing) {
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() => API(originalRequest));
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const { data } = await API.post('/auth/refresh-token');

//         // Notify AuthContext to update user
//         if (data?.user) {
//           window.dispatchEvent(new CustomEvent("session-refresh", { detail: data.user }));
//         }

//         processQueue(null);
//         return API(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError);
//         window.localStorage.removeItem("hasSession");
//         window.location.href = "/login";
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(err);
//   }
// );

// export default API;



import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.DEV
    ? 'http://localhost:5000/api'
    : 'https://api.jobneura.tech/api',
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue = [];
let initialSessionLoad = true; // 🆕 Flag

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

API.interceptors.response.use(
  res => res,
  async err => {
    const originalRequest = err.config;

    const isUnauthorized = err.response?.status === 401;
    const isRetryable =
      !originalRequest._retry &&
      !["/auth/login", "/auth/refresh-token", "/auth/me"].some(path =>
        originalRequest.url.includes(path)
      );

    // 🚫 Don't refresh during initial session load
    if (isUnauthorized && isRetryable && !initialSessionLoad) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => API(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await API.post('/auth/refresh-token');
        if (data?.user) {
          window.dispatchEvent(new CustomEvent('session-refresh', { detail: data.user }));
        }
        processQueue(null);
        return API(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr);
        window.localStorage.removeItem('hasSession');
        window.location.href = '/login';
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

// 🔁 Allow AuthContext to update the flag once session check completes
window.addEventListener('session-checked', () => {
  initialSessionLoad = false;
});

export default API;
