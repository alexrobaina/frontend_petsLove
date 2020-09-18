import { observable, action, runInAction } from 'mobx'
import AuthService from 'services/AuthService'
import AsyncApiStore from 'stores/AsyncApiStore'
import SetLocalStorage from 'utils/setLocalStorage'
import { HOST } from 'services/config'
import { validationPassword, validationPasswordMatch } from 'utils/validationPassword'
import InputStore from './InputStore'

class ForgotPasswordStore extends AsyncApiStore {
  constructor() {
    super()

    this.authService = new AuthService()
    this.setLocalStorage = new SetLocalStorage()
  }

  @observable isReset = false
  @observable isLoading = false
  @observable isSuccess = false
  @observable sendSuccess = false
  @observable passwordSuccess = false
  @observable email = new InputStore()
  @observable password = new InputStore()
  @observable confirmPassword = new InputStore()

  @action
  async forgotPassword() {
    this.preRequest()
    this.sendSuccess = false
    const server = HOST

    try {
      await this.authService.sendForgotPassword(this.email.value, server)

      runInAction(() => {
        this.isReset = true
        this.sendSuccess = true
        this.onSuccessRequest()
      })
    } catch (e) {
      runInAction(() => {
        this.sendSuccess = false
        this.isReset = false
        this.isLoading = false
        this.onSuccessRequest()
        this.setServerError()
        console.log(e)
      })
    }
  }

  @action
  async resetPassword(token, userIsLogin) {
    if (this.validate()) {
      this.isLoading = true
      const data = { password: this.password.value }

      try {
        if (!userIsLogin) {
          await this.authService.resetPassword(data, token)
        }

        runInAction(() => {
          this.isReset = true
          this.isLoading = false
        })
      } catch (e) {
        runInAction(() => {
          console.log(e)
          this.isError = true
          this.isReset = false
          this.isLoading = false
        })
      }
    }
  }

  @action
  setEmail(value) {
    this.email.setValue(value)
  }

  @action
  setPassword(value) {
    this.password.setValue(value)
    this.validate()
  }

  @action
  setConfirmPassword(value) {
    this.confirmPassword.setValue(value)
    this.validate()
  }

  @action
  validate() {
    this.resetErrors()
    let isValidate = true

    if (validationPassword(this.password)) {
      isValidate = false
    }

    if (validationPasswordMatch(this.confirmPassword, this.password)) {
      isValidate = false
    }

    return isValidate
  }

  resetErrors() {
    this.password.setError(false, '')
  }
}

export default ForgotPasswordStore
