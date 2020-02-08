import axios from 'axios'
import { API_MONGO_LOCAL } from '../config'

class PetsService {
  getPets = data => {
    const {
      country,
      city,
      categorie,
      gender,
      age,
      lost,
      dewormed,
      vaccianated,
      urgent,
      sterilized,
      activity,
    } = data

    return axios
      .get(
        `${API_MONGO_LOCAL}/api/pet/queryList/?country=${country}&city=${city}&categorie=${categorie}&gender=${gender}&age=${age}&lost=${lost}&dewormed=${dewormed}&vaccianated=${vaccianated}&urgent=${urgent}&sterilized=${sterilized}&activity=${activity}`
      )
      .then(response => response.data)
  }
}

export default PetsService
