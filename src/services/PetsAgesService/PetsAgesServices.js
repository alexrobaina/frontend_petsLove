import axios from 'axios'
import { API_MONGO_LOCAL } from '../config'

class PetsAgesServices {
  getAge = () => {
    return axios.get(`${API_MONGO_LOCAL}/api/petAge/list`).then(response => response.data)
  }
}

export default PetsAgesServices
