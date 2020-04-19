import axios from 'axios'
import { SERVER } from 'services/config'

class VolunteersService {
  getVolunteers = () => {
    return axios
      .post(`${SERVER}/api/user/listUserRol`, { rol: 'transitUser' })
      .then(response => response.data)
  }
}

export default VolunteersService
