import { makeAutoObservable, runInAction } from 'mobx';
import Shelter from 'models/Shelter';
import ShelterService from 'services/ShelterService';
import PetsService from 'services/PetsService';

interface IProfileShelter {
  pets: any;
  page: number;
  shelter: object;
  totalPets: number;
  isLoading: boolean;
  openAboutUs: boolean;
  openMapCard: () => void;
  petsService: PetsService;
  openRequirements: boolean;
  categorySelected: string;
  shelterService: ShelterService;
}

class ProfileShelterStore implements IProfileShelter {
  pets;
  page;
  shelter;
  isLoading;
  totalPets;
  openAboutUs;
  petsService;
  openMapCard;
  requirements;
  shelterService;
  categorySelected;
  openRequirements;

  constructor() {
    this.page = 1;
    this.pets = [];
    this.totalPets = 0;
    this.isLoading = false;
    this.openMapCard = false;
    this.openAboutUs = false;
    this.requirements = false;
    this.categorySelected = 'cat';
    this.openRequirements = false;

    makeAutoObservable(this);

    this.shelter = new Shelter();
    this.petsService = new PetsService();
    this.shelterService = new ShelterService();
  }

  async searchShelter(id) {
    this.isLoading = true;

    try {
      const response = await this.shelterService.getShelter(id);

      runInAction(() => {
        this.isLoading = false;
        this.shelter.fillJson(response.userDB);
      });
    } catch (e) {
      runInAction(() => {
        this.isLoading = false;
        console.log(e);
      });
    }
  }

  async getCategoryUserFilterPet(typePet, userCreatorId, limit, page) {
    this.resetPets();

    this.isLoading = true;

    try {
      const response = await this.petsService.getCategoryUserFilterPet(
        typePet,
        userCreatorId,
        limit,
        page,
      );

      runInAction(() => {
        this.isLoading = false;
        this.pets = response.pets;
        this.totalPets = response.total;
      });
    } catch (e) {
      runInAction(() => {
        this.isLoading = false;
        console.log(e);
      });
    }
  }

  setCategory(category) {
    this.categorySelected = category;
  }

  setOpenAboutUs() {
    this.openAboutUs = !this.openAboutUs;
  }

  setPage(page) {
    this.page = page;
  }

  setOpenMapCard() {
    this.openMapCard = !this.openMapCard;
  }

  setOpenRequirements() {
    this.openRequirements = !this.openRequirements;
  }

  resetPets() {
    this.pets = [];
  }
  resetShelters() {
    this.shelter = null;
  }
}

export default ProfileShelterStore;
