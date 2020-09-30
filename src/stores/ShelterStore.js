import AsyncApiStore from 'stores/AsyncApiStore'
import { observable, action, runInAction } from 'mobx'
import ShelterService from 'services/ShelterService'
import DashboardStore from 'stores/DashboardStore'
import { LIMIT_LIST } from 'services/config'
import User from 'models/User'

class ShelterStore extends AsyncApiStore {
  constructor(userId) {
    super()

    this.shelterService = new ShelterService()
    this.dashboardStore = new DashboardStore(userId)
    this.id = userId
    this.init()
  }

  @observable images = []
  @observable petsList = []
  @observable totalPets = 0
  @observable isLoading = 0
  @observable swithPets = false
  @observable shelter = new User()

  @action
  init() {
    this.getPetsForAdoption(this.id, LIMIT_LIST, 1, '', false)
  }

  @action
  async getPetsForAdoption(userId, limit, page, search, isAdopted = false) {
    this.preRequest()

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
    this.preRequest()

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
  async removePet(id) {
    this.preRequest()

    try {
      await this.shelterService.deletePet(id)

      runInAction(() => {
        this.getPetsForAdoption(this.id, LIMIT_LIST, 1, '', false)
        this.getPetsAdopted(this.id, LIMIT_LIST, 1, '', false)
        this.dashboardStore.init()
        this.clearError()
        this.onSuccessRequest()
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
        this.onSuccessRequest()
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
