import { makeAutoObservable, runInAction, toJS } from 'mobx';
import PetsService from 'services/PetsService';
import Pet from 'models/Pet';

interface IProfilePet {
  pet: object;
  petId: string;
  isLoading: boolean;
  openMapCard: boolean;
  openHistory: boolean;
  petsService: PetsService;
  openMedicalCard: boolean;
}

class ProfilePetStore implements IProfilePet {
  pet;
  petId;
  isLoading;
  openMapCard;
  petsService;
  openHistory;
  openMedicalCard;
  catMedicalHistory;
  dogMedicalHistory;

  constructor() {
    this.petId = '';
    this.pet = new Pet();
    this.isLoading = false;
    this.openHistory = true;
    this.openMapCard = true;
    this.openMedicalCard = true;

    makeAutoObservable(this);

    this.petsService = new PetsService();
  }

  async searchPet(id): Promise<void> {
    this.isLoading = true;

    try {
      const response = await this.petsService.getPet(id);

      runInAction(() => {
        this.isLoading = false;
        this.pet.fillJson(response);
      });
    } catch (e) {
      runInAction(() => {
        this.isLoading = false;
        console.log(e);
      });
    }
  }

  setOpenMapCard() {
    this.openMapCard = !this.openMapCard;
  }

  setOpenMedicalCard() {
    this.openMedicalCard = !this.openMedicalCard;
  }

  setOpenHistory() {
    this.openHistory = !this.openHistory;
  }

  resetPets() {
    this.pet = null;
  }
}

export default ProfilePetStore;
