import axios from 'axios'
import { API_MONGO_LOCAL, API_URL } from '../config'

class GenderService {
  getTypePets = () => axios.get(`${API_MONGO_LOCAL}/api/gender/list`).then(response => response.data)
}

export default GenderService
