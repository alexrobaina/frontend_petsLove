import axios from 'axios'
import { API_URL, API_MONGO_LOCAL } from '../config'

class PetsService {
  getPets = (data) => axios.get(`${API_MONGO_LOCAL}/api/pet/list`, data).then(response => response.data)
}

export default PetsService
