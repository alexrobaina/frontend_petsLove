import axios from 'axios'
import { SERVER } from '../config'

class CreatePetServices {
  addPet = data => {
    return axios.post(`${SERVER}/api/pet/add`, data).then(response => response.data)
  }
}

export default CreatePetServices
