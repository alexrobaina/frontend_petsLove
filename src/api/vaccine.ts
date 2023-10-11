import axios from 'axios'

export const getVaccine = async ({ category }: { category: string }) => {
  const response = await axios.get(`/api/v1/vaccines?category=${category}`)
  return response.data
}
