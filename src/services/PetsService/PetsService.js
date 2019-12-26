import axios from 'axios'
import { API_URL } from '../config'

class PetsService {
  getPets = () => axios.get(`${API_URL}/api/pets/list`).then(response => response.data)
}

export default PetsService
