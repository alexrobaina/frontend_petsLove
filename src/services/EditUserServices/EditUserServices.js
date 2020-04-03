import axios from 'axios'
import { SERVER } from 'services/config'

class EditUserServices {
  save = data => {
    return axios.post(`${SERVER}/api/user/update`, data).then(response => response.data)
  }
}

export default EditUserServices
