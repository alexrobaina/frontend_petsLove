import axios from 'axios'
import { SERVER } from 'services/config'

class ProfilesUsersService {
  getUSerId = id => {
    return axios.get(`${SERVER}/api/user/query/?_id=${id}`).then(response => response.data)
  }
}

export default ProfilesUsersService
