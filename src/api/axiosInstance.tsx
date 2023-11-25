import axios from 'axios'

import { getCookie } from '../utils/getCookie'

// Set up base URL and other global settings
axios.defaults.baseURL = '/'

// Add a request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = getCookie('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    const token = getCookie('token')
    if (
      !window.location.href.includes('/login') &&
      error.response.status === 401 &&
      token
    )
      window.location.href = '/login'

    return Promise.reject(error)
  },
)

export default axios
