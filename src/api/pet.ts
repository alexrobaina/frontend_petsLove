import axios from 'axios'

import { ICreatePetForm } from '../pages/DashboardPage/constants'

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
    `/api/v1/dashboard/pets?category=${category}&adopted=${adopted}&gender=${gender}&searchByName=${searchByName}&page=${page}`,
  )
  return response.data
}

export const getPet = async (id: string) => {
  const response = await axios.get(`/api/v1/pets/${id}`, {
    withCredentials: true,
  })

  return response.data
}

export const deletePet = async (petId: string) => {
  const response = await axios.delete(`/api/v1/pets/${petId}`)
  return response.data
}

export const createPet = async (data: ICreatePetForm) => {
  const formData = new FormData()

  Object.keys(data).forEach((key: string) => {
    if (
      typeof data[key] === 'object' &&
      data[key] !== null &&
      !(data[key] instanceof File)
    ) {
      formData.append(key, JSON.stringify(data[key]))
    } else if (key !== 'image' && key !== 'qrCode') {
      formData.append(key, data[key])
    }
  })

  if (data.images && Array.isArray(data.images)) {
    data.images.forEach((file: File) => {
      formData.append('images', file)
    })
  }

  const response = await axios.post(`/api/v1/pets`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
