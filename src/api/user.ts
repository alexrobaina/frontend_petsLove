import { User } from '../pages/SettingsPage/constants'

import axios from './axiosInstance'

export const getUsers = async ({
  role,
  country,
  city,
  page,
}: {
  role: string
  country: string
  city: string
  page: number
}) => {
  const response = await axios.get(
    `/api/v1/users?role=${role}&country=${country}&city=${city}&page=${page}`,
    {
      withCredentials: true,
    },
  )

  return response.data
}

export const getUser = async (id: string) => {
  try {
    const response = await axios.get(`/api/v1/user?id=${id}`)

    return response.data
  } catch (error) {
    console.log(error)
  }
}

export const updateUser = async (data: User) => {
  const formData = new FormData()

  // append other fields to formData
  Object.keys(data).forEach((key: string) => {
    if (
      typeof data[key] === 'object' &&
      data[key] !== null &&
      !(data[key] instanceof File)
    ) {
      formData.append(key, JSON.stringify(data[key]))
    } else if (key !== 'image') {
      formData.append(key, data[key])
    }
  })

  // assuming 'avatar' is the file field name, append the file to formData
  if (data.image) formData.append('images', data.image)

  const response = await axios.put(`/api/v1/user/`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
