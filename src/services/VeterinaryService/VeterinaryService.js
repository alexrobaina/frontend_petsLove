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

  deletePet = id => {
    return axios.delete(`${SERVER}/api/pet/delete/?_id=${id}`).then(response => response.data[0])
  }
}

export default VeterinaryService
