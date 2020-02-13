import { observable, action, runInAction } from 'mobx'
import PetsService from 'services/PetsService'

class PetIdStore {
  constructor() {
    this.petsService = new PetsService()
  }

  @observable id = ''
  @observable pet = []
  @observable imagesPet = []

  @action
  async getPetId(id) {
    try {
      const response = await this.petsService.getPetId(id)

      runInAction(() => {
        this.pet = response
        this.imagesPet = this.pet.image
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }
}

export default PetIdStore
