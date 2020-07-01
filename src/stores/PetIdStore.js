import { observable, action, runInAction } from 'mobx'
import SetLocalStorage from 'utils/setLocalStorage'
import PetsService from 'services/PetsService'
import Pet from 'models/Pet'

class PetIdStore {
  constructor() {
    this.petsService = new PetsService()
    this.setLocalStorage = new SetLocalStorage()
    this.pet = new Pet()
  }

  @observable id = ''
  @observable protectionist = []
  @observable filenames = []
  @observable idUser = ''
  @observable userCreatorPhone = ''
  @observable userCreatorEmail = ''
  @observable isLoading = false
  @observable petIsEdit = false
  @observable mapPosition = []

  @action
  setPetIsEdit() {
    const userConnected = this.setLocalStorage.getUser()
    if (userConnected._id === this.pet.user._id || userConnected._id === this.pet.userAdopt._id) {
      this.petIsEdit = true
    }
  }

  @action
  async getPetId(id) {
    this.isLoading = true
    try {
      const response = await this.petsService.getPetId(id)

      runInAction(() => {
        this.pet.fillJson(response)
        this.userCreatorEmail = response.userCreator.email
        this.userCreatorPhone = response.userCreator.phone
        this.isLoading = false

        if (this.pet.image.value !== []) {
          this.filenames = this.pet.image.value.filenames
        }
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }
}

export default PetIdStore
