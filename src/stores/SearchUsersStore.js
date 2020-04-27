import { observable, action, runInAction } from 'mobx'
import SearchUsersService from 'services/SearchUsersService/SearchUsersService'

class SearchUsersStore {
  constructor() {
    this.searchUsersService = new SearchUsersService()
  }

  @observable usersAdopt = []
  @observable usersTransit = []
  @observable isError = false
  @observable options = []
  @observable arrayUsersAdopt = []
  @observable arrayUsersTransit = []

  @action
  async searchUser(rol) {
    this.isError = false

    try {
      const response = await this.searchUsersService.getUsers(rol)
      runInAction(() => {
        this.usersAdopt = response
        this.formatOptionsUserAdopt()
      })
    } catch (e) {
      runInAction(() => {
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  async searchUserTransit(rol) {
    this.isError = false

    try {
      const response = await this.searchUsersService.getUsers(rol)
      runInAction(() => {
        this.usersTransit = response
        this.formatOptionsTransitUser()
      })
    } catch (e) {
      runInAction(() => {
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  formatOptionsUserAdopt() {
    this.usersAdopt.forEach(user => {
      this.arrayUsersAdopt.push({ value: user._id, label: user.email })
    })
  }

  formatOptionsTransitUser() {
    this.usersTransit.forEach(user => {
      this.arrayUsersTransit.push({
        value: user._id,
        label: user.email,
      })
    })
  }

  @action
  setIsError() {
    this.isError = false
  }
}

export default SearchUsersStore
