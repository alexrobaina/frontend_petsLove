import axios from 'axios'
import { SERVER } from 'services/config'

class AuthService {
  login = data => {
    return axios.post(`${SERVER}/api/user/login`, data).then(response => response.data)
  }

  getPetId = id => {
    return axios.get(`${SERVER}/api/pet/query/?_id=${id}`).then(response => response.data)
  }

  getUserId = id => {
    return axios.get(`${SERVER}/api/user/query/?_id=${id}`).then(response => response.data)
  }
}

export default AuthService
