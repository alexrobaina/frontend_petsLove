import axios from 'axios';
import petsListMock from '../../mocks/petsListMock';
import { SERVER } from './config';

class PetsService {
  searchFilterPet = (data, limit, page) => {
    console.log(data, limit, page);

    return axios.get(`${SERVER}/api/v1/pets/`).then((response) => response.data);

    //   return axios
    //     .get(
    //       `${SERVER}/api/v1/pet/searchFilterPet/?country=${country}&city=${city}&category=${category}&gender=${gender}&limit=${limit}&page=${page}`,
    //     )
    //     .then((response) => response.data);
  };

  getFilterPet = (type, userCreatorId, limit, page) => {
    console.log(type, userCreatorId, limit, page);

    return petsListMock;
    // return axios
    //   .get(
    //     `${SERVER}/api/pet/filterTypePet/?userCreatorId=${userCreatorId}&category=${type}&limit=${limit}&page=${page}`,
    //   )
    //   .then((response) => response.data);
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
