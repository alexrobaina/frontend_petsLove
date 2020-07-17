import axios from 'axios'
import { SERVER } from 'services/config'

class UserAdopterService {
  loadPets = id => {
    return axios.get(`${SERVER}/api/pet/listPetForUserAdopted/?_id=${id}`).then(response => response.data)
  }

}

export default UserAdopterService
