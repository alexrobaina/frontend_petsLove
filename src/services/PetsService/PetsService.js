import axios from 'axios'
import { SERVER } from 'services/config'

class PetsService {
  getPets = data => {
    const { city, category, gender } = data

    return axios
      .get(`${SERVER}/api/pet/queryList/?city=${city}&category=${category}&gender=${gender}`)
      .then(response => response.data)
  }

  getPetId = id => {
    return axios.get(`${SERVER}/api/pet/pet/?_id=${id}`).then(response => response.data[0])
  }

  loadPetsForUser = id => {
    return axios.get(`${SERVER}/api/pet/listPetsForUser/?_id=${id}`).then(response => response.data)
  }

  loadPetsUserTransit = id => {
    return axios
      .get(`${SERVER}/api/pet/listPetsUserTransit/?_id=${id}`)
      .then(response => response.data)
  }

  loadPetsAdopted = (id, limit, page) => {
    return axios
      .get(`${SERVER}/api/pet/petsAdopted/?_id=${id}&page=${page}&limit=${limit}`)
      .then(response => response.data)
  }

  loadPetForAdoption = (id, limit, page) => {
    return axios
      .get(`${SERVER}/api/pet/petsForAdoption/?_id=${id}&page=${page}&limit=${limit}`)
      .then(response => response.data)
  }
}

export default PetsService
