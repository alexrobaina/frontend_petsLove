import { observable, action, runInAction } from 'mobx'
import User from 'models/User'
import ProfilesUsersService from 'services/ProfilesUsersService'

class UserIdStore {
  constructor(id) {
    this.profilesUsersService = new ProfilesUsersService()

    this.getUserId(id)
  }

  @observable id = ''
  @observable lat = null
  @observable lng = null
  @observable mapPosition = []
  @observable user = new User()
  @observable isLoading = false
  @observable userIsEdit = false
  @observable defaultPosition = [
    {
      lat: -34.61315,
      lng: -58.37723,
    },
  ]

  @action
  async getUserId(id) {
    this.isLoading = true
    try {
      const response = await this.profilesUsersService.getUserId(id)

      runInAction(() => {
        this.user.fillJson(response)
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
      })
    } catch (e) {
      runInAction(() => {
        console.log(e)
      })
    }
  }
}

export default UserIdStore
