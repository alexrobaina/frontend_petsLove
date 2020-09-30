import axios from 'axios'
import { SERVER } from 'services/config'

class ShelterService {
  loadPetId = id => {
    return axios.get(`${SERVER}/api/pet/pet/?_id=${id}`).then(response => response.data[0])
  }

  deletePet = id => {
    return axios.delete(`${SERVER}/api/pet/remove/?_id=${id}`).then(response => response.data[0])
  }

  getPets = (id, limit, page, search, isAdopted) => {
    return axios
      .get(
        `${SERVER}/api/pet/petsShelter/?_id=${id}&limit=${limit || ''}&page=${page || ''}&search=${
          search || ''
        }&isAdopted=${isAdopted || false}`
      )
      .then(response => response.data)
  }

  getShelter = id => {
    return axios.delete(`${SERVER}/api/user/query/?_id=${id}`).then(response => response.data)
  }
}

export default ShelterService
