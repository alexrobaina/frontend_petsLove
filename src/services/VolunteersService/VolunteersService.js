import axios from 'axios'
import { SERVER } from 'services/config'

class VolunteersService {
  getVolunteers = role => {
    return axios
      .get(`${SERVER}/api/user/listUsersRole?role=${role}`)
      .then(response => response.data)
  }
}

export default VolunteersService
