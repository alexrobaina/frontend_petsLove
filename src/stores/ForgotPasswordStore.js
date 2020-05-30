import { observable, action, runInAction } from 'mobx'
import AuthService from 'services/AuthService'
import SetLocalStorage from 'utils/setLocalStorage'
import { HOST } from 'services/config'
import validationPassword from 'utils/validationPassword'
import InputStore from './InputStore'

const PASSWORD_MATCH = 'The password need match'
const REQUERID = 'The password is requerid'

class ForgotPasswordStore {
  constructor() {
    this.authService = new AuthService()
    this.setLocalStorage = new SetLocalStorage()
  }

  @observable isReset = false
  @observable isError = false
  @observable isLoading = false
  @observable isSuccess = false
  @observable sendSuccess = false
  @observable passwordSuccess = false
  @observable email = new InputStore()
  @observable password = new InputStore()
  @observable confirmPassword = new InputStore()

  @action
  async forgotPassword() {
    this.sendSuccess = false
    this.isLoading = true
    const server = HOST

    try {
      await this.authService.sendForgotPassword(this.email.value, server)

      runInAction(() => {
        this.isReset = true
        this.sendSuccess = true
        this.isLoading = false
      })
    } catch (e) {
      runInAction(() => {
        this.sendSuccess = false
        this.isReset = false
        this.isLoading = false
        this.isError = true
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
    if (this.password.value === this.confirmPassword.value) {
      this.passwordSuccess = true
      this.passwordError = false
    } else {
      this.passwordSuccess = false
      this.passwordError = true
    }
  }

  @action
  setConfirmPassword(value) {
    this.confirmPassword.setValue(value)
    if (this.confirmPassword.value === this.password.value) {
      this.passwordSuccess = true
      this.passwordError = false
    } else {
      this.passwordSuccess = false
      this.passwordError = true
    }
  }

  @action
  validate() {
    this.resetErrors()
    let isValidate = true

    if (!this.password.value) {
      this.password.setError(true, REQUERID)

      if (this.confirmPassword.value !== this.password.value) {
        alert('asdasd')
        this.confirmPassword.setError(true, PASSWORD_MATCH)

        isValidate = false
      }
    }

    if (validationPassword(this.password)) {
      isValidate = false
    }

    return isValidate
  }

  resetErrors() {
    this.password.setError(false, '')
  }
}

export default ForgotPasswordStore
