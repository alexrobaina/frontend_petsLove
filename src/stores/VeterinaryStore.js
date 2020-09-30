import AsyncApiStore from 'stores/AsyncApiStore'
import { observable, action, runInAction } from 'mobx'
import VeterinaryService from 'services/VeterinaryService'
import DashboardStore from 'stores/DashboardStore'
import { LIMIT_LIST } from 'services/config'

class VeterinaryStore extends AsyncApiStore {
  constructor(userId) {
    super()

    this.veterinaryService = new VeterinaryService()
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
    this.loadPetsVeterinaryCared(this.id, LIMIT_LIST, 1, '', false)
  }

  @action
  async loadPetsVeterinaryCared(userId, limit, page, search) {
    this.preRequest()

    try {
      const response = await this.veterinaryService.getPetsVeterinaryCared(
        userId,
        limit,
        page,
        search
      )

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
      await this.veterinaryService.deletePet(id)

      runInAction(() => {
        this.init()
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
}

export default VeterinaryStore
