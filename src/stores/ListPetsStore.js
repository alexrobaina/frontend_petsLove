import { observable, action, runInAction } from 'mobx'
import PetsService from '../services/PetsService'

class ListPetsStore {
  constructor() {
    this.petsService = new PetsService()
  }

  @observable pets = []
  @observable isLoading = false

  @action
  async searchPets() {
    this.setLoading()
    console.log(this.isLoading)
    try {
      const response = await this.petsService.getPets()

      runInAction(() => {
        this.pets = response[0].pets
        
        this.setLoading()
        console.log(this.pets);
        console.log(this.isLoading)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }

  @action
  setLoading() {
    this.isLoading = !this.isLoading
  }

  @action
  setSearch(value) {
    this.search = value.value
  }
}

export default ListPetsStore
