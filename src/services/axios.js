// frontend/src/services/axios.js
import axios from 'axios'

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

let isRefreshing = false
let queue = []

function processQueue(err) {
  queue.forEach(p => err ? p.reject(err) : p.resolve())
  queue = []
}

API.interceptors.response.use(
  r => r,
  async (err) => {
    const { config, response } = err
    if (!response || response.status !== 401) return Promise.reject(err)

    // 🛑 Prevent retry on these routes
    const noRetryPaths = ['/auth/me', '/auth/refresh-token']
    if (noRetryPaths.some(path => config.url.includes(path))) {
      return Promise.reject(err)
    }

    // 🌀 Avoid retrying multiple times
    if (config._retry) return Promise.reject(err)
    config._retry = true

    if (isRefreshing) {
      return new Promise((res, rej) => {
        queue.push({ resolve: () => res(API(config)), reject: rej })
      })
    }

    isRefreshing = true
    return new Promise((res, rej) => {
      API.post('/auth/refresh-token')
        .then(() => {
          isRefreshing = false
          processQueue()
          res(API(config))
        })
        .catch(e => {
          isRefreshing = false
          processQueue(e)
          window.location.href = '/login'
          rej(e)
        })
    })
  }
)

export default API
