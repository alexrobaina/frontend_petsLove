import { observable, action, runInAction } from 'mobx'
import { PROTECTIONIST } from 'config/roles'
import AuthService from "services/AuthService";

class ProtectionistStore {
  constructor() {
    this.authService = new AuthService()
    
    this.init()
  }

  @observable protectionist = []
  @observable arrayLocationProtectionist = []
  @observable isError = false

  @action
  init() {
    this.searchProtectionist()
  }

  @action
  async searchProtectionist() {
    this.isError = false

    try {
      const response = await this.authService.getUserForRole(PROTECTIONIST)

      runInAction(() => {
        this.protectionist = response
        this.setArrayLocationProtectionist(response)
      })
    } catch (e) {
      runInAction(() => {
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  setArrayLocationProtectionist(response) {
    response.forEach(key => {
      this.arrayLocationProtectionist.push({
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

export default ProtectionistStore
