import axios from 'axios'
import { SERVER } from 'services/config'
import i18next from 'i18next'

class RegisterService {
  register = data => {
    return axios.post(`${SERVER}/api/user/add`, data).then(response => response.data)
  }

  getUserRol = () => {
    const userRol = [
      { value: 'protectionist', label: i18next.t('register.protectionist') },
      { value: 'adopter', label: i18next.t('register.adopter') },
      { value: 'lost', label: i18next.t('register.lost') },
      { value: 'provider', label: i18next.t('register.provider') },
    ]
    return userRol
  }
}

export default RegisterService
