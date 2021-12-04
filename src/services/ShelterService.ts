import axios from 'axios';
import { SERVER } from 'services/config';

class ShelterService {
  getShelter = (id) => {
    return axios.get(`${SERVER}/api/v1/user?_id=${id}`).then((response) => response.data);
  };
}

export default ShelterService;
