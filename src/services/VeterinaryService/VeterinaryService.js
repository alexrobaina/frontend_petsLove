import axios from 'axios'
import { SERVER } from 'services/config'

class VeterinaryService {
  getPetsVeterinaryCared = (id, limit, page, search) => {
    return axios
      .get(
        `${SERVER}/api/veterinary/listPetsVeterinaryCared/?_id=${id}&limit=${limit}&page=${page}&search=${
          search || ''
        }`
      )
      .then(response => response.data)
  }
}

export default VeterinaryService
