import axios from 'axios'
import { SERVER } from '../config'

class CreatePetServices {
  addPet = data => {
    return axios.post(`${SERVER}/api/pet/create`, data).then(response => response.data)
  }

  editPet = data => {
    return axios.put(`${SERVER}/api/pet/update`, data).then(response => response.data)
  }

  searchPet = id => {
    return axios.get(`${SERVER}/api/pet/query/?_id=${id}`).then(response => response.data)
  }
}

export default CreatePetServices
