import axios from 'axios'

export const getPets = async ({
  page,
  gender,
  adopted,
  category,
}: {
  page?: number
  gender?: string
  category?: string
  adopted?: boolean
}) => {
  const response = await axios.get(
    `/api/v1/pets?category=${category}&adopted=${adopted}&gender=${gender}&page=${page}`,
  )
  return response.data
}

export const getDashboardPets = async ({
  page,
  gender,
  adopted,
  category,
  searchByName,
}: {
  page?: number
  gender?: string
  category?: string
  adopted?: boolean
  searchByName?: string
}) => {
  const response = await axios.get(
    `/api/v1/pets/dashboard?category=${category}&adopted=${adopted}&gender=${gender}&searchByName=${searchByName}&page=${page}`,
  )
  return response.data
}

export const getPet = async (id: string) => {
  const response = await axios.get(`/api/v1/pets?id=${id}`, {
    withCredentials: true,
  })
  return response.data.pets
}

export const deletePet = async (petId: string, userRole: string) => {
  const response = await axios.delete(
    `/api/v1/pet/delete?petId=${petId}&userRole=${userRole}`,
  )
  return response.data
}
