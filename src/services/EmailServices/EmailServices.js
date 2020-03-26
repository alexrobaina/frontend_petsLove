import axios from 'axios'
import { SERVER } from 'services/config'

class EmailServices {
  contactProtectionist = data => {
    axios.post(`${SERVER}/api/sendEmail/send`, data).then(response => response)
  }
}

export default EmailServices
