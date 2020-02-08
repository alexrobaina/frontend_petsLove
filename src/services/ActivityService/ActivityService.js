import axios from 'axios'
import { API_MONGO_LOCAL, API_URL } from '../config'

class ActivityService {
  getActivity = () => axios.get(`${API_MONGO_LOCAL}/api/activity/list`).then(response => response.data)
}

export default ActivityService
