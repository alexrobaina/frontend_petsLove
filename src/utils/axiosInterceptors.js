/* eslint-disable no-param-reassign */
import axios from 'axios'

const axiosInterceptors = rootStore => {
  axios.interceptors.request.use(
    config => {
      if (rootStore.authStore.user) {
        config.headers.Authorization = rootStore.authStore.tokenLocalStorage
          ? `Bearer ${rootStore.authStore.tokenLocalStorage}`
          : null
      }
      // Do something before request is sent
      return config
    },
    error => Promise.reject(error)
  )
}

export default axiosInterceptors
