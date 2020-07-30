import axios from 'axios'
import { SERVER } from 'services/config'

class UserAdopterService {
  loadPets = (id, limit, page) => {
    return axios
      .get(`${SERVER}/api/pet/listPetForUserAdopted/?_id=${id}&page=${page}&limit=${limit}`)
      .then(response => response.data)
  }
}

export default UserAdopterService
