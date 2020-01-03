import axios from 'axios'
import { API_URL } from '../config'

class PetsService {
  getPets = (data) => axios.get(`${API_URL}/api/pets/list`, data).then(response => response.data)
}

export default PetsService
