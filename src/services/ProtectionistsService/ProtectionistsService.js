import axios from 'axios'
import { SERVER } from 'services/config'

class ProtectionistsService {
  getVolunteers = () => {
    return axios
      .post(`${SERVER}/api/user/listUserRol`, { rol: 'protectionist' })
      .then(response => response.data)
  }
}

export default ProtectionistsService
