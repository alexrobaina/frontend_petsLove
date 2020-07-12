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

  addImageUser = data => {
    const formData = new FormData()

    formData.append('image', data)

    return axios.post(`${SERVER}/api/user/addUserImages`, formData).then(response => response.data)
  }

  updateImageUser = (imageId, data) => {
    const formData = new FormData()

    if (data) {
      alert('123')
      formData.append('image', data)
    }

    formData.append('_id', imageId)

    return axios
      .post(`${SERVER}/api/user/updateUserImages`, formData)
      .then(response => response.data)
  }
}

export default ImageService
