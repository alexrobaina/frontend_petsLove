import axios from 'axios'
import { SERVER } from 'services/config'

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
        `${SERVER}/api/pet/queryList/?country=${country}&city=${city}&categorie=${categorie}&gender=${gender}&age=${age}&lost=${lost}&dewormed=${dewormed}&vaccianated=${vaccianated}&urgent=${urgent}&sterilized=${sterilized}&activity=${activity}`
      )
      .then(response => response.data)
  }

  getPetId = id => {
    return axios.get(`${SERVER}/api/pet/query/?_id=${id}`).then(response => response.data)
  }

  loadPetsForUser = id => {
    return axios.get(`${SERVER}/api/pet/listForUser/?_id=${id}`).then(response => response.data)
  }

  loadPetsUserAdopt = id => {
    return axios
      .get(`${SERVER}/api/pet/listPetsUserAdopt/?_id=${id}`)
      .then(response => response.data)
  }

  loadPetsUserTransit = id => {
    return axios
      .get(`${SERVER}/api/pet/listPetsUserTransit/?_id=${id}`)
      .then(response => response.data)
  }

  loadPetsAdopted = id => {
    return axios.get(`${SERVER}/api/pet/listAdopted/?_id=${id}`).then(response => response.data)
  }

  loadPetForAdoption = id => {
    return axios.get(`${SERVER}/api/pet/listForAdoption/?_id=${id}`).then(response => response.data)
  }
}

export default PetsService
