// src/services/appointmentService.ts
import axios from 'axios'

const API_URL = '/api/v1/appointments'

export const createAppointment = async (data: any) => {
  try {
    let formattedData = {}
    Object.entries(data).map(([key, value]) => {
      if (value === '' || value === null) return null
      formattedData = {
        ...formattedData,
        [key]: value,
      }
    })

    const response = await axios.post(API_URL, formattedData)
    return response.data
  } catch (error) {
    return error
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateAppointment = async (data: any) => {
  const response = await axios.put(`${API_URL}/${data.id}`, data)
  return response.data
}

export const deleteAppointment = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`)
  return response.data
}

export const getAppointmentById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`)
  return response.data
}

export const listAppointments = async () => {
  try {
    const response = await axios.get(API_URL)
    return response.data
  } catch (error) {
    return error
  }
}
