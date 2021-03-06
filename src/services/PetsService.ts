import axios from 'axios';
import { SERVER } from './config';

class PetsService {
  searchFilterPet = (data, limit, page) => {
    const { country, city, category, gender } = data;

    return axios
      .get(
        `${SERVER}/api/pet/searchFilterPet/?country=${country}&city=${city}&category=${category}&gender=${gender}&limit=${limit}&page=${page}`,
      )
      .then((response) => response.data);
  };

  getFilterPet = (type, userCreatorId, limit, page) => {
    return axios
      .get(
        `${SERVER}/api/pet/filterTypePet/?userCreatorId=${userCreatorId}&category=${type}&limit=${limit}&page=${page}`,
      )
      .then((response) => response.data);
  };

  getPet = (id) => {
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
