import { observable, action, runInAction } from 'mobx'
import UserAdopterService from 'services/UserAdopterService'
import { LIMIT_LIST } from 'services/config'

class SearchPetsStore {
  constructor(id) {
    this.userAdopterService = new UserAdopterService()

    this.init(id)
  }

  @observable pets = []
  @observable isError = false
  @observable isLoading = false
  @observable totalPets = false

  @action
  init(id) {
    this.getPets(id, LIMIT_LIST, 1)
  }

  @action
  async getPets(userId, limit, page) {
    this.isLoading = true

    try {
      const response = await this.userAdopterService.loadPets(userId, limit, page)

      runInAction(() => {
        this.pets = response.pets
        this.totalPets = response.totalPets
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
