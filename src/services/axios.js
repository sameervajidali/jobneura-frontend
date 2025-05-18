// // src/services/axios.js
// import axios from 'axios';

// // ✅ Use Vercel proxy for same-origin requests (cookies will work)
// const API = axios.create({
//   baseURL: '/api',
//   withCredentials: true, // ✅ Needed for sending HttpOnly cookies
// });

// let isRefreshing = false;
// let failedQueue = [];
// let initialSessionLoad = true;

// /**
//  * 🔁 Process queued requests after refresh succeeds or fails
//  */
// const processQueue = (error, token = null) => {
//   failedQueue.forEach(promise => {
//     if (error) promise.reject(error);
//     else promise.resolve(token);
//   });
//   failedQueue = [];
// };

// /**
//  * 🛡️ Axios response interceptor for handling 401 errors securely
//  */
// API.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;

//     const isUnauthorized = error.response?.status === 401;
//     const isRetryable =
//       !originalRequest._retry &&
//       !["/auth/login", "/auth/refresh-token", "/auth/me"].some(path =>
//         originalRequest.url.includes(path)
//       );

//     // 🧠 Skip refresh during initial session load
//     if (isUnauthorized && isRetryable && !initialSessionLoad) {
//       if (isRefreshing) {
//         // 🕒 Queue requests during token refresh
//         return new Promise((resolve, reject) => {
//           failedQueue.push({ resolve, reject });
//         }).then(() =>
//           new Promise(resolve => setTimeout(() => resolve(API(originalRequest)), 50))
//         );
//       }

//       originalRequest._retry = true;
//       isRefreshing = true;

//       try {
//         const { data } = await API.post('/auth/refresh-token');
//         if (data?.user) {
//           window.dispatchEvent(
//             new CustomEvent('session-refresh', { detail: data.user })
//           );
//         }
//         processQueue(null);
//         return API(originalRequest);
//       } catch (refreshError) {
//         processQueue(refreshError);
//         localStorage.removeItem('hasSession');
//         window.location.href = '/login';
//         return Promise.reject(refreshError);
//       } finally {
//         isRefreshing = false;
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// /**
//  * 🔁 Allow AuthContext to tell Axios when it's okay to retry requests
//  */
// window.addEventListener('session-checked', () => {
//   console.log("✅ Session checked – stopping initialSessionLoad");
//   initialSessionLoad = false;
// });

// export default API;


// src/services/axios.js
import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// ——————————————————————————————————————————————————
// QUEUE & REFRESH CONTROLS
let isRefreshing = false;
let failedQueue = [];
let initialSessionLoad = true;

const processQueue = (error, token = null) => {
  console.log('[axios] processQueue:', { error, tokenCount: failedQueue.length });
  failedQueue.forEach(p => {
    if (error) p.reject(error);
    else p.resolve(token);
  });
  failedQueue = [];
};

// ——————————————————————————————————————————————————
// INTERCEPTOR
API.interceptors.response.use(
  response => response,
  async error => {
    const original = error.config;
    console.log('[axios] response error:', original.url, error.response?.status);

    const is401 = error.response?.status === 401;
    const skipPaths = ['/auth/login','/auth/refresh-token','/auth/me'];
    const isRetryable = is401 && !original._retry && !skipPaths.some(p => original.url.includes(p));

    if (isRetryable && !initialSessionLoad) {
      if (isRefreshing) {
        console.log('[axios] queuing request during refresh:', original.url);
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => {
          console.log('[axios] replaying queued request:', original.url);
          return API(original);
        });
      }

      original._retry = true;
      isRefreshing = true;
      console.log('[axios] refreshing token…');

      try {
        const { data } = await API.post('/auth/refresh-token');
        console.log('[axios] refresh-token success:', data);
        processQueue(null, data.user);
        return API(original);
      } catch (refreshError) {
        console.error('[axios] refresh-token failed:', refreshError);
        processQueue(refreshError, null);
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

// ——————————————————————————————————————————————————
// SESSION-CHECKED FLAG
window.addEventListener('session-checked', () => {
  console.log('[axios] session-checked event received; disabling initialSessionLoad');
  initialSessionLoad = false;
});

export default API;
