import axios from 'axios'
import { SERVER } from 'services/config'

class AdopterService {
  getPetsAdopter = (id, limit, page) => {
    return axios
      .get(`${SERVER}/api/adopter/listPetsAdopter/?_id=${id}&page=${page}&limit=${limit}`)
      .then(response => response.data)
  }

  deletePet = id => {
    return axios.delete(`${SERVER}/api/pet/remove/?_id=${id}`).then(response => response.data[0])
  }
}

export default AdopterService
