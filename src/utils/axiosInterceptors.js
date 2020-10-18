/* eslint-disable no-param-reassign */
import axios from 'axios'

const axiosInterceptors = rootStore => {
  axios.interceptors.request.use(
    config => {
      if (rootStore.authStore.getTokenLocalStorage()) {
        config.headers.Authorization = rootStore.authStore.getTokenLocalStorage()
          ? `Bearer ${rootStore.authStore.getTokenLocalStorage()}`
          : null
      }
      // Do something before request is sent
      return config
    },
    error => Promise.reject(error)
  )

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        rootStore.authStore.setTokenExpired(true)
      }
    },
    error => Promise.reject(error)
  )
}

export default axiosInterceptors
