import axios from 'axios'
import FormData from 'form-data'
import { SERVER } from '../config'

class ImageService {
  addImagePet = data => {
    const formData = new FormData()

    formData.append('bucket', 'pet')

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

  uploadImagePet = (data, idImage) => {
    const formData = new FormData()

    formData.append('bucket', 'pet')

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


    formData.append('bucket', 'user')
    formData.append('image', data)

    return axios.post(`${SERVER}/api/user/addUserImages`, formData).then(response => response.data)
  }

  updateImageUser = (imageId, data) => {
    const formData = new FormData()

    formData.append('bucket', 'user')

    if (data) {
      formData.append('image', data)
    }

    formData.append('_id', imageId)

    return axios
      .post(`${SERVER}/api/user/updateUserImages`, formData)
      .then(response => response.data)
  }

  deleteImage = (image) => {
    return axios.delete(`${SERVER}/api/deleteImage?image=${image}`).then(response => response.data)
  }

  deleteUserImage = (image) => {
    return axios.delete(`${SERVER}/api/deleteUserImage?image=${image}`).then(response => response.data)
  }
}

export default ImageService
