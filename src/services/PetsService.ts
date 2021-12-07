import axios from 'axios';
import { SERVER } from './config';

class PetsService {
  searchFilterPet = (data, limit, page) => {
    return axios
      .get(
        `${SERVER}/api/v1/pets/searchFilterPets?country=${data.country}&city=${data.city}&category=${data.category}&gender=${data.gender}&limit=${limit}&page=${page}`,
      )
      .then((response) => response.data);
  };

  getCategoryUserFilterPet = (typePet, userId, limit, page) => {
    return axios
      .get(
        `${SERVER}/api/v1/pets/petsUser?_id=${userId}&category=${typePet}&limit=${limit}&page=${page}`,
      )
      .then((response) => response.data);
  };

  getPet = (id) => {
    return axios.get(`${SERVER}/api/v1/pet/?_id=${id}`).then((response) => response.data);
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
