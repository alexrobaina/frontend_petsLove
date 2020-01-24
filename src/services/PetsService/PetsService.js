import axios from 'axios'
import { API_URL, API_MONGO_LOCAL } from '../config'

class PetsService {
  getPets = (data) => {
    const {country, city, categorie, gender} = data
     return axios
        .get(
          `${API_MONGO_LOCAL}/api/pet/queryList/?country=${country}&city=${city}&categorie=${categorie}&gender=${gender}`
        )
        .then(response => response.data)
  }
}

export default PetsService
