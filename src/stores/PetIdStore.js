import { observable, action, runInAction } from 'mobx'
import PetsService from 'services/PetsService'

class PetIdStore {
  constructor() {
    this.petsService = new PetsService()
  }

  @observable id = ''
  @observable pet = []
  @observable images = []
  @observable gender = ''
  @observable age = ''
  @observable categorie = ''
  @observable activity = ''
  @observable isLoading = false
  @observable mapPosition = []
  @observable defaultPosition = [
    {
      lat: -34.61315,
      lng: -58.37723,
    },
  ]

  @action
  async getPetId(id) {
    this.isLoading = true
    try {
      const response = await this.petsService.getPetId(id)

      runInAction(() => {
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
        this.pet = response
        this.categorie = this.pet.categorie
        this.gender = this.pet.gender
        this.activity = this.pet.activity
        this.age = this.pet.age
        this.images = this.pet.image
        this.mapPosition = this.pet.mapPosition
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }
}

export default PetIdStore
