import { observable, action, runInAction } from 'mobx'
import ProfilesUsersService from 'services/ProfilesUsersService'

class UserIdStore {
  constructor() {
    this.profilesUsersService = new ProfilesUsersService()
  }

  @observable id = ''
  @observable user = []
  @observable images = []
  @observable lat = null
  @observable lng = null
  @observable isLoading = false
  @observable userIsEdit = false
  @observable mapPosition = []
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
      const response = await this.profilesUsersService.getUSerId(id)

      runInAction(() => {
        this.user = response
        this.images = this.user.image
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
