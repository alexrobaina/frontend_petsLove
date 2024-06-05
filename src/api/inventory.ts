import axios from 'axios'

const API_URL = '/api/v1/inventory'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createInventory = async (data: any) => {
  const formData = new FormData()

  // Append all fields to formData except for newImages and images
  Object.keys(data).forEach((key: string) => {
    if (
      typeof data[key] === 'object' &&
      data[key] !== null &&
      !(data[key] instanceof File)
    ) {
      formData.append(key, JSON.stringify(data[key]))
    } else if (key !== 'newImages' && key !== 'images') {
      formData.append(key, data[key])
    }
  })

  if (
    data?.newImages &&
    data?.newImages.length > 0 &&
    Array.isArray(data.newImages)
  ) {
    data.newImages.forEach((image: { file: File }) => {
      formData.append('newImages', image.file)
    })
  }

  // Append existing images that are not marked for deletion
  if (data?.images && data?.images.length > 0 && Array.isArray(data.images)) {
    data.images.forEach((image: { url: string; isDeleted?: boolean }) => {
      if (!image.isDeleted) {
        formData.append('images', image.url)
      }
    })
  }

  try {
    const response = await axios.post(API_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create inventory item')
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateInventory = async (data: any) => {
  const formData = new FormData()
  const inventoryId = data.id

  Object.keys(data).forEach((key: string) => {
    if (key !== 'newImages' && key !== 'images') {
      formData.append(key, data[key])
    }
  })

  if (data.newImages.length > 0 && Array.isArray(data.newImages)) {
    data.newImages.forEach((image: { file: File }) => {
      formData.append('newImages', image.file)
    })
  }
  const imagesDeleted = data.images.filter(
    (image: { isDeleted: boolean }) => image.isDeleted,
  ) as []

  if (imagesDeleted.length > 0) {
    formData.append('deleteFiles', JSON.stringify(imagesDeleted))
  }

  const existingImages = data.images
    .filter((image: { isDeleted: boolean }) => !image.isDeleted)
    .map((image: { url: string }) => image.url)

  formData.append('images', JSON.stringify(existingImages))

  try {
    const response = await axios.put(`${API_URL}/${inventoryId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error('Failed to update inventory item')
  }
}

export const deleteInventory = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}

export const getInventoryById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

export const listInventories = async ({
  page,
  name,
  quantity,
  inventoryType,
}: {
  page: number
  name: string
  quantity: string
  inventoryType: string
}) => {
  try {
    const response = await axios.get(API_URL, {
      params: { name, quantity, inventoryType, page },
    })
    return response.data
  } catch (error) {
    return error
  }
}
