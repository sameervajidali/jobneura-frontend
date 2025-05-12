// import axios from 'axios'

// const API = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.jobneura.tech/api',
//   withCredentials: true,
// })

// let isRefreshing = false
// let queue = []

// function processQueue(err) {
//   queue.forEach(p => (err ? p.reject(err) : p.resolve()))
//   queue = []
// }

// API.interceptors.response.use(
//   response => response,
//   async error => {
//     const { config, response } = error

//     // Skip if no response or not 401
//     if (!response || response.status !== 401) {
//       return Promise.reject(error)
//     }

//     const noRetryPaths = ['/auth/me', '/auth/refresh-token', '/auth/login']
//     if (noRetryPaths.some(path => config.url.includes(path))) {
//       return Promise.reject(error)
//     }

//     // Prevent multiple retries
//     if (config._retry) return Promise.reject(error)
//     config._retry = true

//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         queue.push({ resolve: () => resolve(API(config)), reject })
//       })
//     }

//     isRefreshing = true

//     try {
//       await API.post('/auth/refresh-token')
//       isRefreshing = false
//       processQueue()
//       return API(config)
//     } catch (err) {
//       isRefreshing = false
//       processQueue(err)

//       // Optional: Clear stale tokens from localStorage or cookies here

//       window.location.href = '/login' // force logout
//       return Promise.reject(err)
//     }
//   }
// )

// export default API




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
    const isRetryable = !originalRequest._retry &&
      !["/auth/login", "/auth/refresh-token", "/auth/me"].some(path =>
        originalRequest.url.includes(path)
      );

    if (isUnauthorized && isRetryable) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => API(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await API.post('/auth/refresh-token');

        // Notify AuthContext to update user
        if (data?.user) {
          window.dispatchEvent(new CustomEvent("session-refresh", { detail: data.user }));
        }

        processQueue(null);
        return API(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        window.localStorage.removeItem("hasSession");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default API;
