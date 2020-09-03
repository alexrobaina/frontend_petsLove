import axios from 'axios'
import { SERVER } from 'services/config'

class VolunteersService {
  getVolunteers = role => {
    return axios
      .get(`${SERVER}/api/user/listUsersRole?role=${role}`)
      .then(response => response.data)
  }

  getPetsVolunteersOwner = (id, limit, page, search) => {
    return axios
      .get(
        `${SERVER}/api/volunteers/getPetsVolunteersOwner/?_id=${id}&limit=${limit}&page=${page}&search=${
          search || ''
        }`
      )
      .then(response => response.data)
  }

  getPetsAssignedVolunteer = (id, limit, page, search, isAdopted) => {
    return axios
      .get(
        `${SERVER}/api/volunteers/getPetsAssignedVolunteer/?_id=${id}&limit=${limit}&page=${page}&search=${
          search || ''
        }&isAdopted=${isAdopted}`
      )
      .then(response => response.data)
  }
}

export default VolunteersService
