import axios from 'axios'
import { SERVER } from 'services/config'

class AdopterService {
  getPetsAdopter = (id, limit, page) => {
    return axios
      .get(`${SERVER}/api/adopter/listPetsAdopter/?_id=${id}&page=${page}&limit=${limit}`)
      .then(response => response.data)
  }
}

export default AdopterService
