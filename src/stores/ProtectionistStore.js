import { observable, action, runInAction } from 'mobx'
import ProtectionistsService from 'services/ProtectionistsService/ProtectionistsService'

class ProtectionistStore {
  constructor() {
    this.protectionistsService = new ProtectionistsService()
  }

  @observable protectionists = []
  @observable arrayLocationProtectionists = []
  @observable isError = false

  @action
  async searchProtectionists() {
    this.isError = false

    try {
      const response = await this.protectionistsService.getVolunteers()

      runInAction(() => {
        this.protectionists = response
        this.setArrayLocationProtectionists(response)
      })
    } catch (e) {
      runInAction(() => {
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  setArrayLocationProtectionists(response) {
    response.forEach(key => {
      this.arrayLocationProtectionists.push({
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
