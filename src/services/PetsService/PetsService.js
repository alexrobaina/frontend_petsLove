import axios from 'axios'
import { SERVER } from 'services/config'

class PetsService {
  getPets = data => {
    const { country, city, category, gender } = data

    return axios
      .get(
        `${SERVER}/api/pet/queryList/?country=${country}&city=${city}&category=${category}&gender=${gender}`
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
