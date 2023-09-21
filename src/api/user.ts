import axios from 'axios'

export const getUsers = async (filterParams: { role?: string }) => {
  const response = await axios.get(`/api/v1/users?role=${filterParams.role}`, {
    withCredentials: true,
  })
  return response.data
}

export const getUser = async (id: string) => {
  const response = await axios.get(`/api/v1/user?id=${id}`)
  return response.data
}
