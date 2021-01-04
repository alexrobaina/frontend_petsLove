import { makeAutoObservable, runInAction, toJS } from 'mobx';
import PetsService from 'services/PetsService';

interface IProfilePet {
  pet: object;
  petId: string;
  petsService: PetsService;
}

class ProfilePetStore implements IProfilePet {
  pet;
  petId;
  isLoading;
  petsService;

  constructor() {
    this.pet = null;
    this.petId = '';
    this.isLoading = false;

    makeAutoObservable(this);

    this.petsService = new PetsService();
  }

  async searchPet(id) {
    this.isLoading = true;

    try {
      const response = await this.petsService.getPet(id);

      runInAction(() => {
        this.isLoading = false;
        this.pet = toJS(response);
      });
    } catch (e) {
      runInAction(() => {
        this.isLoading = false;
        console.log(e);
      });
    }
  }

  resetPets() {
    this.pet = null;
  }
}

export default ProfilePetStore;
