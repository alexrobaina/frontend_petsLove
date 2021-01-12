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
  openMapCard;
  petsService;
  openHistory;
  openMedicalCard;
  catMedicalHistory;
  dogMedicalHistory;

  constructor() {
    this.pet = null;
    this.petId = '';
    this.isLoading = false;
    this.openHistory = true;
    this.openMapCard = true;
    this.openMedicalCard = true;
    this.catMedicalHistory = null;
    this.dogMedicalHistory = null;

    makeAutoObservable(this);

    this.petsService = new PetsService();
  }

  async searchPet(id): Promise<void> {
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

  setMedicalFormat(pet) {
    console.log(pet);

    return {};
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
