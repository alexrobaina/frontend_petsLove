import axios from 'axios'
import FormData from 'form-data'
import { SERVER } from '../config'

class ImageService {
  addImage = data => {
    const formData = new FormData()

    if (data.imageResized) {
      Object.values(data.imageResized).forEach(value => {
        formData.append('image', value)
      })
    }
    if (data.previewImage) {
      Object.values(data.previewImage).forEach(value => {
        formData.append('image', value)
      })
    }

    return axios.post(`${SERVER}/api/pet/images`, formData).then(response => response.data)
  }

  uploadImage = (data, idImage) => {
    const formData = new FormData()

    if (data.imageResized) {
      Object.values(data.imageResized).forEach(value => {
        formData.append('image', value)
      })
    }

    if (data.previewImage) {
      Object.values(data.previewImage).forEach(value => {
        formData.append('image', value)
      })
    }

    formData.append('_id', idImage)

    return axios.post(`${SERVER}/api/pet/updateImage`, formData).then(response => response.data)
  }
}

export default ImageService
