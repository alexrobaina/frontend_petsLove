import axios from 'axios'
import { API_MONGO_LOCAL } from '../config'

class CategoriesPetsService {
  getTypePets = () =>
    axios.get(`${API_MONGO_LOCAL}/api/categorie/list`).then(response => response.data)
}

export default CategoriesPetsService
