import AsyncApiStore from 'stores/AsyncApiStore'
import { action, runInAction } from 'mobx'
import DashboardService from 'services/DashboardService'
import Dashboard from 'models/Dashboard'

class DashboardStore extends AsyncApiStore {
  constructor(userId) {
    super()

    this.dashboard = new Dashboard()
    this.dashboardService = new DashboardService()
    this.id = userId
    this.init()
  }

  @action
  init() {
    this.loadDashboard(this.id)
  }

  @action
  async loadDashboard(userId) {
    try {
      const response = await this.dashboardService.getDataDashboard(userId)

      runInAction(() => {
        this.clearError()
        this.onSuccessRequest()
        this.petsList = response
        this.totalPetsAdopted = this.dashboard.setTotalPetsAdopted(response.totalPetsAdopted)
        this.totalPetsForAdoption = this.dashboard.setTotalPetsForAdoption(
          response.totalPetsForAdoption
        )
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

export default DashboardStore
