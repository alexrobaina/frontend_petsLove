import { makeAutoObservable, runInAction, toJS } from 'mobx';
import Shelter from 'models/Shelter';
import ShelterService from 'services/ShelterService';
import PetsService from 'services/PetsService';

interface IProfileShelter {
  pets: any;
  shelter: object;
  totalPets: number;
  isLoading: boolean;
  openAboutUs: boolean;
  openMapCard: () => void;
  petsService: PetsService;
  openRequirements: boolean;
  shelterService: ShelterService;
}

class ProfileShelterStore implements IProfileShelter {
  pets;
  shelter;
  isLoading;
  totalPets;
  openAboutUs;
  petsService;
  openMapCard;
  requirements;
  shelterService;
  openRequirements;

  constructor() {
    this.pets = [];
    this.totalPets = 0;
    this.isLoading = false;
    this.openMapCard = false;
    this.openAboutUs = false;
    this.requirements = false;
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
        this.shelter.fillJson(response);
      });
    } catch (e) {
      runInAction(() => {
        this.isLoading = false;
        console.log(e);
      });
    }
  }

  async filterPets(typePet, userCreatorId, limit, page) {
    this.resetPets();
    // this function need userCreatorId for filter pets created form this user.
    this.isLoading = true;

    try {
      const response = await this.petsService.getFilterPet(
        typePet,
        userCreatorId,
        limit,
        page,
      );

      runInAction(() => {
        this.isLoading = false;
        this.pets = response.pets;
        this.totalPets = response.totalPets;
      });
    } catch (e) {
      runInAction(() => {
        this.isLoading = false;
        console.log(e);
      });
    }
  }

  setOpenAboutUs() {
    this.openAboutUs = !this.openAboutUs;
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
