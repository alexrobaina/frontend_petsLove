import axios from 'axios'
import { API_URL, API_MONGO_LOCAL } from '../config'

class PetsService {
  getPets = () => axios.get(`${API_MONGO_LOCAL}/api/pet/list`).then(response => response.data)
}

export default PetsService
