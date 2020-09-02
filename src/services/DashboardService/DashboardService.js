import axios from 'axios'
import { SERVER } from 'services/config'

class DashboardService {
  getDataDashboard = id => {
    return axios.get(`${SERVER}/api/dashboard/?_id=${id}`).then(response => response.data)
  }
}

export default DashboardService
