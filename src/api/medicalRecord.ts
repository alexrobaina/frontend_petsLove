import { ICreateMedicalRecordForm } from '../pages/ProfilePetPage/types'

import axios from './axiosInstance'
import { resizeImages } from './utils/resizeImages'

export const createMedicalRecord = async (data: ICreateMedicalRecordForm) => {
  const formData = new FormData()

  Object.keys(data).forEach((key: string) => {
    if (
      typeof data[key] === 'object' &&
      data[key] !== null &&
      !(data[key] instanceof File)
    ) {
      formData.append(key, JSON.stringify(data[key]))
    } else if (key !== 'newAttachments') {
      formData.append(key, data[key])
    }
  })

  if (data?.attachments) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.attachments.forEach((attachment: any) => {
      if (attachment.isNew) formData.append('newAttachments', attachment.file)
    })
  }

  const response = await axios.post(`/api/v1/pets/medicalRecord`, formData, {
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateMedicalRecord = async (data: any) => {
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

  const resizedAttachments = await resizeImages(data.attachments)

  resizedAttachments.forEach((resizedImage) => {
    formData.append('newAttachments', resizedImage)
  })

  const response = await axios.put(
    `/api/v1/pets/medicalRecord/${data.id}`,
    formData,
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )

  return response.data
}

export const deleteMedicalRecord = async ({ id }: { id: string }) => {
  const response = await axios.delete(`/api/v1/pets/medicalRecord/${id}`, {
    withCredentials: true,
  })

  return response.data
}
