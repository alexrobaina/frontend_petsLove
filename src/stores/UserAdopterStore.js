import { observable, action, runInAction } from 'mobx'
import UserAdopterService from 'services/UserAdopterService'
import PetsService from 'services/PetsService'
import InputStore from './InputStore'

const REQUIRED = 'Is required for search pets'

class SearchPetsStore {
  constructor(id) {
    
    this.userAdopterService = new UserAdopterService()

    this.init(id)
  }

  @observable pets = []
  @observable isError = false
  @observable isLoading = false

  @action
  init(id) {
    this.getPets(id)
  }

  @action
  async getPets(userId) {
    this.isLoading = true

    try {
      const response = await this.userAdopterService.loadPets(userId)

      runInAction(() => {
        this.pets = response
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.isLoading = false
        this.isError = true
        console.log(e)
      })
    }
  }
}

export default SearchPetsStore
