import axios from 'axios'

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.jobneura.tech/api',
  withCredentials: true,
})

let isRefreshing = false
let queue = []

function processQueue(err) {
  queue.forEach(p => err ? p.reject(err) : p.resolve())
  queue = []
}

API.interceptors.response.use(
  response => response,
  async (error) => {
    const { config, response } = error
    if (!response || response.status !== 401) return Promise.reject(error)

    const noRetryPaths = ['/auth/me', '/auth/refresh-token']
    if (noRetryPaths.some(path => config.url.includes(path))) {
      return Promise.reject(error)
    }

    if (config._retry) return Promise.reject(error)
    config._retry = true

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        queue.push({ resolve: () => resolve(API(config)), reject })
      })
    }

    isRefreshing = true
    return new Promise((resolve, reject) => {
      API.post('/auth/refresh-token')
        .then(() => {
          isRefreshing = false
          processQueue()
          resolve(API(config))
        })
        .catch(err => {
          isRefreshing = false
          processQueue(err)
          window.location.href = '/login'
          reject(err)
        })
    })
  }
)

export default API
