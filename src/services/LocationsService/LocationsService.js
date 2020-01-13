import axios from 'axios'
import { API_URL } from '../config'

class LocationsService {
  getCountries = () => {
    let country = [
      { value: 'unitedStates', label: 'United States' },
      { value: 'argentina', label: 'Argentina' },
    ]
    return country
  }

  getCitiesArgentina = () => {
    let argentina = [
      { value: 'cordoba', label: 'Córdoba' },
      { value: 'buenosAires', label: 'Buenos Aires CABA' },
    ]
    return argentina
  }

  getCitiesUnitedState = () => {
    let unitedState = [
      { value: 'arizona', label: 'Arizona' },
      { value: 'california', label: 'California' },
    ]
    return unitedState
  }
}

export default LocationsService
