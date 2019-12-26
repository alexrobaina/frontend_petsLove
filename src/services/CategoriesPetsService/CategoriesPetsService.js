import axios from 'axios'
import { API_URL } from '../config'

class CategoriesPetsService {
  getTypePets = () => axios.get(`${API_URL}/list/pets/categories`).then(response => response.data)
}

export default CategoriesPetsService
