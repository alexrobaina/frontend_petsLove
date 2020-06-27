import axios from 'axios'
import { SERVER } from 'services/config'

class EditPetService {
  gePet = id => {
    return axios.get(`${SERVER}/api/pet/getOnePet`, { id }).then(response => response.data)
  }
}

export default EditPetService
