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
  @observable pet = []
  @observable name = []
  @observable protectionist = []
  @observable images = []
  @observable gender = ''
  @observable age = ''
  @observable phone = ''
  @observable email = ''
  @observable categorie = ''
  @observable activity = ''
  @observable idUser = ''
  @observable lat = null
  @observable lng = null
  @observable userName = ''
  @observable isLoading = false
  @observable petIsEdit = false
  @observable mapPosition = []
  @observable defaultPosition = [
    {
      lat: -34.61315,
      lng: -58.37723,
    },
  ]

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
        setTimeout(() => {
          this.isLoading = false
        }, 2000)

        this.pet.fillJson(response)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }
}

export default PetIdStore
