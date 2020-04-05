import axios from 'axios'
import { SERVER } from 'services/config'

class EditUserServices {
  save = data => {
    return axios.put(`${SERVER}/api/user/update`, data).then(response => response.data)
  }

  getUser = id => {
    return axios.get(`${SERVER}/api/user/query/?_id=${id}`).then(response => response.data)
  }
}

export default EditUserServices
