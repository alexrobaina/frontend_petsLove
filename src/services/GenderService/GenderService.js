import axios from 'axios'
import { API_URL } from '../config'

class GenderService {
  getGender = () => axios.get(`${API_URL}/list/pets/gender`).then(response => response.data)
}

export default GenderService
