import { observable, action, runInAction } from 'mobx'
import PetsService from '../services/PetsService'

class SearchPetsStore {
  constructor() {
    this.petsService = new PetsService()
  }

  @observable pets = []
  @observable isLoading = false
  @observable filters = []

  @action
  async searchPets() {
    try {
      const response = await this.petsService.getPets()

      runInAction(() => {
        this.pets = response

        this.setLoading()
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

export default SearchPetsStore
