import Resizer from 'react-image-file-resizer'

import { ICreatePetForm } from '../pages/DashboardPage/constants'

import axios from './axiosInstance'

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
    } else if (key !== 'newImages' && key !== 'qrCode') {
      formData.append(key, data[key])
    }
  })

  if (data.newImages.length > 0 && Array.isArray(data.newImages)) {
    data.newImages.forEach((image: { file: File }) => {
      formData.append('newImages', image.file)
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

export const updatePet = async (data: ICreatePetForm) => {
  const formData = new FormData()

  Object.keys(data).forEach((key: string) => {
    if (
      typeof data[key] === 'object' &&
      data[key] !== null &&
      !(data[key] instanceof File)
    ) {
      formData.append(key, JSON.stringify(data[key]))
    } else if (key !== 'id') {
      formData.append(key, data[key])
    }
  })

  if (data.images.length > 0 && Array.isArray(data.images)) {
    const resizedImages = await Promise.all(
      data.images.map(async (image: { file: File; isNew: boolean }) => {
        if (image.isNew) {
          if (image.file.size > 1.5 * 1024 * 1024) {
            // Resize the image if it's greater than 1.5MB
            return new Promise<File>((resolve) => {
              Resizer.imageFileResizer(
                image.file,
                1024, // New width
                1024, // New height
                'JPEG', // Image format
                100, // Quality
                0, // Rotation
                (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  uri: string | Blob | File | ProgressEvent<FileReader> | any,
                ) => {
                  // Convert base64 to Blob
                  const byteString = atob(uri.split(',')[1])
                  const mimeString = uri
                    .split(',')[0]
                    .split(':')[1]
                    .split(';')[0]
                  const ab = new ArrayBuffer(byteString.length)
                  const ia = new Uint8Array(ab)
                  for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i)
                  }
                  const blob = new Blob([ab], { type: mimeString })
                  const file = new File([blob], 'resized.jpg', {
                    type: mimeString,
                  })
                  resolve(file)
                },
                'base64', // Output type ('base64', 'blob', or 'file')
              )
            })
          }
        }
        return image.file
      }),
    )

    resizedImages.forEach((resizedImage) => {
      formData.append('newImages', resizedImage)
    })
  }

  const imagesDeleted = data.images.filter(
    (image: { isDeleted: boolean }) => image.isDeleted,
  ) as []

  if (imagesDeleted.length > 0) {
    formData.append('deleteFiles', JSON.stringify(imagesDeleted))
  }

  const response = await axios.put(`/api/v1/pets/${data.id}`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}
