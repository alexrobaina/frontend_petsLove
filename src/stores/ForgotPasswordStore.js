import { observable, action, runInAction } from 'mobx'
import AuthService from 'services/AuthService'
import SetLocalStorage from 'utils/setLocalStorage'
import { HOST } from 'services/config'

class ForgotPasswordStore {
  constructor() {
    this.authService = new AuthService()
    this.setLocalStorage = new SetLocalStorage()
  }

  @observable password = ''
  @observable repeatPassword = ''
  @observable email = ''
  @observable passwordSuccess = false
  @observable isLoading = false
  @observable isReset = false
  @observable isError = false

  @action
  async forgotPassword() {
    this.isLoading = true
    const server = HOST

    try {
      const response = await this.authService.sendForgotPassword(this.email, server)

      runInAction(() => {
        this.sendEmail = response
        this.isReset = true
      })
    } catch (e) {
      runInAction(() => {
        this.isReset = false
        this.isLoading = false
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  async resetPassword(token, userIsLogin) {
    this.isLoading = true
    const data = { password: this.password }

    try {
      if (!userIsLogin) {
        await this.authService.resetPassword(data, token)
      }

      runInAction(() => {
        this.isReset = true
      })
    } catch (e) {
      runInAction(() => {
        this.isReset = false
        this.isLoading = false
        this.isError = true
        console.log(e)
      })
    }
  }

  @action
  setEmail(value) {
    this.email = value
  }

  @action
  setPassword(value) {
    this.password = value
    if (this.password === this.confirmPassword) {
      this.passwordSuccess = true
      this.passwordError = false
    } else {
      this.passwordSuccess = false
      this.passwordError = true
    }
  }

  @action
  setConfirmPassword(value) {
    this.confirmPassword = value
    if (this.confirmPassword === this.password) {
      this.passwordSuccess = true
      this.passwordError = false
    } else {
      this.passwordSuccess = false
      this.passwordError = true
    }
  }
}

export default ForgotPasswordStore
