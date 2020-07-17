import axios from 'axios'
import { SERVER } from 'services/config'

class SearchUsersService {
  getUsers = rol => {
    return 
    axios.get(`${SERVER}/api/user/listUsersRole?role=${role}`)
      
  }
}

export default SearchUsersService
