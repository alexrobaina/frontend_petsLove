import AsyncApiStore from 'stores/AsyncApiStore'
import { observable, action, runInAction } from 'mobx'
import ShelterService from 'services/ShelterService'
import DashboardStore from 'stores/DashboardStore'
import { LIMIT_LIST } from 'services/config'

class ShelterStore extends AsyncApiStore {
  constructor(userId) {
    super()

    this.shelterService = new ShelterService()
    this.dashboardStore = new DashboardStore(userId)
    this.id = userId
    this.init()
  }

  @observable petsList = []
  @observable totalPets = 0
  @observable isLoading = 0
  @observable swithPets = false

  @action
  init() {
    this.getPetsForAdoption(this.id, LIMIT_LIST, 1, '', false)
  }

  @action
  async getPetsForAdoption(userId, limit, page, search, isAdopted = false) {
    try {
      const response = await this.shelterService.getPets(userId, limit, page, search, isAdopted)

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

  @action
  async getPetsAdopted(userId, limit, page, search, isAdopted = true) {
    try {
      const response = await this.shelterService.getPets(userId, limit, page, search, isAdopted)

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

  @action
  setSwithPets(value) {
    this.swithPets = value
  }
}

export default ShelterStore
