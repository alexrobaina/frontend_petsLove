import { makeAutoObservable, runInAction, toJS } from 'mobx';
import { LIMIT_SEARCH } from 'services/config';
import InputStore from './InputStore';
import PetsService from 'services/PetsService';

interface ISearchPet {
  city: string;
  male: boolean;
  dogs: boolean;
  cats: boolean;
  female: boolean;
  country: string;
  pets: Array<any>;
  exotics: boolean;
  totalPets: number;
  isLoading: boolean;
  searchingPet: boolean;
  petsService: PetsService;
}

class SearchPetStore implements ISearchPet {
  city;
  male;
  dogs;
  cats;
  pets;
  female;
  gender;
  country;
  exotics;
  category;
  isLoading;
  totalPets;
  petsService;
  textAddress;
  searchingPet;

  constructor() {
    this.pets = [];
    this.male = false;
    this.cats = false;
    this.dogs = false;
    this.totalPets = 0;
    this.female = false;
    this.exotics = false;
    this.isLoading = false;
    this.searchingPet = false;
    this.city = new InputStore();
    this.gender = new InputStore();
    this.country = new InputStore();
    this.category = new InputStore();
    this.textAddress = new InputStore();

    makeAutoObservable(this);

    this.petsService = new PetsService();
  }

  async searchPets(limit, page) {
    this.resetPets();
    this.isLoading = true;
    this.searchingPet = true;

    const data = {
      city: this.city.value,
      gender: this.gender.value,
      category: this.category.value.toLowerCase(),
      country: this.country.value.toLowerCase(),
    };

    try {
      const response = await this.petsService.searchFilterPet(data, limit, page);

      runInAction(() => {
        this.isLoading = false;
        this.totalPets = response.totalPets;
        this.pets = toJS(response.pets);
      });
    } catch (e) {
      runInAction(() => {
        this.isLoading = false;
        console.log(e);
      });
    }
  }

  resetPets() {
    this.pets = [];
    this.searchingPet = false;
  }

  handleTextAddress(textAddress) {
    this.textAddress.setValue(textAddress);
  }

  handleCity(city) {
    this.city.setValue(city);
  }

  handleFemale(female) {
    this.female = female;
  }

  handleMale(male) {
    this.male = male;
  }

  handleCountry(country) {
    this.country.setValue(country);
  }

  handleCats(cats) {
    this.cats = cats;
  }

  handleDogs(dogs) {
    this.dogs = dogs;
  }

  handleExotic(exotics) {
    this.exotics = exotics;
  }

  handleGender(gender) {
    this.gender.setValue(gender);
  }

  handleCategory(category) {
    this.category.setValue(category);
  }

  setAddressComponents(address) {
    if (address?.address_components) {
      address.address_components.forEach((components) => {
        components.types.forEach((type) => {
          if (type === 'country') {
            this.handleCountry(components.long_name);
          }
          if (type === 'administrative_area_level_1') {
            this.handleCity(components.long_name);
          }
        });
      });
    } else {
      this.handleCity('');
      this.handleCountry('');
      this.searchPets(LIMIT_SEARCH, 1);
    }
  }
}

export default SearchPetStore;
