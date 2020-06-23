import axios from 'axios'
import FormData from 'form-data'
import { SERVER } from '../config'

class ImageService {
  addImage = data => {
    console.log(data)
    const formData = new FormData()
    Object.values(data).forEach(value => {
      formData.append('image', value)
    })

    return axios.post(`${SERVER}/api/pet/images`, formData).then(response => response.data)
  }
}

export default ImageService
