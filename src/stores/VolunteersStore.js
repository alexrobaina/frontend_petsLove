import AsyncApiStore from 'stores/AsyncApiStore'
import { observable, action, runInAction } from 'mobx'
import VolunteersService from 'services/VolunteersService'
import DashboardStore from 'stores/DashboardStore'
import { LIMIT_LIST } from 'services/config'

class VolunteersStore extends AsyncApiStore {
  constructor(userId) {
    super()

    this.volunteersService = new VolunteersService()
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
    this.loadPetsAssignedVolunteer(this.id, LIMIT_LIST, 1, '')
  }

  @action
  async loadPetsVolunteersOwner(userId, limit, page, search, isAdopted = false) {
    this.preRequest()

    try {
      const response = await this.volunteersService.getPetsVolunteersOwner(
        userId,
        limit,
        page,
        search,
        isAdopted
      )

      runInAction(() => {
        this.clearError()
        this.onSuccessRequest()
        this.petsList = response.pets
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
  async loadPetsAssignedVolunteer(userId, limit, page, search, isAdopted = false) {
    this.preRequest()

    try {
      const response = await this.volunteersService.getPetsAssignedVolunteer(
        userId,
        limit,
        page,
        search,
        isAdopted
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
      await this.volunteersService.deletePet(id)

      runInAction(() => {
        this.init()
        this.dashboardStore.init()
        this.loadPetsVolunteersOwner(this.id, LIMIT_LIST, 1, '')
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

export default VolunteersStore
