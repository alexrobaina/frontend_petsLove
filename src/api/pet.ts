import axios from 'axios'

export const getPets = async () => {
  const response = await axios.get('/api/v1/pets/', { withCredentials: true })
  return response.data
}

export const getPet = async (id: string) => {
  const response = await axios.get(`/api/v1/pets?id=${id}`, {
    withCredentials: true,
  })
  return response.data.pets
}
