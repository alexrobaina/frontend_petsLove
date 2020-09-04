import { observable, action, runInAction } from 'mobx'
import AdopterService from 'services/AdopterService'
import AsyncApiStore from 'stores/AsyncApiStore'
import { LIMIT_LIST } from 'services/config'

class AdopterStore extends AsyncApiStore {
  constructor(userId) {
    super()

    this.adopterService = new AdopterService()
    this.id = userId
    this.init()
  }

  @observable petsList = []
  @observable totalPets = 0
  @observable isLoading = 0

  @action
  init() {
    this.loadPetsAdopter(this.id, LIMIT_LIST, 1)
  }

  @action
  async loadPetsAdopter(userId, limit, page) {
    this.preRequest()

    try {
      const response = await this.adopterService.getPetsAdopter(userId, limit, page)

      runInAction(() => {
        this.clearError()
        this.onSuccessRequest()
        this.petsList = response.registers
        this.totalPets = response.totalPets
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.finishRequest()
        this.setServerError()
      })
    }
  }
}

export default AdopterStore
