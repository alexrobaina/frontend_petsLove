import axios from './axiosInstance'

export const getAuth = async (url: string) => {
  const response = await axios.get(url, { withCredentials: true })
  return response.data
}
