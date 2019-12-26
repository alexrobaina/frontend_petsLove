import axios from 'axios'
import { API_URL } from '../config'

class LocationsService {
  getCountries = () => axios.get(`${API_URL}/list/countries`).then(response => response.data)

  getCitiesArgentina = () =>
    axios.get(`${API_URL}/list/cities/argentina`).then(response => response.data)

  getCitiesUnitedState = () =>
    axios.get(`${API_URL}/list/cities/unitedState`).then(response => response.data)
}

export default LocationsService
