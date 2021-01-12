import axios from 'axios';
import { SERVER } from 'services/config';

class PetsService {
  getPets = (data, limit, page) => {
    const { country, city, category, gender } = data;

    return axios
      .get(
        `${SERVER}/api/pet/searchFilterPet/?country=${country}&city=${city}&category=${category}&gender=${gender}&limit=${limit}&page=${page}`,
      )
      .then((response) => response.data);
  };

  loadPetId = (id) => {
    return axios
      .get(`${SERVER}/api/pet/pet/?_id=${id}`)
      .then((response) => response.data[0]);
  };

  loadPetsAdopted = (id, limit, page, search) => {
    return axios
      .get(
        `${SERVER}/api/pet/petsAdopted/?_id=${id}&limit=${limit || ''}&page=${
          page || ''
        }&search=${search || ''}`,
      )
      .then((response) => response.data);
  };
}

export default PetsService;
