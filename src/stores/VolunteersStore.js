import { observable, action, runInAction } from 'mobx'
import VolunteersService from 'services/VolunteersService/VolunteersService'

class VolunteersStore {
  constructor() {
    this.volunteersService = new VolunteersService()
  }

  @observable volunteers = []
  @observable arrayLocationVolunteers = []
  @observable isError = false

  @action
  async searchVolunteers() {
    this.isError = false

    try {
      const response = await this.volunteersService.getVolunteers()

      runInAction(() => {
        this.volunteers = response
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
