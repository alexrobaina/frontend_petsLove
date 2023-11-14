import axios from 'axios'

export const updatePetVaccine = async (data: {
  id?: string
  status: string
  files: {
    isNew: boolean
    file: File | string
    url: string
  }[]
}) => {
  const formData = new FormData()
  Object.keys(data).forEach((key: string) => {
    if (key !== 'files' && key !== 'id') {
      formData.append(key, (data as never)[key])
    }
  })

  data.files.forEach((item) => {
    if (item.file === '') return
    if (!item.isNew) formData.append(`oldFiles`, item.file)
    if (item.isNew) formData.append(`files`, item.file)
  })

  const response = await axios.put(
    `/api/v1/vaccines/petVaccine/${data.id}`,
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

export const deletePetVaccine = async ({ id }: { id: string }) => {
  const response = await axios.delete(`/api/v1/vaccines/petVaccine/${id}`)

  return response.data
}
