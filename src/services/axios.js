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
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.jobneura.tech/api',
  withCredentials: true,
});

let isRefreshing = false;
let queue = [];

function processQueue(err) {
  queue.forEach(p => (err ? p.reject(err) : p.resolve()));
  queue = [];
}

API.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error;

    // Skip if not 401 or no response
    if (!response || response.status !== 401) {
      return Promise.reject(error);
    }

    // Skip if already retried
    if (config._retry) return Promise.reject(error);
    config._retry = true;

    // Don't retry refresh-token itself
    if (config.url.includes('/auth/refresh-token')) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve: () => resolve(API(config)), reject });
      });
    }

    isRefreshing = true;

    try {
      await API.post('/auth/refresh-token');
      isRefreshing = false;
      processQueue();
      return API(config);
    } catch (err) {
      isRefreshing = false;
      processQueue(err);
      // Optional: cleanup
      window.location.href = '/login';
      return Promise.reject(err);
    }
  }
);

export default API;
