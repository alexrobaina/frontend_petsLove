import axios from 'axios'
import { API_MONGO_LOCAL } from '../config'

class GenderService {
  getTypePets = () =>
    axios.get(`${API_MONGO_LOCAL}/api/gender/list`).then(response => response.data)
}

export default GenderService
