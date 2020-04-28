import { observable, action, runInAction } from 'mobx'
import AuthService from 'services/AuthService'
import SetLocalStorage from 'utils/setLocalStorage'
import { SERVER } from 'services/config'

class ForgotPasswordStore {
  constructor() {
    this.authService = new AuthService()
    this.setLocalStorage = new SetLocalStorage()
  }

  @observable email = ''
  @observable sendEmail = []
  @observable isLoading = false
  @observable isError = false

  @action
  async forgotPassword() {
    this.isLoading = true
    const server = SERVER
    const token = this.setLocalStorage.getToken()
    console.log(token)

    try {
      const response = await this.authService.sendForgotPassword(this.email, server)

      runInAction(() => {
        this.sendEmail = response
        this.isRegister = true
      })
    } catch (e) {
      runInAction(() => {
        this.isRegister = false
        this.isLoading = false
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  setEmail(value) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.isError = true
    if (re.test(String(value).toLowerCase())) {
      this.isError = false
      this.email = value.toLowerCase()
    }
    console.log(this.isError)
  }
}

export default ForgotPasswordStore
