import { observable, action, runInAction } from 'mobx'
import AuthService from "services/AuthService";
import { TRANSIT_USER } from 'config/roles'

class VolunteersStore {
  constructor() {
    this.authService = new AuthService()
    
    this.searchVolunteers()
  }

  @observable volunteers = []
  @observable arrayLocationVolunteers = []
  @observable isError = false

  @action
  async searchVolunteers() {
    this.isError = false

    try {
      const response = await this.authService.getUserForRole(TRANSIT_USER)

      runInAction(() => {
        this.volunteers = response
        console.log(response)
        this.setArrayLocationVolunteers(response)
      })
    } catch (e) {
      runInAction(() => {
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  setArrayLocationVolunteers(response) {
    response.forEach(key => {
      this.arrayLocationVolunteers.push({
        lat: key.lat,
        lng: key.lng,
      })
    })
  }

  @action
  setIsError() {
    this.isError = false
  }
}

export default VolunteersStore
