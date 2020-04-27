import axios from 'axios'
import { SERVER } from 'services/config'

class SearchUsersService {
  getUsers = rol => {
    return axios.post(`${SERVER}/api/user/listUserRol`, { rol }).then(response => response.data)
  }
}

export default SearchUsersService
